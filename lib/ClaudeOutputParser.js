'use strict';

// Reads Claude Code's structured JSONL conversation files to produce typed
// StreamItem messages. No terminal parsing — Claude already writes every
// message as structured JSON to ~/.claude/projects/<project>/<session>.jsonl.
//
// Each line in the JSONL file is a Claude API-format message:
//   { type: "user", message: { role: "user", content: "..." } }
//   { type: "assistant", message: { role: "assistant", content: [...] } }
//
// Assistant content blocks are the standard Claude API content blocks:
//   { type: "text", text: "..." }
//   { type: "tool_use", name: "Read", id: "...", input: {...} }
//   { type: "tool_result", content: "...", is_error: false }
//   { type: "thinking", thinking: "..." }

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

// ── JSONL file discovery ───────────────────────────────────────────

function projectDirName(cwd) {
  return (cwd || '').replace(/^~/, os.homedir()).replace(/[/\\]/g, '-');
}

function findActiveJsonl(cwd) {
  const base = path.join(os.homedir(), '.claude', 'projects');
  const projDir = path.join(base, projectDirName(cwd));

  try {
    const entries = fs.readdirSync(projDir);
    // Find main session files (not subagents), sorted by mtime descending
    const jsonlFiles = entries
      .filter(f => f.endsWith('.jsonl') && !f.includes('subagents'))
      .map(f => path.join(projDir, f))
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);

    return jsonlFiles[0] || null;
  } catch {
    return null;
  }
}

// ── Claude API format → StreamItem ─────────────────────────────────

function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeToolName(name) {
  const n = name.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
  const aliases = {
    'bash': 'shell', 'shell': 'shell', 'run': 'shell', 'execute': 'shell',
    'read': 'read', 'view': 'read',
    'write': 'write', 'create': 'write',
    'edit': 'edit', 'modify': 'edit', 'patch': 'edit', 'replace': 'edit', 'update': 'edit',
    'search': 'search', 'grep': 'search', 'glob': 'search', 'list_files': 'search',
    'fetch': 'fetch', 'web_fetch': 'fetch', 'web_search': 'web_search',
    'todo': 'todo', 'task': 'todo', 'todo_write': 'todo',
    'think': 'think',
    'task': 'task', 'sub_agent': 'task',
  };
  return aliases[n] || n;
}

function classifyToolType(name) {
  const n = name.toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_');
  if (/^(bash|shell|run|execute|exec|terminal)$/.test(n)) return 'shell';
  if (/^(read|view|cat|open)$/.test(n)) return 'read';
  if (/^(write|create|save)$/.test(n)) return 'write';
  if (/^(edit|modify|patch|replace|update)$/.test(n)) return 'edit';
  if (/^(search|grep|find|glob|list_files)$/.test(n)) return 'search';
  if (/^(fetch|web_fetch|web_search|curl|http)$/.test(n)) return 'fetch';
  return 'unknown';
}

function toolInputToSummary(name, input) {
  if (!input || typeof input !== 'object') return name;
  // Common tool input fields that make good summaries
  const filePath = input.file_path || input.filePath || input.path || '';
  const command = input.command || '';
  const query = input.query || input.pattern || '';
  const url = input.url || '';

  if (filePath) return name + ' ' + path.basename(filePath);
  if (command) return command.slice(0, 80);
  if (query) return query.slice(0, 80);
  if (url) return url.slice(0, 80);
  return name;
}

function convertContentBlock(block, provider) {
  switch (block.type) {
    case 'text':
      return {
        id: uid('asst'),
        timestamp: new Date().toISOString(),
        kind: 'assistant_message',
        text: block.text || '',
      };

    case 'tool_use':
      return {
        id: uid('tool'),
        timestamp: new Date().toISOString(),
        kind: 'tool_call',
        toolName: normalizeToolName(block.name),
        status: 'completed',
        summary: toolInputToSummary(block.name, block.input),
        detail: {
          type: classifyToolType(block.name),
          ...buildToolDetail(block.name, block.input),
        },
      };

    case 'thinking':
      return {
        id: uid('thought'),
        timestamp: new Date().toISOString(),
        kind: 'thought',
        text: block.thinking || '',
        status: 'ready',
      };

    default:
      return null;
  }
}

function buildToolDetail(name, input) {
  if (!input || typeof input !== 'object') return {};

  const detail = {};
  const n = name.toLowerCase();

  if (input.file_path || input.filePath) {
    detail.filePath = input.file_path || input.filePath;
  }
  if (input.command) detail.command = input.command;
  if (input.content) detail.content = input.content;
  if (input.old_string || input.new_string) {
    detail.oldString = input.old_string;
    detail.newString = input.new_string;
  }
  if (input.query || input.pattern) detail.query = input.query || input.pattern;
  if (input.url) detail.url = input.url;
  if (input.description) detail.description = input.description;

  return detail;
}

// ── Main read function ─────────────────────────────────────────────

function readJsonlMessages(cwd, opts = {}) {
  const jsonlPath = findActiveJsonl(cwd || '');
  if (!jsonlPath) return [];

  const since = opts.since || 0; // byte offset or line number
  let content;
  try {
    content = fs.readFileSync(jsonlPath, 'utf8');
  } catch {
    return [];
  }

  // Use content hash to skip re-parse when file hasn't changed
  const hash = crypto.createHash('sha256').update(content).digest('hex');
  if (opts._cache && opts._cache.hash === hash) {
    return opts._cache.messages || [];
  }

  const messages = [];
  const lines = content.split('\n');

  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const entry = JSON.parse(line);

      // User message
      if (entry.type === 'user' && entry.message) {
        const text = extractTextContent(entry.message.content);
        if (text && !text.startsWith('<command-name>') && !text.startsWith('<local-command')) {
          messages.push({
            id: uid('user'),
            timestamp: entry.timestamp || new Date().toISOString(),
            kind: 'user_message',
            text: text,
          });
        }
        continue;
      }

      // Assistant message — may contain multiple content blocks
      if (entry.type === 'assistant' && entry.message) {
        const content = entry.message.content;
        const blocks = Array.isArray(content) ? content : [{ type: 'text', text: String(content) }];

        for (const block of blocks) {
          const msg = convertContentBlock(block, 'claude');
          if (msg) {
            // Carry forward timestamp and usage from parent
            if (entry.timestamp) msg.timestamp = entry.timestamp;
            messages.push(msg);
          }
        }

        // Tool results come as separate user-type messages with tool_result blocks
        // We merge them into the preceding tool_call
        continue;
      }

      // Tool results (come as user messages with tool_result content blocks)
      if (entry.type === 'user' && entry.message) {
        const content = entry.message.content;
        const blocks = Array.isArray(content) ? content : [];
        for (const block of blocks) {
          if (block.type === 'tool_result') {
            // Find the most recent tool_call and attach the result
            for (let i = messages.length - 1; i >= 0; i--) {
              if (messages[i].kind === 'tool_call') {
                if (block.is_error) {
                  messages[i].status = 'failed';
                  messages[i].detail.error = typeof block.content === 'string' ? block.content : JSON.stringify(block.content);
                } else {
                  messages[i].status = 'completed';
                  if (!messages[i].detail.content) {
                    messages[i].detail.content = typeof block.content === 'string' ? block.content : '';
                  }
                  // Build a better summary from the result
                  if (!messages[i].summary || messages[i].summary === messages[i].toolName) {
                    const resultText = typeof block.content === 'string' ? block.content : '';
                    if (resultText) {
                      messages[i].summary = resultText.slice(0, 120).replace(/\n/g, ' ');
                    }
                  }
                }
                break;
              }
            }
          }
        }
        continue;
      }
    } catch {
      // Malformed JSON line — skip
    }
  }

  // Cache
  if (opts._cache) {
    opts._cache.hash = hash;
    opts._cache.messages = messages;
  }

  return messages;
}

function extractTextContent(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .filter(c => c.type === 'text')
      .map(c => c.text || '')
      .join('\n')
      .trim();
  }
  return '';
}

module.exports = { readJsonlMessages, findActiveJsonl, projectDirName };

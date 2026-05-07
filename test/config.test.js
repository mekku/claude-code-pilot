'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

function tmpConfigPath() {
  return path.join(os.tmpdir(), `ccp-test-${process.pid}-${Date.now()}.json`);
}

function freshConfig(configPath) {
  process.env.CCP_CONFIG_PATH = configPath;
  // Force re-require so CONFIG_PATH is re-evaluated
  const key = require.resolve('../lib/config');
  delete require.cache[key];
  return require('../lib/config');
}

function cleanup(configPath) {
  try { fs.unlinkSync(configPath); } catch {}
}

test('load returns {} for missing file', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  assert.deepEqual(cfg.load(), {});
  cleanup(p);
});

test('saveTelegram persists token and chatId', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  cfg.saveTelegram('tok123', 'chat456');
  const data = cfg.load();
  assert.equal(data.telegram.token, 'tok123');
  assert.equal(data.telegram.chatId, 'chat456');
  cleanup(p);
});

test('saveResumeCommand persists command', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  cfg.saveResumeCommand('claude --resume');
  assert.equal(cfg.load().resumeCommand, 'claude --resume');
  cleanup(p);
});

test('addToHistory stores entries', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  cfg.addToHistory('my-session', '/home/user/project');
  const history = cfg.getHistory();
  assert.equal(history.length, 1);
  assert.equal(history[0].name, 'my-session');
  assert.equal(history[0].path, '/home/user/project');
  assert.equal(history[0].command, 'claude');
  cleanup(p);
});

test('addToHistory deduplicates by name (most recent wins)', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  cfg.addToHistory('sess', '/old');
  cfg.addToHistory('sess', '/new');
  const history = cfg.getHistory();
  assert.equal(history.length, 1);
  assert.equal(history[0].path, '/new');
  cleanup(p);
});

test('addToHistory caps at 30 entries', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  for (let i = 0; i < 35; i++) cfg.addToHistory(`sess-${i}`, `/path/${i}`);
  assert.equal(cfg.getHistory().length, 30);
  cleanup(p);
});

test('addToHistory places newest entry first', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  cfg.addToHistory('first', '/a');
  cfg.addToHistory('second', '/b');
  const history = cfg.getHistory();
  assert.equal(history[0].name, 'second');
  assert.equal(history[1].name, 'first');
  cleanup(p);
});

test('removeFromHistory removes the named entry', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  cfg.addToHistory('keep', '/a');
  cfg.addToHistory('remove-me', '/b');
  cfg.removeFromHistory('remove-me');
  const history = cfg.getHistory();
  assert.equal(history.length, 1);
  assert.equal(history[0].name, 'keep');
  cleanup(p);
});

test('removeFromHistory is a no-op for unknown name', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  cfg.addToHistory('keep', '/a');
  cfg.removeFromHistory('ghost');
  assert.equal(cfg.getHistory().length, 1);
  cleanup(p);
});

test('saveSessionMeta and getAllSessionMeta roundtrip', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  cfg.saveSessionMeta('sess-a', { emoji: '🔧', color: '#ef4444' });
  const all = cfg.getAllSessionMeta();
  assert.equal(all['sess-a'].emoji, '🔧');
  assert.equal(all['sess-a'].color, '#ef4444');
  cleanup(p);
});

test('saveSessionMeta merges partial updates', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  cfg.saveSessionMeta('sess-a', { emoji: '🔧', color: '#ef4444' });
  cfg.saveSessionMeta('sess-a', { color: '#22c55e' });
  const all = cfg.getAllSessionMeta();
  assert.equal(all['sess-a'].emoji, '🔧');
  assert.equal(all['sess-a'].color, '#22c55e');
  cleanup(p);
});

test('saveSessionMeta isolates sessions', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  cfg.saveSessionMeta('sess-a', { emoji: '🔧' });
  cfg.saveSessionMeta('sess-b', { emoji: '🚀' });
  const all = cfg.getAllSessionMeta();
  assert.equal(all['sess-a'].emoji, '🔧');
  assert.equal(all['sess-b'].emoji, '🚀');
  cleanup(p);
});

test('getAllSessionMeta returns {} when no meta saved', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  assert.deepEqual(cfg.getAllSessionMeta(), {});
  cleanup(p);
});

test('save merges with existing data (does not clobber)', () => {
  const p = tmpConfigPath();
  const cfg = freshConfig(p);
  cfg.saveTelegram('tok', 'chat');
  cfg.saveResumeCommand('claude');
  const data = cfg.load();
  assert.ok(data.telegram);
  assert.ok(data.resumeCommand);
  cleanup(p);
});

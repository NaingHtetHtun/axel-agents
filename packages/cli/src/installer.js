import { cp, access, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { loadAdapter, loadRegistry } from './registry.js';

const profiles = {
  'laravel-api': ['laravel'],
  'react-app': ['react'],
  'go-service': ['go']
};
const adapterNames = new Set(['opencode', 'claude-code', 'cursor', 'codex']);

export async function install({ target, profile, stacks, adapter = 'opencode', force = false }) {
  const aiDir = await installationDir(target, adapter);
  if (await exists(aiDir) && !force) {
    throw new Error(`${aiDir} already exists. Use --force only after reviewing its contents.`);
  }
  if (force) await rm(aiDir, { recursive: true, force: true });
  const selected = resolveExtensions(profile, stacks);
  console.log('Installing Axel Engineering OS');
  await copyCore(aiDir);
  for (const extension of selected) await copyExtension(aiDir, extension);
  await writeConfig(aiDir, selected, adapter);
  printInstalled(selected);
}

export async function addExtension({ target, extension, adapter = 'opencode' }) {
  assertExtension(extension);
  const aiDir = await installationDir(target, adapter);
  if (!(await exists(aiDir))) throw new Error('No .ai installation found. Run agents init first.');
  await copyExtension(aiDir, extension);
  const config = await readConfig(aiDir);
  const installed = [...new Set([...config.extensions, extension])];
  await writeConfig(aiDir, installed, adapter);
  console.log(`Added ${extension} extension.`);
}

export async function update({ target, adapter = 'opencode' }) {
  const aiDir = await installationDir(target, adapter);
  if (!(await exists(aiDir))) throw new Error('No .ai installation found. Run agents init first.');
  const config = await readConfig(aiDir);
  await copyCore(aiDir, { preserveMemory: true });
  for (const extension of config.extensions) await copyExtension(aiDir, extension);
  await writeConfig(aiDir, config.extensions, adapter);
  console.log('Updated Axel Engineering OS; project memory was preserved.');
}

export async function doctor({ target, adapter = 'opencode' }) {
  const aiDir = await installationDir(target, adapter);
  const required = ['agents', 'skills', 'workflows', 'checks', 'templates', 'memory', 'config.yaml', 'version.yaml'];
  console.log('Axel OS');
  let failed = false;
  for (const item of required) {
    const ok = await exists(path.join(aiDir, item));
    console.log(`${ok ? '✓' : '✗'} ${item}`);
    failed ||= !ok;
  }
  const count = await countSkills(path.join(aiDir, 'skills'));
  console.log(`${count} skills loaded`);
  if (failed) throw new Error('Installation is incomplete. Run agents update or agents init --force after backup.');
}

async function copyCore(aiDir, { preserveMemory = false } = {}) {
  const registry = await loadRegistry();
  await mkdir(aiDir, { recursive: true });
  const coreDir = path.join(registry.root, registry.packages.core.source);
  const entries = await readdir(coreDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'gitignore.template' || entry.name === 'package.json') continue;
    if (preserveMemory && entry.name === 'memory') continue;
    await cp(path.join(coreDir, entry.name), path.join(aiDir, entry.name), { recursive: true, force: true });
  }
  await installIgnoreRules(aiDir, preserveMemory);
  if (!preserveMemory) await rm(path.join(aiDir, 'memory', 'gitignore.template'), { force: true });
}

async function copyExtension(aiDir, extension) {
  assertExtension(extension);
  const registry = await loadRegistry();
  const item = registry.packages[extension];
  await cp(path.join(registry.root, item.source, 'skills'), path.join(aiDir, 'skills'), { recursive: true, force: true });
}

async function writeConfig(aiDir, extensions, adapter) {
  const config = `name: axel-os\nversion: 1.0.0\nadapter: ${adapter}\nagent_system: enabled\nskill_loader:\n  auto_detect: true\n  minimum_sufficient_set: true\nmemory:\n  enabled: true\nchecks:\n  before_commit: true\n  evidence_first: true\nextensions:\n${extensions.map((name) => `  - ${name}`).join('\n') || '  - core'}\n`;
  await writeFile(path.join(aiDir, 'config.yaml'), config);
}

async function readConfig(aiDir) {
  const content = await readFile(path.join(aiDir, 'config.yaml'), 'utf8');
  const match = content.match(/^extensions:\n((?:  - .*\n?)*)/m);
  return { extensions: (match?.[1].match(/^  - (.+)$/gm) ?? []).map((line) => line.slice(4)).filter((name) => name !== 'core') };
}

function resolveExtensions(profile, stacks) {
  const fromProfile = profile ? profiles[profile] : [];
  if (profile && !fromProfile) throw new Error(`Unknown project type: ${profile}`);
  const fromStacks = stacks ? stacks.split(',').map((value) => value.trim()).filter(Boolean) : [];
  const selected = [...new Set([...fromProfile, ...fromStacks])];
  selected.forEach(assertExtension);
  return selected;
}

function assertExtension(extension) {
  if (!['laravel', 'react', 'go'].includes(extension)) throw new Error('Unknown extension: ' + extension + '. Available: laravel, react, go');
}

async function exists(target) {
  try { await access(target, constants.F_OK); return true; } catch { return false; }
}

async function countSkills(dir) {
  if (!(await exists(dir))) return 0;
  let count = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) count += await countSkills(path.join(dir, entry.name));
    else if (entry.name.endsWith('.md')) count += 1;
  }
  return count;
}

async function installIgnoreRules(aiDir, preserveMemory) {
  const registry = await loadRegistry();
  const coreDir = path.join(registry.root, registry.packages.core.source);
  const rootTemplate = await readFile(path.join(coreDir, 'gitignore.template'), 'utf8');
  const rootIgnore = path.join(aiDir, '..', '.gitignore');
  const marker = '# Axel Engineering OS: local sensitive memory';
  const current = await exists(rootIgnore) ? await readFile(rootIgnore, 'utf8') : '';
  if (!current.includes(marker)) await writeFile(rootIgnore, `${current}${current && !current.endsWith('\n') ? '\n' : ''}\n${rootTemplate}`);

  const memoryIgnore = path.join(aiDir, 'memory', '.gitignore');
  if (!preserveMemory || !(await exists(memoryIgnore))) {
    const memoryTemplate = await readFile(path.join(coreDir, 'memory', 'gitignore.template'), 'utf8');
    await writeFile(memoryIgnore, memoryTemplate);
  }
}

async function installationDir(target, adapterName) {
  if (!adapterNames.has(adapterName)) throw new Error(`Unknown adapter: ${adapterName}. Available: ${[...adapterNames].join(', ')}`);
  const adapter = await loadAdapter(adapterName);
  return path.join(target, adapter.target_dir);
}

function printInstalled(extensions) {
  console.log('Core');
  console.log(' ├─ agents ✓');
  console.log(' ├─ skills ✓');
  console.log(' ├─ workflows ✓');
  console.log(' └─ checks ✓');
  if (extensions.length) {
    console.log('Extensions');
    for (const extension of extensions) console.log(` ├─ ${extension} ✓`);
  }
  console.log('Created: .ai/');
  console.log('Ready 🚀');
}

import { access, readFile, readdir, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';
import { loadAdapter } from './registry.js';

const engineeringCommands = new Set(['new-feature', 'fix-bug', 'review', 'optimize', 'deploy']);

export async function runEngineeringCommand({ target, name, task, adapter = 'opencode' }) {
  if (!engineeringCommands.has(name)) throw new Error(`Unknown engineering command: ${name}`);
  const environment = await loadAdapter(adapter);
  const osDir = path.join(target, environment.target_dir);
  const commandFile = path.join(osDir, 'commands', `${name}.md`);
  try { await access(commandFile, constants.F_OK); } catch { throw new Error(`No Axel OS installation for ${adapter}. Run axel-agents init first.`); }
  const contract = await readFile(commandFile, 'utf8');
  console.log(`Axel command: /${name}`);
  console.log(`Adapter: ${adapter}`);
  console.log(`Task: ${task || '(not supplied)'}`);
  console.log(`Contract: ${path.relative(target, commandFile)}`);
  console.log('Next: load the command contract, route the agent, resolve the minimum skills, then emit an Evidence Report.');
  return contract;
}

export async function onboard({ target }) {
  const docsDir = path.join(target, 'docs');
  const found = [];
  const missing = [];

  const expectedDocs = ['usage.md', 'product.md', 'architecture.md', 'roadmap.md'];
  for (const doc of expectedDocs) {
    const docPath = path.join(docsDir, doc);
    try { await access(docPath, constants.F_OK); found.push(doc); } catch { missing.push(doc); }
  }

  if (found.length === 0) {
    console.log('No docs/ directory or standard .md files found.');
    console.log('Create docs/usage.md, docs/product.md, docs/architecture.md, docs/roadmap.md to enable onboarding.');
    return;
  }

  for (const doc of found) console.log(`✓ Found docs/${doc}`);
  for (const doc of missing) console.log(`✗ Missing docs/${doc}`);

  const projectType = await detectProjectType(target);
  const extensions = await detectExtensions(target);
  const stack = extensions.length ? extensions.join(', ') : '(core only)';

  console.log(`\nProject Type: ${projectType}`);
  console.log(`Stack: ${stack}`);
  console.log('AI Pipeline: Enabled');
  console.log('\nRecommended reading order:');
  found.forEach((doc, i) => console.log(`  ${i + 1}. docs/${doc}`));

  const prompt = generateOnboardingPrompt(found, projectType);
  console.log('\n=== AI Onboarding Prompt ===\n');
  console.log(prompt);

  const promptPath = path.join(target, 'docs', '.ai-onboard-prompt.md');
  try { await writeFile(promptPath, prompt); } catch {}
  console.log(`\nPrompt saved to: docs/.ai-onboard-prompt.md`);
  console.log('Copy/paste into your AI assistant to start.');
}

export async function context({ target, adapter = 'opencode' }) {
  const environment = await loadAdapter(adapter);
  const osDir = path.join(target, environment.target_dir);

  try { await access(osDir, constants.F_OK); } catch {
    throw new Error(`No Axel OS installation found at ${osDir}. Run axel-agents init first.`);
  }

  console.log('Axel OS Context');
  console.log('─'.repeat(40));

  const config = await readConfig(osDir);
  console.log(`Adapter:    ${config.adapter || adapter}`);
  console.log(`Extensions: ${config.extensions.length ? config.extensions.join(', ') : 'core only'}`);
  console.log(`Checks:     ${config.checks ? 'enabled' : 'disabled'}`);
  console.log(`Memory:     ${config.memory ? 'enabled' : 'disabled'}`);

  const counts = await countItems(osDir);
  console.log(`\nAgents:     ${counts.agents}`);
  console.log(`Skills:     ${counts.skills}`);
  console.log(`Workflows:  ${counts.workflows}`);
  console.log(`Commands:   ${counts.commands}`);
  console.log(`Hooks:      ${counts.hooks}`);
  console.log(`Checks:     ${counts.checks}`);
  console.log(`Prompts:    ${counts.prompts}`);

  console.log('\nReady for AI.');
}

export async function list({ target, adapter = 'opencode' }) {
  const environment = await loadAdapter(adapter);
  const osDir = path.join(target, environment.target_dir);

  try { await access(osDir, constants.F_OK); } catch {
    throw new Error(`No Axel OS installation found at ${osDir}. Run axel-agents init first.`);
  }

  const config = await readConfig(osDir);

  console.log('Agents');
  const agents = await listDir(osDir, 'agents', '.md');
  for (const name of agents) console.log(`  ✓ ${name}`);
  console.log();

  console.log('Commands');
  const cmds = await listDir(osDir, 'commands', '.md');
  for (const name of cmds) console.log(`  /${name}`);
  console.log();

  console.log('Skills');
  const skillsByCategory = await listSkillsByCategory(osDir);
  const totalSkills = Object.values(skillsByCategory).reduce((a, b) => a + b.length, 0);
  console.log(`  (${totalSkills} total)`);
  for (const [category, skills] of Object.entries(skillsByCategory).sort()) {
    console.log(`  ${category} (${skills.length}): ${skills.join(', ')}`);
  }
  console.log();

  console.log('Workflows');
  const workflows = await listDir(osDir, 'workflows', '.md');
  for (const name of workflows) console.log(`  ✓ ${name}`);
  console.log();

  console.log('Hooks');
  const hooks = await listDir(osDir, 'hooks', '.md');
  for (const name of hooks) console.log(`  ✓ ${name}`);
  console.log();

  console.log('Checks');
  const checks = await listDir(osDir, 'checks', '.md');
  for (const name of checks) console.log(`  ✓ ${name}`);
  console.log();

  console.log('Prompts');
  const prompts = await listDir(osDir, 'prompts', '.md');
  for (const name of prompts) console.log(`  ✓ ${name}`);
  console.log();

  console.log('Installed Extensions');
  if (config.extensions.length) {
    for (const ext of config.extensions) console.log(`  ✓ ${ext}`);
  } else {
    console.log('  (core only)');
  }
}

async function detectProjectType(target) {
  const checks = [
    { file: 'composer.json', type: 'Laravel/PHP' },
    { file: 'package.json', type: 'Node.js' },
    { file: 'go.mod', type: 'Go' },
    { file: 'requirements.txt', type: 'Python' },
    { file: 'Gemfile', type: 'Ruby' },
  ];
  for (const { file, type } of checks) {
    try { await access(path.join(target, file), constants.F_OK); return type; } catch {}
  }
  return 'Unknown';
}

async function detectExtensions(target) {
  const extensions = [];
  const checks = [
    { file: 'artisan', ext: 'laravel' },
    { file: 'composer.json', ext: 'laravel' },
    { file: 'package.json', ext: 'react', parser: detectReact },
  ];
  const seen = new Set();
  for (const { file, ext, parser } of checks) {
    try {
      await access(path.join(target, file), constants.F_OK);
      if (parser) {
        const detected = await parser(target);
        if (detected && !seen.has(ext)) { extensions.push(ext); seen.add(ext); }
      } else if (!seen.has(ext)) {
        extensions.push(ext);
        seen.add(ext);
      }
    } catch {}
  }
  return extensions;
}

async function detectReact(target) {
  try {
    const content = await readFile(path.join(target, 'package.json'), 'utf8');
    return content.includes('react');
  } catch { return false; }
}

async function readConfig(osDir) {
  try {
    const content = await readFile(path.join(osDir, 'config.yaml'), 'utf8');
    const data = parseYaml(content);
    return {
      adapter: data.adapter ?? 'opencode',
      extensions: (data.extensions ?? []).filter(n => n !== 'core'),
      memory: data.memory?.enabled ?? true,
      checks: data.checks?.before_commit ?? true,
    };
  } catch { return { adapter: 'opencode', extensions: [], memory: true, checks: true }; }
}

async function countItems(osDir) {
  return {
    agents: (await listDir(osDir, 'agents', '.md')).length,
    skills: await countSkills(path.join(osDir, 'skills')),
    workflows: (await listDir(osDir, 'workflows', '.md')).length,
    commands: (await listDir(osDir, 'commands', '.md')).length,
    hooks: (await listDir(osDir, 'hooks', '.md')).length,
    checks: (await listDir(osDir, 'checks', '.md')).length,
    prompts: (await listDir(osDir, 'prompts', '.md')).length,
  };
}

async function listDir(osDir, subdir, extension) {
  const dir = path.join(osDir, subdir);
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    return entries
      .filter(e => e.isFile() && e.name.endsWith(extension) && e.name !== `README${extension}`)
      .map(e => e.name.replace(extension, ''))
      .sort();
  } catch { return []; }
}

async function listSkillsByCategory(osDir) {
  const skillsDir = path.join(osDir, 'skills');
  const categories = {};
  try {
    const entries = await readdir(skillsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const categoryDir = path.join(skillsDir, entry.name);
      const files = await readdir(categoryDir, { withFileTypes: true });
      const skillFiles = files.filter(f => f.isFile() && f.name.endsWith('.md'));
      if (skillFiles.length) {
        categories[entry.name] = skillFiles.map(f => f.name.replace('.md', '')).sort();
      }
      // Check subdirectories for extension skills (e.g., skills/backend/laravel/)
      const subDirs = files.filter(f => f.isDirectory());
      for (const sub of subDirs) {
        const subDir = path.join(categoryDir, sub.name);
        const subFiles = await readdir(subDir, { withFileTypes: true });
        const subSkillFiles = subFiles.filter(f => f.isFile() && f.name.endsWith('.md'));
        if (subSkillFiles.length) {
          const key = `${entry.name}/${sub.name}`;
          categories[key] = subSkillFiles.map(f => f.name.replace('.md', '')).sort();
        }
      }
    }
  } catch {}
  return categories;
}

async function countSkills(dir) {
  try {
    let count = 0;
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) count += await countSkills(path.join(dir, entry.name));
      else if (entry.name.endsWith('.md')) count += 1;
    }
    return count;
  } catch { return 0; }
}

function generateOnboardingPrompt(foundDocs, projectType) {
  const fileList = foundDocs.map(d => `- docs/${d}`).join('\n');
  return `Read the following files in order:

${fileList}

Summarize the project.

Detected:
- Project Type: ${projectType}
- AI Engineering OS: Axel Agents (installed)

Wait for further instructions.`;
}

export async function version({ target, adapter = 'opencode' }) {
  const environment = await loadAdapter(adapter);
  const osDir = path.join(target, environment.target_dir);

  let packageVersion = 'unknown';
  try {
    const pkgPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../package.json');
    const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
    packageVersion = pkg.version;
  } catch {}

  let installedVersion = 'unknown';
  try {
    const content = await readFile(path.join(osDir, 'version.yaml'), 'utf8');
    const data = parseYaml(content);
    installedVersion = data.version ?? 'unknown';
  } catch {}

  console.log('Axel Engineering OS');
  console.log(`Package:   ${packageVersion}`);
  console.log(`Installed: ${installedVersion}`);
  console.log(`Adapter:   ${adapter}`);
  console.log(`Path:      ${osDir}`);
}

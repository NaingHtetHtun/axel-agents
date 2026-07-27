import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { loadAdapter } from './registry.js';

const commands = new Set(['new-feature', 'fix-bug', 'review', 'optimize', 'deploy']);

export async function runEngineeringCommand({ target, name, task, adapter = 'opencode' }) {
  if (!commands.has(name)) throw new Error(`Unknown engineering command: ${name}`);
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

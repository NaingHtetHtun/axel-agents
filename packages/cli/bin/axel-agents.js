#!/usr/bin/env node

import { install, addExtension, doctor, update } from '../src/installer.js';
import { createInterface } from 'node:readline/promises';
import { runEngineeringCommand, onboard, context, list, version } from '../src/commands.js';

const [command = 'help', ...args] = process.argv.slice(2);
const target = process.env.AXEL_TARGET ?? process.cwd();

const usage = `Axel Engineering OS

Usage:
  agents init [laravel-api|react-app|go-service] [--stack laravel,react] [--force]
  agents add <laravel|react|go>
  agents update
  agents doctor
  agents onboard
  agents context
  agents list
  agents version
  agents <new-feature|fix-bug|review|optimize|deploy> [task] [--adapter opencode]
`;

try {
  switch (command) {
    case 'init':
      {
        const adapter = valueAfter(args, '--adapter') ?? await selectedAdapter(args);
        const stacks = await selectedStacks(args);
        await install({ target, profile: positionalArgs(args)[0], stacks, adapter, force: args.includes('--force') });
      }
      break;
    case 'add':
      if (!args[0]) throw new Error('Usage: agents add <laravel|react|go>');
      await addExtension({ target, extension: args[0], adapter: valueAfter(args, '--adapter') });
      break;
    case 'update':
      await update({ target, adapter: valueAfter(args, '--adapter') });
      break;
    case 'doctor':
      await doctor({ target, adapter: valueAfter(args, '--adapter') });
      break;
    case 'onboard':
      await onboard({ target });
      break;
    case 'context':
      await context({ target, adapter: valueAfter(args, '--adapter') });
      break;
    case 'list':
      await list({ target, adapter: valueAfter(args, '--adapter') });
      break;
    case 'version':
      await version({ target, adapter: valueAfter(args, '--adapter') });
      break;
    case 'help':
    case '--help':
    case '-h':
      console.log(usage);
      break;
    default:
      if (['new-feature', 'fix-bug', 'review', 'optimize', 'deploy'].includes(command)) {
        await runEngineeringCommand({ target, name: command, task: positionalArgs(args).join(' '), adapter: valueAfter(args, '--adapter') });
      } else throw new Error(`Unknown command: ${command}\n\n${usage}`);
  }
} catch (error) {
  console.error(`Axel OS error: ${error.message}`);
  process.exitCode = 1;
}

function valueAfter(args, flag) {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

async function selectedStacks(args) {
  const supplied = valueAfter(args, '--stack');
  const profile = positionalArgs(args)[0];
  if (supplied || profile || !process.stdin.isTTY) return supplied;
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await prompt.question('Choose stacks (laravel, react, go; comma-separated; blank for core only): ');
  prompt.close();
  return answer.trim() || undefined;
}

function positionalArgs(args) {
  const withValues = new Set(['--stack', '--adapter']);
  return args.filter((arg, index) => !arg.startsWith('--') && !withValues.has(args[index - 1]));
}

async function selectedAdapter(args) {
  const supplied = valueAfter(args, '--adapter');
  if (supplied || !process.stdin.isTTY) return supplied ?? 'opencode';
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await prompt.question('Select AI environment (opencode, claude-code, cursor, codex; default opencode): ');
  prompt.close();
  return answer.trim() || 'opencode';
}

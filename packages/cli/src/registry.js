import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

export async function loadRegistry() {
  const content = await readFile(path.join(root, 'registry.yaml'), 'utf8');
  const packages = {};
  let current;
  for (const line of content.split('\n')) {
    const packageMatch = line.match(/^  ([a-z-]+):$/);
    if (packageMatch) { current = packageMatch[1]; packages[current] = { name: current, depends: [] }; continue; }
    const sourceMatch = line.match(/^    source: (.+)$/);
    if (sourceMatch && current) packages[current].source = sourceMatch[1];
    const dependencyMatch = line.match(/^      - (.+)$/);
    if (dependencyMatch && current) packages[current].depends.push(dependencyMatch[1]);
  }
  if (!packages.core?.source) throw new Error('registry.yaml must define packages.core.source');
  return { root, packages };
}

export async function loadAdapter(name) {
  const { root } = await loadRegistry();
  const content = await readFile(path.join(root, 'packages', 'adapters', name, 'adapter.yaml'), 'utf8');
  const values = Object.fromEntries(content.split('\n').map((line) => line.match(/^([a-z_]+):\s*(.+)$/)).filter(Boolean).map((match) => [match[1], match[2]]));
  if (!values.target_dir) throw new Error(`Adapter ${name} has no target_dir`);
  return { name, ...values };
}

import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cliDir = path.join(root, 'packages', 'cli');
const resourcesDir = path.join(cliDir, 'resources');

async function build() {
  console.log('Building Axel Engineering OS...\n');

  const rootPkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
  const version = rootPkg.version;
  console.log(`Version: ${version}`);

  const registryContent = await readFile(path.join(root, 'registry.yaml'), 'utf8');
  const registry = parseYaml(registryContent);

  if (existsSync(resourcesDir)) {
    await rm(resourcesDir, { recursive: true });
    console.log('Cleaned: packages/cli/resources/');
  }

  await mkdir(resourcesDir, { recursive: true });

  const packages = Object.entries(registry.packages);

  for (const [name, pkg] of packages) {
    const sourceDir = path.join(root, pkg.source);
    if (!existsSync(sourceDir)) {
      console.log(`  Skipping ${name}: source not found at ${pkg.source}`);
      continue;
    }
    const targetDir = path.join(resourcesDir, name);
    await cp(sourceDir, targetDir, { recursive: true });
    console.log(`  Copied: ${name} (${pkg.source} -> resources/${name})`);

    const pkgJsonPath = path.join(targetDir, 'package.json');
    if (existsSync(pkgJsonPath)) {
      const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf8'));
      pkgJson.version = version;
      await writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
    }

    const versionYamlPath = path.join(targetDir, 'version.yaml');
    if (existsSync(versionYamlPath)) {
      let vContent = await readFile(versionYamlPath, 'utf8');
      const vData = parseYaml(vContent);
      vData.version = version;
      await writeFile(versionYamlPath, stringifyYaml(vData));
    }
  }

  const builtRegistry = { ...registry, packages: {} };
  for (const [name, pkg] of packages) {
    builtRegistry.packages[name] = {
      source: name,
      ...(pkg.depends?.length ? { depends: pkg.depends } : {})
    };
  }
  await writeFile(path.join(resourcesDir, 'registry.yaml'), stringifyYaml(builtRegistry));
  console.log('  Wrote: resources/registry.yaml (paths rewritten)');

  const cliPkgPath = path.join(cliDir, 'package.json');
  const cliPkg = JSON.parse(await readFile(cliPkgPath, 'utf8'));
  cliPkg.version = version;
  await writeFile(cliPkgPath, JSON.stringify(cliPkg, null, 2) + '\n');
  console.log(`\nUpdated: packages/cli/package.json version -> ${version}`);

  console.log(`\nBuild complete. Resources bundled in packages/cli/resources/`);
  console.log(`Packages: ${packages.map(([n]) => n).join(', ')}`);
}

build().catch(err => {
  console.error('Build failed:', err.message);
  process.exitCode = 1;
});

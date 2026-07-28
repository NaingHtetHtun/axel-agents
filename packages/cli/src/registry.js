import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { parse as parseYaml } from "yaml";
import path from "node:path";
import { fileURLToPath } from "node:url";

const cliDir = path.dirname(fileURLToPath(import.meta.url));

function resolveRoot() {
  const devRoot = path.resolve(cliDir, "../../..");
  if (existsSync(path.join(devRoot, "registry.yaml"))) return devRoot;

  const bundledRoot = path.resolve(cliDir, "../resources");
  if (existsSync(path.join(bundledRoot, "registry.yaml"))) return bundledRoot;

  throw new Error("Cannot locate registry.yaml. Run from source or build first.");
}

export async function loadRegistry() {
  const root = resolveRoot();
  const content = await readFile(path.join(root, "registry.yaml"), "utf8");
  const data = parseYaml(content);

  if (!data.packages?.core?.source)
    throw new Error("registry.yaml must define packages.core.source");

  for (const [name, pkg] of Object.entries(data.packages)) {
    pkg.name = name;
    pkg.depends = pkg.depends ?? [];
  }

  return { root, packages: data.packages };
}

export async function loadAdapter(name) {
  const { root } = await loadRegistry();
  const isDev = existsSync(path.join(root, "packages"));
  const adapterDir = isDev
    ? path.join(root, "packages", "adapters", name)
    : path.join(root, "adapters", name);
  const content = await readFile(path.join(adapterDir, "adapter.yaml"), "utf8");
  const data = parseYaml(content);
  if (!data.target_dir)
    throw new Error(`Adapter ${name} has no target_dir`);
  return { name, ...data };
}

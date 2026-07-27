# Extension Registry

Each registry entry declares a portable extension pack and the skills it installs or enables. Paths are relative to `.ai/skills/`, extension names are unique, and `skill_schema` must be compatible with `.ai/version.yaml`. A registry is metadata only: an agent must still resolve manifests, dependencies, and project stack before loading skills.

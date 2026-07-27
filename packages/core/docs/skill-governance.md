# Skill Governance

Before adding or changing a skill, perform an overlap review.

1. State the proposed skill's single decision or workflow responsibility in one sentence.
2. Search `docs/skill-catalog.md` and manifests by category, tags, and related skills.
3. Compare purpose, inputs, outputs, and rules with the nearest existing skills.
4. Merge into an existing skill when the responsibility and triggers are substantially the same.
5. Create a new skill only when it owns a distinct boundary, has distinct inputs/outputs, and can be selected independently.
6. Add manifest dependencies and update the catalog; reject cycles and duplicate names.

Record the overlap decision in the change description. Prefer a precise improvement to an existing skill over aliases such as `laravel-controller` and `laravel-controllers`; manifest names are canonical.

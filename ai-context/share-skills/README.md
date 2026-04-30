# share-skills

This directory is the source of truth for project-level shared skills.

Current structure:

- `agent-skills-coder/`
- `openspec-workflow/`
- `projections.json`

Projection model:

- Project-level connection layer:
  - `.claude/skills/`
  - `.codex/skills/`
  - `.cursor/skills/`
  - `.claude/commands/opsx/`
- User-level projection layer:
  - `~/.claude/skills/`
  - `~/.codex/skills/`
  - `~/.cursor/skills/`
  - `~/.claude/commands/opsx/`

Rules:

- Update shared skill content here first.
- Do not edit projected links or copies directly.
- Do not introduce absolute paths in skill assets, commands, or helper scripts.
- Use `node scripts/tools/sync-share-skills.js --project-only` when you need to refresh project-level projections safely inside this repo.
- Use `node scripts/tools/sync-share-skills.js` only when you intentionally want to refresh both project-level and user-level projections.
- Use `node scripts/tools/check-no-absolute-skill-paths.js` before merging shared skill changes.

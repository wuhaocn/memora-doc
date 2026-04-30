# Memora Repo Notes

## Current Product Focus

Memora 当前收敛到一条主交付链路：

`tenant -> knowledge base -> document tree -> editing -> versions -> permissions`

当前仓库不再围绕早期 `Doc Studio`、资源库、AI 技能系统或桌面同步客户端组织。如果发现这些方向的描述，除非当前 README 或 canonical 文档明确说明，否则都应视为历史信息。

## Repository Map

```text
memora-doc/
├── memora-server/      # Spring Boot backend
├── memora-web-app/     # React web console
├── doc/                # product, architecture, and dev docs
├── build.gradle.kts
└── settings.gradle.kts
```

## Source Of Truth

- Start with [README.md](./README.md) for current scope and reading order.
- Backend details live in [memora-server/README.md](./memora-server/README.md).
- Web details live in [memora-web-app/README.md](./memora-web-app/README.md).
- Product and architecture decisions live under `doc/`.

## Working Rules

- Prefer improving the online document main flow over expanding side systems.
- Keep multi-tenant isolation, permission checks, and document/version integrity explicit.
- Do not reintroduce old `Doc Studio` naming.
- Do not reintroduce desktop-client scope into the current baseline unless the canonical docs are updated first.
- When updating docs, prefer fixing canonical entry docs over adding more parallel summaries.

## AI Context And Skills

If this repository uses shared skills or command projections, follow this layout:

- Source of truth: `ai-context/share-skills/`
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

- Update shared skill content only under `ai-context/share-skills/`.
- Treat project-level skill directories as projections, not as independent fact sources.
- Do not write absolute filesystem paths into shared skills, command docs, or scripts.
- Refresh project-level projections with `node scripts/tools/sync-share-skills.js --project-only`.
- Use `node scripts/tools/check-no-absolute-skill-paths.js` before merging skill or command changes.

## Validation

- Backend: `./scripts/backend-test.sh`
- Web: `cd memora-web-app && npm install && npm run lint && npm run build`

## Known Environment Notes

- Backend scripts are wrapper-first and will default `GRADLE_USER_HOME` into the repository when `./gradlew` is used.
- Backend validation still depends on a usable Gradle runtime plus native library compatibility on the local machine.
- `./gradlew` still requires a reachable Gradle distribution source when the wrapper distribution is not already cached.
- Web validation requires local npm dependencies.

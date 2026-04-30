---
name: openspec-workflow
description: Use this skill whenever the user wants spec-driven development, asks to create or refine a proposal, design, tasks, or spec, mentions OpenSpec or opsx commands, or works in a repository with an openspec directory. This skill is the stable user-facing OpenSpec entrypoint and routes to the right underlying workflow step.
---

# OpenSpec Workflow

Use this skill as the stable user-facing entrypoint for OpenSpec-style change management.

Do not treat this skill as the entire workflow itself. Its job is to route work to the right underlying skill from:

- `skills/`

When Claude command projections are relevant, the companion command source lives under:

- `claude/commands/opsx/`

## When to Use

Use this skill when any of the following are true:

- the user mentions `OpenSpec`, `openspec`, `opsx`, `proposal`, `spec`, `design`, `tasks`, or archive
- the repository contains `openspec/`
- the user wants structured change artifacts before or during implementation
- the user asks whether to start a new change or update an existing one

## Routing Rules

Before acting, inspect the local OpenSpec state and read the corresponding underlying skill file.

- Exploration or requirements clarification:
  - read `skills/openspec-explore/SKILL.md`
- Implementing from an approved change:
  - read `skills/openspec-apply-change/SKILL.md`
- Archiving a completed change:
  - read `skills/openspec-archive-change/SKILL.md`
- Proposing a new change package:
  - read `skills/openspec-propose/SKILL.md`

If the request maps more naturally to a command workflow, keep the command projection names aligned with `claude/commands/opsx/`.

## Default Artifact Flow

For standard OpenSpec-managed work, follow this sequence:

```text
explore/propose -> spec/design/tasks -> apply -> verify -> archive
```

Do not start with code if proposal, spec, design, or tasks are the missing bottleneck.

## Working Rules

When this skill triggers:

1. State which underlying OpenSpec skill applies.
2. Read that `SKILL.md` before proceeding.
3. Keep artifact boundaries explicit.
4. If implementation reveals a mismatch, update artifacts before continuing.

## Install and Update Notes

- This skill is maintained from the shared source under `ai-context/share-skills/openspec-workflow/`.
- The `skills/` subdirectory is implementation support for this stable entrypoint.
- User-level projections should expose the stable skill name `openspec-workflow`.
- Update the shared source first, then refresh project-level projections with `node scripts/tools/sync-share-skills.js --project-only`.

## Example Prompts

- `Use openspec-workflow for this repo.`
- `Use openspec-workflow and create a new change for this feature.`
- `Use openspec-workflow and decide whether this should update the current change.`
- `Use openspec-workflow and continue from tasks.`
- `Use openspec-workflow and verify whether this is ready to archive.`

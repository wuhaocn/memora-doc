---
name: agent-skills-coder
description: Use this skill whenever the user wants a disciplined engineering workflow for specification, planning, implementation, testing, debugging, review, or shipping, or explicitly mentions agent-skills-coder. This skill is the stable user-facing entrypoint and routes to the right underlying workflow skill before implementation.
---

# Agent Skills Coder

Use this skill as the stable user-facing entrypoint for the local engineering workflow system.

Do not treat this skill as the full workflow itself. Its job is to choose the right underlying skill from:

- `skills/`

## When to Use

Use this skill when any of the following are true:

- the user explicitly mentions `agent-skills-coder`
- the user wants a spec-first or workflow-driven approach
- the user asks to plan before coding
- the user asks to implement incrementally with tests
- the user asks to debug, review, or assess ship readiness
- the task clearly maps to one of the software lifecycle phases below

## Routing Rules

Before acting, classify the task and read the corresponding underlying skill file.

- API design:
  - read `skills/api-design/SKILL.md`
- Codebase understanding or architecture inspection:
  - read `skills/code-analysis/SKILL.md`
- Code generation or implementation scaffolding:
  - read `skills/code-generation/SKILL.md`
- Deployment or monitoring work:
  - read `skills/deployment-monitoring/SKILL.md`
- Documentation authoring:
  - read `skills/documentation-generation/SKILL.md`
- Frontend work:
  - read `skills/frontend-design/SKILL.md`
- Module creation or module restructuring:
  - read `skills/module-development/SKILL.md`
- Reactive or WebFlux work:
  - read `skills/reactive-programming/SKILL.md`
- Skill creation or skill refactoring:
  - read `skills/skill-creator/SKILL.md`
- Spring AI work:
  - read `skills/spring-ai-development/SKILL.md`
- Test design or test implementation:
  - read `skills/test-generation/SKILL.md`

If the task spans multiple areas, read the minimum set of relevant underlying skills before proceeding.

## Default Lifecycle

For non-trivial feature work, use this working sequence:

```text
understand scope -> pick the right underlying skill -> implement in small slices
-> verify -> refine docs/tests if needed
```

Do not jump straight to implementation if the task clearly needs scoping or design first.

## Working Rules

When this skill triggers:

1. State which underlying skill or skills apply.
2. Read the corresponding `SKILL.md` file before proceeding.
3. Follow that workflow instead of improvising a generic approach.
4. Keep outputs aligned to the chosen phase, such as analysis, plan, implementation slice, test update, or review.

## Install and Update Notes

- This skill is maintained from the shared source under `ai-context/share-skills/agent-skills-coder/`.
- The `skills/` subdirectory is implementation support for this stable entrypoint.
- User-level projections should expose the stable skill name `agent-skills-coder`.
- Update the shared source first, then refresh project-level projections with `node scripts/tools/sync-share-skills.js --project-only`.

## Example Prompts

- `Use agent-skills-coder for this repo.`
- `Use agent-skills-coder and decide the right workflow for this task.`
- `Use agent-skills-coder and start with the right spec or planning workflow.`
- `Use agent-skills-coder and continue the next implementation step.`
- `Use agent-skills-coder and review whether this change is ready to merge.`

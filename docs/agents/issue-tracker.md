# Issue tracker: GitHub

Issues and PRDs for this repo live in GitHub Issues. Use `gh` CLI for issue-tracker operations.

## Conventions

- Create issue: `gh issue create --title "..." --body "..."`
- Read issue: `gh issue view <number> --comments`
- List issues: `gh issue list`
- Comment: `gh issue comment <number> --body "..."`
- Apply or remove labels: `gh issue edit <number> --add-label "..."` or `--remove-label "..."`
- Close issue: `gh issue close <number> --comment "..."`

Infer repo from local git remote. This repo points to `https://github.com/Tonkic/Tonkic.github.io.git`.

## When a skill says "publish to issue tracker"

Create GitHub issue.

## When a skill says "fetch relevant ticket"

Run `gh issue view <number> --comments`.

## Boundary

`docs/` is not issue tracker. `docs/` stores implemented feature docs, project architecture, and feature information.

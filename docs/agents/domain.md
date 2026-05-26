# Domain Docs

How engineering skills should consume this repo's domain documentation.

## Layout

This repo is single-context.

- Read root `CONTEXT.md` when present.
- Read `docs/adr/` for architecture decisions when present.
- If either path does not exist, proceed silently.

## `docs/` meaning

`docs/` stores documentation for implemented features, project architecture, and feature information.

`docs/` is not:

- issue tracker
- requirements backlog
- request inbox

## Vocabulary

When output names domain concept, prefer terms defined in `CONTEXT.md`.

If needed concept is missing, note gap for `/grill-with-docs` instead of inventing repo language casually.

## ADR conflicts

If output conflicts with existing ADR, surface conflict explicitly instead of silently overriding it.

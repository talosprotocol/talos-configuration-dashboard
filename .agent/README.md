# Agent workspace: site/configuration-dashboard
> **Project**: site/configuration-dashboard

This folder contains agent-facing context, tasks, workflows, and planning artifacts for this submodule.

## Current State
Configuration dashboard that relies on a BFF service for safe scaling. Focus includes templates and visual builders and fixing proxy routing and header forwarding issues.

## Expected State
Production-grade configuration editing with schema validation, safe publish workflows, and redacted exports. Strict boundaries where the browser calls only dashboard APIs.

## Behavior
Web UI for editing and publishing configurations. Integrates with configuration BFF and validates changes against schemas.

## How to work here
- Run/tests:
- Local dev:
- CI notes:

## Interfaces and dependencies
- Owned APIs/contracts:
- Depends on:
- Data stores/events (if any):

## Global context
See `.agent/context.md` for monorepo-wide invariants and architecture.

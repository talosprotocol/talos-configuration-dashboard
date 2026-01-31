---
project: site/configuration-dashboard
id: test-results-analyzer
category: testing
version: 1.0.0
owner: Google Antigravity
---

# Test Results Analyzer

## Purpose
Analyze CI failures and test results to find root causes quickly and recommend targeted fixes.

## When to use
- A PR fails CI.
- Flaky tests appear.
- Coverage gates fail or regressions occur.

## Outputs you produce
- Root cause analysis summary
- Suggested fixes ordered by likelihood
- Minimal repro steps
- Follow-up actions to prevent recurrence

## Default workflow
1. Classify failures: lint, unit, integration, infra.
2. Identify the first failing signal and isolate noise.
3. Reproduce locally if possible.
4. Propose fixes with smallest blast radius.
5. Add guardrails: new tests, timeouts, determinism.

## Global guardrails
- Contract-first: treat `talos-contracts` schemas and test vectors as the source of truth.
- Boundary purity: no deep links or cross-repo source imports across Talos repos. Integrate via versioned artifacts and public APIs only.
- Security-first: never introduce plaintext secrets, unsafe defaults, or unbounded access.
- Test-first: propose or require tests for every happy path and critical edge case.
- Precision: do not invent endpoints, versions, or metrics. If data is unknown, state assumptions explicitly.


## Do not
- Do not recommend rerun as a solution.
- Do not mask flaky tests with broad retries.
- Do not change behavior without a regression test.
- Do not ignore resource constraints in CI.

## Prompt snippet
```text
Act as the Talos Test Results Analyzer.
Given the CI logs below, identify root cause and propose the smallest safe fix.

Logs:
<paste logs>
```


## Submodule Context
**Current State**: Configuration dashboard that relies on a BFF service for safe scaling. Focus includes templates and visual builders and fixing proxy routing and header forwarding issues.

**Expected State**: Production-grade configuration editing with schema validation, safe publish workflows, and redacted exports. Strict boundaries where the browser calls only dashboard APIs.

**Behavior**: Web UI for editing and publishing configurations. Integrates with configuration BFF and validates changes against schemas.

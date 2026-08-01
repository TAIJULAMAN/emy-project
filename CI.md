# EMY CI (Phase 5)

GitHub Actions runs on every push and pull request to validate the generator and output.

## Workflow

**Path:** `.github/workflows/ci.yml`

## Steps (in order)

| Step | Command | What it checks |
|------|---------|----------------|
| Install | `npm ci` or `npm install` | Dependencies (uses `package-lock.json` when present) |
| Generator syntax | `npm run check:generator` | All `src/generator/sections/*.cjs` parse and load |
| Rebuild | `npm run generate` | Writes `linked-pages/restore-may20/` |
| Smoke | `npm run smoke` | Output files exist; customer-home structure + parity |

`npm run verify` is equivalent to check + generate + smoke and is what CI runs as three separate steps for clearer failure logs.

## Local equivalent

```bash
npm run verify
```

## Parity baseline

Smoke includes `customer-home-parity.cjs`. After **intentional** customer-home output changes:

```bash
npm run generate
node scripts/customer-home-parity-guard.cjs --save
```

Commit the updated `work/customer-home-parity.sha256` with the functional change.

## Requirements

- Node.js 20+ (CI uses `node-version: '20'`)
- No secrets required for CI (static generator only)

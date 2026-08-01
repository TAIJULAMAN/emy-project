# Customer Home Pipeline (Phase 4 — template-first)

Customer home is the most complex page. This document maps how it is built so fixes stay scoped.

**See also:** `FEEDS.md` (Phase 5 feeds layer), `WHAT_CHANGED.md`.

## Build flow (default — template-first)

```
emyCustomerHomePageTemplate()          → 27-template-customer-home.cjs + parts (primary baseline)
        ↓
stripCustomerHomeDemoTemplates()       → 02e (demo HTML removal only)
        ↓
finaliseCustomerHomeGeneratedHtml()    → 02g (polish + clip mascot assets)
        ↓
46-manifest-post-process.cjs           → shared assets + notification thumb boxes
```

**Escape hatch:** `EMY_USE_LOCKED_HOME=1` or `npm run generate:locked-home` — uses last generated HTML as baseline and applies full runtime patches from `02c`–`02e`.

## Build flow (locked fallback)

```
readLockedCustomerHomeHtml()           → 02a
        ↓
stripCustomerHomeDemoTemplates()       → 02e
applyCustomerHomeRuntimePatches()      → 02c + 02d (notifications, avatars)
        ↓
finaliseCustomerHomeGeneratedHtml()    → 02g
```

## Section modules

| File | Template-first | Locked-only |
|------|----------------|-------------|
| `02a-customer-home-baseline.cjs` | Helpers | Read locked HTML |
| `02b-customer-home-detail-avatar.cjs` | In template / `18-*` | Injected by strip when missing |
| `02c-customer-home-notifications.cjs` | In template | Runtime patch |
| `02d-customer-home-avatars.cjs` | In template | Runtime patch |
| `02e-customer-home-strip-templates.cjs` | Demo markup strip | + runtime patches |
| `02g-customer-home-finalise.cjs` | Finalise + write | Same |

Feeds app: `27-customer-home-feeds-v2.cjs` → injected into page script as `emyFeedsAppInstallAndInit()`.

### Removed (merged into template / shared modules — parity verified)

| Former module | Now lives in |
|---------------|--------------|
| `02f-customer-home-feed-patches.cjs` | Template parts, `27-customer-home-feeds-v2.cjs`, `41-shared-boot-scripts.cjs` |
| `02h-customer-home-carousel-patches.cjs` | Template parts, `14-*`, `15-*`, `17-*`, `41-*` |
| Detail avatar patch in `02b` | `18-item-detail-modal-script.cjs` |

## Phase 4 checklist

- [x] Template-first rebuild as default (`resolveCustomerHomeBaseHtml`)
- [x] Runtime patches (`02c`–`02d`) skipped unless locked mode
- [x] `EMY_USE_LOCKED_HOME=1` remains optional escape hatch
- [x] Docs updated (`ARCHITECTURE.md`, this file)

## Phase 5 checklist

- [x] Unified content read (`emyContentStore`)
- [x] Single feeds app (`emyFeedsApp`) replaces annexed render/rescue/hydrate-only path
- [x] Home posted sections live-sync on create/delete
- [x] `FEEDS.md` with tab rules

## Phase 3 checklist (complete)

- [x] Split patch monolith into named modules
- [x] Template-first rebuild as default
- [x] Split page templates into parts (home, business profile, search, profile, chat, feeds)
- [x] External shared assets (Phase 2)
- [x] Remove redundant idempotent patches (02f, 02h) with byte parity proof
- [x] Parity guard + smoke test
- [x] `WHAT_CHANGED.md` for non-technical summary

## Commands

```bash
npm run generate                  # template-first (default)
npm run generate:locked-home      # legacy locked HTML baseline
npm run parity:customer-home      # byte-compare vs saved baseline
npm run smoke                     # includes parity test
npm run audit:customer-home       # marker report
```

Save a new parity baseline only after **intentional** output changes:

```bash
npm run generate
node scripts/customer-home-parity-guard.cjs --save
```

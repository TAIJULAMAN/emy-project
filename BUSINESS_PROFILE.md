# Business Profile Pipeline (Phase 4 — template-first)

Business profile is built the same way as customer home: **template-first**, shared assets via post-process, no locked-HTML baseline.

**See also:** `ARCHITECTURE.md`, `CUSTOMER_HOME.md`, `FEEDS.md`.

## Build flow (default — template-first)

```
emyBusinessProfilePageTemplate()     → 26-template-business-profile.cjs + parts (primary baseline)
        ↓
46-manifest-post-process.cjs         → external shared assets + page-specific injections
```

There is **no** `EMY_USE_LOCKED_PROFILE` escape hatch. The page is always generated from the template.

## Section modules

| File | Role |
|------|------|
| `26-template-business-profile.cjs` | Thin wrapper — composes parts + shared modules |
| `26-business-profile-template-parts.cjs` | HTML/CSS/page script split across `business_profile_part_1`–`_6` |
| `37-write-app-pages.cjs` | Writes `emy-business-profile.html` from template |
| `46-manifest-post-process.cjs` | Strips inline duplicates, injects `assets/*.js` |

### Wrapper composition

`emyBusinessProfilePageTemplate()` stitches:

- Parts 1–2: page shell, styles, markup
- Shared CSS: `customerTopbarCss`, `itemDetailModalCss`, `feedCreateFlowCss`
- Shared markup: `itemDetailModalMarkup`, `customerLocationSheetMarkup`, `businessFeedCreateFlowMarkup`
- Part 3: toast + script open
- Shared runtimes: video, media store/editor, feed carousel, edit sheet, location sheet
- Parts 4–6: business-specific page script
- Shared scripts: `feedCreateFlowScript`, `itemDetailModalScript`

Unlike customer home, business profile has **no** `02a`–`02g` runtime patch chain. Fixes belong in template parts or shared modules.

## Shared assets (Phase 2)

Post-process externalizes scripts that would otherwise duplicate across pages:

| Asset | Purpose |
|-------|---------|
| `emy-page-boot-gate.js` | Boot skeleton |
| `emy-platform-content-sync.js` | Cross-surface content refresh |
| `emy-real-data-guard.js` | Demo/real content guard |
| `emy-notification-router.js` | Notification deep links |
| `emy-central-engagement.js` | Likes, saves, reposts |
| `emy-account-session-nav.js` | Session + nav |
| `emy-real-backend-loader.js` | Firebase (non-blocking on business profile) |

Business profile also receives `emy-business-video-popup-controls` when video players are present.

## Size

Generated `emy-business-profile.html` is ~2.6 MB (page-specific business logic dominates). Shared runtime is in `linked-pages/restore-may20/assets/` and cached by the browser.

## Phase 4 checklist

- [x] Template-first build (`emyBusinessProfilePageTemplate` in `37-write-app-pages.cjs`)
- [x] Parts split (`26-business-profile-template-parts.cjs`)
- [x] No redundant idempotent post-process patches (no inline `data-emy-*` duplicates in template)
- [x] Shared assets via `45a` + `46-manifest-post-process.cjs`
- [x] Docs (`ARCHITECTURE.md`, this file)

## Commands

```bash
npm run generate          # rebuild business profile + all pages
npm run smoke             # verify output files exist
npm run verify            # check + generate + smoke
```

## Local preview

```bash
npm run serve
# Open http://127.0.0.1:8001/restore-may20/emy-business-profile.html
# Or http://127.0.0.1:8767/restore-may20/emy-business-profile.html
```

Localhost / `file://` skips Firebase auth gate (see `41-shared-boot-scripts.cjs`).

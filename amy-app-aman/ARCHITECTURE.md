# EMY Architecture

This document explains how the EMY linked-pages project is organized so fixes stay fast, scoped, and safe.

## Quick commands

```bash
npm run check:generator   # syntax-check all generator sections (no rebuild)
npm run generate          # rebuild linked-pages/restore-may20/
npm run smoke             # verify key output files exist
npm run verify            # check + generate + smoke
npm run serve             # local preview server
```

## CI (Phase 5)

See **`CI.md`**. Workflow: `.github/workflows/ci.yml` — runs `check:generator`, `generate`, and `smoke` on push/PR.

## Source of truth

| What | Where |
|------|--------|
| Page generator (split modules) | `src/generator/sections/*.cjs` |
| Generator loader | `src/generator/run.cjs` |
| CLI entry | `generate-linked-pages.cjs` |
| Generated site output | `linked-pages/restore-may20/` |
| Shared JS/CSS (generated, browser-cached) | `linked-pages/restore-may20/assets/` |
| Editable copies of shared assets | `src/generator/asset-sources/` |
| Firebase backend | `functions/index.js` |
| Firestore rules | `firestore.rules` |
| Original unsplit backup | `generate-linked-pages.monolith.cjs.bak` |

**Rule:** edit generator sections, not generated HTML. Rebuild to verify.

## Generator layout (46 sections)

The old 7 MB monolith is split into numbered sections under `src/generator/sections/`.
Section order is fixed — files are concatenated and executed in sort order (identical behavior to the original single file).

See `src/generator/sections/manifest.json` for line ranges and sizes.

### Where to edit for common tasks

| Task | Open these files |
|------|------------------|
| Customer home bugs | `02-customer-home-patches.cjs`, `16-customer-home-carousel-patches.cjs`, `27-template-customer-home.cjs` |
| Business profile | `26-template-business-profile.cjs`, `26-business-profile-template-parts.cjs` — see **`BUSINESS_PROFILE.md`** |
| Customer search | `29-template-customer-search.cjs` |
| Admin backend | `38-template-admin-backend.cjs`, `39-write-admin-page.cjs`, `45-admin-cloud-console.cjs` |
| Ask EMY pages | `05-ask-session.cjs` through `07-ask-styles-mascots.cjs`, `19-ask-auth-components.cjs`, `34-template-ask-about.cjs` |
| Sign in / sign up | `23-template-signin.cjs`, `24-template-signup.cjs` |
| Shared modals / feed UI | `08-item-detail-modal-css.cjs`, `13-item-detail-markup.cjs`, `18-item-detail-modal-script.cjs`, `14-feed-create-flow-script.cjs` |
| Firebase / real backend | `44-real-backend-runtime.cjs`, `46-manifest-post-process.cjs` |
| Marketing pages (index, about…) | `04-pages-config.cjs`, `20-transform-react-page.cjs`, `35-generate-marketing-pages.cjs` |
| Post-build injections (scripts/styles added to many pages) | `46-manifest-post-process.cjs`, `43-engagement-and-testing.cjs` |

## Customer home (Phase 4 — template-first)

See **`CUSTOMER_HOME.md`** for the build pipeline and **`FEEDS.md`** for feeds/tab rules.

**Default:** `emyCustomerHomePageTemplate()` is the baseline. Locked HTML is used only when `EMY_USE_LOCKED_HOME=1` or the template is empty.

Patch modules `02a`–`02g` are reduced:

| Module | Template-first | Locked mode (`EMY_USE_LOCKED_HOME=1`) |
|--------|----------------|----------------------------------------|
| `02a` | Baseline helpers only | Reads locked HTML fallback |
| `02e` | Demo markup strip | Demo strip + runtime JS patches |
| `02g` | Finalise (clip mascot, circles) | Same |

Runtime notification/avatar patches (`02c`–`02d`) apply only in locked mode; fixes live in template parts for normal builds.

### Business profile (Phase 4 — template-first)

See **`BUSINESS_PROFILE.md`**. Always built from `emyBusinessProfilePageTemplate()`; post-process applies shared assets (no locked-HTML baseline).

### Customer home boot orchestrator

`emyCustomerHomeBoot()` (`27a-emy-customer-router.cjs`) runs once per page load and owns:

1. `emyFeedsAppInstallAndInit()` — unified feeds read/render + content-sync registration
2. `ensureCustomerHomeContentSyncRegistered()` — legacy home refresh only when feeds app is absent
3. Home carousel/static sections + URL normalization via `EmyCustomerRouter.syncUrlToView`

Scheduled from `27-customer-home-template-parts.cjs` via `scheduleHomeIdleWork(..., 0)`.

### Customer home URL contract

Customer home tabs use **hash + `?tab=` fallback** so reloads and shared links stay on the same view:

- Feeds: `emy-customer-home.html?tab=feeds#feeds`
- Nearby: `emy-customer-home.html?tab=nearby#nearby`
- Home (default): `emy-customer-home.html` (no hash / no `tab`)

`EmyCustomerRouter` (`27a-emy-customer-router.cjs`) is the single authority for parsing and writing these URLs. `setView`, `applyInitialHomeRoute`, and `currentCustomerHomeView` delegate to it. Post-process rewrites legacy `emy-customer-feeds.html` and `#feeds`-only links to the `?tab=feeds#feeds` form (`42-post-process-utils.cjs`).

### Feeds (Phase 6)

See **`FEEDS.md`**.

| What | Where |
|------|--------|
| Unified content read | `window.emyContentStore` — `27-customer-home-feeds-v2.cjs` |
| Feeds render + sync | `window.emyFeedsApp` — same file, injected via `27-customer-home-template-parts.cjs` |
| Tab filter logic | `annexedFeedItemMatchesCurrentFilter()` in `27-customer-home-template-parts.cjs` |
| Create → storage | `14-feed-create-flow-script.cjs` |
| Cross-surface sync | `16-platform-content-sync.cjs` |

## Customer home (Phase 3 — historical)

See **`CUSTOMER_HOME.md`** for the full patch pipeline, section map, and fix workflow.

Customer home patches are split across `02a`–`02g` (feed/carousel patches removed — see `CUSTOMER_HOME.md`). Rebuild uses the **page template as primary baseline**.

Large page templates are split into `*-template-parts.cjs` (HTML chunks) + thin `*-template-*.cjs` wrappers:

| Page | Parts file | Wrapper |
|------|------------|---------|
| Customer home | `27-customer-home-template-parts.cjs` | `27-template-customer-home.cjs` |
| Business profile | `26-business-profile-template-parts.cjs` | `26-template-business-profile.cjs` |
| Customer search | `29-customer-search-template-parts.cjs` | `29-template-customer-search.cjs` |
| Customer profile | `31-customer-profile-template-parts.cjs` | `31-template-customer-profile.cjs` |
| Customer chat | `32-customer-chat-template-parts.cjs` | `32-template-customer-chat.cjs` |
| Customer feeds | `30-customer-feeds-template-parts.cjs` | `30-template-customer-feeds.cjs` |

### Execution flow

```
generate-linked-pages.cjs
  └── src/generator/run.cjs
        └── concatenates src/generator/sections/*.cjs (sorted)
              └── writes linked-pages/restore-may20/*.html + assets
```

## External inputs

Marketing page React sources are read from:

`C:/Users/steph/OneDrive - EMY/Desktop/Code Page EMY`

(configured via `sourceDir` in the generator — see `02-customer-home-patches.cjs`)

Customer home baseline HTML is built from `emyCustomerHomePageTemplate()` with lightweight post-process (demo strip + finalise). The previous generated page is used only when `EMY_USE_LOCKED_HOME=1` or the template is empty. See **`FEEDS.md`** for feeds architecture.

## Local preview

- `serve-linked-pages.cjs` — main dev server (gzip + long-cache for `assets/`)
- `preview-server.cjs` — alternate preview (same compression/cache behavior)
- Open `http://127.0.0.1:8001/restore-may20/emy-testing.html` for isolated test lane

## Performance (load speed)

Large app pages split page logic out of HTML during build (`47-extract-page-inline-scripts.cjs`):

| Page | HTML (after) | Page JS asset |
|------|----------------|---------------|
| Customer home | ~960 KB | `assets/emy-customer-home-page.js` |
| Business profile | ~740 KB | `assets/emy-business-profile-page.js` |
| Customer search | ~500 KB | `assets/emy-customer-search-page.js` |

Scripts load with `defer` + `preload`; shared assets use browser cache. Dev servers gzip responses (~430 KB over the wire for customer home vs ~2.6 MB before). Customer home defers business deck + feeds setup until the browser is idle so the shell appears faster.

**Lazy feeds/clips bundle** (customer home only): heavy feeds scripts (`emy-customer-home-media.js`, `emy-customer-home-feeds-app.js`, `emy-customer-home-feed-create.js`, `emy-customer-home-item-detail.js`) load only when you open Feeds or Clips (or in the background ~3s after Home). Core page JS is `assets/emy-customer-home-page.js`.

## Smoke tests

- `tests/smoke/generator-output.cjs` — fast check that rebuild produced key files
- Legacy Playwright smokes remain as `tmp-*-smoke.cjs` in project root (need server + Playwright)

## Re-splitting after manual monolith edits

If you ever edit the unsplit backup and need to re-split:

```bash
copy generate-linked-pages.monolith.cjs.bak generate-linked-pages.cjs
node tools/split-generator.cjs
```

Then restore the thin entry in `generate-linked-pages.cjs` (`require('./src/generator/run.cjs')`) and run `npm run check:generator`.

## Shared assets (Phase 2)

Post-process no longer duplicates large inline `<script>` / `<style>` blocks on every page.

During `npm run generate`, section `45a-external-asset-pipeline.cjs`:

1. Extracts shared runtime bundles into `linked-pages/restore-may20/assets/*.js` and `*.css`
2. Injects `<script src="assets/...">` / `<link rel="stylesheet" href="assets/...">` tags instead
3. Writes Firebase runtime once to `emy-account-runtime.js` (referenced by URL, not inlined)
4. Mirrors asset files to `src/generator/asset-sources/` for easier editing

**Benefits:** smaller HTML per page, browser caching of shared code, faster reloads, easier DevTools debugging.

To change shared runtime behavior today: edit the source constants in generator sections (e.g. `43-engagement-and-testing.cjs`), rebuild, and verify. The `asset-sources/` folder is a rebuild mirror for navigation — edit generator source unless you wire asset-sources as primary input later.

## Future improvements (safe to do incrementally)

1. ~~Move repeated inline `<script>` blocks into `linked-pages/restore-may20/assets/*.js`~~ **Done (Phase 2)**
2. Convert patch functions in `02-customer-home-patches.cjs` into direct template logic (delete patches over time).
3. Promote Playwright smokes from `tmp-*` into `tests/smoke/` when a flow is stable.
4. Make `src/generator/asset-sources/` the primary edit target (generator reads files instead of inline strings).

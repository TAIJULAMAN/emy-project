# What Changed in Phase 3 (Reorganization)

This phase **reorganized the build pipeline**. It did **not** remove website pages, user-facing features, or change the generated site output.

## What was NOT deleted or changed

- All pages under `linked-pages/restore-may20/` (including `emy-customer-home.html`)
- All shared assets under `linked-pages/restore-may20/assets/`
- Firebase, notifications, feeds, carousel, sign-in, or any app behaviour
- Your React source pages on the Desktop (still read by the generator)

## What WAS removed (generator source only)

These were **duplicate patch files** inside `src/generator/sections/`. They ran at build time and applied the same fixes already present in:

- `27-customer-home-template-parts.cjs` (page template)
- Shared modules (`14-feed-create-flow-*`, `15-media-runtimes.cjs`, `41-shared-boot-scripts.cjs`, etc.)

Removed files:

- `02f-customer-home-feed-patches.cjs`
- `02h-customer-home-carousel-patches.cjs`
- Detail-avatar patch logic in `02b` (clip-edit helper kept)

## Proof the website output is unchanged

After every removal we ran a **byte-identical check** on `emy-customer-home.html`:

```bash
npm run parity:customer-home
```

Baseline SHA256 (unchanged across removals):

`283ec3d8115402eea6284b99da7a7bd157fccb94a624a6c4c5315573d5a8c8e2`

Size: **2,591,877 bytes** — same before and after patch cleanup.

Smoke tests also pass: `npm run smoke`

## What still runs at build time (needed for correct output)

| Step | File | Purpose |
|------|------|---------|
| Template | `27-template-customer-home.cjs` + parts | Primary HTML/JS source |
| Demo strip + patches | `02e`, `02c`, `02d` | Demo cleanup, notifications, avatars |
| Finalise | `02g` | Clip mascot, legacy toolbar style |
| Post-process | `46-manifest-post-process.cjs` | External assets, thumb boxes |

These are **organizational** modules — not duplicate monolith patches.

## How to verify yourself

```bash
npm run generate
npm run parity:customer-home
npm run smoke
npm run serve
# Open http://127.0.0.1:8001/restore-may20/emy-customer-home.html
```

## Rollback

If you ever need the old “use previous generated HTML as baseline” flow:

```bash
npm run generate:locked-home
```

The monolith backup remains at `generate-linked-pages.monolith.cjs.bak`.

# EMY Persistence Rules

Read `SOURCE_OF_TRUTH.md` and `ARCHITECTURE.md` before changing EMY files.

## Surgical Change Rule

Treat EMY as fragile production work. Be extremely surgical, make the smallest reversible change that solves the requested issue, and do not perform broad cleanup or refactors unless the user explicitly asks for them.

- Do not change styling, layout, data transport, Firebase/Cloudinary/shared-store sync, feeds, likes, notifications, clips, profiles, or business/customer data unless the user asks for that exact area.
- Before patching, explain the exact cause and intended change when the user asks for analysis first or says not to patch.
- For performance work, measure first and separate low-risk asset/loading changes from runtime, hydration, feed, or storage changes.
- Never hide uncertainty. If a change could affect persistence, sync, or visible data, say so before editing.

- Generator source lives in **`src/generator/sections/*.cjs`** (split modules). The entry point is `generate-linked-pages.cjs`.
- `linked-pages/restore-may20/*.html` files are **generated output**. Do not make a fix only in those files.
- Before any update, read the **relevant section file(s)** and the current generated page. Do not rely on old chat summaries, stale backups, or older generated copies.
- Use `ARCHITECTURE.md` to find which section owns a page or feature.
- Backups under `backups/` are fallbacks only when the current page is missing.
- After source edits:
  1. `npm run check:generator` (syntax)
  2. `npm run generate` (rebuild)
  3. `npm run smoke` (structure + parity + assets)
  4. Verify the affected flow in the browser when practical
- Customer home pipeline: see **`CUSTOMER_HOME.md`**. Phase 3 reorg did not change site output — see **`WHAT_CHANGED.md`**.
- Keep fixes in generator source so future rebuilds and future chats keep them.

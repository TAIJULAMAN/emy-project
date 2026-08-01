# EMY Source Of Truth

Use this file as the persistence rule for future EMY repairs.

- Generator source for `linked-pages/restore-may20` lives in **`src/generator/sections/*.cjs`** (46 modules). `generate-linked-pages.cjs` is the thin entry point. Unsplit backup: `generate-linked-pages.monolith.cjs.bak`. See `ARCHITECTURE.md` for which section to edit.
- `linked-pages/restore-may20/*.html` files are generated output. They can be refreshed for local preview, but fixes made only there can be overwritten on the next rebuild.
- Fresh-read rule: before any update, read the current source file and current generated page first. Do not copy behavior from old chats, stale backups, or older generated snapshots.
- The locked customer home page must prefer the current generated `linked-pages/restore-may20/emy-customer-home.html` as the freshest baseline. `backups/official-restore-may20/emy-customer-home.html` is only a fallback if the current generated page is missing.
- Firebase backend source lives in `functions/index.js`.
- Firestore access rules live in `firestore.rules`.
- Every future fix should be saved in the source file that creates the behavior, then regenerated only as a verification step.

Recent persistent fixes:

- Admin backend data view: visual profile/media cards, real uploaded images/videos/posts/products/clips/jobs/events, raw JSON still available.
- Admin backend data activity section: business content/uploads and customer activity must stay separated into compact scrollable sections, not one giant media grid.
- Admin backend data searches: real profiles and activity/uploaded content sections must have dedicated search boxes for name, ID, email, phone, title, business, source, type, role, and status.
- Admin backend profile/content views: profile and content cards are the main visible view; old spreadsheet tables are kept only inside collapsed technical table sections.
- Admin backend media display: uploaded image/video/base64/data URL fields must render as real image/video previews wherever possible; use short labels only for media references that cannot be previewed. Full encoded values belong only in collapsed Raw JSON/technical sections.
- Admin backend cloud console: connected Firebase preview and admin delete callable integration.
- Admin delete source: `adminDeleteRecord` and admin assertion in Firebase Functions.
- Customer/business image separation: business cards, saved businesses, nearby rows, and business update avatars now use business-only image/logo media and reject the current customer profile image.
- Live profile avatars: customer-owned posts, reposts, jobs, events, and admin notification activity must resolve the current customer/business profile photo first, then fall back to older copied row photos only when no live profile image exists.
- Customer profile photo source: profile photo saves/removes must sync the customer profile-photo aliases (`emyCustomerProfilePhoto`, `emyCustomerProfileImage`, `emyCustomerAvatar`, `emyCustomerPhoto`, and matching `Src`/`Ref` keys) so posts and backend views do not read stale copied avatars.
- Business relationship notifications: "New customer added" and "Customer removed" business notifications must open `emy-customer-profile.html?customer=<customer>` and must not be treated as business review/profile redirects.
- Customer avatar initials: Home, Search, Chat, and Profile must derive fallback initials from the same customer profile identity path (`emyCustomerDisplayName`, customer first/last, pending first/last, then signed email). Do not use browser globals like `window.name`.
- Customer Home feed: saved-business notification preference labels such as `posts`, `products`, `clips`, and `offers` must never be converted into feed cards. Only real business content objects with actual content fields, media, IDs, or commerce/detail fields should render.
- Customer/business relationship buttons: public business profiles, product detail contact panels, business detail panels, clip viewers, and badges must use alias-aware customer-business checks. Do not rely on a single exact `emyCustomerBusiness:<key>` entry; read/write the business slug, display name, `profile` aliases, `emyCustomerBusinesses`, accepted relationship requests, and matching business-side customer rows.

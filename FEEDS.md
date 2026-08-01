# Customer Feeds (Phase 5)

Unified feeds layer for customer home (`emy-customer-home.html`). Feeds live on the **Feeds** view inside customer home (standalone `emy-customer-feeds.html` redirects here).

## Architecture

| Layer | Location | Role |
|-------|----------|------|
| **Content store** | `window.emyContentStore` in `27-customer-home-feeds-v2.cjs` | Single read path over all `emyFeedCreated*` / `emyBusiness*` localStorage keys |
| **Feeds app** | `window.emyFeedsApp` / `emyFeedsAppInstallAndInit()` | Render feeds + home posted sections; replaces legacy annexed load/render/rescue |
| **Card renderer** | `renderAnnexedFeedCard()` in template parts | HTML for feed cards (`data-open-item-detail`, media attrs) |
| **Interaction** | `setupAnnexedFeeds()` + `setupRealRailItemDetailLinks()` | Tab clicks, social actions, item-detail modal |
| **Sync hub** | `16-platform-content-sync.cjs` → `window.emyContentSync` | Cross-page refresh on create/delete/storage events |

## Tab filter rules

| Tab | Filter key | Shows |
|-----|------------|--------|
| **All** | `all` | Everything, including the signed-in customer's creates |
| **Posts** | `post` | Customer posts/updates only (not jobs, events, or articles) |
| **Individuals** | `individual` | Customer/individual content including own (display name, no "Your post" suffix); customer-posted jobs included |
| **Jobs** | `job` | All jobs, including customer-posted |
| **My Businesses** | `my` | Content from followed businesses only |
| **Businesses** | `businesses` | Nearby business content; excludes already-followed |
| **Events** | `event` | Events from followed customers/businesses + self, in saved area |
| **Products** | `product` | Product-type items |
| **Articles** | `article` | Article-type items |
| **Clips** | `clip` | Clip/reel items |
| **Offers** | `offer` | Offer-type items |

Filtering is implemented in `annexedFeedItemMatchesCurrentFilter()` (template parts). The feeds app delegates to that function after merging items via `annexedMergedFeedItems()`.

## Home "Your posted things"

| Section | DOM list | Source |
|---------|----------|--------|
| Posted updates | `[data-home-posted-posts-list]` | Customer posts from `emyFeedCreatedPosts` |
| Posted events | `[data-home-posted-events-list]` | `emyFeedCreatedEvents` |
| Posted jobs | `[data-home-posted-jobs-list]` | `emyFeedCreatedJobs` |
| Published articles | `[data-home-posted-articles-list]` | Articles from `emyFeedCreatedPosts` |

`emyFeedsApp.refreshAll()` re-renders these on `emy:created-*-changed` events without reload.

## Create flow

Create UI: `14-feed-create-flow-script.cjs` → writes to `emyFeedCreatedPosts` / `Jobs` / `Events` → dispatches `emy:created-*-changed` with `action: "create"` → `emyContentSync.notify()` → `emyFeedsApp.refreshAll()`.

Search (`29-customer-search-template-parts.cjs`) listens to the same events plus `storage` changes on `emyFeedCreated*` / `emyBusiness*` keys.

## Legacy code bypassed

When `window.__EMY_FEEDS_APP__` is set:

- `installAnnexedFeedListRescue` / `scheduleAnnexedFeedListRescue` — no-op (no rescue observers)
- `feedSurfaceShouldHydrateOnly` — always full render (no hydrate-only skip)
- `renderAnnexedFeeds` — replaced by `emyFeedsApp.render`
- `refreshHomeFeedSurfacesFromStorage` — replaced by feeds app refresh

`setupAnnexedFeeds()` still runs for tab switching and feed-list click handlers (comments, likes, options).

## Commands

```bash
npm run generate   # rebuild with feeds app embedded
npm run smoke      # verify output
```

## Local test

1. `npm run generate && npm run serve` (or open via preview on port 8767)
2. Open `http://127.0.0.1:8767/restore-may20/emy-customer-home.html`
3. Create a post → check **Feeds → All** and **Posts**, and **Home → Your posted things**
4. Click a card → item detail modal should open (not a static image)

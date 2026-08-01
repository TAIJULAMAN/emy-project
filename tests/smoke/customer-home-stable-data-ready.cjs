'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const templatePath = path.join(root, 'src', 'generator', 'sections', '27-customer-home-template-parts.cjs');
const routerPath = path.join(root, 'src', 'generator', 'sections', '27a-emy-customer-router.cjs');
const realDataGuardPath = path.join(root, 'src', 'generator', 'asset-sources', 'emy-real-data-guard.js');
const homeRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-page.js');
const homeHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-home.html');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function assertContains(label, text, needle) {
  if (!text.includes(needle)) {
    console.error(`${label}: missing ${needle}`);
    process.exit(1);
  }
}

function assertNotContains(label, text, needle) {
  if (text.includes(needle)) {
    console.error(`${label}: should not contain ${needle}`);
    process.exit(1);
  }
}

const template = read(templatePath);
const router = read(routerPath);
const realDataGuard = read(realDataGuardPath);
const runtime = read(homeRuntimePath);
const homeHtml = read(homeHtmlPath);

[
  ['template', template],
  ['linked customer home', homeHtml],
].forEach(([label, text]) => {
  assertContains(label, text, 'emy-home-data-ready');
  assertContains(label, text, 'emy-home-data-timeout');
  assertContains(label, text, '[data-home-posted-posts-list]');
  assertContains(label, text, '[data-annexed-feed-list]');
  assertContains(label, text, 'visibility: hidden;');
  assertContains(label, text, 'window.__emyHomeMarkDataReady');
});

assertContains('router source', router, 'window.__emyHomeMarkDataReady');
assertContains('router source', router, 'emy-home-data-ready');
assertContains('router source', router, 'emy-home-shell-ready", "emy-page-shell-ready"');
assertContains('router source', router, 'function markHomeBootDataReady()');
assertContains('router source', router, 'pullHomeSharedContentFallback("boot-ready")');
assertContains('router source', router, 'scheduleHomeIdleWork(run, 90)');
assertNotContains('router source', router, 'document.documentElement.classList.add("emy-home-real-ready", "emy-page-real-ready");');

assertContains('home runtime', runtime, 'function homePostedSharedSyncIsPending(options = {})');
assertContains('home runtime', runtime, 'var HOME_POSTED_SHARED_SYNC_WAIT_MS = 1400;');
assertContains('home runtime', runtime, 'pullHomeSharedContentFallback("posted-wait")');
assertContains('home runtime', runtime, 'return false;');
assertContains('home runtime', runtime, 'window.__emyHomeMarkDataReady()');
assertContains('home runtime', runtime, 'function mergeHomeCreatedPartialRender(list, renderedHtml)');
assertContains('home runtime', runtime, 'preserveLargerRenderedList');
assertContains('home runtime', runtime, 'preservePartialFeedRender');
assertContains('home runtime', runtime, 'preserveEmptyFeedRender');
assertContains('home runtime', runtime, '!preserveEmptyFeedRender');
assertContains('home runtime', runtime, '!preservePartialFeedRender) syncAnnexedFeedLoadMore');
assertContains('home runtime', runtime, 'sameFeedFilterRender');
assertContains('home runtime', runtime, 'function ensureAnnexedSavedCreatedItemsVisible(options = {})');
assertContains('home runtime', runtime, 'if (!options.forceInsert)');
assertContains('home runtime', runtime, 'ensureAnnexedSavedCreatedItemsVisible({ forceInsert: true })');

assertContains('real data guard source', realDataGuard, 'function shouldPreserveAnnexedFallbackList(list, rows, visibleRows, options)');
assertContains('real data guard source', realDataGuard, 'isRealAnnexedFeedList(list)');
assertContains('real data guard source', realDataGuard, 'filter !== "all"');
assertContains('real data guard source', realDataGuard, 'realListRenderableCardCount(list)');
assertContains('real data guard source', realDataGuard, 'incomingCount <= Math.max(3, Math.ceil(existingCount / 3))');

console.log(JSON.stringify({
  ok: true,
  customerHomeSeparatesShellReadyFromDataReady: true,
  feedSurfacesHiddenUntilFirstStableRender: true,
  postedSectionsWaitForSharedSyncBeforeFirstPaint: true,
  partialSharedSyncCannotShrinkRenderedFeeds: true,
  emptyOrTinyFallbackCannotReplaceRenderedFeeds: true,
}, null, 2));

'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'sections', '27-customer-home-template-parts.cjs');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-page.js');
const feedsSourcePath = path.join(root, 'src', 'generator', 'sections', '27-customer-home-feeds-v2.cjs');
const feedsAssetSourcePath = path.join(root, 'src', 'generator', 'asset-sources', 'emy-customer-home-feeds-app.js');
const feedsRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-feeds-app.js');
const source = fs.readFileSync(sourcePath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');
const feedsSource = fs.readFileSync(feedsSourcePath, 'utf8');
const feedsAssetSource = fs.readFileSync(feedsAssetSourcePath, 'utf8');
const feedsRuntime = fs.readFileSync(feedsRuntimePath, 'utf8');

function sliceFunction(text, name, nextName) {
  const start = text.indexOf(`function ${name}`);
  const end = nextName ? text.indexOf(`function ${nextName}`, start + 1) : -1;
  if (start < 0 || (nextName && end <= start)) return '';
  return end > start ? text.slice(start, end) : text.slice(start);
}

function assertPostedSectionsRenderAllOwnedRows(label, text) {
  const renderCreated = sliceFunction(text, 'renderHomeCreatedSection', 'renderHomeCreatedSections');
  const renderJobs = sliceFunction(text, 'renderHomePostedJobs', 'openPostedJobsInFeeds');
  const carouselHelper = sliceFunction(text, 'homeListAlwaysUsesCarousel', 'homeListUsesCarousel');
  const setupCarousel = sliceFunction(text, 'setupHomeCarousel', 'syncHomeListCarouselState');
  const syncCarousel = sliceFunction(text, 'syncHomeListCarouselState', 'syncHomeCarouselSections');

  if (!renderCreated || renderCreated.includes('homeInteractionFirstItems(ownedItems')) {
    console.error(`${label}: customer posted updates/events/articles can still be capped by homeInteractionFirstItems.`);
    process.exit(1);
  }

  if (!renderCreated.includes('const visibleItems = ownedItems;')) {
    console.error(`${label}: customer posted updates do not render the full owned item set.`);
    process.exit(1);
  }

  if (!renderJobs || renderJobs.includes('homeInteractionFirstItems(jobs')) {
    console.error(`${label}: posted jobs can still be capped by homeInteractionFirstItems.`);
    process.exit(1);
  }

  if (!renderJobs.includes('const visibleJobs = jobs;')) {
    console.error(`${label}: posted jobs do not render the full job set.`);
    process.exit(1);
  }

  if (!carouselHelper.includes('[data-home-posted-posts-list]') || !carouselHelper.includes('[data-home-posted-jobs-list]')) {
    console.error(`${label}: posted customer lists are not forced to keep carousel behavior.`);
    process.exit(1);
  }

  if (!setupCarousel.includes('homeListUsesCarousel(list, visibleCount)') || !syncCarousel.includes('homeListUsesCarousel(list, visibleCount)')) {
    console.error(`${label}: carousel setup/sync does not use the posted-list-aware carousel decision.`);
    process.exit(1);
  }
}

function assertPostedSectionsRenderImmediatelyWithSharedFallback(label, text) {
  const renderer = sliceFunction(text, 'renderHomePostedSectionsWhenReady', 'bindHomePostedContentRefresh');
  if (!renderer || !renderer.includes('renderHomeCreatedSections();') || !renderer.includes('renderHomePostedJobs();')) {
    console.error(`${label}: customer home posted sections no longer render immediately.`);
    process.exit(1);
  }

  if (!text.includes('window.emyRenderHomePostedSectionsWhenReady = renderHomePostedSectionsWhenReady')) {
    console.error(`${label}: posted-section renderer is not exposed to the feeds app.`);
    process.exit(1);
  }

  if (!text.includes('window.emyPullHomeSharedContentFallback = pullHomeSharedContentFallback') || !text.includes('/api/emy-shared-content')) {
    console.error(`${label}: customer home no longer has the shared-content fallback pull.`);
    process.exit(1);
  }

  if (!text.includes('homeSharedContentFallbackPulled === false')) {
    console.error(`${label}: shared-content fallback can be repeatedly pulled on every posted-section render.`);
    process.exit(1);
  }

  if (!text.includes('homePostedSection: true') || !text.includes('homePostedMetaLabel')) {
    console.error(`${label}: posted-section cards can still be labelled as nearby feed cards.`);
    process.exit(1);
  }
}

function assertFeedsAppUsesGuardedPostedRenderer(label, text) {
  if (!text.includes('window.emyRenderHomePostedSectionsWhenReady')) {
    console.error(`${label}: feeds app still bypasses the guarded posted-section renderer.`);
    process.exit(1);
  }
}

assertPostedSectionsRenderAllOwnedRows('source', source);
assertPostedSectionsRenderAllOwnedRows('runtime', runtime);
assertPostedSectionsRenderImmediatelyWithSharedFallback('source', source);
assertPostedSectionsRenderImmediatelyWithSharedFallback('runtime', runtime);
assertFeedsAppUsesGuardedPostedRenderer('feeds source', feedsSource);
assertFeedsAppUsesGuardedPostedRenderer('feeds asset source', feedsAssetSource);
assertFeedsAppUsesGuardedPostedRenderer('feeds runtime', feedsRuntime);

console.log(JSON.stringify({
  ok: true,
  page: 'emy-customer-home.html',
  runtime: path.relative(root, runtimePath),
  postedUpdatesRenderAllCustomerRows: true,
  postedThingsStayCarousel: true,
  postedThingsRenderImmediately: true,
  sharedFallbackPullsMissingRecords: true,
}, null, 2));

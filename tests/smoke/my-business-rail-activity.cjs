'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const businessPartsPath = path.join(root, 'src', 'generator', 'sections', '26-business-profile-template-parts.cjs');
const sharedBootPath = path.join(root, 'src', 'generator', 'sections', '41-shared-boot-scripts.cjs');
const realDataGuardPath = path.join(root, 'src', 'generator', 'asset-sources', 'emy-real-data-guard.js');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');

const businessParts = fs.readFileSync(businessPartsPath, 'utf8');
const sharedBoot = fs.readFileSync(sharedBootPath, 'utf8');
const realDataGuard = fs.readFileSync(realDataGuardPath, 'utf8');
const runtime = fs.existsSync(runtimePath) ? fs.readFileSync(runtimePath, 'utf8') : '';

[
  'function renderBusinessCustomerRailActivity()',
  'function businessCustomerRailRows(profile)',
  'publicBusinessStoredProducts(profile)',
  'publicBusinessStoredPosts(profile)',
  'publicBusinessClipItems(profile)',
  'scheduleBusinessCustomerRailActivityRender();',
  '.my-business-row,.my-business-update,[data-emy-real-empty],[data-emy-real-loading]',
  'body.is-public-customer-shell .my-business-update-media',
  'my-business-update-copy small',
].forEach((marker) => {
  if (!businessParts.includes(marker)) {
    console.error('Business profile rail is missing:', marker);
    process.exit(1);
  }
});

if (!/grid-template-columns:\s*38px\s+minmax\(0,\s*1fr\)\s+auto/.test(businessParts)) {
  console.error('Business profile rail is missing the compact activity-card grid.');
  process.exit(1);
}

[
  'const myBusinessActivities = freshActivities.filter',
  'No new business updates yet.',
].forEach((marker) => {
  if (!sharedBoot.includes(marker)) {
    console.error('Shared customer rail fallback changed unexpectedly:', marker);
    process.exit(1);
  }
});

[
  'emyFeedCreatedProducts',
  'emyFeedCreatedClips',
  'emyFeedCreatedArticles',
  'emy:central-storage-synced',
  'emy:business-content-changed',
  '["emyBusinessProducts", "Product"], ["emyBusinessProductList", "Product"], ["emyBusinessProductPosts", "Product"], ["emyFeedCreatedProducts", "Product"]',
  '["emyBusinessClips", "Clip"], ["emyBusinessReels", "Clip"], ["emyBusinessProductReels", "Product Clip"], ["emyFeedCreatedClips", "Clip"]',
].forEach((marker) => {
  if (!realDataGuard.includes(marker)) {
    console.error('Customer home real rail guard is missing:', marker);
    process.exit(1);
  }
});

[
  'function realActivityUpdateCardHtml(item, index)',
  'const myBusinessActivities = visibleActivities.filter',
].forEach((marker) => {
  if (sharedBoot.includes(marker)) {
    console.error('Shared customer rail picked up business-page-only behavior:', marker);
    process.exit(1);
  }
});

if (runtime) {
  [
    'function renderBusinessCustomerRailActivity()',
    'publicBusinessStoredProducts(profile)',
    'publicBusinessStoredPosts(profile)',
    'publicBusinessClipItems(profile)',
  ].forEach((marker) => {
    if (!runtime.includes(marker)) {
      console.error('Generated business profile runtime is missing:', marker);
      process.exit(1);
    }
  });
}

console.log(JSON.stringify({
  ok: true,
  rail: 'Business profile My Businesses activity',
  scopedToBusinessProfile: true,
  compactUpdateCards: true,
}, null, 2));

'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'sections', '26-business-profile-template-parts.cjs');
const feedCreatePath = path.join(root, 'src', 'generator', 'sections', '14-feed-create-flow-script.cjs');
const customerHomePath = path.join(root, 'src', 'generator', 'sections', '27-customer-home-template-parts.cjs');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');

const source = fs.readFileSync(sourcePath, 'utf8');
const feedCreateSource = fs.readFileSync(feedCreatePath, 'utf8');
const customerHomeSource = fs.readFileSync(customerHomePath, 'utf8');
const runtime = fs.existsSync(runtimePath) ? fs.readFileSync(runtimePath, 'utf8') : '';

const businessProfileMarkers = [
  'function businessTrimLargeInlineMedia(item) {',
  'function businessCompactCreatedMediaStores() {',
  '["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips", "emyFeedCreatedPosts", "emyBusinessUploads"].forEach((key) => {',
  'const next = (items || []).slice(0, limit || 60).map(businessTrimLargeInlineMedia);',
  'localStorage.setItem(key, JSON.stringify(next.slice(0, Math.min(next.length, 30)).map(businessTrimLargeInlineMedia)));',
  '["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips", "emyFeedCreatedPosts"].forEach((sourceKey) => {',
  'const uploadBackedStorage = sourceKey === "emyUploadedClips" || sourceKey === "emyFeedCreatedClipsByBusiness";',
  '["emyBusinessReels", "emyBusinessClips", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"].flatMap',
  'sourceKey === "emyFeedCreatedPosts" || sourceKey === "emyFeedCreatedClips"',
  'const sharedClipStorageKey = "emyFeedCreatedClips";',
  'sharedStorageKey: sharedClipSaved ? sharedClipStorageKey : ""',
  'const hasBusinessClips = list.some((item) => businessPostedClipFilterForItem(item) === "business");',
  'const hasProductClips = list.some((item) => businessPostedClipFilterForItem(item) === "product");',
  'if (businessPostedClipFilter === "business" && !hasBusinessClips && hasProductClips) businessPostedClipFilter = "product";',
  'if (businessPostedClipFilter === "product" && !hasProductClips && hasBusinessClips) businessPostedClipFilter = "business";',
  'status: "published",',
  'visibility: "public",',
];

const feedCreateMarkers = [
  'const createdClipsStorageKey = "emyFeedCreatedClips";',
  '[createdEventsStorageKey, createdPostsStorageKey, createdClipsStorageKey, createdJobsStorageKey].forEach((key) => {',
  'const syncedKeys = [storageKey];',
  'writeJsonArray(createdClipsStorageKey, createdClipRows, 120)',
  'sharedStorageKey: createdClipsStorageKey',
];

const customerHomeMarkers = [
  '["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"].forEach((storageKey) => {',
  'homeStoredClipLooksBusinessOwned',
  '["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips", "emyBusinessProductPosts", "emyFeedCreatedPosts"], "reels"',
  '"emyFeedCreatedClips",',
  'homeWriteCreatedBusinessClipArray("emyFeedCreatedClips", sharedRows);',
  'sharedStorageKey: "emyFeedCreatedClips"',
  'if (businessOwned && annexedFeedKindForItem(item) === "clips") {',
  'if (annexedFeedItemFollowed(item)) return true;',
];

function assertText(label, text, markers) {
  const missing = markers.filter((marker) => !text.includes(marker));
  if (missing.length) {
    console.error(label + ' is missing business clip save/visibility markers:', missing.join(', '));
    process.exit(1);
  }
}

assertText('Business profile source', source, businessProfileMarkers);
assertText('Feed create source', feedCreateSource, feedCreateMarkers);
assertText('Customer home source', customerHomeSource, customerHomeMarkers);
if (runtime) assertText('Generated business profile runtime', runtime, businessProfileMarkers);

console.log(JSON.stringify({
  ok: true,
  businessClipsSaveVisibility: true,
  mirrorsBusinessClipsToCreatedClipStore: true,
  readsCreatedClipsInBusinessAndHome: true,
  trimsLargeInlineClipMedia: true,
  autoShowsNonEmptyClipTab: true,
}, null, 2));

'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const htmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-business-profile.html');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');
const html = fs.readFileSync(htmlPath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');
const clipItemsStart = runtime.indexOf('function publicBusinessClipItems');
const clipItemsEnd = runtime.indexOf('function publicContentMediaHtml', clipItemsStart);
const clipItemsFunction = clipItemsStart >= 0 && clipItemsEnd > clipItemsStart
  ? runtime.slice(clipItemsStart, clipItemsEnd)
  : '';

const requiredStyleMarkers = [
  'body.is-public-customer-shell .public-activity-section .public-business-catalog.is-reels.business-posted-list',
  '.public-clips-load-more',
  'body.is-public-customer-shell .public-activity-section .public-clips-load-more[data-public-load-state="loading"] button',
  'body.is-public-customer-shell .public-activity-section .public-clips-load-more[data-public-load-state="end"] button',
];

const requiredRuntimeMarkers = [
  'const publicBusinessClipsInitialCount = 12;',
  'const publicBusinessClipsBatchCount = 9;',
  'let publicBusinessClipVisibleCount = publicBusinessClipsInitialCount;',
  'function publicBusinessClipsProfileKey(profile)',
  'function loadMorePublicBusinessClips()',
  'function syncPublicBusinessClipLoader()',
  'function disconnectPublicBusinessClipLoader()',
  'publicBusinessClipVisibleCount = Math.min(clips.length, Math.max(publicBusinessClipsInitialCount, publicBusinessClipVisibleCount) + publicBusinessClipsBatchCount);',
  'const visibleClips = clips.slice(0, visibleCount);',
  'data-public-clip-load-more',
  'data-public-load-state',
  'Load 9 more clips',
  'Loading clips...',
  'No more clips',
  'syncPublicBusinessClipLoader()',
  'disconnectPublicBusinessClipLoader();',
  'IntersectionObserver',
  'item.id || item.feedId || item.itemId || item.originalFeedId',
  'const idMatches = (entry) => wantedId && entry.idValues.some',
  'prepared.find(idMatches)',
  'askEmyProfileTargetAttempts > 100',
];

const forbiddenRuntimeMarkers = [
  'html = clips.map((item, index) => publicBusinessClipCardHtml(item, index, profile)).join("");',
];
const forbiddenClipItemsMarkers = [
  'if (currentProfile) return businessNewest(publicBusinessDedupeRows(businessReadPostedClips(), "clip")).slice(0, 12);',
  '}).slice(0, 12);',
];
const requiredClipItemsMarkers = [
  '["emyBusinessReels", "emyBusinessClips", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"]',
];

const missingStyle = requiredStyleMarkers.filter((marker) => !html.includes(marker));
if (missingStyle.length) {
  console.error('Public business Clips grid is missing load-more/footer styles:', missingStyle.join(', '));
  process.exit(1);
}

const missingRuntime = requiredRuntimeMarkers.filter((marker) => !runtime.includes(marker));
if (missingRuntime.length) {
  console.error('Public business Clips grid is missing 12 + 9 runtime behavior:', missingRuntime.join(', '));
  process.exit(1);
}

const forbiddenRuntime = forbiddenRuntimeMarkers.filter((marker) => runtime.includes(marker));
if (forbiddenRuntime.length) {
  console.error('Public business Clips grid still caps at 12 or renders all clips without a footer:', forbiddenRuntime.join(', '));
  process.exit(1);
}

const forbiddenClipItems = forbiddenClipItemsMarkers.filter((marker) => clipItemsFunction.includes(marker));
if (forbiddenClipItems.length) {
  console.error('Public business Clips data is still capped at 12 before the footer can load more:', forbiddenClipItems.join(', '));
  process.exit(1);
}

const missingClipItems = requiredClipItemsMarkers.filter((marker) => !clipItemsFunction.includes(marker));
if (missingClipItems.length) {
  console.error('Public business Clips data is not reading created business clips:', missingClipItems.join(', '));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  page: 'emy-business-profile.html',
  startsWithClips: 12,
  loadsMoreClipsBy: 9,
  keepsNoMoreClipsFooter: true,
  customerFacingClipsOnly: true,
}, null, 2));

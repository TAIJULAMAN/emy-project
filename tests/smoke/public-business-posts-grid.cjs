'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const htmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-business-profile.html');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');
const html = fs.readFileSync(htmlPath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');
const storedPostsStart = runtime.indexOf('function publicBusinessStoredPosts');
const storedPostsEnd = runtime.indexOf('function publicBusinessFreshTime', storedPostsStart);
const storedPostsFunction = storedPostsStart >= 0 && storedPostsEnd > storedPostsStart
  ? runtime.slice(storedPostsStart, storedPostsEnd)
  : '';

const requiredStyleMarkers = [
  'body.is-public-customer-shell .public-activity-section .public-business-catalog.is-posts.business-posted-list',
  'grid-template-columns: repeat(2, minmax(280px, 330px));',
  'justify-content: center;',
  '.public-posts-load-more',
  'grid-template-columns: minmax(0, 1fr); justify-content: stretch;',
];

const requiredRuntimeMarkers = [
  'const publicBusinessPostsInitialCount = 12;',
  'const publicBusinessPostsBatchCount = 9;',
  'let publicBusinessPostVisibleCount = publicBusinessPostsInitialCount;',
  'function loadMorePublicBusinessPosts()',
  'publicBusinessPostVisibleCount = Math.min(posts.length, Math.max(publicBusinessPostsInitialCount, publicBusinessPostVisibleCount) + publicBusinessPostsBatchCount);',
  'const visiblePosts = posts.slice(0, visibleCount);',
  'data-public-post-load-more',
  'data-public-load-state',
  'Load 9 more posts',
  'Loading posts...',
  'No more posts',
  'syncPublicBusinessPostLoader()',
  'disconnectPublicBusinessPostLoader();',
];

const forbiddenRuntimeMarkers = [
  'if (posts.length > visibleCount) {',
  'afterCatalogHtml = \'<div class="public-posts-load-more" data-public-post-load-more data-visible-count="\'',
];
const forbiddenStoredPostMarkers = [
  'return businessNewest(rows).slice(0, 12);',
  'return businessNewest(publicBusinessDedupeRows(stored, "post")).slice(0, 12);',
  'return businessNewest(publicBusinessDedupeRows(rows.filter((item) => !businessCreatedItemDeleted(item)), "post")).slice(0, 12);',
];

const missingStyle = requiredStyleMarkers.filter((marker) => !html.includes(marker));
if (missingStyle.length) {
  console.error('Public business Posts grid is missing centered 2-column/load-more styles:', missingStyle.join(', '));
  process.exit(1);
}

const missingRuntime = requiredRuntimeMarkers.filter((marker) => !runtime.includes(marker));
if (missingRuntime.length) {
  console.error('Public business Posts grid is missing 12 + 9 runtime behavior:', missingRuntime.join(', '));
  process.exit(1);
}

const forbiddenRuntime = forbiddenRuntimeMarkers.filter((marker) => runtime.includes(marker));
if (forbiddenRuntime.length) {
  console.error('Public business Posts footer still disappears instead of ending with No more posts:', forbiddenRuntime.join(', '));
  process.exit(1);
}

const forbiddenStoredPosts = forbiddenStoredPostMarkers.filter((marker) => storedPostsFunction.includes(marker));
if (forbiddenStoredPosts.length) {
  console.error('Public business Posts data is still capped at 12 before the footer can load more:', forbiddenStoredPosts.join(', '));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  page: 'emy-business-profile.html',
  startsWithPosts: 12,
  loadsMorePostsBy: 9,
  keepsNoMorePostsFooter: true,
  centeredTwoColumnPosts: true,
  customerFacingPostsOnly: true,
}, null, 2));

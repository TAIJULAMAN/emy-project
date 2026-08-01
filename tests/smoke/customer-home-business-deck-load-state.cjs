'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const htmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-home.html');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-page.js');
const html = fs.readFileSync(htmlPath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');

const requiredHtmlMarkers = [
  '<div class="business-deck" data-business-deck data-business-deck-ready="false"',
  'data-business-prev aria-label="Next business" aria-disabled="true" disabled hidden',
  'data-business-next aria-label="Previous business" aria-disabled="true" disabled hidden',
  '.business-deck:not([data-business-deck-ready="true"]) .business-arrow',
  '.business-deck-empty',
  '.business-avatar:not(.has-image)',
  '.business-avatar.emy-avatar-shape-business:not(.has-image)',
  '.my-business-avatar.pizza,',
  '.item-business-avatar.pizza,',
  '.item-business-avatar span',
  'width: 100%;',
  'background: transparent;',
  'background: linear-gradient(145deg, #f8fafc, #eef2f7) !important;',
];

const requiredRuntimeMarkers = [
  'businessDeck.dataset.businessDeckReady = "true";',
  'businessDeck.dataset.businessDeckReady = !isEmpty ? "true" : "false";',
  '<p class="business-deck-empty emy-real-empty" data-emy-real-empty><strong>No businesses in your region yet.</strong> Businesses near your selected location will appear here.</p>',
  '<div class="nearby-business-empty"><strong>No businesses in your region yet.</strong><span>Businesses near your selected location will appear here.</span></div>',
];

const missingHtml = requiredHtmlMarkers.filter((marker) => !html.includes(marker));
if (missingHtml.length) {
  console.error('Customer home business deck can flash arrows before hydration:', missingHtml.join(', '));
  process.exit(1);
}

const businessAvatarBlockStart = html.indexOf('.business-avatar {');
const businessAvatarBlockEnd = html.indexOf('.business-avatar:hover', businessAvatarBlockStart);
const businessAvatarBlock = businessAvatarBlockStart >= 0 && businessAvatarBlockEnd > businessAvatarBlockStart
  ? html.slice(businessAvatarBlockStart, businessAvatarBlockEnd)
  : '';

if (!businessAvatarBlock || businessAvatarBlock.includes('background: #fffaf5;')) {
  console.error('Customer home business avatars still use the old cream/brown fallback instead of the neutral grey fallback.');
  process.exit(1);
}

const forbiddenDecorativeBusinessAvatarMarkers = [
  '.my-business-avatar.pizza { background: radial-gradient',
  '.my-business-avatar.person { background: radial-gradient',
  '.my-business-avatar.supply { background: linear-gradient(145deg, #f0e0bc',
  '.item-business-avatar.pizza { background: radial-gradient',
  '.item-business-avatar.feed,\n      .item-business-avatar.reel { background: linear-gradient(135deg, #d6dde8, #f7ede2), radial-gradient',
];

const foundDecorativeBusinessAvatarMarkers = forbiddenDecorativeBusinessAvatarMarkers.filter((marker) => html.includes(marker));
if (foundDecorativeBusinessAvatarMarkers.length) {
  console.error('Customer home still has decorative brown/cream business avatar fallbacks:', foundDecorativeBusinessAvatarMarkers.join(', '));
  process.exit(1);
}

const missingRuntime = requiredRuntimeMarkers.filter((marker) => !runtime.includes(marker));
if (missingRuntime.length) {
  console.error('Customer home business deck does not mark readiness in runtime:', missingRuntime.join(', '));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  page: 'emy-customer-home.html',
  runtime: path.relative(root, runtimePath),
  hidesDeckArrowsBeforeReady: true,
  revealsDeckArrowsAfterReady: true,
  hasRegionEmptyState: true,
}, null, 2));

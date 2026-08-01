'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'sections', '31-customer-profile-template-parts.cjs');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-profile-page.js');

const source = fs.readFileSync(sourcePath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');

const markers = [
  'function publicActivityRepostCardHtml(item, index)',
  'const originalLooksBusinessProfile = !!(',
  '/^business-profile-/i.test(String(originalId || ""))',
  'business\\s+profile\\s+preview|profile\\s+preview\\s+for\\s+customers',
  'const originalKind = originalLooksBusinessProfile ? "Business"',
  'const quoteMedia = originalLooksBusinessProfile ? "" : publicActivityMediaInnerHtml',
  'data-business-profile-card data-business-link="',
  `role="' + (originalLooksBusinessProfile ? 'link' : 'button') + '"`,
  `data-detail-media="' + escapeHtml(originalLooksBusinessProfile ? "" : mediaClass) + '"`,
];

const forbiddenMarkers = [
  'const quoteMedia = publicActivityMediaInnerHtml(item, item.originalTitle || item.title);',
];

function assertMarkers(label, text) {
  const missing = markers.filter((marker) => !text.includes(marker));
  if (missing.length) {
    console.error(label + ' is missing business-profile repost feed-card parity markers:', missing.join(', '));
    process.exit(1);
  }
  const forbidden = forbiddenMarkers.filter((marker) => text.includes(marker));
  if (forbidden.length) {
    console.error(label + ' still renders shared business profiles as normal media reposts:', forbidden.join(', '));
    process.exit(1);
  }
}

assertMarkers('Customer profile source', source);
assertMarkers('Generated customer profile runtime', runtime);

console.log(JSON.stringify({
  ok: true,
  page: 'emy-customer-profile.html?customer=...&from=business',
  sharedBusinessProfilePosts: 'use feeds-style business profile quote cards without stale media thumbnails',
}, null, 2));

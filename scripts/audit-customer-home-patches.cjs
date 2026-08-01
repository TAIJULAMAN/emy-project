'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const homePath = path.join(root, 'linked-pages/restore-may20/emy-customer-home.html');

const activePatchMarkers = [
  { patch: 'stripCustomerHomeDemoTemplates', marker: 'function feedEditOpenClip(card, source, options)', note: '02e regex + clip-edit injection' },
  { patch: 'patchLockedCustomerHomeNotifications', marker: 'function notificationMediaFromStorage(item)', note: '02c' },
  { patch: 'patchNotificationThumbBoxes', marker: 'data-emy-notification-thumb-box-removal', note: '46-manifest-post-process' },
  { patch: 'patchLockedCustomerHomeAccountMediaSeparation', marker: 'function currentCustomerIdentitySlugs()', note: '02d' },
  { patch: 'finaliseCustomerHomeGeneratedHtml', marker: 'data-emy-legacy-engagement-toolbar-removal', note: '02g' },
];

const mergedIntoTemplate = [
  'homeAnnexedPostListItems',
  'homeCarouselActiveSlideHasVideo',
  'applyPostComposerLayoutIsolation',
  'dedupeUniqueClipsById',
  'carouselActiveVideo',
  'savedBusinessProfileRow',
];

function main() {
  if (!fs.existsSync(homePath)) {
    console.error('Missing emy-customer-home.html. Run npm run generate first.');
    process.exit(1);
  }
  const html = fs.readFileSync(homePath, 'utf8');
  console.log(JSON.stringify({
    bytes: Buffer.byteLength(html),
    activePatches: activePatchMarkers.map((entry) => ({
      ...entry,
      present: html.includes(entry.marker),
    })),
    mergedIntoTemplate: mergedIntoTemplate.map((marker) => ({
      marker,
      present: html.includes(marker),
    })),
  }, null, 2));
}

main();

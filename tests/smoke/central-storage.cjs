'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'asset-sources', 'emy-central-storage.js');
const generatedPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-central-storage.js');
const source = fs.readFileSync(sourcePath, 'utf8');
const generated = fs.readFileSync(generatedPath, 'utf8');

[
  'window.emyCentralStorage',
  'emyCloudStorage',
  'records: cloudReady() ? "firebase"',
  'media: "cloudinary"',
  '/api/emy-shared-content',
  'emy:central-storage-synced',
  'uploadToCloudinary',
  'emyCustomerRelationshipRequests',
  'emyBusinessProducts',
  'emyBusinessClips',
  'emyFeedCreatedPosts',
  'emyFeedCreatedProducts',
  'emyFeedCreatedClips',
  'emyFeedCreatedArticles',
  'emy:business-content-changed',
  'emy:created-jobs-changed',
  'emy:created-events-changed'
].forEach((marker) => {
  if (!source.includes(marker)) {
    console.error(`Central storage adapter is missing ${marker}.`);
    process.exit(1);
  }
});

[
  'lastPulledChangedKeys',
  'lastSyncStartedAt',
  'lastPassiveScheduleAt',
  'scheduleTimer',
  'await pull(list, { silent: true }).catch(() => false);',
  'mergeStorageValue(existing, incoming, key)',
  'writeValue(key, data[key], { merge: true })',
  'contentId(value, key, index)',
  'mergeDeletedIdMaps(existing, incoming)',
  'if (changed.length) notify(changed, "sync");',
  'Date.now() - state.lastSyncStartedAt < 5000',
  'now - state.lastPassiveScheduleAt < 5000'
].forEach((marker) => {
  if (!source.includes(marker)) {
    console.error(`Central storage adapter is missing stable-sync guard ${marker}.`);
    process.exit(1);
  }
});

if (source.includes('notify(list, "sync");')) {
  console.error('Central storage adapter must not broadcast a full-list sync when nothing changed.');
  process.exit(1);
}

if (source.includes('Object.keys(data).filter(isSharedKey).forEach((key) => {\n      if (writeValue(key, data[key]))')) {
  console.error('Central storage adapter must not overwrite local content during passive pulls.');
  process.exit(1);
}

if (source.includes('new CustomEvent("emy:shared-port-content-ready"')) {
  console.error('Central storage adapter must not broadcast shared-port-content-ready; only the shared bridge owns initial readiness.');
  process.exit(1);
}

if (source !== generated) {
  console.error('Generated central storage script is not copied from the source adapter.');
  process.exit(1);
}

[
  'emy-business-profile.html',
  'emy-customer-home.html',
  'emy-customer-profile.html',
  'emy-customer-search.html',
  'emy-customer-chat.html'
].forEach((pageName) => {
  const htmlPath = path.join(root, 'linked-pages', 'restore-may20', pageName);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const central = html.match(/emy-central-storage\.js\?v=[a-f0-9]{12}" data-emy-central-storage/);
  const bridge = html.match(/emy-shared-port-content\.js\?v=[a-f0-9]{12}" data-emy-shared-port-content/);
  if (!central) {
    console.error(`${pageName} does not load the central storage adapter with cache busting.`);
    process.exit(1);
  }
  if (!bridge) {
    console.error(`${pageName} does not load the shared bridge with cache busting.`);
    process.exit(1);
  }
  if (html.indexOf('emy-central-storage.js') > html.indexOf('emy-shared-port-content.js')) {
    console.error(`${pageName} loads the shared bridge before central storage.`);
    process.exit(1);
  }
});

console.log(JSON.stringify({
  ok: true,
  source: path.relative(root, sourcePath),
  generated: path.relative(root, generatedPath),
  records: 'firebase',
  media: 'cloudinary',
  fallback: 'local-shared'
}, null, 2));

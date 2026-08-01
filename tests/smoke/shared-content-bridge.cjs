'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const bridgePath = path.join(root, 'linked-pages', 'restore-may20', 'emy-shared-port-content.js');
const serverPath = path.join(root, 'serve-linked-pages.cjs');
const businessHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-business-profile.html');
const bridge = fs.readFileSync(bridgePath, 'utf8');
const server = fs.readFileSync(serverPath, 'utf8');
const businessHtml = fs.readFileSync(businessHtmlPath, 'utf8');
const previewServer = fs.readFileSync(path.join(root, 'preview-server.cjs'), 'utf8');

const requiredSharedKeys = [
  'emyBusinessProfileDraft',
  'emyBusinessUploads',
  'emyFeedCommentThreads',
  'emyBusinessChatThread:',
  'emyBusinessDeletedProductIds',
  'emyCustomerSavedFeedItems',
  'emyFeedCreatedProducts',
  'emyFeedCreatedClips',
  'emyFeedCreatedArticles',
];

requiredSharedKeys.forEach((key) => {
  if (!bridge.includes(key) && !bridge.includes('discoverKeys')) {
    console.error(`Shared bridge does not cover ${key}.`);
    process.exit(1);
  }
});

if (!bridge.includes('function discoverKeys()') || !bridge.includes('isSharedContentKey(key)')) {
  console.error('Shared bridge no longer discovers EMY content keys dynamically.');
  process.exit(1);
}

if (!bridge.includes('async function pushSharedContent(reason)') || !bridge.includes('postBody.data[key] = value')) {
  console.error('Shared bridge no longer pushes changed keys one at a time.');
  process.exit(1);
}

if (!bridge.includes('window.__emySharedPortContentInitialSyncDone') || !bridge.includes('markInitialSharedSyncReady')) {
  console.error('Shared bridge no longer exposes initial shared-sync readiness to page renderers.');
  process.exit(1);
}

[
  'window.addEventListener("pageshow"',
  'window.addEventListener("focus"',
  'document.addEventListener("visibilitychange"',
  'scheduleSync("visible", 0)',
  'FeedCreatedArticles',
  'emy:created-posts-changed',
].forEach((marker) => {
  if (!bridge.includes(marker)) {
    console.error(`Shared bridge no longer resyncs when another browser tab becomes active: ${marker}`);
    process.exit(1);
  }
});

if (server.includes('sharedContentKeys.forEach((key) =>')) {
  console.error('Shared server still only accepts the old fixed content key list.');
  process.exit(1);
}

if (!server.includes('Object.keys(incoming || {}).filter(isSharedContentKey).forEach((key) =>')) {
  console.error('Shared server does not accept dynamic EMY content keys.');
  process.exit(1);
}

[server, previewServer].forEach((serverSource, index) => {
  const name = index === 0 ? 'Linked-pages server' : 'Preview server';
  [
    'function isSharedContentListKey(key)',
    'function fallbackSharedContentValue(data, key)',
    'const destructiveReplace = /(?:delete|clear|reset)/.test(reason);',
    '!destructiveReplace && isSharedContentListKey(key)',
    'fallbackSharedContentValue(next, key)'
  ].forEach((marker) => {
    if (!serverSource.includes(marker)) {
      console.error(`${name} can still wipe content lists with an empty replace-flush: missing ${marker}.`);
      process.exit(1);
    }
  });
});

if (!/emy-shared-port-content\.js\?v=[a-f0-9]{12}/.test(businessHtml)) {
  console.error('Business page does not cache-bust the shared content bridge.');
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  bridge: path.relative(root, bridgePath),
  acceptsDynamicEmyKeys: true,
  perKeyPush: true,
  bridgeCacheBusted: true,
  exposesInitialSyncReady: true,
  protectsEmptyReplaceFlush: true,
}, null, 2));

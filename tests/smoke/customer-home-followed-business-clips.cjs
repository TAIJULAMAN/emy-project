'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const homeTemplatePath = path.join(root, 'src', 'generator', 'sections', '27-customer-home-template-parts.cjs');
const homeHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-home.html');
const homeRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-page.js');

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function assertContains(label, text, marker) {
  if (!text.includes(marker)) {
    console.error(`${label}: missing ${marker}`);
    process.exit(1);
  }
}

const template = read(homeTemplatePath);

[
  'function homeAnnexedClipListItems()',
  'mergeFeedItemsByStableId(homeStaticItemsFor("clip"), readBusinessClipsForHomeFeed())',
  'function homeBusinessClipStorageRows(storageKey)',
  'const inheritGroupIdentity = (value, entryKey, group) => {',
  'rows.push(Object.assign({}, group || {}, value));',
  'Object.entries(value).forEach(([entryKey, entry]) => collect(entry, depth + 1, inheritGroupIdentity(value, entryKey, inherited)));',
  'const parsed = homeBusinessClipStorageRows(storageKey);',
  'businessKey,',
  'profileKey: item.profileKey || businessKey,',
  'owner: "business",',
  'actorType: "business",',
  'createdAs: "business",',
  'authorRole: "business",',
  '"emy:customer-upload-updated"',
  '"emyFeedCreatedClipsByBusiness", "emyUploadedClips"',
  'No clips yet. Clips created by businesses you follow and nearby will appear here.',
].forEach((marker) => assertContains('customer home template', template, marker));

const homeHtml = read(homeHtmlPath);
if (homeHtml) {
  assertContains('linked customer home HTML', homeHtml, 'data-home-static-clip-list');
  assertContains('linked customer home HTML', homeHtml, 'emy-customer-home-page.js');
}

const homeRuntime = read(homeRuntimePath);
if (homeRuntime) {
  assertContains('linked customer home runtime', homeRuntime, 'function homeBusinessClipStorageRows(storageKey)');
  assertContains('linked customer home runtime', homeRuntime, 'mergeFeedItemsByStableId(homeStaticItemsFor("clip"), readBusinessClipsForHomeFeed())');
  assertContains('linked customer home runtime', homeRuntime, 'owner: "business",');
  assertContains('linked customer home runtime', homeRuntime, '"emyFeedCreatedClipsByBusiness", "emyUploadedClips"');
}

console.log(JSON.stringify({
  ok: true,
  customerHomeFollowedBusinessClips: true,
  groupedBackendClipStores: true,
  clipCardsMarkedBusinessOwned: true,
}, null, 2));

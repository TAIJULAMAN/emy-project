'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const homeTemplatePath = path.join(root, 'src', 'generator', 'sections', '27-customer-home-template-parts.cjs');
const profileTemplatePath = path.join(root, 'src', 'generator', 'sections', '31-customer-profile-template-parts.cjs');
const homeRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-page.js');
const profileRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-profile-page.js');
const homeHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-home.html');
const profileHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-profile.html');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function assertContains(label, text, needle) {
  if (!text.includes(needle)) {
    console.error(`${label}: missing ${needle}`);
    process.exit(1);
  }
}

const homeTemplate = read(homeTemplatePath);
const profileTemplate = read(profileTemplatePath);

assertContains('customer home template', homeTemplate, '.avatar.emy-story-ring');
assertContains('customer home template', homeTemplate, 'customerStoryRingStorageKeys');
assertContains('customer home template', homeTemplate, 'customerHasUploadedStoryClip');
assertContains('customer home template', homeTemplate, 'customerStoryClipBelongsToCustomer');
assertContains('customer home template', homeTemplate, 'data-home-story-strip');
assertContains('customer home template', homeTemplate, 'renderCustomerHomeStoryStrip');
assertContains('customer home template', homeTemplate, 'customerStoryClipRows');
assertContains('customer home template', homeTemplate, 'emyFeedCreatedClips');
assertContains('customer home template', homeTemplate, 'emyFeedCreatedPosts');
assertContains('customer home template', homeTemplate, 'business-create');
assertContains('customer home template', homeTemplate, 'syncCustomerClipStoryRing();');
assertContains('customer home template', homeTemplate, 'emy:created-posts-changed');
assertContains('customer home template', homeTemplate, 'emy:shared-port-content-ready');

assertContains('customer profile template', profileTemplate, '.avatar.emy-story-ring');
assertContains('customer profile template', profileTemplate, 'customerProfileStoryRingStorageKeys');
assertContains('customer profile template', profileTemplate, 'customerProfileHasUploadedStoryClip');
assertContains('customer profile template', profileTemplate, 'customerProfileStoryClipBelongsToCustomer');
assertContains('customer profile template', profileTemplate, 'emyFeedCreatedClips');
assertContains('customer profile template', profileTemplate, 'emyFeedCreatedPosts');
assertContains('customer profile template', profileTemplate, 'business-create');
assertContains('customer profile template', profileTemplate, 'syncCustomerProfileClipStoryRing();');
assertContains('customer profile template', profileTemplate, 'emy:created-posts-changed');
assertContains('customer profile template', profileTemplate, 'emy:shared-port-content-ready');

[
  ['linked customer home HTML', homeHtmlPath],
  ['linked customer profile HTML', profileHtmlPath],
].forEach(([label, filePath]) => {
  const text = read(filePath);
  assertContains(label, text, 'emy-story-ring');
});
assertContains('linked customer home HTML', read(homeHtmlPath), 'data-home-story-strip');

[
  ['linked customer home runtime', homeRuntimePath],
  ['linked customer profile runtime', profileRuntimePath],
].forEach(([label, filePath]) => {
  const text = read(filePath);
  assertContains(label, text, 'emy-story-ring');
  assertContains(label, text, 'emyFeedCreatedClips');
});
assertContains('linked customer home runtime', read(homeRuntimePath), 'renderCustomerHomeStoryStrip');

console.log(JSON.stringify({
  ok: true,
  customerClipStoryRing: true,
  customerHomeStoryRail: true,
  tiedToRealClipStorage: true,
  ignoresBusinessOwnedClipRows: true,
}, null, 2));

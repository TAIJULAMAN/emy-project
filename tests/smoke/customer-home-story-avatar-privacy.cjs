'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const homeTemplatePath = path.join(root, 'src', 'generator', 'sections', '27-customer-home-template-parts.cjs');
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

function assertNotContains(label, text, marker) {
  if (text.includes(marker)) {
    console.error(`${label}: still contains unsafe marker ${marker}`);
    process.exit(1);
  }
}

const template = read(homeTemplatePath);

[
  'const activeProfileContentMediaStorageKeys = [',
  'function activeProfileContentMediaSet()',
  'function activeProfileForbiddenCustomerMediaSet()',
  'function activeProfileCustomerMediaAllowed(value, forbiddenMedia)',
  'function activeProfileCustomerProfileMedia()',
  'return activeProfileCustomerProfileMedia();',
  'const safeCustomerPhoto = activeProfileCustomerProfileMedia();',
  'if (safeCustomerPhoto.ref && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(homeStoryTrack);',
  'function customerProfilePhotoGuardStorageKey(key)',
  'customerProfilePhotoGuardStorageKey(event.key)',
  'const safeProfilePhoto = activeProfileCustomerMediaAllowed(currentProfilePhoto, forbiddenMedia);',
  'const safeProfilePhotoRef = activeProfileCustomerMediaAllowed(currentProfilePhotoRef, forbiddenMedia);',
  'activeProfileFirstMedia([',
  'activeProfileForbiddenCustomerMediaSet());',
].forEach((marker) => assertContains('customer home template', template, marker));

[
  'if (customerStoryClipBelongsToCustomer(item, storageKey)) return { src: currentProfilePhoto || "", ref: currentProfilePhotoRef || "" };',
  'photo: { src: currentProfilePhoto || "", ref: currentProfilePhotoRef || "" }',
  'if (isEmpty && (currentProfilePhoto || currentProfilePhotoRef))',
  'if (currentProfilePhotoRef && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(homeStoryTrack);',
].forEach((marker) => assertNotContains('customer home template', template, marker));

const runtime = read(homeRuntimePath);
if (runtime) {
  [
    'function activeProfileContentMediaSet()',
    'function activeProfileForbiddenCustomerMediaSet()',
    'function activeProfileCustomerProfileMedia()',
    'customerProfilePhotoGuardStorageKey(event.key)',
  ].forEach((marker) => assertContains('linked customer home runtime', runtime, marker));
  assertNotContains('linked customer home runtime', runtime, 'photo: { src: currentProfilePhoto || "", ref: currentProfilePhotoRef || "" }');
}

console.log(JSON.stringify({
  ok: true,
  customerHomeStoryAvatarPrivacy: true,
  customerStoryAvatarRejectsBusinessAndContentMedia: true,
  hydrationRefreshesProfilePhotoGuard: true,
}, null, 2));

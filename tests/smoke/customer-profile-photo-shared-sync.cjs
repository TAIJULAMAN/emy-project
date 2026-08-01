'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const bridgePath = path.join(root, 'src', 'generator', 'asset-sources', 'emy-shared-port-content.js');
const homeTemplatePath = path.join(root, 'src', 'generator', 'sections', '27-customer-home-template-parts.cjs');
const realDataGuardPath = path.join(root, 'src', 'generator', 'asset-sources', 'emy-real-data-guard.js');

const bridge = fs.readFileSync(bridgePath, 'utf8');
const homeTemplate = fs.readFileSync(homeTemplatePath, 'utf8');
const realDataGuard = fs.readFileSync(realDataGuardPath, 'utf8');

function assertContains(label, text, marker) {
  if (!text.includes(marker)) {
    console.error(`${label}: missing ${marker}`);
    process.exit(1);
  }
}

[
  'emyCustomerProfilePhoto',
  'emyCustomerProfilePhotoSrc',
  'emyCustomerProfilePhotoRef',
  'emyCustomerProfileImage',
  'emyCustomerProfileImageSrc',
  'emyCustomerAvatar',
  'emyCustomerAvatarSrc',
  'emyCustomerPhoto',
  'emyCustomerPhotoSrc',
].forEach((key) => {
  assertContains('shared bridge first customer-home pull', bridge, `"${key}"`);
});

assertContains('shared bridge profile-photo event', bridge, 'emy:customer-profile-photo-changed');
assertContains('shared bridge stores raw strings', bridge, 'typeof cleaned === "string" ? cleaned : JSON.stringify(cleaned)');
assertContains('customer home profile photo keys', homeTemplate, 'const customerProfilePhotoStorageKeys = [');
assertContains('customer home profile photo refresh', homeTemplate, 'function refreshProfilePhotoFromStorage()');
assertContains('customer home profile photo event', homeTemplate, 'emy:customer-profile-photo-changed');
assertContains('customer home storage profile photo refresh', homeTemplate, 'customerProfilePhotoGuardStorageKey(event.key)');
assertContains('customer home allows real data images', homeTemplate, '!/^data:image\\/(?!svg\\+xml)/i.test(next)');
assertContains('customer home cleans quoted shared strings', homeTemplate, 'function activeProfileCleanMediaValue(value)');
assertContains('real data guard allows real data images', realDataGuard, 'if (/^data:image\\//i.test(text)) return false;');

console.log(JSON.stringify({
  ok: true,
  customerHomePullsProfilePhotoKeys: true,
  avatarRefreshesAfterSharedPhotoSync: true,
}, null, 2));

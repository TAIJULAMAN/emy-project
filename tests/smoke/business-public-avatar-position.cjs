'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'sections', '26-business-profile-template-parts.cjs');
const htmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-business-profile.html');

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
    console.error(`${label}: still contains bottom-positioned avatar marker ${marker}`);
    process.exit(1);
  }
}

const source = read(sourcePath);

[
  '.public-avatar.emy-avatar-shape-customer { position: absolute !important; left: 22px !important; top: 22px !important; bottom: auto !important;',
  '.public-avatar { left: 16px !important; top: 16px !important; bottom: auto !important; }',
].forEach((marker) => assertContains('business profile source', source, marker));

[
  '.public-avatar.emy-avatar-shape-customer { position: absolute !important; left: 22px !important; bottom: 22px !important;',
  '.public-avatar { width: 72px; height: 72px; left: 16px; bottom: 16px;',
].forEach((marker) => assertNotContains('business profile source', source, marker));

const html = read(htmlPath);
if (html) {
  assertContains('generated business profile html', html, 'left: 22px !important; top: 22px !important; bottom: auto !important;');
  assertContains('generated business profile mobile css', html, '.public-avatar { left: 16px !important; top: 16px !important; bottom: auto !important; }');
  assertNotContains('generated business profile html', html, 'left: 22px !important; bottom: 22px !important;');
}

console.log(JSON.stringify({
  ok: true,
  businessPublicAvatarPosition: true,
  avatarAnchoredTopLeft: true,
  mobileOverrideCanOverrideBaseRule: true,
}, null, 2));

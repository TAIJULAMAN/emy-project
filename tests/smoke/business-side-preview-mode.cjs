'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'sections', '26-business-profile-template-parts.cjs');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');

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
    console.error(`${label}: still contains ${marker}`);
    process.exit(1);
  }
}

const source = read(sourcePath);

[
  'const isBusinessPreviewMode = mode === "preview";',
  'const isProfilePreviewMode = isPublicMode || isBusinessPreviewMode;',
  'document.body.classList.toggle("is-business-profile-preview-shell", isBusinessPreviewMode);',
  'if (publicBusiness) publicBusiness.hidden = !isProfilePreviewMode;',
  'mode === "preview" ? "Business preview"',
  'if (isProfilePreviewMode) {',
  'if (isPublicMode) syncPublicCustomerShell();',
  'function openBusinessSidePreview()',
  'history.replaceState(null, "", "emy-business-profile.html?mode=preview");',
  'setBusinessPageMode("preview", currentBusinessProfile());',
  'if (currentBusinessPageMode === "preview") {',
  'setBusinessPageMode("preview", currentBusinessProfile());',
].forEach((marker) => assertContains('business profile source', source, marker));

assertNotContains('business profile source', source, 'emy-business-profile.html?view=customer&business=profile');

const runtime = read(runtimePath);
if (runtime) {
  assertContains('generated business profile runtime', runtime, 'function openBusinessSidePreview()');
  assertContains('generated business profile runtime', runtime, 'emy-business-profile.html?mode=preview');
  assertContains('generated business profile runtime', runtime, 'const isBusinessPreviewMode = mode === "preview";');
  assertNotContains('generated business profile runtime', runtime, 'emy-business-profile.html?view=customer&business=profile');
}

console.log(JSON.stringify({
  ok: true,
  businessSidePreviewMode: true,
  customerPublicViewUntouched: true,
}, null, 2));

'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const htmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-home.html');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-page.js');
const html = fs.readFileSync(htmlPath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');
const combined = html + '\n' + runtime;

const requiredRuntimeMarkers = [
  'businessPreviewPrev.hidden = !hasPreviewPages || isDisabled;',
  'businessPreviewNext.hidden = !hasPreviewPages || isDisabled;',
  'businessPreview.dataset.atPreviewStart',
  'businessPreview.dataset.atPreviewEnd',
  'if (!availableTypes.includes(activeBusinessPreviewType)) activeBusinessPreviewType = firstPopulatedType || availableTypes[0];',
  'event.stopPropagation();',
  'No posts yet for this business.',
  'No clips yet for this business.',
  'function businessPreviewTrackHasEmptyState()',
  'businessPreviewTrack.style.transform = "";',
  'var annexedBusinessProfileMediaCleanupDone;',
];

const forbiddenRuntimeMarkers = [
  'if (!availableTypes.includes(activeBusinessPreviewType) || (firstPopulatedType && !(preview[activeBusinessPreviewType] || []).length)) activeBusinessPreviewType = firstPopulatedType || availableTypes[0];',
  'let annexedBusinessProfileMediaCleanupDone = false;',
];

const requiredStyleMarkers = [
  '.business-preview-stage:hover .business-preview-arrow:not(:disabled)',
  '.business-preview-arrow:disabled',
  'pointer-events: none',
  '.business-preview-stage:has(.business-preview-empty)',
  '.business-preview-track:has(> .business-preview-empty)',
];

const missingRuntime = requiredRuntimeMarkers.filter((marker) => !runtime.includes(marker));
if (missingRuntime.length) {
  console.error('Business preview arrows are missing boundary-aware runtime behavior:', missingRuntime.join(', '));
  process.exit(1);
}

const forbiddenRuntime = forbiddenRuntimeMarkers.filter((marker) => runtime.includes(marker));
if (forbiddenRuntime.length) {
  console.error('Business preview tabs still snap empty Post/Clips back to Product:', forbiddenRuntime.join(', '));
  process.exit(1);
}

const missingStyle = requiredStyleMarkers.filter((marker) => !combined.includes(marker));
if (missingStyle.length) {
  console.error('Business preview arrows are missing fade/hidden style behavior:', missingStyle.join(', '));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  page: 'emy-customer-home.html',
  runtime: path.relative(root, runtimePath),
  hidesPreviewPrevAtStart: true,
  hidesPreviewNextAtEnd: true,
  fadesUsablePreviewArrows: true,
  preservesEmptyPreviewTabs: true,
}, null, 2));

'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const homeTemplatePath = path.join(root, 'src', 'generator', 'sections', '27-customer-home-template-parts.cjs');
const homeHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-home.html');
const homeRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-page.js');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function assertContains(label, text, needle) {
  if (!text.includes(needle)) {
    console.error(`${label}: missing ${needle}`);
    process.exit(1);
  }
}

const template = read(homeTemplatePath);

assertContains('customer home template', template, 'data-home-banner');
assertContains('customer home template', template, 'data-home-story-strip');
assertContains('customer home template', template, 'data-home-story-viewer');
assertContains('customer home template', template, 'data-home-story-viewer-sound');
assertContains('customer home template', template, 'data-home-story-viewer-pause-indicator');
assertContains('customer home template', template, 'homeStorySourceStorageKeys');
assertContains('customer home template', template, 'homeStoryBusinessClipStorageKey');
assertContains('customer home template', template, 'homeStoryClipLooksBusinessOwned');
assertContains('customer home template', template, 'if (homeStoryClipLooksBusinessOwned(item, storageKey)) return false;');
assertContains('customer home template', template, 'const businessLabel = String(item.businessName || item.business || item.storeName || "")');
assertContains('customer home template', template, 'return storageKey === "emyFeedCreatedClips" && !!actorLabel && actorLabel !== customerLabel;');
assertContains('customer home template', template, 'if (storageKey === "emyUploadedClips" && !/\\bcustomer\\b|customer-create/.test(roleMarker)) return false;');
assertContains('customer home template', template, 'collectHomeStoryItems');
assertContains('customer home template', template, 'homeStoryMediaDetails');
assertContains('customer home template', template, 'openHomeStoryViewer');
assertContains('customer home template', template, 'renderHomeStorySlide');
assertContains('customer home template', template, 'startHomeStoryViewerProgress');
assertContains('customer home template', template, 'advanceHomeStoryViewer');
assertContains('customer home template', template, 'setHomeStoryViewerPaused');
assertContains('customer home template', template, 'toggleHomeStoryViewerPaused');
assertContains('customer home template', template, 'setHomeStoryViewerSound');
assertContains('customer home template', template, '--home-story-progress');
assertContains('customer home template', template, 'homeStoryViewerRowIndex');
assertContains('customer home template', template, 'video.controls = false;');
assertContains('customer home template', template, 'const hasVideoSource = mediaDetails.type === "video" && (mediaDetails.src || mediaDetails.ref);');
assertContains('customer home template', template, 'home-story-card is-empty');
assertContains('customer home template', template, 'emyBusinessClips');
assertContains('customer home template', template, 'emyBusinessReels');
assertContains('customer home template', template, 'emyUploadedClips');
assertContains('customer home template', template, 'homeStoredClipLooksBusinessOwned');
assertContains('customer home template', template, '["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"].forEach((storageKey) => {');
assertContains('customer home template', template, 'const storyMedia = typeof homeStoryMediaDetails === "function" ? homeStoryMediaDetails(item) : {};');
assertContains('customer home template', template, 'if (!mediaSrc && !mediaRef && !posterSrc && !posterRef && !mediaItems.length) return;');
assertContains('customer home template', template, 'data-home-story-index');
assertContains('customer home template', template, 'homeStoryViewerClose.addEventListener("click", closeHomeStoryViewer)');
assertContains('customer home template', template, 'event.key === "Escape"');

[
  ['linked customer home HTML', homeHtmlPath],
  ['linked customer home runtime', homeRuntimePath],
].forEach(([label, filePath]) => {
  if (!fs.existsSync(filePath)) return;
  const text = read(filePath);
  assertContains(label, text, 'data-home-story-strip');
  assertContains(label, text, 'data-home-story-viewer');
  assertContains(label, text, 'data-home-story-viewer-sound');
});
if (fs.existsSync(homeRuntimePath)) {
  const runtime = read(homeRuntimePath);
  assertContains('linked customer home runtime', runtime, 'renderHomeStorySlide');
  assertContains('linked customer home runtime', runtime, 'startHomeStoryViewerProgress');
  assertContains('linked customer home runtime', runtime, 'advanceHomeStoryViewer');
  assertContains('linked customer home runtime', runtime, 'toggleHomeStoryViewerPaused');
  assertContains('linked customer home runtime', runtime, 'setHomeStoryViewerSound');
}

console.log(JSON.stringify({
  ok: true,
  customerHomeStoryShowcase: true,
  visibleStorySlot: true,
  storyViewer: true,
  storyViewerProgress: true,
  multiClipStoryAdvance: true,
  usesRealClipStores: true,
}, null, 2));

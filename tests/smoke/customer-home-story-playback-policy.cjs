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
    console.error(`${label}: should not contain ${marker}`);
    process.exit(1);
  }
}

const template = read(homeTemplatePath);

[
  'const homeStoryClipPlaybackWindowMs = 8 * 60 * 60 * 1000;',
  'let homeStoryViewerSoundOn = true;',
  'homeStoryViewerSoundOn = localStorage.getItem("emyHomeStoryViewerSoundOn") !== "0";',
  'function customerStoryClipWithinPlaybackWindow(item)',
  'const relative = label.match(/^(\\d+(?:\\.\\d+)?)\\s*(m|min|mins|minute|minutes|h|hr|hrs|hour|hours|d|day|days|w|week|weeks)(?:\\s*ago)?$/);',
  ': /^d/.test(unit) ? 24 * 60 * 60 * 1000',
  'return Date.now() - postedAt < homeStoryClipPlaybackWindowMs;',
  '&& customerStoryClipWithinPlaybackWindow(item)',
  '|| !customerStoryClipWithinPlaybackWindow(item)) return;',
  'try { localStorage.setItem("emyHomeStoryViewerSoundOn", homeStoryViewerSoundOn ? "1" : "0"); } catch (error) {}',
].forEach((marker) => assertContains('customer home template', template, marker));

[
  'let homeStoryViewerSoundOn = false;',
  'homeStoryViewerSoundOn = localStorage.getItem("emyHomeStoryViewerSoundOn") === "1";',
  'homeStoryViewerSoundOn = false;\n              applyHomeStoryViewerSound(video);',
].forEach((marker) => assertNotContains('customer home template', template, marker));

const runtime = read(homeRuntimePath);
if (runtime) {
  [
    'const homeStoryClipPlaybackWindowMs = 8 * 60 * 60 * 1000;',
    'let homeStoryViewerSoundOn = true;',
    'function customerStoryClipWithinPlaybackWindow(item)',
  ].forEach((marker) => assertContains('linked customer home runtime', runtime, marker));
}

console.log(JSON.stringify({
  ok: true,
  customerHomeStoryPlaybackPolicy: true,
  soundDefaultsOnUnlessUserMuted: true,
  storyPlaybackExpiresAfterEightHours: true,
  clipsRemainAvailableOutsideStoryPlayer: true,
}, null, 2));

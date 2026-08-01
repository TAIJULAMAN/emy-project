'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const cssPath = path.join(root, 'src', 'generator', 'sections', '08-item-detail-modal-css.cjs');
const scriptPath = path.join(root, 'src', 'generator', 'sections', '18-item-detail-modal-script.cjs');
const chatHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-chat.html');
const chatRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-chat-page.js');

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function assertContains(label, text, marker) {
  if (!text.includes(marker)) {
    console.error(`${label}: missing ${marker}`);
    process.exit(1);
  }
}

const css = read(cssPath);
const script = read(scriptPath);

[
  '.clip-viewer-media {',
  'cursor: pointer;',
  '.clip-viewer-controls {',
  'right: 14px;',
  'top: 70px;',
  'flex-direction: column;',
  '.clip-viewer-volume-popover {',
  'right: calc(100% + 8px);',
  '.clip-viewer-controls { left: auto; right: 12px; top: 56px; gap: 7px; }',
].forEach((marker) => assertContains('clip viewer css', css, marker));

[
  'data-clip-video-play',
  'data-clip-video-mute',
  'data-clip-video-volume',
  'toggleClipVideoPlayback',
  'toggleClipVideoMute',
  'setClipVideoVolume',
  'const clipMedia = event.target.closest(".clip-viewer-media");',
  'toggleClipVideoPlayback(clipMedia.closest("[data-clip-slide]"));',
].forEach((marker) => assertContains('clip viewer script', script, marker));

const chatHtml = read(chatHtmlPath);
if (chatHtml) {
  assertContains('linked customer chat html', chatHtml, 'emy-customer-chat-page.js');
  assertContains('linked customer chat html', chatHtml, 'right: 14px;');
  assertContains('linked customer chat html', chatHtml, 'top: 70px;');
}

const chatRuntime = read(chatRuntimePath);
if (chatRuntime) {
  assertContains('linked customer chat runtime', chatRuntime, 'data-clip-video-play');
  assertContains('linked customer chat runtime', chatRuntime, 'data-clip-video-mute');
  assertContains('linked customer chat runtime', chatRuntime, 'toggleClipVideoPlayback');
  assertContains('linked customer chat runtime', chatRuntime, 'toggleClipVideoMute');
}

console.log(JSON.stringify({
  ok: true,
  clipViewerVisibleControls: true,
  clickMediaToPause: true,
  soundControlVisible: true,
}, null, 2));

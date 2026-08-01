'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..', '..');
const sharedSourcePath = path.join(root, 'src', 'generator', 'asset-sources', 'emy-shared-port-content.js');
const sharedRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'emy-shared-port-content.js');
const extractorPath = path.join(root, 'src', 'generator', 'sections', '47-extract-page-inline-scripts.cjs');
const homeHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-home.html');
const homeStartupCssPath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-startup.css');

const sharedPages = [
  'emy-admin-backend.html',
  'emy-business-profile.html',
  'emy-customer-chat.html',
  'emy-customer-feeds.html',
  'emy-customer-home.html',
  'emy-customer-profile.html',
  'emy-customer-search.html',
  'emy-notification-settings.html',
];

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function assertContains(label, text, needle) {
  if (!text.includes(needle)) {
    console.error(`${label}: missing ${needle}`);
    process.exit(1);
  }
}

function assertNotContains(label, text, needle) {
  if (text.includes(needle)) {
    console.error(`${label}: should not contain ${needle}`);
    process.exit(1);
  }
}

function assertStableBridge(label, text) {
  assertContains(label, text, 'let deferredInitialChangedKeys = [];');
  assertContains(label, text, 'function deferInitialRefresh(changedKeys)');
  assertContains(label, text, 'const eventNames = new Set(["emy:business-content-changed", "emy:media-stored"]);');
  assertContains(label, text, 'await pullSharedContent({ deferRefresh: true });');
  assertContains(label, text, 'await pullSharedContent({ deferRefresh: !initialSyncReadyDispatched });');
  assertContains(label, text, 'if (deferredInitialChangedKeys.length)');
  assertNotContains(label, text, 'requestSurfaceRefresh([]);');
}

function assertHomeRuntimeWaits(label, text) {
  assertContains(label, text, 'function sharedContentReady()');
  assertContains(label, text, 'function waitForSharedContentReady()');
  assertContains(label, text, 'window.addEventListener("emy:shared-port-content-ready", finish, { once: true });');
  assertContains(label, text, 'window.emySyncSharedPortContentNow("runtime-wait");');
  assertContains(label, text, 'if (!sharedContentReady())');
  assertContains(label, text, 'function lateSupportHolders(includeRealDataGuard)');
  assertContains(label, text, 'lateSupportHolders(false)');
  assertContains(label, text, 'emy:home-real-data-guard-ready');
  assertContains(label, text, 'const delay = view === "feeds" ? 1200 : view ? 18000 : 30000;');
  assertContains(label, text, 'const quietWindow = view === "feeds" ? 1200 : view ? 5000 : 8000;');
  assertContains(label, text, 'if (now < hardDeadline && now - lastUserActivityAt < quietWindow)');
  assertContains(label, text, 'window.setTimeout(loadRuntime, 0);');
  assertContains(label, text, '[data-view-all],[data-home-flow-load-more]');
  assertContains(label, text, 'function shouldReplayRuntimeTrigger(trigger)');
  assertContains(label, text, 'function replayRuntimeTrigger(trigger)');
  assertContains(label, text, 'function applyShellRuntimeTrigger(trigger)');
  assertContains(label, text, 'function setShellLocationSheetOpen(isOpen)');
  assertContains(label, text, 'function setShellCreateMenuOpen(isOpen)');
  assertContains(label, text, 'function activeSurfaceTriggerCanWake(trigger)');
  assertContains(label, text, '[data-location],[data-location-add],[data-location-close]');
  assertContains(label, text, '[data-feed-create-open],[data-feed-create-close],[data-feed-create-choice]');
  assertContains(label, text, '[data-profile-photo-adjust],[data-profile-photo-change]');
  assertNotContains(label, text, 'target.closest("[data-nav],[data-view-all]');
  assertNotContains(label, text, "a[data-location][href^='#']");
  assertNotContains(label, text, '[data-feed-create-open],[data-feed-create-choice],[data-feed-open],[data-open-item-detail],[data-feed-compose-post],[data-feed-compose-image],[data-feed-compose-video],[data-feed-compose-remove],[data-feed-compose-source],[data-feed-compose-source-close],[data-feed-compose-camera-close],[data-feed-compose-camera-cancel],[data-feed-compose-camera-capture],[data-feed-compose-camera-stop],[data-feed-post-cancel]")) return null;');
  assertNotContains(label, text, "button[aria-haspopup='menu'],[role='button']");
  assertNotContains(label, text, 'trigger.setAttribute("aria-busy", "true");');
  assertNotContains(label, text, 'emyRuntimeReplay');
}

const sharedSource = read(sharedSourcePath);
const sharedRuntime = read(sharedRuntimePath);
const extractor = read(extractorPath);
const homeHtml = read(homeHtmlPath);
const homeStartupCss = read(homeStartupCssPath);
const sharedRuntimeHash = crypto.createHash('sha256').update(sharedRuntime).digest('hex').slice(0, 12);

assertStableBridge('shared bridge source', sharedSource);
assertStableBridge('shared bridge runtime', sharedRuntime);
assertHomeRuntimeWaits('customer home runtime loader source', extractor);
assertHomeRuntimeWaits('linked customer home runtime loader', homeHtml);
assertContains('customer home extractor source', extractor, 'function extractCustomerHomeStartupStyles(html)');
assertContains('customer home extractor source', extractor, 'function minifyCustomerHomeStartupCss(css)');
assertContains('linked customer home startup css link', homeHtml, 'data-emy-customer-home-startup-style');
assertContains('linked customer home startup css link', homeHtml, 'assets/emy-customer-home-startup.css');
assertContains('linked customer home startup css', homeStartupCss, '.home-first-paint-loader');
assertContains('customer home runtime loader source', extractor, 'data-emy-home-late-support-loader');
assertContains('linked customer home late support loader', homeHtml, 'data-emy-home-late-support-loader');
assertContains('linked customer home late central storage', homeHtml, 'data-emy-home-late-src="emy-central-storage.js');
assertContains('linked customer home late shared bridge', homeHtml, 'data-emy-home-late-src="emy-shared-port-content.js');
assertContains('linked customer home late real data guard', homeHtml, 'data-emy-home-late-src="assets/emy-real-data-guard.js');
assertNotContains('linked customer home startup path', homeHtml, '<script defer src="emy-central-storage.js');
assertNotContains('linked customer home startup path', homeHtml, '<script defer src="emy-shared-port-content.js');
assertNotContains('linked customer home startup path', homeHtml, '<script defer src="assets/emy-real-data-guard.js');

sharedPages.forEach((page) => {
  const html = read(path.join(root, 'linked-pages', 'restore-may20', page));
  assertContains(page, html, `emy-shared-port-content.js?v=${sharedRuntimeHash}`);
});

console.log(JSON.stringify({
  ok: true,
  sharedBridgeDefersInitialRefresh: true,
  noNoopSurfaceRefresh: true,
  customerHomeWaitsForSharedSync: true,
  sharedBridgeCacheBustedOnBuiltPages: true,
}, null, 2));

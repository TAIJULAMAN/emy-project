'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const homePath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-home.html');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-page.js');
const startupCssPath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-startup.css');
const realDataGuardPath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-real-data-guard.js');
const html = fs.readFileSync(homePath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');
const startupCss = fs.readFileSync(startupCssPath, 'utf8');
const realDataGuard = fs.readFileSync(realDataGuardPath, 'utf8');

const requiredMarkers = [
  '<!doctype html>',
  'emy-customer-home',
  'data-emy-customer-shell-session',
  'assets/emy-customer-shell-session.js',
  'data-emy-customer-home-startup-style',
  'assets/emy-customer-home-startup.css',
  'assets/emy-notification-router.js',
  'emy-account-runtime.js',
];

const missing = requiredMarkers.filter((marker) => !html.includes(marker));
if (missing.length) {
  console.error('Customer home missing markers:', missing.join(', '));
  process.exit(1);
}

const requiredRuntimeMarkers = [
  'const HOME_FLOW_INITIAL_COUNT = 12;',
  'const HOME_FLOW_LOAD_MORE_COUNT = 6;',
  'let homeFlowVisibleLimit = HOME_FLOW_INITIAL_COUNT;',
  'window.EMY_HOME_FLOW_INITIAL_COUNT = HOME_FLOW_INITIAL_COUNT;',
  'window.EMY_HOME_FLOW_LOAD_MORE_COUNT = HOME_FLOW_LOAD_MORE_COUNT;',
  'window.EMY_HOME_FLOW_BATCH_SIZE = HOME_FLOW_LOAD_MORE_COUNT;',
  'homeFlowVisibleLimit = currentLimit + HOME_FLOW_LOAD_MORE_COUNT;',
  'Load " + Math.min(HOME_FLOW_LOAD_MORE_COUNT, remaining) + " more',
];

const missingRuntime = requiredRuntimeMarkers.filter((marker) => !runtime.includes(marker));
if (missingRuntime.length) {
  console.error('Customer home mixed feed load-more behavior is missing markers:', missingRuntime.join(', '));
  process.exit(1);
}

const requiredRealDataGuardMarkers = [
  'function realHomeFlowInitialCount()',
  'function realHomeFlowLoadMoreCount()',
  'const initialCount = realHomeFlowInitialCount();',
  'const batchSize = realHomeFlowLoadMoreCount();',
];

const missingRealDataGuard = requiredRealDataGuardMarkers.filter((marker) => !realDataGuard.includes(marker));
if (missingRealDataGuard.length) {
  console.error('Customer home real-data guard is missing mixed feed 12 + 6 markers:', missingRealDataGuard.join(', '));
  process.exit(1);
}

const inlineEmyScripts = (html.match(/<script data-emy-[^>]+>[\s\S]*?<\/script>/g) || []).length;
const directExternalAssetRefs = (html.match(/src="assets\//g) || []).length;
const lateExternalAssetRefs = (html.match(/"src":"assets\//g) || []).length;
const externalAssetRefs = directExternalAssetRefs + lateExternalAssetRefs;
const inlineStyleBytes = (html.match(/<style\b[^>]*>[\s\S]*?<\/style>/g) || []).map((block) => Buffer.byteLength(block));
const largestInlineStyle = inlineStyleBytes.length ? Math.max(...inlineStyleBytes) : 0;
const homeHtmlBytes = Buffer.byteLength(html);
const startupCssBytes = Buffer.byteLength(startupCss);
const startupBusinessCards = (html.match(/<article class="card business-card" data-business-card/g) || []).length;
const startupLiteLikeIcons = (html.match(/emy-business-like-icon-lite/g) || []).length;
const startupInlineBagIcons = (html.match(/<span class="emy-business-like-icon" aria-hidden="true"><svg class="emy-business-like-bag"/g) || []).length;

if (externalAssetRefs < 20) {
  console.error('Expected at least 20 external asset refs, found', externalAssetRefs);
  process.exit(1);
}

if (homeHtmlBytes > 250000) {
  console.error('Customer home HTML is too large for startup:', homeHtmlBytes);
  process.exit(1);
}

if (largestInlineStyle > 16384) {
  console.error('Customer home still has a large inline style block:', largestInlineStyle);
  process.exit(1);
}

if (startupCssBytes < 650000 || startupCssBytes > 850000 || !startupCss.includes('.home-first-paint-loader')) {
  console.error('Customer home startup CSS was not extracted correctly:', startupCssBytes);
  process.exit(1);
}

if (startupBusinessCards > 4) {
  console.error('Customer home startup fallback deck has too many cards:', startupBusinessCards);
  process.exit(1);
}

if (startupLiteLikeIcons < startupBusinessCards || startupInlineBagIcons > 0) {
  console.error('Customer home startup fallback like icons are too heavy:', { startupLiteLikeIcons, startupInlineBagIcons });
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  page: 'emy-customer-home.html',
  bytes: homeHtmlBytes,
  startupCssBytes,
  largestInlineStyle,
  startupBusinessCards,
  startupLiteLikeIcons,
  externalAssetRefs,
  remainingInlineEmyScripts: inlineEmyScripts,
  markersChecked: requiredMarkers.length,
  mixedFeedInitialCount: 12,
  mixedFeedLoadMoreCount: 6,
}, null, 2));

'use strict';

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', '..', 'linked-pages', 'restore-may20');
const requiredPages = [
  'index.html',
  'emy-customer-home.html',
  'emy-customer-search.html',
  'emy-customer-feeds.html',
  'emy-customer-profile.html',
  'emy-business-profile.html',
  'emy-signin.html',
  'emy-signup.html',
  'emy-admin-backend.html',
  'ask-emy.html',
  'auth-config.js',
  'emy-account-runtime.js',
];

const missing = requiredPages.filter((name) => !fs.existsSync(path.join(outDir, name)));
if (missing.length) {
  console.error('Missing generated pages:', missing.join(', '));
  process.exit(1);
}

const homeHtml = fs.readFileSync(path.join(outDir, 'emy-customer-home.html'), 'utf8');
if (!homeHtml.includes('<!doctype html>') || homeHtml.length < 10000) {
  console.error('emy-customer-home.html looks invalid or too small');
  process.exit(1);
}

const assetsDir = path.join(outDir, 'assets');
const requiredAssets = [
  'emy-customer-shell-session.js',
  'emy-business-like-sync.js',
  'emy-notification-router.js',
  'emy-customer-home-page.js',
  'emy-customer-home-feeds-app.js',
  'emy-customer-home-media.js',
  'asset-manifest.json',
];
const missingAssets = requiredAssets.filter((name) => !fs.existsSync(path.join(assetsDir, name)));
if (missingAssets.length) {
  console.error('Missing generated assets:', missingAssets.join(', '));
  process.exit(1);
}

if (!homeHtml.includes('script src="assets/emy-customer-shell-session.js"') && !homeHtml.includes('script defer src="assets/emy-customer-shell-session.js"')) {
  console.error('emy-customer-home.html is not using external shared assets');
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  outDir,
  checked: requiredPages.length,
  customerHomeBytes: Buffer.byteLength(homeHtml),
  externalAssetsChecked: requiredAssets.length,
}, null, 2));

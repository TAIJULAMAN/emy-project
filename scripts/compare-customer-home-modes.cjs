'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const homePath = path.join(root, 'linked-pages/restore-may20/emy-customer-home.html');
const workDir = path.join(root, 'work');

function hashFile(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function markerReport(html) {
  const markers = [
    'function homeAnnexedPostListItems',
    'function patchLockedCustomerHomeNotifications',
    'data-emy-legacy-engagement-toolbar-removal',
    'assets/emy-customer-shell-session.js',
    'emy-account-runtime.js',
    'function carouselActiveVideo',
    'hideCreateBanner',
    'function canonicalAnnexedFeedId',
  ];
  return Object.fromEntries(markers.map((marker) => [marker, html.includes(marker)]));
}

function shellCopy(name) {
  fs.mkdirSync(workDir, { recursive: true });
  const target = path.join(workDir, name);
  fs.copyFileSync(homePath, target);
  return target;
}

async function main() {
  if (!fs.existsSync(homePath)) {
    console.error('Missing customer home output. Run npm run generate first.');
    process.exit(1);
  }

  const lockedSnapshot = shellCopy('customer-home-locked-mode.html');
  const lockedHtml = fs.readFileSync(lockedSnapshot, 'utf8');
  const lockedReport = {
    bytes: Buffer.byteLength(lockedHtml),
    lines: lockedHtml.split(/\n/).length,
    sha256: hashFile(lockedSnapshot),
    markers: markerReport(lockedHtml),
  };

  console.log(JSON.stringify({ phase: 'locked-baseline-snapshot', lockedReport }, null, 2));
  console.log('\nRun: npm run generate:template-home');
  console.log('Then: node scripts/compare-customer-home-modes.cjs --after-template');
}

function compareAfterTemplate() {
  const lockedPath = path.join(workDir, 'customer-home-locked-mode.html');
  if (!fs.existsSync(lockedPath)) {
    console.error('Missing locked snapshot. Run without --after-template first.');
    process.exit(1);
  }
  const lockedHtml = fs.readFileSync(lockedPath, 'utf8');
  const templateHtml = fs.readFileSync(homePath, 'utf8');
  const lockedMarkers = markerReport(lockedHtml);
  const templateMarkers = markerReport(templateHtml);

  const markerDiff = {};
  for (const key of Object.keys(lockedMarkers)) {
    markerDiff[key] = { locked: lockedMarkers[key], template: templateMarkers[key] };
  }

  console.log(JSON.stringify({
    lockedBytes: Buffer.byteLength(lockedHtml),
    templateBytes: Buffer.byteLength(templateHtml),
    byteDelta: Buffer.byteLength(templateHtml) - Buffer.byteLength(lockedHtml),
    lockedSha256: hashFile(lockedPath),
    templateSha256: hashFile(homePath),
    identical: hashFile(lockedPath) === hashFile(homePath),
    markerDiff,
  }, null, 2));
}

if (process.argv.includes('--after-template')) {
  compareAfterTemplate();
} else {
  main();
}

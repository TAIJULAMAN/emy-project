'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const homePath = path.join(root, 'linked-pages/restore-may20/emy-customer-home.html');
const html = fs.readFileSync(homePath, 'utf8');
const assetsDir = path.join(root, 'linked-pages/restore-may20/assets');
const assets = fs.readdirSync(assetsDir).filter((f) => fs.statSync(path.join(assetsDir, f)).isFile());
const assetBytes = assets.reduce((sum, f) => sum + fs.statSync(path.join(assetsDir, f)).size, 0);
const sectionsDir = path.join(root, 'src/generator/sections');
const sections = fs.readdirSync(sectionsDir).filter((f) => f.endsWith('.cjs'));
const topSections = sections
  .map((f) => ({ file: f, bytes: fs.statSync(path.join(sectionsDir, f)).size }))
  .sort((a, b) => b.bytes - a.bytes)
  .slice(0, 5);

console.log(JSON.stringify({
  customerHomeBytes: Buffer.byteLength(html),
  customerHomeLines: html.split(/\n/).length,
  externalAssetRefs: (html.match(/src="assets\//g) || []).length,
  externalStylesheetRefs: (html.match(/href="assets\//g) || []).length,
  remainingInlineEmyScripts: (html.match(/<script data-emy-/g) || []).length,
  assetFileCount: assets.length,
  assetBytesTotal: assetBytes,
  monolithBackupBytes: fs.statSync(path.join(root, 'generate-linked-pages.monolith.cjs.bak')).size,
  sectionCount: sections.length,
  topSections,
}, null, 2));

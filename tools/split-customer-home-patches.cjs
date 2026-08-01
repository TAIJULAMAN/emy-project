'use strict';

const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, '../src/generator/sections');
const sourcePath = path.join(sectionsDir, '02-customer-home-patches.cjs');
const backupPath = path.join(sectionsDir, '02-customer-home-patches.cjs.bak');

const SPLITS = [
  { name: '02a-customer-home-baseline.cjs', start: 2, end: 31 },
  { name: '02b-customer-home-detail-avatar.cjs', start: 32, end: 187 },
  { name: '02c-customer-home-notifications.cjs', start: 188, end: 581 },
  { name: '02d-customer-home-avatars.cjs', start: 582, end: 1080 },
  { name: '02e-customer-home-strip-templates.cjs', start: 1081, end: 1290 },
  { name: '02f-customer-home-feed-patches.cjs', start: 1291, end: 1571 },
  { name: '02g-customer-home-finalise.cjs', start: 1572 },
];

function splitCustomerHomePatches() {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing ${sourcePath}`);
  }
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(sourcePath, backupPath);
  }

  const lines = fs.readFileSync(sourcePath, 'utf8').split(/\r?\n/);
  const manifest = [];

  for (const split of SPLITS) {
    const startIdx = split.start - 1;
    const endIdx = (split.end || lines.length) - 1;
    const chunk = lines.slice(startIdx, endIdx + 1).join('\n');
    const header = `/* EMY customer home section: ${split.name} (lines ${split.start}-${split.end || lines.length}) */\n`;
    const outputPath = path.join(sectionsDir, split.name);
    fs.writeFileSync(outputPath, header + chunk + '\n', 'utf8');
    manifest.push({
      file: split.name,
      start: split.start,
      end: split.end || lines.length,
      lines: endIdx - startIdx + 1,
    });
  }

  fs.unlinkSync(sourcePath);
  fs.writeFileSync(
    path.join(sectionsDir, 'customer-home-sections.json'),
    JSON.stringify({ sections: manifest }, null, 2),
    'utf8'
  );

  console.log(JSON.stringify({ split: manifest.length, backupPath }, null, 2));
}

splitCustomerHomePatches();

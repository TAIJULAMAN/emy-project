'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const pagesDir = path.join(root, 'linked-pages', 'restore-may20');
const userFacingPages = [
  'emy-business-profile.html',
  'emy-customer-home.html',
  'emy-customer-profile.html',
  'emy-customer-feeds.html',
  'emy-customer-search.html',
  'emy-notification-settings.html',
];

const forbiddenMarkers = [
  'aria-label="Open EMY admin backend"',
  'title="Admin backend"',
  '<a class="customer-feed-link" href="emy-admin-backend.html">Admin backend',
];

const failures = [];

for (const page of userFacingPages) {
  const filePath = path.join(pagesDir, page);
  if (!fs.existsSync(filePath)) continue;
  const html = fs.readFileSync(filePath, 'utf8');
  for (const marker of forbiddenMarkers) {
    if (html.includes(marker)) failures.push(`${page}: ${marker}`);
  }
}

if (failures.length) {
  console.error('Admin shortcuts leaked into user-facing pages:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, checked: userFacingPages }, null, 2));

'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const htmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-home.html');
const html = fs.readFileSync(htmlPath, 'utf8');

if (!html.includes('<button class="left-rail-toggle" type="button" data-left-rail-toggle')) {
  console.error('Customer home is missing the left rail toggle button.');
  process.exit(1);
}

const baseToggleRule = html.match(/\.left-rail-toggle\s*\{[^}]+\}/);
const toggleRule = html.match(/\.left-rail-brand-row \.left-rail-toggle\s*\{[^}]+\}/);
const iconRule = html.match(/\.left-rail-brand-row \.left-rail-toggle svg\s*\{[^}]+\}/);
const hasBaseCursor = baseToggleRule && /cursor:\s*pointer;/.test(baseToggleRule[0]);
const hasButtonCursor = toggleRule && /cursor:\s*pointer;/.test(toggleRule[0]);
const iconTargetsButton = iconRule && /pointer-events:\s*none;/.test(iconRule[0]);

if (!hasBaseCursor || !hasButtonCursor || !iconTargetsButton) {
  console.error('Customer home left rail toggle is missing reliable pointer cursor behavior:', JSON.stringify({
    hasBaseCursor: Boolean(hasBaseCursor),
    hasButtonCursor: Boolean(hasButtonCursor),
    iconTargetsButton: Boolean(iconTargetsButton),
  }));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  page: 'emy-customer-home.html',
  leftRailToggleBaseHasPointerCursor: true,
  leftRailToggleHasPointerCursor: true,
  iconHoverTargetsButton: true,
}, null, 2));

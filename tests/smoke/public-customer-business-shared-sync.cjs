'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const bridgePath = path.join(root, 'linked-pages', 'restore-may20', 'emy-shared-port-content.js');
const pagePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');
const realDataGuardPath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-real-data-guard.js');
const serverPath = path.join(root, 'serve-linked-pages.cjs');
const bridge = fs.readFileSync(bridgePath, 'utf8');
const page = fs.readFileSync(pagePath, 'utf8');
const realDataGuard = fs.readFileSync(realDataGuardPath, 'utf8');
const server = fs.readFileSync(serverPath, 'utf8');

const requiredBridgeMarkers = [
  'eventNames.add("emy:customer-business-changed")',
  '"emy:customer-business-changed", "emy:media-stored"',
  'if (this === localStorage && isSharedContentKey(String(key)))',
  'if (/^emyCustomerBusiness:/i.test(text)) return false;',
];

const requiredPageMarkers = [
  'window.emyFlushSharedPortContentKeys(keys, "customer-business-save");',
  'const keys = ["emyCustomerBusinesses"];',
  'customerEmail: customer.customerEmail,',
  'function publicBusinessCustomerRowHasIdentity(row) {',
  'if (publicBusinessCustomerRowHasIdentity(row) && !publicBusinessCustomerRowMatchesCurrent(row)) return false;',
  'function removePublicBusinessCustomer(profile) {',
  'localStorage.setItem("emyCustomerBusiness:" + alias, "0")',
  'const active = !publicBusinessCustomerActive(profile);',
  'notifyPublicBusinessCustomerSaved(detail, active);',
  'button.classList.toggle("is-primary", active);',
  'function applyPublicCustomerButtonStyle(button, active) {',
  'applyPublicCustomerButtonStyle(button, active);',
  'applyPublicCustomerButtonStyle(publicCustomer, active);',
  'window.addEventListener("emy:customer-business-changed", refreshBusinessLiveCounts);',
  'event.key === "emyCustomerBusinesses" || event.key === "emyCustomerRelationshipRequests" || String(event.key || "").indexOf("emyCustomerBusiness:") === 0',
];

const requiredRealDataGuardMarkers = [
  'function customerBusinessRemovedFlagForAliases(aliases) {',
  'if (customerBusinessRemovedFlagForAliases(aliases)) return false;',
  'if (customerBusinessRemovedFlagForAliases(rowAliases)) continue;',
];

const requiredServerMarkers = [
  'if (/^emyCustomerBusiness:/i.test(text)) return false;',
  'Object.keys(source).filter(isSharedContentKey).reduce((output, key) => {',
];

const missingBridge = requiredBridgeMarkers.filter((marker) => !bridge.includes(marker));
if (missingBridge.length) {
  console.error('Shared content bridge is missing customer-business sync hooks:', missingBridge.join(', '));
  process.exit(1);
}

const missingPage = requiredPageMarkers.filter((marker) => !page.includes(marker));
if (missingPage.length) {
  console.error('Public business page is missing customer-business shared sync hooks:', missingPage.join(', '));
  process.exit(1);
}

const missingRealDataGuard = requiredRealDataGuardMarkers.filter((marker) => !realDataGuard.includes(marker));
if (missingRealDataGuard.length) {
  console.error('Shared business cards can still ignore removed My Businesses state:', missingRealDataGuard.join(', '));
  process.exit(1);
}

const missingServer = requiredServerMarkers.filter((marker) => !server.includes(marker));
if (missingServer.length) {
  console.error('Shared content server is missing customer-business filtering hooks:', missingServer.join(', '));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  page: 'emy-business-profile.html',
  customerBusinessSharedSync: true,
}, null, 2));

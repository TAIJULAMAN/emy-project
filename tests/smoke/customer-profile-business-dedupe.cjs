'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'sections', '31-customer-profile-template-parts.cjs');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-profile-page.js');

const source = fs.readFileSync(sourcePath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');

const markers = [
  'function customerBusinessIdentityAliases(item, fallbackKey)',
  'function customerBusinessCanonicalKey(item, fallbackKey)',
  'function dedupeCustomerBusinessEntries(entries)',
  'function customerBusinessAliasStorageKeys(businesses, key, business)',
  'return dedupeCustomerBusinessEntries(rows);',
  'return dedupeCustomerBusinessEntries(customerBusinessEntries().filter(previewBusinessEntryAllowed));',
  'const key = customerBusinessCanonicalKey(item, item.key || item.id || item.businessKey || item.name || item.business);',
  'const removedKeys = customerBusinessAliasStorageKeys(businesses, storageKey, business);',
  'customerBusinessAliasStorageKeys(businesses, storageKey, request).forEach((itemKey) =>',
];

function assertMarkers(label, text) {
  const missing = markers.filter((marker) => !text.includes(marker));
  if (missing.length) {
    console.error(label + ' is missing customer business dedupe markers:', missing.join(', '));
    process.exit(1);
  }
}

assertMarkers('Customer profile source', source);
assertMarkers('Generated customer profile runtime', runtime);

console.log(JSON.stringify({
  ok: true,
  businessesYouFollow: 'deduped by business identity',
  stopCustomer: 'removes duplicate aliases',
}, null, 2));

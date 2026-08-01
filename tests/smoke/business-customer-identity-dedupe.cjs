'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'sections', '26-business-profile-template-parts.cjs');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');

const source = fs.readFileSync(sourcePath, 'utf8');
const runtime = fs.existsSync(runtimePath) ? fs.readFileSync(runtimePath, 'utf8') : '';

const requiredMarkers = [
  'function publicBusinessCustomerIdentityValues(row) {',
  'return publicBusinessCustomerIdentityValues(row).length > 0;',
  'return publicBusinessCustomerIdentityValues(row).some((value) => {',
  'function businessProfileCustomerIdentityAliases(row, fallback) {',
  'function businessProfileCustomerAliasVariants(value) {',
  'function businessProfileCurrentCustomerAliases() {',
  'function businessProfileCustomerLooksLikeCurrent(row, fallback) {',
  'function businessProfileCustomerNameFromRow(row, fallback, current) {',
  'if (businessProfileCustomerLooksLikeCurrent(row, fallback)) return businessProfileCustomerDisplayName();',
  'const customerName = businessProfileCustomerNameFromRow(row, fallback, current);',
  'rawCustomerName: row && row.customerName,',
  'originalCustomerName: row && (row.customerName || row.name),',
  'const seenAliases = {};',
  'aliases.some((alias) => seenAliases[alias])',
  'rows.push(Object.assign({}, row || {}, { customerName, displayName: customerName, name: customerName }));',
  'localSlug + "@emy.local"',
  'values.flatMap(businessProfileCustomerAliasVariants)',
  'row.customerName || row.customerDisplayName || row.displayName || row.customer || row.email || row.name || "Customer"',
  'localStorage.getItem("emyBusinessOwnerCustomerEmail"),',
  'localStorage.getItem("emyBusinessRegistrationCustomerEmail"),',
  'const currentBusinessRows = typeof businessProfileCustomerRows === "function" ? businessProfileCustomerRows(profile) : [];',
  'if (aliases.some((alias) => localStorage.getItem("emyCustomerBusiness:" + alias) === "0")) return false;',
  'if (currentBusinessRows.length === 1 || (typeof publicBusinessCustomerTotal === "function" && publicBusinessCustomerTotal(profile) === 1)) return true;',
];

const forbiddenMarkers = [
  'row && (row.customerName || row.customer || row.customerDisplayName || row.name || row.email || row.customerEmail)',
];

function assertText(label, text) {
  const missing = requiredMarkers.filter((marker) => !text.includes(marker));
  if (missing.length) {
    console.error(label + ' is missing customer identity dedupe markers:', missing.join(', '));
    process.exit(1);
  }
  const forbidden = forbiddenMarkers.filter((marker) => text.includes(marker));
  if (forbidden.length) {
    console.error(label + ' still treats business name as customer identity:', forbidden.join(', '));
    process.exit(1);
  }
  const activeFunctionStart = text.indexOf('function publicBusinessCustomerActive(profile) {');
  const activeFunctionEnd = text.indexOf('function savePublicBusinessCustomer(profile) {', activeFunctionStart);
  const activeFunction = activeFunctionStart >= 0 && activeFunctionEnd > activeFunctionStart ? text.slice(activeFunctionStart, activeFunctionEnd) : '';
  const removedIndex = activeFunction.indexOf('if (aliases.some((alias) => localStorage.getItem("emyCustomerBusiness:" + alias) === "0")) return false;');
  const storesIndex = activeFunction.indexOf('const customerStores = ["emyCustomerBusinesses", "emyCustomerRelationshipRequests"];');
  const customerTotalIndex = activeFunction.indexOf('if (currentBusinessRows.length === 1 || (typeof publicBusinessCustomerTotal === "function" && publicBusinessCustomerTotal(profile) === 1)) return true;');
  if (!activeFunction || removedIndex < 0 || storesIndex < 0 || customerTotalIndex < 0 || removedIndex > storesIndex || removedIndex > customerTotalIndex) {
    console.error(label + ' must respect the explicit remove toggle before accepted rows or customer totals can mark the business active.');
    process.exit(1);
  }
}

assertText('Business profile source', source);
if (runtime) assertText('Generated business profile runtime', runtime);

console.log(JSON.stringify({
  ok: true,
  customerIdentityDedupe: true,
  page: 'emy-business-profile.html',
}, null, 2));

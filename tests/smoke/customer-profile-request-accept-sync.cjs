'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'sections', '31-customer-profile-template-parts.cjs');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-profile-page.js');

const source = fs.readFileSync(sourcePath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');

const markers = [
  'function profileCustomerRelationshipIdentity()',
  'function profileBusinessRelationshipAliases(businessKey, businessName, request)',
  'function syncProfileRelationshipSurfaces(action, detail)',
  'function upsertProfileBusinessCustomerStores(businessKey, businessName, request, now)',
  'function removeProfileBusinessCustomerStores(businessKey, businessName, request)',
  'function setProfileCustomerBusinessFlags(businessKey, businessName, request, active)',
  'window.emyFlushSharedPortContentKeys(keys, "customer-relationship-" + action);',
  'localStorage.setItem("emyCustomerBusiness:" + alias, active ? "1" : "0")',
  'status: "accepted",',
  'customerStatus: "accepted",',
  'relationshipStatus: "accepted",',
  'active: true,',
  'isCustomer: true,',
  'connected: true,',
  'following: true,',
  'setProfileCustomerBusinessFlags(storageKey, name, request, true);',
  'upsertProfileBusinessCustomerStores(storageKey, name, request, now);',
  'removeProfileBusinessCustomerStores(storageKey, name, business);',
  'syncProfileRelationshipSurfaces("request", { key, businessKey:key, name, businessName:name, request });',
  'renderProfileRequests();',
  '"emyCustomerRelationshipRequests"',
  '"emyBusinessCustomers"',
  'String(event.key || "").indexOf("emyBusinessCustomers:") === 0',
];

function assertMarkers(label, text) {
  const missing = markers.filter((marker) => !text.includes(marker));
  if (missing.length) {
    console.error(label + ' is missing request accept sync markers:', missing.join(', '));
    process.exit(1);
  }
}

assertMarkers('Customer profile source', source);
assertMarkers('Generated customer profile runtime', runtime);

console.log(JSON.stringify({
  ok: true,
  requestAcceptSync: 'customer request accept writes customer and business relationship stores',
  sharedStores: ['emyCustomerRelationshipRequests', 'emyCustomerBusinesses', 'emyBusinessCustomers'],
}, null, 2));

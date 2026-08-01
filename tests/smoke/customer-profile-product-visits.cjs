'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const itemDetailSourcePath = path.join(root, 'src', 'generator', 'sections', '18-item-detail-modal-script.cjs');
const customerProfileSourcePath = path.join(root, 'src', 'generator', 'sections', '31-customer-profile-template-parts.cjs');
const customerHomeDetailRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-item-detail.js');
const customerProfileRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-profile-page.js');
const customerProfileHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-profile.html');

const itemDetailSource = fs.readFileSync(itemDetailSourcePath, 'utf8');
const customerProfileSource = fs.readFileSync(customerProfileSourcePath, 'utf8');
const customerHomeDetailRuntime = fs.readFileSync(customerHomeDetailRuntimePath, 'utf8');
const customerProfileRuntime = fs.readFileSync(customerProfileRuntimePath, 'utf8');
const customerProfileHtml = fs.readFileSync(customerProfileHtmlPath, 'utf8');

const recorderMarkers = [
  'function detailWriteCustomerProductVisitHistory(card, details, person, ids, viewedAt)',
  '["emyCustomerProductVisits", "emyProductVisitHistory"].forEach((storageKey) =>',
  'window.dispatchEvent(new CustomEvent("emy:customer-product-visits-changed"',
  'detailWriteCustomerProductVisitHistory(card, details, person, ids, viewedAt);',
  'stats[id] = Object.assign({}, record, metadata, { events: events.slice(), total, lastViewedAt: events[events.length - 1].at });',
];

const profileMarkers = [
  'function previewProductViewStatSources()',
  'const stats = readJson("emyProductViewStats", {});',
  '_sourceKey: "emyProductViewStats"',
  'function previewProductVisitMatchesSelectedCustomer(item)',
  'function previewBusinessProductRowsForContext(context)',
  'function previewBusinessProductIdentitySet(productRows)',
  'function previewProductVisitWithKnownProduct(item, productRows)',
  'function previewProductRangeStart(range)',
  'function previewProductVisitInRange(item, range)',
  'profilePreviewProductRangeButtons.forEach((button) =>',
  'card product-card feed-product-card home-flow-item is-product profile-customer-product',
  'data-profile-product-more',
  'profile-customer-product-time',
  'item._sourceKey === "emyProductViewStats" && matchesKnownProduct',
  'No products visited by this customer yet.',
];

const profileHtmlMarkers = [
  'data-profile-product-range="today"',
  'data-profile-product-range="week"',
  'data-profile-product-range="month"',
  'data-profile-product-range="year"',
];

const missingRecorderSource = recorderMarkers.filter((marker) => !itemDetailSource.includes(marker));
if (missingRecorderSource.length) {
  console.error('Product views are not writing customer visit history:', missingRecorderSource.join(', '));
  process.exit(1);
}

const missingRecorderRuntime = recorderMarkers.filter((marker) => !customerHomeDetailRuntime.includes(marker));
if (missingRecorderRuntime.length) {
  console.error('Generated customer item-detail runtime is missing product visit recording:', missingRecorderRuntime.join(', '));
  process.exit(1);
}

const missingProfileSource = profileMarkers.filter((marker) => !customerProfileSource.includes(marker));
if (missingProfileSource.length) {
  console.error('Customer profile source is missing product visit recovery:', missingProfileSource.join(', '));
  process.exit(1);
}

const missingProfileRuntime = profileMarkers.filter((marker) => !customerProfileRuntime.includes(marker));
if (missingProfileRuntime.length) {
  console.error('Generated customer profile runtime is missing product visit recovery:', missingProfileRuntime.join(', '));
  process.exit(1);
}

const missingProfileHtml = profileHtmlMarkers.filter((marker) => !customerProfileHtml.includes(marker));
if (missingProfileHtml.length) {
  console.error('Generated customer profile HTML is missing product visit date filters:', missingProfileHtml.join(', '));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  productViewRecorder: 'emyCustomerProductVisits + emyProductVisitHistory',
  businessCustomerProfileReads: 'emyProductViewStats fallback resolved to real product cards',
  visitDateFilters: 'today, this week, this month, this year, all time',
}, null, 2));

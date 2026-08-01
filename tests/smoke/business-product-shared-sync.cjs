'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');
const runtime = fs.readFileSync(runtimePath, 'utf8');

function sliceBetween(startNeedle, endNeedle) {
  const start = runtime.indexOf(startNeedle);
  const end = runtime.indexOf(endNeedle, start);
  return start >= 0 && end > start ? runtime.slice(start, end) : '';
}

const helper = sliceBetween('function businessFlushProductSharedContent()', 'function businessPersistProduct');
const renderProducts = sliceBetween('function renderBusinessProductsSection()', 'const businessProductMediaSlotLabels');
const persistProduct = sliceBetween('function businessPersistProduct(payload)', 'function businessDeleteProductById');
const deleteProduct = sliceBetween('function businessDeleteProductById(id)', 'function businessDeleteProductsByIds');
const deleteProducts = sliceBetween('function businessDeleteProductsByIds(ids)', 'function businessSetProductsPausedByIds');
const pauseProducts = sliceBetween('function businessSetProductsPausedByIds(ids, paused)', 'function businessProductStatsStateMap');

if (!helper.includes('window.emyFlushSharedPortContentKeys(businessProductStorageKeys, "replace-business-products-flush")')) {
  console.error('Business products do not use the product-only shared-content flush helper.');
  process.exit(1);
}

if (!helper.includes('businessFlushSharedContentReplace(businessProductStorageKeys)')) {
  console.error('Business product shared flush is missing its local endpoint fallback.');
  process.exit(1);
}

if (!helper.includes('flushed.then((ok)') || !helper.includes('if (!ok) businessFlushSharedContentReplace(businessProductStorageKeys)')) {
  console.error('Business product shared flush does not fall back when the bridge rejects or returns false.');
  process.exit(1);
}

if (renderProducts.includes('businessFlushProductSharedContent') || renderProducts.includes('businessScheduleProductSharedFlush')) {
  console.error('Business product rendering still writes to shared storage, which can create a pull/render/flush loop.');
  process.exit(1);
}

[
  ['save', persistProduct],
  ['delete', deleteProduct],
  ['bulk delete', deleteProducts],
  ['pause/unpause', pauseProducts],
].forEach(([label, source]) => {
  if (!source || !source.includes('businessFlushProductSharedContent();')) {
    console.error(`Business product ${label} does not flush products to shared content.`);
    process.exit(1);
  }
});

console.log(JSON.stringify({
  ok: true,
  page: 'emy-business-profile.html',
  runtime: path.relative(root, runtimePath),
  productSharedFlush: true,
  renderIsReadOnly: true,
}, null, 2));

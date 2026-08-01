'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const htmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-business-profile.html');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');
const productLikeCssPath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-product-mascot-like.css');
const html = fs.readFileSync(htmlPath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');
const productLikeCss = fs.readFileSync(productLikeCssPath, 'utf8');

const requiredStyleMarkers = [
  'body.is-public-customer-shell .public-activity-section .public-business-catalog.is-products',
  'grid-template-columns: repeat(3, minmax(0, 1fr));',
  'scroll-snap-type: none;',
  '.public-products-load-more',
];

const requiredRuntimeMarkers = [
  'const publicBusinessProductsInitialCount = 12;',
  'const publicBusinessProductsBatchCount = 9;',
  'let publicBusinessProductVisibleCount = publicBusinessProductsInitialCount;',
  'function loadMorePublicBusinessProducts()',
  'publicBusinessProductVisibleCount = Math.min(products.length, Math.max(publicBusinessProductsInitialCount, publicBusinessProductVisibleCount) + publicBusinessProductsBatchCount);',
  'const visibleProducts = products.slice(0, visibleCount);',
  'data-public-product-load-more',
  'data-public-load-state',
  'Load 9 more products',
  'Loading products...',
  'No more products',
  'IntersectionObserver',
];

const forbiddenRuntimeMarkers = [
  'if (publicBusinessIsCurrentProfile(profile)) return businessReadProducts().filter((item) => !businessProductIsPaused(item)).slice(0, 12);',
  'if (stored.length) return businessNewest(publicBusinessDedupeRows(stored, "product")).slice(0, 12);',
  'return publicBusinessDedupeRows(rows.filter((item) => item && !businessProductIsPaused(item)), "product").slice(0, 12);',
];

const requiredProductLikeCssMarkers = [
  'body.is-public-customer-shell .public-activity-section .public-business-catalog.is-products > .public-business-product-card.feed-product-card',
  'max-width: none !important;',
  'justify-self: stretch !important;',
];

const missingStyle = requiredStyleMarkers.filter((marker) => !html.includes(marker));
if (missingStyle.length) {
  console.error('Public business Products grid is missing 3-column/load-more styles:', missingStyle.join(', '));
  process.exit(1);
}

const missingRuntime = requiredRuntimeMarkers.filter((marker) => !runtime.includes(marker));
if (missingRuntime.length) {
  console.error('Public business Products grid is missing 12 + 9 runtime behavior:', missingRuntime.join(', '));
  process.exit(1);
}

const forbiddenRuntime = forbiddenRuntimeMarkers.filter((marker) => runtime.includes(marker));
if (forbiddenRuntime.length) {
  console.error('Public business Products grid still caps stored products at 12:', forbiddenRuntime.join(', '));
  process.exit(1);
}

const missingProductLikeCss = requiredProductLikeCssMarkers.filter((marker) => !productLikeCss.includes(marker));
if (missingProductLikeCss.length) {
  console.error('Public business Products grid is still blocked by the shared 226px product-card cap:', missingProductLikeCss.join(', '));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  page: 'emy-business-profile.html',
  startsWithProducts: 12,
  loadsMoreProductsBy: 9,
  customerFacingProductsOnly: true,
}, null, 2));

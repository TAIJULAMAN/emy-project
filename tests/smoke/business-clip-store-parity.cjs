'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const files = {
  customerHome: path.join(root, 'src', 'generator', 'sections', '27-customer-home-template-parts.cjs'),
  businessProfile: path.join(root, 'src', 'generator', 'sections', '26-business-profile-template-parts.cjs'),
  search: path.join(root, 'src', 'generator', 'sections', '29-customer-search-template-parts.cjs'),
  itemDetail: path.join(root, 'src', 'generator', 'sections', '18-item-detail-modal-script.cjs'),
  media: path.join(root, 'src', 'generator', 'sections', '15-media-runtimes.cjs'),
  edit: path.join(root, 'src', 'generator', 'sections', '17-feed-edit-runtime.cjs'),
  realGuard: path.join(root, 'src', 'generator', 'asset-sources', 'emy-real-data-guard.js'),
  sharedBridge: path.join(root, 'src', 'generator', 'asset-sources', 'emy-shared-port-content.js'),
};

function read(name) {
  return fs.readFileSync(files[name], 'utf8');
}

function assertContains(label, text, marker) {
  if (!text.includes(marker)) {
    console.error(`${label} missing marker: ${marker}`);
    process.exit(1);
  }
}

function assertNotContains(label, text, marker) {
  if (text.includes(marker)) {
    console.error(`${label} still contains forbidden marker: ${marker}`);
    process.exit(1);
  }
}

const customerHome = read('customerHome');
const businessProfile = read('businessProfile');
const search = read('search');
const itemDetail = read('itemDetail');
const media = read('media');
const edit = read('edit');
const realGuard = read('realGuard');
const sharedBridge = read('sharedBridge');

[
  ['customer home clips', customerHome, '["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"].forEach((storageKey) => {'],
  ['customer home preview', customerHome, '["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips", "emyBusinessProductPosts", "emyFeedCreatedPosts"], "reels"'],
  ['business clips', businessProfile, '["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips", "emyFeedCreatedPosts"].forEach((sourceKey) => {'],
  ['public business clips', businessProfile, '["emyBusinessReels", "emyBusinessClips", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"].flatMap'],
  ['business delete clips', businessProfile, 'const clipKeys = ["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips", "emyFeedCreatedPosts"];'],
  ['search clips', search, '["emyBusinessReels", "emyBusinessClips", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"].flatMap'],
  ['detail preview clips', itemDetail, '["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips", "emyBusinessProductPosts", "emyFeedCreatedPosts"], "reels"'],
  ['detail clip stats', itemDetail, '["emyFeedCreatedClipsByBusiness", 30]'],
  ['media migration clips', media, '"emyFeedCreatedClipsByBusiness"'],
  ['edit delete clips', edit, '["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"]'],
  ['real guard clip stores', realGuard, 'const publicBusinessClipStorageKeys = new Set(["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"]);'],
  ['shared bridge clips', sharedBridge, '"emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"'],
].forEach(([label, text, marker]) => assertContains(label, text, marker));

assertNotContains('customer home saved business matching', customerHome, 'if (!homeCustomerBusinessRecordHasUsableLocation(item, storageKey)) return;');
assertNotContains('customer home saved business matching', customerHome, 'if (typeof homeCustomerBusinessRecordHasUsableLocation === "function" && !homeCustomerBusinessRecordHasUsableLocation(row, storageKey)) return;');
assertNotContains('customer home saved business matching', customerHome, 'if (typeof homeCustomerBusinessRecordHasUsableLocation === "function" && !homeCustomerBusinessRecordHasUsableLocation(entry, primaryKey)) return;');

console.log(JSON.stringify({
  ok: true,
  businessClipStoreParity: true,
  followedBusinessesDoNotRequireLocation: true,
  clipStores: [
    'emyBusinessClips',
    'emyBusinessReels',
    'emyBusinessProductReels',
    'emyFeedCreatedClips',
    'emyFeedCreatedClipsByBusiness',
    'emyUploadedClips'
  ],
}, null, 2));

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..', '..');
const homeSourcePath = path.join(root, 'src', 'generator', 'asset-sources', 'emy-customer-home-page.js');
const homeRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-page.js');
const templatePath = path.join(root, 'src', 'generator', 'sections', '27-customer-home-template-parts.cjs');
const feedCreateSourcePath = path.join(root, 'src', 'generator', 'asset-sources', 'emy-customer-home-feed-create.js');
const feedCreateRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-feed-create.js');
const feedCreateSectionPath = path.join(root, 'src', 'generator', 'sections', '14-feed-create-flow-script.cjs');
const bootstrapSourcePath = path.join(root, 'src', 'generator', 'asset-sources', 'emy-customer-home-create-bootstrap.js');
const bootstrapRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-create-bootstrap.js');
const htmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-home.html');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function assertContains(label, text, needle) {
  if (!text.includes(needle)) {
    console.error(`${label}: missing ${needle}`);
    process.exit(1);
  }
}

function extractedRuntimeHash(text) {
  return crypto.createHash('sha256').update(String(text || '').replace(/\r?\n$/, '')).digest('hex').slice(0, 12);
}

function assertInlinePostCapture(label, text) {
  assertContains(label, text, 'function handleAnnexedFeedComposePostClick(event)');
  assertContains(label, text, 'target.closest("[data-feed-compose-post]")');
  assertContains(label, text, 'window.__EMY_FEED_COMPOSE_POST_CAPTURE_BOUND__');
  assertContains(label, text, 'document.addEventListener("click", handleAnnexedFeedComposePostClick, true);');
  assertContains(label, text, 'scheduleAnnexedFeedPost(event);');
  assertContains(label, text, 'persistAnnexedInlineFeedItem(feedItem)');
}

function assertModalPostCapture(label, text) {
  assertContains(label, text, 'function handleFeedCreatePostSubmitClick(event)');
  assertContains(label, text, 'target.closest("[data-feed-post-submit]")');
  assertContains(label, text, 'window.__EMY_FEED_CREATE_POST_SUBMIT_CAPTURE_BOUND__');
  assertContains(label, text, 'document.addEventListener("click", handleFeedCreatePostSubmitClick, true);');
  assertContains(label, text, 'scheduleSubmitPost(event);');
  assertContains(label, text, 'publishFeedCreatedItem(kind, title, bodyText');
}

const homeSource = read(homeSourcePath);
const homeRuntime = read(homeRuntimePath);
const template = read(templatePath);
const feedCreateSource = read(feedCreateSourcePath);
const feedCreateRuntime = read(feedCreateRuntimePath);
const feedCreateSection = read(feedCreateSectionPath);
const bootstrapSource = read(bootstrapSourcePath);
const bootstrapRuntime = read(bootstrapRuntimePath);
const html = read(htmlPath);
const homeRuntimeHash = extractedRuntimeHash(homeSource);
const bootstrapRuntimeHash = crypto.createHash('sha256').update(bootstrapRuntime).digest('hex').slice(0, 12);

assertInlinePostCapture('home source', homeSource);
assertInlinePostCapture('home runtime', homeRuntime);
assertInlinePostCapture('home template', template);
assertModalPostCapture('feed create source', feedCreateSource);
assertModalPostCapture('feed create runtime', feedCreateRuntime);
assertModalPostCapture('feed create section', feedCreateSection);
assertContains('bootstrap source', bootstrapSource, 'assets/emy-customer-home-feed-create.js?v=post-click-submit-280001');
assertContains('bootstrap runtime', bootstrapRuntime, 'assets/emy-customer-home-feed-create.js?v=post-click-submit-280001');
assertContains('linked html', html, `assets/emy-customer-home-page.js?v=${homeRuntimeHash}`);
assertContains('linked html', html, `assets/emy-customer-home-create-bootstrap.js?v=${bootstrapRuntimeHash}`);

console.log(JSON.stringify({
  ok: true,
  page: 'emy-customer-home.html',
  inlineFeedsPostClickUsesCaptureHandler: true,
  modalPostClickUsesCaptureHandler: true,
  lazyCreateScriptCacheBusted: true,
}, null, 2));

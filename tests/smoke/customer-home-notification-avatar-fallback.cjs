'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'asset-sources', 'emy-customer-home-page.js');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-page.js');
const templatePath = path.join(root, 'src', 'generator', 'sections', '27-customer-home-template-parts.cjs');
const htmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-home.html');
const patcherPath = path.join(root, 'src', 'generator', 'sections', '02c-customer-home-notifications.cjs');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function assertContains(label, text, needle) {
  if (!text.includes(needle)) {
    console.error(`${label}: missing ${needle}`);
    process.exit(1);
  }
}

function assertRuntimeFallback(label, text) {
  assertContains(label, text, 'function restoreNotificationImageFallback');
  assertContains(label, text, 'function hydrateNotificationImageFallbacks');
  assertContains(label, text, 'data-notification-fallback');
  assertContains(label, text, 'node.addEventListener("error", () => restoreNotificationImageFallback(node), { once: true });');
  assertContains(label, text, 'if (node.complete && !node.naturalWidth) restoreNotificationImageFallback(node);');
  assertContains(label, text, 'hydrateNotificationImageFallbacks(notificationList);');
  assertContains(label, text, 'const requestName = source.match(');
  assertContains(label, text, 'requested');
}

function assertCssFallback(label, text) {
  assertContains(label, text, '.notification-avatar.is-fallback');
  assertContains(label, text, 'background: #f5f7fb;');
}

const source = read(sourcePath);
const runtime = read(runtimePath);
const template = read(templatePath);
const html = read(htmlPath);
const patcher = read(patcherPath);

assertRuntimeFallback('asset source', source);
assertRuntimeFallback('linked runtime', runtime);
assertRuntimeFallback('home template', template);
assertCssFallback('home template css', template);
assertCssFallback('linked html css', html);
assertContains('notification patcher', patcher, 'function restoreNotificationImageFallback');
assertContains('notification patcher', patcher, 'hydrateNotificationImageFallbacks(notificationList);');

console.log(JSON.stringify({
  ok: true,
  page: 'emy-customer-home.html',
  notificationAvatarBrokenImagesFallBack: true,
  generatedAndLinkedPagesCovered: true,
}, null, 2));

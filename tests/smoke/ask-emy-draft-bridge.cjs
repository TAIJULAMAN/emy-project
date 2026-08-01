'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function maybeRead(relativePath) {
  const fullPath = path.join(root, relativePath);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf8') : '';
}

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

function assertContains(label, source, marker) {
  assert(String(source || '').includes(marker), `${label}: missing ${marker}`);
}

function assertNotContains(label, source, marker) {
  assert(!String(source || '').includes(marker), `${label}: forbidden ${marker}`);
}

const askGenerator = read('src/generator/sections/20-transform-react-page.cjs');
const businessGenerator = read('src/generator/sections/26-business-profile-template-parts.cjs');
const generatedAsk = [
  maybeRead('linked-pages/restore-may20/ask-emy-results.html'),
  maybeRead('linked-pages/restore-may20/assets/ask-emy-results-page.js'),
].join('\n');
const generatedBusiness = maybeRead('linked-pages/restore-may20/emy-business-profile.html');
const generatedBusinessRuntime = maybeRead('linked-pages/restore-may20/assets/emy-business-profile-page.js');
const customerFeedCreate = [
  read('src/generator/sections/14-feed-create-flow-script.cjs'),
  maybeRead('linked-pages/restore-may20/assets/emy-customer-home-feed-create.js'),
].join('\n');

[
  ['Ask EMY generator', askGenerator],
  ['generated Ask EMY results', generatedAsk],
].forEach(([label, source]) => {
  if (!source) return;
  assertContains(label, source, 'function askActionRealFormUrl(action)');
  assertContains(label, source, 'askDraft=product');
  assertContains(label, source, 'askDraft=job');
  assertContains(label, source, 'askDraft=post');
  assertContains(label, source, 'askDraft=event');
  assertContains(label, source, 'askDraft=clip');
  assertContains(label, source, 'askDraft=business');
  assertContains(label, source, 'askDraft=service');
  assertContains(label, source, 'mode=business&tab=posts&askDraft=job');
  assertContains(label, source, 'mode=business&tab=posts&askDraft=post');
  assertContains(label, source, 'mode=business&tab=posts&askDraft=event');
  assertContains(label, source, 'mode=business&tab=reels&askDraft=clip');
  assertContains(label, source, 'setup=1&askDraft=business');
  assertContains(label, source, 'setup=1&askDraft=service');
  assertContains(label, source, 'Open real EMY form');
  assertContains(label, source, 'askActionOpenRealForm(cleanAction, prepareDraft)');
});

[
  ['business profile generator', businessGenerator],
  ['generated business profile runtime', generatedBusinessRuntime],
].forEach(([label, source]) => {
  if (!source) return;
  assertContains(label, source, 'function businessReadAskActionDraft(target)');
  assertContains(label, source, 'function businessProductFromAskActionDraft(draft)');
  assertContains(label, source, 'function openBusinessProductEditorFromAskActionDraft()');
  assertContains(label, source, 'function openBusinessProductCreateEditor()');
  assertContains(label, source, 'function businessHiringDraftFromAskActionDraft(draft)');
  assertContains(label, source, 'function openBusinessHiringFromAskActionDraft()');
  assertContains(label, source, 'function openBusinessHiringCreateEditor()');
  assertContains(label, source, 'function businessPostTextFromAskActionDraft(draft)');
  assertContains(label, source, 'function openBusinessPostFromAskActionDraft()');
  assertContains(label, source, 'function openBusinessPostCreateEditor()');
  assertContains(label, source, 'function businessApplyEventAskActionDraft(draft)');
  assertContains(label, source, 'function openBusinessEventFromAskActionDraft()');
  assertContains(label, source, 'function openBusinessEventCreateEditor()');
  assertContains(label, source, 'function businessClipPickerOptionsFromAskActionDraft(draft)');
  assertContains(label, source, 'function openBusinessClipFromAskActionDraft()');
  assertContains(label, source, 'function businessProfileDraftFromAskActionDraft(draft)');
  assertContains(label, source, 'function applyBusinessProfileAskActionDraftFromQuery()');
  assertContains(label, source, 'function businessServiceProviderDraftFromAskActionDraft(draft)');
  assertContains(label, source, 'function applyBusinessServiceAskActionDraftFromQuery()');
  assertContains(label, source, 'window.emyOpenFeedClipFramePicker');
  assertContains(label, source, 'emyAskActionDraft:');
  assertContains(label, source, 'emyAskActionLatestDraft');
  assertContains(label, source, 'emy-business-profile.html?mode=business&tab=products');
  assertContains(label, source, 'businessAskActionDraftTarget(params.get("askDraft")) === "product"');
  assertContains(label, source, 'businessAskActionDraftTarget(params.get("askDraft")) === "job"');
  assertContains(label, source, 'businessAskActionDraftTarget(params.get("askDraft")) === "post"');
  assertContains(label, source, 'businessAskActionDraftTarget(params.get("askDraft")) === "event"');
  assertContains(label, source, 'businessAskActionDraftTarget(params.get("askDraft")) === "clip"');
  assertContains(label, source, 'businessAskActionDraftTarget(params.get("askDraft")) !== "business"');
  assertContains(label, source, 'businessAskActionDraftTarget(params.get("askDraft")) !== "service"');
});

const bridgeFunction = businessGenerator.match(/function openBusinessProductEditorFromAskActionDraft\(\) \{[\s\S]*?\n        \}/);
assert(bridgeFunction, 'business profile generator: missing openBusinessProductEditorFromAskActionDraft body');
assertContains('product draft bridge', bridgeFunction[0], 'openBusinessProductEditor(product)');
assertContains('product draft bridge', bridgeFunction[0], 'businessClearAskActionDraft("product", draft)');
assertNotContains('product draft bridge', bridgeFunction[0], 'saveBusinessProductFromForm');
assertNotContains('product draft bridge', bridgeFunction[0], 'businessPersistProduct');

const jobBridgeFunction = businessGenerator.match(/function openBusinessHiringFromAskActionDraft\(\) \{[\s\S]*?\n        \}/);
assert(jobBridgeFunction, 'business profile generator: missing openBusinessHiringFromAskActionDraft body');
assertContains('job draft bridge', jobBridgeFunction[0], 'setHiringComposeOpen(true)');
assertContains('job draft bridge', jobBridgeFunction[0], 'restoreHiringDraftToForm(hiringDraft)');
assertContains('job draft bridge', jobBridgeFunction[0], 'businessClearAskActionDraft("job", draft)');
assertNotContains('job draft bridge', jobBridgeFunction[0], 'publishHiringPost');
assertNotContains('job draft bridge', jobBridgeFunction[0], 'businessPersistCreated');

const postBridgeFunction = businessGenerator.match(/function openBusinessPostFromAskActionDraft\(\) \{[\s\S]*?\n        \}/);
assert(postBridgeFunction, 'business profile generator: missing openBusinessPostFromAskActionDraft body');
assertContains('post draft bridge', postBridgeFunction[0], 'setPostComposeOpen(true)');
assertContains('post draft bridge', postBridgeFunction[0], 'postComposeText.value = text');
assertContains('post draft bridge', postBridgeFunction[0], 'businessClearAskActionDraft("post", draft)');
assertNotContains('post draft bridge', postBridgeFunction[0], 'businessPersistCreated');

const eventBridgeFunction = businessGenerator.match(/function openBusinessEventFromAskActionDraft\(\) \{[\s\S]*?\n        \}/);
assert(eventBridgeFunction, 'business profile generator: missing openBusinessEventFromAskActionDraft body');
assertContains('event draft bridge', eventBridgeFunction[0], 'businessApplyEventAskActionDraft(draft)');
assertContains('event draft bridge', eventBridgeFunction[0], 'businessClearAskActionDraft("event", draft)');
assertNotContains('event draft bridge', eventBridgeFunction[0], 'businessPersistCreated');

const clipBridgeFunction = businessGenerator.match(/function openBusinessClipFromAskActionDraft\(\) \{[\s\S]*?\n        \}/);
assert(clipBridgeFunction, 'business profile generator: missing openBusinessClipFromAskActionDraft body');
assertContains('clip draft bridge', clipBridgeFunction[0], 'openBusinessCreateClip(businessClipPickerOptionsFromAskActionDraft(draft))');
assertContains('clip draft bridge', clipBridgeFunction[0], 'businessClearAskActionDraft("clip", draft)');
assertNotContains('clip draft bridge', clipBridgeFunction[0], 'businessPersistCreated');
assertNotContains('clip draft bridge', clipBridgeFunction[0], 'businessPersistCreatedClip');

const businessBridgeFunction = businessGenerator.match(/function applyBusinessProfileAskActionDraftFromQuery\(\) \{[\s\S]*?\n        \}/);
assert(businessBridgeFunction, 'business profile generator: missing applyBusinessProfileAskActionDraftFromQuery body');
assertContains('business profile draft bridge', businessBridgeFunction[0], 'businessReadAskActionDraft("business")');
assertContains('business profile draft bridge', businessBridgeFunction[0], 'businessProfileDraftFromAskActionDraft(draft)');
assertContains('business profile draft bridge', businessBridgeFunction[0], 'saveBusinessProfileDraftCache(profileDraft)');
assertContains('business profile draft bridge', businessBridgeFunction[0], 'businessClearAskActionDraft("business", draft)');
assertNotContains('business profile draft bridge', businessBridgeFunction[0], 'document.querySelector("[data-form]").submit');

const serviceBridgeFunction = businessGenerator.match(/function applyBusinessServiceAskActionDraftFromQuery\(\) \{[\s\S]*?\n        \}/);
assert(serviceBridgeFunction, 'business profile generator: missing applyBusinessServiceAskActionDraftFromQuery body');
assertContains('business service draft bridge', serviceBridgeFunction[0], 'businessReadAskActionDraft("service")');
assertContains('business service draft bridge', serviceBridgeFunction[0], 'businessServiceProviderDraftFromAskActionDraft(draft)');
assertContains('business service draft bridge', serviceBridgeFunction[0], 'saveBusinessProfileDraftCache(profileDraft)');
assertContains('business service draft bridge', serviceBridgeFunction[0], 'businessClearAskActionDraft("service", draft)');
assertNotContains('business service draft bridge', serviceBridgeFunction[0], 'document.querySelector("[data-form]").submit');

assertContains('customer feed draft bridge', customerFeedCreate, 'function feedCreateApplyAskActionDraftFromQuery()');
assertContains('customer feed draft bridge', customerFeedCreate, 'feedCreateActorRole() !== "customer"');
assertContains('customer feed draft bridge', customerFeedCreate, 'window.emyOpenFeedCreateChoice(feedCreateAskDraftChoice(target), draft || {}, null)');
assertContains('customer feed draft bridge', customerFeedCreate, 'function emyOpenFeedCreateChoice(choice, draft, event)');
assertContains('customer feed draft bridge', customerFeedCreate, 'return feedEditOpenPost(null, draft, { event });');
assertContains('customer feed draft bridge', customerFeedCreate, 'feedCreateClearAskActionDraft(target, draft.askDraft)');

console.log(JSON.stringify({
  ok: true,
  askDraftBridge: true,
  generatedChecked: Boolean(generatedAsk && generatedBusiness && generatedBusinessRuntime),
}, null, 2));

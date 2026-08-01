'use strict';

const {
  EMY_ACTION_CATALOG,
  normalizeActionText,
  detectActionMode,
  detectActionTarget,
  resolveEmyAction,
  assertNoAdminActionUrls,
} = require('../../src/ask-emy/action-catalog.cjs');
const { planAskEmyMessage } = require('../../src/ask-emy/brain-planner.cjs');
const { routeAskEmyMessage } = require('../../src/ask-emy/tool-router.cjs');

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

function expectObject(label, actual, expected) {
  Object.entries(expected).forEach(([key, value]) => {
    const current = key.includes('.') ? key.split('.').reduce((target, part) => target && target[part], actual) : actual[key];
    assert(current === value, `${label}: expected ${key}=${value}, got ${current}`);
  });
}

assertNoAdminActionUrls();
assert(Object.keys(EMY_ACTION_CATALOG).length >= 8, 'catalog should cover core EMY action targets');
assert(normalizeActionText('how do I add my porudcts?') === 'how do i add my products?', 'normalizes action typos');
assert(detectActionMode('how do I create products here?') === 'create', 'detects create mode from help phrasing');
assert(detectActionMode('open job here') === 'open', 'detects open mode');
assert(detectActionTarget('show customer profile') === 'profile', 'prefers customer profile over business profile');
assert(detectActionTarget('open clip here') === 'clip', 'detects clip target');

expectObject('create product action', resolveEmyAction('can you create products for me?'), {
  intent: 'emy_action',
  mode: 'create',
  target: 'product',
  scope: 'business',
  toolHint: 'createDraft',
  responseType: 'draft_preview',
  cardsAllowed: false,
  requiresConfirmation: true,
});

expectObject('create customer post action', resolveEmyAction('I want to create a post as a customer'), {
  intent: 'emy_action',
  mode: 'create',
  target: 'post',
  scope: 'customer',
  url: 'emy-customer-home.html?tab=feeds&askDraft=post#feeds',
  toolHint: 'createDraft',
  responseType: 'draft_preview',
  cardsAllowed: false,
  requiresConfirmation: true,
});

expectObject('create business post action', resolveEmyAction('I want to create a post for my business'), {
  intent: 'emy_action',
  mode: 'create',
  target: 'post',
  scope: 'business',
  url: 'emy-business-profile.html?tab=posts&create=post',
  toolHint: 'createDraft',
  responseType: 'draft_preview',
});

expectObject('open product action', resolveEmyAction('open product here'), {
  intent: 'emy_action',
  mode: 'open',
  target: 'product',
  toolHint: 'openInlineView',
  responseType: 'inline_product_view',
  cardsAllowed: true,
  usesExistingView: true,
});

expectObject('open job action', resolveEmyAction('open job here'), {
  intent: 'emy_action',
  mode: 'open',
  target: 'job',
  toolHint: 'openInlineView',
  responseType: 'inline_job_view',
  cardsAllowed: true,
  usesExistingView: true,
});

expectObject('create job plan', planAskEmyMessage('create a job post'), {
  intent: 'CREATE_DRAFT',
  actionTarget: 'job',
  actionScope: 'business',
  actionMode: 'create',
  responseType: 'draft_preview',
  recordCardsAllowed: false,
  toolHint: 'createDraft',
});

expectObject('create customer post plan', planAskEmyMessage('I want to create a post as a customer'), {
  intent: 'CREATE_DRAFT',
  actionTarget: 'post',
  actionScope: 'customer',
  actionUrl: 'emy-customer-home.html?tab=feeds&askDraft=post#feeds',
  actionMode: 'create',
  responseType: 'draft_preview',
  recordCardsAllowed: false,
  toolHint: 'createDraft',
});

expectObject('how to create product plan', planAskEmyMessage('how do I create products here?'), {
  intent: 'CREATE_DRAFT',
  actionTarget: 'product',
  actionMode: 'create',
  responseType: 'draft_preview',
  recordCardsAllowed: false,
  toolHint: 'createDraft',
});

expectObject('open product route', routeAskEmyMessage('open product here'), {
  intent: 'OPEN_ITEM',
  actionTarget: 'product',
  responseType: 'inline_product_view',
  recordCardsAllowed: true,
  'tool.name': 'openInlineView',
  'tool.usesExistingView': true,
});

expectObject('open job route', routeAskEmyMessage('open job here'), {
  intent: 'OPEN_ITEM',
  actionTarget: 'job',
  responseType: 'inline_job_view',
  recordCardsAllowed: true,
  'tool.name': 'openInlineView',
  'tool.usesExistingView': true,
});

expectObject('open clip route', routeAskEmyMessage('open clip here'), {
  intent: 'OPEN_ITEM',
  actionTarget: 'clip',
  responseType: 'inline_clip_view',
  recordCardsAllowed: true,
  'tool.name': 'openInlineView',
});

expectObject('open post route', routeAskEmyMessage('open post here'), {
  intent: 'OPEN_ITEM',
  actionTarget: 'post',
  responseType: 'inline_post_view',
  recordCardsAllowed: true,
  'tool.name': 'openInlineView',
});

expectObject('nearby products remain search', routeAskEmyMessage('show products near SL0 9BU'), {
  intent: 'SEARCH_NEARBY',
  toolHint: 'searchNearby',
  responseType: 'small_result_list',
  locationSearchAllowed: true,
});

expectObject('identity remains identity', routeAskEmyMessage('who am I?'), {
  intent: 'IDENTITY',
  toolHint: 'getViewerAccount',
  recordCardsAllowed: false,
});

console.log(JSON.stringify({
  ok: true,
  actionCatalog: true,
  targets: Object.keys(EMY_ACTION_CATALOG).length,
}, null, 2));

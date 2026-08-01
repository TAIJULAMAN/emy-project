'use strict';

const {
  RESPONSE_TYPES,
  EVALUATION_PROMPTS,
} = require('../../src/ask-emy/assistant-contract.cjs');
const { planAskEmyMessage } = require('../../src/ask-emy/brain-planner.cjs');
const {
  ASK_EMY_TOOL_REGISTRY,
  getAskEmyTool,
  routeAskEmyTool,
  assertAskEmyToolSafe,
} = require('../../src/ask-emy/tool-registry.cjs');
const { routeAskEmyMessage } = require('../../src/ask-emy/tool-router.cjs');

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const responseTypes = new Set(RESPONSE_TYPES);
const tools = Object.values(ASK_EMY_TOOL_REGISTRY);

assert(tools.length >= 12, 'tool registry should cover the current assistant tool hints');

tools.forEach((tool) => {
  assertAskEmyToolSafe(tool);
  assert(responseTypes.has(tool.responseType), `${tool.name}: unknown response type ${tool.responseType}`);
  assert(tool.permission !== 'admin', `${tool.name}: admin tool must not be user-facing`);
  assert(!String(tool.dataSource).includes('emy-admin-backend'), `${tool.name}: must not expose admin backend`);
});

[
  'hi',
  'who am I?',
  'tell me about my account',
  'can you see my llocation as a customer?',
  'what do I do?',
  "tell me what's new on EMY",
  'daily update',
  'show my customer content',
  "if I'm the customer how many posts do I have?",
  'show me all my porudcts',
  'show products',
  'show me the product most viewd',
  'I asked the product not products',
  'show my stats',
  'top 5 products by views',
  'shops near me',
  'create a product for me',
  'open it here',
  'compare my businesses',
  'show me my customer card',
  'show me both my customer and business profiles',
  'show me all my businesses cards',
  'show me all my customers cards',
  'show me my clip videos',
  'show me media previews',
].forEach((prompt) => {
  const plan = planAskEmyMessage(prompt, prompt.includes('asked the product') ? { previousIntent: 'PRODUCT_SINGLE_METRIC' } : {});
  assert(getAskEmyTool(plan.toolHint), `${prompt}: planner tool hint is not registered: ${plan.toolHint}`);
});

EVALUATION_PROMPTS.forEach((prompt) => {
  const plan = planAskEmyMessage(prompt, prompt.includes('asked the product') ? { previousIntent: 'PRODUCT_SINGLE_METRIC' } : {});
  assert(getAskEmyTool(plan.toolHint), `evaluation prompt "${prompt}" has unknown tool hint ${plan.toolHint}`);
});

function expectRoute(query, expected, context = {}) {
  const route = routeAskEmyMessage(query, context);
  Object.entries(expected).forEach(([key, value]) => {
    const actual = key.includes('.') ? key.split('.').reduce((target, part) => target && target[part], route) : route[key];
    assert(actual === value, `${query}: expected ${key}=${value}, got ${actual}`);
  });
  return route;
}

expectRoute('who am I?', {
  intent: 'IDENTITY',
  'tool.name': 'getViewerAccount',
  'tool.permission': 'viewer',
  recordCardsAllowed: false,
  locationSearchAllowed: false,
});

expectRoute('can you see my llocation as a customer?', {
  intent: 'VIEWER_LOCATION',
  'tool.name': 'getViewerLocation',
  recordCardsAllowed: false,
  locationSearchAllowed: false,
});

expectRoute('show me all my porudcts', {
  intent: 'PRODUCT_LIST',
  'tool.name': 'getOwnedProducts',
  'tool.permission': 'business-owner',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute("tell me what's new on EMY", {
  intent: 'DAILY_UPDATE',
  'tool.name': 'getDailyEmyUpdate',
  'tool.permission': 'viewer',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('daily update', {
  intent: 'DAILY_UPDATE',
  'tool.name': 'getDailyEmyUpdate',
  'tool.permission': 'viewer',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('show me my clips', {
  intent: 'CLIP_LIST',
  'tool.name': 'getOwnedClips',
  'tool.permission': 'business-owner',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('show me my posts', {
  intent: 'POST_LIST',
  'tool.name': 'getOwnedPosts',
  'tool.permission': 'business-owner',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('show my business articles', {
  intent: 'ARTICLE_LIST',
  'tool.name': 'getOwnedArticles',
  'tool.permission': 'business-owner',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('show me all posts', {
  intent: 'POST_SEARCH',
  'tool.name': 'searchNearby',
  'tool.permission': 'public',
  recordCardsAllowed: true,
  locationSearchAllowed: true,
});

expectRoute('show clips', {
  intent: 'CLIP_SEARCH',
  'tool.name': 'searchNearby',
  'tool.permission': 'public',
  recordCardsAllowed: true,
  locationSearchAllowed: true,
});

expectRoute('show me my business card', {
  intent: 'BUSINESS_PROFILE',
  'tool.name': 'getOwnedBusinessCard',
  'tool.permission': 'business-owner',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('can I see my business account?', {
  intent: 'BUSINESS_PROFILE',
  'tool.name': 'getOwnedBusinessCard',
  'tool.permission': 'business-owner',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('can I see my bsuniess account?', {
  intent: 'BUSINESS_PROFILE',
  'tool.name': 'getOwnedBusinessCard',
  'tool.permission': 'business-owner',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('can I see my customer profile?', {
  intent: 'CUSTOMER_PROFILE',
  'tool.name': 'getCustomerProfileCard',
  'tool.permission': 'viewer',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('show me my customer card', {
  intent: 'CUSTOMER_PROFILE',
  'tool.name': 'getCustomerProfileCard',
  'tool.permission': 'viewer',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('show me both my customer and business profiles', {
  intent: 'PROFILE_CARDS',
  'tool.name': 'getViewerProfileCards',
  'tool.permission': 'viewer',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('show me all my businesses cards', {
  intent: 'BUSINESS_PROFILE_LIST',
  'tool.name': 'getOwnedBusinessCards',
  'tool.permission': 'business-owner',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('show me all my customers cards', {
  intent: 'BUSINESS_CUSTOMERS',
  'tool.name': 'getBusinessCustomersAnalytics',
  'tool.permission': 'business-owner',
  responseType: 'analytics_chart',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('show me my clip videos', {
  intent: 'MEDIA_PREVIEW',
  'tool.name': 'getMediaPreview',
  'tool.permission': 'viewer',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('show me media previews', {
  intent: 'MEDIA_PREVIEW',
  'tool.name': 'getMediaPreview',
  'tool.permission': 'viewer',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('show my customer content', {
  intent: 'CUSTOMER_SELF_CONTENT',
  'tool.name': 'getCustomerSelfContent',
  'tool.permission': 'viewer',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute("if I'm the customer how many posts do I have?", {
  intent: 'CUSTOMER_SELF_CONTENT',
  'tool.name': 'getCustomerSelfContent',
  'tool.permission': 'viewer',
  responseType: 'chat_answer',
  recordCardsAllowed: false,
  locationSearchAllowed: false,
});

expectRoute('show products', {
  intent: 'PRODUCT_SEARCH',
  'tool.name': 'searchProducts',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
});

expectRoute('show me the product most viewd', {
  intent: 'PRODUCT_SINGLE_METRIC',
  'tool.name': 'getMostViewedProduct',
  responseType: 'inline_product_view',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
  'tool.usesExistingView': true,
});

expectRoute('top 5 products by views', {
  intent: 'PRODUCT_LIST_METRIC',
  'tool.name': 'getTopProductsAnalytics',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  locationSearchAllowed: false,
});

expectRoute('Can you compare products from clips views?', {
  intent: 'CROSS_ENTITY_ANALYTICS',
  'tool.name': 'compareContentViews',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  locationSearchAllowed: false,
});

expectRoute('what has more views producs or clips?', {
  intent: 'CROSS_ENTITY_ANALYTICS',
  'tool.name': 'compareContentViews',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  locationSearchAllowed: false,
});

expectRoute('what has more views producs orpost?', {
  intent: 'CROSS_ENTITY_ANALYTICS',
  'tool.name': 'compareContentViews',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  locationSearchAllowed: false,
});

expectRoute('what has more comments products or posts?', {
  intent: 'CROSS_ENTITY_ANALYTICS',
  'tool.name': 'compareContentViews',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  locationSearchAllowed: false,
});

expectRoute('show my stats', {
  intent: 'BUSINESS_ANALYTICS',
  'tool.name': 'getBusinessStatsOverview',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  locationSearchAllowed: false,
});

expectRoute('compare my businesses by profile views', {
  intent: 'BUSINESS_COMPARISON',
  'tool.name': 'getMultiBusinessComparison',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  locationSearchAllowed: false,
});

expectRoute('show jobs by applications', {
  intent: 'BUSINESS_ANALYTICS',
  'tool.name': 'getBusinessStatsOverview',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  locationSearchAllowed: false,
});

expectRoute('shops near me', {
  intent: 'SEARCH_NEARBY',
  'tool.name': 'searchNearby',
  recordCardsAllowed: true,
  locationSearchAllowed: true,
});

expectRoute('create a product for me', {
  intent: 'CREATE_DRAFT',
  'tool.name': 'createDraft',
  recordCardsAllowed: false,
  requiresConfirmation: true,
});

const productAnalyticsPlan = planAskEmyMessage('show me the product most viewed');
const productAnalyticsRoute = routeAskEmyTool(productAnalyticsPlan);
assert(productAnalyticsRoute.toolName === 'getMostViewedProduct', 'single product metric should route to getMostViewedProduct');
assert(productAnalyticsRoute.locationSearchAllowed === false, 'single product metric must not allow location search');

console.log(JSON.stringify({
  ok: true,
  toolRegistry: true,
  tools: tools.length,
  evaluationPromptsChecked: EVALUATION_PROMPTS.length,
}, null, 2));

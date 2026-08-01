'use strict';

const { planAskEmyMessage, normalizeCommandText } = require('../../src/ask-emy/brain-planner.cjs');

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

function expectPlan(query, expected, context = {}) {
  const plan = planAskEmyMessage(query, context);
  Object.entries(expected).forEach(([key, value]) => {
    assert(plan[key] === value, `${query}: expected ${key}=${value}, got ${plan[key]}`);
  });
  return plan;
}

assert(normalizeCommandText('show my porudcts') === 'show my products', 'normalizes porudcts typo');
assert(normalizeCommandText('what has more views producs or clips?') === 'what has more views products or clips?', 'normalizes producs typo');
assert(normalizeCommandText('what has more views producs orpost?') === 'what has more views products or post?', 'normalizes no-space orpost typo');
assert(normalizeCommandText('can you see my llocation?') === 'can you see my location?', 'normalizes llocation typo');
assert(normalizeCommandText('graophts?') === 'graphs?', 'normalizes graph typo');
assert(normalizeCommandText('anylitic statistics') === 'analytic statistics', 'normalizes analytic typo');
assert(normalizeCommandText('shw me my profile') === 'show me my profile', 'normalizes shw typo');
assert(normalizeCommandText('shoe me my customer card') === 'show me my customer card', 'normalizes shoe me command typo');
assert(normalizeCommandText('show me my businiess card') === 'show me my business card', 'normalizes businiess typo');
assert(normalizeCommandText('show me my bunsiess card') === 'show me my business card', 'normalizes bunsiess typo');
assert(normalizeCommandText('show me all busniesses near me') === 'show me all businesses near me', 'normalizes busniesses typo');
assert(normalizeCommandText('show me my business and my cutomer account') === 'show me my business and my customer account', 'normalizes cutomer typo');
assert(normalizeCommandText('show me my costumer profile') === 'show me my customer profile', 'normalizes costumer typo');

expectPlan('hi', {
  intent: 'CHAT',
  responseType: 'chat_answer',
  recordCardsAllowed: false,
});

expectPlan('in you', {
  intent: 'CHAT',
  responseType: 'chat_answer',
  recordCardsAllowed: false,
  toolHint: 'answerDirectly',
});

expectPlan('who am I?', {
  intent: 'IDENTITY',
  entity: 'viewer',
  responseType: 'chat_answer',
  recordCardsAllowed: false,
});

expectPlan('tell me about my account', {
  intent: 'ACCOUNT',
  entity: 'viewer',
  responseType: 'chat_answer',
  recordCardsAllowed: false,
});

expectPlan('can you see my llocation as a customer?', {
  intent: 'VIEWER_LOCATION',
  entity: 'viewer',
  responseType: 'chat_answer',
  recordCardsAllowed: false,
});

expectPlan('how do you know they are at my location?', {
  intent: 'CHAT',
  responseType: 'chat_answer',
  recordCardsAllowed: false,
  toolHint: 'answerDirectly',
});

expectPlan('what do I do?', {
  intent: 'GUIDANCE',
  responseType: 'guidance_steps',
  recordCardsAllowed: false,
});

expectPlan('do you do anylitic statistics work?', {
  intent: 'CHAT',
  responseType: 'chat_answer',
  recordCardsAllowed: false,
  toolHint: 'answerDirectly',
});

expectPlan("what's the best use for EMY?", {
  intent: 'UNKNOWN',
  responseType: 'chat_answer',
  recordCardsAllowed: false,
  toolHint: 'answerDirectly',
});

expectPlan("tell me what's new on EMY", {
  intent: 'DAILY_UPDATE',
  entity: 'emy_update',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
  toolHint: 'getDailyEmyUpdate',
});

expectPlan('daily update', {
  intent: 'DAILY_UPDATE',
  entity: 'emy_update',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: false,
  toolHint: 'getDailyEmyUpdate',
});

expectPlan('update my post', {
  intent: 'POST_LIST',
  responseType: 'small_result_list',
  toolHint: 'getOwnedPosts',
});

expectPlan('Can you compare products from clips views?', {
  intent: 'CROSS_ENTITY_ANALYTICS',
  entity: 'products_clips',
  metric: 'views',
  quantity: 'list',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  toolHint: 'compareContentViews',
});

expectPlan('what has more views producs or clips?', {
  intent: 'CROSS_ENTITY_ANALYTICS',
  entity: 'products_clips',
  metric: 'views',
  quantity: 'list',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  toolHint: 'compareContentViews',
});

expectPlan('what has more views producs orpost?', {
  intent: 'CROSS_ENTITY_ANALYTICS',
  entity: 'products_posts',
  metric: 'views',
  quantity: 'list',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  toolHint: 'compareContentViews',
});

expectPlan('what has more comments products or posts?', {
  intent: 'CROSS_ENTITY_ANALYTICS',
  entity: 'products_posts',
  metric: 'comments',
  quantity: 'list',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  toolHint: 'compareContentViews',
});

expectPlan('I need a product', {
  intent: 'GUIDANCE',
  responseType: 'guidance_steps',
  recordCardsAllowed: false,
  toolHint: 'guideNextStep',
});

expectPlan('show my customer content', {
  intent: 'CUSTOMER_SELF_CONTENT',
  entity: 'viewer_customer_content',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getCustomerSelfContent',
});

expectPlan('shoe me my customer card', {
  intent: 'CUSTOMER_PROFILE',
  entity: 'customer-profile',
  quantity: 'one',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getCustomerProfileCard',
});

expectPlan('show the profile image', {
  intent: 'CUSTOMER_PROFILE',
  entity: 'customer-profile',
  quantity: 'one',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getCustomerProfileCard',
});

const customerProfileImagePlan = expectPlan('can you show me my customer profile image?', {
  intent: 'CUSTOMER_PROFILE',
  entity: 'customer-profile',
  quantity: 'one',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getCustomerProfileCard',
});
assert(customerProfileImagePlan.planningText === 'show my customer profile image', `customer profile image should preserve image planning text, got ${customerProfileImagePlan.planningText}`);

expectPlan('show me both my customer and business profiles', {
  intent: 'PROFILE_CARDS',
  entity: 'viewer_profiles',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getViewerProfileCards',
});

expectPlan('show me my customer and business cards', {
  intent: 'PROFILE_CARDS',
  entity: 'viewer_profiles',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getViewerProfileCards',
});

expectPlan('show me my business and my cutomer account', {
  intent: 'PROFILE_CARDS',
  entity: 'viewer_profiles',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getViewerProfileCards',
});

expectPlan('show me all my bunsiesses cards', {
  intent: 'BUSINESS_PROFILE_LIST',
  entity: 'businesses',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getOwnedBusinessCards',
});

expectPlan('show me all my customers cards', {
  intent: 'BUSINESS_CUSTOMERS',
  entity: 'business_customers',
  quantity: 'list',
  responseType: 'analytics_chart',
  recordCardsAllowed: true,
  toolHint: 'getBusinessCustomersAnalytics',
});

expectPlan('I just told you show me my bunsiess card', {
  intent: 'BUSINESS_PROFILE',
  entity: 'business',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getOwnedBusinessCard',
}, {
  historyText: 'I understand - you mean your own customer-side content/profile, not a business customer list. I am showing the matching customer-side cards below.',
});

expectPlan('show them to me aswell', {
  intent: 'CUSTOMER_SELF_CONTENT',
  entity: 'viewer_customer_content',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getCustomerSelfContent',
  resolvedFollowUp: true,
  followUpResolution: 'show_customer_posts_follow_up',
  planningText: 'show my customer posts',
}, {
  historyText: 'Customer-side content visible: 8 Posts: 8 I am showing the matching customer-side cards below.',
});

expectPlan("if I'm the customer how many posts do I have?", {
  intent: 'CUSTOMER_SELF_CONTENT',
  entity: 'viewer_customer_content',
  quantity: 'count',
  responseType: 'chat_answer',
  recordCardsAllowed: false,
  toolHint: 'getCustomerSelfContent',
});

expectPlan("let's say I'm a business can you show me all my customers and analyse them from likes and views?", {
  intent: 'BUSINESS_CUSTOMERS',
  entity: 'business_customers',
  metric: 'views',
  quantity: 'list',
  responseType: 'analytics_chart',
  recordCardsAllowed: true,
  toolHint: 'getBusinessCustomersAnalytics',
});

expectPlan('show me all my customers', {
  intent: 'BUSINESS_CUSTOMERS',
  entity: 'business_customers',
  quantity: 'list',
  responseType: 'analytics_chart',
  recordCardsAllowed: true,
  toolHint: 'getBusinessCustomersAnalytics',
});

expectPlan('show me all my products', {
  intent: 'PRODUCT_LIST',
  entity: 'products',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getOwnedProducts',
});

expectPlan('can you show me my clips?', {
  intent: 'CLIP_LIST',
  entity: 'clips',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getOwnedClips',
});

expectPlan('can you show me all my posts?', {
  intent: 'POST_LIST',
  entity: 'posts',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getOwnedPosts',
});

expectPlan('my articles', {
  intent: 'ARTICLE_LIST',
  entity: 'articles',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getOwnedArticles',
});

expectPlan('just my business actircles', {
  intent: 'ARTICLE_LIST',
  entity: 'articles',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getOwnedArticles',
});

expectPlan('show my business articles', {
  intent: 'ARTICLE_LIST',
  entity: 'articles',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getOwnedArticles',
});

expectPlan('show me all posts', {
  intent: 'POST_SEARCH',
  entity: 'posts',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: true,
  toolHint: 'searchNearby',
});

expectPlan('show me clips', {
  intent: 'CLIP_SEARCH',
  entity: 'clips',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  locationSearchAllowed: true,
  toolHint: 'searchNearby',
});

expectPlan('show me my business card', {
  intent: 'BUSINESS_PROFILE',
  entity: 'business',
  quantity: 'one',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getOwnedBusinessCard',
});

expectPlan('can I see my business account?', {
  intent: 'BUSINESS_PROFILE',
  entity: 'business',
  quantity: 'one',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getOwnedBusinessCard',
});

expectPlan('can I see my bsuniess account?', {
  intent: 'BUSINESS_PROFILE',
  entity: 'business',
  quantity: 'one',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getOwnedBusinessCard',
});

expectPlan('can I see my customer profile?', {
  intent: 'CUSTOMER_PROFILE',
  entity: 'customer-profile',
  quantity: 'one',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getCustomerProfileCard',
});

expectPlan('shw me my profile', {
  intent: 'CUSTOMER_PROFILE',
  entity: 'customer-profile',
  quantity: 'one',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getCustomerProfileCard',
});

expectPlan('show me my businiess card', {
  intent: 'BUSINESS_PROFILE',
  entity: 'business',
  quantity: 'one',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getOwnedBusinessCard',
});

expectPlan('show me my clip videos', {
  intent: 'MEDIA_PREVIEW',
  entity: 'clips',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getMediaPreview',
});

expectPlan('show me media previews', {
  intent: 'MEDIA_PREVIEW',
  entity: 'media',
  quantity: 'list',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'getMediaPreview',
});

expectPlan('show products', {
  intent: 'PRODUCT_SEARCH',
  entity: 'products',
  quantity: 'unspecified',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'searchProducts',
});

expectPlan('search cheapest tomatoes', {
  intent: 'PRODUCT_SEARCH',
  entity: 'products',
  quantity: 'unspecified',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'searchProducts',
});

expectPlan('just give me the cheapest tomoatos', {
  intent: 'PRODUCT_SEARCH',
  entity: 'products',
  quantity: 'unspecified',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'searchProducts',
});

expectPlan('just give me the cheapest tomoatoes', {
  intent: 'PRODUCT_SEARCH',
  entity: 'products',
  quantity: 'unspecified',
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'searchProducts',
});

expectPlan('I said my porudcts', {
  intent: 'PRODUCT_LIST',
  entity: 'products',
  quantity: 'list',
  recordCardsAllowed: true,
});

expectPlan('show me the product most viewd', {
  intent: 'PRODUCT_SINGLE_METRIC',
  entity: 'product',
  metric: 'views',
  quantity: 'one',
  responseType: 'inline_product_view',
  recordCardsAllowed: true,
  toolHint: 'getMostViewedProduct',
});

expectPlan('I asked the product not products', {
  intent: 'PRODUCT_SINGLE_METRIC',
  quantity: 'one',
  locationSearchAllowed: false,
  toolHint: 'getMostViewedProduct',
}, { previousIntent: 'PRODUCT_SINGLE_METRIC' });

expectPlan('show my stats', {
  intent: 'BUSINESS_ANALYTICS',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  toolHint: 'getBusinessStatsOverview',
});

expectPlan('make a chart', {
  intent: 'BUSINESS_ANALYTICS',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
});

expectPlan('top 5 products by views', {
  intent: 'PRODUCT_LIST_METRIC',
  entity: 'products',
  metric: 'views',
  quantity: 'list',
  limit: 5,
  analyticsEntity: 'products',
  analyticsMetric: 'views',
  analyticsGroupBy: 'product',
  analyticsChartType: 'horizontal_bar',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  toolHint: 'getTopProductsAnalytics',
});

expectPlan('show me the best products', {
  intent: 'PRODUCT_LIST_METRIC',
  entity: 'products',
  metric: 'views',
  quantity: 'list',
  analyticsEntity: 'products',
  analyticsMetric: 'views',
  analyticsGroupBy: 'product',
  analyticsChartType: 'horizontal_bar',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  toolHint: 'getTopProductsAnalytics',
});

expectPlan('compare my businesses by profile views', {
  intent: 'BUSINESS_COMPARISON',
  entity: 'businesses',
  metric: 'profile_views',
  quantity: 'list',
  analyticsEntity: 'businesses',
  analyticsMetric: 'profile_views',
  analyticsGroupBy: 'business',
  analyticsChartType: 'horizontal_bar',
  analyticsScope: 'all_user_businesses',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  toolHint: 'getMultiBusinessComparison',
});

expectPlan('show jobs by applications', {
  intent: 'BUSINESS_ANALYTICS',
  entity: 'jobs',
  metric: 'applications',
  analyticsEntity: 'jobs',
  analyticsMetric: 'applications',
  analyticsGroupBy: 'job',
  analyticsChartType: 'horizontal_bar',
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  toolHint: 'getBusinessStatsOverview',
});

expectPlan('show profile views over time', {
  intent: 'BUSINESS_ANALYTICS',
  entity: 'business',
  metric: 'profile_views',
  analyticsEntity: 'business',
  analyticsMetric: 'profile_views',
  analyticsGroupBy: 'date',
  analyticsChartType: 'line',
  requiresTimeSeries: true,
  responseType: 'analytics_chart',
  recordCardsAllowed: false,
  toolHint: 'getBusinessStatsOverview',
});

expectPlan('shops near me', {
  intent: 'SEARCH_NEARBY',
  entity: 'businesses',
  locationSearchAllowed: true,
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'searchNearby',
});

expectPlan('show me all busniesses near me', {
  intent: 'SEARCH_NEARBY',
  entity: 'businesses',
  locationSearchAllowed: true,
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'searchNearby',
});

expectPlan('show products near SL0 9BU', {
  intent: 'SEARCH_NEARBY',
  entity: 'products',
  locationSearchAllowed: true,
  responseType: 'small_result_list',
  recordCardsAllowed: true,
  toolHint: 'searchNearby',
});

expectPlan('create a product for me', {
  intent: 'CREATE_DRAFT',
  responseType: 'draft_preview',
  recordCardsAllowed: false,
  toolHint: 'createDraft',
});

console.log(JSON.stringify({
  ok: true,
  plannerRouter: true,
  examplesCovered: 26,
}, null, 2));

'use strict';

const assert = require('assert');

const BASE_URL = process.env.ASK_EMY_LIVE_BASE_URL || 'http://127.0.0.1:8767';
const ROUNDS = Math.max(1, Math.min(Number(process.env.ASK_EMY_LIVE_GUARD_ROUNDS || 3), 10));

async function requestJson(pathname, body) {
  const response = await fetch(`${BASE_URL}${pathname}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  assert(response.ok, `${pathname}: expected 2xx, got ${response.status}: ${text.slice(0, 240)}`);
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${pathname}: invalid JSON response: ${text.slice(0, 240)}`);
  }
}

async function requestText(pathname) {
  const response = await fetch(`${BASE_URL}${pathname}`);
  const text = await response.text();
  assert(response.ok, `${pathname}: expected 2xx, got ${response.status}: ${text.slice(0, 240)}`);
  return text;
}

function answerText(reply) {
  return String(reply && reply.answer || '').replace(/\s+/g, ' ').trim();
}

function resultCount(reply) {
  return Array.isArray(reply && reply.results) ? reply.results.length : 0;
}

function assertTool(label, reply, responseType, selectedToolName) {
  assert.strictEqual(reply.responseType, responseType, `${label}: wrong responseType`);
  assert.strictEqual(reply.selectedToolName, selectedToolName, `${label}: wrong selectedToolName`);
}

function assertNoCards(label, reply) {
  assert.strictEqual(resultCount(reply), 0, `${label}: should not dump result cards`);
}

function assertNoPostcodeAsProduct(label, reply) {
  const text = answerText(reply).toLowerCase();
  assert(!/product listed on emy for\s+sl0|for sl0 9bu|shop selling\s+sl0/.test(text), `${label}: postcode was treated as product text`);
}

async function ask(query, round) {
  return requestJson('/api/ask-emy', {
    query,
    location: 'SL0 9BU',
    radius: 5,
    chat: `chat-live-flow-guard-${round}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  });
}

async function askWithHistory(query, history, round) {
  return requestJson('/api/ask-emy', {
    query,
    history,
    location: 'SL0 9BU',
    radius: 5,
    chat: `chat-live-flow-guard-history-${round}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  });
}

async function askWithPayload(query, extraPayload, round) {
  return requestJson('/api/ask-emy', {
    query,
    location: 'SL0 9BU',
    radius: 5,
    chat: `chat-live-flow-guard-payload-${round}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    ...(extraPayload || {}),
  });
}

async function checkRound(round) {
  const identity = await ask('who am I?', round);
  assertTool('identity', identity, 'chat_answer', 'getViewerAccount');
  assertNoCards('identity', identity);

  const namedUser = { user: { name: 'Isaac Stephane Mbongue Nkam', role: 'customer' } };
  const helloGreeting = await askWithPayload('hello', namedUser, round);
  assertTool('hello greeting', helloGreeting, 'chat_answer', 'answerDirectly');
  assertNoCards('hello greeting', helloGreeting);
  assert.strictEqual(answerText(helloGreeting), 'Hello, Isaac. How are you?', 'hello greeting: should greet without reintroducing EMY');
  assert(!/\bI['’]m\s+(?:Ask\s+)?EMY\b|Ask EMY/i.test(answerText(helloGreeting)), 'hello greeting: should not say I am EMY');

  const afternoonGreeting = await askWithPayload('good afternoon', {
    ...namedUser,
    history: [
      { role: 'user', text: 'hello' },
      { role: 'assistant', text: helloGreeting.answer },
    ],
  }, round);
  assertTool('repeat greeting', afternoonGreeting, 'chat_answer', 'answerDirectly');
  assertNoCards('repeat greeting', afternoonGreeting);
  assert.strictEqual(answerText(afternoonGreeting), 'Good afternoon. How are you?', 'repeat greeting: should not repeat the name or EMY intro');
  assert(!/\bI['’]m\s+(?:Ask\s+)?EMY\b|Ask EMY/i.test(answerText(afternoonGreeting)), 'repeat greeting: should not say I am EMY');

  const identityIntro = await askWithPayload('who are you?', namedUser, round);
  assertTool('identity intro', identityIntro, 'chat_answer', 'answerDirectly');
  assertNoCards('identity intro', identityIntro);
  assert(/^I'm EMY\b/.test(answerText(identityIntro)), 'identity intro: should introduce itself only when asked who it is');

  const location = await ask('can you see my location as a customer?', round);
  assertTool('viewer location', location, 'chat_answer', 'getViewerLocation');
  assertNoCards('viewer location', location);
  assert(answerText(location).includes('SL0 9BU'), 'viewer location: should mention saved Ask EMY location');

  const nextStep = await ask('what do I do?', round);
  assertTool('guidance', nextStep, 'guidance_steps', 'guideNextStep');
  assertNoCards('guidance', nextStep);

  const vagueProduct = await ask('I need a product', round);
  assertTool('vague product need', vagueProduct, 'guidance_steps', 'guideNextStep');
  assertNoCards('vague product need', vagueProduct);

  const chatFragment = await ask('in you', round);
  assertTool('chat fragment', chatFragment, 'chat_answer', 'answerDirectly');
  assertNoCards('chat fragment', chatFragment);
  assert(/catch that|say it another way|say that another way|follow you|if you mean|what do you mean/i.test(answerText(chatFragment)), 'chat fragment: should repair conversationally');
  assert(!/search yet|nearby businesses|products, jobs, clips/i.test(answerText(chatFragment)), 'chat fragment: should not sound like failed search');

  const productSearch = await ask('show products near SL0 9BU', round);
  assertTool('products near postcode', productSearch, 'small_result_list', 'searchNearby');
  assertNoPostcodeAsProduct('products near postcode', productSearch);
  assert(resultCount(productSearch) > 0, 'products near postcode: should return product cards from current fixture data');

  const businessesNearMe = await ask('show me all busniesses near me', round);
  assertTool('businesses near me', businessesNearMe, 'small_result_list', 'searchNearby');
  assertNoPostcodeAsProduct('businesses near me', businessesNearMe);
  if (resultCount(businessesNearMe) > 0) {
    assert(
      businessesNearMe.results.every((result) => String(result && result.type || '').toLowerCase() === 'business'),
      'businesses near me: should return only actual business cards'
    );
  } else {
    assert(/business profiles|shops near|do not see/i.test(answerText(businessesNearMe)), 'businesses near me: empty state should explain no real business profiles were found');
  }

  const chart = await ask('top 5 products by views', round);
  assertTool('product chart', chart, 'analytics_chart', 'getTopProductsAnalytics');
  assertNoCards('product chart', chart);
  assert(/views/i.test(answerText(chart)), 'product chart: should explain views');

  const analyticsCapability = await ask('do you do anylitic statistics work?', round);
  assertTool('analytics capability', analyticsCapability, 'chat_answer', 'answerDirectly');
  assertNoCards('analytics capability', analyticsCapability);
  assert.strictEqual(analyticsCapability.analytics || null, null, 'analytics capability: should not attach a chart');
  assert(/analytics|statistics|analyse|analyze|compare/i.test(answerText(analyticsCapability)), 'analytics capability: should answer the capability question');
  assert(!/most viewed products|product interest|ranked \d+ products/i.test(answerText(analyticsCapability)), 'analytics capability: should not dump a product chart answer');

  const bestUse = await ask("what's the best use for EMY?", round);
  assertTool('best use capability', bestUse, 'chat_answer', 'answerDirectly');
  assertNoCards('best use capability', bestUse);
  assert.strictEqual(bestUse.analytics || null, null, 'best use capability: should not attach a chart');
  assert(/best use|EMY|business|workspace|discover|local/i.test(answerText(bestUse)), 'best use capability: should answer the general EMY use question');
  assert(!/analytics chart|most viewed products|69 views/i.test(answerText(bestUse)), 'best use capability: should not dump analytics wording');

  const singleProduct = await ask('show me the product most viewed', round);
  assertTool('single top product', singleProduct, 'inline_product_view', 'getMostViewedProduct');
  assert.strictEqual(resultCount(singleProduct), 1, 'single top product: should return exactly one product');
  assert(/69 views|views/i.test(answerText(singleProduct)), 'single top product: should include view metric');

  const customerContent = await ask('show my customer content', round);
  assertTool('customer content', customerContent, 'small_result_list', 'getCustomerSelfContent');
  assert(resultCount(customerContent) > 0, 'customer content: should show customer-side cards when explicitly requested');

  const nullUserCustomerCard = await askWithPayload('show me my customer card', {
    accountRole: 'customer',
    user: null,
    accountOptions: [],
  }, round);
  assertTool('null-user customer card', nullUserCustomerCard, 'small_result_list', 'getCustomerProfileCard');
  assert.strictEqual(resultCount(nullUserCustomerCard), 1, 'null-user customer card: should return one generated customer profile card');
  assert.strictEqual(nullUserCustomerCard.results[0].type, 'customer-profile', 'null-user customer card: should return a customer profile card');
  assert(!/^ai-error:/i.test(String(nullUserCustomerCard.provider || '')), 'null-user customer card: should not fall back to AI provider error');

  const customerContentFollowUp = await askWithHistory('show them to me aswell', [{
    role: 'assistant',
    text: 'I understand - you mean your own customer-side content/profile, not a business customer list. What I found Customer-side content visible: 8 Posts: 8 I am showing the matching customer-side cards below.',
  }], round);
  assertTool('customer content follow-up', customerContentFollowUp, 'small_result_list', 'getCustomerSelfContent');
  assert(resultCount(customerContentFollowUp) > 0, 'customer content follow-up: should show customer-side cards when user asks to show them too');

  const customerPostCount = await ask("if I'm the customer how many posts do I have?", round);
  assertTool('customer post count', customerPostCount, 'chat_answer', 'getCustomerSelfContent');
  assertNoCards('customer post count', customerPostCount);
  assert(/posts? visible|customer-side posts?|posts?:\s*\d+|can (?:only )?see \d+ saved posts?/i.test(answerText(customerPostCount)), 'customer post count: should answer the count question');

  const businessCustomers = await askWithPayload("let's say I'm a business can you show me all my customers and analyse them from likes and views?", {
    accountRole: 'business',
    businessName: 'HONEY SHOP',
    businessKey: 'honey-shop',
    user: {
      role: 'business',
      businessName: 'HONEY SHOP',
      businessKey: 'honey-shop',
      name: 'HONEY SHOP',
    },
    businessCustomers: [
      {
        customerKey: 'isaac-customer',
        customerName: 'Isaac Stephane Mbongue Nkam',
        business: 'HONEY SHOP',
        businessName: 'HONEY SHOP',
        businessKey: 'honey-shop',
        status: 'accepted',
        views: 12,
        likes: 2,
        comments: 1,
        saves: 0,
      },
      {
        customerKey: 'maria-customer',
        customerName: 'Maria Customer',
        business: 'HONEY SHOP',
        businessName: 'HONEY SHOP',
        businessKey: 'honey-shop',
        status: 'accepted',
        views: 4,
        likes: 5,
        comments: 0,
        saves: 1,
      },
    ],
  }, round);
  assertTool('business customer analytics', businessCustomers, 'analytics_chart', 'getBusinessCustomersAnalytics');
  assert(resultCount(businessCustomers) >= 2, 'business customer analytics: should return generated customer cards for the business owner');
  assert(businessCustomers.analytics && businessCustomers.analytics.answer_type === 'analytics_bar_chart', 'business customer analytics: should attach a customer analytics chart');
  assert(/customers?|views?|likes?/i.test(answerText(businessCustomers)), 'business customer analytics: should explain customer views and likes');
  assert(businessCustomers.results.every((result) => result.type === 'customer-profile' && result.viewSpec), 'business customer analytics: each customer result should be a generated customer card');

  const manyCustomerRows = Array.from({ length: 25 }, (_, index) => ({
    customerKey: `customer-${index + 1}`,
    customerName: `Customer ${index + 1}`,
    business: 'HONEY SHOP',
    businessName: 'HONEY SHOP',
    businessKey: 'honey-shop',
    status: 'accepted',
    views: 100 - index,
    likes: index % 7,
    comments: index % 3,
    saves: index % 2,
  }));
  const manyBusinessCustomers = await askWithPayload('show me all my customers and analyse them from likes and views', {
    accountRole: 'business',
    businessName: 'HONEY SHOP',
    businessKey: 'honey-shop',
    user: {
      role: 'business',
      businessName: 'HONEY SHOP',
      businessKey: 'honey-shop',
      name: 'HONEY SHOP',
    },
    businessCustomers: manyCustomerRows,
  }, round);
  assertTool('many business customers cap', manyBusinessCustomers, 'analytics_chart', 'getBusinessCustomersAnalytics');
  assert.strictEqual(resultCount(manyBusinessCustomers), 12, 'many business customers cap: should return only the first 12 generated cards');
  assert.strictEqual(manyBusinessCustomers.analytics.bars.length, 10, 'many business customers cap: should return only the first 10 chart bars');
  assert((manyBusinessCustomers.analytics.data_quality.warnings || []).some((warning) => /Showing the first 10 customers.*out of/i.test(String(warning))), 'many business customers cap: should explain that more customers exist in structured data');
  assert(Number(manyBusinessCustomers.analytics.data_quality.total_items) >= 25, 'many business customers cap: should preserve total customer count');
  assert.strictEqual(manyBusinessCustomers.analytics.data_quality.displayed_items, 10, 'many business customers cap: should preserve displayed chart count');

  const statsPromptHistory = [{
    role: 'assistant',
    text: 'What do you want to do with the statistics? I can show your statistics here, explain what the stats mean, or check one specific metric.',
  }];
  const explainStats = await askWithHistory('explain', statsPromptHistory, round);
  assertTool('explain stats follow-up', explainStats, 'analytics_chart', 'getBusinessStatsOverview');
  assertNoCards('explain stats follow-up', explainStats);
  assert(!/^what do you want to do with the statistics/i.test(answerText(explainStats)), 'explain stats follow-up: should not repeat the clarification menu');
  assert(answerText(explainStats).length > 80, 'explain stats follow-up: should explain the statistics');

  const profileImageUrl = 'https://res.cloudinary.com/dupytlsjv/image/upload/v1781300831/emy/feed/n6adgiil1rorklc4yrut.png';
  const profilePayload = {
    user: {
      name: 'Isaac Stephane Mbongue Nkam',
      email: 'test.customer@emy.local',
      role: 'customer',
      profileImage: profileImageUrl,
    },
  };

  const profileImage = await askWithPayload('can you show me my customer profile image?', profilePayload, round);
  assertTool('customer profile image card', profileImage, 'small_result_list', 'getCustomerProfileCard');
  assert.strictEqual(resultCount(profileImage), 1, 'customer profile image card: should return one generated card');
  assert(profileImage.results[0].viewSpec, 'customer profile image card: should include generated viewSpec');
  assert.strictEqual(profileImage.results[0].viewSpec.variant, 'media', 'customer profile image card: should use media variant');
  assert.strictEqual(profileImage.results[0].viewSpec.media.src, profileImageUrl, 'customer profile image card: should use supplied profile image');
  assert(!/Image:\s*https?:|Opening/i.test(answerText(profileImage)), 'customer profile image card: should not leak raw image URLs or pretend-only opening text');

  const profileCard = await askWithPayload('shw me my profile', profilePayload, round);
  assertTool('customer profile generated card', profileCard, 'small_result_list', 'getCustomerProfileCard');
  assert.strictEqual(resultCount(profileCard), 1, 'customer profile generated card: should return one card');
  assert.strictEqual(profileCard.results[0].type, 'customer-profile', 'customer profile generated card: should be a customer profile result');
  assert(profileCard.results[0].viewSpec, 'customer profile generated card: should include viewSpec');
  assert.strictEqual(profileCard.results[0].viewSpec.variant, 'identity', 'customer profile generated card: should use identity variant');

  const businessCard = await askWithPayload('show me my businiess card', {
    user: {
      name: 'Isaac Stephane Mbongue Nkam',
      email: 'test.customer@emy.local',
      role: 'customer',
    },
    accountOptions: [{
      role: 'business',
      businessName: 'HONEY SHOP',
      businessKey: 'honey-shop',
      email: 'business@example.com',
      profileImage: profileImageUrl,
    }],
  }, round);
  assertTool('business generated card', businessCard, 'small_result_list', 'getOwnedBusinessCard');
  assert.strictEqual(resultCount(businessCard), 1, 'business generated card: should return one card');
  assert.strictEqual(String(businessCard.results[0].name || businessCard.results[0].businessName), 'HONEY SHOP', 'business generated card: should use account business name');
  assert(businessCard.results[0].viewSpec, 'business generated card: should include viewSpec');
  assert.strictEqual(businessCard.results[0].viewSpec.kind, 'Business profile card', 'business generated card: should identify business profile card');
  assert.strictEqual(businessCard.results[0].viewSpec.variant, 'business', 'business generated card: should use business variant');

  const contextualNextStep = await askWithHistory('what do I do?', [{
    role: 'user',
    text: 'show me my business card',
  }, {
    role: 'assistant',
    text: businessCard.answer,
    results: businessCard.results,
  }], round);
  assertTool('business card contextual next step', contextualNextStep, 'guidance_steps', 'guideNextStep');
  assertNoCards('business card contextual next step', contextualNextStep);
  assert(/HONEY SHOP|business profile|business card/i.test(answerText(contextualNextStep)), 'business card contextual next step: should use the current business card context');
  assert(/profile image|description|location|opening hours|contact|products|clips|posts|statistics|stats/i.test(answerText(contextualNextStep)), 'business card contextual next step: should give useful business-card next actions');
  assert(!/Decision map|Search EMY records|Search saved EMY records/i.test(answerText(contextualNextStep)), 'business card contextual next step: should not return the old generic menu');
}

async function checkPageHealth() {
  const page = await requestText('/restore-may20/ask-emy-results.html?q=show+products+near+SL0+9BU&chat=chat-live-flow-guard-page&location=SL0+9BU&radius=5&sidebar=closed');
  assert(page.includes('id="root"'), 'Ask EMY results page should contain React root');
  assert(page.includes('ask-emy-results-page.js'), 'Ask EMY results page should load runtime asset');
  assert(!/Cannot GET|stack trace|Unhandled/i.test(page), 'Ask EMY results page should not serve an error page');

  const runtime = await requestText('/restore-may20/assets/ask-emy-results-page.js');
  assert(runtime.includes('askEmyBrowserBrainDecision'), 'Ask EMY runtime should include browser brain decision');
  assert(runtime.includes('SEARCH_NEARBY'), 'Ask EMY runtime should include location-search routing');
}

(async () => {
  await checkPageHealth();
  for (let round = 1; round <= ROUNDS; round += 1) {
    await checkRound(round);
  }
  console.log(JSON.stringify({
    ok: true,
    liveFlowGuard: true,
    baseUrl: BASE_URL,
    rounds: ROUNDS,
    checks: ROUNDS * 21 + 2,
  }, null, 2));
  process.exit(0);
})().catch((error) => {
  console.error(error && error.stack || error);
  process.exit(1);
});

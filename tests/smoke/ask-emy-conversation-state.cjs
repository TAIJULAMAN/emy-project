'use strict';

const {
  stateFromHistory,
  resolveConversationState,
  validateAskEmyResponse,
} = require('../../src/ask-emy/conversation-state.cjs');
const { planAskEmyMessage } = require('../../src/ask-emy/brain-planner.cjs');
const { routeAskEmyMessage } = require('../../src/ask-emy/tool-router.cjs');

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const statsHistory = 'What do you want to do with the statistics? I can show your statistics here, explain what the stats mean, or check one specific metric.';
const statsState = stateFromHistory(statsHistory);
assert(statsState.activeDomain === 'analytics', 'stats history should activate analytics domain');
assert(statsState.pendingQuestion && statsState.pendingQuestion.type === 'stats_clarification', 'stats history should create pending clarification');

const yesStats = resolveConversationState('yes', { historyText: statsHistory });
assert(yesStats.resolvedFollowUp === true, 'yes after stats should resolve follow-up');
assert(yesStats.effectiveQuery === 'show my business statistics', `yes after stats resolved to wrong query: ${yesStats.effectiveQuery}`);

const yesStatsPlan = planAskEmyMessage('yes', { historyText: statsHistory });
assert(yesStatsPlan.resolvedFollowUp === true, 'planner should mark resolved stats follow-up');
assert(yesStatsPlan.intent === 'BUSINESS_ANALYTICS', `yes stats intent should be BUSINESS_ANALYTICS, got ${yesStatsPlan.intent}`);
assert(yesStatsPlan.toolHint === 'getBusinessStatsOverview', 'yes stats should use business analytics tool');
assert(yesStatsPlan.recordCardsAllowed === false, 'yes stats should not allow cards');

const explainStatsPlan = planAskEmyMessage('explain', { historyText: statsHistory });
assert(explainStatsPlan.resolvedFollowUp === true, 'explain after stats should resolve follow-up');
assert(explainStatsPlan.followUpResolution === 'explain_statistics', `explain stats resolution wrong: ${explainStatsPlan.followUpResolution}`);
assert(explainStatsPlan.planningText === 'explain my business statistics', `explain stats planning text wrong: ${explainStatsPlan.planningText}`);
assert(explainStatsPlan.intent === 'BUSINESS_ANALYTICS', `explain stats intent should be BUSINESS_ANALYTICS, got ${explainStatsPlan.intent}`);
assert(explainStatsPlan.recordCardsAllowed === false, 'explain stats should not allow cards');

const profileViewsPlan = planAskEmyMessage('profile views', { historyText: statsHistory });
assert(profileViewsPlan.resolvedFollowUp === true, 'profile views after stats should resolve follow-up');
assert(profileViewsPlan.followUpResolution === 'specific_metric:profile_views', `profile views resolution wrong: ${profileViewsPlan.followUpResolution}`);
assert(profileViewsPlan.metric === 'profile_views', `profile views metric wrong: ${profileViewsPlan.metric}`);
assert(profileViewsPlan.intent === 'BUSINESS_ANALYTICS', `profile views should stay business analytics, got ${profileViewsPlan.intent}`);
assert(profileViewsPlan.toolHint === 'getBusinessStatsOverview', 'profile views should use business stats tool');

const productViewsPlan = planAskEmyMessage('views', {
  historyText: 'Here are your product statistics and top products. What do you want to do with the statistics? I can show your statistics here, explain what the stats mean, or check one specific metric.',
});
assert(productViewsPlan.resolvedFollowUp === true, 'views after product stats should resolve follow-up');
assert(productViewsPlan.followUpResolution === 'specific_metric:views', `product views resolution wrong: ${productViewsPlan.followUpResolution}`);
assert(productViewsPlan.intent === 'PRODUCT_LIST_METRIC', `product views should route to product analytics, got ${productViewsPlan.intent}`);
assert(productViewsPlan.toolHint === 'getTopProductsAnalytics', 'product views should use product analytics tool');

const customerSelfHistory = 'I understand - you mean your own customer-side content/profile, not a business customer list. What I found Customer-side content visible: 8 Posts: 8 I am showing the matching customer-side cards below.';
const customerState = stateFromHistory(customerSelfHistory);
assert(customerState.activeDomain === 'customer-self', `customer history should activate customer-self domain, got ${customerState.activeDomain}`);
assert(customerState.activeEntity === 'customer-content', `customer history should activate customer-content entity, got ${customerState.activeEntity}`);

const customerShowFollowUp = resolveConversationState('show them to me aswell', { historyText: customerSelfHistory });
assert(customerShowFollowUp.resolvedFollowUp === true, 'show them after customer content should resolve follow-up');
assert(customerShowFollowUp.followUpResolution === 'show_customer_posts_follow_up', `customer follow-up resolution wrong: ${customerShowFollowUp.followUpResolution}`);
assert(customerShowFollowUp.effectiveQuery === 'show my customer posts', `customer follow-up effective query wrong: ${customerShowFollowUp.effectiveQuery}`);

const customerShowPlan = planAskEmyMessage('show them to me aswell', { historyText: customerSelfHistory });
assert(customerShowPlan.intent === 'CUSTOMER_SELF_CONTENT', `customer follow-up should route to customer content, got ${customerShowPlan.intent}`);
assert(customerShowPlan.toolHint === 'getCustomerSelfContent', 'customer follow-up should use customer self content tool');
assert(customerShowPlan.recordCardsAllowed === true, 'customer follow-up should allow customer cards');

const customerProfileCardAfterCustomerHistory = planAskEmyMessage('show me my customer card', { historyText: customerSelfHistory });
assert(customerProfileCardAfterCustomerHistory.intent === 'CUSTOMER_PROFILE', `customer card should override customer posts context, got ${customerProfileCardAfterCustomerHistory.intent}`);
assert(customerProfileCardAfterCustomerHistory.toolHint === 'getCustomerProfileCard', 'customer card should use customer profile card tool');
assert(customerProfileCardAfterCustomerHistory.entity === 'customer-profile', `customer card entity should be customer-profile, got ${customerProfileCardAfterCustomerHistory.entity}`);

const profileAfterCustomerHistory = planAskEmyMessage('profile', { historyText: customerSelfHistory });
assert(profileAfterCustomerHistory.resolvedFollowUp === true, 'profile after customer context should resolve follow-up');
assert(profileAfterCustomerHistory.intent === 'CUSTOMER_PROFILE', `profile after customer context should route to customer profile, got ${profileAfterCustomerHistory.intent}`);
assert(profileAfterCustomerHistory.toolHint === 'getCustomerProfileCard', 'profile after customer context should use customer profile card tool');

const yesCustomerProfile = planAskEmyMessage('yes', { historyText: 'Do you want your customer profile card?' });
assert(yesCustomerProfile.resolvedFollowUp === true, 'yes after customer profile question should resolve follow-up');
assert(yesCustomerProfile.intent === 'CUSTOMER_PROFILE', `yes after customer profile question should route to customer profile, got ${yesCustomerProfile.intent}`);
assert(yesCustomerProfile.toolHint === 'getCustomerProfileCard', 'yes after customer profile question should use customer profile card tool');

const businessCardAfterCustomerHistory = planAskEmyMessage('I just told you show me my bunsiess card', { historyText: customerSelfHistory });
assert(businessCardAfterCustomerHistory.intent === 'BUSINESS_PROFILE', `misspelled business card should override customer context, got ${businessCardAfterCustomerHistory.intent}`);
assert(businessCardAfterCustomerHistory.toolHint === 'getOwnedBusinessCard', 'misspelled business card should use owned business card tool');
assert(businessCardAfterCustomerHistory.entity === 'business', `misspelled business card entity should be business, got ${businessCardAfterCustomerHistory.entity}`);

const productHistory = 'Most viewed product ss has 69 views. Details: Product statistics chart.';
const productCorrection = planAskEmyMessage('I asked the product not products', { historyText: productHistory });
assert(productCorrection.resolvedFollowUp === true, 'product correction should resolve follow-up');
assert(productCorrection.intent === 'PRODUCT_SINGLE_METRIC', `product correction intent should be PRODUCT_SINGLE_METRIC, got ${productCorrection.intent}`);
assert(productCorrection.quantity === 'one', 'product correction should ask for one product');
assert(productCorrection.toolHint === 'getMostViewedProduct', 'product correction should use top product tool');
assert(productCorrection.locationSearchAllowed === false, 'product correction must not allow location search');

const productAffirmative = routeAskEmyMessage('show it', { historyText: productHistory });
assert(productAffirmative.intent === 'PRODUCT_SINGLE_METRIC', `show it should inherit single product context, got ${productAffirmative.intent}`);
assert(productAffirmative.tool.name === 'getMostViewedProduct', 'show it should route to single product analytics');

const specificProductHistory = 'Yes - I found it. Match - face Published by HONEY SHOP Price: £2.00 Category: Retail Availability: In stock Next step Open the product card to view it directly.';
const specificProductShow = planAskEmyMessage('show it', { historyText: specificProductHistory });
assert(specificProductShow.resolvedFollowUp === true, 'show it after specific product match should resolve follow-up');
assert(specificProductShow.followUpResolution === 'open_specific_product_follow_up', `specific product show resolution wrong: ${specificProductShow.followUpResolution}`);
assert(specificProductShow.planningText === 'open product face', `specific product show planning text wrong: ${specificProductShow.planningText}`);
assert(specificProductShow.intent === 'OPEN_ITEM', `specific product show should open product, got ${specificProductShow.intent}`);
assert(specificProductShow.toolHint === 'openInlineView', 'specific product show should use inline opener');

const specificProductOpenBullet = planAskEmyMessage('- Open the product card to view it directly.', { historyText: specificProductHistory });
assert(specificProductOpenBullet.planningText === 'open product face', `specific product open bullet planning text wrong: ${specificProductOpenBullet.planningText}`);
assert(specificProductOpenBullet.intent === 'OPEN_ITEM', `specific product open bullet should open product, got ${specificProductOpenBullet.intent}`);
assert(specificProductOpenBullet.toolHint === 'openInlineView', 'specific product open bullet should use inline opener');

const foundProductColonHistory = 'I found the product: dddd. Details Price: Â£4.00 Category: Food and drink Availability: In stock Next step I can open it for you if you want.';
const openFoundProduct = planAskEmyMessage('open the product', { historyText: foundProductColonHistory });
assert(openFoundProduct.resolvedFollowUp === true, 'open the product after found product should resolve follow-up');
assert(openFoundProduct.followUpResolution === 'open_specific_product_follow_up', `open found product resolution wrong: ${openFoundProduct.followUpResolution}`);
assert(openFoundProduct.planningText === 'open product dddd', `open found product planning text wrong: ${openFoundProduct.planningText}`);
assert(openFoundProduct.intent === 'OPEN_ITEM', `open found product should open product, got ${openFoundProduct.intent}`);
assert(openFoundProduct.toolHint === 'openInlineView', 'open found product should use inline opener');

const productPromptHistory = 'Sure - tell me the product name or a keyword, and I will look for that exact item. Right now I can see saved products in your area, but I need the specific product you want to narrow it down.';
const bareProductName = planAskEmyMessage('dddd', { historyText: productPromptHistory });
assert(bareProductName.resolvedFollowUp === true, 'bare product name after product prompt should resolve follow-up');
assert(bareProductName.followUpResolution === 'product_name_open_follow_up', `bare product name resolution wrong: ${bareProductName.followUpResolution}`);
assert(bareProductName.planningText === 'open product dddd', `bare product name planning text wrong: ${bareProductName.planningText}`);
assert(bareProductName.intent === 'OPEN_ITEM', `bare product name should open product, got ${bareProductName.intent}`);
assert(bareProductName.toolHint === 'openInlineView', 'bare product name should use product opener');
assert(bareProductName.recordCardsAllowed === true, 'bare product name should allow product cards');

const productIsName = planAskEmyMessage('the product is dddd', { historyText: productPromptHistory });
assert(productIsName.resolvedFollowUp === true, 'product is name after product prompt should resolve follow-up');
assert(productIsName.followUpResolution === 'product_name_open_follow_up', `product is name resolution wrong: ${productIsName.followUpResolution}`);
assert(productIsName.planningText === 'open product dddd', `product is name planning text wrong: ${productIsName.planningText}`);
assert(productIsName.intent === 'OPEN_ITEM', `product is name should open product, got ${productIsName.intent}`);
assert(productIsName.toolHint === 'openInlineView', 'product is name should use product opener');

const justThreeProducts = planAskEmyMessage('just 3', { historyText: productPromptHistory });
assert(justThreeProducts.resolvedFollowUp === true, 'just 3 after product prompt should resolve follow-up');
assert(justThreeProducts.followUpResolution === 'product_count_follow_up', `just 3 resolution wrong: ${justThreeProducts.followUpResolution}`);
assert(justThreeProducts.planningText === 'show 3 products', `just 3 planning text wrong: ${justThreeProducts.planningText}`);
assert(justThreeProducts.limit === 3, `just 3 should set limit 3, got ${justThreeProducts.limit}`);
assert(justThreeProducts.toolHint === 'searchProducts', 'just 3 should use product search');

const singularTwoProducts = planAskEmyMessage('2 product', { historyText: productPromptHistory });
assert(singularTwoProducts.planningText === 'show 2 products', `2 product planning text wrong: ${singularTwoProducts.planningText}`);
assert(singularTwoProducts.limit === 2, `2 product should set limit 2, got ${singularTwoProducts.limit}`);

const oneProduct = planAskEmyMessage('1 product', { historyText: productPromptHistory });
assert(oneProduct.planningText === 'show 1 product', `1 product planning text wrong: ${oneProduct.planningText}`);
assert(oneProduct.limit === 1, `1 product should set limit 1, got ${oneProduct.limit}`);

const sixProducts = planAskEmyMessage('6 products', { historyText: productPromptHistory });
assert(sixProducts.planningText === 'show 6 products', `6 products planning text wrong: ${sixProducts.planningText}`);
assert(sixProducts.limit === 6, `6 products should set limit 6, got ${sixProducts.limit}`);

const hugeProductCount = planAskEmyMessage('789101112134', { historyText: productPromptHistory });
assert(hugeProductCount.planningText === 'show 25 products', `huge product count planning text wrong: ${hugeProductCount.planningText}`);
assert(hugeProductCount.limit === 25, `huge product count should cap at 25, got ${hugeProductCount.limit}`);

const productContextBusinessProfile = planAskEmyMessage('show me my busniess profile', {
  historyText: 'Your most liked product is ss from HONEY SHOP. Want me to show the product card for it?',
});
assert(productContextBusinessProfile.intent === 'BUSINESS_PROFILE', `business profile should override previous product context, got ${productContextBusinessProfile.intent}`);
assert(productContextBusinessProfile.toolHint === 'getOwnedBusinessCard', 'business profile should use owned business card tool');
assert(productContextBusinessProfile.entity === 'business', `business profile entity should be business, got ${productContextBusinessProfile.entity}`);
assert(productContextBusinessProfile.resolvedFollowUp === false, 'business profile should not be treated as product follow-up');

const productContextBusnessCard = planAskEmyMessage('show me my busness card', {
  historyText: 'Your most liked product is ss from HONEY SHOP. Want me to show the product card for it?',
});
assert(productContextBusnessCard.intent === 'BUSINESS_PROFILE', `busness card should override previous product context, got ${productContextBusnessCard.intent}`);
assert(productContextBusnessCard.toolHint === 'getOwnedBusinessCard', 'busness card should use owned business card tool');
assert(productContextBusnessCard.entity === 'business', `busness card entity should be business, got ${productContextBusnessCard.entity}`);
assert(productContextBusnessCard.resolvedFollowUp === false, 'busness card should not be treated as product follow-up');

const combinedCustomerBusinessProfiles = planAskEmyMessage('shoshow me my customer and busnies profile', {
  historyText: 'Your most liked product is ss from HONEY SHOP. Want me to show the product card for it?',
});
assert(combinedCustomerBusinessProfiles.intent === 'PROFILE_CARDS', `combined customer/business profile should route to PROFILE_CARDS, got ${combinedCustomerBusinessProfiles.intent}`);
assert(combinedCustomerBusinessProfiles.toolHint === 'getViewerProfileCards', 'combined customer/business profile should use viewer profile cards tool');
assert(combinedCustomerBusinessProfiles.entity === 'viewer_profiles', `combined profile entity should be viewer_profiles, got ${combinedCustomerBusinessProfiles.entity}`);
assert(combinedCustomerBusinessProfiles.recordCardsAllowed === true, 'combined profile request should allow cards');

const bothProfilesDirect = planAskEmyMessage('show me both profiles');
assert(bothProfilesDirect.intent === 'PROFILE_CARDS', `both profiles should route to PROFILE_CARDS, got ${bothProfilesDirect.intent}`);
assert(bothProfilesDirect.toolHint === 'getViewerProfileCards', 'both profiles should use viewer profile cards tool');

const bothProfilesFollowUp = planAskEmyMessage('show me both', {
  historyText: 'Do you want your customer profile card or your business profile card?',
});
assert(bothProfilesFollowUp.resolvedFollowUp === true, 'show me both after profile choice should resolve follow-up');
assert(bothProfilesFollowUp.intent === 'PROFILE_CARDS', `show me both should route to PROFILE_CARDS, got ${bothProfilesFollowUp.intent}`);
assert(bothProfilesFollowUp.toolHint === 'getViewerProfileCards', 'show me both should use viewer profile cards tool');

const openShowOfferHistory = 'HONEY SHOP. If you want, I can open it or show what it sells. Want me to open HONEY SHOP or show what it sells?';
const offerYes = planAskEmyMessage('yes', { historyText: openShowOfferHistory });
assert(offerYes.resolvedFollowUp === true, 'yes after open/show offer should resolve follow-up');
assert(offerYes.followUpResolution === 'open_offered_business', `yes offer resolution wrong: ${offerYes.followUpResolution}`);
assert(offerYes.planningText === 'open business HONEY SHOP', `yes offer planning text wrong: ${offerYes.planningText}`);
assert(offerYes.intent === 'OPEN_ITEM', `yes offer intent should be OPEN_ITEM, got ${offerYes.intent}`);
assert(offerYes.toolHint === 'openInlineView', 'yes offer should use open inline view tool');

const directOpenOfferHistory = 'I found one shop in your saved search area. OPTION HONEY SHOP NOTE I can only confirm it appears in your saved search area. NEXT STEP Want me to open HONEY SHOP for you?';
const directOfferYes = planAskEmyMessage('yes', { historyText: directOpenOfferHistory });
assert(directOfferYes.resolvedFollowUp === true, 'yes after direct open offer should resolve follow-up');
assert(directOfferYes.followUpResolution === 'open_offered_business', `direct yes offer resolution wrong: ${directOfferYes.followUpResolution}`);
assert(directOfferYes.planningText === 'open business HONEY SHOP', `direct yes offer planning text wrong: ${directOfferYes.planningText}`);
assert(directOfferYes.intent === 'OPEN_ITEM', `direct yes offer intent should be OPEN_ITEM, got ${directOfferYes.intent}`);
assert(directOfferYes.toolHint === 'openInlineView', 'direct yes offer should use open inline view tool');
assert(directOfferYes.recordCardsAllowed === true, 'direct yes offer should allow the single existing view payload');

const offerShow = planAskEmyMessage('show it', { historyText: openShowOfferHistory });
assert(offerShow.resolvedFollowUp === true, 'show it after open/show offer should resolve follow-up');
assert(offerShow.followUpResolution === 'show_offered_business_products', `show offer resolution wrong: ${offerShow.followUpResolution}`);
assert(offerShow.planningText === 'show products from HONEY SHOP', `show offer planning text wrong: ${offerShow.planningText}`);
assert(offerShow.intent === 'PRODUCT_SEARCH', `show offer intent should be PRODUCT_SEARCH, got ${offerShow.intent}`);
assert(offerShow.toolHint === 'searchProducts', 'show offer should use product search tool');
assert(offerShow.locationSearchAllowed === false, 'show offer must not switch to location search');

const offerFirst = planAskEmyMessage('first one', { historyText: openShowOfferHistory });
assert(offerFirst.resolvedFollowUp === true, 'first one after open/show offer should resolve follow-up');
assert(offerFirst.planningText === 'open business HONEY SHOP', `first one planning text wrong: ${offerFirst.planningText}`);
assert(offerFirst.intent === 'OPEN_ITEM', `first one should open the offered business, got ${offerFirst.intent}`);

const offerSecond = planAskEmyMessage('second one', { historyText: openShowOfferHistory });
assert(offerSecond.resolvedFollowUp === true, 'second one after open/show offer should resolve follow-up');
assert(offerSecond.planningText === 'show products from HONEY SHOP', `second one planning text wrong: ${offerSecond.planningText}`);
assert(offerSecond.intent === 'PRODUCT_SEARCH', `second one should show offered business products, got ${offerSecond.intent}`);
assert(offerSecond.locationSearchAllowed === false, 'second one must not switch to location search');

const openedBusinessOfferHistory = 'Opening HONEY SHOP.\n\nIf you want, I can also show what it sells next.';
const openedOfferShow = planAskEmyMessage('show me', { historyText: openedBusinessOfferHistory });
assert(openedOfferShow.resolvedFollowUp === true, 'show me after opened business offer should resolve follow-up');
assert(openedOfferShow.followUpResolution === 'show_offered_business_products', `opened offer show resolution wrong: ${openedOfferShow.followUpResolution}`);
assert(openedOfferShow.planningText === 'show products from HONEY SHOP', `opened offer show planning text wrong: ${openedOfferShow.planningText}`);
assert(openedOfferShow.intent === 'PRODUCT_SEARCH', `opened offer show should route to product search, got ${openedOfferShow.intent}`);
assert(openedOfferShow.toolHint === 'searchProducts', 'opened offer show should use product search tool');
assert(openedOfferShow.locationSearchAllowed === false, 'opened offer show must not switch to location search');

const tomatoHistory = 'I can use your saved area to look for tomatoes nearby. I can narrow it down by fresh tomatoes, cherry tomatoes, tomato plants, or cheapest options.';
const cheapestTomatoFollowUp = planAskEmyMessage('cheapest option', { historyText: tomatoHistory });
assert(cheapestTomatoFollowUp.intent === 'PRODUCT_SEARCH', `cheapest tomato follow-up should route to product search, got ${cheapestTomatoFollowUp.intent}`);
assert(cheapestTomatoFollowUp.resolvedFollowUp === true, 'cheapest tomato follow-up should resolve from tomato context');
assert(cheapestTomatoFollowUp.planningText === 'search cheapest tomatoes', `cheapest tomato follow-up planning text wrong: ${cheapestTomatoFollowUp.planningText}`);
assert(cheapestTomatoFollowUp.toolHint === 'searchProducts', 'cheapest tomato follow-up should use product search tool');
assert(cheapestTomatoFollowUp.recordCardsAllowed === true, 'cheapest tomato follow-up should allow product result cards');

const tomatoNoResultHistory = 'search cheapest tomatoes. I am afraid I do not see a product listed on EMY for cheapest tomatoes near SL0 9BU within 5 km right now.';
const mapLocationAfterTomato = planAskEmyMessage('show me my location in a map', { historyText: tomatoNoResultHistory });
assert(mapLocationAfterTomato.resolvedFollowUp === false, 'map/location after tomato result must not resolve as tomato follow-up');
assert(mapLocationAfterTomato.intent === 'VIEWER_LOCATION', `map/location after tomato should route to viewer location, got ${mapLocationAfterTomato.intent}`);
assert(mapLocationAfterTomato.toolHint === 'getViewerLocation', 'map/location after tomato should use viewer location tool');

const plainMapAfterTomato = planAskEmyMessage('show me a map', { historyText: tomatoNoResultHistory });
assert(plainMapAfterTomato.resolvedFollowUp === false, 'plain map after tomato result must not resolve as tomato follow-up');
assert(plainMapAfterTomato.intent !== 'PRODUCT_SEARCH', 'plain map after tomato must not search tomatoes again');
assert(plainMapAfterTomato.toolHint !== 'searchProducts', 'plain map after tomato must not use product search');

const locationAfterStats = planAskEmyMessage('show me my location', { historyText: statsHistory });
assert(locationAfterStats.resolvedFollowUp === false, 'location after stats prompt must not resolve as stats follow-up');
assert(locationAfterStats.intent === 'VIEWER_LOCATION', `location after stats should route to viewer location, got ${locationAfterStats.intent}`);

const locationAfterOffer = planAskEmyMessage('show me my location', { historyText: openShowOfferHistory });
assert(locationAfterOffer.resolvedFollowUp === false, 'location after business offer must not resolve as open/show offer follow-up');
assert(locationAfterOffer.intent === 'VIEWER_LOCATION', `location after business offer should route to viewer location, got ${locationAfterOffer.intent}`);

const chartsFollowUp = planAskEmyMessage('graphs', { historyText: 'Here are your business statistics and analytics.' });
assert(chartsFollowUp.resolvedFollowUp === true, 'graphs should resolve inside analytics context');
assert(chartsFollowUp.intent === 'BUSINESS_ANALYTICS', `graphs follow-up should stay analytics, got ${chartsFollowUp.intent}`);
assert(chartsFollowUp.recordCardsAllowed === false, 'graphs follow-up should not allow cards');

const noCardsValidation = validateAskEmyResponse(
  { intent: 'BUSINESS_ANALYTICS', recordCardsAllowed: false, locationSearchAllowed: false },
  { answer: 'Here is the chart.', results: [{ type: 'product' }] }
);
assert(noCardsValidation.ok === false, 'validator should fail when cards are not allowed');
assert(noCardsValidation.response.results.length === 0, 'validator should remove forbidden cards');
assert(noCardsValidation.failures.includes('cards_not_allowed'), 'validator should report cards_not_allowed');

const viewerLocationValidation = validateAskEmyResponse(
  { intent: 'VIEWER_LOCATION', recordCardsAllowed: false, locationSearchAllowed: false, toolHint: 'getViewerLocation' },
  { answer: 'I can see your saved Ask EMY search location is "SL0 9BU" with radius "5 km".', results: [], selectedToolName: 'getViewerLocation' }
);
assert(viewerLocationValidation.ok === true, 'viewer location answers should be allowed to mention saved location and radius');

const oneProductValidation = validateAskEmyResponse(
  { intent: 'PRODUCT_SINGLE_METRIC', recordCardsAllowed: true, locationSearchAllowed: false },
  { answer: 'Most viewed product.', results: [{ type: 'product', name: 'A' }, { type: 'product', name: 'B' }] }
);
assert(oneProductValidation.response.results.length === 1, 'single-product validator should keep one result');
assert(oneProductValidation.failures.includes('single_product_returned_many'), 'single-product validator should report quantity failure');

const accidentalLocation = validateAskEmyResponse(
  { intent: 'BUSINESS_ANALYTICS', recordCardsAllowed: false, locationSearchAllowed: false },
  { answer: 'I searched near SL0 9BU within 5 km.', results: [] }
);
assert(accidentalLocation.failures.includes('accidental_location_language'), 'analytics validator should catch accidental location language');

const productSearchLocation = validateAskEmyResponse(
  { intent: 'PRODUCT_SEARCH', recordCardsAllowed: true, locationSearchAllowed: false },
  { answer: 'No product listed near SL0 9BU within 5 km.', results: [], selectedToolName: 'searchProducts' }
);
assert(productSearchLocation.ok === true, 'product search validator should allow saved-area wording');

console.log(JSON.stringify({
  ok: true,
  conversationState: true,
  examplesCovered: 27,
}, null, 2));

'use strict';

const {
  EMY_ASSISTANT_CONTRACT_VERSION,
  LOCATION_CUES,
} = require('./assistant-contract.cjs');
const { parseAnalyticsIntent } = require('./analytics-catalog.cjs');
const { resolveConversationState } = require('./conversation-state.cjs');
const { resolveEmyAction } = require('./action-catalog.cjs');

const COMMAND_TYPO_MAP = {
  busniess: 'business',
  businiess: 'business',
  busnies: 'business',
  bunsiess: 'business',
  buness: 'business',
  busniesses: 'businesses',
  businiesses: 'businesses',
  busnieses: 'businesses',
  bunsiesses: 'businesses',
  bsuniess: 'business',
  buisness: 'business',
  busness: 'business',
  bussiness: 'business',
  cutomer: 'customer',
  cutomers: 'customers',
  custmer: 'customer',
  custmers: 'customers',
  costumer: 'customer',
  costumers: 'customers',
  porudct: 'product',
  porudcts: 'products',
  producs: 'products',
  prodcts: 'products',
  prodcut: 'product',
  prodcuts: 'products',
  tomoato: 'tomato',
  tomoatos: 'tomatoes',
  tomoatoes: 'tomatoes',
  tomatos: 'tomatoes',
  actircle: 'article',
  actircles: 'articles',
  articel: 'article',
  articels: 'articles',
  orpost: 'or post',
  orposts: 'or posts',
  orclip: 'or clip',
  orclips: 'or clips',
  orproduct: 'or product',
  orproducts: 'or products',
  viewd: 'viewed',
  viwed: 'viewed',
  graophts: 'graphs',
  graphts: 'graphs',
  graps: 'graphs',
  anylitic: 'analytic',
  anylitics: 'analytics',
  analitic: 'analytic',
  analitics: 'analytics',
  anlytic: 'analytic',
  anlytics: 'analytics',
  chrt: 'chart',
  chrts: 'charts',
  char: 'chart',
  shw: 'show',
  shiw: 'show',
  shoshow: 'show',
  shwo: 'show',
  showw: 'show',
  llocation: 'location',
};

const RECORD_RESPONSE_TYPES = new Set([
  'small_result_list',
  'full_result_grid',
  'inline_product_view',
  'inline_job_view',
  'inline_clip_view',
  'inline_post_view',
  'comparison_table',
]);

function cleanText(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
}

function normalizeCommandText(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/\bshoe\s+me\b/g, 'show me')
    .replace(/\b[a-z][a-z0-9]*\b/g, (word) => COMMAND_TYPO_MAP[word] || word);
}

function hasAny(text, pattern) {
  return pattern.test(text);
}

function isConversationalFragment(text) {
  const simple = normalizeCommandText(text).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!simple) return false;
  if (/^(and you|in you|you|you then|what about you|how about you|ok|okay|yes|yeah|yep|no|nope|maybe|hmm|hm|huh|what|why|tell me|go on|go ahead)$/.test(simple)) return true;
  const words = simple.split(' ').filter(Boolean);
  if (!words.length || words.length > 3) return false;
  const fragmentWords = new Set(['i', 'me', 'my', 'you', 'your', 'yours', 'we', 'us', 'in', 'on', 'at', 'to', 'for', 'with', 'and', 'or', 'but', 'then', 'ok', 'okay', 'yes', 'no', 'what', 'why']);
  return words.every((word) => fragmentWords.has(word)) && words.some((word) => word === 'you' || word === 'me' || word === 'i' || word === 'what' || word === 'why');
}

function hasExplicitLocationCue(text) {
  if (!text) return false;
  if (LOCATION_CUES.some((cue) => text.includes(cue))) return true;
  return /\b(near|nearby|around|postcode|radius|km|miles|map|directions|route|area|location|close to)\b/.test(text);
}

function hasProductSearchTerm(text) {
  return /\b(products?|items?|listings?|stock|tomatoe?s?)\b/.test(text);
}

function isLocationEvidenceQuestion(text) {
  if (!text) return false;
  const asksEvidence = /\b(how do you know|how can you know|why|what proof|what evidence|prove|proof|are they|are these|are those|do they)\b/.test(text);
  const thirdPartySubject = /\b(they|them|these|those|products?|businesses?|shops?|stores?|cards?|results?|listings?)\b/.test(text);
  const locationSubject = /\b(my location|near me|nearby|at my location|in my area|search area|saved area|postcode|radius|location)\b/.test(text);
  return asksEvidence && thirdPartySubject && locationSubject;
}

function isAnalyticsCapabilityQuestion(text) {
  if (!text) return false;
  const asksCapability = /\b(do you|can you|could you|are you able to|would you|will you)\b/.test(text);
  const analyticsSubject = /\b(analytics?|statistics?|stats?|analysis|analy[sz]e|graphs?|charts?|compar(?:e|ison))\b/.test(text);
  if (!asksCapability || !analyticsSubject) return false;
  const executionCue = /\b(show|open|pull up|give me|list|rank|ranking|top|most|highest|which|what is|how many|over time|by|from|using|my products?|my business|profile views?|product views?|clip views?|post views?)\b/.test(text);
  return !executionCue;
}

function isEmyDailyUpdateQuery(text) {
  if (!text) return false;
  const actionUpdate = /\b(update my|update the|edit|change|create|publish|draft|delete|remove)\b/.test(text)
    && /\b(profile|account|business|product|post|clip|job|image|video|card)\b/.test(text);
  if (actionUpdate) return false;
  return /\b(what'?s new|whats new|what is new)\b/.test(text)
    || /\b(new|latest|recent|today'?s|daily)\b.{0,28}\b(emy|updates?|activity|things?|records?|businesses?|products?|jobs?|clips?|posts?|articles?|events?)\b/.test(text)
    || /\b(emy|platform)\b.{0,28}\b(new|latest|recent|updates?|activity|changed|changes)\b/.test(text)
    || /\b(tell me|give me|show me|bring me|pull up)\b.{0,28}\b(daily update|latest update|today'?s update|recent activity|new activity)\b/.test(text);
}

function isBusinessComparisonQuery(text) {
  if (!text) return false;
  if (hasExplicitLocationCue(text)) return false;
  const businessScope = /\b(my|mine|own|owned|our|all my)\b.{0,40}\bbusinesses\b/.test(text)
    || /\bbusinesses\b.{0,40}\b(my|mine|own|owned|our)\b/.test(text);
  if (!businessScope) return false;
  return /\b(compare|comparison|rank|ranking|top|best|strongest|performing|performance|doing best|by views?|by profile views?|by likes?|by customers?|by content)\b/.test(text);
}

function wantsMediaPreview(text) {
  if (!text) return false;
  if (wantsProfileImageView(text) || wantsCustomerSelfProfileView(text) || wantsOwnedBusinessCard(text)) return false;
  const directMediaCue = /\b(media|images?|photos?|pictures?|previews?|thumbnail|thumbnails|videos?|reels?)\b/.test(text);
  const clipMediaCue = /\bclips?\b/.test(text) && /\b(video|videos|watch|preview|previews|media|thumbnail|thumbnails)\b/.test(text);
  if (!directMediaCue && !clipMediaCue) return false;
  const actionCue = /\b(show|open|view|see|display|preview|watch|bring|pull up|get|give)\b/.test(text);
  const explicitMediaCue = /\b(media preview|image preview|video preview|show images?|show photos?|show videos?|watch clips?|clip videos?|open media|view media)\b/.test(text);
  return actionCue || explicitMediaCue;
}

function wantsProfileImageView(text) {
  if (!text) return false;
  if (/\bprofile views?\b/.test(text)) return false;
  const hasImageCue = /\b(image|photo|picture|avatar)\b/.test(text);
  const hasProfileCue = /\b(profile|account|customer|business|shop|store|company)\b/.test(text);
  const hasAskCue = /\b(show|open|view|see|get|bring|pull up|display)\b/.test(text);
  return hasImageCue && hasProfileCue && hasAskCue;
}

function crossEntityTypesFromText(text) {
  const types = [];
  if (/\b(products?|items?|listings?|stock)\b/.test(text)) types.push('products');
  if (/\b(clips?|videos?|reels?)\b/.test(text)) types.push('clips');
  if (/\b(posts?|updates?|feed|articles?)\b/.test(text)) types.push('posts');
  if (/\b(jobs?|roles?|vacancies?)\b/.test(text)) types.push('jobs');
  return types;
}

function crossEntityNameFromText(text) {
  const types = crossEntityTypesFromText(text);
  return types.length ? types.join('_') : 'content';
}

function isUnsupportedCrossEntityAnalyticsQuestion(text) {
  if (!text) return false;
  const entityTypes = crossEntityTypesFromText(text);
  if (entityTypes.length < 2) return false;
  const hasAnalyticsCue = /\b(analytics?|statistics?|stats?|analysis|analy[sz]e|graphs?|charts?|compar(?:e|ison)|rank|ranking|top|most|highest|views?|likes?|comments?|saves?|engagement|performance)\b/.test(text);
  const hasCrossMetricCue = /\b(from|using|based on|by|via|through|against|versus|vs)\b/.test(text)
    || /\bclip\s+(views?|likes?|comments?|saves?|engagement)\b/.test(text)
    || /\b(video|reel)\s+(views?|likes?|comments?|saves?|engagement)\b/.test(text)
    || /\bpost\s+(views?|likes?|comments?|saves?|engagement)\b/.test(text)
    || /\bproduct\s+(views?|likes?|comments?|saves?|engagement)\b/.test(text);
  const hasCompareChoiceCue = /\b(or|versus|vs|against)\b/.test(text)
    && /\b(what|which|who|more|higher|highest|better|best|wins?|outperform|compare|comparison)\b/.test(text);
  return hasAnalyticsCue && (hasCrossMetricCue || hasCompareChoiceCue);
}

function productMetricFromText(text) {
  if (/\b(like|likes|liked)\b/.test(text)) return 'likes';
  if (/\b(save|saves|saved)\b/.test(text)) return 'saves';
  if (/\b(comment|comments|commented|replies|reply)\b/.test(text)) return 'comments';
  if (/\b(enquiry|enquiries|inquiry|inquiries|message|messages)\b/.test(text)) return 'enquiries';
  if (/\b(engagement|interest|popular|performance)\b/.test(text)) return 'engagement';
  return 'views';
}

function limitFromText(text, fallback = null) {
  const match = text.match(/\btop\s+(\d+)\b/) || text.match(/\bfirst\s+(\d+)\b/) || text.match(/\b(\d+)\s+(?:products?|businesses|jobs?|clips?|posts?)\b/);
  if (!match) return fallback;
  const value = String(match[1]).length > 2 ? 25 : Number(match[1]);
  if (!Number.isFinite(value) || value <= 0) return fallback;
  return Math.min(value, 25);
}

function wantsOneProduct(text, context = {}) {
  if (/\b(?:the\s+)?product\s+(?:is|called|named|titled)\s+\S/.test(text) || /\b(?:the\s+)?product\s*[:=]\s*\S/.test(text)) return false;
  if (/\b(product\s+not\s+products|the product\s+not\s+products|asked\b.{0,50}\bproduct\b.{0,40}\bnot\b.{0,20}\bproducts?)\b/.test(text)) return true;
  if (/\b(the|one|which|what)\s+product\b/.test(text)) return true;
  if (/\b(most viewed product|most liked product|most saved product|most commented product|top product|best product)\b/.test(text)) return true;
  if (context && context.previousIntent === 'PRODUCT_SINGLE_METRIC' && /\b(yes|show it|open it|that one|the product)\b/.test(text)) return true;
  return false;
}

function wantsProductList(text) {
  if (/\b(show|list|display|bring|pull up|see|get|give)\b.{0,40}\b(my|mine|own|owned|business)\b.{0,40}\bproducts?\b/.test(text)) return true;
  if (/\bmy products?\b/.test(text)) return true;
  if (/\b(my|mine|own|owned|business)\b.{0,40}\b(top|rank|ranking|list|compare|comparison|all)\b.{0,40}\bproducts?\b/.test(text)) return true;
  if (/\bproducts?\b.{0,40}\b(my|mine|own|owned|business)\b/.test(text)) return true;
  return false;
}

function wantsOwnedClipList(text) {
  if (/\b(show|list|display|bring|pull up|see|get|give|open|view)\b.{0,50}\b(my|mine|own|owned|business)\b.{0,50}\b(clips?|videos?|reels?)\b/.test(text)) return true;
  if (/\b(my|mine|own|owned|business)\b.{0,50}\b(clips?|videos?|reels?)\b/.test(text)) return true;
  if (/^my\s+(clips?|videos?|reels?)$/.test(text)) return true;
  return false;
}

function wantsOwnedPostList(text) {
  if (/\b(show|list|display|bring|pull up|see|get|give|open|view)\b.{0,50}\b(my|mine|own|owned|business)\b.{0,50}\b(posts?|updates?|feed)\b/.test(text)) return true;
  if (/\b(my|mine|own|owned|business)\b.{0,50}\b(posts?|updates?|feed)\b/.test(text)) return true;
  if (/^my\s+(posts?|updates?|feed)$/.test(text)) return true;
  return false;
}

function wantsOwnedArticleList(text) {
  if (/\b(show|list|display|bring|pull up|see|get|give|open|view|find|search|check)\b.{0,60}\b(my|mine|own|owned|business|business account|my business|own business)\b.{0,60}\b(articles?|blogs?|news)\b/.test(text)) return true;
  if (/\b(my|mine|own|owned|business|business account|my business|own business)\b.{0,60}\b(articles?|blogs?|news)\b/.test(text)) return true;
  if (/^my\s+(articles?|blogs?|news)$/.test(text)) return true;
  if (/^(show|find|search|check)\s+my\s+business\s+(articles?|blogs?|news)$/.test(text)) return true;
  return false;
}

function wantsPublicClipList(text) {
  if (wantsOwnedClipList(text)) return false;
  if (/\b(show|list|display|bring|pull up|see|get|give|open|view|find|search)\b.{0,60}\b(clips?|videos?|reels?)\b/.test(text)) return true;
  if (/\b(clips?|videos?|reels?)\b.{0,60}\b(near|nearby|around|local|all|show|list|find|search)\b/.test(text)) return true;
  return false;
}

function wantsPublicPostList(text) {
  if (wantsOwnedPostList(text)) return false;
  if (/\b(show|list|display|bring|pull up|see|get|give|open|view|find|search)\b.{0,60}\b(posts?|updates?|feed)\b/.test(text)) return true;
  if (/\b(posts?|updates?|feed)\b.{0,60}\b(near|nearby|around|local|all|show|list|find|search)\b/.test(text)) return true;
  return false;
}

function wantsOwnedBusinessCard(text) {
  if (/\b(stat|stats|statistics|analytics|graph|graphs|chart|charts|performance|views?|likes?|comments?|saves?|engagement|data)\b/.test(text)) return false;
  if (/^(open|view)\s+(?:the\s+)?(?:business|shop|store|company)\s+\S/.test(text) && !/\b(my|mine|own|owned|card|profile|page)\b/.test(text)) return false;
  if (/\b(show|open|view|display|bring|pull up|find|get|see)\b.{0,50}\b(my|own|owned|business|shop|store|company)\b.{0,35}\b(card|profile|page|business|shop|store|company)\b/.test(text)) return true;
  if (/\b(my|own|owned)\s+(business|shop|store|company)\s+(card|profile|page)\b/.test(text)) return true;
  if (/\bcan you find my (business|shop|store|company)\b/.test(text)) return true;
  return false;
}

function wantsOwnedBusinessCards(text) {
  if (!text) return false;
  if (/\b(stat|stats|statistics|analytics|graph|graphs|chart|charts|performance|views?|likes?|comments?|saves?|engagement|data)\b/.test(text)) return false;
  const pluralBusiness = /\b(my|own|owned|all my|our)\b.{0,45}\b(businesses|shops|stores|companies)\b.{0,35}\b(cards?|profiles?|pages?)\b/.test(text)
    || /\b(show|open|view|display|bring|pull up|find|get|see)\b.{0,50}\b(all|all my|my|own|owned)\b.{0,30}\b(businesses|shops|stores|companies)\b.{0,35}\b(cards?|profiles?|pages?)\b/.test(text)
    || /\b(show|open|view|display|bring|pull up|find|get|see)\b.{0,50}\b(cards?|profiles?|pages?)\b.{0,35}\b(all|all my|my|own|owned)\b.{0,30}\b(businesses|shops|stores|companies)\b/.test(text);
  return pluralBusiness;
}

function wantsViewerProfileCards(text) {
  if (!text) return false;
  if (/\b(stat|stats|statistics|analytics|graph|graphs|chart|charts|performance|views?|likes?|comments?|saves?|engagement|data)\b/.test(text)) return false;
  const hasCustomer = /\b(customer|personal|viewer)\b/.test(text);
  const hasBusiness = /\b(business|shop|store|company)\b/.test(text);
  const hasCardOrProfile = /\b(cards?|profiles?|accounts?|pages?)\b/.test(text);
  const hasAskCue = /\b(show|open|view|display|bring|pull up|find|get|see)\b/.test(text);
  const hasBothCue = /\b(both|customer and business|business and customer|personal and business|business and personal)\b/.test(text);
  if (hasBothCue && hasCardOrProfile && hasAskCue) return true;
  return hasCustomer && hasBusiness && hasCardOrProfile && (hasAskCue || hasBothCue);
}

function hasExplicitRecordRequest(text) {
  if (!text) return false;
  const recordNoun = hasProductSearchTerm(text) || /\b(businesses?|shops?|stores?|places?|jobs?|roles?|clips?|videos?|reels?|posts?|articles?|services?)\b/.test(text);
  if (!recordNoun) return false;
  if (hasExplicitLocationCue(text) && (hasProductSearchTerm(text) || /\b(shops?|businesses?|stores?|places?|jobs?|services?)\b/.test(text))) return true;
  if (/\b(show|list|display|open|view|search|find|bring|pull up|see|get|give)\b/.test(text)) return true;
  if (/\b(my|own|owned|all)\b.{0,40}\b(products?|posts?|clips?|jobs?|content|items?|listings?|tomatoe?s?)\b/.test(text)) return true;
  if (/\b(i said|i asked|i mean|no no|not that|wrong)\b.{0,80}\bmy\b.{0,30}\b(products?|posts?|clips?|jobs?|content)\b/.test(text)) return true;
  if (/\b(the|one|which|what|most|top|highest|best|strongest)\b.{0,50}\bproduct\b/.test(text)) return true;
  if (/\b(cheap|cheapest|lowest|price|prices|option|options)\b/.test(text)) return true;
  return false;
}

function isCustomerSelfContentQuery(text) {
  if (!text) return false;
  const selfCue = /\b(i|me|my|mine|myself|own|personal|customer[- ]side|customer account)\b/.test(text);
  const customerCue = /\b(customer|client|personal)\b/.test(text);
  const contentCue = /\b(content|posts?|clips?|videos?|profile|account|uploads?|feed|activity|page)\b/.test(text);
  if (selfCue && customerCue && contentCue) return true;
  if (/\b(?:i(?:\s+am|'m)?|im|me|myself)\s+as\s+(?:a\s+)?(?:customer|client)\b/.test(text)) return true;
  if (/\b(?:if\s+)?(?:i(?:\s+am|'m)?|im)\s+(?:the\s+)?(?:customer|client)\b[\s\S]{0,80}\b(content|posts?|clips?|videos?|profile|account|uploads?|feed|activity|page)\b/.test(text)) return true;
  if (/\b(?:show|open|view|search|find|list|bring|pull up)\s+(?:me|myself)\b[\s\S]{0,60}\b(?:customer|client)\b/.test(text)) return true;
  if (/\b(?:no no|not that|wrong|no,?\s*not)\b[\s\S]{0,80}\b(?:me|myself|my customer|customer content|customer profile|customer posts?|customer clips?)\b/.test(text)) return true;
  if (/\b(?:me|myself)\b[\s\S]{0,30}\bmy\s+(?:customer|client)\b/.test(text)) return true;
  return false;
}

function isBusinessCustomerAnalyticsQuery(text) {
  if (!text) return false;
  if (isCustomerSelfContentQuery(text)) return false;
  const customerCue = /\b(customers?|clients?)\b/.test(text);
  if (!customerCue) return false;
  if (/\b(customer account|customer[- ]side|personal customer|my customer posts?|my customer clips?|my customer content|my customer profile)\b/.test(text)) return false;
  if (/\b(customer experience|customer behaviour|customer behavior|customer support|customer service)\b/.test(text)) return false;
  if (/\b(gain|get|attract|increase|grow|more|find|bring|win|improve|boost|reach)\s+(?:more\s+)?(?:customers?|clients?)\b/.test(text)) return false;
  const businessCue = /\b(my|mine|our|own|owned|business|shop|store|company|seller|merchant|as a business|business owner|business account)\b/.test(text);
  const actionCue = /\b(show|list|display|open|view|see|pull up|analyse|analyze|analysis|analytics|stats|statistics|rank|ranking|compare|likes?|views?|comments?|saves?|engagement|activity|all)\b/.test(text);
  return businessCue && actionCue;
}

function wantsCustomerSelfProfileView(text) {
  if (!text) return false;
  if (/\b(business|shop|store|company)\b/.test(text)) return false;
  if (/\b(stats?|statistics|analytics?|graphs?|charts?|performance|profile views?|views? over time)\b/.test(text)) return false;
  if (/\b(show|open|view|see|get|bring|pull up|display)\b.{0,60}\b(my|own|personal|customer|customer-side|customer side)\b.{0,40}\b(profile|account|page|card)\b/.test(text)) return true;
  if (/\b(my|own|personal|customer|customer-side|customer side)\b.{0,40}\b(profile|account|page|card)\b/.test(text)
    && /\b(show|open|view|see|get|bring|pull up|display)\b/.test(text)) return true;
  if (/\b(show|open|view|see|get|bring|pull up|display)\b.{0,60}\bcustomer\s+card\b/.test(text)) return true;
  return false;
}

function customerSelfCountType(text) {
  if (!/\b(how many|count|number of|total)\b/.test(text)) return '';
  if (/\b(clip|clips|video|videos|reel|reels)\b/.test(text)) return 'clips';
  if (/\b(event|events)\b/.test(text)) return 'events';
  if (/\b(article|articles|blog|blogs)\b/.test(text)) return 'articles';
  if (/\b(post|posts|feed|feeds|updates?)\b/.test(text)) return 'posts';
  if (/\b(content|uploads?|activity)\b/.test(text)) return 'content';
  return 'content';
}

function customerSelfAllowsCards(text) {
  if (customerSelfCountType(text)) return false;
  return /\b(show|open|view|search|find|list|bring|pull up|display)\b/.test(text)
    || /\b(customer\s+(content|posts?|clips?|videos?|profile|account|uploads?|feed|activity|page)|my\s+customer\s+(content|posts?|clips?|videos?|profile|account|uploads?|feed|activity|page))\b/.test(text);
}

function classifyIntent(normalizedText, context = {}) {
  const text = normalizeCommandText(normalizedText);
  if (!text) return 'UNKNOWN';

  if (/^(hi|hello|hey|thanks|thank you|good morning|good afternoon|good evening)\b/.test(text)) return 'CHAT';
  if (isConversationalFragment(text)) return 'CHAT';
  if (/\b(who am i|who i am|do you know who i am|do you know me|know me)\b/.test(text)) return 'IDENTITY';
  if (/\b(tell me about my account|account details|account information|my account)\b/.test(text)) return 'ACCOUNT';
  if (isLocationEvidenceQuestion(text)) return 'CHAT';
  if (isAnalyticsCapabilityQuestion(text)) return 'CHAT';
  if (isEmyDailyUpdateQuery(text)) return 'DAILY_UPDATE';
  if (isBusinessComparisonQuery(text)) return 'BUSINESS_COMPARISON';
  if (isUnsupportedCrossEntityAnalyticsQuestion(text)) return 'CROSS_ENTITY_ANALYTICS';
  if (/\b(my|me|i|customer|as a customer|customer account)\b.{0,70}\b(location|postcode|gps|where i am|search area|saved area)\b/.test(text)) return 'VIEWER_LOCATION';
  if (wantsViewerProfileCards(text)) return 'PROFILE_CARDS';
  if (wantsProfileImageView(text)) return 'CUSTOMER_PROFILE';
  if (wantsCustomerSelfProfileView(text)) return 'CUSTOMER_PROFILE';
  if (wantsMediaPreview(text)) return 'MEDIA_PREVIEW';
  const actionIntent = context.actionIntent && typeof context.actionIntent === 'object'
    ? context.actionIntent
    : resolveEmyAction(text, context);
  if (actionIntent.confidence >= 0.7 && actionIntent.mode === 'create') return 'CREATE_DRAFT';
  if (actionIntent.confidence >= 0.7 && actionIntent.mode === 'open' && /\b(open|view|open here|view here|show it here|show this here|show that here|inside the box)\b/.test(text)) return 'OPEN_ITEM';
  if (/\b(what do i do|what should i do|help me|where do i start|next step|guide me)\b/.test(text)) return 'GUIDANCE';
  if (isBusinessCustomerAnalyticsQuery(text)) return 'BUSINESS_CUSTOMERS';
  if (isCustomerSelfContentQuery(text)) return 'CUSTOMER_SELF_CONTENT';
  if (wantsOwnedClipList(text)) return 'CLIP_LIST';
  if (wantsOwnedArticleList(text)) return 'ARTICLE_LIST';
  if (wantsOwnedPostList(text)) return 'POST_LIST';
  if (wantsOwnedBusinessCards(text)) return 'BUSINESS_PROFILE_LIST';
  if (wantsOwnedBusinessCard(text)) return 'BUSINESS_PROFILE';
  if (wantsPublicClipList(text)) return 'CLIP_SEARCH';
  if (wantsPublicPostList(text)) return 'POST_SEARCH';

  const analyticsIntent = context.analyticsIntent && typeof context.analyticsIntent === 'object'
    ? context.analyticsIntent
    : parseAnalyticsIntent(text, context);
  if (analyticsIntent.confidence >= 0.7) {
    if (analyticsIntent.entity === 'product' || analyticsIntent.quantity === 'one') return 'PRODUCT_SINGLE_METRIC';
    if (analyticsIntent.entity === 'products') return 'PRODUCT_LIST_METRIC';
    return 'BUSINESS_ANALYTICS';
  }

  if (/\b(stat|stats|statistics|analytics|graph|graphs|chart|charts|performance|views|profile views|compare chart|bar chart|line chart)\b/.test(text)) {
    if (/\bproducts?\b/.test(text) || context.activeEntity === 'products') return wantsOneProduct(text, context) ? 'PRODUCT_SINGLE_METRIC' : 'PRODUCT_LIST_METRIC';
    return 'BUSINESS_ANALYTICS';
  }

  if (actionIntent.confidence >= 0.7) {
    if (actionIntent.mode === 'create') return 'CREATE_DRAFT';
    if (actionIntent.mode === 'open') return 'OPEN_ITEM';
    if (actionIntent.mode === 'compare') return 'COMPARE';
  }

  if (hasProductSearchTerm(text)) {
    if (wantsOneProduct(text, context)) return 'PRODUCT_SINGLE_METRIC';
    if (wantsProductList(text)) return 'PRODUCT_LIST';
    if (/\b(i need|need|want|i want|help me|how do i|how can i)\b/.test(text) && !hasExplicitRecordRequest(text)) return 'GUIDANCE';
    return hasExplicitLocationCue(text) ? 'SEARCH_NEARBY' : 'PRODUCT_SEARCH';
  }

  if (context.activeEntity === 'products' && /\b(cheap|cheapest|lowest|price|prices|option|options|fresh|cherry|plants?|search|find|get|show)\b/.test(text)) {
    return 'PRODUCT_SEARCH';
  }

  if (/\b(open it|open this|show it here|open here|view it)\b/.test(text)) return 'OPEN_ITEM';
  if (/\b(compare|comparison)\b/.test(text)) return 'COMPARE';
  if (hasExplicitLocationCue(text) && /\b(shop|shops|business|businesses|stores?|places?|jobs?|products?|services?)\b/.test(text)) return 'SEARCH_NEARBY';
  if (/\b(shop|shops|business|businesses|stores?|places?)\b/.test(text)) return 'SEARCH_NEARBY';
  return 'UNKNOWN';
}

function entityFromIntent(intent, text) {
  if (intent === 'DAILY_UPDATE') return 'emy_update';
  if (intent === 'CROSS_ENTITY_ANALYTICS') return crossEntityNameFromText(text);
  if (intent === 'BUSINESS_COMPARISON') return 'businesses';
  if (intent === 'MEDIA_PREVIEW') {
    const types = crossEntityTypesFromText(text);
    return types.length ? types.join('_') : 'media';
  }
  if (intent === 'CUSTOMER_PROFILE') return 'customer-profile';
  if (intent === 'PROFILE_CARDS') return 'viewer_profiles';
  if (intent === 'BUSINESS_CUSTOMERS') return 'business_customers';
  if (intent === 'BUSINESS_PROFILE_LIST') return 'businesses';
  if (intent === 'CUSTOMER_SELF_CONTENT') return 'viewer_customer_content';
  if (intent === 'CLIP_LIST') return 'clips';
  if (intent === 'ARTICLE_LIST') return 'articles';
  if (intent === 'POST_LIST') return 'posts';
  if (intent === 'CLIP_SEARCH') return 'clips';
  if (intent === 'POST_SEARCH') return 'posts';
  if (intent === 'BUSINESS_PROFILE') return 'business';
  if (hasProductSearchTerm(text)) return /\b(product|tomato)\b/.test(text) && !/\b(products|tomatoes|tomatos)\b/.test(text) ? 'product' : 'products';
  if (/\bjobs?\b/.test(text)) return 'jobs';
  if (/\bclips?\b/.test(text)) return 'clips';
  if (/\bposts?\b/.test(text)) return 'posts';
  if (/PRODUCT/.test(intent)) return /\bproduct\b/.test(text) && !/\bproducts\b/.test(text) ? 'product' : 'products';
  if (intent === 'BUSINESS_ANALYTICS' || /\bbusiness(?:es)?\b/.test(text) || /\bshops?\b/.test(text)) return /\bbusinesses\b|\bshops\b/.test(text) ? 'businesses' : 'business';
  if (intent === 'VIEWER_LOCATION' || intent === 'ACCOUNT' || intent === 'IDENTITY') return 'viewer';
  return 'unknown';
}

function quantityFromIntent(intent, text) {
  if (intent === 'DAILY_UPDATE') return 'list';
  if (intent === 'CROSS_ENTITY_ANALYTICS') return 'list';
  if (intent === 'BUSINESS_COMPARISON') return 'list';
  if (intent === 'MEDIA_PREVIEW') return 'list';
  if (intent === 'CUSTOMER_PROFILE') return 'one';
  if (intent === 'PROFILE_CARDS') return 'list';
  if (intent === 'BUSINESS_CUSTOMERS') return 'list';
  if (intent === 'BUSINESS_PROFILE_LIST') return 'list';
  if (intent === 'CUSTOMER_SELF_CONTENT') return customerSelfCountType(text) ? 'count' : 'list';
  if (intent === 'CLIP_LIST') return 'list';
  if (intent === 'ARTICLE_LIST') return 'list';
  if (intent === 'POST_LIST') return 'list';
  if (intent === 'CLIP_SEARCH' || intent === 'POST_SEARCH') return 'list';
  if (intent === 'BUSINESS_PROFILE') return 'one';
  if (intent === 'PRODUCT_SINGLE_METRIC') return 'one';
  if (intent === 'PRODUCT_LIST_METRIC' || intent === 'PRODUCT_LIST' || /\b(all|top|list|rank|compare)\b/.test(text)) return 'list';
  return 'unspecified';
}

function responseTypeForPlan(intent, entity, quantity, locationAllowed) {
  if (intent === 'DAILY_UPDATE') return 'small_result_list';
  if (intent === 'CROSS_ENTITY_ANALYTICS') return 'analytics_chart';
  if (intent === 'BUSINESS_COMPARISON') return 'analytics_chart';
  if (intent === 'MEDIA_PREVIEW') return 'small_result_list';
  if (intent === 'CUSTOMER_PROFILE') return 'small_result_list';
  if (intent === 'PROFILE_CARDS') return 'small_result_list';
  if (intent === 'BUSINESS_CUSTOMERS') return 'analytics_chart';
  if (intent === 'BUSINESS_PROFILE_LIST') return 'small_result_list';
  if (intent === 'CUSTOMER_SELF_CONTENT') return quantity === 'count' ? 'chat_answer' : 'small_result_list';
  if (intent === 'CLIP_LIST' || intent === 'ARTICLE_LIST' || intent === 'POST_LIST' || intent === 'BUSINESS_PROFILE') return 'small_result_list';
  if (intent === 'CLIP_SEARCH' || intent === 'POST_SEARCH') return 'small_result_list';
  if (intent === 'PRODUCT_SINGLE_METRIC') return 'inline_product_view';
  if (intent === 'PRODUCT_LIST' || intent === 'PRODUCT_SEARCH') return 'small_result_list';
  if (intent === 'PRODUCT_LIST_METRIC' || intent === 'BUSINESS_ANALYTICS') return 'analytics_chart';
  if (intent === 'SEARCH_NEARBY') return locationAllowed ? 'small_result_list' : 'chat_answer';
  if (intent === 'GUIDANCE') return 'guidance_steps';
  if (intent === 'CREATE_DRAFT') return 'draft_preview';
  if (intent === 'OPEN_ITEM') return entity === 'products' || entity === 'product' ? 'inline_product_view' : 'small_result_list';
  if (intent === 'COMPARE') return 'comparison_table';
  return 'chat_answer';
}

function cardsAllowedForPlan(intent, responseType, text = '') {
  if (intent === 'IDENTITY' || intent === 'ACCOUNT' || intent === 'VIEWER_LOCATION' || intent === 'GUIDANCE' || intent === 'CHAT') return false;
  if (intent === 'DAILY_UPDATE') return RECORD_RESPONSE_TYPES.has(responseType);
  if (intent === 'CROSS_ENTITY_ANALYTICS') return false;
  if (intent === 'BUSINESS_COMPARISON') return false;
  if (intent === 'MEDIA_PREVIEW') return RECORD_RESPONSE_TYPES.has(responseType);
  if (intent === 'BUSINESS_CUSTOMERS') return true;
  if (intent === 'BUSINESS_PROFILE_LIST') return RECORD_RESPONSE_TYPES.has(responseType);
  if (intent === 'CUSTOMER_PROFILE') return RECORD_RESPONSE_TYPES.has(responseType);
  if (intent === 'PROFILE_CARDS') return RECORD_RESPONSE_TYPES.has(responseType);
  if (intent === 'CLIP_LIST' || intent === 'ARTICLE_LIST' || intent === 'POST_LIST' || intent === 'BUSINESS_PROFILE') return RECORD_RESPONSE_TYPES.has(responseType);
  if (intent === 'CLIP_SEARCH' || intent === 'POST_SEARCH') return RECORD_RESPONSE_TYPES.has(responseType) && hasExplicitRecordRequest(text);
  if (intent === 'CUSTOMER_SELF_CONTENT') return RECORD_RESPONSE_TYPES.has(responseType);
  if (intent === 'PRODUCT_SEARCH') return RECORD_RESPONSE_TYPES.has(responseType) && (hasExplicitRecordRequest(text) || /\b(cheap|cheapest|lowest|price|prices|option|options|fresh|cherry|plants?|search|find|get|show)\b/.test(text));
  return RECORD_RESPONSE_TYPES.has(responseType);
}

function planAskEmyMessage(query, context = {}) {
  const clean = cleanText(query);
  const conversationState = resolveConversationState(clean, context);
  const planningText = conversationState.effectiveQuery || clean;
  const normalizedText = normalizeCommandText(planningText);
  const plannerContext = {
    ...context,
    activeDomain: conversationState.activeDomain || context.activeDomain,
    activeEntity: conversationState.activeEntity || context.activeEntity,
    activeMetric: conversationState.activeMetric || context.activeMetric,
    previousIntent: conversationState.previousIntent || context.previousIntent,
    pendingQuestion: conversationState.pendingQuestion || context.pendingQuestion,
  };
  const analyticsIntent = parseAnalyticsIntent(normalizedText, plannerContext);
  const actionIntent = resolveEmyAction(normalizedText, plannerContext);
  const intent = classifyIntent(normalizedText, { ...plannerContext, analyticsIntent, actionIntent });
  const isActionPlan = ['CREATE_DRAFT', 'OPEN_ITEM', 'COMPARE'].includes(intent) && actionIntent.confidence >= 0.7;
  const actionEntity = isActionPlan && actionIntent.target ? actionIntent.target : '';
  const entity = actionEntity || (intent === 'CROSS_ENTITY_ANALYTICS' ? crossEntityNameFromText(normalizedText) : (
    intent === 'BUSINESS_CUSTOMERS'
      ? entityFromIntent(intent, normalizedText)
      :
    analyticsIntent.confidence >= 0.7 && analyticsIntent.entity && analyticsIntent.entity !== 'unknown'
      ? analyticsIntent.entity
      : entityFromIntent(intent, normalizedText)
  ));
  const metric = analyticsIntent.confidence >= 0.7 && analyticsIntent.metric && analyticsIntent.metric !== 'unknown'
    ? (intent === 'BUSINESS_CUSTOMERS' ? 'views' : analyticsIntent.metric)
    : intent === 'CROSS_ENTITY_ANALYTICS' || /PRODUCT_(?:SINGLE|LIST)_METRIC/.test(intent) ? productMetricFromText(normalizedText) : /\bviews?\b/.test(normalizedText) ? 'views' : null;
  const quantity = analyticsIntent.confidence >= 0.7 && analyticsIntent.quantity
    ? analyticsIntent.quantity
    : quantityFromIntent(intent, normalizedText);
  const locationSearchAllowed = intent === 'SEARCH_NEARBY' && hasExplicitLocationCue(normalizedText)
    || intent === 'CLIP_SEARCH'
    || intent === 'POST_SEARCH';
  const baseResponseType = responseTypeForPlan(intent, entity, quantity, locationSearchAllowed);
  const responseType = isActionPlan && actionIntent.responseType
    ? actionIntent.responseType
    : baseResponseType;
  const recordCardsAllowed = isActionPlan
    ? Boolean(actionIntent.cardsAllowed)
    : cardsAllowedForPlan(intent, responseType, normalizedText);

  return {
    contractVersion: EMY_ASSISTANT_CONTRACT_VERSION,
    clean,
    planningText,
    normalizedText,
    resolvedFollowUp: conversationState.resolvedFollowUp,
    followUpResolution: conversationState.followUpResolution,
    activeDomain: conversationState.activeDomain || '',
    intent,
    entity,
    metric,
    quantity,
    limit: analyticsIntent.confidence >= 0.7 && analyticsIntent.limit ? analyticsIntent.limit : limitFromText(normalizedText, quantity === 'list' ? 8 : null),
    analyticsIntent: analyticsIntent.intent || 'unknown',
    analyticsEntity: analyticsIntent.entity || 'unknown',
    analyticsMetric: analyticsIntent.metric || 'unknown',
    analyticsGroupBy: analyticsIntent.group_by || '',
    analyticsChartType: analyticsIntent.chart_type || 'auto',
    analyticsScope: analyticsIntent.scope || '',
    analyticsConfidence: Number(analyticsIntent.confidence) || 0,
    requiresTimeSeries: Boolean(analyticsIntent.requires_time_series),
    requiresMultipleBusinesses: Boolean(analyticsIntent.requires_multiple_businesses),
    actionIntent: actionIntent.intent || 'unknown',
    actionMode: actionIntent.mode || 'unknown',
    actionTarget: actionIntent.target || '',
    actionScope: actionIntent.scope || '',
    actionLabel: actionIntent.label || '',
    actionUrl: actionIntent.url || '',
    actionResponseType: actionIntent.responseType || '',
    actionUsesExistingView: Boolean(actionIntent.usesExistingView),
    actionRequiresConfirmation: Boolean(actionIntent.requiresConfirmation),
    actionDraftFields: Array.isArray(actionIntent.draftFields) ? actionIntent.draftFields : [],
    actionConfidence: Number(actionIntent.confidence) || 0,
    locationSearchAllowed,
    recordCardsAllowed,
    responseType,
    toolHint: toolHintForPlan(intent, entity, metric, quantity, locationSearchAllowed, isActionPlan ? actionIntent : null),
  };
}

function toolHintForPlan(intent, entity, metric, quantity, locationSearchAllowed, actionIntent = null) {
  if (actionIntent && actionIntent.confidence >= 0.7 && actionIntent.toolHint) return actionIntent.toolHint;
  if (intent === 'IDENTITY') return 'getViewerAccount';
  if (intent === 'ACCOUNT') return 'getViewerAccount';
  if (intent === 'VIEWER_LOCATION') return 'getViewerLocation';
  if (intent === 'DAILY_UPDATE') return 'getDailyEmyUpdate';
  if (intent === 'GUIDANCE') return 'guideNextStep';
  if (intent === 'PROFILE_CARDS') return 'getViewerProfileCards';
  if (intent === 'CUSTOMER_PROFILE') return 'getCustomerProfileCard';
  if (intent === 'MEDIA_PREVIEW') return 'getMediaPreview';
  if (intent === 'BUSINESS_COMPARISON') return 'getMultiBusinessComparison';
  if (intent === 'BUSINESS_CUSTOMERS') return 'getBusinessCustomersAnalytics';
  if (intent === 'BUSINESS_PROFILE_LIST') return 'getOwnedBusinessCards';
  if (intent === 'CUSTOMER_SELF_CONTENT') return 'getCustomerSelfContent';
  if (intent === 'CLIP_LIST') return 'getOwnedClips';
  if (intent === 'ARTICLE_LIST') return 'getOwnedArticles';
  if (intent === 'POST_LIST') return 'getOwnedPosts';
  if (intent === 'CLIP_SEARCH' || intent === 'POST_SEARCH') return 'searchNearby';
  if (intent === 'BUSINESS_PROFILE') return 'getOwnedBusinessCard';
  if (intent === 'PRODUCT_LIST') return 'getOwnedProducts';
  if (intent === 'PRODUCT_SEARCH') return 'searchProducts';
  if (intent === 'CROSS_ENTITY_ANALYTICS') return 'compareContentViews';
  if (intent === 'PRODUCT_SINGLE_METRIC') return metric === 'views' ? 'getMostViewedProduct' : 'getTopProductByMetric';
  if (intent === 'PRODUCT_LIST_METRIC') return 'getTopProductsAnalytics';
  if (intent === 'BUSINESS_ANALYTICS') return 'getBusinessStatsOverview';
  if (intent === 'SEARCH_NEARBY' && locationSearchAllowed) return 'searchNearby';
  if (intent === 'CREATE_DRAFT') return 'createDraft';
  if (intent === 'OPEN_ITEM') return 'openInlineView';
  if (intent === 'COMPARE') return 'compareItems';
  return 'answerDirectly';
}

module.exports = {
  COMMAND_TYPO_MAP,
  cleanText,
  normalizeCommandText,
  hasExplicitLocationCue,
  hasExplicitRecordRequest,
  hasProductSearchTerm,
  classifyIntent,
  isConversationalFragment,
  isUnsupportedCrossEntityAnalyticsQuestion,
  planAskEmyMessage,
};

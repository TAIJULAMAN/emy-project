'use strict';

function cleanStateText(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
}

function normalizeStateText(value) {
  return cleanStateText(value)
    .toLowerCase()
    .replace(/\bshoe\s+me\b/g, 'show me')
    .replace(/\bporudcts\b/g, 'products')
    .replace(/\btomoato\b/g, 'tomato')
    .replace(/\btomoatos\b/g, 'tomatoes')
    .replace(/\btomoatoes\b/g, 'tomatoes')
    .replace(/\btomatos\b/g, 'tomatoes')
    .replace(/\bviewd\b/g, 'viewed')
    .replace(/\bgraophts?\b/g, 'graphs')
    .replace(/\bgraphts?\b/g, 'graphs')
    .replace(/\bllocation\b/g, 'location')
    .replace(/\bbusniess\b/g, 'business')
    .replace(/\bbusiniess\b/g, 'business')
    .replace(/\bbusnies\b/g, 'business')
    .replace(/\bbunsiess\b/g, 'business')
    .replace(/\bbuness\b/g, 'business')
    .replace(/\bbsuniess\b/g, 'business')
    .replace(/\bbuisness\b/g, 'business')
    .replace(/\bbusness\b/g, 'business')
    .replace(/\bbussiness\b/g, 'business')
    .replace(/\bbusnieses\b/g, 'businesses')
    .replace(/\bbunsiesses\b/g, 'businesses')
    .replace(/\bcutomer\b/g, 'customer')
    .replace(/\bcutomers\b/g, 'customers')
    .replace(/\bcustmer\b/g, 'customer')
    .replace(/\bcustmers\b/g, 'customers')
    .replace(/\bcostumer\b/g, 'customer')
    .replace(/\bcostumers\b/g, 'customers')
    .replace(/\bshoshow\b/g, 'show')
    .replace(/\bshwo\b/g, 'show')
    .replace(/\bshoww\b/g, 'show')
    .replace(/\baswell\b/g, 'as well');
}

function historyTextFromContext(context = {}) {
  if (typeof context.historyText === 'string') return cleanStateText(context.historyText);
  if (Array.isArray(context.history)) {
    return context.history
      .map((item) => cleanStateText(item && (item.text || item.answer || item.content || item.message)))
      .filter(Boolean)
      .slice(-8)
      .join(' ');
  }
  return '';
}

function stateFromHistory(historyText = '') {
  const history = normalizeStateText(historyText);
  const hasCustomerSelfHistory = /\b(customer[- ]side content|customer[- ]side cards|matching customer[- ]side|customer posts?|customer clips?|customer profile|customer account)\b/.test(history);
  const activeDomain = hasCustomerSelfHistory
    ? 'customer-self'
    : /\b(stats?|statistics|analytics|charts?|graphs?|views?|performance|product interest|top products?|most viewed product)\b/.test(history)
    ? 'analytics'
    : /\b(products?|items?|listings?|tomatoe?s?)\b/.test(history)
      ? 'products'
      : '';
  const activeEntity = hasCustomerSelfHistory ? 'customer-content'
    : /\b(products?|items?|listings?|tomatoe?s?|most viewed product|product interest|product statistics)\b/.test(history) ? 'products'
    : /\b(jobs?|applications?|applicants?)\b/.test(history) ? 'jobs'
      : /\b(clips?|videos?)\b/.test(history) ? 'clips'
        : /\b(posts?|articles?)\b/.test(history) ? 'posts'
          : /\b(business(?:es)?|profile views?)\b/.test(history) ? 'business'
            : '';
  const activeMetric = /\bprofile views?\b/.test(history) ? 'profile_views'
    : /\bapplications?|applicants?\b/.test(history) ? 'applications'
      : /\blikes?\b/.test(history) ? 'likes'
        : /\bcomments?|replies\b/.test(history) ? 'comments'
          : /\bsaves?\b/.test(history) ? 'saves'
            : /\bviews?|viewed\b/.test(history) ? 'views'
              : '';
  const pendingQuestion = /show your statistics here, explain what the stats mean|what do you want to do with the statistics|check one specific metric/.test(history)
    ? { type: 'stats_clarification', options: ['show_statistics', 'explain_statistics', 'specific_metric'] }
    : null;
  const previousIntent = /\b(most viewed product|top product|product not products|the product not products|show me the product)\b/.test(history)
    ? 'PRODUCT_SINGLE_METRIC'
    : '';
  return {
    activeDomain,
    activeEntity,
    activeMetric,
    pendingQuestion,
    previousIntent,
  };
}

function isAffirmativeFollowUp(value) {
  const text = normalizeStateText(value).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
  return /^(yes|yeah|yep|yea|ok|okay|sure|please|pls|plz|do it|do it then|show me|show it|show them|go on|continue)(?: please)?$/.test(text);
}

function isShortFollowUp(value) {
  const text = normalizeStateText(value).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return false;
  return text.split(' ').length <= 4;
}

function isExplicitMapOrLocationRequest(value) {
  const text = normalizeStateText(value).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return false;
  const hasMapOrLocation = /\b(my location|saved location|search location|current location|where i am|where am i|gps|radius|postcode|map|maps|directions?|route)\b/.test(text);
  const hasRequestCue = /\b(show|open|view|display|see|tell|where|what|find|search|map|maps|directions?|route)\b/.test(text);
  return hasMapOrLocation && hasRequestCue;
}

function statsFollowUpMetric(value) {
  const text = normalizeStateText(value);
  if (/\bprofile views?\b/.test(text)) return { metric: 'profile_views', entity: 'business' };
  if (/\bproduct views?\b/.test(text)) return { metric: 'views', entity: 'products' };
  if (/\bapplications?|applicants?\b/.test(text)) return { metric: 'applications', entity: 'jobs' };
  if (/\blikes?\b|\bliked\b/.test(text)) return { metric: 'likes', entity: '' };
  if (/\bcomments?|replies\b/.test(text)) return { metric: 'comments', entity: '' };
  if (/\bsaves?|saved\b/.test(text)) return { metric: 'saves', entity: '' };
  if (/\bviews?|viewed\b/.test(text)) return { metric: 'views', entity: '' };
  if (/\bengagement|interest|popular\b/.test(text)) return { metric: 'engagement', entity: '' };
  return null;
}

function statsMetricQuery(metric, state = {}, entity = '') {
  const targetEntity = entity || state.activeEntity || '';
  if (targetEntity === 'products') return metric === 'engagement' ? 'show top products by engagement' : `show top products by ${metric}`;
  if (targetEntity === 'jobs') return `show jobs by ${metric}`;
  if (metric === 'profile_views') return 'show my profile views statistics';
  return `show my business ${metric} statistics`;
}

function statsClarificationFollowUp(query, state = {}) {
  if (!state.pendingQuestion || state.pendingQuestion.type !== 'stats_clarification') return null;
  const text = normalizeStateText(query);
  if (!text) return null;
  if (isAffirmativeFollowUp(text) || /^(show|show here|show it|show it here|show statistics|show stats|statistics|stats|here)$/.test(text)) {
    return { effectiveQuery: 'show my business statistics', resolution: 'show_statistics' };
  }
  if (/^(explain|explain it|explain them|explain statistics|explain stats|what does it mean|what do they mean|what means|meaning|i do not understand|i don't understand|dont understand|break it down)$/.test(text)) {
    return { effectiveQuery: 'explain my business statistics', resolution: 'explain_statistics' };
  }
  const metric = statsFollowUpMetric(text);
  if (metric) {
    return {
      effectiveQuery: statsMetricQuery(metric.metric, state, metric.entity),
      resolution: `specific_metric:${metric.metric}`,
    };
  }
  return null;
}

function businessNameFromOpenOffer(historyText = '') {
  const raw = String(historyText == null ? '' : historyText);
  const text = cleanStateText(raw);
  const hasOpenOffer = /\b(open|opening|opened)\b/i.test(text);
  const hasShowSellOffer = /\bshow\b/i.test(text) && /\bsells?\b/i.test(text);
  if (!hasOpenOffer) return '';

  const directOpenQuestion = text.match(/\b(?:want me to|would you like me to|shall i|should i|can i|i can)\s+open\s+([a-z0-9][a-z0-9 &.'-]{1,80}?)(?:\s+for you)?(?:\?|\.|$)/i);
  if (directOpenQuestion && directOpenQuestion[1]) {
    const candidate = cleanStateText(directOpenQuestion[1]).replace(/[.!?]+$/g, '');
    if (candidate && !/^(it|this|that|them|those|one)$/i.test(candidate) && !/\b(or|show|tell|sell|sells|selling)\b/i.test(candidate)) return candidate;
  }

  if (!hasShowSellOffer) return '';

  const openingThenOffer = text.match(/\b(?:opening|opened)\s+([a-z0-9][a-z0-9 &.'-]{1,80}?)(?:\.|$)[\s\S]{0,180}\bshow\b[\s\S]{0,90}\bsells?\b/i);
  if (openingThenOffer && openingThenOffer[1]) {
    const candidate = cleanStateText(openingThenOffer[1]).replace(/[.!?]+$/g, '');
    if (candidate && !/^(it|this|that|them|those|one)$/i.test(candidate)) return candidate;
  }

  const directMatches = Array.from(text.matchAll(/\bopen\s+([a-z0-9][a-z0-9 &.'-]{1,80}?)(?:\s+or\s+show\b|\s+or\s+tell\b|\?|$)/gi));
  for (const direct of directMatches) {
    const candidate = cleanStateText(direct && direct[1]).replace(/[.!?]+$/g, '');
    if (candidate && !/^(it|this|that|them|those|one)$/i.test(candidate)) return candidate;
  }

  const namedThenOffer = text.match(/^([A-Z0-9][A-Z0-9 &.'-]{1,80})\.\s+(?:If you want,\s*)?I can open it or show/i);
  if (namedThenOffer && namedThenOffer[1]) return cleanStateText(namedThenOffer[1]).replace(/[.!?]+$/g, '');

  const lines = raw.split(/\r?\n/).map(cleanStateText).filter(Boolean);
  const offerIndex = lines.findIndex((line) => /\bopen\b/i.test(line) && /\bshow\b/i.test(line) && /\bsells?\b/i.test(line));
  const candidate = offerIndex > 0 ? lines[offerIndex - 1] : lines[0] || '';
  if (/^[A-Z0-9][A-Z0-9 &.'-]{1,80}\.?$/.test(candidate) && !/\b(open|show|want|sure|yes|alright)\b/i.test(candidate)) {
    return cleanStateText(candidate).replace(/[.!?]+$/g, '');
  }

  return '';
}

function openOrShowBusinessOfferFollowUp(query, historyText = '') {
  const text = normalizeStateText(query).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return null;
  const businessName = businessNameFromOpenOffer(historyText);
  if (!businessName) return null;
  const wantsSecondChoice = /^(2|two|second|second one|option 2|option two|the second|the second one|show|show me|show it|tell me|what it sells|what they sell|what does it sell|what do they sell|what sells)\b/.test(text);
  const wantsFirstChoice = /^(1|one|first|first one|option 1|option one|the first|the first one|open|open it|open this|open that)\b/.test(text);
  if (wantsSecondChoice) {
    return {
      effectiveQuery: `show products from ${businessName}`,
      resolution: 'show_offered_business_products',
    };
  }
  if (wantsFirstChoice || isAffirmativeFollowUp(text) || /^(go ahead|do it)\b/.test(text)) {
    return {
      effectiveQuery: `open business ${businessName}`,
      resolution: 'open_offered_business',
    };
  }
  return null;
}

function customerSelfContentFollowUp(query, historyText = '') {
  const text = normalizeStateText(query).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return null;
  const explicitBusinessProfileRequest = /\b(show|open|view|display|bring|pull up|find|get|see)\b.{0,50}\b(my|own|owned|business)\b.{0,40}\b(business|shop|store|company)\b.{0,35}\b(card|profile|page|account)\b/.test(text)
    || /\b(my|own|owned)\s+(business|shop|store|company)\s+(card|profile|page|account)\b/.test(text)
    || /\bbusiness\s+card\b/.test(text);
  if (explicitBusinessProfileRequest) return null;
  const history = normalizeStateText(historyText);
  const hasCustomerContext = /\b(customer[- ]side content|customer[- ]side cards|matching customer[- ]side|customer posts?|customer clips?|customer profile|customer account|business-customer relationships?)\b/.test(history);
  if (!hasCustomerContext) return null;
  const wantsShow = /^(show|show me|show them|show those|show it|open|open them|open those|display|display them|bring|bring them|pull|pull them|yes|yeah|yep|ok|okay|sure|do it|go ahead|as well)\b/.test(text)
    || /\b(show|open|display|bring|pull up)\b.{0,30}\b(them|those|it|customer posts?|customer clips?|customer content)\b/.test(text);
  if (!wantsShow) return null;
  if (/\bclips?|videos?|reels?\b/.test(text)) {
    return { effectiveQuery: 'show my customer clips', resolution: 'show_customer_clips_follow_up' };
  }
  if (/\bposts?|feed|updates?\b/.test(text)) {
    return { effectiveQuery: 'show my customer posts', resolution: 'show_customer_posts_follow_up' };
  }
  if (/\bclips?|videos?|reels?\b/.test(history) && !/\bposts?|feed|updates?\b/.test(history)) {
    return { effectiveQuery: 'show my customer clips', resolution: 'show_customer_clips_follow_up' };
  }
  if (/\bposts?|feed|updates?\b/.test(history)) {
    return { effectiveQuery: 'show my customer posts', resolution: 'show_customer_posts_follow_up' };
  }
  return { effectiveQuery: 'show my customer content', resolution: 'show_customer_content_follow_up' };
}

function customerProfileCardFollowUp(query, historyText = '') {
  const text = normalizeStateText(query).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return null;
  if (/\b(business|shop|store|company)\b/.test(text)) return null;
  const history = normalizeStateText(historyText);
  const hasCustomerContext = /\b(customer[- ]side content|customer[- ]side cards|matching customer[- ]side|customer posts?|customer clips?|customer profile|customer account|business-customer relationships?)\b/.test(history);
  const askedCustomerProfileQuestion = /\b(do you want|want|would you like)\b.{0,50}\bcustomer\s+(profile|card|account|page)\b/.test(history)
    || /\bcustomer\s+(profile|card|account|page)\s*\?/.test(history);
  const explicitCustomerProfileRequest = /\b(show|open|view|display|bring|pull up|find|get|see)\b.{0,60}\b(my|own|personal|customer|customer side|customer-side)\b.{0,45}\b(card|profile|account|page)\b/.test(text)
    || /\b(my|own|personal|customer|customer side|customer-side)\b.{0,45}\b(card|profile|account|page)\b/.test(text) && /\b(show|open|view|display|bring|pull up|find|get|see)\b/.test(text)
    || /\bcustomer\s+(card|profile|account|page)\b/.test(text);
  if (explicitCustomerProfileRequest) {
    const wantsImage = /\b(image|photo|picture|avatar)\b/.test(text);
    return { effectiveQuery: wantsImage ? 'show my customer profile image' : 'show my customer profile card', resolution: 'show_customer_profile_follow_up' };
  }
  if (askedCustomerProfileQuestion && (isAffirmativeFollowUp(text) || /^(profile|card|account|page|customer profile|customer card|show it|open it|show profile|open profile|show card|open card)$/.test(text))) {
    return { effectiveQuery: 'show my customer profile card', resolution: 'show_customer_profile_follow_up' };
  }
  if (hasCustomerContext && /^(profile|card|account|page|customer profile|customer card|show profile|open profile|show card|open card)$/.test(text)) {
    return { effectiveQuery: 'show my customer profile card', resolution: 'show_customer_profile_follow_up' };
  }
  return null;
}

function viewerProfileCardsFollowUp(query, historyText = '') {
  const text = normalizeStateText(query).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return null;
  const history = normalizeStateText(historyText);
  const historyMentionsProfileChoice = /\bcustomer\b[\s\S]{0,120}\b(business|shop|store|company)\b[\s\S]{0,80}\b(cards?|profiles?|accounts?|pages?)\b/.test(history)
    || /\b(business|shop|store|company)\b[\s\S]{0,120}\bcustomer\b[\s\S]{0,80}\b(cards?|profiles?|accounts?|pages?)\b/.test(history)
    || /\b(customer|business)\s+(profile|card|account|page)\b[\s\S]{0,80}\b(or|and|both)\b[\s\S]{0,80}\b(customer|business)\s+(profile|card|account|page)\b/.test(history);
  const directBothProfiles = /\b(show|open|view|display|bring|pull up|get|see)\b.{0,50}\b(customer|personal|viewer)\b.{0,60}\b(business|shop|store|company)\b.{0,60}\b(cards?|profiles?|accounts?|pages?)\b/.test(text)
    || /\b(show|open|view|display|bring|pull up|get|see)\b.{0,50}\b(business|shop|store|company)\b.{0,60}\b(customer|personal|viewer)\b.{0,60}\b(cards?|profiles?|accounts?|pages?)\b/.test(text)
    || /\b(customer|personal|viewer)\b.{0,60}\b(business|shop|store|company)\b.{0,60}\b(cards?|profiles?|accounts?|pages?)\b/.test(text)
    || /\b(business|shop|store|company)\b.{0,60}\b(customer|personal|viewer)\b.{0,60}\b(cards?|profiles?|accounts?|pages?)\b/.test(text);
  const shortBoth = /^(both|show both|show me both|open both|both profiles|both cards|show both profiles|show both cards|open both profiles|open both cards|all profiles|all cards|show them both|open them both)$/.test(text);
  if (directBothProfiles || (shortBoth && historyMentionsProfileChoice)) {
    return { effectiveQuery: 'show my customer and business profile cards', resolution: 'show_customer_and_business_profiles_follow_up' };
  }
  return null;
}

function cleanFollowUpProductName(value = '') {
  return cleanStateText(value)
    .replace(/\*\*/g, '')
    .replace(/^[-:\s]+/g, '')
    .replace(/^(?:is|was|called|named|titled)\s+/i, '')
    .replace(/[.!?]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function productCountFromFollowUpText(text = '') {
  const simple = normalizeStateText(text)
    .replace(/,/g, '')
    .replace(/[^a-z0-9\s]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const wordNumbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  };
  const match = simple.match(/^(?:just|only|show|show me|give me|list|display|get|open)?\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)(?:\s+(?:products?|items?|listings?))?$/);
  if (!match) return 0;
  const value = /^\d+$/.test(match[1]) ? (match[1].length > 2 ? 25 : Number(match[1])) : wordNumbers[match[1]] || 0;
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.min(value, 25);
}

function historyAsksForProductName(historyText = '') {
  const history = normalizeStateText(historyText);
  if (!history) return false;
  return /\b(tell|send|give)\s+me\b.{0,80}\b(product|item)\b.{0,80}\b(name|keyword|category|budget|detail)\b/.test(history)
    || /\bwhat\s+product\s+do\s+you\s+need\b/.test(history)
    || /\b(product\s+name|product\s+keyword|item\s+name|item\s+keyword)\b/.test(history)
    || /\bi\s+need\s+the\s+specific\s+product\b|\bneed\s+the\s+specific\s+product\b/.test(history)
    || /\bwhat\s+product\s+you\s+want\b|\bwhich\s+product\s+you\s+want\b/.test(history);
}

function bareProductNameFromFollowUp(query = '') {
  const candidate = cleanFollowUpProductName(query);
  const text = normalizeStateText(candidate).replace(/[^a-z0-9\s&.'-]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  if (productCountFromFollowUpText(text)) return '';
  if (/^(ok|okay|yes|yeah|yep|no|nope|hello|hi|hey|thanks?|please|product|products?|item|items?|listing|listings?)$/.test(text)) return '';
  if (/\b(show|open|view|display|bring|pull|search|find|get|give|list|create|add|publish|post|delete|remove|map|location|profile|account|business|customer|customers?|jobs?|clips?|posts?|articles?|statistics|stats?|analytics)\b/.test(text)) return '';
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length || words.length > 6) return '';
  if (words.every((word) => /^(a|an|the|my|your|their|this|that|it|one|two|three|just|only)$/.test(word))) return '';
  return candidate;
}

function productNameStatementFromFollowUp(query = '') {
  const raw = cleanStateText(query);
  if (!raw) return '';
  const patterns = [
    /^(?:the\s+)?product\s+(?:is|called|named|titled)\s+(.+)$/i,
    /^(?:the\s+)?product\s*[:=]\s*(.+)$/i,
    /^(?:it\s+is|it's|its|called|named)\s+(.+)$/i,
  ];
  for (const pattern of patterns) {
    const match = raw.match(pattern);
    const candidate = bareProductNameFromFollowUp(match && match[1]);
    if (candidate) return candidate;
  }
  return '';
}

function productNameFromSpecificResultHistory(historyText = '') {
  const raw = cleanStateText(historyText);
  if (!raw) return '';
  const normalized = normalizeStateText(raw);
  if (!/\b(product|match|price|availability|category)\b/.test(normalized)) return '';
  if (/\b(most viewed products?|top products?|product statistics chart|analytics chart|ranked\s+\d+\s+products?)\b/.test(normalized)) return '';

  const patterns = [
    /\bi\s+found\s+the\s+product\s*[-:]\s*([a-z0-9][a-z0-9 &.'-]{0,80}?)(?:\s+details\b|\s+price\b|\s+category\b|\s+availability\b|\s+relationship\b|\s+next step\b|[.!?]|$)/i,
    /\bfound\s+the\s+product\s*[-:]\s*([a-z0-9][a-z0-9 &.'-]{0,80}?)(?:\s+details\b|\s+price\b|\s+category\b|\s+availability\b|\s+relationship\b|\s+next step\b|[.!?]|$)/i,
    /\bproduct\s*[-:]\s*([a-z0-9][a-z0-9 &.'-]{0,80}?)(?:\s+details\b|\s+price\b|\s+category\b|\s+availability\b|\s+relationship\b|\s+next step\b|[.!?]|$)/i,
    /\bmatch\s*[-:]\s*([a-z0-9][a-z0-9 &.'-]{0,60}?)(?:\s+published\b|\s+price\b|\s+category\b|\s+availability\b|\s+next step\b|$)/i,
    /\bmatch\s+([a-z0-9][a-z0-9 &.'-]{0,60}?)(?:\s+published\b|\s+price\b|\s+category\b|\s+availability\b|\s+next step\b|$)/i,
    /\bhere it is[^\n\r.]*\bproduct\s+\*?\*?([a-z0-9][a-z0-9 &.'-]{1,80}?)\*?\*?\s+from\b/i,
    /\bproduct\s+\*?\*?([a-z0-9][a-z0-9 &.'-]{1,80}?)\*?\*?\s+from\b/i,
  ];
  for (const pattern of patterns) {
    const match = raw.match(pattern);
    const candidate = cleanFollowUpProductName(match && match[1]);
    if (candidate && !/\b(product|products|card|view|directly|business|shop|price|category|availability)\b/i.test(candidate)) return candidate;
  }
  return '';
}

function specificProductResultFollowUp(query, historyText = '') {
  const text = normalizeStateText(query).replace(/[^a-z0-9\s-]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return null;
  if (/\b(business|shop|store|company|profile|account|customer|customers|client|clients)\b/.test(text)) return null;
  const productName = productNameFromSpecificResultHistory(historyText);
  if (!productName) return null;
  const wantsOpen = /^(?:-?\s*)?(show it|show me|show this|show that|open it|open this|open that|open card|open the card|open product card|open the product card|show product card|show the product card|the card|that one|yes|yeah|yep|ok|okay|sure|do it|go ahead)\b/.test(text)
    || /\bopen\b.{0,25}\bproduct\s+card\b/.test(text)
    || /\b(open|show|view)\b.{0,25}\bthe\s+product\b/.test(text);
  if (!wantsOpen) return null;
  return {
    effectiveQuery: `open product ${productName}`,
    resolution: 'open_specific_product_follow_up',
  };
}

function productPromptFollowUp(query, historyText = '', state = {}) {
  const text = normalizeStateText(query).replace(/[^a-z0-9\s&.'-]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return null;
  const askedForProductName = historyAsksForProductName(historyText);
  const productContext = askedForProductName || state.activeDomain === 'products' || state.activeEntity === 'products';
  const count = productContext ? productCountFromFollowUpText(text) : 0;
  if (count) {
    return {
      effectiveQuery: `show ${count} product${count === 1 ? '' : 's'}`,
      resolution: 'product_count_follow_up',
    };
  }
  if (!askedForProductName) return null;
  const productName = productNameStatementFromFollowUp(query) || bareProductNameFromFollowUp(query);
  if (!productName) return null;
  return {
    effectiveQuery: `open product ${productName}`,
    resolution: 'product_name_open_follow_up',
  };
}

function productSearchFollowUp(query, historyText = '') {
  const text = normalizeStateText(query).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return null;
  const history = normalizeStateText(historyText);
  if (!/\btomatoe?s?\b/.test(history)) return null;
  const askedToRunTomatoSearch = /\b(search cheapest tomatoes|tomato product search|cheapest tomato options?|lowest priced tomato)\b/.test(history);
  if ((isAffirmativeFollowUp(text) || /^(go ahead|do it|run it|search it)$/.test(text)) && askedToRunTomatoSearch) {
    return { effectiveQuery: 'search cheapest tomatoes', resolution: 'run_tomato_product_search_follow_up' };
  }
  if (/\b(cheap|cheapest|lowest|price|prices|option|options)\b/.test(text)) {
    return { effectiveQuery: 'search cheapest tomatoes', resolution: 'cheapest_tomato_product_follow_up' };
  }
  if (/\bcherry\b/.test(text)) {
    return { effectiveQuery: 'search cherry tomatoes', resolution: 'cherry_tomato_product_follow_up' };
  }
  if (/\bplants?\b/.test(text)) {
    return { effectiveQuery: 'search tomato plants', resolution: 'tomato_plants_product_follow_up' };
  }
  if (/\bfresh\b/.test(text)) {
    return { effectiveQuery: 'search fresh tomatoes', resolution: 'fresh_tomato_product_follow_up' };
  }
  return null;
}

function resolveConversationState(query, context = {}) {
  const clean = cleanStateText(query);
  const text = normalizeStateText(clean);
  const historyText = historyTextFromContext(context);
  const inferred = stateFromHistory(historyText);
  const preserveExplicitMapOrLocation = isExplicitMapOrLocationRequest(text);
  const state = {
    ...inferred,
    activeDomain: preserveExplicitMapOrLocation ? '' : context.activeDomain || inferred.activeDomain || '',
    activeEntity: preserveExplicitMapOrLocation ? '' : context.activeEntity || inferred.activeEntity || '',
    activeMetric: preserveExplicitMapOrLocation ? '' : context.activeMetric || inferred.activeMetric || '',
    pendingQuestion: preserveExplicitMapOrLocation ? null : context.pendingQuestion || inferred.pendingQuestion || null,
    previousIntent: preserveExplicitMapOrLocation ? '' : context.previousIntent || inferred.previousIntent || '',
  };
  let effectiveQuery = clean;
  let resolvedFollowUp = false;
  let followUpResolution = '';

  const statsFollowUp = preserveExplicitMapOrLocation ? null : statsClarificationFollowUp(text, state);
  const openShowFollowUp = preserveExplicitMapOrLocation ? null : openOrShowBusinessOfferFollowUp(clean, historyText);
  const specificProductFollowUp = preserveExplicitMapOrLocation ? null : specificProductResultFollowUp(clean, historyText);
  const productPromptContextFollowUp = preserveExplicitMapOrLocation ? null : productPromptFollowUp(clean, historyText, state);
  const productSearchContextFollowUp = preserveExplicitMapOrLocation ? null : productSearchFollowUp(clean, historyText);
  const viewerProfilesFollowUp = preserveExplicitMapOrLocation ? null : viewerProfileCardsFollowUp(clean, historyText);
  const customerProfileFollowUp = preserveExplicitMapOrLocation ? null : customerProfileCardFollowUp(clean, historyText);
  const customerContentFollowUp = preserveExplicitMapOrLocation ? null : customerSelfContentFollowUp(clean, historyText);
  if (specificProductFollowUp) {
    effectiveQuery = specificProductFollowUp.effectiveQuery;
    resolvedFollowUp = true;
    followUpResolution = specificProductFollowUp.resolution;
  } else if (openShowFollowUp) {
    effectiveQuery = openShowFollowUp.effectiveQuery;
    resolvedFollowUp = true;
    followUpResolution = openShowFollowUp.resolution;
  } else if (productPromptContextFollowUp) {
    effectiveQuery = productPromptContextFollowUp.effectiveQuery;
    resolvedFollowUp = true;
    followUpResolution = productPromptContextFollowUp.resolution;
  } else if (productSearchContextFollowUp) {
    effectiveQuery = productSearchContextFollowUp.effectiveQuery;
    resolvedFollowUp = true;
    followUpResolution = productSearchContextFollowUp.resolution;
  } else if (viewerProfilesFollowUp) {
    effectiveQuery = viewerProfilesFollowUp.effectiveQuery;
    resolvedFollowUp = true;
    followUpResolution = viewerProfilesFollowUp.resolution;
  } else if (customerProfileFollowUp) {
    effectiveQuery = customerProfileFollowUp.effectiveQuery;
    resolvedFollowUp = true;
    followUpResolution = customerProfileFollowUp.resolution;
  } else if (customerContentFollowUp) {
    effectiveQuery = customerContentFollowUp.effectiveQuery;
    resolvedFollowUp = true;
    followUpResolution = customerContentFollowUp.resolution;
  } else if (statsFollowUp) {
    effectiveQuery = statsFollowUp.effectiveQuery;
    resolvedFollowUp = true;
    followUpResolution = statsFollowUp.resolution;
  } else if (!preserveExplicitMapOrLocation && /\b(product\s+not\s+products|the product\s+not\s+products|asked\b.{0,60}\bproduct\b.{0,40}\bnot\b.{0,25}\bproducts?)\b/.test(text) && state.previousIntent === 'PRODUCT_SINGLE_METRIC') {
    effectiveQuery = state.activeMetric && state.activeMetric !== 'views'
      ? `show me the product most ${state.activeMetric}`
      : 'show me the product most viewed';
    resolvedFollowUp = true;
    followUpResolution = 'single_product_correction';
  } else if (!preserveExplicitMapOrLocation && isAffirmativeFollowUp(text) && state.previousIntent === 'PRODUCT_SINGLE_METRIC') {
    effectiveQuery = state.activeMetric && state.activeMetric !== 'views'
      ? `show me the product most ${state.activeMetric}`
      : 'show me the product most viewed';
    resolvedFollowUp = true;
    followUpResolution = 'single_product_follow_up';
  } else if (!preserveExplicitMapOrLocation && isShortFollowUp(text) && state.activeDomain === 'analytics' && /^(graphs?|charts?|bars?|visuals?)$/.test(text)) {
    effectiveQuery = state.activeEntity === 'products'
      ? 'show top products by views'
      : 'show my business statistics as charts';
    resolvedFollowUp = true;
    followUpResolution = 'analytics_chart_follow_up';
  } else if (!preserveExplicitMapOrLocation && isShortFollowUp(text) && state.activeDomain === 'analytics' && /\b(line|trend|over time)\b/.test(text)) {
    effectiveQuery = state.activeMetric === 'profile_views'
      ? 'show profile views over time'
      : 'show statistics over time';
    resolvedFollowUp = true;
    followUpResolution = 'analytics_line_follow_up';
  } else if (!preserveExplicitMapOrLocation && isShortFollowUp(text) && state.activeEntity === 'products' && /\btop\s*\d*\b|\btop products?\b/.test(text)) {
    effectiveQuery = /\d/.test(text) ? `${text} products by views` : 'top products by views';
    resolvedFollowUp = true;
    followUpResolution = 'product_ranking_follow_up';
  }

  return {
    ...state,
    originalQuery: clean,
    effectiveQuery,
    normalizedQuery: text,
    resolvedFollowUp,
    followUpResolution,
  };
}

function validateAskEmyResponse(plan = {}, response = {}) {
  const failures = [];
  const next = { ...(response || {}) };
  const answer = cleanStateText(next.answer || next.text || '');
  const results = Array.isArray(next.results) ? next.results : [];
  const selectedToolName = next.selectedToolName || plan.selectedToolName || plan.toolHint || '';
  const searchAreaAllowed = plan.locationSearchAllowed === true
    || plan.intent === 'PRODUCT_SEARCH'
    || plan.intent === 'VIEWER_LOCATION'
    || selectedToolName === 'searchProducts'
    || selectedToolName === 'getViewerLocation';
  if (plan.recordCardsAllowed === false && results.length) {
    failures.push('cards_not_allowed');
    next.results = [];
  }
  if (!searchAreaAllowed && /near\s+sl\d|within\s+\d+\s*(?:km|miles)|radius:\s*\d|postcode/i.test(answer)) {
    failures.push('accidental_location_language');
  }
  if (/PRODUCT_SINGLE_METRIC/.test(plan.intent || '') && Array.isArray(next.results) && next.results.length > 1) {
    failures.push('single_product_returned_many');
    next.results = next.results.slice(0, 1);
  }
  if ((plan.intent === 'IDENTITY' || plan.intent === 'ACCOUNT') && Array.isArray(next.results) && next.results.length) {
    failures.push('identity_returned_cards');
    next.results = [];
  }
  if ((plan.intent === 'PRODUCT_SINGLE_METRIC' || plan.intent === 'PRODUCT_LIST_METRIC' || plan.intent === 'BUSINESS_ANALYTICS') && next.selectedToolName === 'searchNearby') {
    failures.push('analytics_used_location_search');
  }
  return {
    ok: failures.length === 0,
    failures,
    response: next,
  };
}

module.exports = {
  cleanStateText,
  normalizeStateText,
  historyTextFromContext,
  stateFromHistory,
  businessNameFromOpenOffer,
  openOrShowBusinessOfferFollowUp,
  customerProfileCardFollowUp,
  viewerProfileCardsFollowUp,
  historyAsksForProductName,
  productNameFromSpecificResultHistory,
  specificProductResultFollowUp,
  productPromptFollowUp,
  productSearchFollowUp,
  isExplicitMapOrLocationRequest,
  resolveConversationState,
  statsClarificationFollowUp,
  validateAskEmyResponse,
};

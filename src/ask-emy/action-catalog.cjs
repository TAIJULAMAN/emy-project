'use strict';

const ACTION_TYPO_MAP = Object.freeze({
  busniess: 'business',
  busnies: 'business',
  bunsiess: 'business',
  buness: 'business',
  bsuniess: 'business',
  buisness: 'business',
  busness: 'business',
  bussiness: 'business',
  porudct: 'product',
  porudcts: 'products',
  prodcut: 'product',
  prodcuts: 'products',
  llocation: 'location',
  shoshow: 'show',
  shwo: 'show',
  showw: 'show',
});

const EMY_ACTION_CATALOG = Object.freeze({
  business: {
    label: 'Business profile',
    aliases: ['business account', 'business card', 'business profile', 'shop profile', 'business', 'businesses', 'shop', 'shops', 'store', 'stores'],
    createUrl: 'emy-business-profile.html?setup=1',
    openUrl: 'emy-business-profile.html?mode=business',
    createTool: 'createDraft',
    openTool: 'openInlineView',
    openResponseType: 'small_result_list',
    createResponseType: 'draft_preview',
    requiresBusinessOwner: true,
    canDraft: true,
    safeCustomerVisible: true,
    usesExistingView: true,
    draftFields: ['name', 'description', 'category', 'phone', 'email', 'website', 'address', 'opening_hours', 'profile_image'],
  },
  product: {
    label: 'Product listing',
    aliases: ['product', 'products', 'item', 'items', 'listing', 'listings', 'stock'],
    createUrl: 'emy-business-profile.html?tab=products&create=product',
    openUrl: 'emy-business-profile.html?tab=products',
    createTool: 'createDraft',
    openTool: 'openInlineView',
    openResponseType: 'inline_product_view',
    createResponseType: 'draft_preview',
    requiresBusinessOwner: true,
    canDraft: true,
    safeCustomerVisible: true,
    usesExistingView: true,
    draftFields: ['title', 'description', 'category', 'price', 'availability', 'image'],
  },
  job: {
    label: 'Job post',
    aliases: ['job', 'jobs', 'role', 'roles', 'hiring', 'vacancy', 'vacancies'],
    createUrl: 'emy-business-profile.html?tab=jobs&create=job',
    customerCreateUrl: 'emy-customer-home.html?tab=feeds&askDraft=hiring#feeds',
    openUrl: 'emy-business-profile.html?tab=jobs',
    createTool: 'createDraft',
    openTool: 'openInlineView',
    openResponseType: 'inline_job_view',
    createResponseType: 'draft_preview',
    requiresBusinessOwner: true,
    canDraft: true,
    safeCustomerVisible: true,
    usesExistingView: true,
    draftFields: ['title', 'description', 'location', 'employment_type', 'workplace', 'experience', 'apply_method'],
  },
  post: {
    label: 'Post',
    aliases: ['post', 'posts', 'update', 'updates', 'feed', 'content'],
    createUrl: 'emy-business-profile.html?tab=posts&create=post',
    customerCreateUrl: 'emy-customer-home.html?tab=feeds&askDraft=post#feeds',
    openUrl: 'emy-business-profile.html?tab=posts',
    createTool: 'createDraft',
    openTool: 'openInlineView',
    openResponseType: 'inline_post_view',
    createResponseType: 'draft_preview',
    requiresBusinessOwner: true,
    canDraft: true,
    safeCustomerVisible: true,
    usesExistingView: true,
    draftFields: ['title', 'text', 'media', 'category'],
  },
  clip: {
    label: 'Clip',
    aliases: ['clip', 'clips', 'video', 'videos', 'reel', 'reels'],
    createUrl: 'emy-business-profile.html?tab=clips&create=clip',
    customerCreateUrl: 'emy-customer-home.html?tab=reels&askDraft=clip#reels',
    openUrl: 'emy-business-profile.html?tab=clips',
    createTool: 'createDraft',
    openTool: 'openInlineView',
    openResponseType: 'inline_clip_view',
    createResponseType: 'draft_preview',
    requiresBusinessOwner: true,
    canDraft: true,
    safeCustomerVisible: true,
    usesExistingView: true,
    draftFields: ['title', 'caption', 'video', 'thumbnail'],
  },
  service: {
    label: 'Service listing',
    aliases: ['service', 'services'],
    createUrl: 'emy-business-profile.html?tab=products&create=service',
    openUrl: 'emy-business-profile.html?tab=products',
    createTool: 'createDraft',
    openTool: 'openInlineView',
    openResponseType: 'small_result_list',
    createResponseType: 'draft_preview',
    requiresBusinessOwner: true,
    canDraft: true,
    safeCustomerVisible: true,
    usesExistingView: true,
    draftFields: ['title', 'description', 'category', 'price_or_rate', 'availability', 'image'],
  },
  event: {
    label: 'Event',
    aliases: ['event', 'events'],
    createUrl: 'emy-business-profile.html?tab=posts&create=event',
    customerCreateUrl: 'emy-customer-home.html?tab=feeds&askDraft=event#feeds',
    openUrl: 'emy-business-profile.html?tab=posts',
    createTool: 'createDraft',
    openTool: 'openInlineView',
    openResponseType: 'inline_post_view',
    createResponseType: 'draft_preview',
    requiresBusinessOwner: true,
    canDraft: true,
    safeCustomerVisible: true,
    usesExistingView: true,
    draftFields: ['title', 'description', 'date', 'time', 'location', 'cover_image'],
  },
  article: {
    label: 'Article',
    aliases: ['article', 'articles', 'blog', 'blogs'],
    createUrl: 'emy-business-profile.html?tab=posts&create=article',
    customerCreateUrl: 'emy-customer-home.html?tab=feeds&askDraft=article#feeds',
    openUrl: 'emy-business-profile.html?tab=posts',
    createTool: 'createDraft',
    openTool: 'openInlineView',
    openResponseType: 'inline_post_view',
    createResponseType: 'draft_preview',
    requiresBusinessOwner: true,
    canDraft: true,
    safeCustomerVisible: true,
    usesExistingView: true,
    draftFields: ['title', 'body', 'cover_image', 'category'],
  },
  profile: {
    label: 'Customer profile',
    aliases: ['customer profile', 'customer account', 'my profile', 'my account', 'profile', 'account'],
    createUrl: '',
    openUrl: 'emy-customer-profile.html',
    createTool: '',
    openTool: 'openInlineView',
    openResponseType: 'small_result_list',
    createResponseType: 'missing_data_answer',
    requiresBusinessOwner: false,
    canDraft: false,
    safeCustomerVisible: true,
    usesExistingView: true,
    draftFields: [],
  },
  statistics: {
    label: 'Business statistics',
    aliases: ['statistics', 'stats', 'analytics', 'graphs', 'charts'],
    createUrl: '',
    openUrl: 'emy-business-profile.html?tab=analytics',
    createTool: '',
    openTool: 'getBusinessStatsOverview',
    openResponseType: 'analytics_chart',
    createResponseType: 'missing_data_answer',
    requiresBusinessOwner: true,
    canDraft: false,
    safeCustomerVisible: false,
    usesExistingView: false,
    draftFields: [],
  },
});

const ACTION_TARGET_ALIASES = Object.freeze(Object.entries(EMY_ACTION_CATALOG).flatMap(([target, capability]) => {
  return capability.aliases.map((alias) => [alias, target]);
}).sort((left, right) => right[0].length - left[0].length));

function cleanActionText(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
}

function normalizeActionText(value) {
  return cleanActionText(value)
    .toLowerCase()
    .replace(/\b[a-z][a-z0-9]*\b/g, (word) => ACTION_TYPO_MAP[word] || word);
}

function singularTarget(target) {
  if (target === 'products') return 'product';
  if (target === 'jobs') return 'job';
  if (target === 'clips') return 'clip';
  if (target === 'posts') return 'post';
  if (target === 'businesses') return 'business';
  if (target === 'articles') return 'article';
  return target || '';
}

function detectActionTarget(text, context = {}) {
  const normalized = normalizeActionText(text);
  const contextTarget = singularTarget(context.activeActionTarget || context.activeEntity || context.previousActionTarget || '');

  if (/\bcustomer profile\b|\bmy profile\b/.test(normalized)) return 'profile';
  if (/\bjob post\b|\bjob listing\b|\bhiring post\b/.test(normalized)) return 'job';
  if (/\bproduct listing\b|\bproduct card\b|\bproduct view\b/.test(normalized)) return 'product';
  if (/\bbusiness profile\b|\bshop profile\b/.test(normalized)) return 'business';
  if (/\barticles?|blogs?\b/.test(normalized)) return 'article';
  if (/\bposts?|updates?|feed|content\b/.test(normalized)) return 'post';
  if (/\bclips?|videos?|reels?\b/.test(normalized)) return 'clip';
  if (/\bevents?\b/.test(normalized)) return 'event';
  if (/\bjobs?|roles?|hiring|vacanc(?:y|ies)\b/.test(normalized)) return 'job';
  if (/\bproducts?|items?|listings?|stock\b/.test(normalized)) return 'product';
  if (/\bservices?\b/.test(normalized)) return 'service';

  for (const [alias, target] of ACTION_TARGET_ALIASES) {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`\\b${escaped}\\b`).test(normalized)) return target;
  }

  if (/\b(it|this|that|the one)\b/.test(normalized) && EMY_ACTION_CATALOG[contextTarget]) return contextTarget;
  return '';
}

function detectActionMode(text) {
  const normalized = normalizeActionText(text);
  if (/\b(compare|comparison|versus|vs)\b/.test(normalized)) return 'compare';
  if (/\b(create|make|draft|prepare|set up|setup|add|build|write|compose)\b/.test(normalized)) return 'create';
  if (/\b(how do i|how can i|can you|could you|help me)\b.{0,50}\b(create|make|draft|prepare|set up|setup|add|build|write|compose)\b/.test(normalized)) return 'create';
  if (/\b(open|view|go to|take me to|pull up|bring up|display)\b/.test(normalized)) return 'open';
  if (/\b(show it here|show this here|show that here|show me inside|inside the box|open here|view here)\b/.test(normalized)) return 'open';
  return 'unknown';
}

function getEmyActionCapability(target) {
  const key = singularTarget(target);
  return key && EMY_ACTION_CATALOG[key] ? EMY_ACTION_CATALOG[key] : null;
}

function detectActionScope(text, target = '', context = {}) {
  const normalized = normalizeActionText(text);
  const contextScope = cleanActionText(context.activeActionScope || context.actionScope || context.scope || '').toLowerCase();
  if (/\b(?:as|from|on|with|using)\s+(?:a\s+|my\s+|the\s+)?(?:customer|personal|user)\b/.test(normalized)) return 'customer';
  if (/\b(?:customer-side|customer side|customer account|personal account|my account|own account|not (?:a )?business|not my business)\b/.test(normalized)) return 'customer';
  if (/\b(?:as|from|on|with|using|for)\s+(?:a\s+|my\s+|the\s+)?(?:business|shop|store|company)\b/.test(normalized)) return 'business';
  if (/\b(?:business-side|business side|business account|business profile|my business|own business)\b/.test(normalized)) return 'business';
  if (contextScope === 'customer' || contextScope === 'business') return contextScope;
  const capability = getEmyActionCapability(target);
  return capability && capability.requiresBusinessOwner ? 'business' : 'customer';
}

function actionCreateUrlForScope(capability, scope) {
  if (!capability) return '';
  if (scope === 'customer' && capability.customerCreateUrl) return capability.customerCreateUrl;
  return capability.createUrl || '';
}

function actionNeedsExistingView(target, mode) {
  const capability = getEmyActionCapability(target);
  return Boolean(capability && mode === 'open' && capability.usesExistingView);
}

function resolveEmyAction(query, context = {}) {
  const clean = cleanActionText(query);
  const normalizedText = normalizeActionText(clean);
  const mode = detectActionMode(normalizedText);
  const target = detectActionTarget(normalizedText, context);
  const capability = getEmyActionCapability(target);
  const scope = capability && mode === 'create' ? detectActionScope(normalizedText, target, context) : '';
  const hasTarget = Boolean(capability);
  const highConfidence = hasTarget && mode !== 'unknown';
  const responseType = !capability ? 'chat_answer'
    : mode === 'create' ? capability.createResponseType
      : mode === 'open' ? capability.openResponseType
        : mode === 'compare' ? 'comparison_table'
          : 'chat_answer';
  const toolHint = !capability ? ''
    : mode === 'create' ? capability.createTool
      : mode === 'open' ? capability.openTool
        : mode === 'compare' ? 'compareItems'
          : '';

  return {
    intent: highConfidence ? 'emy_action' : 'unknown',
    clean,
    normalizedText,
    mode,
    target,
    scope,
    label: capability ? capability.label : '',
    url: capability ? (mode === 'create' ? actionCreateUrlForScope(capability, scope) : capability.openUrl) : '',
    toolHint,
    responseType,
    usesExistingView: Boolean(capability && capability.usesExistingView && mode === 'open'),
    requiresConfirmation: Boolean(capability && mode === 'create'),
    cardsAllowed: Boolean(capability && mode === 'open' && capability.usesExistingView),
    permission: capability && capability.requiresBusinessOwner ? 'business-owner' : 'viewer',
    draftFields: capability ? capability.draftFields.slice() : [],
    safeCustomerVisible: Boolean(capability && capability.safeCustomerVisible),
    confidence: highConfidence ? mode === 'create' ? 0.94 : mode === 'open' ? 0.88 : 0.78 : 0,
  };
}

function assertNoAdminActionUrls() {
  const forbiddenAdminPage = ['emy-admin', 'backend.html'].join('-');
  Object.entries(EMY_ACTION_CATALOG).forEach(([target, capability]) => {
    ['createUrl', 'openUrl'].forEach((key) => {
      if (String(capability[key] || '').includes(forbiddenAdminPage)) {
        throw new Error(`Ask EMY action ${target}.${key} exposes admin backend`);
      }
    });
  });
  return true;
}

module.exports = {
  ACTION_TYPO_MAP,
  EMY_ACTION_CATALOG,
  cleanActionText,
  normalizeActionText,
  detectActionMode,
  detectActionTarget,
  detectActionScope,
  getEmyActionCapability,
  actionCreateUrlForScope,
  actionNeedsExistingView,
  resolveEmyAction,
  assertNoAdminActionUrls,
};

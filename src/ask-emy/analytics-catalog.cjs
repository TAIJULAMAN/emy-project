'use strict';

const ANALYTICS_COMMAND_TYPO_MAP = Object.freeze({
  busniess: 'business',
  busnies: 'business',
  bunsiess: 'business',
  buness: 'business',
  buisness: 'business',
  busness: 'business',
  bussiness: 'business',
  porudct: 'product',
  porudcts: 'products',
  prodcut: 'product',
  prodcuts: 'products',
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
  llocation: 'location',
  shoshow: 'show',
  shwo: 'show',
  showw: 'show',
});

const ANALYTICS_CATALOG = Object.freeze({
  business: {
    label: 'Business',
    aliases: ['business', 'profile', 'account'],
    metrics: ['profile_views', 'product_views', 'views', 'likes', 'comments', 'saves', 'enquiries', 'messages', 'count'],
    group_by: ['date', 'week', 'month', 'status'],
    default_metric: 'profile_views',
    default_chart: 'kpi',
  },
  businesses: {
    label: 'Businesses',
    aliases: ['businesses', 'shops', 'stores', 'companies'],
    metrics: ['profile_views', 'product_views', 'views', 'likes', 'comments', 'saves', 'enquiries', 'messages', 'overall_score', 'count'],
    group_by: ['business', 'category', 'location', 'date', 'week', 'month'],
    default_metric: 'overall_score',
    default_chart: 'comparison_card',
  },
  product: {
    label: 'Product',
    aliases: ['product', 'item', 'listing', 'stock'],
    metrics: ['views', 'likes', 'comments', 'saves', 'enquiries', 'messages', 'engagement'],
    group_by: ['product', 'date', 'week', 'month'],
    default_metric: 'views',
    default_chart: 'kpi',
  },
  products: {
    label: 'Products',
    aliases: ['products', 'items', 'listings', 'stock'],
    metrics: ['views', 'likes', 'comments', 'saves', 'enquiries', 'messages', 'engagement', 'count'],
    group_by: ['product', 'category', 'business', 'date', 'week', 'month'],
    default_metric: 'views',
    default_chart: 'horizontal_bar',
  },
  jobs: {
    label: 'Jobs',
    aliases: ['jobs', 'job', 'roles', 'role', 'hiring'],
    metrics: ['views', 'applications', 'saves', 'messages', 'count'],
    group_by: ['job', 'business', 'category', 'date', 'week', 'month', 'status'],
    default_metric: 'applications',
    default_chart: 'horizontal_bar',
  },
  clips: {
    label: 'Clips',
    aliases: ['clips', 'clip', 'videos', 'video', 'reels', 'reel'],
    metrics: ['views', 'likes', 'comments', 'saves', 'shares', 'engagement', 'count'],
    group_by: ['clip', 'business', 'date', 'week', 'month'],
    default_metric: 'views',
    default_chart: 'horizontal_bar',
  },
  posts: {
    label: 'Posts',
    aliases: ['posts', 'post', 'feed', 'updates', 'update'],
    metrics: ['views', 'likes', 'comments', 'saves', 'engagement', 'count'],
    group_by: ['post', 'business', 'date', 'week', 'month'],
    default_metric: 'engagement',
    default_chart: 'horizontal_bar',
  },
  articles: {
    label: 'Articles',
    aliases: ['articles', 'article', 'blogs', 'blog'],
    metrics: ['views', 'likes', 'comments', 'saves', 'engagement', 'count'],
    group_by: ['article', 'business', 'date', 'week', 'month'],
    default_metric: 'views',
    default_chart: 'horizontal_bar',
  },
  customers: {
    label: 'Customers',
    aliases: ['customers', 'customer', 'clients', 'client'],
    metrics: ['count', 'messages', 'enquiries', 'saves'],
    group_by: ['business', 'date', 'week', 'month', 'status'],
    default_metric: 'count',
    default_chart: 'kpi',
  },
});

function cleanAnalyticsText(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
}

function normalizeAnalyticsText(value) {
  return cleanAnalyticsText(value)
    .toLowerCase()
    .replace(/\b[a-z][a-z0-9]*\b/g, (word) => ANALYTICS_COMMAND_TYPO_MAP[word] || word);
}

function limitFromAnalyticsText(text, fallback = null) {
  const match = text.match(/\btop\s+(\d{1,2})\b/)
    || text.match(/\bfirst\s+(\d{1,2})\b/)
    || text.match(/\b(\d{1,2})\s+(?:products|businesses|jobs|clips|posts|articles|items|listings)\b/);
  if (!match) return fallback;
  const value = Number(match[1]);
  if (!Number.isFinite(value) || value <= 0) return fallback;
  return Math.min(value, 25);
}

function metricFromAnalyticsText(text, entity = '') {
  if (/\bprofile\s+(?:views?|visits?|traffic)\b/.test(text)) return 'profile_views';
  if (/\bproduct\s+(?:views?|visits?|traffic)\b/.test(text) && (entity === 'business' || entity === 'businesses')) return 'product_views';
  if (/\b(applications?|applicants?)\b/.test(text)) return 'applications';
  if (/\b(enquiries|enquiry|inquiries|inquiry)\b/.test(text)) return 'enquiries';
  if (/\b(messages?|dm|dms|chat)\b/.test(text)) return 'messages';
  if (/\b(comments?|replies|reply)\b/.test(text)) return 'comments';
  if (/\b(likes?|liked)\b/.test(text)) return 'likes';
  if (/\b(saves?|saved)\b/.test(text)) return 'saves';
  if (/\b(shares?|shared)\b/.test(text)) return 'shares';
  if (/\b(views?|viewed|visits?|traffic)\b/.test(text)) return 'views';
  if (/\b(engagement|interest|popular|performance)\b/.test(text)) return 'engagement';
  if (/\b(score|best|doing best|strongest)\b/.test(text)) return 'overall_score';
  if (/\b(count|how many|number of|total)\b/.test(text)) return 'count';
  return '';
}

function entityFromAnalyticsText(text) {
  if (/\b(products?|items?|listings?|stock)\b/.test(text)) {
    return /\b(the|one|which|what)\s+product\b|\bmost\s+\w+\s+product\b|\btop product\b/.test(text) && !/\b(products|items|listings)\b/.test(text)
      ? 'product'
      : 'products';
  }
  if (/\b(jobs?|roles?|hiring)\b/.test(text)) return 'jobs';
  if (/\b(clips?|videos?|reels?)\b/.test(text)) return 'clips';
  if (/\b(posts?|feed|updates?)\b/.test(text)) return 'posts';
  if (/\b(articles?|blogs?)\b/.test(text)) return 'articles';
  if (/\b(customers?|clients?)\b/.test(text)) return 'customers';
  if (/\b(businesses|shops|stores|companies)\b/.test(text)) return 'businesses';
  if (/\b(business|profile)\b/.test(text)) return 'business';
  if (/\bprofile\s+(?:views?|visits?|traffic)\b/.test(text)) return 'business';
  return '';
}

function groupFromAnalyticsText(text, entity = '') {
  if (/\b(monthly|by month|per month|each month)\b/.test(text)) return 'month';
  if (/\b(weekly|by week|per week|each week)\b/.test(text)) return 'week';
  if (/\b(daily|by day|per day|each day|over time|time series|timeseries|trend)\b/.test(text)) return 'date';
  if (/\b(categories|category|by category)\b/.test(text)) return 'category';
  if (/\b(by business|per business)\b/.test(text) && entity === 'products') return 'business';
  if (entity === 'businesses') return 'business';
  if (entity === 'products' || entity === 'product') return 'product';
  if (entity === 'jobs') return 'job';
  if (entity === 'clips') return 'clip';
  if (entity === 'posts') return 'post';
  if (entity === 'articles') return 'article';
  return '';
}

function chartTypeFromAnalyticsText(text, groupBy = '', entity = '') {
  if (/\b(line charts?|line graphs?|trend charts?|trend graphs?|time series|timeseries|over time|daily|weekly|monthly)\b/.test(text)) return 'line';
  if (/\b(donut)\b/.test(text)) return 'donut';
  if (/\b(pie)\b/.test(text)) return 'pie';
  if (/\b(table)\b/.test(text)) return 'table';
  if (/\b(kpi|number|total)\b/.test(text)) return 'kpi';
  if (/\b(compare|comparison|versus|vs)\b/.test(text) && entity === 'businesses' && !/\b(by profile views|by views|by likes|by comments|by saves)\b/.test(text)) return 'comparison_card';
  if (groupBy && groupBy !== 'date' && groupBy !== 'week' && groupBy !== 'month') return 'horizontal_bar';
  return ANALYTICS_CATALOG[entity] ? ANALYTICS_CATALOG[entity].default_chart : 'auto';
}

function scopeFromAnalyticsText(text, entity = '') {
  if (/\b(across all|all my|for all|my businesses|all businesses|every business|compare my businesses)\b/.test(text)) return 'all_user_businesses';
  if (/\b(my business|current business|this business|active business|my shop|this shop)\b/.test(text)) return 'active_business';
  if (entity === 'businesses') return 'all_user_businesses';
  return 'active_business';
}

function hasExplicitLocationSearchCue(text) {
  return /\b(near|nearby|near me|postcode|radius|km|miles|map|directions|route|around|area|close to)\b/.test(text);
}

function looksLikeAnalyticsRequest(text) {
  if (!text) return false;
  if (hasExplicitLocationSearchCue(text) && !/\b(stats?|statistics|analytics|graphs?|charts?|compare|views?|likes?|comments?|saves?|applications?|performance)\b/.test(text)) return false;
  if (/\b(stats?|statistics|analytics|graphs?|charts?|visuals?|bars?|performance|rank|ranking|top|most|highest|strongest|popular|compare|comparison|line|pie|donut|over time|time series|timeseries)\b/.test(text)) return true;
  if (/\bbest\b/.test(text) && entityFromAnalyticsText(text) && !/\bbest\s+use\b/.test(text)) return true;
  if (/\b(profile views?|product views?|views?|likes?|comments?|saves?|applications?|enquiries?|messages?|engagement)\b/.test(text) && entityFromAnalyticsText(text)) return true;
  if (/\b(jobs?|clips?|posts?|products?|businesses?)\b[\s\S]{0,40}\bby\b[\s\S]{0,40}\b(applications?|views?|likes?|comments?|saves?|engagement|profile views?)\b/.test(text)) return true;
  return false;
}

function isAnalyticsMetricAvailable(entity, metric) {
  const catalog = ANALYTICS_CATALOG[entity];
  if (!catalog || !metric) return false;
  return catalog.metrics.includes(metric);
}

function resolveAnalyticsDefaults(intent = {}) {
  const entity = intent.entity || 'business';
  const catalog = ANALYTICS_CATALOG[entity] || ANALYTICS_CATALOG.business;
  let metric = intent.metric || catalog.default_metric;
  if (!catalog.metrics.includes(metric)) metric = catalog.default_metric;
  let groupBy = intent.group_by || groupFromAnalyticsText(intent.normalizedText || '', entity);
  if (groupBy && !catalog.group_by.includes(groupBy)) groupBy = catalog.group_by[0] || '';
  const chartType = intent.chart_type && intent.chart_type !== 'auto'
    ? intent.chart_type
    : chartTypeFromAnalyticsText(intent.normalizedText || '', groupBy, entity);
  return {
    ...intent,
    metric,
    group_by: groupBy,
    chart_type: chartType,
  };
}

function chooseAnalyticsChartType(intent = {}, dataShape = {}) {
  const requested = intent.chart_type || 'auto';
  const groupBy = intent.group_by || '';
  const hasTimeSeries = Boolean(dataShape.has_time_series || dataShape.hasTimeSeries);
  if (requested === 'line') return hasTimeSeries ? 'line' : 'line_unavailable';
  if (requested === 'pie' || requested === 'donut') return requested;
  if (requested !== 'auto') return requested;
  if (dataShape.one_total || intent.quantity === 'one') return 'kpi';
  if (groupBy === 'date' || groupBy === 'week' || groupBy === 'month') return hasTimeSeries ? 'line' : 'line_unavailable';
  if (groupBy === 'category') return 'pie';
  if (groupBy) return 'horizontal_bar';
  return 'kpi';
}

function analyticsChartCapabilities(intent = {}, dataShape = {}) {
  const hasSnapshotTotals = dataShape.has_snapshot_totals !== false;
  const hasProductBreakdown = dataShape.has_product_breakdown !== false;
  const hasTimeSeries = Boolean(dataShape.has_time_series || dataShape.hasTimeSeries);
  const available = [];
  const unavailable = [];
  if (hasSnapshotTotals) available.push('bar', 'horizontal_bar', 'kpi');
  if (hasProductBreakdown) available.push('product_comparison');
  if (hasTimeSeries) {
    available.push('line');
  } else if (intent.requires_time_series || intent.chart_type === 'line') {
    unavailable.push({
      chart: 'line',
      reason: 'No historical time-series data is available yet.',
    });
  }
  if (intent.group_by === 'category') available.push('pie', 'donut');
  return {
    has_snapshot_totals: hasSnapshotTotals,
    has_product_breakdown: hasProductBreakdown,
    has_time_series: hasTimeSeries,
    available_charts: Array.from(new Set(available)),
    unavailable_charts: unavailable,
  };
}

function parseAnalyticsIntent(query, context = {}) {
  const clean = cleanAnalyticsText(query);
  const normalizedText = normalizeAnalyticsText(clean);
  if (!looksLikeAnalyticsRequest(normalizedText)) {
    return {
      intent: 'unknown',
      entity: 'unknown',
      metric: 'unknown',
      chart_type: 'auto',
      confidence: 0,
      normalizedText,
    };
  }

  let entity = entityFromAnalyticsText(normalizedText);
  if (!entity && context.activeEntity) entity = context.activeEntity;
  if (!entity) entity = /\b(compare|comparison)\b/.test(normalizedText) ? 'businesses' : 'business';

  let metric = metricFromAnalyticsText(normalizedText, entity);
  if (/\b(categories|category)\b/.test(normalizedText) && (entity === 'products' || entity === 'posts' || entity === 'jobs')) metric = 'count';

  const groupBy = groupFromAnalyticsText(normalizedText, entity);
  const limit = limitFromAnalyticsText(normalizedText, /\b(top|rank|ranking|compare|comparison)\b/.test(normalizedText) ? 5 : null);
  const scope = scopeFromAnalyticsText(normalizedText, entity);
  const quantity = entity === 'product' || /\b(the|one|which|what)\s+product\b|\bmost\s+\w+\s+product\b|\btop product\b/.test(normalizedText)
    ? 'one'
    : /\b(top|rank|ranking|compare|comparison|list|all|products|businesses|jobs|clips|posts|articles)\b/.test(normalizedText)
      ? 'list'
      : 'unspecified';
  const requiresTimeSeries = /\b(line charts?|line graphs?|trend|over time|time series|timeseries|daily|weekly|monthly)\b/.test(normalizedText);
  let chartType = chartTypeFromAnalyticsText(normalizedText, groupBy, entity);
  if ((entity === 'product' || quantity === 'one') && !requiresTimeSeries) chartType = 'kpi';

  const defaults = resolveAnalyticsDefaults({
    intent: /\b(compare|comparison|versus|vs)\b/.test(normalizedText) ? 'analytics_comparison'
      : /\b(top|rank|ranking|most|best|highest|strongest)\b/.test(normalizedText) ? 'analytics_ranking'
        : /\b(stats?|statistics|analytics)\b/.test(normalizedText) && !/\b(charts?|graphs?|bars?|line|pie|donut)\b/.test(normalizedText) ? 'analytics_summary'
          : 'analytics_chart',
    entity,
    metric,
    group_by: groupBy,
    chart_type: chartType,
    limit,
    scope,
    quantity,
    requires_time_series: requiresTimeSeries,
    requires_multiple_businesses: scope === 'all_user_businesses' || entity === 'businesses',
    normalizedText,
    filters: {},
  });

  const validMetric = isAnalyticsMetricAvailable(defaults.entity, defaults.metric);
  const confidence = validMetric
    ? /\b(charts?|graphs?|compare|comparison|top|rank|most|by|views?|likes?|comments?|saves?|applications?|profile views?)\b/.test(normalizedText) ? 0.92 : 0.74
    : 0.52;

  return {
    ...defaults,
    confidence,
  };
}

module.exports = {
  ANALYTICS_CATALOG,
  ANALYTICS_COMMAND_TYPO_MAP,
  normalizeAnalyticsText,
  parseAnalyticsIntent,
  resolveAnalyticsDefaults,
  chooseAnalyticsChartType,
  analyticsChartCapabilities,
  isAnalyticsMetricAvailable,
};

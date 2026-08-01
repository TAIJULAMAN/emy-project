'use strict';

const {
  ANALYTICS_CATALOG,
  normalizeAnalyticsText,
  parseAnalyticsIntent,
  chooseAnalyticsChartType,
  analyticsChartCapabilities,
  isAnalyticsMetricAvailable,
} = require('../../src/ask-emy/analytics-catalog.cjs');
const { planAskEmyMessage } = require('../../src/ask-emy/brain-planner.cjs');
const { routeAskEmyMessage } = require('../../src/ask-emy/tool-router.cjs');

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

function expectAnalytics(query, expected, context = {}) {
  const intent = parseAnalyticsIntent(query, context);
  Object.entries(expected).forEach(([key, value]) => {
    assert(intent[key] === value, `${query}: expected ${key}=${value}, got ${intent[key]}`);
  });
  assert(intent.confidence >= 0.7, `${query}: expected high confidence, got ${intent.confidence}`);
  return intent;
}

assert(ANALYTICS_CATALOG.products.metrics.includes('views'), 'products catalog should include views');
assert(ANALYTICS_CATALOG.businesses.group_by.includes('business'), 'business catalog should group by business');
assert(normalizeAnalyticsText('show graophts for my busniess') === 'show graphs for my business', 'analytics text should normalize command typos');
assert(isAnalyticsMetricAvailable('products', 'views'), 'products views metric should be available');
assert(!isAnalyticsMetricAvailable('products', 'applications'), 'products applications metric should not be available');

const bestUseIntent = parseAnalyticsIntent("what's the best use for EMY?");
assert(bestUseIntent.intent === 'unknown', `best use should not become analytics, got ${bestUseIntent.intent}`);
assert(bestUseIntent.confidence === 0, `best use should have zero analytics confidence, got ${bestUseIntent.confidence}`);

expectAnalytics('show me top 5 products by views', {
  intent: 'analytics_ranking',
  entity: 'products',
  metric: 'views',
  group_by: 'product',
  chart_type: 'horizontal_bar',
  limit: 5,
});

expectAnalytics('compare my businesses', {
  intent: 'analytics_comparison',
  entity: 'businesses',
  metric: 'overall_score',
  group_by: 'business',
  chart_type: 'comparison_card',
  scope: 'all_user_businesses',
});

expectAnalytics('compare my businesses by profile views', {
  intent: 'analytics_comparison',
  entity: 'businesses',
  metric: 'profile_views',
  group_by: 'business',
  chart_type: 'horizontal_bar',
  scope: 'all_user_businesses',
});

expectAnalytics('show jobs by applications', {
  intent: 'analytics_chart',
  entity: 'jobs',
  metric: 'applications',
  group_by: 'job',
  chart_type: 'horizontal_bar',
});

expectAnalytics('show clips by views', {
  intent: 'analytics_chart',
  entity: 'clips',
  metric: 'views',
  group_by: 'clip',
  chart_type: 'horizontal_bar',
});

expectAnalytics('show profile views over time', {
  intent: 'analytics_chart',
  entity: 'business',
  metric: 'profile_views',
  group_by: 'date',
  chart_type: 'line',
  requires_time_series: true,
});

expectAnalytics('show me a pie chart of product categories', {
  intent: 'analytics_chart',
  entity: 'products',
  metric: 'count',
  group_by: 'category',
  chart_type: 'pie',
});

expectAnalytics('show top products across all my businesses', {
  intent: 'analytics_ranking',
  entity: 'products',
  metric: 'views',
  group_by: 'product',
  chart_type: 'horizontal_bar',
  scope: 'all_user_businesses',
});

const lineUnavailable = chooseAnalyticsChartType(parseAnalyticsIntent('show profile views over time'), {
  has_time_series: false,
});
assert(lineUnavailable === 'line_unavailable', `line chart without time-series should be unavailable, got ${lineUnavailable}`);

const lineCapabilities = analyticsChartCapabilities(parseAnalyticsIntent('show profile views over time'), {
  has_time_series: false,
});
assert(lineCapabilities.unavailable_charts.some((item) => item.chart === 'line'), 'missing unavailable line chart reason');

const topProductsPlan = planAskEmyMessage('show top 5 products by views');
assert(topProductsPlan.intent === 'PRODUCT_LIST_METRIC', 'top products should stay product analytics');
assert(topProductsPlan.analyticsEntity === 'products', 'top products should attach analytics entity');
assert(topProductsPlan.analyticsGroupBy === 'product', 'top products should attach analytics group');
assert(topProductsPlan.analyticsChartType === 'horizontal_bar', 'top products should attach horizontal bar chart type');

const businessCompareRoute = routeAskEmyMessage('compare my businesses by profile views');
assert(businessCompareRoute.intent === 'BUSINESS_ANALYTICS', 'business comparison should route to analytics');
assert(businessCompareRoute.tool.name === 'getBusinessStatsOverview', 'business comparison should use analytics tool');
assert(businessCompareRoute.recordCardsAllowed === false, 'business analytics should not dump cards');
assert(businessCompareRoute.locationSearchAllowed === false, 'business analytics should not allow location search');

const jobsRoute = routeAskEmyMessage('show jobs by applications');
assert(jobsRoute.intent === 'BUSINESS_ANALYTICS', 'jobs applications should route to generic analytics');
assert(jobsRoute.analyticsEntity === 'jobs', 'jobs route should preserve analytics entity');
assert(jobsRoute.analyticsMetric === 'applications', 'jobs route should preserve applications metric');
assert(jobsRoute.locationSearchAllowed === false, 'jobs analytics should not allow location search');

const nearbyRoute = routeAskEmyMessage('show products near SL0 9BU');
assert(nearbyRoute.intent === 'SEARCH_NEARBY', 'location product query should still be location search');
assert(nearbyRoute.locationSearchAllowed === true, 'explicit location query should allow location search');

console.log(JSON.stringify({
  ok: true,
  analyticsCatalog: true,
  examplesCovered: 12,
}, null, 2));

'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'sections', '26-business-profile-template-parts.cjs');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');
const htmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-business-profile.html');
const source = fs.readFileSync(sourcePath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');
const html = fs.readFileSync(htmlPath, 'utf8');

function sliceFunction(text, name, nextName) {
  const start = text.indexOf(`function ${name}`);
  const end = nextName ? text.indexOf(`function ${nextName}`, start + 1) : -1;
  if (start < 0 || (nextName && end <= start)) return '';
  return end > start ? text.slice(start, end) : text.slice(start);
}

function assertRealOnlyChart(label, text, styleText = text) {
  const chartFunction = sliceFunction(text, 'renderBusinessAnalyticsChart', 'renderBusinessAnalyticsSources');
  const rowsFromActivityFunction = sliceFunction(text, 'businessStatsChartRowsFromActivity', 'businessStatsChartMonthRowsFromDateRange');
  const parseMonthFunction = sliceFunction(text, 'parseStatsMonth', 'statsMonthSerial');
  const parseDateFunction = sliceFunction(text, 'businessProductStatsDateTime', 'businessProductStatsDateLabel');
  const forbiddenMarkers = [
    'function businessStatsChartSummaryFallbackSnapshot',
    'function renderBusinessAnalyticsSummaryFallbackChart',
    'function businessStatsEnsureChartTrajectory',
    'function businessStatsDistributeMetricAcrossRows',
    'function businessStatsTrajectoryWeight',
    'businessStatsChartSummaryFallbackSnapshot(data)',
    'renderBusinessAnalyticsSummaryFallbackChart()',
    'businessStatsEnsureChartTrajectory(',
    'businessStatsChartFallbackMetrics(',
    'Showing summary activity from the cards above while recorded chart buckets load.',
    'Array.from({ length: 12 }, (_, index) =>',
  ];
  const foundForbidden = forbiddenMarkers.filter((marker) => text.includes(marker));
  if (foundForbidden.length) {
    console.error(`${label}: business analytics can still draw a fake summary-based chart: ${foundForbidden.join(', ')}`);
    process.exit(1);
  }

  if (!chartFunction.includes('const usableSeries = series.length > 1 ? series : [];') || !chartFunction.includes('const rangeRows = businessStatsChartRowsForDataRange(data);') || !chartFunction.includes('let rows = rangeRows.length > 1 ? rangeRows : usableSeries.length ? usableSeries : businessStatsChartRowsFromVisibleRange(data);')) {
    console.error(`${label}: business analytics chart does not let the selected date range choose buckets before reusable series.`);
    process.exit(1);
  }

  if (!text.includes('function businessStatsChartRowsForDataRange') || !text.includes('function businessStatsChartRowsFromVisibleRange') || !chartFunction.includes('rangeRows.length > 1 || !businessStatsChartHasValues(rows, visibleSeries)')) {
    console.error(`${label}: compact analytics chart can still fall back to a single Now bucket instead of the selected date range.`);
    process.exit(1);
  }

  if (!text.includes('businessStatsVisualRenderToken') || !text.includes('function renderBusinessAnalyticsChartForToken') || !text.includes('window.clearTimeout(businessStatsSummaryChartObserverTimer);')) {
    console.error(`${label}: delayed analytics chart redraws can still restore a stale previous date range.`);
    process.exit(1);
  }

  if (!text.includes('function businessStatsCurrentAnalyticsRangeSnapshot') || !text.includes('const rawSnapshot = data || businessStatsCurrentAnalyticsRangeSnapshot() || calculateBusinessStats(')) {
    console.error(`${label}: live analytics refreshes can still rebuild the summary with the default 12-month range.`);
    process.exit(1);
  }

  if (text.includes('businessStatsChartEventDateRowsForFlatMonthRange') || chartFunction.includes('businessStatsChartEventDateRowsForFlatMonthRange(rows, data, visibleSeries)')) {
    console.error(`${label}: business analytics chart can ignore the selected date range by zooming to event-only buckets.`);
    process.exit(1);
  }

  if (!text.includes('function businessStatsClearTimeFilter') || !text.includes('businessStatsClearTimeFilter();')) {
    console.error(`${label}: business analytics range changes do not clear the old selected day/month marker.`);
    process.exit(1);
  }

  if (!chartFunction.includes('let selectedGuide = ""') || !chartFunction.includes('<circle cx="')) {
    console.error(`${label}: business analytics selected marker does not draw an exact point guide on the selected bucket.`);
    process.exit(1);
  }

  if (!chartFunction.includes('const hitWidth = rows.length <= 1 ? 38 : Math.max(10, Math.min(38, 532 / (rows.length - 1) * .82));') || !chartFunction.includes('width:\' + hitWidthPercent.toFixed(2) + \'%')) {
    console.error(`${label}: business analytics chart hit columns can overlap and select the wrong bucket.`);
    process.exit(1);
  }

  if (text.includes('.analytics-chart-hit.is-active::before')) {
    console.error(`${label}: business analytics selected bucket still draws a second CSS vertical line.`);
    process.exit(1);
  }

  if (!styleText.includes('.analytics-chart-tooltip') || !chartFunction.includes('class="analytics-chart-tooltip"') || !chartFunction.includes('analytics-chart-tooltip-stat') || chartFunction.includes(' title="\' + escapeText(detail) + \'"')) {
    console.error(`${label}: business analytics chart uses the native browser tooltip instead of the styled EMY hover tooltip.`);
    process.exit(1);
  }

  if (rowsFromActivityFunction.includes('label: "Now"')) {
    console.error(`${label}: compact analytics chart still has the single Now bucket fallback.`);
    process.exit(1);
  }

  if (!chartFunction.includes('businessStatsChartRowsFromActivity(rows, data)')) {
    console.error(`${label}: business analytics chart no longer buckets recorded activity events.`);
    process.exit(1);
  }

  if (!parseMonthFunction.includes('match(/^(\\d{4})-(\\d{2})$/)') || parseMonthFunction.includes('match(/^(\\\\d{4})-(\\\\d{2})$/)')) {
    console.error(`${label}: business analytics month parser is escaped incorrectly, so month presets cannot produce real buckets.`);
    process.exit(1);
  }

  if (!parseDateFunction.includes('match(/^(\\d{4})-(\\d{2})-(\\d{2})$/)') || parseDateFunction.includes('match(/^(\\\\d{4})-(\\\\d{2})-(\\\\d{2})$/)')) {
    console.error(`${label}: business analytics date parser is escaped incorrectly, so selected date ranges cannot produce real buckets.`);
    process.exit(1);
  }

  if (!text.includes('function businessStatsChartEventAmount') || !text.includes('raw.total') || !rowsFromActivityFunction.includes('const amount = businessStatsChartEventAmount(event);')) {
    console.error(`${label}: business analytics chart no longer preserves aggregate recovered view counts in dated buckets.`);
    process.exit(1);
  }

  if (!chartFunction.includes('No chart data yet') || !chartFunction.includes('No saved time buckets in this range')) {
    console.error(`${label}: business analytics empty state does not clearly avoid fake chart data.`);
    process.exit(1);
  }

  if (!chartFunction.includes('this chart only draws saved time-based activity')) {
    console.error(`${label}: business analytics chart detail does not explain missing recorded buckets honestly.`);
    process.exit(1);
  }
}

assertRealOnlyChart('source', source);
assertRealOnlyChart('runtime', runtime, html);

console.log(JSON.stringify({
  ok: true,
  page: 'emy-business-profile.html',
  runtime: path.relative(root, runtimePath),
  realSeriesOnly: true,
  bucketsRecordedEvents: true,
  noSummaryTrendFallback: true,
}, null, 2));

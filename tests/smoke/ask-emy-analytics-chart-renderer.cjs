'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

function assertIncludes(label, source, marker) {
  assert(String(source || '').includes(marker), `${label}: missing ${marker}`);
}

function assertNotIncludes(label, source, marker) {
  assert(!String(source || '').includes(marker), `${label}: forbidden marker ${marker}`);
}

const generator = read('src/generator/sections/20-transform-react-page.cjs');
const generatedAskEmy = [
  read('linked-pages/restore-may20/ask-emy-results.html'),
  read('linked-pages/restore-may20/assets/ask-emy-results-page.js'),
].join('\n');
const localServer = read('serve-linked-pages.cjs');
const functionsIndex = read('functions/index.js');

[
  ['Ask EMY generator', generator],
  ['generated Ask EMY page', generatedAskEmy],
].forEach(([label, source]) => {
  assertIncludes(label, source, 'function AnalyticsChartRenderer({ analytics, results = [] })');
  assertIncludes(label, source, 'function askAnalyticsResultFromBar(bar)');
  assertIncludes(label, source, 'function askEmyBrowserIsGenericAnalyticsQuery(query)');
  assertIncludes(label, source, 'function askEmyBrowserIsAnalyticsCapabilityQuestion(query)');
  assertIncludes(label, source, 'if (askEmyBrowserIsAnalyticsCapabilityQuestion(text)) return false;');
  assertIncludes(label, source, ': askEmyBrowserIsAnalyticsCapabilityQuestion(lowered) ? "conversation"');
  assertIncludes(label, source, 'if (askEmyBrowserIsAnalyticsCapabilityQuestion(text)) return true;');
  assertIncludes(label, source, 'askEmyBrowserIsGenericAnalyticsQuery(lowered) ? "analytics"');
  assertIncludes(label, source, 'anylitic: "analytic"');
  assertIncludes(label, source, 'const analyticsBlocked = askEmyIsNoCardQuestion(query) || askEmyBrowserIsAnalyticsCapabilityQuestion(query);');
  assertIncludes(label, source, 'const analyticsToolAllowed = responseType === "analytics_chart"');
  assertIncludes(label, source, 'const analyticsAllowed = !analyticsBlocked && analyticsToolAllowed');
  assertIncludes(label, source, 'analytics: analyticsAllowed && repairedEntry && repairedEntry.analytics ? repairedEntry.analytics : null,');
  assertIncludes(label, source, 'const analyticsLooksProduct = analyticsBars.some((bar) => {');
  assertIncludes(label, source, 'const analyticsChartVisible = Boolean(assistantDisplay.analytics && assistantDisplay.analytics.answer_type === "analytics_bar_chart" && (analyticsBars.length > 1 || !analyticsLooksProduct));');
  assertIncludes(label, source, '<AnalyticsChartRenderer analytics={analyticsChartVisible ? assistantDisplay.analytics : null} results={visibleResults} />');
  assertIncludes(label, source, 'askOpenNativeProductDetail(result);');
  assertIncludes(label, source, 'Open here <span className="ml-2" aria-hidden="true">{">"}</span>');
});

[
  ['local server', localServer],
  ['Firebase functions', functionsIndex],
].forEach(([label, source]) => {
  assertIncludes(label, source, 'type: "product"');
  assertIncludes(label, source, 'productName: productLabel');
  assertIncludes(label, source, 'businessKey:');
  assertIncludes(label, source, 'imageRef:');
  assertIncludes(label, source, 'mediaRef:');
  assertIncludes(label, source, 'productName: row.productName || row.name || row.label || ""');
  assertIncludes(label, source, 'url: row.url || ""');
  assertIncludes(label, source, 'function askEmyGenericAnalyticsPayload(query');
  assertIncludes(label, source, 'analytics: askEmyGenericAnalyticsPayload');
});

console.log(JSON.stringify({
  ok: true,
  analyticsChartRenderer: true,
}, null, 2));

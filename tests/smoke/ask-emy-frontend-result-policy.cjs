'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const source = fs.readFileSync(path.join(root, 'src/generator/sections/20-transform-react-page.cjs'), 'utf8');

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

function assertIncludes(marker) {
  assert(source.includes(marker), `frontend result policy: missing ${marker}`);
}

assertIncludes('const browserBrain = askEmyBrowserBrainDecision(query);');
assertIncludes('const suppressResults = !browserBrain.recordCardsAllowed;');
assertIncludes('function askEmyIsNoCardQuestion(query, context = {})');
assertIncludes('function askEmyExplicitRecordCardQuery(query, context = {})');
assertIncludes('const explicitRecordCardsAllowed = askEmyExplicitRecordCardQuery(clean, context);');
assertIncludes('explicitRecordCardsAllowed');
assertIncludes('if (!query) return false;');
assertIncludes('askEmyIsNoCardQuestion(query)');
assertIncludes('tell me about my account|what do you know about my account|my account details|my account information|do you know who i am|who am i|what do i do|what should i do|where do i start');
assertIncludes('const serverProvidedResults = Array.isArray(payload.results);');
assertIncludes('/^(openinlineview|getownedbusinesscard|getownedbusinesscards|getcustomerprofilecard|getviewerprofilecards|getmediapreview)$/i.test(String(serverSelectedTool || "").trim())');
assertIncludes('const shouldSuppressResults = suppressResults && !serverAllowsInlineResults;');
assertIncludes('const results = shouldSuppressResults ? [] : serverProvidedResults');
assertIncludes('? payload.results.map(normaliseAskResult).filter(Boolean)');
assertIncludes(': [];');
assertIncludes('function askEmyHasGeneratedInlineView(entry)');
assertIncludes('if (askEmyHasGeneratedInlineView(entry)) return true;');
assertIncludes('const generatedInlineViewAllowed = askEmyHasGeneratedInlineView(repairedEntry);');
assertIncludes('const suppressResults = !generatedInlineViewAllowed &&');
assert(!source.includes(': fallback.results;'), 'frontend result policy: must not fall back to local cards when the server omits results');
assertIncludes('responseType: payload.responseType || browserBrain.responseType || ""');
assertIncludes('selectedToolName: payload.selectedToolName || browserBrain.selectedToolName || ""');
assertIncludes('if (/\\b(near|nearby|near me|around me|postcode|radius|km|miles|map|directions|location|area|close to)\\b/.test(lowered)) return "SEARCH_NEARBY";');

const oldFallbackPattern = /Array\.isArray\(payload\.results\)\s*&&\s*payload\.results\.length[\s\S]{0,80}: fallback\.results/;
assert(!oldFallbackPattern.test(source), 'frontend result policy: must not fall back to local cards when server returns an empty results array');

console.log(JSON.stringify({
  ok: true,
  frontendResultPolicy: true,
}, null, 2));

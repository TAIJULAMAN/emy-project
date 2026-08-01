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
  assert(!String(source || '').includes(marker), `${label}: should not include ${marker}`);
}

function assertBefore(label, source, firstMarker, secondMarker) {
  const first = source.indexOf(firstMarker);
  const second = source.indexOf(secondMarker);
  assert(first >= 0, `${label}: missing first marker ${firstMarker}`);
  assert(second >= 0, `${label}: missing second marker ${secondMarker}`);
  assert(first < second, `${label}: expected ${firstMarker} before ${secondMarker}`);
}

function blockAfter(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  assert(start >= 0, `missing start marker ${startMarker}`);
  const afterStart = source.slice(start);
  const end = afterStart.indexOf(endMarker);
  assert(end >= 0, `missing end marker ${endMarker}`);
  return afterStart.slice(0, end);
}

function assertRuntimeWiring(label, source) {
  assertIncludes(label, source, 'askEmyConversationState');
  assertIncludes(label, source, 'function askEmyApplyToolResultPolicy(result, brain)');
  assertIncludes(label, source, 'function askEmyExecuteSelectedTool(query');
  assertIncludes(label, source, 'if (!brain.recordCardsAllowed) next.results = [];');
  assertIncludes(label, source, 'next.selectedToolName = next.selectedToolName || brain.selectedToolName || brain.plannerToolHint || "";');
  assertIncludes(label, source, 'if (selectedToolName === "answerDirectly") {');
  assertIncludes(label, source, 'next.responseType = "chat_answer";');
  assertIncludes(label, source, 'if (!askEmyResponseIsAnalyticsTool(selectedToolName)) next.analytics = null;');
  assertIncludes(label, source, 'function askEmySecureFinalResponse(result, brain = {})');
  assertIncludes(label, source, 'validateAskEmyResponse(brain, next)');
  assertIncludes(label, source, 'const toolName = brain.selectedToolName || brain.plannerToolHint || "";');
  assertIncludes(label, source, 'function askEmySimpleGreetingAnswer(query, payload = {})');
  assertIncludes(label, source, 'provider: "local-greeting"');
  assertIncludes(label, source, 'provider: "local-identity"');
  assertIncludes(label, source, 'Only introduce yourself with I\'m EMY for identity questions.');
  assertIncludes(label, source, 'never say I\'m EMY or Ask EMY');
  assertIncludes(label, source, '"I\'m EMY, the guide inside EMY.');
  assertNotIncludes(label, source, '"I\'m Ask EMY, the guide inside EMY.');

  [
    'toolName === "answerDirectly"',
    'toolName === "getViewerAccount"',
    'toolName === "getViewerLocation"',
    'toolName === "guideNextStep"',
    'toolName === "createDraft"',
    'toolName === "getCustomerSelfContent"',
    'toolName === "getDailyEmyUpdate"',
    'toolName === "getOwnedProducts"',
    'toolName === "getOwnedClips"',
    'toolName === "getOwnedArticles"',
    'toolName === "getOwnedPosts"',
    'toolName === "getOwnedBusinessCard"',
    'toolName === "getMostViewedProduct"',
    'toolName === "getTopProductByMetric"',
    'toolName === "getTopProductsAnalytics"',
    'toolName === "compareProductClipViews"',
    'toolName === "getBusinessStatsOverview"',
    'toolName === "searchNearby"',
    'toolName === "searchProducts"',
    'toolName === "openInlineView"',
  ].forEach((marker) => assertIncludes(label, source, marker));

  assertIncludes(label, source, '.replace(/\\b[a-z]{1,2}\\d[a-z\\d]?\\s*\\d[a-z]{2}\\b/gi, " ")');
  assertIncludes(label, source, "I don't see any products near ${location} within ${radius} right now.");

  assertIncludes(label, source, 'return result ? askEmyApplyToolResultPolicy(result, brain) : null;');
}

const localServer = read('serve-linked-pages.cjs');
const functionsIndex = read('functions/index.js');
const localEntryPoint = localServer.slice(localServer.indexOf('async function getAiAskEmyAnswer'));
const firebaseEntryPoint = functionsIndex.slice(functionsIndex.indexOf('async function askEmyAnswer'));
const localAiResult = localServer.slice(localServer.indexOf('function aiAskEmyResult'));
const firebaseAiResult = functionsIndex.slice(functionsIndex.indexOf('function askEmyAiResult'));

assertRuntimeWiring('local server', localServer);
assertRuntimeWiring('Firebase functions', functionsIndex);

assertIncludes('local server AI-first policy', localEntryPoint, 'if (!aiWorkerAvailable) {');
assertIncludes('local server AI-first policy', localServer, 'function askEmyShouldReturnToolBeforeAi(brain = {}, aiWorkerAvailable = false)');
assertIncludes('local server AI-first policy', localServer, 'function askEmyAiUnavailableAnswer(provider = "ai-unavailable", error = null)');
assertIncludes('local server AI-first policy', localEntryPoint, 'askEmyShouldReturnToolBeforeAi(brain, aiWorkerAvailable)');
assertIncludes('local server AI-first policy', localServer, 'results: [],');
assertIncludes('Firebase AI-first policy', firebaseEntryPoint, 'const aiWorkerAvailable = provider === "openai" && Boolean(openAiKey)');
assertIncludes('Firebase AI-first policy', firebaseEntryPoint, 'if (!aiWorkerAvailable) {');
assertIncludes('Firebase AI-first policy', functionsIndex, 'function askEmyAiUnavailableAnswer(provider = "ai-unavailable", error = null)');

[
  'addAccount(payload.business);',
  'addAccount(payload.activeBusiness);',
  'addAccount(payload.selectedBusiness);',
  'if (Array.isArray(payload.ownedBusinesses)) payload.ownedBusinesses.forEach(addAccount);',
  'if (Array.isArray(payload.managedBusinesses)) payload.managedBusinesses.forEach(addAccount);',
].forEach((marker) => assertIncludes('local server owned business scope', localServer, marker));

[
  'addAccount(payload && payload.business);',
  'addAccount(payload && payload.activeBusiness);',
  'addAccount(payload && payload.selectedBusiness);',
  'if (Array.isArray(payload && payload.ownedBusinesses)) payload.ownedBusinesses.forEach(addAccount);',
  'if (Array.isArray(payload && payload.managedBusinesses)) payload.managedBusinesses.forEach(addAccount);',
].forEach((marker) => assertIncludes('Firebase owned business scope', functionsIndex, marker));

assertBefore(
  'local server AI worker skips deterministic tool ownership',
  localEntryPoint,
  'if (!aiWorkerAvailable) {',
  'const messages = buildAskMessages(payload);'
);

const localNoAiBlock = blockAfter(localEntryPoint, 'if (!aiWorkerAvailable) {', 'const messages = buildAskMessages(payload);');
const firebaseNoAiBlock = blockAfter(firebaseEntryPoint, 'if (!aiWorkerAvailable) {', 'const messages = askEmyBuildMessages(payload || {}, records, analyticsSummary);');
assertIncludes('local server no-AI block', localNoAiBlock, 'return askEmyAiUnavailableAnswer("ai-unavailable");');
assertIncludes('Firebase no-AI block', firebaseNoAiBlock, 'return askEmyAiUnavailableAnswer("ai-unavailable");');
assertNotIncludes('local server no-AI block', localNoAiBlock, 'askEmyExecuteSelectedTool');
assertNotIncludes('local server no-AI block', localNoAiBlock, 'localAskEmyAnswer');
assertNotIncludes('Firebase no-AI block', firebaseNoAiBlock, 'askEmyExecuteSelectedTool');
assertNotIncludes('Firebase no-AI block', firebaseNoAiBlock, 'askEmyLocalAnswer');

assertIncludes('local server AI result contract', localAiResult, 'if (!cleanAnswer) return askEmyAiUnavailableAnswer(`ai-empty:${provider}`);');
assertIncludes('local server AI result contract', localAiResult, 'answer: cleanAnswer,');
assertIncludes('local server AI result contract', localAiResult, 'results: [],');
assertNotIncludes('local server AI result contract', localAiResult, 'cleanAnswer ||');
assertNotIncludes('local server AI result contract', localAiResult, 'askEmyStructuredSearchAnswer(bundle');
assertNotIncludes('local server AI result contract', localAiResult, 'askEmyNoValidatedRecordsAnswer');

assertIncludes('Firebase AI result contract', firebaseAiResult, 'if (!cleanAnswer) return askEmyAiUnavailableAnswer(`ai-empty:${provider}`);');
assertIncludes('Firebase AI result contract', firebaseAiResult, 'answer: cleanAnswer,');
assertIncludes('Firebase AI result contract', firebaseAiResult, 'results: [],');
assertNotIncludes('Firebase AI result contract', firebaseAiResult, 'cleanAnswer ||');
assertNotIncludes('Firebase AI result contract', firebaseAiResult, 'askEmyStructuredSearchAnswer(bundle');
assertNotIncludes('Firebase AI result contract', firebaseAiResult, 'askEmyNoValidatedRecordsAnswer');

console.log(JSON.stringify({
  ok: true,
  runtimeToolExecution: true,
}, null, 2));

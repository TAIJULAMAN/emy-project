'use strict';

const fs = require('fs');
const path = require('path');
const contract = require('../../src/ask-emy/assistant-contract.cjs');
const planner = require('../../src/ask-emy/brain-planner.cjs');
const toolRegistry = require('../../src/ask-emy/tool-registry.cjs');
const toolRouter = require('../../src/ask-emy/tool-router.cjs');
const conversationState = require('../../src/ask-emy/conversation-state.cjs');
const actionCatalog = require('../../src/ask-emy/action-catalog.cjs');

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

function assertIncludes(label, value, marker) {
  assert(String(value || '').includes(marker), `${label}: missing ${marker}`);
}

function assertNotIncludes(label, value, marker) {
  assert(!String(value || '').includes(marker), `${label}: forbidden marker ${marker}`);
}

const doc = read('docs/emy-assistant-contract-v1.md');
const localServer = read('serve-linked-pages.cjs');
const functionsIndex = read('functions/index.js');
const askGenerator = read('src/generator/sections/20-transform-react-page.cjs');
const askSession = read('src/generator/sections/05-ask-session.cjs');
const plannerSource = read('src/ask-emy/brain-planner.cjs');
const conversationStateSource = read('src/ask-emy/conversation-state.cjs');
const actionCatalogSource = read('src/ask-emy/action-catalog.cjs');
const toolRegistrySource = read('src/ask-emy/tool-registry.cjs');
const toolRouterSource = read('src/ask-emy/tool-router.cjs');

assert(contract.EMY_ASSISTANT_CONTRACT_VERSION === 'v1', 'contract module: wrong version');
assert(typeof planner.planAskEmyMessage === 'function', 'planner module: missing planAskEmyMessage');
assert(typeof conversationState.resolveConversationState === 'function', 'conversation state module: missing resolveConversationState');
assert(typeof conversationState.validateAskEmyResponse === 'function', 'conversation state module: missing validateAskEmyResponse');
assert(typeof actionCatalog.resolveEmyAction === 'function', 'action catalog module: missing resolveEmyAction');
assert(actionCatalog.resolveEmyAction('open job here').responseType === 'inline_job_view', 'action catalog module: open job route failed');
assert(actionCatalog.resolveEmyAction('create a product').toolHint === 'createDraft', 'action catalog module: create product route failed');
assert(actionCatalog.assertNoAdminActionUrls() === true, 'action catalog module: admin URL safety failed');
assert(typeof toolRegistry.routeAskEmyTool === 'function', 'tool registry module: missing routeAskEmyTool');
assert(typeof toolRouter.routeAskEmyMessage === 'function', 'tool router module: missing routeAskEmyMessage');
assert(planner.planAskEmyMessage('who am I?').intent === 'IDENTITY', 'planner module: identity route failed');
assert(planner.planAskEmyMessage('shops near me').locationSearchAllowed === true, 'planner module: location route failed');
assert(toolRouter.routeAskEmyMessage('who am I?').tool.name === 'getViewerAccount', 'tool router: identity tool route failed');
assert(toolRouter.routeAskEmyMessage('shops near me').tool.name === 'searchNearby', 'tool router: nearby tool route failed');

[
  'Operating Model',
  'Brain layer',
  'Intent planner',
  'Conversation memory',
  'Page context provider',
  'Tool router',
  'Permission matrix',
  'Privacy guard',
  'UI response planner',
  'Analytics engine',
  'Final response validator',
  'No Dumping Rule',
  'Definition Of Done',
].forEach((marker) => assertIncludes('assistant contract document', doc, marker));

[
  'hi',
  'who am I?',
  'what do I do?',
  'show my customer content',
  "if I'm the customer how many posts do I have?",
  'show me my products',
  'show me the product most viewed',
  'can you see my location as a customer?',
].forEach((prompt) => {
  assert(contract.EVALUATION_PROMPTS.includes(prompt), `contract prompts: missing ${prompt}`);
  assertIncludes('assistant contract document', doc, prompt);
});

[
  'never expose admin backend links',
  'never mix customer account with business account',
  'never use business location as customer location',
  'never dump saved context',
].forEach((rule) => {
  assert(contract.HARD_PRIVACY_RULES.includes(rule), `privacy rules: missing ${rule}`);
  assertIncludes('assistant contract document', doc, rule);
});

[
  ['local server', localServer],
  ['Firebase functions', functionsIndex],
].forEach(([label, source]) => {
  assertIncludes(label, source, 'function askEmyAssistantBrain(query');
  assertIncludes(label, source, 'ASK_EMY_ASSISTANT_ONLY_INTENTS');
  assertIncludes(label, source, 'ASK_EMY_RECORD_CARD_INTENTS');
  assertIncludes(label, source, 'recordCardsAllowed');
  assertIncludes(label, source, 'EMY_ASSISTANT_CONTRACT_VERSION = "v1"');
  assertIncludes(label, source, 'function askEmyBrainResponseType(intent, recordCardsAllowed)');
  assertIncludes(label, source, 'askEmyPlanMessage');
  assertIncludes(label, source, 'askEmyRoutePlannedTool');
  assertIncludes(label, source, 'askEmyIntentFromPlanner');
  assertIncludes(label, source, 'cardsAllowedReason');
  assertIncludes(label, source, 'contractVersion: EMY_ASSISTANT_CONTRACT_VERSION');
  assertIncludes(label, source, 'plannerIntent');
  assertIncludes(label, source, 'plannerToolHint');
  assertIncludes(label, source, 'selectedToolName');
  assertIncludes(label, source, 'selectedToolPermission');
  assertIncludes(label, source, 'selectedToolDataSource');
  assertIncludes(label, source, 'selectedToolRequiresConfirmation');
  assertIncludes(label, source, 'selectedToolUsesExistingView');
  assertIncludes(label, source, 'locationSearchAllowed');
  assertIncludes(label, source, 'if (minimalViewerIntent) viewerContext.ownedBusinessAliases = [];');
  assertIncludes(label, source, 'location: minimalViewerIntent ? "" : location');
  assertIncludes(label, source, 'radius: minimalViewerIntent ? "" : radius');
  assertIncludes(label, source, 'Private operating loop: read the conversation memory');
  assertIncludes(label, source, 'Reason privately before answering');
  assertIncludes(label, source, 'Choose tools deliberately');
  assertIncludes(label, source, 'Never force every message into search, cards, charts, or saved records');
  assertIncludes(label, source, 'const finalResults = brain.recordCardsAllowed ? results : [];');
  assertIncludes(label, source, 'askEmyIsOwnedProductListQuery');
  assertIncludes(label, source, 'askEmyIsSingleTopProductMetricQuestion');
  assertIncludes(label, source, 'askEmyViewerProfileAnswer');
  assertIncludes(label, source, 'askEmyViewerLocationAnswer');
  assertNotIncludes(label, source, 'if (target === "data") return "emy-admin-backend.html";');
});

[
  ['Ask EMY generator', askGenerator],
].forEach(([label, source]) => {
  assertIncludes(label, source, 'function askEmyBrowserBrainDecision(query');
  assertIncludes(label, source, 'recordCardsAllowed');
  assertIncludes(label, source, 'EMY_ASSISTANT_CONTRACT_VERSION = "v1"');
  assertIncludes(label, source, 'function askEmyBrowserBrainResponseType(intent, recordCardsAllowed)');
  assertIncludes(label, source, 'function askEmyBrowserPlannerIntentFromDecision(intent, lowered)');
  assertIncludes(label, source, 'function askEmyBrowserPlannerToolHint(plannerIntent)');
  assertIncludes(label, source, 'cardsAllowedReason');
  assertIncludes(label, source, 'contractVersion: EMY_ASSISTANT_CONTRACT_VERSION');
  assertIncludes(label, source, 'plannerIntent');
  assertIncludes(label, source, 'plannerToolHint');
  assertIncludes(label, source, 'function askEmyBrowserToolPolicy(toolHint)');
  assertIncludes(label, source, 'selectedToolName');
  assertIncludes(label, source, 'selectedToolPermission');
  assertIncludes(label, source, 'selectedToolDataSource');
  assertIncludes(label, source, 'selectedToolRequiresConfirmation');
  assertIncludes(label, source, 'selectedToolUsesExistingView');
  assertIncludes(label, source, 'locationSearchAllowed');
  assertIncludes(label, source, 'mode: recordCardsAllowed ? "records" : "assistant"');
  assertIncludes(label, source, 'function askEmyShouldRenderResultCards(entry, previousUserMessage = null)');
  assertIncludes(label, source, 'askEmyBrowserIsSingleProductMetricQuestion');
  assertIncludes(label, source, 'askEmyBrowserIsViewerProfileQuery');
  assertIncludes(label, source, 'askEmyBrowserIsViewerLocationQuery');
  assertNotIncludes(label, source, 'if (target === "data") return "emy-admin-backend.html";');
});

assertIncludes('Ask session repair', askSession, 'function repairStoredAskMessage(message, previousUserMessage');
assertIncludes('Ask session repair blocks viewer profile dumps', askSession, 'storedAskTextLooksViewerProfileQuestion');
assertIncludes('Ask session repair blocks viewer location dumps', askSession, 'storedAskTextLooksViewerLocationQuestion');
assertIncludes('Ask EMY planner module', plannerSource, 'function planAskEmyMessage(query, context = {})');
assertIncludes('Ask EMY planner module', plannerSource, 'function classifyIntent(normalizedText, context = {})');
assertIncludes('Ask EMY planner module', plannerSource, 'resolveConversationState(clean, context)');
assertIncludes('Ask EMY planner module', plannerSource, 'resolveEmyAction(normalizedText, plannerContext)');
assertIncludes('Ask EMY conversation state module', conversationStateSource, 'function resolveConversationState(query, context = {})');
assertIncludes('Ask EMY conversation state module', conversationStateSource, 'function validateAskEmyResponse(plan = {}, response = {})');
assertIncludes('Ask EMY action catalog module', actionCatalogSource, 'const EMY_ACTION_CATALOG');
assertIncludes('Ask EMY action catalog module', actionCatalogSource, 'function resolveEmyAction(query, context = {})');
assertNotIncludes('Ask EMY action catalog module', actionCatalogSource, 'emy-admin-backend.html');
assertIncludes('Ask EMY planner module', plannerSource, 'toolHintForPlan');
assertIncludes('Ask EMY planner module', plannerSource, 'locationSearchAllowed');
assertIncludes('Ask EMY tool registry module', toolRegistrySource, 'const ASK_EMY_TOOL_REGISTRY');
assertIncludes('Ask EMY tool registry module', toolRegistrySource, 'function routeAskEmyTool(plan = {})');
assertIncludes('Ask EMY tool registry module', toolRegistrySource, 'function assertAskEmyToolSafe(tool)');
assertIncludes('Ask EMY tool router module', toolRouterSource, 'function routeAskEmyMessage(query, context = {})');
assertIncludes('Ask EMY tool router module', toolRouterSource, 'routeAskEmyTool(plan)');

[
  'chat_answer',
  'guidance_steps',
  'inline_product_view',
  'analytics_chart',
  'draft_preview',
  'confirmation_question',
].forEach((type) => {
  assert(contract.RESPONSE_TYPES.includes(type), `response types: missing ${type}`);
});

console.log(JSON.stringify({
  ok: true,
  assistantContract: contract.EMY_ASSISTANT_CONTRACT_VERSION,
  contractPrompts: contract.EVALUATION_PROMPTS.length,
  privacyRules: contract.HARD_PRIVACY_RULES.length,
}, null, 2));

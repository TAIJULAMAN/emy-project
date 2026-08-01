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

function assertContains(label, source, marker) {
  assert(String(source || '').includes(marker), `${label}: missing ${marker}`);
}

function assertNotContains(label, source, marker) {
  assert(!String(source || '').includes(marker), `${label}: forbidden ${marker}`);
}

const generator = [
  read('src/generator/sections/19-ask-auth-components.cjs'),
  read('src/generator/sections/20-transform-react-page.cjs'),
].join('\n');
const localServer = read('serve-linked-pages.cjs');
const functionsIndex = read('functions/index.js');
const generatedResultsPath = path.join(root, 'linked-pages', 'restore-may20', 'ask-emy-results.html');
const generatedResultsRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'ask-emy-results-page.js');
const generatedResults = [
  fs.existsSync(generatedResultsPath) ? fs.readFileSync(generatedResultsPath, 'utf8') : '',
  fs.existsSync(generatedResultsRuntimePath) ? fs.readFileSync(generatedResultsRuntimePath, 'utf8') : '',
].join('\n');
const generatedAskPath = path.join(root, 'linked-pages', 'restore-may20', 'ask-emy.html');
const generatedAsk = fs.existsSync(generatedAskPath) ? fs.readFileSync(generatedAskPath, 'utf8') : '';

[
  ['Ask EMY generator', generator],
  ['generated Ask EMY results', generatedResults],
].forEach(([label, source]) => {
  if (!source) return;
  assertContains(label, source, 'function AskActionPanel({ action, responseType = "", selectedToolName = "", results = [], messageId = "" })');
  assertContains(label, source, '<AskActionPanel action={assistantDisplay.action}');
  assertContains(label, source, 'results={visibleResults}');
  assertContains(label, source, 'Draft here');
  assertContains(label, source, 'Prepare draft');
  assertContains(label, source, 'Copy filled fields');
  assertContains(label, source, 'scope: String(action && action.scope || "").trim().toLowerCase()');
  assertContains(label, source, 'const directUrl = String(action && action.url || "").trim();');
  assertContains(label, source, 'emy-customer-home.html?tab=feeds&askDraft=post#feeds');
  assertContains(label, source, 'emyAskActionLatestDraft');
  assertContains(label, source, 'askActionOpenResultHere(result, setInlineResult)');
  assertContains(label, source, 'Open here:');
  assertContains(label, source, 'function AskGeneratedResultCardWindow({ result, onClose })');
  assertContains(label, source, 'function askInlineGeneratedCardResult(result)');
  assertContains(label, source, 'const generatedResult = askInlineGeneratedCardResult(result);');
  assertContains(label, source, '/emy-business-profile\\.html/i.test(url)');
  assertContains(label, source, 'variant: "business"');
  assertContains(label, source, 'if (generatedResult && generatedResult.viewSpec && typeof generatedResult.viewSpec === "object")');
  assertContains(label, source, '<ResultCard result={result} />');
  assertContains(label, source, 'const viewSpec = result && result.viewSpec');
  assertContains(label, source, 'viewSpec: result?.viewSpec && typeof result.viewSpec === "object" ? result.viewSpec : null');
  assertContains(label, source, 'const hasGeneratedViewSpec = results.some((result) => result && result.viewSpec && typeof result.viewSpec === "object");');
  assertContains(label, source, 'function askEmyHasGeneratedInlineView(entry)');
  assertContains(label, source, 'if (askEmyHasGeneratedInlineView(entry)) return true;');
  assertContains(label, source, 'const generatedInlineViewAllowed = askEmyHasGeneratedInlineView(repairedEntry);');
  assertContains(label, source, 'const suppressResults = !generatedInlineViewAllowed &&');
  assertContains(label, source, 'if (selectedTool === "openinlineview" && hasGeneratedViewSpec) return true;');
  assertContains(label, source, 'if (selectedTool === "getcustomerselfcontent") return true;');
  assertContains(label, source, 'Created by Ask EMY');
  assertContains(label, source, 'const specVariant = String(viewSpec.variant || "profile")');
  assertContains(label, source, 'function formatGeneratedViewSpecForAction(result)');
  assertContains(label, source, 'const generatedCardText = formatGeneratedViewSpecForAction(result);');
  assertContains(label, source, 'appendItems("Details", viewSpec.facts);');
  assertContains(label, source, 'const ASK_EMY_FEEDBACK_STORAGE_KEY = "emyAskFeedback";');
  assertContains(label, source, 'function persistAskEmyFeedback(payload)');
  assertContains(label, source, 'fetch("/api/ask-emy/feedback"');
  assertContains(label, source, 'aria-pressed={reaction === "like"}');
  assertContains(label, source, '<ResponseActions result={result} text={formatResultForAction(result)}');
  assertContains(label, source, 'const isBusinessSpec = specVariant === "business";');
  assertContains(label, source, 'const isIdentitySpec = specVariant === "identity";');
  assertContains(label, source, 'const useSideMedia = hasSpecMedia && isMediaSpec;');
  assertContains(label, source, 'Business profile card');
  assertContains(label, source, '<div className="grid gap-0">');
  assertNotContains(label, source, 'xl:grid-cols-[minmax(220px,300px)_minmax(0,1fr)]');
  assertContains(label, source, 'const mediaBlockSizeClass = isMediaSpec ? "aspect-[16/5] min-h-0"');
  assertNotContains(label, source, 'min-h-[320px]');
  assertContains(label, source, '{useSideMedia && (');
  assertContains(label, source, 'const specActionLabel = resultOpenLabel(type);');
  assertContains(label, source, 'specVariant === "media"');
  assertContains(label, source, '.join("\\n")');
  assertContains(label, source, 'Existing EMY view');
  assertContains(label, source, 'customer account|personal profile|personal account/.test(clean)) return "customer-profile";');
  assertContains(label, source, 'if (target === "customer-profile") return ["customer-profile", "profile"].includes(type);');
  assertContains(label, source, '.filter((message) => message.role === "assistant" && askEmyMessageCanStop(message))');
  assertContains(label, source, '.map((message) => message.id)');
  assertContains(label, source, 'const pendingAskRequestsRef = useRef(new Map());');
  assertContains(label, source, 'const generatedViewCount = visibleResults.filter((result) => result && result.viewSpec && typeof result.viewSpec === "object").length;');
  assertContains(label, source, 'const generatedInlineViewVisible = Boolean(generatedViewCount > 0 && /^(openinlineview|getownedbusinesscard|getownedbusinesscards|getcustomerprofilecard|getviewerprofilecards|getmediapreview)$/i.test(String(assistantDisplay.selectedToolName || "").trim()));');
  assertContains(label, source, '{!generatedInlineViewVisible && <AskActionPanel action={assistantDisplay.action}');
  assertContains(label, source, 'generatedViewCount <= 1');
  assertContains(label, source, 'const clearAskRequest = (pendingId, options = {}) => {');
  assertContains(label, source, 'pendingAskRequestsRef.current.has(pendingId)');
  assertContains(label, source, 'clearAskRequest(pendingId, { abort: true });');
  assertContains(label, source, 'signal: controller ? controller.signal : null,');
  assertContains(label, source, 'const pendingAskStateKey = activeChat.messages');
  assertContains(label, source, '[activeChat.id, pendingAskKey, pendingAskStateKey, location, radius]');
  assertContains(label, source, 'const submitLockRef = useRef({ text: "", at: 0 });');
  assertContains(label, source, 'event.preventDefault(); submit();');
  assertNotContains(label, source, 'onKeyDown={(event) => event.key === "Enter" && submit()}');
  assertNotContains(label, source, 'pendingAskReplyRef');
  assertNotContains(label, source, 'pendingAskReplyStartedAtRef');
  assertNotContains(label, source, 'Open this\\nOpen: ');
  assertNotContains(label, source, 'Open the right place\\nOpen: ');
  assertNotContains(label, source, '.join("\n")');
});

assertContains('Ask EMY generator submit debounce', generator, 'lastSubmit.text === clean && now - Number(lastSubmit.at || 0) < 900');

[
  ['generated Ask EMY results repair text', generatedResults],
  ['generated Ask EMY entry repair text', generatedAsk],
].forEach(([label, source]) => {
  if (!source) return;
  assertNotContains(label, source, 'Open this\\nOpen: ');
  assertNotContains(label, source, 'Open the right place\\nOpen: ');
  assertNotContains(label, source, 'Open: emy-business-profile.html');
});

assertContains('generated Ask EMY results pending reply flow', generatedResults, 'pendingAskRequestsRef.current.set(pendingId, {');
assertContains('generated Ask EMY results pending reply flow', generatedResults, 'fetchAskEmyReply(query, {');

[
  ['local server', localServer],
  ['Firebase functions', functionsIndex],
].forEach(([label, source]) => {
  assertContains(label, source, 'next.action = {');
  assertContains(label, source, 'const actionToolName = brain.selectedToolName || brain.plannerToolHint || "";');
  assertContains(label, source, 'const shouldAttachAction = actionToolName === "createDraft" || actionToolName === "openInlineView";');
  assertContains(label, source, 'scope: brain.actionScope || ""');
  assertContains(label, source, 'url: brain.actionUrl || ""');
  assertContains(label, source, 'draftFields: Array.isArray(brain.actionDraftFields) ? brain.actionDraftFields : []');
  assertContains(label, source, 'usesExistingView: Boolean(brain.actionUsesExistingView)');
  assertContains(label, source, 'askEmyProfileViewSpec');
  assertContains(label, source, 'askEmyBusinessCardViewSpec');
  assertContains(label, source, 'viewSpec: askEmyProfileViewSpec');
  assertContains(label, source, 'viewSpec: askEmyBusinessCardViewSpec');
  assertNotContains(label, source, 'Open: ${actionUrl}');
});

assertContains('local server feedback endpoint', localServer, 'const askEmyFeedbackStorePath = path.join(__dirname, ".emy-ask-feedback.json");');
assertContains('local server feedback endpoint', localServer, 'function normaliseAskEmyFeedbackPayload(payload = {})');
assertContains('local server feedback endpoint', localServer, 'async function handleAskEmyFeedback(req, res)');
assertContains('local server feedback endpoint', localServer, 'if (url.pathname === "/api/ask-emy/feedback")');

console.log(JSON.stringify({
  ok: true,
  actionUi: true,
  generatedChecked: Boolean(generatedResults && generatedAsk),
}, null, 2));

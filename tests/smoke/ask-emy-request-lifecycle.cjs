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

function assertIncludes(label, text, marker) {
  assert(text.includes(marker), `${label}: missing ${marker}`);
}

function assertNotIncludes(label, text, marker) {
  assert(!text.includes(marker), `${label}: must not contain ${marker}`);
}

const source = read('src/generator/asset-sources/ask-emy-results-page.js');
const generated = read('linked-pages/restore-may20/assets/ask-emy-results-page.js');
const html = read('linked-pages/restore-may20/ask-emy-results.html');
const initialHtml = read('linked-pages/restore-may20/ask-emy.html');

for (const [label, text] of [
  ['source Ask EMY page', source],
  ['generated Ask EMY page', generated],
]) {
  assertIncludes(label, text, 'const pendingAskRequestsRef = useRef(new Map());');
  assertIncludes(label, text, 'function askEmyMessageLooksLoading(message = {})');
  assertIncludes(label, text, 'function askEmyMessageCanStop(message = {})');
  assertIncludes(label, text, 'const clearAskRequest = (pendingId, options = {}) => {');
  assertIncludes(label, text, 'clearAskRequest(pendingId, { abort: true });');
  assertIncludes(label, text, 'signal: controller ? controller.signal : options.signal,');
  assertIncludes(label, text, 'signal: controller ? controller.signal : null,');
  assertIncludes(label, text, 'pendingAskRequestsRef.current.has(pendingId)');
  assertIncludes(label, text, 'const pendingReplies = activeChat?.messages?.filter((message) => message.role === "assistant" && askEmyMessageCanStop(message)) || [];');
  assertIncludes(label, text, 'text: "Stopped. You can send another question now.",');
  assertIncludes(label, text, 'const ASK_EMY_AI_FIRST_FRONTEND_VERSION = 2;');
  assertIncludes(label, text, 'function askEmyAssistantMessageNeedsLiveRefresh(message, previousUserMessage, isLatestAssistant)');
  assertIncludes(label, text, 'const liveAiRefreshKey = activeChat.messages');
  assertIncludes(label, text, 'text: askEmyAiUnavailableFrontendMessage("request timed out"),');
  assertIncludes(label, text, 'provider: "ai-timeout",');
  assertIncludes(label, text, 'provider: "ai-unavailable",');
  assertIncludes(label, text, 'aiFirstVersion: ASK_EMY_AI_FIRST_FRONTEND_VERSION,');
  assertNotIncludes(label, text, 'messages: chat.messages.filter((message) => message.id !== pendingId)');
  assertIncludes(label, text, 'data-ask-stop-reply="true"');
  assertIncludes(label, text, 'label="Stop response"');
  assertIncludes(label, text, 'onClick={onStopReply}');
  assertNotIncludes(label, text, 'onClick={stopReply}');
  assertIncludes(label, text, '{hasPendingReply ? (');
  assertIncludes(label, text, 'messageId={entry.id}');
  assertIncludes(label, text, 'throw new Error(lastError || "Ask EMY request timed out")');
  assertNotIncludes(label, text, 'That took too long, so I stopped it instead of keeping the chat frozen');
  assertNotIncludes(label, text, 'I stopped that stuck answer instead of leaving the chat loading');
  assertNotIncludes(label, text, 'function repairedStoredAskStoppedReply(message, previousUserMessage = null) {');
  assertNotIncludes(label, text, 'localAskEmyReply');
  assertNotIncludes(label, text, 'pendingAskReplyRef');
  assertNotIncludes(label, text, 'pendingAskReplyStartedAtRef');
  assertNotIncludes(label, text, 'autoRecoveredCards: true');
  assertNotIncludes(label, text, 'I could not reach the Ask EMY AI server. I do not have verified EMY records loaded');
}

assert(
  source === generated,
  'generated Ask EMY page must match the canonical asset source'
);

assertIncludes(
  'Ask EMY results HTML',
  html,
  'assets/ask-emy-results-page.js?v='
);
assertNotIncludes(
  'Ask EMY results HTML',
  html,
  'assets/ask-emy-results-page.js?v=direct-send-fetch-20260705-open-inline'
);
assertIncludes(
  'Ask EMY initial page',
  initialHtml,
  'function repairStoredAskMessage(message, previousUserMessage = null)'
);
assertNotIncludes(
  'Ask EMY initial page',
  initialHtml,
  'function repairedStoredAskStoppedReply(message, previousUserMessage = null)'
);
assertNotIncludes(
  'Ask EMY initial page',
  initialHtml,
  'autoRecoveredCards: true'
);
assertNotIncludes(
  'Ask EMY initial page',
  initialHtml,
  'text: "...", pending: true'
);

console.log(JSON.stringify({
  ok: true,
  requestLifecycle: true,
}, null, 2));

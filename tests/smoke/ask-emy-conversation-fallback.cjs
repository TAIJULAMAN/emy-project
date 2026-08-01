'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function assertContains(label, text, marker) {
  if (!text.includes(marker)) {
    console.error(`${label}: missing ${marker}`);
    process.exit(1);
  }
}

function assertNotContains(label, text, marker) {
  if (text.includes(marker)) {
    console.error(`${label}: forbidden local/fake Ask EMY behaviour remains: ${marker}`);
    process.exit(1);
  }
}

const browserSources = [
  ['Ask EMY generator template', read('src/generator/sections/20-transform-react-page.cjs')],
  ['Ask EMY asset source', read('src/generator/asset-sources/ask-emy-results-page.js')],
  ['Generated Ask EMY runtime', read('linked-pages/restore-may20/assets/ask-emy-results-page.js')],
  ['Ask EMY home session helpers', read('src/generator/sections/05-ask-session.cjs')],
  ['Generated Ask EMY home', read('linked-pages/restore-may20/ask-emy.html')],
];

for (const [label, text] of browserSources) {
  assertNotContains(label, text, 'function localAskEmyReply');
  assertNotContains(label, text, 'localAskEmyReply(');
  assertNotContains(label, text, 'fetchAskEmyReplyOld');
  assertNotContains(label, text, 'That took too long, so I stopped it instead of keeping the chat frozen');
  assertNotContains(label, text, 'I stopped that stuck answer instead of leaving the chat loading');
  assertNotContains(label, text, 'Ask the next question now and I will answer fresh');
  assertNotContains(label, text, 'local-pending-repair');
  assertNotContains(label, text, 'local-recovery');
  assertNotContains(label, text, 'stale-pending-recovery');
  assertNotContains(label, text, 'stored-recovery');
  assertNotContains(label, text, 'repairedStoredAskProductCreationText');
  assertNotContains(label, text, 'repairedStoredAskBusinessSetupText');
  assertNotContains(label, text, 'repairedStoredAskVagueProductNeedText');
}

for (const [label, text] of browserSources.slice(0, 3)) {
  assertContains(label, text, 'throw new Error(lastError || "Ask EMY request timed out")');
  assertContains(label, text, 'askEmyAiUnavailableFrontendMessage("request timed out")');
  assertContains(label, text, 'aiFirstVersion: ASK_EMY_AI_FIRST_FRONTEND_VERSION');
  assertNotContains(label, text, 'messages: chat.messages.filter((message) => message.id !== pendingId)');
  assertContains(label, text, 'const ASK_EMY_PENDING_RECOVERY_MS = 60000;');
}

for (const [label, text] of browserSources.filter(([label]) => !label.includes('generator template'))) {
  assertContains(label, text, 'emyAskSavedChatsAiOnlyV1');
  assertContains(label, text, 'function repairStoredAskMessage(message, previousUserMessage = null)');
  assertContains(label, text, 'return message;');
}

const askResultsHtml = read('linked-pages/restore-may20/ask-emy-results.html');
assertContains('Ask EMY results cache buster', askResultsHtml, 'assets/ask-emy-results-page.js?v=');

console.log(JSON.stringify({
  ok: true,
  askEmyAiOnlyFrontend: true,
  localFakeAnswersRemoved: true,
  savedRepairMessagesDisabled: true,
}, null, 2));

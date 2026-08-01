'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const chatHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-chat.html');
const chatHtml = fs.readFileSync(chatHtmlPath, 'utf8');

const requiredMarkers = [
  '.page { min-height:100dvh; background:linear-gradient(180deg,#fffdf8,#fff8ef); padding-bottom:118px; }',
  '.chat-shell { width:min(100%,1220px); min-height:calc(100dvh - 188px); margin:0 auto 112px;',
  '.chat-shell { min-height:calc(100dvh - 166px); margin-bottom:104px;',
  '.chat-shell.has-open-thread .chat-detail-pane { display:grid; min-height:calc(100dvh - 166px); }',
];

const missing = requiredMarkers.filter((marker) => !chatHtml.includes(marker));
if (missing.length) {
  console.error('Customer chat page can let the message composer collide with the fixed bottom nav:', missing.join(', '));
  process.exit(1);
}

const forbiddenMarkers = [
  '.page { min-height:100dvh; background:linear-gradient(180deg,#fffdf8,#fff8ef); padding-bottom:92px; }',
  '.chat-shell { width:min(100%,1220px); min-height:calc(100dvh - 70px);',
  '.chat-shell.has-open-thread .chat-detail-pane { display:grid; min-height:100dvh; }',
  '.chat-shell.has-open-thread .chat-detail-pane { display:grid; min-height:calc(100dvh - 104px); }',
];

const foundForbidden = forbiddenMarkers.filter((marker) => chatHtml.includes(marker));
if (foundForbidden.length) {
  console.error('Customer chat page still has full-height rules that place the composer under the bottom nav:', foundForbidden.join(', '));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  chatShellStopsAboveBottomNav: true,
  composerReservedFromFixedNav: true,
}, null, 2));

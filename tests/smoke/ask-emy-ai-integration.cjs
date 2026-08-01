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
    console.error(`${label}: contains forbidden marker ${marker}`);
    process.exit(1);
  }
}

const functionsIndex = read('functions/index.js');
const localServer = read('serve-linked-pages.cjs');
const firebaseJson = read('firebase.json');
const askTransform = read('src/generator/sections/20-transform-react-page.cjs');
const askMini = read('src/generator/asset-sources/emy-ask-mini.js');
const askEnvExample = read('ask-emy.env.example');
const functionsEnvExample = read('functions/.env.example');

[
  'exports.askEmyHttp',
  'exports.askEmyStatus',
  'exports.askEmy =',
  'function askEmyLoadContextRecords()',
  'db.collection("businessProfiles")',
  'db.collectionGroup("items")',
  'OPENAI_API_KEY',
  'OPENROUTER_API_KEY',
  'DEEPSEEK_API_KEY',
  'ASK_EMY_PROVIDER',
  'https://api.openai.com/v1/responses',
  'https://openrouter.ai/api/v1/chat/completions',
  'https://api.deepseek.com/chat/completions',
].forEach((marker) => assertContains('Firebase functions Ask EMY backend', functionsIndex, marker));

[
  'function readAskEmySharedRecords()',
  'function askEmyContextRecords(payload = {})',
  'businessDataAvailable: directAnswerOnly ? [] : ownedContextRecords.slice(0, 60)',
  'ask-emy.env"), { override: true }',
  '`ASK_EMY_PROVIDER=${selectedProvider}`',
  'OPENAI_API_KEY',
  'gpt-5.4',
  'OPENROUTER_API_KEY',
  'DEEPSEEK_API_KEY',
  'function askEmyPageContext(payload = {})',
  'context.source is mini-chat',
].forEach((marker) => assertContains('local Ask EMY backend', localServer, marker));

assertContains('Firebase functions Ask EMY OpenAI default model', functionsIndex, 'gpt-5.4');

[
  '"source": "/api/ask-emy"',
  '"functionId": "askEmyHttp"',
  '"source": "/api/ask-emy/status"',
  '"functionId": "askEmyStatus"',
].forEach((marker) => assertContains('Firebase hosting Ask EMY rewrites', firebaseJson, marker));

[
  'window.EMY_ASK_EMY_API_URL',
  'localStorage.getItem("emyAskEmyApiUrl")',
  'https://europe-west2-my-emy-db032.cloudfunctions.net/askEmyHttp',
].forEach((marker) => {
  assertContains('Ask EMY results endpoint candidates', askTransform, marker);
  assertContains('Ask EMY mini endpoint candidates', askMini, marker);
});

[
  'function currentPageContext()',
  'source: "mini-chat"',
  'pageContext,',
  'quickInfo: pageContext.quickInfo',
].forEach((marker) => assertContains('Ask EMY mini page context', askMini, marker));

[
  'OPENAI_API_KEY=your_openai_key_here',
  'OPENAI_MODEL=gpt-5.4',
  'OPENROUTER_API_KEY=your_openrouter_key_here',
  'DEEPSEEK_API_KEY=your_deepseek_key_here',
].forEach((marker) => {
  assertContains('Ask EMY local env example', askEnvExample, marker);
  assertContains('Ask EMY functions env example', functionsEnvExample, marker);
});

assertNotContains('Ask EMY local env example old OpenAI default', askEnvExample, 'OPENAI_MODEL=gpt-4.1-mini');
assertNotContains('Ask EMY functions env example old OpenAI default', functionsEnvExample, 'OPENAI_MODEL=gpt-4.1-mini');

const generatedAskResultsPath = path.join(root, 'linked-pages', 'restore-may20', 'ask-emy-results.html');
if (fs.existsSync(generatedAskResultsPath)) {
  const generatedAskResults = fs.readFileSync(generatedAskResultsPath, 'utf8');
  assertNotContains('generated Ask EMY results page', generatedAskResults, 'OPENAI_API_KEY');
  assertNotContains('generated Ask EMY results page', generatedAskResults, 'OPENROUTER_API_KEY');
  assertNotContains('generated Ask EMY results page', generatedAskResults, 'DEEPSEEK_API_KEY');
  assertNotContains('generated Ask EMY results page', generatedAskResults, 'your_openai_key_here');
  assertNotContains('generated Ask EMY results page', generatedAskResults, 'your_openrouter_key_here');
  assertNotContains('generated Ask EMY results page', generatedAskResults, 'your_deepseek_key_here');
}

console.log(JSON.stringify({
  ok: true,
  askEmyAiIntegration: true,
  serverSideKeysOnly: true,
  firebaseRewriteConnected: true,
}, null, 2));

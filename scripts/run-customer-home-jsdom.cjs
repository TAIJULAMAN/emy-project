'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM } = require('jsdom');

const homePath = path.join(__dirname, '..', 'linked-pages/restore-may20/emy-customer-home.html');
const html = fs.readFileSync(homePath, 'utf8');
const dom = new JSDOM(html, {
  url: 'http://127.0.0.1:8767/restore-may20/emy-customer-home.html?devAccess=1',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
});
const { window } = dom;
const errors = [];
window.addEventListener('error', (event) => {
  errors.push(String(event.message || event.error));
});

const script = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)][1][1];

try {
  window.eval(script);
} catch (error) {
  errors.push(String(error.message));
}

console.log(JSON.stringify({
  errors,
  emyRenderAnnexedFeeds: typeof window.emyRenderAnnexedFeeds,
  emySetupBusinessDeck: typeof window.emySetupBusinessDeck,
  currentView: window.document.body.dataset.currentView,
  navActive: window.document.querySelector('[data-nav="nearby"]')?.classList.contains('is-active'),
}, null, 2));

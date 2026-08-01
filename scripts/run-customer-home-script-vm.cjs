'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const homePath = path.join(__dirname, '..', 'linked-pages/restore-may20/emy-customer-home.html');
const html = fs.readFileSync(homePath, 'utf8');
const mainScript = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)][1][1];

function makeElement(tag = 'div') {
  const el = {
    tagName: String(tag || 'div').toUpperCase(),
    className: '',
    id: '',
    hidden: false,
    textContent: '',
    innerHTML: '',
    style: {},
    dataset: {},
    attributes: {},
    children: [],
    parentNode: null,
    classList: {
      add(...names) { names.forEach((n) => { if (!el.className.split(/\s+/).includes(n)) el.className += (el.className ? ' ' : '') + n; }); },
      remove(...names) { el.className = el.className.split(/\s+/).filter((c) => !names.includes(c)).join(' '); },
      toggle(name, force) {
        const has = el.className.split(/\s+/).includes(name);
        const next = typeof force === 'boolean' ? force : !has;
        if (next) el.classList.add(name); else el.classList.remove(name);
        return next;
      },
      contains(name) { return el.className.split(/\s+/).includes(name); },
    },
    setAttribute(name, value) { el.attributes[name] = String(value); if (name.startsWith('data-')) el.dataset[name.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = String(value); },
    getAttribute(name) { return el.attributes[name] ?? null; },
    removeAttribute(name) { delete el.attributes[name]; },
    appendChild(child) { child.parentNode = el; el.children.push(child); return child; },
    insertAdjacentElement() {},
    addEventListener() {},
    removeEventListener() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    matches() { return false; },
    closest() { return null; },
    contains() { return false; },
    focus() {},
    click() {},
    getBoundingClientRect() { return { top: 0, left: 0, width: 100, height: 100, right: 100, bottom: 100 }; },
  };
  return el;
}

function buildDocument() {
  const body = makeElement('body');
  body.dataset.currentView = 'home';
  const head = makeElement('head');
  const root = makeElement('html');
  const selectors = new Map();

  function register(selector, el) {
    if (!selectors.has(selector)) selectors.set(selector, []);
    selectors.get(selector).push(el);
  }

  const common = [
    ['[data-first-name]', makeElement('span')],
    ['[data-avatar]', makeElement('div')],
    ['[data-home-owned-avatar]', makeElement('div')],
    ['[data-notification-panel]', makeElement('section')],
    ['[data-notification-list]', makeElement('div')],
    ['[data-notification-count]', makeElement('span')],
    ['[data-notifications]', makeElement('button')],
    ['[data-nav]', makeElement('button')],
    ['[data-view-block]', makeElement('section')],
    ['[data-search-input]', makeElement('input')],
    ['[data-empty-state]', makeElement('div')],
    ['.nearby-map-section', makeElement('section')],
    ['.annexed-feed-middle', makeElement('section')],
    ['.home-flow-list', makeElement('div')],
    ['.bottom-nav', makeElement('nav')],
  ];
  common.forEach(([sel, el]) => {
    if (sel === '[data-nav]') {
      ['home', 'nearby', 'feeds', 'reels', 'profile', 'chat', 'ask'].forEach((nav) => {
        const btn = makeElement('button');
        btn.dataset.nav = nav;
        register('[data-nav]', btn);
        body.children.push(btn);
      });
      return;
    }
    register(sel, el);
    body.children.push(el);
  });

  const document = {
    body,
    head,
    documentElement: root,
    createElement(tag) { return makeElement(tag); },
    addEventListener() {},
    getElementById() { return null; },
    querySelector(sel) {
      const list = selectors.get(sel) || [];
      return list[0] || null;
    },
    querySelectorAll(sel) {
      if (sel === '[data-nav]') return selectors.get('[data-nav]') || [];
      if (sel === '[data-view-block]') return selectors.get('[data-view-block]') || [];
      const one = document.querySelector(sel);
      return one ? [one] : [];
    },
  };
  return document;
}

const document = buildDocument();
const context = {
  window: {},
  document,
  location: {
    pathname: '/restore-may20/emy-customer-home.html',
    search: '?devAccess=1',
    hash: '',
    hostname: '127.0.0.1',
    port: '8767',
    href: 'http://127.0.0.1:8767/restore-may20/emy-customer-home.html?devAccess=1',
  },
  localStorage: {
    _data: {
      emyLocalDevAccess: '1',
      emyTestModeEnabled: 'true',
      emyMainSignedInRole: 'customer',
      emyMainSignedInEmail: 'test.customer@emy.local',
      emyCustomerEmail: 'test.customer@emy.local',
      emyCustomerDisplayName: 'EMY Test Customer',
    },
    getItem(key) { return this._data[key] ?? null; },
    setItem(key, value) { this._data[key] = String(value); },
    removeItem(key) { delete this._data[key]; },
  },
  sessionStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
  history: { replaceState() {} },
  setTimeout(fn) { try { if (typeof fn === 'function') fn(); } catch (error) { throw error; } return 0; },
  clearTimeout() {},
  setInterval() { return 0; },
  clearInterval() {},
  requestAnimationFrame(fn) { if (typeof fn === 'function') fn(0); return 0; },
  cancelAnimationFrame() {},
  console,
  navigator: { userAgent: 'test' },
  Math, Date, JSON, Array, Object, String, Number, Boolean, RegExp, Error, Map, Set, WeakMap, WeakSet, Promise, Symbol,
  parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent, encodeURI, decodeURI, Intl, URL, URLSearchParams,
  structuredClone(value) { return JSON.parse(JSON.stringify(value)); },
  MutationObserver: class { observe() {} disconnect() {} },
  IntersectionObserver: class { observe() {} disconnect() {} },
  ResizeObserver: class { observe() {} disconnect() {} },
  CustomEvent: class { constructor(type, detail) { this.type = type; this.detail = detail; } },
  Event: class { constructor(type) { this.type = type; } },
  HTMLElement: class {}, Element: class {}, Node: class {}, DocumentFragment: class {}, Image: class {}, FileReader: class { readAsDataURL() {} },
  FormData: class {}, Blob: class {}, File: class {}, DataTransfer: class {}, Audio: class {}, MediaRecorder: class {},
  indexedDB: {}, caches: { open: async () => ({ match: async () => null, put: async () => {} }) }, fetch: async () => ({ ok: false }),
  alert() {}, confirm() { return true; }, prompt() { return ''; }, open() { return null; }, scrollTo() {},
  getComputedStyle() { return { display: 'block', visibility: 'visible' }; },
  matchMedia() { return { matches: false, addEventListener() {} }; },
  addEventListener() {},
};

context.window = context;
Object.assign(context.window, context);

try {
  vm.runInNewContext(mainScript, context, { timeout: 30000 });
  console.log('VM run: OK');
  console.log('emyRenderAnnexedFeeds:', typeof context.window.emyRenderAnnexedFeeds);
  console.log('emySetupBusinessDeck:', typeof context.window.emySetupBusinessDeck);
  console.log('currentView:', context.document.body.dataset.currentView);
} catch (error) {
  console.log('VM run: FAIL', error.message);
  if (error.stack) console.log(error.stack.split('\n').slice(0, 10).join('\n'));
  process.exit(1);
}

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'asset-sources', 'emy-central-storage.js');
const source = fs.readFileSync(sourcePath, 'utf8');

function makeLocalStorage(seed) {
  const store = new Map(Object.entries(seed || {}).map(([key, value]) => [key, String(value)]));
  return {
    get length() {
      return store.size;
    },
    key(index) {
      return Array.from(store.keys())[index] || null;
    },
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
  };
}

async function main() {
  const existingPosts = [
    { id: 'post-a', text: 'already local', createdAt: '2026-06-20T10:00:00.000Z' },
    { id: 'post-b', text: 'also local', createdAt: '2026-06-21T10:00:00.000Z' },
  ];
  const remotePosts = [
    { id: 'post-c', text: 'late server row', createdAt: '2026-06-22T10:00:00.000Z' },
  ];
  const localStorage = makeLocalStorage({
    emyFeedCreatedPosts: JSON.stringify(existingPosts),
  });
  const window = {
    location: { hostname: '127.0.0.1' },
    addEventListener() {},
    dispatchEvent() {},
    setTimeout() { return 0; },
    clearTimeout() {},
  };
  const context = {
    window,
    document: {
      readyState: 'complete',
      hidden: false,
      addEventListener() {},
    },
    localStorage,
    fetch: async () => ({
      ok: true,
      json: async () => ({
        data: {
          emyFeedCreatedPosts: remotePosts,
        },
      }),
    }),
    CustomEvent: function CustomEvent(type, init) {
      return { type, detail: init && init.detail };
    },
    Date,
    JSON,
    Map,
    Set,
    Array,
    Object,
    String,
    Number,
    RegExp,
    Math,
    encodeURIComponent,
  };
  window.localStorage = localStorage;
  vm.createContext(context);
  vm.runInContext(source, context, { filename: sourcePath });

  if (!window.emyCentralStorage || typeof window.emyCentralStorage.pull !== 'function') {
    throw new Error('Central storage API was not installed.');
  }

  await window.emyCentralStorage.pull(['emyFeedCreatedPosts'], { silent: true });
  const merged = JSON.parse(localStorage.getItem('emyFeedCreatedPosts') || '[]');
  const ids = merged.map((row) => row && row.id).sort();
  const expected = ['post-a', 'post-b', 'post-c'];
  if (JSON.stringify(ids) !== JSON.stringify(expected)) {
    throw new Error(`Passive pull should merge posts instead of replacing them. Saw ${JSON.stringify(ids)}.`);
  }

  console.log(JSON.stringify({
    ok: true,
    passivePullMergedRows: ids.length,
    ids,
  }, null, 2));
}

main().catch((error) => {
  console.error(error && error.stack || error);
  process.exit(1);
});

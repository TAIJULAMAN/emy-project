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

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

function functionBody(source, name) {
  const marker = `function ${name}`;
  const start = source.indexOf(marker);
  assert(start >= 0, `missing function ${name}`);
  const open = source.indexOf('{', start);
  assert(open >= 0, `missing body for function ${name}`);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    const char = source[index];
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  console.error(`could not find end of function ${name}`);
  process.exit(1);
}

const local = read('serve-linked-pages.cjs');
const functions = read('functions/index.js');

assertContains('local server detects content records', local, 'function askEmyRecordHasContentSignals(key, value = {})');
assertContains('Firebase detects content records', functions, 'function askEmyRecordHasContentSignals(value = {}, fallback = "")');
assertContains('local server only promotes real business profiles', local, 'function askEmyRecordLooksLikeBusinessProfile(key, value = {})');
assertContains('Firebase only promotes real business profiles', functions, 'function askEmyRecordLooksLikeBusinessProfile(value = {}, fallback = "")');
assertContains('local server gates visible business records', local, 'function askEmyVisibleRecordMatchesType(record, type)');
assertContains('Firebase gates visible business records', functions, 'function askEmyVisibleRecordMatchesType(record, type)');
assertContains('local server drops unknown records', local, 'if (!type) return null;');
assertContains('Firebase drops unknown records', functions, 'if (!type) return null;');

const localType = functionBody(local, 'askEmyRecordTypeFor');
const functionsType = functionBody(functions, 'askEmyRecordTypeFrom');

assertContains('local server checks business profile before business type', localType, 'askEmyRecordLooksLikeBusinessProfile(key, value)');
assertContains('Firebase checks business profile before business type', functionsType, 'askEmyRecordLooksLikeBusinessProfile(value, fallback)');
assertContains('local server has safe empty fallback', localType, 'return "";');
assertContains('Firebase has safe empty fallback', functionsType, 'return "";');
assertContains('local visible gate rejects content-looking business records', local, 'askEmyRecordHasContentSignals(key, record)');
assertContains('Firebase visible gate rejects content-looking business records', functions, 'askEmyRecordHasContentSignals(record, key)');

assert(
  !/return\s+["']business["'];\s*}\s*$/.test(localType),
  'local server still defaults unknown records to business'
);
assert(
  !/return\s+["']business["'];\s*}\s*$/.test(functionsType),
  'Firebase still defaults unknown records to business'
);

console.log('Ask EMY business search guard checks passed.');

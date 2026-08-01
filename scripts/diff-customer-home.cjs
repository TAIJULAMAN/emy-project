'use strict';

const fs = require('fs');
const path = require('path');

const baselinePath = path.join(__dirname, '../work/customer-home-parity-baseline.html');
const currentPath = path.join(__dirname, '../linked-pages/restore-may20/emy-customer-home.html');

let a = fs.readFileSync(baselinePath, 'utf8');
let b = fs.readFileSync(currentPath, 'utf8');
if (a === b) {
  console.log(JSON.stringify({ identical: true, bytes: Buffer.byteLength(a) }, null, 2));
  process.exit(0);
}

let start = 0;
const minLen = Math.min(a.length, b.length);
while (start < minLen && a[start] === b[start]) start += 1;
let endA = a.length;
let endB = b.length;
while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
  endA -= 1;
  endB -= 1;
}

console.log(JSON.stringify({
  identical: false,
  baselineBytes: Buffer.byteLength(a),
  currentBytes: Buffer.byteLength(b),
  delta: Buffer.byteLength(b) - Buffer.byteLength(a),
  firstDiffAt: start,
  baselineSnippet: a.slice(start, start + 240),
  currentSnippet: b.slice(start, start + 240),
}, null, 2));

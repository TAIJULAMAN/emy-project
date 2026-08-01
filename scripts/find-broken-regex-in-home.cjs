'use strict';

const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, '..', 'linked-pages/restore-may20/emy-customer-home.html');
const html = fs.readFileSync(homePath, 'utf8');
const script = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)][1][1];

const lines = script.split('\n');
const suspects = [];

for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i];
  if (!/(RegExp|\/.*\/[gimsuy]*)/.test(line)) continue;
  if (!/\\/.test(line)) continue;
  if (/replace\(|split\(|String\.raw|\\\\n|\\\\t|\\\\"/.test(line)) continue;
  const trimmed = line.trim();
  if (!trimmed.includes('/')) continue;
  try {
    // eslint-disable-next-line no-new-func
    new Function(trimmed);
  } catch (error) {
    suspects.push({ line: i + 1, text: trimmed.slice(0, 140), error: error.message });
  }
}

console.log(JSON.stringify({ suspects: suspects.slice(0, 30), total: suspects.length }, null, 2));

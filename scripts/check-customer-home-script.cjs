'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const homePath = path.join(__dirname, '../linked-pages/restore-may20/emy-customer-home.html');
const html = fs.readFileSync(homePath, 'utf8');
const inlineScripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);

console.log(JSON.stringify({ inlineScriptCount: inlineScripts.length, sizes: inlineScripts.map((s) => s.length) }, null, 2));

inlineScripts.forEach((source, index) => {
  try {
    new vm.Script(source, { filename: `customer-home-inline-${index + 1}.js` });
    console.log(`script ${index + 1}: OK`);
  } catch (error) {
    console.error(`script ${index + 1}: FAIL`, error.message);
    if (error.stack) {
      const line = Number((error.stack.match(/customer-home-inline-\d+\.js:(\d+)/) || [])[1]);
      if (line) {
        const lines = source.split(/\n/);
        console.error(lines.slice(Math.max(0, line - 4), line + 2).join('\n'));
      }
    }
    process.exitCode = 1;
  }
});

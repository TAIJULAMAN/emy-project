'use strict';

const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, '..', 'src/generator/sections');
const files = fs.readdirSync(sectionsDir).filter((name) => name.endsWith('.cjs'));
const hits = [];

for (const file of files) {
  const source = fs.readFileSync(path.join(sectionsDir, file), 'utf8');
  const blocks = [...source.matchAll(/String\.raw`([\s\S]*?)`/g)];
  blocks.forEach((block, blockIndex) => {
    block[1].split('\n').forEach((line, lineIndex) => {
      if (!/(^|[^\\])\\\/\//.test(line)) return;
      if (!/(\/[^/]*\\\/\/|RegExp\([^)]*\\\/\/)/.test(line)) return;
      hits.push({
        file,
        blockIndex,
        line: lineIndex + 1,
        text: line.trim().slice(0, 140),
      });
    });
  });
}

console.log(JSON.stringify({ hits, total: hits.length }, null, 2));

'use strict';

const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, '../src/generator/sections');

function splitPageTemplate(sourceFile, options = {}) {
  const sourcePath = path.join(sectionsDir, sourceFile);
  const backupPath = sourcePath.replace('.cjs', '.cjs.bak');
  const lines = fs.readFileSync(sourcePath, 'utf8').split(/\r?\n/);

  const fnLine = lines.findIndex((line) => /^function emy\w+Template\(\)/.test(line));
  if (fnLine < 0) throw new Error(`Template function not found in ${sourceFile}`);

  const returnLine = lines.findIndex((line, idx) => idx > fnLine && (/return `/.test(line) || /const html = `/.test(line) || /= `\s*$/.test(line)));
  if (returnLine < 0) throw new Error(`Template return not found in ${sourceFile}`);

  let endLine = lines.length - 1;
  for (let i = lines.length - 1; i > returnLine; i -= 1) {
    if (/`;\s*$/.test(lines[i])) {
      endLine = i;
      break;
    }
  }

  function stripTemplateClose(line) {
    return String(line || '').replace(/`;\s*$/, '');
  }

  const returnMatch = lines[returnLine].match(/(?:return `|const html = `|= `)([\s\S]*)$/);
  const firstReturnChunk = returnMatch && returnMatch[1] ? [returnMatch[1]] : [];
  const templateLines = firstReturnChunk.concat(lines.slice(returnLine + 1, endLine));
  const interpolationRegex = /^\$\{([^}]+)\}$/;
  const parts = [];
  let buffer = [];

  function flushPart() {
    if (!buffer.length) return;
    const lastIndex = buffer.length - 1;
    buffer[lastIndex] = stripTemplateClose(buffer[lastIndex]);
    parts.push({ type: 'text', value: buffer.join('\n') });
    buffer = [];
  }

  for (const line of templateLines) {
    const match = line.match(interpolationRegex);
    if (match) {
      flushPart();
      parts.push({ type: 'inject', value: match[1].trim() });
    } else {
      buffer.push(line);
    }
  }
  flushPart();

  const partsBase = sourceFile.replace('.cjs', '').replace('-template-', '-');
  const partsFile = partsBase.replace(/^(\d+-)/, '$1') + '-template-parts.cjs';
  const prefix = partsBase.replace(/^\d+-/, '').replace(/-/g, '_');
  const wrapperFile = sourceFile;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(sourcePath, backupPath);
  }

  const partNames = [];
  const partDecls = [];
  let textIndex = 0;

  for (const part of parts) {
    if (part.type === 'text') {
      textIndex += 1;
      const name = `${prefix}_part_${textIndex}`;
      partNames.push({ kind: 'text', name });
      partDecls.push(`const ${name} = String.raw\`\n${part.value}\n\`;`);
    } else {
      partNames.push({ kind: 'inject', name: part.value });
    }
  }

  const assembly = partNames
    .map((entry) => (entry.kind === 'text' ? entry.name : entry.name))
    .join('\n    + ');

  const tailLine = String(lines[endLine + 1] || '');
  const tailMatch = tailLine.match(/return html(\.[^;]+);/);
  const tailSuffix = tailMatch ? tailMatch[1] : '';

  const partsContent = [
    `/* EMY template parts split from ${sourceFile} */`,
    ...partDecls,
    '',
  ].join('\n');

  const wrapperContent = [
    `/* EMY template wrapper for ${sourceFile} (parts in ${partsFile}) */`,
    `function ${lines[fnLine].match(/function (\w+)/)[1]}() {`,
    `  return (${assembly})${tailSuffix};`,
    '}',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(sectionsDir, partsFile), partsContent, 'utf8');
  fs.writeFileSync(sourcePath, wrapperContent, 'utf8');

  console.log(JSON.stringify({
    sourceFile,
    partsFile,
    textParts: textIndex,
    injections: partNames.filter((entry) => entry.kind === 'inject').length,
    backupPath,
  }, null, 2));
}

const target = process.argv[2];
if (!target) {
  console.error('Usage: node tools/split-page-template.cjs 27-template-customer-home.cjs');
  process.exit(1);
}

splitPageTemplate(target);

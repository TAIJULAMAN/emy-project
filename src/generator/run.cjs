'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const Module = require('module');

const sectionsDir = path.join(__dirname, 'sections');
const projectRoot = path.join(__dirname, '..', '..');

function loadSectionFiles() {
  return fs.readdirSync(sectionsDir)
    .filter((name) => name.endsWith('.cjs'))
    .sort();
}

function buildCombinedSource(sectionFiles) {
  return sectionFiles
    .map((name) => fs.readFileSync(path.join(sectionsDir, name), 'utf8'))
    .join('\n');
}

function runGenerator() {
  const sectionFiles = loadSectionFiles();
  if (!sectionFiles.length) {
    throw new Error(`No generator sections found in ${sectionsDir}. Run: node tools/split-generator.cjs`);
  }

  const source = buildCombinedSource(sectionFiles);
  const filename = path.join(__dirname, 'combined.cjs');

  try {
    new vm.Script(source, { filename });
  } catch (error) {
    console.error('Generator syntax check failed.');
    throw error;
  }

  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(projectRoot);
  mod._compile(source, filename);
}

module.exports = { runGenerator, loadSectionFiles, buildCombinedSource, sectionsDir };

if (require.main === module) {
  runGenerator();
}

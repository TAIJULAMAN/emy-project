'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectRoot = path.join(__dirname, '..');
const { buildCombinedSource, loadSectionFiles, sectionsDir } = require(path.join(projectRoot, 'src', 'generator', 'run.cjs'));

function main() {
  const sectionFiles = loadSectionFiles();
  const source = buildCombinedSource(sectionFiles);
  const filename = path.join(projectRoot, 'src', 'generator', 'combined.cjs');

  try {
    new vm.Script(source, { filename });
    console.log(JSON.stringify({
      ok: true,
      sections: sectionFiles.length,
      bytes: Buffer.byteLength(source),
      sectionsDir,
    }, null, 2));
  } catch (error) {
    console.error('Generator syntax check failed:', error.message);
    process.exit(1);
  }
}

main();

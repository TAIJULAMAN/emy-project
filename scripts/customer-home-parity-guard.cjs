'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const homePath = path.join(root, 'linked-pages/restore-may20/emy-customer-home.html');
const stampPath = path.join(root, 'work/customer-home-parity.sha256');

function hashFile(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function saveBaseline() {
  if (!fs.existsSync(homePath)) {
    console.error('Missing emy-customer-home.html. Run npm run generate first.');
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(stampPath), { recursive: true });
  const hash = hashFile(homePath);
  fs.writeFileSync(stampPath, hash, 'utf8');
  console.log(JSON.stringify({ action: 'saved-baseline', sha256: hash, bytes: fs.statSync(homePath).size }, null, 2));
}

function compareToBaseline() {
  if (!fs.existsSync(stampPath)) {
    console.error('Missing baseline. Run: node scripts/customer-home-parity-guard.cjs --save');
    process.exit(1);
  }
  if (!fs.existsSync(homePath)) {
    console.error('Missing emy-customer-home.html. Run npm run generate first.');
    process.exit(1);
  }
  const baseline = fs.readFileSync(stampPath, 'utf8').trim();
  const current = hashFile(homePath);
  const identical = baseline === current;
  console.log(JSON.stringify({
    action: 'compare',
    identical,
    baselineSha256: baseline,
    currentSha256: current,
    bytes: fs.statSync(homePath).size,
  }, null, 2));
  if (!identical) process.exit(1);
}

if (process.argv.includes('--save')) saveBaseline();
else compareToBaseline();

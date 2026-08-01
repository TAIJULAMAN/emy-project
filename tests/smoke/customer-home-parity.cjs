'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const projectRoot = path.join(__dirname, '..', '..');
const homePath = path.join(projectRoot, 'linked-pages/restore-may20/emy-customer-home.html');
const stampPath = path.join(projectRoot, 'work/customer-home-parity.sha256');

function hashFile(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

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

if (baseline !== current) {
  console.error('Customer home parity check failed.');
  console.error(JSON.stringify({
    action: 'compare',
    identical: false,
    baselineSha256: baseline,
    currentSha256: current,
    bytes: fs.statSync(homePath).size,
  }, null, 2));
  process.exit(1);
}

console.log('PASS customer-home-parity (byte-identical to saved baseline)');

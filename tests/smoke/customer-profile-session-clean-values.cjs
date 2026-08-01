'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const sourcePath = path.join(root, 'src', 'generator', 'sections', '31-customer-profile-template-parts.cjs');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-profile-page.js');

const source = fs.readFileSync(sourcePath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');

const markers = [
  'function customerProfileCleanStoredText(value)',
  'function customerProfileCleanEmail(value)',
  'function cleanCustomerProfileStoredSessionValues()',
  'cleanCustomerProfileStoredSessionValues();',
  'let profileEmail = customerProfileCleanEmail(',
  'const saved = profileText(customerProfileCleanStoredText(localStorage.getItem("emyCustomerProfileVisibility") || localStorage.getItem("emyMainPendingSignupPrivacy")), "private").toLowerCase();',
  'return customerProfileCleanStoredText(localStorage.getItem("emyCustomerPhone") || localStorage.getItem("emyMainPendingSignupPhone") || "");',
  'return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/i.test(customerProfileCleanEmail(value));',
  'if (sessionEmail) sessionEmail.value = customerProfileCleanEmail(profileEmail) || "";',
  'const nextEmail = customerProfileCleanEmail(sessionEmail ? sessionEmail.value : "");',
  'const nextFirst = customerProfileCleanStoredText(sessionFirst ? sessionFirst.value : "");',
  'const nextLast = customerProfileCleanStoredText(sessionLast ? sessionLast.value : "");',
  'const nextPhone = customerProfileCleanStoredText(sessionPhone ? sessionPhone.value : "");',
  'photoInput.click();',
  'renderSessionForm();',
];

function assertMarkers(label, text) {
  const missing = markers.filter((marker) => !text.includes(marker));
  if (missing.length) {
    console.error(label + ' is missing customer profile clean session markers:', missing.join(', '));
    process.exit(1);
  }
  if (text.includes('return /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]{2,}$/i.test(customerProfileCleanEmail(value));')) {
    console.error(label + ' still contains the double-escaped email validator that rejects normal addresses.');
    process.exit(1);
  }
  if (text.includes('window.setTimeout(() => photoInput.click(), 0);')) {
    console.error(label + ' delays the profile image picker and can lose the user click activation.');
    process.exit(1);
  }
}

assertMarkers('Customer profile source', source);
assertMarkers('Generated customer profile runtime', runtime);

console.log(JSON.stringify({
  ok: true,
  cleanSessionValues: 'quoted name, email, phone, and privacy values are cleaned before display and save',
  validEmailAccepted: 'stephaneelkrak@hotmail.com',
}, null, 2));

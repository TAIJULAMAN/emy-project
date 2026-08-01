'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-page.js');
const realGuardPath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-real-data-guard.js');
const runtime = fs.readFileSync(runtimePath, 'utf8');
const realGuard = fs.readFileSync(realGuardPath, 'utf8');

if (!runtime.includes('function nearbyBusinessLocationLooksUnset')) {
  console.error('Customer home nearby map is missing the location placeholder guard.');
  process.exit(1);
}

if (!runtime.includes('function nearbyBusinessHasUsableLocation')) {
  console.error('Customer home nearby map is missing the usable-location gate.');
  process.exit(1);
}

if (!runtime.includes('current location|use current location|near me|location not set')) {
  console.error('Customer home nearby map does not reject Current location / Location not set placeholders.');
  process.exit(1);
}

if (!runtime.includes('location: nearbyBusinessAddressValue(profile.address, profile.location, profile.businessAddress, profile.businessLocation')) {
  console.error('Customer home current business profile can still use placeholder location labels as addresses.');
  process.exit(1);
}

if (!runtime.includes('const location = nearbyBusinessAddressValue(row.location, row.address, row.postcode);')) {
  console.error('Customer home nearby business locations still use raw placeholder address fields.');
  process.exit(1);
}

if (!runtime.includes('}).filter((business) => nearbyBusinessHasUsableLocation(business));')) {
  console.error('Customer home nearby business locations do not drop businesses without a usable location.');
  process.exit(1);
}

if (!runtime.includes('if (!nearbyBusinessHasUsableLocation(business)) return false;')) {
  console.error('Customer home nearby radius/followed filter can still show no-location saved businesses.');
  process.exit(1);
}

if (!runtime.includes('function homeCustomerBusinessRecordHasUsableLocation')) {
  console.error('Customer home saved-business keys can still bypass the usable-location check.');
  process.exit(1);
}

if (runtime.includes('if (!homeCustomerBusinessRecordHasUsableLocation(item, storageKey)) return;')) {
  console.error('Customer home stored customer-business records still drop followed businesses without an address.');
  process.exit(1);
}

if (!runtime.includes('if (annexedFeedItemFollowed(item)) return true;')) {
  console.error('Customer home live feed does not allow followed business content before the nearby location gate.');
  process.exit(1);
}

if (!runtime.includes('function annexedFeedItemHasUsableBusinessLocation')) {
  console.error('Customer home live feed can still render business items without usable location proof.');
  process.exit(1);
}

if (!runtime.includes('if (businessOwned && !annexedFeedItemHasUsableBusinessLocation(item)) return false;')) {
  console.error('Customer home live feed no longer blocks unknown business content without usable location proof.');
  process.exit(1);
}

if (!realGuard.includes('function realCustomerBusinessRecordHasUsableLocation')) {
  console.error('Customer home real-data rail is missing the saved-business usable-location resolver.');
  process.exit(1);
}

if (!realGuard.includes('businesses = realCustomerBusinesses().slice(0, 20);')) {
  console.error('Customer home fast rail hydration can still flash stale saved businesses before final hydration.');
  process.exit(1);
}

if (realGuard.includes('return rows.filter((item) => item.isCustomer && realBusinessHasUsableLocation(item));')) {
  console.error('Customer home real-data rail still drops followed businesses without an address.');
  process.exit(1);
}

if (!realGuard.includes('if (realFeedRowIsFollowedBusiness(row)) return true;')) {
  console.error('Customer home real-data feed does not allow followed business content before the nearby location gate.');
  process.exit(1);
}

if (!realGuard.includes('if (!realFeedRowHasUsableBusinessLocation(row)) return false;')) {
  console.error('Customer home real-data feed no longer blocks unknown business content without usable location proof.');
  process.exit(1);
}

if (runtime.includes('Location not set') || runtime.includes('Add address')) {
  console.error('Customer home nearby runtime can still render Location not set / Add address placeholder rows.');
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  page: 'emy-customer-home.html',
  runtime: path.relative(root, runtimePath),
  realGuard: path.relative(root, realGuardPath),
  rejectsLocationPlaceholders: true,
  dropsNoLocationBusinesses: true,
  keepsFollowedBusinessesWithoutAddress: true,
}, null, 2));

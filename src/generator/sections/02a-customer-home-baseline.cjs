/* EMY customer home section: 02a-customer-home-baseline.cjs (lines 2-31) */
const sourceDir = 'C:/Users/steph/OneDrive - EMY/Desktop/Code Page EMY';
const outDir = path.join(process.cwd(), 'linked-pages', 'restore-may20');
fs.mkdirSync(outDir, { recursive: true });
// Persistence rule: current generated pages are the freshest baseline. Backups are fallback snapshots only.
const lockedCustomerHomeCandidates = [
  path.join(outDir, 'emy-customer-home.html'),
  path.join(process.cwd(), 'backups', 'official-restore-may20', 'emy-customer-home.html')
];
function readLockedCustomerHomeHtml() {
  for (const candidate of lockedCustomerHomeCandidates) {
    if (fs.existsSync(candidate)) return fs.readFileSync(candidate, 'utf8');
  }
  return '';
}
function normaliseLockedCustomerHomeHtml(html) {
  return removeLegacyEngagementToolbarFeatureHtml(String(html || '')
    .replace(/\u00c2\u00a3/g, '\u00a3')
    .replace(/\u00c2\u00b7/g, '\u00b7')
    .replace(/\u00c2/g, ''));
}
function removeLockedCustomerHomePostCircles(html) {
  return String(html || '')
    .replace(/\n?\s*<script data-emy-post-profile-circle-removal>[\s\S]*?<\/script>/g, (match) => {
      return /"\.social-feed-head > "|"\.feed-card-head "|"\.post-head > "|"\.reel-top > "|"\.my-business-update > "|"\.rail-pulse-item > "/.test(match) ? '' : match;
    })
    .replace(/\n?\s*<style data-emy-post-profile-circle-removal-style>[\s\S]*?<\/style>/g, '')
    .replace(/^\s*[^{}\n]*(?:feed-card\.is-clip|feed-product-clip-card|feed-clip-card|feed-post-card|social-feed-card\.is-text-only|social-feed-card\.is-clip)[^{}\n]*\s{2,}\{\s*width:\s*(?:30|32|34|38|40|46)px;\s*height:\s*(?:30|32|34|38|40|46)px;[^{}]*\}\s*$/gm, '')
    .replace(/^\s*\{\s*width:\s*(?:30|32|34|38|40|42|46)px;\s*height:\s*(?:30|32|34|38|40|42|46)px;[^{}]*\}\s*$/gm, '')
    .replace(/^\s*\.annexed-feed-middle\s{2,}\{\s*width:\s*42px;\s*height:\s*42px;[^{}]*\}\s*$/gm, '');
}

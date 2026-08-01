/* EMY generator section: 42-post-process-utils.cjs (source lines 108400-108433) */
function cleanBrokenEventSystemLeak(html) {
  return String(html || '').replace(/<\/script>"\);\s*}\s*function miniSheetFromNode[\s\S]*?(?=\s*<script data-emy-event-(?:cover-enhancer|system)>)/g, '</script>\n');
}

function removeDisabledLegacyFallbackScripts(html) {
  return String(html || '')
    .replace(/\n?\s*<!-- disabled legacy fallback removed from runtime: <script data-emy-real-(?:rail-hydrator|home-activation)>[\s\S]*?<\/script> -->/g, '')
    .replace(/\n?\s*<script data-emy-real-(?:rail-hydrator|home-activation)>[\s\S]*?<\/script>/g, '');
}

function rewriteCustomerFeedsLinks(html) {
  return String(html || '')
    .replace(/\bemy-customer-feeds\.html(?:#[A-Za-z0-9_-]+)?/g, 'emy-customer-home.html?tab=feeds#feeds')
    .replace(/\bemy-customer-home\.html#feeds\b/g, 'emy-customer-home.html?tab=feeds#feeds')
    .replace(/\bemy-customer-home\.html#nearby\b/g, 'emy-customer-home.html?tab=nearby#nearby')
    .replace(/\bemy-customer-home\.html#reels\b/g, 'emy-customer-home.html?tab=reels#reels');
}

function customerFeedsRedirectHtml() {
  const target = 'emy-customer-home.html?tab=feeds#feeds';
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <title>Opening Feeds</title>
    <script>
      try { window.location.replace("${target}"); }
      catch (error) { window.location.href = "${target}"; }
    </script>
  </head>
  <body>
    <p>Opening Feeds...</p>
    <p><a href="${target}">Open Feeds</a></p>
  </body>
</html>`;
}

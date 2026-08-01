/* EMY generator section: 48-performance-output-guard.cjs
   Fails generation if page-runtime extraction regresses. */

const emyPerformanceGuardInlineLimit = Number(process.env.EMY_MAX_INLINE_SCRIPT_BYTES || 64 * 1024);
const emyPerformanceGuardPageBudgets = Object.freeze({
  'emy-business-profile.html': 950 * 1024,
  'emy-customer-home.html': 1250 * 1024,
  'emy-customer-search.html': 700 * 1024,
  'emy-customer-profile.html': 700 * 1024,
  'emy-customer-chat.html': 450 * 1024,
  'ask-emy-results.html': 360 * 1024,
});

function emyPerformanceGuardBytes(value) {
  return Buffer.byteLength(String(value || ''), 'utf8');
}

function emyPerformanceGuardLineForOffset(text, offset) {
  return String(text || '').slice(0, offset).split(/\r?\n/).length;
}

function emyPerformanceGuardLargeInlineScripts(html) {
  const largeScripts = [];
  const re = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    const bytes = emyPerformanceGuardBytes(match[2]);
    if (bytes <= emyPerformanceGuardInlineLimit) continue;
    largeScripts.push({
      line: emyPerformanceGuardLineForOffset(html, match.index),
      bytes,
      attrs: String(match[1] || '').trim().slice(0, 120),
    });
  }
  return largeScripts;
}

function emyPerformanceGuardRuntimeAsset(pageName, html) {
  const expectedAsset = pageName.replace(/\.html$/i, '-page.js');
  const runtimeTag = String(html || '').match(/<script\b(?=[^>]*\bdata-emy-page-runtime\b)[^>]*>/i);
  const runtimeLoaderTag = String(html || '').match(/<script\b(?=[^>]*\bdata-emy-page-runtime-loader\b)[^>]*>/i);
  const tag = runtimeTag || runtimeLoaderTag;
  if (!tag) return { expectedAsset, found: false };
  const sourceMatch = tag[0].match(/\bsrc="([^"]+)"/i) || tag[0].match(/\bdata-emy-page-runtime-src="([^"]+)"/i);
  const source = sourceMatch ? sourceMatch[1] : '';
  const assetName = source.replace(/^assets\//, '').replace(/\?.*$/, '');
  return {
    expectedAsset,
    found: Boolean(source),
    source,
    assetName,
    assetPath: path.join(assetsDir, assetName),
  };
}

const emyPerformanceGuardFailures = [];
const emyPerformanceGuardReports = [];

for (const [pageName, maxHtmlBytes] of Object.entries(emyPerformanceGuardPageBudgets)) {
  const outputPath = path.join(outDir, pageName);
  if (!fs.existsSync(outputPath)) {
    emyPerformanceGuardFailures.push(`${pageName}: generated page is missing`);
    continue;
  }

  const html = fs.readFileSync(outputPath, 'utf8');
  const htmlBytes = emyPerformanceGuardBytes(html);
  const largeInlineScripts = emyPerformanceGuardLargeInlineScripts(html);
  const runtimeAsset = emyPerformanceGuardRuntimeAsset(pageName, html);

  if (htmlBytes > maxHtmlBytes) {
    emyPerformanceGuardFailures.push(`${pageName}: HTML is ${htmlBytes} bytes, budget is ${maxHtmlBytes} bytes`);
  }

  if (largeInlineScripts.length) {
    emyPerformanceGuardFailures.push(
      `${pageName}: contains inline script larger than ${emyPerformanceGuardInlineLimit} bytes at line ${largeInlineScripts[0].line} (${largeInlineScripts[0].bytes} bytes)`
    );
  }

  if (!runtimeAsset.found) {
    emyPerformanceGuardFailures.push(`${pageName}: missing deferred data-emy-page-runtime script`);
  } else if (runtimeAsset.assetName !== runtimeAsset.expectedAsset) {
    emyPerformanceGuardFailures.push(`${pageName}: runtime asset is ${runtimeAsset.assetName}, expected ${runtimeAsset.expectedAsset}`);
  } else if (!fs.existsSync(runtimeAsset.assetPath)) {
    emyPerformanceGuardFailures.push(`${pageName}: runtime asset is missing at ${runtimeAsset.assetPath}`);
  }

  emyPerformanceGuardReports.push({
    page: pageName,
    htmlBytes,
    maxHtmlBytes,
    largeInlineScripts: largeInlineScripts.length,
    runtimeAsset: runtimeAsset.assetName || '',
  });
}

if (emyPerformanceGuardFailures.length) {
  throw new Error(`EMY performance output guard failed:\n- ${emyPerformanceGuardFailures.join('\n- ')}`);
}

console.log(JSON.stringify({ performanceOutputGuard: emyPerformanceGuardReports }, null, 2));

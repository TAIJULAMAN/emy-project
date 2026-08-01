'use strict';

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const reportPath = path.join(projectRoot, 'work', 'click-speed-audit.json');
const baseUrl = (process.env.EMY_AUDIT_BASE_URL || 'http://127.0.0.1:8767/restore-may20').replace(/\/+$/, '');
const maxClicksPerPage = Number(process.env.EMY_AUDIT_MAX_CLICKS || 28);
const clickTimeoutMs = Number(process.env.EMY_AUDIT_CLICK_TIMEOUT_MS || 1800);
const pageTimeoutMs = Number(process.env.EMY_AUDIT_PAGE_TIMEOUT_MS || 25000);

const pages = [
  ['Home', '/index.html'],
  ['About', '/about.html'],
  ['Business', '/business.html'],
  ['Contact', '/contact.html'],
  ['FAQs', '/faqs.html'],
  ['Privacy', '/privacy.html'],
  ['Terms', '/terms.html'],
  ['Ask EMY', '/ask-emy.html'],
  ['Ask EMY Results', '/ask-emy-results.html'],
  ['Sign In', '/emy-signin.html'],
  ['Sign Up', '/emy-signup.html'],
  ['Forgot Password', '/emy-forgot-password.html'],
  ['Confirmation', '/emy-confirmation.html'],
  ['Customer Home', '/emy-customer-home.html?tab=home#home'],
  ['Customer Nearby', '/emy-customer-home.html?tab=nearby#nearby'],
  ['Customer Feeds', '/emy-customer-home.html?tab=feeds#feeds'],
  ['Customer Reels', '/emy-customer-home.html?tab=reels#reels'],
  ['Customer Uploads', '/emy-customer-home.html?tab=uploads#uploads'],
  ['Customer Search', '/emy-customer-search.html'],
  ['Customer Feeds Page', '/emy-customer-feeds.html'],
  ['Customer Profile', '/emy-customer-profile.html'],
  ['Notifications', '/emy-notification-settings.html'],
  ['Customer Chat', '/emy-customer-chat.html'],
  ['Business Profile', '/emy-business-profile.html'],
  ['Admin Backend', '/emy-admin-backend.html'],
];

function requirePlaywright() {
  const candidates = [
    'playwright',
    process.env.CODEX_NODE_MODULES ? path.join(process.env.CODEX_NODE_MODULES, 'playwright') : '',
    process.env.USERPROFILE ? path.join(process.env.USERPROFILE, '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules', 'playwright') : '',
  ].filter(Boolean);

  const errors = [];
  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch (error) {
      errors.push(`${candidate}: ${error.message}`);
    }
  }
  throw new Error(`Could not load Playwright.\n${errors.join('\n')}`);
}

async function launchChromium(chromium) {
  const attempts = [
    () => chromium.launch({ headless: true }),
    () => chromium.launch({ channel: 'chrome', headless: true }),
    () => chromium.launch({ channel: 'msedge', headless: true }),
  ];
  let lastError = null;
  for (const attempt of attempts) {
    try {
      return await attempt();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

function pageUrl(pagePath) {
  return `${baseUrl}${pagePath}`;
}

function normalizeText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function fileNameForPagePath(pagePath) {
  const cleanPath = String(pagePath || '').split(/[?#]/)[0].replace(/^\/+/, '');
  return cleanPath || 'index.html';
}

function safeClickSurfaceInfo(document, maxTargets = 9999) {
  const unsafePattern = /\b(delete|remove|discard|clear|reset|purge|approve|reject|submit|save|send|publish|post|upload|camera|record|oauth|google|facebook|sign out|logout|log out|download|export|import|file)\b/i;
  const safePattern = /\b(open|close|back|cancel|keep editing|menu|more|options|filter|tab|home|nearby|feeds|reels|uploads|profile|chat|ask|notifications?|settings|view|show|hide|next|previous|prev|search|sort|details|photos?|products?|clips?|events?|jobs?|articles?|messages?)\b/i;
  const nodes = Array.from(document.querySelectorAll([
    'button',
    'summary',
    '[role="button"]',
    '[data-nav]',
    '[data-tab]',
    '[data-feed-filter]',
    '[data-reel-tab]',
    '[data-business-preview-tab]',
    '[data-notifications]',
    '[data-notification-back]',
    '[data-notification-settings]',
    '[data-close]',
    '[data-modal-close]',
    '[data-sheet-close]',
    '[aria-haspopup="menu"]',
    'a[href^="#"]',
    'a[href^="javascript:"]',
  ].join(',')));
  const seen = new Set();
  const safeTargets = [];
  let unsafeSkipped = 0;
  nodes.forEach((node) => {
    if (safeTargets.length >= maxTargets) return;
    const text = normalizeText(node.textContent || node.getAttribute('aria-label') || node.getAttribute('title') || '');
    const attrs = Array.from(node.attributes || []).map((attr) => `${attr.name}=${attr.value}`).join(' ');
    const label = text || node.getAttribute('aria-label') || node.getAttribute('title') || node.tagName.toLowerCase();
    const haystack = `${label} ${attrs}`;
    if (unsafePattern.test(haystack)) {
      unsafeSkipped += 1;
      return;
    }
    if (!safePattern.test(haystack) && !/\bdata-(nav|tab|filter|notifications?|close|modal|sheet|menu|options)\b/i.test(attrs)) return;
    const key = `${node.tagName}:${label}:${attrs.slice(0, 120)}`;
    if (seen.has(key)) return;
    seen.add(key);
    safeTargets.push({
      tag: node.tagName.toLowerCase(),
      label: String(label).slice(0, 90),
      attrs: attrs.slice(0, 220),
    });
  });
  return { safeTargets, unsafeSkipped };
}

function staticAudit(playwrightError) {
  const { JSDOM } = require('jsdom');
  const outDir = path.join(projectRoot, 'linked-pages', 'restore-may20');
  const results = pages.map(([name, pagePath]) => {
    const fileName = fileNameForPagePath(pagePath);
    const filePath = path.join(outDir, fileName);
    if (!fs.existsSync(filePath)) {
      return {
        name,
        path: pagePath,
        status: 'missing',
        errors: [`Missing generated file: ${fileName}`],
      };
    }
    const html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const scripts = Array.from(document.scripts).map((script) => ({
      src: script.getAttribute('src') || '',
      inlineBytes: script.getAttribute('src') ? 0 : Buffer.byteLength(script.textContent || '', 'utf8'),
    }));
    const runtimeScript = scripts.find((script) => /-page\.js(?:\?|$)/.test(script.src));
    const runtimeLoader = document.querySelector('[data-emy-page-runtime-loader][data-emy-page-runtime-src]');
    const runtimeSource = runtimeScript
      ? runtimeScript.src
      : runtimeLoader
        ? runtimeLoader.getAttribute('data-emy-page-runtime-src') || ''
        : '';
    const runtimeAsset = runtimeSource.replace(/^assets\//, '').replace(/\?.*$/, '');
    const runtimeAssetPath = runtimeAsset ? path.join(outDir, 'assets', runtimeAsset) : '';
    const clickInfo = safeClickSurfaceInfo(document);
    return {
      name,
      path: pagePath,
      url: pageUrl(pagePath),
      status: 'static',
      htmlBytes: Buffer.byteLength(html),
      gzipEstimate: 0,
      stats: {
        title: document.title,
        elements: document.querySelectorAll('*').length,
        buttons: document.querySelectorAll('button').length,
        links: document.querySelectorAll('a[href]').length,
        inputs: document.querySelectorAll('input, textarea, select').length,
        videos: document.querySelectorAll('video').length,
        scripts: scripts.length,
        externalScripts: scripts.filter((script) => script.src).length,
        inlineScripts: scripts.filter((script) => !script.src).length,
        largestInlineScript: scripts.reduce((max, script) => Math.max(max, script.inlineBytes || 0), 0),
        safeClickTargets: clickInfo.safeTargets.length,
        unsafeSkipped: clickInfo.unsafeSkipped,
        runtimeAsset,
        runtimeDelayed: Boolean(runtimeLoader),
        runtimeAssetBytes: runtimeAssetPath && fs.existsSync(runtimeAssetPath) ? fs.statSync(runtimeAssetPath).size : 0,
      },
      sampleTargets: clickInfo.safeTargets.slice(0, 20),
      errors: [],
    };
  });
  const summary = {
    generatedAt: new Date().toISOString(),
    mode: 'static-fallback',
    baseUrl,
    playwrightError: playwrightError ? playwrightError.message : '',
    pages: results.length,
    missingPages: results.filter((result) => result.status === 'missing').length,
    highestRiskPages: results
      .filter((result) => result.status === 'static')
      .map((result) => ({
        name: result.name,
        path: result.path,
        htmlBytes: result.htmlBytes,
        elements: result.stats.elements,
        buttons: result.stats.buttons,
        links: result.stats.links,
        inputs: result.stats.inputs,
        videos: result.stats.videos,
        safeClickTargets: result.stats.safeClickTargets,
        runtimeAssetBytes: result.stats.runtimeAssetBytes,
        largestInlineScript: result.stats.largestInlineScript,
        riskScore: result.htmlBytes + result.stats.runtimeAssetBytes + (result.stats.safeClickTargets * 2000) + (result.stats.videos * 10000),
      }))
      .sort((a, b) => b.riskScore - a.riskScore)
      .slice(0, 12),
  };
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify({ summary, results }, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  console.log(`Report written to ${reportPath}`);
}

async function eventLoopDrift(page, durationMs = 900) {
  try {
    return await page.evaluate((duration) => new Promise((resolve) => {
      const samples = [];
      let last = Date.now();
      const end = last + duration;
      function tick() {
        const now = Date.now();
        samples.push(now - last);
        last = now;
        if (now >= end) {
          const sorted = samples.slice().sort((a, b) => a - b);
          resolve({
            samples: samples.length,
            max: Math.max(...samples),
            p95: sorted[Math.floor(sorted.length * 0.95)] || 0,
            p99: sorted[Math.floor(sorted.length * 0.99)] || 0,
          });
          return;
        }
        setTimeout(tick, 16);
      }
      setTimeout(tick, 16);
    }), duration, { timeout: durationMs + 6000 });
  } catch (error) {
    return { error: error.message };
  }
}

async function collectPageStats(page) {
  return page.evaluate(() => {
    const scripts = Array.from(document.scripts).map((script) => ({
      src: script.getAttribute('src') || '',
      defer: script.defer,
      async: script.async,
      inlineBytes: script.src ? 0 : new Blob([script.textContent || '']).size,
    }));
    return {
      title: document.title,
      currentView: document.body && document.body.dataset ? document.body.dataset.currentView || '' : '',
      ariaBusy: document.body ? document.body.getAttribute('aria-busy') || '' : '',
      elements: document.querySelectorAll('*').length,
      buttons: document.querySelectorAll('button').length,
      links: document.querySelectorAll('a[href]').length,
      inputs: document.querySelectorAll('input, textarea, select').length,
      videos: document.querySelectorAll('video').length,
      scripts: scripts.length,
      externalScripts: scripts.filter((script) => script.src).length,
      inlineScripts: scripts.filter((script) => !script.src).length,
      largestInlineScript: scripts.reduce((max, script) => Math.max(max, script.inlineBytes || 0), 0),
    };
  });
}

async function collectSafeClickTargets(page, limit) {
  return page.evaluate((maxTargets) => {
    const unsafePattern = /\b(delete|remove|discard|clear|reset|purge|approve|reject|submit|save|send|publish|post|upload|camera|record|oauth|google|facebook|sign out|logout|log out|download|export|import|file)\b/i;
    const safePattern = /\b(open|close|back|cancel|keep editing|menu|more|options|filter|tab|home|nearby|feeds|reels|uploads|profile|chat|ask|notifications?|settings|view|show|hide|next|previous|prev|search|sort|details|photos?|products?|clips?|events?|jobs?|articles?|messages?)\b/i;
    const nodes = Array.from(document.querySelectorAll([
      'button',
      'summary',
      '[role="button"]',
      '[data-nav]',
      '[data-tab]',
      '[data-feed-filter]',
      '[data-reel-tab]',
      '[data-business-preview-tab]',
      '[data-notifications]',
      '[data-notification-back]',
      '[data-notification-settings]',
      '[data-close]',
      '[data-modal-close]',
      '[data-sheet-close]',
      '[aria-haspopup="menu"]',
      'a[href^="#"]',
      'a[href^="javascript:"]',
    ].join(',')));

    const seen = new Set();
    const result = [];
    nodes.forEach((node) => {
      if (result.length >= maxTargets) return;
      if (!(node instanceof HTMLElement)) return;
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      if (rect.width < 4 || rect.height < 4 || style.visibility === 'hidden' || style.display === 'none') return;
      if (node.disabled || node.getAttribute('aria-disabled') === 'true') return;

      const text = (node.innerText || node.textContent || node.getAttribute('aria-label') || node.title || '').replace(/\s+/g, ' ').trim();
      const attrs = Array.from(node.attributes || []).map((attr) => `${attr.name}=${attr.value}`).join(' ');
      const label = text || node.getAttribute('aria-label') || node.title || node.tagName.toLowerCase();
      const haystack = `${label} ${attrs}`;
      if (unsafePattern.test(haystack)) return;
      if (!safePattern.test(haystack) && !/\bdata-(nav|tab|filter|notifications?|close|modal|sheet|menu|options)\b/i.test(attrs)) return;

      const key = `${node.tagName}:${label}:${attrs.slice(0, 120)}`;
      if (seen.has(key)) return;
      seen.add(key);

      const id = `emy-click-audit-${result.length}`;
      node.setAttribute('data-emy-click-audit-id', id);
      result.push({
        id,
        tag: node.tagName.toLowerCase(),
        label: label.slice(0, 90),
        attrs: attrs.slice(0, 220),
      });
    });
    return result;
  }, limit);
}

async function pressEscape(page) {
  try {
    await page.keyboard.press('Escape', { timeout: 500 });
  } catch (_) {}
}

async function auditPage(context, name, pagePath) {
  const page = await context.newPage();
  const url = pageUrl(pagePath);
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.route('**/*', (route) => {
    const requestUrl = route.request().url();
    if (requestUrl.startsWith(baseUrl) || requestUrl.startsWith('data:') || requestUrl.startsWith('blob:')) {
      route.continue();
      return;
    }
    route.abort();
  });

  const started = Date.now();
  let status = 'ok';
  let gotoMs = 0;
  let stats = {};
  let driftBefore = {};
  let targets = [];
  const clicks = [];

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: pageTimeoutMs });
    gotoMs = Date.now() - started;
    await page.waitForTimeout(250);
    stats = await collectPageStats(page);
    driftBefore = await eventLoopDrift(page, 700);
    targets = await collectSafeClickTargets(page, maxClicksPerPage);

    for (const target of targets) {
      const selector = `[data-emy-click-audit-id="${target.id}"]`;
      const clickStarted = Date.now();
      const beforeUrl = page.url();
      try {
        const locator = page.locator(selector);
        if (await locator.count() !== 1) {
          clicks.push({ target, ok: false, ms: 0, error: 'target changed before click' });
          continue;
        }
        await locator.click({ timeout: clickTimeoutMs });
        const ms = Date.now() - clickStarted;
        await page.waitForTimeout(60);
        const afterUrl = page.url();
        clicks.push({ target, ok: true, ms, navigated: afterUrl !== beforeUrl });
        if (afterUrl !== beforeUrl) {
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: pageTimeoutMs });
          await page.waitForTimeout(120);
          targets = await collectSafeClickTargets(page, maxClicksPerPage);
        } else {
          await pressEscape(page);
        }
      } catch (error) {
        clicks.push({ target, ok: false, ms: Date.now() - clickStarted, error: error.message.split('\n')[0] });
        await pressEscape(page);
      }
    }
  } catch (error) {
    status = 'failed';
    errors.push(error.message.split('\n')[0]);
  } finally {
    await page.close().catch(() => {});
  }

  const slowClicks = clicks.filter((click) => click.ms > 250 || !click.ok);
  return {
    name,
    path: pagePath,
    url,
    status,
    gotoMs,
    stats,
    driftBefore,
    targetCount: targets.length,
    clicked: clicks.length,
    slowClicks,
    worstClickMs: clicks.reduce((max, click) => Math.max(max, click.ms || 0), 0),
    errors: errors.slice(0, 20),
  };
}

async function main() {
  let playwright;
  try {
    playwright = requirePlaywright();
  } catch (error) {
    staticAudit(error);
    return;
  }
  const { chromium } = playwright;
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  const browser = await launchChromium(chromium);
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    reducedMotion: 'reduce',
  });
  await context.addInitScript(() => {
    try {
      localStorage.setItem('emyLocalDevAccess', '1');
      localStorage.setItem('emyTestModeEnabled', 'true');
      localStorage.setItem('emyMainSignedInRole', 'customer');
      localStorage.setItem('emyMainSignedInEmail', 'test.customer@emy.local');
      localStorage.setItem('emyCustomerEmail', 'test.customer@emy.local');
      localStorage.setItem('emyCustomerDisplayName', 'EMY Test Customer');
    } catch (_) {}
  });

  const results = [];
  for (const [name, pagePath] of pages) {
    process.stdout.write(`Auditing ${name}... `);
    const result = await auditPage(context, name, pagePath);
    results.push(result);
    const label = result.status === 'ok' && result.slowClicks.length === 0 ? 'OK' : 'CHECK';
    console.log(`${label} load=${result.gotoMs}ms clicked=${result.clicked} slow=${result.slowClicks.length}`);
  }

  await browser.close();

  const summary = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    pages: results.length,
    failedPages: results.filter((result) => result.status !== 'ok').length,
    pagesWithSlowClicks: results.filter((result) => result.slowClicks.length).length,
    worstPages: results
      .map((result) => ({
        name: result.name,
        path: result.path,
        gotoMs: result.gotoMs,
        elements: result.stats.elements || 0,
        buttons: result.stats.buttons || 0,
        videos: result.stats.videos || 0,
        clicked: result.clicked,
        slowClicks: result.slowClicks.length,
        worstClickMs: result.worstClickMs,
        driftMax: result.driftBefore.max || 0,
        driftP95: result.driftBefore.p95 || 0,
      }))
      .sort((a, b) => (b.worstClickMs + b.gotoMs + b.driftMax) - (a.worstClickMs + a.gotoMs + a.driftMax))
      .slice(0, 12),
  };

  const report = { summary, results };
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  console.log(`Report written to ${reportPath}`);

  if (summary.failedPages) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});

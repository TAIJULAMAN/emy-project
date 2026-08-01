/* EMY generator section: 46-manifest-post-process.cjs (source lines 111949-112540) */
function moveInterFontImportsToHeadLinks(html) {
  let next = String(html || '');
  const urls = [];
  next = next.replace(/@import\s+url\((['"])(https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^'")]+)\1\);\s*/g, (match, quote, url) => {
    if (!urls.includes(url)) urls.push(url);
    return '';
  });
  if (!urls.length || !next.includes('</head>')) return next;
  if (/data-emy-font-inter-async/i.test(next)) return next;

  const tags = [];
  tags.push('    <link rel="preconnect" href="https://fonts.googleapis.com" data-emy-font-inter-async />');
  tags.push('    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin data-emy-font-inter-async />');
  urls.forEach((url) => {
    tags.push(`    <link rel="preload" as="style" href="${url}" onload="this.onload=null;this.rel='stylesheet'" data-emy-font-inter-async />`);
    tags.push(`    <noscript data-emy-font-inter-async><link rel="stylesheet" href="${url}" /></noscript>`);
  });

  const insertion = tags.join('\n') + '\n';
  const viewportMatch = next.match(/<meta name="viewport"[^>]*>\s*/i);
  if (viewportMatch && typeof viewportMatch.index === 'number') {
    const index = viewportMatch.index + viewportMatch[0].length;
    return next.slice(0, index) + insertion + next.slice(index);
  }
  return next.replace('</head>', () => insertion + '  </head>');
}

const CUSTOMER_HOME_LATE_ENHANCER_SCRIPT_ATTRS = [
  'data-emy-customer-home-create-bootstrap',
  'data-emy-test-mode',
  'data-emy-comment-replies',
  'data-emy-more-options-cleaner',
  'data-emy-business-clip-product-mini-restore',
  'data-emy-rail-selection-state',
  'data-emy-clip-hover-preview',
  'data-emy-modal-close-guard',
  'data-emy-account-session-nav',
  'data-emy-clip-scroll-restart',
  'data-emy-emoji-picker',
  'data-emy-video-controls-enhancer',
  'data-emy-event-system',
  'data-emy-notification-router',
  'data-emy-business-like-sync',
  'data-emy-product-mascot-like-sync',
  'data-emy-post-profile-circle-removal',
  'data-emy-home-clip-mascot-like',
];

function escapeRegExp(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function customerHomeLateEnhancerLoader(scripts) {
  const payload = JSON.stringify(scripts || []);
  return `    <script data-emy-customer-home-late-enhancers>
      (() => {
        if (window.emyCustomerHomeLateEnhancersReady) return;
        window.emyCustomerHomeLateEnhancersReady = true;
        const scripts = ${payload};
        let started = false;
        function loadNext(index) {
          if (index >= scripts.length) return;
          const item = scripts[index] || {};
          if (!item.src) {
            loadNext(index + 1);
            return;
          }
          const existing = Array.from(document.scripts || []).some((script) => script.getAttribute("src") === item.src);
          if (existing) {
            loadNext(index + 1);
            return;
          }
          const script = document.createElement("script");
          script.async = false;
          script.src = item.src;
          script.setAttribute("data-emy-late-enhancer", "true");
          if (item.attr) script.setAttribute(item.attr, "");
          script.onload = () => loadNext(index + 1);
          script.onerror = () => loadNext(index + 1);
          (document.body || document.head || document.documentElement).appendChild(script);
        }
        function load() {
          if (started) return;
          started = true;
          loadNext(0);
        }
        window.__emyLoadCustomerHomeLateEnhancersNow = load;
        function schedule() {
          if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(load, { timeout: 12000 });
          } else {
            window.setTimeout(load, 9000);
          }
        }
        if (document.readyState === "complete") window.setTimeout(schedule, 5000);
        else {
          window.addEventListener("load", () => window.setTimeout(schedule, 5000), { once: true });
          window.setTimeout(schedule, 18000);
        }
      })();
    </script>`;
}

function customerHomeRealDataGuardLoader(scriptTag) {
  const srcMatch = String(scriptTag || '').match(/\bsrc=(["'])([^"']+)\1/i);
  const src = srcMatch ? srcMatch[2] : 'assets/emy-real-data-guard.js';
  return `    <script data-emy-real-data-guard-loader>
      (() => {
        if (window.emyRealDataGuardDeferredLoaderReady) return;
        window.emyRealDataGuardDeferredLoaderReady = true;
        const src = ${JSON.stringify(src)};
        let started = false;
        function load() {
          if (started) return;
          started = true;
          const existing = Array.from(document.scripts || []).some((script) => script.getAttribute("src") === src);
          if (existing) return;
          const script = document.createElement("script");
          script.async = true;
          try { script.fetchPriority = "high"; script.setAttribute("fetchpriority", "high"); } catch (error) {}
          script.src = src;
          script.setAttribute("data-emy-real-data-guard", "");
          script.onerror = () => {};
          (document.body || document.head || document.documentElement).appendChild(script);
        }
        function schedule() {
          const run = () => {
            if (typeof window.requestIdleCallback === "function") {
              window.requestIdleCallback(load, { timeout: 50 });
              window.setTimeout(load, 90);
            } else {
              window.setTimeout(load, 20);
            }
          };
          if (typeof window.requestAnimationFrame === "function") {
            window.requestAnimationFrame(run);
          } else {
            window.setTimeout(run, 0);
          }
        }
        schedule();
        window.addEventListener("load", schedule, { once: true });
        window.setTimeout(load, 240);
      })();
    </script>`;
}

function deferCustomerHomeLateEnhancers(html) {
  let next = stripSharedScript(html, 'data-emy-customer-home-late-enhancers');
  const scripts = [];
  CUSTOMER_HOME_LATE_ENHANCER_SCRIPT_ATTRS.forEach((attr) => {
    const scriptRe = new RegExp(`\\n?\\s*<script\\b(?=[^>]*\\b${escapeRegExp(attr)}\\b)[^>]*\\bsrc=(["'])([^"']+)\\1[^>]*>\\s*<\\/script>`, 'g');
    next = next.replace(scriptRe, (match, quote, src) => {
      if (!scripts.some((item) => item.src === src && item.attr === attr)) scripts.push({ src, attr });
      return '';
    });
  });
  if (!scripts.length || !next.includes('</body>')) return next;
  return next.replace('</body>', () => customerHomeLateEnhancerLoader(scripts) + '\n  </body>');
}

for (const entry of manifest) {
  const outputPath = path.join(outDir, entry.page);
  if (!fs.existsSync(outputPath)) continue;
  let html = fs.readFileSync(outputPath, 'utf8');
  const htmlWithInterFontLinks = moveInterFontImportsToHeadLinks(html);
  if (htmlWithInterFontLinks !== html) {
    html = htmlWithInterFontLinks;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithPatchedHomeCarouselCounter = patchHomeCarouselVisibleItemCounter(html);
  if (htmlWithPatchedHomeCarouselCounter !== html) {
    html = htmlWithPatchedHomeCarouselCounter;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const cleanedHtml = cleanBrokenEventSystemLeak(html);
  if (cleanedHtml !== html) {
    html = cleanedHtml;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutDisabledFallbackScripts = removeDisabledLegacyFallbackScripts(html);
  if (htmlWithoutDisabledFallbackScripts !== html) {
    html = htmlWithoutDisabledFallbackScripts;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutPageBootGate = stripSharedStyle(stripSharedScript(html, 'data-emy-page-boot-gate'), 'data-emy-page-boot-gate')
    .replace(/\n?\s*<!-- emy-page-boot-loader:start -->[\s\S]*?<!-- emy-page-boot-loader:end -->/g, '');
  if (htmlWithoutPageBootGate !== html) {
    html = htmlWithoutPageBootGate;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutRealBackend = html.replace(/\n?\s*<!-- emy-real-backend:start -->[\s\S]*?<!-- emy-real-backend:end -->/g, '');
  if (htmlWithoutRealBackend !== html) {
    html = htmlWithoutRealBackend;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (realBackendPages.has(entry.page) && html.includes('</head>')) {
    const backendLoaderScript = entry.page === 'emy-business-profile.html' || entry.page === 'emy-customer-home.html'
      ? ASSETS.sharedEmyRealBackendNonBlockingLoaderScript
      : ASSETS.sharedEmyRealBackendLoaderScript;
    html = html.replace('</head>', () => backendLoaderScript + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (entry.page === 'emy-customer-home.html') {
    const htmlWithoutCreateBootstrap = stripSharedScript(html, 'data-emy-customer-home-create-bootstrap');
    if (htmlWithoutCreateBootstrap !== html) {
      html = htmlWithoutCreateBootstrap;
      fs.writeFileSync(outputPath, html, 'utf8');
      entry.bytes = Buffer.byteLength(html);
    }
    if (!html.includes('data-emy-customer-home-create-bootstrap') && html.includes('</body>')) {
      html = html.replace('</body>', () => ASSETS.customerHomeCreateBootstrapScript + '\n  </body>');
      fs.writeFileSync(outputPath, html, 'utf8');
      entry.bytes = Buffer.byteLength(html);
    }
  }
  if (entry.page === 'emy-admin-backend.html') {
    const htmlWithAdminCloudConsole = patchAdminCloudConsole(html);
    if (htmlWithAdminCloudConsole !== html) {
      html = htmlWithAdminCloudConsole;
      fs.writeFileSync(outputPath, html, 'utf8');
      entry.bytes = Buffer.byteLength(html);
    }
  }
  if (entry.page === 'emy-customer-feeds.html') {
    html = customerFeedsRedirectHtml();
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
    continue;
  }
  const htmlWithCustomerFeedsLinksRewritten = rewriteCustomerFeedsLinks(html);
  if (htmlWithCustomerFeedsLinksRewritten !== html) {
    html = htmlWithCustomerFeedsLinksRewritten;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const hasHomeBootGate = entry.page === 'emy-customer-home.html' || html.includes('data-emy-home-boot-loader');
  if (!hasHomeBootGate && pageBootGatePages.has(entry.page) && html.includes('</head>') && /<body\b/i.test(html)) {
    html = html.replace('</head>', () => ASSETS.sharedPageBootGateStyle + '\n' + ASSETS.sharedPageBootGateScript + '\n  </head>');
    html = html.replace(/<body\b[^>]*>/i, (match) => match + sharedPageBootLoaderMarkup);
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutCustomerShellSession = stripSharedScript(html, 'data-emy-customer-shell-session');
  if (htmlWithoutCustomerShellSession !== html) {
    html = htmlWithoutCustomerShellSession;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsCustomerShellSession = ['emy-customer-home.html', 'emy-customer-search.html', 'emy-customer-feeds.html', 'emy-customer-profile.html', 'emy-customer-chat.html'].includes(entry.page);
  if (needsCustomerShellSession && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedCustomerShellSessionScript + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutPlatformContentSync = stripSharedScript(html, 'data-emy-platform-content-sync');
  if (htmlWithoutPlatformContentSync !== html) {
    html = htmlWithoutPlatformContentSync;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (realDataGuardPages.has(entry.page) && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedPlatformContentSyncScript + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutTestMode = stripSharedScript(html, 'data-emy-test-mode');
  if (htmlWithoutTestMode !== html) {
    html = htmlWithoutTestMode;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsCustomerShellSession && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedEmyTestModeScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutNotificationThumbBoxes = patchNotificationThumbBoxes(html);
  if (htmlWithoutNotificationThumbBoxes !== html) {
    html = htmlWithoutNotificationThumbBoxes;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsCommentComposerPolish = html.includes('feed-comment-form') || html.includes('clip-viewer-comment-form');
  const htmlWithoutCommentComposerPolish = stripSharedStyle(html, 'data-emy-comment-composer-polish');
  if (htmlWithoutCommentComposerPolish !== html) {
    html = htmlWithoutCommentComposerPolish;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsCommentComposerPolish && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedCommentComposerPolishStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsCommentWriting = html.includes('feed-comment') || html.includes('item-product-comment') || html.includes('clip-viewer-comment');
  const htmlWithoutCommentWriting = stripSharedStyle(html, 'data-emy-comment-writing');
  if (htmlWithoutCommentWriting !== html) {
    html = htmlWithoutCommentWriting;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsCommentWriting && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedCommentWritingStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsCommentReplies = html.includes('feed-comment-replies') || html.includes('item-product-comment-replies') || html.includes('clip-viewer-comment-replies');
  const htmlWithoutCommentReplies = stripSharedScript(html, 'data-emy-comment-replies');
  if (htmlWithoutCommentReplies !== html) {
    html = htmlWithoutCommentReplies;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsCommentReplies && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedCommentRepliesScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsDeleteConfirm = /data-[a-z0-9-]*delete|data-feed-option=["']delete["']|data-settings-link=["']delete["']|window\.confirm/i.test(html);
  const htmlWithoutDeleteConfirm = stripSharedScript(html, 'data-emy-delete-confirm');
  if (htmlWithoutDeleteConfirm !== html) {
    html = htmlWithoutDeleteConfirm;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsDeleteConfirm && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedDeleteConfirmScript + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutItemDetailOptionsEnhancer = stripSharedScript(html, 'data-emy-item-detail-options-enhancer');
  const needsItemDetailOptionsEnhancer = htmlWithoutItemDetailOptionsEnhancer.includes('data-item-detail-modal') && !htmlWithoutItemDetailOptionsEnhancer.includes('data-item-detail-options');
  if (htmlWithoutItemDetailOptionsEnhancer !== html) {
    html = htmlWithoutItemDetailOptionsEnhancer;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsItemDetailOptionsEnhancer && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedItemDetailOptionsEnhancerScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutMoreOptionsCleaner = stripSharedScript(html, 'data-emy-more-options-cleaner');
  const needsMoreOptionsCleaner = htmlWithoutMoreOptionsCleaner.includes('data-feed-options') || htmlWithoutMoreOptionsCleaner.includes('data-public-activity-more') || htmlWithoutMoreOptionsCleaner.includes('data-clip-more');
  if (htmlWithoutMoreOptionsCleaner !== html) {
    html = htmlWithoutMoreOptionsCleaner;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsMoreOptionsCleaner && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedMoreOptionsButtonScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsFeedBoxWriting = html.includes('feed-job-meta') || html.includes('feed-event-post-meta') || html.includes('feed-job-desc') || html.includes('feed-event-post-details') || html.includes('social-feed-text-panel') || html.includes('feed-article-card-body') || html.includes('home-created-body');
  const htmlWithoutFeedBoxWriting = stripSharedStyle(html, 'data-emy-feed-box-writing');
  if (htmlWithoutFeedBoxWriting !== html) {
    html = htmlWithoutFeedBoxWriting;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsFeedBoxWriting && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedFeedBoxWritingStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsProductClipGlass = html.includes('product-clip-panel') || html.includes('feed-product-clip-card');
  const htmlWithoutProductClipGlass = stripSharedStyle(html, 'data-emy-product-clip-glass');
  if (htmlWithoutProductClipGlass !== html) {
    html = htmlWithoutProductClipGlass;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsProductClipGlass && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedProductClipGlassStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsClipCleanMediaOverlays = html.includes('clip-viewer-info') || html.includes('clip-viewer-caption') || html.includes('feed-clip-card') || html.includes('feed-product-clip-card') || html.includes('reel-card') || html.includes('product-clip-panel') || html.includes('reel-product-strip') || html.includes('search-reel-product');
  const htmlWithoutClipCleanMediaOverlays = stripSharedStyle(html, 'data-emy-clip-clean-media-overlays');
  if (htmlWithoutClipCleanMediaOverlays !== html) {
    html = htmlWithoutClipCleanMediaOverlays;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsClipCleanMediaOverlays && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedClipCleanMediaOverlaysStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsClipMascotLike = html.includes('data-clip-viewer-track') || html.includes('clip-viewer-info') || html.includes('clip-viewer-like-chip');
  const htmlWithoutClipMascotLike = stripSharedStyle(stripSharedScript(html, 'data-emy-home-clip-mascot-like'), 'data-emy-home-clip-mascot-like');
  if (htmlWithoutClipMascotLike !== html) {
    html = htmlWithoutClipMascotLike;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsClipMascotLike && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.customerHomeClipMascotLikeStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsClipMascotLike && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.customerHomeClipMascotLikeScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsClipMiniProductOverlay = html.includes('clip-product-mini') || html.includes('feed-product-clip-card');
  const htmlWithoutClipMiniProductOverlay = stripSharedStyle(html, 'data-emy-clip-mini-product-overlay');
  if (htmlWithoutClipMiniProductOverlay !== html) {
    html = htmlWithoutClipMiniProductOverlay;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsClipMiniProductOverlay && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedClipMiniProductOverlayStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutSearchClipCardFix = stripSharedStyle(html, 'data-emy-search-clip-card-fix');
  if (htmlWithoutSearchClipCardFix !== html) {
    html = htmlWithoutSearchClipCardFix;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (entry.page === 'emy-customer-search.html' && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedSearchClipCardFixStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutBusinessClipProductMiniRestore = stripSharedScript(html, 'data-emy-business-clip-product-mini-restore');
  if (htmlWithoutBusinessClipProductMiniRestore !== html) {
    html = htmlWithoutBusinessClipProductMiniRestore;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsClipMiniProductOverlay && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedBusinessClipProductMiniRestoreScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsFeedsClipSizing = html.includes('data-annexed-feed-list') || html.includes('feed-list is-clip-grid');
  const htmlWithoutFeedsClipSizing = stripSharedStyle(html, 'data-emy-feeds-clip-sizing');
  if (htmlWithoutFeedsClipSizing !== html) {
    html = htmlWithoutFeedsClipSizing;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsFeedsClipSizing && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedFeedsClipSizingStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutResponsiveHoverStyle = stripSharedStyle(html, 'data-emy-responsive-hover-style');
  if (htmlWithoutResponsiveHoverStyle !== html) {
    html = htmlWithoutResponsiveHoverStyle;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedResponsiveHoverStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsRailSelectionState = html.includes('my-business-row') || html.includes('my-business-update') || html.includes('rail-pulse-item');
  const htmlWithoutRailSelectionStateStyle = stripSharedStyle(html, 'data-emy-rail-selection-state-style');
  if (htmlWithoutRailSelectionStateStyle !== html) {
    html = htmlWithoutRailSelectionStateStyle;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsRailSelectionState && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedRailSelectionStateStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutRailSelectionStateScript = stripSharedScript(html, 'data-emy-rail-selection-state');
  if (htmlWithoutRailSelectionStateScript !== html) {
    html = htmlWithoutRailSelectionStateScript;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsRailSelectionState && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedRailSelectionStateScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsClipHoverPreview = html.includes('feed-clip-card') || html.includes('feed-product-clip-card') || html.includes('feed-card is-clip') || html.includes('business-preview-card-reel') || html.includes('search-reel-card') || html.includes('social-feed-card is-clip') || html.includes('data-detail-kind="Clip"') || html.includes('data-detail-kind="Product Clip"');
  const htmlWithoutClipHoverPreview = stripSharedScript(html, 'data-emy-clip-hover-preview');
  if (htmlWithoutClipHoverPreview !== html) {
    html = htmlWithoutClipHoverPreview;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsClipHoverPreview && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedClipHoverPreviewScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsClipViewerScrollRestart = html.includes('data-clip-viewer-track') || html.includes('clip-viewer-modal');
  const htmlWithoutClipViewerScrollRestart = stripSharedScript(html, 'data-emy-clip-scroll-restart');
  if (htmlWithoutClipViewerScrollRestart !== html) {
    html = htmlWithoutClipViewerScrollRestart;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsClipViewerScrollRestart && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedClipViewerScrollRestartScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsModalCloseControls = html.includes('data-item-detail-close') || html.includes('data-item-detail-done') || html.includes('data-clip-viewer-close') || html.includes('item-detail-modal') || html.includes('clip-viewer-modal');
  const htmlWithoutModalCloseControls = stripSharedStyle(html, 'data-emy-modal-close-controls');
  if (htmlWithoutModalCloseControls !== html) {
    html = htmlWithoutModalCloseControls;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutModalCloseGuard = stripSharedScript(html, 'data-emy-modal-close-guard');
  if (htmlWithoutModalCloseGuard !== html) {
    html = htmlWithoutModalCloseGuard;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsModalCloseControls && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedModalCloseControlsStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsModalCloseControls && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedModalCloseGuardScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutAccountSessionNav = stripSharedScript(html, 'data-emy-account-session-nav');
  if (htmlWithoutAccountSessionNav !== html) {
    html = htmlWithoutAccountSessionNav;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedEmySessionNavScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsAskMini = html.includes('data-ask-mini-panel');
  const htmlWithoutAskMini = stripSharedScript(html, 'data-emy-ask-mini');
  if (htmlWithoutAskMini !== html) {
    html = htmlWithoutAskMini;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsAskMini && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedAskMiniScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsEmojiPicker = html.includes('data-chat-input') || html.includes('feed-comment-form') || html.includes('feed-comment-reply-form') || html.includes('item-product-comment') || html.includes('clip-viewer-comment-form') || html.includes('clip-viewer-comment-reply-form');
  const htmlWithoutEmojiPicker = stripSharedScript(html, 'data-emy-emoji-picker');
  if (htmlWithoutEmojiPicker !== html) {
    html = htmlWithoutEmojiPicker;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsEmojiPicker && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedEmyEmojiPickerScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutVideoControlsEnhancer = stripSharedScript(html, 'data-emy-video-controls-enhancer');
  if (htmlWithoutVideoControlsEnhancer !== html) {
    html = htmlWithoutVideoControlsEnhancer;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutBusinessVideoPopupControls = stripSharedStyle(stripSharedScript(html, 'data-emy-business-video-popup-controls'), 'data-emy-business-video-popup-controls');
  if (htmlWithoutBusinessVideoPopupControls !== html) {
    html = htmlWithoutBusinessVideoPopupControls;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (html.includes('data-emy-video-player') && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedEmyVideoControlsScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (entry.page === 'emy-business-profile.html' && html.includes('data-emy-video-player') && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedBusinessVideoPopupControlsScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if ((html.includes('data-feed-event-sheet') || html.includes('data-event-cover-upload') || html.includes('social-feed-event-card')) && html.includes('</body>')) {
    html = stripSharedScript(stripSharedScript(html, 'data-emy-event-cover-enhancer'), 'data-emy-event-system');
    html = html.replace('</body>', () => ASSETS.sharedEmyEventSystemScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutHomeFeedsVisibleSync = stripSharedScript(html, 'data-emy-home-feeds-visible-sync');
  if (htmlWithoutHomeFeedsVisibleSync !== html) {
    html = htmlWithoutHomeFeedsVisibleSync;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutRealDataGuard = stripSharedScript(stripSharedScript(html, 'data-emy-real-data-guard'), 'data-emy-real-data-guard-loader');
  if (htmlWithoutRealDataGuard !== html) {
    html = htmlWithoutRealDataGuard;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (realDataGuardPages.has(entry.page) && html.includes('</body>')) {
    const realDataGuardScript = entry.page === 'emy-customer-home.html'
      ? ASSETS.sharedRealDataGuardScript
      : ASSETS.sharedRealDataGuardScript;
    if (entry.page === 'emy-customer-home.html' && html.includes('data-emy-page-runtime')) {
      html = html.replace(/(\s*<script defer src="assets\/emy-customer-home-page\.js[^"]*" data-emy-page-runtime><\/script>)/, '\n' + realDataGuardScript + '$1');
    } else {
      html = html.replace('</body>', () => realDataGuardScript + '\n  </body>');
    }
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutNotificationRouter = stripSharedScript(html, 'data-emy-notification-router');
  if (htmlWithoutNotificationRouter !== html) {
    html = htmlWithoutNotificationRouter;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (notificationRouterPages.has(entry.page) && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedNotificationRouterScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutCentralEngagement = stripSharedScript(html, 'data-emy-central-engagement');
  if (htmlWithoutCentralEngagement !== html) {
    html = htmlWithoutCentralEngagement;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutSocialEngagementDisabled = stripSharedScript(html, 'data-emy-social-engagement-disabled');
  if (htmlWithoutSocialEngagementDisabled !== html) {
    html = htmlWithoutSocialEngagementDisabled;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutPostProfileCircleRemoval = stripSharedScript(html, 'data-emy-post-profile-circle-removal');
  if (htmlWithoutPostProfileCircleRemoval !== html) {
    html = htmlWithoutPostProfileCircleRemoval;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutPostProfileCircleRemovalStyle = stripSharedStyle(html, 'data-emy-post-profile-circle-removal-style');
  if (htmlWithoutPostProfileCircleRemovalStyle !== html) {
    html = htmlWithoutPostProfileCircleRemovalStyle;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutBusinessLikeSync = stripSharedStyle(stripSharedScript(html, 'data-emy-business-like-sync'), 'data-emy-business-like-style');
  if (htmlWithoutBusinessLikeSync !== html) {
    html = htmlWithoutBusinessLikeSync;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const htmlWithoutProductMascotLike = stripSharedStyle(stripSharedScript(html, 'data-emy-product-mascot-like-sync'), 'data-emy-product-mascot-like-style');
  if (htmlWithoutProductMascotLike !== html) {
    html = htmlWithoutProductMascotLike;
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  const needsCentralEngagement = centralEngagementPages.has(entry.page) ||
    /data-feed-action|data-feed-like|data-feed-save|data-feed-repost|data-business-like|data-search-business-like|data-public-activity-action|data-item-product-like|data-item-product-repost|data-item-detail-modal|clip-viewer|emyFeedActionState|product-card|feed-product-card|data-business-product-id/.test(html);
  if (needsCentralEngagement && html.includes('</head>')) {
    html = html.replace('</head>', () => ASSETS.sharedPostProfileCircleRemovalStyle + '\n  </head>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
  if (needsCentralEngagement && html.includes('</body>')) {
    html = html.replace('</body>', () => ASSETS.sharedCentralEngagementScript + '\n' + ASSETS.sharedBusinessLikeSyncScript + '\n' + ASSETS.sharedProductMascotLikeScript + '\n' + ASSETS.sharedPostProfileCircleRemovalScript + '\n' + ASSETS.sharedSocialEngagementDisabledScript + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    entry.bytes = Buffer.byteLength(html);
  }
}

for (const pageName of realBackendPages) {
  const outputPath = path.join(outDir, pageName);
  if (!fs.existsSync(outputPath)) continue;
  let html = fs.readFileSync(outputPath, 'utf8');
  const htmlWithoutRealBackend = html.replace(/\n?\s*<!-- emy-real-backend:start -->[\s\S]*?<!-- emy-real-backend:end -->/g, '');
  if (!htmlWithoutRealBackend.includes('</head>')) continue;
  const backendLoaderScript = pageName === 'emy-business-profile.html' || pageName === 'emy-customer-home.html'
    ? ASSETS.sharedEmyRealBackendNonBlockingLoaderScript
    : ASSETS.sharedEmyRealBackendLoaderScript;
  html = htmlWithoutRealBackend.replace('</head>', () => backendLoaderScript + '\n  </head>');
  if (pageName === 'emy-admin-backend.html') html = patchAdminCloudConsole(html);
  fs.writeFileSync(outputPath, html, 'utf8');
  const entry = manifest.find((item) => item.page === pageName);
  if (entry) entry.bytes = Buffer.byteLength(html);
}

for (const pageName of centralEngagementPages) {
  const outputPath = path.join(outDir, pageName);
  if (!fs.existsSync(outputPath)) continue;
  let html = fs.readFileSync(outputPath, 'utf8');
  if (!html.includes('</body>')) continue;
  html = stripSharedStyle(stripSharedScript(html, 'data-emy-product-mascot-like-sync'), 'data-emy-product-mascot-like-style');
  html = stripSharedStyle(stripSharedScript(html, 'data-emy-post-profile-circle-removal'), 'data-emy-post-profile-circle-removal-style');
  html = stripSharedStyle(stripSharedScript(html, 'data-emy-business-like-sync'), 'data-emy-business-like-style');
  html = stripSharedScript(html, 'data-emy-social-engagement-disabled');
  html = stripSharedScript(html, 'data-emy-central-engagement');
  html = html.replace('</head>', () => ASSETS.sharedPostProfileCircleRemovalStyle + '\n  </head>');
  html = html.replace('</body>', () => ASSETS.sharedCentralEngagementScript + '\n' + ASSETS.sharedBusinessLikeSyncScript + '\n' + ASSETS.sharedProductMascotLikeScript + '\n' + ASSETS.sharedPostProfileCircleRemovalScript + '\n' + ASSETS.sharedSocialEngagementDisabledScript + '\n  </body>');
  fs.writeFileSync(outputPath, html, 'utf8');
  const entry = manifest.find((item) => item.page === pageName);
  if (entry) entry.bytes = Buffer.byteLength(html);
}

{
  const outputPath = path.join(outDir, 'emy-customer-home.html');
  if (fs.existsSync(outputPath)) {
    const html = deferCustomerHomeLateEnhancers(finaliseCustomerHomeGeneratedHtml(fs.readFileSync(outputPath, 'utf8')));
    fs.writeFileSync(outputPath, html, 'utf8');
    const entry = manifest.find((item) => item.page === 'emy-customer-home.html');
    if (entry) entry.bytes = Buffer.byteLength(html);
  }
}

{
  const outputPath = path.join(outDir, 'emy-customer-feeds.html');
  const html = customerFeedsRedirectHtml();
  fs.writeFileSync(outputPath, html, 'utf8');
  const entry = manifest.find((item) => item.page === 'emy-customer-feeds.html');
  if (entry) entry.bytes = Buffer.byteLength(html);
}

{
  const centralAssetSourcePath = path.join(process.cwd(), 'src', 'generator', 'asset-sources', 'emy-central-storage.js');
  const bridgeAssetSourcePath = path.join(process.cwd(), 'src', 'generator', 'asset-sources', 'emy-shared-port-content.js');
  let centralTag = '';
  if (fs.existsSync(centralAssetSourcePath)) {
    const centralRuntime = fs.readFileSync(centralAssetSourcePath, 'utf8');
    const centralHash = require('crypto').createHash('sha256').update(centralRuntime).digest('hex').slice(0, 12);
    fs.writeFileSync(path.join(outDir, 'emy-central-storage.js'), centralRuntime, 'utf8');
    centralTag = '    <script defer src="emy-central-storage.js?v=' + centralHash + '" data-emy-central-storage></script>';
  }
  const bridgeFallbackPath = path.join(outDir, 'emy-shared-port-content.js');
  const bridgeSourcePath = fs.existsSync(bridgeAssetSourcePath) ? bridgeAssetSourcePath : bridgeFallbackPath;
  let bridgeHash = 'local';
  if (fs.existsSync(bridgeSourcePath)) {
    const bridgeRuntime = fs.readFileSync(bridgeSourcePath, 'utf8');
    bridgeHash = require('crypto').createHash('sha256').update(bridgeRuntime).digest('hex').slice(0, 12);
    fs.writeFileSync(path.join(outDir, 'emy-shared-port-content.js'), bridgeRuntime, 'utf8');
  }
  const bridgeTag = '    <script defer src="emy-shared-port-content.js?v=' + bridgeHash + '" data-emy-shared-port-content></script>';
  for (const pageName of sharedPortContentPages) {
    const outputPath = path.join(outDir, pageName);
    if (!fs.existsSync(outputPath)) continue;
    let html = fs.readFileSync(outputPath, 'utf8');
    if (!html.includes('</body>')) continue;
    html = html.replace(/\n?\s*<script(?:\s+defer)? src="emy-central-storage\.js(?:\?v=[^"]+)?" data-emy-central-storage><\/script>/g, '');
    html = html.replace(/\n?\s*<script(?:\s+defer)? src="emy-shared-port-content\.js(?:\?v=[^"]+)?" data-emy-shared-port-content><\/script>/g, '');
    const sharedStorageTags = [centralTag, bridgeTag].filter(Boolean).join('\n');
    if (html.includes('</head>')) html = html.replace('</head>', () => sharedStorageTags + '\n  </head>');
    else html = html.replace('</body>', () => sharedStorageTags + '\n  </body>');
    fs.writeFileSync(outputPath, html, 'utf8');
    const entry = manifest.find((item) => item.page === pageName);
    if (entry) entry.bytes = Buffer.byteLength(html);
  }
}

{
  const outputPath = path.join(outDir, 'emy-customer-home.html');
  if (fs.existsSync(outputPath)) {
    let html = fs.readFileSync(outputPath, 'utf8');
    const guardPattern = /\n?\s*<script defer src="assets\/emy-real-data-guard\.js[^"]*" data-emy-real-data-guard><\/script>/;
    const centralPattern = /\n?\s*<script(?:\s+defer)? src="emy-central-storage\.js(?:\?v=[^"]+)?" data-emy-central-storage><\/script>/;
    const bridgePattern = /\n?\s*<script(?:\s+defer)? src="emy-shared-port-content\.js(?:\?v=[^"]+)?" data-emy-shared-port-content><\/script>/;
    const guardMatch = html.match(guardPattern);
    const centralMatch = html.match(centralPattern);
    const bridgeMatch = html.match(bridgePattern);
    if (guardMatch || centralMatch || bridgeMatch) {
      const guardTag = guardMatch ? guardMatch[0].trim() : '';
      const centralTag = centralMatch ? centralMatch[0].trim() : '';
      const bridgeTag = bridgeMatch ? bridgeMatch[0].trim() : '';
      html = html.replace(guardPattern, '').replace(centralPattern, '').replace(bridgePattern, '');
      const runtimePattern = /(\s*<script defer src="assets\/emy-customer-home-page\.js[^"]*" data-emy-page-runtime><\/script>)/;
      const earlyTags = [centralTag, bridgeTag, guardTag].filter(Boolean).join('\n');
      const nextHtml = html.replace(runtimePattern, (match) => '\n' + earlyTags + match);
      html = nextHtml !== html
        ? nextHtml
        : html.replace('</head>', () => earlyTags + '\n  </head>');
      fs.writeFileSync(outputPath, html, 'utf8');
      const entry = manifest.find((item) => item.page === 'emy-customer-home.html');
      if (entry) entry.bytes = Buffer.byteLength(html);
    }
  }
}

for (const obsoletePage of ['login.html', 'signup.html']) {
  const obsoletePath = path.join(outDir, obsoletePage);
  if (fs.existsSync(obsoletePath)) fs.unlinkSync(obsoletePath);
}

fs.writeFileSync(path.join(outDir, 'auth-config.js'), `window.EMY_AUTH_CONFIG = {
  googleClientId: "",
  facebookAppId: "",
  redirectUri: ""
};
window.EMY_REAL_BACKEND_CONFIG = {
  firebase: {
    apiKey: "AIzaSyB9bbSz9qCWFz4r8iD8RPBQn2hHAlI4aK4",
    authDomain: "my-emy-db032.firebaseapp.com",
    projectId: "my-emy-db032",
    storageBucket: "my-emy-db032.firebasestorage.app",
    messagingSenderId: "351472903488",
    appId: "1:351472903488:web:93862ed87fe5714d7646a5",
    measurementId: "G-7F5BP1MT2R"
  },
  adminEmail: "i.stephane@my-emy.com",
  cloudinary: {
    cloudName: "dupytlsjv",
    uploadPreset: "emy_unsigned_upload"
  }
};
`, 'utf8');

fs.writeFileSync(path.join(outDir, 'emy-account-runtime.js'), emyRealBackendRuntimeScript + '\n', 'utf8');
const oldRealBackendRuntimePath = path.join(outDir, 'emy-real-backend.js');
if (fs.existsSync(oldRealBackendRuntimePath)) fs.unlinkSync(oldRealBackendRuntimePath);

fs.writeFileSync(path.join(outDir, 'emy-testing.html'), emyTestingLauncherHtml(), 'utf8');

const readmeText = [
  "Open index.html to start.",
  "Open emy-testing.html from http://127.0.0.1:8001/restore-may20/emy-testing.html for the isolated testing lane with separate browser storage and customer test reset controls.",
  "The navbar and footer links connect to about.html, business.html, ask-emy.html, about-ask-emy.html, contact.html, faqs.html, privacy.html, terms.html, emy-signin.html, emy-signup.html, emy-forgot-password.html, emy-confirmation.html, emy-business-profile.html, emy-customer-home.html, emy-customer-search.html, emy-customer-feeds.html, emy-customer-profile.html, and emy-notification-settings.html.",
  "Ask EMY search submits to ask-emy-results.html after Sign In or Sign Up.",
  "About Ask EMY opens about-ask-emy.html and explains Ask EMY as EMY's AI project assistant for chat-based customer support and discovery.",
  "On the main EMY marketing pages, Sign In and Sign up open app-style Customer/Business role selection screens with matching wording.",
  "Main EMY Sign In role choices redirect to emy-signin.html?role=customer or emy-signin.html?role=business; customer sign-in opens emy-customer-home.html.",
  "The customer home search icon opens emy-customer-search.html with Products, Business, Posts, Clips, and My Businesses search tabs plus tab-specific filters.",
  "The customer Feeds bottom-nav item opens the in-page Feeds view at emy-customer-feeds.html so the customer shell stays continuous while showing updates from nearby businesses and My Businesses.",
  "Forgot Password opens emy-forgot-password.html with the same role and optional typed email.",
  "Main EMY Sign up role choices redirect to emy-signup.html?role=customer or emy-signup.html?role=business, then successful form validation redirects to emy-confirmation.html with the selected role and stored email.",
  "Customer confirmation redirects to emy-customer-home.html after the four-digit code is entered.",
  "Business confirmation redirects to emy-business-profile.html after the four-digit code is entered.",
  "The business profile page supports cover images and videos with one selected media item displayed in the cover area while the rest stay as thumbnails.",
  "Completing the business profile opens a review message explaining approval can take a few hours while EMY verifies details, then links to emy-customer-home.html.",
  "The private admin backend is not linked from customer or business shells, and the local preview server blocks direct access unless the owner starts it with EMY_ALLOW_ADMIN_BACKEND=1.",
  "The customer home notification gear opens emy-notification-settings.html for EMY-specific notification preferences about nearby businesses, products, offers, saved searches, messages, business review, and account activity.",
  "The customer profile page opens as its own page with the shared customer header, profile photo controls, saved locations, and bottom navigation.",
  "The Ask EMY Create account on EMY button redirects to index.html?emyAuth=signup so the main EMY role selection opens.",
  "Google/Facebook auth reads client IDs from auth-config.js and needs a backend OAuth callback to complete sign-in."
].join(" ");
fs.writeFileSync(path.join(outDir, 'README.txt'), readmeText + "\n", 'utf8');
console.log(JSON.stringify({ outDir, pages: manifest }, null, 2));

/* EMY generator section: 47-extract-page-inline-scripts.cjs
   Moves large page-specific inline scripts into cacheable deferred assets. */

const PAGE_SCRIPT_EXTRACTION = [
  'emy-customer-home.html',
  'emy-business-profile.html',
  'emy-customer-search.html',
  'emy-customer-profile.html',
  'emy-customer-chat.html',
  'ask-emy-results.html',
];

const INLINE_SCRIPT_KEEP_MAX = 4096;
const LARGE_INLINE_STYLE_KEEP_MAX = 16384;
const CUSTOMER_HOME_STARTUP_STYLE_ASSET = 'emy-customer-home-startup.css';
const BUSINESS_PROFILE_STARTUP_STYLE_ASSET = 'emy-business-profile-startup.css';
const BUSINESS_PROFILE_DEFERRED_RUNTIME_ASSET = 'emy-business-profile-deferred-runtime.js';
const CUSTOMER_HOME_FALLBACK_BUSINESS_CARD_LIMIT = 4;
const CUSTOMER_HOME_LITE_BUSINESS_LIKE_ICON = '<span class="emy-business-like-icon emy-business-like-icon-lite" aria-hidden="true"></span>';
const NON_CRITICAL_STYLE_ATTRS = [
  'data-emy-comment-composer-polish',
  'data-emy-comment-writing',
  'data-emy-feed-box-writing',
  'data-emy-product-clip-glass',
  'data-emy-clip-clean-media-overlays',
  'data-emy-home-clip-mascot-like',
  'data-emy-clip-mini-product-overlay',
  'data-emy-feeds-clip-sizing',
  'data-emy-responsive-hover-style',
  'data-emy-rail-selection-state-style',
  'data-emy-modal-close-controls',
  'data-emy-post-profile-circle-removal-style',
  'data-emy-business-video-popup-controls',
  'data-emy-business-like-style',
  'data-emy-product-mascot-like-style',
];
const LATE_SUPPORT_SCRIPT_ATTRS = [
];
const BUSINESS_PROFILE_LATE_SCRIPT_ATTRS = [
  'data-emy-comment-replies',
  'data-emy-more-options-cleaner',
  'data-emy-home-clip-mascot-like',
  'data-emy-business-clip-product-mini-restore',
  'data-emy-rail-selection-state',
  'data-emy-clip-hover-preview',
  'data-emy-clip-scroll-restart',
  'data-emy-modal-close-guard',
  'data-emy-account-session-nav',
  'data-emy-emoji-picker',
  'data-emy-video-controls-enhancer',
  'data-emy-event-system',
  'data-emy-real-data-guard',
  'data-emy-notification-router',
  'data-emy-business-like-sync',
  'data-emy-product-mascot-like-sync',
  'data-emy-post-profile-circle-removal',
];
const BUSINESS_PROFILE_DEFERRED_RUNTIME_MARKERS = [
  '(function setupEmyMediaEditorRuntime()',
  '(function setupEmyFeedCarouselRuntime()',
  '(function setupEmyFeedEditSheetRuntime()',
];

if (typeof require === 'function') {
  if (typeof fs === 'undefined') globalThis.fs = require('fs');
  if (typeof path === 'undefined') globalThis.path = require('path');
  if (typeof outDir === 'undefined') globalThis.outDir = globalThis.path.join(process.cwd(), 'linked-pages', 'restore-may20');
  if (typeof assetsDir === 'undefined') globalThis.assetsDir = globalThis.path.join(globalThis.outDir, 'assets');
  if (typeof manifest === 'undefined') globalThis.manifest = [];
}

function pageExtractionFilter() {
  if (typeof process === 'undefined') return null;
  const args = Array.isArray(process.argv) ? process.argv.slice(2) : [];
  const raw = args.length ? args.join(',') : process.env.EMY_EXTRACT_PAGES || '';
  const pages = String(raw || '')
    .split(',')
    .map((page) => page.trim())
    .filter(Boolean)
    .map((page) => page.replace(/\\/g, '/').split('/').pop());
  return pages.length ? new Set(pages) : null;
}

const EXTRACT_ONLY_PAGES = pageExtractionFilter();

function shouldExtractPage(pageName) {
  return !EXTRACT_ONLY_PAGES || EXTRACT_ONLY_PAGES.has(pageName);
}

function escapeRegExp(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function shouldKeepInlineScript(attrs, body) {
  const marker = String(attrs || '') + String(body || '').slice(0, 200);
  if (body.length <= INLINE_SCRIPT_KEEP_MAX) return true;
  if (/data-emy-(home-boot-gate|home-route-restore|home-lazy-loader|page-boot-gate|real-backend)/i.test(marker)) return true;
  return false;
}

function generatorAssetSourcesDir() {
  return path.join(process.cwd(), 'src', 'generator', 'asset-sources');
}

function recordExtractedAsset(fileName) {
  const assetFile = String(fileName || '').trim();
  if (!assetFile) return;
  const manifestPaths = [
    path.join(assetsDir, 'asset-manifest.json'),
    path.join(generatorAssetSourcesDir(), 'asset-manifest.json'),
  ];
  manifestPaths.forEach((manifestPath) => {
    let data = { generatedAt: new Date().toISOString(), files: [] };
    try {
      if (fs.existsSync(manifestPath)) data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (error) {
      data = { generatedAt: new Date().toISOString(), files: [] };
    }
    if (!Array.isArray(data.files)) data.files = [];
    if (data.files.includes(assetFile)) return;
    fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
    data.files.push(assetFile);
    fs.writeFileSync(manifestPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  });
}

function writeExtractedAsset(fileName, contents) {
  const body = String(contents || '');
  const finalBody = body.endsWith('\n') ? body : body + '\n';
  fs.writeFileSync(path.join(assetsDir, fileName), finalBody, 'utf8');
  const assetSourcesDir = generatorAssetSourcesDir();
  fs.mkdirSync(assetSourcesDir, { recursive: true });
  fs.writeFileSync(path.join(assetSourcesDir, fileName), finalBody, 'utf8');
  recordExtractedAsset(fileName);
  const assetHash = require('crypto').createHash('sha256').update(finalBody).digest('hex').slice(0, 12);
  return {
    assetUrl: `assets/${fileName}?v=${assetHash}`,
    assetBytes: Buffer.byteLength(finalBody),
  };
}

function splitBusinessProfileDeferredRuntime(source) {
  const text = String(source || '');
  const closeMarker = '\n        })();';
  const ranges = [];
  BUSINESS_PROFILE_DEFERRED_RUNTIME_MARKERS.forEach((marker) => {
    const markerIndex = text.indexOf(marker);
    if (markerIndex < 0) return;
    const lineStart = text.lastIndexOf('\n', markerIndex);
    const start = lineStart >= 0 ? lineStart + 1 : markerIndex;
    const closeStart = text.indexOf(closeMarker, markerIndex);
    if (closeStart < 0) return;
    ranges.push({ start, end: closeStart + closeMarker.length });
  });
  if (ranges.length !== BUSINESS_PROFILE_DEFERRED_RUNTIME_MARKERS.length) {
    return { main: text, deferred: '', split: false };
  }
  ranges.sort((a, b) => a.start - b.start);
  for (let index = 1; index < ranges.length; index += 1) {
    if (ranges[index].start < ranges[index - 1].end) return { main: text, deferred: '', split: false };
  }
  const deferred = ranges.map((range) => text.slice(range.start, range.end).trim()).join('\n\n');
  const mainParts = [];
  let cursor = 0;
  ranges.forEach((range) => {
    mainParts.push(text.slice(cursor, range.start));
    cursor = range.end;
  });
  mainParts.push(text.slice(cursor));
  const main = mainParts.join('').replace(/\n{4,}/g, '\n\n\n');
  return { main, deferred, split: !!deferred && main !== text };
}

function businessProfileDeferredRuntimeLoader(assetUrl) {
  return `    <script data-emy-business-profile-deferred-runtime-loader data-emy-business-profile-deferred-runtime-src="${assetUrl}">
      (() => {
        if (window.__emyBusinessProfileDeferredRuntimeLoaderReady) return;
        window.__emyBusinessProfileDeferredRuntimeLoaderReady = true;
        const current = document.currentScript;
        const src = current && current.getAttribute("data-emy-business-profile-deferred-runtime-src");
        let promise = null;
        function loadDeferredRuntime() {
          if (!src) return Promise.resolve(false);
          if (window.__emyBusinessProfileDeferredRuntimeLoaded) return Promise.resolve(true);
          if (promise) return promise;
          promise = new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.defer = true;
            script.setAttribute("data-emy-business-profile-deferred-runtime", "");
            script.onload = () => {
              window.__emyBusinessProfileDeferredRuntimeLoaded = true;
              try {
                if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(document);
                if (window.emySetupFeedMediaCarousels) window.emySetupFeedMediaCarousels(document);
              } catch (error) {}
              window.dispatchEvent(new CustomEvent("emy:business-profile-deferred-runtime-ready"));
              resolve(true);
            };
            script.onerror = () => {
              promise = null;
              resolve(false);
            };
            (document.head || document.body || document.documentElement).appendChild(script);
          });
          return promise;
        }
        function scheduleDeferredRuntime() {
          if (window.__emyBusinessProfileDeferredRuntimeLoaded || window.__emyBusinessProfileDeferredRuntimeScheduled) return;
          window.__emyBusinessProfileDeferredRuntimeScheduled = true;
          const start = () => {
            if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(loadDeferredRuntime, { timeout: 45000 });
            else window.setTimeout(loadDeferredRuntime, 30000);
          };
          window.setTimeout(start, 30000);
        }
        const urgentSelector = "[data-feed-carousel-prev],[data-feed-carousel-next],[data-feed-carousel-dot],[data-feed-edit-media],[data-feed-edit-change-media],[data-feed-edit-remove-media],[data-business-product-media-edit],[data-adjust-cover],[data-media-edit]";
        document.addEventListener("pointerdown", (event) => {
          const target = event && event.target;
          if (target && target.closest && target.closest(urgentSelector)) loadDeferredRuntime();
        }, { capture: true, passive: true });
        window.__emyLoadBusinessProfileDeferredRuntimeNow = loadDeferredRuntime;
        if (window.__emyBusinessProfileRuntimeLoaded) scheduleDeferredRuntime();
        else window.addEventListener("emy:business-profile-runtime-ready", scheduleDeferredRuntime, { once: true });
        window.setTimeout(scheduleDeferredRuntime, 90000);
      })();
    </script>`;
}

function businessProfileLiteContentRenderer() {
  return `    <script data-emy-business-lite-content-renderer>
      (() => {
        if (window.__emyBusinessLiteContentRendererReady) return;
        window.__emyBusinessLiteContentRendererReady = true;
        const productKeys = ["emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyFeedCreatedProducts"];
        const postKeys = ["emyFeedCreatedPosts", "emyBusinessPosts", "emyBusinessFeedPosts", "emyBusinessArticles", "emyBusinessArticlePosts"];
        const clipKeys = ["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"];
        const liteKeys = productKeys.concat(postKeys, clipKeys);
        let remoteLitePullStarted = false;
        const esc = (value) => String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
        const clean = (value, fallback = "") => String(value == null ? "" : value).replace(/\\s+/g, " ").trim() || fallback;
        function readArray(key) {
          try {
            const parsed = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(parsed) ? parsed : [];
          } catch (error) {
            return [];
          }
        }
        function readObject(key) {
          try {
            const parsed = JSON.parse(localStorage.getItem(key) || "{}");
            return parsed && typeof parsed === "object" ? parsed : {};
          } catch (error) {
            return {};
          }
        }
        function newestTime(item) {
          const value = item && (item.updatedAt || item.createdAt || item.savedAt || item.postedAt || item.timestamp || item.date);
          const time = Date.parse(value || "");
          return Number.isFinite(time) ? time : 0;
        }
        function allRows(keys) {
          const rows = [];
          keys.forEach((key) => readArray(key).forEach((item, index) => {
            if (item && typeof item === "object") rows.push(Object.assign({ _sourceKey:key, _sourceIndex:index }, item));
          }));
          return rows;
        }
        function hasAnyRows(keys) {
          return keys.some((key) => readArray(key).length > 0);
        }
        function writeRemoteLiteRows(shared) {
          if (!shared || typeof shared !== "object") return false;
          let changed = false;
          liteKeys.forEach((key) => {
            const value = shared[key];
            if (!Array.isArray(value) || !value.length) return;
            try {
              const next = JSON.stringify(value);
              if (localStorage.getItem(key) !== next) {
                localStorage.setItem(key, next);
                changed = true;
              }
            } catch (error) {}
          });
          return changed;
        }
        function pullSharedLiteContent() {
          if (remoteLitePullStarted || !/^(127\\.0\\.0\\.1|localhost)$/i.test(window.location.hostname || "")) return;
          remoteLitePullStarted = true;
          const keys = liteKeys.map(encodeURIComponent).join(",");
          fetch("/api/emy-shared-content?keys=" + keys)
            .then((response) => response && response.ok ? response.json() : null)
            .then((payload) => {
              const shared = payload && payload.data && typeof payload.data === "object" ? payload.data : null;
              if (writeRemoteLiteRows(shared)) renderLiteContent();
            })
            .catch(() => {});
        }
        function dedupe(rows) {
          const seen = new Set();
          return rows.filter((item) => {
            const id = clean(item.id || item.productId || item.clipId || item.postId || item.title || item.name || item.text || item.description);
            if (!id) return false;
            const key = id.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          }).sort((a, b) => newestTime(b) - newestTime(a));
        }
        function mediaOf(item) {
          const first = Array.isArray(item && item.mediaItems) ? item.mediaItems.find((entry) => entry && (entry.src || entry.mediaSrc || entry.image || entry.video || entry.ref || entry.mediaRef || entry.imageRef || entry.videoRef)) : null;
          const ref = clean((first && (first.ref || first.mediaRef || first.imageRef || first.videoRef)) || item.mediaRef || item.imageRef || item.videoRef || item.photoRef || item.coverRef || item.thumbnailRef);
          const src = ref ? "" : clean((first && (first.src || first.mediaSrc || first.image || first.video || first.url || first.thumbnailSrc)) || item.mediaSrc || item.imageSrc || item.videoSrc || item.photo || item.photoSrc || item.image || item.video || item.coverSrc || item.thumbnail || item.thumbnailSrc);
          const type = /video|clip|reel/i.test(clean((first && (first.type || first.mediaType)) || item.mediaType || item.type || item.postMode || item.tag)) || /\\.(mp4|webm|mov)(\\?|$)/i.test(src) ? "video" : "image";
          return { src, ref, type };
        }
        function profileName() {
          const profile = Object.assign({}, readObject("emyBusinessProfileDraft"), readObject("emyBusinessProfile"), readObject("emyCurrentBusinessProfile"));
          return clean(profile.businessName || profile.name || localStorage.getItem("emyBusinessName"), "Your Business");
        }
        function priceText(item) {
          const raw = item && (item.priceText || item.displayPrice || item.priceLabel || item.price);
          if (raw === 0 || raw) {
            const text = clean(raw);
            if (/^[0-9]+(?:\\.[0-9]{1,2})?$/.test(text)) return "£" + Number(text).toFixed(2);
            return text;
          }
          return "Price to confirm";
        }
        function mediaHtml(media, title, className) {
          if (!media || (!media.src && !media.ref)) return '<div class="' + className + ' photo"><span>' + esc(title || "Media") + '</span></div>';
          const attrs = (media.src ? ' src="' + esc(media.src) + '"' : '') + (media.ref ? ' data-emy-media-ref="' + esc(media.ref) + '"' : '');
          const node = media.type === "video" ? '<video' + attrs + ' muted playsinline preload="none"></video>' : '<img' + attrs + ' alt="' + esc(title || "") + '" loading="lazy" decoding="async" />';
          return '<div class="' + className + ' photo" data-business-posted-media data-media-type="' + esc(media.type) + '">' + node + '</div>';
        }
        function productCard(item) {
          const id = clean(item.id || item.productId || item.title || item.name || ("lite-product-" + item._sourceIndex));
          const title = clean(item.title || item.name || item.productName || item.itemTitle, "Product");
          const description = clean(item.description || item.text || item.productInfo || item.summary, "Product available locally.");
          const category = clean(item.category || item.productCategory || item.type, "Product");
          const availability = clean(item.availability || item.status || item.stockStatus, "In stock");
          const media = mediaOf(item);
          return '<article class="business-live-product-card product-card is-lite-rendered" data-card data-open-item-detail data-business-product-id="' + esc(id) + '" data-feed-id="' + esc(id) + '" data-detail-kind="Product" data-detail-title="' + esc(title) + '" data-detail-description="' + esc(description) + '" data-detail-business="' + esc(profileName()) + '" data-detail-price="' + esc(priceText(item)) + '" data-detail-media-src="' + esc(media.src) + '" data-detail-media-ref="' + esc(media.ref) + '" data-detail-media-type="' + esc(media.type) + '" data-detail-meta="' + esc([availability, category].filter(Boolean).join("|")) + '">' +
            mediaHtml(media, title, "business-live-product-media") +
            '<span class="business-live-product-status">' + esc(availability) + '</span>' +
            '<div class="business-live-product-copy"><h3>' + esc(title) + '</h3><p>' + esc(description) + '</p><div class="business-live-product-meta"><span>' + esc(category) + '</span><span>Saved</span></div><strong class="business-live-product-price">' + esc(priceText(item)) + '</strong></div>' +
          '</article>';
        }
        function isClip(item) {
          const text = [item && item._sourceKey, item && item.kind, item && item.type, item && item.postMode, item && item.tag, item && item.mediaType, item && item.clipTitle].map(clean).join(" ").toLowerCase();
          return /clip|reel/.test(text);
        }
        function postTitle(item, fallback) {
          return clean(item && (item.title || item.clipTitle || item.productTitle || item.jobTitle || item.eventTitle), fallback);
        }
        function postCard(item, kind) {
          const id = clean(item.id || item.postId || item.clipId || item.title || item.text || ("lite-" + kind + "-" + item._sourceIndex));
          const title = postTitle(item, kind === "clip" ? "Business clip" : "Post");
          const description = clean(item.description || item.text || item.caption || item.productDescription || title, title);
          const media = mediaOf(item);
          return '<article class="feed-card social-feed-card is-user-post is-lite-rendered is-' + esc(kind) + '" data-card data-open-item-detail data-feed-id="' + esc(id) + '" data-detail-kind="' + esc(kind === "clip" ? "Clip" : "Post") + '" data-detail-title="' + esc(title) + '" data-detail-description="' + esc(description) + '" data-detail-business="' + esc(profileName()) + '" data-detail-media-src="' + esc(media.src) + '" data-detail-media-ref="' + esc(media.ref) + '" data-detail-media-type="' + esc(media.type) + '">' +
            '<div class="social-feed-head"><span class="social-feed-avatar emy-avatar-shape-applied"><span>' + esc(profileName().charAt(0).toUpperCase() || "B") + '</span></span><span class="social-feed-name"><strong>' + esc(profileName()) + '</strong><small>Saved · ' + esc(kind === "clip" ? "Clip" : "Post") + '</small></span></div>' +
            mediaHtml(media, title, "social-feed-media business-posted-media") +
            '<p class="social-feed-caption">' + esc(description) + '</p>' +
            '<div class="social-feed-body social-feed-body-counted"><span class="social-feed-time">Saved</span></div>' +
          '</article>';
        }
        function paintList(selector, emptySelector, rows, renderer, limit) {
          const list = document.querySelector(selector);
          if (!list || list.dataset.emyLiteRendered === "true") return;
          const visible = rows.slice(0, limit || 8);
          if (!visible.length) return;
          list.innerHTML = visible.map(renderer).join("");
          list.dataset.emyLiteRendered = "true";
          const empty = document.querySelector(emptySelector);
          if (empty) empty.hidden = true;
        }
        function renderLiteContent() {
          const products = dedupe(allRows(productKeys).filter((item) => !/deleted|removed/i.test(clean(item.status || item.publishStatus))));
          const feedRows = dedupe(allRows(postKeys));
          const clips = dedupe(allRows(clipKeys).concat(feedRows.filter(isClip)));
          const posts = feedRows.filter((item) => !isClip(item));
          paintList("[data-business-products-list]", "[data-business-products-empty]", products, productCard, 12);
          const count = document.querySelector("[data-business-products-count]");
          if (count && products.length) count.textContent = String(products.length);
          paintList("[data-business-posted-posts-list]", "[data-business-posted-posts-empty]", posts, (item) => postCard(item, "post"), 8);
          paintList("[data-business-posted-clips-list]", "[data-business-posted-clips-empty]", clips, (item) => postCard(item, "clip"), 8);
          document.documentElement.classList.toggle("emy-business-lite-content-ready", !!(products.length || posts.length || clips.length));
        }
        function startLiteContent() {
          renderLiteContent();
          if (!hasAnyRows(liteKeys)) pullSharedLiteContent();
          else window.setTimeout(pullSharedLiteContent, 200);
        }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", startLiteContent, { once: true });
        else startLiteContent();
        window.addEventListener("storage", (event) => {
          if (!event || liteKeys.includes(event.key)) renderLiteContent();
        });
      })();
    </script>`;
}

function businessProfileRuntimeLoader(assetUrl) {
  return `    <script data-emy-page-runtime-loader data-emy-page-runtime-src="${assetUrl}">
      (() => {
        if (window.__emyBusinessProfileRuntimeScheduled) return;
        window.__emyBusinessProfileRuntimeScheduled = true;
        const current = document.currentScript;
        const src = current && current.getAttribute("data-emy-page-runtime-src");
        let runtimeLoadingPromise = null;
        let lastRuntimeWakeActivityAt = Date.now();
        function markRuntimeWakeActivity() {
          lastRuntimeWakeActivityAt = Date.now();
        }
        ["pointerdown", "click", "keydown", "wheel", "touchstart"].forEach((eventName) => {
          document.addEventListener(eventName, markRuntimeWakeActivity, { capture: true, passive: true });
        });
        function normaliseMode(mode) {
          const value = String(mode || "").trim().toLowerCase();
          if (!value || value === "business" || value === "home") return "dashboard";
          if (["dashboard", "statistics", "services", "chat", "customers", "upload", "profile"].includes(value)) return value;
          return "";
        }
        function navToMode(nav) {
          const value = String(nav || "").trim().toLowerCase();
          if (value === "home") return "dashboard";
          return normaliseMode(value);
        }
        function modeToNav(mode) {
          const value = normaliseMode(mode);
          if (value === "dashboard" || value === "statistics") return "home";
          return value || "home";
        }
        function setHidden(selector, hidden) {
          const node = document.querySelector(selector);
          if (node) node.hidden = !!hidden;
        }
        function applyShellMode(mode) {
          const shellMode = normaliseMode(mode);
          if (!shellMode) return false;
          setHidden("[data-business-dashboard]", shellMode !== "dashboard");
          setHidden("[data-business-statistics-view]", shellMode !== "statistics");
          setHidden("[data-business-services-view]", shellMode !== "services");
          setHidden("[data-business-chat-view]", shellMode !== "chat");
          setHidden("[data-business-customers-view]", shellMode !== "customers");
          setHidden("[data-business-upload-view]", shellMode !== "upload");
          setHidden("[data-business-profile-view]", shellMode !== "profile");
          setHidden("[data-public-business]", true);
          document.querySelectorAll("[data-public-customer-shell]").forEach((node) => { node.hidden = true; });
          const bottomNav = document.querySelector("[data-business-bottom-nav]");
          if (bottomNav) bottomNav.hidden = false;
          const navMode = modeToNav(shellMode);
          document.querySelectorAll("[data-business-nav]").forEach((item) => {
            item.classList.toggle("is-active", item.dataset.businessNav === navMode);
          });
          window.__EMY_PENDING_BUSINESS_MODE__ = shellMode;
          window.__EMY_PENDING_BUSINESS_NAV__ = navMode;
          document.documentElement.classList.add("emy-business-shell-ready", "emy-page-shell-ready");
          if (document.body) {
            document.body.dataset.businessShellMode = shellMode;
            document.body.removeAttribute("aria-busy");
          }
          return true;
        }
        function readInitialMode() {
          try {
            const params = new URLSearchParams(window.location.search || "");
            const view = String(params.get("view") || "").toLowerCase();
            if (params.has("business") || view === "customer" || params.get("setup") === "1") return "";
            return normaliseMode(params.get("mode") || "business");
          } catch (error) {
            return "dashboard";
          }
        }
        function syncShellUrl(nav) {
          try {
            const mode = nav === "home" ? "business" : nav;
            history.replaceState(null, "", "emy-business-profile.html?mode=" + encodeURIComponent(mode));
          } catch (error) {}
        }
        function afterPaint(callback) {
          let called = false;
          const done = () => {
            if (called) return;
            called = true;
            callback();
          };
          window.setTimeout(done, 260);
          if (window.requestAnimationFrame) window.requestAnimationFrame(() => window.requestAnimationFrame(done));
          else window.setTimeout(done, 0);
        }
        function loadRuntime(reason) {
          if (!src) return Promise.resolve(false);
          if (window.__emyBusinessProfileRuntimeLoaded) return Promise.resolve(true);
          if (runtimeLoadingPromise) return runtimeLoadingPromise;
          window.__emyBusinessProfileRuntimeLoading = true;
          window.__EMY_BUSINESS_RUNTIME_WAKE_REASON__ = reason || "scheduled";
          runtimeLoadingPromise = new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.defer = true;
            try {
              const priority = reason === "interaction" ? "high" : "low";
              script.fetchPriority = priority;
              script.setAttribute("fetchpriority", priority);
            } catch (error) {}
            script.setAttribute("data-emy-page-runtime", "");
            script.onload = () => {
              window.__emyBusinessProfileRuntimeLoaded = true;
              window.__emyBusinessProfileRuntimeLoading = false;
              window.dispatchEvent(new CustomEvent("emy:business-profile-runtime-ready"));
              resolve(true);
            };
            script.onerror = () => {
              window.__emyBusinessProfileRuntimeLoading = false;
              runtimeLoadingPromise = null;
              document.documentElement.classList.add("emy-business-runtime-error");
              resolve(false);
            };
            document.head.appendChild(script);
          });
          return runtimeLoadingPromise;
        }
        function replayClick(trigger) {
          if (!trigger || !trigger.isConnected || window.__emyBusinessProfileWakeReplayingClick) return;
          window.__emyBusinessProfileWakeReplayingClick = true;
          try { trigger.click(); } catch (error) {}
          window.setTimeout(() => { window.__emyBusinessProfileWakeReplayingClick = false; }, 0);
        }
        function runtimeTriggerFromClick(event) {
          const target = event && event.target;
          if (!target || !target.closest) return null;
          if (target.closest("input,textarea,select,[contenteditable='true']")) return null;
          return target.closest("[data-business-product-new],[data-business-product-edit],[data-business-product-open],[data-business-product-stats],[data-business-product-select-mode],[data-business-product-bulk-live],[data-business-product-bulk-pause],[data-business-product-bulk-delete],[data-feed-create-open],[data-feed-create-choice],[data-business-profile-action],[data-business-chat-row],[data-business-chat-refresh],[data-business-upload-open],[data-business-upload-retry],[data-business-upload-dismiss],[data-public-customer-nav],[data-public-customer-shell] [data-nav],[data-business-top-search],[data-business-switch-customer]");
        }
        document.addEventListener("click", (event) => {
          if (window.__emyBusinessProfileRuntimeLoaded || window.__emyBusinessProfileWakeReplayingClick) return;
          const navButton = event.target && event.target.closest ? event.target.closest("[data-business-nav]") : null;
          if (navButton) {
            const nav = String(navButton.dataset.businessNav || "home").toLowerCase();
            if (nav === "ask") {
              window.location.href = "ask-emy.html";
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
            const mode = navToMode(nav);
            syncShellUrl(nav);
            applyShellMode(mode);
            return;
          }
          const trigger = runtimeTriggerFromClick(event);
          if (!trigger) return;
          event.preventDefault();
          event.stopPropagation();
          if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
          loadRuntime("interaction").then(() => {
            const run = () => replayClick(trigger);
            if (window.requestAnimationFrame) window.requestAnimationFrame(run);
            else window.setTimeout(run, 0);
          });
        }, true);
        function scheduleRuntime() {
          const initialMode = readInitialMode();
          if (initialMode) applyShellMode(initialMode);
          afterPaint(() => window.setTimeout(() => {
            if (window.__emyBusinessProfileRuntimeLoaded || window.__emyBusinessProfileRuntimeLoading) return;
            if (Date.now() - lastRuntimeWakeActivityAt < 45000) {
              window.setTimeout(() => {
                if (!window.__emyBusinessProfileRuntimeLoaded && !window.__emyBusinessProfileRuntimeLoading && Date.now() - lastRuntimeWakeActivityAt >= 45000) {
                  loadRuntime("idle");
                }
              }, 45000);
              return;
            }
            loadRuntime("idle");
          }, initialMode ? 180000 : 240000));
        }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleRuntime, { once: true });
        else scheduleRuntime();
        window.__emyLoadBusinessProfileRuntimeNow = loadRuntime;
      })();
    </script>`;
}

function extractLargeInlineScripts(html, assetFileName, pageName) {
  const source = String(html || '');
  const re = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
  const parts = [];
  const removals = [];
  let match;
  while ((match = re.exec(source)) !== null) {
    const attrs = match[1] || '';
    const body = match[2] || '';
    if (shouldKeepInlineScript(attrs, body)) continue;
    parts.push(body);
    removals.push(match[0]);
  }
  if (!parts.length) return { html: source, extracted: false, assetBytes: 0 };

  let next = source;
  removals.forEach((block) => {
    next = next.replace(block, '');
  });

  let combined = parts.join('\n\n');
  let deferredBusinessRuntimeBytes = 0;
  const mainAsset = writeExtractedAsset(assetFileName, combined);
  const assetUrl = mainAsset.assetUrl;
  const existingAssetUrl = new RegExp(`assets/${escapeRegExp(assetFileName)}(?:\\?v=[a-f0-9]+)?`, 'gi');
  next = next.replace(existingAssetUrl, assetUrl);
  const preload = `    <link rel="preload" href="${assetUrl}" as="script" />`;
  const scriptTag = pageName === 'emy-customer-home.html'
    ? `    <script data-emy-page-runtime-loader data-emy-page-runtime-src="${assetUrl}">
      (() => {
        if (window.__emyCustomerHomeRuntimeScheduled) return;
        window.__emyCustomerHomeRuntimeScheduled = true;
        const current = document.currentScript;
        const src = current && current.getAttribute("data-emy-page-runtime-src");
        let lastUserActivityAt = Date.now();
        const runtimeScheduledAt = Date.now();
        let runtimeLoadingPromise = null;
        function markUserActivity() {
          lastUserActivityAt = Date.now();
        }
        ["pointerdown", "pointermove", "click", "keydown", "wheel", "touchstart"].forEach((eventName) => {
          document.addEventListener(eventName, markUserActivity, { capture: true, passive: true });
        });
        function initialView() {
          const views = ["feeds", "reels", "uploads"];
          const hash = String(window.location.hash || "").replace("#", "").trim().toLowerCase();
          if (views.indexOf(hash) >= 0) return hash;
          try {
            const tab = String(new URLSearchParams(window.location.search || "").get("tab") || "").replace(/^#/, "").trim().toLowerCase();
            if (views.indexOf(tab) >= 0) return tab;
          } catch (error) {}
          return "";
        }
        function afterPaint(callback) {
          let called = false;
          const done = () => {
            if (called) return;
            called = true;
            callback();
          };
          window.setTimeout(done, 240);
          if (window.requestAnimationFrame) window.requestAnimationFrame(() => window.requestAnimationFrame(done));
          else window.setTimeout(done, 0);
        }
        function sharedContentReady() {
          if (window.__emyHomeLateSupportPending) return false;
          if (document.querySelector("script[data-emy-home-late-src][data-emy-shared-port-content]") && !window.__emySharedPortContentInstalled) return false;
          return !window.__emySharedPortContentInstalled || window.__emySharedPortContentInitialSyncDone === true || window.__emySharedPortContentReady === true;
        }
        function waitForSharedContentReady() {
          if (sharedContentReady()) return Promise.resolve(true);
          return new Promise((resolve) => {
            let done = false;
            const finish = () => {
              if (done) return;
              done = true;
              window.removeEventListener("emy:shared-port-content-ready", finish);
              resolve(true);
            };
            window.addEventListener("emy:shared-port-content-ready", finish, { once: true });
            window.setTimeout(finish, 900);
            try {
              const lateSupport = typeof window.__emyLoadHomeLateSupportNow === "function" ? window.__emyLoadHomeLateSupportNow() : null;
              if (lateSupport && typeof lateSupport.then === "function") lateSupport.then(finish).catch(finish);
            } catch (error) {}
            try {
              if (typeof window.emySyncSharedPortContentNow === "function") window.emySyncSharedPortContentNow("runtime-wait");
            } catch (error) {}
          });
        }
        function loadRuntime() {
          if (!src) return Promise.resolve(false);
          if (window.__emyCustomerHomeRuntimeLoaded) return Promise.resolve(true);
          if (runtimeLoadingPromise) return runtimeLoadingPromise;
          if (!sharedContentReady()) {
            window.__emyCustomerHomeRuntimeSharedSyncPending = true;
            return waitForSharedContentReady().then(() => {
              window.__emyCustomerHomeRuntimeSharedSyncPending = false;
              return loadRuntime();
            });
          }
          window.__emyCustomerHomeRuntimeLoading = true;
          runtimeLoadingPromise = new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.defer = true;
            script.setAttribute("data-emy-page-runtime", "");
            script.onload = () => {
              window.__emyCustomerHomeRuntimeLoaded = true;
              window.__emyCustomerHomeRuntimeLoading = false;
              resolve(true);
            };
            script.onerror = () => {
              window.__emyCustomerHomeRuntimeLoading = false;
              runtimeLoadingPromise = null;
              document.documentElement.classList.add("emy-home-runtime-error");
              resolve(false);
            };
            document.head.appendChild(script);
          });
          return runtimeLoadingPromise;
        }
        function createSurfaceActive() {
          const hasOpenCreateSurface = !!document.querySelector(
            ".feed-create-modal[aria-hidden='false'],[data-feed-create-menu][aria-hidden='false'],[data-feed-compose-source-sheet][aria-hidden='false'],[data-feed-compose-camera-sheet][aria-hidden='false'],[data-item-detail-modal].is-open,.item-detail-modal.is-open,[data-clip-viewer-modal].is-open,.clip-viewer-modal.is-open"
          );
          if (hasOpenCreateSurface) return true;
          if (!window.__EMY_CUSTOMER_HOME_CREATE_ACTIVE__) return false;
          if (Date.now() - Number(window.__EMY_CUSTOMER_HOME_CREATE_ACTIVE_AT__ || 0) > 5000) {
            window.__EMY_CUSTOMER_HOME_CREATE_ACTIVE__ = false;
            return false;
          }
          return true;
        }
        function setShellLocationSheetOpen(isOpen) {
          const sheet = document.querySelector("[data-location-sheet]");
          if (!sheet) return false;
          sheet.classList.toggle("is-open", !!isOpen);
          sheet.setAttribute("aria-hidden", isOpen ? "false" : "true");
          if (isOpen) {
            window.__EMY_PENDING_LOCATION_SHEET_OPEN__ = true;
          } else {
            try { delete window.__EMY_PENDING_LOCATION_SHEET_OPEN__; } catch (error) { window.__EMY_PENDING_LOCATION_SHEET_OPEN__ = false; }
          }
          return true;
        }
        function setShellLocationFormOpen(isOpen) {
          const form = document.querySelector("[data-location-form]");
          const add = document.querySelector("[data-location-add]");
          if (!form) return false;
          setShellLocationSheetOpen(true);
          form.classList.toggle("is-open", !!isOpen);
          if (add) {
            add.textContent = isOpen ? "Close" : "Add +";
            add.setAttribute("aria-label", isOpen ? "Close location form" : "Add location");
          }
          return true;
        }
        function setShellCreateMenuOpen(isOpen) {
          const menu = document.querySelector("[data-feed-create-menu]");
          if (!menu) return false;
          menu.classList.toggle("is-open", !!isOpen);
          menu.setAttribute("aria-hidden", isOpen ? "false" : "true");
          window.__EMY_CUSTOMER_HOME_CREATE_ACTIVE__ = !!isOpen;
          window.__EMY_CUSTOMER_HOME_CREATE_ACTIVE_AT__ = Date.now();
          return true;
        }
        function applyShellRuntimeTrigger(trigger) {
          if (!trigger || !trigger.matches) return false;
          if (trigger.matches("[data-location]")) return setShellLocationSheetOpen(true);
          if (trigger.matches("[data-location-close]")) return setShellLocationSheetOpen(false);
          if (trigger.matches("[data-location-add]")) {
            const form = document.querySelector("[data-location-form]");
            return setShellLocationFormOpen(!(form && form.classList.contains("is-open")));
          }
          if (trigger.matches("[data-feed-create-open]")) return setShellCreateMenuOpen(true);
          if (trigger.matches("[data-feed-create-close]")) return setShellCreateMenuOpen(false);
          return false;
        }
        function activeSurfaceTriggerCanWake(trigger) {
          return !!(trigger && trigger.matches && trigger.matches("[data-feed-create-choice],[data-feed-compose-source],[data-feed-compose-source-close],[data-feed-compose-camera-close],[data-feed-compose-camera-cancel],[data-feed-compose-camera-capture],[data-feed-compose-camera-stop],[data-feed-post-cancel],[data-item-detail-close],[data-item-detail-save],[data-item-detail-done]"));
        }
        function shellFeedKindForCard(card) {
          const data = card && card.dataset || {};
          const text = [data.feedKind, data.detailKind, data.type, data.kind, data.searchText, card && card.className].join(" ").toLowerCase();
          if (/product/.test(text)) return "products";
          if (/clip|reel/.test(text)) return "clips";
          if (/job|hiring/.test(text)) return "jobs";
          if (/event/.test(text)) return "events";
          if (/article/.test(text)) return "articles";
          return "posts";
        }
        function shellFeedKindName(kind) {
          if (kind === "products") return "products";
          if (kind === "clips") return "clips";
          if (kind === "jobs") return "jobs";
          if (kind === "events") return "events";
          if (kind === "articles") return "articles";
          return "posts";
        }
        function applyShellFeedKindFilter(button) {
          const kind = String(button && button.dataset && button.dataset.feedKindFilter || "all").toLowerCase();
          const activeKind = ["all", "posts", "products", "clips", "events", "jobs", "articles"].indexOf(kind) >= 0 ? kind : "all";
          window.__EMY_PENDING_FEED_KIND_FILTER__ = activeKind;
          document.querySelectorAll("button.feed-kind-filter[data-feed-kind-filter]").forEach((item) => {
            const active = item.dataset.feedKindFilter === activeKind;
            item.classList.toggle("is-active", active);
            item.setAttribute("aria-pressed", active ? "true" : "false");
          });
          const feedList = document.querySelector("[data-annexed-feed-list]");
          const cards = feedList ? Array.from(feedList.querySelectorAll(":scope > [data-feed-id],:scope > [data-card],:scope > .product-card,:scope > .post-card,:scope > .reel-card,:scope > .social-feed-card,:scope > .home-flow-item")) : [];
          if (feedList && typeof window.emyApplyRealFeedFallbackFilter === "function" && window.emyApplyRealFeedFallbackFilter(activeKind)) {
            return;
          }
          let visible = 0;
          cards.forEach((card) => {
            const matches = activeKind === "all" || shellFeedKindForCard(card) === activeKind;
            card.hidden = !matches;
            card.setAttribute("aria-hidden", matches ? "false" : "true");
            if (matches) {
              delete card.dataset.feedKindHidden;
              visible += 1;
            } else {
              card.dataset.feedKindHidden = "true";
            }
          });
          if (feedList) {
            feedList.classList.toggle("is-product-grid", activeKind === "products");
            feedList.classList.toggle("is-clip-grid", activeKind === "clips");
          }
          const empty = document.querySelector("[data-feed-filter-empty]");
          if (empty) {
            empty.hidden = !(activeKind !== "all" && cards.length > 0 && visible === 0);
            if (!empty.hidden) empty.textContent = "No " + shellFeedKindName(activeKind) + " yet.";
          }
          const footer = document.querySelector("[data-annexed-feed-load-more]");
          if (footer) {
            const name = shellFeedKindName(activeKind);
            footer.hidden = false;
            footer.disabled = true;
            footer.dataset.feedLoadState = "end";
            footer.dataset.feedRemaining = "0";
            footer.textContent = "No more " + name;
            footer.setAttribute("aria-label", "No more " + name);
          }
        }
        function runtimeTriggerFromClick(event) {
          const target = event && event.target;
          if (!target || !target.closest) return null;
          if (target.closest("input,textarea,select,[contenteditable='true']")) return null;
          if (target.closest("a[data-switch-business][href]")) return null;
          return target.closest("[data-location],[data-location-add],[data-location-close],[data-use-current-location],[data-radius],[data-place-tab],[data-profile-photo-adjust],[data-profile-photo-change],[data-profile-photo-remove],[data-profile-photo-close],[data-profile-photo-close-x],[data-profile-photo-source],[data-profile-source-close],[data-profile-camera-cancel],[data-profile-camera-capture],[data-profile-crop-change],[data-profile-crop-cancel],[data-profile-crop-apply],[data-item-detail-options],[data-item-detail-close],[data-item-detail-save],[data-item-detail-done],[data-business-like],[data-feed-create-open],[data-feed-create-close],[data-feed-create-choice],[data-feed-open],[data-open-item-detail],[data-feed-compose-post],[data-feed-compose-image],[data-feed-compose-video],[data-feed-compose-remove],[data-feed-compose-source],[data-feed-compose-source-close],[data-feed-compose-camera-close],[data-feed-compose-camera-cancel],[data-feed-compose-camera-capture],[data-feed-compose-camera-stop],[data-feed-post-cancel],[data-view-all],[data-home-flow-load-more],[data-annexed-feed-load-more],[data-feed-kind-filter],[data-reel-tab],[data-business-view-all],[data-business-side],[data-business-prev],[data-business-next],[data-business-preview-tab],[data-business-preview-prev],[data-business-preview-next],[data-home-posted-posts-open],[data-home-posted-events-open],[data-home-posted-jobs-open],[data-home-posted-articles-open],[data-notification-settings],[data-nearby-gps],[data-nearby-route-go],[data-nearby-route-clear],[data-nearby-route-next]");
        }
        function shouldReplayRuntimeTrigger(trigger) {
          return !!(trigger && trigger.matches && trigger.matches("[data-location],[data-location-add],[data-location-close],[data-use-current-location],[data-radius],[data-place-tab],[data-profile-photo-adjust],[data-profile-photo-change],[data-profile-photo-remove],[data-profile-photo-close],[data-profile-photo-close-x],[data-profile-photo-source],[data-profile-source-close],[data-profile-camera-cancel],[data-profile-camera-capture],[data-profile-crop-change],[data-profile-crop-cancel],[data-profile-crop-apply],[data-item-detail-options],[data-item-detail-close],[data-item-detail-save],[data-item-detail-done],[data-business-like],[data-feed-create-open],[data-feed-create-close],[data-feed-create-choice],[data-feed-open],[data-open-item-detail],[data-feed-compose-post],[data-feed-compose-image],[data-feed-compose-video],[data-feed-compose-remove],[data-feed-compose-source],[data-feed-compose-source-close],[data-feed-compose-camera-close],[data-feed-compose-camera-cancel],[data-feed-compose-camera-capture],[data-feed-compose-camera-stop],[data-feed-post-cancel],[data-business-preview-tab],[data-business-preview-prev],[data-business-preview-next],[data-home-posted-posts-open],[data-home-posted-events-open],[data-home-posted-jobs-open],[data-home-posted-articles-open],[data-notification-settings],[data-nearby-gps],[data-nearby-route-go],[data-nearby-route-clear],[data-nearby-route-next]"));
        }
        function replayRuntimeTrigger(trigger) {
          if (!trigger || !trigger.isConnected || window.__emyCustomerHomeWakeReplayingClick) return;
          window.__emyCustomerHomeWakeReplayingClick = true;
          try {
            trigger.click();
          } catch (error) {}
          window.setTimeout(() => {
            window.__emyCustomerHomeWakeReplayingClick = false;
          }, 0);
        }
        document.addEventListener("click", (event) => {
          if (window.__emyCustomerHomeRuntimeLoaded || window.__emyCustomerHomeWakeReplayingClick) return;
          const trigger = runtimeTriggerFromClick(event);
          if (!trigger) return;
          if (trigger.matches && trigger.matches("button.feed-kind-filter[data-feed-kind-filter]")) {
            applyShellFeedKindFilter(trigger);
            return;
          }
          if (applyShellRuntimeTrigger(trigger)) {
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
            return;
          }
          if (createSurfaceActive() && !activeSurfaceTriggerCanWake(trigger)) return;
          if (shouldReplayRuntimeTrigger(trigger)) {
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
            loadRuntime().then(() => {
              const replay = () => replayRuntimeTrigger(trigger);
              if (window.requestAnimationFrame) window.requestAnimationFrame(replay);
              else window.setTimeout(replay, 0);
            });
            return;
          }
          window.__EMY_CUSTOMER_HOME_RUNTIME_WAKE_DEFERRED__ = true;
          window.__EMY_CUSTOMER_HOME_RUNTIME_WAKE_DEFERRED_AT__ = Date.now();
        }, true);
        function scheduleRuntime() {
          const view = initialView();
          const delay = view ? 6000 : 60000;
          const quietWindow = view ? 1600 : 4000;
          const hardDeadline = runtimeScheduledAt + (view ? 15000 : 120000);
          const waitForQuietRuntime = () => {
            const now = Date.now();
            if (view && createSurfaceActive()) {
              window.setTimeout(waitForQuietRuntime, 600);
              return;
            }
            if (now < hardDeadline && now - lastUserActivityAt < quietWindow) {
              window.setTimeout(waitForQuietRuntime, 1500);
              return;
            }
            loadRuntime();
          };
          afterPaint(() => window.setTimeout(waitForQuietRuntime, delay));
        }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleRuntime, { once: true });
        else scheduleRuntime();
        window.__emyLoadCustomerHomeRuntimeNow = loadRuntime;
      })();
    </script>`
    : `    <script defer src="${assetUrl}" data-emy-page-runtime></script>`;
  let pageScriptTag = scriptTag;
  if (pageName === 'emy-customer-home.html') {
    const centralPattern = /\n?\s*<script(?:\s+defer)? src="emy-central-storage\.js(?:\?v=[^"]+)?" data-emy-central-storage><\/script>/;
    const bridgePattern = /\n?\s*<script(?:\s+defer)? src="emy-shared-port-content\.js(?:\?v=[^"]+)?" data-emy-shared-port-content><\/script>/;
    const guardPattern = /\n?\s*<script defer src="assets\/emy-real-data-guard\.js[^"]*" data-emy-real-data-guard><\/script>/;
    const askMiniPattern = /\n?\s*<script defer src="assets\/emy-ask-mini\.js[^"]*" data-emy-ask-mini><\/script>/;
    const centralMatch = next.match(centralPattern);
    const bridgeMatch = next.match(bridgePattern);
    const guardMatch = next.match(guardPattern);
    const askMiniMatch = next.match(askMiniPattern);
    const lateSupportTag = (match, markerAttr) => {
      const tag = match && match[0] && match[0].trim();
      const src = tag ? (tag.match(/src="([^"]+)"/) || [])[1] : '';
      return src ? `    <script data-emy-home-late-src="${src}" ${markerAttr}></script>` : '';
    };
    const lateSupportPlaceholders = [
      lateSupportTag(centralMatch, 'data-emy-central-storage'),
      lateSupportTag(bridgeMatch, 'data-emy-shared-port-content'),
      lateSupportTag(guardMatch, 'data-emy-real-data-guard'),
    ].filter(Boolean).join('\n');
    const lateSupportLoader = lateSupportPlaceholders ? `
    <script data-emy-home-late-support-loader>
      (() => {
        if (window.__emyHomeLateSupportLoaderReady) return;
        window.__emyHomeLateSupportLoaderReady = true;
        let lateSupportPromise = null;
        function lateSupportHolders(includeRealDataGuard) {
          const selectors = [
            "script[data-emy-home-late-src][data-emy-central-storage]",
            "script[data-emy-home-late-src][data-emy-shared-port-content]"
          ];
          if (includeRealDataGuard) selectors.push("script[data-emy-home-late-src][data-emy-real-data-guard]");
          return selectors.map((selector) => document.querySelector(selector)).filter(Boolean);
        }
        function loadLateSupportScript(holder) {
          const src = holder && holder.getAttribute("data-emy-home-late-src");
          if (!src) return Promise.resolve(false);
          if (document.querySelector("script[src='" + src.replace(/'/g, "\\\\'") + "'][data-emy-home-late-loaded]")) return Promise.resolve(true);
          return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.defer = true;
            script.setAttribute("data-emy-home-late-loaded", "");
            if (holder.hasAttribute("data-emy-central-storage")) script.setAttribute("data-emy-central-storage-loaded", "");
            if (holder.hasAttribute("data-emy-shared-port-content")) script.setAttribute("data-emy-shared-port-content-loaded", "");
            if (holder.hasAttribute("data-emy-real-data-guard")) script.setAttribute("data-emy-real-data-guard-loaded", "");
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.head.appendChild(script);
          });
        }
        function loadLateSupport() {
          if (lateSupportPromise) return lateSupportPromise;
          window.__emyHomeLateSupportPending = true;
          lateSupportPromise = lateSupportHolders(false)
            .reduce((chain, holder) => chain.then(() => loadLateSupportScript(holder)), Promise.resolve(true))
            .then(() => {
              window.__emyHomeLateSupportPending = false;
              window.dispatchEvent(new CustomEvent("emy:home-late-support-ready"));
              lateSupportHolders(true)
                .filter((holder) => holder.hasAttribute("data-emy-real-data-guard"))
                .reduce((chain, holder) => chain.then(() => loadLateSupportScript(holder)), Promise.resolve(true))
                .then(() => window.dispatchEvent(new CustomEvent("emy:home-real-data-guard-ready")))
                .catch(() => {});
              return true;
            });
          return lateSupportPromise;
        }
        function scheduleLateSupport() {
          const start = () => {
            if (window.requestIdleCallback) window.requestIdleCallback(loadLateSupport, { timeout: 5000 });
            else window.setTimeout(loadLateSupport, 2200);
          };
          window.setTimeout(start, 8000);
        }
        window.__emyLoadHomeLateSupportNow = loadLateSupport;
        scheduleLateSupport();
      })();
    </script>` : '';
    const earlyTags = [
      askMiniMatch && askMiniMatch[0].trim(),
      lateSupportPlaceholders,
      lateSupportLoader,
    ].filter(Boolean);
    if (earlyTags.length) {
      next = next.replace(centralPattern, '').replace(bridgePattern, '').replace(guardPattern, '').replace(askMiniPattern, '');
      pageScriptTag = earlyTags.join('\n') + '\n' + scriptTag;
    }
  }
  if (!next.includes(`assets/${assetFileName}`)) {
    if (pageName === 'emy-customer-home.html') {
      const realBackendMarker = '    <!-- emy-real-backend:start -->';
      if (next.includes(realBackendMarker)) {
        next = next.replace(realBackendMarker, pageScriptTag + '\n' + realBackendMarker);
      } else if (next.includes('<!-- emy-real-backend:start -->')) {
        next = next.replace('<!-- emy-real-backend:start -->', pageScriptTag + '\n    <!-- emy-real-backend:start -->');
      } else if (next.includes('</head>')) {
        next = next.replace('</head>', pageScriptTag + '\n  </head>');
      } else if (next.includes('</body>')) {
        next = next.replace('</body>', pageScriptTag + '\n  </body>');
      }
    } else if (pageName === 'emy-business-profile.html') {
      if (next.includes('</body>')) next = next.replace('</body>', pageScriptTag + '\n  </body>');
      else if (next.includes('</head>')) next = next.replace('</head>', pageScriptTag + '\n  </head>');
    } else if (next.includes('</head>')) {
      next = next.replace('</head>', preload + '\n  </head>');
      if (next.includes('</body>')) next = next.replace('</body>', scriptTag + '\n  </body>');
    } else if (next.includes('</body>')) {
      next = next.replace('</body>', scriptTag + '\n  </body>');
    }
  }

  return { html: next, extracted: true, assetBytes: mainAsset.assetBytes + deferredBusinessRuntimeBytes };
}

function extractPageStartupStyles(html, assetFileName, markerAttr) {
  const source = String(html || '');
  if (source.includes(markerAttr)) {
    return { html: source, extracted: false, assetBytes: 0 };
  }

  const re = /<style\b([^>]*)>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = re.exec(source)) !== null) {
    const attrs = match[1] || '';
    const body = match[2] || '';
    if (Buffer.byteLength(body) <= LARGE_INLINE_STYLE_KEEP_MAX) continue;
    if (/\bdata-emy-/i.test(attrs)) continue;

    const css = minifyCustomerHomeStartupCss(body);
    fs.writeFileSync(path.join(assetsDir, assetFileName), css, 'utf8');
    const assetSourcesDir = generatorAssetSourcesDir();
    fs.mkdirSync(assetSourcesDir, { recursive: true });
    fs.writeFileSync(path.join(assetSourcesDir, assetFileName), css, 'utf8');
    recordExtractedAsset(assetFileName);

    const assetHash = require('crypto').createHash('sha256').update(css).digest('hex').slice(0, 12);
    const href = `assets/${assetFileName}?v=${assetHash}`;
    const styleTag = `    <link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'" ${markerAttr} data-emy-startup-style-external data-emy-lazy-startup-style />\n    <noscript data-emy-startup-style-noscript><link rel="stylesheet" href="${href}" /></noscript>`;
    const next = source.slice(0, match.index) + styleTag + source.slice(match.index + match[0].length);
    return { html: next, extracted: true, assetBytes: Buffer.byteLength(css) };
  }

  return { html: source, extracted: false, assetBytes: 0 };
}

function extractCustomerHomeStartupStyles(html) {
  return extractPageStartupStyles(html, CUSTOMER_HOME_STARTUP_STYLE_ASSET, 'data-emy-customer-home-startup-style');
}

function extractBusinessProfileStartupStyles(html) {
  return extractPageStartupStyles(html, BUSINESS_PROFILE_STARTUP_STYLE_ASSET, 'data-emy-business-profile-startup-style');
}

function criticalShellStyleTag() {
  return `    <style data-emy-critical-shell-style>
      :root { --emy-navy:#001b47; --emy-orange:#ff6a00; --emy-cream:#fff8ef; --emy-muted:#6a7690; --emy-line:rgba(0,27,71,.10); }
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; background: var(--emy-cream); color: var(--emy-navy); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      body { min-height: 100vh; overflow-x: hidden; }
      button, input { font: inherit; }
      button { -webkit-tap-highlight-color: transparent; }
      [hidden] { display: none !important; }
      .phone, .page, [data-public-customer-shell] { min-height: 100dvh; background: linear-gradient(180deg, #fff8ef 0%, #fffdf8 48%, #fff8ef 100%); }
      .home-first-paint-loader { position: fixed; inset: 0; z-index: 9999; display: grid; place-items: start center; padding: 16px clamp(14px, 3vw, 32px) 104px; background: linear-gradient(180deg, #fff8ef 0%, #fffdf8 48%, #fff8ef 100%); opacity: 1; visibility: visible; pointer-events: none; transition: opacity .18s ease; }
      html.emy-home-real-ready .home-first-paint-loader, html.emy-home-real-timeout .home-first-paint-loader, html.emy-home-shell-ready .home-first-paint-loader { opacity: 0; visibility: hidden; pointer-events: none; }
      .home-boot-layout { width: min(100%, 1340px); display: grid; grid-template-columns: minmax(210px, 272px) minmax(360px, 1fr) minmax(230px, 330px); gap: clamp(18px, 3vw, 44px); align-items: start; }
      .home-boot-side, .home-boot-main, .home-boot-stack { display: grid; gap: 16px; }
      .home-boot-top, .home-boot-banner, .home-boot-card, .home-boot-feed, .home-boot-mini-card { border: 1px solid rgba(0,27,71,.08); background: rgba(255,255,255,.78); box-shadow: 0 18px 48px rgba(0,27,71,.08); }
      .home-boot-top { min-height: 58px; display: grid; grid-template-columns: 48px 1fr 132px; gap: 14px; align-items: center; border-width: 0 0 1px; border-radius: 0; background: transparent; box-shadow: none; }
      .home-boot-banner { min-height: 292px; border-radius: 18px; padding: 34px; display: grid; grid-template-columns: 82px minmax(0, 1fr); gap: 28px; align-items: center; }
      .home-boot-card { min-height: 360px; border-radius: 18px; padding: 14px; }
      .home-boot-feed { min-height: 162px; border-radius: 18px; padding: 18px; display: grid; gap: 14px; }
      .home-boot-mini-card { min-height: 86px; border-radius: 16px; padding: 16px; display: grid; gap: 12px; }
      .home-boot-line, .home-boot-avatar, .home-boot-dot, .home-boot-logo, .home-boot-media { display: block; background: linear-gradient(90deg, rgba(0,27,71,.07) 0%, rgba(255,255,255,.88) 48%, rgba(0,27,71,.07) 100%); background-size: 240% 100%; animation: emyHomeBootShimmer 1.2s ease-in-out infinite; }
      .home-boot-line { height: 12px; border-radius: 999px; }
      .home-boot-line.short { width: 38%; }
      .home-boot-line.medium { width: 62%; }
      .home-boot-line.long { width: 86%; }
      .home-boot-avatar, .home-boot-logo { width: 48px; height: 48px; border-radius: 50%; }
      .home-boot-logo { width: 72px; height: 72px; border-radius: 18px; }
      .home-boot-dot { width: 34px; height: 34px; border-radius: 50%; }
      .home-boot-media { min-height: 240px; border-radius: 14px; }
      .home-boot-row { display: grid; grid-template-columns: 46px 1fr; gap: 12px; align-items: center; }
      .home-boot-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; align-items: center; }
      @keyframes emyHomeBootShimmer { 0% { background-position: 120% 0; } 100% { background-position: -120% 0; } }
      .bottom-nav, .public-customer-bottom-nav, .business-bottom-nav { position: fixed; left: 50%; bottom: 18px; z-index: 70; width: min(620px, calc(100% - 40px)); transform: translateX(-50%); display: grid; gap: 2px; border: 1px solid rgba(0,27,71,.06); border-radius: 14px; background: linear-gradient(145deg, rgba(255,255,255,.94), rgba(248,251,255,.88)); box-shadow: 0 16px 40px rgba(0,27,71,.13), inset 0 1px 0 rgba(255,255,255,.86); padding: 8px; }
      .bottom-nav, .public-customer-bottom-nav { grid-template-columns: repeat(8, minmax(0, 1fr)); }
      .business-bottom-nav { grid-template-columns: repeat(7, minmax(0, 1fr)); z-index: 80; }
      .bottom-nav:hover, .public-customer-bottom-nav:hover, .business-bottom-nav:hover { border-color: rgba(0,27,71,.10); background: linear-gradient(145deg, rgba(255,255,255,.96), rgba(248,251,255,.90)); box-shadow: 0 16px 40px rgba(0,27,71,.13), inset 0 1px 0 rgba(255,255,255,.86); }
      .nav-item, .business-nav-item { position: relative; min-width: 0; min-height: 54px; border: 0; border-radius: 11px; background: transparent; color: #56637b; cursor: pointer; display: grid; place-items: center; gap: 4px; padding: 0; font-size: 10px; line-height: 1; font-weight: 600; }
      .nav-item span:not(.ask-emy-bubble), .business-nav-item span:not(.ask-emy-bubble) { position: relative; z-index: 1; line-height: 1; padding-bottom: 5px; }
      .nav-item svg, .business-nav-item svg { width: 34px; height: 34px; box-sizing: border-box; stroke-width: 2; color: rgba(0,27,71,.86); padding: 8px; border: 1px solid rgba(255,255,255,.88); border-radius: 13px; background: linear-gradient(145deg, rgba(255,255,255,.92), rgba(255,255,255,.42) 54%, rgba(255,255,255,.24)), rgba(255,255,255,.34); clip-path: polygon(18% 0,100% 0,100% 74%,78% 100%,0 100%,0 22%); box-shadow: inset 0 1px 0 rgba(255,255,255,.74), inset 0 -8px 16px rgba(0,27,71,.08), 0 9px 18px rgba(0,27,71,.16); }
      .nav-item:hover, .nav-item.is-active, .business-nav-item:hover, .business-nav-item.is-active { color: var(--emy-orange); background: rgba(255,106,0,.07); }
      .nav-item.is-active svg, .business-nav-item.is-active svg { color: var(--emy-orange); border-color: rgba(255,106,0,.36); background: linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,255,255,.48) 54%, rgba(255,255,255,.28)), rgba(255,255,255,.38); box-shadow: inset 0 1px 0 rgba(255,255,255,.78), inset 0 -8px 16px rgba(255,106,0,.08), 0 10px 20px rgba(0,27,71,.17); }
      .nav-item.is-active::after, .business-nav-item.is-active::after { content: ""; position: absolute; bottom: 1px; width: 18px; height: 2px; border-radius: 999px; background: var(--emy-orange); }
      .business-nav-item[data-tip]::before { content: attr(data-tip); position: absolute; left: 50%; bottom: calc(100% + 10px); z-index: 20; width: max-content; max-width: min(190px, calc(100vw - 24px)); transform: translate(-50%, 7px); opacity: 0; pointer-events: none; border-radius: 7px; background: rgba(0,27,71,.74); color: #fff; padding: 6px 8px; font-size: 11px; line-height: 1.25; font-weight: 560; white-space: nowrap; box-shadow: 0 10px 24px rgba(0,27,71,.18); }
      .business-nav-item[data-tip]:hover::before, .business-nav-item[data-tip]:focus-visible::before { opacity: 1; transform: translate(-50%, 0); }
      .business-nav-item[data-business-nav="home"][data-tip]::before { left: 0; transform: translate(0, 7px); }
      .business-nav-item[data-business-nav="home"][data-tip]:hover::before, .business-nav-item[data-business-nav="home"][data-tip]:focus-visible::before { transform: translate(0, 0); }
      .business-nav-item[data-business-nav="ask"][data-tip]::before { left: auto; right: 0; transform: translate(0, 7px); }
      .business-nav-item[data-business-nav="ask"][data-tip]:hover::before, .business-nav-item[data-business-nav="ask"][data-tip]:focus-visible::before { transform: translate(0, 0); }
      .business-nav-services { overflow: visible; }
      .business-nav-item.business-nav-services[data-tip]::before { content: ""; left: 50%; top: 2px; bottom: auto; z-index: 0; width: 60px; height: 60px; max-width: none; border-radius: 999px; transform: translateX(-50%); opacity: 1; background: linear-gradient(145deg, rgba(255,255,255,.86), rgba(255,244,232,.42) 58%, rgba(255,255,255,.22)), rgba(255,255,255,.38); border: 1px solid rgba(255,255,255,.78); box-shadow: 0 18px 34px rgba(0,27,71,.16), 0 10px 24px rgba(255,106,0,.18), inset 0 1px 0 rgba(255,255,255,.88), inset 0 -14px 22px rgba(255,106,0,.10); padding: 0; }
      .business-nav-services .business-nav-emy-mark { position: relative; z-index: 1; width: 38px; height: 38px; margin-top: 11px; color: #fff; padding: 0; border: 0; border-radius: 999px; background: transparent; clip-path: none; box-shadow: 0 10px 20px rgba(255,106,0,.24), 0 5px 12px rgba(0,27,71,.12); filter: drop-shadow(0 2px 4px rgba(0,27,71,.18)); }
      .business-nav-services .business-nav-tip { position: absolute; left: 50%; bottom: calc(100% + 14px); z-index: 30; width: max-content; max-width: min(190px, calc(100vw - 24px)); transform: translate(-50%, 7px); opacity: 0; pointer-events: none; border-radius: 8px; background: rgba(0,27,71,.76); color: #fff; padding: 6px 9px; font-size: 11px; line-height: 1.2; font-style: normal; font-weight: 760; white-space: nowrap; box-shadow: 0 12px 28px rgba(0,27,71,.22); }
      .business-nav-services:hover .business-nav-tip, .business-nav-services:focus-visible .business-nav-tip { opacity: 1; transform: translate(-50%, 0); }
      .nav-item.nav-item-ask svg, .business-nav-ask svg { width: 48px; height: 48px; color: #fff; padding: 0; border: 0; border-radius: 0; background: transparent; clip-path: none; box-shadow: none; filter: drop-shadow(0 11px 15px rgba(255,106,0,.28)); transform-origin: 50% 82%; }
      .nav-item.nav-item-ask:hover svg, .nav-item.nav-item-ask:focus-visible svg, .business-nav-ask:hover svg, .business-nav-ask:focus-visible svg { animation: emyAskBagWave .7s ease-in-out infinite !important; filter: drop-shadow(0 13px 18px rgba(255,106,0,.34)); }
      .nav-item.nav-item-ask.is-emy-intro svg, .business-nav-ask.is-emy-intro svg { animation: emyAskBagHello 2.8s ease-in-out .15s 2 !important; }
      @keyframes emyAskBagHello { 0%,56%,100% { transform: translateY(0) rotate(0deg) scale(1); } 8% { transform: translateY(-7px) rotate(-8deg) scale(1.10); } 16% { transform: translateY(-3px) rotate(7deg) scale(1.08); } 24% { transform: translateY(-6px) rotate(-5deg) scale(1.10); } 32% { transform: translateY(0) rotate(0deg) scale(1); } }
      @keyframes emyAskBagWave { 0%,100% { transform: translateY(-3px) rotate(-7deg) scale(1.10); } 50% { transform: translateY(-8px) rotate(8deg) scale(1.14); } }
      .nav-item.nav-item-ask span:not(.ask-emy-bubble), .business-nav-ask span:not(.ask-emy-bubble) { color: var(--emy-orange); font-size: 8.8px; white-space: nowrap; }
      .ask-emy-bubble { display: none; }
      @media (max-width: 819px) { .home-first-paint-loader { padding: 14px 14px 104px; } .home-boot-layout { max-width: 430px; grid-template-columns: 1fr; } .home-boot-side, .home-boot-stack { display: none; } .home-boot-banner { min-height: 260px; grid-template-columns: 1fr; } }
      @media (max-width: 760px) { .bottom-nav, .public-customer-bottom-nav, .business-bottom-nav { width: min(calc(100% - 16px), 430px); bottom: 10px; padding: 7px; } .nav-item, .business-nav-item { min-height: 56px; font-size: 9.5px; } .business-nav-services .business-nav-emy-mark { width: 36px; height: 36px; margin-top: 10px; } }
      @media (prefers-reduced-motion: reduce) { .home-boot-line, .home-boot-avatar, .home-boot-dot, .home-boot-logo, .home-boot-media, .nav-item.nav-item-ask svg, .business-nav-ask svg { animation: none !important; } }
    </style>`;
}

function ensureCriticalShellStyle(html) {
  const source = String(html || '');
  if (source.includes('data-emy-critical-shell-style')) return { html: source, changed: false };
  const style = criticalShellStyleTag();
  const startupLink = /(\n\s*<link\b[^>]*data-emy-(?:business-profile|customer-home)-startup-style[^>]*>)/i;
  if (startupLink.test(source)) {
    return { html: source.replace(startupLink, `\n${style}$1`), changed: true };
  }
  if (source.includes('</head>')) return { html: source.replace('</head>', `${style}\n  </head>`), changed: true };
  return { html: source + '\n' + style, changed: true };
}

function ensureFastRenderHints(html) {
  const source = String(html || '');
  if (source.includes('data-emy-fast-render-hints')) return { html: source, changed: false };
  const style = `    <style data-emy-fast-render-hints>
      [hidden] { display: none !important; }
      [data-business-dashboard],
      [data-business-statistics-view],
      [data-business-services-view],
      [data-business-chat-view],
      [data-business-customers-view],
      [data-business-upload-view],
      [data-business-profile-view],
      [data-public-business],
      [data-public-customer-shell],
      [data-home-flow-list],
      [data-annexed-feed-list],
      [data-home-posted-posts-list],
      [data-home-posted-events-list],
      [data-home-posted-jobs-list],
      [data-home-posted-articles-list],
      .business-service-grid,
      .business-chat-grid,
      .business-upload-grid,
      .public-content,
      .public-media-grid,
      .feed-create-modal,
      .location-overlay,
      .profile-photo-overlay,
      .camera-sheet,
      .crop-modal {
        content-visibility: auto;
        contain-intrinsic-size: 1px 720px;
      }
      .feed-create-modal[aria-hidden="true"],
      .location-overlay:not(.is-open),
      .profile-photo-overlay:not(.is-open),
      .camera-sheet[hidden],
      .crop-modal[hidden] {
        content-visibility: hidden;
        contain: layout style paint;
      }
      .business-live-product-list,
      .business-posted-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 230px), 1fr));
        gap: 16px;
        align-items: start;
      }
      .business-live-product-card,
      .feed-card {
        min-width: 0;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 14px;
        background: rgba(255,255,255,.94);
        color: var(--emy-navy);
        box-shadow: 0 14px 34px rgba(0,27,71,.10);
      }
      .business-live-product-media,
      .social-feed-media {
        min-height: 160px;
        background: linear-gradient(135deg,#f3f6fb,#fff7ef);
        display: grid;
        place-items: center;
        color: var(--emy-orange);
        font-size: 11px;
        font-weight: 800;
      }
      .business-live-product-media img,
      .business-live-product-media video,
      .social-feed-media img,
      .social-feed-media video {
        width: 100%;
        height: 100%;
        min-height: 160px;
        object-fit: cover;
        display: block;
      }
      .business-live-product-copy,
      .social-feed-caption,
      .social-feed-body {
        padding: 12px;
      }
      .business-live-product-copy h3,
      .feed-card h3 {
        margin: 0 0 6px;
        font-size: 15px;
        line-height: 1.25;
      }
      .business-live-product-copy p,
      .social-feed-caption {
        margin: 0;
        color: #5e6a82;
        font-size: 12px;
        line-height: 1.4;
      }
      .business-live-product-price {
        display: block;
        margin-top: 10px;
        color: var(--emy-orange);
      }
    </style>`;
  const startupLink = /(\n\s*<link\b[^>]*data-emy-(?:business-profile|customer-home)-startup-style[^>]*>)/i;
  if (startupLink.test(source)) {
    return { html: source.replace(startupLink, `$1\n${style}`), changed: true };
  }
  if (source.includes('</head>')) return { html: source.replace('</head>', `${style}\n  </head>`), changed: true };
  return { html: source + '\n' + style, changed: true };
}

function addLazyMediaAttributes(html) {
  let next = String(html || '');
  const before = next;
  next = next.replace(/<img\b(?![^>]*\bdecoding=)/gi, '<img decoding="async"');
  next = next.replace(/<img\b(?![^>]*\bloading=)/gi, '<img loading="lazy"');
  next = next.replace(/<video\b(?![^>]*\bpreload=)/gi, '<video preload="none"');
  next = next.replace(/\bpreload=(["'])(?:auto|metadata)\1/gi, 'preload="none"');
  return { html: next, changed: next !== before };
}

function makeStartupStylesAsync(html) {
  let next = String(html || '');
  const before = next;
  const re = /<link\b(?=[^>]*\bdata-emy-(?:business-profile|customer-home)-startup-style\b)(?=[^>]*\brel=(["'])stylesheet\1)(?![^>]*\bdata-emy-startup-style-async\b)([^>]*?)\s*\/?>/gi;
  next = next.replace(re, (match) => {
    if (/\bonload=|\bdata-emy-startup-style-async\b/i.test(match)) return match;
    const hrefMatch = match.match(/\bhref=(["'])([^"']+)\1/i);
    const href = hrefMatch ? hrefMatch[2] : '';
    const markerMatch = match.match(/\bdata-emy-(?:business-profile|customer-home)-startup-style\b/i);
    const markerAttr = markerMatch ? markerMatch[0] : 'data-emy-startup-style';
    const asyncTag = `    <script data-emy-startup-style-loader ${markerAttr} data-emy-startup-style-href="${href}">
      (() => {
        const current = document.currentScript;
        const href = current && current.getAttribute("data-emy-startup-style-href");
        if (!href || document.querySelector("link[href='" + href.replace(/'/g, "\\\\'") + "']")) return;
        let loaded = false;
        function loadStartupStyle() {
          if (loaded) return;
          loaded = true;
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          link.setAttribute("${markerAttr}", "");
          link.setAttribute("data-emy-startup-style-async", "");
          document.head.appendChild(link);
        }
        window.__emyLoadStartupStyleNow = loadStartupStyle;
        ["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
          document.addEventListener(eventName, loadStartupStyle, { once: true, capture: true, passive: true });
        });
        const schedule = () => {
          if (window.requestIdleCallback) window.requestIdleCallback(loadStartupStyle, { timeout: 6500 });
          else window.setTimeout(loadStartupStyle, 5200);
        };
        if (document.readyState === "complete") window.setTimeout(schedule, 1800);
        else window.addEventListener("load", () => window.setTimeout(schedule, 1800), { once: true });
      })();
    </script>`;
    return href
      ? `${asyncTag}\n    <noscript data-emy-startup-style-async><link rel="stylesheet" href="${href}" /></noscript>`
      : asyncTag;
  });
  return { html: next, changed: next !== before };
}

function tuneExistingRuntimeLoaders(html) {
  let next = String(html || '');
  const before = next;

  next = next.replace(/\n?\s*<link rel="(?:preload|prefetch)" href="assets\/emy-business-profile-page\.js[^"]*" as="script"[^>]*data-emy-business-runtime-preload[^>]*\/?>/g, '');

  next = next
    .replace(/const delay = view \? 30000 : 45000;/g, 'const delay = view ? 6000 : 60000;')
    .replace(/const delay = view \? 1200 : 1800;/g, 'const delay = view ? 6000 : 60000;')
    .replace(/const quietWindow = view \? 10000 : 12000;/g, 'const quietWindow = view ? 1600 : 4000;')
    .replace(/const quietWindow = 0;/g, 'const quietWindow = view ? 1600 : 4000;')
    .replace(/const hardDeadline = runtimeScheduledAt \+ \(view \? 180000 : 240000\);/g, 'const hardDeadline = runtimeScheduledAt + (view ? 15000 : 120000);')
    .replace(/const hardDeadline = runtimeScheduledAt \+ 4200;/g, 'const hardDeadline = runtimeScheduledAt + (view ? 15000 : 120000);')
    .replace(/script\.fetchPriority = reason === "interaction" \? "high" : "low";\n\s*script\.setAttribute\("fetchpriority", reason === "interaction" \? "high" : "low"\);/g, 'const priority = reason === "interaction" ? "high" : "low";\n              script.fetchPriority = priority;\n              script.setAttribute("fetchpriority", priority);')
    .replace(/window\.setTimeout\(loadRuntime, 0\);/g, 'window.__EMY_CUSTOMER_HOME_RUNTIME_WAKE_DEFERRED__ = true;\n          window.__EMY_CUSTOMER_HOME_RUNTIME_WAKE_DEFERRED_AT__ = Date.now();')
    .replace(/if \(Date\.now\(\) - lastRuntimeWakeActivityAt < 10000\) \{/g, 'if (Date.now() - lastRuntimeWakeActivityAt < 15000) {')
    .replace(/Date\.now\(\) - lastRuntimeWakeActivityAt >= 10000/g, 'Date.now() - lastRuntimeWakeActivityAt >= 15000')
    .replace(/if \(Date\.now\(\) - lastRuntimeWakeActivityAt < 15000\) \{/g, 'if (Date.now() - lastRuntimeWakeActivityAt < 45000) {')
    .replace(/Date\.now\(\) - lastRuntimeWakeActivityAt >= 15000/g, 'Date.now() - lastRuntimeWakeActivityAt >= 45000')
    .replace(/}, 12000\);\n\s+return;\n\s+}\n\s+loadRuntime\("idle"\);\n\s+}, initialMode \? 30000 : 45000\)\);/g, '}, 18000);\n              return;\n            }\n            loadRuntime("idle");\n          }, initialMode ? 120000 : 180000));')
    .replace(/}, initialMode \? 30000 : 45000\)\);/g, '}, initialMode ? 120000 : 180000));');
  next = next
    .replace(/if \(initialMode\) \{\n\s*loadRuntime\("dashboard"\);\n\s*return;\n\s*\}\n\s*/g, '')
    .replace(/}, 18000\);\n\s+return;\n\s+}\n\s+loadRuntime\("idle"\);\n\s+}, initialMode \? 120000 : 180000\)\);/g, '}, 45000);\n              return;\n            }\n            loadRuntime("idle");\n          }, initialMode ? 180000 : 240000));')
    .replace(/}, initialMode \? 120000 : 180000\)\);/g, '}, initialMode ? 180000 : 240000));')
    .replace(/}, initialMode \? 1800 : 45000\)\);/g, '}, initialMode ? 180000 : 240000));')
    .replace(/}, initialMode \? 350 : 45000\)\);/g, '}, initialMode ? 180000 : 240000));')
    .replace(/}, initialMode \? 3600 : 45000\)\);/g, '}, initialMode ? 180000 : 240000));');

  return { html: next, changed: next !== before };
}

function lateSupportScriptsLoader() {
  return `    <script data-emy-late-support-scripts-loader>
      (() => {
        if (window.__emyLateSupportScriptsLoaderReady) return;
        window.__emyLateSupportScriptsLoaderReady = true;
        let lateSupportScriptsPromise = null;
        function holders() {
          return Array.from(document.querySelectorAll("script[data-emy-late-support-src]"));
        }
        function loadHolder(holder) {
          const src = holder && holder.getAttribute("data-emy-late-support-src");
          if (!src) return Promise.resolve(false);
          if (document.querySelector("script[src='" + src.replace(/'/g, "\\\\'") + "'][data-emy-late-support-loaded]")) return Promise.resolve(true);
          return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.defer = true;
            script.setAttribute("data-emy-late-support-loaded", "");
            Array.from(holder.attributes || []).forEach((attr) => {
              if (/^data-emy-/.test(attr.name) && attr.name !== "data-emy-late-support-src") script.setAttribute(attr.name, attr.value || "");
            });
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.head.appendChild(script);
          });
        }
        function loadLateSupportScripts() {
          if (lateSupportScriptsPromise) return lateSupportScriptsPromise;
          window.__emyLateSupportScriptsPending = true;
          lateSupportScriptsPromise = holders()
            .reduce((chain, holder) => chain.then(() => loadHolder(holder)), Promise.resolve(true))
            .then(() => {
              window.__emyLateSupportScriptsPending = false;
              window.dispatchEvent(new CustomEvent("emy:late-support-scripts-ready"));
              return true;
            });
          return lateSupportScriptsPromise;
        }
        function scheduleLateSupportScripts() {
          const start = () => {
            if (window.requestIdleCallback) window.requestIdleCallback(loadLateSupportScripts, { timeout: 15000 });
            else window.setTimeout(loadLateSupportScripts, 12000);
          };
          window.setTimeout(start, 12000);
        }
        window.__emyLoadLateSupportScriptsNow = loadLateSupportScripts;
        scheduleLateSupportScripts();
      })();
    </script>`;
}

function makeSupportScriptsLate(html) {
  let next = String(html || '');
  const before = next;
  const placeholders = [];

  LATE_SUPPORT_SCRIPT_ATTRS.forEach((attr) => {
    const re = new RegExp(`\\n?\\s*<script\\b(?=[^>]*\\b${escapeRegExp(attr)}\\b)(?=[^>]*\\bsrc=)(?![^>]*\\bdata-emy-home-late-src\\b)(?![^>]*\\bdata-emy-late-support-src\\b)(?![^>]*\\bdata-emy-late-support-loaded\\b)([^>]*)><\\/script>`, 'gi');
    next = next.replace(re, (match) => {
      const srcMatch = match.match(/\bsrc=(["'])([^"']+)\1/i);
      const src = srcMatch ? srcMatch[2] : '';
      if (!src) return match;
      placeholders.push(`    <script data-emy-late-support-src="${src}" ${attr}></script>`);
      return '';
    });
  });

  if (!placeholders.length) return { html: next, changed: next !== before };

  const insert = placeholders.join('\n') + (next.includes('data-emy-late-support-scripts-loader') ? '' : '\n' + lateSupportScriptsLoader());
  const runtimeLoaderPattern = /(\s*<script data-emy-page-runtime-loader\b)/;
  if (runtimeLoaderPattern.test(next)) {
    next = next.replace(runtimeLoaderPattern, `\n${insert}$1`);
  } else if (next.includes('</head>')) {
    next = next.replace('</head>', `${insert}\n  </head>`);
  } else {
    next += '\n' + insert;
  }

  return { html: next, changed: next !== before };
}

function restoreLateSupportScriptSources(html) {
  let next = String(html || '');
  const before = next;

  next = next.replace(
    /\n?\s*<script\b([^>]*)\bdata-emy-late-support-src=(["'])([^"']+)\2([^>]*)><\/script>/gi,
    (match, beforeAttrs, quote, src, afterAttrs) => {
      const attrs = `${beforeAttrs || ''} ${afterAttrs || ''}`
        .replace(/\s+\bdefer\b/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return `\n    <script defer src="${src}"${attrs ? ' ' + attrs : ''}></script>`;
    }
  );

  next = next.replace(/\n?\s*<script data-emy-late-support-scripts-loader>[\s\S]*?<\/script>/g, '');
  return { html: next, changed: next !== before };
}

function lazyStylesLoader() {
  return `    <script data-emy-lazy-style-loader>
      (() => {
        if (window.__emyLazyStyleLoaderReady) return;
        window.__emyLazyStyleLoaderReady = true;
        let started = false;
        function cssEscape(value) {
          return String(value || "").replace(/\\\\/g, "\\\\\\\\").replace(/"/g, "\\\\\"");
        }
        function holders() {
          return Array.from(document.querySelectorAll("[data-emy-lazy-style-src]"));
        }
        function loadOne(holder) {
          const href = holder && holder.getAttribute("data-emy-lazy-style-src");
          if (!href || document.querySelector("link[href=\"" + cssEscape(href) + "\"]")) return;
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          Array.from(holder.attributes || []).forEach((attr) => {
            const name = attr && attr.name;
            if (!name || name === "data-emy-lazy-style-src" || name === "data-emy-lazy-style-placeholder") return;
            if (name.indexOf("data-emy-") === 0) link.setAttribute(name, attr.value || "");
          });
          link.setAttribute("data-emy-lazy-style-loaded", "");
          document.head.appendChild(link);
        }
        function loadAll() {
          if (started) return;
          started = true;
          holders().forEach(loadOne);
          window.dispatchEvent(new CustomEvent("emy:lazy-styles-ready"));
        }
        window.__emyLoadLazyStylesNow = loadAll;
        const urgentSelector = "[data-feed-create-open],[data-feed-open],[data-open-item-detail],[data-comment],[data-comment-submit],[data-feed-options],[data-feed-options-menu],[data-like],[data-share],[data-copy],[data-business-like],[data-product-like],[data-emoji-picker],[data-notification],.feed-create-modal,.item-detail-modal";
        document.addEventListener("pointerdown", (event) => {
          const target = event && event.target;
          if (target && target.closest && target.closest(urgentSelector)) loadAll();
        }, { capture: true, passive: true });
        document.addEventListener("keydown", (event) => {
          if (event && (event.key === "Enter" || event.key === " ")) loadAll();
        }, { capture: true });
        function schedule() {
          const run = () => {
            if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(loadAll, { timeout: 30000 });
            else window.setTimeout(loadAll, 22000);
          };
          window.setTimeout(run, 18000);
        }
        if (document.readyState === "complete") window.setTimeout(schedule, 12000);
        else {
          window.addEventListener("load", () => window.setTimeout(schedule, 12000), { once: true });
          window.setTimeout(schedule, 45000);
        }
      })();
    </script>`;
}

function makeNonCriticalStylesLazy(html) {
  let next = String(html || '');
  const before = next;
  let placeholders = 0;

  NON_CRITICAL_STYLE_ATTRS.forEach((attr) => {
    const re = new RegExp(`<link\\b(?=[^>]*\\b${escapeRegExp(attr)}\\b)(?=[^>]*\\bhref=)(?=[^>]*(?:\\brel=(["'])(?:stylesheet|preload)\\1|\\bdata-emy-lazy-style\\b))([^>]*?)\\s*/?>`, 'gi');
    next = next.replace(re, (match) => {
      const hrefMatch = match.match(/\bhref=(["'])([^"']+)\1/i);
      const href = hrefMatch ? hrefMatch[2] : '';
      if (!href) return match;
      const attrs = match
        .replace(/^<link\b/i, '')
        .replace(/\s*\/?>$/i, '')
        .replace(/\s+\brel=(["'])(?:stylesheet|preload)\1/gi, '')
        .replace(/\s+\bas=(["'])style\1/gi, '')
        .replace(/\s+\bhref=(["'])([^"']+)\1/gi, '')
        .replace(/\s+\bonload=(["'])(?:(?!\1).)*\1/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
      const lazyAttr = /\bdata-emy-lazy-style\b/i.test(attrs) ? '' : ' data-emy-lazy-style';
      placeholders += 1;
      return `<meta data-emy-lazy-style-placeholder data-emy-lazy-style-src="${href}"${lazyAttr}${attrs ? ' ' + attrs : ''} />`;
    });
  });

  if (placeholders && !next.includes('data-emy-lazy-style-loader')) {
    const insert = lazyStylesLoader();
    const runtimeLoaderPattern = /(\s*<script data-emy-page-runtime-loader\b)/;
    if (runtimeLoaderPattern.test(next)) {
      next = next.replace(runtimeLoaderPattern, `\n${insert}$1`);
    } else if (next.includes('</head>')) {
      next = next.replace('</head>', `${insert}\n  </head>`);
    } else {
      next += '\n' + insert;
    }
  }
  return { html: next, changed: next !== before };
}

function ensureBusinessProfileCriticalFastNavStyle(html) {
  const source = String(html || '');
  const existingCriticalPattern = /\s*<style data-emy-business-fast-nav-critical>[\s\S]*?<\/style>/;
  if (existingCriticalPattern.test(source)) {
    return source.replace(existingCriticalPattern, '');
  }
  return source;
}

function makeRealBackendScriptsNonBlocking(html) {
  return String(html || '')
    .replace(/<script(?![^>]*\bdefer\b)([^>]*\bdata-emy-real-backend-inline\b[^>]*)><\/script>/g, '<script defer$1></script>')
    .replace(/<script(?![^>]*\bdefer\b)([^>]*\bdata-emy-real-backend-loader\b[^>]*)><\/script>/g, '<script defer$1></script>');
}

function businessProfileLateScriptLoader(scripts) {
  const payload = JSON.stringify(scripts || []);
  return `    <script data-emy-business-profile-late-scripts>
      (() => {
        if (window.__emyBusinessProfileLateScriptsReady) return;
        window.__emyBusinessProfileLateScriptsReady = true;
        const scripts = ${payload};
        let started = false;
        function loadNext(index) {
          if (index >= scripts.length) {
            window.dispatchEvent(new CustomEvent("emy:business-profile-late-scripts-ready"));
            return;
          }
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
          script.setAttribute("data-emy-business-profile-late-loaded", "");
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
        window.__emyLoadBusinessProfileLateScriptsNow = load;
        const urgentSelector = "[data-feed-options],[data-feed-options-menu],[data-comment],[data-comment-submit],[data-like],[data-share],[data-copy],[data-business-like],[data-product-like],[data-emoji-picker],[data-notification],[data-open-item-detail]";
        document.addEventListener("pointerdown", (event) => {
          const target = event && event.target;
          if (target && target.closest && target.closest(urgentSelector)) load();
        }, { capture: true, passive: true });
        function schedule() {
          const run = () => {
            if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(load, { timeout: 45000 });
            else window.setTimeout(load, 30000);
          };
          if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(() => window.requestAnimationFrame(run));
          else window.setTimeout(run, 0);
        }
        if (document.readyState === "complete") window.setTimeout(schedule, 30000);
        else {
          window.addEventListener("load", () => window.setTimeout(schedule, 30000), { once: true });
          window.setTimeout(schedule, 60000);
        }
      })();
    </script>`;
}

function deferBusinessProfileLateScripts(html) {
  let next = String(html || '');
  if (next.includes('data-emy-business-profile-late-scripts')) return { html: next, changed: false };

  const scripts = [];
  BUSINESS_PROFILE_LATE_SCRIPT_ATTRS.forEach((attr) => {
    const re = new RegExp(`\\n?\\s*<script\\b(?=[^>]*\\b${escapeRegExp(attr)}\\b)(?=[^>]*\\bsrc=)([^>]*)><\\/script>`, 'i');
    const match = next.match(re);
    if (!match) return;
    const attrs = match[1] || '';
    const srcMatch = attrs.match(/\bsrc=(["'])([^"']+)\1/i);
    const src = srcMatch ? srcMatch[2] : '';
    if (!src) return;
    scripts.push({ src, attr });
    next = next.replace(match[0], '');
  });

  if (!scripts.length) return { html: next, changed: false };
  const loader = businessProfileLateScriptLoader(scripts);
  const runtimePattern = /(\n?\s*<script\b[^>]*data-emy-page-runtime-loader\b[\s\S]*?<\/script>|\n?\s*<script defer src="assets\/emy-business-profile-page\.js[^"]*" data-emy-page-runtime><\/script>)/;
  if (runtimePattern.test(next)) {
    next = next.replace(runtimePattern, (match) => match + '\n' + loader);
  } else if (next.includes('</body>')) {
    next = next.replace('</body>', loader + '\n  </body>');
  } else {
    next += '\n' + loader;
  }
  return { html: next, changed: true };
}

function ensureBusinessProfileDeferredRuntimeLoader(html, assetUrl) {
  const source = String(html || '');
  if (!assetUrl) return { html: source, changed: false };
  let next = source;
  if (next.includes('data-emy-business-profile-deferred-runtime-loader')) {
    const updated = next.replace(
      /data-emy-business-profile-deferred-runtime-src="[^"]*"/,
      `data-emy-business-profile-deferred-runtime-src="${assetUrl}"`
    );
    return { html: updated, changed: updated !== source };
  }
  const loader = businessProfileDeferredRuntimeLoader(assetUrl);
  const runtimePattern = /(\n\s*<script data-emy-page-runtime-loader data-emy-page-runtime-src="[^"]*emy-business-profile-page\.js[^"]*">[\s\S]*?<\/script>)/;
  if (runtimePattern.test(next)) {
    next = next.replace(runtimePattern, (match) => match + '\n' + loader);
  } else if (next.includes('</body>')) {
    next = next.replace('</body>', loader + '\n  </body>');
  } else {
    next += '\n' + loader;
  }
  return { html: next, changed: next !== source };
}

function ensureBusinessProfileLiteContentRenderer(html) {
  const source = String(html || '');
  if (source.includes('data-emy-business-lite-content-renderer')) return { html: source, changed: false };
  const renderer = businessProfileLiteContentRenderer();
  const runtimePreloadPattern = /(\n\s*<link rel="(?:preload|prefetch)" href="assets\/emy-business-profile-page\.js[^"]*" as="script"[^>]*data-emy-business-runtime-preload[^>]*>)/;
  if (runtimePreloadPattern.test(source)) {
    return { html: source.replace(runtimePreloadPattern, '\n' + renderer + '$1'), changed: true };
  }
  const runtimeLoaderPattern = /(\n\s*<script data-emy-page-runtime-loader data-emy-page-runtime-src="[^"]*emy-business-profile-page\.js[^"]*">)/;
  if (runtimeLoaderPattern.test(source)) {
    return { html: source.replace(runtimeLoaderPattern, '\n' + renderer + '$1'), changed: true };
  }
  if (source.includes('</body>')) return { html: source.replace('</body>', renderer + '\n  </body>'), changed: true };
  return { html: source + '\n' + renderer, changed: true };
}

function ensureBusinessProfileDeferredRuntimeSplit(html) {
  const source = String(html || '');
  const match = source.match(/assets\/emy-business-profile-page\.js(?:\?v=[^"]+)?/i);
  if (!match) return { html: source, changed: false, assetBytes: 0 };

  const runtimeRelative = match[0].split('?')[0];
  const runtimePath = path.join(outDir, runtimeRelative);
  if (!fs.existsSync(runtimePath)) return { html: source, changed: false, assetBytes: 0 };

  const runtimeSource = fs.readFileSync(runtimePath, 'utf8');
  const split = splitBusinessProfileDeferredRuntime(runtimeSource);
  if (!split.split) return { html: source, changed: false, assetBytes: 0 };

  const mainAsset = writeExtractedAsset('emy-business-profile-page.js', split.main);
  const deferredAsset = writeExtractedAsset(BUSINESS_PROFILE_DEFERRED_RUNTIME_ASSET, split.deferred);
  let next = source.replace(/assets\/emy-business-profile-page\.js(?:\?v=[a-f0-9]+)?/gi, mainAsset.assetUrl);
  const loaderResult = ensureBusinessProfileDeferredRuntimeLoader(next, deferredAsset.assetUrl);
  next = loaderResult.html;
  return {
    html: next,
    changed: next !== source,
    assetBytes: mainAsset.assetBytes + deferredAsset.assetBytes,
  };
}

function ensureBusinessProfileRuntimeLoader(html) {
  const source = String(html || '');
  let next = source.replace(/\n?\s*<link rel="preload" href="assets\/emy-business-profile-page\.js[^"]*" as="script" \/>/g, '');
  if (next.includes('data-emy-page-runtime-loader')) return { html: next, changed: next !== source };

  const runtimePattern = /\n?\s*<script defer src="(assets\/emy-business-profile-page\.js[^"]*)" data-emy-page-runtime><\/script>/;
  const match = next.match(runtimePattern);
  if (!match) return { html: next, changed: next !== source };

  next = next.replace(runtimePattern, '\n' + businessProfileRuntimeLoader(match[1]));
  return { html: next, changed: true };
}

function minifyCustomerHomeStartupCss(css) {
  const source = String(css || '');
  let output = '';
  let quote = '';
  let escaped = false;
  let inComment = false;
  let pendingSpace = false;
  const tight = '{}:;,>~()';
  const spaceBlockPrev = '{};,>~';

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (inComment) {
      if (char === '*' && next === '/') {
        inComment = false;
        index += 1;
      }
      continue;
    }

    if (quote) {
      output += char;
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = '';
      }
      continue;
    }

    if (char === '/' && next === '*') {
      inComment = true;
      index += 1;
      continue;
    }

    if (char === '"' || char === "'") {
      if (pendingSpace && output && !spaceBlockPrev.includes(output[output.length - 1])) output += ' ';
      pendingSpace = false;
      quote = char;
      output += char;
      continue;
    }

    if (/\s/.test(char)) {
      pendingSpace = true;
      continue;
    }

    if ((char === '+' || char === '-') && pendingSpace && output && !/\s$/.test(output)) {
      output += ' ';
      pendingSpace = false;
      output += char;
      continue;
    }

    if (tight.includes(char)) {
      output = output.replace(/\s+$/g, '');
      output += char;
      pendingSpace = false;
      continue;
    }

    if (pendingSpace && output && !spaceBlockPrev.includes(output[output.length - 1])) output += ' ';
    pendingSpace = false;
    output += char;
  }

  return output.replace(/;}/g, '}').trim() + '\n';
}

function lightenCustomerHomeFallbackDeck(html) {
  const source = String(html || '');
  if (!source.includes('data-business-deck')) return { html: source, changed: false };
  let changed = false;

  let next = source.replace(
    /<span class="emy-business-like-icon" aria-hidden="true"><svg class="emy-business-like-bag"[\s\S]*?<\/svg><\/span>/g,
    () => {
      changed = true;
      return CUSTOMER_HOME_LITE_BUSINESS_LIKE_ICON;
    }
  );

  next = next.replace(
    /(<div class="business-stage">)([\s\S]*?)(\n\s*<\/div>\n\s*<button class="business-arrow business-next")/,
    (match, start, body, end) => {
      const articleRe = /\n\s*<article class="card business-card"[\s\S]*?<\/article>/g;
      const articles = body.match(articleRe) || [];
      if (articles.length <= CUSTOMER_HOME_FALLBACK_BUSINESS_CARD_LIMIT) return match;
      changed = true;
      const keptArticles = articles.slice(0, CUSTOMER_HOME_FALLBACK_BUSINESS_CARD_LIMIT).join('');
      const beforeFirst = body.slice(0, body.indexOf(articles[0]));
      const afterLast = body.slice(body.lastIndexOf(articles[articles.length - 1]) + articles[articles.length - 1].length);
      return start + beforeFirst + keptArticles + afterLast + end;
    }
  );

  return { html: next, changed };
}

function hashLinkedRuntime(fileName) {
  try {
    const filePath = path.join(outDir, fileName);
    if (!fs.existsSync(filePath)) return '';
    return require('crypto').createHash('sha256').update(fs.readFileSync(filePath)).digest('hex').slice(0, 12);
  } catch (error) {
    return '';
  }
}

function ensureCustomerHomeLateSupportPlaceholders(html) {
  const source = String(html || '');
  if (!source.includes('data-emy-home-late-support-loader')) return { html: source, changed: false };
  const missing = [];
  if (!source.includes('data-emy-home-late-src="emy-central-storage.js')) {
    missing.push('    <script data-emy-home-late-src="emy-central-storage.js" data-emy-central-storage></script>');
  }
  if (!source.includes('data-emy-home-late-src="emy-shared-port-content.js')) {
    const bridgeHash = hashLinkedRuntime('emy-shared-port-content.js');
    const bridgeSrc = bridgeHash ? `emy-shared-port-content.js?v=${bridgeHash}` : 'emy-shared-port-content.js';
    missing.push(`    <script data-emy-home-late-src="${bridgeSrc}" data-emy-shared-port-content></script>`);
  }
  if (!missing.length) return { html: source, changed: false };

  const insert = missing.join('\n');
  const guardPattern = /(\s*<script data-emy-home-late-src="assets\/emy-real-data-guard\.js[^"]*" data-emy-real-data-guard><\/script>)/;
  if (guardPattern.test(source)) {
    return { html: source.replace(guardPattern, `\n${insert}$1`), changed: true };
  }
  const loaderPattern = /(\s*<script data-emy-home-late-support-loader>)/;
  if (loaderPattern.test(source)) {
    return { html: source.replace(loaderPattern, `\n${insert}$1`), changed: true };
  }
  if (source.includes('</head>')) return { html: source.replace('</head>', `${insert}\n  </head>`), changed: true };
  return { html: source + '\n' + insert, changed: true };
}

function removeCustomerHomeEagerSupportScripts(html) {
  const source = String(html || '');
  if (!source.includes('data-emy-home-late-support-loader')) return { html: source, changed: false };
  let next = source;
  next = next.replace(/\n?\s*<script(?:\s+defer)? src="emy-central-storage\.js(?:\?v=[^"]+)?" data-emy-central-storage><\/script>/g, '');
  next = next.replace(/\n?\s*<script(?:\s+defer)? src="emy-shared-port-content\.js(?:\?v=[^"]+)?" data-emy-shared-port-content><\/script>/g, '');
  next = next.replace(/\n?\s*<script(?:\s+defer)? src="assets\/emy-real-data-guard\.js[^"]*" data-emy-real-data-guard><\/script>/g, '');
  return { html: next, changed: next !== source };
}

function writeExtractedPageScript(fileName, body) {
  const cleanBody = String(body || '');
  fs.writeFileSync(path.join(assetsDir, fileName), cleanBody + '\n', 'utf8');
  const assetSourcesDir = generatorAssetSourcesDir();
  fs.mkdirSync(assetSourcesDir, { recursive: true });
  fs.writeFileSync(path.join(assetSourcesDir, fileName), cleanBody + '\n', 'utf8');
  recordExtractedAsset(fileName);
  const assetHash = require('crypto').createHash('sha256').update(cleanBody).digest('hex').slice(0, 12);
  return `assets/${fileName}?v=${assetHash}`;
}

function replaceAskEmyInlineScript(html, config) {
  const source = String(html || '');
  const re = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/i;
  let cursor = source;
  let offset = 0;
  let match;
  while ((match = re.exec(cursor)) !== null) {
    const attrs = match[1] || '';
    const body = match[2] || '';
    if (!config.matches(attrs, body)) {
      offset += match.index + match[0].length;
      cursor = source.slice(offset);
      continue;
    }
    const assetUrl = writeExtractedPageScript(config.fileName, body);
    const tag = config.tag(assetUrl);
    return {
      html: source.slice(0, offset + match.index) + tag + source.slice(offset + match.index + match[0].length),
      extracted: true,
      bytes: Buffer.byteLength(body),
    };
  }
  return { html: source, extracted: false, bytes: 0 };
}

function extractAskEmyResultsInlineScripts(html) {
  let next = String(html || '');
  let extracted = false;
  let assetBytes = 0;
  const configs = [
    {
      fileName: 'ask-emy-results-media-store.js',
      matches: (attrs) => /\bdata-emy-media-store\b/i.test(attrs),
      tag: (src) => `    <script defer src="${src}" data-emy-media-store></script>`,
    },
    {
      fileName: 'ask-emy-results-video-player-runtime.js',
      matches: (attrs) => /\bdata-emy-video-player-runtime\b/i.test(attrs),
      tag: (src) => `    <script defer src="${src}" data-emy-video-player-runtime></script>`,
    },
    {
      fileName: 'ask-emy-results-page.js',
      matches: (attrs) => /\btype=["']text\/babel["']/i.test(attrs) && /\bdata-presets=["']emy-react-classic["']/i.test(attrs),
      tag: (src) => `    <script type="text/babel" data-presets="emy-react-classic" src="${src}" data-emy-page-runtime></script>`,
    },
    {
      fileName: 'ask-emy-results-item-detail-runtime.js',
      matches: (attrs) => /\bdata-ask-emy-item-detail-runtime\b/i.test(attrs),
      tag: (src) => `    <script defer src="${src}" data-ask-emy-item-detail-runtime></script>`,
    },
  ];

  configs.forEach((config) => {
    const result = replaceAskEmyInlineScript(next, config);
    next = result.html;
    if (result.extracted) {
      extracted = true;
      assetBytes += result.bytes;
    }
  });

  return { html: next, extracted, assetBytes };
}

for (const pageName of PAGE_SCRIPT_EXTRACTION) {
  if (!shouldExtractPage(pageName)) continue;
  const outputPath = path.join(outDir, pageName);
  if (!fs.existsSync(outputPath)) continue;
  const assetFileName = pageName.replace(/\.html$/i, '-page.js');
  const html = fs.readFileSync(outputPath, 'utf8');
  const result = pageName === 'ask-emy-results.html'
    ? extractAskEmyResultsInlineScripts(html)
    : extractLargeInlineScripts(html, assetFileName, pageName);
  if (!result.extracted) continue;
  fs.writeFileSync(outputPath, result.html, 'utf8');
  const entry = manifest.find((item) => item.page === pageName);
  if (entry) entry.bytes = Buffer.byteLength(result.html);
}

{
  const outputPath = path.join(outDir, 'emy-customer-home.html');
  if (shouldExtractPage('emy-customer-home.html') && fs.existsSync(outputPath)) {
    let html = fs.readFileSync(outputPath, 'utf8');
    let changed = false;
    const styleResult = extractCustomerHomeStartupStyles(html);
    html = styleResult.html;
    changed = changed || styleResult.extracted;
    const criticalShellResult = ensureCriticalShellStyle(html);
    html = criticalShellResult.html;
    changed = changed || criticalShellResult.changed;
    const runtimeTuneResult = tuneExistingRuntimeLoaders(html);
    html = runtimeTuneResult.html;
    changed = changed || runtimeTuneResult.changed;
    const restoreSupportResult = restoreLateSupportScriptSources(html);
    html = restoreSupportResult.html;
    changed = changed || restoreSupportResult.changed;
    const genericSupportResult = makeSupportScriptsLate(html);
    html = genericSupportResult.html;
    changed = changed || genericSupportResult.changed;
    const fastRenderResult = ensureFastRenderHints(html);
    html = fastRenderResult.html;
    changed = changed || fastRenderResult.changed;
    const lazyMediaResult = addLazyMediaAttributes(html);
    html = lazyMediaResult.html;
    changed = changed || lazyMediaResult.changed;
    const lateSupportResult = ensureCustomerHomeLateSupportPlaceholders(html);
    html = lateSupportResult.html;
    changed = changed || lateSupportResult.changed;
    const eagerSupportResult = removeCustomerHomeEagerSupportScripts(html);
    html = eagerSupportResult.html;
    changed = changed || eagerSupportResult.changed;
    if (changed) {
      fs.writeFileSync(outputPath, html, 'utf8');
      const entry = manifest.find((item) => item.page === 'emy-customer-home.html');
      if (entry) entry.bytes = Buffer.byteLength(html);
    }
  }
}

{
  const outputPath = path.join(outDir, 'emy-business-profile.html');
  if (shouldExtractPage('emy-business-profile.html') && fs.existsSync(outputPath)) {
    let html = fs.readFileSync(outputPath, 'utf8');
    let changed = false;
    const styleResult = extractBusinessProfileStartupStyles(html);
    html = styleResult.html;
    changed = changed || styleResult.extracted;
    const criticalShellResult = ensureCriticalShellStyle(html);
    html = criticalShellResult.html;
    changed = changed || criticalShellResult.changed;
    const runtimeTuneResult = tuneExistingRuntimeLoaders(html);
    html = runtimeTuneResult.html;
    changed = changed || runtimeTuneResult.changed;
    const restoreSupportResult = restoreLateSupportScriptSources(html);
    html = restoreSupportResult.html;
    changed = changed || restoreSupportResult.changed;
    const genericSupportResult = makeSupportScriptsLate(html);
    html = genericSupportResult.html;
    changed = changed || genericSupportResult.changed;
    const fastRenderResult = ensureFastRenderHints(html);
    html = fastRenderResult.html;
    changed = changed || fastRenderResult.changed;
    const lazyMediaResult = addLazyMediaAttributes(html);
    html = lazyMediaResult.html;
    changed = changed || lazyMediaResult.changed;
    const criticalHtml = ensureBusinessProfileCriticalFastNavStyle(html);
    changed = changed || criticalHtml !== html;
    html = criticalHtml;
    const nonBlockingHtml = makeRealBackendScriptsNonBlocking(html);
    changed = changed || nonBlockingHtml !== html;
    html = nonBlockingHtml;
    if (changed) {
      fs.writeFileSync(outputPath, html, 'utf8');
      const entry = manifest.find((item) => item.page === 'emy-business-profile.html');
      if (entry) entry.bytes = Buffer.byteLength(html);
    }
  }
}

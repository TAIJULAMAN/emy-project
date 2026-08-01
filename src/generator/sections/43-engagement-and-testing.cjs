/* EMY generator section: 43-engagement-and-testing.cjs (source lines 108434-109444) */
const sharedCentralEngagementScript = "";

const sharedBusinessLikeSyncScript = String.raw`
    <style data-emy-business-like-style>
      .business-like-button {
        transition: border-color .16s ease, background .16s ease, color .16s ease, box-shadow .16s ease, transform .16s ease;
      }
      .business-like-button:active {
        transform: scale(.97);
      }
      .business-like-button strong,
      .business-like-button .emy-business-like-icon {
        transition: opacity .12s ease, transform .12s ease;
      }
      .emy-business-like-icon {
        display: inline-grid;
        place-items: center;
        width: 20px;
        min-width: 20px;
        height: 20px;
        overflow: visible;
        border-radius: 5px;
        flex-shrink: 0;
      }
      .emy-business-like-icon svg,
      .emy-business-like-bag {
        display: block;
        width: 20px;
        height: 20px;
        overflow: visible;
        object-fit: contain;
      }
      .business-like-button.is-liked .emy-business-like-icon svg,
      .business-like-button.is-active .emy-business-like-icon svg {
        animation: emyBusinessLikeBagHello .72s ease-in-out both;
      }
      @keyframes emyBusinessLikeBagHello {
        0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
        28% { transform: translateY(-3px) rotate(-8deg) scale(1.08); }
        54% { transform: translateY(1px) rotate(7deg) scale(.98); }
        78% { transform: translateY(-1px) rotate(-3deg) scale(1.03); }
      }
    </style>
    <script data-emy-business-like-sync>
      (function setupEmyBusinessLikeSync() {
        if (window.__emyBusinessLikeSyncInstalled) return;
        window.__emyBusinessLikeSyncInstalled = true;
        const PAIRS_KEY = "emyBusinessLikePairs";
        const LEGACY_KEY = "emyBusinessLikeState";
        const ENDPOINT = "/api/emy-shared-content";
        const BUTTON_SELECTOR = "[data-business-like], [data-search-business-like]";
        const CARD_SELECTOR = "[data-business-key], [data-business-card], [data-card], [data-feed-id], .business-card, .feed-business-profile-card, .search-business-profile-card";
        const clean = (value) => String(value == null ? "" : value).replace(/\s+/g, " ").trim();
        const slug = (value) => clean(value).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 140);
        let pairsCache = null;
        const pendingSync = new Map();
        function readJson(key, fallback) {
          try {
            const parsed = JSON.parse(localStorage.getItem(key) || "");
            return parsed && typeof parsed === "object" ? parsed : fallback;
          } catch (error) {
            return fallback;
          }
        }
        function pairsFromLegacy(state) {
          const pairs = [];
          if (!state || typeof state !== "object") return pairs;
          Object.keys(state).forEach((businessId) => {
            const entry = state[businessId];
            const likedBy = Array.isArray(entry && entry.likedBy) ? entry.likedBy : [];
            likedBy.forEach((userId) => {
              const actor = clean(userId);
              if (actor) pairs.push({ businessId: slug(businessId), userId: actor, likedAt: clean(entry && entry.updatedAt) || "" });
            });
          });
          return pairs;
        }
        function userPairKey(value) {
          const raw = clean(value).toLowerCase().replace(/^(customer|business):/, "");
          return slug(raw) || raw;
        }
        function userMatches(storedUserId, userId) {
          const stored = clean(storedUserId).toLowerCase();
          const wanted = clean(userId).toLowerCase();
          if (!stored || !wanted) return false;
          if (stored === wanted) return true;
          return userPairKey(stored) === userPairKey(wanted);
        }
        function normalizePairs(raw) {
          const map = new Map();
          (Array.isArray(raw) ? raw : []).forEach((row) => {
            if (!row || typeof row !== "object") return;
            const businessId = slug(row.businessId);
            const userId = clean(row.userId);
            if (!businessId || !userId) return;
            const id = businessId + "\0" + userPairKey(userId);
            if (!map.has(id)) map.set(id, { businessId, userId, likedAt: clean(row.likedAt) || "" });
          });
          return Array.from(map.values());
        }
        function readPairs() {
          if (pairsCache) return pairsCache.slice();
          let pairs = normalizePairs(readJson(PAIRS_KEY, []));
          if (!pairs.length) pairs = pairsFromLegacy(readJson(LEGACY_KEY, {}));
          pairsCache = pairs.slice();
          return pairs.slice();
        }
        function rebuildLegacyState(pairs) {
          const state = {};
          pairs.forEach((row) => {
            const key = slug(row.businessId);
            if (!key) return;
            if (!state[key]) state[key] = { likedBy: [], count: 0, baseCount: 0, updatedAt: row.likedAt || new Date().toISOString() };
            if (!state[key].likedBy.includes(row.userId)) state[key].likedBy.push(row.userId);
            state[key].count = state[key].likedBy.length;
          });
          return state;
        }
        function writePairs(pairs, silent) {
          const next = normalizePairs(pairs).slice(-5000);
          pairsCache = next.slice();
          try {
            window.__emyBusinessLikeSyncWriting = true;
            localStorage.setItem(PAIRS_KEY, JSON.stringify(next));
            localStorage.setItem(LEGACY_KEY, JSON.stringify(rebuildLegacyState(next)));
          } catch (error) {}
          window.__emyBusinessLikeSyncWriting = false;
          if (!silent) window.dispatchEvent(new CustomEvent("emy:business-likes-changed", { detail: { source: "business-like-sync" } }));
        }
        function currentUserId() {
          const customerProfile = readJson("emyCustomerProfileDraft", {});
          const businessProfile = readJson("emyBusinessProfileDraft", {});
          const accountType = clean(localStorage.getItem("emyMainAccountType") || localStorage.getItem("emyActiveAccountType") || localStorage.getItem("emyAccountType")).toLowerCase();
          const businessCandidate = [
            localStorage.getItem("emyBusinessEmail"),
            localStorage.getItem("emyCurrentBusinessEmail"),
            localStorage.getItem("emyBusinessPhone"),
            localStorage.getItem("emyCurrentBusinessPhone"),
            localStorage.getItem("emyBusinessName"),
            localStorage.getItem("emyCurrentBusinessName"),
            businessProfile.email,
            businessProfile.phone,
            businessProfile.businessName,
            businessProfile.name
          ].find((value) => clean(value));
          const customerCandidate = [
            localStorage.getItem("emyCustomerEmail"),
            localStorage.getItem("emyMainSignedInEmail"),
            localStorage.getItem("emyCustomerPhone"),
            localStorage.getItem("emyCurrentCustomerEmail"),
            localStorage.getItem("emyCurrentCustomerPhone"),
            localStorage.getItem("emyCustomerProfileKey"),
            localStorage.getItem("emyCustomerKey"),
            localStorage.getItem("emyCurrentCustomerKey"),
            localStorage.getItem("emyCustomerName"),
            localStorage.getItem("emyCurrentCustomerName"),
            customerProfile.email,
            customerProfile.phone,
            customerProfile.key,
            customerProfile.customerKey,
            customerProfile.profileKey,
            customerProfile.name
          ].find((value) => clean(value));
          const signedIn = localStorage.getItem("emyMainSignedInEmail") || localStorage.getItem("emyMainPendingSignupEmail");
          const looksBusiness = accountType.indexOf("business") >= 0 || (!customerCandidate && !!businessCandidate);
          const actor = looksBusiness ? businessCandidate || signedIn || customerCandidate : signedIn || customerCandidate || businessCandidate;
          const prefix = looksBusiness ? "business" : "customer";
          return prefix + ":" + slug(actor || "local-user");
        }
        function formatCount(value) {
          const count = Math.max(0, Number(value) || 0);
          if (count >= 1000000) return (Math.round(count / 100000) / 10).toString().replace(/\.0$/, "") + "M";
          if (count >= 1000) return (Math.round(count / 100) / 10).toString().replace(/\.0$/, "") + "K";
          return String(count);
        }
        function textFrom(node) {
          return clean(node && node.textContent || "");
        }
        function keyFromHref(value) {
          const raw = clean(value);
          if (!raw) return "";
          try {
            const url = new URL(raw, window.location.href);
            const business = url.searchParams.get("business") || url.searchParams.get("key") || url.searchParams.get("id");
            if (business) return slug(business);
          } catch (error) {}
          const match = raw.match(/business=([^&#]+)/i);
          return match ? slug(decodeURIComponent(match[1])) : "";
        }
        function businessKeyFor(button) {
          const card = button && button.closest && button.closest(CARD_SELECTOR);
          const data = Object.assign({}, card && card.dataset || {}, button && button.dataset || {});
          const hrefNode = card && card.querySelector && card.querySelector("a[href*='emy-business-profile']");
          const hrefKey = keyFromHref((hrefNode && hrefNode.getAttribute("href")) || "");
          const key = slug(data.businessKey || data.businessLink || data.profileBusinessLink || data.detailBusinessKey || hrefKey);
          if (key) return key;
          const name = clean(data.detailBusiness || data.businessName || data.business || data.nearbyBusiness || data.profileBusinessName || textFrom(card && card.querySelector && card.querySelector("h3,strong,.business-title-link")));
          return slug(name || "business");
        }
        function businessAliasSetFor(button, businessId) {
          const card = button && button.closest && button.closest(CARD_SELECTOR);
          const data = Object.assign({}, card && card.dataset || {}, button && button.dataset || {});
          const aliases = new Set([slug(businessId)]);
          clean(data.businessLikeAliases || data.businessAliases || "").split(/[|,]+/).forEach((value) => {
            const key = slug(value);
            if (key) aliases.add(key);
          });
          return aliases;
        }
        function countForBusiness(pairs, businessAliases) {
          const targets = businessAliases instanceof Set ? businessAliases : new Set([slug(businessAliases)]);
          const users = new Set();
          pairs.forEach((row) => {
            if (!targets.has(slug(row.businessId))) return;
            const userKey = userPairKey(row.userId);
            if (userKey) users.add(userKey);
          });
          return users.size;
        }
        function userLiked(pairs, businessAliases, userId) {
          const targets = businessAliases instanceof Set ? businessAliases : new Set([slug(businessAliases)]);
          return pairs.some((row) => targets.has(slug(row.businessId)) && userMatches(row.userId, userId));
        }
        function businessLikeBagMarkup() {
          return '<svg class="emy-business-like-bag" viewBox="0 0 24 24" fill="none" focusable="false" aria-hidden="true"><path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/><path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/><path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/><path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/></svg>';
        }
        function ensureBusinessLikeIcon(button) {
          const icon = button && button.querySelector && button.querySelector(".emy-business-like-icon");
          if (!icon || icon.querySelector("svg")) return;
          icon.innerHTML = businessLikeBagMarkup();
        }
        function setButton(button, businessId, businessAliases, pairs, userId) {
          ensureBusinessLikeIcon(button);
          const count = countForBusiness(pairs, businessAliases);
          const active = userLiked(pairs, businessAliases, userId);
          button.classList.toggle("is-active", active);
          button.classList.toggle("is-liked", active);
          button.setAttribute("aria-pressed", active ? "true" : "false");
          button.setAttribute("aria-label", active ? "Unlike business" : "Like business");
          button.setAttribute("title", active ? "Unlike business" : "Like business");
          const label = button.querySelector("[data-business-like-label]") || button.querySelector("span:not(.emy-business-like-icon)");
          if (label) label.textContent = active ? "Liked business" : "Like business";
          const countNode = button.querySelector("[data-business-like-count]");
          if (countNode) {
            countNode.dataset.rawCount = String(count);
            countNode.textContent = formatCount(count);
          }
          if (button.dataset) button.dataset.emyBusinessLikeSynced = "true";
        }
        function sync(root) {
          const scope = root && root.querySelectorAll ? root : document;
          const buttons = [];
          if (scope.matches && scope.matches(BUTTON_SELECTOR)) buttons.push(scope);
          scope.querySelectorAll(BUTTON_SELECTOR).forEach((button) => buttons.push(button));
          if (!buttons.length) return;
          const pairs = readPairs();
          const userId = currentUserId();
          buttons.forEach((button) => {
            const key = businessKeyFor(button);
            if (!key) return;
            setButton(button, key, businessAliasSetFor(button, key), pairs, userId);
          });
        }
        function showLikeToast(message) {
          try {
            if (typeof window.showToast === "function") window.showToast(message);
            else if (typeof window.emyShowToast === "function") window.emyShowToast(message);
          } catch (error) {}
        }
        async function postBusinessLikeToggle(businessId, userId, action) {
          const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action, businessId, userId })
          });
          let payload = {};
          try { payload = await response.json(); } catch (error) {}
          if (!response.ok || !payload || payload.ok !== true) {
            const errorText = payload && payload.error ? payload.error : "Could not update business like.";
            throw new Error(errorText);
          }
          return payload;
        }
        function applyOptimisticPairs(businessId, businessAliases, userId, action) {
          const target = slug(businessId);
          const targets = businessAliases instanceof Set ? businessAliases : new Set([target]);
          const pairs = readPairs();
          const optimistic = pairs.slice();
          if (action === "like") {
            if (!userLiked(optimistic, targets, userId)) {
              optimistic.push({ businessId: target, userId, likedAt: new Date().toISOString() });
            }
          } else {
            for (let index = optimistic.length - 1; index >= 0; index -= 1) {
              const row = optimistic[index];
              if (targets.has(slug(row.businessId)) && userMatches(row.userId, userId)) optimistic.splice(index, 1);
            }
          }
          writePairs(optimistic, true);
          sync(document);
          return optimistic;
        }
        function reconcileFromServer(businessId, businessAliases, userId, result) {
          const target = slug(businessId);
          const targets = businessAliases instanceof Set ? businessAliases : new Set([target]);
          let next = readPairs().filter((row) => !(targets.has(slug(row.businessId)) && userMatches(row.userId, userId)));
          if (result && result.liked) next.push({ businessId: target, userId, likedAt: new Date().toISOString() });
          writePairs(next, true);
          const count = Math.max(0, Number(result && result.cumulativeLikes) || countForBusiness(next, businessId));
          document.querySelectorAll(BUTTON_SELECTOR).forEach((node) => {
            const nodeKey = businessKeyFor(node);
            const nodeAliases = businessAliasSetFor(node, nodeKey);
            if (!nodeAliases.has(target)) return;
            setButton(node, target, nodeAliases, next, userId);
            const countNode = node.querySelector("[data-business-like-count]");
            if (countNode) {
              countNode.dataset.rawCount = String(count);
              countNode.textContent = formatCount(count);
            }
          });
          window.dispatchEvent(new CustomEvent("emy:business-likes-changed", { detail: { source: "business-like-sync", businessId: target, cumulativeLikes: count } }));
        }
        function toggle(button) {
          if (!button) return;
          const businessId = businessKeyFor(button);
          const businessAliases = businessAliasSetFor(button, businessId);
          const userId = currentUserId();
          if (!businessId || !userId) return;
          const requestKey = businessId + "\0" + userId;
          const pairs = readPairs();
          const wasLiked = userLiked(pairs, businessAliases, userId);
          const action = wasLiked ? "unlike" : "like";
          applyOptimisticPairs(businessId, businessAliases, userId, action);
          showLikeToast(action === "like" ? "Business liked." : "Business like removed.");
          const sequence = (pendingSync.get(requestKey) || 0) + 1;
          pendingSync.set(requestKey, sequence);
          postBusinessLikeToggle(businessId, userId, action).then((result) => {
            if (pendingSync.get(requestKey) !== sequence) return;
            reconcileFromServer(businessId, businessAliases, userId, result);
          }).catch((error) => {
            if (pendingSync.get(requestKey) !== sequence) return;
            pairsCache = null;
            sync(document);
            showLikeToast(error && error.message ? error.message : "Business like unavailable offline.");
          });
        }
        document.addEventListener("click", (event) => {
          const button = event.target && event.target.closest && event.target.closest(BUTTON_SELECTOR);
          if (!button) return;
          event.preventDefault();
          event.stopImmediatePropagation();
          toggle(button);
        }, true);
        window.emyToggleBusinessLike = toggle;
        window.emySyncBusinessLikeButtons = sync;
        window.addEventListener("storage", (event) => {
          if (event.key === PAIRS_KEY || event.key === LEGACY_KEY) {
            pairsCache = null;
            sync(document);
          }
        });
        window.addEventListener("emy:business-likes-changed", (event) => {
          if (event && event.detail && event.detail.source === "business-like-sync") return;
          pairsCache = null;
          sync(document);
        });
        if (window.MutationObserver && document.documentElement) {
          new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              mutation.addedNodes && mutation.addedNodes.forEach((node) => {
                if (node && node.nodeType === 1) sync(node);
              });
            });
          }).observe(document.documentElement, { childList: true, subtree: true });
        }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => sync(document), { once: true });
        else sync(document);
        [100, 400, 1000, 2200].forEach((delay) => window.setTimeout(() => sync(document), delay));
      })();
    </script>`;

const sharedProductMascotLikeScript = String.raw`
    <style data-emy-product-mascot-like-style>
      .product-card,
      .feed-product-card,
      .business-preview-product-card,
      .business-live-product-card {
        position: relative;
      }
      .product-card.feed-product-card,
      .feed-list .feed-product-card,
      .annexed-feed-middle .feed-product-card,
      [data-home-static-product-list] > .product-card,
      [data-home-static-product-list] > .feed-product-card,
      .home-flow-list > .product-card.is-product,
      .home-flow-list > .feed-product-card,
      .customer-public-activity-track .feed-product-card,
      .public-business-catalog .feed-product-card,
      .results .feed-product-card {
        width: min(100%, 226px) !important;
        max-width: 226px !important;
        min-width: 0 !important;
        min-height: 0 !important;
        justify-self: start !important;
        align-self: start !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        border-radius: 8px !important;
      }
      body.is-public-customer-shell .public-activity-section .public-business-catalog.is-products > .public-business-product-card.feed-product-card {
        width: 100% !important;
        max-width: none !important;
        justify-self: stretch !important;
        align-self: stretch !important;
      }
      .product-card.feed-product-card .photo,
      .feed-list .feed-product-card .photo,
      .annexed-feed-middle .feed-product-card .photo,
      [data-home-static-product-list] > .product-card .photo,
      [data-home-static-product-list] > .feed-product-card .photo,
      .home-flow-list > .product-card.is-product .photo,
      .home-flow-list > .feed-product-card .photo,
      .customer-public-activity-track .feed-product-card .photo,
      .public-business-catalog .feed-product-card .photo,
      .results .feed-product-card .photo {
        position: relative !important;
        width: auto !important;
        height: auto !important;
        min-height: 0 !important;
        flex: 0 0 auto !important;
        aspect-ratio: 4 / 3 !important;
        margin: 8px 8px 0 !important;
        border-radius: 7px !important;
        overflow: hidden !important;
        background-color: #071326;
        background-size: cover !important;
        background-position: center !important;
      }
      .product-card.feed-product-card .photo img,
      .product-card.feed-product-card .photo video,
      .feed-list .feed-product-card .photo img,
      .feed-list .feed-product-card .photo video,
      .annexed-feed-middle .feed-product-card .photo img,
      .annexed-feed-middle .feed-product-card .photo video,
      [data-home-static-product-list] > .product-card .photo img,
      [data-home-static-product-list] > .product-card .photo video,
      [data-home-static-product-list] > .feed-product-card .photo img,
      [data-home-static-product-list] > .feed-product-card .photo video,
      .home-flow-list > .product-card.is-product .photo img,
      .home-flow-list > .product-card.is-product .photo video,
      .home-flow-list > .feed-product-card .photo img,
      .home-flow-list > .feed-product-card .photo video,
      .customer-public-activity-track .feed-product-card .photo img,
      .customer-public-activity-track .feed-product-card .photo video,
      .public-business-catalog .feed-product-card .photo img,
      .public-business-catalog .feed-product-card .photo video,
      .results .feed-product-card .photo img,
      .results .feed-product-card .photo video {
        position: absolute !important;
        inset: 0 !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: var(--media-fit, cover) !important;
        object-position: center !important;
        transform: translate(var(--media-x,0%), var(--media-y,0%)) scale(var(--media-zoom,1)) !important;
        transform-origin: center !important;
      }
      .product-card.feed-product-card .photo [data-feed-media-carousel],
      .feed-list .feed-product-card .photo [data-feed-media-carousel],
      .annexed-feed-middle .feed-product-card .photo [data-feed-media-carousel],
      [data-home-static-product-list] > .product-card .photo [data-feed-media-carousel],
      [data-home-static-product-list] > .feed-product-card .photo [data-feed-media-carousel],
      .home-flow-list > .product-card.is-product .photo [data-feed-media-carousel],
      .home-flow-list > .feed-product-card .photo [data-feed-media-carousel],
      .customer-public-activity-track .feed-product-card .photo [data-feed-media-carousel],
      .public-business-catalog .feed-product-card .photo [data-feed-media-carousel],
      .results .feed-product-card .photo [data-feed-media-carousel] {
        position: absolute !important;
        inset: 0 !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 0 !important;
        border-radius: inherit !important;
        overflow: hidden !important;
      }
      .product-card.feed-product-card .photo .feed-media-carousel-slide,
      .feed-list .feed-product-card .photo .feed-media-carousel-slide,
      .annexed-feed-middle .feed-product-card .photo .feed-media-carousel-slide,
      [data-home-static-product-list] > .product-card .photo .feed-media-carousel-slide,
      [data-home-static-product-list] > .feed-product-card .photo .feed-media-carousel-slide,
      .home-flow-list > .product-card.is-product .photo .feed-media-carousel-slide,
      .home-flow-list > .feed-product-card .photo .feed-media-carousel-slide,
      .customer-public-activity-track .feed-product-card .photo .feed-media-carousel-slide,
      .public-business-catalog .feed-product-card .photo .feed-media-carousel-slide,
      .results .feed-product-card .photo .feed-media-carousel-slide {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 0 !important;
      }
      .product-card.feed-product-card .body,
      .feed-list .feed-product-card .body,
      .annexed-feed-middle .feed-product-card .body,
      [data-home-static-product-list] > .product-card .body,
      [data-home-static-product-list] > .feed-product-card .body,
      .home-flow-list > .product-card.is-product .body,
      .home-flow-list > .feed-product-card .body,
      .customer-public-activity-track .feed-product-card .body,
      .public-business-catalog .feed-product-card .body,
      .results .feed-product-card .body {
        min-width: 0 !important;
        min-height: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        padding: 14px 12px 12px !important;
      }
      .product-card.feed-product-card h3,
      .feed-list .feed-product-card h3,
      .annexed-feed-middle .feed-product-card h3,
      [data-home-static-product-list] > .product-card h3,
      [data-home-static-product-list] > .feed-product-card h3,
      .home-flow-list > .product-card.is-product h3,
      .home-flow-list > .feed-product-card h3,
      .customer-public-activity-track .feed-product-card h3,
      .public-business-catalog .feed-product-card h3,
      .results .feed-product-card h3 {
        min-height: 0 !important;
        max-width: 24ch !important;
        margin: 0 !important;
        color: var(--emy-navy, #001b47) !important;
        font-size: 14px !important;
        line-height: 1.18 !important;
        font-weight: 850 !important;
        display: -webkit-box !important;
        overflow: hidden !important;
        -webkit-box-orient: vertical !important;
        -webkit-line-clamp: 2 !important;
      }
      body.is-public-customer-shell .public-activity-section .public-business-catalog.is-products > .public-business-product-card.feed-product-card .photo {
        height: 150px !important;
        aspect-ratio: auto !important;
      }
      body.is-public-customer-shell .public-activity-section .public-business-catalog.is-products > .public-business-product-card.feed-product-card .body {
        padding: 12px 10px 10px !important;
      }
      .product-card.feed-product-card p,
      .feed-list .feed-product-card p,
      .annexed-feed-middle .feed-product-card p,
      [data-home-static-product-list] > .product-card p,
      [data-home-static-product-list] > .feed-product-card p,
      .home-flow-list > .product-card.is-product p,
      .home-flow-list > .feed-product-card p,
      .customer-public-activity-track .feed-product-card p,
      .public-business-catalog .feed-product-card p,
      .results .feed-product-card p {
        min-height: 0 !important;
        margin: 5px 0 0 !important;
        color: #5f6f89 !important;
        font-size: 12.5px !important;
        line-height: 1.35 !important;
        font-weight: 540 !important;
        display: -webkit-box !important;
        overflow: hidden !important;
        -webkit-box-orient: vertical !important;
        -webkit-line-clamp: 2 !important;
      }
      .product-card.feed-product-card .product-source,
      .feed-list .feed-product-card .product-source,
      .annexed-feed-middle .feed-product-card .product-source,
      [data-home-static-product-list] > .product-card .product-source,
      [data-home-static-product-list] > .feed-product-card .product-source,
      .home-flow-list > .product-card.is-product .product-source,
      .home-flow-list > .feed-product-card .product-source,
      .customer-public-activity-track .feed-product-card .product-source,
      .public-business-catalog .feed-product-card .product-source,
      .results .feed-product-card .product-source {
        min-height: 20px !important;
        margin-top: 8px !important;
        padding: 0 8px !important;
        border-radius: 999px !important;
        background: #fff4e8 !important;
        color: #d85a00 !important;
        font-size: 11px !important;
        line-height: 1 !important;
        font-weight: 760 !important;
      }
      .product-card.feed-product-card .product-availability,
      .feed-list .feed-product-card .product-availability,
      .annexed-feed-middle .feed-product-card .product-availability,
      [data-home-static-product-list] > .product-card .product-availability,
      [data-home-static-product-list] > .feed-product-card .product-availability,
      .home-flow-list > .product-card.is-product .product-availability,
      .home-flow-list > .feed-product-card .product-availability,
      .customer-public-activity-track .feed-product-card .product-availability,
      .public-business-catalog .feed-product-card .product-availability,
      .results .feed-product-card .product-availability {
        margin-top: 8px !important;
        font-size: 12.5px !important;
        line-height: 1.2 !important;
        font-weight: 850 !important;
      }
      .product-card.feed-product-card .price,
      .feed-list .feed-product-card .price,
      .annexed-feed-middle .feed-product-card .price,
      [data-home-static-product-list] > .product-card .price,
      [data-home-static-product-list] > .feed-product-card .price,
      .home-flow-list > .product-card.is-product .price,
      .home-flow-list > .feed-product-card .price,
      .customer-public-activity-track .feed-product-card .price,
      .public-business-catalog .feed-product-card .price,
      .results .feed-product-card .price {
        width: fit-content !important;
        max-width: 100% !important;
        min-width: 0 !important;
        min-height: 28px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin-top: 0 !important;
        border-radius: 999px !important;
        background: #fff4e8 !important;
        color: #d85a00 !important;
        padding: 0 10px !important;
        font-size: 13px !important;
        line-height: 1 !important;
        font-weight: 900 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
      .emy-product-like-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        min-height: 28px;
        border: 1px solid rgba(255,106,0,.28);
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        color: #d85a00;
        cursor: pointer;
        padding: 3px 8px 3px 5px;
        font: 800 10.5px/1 Inter, Arial, sans-serif;
        letter-spacing: 0;
        box-shadow: 0 9px 20px rgba(255,106,0,.11), 0 6px 14px rgba(0,27,71,.06);
        transition: transform .16s ease, border-color .16s ease, background .16s ease, box-shadow .16s ease;
      }
      .product-card > .emy-product-like-chip,
      .feed-product-card > .emy-product-like-chip,
      .business-preview-product-card > .emy-product-like-chip,
      .business-live-product-card > .emy-product-like-chip {
        position: absolute;
        right: 14px;
        bottom: 28px;
        z-index: 8;
      }
      .product-card .price,
      .feed-product-card .price,
      .business-preview-product-card .price,
      .business-live-product-card .price {
        min-width: 78px;
        min-height: 28px;
        padding: 0 10px;
        font-size: 12px;
        font-weight: 850;
      }
      .emy-product-like-row {
        display: grid;
        justify-items: start;
        align-items: start;
        gap: 8px;
        width: 100%;
        margin-top: 9px;
      }
      .emy-product-like-row .price {
        flex: 0 0 auto;
        margin-top: 0 !important;
        order: 1;
      }
      .emy-product-like-row .emy-product-like-chip {
        position: static !important;
        flex: 0 0 auto;
        margin-left: 0;
        order: 2;
      }
      .product-card .emy-product-like-row,
      .feed-product-card .emy-product-like-row,
      .business-preview-product-card .emy-product-like-row {
        justify-content: start !important;
        justify-items: start !important;
      }
      .product-card .emy-product-like-row .emy-product-like-chip,
      .feed-product-card .emy-product-like-row .emy-product-like-chip,
      .business-preview-product-card .emy-product-like-row .emy-product-like-chip {
        min-height: 28px;
        padding: 0 9px 0 6px;
        font-size: 11px;
        font-weight: 850;
      }
      .emy-product-like-chip:hover {
        transform: translateY(-1px);
        border-color: rgba(255,106,0,.5);
        background: #fff7ef;
        box-shadow: 0 16px 34px rgba(255,106,0,.16), 0 10px 24px rgba(0,27,71,.08);
      }
      .emy-product-like-chip.is-liked {
        border-color: rgba(255,106,0,.42);
        background: #fff4e8;
        color: #c14f00;
      }
      .emy-product-like-icon {
        display: inline-grid;
        place-items: center;
        width: 14px;
        min-width: 14px;
        height: 14px;
        overflow: hidden;
        border-radius: 5px;
      }
      .emy-product-like-bag {
        display: block;
        width: 14px;
        height: 14px;
        overflow: visible;
      }
      .emy-product-like-bag-body {
        fill: #f26100;
      }
      .emy-product-like-bag-handle,
      .emy-product-like-bag-face {
        fill: none;
        stroke: #fff;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .emy-product-like-bag-handle {
        stroke-width: 1.7;
        opacity: .92;
      }
      .emy-product-like-bag-face {
        stroke-width: 1.65;
      }
      .emy-product-like-chip.is-liked .emy-product-like-bag {
        animation: emyProductMascotLikeHello .72s ease-in-out both;
      }
      .emy-product-like-label,
      .emy-product-like-count {
        white-space: nowrap;
      }
      .emy-product-like-count {
        min-width: 8px;
        color: inherit;
        font-weight: 900;
      }
      .emy-product-like-slot {
        display: flex;
        justify-content: flex-end;
        margin: 2px 0 4px;
      }
      .emy-product-like-slot .emy-product-like-chip {
        position: static;
      }
      @keyframes emyProductMascotLikeHello {
        0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
        28% { transform: translateY(-3px) rotate(-8deg) scale(1.08); }
        54% { transform: translateY(1px) rotate(7deg) scale(.98); }
        78% { transform: translateY(-1px) rotate(-3deg) scale(1.03); }
      }
    </style>
    <script data-emy-product-mascot-like-sync>
      (function setupEmyProductMascotLike() {
        if (window.__emyProductMascotLikeInstalled) return;
        window.__emyProductMascotLikeInstalled = true;
        const STORE_KEY = "emyProductMascotLikeState";
        const CHIP_SELECTOR = "[data-emy-product-like-chip]";
        const PRODUCT_CARD_SELECTOR = ".product-card, .feed-product-card, .business-preview-product-card, .business-live-product-card, [data-business-product-id]";
        let activeProductCard = null;
        const clean = (value) => String(value == null ? "" : value).replace(/\s+/g, " ").trim();
        const lower = (value) => clean(value).toLowerCase();
        const slug = (value) => lower(value).replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 160);
        function readMap() {
          try {
            const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
            return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
          } catch (error) {
            return {};
          }
        }
        function writeMap(map, detail) {
          try { localStorage.setItem(STORE_KEY, JSON.stringify(map || {})); } catch (error) {}
          try { window.dispatchEvent(new CustomEvent("emy:feed-action-state-changed", { detail: Object.assign({ key: STORE_KEY }, detail || {}) })); } catch (error) {}
        }
        function textFrom(card, selector) {
          const node = card && card.querySelector && card.querySelector(selector);
          return clean(node && node.textContent);
        }
        function productDetails(card) {
          const data = card && card.dataset ? card.dataset : {};
          const title = clean(data.detailTitle || data.productTitle || data.productName || data.title || textFrom(card, "h3") || textFrom(card, "h2") || textFrom(card, "strong"));
          const business = clean(data.detailBusiness || data.businessName || data.business || data.sellerName || data.businessKey || textFrom(card, ".product-source") || textFrom(card, "[data-business-name]"));
          const description = clean(data.detailDescription || data.productDescription || data.description || textFrom(card, ".body p") || textFrom(card, "p"));
          const kind = clean(data.detailKind || data.kind || data.type || "Product");
          return { title, business, description, kind };
        }
        function isBusinessProductManagementCard(card) {
          if (!card || !card.matches) return false;
          return card.matches(".business-live-product-card,[data-business-product-id]") ||
            !!(card.querySelector && card.querySelector("[data-business-product-edit],[data-business-product-delete],[data-business-product-stats],[data-business-product-pause]"));
        }
        function removeProductLikeChip(card) {
          if (!card || !card.querySelectorAll) return;
          card.querySelectorAll(CHIP_SELECTOR).forEach((chip) => chip.remove());
          card.querySelectorAll("[data-emy-product-like-row]").forEach((row) => {
            if (!row.querySelector(CHIP_SELECTOR) && !row.children.length) row.remove();
          });
        }
        function isLocalPulseCard(card) {
          return !!(card && card.matches && card.matches(".rail-pulse-item"));
        }
        function isProductCard(card) {
          if (!card || !card.matches || card.matches("[data-item-product-panel], .item-product-panel")) return false;
          if (isLocalPulseCard(card)) return false;
          if (isBusinessProductManagementCard(card)) return false;
          const data = card.dataset || {};
          const classText = lower(card.className);
          const kind = lower(data.detailKind || data.kind || data.type);
          const productShell = classText.indexOf("product-card") !== -1 || classText.indexOf("feed-product-card") !== -1 || classText.indexOf("business-preview-product-card") !== -1 || classText.indexOf("business-live-product-card") !== -1 || !!data.businessProductId;
          const postShell = /\b(is-post|post-card|feed-post-card|social-feed-card|home-created-card)\b/.test(classText) || /^(post|article|event|job)$/.test(kind);
          if (!productShell || (postShell && !productShell)) return false;
          return true;
        }
        function unique(values) {
          return Array.from(new Set((values || []).map(clean).filter(Boolean)));
        }
        function uniqueElements(values) {
          const seen = new Set();
          return (values || []).filter((node) => {
            if (!node || seen.has(node)) return false;
            seen.add(node);
            return true;
          });
        }
        function productIds(card) {
          const data = card && card.dataset ? card.dataset : {};
          const details = productDetails(card);
          const values = [
            data.engagementId,
            data.canonicalFeedId,
            data.feedId,
            data.businessProductId,
            data.productId,
            data.detailProductId,
            data.detailId,
            data.productKey,
            data.itemId,
            data.detailTitle,
            data.productName,
            data.productTitle,
            details.title
          ];
          const content = slug([details.kind || "Product", details.business, details.title].filter(Boolean).join(":"));
          const copy = slug([details.business, details.title, details.description].filter(Boolean).join(":"));
          const businessTitle = slug([details.business, details.title].filter(Boolean).join("-"));
          if (content) values.push("emy:" + content, content);
          if (copy) values.push("copy:" + copy, copy);
          if (businessTitle) values.push(businessTitle);
          return unique(values);
        }
        function currentPerson() {
          const role = lower(localStorage.getItem("emyMainSignedInRole") || localStorage.getItem("emyMainRole") || localStorage.getItem("emyMainPendingSignupRole") || "customer") || "customer";
          const email = clean(localStorage.getItem("emyMainSignedInEmail") || localStorage.getItem("emyCustomerEmail") || localStorage.getItem("emyMainPendingSignupEmail"));
          const name = clean(localStorage.getItem("emyMainSignedInName") || localStorage.getItem("emyCustomerName") || localStorage.getItem("emyMainPendingSignupName") || localStorage.getItem("emyMainPendingSignupFirstName") || email || "Customer");
          const key = lower(email || name || "customer");
          return { name, key, email, role, actorType: role, at: new Date().toISOString() };
        }
        function samePerson(row, person) {
          const rowKey = lower(row && (row.key || row.email || row.name));
          return !!rowKey && rowKey === lower(person && (person.key || person.email || person.name));
        }
        function peopleWithCurrent(list, active) {
          const person = currentPerson();
          const rows = (Array.isArray(list) ? list : []).filter((row) => !samePerson(row, person));
          if (active) rows.unshift(person);
          return rows;
        }
        function personCount(list) {
          return (Array.isArray(list) ? list : []).filter(Boolean).length;
        }
        function stateForCard(card, map) {
          const source = map || readMap();
          return productIds(card).reduce((merged, id) => Object.assign(merged, source[id] || {}), {});
        }
        function activeForState(state) {
          const person = currentPerson();
          return (Array.isArray(state && state.likedBy) ? state.likedBy : []).some((row) => samePerson(row, person));
        }
        function countForState(state) {
          const likedBy = Array.isArray(state && state.likedBy) ? state.likedBy : [];
          const base = Math.max(0, Number(state && state.baseLikeCount) || Math.max(0, (Number(state && state.countedLikeCount) || 0) - personCount(likedBy)));
          return Math.max(0, Number(state && state.countedLikeCount) || 0, base + personCount(likedBy), personCount(likedBy));
        }
        function setChip(chip, active, count) {
          if (!chip) return;
          const safeCount = Math.max(0, Number(count) || 0);
          chip.classList.toggle("is-liked", !!active);
          chip.classList.toggle("is-active", !!active);
          chip.setAttribute("aria-pressed", active ? "true" : "false");
          chip.setAttribute("aria-label", active ? "Unlike product" : "Like product");
          const label = chip.querySelector("[data-emy-product-like-label]");
          if (label) label.textContent = active ? "Liked Product" : "Like Product";
          const countNode = chip.querySelector("[data-emy-product-like-count]");
          if (countNode) {
            countNode.dataset.rawCount = String(safeCount);
            countNode.textContent = String(safeCount);
          }
        }
        function chipMarkup() {
          return '<span class="emy-product-like-icon" aria-hidden="true"><svg class="emy-product-like-bag" viewBox="0 0 24 24" focusable="false"><path class="emy-product-like-bag-body" d="M5.8 8.2h12.4l1.2 9.3c.2 1.7-1.1 3.2-2.8 3.2H7.4c-1.7 0-3-1.5-2.8-3.2L5.8 8.2Z"/><path class="emy-product-like-bag-handle" d="M8.6 8.1V6.8A3.4 3.4 0 0 1 12 3.4a3.4 3.4 0 0 1 3.4 3.4v1.3"/><path class="emy-product-like-bag-face" d="M8.9 14.4c.7.9 1.7 1.3 3.1 1.3s2.4-.4 3.1-1.3"/></svg></span><span class="emy-product-like-label" data-emy-product-like-label>Like Product</span><strong class="emy-product-like-count" data-emy-product-like-count data-raw-count="0">0</strong>';
        }
        function createChip() {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "emy-product-like-chip";
          button.setAttribute("data-emy-product-like-chip", "");
          button.setAttribute("aria-pressed", "false");
          button.innerHTML = chipMarkup();
          return button;
        }
        function productCards(root) {
          const scope = root && root.querySelectorAll ? root : document;
          const rows = [];
          if (scope.matches && scope.matches(PRODUCT_CARD_SELECTOR)) {
            if (isLocalPulseCard(scope) || isBusinessProductManagementCard(scope)) removeProductLikeChip(scope);
            else if (isProductCard(scope)) rows.push(scope);
          }
          scope.querySelectorAll(PRODUCT_CARD_SELECTOR).forEach((card) => {
            if (isLocalPulseCard(card) || isBusinessProductManagementCard(card)) {
              removeProductLikeChip(card);
              return;
            }
            if (isProductCard(card)) rows.push(card);
          });
          return uniqueElements(rows);
        }
        function removeStrayProductLikeChips(root) {
          const scope = root && root.querySelectorAll ? root : document;
          scope.querySelectorAll(CHIP_SELECTOR).forEach((chip) => {
            if (chip.closest("[data-item-product-panel], .item-product-panel")) return;
            const card = chip.closest(PRODUCT_CARD_SELECTOR);
            if (card && isProductCard(card)) return;
            const row = chip.closest("[data-emy-product-like-row]");
            chip.remove();
            if (row && !row.querySelector(CHIP_SELECTOR) && !row.children.length) row.remove();
          });
        }
        function ensureCardChip(card) {
          if (!card || !card.appendChild) return;
          if (isLocalPulseCard(card)) {
            removeProductLikeChip(card);
            return;
          }
          if (isBusinessProductManagementCard(card)) {
            removeProductLikeChip(card);
            return;
          }
          const body = card.querySelector(":scope > .body") || card.querySelector(".body");
          if (!body || card.matches("[data-item-product-panel], .item-product-panel")) {
            if (!card.querySelector(":scope > " + CHIP_SELECTOR)) card.appendChild(createChip());
            return;
          }
          let row = body.querySelector(":scope > .emy-product-like-row");
          if (!row) {
            row = document.createElement("div");
            row.className = "emy-product-like-row";
            row.setAttribute("data-emy-product-like-row", "");
            const price = body.querySelector(":scope > .price");
            if (price) body.insertBefore(row, price);
            else body.appendChild(row);
          }
          const price = body.querySelector(":scope > .price");
          if (price && price.parentNode !== row) row.insertBefore(price, row.firstChild);
          let chip = row.querySelector(":scope > " + CHIP_SELECTOR) || card.querySelector(":scope > " + CHIP_SELECTOR) || card.querySelector(CHIP_SELECTOR);
          if (!chip) chip = createChip();
          if (chip.parentNode !== row) row.appendChild(chip);
        }
        function findCardForOpenDetail() {
          if (activeProductCard && document.documentElement.contains(activeProductCard)) return activeProductCard;
          const modal = document.querySelector(".item-detail-modal.is-open, [data-item-detail-modal].is-open");
          if (!modal) return null;
          const title = clean(modal.querySelector("[data-item-detail-title], h2") && modal.querySelector("[data-item-detail-title], h2").textContent);
          const business = clean(modal.querySelector("[data-item-detail-business], [data-item-product-seller]") && modal.querySelector("[data-item-detail-business], [data-item-product-seller]").textContent);
          return productCards(document).find((card) => {
            const details = productDetails(card);
            return (!title || lower(details.title) === lower(title)) && (!business || lower(details.business) === lower(business));
          }) || null;
        }
        function ensureDetailChip() {
          const panel = document.querySelector(".item-detail-modal.is-open [data-item-product-panel]:not([hidden]), [data-item-detail-modal].is-open [data-item-product-panel]:not([hidden])");
          if (!panel) return;
          const detailSlot = panel.querySelector("[data-emy-product-like-slot]");
          if (detailSlot) detailSlot.remove();
          return;
          const modal = panel.closest(".item-detail-modal,[data-item-detail-modal]");
          if ((activeProductCard && isBusinessProductManagementCard(activeProductCard)) || (modal && modal.classList.contains("is-owned-product"))) {
            const existingSlot = panel.querySelector("[data-emy-product-like-slot]");
            if (existingSlot) existingSlot.remove();
            return;
          }
          let slot = panel.querySelector("[data-emy-product-like-slot]");
          if (!slot) {
            slot = document.createElement("div");
            slot.className = "emy-product-like-slot";
            slot.setAttribute("data-emy-product-like-slot", "");
            slot.appendChild(createChip());
            const specs = panel.querySelector("[data-item-product-specs]");
            if (specs && specs.parentNode) specs.parentNode.insertBefore(slot, specs.nextSibling);
            else panel.insertBefore(slot, panel.firstChild || null);
          }
        }
        function syncCard(card) {
          if (!card) return;
          const state = stateForCard(card);
          const active = activeForState(state);
          const count = countForState(state);
          card.querySelectorAll(CHIP_SELECTOR).forEach((chip) => setChip(chip, active, count));
        }
        function syncAll(root) {
          removeStrayProductLikeChips(root);
          productCards(root).forEach((card) => {
            ensureCardChip(card);
            syncCard(card);
          });
          ensureDetailChip();
          const detailCard = findCardForOpenDetail();
          if (detailCard) {
            const state = stateForCard(detailCard);
            const active = activeForState(state);
            const count = countForState(state);
            document.querySelectorAll(".item-detail-modal.is-open " + CHIP_SELECTOR + ", [data-item-detail-modal].is-open " + CHIP_SELECTOR).forEach((chip) => setChip(chip, active, count));
          }
        }
        function toggleLike(card) {
          if (!card) return;
          const ids = productIds(card);
          if (!ids.length) return;
          const map = readMap();
          const state = stateForCard(card, map);
          const wasActive = activeForState(state);
          const likedBy = peopleWithCurrent(state.likedBy, !wasActive);
          const base = Math.max(0, Number(state.baseLikeCount) || Math.max(0, (Number(state.countedLikeCount) || 0) - personCount(state.likedBy)));
          const patch = {
            liked: false,
            baseLikeCount: base,
            countedLikeCount: base + personCount(likedBy),
            likedBy,
            updatedAt: new Date().toISOString()
          };
          ids.forEach((id) => { map[id] = Object.assign({}, map[id] || {}, patch); });
          writeMap(map, { action: "product-like", ids });
          syncAll(document);
          try {
            const message = wasActive ? "Product like removed." : "Product liked.";
            if (typeof window.showToast === "function") window.showToast(message);
            else if (typeof window.emyShowToast === "function") window.emyShowToast(message);
          } catch (error) {}
        }
        document.addEventListener("click", (event) => {
          const card = event.target && event.target.closest && event.target.closest(PRODUCT_CARD_SELECTOR);
          if (card && isBusinessProductManagementCard(card)) {
            removeProductLikeChip(card);
            return;
          }
          if (card && isProductCard(card)) activeProductCard = card;
          const chip = event.target && event.target.closest && event.target.closest(CHIP_SELECTOR);
          if (!chip) return;
          event.preventDefault();
          event.stopPropagation();
          if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
          toggleLike(chip.closest(PRODUCT_CARD_SELECTOR) || findCardForOpenDetail());
        }, true);
        window.addEventListener("storage", (event) => {
          if (!event || event.key === STORE_KEY) syncAll(document);
        });
        window.addEventListener("emy:feed-action-state-changed", () => syncAll(document));
        if (window.MutationObserver && document.documentElement) {
          new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              mutation.addedNodes && mutation.addedNodes.forEach((node) => {
                if (node && node.nodeType === 1) syncAll(node);
              });
            });
          }).observe(document.documentElement, { childList: true, subtree: true });
        }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => syncAll(document), { once: true });
        else syncAll(document);
        [120, 400, 1000, 2000].forEach((delay) => window.setTimeout(() => syncAll(document), delay));
      })();
    </script>`;

const sharedPostProfileCircleRemovalStyle = String.raw`
    <style data-emy-post-profile-circle-removal-style>
      :where(
        .social-feed-avatar,
        .feed-avatar,
        .post-avatar,
        .feed-create-brand-mark,
        [data-feed-actor-avatar],
        .reel-avatar,
        .search-reel-avatar,
        .business-preview-post-avatar,
        .home-created-avatar,
        .home-owned-avatar,
        .business-owned-avatar,
        .my-business-update-avatar,
        .rail-pulse-media,
        .feed-job-business > i,
        .feed-comment-avatar,
        .item-product-comment-avatar,
        .clip-viewer-comment-avatar
      ).emy-avatar-shape-applied {
        display: inline-grid !important;
        visibility: visible !important;
        opacity: 1 !important;
        place-items: center !important;
        flex: 0 0 auto !important;
        width: var(--emy-post-avatar-size, 42px) !important;
        min-width: var(--emy-post-avatar-size, 42px) !important;
        height: var(--emy-post-avatar-size, 42px) !important;
        overflow: hidden !important;
        background: #fff !important;
        color: var(--navy, #001b47) !important;
        box-shadow: inset 0 0 0 1px rgba(0, 27, 71, .08) !important;
      }
      .social-feed-head > :where(.social-feed-avatar, .feed-avatar),
      .social-feed-head :where(.social-feed-avatar, .feed-avatar),
      .post-head > .post-avatar,
      .post-head .post-avatar,
      .reel-top > .reel-avatar,
      .search-reel-top > .search-reel-avatar,
      .home-created-top > .home-created-avatar,
      .feed-job-business > i {
        display: inline-grid !important;
        visibility: visible !important;
        opacity: 1 !important;
        flex: 0 0 auto !important;
      }
      :where(
        .social-feed-avatar,
        .feed-avatar,
        .post-avatar,
        .feed-create-brand-mark,
        [data-feed-actor-avatar],
        .reel-avatar,
        .search-reel-avatar,
        .business-preview-post-avatar,
        .home-created-avatar
      ).emy-avatar-shape-applied {
        --emy-post-avatar-size: 44px;
      }
      :where(
        .home-owned-avatar,
        .business-owned-avatar,
        .my-business-update-avatar,
        .rail-pulse-media,
        .feed-job-business > i
      ).emy-avatar-shape-applied {
        --emy-post-avatar-size: 38px;
      }
      :where(
        .feed-comment-avatar,
        .item-product-comment-avatar,
        .clip-viewer-comment-avatar
      ).emy-avatar-shape-applied {
        --emy-post-avatar-size: 32px;
      }
      .emy-avatar-shape-customer {
        border-radius: 999px !important;
      }
      .emy-avatar-shape-business {
        border-radius: 10px !important;
      }
      .emy-avatar-shape-applied:not(.has-image) {
        color: #08224d !important;
        font-weight: 850 !important;
        text-shadow: none !important;
      }
      .emy-avatar-shape-applied > img,
      .emy-avatar-shape-applied picture,
      .emy-avatar-shape-applied picture > img {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: inherit !important;
        object-fit: cover !important;
      }
      .emy-avatar-shape-applied svg,
      .emy-avatar-shape-applied .avatar-img,
      .emy-avatar-shape-applied .avatar-image {
        border-radius: inherit !important;
      }
      .social-feed-head,
      .post-head,
      .business-preview-post-head,
      .business-preview-post-owner,
      .home-created-top {
        grid-template-columns: auto minmax(0, 1fr) auto !important;
        column-gap: 12px !important;
        align-items: center !important;
      }
      .feed-post-head {
        grid-template-columns: auto minmax(0, 1fr) 38px !important;
        column-gap: 12px !important;
        align-items: center !important;
      }
      .feed-card-head .feed-profile-link,
      .reel-top,
      .search-reel-top,
      .home-owned-divider-inner,
      .business-owned-divider-inner,
      .my-business-update,
      .rail-pulse-item {
        grid-template-columns: auto minmax(0, 1fr) !important;
        column-gap: 10px !important;
        align-items: center !important;
      }
      .feed-comment,
      .feed-comment-reply,
      .item-product-comment-preview,
      .item-product-comment-row,
      .item-product-comment-reply-row,
      .clip-viewer-comment,
      .clip-viewer-comment-reply {
        grid-template-columns: auto minmax(0, 1fr) !important;
        column-gap: 10px !important;
      }
      .feed-job-business {
        gap: 10px !important;
      }
      .social-feed-head .social-feed-name,
      .feed-card-head .feed-profile-link,
      .post-head,
      .business-preview-post-head,
      .business-preview-post-owner,
      .home-created-top,
      .reel-top,
      .search-reel-top {
        min-width: 0 !important;
      }
    </style>`;

const sharedPostProfileCircleRemovalScript = String.raw`
    <script data-emy-post-profile-circle-removal>
(function shapeEmyPostProfileAvatars() {
        if (window.__emyPostProfileCircleRemovalInstalled) return;
        window.__emyPostProfileCircleRemovalInstalled = true;
        const avatarSelector = [
          ".social-feed-head > .social-feed-avatar",
          ".social-feed-head > .feed-avatar",
          ".social-feed-head .social-feed-avatar",
          ".social-feed-head .feed-avatar",
          ".feed-card-head .feed-avatar",
          ".post-head > .post-avatar",
          ".post-head .post-avatar",
          ".feed-post-head > .feed-create-brand-mark",
          ".feed-post-head > [data-feed-actor-avatar]",
          ".feed-post-head .feed-create-brand-mark",
          ".feed-post-head [data-feed-actor-avatar]",
          ".reel-top > .reel-avatar",
          ".search-reel-top > .search-reel-avatar",
          ".business-preview-post-head > .business-preview-post-avatar",
          ".business-preview-post-head .business-preview-post-avatar",
          ".business-preview-post-owner > .business-preview-post-avatar",
          ".business-preview-post-owner .business-preview-post-avatar",
          ".home-created-top > .home-created-avatar",
          ".home-created-top .home-created-avatar",
          ".home-owned-divider-inner > .home-owned-avatar",
          ".business-owned-divider-inner > .business-owned-avatar",
          ".my-business-update > .my-business-update-avatar",
          ".rail-pulse-item > .rail-pulse-media",
          ".feed-job-business > i",
          ".feed-comment > .feed-comment-avatar",
          ".feed-comment-reply > .feed-comment-avatar",
          ".item-product-comment-preview > .item-product-comment-avatar",
          ".item-product-comment-row > .item-product-comment-avatar",
          ".item-product-comment-reply-row > .item-product-comment-avatar",
          ".clip-viewer-comment > .clip-viewer-comment-avatar",
          ".clip-viewer-comment-reply > .clip-viewer-comment-avatar"
        ].join(",");
        const ownerSelector = [
          ".social-feed-head",
          ".feed-card-head",
          ".post-head",
          ".feed-post-head",
          ".reel-top",
          ".search-reel-top",
          ".business-preview-post-head",
          ".business-preview-post-owner",
          ".home-created-top",
          ".home-owned-divider-inner",
          ".business-owned-divider-inner",
          ".my-business-update",
          ".rail-pulse-item",
          ".feed-job-business",
          ".feed-comment",
          ".feed-comment-reply",
          ".item-product-comment-preview",
          ".item-product-comment-row",
          ".item-product-comment-reply-row",
          ".clip-viewer-comment",
          ".clip-viewer-comment-reply"
        ].join(",");
        const cardSelector = [
          "[data-card]",
          "[data-feed-id]",
          "[data-business-key]",
          "[data-owner]",
          "[data-owner-type]",
          "[data-actor-type]",
          "[data-account-type]",
          "[data-created-as]",
          "[data-profile-href]",
          ".feed-card",
          ".social-feed-card",
          ".feed-job-card",
          ".job-card",
          ".business-card",
          ".business-preview-card",
          ".home-created-card",
          ".is-user-post"
        ].join(",");
        const businessAvatarSelector = [
          ".business-avatar",
          ".my-business-avatar",
          ".business-preview-post-avatar",
          ".business-top-avatar",
          ".business-owned-avatar",
          ".business-profile-hub-avatar",
          ".feed-business-profile-avatar",
          ".item-business-avatar",
          ".feed-job-business > i",
          "[data-business-link]",
          "[data-business-owned-avatar]",
          "[data-business-top-avatar]"
        ].join(",");
        const customerAvatarSelector = [
          ".home-created-avatar",
          ".profile-record-avatar",
          ".customer-avatar",
          ".customer-profile-avatar",
          ".feed-comment-avatar",
          ".item-product-comment-avatar",
          ".clip-viewer-comment-avatar"
        ].join(",");
        const fallbackStyleText = [
          ".social-feed-head>.social-feed-avatar,.social-feed-head>.feed-avatar,.social-feed-head .social-feed-avatar,.social-feed-head .feed-avatar,.post-head>.post-avatar,.post-head .post-avatar,.reel-top>.reel-avatar,.search-reel-top>.search-reel-avatar,.home-created-top>.home-created-avatar,.feed-job-business>i{display:inline-grid!important;visibility:visible!important;opacity:1!important;flex:0 0 auto!important}",
          ".emy-avatar-shape-applied{display:inline-grid!important;visibility:visible!important;opacity:1!important;place-items:center!important;flex:0 0 auto!important;width:var(--emy-post-avatar-size,42px)!important;min-width:var(--emy-post-avatar-size,42px)!important;height:var(--emy-post-avatar-size,42px)!important;overflow:hidden!important;background:#fff!important;box-shadow:inset 0 0 0 1px rgba(0,27,71,.08)!important}",
          ".emy-avatar-shape-customer{border-radius:999px!important}",
          ".emy-avatar-shape-business{border-radius:10px!important}",
          ".emy-avatar-shape-applied:not(.has-image){color:#08224d!important;font-weight:850!important;text-shadow:none!important}",
          ".emy-avatar-shape-applied>img,.emy-avatar-shape-applied picture,.emy-avatar-shape-applied picture>img{display:block!important;visibility:visible!important;opacity:1!important;width:100%!important;height:100%!important;border-radius:inherit!important;object-fit:cover!important}"
        ].join("");
        function installStyle() {
          if (document.querySelector("style[data-emy-post-profile-circle-removal-style]")) return;
          const style = document.createElement("style");
          style.setAttribute("data-emy-post-profile-circle-removal-style", "true");
          style.textContent = fallbackStyleText;
          document.head.appendChild(style);
        }
        function textIncludesBusiness(value) {
          return /business|company|shop|store|brand/.test(String(value || "").toLowerCase());
        }
        function textIncludesCustomer(value) {
          return /customer|customer-profile|emy-customer-profile|person|people|user|member|profile-record|your-post|is-user-post/.test(String(value || "").toLowerCase());
        }
        function getHref(node) {
          const direct = node && node.matches && node.matches("a[href]") ? node : null;
          const closest = !direct && node && node.closest ? node.closest("a[href]") : null;
          const owner = node && node.closest ? node.closest(ownerSelector) : null;
          const nearby = owner && owner.querySelector ? owner.querySelector(".feed-profile-link[href],.social-feed-name[href],.business-preview-post-link[href],a[href]") : null;
          const link = direct || closest || nearby;
          return link && link.getAttribute ? String(link.getAttribute("href") || "") : "";
        }
        function getOwnerCard(node) {
          return node && node.closest ? node.closest(cardSelector) : null;
        }
        function cleanAvatarText(value) {
          return String(value || "").replace(/\s+/g, " ").trim();
        }
        function fallbackInitialFromOwner(node, business) {
          const owner = node && node.closest ? node.closest(ownerSelector) : null;
          const card = getOwnerCard(node);
          const pieces = [];
          const push = (value) => {
            const text = cleanAvatarText(value);
            if (text) pieces.push(text);
          };
          const pushNode = (target) => {
            if (!target) return;
            if (target.dataset) {
              [
                "avatarInitial",
                "owner",
                "ownerName",
                "actorName",
                "customerName",
                "businessName",
                "businessKey",
                "feedCreateActor"
              ].forEach((key) => push(target.dataset[key]));
            }
            if (target.getAttribute) {
              ["aria-label", "title", "data-owner", "data-business-key", "data-customer-name", "data-business-name"].forEach((attr) => push(target.getAttribute(attr)));
            }
          };
          const pushSelectedText = (target) => {
            if (!target || !target.querySelector) return;
            [
              "[data-feed-create-actor]",
              "[data-feed-article-actor]",
              "[data-feed-article-publish-actor]",
              ".social-feed-name strong",
              ".feed-profile-link strong",
              ".post-head strong",
              ".reel-owner-link strong",
              ".business-preview-post-owner strong",
              ".home-created-top strong",
              ".profile-record-copy h3",
              ".feed-job-business span",
              "strong"
            ].some((selector) => {
              const found = target.querySelector(selector);
              push(found && found.textContent);
              return !!cleanAvatarText(found && found.textContent);
            });
          };
          pushNode(node);
          pushNode(owner);
          pushNode(card);
          pushSelectedText(owner);
          pushSelectedText(card);
          push(owner && owner.textContent);
          push(card && card.textContent);
          const label = cleanAvatarText(pieces[0] || "");
          return (label.charAt(0) || (business ? "B" : "E")).toUpperCase();
        }
        function restoreBlankAvatarInitial(node, business) {
          if (!node || !node.classList) return;
          const hasMedia = !!(node.querySelector && node.querySelector("img,picture,video"));
          if (hasMedia || cleanAvatarText(node.textContent)) return;
          node.textContent = fallbackInitialFromOwner(node, business);
        }
        function attrText(node) {
          if (!node || !node.getAttribute) return "";
          return [
            node.getAttribute("data-owner"),
            node.getAttribute("data-owner-type"),
            node.getAttribute("data-actor-type"),
            node.getAttribute("data-account-type"),
            node.getAttribute("data-created-as"),
            node.getAttribute("data-profile-type"),
            node.getAttribute("data-profile-href"),
            node.getAttribute("data-business-key"),
            node.getAttribute("data-repost-actor-type"),
            node.className && typeof node.className === "string" ? node.className : ""
          ].join(" ");
        }
        function hasCustomerSignal(node) {
          if (!node || !node.matches) return false;
          const href = getHref(node).toLowerCase();
          if (href.indexOf("emy-customer-profile") !== -1 || href.indexOf("customer-profile") !== -1) return true;
          if (node.matches(customerAvatarSelector)) return true;
          if (textIncludesCustomer(attrText(node))) return true;
          const owner = node.closest && node.closest(ownerSelector);
          if (owner && textIncludesCustomer(attrText(owner))) return true;
          const card = getOwnerCard(node);
          if (card) {
            const cardText = attrText(card);
            if (card.classList && card.classList.contains("is-user-post")) return true;
            if (textIncludesCustomer(cardText)) return true;
            const cardHref = String(card.getAttribute && (card.getAttribute("data-profile-href") || "") || "").toLowerCase();
            if (cardHref.indexOf("emy-customer-profile") !== -1) return true;
            const headLink = card.querySelector && card.querySelector(".social-feed-head a[href],.reel-top a[href],.feed-profile-link[href]");
            const headHref = headLink && headLink.getAttribute ? String(headLink.getAttribute("href") || "").toLowerCase() : "";
            if (headHref.indexOf("emy-customer-profile") !== -1 || headHref.indexOf("customer-profile") !== -1) return true;
          }
          return false;
        }
        function hasBusinessSignal(node) {
          if (!node || !node.matches) return false;
          if (hasCustomerSignal(node)) return false;
          if (node.matches(businessAvatarSelector)) return true;
          if (node.hasAttribute && node.hasAttribute("data-business-link")) return true;
          const href = getHref(node).toLowerCase();
          if (href.indexOf("emy-business-profile") !== -1 || href.indexOf("mode=business") !== -1 || href.indexOf("business=") !== -1) return true;
          const owner = node.closest && node.closest(ownerSelector);
          if (owner) {
            if (textIncludesCustomer(attrText(owner))) return false;
            if (owner.querySelector && owner.querySelector("[data-business-link]")) return true;
            const attrs = attrText(owner);
            if (textIncludesBusiness(attrs)) return true;
            if (textIncludesCustomer(attrs)) return false;
          }
          const card = getOwnerCard(node);
          if (card) {
            const attrs = attrText(card);
            if (textIncludesBusiness(attrs)) return true;
            if (textIncludesCustomer(attrs)) return false;
            if (card.hasAttribute && card.hasAttribute("data-business-id")) return true;
            if (card.matches(".business-profile,.business-card,.business-preview-card")) return true;
            if (href.indexOf("emy-business-profile") !== -1 || href.indexOf("mode=business") !== -1 || href.indexOf("business=") !== -1) return true;
          }
          return false;
        }
        function isBusinessAvatar(node) {
          if (!node || !node.matches) return false;
          const href = getHref(node).toLowerCase();
          if (hasCustomerSignal(node)) return false;
          if (node.matches(customerAvatarSelector) && href.indexOf("emy-business-profile") === -1 && !node.matches(businessAvatarSelector)) return false;
          return hasBusinessSignal(node);
        }
        function revealAvatar(node) {
          if (!node || !node.classList) return;
          const owner = node.closest && node.closest(ownerSelector);
          if (owner && owner.classList) owner.classList.remove("emy-post-circle-removed");
          node.hidden = false;
          node.style && node.style.removeProperty && node.style.removeProperty("display");
          node.removeAttribute && node.removeAttribute("aria-hidden");
          const business = isBusinessAvatar(node);
          node.classList.add("emy-avatar-shape-applied");
          node.classList.toggle("emy-avatar-shape-business", business);
          node.classList.toggle("emy-avatar-shape-customer", !business);
          restoreBlankAvatarInitial(node, business);
        }
        function scrub(root) {
          installStyle();
          const scope = root && root.querySelectorAll ? root : document;
          if (scope.matches && scope.matches(avatarSelector)) revealAvatar(scope);
          scope.querySelectorAll(avatarSelector).forEach(revealAvatar);
          if (scope.matches && scope.matches(ownerSelector)) scope.classList.remove("emy-post-circle-removed");
        }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => scrub(document), { once: true });
        else scrub(document);
        [120, 500, 1200, 2500].forEach((delay) => window.setTimeout(() => scrub(document), delay));
      })();
    </script>`;

const sharedSocialEngagementDisabledScript = "";

function emyTestingLauncherHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY Testing Lane</title>
    <script>
      (() => {
        try {
          localStorage.setItem("emyLocalDevAccess", "1");
          localStorage.setItem("emyTestModeEnabled", "true");
          localStorage.setItem("emyMainSignedInRole", "customer");
          localStorage.setItem("emyMainPendingSignupRole", "customer");
          localStorage.setItem("emyMainSignedInEmail", "test.customer@emy.local");
          localStorage.setItem("emyMainPendingSignupEmail", "test.customer@emy.local");
          localStorage.setItem("emyCustomerEmail", "test.customer@emy.local");
          localStorage.setItem("emyCustomerDisplayName", "EMY Test Customer");
          localStorage.setItem("emyCustomerFirstName", "EMY");
          localStorage.setItem("emyCustomerLastName", "Tester");
          localStorage.removeItem("emyMainSignedOut");
        } catch (error) {}
      })();
    </script>
    <style>
      :root { color-scheme: light; --navy:#001b47; --orange:#ff6200; --line:#e4e8f0; --muted:#66728a; }
      * { box-sizing: border-box; }
      body { margin:0; min-height:100vh; font-family: Inter, Arial, sans-serif; color:var(--navy); background:#fffaf4; }
      main { width:min(920px, calc(100% - 32px)); margin:0 auto; padding:56px 0; }
      .shell { background:#fff; border:1px solid var(--line); border-radius:24px; box-shadow:0 24px 80px rgba(0,27,71,.10); overflow:hidden; }
      .head { padding:32px; border-top:5px solid var(--orange); border-bottom:1px solid var(--line); }
      h1 { margin:0 0 10px; font-size:clamp(30px, 5vw, 54px); line-height:1; letter-spacing:0; }
      p { margin:0; color:var(--muted); font-weight:700; line-height:1.45; }
      .grid { display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:14px; padding:24px; }
      a { min-height:94px; display:flex; flex-direction:column; justify-content:center; gap:8px; padding:20px; border:1px solid var(--line); border-radius:18px; text-decoration:none; color:var(--navy); background:#fff; }
      a:hover { border-color:rgba(255,98,0,.55); box-shadow:0 18px 34px rgba(255,98,0,.12); }
      strong { font-size:18px; }
      small { color:var(--muted); font-weight:800; line-height:1.35; }
      .note { padding:0 24px 24px; }
      code { padding:2px 6px; border-radius:8px; background:#f5f7fb; color:#102b5c; }
      @media (max-width:720px) { main { padding:24px 0; } .head { padding:24px; } .grid { grid-template-columns:1fr; padding:18px; } .note { padding:0 18px 18px; } }
    </style>
  </head>
  <body>
    <main>
      <section class="shell">
        <div class="head">
          <h1>EMY Testing Lane</h1>
          <p>Open this page from your local EMY server (for example <code id="emy-test-lane-url">127.0.0.1</code>). Links stay on the same port so you always test the build you just generated.</p>
        </div>
        <div class="grid">
          <a href="emy-customer-home.html#feeds"><strong>Customer Feeds</strong><small>Open the customer feed with test storage and no sign-in.</small></a>
          <a href="emy-customer-home.html"><strong>Customer Home</strong><small>Test Nearby, Feeds, Clips, and the rest of customer home.</small></a>
          <a href="emy-customer-search.html"><strong>Customer Search</strong><small>Check products, clips, posts, and business search results.</small></a>
          <a href="emy-business-profile.html"><strong>Business Profile</strong><small>Use this for business-side testing in the same lane.</small></a>
        </div>
        <p class="note">Customer pages show a small <strong>Test mode</strong> bar with <strong>Clean media</strong> and <strong>Reset</strong>. Use port <code>8001</code> (<code>npm run serve:test</code>) when you want storage isolated from port <code>8767</code>.</p>
        <script>
          (() => {
            const label = document.getElementById("emy-test-lane-url");
            if (!label) return;
            label.textContent = location.host || "127.0.0.1";
          })();
        </script>
      </section>
    </main>
  </body>
</html>`;
}

const realDataGuardPages = new Set([
  'emy-business-profile.html',
  'emy-customer-home.html',
  'emy-customer-search.html',
  'emy-customer-feeds.html',
  'emy-customer-profile.html',
  'emy-customer-chat.html',
  'emy-notification-settings.html'
]);

const notificationRouterPages = new Set([
  'emy-business-profile.html',
  'emy-customer-home.html',
  'emy-customer-search.html',
  'emy-customer-feeds.html',
  'emy-customer-profile.html',
  'emy-customer-chat.html',
  'emy-notification-settings.html'
]);

const sharedPortContentPages = new Set([
  'emy-business-profile.html',
  'emy-customer-home.html',
  'emy-customer-search.html',
  'emy-customer-feeds.html',
  'emy-customer-profile.html',
  'emy-customer-chat.html',
  'emy-notification-settings.html',
  'emy-admin-backend.html'
]);

const pageBootGatePages = new Set([
  'ask-emy.html',
  'ask-emy-results.html',
  'emy-business-profile.html',
  'emy-customer-search.html',
  'emy-customer-feeds.html',
  'emy-customer-chat.html',
  'emy-customer-profile.html',
  'emy-notification-settings.html',
  'emy-admin-backend.html'
]);

const centralEngagementPages = new Set([
  'emy-business-profile.html',
  'emy-customer-home.html',
  'emy-customer-search.html',
  'emy-customer-feeds.html',
  'emy-customer-profile.html'
]);

const realBackendPages = new Set([
  'emy-signin.html',
  'emy-signup.html',
  'emy-forgot-password.html',
  'emy-confirmation.html',
  'emy-business-profile.html',
  'emy-customer-home.html',
  'emy-customer-search.html',
  'emy-customer-feeds.html',
  'emy-customer-profile.html',
  'emy-customer-chat.html',
  'emy-notification-settings.html',
  'emy-admin-backend.html'
]);

let sharedEmyRealBackendLoaderScript = "";
let sharedEmyRealBackendNonBlockingLoaderScript = "";

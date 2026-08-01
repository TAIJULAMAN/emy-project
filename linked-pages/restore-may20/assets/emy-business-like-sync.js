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

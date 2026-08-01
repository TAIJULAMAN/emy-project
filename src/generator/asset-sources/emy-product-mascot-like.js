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

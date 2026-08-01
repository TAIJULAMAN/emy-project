(function setupCustomerHomeClipMascotLike() {
      if (window.__emyCustomerHomeClipMascotLikeInstalled) return;
      window.__emyCustomerHomeClipMascotLikeInstalled = true;
      const STORE_KEY = "emyFeedActionState";
      const CHIP_SELECTOR = "[data-clip-like-toggle]";
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
      function writeMap(map) {
        try { localStorage.setItem(STORE_KEY, JSON.stringify(map || {})); } catch (error) {}
        try { window.dispatchEvent(new CustomEvent("emy:feed-action-state-changed", { detail: { key: STORE_KEY } })); } catch (error) {}
      }
      function actor() {
        const role = lower(localStorage.getItem("emyMainSignedInRole") || localStorage.getItem("emyMainRole") || localStorage.getItem("emyMainPendingSignupRole") || "customer") || "customer";
        const email = clean(localStorage.getItem("emyMainSignedInEmail") || localStorage.getItem("emyCustomerEmail") || localStorage.getItem("emyMainPendingSignupEmail"));
        const name = clean(localStorage.getItem("emyMainSignedInName") || localStorage.getItem("emyCustomerName") || localStorage.getItem("emyMainPendingSignupName") || localStorage.getItem("emyMainPendingSignupFirstName") || email || "Customer");
        return { name, email, key: lower(email || name || "customer"), role, actorType: role, at: new Date().toISOString() };
      }
      function samePerson(row, person) {
        return !!row && !!person && lower(row.key || row.email || row.name) === lower(person.key || person.email || person.name);
      }
      function textFrom(root, selector) {
        const node = root && root.querySelector && root.querySelector(selector);
        return clean(node && node.textContent);
      }
      function slideInfo(slide) {
        return {
          key: clean(slide && slide.dataset && slide.dataset.clipKey),
          title: textFrom(slide, ".clip-viewer-caption h3") || textFrom(slide, ".clip-viewer-info h3"),
          business: clean(slide && slide.dataset && slide.dataset.clipBusinessName) || textFrom(slide, ".clip-viewer-caption small") || textFrom(slide, ".clip-viewer-profile strong"),
          index: clean(slide && slide.dataset && slide.dataset.clipSlide)
        };
      }
      function sourceCardForSlide(slide) {
        const info = slideInfo(slide);
        const titleKey = lower(info.title);
        const businessKey = lower(info.business);
        const cards = Array.from(document.querySelectorAll(".reel-card,.feed-card,.feed-clip-card,.feed-product-clip-card,.business-preview-card-reel,[data-detail-kind]"));
        return cards.find((card) => {
          if (card.closest && card.closest("[data-clip-viewer-modal],.clip-viewer-modal")) return false;
          const data = card.dataset || {};
          const kind = lower(data.detailKind || data.kind || card.className);
          if (!/clip|reel/.test(kind)) return false;
          const cardTitle = lower(data.detailTitle || textFrom(card, "h3") || textFrom(card, "strong"));
          const cardBusiness = lower(data.detailBusiness || data.businessName || data.businessKey || textFrom(card, ".reel-business,.social-feed-name strong,.feed-business-profile-name,.body p"));
          return (!titleKey || cardTitle === titleKey || cardTitle.includes(titleKey) || titleKey.includes(cardTitle)) &&
            (!businessKey || !cardBusiness || cardBusiness === businessKey || cardBusiness.includes(businessKey) || businessKey.includes(cardBusiness));
        }) || null;
      }
      function idsFor(slide, card) {
        const info = slideInfo(slide);
        const data = card && card.dataset ? card.dataset : {};
        const values = [
          info.key,
          data.engagementId,
          data.canonicalFeedId,
          data.feedId,
          data.detailId,
          data.detailTitle,
          data.productName,
          data.productTitle
        ];
        if (window.emyEngagement && typeof window.emyEngagement.idsForCard === "function" && card) {
          try { values.push.apply(values, window.emyEngagement.idsForCard(card)); } catch (error) {}
        }
        const composed = slug(["clip", info.business, info.title].filter(Boolean).join(":"));
        if (composed) values.push(composed, "emy:" + composed, "copy:" + composed);
        return Array.from(new Set(values.map(clean).filter(Boolean)));
      }
      function mergedState(ids, map) {
        return ids.reduce((state, id) => Object.assign(state, map[id] || {}), {});
      }
      function personCount(list) {
        return (Array.isArray(list) ? list : []).filter(Boolean).length;
      }
      function uniquePeople(list) {
        const seen = new Set();
        return (Array.isArray(list) ? list : []).filter((row) => {
          if (!row || typeof row !== "object") return false;
          const key = lower(row.role || row.actorType || "") + "|" + lower(row.key || row.email || row.name);
          if (!key || seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      }
      function countText(value) {
        const count = Math.max(0, Number(value) || 0);
        return count >= 1000 ? (Math.round(count / 100) / 10) + "k" : String(count);
      }
      function visibleLikeCount(card) {
        const node = card && card.querySelector && card.querySelector("[data-feed-like-count], [data-home-created-like-count], [data-business-like-count]");
        const match = clean(node && node.textContent).match(/\d[\d,]*/);
        return match ? Number(match[0].replace(/,/g, "")) || 0 : 0;
      }
      function applyChip(chip, active, count) {
        const safe = Math.max(0, Number(count) || 0);
        chip.classList.toggle("is-active", !!active);
        chip.classList.toggle("is-liked", !!active);
        chip.setAttribute("aria-pressed", active ? "true" : "false");
        chip.setAttribute("aria-label", active ? "Liked Clip" : "Like Clip");
        chip.setAttribute("title", active ? "Liked Clip" : "Like Clip");
        const label = chip.querySelector("[data-clip-like-label]");
        if (label) label.textContent = active ? "Liked Clip" : "Like Clip";
        const countNode = chip.querySelector("[data-clip-like-count]");
        if (countNode) {
          countNode.hidden = false;
          countNode.setAttribute("aria-hidden", "false");
          countNode.dataset.rawCount = String(safe);
          countNode.textContent = countText(safe);
        }
      }
      function mascotMarkup() {
        return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/>' +
          '<path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/>' +
          '<path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/>' +
          '<path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/>' +
          '<path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/>' +
          '<path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/>' +
          '<path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/>' +
        '</svg>';
      }
      function chipMarkup() {
        return '<span class="clip-viewer-like-icon" aria-hidden="true">' + mascotMarkup() + '</span><span class="clip-viewer-like-label" data-clip-like-label>Like Clip</span><strong class="clip-viewer-like-count" data-clip-like-count data-raw-count="0">0</strong>';
      }
      function sideForSlide(slide) {
        if (!slide) return null;
        let side = slide.querySelector(":scope > .clip-viewer-side");
        const info = slide.querySelector(":scope > .clip-viewer-info");
        const frame = slide.querySelector(":scope > .clip-viewer-frame");
        if (!side) {
          side = document.createElement("div");
          side.className = "clip-viewer-side";
          slide.insertBefore(side, info || frame || slide.firstChild);
        }
        if (info && info.parentNode !== side) side.appendChild(info);
        return side;
      }
      function ensureChip(slide) {
        const side = sideForSlide(slide);
        if (!side) return null;
        let chip = side.querySelector(":scope > " + CHIP_SELECTOR);
        if (!chip) {
          chip = document.createElement("button");
          chip.type = "button";
          chip.className = "clip-viewer-like-chip";
          chip.setAttribute("data-clip-like-toggle", "");
          chip.setAttribute("aria-pressed", "false");
          chip.innerHTML = chipMarkup();
          const info = side.querySelector(":scope > .clip-viewer-info");
          side.insertBefore(chip, info || side.firstChild);
        }
        return chip;
      }
      function syncSlide(slide) {
        const chip = ensureChip(slide);
        if (!chip) return;
        const card = sourceCardForSlide(slide);
        const ids = idsFor(slide, card);
        const state = mergedState(ids, readMap());
        const current = actor();
        const likedBy = uniquePeople(state.likedBy);
        const active = likedBy.some((row) => samePerson(row, current));
        const storedBase = Object.prototype.hasOwnProperty.call(state, "baseLikeCount") ? Number(state.baseLikeCount) : NaN;
        const fallback = Math.max(0, Number(state.countedLikeCount) || 0, Number(state.likeCount) || 0, visibleLikeCount(card), personCount(likedBy));
        const base = Number.isFinite(storedBase) ? Math.max(0, storedBase) : Math.max(0, fallback - personCount(likedBy));
        const count = base + personCount(likedBy);
        applyChip(chip, active, count);
      }
      function syncAll(root) {
        (root || document).querySelectorAll("[data-clip-slide]").forEach(syncSlide);
      }
      function updateSourceCount(card, count) {
        if (!card) return;
        card.querySelectorAll("[data-feed-like-count], [data-home-created-like-count], [data-business-like-count]").forEach((node) => {
          node.dataset.rawCount = String(Math.max(0, Number(count) || 0));
          node.textContent = countText(count);
        });
        if (window.emyEngagement && typeof window.emyEngagement.syncCard === "function") {
          try { window.emyEngagement.syncCard(card); } catch (error) {}
        }
      }
      function toggle(chip) {
        const slide = chip && chip.closest("[data-clip-slide]");
        if (!slide) return;
        const card = sourceCardForSlide(slide);
        const ids = idsFor(slide, card);
        if (!ids.length) return;
        const map = readMap();
        const state = mergedState(ids, map);
        const current = actor();
        const existing = uniquePeople(state.likedBy);
        const currentWasStored = existing.some((row) => samePerson(row, current));
        const wasActive = currentWasStored || chip.classList.contains("is-active") || chip.getAttribute("aria-pressed") === "true";
        const likedBy = existing.filter((row) => !samePerson(row, current));
        if (!wasActive) likedBy.unshift(current);
        const fallback = Math.max(
          0,
          Number(state.countedLikeCount) || 0,
          Number(state.likeCount) || 0,
          visibleLikeCount(card),
          Number(chip.querySelector("[data-clip-like-count]") && chip.querySelector("[data-clip-like-count]").dataset.rawCount) || 0,
          existing.length
        );
        const storedBase = Object.prototype.hasOwnProperty.call(state, "baseLikeCount") ? Number(state.baseLikeCount) : NaN;
        let base = Number.isFinite(storedBase) ? Math.max(0, storedBase) : Math.max(0, fallback - personCount(existing));
        let count = base + personCount(likedBy);
        if (wasActive && !currentWasStored && !Number.isFinite(storedBase)) {
          count = Math.max(0, fallback - 1);
          base = Math.max(0, count - personCount(likedBy));
        }
        const patch = Object.assign({}, state, {
          liked: false,
          disliked: false,
          baseLikeCount: base,
          countedLikeCount: count,
          likeCount: count,
          likedBy,
          updatedAt: new Date().toISOString()
        });
        ids.forEach((id) => { map[id] = Object.assign({}, map[id] || {}, patch); });
        writeMap(map);
        updateSourceCount(card, count);
        applyChip(chip, !wasActive, count);
        chip.classList.remove("is-bouncing");
        void chip.offsetWidth;
        chip.classList.add("is-bouncing");
        window.clearTimeout(chip._emyClipLikeBounceTimer);
        chip._emyClipLikeBounceTimer = window.setTimeout(() => chip.classList.remove("is-bouncing"), 760);
      }
      document.addEventListener("click", (event) => {
        const chip = event.target && event.target.closest ? event.target.closest(CHIP_SELECTOR) : null;
        if (!chip) return;
        event.preventDefault();
        event.stopPropagation();
        toggle(chip);
      }, true);
      window.addEventListener("emy:feed-action-state-changed", () => syncAll(document));
      window.addEventListener("storage", (event) => { if (!event || event.key === STORE_KEY) syncAll(document); });
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
      [120, 360, 900, 1800].forEach((delay) => window.setTimeout(() => syncAll(document), delay));
    })();

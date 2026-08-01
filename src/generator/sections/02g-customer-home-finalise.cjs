/* EMY customer home section: 02g-customer-home-finalise.cjs (lines 1572-1946) */
const lockedCustomerHomeHtml = normaliseLockedCustomerHomeHtml(readLockedCustomerHomeHtml());
const customerHomeClipMascotLikeEnhancer = String.raw`
  <style data-emy-home-clip-mascot-like>
    .clip-viewer-side {
      align-self: center;
      display: grid;
      gap: 14px;
      justify-items: center;
      min-width: 0;
      max-width: 392px;
    }
    .clip-viewer-side .clip-viewer-info {
      width: 100%;
    }
    .clip-viewer-frame { position: relative; }
    .clip-viewer-like-chip {
      position: relative;
      left: auto;
      bottom: auto;
      z-index: 11;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 46px;
      max-width: calc(100% - 34px);
      border: 1px solid rgba(255,106,0,.34);
      border-radius: 999px;
      background: rgba(255,255,255,.96);
      color: #d85a00;
      cursor: pointer;
      padding: 0 13px 0 9px;
      font: 850 13px/1 Inter, Arial, sans-serif;
      letter-spacing: 0;
      box-shadow: 0 18px 36px rgba(0,27,71,.18), 0 12px 28px rgba(255,106,0,.12);
      transform: none;
      transition: transform .16s ease, background .16s ease, border-color .16s ease;
    }
    .clip-viewer-like-chip:hover {
      border-color: rgba(255,106,0,.56);
      background: #fff7ef;
      transform: translateY(-1px);
    }
    .clip-viewer-like-chip.is-active {
      background: #fff4e8;
      border-color: rgba(255,106,0,.48);
      color: #c14f00;
    }
    .clip-viewer-like-icon {
      display: inline-grid;
      place-items: center;
      width: 24px;
      min-width: 24px;
      height: 24px;
      overflow: hidden;
      border-radius: 7px;
    }
    .clip-viewer-like-icon svg,
    .clip-viewer-like-icon img {
      display: block;
      width: 24px;
      height: 24px;
      overflow: visible;
      object-fit: contain;
    }
    .clip-viewer-like-chip.is-bouncing .clip-viewer-like-icon svg,
    .clip-viewer-like-chip.is-bouncing .clip-viewer-like-icon img {
      animation: emyClipMascotLikeBounce .72s ease-in-out both;
    }
    .clip-viewer-like-label,
    .clip-viewer-like-count {
      white-space: nowrap;
    }
    .clip-viewer-like-count {
      min-width: 8px;
      font-weight: 900;
    }
    @keyframes emyClipMascotLikeBounce {
      0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
      28% { transform: translateY(-4px) rotate(-8deg) scale(1.1); }
      54% { transform: translateY(1px) rotate(7deg) scale(.98); }
      78% { transform: translateY(-1px) rotate(-3deg) scale(1.04); }
    }
    @media (max-width: 680px) {
      .clip-viewer-side { position: absolute; left: 18px; right: 82px; bottom: 24px; z-index: 5; max-width: none; gap: 8px; pointer-events: none; }
      .clip-viewer-side .clip-viewer-info { position: static !important; left: auto !important; right: auto !important; bottom: auto !important; max-width: none !important; }
      .clip-viewer-like-chip { min-height: 42px; gap: 7px; padding: 0 11px 0 8px; font-size: 12.5px; pointer-events: auto; }
    }
  </style>
  <script data-emy-home-clip-mascot-like>
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
  </script>`;
function patchCustomerHomeClipMascotLike(html) {
  let next = String(html || "");
  try {
    next = stripSharedStyle(stripSharedScript(next, 'data-emy-home-clip-mascot-like'), 'data-emy-home-clip-mascot-like');
  } catch (error) {
    next = next
      .replace(/\n?\s*<style data-emy-home-clip-mascot-like>[\s\S]*?<\/style>/g, '')
      .replace(/\n?\s*<script data-emy-home-clip-mascot-like>[\s\S]*?<\/script>/g, '')
      .replace(/\n?\s*<link rel="stylesheet" href="assets\/[^"]+" data-emy-home-clip-mascot-like\s*\/?>/g, '')
      .replace(/\n?\s*<script src="assets\/[^"]+" data-emy-home-clip-mascot-like><\/script>/g, '');
  }
  const bundle = typeof globalThis.__EMY_ASSETS__ === 'object' ? globalThis.__EMY_ASSETS__ : null;
  const styleTag = (bundle && bundle.customerHomeClipMascotLikeStyle)
    || ((customerHomeClipMascotLikeEnhancer.match(/<style[\s\S]*?<\/style>/) || [])[0])
    || '';
  const scriptTag = (bundle && bundle.customerHomeClipMascotLikeScript)
    || ((customerHomeClipMascotLikeEnhancer.match(/<script[\s\S]*?<\/script>/) || [])[0])
    || '';
  if (styleTag && next.includes('</head>')) next = next.replace('</head>', styleTag + '\n  </head>');
  if (scriptTag && next.includes('</body>')) next = next.replace('</body>', scriptTag + '\n  </body>');
  return next;
}

function applyCustomerHomeContentPatches(html) {
  const forceLocked = String(process.env.EMY_USE_LOCKED_HOME || '').trim() === '1';
  let next = stripCustomerHomeDemoTemplates(String(html || ''));
  if (forceLocked) {
    next = applyCustomerHomeRuntimePatches(next);
  }
  return next;
}

function finaliseCustomerHomeGeneratedHtml(html) {
  let normalised = removeLockedCustomerHomePostCircles(String(html || "")).replace(
    /let clipAutoplayTimer = 0;(?:\s*let clipViewQualificationTimer = 0;\s*let clipViewQualificationToken = "";\s*let clipViewerSessionId = 0;)+/g,
    'let clipAutoplayTimer = 0;\n          let clipViewQualificationTimer = 0;\n          let clipViewQualificationToken = "";\n          let clipViewerSessionId = 0;'
  );
  if (!normalised.includes("data-emy-legacy-engagement-toolbar-removal") && normalised.includes("</head>")) {
    normalised = normalised.replace("</head>", legacyEngagementToolbarRemovalStyle + "\n  </head>");
  }
  return patchCustomerHomeClipMascotLike(normalised);
}

function resolveCustomerHomeBaseHtml(candidateHtml) {
  const templateHtml = String(candidateHtml || '');
  const lockedHtml = String(lockedCustomerHomeHtml || '');
  const forceLocked = String(process.env.EMY_USE_LOCKED_HOME || '').trim() === '1';
  const source = forceLocked ? (lockedHtml || templateHtml) : (templateHtml || lockedHtml);
  return normaliseLockedCustomerHomeHtml(source);
}

function writeCustomerHomePages(candidateHtml) {
  const baseHtml = resolveCustomerHomeBaseHtml(candidateHtml);
  const html = finaliseCustomerHomeGeneratedHtml(applyCustomerHomeContentPatches(baseHtml));
  fs.writeFileSync(path.join(outDir, 'emy-customer-home.html'), html, 'utf8');
  return html;
}


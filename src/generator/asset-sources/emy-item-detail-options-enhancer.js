(() => {
        if (window.emyItemDetailOptionsEnhancerInstalled) return;
        window.emyItemDetailOptionsEnhancerInstalled = true;
        const state = { card: null, lastCard: null, tracking: false, wrapped: false };
        function clean(value) { return String(value || "").replace(/\s+/g, " ").trim(); }
        function esc(value) {
          return clean(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
        }
        const moreIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="6.5" cy="12" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="17.5" cy="12" r="1.8"></circle></svg>';
        function syncMoreButton(button) {
          if (!button) return;
          button.classList.add("item-detail-more");
          button.setAttribute("aria-label", "More options");
          if (!button.getAttribute("aria-expanded")) button.setAttribute("aria-expanded", "false");
          if (!button.querySelector("svg")) button.innerHTML = moreIcon;
        }
        function ensureStyle() {
          if (document.querySelector("style[data-emy-item-detail-options-style]")) return;
          const style = document.createElement("style");
          style.dataset.emyItemDetailOptionsStyle = "true";
          style.textContent = ".item-detail-more{position:absolute;right:56px;top:13px;z-index:41;width:36px;height:36px;padding:0;border:1px solid rgba(255,255,255,.74);border-radius:999px;background:linear-gradient(145deg,rgba(255,255,255,.88),rgba(255,250,244,.68));color:var(--emy-navy,#001b47);cursor:pointer;display:grid;place-items:center;line-height:0;box-shadow:0 14px 30px rgba(0,27,71,.14),inset 0 1px 0 rgba(255,255,255,.92);backdrop-filter:blur(18px) saturate(1.14);-webkit-backdrop-filter:blur(18px) saturate(1.14);transition:transform .18s ease,color .18s ease,border-color .18s ease,background .18s ease,box-shadow .18s ease}.item-detail-more svg{width:18px;height:18px;display:block;fill:currentColor;pointer-events:none}.item-detail-more:hover,.item-detail-more[aria-expanded='true']{color:var(--emy-orange,#ff6a00);border-color:rgba(255,106,0,.30);background:linear-gradient(145deg,rgba(255,255,255,.96),rgba(255,244,235,.86));box-shadow:0 16px 34px rgba(255,106,0,.16),inset 0 1px 0 rgba(255,255,255,.94);transform:translateY(-1px)}.item-detail-options-menu{position:fixed;right:auto;left:0;top:0;z-index:10120;width:min(260px,calc(100vw - 24px));max-height:calc(100dvh - 24px);overflow:auto;border:1px solid rgba(255,255,255,.72);border-radius:16px;background:linear-gradient(145deg,rgba(255,255,255,.88),rgba(255,250,244,.66));box-shadow:0 18px 36px rgba(0,27,71,.14),inset 0 1px 0 rgba(255,255,255,.88),inset 0 -12px 24px rgba(0,27,71,.04);padding:7px;backdrop-filter:blur(22px) saturate(1.16);-webkit-backdrop-filter:blur(22px) saturate(1.16)}.item-detail-options-menu[hidden]{display:none!important}.item-detail-options-menu button{width:100%;min-height:36px;border:0;border-radius:11px;background:transparent;color:#26364f;cursor:pointer;padding:0 11px;text-align:left;font:inherit;font-size:12.5px;line-height:1;font-weight:680}.item-detail-options-menu button:hover{background:rgba(255,255,255,.82);color:var(--emy-orange,#ff6a00);box-shadow:inset 0 0 0 1px rgba(255,106,0,.10)}.item-detail-options-menu button.is-danger{color:#ef3f4a;font-weight:760}";
          document.head.appendChild(style);
        }
        function positionMenu(button, menu) {
          if (!button || !menu) return;
          const rect = button.getBoundingClientRect();
          const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
          const menuWidth = Math.min(260, Math.max(210, viewportWidth - 24));
          const maxHeight = Math.max(160, viewportHeight - 24);
          menu.style.width = menuWidth + "px";
          menu.style.maxHeight = maxHeight + "px";
          const measuredHeight = Math.min(menu.scrollHeight || 320, maxHeight);
          const left = Math.max(12, Math.min(viewportWidth - menuWidth - 12, rect.right - menuWidth));
          const belowTop = rect.bottom + 8;
          const aboveTop = rect.top - measuredHeight - 8;
          const top = belowTop + measuredHeight + 12 <= viewportHeight || aboveTop < 12
            ? Math.max(12, Math.min(viewportHeight - measuredHeight - 12, belowTop))
            : aboveTop;
          menu.style.left = left + "px";
          menu.style.top = top + "px";
        }
        function ensureUi() {
          const modal = document.querySelector("[data-item-detail-modal]");
          if (!modal) return null;
          ensureStyle();
          const card = modal.querySelector(".item-detail-card") || modal;
          let button = modal.querySelector("[data-item-detail-options]");
          let menu = modal.querySelector("[data-item-detail-options-menu]");
          const close = modal.querySelector("[data-item-detail-close]");
          if (!button) {
            button = document.createElement("button");
            button.className = "item-detail-more";
            button.type = "button";
            button.dataset.itemDetailOptions = "true";
            button.setAttribute("aria-label", "More options");
            button.setAttribute("aria-expanded", "false");
            card.insertBefore(button, close || card.firstChild);
          }
          syncMoreButton(button);
          if (!menu) {
            menu = document.createElement("div");
            menu.className = "item-detail-options-menu";
            menu.dataset.itemDetailOptionsMenu = "true";
            menu.hidden = true;
            card.insertBefore(menu, close || card.firstChild);
          }
          if (modal.dataset.emyDetailOptionsBound !== "true") {
            modal.dataset.emyDetailOptionsBound = "true";
            modal.addEventListener("click", (event) => {
              const option = event.target.closest("[data-item-detail-option]");
              if (option) {
                event.preventDefault();
                event.stopPropagation();
                trigger(option.dataset.itemDetailOption);
                return;
              }
              const triggerButton = event.target.closest("[data-item-detail-options]");
              if (triggerButton) {
                event.preventDefault();
                event.stopPropagation();
                render(state.card || state.lastCard);
                const nextOpen = menu.hidden;
                menu.hidden = !nextOpen;
                if (nextOpen) positionMenu(button, menu);
                button.setAttribute("aria-expanded", nextOpen ? "true" : "false");
                return;
              }
              if (!menu.hidden && !event.target.closest("[data-item-detail-options-menu]")) closeMenu();
            });
          }
          return { modal, button, menu };
        }
        function closeMenu() {
          const ui = ensureUi();
          if (!ui) return;
          ui.menu.hidden = true;
          ui.button.setAttribute("aria-expanded", "false");
        }
        function sourceMenu(card) {
          if (!card) return null;
          const direct = card.querySelector && card.querySelector("[data-feed-options-menu]");
          if (direct) return direct;
          const feedId = card.dataset && card.dataset.feedId;
          if (!feedId) return null;
          return Array.from(document.querySelectorAll("[data-feed-options-menu][data-feed-options-card-id]")).find((menu) => menu.dataset.feedOptionsCardId === feedId) || null;
        }
        function sourceOption(card, action) {
          const menu = sourceMenu(card);
          if (!menu) return null;
          return Array.from(menu.querySelectorAll("[data-feed-option]")).find((button) => button.dataset.feedOption === action) || null;
        }
        function activeRole() {
          try {
            const params = new URLSearchParams(window.location.search || "");
            const mode = clean(params.get("mode")).toLowerCase();
            const path = String(window.location.pathname || "").toLowerCase();
            if (mode === "customer" || mode === "business") return mode;
            if (/emy-customer-/i.test(path)) return "customer";
            if (/emy-business-profile\.html/i.test(path)) {
              const view = clean(params.get("view")).toLowerCase();
              if (params.get("setup") === "1" || view === "business" || ["business", "statistics", "services", "chat", "customers", "upload", "profile", "edit"].includes(mode)) return "business";
              if (params.has("business") || view === "customer") return "customer";
              if (
                localStorage.getItem("emyBusinessProfileDraft") ||
                localStorage.getItem("emyBusinessProfilePhoto") ||
                localStorage.getItem("emyBusinessProfilePhotoSrc") ||
                localStorage.getItem("emyBusinessProfilePhotoRef") ||
                localStorage.getItem("emyBusinessDisplayName") ||
                localStorage.getItem("emyBusinessName")
              ) return "business";
            }
          } catch (error) {}
          const signedRole = clean(localStorage.getItem("emyMainSignedInRole")).toLowerCase();
          if (signedRole === "customer" || signedRole === "business") return signedRole;
          const pendingRole = clean(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase();
          return pendingRole === "customer" || pendingRole === "business" ? pendingRole : "";
        }
        function readJsonValue(key) {
          try {
            const parsed = JSON.parse(localStorage.getItem(key) || "{}");
            return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
          } catch (error) {
            return {};
          }
        }
        function slug(value) {
          return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        }
        function currentBusinessName() {
          const profile = readJsonValue("emyBusinessProfileDraft");
          return clean(profile.businessName || profile.name || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || localStorage.getItem("emyMainPendingSignupBusinessName"));
        }
        function businessOwned(card) {
          if (!card || activeRole() !== "business") return false;
          if (!cardLooksBusinessOwned(card)) return false;
          const data = card.dataset || {};
          const profile = readJsonValue("emyBusinessProfileDraft");
          const currentName = currentBusinessName();
          const currentKeys = [
            "profile",
            profile.key,
            profile.businessKey,
            localStorage.getItem("emyBusinessProfileKey"),
            localStorage.getItem("emyBusinessKey"),
            currentName
          ].map(slug).filter(Boolean);
          const keySet = new Set(currentKeys);
          const candidateKeys = [data.businessKey, data.detailBusinessKey, data.businessLink, data.ownerKey].map(slug).filter(Boolean);
          if (candidateKeys.some((key) => keySet.has(key))) return true;
          const candidateNames = [data.detailBusiness, data.businessName, data.business, card.getAttribute("aria-label")].map(slug).filter(Boolean);
          if (currentName && candidateNames.some((name) => name === slug(currentName))) return true;
          if ((data.owner || "").toLowerCase() === "business" && candidateKeys.includes("profile")) return true;
          return card.classList.contains("business-live-product-card") || (card.classList.contains("is-user-post") && !!data.businessStorageKey);
        }
        function cardLooksBusinessOwned(card) {
          if (!card) return false;
          const data = card.dataset || {};
          const owner = clean(data.owner || data.repostActorType || data.detailOwner || data.accountType).toLowerCase();
          if (owner === "business") return true;
          if (owner === "customer") return false;
          const key = clean(data.businessKey || data.detailBusinessKey || data.businessLink || data.ownerKey).toLowerCase();
          if (key && key !== "customer-profile") return true;
          return !!(data.businessStorageKey || data.businessPostStorageKey || card.classList.contains("business-live-product-card"));
        }
        function customerOwned(card) {
          if (!card || activeRole() === "business") return false;
          if (cardLooksBusinessOwned(card)) return false;
          const data = card.dataset || {};
          const id = String(data.feedId || "");
          const owner = clean(data.owner || data.repostActorType || data.detailOwner || "").toLowerCase();
          if (owner === "business") return false;
          if (owner === "customer") return true;
          return data.ownedJob === "true" ||
            data.businessKey === "customer-profile" ||
            data.detailBusinessKey === "customer-profile" ||
            id.indexOf("customer-post-") === 0 ||
            id.indexOf("user-feed-") === 0 ||
            id.indexOf("feed-create-") === 0 ||
            (id.indexOf("repost-") === 0 && data.repostActorType !== "business");
        }
        function owned(card) {
          return businessOwned(card) || customerOwned(card);
        }
        function kindLabel(card) {
          const raw = clean(card && card.dataset && card.dataset.detailKind || "post").toLowerCase();
          if (raw.includes("job") || raw.includes("hiring")) return "job post";
          if (raw.includes("event")) return "event";
          if (raw.includes("article")) return "article";
          if (raw.includes("clip")) return "clip";
          if (raw.includes("product")) return "product";
          if (raw.includes("business")) return "business";
          if (raw.includes("repost")) return "repost";
          return "post";
        }
        function addItem(items, seen, action, label, danger) {
          action = clean(action);
          if (!action || seen.has(action)) return;
          seen.add(action);
          items.push({ action, label: clean(label) || action.charAt(0).toUpperCase() + action.slice(1), danger: !!danger || action === "delete" || action === "report" });
        }
        function openLabel(card) {
          const kind = kindLabel(card);
          if (kind === "article") return "Go to article";
          if (kind === "event") return "Go to event";
          if (kind === "job post") return "Go to job";
          if (kind === "clip") return "Go to clip";
          if (kind === "product") return "Go to product";
          if (kind === "business") return "Go to business";
          if (kind === "repost") return "Go to repost";
          return "Go to post";
        }
        function menuItems(card) {
          const items = [];
          const seen = new Set();
          const menu = sourceMenu(card);
          const isOwner = owned(card);
          if (menu) {
            let ownerInserted = false;
            Array.from(menu.querySelectorAll("[data-feed-option]")).forEach((button) => {
              const action = button.dataset.feedOption;
              if ((action === "edit" || action === "delete") && !isOwner) return;
              addItem(items, seen, action, button.textContent, button.classList.contains("is-danger"));
              if (action === "open" && isOwner) {
                addItem(items, seen, "edit", "Edit", false);
                addItem(items, seen, "delete", "Delete", true);
                ownerInserted = true;
              }
            });
            if (isOwner && !ownerInserted) {
              addItem(items, seen, "edit", "Edit", false);
              addItem(items, seen, "delete", "Delete", true);
            }
            return items;
          }
          addItem(items, seen, "report", "Report", true);
          addItem(items, seen, "hide", "Not interested", false);
          addItem(items, seen, "open", openLabel(card), false);
          if (isOwner) {
            addItem(items, seen, "edit", "Edit", false);
            addItem(items, seen, "delete", "Delete", true);
          }
          addItem(items, seen, "copy", "Copy link", false);
          return items;
        }
        function render(card) {
          const ui = ensureUi();
          if (!ui) return;
          card = card || state.card || state.lastCard;
          const items = menuItems(card);
          ui.button.hidden = !items.length;
          ui.menu.innerHTML = items.map((item) => '<button type="button" data-item-detail-option="' + esc(item.action) + '"' + (item.danger ? ' class="is-danger"' : '') + '>' + esc(item.label) + '</button>').join("");
          closeMenu();
        }
        function closeModal() {
          const modal = document.querySelector("[data-item-detail-modal]");
          const close = modal && modal.querySelector("[data-item-detail-close]");
          if (close) close.click();
          else if (modal) modal.classList.remove("is-open");
        }
        function feedback(message) {
          const node = document.querySelector("[data-item-product-feedback]");
          if (!node) return;
          node.textContent = message || "";
          node.classList.toggle("is-visible", !!message);
        }
        function focusSourceCard(card) {
          closeModal();
          if (!card) return;
          window.setTimeout(() => {
            try {
              card.scrollIntoView({ block: "center", behavior: "smooth" });
              if (card.focus) card.focus({ preventScroll: true });
            } catch (error) {}
          }, 0);
        }
        function editSourceCard(card) {
          if (!card) return;
          if (!owned(card)) {
            feedback("You can edit your own posts only.");
            return;
          }
          const kind = kindLabel(card);
          closeModal();
          const isRepost = (card.classList && card.classList.contains("is-repost")) || clean(card.dataset && card.dataset.detailKind).toLowerCase() === "repost";
          const options = { kind, showToast: feedback };
          if (isRepost && window.emyEditRepostThought && window.emyEditRepostThought(card, options)) return;
          if (window.emyOpenOriginalFeedEdit && window.emyOpenOriginalFeedEdit(card, options)) return;
          if (window.emyOpenFeedEditSheet) {
            window.emyOpenFeedEditSheet({ card, kind, showToast: feedback });
            return;
          }
          feedback("Edit is not available for this item yet.");
        }
        function shareCurrentLink(kind) {
          const title = cardTitle(state.card) || document.title;
          const url = window.location.href;
          if (kind === "share" && navigator.share) {
            navigator.share({ title, url }).then(() => feedback("Share sheet opened.")).catch(() => {});
            return;
          }
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => feedback(kind === "copy" ? "Link copied." : "Link copied for sharing."));
            return;
          }
          feedback("Copy this page link from the browser.");
        }
        function cardTitle(card) {
          return clean(card && card.dataset && (card.dataset.detailTitle || card.dataset.detailBusiness)) || "EMY item";
        }
        function trigger(action) {
          action = clean(action);
          closeMenu();
          const card = state.card;
          const source = sourceOption(card, action);
          if (source && action === "delete") {
            const label = kindLabel(card);
            const finish = () => {
              closeModal();
              source.dataset.emyDeleteConfirmedOnce = "true";
              window.__emyDeleteConfirmBypass = true;
              try { source.click(); } finally {
                window.setTimeout(() => {
                  delete source.dataset.emyDeleteConfirmedOnce;
                  window.__emyDeleteConfirmBypass = false;
                }, 0);
              }
            };
            if (window.emyConfirmDelete) window.emyConfirmDelete({ title: "Delete " + label, message: "Delete this " + label + " permanently?" }).then((confirmed) => { if (confirmed) finish(); });
            else finish();
            return;
          }
          if (action === "edit") {
            editSourceCard(card);
            return;
          }
          if (source) {
            if (action === "open") closeModal();
            source.click();
            return;
          }
          if (action === "open") {
            focusSourceCard(card);
            return;
          }
          if (action === "hide") {
            if (card) card.hidden = true;
            closeModal();
            return;
          }
          if (action === "delete") {
            const label = kindLabel(card);
            const finish = () => { if (card) card.hidden = true; closeModal(); };
            if (window.emyConfirmDelete) window.emyConfirmDelete({ title: "Delete " + label, message: "Delete this " + label + " permanently?" }).then((confirmed) => { if (confirmed) finish(); });
            else finish();
            return;
          }
          if (action === "repost") {
            const repost = document.querySelector("[data-item-product-repost], [data-item-business-repost]");
            if (repost) repost.click();
            else feedback("Repost is not available for this item yet.");
            return;
          }
          if (action === "share") {
            const share = document.querySelector("[data-item-product-share]");
            if (share) share.click();
            else shareCurrentLink("share");
            return;
          }
          if (action === "copy") shareCurrentLink("copy");
          if (action === "report") feedback("Report sent.");
        }
        function rememberCard(input) {
          if (!input) return null;
          const card = input.closest ? input.closest("[data-feed-id], [data-card], .feed-card, .social-feed-card, .home-created-card") : null;
          if (card) {
            state.card = card;
            state.lastCard = card;
            return card;
          }
          return input && input.nodeType === 1 ? input : null;
        }
        function trackSourceClicks() {
          if (state.tracking) return;
          state.tracking = true;
          document.addEventListener("click", (event) => {
            const modal = document.querySelector("[data-item-detail-modal]");
            if (modal && modal.contains(event.target)) return;
            const card = rememberCard(event.target);
            if (card && (!card.matches || card.matches("[data-feed-id], [data-card], .feed-card, .social-feed-card, .home-created-card"))) {
              state.card = card;
              state.lastCard = card;
            }
          }, true);
        }
        function wrapOpenDetail() {
          if (state.wrapped || typeof window.emyOpenItemDetail !== "function") return;
          const original = window.emyOpenItemDetail;
          state.wrapped = true;
          window.emyOpenItemDetail = function wrappedItemDetail(card) {
            state.card = rememberCard(card) || state.lastCard;
            const result = original.apply(this, arguments);
            window.setTimeout(() => render(state.card), 0);
            return result;
          };
        }
        function installOpenDetailHook() {
          wrapOpenDetail();
          if (state.wrapped) return;
          try {
            const descriptor = Object.getOwnPropertyDescriptor(window, "emyOpenItemDetail");
            if (descriptor && descriptor.configurable === false) return;
            let pendingValue = descriptor && descriptor.value;
            Object.defineProperty(window, "emyOpenItemDetail", {
              configurable: true,
              get() {
                return pendingValue;
              },
              set(value) {
                pendingValue = value;
                if (typeof value !== "function") return;
                Object.defineProperty(window, "emyOpenItemDetail", { configurable: true, writable: true, value });
                wrapOpenDetail();
              }
            });
          } catch (error) {}
        }
        ensureUi();
        trackSourceClicks();
        installOpenDetailHook();
      })();

(() => {
        if (window.emyDeleteConfirmInstalled) return;
        window.emyDeleteConfirmInstalled = true;

        const deleteSelector = [
          "[data-feed-option]",
          "[data-feed-job-delete]",
          "[data-item-job-delete]",
          "[data-gallery-delete]"
        ].join(",");

        const originalConfirm = window.confirm ? window.confirm.bind(window) : null;
        window.confirm = function emyConfirm(message) {
          if (window.__emyDeleteConfirmBypass) return true;
          return originalConfirm ? originalConfirm(message) : false;
        };
        function runAfterNextPaint(callback) {
          const run = () => {
            try { callback(); } catch (error) { setTimeout(() => { throw error; }, 0); }
          };
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(() => window.requestAnimationFrame(() => window.setTimeout(run, 0)));
          } else {
            window.setTimeout(run, 16);
          }
        }
        function scheduleHeavyInteraction(callback, options) {
          const opts = options || {};
          const timeout = Number(opts.timeout) || 700;
          runAfterNextPaint(() => {
            if (typeof window.requestIdleCallback === "function") {
              window.requestIdleCallback(() => callback(), { timeout });
            } else {
              window.setTimeout(callback, Number(opts.delay) || 40);
            }
          });
        }
        window.emyRunAfterNextPaint = window.emyRunAfterNextPaint || runAfterNextPaint;
        window.emyScheduleHeavyInteraction = window.emyScheduleHeavyInteraction || scheduleHeavyInteraction;

        function addStyle() {
          if (document.querySelector("style[data-emy-delete-confirm-style]")) return;
          const style = document.createElement("style");
          style.dataset.emyDeleteConfirmStyle = "true";
          style.textContent = [
            ".emy-delete-confirm-backdrop{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;background:linear-gradient(135deg,rgba(0,27,71,.30),rgba(13,24,43,.42));backdrop-filter:blur(7px) saturate(1.05);-webkit-backdrop-filter:blur(7px) saturate(1.05);padding:18px;}",
            ".emy-delete-confirm-backdrop[hidden]{display:none!important;}",
            ".emy-delete-confirm-dialog{position:relative;width:min(386px,calc(100vw - 36px));overflow:hidden;border:1px solid rgba(255,255,255,.72);border-radius:18px;background:linear-gradient(150deg,rgba(255,255,255,.94),rgba(255,248,239,.86));box-shadow:0 26px 68px rgba(0,27,71,.24),inset 0 1px 0 rgba(255,255,255,.94),inset 0 -18px 36px rgba(255,106,0,.05);color:var(--emy-navy,#001b47);padding:20px;font-family:inherit;}",
            ".emy-delete-confirm-dialog::before{content:\"\";position:absolute;inset:0 0 auto;height:5px;background:linear-gradient(90deg,var(--emy-orange,#ff6a00),rgba(0,27,71,.78));}",
            ".emy-delete-confirm-top{display:grid;grid-template-columns:44px minmax(0,1fr);align-items:center;gap:12px;padding-right:4px;}",
            ".emy-delete-confirm-mark{width:44px;height:44px;border:1px solid rgba(255,106,0,.18);border-radius:14px;background:rgba(255,106,0,.10);color:var(--emy-orange,#ff6a00);display:grid;place-items:center;box-shadow:0 12px 24px rgba(255,106,0,.10),inset 0 1px 0 rgba(255,255,255,.86);}",
            ".emy-delete-confirm-mark svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}",
            ".emy-delete-confirm-copy h2{margin:0;color:var(--emy-navy,#001b47);font-size:20px;line-height:1.12;font-weight:850;letter-spacing:0;}",
            ".emy-delete-confirm-copy p{margin:6px 0 0;color:#61708c;font-size:13px;line-height:1.42;font-weight:520;letter-spacing:0;}",
            ".emy-delete-confirm-note{margin:16px 0 0;border:1px solid rgba(0,27,71,.08);border-radius:13px;background:rgba(255,255,255,.68);color:#4c5a72;padding:11px 12px;font-size:12.5px;line-height:1.4;font-weight:560;box-shadow:inset 0 1px 0 rgba(255,255,255,.88);}",
            ".emy-delete-confirm-actions{display:flex;align-items:center;justify-content:flex-end;gap:9px;margin-top:18px;}",
            ".emy-delete-confirm-actions button{appearance:none;-webkit-appearance:none;min-height:38px;border-radius:999px;cursor:pointer;font:inherit;font-size:13px;line-height:1;font-weight:820;letter-spacing:0;padding:0 16px;transition:transform .14s ease,box-shadow .14s ease,background .14s ease,border-color .14s ease;}",
            ".emy-delete-confirm-actions button[data-emy-delete-cancel]{border:1px solid rgba(0,27,71,.10);background:rgba(255,255,255,.72);color:var(--emy-navy,#001b47);box-shadow:inset 0 1px 0 rgba(255,255,255,.86);}",
            ".emy-delete-confirm-actions button[data-emy-delete-confirm-button]{border:1px solid rgba(255,106,0,.22);background:linear-gradient(135deg,var(--emy-orange,#ff6a00),#f05f00);color:white;box-shadow:0 12px 24px rgba(255,106,0,.20),inset 0 1px 0 rgba(255,255,255,.25);}",
            ".emy-delete-confirm-actions button:hover,.emy-delete-confirm-actions button:focus-visible{outline:none;transform:translateY(-1px);}",
            ".emy-delete-confirm-actions button[data-emy-delete-cancel]:hover,.emy-delete-confirm-actions button[data-emy-delete-cancel]:focus-visible{border-color:rgba(255,106,0,.24);background:rgba(255,255,255,.92);}",
            ".emy-delete-confirm-actions button[data-emy-delete-confirm-button]:hover,.emy-delete-confirm-actions button[data-emy-delete-confirm-button]:focus-visible{box-shadow:0 15px 28px rgba(255,106,0,.25),inset 0 1px 0 rgba(255,255,255,.28);}",
            "@media (max-width:520px){.emy-delete-confirm-dialog{padding:18px}.emy-delete-confirm-top{grid-template-columns:40px minmax(0,1fr)}.emy-delete-confirm-mark{width:40px;height:40px;border-radius:13px}.emy-delete-confirm-copy h2{font-size:18px}.emy-delete-confirm-actions{display:grid;grid-template-columns:1fr 1fr}.emy-delete-confirm-actions button{width:100%;padding:0 12px}}"
          ].join("\n");
          document.head.appendChild(style);
        }

        function ensureDialog() {
          addStyle();
          let backdrop = document.querySelector("[data-emy-delete-confirm-dialog]");
          if (backdrop) return backdrop;
          backdrop = document.createElement("div");
          backdrop.className = "emy-delete-confirm-backdrop";
          backdrop.dataset.emyDeleteConfirmDialog = "true";
          backdrop.hidden = true;
          backdrop.innerHTML = '<div class="emy-delete-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="emy-delete-confirm-title" aria-describedby="emy-delete-confirm-message"><div class="emy-delete-confirm-top"><span class="emy-delete-confirm-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 7h14"/><path d="M10 11v6M14 11v6"/><path d="M8 7l1-3h6l1 3"/><path d="M7 7l1 14h8l1-14"/></svg></span><span class="emy-delete-confirm-copy"><h2 id="emy-delete-confirm-title" data-emy-delete-confirm-title>Delete post?</h2><p id="emy-delete-confirm-message" data-emy-delete-confirm-message>This will remove it from EMY.</p></span></div><p class="emy-delete-confirm-note">This action cannot be undone.</p><div class="emy-delete-confirm-actions"><button type="button" data-emy-delete-cancel>Cancel</button><button type="button" data-emy-delete-confirm-button>Delete</button></div></div>';
          document.body.appendChild(backdrop);
          return backdrop;
        }

        function cleanText(value) {
          return String(value || "").replace(/\s+/g, " ").trim();
        }

        function kindLabelFromCard(button) {
          const card = button && button.closest("[data-detail-kind], [data-home-created-type], [data-feed-options-kind], [data-feed-id]");
          const menu = button && button.closest("[data-feed-options-menu]");
          const raw = cleanText((menu && menu.dataset.feedOptionsKind) || (card && (card.dataset.detailKind || card.dataset.homeCreatedType)) || "post");
          const normal = raw.toLowerCase();
          if (normal.includes("job")) return "job post";
          if (normal.includes("event")) return "event";
          if (normal.includes("article")) return "article";
          if (normal.includes("clip")) return "clip";
          if (normal.includes("product")) return "product";
          if (normal.includes("repost")) return "repost";
          return "post";
        }

        function copyForDelete(button) {
          if (button.matches("[data-feed-job-delete], [data-item-job-delete]")) {
            return { title: "Delete job post?", message: "This job will be removed from EMY." };
          }
          if (button.matches("[data-gallery-delete]")) {
            return { title: "Delete media?", message: "This image or video will be removed from this post." };
          }
          const label = kindLabelFromCard(button);
          return { title: "Delete " + label + "?", message: "This " + label + " will be removed from EMY." };
        }

        let pendingResolve = null;
        let lastFocus = null;

        function closeDialog(answer) {
          const backdrop = document.querySelector("[data-emy-delete-confirm-dialog]");
          if (backdrop) backdrop.hidden = true;
          document.removeEventListener("keydown", handleKeydown, true);
          if (lastFocus && lastFocus.focus) {
            try { lastFocus.focus({ preventScroll: true }); } catch (error) {}
          }
          const resolve = pendingResolve;
          pendingResolve = null;
          if (resolve) {
            if (answer) runAfterNextPaint(() => resolve(true));
            else resolve(false);
          }
        }

        function handleKeydown(event) {
          if (event.key === "Escape") {
            event.preventDefault();
            closeDialog(false);
          }
        }

        function requestDeleteConfirmation(copy) {
          const backdrop = ensureDialog();
          const title = backdrop.querySelector("[data-emy-delete-confirm-title]");
          const message = backdrop.querySelector("[data-emy-delete-confirm-message]");
          const cancel = backdrop.querySelector("[data-emy-delete-cancel]");
          const confirm = backdrop.querySelector("[data-emy-delete-confirm-button]");
          if (pendingResolve) closeDialog(false);
          if (title) title.textContent = copy.title || "Delete";
          if (message) message.textContent = copy.message || "Delete this permanently?";
          backdrop.hidden = false;
          lastFocus = document.activeElement;
          pendingResolve = null;
          document.addEventListener("keydown", handleKeydown, true);
          const promise = new Promise((resolve) => { pendingResolve = resolve; });
          cancel.onclick = () => closeDialog(false);
          confirm.onclick = () => closeDialog(true);
          backdrop.onclick = (event) => {
            if (event.target === backdrop) closeDialog(false);
          };
          window.setTimeout(() => {
            if (cancel && cancel.focus) cancel.focus({ preventScroll: true });
          }, 0);
          return promise;
        }

        window.emyConfirmDelete = requestDeleteConfirmation;

        document.addEventListener("click", (event) => {
          const button = event.target && event.target.closest ? event.target.closest(deleteSelector) : null;
          if (!button || button.closest("[data-emy-delete-confirm-dialog]")) return;
          if (button.hasAttribute("data-feed-option") && button.dataset.feedOption !== "delete") return;
          if (button.hasAttribute("data-settings-link") && button.dataset.settingsLink !== "delete") return;
          if (button.dataset.emyDeleteConfirmedOnce === "true") return;
          if (button.disabled || button.getAttribute("aria-disabled") === "true") return;
          event.preventDefault();
          event.stopImmediatePropagation();
          requestDeleteConfirmation(copyForDelete(button)).then((confirmed) => {
            if (!confirmed || !button.isConnected) return;
            button.dataset.emyDeleteConfirmedOnce = "true";
            window.__emyDeleteConfirmBypass = true;
            try {
              button.click();
            } finally {
              window.setTimeout(() => {
                delete button.dataset.emyDeleteConfirmedOnce;
                window.__emyDeleteConfirmBypass = false;
              }, 0);
            }
          });
        }, true);
      })();

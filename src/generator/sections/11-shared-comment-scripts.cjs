/* EMY generator section: 11-shared-comment-scripts.cjs (source lines 8624-12332) */
const sharedCommentComposerPolishStyle = String.raw`
    <style data-emy-comment-composer-polish>
      .annexed-feed-middle .feed-comment-form,
      .home-created-card .feed-comment-form,
      [data-unified-feed-cards="true"] .feed-comment-form,
      .social-feed-card .feed-comment-form,
      .feed-comment-form,
      .clip-viewer-comment-form {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 4px;
        margin-top: 10px;
        padding: 4px;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 999px;
        background: linear-gradient(180deg, rgba(255,255,255,.96), rgba(247,249,252,.92));
        box-shadow: 0 10px 22px rgba(0,27,71,.06), inset 0 1px 0 rgba(255,255,255,.96);
        backdrop-filter: blur(12px) saturate(1.04);
        overflow: visible;
      }
      .annexed-feed-middle .feed-comment-form:focus-within,
      .home-created-card .feed-comment-form:focus-within,
      [data-unified-feed-cards="true"] .feed-comment-form:focus-within,
      .social-feed-card .feed-comment-form:focus-within,
      .feed-comment-form:focus-within,
      .clip-viewer-comment-form:focus-within {
        border-color: rgba(255,106,0,.28);
        box-shadow: 0 0 0 3px rgba(255,106,0,.08), 0 12px 24px rgba(0,27,71,.08), inset 0 1px 0 rgba(255,255,255,.98);
      }
      .annexed-feed-middle .feed-comment-form input,
      .home-created-card .feed-comment-form input,
      [data-unified-feed-cards="true"] .feed-comment-form input,
      .social-feed-card .feed-comment-form input,
      .feed-comment-form input,
      .clip-viewer-comment-form input {
        min-width: 0;
        height: 36px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--emy-navy, #001b47);
        outline: none;
        padding: 0 38px 0 13px;
        font: inherit;
        font-size: 12.5px;
        line-height: 1;
        font-weight: 560;
        box-shadow: none;
      }
      .annexed-feed-middle .feed-comment-form input::placeholder,
      .home-created-card .feed-comment-form input::placeholder,
      [data-unified-feed-cards="true"] .feed-comment-form input::placeholder,
      .social-feed-card .feed-comment-form input::placeholder,
      .feed-comment-form input::placeholder,
      .clip-viewer-comment-form input::placeholder {
        color: #8a94a8;
        font-weight: 520;
      }
      .annexed-feed-middle .feed-comment-form button,
      .home-created-card .feed-comment-form button,
      [data-unified-feed-cards="true"] .feed-comment-form button,
      .social-feed-card .feed-comment-form button,
      .feed-comment-form button,
      .clip-viewer-comment-form button {
        width: auto;
        min-width: 54px;
        height: 34px;
        min-height: 34px;
        border: 0;
        border-radius: 999px;
        background: linear-gradient(135deg, #ff7a1a, #ff5f00);
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 0 14px;
        font: inherit;
        font-size: 11.5px;
        line-height: 1;
        font-weight: 850;
        white-space: nowrap;
        box-shadow: 0 8px 16px rgba(255,106,0,.18), inset 0 1px 0 rgba(255,255,255,.24);
      }
      .annexed-feed-middle .feed-comment-form button:hover,
      .home-created-card .feed-comment-form button:hover,
      [data-unified-feed-cards="true"] .feed-comment-form button:hover,
      .social-feed-card .feed-comment-form button:hover,
      .feed-comment-form button:hover,
      .clip-viewer-comment-form button:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 18px rgba(255,106,0,.22), inset 0 1px 0 rgba(255,255,255,.28);
      }
      @media (max-width: 520px) {
        .annexed-feed-middle .feed-comment-form,
        .home-created-card .feed-comment-form,
        [data-unified-feed-cards="true"] .feed-comment-form,
        .social-feed-card .feed-comment-form,
        .feed-comment-form,
        .clip-viewer-comment-form {
          gap: 3px;
          padding: 3px;
        }
        .annexed-feed-middle .feed-comment-form input,
        .home-created-card .feed-comment-form input,
        [data-unified-feed-cards="true"] .feed-comment-form input,
        .social-feed-card .feed-comment-form input,
        .feed-comment-form input,
        .clip-viewer-comment-form input {
          height: 34px;
          padding-left: 11px;
          padding-right: 34px;
          font-size: 12px;
        }
        .annexed-feed-middle .feed-comment-form button,
        .home-created-card .feed-comment-form button,
        [data-unified-feed-cards="true"] .feed-comment-form button,
        .social-feed-card .feed-comment-form button,
        .feed-comment-form button,
        .clip-viewer-comment-form button {
          min-width: 50px;
          height: 32px;
          min-height: 32px;
          padding: 0 12px;
          font-size: 11px;
        }
      }
    </style>`;

const sharedCommentWritingStyle = String.raw`
    <style data-emy-comment-writing>
      .item-product-comments .item-product-section-title,
      .clip-viewer-comments-title,
      .clip-viewer-comments-head strong {
        color: var(--emy-navy, #001b47) !important;
        font-family: inherit !important;
        font-size: 17px !important;
        line-height: 1.25 !important;
        font-weight: 600 !important;
        letter-spacing: 0 !important;
      }
      .item-product-comments .item-product-section-title strong,
      .clip-viewer-comments-title b {
        font-weight: 600 !important;
        letter-spacing: 0 !important;
      }
      .item-product-comments .item-product-section-title span,
      .item-product-comments [data-item-product-comment-total],
      [data-feed-comment-total],
      .clip-viewer-comments-title span,
      .social-feed-comments-link {
        color: #667085 !important;
        font-family: inherit !important;
        font-size: 12px !important;
        line-height: 1.25 !important;
        font-weight: 500 !important;
        letter-spacing: 0 !important;
      }
      .item-product-comments .item-product-section-note {
        color: #667085 !important;
        font-family: inherit !important;
        font-size: 13px !important;
        line-height: 1.45 !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
      }
      .feed-comment-bubble,
      .feed-comment-reply-bubble,
      .annexed-feed-middle .social-feed-card .feed-comment-bubble,
      .home-created-card .feed-comment-bubble,
      .home-created-card .feed-comment-reply-bubble,
      [data-unified-feed-cards="true"] .feed-comment-bubble,
      [data-unified-feed-cards="true"] .feed-comment-reply-bubble,
      .results .feed-comment-bubble,
      .results .feed-comment-reply-bubble,
      .item-product-comment-bubble,
      .item-product-comment-text,
      .item-product-comment-reply-row .item-product-comment-bubble,
      .clip-viewer-comment-bubble,
      .clip-viewer-comment-bubble [data-clip-comment-text],
      .clip-viewer-comment-bubble [data-clip-comment-reply-text] {
        color: #344054 !important;
        font-family: inherit !important;
        font-size: 13px !important;
        line-height: 1.45 !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
      }
      .feed-comment-bubble strong,
      .feed-comment-reply-bubble strong,
      .annexed-feed-middle .social-feed-card .feed-comment-bubble strong,
      .home-created-card .feed-comment-bubble strong,
      .home-created-card .feed-comment-reply-bubble strong,
      [data-unified-feed-cards="true"] .feed-comment-bubble strong,
      [data-unified-feed-cards="true"] .feed-comment-reply-bubble strong,
      .results .feed-comment-bubble strong,
      .results .feed-comment-reply-bubble strong,
      .item-product-comment-bubble strong,
      .clip-viewer-comment-bubble strong {
        color: var(--emy-navy, #001b47) !important;
        font-family: inherit !important;
        font-size: 12px !important;
        line-height: 1.22 !important;
        font-weight: 600 !important;
        letter-spacing: 0 !important;
      }
      .feed-comment-actions,
      .item-product-comment-actions,
      .clip-viewer-comment-actions {
        color: #7a869e !important;
        font-family: inherit !important;
        font-size: 11px !important;
        line-height: 1 !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
      }
      .feed-comment-actions button,
      .item-product-comment-actions button,
      .clip-viewer-comment-actions button,
      [data-emy-comment-replies-toggle] {
        font-family: inherit !important;
        font-weight: 500 !important;
        letter-spacing: 0 !important;
      }
      .feed-comment-action-count,
      .item-product-comment-actions [data-item-product-comment-like-count],
      .item-product-comment-actions [data-item-product-comment-dislike-count],
      .clip-viewer-comment-actions [data-clip-comment-like-count],
      .clip-viewer-comment-actions [data-clip-comment-dislike-count],
      .clip-viewer-comment-actions [data-clip-reply-like-count],
      .clip-viewer-comment-actions [data-clip-reply-dislike-count] {
        color: #7a869e !important;
        font-family: inherit !important;
        font-size: 11px !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
      }
      .feed-comment-form input,
      .feed-comment-form textarea,
      .feed-comment-reply-form input,
      .feed-comment-reply-form textarea,
      .item-product-comment-preview input,
      .item-product-comment-preview textarea,
      .item-product-comment-reply-form input,
      .item-product-comment-reply-form textarea,
      .item-product-comment-edit-field,
      .item-product-chat-edit-field,
      .clip-viewer-comment-form input,
      .clip-viewer-comment-form textarea,
      .clip-viewer-comment-reply-form input,
      .clip-viewer-comment-reply-form textarea,
      .clip-viewer-comment-edit-field,
      [data-feed-comment-edit-field] {
        color: #344054 !important;
        font-family: inherit !important;
        font-size: 13px !important;
        line-height: 1.4 !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
      }
      .feed-comment-form input::placeholder,
      .feed-comment-form textarea::placeholder,
      .feed-comment-reply-form input::placeholder,
      .feed-comment-reply-form textarea::placeholder,
      .item-product-comment-preview input::placeholder,
      .item-product-comment-preview textarea::placeholder,
      .item-product-comment-reply-form input::placeholder,
      .item-product-comment-reply-form textarea::placeholder,
      .clip-viewer-comment-form input::placeholder,
      .clip-viewer-comment-form textarea::placeholder,
      .clip-viewer-comment-reply-form input::placeholder,
      .clip-viewer-comment-reply-form textarea::placeholder {
        color: #8a94a8 !important;
        font-family: inherit !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
        opacity: 1 !important;
      }
      .feed-comment-form button,
      .feed-comment-reply-form button,
      .item-product-comment-preview button,
      .item-product-comment-reply-form button,
      .clip-viewer-comment-form button,
      .clip-viewer-comment-reply-form button {
        font-family: inherit !important;
        font-weight: 600 !important;
        letter-spacing: 0 !important;
      }
    </style>`;

const sharedCommentRepliesScript = String.raw`
    <script data-emy-comment-replies>
      (() => {
        if (window.emyCommentRepliesEnhanced) return;
        window.emyCommentRepliesEnhanced = true;

        const replyIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 14 4 9l5-5"/><path d="M4 9h9a5 5 0 0 1 5 5v2"/></svg>';
        const chevronIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>';
        const configs = [
          {
            name: "feed",
            container: "[data-feed-comment-replies]",
            replyRows: "[data-feed-comment-reply-row]",
            replyRow: "[data-feed-comment-reply-row]",
            mainRow: "[data-feed-comment-row]",
            actions: ".feed-comment-actions",
            form: "[data-feed-comment-reply-form]",
            replyAttr: "data-feed-comment-reply",
            buttonClass: "emy-reply-continue feed-comment-reply-continue"
          },
          {
            name: "item",
            container: "[data-item-product-comment-replies]",
            replyRows: "[data-item-product-comment-reply-row]",
            replyRow: "[data-item-product-comment-reply-row]",
            mainRow: "[data-item-product-comment-row]",
            actions: ".item-product-comment-actions",
            form: "[data-item-product-comment-reply-form]",
            replyAttr: "data-item-product-comment-reply",
            buttonClass: "emy-reply-continue item-product-comment-reply"
          },
          {
            name: "clip",
            container: "[data-clip-comment-replies]",
            replyRows: "[data-clip-comment-reply-item]",
            replyRow: "[data-clip-comment-reply-item]",
            mainRow: "[data-clip-comment-id]",
            actions: ".clip-viewer-comment-actions",
            form: "[data-clip-comment-reply-form]",
            replyAttr: "data-clip-comment-reply",
            buttonClass: "emy-reply-continue clip-comment-reply-continue"
          }
        ];

        function addStyle() {
          if (document.querySelector("style[data-emy-comment-replies-style]")) return;
          const style = document.createElement("style");
          style.dataset.emyCommentRepliesStyle = "true";
          style.textContent = [
            "[data-emy-comment-replies-toggle]{appearance:none;-webkit-appearance:none;position:relative;isolation:isolate;width:max-content;min-width:82px;min-height:34px;display:inline-flex;align-items:center;justify-content:center;gap:7px;margin:8px 0 3px;border:1px solid rgba(255,106,0,.14);border-radius:999px;background:rgba(255,106,0,.08);color:var(--emy-orange,#ff6a00);cursor:pointer;padding:0 12px;font:inherit;font-size:12px;line-height:1;font-weight:760;letter-spacing:0;user-select:none;touch-action:manipulation;-webkit-tap-highlight-color:transparent;box-shadow:inset 0 1px 0 rgba(255,255,255,.82);}",
            "[data-emy-comment-replies-toggle]::before{content:\"\";position:absolute;inset:-6px;border-radius:999px;}",
            "[data-emy-comment-replies-toggle]:hover,[data-emy-comment-replies-toggle]:focus-visible{background:rgba(255,106,0,.13);border-color:rgba(255,106,0,.22);color:var(--emy-orange,#ff6a00);outline:none;box-shadow:0 8px 18px rgba(255,106,0,.10),inset 0 1px 0 rgba(255,255,255,.88);}",
            "[data-emy-comment-replies-toggle] span,[data-emy-comment-replies-toggle] svg{position:relative;z-index:1;pointer-events:none;}",
            "[data-emy-comment-replies-toggle] span{white-space:nowrap;}",
            "[data-emy-comment-replies-toggle] svg{width:16px;height:16px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:2.35;stroke-linecap:round;stroke-linejoin:round;transition:transform .16s ease;}",
            "[data-emy-comment-replies-toggle][aria-expanded='true'] svg{transform:rotate(180deg);}",
            "[data-feed-comment-replies][hidden],[data-item-product-comment-replies][hidden],[data-clip-comment-replies][hidden]{display:none!important;}",
            ".feed-comment-actions .emy-reply-continue,.item-product-comment-actions .emy-reply-continue,.clip-viewer-comment-actions .emy-reply-continue{cursor:pointer;}",
            ".feed-comment-actions .emy-reply-continue svg,.item-product-comment-actions .emy-reply-continue svg,.clip-viewer-comment-actions .emy-reply-continue svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}"
          ].join("\n");
          document.head.appendChild(style);
        }

        function compactCount(value) {
          const count = Math.max(0, Number(value) || 0);
          if (typeof window.formatEngagementCount === "function") return window.formatEngagementCount(count);
          if (count >= 1000000) {
            const millions = count / 1000000;
            return (millions >= 10 || Number.isInteger(millions) ? Math.floor(millions) : millions.toFixed(1)).toString().replace(/\.0$/, "") + "m";
          }
          if (count >= 1000) {
            const thousands = count / 1000;
            return (thousands >= 10 || Number.isInteger(thousands) ? Math.floor(thousands) : thousands.toFixed(1)).toString().replace(/\.0$/, "") + "k";
          }
          return String(count);
        }

        function replyLabel(count) {
          return compactCount(count) + " " + (count === 1 ? "reply" : "replies");
        }

        function configByName(name) {
          return configs.find((config) => config.name === name);
        }

        function configForContainer(container) {
          return configs.find((config) => container && container.matches && container.matches(config.container));
        }

        function findToggle(container, config) {
          const parent = container && container.parentElement;
          if (!parent) return null;
          return Array.from(parent.children).find((child) => child.matches && child.matches("[data-emy-comment-replies-toggle]") && child.dataset.emyRepliesFor === config.name) || null;
        }

        function updateContainer(container, config) {
          if (!container || !config) return;
          const count = container.querySelectorAll(config.replyRows).length;
          let toggle = findToggle(container, config);
          if (!count) {
            if (toggle) toggle.remove();
            container.hidden = true;
            return;
          }
          if (!toggle) {
            toggle = document.createElement("button");
            toggle.type = "button";
            toggle.dataset.emyCommentRepliesToggle = "true";
            toggle.dataset.emyRepliesFor = config.name;
            toggle.setAttribute("aria-expanded", "false");
            const parent = container.parentElement;
            const form = parent && parent.querySelector(config.form);
            parent.insertBefore(toggle, form && form.parentElement === parent ? form : container);
          }
          toggle.innerHTML = '<span data-emy-replies-count>' + replyLabel(count) + '</span>' + chevronIcon;
          const expanded = container.dataset.emyRepliesExpanded === "true";
          toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
          container.hidden = !expanded;
        }

        function ownerToolSelector(config) {
          if (config.name === "feed") return "[data-feed-comment-edit],[data-feed-comment-delete]";
          if (config.name === "item") return "[data-item-product-comment-edit],[data-item-product-comment-delete]";
          return "[data-clip-reply-edit],[data-clip-reply-delete]";
        }

        function enhanceReplyRows(root) {
          configs.forEach((config) => {
            (root || document).querySelectorAll(config.replyRow).forEach((row) => {
              const actions = row.querySelector(config.actions);
              if (!actions || actions.querySelector("[data-emy-reply-continue]")) return;
              const button = document.createElement("button");
              button.type = "button";
              button.className = config.buttonClass;
              button.dataset.emyReplyContinue = "true";
              button.setAttribute(config.replyAttr, "");
              button.setAttribute("aria-label", "Reply to reply");
              button.setAttribute("title", "Reply");
              button.innerHTML = replyIcon;
              const ownerTool = actions.querySelector(ownerToolSelector(config));
              actions.insertBefore(button, ownerTool || null);
            });
          });
        }

        function enhanceContainers(root) {
          configs.forEach((config) => {
            (root || document).querySelectorAll(config.container).forEach((container) => updateContainer(container, config));
          });
        }

        function enhanceAll(root) {
          addStyle();
          enhanceReplyRows(root || document);
          enhanceContainers(root || document);
        }

        function openRootReplyForm(root, config) {
          if (!root || !config) return false;
          const form = root.querySelector(config.form);
          const container = root.querySelector(config.container);
          if (container) {
            container.dataset.emyRepliesExpanded = "true";
            updateContainer(container, config);
          }
          if (!form) return false;
          form.hidden = !form.hidden;
          if (!form.hidden) {
            const input = form.querySelector("input, textarea");
            if (input) {
              window.setTimeout(() => {
                input.focus();
                if (window.emyFocusEmojiTarget) window.emyFocusEmojiTarget(input);
              }, 30);
            }
          }
          return true;
        }

        document.addEventListener("click", (event) => {
          const toggle = event.target.closest("[data-emy-comment-replies-toggle]");
          if (toggle) {
            const config = configByName(toggle.dataset.emyRepliesFor);
            const root = config && toggle.closest(config.mainRow);
            const container = root && root.querySelector(config.container);
            if (container) {
              const nextExpanded = toggle.getAttribute("aria-expanded") !== "true";
              container.dataset.emyRepliesExpanded = nextExpanded ? "true" : "false";
              updateContainer(container, config);
            }
            event.preventDefault();
            event.stopPropagation();
            return;
          }

          const productReplyContinue = event.target.closest("[data-item-product-comment-reply][data-emy-reply-continue]");
          if (productReplyContinue && productReplyContinue.closest("[data-item-product-comment-reply-row]")) {
            const config = configByName("item");
            const root = productReplyContinue.closest(config.mainRow);
            if (openRootReplyForm(root, config)) {
              event.preventDefault();
              event.stopImmediatePropagation();
            }
            return;
          }

          const feedReplyContinue = event.target.closest("[data-feed-comment-reply][data-emy-reply-continue]");
          if (feedReplyContinue && feedReplyContinue.closest("[data-feed-comment-reply-row]")) {
            const config = configByName("feed");
            const root = feedReplyContinue.closest(config.mainRow);
            if (openRootReplyForm(root, config)) {
              event.preventDefault();
              event.stopImmediatePropagation();
            }
          }
        }, true);

        document.addEventListener("submit", (event) => {
          const form = event.target && event.target.closest && event.target.closest("[data-feed-comment-reply-form],[data-item-product-comment-reply-form],[data-clip-comment-reply-form]");
          if (!form) return;
          const config = configs.find((item) => form.matches(item.form));
          const root = config && form.closest(config.mainRow);
          const container = root && root.querySelector(config.container);
          if (container) container.dataset.emyRepliesExpanded = "true";
        }, true);

        const replyEnhanceSelector = configs.map((config) => config.container + "," + config.replyRow).join(",");
        const pendingReplyRoots = new Set();
        let scheduled = false;
        function activeReplyRoot() {
          const view = document.body ? document.body.dataset.currentView || "home" : "home";
          if (view === "feeds") return document.querySelector(".annexed-feed-middle") || document.querySelector("[data-annexed-feed-list]") || document;
          if (view === "reels") return document.querySelector("[data-view-block][data-views~='reels']") || document;
          return document;
        }
        function scheduleEnhance(root) {
          if (root && root.nodeType === 1) pendingReplyRoots.add(root);
          else pendingReplyRoots.add(activeReplyRoot());
          if (scheduled) return;
          scheduled = true;
          window.requestAnimationFrame(() => {
            scheduled = false;
            const roots = Array.from(pendingReplyRoots);
            pendingReplyRoots.clear();
            if (!roots.length || roots.length > 16) {
              enhanceAll(activeReplyRoot());
              return;
            }
            roots.forEach((root) => enhanceAll(root));
          });
        }

        window.emyEnhanceCommentReplies = enhanceAll;
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => enhanceAll(document), { once: true });
        } else {
          enhanceAll(document);
        }
        new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (!node || node.nodeType !== 1) return;
              if (node.matches && node.matches(replyEnhanceSelector) || node.querySelector && node.querySelector(replyEnhanceSelector)) scheduleEnhance(node);
            });
          });
        }).observe(document.documentElement, { childList: true, subtree: true });
      })();
    </script>`;

const sharedDeleteConfirmScript = String.raw`
    <script data-emy-delete-confirm>
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
    </script>`;

const sharedItemDetailOptionsEnhancerScript = String.raw`
    <script data-emy-item-detail-options-enhancer>
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
    </script>`;

const sharedMoreOptionsButtonScript = String.raw`
    <script data-emy-more-options-cleaner>
      (() => {
        if (window.__emyMoreOptionsCleanerInstalled) return;
        window.__emyMoreOptionsCleanerInstalled = true;
        const selector = "[data-feed-options], [data-public-activity-more], [data-clip-more]";
        const icon = '<svg class="emy-more-options-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="6.5" cy="12" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="17.5" cy="12" r="1.8"></circle></svg>';
        function ensureStyle() {
          if (document.querySelector("style[data-emy-more-options-cleaner-style]")) return;
          const style = document.createElement("style");
          style.dataset.emyMoreOptionsCleanerStyle = "true";
          style.textContent = [
            ".emy-more-options-button{font-size:0!important;line-height:0!important;letter-spacing:0!important;text-indent:0!important;display:inline-grid!important;place-items:center!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;}",
            ".emy-more-options-button>svg,.emy-more-options-button .emy-more-options-icon{display:block!important;width:18px!important;height:18px!important;min-width:18px!important;min-height:18px!important;margin:0!important;flex:0 0 auto!important;fill:currentColor!important;stroke:none!important;transform:none!important;pointer-events:none!important;}",
            ".emy-more-options-button circle{fill:currentColor!important;stroke:none!important;}",
            ".heart[data-emy-hidden-behind-more='true']{display:none!important;}"
          ].join("");
          document.head.appendChild(style);
        }
        function hideOverlappedHeart(button) {
          const card = button && button.closest ? button.closest(".feed-product-card,.product-card,.business-live-product-card") : null;
          if (!card || !button.matches("[data-feed-options], [data-public-activity-more]")) return;
          card.querySelectorAll(".heart").forEach((heart) => {
            if (heart === button) return;
            heart.dataset.emyHiddenBehindMore = "true";
            heart.hidden = true;
            heart.setAttribute("aria-hidden", "true");
            heart.setAttribute("tabindex", "-1");
          });
        }
        function cleanButton(button) {
          if (!button) return;
          ensureStyle();
          button.classList.add("emy-more-options-button");
          button.setAttribute("aria-label", button.getAttribute("aria-label") || "More options");
          if (!button.getAttribute("aria-expanded")) button.setAttribute("aria-expanded", "false");
          if (!button.querySelector("svg")) {
            button.innerHTML = icon;
            hideOverlappedHeart(button);
            return;
          }
          Array.from(button.childNodes).forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) node.remove();
          });
          hideOverlappedHeart(button);
        }
        function cleanAll(root) {
          const scope = root && root.querySelectorAll ? root : document;
          if (scope.matches && scope.matches(selector)) cleanButton(scope);
          scope.querySelectorAll(selector).forEach(cleanButton);
        }
        const pendingCleanRoots = new Set();
        let cleanScheduled = false;
        function nodeNeedsClean(node) {
          return !!(node && node.nodeType === 1 && ((node.matches && node.matches(selector)) || (node.querySelector && node.querySelector(selector))));
        }
        function schedule(root) {
          if (root && root.nodeType === 1) pendingCleanRoots.add(root);
          if (cleanScheduled) return;
          cleanScheduled = true;
          window.requestAnimationFrame(() => {
            cleanScheduled = false;
            const roots = Array.from(pendingCleanRoots);
            pendingCleanRoots.clear();
            if (!roots.length) return;
            if (roots.length > 24) {
              cleanAll(document);
              return;
            }
            roots.forEach(cleanAll);
          });
        }
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => cleanAll(document), { once: true });
        } else {
          cleanAll(document);
        }
        new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (nodeNeedsClean(node)) schedule(node);
            });
          });
        }).observe(document.documentElement, { childList: true, subtree: true });
      })();
    </script>`;

const sharedFeedBoxWritingStyle = String.raw`
    <style data-emy-feed-box-writing>
      .feed-job-desc,
      .feed-event-post-details p,
      .social-feed-event-card .feed-event-post-details p,
      .annexed-feed-middle .social-feed-event-card .feed-event-post-details p,
      .results .feed-job-desc,
      .results .feed-event-post-details p {
        color: #344054 !important;
        font-size: 13px !important;
        line-height: 1.48 !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
      }
      .feed-job-meta span,
      .feed-event-post-meta span,
      .social-feed-event-card .feed-event-post-meta span,
      .annexed-feed-middle .social-feed-event-card .feed-event-post-meta span,
      .results .feed-job-meta span,
      .results .feed-event-post-meta span {
        border: 1px solid rgba(0,27,71,.08) !important;
        border-top-color: rgba(255,106,0,.20) !important;
        border-radius: 12px !important;
        background: linear-gradient(180deg,#fff,#f8fafc) !important;
        color: #001b47 !important;
        padding: 10px 12px !important;
        font-size: 13px !important;
        line-height: 1.35 !important;
        font-weight: 720 !important;
        letter-spacing: 0 !important;
        box-shadow: 0 8px 18px rgba(0,27,71,.045) !important;
      }
      .feed-job-meta span b,
      .feed-event-post-meta span b,
      .social-feed-event-card .feed-event-post-meta span b,
      .annexed-feed-middle .social-feed-event-card .feed-event-post-meta span b,
      .results .feed-job-meta span b,
      .results .feed-event-post-meta span b {
        display: block !important;
        margin-bottom: 5px !important;
        color: #667085 !important;
        font-size: 10px !important;
        line-height: 1 !important;
        font-weight: 760 !important;
        letter-spacing: 0 !important;
        text-transform: none !important;
      }
      .item-detail-modal.is-event .item-event-grid {
        width: 100% !important;
        display: grid !important;
        grid-template-columns: repeat(3,minmax(0,1fr)) !important;
        gap: 10px !important;
        padding: 14px 16px 0 !important;
      }
      .item-detail-modal.is-event .item-event-grid span {
        border: 1px solid rgba(0,27,71,.08) !important;
        border-top-color: rgba(255,106,0,.20) !important;
        border-radius: 12px !important;
        background: linear-gradient(180deg,#fff,#f8fafc) !important;
        color: #001b47 !important;
        padding: 11px 12px !important;
        font-size: 13px !important;
        line-height: 1.35 !important;
        font-weight: 720 !important;
        letter-spacing: 0 !important;
        box-shadow: 0 8px 18px rgba(0,27,71,.045) !important;
      }
      .item-detail-modal.is-event .item-event-grid b {
        display: block !important;
        margin-bottom: 5px !important;
        color: #667085 !important;
        font-size: 10px !important;
        line-height: 1 !important;
        font-weight: 760 !important;
        letter-spacing: 0 !important;
        text-transform: none !important;
      }
      .item-detail-modal.is-event .item-event-grid em {
        display: block !important;
        color: #001b47 !important;
        font-style: normal !important;
        font-size: 13px !important;
        line-height: 1.35 !important;
        font-weight: 720 !important;
        letter-spacing: 0 !important;
      }
      @media (max-width: 640px) {
        .item-detail-modal.is-event .item-event-grid {
          grid-template-columns: 1fr !important;
        }
      }
      .feed-job-hero strong,
      .feed-event-post-hero strong,
      .feed-job-cover-editor > strong,
      .feed-event-preview strong,
      .feed-article-card-body h2,
      .home-created-body h3,
      .home-flow-body h3,
      .social-feed-quote-title,
      .caption strong,
      .reel-card .caption strong,
      .feed-clip-card .caption strong,
      .feed-product-clip-card .caption strong,
      .annexed-feed-middle .feed-clip-card .caption strong,
      .annexed-feed-middle .feed-product-clip-card .caption strong,
      .annexed-feed-middle .feed-list .feed-clip-card .caption strong,
      .annexed-feed-middle .feed-list .feed-product-clip-card .caption strong,
      [data-unified-feed-cards="true"] .social-feed-quote-title,
      .results .feed-article-card-body h2,
      .results .feed-job-hero strong,
      .results .feed-event-post-hero strong {
        font-size: 17px !important;
        line-height: 1.24 !important;
        font-weight: 620 !important;
        letter-spacing: 0 !important;
      }
      .social-feed-text-panel p,
      .social-feed-card.is-text-only .social-feed-text-panel p,
      .annexed-feed-middle .social-feed-text-panel p,
      .annexed-feed-middle .social-feed-card.is-text-only .social-feed-text-panel p,
      .annexed-feed-middle .feed-list .social-feed-card.is-text-only .social-feed-text-panel p,
      [data-unified-feed-cards="true"] .social-feed-text-panel p,
      .feed-list .social-feed-card.is-text-only .social-feed-text-panel p,
      .results .social-feed-text-panel p,
      .home-created-card.is-post .home-created-body h3,
      .home-created-card.is-post .home-created-body p,
      .item-detail-modal.is-post.is-text-post .item-detail-copy > h2,
      .item-detail-modal.is-post.is-text-post .item-detail-description {
        color: #344054 !important;
        font-size: 14.5px !important;
        line-height: 1.55 !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
      }
      .composer textarea,
      .composer textarea::placeholder,
      [data-feed-compose-text],
      [data-feed-compose-text]::placeholder,
      [data-compose-text],
      [data-compose-text]::placeholder {
        font-family: inherit !important;
        font-size: 14px !important;
        line-height: 1.48 !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
      }
      .composer textarea,
      [data-feed-compose-text],
      [data-compose-text] {
        color: #344054 !important;
      }
      .composer textarea::placeholder,
      [data-feed-compose-text]::placeholder,
      [data-compose-text]::placeholder {
        color: #7a869e !important;
        opacity: 1 !important;
      }
      .feed-article-card-body p,
      .home-created-body p,
      .home-flow-body p,
      .social-feed-quote-text,
      .caption > span,
      .product-clip-copy,
      .annexed-feed-middle .feed-clip-card .caption > span,
      .annexed-feed-middle .product-clip-copy,
      .annexed-feed-middle .feed-list .feed-clip-card .caption > span,
      .annexed-feed-middle .feed-list .product-clip-copy,
      [data-unified-feed-cards="true"] .social-feed-quote-text,
      .results .feed-article-card-body p {
        font-size: 13px !important;
        line-height: 1.48 !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
      }
      .social-feed-caption,
      .annexed-feed-middle .social-feed-caption,
      .annexed-feed-middle .feed-list .social-feed-card .social-feed-caption,
      [data-unified-feed-cards="true"] .social-feed-caption,
      .results .social-feed-caption {
        font-weight: 430 !important;
        letter-spacing: 0 !important;
      }
      .social-feed-caption strong,
      .annexed-feed-middle .social-feed-caption strong,
      [data-unified-feed-cards="true"] .social-feed-caption strong,
      .results .social-feed-caption strong {
        font-weight: 600 !important;
        letter-spacing: 0 !important;
      }
      .feed-job-hero span,
      .feed-event-post-hero span,
      .feed-job-cover-editor > span,
      .feed-event-preview-badge,
      .feed-article-card-body > span,
      .product-source,
      .feed-product-card .body .product-source,
      .results .feed-job-hero span,
      .results .feed-event-post-hero span {
        font-size: 11px !important;
        line-height: 1.18 !important;
        font-weight: 400 !important;
        color: #b45309 !important;
        letter-spacing: 0 !important;
      }
      .product-clip-panel strong,
      .feed-list .product-clip-panel strong,
      .results .product-clip-panel strong,
      .annexed-feed-middle .product-clip-panel strong,
      .annexed-feed-middle .feed-list .product-clip-panel strong,
      [data-unified-feed-cards="true"] .product-clip-panel strong,
      .reel-product-strip strong,
      .search-reel-product strong {
        font-size: 12px !important;
        line-height: 1.28 !important;
        font-weight: 500 !important;
        letter-spacing: 0 !important;
      }
      .product-clip-panel span,
      .feed-list .product-clip-panel span,
      .results .product-clip-panel span,
      .annexed-feed-middle .product-clip-panel span,
      .annexed-feed-middle .feed-list .product-clip-panel span,
      [data-unified-feed-cards="true"] .product-clip-panel span,
      .reel-product-strip span,
      .search-reel-product span {
        font-size: 10.5px !important;
        line-height: 1.3 !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
      }
      .product-clip-price,
      .feed-list .product-clip-price,
      .results .product-clip-price,
      .annexed-feed-middle .product-clip-price,
      .annexed-feed-middle .feed-list .product-clip-price,
      [data-unified-feed-cards="true"] .product-clip-price,
      .social-feed-product-price,
      .feed-list .social-feed-product-price,
      .results .social-feed-product-price,
      .annexed-feed-middle .social-feed-product-price,
      .feed-product-card .price,
      .feed-list .feed-product-card .price,
      .results .feed-product-card .price {
        font-size: 13px !important;
        line-height: 1 !important;
        font-weight: 600 !important;
        letter-spacing: 0 !important;
      }
      [data-home-static-product-list] .feed-product-card h3,
      [data-home-static-product-list] .product-card h3 {
        display: -webkit-box !important;
        overflow: hidden !important;
        white-space: normal !important;
        overflow-wrap: anywhere !important;
        -webkit-box-orient: vertical !important;
        -webkit-line-clamp: 2 !important;
      }
      [data-home-static-product-list] .feed-product-card .body > p,
      [data-home-static-product-list] .product-card .body > p {
        display: block !important;
        overflow: hidden !important;
        white-space: nowrap !important;
        text-overflow: ellipsis !important;
      }
      [data-home-static-product-list] .feed-product-card > .social-feed-more,
      [data-home-static-product-list] .product-card > .social-feed-more {
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        z-index: 12 !important;
        display: grid !important;
        place-items: center !important;
      }
    </style>`;

const sharedProductClipGlassStyle = String.raw`
    <style data-emy-product-clip-glass>
      .product-clip-panel,
      .feed-list .product-clip-panel,
      .results .product-clip-panel,
      .annexed-feed-middle .product-clip-panel,
      .annexed-feed-middle .feed-list .product-clip-panel,
      [data-unified-feed-cards="true"] .product-clip-panel,
      .reel-product-strip,
      .search-reel-product {
        position: relative !important;
        isolation: isolate !important;
        overflow: hidden !important;
        height: auto !important;
        min-height: 48px !important;
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) auto !important;
        grid-template-rows: auto auto !important;
        align-items: center !important;
        gap: 3px 8px !important;
        margin-top: 6px !important;
        border: 1px solid rgba(255,255,255,.42) !important;
        border-radius: 8px !important;
        background: rgba(17,24,39,.34) !important;
        color: #fff !important;
        padding: 7px 8px !important;
        transform: translateZ(0) !important;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.12) !important;
        backdrop-filter: blur(19px) saturate(1.22) !important;
        -webkit-backdrop-filter: blur(19px) saturate(1.22) !important;
      }
      .product-clip-panel::before,
      .feed-list .product-clip-panel::before,
      .results .product-clip-panel::before,
      .annexed-feed-middle .product-clip-panel::before,
      .annexed-feed-middle .feed-list .product-clip-panel::before,
      [data-unified-feed-cards="true"] .product-clip-panel::before,
      .reel-product-strip::before,
      .search-reel-product::before {
        content: "" !important;
        display: none !important;
        position: absolute !important;
        inset: 1px !important;
        z-index: -1 !important;
        border-radius: 7px !important;
        background: linear-gradient(135deg, rgba(255,255,255,.34), transparent 38%, rgba(255,255,255,.08) 100%) !important;
        pointer-events: none !important;
      }
      .product-clip-panel strong,
      .feed-list .product-clip-panel strong,
      .results .product-clip-panel strong,
      .annexed-feed-middle .product-clip-panel strong,
      .annexed-feed-middle .feed-list .product-clip-panel strong,
      [data-unified-feed-cards="true"] .product-clip-panel strong,
      .reel-product-strip strong,
      .search-reel-product strong {
        position: relative !important;
        z-index: 1 !important;
        display: block !important;
        min-height: 0 !important;
        overflow: hidden !important;
        color: rgba(255,255,255,.94) !important;
        font-size: 12px !important;
        line-height: 1.28 !important;
        font-weight: 500 !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        text-shadow: none !important;
      }
      .product-clip-panel span,
      .feed-list .product-clip-panel span,
      .results .product-clip-panel span,
      .annexed-feed-middle .product-clip-panel span,
      .annexed-feed-middle .feed-list .product-clip-panel span,
      [data-unified-feed-cards="true"] .product-clip-panel span,
      .reel-product-strip span,
      .search-reel-product span {
        position: relative !important;
        z-index: 1 !important;
        display: block !important;
        overflow: hidden !important;
        min-height: 0 !important;
        margin-top: 0 !important;
        color: rgba(255,255,255,.76) !important;
        font-size: 10.5px !important;
        line-height: 1.24 !important;
        font-weight: 400 !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }
      .product-clip-price,
      .feed-list .product-clip-price,
      .results .product-clip-price,
      .annexed-feed-middle .product-clip-price,
      .annexed-feed-middle .feed-list .product-clip-price,
      [data-unified-feed-cards="true"] .product-clip-price,
      .reel-product-strip b,
      .search-reel-product b {
        position: relative !important;
        z-index: 1 !important;
        grid-column: 2 !important;
        grid-row: 1 / span 2 !important;
        min-height: 24px !important;
        width: fit-content !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin-top: 0 !important;
        align-self: center !important;
        border: 1px solid rgba(255,255,255,.48) !important;
        border-radius: 999px !important;
        background: rgba(255,255,255,.16) !important;
        color: rgba(255,255,255,.96) !important;
        padding: 0 10px !important;
        font-size: 11.5px !important;
        line-height: 1 !important;
        font-weight: 600 !important;
        font-style: normal !important;
        white-space: nowrap !important;
        box-shadow: none !important;
        text-shadow: none !important;
        backdrop-filter: blur(14px) saturate(1.18) !important;
        -webkit-backdrop-filter: blur(14px) saturate(1.18) !important;
      }
      .social-feed-product-price,
      .feed-list .social-feed-product-price,
      .results .social-feed-product-price,
      .annexed-feed-middle .social-feed-product-price {
        position: absolute !important;
        left: 12px !important;
        bottom: 12px !important;
        z-index: 3 !important;
        min-height: 26px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border: 1px solid rgba(255,255,255,.48) !important;
        border-radius: 999px !important;
        background: rgba(17,24,39,.34) !important;
        color: rgba(255,255,255,.96) !important;
        padding: 0 10px !important;
        font-size: 11.5px !important;
        line-height: 1 !important;
        font-weight: 600 !important;
        white-space: nowrap !important;
        box-shadow: none !important;
        text-shadow: none !important;
        backdrop-filter: blur(14px) saturate(1.18) !important;
        -webkit-backdrop-filter: blur(14px) saturate(1.18) !important;
      }
      .feed-product-clip-card .caption,
      .feed-list .feed-product-clip-card .caption,
      .results .feed-product-clip-card .caption,
      .annexed-feed-middle .feed-product-clip-card .caption,
      .annexed-feed-middle .feed-list .feed-product-clip-card .caption,
      [data-unified-feed-cards="true"] .feed-product-clip-card .caption,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card .caption {
        background: transparent !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
      .feed-product-clip-card .caption::before,
      .feed-product-clip-card .caption::after,
      .feed-list .feed-product-clip-card .caption::before,
      .feed-list .feed-product-clip-card .caption::after,
      .results .feed-product-clip-card .caption::before,
      .results .feed-product-clip-card .caption::after,
      .annexed-feed-middle .feed-product-clip-card .caption::before,
      .annexed-feed-middle .feed-product-clip-card .caption::after,
      .annexed-feed-middle .feed-list .feed-product-clip-card .caption::before,
      .annexed-feed-middle .feed-list .feed-product-clip-card .caption::after,
      [data-unified-feed-cards="true"] .feed-product-clip-card .caption::before,
      [data-unified-feed-cards="true"] .feed-product-clip-card .caption::after,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card .caption::before,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card .caption::after {
        display: none !important;
        background: transparent !important;
        box-shadow: none !important;
      }
      .feed-product-clip-card .caption strong,
      .feed-product-clip-card .caption span,
      .feed-product-clip-card .caption em,
      .feed-list .feed-product-clip-card .caption strong,
      .feed-list .feed-product-clip-card .caption span,
      .feed-list .feed-product-clip-card .caption em,
      .results .feed-product-clip-card .caption strong,
      .results .feed-product-clip-card .caption span,
      .results .feed-product-clip-card .caption em,
      .annexed-feed-middle .feed-product-clip-card .caption strong,
      .annexed-feed-middle .feed-product-clip-card .caption span,
      .annexed-feed-middle .feed-product-clip-card .caption em,
      .annexed-feed-middle .feed-list .feed-product-clip-card .caption strong,
      .annexed-feed-middle .feed-list .feed-product-clip-card .caption span,
      .annexed-feed-middle .feed-list .feed-product-clip-card .caption em,
      [data-unified-feed-cards="true"] .feed-product-clip-card .caption strong,
      [data-unified-feed-cards="true"] .feed-product-clip-card .caption span,
      [data-unified-feed-cards="true"] .feed-product-clip-card .caption em,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card .caption strong,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card .caption span,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card .caption em {
        text-shadow: none !important;
      }
      @media (max-width: 520px) {
        .product-clip-panel,
        .feed-list .product-clip-panel,
        .results .product-clip-panel,
        .annexed-feed-middle .product-clip-panel,
        .annexed-feed-middle .feed-list .product-clip-panel,
        [data-unified-feed-cards="true"] .product-clip-panel,
        .reel-product-strip,
        .search-reel-product {
          min-height: 42px !important;
          padding: 6px 7px !important;
        }
        .product-clip-panel strong,
        .feed-list .product-clip-panel strong,
        .results .product-clip-panel strong,
        .annexed-feed-middle .product-clip-panel strong,
        .annexed-feed-middle .feed-list .product-clip-panel strong,
        [data-unified-feed-cards="true"] .product-clip-panel strong,
        .reel-product-strip strong,
        .search-reel-product strong {
          font-size: 11.5px !important;
        }
        .product-clip-price,
        .feed-list .product-clip-price,
        .results .product-clip-price,
        .annexed-feed-middle .product-clip-price,
        .annexed-feed-middle .feed-list .product-clip-price,
        [data-unified-feed-cards="true"] .product-clip-price,
        .reel-product-strip b,
        .search-reel-product b {
          min-height: 22px !important;
          padding: 0 8px !important;
          font-size: 10.5px !important;
        }
        .social-feed-product-price,
        .feed-list .social-feed-product-price,
        .results .social-feed-product-price,
        .annexed-feed-middle .social-feed-product-price {
          min-height: 22px !important;
          padding: 0 8px !important;
          font-size: 10.5px !important;
        }
      }
    </style>`;

const sharedClipCleanMediaOverlaysStyle = String.raw`
    <style data-emy-clip-clean-media-overlays>
      .clip-viewer-caption,
      .clip-viewer-media .emy-media-overlay-text,
      .clip-viewer-slide .emy-media-overlay-text,
      .reel-card .emy-media-overlay-text,
      .feed-clip-card .emy-media-overlay-text,
      .feed-product-clip-card .emy-media-overlay-text,
      .business-posted-clip-card .emy-media-overlay-text,
      .search-reel-card .emy-media-overlay-text,
      .product-clip-panel,
      .feed-list .product-clip-panel,
      .results .product-clip-panel,
      .annexed-feed-middle .product-clip-panel,
      .annexed-feed-middle .feed-list .product-clip-panel,
      .annexed-feed-middle .social-feed-card.is-clip .product-clip-panel,
      .business-posted-list .business-posted-clip-card.reel-card .product-clip-panel,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card .product-clip-panel,
      [data-unified-feed-cards="true"] .product-clip-panel,
      .product-clip-copy,
      .reel-product-strip,
      .search-reel-product,
      .feed-product-clip-card .social-feed-product-price {
        display: none !important;
      }
      .feed-clip-card,
      .feed-product-clip-card,
      .reel-card.feed-clip-card,
      .reel-card.feed-product-clip-card,
      .feed-list .feed-clip-card,
      .feed-list .feed-product-clip-card,
      .results .feed-clip-card,
      .results .feed-product-clip-card,
      .annexed-feed-middle .feed-clip-card,
      .annexed-feed-middle .feed-product-clip-card,
      .annexed-feed-middle .feed-list .feed-clip-card,
      .annexed-feed-middle .feed-list .feed-product-clip-card,
      .business-posted-list .business-posted-clip-card.feed-clip-card,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card,
      [data-unified-feed-cards="true"] .feed-clip-card,
      [data-unified-feed-cards="true"] .feed-product-clip-card {
        background: #05070b !important;
        background-image: none !important;
        color: #fff !important;
      }
      .feed-clip-card,
      .feed-product-clip-card,
      .reel-card.feed-clip-card,
      .reel-card.feed-product-clip-card,
      .feed-list .feed-clip-card,
      .feed-list .feed-product-clip-card,
      .results .feed-clip-card,
      .results .feed-product-clip-card,
      .business-preview-card.feed-clip-card,
      .business-preview-card.feed-product-clip-card,
      .business-preview-card-reel,
      .annexed-feed-middle .feed-clip-card,
      .annexed-feed-middle .feed-product-clip-card,
      .annexed-feed-middle .feed-list .feed-clip-card,
      .annexed-feed-middle .feed-list .feed-product-clip-card,
      .business-posted-list .business-posted-clip-card.feed-clip-card,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card,
      [data-unified-feed-cards="true"] .feed-clip-card,
      [data-unified-feed-cards="true"] .feed-product-clip-card {
        border: 0 !important;
        outline: 0 !important;
        box-shadow: 0 8px 22px rgba(0,27,71,.075) !important;
        background-clip: padding-box !important;
      }
      .feed-product-clip-card,
      .reel-card.feed-product-clip-card,
      .feed-list .feed-product-clip-card,
      .results .feed-product-clip-card,
      .annexed-feed-middle .feed-product-clip-card,
      .annexed-feed-middle .feed-list .feed-product-clip-card,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card,
      [data-unified-feed-cards="true"] .feed-product-clip-card {
        background: #05070b !important;
        background-image: none !important;
      }
      .feed-clip-card .photo,
      .feed-clip-card .photo.pizza,
      .feed-clip-card .photo.reel,
      .feed-clip-card .photo.reel-a,
      .feed-clip-card .photo.reel-b,
      .feed-product-clip-card .photo,
      .feed-product-clip-card .photo.pizza,
      .feed-product-clip-card .photo.reel,
      .feed-product-clip-card .photo.reel-a,
      .feed-product-clip-card .photo.reel-b,
      .reel-card.feed-clip-card .photo,
      .reel-card.feed-product-clip-card .photo,
      .feed-list .feed-clip-card .photo,
      .feed-list .feed-clip-card .photo.pizza,
      .feed-list .feed-clip-card .photo.reel,
      .feed-list .feed-product-clip-card .photo,
      .feed-list .feed-product-clip-card .photo.pizza,
      .feed-list .feed-product-clip-card .photo.reel,
      .results .feed-clip-card .photo,
      .results .feed-clip-card .photo.pizza,
      .results .feed-clip-card .photo.reel,
      .results .feed-product-clip-card .photo,
      .results .feed-product-clip-card .photo.pizza,
      .results .feed-product-clip-card .photo.reel,
      .annexed-feed-middle .feed-clip-card .photo,
      .annexed-feed-middle .feed-clip-card .photo.pizza,
      .annexed-feed-middle .feed-clip-card .photo.reel,
      .annexed-feed-middle .feed-product-clip-card .photo,
      .annexed-feed-middle .feed-product-clip-card .photo.pizza,
      .annexed-feed-middle .feed-product-clip-card .photo.reel,
      .annexed-feed-middle .feed-list .feed-clip-card .photo,
      .annexed-feed-middle .feed-list .feed-product-clip-card .photo,
      .business-posted-list .business-posted-clip-card.feed-clip-card .photo,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card .photo,
      [data-unified-feed-cards="true"] .feed-clip-card .photo,
      [data-unified-feed-cards="true"] .feed-product-clip-card .photo,
      .clip-viewer-media,
      .clip-viewer-media.pizza,
      .clip-viewer-media.shop,
      .clip-viewer-media.bottle,
      .clip-viewer-media.clear-bottle,
      .clip-viewer-media.feed,
      .clip-viewer-media.reel,
      .clip-viewer-media.reel-a,
      .clip-viewer-media.reel-b {
        background: #05070b !important;
        background-image: none !important;
        opacity: 1 !important;
      }
      .feed-clip-card .photo img,
      .feed-clip-card .photo video,
      .feed-product-clip-card .photo img,
      .feed-product-clip-card .photo video,
      .reel-card.feed-clip-card .photo img,
      .reel-card.feed-clip-card .photo video,
      .reel-card.feed-product-clip-card .photo img,
      .reel-card.feed-product-clip-card .photo video,
      .business-preview-card-reel .photo img,
      .business-preview-card-reel .photo video,
      .business-preview-card-reel .business-preview-media img,
      .business-preview-card-reel .business-preview-media video,
      [data-unified-feed-cards="true"] .feed-clip-card .photo img,
      [data-unified-feed-cards="true"] .feed-clip-card .photo video,
      [data-unified-feed-cards="true"] .feed-product-clip-card .photo img,
      [data-unified-feed-cards="true"] .feed-product-clip-card .photo video {
        position: absolute !important;
        inset: 0 !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        opacity: 1 !important;
        visibility: visible !important;
        background: transparent !important;
      }
      .clip-viewer-media,
      .clip-viewer-media.pizza,
      .clip-viewer-media.shop,
      .clip-viewer-media.bottle,
      .clip-viewer-media.clear-bottle,
      .clip-viewer-media.feed,
      .clip-viewer-media.reel,
      .clip-viewer-media.reel-a,
      .clip-viewer-media.reel-b {
        background: #05070b !important;
      }
      .feed-clip-card .photo::before,
      .feed-clip-card .photo::after,
      .feed-product-clip-card .photo::before,
      .feed-product-clip-card .photo::after,
      .reel-card.feed-clip-card .photo::before,
      .reel-card.feed-clip-card .photo::after,
      .reel-card.feed-product-clip-card .photo::before,
      .reel-card.feed-product-clip-card .photo::after,
      .feed-list .feed-clip-card .photo::before,
      .feed-list .feed-clip-card .photo::after,
      .feed-list .feed-product-clip-card .photo::before,
      .feed-list .feed-product-clip-card .photo::after,
      .results .feed-clip-card .photo::before,
      .results .feed-clip-card .photo::after,
      .results .feed-product-clip-card .photo::before,
      .results .feed-product-clip-card .photo::after,
      .annexed-feed-middle .feed-clip-card .photo::before,
      .annexed-feed-middle .feed-clip-card .photo::after,
      .annexed-feed-middle .feed-product-clip-card .photo::before,
      .annexed-feed-middle .feed-product-clip-card .photo::after,
      .business-posted-list .business-posted-clip-card.feed-clip-card .photo::before,
      .business-posted-list .business-posted-clip-card.feed-clip-card .photo::after,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card .photo::before,
      .business-posted-list .business-posted-clip-card.feed-product-clip-card .photo::after,
      .results .reel-card .media::before,
      .results .reel-card .media::after,
      .clip-viewer-media::before,
      .clip-viewer-media::after {
        background: transparent !important;
        background-image: none !important;
        box-shadow: none !important;
      }
      .feed-clip-card .social-feed-actions-counted,
      .feed-product-clip-card .social-feed-actions-counted,
      .feed-clip-card .social-feed-body-counted,
      .feed-product-clip-card .social-feed-body-counted,
      .reel-card .social-feed-actions-counted,
      .reel-card .social-feed-body-counted,
      .feed-clip-card .reel-actions,
      .feed-product-clip-card .reel-actions,
      .reel-card .reel-actions,
      .business-preview-card-reel .reel-actions,
      .business-posted-clip-card .reel-actions,
      .annexed-feed-middle .feed-clip-card .social-feed-actions-counted,
      .annexed-feed-middle .feed-product-clip-card .social-feed-actions-counted,
      .annexed-feed-middle .feed-clip-card .social-feed-body-counted,
      .annexed-feed-middle .feed-product-clip-card .social-feed-body-counted,
      .results .feed-clip-card .social-feed-actions-counted,
      .results .feed-product-clip-card .social-feed-actions-counted,
      .results .feed-clip-card .social-feed-body-counted,
      .results .feed-product-clip-card .social-feed-body-counted {
        background: transparent !important;
        background-image: none !important;
        border-color: rgba(255,255,255,.20) !important;
        box-shadow: none !important;
        color: rgba(255,255,255,.92) !important;
        text-shadow: 0 1px 8px rgba(0,27,71,.38) !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
      .feed-clip-card .social-feed-actions-counted::before,
      .feed-clip-card .social-feed-actions-counted::after,
      .feed-product-clip-card .social-feed-actions-counted::before,
      .feed-product-clip-card .social-feed-actions-counted::after,
      .feed-clip-card .social-feed-body-counted::before,
      .feed-clip-card .social-feed-body-counted::after,
      .feed-product-clip-card .social-feed-body-counted::before,
      .feed-product-clip-card .social-feed-body-counted::after,
      .feed-clip-card .reel-actions::before,
      .feed-clip-card .reel-actions::after,
      .feed-product-clip-card .reel-actions::before,
      .feed-product-clip-card .reel-actions::after,
      .reel-card .social-feed-actions-counted::before,
      .reel-card .social-feed-actions-counted::after,
      .reel-card .social-feed-body-counted::before,
      .reel-card .social-feed-body-counted::after,
      .reel-card .reel-actions::before,
      .reel-card .reel-actions::after,
      .business-preview-card-reel .reel-actions::before,
      .business-preview-card-reel .reel-actions::after,
      .business-posted-clip-card .reel-actions::before,
      .business-posted-clip-card .reel-actions::after {
        display: none !important;
        content: none !important;
        background: transparent !important;
        box-shadow: none !important;
      }
      .feed-clip-card .social-feed-action-set,
      .feed-product-clip-card .social-feed-action-set,
      .feed-clip-card .social-feed-action-pair,
      .feed-product-clip-card .social-feed-action-pair {
        background: transparent !important;
        background-image: none !important;
        box-shadow: none !important;
      }
      .feed-clip-card .social-feed-icon,
      .feed-product-clip-card .social-feed-icon,
      .feed-clip-card .feed-action.social-feed-icon,
      .feed-product-clip-card .feed-action.social-feed-icon {
        border-color: rgba(255,255,255,.26) !important;
        background: rgba(0,27,71,.24) !important;
        color: #fff !important;
        box-shadow: none !important;
        backdrop-filter: blur(10px) saturate(1.08) !important;
        -webkit-backdrop-filter: blur(10px) saturate(1.08) !important;
      }
      .feed-clip-card .social-feed-action-pair strong,
      .feed-product-clip-card .social-feed-action-pair strong,
      .feed-clip-card .reel-actions span,
      .feed-product-clip-card .reel-actions span,
      .reel-card .reel-actions span,
      .business-preview-card-reel .reel-actions span,
      .business-posted-clip-card .reel-actions span,
      .feed-clip-card .social-feed-time,
      .feed-product-clip-card .social-feed-time,
      .feed-clip-card .social-feed-comments-link,
      .feed-product-clip-card .social-feed-comments-link {
        background: transparent !important;
        color: rgba(255,255,255,.92) !important;
        text-shadow: 0 1px 8px rgba(0,27,71,.40) !important;
        box-shadow: none !important;
      }
      .feed-clip-card .reel-owner-link strong,
      .feed-product-clip-card .reel-owner-link strong,
      .business-posted-clip-card .reel-owner-link strong,
      .reel-card .reel-owner-link strong,
      .annexed-feed-middle .feed-clip-card .reel-owner-link strong,
      .annexed-feed-middle .feed-product-clip-card .reel-owner-link strong,
      .annexed-feed-middle .feed-list .feed-clip-card .reel-owner-link strong,
      .annexed-feed-middle .feed-list .feed-product-clip-card .reel-owner-link strong,
      .results .feed-clip-card .reel-owner-link strong,
      .results .feed-product-clip-card .reel-owner-link strong,
      .results .reel-card .reel-owner-link strong,
      [data-unified-feed-cards="true"] .feed-clip-card .reel-owner-link strong,
      [data-unified-feed-cards="true"] .feed-product-clip-card .reel-owner-link strong,
      [data-unified-feed-cards="true"] .reel-card .reel-owner-link strong,
      .customer-public-activity-track .feed-clip-card .reel-owner-link strong,
      .customer-public-activity-track .feed-product-clip-card .reel-owner-link strong,
      .customer-public-activity-track .reel-card .reel-owner-link strong {
        font-size: 10px !important;
        line-height: 1.05 !important;
        font-weight: 760 !important;
        letter-spacing: 0 !important;
      }
      .feed-clip-card .reel-owner-link small,
      .feed-product-clip-card .reel-owner-link small,
      .business-posted-clip-card .reel-owner-link small,
      .annexed-feed-middle .feed-clip-card .reel-owner-link small,
      .annexed-feed-middle .feed-product-clip-card .reel-owner-link small,
      .results .feed-clip-card .reel-owner-link small,
      .results .feed-product-clip-card .reel-owner-link small,
      [data-unified-feed-cards="true"] .reel-card .reel-owner-link small,
      .reel-card .reel-type-badge,
      .feed-clip-card .reel-type-badge,
      .feed-product-clip-card .reel-type-badge {
        display: none !important;
      }
      .reel-card .caption > strong,
      .reel-card .caption > em,
      .feed-clip-card .caption > strong,
      .feed-clip-card .caption > em,
      .feed-product-clip-card .caption > strong,
      .feed-product-clip-card .caption > em,
      .annexed-feed-middle .feed-clip-card .caption > strong,
      .annexed-feed-middle .feed-clip-card .caption > em,
      .annexed-feed-middle .feed-product-clip-card .caption > strong,
      .annexed-feed-middle .feed-product-clip-card .caption > em,
      .business-posted-list .business-posted-clip-card .caption > strong,
      .business-posted-list .business-posted-clip-card .caption > em,
      .reel-card .caption > span:not(.reel-actions):not(.clip-progress):not(.clip-progress-fill):not(.video-duration-badge),
      .feed-clip-card .caption > span:not(.reel-actions):not(.clip-progress):not(.clip-progress-fill):not(.video-duration-badge),
      .feed-product-clip-card .caption > span:not(.reel-actions):not(.clip-progress):not(.clip-progress-fill):not(.video-duration-badge),
      .annexed-feed-middle .feed-clip-card .caption > span:not(.reel-actions):not(.clip-progress):not(.clip-progress-fill):not(.video-duration-badge),
      .annexed-feed-middle .feed-product-clip-card .caption > span:not(.reel-actions):not(.clip-progress):not(.clip-progress-fill):not(.video-duration-badge),
      .business-posted-list .business-posted-clip-card .caption > span:not(.reel-actions):not(.clip-progress):not(.clip-progress-fill):not(.video-duration-badge) {
        display: none !important;
      }
      .reel-card .caption,
      .feed-clip-card .caption,
      .feed-product-clip-card .caption,
      .business-preview-card-reel .caption,
      .business-posted-clip-card .caption,
      .annexed-feed-middle .feed-clip-card .caption,
      .annexed-feed-middle .feed-product-clip-card .caption,
      .annexed-feed-middle .feed-list .feed-clip-card .caption,
      .annexed-feed-middle .feed-list .feed-product-clip-card .caption,
      .business-posted-list .business-posted-clip-card .caption,
      [data-unified-feed-cards="true"] .feed-clip-card .caption,
      [data-unified-feed-cards="true"] .feed-product-clip-card .caption {
        min-height: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
      .reel-card .caption::before,
      .reel-card .caption::after,
      .feed-clip-card .caption::before,
      .feed-clip-card .caption::after,
      .feed-product-clip-card .caption::before,
      .feed-product-clip-card .caption::after,
      .business-preview-card-reel .caption::before,
      .business-preview-card-reel .caption::after,
      .business-posted-clip-card .caption::before,
      .business-posted-clip-card .caption::after,
      .annexed-feed-middle .feed-clip-card .caption::before,
      .annexed-feed-middle .feed-clip-card .caption::after,
      .annexed-feed-middle .feed-product-clip-card .caption::before,
      .annexed-feed-middle .feed-product-clip-card .caption::after,
      .business-posted-list .business-posted-clip-card .caption::before,
      .business-posted-list .business-posted-clip-card .caption::after {
        display: none !important;
      }
    </style>`;

const sharedClipMiniProductOverlayStyle = String.raw`
    <style data-emy-clip-mini-product-overlay>
      .clip-product-mini,
      .reel-card .caption .clip-product-mini,
      .feed-clip-card .caption .clip-product-mini,
      .feed-product-clip-card .caption .clip-product-mini,
      .business-posted-clip-card .caption .clip-product-mini,
      .customer-public-activity-track .caption .clip-product-mini,
      [data-unified-feed-cards="true"] .caption .clip-product-mini {
        width: fit-content !important;
        max-width: min(100%, 220px) !important;
        min-height: 24px !important;
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) auto !important;
        align-items: center !important;
        gap: 6px !important;
        margin-top: 5px !important;
        border: 1px solid rgba(255,255,255,.22) !important;
        border-radius: 999px !important;
        background: rgba(0,27,71,.54) !important;
        color: #fff !important;
        padding: 4px 5px 4px 8px !important;
        box-shadow: 0 8px 18px rgba(0,27,71,.18) !important;
        backdrop-filter: blur(10px) saturate(1.08) !important;
        -webkit-backdrop-filter: blur(10px) saturate(1.08) !important;
        pointer-events: none !important;
      }
      .clip-product-mini.is-info,
      .reel-card .caption .clip-product-mini.is-info,
      .feed-clip-card .caption .clip-product-mini.is-info,
      .feed-product-clip-card .caption .clip-product-mini.is-info,
      .business-posted-clip-card .caption .clip-product-mini.is-info,
      .customer-public-activity-track .caption .clip-product-mini.is-info,
      [data-unified-feed-cards="true"] .caption .clip-product-mini.is-info {
        grid-template-columns: minmax(0, 1fr) !important;
        max-width: min(100%, 190px) !important;
        border-radius: 12px !important;
        padding: 5px 8px !important;
      }
      .clip-product-mini strong,
      .reel-card .caption .clip-product-mini strong,
      .feed-clip-card .caption .clip-product-mini strong,
      .feed-product-clip-card .caption .clip-product-mini strong,
      .business-posted-clip-card .caption .clip-product-mini strong,
      .customer-public-activity-track .caption .clip-product-mini strong,
      [data-unified-feed-cards="true"] .caption .clip-product-mini strong {
        min-width: 0 !important;
        display: block !important;
        overflow: hidden !important;
        color: #fff !important;
        font-size: 10.5px !important;
        line-height: 1.05 !important;
        font-weight: 850 !important;
        letter-spacing: 0 !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        text-shadow: 0 1px 6px rgba(0,27,71,.35) !important;
      }
      .clip-product-mini em,
      .reel-card .caption .clip-product-mini em,
      .feed-clip-card .caption .clip-product-mini em,
      .feed-product-clip-card .caption .clip-product-mini em,
      .business-posted-clip-card .caption .clip-product-mini em,
      .customer-public-activity-track .caption .clip-product-mini em,
      [data-unified-feed-cards="true"] .caption .clip-product-mini em {
        min-width: 0 !important;
        display: block !important;
        overflow: hidden !important;
        margin-top: 2px !important;
        color: rgba(255,255,255,.78) !important;
        font-size: 9.5px !important;
        line-height: 1.15 !important;
        font-style: normal !important;
        font-weight: 650 !important;
        letter-spacing: 0 !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        text-shadow: 0 1px 6px rgba(0,27,71,.28) !important;
      }
      .clip-product-mini span,
      .reel-card .caption .clip-product-mini span,
      .feed-clip-card .caption .clip-product-mini span,
      .feed-product-clip-card .caption .clip-product-mini span,
      .business-posted-clip-card .caption .clip-product-mini span,
      .customer-public-activity-track .caption .clip-product-mini span,
      [data-unified-feed-cards="true"] .caption .clip-product-mini span {
        min-height: 18px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 999px !important;
        background: rgba(255,244,232,.96) !important;
        color: #d85a00 !important;
        padding: 0 7px !important;
        font-size: 10px !important;
        line-height: 1 !important;
        font-weight: 900 !important;
        letter-spacing: 0 !important;
        white-space: nowrap !important;
        text-shadow: none !important;
      }
      .feed-clip-card .caption,
      .feed-product-clip-card .caption,
      .reel-card.is-clip .caption,
      .home-flow-item.is-clip .caption,
      .annexed-feed-middle .feed-clip-card .caption,
      .annexed-feed-middle .feed-product-clip-card .caption,
      .annexed-feed-middle .feed-list .feed-clip-card .caption,
      .annexed-feed-middle .feed-list .feed-product-clip-card .caption {
        top: auto !important;
        bottom: 8px !important;
        display: grid !important;
        align-content: end !important;
        gap: 5px !important;
        min-height: 62px !important;
        padding-top: 8px !important;
        padding-bottom: 4px !important;
        overflow: visible !important;
      }
      .business-posted-clip-card .caption,
      .business-posted-list .business-posted-clip-card .caption {
        bottom: 10px !important;
        display: grid !important;
        align-content: end !important;
        gap: 7px !important;
        min-height: 78px !important;
        padding-top: 20px !important;
        padding-bottom: 7px !important;
        overflow: visible !important;
      }
      .feed-clip-card .caption .reel-actions,
      .feed-product-clip-card .caption .reel-actions,
      .reel-card.is-clip .caption .reel-actions,
      .home-flow-item.is-clip .caption .reel-actions,
      .annexed-feed-middle .feed-clip-card .caption .reel-actions,
      .annexed-feed-middle .feed-product-clip-card .caption .reel-actions,
      .annexed-feed-middle .feed-list .feed-clip-card .caption .reel-actions,
      .annexed-feed-middle .feed-list .feed-product-clip-card .caption .reel-actions,
      .business-posted-clip-card .caption .reel-actions,
      .business-posted-list .business-posted-clip-card .caption .reel-actions {
        order: 1 !important;
        position: relative !important;
        z-index: 7 !important;
      }
      .feed-clip-card .caption .clip-product-mini,
      .feed-product-clip-card .caption .clip-product-mini,
      .reel-card.is-clip .caption .clip-product-mini,
      .home-flow-item.is-clip .caption .clip-product-mini,
      .annexed-feed-middle .feed-clip-card .caption .clip-product-mini,
      .annexed-feed-middle .feed-product-clip-card .caption .clip-product-mini,
      .annexed-feed-middle .feed-list .feed-clip-card .caption .clip-product-mini,
      .annexed-feed-middle .feed-list .feed-product-clip-card .caption .clip-product-mini,
      .business-posted-clip-card .caption .clip-product-mini,
      .business-posted-list .business-posted-clip-card .caption .clip-product-mini {
        order: 2 !important;
        position: relative !important;
        z-index: 9 !important;
        display: grid !important;
        visibility: visible !important;
        opacity: 1 !important;
        margin-top: 0 !important;
      }
    </style>`;

const sharedSearchClipCardFixStyle = String.raw`
    <style data-emy-search-clip-card-fix>
      .results .reel-card .caption,
      .results .reel-card.feed-clip-card .caption,
      .results .reel-card.feed-product-clip-card .caption,
      .reel-card.feed-clip-card .caption,
      .reel-card.feed-product-clip-card .caption,
      .reel-card.is-clip .caption {
        inset: auto 10px 18px 10px !important;
        z-index: 8 !important;
        display: grid !important;
        align-content: end !important;
        gap: 4px !important;
        height: auto !important;
        min-height: 0 !important;
        padding: 0 !important;
        color: #fff !important;
        background: transparent !important;
        box-shadow: none !important;
        pointer-events: none !important;
      }
      .results .reel-card .caption .reel-actions,
      .results .reel-card.feed-clip-card .caption .reel-actions,
      .results .reel-card.feed-product-clip-card .caption .reel-actions,
      .reel-card.feed-clip-card .caption .reel-actions,
      .reel-card.feed-product-clip-card .caption .reel-actions,
      .reel-card.is-clip .caption .reel-actions {
        order: 1 !important;
        position: static !important;
        display: flex !important;
        align-items: center !important;
        margin: 0 !important;
        color: rgba(255,255,255,.95) !important;
        font-size: 12px !important;
        line-height: 1 !important;
        font-weight: 900 !important;
        text-shadow: 0 1px 6px rgba(0,27,71,.38) !important;
      }
      .results .reel-card .caption .clip-product-mini,
      .results .reel-card.feed-clip-card .caption .clip-product-mini,
      .results .reel-card.feed-product-clip-card .caption .clip-product-mini,
      .reel-card.feed-clip-card .caption .clip-product-mini,
      .reel-card.feed-product-clip-card .caption .clip-product-mini,
      .reel-card.is-clip .caption .clip-product-mini {
        order: 2 !important;
        position: static !important;
        width: fit-content !important;
        max-width: min(100%, 230px) !important;
        min-height: 30px !important;
        display: grid !important;
        grid-template-columns: minmax(0,1fr) auto !important;
        align-items: center !important;
        gap: 8px !important;
        margin: 0 !important;
        border: 1px solid rgba(255,255,255,.22) !important;
        border-radius: 999px !important;
        background: rgba(40,69,106,.86) !important;
        color: #fff !important;
        padding: 5px 7px 5px 10px !important;
        box-shadow: 0 12px 26px rgba(0,27,71,.24) !important;
        pointer-events: none !important;
      }
      .results .reel-card .caption .clip-product-mini strong,
      .results .reel-card.feed-clip-card .caption .clip-product-mini strong,
      .results .reel-card.feed-product-clip-card .caption .clip-product-mini strong,
      .reel-card.feed-clip-card .caption .clip-product-mini strong,
      .reel-card.feed-product-clip-card .caption .clip-product-mini strong,
      .reel-card.is-clip .caption .clip-product-mini strong {
        min-width: 0 !important;
        overflow: hidden !important;
        color: #fff !important;
        font-size: 12px !important;
        line-height: 1.05 !important;
        font-weight: 900 !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        text-shadow: none !important;
      }
      .results .reel-card .caption .clip-product-mini span,
      .results .reel-card.feed-clip-card .caption .clip-product-mini span,
      .results .reel-card.feed-product-clip-card .caption .clip-product-mini span,
      .reel-card.feed-clip-card .caption .clip-product-mini span,
      .reel-card.feed-product-clip-card .caption .clip-product-mini span,
      .reel-card.is-clip .caption .clip-product-mini span {
        min-height: 20px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 999px !important;
        background: rgba(255,244,232,.98) !important;
        color: #d85a00 !important;
        padding: 0 8px !important;
        font-size: 10.5px !important;
        line-height: 1 !important;
        font-weight: 900 !important;
        white-space: nowrap !important;
        text-shadow: none !important;
      }
      .results .reel-card .overlay {
        inset: auto 10px 18px 10px !important;
        min-height: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        display: grid !important;
        gap: 4px !important;
      }
      .results .search-feed-time-only {
        display: block !important;
        margin: 10px 14px 0 auto !important;
        color: #98a2b3 !important;
        font-size: 11px !important;
        line-height: 1.1 !important;
        font-weight: 800 !important;
      }
      .results .reel-card > .search-feed-time-only {
        position: absolute !important;
        right: 12px !important;
        bottom: 10px !important;
        z-index: 9 !important;
        margin: 0 !important;
        color: rgba(255,255,255,.9) !important;
        text-shadow: 0 1px 6px rgba(0,27,71,.36) !important;
      }
      .results .feed-product-card > .emy-product-like-chip {
        right: 14px !important;
        bottom: 28px !important;
      }
      .results .reel-card .social-feed-actions,
      .results .reel-card .social-feed-actions-counted,
      .results .feed-product-card .social-feed-actions,
      .results .feed-product-card .social-feed-actions-counted,
      .results [data-feed-social-actions],
      .results .feed-comments {
        display: none !important;
      }
    </style>`;

const sharedBusinessClipProductMiniRestoreScript = String.raw`
    <script data-emy-business-clip-product-mini-restore>
      (() => {
        if (window.__emyBusinessClipProductMiniRestoreInstalled) return;
        window.__emyBusinessClipProductMiniRestoreInstalled = true;
        const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
        const escapeHtml = (value) => clean(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
        function firstText(card, selectors) {
          for (const selector of selectors) {
            const node = card && card.querySelector && card.querySelector(selector);
            const text = clean(node && node.textContent);
            if (text) return text;
          }
          return "";
        }
        function titleFor(card) {
          const data = card && card.dataset || {};
          return clean(data.productName || data.productTitle || data.detailTitle || data.title || data.name) ||
            firstText(card, [".clip-product-mini strong", ".product-clip-panel strong", ".reel-product-strip strong", ".search-reel-product strong", ".caption > strong"]);
        }
        function priceFor(card) {
          const data = card && card.dataset || {};
          return clean(data.detailPrice || data.productPrice || data.price || data.priceText) ||
            firstText(card, [".clip-product-mini-price", ".product-clip-price", ".reel-product-strip b", ".search-reel-product b", ".social-feed-product-price"]);
        }
        function restore(root) {
          const scope = root && root.querySelectorAll ? root : document;
          const cards = [];
          if (scope.matches && scope.matches(".business-posted-clip-card,.feed-product-clip-card,.feed-clip-card,.reel-card.is-clip")) cards.push(scope);
          if (scope.querySelectorAll) scope.querySelectorAll(".business-posted-clip-card,.feed-product-clip-card,.feed-clip-card,.reel-card.is-clip").forEach((card) => cards.push(card));
          cards.forEach((card) => {
            const caption = card.querySelector && card.querySelector(".caption");
            if (!caption) return;
            let mini = caption.querySelector("[data-clip-product-mini]");
            const title = titleFor(card);
            const price = priceFor(card);
            if (!mini && (title || price)) {
              mini = document.createElement("div");
              mini.className = "clip-product-mini" + (price ? "" : " is-info");
              mini.setAttribute("data-clip-product-mini", "");
              mini.setAttribute("data-emy-restored-product-mini", "true");
              mini.innerHTML = "<strong>" + escapeHtml(title || "Product") + "</strong>" + (price ? '<span class="clip-product-mini-price">' + escapeHtml(price) + "</span>" : "");
              caption.appendChild(mini);
            }
            if (!mini) return;
            mini.hidden = false;
            mini.removeAttribute("hidden");
            mini.style.display = "grid";
            mini.style.visibility = "visible";
            mini.style.opacity = "1";
          });
        }
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => restore(document), { once: true });
        } else {
          restore(document);
        }
        [80, 250, 700, 1500].forEach((delay) => setTimeout(() => restore(document), delay));
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes && mutation.addedNodes.forEach((node) => {
              if (node && node.nodeType === 1) restore(node);
            });
          });
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
      })();
    </script>`;

const sharedFeedsClipSizingStyle = String.raw`
    <style data-emy-feeds-clip-sizing>
      @media (max-width: 819px) {
        html,
        body {
          max-width: 100% !important;
          overflow-x: hidden !important;
        }
        .phone,
        .app-content,
        .annexed-feed-middle,
        [data-annexed-feed-list],
        .annexed-feed-middle .feed-list,
        .feed-list {
          max-width: 100% !important;
          min-width: 0 !important;
          overflow-x: clip !important;
        }
        .annexed-feed-middle .feed-list:not(.is-product-grid):not(.is-clip-grid),
        [data-annexed-feed-list]:not(.is-product-grid):not(.is-clip-grid) {
          width: 100% !important;
          grid-template-columns: minmax(0, 1fr) !important;
          justify-content: stretch !important;
          justify-items: stretch !important;
        }
        .annexed-feed-middle .feed-list > .feed-card,
        .annexed-feed-middle .feed-list > .social-feed-card,
        .annexed-feed-middle .feed-list > .post-card,
        .annexed-feed-middle .feed-list > .home-created-card,
        .annexed-feed-middle .feed-list > [data-feed-id],
        [data-annexed-feed-list] > .feed-card,
        [data-annexed-feed-list] > .social-feed-card,
        [data-annexed-feed-list] > .post-card,
        [data-annexed-feed-list] > .home-created-card,
        [data-annexed-feed-list] > [data-feed-id] {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          justify-self: stretch !important;
        }
        .annexed-feed-middle .feed-media,
        .annexed-feed-middle .social-feed-media,
        .annexed-feed-middle .home-created-media,
        .feed-media-carousel,
        .feed-media-carousel-slide,
        .feed-media-carousel-slide img,
        .feed-media-carousel-slide video,
        .feed-media-carousel-slide .emy-video-player {
          max-width: 100% !important;
          min-width: 0 !important;
        }
        .feed-media-carousel {
          width: 100% !important;
          overflow: hidden !important;
        }
      }
      @supports not (overflow: clip) {
        @media (max-width: 819px) {
          .phone,
          .app-content,
          .annexed-feed-middle,
          [data-annexed-feed-list],
          .annexed-feed-middle .feed-list,
          .feed-list {
            overflow-x: hidden !important;
          }
        }
      }
      .annexed-feed-middle .feed-list.is-clip-grid,
      .feed-list.is-clip-grid {
        grid-template-columns: minmax(0, 1fr) !important;
        width: min(100%, 344px) !important;
        justify-content: center !important;
        align-items: start !important;
        gap: 18px !important;
      }
      .annexed-feed-middle .feed-list .feed-clip-card,
      .annexed-feed-middle .feed-list .feed-product-clip-card,
      .feed-list.is-clip-grid > .feed-clip-card,
      .feed-list.is-clip-grid > .feed-product-clip-card {
        width: min(322px, 100%) !important;
        min-height: clamp(472px, 146vw, 572px) !important;
        justify-self: center !important;
      }
      .annexed-feed-middle .feed-list .social-feed-card.is-clip,
      .feed-list.is-clip-grid > .social-feed-card.is-clip {
        width: min(322px, 100%) !important;
        min-width: 0 !important;
        justify-self: center !important;
      }
      .annexed-feed-middle .feed-list .social-feed-card.is-clip .social-feed-media,
      .feed-list.is-clip-grid > .social-feed-card.is-clip .social-feed-media {
        min-height: clamp(472px, 146vw, 572px) !important;
        aspect-ratio: 9 / 16 !important;
      }
      .annexed-feed-middle .social-feed-card.is-repost .social-feed-repost-note,
      .feed-list .social-feed-card.is-repost .social-feed-repost-note,
      [data-unified-feed-cards="true"] .social-feed-card.is-repost .social-feed-repost-note,
      .business-posted-list .social-feed-card.is-repost .social-feed-repost-note,
      .customer-public-activity-track .social-feed-card.is-repost .social-feed-repost-note {
        margin: 8px 12px 2px !important;
        box-sizing: border-box !important;
      }
      .annexed-feed-middle .social-feed-card.is-repost .social-feed-caption,
      .feed-list .social-feed-card.is-repost .social-feed-caption,
      [data-unified-feed-cards="true"] .social-feed-card.is-repost .social-feed-caption,
      .business-posted-list .social-feed-card.is-repost .social-feed-caption,
      .customer-public-activity-track .social-feed-card.is-repost .social-feed-caption {
        margin: 8px 12px 3px !important;
        padding: 0 !important;
        box-sizing: border-box !important;
        overflow-wrap: anywhere !important;
      }
      .annexed-feed-middle .social-feed-card.is-repost .social-feed-quote,
      .annexed-feed-middle .social-feed-card.is-repost .social-feed-quote.feed-profile-link,
      .feed-list .social-feed-card.is-repost .social-feed-quote,
      .feed-list .social-feed-card.is-repost .social-feed-quote.feed-profile-link,
      [data-unified-feed-cards="true"] .social-feed-card.is-repost .social-feed-quote,
      [data-unified-feed-cards="true"] .social-feed-card.is-repost .social-feed-quote.feed-profile-link,
      .business-posted-list .social-feed-card.is-repost .social-feed-quote,
      .business-posted-list .social-feed-card.is-repost .social-feed-quote.feed-profile-link,
      .customer-public-activity-track .social-feed-card.is-repost .social-feed-quote,
      .customer-public-activity-track .social-feed-card.is-repost .social-feed-quote.feed-profile-link {
        width: auto !important;
        max-width: calc(100% - 24px) !important;
        margin: 8px 12px 10px !important;
        padding: 12px !important;
        box-sizing: border-box !important;
      }
      .annexed-feed-middle .social-feed-card.is-repost .social-feed-quote-title,
      .annexed-feed-middle .social-feed-card.is-repost .social-feed-quote-text,
      .feed-list .social-feed-card.is-repost .social-feed-quote-title,
      .feed-list .social-feed-card.is-repost .social-feed-quote-text,
      [data-unified-feed-cards="true"] .social-feed-card.is-repost .social-feed-quote-title,
      [data-unified-feed-cards="true"] .social-feed-card.is-repost .social-feed-quote-text,
      .business-posted-list .social-feed-card.is-repost .social-feed-quote-title,
      .business-posted-list .social-feed-card.is-repost .social-feed-quote-text,
      .customer-public-activity-track .social-feed-card.is-repost .social-feed-quote-title,
      .customer-public-activity-track .social-feed-card.is-repost .social-feed-quote-text {
        overflow-wrap: anywhere !important;
      }
      .annexed-feed-middle .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .social-feed-media:not(.social-feed-quote-media),
      .feed-list .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .social-feed-media:not(.social-feed-quote-media),
      [data-unified-feed-cards="true"] .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .social-feed-media:not(.social-feed-quote-media),
      .business-posted-list .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .social-feed-media:not(.social-feed-quote-media),
      .customer-public-activity-track .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .social-feed-media:not(.social-feed-quote-media) {
        width: auto !important;
        max-width: calc(100% - 24px) !important;
        margin-left: 12px !important;
        margin-right: 12px !important;
        margin-bottom: 6px !important;
        border-radius: 10px !important;
        box-sizing: border-box !important;
      }
      .annexed-feed-middle .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .feed-comments,
      .feed-list .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .feed-comments,
      [data-unified-feed-cards="true"] .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .feed-comments,
      .business-posted-list .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .feed-comments,
      .customer-public-activity-track .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .feed-comments {
        margin: 10px 12px 12px !important;
        border: 1px solid rgba(0,27,71,.07) !important;
        border-radius: 10px !important;
        box-sizing: border-box !important;
      }
      @media (max-width: 420px) {
        .annexed-feed-middle .social-feed-card.is-repost .social-feed-repost-note,
        .feed-list .social-feed-card.is-repost .social-feed-repost-note,
        [data-unified-feed-cards="true"] .social-feed-card.is-repost .social-feed-repost-note,
        .business-posted-list .social-feed-card.is-repost .social-feed-repost-note,
        .customer-public-activity-track .social-feed-card.is-repost .social-feed-repost-note {
          margin-left: 10px !important;
          margin-right: 10px !important;
        }
        .annexed-feed-middle .social-feed-card.is-repost .social-feed-caption,
        .feed-list .social-feed-card.is-repost .social-feed-caption,
        [data-unified-feed-cards="true"] .social-feed-card.is-repost .social-feed-caption,
        .business-posted-list .social-feed-card.is-repost .social-feed-caption,
        .customer-public-activity-track .social-feed-card.is-repost .social-feed-caption {
          margin-left: 10px !important;
          margin-right: 10px !important;
        }
        .annexed-feed-middle .social-feed-card.is-repost .social-feed-quote,
        .annexed-feed-middle .social-feed-card.is-repost .social-feed-quote.feed-profile-link,
        .feed-list .social-feed-card.is-repost .social-feed-quote,
        .feed-list .social-feed-card.is-repost .social-feed-quote.feed-profile-link,
        [data-unified-feed-cards="true"] .social-feed-card.is-repost .social-feed-quote,
        [data-unified-feed-cards="true"] .social-feed-card.is-repost .social-feed-quote.feed-profile-link,
        .business-posted-list .social-feed-card.is-repost .social-feed-quote,
        .business-posted-list .social-feed-card.is-repost .social-feed-quote.feed-profile-link,
        .customer-public-activity-track .social-feed-card.is-repost .social-feed-quote,
        .customer-public-activity-track .social-feed-card.is-repost .social-feed-quote.feed-profile-link {
          max-width: calc(100% - 20px) !important;
          margin-left: 10px !important;
          margin-right: 10px !important;
          padding: 11px !important;
        }
        .annexed-feed-middle .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .social-feed-media:not(.social-feed-quote-media),
        .feed-list .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .social-feed-media:not(.social-feed-quote-media),
        [data-unified-feed-cards="true"] .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .social-feed-media:not(.social-feed-quote-media),
        .business-posted-list .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .social-feed-media:not(.social-feed-quote-media),
        .customer-public-activity-track .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .social-feed-media:not(.social-feed-quote-media) {
          max-width: calc(100% - 20px) !important;
          margin-left: 10px !important;
          margin-right: 10px !important;
        }
        .annexed-feed-middle .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .feed-comments,
        .feed-list .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .feed-comments,
        [data-unified-feed-cards="true"] .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .feed-comments,
        .business-posted-list .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .feed-comments,
        .customer-public-activity-track .social-feed-card:not(.is-clip):not(.reel-card):not(.feed-clip-card):not(.feed-product-clip-card) > .feed-comments {
          margin-left: 10px !important;
          margin-right: 10px !important;
        }
      }
      @media (max-width: 380px) {
        .annexed-feed-middle .feed-list.is-clip-grid,
        .feed-list.is-clip-grid {
          width: 100% !important;
        }
        .annexed-feed-middle .feed-list .feed-clip-card,
        .annexed-feed-middle .feed-list .feed-product-clip-card,
        .feed-list.is-clip-grid > .feed-clip-card,
        .feed-list.is-clip-grid > .feed-product-clip-card,
        .annexed-feed-middle .feed-list .social-feed-card.is-clip,
        .feed-list.is-clip-grid > .social-feed-card.is-clip {
          width: min(322px, 100%) !important;
        }
      }
    </style>`;

const sharedRailSelectionStateStyle = String.raw`
    <style data-emy-rail-selection-state-style>
      .left-rail .rail-card,
      .left-rail .my-business-activity,
      .right-rail .rail-card {
        overflow: visible !important;
      }
      .left-rail .my-business-row,
      .left-rail .my-business-toggle,
      .my-business-activity .my-business-update,
      .right-rail .rail-pulse-item {
        position: relative !important;
        z-index: 0 !important;
        outline: 0 !important;
        background-clip: padding-box !important;
        transition:
          background-color .07s ease,
          border-color .07s ease,
          box-shadow .07s ease,
          color .07s ease !important;
      }
      .left-rail .my-business-copy,
      .my-business-activity .my-business-update-copy,
      .right-rail .rail-pulse-item > span {
        min-width: 0 !important;
        max-width: 100% !important;
      }
      .left-rail .my-business-copy strong,
      .my-business-activity .my-business-update-copy strong,
      .right-rail .rail-pulse-item strong {
        max-width: none !important;
        overflow: visible !important;
        text-overflow: clip !important;
        white-space: normal !important;
        overflow-wrap: normal !important;
        word-break: normal !important;
      }
      .my-business-activity .my-business-update-copy span,
      .right-rail .rail-pulse-item span span {
        white-space: normal !important;
        overflow-wrap: break-word !important;
      }
      .my-business-activity .my-business-update-copy {
        display: block !important;
        width: 100% !important;
        justify-items: start !important;
        text-align: left !important;
      }
      .my-business-activity .my-business-update-copy strong {
        color: var(--emy-navy) !important;
        font-size: 12.4px !important;
        line-height: 1.18 !important;
        font-weight: 720 !important;
      }
      .my-business-activity .my-business-update-copy span {
        margin-top: 3px !important;
        color: #667085 !important;
        font-size: 11.4px !important;
        line-height: 1.28 !important;
        font-weight: 520 !important;
      }
      .my-business-activity .my-business-update {
        align-content: start !important;
        align-items: center !important;
        grid-template-columns: minmax(0, 1fr) auto !important;
        column-gap: 8px !important;
        justify-items: stretch !important;
        min-height: 42px !important;
        padding: 6px 0 !important;
        row-gap: 0 !important;
        text-align: left !important;
      }
      .my-business-activity .my-business-update-tag {
        grid-column: auto !important;
        align-self: center !important;
        justify-self: end !important;
        min-height: 19px !important;
        margin-top: 0 !important;
        padding: 0 8px !important;
        font-size: 9.5px !important;
        font-weight: 780 !important;
        white-space: nowrap !important;
      }
      .right-rail .rail-pulse-item {
        align-content: center !important;
        align-items: center !important;
        justify-items: center !important;
        min-height: 82px !important;
        padding: 11px 18px !important;
        text-align: center !important;
      }
      .right-rail .rail-pulse-item > span {
        display: grid !important;
        justify-items: center !important;
        text-align: center !important;
      }
      .right-rail .rail-pulse-item strong {
        font-size: 15px !important;
        line-height: 1.12 !important;
        font-weight: 850 !important;
      }
      .right-rail .rail-pulse-item span span {
        margin-top: 5px !important;
        font-size: 12.8px !important;
        line-height: 1.22 !important;
        font-weight: 650 !important;
      }
      .right-rail .rail-tag {
        justify-self: center !important;
        min-height: 24px !important;
        padding: 0 13px !important;
        font-size: 10.8px !important;
        font-weight: 850 !important;
      }
      .left-rail .my-business-row,
      .left-rail .my-business-toggle,
      .my-business-activity .my-business-update {
        border-radius: 999px !important;
      }
      .my-business-activity .my-business-update,
      .right-rail .rail-pulse-item {
        padding-left: 8px !important;
        padding-right: 8px !important;
      }
      .right-rail .rail-pulse-item {
        margin-left: 0 !important;
        margin-right: 0 !important;
        border-radius: 14px !important;
      }
      .my-business-activity .my-business-update {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .left-rail .my-business-row:hover,
      .left-rail .my-business-row:focus-visible,
      .left-rail .my-business-row:active,
      .left-rail .my-business-row.is-selected,
      .left-rail .my-business-row[data-emy-rail-selected="true"],
      .left-rail .my-business-toggle:hover,
      .left-rail .my-business-toggle:focus-visible,
      .left-rail .my-business-toggle:active,
      .my-business-activity .my-business-update:hover,
      .my-business-activity .my-business-update:focus-visible,
      .my-business-activity .my-business-update:active,
      .my-business-activity .my-business-update.is-selected,
      .my-business-activity .my-business-update[data-emy-rail-selected="true"],
      .right-rail .rail-pulse-item:hover,
      .right-rail .rail-pulse-item:focus-visible,
      .right-rail .rail-pulse-item:active,
      .right-rail .rail-pulse-item.is-selected,
      .right-rail .rail-pulse-item[data-emy-rail-selected="true"] {
        background: rgba(255,246,238,.96) !important;
        color: var(--emy-orange) !important;
        box-shadow:
          inset 0 0 0 2px rgba(255,106,0,.26),
          0 5px 10px rgba(255,106,0,.06) !important;
        transform: none !important;
      }
      .left-rail .my-business-row:focus-visible,
      .left-rail .my-business-toggle:focus-visible,
      .my-business-activity .my-business-update:focus-visible,
      .right-rail .rail-pulse-item:focus-visible {
        box-shadow:
          inset 0 0 0 2px rgba(255,106,0,.34),
          0 0 0 2px rgba(255,106,0,.14),
          0 5px 10px rgba(255,106,0,.08) !important;
      }
      .left-rail .my-business-row:hover .my-business-copy strong,
      .left-rail .my-business-row:focus-visible .my-business-copy strong,
      .left-rail .my-business-row.is-selected .my-business-copy strong,
      .left-rail .my-business-row[data-emy-rail-selected="true"] .my-business-copy strong,
      .my-business-activity .my-business-update:hover .my-business-update-copy strong,
      .my-business-activity .my-business-update:focus-visible .my-business-update-copy strong,
      .my-business-activity .my-business-update.is-selected .my-business-update-copy strong,
      .my-business-activity .my-business-update[data-emy-rail-selected="true"] .my-business-update-copy strong,
      .right-rail .rail-pulse-item:hover strong,
      .right-rail .rail-pulse-item:focus-visible strong,
      .right-rail .rail-pulse-item.is-selected strong,
      .right-rail .rail-pulse-item[data-emy-rail-selected="true"] strong {
        color: var(--emy-orange) !important;
      }
    </style>`;

const sharedResponsiveHoverStyle = String.raw`
    <style data-emy-responsive-hover-style>
      .feed-card,
      .social-feed-card,
      .business-card,
      .business-preview-card,
      .product-card,
      .content-tile,
      .result-card,
      .search-result-card,
      .home-created-card,
      .reel-card,
      .feed-clip-card,
      .feed-product-clip-card,
      .business-posted-clip-card,
      .customer-business-card,
      .profile-record-card,
      .thread-row,
      .message-row,
      .settings-row-link,
      .profile-menu-row,
      .nearby-business-row,
      .my-business-row,
      .my-business-update,
      .rail-pulse-item,
      .action-btn,
      .feed-action,
      .social-feed-action,
      .reel-action,
      .item-action,
      button:not(.business-switch):not(.business-mode-switch):not([data-switch-business]):not([data-business-switch-customer]) {
        transition-delay: 0s !important;
        transition-duration: .08s !important;
      }
      .feed-card:has(.feed-media-carousel),
      .feed-card:has([data-feed-media-carousel]),
      .social-feed-card:has(.feed-media-carousel),
      .social-feed-card:has([data-feed-media-carousel]) {
        transform: none !important;
        transition-property: border-color, box-shadow !important;
        transition-duration: .16s !important;
      }
      .feed-card:has(.feed-media-carousel):hover,
      .feed-card:has([data-feed-media-carousel]):hover,
      .feed-card:has(.feed-media-carousel):focus-within,
      .feed-card:has([data-feed-media-carousel]):focus-within,
      .social-feed-card:has(.feed-media-carousel):hover,
      .social-feed-card:has([data-feed-media-carousel]):hover,
      .social-feed-card:has(.feed-media-carousel):focus-within,
      .social-feed-card:has([data-feed-media-carousel]):focus-within {
        transform: none !important;
      }
      .feed-media:has(.feed-media-carousel),
      .feed-media:has([data-feed-media-carousel]),
      .social-feed-media:has(.feed-media-carousel),
      .social-feed-media:has([data-feed-media-carousel]) {
        transform: none !important;
        transition: none !important;
      }
      .feed-card:hover,
      .feed-card:focus-within,
      .social-feed-card:hover,
      .social-feed-card:focus-within,
      .business-card:hover,
      .business-card:focus-within,
      .business-preview-card:hover,
      .business-preview-card:focus-within,
      .product-card:hover,
      .product-card:focus-within,
      .content-tile:hover,
      .content-tile:focus-within,
      .result-card:hover,
      .result-card:focus-within,
      .search-result-card:hover,
      .search-result-card:focus-within,
      .home-created-card:hover,
      .home-created-card:focus-within,
      .reel-card:hover,
      .reel-card:focus-within,
      .feed-clip-card:hover,
      .feed-clip-card:focus-within,
      .feed-product-clip-card:hover,
      .feed-product-clip-card:focus-within,
      .business-posted-clip-card:hover,
      .business-posted-clip-card:focus-within,
      .customer-business-card:hover,
      .customer-business-card:focus-within,
      .profile-record-card:hover,
      .profile-record-card:focus-within,
      .thread-row:hover,
      .thread-row:focus-within,
      .message-row:hover,
      .message-row:focus-within,
      .settings-row-link:hover,
      .settings-row-link:focus-visible,
      .profile-menu-row:hover,
      .profile-menu-row:focus-visible,
      .nearby-business-row:hover,
      .nearby-business-row:focus-visible,
      .my-business-row:hover,
      .my-business-row:focus-visible,
      .my-business-update:hover,
      .my-business-update:focus-visible,
      .rail-pulse-item:hover,
      .rail-pulse-item:focus-visible,
      .action-btn:hover,
      .action-btn:focus-visible,
      .feed-action:hover,
      .feed-action:focus-visible,
      .social-feed-action:hover,
      .social-feed-action:focus-visible,
      .reel-action:hover,
      .reel-action:focus-visible,
      .item-action:hover,
      .item-action:focus-visible,
      button:not(.business-switch):not(.business-mode-switch):not([data-switch-business]):not([data-business-switch-customer]):hover,
      button:not(.business-switch):not(.business-mode-switch):not([data-switch-business]):not([data-business-switch-customer]):focus-visible {
        transition-duration: .07s !important;
      }
    </style>`;

const sharedRailSelectionStateScript = String.raw`
    <script data-emy-rail-selection-state>
      (() => {
        if (window.emyRailSelectionStateReady) return;
        window.emyRailSelectionStateReady = true;
        const selector = ".left-rail .my-business-row,.my-business-activity .my-business-update,.right-rail .rail-pulse-item";
        function setSelected(target) {
          const item = target && target.closest ? target.closest(selector) : null;
          if (!item) return;
          const section = item.closest(".rail-card,.my-business-activity,.right-rail") || document;
          section.querySelectorAll(".my-business-row.is-selected,.my-business-update.is-selected,.rail-pulse-item.is-selected,[data-emy-rail-selected='true']").forEach((node) => {
            if (node === item) return;
            node.classList.remove("is-selected");
            node.removeAttribute("data-emy-rail-selected");
          });
          item.classList.add("is-selected");
          item.setAttribute("data-emy-rail-selected", "true");
        }
        document.addEventListener("pointerdown", (event) => setSelected(event.target), true);
        document.addEventListener("focusin", (event) => setSelected(event.target), true);
        document.addEventListener("click", (event) => setSelected(event.target), true);
      })();
    </script>`;

const sharedClipHoverPreviewScript = String.raw`
    <script data-emy-clip-hover-preview>
      (function () {
        if (window.emyClipHoverPreviewReady) return;
        window.emyClipHoverPreviewReady = true;
        const clipSelector = [
          ".reel-card",
          ".feed-card.is-clip",
          ".feed-clip-card",
          ".feed-product-clip-card",
          ".business-posted-clip-card",
          ".business-preview-card-reel",
          ".search-reel-card",
          ".social-feed-card.is-clip",
          "[data-detail-kind='Clip']",
          "[data-detail-kind='Product Clip']"
        ].join(",");
        let activeCard = null;
        let viewportPreviewObserver = null;
        const hoverPreviewDelayMs = 420;
        const viewportPreviewEnabled = false;
        function installStyle() {
          if (document.querySelector("style[data-emy-clip-hover-preview-style]")) return;
          const style = document.createElement("style");
          style.setAttribute("data-emy-clip-hover-preview-style", "true");
          style.textContent = [
            ".reel-card.is-hover-previewing .reel-play,.feed-clip-card.is-hover-previewing .reel-play,.feed-product-clip-card.is-hover-previewing .reel-play,.business-posted-clip-card.is-hover-previewing .reel-play,.business-preview-card-reel.is-hover-previewing .reel-play,.feed-card.is-clip.is-hover-previewing .feed-play,.social-feed-card.is-clip.is-hover-previewing .social-feed-play,.search-reel-card.is-hover-previewing .search-reel-play{opacity:0!important;visibility:hidden!important;pointer-events:none!important;transform:translate(-50%,-50%) scale(.86)!important}",
            ".reel-card.is-hover-previewing video,.feed-card.is-clip.is-hover-previewing video,.business-preview-card-reel.is-hover-previewing video,.social-feed-card.is-clip.is-hover-previewing video,.search-reel-card.is-hover-previewing video{display:block!important;opacity:1!important}"
          ].join("");
          document.head.appendChild(style);
        }
        function isClipCard(card) {
          if (!card || !card.matches) return false;
          if (!card.matches(clipSelector)) return false;
          if (card.closest(".clip-viewer-modal")) return false;
          const kind = String(card.dataset.detailKind || card.getAttribute("data-detail-kind") || "").toLowerCase();
          return card.classList.contains("is-clip") || card.classList.contains("feed-clip-card") || card.classList.contains("feed-product-clip-card") || card.classList.contains("business-posted-clip-card") || card.classList.contains("business-preview-card-reel") || card.classList.contains("search-reel-card") || card.classList.contains("reel-card") || card.classList.contains("social-feed-card") && card.classList.contains("is-clip") || kind === "clip" || kind === "product clip";
        }
        function mediaHolder(card) {
          return card && card.querySelector(".photo,.media,.feed-media,.feed-media-link,.social-feed-media,.business-preview-media,.search-reel-media,.home-flow-media");
        }
        function configureVideo(video) {
          if (!video) return null;
          video.muted = true;
          video.defaultMuted = true;
          video.playsInline = true;
          video.loop = true;
          video.preload = "metadata";
          video.removeAttribute("controls");
          video.setAttribute("muted", "");
          video.setAttribute("playsinline", "");
          video.setAttribute("preload", "metadata");
          video.setAttribute("data-emy-hover-preview-video", "true");
          return video;
        }
        function ensureVideo(card) {
          let video = card && card.querySelector("video");
          if (video) return configureVideo(video);
          const holder = mediaHolder(card);
          const src = card && card.dataset ? String(card.dataset.detailMediaSrc || "") : "";
          const ref = card && card.dataset ? String(card.dataset.detailMediaRef || "") : "";
          const type = card && card.dataset ? String(card.dataset.detailMediaType || "").toLowerCase() : "";
          if (!holder || type !== "video" || (!src && !ref)) return null;
          video = document.createElement("video");
          if (src) video.src = src;
          if (ref) video.setAttribute("data-emy-media-ref", ref);
          if (card.dataset.detailPosterSrc) video.poster = card.dataset.detailPosterSrc;
          if (card.dataset.detailPosterRef) video.setAttribute("data-emy-poster-ref", card.dataset.detailPosterRef);
          configureVideo(video);
          holder.insertBefore(video, holder.firstChild || null);
          return video;
        }
        function cardStillActive(card) {
          return !!(card && (card.matches(":hover") || card.contains(document.activeElement) || card.dataset.emyViewportPreviewActive === "true"));
        }
        function resetVideoToStart(video) {
          if (!video) return;
          const seek = () => {
            try { video.currentTime = 0; } catch (error) {}
          };
          if (video.readyState >= 1 || Number.isFinite(video.duration)) seek();
          else video.addEventListener("loadedmetadata", seek, { once: true });
        }
        function modalViewerOpen() {
          return Array.from(document.querySelectorAll(".clip-viewer-modal.is-open,.item-detail-modal.is-open,[data-feed-post-sheet].is-open,[data-feed-video-editor].is-open")).some(function (node) {
            if (!node || node.hidden || node.getAttribute("aria-hidden") === "true") return false;
            const style = window.getComputedStyle ? window.getComputedStyle(node) : null;
            if (style && (style.display === "none" || style.visibility === "hidden" || style.pointerEvents === "none")) return false;
            const rect = node.getBoundingClientRect ? node.getBoundingClientRect() : null;
            return !rect || (rect.width > 0 && rect.height > 0);
          });
        }
        function playWhenReady(card, video, token) {
          if (!card || !video || card.dataset.emyHoverPreviewToken !== token || !cardStillActive(card)) return;
          const lastAttemptAt = Number(video.dataset.emyHoverPreviewPlayAt || "0");
          if (video.dataset.emyHoverPreviewPlayToken === token && (!video.paused || Date.now() - lastAttemptAt < 1800)) return;
          video.dataset.emyHoverPreviewPlayToken = token;
          video.dataset.emyHoverPreviewPlayAt = String(Date.now());
          const attempt = () => {
            if (card.dataset.emyHoverPreviewToken !== token || !cardStillActive(card)) return;
            if (!video.paused && !video.ended) return;
            const promise = video.play();
            if (promise && typeof promise.catch === "function") promise.catch(function () {});
          };
          const retry = () => attempt();
          video.addEventListener("loadedmetadata", retry, { once: true });
          video.addEventListener("canplay", retry, { once: true });
          attempt();
          window.setTimeout(retry, 700);
        }
        function clearHoverTimer(card) {
          if (!card || !card.dataset) return;
          const id = Number(card.dataset.emyHoverPreviewTimer || "0");
          if (id) window.clearTimeout(id);
          card.dataset.emyHoverPreviewTimer = "";
        }
        function scheduleStart(card) {
          if (!isClipCard(card)) return;
          clearHoverTimer(card);
          const id = window.setTimeout(function () {
            card.dataset.emyHoverPreviewTimer = "";
            start(card);
          }, hoverPreviewDelayMs);
          card.dataset.emyHoverPreviewTimer = String(id);
        }
        function hydrateHoveredCard(card) {
          if (!window.emyHydrateFeedMedia || !card || card.dataset.emyHoverHydrateQueued === "true") return;
          card.dataset.emyHoverHydrateQueued = "true";
          const hydrate = function () {
            card.dataset.emyHoverHydrateQueued = "";
            if (!cardStillActive(card) || modalViewerOpen()) return;
            try { window.emyHydrateFeedMedia(card); } catch (error) {}
          };
          if (window.requestIdleCallback) window.requestIdleCallback(hydrate, { timeout: 650 });
          else window.setTimeout(hydrate, 180);
        }
        function start(card) {
          if (!isClipCard(card)) return;
          if (modalViewerOpen()) return;
          installStyle();
          const video = ensureVideo(card);
          if (!video) return;
          if (activeCard === card && card.classList.contains("is-hover-previewing")) {
            video.dataset.emyHoverPreviewActive = "true";
            const existingToken = card.dataset.emyHoverPreviewToken || "";
            if (existingToken) playWhenReady(card, video, existingToken);
            return;
          }
          if (activeCard && activeCard !== card) stop(activeCard, false);
          hydrateHoveredCard(card);
          activeCard = card;
          const token = String(Date.now()) + Math.random();
          card.dataset.emyHoverPreviewToken = token;
          card.classList.add("is-previewing", "is-hover-previewing");
          video.dataset.emyHoverPreviewActive = "true";
          playWhenReady(card, video, token);
        }
        function stop(card, keepTime) {
          if (!card) return;
          clearHoverTimer(card);
          card.classList.remove("is-previewing", "is-hover-previewing");
          card.dataset.emyHoverPreviewToken = "";
          const video = card.querySelector("video[data-emy-hover-preview-video], video");
          if (video) {
            video.dataset.emyHoverPreviewActive = "false";
            try { video.pause(); } catch (error) {}
            if (!keepTime) resetVideoToStart(video);
          }
          if (activeCard === card) activeCard = null;
        }
        function setupViewportPreview(card) {
          if (!card || card.dataset.emyClipViewportPreviewBound === "true" || !("IntersectionObserver" in window)) return;
          card.dataset.emyClipViewportPreviewBound = "true";
          if (!viewportPreviewObserver) {
            viewportPreviewObserver = new IntersectionObserver(function (entries) {
              entries.forEach(function (entry) {
                const card = entry.target;
                if (!isClipCard(card)) return;
                const visible = entry.isIntersecting && entry.intersectionRatio >= 0.56;
                if (!visible) {
                  if (card.dataset.emyViewportPreviewActive === "true" || card.classList.contains("is-hover-previewing") || card.classList.contains("is-previewing")) {
                    card.dataset.emyViewportPreviewActive = "false";
                    card.dataset.emyViewportNeedsRestart = "true";
                    stop(card, false);
                    return;
                  }
                  const video = card.querySelector("video[data-emy-hover-preview-video], video");
                  if (video && ((Number(video.currentTime) || 0) > 0.04 || !video.paused)) {
                    card.dataset.emyViewportNeedsRestart = "true";
                    stop(card, false);
                  }
                  return;
                }
                if (modalViewerOpen()) return;
                card.dataset.emyViewportPreviewActive = "true";
                card.dataset.emyViewportNeedsRestart = "false";
                start(card);
              });
            }, { threshold: [0, 0.15, 0.35, 0.56, 0.75, 1] });
          }
          viewportPreviewObserver.observe(card);
        }
        function bind(card) {
          if (!isClipCard(card) || card.dataset.emyClipHoverPreviewBound === "true") return;
          card.dataset.emyClipHoverPreviewBound = "true";
          card.addEventListener("pointerenter", function (event) {
            if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
            scheduleStart(card);
          });
          card.addEventListener("mouseenter", function () { scheduleStart(card); });
          card.addEventListener("pointerleave", function () { clearHoverTimer(card); stop(card, false); });
          card.addEventListener("mouseleave", function () { clearHoverTimer(card); stop(card, false); });
          card.addEventListener("focusin", function () { scheduleStart(card); });
          card.addEventListener("focusout", function () {
            clearHoverTimer(card);
            window.setTimeout(function () {
              if (!card.contains(document.activeElement)) stop(card, false);
            }, 0);
          });
          if (viewportPreviewEnabled) setupViewportPreview(card);
        }
        let clipViewerScriptWarmupScheduled = false;
        const clipOpenControlSelector = ".reel-play,.search-reel-play,.feed-play,.social-feed-play,.clip-play,.video-play,.media-play,.feed-media-play,.feed-video-play,.play-button,[data-feed-play],[data-open-clip],[data-clip-open],[data-video-play],[data-play-video],[data-feed-video-play]";
        const clipClickIgnoreSelector = "a[href],button,input,textarea,select,label,summary,[contenteditable=true],[data-feed-options-menu],[data-public-activity-options-menu],[data-clip-like-toggle],.clip-viewer-like-chip,.feed-actions,.social-feed-actions,.feed-comments,.feed-comment-form,.feed-comment-reply-form,.emy-video-controls,.clip-viewer-control,.clip-viewer-volume,.clip-viewer-more-menu";
        function clipCardFromClick(target) {
          const node = target && target.closest ? target : null;
          if (!node) return null;
          const playControl = node.closest(clipOpenControlSelector);
          const card = (playControl || node).closest(clipSelector);
          if (!isClipCard(card)) return null;
          if (card.closest("[data-clip-viewer-modal],.clip-viewer-modal,[data-item-detail-modal],.item-detail-modal")) return null;
          const ignored = node.closest(clipClickIgnoreSelector);
          if (ignored && !playControl && ignored !== card) return null;
          return card;
        }
        function clipViewerScriptReady() {
          return typeof window.emyOpenClipViewer === "function" || typeof window.emyOpenItemDetail === "function";
        }
        function loadClipViewerScript(onReady) {
          if (clipViewerScriptReady()) {
            if (typeof onReady === "function") window.setTimeout(onReady, 0);
            return true;
          }
          let script = document.querySelector('script[data-emy-customer-home-item-detail]');
          if (!script) {
            script = document.createElement("script");
            script.src = "assets/emy-customer-home-item-detail.js?v=d83ec68f8f32";
            script.async = true;
            script.setAttribute("data-emy-customer-home-item-detail", "");
            (document.head || document.body || document.documentElement).appendChild(script);
          }
          if (typeof onReady === "function") {
            script.addEventListener("load", onReady, { once: true });
            window.setTimeout(onReady, 180);
            window.setTimeout(onReady, 650);
            window.setTimeout(onReady, 1400);
          }
          return true;
        }
        function warmClipViewerScript() {
          loadClipViewerScript();
        }
        function scheduleClipViewerWarmup() {
          if (clipViewerScriptWarmupScheduled) return;
          clipViewerScriptWarmupScheduled = true;
          const run = function () {
            if (document.querySelector(clipSelector)) warmClipViewerScript();
          };
          if (window.requestIdleCallback) window.requestIdleCallback(run, { timeout: 7000 });
          else window.setTimeout(run, 4500);
        }
        function loadClipViewerForCard(card) {
          const open = function () {
            if (typeof window.emyOpenClipViewer === "function" && window.emyOpenClipViewer(card)) return true;
            if (typeof window.emyOpenItemDetail === "function" && window.emyOpenItemDetail(card)) return true;
            return false;
          };
          if (open()) return true;
          return loadClipViewerScript(open);
        }
        function openClipCardFromClick(event) {
          if (!event || event.__emyClipCardOpenHandled) return;
          const card = clipCardFromClick(event.target);
          if (!card || modalViewerOpen()) return;
          event.__emyClipCardOpenHandled = true;
          if (event.preventDefault) event.preventDefault();
          if (event.stopPropagation) event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          stop(card, true);
          loadClipViewerForCard(card);
        }
        function setup(root) {
          const scope = root && root.querySelectorAll ? root : document;
          if (scope.matches && isClipCard(scope)) bind(scope);
          scope.querySelectorAll(clipSelector).forEach(bind);
        }
        function stopAll(exceptRoot) {
          document.querySelectorAll(clipSelector).forEach(function (card) {
            if (!isClipCard(card)) return;
            if (exceptRoot && exceptRoot.contains && exceptRoot.contains(card)) return;
            stop(card, false);
          });
          if (activeCard && (!exceptRoot || !exceptRoot.contains || !exceptRoot.contains(activeCard))) activeCard = null;
        }
        window.emySetupClipHoverPreviews = setup;
        window.emyStopClipHoverPreviews = stopAll;
        window.addEventListener("click", openClipCardFromClick, true);
        document.addEventListener("click", openClipCardFromClick, true);
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", function () { setup(document); scheduleClipViewerWarmup(); }, { once: true });
        } else {
          setup(document);
          scheduleClipViewerWarmup();
        }
        const pendingClipRoots = new Set();
        let clipSetupScheduled = false;
        function nodeHasClipCard(node) {
          return !!(node && node.nodeType === 1 && ((node.matches && node.matches(clipSelector)) || (node.querySelector && node.querySelector(clipSelector))));
        }
        function scheduleClipSetup(root) {
          if (root && root.nodeType === 1) pendingClipRoots.add(root);
          if (clipSetupScheduled) return;
          clipSetupScheduled = true;
          window.requestAnimationFrame(function () {
            clipSetupScheduled = false;
            const roots = Array.from(pendingClipRoots);
            pendingClipRoots.clear();
            if (!roots.length) return;
            if (roots.length > 16) {
              setup(document);
              return;
            }
            roots.forEach(setup);
          });
        }
        new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
              if (nodeHasClipCard(node)) scheduleClipSetup(node);
            });
          });
        }).observe(document.documentElement, { childList: true, subtree: true });
      })();
    </script>`;

const sharedClipViewerScrollRestartScript = String.raw`
    <script data-emy-clip-scroll-restart>
      (() => {
        if (window.emyClipScrollRestartReady) return;
        window.emyClipScrollRestartReady = true;
        let activeKey = "";
        let restartTimer = 0;
        function installAntiFlashStyle() {
          if (document.querySelector("style[data-emy-clip-antiflash-style]")) return;
          const style = document.createElement("style");
          style.setAttribute("data-emy-clip-antiflash-style", "true");
          style.textContent = [
            ".clip-viewer-frame.is-video-warming .clip-viewer-media,.clip-viewer-media:has(> video[data-emy-frame-ready='false']){background:#07090d!important;background-image:none!important}",
            ".clip-viewer-media video[data-emy-frame-ready='false']{opacity:0!important;visibility:hidden!important}",
            ".clip-viewer-media video[data-emy-frame-ready='true']{opacity:1!important;visibility:visible!important}",
            ".clip-viewer-frame.is-video-warming .clip-viewer-media{background:#07090d!important;background-image:none!important}",
            ".clip-viewer-close,[data-clip-viewer-close]{position:fixed!important;z-index:2147483647!important;pointer-events:auto!important;cursor:pointer!important}"
          ].join("");
          document.head.appendChild(style);
        }
        function clipModal() {
          return document.querySelector("[data-clip-viewer-modal],.clip-viewer-modal");
        }
        function clipTrack() {
          return document.querySelector("[data-clip-viewer-track],.clip-viewer-track");
        }
        function modalIsOpen(modal) {
          return !!(modal && modal.classList.contains("is-open") && modal.getAttribute("aria-hidden") !== "true" && !modal.hidden);
        }
        function videoForSlide(slide) {
          return slide && slide.querySelector ? slide.querySelector(".clip-viewer-media video") : null;
        }
        function markFrameReady(video, ready) {
          if (!video) return;
          video.dataset.emyFrameReady = ready ? "true" : "false";
          const frame = video.closest(".clip-viewer-frame");
          if (frame) frame.classList.toggle("is-video-warming", !ready);
        }
        function markReadyAfterPaint(video) {
          if (!video || video.readyState < 2) return false;
          let done = false;
          const finish = () => {
            if (done) return;
            done = true;
            markFrameReady(video, true);
          };
          if (typeof video.requestVideoFrameCallback === "function") {
            try { video.requestVideoFrameCallback(finish); } catch (error) { window.requestAnimationFrame(finish); }
            window.setTimeout(finish, 180);
          } else {
            window.requestAnimationFrame(finish);
          }
          return true;
        }
        function bindVideoWarmEvents(video) {
          if (!video || video.dataset.emyClipFrameWarmBound === "true") return;
          video.dataset.emyClipFrameWarmBound = "true";
          ["loadeddata", "canplay", "seeked", "playing", "timeupdate"].forEach((eventName) => {
            video.addEventListener(eventName, () => markReadyAfterPaint(video));
          });
          ["loadstart", "waiting", "emptied"].forEach((eventName) => {
            video.addEventListener(eventName, () => {
              if (video.readyState < 2) markFrameReady(video, false);
            });
          });
        }
        function warmVideo(video) {
          if (!video) return;
          bindVideoWarmEvents(video);
          video.playsInline = true;
          video.preload = "auto";
          video.setAttribute("playsinline", "");
          video.setAttribute("preload", "auto");
          if (video.poster) markFrameReady(video, true);
          if (video.readyState >= 2) markReadyAfterPaint(video);
          else if (!video.poster) {
            markFrameReady(video, false);
            if (video.readyState === 0 && video.dataset.emyClipPreloadRequested !== "true") {
              video.dataset.emyClipPreloadRequested = "true";
              try { video.load(); } catch (error) {}
            }
          }
        }
        function waitForFrame(video, callback) {
          warmVideo(video);
          let done = false;
          const finish = () => {
            if (done) return;
            done = true;
            markReadyAfterPaint(video);
            callback();
          };
          if (video.readyState >= 2) {
            if (typeof video.requestVideoFrameCallback === "function") {
              try { video.requestVideoFrameCallback(finish); } catch (error) { window.requestAnimationFrame(finish); }
              window.setTimeout(finish, 180);
            } else {
              window.requestAnimationFrame(finish);
            }
            return;
          }
          ["loadeddata", "canplay", "seeked"].forEach((eventName) => {
            video.addEventListener(eventName, finish, { once: true });
          });
          window.setTimeout(() => {
            if (video.readyState >= 2) finish();
          }, 700);
        }
        function resetVideo(video) {
          if (!video) return;
          const seek = () => {
            try { video.currentTime = 0; } catch (error) {}
            if (video.readyState < 2) markFrameReady(video, false);
          };
          if (video.readyState >= 1 || Number.isFinite(video.duration)) seek();
          else video.addEventListener("loadedmetadata", seek, { once: true });
        }
        function stopClipViewerMedia(modal) {
          const scope = modal || clipModal() || document;
          if (typeof window.emyStopAllMedia === "function") {
            try { window.emyStopAllMedia(scope, "clip-viewer-close"); } catch (error) {}
          }
          if (scope && scope.querySelectorAll) {
            scope.querySelectorAll("video,audio").forEach((media) => {
              try { media.pause(); } catch (error) {}
              try {
                media.autoplay = false;
                media.removeAttribute("autoplay");
                media.muted = true;
                media.defaultMuted = true;
                media.setAttribute("muted", "");
              } catch (error) {}
              try {
                if (Number.isFinite(media.duration) || media.readyState >= 1) media.currentTime = 0;
              } catch (error) {}
            });
          }
        }
        function forceCloseClipViewer(event) {
          const target = event && event.target;
          if (!target || !target.closest) return;
          const closeButton = target.closest("[data-clip-viewer-close],.clip-viewer-close");
          if (!closeButton) return;
          const modal = closeButton.closest("[data-clip-viewer-modal],.clip-viewer-modal") || clipModal();
          if (!modal) return;
          if (event.preventDefault) event.preventDefault();
          if (event.stopPropagation) event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          stopClipViewerMedia(modal);
          modal.classList.remove("is-open");
          modal.setAttribute("aria-hidden", "true");
          const track = modal.querySelector("[data-clip-viewer-track],.clip-viewer-track") || clipTrack();
          if (track) {
            track.innerHTML = "";
            try { track.scrollTop = 0; } catch (error) {}
          }
          document.body.classList.remove("item-detail-locked");
          activeKey = "";
          try { window.dispatchEvent(new CustomEvent("emy:clip-viewer-closed")); } catch (error) {}
        }
        function nearbySlides(track, activeSlide, radius) {
          const slides = Array.from(track.querySelectorAll("[data-clip-slide]"));
          const activeIndex = slides.indexOf(activeSlide);
          if (activeIndex < 0) return activeSlide ? [activeSlide] : [];
          return slides.filter((slide, index) => Math.abs(index - activeIndex) <= radius);
        }
        function warmNeighborSlides(track, activeSlide) {
          nearbySlides(track, activeSlide, 1).forEach((slide) => warmVideo(videoForSlide(slide)));
        }
        function syncSlide(slide) {
          if (!slide) return;
          const frame = slide.querySelector(".clip-viewer-frame");
          const video = videoForSlide(slide);
          const hasVideo = !!video;
          const paused = !hasVideo || video.paused || video.ended;
          const muted = !hasVideo || video.muted || Number(video.volume) <= 0;
          if (frame) {
            frame.classList.toggle("has-video", hasVideo);
            frame.classList.toggle("is-paused", paused);
            frame.classList.toggle("is-playing", hasVideo && !paused);
            frame.classList.toggle("is-muted", muted);
          }
          slide.querySelectorAll("[data-clip-video-play]").forEach((button) => {
            button.disabled = !hasVideo;
            button.setAttribute("aria-label", paused ? "Play clip" : "Pause clip");
            button.setAttribute("aria-pressed", paused ? "false" : "true");
          });
          slide.querySelectorAll("[data-clip-video-mute]").forEach((button) => {
            button.disabled = !hasVideo;
            button.setAttribute("aria-label", muted ? "Turn clip sound on" : "Mute clip");
            button.setAttribute("aria-pressed", muted ? "true" : "false");
          });
        }
        function bestSlide(track) {
          const slides = Array.from(track.querySelectorAll("[data-clip-slide]"));
          if (!slides.length) return null;
          const trackRect = track.getBoundingClientRect();
          const center = trackRect.top + trackRect.height / 2;
          let best = null;
          let bestScore = -Infinity;
          slides.forEach((slide) => {
            const rect = slide.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            const visible = Math.max(0, Math.min(rect.bottom, trackRect.bottom) - Math.max(rect.top, trackRect.top));
            const ratio = visible / Math.max(1, rect.height);
            const distance = Math.abs((rect.top + rect.height / 2) - center) / Math.max(1, trackRect.height);
            const score = ratio - distance;
            if (score > bestScore) {
              bestScore = score;
              best = slide;
            }
          });
          return best || slides[0] || null;
        }
        function pauseAndResetInactive(track, activeSlide) {
          const candidates = new Set();
          track.querySelectorAll("[data-clip-slide].is-active").forEach((slide) => candidates.add(slide));
          nearbySlides(track, activeSlide, 1).forEach((slide) => candidates.add(slide));
          candidates.forEach((slide) => {
            if (slide === activeSlide) return;
            slide.classList.remove("is-active");
            const video = videoForSlide(slide);
            if (video) {
              warmVideo(video);
              try { video.pause(); } catch (error) {}
              if (video.dataset.emyClipScrollNeedsRestart !== "true") {
                video.dataset.emyClipScrollNeedsRestart = "true";
                resetVideo(video);
              }
            }
            syncSlide(slide);
          });
        }
        function playActiveSlide(slide, restart) {
          const video = videoForSlide(slide);
          if (!video) return;
          video.playsInline = true;
          video.preload = "auto";
          video.setAttribute("playsinline", "");
          video.setAttribute("preload", "auto");
          warmVideo(video);
          const alreadyPreparedAtStart = video.dataset.emyClipScrollNeedsRestart === "true";
          if (restart && video.ended) {
            resetVideo(video);
          } else if (restart && !alreadyPreparedAtStart && Number(video.currentTime) > 0.25) {
            resetVideo(video);
          }
          video.dataset.emyClipScrollNeedsRestart = "false";
          if (window.emyPauseOtherMedia) {
            try { window.emyPauseOtherMedia(video); } catch (error) {}
          }
          const attempt = () => {
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === "function") {
              playPromise.then(() => syncSlide(slide)).catch(() => {
                video.muted = true;
                video.defaultMuted = true;
                video.setAttribute("muted", "");
                const mutedPlay = video.play();
                if (mutedPlay && typeof mutedPlay.catch === "function") mutedPlay.catch(() => syncSlide(slide));
                syncSlide(slide);
              });
            } else {
              syncSlide(slide);
            }
          };
          waitForFrame(video, attempt);
          syncSlide(slide);
        }
        function applyClipScrollRestart(force) {
          const modal = clipModal();
          const track = clipTrack();
          if (!track || !modalIsOpen(modal)) return;
          const activeSlide = bestSlide(track);
          if (!activeSlide) return;
          const key = activeSlide.dataset.clipKey || activeSlide.dataset.clipSlide || "";
          const changed = !!force || key !== activeKey;
          activeSlide.classList.add("is-active");
          warmNeighborSlides(track, activeSlide);
          pauseAndResetInactive(track, activeSlide);
          const activeVideo = videoForSlide(activeSlide);
          if (activeVideo && (changed || activeVideo.dataset.emyClipScrollNeedsRestart === "true" || activeVideo.paused || activeVideo.ended)) {
            playActiveSlide(activeSlide, changed || activeVideo.dataset.emyClipScrollNeedsRestart === "true" || activeVideo.ended);
          }
          activeKey = key;
          syncSlide(activeSlide);
        }
        function scheduleClipScrollRestart(force) {
          if (restartTimer) window.clearTimeout(restartTimer);
          restartTimer = window.setTimeout(() => {
            restartTimer = 0;
            applyClipScrollRestart(!!force);
          }, force ? 16 : 84);
        }
        function bindClipScrollRestart() {
          installAntiFlashStyle();
          const track = clipTrack();
          const modal = clipModal();
          if (!track || track.dataset.emyClipScrollRestartBound === "true") return;
          track.dataset.emyClipScrollRestartBound = "true";
          track.addEventListener("scroll", () => scheduleClipScrollRestart(false), { passive: true });
          new MutationObserver(() => scheduleClipScrollRestart(true)).observe(track, { childList: true });
          if (modal) {
            new MutationObserver(() => {
              if (modalIsOpen(modal)) scheduleClipScrollRestart(true);
              else activeKey = "";
            }).observe(modal, { attributes: true, attributeFilter: ["class", "aria-hidden", "hidden"] });
          }
          document.addEventListener("click", (event) => {
            if (event.target && event.target.closest && event.target.closest(".reel-play,.search-reel-play,.feed-play,.social-feed-play")) {
              window.setTimeout(() => scheduleClipScrollRestart(true), 30);
              window.setTimeout(() => scheduleClipScrollRestart(true), 140);
            }
          }, true);
          document.addEventListener("pointerdown", forceCloseClipViewer, true);
          document.addEventListener("click", forceCloseClipViewer, true);
          scheduleClipScrollRestart(true);
        }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bindClipScrollRestart, { once: true });
        else bindClipScrollRestart();
        new MutationObserver(bindClipScrollRestart).observe(document.documentElement, { childList: true, subtree: true });
      })();
    </script>`;

const sharedModalCloseControlsStyle = String.raw`
    <style data-emy-local-pulse-compact>
      .right-rail .rail-card[data-emy-real-rail="pulse"] {
        padding: 10px 12px !important;
      }
      .right-rail .rail-card[data-emy-real-rail="pulse"] h2 {
        margin-bottom: 6px !important;
        font-size: 18px !important;
        line-height: 1.05 !important;
      }
      .right-rail .rail-card[data-emy-real-rail="pulse"] .rail-pulse-item {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) auto !important;
        gap: 8px !important;
        align-items: center !important;
        width: 100% !important;
        max-width: 100% !important;
        min-height: 38px !important;
        overflow: hidden !important;
        padding: 4px 6px !important;
        border-radius: 8px !important;
        box-sizing: border-box !important;
        text-align: left !important;
      }
      .right-rail .rail-card[data-emy-real-rail="pulse"] .rail-pulse-item[hidden],
      .right-rail .rail-card[data-emy-real-rail="pulse"] .rail-pulse-item[data-my-business-extra][hidden] {
        display: none !important;
      }
      .right-rail .rail-card[data-emy-real-rail="pulse"] .rail-pulse-copy {
        display: block !important;
        width: 100% !important;
        min-width: 0 !important;
        max-width: 100% !important;
        overflow: hidden !important;
        text-align: left !important;
      }
      .right-rail .rail-card[data-emy-real-rail="pulse"] .rail-pulse-copy strong {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        overflow: hidden !important;
        color: var(--emy-navy) !important;
        font-size: 12px !important;
        line-height: 1.05 !important;
        font-weight: 850 !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        overflow-wrap: normal !important;
        word-break: normal !important;
      }
      .right-rail .rail-card[data-emy-real-rail="pulse"] .rail-pulse-copy span {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        overflow: hidden !important;
        margin-top: 1px !important;
        color: #667085 !important;
        font-size: 10.8px !important;
        line-height: 1.12 !important;
        font-weight: 650 !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        overflow-wrap: normal !important;
        word-break: normal !important;
      }
      .right-rail .rail-card[data-emy-real-rail="pulse"] .rail-tag {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex: 0 0 auto !important;
        min-width: 54px !important;
        max-width: 58px !important;
        min-height: 22px !important;
        overflow: hidden !important;
        padding: 0 10px !important;
        border-radius: 999px !important;
        background: #fff5ed !important;
        color: #667085 !important;
        font-size: 10.5px !important;
        line-height: 1 !important;
        font-weight: 850 !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }
    </style>
  
    <style data-emy-modal-close-controls>
      .item-detail-modal.is-open,
      .item-detail-modal.is-open .item-detail-card,
      .clip-viewer-modal.is-open,
      [data-clip-viewer-modal].is-open {
        pointer-events: auto !important;
      }
      [data-item-detail-close],
      .item-detail-close,
      [data-item-detail-done],
      .item-detail-done,
      [data-clip-viewer-close],
      .clip-viewer-close,
      [data-modal-close],
      .modal-close {
        pointer-events: auto !important;
        cursor: pointer !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      [data-item-detail-close],
      .item-detail-close,
      [data-clip-viewer-close],
      .clip-viewer-close {
        z-index: 2147483647 !important;
      }
    </style>`;

const sharedModalCloseGuardScript = String.raw`
    <script data-emy-modal-close-guard>
      (() => {
        if (window.__emyModalCloseGuardInstalled) return;
        window.__emyModalCloseGuardInstalled = true;
        function stopMedia(scope) {
          const root = scope || document;
          if (typeof window.emyStopAllMedia === "function") {
            try { window.emyStopAllMedia(root, "modal-close"); } catch (error) {}
          }
          if (root && root.querySelectorAll) {
            root.querySelectorAll("video,audio").forEach((media) => {
              try { media.pause(); } catch (error) {}
              try {
                media.autoplay = false;
                media.removeAttribute("autoplay");
                media.muted = true;
                media.defaultMuted = true;
                media.setAttribute("muted", "");
              } catch (error) {}
              try {
                if (Number.isFinite(media.duration) || media.readyState >= 1) media.currentTime = 0;
              } catch (error) {}
            });
          }
        }
        function closeClip(modal) {
          if (!modal) return;
          stopMedia(modal);
          modal.classList.remove("is-open");
          modal.setAttribute("aria-hidden", "true");
          const track = modal.querySelector("[data-clip-viewer-track],.clip-viewer-track");
          if (track) {
            track.innerHTML = "";
            try { track.scrollTop = 0; } catch (error) {}
          }
          document.body.classList.remove("item-detail-locked");
        }
        function closeItem(modal) {
          if (!modal) return;
          stopMedia(modal);
          delete modal.dataset.realRailOpenToken;
          modal.classList.remove("is-open", "is-product", "is-clip", "is-event", "is-job", "is-article");
          modal.setAttribute("aria-hidden", "true");
          document.body.classList.remove("item-detail-locked");
        }
        function handleClose(event) {
          const target = event && event.target;
          if (!target || !target.closest) return;
          const clipClose = target.closest("[data-clip-viewer-close],.clip-viewer-close");
          const itemClose = target.closest("[data-item-detail-close],.item-detail-close,[data-item-detail-done],.item-detail-done");
          if (!clipClose && !itemClose) return;
          if (event.preventDefault) event.preventDefault();
          if (event.stopPropagation) event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          if (clipClose) closeClip(clipClose.closest("[data-clip-viewer-modal],.clip-viewer-modal") || document.querySelector("[data-clip-viewer-modal],.clip-viewer-modal"));
          if (itemClose) closeItem(itemClose.closest("[data-item-detail-modal],.item-detail-modal") || document.querySelector("[data-item-detail-modal],.item-detail-modal"));
        }
        document.addEventListener("pointerdown", handleClose, true);
        document.addEventListener("click", handleClose, true);
      })();
    </script>`;

const customerLocationSheetCss = String.raw`
      .location-overlay { position: fixed; inset: 0; z-index: 70; display: none; align-items: flex-end; justify-content: center; background: rgba(15,23,42,.38); backdrop-filter: blur(8px); padding: 18px 12px; }
      .location-overlay.is-open, .location-overlay:target { display: flex; }
      .location-sheet { width: min(100%,480px); max-height: min(86dvh,650px); overflow: auto; border: 1px solid rgba(0,27,71,.10); border-radius: 14px; background: #fff; box-shadow: 0 24px 70px rgba(15,23,42,.20); padding: 18px; }
      .location-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      .location-title { display: inline-flex; align-items: center; gap: 9px; color: var(--emy-navy); font-size: 16px; font-weight: 700; }
      .location-title svg { width: 22px; height: 22px; }
      .location-actions { display: flex; align-items: center; gap: 8px; }
      .location-add, .location-close { height: 32px; border: 1px solid rgba(0,27,71,.12); border-radius: 6px; background: #fff; color: var(--emy-navy); cursor: pointer; padding: 0 12px; font-size: 12px; font-weight: 650; }
      .location-add { border-color: rgba(255,106,0,.26); color: #c14f00; background: #fff8f1; }
      .location-close { width: 32px; padding: 0; }
      .location-current { width: 100%; margin-top: 14px; border: 1px solid rgba(0,27,71,.10); border-radius: 8px; background: #fbfcfe; color: var(--emy-navy); cursor: pointer; display: flex; align-items: center; justify-content: space-between; padding: 11px 12px; text-align: left; font-size: 13px; font-weight: 600; }
      .location-current-copy { display: grid; gap: 3px; }
      .location-current-copy strong { font-size: 13px; line-height: 1.1; font-weight: 650; }
      .location-current-copy small { color: #6b7690; font-size: 11px; line-height: 1.25; font-weight: 450; }
      .radio-dot { width: 15px; height: 15px; border-radius: 999px; border: 1.5px solid rgba(0,27,71,.22); background: #fff; pointer-events: none; }
      .location-current.is-selected .radio-dot, .place-card.is-selected .place-check { background: var(--emy-orange); border-color: var(--emy-orange); box-shadow: inset 0 0 0 4px #fff; }
      .current-radius { margin-top: 10px; border: 1px solid rgba(0,27,71,.08); border-radius: 9px; background: linear-gradient(180deg, rgba(255,250,244,.86), rgba(255,255,255,.92)); padding: 11px; }
      .current-radius[hidden] { display: none; }
      .current-radius-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; color: #67728a; font-size: 11px; font-weight: 600; }
      .current-radius-head strong { color: var(--emy-navy); font-size: 12px; font-weight: 650; }
      .radius-options.compact { grid-template-columns: repeat(5,minmax(0,1fr)); }
      .place-list { display: grid; gap: 8px; margin-top: 10px; }
      .place-card { display: grid; grid-template-columns: 1fr auto; gap: 10px; align-items: center; border: 1px solid rgba(0,27,71,.10); border-radius: 8px; background: #fff; padding: 10px 12px; }
      .place-card.is-selected { border-color: rgba(255,106,0,.38); background: #fff8f1; }
      .place-main { min-width: 0; cursor: pointer; text-align: left; border: 0; background: transparent; padding: 0; color: var(--emy-navy); }
      .place-main strong { display: block; font-size: 12.5px; line-height: 1.2; font-weight: 700; }
      .place-main span { display: block; margin-top: 3px; color: #6d778f; font-size: 11px; line-height: 1.25; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .place-tools { display: flex; align-items: center; gap: 6px; }
      .place-tools button { border: 1px solid rgba(0,27,71,.09); border-radius: 5px; background: #fff; color: #506079; cursor: pointer; padding: 4px 7px; font-size: 11px; font-weight: 600; }
      .place-tools button.place-check { width: 20px; height: 20px; min-width: 20px; padding: 0; border-radius: 999px; border: 1.5px solid rgba(0,27,71,.16); background: #fff; }
      .location-empty { margin: 12px 0 0; color: #6d778f; font-size: 12px; line-height: 1.4; }
      .location-form { display: none; margin-top: 12px; border-top: 1px solid rgba(0,27,71,.08); padding-top: 14px; }
      .location-form.is-open { display: block; }
      .place-tabs { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
      .place-tabs button { height: 36px; border: 1px solid rgba(0,27,71,.10); border-radius: 6px; background: #fff; color: #6d778f; cursor: pointer; font-size: 12px; font-weight: 620; }
      .place-tabs button.is-active { background: var(--emy-navy); color: #fff; border-color: var(--emy-navy); }
      .location-search { position: relative; }
      .location-field { width: 100%; height: 42px; margin-top: 10px; border: 1px solid rgba(0,27,71,.12); border-radius: 6px; background: #fff; color: var(--emy-navy); outline: none; padding: 0 12px; font-size: 13px; font-weight: 520; }
      .location-field:focus { border-color: rgba(255,106,0,.60); box-shadow: 0 0 0 3px rgba(255,106,0,.10); }
      .location-suggestions { position: absolute; left: 0; right: 0; top: calc(100% + 6px); z-index: 9; display: grid; gap: 5px; max-height: 220px; overflow: auto; border: 1px solid rgba(0,27,71,.10); border-radius: 8px; background: rgba(255,255,255,.98); box-shadow: 0 18px 38px rgba(0,27,71,.15); padding: 6px; }
      .location-suggestions[hidden] { display: none; }
      .location-suggestion { width: 100%; border: 1px solid transparent; border-radius: 6px; background: transparent; color: var(--emy-navy); cursor: pointer; padding: 9px 10px; text-align: left; }
      .location-suggestion:hover, .location-suggestion:focus { border-color: rgba(255,106,0,.22); background: #fff7ef; outline: none; }
      .location-suggestion strong, .location-suggestion small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .location-suggestion strong { font-size: 12.5px; line-height: 1.2; font-weight: 760; }
      .location-suggestion small { margin-top: 3px; color: #6d778f; font-size: 11px; line-height: 1.25; font-weight: 520; }
      .location-suggestion-empty { padding: 8px 10px; color: #6d778f; font-size: 11.5px; line-height: 1.35; font-weight: 560; }
      .radius-title { margin: 12px 0 8px; color: #6d778f; font-size: 11px; font-weight: 650; }
      .radius-options { display: grid; grid-template-columns: repeat(5,1fr); gap: 7px; }
      .radius-options button { height: 34px; border: 1px solid rgba(0,27,71,.09); border-radius: 6px; background: #fff; color: var(--emy-navy); cursor: pointer; font-size: 12px; font-weight: 650; }
      .radius-options button.is-active { background: var(--emy-orange); color: #fff; }
      .location-submit { display: block; min-width: 120px; height: 42px; margin: 16px auto 0; border: 0; border-radius: 6px; background: var(--emy-orange); color: #fff; cursor: pointer; padding: 0 20px; font-size: 13px; font-weight: 720; }
      .location-status { min-height: 18px; margin: 10px 0 0; color: #9a4b00; text-align: center; font-size: 11.5px; line-height: 1.35; font-weight: 550; }
      @media (min-width: 760px) {
        .location-overlay { align-items: center; padding: 28px; }
        .location-sheet { border-radius: 16px; }
      }`;

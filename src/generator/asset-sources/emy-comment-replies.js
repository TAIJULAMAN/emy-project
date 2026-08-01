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

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

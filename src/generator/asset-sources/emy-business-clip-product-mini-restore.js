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

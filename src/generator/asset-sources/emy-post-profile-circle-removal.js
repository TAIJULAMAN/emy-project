(function shapeEmyPostProfileAvatars() {
        if (window.__emyPostProfileCircleRemovalInstalled) return;
        window.__emyPostProfileCircleRemovalInstalled = true;
        const avatarSelector = [
          ".social-feed-head > .social-feed-avatar",
          ".social-feed-head > .feed-avatar",
          ".social-feed-head .social-feed-avatar",
          ".social-feed-head .feed-avatar",
          ".feed-card-head .feed-avatar",
          ".post-head > .post-avatar",
          ".post-head .post-avatar",
          ".feed-post-head > .feed-create-brand-mark",
          ".feed-post-head > [data-feed-actor-avatar]",
          ".feed-post-head .feed-create-brand-mark",
          ".feed-post-head [data-feed-actor-avatar]",
          ".reel-top > .reel-avatar",
          ".search-reel-top > .search-reel-avatar",
          ".business-preview-post-head > .business-preview-post-avatar",
          ".business-preview-post-head .business-preview-post-avatar",
          ".business-preview-post-owner > .business-preview-post-avatar",
          ".business-preview-post-owner .business-preview-post-avatar",
          ".home-created-top > .home-created-avatar",
          ".home-created-top .home-created-avatar",
          ".home-owned-divider-inner > .home-owned-avatar",
          ".business-owned-divider-inner > .business-owned-avatar",
          ".my-business-update > .my-business-update-avatar",
          ".rail-pulse-item > .rail-pulse-media",
          ".feed-job-business > i",
          ".feed-comment > .feed-comment-avatar",
          ".feed-comment-reply > .feed-comment-avatar",
          ".item-product-comment-preview > .item-product-comment-avatar",
          ".item-product-comment-row > .item-product-comment-avatar",
          ".item-product-comment-reply-row > .item-product-comment-avatar",
          ".clip-viewer-comment > .clip-viewer-comment-avatar",
          ".clip-viewer-comment-reply > .clip-viewer-comment-avatar"
        ].join(",");
        const ownerSelector = [
          ".social-feed-head",
          ".feed-card-head",
          ".post-head",
          ".feed-post-head",
          ".reel-top",
          ".search-reel-top",
          ".business-preview-post-head",
          ".business-preview-post-owner",
          ".home-created-top",
          ".home-owned-divider-inner",
          ".business-owned-divider-inner",
          ".my-business-update",
          ".rail-pulse-item",
          ".feed-job-business",
          ".feed-comment",
          ".feed-comment-reply",
          ".item-product-comment-preview",
          ".item-product-comment-row",
          ".item-product-comment-reply-row",
          ".clip-viewer-comment",
          ".clip-viewer-comment-reply"
        ].join(",");
        const cardSelector = [
          "[data-card]",
          "[data-feed-id]",
          "[data-business-key]",
          "[data-owner]",
          "[data-owner-type]",
          "[data-actor-type]",
          "[data-account-type]",
          "[data-created-as]",
          "[data-profile-href]",
          ".feed-card",
          ".social-feed-card",
          ".feed-job-card",
          ".job-card",
          ".business-card",
          ".business-preview-card",
          ".home-created-card",
          ".is-user-post"
        ].join(",");
        const businessAvatarSelector = [
          ".business-avatar",
          ".my-business-avatar",
          ".business-preview-post-avatar",
          ".business-top-avatar",
          ".business-owned-avatar",
          ".business-profile-hub-avatar",
          ".feed-business-profile-avatar",
          ".item-business-avatar",
          ".feed-job-business > i",
          "[data-business-link]",
          "[data-business-owned-avatar]",
          "[data-business-top-avatar]"
        ].join(",");
        const customerAvatarSelector = [
          ".home-created-avatar",
          ".profile-record-avatar",
          ".customer-avatar",
          ".customer-profile-avatar",
          ".feed-comment-avatar",
          ".item-product-comment-avatar",
          ".clip-viewer-comment-avatar"
        ].join(",");
        const fallbackStyleText = [
          ".social-feed-head>.social-feed-avatar,.social-feed-head>.feed-avatar,.social-feed-head .social-feed-avatar,.social-feed-head .feed-avatar,.post-head>.post-avatar,.post-head .post-avatar,.reel-top>.reel-avatar,.search-reel-top>.search-reel-avatar,.home-created-top>.home-created-avatar,.feed-job-business>i{display:inline-grid!important;visibility:visible!important;opacity:1!important;flex:0 0 auto!important}",
          ".emy-avatar-shape-applied{display:inline-grid!important;visibility:visible!important;opacity:1!important;place-items:center!important;flex:0 0 auto!important;width:var(--emy-post-avatar-size,42px)!important;min-width:var(--emy-post-avatar-size,42px)!important;height:var(--emy-post-avatar-size,42px)!important;overflow:hidden!important;background:#fff!important;box-shadow:inset 0 0 0 1px rgba(0,27,71,.08)!important}",
          ".emy-avatar-shape-customer{border-radius:999px!important}",
          ".emy-avatar-shape-business{border-radius:10px!important}",
          ".emy-avatar-shape-applied:not(.has-image){color:#08224d!important;font-weight:850!important;text-shadow:none!important}",
          ".emy-avatar-shape-applied>img,.emy-avatar-shape-applied picture,.emy-avatar-shape-applied picture>img{display:block!important;visibility:visible!important;opacity:1!important;width:100%!important;height:100%!important;border-radius:inherit!important;object-fit:cover!important}"
        ].join("");
        function installStyle() {
          if (document.querySelector("style[data-emy-post-profile-circle-removal-style]")) return;
          const style = document.createElement("style");
          style.setAttribute("data-emy-post-profile-circle-removal-style", "true");
          style.textContent = fallbackStyleText;
          document.head.appendChild(style);
        }
        function textIncludesBusiness(value) {
          return /business|company|shop|store|brand/.test(String(value || "").toLowerCase());
        }
        function textIncludesCustomer(value) {
          return /customer|customer-profile|emy-customer-profile|person|people|user|member|profile-record|your-post|is-user-post/.test(String(value || "").toLowerCase());
        }
        function getHref(node) {
          const direct = node && node.matches && node.matches("a[href]") ? node : null;
          const closest = !direct && node && node.closest ? node.closest("a[href]") : null;
          const owner = node && node.closest ? node.closest(ownerSelector) : null;
          const nearby = owner && owner.querySelector ? owner.querySelector(".feed-profile-link[href],.social-feed-name[href],.business-preview-post-link[href],a[href]") : null;
          const link = direct || closest || nearby;
          return link && link.getAttribute ? String(link.getAttribute("href") || "") : "";
        }
        function getOwnerCard(node) {
          return node && node.closest ? node.closest(cardSelector) : null;
        }
        function cleanAvatarText(value) {
          return String(value || "").replace(/\s+/g, " ").trim();
        }
        function fallbackInitialFromOwner(node, business) {
          const owner = node && node.closest ? node.closest(ownerSelector) : null;
          const card = getOwnerCard(node);
          const pieces = [];
          const push = (value) => {
            const text = cleanAvatarText(value);
            if (text) pieces.push(text);
          };
          const pushNode = (target) => {
            if (!target) return;
            if (target.dataset) {
              [
                "avatarInitial",
                "owner",
                "ownerName",
                "actorName",
                "customerName",
                "businessName",
                "businessKey",
                "feedCreateActor"
              ].forEach((key) => push(target.dataset[key]));
            }
            if (target.getAttribute) {
              ["aria-label", "title", "data-owner", "data-business-key", "data-customer-name", "data-business-name"].forEach((attr) => push(target.getAttribute(attr)));
            }
          };
          const pushSelectedText = (target) => {
            if (!target || !target.querySelector) return;
            [
              "[data-feed-create-actor]",
              "[data-feed-article-actor]",
              "[data-feed-article-publish-actor]",
              ".social-feed-name strong",
              ".feed-profile-link strong",
              ".post-head strong",
              ".reel-owner-link strong",
              ".business-preview-post-owner strong",
              ".home-created-top strong",
              ".profile-record-copy h3",
              ".feed-job-business span",
              "strong"
            ].some((selector) => {
              const found = target.querySelector(selector);
              push(found && found.textContent);
              return !!cleanAvatarText(found && found.textContent);
            });
          };
          pushNode(node);
          pushNode(owner);
          pushNode(card);
          pushSelectedText(owner);
          pushSelectedText(card);
          push(owner && owner.textContent);
          push(card && card.textContent);
          const label = cleanAvatarText(pieces[0] || "");
          return (label.charAt(0) || (business ? "B" : "E")).toUpperCase();
        }
        function restoreBlankAvatarInitial(node, business) {
          if (!node || !node.classList) return;
          const hasMedia = !!(node.querySelector && node.querySelector("img,picture,video"));
          if (hasMedia || cleanAvatarText(node.textContent)) return;
          node.textContent = fallbackInitialFromOwner(node, business);
        }
        function attrText(node) {
          if (!node || !node.getAttribute) return "";
          return [
            node.getAttribute("data-owner"),
            node.getAttribute("data-owner-type"),
            node.getAttribute("data-actor-type"),
            node.getAttribute("data-account-type"),
            node.getAttribute("data-created-as"),
            node.getAttribute("data-profile-type"),
            node.getAttribute("data-profile-href"),
            node.getAttribute("data-business-key"),
            node.getAttribute("data-repost-actor-type"),
            node.className && typeof node.className === "string" ? node.className : ""
          ].join(" ");
        }
        function hasCustomerSignal(node) {
          if (!node || !node.matches) return false;
          const href = getHref(node).toLowerCase();
          if (href.indexOf("emy-customer-profile") !== -1 || href.indexOf("customer-profile") !== -1) return true;
          if (node.matches(customerAvatarSelector)) return true;
          if (textIncludesCustomer(attrText(node))) return true;
          const owner = node.closest && node.closest(ownerSelector);
          if (owner && textIncludesCustomer(attrText(owner))) return true;
          const card = getOwnerCard(node);
          if (card) {
            const cardText = attrText(card);
            if (card.classList && card.classList.contains("is-user-post")) return true;
            if (textIncludesCustomer(cardText)) return true;
            const cardHref = String(card.getAttribute && (card.getAttribute("data-profile-href") || "") || "").toLowerCase();
            if (cardHref.indexOf("emy-customer-profile") !== -1) return true;
            const headLink = card.querySelector && card.querySelector(".social-feed-head a[href],.reel-top a[href],.feed-profile-link[href]");
            const headHref = headLink && headLink.getAttribute ? String(headLink.getAttribute("href") || "").toLowerCase() : "";
            if (headHref.indexOf("emy-customer-profile") !== -1 || headHref.indexOf("customer-profile") !== -1) return true;
          }
          return false;
        }
        function hasBusinessSignal(node) {
          if (!node || !node.matches) return false;
          if (hasCustomerSignal(node)) return false;
          if (node.matches(businessAvatarSelector)) return true;
          if (node.hasAttribute && node.hasAttribute("data-business-link")) return true;
          const href = getHref(node).toLowerCase();
          if (href.indexOf("emy-business-profile") !== -1 || href.indexOf("mode=business") !== -1 || href.indexOf("business=") !== -1) return true;
          const owner = node.closest && node.closest(ownerSelector);
          if (owner) {
            if (textIncludesCustomer(attrText(owner))) return false;
            if (owner.querySelector && owner.querySelector("[data-business-link]")) return true;
            const attrs = attrText(owner);
            if (textIncludesBusiness(attrs)) return true;
            if (textIncludesCustomer(attrs)) return false;
          }
          const card = getOwnerCard(node);
          if (card) {
            const attrs = attrText(card);
            if (textIncludesBusiness(attrs)) return true;
            if (textIncludesCustomer(attrs)) return false;
            if (card.hasAttribute && card.hasAttribute("data-business-id")) return true;
            if (card.matches(".business-profile,.business-card,.business-preview-card")) return true;
            if (href.indexOf("emy-business-profile") !== -1 || href.indexOf("mode=business") !== -1 || href.indexOf("business=") !== -1) return true;
          }
          return false;
        }
        function isBusinessAvatar(node) {
          if (!node || !node.matches) return false;
          const href = getHref(node).toLowerCase();
          if (hasCustomerSignal(node)) return false;
          if (node.matches(customerAvatarSelector) && href.indexOf("emy-business-profile") === -1 && !node.matches(businessAvatarSelector)) return false;
          return hasBusinessSignal(node);
        }
        function revealAvatar(node) {
          if (!node || !node.classList) return;
          const owner = node.closest && node.closest(ownerSelector);
          if (owner && owner.classList) owner.classList.remove("emy-post-circle-removed");
          node.hidden = false;
          node.style && node.style.removeProperty && node.style.removeProperty("display");
          node.removeAttribute && node.removeAttribute("aria-hidden");
          const business = isBusinessAvatar(node);
          node.classList.add("emy-avatar-shape-applied");
          node.classList.toggle("emy-avatar-shape-business", business);
          node.classList.toggle("emy-avatar-shape-customer", !business);
          restoreBlankAvatarInitial(node, business);
        }
        function scrub(root) {
          installStyle();
          const scope = root && root.querySelectorAll ? root : document;
          if (scope.matches && scope.matches(avatarSelector)) revealAvatar(scope);
          scope.querySelectorAll(avatarSelector).forEach(revealAvatar);
          if (scope.matches && scope.matches(ownerSelector)) scope.classList.remove("emy-post-circle-removed");
        }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => scrub(document), { once: true });
        else scrub(document);
        [120, 500, 1200, 2500].forEach((delay) => window.setTimeout(() => scrub(document), delay));
      })();

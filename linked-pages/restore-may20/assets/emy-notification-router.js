(function () {
        const VERSION = "2026-06-07-central-router";
        if (window.emyNotificationRouter && window.emyNotificationRouter.version === VERSION) return;

        const FOCUS_KEY = "emyNotificationFocusRequest";
        const CATEGORY = { CHAT: true, POST_COMMENT: true, PRODUCT_COMMENT: true, SYSTEM: true };
        const ROUTE_PARAM_KEYS = ["notificationAction", "feedId", "postId", "productId", "item", "kind", "comment", "message", "thread", "customer", "notifications"];

        function clean(value) {
          return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
        }

        function lower(value) {
          return clean(value).toLowerCase();
        }

        function first(values) {
          const list = Array.isArray(values) ? values : [values];
          for (const value of list) {
            const text = clean(value);
            if (text) return text;
          }
          return "";
        }

        function safeParseJson(value, fallback) {
          try {
            const parsed = JSON.parse(value || "null");
            return parsed == null ? fallback : parsed;
          } catch (error) {
            return fallback;
          }
        }

        function readArray(key) {
          const rows = safeParseJson(localStorage.getItem(key), []);
          return Array.isArray(rows) ? rows : [];
        }

        function writeArray(key, rows) {
          try { localStorage.setItem(key, JSON.stringify(rows)); } catch (error) {}
        }

        function refObject(raw) {
          return raw && raw.ref && typeof raw.ref === "object" ? raw.ref : {};
        }

        function detailObject(raw) {
          if (raw && raw.detailSnapshot && typeof raw.detailSnapshot === "object") return raw.detailSnapshot;
          if (raw && typeof raw.detailSnapshot === "string") return safeParseJson(raw.detailSnapshot, {});
          return {};
        }

        function categoryFromRaw(raw) {
          const ref = refObject(raw);
          const detail = detailObject(raw);
          const explicit = clean(raw && raw.category).toUpperCase();
          if (CATEGORY[explicit]) return explicit;
          const text = lower([
            raw && raw.type,
            raw && raw.action,
            raw && raw.kind,
            raw && raw.itemKind,
            raw && raw.detailKind,
            raw && raw.title,
            raw && raw.body,
            ref.kind,
            ref.detailKind,
            detail.kind,
            detail.detailKind
          ].join(" "));
          if (/customer-message|direct-message|\bmessage\b|\bchat\b|\bdm\b/.test(text)) return "CHAT";
          if (/product/.test(text) && /comment|reply|review/.test(text)) return "PRODUCT_COMMENT";
          if (/comment|reply/.test(text)) return "POST_COMMENT";
          return "SYSTEM";
        }

        function normalizeActivity(notification) {
          const raw = notification && typeof notification === "object" ? notification : {};
          const ref = refObject(raw);
          const detail = detailObject(raw);
          const category = categoryFromRaw(raw);
          const targetId = first([
            raw.targetId,
            raw.messageId,
            raw.chatMessageId,
            raw.businessMessageId,
            raw.customerMessageId,
            raw.commentId,
            raw.replyId,
            raw.feedCommentId,
            raw.itemProductCommentId,
            raw.clipCommentId,
            ref.targetId,
            ref.messageId,
            ref.commentId,
            detail.targetId,
            detail.commentId,
            raw.id
          ]);
          const parentByCategory = category === "CHAT"
            ? [raw.parentId, raw.threadId, raw.groupChatId, raw.customerKey, ref.customerKey, detail.customerKey, raw.businessKey, ref.businessKey, detail.businessKey]
            : category === "PRODUCT_COMMENT"
              ? [raw.parentId, raw.productId, raw.businessProductId, raw.feedId, raw.itemId, raw.postId, ref.productId, ref.businessProductId, ref.feedId, ref.id, detail.productId, detail.feedId, detail.id]
              : [raw.parentId, raw.postId, raw.feedId, raw.itemId, raw.productId, ref.postId, ref.feedId, ref.id, detail.postId, detail.feedId, detail.id];
          return {
            id: first([raw.id, targetId]),
            category,
            targetId,
            parentId: first(parentByCategory),
            currentUrlState: raw.currentUrlState || window.location.search || "",
            raw
          };
        }

        function isBusinessContext(activity) {
          const params = new URLSearchParams(window.location.search || "");
          const path = lower(window.location.pathname);
          const mode = lower(params.get("mode"));
          const view = lower(params.get("view"));
          const raw = activity && activity.raw || {};
          if (lower(raw.context || raw.profileMode || raw.ownerMode) === "business") return true;
          if (path.indexOf("emy-business-profile.html") >= 0) {
            if (view === "customer") return false;
            if (params.get("setup") === "1" || view === "business") return true;
            if (["business", "statistics", "services", "chat", "customers", "upload", "profile", "edit"].includes(mode)) return true;
            return !params.has("view");
          }
          return lower(localStorage.getItem("emyMainSignedInRole")) === "business" && path.indexOf("emy-customer-") === -1;
        }

        function currentBusinessKey() {
          const params = new URLSearchParams(window.location.search || "");
          const draft = safeParseJson(localStorage.getItem("emyBusinessProfileDraft"), {});
          return first([
            params.get("business"),
            localStorage.getItem("emySelectedBusinessProfileKey"),
            draft && (draft.key || draft.businessKey || draft.name || draft.businessName),
            localStorage.getItem("emyBusinessDisplayName"),
            localStorage.getItem("emyBusinessName")
          ]);
        }

        function paramsFromState(activity) {
          const params = new URLSearchParams(window.location.search || "");
          const state = activity && activity.currentUrlState;
          if (typeof state === "string" && clean(state)) {
            const text = state.indexOf("?") >= 0 ? state.slice(state.indexOf("?") + 1) : state;
            new URLSearchParams(text).forEach((value, key) => params.set(key, value));
          } else if (state && typeof state === "object") {
            Object.keys(state).forEach((key) => {
              const value = state[key];
              if (value == null || value === "") params.delete(key);
              else params.set(key, String(value));
            });
          }
          ROUTE_PARAM_KEYS.forEach((key) => params.delete(key));
          return params;
        }

        function routeWithState(page, routeParams, hash, activity) {
          const params = paramsFromState(activity);
          Object.keys(routeParams || {}).forEach((key) => {
            const value = routeParams[key];
            if (value == null || value === "") params.delete(key);
            else params.set(key, String(value));
          });
          const query = params.toString();
          return page + (query ? "?" + query : "") + (hash || "");
        }

        function notificationInboxRoute(activity) {
          if (isBusinessContext(activity)) {
            return routeWithState("emy-business-profile.html", { mode: "business", view: null, notifications: "1" }, "#notifications", activity);
          }
          return routeWithState("emy-customer-home.html", { mode: null, view: null, notifications: "1" }, "#notifications", activity);
        }

        function safeAppHref(href) {
          const text = clean(href);
          if (!text || text === "#") return "";
          if (/^(?:javascript|data):/i.test(text)) return "";
          if (/^https?:\/\//i.test(text)) {
            try {
              const url = new URL(text);
              if (url.origin !== window.location.origin) return "";
              return url.pathname.split("/").pop() + url.search + url.hash;
            } catch (error) {
              return "";
            }
          }
          return text;
        }

        function storePendingFocus(activity, route) {
          const payload = {
            id: activity.id,
            category: activity.category,
            parentId: activity.parentId,
            targetId: activity.targetId,
            route,
            createdAt: Date.now()
          };
          try { localStorage.setItem(FOCUS_KEY, JSON.stringify(payload)); } catch (error) {}
        }

        function storePendingItem(activity) {
          if (activity.category !== "POST_COMMENT" && activity.category !== "PRODUCT_COMMENT") return;
          const raw = activity.raw || {};
          const ref = refObject(raw);
          const detail = detailObject(raw);
          const parentId = activity.parentId;
          const payload = Object.assign({}, detail, ref, {
            id: first([parentId, detail.id, ref.id]),
            feedId: first([parentId, raw.feedId, raw.postId, raw.productId, ref.feedId, detail.feedId]),
            productId: activity.category === "PRODUCT_COMMENT" ? first([parentId, raw.productId, ref.productId, detail.productId]) : first([raw.productId, ref.productId, detail.productId]),
            title: first([raw.itemTitle, raw.productTitle, raw.postTitle, raw.title, ref.title, ref.detailTitle, detail.title, detail.detailTitle]),
            detailKind: activity.category === "PRODUCT_COMMENT" ? "Product" : "Post"
          });
          try { localStorage.setItem("emyPendingItemDetailOpen", JSON.stringify(payload)); } catch (error) {}
        }

        function buildRoute(activity) {
          const raw = activity.raw || {};
          const ref = refObject(raw);
          const detail = detailObject(raw);
          const business = isBusinessContext(activity);
          const businessKey = first([raw.businessKey, ref.businessKey, detail.businessKey, currentBusinessKey()]);
          const itemTitle = first([raw.itemTitle, raw.productTitle, raw.postTitle, raw.title, ref.title, ref.detailTitle, detail.title, detail.detailTitle]);

          if (activity.category === "CHAT") {
            const threadId = business
              ? first([raw.parentId, raw.threadId, raw.groupChatId, raw.customerKey, ref.customerKey, detail.customerKey, activity.parentId])
              : first([raw.parentId, raw.threadId, raw.groupChatId, raw.businessKey, ref.businessKey, detail.businessKey, activity.parentId]);
            if (!threadId) throw new Error("CHAT notification is missing parentId/thread id.");
            const messageId = first([activity.targetId, raw.messageId, raw.chatMessageId, raw.id]);
            if (business) {
              return routeWithState("emy-business-profile.html", {
                mode: "chat",
                view: null,
                business: businessKey,
                customer: threadId,
                thread: threadId,
                message: messageId
              }, "", activity);
            }
            return routeWithState("emy-customer-chat.html", {
              mode: null,
              view: null,
              business: threadId,
              thread: threadId,
              message: messageId
            }, "", activity);
          }

          if (activity.category === "POST_COMMENT" || activity.category === "PRODUCT_COMMENT") {
            if (!activity.parentId) throw new Error(activity.category + " notification is missing parentId.");
            if (!activity.targetId) throw new Error(activity.category + " notification is missing targetId.");
            const isProduct = activity.category === "PRODUCT_COMMENT";
            storePendingItem(activity);
            if (business) {
              return routeWithState("emy-business-profile.html", {
                mode: "business",
                view: null,
                business: businessKey,
                notificationAction: "comment",
                feedId: activity.parentId,
                postId: isProduct ? null : activity.parentId,
                productId: isProduct ? activity.parentId : null,
                item: itemTitle,
                kind: isProduct ? "Product" : "Post",
                comment: activity.targetId
              }, "", activity);
            }
            return routeWithState(isProduct ? "emy-customer-search.html" : "emy-customer-home.html", {
              mode: null,
              view: null,
              notificationAction: "comment",
              feedId: activity.parentId,
              postId: isProduct ? null : activity.parentId,
              productId: isProduct ? activity.parentId : null,
              item: itemTitle,
              kind: isProduct ? "Product" : "Post",
              comment: activity.targetId
            }, isProduct ? "#products" : "#feeds", activity);
          }

          return safeAppHref(raw.href) || notificationInboxRoute(activity);
        }

        function logRoutingError(notification, error) {
          try {
            console.error("[EMY notifications] Broken notification route", { notification, error: error && (error.stack || error.message) || error });
          } catch (ignored) {}
        }

        function handleNotificationClick(notification) {
          const activity = normalizeActivity(notification);
          try {
            const route = buildRoute(activity);
            storePendingFocus(activity, route);
            window.location.href = route;
            return route;
          } catch (error) {
            logRoutingError(notification, error);
            const fallback = notificationInboxRoute(activity);
            window.location.href = fallback;
            return fallback;
          }
        }

        function cssEscape(value) {
          const text = clean(value);
          if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(text);
          return text.replace(/["\\]/g, "\\$&");
        }

        function focusSelectorFor(request) {
          const target = cssEscape(request.targetId);
          const parent = cssEscape(request.parentId);
          const selectors = [];
          if (target) {
            selectors.push('[data-message-id="' + target + '"]');
            selectors.push('[data-business-chat-message-id="' + target + '"]');
            selectors.push('[data-item-product-chat-message-id="' + target + '"]');
            selectors.push('[data-comment-id="' + target + '"]');
            selectors.push('[data-feed-comment-id="' + target + '"]');
            selectors.push('[data-item-product-comment-id="' + target + '"]');
            selectors.push('[data-clip-comment-id="' + target + '"]');
            selectors.push('[data-clip-comment-reply-item="' + target + '"]');
          }
          if (parent) {
            selectors.push('[data-feed-id="' + parent + '"]');
            selectors.push('[data-business-product-id="' + parent + '"]');
            selectors.push('[data-product-id="' + parent + '"]');
          }
          return selectors.join(",");
        }

        function focusStoredRequest() {
          const request = safeParseJson(localStorage.getItem(FOCUS_KEY), null);
          if (!request || !request.createdAt || Date.now() - Number(request.createdAt) > 15 * 60 * 1000) return;
          const selector = focusSelectorFor(request);
          if (!selector) return;
          const target = document.querySelector(selector);
          if (!target) return;
          document.querySelectorAll(".is-notification-target").forEach((node) => node.classList.remove("is-notification-target"));
          target.classList.add("is-notification-target");
          if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
          if (target.scrollIntoView) target.scrollIntoView({ behavior: "smooth", block: "center" });
          try { target.focus({ preventScroll: true }); } catch (error) {}
          try { localStorage.removeItem(FOCUS_KEY); } catch (error) {}
        }

        function notificationRows(key) {
          return readArray(key).filter((item) => item && typeof item === "object");
        }

        function findStoredNotification(id, preferBusiness) {
          const keys = preferBusiness ? ["emyBusinessNotifications", "emyCustomerNotifications"] : ["emyCustomerNotifications", "emyBusinessNotifications"];
          for (const key of keys) {
            const match = notificationRows(key).find((item) => clean(item.id) === id);
            if (match) return { key, item: match };
          }
          return null;
        }

        function markRead(key, id) {
          if (!key || !id) return;
          const rows = notificationRows(key);
          let changed = false;
          const next = rows.map((item) => {
            if (clean(item.id) !== id) return item;
            changed = true;
            return Object.assign({}, item, { read: true, unread: false });
          });
          if (changed) writeArray(key, next);
        }

        function openRow(row, event) {
          const isBusinessRow = row.hasAttribute("data-business-notification-id");
          const id = clean(row.getAttribute(isBusinessRow ? "data-business-notification-id" : "data-notification-id"));
          const stored = findStoredNotification(id, isBusinessRow);
          if (event) {
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
          }
          if (!stored) {
            handleNotificationClick({ id, category: "SYSTEM", currentUrlState: window.location.search });
            return;
          }
          markRead(stored.key, id);
          handleNotificationClick(stored.item);
        }

        document.addEventListener("click", function (event) {
          if (!event.target || !event.target.closest) return;
          if (event.target.closest("[data-notification-action],[data-business-notification-action],[data-notification-menu],[data-notification-menu-panel]")) return;
          const row = event.target.closest("[data-business-notification-id],[data-notification-id]");
          if (row) openRow(row, event);
        }, true);

        document.addEventListener("keydown", function (event) {
          if (event.key !== "Enter" && event.key !== " ") return;
          if (!event.target || !event.target.closest) return;
          const row = event.target.closest("[data-business-notification-id],[data-notification-id]");
          if (row) openRow(row, event);
        }, true);

        [120, 500, 1200, 2400].forEach((delay) => window.setTimeout(focusStoredRequest, delay));
        window.addEventListener("load", function () { window.setTimeout(focusStoredRequest, 120); });

        window.emyNotificationRouter = {
          version: VERSION,
          normalizeActivity,
          buildRoute,
          handleNotificationClick,
          notificationInboxRoute,
          focusStoredRequest
        };
        window.handleNotificationClick = handleNotificationClick;
      })();

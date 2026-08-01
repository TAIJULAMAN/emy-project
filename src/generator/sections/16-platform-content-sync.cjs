/* EMY generator section: platform-wide content sync hub (loads before page scripts via head asset) */
const sharedPlatformContentSyncScript = String.raw`
    <script data-emy-platform-content-sync>
      (function installEmyPlatformContentSync() {
        if (window.__emyPlatformContentSyncInstalled) return;
        window.__emyPlatformContentSyncInstalled = true;
        const refreshers = new Map();
        let refreshSeq = 0;
        let deferredFullTimer = 0;
        let scheduledRefreshTimer = 0;
        let scheduledRefreshOptions = null;
        let suppressDeferredFullUntil = 0;
        const CONTENT_EVENTS = [
          "emy:created-posts-changed",
          "emy:created-jobs-changed",
          "emy:created-events-changed",
          "emy:feed-reposts-changed",
          "emy:feed-source-edited",
          "emy:business-products-changed",
          "emy:business-clips-changed",
          "emy:business-content-changed",
          "emy:business-profile-changed",
          "emy:real-business-profiles-synced",
          "emy:my-business-updates-read",
          "emy:media-stored",
          "emy:shared-port-content-ready"
        ];
        function clearCaches() {
          try {
            if (typeof window.emyContentSyncClearCaches === "function") window.emyContentSyncClearCaches();
          } catch (error) {}
        }
        function runFallbackSurfaces(options) {
          const opts = options || {};
          try {
            if (typeof window.emyPurgeDeletedFeedCardsFromAllLists === "function") window.emyPurgeDeletedFeedCardsFromAllLists();
          } catch (error) {}
          if (typeof window.emyRefreshAllContentSurfaces === "function") {
            try { window.emyRefreshAllContentSurfaces(opts); return; } catch (error) {}
          }
          if (typeof window.refreshHomeFeedSurfacesFromStorage === "function") {
            try { window.refreshHomeFeedSurfacesFromStorage(opts); return; } catch (error) {}
          }
          if (typeof window.emySetupHomeStaticFeedSections === "function") {
            try { window.emySetupHomeStaticFeedSections(); } catch (error) {}
          }
          if (typeof window.emyRenderHomeCreatedSections === "function") {
            try { window.emyRenderHomeCreatedSections(); } catch (error) {}
          }
          if (typeof window.emySyncHomeCarouselSections === "function") {
            try { window.emySyncHomeCarouselSections(); } catch (error) {}
          }
          if (typeof window.emySyncHomeSectionGuides === "function") {
            try { window.emySyncHomeSectionGuides(); } catch (error) {}
          }
          if (typeof window.emyRenderBusinessPostedSections === "function") {
            try { window.emyRenderBusinessPostedSections(); } catch (error) {}
          }
          if (typeof window.emyRenderSearchResults === "function") {
            try { window.emyRenderSearchResults(); } catch (error) {}
          }
          if (typeof window.emyRefreshCustomerFeedsPage === "function") {
            try { window.emyRefreshCustomerFeedsPage(); } catch (error) {}
          }
          const view = document.body ? (document.body.dataset.currentView || "") : "";
          if ((view === "feeds" || /#feeds/i.test(String(location.hash || ""))) && typeof window.emyRenderAnnexedFeeds === "function") {
            try { window.emyRenderAnnexedFeeds(); } catch (error) {}
          }
        }
        function refreshAll(options) {
          const opts = options || {};
          refreshSeq += 1;
          clearCaches();
          if (refreshers.size) {
            refreshers.forEach(function(fn, name) {
              try { fn(opts); } catch (error) {
                try { console.warn("[emyContentSync] refresh failed:", name, error); } catch (logError) {}
              }
            });
          } else {
            runFallbackSurfaces(opts);
          }
          window.emyContentSyncLastRefreshAt = Date.now();
          suppressDeferredFullUntil = window.emyContentSyncLastRefreshAt + 2000;
          try {
            window.dispatchEvent(new CustomEvent("emy:content-surfaces-refreshed", { detail: opts }));
          } catch (error) {}
          return refreshSeq;
        }
        function mergeRefreshOptions(next) {
          const base = scheduledRefreshOptions || {};
          const incoming = next || {};
          scheduledRefreshOptions = Object.assign({}, base, incoming);
          if (base.detail || incoming.detail) {
            scheduledRefreshOptions.detail = Object.assign({}, base.detail || {}, incoming.detail || {});
          }
        }
        function scheduleContentSyncWork(callback, timeout) {
          const delay = typeof timeout === "number" ? timeout : 650;
          const schedule = window.emyScheduleHeavyInteraction;
          if (typeof schedule === "function") {
            schedule(callback, { timeout: delay });
            return;
          }
          if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(callback, { timeout: delay });
            return;
          }
          window.setTimeout(callback, Math.min(Math.max(delay, 80), 900));
        }
        function scheduleRefreshAll(options, timeout) {
          mergeRefreshOptions(options);
          if (scheduledRefreshTimer) return;
          scheduledRefreshTimer = 1;
          scheduleContentSyncWork(function() {
            const opts = scheduledRefreshOptions || {};
            scheduledRefreshOptions = null;
            scheduledRefreshTimer = 0;
            refreshAll(opts);
          }, timeout);
        }
        function notify(detail) {
          const payload = Object.assign({ source: "notify" }, detail || {});
          if (payload.source === "emy:media-stored") {
            scheduleRefreshAll({ detail: payload, source: "emy:media-stored" }, 700);
            return;
          }
          const action = String(payload.action || (payload.detail && payload.detail.action) || "").trim().toLowerCase();
          scheduleRefreshAll({ detail: payload, source: payload.source || "notify", action: action }, action === "create" || action === "edit" || action === "delete" ? 180 : 700);
          scheduleDeferredFull();
        }
        function scheduleDeferredFull() {
          if (deferredFullTimer) window.clearTimeout(deferredFullTimer);
          deferredFullTimer = window.setTimeout(function() {
            deferredFullTimer = 0;
            if (Date.now() < suppressDeferredFullUntil) return;
            try {
              if (typeof window.emyContentSyncRunFull === "function") window.emyContentSyncRunFull();
            } catch (error) {}
          }, 2200);
        }
        function emySyncContentSurfacesHub(detail) {
          const currentSync = window.emySyncContentSurfaces;
          if (typeof currentSync === "function" && currentSync !== emySyncContentSurfacesHub) {
            try { currentSync(detail || {}); return; } catch (error) {}
          }
          scheduleRefreshAll({ detail: detail || {}, source: "emySyncContentSurfacesHub" }, 180);
        }
        function register(name, fn) {
          if (!name || typeof fn !== "function") return function() {};
          refreshers.set(String(name), fn);
          return function unregister() { refreshers.delete(String(name)); };
        }
        window.emyContentSync = {
          register: register,
          unregister: function(name) { refreshers.delete(String(name)); },
          refreshAll: refreshAll,
          notify: notify,
          clearCaches: clearCaches,
          get lastRefreshAt() { return window.emyContentSyncLastRefreshAt || 0; }
        };
        window.emySyncContentSurfaces = window.emySyncContentSurfaces || emySyncContentSurfacesHub;
        CONTENT_EVENTS.forEach(function(eventName) {
          window.addEventListener(eventName, function(event) {
            notify(Object.assign({ source: eventName }, event && event.detail ? event.detail : {}));
          });
        });
        window.addEventListener("storage", function(event) {
          const key = event && event.key;
          if (!key) return;
          if (/^emy(FeedCreated|FeedDeleted|Business|Customer|Saved|Admin)/i.test(key) || key === "emyFeedReposts") {
            notify({ source: "storage", key: key });
          }
        });
        try {
          window.dispatchEvent(new CustomEvent("emy:content-sync-ready"));
        } catch (error) {}
      })();
    </script>`;

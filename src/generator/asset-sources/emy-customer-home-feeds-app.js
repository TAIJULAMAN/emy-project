function emyFeedsAppInstallAndInit() {
          if (window.__EMY_FEEDS_APP__) return;
          window.__EMY_FEEDS_APP__ = true;

          const STORAGE_SOURCES = [
            "emyFeedCreatedPosts",
            "emyFeedCreatedJobs",
            "emyFeedCreatedEvents",
            "emyFeedCreatedProducts",
            "emyFeedReposts",
            "emyBusinessFeedPosts",
            "emyBusinessPosts",
            "emyBusinessProducts",
            "emyBusinessProductList",
            "emyBusinessProductPosts",
            "emyBusinessClips",
            "emyBusinessReels",
            "emyBusinessProductReels",
            "emyBusinessEvents",
            "emyBusinessEventPosts",
            "emyBusinessJobs",
            "emyBusinessJobPosts",
            "emyBusinessArticles",
            "emyBusinessArticlePosts"
          ];

          function readJson(key, fallback) {
            try {
              const raw = localStorage.getItem(key);
              return raw ? JSON.parse(raw) : fallback;
            } catch (error) {
              return fallback;
            }
          }

          window.emyContentStore = window.emyContentStore || {
            sources: STORAGE_SOURCES,
            readJson: readJson,
            readList(key) {
              const rows = readJson(key, []);
              return Array.isArray(rows) ? rows : [];
            },
            readAllRaw() {
              const rows = [];
              STORAGE_SOURCES.forEach((key) => {
                this.readList(key).forEach((item) => rows.push({ item, sourceKey: key }));
              });
              return rows;
            },
            notifyChange(detail) {
              if (window.emyContentSync && typeof window.emyContentSync.notify === "function") {
                window.emyContentSync.notify(Object.assign({ source: "emyContentStore" }, detail || {}));
              } else if (typeof window.emySyncContentSurfaces === "function") {
                window.emySyncContentSurfaces(detail || {});
              }
            }
          };

          if (typeof installAnnexedFeedListRescue === "function") {
            window.installAnnexedFeedListRescue = function noopAnnexedFeedListRescue() {};
          }
          if (typeof scheduleAnnexedFeedListRescue === "function") {
            window.scheduleAnnexedFeedListRescue = function noopScheduleAnnexedFeedListRescue() {};
          }

          if (typeof feedSurfaceShouldHydrateOnly === "function" && !window.__EMY_FEEDS_HYDRATE_PATCH__) {
            window.__EMY_FEEDS_HYDRATE_PATCH__ = true;
            const legacyFeedSurfaceShouldHydrateOnly = feedSurfaceShouldHydrateOnly;
            feedSurfaceShouldHydrateOnly = function emyFeedsAppShouldHydrateOnly(options) {
              if (window.__EMY_FEEDS_APP__) return false;
              return legacyFeedSurfaceShouldHydrateOnly(options);
            };
          }

          function loadMergedFeedItems() {
            if (typeof annexedMergedFeedItems === "function") {
              try { return annexedMergedFeedItems(); } catch (error) {}
            }
            const seen = new Set();
            const merged = [];
            window.emyContentStore.readAllRaw().forEach(({ item, sourceKey }, index) => {
              if (!item || item.deleted === true || item.removed === true || item.hidden === true || item.deletedAt) return;
              if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(item)) return;
              const id = String(item.id || sourceKey + "-" + index);
              if (seen.has(id)) return;
              seen.add(id);
              merged.push(item);
            });
            return merged;
          }

          function filterFeedItems(items, filter) {
            const activeFilter = String(filter || "all").toLowerCase();
            const previousFilter = typeof annexedFeedFilter !== "undefined" ? annexedFeedFilter : activeFilter;
            annexedFeedFilter = activeFilter;
            try {
              if (typeof annexedFeedItemMatchesCurrentFilter === "function") {
                return items.filter(annexedFeedItemMatchesCurrentFilter);
              }
            } finally {
              annexedFeedFilter = previousFilter;
            }
            return items;
          }

          function hydrateFeedList(list) {
            if (!list) return;
            if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(list);
            if (window.emySetupVideoPlayers) window.emySetupVideoPlayers(list);
            if (window.emySetupVideoDurations) window.emySetupVideoDurations(list);
            if (window.emySetupFeedMediaCarousels) window.emySetupFeedMediaCarousels(list);
            if (typeof setupMutedClipHoverPreviews === "function") setupMutedClipHoverPreviews(list);
            if (typeof syncAnnexedFeedState === "function") syncAnnexedFeedState();
            if (typeof ensureAnnexedActionIcons === "function") ensureAnnexedActionIcons(list);
            if (typeof setupRealRailItemDetailLinks === "function") setupRealRailItemDetailLinks();
          }

          function syncFeedIntro(hasCards) {
            const intro = document.querySelector("[data-feed-section-intro]");
            if (!intro) return;
            if (hasCards) {
              intro.hidden = true;
              intro.innerHTML = "";
              return;
            }
            intro.hidden = false;
            if (typeof feedGuideHtml === "function") {
              intro.innerHTML = feedGuideHtml(annexedFeedFilter || "all");
            }
          }

          function renderFeedsApp() {
            const feedList = typeof currentAnnexedFeedList === "function" ? currentAnnexedFeedList() : document.querySelector("[data-annexed-feed-list]");
            if (!feedList) return;
            const filter = String((typeof annexedFeedFilter !== "undefined" ? annexedFeedFilter : "all") || "all").toLowerCase();
            annexedFeedFilter = filter;
            const allItems = loadMergedFeedItems();
            const filtered = filterFeedItems(allItems, filter);
            const batch = typeof annexedFeedBatchSize === "number" ? annexedFeedBatchSize : 12;
            const limit = Math.max(batch, Number(annexedFeedVisibleLimit) || batch);
            const visible = filtered.slice(0, limit);
            feedList.classList.toggle("is-product-grid", filter === "product");
            feedList.classList.toggle("is-clip-grid", filter === "clip");
            if (typeof renderAnnexedFeedCard === "function") {
              feedList.innerHTML = visible.map((item, index) => renderAnnexedFeedCard(item, index)).join("");
            } else {
              feedList.innerHTML = "";
            }
            let realFallbackFilled = false;
            if (!visible.length && typeof window.emyFillRealFeedListFallback === "function") {
              realFallbackFilled = window.emyFillRealFeedListFallback(feedList, filter, { force: false });
            }
            if (annexedFeedStatus) {
              annexedFeedStatus.textContent = visible.length
                ? ("Showing " + visible.length + (filtered.length > visible.length ? " of " + filtered.length : "") + " update" + (visible.length === 1 ? "" : "s") + ".")
                : realFallbackFilled ? "Showing saved business updates." : "No feed updates match this filter yet.";
            }
            if (typeof updateAnnexedFeedLoadMore === "function") updateAnnexedFeedLoadMore(filtered.length, visible.length);
            hydrateFeedList(feedList);
            syncFeedIntro(visible.length > 0 || realFallbackFilled);
            if (typeof syncHomeSectionGuides === "function") syncHomeSectionGuides();
          }

          function renderHomePostedApp() {
            if (typeof window.emyRenderHomePostedSectionsWhenReady === "function") {
              window.emyRenderHomePostedSectionsWhenReady();
            } else {
              if (typeof renderHomeCreatedSections === "function") renderHomeCreatedSections();
              if (typeof renderHomePostedJobs === "function") renderHomePostedJobs();
            }
            ["[data-home-posted-posts-list]", "[data-home-posted-events-list]", "[data-home-posted-articles-list]", "[data-home-posted-jobs-list]"].forEach((selector) => {
              const list = document.querySelector(selector);
              if (list) hydrateFeedList(list);
            });
            if (typeof syncHomeListCarouselState === "function") {
              document.querySelectorAll("[data-home-posted-posts-list],[data-home-posted-events-list],[data-home-posted-articles-list],[data-home-posted-jobs-list]").forEach((list) => {
                syncHomeListCarouselState(list);
              });
            }
            if (typeof syncHomeSectionGuides === "function") syncHomeSectionGuides();
          }

          function refreshAllFeedsApp(options) {
            if (options && options.detail && options.detail.feedId && typeof purgeDeletedFeedCardsFromAllLists === "function") {
              purgeDeletedFeedCardsFromAllLists(options.detail.feedId);
            }
            const onFeeds = typeof isOnCustomerFeedsView === "function" ? isOnCustomerFeedsView() : false;
            const view = document.body ? (document.body.dataset.currentView || "home") : "home";
            if (onFeeds || view === "feeds") renderFeedsApp();
            if (view === "home" || view === "reels" || !onFeeds) renderHomePostedApp();
            if (typeof syncHomeCarouselSections === "function") syncHomeCarouselSections();
          }

          renderAnnexedFeeds = renderFeedsApp;
          window.emyRenderAnnexedFeeds = renderFeedsApp;

          window.refreshHomeFeedSurfacesFromStorage = function emyFeedsAppRefreshHomeFeedSurfacesFromStorage(options) {
            try {
              if (typeof window.emyContentSyncClearCaches === "function") window.emyContentSyncClearCaches();
            } catch (error) {}
            refreshAllFeedsApp(options || {});
          };
          window.emyRefreshAllContentSurfaces = window.refreshHomeFeedSurfacesFromStorage;

          window.emySyncContentSurfaces = function emyFeedsAppSyncContentSurfaces(detail) {
            refreshAllFeedsApp({ detail: detail || {}, source: "emySyncContentSurfaces" });
            window.emyContentSyncLastRefreshAt = Date.now();
          };

          window.emyFeedsApp = {
            render: renderFeedsApp,
            renderHomePosted: renderHomePostedApp,
            refreshAll: refreshAllFeedsApp,
            loadItems: loadMergedFeedItems,
            getFilter: function() { return String(annexedFeedFilter || "all"); },
            setFilter: function(filter) {
              annexedFeedFilter = String(filter || "all").toLowerCase();
              renderFeedsApp();
            }
          };

          function bindFeedsAppSync() {
            const refresh = function() {
              if (document.hidden) return;
              refreshAllFeedsApp({ source: "feeds-app-event", detail: { action: "refresh" } });
            };
            ["emy:created-posts-changed", "emy:created-jobs-changed", "emy:created-events-changed", "emy:feed-reposts-changed", "emy:feed-source-edited", "emy:business-content-changed"].forEach(function(eventName) {
              window.addEventListener(eventName, refresh);
            });
            window.addEventListener("pageshow", refresh);
            window.addEventListener("focus", refresh);
            document.addEventListener("visibilitychange", refresh);
            window.addEventListener("storage", function(event) {
              const key = event && event.key;
              if (!key) return;
              if (/^emy(FeedCreated|FeedDeleted|Business|Customer)/i.test(key) || key === "emyFeedReposts") refresh();
            });
            if (window.emyContentSync && typeof window.emyContentSync.register === "function") {
              window.emyContentSync.register("feeds-app", refreshAllFeedsApp);
              if (typeof window.emyContentSync.unregister === "function") {
                window.emyContentSync.unregister("customer-home");
              }
            } else {
              window.addEventListener("emy:content-sync-ready", bindFeedsAppSync, { once: true });
            }
          }

          if (typeof setupAnnexedFeeds === "function") setupAnnexedFeeds();
          bindFeedsAppSync();
          refreshAllFeedsApp({ source: "feeds-app-init", detail: { action: "refresh" } });
        }

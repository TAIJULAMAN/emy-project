/* EMY Feeds App (Phase 5) — unified content read + feeds/home render; injected into customer home script */
const emyFeedsAppInstallCode = String.raw`
        function emyFeedsAppInstallAndInit() {
          if (window.__EMY_FEEDS_APP__) return;
          window.__EMY_FEEDS_APP__ = true;

          const CUSTOMER_FEED_SOURCES = [
            "emyFeedCreatedPosts",
            "emyFeedCreatedJobs",
            "emyFeedCreatedEvents",
            "emyFeedCreatedProducts",
            "emyFeedCreatedArticles",
            "emyFeedReposts"
          ];
          const STORAGE_SOURCES = CUSTOMER_FEED_SOURCES.concat([
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
          ]);

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
            readCustomerRaw() {
              const rows = [];
              CUSTOMER_FEED_SOURCES.forEach((key) => {
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
            window.installAnnexedFeedListRescue = function feedsAppInstallRescue() {
              if (typeof scheduleAnnexedFeedListRescue === "function") scheduleAnnexedFeedListRescue();
            };
          }
          if (typeof scheduleAnnexedFeedListRescue === "function") {
            window.scheduleAnnexedFeedListRescue = function feedsAppScheduleRescue() {
              scheduleFeedsAppWork(function retryFeedsRender() {
                if (typeof isOnCustomerFeedsView === "function" && !isOnCustomerFeedsView()) return;
                const feedList = typeof currentAnnexedFeedList === "function" ? currentAnnexedFeedList() : document.querySelector("[data-annexed-feed-list]");
                if (!feedList || feedList.querySelector("[data-feed-id]")) return;
                renderFeedsApp();
              }, 5200);
            };
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
            const displayable = (items) => (typeof annexedDisplayFeedItems === "function" ? annexedDisplayFeedItems(items) : items);
            const newest = (items) => (typeof annexedNewestFeedItems === "function" ? annexedNewestFeedItems(items) : items);
            if (typeof annexedMergedFeedItems === "function") {
              try {
                const merged = annexedMergedFeedItems();
                if (Array.isArray(merged)) return newest(displayable(merged));
              } catch (error) {}
            }
            if (typeof refreshAnnexedStoredFeedItems === "function") {
              try { refreshAnnexedStoredFeedItems(); } catch (error) {}
            }
            if (typeof mergeFeedItemsByStableId === "function") {
              try {
                const customerRows = typeof window.emyContentStore.readCustomerRaw === "function"
                  ? window.emyContentStore.readCustomerRaw()
                  : window.emyContentStore.readAllRaw().filter(({ sourceKey }) => CUSTOMER_FEED_SOURCES.indexOf(sourceKey) >= 0);
                return newest(displayable(mergeFeedItemsByStableId(customerRows.map(({ item }) => item))));
              } catch (error) {}
            }
            const seen = new Set();
            const merged = [];
            const customerRows = typeof window.emyContentStore.readCustomerRaw === "function"
              ? window.emyContentStore.readCustomerRaw()
              : window.emyContentStore.readAllRaw().filter(({ sourceKey }) => CUSTOMER_FEED_SOURCES.indexOf(sourceKey) >= 0);
            customerRows.forEach(({ item, sourceKey }, index) => {
              if (!item || item.deleted === true || item.removed === true || item.hidden === true || item.deletedAt) return;
              if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(item)) return;
              const id = String(item.id || sourceKey + "-" + index);
              if (seen.has(id)) return;
              seen.add(id);
              merged.push(item);
            });
            return newest(displayable(merged));
          }

          function feedListRenderableCount(feedList) {
            if (!feedList) return 0;
            return Array.from(feedList.querySelectorAll("[data-feed-id]")).filter((card) => {
              if (!card || card.hidden) return false;
              if (card.dataset && card.dataset.feedKindHidden === "true") return false;
              return !(typeof annexedFeedCardIsDeleted === "function" && annexedFeedCardIsDeleted(card));
            }).length;
          }

          function activeFeedsAppKindFilter() {
            const activeButton = document.querySelector("button.feed-kind-filter.is-active[data-feed-kind-filter]");
            const active = String(
              window.__EMY_PENDING_FEED_KIND_FILTER__ ||
              (activeButton && activeButton.dataset.feedKindFilter) ||
              (typeof annexedActiveFeedKindFilter !== "undefined" ? annexedActiveFeedKindFilter : "all") ||
              "all"
            ).toLowerCase();
            if (typeof annexedActiveFeedKindFilter !== "undefined") annexedActiveFeedKindFilter = active;
            return ["all", "posts", "products", "clips", "events", "jobs", "articles"].indexOf(active) >= 0 ? active : "all";
          }

          function feedsAppKindForItem(item) {
            if (typeof annexedFeedKindForItem === "function") return annexedFeedKindForItem(item);
            const row = item || {};
            const marker = [
              row.type,
              row.kind,
              row.createType,
              row.detailKind,
              row.tag,
              row.postMode,
              row.mediaType,
              row.clipKind,
              row.reelKind,
              row.productName,
              row.productTitle
            ].filter(Boolean).join(" ").toLowerCase();
            if (/article/.test(marker)) return "articles";
            if (/event/.test(marker)) return "events";
            if (/job|hiring/.test(marker)) return "jobs";
            if (/clip|reel/.test(marker)) return "clips";
            if (/product/.test(marker) || row.productName || row.productTitle || row.price || row.productPrice) return "products";
            return "posts";
          }

          function feedsAppInteractionKind(kind) {
            if (typeof annexedItemFilterKindForInteraction === "function") return annexedItemFilterKindForInteraction(kind);
            if (kind === "clips") return "clip";
            if (kind === "products") return "product";
            if (kind === "events") return "event";
            if (kind === "jobs") return "job";
            if (kind === "articles") return "article";
            return "post";
          }

          function syncFeedIntroState(feedList, hasCards) {
            if (typeof syncFeedSectionIntro === "function") {
              syncFeedSectionIntro();
              return;
            }
            const intro = document.querySelector("[data-feed-section-intro]");
            if (!intro) return;
            const cardCount = hasCards ? 1 : feedListRenderableCount(feedList);
            if (cardCount > 0) {
              intro.hidden = true;
              intro.innerHTML = "";
              return;
            }
            intro.hidden = false;
            if (typeof feedGuideHtml === "function") {
              intro.innerHTML = typeof feedGuideHtml === "function" ? feedGuideHtml() : "";
            }
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

          function scheduleFeedsAppWork(callback, timeout) {
            const delay = typeof timeout === "number" ? timeout : 1800;
            const run = function() {
              const interactionActiveNow = window.emyHomeInteractionActive && window.emyHomeInteractionActive();
              const activationActiveNow = window.emyHomeActivationActive && window.emyHomeActivationActive();
              if (interactionActiveNow || activationActiveNow) {
                window.setTimeout(run, interactionActiveNow ? 900 : 420);
                return;
              }
              try { callback(); } catch (error) {}
            };
            const interactionActive = window.emyHomeInteractionActive && window.emyHomeInteractionActive();
            const activationActive = window.emyHomeActivationActive && window.emyHomeActivationActive();
            if (interactionActive || activationActive) {
              window.setTimeout(run, Math.max(delay, activationActive ? 4200 : 7600));
              return;
            }
            if (typeof scheduleHomeIdleWork === "function") {
              scheduleHomeIdleWork(run, delay);
              return;
            }
            if (typeof window.requestIdleCallback === "function") {
              window.requestIdleCallback(run, { timeout: delay });
              return;
            }
            window.setTimeout(run, Math.min(Math.max(delay, 400), 2400));
          }

          function renderFeedsApp() {
            const feedList = typeof currentAnnexedFeedList === "function" ? currentAnnexedFeedList() : document.querySelector("[data-annexed-feed-list]");
            if (!feedList) return;
            annexedFeedFilter = "all";
            const allItems = typeof annexedNewestFeedItems === "function" ? annexedNewestFeedItems(annexedDisplayFeedItems(loadMergedFeedItems())) : annexedDisplayFeedItems(loadMergedFeedItems());
            const activeKind = activeFeedsAppKindFilter();
            const locationFilteredItems = filterFeedItems(allItems, "all");
            const filtered = activeKind === "all" ? locationFilteredItems : locationFilteredItems.filter((item) => feedsAppKindForItem(item) === activeKind);
            const interactionKind = activeKind === "all" ? "post" : feedsAppInteractionKind(activeKind);
            const renderable = filtered;
            const storedLimit = Number(feedList.dataset.annexedFeedVisibleLimit || 0);
            const batchSize = Math.max(1, Number(window.EMY_ANNEXED_FEED_BATCH_SIZE || 8) || 8);
            const feedLimit = typeof annexedFeedCurrentLimit === "function"
              ? annexedFeedCurrentLimit(feedList)
              : Math.max(batchSize, Number.isFinite(storedLimit) && storedLimit > 0 ? storedLimit : batchSize);
            if (feedList) feedList.dataset.annexedFeedVisibleLimit = String(feedLimit);
            const visible = renderable.slice(0, feedLimit);
            if (typeof syncAnnexedFeedLoadMore === "function") syncAnnexedFeedLoadMore(renderable.length, visible.length);
            feedList.classList.remove("is-product-grid", "is-clip-grid");
            let nextFeedHtml = "";
            if (typeof renderAnnexedFeedCard === "function") {
              nextFeedHtml = visible.map((item, index) => {
                try { return renderAnnexedFeedCard(item, index); } catch (error) { return ""; }
              }).filter(Boolean).join("");
            }
            // Skip the destructive innerHTML swap when output is unchanged:
            // replacing identical DOM forces images to re-decode and the whole
            // list to repaint, which shows up as visible trembling on screen.
            let feedHash = 0;
            for (let i = 0; i < nextFeedHtml.length; i++) feedHash = (feedHash * 31 + nextFeedHtml.charCodeAt(i)) | 0;
            const feedSignature = activeKind + ":" + nextFeedHtml.length + ":" + feedHash;
            const feedUnchanged = feedList.dataset.emyFeedRenderSignature === feedSignature && (!nextFeedHtml || feedList.children.length > 0);
            if (!feedUnchanged) {
              feedList.innerHTML = nextFeedHtml;
              feedList.dataset.emyFeedRenderSignature = feedSignature;
            }
            let realFallbackFilled = false;
            if (!feedListRenderableCount(feedList) && typeof window.emyFillRealFeedListFallback === "function") {
              realFallbackFilled = window.emyFillRealFeedListFallback(feedList, activeKind === "all" ? "all" : interactionKind, { force: true });
              if (realFallbackFilled) delete feedList.dataset.emyFeedRenderSignature;
            }
            if (!feedListRenderableCount(feedList) && typeof ensureAnnexedSavedCreatedItemsVisible === "function") {
              ensureAnnexedSavedCreatedItemsVisible();
            }
            hydrateFeedList(feedList);
            if (typeof applyAnnexedFeedKindFilter === "function") applyAnnexedFeedKindFilter();
            if (typeof syncAnnexedFeedLoadMoreFromDom === "function") syncAnnexedFeedLoadMoreFromDom();
            const shownCount = feedListRenderableCount(feedList);
            syncFeedIntroState(feedList, shownCount > 0 || realFallbackFilled);
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
            const opts = options || {};
            const action = String((opts.detail && opts.detail.action) || opts.action || "").toLowerCase();
            if (action === "location-change") {
              try { if (typeof window.emyContentSyncClearCaches === "function") window.emyContentSyncClearCaches(); } catch (error) {}
              try { if (typeof refreshAnnexedStoredFeedItems === "function") refreshAnnexedStoredFeedItems({ force: true }); } catch (error) {}
              try { if (typeof resetAnnexedFeedPage === "function") resetAnnexedFeedPage(); } catch (error) {}
            }
            if (opts.detail && opts.detail.feedId && typeof purgeDeletedFeedCardsFromAllLists === "function") {
              purgeDeletedFeedCardsFromAllLists(opts.detail.feedId);
            }
            const onFeeds = typeof isOnCustomerFeedsView === "function" ? isOnCustomerFeedsView() : false;
            const view = document.body ? (document.body.dataset.currentView || "home") : "home";
            if (view === "home" || view === "reels" || !onFeeds) {
              renderHomePostedApp();
              if (typeof setupHomeStaticFeedSections === "function") setupHomeStaticFeedSections();
              const skipHydrate = action === "delete" || action === "create" || action === "edit" || !!(opts.detail && opts.detail.deleted);
              if (!skipHydrate && typeof window.emyHydrateRealHomeContent === "function") window.emyHydrateRealHomeContent();
            }
            if (onFeeds || view === "feeds") {
              renderFeedsApp();
              if (action === "create" && typeof ensureAnnexedSavedCreatedItemsVisible === "function") {
                ensureAnnexedSavedCreatedItemsVisible();
                syncFeedIntroState(typeof currentAnnexedFeedList === "function" ? currentAnnexedFeedList() : document.querySelector("[data-annexed-feed-list]"), true);
              }
            }
            if (typeof syncHomeCarouselSections === "function") syncHomeCarouselSections();
            if (typeof syncHomeSectionGuides === "function") syncHomeSectionGuides();
          }

          let scheduledRefreshOptions = null;
          let scheduledRefreshPending = false;

          function scheduleRefreshAllFeedsApp(options, timeout) {
            scheduledRefreshOptions = Object.assign({}, scheduledRefreshOptions || {}, options || {});
            if (options && options.detail) {
              scheduledRefreshOptions.detail = Object.assign({}, (scheduledRefreshOptions && scheduledRefreshOptions.detail) || {}, options.detail || {});
            }
            if (scheduledRefreshPending) return;
            scheduledRefreshPending = true;
            scheduleFeedsAppWork(function() {
              const opts = scheduledRefreshOptions || {};
              scheduledRefreshOptions = null;
              scheduledRefreshPending = false;
              refreshAllFeedsApp(opts);
            }, timeout || 2200);
          }

          function feedsAppRefreshShouldYield(options) {
            const opts = options || {};
            const detail = opts.detail || {};
            const action = String(detail.action || opts.action || "").toLowerCase();
            if (action === "create" || action === "delete" || action === "edit" || detail.deleted) return false;
            const source = String(opts.source || detail.source || "").toLowerCase();
            return source === "feeds-app-init" || source === "customer-home-boot" || source === "feeds-app-event" || source === "emySyncContentSurfaces".toLowerCase();
          }

          function feedsAppStartupRefreshCanSyncOnly(options) {
            const source = String((options && (options.source || options.detail && options.detail.source)) || "").toLowerCase();
            if (source !== "feeds-app-init" && source !== "customer-home-boot") return false;
            const feedList = typeof currentAnnexedFeedList === "function" ? currentAnnexedFeedList() : document.querySelector("[data-annexed-feed-list]");
            return !!(feedList && feedListRenderableCount(feedList) > 0);
          }

          function requestRefreshAllFeedsApp(options) {
            if (feedsAppStartupRefreshCanSyncOnly(options)) {
              if (typeof syncAnnexedFeedLoadMoreFromDom === "function") syncAnnexedFeedLoadMoreFromDom();
              if (typeof syncHomeSectionGuides === "function") syncHomeSectionGuides();
              return;
            }
            if (feedsAppRefreshShouldYield(options)) {
              const source = String((options && (options.source || options.detail && options.detail.source)) || "").toLowerCase();
              const startupRefresh = source === "customer-home-boot" || source === "feeds-app-init";
              scheduleRefreshAllFeedsApp(options || {}, startupRefresh ? 6200 : 2200);
              return;
            }
            refreshAllFeedsApp(options || {});
          }

          renderAnnexedFeeds = renderFeedsApp;
          window.emyRenderAnnexedFeeds = renderFeedsApp;

          window.refreshHomeFeedSurfacesFromStorage = function emyFeedsAppRefreshHomeFeedSurfacesFromStorage(options) {
            try {
              if (typeof window.emyContentSyncClearCaches === "function") window.emyContentSyncClearCaches();
            } catch (error) {}
            requestRefreshAllFeedsApp(options || {});
          };
          window.emyRefreshAllContentSurfaces = window.refreshHomeFeedSurfacesFromStorage;

          window.emySyncContentSurfaces = function emyFeedsAppSyncContentSurfaces(detail) {
            requestRefreshAllFeedsApp({ detail: detail || {}, source: "emySyncContentSurfaces" });
            window.emyContentSyncLastRefreshAt = Date.now();
          };

          window.emyFeedsApp = {
            render: renderFeedsApp,
            renderHomePosted: renderHomePostedApp,
            refreshAll: requestRefreshAllFeedsApp,
            loadItems: loadMergedFeedItems,
            getFilter: function() { return "all"; },
            setFilter: function() {
              annexedFeedFilter = "all";
              renderFeedsApp();
            }
          };

          function bindFeedsAppSync() {
            const refresh = function() {
              if (document.hidden) return;
              requestRefreshAllFeedsApp({ source: "feeds-app-event", detail: { action: "refresh" } });
            };
            const refreshLocation = function() {
              if (document.hidden) return;
              requestRefreshAllFeedsApp({ source: "location-change", action: "location-change", force: true, detail: { action: "location-change", source: "location-change" } });
            };
            const refreshOnActivation = function() {
              if (document.hidden) return;
              if (window.emyMarkHomeActivation) window.emyMarkHomeActivation();
              const syncVisibleState = function() {
                const feedList = typeof currentAnnexedFeedList === "function" ? currentAnnexedFeedList() : document.querySelector("[data-annexed-feed-list]");
                if (typeof syncAnnexedFeedState === "function") syncAnnexedFeedState();
                if (typeof ensureAnnexedActionIcons === "function" && feedList) ensureAnnexedActionIcons(feedList);
                if (typeof syncAnnexedFeedLoadMoreFromDom === "function") syncAnnexedFeedLoadMoreFromDom();
                if (typeof syncHomeCarouselSections === "function") syncHomeCarouselSections();
                if (typeof syncHomeSectionGuides === "function") syncHomeSectionGuides();
              };
              if (window.emyScheduleHomeActivationTask) window.emyScheduleHomeActivationTask("feeds-app-activation-state", syncVisibleState, 1200, 800);
              else scheduleFeedsAppWork(syncVisibleState, 1400);
            };
            ["emy:created-posts-changed", "emy:created-jobs-changed", "emy:created-events-changed", "emy:feed-reposts-changed", "emy:feed-source-edited", "emy:business-content-changed"].forEach(function(eventName) {
              window.addEventListener(eventName, refresh);
            });
            window.addEventListener("emy:location-changed", refreshLocation);
            window.addEventListener("pageshow", refreshOnActivation);
            window.addEventListener("focus", refreshOnActivation);
            document.addEventListener("visibilitychange", refreshOnActivation);
            window.addEventListener("storage", function(event) {
              const key = event && event.key;
              if (!key) return;
              if (key === "emyAskLocation") {
                refreshLocation();
                return;
              }
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
          if (typeof syncAnnexedFeedLoadMoreFromDom === "function") syncAnnexedFeedLoadMoreFromDom();
          bindFeedsAppSync();
          requestRefreshAllFeedsApp({ source: "feeds-app-init", detail: { action: "refresh" } });
        }
`;

/* EMY Customer Home — single router authority (hash + ?tab= + early paint) */
const emyCustomerRouterScript = String.raw`
    <script data-emy-customer-router>
      (function setupEmyCustomerRouter() {
        if (window.EmyCustomerRouter) return;
        var VIEWS = ["home", "nearby", "feeds", "reels", "uploads"];
        function clean(value) {
          return String(value || "").replace(/^#/, "").trim().toLowerCase();
        }
        function tabFromQuery() {
          try {
            var tab = clean(new URLSearchParams(location.search || "").get("tab") || "");
            return VIEWS.indexOf(tab) >= 0 ? tab : "";
          } catch (error) {
            return "";
          }
        }
        function hashRoute() {
          return clean(location.hash || "");
        }
        function bodyView() {
          try {
            var body = document.body;
            var view = clean(body && body.dataset ? body.dataset.currentView || "" : "");
            return VIEWS.indexOf(view) >= 0 ? view : "";
          } catch (error) {
            return "";
          }
        }
        function parseView(options) {
          var opts = options || {};
          var hash = hashRoute();
          if (hash === "profile") return { profile: true, view: "home" };
          if (VIEWS.indexOf(hash) >= 0) return { view: hash };
          var tab = tabFromQuery();
          if (tab) return { view: tab };
          var live = bodyView();
          if (live) return { view: live };
          if (opts.allowEarlyFallback) {
            var early = clean(window.__emyHomeRouteEarlyView || "");
            if (VIEWS.indexOf(early) >= 0) return { view: early };
          }
          return { view: "home" };
        }
        function routeMatchesView(view) {
          var nextView = VIEWS.indexOf(view) >= 0 ? view : "home";
          var hash = hashRoute();
          var tab = tabFromQuery();
          if (nextView === "home") return !hash && !tab;
          return hash === nextView && tab === nextView;
        }
        function writeUrl(view, replace) {
          var nextView = VIEWS.indexOf(view) >= 0 ? view : "home";
          try {
            var url = new URL(location.href);
            if (nextView === "home") {
              url.hash = "";
              url.searchParams.delete("tab");
            } else {
              url.hash = "#" + encodeURIComponent(nextView);
              url.searchParams.set("tab", nextView);
            }
            var next = url.pathname + url.search + url.hash;
            if (replace && history.replaceState) history.replaceState(null, "", next);
            else if (history.pushState) history.pushState(null, "", next);
            else location.hash = nextView === "home" ? "" : "#" + nextView;
          } catch (error) {
            try {
              var params = new URLSearchParams(String(location.search || "").replace(/^\?/, ""));
              if (nextView === "home") {
                params.delete("tab");
                var homeQuery = params.toString();
                var homeUrl = location.pathname + (homeQuery ? "?" + homeQuery : "");
                if (replace && history.replaceState) history.replaceState(null, "", homeUrl);
                else location.href = homeUrl;
              } else {
                params.set("tab", nextView);
                var tabQuery = params.toString();
                var tabUrl = location.pathname + "?" + tabQuery + "#" + encodeURIComponent(nextView);
                if (replace && history.replaceState) history.replaceState(null, "", tabUrl);
                else location.hash = "#" + nextView;
              }
            } catch (fallbackError) {
              if (nextView === "home") location.hash = "";
              else location.hash = "#" + nextView;
            }
          }
          window.__emyHomeRouteEarlyView = nextView;
          return nextView;
        }
        function urlForView(view, extraQuery) {
          var nextView = VIEWS.indexOf(view) >= 0 ? view : "home";
          try {
            var params = new URLSearchParams(String(extraQuery || "").replace(/^\?/, ""));
            if (nextView === "home") {
              params.delete("tab");
              var query = params.toString();
              return "emy-customer-home.html" + (query ? "?" + query : "");
            }
            params.set("tab", nextView);
            var nextQuery = params.toString();
            return "emy-customer-home.html?" + nextQuery + "#" + encodeURIComponent(nextView);
          } catch (error) {
            return nextView === "home" ? "emy-customer-home.html" : "emy-customer-home.html?tab=" + nextView + "#" + nextView;
          }
        }
        function applyEarlyPaint(view) {
          var nextView = VIEWS.indexOf(view) >= 0 ? view : "home";
          var body = document.body;
          if (!body) return nextView;
          body.dataset.currentView = nextView;
          document.querySelectorAll("[data-view-block]").forEach(function (el) {
            var views = (el.dataset.views || "").split(/\s+/);
            el.hidden = views.indexOf(nextView) < 0;
          });
          document.querySelectorAll("[data-nav]").forEach(function (btn) {
            var nav = btn.dataset.nav || "";
            if (VIEWS.indexOf(nav) >= 0) btn.classList.toggle("is-active", nav === nextView);
          });
          window.__emyHomeRouteEarlyView = nextView;
          return nextView;
        }
        window.EmyCustomerRouter = {
          views: VIEWS,
          parse: parseView,
          writeUrl: writeUrl,
          applyEarlyPaint: applyEarlyPaint,
          routeMatchesView: routeMatchesView,
          urlForView: urlForView,
          syncUrlToView: function syncUrlToView(view, replace) {
            return writeUrl(view, replace !== false);
          },
          current: function currentView() {
            var live = bodyView();
            if (live) return live;
            return parseView().view || "home";
          }
        };
        var boot = parseView();
        if (!boot.profile) {
          var bootView = boot.view || "home";
          applyEarlyPaint(bootView);
          if (!routeMatchesView(bootView)) writeUrl(bootView, true);
        }
        if (window.__emyHomeMarkReady) window.__emyHomeMarkReady();
        else if (document.body) {
          document.documentElement.classList.add("emy-home-shell-ready", "emy-page-shell-ready");
          document.body.removeAttribute("aria-busy");
        }
      })();
    </script>`;

const emyCustomerHomeBootScript = String.raw`
        function emyCustomerHomeBoot() {
          if (window.__EMY_CUSTOMER_HOME_BOOTED__) return;
          window.__EMY_CUSTOMER_HOME_BOOTED__ = true;
          var stepIndex = 0;
          var usingFeedsApp = false;
          function markHomeBootDataReady() {
            var finished = false;
            var finish = function () {
              if (finished) return;
              finished = true;
              if (window.__emyHomeMarkDataReady) window.__emyHomeMarkDataReady();
              else if (document.documentElement) document.documentElement.classList.add("emy-home-real-ready", "emy-page-real-ready", "emy-home-data-ready");
            };
            try {
              if (typeof homeSharedContentFallbackPulled !== "undefined" && homeSharedContentFallbackPulled === false && typeof pullHomeSharedContentFallback === "function") {
                window.setTimeout(finish, 1400);
                Promise.resolve(pullHomeSharedContentFallback("boot-ready")).then(finish).catch(finish);
                return;
              }
            } catch (error) {}
            finish();
          }
          var steps = [
            function () {
              if (typeof purgeDeletedFeedItemsFromAllStorage === "function") purgeDeletedFeedItemsFromAllStorage();
            },
            function () {
              if (typeof emyFeedsAppInstallAndInit === "function") emyFeedsAppInstallAndInit();
              usingFeedsApp = !!(window.emyFeedsApp && typeof window.emyFeedsApp.refreshAll === "function");
            },
            function () {
              if (typeof ensureCustomerHomeContentSyncRegistered === "function") ensureCustomerHomeContentSyncRegistered();
            },
            function () {
              if (typeof applyInitialHomeRoute === "function") applyInitialHomeRoute();
            },
            function () {
              if (usingFeedsApp) window.emyFeedsApp.refreshAll({ source: "customer-home-boot", detail: { action: "refresh" } });
              else if (typeof setupHomeStaticFeedSections === "function") setupHomeStaticFeedSections();
            },
            function () {
              if (!usingFeedsApp && typeof renderHomeCreatedSections === "function") renderHomeCreatedSections();
            },
            function () {
              if (!usingFeedsApp && typeof renderHomePostedJobs === "function") renderHomePostedJobs();
            },
            function () {
              if (!usingFeedsApp && typeof window.emyHydrateRealHomeContent === "function") window.emyHydrateRealHomeContent();
            },
            function () {
              if (!usingFeedsApp && typeof renderAnnexedFeeds === "function") renderAnnexedFeeds();
            },
            function () {
              if (typeof syncHomeCarouselSections === "function") syncHomeCarouselSections();
            },
            function () {
              const router = window.EmyCustomerRouter;
              const liveView = document.body && document.body.dataset ? document.body.dataset.currentView : "";
              if (router && liveView && typeof router.syncUrlToView === "function" && typeof router.routeMatchesView === "function" && !router.routeMatchesView(liveView)) {
                router.syncUrlToView(liveView, true);
              }
            }
          ];
          function scheduleNextStep() {
            if (stepIndex >= steps.length) {
              markHomeBootDataReady();
              return;
            }
            var run = function () {
              var step = steps[stepIndex++];
              try { if (typeof step === "function") step(); } catch (error) {}
              scheduleNextStep();
            };
            if (typeof scheduleHomeIdleWork === "function") scheduleHomeIdleWork(run, 90);
            else window.setTimeout(run, 80);
          }
          scheduleNextStep();
        }
        window.emyCustomerHomeBoot = emyCustomerHomeBoot;
`;

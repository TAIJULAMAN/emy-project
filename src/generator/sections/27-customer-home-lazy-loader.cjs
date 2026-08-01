/* EMY customer home — lazy-load heavy feeds/clips scripts on demand */
const customerHomeLazyLoaderScript = String.raw`
    <script data-emy-home-lazy-loader>
      (function () {
        if (window.__emyHomeLazyLoader) return;
        window.__emyHomeLazyLoader = true;
        window.__emyHomeLazyLoaded = window.__emyHomeLazyLoaded || {};
        var FEEDS_URLS = [
          "assets/emy-customer-home-media.js?v=863cae0e8112",
          "assets/emy-customer-home-feeds-app.js",
          "assets/emy-customer-home-feed-create.js?v=post-click-submit-280001",
          "assets/emy-customer-home-item-detail.js?v=d83ec68f8f32"
        ];
        function loadScript(url) {
          return new Promise(function (resolve, reject) {
            if (document.querySelector('script[data-emy-lazy-src="' + url + '"]')) {
              resolve();
              return;
            }
            var s = document.createElement("script");
            s.src = url;
            s.defer = true;
            s.setAttribute("data-emy-lazy-src", url);
            s.onload = function () { resolve(); };
            s.onerror = function () { reject(new Error("Failed to load " + url)); };
            document.body.appendChild(s);
          });
        }
        window.emyLoadHomeLazyGroup = function (group) {
          group = String(group || "feeds");
          if (window.__emyHomeLazyLoaded[group]) return window.__emyHomeLazyLoaded[group];
          var urls = group === "feeds" ? FEEDS_URLS : FEEDS_URLS;
          window.__emyHomeLazyLoaded[group] = Promise.all(urls.map(loadScript)).then(function () {
            try {
              window.dispatchEvent(new CustomEvent("emy:home-lazy-" + group + "-ready"));
            } catch (error) {}
            return group;
          });
          return window.__emyHomeLazyLoaded[group];
        };
        window.emyEnsureHomeFeedsReady = function () {
          return window.emyLoadHomeLazyGroup("feeds");
        };
      })();
    </script>`;

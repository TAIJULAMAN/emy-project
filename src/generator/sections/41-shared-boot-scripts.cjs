/* EMY generator section: 41-shared-boot-scripts.cjs (source lines 104108-108399) */
const sharedPageBootGateStyle = String.raw`
    <style data-emy-page-boot-gate>
      .emy-page-boot-loader {
        position: fixed;
        inset: 0;
        z-index: 9998;
        display: grid;
        place-items: start center;
        padding: clamp(16px, 3vw, 32px);
        background: linear-gradient(180deg, #fff8ef 0%, #fffdf8 50%, #fff8ef 100%);
        opacity: 1;
        visibility: visible;
        pointer-events: none;
        transition: opacity .18s ease;
      }
      html.emy-page-real-ready .emy-page-boot-loader,
      html.emy-page-real-timeout .emy-page-boot-loader {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
      .emy-page-boot-layout {
        width: min(100%, 1180px);
        display: grid;
        grid-template-columns: minmax(220px, .72fr) minmax(320px, 1.28fr);
        gap: clamp(18px, 3vw, 36px);
        align-items: start;
      }
      .emy-page-boot-column,
      .emy-page-boot-main,
      .emy-page-boot-card,
      .emy-page-boot-list {
        display: grid;
        gap: 14px;
      }
      .emy-page-boot-nav,
      .emy-page-boot-card,
      .emy-page-boot-list,
      .emy-page-boot-hero {
        border: 1px solid rgba(0,27,71,.08);
        background: rgba(255,255,255,.78);
        box-shadow: 0 18px 48px rgba(0,27,71,.08);
      }
      .emy-page-boot-nav {
        min-height: 58px;
        border-radius: 18px;
        padding: 14px;
        display: grid;
        grid-template-columns: 48px 1fr 112px;
        gap: 12px;
        align-items: center;
      }
      .emy-page-boot-hero {
        min-height: 260px;
        border-radius: 20px;
        padding: clamp(22px, 4vw, 40px);
        display: grid;
        align-content: center;
        gap: 18px;
      }
      .emy-page-boot-card {
        min-height: 138px;
        border-radius: 18px;
        padding: 18px;
      }
      .emy-page-boot-list {
        min-height: 280px;
        border-radius: 18px;
        padding: 18px;
      }
      .emy-page-boot-row {
        display: grid;
        grid-template-columns: 42px 1fr;
        gap: 12px;
        align-items: center;
      }
      .emy-page-boot-actions {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        align-items: center;
      }
      .emy-page-boot-line,
      .emy-page-boot-avatar,
      .emy-page-boot-pill,
      .emy-page-boot-media {
        display: block;
        background: linear-gradient(90deg, rgba(0,27,71,.07) 0%, rgba(255,255,255,.9) 48%, rgba(0,27,71,.07) 100%);
        background-size: 240% 100%;
        animation: emyPageBootShimmer 1.2s ease-in-out infinite;
      }
      .emy-page-boot-line { height: 12px; border-radius: 999px; }
      .emy-page-boot-line.short { width: 36%; }
      .emy-page-boot-line.medium { width: 60%; }
      .emy-page-boot-line.long { width: 88%; }
      .emy-page-boot-avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
      }
      .emy-page-boot-pill {
        height: 32px;
        border-radius: 999px;
      }
      .emy-page-boot-media {
        min-height: 156px;
        border-radius: 16px;
      }
      @keyframes emyPageBootShimmer {
        0% { background-position: 120% 0; }
        100% { background-position: -120% 0; }
      }
      @media (max-width: 760px) {
        .emy-page-boot-loader { padding: 14px; }
        .emy-page-boot-layout { grid-template-columns: 1fr; max-width: 430px; }
        .emy-page-boot-column { display: none; }
        .emy-page-boot-nav { grid-template-columns: 42px 1fr 88px; }
        .emy-page-boot-hero { min-height: 220px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .emy-page-boot-line,
        .emy-page-boot-avatar,
        .emy-page-boot-pill,
        .emy-page-boot-media { animation: none; }
      }
    </style>`;

const sharedPageBootGateScript = String.raw`
    <script data-emy-page-boot-gate>
      (() => {
        if (window.__emyPageBootGateInstalled) return;
        window.__emyPageBootGateInstalled = true;
        const root = document.documentElement;
        const hasHomeGate = () => !!document.querySelector("[data-emy-home-boot-loader]");
        function afterPaint(callback) {
          if (window.requestAnimationFrame) window.requestAnimationFrame(() => window.requestAnimationFrame(callback));
          else window.setTimeout(callback, 0);
        }
        function markReady() {
          if (hasHomeGate()) return;
          root.classList.add("emy-page-real-ready");
          if (document.body && document.body.getAttribute("data-emy-page-boot-busy") === "true") {
            document.body.removeAttribute("aria-busy");
            document.body.removeAttribute("data-emy-page-boot-busy");
          }
        }
        function setBusy() {
          if (hasHomeGate() || !document.body || root.classList.contains("emy-page-real-ready")) return;
          document.body.setAttribute("aria-busy", "true");
          document.body.setAttribute("data-emy-page-boot-busy", "true");
        }
        function scheduleReady(delay) {
          let done = false;
          const run = () => {
            if (done) return;
            done = true;
            markReady();
          };
          window.setTimeout(() => afterPaint(run), delay);
          window.setTimeout(run, delay + 700);
        }
        window.__emyPageMarkReady = markReady;
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => { setBusy(); scheduleReady(180); }, { once: true });
        } else {
          setBusy();
          scheduleReady(180);
        }
        window.addEventListener("load", () => scheduleReady(120), { once: true });
        window.setTimeout(() => {
          if (root.classList.contains("emy-page-real-ready") || hasHomeGate()) return;
          root.classList.add("emy-page-real-timeout");
          markReady();
        }, 5500);
      })();
    </script>`;

const sharedPageBootLoaderMarkup = String.raw`
    <!-- emy-page-boot-loader:start -->
    <div class="emy-page-boot-loader" data-emy-page-boot-loader aria-hidden="true">
      <div class="emy-page-boot-layout">
        <aside class="emy-page-boot-column">
          <div class="emy-page-boot-card">
            <span class="emy-page-boot-line medium"></span>
            <div class="emy-page-boot-row"><span class="emy-page-boot-avatar"></span><span class="emy-page-boot-line long"></span></div>
            <div class="emy-page-boot-row"><span class="emy-page-boot-avatar"></span><span class="emy-page-boot-line medium"></span></div>
            <div class="emy-page-boot-row"><span class="emy-page-boot-avatar"></span><span class="emy-page-boot-line long"></span></div>
          </div>
          <div class="emy-page-boot-card">
            <span class="emy-page-boot-line short"></span>
            <span class="emy-page-boot-line long"></span>
            <span class="emy-page-boot-line medium"></span>
          </div>
        </aside>
        <section class="emy-page-boot-main">
          <div class="emy-page-boot-nav">
            <span class="emy-page-boot-avatar"></span>
            <span class="emy-page-boot-line medium"></span>
            <div class="emy-page-boot-actions"><span class="emy-page-boot-pill"></span><span class="emy-page-boot-pill"></span><span class="emy-page-boot-pill"></span></div>
          </div>
          <div class="emy-page-boot-hero">
            <span class="emy-page-boot-line short"></span>
            <span class="emy-page-boot-line long"></span>
            <span class="emy-page-boot-line medium"></span>
          </div>
          <div class="emy-page-boot-list">
            <span class="emy-page-boot-media"></span>
            <div class="emy-page-boot-row"><span class="emy-page-boot-avatar"></span><span class="emy-page-boot-line long"></span></div>
            <span class="emy-page-boot-line medium"></span>
          </div>
        </section>
      </div>
    </div>
    <!-- emy-page-boot-loader:end -->`;

const sharedCustomerShellSessionScript = String.raw`
    <script data-emy-customer-shell-session>
      (() => {
        if (window.__emyCustomerShellSessionSynced) return;
        window.__emyCustomerShellSessionSynced = true;
        const page = String(location.pathname || "").split("/").pop().toLowerCase();
        if (!/^(emy-customer-home|emy-customer-search|emy-customer-feeds|emy-customer-profile|emy-customer-chat)\.html$/.test(page)) return;
        function clean(value) {
          return String(value || "").replace(/\s+/g, " ").trim();
        }
        function genericLocalCustomerSeed(value) {
          const key = clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
          return !!key && ["customer", "emy-customer", "emy-test-customer", "test-customer", "local-test-user", "user", "guest"].includes(key);
        }
        function seedLocalDevCustomerSession() {
          try {
            if (!localStorage.getItem("emyMainSignedInRole")) localStorage.setItem("emyMainSignedInRole", "customer");
            if (!localStorage.getItem("emyMainSignedInEmail")) localStorage.setItem("emyMainSignedInEmail", "dev@local.test");
            const storedFirst = clean(localStorage.getItem("emyMainPendingSignupFirstName"));
            const storedLast = clean(localStorage.getItem("emyMainPendingSignupLastName"));
            if (!storedFirst || genericLocalCustomerSeed(storedFirst)) localStorage.setItem("emyMainPendingSignupFirstName", "EMY");
            if (!storedLast || (genericLocalCustomerSeed(storedFirst) && genericLocalCustomerSeed(storedLast))) localStorage.setItem("emyMainPendingSignupLastName", "");
            localStorage.removeItem("emyMainSignedOut");
          } catch (error) {}
        }
        function isLocalPreviewEnvironment() {
          if (location.protocol === "file:") return true;
          if (/^(127\.0\.0\.1|localhost|::1)$/.test(location.hostname)) return true;
          if (localStorage.getItem("emyTestModeEnabled") === "true") return true;
          if (localStorage.getItem("emyLocalDevAccess") === "1") return true;
          return false;
        }
        const params = new URLSearchParams(location.search || "");
        const devAccessParam = params.get("devAccess") || params.get("dev");
        if (devAccessParam === "1") {
          try { localStorage.setItem("emyLocalDevAccess", "1"); } catch (error) {}
        }
        if (devAccessParam === "0" || params.get("realAuth") === "1") {
          try { localStorage.removeItem("emyLocalDevAccess"); } catch (error) {}
        }
        if (isLocalPreviewEnvironment()) {
          seedLocalDevCustomerSession();
          document.documentElement.setAttribute("data-emy-real-auth-check", "ready");
          document.documentElement.setAttribute("data-emy-local-dev-access", "true");
          return;
        }
        const authStyle = document.createElement("style");
        authStyle.setAttribute("data-emy-real-auth-gate-style", "");
        authStyle.textContent = [
          "html[data-emy-real-auth-check='pending'] body{visibility:hidden!important;}",
          "html[data-emy-real-auth-check='pending']::before{content:'Checking your real EMY account...';position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;background:#fff8ef;color:#001b47;font:800 15px Inter,system-ui,sans-serif;}"
        ].join("");
        document.head.appendChild(authStyle);
        document.documentElement.setAttribute("data-emy-real-auth-check", "pending");
        function returnTo() {
          return page + String(location.search || "") + String(location.hash || "");
        }
        function signInUrl(reason) {
          return "emy-signin.html?role=customer&returnTo=" + encodeURIComponent(returnTo()) + (reason ? "&reason=" + encodeURIComponent(reason) : "");
        }
        function clearFakeCustomerSession() {
          [
            "emyMainSignedInRole",
            "emyMainSignedInEmail",
            "emyAskCurrentUser",
            "emyCustomerDisplayName",
            "emyCustomerFirstName",
            "emyCustomerLastName",
            "emyCustomerEmail",
            "emyCustomerProfilePhoto",
            "emyCustomerProfilePhotoSrc",
            "emyCustomerProfilePhotoRef"
          ].forEach((key) => {
            try { localStorage.removeItem(key); } catch (error) {}
          });
          try { localStorage.setItem("emyMainSignedOut", "1"); } catch (error) {}
        }
        function redirectToRealSignIn(reason) {
          clearFakeCustomerSession();
          location.replace(signInUrl(reason || "auth-required"));
        }
        function waitForFirebaseUser(timeoutMs) {
          return new Promise((resolve) => {
            const started = Date.now();
            function finish(user) {
              resolve(user || null);
            }
            function trySubscribe() {
              try {
                if (!window.firebase || !firebase.auth) {
                  if (Date.now() - started > timeoutMs) return finish(null);
                  window.setTimeout(trySubscribe, 80);
                  return;
                }
                const auth = firebase.auth();
                const unsubscribe = auth.onAuthStateChanged((user) => {
                  try { unsubscribe(); } catch (error) {}
                  finish(user);
                }, () => finish(null));
                window.setTimeout(() => {
                  try { unsubscribe(); } catch (error) {}
                  finish(auth.currentUser || null);
                }, timeoutMs);
              } catch (error) {
                finish(null);
              }
            }
            trySubscribe();
          });
        }
        try {
          Promise.resolve()
            .then(() => window.emyRealAuth && window.emyRealAuth.ready ? window.emyRealAuth.ready().catch(() => null) : null)
            .then(() => waitForFirebaseUser(7000))
            .then((user) => {
              if (!user) {
                redirectToRealSignIn("not-signed-in");
                return null;
              }
              if (!user.emailVerified && !/emy-confirmation\.html$/i.test(page)) {
                location.replace("emy-confirmation.html?role=customer&returnTo=" + encodeURIComponent(returnTo()));
                return null;
              }
              return window.emyRealAuth && window.emyRealAuth.currentSession ? window.emyRealAuth.currentSession().catch(() => null) : null;
            })
            .then((session) => {
              if (session) {
                try {
                  localStorage.setItem("emyMainSignedInRole", "customer");
                  if (session.email) localStorage.setItem("emyMainSignedInEmail", session.email);
                  localStorage.removeItem("emyMainSignedOut");
                } catch (error) {}
              }
              document.documentElement.setAttribute("data-emy-real-auth-check", "ready");
            })
            .catch(() => redirectToRealSignIn("auth-error"));
        } catch (error) {}
      })();
    </script>`;

const sharedEmyTestModeScript = String.raw`
    <script data-emy-test-mode>
      (() => {
        if (window.__emyTestModeInstalled) return;
        window.__emyTestModeInstalled = true;
        const isLocalPreview = location.protocol === "file:" || /^(127\.0\.0\.1|localhost|::1)$/.test(location.hostname);
        const testModeOptIn = localStorage.getItem("emyTestModeEnabled") === "true" || localStorage.getItem("emyLocalDevAccess") === "1";
        try {
          const params = new URLSearchParams(location.search || "");
          if (params.get("testMode") === "1") localStorage.setItem("emyTestModeEnabled", "true");
        } catch (error) {}
        const isIsolatedTestLane = isLocalPreview && testModeOptIn;
        if (!isIsolatedTestLane) return;
        const dbNames = ["emy-feed-media-db"];
        function clean(value) {
          return String(value || "").replace(/\s+/g, " ").trim();
        }
        function genericTestCustomerName(value) {
          const key = clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
          return !!key && ["customer", "emy-customer", "emy-test-customer", "test-customer", "local-test-user", "user", "guest"].includes(key);
        }
        function writeJson(key, value) {
          try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {}
        }
        function seedTestCustomer() {
          const storedName = clean(localStorage.getItem("emyCustomerDisplayName"));
          const name = storedName && !genericTestCustomerName(storedName) ? storedName : "EMY";
          const email = clean(localStorage.getItem("emyCustomerEmail")) || "test.customer@emy.local";
          try {
            localStorage.setItem("emyTestModeEnabled", "true");
            localStorage.setItem("emyMainSignedInRole", "customer");
            localStorage.setItem("emyMainPendingSignupRole", "customer");
            localStorage.setItem("emyMainSignedInEmail", email);
            localStorage.setItem("emyMainPendingSignupEmail", email);
            localStorage.setItem("emyCustomerEmail", email);
            localStorage.setItem("emyCustomerDisplayName", name);
            localStorage.setItem("emyCustomerFirstName", name.split(/\s+/)[0] || "EMY");
            localStorage.setItem("emyCustomerLastName", name.split(/\s+/).slice(1).join(" "));
            localStorage.removeItem("emyMainSignedOut");
            writeJson("emyAskCurrentUser", { role: "customer", name, email, image: "", imageRef: "" });
          } catch (error) {}
        }
        function deleteDatabase(name) {
          return new Promise((resolve) => {
            if (!name || !("indexedDB" in window)) return resolve(false);
            try {
              const request = indexedDB.deleteDatabase(name);
              request.onsuccess = () => resolve(true);
              request.onerror = () => resolve(false);
              request.onblocked = () => resolve(false);
            } catch (error) {
              resolve(false);
            }
          });
        }
        async function deleteEmyDatabases() {
          let names = dbNames.slice();
          try {
            if (indexedDB.databases) {
              const databases = await indexedDB.databases();
              databases.forEach((database) => {
                const name = database && database.name;
                if (name && /^emy/i.test(name) && names.indexOf(name) === -1) names.push(name);
              });
            }
          } catch (error) {}
          const deleted = await Promise.all(names.map(deleteDatabase));
          return deleted.filter(Boolean).length;
        }
        async function resetSharedTestContent() {
          try {
            const response = await fetch("/api/emy-shared-content", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "reset", reset: true, reason: "test-mode-reset" })
            });
            return !!(response && response.ok);
          } catch (error) {
            return false;
          }
        }
        async function cleanBrowserMedia() {
          let cleaned = 0;
          try {
            if (typeof window.emyCleanupBrowserMediaStorage === "function") {
              cleaned += Number(await window.emyCleanupBrowserMediaStorage()) || 0;
            } else if (typeof window.emyTrimLargeInlineMediaStorage === "function") {
              cleaned += Number(await window.emyTrimLargeInlineMediaStorage().catch(() => 0)) || 0;
            }
          } catch (error) {}
          const dbsDeleted = await deleteEmyDatabases();
          if (dbsDeleted) cleaned += dbsDeleted;
          return cleaned;
        }
        function refreshSurfacesAfterClean() {
          try { if (typeof window.emyRefreshRealHomeSurfaces === "function") window.emyRefreshRealHomeSurfaces("test-mode-clean"); } catch (error) {}
          try { if (typeof window.emyRenderAnnexedFeeds === "function") window.emyRenderAnnexedFeeds(); } catch (error) {}
          try { if (typeof window.emyHydrateFeedMedia === "function") window.emyHydrateFeedMedia(document); } catch (error) {}
          try { window.dispatchEvent(new CustomEvent("emy:media-stored", { detail: { reason: "test-mode-clean" } })); } catch (error) {}
        }
        async function resetTestStorage() {
          try {
            window.__emySharedPortContentResetting = true;
            if (typeof window.emyPauseSharedPortContentForReset === "function") window.emyPauseSharedPortContentForReset();
          } catch (error) {}
          try { localStorage.clear(); } catch (error) {}
          try { sessionStorage.clear(); } catch (error) {}
          const deleted = await deleteEmyDatabases();
          await resetSharedTestContent();
          seedTestCustomer();
          return deleted;
        }
        window.emyResetTestStorage = resetTestStorage;
        window.emyDeleteTestMediaDatabases = deleteEmyDatabases;
        if (isIsolatedTestLane) seedTestCustomer();
        function ensurePanel() {
          if (!document.body || document.querySelector("[data-emy-test-mode-panel]")) return;
          const style = document.createElement("style");
          style.setAttribute("data-emy-test-mode-style", "");
          style.textContent = [
            ".emy-test-mode-panel{position:fixed;left:16px;bottom:82px;z-index:99999;display:flex;align-items:center;gap:8px;max-width:calc(100vw - 32px);padding:8px 10px;border:1px solid rgba(255,106,0,.35);border-radius:999px;background:rgba(255,255,255,.96);box-shadow:0 14px 34px rgba(0,27,71,.16);font:700 12px/1.1 Inter,Arial,sans-serif;color:#001b47}",
            ".emy-test-mode-panel strong{color:#ff6200;white-space:nowrap}",
            ".emy-test-mode-panel button{height:30px;border:1px solid rgba(0,27,71,.12);border-radius:999px;background:#fff;color:#001b47;font:800 12px Inter,Arial,sans-serif;padding:0 11px;cursor:pointer}",
            ".emy-test-mode-panel button[data-emy-test-reset]{background:#ff6200;border-color:#ff6200;color:#fff}",
            ".emy-test-mode-panel span{max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#66728a;font-weight:800}",
            "@media(max-width:640px){.emy-test-mode-panel{left:10px;right:10px;bottom:76px;border-radius:18px;justify-content:center;flex-wrap:wrap}.emy-test-mode-panel span{width:100%;max-width:none;text-align:center}}"
          ].join("");
          document.head.appendChild(style);
          const panel = document.createElement("div");
          panel.className = "emy-test-mode-panel";
          panel.setAttribute("data-emy-test-mode-panel", "");
          panel.innerHTML = '<strong>Test mode</strong><button type="button" data-emy-test-clean>Clean media</button><button type="button" data-emy-test-reset>Reset</button><span data-emy-test-status>Port ' + (location.port || "local") + '</span>';
          document.body.appendChild(panel);
          const status = panel.querySelector("[data-emy-test-status]");
          panel.addEventListener("click", async (event) => {
            const cleanButton = event.target.closest("[data-emy-test-clean]");
            const resetButton = event.target.closest("[data-emy-test-reset]");
            if (!cleanButton && !resetButton) return;
            if (cleanButton) {
              if (status) status.textContent = "Cleaning...";
              let cleaned = 0;
              try { cleaned = await cleanBrowserMedia(); } catch (error) {}
              refreshSurfacesAfterClean();
              if (status) {
                status.textContent = cleaned > 0
                  ? ("Cleaned " + cleaned + " · feeds refreshed")
                  : "Media DB cleared · feeds refreshed";
              }
              return;
            }
            if (resetButton) {
              const confirmed = window.confirm("Reset the EMY test account on port " + (location.port || "local") + "?");
              if (!confirmed) return;
              if (status) status.textContent = "Resetting...";
              await resetTestStorage();
              location.reload();
            }
          });
        }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ensurePanel, { once: true });
        else ensurePanel();
      })();
    </script>`;

const sharedRealDataGuardScript = String.raw`
    <script data-emy-real-data-guard>
      (() => {
        if (window.__emyRealDataGuardInstalled) return;
        window.__emyRealDataGuardInstalled = true;
        const realDataGuardStartedAt = Date.now();
        const realEmptyStateGraceMs = 850;
        let realEmptyStateRetryTimer = 0;
        const EMY_CUSTOMER_CONTENT_PURGE_VERSION = 3;
        const customerContentStorageKeys = [
          "emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents", "emyFeedCreatedProducts", "emyFeedCreatedClips", "emyFeedCreatedArticles", "emyFeedReposts",
          "emyBusinessFeedPosts", "emyBusinessPosts", "emyBusinessArticles", "emyBusinessArticlePosts",
          "emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClipsByBusiness", "emyUploadedClips",
          "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts",
          "emyBusinessEvents", "emyBusinessEventPosts", "emyBusinessJobs", "emyBusinessJobPosts",
          "emyBusinessProfiles", "emyBusinessDirectory", "emyNearbyBusinesses", "emyLocalBusinesses", "emyBusinesses",
          "emyFeedDeletedIds", "emyFeedActionState", "emySavedFeedItems",
          "emyClipViewStats", "emyProductViewStats", "emyPostViewStats", "emyBusinessProfileViewStats", "emyBusinessDirectionStats",
          "emyBusinessLikeState", "emyProductMascotLikeState", "emyClipMascotLikeState",
          "emyJobApplications", "emyCustomerNotifications", "emyCustomerBusinesses", "emyCustomerFollowing",
          "emyCustomerProductVisits", "emyProductVisitHistory",
          "emyPendingEventCoverSrc", "emyPendingEventCoverRef", "emyPendingEventCoverSettings", "emyPendingBusinessEventCoverSrc", "emyPendingBusinessEventCoverRef",
          "emyFeedEventCoverDraft", "emyBusinessProfileDraft", "emyBusinessHiringDraft", "emyBusinessEditTarget",
          "emySharedPortContentFingerprint", "emyPendingItemDetailOpen"
        ];
        const preservedCustomerStorageKeys = new Set([
          "emyContentPurgeVersion",
          "emyMainSignedInRole", "emyMainSignedInEmail", "emyMainSignedOut",
          "emyMainPendingSignupRole", "emyMainPendingSignupEmail", "emyMainPendingSignupFirstName", "emyMainPendingSignupLastName",
          "emyMainPendingSignupPhoto", "emyMainPendingSignupPhotoSrc", "emyMainPendingSignupPhotoRef", "emyMainPendingSignupBusinessName",
          "emyCustomerDisplayName", "emyCustomerFirstName", "emyCustomerLastName", "emyCustomerEmail",
          "emyCustomerProfilePhoto", "emyCustomerProfilePhotoSrc", "emyCustomerProfilePhotoRef",
          "emyCustomerProfilePhotoBackup", "emyCustomerProfilePhotoSrcBackup", "emyCustomerProfilePhotoRefBackup",
          "emyCustomerProfilePhotoCropBackup", "emyCustomerProfilePhotoBackupSavedAt",
          "emyCustomerProfileImage", "emyCustomerProfileImageRef", "emyCustomerAvatar", "emyCustomerAvatarRef",
          "emyCustomerPhoto", "emyCustomerPhotoRef", "emyCustomerProfilePhotoCrop",
          "emyBusinessProfilePhoto", "emyBusinessProfilePhotoSrc", "emyBusinessProfilePhotoRef",
          "emyBusinessProfilePhotoBackup", "emyBusinessProfilePhotoSrcBackup", "emyBusinessProfilePhotoRefBackup",
          "emyBusinessProfilePhotoCrop", "emyBusinessProfilePhotoCropBackup", "emyBusinessProfilePhotoBackupSavedAt",
          "emyCustomerLocationLabel", "emyAskLocation", "emyAskRadius", "emyAskCurrentUser",
          "emyTestModeEnabled", "emyLocalDevAccess", "emyVideoQualityResolution", "emyVideoQualityPreference",
          "emySelectedBusinessProfileKey", "emyNotificationReturnPage"
        ]);
      const customerContentStoragePrefixes = [
        "emyCustomerBusiness:", "emyCustomerFollow:", "emyBusinessNotifications:", "emyBusinessJobApplications:",
        "emyBusinessChatThread:", "emyCustomerChatThread:"
      ];
      const publicBusinessClipStorageKeys = new Set(["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"]);
      function isPublicBusinessClipStorageKey(key) {
        return publicBusinessClipStorageKeys.has(String(key || ""));
      }
      function publicBusinessClipItemIsVisible(item) {
        return !!(item && typeof item === "object" && !item.deleted && !item.deletedAt && !item.removed && !item.hidden && !item.archived);
      }
      function publicBusinessClipStoresHaveRows() {
        try {
          if (typeof window.emyDebugHomeClipPipeline === "function") {
            const state = window.emyDebugHomeClipPipeline() || {};
            if (Number(state.filteredCount || 0) > 0) return true;
            if (state.forceEmpty !== true && Number(state.businessCount || 0) > 0) return true;
          }
        } catch (error) {}
        try {
          return Array.from(publicBusinessClipStorageKeys).some((key) => {
            const value = readJson(key, []);
            const list = Array.isArray(value) ? value : (value && typeof value === "object" ? Object.values(value) : []);
            return list.some(publicBusinessClipItemIsVisible);
          });
        } catch (error) {}
        return false;
      }
      function purgeAllCustomerContent() {
        try {
          window.__emySharedPortContentResetting = true;
          if (typeof window.emyPauseSharedPortContentForReset === "function") window.emyPauseSharedPortContentForReset();
        } catch (error) {}
        customerContentStorageKeys.forEach((key) => {
          if (isPublicBusinessClipStorageKey(key)) return;
          try { localStorage.removeItem(key); } catch (error) {}
        });
        try {
          for (let index = localStorage.length - 1; index >= 0; index -= 1) {
            const key = localStorage.key(index);
            if (!key || preservedCustomerStorageKeys.has(key) || isPublicBusinessClipStorageKey(key)) continue;
            if (customerContentStoragePrefixes.some((prefix) => key.indexOf(prefix) === 0)) {
              localStorage.removeItem(key);
              continue;
            }
              if (/^emy(Feed|Business|Saved|Clip|Product|Post|Job|Event|Admin|Pending)/.test(key) && !preservedCustomerStorageKeys.has(key)) {
                localStorage.removeItem(key);
              }
            }
          } catch (error) {}
          try {
            sessionStorage.removeItem("emyPendingItemDetailOpen");
            sessionStorage.removeItem("emyFeedDraft");
          } catch (error) {}
        }
        function deleteEmyContentDatabase(name) {
          return new Promise((resolve) => {
            if (!name || !("indexedDB" in window)) return resolve(false);
            try {
              const request = indexedDB.deleteDatabase(name);
              request.onsuccess = () => resolve(true);
              request.onerror = () => resolve(false);
              request.onblocked = () => resolve(false);
            } catch (error) {
              resolve(false);
            }
          });
        }
        async function deleteAllEmyMediaDatabases() {
          // Profile photos can be stored by reference in the shared media database.
          // Keep the database intact; normal media cleanup removes unreferenced rows later.
          return false;
        }
        async function resetSharedPortContentStore() {
          try {
            const response = await fetch("/api/emy-shared-content", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "reset", reset: true, reason: "customer-content-purge" })
            });
            return !!(response && response.ok);
          } catch (error) {
            return false;
          }
        }
        function bootCustomerContentPurgeIfNeeded() {
          const version = String(EMY_CUSTOMER_CONTENT_PURGE_VERSION);
          let current = "";
          try { current = localStorage.getItem("emyContentPurgeVersion") || ""; } catch (error) {}
          if (current === version) return;
          purgeAllCustomerContent();
          deleteAllEmyMediaDatabases().finally(() => {
            resetSharedPortContentStore().finally(() => {
              try { localStorage.setItem("emyContentPurgeVersion", version); } catch (error) {}
              window.__emySharedPortContentResetting = false;
            });
          });
        }
        window.purgeAllCustomerContent = purgeAllCustomerContent;
        window.resetSharedPortContentStore = resetSharedPortContentStore;
        bootCustomerContentPurgeIfNeeded();
        const jsonCache = new Map();
        const computedCache = new Map();
        let elementTextCache = new WeakMap();
        let realGuardLastInputAt = Date.now();
        function markRealGuardInput() {
          realGuardLastInputAt = Date.now();
        }
        ["pointerdown", "click", "keydown", "wheel", "touchstart"].forEach((eventName) => {
          document.addEventListener(eventName, markRealGuardInput, { capture: true, passive: true });
        });
        function realGuardInteractionActive() {
          return Date.now() - realGuardLastInputAt < 3500;
        }
        let realGuardMutationPausedUntil = 0;
        function pauseRealGuardMutations(delay) {
          realGuardMutationPausedUntil = Math.max(realGuardMutationPausedUntil, Date.now() + (delay || 1200));
        }
        function realGuardMutationPaused() {
          return Date.now() < realGuardMutationPausedUntil;
        }
        function scheduleIdleWork(callback, timeout) {
          if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(callback, { timeout: timeout || 900 });
            return;
          }
          window.setTimeout(callback, 80);
        }
        function realHomePageQuietActive() {
          return !!(
            realGuardInteractionActive() ||
            (window.emyHomeInteractionActive && window.emyHomeInteractionActive()) ||
            (window.emyHomeActivationActive && window.emyHomeActivationActive())
          );
        }
        function realHomePageQuietDelay() {
          if (realGuardInteractionActive()) return 1400;
          return window.emyHomeActivationActive && window.emyHomeActivationActive() ? 650 : 950;
        }
        function shouldHoldRealEmptyState() {
          return Date.now() - realDataGuardStartedAt < realEmptyStateGraceMs;
        }
        function scheduleRealEmptyStateRetry() {
          if (realEmptyStateRetryTimer) return;
          const delay = Math.max(180, realEmptyStateGraceMs - (Date.now() - realDataGuardStartedAt));
          realEmptyStateRetryTimer = window.setTimeout(() => {
            realEmptyStateRetryTimer = 0;
            try {
              clearJsonCache();
              resetDomReadCache();
              hydrateRealRails();
              hydrateRealBusinessDeck();
              syncBusinessDeckEmptyState();
              syncBusinessSwitchButtons(document);
            } catch (error) {}
          }, delay);
        }
        function cachedValue(key, producer) {
          if (computedCache.has(key)) return computedCache.get(key);
          const value = producer();
          computedCache.set(key, value);
          return value;
        }
        function clearJsonCache() {
          jsonCache.clear();
          computedCache.clear();
          elementTextCache = new WeakMap();
        }
        function recentContentSyncRefresh() {
          const lastSync = window.emyContentSync && typeof window.emyContentSync.lastRefreshAt === "number"
            ? window.emyContentSync.lastRefreshAt
            : (window.emyContentSyncLastRefreshAt || 0);
          return !!(lastSync && Date.now() - lastSync < 2000);
        }
        function resetDomReadCache() {
          elementTextCache = new WeakMap();
        }
        const demoKeys = [
          "angi-pizza", "angi-pizza-zone", "ever-glow", "ever-glow-face-wash", "ross-galler", "business-111",
          "packly-supplies", "ridge-hardware", "fresh-basket", "good-nails", "valley-electric", "urban-tailor",
          "quickfix-mobile", "bright-cleaners", "bright-it-support", "bright-it", "seed-business", "seed-product", "seed-customer",
          "this-business", "your-business"
        ];
        const demoPatterns = [
          /angi\s+pizza/i, /ever\s+glow/i, /ross\s+galler/i, /business\s*111/i, /packly\s+supplies/i,
          /ridge\s+hardware/i, /fresh\s+basket/i, /good\s+nails/i, /valley\s+electric/i, /urban\s+tailor/i,
          /quickfix\s+mobile/i, /bright\s+cleaners/i, /bright\s+it\s+support/i, /steel\s+water\s+bottle/i, /travel\s+mug/i,
          /lunch\s+box/i, /desk\s+lamp/i, /phone\s+stand/i, /tote\s+bag/i, /pizza\s+slice/i,
          /family\s+pizza/i, /garlic\s+bread/i, /face\s+wash/i, /glow\s+serum/i, /soft\s+cleanser/i,
          /glow\s+routine/i, /new\s+clip\s+available/i, /lunch\s+deal/i, /order\s+reminder/i,
          /sample\s+customer/i, /demo\s+fallback/i, /plan\s+placeholder/i, /tap\s+the\s+business\s+card\s+above\s+(?:to\s+)?see\s+more/i,
          /^this\s+business$/i, /^your\s+business$/i, /^business\s+profile$/i
        ];
        const storageArrayKeys = [
          "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyBusinessPosts",
          "emyBusinessFeedPosts", "emyBusinessReels", "emyBusinessProductReels", "emyBusinessClips",
          "emyBusinessArticles", "emyBusinessArticlePosts", "emyBusinessEvents", "emyBusinessEventPosts",
          "emyBusinessJobs", "emyBusinessJobPosts", "emyFeedCreatedPosts", "emyFeedCreatedProducts", "emyFeedCreatedClips", "emyFeedCreatedArticles", "emyFeedCreatedJobs", "emyFeedCreatedEvents", "emySavedFeedItems",
          "emyCustomerNotifications", "emyAdminSnapshots", "emyAdminBusinessApprovals"
        ];
        function readJson(key, fallback) {
          try {
            if (jsonCache.has(key)) return jsonCache.get(key);
            const raw = localStorage.getItem(key);
            const value = raw ? JSON.parse(raw) : fallback;
            jsonCache.set(key, value);
            return value;
          } catch (error) {
            return fallback;
          }
        }
        function writeJson(key, value) {
          try {
            jsonCache.set(key, value);
            computedCache.clear();
            localStorage.setItem(key, JSON.stringify(value));
          } catch (error) {}
        }
        function clean(value) {
          return String(value || "").replace(/\s+/g, " ").trim();
        }
        function readEngagementCount(value) {
          const raw = value && value.dataset ? value.dataset.rawCount : "";
          const source = raw !== undefined && raw !== "" ? raw : (value && value.textContent !== undefined ? value.textContent : value);
          const match = String(source || "").replace(/,/g, "").match(/-?\d+(?:\.\d+)?\s*[kKmM]?/);
          if (!match) return 0;
          const token = match[0].replace(/\s+/g, "");
          const multiplier = /m$/i.test(token) ? 1000000 : /k$/i.test(token) ? 1000 : 1;
          const number = Number(token.replace(/[kKmM]$/g, ""));
          return Number.isFinite(number) ? Math.max(0, Math.round(number * multiplier)) : 0;
        }
        function slug(value) {
          return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        }
        function looksInternalProfileName(value) {
          const key = slug(value);
          return !!key && [
            "profile",
            "business",
            "business-profile",
            "customer",
            "customer-profile",
            "user",
            "user-profile",
            "your-business",
            "this-business"
          ].includes(key);
        }
        function currentBusinessName() {
          const profile = readJson("emyBusinessProfileDraft", {});
          return clean((profile && (profile.businessName || profile.name || profile.title)) || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || localStorage.getItem("emyMainPendingSignupBusinessName"));
        }
        function currentBusinessPhoto() {
          const profile = readJson("emyBusinessProfileDraft", {});
          return firstBusinessAvatarImageValue([
            localStorage.getItem("emyBusinessProfilePhoto"),
            localStorage.getItem("emyBusinessProfilePhotoSrc"),
            localStorage.getItem("emyBusinessProfilePhotoBackup"),
            localStorage.getItem("emyBusinessProfilePhotoSrcBackup"),
            localStorage.getItem("emyBusinessProfileImage"),
            localStorage.getItem("emyBusinessProfileImageSrc"),
            localStorage.getItem("emyBusinessPhoto"),
            localStorage.getItem("emyBusinessPhotoSrc"),
            localStorage.getItem("emyBusinessAvatar"),
            localStorage.getItem("emyBusinessAvatarSrc"),
            localStorage.getItem("emyBusinessLogo"),
            localStorage.getItem("emyBusinessLogoSrc"),
            localStorage.getItem("emyMainPendingSignupBusinessPhoto"),
            profile && profile.photoUrl,
            profile && profile.profilePhotoUrl,
            profile && profile.profilePhoto,
            profile && profile.profilePhotoSrc,
            profile && profile.businessProfilePhoto,
            profile && profile.businessProfilePhotoSrc,
            profile && profile.businessPhoto,
            profile && profile.businessPhotoSrc,
            profile && profile.businessAvatar,
            profile && profile.businessAvatarSrc,
            profile && profile.businessLogo,
            profile && profile.businessLogoSrc,
            profile && profile.logo,
            profile && profile.logoSrc,
            profile && profile.photo,
            profile && profile.photoSrc,
            profile && profile.image,
            profile && profile.imageSrc
          ]);
        }
        function currentBusinessPhotoRef() {
          const profile = readJson("emyBusinessProfileDraft", {});
          return firstBusinessAvatarImageValue([
            localStorage.getItem("emyBusinessProfilePhotoRef"),
            localStorage.getItem("emyBusinessProfilePhotoRefBackup"),
            localStorage.getItem("emyBusinessProfileImageRef"),
            localStorage.getItem("emyBusinessPhotoRef"),
            localStorage.getItem("emyBusinessAvatarRef"),
            localStorage.getItem("emyBusinessLogoRef"),
            localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"),
            profile && profile.photoPublicId,
            profile && profile.profilePhotoPublicId,
            profile && profile.profilePhotoRef,
            profile && profile.businessProfilePhotoPublicId,
            profile && profile.businessProfilePhotoRef,
            profile && profile.businessPhotoPublicId,
            profile && profile.businessPhotoRef,
            profile && profile.businessAvatarPublicId,
            profile && profile.businessAvatarRef,
            profile && profile.businessLogoPublicId,
            profile && profile.businessLogoRef,
            profile && profile.logoPublicId,
            profile && profile.logoRef,
            profile && profile.photoRef,
            profile && profile.imagePublicId,
            profile && profile.imageRef
          ]);
        }
        function currentBusinessAvatarMedia() {
          return {
            src: currentBusinessPhoto(),
            ref: currentBusinessPhotoRef()
          };
        }
        function currentCustomerDisplayName() {
          const first = clean(localStorage.getItem("emyCustomerFirstName") || localStorage.getItem("emyMainPendingSignupFirstName"));
          const last = clean(localStorage.getItem("emyCustomerLastName") || localStorage.getItem("emyMainPendingSignupLastName"));
          const email = clean(localStorage.getItem("emyCustomerEmail") || localStorage.getItem("emyMainPendingSignupEmail") || localStorage.getItem("emyMainSignedInEmail"));
          const askUser = readJson("emyAskCurrentUser", {});
          return firstClean([
            localStorage.getItem("emyCustomerDisplayName"),
            [first, last].filter(Boolean).join(" "),
            askUser && String(askUser.role || "").toLowerCase() === "customer" ? askUser.name : "",
            email && email.indexOf("@") > 0 ? email.split("@")[0].replace(/[._-]+/g, " ") : ""
          ]) || "EMY";
        }
        function customerProfilePhotoObjects() {
          const rows = [];
          ["emyAskCurrentUser", "emyCustomerProfile", "emyCustomerProfileDraft", "emyCustomerProfileData", "emyCurrentCustomerProfile", "emyFirebaseCustomerProfile", "emyCustomerAccount", "emyMainSignedInUser", "emyAuthUser", "emyFirebaseUser"].forEach((key) => {
            const value = readJson(key, null);
            if (value && typeof value === "object" && !Array.isArray(value)) rows.push(value);
          });
          rows.slice().forEach((item) => {
            ["profile", "customer", "user", "account", "data"].forEach((key) => {
              const nested = item && item[key];
              if (nested && typeof nested === "object" && !Array.isArray(nested)) rows.push(nested);
            });
          });
          return rows;
        }
        function customerProfilePhotoObjectValues(fields) {
          const values = [];
          customerProfilePhotoObjects().forEach((item) => {
            fields.forEach((field) => values.push(item && item[field]));
          });
          return values;
        }
        function currentCustomerPhoto() {
          const pendingRole = clean(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase();
          return firstAvatarImageValue([
            typeof currentProfilePhoto === "string" ? currentProfilePhoto : "",
            typeof activeProfileRole === "function" && activeProfileRole() === "customer" && typeof readActiveProfilePhoto === "function" ? readActiveProfilePhoto() : "",
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageSrc"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarSrc"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoBackup"),
            localStorage.getItem("emyCustomerProfilePhotoSrcBackup"),
            localStorage.getItem("emyMainSignedInPhoto"),
            localStorage.getItem("emyMainSignedInPhotoUrl"),
            localStorage.getItem("emyFirebasePhotoURL"),
            localStorage.getItem("emyFirebasePhotoUrl"),
            localStorage.getItem("emyFirebaseUserPhoto"),
            localStorage.getItem("emyAuthPhotoURL")
          ].concat(customerProfilePhotoObjectValues(["photoUrl", "photoURL", "photo", "photoSrc", "profilePhoto", "profilePhotoSrc", "profileImage", "profileImageSrc", "avatar", "avatarSrc", "image", "imageSrc"])).concat([
            pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhoto") : "",
            pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoSrc") : ""
          ]));
        }
        function currentCustomerPhotoRef() {
          const pendingRole = clean(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase();
          return firstAvatarImageValue([
            typeof currentProfilePhotoRef === "string" ? currentProfilePhotoRef : "",
            typeof activeProfileRole === "function" && activeProfileRole() === "customer" && typeof readActiveProfilePhotoRef === "function" ? readActiveProfilePhotoRef() : "",
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem("emyCustomerProfilePhotoRefBackup"),
            localStorage.getItem("emyMainSignedInPhotoRef"),
            localStorage.getItem("emyFirebasePhotoRef"),
            localStorage.getItem("emyAuthPhotoRef")
          ].concat(customerProfilePhotoObjectValues(["photoPublicId", "photoRef", "profilePhotoRef", "profileImageRef", "avatarRef", "imageRef", "publicId"])).concat([
            pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : ""
          ]));
        }
        function syncCurrentCustomerPhotoAliases(photo, ref) {
          try {
            const nextPhoto = clean(photo);
            const nextRef = clean(ref);
            if (nextPhoto) ["emyCustomerProfilePhoto", "emyCustomerProfilePhotoSrc", "emyCustomerProfileImage", "emyCustomerProfileImageSrc", "emyCustomerAvatar", "emyCustomerAvatarSrc", "emyCustomerPhoto", "emyCustomerPhotoSrc"].forEach((key) => localStorage.setItem(key, nextPhoto));
            if (nextRef) ["emyCustomerProfilePhotoRef", "emyCustomerProfileImageRef", "emyCustomerAvatarRef", "emyCustomerPhotoRef"].forEach((key) => localStorage.setItem(key, nextRef));
            if (nextPhoto && !/^blob:/i.test(nextPhoto) && !(/^data:image\//i.test(nextPhoto) && nextPhoto.length > 180000)) {
              localStorage.setItem("emyCustomerProfilePhotoBackup", nextPhoto);
              localStorage.setItem("emyCustomerProfilePhotoSrcBackup", nextPhoto);
            }
            if (nextRef) localStorage.setItem("emyCustomerProfilePhotoRefBackup", nextRef);
            if (nextPhoto || nextRef) localStorage.setItem("emyCustomerProfilePhotoBackupSavedAt", new Date().toISOString());
          } catch (error) {}
        }
        function currentCustomerEmail() {
          return firstClean([
            localStorage.getItem("emyCustomerEmail"),
            localStorage.getItem("emyMainSignedInEmail"),
            localStorage.getItem("emyMainPendingSignupEmail")
          ]);
        }
        function currentCustomerPhone() {
          return firstClean([
            localStorage.getItem("emyCustomerPhone"),
            localStorage.getItem("emyMainPendingSignupPhone")
          ]);
        }
        function currentCustomerIdentity() {
          const photo = currentCustomerPhoto();
          const photoRef = currentCustomerPhotoRef();
          if (photo || photoRef) syncCurrentCustomerPhotoAliases(photo, photoRef);
          return {
            name: currentCustomerDisplayName(),
            email: currentCustomerEmail(),
            phone: currentCustomerPhone(),
            photo,
            photoRef,
            href: "emy-customer-profile.html",
            key: "customer-profile",
            updatedAt: clean(localStorage.getItem("emyCustomerProfileUpdatedAt"))
          };
        }
        function firstClean(values) {
          for (const value of values) {
            const next = clean(value);
            if (next) return next;
          }
          return "";
        }
        function looksFakeAvatarImageValue(value) {
          const text = clean(value).toLowerCase();
          if (!text) return true;
          if (text.indexOf("data:image/svg+xml") === 0) return true;
          if (/^data:image\//i.test(text)) return false;
          if (/^(data:|blob:)/i.test(text)) return true;
          return /images\.unsplash|iqlance-demo|logo-landing|placeholder|avatar-placeholder|demo|stock|sample|lorem|faker|dummy|randomuser|pravatar|thispersondoesnotexist|ui-avatars|dicebear|robohash|gravatar|chimp|monkey|ape/.test(text);
        }
        function avatarImageValue(value) {
          const next = clean(value);
          if (!next || /^[A-Za-z]$/.test(next) || looksFakeAvatarImageValue(next)) return "";
          return next;
        }
        function looksContentMediaValue(value) {
          const text = clean(value).toLowerCase();
          if (!text) return false;
          return /(?:^|[\/:_-])(?:business-product|product-reel|product-image|main-image|business-cover|clip-media|clip-video|clip-image|feed-media|post-media|reel-media|created-clip|created-post|feed-created)(?:[\/:_-]|$)/i.test(text);
        }
        function firstAvatarImageValue(values) {
          for (const value of values) {
            const next = avatarImageValue(value);
            if (next) return next;
          }
          return "";
        }
        function mediaCompareValue(value) {
          return avatarImageValue(value).replace(/[?#].*$/, "");
        }
        function mediaValuesMatch(left, right) {
          const a = mediaCompareValue(left);
          const b = mediaCompareValue(right);
          if (!a || !b) return false;
          if (a === b) return true;
          return a.length > 12 && b.length > 12 && (a.indexOf(b) >= 0 || b.indexOf(a) >= 0);
        }
        function currentCustomerMediaValues() {
          return [
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef"),
            currentCustomerPhoto(),
            currentCustomerPhotoRef()
          ].map(avatarImageValue).filter(Boolean);
        }
        function isCurrentCustomerMedia(value) {
          const next = avatarImageValue(value);
          return !!next && currentCustomerMediaValues().some((customerValue) => mediaValuesMatch(next, customerValue));
        }
        function firstBusinessAvatarImageValue(values) {
          for (const value of values) {
            const next = avatarImageValue(value);
            if (next && !isCurrentCustomerMedia(next) && !looksContentMediaValue(next)) return next;
          }
          return "";
        }
        function currentCustomerIdentitySlugs() {
          return cachedValue("currentCustomerIdentitySlugs", () => {
            const first = clean(localStorage.getItem("emyCustomerFirstName") || localStorage.getItem("emyMainPendingSignupFirstName"));
            const last = clean(localStorage.getItem("emyCustomerLastName") || localStorage.getItem("emyMainPendingSignupLastName"));
            const email = clean(localStorage.getItem("emyMainSignedInEmail") || localStorage.getItem("emyMainPendingSignupEmail"));
            const emailName = email && email.indexOf("@") > 0 ? email.split("@")[0] : "";
            return [
              localStorage.getItem("emyCustomerDisplayName"),
              first && last ? first + " " + last : "",
              first,
              emailName
            ].map(slug).filter(Boolean);
          });
        }
        function looksCustomerIdentity(value) {
          const key = slug(value);
          return !!key && currentCustomerIdentitySlugs().indexOf(key) >= 0;
        }
        function escapeRegExp(value) {
          return String(value || "").replace(/[.*+?^$()|[\]\\{}]/g, "\\$&");
        }
        function readStringList(key) {
          const value = readJson(key, []);
          return Array.isArray(value) ? value.map(clean).filter(Boolean) : [];
        }
        function customerIdentityPurgeSnapshot() {
          const snapshot = readJson("emyCustomerIdentityPurgeSnapshot", {});
          return snapshot && typeof snapshot === "object" ? snapshot : {};
        }
        function customerIdentityPurgeNames(extraNames) {
          const snapshot = customerIdentityPurgeSnapshot();
          const names = new Set();
          (Array.isArray(snapshot.names) ? snapshot.names : []).concat(Array.isArray(extraNames) ? extraNames : []).forEach((value) => {
            const text = clean(value);
            if (text) names.add(text);
          });
          return Array.from(names);
        }
        function customerIdentityPurgePhotos() {
          const snapshot = customerIdentityPurgeSnapshot();
          const photos = new Set();
          (Array.isArray(snapshot.photos) ? snapshot.photos : []).forEach((value) => {
            const text = avatarImageValue(value);
            if (text) photos.add(text);
          });
          return Array.from(photos);
        }
        function replaceKnownCustomerNameText(value, identity, extraNames) {
          const source = String(value || "");
          if (!source) return source;
          const nextName = clean(identity && identity.name);
          if (!nextName) return source;
          let next = source;
          customerIdentityPurgeNames(extraNames).forEach((oldName) => {
            if (!oldName || oldName === nextName) return;
            next = next.replace(new RegExp("\\b" + escapeRegExp(oldName) + "\\b", "g"), nextName);
          });
          return next;
        }
        function looksCustomerBusinessName(value) {
          return looksCustomerIdentity(value) && !isCurrentBusiness(value);
        }
        function looksContentOnlyBusinessRow(row) {
          if (!row || row.explicitBusinessProfile || isCurrentBusiness(row.name) || isCurrentBusiness(row.key)) return false;
          const category = clean(row.category).toLowerCase();
          const hasProfileSignal = !!(row.photo || row.photoRef || row.cover || row.location);
          return !hasProfileSignal && /^(event|job|post|clip|product|article|update)$/i.test(category);
        }
        function isBusinessStorageKey(key) {
          return String(key || "").indexOf("emyBusiness") === 0;
        }
        function businessReviewKey(profile) {
          const draft = profile && typeof profile === "object" ? profile : {};
          return slug(draft.businessKey || draft.key || draft.slug || draft.businessName || draft.name || currentBusinessName() || "profile") || "profile";
        }
        function businessReviewDecisionForKey(key) {
          const cleanKey = slug(key || "");
          if (!cleanKey) return "";
          const decisions = readJson("emyBusinessReviewDecisions", {});
          const candidates = [cleanKey, "business-profile-" + cleanKey, "business-profile:" + cleanKey];
          for (const candidate of candidates) {
            const entry = decisions && typeof decisions === "object" ? decisions[candidate] : null;
            if (!entry) continue;
            const status = typeof entry === "string" ? entry : entry.status;
            if (status) return clean(status).toLowerCase();
          }
          return "";
        }
        function businessReviewGlobalMatches(profile) {
          const key = businessReviewKey(profile);
          const globalKey = slug(localStorage.getItem("emyBusinessReviewBusinessKey") || localStorage.getItem("emyBusinessApprovalBusinessKey") || localStorage.getItem("emyBusinessApprovedBusinessKey") || localStorage.getItem("emyBusinessRejectionBusinessKey") || localStorage.getItem("emyBusinessRejectedBusinessKey") || "");
          return !!globalKey && globalKey === key;
        }
        function businessProfileReviewState(profile) {
          const draft = profile && typeof profile === "object" ? profile : {};
          const keyedDecision = businessReviewDecisionForKey(businessReviewKey(draft));
          if (keyedDecision) return keyedDecision;
          const approvedAt = firstClean([
            draft.approvedAt,
            draft.reviewApprovedAt,
            draft.approvalAt,
            businessReviewGlobalMatches(draft) ? localStorage.getItem("emyBusinessApprovedAt") : ""
          ]);
          const statusValues = [
            businessReviewGlobalMatches(draft) ? localStorage.getItem("emyBusinessReviewStatus") : "",
            draft.status,
            draft.reviewStatus
          ].map((value) => clean(value).toLowerCase()).filter(Boolean);
          const statusText = statusValues.join(" ");
          if (approvedAt || statusValues.some((value) => value === "approved" || value === "active" || value === "live") || /\\b(approved|active|live)\\b/.test(statusText)) return "approved";
          if (statusValues.some((value) => value === "rejected" || value === "denied") || /\\b(rejected|denied)\\b/.test(statusText)) return "rejected";
          if (statusValues.some((value) => value === "under-review" || value === "pending") || (businessReviewGlobalMatches(draft) && localStorage.getItem("emyBusinessReviewSubmittedAt"))) return "under-review";
          if (clean(localStorage.getItem("emyBusinessRegistrationFromCustomer")).toLowerCase() === "completed" && localStorage.getItem("emyBusinessReviewSubmittedAt")) return "under-review";
          return "none";
        }
        function businessProfileSubmissionSignal(profile) {
          if (businessProfileReviewState(profile) === "approved") return "approved";
          const signal = firstClean([
            profile && profile.status,
            profile && profile.reviewStatus,
            profile && profile.approvedAt
          ]);
          return /^(approved|active|live)$/i.test(signal) || /approved/i.test(signal) ? signal : "";
        }
        function businessProfileHasRealSurface(profile) {
          const draft = profile && typeof profile === "object" ? profile : {};
          const name = firstClean([draft.businessName, draft.name, draft.title, currentBusinessName()]);
          if (!name || /^(this|your)\s+business$/i.test(name) || looksCustomerIdentity(name)) return false;
          const profileSignal = firstClean([
            draft.businessCategory,
            draft.category,
            draft.primarySector,
            draft.sector,
            draft.businessDescription,
            draft.description,
            draft.businessAbout,
            draft.about,
            draft.businessAddress,
            draft.businessAddressLine1,
            draft.address,
            draft.businessLocation,
            draft.location,
            draft.businessPostcode,
            draft.postcode,
            currentBusinessPhoto(),
            currentBusinessPhotoRef(),
            localStorage.getItem("emyBusinessRegistrationFromCustomer"),
            localStorage.getItem("emyBusinessReviewSubmittedAt")
          ]);
          if (profileSignal) return true;
          const library = readJson("emyBusinessMediaLibrary", readJson("emyBusinessCoverMedia", []));
          return Array.isArray(library) && library.length > 0;
        }
        function currentBusinessIsRealProfile() {
          return cachedValue("currentBusinessIsRealProfile", () => {
            const profile = readJson("emyBusinessProfileDraft", {});
            const name = currentBusinessName();
            if (!name || looksInternalProfileName(name) || looksCustomerIdentity(name) || /^(this|your)\s+business$/i.test(name) || looksDemoText(name)) return false;
            const displayName = firstClean([localStorage.getItem("emyBusinessDisplayName"), profile && profile.businessName, profile && profile.name]);
            if (displayName && displayName.toLowerCase() === name.toLowerCase()) return true;
            return !!businessProfileSubmissionSignal(profile) || businessProfileHasRealSurface(profile);
          });
        }
        function itemBusinessName(item) {
          const explicit = firstClean([item && item.businessName, item && item.business, item && item.storeName, item && item.productBusiness, item && item.sellerName]);
          if (explicit) return explicit;
          const ownerType = firstClean([item && item.ownerType, item && item.actorType, item && item.accountType, item && item.role, item && item.sourceType]).toLowerCase();
          return /business|seller|merchant|company/.test(ownerType) ? firstClean([item && item.ownerName, item && item.actor]) : "";
        }
        function itemBusinessNameForStorage(item, key) {
          const explicit = itemBusinessName(item);
          const currentName = currentBusinessName();
          if (explicit && !looksInternalProfileName(explicit) && !looksCustomerIdentity(explicit)) return explicit;
          return isBusinessStorageKey(key) && currentName && !looksInternalProfileName(currentName) && !looksCustomerIdentity(currentName) ? currentName : "";
        }
        function itemBusinessKey(item, fallback) {
          return slug(firstClean([item && item.businessKey, item && item.profileKey, item && item.ownerKey, fallback, itemBusinessName(item)]));
        }
        function itemLooksLikeContent(item) {
          if (!item || typeof item !== "object") return false;
          return !!(item.productName || item.productTitle || item.price || item.priceText || item.mediaSrc || item.mediaRef || item.video || item.videoRef || item.coverSrc || item.coverRef || item.thumbnailSrc || item.posterSrc || item.productDescription || item.productInfo || Array.isArray(item.mediaItems));
        }
        function itemHasRenderableBusinessContent(item) {
          if (!item || typeof item !== "object" || looksDemoItem(item)) return false;
          return !!firstClean([
            item.productName, item.productTitle, item.clipTitle, item.title, item.name, item.text, item.description,
            item.productDescription, item.productInfo, item.articleBody, item.shareText, item.eventWhen, item.jobTitle,
            item.price, item.priceText, item.mediaSrc, item.mediaRef, item.video, item.videoRef, item.coverSrc, item.coverRef
          ]);
        }
        function productIsPublic(item) {
          if (!item || typeof item !== "object") return true;
          if (item.isPaused === true || item.paused === true || item.isPublished === false || item.isLive === false || item.hidden === true || item.deleted === true || item.deletedAt) return false;
          const status = firstClean([item.publishStatus, item.liveStatus, item.visibility, item.status, item.productStatus, item.reviewStatus]).toLowerCase();
          return !["paused", "pause", "unpublished", "hidden", "draft", "inactive", "offline", "deleted", "archived"].includes(status);
        }
        function mediaThumbForActivity(media) {
          const item = media || {};
          if (item.type === "video") {
            return { src: firstClean([item.posterSrc, item.thumbnailSrc]), ref: firstClean([item.posterRef, item.thumbnailRef]) };
          }
          return { src: firstClean([item.src]), ref: firstClean([item.ref]) };
        }
        function itemPhoto(item) {
          const profilePhoto = firstAvatarImageValue([item && item.avatarSrc, item && item.avatar, item && item.profilePhoto, item && item.businessPhoto, item && item.businessAvatar, item && item.businessLogo, item && item.logo]);
          if (profilePhoto) return profilePhoto;
          return itemLooksLikeContent(item) ? "" : firstAvatarImageValue([item && item.photo, item && item.image]);
        }
        function itemPhotoRef(item) {
          return firstAvatarImageValue([item && item.avatarRef, item && item.profilePhotoRef, item && item.businessPhotoRef, item && item.businessAvatarRef, item && item.businessLogoRef, item && item.logoRef, item && !itemLooksLikeContent(item) ? item.photoRef : "", item && !itemLooksLikeContent(item) ? item.imageRef : ""]);
        }
        function itemBusinessPhoto(item) {
          const profilePhoto = firstBusinessAvatarImageValue([
            item && item.businessPhoto,
            item && item.businessPhotoSrc,
            item && item.businessProfilePhoto,
            item && item.businessProfilePhotoSrc,
            item && item.businessAvatar,
            item && item.businessAvatarSrc,
            item && item.businessLogo,
            item && item.businessLogoSrc,
            item && item.logo,
            item && item.logoSrc,
            item && item.profilePhoto,
            item && item.profilePhotoSrc,
            item && item.avatarSrc,
            item && item.avatar
          ]);
          if (profilePhoto) return profilePhoto;
          return itemLooksLikeContent(item) ? "" : firstBusinessAvatarImageValue([item && item.photo, item && item.photoSrc, item && item.image, item && item.imageSrc]);
        }
        function itemBusinessPhotoRef(item) {
          return firstBusinessAvatarImageValue([
            item && item.businessPhotoRef,
            item && item.businessPhotoPublicId,
            item && item.businessProfilePhotoRef,
            item && item.businessProfilePhotoPublicId,
            item && item.businessAvatarRef,
            item && item.businessAvatarPublicId,
            item && item.businessLogoRef,
            item && item.businessLogoPublicId,
            item && item.logoRef,
            item && item.logoPublicId,
            item && item.profilePhotoRef,
            item && item.profilePhotoPublicId,
            item && item.avatarRef,
            item && item.avatarPublicId,
            item && !itemLooksLikeContent(item) ? item.photoRef : "",
            item && !itemLooksLikeContent(item) ? item.photoPublicId : "",
            item && !itemLooksLikeContent(item) ? item.imageRef : "",
            item && !itemLooksLikeContent(item) ? item.imagePublicId : ""
          ]);
        }
        function itemLooksCustomerOwned(item, ownerName) {
          if (!item || typeof item !== "object") return false;
          const roleText = firstClean([item.owner, item.repostedByType, item.actorType, item.createdAs, item.accountType, item.role, item.authorRole]).toLowerCase();
          const hrefText = firstClean([item.profileHref, item.href, item.repostedByHref]).toLowerCase();
          const keyText = slug(firstClean([item.businessKey, item.key, item.ownerKey, item.profileKey, item.repostedByKey]));
          const idText = clean(firstClean([item.id, item.feedId, item.postId])).toLowerCase();
          const explicitCustomerContext = roleText === "customer" ||
            roleText === "buyer" ||
            roleText.indexOf("customer") >= 0 ||
            hrefText.indexOf("emy-customer-profile") >= 0 ||
            keyText === "customer-profile" ||
            item.customerKey ||
            item.customerName ||
            item.customerDisplayName;
          const explicitBusinessContext = !explicitCustomerContext && (
            roleText.indexOf("business") >= 0 ||
            roleText.indexOf("merchant") >= 0 ||
            roleText.indexOf("seller") >= 0 ||
            hrefText.indexOf("emy-business-profile") >= 0 ||
            (!!keyText && keyText !== "customer-profile") ||
            idText.indexOf("business-") === 0
          );
          if ((item.isUserPost === true || item.mine === true || item.own === true) && !explicitBusinessContext) return true;
          if (roleText === "customer" || roleText === "buyer" || roleText.indexOf("customer") >= 0) return true;
          if (hrefText.indexOf("emy-customer-profile") >= 0) return true;
          if (keyText === "customer-profile") return true;
          if (idText.indexOf("customer-") === 0 || (idText.indexOf("user-feed-") === 0 && !explicitBusinessContext) || (idText.indexOf("feed-create-") === 0 && !explicitBusinessContext)) return true;
          const nameText = firstClean([ownerName, item.businessName, item.business, item.ownerName, item.actor, item.authorName, item.createdByName, item.repostedBy, item.name]);
          return !explicitBusinessContext && looksCustomerIdentity(nameText);
        }
        function knownCustomerNameValue(value, identity) {
          const key = slug(value);
          if (!key) return false;
          if (slug(identity && identity.name) === key) return true;
          return customerIdentityPurgeNames().map(slug).indexOf(key) >= 0;
        }
        function knownCustomerPhotoValue(value, identity) {
          const next = avatarImageValue(value);
          if (!next) return false;
          if (identity && (mediaValuesMatch(next, identity.photo) || mediaValuesMatch(next, identity.photoRef))) return true;
          return customerIdentityPurgePhotos().some((oldValue) => mediaValuesMatch(next, oldValue));
        }
        function recordLooksCustomerActor(record, identity) {
          if (!record || typeof record !== "object") return false;
          if (itemLooksCustomerOwned(record, firstClean([record.businessName, record.business, record.ownerName, record.actorName, record.customerName, record.name]))) return true;
          const roleText = firstClean([record.owner, record.ownerType, record.repostedByType, record.actorType, record.createdAs, record.accountType, record.role, record.authorRole, record.viewerType, record.customerType]).toLowerCase();
          const hrefText = firstClean([record.profileHref, record.href, record.actorHref, record.customerHref, record.customerProfileHref, record.repostedByHref]).toLowerCase();
          const keyText = slug(firstClean([record.businessKey, record.key, record.ownerKey, record.actorKey, record.customerKey, record.profileKey, record.repostedByKey]));
          const idText = clean(firstClean([record.id, record.feedId, record.postId, record.itemId])).toLowerCase();
          const explicitCustomerContext = roleText.indexOf("customer") >= 0 ||
            roleText.indexOf("buyer") >= 0 ||
            hrefText.indexOf("emy-customer-profile") >= 0 ||
            keyText === "customer-profile" ||
            record.customerKey ||
            record.customerName ||
            record.customerDisplayName;
          const explicitBusinessContext = !explicitCustomerContext && (
            roleText.indexOf("business") >= 0 ||
            roleText.indexOf("merchant") >= 0 ||
            roleText.indexOf("seller") >= 0 ||
            hrefText.indexOf("emy-business-profile") >= 0 ||
            (!!keyText && keyText !== "customer-profile") ||
            idText.indexOf("business-") === 0 ||
            idText.indexOf("product-") === 0
          );
          if (explicitBusinessContext) return false;
          if (explicitCustomerContext) return true;
          const email = clean(identity && identity.email).toLowerCase();
          if (email && firstClean([record.email, record.customerEmail, record.actorEmail, record.ownerEmail]).toLowerCase() === email) return true;
          const nameText = firstClean([record.businessName, record.business, record.ownerName, record.actor, record.actorName, record.authorName, record.createdByName, record.customerName, record.customerDisplayName, record.repostedBy, record.repostedByName, record.viewerName, record.name, record.displayName]);
          if (knownCustomerNameValue(nameText, identity)) return true;
          const photoText = firstClean([record.businessPhoto, record.businessPhotoSrc, record.avatar, record.avatarSrc, record.profilePhoto, record.profilePhotoSrc, record.customerPhoto, record.customerPhotoSrc, record.actorPhoto, record.actorAvatar, record.ownerPhoto, record.authorPhoto, record.repostedByPhoto, record.detailAvatarSrc, record.photo, record.photoSrc]);
          return knownCustomerPhotoValue(photoText, identity);
        }
        function customerRecordNameCandidates(record) {
          if (!record || typeof record !== "object") return [];
          return [
            record.businessName, record.business, record.ownerName, record.actor, record.actorName, record.author,
            record.authorName, record.createdBy, record.createdByName, record.customerName, record.customerDisplayName,
            record.profileName, record.repostedBy, record.repostedByName, record.viewerName, record.commenterName,
            record.name, record.displayName
          ].map(clean).filter(Boolean);
        }
        function assignRecordValue(record, key, value) {
          if (!record || !key) return false;
          const next = clean(value);
          if (!next) {
            if (Object.prototype.hasOwnProperty.call(record, key)) {
              delete record[key];
              return true;
            }
            return false;
          }
          if (record[key] === next) return false;
          record[key] = next;
          return true;
        }
        function normaliseCustomerIdentityRecord(record, identity, storageKey) {
          if (!record || typeof record !== "object" || Array.isArray(record)) return { value: record, changed: false, customer: false };
          const customer = recordLooksCustomerActor(record, identity);
          if (!customer) return { value: record, changed: false, customer: false };
          const next = Object.assign({}, record);
          const staleNames = customerRecordNameCandidates(record);
          let changed = false;
          ["owner", "ownerType", "actorType", "accountType", "createdAs", "authorRole", "viewerType", "customerType"].forEach((key) => {
            if (key in next || key !== "ownerType") changed = assignRecordValue(next, key, "customer") || changed;
          });
          ["businessKey", "ownerKey", "actorKey", "customerKey", "profileKey", "repostedByKey"].forEach((key) => {
            if (key in next || key === "businessKey") changed = assignRecordValue(next, key, identity.key) || changed;
          });
          if ("key" in next && (slug(next.key) === "customer-profile" || knownCustomerNameValue(next.key, identity))) changed = assignRecordValue(next, "key", identity.key) || changed;
          ["profileHref", "ownerHref", "actorHref", "customerHref", "customerProfileHref", "repostedByHref"].forEach((key) => {
            if (key in next || key === "profileHref") changed = assignRecordValue(next, key, identity.href) || changed;
          });
          if ("href" in next && /emy-customer-profile/i.test(clean(next.href))) changed = assignRecordValue(next, "href", identity.href) || changed;
          ["businessName", "business", "ownerName", "actor", "actorName", "author", "authorName", "createdBy", "createdByName", "customerName", "customerDisplayName", "profileName", "repostedBy", "repostedByName", "viewerName", "commenterName"].forEach((key) => {
            if (key in next || key === "businessName" || key === "business" || key === "customerName") changed = assignRecordValue(next, key, identity.name) || changed;
          });
          ["name", "displayName"].forEach((key) => {
            if (key in next && knownCustomerNameValue(next[key], identity)) changed = assignRecordValue(next, key, identity.name) || changed;
          });
          ["email", "customerEmail", "actorEmail", "ownerEmail"].forEach((key) => {
            if (identity.email && (key in next || key === "customerEmail")) changed = assignRecordValue(next, key, identity.email) || changed;
          });
          ["phone", "customerPhone", "actorPhone", "ownerPhone"].forEach((key) => {
            if (identity.phone && key in next) changed = assignRecordValue(next, key, identity.phone) || changed;
          });
          ["businessPhoto", "businessPhotoSrc", "avatar", "avatarSrc", "profilePhoto", "profilePhotoSrc", "customerPhoto", "customerPhotoSrc", "actorPhoto", "actorAvatar", "ownerPhoto", "authorPhoto", "repostedByPhoto", "detailAvatarSrc"].forEach((key) => {
            if (key in next || key === "businessPhoto" || key === "avatarSrc" || key === "customerPhoto" || key === "detailAvatarSrc") changed = assignRecordValue(next, key, identity.photo) || changed;
          });
          ["businessPhotoRef", "avatarRef", "profilePhotoRef", "customerPhotoRef", "actorPhotoRef", "ownerPhotoRef", "authorPhotoRef", "repostedByPhotoRef", "detailAvatarRef"].forEach((key) => {
            if (key in next || (identity.photoRef && (key === "businessPhotoRef" || key === "avatarRef" || key === "customerPhotoRef" || key === "detailAvatarRef"))) changed = assignRecordValue(next, key, identity.photoRef) || changed;
          });
          ["photo", "photoSrc"].forEach((key) => {
            if (key in next && knownCustomerPhotoValue(next[key], identity)) changed = assignRecordValue(next, key, identity.photo) || changed;
          });
          ["photoRef"].forEach((key) => {
            if (key in next && knownCustomerPhotoValue(next[key], identity)) changed = assignRecordValue(next, key, identity.photoRef) || changed;
          });
          if (/Notifications|ChatThread/i.test(storageKey || "")) {
            ["title", "body", "message", "summary", "preview", "label"].forEach((key) => {
              if (typeof next[key] === "string") {
                const replaced = replaceKnownCustomerNameText(next[key], identity, staleNames);
                if (replaced !== next[key]) {
                  next[key] = replaced;
                  changed = true;
                }
              }
            });
          }
          return { value: next, changed, customer: true };
        }
        function normaliseCustomerIdentityValue(value, identity, storageKey, fieldKey, depth) {
          if (depth > 6) return { value, changed: false };
          if (Array.isArray(value)) {
            let changed = false;
            const peopleList = /likedBy|savedBy|sharedBy|repostedBy|viewedBy|people|actors|customers|followers|comments|replies/i.test(fieldKey || "");
            const next = value.map((item) => {
              if (typeof item === "string" && peopleList && knownCustomerNameValue(item, identity)) {
                changed = item !== identity.name || changed;
                return identity.name;
              }
              const result = normaliseCustomerIdentityValue(item, identity, storageKey, fieldKey, depth + 1);
              changed = result.changed || changed;
              return result.value;
            });
            return { value: next, changed };
          }
          if (!value || typeof value !== "object") return { value, changed: false };
          const recordResult = normaliseCustomerIdentityRecord(value, identity, storageKey);
          let next = recordResult.value;
          let changed = recordResult.changed;
          Object.keys(next).forEach((key) => {
            const child = next[key];
            if (!child || typeof child !== "object") return;
            const result = normaliseCustomerIdentityValue(child, identity, storageKey, key, depth + 1);
            if (result.changed) {
              next = Object.assign({}, next);
              next[key] = result.value;
              changed = true;
            }
          });
          return { value: next, changed };
        }
        function customerIdentityStorageKeyNames() {
          const keys = new Set(storageArrayKeys.concat([
            "emyFeedCreatedArticles", "emyFeedCreatedProducts", "emyFeedCreatedClips", "emyFeedReposts", "emySavedFeedItems",
            "emyFeedActionState", "emyCustomerProductVisits", "emyProductVisitHistory"
          ]));
          try {
            for (let index = 0; index < localStorage.length; index += 1) {
              const key = localStorage.key(index) || "";
              if (/^emyBusinessNotifications:/.test(key) || /^emyBusinessChatThread:/.test(key) || /^emyCustomerChatThread:/.test(key)) keys.add(key);
            }
          } catch (error) {}
          return Array.from(keys);
        }
        let customerIdentityPurgeRunning = false;
        let customerIdentityPurgeQueued = false;
        function purgeStaleCustomerIdentityStorageKey(key, identity) {
          let parsed;
          try {
            const raw = localStorage.getItem(key);
            if (!raw || !/^[\[{]/.test(raw.trim())) return;
            parsed = JSON.parse(raw);
          } catch (error) {
            return;
          }
          const result = normaliseCustomerIdentityValue(parsed, identity, key, "", 0);
          if (result.changed) {
            localStorage.setItem(key, JSON.stringify(result.value));
            jsonCache.set(key, result.value);
          }
        }
        function purgeStaleCustomerIdentityFromStorage() {
          if (customerIdentityPurgeRunning) return;
          customerIdentityPurgeRunning = true;
          try {
            const identity = currentCustomerIdentity();
            customerIdentityStorageKeyNames().forEach((key) => purgeStaleCustomerIdentityStorageKey(key, identity));
            localStorage.removeItem("emyCustomerIdentityPurgeSnapshot");
            localStorage.removeItem("emyCustomerIdentityKnownNames");
            localStorage.removeItem("emyCustomerIdentityKnownPhotos");
            jsonCache.delete("emyCustomerIdentityPurgeSnapshot");
            jsonCache.delete("emyCustomerIdentityKnownNames");
            jsonCache.delete("emyCustomerIdentityKnownPhotos");
          } catch (error) {
          } finally {
            customerIdentityPurgeRunning = false;
          }
        }
        function scheduleDeferredCustomerIdentityPurge() {
          if (customerIdentityPurgeQueued || customerIdentityPurgeRunning) return;
          customerIdentityPurgeQueued = true;
          const keys = customerIdentityStorageKeyNames();
          const identity = currentCustomerIdentity();
          const chunkSize = 4;
          const runChunk = (start) => {
            keys.slice(start, start + chunkSize).forEach((key) => purgeStaleCustomerIdentityStorageKey(key, identity));
            if (start + chunkSize < keys.length) {
              const defer = window.requestIdleCallback || ((fn) => window.setTimeout(fn, 16));
              defer(() => runChunk(start + chunkSize));
              return;
            }
            try {
              localStorage.removeItem("emyCustomerIdentityPurgeSnapshot");
              localStorage.removeItem("emyCustomerIdentityKnownNames");
              localStorage.removeItem("emyCustomerIdentityKnownPhotos");
              jsonCache.delete("emyCustomerIdentityPurgeSnapshot");
              jsonCache.delete("emyCustomerIdentityKnownNames");
              jsonCache.delete("emyCustomerIdentityKnownPhotos");
            } catch (error) {}
            customerIdentityPurgeQueued = false;
          };
          const defer = window.requestIdleCallback || ((fn) => window.setTimeout(fn, 16));
          defer(() => runChunk(0));
        }
        function activityBusinessPhoto(item, row, businessKey, businessName) {
          const businessText = firstClean([businessKey, businessName, item && item.businessKey, item && item.businessName, item && item.business, item && item.storeName, item && item.ownerName, item && item.productBusiness, item && item.sellerName]);
          const matchesCurrentBusiness = isCurrentBusiness(businessKey) || isCurrentBusiness(businessName) || isCurrentBusiness(businessText);
          const current = matchesCurrentBusiness ? currentBusinessAvatarMedia() : { src: "", ref: "" };
          if (matchesCurrentBusiness && (current.src || current.ref)) return current.src;
          const registered = businessAvatarForText(businessText);
          if (registered) return registered;
          return firstBusinessAvatarImageValue([
            row && row.photo,
            item && item.businessPhoto,
            item && item.businessAvatar,
            item && item.businessLogo,
            item && item.profilePhoto,
            item && item.avatarSrc,
            item && item.avatar,
            item && item.logo
          ]);
        }
        function activityBusinessPhotoRef(item, row, businessKey, businessName) {
          const businessText = firstClean([businessKey, businessName, item && item.businessKey, item && item.businessName, item && item.business, item && item.storeName, item && item.ownerName, item && item.productBusiness, item && item.sellerName]);
          const matchesCurrentBusiness = isCurrentBusiness(businessKey) || isCurrentBusiness(businessName) || isCurrentBusiness(businessText);
          const current = matchesCurrentBusiness ? currentBusinessAvatarMedia() : { src: "", ref: "" };
          if (matchesCurrentBusiness && (current.src || current.ref)) return current.ref;
          const registered = businessAvatarRefForText(businessText);
          if (registered) return registered;
          return firstBusinessAvatarImageValue([
            row && row.photoRef,
            item && item.businessPhotoRef,
            item && item.businessAvatarRef,
            item && item.businessLogoRef,
            item && item.profilePhotoRef,
            item && item.avatarRef,
            item && item.logoRef
          ]);
        }
        function mediaObjectFromSource(source) {
          if (!source || typeof source !== "object") return null;
          const ref = firstClean([source.ref, source.mediaRef, source.coverRef, source.imageRef, source.videoRef]);
          const src = ref ? "" : firstClean([source.src, source.url, source.mediaSrc, source.coverSrc, source.image, source.video, source.thumbnailSrc, source.thumbnail]);
          if (!src && !ref) return null;
          const type = firstClean([source.type, source.mediaType, source.coverType, source.mimeType]).toLowerCase();
          return {
            src,
            ref,
            type: /video/.test(type) || /\.(mp4|mov|webm)(\?|$)/i.test(src) ? "video" : "image",
            duration: firstClean([source.duration, source.videoDuration, source.durationLabel]),
            videoStart: source.videoStart,
            videoEnd: source.videoEnd
          };
        }
        function currentBusinessCoverMedia() {
          const hero = mediaObjectFromSource(readJson("emyBusinessHeroCoverMedia", null));
          if (hero) return hero;
          const gallery = readJson("emyBusinessMediaLibrary", readJson("emyBusinessCoverMedia", []));
          if (Array.isArray(gallery)) {
            for (const item of gallery) {
              const media = mediaObjectFromSource(item);
              if (media) return media;
            }
          }
          return mediaObjectFromSource({
            src: localStorage.getItem("emyBusinessCoverSrc") || localStorage.getItem("emyBusinessProfileCoverSrc") || "",
            ref: localStorage.getItem("emyBusinessCoverRef") || localStorage.getItem("emyBusinessProfileCoverRef") || "",
            type: localStorage.getItem("emyBusinessCoverType") || localStorage.getItem("emyBusinessProfileCoverType") || ""
          });
        }
        function itemBusinessDescription(item) {
          if (!item || typeof item !== "object") return "";
          return firstClean([
            item.businessDescription,
            item.businessAbout,
            item.businessBio,
            item.about,
            item.bio,
            item.summary,
            itemLooksLikeContent(item) ? "" : item.description,
            itemLooksLikeContent(item) ? "" : item.text
          ]);
        }
        function itemCustomerOwned(item) {
          if (!item || typeof item !== "object") return false;
          const ownerText = firstClean([
            item.owner,
            item.ownerType,
            item.actorType,
            item.accountType,
            item.role,
            item.repostedByType,
            item.postedByType,
            item.createdByType,
            item.sourceType
          ]).toLowerCase();
          const keyText = firstClean([item.businessKey, item.profileKey, item.ownerKey, item.href, item.open]).toLowerCase();
          const ownerName = firstClean([item.ownerName, item.actor, item.authorName, item.createdByName, item.repostedByName, item.postedByName]);
          const businessText = firstClean([item.businessName, item.business, item.businessKey, item.profileKey]);
          return /customer|user|personal/.test(ownerText) ||
            /customer-profile|emy-customer-profile/.test(keyText) ||
            (looksCustomerIdentity(ownerName) && !isCurrentBusiness(businessText));
        }
        function businessIdentityKey(item) {
          const current = currentBusinessRow();
          if (current && (isCurrentBusiness(item && item.key) || isCurrentBusiness(item && item.name) || slug(item && item.name) === slug(current.name))) return current.key;
          const nameKey = slug(item && item.name);
          const storedKey = slug(item && item.key);
          if (nameKey && !looksInternalProfileName(nameKey) && !looksCustomerIdentity(nameKey)) return nameKey;
          if (storedKey && !looksInternalProfileName(storedKey) && !looksCustomerIdentity(storedKey)) return storedKey;
          return "";
        }
        function mergeBusinessRows(existing, next) {
          if (!existing) return next;
          const nextHasAuthoritativeMedia = !!(next && (next.explicitBusinessProfile || isCurrentBusiness(next.key) || isCurrentBusiness(next.name)) && (next.photo || next.photoRef));
          return {
            key: existing.key || next.key,
            name: existing.name || next.name,
            photo: nextHasAuthoritativeMedia ? (next.photo || "") : existing.photo || next.photo,
            photoRef: nextHasAuthoritativeMedia ? (next.photoRef || "") : existing.photoRef || next.photoRef,
            cover: existing.cover || next.cover || null,
            category: existing.category || next.category,
            sector: existing.sector || next.sector,
            service: existing.service || next.service,
            description: existing.description || next.description,
            address: existing.address || next.address,
            location: existing.location || next.location,
            postcode: existing.postcode || next.postcode,
            distance: existing.distance || next.distance,
            latitude: existing.latitude || next.latitude,
            longitude: existing.longitude || next.longitude,
            workingDays: existing.workingDays || next.workingDays,
            workingDaysSchedule: existing.workingDaysSchedule || next.workingDaysSchedule,
            status: existing.status || next.status,
            statusText: existing.statusText || next.statusText,
            isCustomer: existing.isCustomer || next.isCustomer,
            explicitBusinessProfile: existing.explicitBusinessProfile || next.explicitBusinessProfile
          };
        }
        function dedupeBusinessRows(rows) {
          const map = new Map();
          rows.forEach((row) => {
            if (!row || !row.name || looksDemoText(row.name)) return;
            if (looksInternalProfileName(row.name) || looksInternalProfileName(row.key)) return;
            if (looksCustomerBusinessName(row.name) || looksCustomerBusinessName(row.key)) return;
            if (looksContentOnlyBusinessRow(row)) return;
            const key = businessIdentityKey(row);
            if (!key) return;
            map.set(key, mergeBusinessRows(map.get(key), Object.assign({}, row, { key })));
          });
          return Array.from(map.values());
        }
        function currentBusinessRow() {
          return cachedValue("currentBusinessRow", () => {
            const profile = readJson("emyBusinessProfileDraft", {});
            const name = currentBusinessName();
            if (!name || !currentBusinessIsRealProfile()) return null;
            const profileKey = slug(firstClean([profile && profile.businessKey, profile && profile.key, localStorage.getItem("emyBusinessProfileKey"), localStorage.getItem("emyBusinessKey"), name]));
            const safeProfileKey = profileKey && !looksInternalProfileName(profileKey) && !looksCustomerIdentity(profileKey) ? profileKey : slug(name);
            return {
              key: safeProfileKey,
              name,
              photo: currentBusinessPhoto(),
              photoRef: currentBusinessPhotoRef(),
              cover: currentBusinessCoverMedia(),
              category: firstClean([profile && profile.businessCategory, profile && profile.category, profile && profile.primarySector, profile && profile.sector, profile && profile.type, localStorage.getItem("emyBusinessCategory")]),
              sector: firstClean([profile && profile.primarySector, profile && profile.sector]),
              service: firstClean([profile && profile.emyService, profile && profile.service, profile && profile.providedService]),
              description: firstClean([profile && profile.businessDescription, profile && profile.description, profile && profile.businessAbout, profile && profile.about, profile && profile.businessBio, profile && profile.bio, profile && profile.summary, localStorage.getItem("emyBusinessDescription")]),
              address: firstClean([profile && profile.businessAddress, profile && profile.businessAddressLine1, profile && profile.address, localStorage.getItem("emyBusinessAddress")]),
              location: firstClean([profile && profile.businessLocation, profile && profile.location, profile && profile.address, profile && profile.businessAddress, profile && profile.businessAddressLine1, profile && profile.city, profile && profile.businessCity, localStorage.getItem("emyBusinessLocationLabel"), localStorage.getItem("emyBusinessLocation"), localStorage.getItem("emyBusinessAddress")]),
              postcode: firstClean([profile && profile.businessPostcode, profile && profile.postcode]),
              latitude: firstClean([profile && profile.businessLatitude, profile && profile.latitude, localStorage.getItem("emyBusinessLatitude")]),
              longitude: firstClean([profile && profile.businessLongitude, profile && profile.longitude, profile && profile.lng, localStorage.getItem("emyBusinessLongitude")]),
              workingDays: firstClean([profile && profile.workingDays, localStorage.getItem("emyBusinessWorkingDays"), profile && profile.hours, profile && profile.businessHours, profile && profile.openingHours]),
              workingDaysSchedule: profile && profile.workingDaysSchedule && typeof profile.workingDaysSchedule === "object" ? profile.workingDaysSchedule : readJson("emyBusinessWorkingDaysSchedule", {}),
              status: profile && profile.status,
              statusText: profile && profile.statusText,
              explicitBusinessProfile: true
            };
          });
        }
        function recoveryBusinessName(row, fallback) {
          return firstClean([
            row && row.businessName,
            row && row.name,
            row && row.title,
            row && row.business,
            row && row.storeName,
            row && row.productBusiness,
            row && row.sellerName,
            fallback
          ]);
        }
        function recoveryBusinessKey(row, name, fallback) {
          return slug(firstClean([
            row && row.businessKey,
            row && row.key,
            row && row.profileKey,
            row && row.ownerKey,
            localStorage.getItem("emyBusinessProfileKey"),
            localStorage.getItem("emyBusinessKey"),
            fallback,
            name
          ]));
        }
        function recoveryEmailMatches(row) {
          const signedEmail = clean(localStorage.getItem("emyMainSignedInEmail") || localStorage.getItem("emyMainPendingSignupEmail")).toLowerCase();
          if (!signedEmail || !row || typeof row !== "object") return false;
          const rowEmail = firstClean([row.ownerEmail, row.businessOwnerEmail, row.customerOwnerEmail, row.email, row.businessEmail]).toLowerCase();
          return !!rowEmail && rowEmail === signedEmail;
        }
        function recoveryRowMatchesKnownBusiness(row, fallback) {
          const name = recoveryBusinessName(row, fallback);
          const key = recoveryBusinessKey(row, name, fallback);
          const aliases = currentBusinessAliases();
          return aliases.some((alias) => alias && (alias === key || alias === slug(name)));
        }
        function recoveryCandidateFromRow(row, fallback, score) {
          if (!row || typeof row !== "object") return null;
          const name = recoveryBusinessName(row, fallback);
          if (!name || /^(this|your)\s+business$/i.test(name) || looksCustomerIdentity(name) || looksDemoText(name)) return null;
          const key = recoveryBusinessKey(row, name, fallback) || slug(name);
          if (!key || looksDemoText(key)) return null;
          return {
            score,
            key,
            name,
            photo: itemBusinessPhoto(row) || firstClean([row.photo, row.photoSrc, row.image, row.imageSrc]),
            photoRef: itemBusinessPhotoRef(row) || firstClean([row.photoRef, row.photoPublicId, row.imageRef, row.imagePublicId]),
            category: firstClean([row.businessCategory, row.category, row.primarySector, row.sector, row.type]),
            sector: firstClean([row.primarySector, row.sector]),
            service: firstClean([row.emyService, row.service, row.providedService, row.subCategory]),
            description: itemBusinessDescription(row),
            address: firstClean([row.businessAddress, row.businessAddressLine1, row.address]),
            location: firstClean([row.businessLocation, row.location, row.address, row.businessAddress, row.businessAddressLine1, row.city, row.businessCity]),
            postcode: firstClean([row.businessPostcode, row.postcode]),
            latitude: firstClean([row.businessLatitude, row.latitude]),
            longitude: firstClean([row.businessLongitude, row.longitude, row.lng]),
            workingDays: firstClean([row.workingDays, row.hours, row.businessHours, row.openingHours]),
            status: firstClean([row.status, row.reviewStatus, row.openStatus, row.hoursStatus]) || "approved",
            statusText: firstClean([row.statusText, row.openStatusText, row.hoursStatusText]),
            raw: row
          };
        }
        function ownedBusinessRecoveryRow() {
          const candidates = [];
          const add = (row, fallback, score, strict) => {
            const candidate = recoveryCandidateFromRow(row, fallback, score);
            if (!candidate) return;
            if (strict || recoveryEmailMatches(row) || recoveryRowMatchesKnownBusiness(row, fallback)) candidates.push(candidate);
          };
          const profile = readJson("emyBusinessProfileDraft", {});
          add(profile, currentBusinessName(), 120, businessProfileHasRealSurface(profile));
          const customers = readJson("emyCustomerBusinesses", {});
          if (customers && typeof customers === "object" && !Array.isArray(customers)) {
            Object.keys(customers).forEach((key) => {
              const item = customers[key] || {};
              const ownerFlag = item.isOwner === true || item.owned === true || item.ownedByMe === true || item.yourBusiness === true || item.createdByMe === true || item.ownerMode === "business";
              const strict = ownerFlag || recoveryEmailMatches(item) || recoveryRowMatchesKnownBusiness(item, key);
              add(item, key, strict ? 110 : 40, strict);
            });
          }
          storageArrayKeys.concat(["emyBusinessProductList", "emyBusinessProductReels"]).forEach((key) => {
            if (!isBusinessStorageKey(key)) return;
            const rows = readJson(key, []);
            if (!Array.isArray(rows)) return;
            rows.forEach((item) => add(item, itemBusinessKey(item, ""), 90, true));
          });
          candidates.sort((a, b) => b.score - a.score);
          return candidates[0] || null;
        }
        function restoreOwnedBusinessProfile(row) {
          if (!row || !row.name) return false;
          const current = readJson("emyBusinessProfileDraft", {});
          const next = Object.assign({}, current, row.raw || {}, {
            businessName: row.name,
            name: row.name,
            title: row.name,
            businessKey: row.key,
            key: row.key,
            businessCategory: row.category || current.businessCategory || current.category || "",
            category: row.category || current.category || current.businessCategory || "",
            primarySector: row.sector || current.primarySector || current.sector || "",
            emyService: row.service || current.emyService || current.service || "",
            businessDescription: row.description || current.businessDescription || current.description || "",
            description: row.description || current.description || current.businessDescription || "",
            businessAddress: row.address || current.businessAddress || current.address || "",
            businessLocation: row.location || current.businessLocation || current.location || "",
            businessPostcode: row.postcode || current.businessPostcode || current.postcode || "",
            businessLatitude: row.latitude || current.businessLatitude || current.latitude || "",
            businessLongitude: row.longitude || current.businessLongitude || current.longitude || current.lng || "",
            workingDays: row.workingDays || current.workingDays || current.hours || "",
            status: row.status || current.status || "approved",
            reviewStatus: row.status || current.reviewStatus || "approved",
            statusText: row.statusText || current.statusText || "",
            explicitBusinessProfile: true,
            isBusinessProfile: true,
            profileType: "business"
          });
          try {
            localStorage.setItem("emyBusinessProfileDraft", JSON.stringify(next));
            localStorage.setItem("emyBusinessDisplayName", row.name);
            localStorage.setItem("emyBusinessName", row.name);
            localStorage.setItem("emyBusinessProfileKey", row.key);
            localStorage.setItem("emyBusinessKey", row.key);
            localStorage.setItem("emyBusinessReviewBusinessKey", row.key);
            localStorage.setItem("emyBusinessReviewStatus", next.reviewStatus || "approved");
            localStorage.setItem("emyBusinessRegistrationFromCustomer", "completed");
            if (row.photo) {
              localStorage.setItem("emyBusinessProfilePhoto", row.photo);
              localStorage.setItem("emyBusinessProfilePhotoSrc", row.photo);
            }
            if (row.photoRef) localStorage.setItem("emyBusinessProfilePhotoRef", row.photoRef);
            if (row.category) localStorage.setItem("emyBusinessCategory", row.category);
            if (row.description) localStorage.setItem("emyBusinessDescription", row.description);
            if (row.location) localStorage.setItem("emyBusinessLocation", row.location);
            if (row.address) localStorage.setItem("emyBusinessAddress", row.address);
            if (row.workingDays) localStorage.setItem("emyBusinessWorkingDays", row.workingDays);
          } catch (error) {
            return false;
          }
          clearJsonCache();
          resetDomReadCache();
          return true;
        }
        function recoverOwnedBusinessProfile() {
          return restoreOwnedBusinessProfile(ownedBusinessRecoveryRow());
        }
        window.emyRecoverOwnedBusinessProfile = recoverOwnedBusinessProfile;
        function hasRealBusinessAccount() {
          const profile = readJson("emyBusinessProfileDraft", {});
          const role = clean(localStorage.getItem("emyMainSignedInRole")).toLowerCase();
          const name = firstClean([profile && profile.businessName, profile && profile.name, profile && profile.title, currentBusinessName()]);
          const signedEmail = clean(localStorage.getItem("emyMainSignedInEmail")).toLowerCase();
          const businessEmail = firstClean([
            profile && profile.email,
            profile && profile.businessEmail,
            localStorage.getItem("emyBusinessEmail"),
            localStorage.getItem("emyBusinessAccountEmail")
          ]).toLowerCase();
          const ownerCustomerEmail = firstClean([
            profile && profile.ownerCustomerEmail,
            profile && profile.customerOwnerEmail,
            localStorage.getItem("emyBusinessOwnerCustomerEmail")
          ]).toLowerCase();
          const hasRealProfile = !!businessProfileSubmissionSignal(profile) || businessProfileHasRealSurface(profile);
          if (hasRealProfile) return true;
          if (recoverOwnedBusinessProfile()) return true;
          if (!name || /^(this|your)\s+business$/i.test(name)) return false;
          if (!looksDemoText(name) && (localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessProfileKey"))) return true;
          try {
            if (realBusinessDeckRows().length > 0) return true;
          } catch (error) {}
          if (signedEmail && businessEmail && signedEmail !== businessEmail && signedEmail !== ownerCustomerEmail) return false;
          return role === "business" && (signedEmail || businessEmail || ownerCustomerEmail);
        }
        function clearBusinessPreviewStateFromDom() {
          if (typeof window.emyClearBusinessPreviewState === "function") {
            try {
              window.emyClearBusinessPreviewState();
              return;
            } catch (error) {}
          }
          const deck = document.querySelector("[data-business-deck]");
          const preview = document.querySelector("[data-business-preview]");
          const track = document.querySelector("[data-business-preview-track]");
          const profileLink = document.querySelector("[data-business-preview-profile-link]");
          if (preview) {
            preview.dataset.businessPreviewState = "empty";
            preview.dataset.count = "0";
            preview.dataset.index = "0";
            preview.dataset.maxIndex = "0";
            preview.dataset.visibleCount = "0";
            preview.hidden = true;
          }
          if (track) {
            track.dataset.unifiedFeedCards = "true";
            track.dataset.businessPreviewSignature = "empty";
            track.innerHTML = "";
            track.style.removeProperty("--business-preview-offset");
            track.style.transform = "";
            track.style.opacity = "";
            track._previewMoving = false;
            track.classList.remove("is-preview-moving");
          }
          if (profileLink) profileLink.hidden = true;
          document.querySelectorAll("[data-business-preview-prev],[data-business-preview-next]").forEach((button) => {
            button.disabled = true;
            button.hidden = true;
            button.setAttribute("aria-disabled", "true");
          });
          if (deck) deck.classList.remove("is-preview-active");
        }
        function syncBusinessDeckEmptyState() {
          const deck = document.querySelector("[data-business-deck]");
          const stage = deck && deck.querySelector(".business-stage");
          if (!deck || !stage) return;
          const hasEmptyMarker = !!stage.querySelector("[data-emy-real-empty],.emy-real-empty");
          const rawCards = Array.from(stage.querySelectorAll("[data-business-card]"));
          const cards = hasEmptyMarker ? [] : rawCards.filter((card) => {
            if (!card || card.hidden || card.hasAttribute("hidden")) return false;
            if (card.matches && card.matches("[data-emy-real-empty],.emy-real-empty")) return false;
            return true;
          });
          const isEmpty = !cards.length;
          deck.dataset.businessDeckReady = !isEmpty ? "true" : "false";
          deck.classList.toggle("is-empty", isEmpty);
          deck.classList.toggle("is-single-business", !isEmpty && cards.length <= 1);
          deck.setAttribute("data-business-count", String(cards.length));
          deck.querySelectorAll("[data-business-prev],[data-business-next]").forEach((button) => {
            const hide = isEmpty || cards.length <= 1;
            button.hidden = hide;
            button.disabled = hide;
            button.setAttribute("aria-disabled", hide ? "true" : "false");
          });
          const dots = deck.querySelector("[data-business-dots]");
          if (dots) dots.hidden = isEmpty || cards.length <= 1;
          const sideToggle = document.querySelector(".deck-side-toggle");
          if (sideToggle) sideToggle.hidden = isEmpty || cards.length <= 1;
          if (isEmpty) {
            deck.style.minHeight = "";
            stage.style.minHeight = "";
            clearBusinessPreviewStateFromDom();
            if (shouldHoldRealEmptyState()) {
              deck.classList.add("is-hydrating");
              stage.querySelectorAll("[data-emy-real-empty]").forEach((node) => node.remove());
              if (!stage.querySelector("[data-emy-real-loading]")) {
                stage.insertAdjacentHTML("beforeend", '<article class="business-deck-skeleton" data-emy-real-loading aria-hidden="true"><span class="business-skeleton-media"></span><span class="business-skeleton-body"><span class="business-skeleton-avatar"></span><span class="business-skeleton-copy"><span class="business-skeleton-line"></span><span class="business-skeleton-line is-short"></span></span></span><span class="business-skeleton-pills"><span class="business-skeleton-pill"></span><span class="business-skeleton-pill"></span></span></article>');
              }
              scheduleRealEmptyStateRetry();
            } else if (!stage.querySelector("[data-emy-real-empty]")) {
              deck.classList.remove("is-hydrating");
              stage.querySelectorAll("[data-emy-real-loading]").forEach((node) => node.remove());
              stage.insertAdjacentHTML("beforeend", '<p class="emy-real-empty" data-emy-real-empty>No saved businesses yet. Follow a business or create your own profile.</p>');
            }
          } else {
            deck.classList.remove("is-hydrating");
            stage.querySelectorAll("[data-emy-real-empty],[data-emy-real-loading]").forEach((node) => node.remove());
            const preview = document.querySelector("[data-business-preview]");
            if (preview && (preview.hidden || preview.dataset.businessPreviewState === "empty") && deck.dataset.emyBusinessPreviewRestoreQueued !== "true") {
              deck.dataset.emyBusinessPreviewRestoreQueued = "true";
              window.setTimeout(() => {
                delete deck.dataset.emyBusinessPreviewRestoreQueued;
                if (typeof window.emyRenderBusinessDeck === "function") window.emyRenderBusinessDeck();
                else if (typeof window.emyRenderBusinessPreview === "function") window.emyRenderBusinessPreview();
              }, 0);
            }
          }
        }
        window.emySyncBusinessDeckEmptyState = syncBusinessDeckEmptyState;
        function syncBusinessSwitchButtons(root) {
          const scope = root && root.querySelectorAll ? root : document;
          const buttons = [];
          const seenButtons = new Set();
          const addButton = (button) => {
            if (!button || seenButtons.has(button)) return;
            seenButtons.add(button);
            buttons.push(button);
          };
          if (scope.matches && scope.matches("[data-switch-business]")) addButton(scope);
          scope.querySelectorAll("[data-switch-business]").forEach(addButton);
          if (scope !== document) document.querySelectorAll("[data-switch-business]").forEach(addButton);
          if (!buttons.length) return;
          try { if (typeof recoverOwnedBusinessProfile === "function") recoverOwnedBusinessProfile(); } catch (error) {}
          const profile = readJson("emyBusinessProfileDraft", {});
          const reviewState = businessProfileReviewState(profile);
          const hasBusiness = hasRealBusinessAccount();
          buttons.forEach((button) => {
            const title = button.querySelector("strong");
            const detail = button.querySelector("span span");
            if (button.dataset && button.dataset.businessSwitchNavigating === "true") return;
            button.hidden = false;
            button.removeAttribute("aria-hidden");
            button.removeAttribute("aria-busy");
            button.classList.remove("is-switching");
            const mode = hasBusiness ? "switch" : reviewState === "under-review" ? "review" : reviewState === "rejected" ? "rejected" : "create";
            button.dataset.businessSwitchMode = mode;
            if (mode === "review") button.removeAttribute("href");
            else button.setAttribute("href", mode === "switch" ? "emy-business-profile.html?mode=business" : "emy-business-profile.html?setup=1");
            button.setAttribute("aria-pressed", "false");
            button.disabled = mode === "review";
            button.classList.toggle("is-disabled", mode === "review");
            button.setAttribute("aria-label", mode === "switch" ? "Switch to Business" : mode === "review" ? "Business profile under review" : mode === "rejected" ? "Update business registration" : "Create a business account");
            if (title) title.textContent = mode === "switch" ? "Switch to Business" : mode === "review" ? "Business Under Review" : mode === "rejected" ? "Update Business" : "Create a Business Account";
            if (detail) detail.textContent = mode === "switch" ? "Open your business profile area." : mode === "review" ? "EMY is reviewing your business profile." : mode === "rejected" ? "Review the details and submit again." : "Start a business profile when you are ready.";
          });
        }
        function mergeBusiness(map, item, fallbackKey, markCustomer) {
          if (!item || typeof item !== "object") return;
          if (looksDemoItem(item)) return;
          if (!markCustomer && itemCustomerOwned(item)) return;
          const name = itemBusinessName(item) || (markCustomer ? firstClean([item.name, item.title, item.productBusiness, item.storeName]) : "");
          if (!name || looksInternalProfileName(name) || looksCustomerIdentity(name) || looksDemoText(name)) return;
          if (markCustomer && !(item.explicitBusinessProfile === true || item.isBusinessProfile === true || item.profileType === "business") && looksCustomerIdentity(name)) return;
          let key = itemBusinessKey(item, fallbackKey || name) || slug(name);
          if (looksInternalProfileName(key) || looksCustomerIdentity(key)) key = slug(name);
          if (!key || looksDemoText(key)) return;
          if (!markCustomer && !currentBusinessIsRealProfile() && (isCurrentBusiness(name) || isCurrentBusiness(key) || isCurrentBusiness(fallbackKey))) {
            const displayName = localStorage.getItem("emyBusinessDisplayName");
            if (!displayName) return;
          }
          const current = currentBusinessRow();
          if (current && (isCurrentBusiness(key) || isCurrentBusiness(name))) key = current.key;
          const nameKey = slug(name);
          let targetKey = key;
          map.forEach((row, rowKey) => {
            if (targetKey !== key) return;
            const rowNameKey = slug(row && row.name);
            const rowStoredKey = slug(row && row.key || rowKey);
            if ((nameKey && rowNameKey === nameKey) || (key && rowStoredKey === key) || (current && (isCurrentBusiness(rowKey) || isCurrentBusiness(row && row.name)) && (isCurrentBusiness(key) || isCurrentBusiness(name)))) {
              targetKey = rowKey;
            }
          });
          const existing = map.get(targetKey) || {};
          const isCurrent = current && (isCurrentBusiness(key) || isCurrentBusiness(name) || isCurrentBusiness(targetKey));
          const currentAvatar = isCurrent ? currentBusinessAvatarMedia() : { src: "", ref: "" };
          const hasCurrentAvatar = !!(currentAvatar.src || currentAvatar.ref);
          const itemPhoto = itemBusinessPhoto(item);
          const itemPhotoRef = itemBusinessPhotoRef(item);
          const itemHasAuthoritativeMedia = !!((item.explicitBusinessProfile === true || item.isBusinessProfile === true || item.profileType === "business") && (itemPhoto || itemPhotoRef));
          map.set(targetKey, {
            key: existing.key || targetKey || key,
            name: existing.name || name,
            photo: hasCurrentAvatar ? currentAvatar.src : itemHasAuthoritativeMedia ? itemPhoto : existing.photo || itemPhoto || "",
            photoRef: hasCurrentAvatar ? currentAvatar.ref : itemHasAuthoritativeMedia ? itemPhotoRef : existing.photoRef || itemPhotoRef || "",
            category: existing.category || firstClean([item.category, item.businessCategory, item.type, item.tag]),
            sector: existing.sector || firstClean([item.primarySector, item.sector, item.businessSector]),
            service: existing.service || firstClean([item.emyService, item.service, item.providedService, item.subCategory]),
            description: existing.description || itemBusinessDescription(item),
            address: existing.address || firstClean([item.address, item.businessAddress, item.businessAddressLine1]),
            location: existing.location || firstClean([item.location, item.businessLocation, item.address, item.businessAddress, item.distance]),
            postcode: existing.postcode || firstClean([item.postcode, item.businessPostcode]),
            distance: existing.distance || firstClean([item.distance, item.distanceText, item.milesText]),
            latitude: existing.latitude || firstClean([item.latitude, item.lat, item.businessLatitude]),
            longitude: existing.longitude || firstClean([item.longitude, item.lon, item.lng, item.businessLongitude]),
            workingDays: existing.workingDays || firstClean([item.workingDays, item.hours, item.businessHours, item.openingHours]),
            workingDaysSchedule: existing.workingDaysSchedule || (item.workingDaysSchedule && typeof item.workingDaysSchedule === "object" ? item.workingDaysSchedule : null),
            status: existing.status || firstClean([item.openStatus, item.hoursStatus, item.status, item.reviewStatus]),
            statusText: existing.statusText || firstClean([item.statusText, item.openStatusText, item.hoursStatusText]),
            cover: existing.cover || (itemLooksLikeContent(item) ? null : mediaObjectFromSource(item.cover || item.heroCover || item.banner || item.media || item)) || (isCurrent ? currentBusinessCoverMedia() : null),
            isCustomer: existing.isCustomer || !!markCustomer || item.isCustomer === true || item.active === true,
            explicitBusinessProfile: existing.explicitBusinessProfile || item.explicitBusinessProfile === true || item.isBusinessProfile === true || item.profileType === "business"
          });
        }
        function savedBusinessProfileRow() {
          const profile = readJson("emyBusinessProfileDraft", {});
          const displayName = firstClean([localStorage.getItem("emyBusinessDisplayName"), profile && profile.businessName, profile && profile.name, profile && profile.title]);
          if (!displayName || looksInternalProfileName(displayName) || looksCustomerIdentity(displayName) || looksDemoText(displayName)) return null;
          const profileKey = firstClean([localStorage.getItem("emyBusinessProfileKey"), profile && profile.businessKey, profile && profile.key, slug(displayName)]);
          const rawKey = slug(profileKey || displayName);
          const key = rawKey && !looksInternalProfileName(rawKey) && !looksCustomerIdentity(rawKey) ? rawKey : slug(displayName);
          if (!key) return null;
          return {
            key,
            name: displayName,
            photo: currentBusinessPhoto() || firstClean([profile && profile.profilePhoto, profile && profile.photo]),
            photoRef: currentBusinessPhotoRef() || firstClean([profile && profile.profilePhotoRef, profile && profile.photoRef]),
            category: firstClean([profile && profile.category, profile && profile.businessCategory]),
            description: firstClean([profile && profile.description, profile && profile.about]),
            location: firstClean([profile && profile.location, profile && profile.address]),
            isCustomer: false,
            explicitBusinessProfile: true
          };
        }
        function realBusinessRegistry() {
          return cachedValue("realBusinessRegistry", () => {
          const map = new Map();
          const savedBusiness = savedBusinessProfileRow();
          if (savedBusiness) map.set(savedBusiness.key, savedBusiness);
          const current = currentBusinessRow();
          if (current && !looksDemoText(current.name)) {
            const currentKey = businessIdentityKey(current) || current.key;
            const existing = map.get(currentKey) || map.get(current.key) || null;
            map.set(currentKey, mergeBusinessRows(existing, Object.assign({}, current, {
              key: currentKey,
              isCustomer: !!(existing && existing.isCustomer) || current.isCustomer === true,
              active: current.active !== false
            })));
          }
          const customers = readJson("emyCustomerBusinesses", {});
          if (customers && typeof customers === "object" && !Array.isArray(customers)) {
            Object.keys(customers).forEach((key) => {
              const item = customers[key] || {};
              if (customerBusinessRecordIsCurrentOwned(item, key)) return;
              if (item.active === false || item.isCustomer === false || localStorage.getItem("emyCustomerBusiness:" + key) === "0") return;
              mergeBusiness(map, item, key, true);
            });
          }
          try {
            for (let index = 0; index < localStorage.length; index += 1) {
              const storageKey = localStorage.key(index) || "";
              if (storageKey.indexOf("emyCustomerBusiness:") !== 0 || localStorage.getItem(storageKey) !== "1") continue;
              const key = storageKey.slice("emyCustomerBusiness:".length);
              if (currentOwnedBusinessKeyIsOnlyOwner(key)) continue;
              const savedKey = slug(key);
              let matchedKey = map.has(savedKey) ? savedKey : "";
              map.forEach((row, rowKey) => {
                if (matchedKey) return;
                if (isCurrentBusiness(key) && (isCurrentBusiness(rowKey) || isCurrentBusiness(row && row.key) || isCurrentBusiness(row && row.name))) matchedKey = rowKey;
              });
              if (matchedKey && map.has(matchedKey)) {
                const existing = map.get(matchedKey) || {};
                map.set(matchedKey, Object.assign({}, existing, { isCustomer: true, active: existing.active !== false }));
              } else if (!looksDemoText(key) && !looksInternalProfileName(key) && !looksCustomerIdentity(key) && !map.has(savedKey)) {
                map.set(savedKey, { key: savedKey, name: clean(key), photo: "", category: "", description: "", location: "", isCustomer: true });
              }
            }
          } catch (error) {}
          storageArrayKeys.concat(["emyBusinessProductList", "emyBusinessProductReels"]).forEach((key) => {
            if (!isBusinessStorageKey(key)) return;
            const rows = readJson(key, []);
            if (!Array.isArray(rows)) return;
            rows.forEach((item) => mergeBusiness(map, item, itemBusinessKey(item, ""), false));
          });
          return dedupeBusinessRows(Array.from(map.values()).filter((item) => item && item.name && !looksDemoText(item.name)));
          });
        }
        function realBusinessDeckRows() {
          return cachedValue("realBusinessDeckRows", () => {
            let rows = realBusinessRegistry();
            if (!rows.length) {
              const savedBusiness = savedBusinessProfileRow();
              if (savedBusiness) rows = [savedBusiness];
            }
            rows = rows.filter((item) => realBusinessRowAllowedByLocation(item));
            const current = currentBusinessRow();
            if (!current) return rows;
            const currentRows = rows.filter((item) => businessIdentityKey(item) === current.key || isCurrentBusiness(item.key) || isCurrentBusiness(item.name) || slug(item.name) === slug(current.name));
            const explicitOthers = rows.filter((item) => businessIdentityKey(item) !== current.key && item.explicitBusinessProfile);
            if (currentRows.length && !explicitOthers.length) return dedupeBusinessRows([current].concat(currentRows));
            return rows;
          });
        }
        function realCustomerBusinesses() {
          return cachedValue("realCustomerBusinesses", () => {
            const rows = realBusinessRegistry();
            return rows.filter((item) => item.isCustomer);
          });
        }
        function businessByText(value, registryRows) {
          const values = Array.isArray(value) ? value : [value];
          const texts = values.map(clean).filter(Boolean);
          const keys = texts.map(slug).filter(Boolean);
          if (!texts.length && !keys.length) return null;
          const rows = registryRows || realBusinessRegistry();
          return rows.find((item) => {
            const aliases = [
              item.key,
              item.businessKey,
              item.profileKey,
              item.ownerKey,
              item.name,
              item.businessName,
              item.business,
              item.title
            ].map(slug).filter((alias) => alias && !looksInternalProfileName(alias));
            const names = [item.name, item.businessName, item.business, item.title].map(clean).filter(Boolean);
            return keys.some((key) => aliases.some((alias) => key === alias || (key.length > 4 && alias.length > 4 && (key.indexOf(alias) >= 0 || alias.indexOf(key) >= 0)))) ||
              texts.some((text) => names.some((name) => name && text.toLowerCase().indexOf(name.toLowerCase()) >= 0));
          }) || null;
        }
        function businessAvatarForText(value, registryRows) {
          const row = businessByText(value, registryRows);
          if (row && row.photo) return row.photo;
          return currentBusinessIsRealProfile() && isCurrentBusiness(value) ? currentBusinessPhoto() : "";
        }
        function businessAvatarRefForText(value, registryRows) {
          const row = businessByText(value, registryRows);
          if (row && row.photoRef) return row.photoRef;
          return currentBusinessIsRealProfile() && isCurrentBusiness(value) ? currentBusinessPhotoRef() : "";
        }
        function activityDetailHash(item, type) {
          const kind = clean(type).toLowerCase().indexOf("product") >= 0 ? "product" :
            clean(type).toLowerCase().indexOf("clip") >= 0 ? "clip" :
            clean(type).toLowerCase().indexOf("event") >= 0 ? "event" :
            clean(type).toLowerCase().indexOf("job") >= 0 || clean(type).toLowerCase().indexOf("hiring") >= 0 ? "job" :
            clean(type).toLowerCase().indexOf("article") >= 0 ? "article" : "post";
          return "emy-customer-home.html#" + kind + "-" + (slug(firstClean([item && item.id, item && item.title, item && item.businessName])) || "detail");
        }
        function activityDetailHrefForType(type, item) {
          const value = clean(type).toLowerCase();
          if (value.indexOf("clip") >= 0 || value.indexOf("product") >= 0 || value.indexOf("event") >= 0 || value.indexOf("job") >= 0 || value.indexOf("hiring") >= 0 || value.indexOf("article") >= 0) return activityDetailHash(item, type);
          return activityDetailHash(item, "post");
        }
        function activityDetailHref(item, type) {
          const href = firstClean([item && item.href, item && item.url, item && item.link]);
          if (href && !/emy-business-profile\.html|emy-customer-search\.html|emy-customer-feeds\.html/i.test(href)) return href;
          return activityDetailHrefForType(type, item);
        }
        function realItemLooksProductClip(item, marker, fallbackType) {
          if (!item || typeof item !== "object") return false;
          if (item.productClip === true || item.isProductClip === true || item.productClipDetails) return true;
          if (item.productName || item.productTitle || item.productDescription || item.productInfo || item.price || item.priceText) return true;
          const text = clean([
            marker,
            fallbackType,
            item.detailKind,
            item.kind,
            item.type,
            item.tag,
            item.category,
            item.postMode,
            item.createType,
            item.clipKind,
            item.reelKind,
            item.clipType,
            item.reelType,
            item.title,
            item.clipTitle,
            item.description,
            item.text,
            item.search
          ].filter(Boolean).join(" ")).toLowerCase();
          return /product\s*clip|shared\s+a\s+product\s+clip|product\s+video|clip\s+product/.test(text);
        }
        function realActivityDetailAttrs(item) {
          const media = item && item.media || {};
          const mediaItemsAttr = media.items && media.items.length > 1 && window.emyFeedMediaItemsAttribute ? window.emyFeedMediaItemsAttribute(media.items) : "";
          return ' data-card data-open-item-detail data-feed-id="' + escapeAttr(item && item.id || slug(item && item.title)) + '" data-business-key="' + escapeAttr(item && (item.key || item.businessName)) + '" data-profile-photo="' + escapeAttr(item && item.photo || "") + '" data-profile-photo-ref="' + escapeAttr(item && item.photoRef || "") + '" data-detail-kind="' + escapeAttr(item && item.type) + '" data-detail-title="' + escapeAttr(item && item.title) + '" data-detail-description="' + escapeAttr(item && item.description) + '" data-detail-business="' + escapeAttr(item && item.businessName) + '" data-detail-price="' + escapeAttr(item && item.price || "") + '" data-detail-media="' + escapeAttr(media.src || media.ref ? "feed" : "") + '" data-detail-media-src="' + escapeAttr(media.src || "") + '" data-detail-media-ref="' + escapeAttr(media.ref || "") + '" data-detail-media-type="' + escapeAttr(media.type || "") + '" data-detail-poster-src="' + escapeAttr(media.posterSrc || "") + '" data-detail-poster-ref="' + escapeAttr(media.posterRef || "") + '"' + (mediaItemsAttr ? ' data-detail-media-items="' + mediaItemsAttr + '"' : '');
        }
        function openRealRailItemDetailFallback(target) {
          const modal = document.querySelector("[data-item-detail-modal]");
          if (!modal || !target || !target.dataset) return false;
          const data = target.dataset;
          const kindText = clean(data.detailKind || "Details");
          const lowerKind = kindText.toLowerCase();
          if (lowerKind.indexOf("clip") >= 0 || (target.matches && target.matches(".reel-card,.feed-card.is-clip,.feed-clip-card,.feed-product-clip-card,.business-posted-clip-card,.business-preview-card-reel,.search-reel-card,.social-feed-card.is-clip,[data-detail-kind='Clip'],[data-detail-kind='Product Clip']"))) return false;
          const titleText = clean(data.detailTitle || target.textContent || "Details");
          const businessText = clean(data.detailBusiness || data.businessKey || "");
          const descriptionText = clean(data.detailDescription || titleText);
          const mediaSrc = clean(data.detailMediaSrc);
          const mediaRef = clean(data.detailMediaRef);
          const mediaType = clean(data.detailMediaType).toLowerCase();
          const posterSrc = clean(data.detailPosterSrc);
          const posterRef = clean(data.detailPosterRef);
          const profilePhoto = clean(data.profilePhoto);
          const profilePhotoRef = clean(data.profilePhotoRef);
          const setText = (selector, value, hideWhenEmpty) => {
            const node = modal.querySelector(selector);
            if (!node) return;
            node.textContent = value || "";
            if (hideWhenEmpty) node.hidden = !value;
          };
          const close = () => {
            delete modal.dataset.realRailOpenToken;
            modal.classList.remove("is-open", "is-product", "is-business", "is-post", "is-job", "is-event", "is-article", "is-text-post", "is-media-post", "is-owned-post");
            modal.setAttribute("aria-hidden", "true");
            if (document.body) document.body.classList.remove("item-detail-locked");
          };
          const closeButton = modal.querySelector("[data-item-detail-close]");
          if (closeButton && modal.dataset.realRailCloseBound !== "true") {
            modal.dataset.realRailCloseBound = "true";
            closeButton.addEventListener("click", close);
            modal.addEventListener("click", (event) => { if (event.target === modal) close(); });
          }
          modal.classList.toggle("is-product", lowerKind.indexOf("product") >= 0);
          modal.classList.toggle("is-post", lowerKind.indexOf("post") >= 0);
          modal.classList.toggle("is-job", lowerKind.indexOf("job") >= 0 || lowerKind.indexOf("hiring") >= 0);
          modal.classList.toggle("is-event", lowerKind.indexOf("event") >= 0);
          modal.classList.toggle("is-article", lowerKind.indexOf("article") >= 0);
          setText("[data-item-detail-kind]", kindText, false);
          setText("[data-item-detail-title]", titleText, false);
          setText("[data-item-detail-business]", businessText, true);
          setText("[data-item-detail-description]", descriptionText, true);
          setText("[data-item-detail-price]", clean(data.detailPrice), true);
          const businessAvatar = modal.querySelector("[data-item-business-avatar]");
          if (businessAvatar) {
            const hasAvatar = !!(profilePhoto || profilePhotoRef);
            businessAvatar.className = "item-business-avatar " + (hasAvatar ? "has-image" : "");
            businessAvatar.innerHTML = hasAvatar
              ? '<img' + (profilePhoto ? ' src="' + escapeAttr(profilePhoto) + '"' : '') + (profilePhotoRef ? ' data-emy-media-ref="' + escapeAttr(profilePhotoRef) + '"' : '') + ' alt="' + escapeAttr(businessText || "Business") + ' profile picture" />'
              : '<span data-item-business-avatar-initial>' + escapeHtml((businessText.charAt(0) || "B").toUpperCase()) + '</span>';
            if (profilePhotoRef && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(businessAvatar);
          }
          const meta = modal.querySelector("[data-item-detail-meta]");
          if (meta) {
            meta.hidden = false;
            meta.innerHTML = '<span>' + escapeHtml(kindText) + '</span>' + (businessText ? '<span>' + escapeHtml(businessText) + '</span>' : "");
          }
          const art = modal.querySelector("[data-item-detail-media]");
          if (art) {
            art.className = "item-detail-art";
            art.hidden = !(mediaSrc || mediaRef);
            art.innerHTML = "";
            if (!art.hidden) {
              if (mediaType === "video") {
                art.innerHTML = '<video controls playsinline preload="metadata"' + (mediaSrc ? ' src="' + escapeAttr(mediaSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + escapeAttr(mediaRef) + '"' : '') + (posterSrc ? ' poster="' + escapeAttr(posterSrc) + '"' : '') + (posterRef ? ' data-emy-poster-ref="' + escapeAttr(posterRef) + '"' : '') + '></video>';
              } else {
                art.innerHTML = '<img' + (mediaSrc ? ' src="' + escapeAttr(mediaSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + escapeAttr(mediaRef) + '"' : '') + ' alt="" />';
              }
              if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(art);
            }
          }
          const productPanel = modal.querySelector("[data-item-product-panel]");
          const showProductPanel = lowerKind.indexOf("product") >= 0 || lowerKind.indexOf("post") >= 0 || lowerKind.indexOf("article") >= 0;
          if (productPanel) productPanel.hidden = !showProductPanel;
          setText("[data-item-product-seller]", businessText || "Business", false);
          setText("[data-item-product-seller-status]", kindText, false);
          const productSpecs = modal.querySelector("[data-item-product-specs]");
          if (productSpecs) {
            productSpecs.hidden = lowerKind.indexOf("product") < 0;
            productSpecs.innerHTML = '<div><dt>Item</dt><dd>' + escapeHtml(titleText) + '</dd></div>' + (clean(data.detailPrice) ? '<div><dt>Price</dt><dd>' + escapeHtml(clean(data.detailPrice)) + '</dd></div>' : "") + (businessText ? '<div><dt>Business</dt><dd>' + escapeHtml(businessText) + '</dd></div>' : "");
          }
          const openToken = String(Date.now()) + "-" + Math.random().toString(36).slice(2);
          modal.dataset.realRailOpenToken = openToken;
          const markOpen = () => {
            if (modal.dataset.realRailOpenToken !== openToken) return;
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            if (document.body) document.body.classList.add("item-detail-locked");
          };
          markOpen();
          [0, 80, 250, 650].forEach((delay) => window.setTimeout(markOpen, delay));
          if (window.requestAnimationFrame) window.requestAnimationFrame(markOpen);
          return true;
        }
        window.emyOpenRealRailItemDetailFallback = openRealRailItemDetailFallback;
        function loadRealRailItemDetailEnhancer(target) {
          if (!target || typeof window.emyOpenItemDetail === "function") {
            if (target && typeof window.emyOpenItemDetail === "function") window.setTimeout(() => window.emyOpenItemDetail(target), 0);
            return;
          }
          const replay = () => {
            const modal = document.querySelector("[data-item-detail-modal]");
            if (!modal || (!modal.classList.contains("is-open") && !modal.dataset.realRailOpenToken) || typeof window.emyOpenItemDetail !== "function") return;
            try { window.emyOpenItemDetail(target); } catch (error) {}
          };
          const existing = document.querySelector('script[data-emy-customer-home-item-detail]');
          if (existing) {
            existing.addEventListener("load", replay, { once: true });
            return;
          }
          const script = document.createElement("script");
          script.src = "assets/emy-customer-home-item-detail.js?v=d83ec68f8f32";
          script.async = true;
          script.setAttribute("data-emy-customer-home-item-detail", "");
          script.onload = replay;
          script.onerror = () => {};
          document.head.appendChild(script);
        }
        function setupRealRailItemDetailLinks() {
          if (window.__emyRealRailItemDetailLinksInstalled) return;
          window.__emyRealRailItemDetailLinksInstalled = true;
          const interactiveDetailClickSelector = "a[href],button,input,textarea,select,label,summary,[role=button],[contenteditable=true],[data-feed-social-actions],.feed-actions,.social-feed-actions,.feed-comments,.feed-comment-form,.feed-comment-reply-form,[data-feed-options-menu],.emy-video-controls,.emy-video-volume-wrap,[data-emy-video-play],[data-emy-video-mute],[data-emy-video-fullscreen],[data-emy-video-progress],[data-feed-carousel-dot],[data-feed-carousel-prev],[data-feed-carousel-next]";
          function realRailClipCard(target) {
            const node = target && target.closest ? target : null;
            if (!node) return null;
            const card = node.closest(".reel-card,.feed-card.is-clip,.feed-clip-card,.feed-product-clip-card,.business-posted-clip-card,.business-preview-card-reel,.search-reel-card,.social-feed-card.is-clip,[data-detail-kind='Clip'],[data-detail-kind='Product Clip']");
            if (!card) return null;
            const kind = clean(card.dataset && card.dataset.detailKind).toLowerCase();
            return kind.indexOf("clip") >= 0 ||
              card.classList.contains("is-clip") ||
              card.classList.contains("reel-card") ||
              card.classList.contains("feed-clip-card") ||
              card.classList.contains("feed-product-clip-card") ||
              card.classList.contains("business-posted-clip-card") ||
              card.classList.contains("business-preview-card-reel") ||
              card.classList.contains("search-reel-card")
                ? card
                : null;
          }
          function realRailBusinessProfileTarget(target) {
            const node = target && target.closest ? target : null;
            if (!node) return null;
            const card = node.closest(".social-feed-quote,.feed-business-profile-card,.search-business-profile-card,.business-card.is-profile,[data-business-profile-card],[data-detail-kind]");
            if (!card || card.closest("[data-item-detail-modal],.item-detail-modal,[data-clip-viewer-modal],.clip-viewer-modal")) return null;
            if (card.closest("[data-business-deck]")) return null;
            const data = card.dataset || {};
            const kind = clean(data.detailKind).toLowerCase();
            const classes = card.classList;
            const isProfileCard = !!(classes && (classes.contains("feed-business-profile-card") || classes.contains("search-business-profile-card") || (classes.contains("business-card") && classes.contains("is-profile")))) || card.hasAttribute("data-business-profile-card");
            if (!isProfileCard) {
              if (!kind || /(product|clip|event|job|hiring|article|post|repost)/.test(kind)) return null;
              if (!(kind === "business" || kind === "profile" || kind.indexOf("business profile") >= 0 || kind.indexOf("this business") >= 0)) return null;
            }
            let key = clean(data.businessLink || data.businessKey || data.detailBusinessKey);
            if (!key || /^(business|profile|this-business)$/i.test(key)) {
              const titleNode = card.querySelector(".social-feed-quote-title,h3,strong");
              key = slug(data.detailBusiness || data.detailTitle || (titleNode && titleNode.textContent) || "");
            }
            if (!key || key === "customer-profile") return null;
            return { card, key };
          }
          function openRealRailBusinessProfile(target, event) {
            const match = realRailBusinessProfileTarget(target);
            if (!match) return false;
            event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
            try { localStorage.setItem("emySelectedBusinessProfileKey", match.key); } catch (error) {}
            window.location.href = "emy-business-profile.html?business=" + encodeURIComponent(match.key);
            return true;
          }
          const openRailItem = (event) => {
            const businessCard = event.target && event.target.closest ? event.target.closest(".business-card.is-profile,.feed-business-profile-card,.search-business-profile-card,[data-business-profile-card]") : null;
            if (businessCard && document.documentElement.contains(businessCard)) {
              if (businessCard.closest("[data-business-deck]")) return;
              const interactive = event.target.closest(interactiveDetailClickSelector + ",[data-business-cover-controls]");
              if (!(interactive && interactive !== businessCard) && openRealRailBusinessProfile(businessCard, event)) return;
            }
            const target = event.target && event.target.closest ? event.target.closest("[data-open-item-detail]") : null;
            if (!target || !document.documentElement.contains(target)) return;
            const interactive = event.target.closest(interactiveDetailClickSelector);
            if (interactive && interactive !== target) return;
            if (openRealRailBusinessProfile(target, event)) return;
            const clipCard = realRailClipCard(target);
            if (clipCard) {
              if (typeof window.emyOpenClipViewer === "function" && window.emyOpenClipViewer(clipCard)) {
                event.preventDefault();
                event.stopPropagation();
                if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                return;
              }
              if (typeof window.emyOpenItemDetail === "function" && window.emyOpenItemDetail(clipCard)) {
                event.preventDefault();
                event.stopPropagation();
                if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                return;
              }
            }
            event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
            if (typeof window.emyOpenItemDetail === "function" && window.emyOpenItemDetail(target)) return;
            if (openRealRailItemDetailFallback(target)) loadRealRailItemDetailEnhancer(target);
          };
          window.addEventListener("click", openRailItem, true);
          document.addEventListener("click", openRailItem, true);
        }
        function setupEarlyCustomerHomeClickBridge() {
          if (window.__emyCustomerHomeEarlyClickBridgeInstalled) return;
          if (!/emy-customer-home\.html/i.test(location.pathname || "")) return;
          window.__emyCustomerHomeEarlyClickBridgeInstalled = true;
          const deckInteractiveSelector = "a[href],button,input,textarea,select,label,[role='button'],[data-business-cover-controls],[data-feed-options],[data-feed-options-menu]";
          function stopEarlyEvent(event) {
            if (!event) return;
            event.__emyCustomerHomeEarlyClickHandled = true;
            event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          }
          function cleanBridgeRadius(value) {
            const numeric = Number(value);
            return Number.isFinite(numeric) ? Math.min(10, Math.max(1, Math.round(numeric))) : 5;
          }
          function applyRadiusVisual(button) {
            const radius = cleanBridgeRadius(button && button.dataset ? button.dataset.radius : "");
            document.querySelectorAll("[data-radius]").forEach((item) => {
              const active = cleanBridgeRadius(item.dataset && item.dataset.radius) === radius;
              item.classList.toggle("is-active", active);
              if (item.hasAttribute("aria-pressed")) item.setAttribute("aria-pressed", active ? "true" : "false");
            });
            const currentRadiusValue = document.querySelector("[data-current-radius-value]");
            if (currentRadiusValue) currentRadiusValue.textContent = radius + (radius === 1 ? " mile" : " miles");
            return radius;
          }
          function wakeCustomerHomeRuntime() {
            try {
              if (typeof window.__emyLoadCustomerHomeRuntimeNow === "function") window.__emyLoadCustomerHomeRuntimeNow();
            } catch (error) {}
          }
          function readEarlyAskLocation() {
            try {
              const stored = localStorage.getItem("emyAskLocation");
              return stored ? JSON.parse(stored) || {} : {};
            } catch (error) {
              return {};
            }
          }
          function readEarlyPlaces() {
            try {
              const stored = localStorage.getItem("emyCustomerSavedPlaces");
              const parsed = stored ? JSON.parse(stored) : [];
              if (!Array.isArray(parsed)) return [];
              return parsed
                .filter((place) => place && String(place.address || "").trim())
                .map((place) => ({
                  id: String(place.id || Date.now() + Math.random()),
                  label: clean(place.label || "Home") || "Home",
                  address: clean(place.address),
                  radius: cleanBridgeRadius(place.radius),
                  latitude: Number.isFinite(Number(place.latitude)) ? Number(place.latitude) : null,
                  longitude: Number.isFinite(Number(place.longitude)) ? Number(place.longitude) : null,
                  resolvedAddress: clean(place.resolvedAddress || "")
                }));
            } catch (error) {
              return [];
            }
          }
          function writeEarlyPlaces(places) {
            try { localStorage.setItem("emyCustomerSavedPlaces", JSON.stringify(Array.isArray(places) ? places : [])); } catch (error) {}
          }
          function writeEarlyAskLocation(nextState) {
            const places = readEarlyPlaces();
            const current = readEarlyAskLocation();
            const location = clean(nextState && nextState.location) || clean(current.location) || "Near me";
            const radius = cleanBridgeRadius(nextState && nextState.radius || current.radius || 5);
            const latitude = Number.isFinite(Number(nextState && nextState.latitude)) ? Number(nextState.latitude) : null;
            const longitude = Number.isFinite(Number(nextState && nextState.longitude)) ? Number(nextState.longitude) : null;
            const locationSource = clean(nextState && nextState.locationSource || current.locationSource);
            const state = {
              location,
              radius,
              savedLocations: places.map((place) => place.address).filter(Boolean),
              latitude,
              longitude,
              locationLabel: shortEarlyLocationLabel(location),
              locationSource: locationSource === "current" || locationSource === "saved" ? locationSource : ""
            };
            try { localStorage.setItem("emyAskLocation", JSON.stringify(state)); } catch (error) {}
            try {
              window.dispatchEvent(new CustomEvent("emy:location-changed", { detail: state }));
            } catch (error) {}
            return state;
          }
          function shortEarlyLocationLabel(value) {
            const text = clean(value);
            if (!text || text === "Near me" || text === "Current Location") return "Current Location";
            const parts = text.split(",").map((part) => clean(part)).filter(Boolean);
            return parts.slice(0, 2).join(", ") || text;
          }
          function findEarlyPlace(placeId, button) {
            const id = clean(placeId);
            const fromStorage = readEarlyPlaces().find((place) => place.id === id);
            if (fromStorage) return fromStorage;
            const card = button && button.closest ? button.closest(".place-card") : null;
            if (!card) return null;
            const label = clean((card.querySelector("strong") || {}).textContent) || "Home";
            const address = clean((card.querySelector(".place-main span") || card.querySelector("span") || {}).textContent);
            return address ? { id, label, address, radius: cleanBridgeRadius(window.__EMY_PENDING_LOCATION_RADIUS__ || 5), latitude: null, longitude: null } : null;
          }
          function setEarlyLocationSheetOpen(isOpen) {
            const sheet = document.querySelector("[data-location-sheet]");
            if (!sheet) return false;
            sheet.classList.toggle("is-open", !!isOpen);
            sheet.setAttribute("aria-hidden", isOpen ? "false" : "true");
            if (!isOpen) {
              try {
                const hashRoute = String(window.location.hash || "").replace("#", "").trim().toLowerCase();
                if ((hashRoute === "location" || hashRoute === "emy-location") && window.history && typeof window.history.replaceState === "function") {
                  const url = new URL(window.location.href);
                  url.hash = "";
                  history.replaceState(null, "", url.pathname + url.search);
                }
              } catch (error) {}
            }
            return true;
          }
          function setEarlyLocationFormOpen(isOpen, place) {
            const form = document.querySelector("[data-location-form]");
            const add = document.querySelector("[data-location-add]");
            const input = document.querySelector("[data-place-input]");
            const status = document.querySelector("[data-location-status]");
            if (!form) return false;
            form.classList.toggle("is-open", !!isOpen);
            if (add) {
              add.textContent = isOpen ? "Close Add +" : "Add +";
              add.setAttribute("aria-label", isOpen ? "Close add location form" : "Add location");
            }
            if (input) input.value = isOpen && place ? place.address : "";
            if (status) status.textContent = "";
            const activeLabel = isOpen && place ? place.label : "Home";
            document.querySelectorAll("[data-place-tab]").forEach((tab) => {
              tab.classList.toggle("is-active", clean(tab.dataset && tab.dataset.placeTab) === activeLabel);
            });
            if (isOpen && place) {
              document.querySelectorAll("[data-radius]").forEach((button) => {
                const active = cleanBridgeRadius(button.dataset && button.dataset.radius) === cleanBridgeRadius(place.radius);
                button.classList.toggle("is-active", active);
              });
            }
            if (isOpen && input) window.setTimeout(() => input.focus(), 50);
            return true;
          }
          function selectEarlyPlace(place) {
            if (!place || !place.address) return false;
            const state = writeEarlyAskLocation({
              location: place.address,
              radius: place.radius,
              latitude: place.latitude,
              longitude: place.longitude,
              locationSource: "saved"
            });
            const label = document.querySelector("[data-location-label]");
            if (label) label.textContent = shortEarlyLocationLabel(state.location);
            document.querySelectorAll(".place-card").forEach((card) => card.classList.remove("is-selected"));
            const rowButton = document.querySelector('[data-select-place="' + (window.CSS && CSS.escape ? CSS.escape(place.id) : place.id) + '"]');
            const row = rowButton && rowButton.closest ? rowButton.closest(".place-card") : null;
            if (row) row.classList.add("is-selected");
            setEarlyLocationSheetOpen(false);
            return true;
          }
          function deleteEarlyPlace(placeId) {
            const id = clean(placeId);
            const places = readEarlyPlaces();
            const deleted = places.find((place) => place.id === id);
            if (!deleted) return false;
            const remaining = places.filter((place) => place.id !== id);
            writeEarlyPlaces(remaining);
            const button = document.querySelector('[data-delete-place="' + (window.CSS && CSS.escape ? CSS.escape(id) : id) + '"]');
            const row = button && button.closest ? button.closest(".place-card") : null;
            if (row) row.remove();
            const empty = document.querySelector("[data-location-empty]");
            if (empty) empty.hidden = remaining.length > 0;
            const ask = readEarlyAskLocation();
            if (clean(ask.location) === deleted.address) writeEarlyAskLocation({ location: "Near me", radius: 5, latitude: null, longitude: null, locationSource: "" });
            return true;
          }
          function handleEarlyUseCurrentLocation(button) {
            const status = document.querySelector("[data-location-status]");
            const title = document.querySelector("[data-current-location-title]");
            const detail = document.querySelector("[data-current-location-detail]");
            const currentRadius = document.querySelector("[data-current-radius]");
            if (button) {
              button.classList.add("is-loading");
              button.setAttribute("aria-busy", "true");
            }
            if (title) title.textContent = "Finding Current Location";
            if (detail) detail.textContent = "Waiting for browser permission and GPS signal.";
            if (status) status.textContent = "Requesting your device location...";
            if (currentRadius) currentRadius.hidden = false;
            window.__EMY_PENDING_LOCATION_USE_CURRENT__ = true;
            if (!navigator.geolocation) {
              if (status) status.textContent = "GPS is not available in this browser.";
              wakeCustomerHomeRuntime();
              return true;
            }
            try {
              navigator.geolocation.getCurrentPosition((position) => {
                const coords = position && position.coords ? position.coords : {};
                const latitude = Number(coords.latitude);
                const longitude = Number(coords.longitude);
                if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
                  if (status) status.textContent = "GPS could not detect your location. Check browser location permission and try again.";
                  return;
                }
                const radius = cleanBridgeRadius(window.__EMY_PENDING_LOCATION_RADIUS__ || 5);
                const location = "GPS " + latitude.toFixed(5) + ", " + longitude.toFixed(5);
                const state = writeEarlyAskLocation({ location, radius, latitude, longitude, locationSource: "current" });
                const label = document.querySelector("[data-location-label]");
                if (label) label.textContent = shortEarlyLocationLabel(state.location);
                if (button) {
                  button.classList.remove("is-loading");
                  button.classList.add("is-selected");
                  button.setAttribute("aria-pressed", "true");
                  button.setAttribute("aria-busy", "false");
                }
                if (title) title.textContent = "Using Current Location";
                if (detail) detail.textContent = "Within " + radius + (radius === 1 ? " mile" : " miles") + " of " + shortEarlyLocationLabel(location) + ".";
                if (status) status.textContent = "Live GPS is on. EMY will update as you move.";
                wakeCustomerHomeRuntime();
              }, () => {
                if (button) {
                  button.classList.remove("is-loading");
                  button.setAttribute("aria-busy", "false");
                }
                if (status) status.textContent = "GPS could not detect your location. Check browser location permission and try again.";
                wakeCustomerHomeRuntime();
              }, { enableHighAccuracy: true, timeout: 18000, maximumAge: 0 });
            } catch (error) {
              if (status) status.textContent = "GPS could not detect your location. Check browser location permission and try again.";
            }
            return true;
          }
          function handleEarlyLocationSheetControl(event, target) {
            const sheet = target.matches && target.matches("[data-location-sheet]") ? target : target.closest("[data-location-sheet]");
            if (!sheet) return false;
            const close = target.closest("[data-location-close]");
            if (target === sheet || close) {
              stopEarlyEvent(event);
              if (typeof window.emySetLocationSheetOpen === "function") {
                try { window.emySetLocationSheetOpen(false); } catch (error) {}
              } else {
                setEarlyLocationSheetOpen(false);
              }
              wakeCustomerHomeRuntime();
              return true;
            }
            const add = target.closest("[data-location-add]");
            if (add) {
              stopEarlyEvent(event);
              if (typeof window.emyOpenLocationForm === "function" && typeof window.emyCloseLocationForm === "function") {
                try {
                  const form = document.querySelector("[data-location-form]");
                  if (form && form.classList.contains("is-open")) window.emyCloseLocationForm();
                  else window.emyOpenLocationForm(null);
                } catch (error) {}
              } else {
                const form = document.querySelector("[data-location-form]");
                setEarlyLocationFormOpen(!(form && form.classList.contains("is-open")), null);
              }
              wakeCustomerHomeRuntime();
              return true;
            }
            const current = target.closest("[data-use-current-location]");
            if (current) {
              stopEarlyEvent(event);
              if (typeof window.emyUseCurrentLocation === "function") {
                try { window.emyUseCurrentLocation(); } catch (error) {}
              } else {
                handleEarlyUseCurrentLocation(current);
              }
              wakeCustomerHomeRuntime();
              return true;
            }
            const tab = target.closest("[data-place-tab]");
            if (tab) {
              stopEarlyEvent(event);
              document.querySelectorAll("[data-place-tab]").forEach((item) => item.classList.toggle("is-active", item === tab));
              wakeCustomerHomeRuntime();
              return true;
            }
            const select = target.closest("[data-select-place]");
            if (select) {
              stopEarlyEvent(event);
              if (typeof window.emySelectSavedLocation === "function") {
                try { window.emySelectSavedLocation(select.dataset.selectPlace); } catch (error) {}
              } else {
                selectEarlyPlace(findEarlyPlace(select.dataset.selectPlace, select));
              }
              wakeCustomerHomeRuntime();
              return true;
            }
            const edit = target.closest("[data-edit-place]");
            if (edit) {
              stopEarlyEvent(event);
              const place = findEarlyPlace(edit.dataset.editPlace, edit);
              if (typeof window.emyOpenSavedLocationForm === "function") {
                try { window.emyOpenSavedLocationForm(edit.dataset.editPlace); } catch (error) {}
              } else {
                setEarlyLocationFormOpen(true, place);
              }
              wakeCustomerHomeRuntime();
              return true;
            }
            const remove = target.closest("[data-delete-place]");
            if (remove) {
              stopEarlyEvent(event);
              if (typeof window.emyDeleteSavedLocation === "function") {
                try { window.emyDeleteSavedLocation(remove.dataset.deletePlace); } catch (error) {}
              } else {
                deleteEarlyPlace(remove.dataset.deletePlace);
              }
              wakeCustomerHomeRuntime();
              return true;
            }
            return false;
          }
          function openEarlyLocationSheet(event, button) {
            if (!button || !button.matches || !button.matches("[data-location]")) return false;
            const sheet = document.querySelector("[data-location-sheet]");
            if (!sheet) return false;
            stopEarlyEvent(event);
            sheet.classList.add("is-open");
            sheet.setAttribute("aria-hidden", "false");
            window.__EMY_PENDING_LOCATION_SHEET_OPEN__ = true;
            wakeCustomerHomeRuntime();
            return true;
          }
          function handleEarlyBusinessSwitch(event, button) {
            if (!button || !button.matches || !button.matches("[data-switch-business]")) return false;
            if (button.classList.contains("is-switching")) {
              stopEarlyEvent(event);
              return true;
            }
            let switchMode = button.dataset && button.dataset.businessSwitchMode || "loading";
            try {
              if ((switchMode === "create" || switchMode === "rejected" || switchMode === "loading") && recoverOwnedBusinessProfile()) {
                switchMode = "switch";
                button.dataset.businessSwitchMode = "switch";
              }
            } catch (error) {}
            if (switchMode === "review") {
              stopEarlyEvent(event);
              return true;
            }
            let hasBusiness = false;
            try { hasBusiness = hasRealBusinessAccount(); } catch (error) {}
            const creatingBusiness = switchMode === "create" || switchMode === "rejected" || (switchMode === "loading" && !hasBusiness);
            const target = creatingBusiness ? "emy-business-profile.html?setup=1" : "emy-business-profile.html?mode=business";
            stopEarlyEvent(event);
            button.dataset.businessSwitchNavigating = "true";
            button.classList.add("is-switching");
            button.setAttribute("aria-pressed", "true");
            try {
              const signedRole = String(localStorage.getItem("emyMainSignedInRole") || "").toLowerCase();
              const signedEmail = String(localStorage.getItem("emyMainSignedInEmail") || "").trim();
              if (creatingBusiness) {
                localStorage.setItem("emyBusinessRegistrationFromCustomer", "1");
                localStorage.setItem("emyMainPendingSignupRole", "business");
                if (signedRole === "customer" && signedEmail) {
                  localStorage.setItem("emyBusinessRegistrationCustomerEmail", signedEmail);
                  if (!localStorage.getItem("emyMainPendingSignupEmail")) localStorage.setItem("emyMainPendingSignupEmail", signedEmail);
                }
              } else {
                localStorage.setItem("emyMainSignedInRole", "business");
              }
            } catch (error) {}
            window.location.href = target;
            return true;
          }
          function handleRadiusButton(event, button) {
            if (!button || !button.closest || !button.closest("[data-location-sheet]")) return false;
            const radius = applyRadiusVisual(button);
            const isCurrentRadiusControl = Boolean(button.closest("[data-current-radius]"));
            window.__EMY_PENDING_LOCATION_RADIUS__ = String(radius);
            window.__EMY_PENDING_LOCATION_RADIUS_CURRENT__ = isCurrentRadiusControl;
            stopEarlyEvent(event);
            if (typeof window.emyApplyLocationRadiusClick === "function") {
              try {
                if (window.emyApplyLocationRadiusClick(radius, { sourceButton: button, currentRadius: isCurrentRadiusControl })) {
                  delete window.__EMY_PENDING_LOCATION_RADIUS__;
                  delete window.__EMY_PENDING_LOCATION_RADIUS_CURRENT__;
                }
              } catch (error) {}
            }
            return true;
          }
          function deckCardKey(card) {
            if (!card) return "";
            const data = card.dataset || {};
            const titleNode = card.querySelector && card.querySelector("h3 a,h3,strong");
            return clean(data.businessKey || data.businessLink || data.detailBusinessKey || (titleNode && titleNode.textContent) || "");
          }
          function prepareBusinessDeckCardForDetail(card) {
            if (!card || !card.dataset) return;
            const titleNode = card.querySelector && card.querySelector(".business-title-link,h3,strong");
            const descriptionNode = card.querySelector && card.querySelector(".business-description,.body p,p");
            const addressNode = card.querySelector && card.querySelector(".business-address");
            const statusNode = card.querySelector && card.querySelector(".status");
            const distanceNode = card.querySelector && card.querySelector(".distance");
            const title = clean((titleNode && titleNode.textContent) || card.dataset.detailTitle || card.dataset.detailBusiness || "Business");
            const description = clean((descriptionNode && descriptionNode.textContent) || card.dataset.detailDescription || "Open this business to see profile details, products, posts, clips, images and videos.");
            const meta = [statusNode && statusNode.textContent, distanceNode && distanceNode.textContent, addressNode && addressNode.textContent].map(clean).filter(Boolean).join("|");
            card.setAttribute("data-card", "");
            card.setAttribute("data-open-item-detail", "");
            if (!card.dataset.detailKind) card.dataset.detailKind = "Business";
            if (!card.dataset.detailTitle) card.dataset.detailTitle = title || "Business";
            if (!card.dataset.detailBusiness) card.dataset.detailBusiness = title || "Business";
            if (!card.dataset.detailDescription) card.dataset.detailDescription = description || card.dataset.detailTitle;
            if (!card.dataset.detailMeta) card.dataset.detailMeta = meta;
          }
          function openBusinessDeckCardDetail(card) {
            if (!card) return false;
            if (typeof window.emyOpenBusinessDeckCardInfo === "function") {
              try { if (window.emyOpenBusinessDeckCardInfo(card)) return true; } catch (error) {}
            }
            prepareBusinessDeckCardForDetail(card);
            const open = () => {
              if (typeof window.emyOpenItemDetail === "function") return window.emyOpenItemDetail(card);
              return false;
            };
            if (open()) return true;
            let script = document.querySelector('script[data-emy-customer-home-item-detail]');
            if (!script) {
              script = document.createElement("script");
              script.src = "assets/emy-customer-home-item-detail.js?v=d83ec68f8f32";
              script.defer = true;
              script.setAttribute("data-emy-customer-home-item-detail", "");
              (document.body || document.documentElement).appendChild(script);
            }
            script.addEventListener("load", open, { once: true });
            window.setTimeout(open, 160);
            return true;
          }
          function handleBusinessDeckCard(event, card) {
            if (!card || !card.closest || !card.closest("[data-business-deck]")) return false;
            if (card.getAttribute("aria-hidden") === "true") return false;
            const target = event && event.target && event.target.closest ? event.target : null;
            const interactive = target && target.closest(deckInteractiveSelector);
            const allowedBusinessLink = interactive && interactive.matches && (
              interactive.matches(".business-title-link,.business-avatar,.business-media-chip,[data-business-profile-link]") ||
              interactive.closest(".photo")
            );
            if (interactive && interactive !== card && !(allowedBusinessLink && interactive.closest("[data-business-deck]"))) return false;
            stopEarlyEvent(event);
            openBusinessDeckCardDetail(card);
            return true;
          }
          function handleEarlyClick(event) {
            if (!event || event.__emyCustomerHomeEarlyClickHandled) return;
            const target = event.target && event.target.closest ? event.target : null;
            if (!target) return;
            const businessSwitch = target.closest("[data-switch-business]");
            if (businessSwitch && handleEarlyBusinessSwitch(event, businessSwitch)) return;
            const locationButton = target.closest("[data-location]");
            if (locationButton && openEarlyLocationSheet(event, locationButton)) return;
            if (handleEarlyLocationSheetControl(event, target)) return;
            const radiusButton = target.closest("[data-radius]");
            if (radiusButton && handleRadiusButton(event, radiusButton)) return;
            const businessCard = target.closest("[data-business-card]");
            if (businessCard) handleBusinessDeckCard(event, businessCard);
          }
          window.addEventListener("click", handleEarlyClick, true);
          document.addEventListener("click", handleEarlyClick, true);
        }
        setupEarlyCustomerHomeClickBridge();
        function activitySourceItemLooksCustomerOwned(item, ownerName) {
          if (!item || typeof item !== "object") return false;
          const roleText = firstClean([item.owner, item.ownerType, item.repostedByType, item.actorType, item.createdAs, item.accountType, item.role, item.authorRole, item.authorType, item.postedByType, item.createdByType, item.sourceType]).toLowerCase();
          const hrefText = firstClean([item.profileHref, item.href, item.repostedByHref]).toLowerCase();
          const keyText = slug(firstClean([item.businessKey, item.key, item.ownerKey, item.profileKey, item.repostedByKey]));
          const idText = firstClean([item.id, item.rawId, item.feedId, item.postId]).toLowerCase();
          const explicitCustomerContext = roleText === "customer" ||
            roleText === "buyer" ||
            roleText.indexOf("customer") >= 0 ||
            hrefText.indexOf("emy-customer-profile") >= 0 ||
            keyText === "customer-profile" ||
            item.customerKey ||
            item.customerName ||
            item.customerDisplayName;
          const explicitBusinessContext = !explicitCustomerContext && (
            roleText.indexOf("business") >= 0 ||
            roleText.indexOf("merchant") >= 0 ||
            roleText.indexOf("seller") >= 0 ||
            hrefText.indexOf("emy-business-profile") >= 0 ||
            (!!keyText && keyText !== "customer-profile") ||
            idText.indexOf("business-") === 0
          );
          if ((item.isUserPost === true || item.mine === true || item.own === true || item.my === true) && !explicitBusinessContext) return true;
          if (roleText === "customer" || roleText === "buyer" || roleText.indexOf("customer") >= 0) return true;
          if (hrefText.indexOf("emy-customer-profile") >= 0) return true;
          if (keyText === "customer-profile") return true;
          if (idText.indexOf("customer-") === 0 || (idText.indexOf("user-feed-") === 0 && !explicitBusinessContext) || (idText.indexOf("feed-create-") === 0 && !explicitBusinessContext)) return true;
          if (item.customerKey || item.customerName || item.customerDisplayName) return true;
          const nameText = firstClean([ownerName, item.businessName, item.business, item.ownerName, item.actor, item.authorName, item.createdByName, item.repostedBy, item.name]);
          return !explicitBusinessContext && looksCustomerIdentity(nameText);
        }
        function realActivityRows() {
          return cachedValue("realActivityRows", () => {
          const rows = [];
          const sources = [
            ["emyBusinessProducts", "Product"], ["emyBusinessProductList", "Product"], ["emyBusinessProductPosts", "Product"], ["emyFeedCreatedProducts", "Product"],
            ["emyBusinessClips", "Clip"], ["emyBusinessReels", "Clip"], ["emyBusinessProductReels", "Product Clip"], ["emyFeedCreatedClips", "Clip"], ["emyFeedCreatedClipsByBusiness", "Clip"], ["emyUploadedClips", "Clip"],
            ["emyBusinessPosts", "Post"], ["emyBusinessFeedPosts", "Post"], ["emyFeedCreatedPosts", "Post"],
            ["emyBusinessArticles", "Article"], ["emyBusinessArticlePosts", "Article"], ["emyFeedCreatedArticles", "Article"],
            ["emyBusinessEvents", "Event"], ["emyBusinessEventPosts", "Event"],
            ["emyBusinessJobs", "Job"], ["emyBusinessJobPosts", "Job"],
            ["emyFeedCreatedEvents", "Event"], ["emyFeedCreatedJobs", "Job"]
          ];
          sources.forEach(([key, fallbackType]) => {
            const items = readJson(key, []);
            if (!Array.isArray(items)) return;
            items.forEach((item, index) => {
              if (!item || typeof item !== "object" || looksDemoItem(item)) return;
              if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(item)) return;
              const rawBusinessName = itemBusinessNameForStorage(item, key);
              if (activitySourceItemLooksCustomerOwned(item, rawBusinessName)) return;
              let businessName = rawBusinessName;
              if (/^your business$/i.test(businessName)) businessName = currentBusinessName() || businessName;
              if (!businessName || looksDemoText(businessName)) return;
              if (looksCustomerBusinessName(businessName)) return;
              const businessKey = itemBusinessKey(item, businessName);
              const marker = clean([item.clipKind, item.reelKind, item.clipType, item.tag, item.kind, item.type, item.postMode, item.createType, key].filter(Boolean).join(" ")).toLowerCase();
              const fallbackSlug = fallbackType.toLowerCase();
              const resolvedKind = contentRowFeedKind(marker, item, fallbackSlug);
              const isJob = resolvedKind === "job";
              const isEvent = resolvedKind === "event";
              const isArticle = resolvedKind === "article";
              const isProduct = resolvedKind === "product";
              const isClip = resolvedKind === "clip";
              const sourceLooksClip = isClip || /clip|reel/.test(marker) || key.toLowerCase().indexOf("clip") >= 0 || key.toLowerCase().indexOf("reel") >= 0;
              const productClip = (isClip || sourceLooksClip) && realItemLooksProductClip(item, marker, fallbackType);
              const type = isJob ? "job" : isEvent ? "event" : isArticle ? "article" : (isClip || sourceLooksClip) ? (productClip ? "product clip" : "clip") : isProduct || /product/.test(marker) || item.price || item.priceText || item.productName || item.productTitle ? "product" : "post";
              if (type === "product" && !productIsPublic(item)) return;
              const title = realActivityTitleFromItem(item, type);
              const row = businessByText([businessKey, businessName, item.businessKey, item.key, item.profileKey, item.ownerKey, item.businessName, item.business, item.ownerName, item.actor, item.name, item.title]) || {};
              const createdAt = firstClean([item.createdAt, item.postedAt, item.updatedAt, item.savedAt, item.time]);
              const media = realMediaFromItem(item);
              const price = firstClean([item.priceText, item.displayPrice, item.formattedPrice, item.currencyCode && (item.price || item.amount) ? item.currencyCode + " " + (item.price || item.amount) : "", item.price, item.amount]);
              const profilePhoto = activityBusinessPhoto(item, row, businessKey, businessName);
              const profilePhotoRef = activityBusinessPhotoRef(item, row, businessKey, businessName);
              rows.push({
                id: firstClean([item.id, item.feedId, key + "-" + index]),
                rawId: /clip/i.test(type) ? firstClean([item.clipId, item.reelId, item.id, item.feedId]) : firstClean([item.id, item.productId, item.clipId, item.reelId, item.feedId]),
                jobTitle: type === "job" ? firstClean([item.jobTitle, item.title]) : firstClean([item.jobTitle]),
                eventName: type === "event" ? firstClean([item.eventName, item.eventTitle, item.title]) : firstClean([item.eventName, item.eventTitle]),
                sourceKey: key,
                sourceIndex: index,
                key: businessKey,
                businessName,
                title,
                description: firstClean([item.productDescription, item.productInfo, item.description, item.text, item.summary, item.body, item.articleBody]) || title,
                type,
                productClip,
                kindLabel: productClip ? "Product Clip" : type,
                owner: firstClean([item.owner, item.ownerType, item.actorType, item.accountType, item.createdAs, item.authorRole]) || "business",
                actorType: firstClean([item.actorType, item.ownerType, item.accountType, item.owner]) || "business",
                isUserPost: false,
                href: activityDetailHref(item, type),
                price,
                media,
                photo: profilePhoto,
                photoRef: profilePhotoRef,
                createdAt,
                time: createdAt ? new Date(createdAt).getTime() || 0 : 0
              });
            });
          });
          const seen = new Set();
          return rows.sort((a, b) => b.time - a.time).filter((item) => {
            const keys = contentRowIdentityKeys(item);
            if (keys.some((key) => seen.has(key))) return false;
            keys.forEach((key) => seen.add(key));
            return true;
          });
          });
        }
        function isFreshActivity(item) {
          const time = Number(item && item.time) || 0;
          if (!time) return false;
          return Date.now() - time <= 7 * 24 * 60 * 60 * 1000;
        }
        function activityLooksCustomerOwned(item) {
          if (!item || typeof item !== "object") return false;
          if (activitySourceItemLooksCustomerOwned(item, item.businessName || item.name)) return true;
          const ownerText = firstClean([item.owner, item.ownerType, item.actorType, item.accountType, item.createdAs, item.authorRole]).toLowerCase();
          const keyText = slug(firstClean([item.key, item.businessKey, item.profileKey]));
          const hrefText = firstClean([item.href, item.profileHref]).toLowerCase();
          const idText = firstClean([item.id, item.rawId, item.feedId, item.postId]).toLowerCase();
          const explicitBusinessContext = ownerText.indexOf("business") >= 0 ||
            ownerText.indexOf("merchant") >= 0 ||
            ownerText.indexOf("seller") >= 0 ||
            (!!keyText && keyText !== "customer-profile") ||
            hrefText.indexOf("emy-business-profile") >= 0 ||
            idText.indexOf("business-") === 0;
          return ownerText.indexOf("customer") >= 0 ||
            ownerText.indexOf("buyer") >= 0 ||
            keyText === "customer-profile" ||
            hrefText.indexOf("emy-customer-profile") >= 0 ||
            idText.indexOf("customer-") === 0 ||
            (idText.indexOf("user-feed-") === 0 && !explicitBusinessContext) ||
            (idText.indexOf("feed-create-") === 0 && !explicitBusinessContext) ||
            (!explicitBusinessContext && looksCustomerBusinessName(item.businessName || item.name));
        }
        function activityMatchesBusiness(activity, business) {
          if (!activity || !business) return false;
          const activityKey = slug(activity.key || activity.businessName);
          const businessKey = slug(business.key || business.name);
          const activityName = slug(activity.businessName);
          const businessName = slug(business.name);
          return !!activityKey && (activityKey === businessKey || activityKey === businessName || activityName === businessKey || activityName === businessName);
        }
        function countUniqueRows(keys, typePattern) {
          const seen = new Set();
          keys.forEach((key) => {
            const rows = readJson(key, []);
            if (!Array.isArray(rows)) return;
            rows.forEach((item) => {
              if (!item || typeof item !== "object" || looksDemoItem(item)) return;
              const marker = clean([item.type, item.kind, item.tag, item.postMode, item.clipKind, item.reelKind, item.clipType].filter(Boolean).join(" ")).toLowerCase();
              if (typePattern && !typePattern.test(marker + " " + key.toLowerCase())) return;
              if (typePattern && /product/i.test(String(typePattern)) && !productIsPublic(item)) return;
              const name = itemBusinessNameForStorage(item, key);
              if (activitySourceItemLooksCustomerOwned(item, name)) return;
              const title = firstClean([item.productName, item.productTitle, item.clipTitle, item.title, item.name, item.text, item.description]) || key;
              if (!name || !title || looksDemoText(name) || looksDemoText(title)) return;
              if (looksCustomerBusinessName(name)) return;
              seen.add(slug([name, title].join(" ")));
            });
          });
          return seen.size;
        }
        function railAvatarInitial(value) {
          const match = clean(value).match(/[A-Za-z0-9]/);
          return match ? match[0].toUpperCase() : "B";
        }
        function avatarMarkup(className, row) {
          const photo = row && row.photo;
          const photoRef = row && row.photoRef;
          const initial = railAvatarInitial(row && row.name);
          return '<span class="' + className + (photo || photoRef ? ' has-image' : '') + '" aria-hidden="true">' + (photo || photoRef ? '<img' + (photo ? ' src="' + escapeAttr(photo) + '"' : '') + (photoRef ? ' data-emy-media-ref="' + escapeAttr(photoRef) + '"' : '') + ' alt="" />' : escapeAttr(initial)) + '</span>';
        }
        function myBusinessDecorAvatarMarkup(row) {
          const photo = row && row.photo;
          const photoRef = row && row.photoRef;
          if (photo || photoRef) return avatarMarkup("my-business-avatar", row);
          const initial = railAvatarInitial(row && row.name);
          const decorClasses = ["pizza", "shop", "person", "bottle", "supply"];
          const key = slug(clean(row && (row.key || row.name))) || "business";
          let hash = 0;
          for (let i = 0; i < key.length; i++) hash = (hash + key.charCodeAt(i) * (i + 7)) % decorClasses.length;
          return '<span class="my-business-avatar ' + decorClasses[hash] + '" aria-hidden="true" data-avatar-initial="' + escapeAttr(initial) + '">' + escapeAttr(initial) + '</span>';
        }
        function activityAvatarPhoto(item) {
          return firstBusinessAvatarImageValue([item && item.photo, businessAvatarForText(item && (item.key || item.businessName))]);
        }
        function activityAvatarPhotoRef(item) {
          return firstBusinessAvatarImageValue([item && item.photoRef, businessAvatarRefForText(item && (item.key || item.businessName))]);
        }
        function mediaSignatureValues(media) {
          if (!media || typeof media !== "object") return [];
          return [media.ref, media.src, media.posterRef, media.posterSrc, media.thumbnailRef, media.thumbnailSrc, media.coverRef, media.coverSrc].map(clean).filter(Boolean);
        }
        function activityMediaSignatures(item) {
          const row = item && typeof item === "object" ? item : {};
          const media = row.media && typeof row.media === "object" ? row.media : {};
          const values = mediaSignatureValues(media).concat([row.mediaRef, row.mediaSrc, row.imageRef, row.image, row.videoRef, row.video, row.coverRef, row.coverSrc, row.posterRef, row.posterSrc, row.thumbnailRef, row.thumbnailSrc].map(clean).filter(Boolean));
          const addItems = (items) => {
            if (!Array.isArray(items)) return;
            items.forEach((entry) => {
              mediaSignatureValues(entry).forEach((value) => values.push(value));
            });
          };
          addItems(row.mediaItems);
          addItems(media.items);
          return Array.from(new Set(values.filter(Boolean)));
        }
        function activityMediaSignature(item) {
          const signatures = activityMediaSignatures(item);
          return signatures[0] || "";
        }
        const businessUpdateReadsKey = "emyMyBusinessUpdateReads";
        function businessUpdateAliases(value) {
          const row = value && typeof value === "object" ? value : {};
          return Array.from(new Set([
            businessIdentityKey(row),
            slug(row.key),
            slug(row.businessKey),
            slug(row.businessName),
            slug(row.name),
            slug(typeof value === "string" ? value : "")
          ].filter(Boolean)));
        }
        function readBusinessUpdateReads() {
          const parsed = readJson(businessUpdateReadsKey, {});
          return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
        }
        function businessUpdateReadTime(value) {
          const reads = readBusinessUpdateReads();
          return businessUpdateAliases(value).reduce((latest, key) => Math.max(latest, Number(reads[key]) || 0), 0);
        }
        function latestActivityTimeForBusiness(business, activities) {
          return (activities || []).reduce((latest, activity) => {
            if (!activityMatchesBusiness(activity, business)) return latest;
            const time = Number(activity.time) || (activity.createdAt ? new Date(activity.createdAt).getTime() : 0) || 0;
            return Math.max(latest, time);
          }, 0);
        }
        function businessHasUnreadActivity(business, activities) {
          const latest = latestActivityTimeForBusiness(business, activities);
          return latest > 0 && latest > businessUpdateReadTime(business);
        }
        function businessUpdateReadSignature(businesses, activities) {
          return (businesses || []).map((business) => {
            const latest = latestActivityTimeForBusiness(business, activities);
            return businessIdentityKey(business) + ":" + latest + ":" + businessUpdateReadTime(business);
          }).join("|");
        }
        function markBusinessUpdatesRead(value, activities) {
          const aliases = businessUpdateAliases(value);
          if (!aliases.length) return false;
          const latest = latestActivityTimeForBusiness(value, activities || realActivityRows()) || Date.now();
          const reads = readBusinessUpdateReads();
          aliases.forEach((key) => { reads[key] = Math.max(Number(reads[key]) || 0, latest); });
          writeJson(businessUpdateReadsKey, reads);
          return true;
        }
        function removeBusinessUpdateDot(value) {
          const aliases = new Set(businessUpdateAliases(value));
          if (!aliases.size) return;
          document.querySelectorAll(".my-business-row").forEach((row) => {
            const rowAliases = businessUpdateAliases({
              key: row.dataset.businessLink || row.dataset.businessKey,
              name: row.querySelector(".my-business-copy strong") && row.querySelector(".my-business-copy strong").textContent
            });
            if (!rowAliases.some((key) => aliases.has(key))) return;
            row.dataset.businessUnread = "false";
            const dot = row.querySelector(".my-business-pill");
            if (dot) dot.remove();
          });
        }
        function installBusinessUpdateReadHandlers() {
          if (window.__emyBusinessUpdateReadHandlersInstalled) return;
          window.__emyBusinessUpdateReadHandlersInstalled = true;
          const handleBusinessUpdateReadClick = (event) => {
            const target = event.target && event.target.closest ? event.target.closest(".my-business-row, .my-business-update, .rail-pulse-item") : null;
            if (!target) return;
            const businessKey = target.dataset.businessLink || target.dataset.businessKey || target.dataset.detailBusiness || "";
            const businessName = target.dataset.detailBusiness || (target.querySelector("strong") && target.querySelector("strong").textContent) || businessKey;
            const business = businessByText([businessKey, businessName]) || { key: businessKey, name: businessName || businessKey };
            if (markBusinessUpdatesRead(business, realActivityRows())) {
              removeBusinessUpdateDot(business);
              window.dispatchEvent(new CustomEvent("emy:my-business-updates-read", { detail: { businessKey: businessIdentityKey(business) } }));
            }
          };
          window.addEventListener("click", handleBusinessUpdateReadClick, true);
          document.addEventListener("click", handleBusinessUpdateReadClick, true);
        }
        function contentCopySlug(value, businessName) {
          let text = clean(value);
          const business = clean(businessName);
          if (business && text.toLowerCase().indexOf(business.toLowerCase() + " ") === 0) text = clean(text.slice(business.length));
          return slug(text);
        }
        function contentRowRichness(item) {
          const row = item || {};
          const media = row.media || {};
          const rowItems = Array.isArray(row.mediaItems) ? row.mediaItems : [];
          const mediaItems = Array.isArray(media.items) ? media.items : [];
          return Math.max(rowItems.length, mediaItems.length) * 10 + (activityMediaSignatures(row).length ? 1 : 0) + (clean(row.description).length ? 1 : 0);
        }
        // Local copies: this guard runs in its own scope and cannot reach the
        // page-script closure that defines these identity helpers. Without
        // them, dedupe/render paths throw ReferenceErrors and abort midway.
        function feedCardStableIdentityId(feedId) {
          const id = String(feedId || "").trim();
          if (!id) return "";
          if (/^(feed-create-|customer-post-|user-feed-|repost-)/i.test(id)) return id;
          if (/^feed-create-\d+-\d+$/i.test(id)) return id;
          return feedItemStableIdentityId({ id });
        }
        function feedItemStableIdentityId(item) {
          const id = String(item && (item.id || item.feedId || item.postId || item.originalFeedId || item.articleId || item.eventId || item.jobId || item.productId || item.clipId || item.reelId || item.rawId) || "").trim();
          if (!id) return "";
          const lower = id.toLowerCase();
          if (/^(feed-create-|customer-post-|user-feed-|repost-)/.test(lower)) return id;
          if (/^feed-create-\d+-\d+$/i.test(lower)) return id;
          if (/^(created-home-post-|home-created-|feed-post-|feed-clip-|feed-product-|feed-article-|feed-event-|feed-job-)\d+$/i.test(id)) return id;
          if (/^(emyfeedcreatedposts|emybusinessfeedposts|emybusinessposts|emybusinessclips|emybusinessproducts|emybusinessjobs|emybusinessevents)-\d+$/i.test(lower)) return id;
          if (/^feed-[a-z]+-[a-z0-9-]+-[a-z0-9-]+$/i.test(id)) return id;
          return id;
        }
        function contentRowIdentityKeys(item) {
          const row = item || {};
          const type = slug(row.type || "");
          const stableId = feedItemStableIdentityId(row);
          if (stableId) return [type + ":id:" + slug(stableId)];
          const businessName = row.businessName || row.businessKey || "";
          const business = slug(row.businessKey || row.businessName || "");
          const businessDisplay = slug(row.businessName || row.businessKey || "");
          const businessKeys = Array.from(new Set([business, businessDisplay].filter(Boolean)));
          const title = slug(row.title || "");
          const description = slug(row.description || "");
          const copyTitle = contentCopySlug(row.title || "", businessName);
          const copyDescription = contentCopySlug(row.description || "", businessName);
          const rawId = slug(row.rawId || "");
          const mediaKeys = activityMediaSignatures(row).map(slug).filter(Boolean);
          const rowItems = Array.isArray(row.mediaItems) ? row.mediaItems : [];
          const mediaItems = row.media && Array.isArray(row.media.items) ? row.media.items : [];
          const mediaCount = Math.max(rowItems.length, mediaItems.length);
          const created = slug(row.createdAt || row.postedAt || row.time || "");
          const keys = [];
          if (rawId) keys.push(type + ":id:" + rawId);
          mediaKeys.forEach((mediaKey) => {
            keys.push(type + ":media:" + mediaKey);
            businessKeys.forEach((businessKey) => keys.push(type + ":media:" + businessKey + ":" + mediaKey));
          });
          businessKeys.forEach((businessKey) => {
            if (title && description) keys.push(type + ":copy:" + businessKey + ":" + title + ":" + description);
            if (copyTitle && copyDescription) keys.push(type + ":copy-normal:" + businessKey + ":" + copyTitle + ":" + copyDescription);
            if (copyTitle && mediaKeys.length) keys.push(type + ":copy-media:" + businessKey + ":" + copyTitle + ":" + mediaKeys[0]);
            if (copyTitle && created) keys.push(type + ":copy-time:" + businessKey + ":" + copyTitle + ":" + created);
            if (copyTitle && mediaCount) keys.push(type + ":copy-carousel:" + businessKey + ":" + copyTitle + ":" + mediaCount);
          });
          if (!keys.length) keys.push(type + ":source:" + slug([row.sourceKey, row.sourceIndex, title].join(" ")));
          return Array.from(new Set(keys.filter(Boolean)));
        }
        function realRailLoadingHtml(selector) {
          if (selector === ".my-business-row") {
            return '<span class="my-business-skeleton" data-emy-real-loading aria-hidden="true"><span class="rail-skeleton-avatar"></span><span class="rail-skeleton-copy"><span class="rail-skeleton-line"></span><span class="rail-skeleton-line is-short"></span></span><span class="rail-skeleton-dot"></span></span>';
          }
          if (selector === ".my-business-update") {
            return '<span class="my-business-update-skeleton" data-emy-real-loading aria-hidden="true"><span class="rail-skeleton-copy"><span class="rail-skeleton-line"></span><span class="rail-skeleton-line is-short"></span></span><span class="rail-skeleton-chip"></span></span><span class="my-business-update-skeleton" data-emy-real-loading aria-hidden="true"><span class="rail-skeleton-copy"><span class="rail-skeleton-line"></span><span class="rail-skeleton-line is-short"></span></span><span class="rail-skeleton-chip"></span></span>';
          }
          return '<span class="my-business-update-skeleton" data-emy-real-loading aria-hidden="true"><span class="rail-skeleton-copy"><span class="rail-skeleton-line"></span><span class="rail-skeleton-line is-short"></span></span><span class="rail-skeleton-chip"></span></span>';
        }
        function setRealRailToggleExpanded(toggle, expanded) {
          if (!toggle || !toggle.closest) return;
          const section = toggle.closest(".rail-card, .my-business-activity");
          const extras = section ? Array.from(section.querySelectorAll("[data-my-business-extra]")) : [];
          const label = toggle.querySelector("[data-my-business-toggle-text]");
          if (!extras.length) {
            const fallbackLink = section && section.classList.contains("my-business-activity") ? section.querySelector(".customer-feed-link") : null;
            const hasRows = !!(section && section.querySelector(".my-business-row,.my-business-update,.rail-pulse-item"));
            if (fallbackLink && hasRows) {
              toggle.hidden = false;
              toggle.style.display = "";
              toggle.dataset.emyMyBusinessFallback = "true";
              toggle.classList.remove("is-expanded");
              toggle.setAttribute("aria-expanded", "false");
              if (label) label.textContent = "Show more";
              return;
            }
            delete toggle.dataset.emyMyBusinessFallback;
            toggle.hidden = true;
            toggle.style.display = "none";
            toggle.classList.remove("is-expanded");
            toggle.setAttribute("aria-expanded", "false");
            if (label) label.textContent = "Show more";
            return;
          }
          delete toggle.dataset.emyMyBusinessFallback;
          toggle.hidden = false;
          toggle.style.display = "";
          extras.forEach((row) => {
            row.hidden = !expanded;
            row.style.display = expanded ? "" : "none";
            row.setAttribute("aria-hidden", expanded ? "false" : "true");
          });
          toggle.classList.toggle("is-expanded", expanded);
          toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
          if (label) label.textContent = expanded ? "Show fewer" : "Show more";
        }
        function bindRealRailToggleFallback(toggle) {
          if (!toggle || toggle.dataset.emyRealRailToggleBound === "true") return;
          toggle.dataset.emyRealRailToggleBound = "true";
          toggle.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
            if (toggle.dataset.emyMyBusinessFallback === "true") {
              const section = toggle.closest(".rail-card, .my-business-activity");
              const fallbackLink = section && section.classList.contains("my-business-activity") ? section.querySelector(".customer-feed-link") : null;
              if (fallbackLink && fallbackLink.href) {
                window.location.href = fallbackLink.href;
                return;
              }
            }
            setRealRailToggleExpanded(toggle, toggle.getAttribute("aria-expanded") !== "true");
          }, true);
        }
        function insertRealRows(section, selector, anchorSelector, rowsHtml, emptyText, signatureKey) {
          if (!section) return;
          const holdEmpty = !rowsHtml && shouldHoldRealEmptyState();
          const signature = clean((holdEmpty ? "hydrating:" : "") + (signatureKey || rowsHtml || emptyText));
          if (section.dataset.emyRealSignature === signature) return;
          section.dataset.emyRealSignature = signature;
          section.hidden = false;
          section.querySelectorAll(selector + ",[data-emy-real-empty],[data-emy-real-loading]").forEach((node) => node.remove());
          const anchor = anchorSelector ? section.querySelector(anchorSelector) : null;
          const html = rowsHtml || (holdEmpty ? realRailLoadingHtml(selector) : '<p class="emy-real-empty" data-emy-real-empty>' + escapeAttr(emptyText) + '</p>');
          if (anchor) anchor.insertAdjacentHTML("beforebegin", html);
          else section.insertAdjacentHTML("beforeend", html);
          if (holdEmpty) scheduleRealEmptyStateRetry();
          section.querySelectorAll("[data-my-business-toggle]").forEach((toggle) => {
            bindRealRailToggleFallback(toggle);
            if (window.emySetupMyBusinessToggles) window.emySetupMyBusinessToggles();
            else setRealRailToggleExpanded(toggle, toggle.getAttribute("aria-expanded") === "true");
          });
        }
        function syncRealToggle(toggle, count) {
          if (!toggle) return;
          const section = toggle.closest ? toggle.closest(".rail-card, .my-business-activity") : null;
          const visibleLimit = section && section.classList.contains("my-business-activity") ? 2 : 3;
          const hasMore = Number(count) > visibleLimit;
          const fallbackLink = section && section.classList.contains("my-business-activity") ? section.querySelector(".customer-feed-link") : null;
          const showFallback = !hasMore && Number(count) > 0 && !!fallbackLink;
          toggle.hidden = !(hasMore || showFallback);
          toggle.style.display = hasMore || showFallback ? "" : "none";
          bindRealRailToggleFallback(toggle);
          if (showFallback) toggle.dataset.emyMyBusinessFallback = "true";
          else delete toggle.dataset.emyMyBusinessFallback;
          if (!hasMore) {
            toggle.setAttribute("aria-expanded", "false");
            toggle.classList.remove("is-expanded");
            const label = toggle.querySelector("[data-my-business-toggle-text]");
            if (label) label.textContent = "Show more";
          }
        }
        function fastCustomerBusinessRows() {
          const map = new Map();
          const add = (item, fallbackKey) => {
            if (!item || typeof item !== "object") return;
            if (item.active === false || item.isCustomer === false) return;
            const name = firstClean([item.name, item.businessName, item.title, fallbackKey && clean(fallbackKey).replace(/-/g, " ")]);
            if (!name || looksDemoText(name) || looksInternalProfileName(name) || looksCustomerIdentity(name)) return;
            const key = slug(firstClean([item.key, item.businessKey, fallbackKey, name]));
            if (!key || looksDemoText(key) || looksInternalProfileName(key) || looksCustomerIdentity(key)) return;
            if (customerBusinessRecordIsCurrentOwned(item, fallbackKey || key || name)) return;
            try {
              if (localStorage.getItem("emyCustomerBusiness:" + key) === "0") return;
            } catch (error) {}
            const existing = map.get(key) || {};
            map.set(key, {
              key,
              name: existing.name || name,
              photo: existing.photo || firstBusinessAvatarImageValue([
                item.photo,
                item.photoSrc,
                item.profilePhoto,
                item.profilePhotoSrc,
                item.businessPhoto,
                item.businessPhotoSrc,
                item.businessAvatar,
                item.businessLogo,
                item.avatar,
                item.avatarSrc,
                item.logo
              ]),
              photoRef: existing.photoRef || firstBusinessAvatarImageValue([
                item.photoRef,
                item.profilePhotoRef,
                item.profilePhotoPublicId,
                item.businessPhotoRef,
                item.businessAvatarRef,
                item.businessLogoRef,
                item.avatarRef,
                item.logoRef
              ]),
              category: existing.category || firstClean([item.category, item.businessCategory, item.type, item.tag]),
              description: existing.description || itemBusinessDescription(item),
              location: existing.location || firstClean([item.location, item.businessLocation, item.address, item.businessAddress, item.distance]),
              isCustomer: true
            });
          };
          const saved = readJson("emyCustomerBusinesses", {});
          if (saved && typeof saved === "object" && !Array.isArray(saved)) Object.keys(saved).forEach((key) => add(saved[key], key));
          try {
            for (let index = 0; index < localStorage.length; index += 1) {
              const storageKey = localStorage.key(index) || "";
              if (storageKey.indexOf("emyCustomerBusiness:") !== 0 || localStorage.getItem(storageKey) !== "1") continue;
              const key = storageKey.slice("emyCustomerBusiness:".length);
              if (currentOwnedBusinessKeyIsOnlyOwner(key)) continue;
              if (!map.has(slug(key))) add({ key, name: key.replace(/-/g, " "), active: true, isCustomer: true }, key);
            }
          } catch (error) {}
          return Array.from(map.values()).slice(0, 20);
        }
        function hydrateSavedBusinessRailFast() {
          const leftBusinesses = document.querySelector(".left-rail .rail-card");
          if (!leftBusinesses) return false;
          let businesses = [];
          try {
            businesses = realCustomerBusinesses().slice(0, 20);
          } catch (error) {
            businesses = fastCustomerBusinessRows();
          }
          if (!businesses.length) return false;
          const rows = businesses.map((item, index) => {
            const href = "emy-business-profile.html?business=" + encodeURIComponent(item.key || item.name);
            const detail = firstClean([item.category, item.location, item.description]) || "Saved business";
            return '<a class="my-business-row' + (index === 0 ? ' is-open' : '') + '"' + (index >= 3 ? ' data-my-business-extra hidden' : '') + ' href="' + escapeAttr(href) + '" data-business-link="' + escapeAttr(item.key || item.name) + '" data-business-unread="false">' +
              myBusinessDecorAvatarMarkup(item) +
              '<span class="my-business-copy"><strong>' + escapeAttr(item.name) + '</strong><span>' + escapeAttr(detail) + '</span></span>' +
            '</a>';
          }).join("");
          const toggle = leftBusinesses.querySelector("[data-my-business-toggle]");
          syncRealToggle(toggle, businesses.length);
          insertRealRows(leftBusinesses, ".my-business-row", "[data-my-business-toggle]", rows, "No saved businesses yet.", "fast:" + businesses.map((item) => item.key + item.name + item.photo + item.photoRef).join("|"));
          try { if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(leftBusinesses); } catch (error) {}
          try { applyRealAvatars(leftBusinesses); } catch (error) {}
          return true;
        }
        function runAfterFirstPaint(callback) {
          if (window.requestAnimationFrame) window.requestAnimationFrame(() => window.setTimeout(callback, 0));
          else window.setTimeout(callback, 0);
        }
        function isGenericActivityTitle(title) {
          const text = clean(title).toLowerCase();
          if (!text) return false;
          return /^(photo update|video update|carousel update|new update|new clip|new article|new event|new job post|post|product|clip|article|event|job|product clip|update|shared a photo update|shared a new video|shared new media|new customer update|new business update|business update)$/i.test(text);
        }
        function contentRowMediaTitle(item, cleanType, media, isProductClip) {
          if (cleanType === "product") return firstClean([item && item.productName, item && item.productTitle]) || "Product";
          if (cleanType === "clip") return isProductClip ? "Product clip" : "Clip";
          if (cleanType === "job") return firstClean([item && item.jobTitle, item && item.title]) || "Job";
          if (cleanType === "event") return firstClean([item && item.eventName, item && item.title]) || "Event";
          if (cleanType === "article") return firstClean([item && item.title, item && item.headline]) || "Article";
          if (media && media.type === "video") return "Video";
          if (media && (media.type === "image" || media.src || media.ref)) return "Image";
          return "Update";
        }
        function realListHasExpectedRows(list, rows) {
          if (!list) return false;
          if (!rows || !rows.length) return !!list.querySelector("[data-emy-real-empty]");
          return rows.some((item) => {
            const title = clean(item && item.title);
            if (title) return (list.textContent || "").indexOf(title) >= 0;
            return !!list.querySelector("[data-feed-id],[data-card],.home-flow-item,.social-feed-card,.post-card,.product-card,.reel-card");
          });
        }
        function realManagedListCards(list, selector) {
          if (!list || !selector) return [];
          return Array.from(list.children || []).filter((node) => {
            if (!node || !node.matches || node.matches("[data-emy-real-empty]")) return false;
            try { return node.matches(selector); } catch (error) { return false; }
          });
        }
        function realListHasManagedOverflow(list, selector, visibleRows) {
          const expected = Array.isArray(visibleRows) ? visibleRows.length : 0;
          if (!expected) return false;
          return realManagedListCards(list, selector).length > expected;
        }
        function realActivityTitleFromItem(item, resolvedKind) {
          const kind = clean(resolvedKind || item && item.type || "post").toLowerCase();
          let title = "";
          if (kind === "job" || kind === "hiring") title = firstClean([item.jobTitle, item.title, item.name]);
          else if (kind === "event") title = firstClean([item.eventName, item.eventTitle, item.title, item.name]);
          else if (kind === "product") title = firstClean([item.productName, item.productTitle, item.title, item.name]);
          else if (kind === "clip" || kind === "product clip") title = firstClean([item.clipTitle, item.productTitle, item.productName, item.title, item.name]);
          else if (kind === "article") title = firstClean([item.title, item.name, item.headline]);
          else title = firstClean([item.title, item.name, item.text, item.description]);
          return isGenericActivityTitle(title) ? "" : title;
        }
        function realActivityHasImageMedia(item) {
          const media = item && item.media;
          if (media && (media.type === "image" || (!media.type && (media.src || media.ref)))) return true;
          return activityMediaSignatures(item).length > 0;
        }
        function realActivityTypeLabel(item) {
          if (!item) return "Post";
          if (item.productClip) return "Product Clip";
          const type = clean(item.type || item.kindLabel || "").toLowerCase();
          if (type === "job" || type === "hiring") return "Job";
          if (type === "event") return "Event";
          if (type === "product") return "Product";
          if (type === "clip" || type === "product clip") return "Clip";
          if (type === "article") return "Article";
          if (type === "offer") return "Offer";
          if (type === "post" || !type) {
            const media = item.media || {};
            if (media.type === "video") return "Clip";
            if (realActivityHasImageMedia(item)) return "Image";
            return "Post";
          }
          return type.charAt(0).toUpperCase() + type.slice(1);
        }
        function realActivityPreviewLine(item) {
          return item ? realActivityTitleFromItem(item, item.type) : "";
        }
        function realActivityLocationSignature() {
          const state = realActiveLocationState();
          return [
            state.strict ? "strict" : "loose",
            state.active ? "active" : "inactive",
            state.latitude == null ? "" : Number(state.latitude).toFixed(5),
            state.longitude == null ? "" : Number(state.longitude).toFixed(5),
            state.radius
          ].join("|");
        }
        function countUniqueActivities(items, typePattern) {
          const seen = new Set();
          (Array.isArray(items) ? items : []).forEach((item) => {
            if (!item) return;
            const marker = clean([item.type, item.kindLabel, realActivityTypeLabel(item)].filter(Boolean).join(" ")).toLowerCase();
            if (typePattern && !typePattern.test(marker)) return;
            const key = slug(firstClean([item.id, item.rawId, item.feedId, item.productId, item.clipId, [item.key, item.businessName, item.title, item.description].filter(Boolean).join(" ")]));
            if (key) seen.add(key);
          });
          return seen.size;
        }
        function countUniqueContentRows(items) {
          const seen = new Set();
          (Array.isArray(items) ? items : []).forEach((item) => {
            if (!item) return;
            contentRowIdentityKeys(item).forEach((key) => {
              if (key) seen.add(key);
            });
          });
          return seen.size;
        }
        function hydrateRealRails() {
          hydrateSavedBusinessRailFast();
          const businesses = realCustomerBusinesses();
          const activities = realActivityRows().filter((activity) => !activityLooksCustomerOwned(activity));
          const visibleActivities = activities.filter(realFeedRowAllowedByLocation);
          const railCountActivities = activities.filter((activity) => realFeedRowAllowedByLocation(activity) || businesses.some((business) => activityMatchesBusiness(activity, business)));
          const railProductRows = contentRows("product").filter(realFeedRowAllowedByLocation);
          const railClipRows = contentRows("clip").filter(realFeedRowAllowedByLocation);
          const freshActivities = visibleActivities.filter(isFreshActivity);
          const myBusinessActivities = freshActivities.filter((activity) => businesses.some((business) => activityMatchesBusiness(activity, business)));
          const localPulseActivities = visibleActivities.filter((activity) => !businesses.some((business) => activityMatchesBusiness(activity, business)));
          const locationSignature = realActivityLocationSignature();
          const leftBusinesses = document.querySelector(".left-rail .rail-card");
          if (leftBusinesses) {
            const rows = businesses.map((item, index) => {
              const href = "emy-business-profile.html?business=" + encodeURIComponent(item.key || item.name);
              const detail = firstClean([item.category, item.location, item.description]) || "Saved business";
              const latestUpdate = latestActivityTimeForBusiness(item, freshActivities);
              const hasNewActivity = businessHasUnreadActivity(item, freshActivities);
              return '<a class="my-business-row' + (index === 0 ? ' is-open' : '') + '"' + (index >= 3 ? ' data-my-business-extra hidden' : '') + ' href="' + escapeAttr(href) + '" data-business-link="' + escapeAttr(item.key || item.name) + '" data-business-latest-update="' + escapeAttr(String(latestUpdate || "")) + '" data-business-unread="' + (hasNewActivity ? "true" : "false") + '">' +
                myBusinessDecorAvatarMarkup(item) +
                '<span class="my-business-copy"><strong>' + escapeAttr(item.name) + '</strong><span>' + escapeAttr(detail) + '</span></span>' +
                (hasNewActivity ? '<span class="my-business-pill" aria-label="New activity"></span>' : '') +
              '</a>';
            }).join("");
            const toggle = leftBusinesses.querySelector("[data-my-business-toggle]");
            syncRealToggle(toggle, businesses.length);
            insertRealRows(leftBusinesses, ".my-business-row", "[data-my-business-toggle]", rows, "No saved businesses yet.", businesses.map((item) => item.key + item.name + item.photo + item.photoRef).join("|") + "|" + businessUpdateReadSignature(businesses, freshActivities));
            try { if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(leftBusinesses); } catch (error) {}
          }
          const activitySection = document.querySelector(".my-business-activity");
          if (activitySection) {
            const rows = myBusinessActivities.map((item, index) => (
              '<a class="my-business-update"' + (index >= 2 ? ' data-my-business-extra hidden' : '') + realActivityDetailAttrs(item) + ' href="' + escapeAttr(item.href || "emy-customer-home.html?tab=feeds#feeds") + '" data-business-link="' + escapeAttr(item.key || item.businessName) + '">' +
                '<span class="my-business-update-copy"><strong>' + escapeAttr(item.businessName) + '</strong><span>' + escapeAttr(realActivityPreviewLine(item)) + '</span></span>' +
                '<span class="my-business-update-tag">' + escapeAttr(realActivityTypeLabel(item)) + '</span>' +
              '</a>'
            )).join("");
            const toggle = activitySection.querySelector("[data-my-business-toggle]");
            syncRealToggle(toggle, myBusinessActivities.length);
            insertRealRows(activitySection, ".my-business-update", "[data-my-business-toggle],.customer-feed-link", rows, "No new business updates yet.", myBusinessActivities.map((item) => item.id + item.title + item.href + item.photo + item.photoRef + activityMediaSignature(item)).join("|"));
          }
          const statSection = Array.from(document.querySelectorAll(".right-rail .rail-card")).find((section) => section.querySelector(".rail-stat-grid"));
          if (statSection) {
            statSection.hidden = false;
            const heading = statSection.querySelector("h2");
            const summary = statSection.querySelector(".rail-summary");
            if (heading) heading.textContent = "Today on EMY";
            if (summary) summary.textContent = "Live counts from your saved businesses, products, clips, and posts.";
            const products = countUniqueContentRows(railProductRows) || countUniqueActivities(railCountActivities, /^product$/);
            const clips = countUniqueContentRows(railClipRows) || countUniqueActivities(railCountActivities, /^(clip|product clip)$/);
            const stats = statSection.querySelectorAll(".rail-stat");
            const values = [
              [businesses.length, "Saved businesses"],
              [realBusinessDeckRows().length, "Business profiles"],
              [products, "Products"],
              [clips, "Clips"]
            ];
            stats.forEach((stat, index) => {
              if (!values[index]) return;
              const strong = stat.querySelector("strong");
              const span = stat.querySelector("span");
              if (strong) strong.textContent = String(values[index][0]);
              if (span) span.textContent = values[index][1];
            });
          }
          const pulseSection = Array.from(document.querySelectorAll(".right-rail .rail-card")).find((section) => /local pulse/i.test((section.querySelector("h2") || {}).textContent || ""));
          if (pulseSection) {
            pulseSection.hidden = false;
            const rows = localPulseActivities.map((item, index) => (
              '<a class="rail-pulse-item"' + (index >= 2 ? ' data-my-business-extra hidden' : '') + realActivityDetailAttrs(item) + ' href="' + escapeAttr(item.href || "emy-customer-home.html?tab=feeds#feeds") + '" data-business-link="' + escapeAttr(item.key || item.businessName) + '">' +
                '<span class="rail-pulse-copy"><strong>' + escapeAttr(item.businessName || "Costcutter") + '</strong><span>' + escapeAttr(realActivityPreviewLine(item)) + '</span></span><span class="rail-tag">' + escapeAttr(realActivityTypeLabel(item)) + '</span>' +
              '</a>'
            )).join("");
            const toggle = pulseSection.querySelector("[data-my-business-toggle]");
            syncRealToggle(toggle, localPulseActivities.length);
            insertRealRows(pulseSection, ".rail-pulse-item", "[data-my-business-toggle]", rows, "No real local updates yet.", locationSignature + "|" + localPulseActivities.map((item) => item.id + item.title + item.href + item.photo + item.photoRef + activityMediaSignature(item)).join("|"));
          }
          document.querySelectorAll(".left-rail,.right-rail").forEach((rail) => { rail.hidden = false; });
        }
        function ensureRailSurfaces(options = {}) {
          document.querySelectorAll(".left-rail,.right-rail,.left-rail .rail-card,.my-business-activity,.right-rail .rail-card").forEach((section) => {
            section.hidden = false;
            section.removeAttribute("hidden");
          });
          const leftCard = document.querySelector(".left-rail .rail-card");
          if (leftCard && !leftCard.querySelector(".my-business-row,[data-emy-real-empty]")) {
            delete leftCard.dataset.emyRealSignature;
          }
          const activitySection = document.querySelector(".my-business-activity");
          if (activitySection && !activitySection.querySelector(".my-business-update,[data-emy-real-empty]")) {
            delete activitySection.dataset.emyRealSignature;
          }
          const pulseSection = Array.from(document.querySelectorAll(".right-rail .rail-card")).find((section) => /local pulse/i.test((section.querySelector("h2") || {}).textContent || ""));
          if (pulseSection && !pulseSection.querySelector(".rail-pulse-item,[data-emy-real-empty]")) {
            delete pulseSection.dataset.emyRealSignature;
          }
          if (options && options.fastOnly) {
            hydrateSavedBusinessRailFast();
            return;
          }
          hydrateRealRails();
        }
        function ensureHomeSectionGuides() {
          if (typeof window.emySyncHomeSectionGuides === "function") window.emySyncHomeSectionGuides();
        }
        function realMediaFromItem(item) {
          const mediaItems = Array.isArray(item && item.mediaItems) ? item.mediaItems : [];
          const first = mediaItems.find((media) => media && (media.src || media.ref)) || {};
          const type = firstClean([first.type, item && item.mediaType, item && item.coverType, item && item.jobCoverType, item && item.eventCoverType, item && item.video ? "video" : "", item && (item.image || item.mediaSrc) ? "image" : ""]);
          const ref = firstClean([first.ref, item && item.mediaRef, item && item.imageRef, item && item.videoRef, item && item.coverRef, item && item.jobCoverRef, item && item.eventCoverRef]);
          const src = ref ? "" : firstClean([first.src, item && item.mediaSrc, item && item.image, item && item.coverSrc, item && item.jobCoverSrc, item && item.eventCoverSrc, item && item.video]);
          const posterRef = firstClean([first.posterRef, first.thumbnailRef, item && item.posterRef, item && item.thumbnailRef, item && item.coverPosterRef, item && item.jobCoverPosterRef]);
          const posterSrc = posterRef ? "" : firstClean([first.posterSrc, first.thumbnailSrc, item && item.posterSrc, item && item.thumbnailSrc, item && item.coverPosterSrc, item && item.jobCoverPosterSrc]);
          const settings = first.settings || item && (item.mediaSettings || item.coverSettings || item.eventCoverSettings || item.jobCoverSettings) || null;
          const overlay = firstClean([first.overlay, item && item.mediaOverlay, settings && settings.overlay]);
          return { type: type === "video" || /video/i.test(type) ? "video" : src || ref ? "image" : "", src, ref, posterSrc, posterRef, settings, overlay, items: mediaItems };
        }
        function realProductAvailability(item) {
          const explicit = firstClean([item && item.availability, item && item.stockStatus, item && item.stock]);
          if (explicit) return explicit;
          const status = firstClean([item && item.status, item && item.publishStatus]);
          if (status && !/^(active|live|published|approved|public|visible)$/i.test(status)) return status;
          return "In stock";
        }
        function asArray(value) {
          if (Array.isArray(value)) return value;
          if (value && typeof value === "object") return Object.values(value);
          return [];
        }
        function embeddedPreferenceOnlyContent(item, field) {
          if (!item || typeof item !== "object") return true;
          const label = firstClean([item.title, item.name, item.text, item.description]).toLowerCase();
          const preferenceLabel = /^(posts?|products?|clips?|reels?|offers?|updates?|activity|activities|feed|feeds?|latest updates?|news|items?)$/i.test(label);
          const hasContentIdentity = !!firstClean([item.id, item.productId, item.clipId, item.reelId, item.feedId, item.articleId, item.eventId, item.jobId]);
          const hasMedia = !!firstClean([item.mediaSrc, item.mediaRef, item.image, item.imageRef, item.video, item.videoRef, item.coverSrc, item.coverRef, item.thumbnailSrc, item.thumbnailRef, item.posterSrc, item.posterRef]) || (Array.isArray(item.mediaItems) && item.mediaItems.some((media) => media && (media.src || media.ref)));
          const hasSpecificContent = !!firstClean([item.productName, item.productTitle, item.clipTitle, item.articleBody, item.articleShare, item.eventName, item.eventWhen, item.jobTitle, item.priceText, item.price, item.amount]);
          const fieldLooksLikePreference = /^(updates|activity|activities|feed|feedItems|latestUpdates|news)$/i.test(field || "") && preferenceLabel;
          return (preferenceLabel || fieldLooksLikePreference) && !hasContentIdentity && !hasMedia && !hasSpecificContent;
        }
        function embeddedBusinessRecords() {
          const rows = [];
          const add = (item, key) => {
            if (!item || typeof item !== "object" || looksDemoItem(item)) return;
            rows.push(Object.assign({ businessKey: key || item.businessKey || item.key }, item));
          };
          const saved = readJson("emyCustomerBusinesses", {});
          if (Array.isArray(saved)) saved.forEach((item, index) => add(item, item && (item.businessKey || item.key) || "saved-" + index));
          else if (saved && typeof saved === "object") Object.keys(saved).forEach((key) => add(saved[key], key));
          ["emySavedBusinesses", "emyNearbyBusinesses", "emyLocalBusinesses", "emyBusinessDirectory", "emyBusinesses"].forEach((key) => {
            const value = readJson(key, []);
            asArray(value).forEach((item, index) => add(item, item && (item.businessKey || item.key) || key + "-" + index));
          });
          return rows;
        }
        function embeddedContentValues(record, type) {
          const keys = type === "product"
            ? ["products", "productList", "productPosts", "catalog", "inventory", "stockItems", "items"]
            : type === "clip"
              ? ["clips", "reels", "videos", "productClips", "clipList"]
              : ["posts", "updates", "activity", "activities", "feed", "feedItems", "latestUpdates", "news"];
          const rows = [];
          keys.forEach((key) => {
            asArray(record && record[key]).forEach((item) => {
              if (!item || typeof item !== "object" || embeddedPreferenceOnlyContent(item, key)) return;
              rows.push(Object.assign({ __embeddedField: key }, item));
            });
          });
          if (type === "post") {
            const latest = firstClean([record && record.latestUpdate, record && record.latestPost, record && record.updateText, record && record.statusText]);
            if (latest && !embeddedPreferenceOnlyContent({ title: latest, description: latest }, "latestUpdate")) rows.push({ title: latest, description: latest, __embeddedField: "latestUpdate" });
          }
          return rows;
        }
        function embeddedContentRows(type) {
          const rows = [];
          embeddedBusinessRecords().forEach((record, recordIndex) => {
            embeddedContentValues(record, type).forEach((item, index) => {
              if (!item || typeof item !== "object" || looksDemoItem(item)) return;
              let businessName = firstClean([item.businessName, item.business, item.ownerName, item.storeName, record.businessName, record.business, record.name, record.title]);
              if (/^your business$/i.test(businessName)) businessName = currentBusinessName() || businessName;
              if (!businessName || looksDemoText(businessName)) return;
              const allowCurrentBusinessContent = itemHasRenderableBusinessContent(item);
              if (!currentBusinessIsRealProfile() && isCurrentBusiness(businessName) && !allowCurrentBusinessContent) return;
              if (looksCustomerBusinessName(businessName)) return;
              const businessKey = itemBusinessKey(item, record.businessKey || record.key || businessName);
              if (!currentBusinessIsRealProfile() && isCurrentBusiness(businessKey) && !allowCurrentBusinessContent) return;
              const business = businessByText([businessKey, businessName, item.businessKey, item.key, item.profileKey, item.ownerKey, item.businessName, item.business, item.ownerName, item.actor, item.name, record.businessKey, record.key, record.businessName, record.business, record.name, record.title]) || {};
              const marker = clean([item.type, item.kind, item.tag, item.postMode, item.createType, item.clipKind, item.reelKind, item.clipType, item.__embeddedField].filter(Boolean).join(" ")).toLowerCase();
              const isClip = /clip|reel|video/.test(marker);
              const isProduct = /product|catalog|inventory|stock|item/.test(marker) || !!(item.productName || item.productTitle || item.productDescription || item.productInfo || item.price || item.priceText);
              const isProductClip = isClip && realItemLooksProductClip(item, marker, type);
              const isArticle = /article/.test(marker) || !!(item.articleBody || item.articleShare);
              const cleanType = type === "product" || isProduct && type !== "post" ? "product" : type === "clip" || isClip ? "clip" : isArticle ? "article" : "post";
              if (type !== cleanType && !(type === "post" && cleanType === "article")) return;
              if (cleanType === "product" && !productIsPublic(item)) return;
              const title = cleanType === "product"
                ? firstClean([item.productName, item.productTitle, item.title, item.name])
                : cleanType === "clip"
                  ? firstClean([item.clipTitle, item.productTitle, item.productName, item.title, item.name])
                  : firstClean([item.title, item.name, item.text, item.description]);
              if (!title || looksDemoText(title)) return;
              const description = cleanType === "product"
                ? firstClean([item.description, item.productDescription, item.productInfo, item.text])
                : cleanType === "clip"
                  ? firstClean([item.description, item.productDescription, item.productInfo, item.text])
                  : firstClean([item.description, item.text, item.shareText, item.feedIntro]);
              const media = realMediaFromItem(item);
              const createdAt = firstClean([item.createdAt, item.postedAt, item.publishedAt, item.updatedAt, item.savedAt, item.time, record.updatedAt, record.savedAt]);
              const matchesCurrentBusiness = isCurrentBusiness(businessKey) || isCurrentBusiness(businessName);
              const currentAvatar = matchesCurrentBusiness ? currentBusinessAvatarMedia() : { src: "", ref: "" };
              const hasCurrentAvatar = !!(currentAvatar.src || currentAvatar.ref);
              rows.push({
                id: firstClean([item.id, item.productId, item.clipId, item.reelId, item.feedId, "embedded-" + recordIndex + "-" + index]),
                type: cleanType,
                productClip: isProductClip,
                kindLabel: isProductClip ? "Product Clip" : cleanType,
                businessName,
                businessKey,
                businessPhoto: hasCurrentAvatar ? currentAvatar.src : business.photo || itemBusinessPhoto(item) || itemBusinessPhoto(record),
                businessPhotoRef: hasCurrentAvatar ? currentAvatar.ref : business.photoRef || itemBusinessPhotoRef(item) || itemBusinessPhotoRef(record),
                title,
                description: description || (cleanType === "product" ? "Product available locally." : cleanType === "clip" ? "Short clip from this business." : "Business update."),
                price: firstClean([item.priceText, item.price, item.amount]),
                category: firstClean([item.category, item.productCategory, item.businessCategory, item.tag]),
                availability: realProductAvailability(item),
                media,
                mediaSettings: media.settings || null,
                mediaOverlay: media.overlay || "",
                mediaItems: media.items || [],
                articleBody: firstClean([item.articleBody, item.body, item.text, item.description]),
                shareText: firstClean([item.shareText, item.articleShare, item.summary, item.description]),
                readTime: firstClean([item.readTime, item.articleReadTime]),
                href: "emy-business-profile.html?business=" + encodeURIComponent(businessKey || businessName),
                createdAt,
                time: createdAt ? new Date(createdAt).getTime() || 0 : 0
              });
            });
          });
          return rows;
        }
        function contentRowFeedKind(marker, item, fallbackType) {
          const row = item || {};
          const type = clean(row.type || "").toLowerCase();
          const kind = clean(row.kind || row.createType || row.detailKind || "").toLowerCase();
          const tag = clean(row.tag || "").toLowerCase();
          const text = String(marker || "").toLowerCase();
          if (type === "repost" || kind === "repost") return "repost";
          if (type === "job" || type === "hiring" || kind === "job" || kind === "hiring" || fallbackType === "job" || ((/job|hiring/.test(text)) && fallbackType !== "post" && type !== "post" && kind !== "post")) return "job";
          if (/event/.test(text) || type === "event" || kind === "event" || (!type && !kind && (row.eventWhen || row.eventWhere))) return "event";
          if (/article/.test(text) || type === "article" || kind === "article" || row.articleBody || row.articleShare) return "article";
          if (/offer/.test(text) || type === "offer" || kind === "offer") return "offer";
          if (type === "product" || kind === "product" || /product/.test(text) || row.productName || row.productTitle) return "product";
          if ((type === "clip" || kind === "clip" || /clip|reel/.test(text)) && !/job|hiring|event|article|offer/.test(text)) return "clip";
          if (fallbackType === "job" || fallbackType === "event" || fallbackType === "article") return fallbackType;
          return "post";
        }
        function contentRows(type) {
          return cachedValue("contentRows:" + type, () => {
          const defs = type === "product"
            ? [["emyBusinessProducts", "product"], ["emyBusinessProductList", "product"], ["emyBusinessProductPosts", "product"], ["emyFeedCreatedProducts", "product"]]
            : type === "clip"
              ? [["emyBusinessClips", "clip"], ["emyBusinessReels", "clip"], ["emyBusinessProductReels", "clip"], ["emyFeedCreatedClips", "clip"], ["emyFeedCreatedClipsByBusiness", "clip"], ["emyUploadedClips", "clip"]]
              : [["emyBusinessPosts", "post"], ["emyBusinessFeedPosts", "post"], ["emyFeedCreatedPosts", "post"], ["emyBusinessArticles", "article"], ["emyBusinessArticlePosts", "article"], ["emyFeedCreatedArticles", "article"], ["emyBusinessEvents", "event"], ["emyBusinessEventPosts", "event"], ["emyBusinessJobs", "job"], ["emyBusinessJobPosts", "job"], ["emyFeedCreatedEvents", "event"], ["emyFeedCreatedJobs", "job"]];
          const rows = [];
          defs.forEach(([key, fallbackType]) => {
            const value = readJson(key, []);
            const list = Array.isArray(value) ? value : (value && typeof value === "object" ? Object.values(value) : []);
            list.forEach((item, index) => {
              if (!item || typeof item !== "object" || looksDemoItem(item)) return;
              if (item.deleted === true || item.removed === true || item.hidden === true || item.deletedAt) return;
              if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(item)) return;
              const marker = clean([item.type, item.kind, item.tag, item.postMode, item.createType, item.clipKind, item.reelKind, item.clipType, item.reelType, key].filter(Boolean).join(" ")).toLowerCase();
              const resolvedKind = contentRowFeedKind(marker, item, fallbackType);
              const isClip = resolvedKind === "clip";
              const isProduct = resolvedKind === "product";
              const isProductClip = isClip && realItemLooksProductClip(item, marker, fallbackType);
              const isArticle = resolvedKind === "article";
              const isJob = resolvedKind === "job";
              const isEvent = resolvedKind === "event";
              if (type !== "clip" && (type === "product" || isProduct) && !productIsPublic(item)) return;
              if (type === "clip" && !isClip) return;
              if (type === "post" && (isClip || isProduct && key === "emyFeedCreatedPosts")) return;
              const rawBusinessName = itemBusinessNameForStorage(item, key);
              const customerOwned = itemLooksCustomerOwned(item, rawBusinessName);
              if (customerOwned) return;
              const businessName = rawBusinessName;
              if (!businessName || looksDemoText(businessName)) return;
              const allowCurrentBusinessContent = itemHasRenderableBusinessContent(item);
              if (!currentBusinessIsRealProfile() && isCurrentBusiness(businessName) && !allowCurrentBusinessContent) return;
              if (!customerOwned && looksCustomerBusinessName(businessName)) return;
              const businessKey = customerOwned ? "customer-profile" : itemBusinessKey(item, businessName);
              if (!currentBusinessIsRealProfile() && isCurrentBusiness(businessKey) && !allowCurrentBusinessContent) return;
              const business = businessByText([businessKey, businessName, item.businessKey, item.key, item.profileKey, item.ownerKey, item.businessName, item.business, item.ownerName, item.actor, item.name, item.title]) || {};
              const rowLatitude = firstClean([item.latitude, item.lat, item.businessLatitude, item.locationLatitude, business.latitude, business.businessLatitude]);
              const rowLongitude = firstClean([item.longitude, item.lng, item.lon, item.businessLongitude, item.locationLongitude, business.longitude, business.businessLongitude]);
              const media = realMediaFromItem(item);
              const rawCreatedAt = firstClean([item.createdAt, item.postedAt, item.publishedAt, item.updatedAt, item.savedAt, item.created, item.date, item.addedAt, item.time]);
              const createdDate = rawCreatedAt ? new Date(rawCreatedAt) : null;
              const createdAt = createdDate && !Number.isNaN(createdDate.getTime()) ? rawCreatedAt : "";
              const sourceLooksClip = type === "clip" || key.toLowerCase().indexOf("clip") >= 0 || key.toLowerCase().indexOf("reel") >= 0 || isClip;
              const cleanType = isJob ? "job" : isEvent ? "event" : isArticle ? "article" : sourceLooksClip ? "clip" : type === "product" || isProduct ? "product" : fallbackType === "event" ? "event" : fallbackType === "job" ? "job" : fallbackType === "article" || isArticle ? "article" : "post";
              let title = cleanType === "product"
                ? firstClean([item.productName, item.productTitle, item.title, item.name])
                : cleanType === "clip"
                  ? firstClean([item.clipTitle, item.productTitle, item.productName, item.title, item.name])
                  : firstClean([item.title, item.name, item.text, item.description]);
              if (isGenericActivityTitle(title)) title = "";
              let description = cleanType === "product"
                ? firstClean([item.description, item.productDescription, item.productInfo, item.text])
                : cleanType === "clip"
                  ? firstClean([item.description, item.productDescription, item.productInfo, item.text])
                  : firstClean([item.description, item.text, item.shareText, item.feedIntro]);
              if (isGenericActivityTitle(description)) description = "";
              const hasRenderableMedia = !!(media && (media.src || media.ref || (media.items && media.items.length)));
              if ((!title || looksDemoText(title)) && !hasRenderableMedia) return;
              if ((!title || looksDemoText(title)) && hasRenderableMedia) title = contentRowMediaTitle(item, cleanType, media, isProductClip);
              const matchesCurrentBusiness = isCurrentBusiness(businessKey) || isCurrentBusiness(businessName);
              const currentAvatar = matchesCurrentBusiness ? currentBusinessAvatarMedia() : { src: "", ref: "" };
              const hasCurrentAvatar = !!(currentAvatar.src || currentAvatar.ref);
              rows.push({
                id: firstClean([item.id, item.productId, item.clipId, item.reelId, item.feedId, key + "-" + index]),
                rawId: cleanType === "clip" ? firstClean([item.clipId, item.reelId, item.id, item.feedId]) : firstClean([item.id, item.productId, item.clipId, item.reelId, item.feedId]),
                sourceKey: key,
                sourceIndex: index,
                type: cleanType,
                productClip: isProductClip,
                kindLabel: isProductClip ? "Product Clip" : cleanType,
                businessName,
                businessKey,
                latitude: rowLatitude,
                longitude: rowLongitude,
                location: firstClean([item.location, item.businessLocation, item.address, item.businessAddress, business.location, business.address]),
                address: firstClean([item.address, item.businessAddress, item.businessAddressLine1, business.address, business.location]),
                businessPhoto: customerOwned ? currentCustomerPhoto() : hasCurrentAvatar ? currentAvatar.src : business.photo || itemBusinessPhoto(item),
                businessPhotoRef: customerOwned ? currentCustomerPhotoRef() : hasCurrentAvatar ? currentAvatar.ref : business.photoRef || itemBusinessPhotoRef(item),
                owner: customerOwned ? "customer" : firstClean([item.owner, item.actorType, item.accountType, item.createdAs, item.authorRole]),
                actorType: customerOwned ? "customer" : firstClean([item.actorType, item.owner, item.accountType]),
                accountType: customerOwned ? "customer" : firstClean([item.accountType, item.owner, item.actorType]),
                createdAs: customerOwned ? "customer" : firstClean([item.createdAs, item.owner]),
                isUserPost: customerOwned,
                title,
                description: description || (cleanType === "product" ? "Product available locally." : cleanType === "clip" ? "Short clip from this business." : ""),
                postMode: firstClean([item.postMode, item.createType]) || (media.type === "video" ? "video" : media.type === "image" ? "photo" : ""),
                mediaType: media.type || item.mediaType || "",
                tag: isProductClip ? "Product Clip" : cleanType === "clip" ? "Clip" : cleanType === "product" ? "Product" : firstClean([item.tag, media.type === "video" ? "Video" : media.type === "image" ? "Photo" : ""]),
                price: firstClean([item.priceText, item.price, item.amount]),
                category: firstClean([item.category, item.productCategory, item.businessCategory, item.tag]),
                availability: realProductAvailability(item),
                clipFrame: firstClean([item.clipFrame, media.settings && media.settings.clipFrame]),
                media,
                mediaSettings: media.settings || null,
                mediaOverlay: media.overlay || "",
                mediaItems: media.items || [],
                articleBody: firstClean([item.articleBody, item.body, item.text, item.description]),
                shareText: firstClean([item.shareText, item.articleShare, item.summary, item.description]),
                readTime: firstClean([item.readTime, item.articleReadTime]),
                eventType: cleanType === "event" ? (firstClean([item.eventType, item.category]) || "Event") : firstClean([item.eventType]),
                eventWhen: cleanType === "event" ? (firstClean([item.eventWhen, item.when]) || "Date to confirm") : firstClean([item.eventWhen]),
                eventWhere: cleanType === "event" ? (firstClean([item.eventWhere, item.where, item.location]) || "Place to confirm") : firstClean([item.eventWhere]),
                jobTitle: cleanType === "job" ? firstClean([item.jobTitle, item.title]) : firstClean([item.jobTitle]),
                jobLocation: cleanType === "job" ? (firstClean([item.jobLocation, item.location]) || "Location to confirm") : firstClean([item.jobLocation]),
                workplace: cleanType === "job" ? (firstClean([item.workplace]) || "On-site") : firstClean([item.workplace]),
                employment: cleanType === "job" ? (firstClean([item.employment]) || "Flexible") : firstClean([item.employment]),
                experience: cleanType === "job" ? (firstClean([item.experience]) || "Open to applicants") : firstClean([item.experience]),
                apply: cleanType === "job" ? (firstClean([item.apply]) || "Message this business on EMY") : firstClean([item.apply]),
                notes: cleanType === "job" ? (firstClean([item.notes]) || "Details in the post") : firstClean([item.notes]),
                applicants: Math.max(0, Number(item.applicants) || 0),
                href: customerOwned ? "emy-customer-profile.html" : "emy-business-profile.html?business=" + encodeURIComponent(businessKey || businessName),
                profileHref: customerOwned ? "emy-customer-profile.html" : "emy-business-profile.html?business=" + encodeURIComponent(businessKey || businessName),
                createdAt,
                time: createdAt ? new Date(createdAt).getTime() || 0 : 0
              });
            });
          });
          embeddedContentRows(type).forEach((row) => rows.push(row));
          const seen = new Set();
          return rows.sort((a, b) => (b.time - a.time) || (contentRowRichness(b) - contentRowRichness(a))).filter((item) => {
            const keys = contentRowIdentityKeys(item);
            if (keys.some((key) => seen.has(key))) return false;
            keys.forEach((key) => seen.add(key));
            return true;
          });
          });
        }
        function mediaItemsForRow(row) {
          const media = row && row.media || {};
          const items = Array.isArray(row && row.mediaItems) ? row.mediaItems : (Array.isArray(media.items) ? media.items : []);
          return items.filter((item) => item && (item.src || item.ref));
        }
        function mediaStyleFromRow(row) {
          const media = row && row.media || {};
          const settings = row && (row.mediaSettings || media.settings) || {};
          const fit = firstClean([settings.fit]) || "contain";
          const zoom = Number(settings.zoom);
          const x = Number(settings.x);
          const y = Number(settings.y);
          const overlayX = Number(settings.overlayX);
          const overlayY = Number(settings.overlayY);
          const aspect = firstClean([settings.aspect && settings.aspect !== "auto" ? settings.aspect : "", settings.naturalAspect]);
          return ' style="--media-fit:' + escapeAttr(fit) + ';--carousel-media-fit:' + escapeAttr(fit) + ';--media-zoom:' + escapeAttr(Number.isFinite(zoom) && zoom > 0 ? zoom : 1) + ';--media-x:' + escapeAttr(Number.isFinite(x) ? x : 0) + '%;--media-y:' + escapeAttr(Number.isFinite(y) ? y : 0) + '%;--overlay-x:' + escapeAttr(Number.isFinite(overlayX) ? overlayX : 50) + '%;--overlay-y:' + escapeAttr(Number.isFinite(overlayY) ? overlayY : 84) + '%;' + (aspect ? '--media-aspect-ratio:' + escapeAttr(aspect) + ';' : '') + '"';
        }
        function mediaOverlayFromRow(row) {
          const media = row && row.media || {};
          const settings = row && (row.mediaSettings || media.settings) || {};
          const overlay = row && (row.mediaOverlay || media.overlay || settings.overlay) || "";
          return overlay ? '<span class="emy-media-overlay-text">' + escapeAttr(overlay) + '</span>' : "";
        }
        function mediaItemsAttrForRow(row) {
          const items = mediaItemsForRow(row);
          if (!items.length || !window.emyFeedMediaItemsAttribute) return "";
          try {
            return ' data-detail-media-items="' + window.emyFeedMediaItemsAttribute(items) + '"';
          } catch (error) {
            return "";
          }
        }
        function mediaHtml(row, className) {
          const media = row && row.media || {};
          const cls = className || "feed";
          const style = mediaStyleFromRow(row);
          const overlay = mediaOverlayFromRow(row);
          const items = mediaItemsForRow(row);
          if (items.length > 1 && window.emyFeedMediaCarouselMarkup) {
            return '<div class="' + cls + ' feed"' + style + '>' + window.emyFeedMediaCarouselMarkup(items, { label: row && row.title || "Product media" }) + overlay + '</div>';
          }
          if (media.type === "video" && (media.src || media.ref)) {
            return '<div class="' + cls + ' feed"' + style + (media.src ? ' data-detail-media-src="' + escapeAttr(media.src) + '"' : '') + '>' +
              '<video' + (media.src ? ' src="' + escapeAttr(media.src) + '"' : '') + (media.ref ? ' data-emy-media-ref="' + escapeAttr(media.ref) + '"' : '') + (media.posterSrc ? ' poster="' + escapeAttr(media.posterSrc) + '"' : '') + (media.posterRef ? ' data-emy-poster-ref="' + escapeAttr(media.posterRef) + '"' : '') + ' muted playsinline preload="metadata"></video>' +
              overlay +
            '</div>';
          }
          if (media.src || media.ref) {
            return '<div class="' + cls + ' feed"' + style + '>' +
              '<img' + (media.src ? ' src="' + escapeAttr(media.src) + '"' : '') + (media.ref ? ' data-emy-media-ref="' + escapeAttr(media.ref) + '"' : '') + ' alt="" />' +
              overlay +
            '</div>';
          }
          return '<div class="' + cls + ' feed"' + style + ' aria-hidden="true"></div>';
        }
        function rowLooksCustomerOwned(row) {
          return itemLooksCustomerOwned(row, row && (row.businessName || row.name || row.business));
        }
        function contentRowIsBusinessFeed(row) {
          if (!row || typeof row !== "object") return false;
          if (rowLooksCustomerOwned(row)) return false;
          const businessKey = slug(firstClean([row.businessKey, row.businessName, row.business]));
          if (!businessKey || businessKey === "customer-profile") return false;
          const ownerText = firstClean([row.owner, row.actorType, row.accountType, row.createdAs, row.authorRole]).toLowerCase();
          if (ownerText.indexOf("customer") !== -1) return false;
          if (row.isUserPost === true && ownerText.indexOf("business") === -1) return false;
          return true;
        }
        function cardDataAttrs(row, kind) {
          const media = row.media || {};
          const detailMeta = [row.category, row.availability].filter(Boolean).join("|");
          const isCustomerOwned = rowLooksCustomerOwned(row);
          const businessKey = isCustomerOwned ? "customer-profile" : row.businessKey || row.businessName;
          const isProductKind = clean(kind).toLowerCase().indexOf("product") >= 0;
          const productName = firstClean([row.productName, row.productTitle, isProductKind ? row.title : ""]);
          const productDescription = firstClean([row.productDescription, row.productInfo, isProductKind ? row.description : ""]);
          const productCategory = firstClean([row.productCategory, row.category]);
          const productAvailability = firstClean([row.productAvailability, row.availability, row.stockStatus]);
          return ' data-card data-open-item-detail data-feed-id="' + escapeAttr(row.id || slug(row.title)) + '" data-business-key="' + escapeAttr(businessKey) + '"' + (isCustomerOwned ? ' data-owner="customer" data-actor-type="customer" data-profile-href="emy-customer-profile.html"' : '') + ' data-detail-kind="' + escapeAttr(kind) + '" data-detail-title="' + escapeAttr(row.title) + '" data-detail-description="' + escapeAttr(row.description) + '" data-detail-business="' + escapeAttr(row.businessName) + '" data-detail-avatar-src="' + escapeAttr(row.businessPhoto || "") + '" data-detail-avatar-ref="' + escapeAttr(row.businessPhotoRef || "") + '" data-detail-price="' + escapeAttr(row.price || "") + '" data-product-name="' + escapeAttr(productName) + '" data-product-title="' + escapeAttr(productName) + '" data-product-description="' + escapeAttr(productDescription) + '" data-product-category="' + escapeAttr(productCategory) + '" data-product-availability="' + escapeAttr(productAvailability) + '" data-detail-media="feed" data-detail-media-src="' + escapeAttr(media.ref ? "" : (media.src || "")) + '" data-detail-media-ref="' + escapeAttr(media.ref || "") + '" data-detail-media-type="' + escapeAttr(media.type || "") + '" data-detail-poster-src="' + escapeAttr(media.posterRef ? "" : (media.posterSrc || "")) + '" data-detail-poster-ref="' + escapeAttr(media.posterRef || "") + '"' + mediaItemsAttrForRow(row) + ' data-detail-meta="' + escapeAttr(detailMeta) + '"';
        }
        function realProductFreshTime(row) {
          const raw = firstClean([row && row.createdAt, row && row.postedAt, row && row.publishedAt, row && row.liveAt, row && row.savedAt, row && row.updatedAt, row && row.date, row && row.time]);
          if (!raw) return 0;
          const relative = raw.match(/^(\\d+)\\s+days?\\s+ago$/i);
          if (relative) return Date.now() - Number(relative[1]) * 24 * 60 * 60 * 1000;
          if (/today|just now|now|minute|hour/i.test(raw)) return Date.now();
          if (/yesterday/i.test(raw)) return Date.now() - 24 * 60 * 60 * 1000;
          const parsed = Date.parse(raw);
          return Number.isFinite(parsed) ? parsed : 0;
        }
        function realProductIsNew(row) {
          const time = realProductFreshTime(row);
          if (!time) return false;
          const age = Date.now() - time;
          return age >= 0 && age < 3 * 24 * 60 * 60 * 1000;
        }
        function productCard(row, index) {
          const isNew = realProductIsNew(row);
          const freshTime = realProductFreshTime(row);
          const ownerMenu = row && row.isUserPost === true;
          const optionsMenu = typeof annexedFeedOptionsMenu === "function" ? annexedFeedOptionsMenu("product", ownerMenu) : "";
          return '<article class="card product-card feed-product-card home-flow-item is-product' + (isNew ? ' is-new' : '') + '"' + cardDataAttrs(row, "Product") + ' data-product-new="' + (isNew ? 'true' : 'false') + '"' + (freshTime ? ' data-product-created-at="' + escapeAttr(new Date(freshTime).toISOString()) + '"' : '') + '>' +
            mediaHtml(row, "photo") +
            '<button class="social-feed-more feed-action" type="button" data-feed-options aria-label="More options" aria-expanded="false">...</button>' + optionsMenu +
            '<div class="body"><h3>' + escapeAttr(row.title) + '</h3><p>' + escapeAttr(row.description) + '</p><div class="product-source">' + escapeAttr(row.businessName) + '</div><div class="product-availability">' + escapeAttr(row.availability) + '</div>' + (row.price ? '<div class="price">' + escapeAttr(row.price) + '</div>' : '') + '</div>' +
          '</article>';
        }
        function compactProductCard(row, index) {
          return feedTemplateCard(row, index);
        }
        function productListCard(row, index) {
          return feedTemplateCard(row, index);
        }
        function feedTemplateItem(row) {
          const media = row && row.media || {};
          const rowIsProductClip = row && row.type === "clip" && realItemLooksProductClip(row, [row.kindLabel, row.category, row.tag, row.description, row.price].filter(Boolean).join(" "), row.type);
          const isCustomerOwned = rowLooksCustomerOwned(row);
          const ownerName = isCustomerOwned ? currentCustomerDisplayName() : row.businessName;
          const ownerKey = isCustomerOwned ? "customer-profile" : row.businessKey || row.businessName;
          const ownerHref = isCustomerOwned ? "emy-customer-profile.html" : (row.href || "emy-business-profile.html?business=" + encodeURIComponent(row.businessKey || row.businessName || ""));
          const ownerLookupText = [row.businessKey, row.businessName, row.business].filter(Boolean).join(" ");
          const ownerIsCurrentBusiness = !isCustomerOwned && (isCurrentBusiness(ownerKey) || isCurrentBusiness(row.businessName));
          const ownerCurrentAvatar = ownerIsCurrentBusiness ? currentBusinessAvatarMedia() : { src: "", ref: "" };
          const ownerHasCurrentAvatar = !!(ownerCurrentAvatar.src || ownerCurrentAvatar.ref);
          const ownerPhoto = isCustomerOwned ? currentCustomerPhoto() : ownerHasCurrentAvatar ? ownerCurrentAvatar.src : businessAvatarForText(ownerLookupText) || row.businessPhoto || "";
          const ownerPhotoRef = isCustomerOwned ? currentCustomerPhotoRef() : ownerHasCurrentAvatar ? ownerCurrentAvatar.ref : businessAvatarRefForText(ownerLookupText) || row.businessPhotoRef || "";
          return {
            id: row.id,
            type: row.type === "event" || row.type === "job" || row.type === "article" ? row.type : row.type === "clip" ? "clip" : row.type === "product" ? "product" : "post",
            key: ownerKey,
            businessKey: ownerKey,
            owner: isCustomerOwned ? "customer" : row.owner || "",
            actorType: isCustomerOwned ? "customer" : row.actorType || "",
            accountType: isCustomerOwned ? "customer" : row.accountType || "",
            createdAs: isCustomerOwned ? "customer" : row.createdAs || "",
            authorRole: isCustomerOwned ? "customer" : row.authorRole || "",
            isUserPost: isCustomerOwned || row.isUserPost === true,
            name: ownerName,
            business: ownerName,
            title: row.title,
            description: row.description,
            text: row.description,
            price: row.price || "",
            priceText: row.price || "",
            productName: rowIsProductClip ? row.title : "",
            productTitle: rowIsProductClip ? row.title : "",
            productDescription: rowIsProductClip ? row.description : "",
            productClip: rowIsProductClip,
            isProductClip: rowIsProductClip,
            clipKind: rowIsProductClip ? "product" : row.type === "clip" ? "business" : "",
            clipType: rowIsProductClip ? "product" : row.type === "clip" ? "business" : "",
            clipFrame: row.clipFrame || "",
            category: row.category || "",
            tag: row.kindLabel || row.category || (row.type === "article" ? "Article" : row.type === "clip" ? (rowIsProductClip ? "Product Clip" : "Clip") : row.type === "product" ? "Product" : "Update"),
            availability: row.availability || "",
            status: row.availability || "",
            media: media.src || media.ref ? "feed" : "feed",
            mediaSrc: media.src || "",
            mediaRef: media.ref || "",
            mediaType: media.type || "",
            posterSrc: media.posterSrc || "",
            posterRef: media.posterRef || "",
            thumbnailSrc: media.posterSrc || "",
            thumbnailRef: media.posterRef || "",
            mediaSettings: row.mediaSettings || media.settings || null,
            mediaOverlay: row.mediaOverlay || media.overlay || "",
            mediaItems: row.mediaItems || media.items || [],
            avatarSrc: ownerPhoto,
            avatarRef: ownerPhotoRef,
            profilePhoto: ownerPhoto,
            profilePhotoRef: ownerPhotoRef,
            customerPhoto: isCustomerOwned ? ownerPhoto : "",
            customerPhotoRef: isCustomerOwned ? ownerPhotoRef : "",
            profileHref: ownerHref,
            createdAt: row.createdAt || "",
            postedAt: row.createdAt || "",
            time: row.createdAt && !Number.isNaN(new Date(row.createdAt).getTime()) ? new Date(row.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "Saved",
            stats: row.type === "job" ? ((Number(row.applicants) || 0) + " applicants") : "0 likes",
            articleBody: row.articleBody || row.description || "",
            shareText: row.shareText || row.description || "",
            readTime: row.readTime || "",
            eventType: row.type === "event" ? (row.eventType || "Event") : (row.eventType || ""),
            eventWhen: row.type === "event" ? (row.eventWhen || "Date to confirm") : (row.eventWhen || ""),
            eventWhere: row.type === "event" ? (row.eventWhere || "Place to confirm") : (row.eventWhere || ""),
            jobTitle: row.type === "job" ? (row.jobTitle || row.title || "") : (row.jobTitle || ""),
            jobLocation: row.type === "job" ? (row.jobLocation || "Location to confirm") : (row.jobLocation || ""),
            workplace: row.type === "job" ? (row.workplace || "On-site") : (row.workplace || ""),
            employment: row.type === "job" ? (row.employment || "Flexible") : (row.employment || ""),
            experience: row.type === "job" ? (row.experience || "Open to applicants") : (row.experience || ""),
            apply: row.type === "job" ? (row.apply || "Message this business on EMY") : (row.apply || ""),
            notes: row.type === "job" ? (row.notes || "Details in the post") : (row.notes || ""),
            applicants: Number(row.applicants) || 0
          };
        }
        function feedTemplateCard(row, index) {
          if (window.emyRenderAnnexedFeedCard) return window.emyRenderAnnexedFeedCard(feedTemplateItem(row), index);
          if (row.type === "product") return productCard(row, index);
          if (row.type === "clip") return clipCard(row, index);
          if (row.type === "job") return jobCard(row, index);
          return postCard(row, index);
        }
        function postDetailKind(row) {
          if (!row) return "Post";
          if (row.type === "event") return "Event";
          if (row.type === "job") return "Job";
          const mode = clean([row.postMode, row.tag, row.mediaType, row.kindLabel].filter(Boolean).join(" ")).toLowerCase();
          const media = row.media || {};
          if (/carousel/.test(mode)) return "Carousel";
          if (/video/.test(mode) || media.type === "video") return "Video";
          if (/photo|image/.test(mode) || media.type === "image" || media.src || media.ref) return "Image";
          return "Post";
        }
        function postCard(row, index) {
          const hasMedia = !!(row && row.media && (row.media.src || row.media.ref));
          return '<article class="card post-card social-feed-card home-flow-item is-post' + (hasMedia ? '' : ' is-text-post') + '"' + cardDataAttrs(row, postDetailKind(row)) + '>' +
            '<div class="post-head"><span><strong>' + escapeAttr(row.businessName) + '</strong><small>' + escapeAttr(row.category || "Update") + '</small></span></div>' +
            (hasMedia ? mediaHtml(row, "photo") : '') +
            '<div class="body"><h3>' + escapeAttr(row.title) + '</h3><p>' + escapeAttr(row.description) + '</p><div class="post-meta"><span>' + escapeAttr(row.type === "event" ? "Event" : row.type === "job" ? "Job" : "Post") + '</span><span>View</span></div></div>' +
          '</article>';
        }
        function jobCard(row, index) {
          const media = row && row.media || {};
          const business = firstClean([row.businessName, row.business, row.name]) || "Business";
          const title = firstClean([row.jobTitle, row.title]) || "Help wanted";
          const description = firstClean([row.description, row.text]) || (business + " is hiring for a local role.");
          const location = firstClean([row.jobLocation, row.location]) || "Location to confirm";
          const workplace = firstClean([row.workplace]) || "On-site";
          const employment = firstClean([row.employment]) || "Flexible";
          const notes = firstClean([row.notes]) || "Details in the post";
          const applicants = Math.max(0, Number(row.applicants) || readEngagementCount(row.stats || 0));
          const initials = business.trim().charAt(0).toUpperCase() || "B";
          const avatarSrc = row.businessPhotoRef ? "" : (row.businessPhoto || "");
          const avatarRef = row.businessPhotoRef || "";
          const avatar = avatarSrc || avatarRef
            ? '<i class="has-image emy-avatar-shape-applied emy-avatar-shape-business"><img' + (avatarSrc ? ' src="' + escapeAttr(avatarSrc) + '"' : '') + (avatarRef ? ' data-emy-media-ref="' + escapeAttr(avatarRef) + '"' : '') + ' alt="" /></i>'
            : '<i class="emy-avatar-shape-applied emy-avatar-shape-business">' + escapeAttr(initials) + '</i>';
          const coverType = media.type || row.mediaType || "";
          const coverSrc = media.ref ? "" : (media.src || "");
          const coverRef = media.ref || "";
          const posterSrc = media.posterRef ? "" : (media.posterSrc || "");
          const posterRef = media.posterRef || "";
          const coverAttrs = (coverSrc ? ' src="' + escapeAttr(coverSrc) + '"' : '') + (coverRef ? ' data-emy-media-ref="' + escapeAttr(coverRef) + '"' : '') + (posterSrc ? ' poster="' + escapeAttr(posterSrc) + '"' : '') + (posterRef ? ' data-emy-poster-ref="' + escapeAttr(posterRef) + '"' : '');
          const coverHtml = coverSrc || coverRef
            ? (coverType === "video" ? '<video class="feed-job-cover-media" data-emy-job-cover-media' + coverAttrs + ' muted playsinline preload="metadata"></video>' : '<img class="feed-job-cover-media" data-emy-job-cover-media' + coverAttrs + ' alt="" />')
            : "";
          const ownerMenu = row && row.isUserPost === true;
          const optionsMenu = typeof annexedFeedOptionsMenu === "function" ? annexedFeedOptionsMenu("job", ownerMenu) : "";
          const attrs = cardDataAttrs(Object.assign({}, row, { title, description, businessName: business }), "Job") +
            ' data-job-location="' + escapeAttr(location) + '"' +
            ' data-job-workplace="' + escapeAttr(workplace) + '"' +
            ' data-job-employment="' + escapeAttr(employment) + '"' +
            ' data-job-experience="' + escapeAttr(row.experience || "Open to applicants") + '"' +
            ' data-job-apply="' + escapeAttr(row.apply || "Message this business on EMY") + '"' +
            ' data-job-notes="' + escapeAttr(notes) + '"' +
            ' data-job-applicants="' + escapeAttr(String(applicants)) + '"';
          return '<article class="feed-card social-feed-card social-feed-job-card home-flow-item is-job' + (ownerMenu ? ' is-user-post' : '') + '"' + attrs + '>' +
            '<div class="social-feed-head"><span class="social-feed-avatar feed-avatar">' + avatar + '</span><span class="social-feed-name feed-profile-link"><strong>' + escapeAttr(business) + '</strong><small>Hiring</small></span><button class="social-feed-more feed-action" type="button" data-feed-options aria-label="More options" aria-expanded="false">...</button></div>' + optionsMenu +
            '<div class="feed-job-card' + (coverHtml ? ' has-cover' : '') + '"><div class="feed-job-hero' + (coverHtml ? ' has-cover' : '') + '">' + coverHtml + '<span>Job</span><strong>' + escapeAttr(title) + '</strong></div><div class="feed-job-body"><div class="feed-job-business">' + avatar + '<span>' + escapeAttr(business) + '</span></div><p class="feed-job-desc">' + escapeAttr(description) + '</p><div class="feed-job-meta"><span><b>Location</b>' + escapeAttr(location) + '</span><span><b>Workplace</b>' + escapeAttr(workplace) + '</span><span><b>Type</b>' + escapeAttr(employment) + '</span><span><b>Pay / notes</b>' + escapeAttr(notes) + '</span></div><div class="feed-job-actions"><button class="feed-job-apply" type="button" data-feed-job-apply>Apply with CV</button><span class="feed-job-count" data-feed-job-applicants>' + escapeAttr(String(applicants)) + ' applicants</span></div></div></div>' +
          '</article>';
        }
        function clipCard(row, index) {
          const isProduct = realItemLooksProductClip(row, [row.kindLabel, row.category, row.tag, row.description, row.price].filter(Boolean).join(" "), row.type);
          const productTitle = isProduct ? (row.productName || row.productTitle || row.title || "Product") : "";
          const productPrice = isProduct ? (row.priceText || row.price || row.productPrice || "") : "";
          const clipOverlayTitle = isProduct ? (productTitle || "Product") : (row.title || "Clip");
          const clipOverlayDescription = isProduct ? (row.productDescription || row.productInfo || row.description || "") : (row.description || row.text || "");
          const baseViews = readEngagementCount(row.viewsText || row.views || row.stats || 0);
          const sharedViews = window.emySharedClipViewCountForItem ? window.emySharedClipViewCountForItem(row, row.sourceKey || row.key || row.businessKey || row.id || "", baseViews) : baseViews;
          const viewsText = sharedViews + " views";
          const productPanel = (clipOverlayTitle || clipOverlayDescription || productPrice) ? '<div class="clip-product-mini' + (productPrice ? '' : ' is-info') + '" data-clip-product-mini><strong>' + escapeAttr(clipOverlayTitle || (isProduct ? "Product" : "Clip")) + '</strong>' + (productPrice ? '<span class="clip-product-mini-price">' + escapeAttr(productPrice) + '</span>' : (clipOverlayDescription ? '<em>' + escapeAttr(clipOverlayDescription) + '</em>' : '')) + '</div>' : "";
          return '<article class="card reel-card ' + (isProduct ? 'feed-product-clip-card' : 'feed-clip-card') + ' home-flow-item is-clip"' + cardDataAttrs(row, isProduct ? "Product Clip" : "Clip") + '>' +
            mediaHtml(row, "photo") +
            '<div class="reel-top"><span class="feed-profile-link reel-owner-link"><strong>' + escapeAttr(row.businessName) + '</strong><small>' + (isProduct ? 'Product Clip' : 'Business Clip') + '</small></span><span class="reel-type-badge">' + (isProduct ? 'Product' : 'Clip') + '</span></div>' +
            '<span class="reel-play" aria-hidden="true"></span><div class="caption"><div class="reel-actions"><span data-clip-view-count>' + escapeAttr(viewsText) + '</span></div>' + productPanel + '</div>' +
          '</article>';
        }
        function realListCardIdentityKeys(card) {
          const data = card && card.dataset || {};
          const kind = slug(data.detailKind || (card && card.matches && card.matches(".reel-card,.feed-clip-card,.feed-product-clip-card") ? "clip" : card && card.matches && card.matches(".product-card,.feed-product-card") ? "product" : "post"));
          const stableFeedId = feedCardStableIdentityId(data.feedId || "");
          if (stableFeedId) return [kind + ":id:" + slug(stableFeedId)];
          const textFrom = (selector) => card && card.querySelector && card.querySelector(selector) ? clean(card.querySelector(selector).textContent || "") : "";
          const businessName = firstClean([data.detailBusiness, data.itemBusinessName, data.businessName, textFrom(".post-head strong,.social-feed-header strong,.social-feed-name strong,.feed-card-head strong,.feed-profile-link strong,.reel-owner-link strong,.feed-owner strong,strong"), data.businessKey]);
          const business = slug(firstClean([data.businessKey, data.detailBusiness, data.itemBusinessName, data.businessName, businessName]));
          const businessDisplay = slug(businessName);
          const businessKeys = Array.from(new Set([business, businessDisplay].filter(Boolean)));
          const titleText = firstClean([data.detailTitle, textFrom(".body h3,.social-feed-title,.feed-card-title,.feed-title,.post-title,h3"), textFrom(".post-caption,.social-feed-caption,.feed-caption,.caption,.social-feed-copy")]);
          const descriptionText = firstClean([data.detailDescription, textFrom(".body p,.social-feed-text,.feed-card-text,.feed-text,p")]);
          const title = slug(titleText);
          const description = slug(descriptionText);
          const feedId = slug(data.feedId || "");
          const mediaKey = slug(data.detailMediaRef || data.detailMediaSrc || "");
          const mediaItemsKey = slug(data.detailMediaItems || "");
          const mediaCount = card && card.querySelectorAll ? card.querySelectorAll(".feed-media-carousel-slide,.carousel-dot,.media-dot").length : 0;
          const normalTitle = contentCopySlug(titleText || "", businessName);
          const normalDescription = contentCopySlug(descriptionText || "", businessName);
          const keys = [];
          if (kind && mediaKey) keys.push(kind + ":media:" + mediaKey);
          businessKeys.forEach((businessKey) => {
            if (kind && mediaKey) keys.push(kind + ":media:" + businessKey + ":" + mediaKey);
          });
          if (kind && mediaItemsKey) keys.push(kind + ":media-items:" + mediaItemsKey);
          businessKeys.forEach((businessKey) => {
            if (kind && mediaItemsKey) keys.push(kind + ":media-items:" + businessKey + ":" + mediaItemsKey);
          });
          if (kind && feedId) keys.push(kind + ":id:" + feedId);
          businessKeys.forEach((businessKey) => {
            if (kind && title && description) keys.push(kind + ":copy:" + businessKey + ":" + title + ":" + description);
            if (kind && normalTitle && normalDescription) keys.push(kind + ":copy-normal:" + businessKey + ":" + normalTitle + ":" + normalDescription);
            if (kind && normalTitle && /^(photo-update|video-update|carousel-update|new-update|business-update|update)$/.test(normalTitle)) keys.push(kind + ":generic-title:" + businessKey + ":" + normalTitle);
            if (kind && normalTitle && mediaCount) keys.push(kind + ":visible-carousel:" + businessKey + ":" + normalTitle + ":" + mediaCount);
          });
          if (kind && businessKeys.length) {
            let visibleText = clean(card && card.textContent || "");
            const businessPattern = clean(businessName).replace(/[.*+?^$()|[\]\\]/g, "\\$&").replace(/[{}]/g, "\\$&");
            if (businessPattern) visibleText = visibleText.replace(new RegExp(businessPattern, "ig"), " ");
            visibleText = visibleText
              .replace(/\b(Post|Product|Clip|Nearby|Carousel|View|Today|Yesterday)\b/gi, " ")
              .replace(/\b\d+\s*\/\s*\d+\b/g, " ")
              .replace(/\.\.\.|…/g, " ")
              .replace(/\s+/g, " ")
              .trim();
            const visibleKey = slug(visibleText);
            if (visibleKey) businessKeys.forEach((businessKey) => keys.push(kind + ":visible-text:" + businessKey + ":" + visibleKey));
          }
          return Array.from(new Set(keys.filter(Boolean)));
        }
        function realListCardIdentity(card) {
          const keys = realListCardIdentityKeys(card);
          return keys[0] || "";
        }
        function dedupeRealListCards(list) {
          if (!list) return;
          const seen = new Set();
          Array.from(list.querySelectorAll(":scope > [data-card],:scope > [data-feed-id],:scope > [data-detail-kind],:scope > .post-card,:scope > .social-feed-card,:scope > .home-flow-item,:scope > .feed-product-card,:scope > .reel-card")).forEach((card) => {
            const identities = realListCardIdentityKeys(card);
            if (!identities.length) return;
            if (identities.some((identity) => seen.has(identity))) {
              card.remove();
              return;
            }
            identities.forEach((identity) => seen.add(identity));
          });
        }
        function installRealListDedupeObserver(list) {
          if (!list || list.dataset.emyRealDedupeObserver === "true") return;
          list.dataset.emyRealDedupeObserver = "true";
          let dedupeTimer = 0;
          const schedule = () => {
            if (dedupeTimer) return;
            dedupeTimer = window.setTimeout(() => {
              dedupeTimer = 0;
              dedupeRealListCards(list);
            }, 0);
          };
          [80, 320, 900, 1800].forEach((delay) => window.setTimeout(schedule, delay));
          if (!window.MutationObserver) return;
          new MutationObserver((mutations) => {
            if (mutations.some((mutation) => mutation.addedNodes && mutation.addedNodes.length)) schedule();
          }).observe(list, { childList: true });
        }
        function realInteractionFirstRows(rows, selector, emptyText) {
          const allRows = Array.isArray(rows) ? rows : [];
          if (window.__EMY_HOME_FULL_RENDER_READY__ === true) return allRows;
          const marker = clean([selector, emptyText].join(" ")).toLowerCase();
          const limit = marker.indexOf("clip") >= 0 || marker.indexOf("product") >= 0 ? 6 : 8;
          return allRows.length > limit ? allRows.slice(0, limit) : allRows;
        }
        function realHomeFlowBatchSize() {
          const size = Number(window.EMY_HOME_FLOW_BATCH_SIZE);
          return Number.isFinite(size) && size > 0 ? size : 12;
        }
        function realHomeFlowInitialCount() {
          const size = Number(window.EMY_HOME_FLOW_INITIAL_COUNT);
          if (Number.isFinite(size) && size > 0) return size;
          const fallback = Number(window.EMY_HOME_FLOW_BATCH_SIZE);
          return Number.isFinite(fallback) && fallback > 0 ? fallback : 12;
        }
        function realHomeFlowLoadMoreCount() {
          const size = Number(window.EMY_HOME_FLOW_LOAD_MORE_COUNT);
          if (Number.isFinite(size) && size > 0) return size;
          const fallback = Number(window.EMY_HOME_FLOW_BATCH_SIZE);
          return Number.isFinite(fallback) && fallback > 0 ? fallback : 6;
        }
        function isRealHomeFlowList(list) {
          return !!(list && list.matches && list.matches("[data-home-flow-list]"));
        }
        function isRealAnnexedFeedList(list) {
          return !!(list && list.matches && list.matches("[data-annexed-feed-list]"));
        }
        function realAnnexedFeedBatchSize() {
          const size = Number(window.EMY_ANNEXED_FEED_BATCH_SIZE);
          return Number.isFinite(size) && size > 0 ? size : 8;
        }
        function realVisibleRowsForList(list, rows, selector, emptyText) {
          const allRows = Array.isArray(rows) ? rows : [];
          if (isRealAnnexedFeedList(list)) {
            const batchSize = realAnnexedFeedBatchSize();
            const limit = Math.max(batchSize, Number(list.dataset.annexedFeedVisibleLimit) || batchSize);
            list.dataset.annexedFeedVisibleLimit = String(limit);
            return allRows.length > limit ? allRows.slice(0, limit) : allRows;
          }
          if (!isRealHomeFlowList(list)) return realInteractionFirstRows(allRows, selector, emptyText);
          const initialCount = realHomeFlowInitialCount();
          const limit = Math.max(initialCount, Number(list.dataset.homeFlowVisibleLimit) || initialCount);
          list.dataset.homeFlowVisibleLimit = String(limit);
          return allRows.length > limit ? allRows.slice(0, limit) : allRows;
        }
        function syncRealHomeFlowLoadMore(list, totalCount, visibleCount) {
          if (!isRealHomeFlowList(list)) return;
          const button = document.querySelector("[data-home-flow-load-more]");
          if (!button) return;
          const batchSize = realHomeFlowLoadMoreCount();
          const total = Math.max(0, Number(totalCount) || 0);
          const visible = Math.max(0, Number(visibleCount) || 0);
          const remaining = Math.max(0, total - visible);
          const hasMore = remaining > 0;
          button.hidden = !hasMore;
          button.disabled = !hasMore;
          button.textContent = hasMore ? ("Load " + Math.min(batchSize, remaining) + " more") : "All loaded";
          button.setAttribute("aria-label", hasMore ? ("Load " + Math.min(batchSize, remaining) + " more mixed feed items") : "All mixed feed items loaded");
        }
        function realHomeListEmptyText(list, emptyText) {
          if (list && list.matches && list.matches("[data-home-static-clip-list]")) return "No clips yet. Clips created by businesses you follow and nearby will appear here.";
          if (list && list.matches && list.matches("[data-home-static-product-list]")) return "No products yet. Products from businesses you follow and nearby will appear here.";
          if (list && list.matches && list.matches("[data-home-flow-list]")) return "No activity yet. Products, posts, and clips from businesses you follow and nearby will appear here.";
          return emptyText;
        }
        function realListEmptyHtml(list, emptyText) {
          const text = realHomeListEmptyText(list, emptyText);
          if (list && list.matches && list.matches("[data-home-static-clip-list],[data-home-static-product-list],[data-home-flow-list]")) {
            return '<p class="posted-jobs-empty home-list-empty" data-emy-real-empty>' + escapeAttr(text) + '</p>';
          }
          return '<p class="emy-real-empty" data-emy-real-empty>' + escapeAttr(text) + '</p>';
        }
        function realListRenderableCardCount(list) {
          if (!list || !list.querySelectorAll) return 0;
          return Array.from(list.querySelectorAll(":scope > .product-card,:scope > .feed-product-card,:scope > .post-card,:scope > .social-feed-card,:scope > .reel-card,:scope > .feed-card,:scope > .home-created-card,:scope > .home-flow-item,:scope > [data-feed-id],:scope > [data-card]")).filter((card) => {
            if (!card || card.hidden || (card.matches && card.matches("[hidden],[data-emy-real-empty],.emy-real-empty,.home-list-empty"))) return false;
            if (card.dataset && card.dataset.feedKindHidden === "true") return false;
            if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(card)) return false;
            return true;
          }).length;
        }
        function shouldPreserveAnnexedFallbackList(list, rows, visibleRows, options) {
          if (!isRealAnnexedFeedList(list)) return false;
          const opts = options || {};
          if (opts.allowShrink === true || opts.action === "delete" || opts.action === "reset") return false;
          const filter = realFeedFallbackNormalizeFilter(opts.filter || "all");
          if (filter !== "all") return false;
          const existingCount = realListRenderableCardCount(list);
          if (existingCount < Math.max(8, realAnnexedFeedBatchSize())) return false;
          const incomingCount = Array.isArray(visibleRows) ? visibleRows.length : 0;
          if (incomingCount <= 0) return true;
          if (incomingCount >= existingCount) return false;
          return incomingCount <= Math.max(3, Math.ceil(existingCount / 3));
        }
        function replaceRealList(list, selector, rows, renderer, emptyText, options) {
          if (!list) return;
          installRealListDedupeObserver(list);
          const visibleRows = realVisibleRowsForList(list, rows, selector, emptyText);
          if (shouldPreserveAnnexedFallbackList(list, rows, visibleRows, options)) return;
          const signature = visibleRows.map((item) => contentRowIdentityKeys(item).join(",")).join("|") || emptyText;
          const hasExpectedRows = realListHasExpectedRows(list, visibleRows);
          const hasManagedOverflow = realListHasManagedOverflow(list, selector, visibleRows);
          if (list.dataset.emyRealSignature === signature && hasExpectedRows && !hasManagedOverflow) {
            syncRealHomeFlowLoadMore(list, rows && rows.length, visibleRows.length);
            dedupeRealListCards(list);
            return;
          }
          list.dataset.emyRealSignature = signature;
          list.hidden = false;
          list.querySelectorAll(selector + ",[data-emy-real-empty]").forEach((node) => node.remove());
          if (!rows.length) {
            list.insertAdjacentHTML("beforeend", realListEmptyHtml(list, emptyText));
            syncRealHomeFlowLoadMore(list, 0, 0);
            return;
          }
          list.insertAdjacentHTML("beforeend", visibleRows.map(renderer).join(""));
          syncRealHomeFlowLoadMore(list, rows.length, visibleRows.length);
          dedupeRealListCards(list);
        }
        function refreshRealListMedia(list) {
          if (!list) return;
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(list);
          if (window.emySetupVideoPlayers) window.emySetupVideoPlayers(list);
          if (window.emySetupVideoDurations) window.emySetupVideoDurations(list);
          applyRealAvatars(list);
          applyRealProductMedia(list);
        }
        function businessCategories(row, activities) {
          const text = clean([row.category, row.description, row.name].join(" ")).toLowerCase();
          const categories = [];
          if (/food|drink|pizza|cafe|restaurant|grocery/.test(text)) categories.push("food");
          if (/beauty|skin|hair|nail|salon|wash|glow/.test(text)) categories.push("beauty");
          if (activities.some((item) => activityMatchesBusiness(item, row) && item.type === "Product") || /product|stock|shop|store|retail|item/.test(text)) categories.push("products");
          if (/service|repair|consult|support/.test(text)) categories.push("services");
          if (row.isCustomer) categories.push("my-businesses");
          return Array.from(new Set(categories.length ? categories : ["services"]));
        }
        function businessDeckTimeValue(value) {
          if (value && typeof value === "object") return firstClean([value.value, value.time, value.label, value.text, value.name]);
          return firstClean([value]);
        }
        function businessDeckTimeMinutes(value) {
          const raw = businessDeckTimeValue(value);
          if (raw === "") return null;
          if (typeof value === "number" && Number.isFinite(value)) {
            if (value >= 0 && value <= 24) return Math.round(value * 60);
            if (value >= 0 && value < 1440) return Math.round(value);
          }
          const text = String(raw || "").trim().toLowerCase().replace(/\./g, ":").replace(/\s+/g, " ");
          const match = text.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
          if (!match) return null;
          let hours = Number(match[1]);
          const minutes = Number(match[2] || 0);
          const period = String(match[3] || "").toLowerCase();
          if (!Number.isFinite(hours) || !Number.isFinite(minutes) || minutes < 0 || minutes > 59) return null;
          if (period === "pm" && hours < 12) hours += 12;
          if (period === "am" && hours === 12) hours = 0;
          if (hours < 0 || hours > 24 || (hours === 24 && minutes > 0)) return null;
          return hours * 60 + minutes;
        }
        function businessDeckScheduleDays(schedule) {
          const rawDays = schedule && schedule.days !== undefined ? schedule.days : [];
          if (Array.isArray(rawDays)) return rawDays.map((day) => clean(day)).filter(Boolean);
          return String(rawDays || "").split(/[,|]/).map((day) => clean(day)).filter(Boolean);
        }
        function businessDeckScheduleIncludesToday(days, now) {
          const list = Array.isArray(days) ? days : [];
          if (!list.length) return false;
          const today = now.toLocaleDateString("en-GB", { weekday: "long" }).toLowerCase();
          const shortToday = today.slice(0, 3);
          const isWeekend = today === "saturday" || today === "sunday";
          const isWeekday = !isWeekend;
          return list.some((day) => {
            const text = String(day || "").toLowerCase();
            if (/every\s*day|daily|all\s*days|7\s*days/.test(text)) return true;
            if (/weekdays|mon\s*-\s*fri|monday\s*-\s*friday/.test(text)) return isWeekday;
            if (/weekends|sat\s*-\s*sun|saturday\s*-\s*sunday/.test(text)) return isWeekend;
            return text === today || text.slice(0, 3) === shortToday;
          });
        }
        function businessDeckOpenStateFromText(value) {
          const text = String(value || "").trim();
          if (!text) return null;
          const lower = text.toLowerCase();
          if (/closed|offline|paused|pause|unavailable/.test(lower)) return { label: "Closed", isOpen: false };
          const range = lower.match(/(\d{1,2}(?::|\.)?\d{0,2}\s*(?:am|pm)?)\s*(?:-|to|until|–|—)\s*(\d{1,2}(?::|\.)?\d{0,2}\s*(?:am|pm)?)/i);
          if (range) {
            const start = businessDeckTimeMinutes(range[1]);
            const end = businessDeckTimeMinutes(range[2]);
            if (start !== null && end !== null) {
              const current = new Date().getHours() * 60 + new Date().getMinutes();
              const isOpen = end > start ? current >= start && current <= end : current >= start || current <= end;
              return { label: isOpen ? "Open" : "Closed", isOpen };
            }
          }
          if (/\bopen(?:ed)?\b|available|live/.test(lower)) return { label: "Open", isOpen: true };
          return null;
        }
        function businessDeckOpenStateFromSchedule(schedule) {
          const days = businessDeckScheduleDays(schedule);
          if (!days.length) return { label: "Hours not set", isOpen: null };
          const now = new Date();
          if (!businessDeckScheduleIncludesToday(days, now)) return { label: "Closed", isOpen: false };
          const start = businessDeckTimeMinutes(schedule.startTime);
          const end = businessDeckTimeMinutes(schedule.endTime);
          if (start === null || end === null) return { label: "Open today", isOpen: true };
          const current = now.getHours() * 60 + now.getMinutes();
          const isOpen = end > start ? current >= start && current <= end : current >= start || current <= end;
          return { label: isOpen ? "Open" : "Closed", isOpen };
        }
        function businessDeckLooksProductAvailability(value) {
          return /^(?:in\s*stock|out\s*of\s*stock|low\s*stock|available|unavailable|sold\s*out)$/i.test(String(value || "").trim());
        }
        function businessDeckMilesBetween(lat1, lon1, lat2, lon2) {
          const radiusMiles = 3958.8;
          const toRadians = (value) => value * Math.PI / 180;
          const dLat = toRadians(lat2 - lat1);
          const dLon = toRadians(lon2 - lon1);
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          return radiusMiles * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
        }
        function businessDeckSavedPoint() {
          const ask = readJson("emyAskLocation", {});
          const saved = readJson("emyCustomerAskLocation", {});
          const latitude = Number(firstClean([ask && ask.latitude, saved && saved.latitude, localStorage.getItem("emySelectedLatitude"), localStorage.getItem("emyCustomerLatitude")]));
          const longitude = Number(firstClean([ask && ask.longitude, saved && saved.longitude, localStorage.getItem("emySelectedLongitude"), localStorage.getItem("emyCustomerLongitude")]));
          return Number.isFinite(latitude) && Number.isFinite(longitude) ? { latitude, longitude } : null;
        }
        function realActiveLocationState() {
          const ask = readJson("emyAskLocation", {});
          const saved = readJson("emyCustomerAskLocation", {});
          const point = businessDeckSavedPoint();
          const radiusValue = Number(firstClean([ask && ask.radius, saved && saved.radius, localStorage.getItem("emySelectedRadius")]));
          const radius = Number.isFinite(radiusValue) ? Math.min(10, Math.max(1, Math.round(radiusValue))) : 5;
          const label = firstClean([
            ask && ask.location,
            ask && ask.locationLabel,
            saved && saved.location,
            saved && saved.locationLabel,
            localStorage.getItem("emySelectedLocation"),
            localStorage.getItem("emyCustomerLocation")
          ]);
          const source = firstClean([
            ask && ask.locationSource,
            saved && saved.locationSource,
            localStorage.getItem("emySelectedLocationSource"),
            localStorage.getItem("emyCustomerLocationSource")
          ]).toLowerCase();
          const strict = !!label && (!/^near\s*me$/i.test(label) || source === "current");
          return point ? { active: true, strict: true, latitude: point.latitude, longitude: point.longitude, radius } : { active: false, strict, latitude: null, longitude: null, radius };
        }
        function realItemLocationPoint(item) {
          if (!item || typeof item !== "object") return null;
          const directLat = Number(firstClean([item.latitude, item.lat, item.businessLatitude, item.locationLatitude]));
          const directLng = Number(firstClean([item.longitude, item.lng, item.lon, item.businessLongitude, item.locationLongitude]));
          if (Number.isFinite(directLat) && Number.isFinite(directLng) && (Math.abs(directLat) > 0.0001 || Math.abs(directLng) > 0.0001)) return { latitude: directLat, longitude: directLng };
          const business = businessByText([item.businessKey, item.key, item.profileKey, item.ownerKey, item.businessName, item.business, item.actorName, item.actor, item.ownerName, item.name, item.title]);
          if (!business || business === item) return null;
          const businessLat = Number(firstClean([business.latitude, business.lat, business.businessLatitude, business.locationLatitude]));
          const businessLng = Number(firstClean([business.longitude, business.lng, business.lon, business.businessLongitude, business.locationLongitude]));
          return Number.isFinite(businessLat) && Number.isFinite(businessLng) && (Math.abs(businessLat) > 0.0001 || Math.abs(businessLng) > 0.0001)
            ? { latitude: businessLat, longitude: businessLng }
            : null;
        }
        function realBusinessLocationLooksUnset(value) {
          const text = clean(value).replace(/\s+/g, " ").trim();
          if (!text) return true;
          return /^(current location|use current location|near me|location not set|location to confirm|add address|choose location|choose address|address not set|business location not set)$/i.test(text);
        }
        function realBusinessAddressValue() {
          return Array.from(arguments).map(clean).find((value) => value && !realBusinessLocationLooksUnset(value)) || "";
        }
        function realBusinessHasUsableLocation(item) {
          if (!item || typeof item !== "object") return false;
          if (realItemLocationPoint(item)) return true;
          return !!realBusinessAddressValue(
            item.location,
            item.businessLocation,
            item.address,
            item.businessAddress,
            item.businessAddressLine1,
            item.postcode,
            item.businessPostcode
          );
        }
        function realFeedRowHasUsableBusinessLocation(item) {
          if (!item || typeof item !== "object") return false;
          if (realBusinessHasUsableLocation(item)) return true;
          const business = businessByText([item.businessKey, item.key, item.profileKey, item.ownerKey, item.businessName, item.business, item.actorName, item.actor, item.ownerName, item.name, item.title]);
          return realBusinessHasUsableLocation(business);
        }
        function realCustomerBusinessRecordHasUsableLocation(item, fallbackKey) {
          const row = item && typeof item === "object" ? item : {};
          if (realBusinessHasUsableLocation(row)) return true;
          const aliases = customerBusinessRelationAliases(row, fallbackKey);
          if (!aliases.length) return false;
          return realBusinessRegistry().some((business) => {
            if (!realBusinessHasUsableLocation(business)) return false;
            const businessAliases = customerBusinessRelationAliases(business, business && (business.key || business.businessKey || business.name));
            return aliases.some((alias) => businessAliases.indexOf(alias) >= 0);
          });
        }
        function realItemWithinActiveRadius(item) {
          const state = realActiveLocationState();
          if (!state.active) return !state.strict;
          const point = realItemLocationPoint(item);
          if (!point) return false;
          return businessDeckMilesBetween(state.latitude, state.longitude, point.latitude, point.longitude) <= state.radius;
        }
        function realBusinessRowIsCurrentOwned(item) {
          const current = currentBusinessRow();
          if (!current || !item) return false;
          return [item.key, item.businessKey, item.profileKey, item.ownerKey, item.name, item.businessName, item.business, item.title]
            .some((value) => isCurrentBusiness(value) || slug(value) === current.key || slug(value) === slug(current.name));
        }
        function realBusinessRowHasExplicitRelation(item) {
          if (!item) return false;
          const key = businessIdentityKey(item) || itemBusinessKey(item, firstClean([item.key, item.name, item.businessName, item.business]));
          return customerBusinessRecordHasExplicitRelation(item, key);
        }
        function realBusinessRowAllowedByLocation(item) {
          if (realBusinessRowHasExplicitRelation(item)) return true;
          if (!realBusinessHasUsableLocation(item)) return false;
          const state = realActiveLocationState();
          if (!state.strict) return true;
          if (!state.active) return false;
          return realItemWithinActiveRadius(item);
        }
        function realFeedRowAllowedByLocation(row) {
          if (itemCustomerOwned(row)) return true;
          if (realFeedRowIsFollowedBusiness(row)) return true;
          if (!realFeedRowHasUsableBusinessLocation(row)) return false;
          const state = realActiveLocationState();
          if (!state.strict) return true;
          if (!state.active) return false;
          return realItemWithinActiveRadius(row);
        }
        function businessDeckStatusState(item) {
          const schedule = item && item.workingDaysSchedule && typeof item.workingDaysSchedule === "object" ? item.workingDaysSchedule : null;
          if (schedule && businessDeckScheduleDays(schedule).length) return businessDeckOpenStateFromSchedule(schedule);
          const hours = firstClean([item && item.workingDays, item && item.hours, item && item.businessHours, item && item.openingHours]);
          if (hours && !businessDeckLooksProductAvailability(hours)) {
            const hoursState = businessDeckOpenStateFromText(hours);
            return hoursState || { label: "Hours listed", isOpen: null };
          }
          const raw = firstClean([item && item.openStatus, item && item.hoursStatus, item && item.statusText, item && item.status]).toLowerCase();
          if (/closed|offline|paused|pause|unavailable/.test(raw)) return { label: "Closed", isOpen: false };
          if (/^open(ed)?$|available|live|approved/.test(raw)) return { label: "Open", isOpen: true };
          return { label: "Hours not set", isOpen: null };
        }
        function businessDeckStatusClass(state) {
          return state && state.isOpen === false ? " closed" : state && state.isOpen === null ? " is-muted" : "";
        }
        function businessDeckFactClass(value, item, statusState) {
          const text = String(value || "").trim();
          const lower = text.toLowerCase();
          if (statusState && text === statusState.label) return statusState.isOpen === false ? " is-closed" : statusState.isOpen === null ? " is-hours" : " is-open";
          if (/closed|offline/.test(lower)) return " is-closed";
          if (/\bopen|today|live|available/.test(lower) && !businessDeckLooksProductAvailability(text)) return " is-open";
          if (/hour|mon|tue|wed|thu|fri|sat|sun|\d/.test(lower)) return " is-hours";
          if (item && text === firstClean([item.address, item.location, item.city, item.postcode])) return " is-location";
          return " is-category";
        }
        function businessDeckFactChipHtml(value, item, statusState) {
          return '<span class="business-meta-chip' + businessDeckFactClass(value, item, statusState) + '">' + escapeAttr(value) + '</span>';
        }
        function businessAddressHtml(value) {
          const text = String(value || "").replace(/\s+/g, " ").trim();
          if (!text) return "";
          const postcodeMatch = text.match(/\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/i);
          const postcode = postcodeMatch ? postcodeMatch[0].toUpperCase().replace(/\s+/, " ") : "";
          let body = postcodeMatch ? text.replace(postcodeMatch[0], "") : text;
          body = body.replace(/\s*,\s*,+/g, ",").replace(/^\s*,\s*|\s*,\s*$/g, "").trim();
          const parts = body.split(",").map((part) => part.trim()).filter(Boolean);
          let country = "";
          if (parts.length && /^(?:united kingdom|uk)$/i.test(parts[parts.length - 1])) country = parts.pop();
          const regionParts = [];
          if (parts.length > 3) regionParts.unshift(parts.pop());
          if (parts.length > 3 && /^(?:england|scotland|wales|northern ireland)$/i.test(parts[parts.length - 1])) regionParts.unshift(parts.pop());
          const street = parts.slice(0, Math.min(2, parts.length)).join(", ");
          const locality = parts.slice(Math.min(2, parts.length)).join(", ");
          const rows = [];
          if (street) rows.push('<span class="business-address-main">' + escapeAttr(street) + '</span>');
          if (locality) rows.push('<span class="business-address-locality">' + escapeAttr(locality) + '</span>');
          if (regionParts.length) rows.push('<span class="business-address-region">' + escapeAttr(regionParts.join(", ")) + '</span>');
          const meta = [postcode, country].filter(Boolean);
          if (meta.length) rows.push('<span class="business-address-meta">' + meta.map((item) => '<span>' + escapeAttr(item) + '</span>').join("") + '</span>');
          if (!rows.length) rows.push('<span class="business-address-main">' + escapeAttr(text) + '</span>');
          return '<div class="business-address" data-business-address><span class="business-address-label">Address</span>' + rows.join("") + '</div>';
        }
        function businessDeckDistanceLabel(item, categories) {
          if (item && item.explicitBusinessProfile && isCurrentBusiness(item.name || item.key)) return "Your business";
          if (categories && categories.includes("my-businesses") || item && item.isCustomer) return "My Business";
          const explicitDistance = firstClean([item && item.distance, item && item.distanceText, item && item.milesText]);
          if (explicitDistance && /\d/.test(explicitDistance)) return explicitDistance;
          const point = businessDeckSavedPoint();
          const businessLat = Number(firstClean([item && item.businessLatitude, item && item.latitude, item && item.lat]));
          const businessLon = Number(firstClean([item && item.businessLongitude, item && item.longitude, item && item.lon, item && item.lng]));
          if (point && Number.isFinite(businessLat) && Number.isFinite(businessLon)) {
            const distance = businessDeckMilesBetween(point.latitude, point.longitude, businessLat, businessLon);
            return (distance < 10 ? distance.toFixed(1) : Math.round(distance)) + " mi";
          }
          return firstClean([item && item.location, item && item.address, item && item.city, item && item.postcode]) ? "Location saved" : "Distance not set";
        }
        function businessDeckFactList(item, statusState) {
          const seen = new Set();
          const facts = [];
          const add = (value) => {
            const text = firstClean([value]);
            if (!text) return;
            const key = text.toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);
            facts.push(text);
          };
          add(item && item.category);
          add(item && item.sector);
          add(item && item.service);
          add(firstClean([item && item.address, item && item.location, item && item.city, item && item.postcode]));
          const hours = firstClean([item && item.workingDays, item && item.hours, item && item.businessHours, item && item.openingHours]);
          if (hours && !businessDeckLooksProductAvailability(hours)) add(hours);
          return facts.slice(0, 5);
        }
        function hydrateRealNearby() {
          const businesses = realBusinessDeckRows();
          const activities = realActivityRows();
          const panel = document.querySelector("[data-nearby-map-panel]");
          const list = document.querySelector(".nearby-business-list");
          const label = document.querySelector("[data-nearby-map-label]");
          if (label) label.textContent = localStorage.getItem("emySelectedLocationLabel") || localStorage.getItem("emyCustomerLocationLabel") || "Your saved area";
          if (panel) {
            if (!panel.classList.contains("has-live-map")) panel.classList.add("is-fallback-map");
            panel.querySelectorAll(".nearby-map-pin").forEach((node) => node.remove());
            const pinPositions = [
              ["32%", "46%"], ["62%", "34%"], ["52%", "62%"], ["74%", "54%"], ["41%", "28%"], ["70%", "70%"], ["24%", "66%"], ["84%", "38%"]
            ];
            const pinRows = businesses.map((item, index) => {
              const categories = businessCategories(item, activities);
              const position = pinPositions[index % pinPositions.length];
              const key = item.key || item.name;
              const initial = firstClean([item.name]).charAt(0).toUpperCase() || "B";
              const avatar = item.photo || item.photoRef
                ? '<span class="has-image" data-avatar-initial="' + escapeAttr(initial) + '"><img' + (item.photo ? ' src="' + escapeAttr(item.photo) + '"' : '') + (item.photoRef ? ' data-emy-media-ref="' + escapeAttr(item.photoRef) + '"' : '') + ' alt="" /></span>'
                : '<span data-avatar-initial="' + escapeAttr(initial) + '">' + escapeAttr(initial) + '</span>';
              return '<a class="nearby-map-pin" href="emy-business-profile.html?business=' + encodeURIComponent(key) + '" data-business-link="' + escapeAttr(key) + '" data-nearby-business="' + escapeAttr(key) + '" data-nearby-category="' + escapeAttr(categories.join(" ")) + '" style="--x: ' + position[0] + '; --y: ' + position[1] + ';" aria-label="' + escapeAttr(item.name) + ' on map">' + avatar + '</a>';
            }).join("");
            if (pinRows) panel.insertAdjacentHTML("beforeend", pinRows);
          }
          if (list) {
            const rows = businesses.map((item) => {
              const categories = businessCategories(item, activities);
              const latest = activities.find((activity) => activityMatchesBusiness(activity, item));
              const statusState = businessDeckStatusState(item);
              const distanceLabel = businessDeckDistanceLabel(item, categories);
              const ownBusinessDistance = /^(your business|my business)$/i.test(distanceLabel);
              const distanceHtml = ownBusinessDistance
                ? '<span class="nearby-distance is-own-business"><strong data-nearby-distance="' + escapeAttr(item.key || item.name) + '">' + escapeAttr(distanceLabel) + '</strong></span>'
                : '<span class="nearby-distance"><strong data-nearby-distance="' + escapeAttr(item.key || item.name) + '">' + escapeAttr(distanceLabel) + '</strong><span data-nearby-travel="' + escapeAttr(item.key || item.name) + '">Open profile</span></span>';
              const detail = firstClean([item.location, item.address, item.postcode]) || "Location not set";
              const countText = [item.products ? item.products + " product" + (Number(item.products) === 1 ? "" : "s") : "", item.clips ? item.clips + " clip" + (Number(item.clips) === 1 ? "" : "s") : "", item.posts ? item.posts + " post" + (Number(item.posts) === 1 ? "" : "s") : ""].filter(Boolean).slice(0, 2).join(" - ");
              return '<a class="nearby-business-row" href="emy-business-profile.html?business=' + encodeURIComponent(item.key || item.name) + '" data-business-link="' + escapeAttr(item.key || item.name) + '" data-nearby-business="' + escapeAttr(item.key || item.name) + '" data-nearby-category="' + escapeAttr(categories.join(" ")) + '">' +
                avatarMarkup("nearby-business-media", item) +
                '<span class="nearby-business-copy"><span class="nearby-city">' + escapeAttr(detail) + '</span><strong>' + escapeAttr(item.name) + '</strong>' + distanceHtml + '</span>' +
                '<span class="nearby-business-meta"><span class="nearby-status' + (statusState.isOpen === false ? " is-closed" : "") + '"><span>' + escapeAttr(statusState.label) + '</span></span>' + (countText ? '<span class="nearby-business-counts">' + escapeAttr(countText) + '</span>' : '') + '</span>' +
              '</a>';
            }).join("");
            insertRealRows(list, ".nearby-business-row", "", rows, "No real nearby businesses yet.", businesses.map((item) => item.key + item.name + item.photo + item.photoRef).join("|"));
          }
        }
        function businessLikeButtonHtml(count, item) {
          const safeCount = Math.max(0, Number(count) || 0);
          return '<div class="business-card-actions">' + businessCustomerBadgeHtml(item || null, item && (item.key || item.businessKey || item.name)) + '<button class="business-like-button" type="button" data-business-like data-business-like-unique-only="true" aria-pressed="false"><span class="emy-business-like-icon" aria-hidden="true"><svg class="emy-business-like-bag" viewBox="0 0 24 24" fill="none" focusable="false" aria-hidden="true"><path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/><path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/><path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/><path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/></svg></span><span data-business-like-label>Like business</span><strong data-business-like-count data-raw-count="' + escapeAttr(safeCount) + '">' + escapeAttr(safeCount) + '</strong></button></div>';
        }
        function businessCoverControlsHtml() {
          return '<div class="business-cover-controls" data-business-cover-controls><button class="business-cover-control is-on" type="button" data-business-cover-play aria-pressed="true" aria-label="Pause business video"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z" stroke="currentColor" stroke-linejoin="round"/></svg></button><button class="business-cover-control" type="button" data-business-cover-restart aria-label="Restart business video"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7v5H2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.2 12A7 7 0 1 0 8.1 6.9L7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button><button class="business-cover-control" type="button" data-business-cover-mute aria-pressed="true" aria-label="Unmute business video"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9.5v5h4l5 4v-13l-5 4H4Z" stroke="currentColor" stroke-linejoin="round"/><path d="m18 9 3 3m0-3-3 3" stroke="currentColor" stroke-linecap="round"/></svg></button></div>';
        }
        function businessCoverControlIconMarkup(name) {
          if (name === "pause") return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z" stroke="currentColor" stroke-linejoin="round"/></svg>';
          if (name === "play") return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z" stroke="currentColor" stroke-linejoin="round"/></svg>';
          if (name === "sound") return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9.5v5h4l5 4v-13l-5 4H4Z" stroke="currentColor" stroke-linejoin="round"/><path d="M16 9.5c.8.7 1.2 1.5 1.2 2.5S16.8 13.9 16 14.5M18.5 7.5c1.4 1.3 2.2 2.8 2.2 4.5s-.8 3.2-2.2 4.5" stroke="currentColor" stroke-linecap="round"/></svg>';
          return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9.5v5h4l5 4v-13l-5 4H4Z" stroke="currentColor" stroke-linejoin="round"/><path d="m18 9 3 3m0-3-3 3" stroke="currentColor" stroke-linecap="round"/></svg>';
        }
        function businessCoverControlContext(button) {
          const controls = button ? button.closest("[data-business-cover-controls]") : null;
          const card = button ? button.closest("[data-business-card], .business-card, [data-card]") : null;
          const localRoot = button && (button.closest(".photo") || button.closest(".business-cover") || (controls && controls.parentElement));
          const media = (localRoot && localRoot.querySelector ? localRoot.querySelector("video[data-business-cover-media]") : null) || (card && card.querySelector ? card.querySelector("video[data-business-cover-media]") : null);
          const root = (media && media.closest && (media.closest(".photo") || media.closest(".business-cover"))) || localRoot || card;
          return { root, media };
        }
        function syncBusinessCoverControlButtons(photo) {
          const media = photo ? photo.querySelector("video[data-business-cover-media]") : null;
          if (!media) return;
          const playButton = photo.querySelector("[data-business-cover-play]");
          const muteButton = photo.querySelector("[data-business-cover-mute]");
          if (playButton) {
            const isPlaying = !media.paused && !media.ended;
            playButton.classList.toggle("is-on", isPlaying);
            playButton.setAttribute("aria-pressed", isPlaying ? "true" : "false");
            playButton.setAttribute("aria-label", isPlaying ? "Pause business video" : "Play business video");
            playButton.innerHTML = businessCoverControlIconMarkup(isPlaying ? "pause" : "play");
          }
          if (muteButton) {
            const isMuted = media.muted || Number(media.volume) <= 0;
            muteButton.classList.toggle("is-on", !isMuted);
            muteButton.setAttribute("aria-pressed", isMuted ? "true" : "false");
            muteButton.setAttribute("aria-label", isMuted ? "Unmute business video" : "Mute business video");
            muteButton.innerHTML = businessCoverControlIconMarkup(isMuted ? "muted" : "sound");
          }
        }
        function playBusinessCoverMedia(media, photo) {
          if (!media) return;
          if (media.dataset) media.dataset.businessCoverUserPaused = "false";
          if (window.emyPauseOtherMedia) window.emyPauseOtherMedia(media);
          const playPromise = media.play();
          if (playPromise && typeof playPromise.then === "function") {
            playPromise.then(() => syncBusinessCoverControlButtons(photo)).catch(() => syncBusinessCoverControlButtons(photo));
          } else {
            syncBusinessCoverControlButtons(photo);
          }
        }
        function handleBusinessCoverControlPress(event) {
          if (!event || !event.target || !event.target.closest) return false;
          const playButton = event.target.closest("[data-business-cover-play]");
          const restartButton = event.target.closest("[data-business-cover-restart]");
          const muteButton = event.target.closest("[data-business-cover-mute]");
          const button = playButton || restartButton || muteButton;
          if (!button) return false;
          event.stopPropagation();
          if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
          if ((event.type || "") === "pointerdown") return true;
          event.preventDefault();
          const handledAt = Number(button.dataset.businessCoverHandledAt || 0);
          const now = Date.now();
          if ((event.type || "") === "click" && handledAt && now - handledAt < 700) return true;
          if ((event.type || "") !== "click") button.dataset.businessCoverHandledAt = String(now);
          const context = businessCoverControlContext(button);
          const photo = context.root;
          const media = context.media;
          if (!media) return true;
          if (restartButton) {
            try { media.currentTime = 0; } catch (error) {}
            playBusinessCoverMedia(media, photo);
            return true;
          }
          if (playButton) {
            if (media.paused || media.ended) {
              playBusinessCoverMedia(media, photo);
            } else {
              if (media.dataset) media.dataset.businessCoverUserPaused = "true";
              media.pause();
              syncBusinessCoverControlButtons(photo);
            }
            return true;
          }
          if (muteButton) {
            const nextMuted = !(media.muted || Number(media.volume) <= 0);
            media.muted = nextMuted;
            media.defaultMuted = nextMuted;
            if (!nextMuted && Number(media.volume) <= 0) {
              try { media.volume = 0.8; } catch (error) {}
            }
            syncBusinessCoverControlButtons(photo);
            if (!nextMuted && (media.paused || media.ended)) playBusinessCoverMedia(media, photo);
            return true;
          }
          return true;
        }
        function installBusinessCoverControlHandlers() {
          if (window.__emyBusinessCoverControlHandlersInstalled) return;
          window.__emyBusinessCoverControlHandlersInstalled = true;
          document.addEventListener("pointerdown", (event) => {
            if (event.target && event.target.closest && event.target.closest("[data-business-cover-controls]")) handleBusinessCoverControlPress(event);
          }, true);
          document.addEventListener("click", (event) => {
            handleBusinessCoverControlPress(event);
          }, true);
        }
        function businessMediaDurationLabel(media) {
          if (!media || media.type !== "video") return "";
          const explicit = firstClean([media.duration, media.videoDuration, media.durationLabel]);
          if (explicit) return explicit;
          const start = Math.max(0, Number(media.videoStart) || 0);
          const end = media.videoEnd !== undefined && media.videoEnd !== "" ? Number(media.videoEnd) : 0;
          if (!Number.isFinite(end) || end <= start) return "";
          const total = Math.round(end - start);
          return Math.floor(total / 60) + ":" + String(total % 60).padStart(2, "0");
        }
        function businessCoverHtml(cover) {
          if (!cover || !(cover.src || cover.ref)) return "";
          if (cover.type === "video") {
            return '<video data-business-cover-media muted loop playsinline autoplay preload="auto"' + (cover.src ? ' src="' + escapeAttr(cover.src) + '"' : '') + (cover.ref ? ' data-emy-media-ref="' + escapeAttr(cover.ref) + '"' : '') + '></video>' + businessCoverControlsHtml();
          }
          return '<img data-business-cover-media' + (cover.src ? ' src="' + escapeAttr(cover.src) + '"' : '') + (cover.ref ? ' data-emy-media-ref="' + escapeAttr(cover.ref) + '"' : '') + ' alt="" />';
        }
        function activateBusinessDeckMedia(stage) {
          if (!stage) return;
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(stage);
          if (window.emySetupVideoDurations) window.emySetupVideoDurations(stage);
          stage.querySelectorAll("video[data-business-cover-media]").forEach((video) => {
            video.muted = true;
            video.defaultMuted = true;
            video.loop = true;
            video.playsInline = true;
            video.setAttribute("muted", "");
            video.setAttribute("playsinline", "");
            video.setAttribute("preload", "metadata");
            const photo = video.closest(".photo") || video.closest(".business-cover") || video.closest("[data-business-card]");
            if (!video.dataset.businessCoverUserPaused) video.dataset.businessCoverUserPaused = "false";
            if (photo && video.dataset.businessCoverResumeBound !== "true") {
              video.dataset.businessCoverResumeBound = "true";
              let businessCoverResumeTimer = 0;
              const resumeBusinessCover = () => {
                if (video.dataset.businessCoverUserPaused === "true" || document.hidden) return;
                const now = Date.now();
                const lastResume = Number(video.dataset.businessCoverLastResume || 0);
                if (lastResume && now - lastResume < 900) return;
                video.dataset.businessCoverLastResume = String(now);
                const resumePromise = video.play();
                if (resumePromise && typeof resumePromise.catch === "function") resumePromise.catch(() => {});
                syncBusinessCoverControlButtons(photo);
              };
              const scheduleBusinessCoverResume = () => {
                if (businessCoverResumeTimer) window.clearTimeout(businessCoverResumeTimer);
                businessCoverResumeTimer = window.setTimeout(() => {
                  businessCoverResumeTimer = 0;
                  if (!photo.matches(":hover") && !photo.contains(document.activeElement)) return;
                  resumeBusinessCover();
                }, 180);
              };
              const cancelBusinessCoverResume = () => {
                if (!businessCoverResumeTimer) return;
                window.clearTimeout(businessCoverResumeTimer);
                businessCoverResumeTimer = 0;
              };
              photo.addEventListener("mouseenter", scheduleBusinessCoverResume);
              photo.addEventListener("pointerenter", scheduleBusinessCoverResume);
              photo.addEventListener("focusin", scheduleBusinessCoverResume);
              photo.addEventListener("mouseleave", cancelBusinessCoverResume);
              photo.addEventListener("focusout", cancelBusinessCoverResume);
            }
            if (photo && video.dataset.businessCoverEventsBound !== "true") {
              video.dataset.businessCoverEventsBound = "true";
              ["play", "pause", "ended", "volumechange", "loadedmetadata"].forEach((type) => {
                video.addEventListener(type, () => syncBusinessCoverControlButtons(photo));
              });
              syncBusinessCoverControlButtons(photo);
            }
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
          });
        }
        function hydrateRealBusinessDeck() {
          const deck = document.querySelector("[data-business-deck]");
          const stage = deck && deck.querySelector(".business-stage");
          if (!stage) return;
          const businesses = realBusinessDeckRows();
          const activities = realActivityRows();
          const signature = businesses.map((item) => [item.key, item.name, item.photo, item.photoRef, item.description, item.category, item.sector, item.service, item.address, item.location, item.postcode, item.distance, item.latitude, item.longitude, item.workingDays, item.status, item.statusText, item.cover && (item.cover.ref || item.cover.src)].join("~")).join("|");
          const existingCards = Array.from(stage.querySelectorAll("[data-business-card]"));
          if (!businesses.length) {
            if (existingCards.length && !stage.dataset.emyRealSignature) {
              deck.classList.remove("is-empty", "is-hydrating");
              stage.querySelectorAll("[data-emy-real-empty],[data-emy-real-loading]").forEach((node) => node.remove());
              deck.setAttribute("data-business-count", String(existingCards.length));
              if (typeof window.emySetupBusinessDeck === "function") window.emySetupBusinessDeck();
              else if (typeof window.emyRenderBusinessDeck === "function") window.emyRenderBusinessDeck();
              else if (typeof window.emyRenderBusinessPreview === "function") window.emyRenderBusinessPreview();
              return;
            }
            stage.querySelectorAll("[data-business-card],[data-emy-real-empty]").forEach((node) => node.remove());
            delete stage.dataset.emyRealSignature;
            delete stage.dataset.emyRealMediaActivatedSignature;
            syncBusinessDeckEmptyState();
            return;
          }
          const expectedKeys = businesses.map((item) => slug(item.key || item.name)).join("|");
          const existingKeys = existingCards.map((card) => slug(card.dataset.businessKey || card.querySelector("h3") && card.querySelector("h3").textContent)).join("|");
          const needsDomFix = existingCards.length !== businesses.length ||
            existingKeys !== expectedKeys ||
            (businesses.length <= 1 && !deck.classList.contains("is-single-business")) ||
            (businesses.length <= 1 && existingCards.some((card) => !card.classList.contains("is-active") || card.getAttribute("aria-hidden") !== "false"));
          if (stage.dataset.emyRealSignature === signature && !needsDomFix) {
            if (stage.dataset.emyRealMediaActivatedSignature !== signature) {
              stage.dataset.emyRealMediaActivatedSignature = signature;
              activateBusinessDeckMedia(stage);
            }
            if (window.emyRefreshBusinessCustomerBadges) window.emyRefreshBusinessCustomerBadges(stage);
            return;
          }
          stage.dataset.emyRealSignature = signature;
          stage.dataset.emyRealMediaActivatedSignature = "";
          const singleBusiness = businesses.length <= 1;
          deck.dataset.businessDeckReady = businesses.length ? "true" : "false";
          deck.classList.toggle("is-single-business", singleBusiness);
          deck.setAttribute("data-business-count", String(businesses.length));
          deck.querySelectorAll("[data-business-prev],[data-business-next]").forEach((button) => {
            button.hidden = singleBusiness;
            button.disabled = singleBusiness;
            button.setAttribute("aria-disabled", singleBusiness ? "true" : "false");
          });
          const sideToggle = document.querySelector(".deck-side-toggle");
          if (sideToggle) sideToggle.hidden = singleBusiness;
          const dots = document.querySelector("[data-business-dots]");
          if (dots) {
            dots.hidden = singleBusiness;
            dots.innerHTML = singleBusiness ? "" : businesses.map((item, index) => '<button type="button" class="' + (index === 0 ? 'is-active' : '') + '" aria-label="Show ' + escapeAttr(item.name) + '" aria-current="' + (index === 0 ? 'true' : 'false') + '"></button>').join("");
          }
          stage.querySelectorAll("[data-business-card],[data-emy-real-empty]").forEach((node) => node.remove());
          if (!businesses.length) {
            syncBusinessDeckEmptyState();
            return;
          }
          const cards = businesses.map((item, index) => {
            const categories = businessCategories(item, activities);
            const description = firstClean([item.description]);
            const detailLine = firstClean([item.sector, item.service, item.location]);
            const cover = item.cover || null;
            const coverHtml = businessCoverHtml(cover);
            const duration = businessMediaDurationLabel(cover);
            const statusState = businessDeckStatusState(item);
            const distanceLabel = businessDeckDistanceLabel(item, categories);
            const addressLine = firstClean([item.address, item.businessAddress, item.businessAddressLine1, item.location, item.city, item.postcode]);
            const profileMeta = businessDeckFactList(item, statusState).filter((value) => value !== detailLine && value !== addressLine);
            const avatarInitial = clean(item.name).charAt(0).toUpperCase() || "B";
            const descriptionHtml = description ? '<p class="business-description">' + escapeAttr(description) + '</p>' : '';
            const detailLineHtml = detailLine ? '<p class="business-card-kicker">' + escapeAttr(detailLine) + '</p>' : '';
            return '<article class="card business-card' + (index === 0 ? ' is-active' : index === 1 ? ' is-next' : index === 2 ? ' is-after' : ' is-back') + '" data-business-card data-business-key="' + escapeAttr(item.key || item.name) + '"' + (duration ? ' data-video-duration="' + escapeAttr(duration) + '"' : '') + ' data-search-text="' + escapeAttr([item.name, item.category, item.description, item.location].join(" ").toLowerCase()) + '" aria-hidden="' + (index === 0 ? 'false' : 'true') + '">' +
              '<div class="photo feed' + (coverHtml ? ' has-media' : '') + '">' + coverHtml +
                '<a class="business-avatar' + (item.photo || item.photoRef ? ' has-image' : '') + '" href="emy-business-profile.html?business=' + encodeURIComponent(item.key || item.name) + '" data-business-link="' + escapeAttr(item.key || item.name) + '" data-avatar-initial="' + escapeAttr(avatarInitial) + '" data-business-name="' + escapeAttr(item.name) + '" aria-label="Open ' + escapeAttr(item.name) + ' profile">' + (item.photo || item.photoRef ? '<img' + (item.photo ? ' src="' + escapeAttr(item.photo) + '"' : '') + (item.photoRef ? ' data-emy-media-ref="' + escapeAttr(item.photoRef) + '"' : '') + ' alt="" />' : escapeAttr(avatarInitial)) + '</a>' +
                '<a class="business-media-chip" href="emy-business-profile.html?business=' + encodeURIComponent(item.key || item.name) + '" data-business-link="' + escapeAttr(item.key || item.name) + '">Profile</a>' +
              '</div>' +
              '<div class="body"><h3><a class="business-title-link" href="emy-business-profile.html?business=' + encodeURIComponent(item.key || item.name) + '" data-business-link="' + escapeAttr(item.key || item.name) + '">' + escapeAttr(item.name) + '</a></h3>' + descriptionHtml + detailLineHtml + businessAddressHtml(addressLine) + (profileMeta.length ? '<div class="business-profile-meta">' + profileMeta.map((value) => businessDeckFactChipHtml(value, item, statusState)).join("") + '</div>' : '') + businessLikeButtonHtml(0, item) + '<div class="status-row"><span class="status' + businessDeckStatusClass(statusState) + '">' + escapeAttr(statusState.label) + '</span><span class="distance">' + escapeAttr(distanceLabel) + '</span></div></div>' +
            '</article>';
          }).join("");
          stage.insertAdjacentHTML("beforeend", cards);
          activateBusinessDeckMedia(stage);
          stage.dataset.emyRealMediaActivatedSignature = signature;
          if (window.emySetupBusinessDeck) window.emySetupBusinessDeck();
          else if (window.emyRenderBusinessDeck) window.emyRenderBusinessDeck();
          else if (window.emyRenderBusinessPreview) window.emyRenderBusinessPreview();
          if (window.emyRefreshBusinessCustomerBadges) window.emyRefreshBusinessCustomerBadges(stage);
          syncBusinessDeckEmptyState();
        }
        function realListHasNativeCards(list) {
          if (!list || !list.querySelectorAll) return false;
          const cards = Array.from(list.querySelectorAll(":scope > .product-card,:scope > .feed-product-card,:scope > .post-card,:scope > .social-feed-card,:scope > .reel-card,:scope > .feed-card,:scope > .home-created-card,:scope > [data-feed-id]"));
          return cards.some((card) => {
            if (!card || card.hidden || card.hasAttribute("hidden")) return false;
            if (card.hasAttribute("data-emy-real-empty")) return false;
            if (!card.matches("[data-feed-id],[data-detail-kind],[data-open-item-detail]")) return false;
            if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(card)) return false;
            const businessText = elementBusinessText(card);
            const fullText = card.textContent || "";
            if (looksDemoText(fullText)) return false;
            return !looksDemoText(businessText || fullText);
          });
        }
      function purgeDeletedRealListCards(list) {
        if (!list || !list.querySelectorAll) return;
        list.querySelectorAll(":scope > [data-feed-id],:scope > [data-card]").forEach((card) => {
          if (card.dataset && card.dataset.ignoreCustomerFeedTombstone === "true") return;
          const feedId = card.dataset && card.dataset.feedId || "";
          let deleted = !!(window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(card));
          if (!deleted && feedId) {
              try {
                const state = JSON.parse(localStorage.getItem("emyFeedActionState") || "{}");
                if (state[feedId] && state[feedId].deleted) deleted = true;
              } catch (error) {}
            }
            if (!deleted) return;
            card.remove();
            delete list.dataset.emyRealSignature;
          });
        }
        function realFeedCustomerBusinessKeys() {
          const keys = new Set();
          try {
            realCustomerBusinesses().forEach((item) => {
              const key = businessIdentityKey(item);
              if (customerBusinessRecordIsCurrentOwned(item, key) || currentOwnedBusinessKeyIsOnlyOwner(key)) return;
              if (key) keys.add(key);
            });
          } catch (error) {}
          const businesses = readJson("emyCustomerBusinesses", {});
          if (businesses && typeof businesses === "object" && !Array.isArray(businesses)) {
            Object.keys(businesses).forEach((storageKey) => {
              const item = businesses[storageKey] || {};
              if (customerBusinessRecordIsCurrentOwned(item, storageKey)) return;
              if (localStorage.getItem("emyCustomerBusiness:" + (item.key || item.businessKey || storageKey)) === "0") return;
              if (item.active === false || item.isCustomer === false) return;
              const key = slug(firstClean([item.key, item.businessKey, storageKey, item.name, item.businessName, item.business, item.title]));
              if (key) keys.add(key);
            });
          }
          try {
            for (let index = 0; index < localStorage.length; index += 1) {
              const storageKey = localStorage.key(index) || "";
              if (storageKey.indexOf("emyCustomerBusiness:") !== 0) continue;
              if (localStorage.getItem(storageKey) === "1") {
                const key = slug(storageKey.slice("emyCustomerBusiness:".length));
                if (currentOwnedBusinessKeyIsOnlyOwner(key)) continue;
                if (key) keys.add(key);
              }
            }
          } catch (error) {}
          return keys;
        }
        function realFeedRowBusinessKey(row) {
          return slug(firstClean([row && row.businessKey, row && row.key, row && row.businessName, row && row.business]));
        }
        function realFeedRowIsFollowedBusiness(row) {
          const key = realFeedRowBusinessKey(row);
          return !!key && realFeedCustomerBusinessKeys().has(key);
        }
        function realFeedRowIsNearbyBusiness(row) {
          if (itemCustomerOwned(row)) return false;
          if (realFeedRowIsFollowedBusiness(row)) return false;
          const source = firstClean([row && row.source, row && row.feedSource]);
          return !source || /^nearby$/i.test(source) || !/^my business/i.test(source);
        }
        function realFeedRowsForFilter(filter, products, posts, clips) {
          const value = clean(filter || "all").toLowerCase();
          products = products.filter(realFeedRowAllowedByLocation);
          posts = posts.filter(realFeedRowAllowedByLocation);
          clips = clips.filter(realFeedRowAllowedByLocation);
          const allRows = products.concat(posts, clips);
          if (value === "individual") return allRows.filter((row) => itemCustomerOwned(row));
          if (value === "my" || value === "my-businesses") return allRows.filter((row) => realFeedRowIsFollowedBusiness(row) && !itemCustomerOwned(row));
          if (value === "business" || value === "businesses") return allRows.filter((row) => realFeedRowIsNearbyBusiness(row));
          if (value === "product" || value === "products") return products;
          if (value === "clip" || value === "clips" || value === "reels") return clips.filter((row) => row.type === "clip");
          if (value === "job" || value === "jobs") return posts.filter((row) => row.type === "job");
          if (value === "event" || value === "events") {
            return posts.filter((row) => row.type === "event" && (itemCustomerOwned(row) || realFeedRowIsFollowedBusiness(row)));
          }
          if (value === "article" || value === "articles") return posts.filter((row) => row.type === "article");
          if (value === "post" || value === "posts") {
            return posts.filter((row) => row.type === "post" || row.type === "offer" || row.type === "repost");
          }
          return allRows.sort((a, b) => b.time - a.time);
        }
        let realFeedFallbackAutoLoadTimer = 0;
        let realFeedFallbackAutoLoadObserver = null;
        let realFeedFallbackAutoLoadInterval = 0;
        let realFeedFallbackAutoLoadArmed = false;
        function realFeedFallbackLoadMoreButton() {
          return document.querySelector("[data-annexed-feed-load-more]");
        }
        function realFeedFallbackActiveFilter(fallback) {
          const active = document.querySelector("[data-feed-kind-filter].is-active,[data-annexed-feed-filter].is-active");
          return clean(active && (active.dataset.feedKindFilter || active.dataset.annexedFeedFilter || active.textContent) || fallback || "all").toLowerCase();
        }
        function realFeedFallbackLoadMoreName(filter) {
          const kind = realFeedFallbackActiveFilter(filter || "all");
          if (kind === "products" || kind === "product") return "products";
          if (kind === "clips" || kind === "clip" || kind === "reels" || kind === "reel") return "clips";
          if (kind === "jobs" || kind === "job") return "jobs";
          if (kind === "events" || kind === "event") return "events";
          if (kind === "articles" || kind === "article") return "articles";
          return "posts";
        }
        function realFeedFallbackNormalizeFilter(filter) {
          const kind = clean(filter || "all").toLowerCase();
          if (kind === "product") return "products";
          if (kind === "clip" || kind === "reel" || kind === "reels") return "clips";
          if (kind === "job") return "jobs";
          if (kind === "event") return "events";
          if (kind === "article") return "articles";
          if (kind === "post") return "posts";
          return ["all", "posts", "products", "clips", "events", "jobs", "articles"].indexOf(kind) >= 0 ? kind : "all";
        }
        function syncRealFeedFallbackFilterButtons(filter) {
          const activeFilter = realFeedFallbackNormalizeFilter(filter || "all");
          document.querySelectorAll("[data-feed-kind-filter],[data-annexed-feed-filter]").forEach((button) => {
            if (!button || !button.dataset) return;
            const buttonFilter = realFeedFallbackNormalizeFilter(button.dataset.feedKindFilter || button.dataset.annexedFeedFilter || button.textContent || "all");
            const active = buttonFilter === activeFilter;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
          });
          return activeFilter;
        }
        function realFeedFallbackPauseAutoLoad() {
          const active = document.activeElement;
          return !!document.querySelector(".feed-create-modal[aria-hidden='false'],[data-feed-create-menu][aria-hidden='false'],[data-feed-compose-source-sheet][aria-hidden='false'],[data-feed-compose-camera-sheet][aria-hidden='false'],[data-item-detail-modal].is-open,.item-detail-modal.is-open,[data-clip-viewer-modal].is-open,.clip-viewer-modal.is-open") ||
            !!(active && active.matches && active.matches("input,textarea,select,[contenteditable='true']"));
        }
        function loadMoreRealFeedFallback() {
          const button = realFeedFallbackLoadMoreButton();
          const feedList = document.querySelector("[data-annexed-feed-list]");
          if (!button || !feedList || button.hidden || button.disabled) return;
          if (typeof window.emyRenderAnnexedFeeds === "function") return;
          if (realFeedFallbackPauseAutoLoad()) {
            realFeedFallbackAutoLoadTimer = window.setTimeout(() => {
              realFeedFallbackAutoLoadTimer = 0;
              loadMoreRealFeedFallback();
            }, 700);
            return;
          }
          const batchSize = Math.max(1, Number(window.EMY_ANNEXED_FEED_BATCH_SIZE || 8) || 8);
          const currentLimit = Math.max(batchSize, Number(feedList.dataset.annexedFeedVisibleLimit || batchSize) || batchSize);
          const remaining = Math.max(0, Number(button.dataset.feedRemaining) || 0);
          const nextBatch = Math.min(batchSize, remaining || batchSize);
          const activeFilter = button.dataset.emyRealFeedFallbackFilter || realFeedFallbackActiveFilter("all");
          const name = realFeedFallbackLoadMoreName(activeFilter);
          button.dataset.feedLoadState = "loading";
          button.disabled = true;
          button.textContent = "Loading more " + name + "...";
          button.setAttribute("aria-label", "Loading more " + name);
          window.setTimeout(() => {
            feedList.dataset.annexedFeedVisibleLimit = String(currentLimit + nextBatch);
            fillRealFeedListFallback(feedList, activeFilter, { force: true });
          }, 120);
        }
        function scheduleRealFeedFallbackAutoLoad() {
          const button = realFeedFallbackLoadMoreButton();
          if (!button || button.hidden || button.disabled || realFeedFallbackAutoLoadTimer) return;
          realFeedFallbackAutoLoadTimer = window.setTimeout(() => {
            realFeedFallbackAutoLoadTimer = 0;
            loadMoreRealFeedFallback();
          }, 80);
        }
        function checkRealFeedFallbackAutoLoad() {
          const button = realFeedFallbackLoadMoreButton();
          if (!button || button.hidden || button.disabled) return;
          if (!realFeedFallbackAutoLoadArmed) {
            if (window.scrollY <= 48) return;
            realFeedFallbackAutoLoadArmed = true;
          }
          const rect = button.getBoundingClientRect();
          if (rect.top < window.innerHeight + 160) scheduleRealFeedFallbackAutoLoad();
        }
        function setupRealFeedFallbackLoadMore() {
          const button = realFeedFallbackLoadMoreButton();
          if (!button) return;
          if (button.dataset.emyRealFeedFallbackBound !== "true") {
            button.dataset.emyRealFeedFallbackBound = "true";
            button.addEventListener("click", (event) => {
              if (typeof window.emyRenderAnnexedFeeds === "function") return;
              event.preventDefault();
              event.stopPropagation();
              loadMoreRealFeedFallback();
            });
          }
          if (!realFeedFallbackAutoLoadObserver && "IntersectionObserver" in window) {
            realFeedFallbackAutoLoadObserver = new IntersectionObserver((entries) => {
              if (entries.some((entry) => entry && entry.isIntersecting)) checkRealFeedFallbackAutoLoad();
            }, { root: null, rootMargin: "0px 0px 160px 0px", threshold: 0 });
          }
          if (realFeedFallbackAutoLoadObserver) {
            try { realFeedFallbackAutoLoadObserver.observe(button); } catch (error) {}
          }
          if (button.dataset.emyRealFeedFallbackScrollBound !== "true") {
            button.dataset.emyRealFeedFallbackScrollBound = "true";
            window.addEventListener("scroll", checkRealFeedFallbackAutoLoad, { passive: true });
            window.addEventListener("resize", checkRealFeedFallbackAutoLoad);
          }
          if (!realFeedFallbackAutoLoadInterval) {
            realFeedFallbackAutoLoadInterval = window.setInterval(checkRealFeedFallbackAutoLoad, 900);
          }
        }
        function syncRealFeedFallbackLoadMore(feedList, totalCount, visibleCount, filter) {
          const button = realFeedFallbackLoadMoreButton();
          if (!button) return;
          const total = Math.max(0, Number(totalCount) || 0);
          const visible = Math.max(0, Number(visibleCount) || 0);
          const remaining = Math.max(0, total - visible);
          const hasMore = remaining > 0;
          const name = realFeedFallbackLoadMoreName(filter);
          if (!total) {
            button.hidden = true;
            button.disabled = true;
            button.textContent = "";
            button.removeAttribute("data-feed-load-state");
            button.removeAttribute("title");
            delete button.dataset.feedLoadKindFilter;
            delete button.dataset.emyRealFeedFallbackFilter;
            button.dataset.feedTotal = "0";
            button.dataset.feedVisible = "0";
            button.dataset.feedRemaining = "0";
            button.setAttribute("aria-label", "No feed posts yet");
            return;
          }
          const activeFilter = realFeedFallbackActiveFilter(filter || "all");
          button.hidden = false;
          button.disabled = !hasMore;
          button.dataset.feedLoadState = hasMore ? "idle" : "end";
          button.dataset.feedLoadKindFilter = activeFilter;
          button.dataset.emyRealFeedFallbackFilter = activeFilter;
          button.dataset.feedTotal = String(total);
          button.dataset.feedVisible = String(visible);
          button.dataset.feedRemaining = String(remaining);
          button.textContent = hasMore ? ("Load more " + name) : ("No more " + name);
          button.setAttribute("aria-label", hasMore ? ("Load more " + name) : ("No more " + name));
          button.setAttribute("aria-live", "polite");
          if (hasMore) button.setAttribute("title", "Load more " + name);
          else button.setAttribute("title", "No more " + name);
          setupRealFeedFallbackLoadMore();
          if (hasMore) window.setTimeout(checkRealFeedFallbackAutoLoad, 0);
        }
        function syncExistingAnnexedFeedLoadState() {
          if (currentCustomerHomeView() !== "feeds") return;
          if (typeof window.emyRenderAnnexedFeeds === "function") return;
          const feedList = document.querySelector("[data-annexed-feed-list]");
          const button = realFeedFallbackLoadMoreButton();
          if (!feedList || !button || feedList.dataset.emyRealFeedFallback === "true") return;
          const cards = Array.from(feedList.querySelectorAll(":scope > [data-feed-id],:scope > [data-card],:scope > .product-card,:scope > .post-card,:scope > .reel-card,:scope > .social-feed-card,.home-flow-item")).filter((card) => {
            if (!card || card.hidden || (card.matches && card.matches("[hidden],[data-emy-real-empty],.emy-real-empty,.home-list-empty"))) return false;
            if (card.dataset && card.dataset.feedKindHidden === "true") return false;
            if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(card)) return false;
            return true;
          });
          if (!cards.length) return;
          const limit = Math.max(1, Number(feedList.dataset.annexedFeedVisibleLimit || window.EMY_ANNEXED_FEED_BATCH_SIZE || 8) || 8);
          feedList.dataset.annexedFeedVisibleLimit = String(limit);
          if (cards.length < limit) {
            syncRealFeedFallbackLoadMore(feedList, cards.length, cards.length, realFeedFallbackActiveFilter("all"));
          }
        }
        function fillRealFeedListFallback(feedList, filter, options) {
          if (!feedList) return false;
          const opts = options || {};
          const onFeedsView = document.body && document.body.dataset.currentView === "feeds";
          if (!opts.force && typeof window.emyRenderAnnexedFeeds === "function" && onFeedsView) return false;
          const products = contentRows("product").filter(realFeedRowAllowedByLocation);
          const posts = contentRows("post").filter(realFeedRowAllowedByLocation);
          const clips = contentRows("clip").filter(realFeedRowAllowedByLocation);
          const rows = realFeedRowsForFilter(filter, products, posts, clips);
          if (!rows.length) {
            const emptyName = realFeedFallbackLoadMoreName(filter);
            feedList.dataset.emyRealFeedFallback = "true";
            replaceRealList(feedList, ".product-card,.post-card,.reel-card,.social-feed-card,.home-flow-item,[data-emy-real-empty]", [], feedTemplateCard, "No " + emptyName + " yet.", { filter, force: opts.force });
            syncRealFeedFallbackLoadMore(feedList, 0, 0, filter);
            return true;
          }
          if (!opts.force && realListHasNativeCards(feedList) && feedList.dataset.emyRealFeedFallback !== "true") return false;
          const visibleLimit = Math.max(1, Number(feedList.dataset.annexedFeedVisibleLimit || window.EMY_ANNEXED_FEED_BATCH_SIZE || 8) || 8);
          feedList.dataset.annexedFeedVisibleLimit = String(visibleLimit);
          const visibleRows = rows.slice(0, visibleLimit);
          feedList.dataset.emyRealFeedFallback = "true";
          replaceRealList(feedList, ".product-card,.post-card,.reel-card,.social-feed-card,.home-flow-item,[data-emy-real-empty]", visibleRows, feedTemplateCard, "No real feed activity yet.", { filter, force: opts.force });
          const renderedVisibleCount = Array.from(feedList.children || []).filter((child) => {
            if (!child || child.nodeType !== 1) return false;
            if (child.hidden || child.matches("[hidden],[data-emy-real-empty],.emy-real-empty,.home-list-empty")) return false;
            return true;
          }).length;
          const footerTotal = visibleLimit >= rows.length ? renderedVisibleCount : rows.length;
          syncRealFeedFallbackLoadMore(feedList, footerTotal, renderedVisibleCount, filter);
          refreshRealListMedia(feedList);
          return true;
        }
        window.emyFillRealFeedListFallback = fillRealFeedListFallback;
        window.emySyncExistingAnnexedFeedLoadState = syncExistingAnnexedFeedLoadState;
        window.emyApplyRealFeedFallbackFilter = function emyApplyRealFeedFallbackFilter(filter) {
          const feedList = document.querySelector("[data-annexed-feed-list]");
          if (!feedList) return false;
          const activeFilter = syncRealFeedFallbackFilterButtons(filter || "all");
          const batchSize = Math.max(1, Number(window.EMY_ANNEXED_FEED_BATCH_SIZE || 8) || 8);
          realFeedFallbackAutoLoadArmed = false;
          feedList.dataset.annexedFeedVisibleLimit = String(batchSize);
          try { window.__EMY_PENDING_FEED_KIND_FILTER__ = activeFilter; } catch (error) {}
          return fillRealFeedListFallback(feedList, activeFilter, { force: true });
        };
        if (!window.__EMY_REAL_FEED_FALLBACK_FILTER_BOUND__) {
          window.__EMY_REAL_FEED_FALLBACK_FILTER_BOUND__ = true;
          document.addEventListener("click", (event) => {
            const target = event && event.target;
            const button = target && target.closest ? target.closest("[data-feed-kind-filter],[data-annexed-feed-filter]") : null;
            if (!button || currentCustomerHomeView() !== "feeds") return;
            const filter = button.dataset && (button.dataset.feedKindFilter || button.dataset.annexedFeedFilter) || "all";
            if (!window.emyApplyRealFeedFallbackFilter(filter)) return;
            event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          }, true);
        }
        function realHomeListsNeedHydration() {
          const flowList = document.querySelector("[data-home-flow-list]");
          const clipList = document.querySelector("[data-home-static-clip-list]");
          const feedList = document.querySelector("[data-annexed-feed-list]");
          const flowNeeds = flowList && !realListHasNativeCards(flowList) && !flowList.querySelector("[data-emy-real-empty]");
          const clipNeeds = clipList && !realListHasNativeCards(clipList) && !clipList.querySelector("[data-emy-real-empty]");
          const feedNeeds = feedList && currentCustomerHomeView() === "feeds" && feedList.dataset.emyRealFeedFallback !== "true";
          return !!(flowNeeds || clipNeeds || feedNeeds);
        }
        function hydrateRealHomeContent(options) {
          const force = options === true || !!(options && options.force);
          if (!force && recentContentSyncRefresh() && !realHomeListsNeedHydration()) return;
          try {
            if (typeof window.purgeDeletedFeedItemsFromAllStorage === "function") window.purgeDeletedFeedItemsFromAllStorage();
          } catch (error) {}
          const products = contentRows("product").filter(realFeedRowAllowedByLocation);
          const posts = contentRows("post").filter(realFeedRowAllowedByLocation);
          const clips = contentRows("clip").filter(realFeedRowAllowedByLocation);
          const productList = document.querySelector("[data-home-static-product-list]");
          const clipList = document.querySelector("[data-home-static-clip-list]");
          const flowList = document.querySelector("[data-home-flow-list]");
          const preserveOrReplace = (list, selector, rows, emptyText) => {
            if (!list) return;
            installRealListDedupeObserver(list);
            purgeDeletedRealListCards(list);
            const visibleRows = realVisibleRowsForList(list, rows, selector, emptyText);
          const signature = visibleRows.map((item) => contentRowIdentityKeys(item).join(",")).join("|") || emptyText;
          const rowIds = new Set(visibleRows.map((row) => String(row.id || row.rawId || "")).filter(Boolean));
          const staleCards = Array.from(list.querySelectorAll(":scope > [data-feed-id]")).filter((card) => {
            if (card.dataset && card.dataset.ignoreCustomerFeedTombstone === "true") return false;
            const feedId = String(card.dataset.feedId || "");
            if (!feedId) return false;
            if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(feedId)) return true;
              return rowIds.size > 0 && !rowIds.has(feedId);
            });
            if (staleCards.length) {
              staleCards.forEach((card) => card.remove());
              delete list.dataset.emyRealSignature;
            }
            const hasExpectedRows = realListHasExpectedRows(list, visibleRows);
            const hasManagedOverflow = realListHasManagedOverflow(list, selector, visibleRows);
            if (list.dataset.emyRealSignature === signature && hasExpectedRows && !staleCards.length && !hasManagedOverflow) {
              list.hidden = false;
              dedupeRealListCards(list);
              return false;
            }
            replaceRealList(list, selector, rows, feedTemplateCard, emptyText);
            return true;
          };
          if (productList) productList.setAttribute("data-unified-feed-cards", "true");
        const businessProducts = products.filter(contentRowIsBusinessFeed);
        const businessClips = clips.filter(contentRowIsBusinessFeed);
        const productChanged = preserveOrReplace(productList, ".product-card,.feed-product-card,.home-flow-item,[data-emy-real-empty]", businessProducts, "No real products yet.");
        const clipChanged = !businessClips.length && publicBusinessClipStoresHaveRows()
          ? false
          : preserveOrReplace(clipList, ".reel-card,.feed-clip-card,.feed-product-clip-card,.home-flow-item,[data-emy-real-empty]", businessClips, "No real clips yet.");
        const flowRows = businessProducts.concat(posts.filter(contentRowIsBusinessFeed), businessClips).sort((a, b) => b.time - a.time);
          const flowChanged = preserveOrReplace(flowList, ".product-card,.post-card,.reel-card,.social-feed-card,.home-flow-item,[data-emy-real-empty]", flowRows, "No real feed activity yet.");
          const feedList = document.querySelector("[data-annexed-feed-list]");
          let feedChanged = false;
          if (feedList && typeof window.emyRenderAnnexedFeeds === "function") {
            window.emyRenderAnnexedFeeds();
            feedChanged = true;
          } else if (feedList && currentCustomerHomeView() === "feeds") {
            feedChanged = fillRealFeedListFallback(feedList, realFeedFallbackActiveFilter("all"), { force: true });
          } else if (feedList && !feedList.querySelector("[data-feed-id]") && !realListHasNativeCards(feedList)) {
            const visibleLimit = Math.max(1, Number(feedList.dataset.annexedFeedVisibleLimit || window.EMY_ANNEXED_FEED_BATCH_SIZE || 8) || 8);
            feedList.dataset.annexedFeedVisibleLimit = String(visibleLimit);
            feedList.dataset.emyRealFeedFallback = "true";
            replaceRealList(feedList, ".product-card,.post-card,.reel-card,.social-feed-card,.home-flow-item,[data-emy-real-empty]", flowRows, feedTemplateCard, "No real feed activity yet.", { filter: realFeedFallbackActiveFilter("all"), force: true });
            const renderedVisibleCount = Array.from(feedList.children || []).filter((child) => {
              if (!child || child.nodeType !== 1) return false;
              if (child.hidden || child.matches("[hidden],[data-emy-real-empty],.emy-real-empty,.home-list-empty")) return false;
              return true;
            }).length;
            syncRealFeedFallbackLoadMore(feedList, flowRows.length, renderedVisibleCount, realFeedFallbackActiveFilter("all"));
            feedChanged = true;
          }
          if (productChanged || clipChanged || flowChanged || feedChanged) {
            [productList, clipList, flowList, feedList].forEach(refreshRealListMedia);
          }
          if (window.emySyncHomeCarouselSections) window.emySyncHomeCarouselSections();
          if (window.emySyncHomeSectionGuides) window.emySyncHomeSectionGuides();
        }
        window.emyHydrateRealHomeContent = hydrateRealHomeContent;
        window.emyContentSyncClearCaches = clearJsonCache;
        window.emyRefreshRealHomeLocationSurfaces = function emyRefreshRealHomeLocationSurfaces() {
          clearJsonCache();
          resetDomReadCache();
          document.querySelectorAll(".left-rail .rail-card,.right-rail .rail-card,.my-business-activity,[data-home-flow-list],[data-home-static-product-list],[data-home-static-clip-list],[data-annexed-feed-list]").forEach((node) => {
            if (!node || !node.dataset) return;
            delete node.dataset.emyRealSignature;
            delete node.dataset.emyFeedRenderSignature;
            delete node.dataset.emyListRenderSignature;
          });
          hydrateRealNearby();
          hydrateRealRails();
          hydrateRealBusinessDeck();
          refreshBusinessCustomerBadges(document);
          hydrateRealHomeContent({ force: true });
          ensureRailSurfaces();
          ensureHomeSectionGuides();
          syncRealHomeCarouselCounters();
        };
        window.emyContentSyncRunFull = function emyContentSyncRunFull() {
          runFull();
        };
        function hydrateRealHomeSurfaces() {
          if (recentContentSyncRefresh()) return;
          hydrateRealNearby();
          hydrateRealBusinessDeck();
          hydrateRealHomeContent();
        }
        function productMediaMatches(row, card) {
          if (!row || !card) return false;
          const title = slug(row.title);
          const business = slug(row.businessKey || row.businessName);
          const data = card.dataset || {};
          const cardTitle = slug(firstClean([data.detailTitle, card.querySelector("h3") && card.querySelector("h3").textContent, card.querySelector("strong") && card.querySelector("strong").textContent, card.textContent]));
          const businessClues = [data.detailBusiness, data.detailBusinessKey, data.businessKey, data.businessLink].map(slug).filter(Boolean);
          const businessMatches = !business || !businessClues.length || businessClues.some((clue) => clue === business || clue.indexOf(business) >= 0 || business.indexOf(clue) >= 0 || isCurrentBusiness(clue) && isCurrentBusiness(business));
          return !!title && (cardTitle === title || cardTitle.indexOf(title) >= 0) && businessMatches;
        }
        function cardHasRealMedia(card) {
          if (!card) return false;
          return Array.from(card.querySelectorAll(".photo img,.photo video,.feed-media img,.feed-media video,.business-posted-media img,.business-posted-media video,.home-flow-media img,.home-flow-media video,.home-created-media img,.home-created-media video,.social-feed-media img,.social-feed-media video,.feed-product-media img,.feed-product-media video")).some((node) => {
            const src = firstClean([node.getAttribute("src"), node.currentSrc, node.getAttribute("poster"), node.getAttribute("data-emy-media-ref"), node.getAttribute("data-detail-media-src"), node.getAttribute("data-detail-media-ref")]);
            return !!src;
          });
        }
        function applyRealProductMedia(root) {
          const scope = root && root.querySelectorAll ? root : document;
          const products = contentRows("product").filter((row) => row.media && (row.media.src || row.media.ref));
          if (!products.length) return;
          const cards = [];
          if (scope.matches && scope.matches(".product-card,.feed-product-card,[data-detail-kind='Product']")) cards.push(scope);
          scope.querySelectorAll(".product-card,.feed-product-card,[data-detail-kind='Product']").forEach((card) => cards.push(card));
          cards.forEach((card) => {
            if (cardHasRealMedia(card)) return;
            const row = products.find((item) => productMediaMatches(item, card));
            if (!row) return;
            const media = row.media || {};
            const holder = card.querySelector(".photo,.feed-media,.business-posted-media,.home-flow-media,.home-created-media,.social-feed-media,.feed-product-media");
            if (!holder) return;
            if (media.src) {
              holder.innerHTML = media.type === "video"
                ? '<video src="' + escapeAttr(media.src) + '"' + (media.posterSrc ? ' poster="' + escapeAttr(media.posterSrc) + '"' : '') + ' muted playsinline preload="metadata"></video>'
                : '<img src="' + escapeAttr(media.src) + '" alt="" />';
            } else if (media.ref) {
              holder.innerHTML = media.type === "video"
                ? '<video data-emy-media-ref="' + escapeAttr(media.ref) + '"' + (media.posterRef ? ' data-emy-poster-ref="' + escapeAttr(media.posterRef) + '"' : '') + ' muted playsinline preload="metadata"></video>'
                : '<img data-emy-media-ref="' + escapeAttr(media.ref) + '" alt="" />';
            }
            if (card.dataset) {
              card.dataset.detailMedia = "feed";
              card.dataset.detailMediaSrc = media.src || "";
              card.dataset.detailMediaRef = media.ref || "";
              card.dataset.detailMediaType = media.type || "image";
            }
          });
        }
        function currentBusinessAliases() {
          const profile = readJson("emyBusinessProfileDraft", {});
          return [
            "profile", "business-profile", currentBusinessName(), profile && profile.key, profile && profile.businessKey,
            localStorage.getItem("emyBusinessProfileKey"), localStorage.getItem("emyBusinessKey")
          ].map(slug).filter(Boolean);
        }
        function isCurrentBusiness(value) {
          const key = slug(value);
          return !!key && currentBusinessAliases().indexOf(key) >= 0;
        }
        function isCurrentOwnedBusinessValue(value) {
          return currentBusinessIsRealProfile() && isCurrentBusiness(value);
        }
        function customerBusinessRelationAliases(item, fallbackKey) {
          const row = item && typeof item === "object" ? item : {};
          return [
            fallbackKey,
            row.key,
            row.businessKey,
            row.profileKey,
            row.ownerKey,
            row.name,
            row.businessName,
            row.business,
            row.title
          ].map(slug).filter(Boolean);
        }
        function customerBusinessSavedFlagForAliases(aliases) {
          try {
            return (aliases || []).some((alias) => alias && localStorage.getItem("emyCustomerBusiness:" + alias) === "1");
          } catch (error) {
            return false;
          }
        }
        function customerBusinessRemovedFlagForAliases(aliases) {
          try {
            return (aliases || []).some((alias) => alias && localStorage.getItem("emyCustomerBusiness:" + alias) === "0");
          } catch (error) {
            return false;
          }
        }
        function customerBusinessRecordHasExplicitRelation(item, fallbackKey) {
          const aliases = customerBusinessRelationAliases(item, fallbackKey);
          if (customerBusinessSavedFlagForAliases(aliases)) return true;
          const row = item && typeof item === "object" ? item : {};
          if (row.isCustomer === true || row.customer === true || row.saved === true || row.following === true || row.added === true) return true;
          if (firstClean([row.addedAt, row.customerSince, row.savedAt, row.followedAt, row.acceptedAt, row.relationshipAt])) return true;
          const relation = firstClean([row.relationship, row.relation, row.status, row.customerStatus]).toLowerCase();
          return row.isCustomer !== false && /\b(customer|saved|following|accepted)\b/.test(relation);
        }
        function businessCustomerAliasMatches(left, right) {
          const a = slug(left);
          const b = slug(right);
          return !!a && !!b && a === b;
        }
        function businessCustomerRelationExists(item, fallbackKey) {
          const aliases = customerBusinessRelationAliases(item, fallbackKey);
          if (!aliases.length) return false;
          if (customerBusinessRemovedFlagForAliases(aliases)) return false;
          if (aliases.some((alias) => currentOwnedBusinessKeyIsOnlyOwner(alias))) return false;
          if (customerBusinessRecordHasExplicitRelation(item, fallbackKey)) return true;
          const stored = readJson("emyCustomerBusinesses", {});
          if (stored && typeof stored === "object" && !Array.isArray(stored)) {
            const keys = Object.keys(stored);
            for (let index = 0; index < keys.length; index += 1) {
              const key = keys[index];
              const row = stored[key] || {};
              if (customerBusinessRecordIsCurrentOwned(row, key)) continue;
              if (row.active === false || row.isCustomer === false || localStorage.getItem("emyCustomerBusiness:" + key) === "0") continue;
              const rowAliases = customerBusinessRelationAliases(row, key);
              if (customerBusinessRemovedFlagForAliases(rowAliases)) continue;
              const matches = aliases.some((alias) => rowAliases.some((rowAlias) => businessCustomerAliasMatches(alias, rowAlias)));
              if (matches && customerBusinessRecordHasExplicitRelation(row, key)) return true;
            }
          }
          const requests = readJson("emyCustomerRelationshipRequests", {});
          const requestRows = requests && typeof requests === "object" ? Object.keys(requests).map((key) => requests[key]) : [];
          for (let index = 0; index < requestRows.length; index += 1) {
            const row = requestRows[index] || {};
            const status = firstClean([row.status, row.customerStatus, row.relationship]).toLowerCase();
            if (status && !/\b(accepted|approved|customer|following|active)\b/.test(status)) continue;
            const rowAliases = customerBusinessRelationAliases(row, row.businessKey || row.key || row.businessName || row.name);
            if (customerBusinessRemovedFlagForAliases(rowAliases)) continue;
            if (aliases.some((alias) => rowAliases.some((rowAlias) => businessCustomerAliasMatches(alias, rowAlias)))) return true;
          }
          return false;
        }
        function businessCustomerBadgeHtml(item, fallbackKey) {
          return businessCustomerRelationExists(item, fallbackKey) ? '<span class="business-customer-badge" data-business-customer-badge>Customer</span>' : "";
        }
        function refreshBusinessCustomerBadges(root) {
          const scope = root && root.querySelectorAll ? root : document;
          const cards = [];
          if (scope.matches && scope.matches("[data-business-card],.business-card")) cards.push(scope);
          scope.querySelectorAll("[data-business-card],.business-card").forEach((card) => cards.push(card));
          cards.forEach((card) => {
            const data = card.dataset || {};
            const title = card.querySelector && (card.querySelector(".business-title-link") || card.querySelector("h3"));
            const item = {
              key: data.businessKey || data.detailBusinessKey || data.businessLink,
              businessKey: data.businessKey || data.detailBusinessKey || data.businessLink,
              name: data.detailBusiness || data.businessName || data.detailTitle || (title && title.textContent),
              businessName: data.detailBusiness || data.businessName || data.detailTitle || (title && title.textContent),
              isCustomer: card.classList && card.classList.contains("is-customer-business")
            };
            const shouldShow = businessCustomerRelationExists(item, item.key || item.name);
            const actions = card.querySelector && card.querySelector(".business-card-actions");
            if (!actions) return;
            const existing = actions.querySelector("[data-business-customer-badge]");
            if (shouldShow) {
              if (!existing) actions.insertAdjacentHTML("afterbegin", '<span class="business-customer-badge" data-business-customer-badge>Customer</span>');
              card.classList.add("is-customer-business");
            } else {
              if (existing) existing.remove();
              card.classList.remove("is-customer-business");
            }
          });
        }
        window.emyRefreshBusinessCustomerBadges = refreshBusinessCustomerBadges;
        function currentOwnedBusinessKeyIsOnlyOwner(value) {
          return isCurrentOwnedBusinessValue(value) && !customerBusinessRecordHasExplicitRelation({ key: value, businessKey: value }, value);
        }
        function customerBusinessRecordIsCurrentOwned(item, fallbackKey) {
          if (!currentBusinessIsRealProfile()) return false;
          const matchesCurrent = [
            fallbackKey,
            item && item.key,
            item && item.businessKey,
            item && item.profileKey,
            item && item.ownerKey,
            item && item.name,
            item && item.businessName,
            item && item.business,
            item && item.title
          ].some(isCurrentBusiness);
          return matchesCurrent && !customerBusinessRecordHasExplicitRelation(item, fallbackKey);
        }
        function looksDemoText(value) {
          const text = clean(value);
          if (!text || isCurrentBusiness(text)) return false;
          const key = slug(text);
          if (demoKeys.indexOf(key) >= 0) return true;
          return demoPatterns.some((pattern) => pattern.test(text));
        }
        function itemText(item) {
          if (!item || typeof item !== "object") return clean(item);
          return [
            item.id, item.key, item.businessKey, item.business, item.businessName, item.name, item.title, item.productName,
            item.description, item.text, item.source, item.email, item.open, item.href
          ].map(clean).filter(Boolean).join(" ");
        }
        function looksDemoItem(item) {
          if (!item || typeof item !== "object") return looksDemoText(item);
          const businessIdentity = firstClean([
            item.businessKey, item.profileKey, item.ownerKey, item.businessName, item.business,
            item.storeName, item.productBusiness, item.sellerName
          ]);
          if (businessIdentity) {
            if (looksDemoText(businessIdentity)) return true;
            if (isCurrentBusiness(businessIdentity)) return false;
            return false;
          }
          const titleIdentity = firstClean([item.productName, item.productTitle, item.clipTitle, item.title, item.name]);
          if (titleIdentity && looksDemoText(titleIdentity)) return true;
          return looksDemoText(itemText(item));
        }
        let demoStorageCompacted = false;
        function compactDemoStorage(force) {
          if (demoStorageCompacted && !force) return;
          const userContentKeys = ["emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents", "emyFeedCreatedProducts", "emyFeedCreatedClips", "emyFeedCreatedArticles", "emyFeedReposts"];
          demoStorageCompacted = true;
          demoKeys.forEach((key) => {
            try { localStorage.removeItem("emyCustomerBusiness:" + key); } catch (error) {}
          });
          const businesses = readJson("emyCustomerBusinesses", null);
          if (businesses && typeof businesses === "object" && !Array.isArray(businesses)) {
            let changed = false;
            Object.keys(businesses).forEach((key) => {
              const item = businesses[key];
              const name = itemBusinessName(item) || firstClean([item && item.name, item && item.title, key]);
              if (looksDemoText(key) || looksDemoItem(item) || (!(item && (item.explicitBusinessProfile === true || item.isBusinessProfile === true || item.profileType === "business")) && looksCustomerIdentity(name))) {
                delete businesses[key];
                changed = true;
              }
            });
            if (changed) writeJson("emyCustomerBusinesses", businesses);
          }
          storageArrayKeys.forEach((key) => {
            if (!force && userContentKeys.includes(key)) return;
            const value = readJson(key, null);
            if (!Array.isArray(value)) return;
            const next = value.filter((item) => !looksDemoItem(item));
            if (next.length !== value.length) writeJson(key, next);
          });
          const actionState = readJson("emyFeedActionState", null);
          if (actionState && typeof actionState === "object" && !Array.isArray(actionState)) {
            let changed = false;
            Object.keys(actionState).forEach((key) => {
              if (looksDemoText(key) || looksDemoItem(actionState[key])) {
                delete actionState[key];
                changed = true;
              }
            });
            if (changed) writeJson("emyFeedActionState", actionState);
          }
        }
        function installStyle() {
          if (document.querySelector("style[data-emy-real-data-guard-style]")) return;
          const style = document.createElement("style");
          style.setAttribute("data-emy-real-data-guard-style", "true");
          style.textContent = [
            ".clip-viewer-avatar.has-image,.reel-avatar.has-image,.search-reel-avatar.has-image,.business-avatar.has-image,.my-business-avatar.has-image,.nearby-business-media.has-image,.nearby-popup-media.has-image,.nearby-marker-avatar.has-image,.nearby-map-pin span.has-image,.post-avatar.has-image,.feed-avatar.has-image,.social-feed-avatar.has-image,.feed-create-brand-mark.has-image,[data-feed-actor-avatar].has-image,.home-created-avatar.has-image,.business-preview-post-avatar.has-image,.business-top-avatar.has-image,.owner-avatar.has-image,.business-owned-avatar.has-image,.business-profile-hub-avatar.has-image,.public-avatar.has-image,.item-business-avatar.has-image,.item-product-avatar.has-image,.feed-business-profile-avatar.has-image,.profile-customer-business-avatar.has-image,.profile-record-avatar.has-image,.customer-business-avatar.has-image,.thread-avatar.has-image,.message-avatar.has-image,.feed-job-business i.has-image,[data-business-top-avatar].has-image,[data-business-owned-avatar].has-image,[data-owner-avatar].has-image,[data-item-business-avatar].has-image,[data-item-product-avatar].has-image,[data-public-avatar].has-image,[data-detail-avatar].has-image{overflow:hidden;background:#fff!important;color:transparent!important}",
            ".clip-viewer-avatar img,.reel-avatar img,.search-reel-avatar img,.business-avatar img,.my-business-avatar img,.nearby-business-media img,.nearby-popup-media img,.nearby-marker-avatar img,.nearby-map-pin span img,.post-avatar img,.feed-avatar img,.social-feed-avatar img,.social-feed-quote-avatar img,.feed-create-brand-mark img,[data-feed-actor-avatar] img,.home-created-avatar img,.business-preview-post-avatar img,.business-top-avatar img,.owner-avatar img,.business-owned-avatar img,.business-profile-hub-avatar img,.public-avatar img,.item-business-avatar img,.item-product-avatar img,.feed-business-profile-avatar img,.profile-customer-business-avatar img,.profile-record-avatar img,.customer-business-avatar img,.thread-avatar img,.message-avatar img,.feed-job-business i img,[data-business-top-avatar] img,[data-business-owned-avatar] img,[data-owner-avatar] img,[data-item-business-avatar] img,[data-item-product-avatar] img,[data-public-avatar] img,[data-detail-avatar] img,.photo img,.photo video{width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;color:transparent!important;font-size:0!important;line-height:0!important;text-indent:-9999px!important}",
            ":is(.clip-viewer-avatar,.reel-avatar,.search-reel-avatar,.business-avatar,.my-business-avatar,.nearby-business-media,.nearby-popup-media,.nearby-marker-avatar,.nearby-map-pin span,.post-avatar,.feed-avatar,.social-feed-avatar,.social-feed-quote-avatar,.feed-create-brand-mark,[data-feed-actor-avatar],.home-created-avatar,.business-preview-post-avatar,.business-top-avatar,.owner-avatar,.business-owned-avatar,.business-profile-hub-avatar,.public-avatar,.item-business-avatar,.item-product-avatar,.feed-business-profile-avatar,.profile-customer-business-avatar,.profile-record-avatar,.customer-business-avatar,.thread-avatar,.message-avatar,.feed-job-business i,[data-business-top-avatar],[data-business-owned-avatar],[data-owner-avatar],[data-item-business-avatar],[data-item-product-avatar],[data-public-avatar],[data-detail-avatar])[data-emy-avatar-pending-image='true']{position:relative!important;color:#0a2a55!important;text-indent:0!important;font-size:14px!important;line-height:1!important;font-weight:850!important}",
            ":is(.clip-viewer-avatar,.reel-avatar,.search-reel-avatar,.business-avatar,.my-business-avatar,.nearby-business-media,.nearby-popup-media,.nearby-marker-avatar,.nearby-map-pin span,.post-avatar,.feed-avatar,.social-feed-avatar,.social-feed-quote-avatar,.feed-create-brand-mark,[data-feed-actor-avatar],.home-created-avatar,.business-preview-post-avatar,.business-top-avatar,.owner-avatar,.business-owned-avatar,.business-profile-hub-avatar,.public-avatar,.item-business-avatar,.item-product-avatar,.feed-business-profile-avatar,.profile-customer-business-avatar,.profile-record-avatar,.customer-business-avatar,.thread-avatar,.message-avatar,.feed-job-business i,[data-business-top-avatar],[data-business-owned-avatar],[data-owner-avatar],[data-item-business-avatar],[data-item-product-avatar],[data-public-avatar],[data-detail-avatar])[data-emy-avatar-pending-image='true']::before{content:attr(data-avatar-initial);position:absolute!important;inset:0!important;z-index:2!important;display:grid!important;place-items:center!important;color:#0a2a55!important;font-size:inherit!important;font-weight:850!important;line-height:1!important;text-indent:0!important}",
            ":is(.clip-viewer-avatar,.reel-avatar,.search-reel-avatar,.business-avatar,.my-business-avatar,.nearby-business-media,.nearby-popup-media,.nearby-marker-avatar,.nearby-map-pin span,.post-avatar,.feed-avatar,.social-feed-avatar,.social-feed-quote-avatar,.feed-create-brand-mark,[data-feed-actor-avatar],.home-created-avatar,.business-preview-post-avatar,.business-top-avatar,.owner-avatar,.business-owned-avatar,.business-profile-hub-avatar,.public-avatar,.item-business-avatar,.item-product-avatar,.feed-business-profile-avatar,.profile-customer-business-avatar,.profile-record-avatar,.customer-business-avatar,.thread-avatar,.message-avatar,.feed-job-business i,[data-business-top-avatar],[data-business-owned-avatar],[data-owner-avatar],[data-item-business-avatar],[data-item-product-avatar],[data-public-avatar],[data-detail-avatar])[data-emy-avatar-pending-image='true'] img{position:absolute!important;inset:0!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important}",
            ":is(.clip-viewer-avatar,.reel-avatar,.search-reel-avatar,.business-avatar,.my-business-avatar,.nearby-business-media,.nearby-popup-media,.nearby-marker-avatar,.nearby-map-pin span,.post-avatar,.feed-avatar,.social-feed-avatar,.social-feed-quote-avatar,.feed-create-brand-mark,[data-feed-actor-avatar],.home-created-avatar,.business-preview-post-avatar,.business-top-avatar,.owner-avatar,.business-owned-avatar,.business-profile-hub-avatar,.public-avatar,.item-business-avatar,.item-product-avatar,.feed-business-profile-avatar,.profile-customer-business-avatar,.profile-record-avatar,.customer-business-avatar,.thread-avatar,.message-avatar,.feed-job-business i,[data-business-top-avatar],[data-business-owned-avatar],[data-owner-avatar],[data-item-business-avatar],[data-item-product-avatar],[data-public-avatar],[data-detail-avatar])[data-avatar-initial]:empty::before{content:attr(data-avatar-initial);display:grid!important;place-items:center!important;width:100%!important;height:100%!important;color:#0a2a55!important;font-size:14px!important;font-weight:850!important;line-height:1!important;text-indent:0!important}",
            ".social-feed-head.is-customer-avatarless,.post-head.is-customer-avatarless,.home-created-top.is-customer-avatarless,.business-preview-post-owner.is-customer-avatarless,.profile-record-top.is-customer-avatarless{grid-template-columns:auto minmax(0,1fr) auto!important}",
            ".reel-top.is-customer-avatarless{grid-template-columns:auto minmax(0,1fr) auto!important}",
            ".feed-job-business.is-customer-avatarless{gap:8px!important}",
            ".is-customer-avatarless .social-feed-name,.is-customer-avatarless .feed-profile-link,.is-customer-avatarless .reel-owner-link{min-width:0!important}",
            ".social-feed-quote-head .social-feed-quote-avatar{flex:0 0 28px!important;width:28px!important;height:28px!important;min-width:28px!important;border-radius:999px!important;display:inline-grid!important;place-items:center!important;overflow:hidden;background:#f7f4ef!important;border:1px solid rgba(12,31,61,.12)!important;color:#0a2a55!important;font-size:11px!important;font-weight:850!important;line-height:1!important}",
            ".social-feed-card.is-repost .social-feed-quote-head .social-feed-quote-avatar{max-width:28px!important}",
            ".business-product-form{display:flex!important;flex-direction:column!important}",
            ".business-product-preview{--business-product-main-photo-size:clamp(190px,23vw,240px)!important;position:relative!important;z-index:2!important;min-height:calc(var(--business-product-main-photo-size) + 24px)!important;grid-template-columns:var(--business-product-main-photo-size) minmax(0,1fr)!important;align-items:center!important;gap:16px!important;overflow:visible!important}",
            ".business-product-photo-preview{width:var(--business-product-main-photo-size)!important;max-width:var(--business-product-main-photo-size)!important;aspect-ratio:1/1!important;height:var(--business-product-main-photo-size)!important;min-height:var(--business-product-main-photo-size)!important;justify-self:start!important;cursor:pointer!important}",
            ".business-product-fields{position:relative!important;z-index:1!important}",
            "@media(max-width:760px){.business-product-preview{--business-product-main-photo-size:min(74vw,240px)!important;grid-template-columns:1fr!important;justify-items:center!important}.business-product-photo-preview{justify-self:center!important}}",
            ".business-switch[data-business-switch-mode='switch'] .switch-track{display:block!important;opacity:1!important}",
            ".business-switch[data-business-switch-mode='create'] .switch-track,.business-switch[data-business-switch-mode='review'] .switch-track,.business-switch[data-business-switch-mode='rejected'] .switch-track{display:none!important}",
            ".business-deck.is-empty .business-arrow,.business-deck.is-empty .business-deck-dots,.business-deck.is-empty .deck-side-toggle{display:none!important}",
            ".business-deck.is-empty .business-stage{min-height:0!important;padding:12px 0 4px!important}",
            ".business-deck.is-empty .emy-real-empty{margin:0 auto!important;max-width:min(92%,510px)!important;padding:18px 20px!important;border:1px dashed rgba(0,27,71,.14)!important;border-radius:14px!important;background:rgba(255,255,255,.72)!important;color:rgba(0,27,71,.72)!important;font-size:14px!important;line-height:1.45!important;text-align:center!important}",
            ".left-rail .emy-real-empty,.right-rail .emy-real-empty,.my-business-activity .emy-real-empty{margin:8px 0 0!important;padding:10px 12px!important;border:1px dashed rgba(0,27,71,.12)!important;border-radius:12px!important;background:rgba(255,255,255,.78)!important;color:rgba(0,27,71,.68)!important;font-size:12px!important;line-height:1.4!important}",
            ".business-switch[data-business-switch-mode='review'],.business-switch.is-disabled{cursor:not-allowed!important;opacity:.82!important}",
            ".business-switch[data-business-switch-mode='review'] strong{color:#9a4b00!important}",
            ".business-switch[data-business-switch-mode='rejected'] strong{color:#b42318!important}",
            ".my-business-toggle[hidden]{display:none!important}",
            ".photo::before,.photo::after{pointer-events:none!important}",
            ".business-cover-controls{position:absolute!important;right:10px!important;top:43px!important;z-index:60!important;display:grid!important;gap:7px!important;opacity:.46!important;pointer-events:auto!important;transform:translateY(0)!important;transition:opacity .16s ease,transform .16s ease!important}",
            ".business-card:hover .business-cover-controls,.business-card:focus-within .business-cover-controls,.photo:hover .business-cover-controls,.photo:focus-within .business-cover-controls{opacity:1!important;pointer-events:auto!important;transform:translateY(0)!important}",
            ".business-cover-controls,.business-cover-controls *{pointer-events:auto!important}",
            ".business-cover-control{position:relative!important;z-index:1!important;width:34px!important;height:34px!important;border:1px solid rgba(255,255,255,.38)!important;border-radius:999px!important;background:linear-gradient(145deg,rgba(255,255,255,.30),rgba(255,255,255,.10)),rgba(8,22,46,.34)!important;color:#fff!important;cursor:pointer!important;display:grid!important;place-items:center!important;padding:0!important;touch-action:manipulation!important;backdrop-filter:blur(16px) saturate(1.45)!important;-webkit-backdrop-filter:blur(16px) saturate(1.45)!important;box-shadow:0 12px 28px rgba(0,27,71,.20),inset 0 1px 0 rgba(255,255,255,.42),inset 0 -10px 18px rgba(0,27,71,.12)!important;font-size:10px!important;line-height:1!important;font-weight:850!important}",
            ".business-cover-control:hover{border-color:rgba(255,255,255,.58)!important;background:linear-gradient(145deg,rgba(255,255,255,.40),rgba(255,255,255,.14)),rgba(8,22,46,.42)!important;color:#fff!important;transform:translateY(-1px)!important}",
            ".business-cover-control.is-on{border-color:rgba(255,255,255,.66)!important;background:linear-gradient(145deg,rgba(255,170,92,.88),rgba(255,106,0,.62)),rgba(255,106,0,.34)!important;color:#fff!important;transform:translateY(-1px)!important}",
            ".business-cover-control svg{width:17px!important;height:17px!important;stroke-width:2.2!important}",
            ".emy-real-empty{margin:10px 0;color:#667085;font-size:12px;line-height:1.35;font-weight:650}",
            ".feed-list>.emy-real-empty,.feed-list>[data-emy-real-empty],.annexed-feed-middle .feed-list>.emy-real-empty,.annexed-feed-middle .feed-list>[data-emy-real-empty]{box-sizing:border-box!important;grid-column:1/-1!important;justify-self:center!important;width:min(100%,520px)!important;max-width:520px!important;margin:18px auto 8px!important;border:1px dashed rgba(0,27,71,.14)!important;border-radius:8px!important;background:rgba(255,255,255,.72)!important;color:#68738a!important;padding:14px 16px!important;font-size:13px!important;line-height:1.35!important;font-weight:750!important;text-align:center!important}"
          ].join("");
          document.head.appendChild(style);
        }
        function escapeAttr(value) {
          return String(value || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
        }
        function escapeHtml(value) {
          return escapeAttr(value).replace(/>/g, "&gt;").replace(/'/g, "&#039;");
        }
        function avatarImageSignature(src, ref) {
          return clean(src) + "|" + clean(ref);
        }
        function avatarImageHasRenderableSource(img) {
          if (!img) return false;
          return !!(firstClean([img.currentSrc, img.getAttribute && img.getAttribute("src")]) || img.naturalWidth > 0);
        }
        function hydrateAvatarMediaNow(node) {
          if (!node) return;
          const hydrate = () => {
            if (window.emyHydrateFeedMedia) {
              try { window.emyHydrateFeedMedia(node); } catch (error) {}
            }
          };
          hydrate();
          if (window.emyHydrateFeedMedia) {
            [80, 260, 700, 1600].forEach((delay) => window.setTimeout(hydrate, delay));
            return;
          }
          if (node.dataset && node.dataset.emyAvatarHydrateQueued === "true") return;
          if (node.dataset) node.dataset.emyAvatarHydrateQueued = "true";
          [80, 260, 700, 1600].forEach((delay) => window.setTimeout(hydrate, delay));
        }
        function setImageAvatar(node, src, ref) {
          if (!node || !(src || ref)) return;
          const img = node.querySelector && node.querySelector("img");
          const existingSrc = img ? firstClean([img.currentSrc, img.getAttribute("src")]) : "";
          let nextSrc = clean(src);
          const nextRef = clean(ref);
          if (nextRef && !nextSrc && existingSrc && !looksFakeAvatarImageValue(existingSrc)) nextSrc = existingSrc;
          const signature = avatarImageSignature(nextSrc, nextRef);
          if (node.dataset && node.dataset.emyAvatarBrokenSource === signature && nextSrc && !nextRef) return;
          if (img && nextRef && clean(img.getAttribute("data-emy-media-ref")) === nextRef) {
            if (img.dataset && img.dataset.emyMediaHydrated === "true" && avatarImageHasRenderableSource(img)) {
              clearAvatarImagePending(node);
              return;
            }
            if (nextSrc && !clean(img.getAttribute("src"))) img.setAttribute("src", nextSrc);
            img.setAttribute("loading", "eager");
            img.setAttribute("decoding", "async");
            bindAvatarImageState(node, img);
            hydrateAvatarMediaNow(node);
            return;
          }
          if (img && clean(img.getAttribute("src")) === nextSrc && clean(img.getAttribute("data-emy-media-ref")) === nextRef && img.dataset && img.dataset.emyMediaHydrating === "true") {
            bindAvatarImageState(node, img);
            return;
          }
          if (img && clean(img.getAttribute("src")) === nextSrc && clean(img.getAttribute("data-emy-media-ref")) === nextRef && (!nextRef || img.dataset && img.dataset.emyMediaHydrated === "true" && avatarImageHasRenderableSource(img))) {
            clearAvatarImagePending(node);
            return;
          }
          if (signature !== "|" && node.dataset && node.dataset.emyAvatarBrokenSource === signature) return;
          markAvatarImagePending(node);
          node.classList.add("has-image");
          if (node.dataset) delete node.dataset.emyAvatarBrokenSource;
          node.innerHTML = '<img loading="eager" decoding="async"' + (nextSrc ? ' src="' + escapeAttr(nextSrc) + '"' : '') + (nextRef ? ' data-emy-media-ref="' + escapeAttr(nextRef) + '"' : '') + ' alt="" />';
          bindAvatarImageState(node, node.querySelector && node.querySelector("img"));
          if (nextRef) hydrateAvatarMediaNow(node);
        }
        function primeLazyMedia(root) {
          const scope = root && root.querySelectorAll ? root : document;
          const avatarSelector = ".business-avatar,.post-avatar,.reel-avatar,.feed-avatar,.social-feed-avatar,.feed-create-brand-mark,[data-feed-actor-avatar],.clip-viewer-avatar,.my-business-avatar,.home-created-avatar,.profile-avatar,.avatar";
          const mediaSelector = ".feed-media,.feed-carousel,.photo,.item-detail-art,.product-card,.feed-product-card,.reel-card,.feed-clip-card,.feed-product-clip-card,.home-created-card,.business-preview-card,.search-result-card,.result-card,.content-tile";
          const images = [];
          if (scope.matches && scope.matches("img")) images.push(scope);
          scope.querySelectorAll("img").forEach((img) => images.push(img));
          images.forEach((img) => {
            if (!img.closest(mediaSelector) || img.closest(avatarSelector)) return;
            if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
            if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
          });
          const videos = [];
          if (scope.matches && scope.matches("video")) videos.push(scope);
          scope.querySelectorAll("video:not([autoplay]):not([data-business-cover-media])").forEach((video) => videos.push(video));
          videos.forEach((video) => {
            if (video.closest && video.closest("[data-feed-carousel-slide]:not(.is-active)")) {
              video.setAttribute("preload", "none");
              return;
            }
            if (!video.hasAttribute("preload") || video.getAttribute("preload") === "auto") video.setAttribute("preload", "metadata");
          });
        }
        function elementBusinessText(node) {
          if (!node) return "";
          if (elementTextCache.has(node)) return elementTextCache.get(node);
          const pieces = [];
          const push = (value) => {
            const next = clean(value);
            if (next) pieces.push(next);
          };
          const readNode = (target) => {
            if (!target) return;
            const data = target.dataset || {};
            [
              data.businessKey, data.businessLink, data.nearbyBusiness, data.detailBusinessKey, data.detailBusiness,
              data.businessName, data.business, data.ownerKey, data.ownerName, data.profileKey, data.profileName,
              data.profileBusinessLink, data.profileBusinessName, data.threadKey, data.itemBusinessName,
              data.publicName, data.publicBusiness, data.detailName, data.detailTitle
            ].forEach(push);
            if (target.getAttribute) {
              ["href", "aria-label", "title", "alt", "data-business-key", "data-business-link", "data-nearby-business", "data-detail-business", "data-detail-business-key", "data-profile-business-name", "data-profile-business-link", "data-item-business-name"].forEach((attr) => push(target.getAttribute(attr)));
            }
            push(target.textContent);
          };
          readNode(node);
          if (node.querySelectorAll) {
            node.querySelectorAll("[data-business-key],[data-business-link],[data-nearby-business],[data-detail-business],[data-detail-business-key],[data-profile-business-link],[data-profile-business-name],[data-item-business-name],[data-detail-name],[data-public-name],h1,h2,h3,strong").forEach(readNode);
          }
          const result = pieces.join(" ");
          elementTextCache.set(node, result);
          return result;
        }
        function avatarDirectMedia(avatar, owner) {
          const card = owner && owner.closest && owner.closest("[data-card]");
          const media = { src: "", ref: "" };
          [avatar, owner, card].forEach((node) => {
            if (!node || !node.dataset) return;
            media.src = media.src || firstClean([node.dataset.detailAvatarSrc, node.dataset.avatarSrc, node.dataset.profilePhoto, node.dataset.businessPhoto, node.dataset.photo]);
            media.ref = media.ref || firstClean([node.dataset.detailAvatarRef, node.dataset.avatarRef, node.dataset.profilePhotoRef, node.dataset.businessPhotoRef, node.dataset.photoRef]);
          });
          return media;
        }
        function avatarOwnerText(avatar, owner) {
          const card = owner && owner.closest && owner.closest("[data-card]");
          const pieces = [];
          const push = (value) => {
            const text = clean(value);
            if (text) pieces.push(text);
          };
          const readNode = (node) => {
            if (!node) return;
            const data = node.dataset || {};
            [
              data.businessName, data.business, data.detailBusiness, data.itemBusinessName, data.profileBusinessName,
              data.publicBusiness, data.publicName, data.nearbyBusiness, data.businessLink, data.businessKey,
              data.detailBusinessKey, data.ownerName, data.profileName
            ].forEach(push);
            if (node.getAttribute) {
              ["aria-label", "title", "data-detail-business", "data-business-name", "data-business-key", "data-business-link", "data-nearby-business", "data-profile-business-name", "data-item-business-name"].forEach((attr) => push(node.getAttribute(attr)));
            }
          };
          [avatar, owner, card].forEach(readNode);
          const nameNode = owner && owner.querySelector && owner.querySelector(".social-feed-name strong,.feed-profile-link strong,.post-head strong,.reel-owner-link strong,.profile-record-top strong,.thread-row strong,.message-row strong,h1,h2,h3,strong");
          if (nameNode) push(nameNode.textContent);
          const cardNameNode = card && card.querySelector && card.querySelector(".social-feed-name strong,.feed-profile-link strong,.post-head strong,.reel-owner-link strong,strong");
          if (cardNameNode) push(cardNameNode.textContent);
          return firstClean(pieces) || elementBusinessText(owner || card || avatar);
        }
        const businessAvatarSelector = [
          ".clip-viewer-avatar", ".reel-avatar", ".search-reel-avatar", ".business-avatar", ".my-business-avatar",
          ".nearby-business-media", ".nearby-popup-media", ".nearby-marker-avatar", ".nearby-map-pin span",
          ".post-avatar", ".feed-avatar", ".social-feed-avatar", ".social-feed-quote-avatar", ".feed-create-brand-mark", "[data-feed-actor-avatar]", ".home-created-avatar", ".business-preview-post-avatar",
          ".business-top-avatar", ".owner-avatar", ".business-owned-avatar", ".business-profile-hub-avatar", ".public-avatar",
          ".item-business-avatar", ".item-product-avatar", ".feed-business-profile-avatar", ".profile-customer-business-avatar",
          ".profile-record-avatar", ".customer-business-avatar", ".thread-avatar", ".message-avatar", ".feed-job-business i", "[data-business-top-avatar]", "[data-business-owned-avatar]",
          "[data-owner-avatar]", "[data-item-business-avatar]", "[data-item-product-avatar]", "[data-public-avatar]", "[data-detail-avatar]"
        ].join(",");
        const businessAvatarOwnerSelector = [
          ".clip-viewer-creator", ".reel-top", ".search-reel-top", ".post-head", ".social-feed-head", "[data-card]",
          ".business-card", ".business-top-profile", ".business-topbar", ".owner-title", ".owner-hero", ".business-profile-hub-hero",
          ".public-hero", ".public-business-profile", ".my-business-row", ".my-business-update", ".rail-pulse-item",
          ".nearby-business-row", ".nearby-map-pin", ".business-preview-card", ".feed-business-profile-cover",
          ".item-detail-business", ".item-product-business", ".detail-business", ".thread-row", ".message-row",
          ".profile-customer-business-card", ".profile-record-top", ".search-result-card", ".result-card", ".feed-job-business",
          "[data-business-link]", "[data-business-key]", "[data-nearby-business]", "[data-public-business]"
        ].join(",");
        let avatarImageFallbackInstalled = false;
        function avatarFallbackInitial(avatar) {
          if (!avatar) return "B";
          const owner = avatar.closest && (avatar.closest(businessAvatarOwnerSelector) || avatar);
          const pieces = [];
          const pushNode = (node) => {
            if (!node) return;
            const data = node.dataset || {};
            [data.avatarInitial, data.businessName, data.detailBusiness, data.profileBusinessName, data.nearbyBusiness, data.businessLink, data.businessKey, data.publicName].forEach((value) => {
              const text = clean(value);
              if (text) pieces.push(text);
            });
            if (node.getAttribute) ["aria-label", "title", "data-avatar-initial", "data-business-link", "data-nearby-business"].forEach((attr) => {
              const text = clean(node.getAttribute(attr));
              if (text) pieces.push(text);
            });
          };
          pushNode(avatar);
          pushNode(owner);
          const directText = firstClean([avatarOwnerText(avatar, owner)].concat(pieces));
          const match = businessByText(directText) || businessByText(owner ? elementBusinessText(owner) : "");
          const label = firstClean([avatar.dataset && avatar.dataset.avatarInitial, match && match.name, directText, owner && elementBusinessText(owner), avatar.textContent]);
          const readable = clean(String(label || "").replace(/https?:\/\/\S+/g, " ").replace(/emy-[a-z-]+\.html\S*/g, " ").replace(/[-_]+/g, " "));
          return readable.charAt(0).toUpperCase() || "B";
        }
        function markAvatarImagePending(avatar) {
          if (!avatar || !avatar.dataset) return;
          avatar.dataset.avatarInitial = avatarFallbackInitial(avatar);
          avatar.dataset.emyAvatarPendingImage = "true";
        }
        function clearAvatarImagePending(avatar) {
          if (!avatar || !avatar.dataset) return;
          delete avatar.dataset.emyAvatarPendingImage;
        }
        function bindAvatarImageState(avatar, img) {
          if (!avatar || !img) return;
          if (img.complete && img.naturalWidth > 0) {
            clearAvatarImagePending(avatar);
            avatar.classList && avatar.classList.add("has-image");
            return;
          }
          markAvatarImagePending(avatar);
          if (img.dataset && img.dataset.emyAvatarStateBound === "true") return;
          if (img.dataset) img.dataset.emyAvatarStateBound = "true";
          img.addEventListener("load", () => {
            if (!img.parentElement) return;
            clearAvatarImagePending(avatar);
            avatar.classList && avatar.classList.add("has-image");
          }, { once: true });
          img.addEventListener("error", () => resetAvatarToInitial(avatar, img), { once: true });
        }
        function resetAvatarToInitial(avatar, brokenImg) {
          if (!avatar || !avatar.classList) return;
          if (brokenImg && avatar.dataset) {
            const brokenSrc = firstClean([brokenImg.currentSrc, brokenImg.getAttribute && brokenImg.getAttribute("src")]);
            const brokenRef = firstClean([brokenImg.getAttribute && brokenImg.getAttribute("data-emy-media-ref"), brokenImg.dataset && brokenImg.dataset.emyMediaRef]);
            const signature = avatarImageSignature(brokenSrc, brokenRef);
            if (signature !== "|") avatar.dataset.emyAvatarBrokenSource = signature;
          }
          const initial = avatarFallbackInitial(avatar);
          avatar.classList.remove("has-image");
          avatar.removeAttribute("data-emy-avatar-broken");
          clearAvatarImagePending(avatar);
          avatar.querySelectorAll && avatar.querySelectorAll("img").forEach((img) => img.remove());
          if (avatar.matches && avatar.matches(".nearby-marker-avatar,.nearby-popup-media")) avatar.innerHTML = '<b>' + escapeAttr(initial) + '</b>';
          else avatar.textContent = initial;
        }
        function repairBrokenAvatarImages(root) {
          const scope = root && root.querySelectorAll ? root : document;
          const images = [];
          if (scope.matches && scope.matches("img")) images.push(scope);
          scope.querySelectorAll("img").forEach((img) => images.push(img));
          images.forEach((img) => {
            const avatar = img.closest && img.closest(businessAvatarSelector);
            if (!avatar) return;
            const src = firstClean([img.currentSrc, img.getAttribute("src")]);
            const ref = firstClean([img.getAttribute("data-emy-media-ref"), img.dataset && img.dataset.emyMediaRef]);
            const refStillNeedsSource = !!(ref && !src && !avatarImageHasRenderableSource(img));
            if ((src && !img.complete) || refStillNeedsSource) bindAvatarImageState(avatar, img);
            if (ref && img.dataset && img.dataset.emyMediaHydrating === "true") return;
            if (refStillNeedsSource && img.dataset && img.dataset.emyAvatarFallbackWait !== "true") {
              bindAvatarImageState(avatar, img);
              img.dataset.emyAvatarFallbackWait = "true";
              window.setTimeout(() => repairBrokenAvatarImages(avatar), 1200);
              return;
            }
            if ((!src && !ref) || (src && img.complete && !img.naturalWidth) || (refStillNeedsSource && img.dataset && img.dataset.emyMediaHydrating !== "true" && img.dataset.emyAvatarFallbackWait === "true")) {
              resetAvatarToInitial(avatar, img);
            }
          });
          scope.querySelectorAll(businessAvatarSelector).forEach((avatar) => {
            if (!avatar || !avatar.classList) return;
            const hasMedia = !!(avatar.querySelector && avatar.querySelector("img,picture,video"));
            const hasText = !!clean(avatar.textContent);
            if ((avatar.classList.contains("has-image") && !hasMedia) || (!hasMedia && !hasText)) resetAvatarToInitial(avatar, null);
          });
        }
        function scheduleAvatarFallbackRepair(root) {
          repairBrokenAvatarImages(root);
          window.setTimeout(() => repairBrokenAvatarImages(root && root.querySelectorAll ? root : document), 1000);
        }
        function installAvatarImageFallbackHandlers() {
          if (avatarImageFallbackInstalled) return;
          avatarImageFallbackInstalled = true;
          document.addEventListener("error", (event) => {
            const target = event.target;
            if (!target || target.tagName !== "IMG" || !target.closest) return;
            const avatar = target.closest(businessAvatarSelector);
            if (avatar) resetAvatarToInitial(avatar, target);
          }, true);
        }
        function elementHrefText(node) {
          if (!node) return "";
          const values = [];
          if (node.getAttribute) values.push(node.getAttribute("href"));
          if (node.querySelectorAll) {
            node.querySelectorAll("a[href]").forEach((link) => values.push(link.getAttribute("href")));
          }
          return values.map(clean).filter(Boolean).join(" ");
        }
        function isBusinessProfileOwnedContentTarget(node) {
          if (!/emy-business-profile\.html/i.test(window.location.pathname || "")) return false;
          if (!node || !node.closest) return false;
          return !!node.closest(".business-posted-clip-card,.business-posted-product-clip-card,.business-posted-card,.business-live-product-card,.feed-card.is-user-post,.social-feed-card.is-user-post,.reel-card.is-user-post,.home-flow-item.is-user-post,[data-business-posted-flow],[data-business-products-live]");
        }
        function isBusinessAccountAvatarTarget(avatar, owner) {
          const businessAvatarSelector = "[data-business-top-avatar],.business-top-avatar,.business-profile-hub-avatar,[data-owner-avatar],.owner-avatar,.business-owned-avatar,[data-business-owned-avatar]";
          const businessOwnerSelector = ".business-topbar,.business-profile-hub-hero,.owner-hero,[data-business-shell]";
          if (avatar && avatar.matches && avatar.matches(businessAvatarSelector)) return true;
          if (owner && owner.matches && owner.matches(businessOwnerSelector)) return true;
          if (/emy-business-profile\.html/i.test(window.location.pathname || "")) {
            const node = avatar || owner;
            if (node && node.closest && node.closest(businessOwnerSelector + "," + businessAvatarSelector)) return true;
          }
          return false;
        }
        function isCurrentCustomerAvatarTarget(avatar, owner, ownerText) {
          const profilePhoto = currentCustomerPhoto();
          const profilePhotoRef = currentCustomerPhotoRef();
          if (!(profilePhoto || profilePhotoRef)) return false;
          if (isBusinessAccountAvatarTarget(avatar, owner)) return false;
          const target = owner || avatar;
          const card = avatar && avatar.closest && avatar.closest("[data-card],[data-feed-id],.social-feed-card,.post-card,.home-flow-item,.customer-public-feed-card");
          if (isBusinessProfileOwnedContentTarget(target) || isBusinessProfileOwnedContentTarget(card)) return false;
          const data = Object.assign({}, card && card.dataset || {}, target && target.dataset || {}, avatar && avatar.dataset || {});
          const keyValues = [
            data.businessKey, data.detailBusinessKey, data.profileKey, data.ownerKey, data.publicName,
            data.businessLink, data.profileBusinessLink, data.threadKey, data.itemBusinessName
          ].map(slug).filter(Boolean);
          const roleText = clean([data.owner, data.actorType, data.accountType, data.createdAs, data.authorRole].join(" ")).toLowerCase();
          const profileHref = clean([data.profileHref, data.href, card && card.getAttribute && card.getAttribute("data-profile-href")].join(" "));
          const hrefText = elementHrefText(target) + " " + elementHrefText(card);
          const explicitCustomer = keyValues.indexOf("customer-profile") >= 0 || /\bcustomer\b/.test(roleText) || /emy-customer-profile/i.test(profileHref) || /emy-customer-profile/i.test(hrefText);
          const explicitBusiness = !explicitCustomer && (
            /\bbusiness\b|\bmerchant\b|\bseller\b/.test(roleText) ||
            /emy-business-profile/i.test(profileHref) ||
            /emy-business-profile/i.test(hrefText) ||
            keyValues.some((key) => key && key !== "customer-profile")
          );
          if (explicitBusiness) return false;
          if (explicitCustomer) return true;
          if (target && target.classList && (target.classList.contains("customer-public-feed-card") || target.classList.contains("customer-public-activity-item"))) return true;
          if (card && card.classList && (card.classList.contains("customer-public-feed-card") || card.classList.contains("customer-public-activity-item"))) return true;
          if (!/emy-business-profile\.html/i.test(window.location.pathname || "") && target && target.classList && (target.classList.contains("is-user-post") || target.classList.contains("is-owned"))) return true;
          if (!/emy-business-profile\.html/i.test(window.location.pathname || "") && card && card.classList && (card.classList.contains("is-user-post") || card.classList.contains("is-owned"))) return true;
          const text = clean([ownerText, target ? elementBusinessText(target) : "", card ? elementBusinessText(card) : "", card && card.textContent].join(" "));
          if (/\\byour\\s+post\\b|\\byour\\s+activity\\b/i.test(text)) return true;
          const textSlug = slug(text);
          return currentCustomerIdentitySlugs().some((key) => key && (textSlug === key || textSlug.indexOf(key) >= 0));
        }
        const customerIdentityCardSelector = [
          "[data-owner='customer']", "[data-actor-type='customer']", "[data-account-type='customer']", "[data-created-as='customer']",
          "[data-business-key='customer-profile']", "[data-profile-href*='emy-customer-profile']", "[data-public-activity-id]",
          ".is-user-post", ".is-owned", ".customer-public-feed-card", ".customer-public-activity-item",
          ".social-feed-card", ".feed-card", ".post-card", ".reel-card", ".home-created-card", ".home-flow-item",
          ".search-result-card", ".result-card", "[data-card]", "[data-feed-id]"
        ].join(",");
        function isCurrentCustomerIdentityCard(card) {
          if (!card) return false;
          if (isBusinessProfileOwnedContentTarget(card)) return false;
          const data = card.dataset || {};
          if (recordLooksCustomerActor(data, currentCustomerIdentity())) return true;
          const keyValues = [data.businessKey, data.detailBusinessKey, data.profileKey, data.ownerKey, data.publicName, data.businessLink, data.profileBusinessLink].map(slug).filter(Boolean);
          const roleText = clean([data.owner, data.actorType, data.accountType, data.createdAs, data.authorRole].join(" ")).toLowerCase();
          const profileHref = clean([data.profileHref, data.href, card.getAttribute && card.getAttribute("data-profile-href")].join(" "));
          const hrefText = elementHrefText(card);
          const explicitCustomer = keyValues.indexOf("customer-profile") >= 0 || roleText.indexOf("customer") >= 0 || /emy-customer-profile/i.test(profileHref) || /emy-customer-profile/i.test(hrefText);
          const explicitBusiness = !explicitCustomer && (
            /\bbusiness\b|\bmerchant\b|\bseller\b/.test(roleText) ||
            /emy-business-profile/i.test(profileHref) ||
            /emy-business-profile/i.test(hrefText) ||
            keyValues.some((key) => key && key !== "customer-profile")
          );
          if (explicitBusiness) return false;
          if (explicitCustomer) return true;
          if (card.classList && (card.classList.contains("customer-public-feed-card") || card.classList.contains("customer-public-activity-item"))) return true;
          if (!/emy-business-profile\.html/i.test(window.location.pathname || "") && card.classList && (card.classList.contains("is-user-post") || card.classList.contains("is-owned"))) return true;
          const text = clean([elementBusinessText(card), card.textContent].join(" "));
          if (/\byour\s+post\b|\byour\s+activity\b/i.test(text)) return true;
          const textSlug = slug(text);
          return currentCustomerIdentitySlugs().some((key) => key && (textSlug === key || textSlug.indexOf(key) >= 0));
        }
        function setCustomerIdentityInitial(avatar, identity) {
          if (!avatar) return;
          const initial = clean(identity && identity.name).charAt(0).toUpperCase() || "C";
          avatar.classList && avatar.classList.remove("has-image");
          if (avatar.querySelectorAll) avatar.querySelectorAll("img").forEach((img) => img.remove());
          avatar.textContent = initial;
        }
        function syncCustomerIdentityCardData(card, identity) {
          if (!card || !card.dataset) return;
          const data = card.dataset;
          data.owner = "customer";
          data.actorType = "customer";
          data.accountType = "customer";
          data.createdAs = "customer";
          data.authorRole = "customer";
          data.businessKey = identity.key;
          data.detailBusinessKey = identity.key;
          data.profileKey = identity.key;
          data.ownerKey = identity.key;
          data.customerKey = identity.key;
          data.profileHref = identity.href;
          data.detailBusiness = identity.name;
          data.businessName = identity.name;
          data.ownerName = identity.name;
          data.actorName = identity.name;
          data.customerName = identity.name;
          data.profileName = identity.name;
          if (identity.email) {
            data.customerEmail = identity.email;
            data.actorEmail = identity.email;
          }
          if (identity.phone) data.customerPhone = identity.phone;
          [
            "detailAvatarSrc", "avatarSrc", "businessPhoto", "customerPhoto", "profilePhoto",
            "detailAvatarRef", "avatarRef", "businessPhotoRef", "customerPhotoRef", "profilePhotoRef"
          ].forEach((key) => { delete data[key]; });
          card.classList && card.classList.add("is-user-post");
        }
        function markCustomerPostAvatarless(avatar, card) {
          const owner = avatar && avatar.closest && avatar.closest(".social-feed-head,.post-head,.reel-top,.home-created-top,.business-preview-post-owner,.profile-record-top,.feed-job-business");
          if (owner && owner.classList) owner.classList.remove("is-customer-avatarless");
          if (card && card.classList) card.classList.remove("has-no-customer-avatar");
        }
          function applyCurrentCustomerCardAvatar(card, identity) {
          if (!card || !card.querySelectorAll) return;
          const selectors = [
            ".social-feed-head > .social-feed-avatar",
            ".social-feed-head > .feed-avatar",
            ".post-head > .post-avatar",
            ".reel-top > .reel-avatar",
            ".home-created-top > .home-created-avatar",
            ".profile-record-top .profile-record-avatar",
            ".feed-job-business > i",
            ".feed-post-head > .feed-create-brand-mark",
            ".feed-post-head .feed-create-brand-mark",
            "[data-feed-actor-avatar]"
          ].join(",");
          card.querySelectorAll(selectors).forEach((avatar) => {
            if (identity.photo || identity.photoRef) setImageAvatar(avatar, identity.photo, identity.photoRef);
            else setCustomerIdentityInitial(avatar, identity);
            markCustomerPostAvatarless(avatar, card);
          });
        }
        function removeCustomerPostProfileAvatars(card) {
          if (!card || !card.querySelectorAll) return;
          card.classList && card.classList.remove("has-no-customer-avatar");
          card.querySelectorAll(".is-customer-avatarless").forEach((owner) => {
            owner.classList && owner.classList.remove("is-customer-avatarless");
          });
          if (card.matches && card.matches(".is-customer-avatarless")) card.classList.remove("is-customer-avatarless");
        }
        function applyCurrentCustomerIdentity(root) {
          const scope = root && root.querySelectorAll ? root : document;
          const identity = currentCustomerIdentity();
          const cards = new Set();
          if (scope.matches && scope.matches(customerIdentityCardSelector)) cards.add(scope);
          if (scope.querySelectorAll) scope.querySelectorAll(customerIdentityCardSelector).forEach((card) => cards.add(card));
          cards.forEach((card) => {
            if (!isCurrentCustomerIdentityCard(card)) return;
            syncCustomerIdentityCardData(card, identity);
            [
              ".social-feed-name strong", ".feed-profile-link strong", ".post-head strong", ".reel-owner-link strong",
              ".home-created-top strong", ".business-preview-post-owner strong", ".profile-record-copy h3",
              ".feed-job-business span", ".social-feed-caption > strong", "[data-current-customer-name]",
              "[data-owner-name]", "[data-actor-name]", "[data-customer-name]"
            ].forEach((selector) => {
              card.querySelectorAll && card.querySelectorAll(selector).forEach((node) => {
                if (node && node.children && node.children.length && !node.matches("[data-current-customer-name],[data-owner-name],[data-actor-name],[data-customer-name]")) return;
                if (node) node.textContent = identity.name;
              });
            });
            card.querySelectorAll && card.querySelectorAll(".social-feed-name,.feed-profile-link,.reel-owner-link,.social-feed-avatar,.feed-avatar,.post-avatar,.reel-avatar,a[data-profile-href],a[href*='emy-customer-profile']").forEach((node) => {
              if (node.tagName === "A") node.setAttribute("href", identity.href);
              if (node.setAttribute && node.getAttribute("aria-label")) node.setAttribute("aria-label", replaceKnownCustomerNameText(node.getAttribute("aria-label"), identity));
              if (node.setAttribute && node.getAttribute("title")) node.setAttribute("title", replaceKnownCustomerNameText(node.getAttribute("title"), identity));
            });
            removeCustomerPostProfileAvatars(card);
            applyCurrentCustomerCardAvatar(card, identity);
          });
        }
        function applyRealAvatars(root) {
          const scope = root && root.querySelectorAll ? root : document;
          const rows = realBusinessRegistry();
          const targets = new Set();
          if (scope.matches && scope.matches(businessAvatarSelector)) targets.add(scope);
          scope.querySelectorAll(businessAvatarSelector).forEach((avatar) => targets.add(avatar));
          targets.forEach((avatar) => {
            const owner = avatar.closest(businessAvatarOwnerSelector) || avatar;
            const ownerText = avatarOwnerText(avatar, owner);
            const match = businessByText(ownerText, rows);
            const isBusinessAccountAvatar = isBusinessAccountAvatarTarget(avatar, owner);
            const isCustomerAvatar = !isBusinessAccountAvatar && isCurrentCustomerAvatarTarget(avatar, owner, ownerText);
            const direct = avatarDirectMedia(avatar, owner);
            const directPhoto = firstBusinessAvatarImageValue([direct.src]);
            const directPhotoRef = firstBusinessAvatarImageValue([direct.ref]);
            const matchPhoto = firstBusinessAvatarImageValue([match && match.photo]);
            const matchPhotoRef = firstBusinessAvatarImageValue([match && match.photoRef]);
            const ownerIsCurrentBusiness = currentBusinessIsRealProfile() && (isBusinessAccountAvatar || isCurrentBusiness(ownerText));
            const currentAvatar = ownerIsCurrentBusiness ? currentBusinessAvatarMedia() : { src: "", ref: "" };
            const hasCurrentAvatar = !!(currentAvatar.src || currentAvatar.ref);
            const photo = isCustomerAvatar ? currentCustomerPhoto() : hasCurrentAvatar ? currentAvatar.src : matchPhoto || directPhoto || "";
            const photoRef = isCustomerAvatar ? currentCustomerPhotoRef() : hasCurrentAvatar ? currentAvatar.ref : matchPhotoRef || directPhotoRef || "";
            if (photo || photoRef) setImageAvatar(avatar, photo, photoRef);
          });
          ensureRepostQuoteAvatars(scope, rows);
        }
        function ensureRepostQuoteAvatars(root, registryRows) {
          const scope = root && root.querySelectorAll ? root : document;
          const quotes = [];
          if (scope.matches && scope.matches(".social-feed-quote")) quotes.push(scope);
          scope.querySelectorAll(".social-feed-quote").forEach((quote) => quotes.push(quote));
          quotes.forEach((quote) => {
            const head = quote.querySelector && quote.querySelector(".social-feed-quote-head");
            if (!head || head.querySelector(".social-feed-quote-avatar")) return;
            const name = firstClean([
              quote.dataset && quote.dataset.detailBusiness,
              quote.dataset && quote.dataset.businessName,
              head.querySelector("strong") && head.querySelector("strong").textContent
            ]);
            if (!name) return;
            const photo = businessAvatarForText(name, registryRows);
            const photoRef = businessAvatarRefForText(name, registryRows);
            if (!photo && !photoRef) return;
            const avatar = document.createElement("span");
            avatar.className = "social-feed-quote-avatar has-image";
            avatar.setAttribute("aria-hidden", "true");
            avatar.dataset.detailBusiness = name;
            head.insertBefore(avatar, head.firstChild);
            setImageAvatar(avatar, photo, photoRef);
          });
        }
        function protectedElement(node) {
          return !!(node.closest && node.closest("[data-business-posted-posts],[data-business-posted-posts-list],[data-business-posted-clips],[data-business-posted-events],[data-business-posted-jobs],[data-business-posted-articles],[data-business-product-sheet],[data-feed-post-sheet],.feed-post-sheet,[data-item-detail-modal],form,[data-gallery-modal],[data-camera-sheet],[data-crop-modal],[data-video-editor]"));
        }
        function customerOnlyHomeCard(node) {
          if (!node || !node.closest || !/emy-customer-home\.html/i.test(window.location.pathname || "")) return false;
          if (node.closest("[data-annexed-feed-list],.annexed-feed-middle")) return false;
          if (!node.closest("[data-home-flow-list],[data-annexed-feed-list],.annexed-feed-middle")) return false;
          const data = node.dataset || {};
          const feedId = firstClean([data.feedId, data.originalFeedId, data.id]);
          if (/^(user-feed-|feed-create-|customer-post-|repost-)/i.test(feedId)) return false;
          if (node.classList && (node.classList.contains("is-user-post") || node.classList.contains("is-owned"))) return false;
          const key = slug(firstClean([data.businessKey, data.detailBusinessKey]));
          if (key === "customer-profile") return true;
          const href = firstClean([node.getAttribute && node.getAttribute("href"), node.querySelector && node.querySelector("a[href*='emy-customer-profile']") && node.querySelector("a[href*='emy-customer-profile']").getAttribute("href")]);
          return /emy-customer-profile/i.test(href) && !businessByText(elementBusinessText(node));
        }
        function isProtectedHomeFeedCard(node) {
          if (!node || !node.closest || !node.matches) return false;
          if (!node.matches("[data-feed-id],.feed-card,.social-feed-card,.post-card,.product-card,.reel-card,.home-flow-item")) return false;
          return !!node.closest("[data-home-flow-list],[data-home-static-clip-list],[data-home-static-product-list],[data-home-posted-posts-list],[data-home-posted-events-list],[data-home-posted-articles-list],[data-home-posted-jobs-list]");
        }
        function scrubDemoDom(root) {
          const scope = root && root.querySelectorAll ? root : document;
          const selector = [
            "[data-business-link]", "[data-business-key]", "[data-nearby-business]", ".my-business-row", ".my-business-update",
            ".rail-pulse-item", ".nearby-map-pin", ".business-card", ".product-card", ".reel-card", ".feed-card",
            ".social-feed-card", ".home-created-card", ".business-preview-card", ".search-result-card", ".result-card",
            ".content-tile", ".record"
          ].join(",");
          scope.querySelectorAll(selector).forEach((node) => {
            if (protectedElement(node)) return;
            if (isProtectedHomeFeedCard(node)) return;
            if (node.closest && node.closest("[data-annexed-feed-list],.annexed-feed-middle")) return;
            if (customerOnlyHomeCard(node)) {
              node.remove();
              return;
            }
            const data = node.dataset || {};
            const feedId = firstClean([data.feedId, data.originalFeedId, data.id]);
            if (/^(user-feed-|feed-create-|customer-post-|repost-)/i.test(feedId)) return;
            if (node.classList && (node.classList.contains("is-user-post") || node.classList.contains("is-owned"))) return;
            if (node.closest("[data-home-static-product-list],[data-home-static-clip-list],[data-home-flow-list]") && node.matches("[data-feed-id],[data-detail-kind],[data-open-item-detail],.feed-product-card,.social-feed-card,.reel-card,.home-flow-item")) {
              const realCardBusiness = firstClean([data.businessKey, data.detailBusinessKey, data.detailBusiness, data.businessName, data.itemBusinessName]);
              if (realCardBusiness && !looksDemoText(realCardBusiness)) return;
            }
            if (looksDemoText(elementBusinessText(node)) || looksDemoText(node.textContent || "")) node.remove();
          });
          scope.querySelectorAll("[data-home-static-product-list],[data-home-static-clip-list],[data-home-flow-list]").forEach((node) => {
            node.hidden = false;
          });
          scope.querySelectorAll(".left-rail,.right-rail,.left-rail .rail-card,.my-business-activity,.right-rail .rail-card").forEach((section) => { section.hidden = false; });
        }
        function allowDemoDomScrub() {
          return /emy-customer-(home|search|feeds)\.html/i.test(window.location.pathname || "");
        }
        function hasAnyRealRecords() {
          const arrayKeys = ["emyBusinessProducts", "emyBusinessProductList", "emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClipsByBusiness", "emyUploadedClips", "emyBusinessPosts", "emyBusinessFeedPosts", "emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents", "emyFeedCreatedProducts", "emyFeedCreatedClips", "emyFeedCreatedArticles"];
          if (arrayKeys.some((key) => {
            const rows = readJson(key, []);
            return Array.isArray(rows) && rows.some((item) => !looksDemoItem(item));
          })) return true;
          const businesses = readJson("emyCustomerBusinesses", {});
          return businesses && typeof businesses === "object" && Object.keys(businesses).some((key) => !looksDemoText(key) && !looksDemoItem(businesses[key]));
        }
        function clearFakeFollowerCounts(root) {
          const realCount = localStorage.getItem("emyBusinessFollowersCount") || localStorage.getItem("emyCustomerFollowersCount") || "";
          if (realCount) return;
          const scope = root && root.querySelectorAll ? root : document;
          scope.querySelectorAll("span,p,small,strong,div").forEach((node) => {
            if (node.children && node.children.length) return;
            if (/^\s*\d+\s+followers?\s*$/i.test(node.textContent || "")) node.remove();
          });
        }
        function currentCustomerHomeView() {
          const bodyView = document.body ? clean(document.body.dataset.currentView || "") : "";
          if (["home", "nearby", "feeds", "reels"].indexOf(bodyView) >= 0 && /emy-customer-home\.html/i.test(location.pathname || "")) {
            return bodyView;
          }
          if (window.EmyCustomerRouter && typeof window.EmyCustomerRouter.current === "function") {
            return window.EmyCustomerRouter.current();
          }
          const hashView = clean(String(location.hash || "").replace(/^#/, ""));
          if (["home", "nearby", "feeds", "reels"].indexOf(hashView) >= 0) return hashView;
          try {
            const tabView = clean(String(new URLSearchParams(location.search || "").get("tab") || "").replace(/^#/, "").toLowerCase());
            if (["home", "nearby", "feeds", "reels"].indexOf(tabView) >= 0) return tabView;
          } catch (error) {}
          return bodyView || "home";
        }
        function activeRealDataRoot() {
          const view = currentCustomerHomeView();
          if (view === "feeds") return document.querySelector(".annexed-feed-middle") || document.querySelector("[data-annexed-feed-list]") || document;
          if (view === "nearby") return document.querySelector(".nearby-map-section") || document.querySelector("[data-nearby-map-panel]") || document;
          if (view === "reels") return document.querySelector("[data-view-block][data-views~='reels']") || document.querySelector("[data-home-static-clip-list]") || document;
          return document;
        }
        function hydrateActiveHomeSurfaces(view) {
          if (view === "feeds") {
            const feedList = document.querySelector("[data-annexed-feed-list]");
            if (feedList && typeof window.emyRenderAnnexedFeeds === "function") {
              window.emyRenderAnnexedFeeds();
            }
            else if (feedList) {
              const filter = realFeedFallbackActiveFilter("all");
              fillRealFeedListFallback(feedList, filter || "all", { force: true });
            }
            else hydrateRealHomeContent();
            return;
          }
          if (view === "nearby") {
            hydrateRealNearby();
            return;
          }
          hydrateRealHomeSurfaces();
        }
        function syncRealHomeCarouselCounters() {
          if (window.emySyncHomeCarouselSections) window.emySyncHomeCarouselSections();
        }
        function resyncAnnexedFeedsAfterScrub(view) {
          if (view === "feeds") {
            const feedList = document.querySelector("[data-annexed-feed-list]");
            if (typeof window.emyRenderAnnexedFeeds === "function") {
              if (feedList && realListHasNativeCards(feedList)) {
                if (typeof window.emySyncAnnexedFeedLoadMoreFromDom === "function") window.emySyncAnnexedFeedLoadMoreFromDom();
                if (typeof window.emySyncHomeSectionGuides === "function") window.emySyncHomeSectionGuides();
              } else {
                window.emyRenderAnnexedFeeds();
              }
            }
            else {
              syncExistingAnnexedFeedLoadState();
              if (typeof window.emySyncHomeSectionGuides === "function") window.emySyncHomeSectionGuides();
            }
            return;
          }
          if (view === "home") {
            if (typeof window.emySetupHomeStaticFeedSections === "function") window.emySetupHomeStaticFeedSections();
            if (typeof window.emyRenderHomeCreatedSections === "function") window.emyRenderHomeCreatedSections();
            if (typeof window.emyHydrateRealHomeContent === "function") window.emyHydrateRealHomeContent();
            if (typeof window.emySyncHomeSectionGuides === "function") window.emySyncHomeSectionGuides();
          }
        }
        function run(root) {
          setupEarlyCustomerHomeClickBridge();
          if (realHomePageQuietActive()) {
            if (currentCustomerHomeView() === "home") hydrateSavedBusinessRailFast();
            if (!window.__EMY_REAL_GUARD_AFTER_CLICK_PENDING__) {
              window.__EMY_REAL_GUARD_AFTER_CLICK_PENDING__ = true;
              window.setTimeout(() => {
                window.__EMY_REAL_GUARD_AFTER_CLICK_PENDING__ = false;
                try { run(root); } catch (error) {}
              }, realHomePageQuietDelay());
            }
            return;
          }
          pauseRealGuardMutations(1400);
          const view = currentCustomerHomeView();
          clearJsonCache();
          resetDomReadCache();
          installStyle();
          installBusinessCoverControlHandlers();
          installAvatarImageFallbackHandlers();
          setupRealRailItemDetailLinks();
          installBusinessUpdateReadHandlers();
          compactDemoStorage();
          scheduleDeferredCustomerIdentityPurge();
          const shouldHydrateDeck = !root || root === document || root === document.documentElement || root === document.body ||
            (root.matches && root.matches("[data-business-deck],.business-stage,[data-business-card]")) ||
            (root.querySelector && root.querySelector("[data-business-deck],.business-stage,[data-business-card]"));
          if (view !== "feeds" && shouldHydrateDeck) hydrateRealBusinessDeck();
          if (allowDemoDomScrub()) scrubDemoDom(root);
          syncBusinessDeckEmptyState();
          ensureRailSurfaces();
          ensureHomeSectionGuides();
          resyncAnnexedFeedsAfterScrub(view);
          clearFakeFollowerCounts(root);
          applyRealAvatars(root);
          applyCurrentCustomerIdentity(root);
          applyRealProductMedia(root);
          primeLazyMedia(root);
          scheduleAvatarFallbackRepair(root);
          syncBusinessSwitchButtons(root);
          syncRealHomeCarouselCounters();
        }
        function runHomeFirstPaint() {
          setupEarlyCustomerHomeClickBridge();
          pauseRealGuardMutations(1400);
          const view = currentCustomerHomeView();
          const root = view === "home" ? document : activeRealDataRoot();
          clearJsonCache();
          resetDomReadCache();
          installStyle();
          installBusinessCoverControlHandlers();
          installAvatarImageFallbackHandlers();
          setupRealRailItemDetailLinks();
          installBusinessUpdateReadHandlers();
          compactDemoStorage();
          scheduleDeferredCustomerIdentityPurge();
          if (view === "home") {
            hydrateSavedBusinessRailFast();
            hydrateRealBusinessDeck();
            runAfterFirstPaint(() => {
              window.setTimeout(() => scheduleIdleWork(() => {
                try {
                  clearJsonCache();
                  resetDomReadCache();
                  if (realHomePageQuietActive()) {
                    window.setTimeout(() => { try { runFull(); } catch (error) {} }, realHomePageQuietDelay());
                    return;
                  }
                  hydrateRealRails();
                  ensureHomeSectionGuides();
                  syncRealHomeCarouselCounters();
                } catch (error) {}
              }, 1200), 2600);
            });
          } else {
            hydrateActiveHomeSurfaces(view);
          }
          if (view !== "home" && allowDemoDomScrub()) scrubDemoDom(root);
          syncBusinessDeckEmptyState();
          ensureRailSurfaces(view === "home" ? { fastOnly: true } : {});
          ensureHomeSectionGuides();
          if (view !== "home") resyncAnnexedFeedsAfterScrub(view);
          applyRealAvatars(root);
          applyCurrentCustomerIdentity(root);
          primeLazyMedia(root);
          scheduleAvatarFallbackRepair(root);
          syncBusinessSwitchButtons(root);
          syncRealHomeCarouselCounters();
        }
        function runFull() {
          setupEarlyCustomerHomeClickBridge();
          if (realHomePageQuietActive()) {
            if (currentCustomerHomeView() === "home") hydrateSavedBusinessRailFast();
            if (!window.__EMY_REAL_GUARD_FULL_AFTER_CLICK_PENDING__) {
              window.__EMY_REAL_GUARD_FULL_AFTER_CLICK_PENDING__ = true;
              window.setTimeout(() => {
                window.__EMY_REAL_GUARD_FULL_AFTER_CLICK_PENDING__ = false;
                try { runFull(); } catch (error) {}
              }, realHomePageQuietDelay());
            }
            return;
          }
          pauseRealGuardMutations(1600);
          const view = currentCustomerHomeView();
          const root = view === "home" ? document : activeRealDataRoot();
          clearJsonCache();
          resetDomReadCache();
          installStyle();
          installBusinessCoverControlHandlers();
          installAvatarImageFallbackHandlers();
          setupRealRailItemDetailLinks();
          installBusinessUpdateReadHandlers();
          compactDemoStorage();
          scheduleDeferredCustomerIdentityPurge();
          if (view === "home") hydrateRealRails();
          if (allowDemoDomScrub()) scrubDemoDom(root);
          syncBusinessDeckEmptyState();
          refreshBusinessCustomerBadges(root);
          ensureRailSurfaces();
          ensureHomeSectionGuides();
          resyncAnnexedFeedsAfterScrub(view);
          if (view !== "home") hydrateActiveHomeSurfaces(view);
          clearFakeFollowerCounts(root);
          applyRealAvatars(root);
          applyCurrentCustomerIdentity(root);
          applyRealProductMedia(root);
          primeLazyMedia(root);
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(root);
          scheduleAvatarFallbackRepair(root);
          syncBusinessSwitchButtons(root);
          syncRealHomeCarouselCounters();
        }
        window.emyRefreshRealHomeSurfaces = function emyRefreshRealHomeSurfaces() {
          clearJsonCache();
          resetDomReadCache();
          demoStorageCompacted = false;
          runFull();
          const feedList = document.querySelector("[data-annexed-feed-list]");
          if (feedList) {
            if (typeof window.emyRenderAnnexedFeeds === "function") window.emyRenderAnnexedFeeds();
            const onFeedsView = document.body && document.body.dataset.currentView === "feeds";
            if (!feedList.querySelector("[data-feed-id]") && !onFeedsView) fillRealFeedListFallback(feedList, "all");
          }
          markHomeBootReady();
        };
        function markHomeBootReady() {
          const isHome = !!document.querySelector("[data-home-flow-list]") || /emy-customer-home\.html/i.test(location.pathname || "");
          if (!isHome) return;
          const apply = () => {
            if (window.__emyHomeMarkReady) window.__emyHomeMarkReady();
            else {
              document.documentElement.classList.add("emy-home-real-ready", "emy-page-real-ready");
              if (document.body) document.body.removeAttribute("aria-busy");
            }
          };
          if (window.requestAnimationFrame) window.requestAnimationFrame(() => window.requestAnimationFrame(apply));
          else window.setTimeout(apply, 0);
        }
        function homeStartupListsHydrated() {
          const lists = [
            document.querySelector("[data-home-static-product-list]"),
            document.querySelector("[data-home-static-clip-list]"),
            document.querySelector("[data-home-flow-list]")
          ];
          const present = lists.filter(Boolean);
          if (!present.length) return false;
          return present.every((list) => list.dataset.emyRealSignature || list.querySelector("[data-emy-real-empty]") || realListHasNativeCards(list));
        }
        function runDeferredHomeFullIfNeeded() {
          if (homeStartupListsHydrated() && !realHomeListsNeedHydration()) {
            markHomeBootReady();
            return;
          }
          runFull();
          markHomeBootReady();
        }
        let earlyAvatarFallbackObserverInstalled = false;
        function runEarlyAvatarFallbackRepair() {
          try {
            installStyle();
            installAvatarImageFallbackHandlers();
            repairBrokenAvatarImages(document);
          } catch (error) {}
        }
        function installEarlyAvatarFallbackObserver() {
          if (earlyAvatarFallbackObserverInstalled || !window.MutationObserver || !document.documentElement) return;
          earlyAvatarFallbackObserverInstalled = true;
          let queued = false;
          const queueRepair = () => {
            if (queued) return;
            queued = true;
            const runQueued = () => {
              queued = false;
              runEarlyAvatarFallbackRepair();
            };
            if (window.requestAnimationFrame) window.requestAnimationFrame(runQueued);
            else window.setTimeout(runQueued, 0);
          };
          const nodeTouchesAvatar = (node) => {
            if (!node || node.nodeType !== 1) return false;
            if (node.matches && (node.matches(businessAvatarSelector) || node.matches("img[data-emy-media-ref],img[src]") && node.closest && node.closest(businessAvatarSelector))) return true;
            return !!(node.querySelector && node.querySelector(businessAvatarSelector + ",img[data-emy-media-ref],img[src]"));
          };
          const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
              if (mutation.type === "attributes" && nodeTouchesAvatar(mutation.target)) {
                queueRepair();
                return;
              }
              for (const node of mutation.addedNodes || []) {
                if (nodeTouchesAvatar(node)) {
                  queueRepair();
                  return;
                }
              }
            }
          });
          observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["src", "data-emy-media-ref", "data-emy-media-hydrated", "data-emy-media-hydrating", "class"]
          });
          window.setTimeout(() => observer.disconnect(), 6000);
        }
        function scheduleEarlyAvatarFallbackRepair() {
          installEarlyAvatarFallbackObserver();
          runEarlyAvatarFallbackRepair();
          [16, 40, 80, 120, 180, 280, 700, 1400, 2600].forEach((delay) => {
            window.setTimeout(runEarlyAvatarFallbackRepair, delay);
          });
        }
        function scheduleInitialFullRuns() {
          setupEarlyCustomerHomeClickBridge();
          const isHome = !!document.querySelector("[data-home-flow-list]") || /emy-customer-home\.html/i.test(location.pathname || "");
          if (isHome) {
            const view = currentCustomerHomeView();
            hydrateSavedBusinessRailFast();
            runHomeFirstPaint();
            markHomeBootReady();
            const followupDelay = view === "home" ? 5200 : 6500;
            const followupTimeout = view === "home" ? 1800 : 5000;
            window.setTimeout(() => scheduleIdleWork(runDeferredHomeFullIfNeeded, followupTimeout), followupDelay);
            return;
          }
          window.setTimeout(() => scheduleIdleWork(runFull, 1200), 60);
          window.setTimeout(() => scheduleIdleWork(runFull, 1600), 1500);
        }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleEarlyAvatarFallbackRepair, { once: true });
        else scheduleEarlyAvatarFallbackRepair();
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleInitialFullRuns, { once: true });
        else scheduleInitialFullRuns();
        let scheduled = false;
        const pendingRoots = new Set();
        new MutationObserver((mutations) => {
          if (realGuardMutationPaused()) return;
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node && node.nodeType === 1) pendingRoots.add(node);
            });
          });
          if (scheduled || !pendingRoots.size) return;
          scheduled = true;
          scheduleIdleWork(() => {
            scheduled = false;
            if (realGuardMutationPaused()) {
              pendingRoots.clear();
              return;
            }
            const roots = Array.from(pendingRoots);
            pendingRoots.clear();
            if (roots.length > 24) run(activeRealDataRoot());
            else roots.forEach((node) => run(node));
          }, 1000);
        }).observe(document.documentElement, { childList: true, subtree: true });
        let realDataRefreshTimer = 0;
        function scheduleRealDataRefresh(delay, storageChanged) {
          clearJsonCache();
          if (storageChanged) demoStorageCompacted = false;
          if (realDataRefreshTimer) window.clearTimeout(realDataRefreshTimer);
          realDataRefreshTimer = window.setTimeout(() => {
            realDataRefreshTimer = 0;
            const lastSync = window.emyContentSync && window.emyContentSync.lastRefreshAt ? window.emyContentSync.lastRefreshAt : 0;
            if (lastSync && Date.now() - lastSync < 2000 && !storageChanged) return;
            if (hasAnyRealRecords() && !storageChanged) {
              const view = currentCustomerHomeView();
              if (view === "feeds" && typeof window.emyRenderAnnexedFeeds === "function") {
                window.emyRenderAnnexedFeeds();
                return;
              }
            }
            scheduleIdleWork(runFull, 1200);
          }, delay == null ? 80 : delay);
        }
        window.addEventListener("storage", () => scheduleRealDataRefresh(80, true));
        window.addEventListener("emy:customer-profile-updated", () => {
          clearJsonCache();
          scheduleDeferredCustomerIdentityPurge();
          scheduleRealDataRefresh(0, true);
        });
        let realGuardLastActivationSyncAt = 0;
        function scheduleRealDataActivationSync() {
          if (document.hidden) return;
          if (realHomePageQuietActive()) {
            scheduleRealDataRefresh(realHomePageQuietDelay(), false);
            return;
          }
          if (Date.now() - realGuardLastActivationSyncAt < 3500) return;
          realGuardLastActivationSyncAt = Date.now();
          pauseRealGuardMutations(1400);
          if (window.emyMarkHomeActivation) window.emyMarkHomeActivation();
          const syncVisibleState = () => {
            const root = activeRealDataRoot();
            clearJsonCache();
            resetDomReadCache();
            if (currentCustomerHomeView() === "home") {
              hydrateSavedBusinessRailFast();
              runAfterFirstPaint(hydrateRealRails);
            }
            hydrateRealBusinessDeck();
            syncBusinessDeckEmptyState();
            refreshBusinessCustomerBadges(root);
            ensureRailSurfaces();
            ensureHomeSectionGuides();
            syncBusinessSwitchButtons(root);
            syncRealHomeCarouselCounters();
            scheduleAvatarFallbackRepair(root);
          };
          try { syncVisibleState(); } catch (error) {}
          if (window.emyScheduleHomeActivationTask) window.emyScheduleHomeActivationTask("real-data-activation-state", syncVisibleState, 850, 700);
          else scheduleIdleWork(syncVisibleState, 700);
        }
        ["pageshow", "focus"].forEach((name) => {
          window.addEventListener(name, scheduleRealDataActivationSync);
        });
        document.addEventListener("visibilitychange", scheduleRealDataActivationSync);
        ["emy:central-storage-synced", "emy:shared-port-content-ready", "emy:business-content-changed", "emy:business-products-changed", "emy:business-clips-changed", "emy:created-posts-changed", "emy:created-jobs-changed", "emy:created-events-changed", "emy:business-profile-changed", "emy:real-business-profiles-synced"].forEach((name) => {
          window.addEventListener(name, () => scheduleRealDataRefresh(80, true));
        });
        window.addEventListener("emy:customer-business-changed", (event) => {
          try {
            clearJsonCache();
            resetDomReadCache();
            demoStorageCompacted = false;
            const view = currentCustomerHomeView();
            if (view === "home") hydrateRealRails();
            hydrateRealBusinessDeck();
            if (view === "nearby") hydrateRealNearby();
            if (view === "feeds" && typeof window.emyRenderAnnexedFeeds === "function") window.emyRenderAnnexedFeeds();
            syncBusinessDeckEmptyState();
            refreshBusinessCustomerBadges(document);
            ensureRailSurfaces();
            ensureHomeSectionGuides();
            syncBusinessSwitchButtons(activeRealDataRoot());
            syncRealHomeCarouselCounters();
            if (window.emyRefreshBusinessCustomerBadges) window.emyRefreshBusinessCustomerBadges(document);
            markHomeBootReady();
          } catch (error) {
            scheduleRealDataRefresh(0, true);
          }
        });
      })();
    </script>`;

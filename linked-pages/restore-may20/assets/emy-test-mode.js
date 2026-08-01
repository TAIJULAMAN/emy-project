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

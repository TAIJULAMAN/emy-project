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

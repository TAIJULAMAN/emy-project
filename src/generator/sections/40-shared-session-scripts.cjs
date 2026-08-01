/* EMY generator section: 40-shared-session-scripts.cjs (source lines 101231-104107) */
const sharedEmySessionNavScript = String.raw`
    <script data-emy-account-session-nav>
      (function () {
        function readJson(key) {
          try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
          } catch (error) {
            return null;
          }
        }
        function ensureEmyTopLoading() {
          let loader = document.querySelector(".emy-top-loading");
          if (!document.getElementById("emy-top-loading-style")) {
            const style = document.createElement("style");
            style.id = "emy-top-loading-style";
            style.textContent = [
              ".emy-top-loading{position:fixed;left:0;right:0;top:0;z-index:99999;height:4px;pointer-events:none;opacity:0;overflow:hidden;transform:translateY(-4px);transition:opacity .14s ease,transform .14s ease;}",
              ".emy-top-loading span{display:block;height:100%;width:100%;margin-left:0;border-radius:0 999px 999px 0;background:linear-gradient(90deg,#ff6a00,#ff4f8a,#ff7a1a);box-shadow:0 0 15px rgba(255,106,0,.46);transform:scaleX(0);transform-origin:left center;transition:transform .48s cubic-bezier(.22,.72,.24,1);}",
              ".emy-top-loading.is-visible{opacity:1;transform:translateY(0);}",
              ".emy-top-loading.is-finishing span{transform:scaleX(1)!important;transition-duration:.18s!important;}",
              "@media (prefers-reduced-motion:reduce){.emy-top-loading span{transition:none!important;transform:scaleX(.78)!important}.emy-top-loading.is-finishing span{transform:scaleX(1)!important}}"
            ].join("\n");
            document.head.appendChild(style);
          }
          if (!loader) {
            loader = document.createElement("div");
            loader.className = "emy-top-loading";
            loader.setAttribute("aria-hidden", "true");
            loader.innerHTML = "<span></span>";
            (document.body || document.documentElement).appendChild(loader);
          }
          return loader;
        }
        let emyTopLoadingTimer = 0;
        let emyTopLoadingFinishTimer = 0;
        let emyTopLoadingStageTimers = [];
        let emyDelayedNavigationTimer = 0;
        function clearEmyTopLoadingTimers() {
          if (emyTopLoadingTimer) window.clearTimeout(emyTopLoadingTimer);
          if (emyTopLoadingFinishTimer) window.clearTimeout(emyTopLoadingFinishTimer);
          emyTopLoadingStageTimers.forEach(function (timer) { window.clearTimeout(timer); });
          emyTopLoadingTimer = 0;
          emyTopLoadingFinishTimer = 0;
          emyTopLoadingStageTimers = [];
        }
        function showEmyTopLoading(duration) {
          const loader = ensureEmyTopLoading();
          if (!loader) return;
          const hold = Math.max(260, Number(duration) || 680);
          clearEmyTopLoadingTimers();
          loader.classList.remove("is-finishing");
          const fill = loader.querySelector("span");
          if (fill) {
            fill.style.transitionDuration = "0ms";
            fill.style.transform = "scaleX(0)";
          }
          void loader.offsetWidth;
          loader.classList.add("is-visible");
          if (fill) {
            window.requestAnimationFrame(function () {
              fill.style.transitionDuration = Math.max(240, Math.min(hold, 820)) + "ms";
              fill.style.transform = "scaleX(.72)";
            });
            emyTopLoadingStageTimers.push(window.setTimeout(function () { fill.style.transform = "scaleX(.88)"; }, Math.max(120, Math.round(hold * .48))));
            emyTopLoadingStageTimers.push(window.setTimeout(function () { fill.style.transform = "scaleX(.94)"; }, Math.max(180, Math.round(hold * .74))));
          }
          emyTopLoadingTimer = window.setTimeout(function () {
            loader.classList.add("is-finishing");
            emyTopLoadingFinishTimer = window.setTimeout(function () {
              loader.classList.remove("is-visible", "is-finishing");
              if (fill) {
                fill.style.transitionDuration = "0ms";
                fill.style.transform = "scaleX(0)";
              }
            }, 190);
          }, hold);
        }
        function loadingUrlForLink(link) {
          if (!link || link.target && link.target !== "_self" || link.hasAttribute("download")) return null;
          const rawHref = String(link.getAttribute("href") || "").trim();
          if (!rawHref || rawHref.indexOf("javascript:") === 0 || rawHref.indexOf("mailto:") === 0 || rawHref.indexOf("tel:") === 0) return null;
          try {
            const url = new URL(rawHref, window.location.href);
            return url.protocol === "http:" || url.protocol === "https:" || url.protocol === "file:" ? url : null;
          } catch (error) {
            return null;
          }
        }
        function plainPrimaryClick(event) {
          return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
        }
        function stopOpenPageMedia(reason) {
          try {
            if (typeof window.emyStopAllMedia === "function") {
              window.emyStopAllMedia(document, reason || "panel-close");
              return;
            }
          } catch (error) {}
          document.querySelectorAll("video,audio").forEach(function (media) {
            try { media.pause(); } catch (error) {}
            try {
              media.muted = true;
              media.defaultMuted = true;
              media.setAttribute("muted", "");
            } catch (error) {}
            try { media.currentTime = 0; } catch (error) {}
          });
        }
        function closeTransientCustomerPanels() {
          stopOpenPageMedia("transient-close");
          const panelSelectors = [
            ".filter-view.is-open",
            ".search-modal.is-open",
            ".location-overlay.is-open",
            ".notifications-panel.is-open",
            ".ask-mini-panel.is-open",
            ".profile-photo-overlay.is-open",
            ".profile-location-modal.is-open"
          ];
          document.querySelectorAll(panelSelectors.join(",")).forEach(function (panel) {
            panel.classList.remove("is-open", "is-visible", "open", "active");
            panel.setAttribute("aria-hidden", "true");
          });
          document.querySelectorAll(".custom-select.is-open").forEach(function (select) {
            select.classList.remove("is-open");
          });
          document.querySelectorAll(".custom-select-menu, .location-suggestions, [data-place-suggestions], [data-search-place-suggestions], [data-profile-place-suggestions]").forEach(function (menu) {
            if ("hidden" in menu) menu.hidden = true;
            menu.classList.remove("is-open", "is-visible", "open", "active");
            menu.setAttribute("aria-hidden", "true");
          });
          document.querySelectorAll("[aria-expanded='true'][data-notifications], [aria-expanded='true'][data-search-notifications], [aria-expanded='true'][data-profile-notifications], [aria-expanded='true'][data-open-ask-mini]").forEach(function (button) {
            button.setAttribute("aria-expanded", "false");
          });
          document.querySelectorAll("[data-business-preview-track]").forEach(function (track) {
            track.classList.remove("is-preview-moving");
            track.style.transform = "";
            track.style.opacity = "";
            track._previewMoving = false;
          });
          document.querySelectorAll("[data-business-preview]").forEach(function (preview) {
            preview.classList.remove("is-preview-moving");
          });
          if (document.body) {
            document.body.classList.remove("is-search-open", "has-search-overlay", "search-open");
          }
        }
        function navigateWithTopLoading(rawHref, duration) {
          let url;
          try {
            url = new URL(rawHref, window.location.href);
          } catch (error) {
            return false;
          }
          if (!/^https?:$|^file:$/.test(url.protocol)) return false;
          closeTransientCustomerPanels();
          const hold = Math.max(380, Number(duration) || 560);
          if (emyDelayedNavigationTimer) window.clearTimeout(emyDelayedNavigationTimer);
          try { sessionStorage.setItem("emyTopLoadingHeldNavigation", "1"); } catch (error) {}
          showEmyTopLoading(hold);
          emyDelayedNavigationTimer = window.setTimeout(function () {
            window.location.href = url.href;
          }, hold + 120);
          return true;
        }
        function urlForNavButton(button) {
          const nav = clean(button && button.dataset && button.dataset.nav);
          if (!nav) return "";
          const onHome = /emy-customer-home\.html$/i.test(window.location.pathname);
          if (onHome && (nav === "home" || nav === "nearby" || nav === "feeds" || nav === "reels")) return "";
          if (nav === "ask") return "ask-emy.html";
          if (nav === "chat") return "emy-customer-chat.html";
          if (nav === "profile") return "emy-customer-profile.html";
          if (nav === "home") return "emy-customer-home.html";
          if (nav === "nearby" || nav === "feeds" || nav === "reels") {
            return "emy-customer-home.html?tab=" + encodeURIComponent(nav) + "#" + encodeURIComponent(nav);
          }
          return "";
        }
        function maybeShowEmyTopLoading(event) {
          const target = event.target && event.target.closest ? event.target.closest("a[href], [data-back], [data-nav], [data-tab], [data-filter], [data-view], [data-feed-filter], [data-feed-open], [data-business-link], [data-nearby-business], [data-owner-preview], [data-owner-edit], [data-search-tab], [data-owner-tab]") : null;
          if (!target) return;
          if (target.closest && target.closest(".leaflet-control-zoom")) return;
          if (target.closest && target.closest(".leaflet-popup-close-button")) return;
          if (target.closest && target.closest(".nearby-map-section .nearby-business-row[data-nearby-business], .nearby-map-section .nearby-map-pin[data-nearby-business]")) return;
          if (target.closest && target.closest("[data-nearby-map-intent]")) return;
          closeTransientCustomerPanels();
          if (target.matches && target.matches("a[href]")) {
            const url = loadingUrlForLink(target);
            if (url && plainPrimaryClick(event)) {
              event.preventDefault();
              event.stopImmediatePropagation();
              navigateWithTopLoading(url.href, 560);
            } else if (url) {
              showEmyTopLoading(980);
            }
            return;
          }
          if (target.matches && target.matches("[data-nav]")) {
            const nav = clean(target.dataset && target.dataset.nav);
            const onHome = /emy-customer-home\.html$/i.test(window.location.pathname || "");
            if (onHome && nav && (nav === "home" || nav === "nearby" || nav === "feeds" || nav === "reels") && plainPrimaryClick(event)) {
              event.preventDefault();
              event.stopImmediatePropagation();
              try {
                if (window.EmyCustomerRouter && typeof window.EmyCustomerRouter.writeUrl === "function") {
                  window.EmyCustomerRouter.writeUrl(nav, true);
                }
              } catch (error) {}
              if (typeof window.emyCustomerHomeSetView === "function") window.emyCustomerHomeSetView(nav, false);
              else if (window.EmyCustomerRouter && typeof window.EmyCustomerRouter.applyEarlyPaint === "function") {
                window.EmyCustomerRouter.applyEarlyPaint(nav);
              }
              showEmyTopLoading(420);
              return;
            }
            const navHref = urlForNavButton(target);
            if (navHref && plainPrimaryClick(event)) {
              event.preventDefault();
              event.stopImmediatePropagation();
              navigateWithTopLoading(navHref, 560);
              return;
            }
            showEmyTopLoading(620);
            return;
          }
          showEmyTopLoading(620);
        }
        window.emyShowTopLoading = showEmyTopLoading;
        window.emyNavigateWithLoading = navigateWithTopLoading;
        window.emyCloseTransientCustomerPanels = closeTransientCustomerPanels;
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", function () {
            let held = false;
            try {
              held = sessionStorage.getItem("emyTopLoadingHeldNavigation") === "1";
              sessionStorage.removeItem("emyTopLoadingHeldNavigation");
            } catch (error) {}
            if (!held) showEmyTopLoading(520);
          }, { once: true });
        } else {
          let held = false;
          try {
            held = sessionStorage.getItem("emyTopLoadingHeldNavigation") === "1";
            sessionStorage.removeItem("emyTopLoadingHeldNavigation");
          } catch (error) {}
          if (!held) showEmyTopLoading(520);
        }
        document.addEventListener("click", maybeShowEmyTopLoading, true);
        window.addEventListener("hashchange", function () { closeTransientCustomerPanels(); showEmyTopLoading(520); });
        window.addEventListener("popstate", function () { closeTransientCustomerPanels(); showEmyTopLoading(520); });
        window.addEventListener("pageshow", function () { window.setTimeout(closeTransientCustomerPanels, 0); });
        window.addEventListener("beforeunload", function () { showEmyTopLoading(1200); });
        window.addEventListener("emy:loading", function (event) {
          showEmyTopLoading(event && event.detail && event.detail.duration || 680);
        });
        function clean(value) {
          return String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
        }
        function validRole(value) {
          const role = clean(value);
          return role === "business" || role === "customer" ? role : "";
        }
        function activeRole() {
          const paramsForRole = new URLSearchParams(window.location.search || "");
          const modeText = clean(paramsForRole.get("mode"));
          const viewText = clean(paramsForRole.get("view"));
          const mode = validRole(modeText);
          if (mode) return mode;
          try {
            const path = String(window.location.pathname || "").toLowerCase();
            if (/emy-customer-/i.test(path)) return "customer";
            if (/emy-business-profile\.html/i.test(path)) {
              if (paramsForRole.has("business") || viewText === "customer") return "customer";
              if (paramsForRole.get("setup") === "1" || viewText === "business" || ["business", "statistics", "services", "chat", "customers", "upload", "profile", "edit"].includes(modeText)) return "business";
              if (
                localStorage.getItem("emyBusinessProfileDraft") ||
                localStorage.getItem("emyBusinessProfilePhoto") ||
                localStorage.getItem("emyBusinessProfilePhotoSrc") ||
                localStorage.getItem("emyBusinessProfilePhotoRef") ||
                localStorage.getItem("emyBusinessDisplayName") ||
                localStorage.getItem("emyBusinessName")
              ) return "business";
            }
          } catch (error) {}
          const signedRole = validRole(localStorage.getItem("emyMainSignedInRole"));
          if (signedRole) return signedRole;
          if (localStorage.getItem("emyMainSignedOut") === "1") return "";
          return validRole(localStorage.getItem("emyMainPendingSignupRole"));
        }
        function hasStoredAccountProfile() {
          return [
            "emyCustomerDisplayName",
            "emyCustomerProfilePhoto",
            "emyCustomerProfilePhotoRef",
            "emyBusinessDisplayName",
            "emyBusinessName",
            "emyBusinessProfilePhoto",
            "emyBusinessProfilePhotoSrc",
            "emyBusinessProfilePhotoRef",
            "emyBusinessProfileDraft",
            "emyMainPendingSignupFirstName",
            "emyMainPendingSignupLastName"
          ].some(function (key) {
            return String(localStorage.getItem(key) || "").trim();
          });
        }
        function readSessionJson(key, fallback) {
          try {
            const parsed = JSON.parse(localStorage.getItem(key) || "");
            return parsed && typeof parsed === "object" ? parsed : fallback;
          } catch (error) {
            return fallback;
          }
        }
        function sessionText() {
          for (let index = 0; index < arguments.length; index += 1) {
            const value = String(arguments[index] || "").trim();
            if (value) return value;
          }
          return "";
        }
        function currentSession() {
          const role = activeRole();
          const signedOut = localStorage.getItem("emyMainSignedOut") === "1";
          if (!role && signedOut) return null;
          const askUser = readJson("emyAskCurrentUser") || {};
          const businessProfile = readSessionJson("emyBusinessProfileDraft", {});
          const email = sessionText(
            role === "business" && (businessProfile.businessEmail || businessProfile.email),
            localStorage.getItem("emyMainSignedInEmail"),
            localStorage.getItem("emyMainPendingSignupEmail"),
            !role && askUser.email
          );
          const hasAskUser = Boolean(String(askUser.name || askUser.email || "").trim());
          if (!email && !hasStoredAccountProfile() && !hasAskUser) return null;
          const sessionRole = role === "business" ? "business" : "customer";
          const firstName = String(localStorage.getItem("emyCustomerFirstName") || localStorage.getItem("emyMainPendingSignupFirstName") || "").trim();
          const lastName = String(localStorage.getItem("emyCustomerLastName") || localStorage.getItem("emyMainPendingSignupLastName") || "").trim();
          const customerName = sessionText(localStorage.getItem("emyCustomerDisplayName"), [firstName, lastName].filter(Boolean).join(" "), sessionRole === "customer" && askUser.name);
          const businessName = sessionText(businessProfile.businessName, businessProfile.name, localStorage.getItem("emyBusinessDisplayName"), localStorage.getItem("emyBusinessName"), localStorage.getItem("emyMainPendingSignupBusinessName"));
          const name = sessionRole === "business" ? businessName : customerName;
          const customerSignupPhoto = validRole(localStorage.getItem("emyMainPendingSignupRole")) === "customer" ? (localStorage.getItem("emyMainPendingSignupPhoto") || localStorage.getItem("emyMainPendingSignupPhotoSrc") || "") : "";
          const customerMediaValues = new Set([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef")
          ].map(function (value) { return String(value || "").trim(); }).filter(Boolean));
          function sessionBusinessMedia() {
            for (let index = 0; index < arguments.length; index += 1) {
              const value = String(arguments[index] || "").trim();
              if (value && !customerMediaValues.has(value)) return value;
            }
            return "";
          }
          const image = sessionText(
            sessionRole === "business"
              ? sessionBusinessMedia(
                  localStorage.getItem("emyBusinessProfilePhoto"),
                  localStorage.getItem("emyBusinessProfilePhotoSrc"),
                  businessProfile.profilePhoto,
                  businessProfile.profilePhotoSrc,
                  businessProfile.photo,
                  businessProfile.photoSrc
                )
              : sessionText(localStorage.getItem("emyCustomerProfilePhoto"), localStorage.getItem("emyCustomerProfilePhotoSrc"), customerSignupPhoto)
          );
          const imageRef = sessionRole === "business"
            ? sessionBusinessMedia(
                localStorage.getItem("emyBusinessProfilePhotoRef"),
                businessProfile.profilePhotoRef,
                businessProfile.photoRef
              )
            : sessionText(localStorage.getItem("emyCustomerProfilePhotoRef"), validRole(localStorage.getItem("emyMainPendingSignupRole")) === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "");
          return {
            role: sessionRole,
            name: name || (email ? email.split("@")[0] : "Stephane"),
            email: email || (sessionRole === "business" ? "Business account" : "Customer account"),
            image,
            imageRef
          };
        }
        function profileHref(session) {
          return session && session.role === "business" ? "emy-business-profile.html?mode=business" : "emy-customer-profile.html";
        }
        function hrefOf(element) {
          return clean(element && element.getAttribute ? element.getAttribute("href") : "");
        }
        function actionOf(element) {
          return clean(element && element.dataset ? element.dataset.emyComingSoon : "");
        }
        function isSignIn(element) {
          const text = clean(element && element.textContent);
          const href = hrefOf(element);
          const action = actionOf(element);
          return text === "sign in" || text === "log in" || action === "sign in" || action === "log in" || href === "#login" || href.indexOf("emy-signin") !== -1;
        }
        function isSignUp(element) {
          const text = clean(element && element.textContent);
          const href = hrefOf(element);
          const action = actionOf(element);
          return text === "sign up" || action === "sign up" || href === "#signup" || href.indexOf("emy-signup") !== -1;
        }
        function isAskEmy(element) {
          return clean(element && element.textContent) === "ask emy" || hrefOf(element).indexOf("ask-emy.html") !== -1;
        }
        function navScope(element) {
          return element && element.closest ? element.closest("header nav, .topbar .nav, [data-emy-standard-nav], [data-emy-mobile-menu]") : null;
        }
        function copyNavClass(from, to) {
          const className = from.getAttribute("class");
          if (className) to.setAttribute("class", className);
        }
        function replaceWithLink(element, href, label, ariaLabel) {
          const link = document.createElement("a");
          copyNavClass(element, link);
          link.href = href;
          link.textContent = label;
          link.dataset.emySessionHandled = "true";
          link.setAttribute("aria-label", ariaLabel || label);
          element.replaceWith(link);
          return link;
        }
        function shortEmail(value) {
          const text = String(value || "").trim();
          return text.length > 22 ? text.slice(0, 19).trim() + "..." : text;
        }
        function initials(name) {
          const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
          return (parts[0] && parts[0].charAt(0) || "S").toUpperCase();
        }
        function ensureProfilePillStyles() {
          if (document.getElementById("emy-session-profile-pill-style")) return;
          const style = document.createElement("style");
          style.id = "emy-session-profile-pill-style";
          style.textContent = [
            "header nav,.topbar .nav,[data-emy-standard-nav]{min-width:0!important;}",
            ".emy-session-profile-pill{box-sizing:border-box!important;position:relative!important;inset:auto!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;flex:0 1 auto!important;min-width:0!important;max-width:168px!important;min-height:46px!important;overflow:hidden!important;vertical-align:middle!important;border:1px solid rgba(0,27,71,.10)!important;border-radius:999px!important;background:rgba(255,255,255,.92)!important;color:#001b47!important;padding:5px 12px 5px 6px!important;text-decoration:none!important;box-shadow:0 10px 24px rgba(0,27,71,.10)!important;transform:none!important;white-space:nowrap!important;}",
            ".emy-session-profile-pill:hover{background:#fff!important;color:#001b47!important;box-shadow:0 14px 30px rgba(0,27,71,.14)!important;}",
            ".emy-session-profile-avatar{position:relative!important;display:grid!important;flex:0 0 34px!important;width:34px!important;height:34px!important;min-width:34px!important;place-items:center!important;overflow:hidden!important;border:1px solid rgba(255,106,0,.22)!important;border-radius:999px!important;background:linear-gradient(145deg,#fff7ed,#fff)!important;color:#001b47!important;font-size:13px!important;font-weight:800!important;line-height:1!important;box-shadow:0 0 0 4px rgba(255,247,237,.78)!important;}",
            ".emy-session-profile-avatar img{position:absolute!important;inset:0!important;display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;color:transparent!important;font-size:0!important;text-indent:-9999px!important;}",
            ".emy-session-profile-copy{box-sizing:border-box!important;display:block!important;min-width:0!important;max-width:100%!important;overflow:hidden!important;text-align:left!important;line-height:1!important;}",
            ".emy-session-profile-copy strong{display:block!important;min-width:0!important;max-width:100%!important;margin:0!important;padding:0!important;overflow:hidden!important;color:#001b47!important;font-size:13px!important;font-weight:800!important;line-height:1.1!important;text-overflow:ellipsis!important;white-space:nowrap!important;}",
            ".emy-session-profile-copy span{display:none!important;}",
            "@media(max-width:720px){.emy-session-profile-pill{width:46px!important;max-width:46px!important;min-height:46px!important;padding:5px!important;gap:0!important}.emy-session-profile-copy{display:none!important}.emy-session-profile-avatar{width:34px!important;height:34px!important;min-width:34px!important}}"
          ].join("\n");
          document.head.appendChild(style);
        }
        function createProfilePill(session) {
          ensureProfilePillStyles();
          const link = document.createElement("a");
          link.className = "emy-session-profile-pill";
          link.dataset.emySessionHandled = "true";
          updateProfilePill(link, session);
          return link;
        }
        function updateProfilePill(link, session) {
          if (!link || !session) return link;
          link.href = profileHref(session);
          link.dataset.emySessionRole = session.role;
          link.setAttribute("aria-label", "Open " + (session.role === "business" ? "business" : "customer") + " account for " + session.name);
          link.title = session.name + " - " + (session.role === "business" ? "Business account" : "Customer account");
          link.innerHTML = "";
          const avatar = document.createElement("span");
          avatar.className = "emy-session-profile-avatar";
          avatar.textContent = initials(session.name);
          if (session.image || session.imageRef) {
            const image = document.createElement("img");
            const resetProfileAvatarImage = function () {
              if (!image.isConnected && avatar.textContent) return;
              const brokenSource = [image.currentSrc || image.getAttribute("src") || session.image || "", session.imageRef || ""].join("|");
              avatar.dataset.emyAvatarBrokenSource = brokenSource;
              image.remove();
              avatar.textContent = initials(session.name);
            };
            const checkBrokenProfileAvatarImage = function () {
              if (!image.isConnected) return;
              if (image.complete && !image.naturalWidth) resetProfileAvatarImage();
            };
            if (session.image) image.src = session.image;
            if (session.imageRef) image.setAttribute("data-emy-media-ref", session.imageRef);
            image.alt = "";
            image.loading = "lazy";
            image.decoding = "async";
            image.setAttribute("aria-hidden", "true");
            image.addEventListener("error", resetProfileAvatarImage);
            avatar.appendChild(image);
            if (session.imageRef && window.emyHydrateFeedMedia) {
              window.setTimeout(function () {
                window.emyHydrateFeedMedia(avatar);
                window.setTimeout(checkBrokenProfileAvatarImage, 900);
              }, 0);
            }
            if (!session.image && session.imageRef && window.emyResolveFeedMedia) {
              window.emyResolveFeedMedia(session.imageRef).then(function (record) {
                const resolvedSrc = record && (record.url || record.src) || "";
                if (resolvedSrc) image.src = resolvedSrc;
              }).catch(function () {});
            }
            window.setTimeout(checkBrokenProfileAvatarImage, session.image ? 160 : 1100);
            window.setTimeout(checkBrokenProfileAvatarImage, 1800);
          }
          const copy = document.createElement("span");
          copy.className = "emy-session-profile-copy";
          const strong = document.createElement("strong");
          strong.textContent = session.name;
          const small = document.createElement("span");
          small.textContent = "Profile";
          copy.appendChild(strong);
          copy.appendChild(small);
          link.appendChild(avatar);
          link.appendChild(copy);
          return link;
        }
        function replaceWithProfilePill(element, session) {
          const link = createProfilePill(session);
          element.replaceWith(link);
          return link;
        }
        function navHasProfilePill(nav) {
          return Boolean(nav && nav.querySelector(".emy-session-profile-pill"));
        }
        function navHasProfileLink(nav) {
          return Boolean(nav && Array.from(nav.querySelectorAll("a,button")).some(function (element) {
            const text = clean(element && element.textContent);
            return text === "emy profile" || hrefOf(element).indexOf("emy-customer-profile") !== -1 || hrefOf(element).indexOf("emy-business-profile") !== -1;
          }));
        }
        function isProfileLink(element) {
          const href = hrefOf(element);
          const text = clean(element && element.textContent);
          return href.indexOf("emy-customer-profile") !== -1 || href.indexOf("emy-business-profile") !== -1 || text === "profile" || text === "emy profile";
        }
        function navAlreadyHasAsk(nav) {
          return Boolean(nav && Array.from(nav.querySelectorAll("a,button")).some(isAskEmy));
        }
        function applySessionNav() {
          const session = currentSession();
          if (!session) return;
          const profile = profileHref(session);
          const selector = [
            "header nav a",
            "header nav button",
            ".topbar .nav a",
            ".topbar .nav button",
            "[data-emy-standard-nav] a",
            "[data-emy-standard-nav] button",
            "[data-emy-mobile-menu] a",
            "[data-emy-mobile-menu] button"
          ].join(",");
          document.querySelectorAll(selector).forEach(function (element) {
            if (element.dataset && element.dataset.emySessionHandled === "true") return;
            const nav = navScope(element);
            if (isSignIn(element)) {
              replaceWithProfilePill(element, session);
              return;
            }
            if (isProfileLink(element)) {
              replaceWithProfilePill(element, session);
              return;
            }
            if (isSignUp(element)) {
              if (navAlreadyHasAsk(nav)) {
                element.remove();
                return;
              }
              replaceWithLink(element, "ask-emy.html", "Ask EMY", "Open Ask EMY");
            }
          });
          document.querySelectorAll("header nav, .topbar .nav, [data-emy-standard-nav]").forEach(function (nav) {
            nav.querySelectorAll(".emy-session-profile-pill").forEach(function (pill) { updateProfilePill(pill, session); });
            if (navHasProfilePill(nav) || navHasProfileLink(nav)) return;
            nav.appendChild(createProfilePill(session));
          });
        }
        function shouldRouteActiveProfile(element) {
          if (!element || !element.closest) return false;
          if (element.closest("[data-profile-back], [data-profile-route], [data-profile-link], [data-business-switch-customer], [data-switch-business]")) return false;
          if (element.closest("[data-business-link], [data-nearby-business], [data-detail-business], [data-profile-business-link], [data-public-business]") && !element.closest("[data-go-profile], [data-avatar], [data-nav='profile']")) return false;
          const href = hrefOf(element);
          if (href.indexOf("emy-customer-profile") !== -1 || href.indexOf("emy-business-profile") !== -1) return true;
          return Boolean(element.closest("[data-go-profile], [data-avatar], [data-nav='profile']"));
        }
        function handleSessionAuthClick(event) {
          const element = event.target && event.target.closest ? event.target.closest("a,button") : null;
          if (!element) return;
          const session = currentSession();
          if (!session) return;
          if (shouldRouteActiveProfile(element)) {
            const targetHref = profileHref(session);
            if (hrefOf(element) !== targetHref || element.closest("[data-go-profile], [data-avatar], [data-nav='profile']")) {
              event.preventDefault();
              event.stopPropagation();
              if (event.stopImmediatePropagation) event.stopImmediatePropagation();
              window.location.href = targetHref;
              return;
            }
          }
          const inNav = Boolean(navScope(element));
          const href = hrefOf(element);
          const authTarget = isSignIn(element) || isSignUp(element) || href === "#login" || href === "#signup" || href.indexOf("emy-signin") !== -1 || href.indexOf("emy-signup") !== -1;
          if (!authTarget || (!inNav && !href)) return;
          event.preventDefault();
          event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          window.location.href = profileHref(session);
        }
        const sessionKeys = [
          "emyMainSignedInRole", "emyMainPendingSignupRole", "emyMainSignedInEmail", "emyMainPendingSignupEmail",
          "emyCustomerDisplayName", "emyCustomerFirstName", "emyCustomerLastName", "emyCustomerProfilePhoto", "emyCustomerProfilePhotoSrc", "emyCustomerProfilePhotoRef",
          "emyBusinessDisplayName", "emyBusinessName", "emyBusinessProfilePhoto", "emyBusinessProfilePhotoSrc", "emyBusinessProfilePhotoRef",
          "emyBusinessProfileDraft", "emyAskCurrentUser"
        ];
        let queued = false;
        function queueApply() {
          if (queued) return;
          queued = true;
          requestAnimationFrame(function () {
            queued = false;
            applySessionNav();
          });
        }
        applySessionNav();
        document.addEventListener("DOMContentLoaded", applySessionNav);
        document.addEventListener("click", handleSessionAuthClick, true);
        window.addEventListener("pageshow", applySessionNav);
        window.addEventListener("focus", applySessionNav);
        window.addEventListener("storage", function (event) {
          if (!event || !event.key || sessionKeys.indexOf(event.key) !== -1) queueApply();
        });
        window.addEventListener("emy:account-changed", queueApply);
        if (window.MutationObserver) {
          new MutationObserver(queueApply).observe(document.documentElement, { childList: true, subtree: true });
        }
      })();
    </script>`;

const sharedAskMiniScript = String.raw`
    <script data-emy-ask-mini>
      (() => {
        const panel = document.querySelector("[data-ask-mini-panel]");
        if (!panel || panel.dataset.askMiniReady === "true") return;
        panel.dataset.askMiniReady = "true";
        const messages = panel.querySelector("[data-ask-mini-messages]");
        const form = panel.querySelector("[data-ask-mini-form]");
        const input = panel.querySelector("[data-ask-mini-input]");
        const closeButton = panel.querySelector("[data-ask-mini-close]");
        const triggers = () => Array.from(document.querySelectorAll("[data-open-ask-mini]"));
        const askMiniIconHtml = '<img src="${askMiniLogoAsset}" alt="" />';
        const chatKey = "emyAskSavedChats";
        const locationKey = "emyAskLocation";
        let chatId = sessionStorage.getItem("emyAskMiniChatId") || "";
        let miniMessages = [];
        let busy = false;

        function escapeHtml(value) {
          return String(value || "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
        }
        function readJson(key, fallback) {
          try {
            const parsed = JSON.parse(localStorage.getItem(key) || "");
            return parsed === undefined || parsed === null ? fallback : parsed;
          } catch (error) {
            return fallback;
          }
        }
        function writeJson(key, value) {
          try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {}
        }
        function currentLocationContext() {
          const stored = readJson(locationKey, {});
          const label = stored.location || stored.label || stored.address || localStorage.getItem("emyCustomerLocationLabel") || "Near me";
          const radius = stored.radius || localStorage.getItem("emyAskRadius") || 5;
          return { location: label, radius };
        }
        function ensureChatId() {
          if (!chatId) {
            chatId = "chat-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
            try { sessionStorage.setItem("emyAskMiniChatId", chatId); } catch (error) {}
          }
          return chatId;
        }
        function saveChat() {
          const userMessages = miniMessages.filter((item) => item.role === "user");
          if (!userMessages.length) return;
          const chats = Array.isArray(readJson(chatKey, [])) ? readJson(chatKey, []) : [];
          const id = ensureChatId();
          const title = (userMessages[0] && userMessages[0].text || "EMY chat").slice(0, 70);
          const record = {
            id,
            title,
            messages: miniMessages.map((item) => ({ role: item.role, text: item.text, results: item.results || [] })),
            updatedAt: new Date().toISOString(),
            source: "mini-chat"
          };
          const next = [record].concat(chats.filter((item) => item && item.id !== id)).slice(0, 40);
          writeJson(chatKey, next);
        }
        function resultHref(item) {
          const title = String(item && (item.title || item.name || "") || "");
          const type = String(item && (item.type || item.category || "") || "").toLowerCase();
          if (item && item.href) return item.href;
          if (type.includes("job")) return "emy-customer-search.html#jobs";
          if (type.includes("event")) return "emy-customer-search.html#events";
          if (type.includes("clip") || type.includes("reel")) return "emy-customer-search.html#reels";
          if (type.includes("business")) return "emy-customer-search.html#business";
          if (type.includes("article")) return "emy-customer-search.html#articles";
          if (title) return "emy-customer-search.html#products";
          return "emy-customer-search.html";
        }
        function resultsHtml(results) {
          const list = Array.isArray(results) ? results.slice(0, 3) : [];
          if (!list.length) return "";
          return '<div class="ask-mini-results">' + list.map((item) => {
            const title = item && (item.title || item.name || item.business || item.label) || "EMY result";
            const desc = item && (item.description || item.desc || item.place || item.location || item.category) || "Open in Search to see more.";
            return '<a class="ask-mini-result" href="' + escapeHtml(resultHref(item)) + '"><b>' + escapeHtml(title) + '</b><span>' + escapeHtml(desc) + '</span></a>';
          }).join("") + '</div>';
        }
        function renderMessage(item) {
          const role = item && item.role === "user" ? "user" : "assistant";
          const icon = role === "assistant" ? '<span class="ask-mini-icon" aria-hidden="true">' + askMiniIconHtml + '</span>' : "";
          return '<article class="ask-mini-message is-' + role + '">' + icon + '<div class="ask-mini-bubble"><p>' + escapeHtml(item && item.text || "") + '</p>' + resultsHtml(item && item.results) + '</div></article>';
        }
        function appendMessage(item) {
          miniMessages.push(item);
          if (messages) {
            messages.insertAdjacentHTML("beforeend", renderMessage(item));
            messages.scrollTop = messages.scrollHeight;
          }
          saveChat();
        }
        function setTyping(isTyping) {
          const existing = panel.querySelector("[data-ask-mini-typing]");
          if (existing) existing.remove();
          if (!isTyping || !messages) return;
          messages.insertAdjacentHTML("beforeend", '<article class="ask-mini-message is-assistant" data-ask-mini-typing><span class="ask-mini-icon" aria-hidden="true">' + askMiniIconHtml + '</span><div class="ask-mini-bubble"><p>EMY is checking...</p></div></article>');
          messages.scrollTop = messages.scrollHeight;
        }
        function apiCandidates() {
          const urls = [];
          const add = (url) => { if (url && !urls.includes(url)) urls.push(url); };
          try {
            add(window.EMY_ASK_EMY_API_URL);
            add(window.EMY_ASK_API_URL);
            add(localStorage.getItem("emyAskEmyApiUrl"));
            add(localStorage.getItem("emyAskApiUrl"));
            add(document.querySelector("meta[name='emy-ask-api-url']")?.content);
          } catch (error) {}
          if (window.location.protocol === "http:" || window.location.protocol === "https:") {
            add(window.location.origin + "/api/ask-emy");
            add("/api/ask-emy");
          }
          add("http://127.0.0.1:8779/api/ask-emy");
          add("http://localhost:8779/api/ask-emy");
          add("http://127.0.0.1:8767/api/ask-emy");
          add("http://localhost:8767/api/ask-emy");
          add("https://europe-west2-my-emy-db032.cloudfunctions.net/askEmyHttp");
          return urls;
        }
        function fallbackReply(query, reason) {
          const text = String(query || "").toLowerCase();
          const location = currentLocationContext().location || "your area";
          let tab = "products";
          if (/job|work|hiring|cv/.test(text)) tab = "jobs";
          else if (/event|book|today|tomorrow/.test(text)) tab = "events";
          else if (/clip|video|reel/.test(text)) tab = "reels";
          else if (/business|shop|store|service/.test(text)) tab = "business";
          else if (/article|read|news/.test(text)) tab = "articles";
          const prefix = reason ? "I could not reach EMY right now, so I used the saved EMY data for now. " : "";
          return {
            text: prefix + "I can help you look for " + query + " around " + location + ". I will point you toward nearby shops, products, services, events, jobs, articles, or clips from the EMY platform.",
            results: [{ title: "Open " + tab + " results", description: "See matching local EMY results.", type: tab, href: "emy-customer-search.html#" + tab }]
          };
        }
        async function ask(query) {
          const context = currentLocationContext();
          const body = JSON.stringify({
            query,
            location: context.location,
            radius: context.radius,
            history: miniMessages.slice(-8).map((item) => ({ role: item.role, text: item.text }))
          });
          let lastError = "";
          for (const endpoint of apiCandidates()) {
            try {
              const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body });
              if (!response.ok) throw new Error("EMY server returned " + response.status);
              const payload = await response.json();
              const results = Array.isArray(payload.results) ? payload.results : [];
              return {
                text: payload.answer || payload.text || "EMY found something useful.",
                results: results.length ? results : fallbackReply(query, "").results
              };
            } catch (error) {
              lastError = error && error.message ? error.message : "EMY server unreachable";
            }
          }
          return fallbackReply(query, lastError);
        }
        function setOpen(isOpen) {
          panel.classList.toggle("is-open", isOpen);
          panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
          triggers().forEach((button) => button.setAttribute("aria-expanded", isOpen ? "true" : "false"));
          if (isOpen && input) window.setTimeout(() => input.focus(), 30);
        }
        document.addEventListener("click", (event) => {
          const trigger = event.target && event.target.closest ? event.target.closest("[data-open-ask-mini]") : null;
          if (!trigger) return;
          event.preventDefault();
          event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          if (typeof window.emyPrepareAskMiniPanel === "function") {
            try { window.emyPrepareAskMiniPanel(trigger, panel); } catch (error) {}
          }
          setOpen(true);
        }, true);
        if (closeButton) closeButton.addEventListener("click", () => setOpen(false));
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape" && panel.classList.contains("is-open")) setOpen(false);
        });
        document.addEventListener("click", (event) => {
          if (!panel.classList.contains("is-open")) return;
          if (panel.contains(event.target)) return;
          if (event.target && event.target.closest && event.target.closest("[data-open-ask-mini]")) return;
          setOpen(false);
        });
        if (form) {
          async function submitQuery(value) {
            const query = String(value || "").trim();
            if (!query || busy) return;
            busy = true;
            if (input) input.value = "";
            appendMessage({ role: "user", text: query });
            setTyping(true);
            try {
              const reply = await ask(query);
              setTyping(false);
              appendMessage({ role: "assistant", text: reply.text, results: reply.results || [] });
            } finally {
              busy = false;
              if (input) input.focus();
            }
          }
          form.addEventListener("submit", async (event) => {
            event.preventDefault();
            await submitQuery(input && input.value);
          });
          panel.addEventListener("click", async (event) => {
            const prompt = event.target && event.target.closest ? event.target.closest("[data-ask-mini-prompt]") : null;
            if (!prompt) return;
            event.preventDefault();
            await submitQuery(prompt.getAttribute("data-ask-mini-prompt") || prompt.textContent);
          });
        }
      })();
    </script>`;

const sharedEmyEmojiPickerScript = String.raw`
    <script data-emy-emoji-picker>
      (() => {
        const recentKey = "emyEmojiRecent";
        const groups = [
          ["recent","\u25cc","Recently used",[]],
          ["smile","\u263a","Reactions",["\u{1F602}","\u{1F923}","\u{1F979}","\u{1F60A}","\u{1F600}","\u{1F603}","\u{1F604}","\u{1F601}","\u{1F606}","\u{1F605}","\u{1F642}","\u{1F609}","\u{1F60D}","\u{1F970}","\u{1F618}","\u{1F60B}","\u{1F61C}","\u{1F92A}","\u{1F60E}","\u{1F973}","\u{1F60C}","\u{1F622}","\u{1F62D}","\u{1F97A}","\u{1F64F}","\u{1F44F}","\u{1F64C}","\u{1F44D}","\u{1F44E}","\u{1F44C}","\u{1F4AA}","\u{1F440}","\u{1F499}","\u{1F9E1}","\u2764\uFE0F","\u{1F525}","\u2728","\u2B50"]],
          ["nature","\u2667","Nature",["\u{1F338}","\u{1F33A}","\u{1F33B}","\u{1F33C}","\u{1F337}","\u{1F331}","\u{1F33F}","\u{1F340}","\u{1F334}","\u{1F308}","\u2600\uFE0F","\u{1F324}\uFE0F","\u{1F319}","\u26A1","\u{1F4A7}","\u{1F30A}","\u2744\uFE0F"]],
          ["food","\u2668","Food",["\u{1F355}","\u{1F354}","\u{1F35F}","\u{1F32D}","\u{1F96A}","\u{1F32E}","\u{1F357}","\u{1F35D}","\u{1F35C}","\u{1F363}","\u{1F369}","\u{1F36A}","\u{1F382}","\u{1F36B}","\u2615","\u{1F9CB}","\u{1F964}","\u{1F37D}\uFE0F"]],
          ["activity","\u25ce","Work & fun",["\u26BD","\u{1F3C0}","\u{1F3C6}","\u{1F3AE}","\u{1F3A7}","\u{1F3A4}","\u{1F3AC}","\u{1F3A8}","\u{1F3AF}","\u{1F381}","\u{1F389}","\u{1F38A}","\u{1F6CD}\uFE0F","\u{1F4BC}","\u{1F4CC}","\u2705"]],
          ["places","\u2302","Places",["\u{1F697}","\u{1F695}","\u{1F68C}","\u{1F686}","\u2708\uFE0F","\u{1F6B2}","\u{1F3E0}","\u{1F3EA}","\u{1F3E2}","\u{1F3EC}","\u{1F4CD}","\u{1F5FA}\uFE0F","\u23F0","\u{1F4A1}","\u{1F527}","\u{1F4E6}","\u{1F4B3}","\u{1F4AC}"]],
          ["symbols","\u2261","Useful",["\u2705","\u2611\uFE0F","\u274C","\u26A0\uFE0F","\u2757","\u2753","\u{1F4AF}","\u{1F514}","\u{1F4E3}","\u{1F512}","\u{1F511}","\u{1F4DE}","\u2709\uFE0F","\u{1F4AC}","\u{1F50E}","\u2795","\u2796","\u27A1\uFE0F"]]
        ];
        const aliases = { laugh:["\u{1F602}","\u{1F923}","\u{1F606}"], smile:["\u{1F60A}","\u{1F642}","\u{1F604}","\u{1F601}"], love:["\u{1F60D}","\u{1F970}","\u2764\uFE0F"], sad:["\u{1F622}","\u{1F62D}","\u{1F97A}"], fire:["\u{1F525}"], ok:["\u{1F44C}","\u2705"], food:["\u{1F355}","\u{1F354}","\u{1F35F}","\u{1F37D}\uFE0F"], shop:["\u{1F6CD}\uFE0F","\u{1F3EA}"], car:["\u{1F697}","\u{1F695}"], money:["\u{1F4B3}","\u{1F4AF}"], message:["\u{1F4AC}","\u2709\uFE0F"] };
        let target = null, active = "recent", query = "", hideTimer = 0;
        const recent = () => { try { const value = JSON.parse(localStorage.getItem(recentKey) || "[]"); return Array.isArray(value) ? value.slice(0, 24) : []; } catch (error) { return []; } };
        const saveRecent = (emoji) => { try { localStorage.setItem(recentKey, JSON.stringify([emoji].concat(recent().filter((item) => item !== emoji)).slice(0, 24))); } catch (error) {} };
        const emojiAllowedTargetSelector = [
          "[data-chat-input]",
          "[data-business-chat-input]",
          "[data-item-product-chat-input]",
          ".feed-comment-form input",
          ".feed-comment-form textarea",
          ".feed-comment-reply-form input",
          ".feed-comment-reply-form textarea",
          ".item-product-comment-preview input",
          ".item-product-comment-preview textarea",
          ".item-product-comment-reply-form input",
          ".item-product-comment-reply-form textarea",
          ".clip-viewer-comment-form input",
          ".clip-viewer-comment-form textarea",
          ".clip-viewer-comment-reply-form input",
          ".clip-viewer-comment-reply-form textarea"
        ].join(",");
        const writable = (node) => {
          if (!node || node.disabled || node.readOnly) return null;
          if (!node.matches || !node.matches(emojiAllowedTargetSelector)) return null;
          if (node.isContentEditable) return node;
          const tag = String(node.tagName || "").toLowerCase();
          const type = String(node.getAttribute && node.getAttribute("type") || "text").toLowerCase();
          return tag === "textarea" || (tag === "input" && /^(text|search|email|tel|url)$/i.test(type)) ? node : null;
        };
        function ensure() {
          if (document.querySelector("[data-emy-emoji-root]")) return;
          const style = document.createElement("style");
          style.textContent = ".emy-emoji-trigger{position:fixed;z-index:380;width:28px;height:28px;border:1px solid rgba(0,27,71,.10);border-radius:999px;background:rgba(255,255,255,.96);color:#001b47;display:none;place-items:center;padding:0;cursor:pointer;box-shadow:0 5px 12px rgba(0,27,71,.08)}.emy-emoji-trigger.is-compact{width:24px;height:24px;border:0;background:transparent;color:#667085;box-shadow:none}.emy-emoji-trigger svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.emy-emoji-trigger.is-compact svg{width:15px;height:15px}.emy-emoji-trigger:hover,.emy-emoji-trigger.is-open{border-color:rgba(255,106,0,.34);background:#fff7f0;color:#e65f00}.emy-emoji-trigger.is-compact:hover,.emy-emoji-trigger.is-compact.is-open{background:transparent;color:#d85a00}.emy-emoji-panel{position:fixed;z-index:390;display:none;width:min(292px,calc(100vw - 20px));max-height:min(340px,calc(100dvh - 24px));overflow:hidden;border:1px solid rgba(0,27,71,.10);border-radius:14px;background:rgba(255,255,255,.99);box-shadow:0 16px 34px rgba(0,27,71,.16);backdrop-filter:blur(14px)}.emy-emoji-search{display:grid;grid-template-columns:18px minmax(0,1fr);gap:7px;align-items:center;margin:10px;border:1px solid rgba(0,27,71,.08);border-radius:999px;background:#f7f8fb;color:#667085;padding:0 10px;min-height:34px}.emy-emoji-search svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2}.emy-emoji-search input{min-width:0;border:0;background:transparent;outline:0;color:#001b47;font:inherit;font-size:13px;font-weight:560}.emy-emoji-scroll{max-height:230px;overflow:auto;padding:0 10px 10px}.emy-emoji-title{display:block;margin:9px 0 7px;color:#667085;font-size:11px;font-weight:850;text-transform:uppercase;letter-spacing:.02em}.emy-emoji-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}.emy-emoji-option{width:34px;height:32px;border:0;border-radius:9px;background:transparent;cursor:pointer;display:grid;place-items:center;font-size:21px;line-height:1}.emy-emoji-option:hover{background:#fff4e8}.emy-emoji-tabs{display:flex;gap:4px;overflow-x:auto;border-top:1px solid rgba(0,27,71,.07);padding:7px 8px;background:#fff}.emy-emoji-tab{min-width:32px;height:30px;border:0;border-radius:999px;background:transparent;color:#7a869e;cursor:pointer;font-size:15px;font-weight:800}.emy-emoji-tab.is-active{background:#fff4e8;color:#d85a00}@media(max-width:520px){.emy-emoji-panel{left:8px!important;right:8px!important;width:auto}.emy-emoji-option{width:33px;height:32px;font-size:20px}}";
          style.textContent += ".emy-emoji-trigger{width:24px;height:24px;border:0;background:rgba(255,255,255,.58);color:#4f5f7a;box-shadow:none;opacity:.82}.emy-emoji-trigger svg{width:14px;height:14px}.emy-emoji-trigger.is-compact{width:20px;height:20px;background:transparent;color:#7a869e;opacity:.72}.emy-emoji-trigger.is-compact svg{width:13px;height:13px}.emy-emoji-trigger:hover,.emy-emoji-trigger.is-open{background:rgba(255,244,232,.92);color:#d85a00;opacity:1}.emy-emoji-trigger.is-compact:hover,.emy-emoji-trigger.is-compact.is-open{background:rgba(255,244,232,.72);color:#d85a00}";
          const root = document.createElement("div");
          root.dataset.emyEmojiRoot = "true";
          root.innerHTML = '<button class="emy-emoji-trigger" type="button" tabindex="-1" data-emy-emoji-trigger aria-label="Add emoji" title="Add emoji"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8.8 9.3h.01M15.2 9.3h.01M8.6 14.1c1 1.2 2.1 1.8 3.4 1.8s2.4-.6 3.4-1.8"/></svg></button><section class="emy-emoji-panel" data-emy-emoji-panel aria-label="Emoji picker"><label class="emy-emoji-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg><input data-emy-emoji-search type="search" placeholder="Search emoji" aria-label="Search emoji"></label><div class="emy-emoji-scroll" data-emy-emoji-scroll></div><nav class="emy-emoji-tabs" data-emy-emoji-tabs aria-label="Emoji categories"></nav></section>';
          document.head.appendChild(style);
          document.body.appendChild(root);
          root.querySelector("[data-emy-emoji-trigger]").addEventListener("mousedown", (event) => event.preventDefault());
          root.querySelector("[data-emy-emoji-trigger]").addEventListener("click", togglePanel);
          root.querySelector("[data-emy-emoji-search]").addEventListener("input", (event) => { query = event.target.value.trim().toLowerCase(); render(); });
          root.querySelector("[data-emy-emoji-tabs]").addEventListener("click", (event) => {
            const tab = event.target.closest("[data-emoji-category]");
            if (!tab) return;
            active = tab.dataset.emojiCategory;
            query = "";
            root.querySelector("[data-emy-emoji-search]").value = "";
            render();
          });
          root.querySelector("[data-emy-emoji-scroll]").addEventListener("click", (event) => {
            const button = event.target.closest("[data-emoji]");
            if (button) insert(button.dataset.emoji || "");
          });
          root.addEventListener("mousedown", (event) => {
            if (!event.target.closest("[data-emy-emoji-search]")) event.preventDefault();
          });
        }
        const trigger = () => (ensure(), document.querySelector("[data-emy-emoji-trigger]"));
        const panel = () => (ensure(), document.querySelector("[data-emy-emoji-panel]"));
        function items() {
          const rec = recent();
          const all = groups.flatMap((group) => group[0] === "recent" ? rec : group[3]);
          if (query) return Array.from(new Set(Object.keys(aliases).filter((key) => key.includes(query)).flatMap((key) => aliases[key]).concat(all.filter((emoji) => emoji.includes(query)))));
          if (active === "recent") return rec.length ? rec : groups[1][3].slice(0, 14);
          return (groups.find((group) => group[0] === active) || groups[1])[3];
        }
        function render() {
          const root = document.querySelector("[data-emy-emoji-root]");
          if (!root) return;
          const label = query ? "Search" : (groups.find((group) => group[0] === active) || groups[0])[2];
          root.querySelector("[data-emy-emoji-scroll]").innerHTML = '<span class="emy-emoji-title">' + label + '</span><div class="emy-emoji-grid">' + items().map((emoji) => '<button class="emy-emoji-option" type="button" data-emoji="' + emoji + '" aria-label="Add emoji ' + emoji + '">' + emoji + '</button>').join("") + '</div>';
          root.querySelector("[data-emy-emoji-tabs]").innerHTML = groups.map((group) => '<button class="emy-emoji-tab' + (group[0] === active ? ' is-active' : '') + '" type="button" data-emoji-category="' + group[0] + '" aria-label="' + group[2] + '">' + group[1] + '</button>').join("");
        }
        function place() {
          if (!target) return;
          if (writable(target) !== target) {
            target = null;
            hideAll();
            return;
          }
          const rect = target.getBoundingClientRect();
          const button = trigger();
          const targetVisible = target.isConnected && rect.width > 0 && rect.height > 0 && rect.bottom > 4 && rect.top < window.innerHeight - 4 && rect.right > 4 && rect.left < window.innerWidth - 4;
          if (!targetVisible) {
            button.style.display = "none";
            if (panel().style.display === "block") panel().style.display = "none";
            button.classList.remove("is-open");
            return;
          }
          const compactForm = target.closest && target.closest(".feed-comment-form, .feed-comment-reply-form, .item-product-comment-preview, .item-product-comment-reply-form, .clip-viewer-comment-form, .clip-viewer-comment-reply-form");
          const size = compactForm ? 20 : 24;
          button.classList.toggle("is-compact", !!compactForm);
          button.style.display = "grid";
          if (compactForm) {
            const submit = compactForm.querySelector && compactForm.querySelector("button[type='submit']");
            const submitRect = submit ? submit.getBoundingClientRect() : null;
            const rightEdge = submitRect && submitRect.left > rect.left ? Math.min(rect.right, submitRect.left - 10) : rect.right;
            button.style.left = Math.max(rect.left + 8, Math.min(window.innerWidth - size - 8, rightEdge - size - 7)) + "px";
            button.style.top = Math.max(8, Math.min(window.innerHeight - size - 8, rect.top + (rect.height - size) / 2)) + "px";
            if (panel().style.display === "block") positionEmojiPanel();
            return;
          }
          button.style.left = Math.max(8, Math.min(window.innerWidth - size - 8, rect.right - size - 8)) + "px";
          button.style.top = Math.max(8, Math.min(window.innerHeight - size - 8, rect.bottom - size - 8)) + "px";
          if (panel().style.display === "block") positionEmojiPanel();
        }
        function positionEmojiPanel() {
          if (!target) return;
          const box = panel();
          const anchorNode = target.closest && target.closest(".feed-comment-form, .feed-comment-reply-form, .item-product-comment-preview, .item-product-comment-reply-form, .clip-viewer-comment-form, .clip-viewer-comment-reply-form") || target;
          const anchorRect = anchorNode.getBoundingClientRect();
          const wasVisible = box.style.visibility;
          if (box.style.display !== "block") box.style.display = "block";
          box.style.visibility = "hidden";
          const panelRect = box.getBoundingClientRect();
          const width = panelRect.width || Math.min(292, window.innerWidth - 20);
          const height = panelRect.height || Math.min(340, window.innerHeight - 24);
          const gap = 8;
          const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
          const maxLeft = Math.max(10, window.innerWidth - width - 10);
          const left = clamp(anchorRect.left, 10, maxLeft);
          const roomBelow = window.innerHeight - anchorRect.bottom - gap;
          const roomAbove = anchorRect.top - gap;
          let top = roomBelow >= height || roomBelow >= roomAbove ? anchorRect.bottom + gap : anchorRect.top - height - gap;
          top = clamp(top, 10, Math.max(10, window.innerHeight - height - 10));
          box.style.left = left + "px";
          box.style.top = top + "px";
          box.style.visibility = wasVisible || "";
        }
        function openPanel() {
          if (!target) return;
          const button = trigger();
          const box = panel();
          render();
          box.style.display = "block";
          positionEmojiPanel();
          button.classList.add("is-open");
          if (target && typeof target.focus === "function") target.focus({ preventScroll: true });
        }
        function togglePanel() {
          if (panel().style.display === "block") {
            panel().style.display = "none";
            trigger().classList.remove("is-open");
          } else openPanel();
        }
        function insert(emoji) {
          if (!emoji || !target) return;
          target.focus({ preventScroll: true });
          if (target.isContentEditable) document.execCommand("insertText", false, emoji);
          else if (typeof target.setRangeText === "function") {
            const start = target.selectionStart == null ? target.value.length : target.selectionStart;
            const end = target.selectionEnd == null ? start : target.selectionEnd;
            target.setRangeText(emoji, start, end, "end");
          } else target.value = String(target.value || "") + emoji;
          saveRecent(emoji);
          target.dispatchEvent(new Event("input", { bubbles: true }));
          target.dispatchEvent(new Event("change", { bubbles: true }));
          panel().style.display = "none";
          trigger().classList.remove("is-open");
          render();
          place();
        }
        function hideAll() {
          trigger().style.display = "none";
          trigger().classList.remove("is-open");
          panel().style.display = "none";
        }
        window.emyFocusEmojiTarget = (node) => {
          const next = writable(node);
          if (!next) return;
          clearTimeout(hideTimer);
          target = next;
          ensure();
          place();
          window.setTimeout(place, 0);
        };
        document.addEventListener("focusin", (event) => {
          const root = document.querySelector("[data-emy-emoji-root]");
          if (root && root.contains(event.target)) return;
          target = writable(event.target);
          if (target) { clearTimeout(hideTimer); ensure(); place(); window.setTimeout(place, 0); }
          else hideAll();
        }, true);
        document.addEventListener("click", (event) => {
          const root = document.querySelector("[data-emy-emoji-root]");
          if (root && root.contains(event.target)) return;
          const next = writable(event.target);
          if (next) { clearTimeout(hideTimer); target = next; ensure(); place(); }
          else hideAll();
        }, true);
        document.addEventListener("input", (event) => { if (event.target === target) place(); }, true);
        document.addEventListener("scroll", () => { if (target) place(); }, true);
        window.addEventListener("resize", () => { if (target) place(); });
        document.addEventListener("mousedown", (event) => {
          const root = document.querySelector("[data-emy-emoji-root]");
          if ((root && root.contains(event.target)) || writable(event.target)) {
            clearTimeout(hideTimer);
            return;
          }
          clearTimeout(hideTimer);
          hideTimer = setTimeout(hideAll, 120);
        }, true);
        document.addEventListener("keydown", (event) => { if (event.key === "Escape") hideAll(); }, true);
        ensure();
      })();
    </script>`;

const sharedEmyVideoControlsScript = String.raw`
    <script data-emy-video-controls-enhancer>
      (() => {
        if (window.emyVideoControlsEnhancerReady) return;
        window.emyVideoControlsEnhancerReady = true;
        const qualities = [
          ["q1080", "HD", "1080p", "HD"],
          ["q720", "720p", "720p", ""],
          ["q480", "480p", "480p", ""],
          ["q360", "360p", "360p", ""],
          ["q240", "240p", "240p", ""],
          ["q144", "144p", "144p", ""]
        ];
        const qualityValues = qualities.map((item) => item[0]);
        const lowQualityValues = ["q360", "q240", "q144"];
        let viewportRestartObserver = null;
        const css = [
          ".emy-video-player { container-type: inline-size; }",
          ".emy-video-player .emy-video-quality { display: none !important; }",
          ".emy-video-big-play { display: none !important; }",
          ".emy-video-player .emy-video-controls { max-width: calc(100% - 24px); overflow: visible; }",
          ".emy-video-player .emy-video-time { min-width: 54px; max-width: 58px; overflow: hidden; white-space: nowrap; font-size: 10.5px; text-overflow: clip; }",
          ".emy-video-player:not(.is-playing) .emy-video-controls { opacity: 1 !important; pointer-events: auto !important; transform: translateY(0) !important; }",
          ".feed-media-carousel .emy-video-player:not(.is-playing) .emy-video-controls, .feed-media-carousel .emy-video-player:not(.is-playing).is-controls-visible .emy-video-controls, .feed-media-carousel .emy-video-player:not(.is-playing):hover .emy-video-controls { opacity: 1 !important; pointer-events: auto !important; transform: translateY(0) !important; }",
          ".feed-media-carousel .emy-video-player:focus-within .emy-video-controls, .feed-media-carousel .emy-video-player.is-controls-visible .emy-video-controls, .feed-media-carousel .emy-video-player:hover .emy-video-controls { opacity: 1 !important; pointer-events: auto !important; transform: translateY(0) !important; }",
          ".feed-media-carousel .emy-video-player::after, .feed-media-carousel .emy-video-player:hover::after, .feed-media-carousel .emy-video-player.is-controls-visible::after { opacity: 1 !important; transition: opacity .16s ease !important; }",
          ".emy-video-player.is-quality-q1080 video { filter: contrast(1.08) saturate(1.12) brightness(1.02); }",
          ".emy-video-player.is-quality-q720 video { filter: contrast(1.03) saturate(1.04); }",
          ".emy-video-player.is-quality-q480 video { filter: contrast(.97) saturate(.95) blur(.15px); }",
          ".emy-video-player.is-quality-q360 video { filter: contrast(.92) saturate(.88) blur(.35px); }",
          ".emy-video-player.is-quality-q240 video { filter: contrast(.86) saturate(.80) blur(.65px); }",
          ".emy-video-player.is-quality-q144 video { filter: contrast(.78) saturate(.72) blur(1px); }",
          ".emy-video-quality-menu { position: relative; z-index: 8; display: inline-flex; align-items: center; }",
          ".emy-video-quality-button { min-width: 88px; height: 36px; display: inline-flex; align-items: center; justify-content: center; gap: 9px; border: 1px solid rgba(255,106,0,.88); border-radius: 999px; background: rgba(74,55,48,.84); color: #fff; cursor: pointer; padding: 0 12px 0 14px; font: inherit; font-size: 12px; line-height: 1; font-weight: 880; box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 10px 24px rgba(0,0,0,.18); }",
          ".emy-video-quality-button svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transition: transform .16s ease; }",
          ".emy-video-quality-menu.is-open .emy-video-quality-button svg { transform: rotate(180deg); }",
          ".emy-video-quality-options { position: absolute; right: 0; bottom: calc(100% + 8px); z-index: 10; width: 178px; overflow: hidden; border: 1px solid rgba(255,255,255,.14); border-radius: 12px; background: rgba(6,10,16,.88); color: #fff; box-shadow: 0 20px 44px rgba(0,0,0,.28); backdrop-filter: blur(14px) saturate(1.1); padding: 6px 0; }",
          ".emy-video-quality-options[hidden] { display: none !important; }",
          ".emy-video-quality-option { width: 100%; height: 40px; border: 0; border-radius: 0; background: transparent; color: inherit; cursor: pointer; display: flex; align-items: center; justify-content: flex-start; gap: 5px; padding: 0 14px; text-align: left; font: inherit; font-size: 15px; line-height: 1; font-weight: 760; }",
          ".emy-video-quality-option small { color: rgba(255,255,255,.55); font-size: 11px; font-weight: 860; }",
          ".emy-video-quality-option:hover, .emy-video-quality-option.is-active { background: rgba(255,255,255,.12); }",
          ".emy-video-volume-wrap { position: relative; z-index: 8; display: inline-flex; align-items: center; justify-content: center; --emy-video-volume: 1; padding: 6px; margin: -6px; }",
          ".emy-video-volume-wrap [data-emy-video-mute] { width: 36px; height: 36px; border: 1px solid rgba(255,106,0,.36); background: #ff6a00; color: #fff; box-shadow: 0 12px 24px rgba(255,106,0,.22); }",
          ".emy-video-volume-wrap [data-emy-video-mute]:hover { background: #ff7a1a; }",
          ".emy-video-player.is-muted .emy-video-volume-wrap [data-emy-video-mute] { background: rgba(255,106,0,.84); color: #fff; }",
          ".emy-video-volume-popover { position: absolute; left: 50%; bottom: calc(100% + 6px); z-index: 12; width: 52px; height: 152px; padding: 10px 0; transform: translateX(-50%); border: 1px solid rgba(255,255,255,.12); border-radius: 999px; background: rgba(5,10,16,.9); box-shadow: 0 20px 44px rgba(0,0,0,.28); backdrop-filter: blur(14px) saturate(1.08); pointer-events: auto; }",
          ".emy-video-volume-popover[hidden] { display: none !important; }",
          ".emy-video-volume-wrap.is-open .emy-video-volume-popover { display: block !important; }",
          ".emy-video-volume-track { position: absolute; left: 50%; top: 18px; bottom: 18px; width: 10px; transform: translateX(-50%); border-radius: 999px; background: rgba(255,255,255,.2); overflow: visible; pointer-events: none; }",
          ".emy-video-volume-fill { position: absolute; left: 0; right: 0; bottom: 0; height: calc(var(--emy-video-volume) * 100%); border-radius: 999px; background: linear-gradient(180deg, #3aa0ff, #1285ff); }",
          ".emy-video-volume-knob { position: absolute; left: 50%; bottom: calc(var(--emy-video-volume) * 100%); width: 18px; height: 18px; transform: translate(-50%, 50%); border-radius: 999px; background: #fff; box-shadow: 0 5px 14px rgba(0,0,0,.22); pointer-events: none; }",
          ".emy-video-volume-slider { position: absolute; left: 50%; top: 10px; z-index: 3; width: 52px; height: 132px; margin-left: -26px; opacity: 0.01; cursor: pointer; writing-mode: vertical-lr; direction: rtl; -webkit-appearance: slider-vertical; appearance: slider-vertical; }",
          "@container (max-width: 380px) { .emy-video-player .emy-video-quality-menu { display: none !important; } .emy-video-player .emy-video-controls { grid-template-columns: auto minmax(34px,1fr) auto auto auto; gap: 6px; padding: 7px; } .emy-video-player .emy-video-time { min-width: 46px; max-width: 46px; font-size: 10px; } }",
          "@container (max-width: 300px) { .emy-video-player .emy-video-time { display: none !important; } .emy-video-player .emy-video-controls { grid-template-columns: auto minmax(30px,1fr) auto auto; } }",
          "@container (max-width: 220px) { .emy-video-player .emy-video-progress { display: none !important; } .emy-video-player .emy-video-controls { left: 8px; right: 8px; grid-template-columns: auto auto auto; justify-content: end; background: transparent; border: 0; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; } }",
          "@media (max-width: 640px) { .emy-video-quality-menu { display: none !important; } .emy-video-volume-wrap [data-emy-video-mute] { width: 32px; height: 32px; } }"
        ].join("\n");
        function injectStyle() {
          if (document.querySelector("[data-emy-video-controls-style]")) return;
          const style = document.createElement("style");
          style.setAttribute("data-emy-video-controls-style", "true");
          style.textContent = css;
          document.head.appendChild(style);
        }
        function clampVolume(value) {
          const numeric = Number(value);
          if (!Number.isFinite(numeric)) return 1;
          return Math.max(0, Math.min(1, numeric));
        }
        function normaliseQuality(value) {
          const raw = String(value || "").toLowerCase();
          if (qualityValues.includes(raw)) return raw;
          if (raw === "hd" || raw === "1080" || raw === "1080p") return "q1080";
          if (raw === "720" || raw === "720p") return "q720";
          if (raw === "480" || raw === "480p") return "q480";
          if (raw === "data" || raw === "saver" || raw === "360" || raw === "360p") return "q360";
          if (raw === "240" || raw === "240p") return "q240";
          if (raw === "144" || raw === "144p") return "q144";
          return "q1080";
        }
        function qualityLabel(value) {
          const mode = normaliseQuality(value);
          const item = qualities.find((choice) => choice[0] === mode);
          return item ? item[1] : "HD";
        }
        function oldQualityValue(value) {
          const mode = normaliseQuality(value);
          if (mode === "q1080") return "hd";
          if (lowQualityValues.includes(mode)) return "data";
          return "auto";
        }
        function playerVideo(player) {
          return player && player.querySelector("video");
        }
        function mediaNodes(root) {
          const scope = root && root.nodeType === 1 ? root : document;
          const nodes = [];
          if (scope.matches && scope.matches("video,audio")) nodes.push(scope);
          if (scope.querySelectorAll) scope.querySelectorAll("video,audio").forEach((media) => nodes.push(media));
          return Array.from(new Set(nodes));
        }
        function markMediaPlayerStopped(media) {
          const player = media && media.closest && media.closest("[data-emy-video-player],.clip-viewer-frame,.clip-viewer-modal,[data-clip-viewer-modal],.item-detail-modal,[data-item-detail-modal],.feed-card,.reel-card");
          if (!player) return;
          player.classList.remove("is-playing", "is-controls-visible");
          player.classList.add("is-paused", "is-muted");
          if (player.dataset) {
            player.dataset.emyUserPaused = "true";
            player.dataset.emyViewportNeedsRestart = "true";
          }
          const playButton = player.querySelector("[data-emy-video-play],[data-clip-video-play]");
          if (playButton) playButton.setAttribute("aria-pressed", "false");
          const muteButton = player.querySelector("[data-emy-video-mute],[data-clip-video-mute]");
          if (muteButton) muteButton.setAttribute("aria-pressed", "true");
        }
        function stopMediaNode(media, reason) {
          if (!media || !/^(VIDEO|AUDIO)$/i.test(media.tagName || "")) return;
          try { media.pause(); } catch (error) {}
          try {
            media.muted = true;
            media.defaultMuted = true;
            media.setAttribute("muted", "");
          } catch (error) {}
          try { media.autoplay = false; media.removeAttribute("autoplay"); } catch (error) {}
          try {
            if (Number.isFinite(media.duration) || media.readyState >= 1) media.currentTime = 0;
            else media.addEventListener("loadedmetadata", () => { try { media.currentTime = 0; } catch (error) {} }, { once: true });
          } catch (error) {}
          if (/^(pagehide|beforeunload|removed)$/i.test(String(reason || ""))) {
            try {
              const stream = media.srcObject;
              if (stream && typeof stream.getTracks === "function") stream.getTracks().forEach((track) => track.stop());
            } catch (error) {}
          }
          if (media.dataset) media.dataset.emyStoppedReason = String(reason || "stopped");
          markMediaPlayerStopped(media);
        }
        function hardStopMedia(root, reason) {
          mediaNodes(root).forEach((media) => stopMediaNode(media, reason));
          closeQualityMenus();
          closeVolumePopovers();
        }
        function shouldStopMediaFromClick(target) {
          if (!target || !target.closest) return false;
          const closeTarget = target.closest("[data-clip-viewer-close],.clip-viewer-close,[data-item-detail-close],.item-detail-close,[data-item-detail-done],.item-detail-done,.modal-close,[data-modal-close]");
          if (closeTarget) return true;
          const controlTarget = target.closest(".emy-video-controls,.emy-video-quality-menu,.emy-video-volume-wrap,[data-emy-video-play],[data-emy-video-mute],[data-clip-video-play],[data-clip-video-mute],[data-clip-video-volume],.clip-viewer-control,.clip-viewer-play,.clip-viewer-volume,.clip-viewer-more-menu");
          if (controlTarget) return false;
          const button = target.closest("button,[role='button']");
          if (button) {
            if (button.matches("[data-nav],[data-back],[data-view-all],[data-search-tab],[data-public-tab],[data-owner-tab]")) return true;
            const label = String(button.getAttribute("aria-label") || button.textContent || "").trim().toLowerCase();
            if (/(^|\s)(close|back|exit|done|cancel)(\s|$)/.test(label) && button.closest(".clip-viewer-modal,[data-clip-viewer-modal],.item-detail-modal,[data-item-detail-modal],.profile-photo-overlay,.search-modal")) return true;
          }
          const link = target.closest("a[href]");
          if (!link) return false;
          const href = String(link.getAttribute("href") || "").trim();
          if (!href || href.charAt(0) === "#" || /^javascript:|^mailto:|^tel:/i.test(href)) return false;
          return true;
        }
        function resetPlayerVideoToStart(video) {
          if (!video) return;
          const seek = () => {
            try { video.currentTime = 0; } catch (error) {}
          };
          if (video.readyState >= 1 || Number.isFinite(video.duration)) seek();
          else video.addEventListener("loadedmetadata", seek, { once: true });
        }
        function shouldViewportAutoplay(player, video) {
          if (!player || !video) return false;
          if (document.hidden) return false;
          if (player.dataset.emyUserPaused === "true") return false;
          if (player.classList.contains("is-expanded-fullscreen")) return false;
          return true;
        }
        function pausePlayerForViewport(player, video) {
          if (!player || !video) return;
          try { video.pause(); } catch (error) {}
          player.classList.remove("is-playing", "is-controls-visible");
          player.dataset.emyViewportNeedsRestart = "true";
          resetPlayerVideoToStart(video);
        }
        function playPlayerFromViewportStart(player, video) {
          if (!shouldViewportAutoplay(player, video)) return;
          player.dataset.emyViewportNeedsRestart = "false";
          try {
            video.muted = true;
            video.defaultMuted = true;
            video.setAttribute("muted", "");
            video.setAttribute("playsinline", "");
          } catch (error) {}
          resetPlayerVideoToStart(video);
          if (window.emyPauseOtherMedia) window.emyPauseOtherMedia(video);
          const playPromise = video.play();
          if (playPromise && typeof playPromise.then === "function") {
            playPromise.then(() => {
              player.classList.add("is-playing");
            }).catch(() => {
              player.classList.remove("is-playing");
            });
          } else {
            player.classList.add("is-playing");
          }
        }
        function enhanceViewportRestart(player) {
          if (!player || player.closest("[data-feed-media-carousel]") || player.dataset.emyViewportRestartBound === "true" || !("IntersectionObserver" in window)) return;
          const video = playerVideo(player);
          if (!video) return;
          player.dataset.emyViewportRestartBound = "true";
          if (!player.dataset.emyViewportNeedsRestart) player.dataset.emyViewportNeedsRestart = "true";
          if (!viewportRestartObserver) {
            viewportRestartObserver = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                const player = entry.target;
                const video = playerVideo(player);
                if (!video) return;
                const visible = entry.isIntersecting && entry.intersectionRatio >= 0.55;
                if (!visible) {
                  if (!video.paused || (Number(video.currentTime) || 0) > 0.04) pausePlayerForViewport(player, video);
                  else player.dataset.emyViewportNeedsRestart = "true";
                  return;
                }
                if (player.dataset.emyViewportNeedsRestart === "true" || video.paused || video.ended) {
                  playPlayerFromViewportStart(player, video);
                }
              });
            }, { threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] });
          }
          viewportRestartObserver.observe(player);
        }
        function setQuality(player, value, silent) {
          const video = playerVideo(player);
          const mode = normaliseQuality(value);
          player.dataset.emyEnhancedQuality = mode;
          player.dataset.quality = mode;
          qualityValues.forEach((choice) => player.classList.remove("is-quality-" + choice));
          player.classList.add("is-quality-" + mode);
          if (video) {
            video.dataset.emyQualityResolution = mode;
            video.preload = lowQualityValues.includes(mode) ? "metadata" : "auto";
            video.setAttribute("preload", video.preload);
          }
          const select = player.querySelector("select[data-emy-video-quality]");
          if (select) select.value = oldQualityValue(mode);
          const label = player.querySelector("[data-emy-video-quality-label]");
          if (label) label.textContent = qualityLabel(mode);
          player.querySelectorAll("[data-emy-video-quality-value]").forEach((button) => {
            const active = normaliseQuality(button.dataset.emyVideoQualityValue) === mode;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", active ? "true" : "false");
          });
          if (!silent) {
            try { localStorage.setItem("emyVideoQualityResolution", mode); } catch (error) {}
          }
        }
        function closeQualityMenus(except) {
          document.querySelectorAll(".emy-video-quality-menu.is-open").forEach((menu) => {
            if (menu !== except) {
              menu.classList.remove("is-open");
              const options = menu.querySelector("[data-emy-video-quality-options]");
              const button = menu.querySelector("[data-emy-video-quality-button]");
              if (options) options.hidden = true;
              if (button) button.setAttribute("aria-expanded", "false");
            }
          });
        }
        function enhanceQuality(player) {
          const select = player.querySelector("select[data-emy-video-quality]");
          if (!select || player.querySelector("[data-emy-video-quality-enhanced]")) return;
          select.hidden = true;
          select.tabIndex = -1;
          const menu = document.createElement("span");
          menu.className = "emy-video-quality-menu";
          menu.setAttribute("data-emy-video-quality-enhanced", "true");
          menu.innerHTML =
            '<button class="emy-video-quality-button" type="button" data-emy-video-quality-button aria-haspopup="listbox" aria-expanded="false"><span data-emy-video-quality-label>HD</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>' +
            '<span class="emy-video-quality-options" data-emy-video-quality-options role="listbox" hidden>' +
              qualities.map((item) => '<button class="emy-video-quality-option" type="button" role="option" data-emy-video-quality-value="' + item[0] + '">' + item[2] + (item[3] ? ' <small>' + item[3] + '</small>' : '') + '</button>').join("") +
            '</span>';
          select.insertAdjacentElement("afterend", menu);
          const button = menu.querySelector("[data-emy-video-quality-button]");
          const options = menu.querySelector("[data-emy-video-quality-options]");
          button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            const open = !menu.classList.contains("is-open");
            closeQualityMenus(open ? menu : null);
            menu.classList.toggle("is-open", open);
            options.hidden = !open;
            button.setAttribute("aria-expanded", open ? "true" : "false");
          });
          menu.querySelectorAll("[data-emy-video-quality-value]").forEach((option) => {
            option.addEventListener("click", (event) => {
              event.preventDefault();
              event.stopPropagation();
              setQuality(player, option.dataset.emyVideoQualityValue, false);
              closeQualityMenus();
            });
          });
          const saved = (() => { try { return localStorage.getItem("emyVideoQualityResolution"); } catch (error) { return ""; } })();
          setQuality(player, saved || select.value || player.dataset.quality || "q1080", true);
        }
        function updateVolumeUi(player) {
          const video = playerVideo(player);
          if (!video) return;
          const slider = player.querySelector("[data-emy-video-volume]");
          const volume = video.muted ? 0 : clampVolume(video.volume);
          const wrap = player.querySelector("[data-emy-video-volume-enhanced]");
          if (wrap) wrap.style.setProperty("--emy-video-volume", String(volume));
          if (slider && Math.abs(Number(slider.value) - volume) > 0.005) slider.value = String(volume);
        }
        function closeVolumePopovers(except) {
          document.querySelectorAll(".emy-video-volume-wrap.is-open").forEach((wrap) => {
            if (wrap !== except) {
              wrap.classList.remove("is-open");
              const popover = wrap.querySelector("[data-emy-video-volume-popover]");
              if (popover) popover.hidden = true;
            }
          });
        }
        function enhanceVolume(player) {
          const mute = player.querySelector("[data-emy-video-mute]");
          const video = playerVideo(player);
          if (!mute || !video || mute.closest("[data-emy-video-volume-enhanced]")) return;
          const wrap = document.createElement("span");
          wrap.className = "emy-video-volume-wrap";
          wrap.setAttribute("data-emy-video-volume-enhanced", "true");
          mute.parentNode.insertBefore(wrap, mute);
          wrap.appendChild(mute);
          wrap.insertAdjacentHTML("beforeend",
            '<span class="emy-video-volume-popover" data-emy-video-volume-popover hidden>' +
              '<span class="emy-video-volume-track" aria-hidden="true"><span class="emy-video-volume-fill"></span><span class="emy-video-volume-knob"></span></span>' +
              '<input class="emy-video-volume-slider" type="range" min="0" max="1" step="0.01" value="1" data-emy-video-volume aria-label="Video volume" />' +
            '</span>');
          const popover = wrap.querySelector("[data-emy-video-volume-popover]");
          const slider = wrap.querySelector("[data-emy-video-volume]");
          let closeTimer = 0;
          const setOpen = (open) => {
            closeVolumePopovers(open ? wrap : null);
            wrap.classList.toggle("is-open", !!open);
            popover.hidden = !open;
          };
          const cancelClose = () => {
            if (closeTimer) {
              window.clearTimeout(closeTimer);
              closeTimer = 0;
            }
          };
          const scheduleClose = () => {
            cancelClose();
            closeTimer = window.setTimeout(() => {
              closeTimer = 0;
              if (!wrap.matches(":hover") && !wrap.contains(document.activeElement)) setOpen(false);
            }, 1400);
          };
          ["pointerdown", "mousedown", "touchstart", "click"].forEach((type) => {
            wrap.addEventListener(type, (event) => event.stopPropagation(), { passive: true });
          });
          wrap.addEventListener("mouseenter", () => {
            cancelClose();
            setOpen(true);
          });
          wrap.addEventListener("mouseleave", scheduleClose);
          wrap.addEventListener("focusin", () => {
            cancelClose();
            setOpen(true);
          });
          wrap.addEventListener("focusout", scheduleClose);
          popover.addEventListener("mouseenter", cancelClose);
          popover.addEventListener("mouseleave", scheduleClose);
          slider.addEventListener("pointerdown", cancelClose);
          slider.addEventListener("pointerup", scheduleClose);
          mute.addEventListener("click", () => {
            window.setTimeout(() => {
              updateVolumeUi(player);
              cancelClose();
              setOpen(true);
            }, 0);
          });
          slider.addEventListener("input", (event) => {
            event.stopPropagation();
            const value = clampVolume(slider.value);
            try { video.volume = value; } catch (error) {}
            video.muted = value <= 0;
            player.dataset.emyLastVolume = String(value || 1);
            updateVolumeUi(player);
          });
          video.addEventListener("volumechange", () => updateVolumeUi(player));
          updateVolumeUi(player);
        }
        function isFeedCardVideoPlayer(player) {
          return !!(player && player.closest && player.closest(".feed-media, .social-feed-media, .home-created-media, .feed-media-carousel, .feed-post-media"));
        }
        function enhanceDirectPlayback(player) {
          if (!player || player.dataset.emyDirectPlaybackBound === "true") return;
          if (isFeedCardVideoPlayer(player)) return;
          player.dataset.emyDirectPlaybackBound = "true";
          const sync = () => {
            const video = playerVideo(player);
            if (video) player.classList.toggle("is-playing", !video.paused && !video.ended);
          };
          const toggle = (event) => {
            if (event && event.target && event.target.closest && event.target.closest(".emy-video-controls, .emy-video-quality-menu, .emy-video-volume-wrap")) return;
            const video = playerVideo(player);
            if (!video) return;
            if (event) {
              event.preventDefault();
              event.stopPropagation();
              if (event.stopImmediatePropagation) event.stopImmediatePropagation();
            }
            try { video.controls = false; video.removeAttribute("controls"); } catch (error) {}
            if (video.paused || video.ended) {
              player.dataset.emyUserPaused = "false";
              player.dataset.emyViewportNeedsRestart = "false";
              if (window.emyPauseOtherMedia) window.emyPauseOtherMedia(video);
              const playPromise = video.play();
              if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(() => {
                  const error = player.querySelector("[data-emy-video-error]");
                  if (error) {
                    error.textContent = "This video cannot play in this browser. Try MP4/H.264 or record it again.";
                    error.hidden = false;
                  }
                });
              }
            } else {
              player.dataset.emyUserPaused = "true";
              video.pause();
            }
            sync();
          };
          const surface = player.querySelector("[data-emy-video-open]");
          if (surface) surface.addEventListener("click", toggle, true);
          player.querySelectorAll("[data-emy-video-play]").forEach((button) => {
            button.addEventListener("click", () => {
              const video = playerVideo(player);
              if (!video) return;
              const willPlay = video.paused || video.ended;
              player.dataset.emyUserPaused = willPlay ? "false" : "true";
              if (willPlay) player.dataset.emyViewportNeedsRestart = "false";
            }, true);
          });
          const video = playerVideo(player);
          if (video) {
            video.controls = false;
            video.removeAttribute("controls");
            ["play", "pause", "ended"].forEach((type) => video.addEventListener(type, sync));
          }
        }
        function enhance(root) {
          injectStyle();
          const scope = root && root.nodeType === 1 ? root : document;
          const players = [];
          if (scope.matches && scope.matches("[data-emy-video-player]")) players.push(scope);
          scope.querySelectorAll && scope.querySelectorAll("[data-emy-video-player]").forEach((player) => players.push(player));
          players.forEach((player) => {
            player.querySelectorAll(".emy-video-big-play").forEach((node) => node.remove());
            const video = playerVideo(player);
            if (video) {
              video.controls = false;
              video.removeAttribute("controls");
            }
            enhanceQuality(player);
            enhanceVolume(player);
            enhanceDirectPlayback(player);
            enhanceViewportRestart(player);
          });
        }
        document.addEventListener("click", (event) => {
          if (shouldStopMediaFromClick(event.target)) hardStopMedia(document, "click");
          if (!event.target.closest(".emy-video-quality-menu")) closeQualityMenus();
          if (!event.target.closest(".emy-video-volume-wrap")) closeVolumePopovers();
        }, true);
        window.emyStopAllMedia = hardStopMedia;
        window.addEventListener("pagehide", () => hardStopMedia(document, "pagehide"), true);
        window.addEventListener("beforeunload", () => hardStopMedia(document, "beforeunload"), true);
        window.addEventListener("hashchange", () => hardStopMedia(document, "hashchange"), true);
        window.addEventListener("popstate", () => hardStopMedia(document, "popstate"), true);
        document.addEventListener("visibilitychange", () => {
          if (document.hidden) hardStopMedia(document, "hidden");
        }, true);
        window.emyEnhanceVideoControls = enhance;
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => enhance(document), { once: true });
        else enhance(document);
        const pendingVideoRoots = new Set();
        let videoEnhanceScheduled = false;
        function nodeHasVideoPlayer(node) {
          return !!(node && node.nodeType === 1 && ((node.matches && node.matches("[data-emy-video-player]")) || (node.querySelector && node.querySelector("[data-emy-video-player]"))));
        }
        function nodeHasMedia(node) {
          return !!(node && node.nodeType === 1 && ((node.matches && node.matches("video,audio,[data-emy-video-player],.clip-viewer-frame,.clip-viewer-modal,[data-clip-viewer-modal]")) || (node.querySelector && node.querySelector("video,audio,[data-emy-video-player],.clip-viewer-frame,.clip-viewer-modal,[data-clip-viewer-modal]"))));
        }
        function scheduleVideoEnhance(root) {
          if (root && root.nodeType === 1) pendingVideoRoots.add(root);
          if (videoEnhanceScheduled) return;
          videoEnhanceScheduled = true;
          window.requestAnimationFrame(() => {
            videoEnhanceScheduled = false;
            const roots = Array.from(pendingVideoRoots);
            pendingVideoRoots.clear();
            if (!roots.length) return;
            if (roots.length > 16) {
              enhance(document);
              return;
            }
            roots.forEach(enhance);
          });
        }
        new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.removedNodes.forEach((node) => {
              if (nodeHasMedia(node)) hardStopMedia(node, "removed");
            });
            mutation.addedNodes.forEach((node) => {
              if (nodeHasVideoPlayer(node)) scheduleVideoEnhance(node);
            });
          });
        }).observe(document.documentElement, { childList: true, subtree: true });
      })();
    </script>`;

const sharedEmyEventSystemScript = String.raw`
    <script data-emy-event-system>
      (() => {
        if (window.emyEventSystemReady) return;
        window.emyEventSystemReady = true;
        window.emyEventCoverEnhancerReady = true;
        const miniCoverState = new WeakMap();
        const miniCoverRefState = new WeakMap();
        const miniCoverSettingsState = new WeakMap();
        let pendingMiniEventCover = null;
        let pendingBusinessEventCover = "";
        let pendingBusinessEventCoverRef = "";
        const css = [
          ".feed-event-preview{position:relative;overflow:hidden}",
          ".feed-event-preview::after{content:\"\";position:absolute;inset:0;z-index:1;display:none;background:linear-gradient(180deg,rgba(0,27,71,.04),rgba(0,27,71,.58));pointer-events:none}",
          ".feed-event-preview.has-cover::after{display:block}",
          ".feed-event-preview>img[data-feed-event-cover-image]{position:absolute;inset:0;z-index:0;width:100%;height:100%;object-fit:cover;display:block}",
          ".feed-event-preview>img[data-feed-event-cover-image][hidden]{display:none!important}",
          ".feed-event-preview-badge,.feed-event-preview strong,.feed-event-preview small{position:relative;z-index:2}",
          ".feed-event-preview.has-cover strong,.feed-event-preview.has-cover small{color:#fff!important;text-shadow:0 1px 12px rgba(0,27,71,.48)}",
          ".feed-event-cover-tools{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 8px}",
          ".feed-event-cover-tools button{min-height:34px;border:1px solid rgba(0,27,71,.10);border-radius:999px;background:rgba(255,255,255,.80);color:#001b47;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:0 12px;font:inherit;font-size:12px;line-height:1;font-weight:820}",
          ".feed-event-cover-tools button:hover{border-color:rgba(255,106,0,.28);background:#fff4e8;color:#ff6a00}",
          ".feed-event-cover-tools button svg{width:15px;height:15px;stroke-width:2.1}",
          ".feed-event-post:not(.has-cover) .feed-event-post-hero{position:relative;overflow:hidden;min-height:136px;background:linear-gradient(135deg,#fffaf5 0%,#f4f7fb 54%,#eef3f8 100%)}",
          ".feed-event-post.has-cover .feed-event-post-hero{position:relative;isolation:isolate;overflow:hidden;min-height:176px;background-color:#001b47!important;background-size:cover;background-position:center}",
          ".feed-event-card-cover-image,.feed-event-post-hero img[data-emy-event-card-cover],.feed-event-post-hero video[data-emy-event-card-cover]{position:absolute;inset:0;z-index:0;width:100%;height:100%;object-fit:cover;display:block}",
          ".social-feed-event-card .cover-label,.social-feed-event-card .cover-mini-action,.social-feed-event-card .crop-trigger,.social-feed-event-card [data-cover-label],.social-feed-event-card [data-cover-play],.social-feed-event-card [data-adjust-cover],.social-feed-event-card [data-remove-cover],.feed-card.is-event .cover-label,.feed-card.is-event .cover-mini-action,.feed-card.is-event .crop-trigger{display:none!important}",
          ".feed-event-post.has-cover .feed-event-post-hero::after{content:\"\";position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(0,27,71,.04) 0%,rgba(0,27,71,.16) 46%,rgba(0,27,71,.66) 100%);pointer-events:none}",
          ".feed-event-post.has-cover .feed-event-post-hero span,.feed-event-post.has-cover .feed-event-post-hero strong{position:relative;z-index:2;color:#fff!important;text-shadow:0 1px 14px rgba(0,27,71,.48)}",
          ".feed-event-post.has-cover .feed-event-post-hero span{background:rgba(255,255,255,.22)!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.36)!important}",
          ".emy-event-cover-repair{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:3;min-height:38px;border:1px solid rgba(255,106,0,.28);border-radius:999px;background:#fff;color:#ff6a00;cursor:pointer;padding:0 16px;font:inherit;font-size:12px;font-weight:880;box-shadow:0 12px 28px rgba(0,27,71,.14)}",
          ".emy-event-cover-repair:hover{background:#fff4e8;border-color:rgba(255,106,0,.40)}",
          ".feed-event-post.has-cover .emy-event-cover-repair{display:none!important}",
          ".content-tile.is-event-tile .tile-media.has-cover{position:relative;overflow:hidden;background-size:cover;background-position:center}",
          ".content-tile.is-event-tile .tile-media.has-cover::after{content:\"\";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,27,71,.05),rgba(0,27,71,.62));pointer-events:none}",
          ".content-tile.is-event-tile .tile-media.has-cover span,.content-tile.is-event-tile .tile-media.has-cover strong{position:relative;z-index:1;color:#fff!important;text-shadow:0 1px 12px rgba(0,27,71,.50)}",
          ".content-tile.is-event-tile .tile-media.has-cover span{background:rgba(255,255,255,.20)!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.36)!important}"
        ].join("\n");
        function injectStyle() {
          if (document.querySelector("[data-emy-event-system-style]")) return;
          document.querySelectorAll("[data-emy-event-cover-style]").forEach((node) => node.remove());
          const style = document.createElement("style");
          style.setAttribute("data-emy-event-system-style", "true");
          style.textContent = css;
          document.head.appendChild(style);
        }
        function cleanText(value) {
          return String(value || "").replace(/\s+/g, " ").trim();
        }
        function cleanMultilineText(value) {
          return String(value || "")
            .replace(/\r\n?/g, "\n")
            .replace(/[ \t]+\n/g, "\n")
            .replace(/\n[ \t]+/g, "\n")
            .replace(/\n{3,}/g, "\n\n")
            .trim();
        }
        function readLocalJson(key, fallback) {
          try {
            const parsed = JSON.parse(localStorage.getItem(key) || "null");
            return parsed && typeof parsed === "object" ? parsed : fallback;
          } catch (error) {
            return fallback;
          }
        }
        function slugText(value, fallback) {
          const slug = cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          return slug || fallback || "business";
        }
        function businessProfileName() {
          const draft = readLocalJson("emyBusinessProfileDraft", {});
          const field = document.querySelector("[data-business-name]");
          return cleanText((draft && (draft.businessName || draft.name || draft.title)) || (field && field.value) || localStorage.getItem("emyMainPendingSignupBusinessName") || localStorage.getItem("emyMainPendingSignupFirstName") || "My Business");
        }
        function businessRepairCustomerMediaSet() {
          return new Set([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef")
          ].map((value) => String(value || "").trim()).filter(Boolean));
        }
        function firstBusinessRepairMedia(values) {
          const customerMedia = businessRepairCustomerMediaSet();
          return (Array.isArray(values) ? values : []).map((value) => String(value || "").trim()).find((value) => value && !customerMedia.has(value)) || "";
        }
        function businessProfilePhoto() {
          const draft = readLocalJson("emyBusinessProfileDraft", {});
          return firstBusinessRepairMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), draft && draft.profilePhoto, draft && draft.profilePhotoSrc, draft && draft.photo, draft && draft.photoSrc]);
        }
        function businessProfilePhotoRef() {
          const draft = readLocalJson("emyBusinessProfileDraft", {});
          return firstBusinessRepairMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), draft && draft.profilePhotoRef, draft && draft.photoRef]);
        }
        function eventCoverRepairRole() {
          const mode = cleanText(new URLSearchParams(window.location.search || "").get("mode")).toLowerCase();
          const signed = cleanText(localStorage.getItem("emyMainSignedInRole")).toLowerCase();
          const pending = cleanText(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase();
          if (mode === "business" || signed === "business" || pending === "business") return "business";
          if (mode === "customer" || signed === "customer" || pending === "customer") return "customer";
          return "";
        }
        function eventCoverRepairKey(value) {
          return cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        }
        function currentBusinessEventKeys() {
          const draft = readLocalJson("emyBusinessProfileDraft", {});
          const values = [
            draft && draft.businessKey,
            draft && draft.key,
            draft && draft.slug,
            draft && draft.businessName,
            draft && draft.name,
            localStorage.getItem("emyBusinessProfileKey"),
            localStorage.getItem("emyBusinessKey"),
            localStorage.getItem("emyBusinessDisplayName"),
            localStorage.getItem("emyBusinessName"),
            localStorage.getItem("emyMainPendingSignupBusinessName"),
            businessProfileName()
          ];
          return new Set(values.map(eventCoverRepairKey).filter(Boolean));
        }
        function eventCoverRepairAllowed(card, item) {
          if (eventCoverRepairRole() !== "business") return false;
          const data = card && card.dataset ? card.dataset : {};
          const owner = cleanText([
            item && (item.owner || item.actorType || item.accountType || item.createdAs || item.authorRole),
            data.owner,
            data.actorType,
            data.repostActorType
          ].filter(Boolean).join(" ")).toLowerCase();
          const href = cleanText(item && (item.profileHref || item.href) || data.profileHref || "").toLowerCase();
          if (owner.indexOf("customer") >= 0 || href.indexOf("emy-customer-profile") >= 0) return false;
          const keys = currentBusinessEventKeys();
          if (!keys.size) return false;
          const generic = { business: true, "business-profile": true, profile: true, "my-business": true };
          const candidates = [
            item && item.businessKey,
            item && item.key,
            item && item.ownerKey,
            item && item.profileKey,
            item && item.detailBusinessKey,
            item && item.business,
            item && item.businessName,
            item && item.actor,
            data.businessKey,
            data.detailBusinessKey,
            data.ownerKey,
            data.detailBusiness
          ].map(eventCoverRepairKey).filter(Boolean);
          return candidates.some((key) => !generic[key] && keys.has(key));
        }
        function selectedBusinessEventType() {
          const selected = document.querySelector("[data-event-type]:checked");
          return cleanText(selected && selected.value) || "In person";
        }
        function formatEventDate(value) {
          if (!value) return "";
          const date = new Date(value + "T00:00:00");
          if (Number.isNaN(date.getTime())) return "";
          return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
        }
        function formatEventTime(value) {
          if (!value) return "";
          const parts = String(value).split(":");
          const date = new Date();
          date.setHours(Number(parts[0]) || 0, Number(parts[1]) || 0, 0, 0);
          return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
        }
        function businessEventWhenText() {
          const dateInput = document.querySelector("[data-event-start-date]");
          const timeInput = document.querySelector("[data-event-start-time]");
          const dateText = formatEventDate(dateInput && dateInput.value);
          const timeText = formatEventTime(timeInput && timeInput.value);
          if (dateText && timeText) return dateText + " at " + timeText;
          return dateText || timeText || "Date to confirm";
        }
        function businessEventWhereText() {
          const linkInput = document.querySelector("[data-event-link]");
          const link = cleanText(linkInput && linkInput.value);
          return link || (selectedBusinessEventType() === "Online" ? "Online" : "Location to confirm");
        }
        function businessEventPayload() {
          const nameInput = document.querySelector("[data-event-name]");
          const descriptionInput = document.querySelector("[data-event-description]");
          const dateInput = document.querySelector("[data-event-start-date]");
          const timeInput = document.querySelector("[data-event-start-time]");
          const title = cleanText(nameInput && nameInput.value) || "Business event";
          const business = businessProfileName();
          const eventDate = dateInput && dateInput.value || "";
          const eventTime = timeInput && timeInput.value || "";
          const eventWhere = businessEventWhereText();
          const eventId = "business-event-" + slugText([business, title, eventDate, eventTime, eventWhere].filter(Boolean).join("-"), "event");
          const createdAt = new Date().toISOString();
          return {
            id: eventId,
            kind: "event",
            createType: "event",
            tag: "Event",
            business,
            actor: business,
            businessKey: slugText(business, "business"),
            avatarSrc: businessProfilePhoto(),
            avatarRef: businessProfilePhotoRef(),
            title,
            text: cleanMultilineText(descriptionInput && descriptionInput.value) || "Event details will be shared soon.",
            createdAt,
            postedAt: createdAt,
            updatedAt: createdAt,
            time: "Just now",
            source: "business-dashboard",
            createdFrom: "business-dashboard",
            origin: "business-dashboard",
            owner: "business",
            createdAs: "business",
            accountType: "business",
            actorType: "business",
            role: "business",
            authorRole: "business",
            key: slugText(business, "business"),
            profileKey: slugText(business, "business"),
            businessName: business,
            name: business,
            author: business,
            profileHref: "emy-business-profile.html?business=" + encodeURIComponent(slugText(business, "business")),
            my: false,
            isUserPost: false,
            eventType: selectedBusinessEventType(),
            eventWhen: businessEventWhenText(),
            eventWhere,
            eventDate,
            eventTime,
            coverSrc: pendingBusinessEventCoverRef ? "" : (pendingBusinessEventCover || ""),
            eventCoverSrc: pendingBusinessEventCoverRef ? "" : (pendingBusinessEventCover || ""),
            coverRef: pendingBusinessEventCoverRef || "",
            eventCoverRef: pendingBusinessEventCoverRef || "",
            stats: "0 likes",
            comments: []
          };
        }
        function imageFileToDataUrl(file) {
          return new Promise((resolve) => {
            if (!file || !String(file.type || "").toLowerCase().startsWith("image/") || !window.FileReader) {
              resolve("");
              return;
            }
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              const raw = String(reader.result || "");
              if (!raw) {
                resolve("");
                return;
              }
              const image = new Image();
              image.addEventListener("load", () => {
                try {
                  const width = image.naturalWidth || image.width || 0;
                  const height = image.naturalHeight || image.height || 0;
                  const max = 1200;
                  const scale = Math.min(1, max / Math.max(width, height, 1));
                  if (scale >= 0.999 && raw.length < 650000) {
                    resolve(raw);
                    return;
                  }
                  const canvas = document.createElement("canvas");
                  canvas.width = Math.max(1, Math.round(width * scale));
                  canvas.height = Math.max(1, Math.round(height * scale));
                  const context = canvas.getContext("2d");
                  context.drawImage(image, 0, 0, canvas.width, canvas.height);
                  resolve(canvas.toDataURL("image/jpeg", 0.82));
                } catch (error) {
                  resolve(raw);
                }
              }, { once: true });
              image.addEventListener("error", () => resolve(raw), { once: true });
              image.src = raw;
            }, { once: true });
            reader.addEventListener("error", () => resolve(""), { once: true });
            reader.readAsDataURL(file);
          });
        }
        function storeEventCoverFile(file) {
          const uploadMedia = window.emyPrepareFeedMediaUpload;
          if (!uploadMedia || !file) return Promise.resolve({ src: "", ref: "" });
          return Promise.resolve(uploadMedia(file, {
            type: "image",
            name: file.name || "event-cover",
            kind: "event-cover",
            role: cleanText(localStorage.getItem("emyMainSignedInRole") || localStorage.getItem("emyMainPendingSignupRole") || "customer") || "customer",
            allowBrowserFallback: false
          })).then((record) => ({
            src: record && (record.src || record.url || "") || "",
            ref: record && (record.ref || record.id || "") || ""
          })).catch(() => ({
            src: "",
            ref: ""
          }));
        }
        function dataUrlToBlob(dataUrl) {
          const value = String(dataUrl || "");
          if (!/^data:[^,]+,/i.test(value)) return Promise.resolve(null);
          if (window.fetch) {
            return fetch(value).then((response) => response.blob()).catch(() => null);
          }
          try {
            const parts = value.split(",");
            const meta = parts[0] || "";
            const mime = (meta.match(/^data:([^;]+)/i) || [])[1] || "application/octet-stream";
            const binary = atob(parts.slice(1).join(","));
            const bytes = new Uint8Array(binary.length);
            for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
            return Promise.resolve(new Blob([bytes], { type: mime }));
          } catch (error) {
            return Promise.resolve(null);
          }
        }
        function blobToDataUrlForRepair(blob) {
          return new Promise((resolve) => {
            if (!blob || !window.FileReader) {
              resolve("");
              return;
            }
            const reader = new FileReader();
            reader.addEventListener("load", () => resolve(String(reader.result || "")), { once: true });
            reader.addEventListener("error", () => resolve(""), { once: true });
            reader.readAsDataURL(blob);
          });
        }
        function migrateInlineMediaValue(dataUrl, name, type) {
          if (!window.emyPrepareFeedMediaUpload || !String(dataUrl || "").startsWith("data:")) return Promise.resolve({ src: "", ref: "" });
          return dataUrlToBlob(dataUrl).then((blob) => {
            if (!blob) return { src: "", ref: "" };
            const mediaType = type || (String(blob.type || "").startsWith("video/") ? "video" : "image");
            return window.emyPrepareFeedMediaUpload(blob, {
              type: mediaType,
              name: name || "saved-media",
              kind: "event-storage-repair",
              role: cleanText(localStorage.getItem("emyMainSignedInRole") || localStorage.getItem("emyMainPendingSignupRole") || "customer") || "customer",
              allowBrowserFallback: false
            }).then((record) => ({
              src: record && (record.src || record.url || "") || "",
              ref: record && (record.ref || record.id || "") || ""
            })).catch(() => ({ src: "", ref: "" }));
          });
        }
        function knownProfileMediaSourcesForRepair(item) {
          const row = item && typeof item === "object" ? item : {};
          const draft = readLocalJson("emyBusinessProfileDraft", {});
          return [
            localStorage.getItem("emyBusinessProfilePhoto"),
            localStorage.getItem("emyBusinessProfileImage"),
            localStorage.getItem("emyBusinessPhoto"),
            localStorage.getItem("emyBusinessAvatar"),
            localStorage.getItem("emyBusinessLogo"),
            localStorage.getItem("emyMainPendingSignupBusinessPhoto"),
            draft && draft.photo,
            draft && draft.profilePhoto,
            draft && draft.businessPhoto,
            draft && draft.avatar,
            draft && draft.avatarSrc,
            draft && draft.logo,
            draft && draft.image,
            row.avatarSrc,
            row.avatar,
            row.profilePhoto,
            row.businessPhoto,
            row.ownerPhoto,
            row.logo
          ].map(cleanText).filter(Boolean);
        }
        function isProfileMediaSourceForRepair(value, item) {
          const src = cleanText(value);
          return !!(src && knownProfileMediaSourcesForRepair(item).includes(src));
        }
        function hasProfileDataSourceForRepair(item) {
          return knownProfileMediaSourcesForRepair(item).some((src) => /^data:/i.test(src));
        }
        function canonicalProfileDataSourcesForRepair(item) {
          const sources = knownProfileMediaSourcesForRepair(item).filter((src) => /^data:/i.test(src));
          if (!sources.length) return Promise.resolve([]);
          return Promise.all(sources.map((src) => dataUrlToBlob(src).then(blobToDataUrlForRepair).catch(() => "")))
            .then((canonical) => sources.concat(canonical).map(cleanText).filter(Boolean));
        }
        function storedMediaRefIsProfileSourceForRepair(ref, item) {
          const cleanRef = cleanText(ref);
          if (!cleanRef || !window.emyResolveFeedMedia || !hasProfileDataSourceForRepair(item)) return Promise.resolve(false);
          return window.emyResolveFeedMedia(cleanRef)
            .then((record) => blobToDataUrlForRepair(record && record.blob))
            .then((src) => canonicalProfileDataSourcesForRepair(item).then((sources) => sources.includes(cleanText(src))))
            .catch(() => false);
        }
        function clearProfileContentMediaForRepair(item, fields) {
          const next = Object.assign({}, item || {});
          (fields || ["media"]).forEach((field) => {
            if (field === "event") {
              next.coverSrc = "";
              next.eventCoverSrc = "";
              next.coverRef = "";
              next.eventCoverRef = "";
              next.coverType = "";
              next.eventCoverType = "";
            } else if (field === "job") {
              next.coverSrc = "";
              next.jobCoverSrc = "";
              next.coverRef = "";
              next.jobCoverRef = "";
              next.coverType = "";
              next.jobCoverType = "";
            }
          });
          next.mediaSrc = "";
          next.mediaRef = "";
          next.image = "";
          next.imageRef = "";
          next.video = "";
          next.videoRef = "";
          next.mediaType = "";
          if (Array.isArray(next.mediaItems)) next.mediaItems = [];
          return next;
        }
        function readStorageArray(key) {
          try {
            const parsed = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(parsed) ? parsed : [];
          } catch (error) {
            return [];
          }
        }
        function writeStorageArray(key, items, limit) {
          try {
            localStorage.setItem(key, JSON.stringify((items || []).slice(0, limit || 60)));
            return true;
          } catch (error) {
            return false;
          }
        }
        function repairOldEventStorage() {
          if (window.emyEventStorageRepairRunning) return;
          window.emyEventStorageRepairRunning = true;
          try { localStorage.removeItem("emyPendingEventCoverSrc"); } catch (error) {}
          try { localStorage.removeItem("emyFeedEventCoverDraft"); } catch (error) {}
          const eventItems = readStorageArray("emyFeedCreatedEvents");
          const eventJobs = eventItems.map((item) => {
            if (!item || typeof item !== "object") return Promise.resolve(item);
            if (item.coverRef || item.eventCoverRef) {
              return storedMediaRefIsProfileSourceForRepair(item.coverRef || item.eventCoverRef, item).then((match) => match ? clearProfileContentMediaForRepair(item, ["event"]) : item);
            }
            const src = item.coverSrc || item.eventCoverSrc || "";
            if (!String(src).startsWith("data:")) return Promise.resolve(item);
            if (isProfileMediaSourceForRepair(src, item)) return Promise.resolve(clearProfileContentMediaForRepair(item, ["event"]));
            return migrateInlineMediaValue(src, "event-cover", "image").then((media) => (media && (media.src || media.ref)) ? Object.assign({}, item, eventCoverStoragePatch(media.ref ? "" : media.src, media.ref)) : item);
          });
          const postItems = readStorageArray("emyFeedCreatedPosts");
          const postJobs = postItems.map((item) => {
            if (!item || typeof item !== "object") return Promise.resolve(item);
            if (item.mediaRef || item.imageRef || item.videoRef) {
              return storedMediaRefIsProfileSourceForRepair(item.mediaRef || item.imageRef || item.videoRef, item).then((match) => match ? clearProfileContentMediaForRepair(item, ["media"]) : item);
            }
            const src = item.mediaSrc || item.image || item.video || "";
            if (!String(src).startsWith("data:")) return Promise.resolve(item);
            if (isProfileMediaSourceForRepair(src, item)) return Promise.resolve(clearProfileContentMediaForRepair(item, ["media"]));
            const mediaType = item.mediaType || (String(src).startsWith("data:video/") ? "video" : "image");
            return migrateInlineMediaValue(src, "feed-media", mediaType).then((media) => {
              if (!media || !(media.src || media.ref)) return item;
              const next = Object.assign({}, item, { mediaRef: media.ref || "", mediaType });
              next.mediaSrc = media.ref ? "" : media.src;
              if (mediaType === "image") next.image = media.ref ? "" : media.src;
              if (mediaType === "video") next.video = media.ref ? "" : media.src;
              return next;
            });
          });
          const jobItems = readStorageArray("emyFeedCreatedJobs");
          const coverJobs = jobItems.map((item) => {
            if (!item || typeof item !== "object") return Promise.resolve(item);
            if (item.coverRef || item.jobCoverRef || item.mediaRef || item.imageRef || item.videoRef) {
              return storedMediaRefIsProfileSourceForRepair(item.coverRef || item.jobCoverRef || item.mediaRef || item.imageRef || item.videoRef, item).then((match) => match ? clearProfileContentMediaForRepair(item, ["job"]) : item);
            }
            const src = item.coverSrc || item.jobCoverSrc || item.mediaSrc || item.image || item.video || "";
            if (!String(src).startsWith("data:")) return Promise.resolve(item);
            if (isProfileMediaSourceForRepair(src, item)) return Promise.resolve(clearProfileContentMediaForRepair(item, ["job"]));
            const mediaType = item.coverType || item.jobCoverType || item.mediaType || (String(src).startsWith("data:video/") ? "video" : "image");
            return migrateInlineMediaValue(src, "job-cover", mediaType).then((media) => (media && (media.src || media.ref)) ? Object.assign({}, item, jobCoverStoragePatch(media.ref ? "" : media.src, media.ref, mediaType, item.coverSettings || item.mediaSettings)) : item);
          });
          Promise.all(eventJobs.concat(postJobs).concat(coverJobs)).then((items) => {
            const nextEvents = items.slice(0, eventJobs.length);
            const nextPosts = items.slice(eventJobs.length, eventJobs.length + postJobs.length);
            const nextJobs = items.slice(eventJobs.length + postJobs.length);
            if (nextEvents.length) writeStorageArray("emyFeedCreatedEvents", nextEvents, 60);
            if (nextPosts.length) writeStorageArray("emyFeedCreatedPosts", nextPosts, 80);
            if (nextJobs.length) writeStorageArray("emyFeedCreatedJobs", nextJobs, 60);
            applyEventCoversFromStorage();
            if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(document);
            window.dispatchEvent(new CustomEvent("emy:created-posts-changed", { detail: { repaired: true } }));
            window.dispatchEvent(new CustomEvent("emy:created-events-changed", { detail: { repaired: true } }));
            window.dispatchEvent(new CustomEvent("emy:created-jobs-changed", { detail: { repaired: true } }));
          }).finally(() => {
            window.emyEventStorageRepairRunning = false;
          });
        }
        function cssUrl(value) {
          return String(value || "").replace(/[\\\"\n\r]/g, "\\$&");
        }
        function eventCoverDefaultSettings() {
          const base = window.emyDefaultMediaEditSettings ? window.emyDefaultMediaEditSettings("image") : { fit:"cover", zoom:1, x:0, y:0, aspect:"16 / 9", overlay:"" };
          return Object.assign({}, base, { fit:"cover", aspect:"16 / 9" });
        }
        function applyMiniCoverSettings(sheet) {
          const parts = miniCoverParts(sheet);
          if (!parts.preview || !window.emyApplyMediaEditPreview) return;
          window.emyApplyMediaEditPreview(parts.preview, miniCoverSettingsState.get(sheet) || eventCoverDefaultSettings());
        }
        function applyCoverSettingsToNode(node, settings) {
          if (!node) return;
          const next = Object.assign(eventCoverDefaultSettings(), settings || {});
          node.style.setProperty("--media-fit", next.fit || "cover");
          node.style.setProperty("--media-zoom", String(Number(next.zoom) || 1));
          node.style.setProperty("--media-x", (Number(next.x) || 0) + "%");
          node.style.setProperty("--media-y", (Number(next.y) || 0) + "%");
          const image = node.querySelector("img[data-emy-event-card-cover]");
          if (image) {
            image.style.objectFit = next.fit || "cover";
            image.style.transform = "translate(" + (Number(next.x) || 0) + "%, " + (Number(next.y) || 0) + "%) scale(" + (Number(next.zoom) || 1) + ")";
            image.style.transformOrigin = "center";
          }
        }
        function eventCoverUrlFromHero(hero) {
          if (!hero) return "";
          const existing = hero.querySelector("img[data-emy-event-card-cover]");
          if (existing && existing.getAttribute("src")) return existing.getAttribute("src");
          const bg = hero.style.backgroundImage || "";
          const matches = bg.match(/url\((['"]?)(.*?)\1\)/g) || [];
          if (!matches.length) return "";
          const last = matches[matches.length - 1].match(/url\((['"]?)(.*?)\1\)/);
          return last && last[2] ? last[2] : "";
        }
        function ensureEventCoverImage(hero, src, ref) {
          if (!hero || (!src && !ref)) return;
          let image = hero.querySelector("img[data-emy-event-card-cover]");
          if (!image) {
            image = document.createElement("img");
            image.className = "feed-event-card-cover-image";
            image.setAttribute("data-emy-event-card-cover", "");
            image.alt = "";
            hero.insertBefore(image, hero.firstChild);
          }
          if (ref) image.setAttribute("data-emy-media-ref", ref);
          if (src && image.getAttribute("src") !== src) image.src = src;
          image.hidden = false;
        }
        function miniSheetFromNode(node) {
          return node && node.closest ? node.closest("[data-feed-event-sheet]") : null;
        }
        function miniCoverParts(sheet) {
          if (!sheet) return {};
          return {
            preview: sheet.querySelector("[data-feed-event-preview], .feed-event-preview"),
            image: sheet.querySelector("[data-feed-event-cover-image]"),
            button: sheet.querySelector("[data-feed-event-cover]"),
            edit: sheet.querySelector("[data-feed-event-cover-edit]"),
            remove: sheet.querySelector("[data-feed-event-cover-remove]"),
            file: sheet.querySelector("[data-feed-event-cover-file]")
          };
        }
        function setMiniCover(sheet, src, ref) {
          if (!sheet) return;
          const parts = miniCoverParts(sheet);
          const clean = String(src || "");
          const cleanRef = String(ref || "");
          const hasCover = !!(clean || cleanRef);
          miniCoverState.set(sheet, clean);
          miniCoverRefState.set(sheet, cleanRef);
          if (parts.preview) parts.preview.classList.toggle("has-cover", hasCover);
          if (parts.image) {
            parts.image.hidden = !hasCover;
            parts.image.removeAttribute("src");
            parts.image.removeAttribute("data-emy-media-ref");
            delete parts.image.dataset.emyMediaHydrating;
            delete parts.image.dataset.emyMediaHydrated;
            if (cleanRef) parts.image.setAttribute("data-emy-media-ref", cleanRef);
            if (clean) parts.image.src = clean;
          }
          if (hasCover) applyMiniCoverSettings(sheet);
          if (hasCover && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(parts.preview || parts.image || sheet);
          if (parts.button) {
            const label = parts.button.querySelector("span");
            if (label) label.textContent = hasCover ? "Change cover" : "Add cover image";
          }
          if (parts.edit) parts.edit.hidden = !hasCover;
          if (parts.remove) parts.remove.hidden = !hasCover;
          try {
            if (cleanRef) localStorage.setItem("emyPendingEventCoverRef", cleanRef);
            else localStorage.removeItem("emyPendingEventCoverRef");
            if (clean && !/^(data:|blob:)/i.test(clean) && clean.length < 120000) localStorage.setItem("emyPendingEventCoverSrc", clean);
            else localStorage.removeItem("emyPendingEventCoverSrc");
            if (hasCover) localStorage.setItem("emyPendingEventCoverSettings", JSON.stringify(miniCoverSettingsState.get(sheet) || eventCoverDefaultSettings()));
            else localStorage.removeItem("emyPendingEventCoverSettings");
          } catch (error) {}
        }
        function clearMiniCover(sheet) {
          const parts = miniCoverParts(sheet);
          if (parts.file) parts.file.value = "";
          if (sheet) miniCoverSettingsState.set(sheet, eventCoverDefaultSettings());
          setMiniCover(sheet, "", "");
        }
        function closeBusinessEventComposer(sheet) {
          const target = sheet || document.querySelector("[data-event-compose-sheet].is-open") || document.querySelector("[data-event-compose-sheet]");
          if (!target) return;
          target.classList.remove("is-open");
          target.setAttribute("aria-hidden", "true");
        }
        function clearBusinessEventComposer(sheet) {
          const target = sheet || document.querySelector("[data-event-compose-sheet]");
          if (!target) return;
          const form = target.querySelector("[data-event-compose-form]");
          if (form && typeof form.reset === "function") form.reset();
          const upload = target.querySelector("[data-event-cover-upload]");
          if (upload) {
            upload.classList.remove("has-image");
            upload.style.backgroundImage = "";
          }
          const file = target.querySelector("[data-event-cover-input]");
          if (file) {
            try { file.value = ""; } catch (error) {}
          }
          const previewType = target.querySelector("[data-event-preview-type]");
          const previewTitle = target.querySelector("[data-event-preview-title]");
          const previewMeta = target.querySelector("[data-event-preview-meta]");
          if (previewType) previewType.textContent = "Business event";
          if (previewTitle) previewTitle.textContent = "What is the event?";
          if (previewMeta) previewMeta.textContent = "Date, time, and place will appear on the event card.";
          const submit = target.querySelector("[data-event-next]");
          if (submit) {
            submit.disabled = true;
            submit.classList.remove("is-ready");
          }
          pendingBusinessEventCover = "";
          pendingBusinessEventCoverRef = "";
          try {
            localStorage.removeItem("emyPendingBusinessEventCoverSrc");
            localStorage.removeItem("emyPendingBusinessEventCoverRef");
            localStorage.removeItem("emyPendingEventCoverSrc");
            localStorage.removeItem("emyPendingEventCoverRef");
            localStorage.removeItem("emyPendingEventCoverSettings");
          } catch (error) {}
        }
        function scrubPublishedEventEditorUi(root) {
          const scope = root && root.nodeType === 1 ? root : document;
          const cards = [];
          const cardSelector = ".social-feed-event-card,.feed-card.is-event,.home-created-card.is-event,.content-tile.is-event-tile";
          const editorSelector = "[data-cover-label],[data-cover-play],[data-adjust-cover],[data-remove-cover],.cover-label,.cover-mini-action,.crop-trigger";
          if (scope.matches && scope.matches(cardSelector)) cards.push(scope);
          scope.querySelectorAll && scope.querySelectorAll(cardSelector).forEach((card) => cards.push(card));
          cards.forEach((card) => {
            card.querySelectorAll(editorSelector).forEach((node) => node.remove());
          });
        }
        function openMiniCoverEditor(sheet) {
          if (!sheet || !window.emyOpenMediaEditor) return;
          const parts = miniCoverParts(sheet);
          const imageSrc = parts.image ? (parts.image.currentSrc || parts.image.src || parts.image.getAttribute("src") || "") : "";
          const ref = miniCoverRefState.get(sheet) || parts.image && parts.image.dataset && parts.image.dataset.emyMediaRef || "";
          const openWithSrc = (src) => {
            const cleanSrc = String(src || "");
            if (!cleanSrc) {
              if (typeof showToast === "function") showToast("Hold on while EMY loads this event cover.");
              if (ref && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(parts.preview || parts.image || sheet);
              return;
            }
            miniCoverState.set(sheet, cleanSrc);
            if (ref) miniCoverRefState.set(sheet, ref);
            window.emyOpenMediaEditor({
              src: cleanSrc,
              type: "image",
              settings: miniCoverSettingsState.get(sheet) || eventCoverDefaultSettings(),
              applyLabel: "Apply cover",
              hidePostButton: true,
              onApply: (settings) => {
                miniCoverSettingsState.set(sheet, Object.assign(eventCoverDefaultSettings(), settings || {}));
                applyMiniCoverSettings(sheet);
                try { localStorage.setItem("emyPendingEventCoverSettings", JSON.stringify(miniCoverSettingsState.get(sheet))); } catch (error) {}
              }
            });
          };
          const src = miniCoverState.get(sheet) || imageSrc;
          if (src) {
            openWithSrc(src);
            return;
          }
          if (ref && window.emyResolveFeedMedia) {
            if (typeof showToast === "function") showToast("Loading event cover...");
            window.emyResolveFeedMedia(ref).then((record) => {
              const resolvedSrc = record && (record.url || record.src) || "";
              if (resolvedSrc) {
                setMiniCover(sheet, resolvedSrc, ref);
                openWithSrc(resolvedSrc);
              } else {
                openWithSrc("");
              }
            }).catch(() => openWithSrc(""));
            return;
          }
          openWithSrc("");
        }
        function ensureMiniEventCoverUi(sheet) {
          if (!sheet || sheet.dataset.emyEventCoverUi === "ready") return;
          const preview = sheet.querySelector("[data-feed-event-preview], .feed-event-preview");
          if (!preview) return;
          if (!preview.hasAttribute("data-feed-event-preview")) preview.setAttribute("data-feed-event-preview", "");
          if (!sheet.querySelector("[data-feed-event-cover-image]")) {
            preview.insertAdjacentHTML("afterbegin", '<img data-feed-event-cover-image hidden alt="" />');
          }
          if (!sheet.querySelector("[data-feed-event-cover]")) {
            preview.insertAdjacentHTML("afterend",
              '<div class="feed-event-cover-tools">' +
                '<button type="button" data-feed-event-cover><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 6.5h14v11H5v-11Zm3 8 3-3 2 2 2.5-3 3.5 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.5 9.5h.01" stroke="currentColor" stroke-linecap="round" stroke-width="2.5"/></svg><span>Add cover image</span></button>' +
                '<button type="button" data-feed-event-cover-edit hidden>Edit cover</button>' +
                '<button type="button" data-feed-event-cover-remove hidden>Remove cover</button>' +
                '<input type="file" accept="image/*" data-feed-event-cover-file hidden />' +
              '</div>');
          }
          sheet.dataset.emyEventCoverUi = "ready";
        }
        window.emySetEventComposerCover = function setEventComposerCover(sheet, src, ref, settings) {
          const targetSheet = sheet || document.querySelector("[data-feed-event-sheet].is-open") || document.querySelector("[data-feed-event-sheet]");
          if (!targetSheet) return false;
          ensureMiniEventCoverUi(targetSheet);
          if (settings) miniCoverSettingsState.set(targetSheet, Object.assign(eventCoverDefaultSettings(), settings || {}));
          setMiniCover(targetSheet, src, ref);
          if (!src && ref && window.emyResolveFeedMedia) {
            window.emyResolveFeedMedia(ref).then((record) => {
              const resolvedSrc = record && (record.url || record.src) || "";
              if (resolvedSrc) setMiniCover(targetSheet, resolvedSrc, ref);
            }).catch(() => {});
          }
          return true;
        };
        function enhanceMiniEventSheets(root) {
          const scope = root && root.nodeType === 1 ? root : document;
          const sheets = [];
          if (scope.matches && scope.matches("[data-feed-event-sheet]")) sheets.push(scope);
          scope.querySelectorAll && scope.querySelectorAll("[data-feed-event-sheet]").forEach((sheet) => sheets.push(sheet));
          sheets.forEach(ensureMiniEventCoverUi);
        }
        function readCreatedEvents() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyFeedCreatedEvents") || "[]");
            return Array.isArray(parsed) ? parsed : [];
          } catch (error) {
            return [];
          }
        }
        function eventStorageIsQuotaError(error) {
          return !!error && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED" || String(error.message || "").toLowerCase().includes("quota"));
        }
        function compactEventPayload(item) {
          if (!item || typeof item !== "object") return item;
          const next = Object.assign({}, item);
          if (next.coverRef || next.eventCoverRef) {
            next.coverSrc = "";
            next.eventCoverSrc = "";
          } else {
            ["coverSrc", "eventCoverSrc"].forEach((key) => {
              if (typeof next[key] === "string" && next[key].length > 180000) next[key] = "";
            });
          }
          return next;
        }
        function compactEventStorageForWrite() {
          try { localStorage.removeItem("emyPendingEventCoverSrc"); } catch (error) {}
          ["emyFeedCreatedEvents", "emyFeedCreatedPosts", "emyBusinessFeedPosts"].forEach((key) => {
            try {
              const parsed = JSON.parse(localStorage.getItem(key) || "[]");
              if (!Array.isArray(parsed)) return;
              const next = parsed.slice(0, key === "emyFeedCreatedEvents" ? 30 : 40).map((item) => {
                if (key === "emyFeedCreatedEvents") return compactEventPayload(item);
                if (!item || typeof item !== "object") return item;
                const clean = Object.assign({}, item);
                ["mediaSrc", "image", "video"].forEach((field) => {
                  if (typeof clean[field] === "string" && clean[field].length > 220000 && clean.mediaRef) clean[field] = "";
                });
                return clean;
              });
              localStorage.setItem(key, JSON.stringify(next));
            } catch (error) {}
          });
        }
        function writeCreatedEvents(items) {
          const compactItems = (items || []).map(compactEventPayload);
          try {
            localStorage.setItem("emyFeedCreatedEvents", JSON.stringify(compactItems));
            return true;
          } catch (error) {
            if (!eventStorageIsQuotaError(error)) return false;
          }
          compactEventStorageForWrite();
          try {
            localStorage.setItem("emyFeedCreatedEvents", JSON.stringify(compactItems.slice(0, 20)));
            return true;
          } catch (error) {
            if (typeof showToast === "function") showToast("EMY could not save this event yet because browser storage is full.");
            return false;
          }
        }
        function eventKeyFromCard(card) {
          const data = card && card.dataset ? card.dataset : {};
          return {
            id: cleanText(data.feedId),
            title: cleanText(data.detailTitle || (card && card.querySelector(".feed-event-post-hero strong") && card.querySelector(".feed-event-post-hero strong").textContent))
          };
        }
        function findCreatedEventIndex(events, key) {
          if (!Array.isArray(events) || !key) return -1;
          if (key.id) {
            const byId = events.findIndex((item) => cleanText(item && item.id) === key.id);
            if (byId >= 0) return byId;
          }
          if (key.title) return events.findIndex((item) => cleanText(item && item.title) === key.title);
          return -1;
        }
        function ensureRepairInput() {
          let input = document.querySelector("[data-emy-event-cover-repair-input]");
          if (input) return input;
          input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.hidden = true;
          input.setAttribute("data-emy-event-cover-repair-input", "true");
          document.body.appendChild(input);
          input.addEventListener("change", () => {
            const file = input.files && input.files[0];
            const key = input._emyEventCoverRepairKey || null;
            input.value = "";
            input._emyEventCoverRepairKey = null;
            if (!file || !key) return;
            storeEventCoverFile(file).then(({ src, ref }) => {
              if (!(src || ref)) return;
              const events = readCreatedEvents();
              const index = findCreatedEventIndex(events, key);
              if (index < 0 || !events[index]) {
                if (typeof showToast === "function") showToast("I could not find that event to update.");
                return;
              }
              events[index] = Object.assign({}, events[index], eventCoverStoragePatch(src, ref));
              if (writeCreatedEvents(events)) {
                window.dispatchEvent(new CustomEvent("emy:created-events-changed", { detail: { id: events[index].id || key.id || "" } }));
                if (typeof showToast === "function") showToast("Event cover updated.");
              }
              applyEventCoversFromStorage();
              enhanceEventCoverRepair(document);
            });
          });
          return input;
        }
        function enhanceEventCoverRepair(root) {
          const scope = root && root.nodeType === 1 ? root : document;
          scope.querySelectorAll && scope.querySelectorAll("[data-emy-event-cover-repair]").forEach((button) => {
            const card = button.closest(".social-feed-event-card[data-feed-id]");
            if (!eventCoverRepairAllowed(card, null)) button.remove();
          });
          if (eventCoverRepairRole() !== "business") return;
          const events = readCreatedEvents();
          if (!events.length) return;
          const cards = [];
          if (scope.matches && scope.matches(".social-feed-event-card[data-feed-id]")) cards.push(scope);
          scope.querySelectorAll && scope.querySelectorAll(".social-feed-event-card[data-feed-id]").forEach((card) => cards.push(card));
          cards.forEach((card) => {
            const post = card.querySelector(".feed-event-post");
            const hero = card.querySelector(".feed-event-post-hero");
            if (!post || !hero || post.classList.contains("has-cover")) return;
            const key = eventKeyFromCard(card);
            const index = findCreatedEventIndex(events, key);
            if (index < 0) return;
            const item = events[index] || {};
            if (!eventCoverRepairAllowed(card, item)) {
              hero.querySelectorAll("[data-emy-event-cover-repair]").forEach((button) => button.remove());
              return;
            }
            if (item.coverSrc || item.eventCoverSrc || item.coverRef || item.eventCoverRef || hero.querySelector("[data-emy-event-cover-repair]")) return;
            hero.style.position = hero.style.position || "relative";
            hero.insertAdjacentHTML("beforeend", '<button class="emy-event-cover-repair" type="button" data-emy-event-cover-repair>Add cover image</button>');
          });
        }
        function eventCoverStoragePatch(src, ref, settings) {
          const cleanRef = cleanText(ref);
          const cleanSrc = String(src || "");
          const coverSettings = settings ? Object.assign(eventCoverDefaultSettings(), settings || {}) : null;
          return {
            coverSrc: cleanRef ? "" : cleanSrc,
            eventCoverSrc: cleanRef ? "" : cleanSrc,
            coverRef: cleanRef,
            eventCoverRef: cleanRef,
            coverSettings,
            eventCoverSettings: coverSettings
          };
        }
        function jobCoverStoragePatch(src, ref, type, settings) {
          const cleanRef = cleanText(ref);
          const cleanSrc = String(src || "");
          const mediaType = cleanText(type) || (cleanSrc || cleanRef ? "image" : "");
          const coverSettings = settings ? Object.assign({}, settings || {}) : null;
          return {
            coverSrc: cleanRef ? "" : cleanSrc,
            jobCoverSrc: cleanRef ? "" : cleanSrc,
            mediaSrc: cleanRef ? "" : cleanSrc,
            image: mediaType === "image" && !cleanRef ? cleanSrc : "",
            video: mediaType === "video" && !cleanRef ? cleanSrc : "",
            coverRef: cleanRef,
            jobCoverRef: cleanRef,
            mediaRef: cleanRef,
            coverType: mediaType,
            jobCoverType: mediaType,
            mediaType,
            coverSettings,
            mediaSettings: coverSettings
          };
        }
        function pendingMiniCoverSrc() {
          if (pendingMiniEventCover && pendingMiniEventCover.src) return pendingMiniEventCover.src;
          try { return localStorage.getItem("emyPendingEventCoverSrc") || ""; } catch (error) { return ""; }
        }
        function pendingMiniCoverRef(sheet) {
          if (pendingMiniEventCover && pendingMiniEventCover.ref) return pendingMiniEventCover.ref;
          const stateRef = sheet ? miniCoverRefState.get(sheet) : "";
          if (stateRef) return stateRef;
          try { return localStorage.getItem("emyPendingEventCoverRef") || ""; } catch (error) { return ""; }
        }
        function miniEventActorName() {
          const first = cleanText(localStorage.getItem("emyCustomerFirstName") || localStorage.getItem("emyMainPendingSignupFirstName"));
          const last = cleanText(localStorage.getItem("emyCustomerLastName") || localStorage.getItem("emyMainPendingSignupLastName"));
          return cleanText(localStorage.getItem("emyCustomerDisplayName")) || cleanText(first + " " + last) || businessProfileName() || "Stephane";
        }
        function miniEventDateText(value) {
          if (!value) return "";
          const date = new Date(value + "T00:00:00");
          if (Number.isNaN(date.getTime())) return "";
          return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
        }
        function miniEventTimeText(value) {
          if (!value) return "";
          const parts = String(value).split(":");
          const date = new Date();
          date.setHours(Number(parts[0]) || 0, Number(parts[1]) || 0, 0, 0);
          return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
        }
        function miniEventPayload(sheet, src, ref) {
          const titleNode = sheet && sheet.querySelector("[data-feed-event-name]");
          const descriptionNode = sheet && sheet.querySelector("[data-feed-event-description]");
          const linkNode = sheet && sheet.querySelector("[data-feed-event-link]");
          const dateNode = sheet && sheet.querySelector("[data-feed-event-start-date]");
          const timeNode = sheet && sheet.querySelector("[data-feed-event-start-time]");
          const typeNode = sheet && sheet.querySelector("[data-feed-event-type]:checked");
          const title = cleanText(titleNode && titleNode.value) || "New event";
          const eventType = cleanText(typeNode && typeNode.value) || "In person";
          const dateText = miniEventDateText(dateNode && dateNode.value);
          const timeText = miniEventTimeText(timeNode && timeNode.value);
          const actor = miniEventActorName();
          return Object.assign({
            id: "feed-create-" + Date.now(),
            kind: "event",
            createType: "event",
            tag: "Event",
            actor,
            business: actor,
            businessKey: "customer-profile",
            avatarSrc: businessProfilePhoto(),
            avatarRef: businessProfilePhotoRef(),
            title,
            text: cleanMultilineText(descriptionNode && descriptionNode.value) || "Event details will be shared soon.",
            eventType,
            eventWhen: dateText && timeText ? dateText + " at " + timeText : (dateText || timeText || "Date to confirm"),
            eventWhere: cleanText(linkNode && linkNode.value) || (eventType === "Online" ? "Online" : "Location to confirm"),
            eventDate: dateNode && dateNode.value || "",
            eventTime: timeNode && timeNode.value || "",
            stats: "0 likes",
            comments: []
          }, eventCoverStoragePatch(src, ref, sheet ? miniCoverSettingsState.get(sheet) : null));
        }
        function clickAfterCoverLoads(button, sheet) {
          if (!button || button.dataset.emyEventCoverRetrying === "true") return false;
          const parts = miniCoverParts(sheet);
          const file = parts.file && parts.file.files && parts.file.files[0];
          if (!file) return false;
          if ((sheet ? miniCoverState.get(sheet) : "") || pendingMiniCoverSrc() || pendingMiniCoverRef(sheet)) return false;
          button.dataset.emyEventCoverRetrying = "true";
          if (typeof showToast === "function") showToast("Adding the event cover...");
          storeEventCoverFile(file).then(({ src, ref }) => {
            if (src) {
              setMiniCover(sheet, src, ref);
              pendingMiniEventCover = { src, ref, settings: sheet ? miniCoverSettingsState.get(sheet) : null, title: sheet && sheet.querySelector("[data-feed-event-name]") ? sheet.querySelector("[data-feed-event-name]").value : "", payload: miniEventPayload(sheet, src, ref) };
            }
            window.setTimeout(() => {
              delete button.dataset.emyEventCoverRetrying;
              button.click();
            }, 40);
          }).catch(() => {
            delete button.dataset.emyEventCoverRetrying;
          });
          return true;
        }
        function fillLatestEventFromPendingCover() {
          const src = pendingMiniCoverSrc();
          const ref = pendingMiniCoverRef();
          if (!src && !ref) return;
          const events = readCreatedEvents();
          if (!events.length || !events[0]) return;
          if (events[0].coverSrc || events[0].eventCoverSrc || events[0].coverRef || events[0].eventCoverRef) return;
          events[0] = Object.assign({}, events[0], eventCoverStoragePatch(src, ref));
          writeCreatedEvents(events);
          applyEventCoversFromStorage();
        }
        function persistBusinessEventToFeeds(payload) {
          if (!payload || !cleanText(payload.title)) return;
          const events = readCreatedEvents();
          const payloadId = cleanText(payload.id);
          const payloadBusiness = cleanText(payload.business || payload.actor);
          const payloadTitle = cleanText(payload.title);
          const sameIndex = events.findIndex((item) => item && (
            (payloadId && cleanText(item.id) === payloadId) ||
            (payloadTitle && cleanText(item.title) === payloadTitle && cleanText(item.business || item.actor) === payloadBusiness)
          ));
          if (sameIndex >= 0) events.splice(sameIndex, 1);
          events.unshift(payload);
          if (writeCreatedEvents(events.slice(0, 60))) {
            window.dispatchEvent(new CustomEvent("emy:created-events-changed", { detail: { id: payload.id || "" } }));
            if (typeof showToast === "function" && payload.coverSrc) showToast("Event cover added to Home and Feeds.");
          }
        }
        function applyCoverToEventCard(card, src, settings) {
          if (!card || !src) return;
          const post = card.querySelector(".feed-event-post");
          const hero = card.querySelector(".feed-event-post-hero");
          if (!post || !hero) return;
          post.classList.add("has-cover");
          hero.style.backgroundImage = 'url("' + cssUrl(src) + '")';
          ensureEventCoverImage(hero, src, "");
          applyCoverSettingsToNode(hero, settings);
          hero.querySelectorAll("[data-emy-event-cover-repair]").forEach((button) => button.remove());
        }
        function applyCoverRefToEventCard(card, ref, settings) {
          if (!card || !ref) return;
          const post = card.querySelector(".feed-event-post");
          const hero = card.querySelector(".feed-event-post-hero");
          if (!post || !hero) return;
          post.classList.add("has-cover");
          ensureEventCoverImage(hero, "", ref);
          applyCoverSettingsToNode(hero, settings);
          hero.querySelectorAll("[data-emy-event-cover-repair]").forEach((button) => button.remove());
          if (window.emyResolveFeedMedia) {
            window.emyResolveFeedMedia(ref).then((record) => {
              const resolvedSrc = record && (record.url || record.src) || "";
              if (resolvedSrc) applyCoverToEventCard(card, resolvedSrc, settings);
            }).catch(() => {});
          }
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(hero);
        }
        function applyCoverToHomeEventCard(card, cover) {
          if (!card || !cover || (!cover.src && !cover.ref)) return;
          const media = card.querySelector(".home-created-media");
          if (!media) return;
          media.classList.add("has-event-cover");
          let image = media.querySelector("img[data-emy-event-card-cover]");
          if (!image) {
            image = document.createElement("img");
            image.setAttribute("data-emy-event-card-cover", "");
            image.alt = "";
            media.insertBefore(image, media.firstChild);
          }
          if (cover.ref) image.setAttribute("data-emy-media-ref", cover.ref);
          if (cover.src && image.getAttribute("src") !== cover.src) image.src = cover.src;
          image.hidden = false;
          applyCoverSettingsToNode(media, cover.settings);
          if (cover.ref) card.dataset.detailMediaRef = cover.ref;
          if (cover.src) card.dataset.detailMediaSrc = cover.src;
          card.dataset.detailMediaType = "image";
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(media);
        }
        function hydrateInlineEventCoverImages(root) {
          const scope = root && root.nodeType === 1 ? root : document;
          const heroes = [];
          if (scope.matches && scope.matches(".feed-event-post.has-cover .feed-event-post-hero")) heroes.push(scope);
          scope.querySelectorAll && scope.querySelectorAll(".feed-event-post.has-cover .feed-event-post-hero").forEach((hero) => heroes.push(hero));
          heroes.forEach((hero) => {
            const src = eventCoverUrlFromHero(hero);
            const refImage = hero.querySelector("img[data-emy-event-card-cover][data-emy-media-ref]");
            if (src) ensureEventCoverImage(hero, src, refImage ? refImage.dataset.emyMediaRef : "");
            else if (refImage && refImage.dataset.emyMediaRef) ensureEventCoverImage(hero, "", refImage.dataset.emyMediaRef);
          });
        }
        function applyEventCoversFromStorage() {
          const events = readCreatedEvents();
          if (!events.length) {
            hydrateInlineEventCoverImages(document);
            scrubPublishedEventEditorUi(document);
            return;
          }
          const byId = new Map();
          const byTitle = new Map();
          events.forEach((item) => {
            if (!item) return;
            const src = item.coverSrc || item.eventCoverSrc || "";
            const ref = item.coverRef || item.eventCoverRef || "";
            if (!src && !ref) return;
            const id = cleanText(item.id);
            const title = cleanText(item.title);
            const cover = { src, ref, settings: item.eventCoverSettings || item.coverSettings || null };
            if (id) byId.set(id, cover);
            if (title && !byTitle.has(title)) byTitle.set(title, cover);
          });
          document.querySelectorAll(".social-feed-event-card[data-feed-id], .feed-card.is-event[data-feed-id]").forEach((card) => {
            const cover = byId.get(cleanText(card.dataset.feedId)) || byTitle.get(cleanText(card.dataset.detailTitle));
            if (cover && cover.src) applyCoverToEventCard(card, cover.src, cover.settings);
            else if (cover && cover.ref) applyCoverRefToEventCard(card, cover.ref, cover.settings);
          });
          document.querySelectorAll(".home-created-card.is-event[data-feed-id]").forEach((card) => {
            const cover = byId.get(cleanText(card.dataset.feedId)) || byTitle.get(cleanText(card.dataset.detailTitle));
            applyCoverToHomeEventCard(card, cover);
          });
          hydrateInlineEventCoverImages(document);
          scrubPublishedEventEditorUi(document);
          enhanceEventCoverRepair(document);
        }
        function persistPendingMiniEventCover() {
          const pending = pendingMiniEventCover;
          pendingMiniEventCover = null;
          if (!pending || (!pending.src && !pending.ref)) return;
          const events = readCreatedEvents();
          if (!events.length) {
            if (pending.payload) {
              if (writeCreatedEvents([pending.payload])) {
                window.dispatchEvent(new CustomEvent("emy:created-events-changed", { detail: { id: pending.payload.id || "" } }));
              }
              applyEventCoversFromStorage();
            }
            return;
          }
          const title = cleanText(pending.title);
          let index = title ? events.findIndex((item) => cleanText(item && item.title) === title) : -1;
          let changedId = "";
          if (index < 0 && pending.payload) {
            events.unshift(pending.payload);
            changedId = pending.payload.id || "";
          } else {
            if (index < 0) index = 0;
            if (!events[index]) return;
            events[index] = Object.assign({}, events[index], eventCoverStoragePatch(pending.src, pending.ref, pending.settings));
            changedId = events[index].id || "";
          }
          if (writeCreatedEvents(events)) {
            window.dispatchEvent(new CustomEvent("emy:created-events-changed", { detail: { id: changedId } }));
          }
          applyEventCoversFromStorage();
        }
        function applyCoverToBusinessTile(tile, src) {
          if (!tile || !src) return;
          const media = tile.querySelector(".tile-media");
          if (!media) return;
          media.classList.add("has-cover");
          media.style.backgroundImage = 'linear-gradient(180deg, rgba(0,27,71,.05), rgba(0,27,71,.62)), url("' + cssUrl(src) + '")';
        }
        function applyPendingBusinessEventCover(title) {
          const src = pendingBusinessEventCover;
          const ref = pendingBusinessEventCoverRef;
          if (!src && ref && window.emyResolveFeedMedia) {
            window.emyResolveFeedMedia(ref).then((record) => {
              const resolvedSrc = record && (record.url || record.src) || "";
              if (!resolvedSrc) return;
              pendingBusinessEventCover = resolvedSrc;
              applyPendingBusinessEventCover(title);
            }).catch(() => {});
            return;
          }
          if (!src) return;
          const cleanTitleValue = cleanText(title);
          const tiles = Array.from(document.querySelectorAll(".content-tile.is-event-tile"));
          const tile = tiles.find((candidate) => cleanText(candidate.querySelector(".tile-media strong") && candidate.querySelector(".tile-media strong").textContent) === cleanTitleValue) || tiles[0];
          applyCoverToBusinessTile(tile, src);
        }
        function stopEventCoverPickerEvent(event) {
          if (!event) return;
          event.preventDefault();
          event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        }
        function openEventCoverFilePicker(input) {
          if (!input) return false;
          const wasHidden = !!input.hidden;
          const previousStyle = {
            position: input.style.position,
            left: input.style.left,
            top: input.style.top,
            width: input.style.width,
            height: input.style.height,
            opacity: input.style.opacity,
            pointerEvents: input.style.pointerEvents,
            zIndex: input.style.zIndex
          };
          try { input.value = ""; } catch (error) {}
          try {
            if (wasHidden) input.hidden = false;
            input.style.position = "fixed";
            input.style.left = "0";
            input.style.top = "0";
            input.style.width = "1px";
            input.style.height = "1px";
            input.style.opacity = "0";
            input.style.pointerEvents = "none";
            input.style.zIndex = "-1";
            if (typeof input.showPicker === "function") input.showPicker();
            else input.click();
            window.setTimeout(() => {
              if (wasHidden) input.hidden = true;
              Object.keys(previousStyle).forEach((key) => {
                input.style[key] = previousStyle[key] || "";
              });
            }, 600);
            return true;
          } catch (error) {
            try { input.click(); } catch (clickError) {}
            window.setTimeout(() => {
              if (wasHidden) input.hidden = true;
              Object.keys(previousStyle).forEach((key) => {
                input.style[key] = previousStyle[key] || "";
              });
            }, 600);
            return true;
          }
        }
        document.addEventListener("click", (event) => {
          const miniCoverButton = event.target.closest("[data-feed-event-cover]");
          if (miniCoverButton) {
            stopEventCoverPickerEvent(event);
            const sheet = miniSheetFromNode(miniCoverButton);
            ensureMiniEventCoverUi(sheet);
            const file = sheet && sheet.querySelector("[data-feed-event-cover-file]");
            openEventCoverFilePicker(file);
            return;
          }
          const businessCoverButton = event.target.closest("[data-event-cover-upload]");
          if (businessCoverButton) {
            stopEventCoverPickerEvent(event);
            const sheet = businessCoverButton.closest("[data-event-compose-sheet]") || document;
            const file = sheet.querySelector("[data-event-cover-input]") || document.querySelector("[data-event-cover-input]");
            openEventCoverFilePicker(file);
            return;
          }
          const miniEditButton = event.target.closest("[data-feed-event-cover-edit]");
          if (miniEditButton) {
            event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
            openMiniCoverEditor(miniSheetFromNode(miniEditButton));
            return;
          }
          const miniRemoveButton = event.target.closest("[data-feed-event-cover-remove]");
          if (miniRemoveButton) {
            event.preventDefault();
            clearMiniCover(miniSheetFromNode(miniRemoveButton));
            return;
          }
          const repairButton = event.target.closest("[data-emy-event-cover-repair]");
          if (repairButton) {
            event.preventDefault();
            event.stopPropagation();
            const card = repairButton.closest(".social-feed-event-card[data-feed-id]");
            const input = ensureRepairInput();
            input._emyEventCoverRepairKey = eventKeyFromCard(card);
            openEventCoverFilePicker(input);
            return;
          }
          const miniSubmit = event.target.closest("[data-feed-event-next]");
          if (miniSubmit) {
            const sheet = miniSheetFromNode(miniSubmit);
            if (clickAfterCoverLoads(miniSubmit, sheet)) {
              event.preventDefault();
              event.stopPropagation();
              if (event.stopImmediatePropagation) event.stopImmediatePropagation();
              return;
            }
            const src = (sheet ? miniCoverState.get(sheet) : "") || pendingMiniCoverSrc();
            const ref = pendingMiniCoverRef(sheet);
            const titleNode = sheet && sheet.querySelector("[data-feed-event-name]");
            const settings = sheet ? miniCoverSettingsState.get(sheet) : null;
            if (src || ref) pendingMiniEventCover = { src, ref, settings, title: titleNode ? titleNode.value : "", payload: miniEventPayload(sheet, src, ref) };
            window.setTimeout(() => {
              fillLatestEventFromPendingCover();
              persistPendingMiniEventCover();
              clearMiniCover(sheet);
            }, 80);
          }
          const businessSubmit = event.target.closest("[data-event-next]");
          if (businessSubmit) {
            if (businessSubmit.disabled) return;
            const sheet = businessSubmit.closest("[data-event-compose-sheet]") || document.querySelector("[data-event-compose-sheet].is-open") || document.querySelector("[data-event-compose-sheet]");
            const payload = businessEventPayload();
            window.setTimeout(() => {
              persistBusinessEventToFeeds(payload);
              applyPendingBusinessEventCover(payload.title);
              applyEventCoversFromStorage();
              scrubPublishedEventEditorUi(document);
              closeBusinessEventComposer(sheet);
              clearBusinessEventComposer(sheet);
            }, 80);
          }
        }, true);
        document.addEventListener("change", (event) => {
          const miniFile = event.target.closest("[data-feed-event-cover-file]");
          if (miniFile) {
            const sheet = miniSheetFromNode(miniFile);
            const file = miniFile.files && miniFile.files[0];
            storeEventCoverFile(file).then(({ src, ref }) => {
              if (src || ref) {
                if (sheet) miniCoverSettingsState.set(sheet, eventCoverDefaultSettings());
                setMiniCover(sheet, src, ref);
              }
            });
            return;
          }
          const businessFile = event.target.closest("[data-event-cover-input]");
          if (businessFile) {
            const file = businessFile.files && businessFile.files[0];
            storeEventCoverFile(file).then(({ src, ref }) => {
              if (!(src || ref)) return;
              pendingBusinessEventCover = src;
              pendingBusinessEventCoverRef = ref || "";
              const upload = document.querySelector("[data-event-cover-upload]");
              const applyUploadPreview = (previewSrc) => {
                if (!upload || !previewSrc) return;
                upload.classList.add("has-image");
                upload.style.backgroundImage = 'url("' + cssUrl(previewSrc) + '")';
              };
              if (src) {
                applyUploadPreview(src);
              } else if (ref && window.emyResolveFeedMedia) {
                window.emyResolveFeedMedia(ref).then((record) => {
                  const resolvedSrc = record && (record.url || record.src) || "";
                  if (!resolvedSrc) return;
                  pendingBusinessEventCover = resolvedSrc;
                  applyUploadPreview(resolvedSrc);
                }).catch(() => {});
              }
            });
          }
        }, true);
        injectStyle();
        repairOldEventStorage();
        enhanceMiniEventSheets(document);
        applyEventCoversFromStorage();
        enhanceEventCoverRepair(document);
        window.addEventListener("emy:created-events-changed", () => window.setTimeout(() => {
          fillLatestEventFromPendingCover();
          applyEventCoversFromStorage();
          enhanceEventCoverRepair(document);
        }, 0));
        new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (!node || node.nodeType !== 1) return;
              enhanceMiniEventSheets(node);
              if ((node.matches && (node.matches(".social-feed-event-card") || node.matches(".content-tile.is-event-tile"))) || (node.querySelector && node.querySelector(".social-feed-event-card,.content-tile.is-event-tile"))) {
                applyEventCoversFromStorage();
                scrubPublishedEventEditorUi(node);
                enhanceEventCoverRepair(node);
                if (pendingBusinessEventCover || pendingBusinessEventCoverRef) applyPendingBusinessEventCover("");
              }
            });
          });
        }).observe(document.documentElement, { childList: true, subtree: true });
      })();
    </script>`;

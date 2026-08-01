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

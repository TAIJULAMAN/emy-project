(function () {
        if (window.emyClipHoverPreviewReady) return;
        window.emyClipHoverPreviewReady = true;
        const clipSelector = [
          ".reel-card",
          ".feed-card.is-clip",
          ".feed-clip-card",
          ".feed-product-clip-card",
          ".business-posted-clip-card",
          ".business-preview-card-reel",
          ".search-reel-card",
          ".social-feed-card.is-clip",
          "[data-detail-kind='Clip']",
          "[data-detail-kind='Product Clip']"
        ].join(",");
        let activeCard = null;
        let viewportPreviewObserver = null;
        const hoverPreviewDelayMs = 420;
        const viewportPreviewEnabled = false;
        function installStyle() {
          if (document.querySelector("style[data-emy-clip-hover-preview-style]")) return;
          const style = document.createElement("style");
          style.setAttribute("data-emy-clip-hover-preview-style", "true");
          style.textContent = [
            ".reel-card.is-hover-previewing .reel-play,.feed-clip-card.is-hover-previewing .reel-play,.feed-product-clip-card.is-hover-previewing .reel-play,.business-posted-clip-card.is-hover-previewing .reel-play,.business-preview-card-reel.is-hover-previewing .reel-play,.feed-card.is-clip.is-hover-previewing .feed-play,.social-feed-card.is-clip.is-hover-previewing .social-feed-play,.search-reel-card.is-hover-previewing .search-reel-play{opacity:0!important;visibility:hidden!important;pointer-events:none!important;transform:translate(-50%,-50%) scale(.86)!important}",
            ".reel-card.is-hover-previewing video,.feed-card.is-clip.is-hover-previewing video,.business-preview-card-reel.is-hover-previewing video,.social-feed-card.is-clip.is-hover-previewing video,.search-reel-card.is-hover-previewing video{display:block!important;opacity:1!important}"
          ].join("");
          document.head.appendChild(style);
        }
        function isClipCard(card) {
          if (!card || !card.matches) return false;
          if (!card.matches(clipSelector)) return false;
          if (card.closest(".clip-viewer-modal")) return false;
          const kind = String(card.dataset.detailKind || card.getAttribute("data-detail-kind") || "").toLowerCase();
          return card.classList.contains("is-clip") || card.classList.contains("feed-clip-card") || card.classList.contains("feed-product-clip-card") || card.classList.contains("business-posted-clip-card") || card.classList.contains("business-preview-card-reel") || card.classList.contains("search-reel-card") || card.classList.contains("reel-card") || card.classList.contains("social-feed-card") && card.classList.contains("is-clip") || kind === "clip" || kind === "product clip";
        }
        function mediaHolder(card) {
          return card && card.querySelector(".photo,.media,.feed-media,.feed-media-link,.social-feed-media,.business-preview-media,.search-reel-media,.home-flow-media");
        }
        function configureVideo(video) {
          if (!video) return null;
          video.muted = true;
          video.defaultMuted = true;
          video.playsInline = true;
          video.loop = true;
          video.preload = "metadata";
          video.removeAttribute("controls");
          video.setAttribute("muted", "");
          video.setAttribute("playsinline", "");
          video.setAttribute("preload", "metadata");
          video.setAttribute("data-emy-hover-preview-video", "true");
          return video;
        }
        function ensureVideo(card) {
          let video = card && card.querySelector("video");
          if (video) return configureVideo(video);
          const holder = mediaHolder(card);
          const src = card && card.dataset ? String(card.dataset.detailMediaSrc || "") : "";
          const ref = card && card.dataset ? String(card.dataset.detailMediaRef || "") : "";
          const type = card && card.dataset ? String(card.dataset.detailMediaType || "").toLowerCase() : "";
          if (!holder || type !== "video" || (!src && !ref)) return null;
          video = document.createElement("video");
          if (src) video.src = src;
          if (ref) video.setAttribute("data-emy-media-ref", ref);
          if (card.dataset.detailPosterSrc) video.poster = card.dataset.detailPosterSrc;
          if (card.dataset.detailPosterRef) video.setAttribute("data-emy-poster-ref", card.dataset.detailPosterRef);
          configureVideo(video);
          holder.insertBefore(video, holder.firstChild || null);
          return video;
        }
        function cardStillActive(card) {
          return !!(card && (card.matches(":hover") || card.contains(document.activeElement) || card.dataset.emyViewportPreviewActive === "true"));
        }
        function resetVideoToStart(video) {
          if (!video) return;
          const seek = () => {
            try { video.currentTime = 0; } catch (error) {}
          };
          if (video.readyState >= 1 || Number.isFinite(video.duration)) seek();
          else video.addEventListener("loadedmetadata", seek, { once: true });
        }
        function modalViewerOpen() {
          return Array.from(document.querySelectorAll(".clip-viewer-modal.is-open,.item-detail-modal.is-open,[data-feed-post-sheet].is-open,[data-feed-video-editor].is-open")).some(function (node) {
            if (!node || node.hidden || node.getAttribute("aria-hidden") === "true") return false;
            const style = window.getComputedStyle ? window.getComputedStyle(node) : null;
            if (style && (style.display === "none" || style.visibility === "hidden" || style.pointerEvents === "none")) return false;
            const rect = node.getBoundingClientRect ? node.getBoundingClientRect() : null;
            return !rect || (rect.width > 0 && rect.height > 0);
          });
        }
        function playWhenReady(card, video, token) {
          if (!card || !video || card.dataset.emyHoverPreviewToken !== token || !cardStillActive(card)) return;
          const lastAttemptAt = Number(video.dataset.emyHoverPreviewPlayAt || "0");
          if (video.dataset.emyHoverPreviewPlayToken === token && (!video.paused || Date.now() - lastAttemptAt < 1800)) return;
          video.dataset.emyHoverPreviewPlayToken = token;
          video.dataset.emyHoverPreviewPlayAt = String(Date.now());
          const attempt = () => {
            if (card.dataset.emyHoverPreviewToken !== token || !cardStillActive(card)) return;
            if (!video.paused && !video.ended) return;
            const promise = video.play();
            if (promise && typeof promise.catch === "function") promise.catch(function () {});
          };
          const retry = () => attempt();
          video.addEventListener("loadedmetadata", retry, { once: true });
          video.addEventListener("canplay", retry, { once: true });
          attempt();
          window.setTimeout(retry, 700);
        }
        function clearHoverTimer(card) {
          if (!card || !card.dataset) return;
          const id = Number(card.dataset.emyHoverPreviewTimer || "0");
          if (id) window.clearTimeout(id);
          card.dataset.emyHoverPreviewTimer = "";
        }
        function scheduleStart(card) {
          if (!isClipCard(card)) return;
          clearHoverTimer(card);
          const id = window.setTimeout(function () {
            card.dataset.emyHoverPreviewTimer = "";
            start(card);
          }, hoverPreviewDelayMs);
          card.dataset.emyHoverPreviewTimer = String(id);
        }
        function hydrateHoveredCard(card) {
          if (!window.emyHydrateFeedMedia || !card || card.dataset.emyHoverHydrateQueued === "true") return;
          card.dataset.emyHoverHydrateQueued = "true";
          const hydrate = function () {
            card.dataset.emyHoverHydrateQueued = "";
            if (!cardStillActive(card) || modalViewerOpen()) return;
            try { window.emyHydrateFeedMedia(card); } catch (error) {}
          };
          if (window.requestIdleCallback) window.requestIdleCallback(hydrate, { timeout: 650 });
          else window.setTimeout(hydrate, 180);
        }
        function start(card) {
          if (!isClipCard(card)) return;
          if (modalViewerOpen()) return;
          installStyle();
          const video = ensureVideo(card);
          if (!video) return;
          if (activeCard === card && card.classList.contains("is-hover-previewing")) {
            video.dataset.emyHoverPreviewActive = "true";
            const existingToken = card.dataset.emyHoverPreviewToken || "";
            if (existingToken) playWhenReady(card, video, existingToken);
            return;
          }
          if (activeCard && activeCard !== card) stop(activeCard, false);
          hydrateHoveredCard(card);
          activeCard = card;
          const token = String(Date.now()) + Math.random();
          card.dataset.emyHoverPreviewToken = token;
          card.classList.add("is-previewing", "is-hover-previewing");
          video.dataset.emyHoverPreviewActive = "true";
          playWhenReady(card, video, token);
        }
        function stop(card, keepTime) {
          if (!card) return;
          clearHoverTimer(card);
          card.classList.remove("is-previewing", "is-hover-previewing");
          card.dataset.emyHoverPreviewToken = "";
          const video = card.querySelector("video[data-emy-hover-preview-video], video");
          if (video) {
            video.dataset.emyHoverPreviewActive = "false";
            try { video.pause(); } catch (error) {}
            if (!keepTime) resetVideoToStart(video);
          }
          if (activeCard === card) activeCard = null;
        }
        function setupViewportPreview(card) {
          if (!card || card.dataset.emyClipViewportPreviewBound === "true" || !("IntersectionObserver" in window)) return;
          card.dataset.emyClipViewportPreviewBound = "true";
          if (!viewportPreviewObserver) {
            viewportPreviewObserver = new IntersectionObserver(function (entries) {
              entries.forEach(function (entry) {
                const card = entry.target;
                if (!isClipCard(card)) return;
                const visible = entry.isIntersecting && entry.intersectionRatio >= 0.56;
                if (!visible) {
                  if (card.dataset.emyViewportPreviewActive === "true" || card.classList.contains("is-hover-previewing") || card.classList.contains("is-previewing")) {
                    card.dataset.emyViewportPreviewActive = "false";
                    card.dataset.emyViewportNeedsRestart = "true";
                    stop(card, false);
                    return;
                  }
                  const video = card.querySelector("video[data-emy-hover-preview-video], video");
                  if (video && ((Number(video.currentTime) || 0) > 0.04 || !video.paused)) {
                    card.dataset.emyViewportNeedsRestart = "true";
                    stop(card, false);
                  }
                  return;
                }
                if (modalViewerOpen()) return;
                card.dataset.emyViewportPreviewActive = "true";
                card.dataset.emyViewportNeedsRestart = "false";
                start(card);
              });
            }, { threshold: [0, 0.15, 0.35, 0.56, 0.75, 1] });
          }
          viewportPreviewObserver.observe(card);
        }
        function bind(card) {
          if (!isClipCard(card) || card.dataset.emyClipHoverPreviewBound === "true") return;
          card.dataset.emyClipHoverPreviewBound = "true";
          card.addEventListener("pointerenter", function (event) {
            if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
            scheduleStart(card);
          });
          card.addEventListener("mouseenter", function () { scheduleStart(card); });
          card.addEventListener("pointerleave", function () { clearHoverTimer(card); stop(card, false); });
          card.addEventListener("mouseleave", function () { clearHoverTimer(card); stop(card, false); });
          card.addEventListener("focusin", function () { scheduleStart(card); });
          card.addEventListener("focusout", function () {
            clearHoverTimer(card);
            window.setTimeout(function () {
              if (!card.contains(document.activeElement)) stop(card, false);
            }, 0);
          });
          if (viewportPreviewEnabled) setupViewportPreview(card);
        }
        let clipViewerScriptWarmupScheduled = false;
        const clipOpenControlSelector = ".reel-play,.search-reel-play,.feed-play,.social-feed-play,.clip-play,.video-play,.media-play,.feed-media-play,.feed-video-play,.play-button,[data-feed-play],[data-open-clip],[data-clip-open],[data-video-play],[data-play-video],[data-feed-video-play]";
        const clipClickIgnoreSelector = "a[href],button,input,textarea,select,label,summary,[contenteditable=true],[data-feed-options-menu],[data-public-activity-options-menu],[data-clip-like-toggle],.clip-viewer-like-chip,.feed-actions,.social-feed-actions,.feed-comments,.feed-comment-form,.feed-comment-reply-form,.emy-video-controls,.clip-viewer-control,.clip-viewer-volume,.clip-viewer-more-menu";
        function clipCardFromClick(target) {
          const node = target && target.closest ? target : null;
          if (!node) return null;
          const playControl = node.closest(clipOpenControlSelector);
          const card = (playControl || node).closest(clipSelector);
          if (!isClipCard(card)) return null;
          if (card.closest("[data-clip-viewer-modal],.clip-viewer-modal,[data-item-detail-modal],.item-detail-modal")) return null;
          const ignored = node.closest(clipClickIgnoreSelector);
          if (ignored && !playControl && ignored !== card) return null;
          return card;
        }
        function clipViewerScriptReady() {
          return typeof window.emyOpenClipViewer === "function" || typeof window.emyOpenItemDetail === "function";
        }
        function loadClipViewerScript(onReady) {
          if (clipViewerScriptReady()) {
            if (typeof onReady === "function") window.setTimeout(onReady, 0);
            return true;
          }
          let script = document.querySelector('script[data-emy-customer-home-item-detail]');
          if (!script) {
            script = document.createElement("script");
            script.src = "assets/emy-customer-home-item-detail.js?v=d83ec68f8f32";
            script.async = true;
            script.setAttribute("data-emy-customer-home-item-detail", "");
            (document.head || document.body || document.documentElement).appendChild(script);
          }
          if (typeof onReady === "function") {
            script.addEventListener("load", onReady, { once: true });
            window.setTimeout(onReady, 180);
            window.setTimeout(onReady, 650);
            window.setTimeout(onReady, 1400);
          }
          return true;
        }
        function warmClipViewerScript() {
          loadClipViewerScript();
        }
        function scheduleClipViewerWarmup() {
          if (clipViewerScriptWarmupScheduled) return;
          clipViewerScriptWarmupScheduled = true;
          const run = function () {
            if (document.querySelector(clipSelector)) warmClipViewerScript();
          };
          if (window.requestIdleCallback) window.requestIdleCallback(run, { timeout: 7000 });
          else window.setTimeout(run, 4500);
        }
        function loadClipViewerForCard(card) {
          const open = function () {
            if (typeof window.emyOpenClipViewer === "function" && window.emyOpenClipViewer(card)) return true;
            if (typeof window.emyOpenItemDetail === "function" && window.emyOpenItemDetail(card)) return true;
            return false;
          };
          if (open()) return true;
          return loadClipViewerScript(open);
        }
        function openClipCardFromClick(event) {
          if (!event || event.__emyClipCardOpenHandled) return;
          const card = clipCardFromClick(event.target);
          if (!card || modalViewerOpen()) return;
          event.__emyClipCardOpenHandled = true;
          if (event.preventDefault) event.preventDefault();
          if (event.stopPropagation) event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          stop(card, true);
          loadClipViewerForCard(card);
        }
        function setup(root) {
          const scope = root && root.querySelectorAll ? root : document;
          if (scope.matches && isClipCard(scope)) bind(scope);
          scope.querySelectorAll(clipSelector).forEach(bind);
        }
        function stopAll(exceptRoot) {
          document.querySelectorAll(clipSelector).forEach(function (card) {
            if (!isClipCard(card)) return;
            if (exceptRoot && exceptRoot.contains && exceptRoot.contains(card)) return;
            stop(card, false);
          });
          if (activeCard && (!exceptRoot || !exceptRoot.contains || !exceptRoot.contains(activeCard))) activeCard = null;
        }
        window.emySetupClipHoverPreviews = setup;
        window.emyStopClipHoverPreviews = stopAll;
        window.addEventListener("click", openClipCardFromClick, true);
        document.addEventListener("click", openClipCardFromClick, true);
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", function () { setup(document); scheduleClipViewerWarmup(); }, { once: true });
        } else {
          setup(document);
          scheduleClipViewerWarmup();
        }
        const pendingClipRoots = new Set();
        let clipSetupScheduled = false;
        function nodeHasClipCard(node) {
          return !!(node && node.nodeType === 1 && ((node.matches && node.matches(clipSelector)) || (node.querySelector && node.querySelector(clipSelector))));
        }
        function scheduleClipSetup(root) {
          if (root && root.nodeType === 1) pendingClipRoots.add(root);
          if (clipSetupScheduled) return;
          clipSetupScheduled = true;
          window.requestAnimationFrame(function () {
            clipSetupScheduled = false;
            const roots = Array.from(pendingClipRoots);
            pendingClipRoots.clear();
            if (!roots.length) return;
            if (roots.length > 16) {
              setup(document);
              return;
            }
            roots.forEach(setup);
          });
        }
        new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
              if (nodeHasClipCard(node)) scheduleClipSetup(node);
            });
          });
        }).observe(document.documentElement, { childList: true, subtree: true });
      })();

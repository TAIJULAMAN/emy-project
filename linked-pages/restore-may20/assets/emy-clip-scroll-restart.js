(() => {
        if (window.emyClipScrollRestartReady) return;
        window.emyClipScrollRestartReady = true;
        let activeKey = "";
        let restartTimer = 0;
        function installAntiFlashStyle() {
          if (document.querySelector("style[data-emy-clip-antiflash-style]")) return;
          const style = document.createElement("style");
          style.setAttribute("data-emy-clip-antiflash-style", "true");
          style.textContent = [
            ".clip-viewer-frame.is-video-warming .clip-viewer-media,.clip-viewer-media:has(> video[data-emy-frame-ready='false']){background:#07090d!important;background-image:none!important}",
            ".clip-viewer-media video[data-emy-frame-ready='false']{opacity:0!important;visibility:hidden!important}",
            ".clip-viewer-media video[data-emy-frame-ready='true']{opacity:1!important;visibility:visible!important}",
            ".clip-viewer-frame.is-video-warming .clip-viewer-media{background:#07090d!important;background-image:none!important}",
            ".clip-viewer-close,[data-clip-viewer-close]{position:fixed!important;z-index:2147483647!important;pointer-events:auto!important;cursor:pointer!important}"
          ].join("");
          document.head.appendChild(style);
        }
        function clipModal() {
          return document.querySelector("[data-clip-viewer-modal],.clip-viewer-modal");
        }
        function clipTrack() {
          return document.querySelector("[data-clip-viewer-track],.clip-viewer-track");
        }
        function modalIsOpen(modal) {
          return !!(modal && modal.classList.contains("is-open") && modal.getAttribute("aria-hidden") !== "true" && !modal.hidden);
        }
        function videoForSlide(slide) {
          return slide && slide.querySelector ? slide.querySelector(".clip-viewer-media video") : null;
        }
        function markFrameReady(video, ready) {
          if (!video) return;
          video.dataset.emyFrameReady = ready ? "true" : "false";
          const frame = video.closest(".clip-viewer-frame");
          if (frame) frame.classList.toggle("is-video-warming", !ready);
        }
        function markReadyAfterPaint(video) {
          if (!video || video.readyState < 2) return false;
          let done = false;
          const finish = () => {
            if (done) return;
            done = true;
            markFrameReady(video, true);
          };
          if (typeof video.requestVideoFrameCallback === "function") {
            try { video.requestVideoFrameCallback(finish); } catch (error) { window.requestAnimationFrame(finish); }
            window.setTimeout(finish, 180);
          } else {
            window.requestAnimationFrame(finish);
          }
          return true;
        }
        function bindVideoWarmEvents(video) {
          if (!video || video.dataset.emyClipFrameWarmBound === "true") return;
          video.dataset.emyClipFrameWarmBound = "true";
          ["loadeddata", "canplay", "seeked", "playing", "timeupdate"].forEach((eventName) => {
            video.addEventListener(eventName, () => markReadyAfterPaint(video));
          });
          ["loadstart", "waiting", "emptied"].forEach((eventName) => {
            video.addEventListener(eventName, () => {
              if (video.readyState < 2) markFrameReady(video, false);
            });
          });
        }
        function warmVideo(video) {
          if (!video) return;
          bindVideoWarmEvents(video);
          video.playsInline = true;
          video.preload = "auto";
          video.setAttribute("playsinline", "");
          video.setAttribute("preload", "auto");
          if (video.poster) markFrameReady(video, true);
          if (video.readyState >= 2) markReadyAfterPaint(video);
          else if (!video.poster) {
            markFrameReady(video, false);
            if (video.readyState === 0 && video.dataset.emyClipPreloadRequested !== "true") {
              video.dataset.emyClipPreloadRequested = "true";
              try { video.load(); } catch (error) {}
            }
          }
        }
        function waitForFrame(video, callback) {
          warmVideo(video);
          let done = false;
          const finish = () => {
            if (done) return;
            done = true;
            markReadyAfterPaint(video);
            callback();
          };
          if (video.readyState >= 2) {
            if (typeof video.requestVideoFrameCallback === "function") {
              try { video.requestVideoFrameCallback(finish); } catch (error) { window.requestAnimationFrame(finish); }
              window.setTimeout(finish, 180);
            } else {
              window.requestAnimationFrame(finish);
            }
            return;
          }
          ["loadeddata", "canplay", "seeked"].forEach((eventName) => {
            video.addEventListener(eventName, finish, { once: true });
          });
          window.setTimeout(() => {
            if (video.readyState >= 2) finish();
          }, 700);
        }
        function resetVideo(video) {
          if (!video) return;
          const seek = () => {
            try { video.currentTime = 0; } catch (error) {}
            if (video.readyState < 2) markFrameReady(video, false);
          };
          if (video.readyState >= 1 || Number.isFinite(video.duration)) seek();
          else video.addEventListener("loadedmetadata", seek, { once: true });
        }
        function stopClipViewerMedia(modal) {
          const scope = modal || clipModal() || document;
          if (typeof window.emyStopAllMedia === "function") {
            try { window.emyStopAllMedia(scope, "clip-viewer-close"); } catch (error) {}
          }
          if (scope && scope.querySelectorAll) {
            scope.querySelectorAll("video,audio").forEach((media) => {
              try { media.pause(); } catch (error) {}
              try {
                media.autoplay = false;
                media.removeAttribute("autoplay");
                media.muted = true;
                media.defaultMuted = true;
                media.setAttribute("muted", "");
              } catch (error) {}
              try {
                if (Number.isFinite(media.duration) || media.readyState >= 1) media.currentTime = 0;
              } catch (error) {}
            });
          }
        }
        function forceCloseClipViewer(event) {
          const target = event && event.target;
          if (!target || !target.closest) return;
          const closeButton = target.closest("[data-clip-viewer-close],.clip-viewer-close");
          if (!closeButton) return;
          const modal = closeButton.closest("[data-clip-viewer-modal],.clip-viewer-modal") || clipModal();
          if (!modal) return;
          if (event.preventDefault) event.preventDefault();
          if (event.stopPropagation) event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          stopClipViewerMedia(modal);
          modal.classList.remove("is-open");
          modal.setAttribute("aria-hidden", "true");
          const track = modal.querySelector("[data-clip-viewer-track],.clip-viewer-track") || clipTrack();
          if (track) {
            track.innerHTML = "";
            try { track.scrollTop = 0; } catch (error) {}
          }
          document.body.classList.remove("item-detail-locked");
          activeKey = "";
          try { window.dispatchEvent(new CustomEvent("emy:clip-viewer-closed")); } catch (error) {}
        }
        function nearbySlides(track, activeSlide, radius) {
          const slides = Array.from(track.querySelectorAll("[data-clip-slide]"));
          const activeIndex = slides.indexOf(activeSlide);
          if (activeIndex < 0) return activeSlide ? [activeSlide] : [];
          return slides.filter((slide, index) => Math.abs(index - activeIndex) <= radius);
        }
        function warmNeighborSlides(track, activeSlide) {
          nearbySlides(track, activeSlide, 1).forEach((slide) => warmVideo(videoForSlide(slide)));
        }
        function syncSlide(slide) {
          if (!slide) return;
          const frame = slide.querySelector(".clip-viewer-frame");
          const video = videoForSlide(slide);
          const hasVideo = !!video;
          const paused = !hasVideo || video.paused || video.ended;
          const muted = !hasVideo || video.muted || Number(video.volume) <= 0;
          if (frame) {
            frame.classList.toggle("has-video", hasVideo);
            frame.classList.toggle("is-paused", paused);
            frame.classList.toggle("is-playing", hasVideo && !paused);
            frame.classList.toggle("is-muted", muted);
          }
          slide.querySelectorAll("[data-clip-video-play]").forEach((button) => {
            button.disabled = !hasVideo;
            button.setAttribute("aria-label", paused ? "Play clip" : "Pause clip");
            button.setAttribute("aria-pressed", paused ? "false" : "true");
          });
          slide.querySelectorAll("[data-clip-video-mute]").forEach((button) => {
            button.disabled = !hasVideo;
            button.setAttribute("aria-label", muted ? "Turn clip sound on" : "Mute clip");
            button.setAttribute("aria-pressed", muted ? "true" : "false");
          });
        }
        function bestSlide(track) {
          const slides = Array.from(track.querySelectorAll("[data-clip-slide]"));
          if (!slides.length) return null;
          const trackRect = track.getBoundingClientRect();
          const center = trackRect.top + trackRect.height / 2;
          let best = null;
          let bestScore = -Infinity;
          slides.forEach((slide) => {
            const rect = slide.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            const visible = Math.max(0, Math.min(rect.bottom, trackRect.bottom) - Math.max(rect.top, trackRect.top));
            const ratio = visible / Math.max(1, rect.height);
            const distance = Math.abs((rect.top + rect.height / 2) - center) / Math.max(1, trackRect.height);
            const score = ratio - distance;
            if (score > bestScore) {
              bestScore = score;
              best = slide;
            }
          });
          return best || slides[0] || null;
        }
        function pauseAndResetInactive(track, activeSlide) {
          const candidates = new Set();
          track.querySelectorAll("[data-clip-slide].is-active").forEach((slide) => candidates.add(slide));
          nearbySlides(track, activeSlide, 1).forEach((slide) => candidates.add(slide));
          candidates.forEach((slide) => {
            if (slide === activeSlide) return;
            slide.classList.remove("is-active");
            const video = videoForSlide(slide);
            if (video) {
              warmVideo(video);
              try { video.pause(); } catch (error) {}
              if (video.dataset.emyClipScrollNeedsRestart !== "true") {
                video.dataset.emyClipScrollNeedsRestart = "true";
                resetVideo(video);
              }
            }
            syncSlide(slide);
          });
        }
        function playActiveSlide(slide, restart) {
          const video = videoForSlide(slide);
          if (!video) return;
          video.playsInline = true;
          video.preload = "auto";
          video.setAttribute("playsinline", "");
          video.setAttribute("preload", "auto");
          warmVideo(video);
          const alreadyPreparedAtStart = video.dataset.emyClipScrollNeedsRestart === "true";
          if (restart && video.ended) {
            resetVideo(video);
          } else if (restart && !alreadyPreparedAtStart && Number(video.currentTime) > 0.25) {
            resetVideo(video);
          }
          video.dataset.emyClipScrollNeedsRestart = "false";
          if (window.emyPauseOtherMedia) {
            try { window.emyPauseOtherMedia(video); } catch (error) {}
          }
          const attempt = () => {
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === "function") {
              playPromise.then(() => syncSlide(slide)).catch(() => {
                video.muted = true;
                video.defaultMuted = true;
                video.setAttribute("muted", "");
                const mutedPlay = video.play();
                if (mutedPlay && typeof mutedPlay.catch === "function") mutedPlay.catch(() => syncSlide(slide));
                syncSlide(slide);
              });
            } else {
              syncSlide(slide);
            }
          };
          waitForFrame(video, attempt);
          syncSlide(slide);
        }
        function applyClipScrollRestart(force) {
          const modal = clipModal();
          const track = clipTrack();
          if (!track || !modalIsOpen(modal)) return;
          const activeSlide = bestSlide(track);
          if (!activeSlide) return;
          const key = activeSlide.dataset.clipKey || activeSlide.dataset.clipSlide || "";
          const changed = !!force || key !== activeKey;
          activeSlide.classList.add("is-active");
          warmNeighborSlides(track, activeSlide);
          pauseAndResetInactive(track, activeSlide);
          const activeVideo = videoForSlide(activeSlide);
          if (activeVideo && (changed || activeVideo.dataset.emyClipScrollNeedsRestart === "true" || activeVideo.paused || activeVideo.ended)) {
            playActiveSlide(activeSlide, changed || activeVideo.dataset.emyClipScrollNeedsRestart === "true" || activeVideo.ended);
          }
          activeKey = key;
          syncSlide(activeSlide);
        }
        function scheduleClipScrollRestart(force) {
          if (restartTimer) window.clearTimeout(restartTimer);
          restartTimer = window.setTimeout(() => {
            restartTimer = 0;
            applyClipScrollRestart(!!force);
          }, force ? 16 : 84);
        }
        function bindClipScrollRestart() {
          installAntiFlashStyle();
          const track = clipTrack();
          const modal = clipModal();
          if (!track || track.dataset.emyClipScrollRestartBound === "true") return;
          track.dataset.emyClipScrollRestartBound = "true";
          track.addEventListener("scroll", () => scheduleClipScrollRestart(false), { passive: true });
          new MutationObserver(() => scheduleClipScrollRestart(true)).observe(track, { childList: true });
          if (modal) {
            new MutationObserver(() => {
              if (modalIsOpen(modal)) scheduleClipScrollRestart(true);
              else activeKey = "";
            }).observe(modal, { attributes: true, attributeFilter: ["class", "aria-hidden", "hidden"] });
          }
          document.addEventListener("click", (event) => {
            if (event.target && event.target.closest && event.target.closest(".reel-play,.search-reel-play,.feed-play,.social-feed-play")) {
              window.setTimeout(() => scheduleClipScrollRestart(true), 30);
              window.setTimeout(() => scheduleClipScrollRestart(true), 140);
            }
          }, true);
          document.addEventListener("pointerdown", forceCloseClipViewer, true);
          document.addEventListener("click", forceCloseClipViewer, true);
          scheduleClipScrollRestart(true);
        }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bindClipScrollRestart, { once: true });
        else bindClipScrollRestart();
        new MutationObserver(bindClipScrollRestart).observe(document.documentElement, { childList: true, subtree: true });
      })();

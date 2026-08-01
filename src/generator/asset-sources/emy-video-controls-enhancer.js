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

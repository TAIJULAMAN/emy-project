

        (function setupEmyVideoPlayerRuntime() {
          if (window.emyVideoPlayerMarkup && window.emySetupVideoPlayers) return;
          function escapeEmyVideo(value) {
            return String(value || "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[char]));
          }
          function cleanEmyVideoText(value) {
            return String(value || "").replace(/\s+/g, " ").trim();
          }
          function formatEmyVideoTime(seconds) {
            const total = Math.max(0, Math.floor(Number(seconds) || 0));
            return Math.floor(total / 60) + ":" + String(total % 60).padStart(2, "0");
          }
          window.emyVideoPlayerMarkup = function emyVideoPlayerMarkup(src, label, mediaRef, posterSrc, posterRef, preload, deferredSrc) {
            const cleanSrc = cleanEmyVideoText(src);
            const cleanRef = cleanEmyVideoText(mediaRef);
            const cleanLabel = cleanEmyVideoText(label) || "Video";
            const cleanPosterSrc = cleanEmyVideoText(posterSrc);
            const cleanPosterRef = cleanEmyVideoText(posterRef);
            const cleanPreload = cleanEmyVideoText(preload) || "metadata";
            const cleanDeferredSrc = cleanEmyVideoText(deferredSrc);
            if (!cleanSrc && !cleanRef && !cleanDeferredSrc) return "";
            return '<div class="emy-video-player" data-emy-video-player data-quality="auto">' +
              '<video' + (cleanSrc ? ' src="' + escapeEmyVideo(cleanSrc) + '"' : '') + (cleanRef ? ' data-emy-media-ref="' + escapeEmyVideo(cleanRef) + '"' : '') + (!cleanSrc && !cleanRef && cleanDeferredSrc ? ' data-emy-deferred-src="' + escapeEmyVideo(cleanDeferredSrc) + '"' : '') + (cleanPosterSrc ? ' poster="' + escapeEmyVideo(cleanPosterSrc) + '"' : '') + (cleanPosterRef ? ' data-emy-poster-ref="' + escapeEmyVideo(cleanPosterRef) + '"' : '') + ' playsinline preload="' + escapeEmyVideo(cleanPreload) + '" aria-label="' + escapeEmyVideo(cleanLabel) + '"></video>' +
              '<span class="emy-video-surface" data-emy-video-open aria-hidden="true"></span>' +
              '<div class="emy-video-error" data-emy-video-error hidden></div>' +
              '<div class="emy-video-controls" aria-label="Video controls">' +
                '<button class="emy-video-control" type="button" data-emy-video-play aria-label="Play video"><svg class="play-icon" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg><svg class="pause-icon" viewBox="0 0 24 24"><path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z"/></svg></button>' +
                '<input class="emy-video-progress" type="range" min="0" max="1000" value="0" step="1" data-emy-video-progress aria-label="Video progress" />' +
                '<span class="emy-video-time" data-emy-video-time>0:00</span>' +
                '<select class="emy-video-quality" data-emy-video-quality aria-label="Video quality"><option value="auto">Auto</option><option value="hd">HD</option><option value="data">Saver</option></select>' +
                '<button class="emy-video-control" type="button" data-emy-video-mute aria-pressed="false" aria-label="Mute video"><svg viewBox="0 0 24 24"><path d="M4 9.5v5h4l5 4v-13l-5 4H4Z"/><path data-sound-wave d="M17 9.2c1.1 1.1 1.1 4.5 0 5.6"/><path data-muted-mark d="m18 9 3 3m0-3-3 3"/></svg></button>' +
                '<button class="emy-video-control" type="button" data-emy-video-fullscreen aria-label="Expand video"><svg viewBox="0 0 24 24"><path d="M8 4H4v4M16 4h4v4M8 20H4v-4M20 16v4h-4"/></svg></button>' +
              '</div>' +
            '</div>';
          };
          window.emySetupVideoPlayers = function setupEmyVideoPlayers(root = document) {
            const scope = root && root.querySelectorAll ? root : document;
            const players = [];
            if (root && root.nodeType === 1 && root.matches && root.matches("[data-emy-video-player]")) players.push(root);
            scope.querySelectorAll("[data-emy-video-player]").forEach((player) => players.push(player));
            players.forEach((player) => {
              if (!player || player.dataset.emyVideoBound === "true") return;
              const inactiveSlide = player.closest("[data-feed-carousel-slide]:not(.is-active)");
              if (inactiveSlide) {
                const deferredVideo = player.querySelector("video");
                if (deferredVideo && window.emyDeferCarouselVideoSource) window.emyDeferCarouselVideoSource(deferredVideo);
                else if (deferredVideo) {
                  try { deferredVideo.pause(); deferredVideo.preload = "none"; deferredVideo.setAttribute("preload", "none"); } catch (error) {}
                }
                return;
              }
              const video = player.querySelector("video");
              if (!video) return;
              try { video.controls = false; video.removeAttribute("controls"); } catch (error) {}
              player.querySelectorAll(".emy-video-big-play").forEach((node) => node.remove());
              player.dataset.emyVideoBound = "true";
              const playButtons = player.querySelectorAll("[data-emy-video-play]");
              const playSurface = player.querySelector("[data-emy-video-open]");
              const progress = player.querySelector("[data-emy-video-progress]");
              const time = player.querySelector("[data-emy-video-time]");
              const mute = player.querySelector("[data-emy-video-mute]");
              const fullscreen = player.querySelector("[data-emy-video-fullscreen]");
              const quality = player.querySelector("[data-emy-video-quality]");
              const error = player.querySelector("[data-emy-video-error]");
              const feedCardPlayer = !!(player.closest && player.closest(".feed-media, .social-feed-media, .home-created-media, .feed-media-carousel, .feed-post-media"));
              const stopPlayerControlEvent = (event) => {
                event.stopPropagation();
              };
              [player.querySelector(".emy-video-controls"), progress, quality, mute, fullscreen].concat(Array.from(playButtons)).filter(Boolean).forEach((node) => {
                ["pointerdown", "mousedown", "touchstart", "click"].forEach((type) => node.addEventListener(type, stopPlayerControlEvent, { passive: true }));
              });
              if (playSurface) {
                ["pointerdown", "mousedown", "touchstart", "click"].forEach((type) => playSurface.addEventListener(type, stopPlayerControlEvent, { passive: true }));
              }
              const showPlayerControls = () => player.classList.add("is-controls-visible");
              const hidePlayerControls = () => {
                player.classList.remove("is-controls-visible");
                if (!player.matches(":hover") && player.contains(document.activeElement) && document.activeElement && typeof document.activeElement.blur === "function") {
                  document.activeElement.blur();
                }
              };
              if (!feedCardPlayer) {
                player.addEventListener("mouseenter", showPlayerControls);
                player.addEventListener("mousemove", showPlayerControls);
                player.addEventListener("mouseleave", hidePlayerControls);
              }
              const showError = (message) => {
                if (!error) return;
                error.textContent = message;
                error.hidden = false;
              };
              const supportedQualities = ["auto", "hd", "data"];
              const normaliseQuality = (value) => supportedQualities.includes(String(value || "").toLowerCase()) ? String(value || "").toLowerCase() : "auto";
              const readQualityPreference = () => {
                try { return normaliseQuality(localStorage.getItem("emyVideoQualityPreference")); } catch (error) { return "auto"; }
              };
              const saveQualityPreference = (value) => {
                try { localStorage.setItem("emyVideoQualityPreference", normaliseQuality(value)); } catch (error) {}
              };
              const currentVideoSource = () => cleanEmyVideoText(video.currentSrc || video.src || video.getAttribute("src"));
              const deferredVideoSource = () => cleanEmyVideoText(video.dataset && video.dataset.emyDeferredSrc);
              const videoSourceReady = () => {
                const existing = currentVideoSource();
                if (existing) return Promise.resolve(existing);
                const deferred = deferredVideoSource();
                if (deferred) {
                  video.src = deferred;
                  video.preload = "auto";
                  video.setAttribute("preload", "auto");
                  try { video.load(); } catch (error) {}
                  return Promise.resolve(deferred);
                }
                const ref = cleanEmyVideoText(video.dataset && video.dataset.emyMediaRef);
                if (!ref || !window.emyResolveFeedMedia) return Promise.resolve("");
                player.classList.add("is-loading-media");
                return window.emyResolveFeedMedia(ref).then((record) => {
                  if (!record || !record.url) return "";
                  video.src = record.url;
                  video.dataset.emyMediaHydrated = "true";
                  video.dataset.emyMediaHydratedRef = ref;
                  video.dataset.emyMediaHydratedUrl = record.url;
                  video.preload = "auto";
                  video.setAttribute("preload", "auto");
                  video.load();
                  player.classList.remove("has-media-error");
                  if (error) error.hidden = true;
                  return record.url;
                }).catch(() => {
                  showError("This saved video could not be loaded from this browser storage.");
                  return "";
                }).finally(() => {
                  player.classList.remove("is-loading-media");
                });
              };
              const rememberOriginalSource = () => {
                const source = currentVideoSource();
                if (source && !video.dataset.emyOriginalSrc) video.dataset.emyOriginalSrc = source;
                return video.dataset.emyOriginalSrc || source;
              };
              const findQualitySource = (mode) => {
                const normalized = normaliseQuality(mode);
                const sources = Array.from(video.querySelectorAll("source"));
                if (sources.length) {
                  const wanted = normalized === "hd" ? ["hd", "1080", "1080p", "720", "720p", "high"] : normalized === "data" ? ["data", "saver", "low", "360", "360p"] : ["auto", "default"];
                  const match = sources.find((source) => {
                    const label = cleanEmyVideoText(source.dataset.quality || source.dataset.videoQuality || source.getAttribute("label") || source.getAttribute("res")).toLowerCase();
                    return wanted.some((item) => label.indexOf(item) >= 0);
                  });
                  if (match && match.src) return match.src;
                }
                return normalized === "hd" ? rememberOriginalSource() : "";
              };
              const switchVideoSource = (nextSource) => {
                const current = currentVideoSource();
                if (!nextSource || nextSource === current) return;
                const wasPlaying = !video.paused && !video.ended;
                const currentTime = Number.isFinite(video.currentTime) ? video.currentTime : 0;
                video.src = nextSource;
                video.load();
                video.addEventListener("loadedmetadata", () => {
                  const duration = Number.isFinite(video.duration) ? video.duration : 0;
                  if (duration && currentTime) video.currentTime = Math.min(currentTime, Math.max(0, duration - 0.2));
                  if (wasPlaying) {
                    const playPromise = video.play();
                    if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
                  }
                  update();
                }, { once: true });
              };
              const applyQuality = (value, options = {}) => {
                const mode = normaliseQuality(value);
                player.dataset.quality = mode;
                video.dataset.emyQuality = mode;
                player.classList.toggle("is-quality-hd", mode === "hd");
                player.classList.toggle("is-quality-data", mode === "data");
                if (quality && quality.value !== mode) quality.value = mode;
                const preloadValue = mode === "data" || options.silent ? "metadata" : "auto";
                video.preload = preloadValue;
                video.setAttribute("preload", preloadValue);
                switchVideoSource(findQualitySource(mode));
                if (!options.silent) {
                  saveQualityPreference(mode);
                  if (typeof showToast === "function") showToast(mode === "hd" ? "HD video mode applied." : mode === "data" ? "Data saver video mode applied." : "Auto video quality applied.");
                }
                update();
              };
              const syncSoundState = () => {
                const soundOn = !video.muted && Number(video.volume) > 0;
                player.classList.toggle("is-muted", !soundOn);
                player.classList.toggle("is-sound-on", soundOn);
                if (mute) {
                  mute.setAttribute("aria-label", soundOn ? "Mute video" : "Unmute video");
                  mute.setAttribute("aria-pressed", soundOn ? "false" : "true");
                  mute.title = soundOn ? "Mute video" : "Unmute video";
                }
              };
              const applyMute = (muted) => {
                if (muted) {
                  if (Number(video.volume) > 0) player.dataset.emyLastVolume = String(video.volume);
                  video.muted = true;
                } else {
                  video.muted = false;
                  const storedVolume = Number(player.dataset.emyLastVolume);
                  if (!Number.isFinite(video.volume) || video.volume <= 0.02) {
                    try { video.volume = Number.isFinite(storedVolume) && storedVolume > 0 ? Math.min(1, storedVolume) : 1; } catch (error) {}
                  }
                }
                syncSoundState();
                update();
              };
              const browserFullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement || null;
              const isExpanded = () => browserFullscreenElement() === player || player.classList.contains("is-expanded-fullscreen");
              const setFallbackFullscreen = (active) => {
                player.classList.toggle("is-expanded-fullscreen", !!active);
                document.body.classList.toggle("emy-video-fullscreen-lock", !!active);
                update();
              };
              const toggleFullscreen = () => {
                if (isExpanded()) {
                  if (browserFullscreenElement() === player && document.exitFullscreen) document.exitFullscreen().catch(() => setFallbackFullscreen(false));
                  else if (browserFullscreenElement() === player && document.webkitExitFullscreen) document.webkitExitFullscreen();
                  setFallbackFullscreen(false);
                  return;
                }
                if (player.requestFullscreen) {
                  player.requestFullscreen().then(update).catch(() => setFallbackFullscreen(true));
                  return;
                }
                if (player.webkitRequestFullscreen) {
                  try { player.webkitRequestFullscreen(); update(); } catch (error) { setFallbackFullscreen(true); }
                  return;
                }
                if (video.webkitEnterFullscreen) {
                  try { video.webkitEnterFullscreen(); } catch (error) { setFallbackFullscreen(true); }
                  return;
                }
                setFallbackFullscreen(true);
              };
              const update = () => {
                const duration = Number.isFinite(video.duration) ? video.duration : 0;
                const current = Number.isFinite(video.currentTime) ? video.currentTime : 0;
                player.classList.toggle("is-playing", !video.paused && !video.ended);
                if (progress && duration) progress.value = String(Math.min(1000, Math.round((current / duration) * 1000)));
                if (time) time.textContent = duration ? formatEmyVideoTime(current) + " / " + formatEmyVideoTime(duration) : "0:00";
                syncSoundState();
                if (fullscreen) {
                  fullscreen.setAttribute("aria-label", isExpanded() ? "Exit full screen" : "Expand video");
                  fullscreen.setAttribute("aria-pressed", isExpanded() ? "true" : "false");
                  fullscreen.title = isExpanded() ? "Exit full screen" : "Expand video";
                }
              };
              const togglePlay = () => {
                if (video.paused || video.ended) {
                  if (window.emyPauseOtherMedia) window.emyPauseOtherMedia(video);
                  const startPlayback = () => {
                    video.preload = "auto";
                    video.setAttribute("preload", "auto");
                    const playPromise = video.play();
                    if (playPromise && typeof playPromise.catch === "function") {
                      playPromise.catch(() => showError("This video cannot play in this browser. Try MP4/H.264 or record it again."));
                    }
                  };
                  if (!currentVideoSource() && (cleanEmyVideoText(video.dataset && video.dataset.emyMediaRef) || deferredVideoSource())) {
                    videoSourceReady().then((source) => {
                      if (source) startPlayback();
                      update();
                    });
                    update();
                    return;
                  }
                  startPlayback();
                } else {
                  video.pause();
                }
                update();
              };
              playButtons.forEach((button) => {
                ["pointerdown", "touchstart"].forEach((type) => button.addEventListener(type, () => { videoSourceReady(); }, { passive: true }));
                button.addEventListener("click", (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  showPlayerControls();
                  togglePlay();
                });
              });
              if (playSurface) ["pointerdown", "touchstart"].forEach((type) => playSurface.addEventListener(type, () => { videoSourceReady(); }, { passive: true }));
              if (playSurface) playSurface.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                showPlayerControls();
                togglePlay();
              }, true);
              if (progress) progress.addEventListener("input", (event) => {
                event.stopPropagation();
                showPlayerControls();
                const duration = Number.isFinite(video.duration) ? video.duration : 0;
                if (duration) video.currentTime = (Number(progress.value) / 1000) * duration;
                update();
              });
              if (mute) mute.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                applyMute(!video.muted || Number(video.volume) <= 0);
              });
              if (fullscreen) fullscreen.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleFullscreen();
              });
              if (quality) quality.addEventListener("change", (event) => {
                event.stopPropagation();
                applyQuality(quality.value || "auto");
              });
              video.addEventListener("loadedmetadata", update);
              video.addEventListener("timeupdate", update);
              video.addEventListener("play", update);
              video.addEventListener("pause", update);
              video.addEventListener("ended", update);
              video.addEventListener("volumechange", update);
              document.addEventListener("fullscreenchange", update);
              document.addEventListener("webkitfullscreenchange", update);
              document.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && player.classList.contains("is-expanded-fullscreen")) setFallbackFullscreen(false);
              });
              video.addEventListener("error", () => {
                const source = cleanEmyVideoText(video.currentSrc || video.src);
                showError(source.indexOf("blob:") === 0 ? "This old video link expired. Upload or record it again so EMY can save a playable copy." : "Saved, but this browser cannot decode this video. MP4/H.264 or WebM works best.");
                update();
              });
              if (!video.dataset.emyOriginalSrc) rememberOriginalSource();
              applyQuality(readQualityPreference(), { silent: true });
              update();
            });
          };
          if (window.emySetupVideoPlayers) window.emySetupVideoPlayers.__emyCarouselAware = true;
        })();

    

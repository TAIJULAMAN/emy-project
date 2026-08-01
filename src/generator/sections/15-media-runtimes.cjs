/* EMY generator section: 15-media-runtimes.cjs (source lines 16994-18558) */
const emyVideoPlayerRuntimeScript = String.raw`
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
`;

const emyMediaStoreRuntimeScript = String.raw`
        (function setupEmyMediaStoreRuntime() {
          if (window.emyStoreFeedMedia && window.emyResolveFeedMedia && window.emyHydrateFeedMedia && window.emyRepairFeedRepostMedia) return;
          const dbName = "emy-feed-media-db";
          const storeName = "media";
          const objectUrls = new Map();
          const objectUrlPromises = new Map();
          let dbPromise = null;
          function mediaStoreOpen() {
            if (!("indexedDB" in window)) return Promise.reject(new Error("IndexedDB unavailable"));
            if (dbPromise) return dbPromise;
            dbPromise = new Promise((resolve, reject) => {
              const request = indexedDB.open(dbName, 1);
              request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(storeName)) db.createObjectStore(storeName, { keyPath: "id" });
              };
              request.onsuccess = () => resolve(request.result);
              request.onerror = () => reject(request.error || new Error("Media database unavailable"));
            });
            return dbPromise;
          }
          function mediaKindFromBlob(blob, fallback) {
            const mime = String(blob && blob.type || "").toLowerCase();
            const fallbackKind = cleanMediaStoreText(fallback).toLowerCase();
            if (mime.indexOf("video/") === 0) return "video";
            if (mime.indexOf("image/") === 0) return "image";
            if (fallbackKind === "document" || fallbackKind === "raw" || mime) return "document";
            return fallbackKind === "video" ? "video" : "image";
          }
          function cleanMediaStoreText(value) {
            return String(value || "").replace(/\\s+/g, " ").trim();
          }
          function mediaStoreIsQuotaError(error) {
            return !!error && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED" || String(error.message || "").toLowerCase().includes("quota"));
          }
          function mediaStoreReferenceText() {
            let text = "";
            try {
              const usefulKey = /(?:media|poster|image|photo|video|cover|thumbnail|product|feed|post|clip|reel|event|job|article|business|customer|chat|ref|src)/i;
              const maxValueLength = 24000;
              const maxTotalLength = 260000;
              for (let index = 0; index < localStorage.length; index += 1) {
                const key = localStorage.key(index);
                if (!key) continue;
                if (!usefulKey.test(key)) continue;
                const value = localStorage.getItem(key) || "";
                if (/^data:(?:image|video|application)\//i.test(value)) continue;
                text += key + "\n" + value.slice(0, maxValueLength) + "\n";
                if (text.length >= maxTotalLength) break;
              }
            } catch (error) {}
            return text;
          }
          function mediaStoreAllRecords(db) {
            return new Promise((resolve) => {
              try {
                const tx = db.transaction(storeName, "readonly");
                const request = tx.objectStore(storeName).getAll();
                request.onsuccess = () => resolve(Array.isArray(request.result) ? request.result : []);
                request.onerror = () => resolve([]);
              } catch (error) {
                resolve([]);
              }
            });
          }
          function mediaStoreDeleteRecords(db, ids) {
            const cleanIds = (ids || []).map(cleanMediaStoreText).filter(Boolean);
            if (!cleanIds.length) return Promise.resolve(0);
            return new Promise((resolve) => {
              let deleted = 0;
              try {
                const tx = db.transaction(storeName, "readwrite");
                const store = tx.objectStore(storeName);
                cleanIds.forEach((id) => {
                  try {
                    store.delete(id);
                    if (objectUrls.has(id)) {
                      const cached = objectUrls.get(id);
                      if (cached && cached.url) {
                        try { URL.revokeObjectURL(cached.url); } catch (error) {}
                      }
                      objectUrls.delete(id);
                    }
                    objectUrlPromises.delete(id);
                    deleted += 1;
                  } catch (error) {}
                });
                tx.oncomplete = () => resolve(deleted);
                tx.onerror = () => resolve(deleted);
              } catch (error) {
                resolve(deleted);
              }
            });
          }
          function mediaStoreCleanup(db, keepId) {
            return Promise.resolve(0);
            return mediaStoreAllRecords(db).then((records) => {
              if (!records.length) return 0;
              const references = mediaStoreReferenceText();
              const keep = cleanMediaStoreText(keepId);
              const unreferenced = records
                .filter((record) => record && record.id && record.id !== keep && references.indexOf(record.id) === -1)
                .sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
              const toDelete = unreferenced.slice(0, Math.max(20, Math.ceil(unreferenced.length * 0.7))).map((record) => record.id);
              return mediaStoreDeleteRecords(db, toDelete);
            });
          }
          function mediaStoreWriteRecord(db, record) {
            return new Promise((resolve, reject) => {
              try {
                const tx = db.transaction(storeName, "readwrite");
                tx.objectStore(storeName).put(record);
                tx.oncomplete = () => resolve(record);
                tx.onerror = () => reject(tx.error || new Error("Could not save media"));
                tx.onabort = () => reject(tx.error || new Error("Could not save media"));
              } catch (error) {
                reject(error);
              }
            });
          }
          function mediaStoreCompressedImageBlob(blob) {
            const mime = String(blob && blob.type || "").toLowerCase();
            if (!blob || mime.indexOf("image/") !== 0 || /svg/.test(mime)) return Promise.resolve(blob);
            if (blob.size && blob.size < 850000 && /jpe?g|webp/.test(mime)) return Promise.resolve(blob);
            if (!window.Image || !document.createElement("canvas").toBlob) return Promise.resolve(blob);
            return new Promise((resolve) => {
              const url = URL.createObjectURL(blob);
              const image = new Image();
              let done = false;
              const finish = (nextBlob) => {
                if (done) return;
                done = true;
                try { URL.revokeObjectURL(url); } catch (error) {}
                resolve(nextBlob || blob);
              };
              image.onload = () => {
                try {
                  const maxSide = blob.size > 3500000 ? 1280 : 1600;
                  const width = image.naturalWidth || image.width || maxSide;
                  const height = image.naturalHeight || image.height || maxSide;
                  const scale = Math.min(1, maxSide / Math.max(width, height));
                  if (scale >= 1 && blob.size < 1200000 && /jpe?g/.test(mime)) {
                    finish(blob);
                    return;
                  }
                  const canvas = document.createElement("canvas");
                  canvas.width = Math.max(1, Math.round(width * scale));
                  canvas.height = Math.max(1, Math.round(height * scale));
                  const context = canvas.getContext("2d");
                  if (!context) {
                    finish(blob);
                    return;
                  }
                  context.drawImage(image, 0, 0, canvas.width, canvas.height);
                  canvas.toBlob((nextBlob) => {
                    if (nextBlob && (!blob.size || nextBlob.size < blob.size)) finish(nextBlob);
                    else finish(blob);
                  }, "image/jpeg", blob.size > 3500000 ? 0.76 : 0.82);
                } catch (error) {
                  finish(blob);
                }
              };
              image.onerror = () => finish(blob);
              image.src = url;
              window.setTimeout(() => finish(blob), 6000);
            });
          }
          window.emyCleanupBrowserMediaStorage = function cleanupBrowserMediaStorage() {
            const trimInline = window.emyTrimLargeInlineMediaStorage ? window.emyTrimLargeInlineMediaStorage().catch(() => 0) : Promise.resolve(0);
            return trimInline.then((trimmed) => mediaStoreOpen().then((db) => mediaStoreCleanup(db, "").then((deleted) => (Number(trimmed) || 0) + (Number(deleted) || 0)))).catch(() => 0);
          };
          window.emyStoreFeedMedia = function storeFeedMedia(fileOrBlob, options = {}) {
            const blob = fileOrBlob instanceof Blob ? fileOrBlob : null;
            if (!blob) return Promise.reject(new Error("No media blob"));
            const id = cleanMediaStoreText(options.id) || ("emy-media-" + Date.now() + "-" + Math.random().toString(36).slice(2));
            return mediaStoreCompressedImageBlob(blob).then((storedBlob) => {
              const record = {
                id,
                blob: storedBlob,
                mediaType: mediaKindFromBlob(storedBlob, options.type),
                mime: storedBlob.type || blob.type || "",
                name: cleanMediaStoreText(options.name || fileOrBlob.name),
                size: Number(storedBlob.size) || Number(blob.size) || 0,
                originalSize: Number(blob.size) || 0,
                compressed: storedBlob !== blob,
                createdAt: new Date().toISOString()
              };
              return mediaStoreOpen().then((db) => mediaStoreWriteRecord(db, record).catch((error) => {
                if (!mediaStoreIsQuotaError(error)) throw error;
                return mediaStoreCleanup(db, id).then(() => mediaStoreWriteRecord(db, record));
              }));
            });
          };
          window.emyPrepareFeedMediaUpload = function prepareFeedMediaUpload(fileOrBlob, options = {}) {
            const blob = fileOrBlob instanceof Blob ? fileOrBlob : null;
            if (!blob) return Promise.resolve(null);
            const type = mediaKindFromBlob(blob, options.type);
            const name = cleanMediaStoreText(options.name || fileOrBlob.name || (type === "video" ? "feed-video.webm" : "feed-image.jpg"));
            const onProgress = typeof options.onProgress === "function" ? options.onProgress : null;
            const reportProgress = (percent, detail) => {
              if (!onProgress) return;
              try { onProgress(Math.max(0, Math.min(100, Math.round(Number(percent) || 0))), detail || {}); } catch (error) {}
            };
            const preparedBlobPromise = type === "image" ? mediaStoreCompressedImageBlob(blob) : Promise.resolve(blob);
            reportProgress(1, { phase: "preparing" });
            return preparedBlobPromise.then((uploadBlob) => {
              const cloudOptions = {
                role: cleanMediaStoreText(options.role || "customer"),
                kind: cleanMediaStoreText(options.kind || "feed"),
                folder: cleanMediaStoreText(options.folder || "emy/feed"),
                name,
                onProgress: reportProgress
              };
              const uploadToCloudinary = window.emyRealAuth && typeof window.emyRealAuth.uploadToCloudinary === "function"
                ? window.emyRealAuth.uploadToCloudinary
                : null;
              const cloudPromise = uploadToCloudinary
                ? Promise.resolve(uploadToCloudinary(uploadBlob || blob, cloudOptions)).then((upload) => {
                  if (!upload || !upload.url) return null;
                  const resourceType = cleanMediaStoreText(upload.resourceType || type).toLowerCase() === "video" ? "video" : "image";
                  return {
                    src: upload.url,
                    ref: "",
                    type: resourceType,
                    name,
                    storedInCloudinary: true,
                    cloudinaryPublicId: cleanMediaStoreText(upload.publicId),
                    cloudinaryResourceType: resourceType,
                    cloudinaryBytes: Number(upload.bytes) || 0,
                    cloudinaryDuration: Number(upload.duration) || 0
                  };
                }).catch((error) => {
                  reportProgress(0, { phase: "failed", error: error && error.message || "Media upload failed." });
                  if (options.allowBrowserFallback === false) throw error;
                  return null;
                })
                : Promise.resolve(null);
              return cloudPromise.then((cloudRecord) => {
                if (cloudRecord && cloudRecord.src) return cloudRecord;
                if (options.allowBrowserFallback === false) return null;
                return window.emyStoreFeedMedia(uploadBlob || blob, { type, name }).then((record) => record ? {
                  src: "",
                  ref: record.id || "",
                  type: record.mediaType || type,
                  name: record.name || name,
                  storedInBrowser: true
                } : null).catch(() => null);
              });
            });
          };
          window.emyResolveFeedMedia = function resolveFeedMedia(ref) {
            const id = cleanMediaStoreText(ref);
            if (!id) return Promise.reject(new Error("Missing media reference"));
            if (objectUrls.has(id)) return Promise.resolve(objectUrls.get(id));
            if (objectUrlPromises.has(id)) return objectUrlPromises.get(id);
            const pending = mediaStoreOpen().then((db) => new Promise((resolve, reject) => {
              const tx = db.transaction(storeName, "readonly");
              const request = tx.objectStore(storeName).get(id);
              request.onsuccess = () => {
                const record = request.result;
                if (!record || !record.blob) {
                  reject(new Error("Stored media not found"));
                  return;
                }
                const url = URL.createObjectURL(record.blob);
                const resolved = Object.assign({}, record, { url });
                objectUrls.set(id, resolved);
                resolve(resolved);
              };
              request.onerror = () => reject(request.error || new Error("Could not load media"));
            })).finally(() => {
              objectUrlPromises.delete(id);
            });
            objectUrlPromises.set(id, pending);
            return pending;
          };
          const mediaMigrationKeys = [
            "emyFeedCreatedPosts",
            "emyFeedCreatedProducts",
            "emyFeedCreatedClips",
            "emyFeedCreatedJobs",
            "emyFeedCreatedEvents",
            "emyBusinessFeedPosts",
            "emyBusinessPosts",
            "emyBusinessArticles",
            "emyBusinessArticlePosts",
            "emyBusinessProducts",
            "emyBusinessProductList",
            "emyBusinessProductPosts",
            "emyBusinessClips",
            "emyBusinessReels",
            "emyBusinessProductReels",
            "emyFeedCreatedClipsByBusiness",
            "emyUploadedClips",
            "emyBusinessJobs",
            "emyBusinessJobPosts",
            "emyBusinessEvents",
            "emyBusinessEventPosts"
          ];
          const mediaMigrationFields = [
            { ref:"mediaRef", src:"mediaSrc" },
            { ref:"ref", src:"src" },
            { ref:"imageRef", src:"image", type:"image" },
            { ref:"videoRef", src:"video", type:"video" },
            { ref:"coverRef", src:"coverSrc" },
            { ref:"eventCoverRef", src:"eventCoverSrc" },
            { ref:"jobCoverRef", src:"jobCoverSrc" },
            { ref:"posterRef", src:"posterSrc", poster:true, type:"image" },
            { ref:"thumbnailRef", src:"thumbnailSrc", poster:true, type:"image" },
            { ref:"coverPosterRef", src:"coverPosterSrc", poster:true, type:"image" },
            { ref:"eventCoverPosterRef", src:"eventCoverPosterSrc", poster:true, type:"image" },
            { ref:"jobCoverPosterRef", src:"jobCoverPosterSrc", poster:true, type:"image" }
          ];
          let mediaMigrationPromise = null;
          let mediaMigrationStatus = {
            running: false,
            totalRefs: 0,
            uploaded: 0,
            reused: 0,
            failed: 0,
            updatedItems: 0,
            updatedKeys: 0,
            currentKey: "",
            lastError: "",
            startedAt: "",
            finishedAt: ""
          };
          function mediaMigrationLooksStoredRef(value) {
            const clean = cleanMediaStoreText(value);
            if (!clean) return false;
            if (/^(data:image\/|data:video\/|blob:|https?:\/\/|file:|\/|\.{1,2}\/|assets\/)/i.test(clean)) return false;
            return /^emy-media-|^business-|^customer-|^profile-|^media-/i.test(clean);
          }
          function mediaMigrationReadJson(key, fallback) {
            try {
              const parsed = JSON.parse(localStorage.getItem(key) || "");
              return parsed && typeof parsed === "object" ? parsed : fallback;
            } catch (error) {
              return fallback;
            }
          }
          function mediaMigrationWriteJson(key, value) {
            try {
              localStorage.setItem(key, JSON.stringify(value));
              return true;
            } catch (error) {
              mediaMigrationStatus.lastError = error && error.message || "Could not save migration state.";
              return false;
            }
          }
          function mediaMigrationReadArray(key) {
            const parsed = mediaMigrationReadJson(key, []);
            if (Array.isArray(parsed)) return parsed;
            return parsed && typeof parsed === "object" ? Object.values(parsed) : [];
          }
          function mediaMigrationMap() {
            return mediaMigrationReadJson("emyCloudinaryMigratedMediaRefs", {});
          }
          function mediaMigrationSaveMap(map) {
            mediaMigrationWriteJson("emyCloudinaryMigratedMediaRefs", map || {});
          }
          function mediaMigrationEmit() {
            try {
              window.dispatchEvent(new CustomEvent("emy:media-migration-progress", { detail:Object.assign({}, mediaMigrationStatus) }));
            } catch (error) {}
          }
          function mediaMigrationSetCloudFields(target, upload, poster) {
            if (!target || !upload) return;
            if (poster) {
              target.cloudinaryPosterPublicId = upload.cloudinaryPublicId || upload.publicId || "";
              return;
            }
            target.cloudinaryPublicId = upload.cloudinaryPublicId || upload.publicId || "";
            target.cloudinaryResourceType = upload.cloudinaryResourceType || upload.resourceType || upload.type || "";
            target.cloudinaryBytes = Number(upload.cloudinaryBytes || upload.bytes) || 0;
            target.cloudinaryDuration = Number(upload.cloudinaryDuration || upload.duration) || 0;
          }
          function mediaMigrationTypeHint(target, field) {
            const explicit = cleanMediaStoreText(field && field.type || target && (target.cloudinaryResourceType || target.mediaType || target.type || target.coverType || target.eventCoverType || target.jobCoverType)).toLowerCase();
            if (explicit === "video" || explicit === "clip" || explicit === "reel") return "video";
            if (explicit === "image" || field && field.poster) return "image";
            if (field && field.ref && /video/i.test(field.ref)) return "video";
            return "";
          }
          async function mediaMigrationUploadRef(ref, typeHint, migrationMap, dryRun) {
            const cleanRef = cleanMediaStoreText(ref);
            if (!mediaMigrationLooksStoredRef(cleanRef)) return null;
            if (migrationMap[cleanRef] && migrationMap[cleanRef].src) {
              mediaMigrationStatus.reused += 1;
              return migrationMap[cleanRef];
            }
            const record = await window.emyResolveFeedMedia(cleanRef);
            if (!record || !record.blob) throw new Error("Stored media not found: " + cleanRef);
            if (dryRun) {
              return {
                src: "dry-run",
                ref: cleanRef,
                type: typeHint || record.mediaType || mediaKindFromBlob(record.blob, ""),
                dryRun: true
              };
            }
            const upload = await window.emyPrepareFeedMediaUpload(record.blob, {
              type: typeHint || record.mediaType || mediaKindFromBlob(record.blob, ""),
              name: record.name || cleanRef,
              kind: "migration",
              role: "customer",
              allowBrowserFallback: false
            });
            if (!upload || !upload.src) throw new Error("Media upload failed: " + cleanRef);
            const saved = Object.assign({}, upload, { migratedAt:new Date().toISOString(), originalRef:cleanRef });
            migrationMap[cleanRef] = saved;
            mediaMigrationSaveMap(migrationMap);
            mediaMigrationStatus.uploaded += 1;
            return saved;
          }
          async function mediaMigrationApplyField(target, field, migrationMap, dryRun) {
            if (!target || typeof target !== "object" || !field) return false;
            const ref = cleanMediaStoreText(target[field.ref]);
            if (!mediaMigrationLooksStoredRef(ref)) return false;
            mediaMigrationStatus.totalRefs += 1;
            try {
              const upload = await mediaMigrationUploadRef(ref, field.type || mediaMigrationTypeHint(target, field), migrationMap, dryRun);
              if (!upload || !upload.src) return false;
              if (dryRun) return true;
              target[field.src] = upload.src;
              target[field.ref] = "";
              if (!field.poster) {
                target.mediaRemoved = false;
                target.mediaClearedAt = "";
                if (!target.mediaSrc && field.src !== "mediaSrc") target.mediaSrc = upload.src;
                if (!target.mediaType) target.mediaType = upload.type || upload.cloudinaryResourceType || mediaMigrationTypeHint(target, field) || "image";
                if (target.mediaType === "image" && !target.image) target.image = upload.src;
                if (target.mediaType === "video" && !target.video) target.video = upload.src;
              }
              mediaMigrationSetCloudFields(target, upload, !!field.poster);
              return true;
            } catch (error) {
              mediaMigrationStatus.failed += 1;
              mediaMigrationStatus.lastError = error && error.message || "Migration failed.";
              return false;
            } finally {
              mediaMigrationEmit();
            }
          }
          async function mediaMigrationApplySettings(settings, migrationMap, dryRun) {
            if (!settings || typeof settings !== "object") return false;
            let changed = false;
            const ref = cleanMediaStoreText(settings.posterRef || settings.thumbnailRef);
            if (mediaMigrationLooksStoredRef(ref)) {
              mediaMigrationStatus.totalRefs += 1;
              try {
                const upload = await mediaMigrationUploadRef(ref, "image", migrationMap, dryRun);
                if (upload && upload.src) {
                  if (dryRun) return true;
                  settings.posterSrc = upload.src;
                  settings.thumbnailSrc = upload.src;
                  settings.posterRef = "";
                  settings.thumbnailRef = "";
                  settings.cloudinaryPosterPublicId = upload.cloudinaryPublicId || upload.publicId || "";
                  changed = true;
                }
              } catch (error) {
                mediaMigrationStatus.failed += 1;
                mediaMigrationStatus.lastError = error && error.message || "Migration failed.";
              } finally {
                mediaMigrationEmit();
              }
            }
            return changed;
          }
          async function mediaMigrationApplyMediaItem(item, migrationMap, dryRun) {
            if (!item || typeof item !== "object" || item.mediaRemoved === true || item.deleted === true || item.deletedAt) return false;
            let changed = false;
            for (let index = 0; index < mediaMigrationFields.length; index += 1) {
              changed = await mediaMigrationApplyField(item, mediaMigrationFields[index], migrationMap, dryRun) || changed;
            }
            changed = await mediaMigrationApplySettings(item.settings || item.mediaSettings, migrationMap, dryRun) || changed;
            return changed;
          }
          async function mediaMigrationApplyItem(item, migrationMap, dryRun) {
            if (!item || typeof item !== "object" || item.deleted === true || item.deletedAt) return false;
            let changed = false;
            for (let index = 0; index < mediaMigrationFields.length; index += 1) {
              changed = await mediaMigrationApplyField(item, mediaMigrationFields[index], migrationMap, dryRun) || changed;
            }
            changed = await mediaMigrationApplySettings(item.mediaSettings || item.coverSettings || item.eventCoverSettings || item.jobCoverSettings, migrationMap, dryRun) || changed;
            if (Array.isArray(item.mediaItems)) {
              for (let index = 0; index < item.mediaItems.length; index += 1) {
                changed = await mediaMigrationApplyMediaItem(item.mediaItems[index], migrationMap, dryRun) || changed;
              }
              const first = item.mediaItems.find((entry) => entry && (entry.src || entry.ref));
              if (!dryRun && first && first.src) {
                if (!item.mediaSrc) item.mediaSrc = first.src;
                if (!item.mediaType) item.mediaType = first.type || "image";
                mediaMigrationSetCloudFields(item, first, false);
              }
            }
            return changed;
          }
          window.emyBrowserMediaMigrationStatus = function browserMediaMigrationStatus() {
            return Object.assign({}, mediaMigrationStatus);
          };
          window.emyMigrateBrowserMediaToCloudinary = function migrateBrowserMediaToCloudinary(options = {}) {
            if (mediaMigrationPromise) return mediaMigrationPromise;
            const keys = Array.isArray(options.keys) && options.keys.length ? options.keys.map(cleanMediaStoreText).filter(Boolean) : mediaMigrationKeys;
            const dryRun = options.dryRun === true;
            mediaMigrationStatus = {
              running: true,
              dryRun,
              totalRefs: 0,
              uploaded: 0,
              reused: 0,
              failed: 0,
              updatedItems: 0,
              updatedKeys: 0,
              currentKey: "",
              lastError: "",
              startedAt: new Date().toISOString(),
              finishedAt: ""
            };
            mediaMigrationEmit();
            mediaMigrationPromise = (async () => {
              const migrationMap = mediaMigrationMap();
              for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
                const key = keys[keyIndex];
                mediaMigrationStatus.currentKey = key;
                mediaMigrationEmit();
                const items = mediaMigrationReadArray(key);
                if (!items.length) continue;
                let keyChanged = false;
                for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
                  const changed = await mediaMigrationApplyItem(items[itemIndex], migrationMap, dryRun);
                  if (changed) {
                    keyChanged = true;
                    mediaMigrationStatus.updatedItems += 1;
                  }
                  if (itemIndex % 3 === 2) await new Promise((resolve) => window.setTimeout(resolve, 0));
                }
                if (keyChanged && !dryRun) {
                  if (mediaMigrationWriteJson(key, items)) mediaMigrationStatus.updatedKeys += 1;
                }
              }
              mediaMigrationStatus.running = false;
              mediaMigrationStatus.currentKey = "";
              mediaMigrationStatus.finishedAt = new Date().toISOString();
              mediaMigrationEmit();
              return Object.assign({}, mediaMigrationStatus);
            })().finally(() => {
              mediaMigrationPromise = null;
            });
            return mediaMigrationPromise;
          };
          function mediaStoreBlobFromDataUrl(dataUrl) {
            const match = String(dataUrl || "").match(/^data:([^;,]+)?(?:;[^,]*)?,(.*)$/);
            if (!match) return null;
            try {
              const mime = match[1] || "application/octet-stream";
              const binary = atob(match[2] || "");
              const bytes = new Uint8Array(binary.length);
              for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
              return new Blob([bytes], { type: mime });
            } catch (error) {
              return null;
            }
          }
          function mediaStoreKnownInlinePhotoKeys() {
            return [
              ["emyMainPendingSignupPhoto", "emyMainPendingSignupPhotoRef"],
              ["emyMainPendingSignupPhotoSrc", "emyMainPendingSignupPhotoRef"],
              ["emyCustomerProfilePhoto", "emyCustomerProfilePhotoRef"],
              ["emyCustomerProfilePhotoSrc", "emyCustomerProfilePhotoRef"],
              ["emyCustomerProfilePhotoBackup", "emyCustomerProfilePhotoRefBackup"],
              ["emyCustomerProfilePhotoSrcBackup", "emyCustomerProfilePhotoRefBackup"],
              ["emyBusinessProfilePhoto", "emyBusinessProfilePhotoRef"],
              ["emyBusinessProfilePhotoSrc", "emyBusinessProfilePhotoRef"],
              ["emyBusinessProfilePhotoBackup", "emyBusinessProfilePhotoRefBackup"],
              ["emyBusinessProfilePhotoSrcBackup", "emyBusinessProfilePhotoRefBackup"],
              ["emyBusinessProfileImage", "emyBusinessProfileImageRef"],
              ["emyBusinessPhoto", "emyBusinessPhotoRef"],
              ["emyBusinessAvatar", "emyBusinessAvatarRef"],
              ["emyBusinessLogo", "emyBusinessLogoRef"],
              ["emyMainPendingSignupBusinessPhoto", "emyMainPendingSignupBusinessPhotoRef"]
            ];
          }
          function mediaStoreSetRefThenRemoveSource(sourceKey, refKey, ref) {
            let saved = false;
            try {
              localStorage.setItem(refKey, ref);
              saved = true;
            } catch (error) {
              try { localStorage.removeItem(sourceKey); } catch (removeError) {}
              try {
                localStorage.setItem(refKey, ref);
                saved = true;
              } catch (innerError) {}
            }
            if (saved) {
              try { localStorage.removeItem(sourceKey); } catch (error) {}
            }
            return saved;
          }
          window.emyTrimLargeInlineMediaStorage = async function trimLargeInlineMediaStorage() {
            let trimmed = 0;
            const pairs = mediaStoreKnownInlinePhotoKeys();
            const storedRefsByValue = new Map();
            for (const pair of pairs) {
              const sourceKey = pair[0];
              const refKey = pair[1];
              let value = "";
              try { value = localStorage.getItem(sourceKey) || ""; } catch (error) { value = ""; }
              if (!/^data:(image|video)\\//i.test(value) || value.length < 120000) continue;
              let existingRef = "";
              try { existingRef = localStorage.getItem(refKey) || ""; } catch (error) { existingRef = ""; }
              if (existingRef) {
                try { localStorage.removeItem(sourceKey); trimmed += 1; } catch (error) {}
                continue;
              }
              const previousRef = storedRefsByValue.get(value);
              if (previousRef && mediaStoreSetRefThenRemoveSource(sourceKey, refKey, previousRef)) {
                trimmed += 1;
                continue;
              }
              const blob = mediaStoreBlobFromDataUrl(value);
              if (!blob) continue;
              try {
                const type = mediaKindFromBlob(blob, /^data:video\\//i.test(value) ? "video" : "image");
                const record = await window.emyStoreFeedMedia(blob, { type, name: sourceKey });
                const ref = record && record.id ? String(record.id) : "";
                if (!ref) continue;
                storedRefsByValue.set(value, ref);
                if (mediaStoreSetRefThenRemoveSource(sourceKey, refKey, ref)) trimmed += 1;
              } catch (error) {}
            }
            return trimmed;
          };
          const scheduleLargeInlineMediaTrim = () => {
            if (window.emyTrimLargeInlineMediaStorage) window.emyTrimLargeInlineMediaStorage().catch(() => 0);
          };
          if (window.requestIdleCallback) window.requestIdleCallback(scheduleLargeInlineMediaTrim, { timeout: 14000 });
          else window.setTimeout(scheduleLargeInlineMediaTrim, 10000);
          const mediaHydrationQueued = new WeakSet();
          let mediaHydrationObserver = null;
          function mediaNodeNearViewport(node) {
            if (!node || !node.getBoundingClientRect) return true;
            if (node.closest && node.closest("[data-item-detail-modal].is-open,.item-detail-modal.is-open,[data-clip-viewer-modal].is-open,.clip-viewer-modal.is-open")) return true;
            try {
              const rect = node.getBoundingClientRect();
              const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
              const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
              const margin = Math.max(360, Math.round(viewportHeight * 0.55));
              return rect.bottom >= -margin && rect.top <= viewportHeight + margin && rect.right >= -margin && rect.left <= viewportWidth + margin;
            } catch (error) {
              return true;
            }
          }
          function mediaNodeShouldLazyHydrate(node, broadScope, count, avatarSelector) {
            if (!node || (!broadScope && count <= 3)) return false;
            if (node.dataset.emyMediaHydrated === "true" || node.dataset.emyPosterHydrated === "true") return false;
            if (node.closest && node.closest(avatarSelector)) return false;
            if (mediaNodeNearViewport(node)) return false;
            return true;
          }
          function mediaHydrationObserverFor() {
            if (!("IntersectionObserver" in window)) return null;
            if (mediaHydrationObserver) return mediaHydrationObserver;
            mediaHydrationObserver = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting && entry.intersectionRatio <= 0) return;
                const node = entry.target;
                mediaHydrationObserver.unobserve(node);
                mediaHydrationQueued.delete(node);
                if (node && node.dataset) node.dataset.emyMediaLazyQueued = "false";
                try { window.emyHydrateFeedMedia(node); } catch (error) {}
              });
            }, { rootMargin: "320px 0px 520px", threshold: 0.01 });
            return mediaHydrationObserver;
          }
          function queueLazyMediaHydration(node) {
            if (!node || mediaHydrationQueued.has(node)) return;
            if (node.dataset) node.dataset.emyMediaLazyQueued = "true";
            const observer = mediaHydrationObserverFor();
            mediaHydrationQueued.add(node);
            if (observer) {
              observer.observe(node);
              return;
            }
            window.setTimeout(() => {
              mediaHydrationQueued.delete(node);
              if (node && node.dataset) node.dataset.emyMediaLazyQueued = "false";
              try { window.emyHydrateFeedMedia(node); } catch (error) {}
            }, 1600);
          }
          window.emyHydrateFeedMedia = function hydrateFeedMedia(root = document) {
            const scope = root && root.querySelectorAll ? root : document;
            const nodes = [];
            if (root && root.nodeType === 1 && root.matches && root.matches("[data-emy-media-ref]")) nodes.push(root);
            scope.querySelectorAll("[data-emy-media-ref]").forEach((node) => nodes.push(node));
            const broadScope = scope === document || root === document || root === document.body || root === document.documentElement;
            const interactionActive = window.emyHomeInteractionActive && window.emyHomeInteractionActive();
            const activationActive = window.emyHomeActivationActive && window.emyHomeActivationActive();
            if ((interactionActive || activationActive) && (broadScope || nodes.length > 3)) {
              if (!window.__EMY_MEDIA_HYDRATE_AFTER_CLICK_PENDING__) {
                window.__EMY_MEDIA_HYDRATE_AFTER_CLICK_PENDING__ = true;
                window.setTimeout(() => {
                  window.__EMY_MEDIA_HYDRATE_AFTER_CLICK_PENDING__ = false;
                  try { window.emyHydrateFeedMedia(root); } catch (error) {}
                }, activationActive ? 4200 : 7600);
              }
              return;
            }
            const avatarSelector = ".social-feed-avatar,.feed-avatar,.post-avatar,.reel-avatar,.home-created-avatar,.business-avatar,.business-top-avatar,.owner-avatar,.business-owned-avatar,.business-profile-hub-avatar,.clip-viewer-avatar,.item-business-avatar,.item-product-avatar,.my-business-avatar,.nearby-business-media,.nearby-popup-media,.profile-avatar,.profile-record-avatar,.customer-business-avatar,.thread-avatar,.message-avatar,.feed-comment-avatar,[data-feed-actor-avatar],[data-business-top-avatar],[data-business-owned-avatar],[data-owner-avatar],[data-item-business-avatar],[data-item-product-avatar],[data-public-avatar],[data-detail-avatar]";
            const contentMediaSelector = "[data-business-posted-media],.social-feed-media,.feed-article-card-cover,.feed-job-hero,.feed-event-post-hero,.home-created-media,.photo,.item-detail-art,.feed-media-carousel,.feed-event-preview,.feed-product-card,.content-tile .tile-media,[data-emy-video-player]";
            function nodeCarriesDetailMedia(node) {
              if (!node || !node.closest) return false;
              if (node.closest(avatarSelector)) return false;
              return !!node.closest(contentMediaSelector);
            }
            function isInactiveCarouselSlideNode(node) {
              const slide = node && node.closest && node.closest("[data-feed-carousel-slide]");
              return !!(slide && !slide.classList.contains("is-active"));
            }
            nodes.forEach((node) => {
              const ref = cleanMediaStoreText(node.dataset.emyMediaRef);
              if (!ref || node.dataset.emyMediaHydrating === "true") return;
              if (isInactiveCarouselSlideNode(node)) return;
              if (node.tagName === "IMG") {
                try { node.loading = node.loading || "lazy"; node.decoding = node.decoding || "async"; } catch (error) {}
              } else if (node.tagName === "VIDEO" && !node.closest("[data-item-detail-modal].is-open,.item-detail-modal.is-open,[data-clip-viewer-modal].is-open,.clip-viewer-modal.is-open")) {
                try { node.preload = "metadata"; node.setAttribute("preload", "metadata"); } catch (error) {}
              }
              if (mediaNodeShouldLazyHydrate(node, broadScope, nodes.length, avatarSelector)) {
                queueLazyMediaHydration(node);
                return;
              }
              node.dataset.emyMediaHydrating = "true";
              window.emyResolveFeedMedia(ref).then((record) => {
                if (!record || !record.url) return;
                const currentUrl = cleanMediaStoreText(node.getAttribute("src") || node.currentSrc || "");
                const alreadyLoaded = currentUrl === record.url || (node.dataset.emyMediaHydratedRef === ref && node.dataset.emyMediaHydratedUrl === record.url);
                if (!alreadyLoaded) node.src = record.url;
                node.dataset.emyMediaHydrated = "true";
                node.dataset.emyMediaHydratedRef = ref;
                node.dataset.emyMediaHydratedUrl = record.url;
                if (node.tagName === "VIDEO") {
                  if (!alreadyLoaded) node.load();
                  const player = node.closest("[data-emy-video-player]");
                  if (player) player.classList.remove("has-media-error");
                }
                const card = node.closest("[data-feed-id], [data-card]");
                if (card && card.dataset && nodeCarriesDetailMedia(node)) {
                  card.dataset.detailMediaSrc = record.url;
                  card.dataset.detailMediaType = record.mediaType || (node.tagName === "VIDEO" ? "video" : "image");
                  card.dataset.detailMediaRef = ref;
                }
                if (!alreadyLoaded && window.emySetupVideoPlayers) window.emySetupVideoPlayers(node.closest("[data-emy-video-player]") || node.parentElement || document);
              }).catch(() => {
                const player = node.closest("[data-emy-video-player]");
                const error = player && player.querySelector("[data-emy-video-error]");
                if (player) player.classList.add("has-media-error");
                if (error) {
                  error.textContent = "This saved video could not be loaded from this browser storage.";
                  error.hidden = false;
                }
              }).finally(() => {
                node.dataset.emyMediaHydrating = "false";
              });
            });
            const posterNodes = [];
            if (root && root.nodeType === 1 && root.matches && root.matches("[data-emy-poster-ref]")) posterNodes.push(root);
            scope.querySelectorAll("[data-emy-poster-ref]").forEach((node) => posterNodes.push(node));
            posterNodes.forEach((node) => {
              const ref = cleanMediaStoreText(node.dataset.emyPosterRef);
              if (!ref || node.dataset.emyPosterHydrating === "true") return;
              if (isInactiveCarouselSlideNode(node)) return;
              if (mediaNodeShouldLazyHydrate(node, broadScope, posterNodes.length, avatarSelector)) {
                queueLazyMediaHydration(node);
                return;
              }
              node.dataset.emyPosterHydrating = "true";
              window.emyResolveFeedMedia(ref).then((record) => {
                if (!record || !record.url) return;
                if (node.tagName === "VIDEO") node.poster = record.url;
                else node.style.backgroundImage = 'url("' + String(record.url).replace(/"/g, '\\"') + '")';
                node.dataset.emyPosterHydrated = "true";
                const card = node.closest("[data-feed-id], [data-card]");
                if (card && card.dataset) {
                  card.dataset.detailPosterSrc = record.url;
                  card.dataset.detailPosterRef = ref;
                }
              }).catch(() => {}).finally(() => {
                node.dataset.emyPosterHydrating = "false";
              });
            });
          };
          function readRepairArray(key) {
            try {
              const parsed = JSON.parse(localStorage.getItem(key) || "[]");
              return Array.isArray(parsed) ? parsed : [];
            } catch (error) {
              return [];
            }
          }
          function repairSourceItems() {
            const keys = [
              "emyFeedCreatedPosts",
              "emyFeedCreatedJobs",
              "emyFeedCreatedEvents",
              "emyBusinessFeedPosts",
              "emyBusinessPosts",
              "emyBusinessJobs",
              "emyBusinessJobPosts",
              "emyBusinessEvents",
              "emyBusinessEventPosts",
              "emyBusinessProducts",
              "emyBusinessProductList",
              "emyBusinessProductPosts",
              "emyBusinessReels",
              "emyBusinessClips",
              "emyBusinessProductReels",
              "emyFeedCreatedClipsByBusiness",
              "emyUploadedClips"
            ];
            const byId = new Map();
            keys.forEach((key) => {
              readRepairArray(key).forEach((item) => {
                const id = cleanMediaStoreText(item && item.id);
                if (id && !byId.has(id)) byId.set(id, item);
              });
            });
            return byId;
          }
          function repairKnownProfileMedia(source, kind) {
            const suffix = kind === "ref" ? "Ref" : "";
            const item = source && typeof source === "object" ? source : {};
            return [
              "emyCustomerProfilePhoto" + suffix,
              "emyCustomerProfilePhotoSrc" + suffix,
              "emyCustomerAvatar" + suffix,
              "emyCustomerPhoto" + suffix,
              "emyCustomerProfileImage" + suffix,
              "emyBusinessOwnerCustomerPhoto" + suffix,
              "emyBusinessProfilePhoto" + suffix,
              "emyBusinessProfileImage" + suffix,
              "emyBusinessPhoto" + suffix,
              "emyBusinessAvatar" + suffix,
              "emyBusinessLogo" + suffix,
              "emyMainPendingSignupPhoto" + suffix,
              "emyMainPendingSignupBusinessPhoto" + suffix
            ].map((key) => cleanMediaStoreText(localStorage.getItem(key))).concat([
              item.avatarSrc,
              item.avatar,
              item.profilePhoto,
              item.businessPhoto,
              item.customerPhoto,
              item.ownerPhoto,
              item.viewerPhoto,
              item.repostedByPhoto,
              item.logo,
              item.avatarRef,
              item.profilePhotoRef,
              item.businessPhotoRef,
              item.customerPhotoRef,
              item.ownerPhotoRef,
              item.viewerPhotoRef,
              item.repostedByPhotoRef,
              item.logoRef
            ].map(cleanMediaStoreText)).filter(Boolean);
          }
          function repairContentSrc(value, source) {
            const clean = cleanMediaStoreText(value);
            return clean && !repairKnownProfileMedia(source, "src").includes(clean) ? clean : "";
          }
          function repairContentRef(value, source) {
            const clean = cleanMediaStoreText(value);
            return clean && !repairKnownProfileMedia(source, "ref").includes(clean) ? clean : "";
          }
          function repairMediaPayload(source) {
            const settings = source && (source.mediaSettings || source.coverSettings || source.eventCoverSettings || source.jobCoverSettings) || {};
            const items = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(source || {}) : [];
            const mediaItems = items.map((item) => {
              const itemRef = repairContentRef(item && (item.ref || item.mediaRef), source);
              const itemSrc = itemRef ? "" : repairContentSrc(item && (item.src || item.mediaSrc || item.image || item.video || item.url), source);
              if (!itemSrc && !itemRef) return null;
              return Object.assign({}, item, {
                src: itemSrc,
                ref: itemRef,
                mediaSrc: itemSrc,
                mediaRef: itemRef
              });
            }).filter(Boolean);
            const first = mediaItems[0] || {};
            const ref = repairContentRef(first.ref || source && (source.mediaRef || source.imageRef || source.videoRef || source.coverRef || source.eventCoverRef || source.jobCoverRef), source);
            const src = ref ? "" : repairContentSrc(first.src || source && (source.mediaSrc || source.image || source.video || source.coverSrc || source.eventCoverSrc || source.jobCoverSrc || source.thumbnail || source.thumb) || "", source);
            const type = src || ref ? cleanMediaStoreText(first.type || source && (source.mediaType || source.coverType || source.eventCoverType || source.jobCoverType) || (source && source.video ? "video" : "image")).toLowerCase() : "";
            const posterRef = cleanMediaStoreText(first.posterRef || first.thumbnailRef || source && (source.posterRef || source.thumbnailRef || source.coverPosterRef || source.eventCoverPosterRef || source.jobCoverPosterRef) || settings.posterRef || settings.thumbnailRef);
            const posterSrc = posterRef ? "" : String(first.posterSrc || first.thumbnailSrc || source && (source.posterSrc || source.thumbnailSrc || source.coverPosterSrc || source.eventCoverPosterSrc || source.jobCoverPosterSrc) || settings.posterSrc || settings.thumbnailSrc || "");
            return {
              mediaItems,
              mediaRef: ref,
              mediaSrc: src,
              mediaType: type === "video" ? "video" : type === "image" ? "image" : "",
              posterRef,
              posterSrc,
              articleBody: source && source.articleBody || "",
              articleShare: source && (source.articleShare || source.shareText) || "",
              articleReadTime: source && (source.articleReadTime || source.readTime) || ""
            };
          }
          window.emyRepairFeedRepostMedia = function repairFeedRepostMedia(items, options = {}) {
            if (!Array.isArray(items) || !items.length) return Array.isArray(items) ? items : [];
            const sources = repairSourceItems();
            let changed = false;
            const repaired = items.map((item) => {
              const original = item && item.original;
              const originalId = cleanMediaStoreText(item && (item.originalId || original && original.id));
              const thought = cleanMediaStoreText(item && (item.repostThought || item.thought));
              const needsThoughtAlias = !!(thought && item && !item.repostThought);
              if (!original || !originalId || !sources.has(originalId)) {
                if (needsThoughtAlias) {
                  changed = true;
                  return Object.assign({}, item, { repostThought: thought, thought });
                }
                return item;
              }
              const payload = repairMediaPayload(sources.get(originalId));
              const hasDurableOriginalMedia = !!(original.mediaRef || (Array.isArray(original.mediaItems) && original.mediaItems.length) || (original.mediaSrc && !/^blob:/i.test(original.mediaSrc)));
              if (hasDurableOriginalMedia && original.mediaType && (original.articleBody || !payload.articleBody)) return item;
              const nextOriginal = Object.assign({}, original);
              let itemChanged = false;
              if (!hasDurableOriginalMedia) {
                if (payload.mediaRef) {
                  nextOriginal.mediaRef = payload.mediaRef;
                  nextOriginal.mediaSrc = "";
                  itemChanged = true;
                } else if (payload.mediaSrc && (!nextOriginal.mediaSrc || /^blob:/i.test(nextOriginal.mediaSrc))) {
                  nextOriginal.mediaSrc = payload.mediaSrc;
                  itemChanged = true;
                }
                if (payload.mediaItems.length && !(Array.isArray(nextOriginal.mediaItems) && nextOriginal.mediaItems.length)) {
                  nextOriginal.mediaItems = payload.mediaItems;
                  itemChanged = true;
                }
              }
              if (payload.mediaType && !nextOriginal.mediaType) {
                nextOriginal.mediaType = payload.mediaType;
                itemChanged = true;
              }
              if (payload.posterRef && !nextOriginal.posterRef) {
                nextOriginal.posterRef = payload.posterRef;
                nextOriginal.posterSrc = "";
                itemChanged = true;
              } else if (payload.posterSrc && !nextOriginal.posterSrc) {
                nextOriginal.posterSrc = payload.posterSrc;
                itemChanged = true;
              }
              if (payload.articleBody && !nextOriginal.articleBody) {
                nextOriginal.articleBody = payload.articleBody;
                itemChanged = true;
              }
              if (payload.articleShare && !nextOriginal.articleShare) {
                nextOriginal.articleShare = payload.articleShare;
                itemChanged = true;
              }
              if (payload.articleReadTime && !nextOriginal.articleReadTime) {
                nextOriginal.articleReadTime = payload.articleReadTime;
                itemChanged = true;
              }
              if (needsThoughtAlias) itemChanged = true;
              if (!itemChanged) return item;
              changed = true;
              return Object.assign({}, item, needsThoughtAlias ? { repostThought: thought, thought } : {}, { original: nextOriginal });
            });
            if (changed && options.persist) {
              try {
                localStorage.setItem("emyFeedReposts", JSON.stringify(repaired));
              } catch (error) {}
            }
            return repaired;
          };
        })();
`;

const emyMediaEditorRuntimeScript = String.raw`
        (function setupEmyMediaEditorRuntime() {
          if (window.emyOpenMediaEditor && window.emyApplyMediaEditPreview) return;
          function esc(value) {
            return String(value || "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[char]));
          }
          function clampNumber(value, min, max, fallback) {
            const number = Number(value);
            if (!Number.isFinite(number)) return fallback;
            return Math.max(min, Math.min(max, number));
          }
          function overlayPosition(settings) {
            const source = settings || {};
            return {
              x: clampNumber(source.overlayX ?? source.textX ?? source.overlayLeft, 8, 92, 50),
              y: clampNumber(source.overlayY ?? source.textY ?? source.overlayTop, 10, 90, 84)
            };
          }
          function applyOverlayPosition(node, settings) {
            if (!node) return;
            const position = overlayPosition(settings);
            node.style.setProperty("--overlay-x", position.x + "%");
            node.style.setProperty("--overlay-y", position.y + "%");
          }
          function overlayHasText(settings) {
            return String(settings && settings.overlay || "").trim().length > 0;
          }
          function mediaDefaultSettings(type) {
            return { fit: "contain", zoom: 1, x: 0, y: 0, aspect: "auto", overlay: "", overlayX: 50, overlayY: 84, muted: type === "video", posterSrc: "", posterRef: "" };
          }
          function normaliseSettings(type, settings) {
            const next = Object.assign(mediaDefaultSettings(type), settings || {});
            const position = overlayPosition(next);
            next.overlay = String(next.overlay || "");
            next.overlayX = position.x;
            next.overlayY = position.y;
            return next;
          }
          function posterSrcFromSettings(settings) {
            return String(settings && (settings.posterSrc || settings.thumbnailSrc) || "");
          }
          function posterRefFromSettings(settings) {
            return String(settings && (settings.posterRef || settings.thumbnailRef) || "");
          }
          function mediaAspectValue(settings, fallback) {
            const value = settings && settings.aspect ? String(settings.aspect) : "auto";
            return value === "auto" ? (fallback || "1 / 1") : value;
          }
          function applyMediaEditPreview(container, settings) {
            if (!container) return;
            const next = normaliseSettings("", settings);
            const fallbackAspect = next.naturalAspect || container.dataset.mediaNaturalAspect || container.dataset.emyMediaNaturalAspect || "1 / 1";
            container.style.setProperty("--media-fit", next.fit || "contain");
            container.style.setProperty("--media-zoom", String(next.zoom || 1));
            container.style.setProperty("--media-x", (Number(next.x) || 0) + "%");
            container.style.setProperty("--media-y", (Number(next.y) || 0) + "%");
            container.style.setProperty("--media-aspect-ratio", mediaAspectValue(next, fallbackAspect));
            applyOverlayPosition(container, next);
            const media = container.querySelector("img:not([hidden]), video:not([hidden])");
            if (media) {
              media.style.objectFit = next.fit || "contain";
              media.style.transform = "translate(" + (Number(next.x) || 0) + "%, " + (Number(next.y) || 0) + "%) scale(" + (Number(next.zoom) || 1) + ")";
            }
            let overlay = container.querySelector("[data-emy-media-overlay]");
            if (!overlay) {
              overlay = document.createElement("span");
              overlay.className = "emy-media-overlay-text";
              overlay.dataset.emyMediaOverlay = "true";
              container.appendChild(overlay);
            }
            overlay.textContent = next.overlay || "";
            overlay.hidden = !overlayHasText(next);
            applyOverlayPosition(overlay, next);
          }
          function ensureEditor() {
            let modal = document.querySelector("[data-emy-media-editor]");
            if (modal) return modal;
            modal = document.createElement("div");
            modal.className = "emy-media-editor-modal";
            modal.dataset.emyMediaEditor = "true";
            modal.setAttribute("aria-hidden", "true");
            modal.innerHTML =
              '<section class="emy-media-editor" role="dialog" aria-modal="true" aria-labelledby="emy-media-editor-title">' +
                '<header class="emy-media-editor-head"><span><h2 id="emy-media-editor-title" data-emy-media-editor-title>Edit media</h2><p data-emy-media-editor-help>Fit the media, add text if needed, then apply it to your post.</p></span><button type="button" data-emy-media-editor-close aria-label="Close media editor">x</button></header>' +
                '<div class="emy-media-editor-body">' +
                  '<div class="emy-media-editor-preview"><div class="emy-media-editor-stage" data-emy-media-editor-stage><img data-emy-media-editor-image hidden alt="" /><video data-emy-media-editor-video controls playsinline hidden></video><span class="emy-media-overlay-text" data-emy-media-editor-overlay hidden></span></div></div>' +
                  '<aside class="emy-media-editor-panel">' +
                    '<label>Text on media<input data-emy-media-editor-overlay-input maxlength="80" placeholder="Optional text on top of the photo or video" /></label>' +
                    '<div class="emy-media-editor-product-fields" data-emy-media-editor-product-fields hidden>' +
                      '<strong>Product clip details</strong>' +
                      '<label>Product name<input data-emy-media-editor-product-name maxlength="80" placeholder="Ex: Garlic bread, steel bottle" /></label>' +
                      '<label>Price<span class="emy-media-editor-money-row"><select data-emy-media-editor-product-currency aria-label="Currency"><option value="GBP" selected>GBP (&pound;)</option><option value="EUR">EUR (&euro;)</option><option value="USD">USD ($)</option></select><input data-emy-media-editor-product-price type="text" inputmode="decimal" autocomplete="off" maxlength="12" pattern="[0-9]+([.][0-9]{1,2})?" placeholder="0.00" aria-label="Product price amount" /></span></label>' +
                      '<label>Availability<select data-emy-media-editor-product-availability><option value="In stock">In stock</option><option value="Limited stock">Limited stock</option><option value="Made to order">Made to order</option><option value="Available today">Available today</option><option value="Out of stock">Out of stock</option></select></label>' +
                      '<label>Category<select data-emy-media-editor-product-category required><option value="">Choose category</option><option>Food and drink</option><option>Retail</option><option>Beauty and wellness</option><option>Home services</option><option>Technology</option><option>Professional services</option><option>Other</option></select></label>' +
                      '<label class="is-wide">Product details<textarea data-emy-media-editor-product-description maxlength="220" placeholder="What is shown in the clip? Size, colour, pickup, offer, or key detail."></textarea></label>' +
                    '</div>' +
                    '<div class="emy-media-editor-choice" data-emy-media-fit><button type="button" data-fit="contain">Fit whole</button><button type="button" data-fit="cover">Fill frame</button></div>' +
                    '<label>Frame<select data-emy-media-editor-aspect><option value="auto">Original camera</option><option value="1 / 1">Square post</option><option value="4 / 5">Portrait post</option><option value="9 / 16">Phone clip</option><option value="16 / 9">Wide video</option></select></label>' +
                    '<label>Zoom<input type="range" min="1" max="2" step=".01" data-emy-media-editor-zoom /></label>' +
                    '<label>Move left / right<input type="range" min="-35" max="35" step="1" data-emy-media-editor-x /></label>' +
                    '<label>Move up / down<input type="range" min="-35" max="35" step="1" data-emy-media-editor-y /></label>' +
                    '<div class="emy-media-editor-thumbnail" data-emy-media-editor-thumbnail hidden>' +
                      '<strong>Video thumbnail</strong>' +
                      '<span class="emy-media-editor-thumbnail-preview" data-emy-media-editor-thumbnail-preview>No thumbnail selected</span>' +
                      '<input type="file" accept="image/*" data-emy-media-editor-thumbnail-file hidden />' +
                      '<span class="emy-media-editor-thumbnail-actions"><button type="button" data-emy-media-editor-thumbnail-choose>Choose thumbnail</button><button type="button" data-emy-media-editor-thumbnail-clear hidden>Remove</button></span>' +
                      '<small>This image shows before the video starts.</small>' +
                    '</div>' +
                    '<label class="emy-media-editor-muted" data-emy-media-editor-muted-wrap><input type="checkbox" data-emy-media-editor-muted /> Mute this video in preview</label>' +
                  '</aside>' +
                '</div>' +
                '<footer class="emy-media-editor-foot"><button type="button" data-emy-media-editor-reset>Reset</button><span></span><button type="button" data-emy-media-editor-apply>Apply media</button><button type="button" data-emy-media-editor-post>Post now</button></footer>' +
              '</section>';
            document.body.appendChild(modal);
            return modal;
          }
          function setOpen(modal, open) {
            modal.classList.toggle("is-open", !!open);
            modal.setAttribute("aria-hidden", open ? "false" : "true");
            document.body.classList.toggle("emy-media-editor-locked", !!open);
          }
          window.emyDefaultMediaEditSettings = mediaDefaultSettings;
          window.emyApplyMediaEditPreview = applyMediaEditPreview;
          window.emyOpenMediaEditor = function openMediaEditor(options) {
            const opts = options || {};
            const type = opts.type === "video" ? "video" : "image";
            const modal = ensureEditor();
            const title = modal.querySelector("[data-emy-media-editor-title]");
            const help = modal.querySelector("[data-emy-media-editor-help]");
            const stage = modal.querySelector("[data-emy-media-editor-stage]");
            const image = modal.querySelector("[data-emy-media-editor-image]");
            const video = modal.querySelector("[data-emy-media-editor-video]");
            const overlay = modal.querySelector("[data-emy-media-editor-overlay]");
            const overlayInput = modal.querySelector("[data-emy-media-editor-overlay-input]");
            const productFields = modal.querySelector("[data-emy-media-editor-product-fields]");
            const productNameInput = modal.querySelector("[data-emy-media-editor-product-name]");
            const productCurrencyInput = modal.querySelector("[data-emy-media-editor-product-currency]");
            const productPriceInput = modal.querySelector("[data-emy-media-editor-product-price]");
            const productAvailabilityInput = modal.querySelector("[data-emy-media-editor-product-availability]");
            const productCategoryInput = modal.querySelector("[data-emy-media-editor-product-category]");
            const productDescriptionInput = modal.querySelector("[data-emy-media-editor-product-description]");
            const fitButtons = Array.from(modal.querySelectorAll("[data-emy-media-fit] button"));
            const aspect = modal.querySelector("[data-emy-media-editor-aspect]");
            const zoom = modal.querySelector("[data-emy-media-editor-zoom]");
            const x = modal.querySelector("[data-emy-media-editor-x]");
            const y = modal.querySelector("[data-emy-media-editor-y]");
            const thumbnailWrap = modal.querySelector("[data-emy-media-editor-thumbnail]");
            const thumbnailPreview = modal.querySelector("[data-emy-media-editor-thumbnail-preview]");
            const thumbnailFile = modal.querySelector("[data-emy-media-editor-thumbnail-file]");
            const thumbnailChoose = modal.querySelector("[data-emy-media-editor-thumbnail-choose]");
            const thumbnailClear = modal.querySelector("[data-emy-media-editor-thumbnail-clear]");
            const mutedWrap = modal.querySelector("[data-emy-media-editor-muted-wrap]");
            const muted = modal.querySelector("[data-emy-media-editor-muted]");
            const applyButton = modal.querySelector("[data-emy-media-editor-apply]");
            const postButton = modal.querySelector("[data-emy-media-editor-post]");
            const productMode = !!(opts.productClip || opts.productClipDetails);
            const productDetails = opts.productClipDetails || {};
            let settings = normaliseSettings(type, opts.settings);
            let naturalAspect = "1 / 1";
            let overlayDragPointer = null;
            const productCurrencies = ["GBP", "EUR", "USD"];
            const productCategories = ["Food and drink", "Retail", "Beauty and wellness", "Home services", "Technology", "Professional services", "Other"];
            const productCategoryAliases = {
              food: "Food and drink",
              drink: "Food and drink",
              "food drink": "Food and drink",
              "food and drink": "Food and drink",
              beauty: "Beauty and wellness",
              skincare: "Beauty and wellness",
              wellness: "Beauty and wellness",
              health: "Beauty and wellness",
              home: "Home services",
              homeware: "Home services",
              "home and garden": "Home services",
              garden: "Home services",
              tech: "Technology",
              technology: "Technology",
              electronics: "Technology",
              professional: "Professional services",
              "professional services": "Professional services",
              services: "Professional services",
              shop: "Retail",
              product: "Retail",
              products: "Retail",
              retail: "Retail",
              fashion: "Retail",
              bottle: "Retail",
              bottles: "Retail"
            };
            function productText(value, fallback) {
              const text = String(value || "").replace(/\s+/g, " ").trim();
              return text || (fallback || "");
            }
            function productCurrencyCode(value) {
              const code = productText(value).toUpperCase();
              return productCurrencies.includes(code) ? code : "GBP";
            }
            function sanitiseProductPrice(value) {
              const raw = String(value || "").replace(/,/g, ".").replace(/[^0-9.]/g, "");
              if (!raw) return "";
              const hasDot = raw.indexOf(".") !== -1;
              const parts = raw.split(".");
              let whole = (parts.shift() || "").replace(/^0+(?=\d)/, "");
              if (whole.length > 7) whole = whole.slice(0, 7);
              const decimals = parts.join("").slice(0, 2);
              if (!whole && hasDot) whole = "0";
              return whole + (hasDot ? "." + decimals : "");
            }
            function normaliseProductPriceAmount(value) {
              const clean = sanitiseProductPrice(value);
              if (!clean) return "";
              const number = Number(clean);
              if (!Number.isFinite(number) || number < 0) return "";
              return number.toFixed(2);
            }
            function formatProductMoney(amount, currencyCode) {
              const number = Number(amount);
              if (!Number.isFinite(number) || number < 0) return "";
              const code = productCurrencyCode(currencyCode);
              const locale = code === "USD" ? "en-US" : (code === "EUR" ? "en-IE" : "en-GB");
              try {
                return new Intl.NumberFormat(locale, { style: "currency", currency: code, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
              } catch (error) {
                return code + " " + number.toFixed(2);
              }
            }
            function productPriceParts(value, fallbackCurrency) {
              const text = productText(value);
              let code = productCurrencyCode(fallbackCurrency);
              if (/\bEUR\b|\u20ac/i.test(text)) code = "EUR";
              if (/\bUSD\b|\$/i.test(text)) code = "USD";
              if (/\bGBP\b|\u00a3/i.test(text)) code = "GBP";
              const match = text.replace(/,/g, ".").match(/\d+(?:\.\d{1,2})?/);
              const amount = normaliseProductPriceAmount(match && match[0] || value || "");
              return { amount, currencyCode: code, text: amount ? formatProductMoney(amount, code) : "" };
            }
            function productCategory(value) {
              const raw = productText(value);
              if (!raw) return "";
              const direct = productCategories.find((category) => category.toLowerCase() === raw.toLowerCase());
              if (direct) return direct;
              const key = raw.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
              return productCategoryAliases[key] || "";
            }
            function readProductDetails() {
              const rawPrice = productPriceInput && productPriceInput.value.trim() || "";
              const currencyCode = productCurrencyCode(productCurrencyInput && productCurrencyInput.value);
              const priceAmount = normaliseProductPriceAmount(rawPrice);
              return {
                productName: productNameInput && productNameInput.value.trim() || "",
                rawPrice,
                priceAmount,
                currencyCode,
                currency: currencyCode,
                priceCurrency: currencyCode,
                priceText: priceAmount ? formatProductMoney(priceAmount, currencyCode) : "",
                availability: productAvailabilityInput && productAvailabilityInput.value || "",
                category: productCategory(productCategoryInput && productCategoryInput.value),
                productDescription: productDescriptionInput && productDescriptionInput.value.trim() || ""
              };
            }
            function syncProductDetails() {
              if (!productMode || typeof opts.onProductDetailsChange !== "function") return;
              opts.onProductDetailsChange(readProductDetails());
            }
            function setNaturalAspect(width, height) {
              const w = Number(width) || 0;
              const h = Number(height) || 0;
              if (w > 0 && h > 0) {
                naturalAspect = w + " / " + h;
                settings.naturalAspect = naturalAspect;
                if (stage) stage.dataset.mediaNaturalAspect = naturalAspect;
                render();
              }
            }
            if (title) title.textContent = type === "video" ? "Edit video" : "Edit photo";
            if (help) help.textContent = type === "video" ? "Preview the full video, choose the frame, fit it properly, and add text if you want." : "Preview the full image, crop or fit it, and add text if you want.";
            if (productFields) productFields.hidden = !productMode;
            const productPriceInfo = productPriceParts(productDetails.priceText || productDetails.price || productDetails.amount || productDetails.priceAmount || "", productDetails.currencyCode || productDetails.currency || productDetails.priceCurrency);
            if (productNameInput) productNameInput.value = productDetails.productName || productDetails.productTitle || "";
            if (productCurrencyInput) productCurrencyInput.value = productPriceInfo.currencyCode;
            if (productPriceInput) productPriceInput.value = productPriceInfo.amount;
            if (productAvailabilityInput) productAvailabilityInput.value = productDetails.availability || productDetails.stockStatus || "In stock";
            if (productCategoryInput) productCategoryInput.value = productCategory(productDetails.category || productDetails.productCategory || productDetails.productType) || "";
            if (productDescriptionInput) productDescriptionInput.value = productDetails.productDescription || productDetails.productInfo || "";
            if (image) {
              image.hidden = type !== "image";
              image.onload = type === "image" ? () => setNaturalAspect(image.naturalWidth, image.naturalHeight) : null;
              if (type === "image") image.src = opts.src || "";
              else {
                image.onload = null;
                image.removeAttribute("src");
              }
            }
            if (video) {
              video.hidden = type !== "video";
              video.pause();
              video.onloadedmetadata = type === "video" ? () => setNaturalAspect(video.videoWidth, video.videoHeight) : null;
              if (type === "video") {
                video.src = opts.src || "";
                video.muted = !!settings.muted;
                const posterSrc = posterSrcFromSettings(settings);
                const posterRef = posterRefFromSettings(settings);
                if (posterSrc) video.poster = posterSrc;
                else video.removeAttribute("poster");
                if (posterRef) video.setAttribute("data-emy-poster-ref", posterRef);
                else video.removeAttribute("data-emy-poster-ref");
              } else {
                video.onloadedmetadata = null;
                video.removeAttribute("src");
                video.removeAttribute("poster");
                video.removeAttribute("data-emy-poster-ref");
              }
            }
            if (thumbnailWrap) thumbnailWrap.hidden = type !== "video";
            if (thumbnailFile) thumbnailFile.value = "";
            if (mutedWrap) mutedWrap.hidden = type !== "video";
            if (applyButton) applyButton.textContent = opts.applyLabel || (productMode ? "Apply media and details" : "Apply media");
            if (postButton) {
              postButton.textContent = opts.postLabel || (productMode ? "Post product clip" : "Post now");
              postButton.hidden = !!opts.hidePostButton;
            }
            function syncControls() {
              if (overlayInput && document.activeElement !== overlayInput) overlayInput.value = settings.overlay || "";
              if (aspect) aspect.value = settings.aspect || "auto";
              if (zoom) zoom.value = String(settings.zoom || 1);
              if (x) x.value = String(settings.x || 0);
              if (y) y.value = String(settings.y || 0);
              if (muted) muted.checked = !!settings.muted;
              fitButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.fit === settings.fit));
            }
            function updateThumbnailControls() {
              if (!thumbnailWrap || type !== "video") return;
              const isPhoneFrame = mediaAspectValue(settings, naturalAspect) === "9 / 16";
              thumbnailWrap.classList.toggle("is-phone-frame", isPhoneFrame);
              const posterSrc = posterSrcFromSettings(settings);
              const posterRef = posterRefFromSettings(settings);
              const hasPoster = !!(posterSrc || posterRef);
              if (thumbnailPreview) {
                thumbnailPreview.innerHTML = posterSrc ? '<img src="' + esc(posterSrc) + '" alt="" />' : (posterRef ? "Saved thumbnail selected" : "No thumbnail selected");
              }
              if (thumbnailChoose) thumbnailChoose.textContent = hasPoster ? "Change thumbnail" : "Choose thumbnail";
              if (thumbnailClear) thumbnailClear.hidden = !hasPoster;
              if (video) {
                if (posterSrc) video.poster = posterSrc;
                else video.removeAttribute("poster");
                if (posterRef) video.setAttribute("data-emy-poster-ref", posterRef);
                else video.removeAttribute("data-emy-poster-ref");
                if (!posterSrc && posterRef && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(video);
              }
            }
            function readThumbnailFile(file) {
              return new Promise((resolve) => {
                if (!file || !window.FileReader) { resolve(""); return; }
                const reader = new FileReader();
                reader.addEventListener("load", () => resolve(String(reader.result || "")), { once: true });
                reader.addEventListener("error", () => resolve(""), { once: true });
                reader.readAsDataURL(file);
              });
            }
            function setThumbnailFile(file) {
              if (!file || !String(file.type || "").toLowerCase().startsWith("image/")) return;
              Promise.all([
                readThumbnailFile(file),
                window.emyStoreFeedMedia ? window.emyStoreFeedMedia(file, { type:"image", name:file.name || "video-thumbnail" }).catch(() => null) : Promise.resolve(null)
              ]).then(([src, record]) => {
                settings.posterSrc = src || "";
                settings.thumbnailSrc = settings.posterSrc;
                settings.posterRef = record && record.id || "";
                settings.thumbnailRef = settings.posterRef;
                updateThumbnailControls();
              });
            }
            function setOverlayFromPointer(event) {
              if (!stage) return;
              const rect = stage.getBoundingClientRect();
              if (!rect.width || !rect.height) return;
              settings.overlayX = clampNumber(((event.clientX - rect.left) / rect.width) * 100, 8, 92, 50);
              settings.overlayY = clampNumber(((event.clientY - rect.top) / rect.height) * 100, 10, 90, 84);
              render();
            }
            function startOverlayDrag(event) {
              if (!overlay || overlay.hidden || !overlayHasText(settings)) return;
              event.preventDefault();
              event.stopPropagation();
              overlayDragPointer = event.pointerId;
              overlay.classList.add("is-dragging");
              if (overlay.setPointerCapture) overlay.setPointerCapture(event.pointerId);
              setOverlayFromPointer(event);
            }
            function moveOverlayDrag(event) {
              if (overlayDragPointer !== event.pointerId) return;
              event.preventDefault();
              event.stopPropagation();
              setOverlayFromPointer(event);
            }
            function endOverlayDrag(event) {
              if (overlayDragPointer !== event.pointerId) return;
              event.preventDefault();
              event.stopPropagation();
              overlayDragPointer = null;
              if (overlay) overlay.classList.remove("is-dragging");
            }
            function render() {
              if (stage) {
                const aspectValue = mediaAspectValue(settings, naturalAspect);
                stage.style.setProperty("--media-fit", settings.fit || "contain");
                stage.style.setProperty("--media-zoom", String(settings.zoom || 1));
                stage.style.setProperty("--media-x", (Number(settings.x) || 0) + "%");
                stage.style.setProperty("--media-y", (Number(settings.y) || 0) + "%");
                stage.style.setProperty("--media-aspect-ratio", aspectValue);
                applyOverlayPosition(stage, settings);
                stage.classList.toggle("is-phone-frame", aspectValue === "9 / 16");
                const active = type === "video" ? video : image;
                if (active) {
                  active.style.objectFit = settings.fit || "contain";
                  active.style.transform = "translate(" + (Number(settings.x) || 0) + "%, " + (Number(settings.y) || 0) + "%) scale(" + (Number(settings.zoom) || 1) + ")";
                }
              }
              if (video && type === "video") video.muted = !!settings.muted;
              if (overlay) {
                overlay.textContent = settings.overlay || "";
                overlay.hidden = !overlayHasText(settings);
                overlay.title = "Drag to move text";
                applyOverlayPosition(overlay, settings);
              }
              updateThumbnailControls();
              syncControls();
            }
            function apply(submitNow) {
              if (submitNow && productMode) {
                const details = readProductDetails();
                if (!details.productName) {
                  if (typeof opts.showToast === "function") opts.showToast("Add the product name before posting this product clip.");
                  if (productNameInput) productNameInput.focus();
                  return;
                }
                if (details.rawPrice && !details.priceAmount) {
                  if (typeof opts.showToast === "function") opts.showToast("Use numbers only for price, for example 12.99.");
                  if (productPriceInput) productPriceInput.focus();
                  return;
                }
                if (!details.category) {
                  if (typeof opts.showToast === "function") opts.showToast("Choose a product category.");
                  if (productCategoryInput) productCategoryInput.focus();
                  return;
                }
              }
              syncProductDetails();
              setOpen(modal, false);
              if (video) video.pause();
              if (typeof opts.onApply === "function") opts.onApply(Object.assign({}, settings), !!submitNow, productMode ? readProductDetails() : null);
            }
            modal.onclick = (event) => {
              if (event.target === modal || event.target.closest("[data-emy-media-editor-close]")) {
                event.preventDefault();
                setOpen(modal, false);
                if (video) video.pause();
              }
              const fit = event.target.closest("[data-fit]");
              if (fit) {
                event.preventDefault();
                settings.fit = fit.dataset.fit || "contain";
                render();
              }
              if (event.target.closest("[data-emy-media-editor-thumbnail-choose]")) {
                event.preventDefault();
                if (thumbnailFile) thumbnailFile.click();
              }
              if (event.target.closest("[data-emy-media-editor-thumbnail-clear]")) {
                event.preventDefault();
                settings.posterSrc = "";
                settings.posterRef = "";
                settings.thumbnailSrc = "";
                settings.thumbnailRef = "";
                render();
              }
              if (event.target.closest("[data-emy-media-editor-reset]")) {
                event.preventDefault();
                settings = mediaDefaultSettings(type);
                render();
              }
              if (event.target.closest("[data-emy-media-editor-apply]")) {
                event.preventDefault();
                apply(false);
              }
              if (event.target.closest("[data-emy-media-editor-post]")) {
                event.preventDefault();
                apply(true);
              }
            };
            if (overlay) {
              overlay.onpointerdown = startOverlayDrag;
              overlay.onpointermove = moveOverlayDrag;
              overlay.onpointerup = endOverlayDrag;
              overlay.onpointercancel = endOverlayDrag;
            }
            if (overlayInput) {
              overlayInput.onkeydown = (event) => event.stopPropagation();
              overlayInput.onkeyup = (event) => event.stopPropagation();
            }
            [productNameInput, productCurrencyInput, productPriceInput, productAvailabilityInput, productCategoryInput, productDescriptionInput].forEach((control) => {
              if (!control) return;
              control.onkeydown = (event) => event.stopPropagation();
              control.onkeyup = (event) => event.stopPropagation();
              control.oninput = () => {
                if (control === productPriceInput) {
                  const cleanPrice = sanitiseProductPrice(control.value);
                  if (control.value !== cleanPrice) control.value = cleanPrice;
                }
                syncProductDetails();
              };
              control.onchange = syncProductDetails;
            });
            [overlayInput, aspect, zoom, x, y, muted].forEach((control) => {
              if (!control) return;
              control.oninput = () => {
                settings.overlay = overlayInput ? overlayInput.value : "";
                settings.aspect = aspect ? aspect.value : "auto";
                settings.zoom = zoom ? Number(zoom.value) || 1 : 1;
                settings.x = x ? Number(x.value) || 0 : 0;
                settings.y = y ? Number(y.value) || 0 : 0;
                settings.muted = muted ? muted.checked : false;
                render();
              };
              control.onchange = control.oninput;
            });
            if (thumbnailFile) {
              thumbnailFile.onchange = () => {
                const file = thumbnailFile.files && thumbnailFile.files[0];
                setThumbnailFile(file);
                thumbnailFile.value = "";
              };
            }
            render();
            setOpen(modal, true);
          };
        })();
`;

const emyFeedCarouselRuntimeScript = String.raw`
        (function setupEmyFeedCarouselRuntime() {
          if (window.emyFeedMediaCarouselMarkup && window.emySetupFeedMediaCarousels) return;
          function cleanText(value) { return String(value || "").trim(); }
          function esc(value) {
            return String(value || "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[char]));
          }
          function mediaSettingsStyle(settings) {
            const data = settings && typeof settings === "object" ? settings : {};
            const fit = cleanText(data.fit) || "contain";
            const zoom = Number(data.zoom) || 1;
            const x = Number(data.x) || 0;
            const y = Number(data.y) || 0;
            const aspect = cleanText(data.aspect);
            return "--carousel-media-fit:" + esc(fit) + ";--media-fit:" + esc(fit) + ";--media-zoom:" + esc(String(zoom)) + ";--media-x:" + esc(String(x)) + "%;--media-y:" + esc(String(y)) + "%;" + (aspect && aspect !== "auto" ? "--media-aspect-ratio:" + esc(aspect) + ";" : "");
          }
          function looksLikeStoredMediaRef(value) {
            const clean = cleanText(value);
            if (!clean) return false;
            if (/^(data:image\/|data:video\/|blob:|https?:\/\/|file:|\/|\.{1,2}\/|assets\/)/i.test(clean)) return false;
            return /^emy-media-|^business-|^customer-|^profile-|^media-/i.test(clean);
          }
          function cloudinaryCloudName() {
            const backendConfig = window.EMY_REAL_BACKEND_CONFIG && window.EMY_REAL_BACKEND_CONFIG.cloudinary;
            const authConfig = window.emyRealAuth && window.emyRealAuth.config && window.emyRealAuth.config.cloudinary;
            return cleanText((backendConfig && backendConfig.cloudName) || (authConfig && authConfig.cloudName)) || "dupytlsjv";
          }
          function cloudinaryMediaUrl(publicId, type) {
            let clean = cleanText(publicId);
            if (!clean) return "";
            if (/^(https?:\/\/|data:image\/|data:video\/|blob:)/i.test(clean)) return clean;
            clean = clean.replace(/^emy-video-ref:/i, "").replace(/^emy-ref:/i, "");
            if (!clean || looksLikeStoredMediaRef(clean)) return "";
            const resource = type === "video" ? "video" : "image";
            const encodedId = clean.split("/").map((part) => encodeURIComponent(part)).join("/");
            return "https://res.cloudinary.com/" + encodeURIComponent(cloudinaryCloudName()) + "/" + resource + "/upload/" + encodedId;
          }
          function cloudinaryVideoPosterUrl(publicId) {
            let clean = cleanText(publicId);
            if (!clean) return "";
            if (/^data:image\//i.test(clean)) return clean;
            if (/^(blob:|data:video\/)/i.test(clean)) return "";
            if (/^https?:\/\//i.test(clean)) {
              const marker = "/video/upload/";
              const markerIndex = clean.indexOf(marker);
              const withPosterFormat = clean.replace(/\.[a-z0-9]+(?:\?.*)?$/i, ".jpg");
              if (markerIndex < 0) return "";
              return withPosterFormat.slice(0, markerIndex + marker.length) + "so_0.2,f_jpg/" + withPosterFormat.slice(markerIndex + marker.length);
            }
            clean = clean.replace(/^emy-video-ref:/i, "").replace(/^emy-ref:/i, "");
            if (!clean || looksLikeStoredMediaRef(clean)) return "";
            const encodedId = clean.split("/").map((part) => encodeURIComponent(part)).join("/");
            return "https://res.cloudinary.com/" + encodeURIComponent(cloudinaryCloudName()) + "/video/upload/so_0.2,f_jpg/" + encodedId + ".jpg";
          }
          function mediaWasRemoved(item) {
            return !!(item && (item.mediaRemoved === true || item.mediaDeleted === true || item.mediaClearedAt || item.removed === true || item.deleted === true || item.deletedAt));
          }
          function cleanMediaItem(item) {
            if (!item || typeof item !== "object") return null;
            if (mediaWasRemoved(item)) return null;
            let src = cleanText(item.src || item.mediaSrc || item.image || item.video || item.url);
            let ref = cleanText(item.ref || item.mediaRef || item.imageRef || item.videoRef);
            const resourceType = cleanText(item.cloudinaryResourceType || item.resourceType || item.mediaResourceType).toLowerCase();
            const typeMarker = cleanText(item.mediaType || item.type || item.kind || item.createType || item.postMode || item.tag || "").toLowerCase();
            const type = resourceType === "video" || /(^|[^a-z])(video|clip|reel)([^a-z]|$)/i.test(typeMarker) || !!(item.video || item.videoSrc || item.videoRef) ? "video" : "image";
            const cloudinaryType = resourceType === "video" ? "video" : resourceType === "image" ? "image" : type;
            const publicId = cleanText(item.cloudinaryPublicId || item.mediaPublicId || item.imagePublicId || item.videoPublicId || item.publicId);
            if (!src) src = cloudinaryMediaUrl(publicId, cloudinaryType);
            if (!ref && looksLikeStoredMediaRef(src)) {
              ref = src;
              src = "";
            }
            const settings = item.settings && typeof item.settings === "object" ? Object.assign({}, item.settings) : (item.mediaSettings && typeof item.mediaSettings === "object" ? Object.assign({}, item.mediaSettings) : null);
            let posterSrc = cleanText(item.posterSrc || item.poster || item.thumbnailSrc || item.thumbnail || item.thumb || (settings && (settings.posterSrc || settings.thumbnailSrc)));
            const posterRef = cleanText(item.posterRef || item.thumbnailRef || (settings && (settings.posterRef || settings.thumbnailRef)));
            if (!posterSrc) posterSrc = cloudinaryMediaUrl(item.cloudinaryPosterPublicId || item.posterPublicId || item.thumbnailPublicId, "image");
            if (!posterSrc && type === "video") posterSrc = cloudinaryVideoPosterUrl(publicId || src);
            if (!src && !ref) return null;
            return {
              type,
              src,
              ref,
              posterSrc,
              posterRef,
              name: cleanText(item.name || item.label || ""),
              settings
            };
          }
          function mediaItemsFromItem(item) {
            if (mediaWasRemoved(item)) return [];
            const stored = item && Array.isArray(item.mediaItems) ? item.mediaItems : [];
            const items = stored.map(cleanMediaItem).filter(Boolean).slice(0, 10);
            if (items.length) return items;
            const fallback = cleanMediaItem({
              type: item && item.mediaType,
              kind: item && (item.kind || item.type || item.createType || item.postMode || item.tag || item.clipKind || item.reelKind || item.clipType || item.reelType),
              src: item && (item.mediaSrc || item.image || item.video),
              ref: item && item.mediaRef,
              cloudinaryPublicId: item && (item.cloudinaryPublicId || item.mediaPublicId || item.imagePublicId || item.videoPublicId),
              cloudinaryResourceType: item && (item.cloudinaryResourceType || item.resourceType || item.mediaResourceType),
              posterSrc: item && (item.posterSrc || item.thumbnailSrc),
              posterRef: item && (item.posterRef || item.thumbnailRef),
              cloudinaryPosterPublicId: item && (item.cloudinaryPosterPublicId || item.posterPublicId || item.thumbnailPublicId),
              settings: item && item.mediaSettings
            });
            return fallback ? [fallback] : [];
          }
          function publicMediaItems(items) {
            return (Array.isArray(items) ? items : []).map(cleanMediaItem).filter(Boolean).slice(0, 10).map((item) => ({
              type: item.type,
              src: item.ref ? "" : item.src,
              ref: item.ref,
              posterSrc: item.posterRef ? "" : item.posterSrc,
              posterRef: item.posterRef,
              name: item.name,
              settings: item.settings || null
            }));
          }
          function itemMarkup(item, index, active, label) {
            const title = item.name || label || (item.type === "video" ? "Post video" : "Post image");
            const style = mediaSettingsStyle(item.settings);
            const deferredVideoSrc = item.type === "video" && item.src && !item.ref ? item.src : "";
            const media = item.type === "video"
              ? (window.emyVideoPlayerMarkup ? window.emyVideoPlayerMarkup(active ? deferredVideoSrc : "", title, item.ref, item.posterSrc, item.posterRef, active ? "metadata" : "none", active ? "" : deferredVideoSrc) : '<video' + (active && deferredVideoSrc ? ' src="' + esc(deferredVideoSrc) + '"' : '') + (item.ref ? ' data-emy-media-ref="' + esc(item.ref) + '"' : '') + (!active && deferredVideoSrc ? ' data-emy-deferred-src="' + esc(deferredVideoSrc) + '"' : '') + (item.posterSrc ? ' poster="' + esc(item.posterSrc) + '"' : '') + (item.posterRef ? ' data-emy-poster-ref="' + esc(item.posterRef) + '"' : '') + ' playsinline preload="' + (active ? "metadata" : "none") + '"></video>')
              : '<img' + (item.src ? ' src="' + esc(item.src) + '"' : '') + (item.ref ? ' data-emy-media-ref="' + esc(item.ref) + '"' : '') + ' alt="" />';
            const deferredAttr = deferredVideoSrc && media.indexOf("data-emy-deferred-src") < 0 ? ' data-emy-deferred-src="' + esc(deferredVideoSrc) + '"' : "";
            const wrappedMedia = item.type === "video" && deferredAttr && media.indexOf("data-emy-deferred-src") < 0
              ? media.replace("<video", "<video" + deferredAttr)
              : media;
            return '<span class="feed-media-carousel-slide' + (active ? ' is-active' : '') + '" data-feed-carousel-slide="' + index + '" style="' + style + '">' + wrappedMedia + '</span>';
          }
          window.emyFeedMediaItemsFromItem = mediaItemsFromItem;
          window.emyFeedPublicMediaItems = publicMediaItems;
          window.emyFeedMediaItemsAttribute = function mediaItemsAttribute(items) {
            return esc(JSON.stringify(publicMediaItems(items)));
          };
          window.emyFeedMediaCarouselMarkup = function feedMediaCarouselMarkup(items, options) {
            const list = (Array.isArray(items) ? items : []).map(cleanMediaItem).filter(Boolean).slice(0, 10);
            if (!list.length) return "";
            const label = cleanText(options && options.label) || "Post media";
            const slides = list.map((item, index) => itemMarkup(item, index, index === 0, label)).join("");
            const dots = list.length > 1 ? '<span class="feed-media-carousel-dots" aria-label="Media carousel position">' + list.map((item, index) => '<button class="feed-media-carousel-dot' + (index === 0 ? ' is-active' : '') + '" type="button" data-feed-carousel-dot="' + index + '" aria-label="Show media ' + (index + 1) + ' of ' + list.length + '"></button>').join("") + '</span>' : "";
            const arrows = list.length > 1
              ? '<button class="feed-media-carousel-arrow is-prev" type="button" data-feed-carousel-prev aria-label="Previous media" aria-disabled="true" disabled><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg></button><button class="feed-media-carousel-arrow is-next" type="button" data-feed-carousel-next aria-label="Next media" aria-disabled="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button>'
              : "";
            const count = list.length > 1 ? '<span class="feed-media-carousel-count" data-feed-carousel-count>1/' + list.length + '</span>' : "";
            return '<div class="feed-media-carousel" data-feed-media-carousel data-feed-carousel-index="0" data-feed-carousel-total="' + list.length + '">' + slides + arrows + dots + count + '</div>';
          };
          function carouselActiveVideo(carousel) {
            if (!carousel) return null;
            const activeSlide = carousel.querySelector("[data-feed-carousel-slide].is-active");
            return activeSlide ? activeSlide.querySelector("video") : null;
          }
          function carouselActiveSlideHasVideo(carousel) {
            return !!carouselActiveVideo(carousel);
          }
          function pauseActiveCarouselVideo(carousel) {
            const video = carouselActiveVideo(carousel);
            if (!video) return;
            try { video.pause(); } catch (error) {}
            const player = video.closest("[data-emy-video-player]");
            if (player) {
              player.classList.remove("is-playing", "is-controls-visible");
              player.dataset.emyUserPaused = "true";
            }
          }
          function deferCarouselVideoSource(video) {
            if (!video) return;
            try {
              const src = cleanText(video.getAttribute("src") || video.currentSrc || "");
              if (src && !video.dataset.emyDeferredSrc) video.dataset.emyDeferredSrc = src;
              if (src) { video.removeAttribute("src"); video.pause(); video.load(); }
              video.preload = "none";
              video.setAttribute("preload", "none");
            } catch (error) {}
          }
          window.emyDeferCarouselVideoSource = deferCarouselVideoSource;
          function activateCarouselSlideMedia(slide) {
            if (!slide) return;
            slide.querySelectorAll("video").forEach((video) => {
              try {
                const deferred = cleanText(video.dataset.emyDeferredSrc || "");
                const hasSrc = cleanText(video.getAttribute("src") || video.currentSrc || "");
                if (!hasSrc && deferred && !cleanText(video.dataset.emyMediaRef)) video.setAttribute("src", deferred);
              } catch (error) {}
            });
          }
          function pauseInactiveCarouselVideos(carousel) {
            if (!carousel) return;
            carousel.querySelectorAll("[data-feed-carousel-slide]:not(.is-active) video").forEach(deferCarouselVideoSource);
          }
          function setCarouselIndex(carousel, nextIndex, options) {
            if (!carousel) return;
            const slides = Array.from(carousel.querySelectorAll("[data-feed-carousel-slide]"));
            if (!slides.length) return;
            const uiOnly = !!(options && options.uiOnly);
            const currentIndex = Number(carousel.dataset.feedCarouselIndex) || 0;
            const total = slides.length;
            const index = Math.min(total - 1, Math.max(0, Number(nextIndex) || 0));
            const indexChanged = index !== currentIndex;
            if (uiOnly && !indexChanged) return;
            const userNavigated = indexChanged && !(options && options.init);
            if (indexChanged && !uiOnly) pauseActiveCarouselVideo(carousel);
            carousel.dataset.feedCarouselIndex = String(index);
            if (indexChanged) {
              slides.forEach((slide, slideIndex) => {
                slide.classList.toggle("is-active", slideIndex === index);
              });
            }
            if (!uiOnly) {
              const activeSlide = slides[index];
              if (activeSlide) activateCarouselSlideMedia(activeSlide);
              if (indexChanged && activeSlide) {
                const hydrateActiveSlide = () => {
                  pauseInactiveCarouselVideos(carousel);
                  if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(activeSlide);
                  if (window.emySetupVideoPlayers) window.emySetupVideoPlayers(activeSlide);
                  if (window.emyEnhanceVideoControls) window.emyEnhanceVideoControls(activeSlide);
                };
                if (window.emyScheduleHeavyInteraction) window.emyScheduleHeavyInteraction(hydrateActiveSlide, { timeout: 700 });
                else window.setTimeout(hydrateActiveSlide, 40);
              } else {
                pauseInactiveCarouselVideos(carousel);
              }
            }
            if (userNavigated) {
              carousel.dataset.feedCarouselUserNav = "true";
              if (carousel._emyCarouselUserNavTimer) window.clearTimeout(carousel._emyCarouselUserNavTimer);
              carousel._emyCarouselUserNavTimer = window.setTimeout(() => {
                delete carousel.dataset.feedCarouselUserNav;
                carousel._emyCarouselUserNavTimer = 0;
              }, 45000);
            }
            if (indexChanged) {
              carousel.querySelectorAll("[data-feed-carousel-dot]").forEach((dot) => {
                const dotIndex = Number(dot.dataset.feedCarouselDot);
                const isActive = dotIndex === index;
                if (dot.classList.contains("is-active") !== isActive) dot.classList.toggle("is-active", isActive);
              });
              const count = carousel.querySelector("[data-feed-carousel-count]");
              const countText = (index + 1) + "/" + total;
              if (count && count.textContent !== countText) count.textContent = countText;
              const prev = carousel.querySelector("[data-feed-carousel-prev]");
              const next = carousel.querySelector("[data-feed-carousel-next]");
              if (prev) {
                const disabled = index <= 0;
                if (prev.disabled !== disabled) prev.disabled = disabled;
                const ariaDisabled = disabled ? "true" : "false";
                if (prev.getAttribute("aria-disabled") !== ariaDisabled) prev.setAttribute("aria-disabled", ariaDisabled);
                if (prev.hasAttribute("hidden")) prev.removeAttribute("hidden");
              }
              if (next) {
                const disabled = index >= total - 1;
                if (next.disabled !== disabled) next.disabled = disabled;
                const ariaDisabled = disabled ? "true" : "false";
                if (next.getAttribute("aria-disabled") !== ariaDisabled) next.setAttribute("aria-disabled", ariaDisabled);
                if (next.hasAttribute("hidden")) next.removeAttribute("hidden");
              }
            }
          }
          window.emySetFeedMediaCarouselIndex = setCarouselIndex;
          window.emySetupFeedMediaCarousels = function setupFeedMediaCarousels(root) {
            (root || document).querySelectorAll("[data-feed-media-carousel]").forEach((carousel) => {
              pauseInactiveCarouselVideos(carousel);
              if (carousel.dataset.feedCarouselSetup === "true") return;
              carousel.dataset.feedCarouselSetup = "true";
              const savedIndex = Number(carousel.dataset.feedCarouselIndex) || 0;
              const activeSlide = carousel.querySelector("[data-feed-carousel-slide].is-active");
              if (activeSlide) activateCarouselSlideMedia(activeSlide);
              setCarouselIndex(carousel, savedIndex, { init: true });
            });
          };
          if (!window._emyFeedCarouselResizeBound) {
            window._emyFeedCarouselResizeBound = true;
          }
          document.addEventListener("click", (event) => {
            const control = event.target.closest("[data-feed-carousel-prev], [data-feed-carousel-next], [data-feed-carousel-dot]");
            if (!control) return;
            if (control.disabled || control.getAttribute("aria-disabled") === "true") return;
            const carousel = control.closest("[data-feed-media-carousel]");
            if (!carousel) return;
            event.preventDefault();
            event.stopPropagation();
            const current = Number(carousel.dataset.feedCarouselIndex) || 0;
            if (control.hasAttribute("data-feed-carousel-dot")) setCarouselIndex(carousel, Number(control.dataset.feedCarouselDot) || 0);
            else setCarouselIndex(carousel, current + (control.hasAttribute("data-feed-carousel-prev") ? -1 : 1));
          }, true);
        })();
`;

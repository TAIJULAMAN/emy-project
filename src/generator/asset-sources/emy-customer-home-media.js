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
          window.emyVideoPlayerMarkup = function emyVideoPlayerMarkup(src, label, mediaRef, posterSrc, posterRef, preload) {
            const cleanSrc = cleanEmyVideoText(src);
            const cleanRef = cleanEmyVideoText(mediaRef);
            const cleanLabel = cleanEmyVideoText(label) || "Video";
            const cleanPosterSrc = cleanEmyVideoText(posterSrc);
            const cleanPosterRef = cleanEmyVideoText(posterRef);
            const cleanPreload = cleanEmyVideoText(preload) || "auto";
            if (!cleanSrc && !cleanRef) return "";
            return '<div class="emy-video-player" data-emy-video-player data-quality="auto">' +
              '<video' + (cleanSrc ? ' src="' + escapeEmyVideo(cleanSrc) + '"' : '') + (cleanRef ? ' data-emy-media-ref="' + escapeEmyVideo(cleanRef) + '"' : '') + (cleanPosterSrc ? ' poster="' + escapeEmyVideo(cleanPosterSrc) + '"' : '') + (cleanPosterRef ? ' data-emy-poster-ref="' + escapeEmyVideo(cleanPosterRef) + '"' : '') + ' playsinline preload="' + escapeEmyVideo(cleanPreload) + '" aria-label="' + escapeEmyVideo(cleanLabel) + '"></video>' +
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
              if (playSurface && !feedCardPlayer) {
                ["pointerdown", "mousedown", "touchstart", "click"].forEach((type) => playSurface.addEventListener(type, stopPlayerControlEvent, { passive: true }));
              }
              const showPlayerControls = () => player.classList.add("is-controls-visible");
              const hidePlayerControls = () => {
                player.classList.remove("is-controls-visible");
                if (!player.matches(":hover") && player.contains(document.activeElement) && document.activeElement && typeof document.activeElement.blur === "function") {
                  document.activeElement.blur();
                }
              };
              player.addEventListener("mouseenter", showPlayerControls);
              player.addEventListener("mousemove", showPlayerControls);
              player.addEventListener("mouseleave", hidePlayerControls);
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
                video.preload = mode === "data" ? "metadata" : "auto";
                if (mode === "data") video.setAttribute("preload", "metadata");
                else video.setAttribute("preload", "auto");
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
                  const playPromise = video.play();
                  if (playPromise && typeof playPromise.catch === "function") {
                    playPromise.catch(() => showError("This video cannot play in this browser. Try MP4/H.264 or record it again."));
                  }
                } else {
                  video.pause();
                }
                update();
              };
              playButtons.forEach((button) => button.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                showPlayerControls();
                togglePlay();
              }));
              if (playSurface && !feedCardPlayer) playSurface.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                showPlayerControls();
                togglePlay();
              });
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
            if (mime.indexOf("video/") === 0) return "video";
            if (mime.indexOf("image/") === 0) return "image";
            return fallback === "video" ? "video" : "image";
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
              ["emyBusinessProfilePhoto", "emyBusinessProfilePhotoRef"],
              ["emyBusinessProfilePhotoSrc", "emyBusinessProfilePhotoRef"],
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
          window.setTimeout(() => {
            if (window.emyTrimLargeInlineMediaStorage) window.emyTrimLargeInlineMediaStorage().catch(() => 0);
          }, 900);
          window.emyHydrateFeedMedia = function hydrateFeedMedia(root = document) {
            const scope = root && root.querySelectorAll ? root : document;
            const nodes = [];
            if (root && root.nodeType === 1 && root.matches && root.matches("[data-emy-media-ref]")) nodes.push(root);
            scope.querySelectorAll("[data-emy-media-ref]").forEach((node) => nodes.push(node));
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
              "emyBusinessProductReels"
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
          function cleanMediaItem(item) {
            if (!item || typeof item !== "object") return null;
            const type = cleanText(item.type || item.mediaType || (item.video || item.videoSrc ? "video" : "image")).toLowerCase() === "video" ? "video" : "image";
            const src = cleanText(item.src || item.mediaSrc || item.image || item.video || item.url);
            const ref = cleanText(item.ref || item.mediaRef || item.imageRef || item.videoRef);
            const settings = item.settings && typeof item.settings === "object" ? Object.assign({}, item.settings) : (item.mediaSettings && typeof item.mediaSettings === "object" ? Object.assign({}, item.mediaSettings) : null);
            const posterSrc = cleanText(item.posterSrc || item.poster || item.thumbnailSrc || item.thumbnail || item.thumb || (settings && (settings.posterSrc || settings.thumbnailSrc)));
            const posterRef = cleanText(item.posterRef || item.thumbnailRef || (settings && (settings.posterRef || settings.thumbnailRef)));
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
            const stored = item && Array.isArray(item.mediaItems) ? item.mediaItems : [];
            const items = stored.map(cleanMediaItem).filter(Boolean).slice(0, 10);
            if (items.length) return items;
            const fallback = cleanMediaItem({
              type: item && item.mediaType,
              src: item && (item.mediaSrc || item.image || item.video),
              ref: item && item.mediaRef,
              posterSrc: item && (item.posterSrc || item.thumbnailSrc),
              posterRef: item && (item.posterRef || item.thumbnailRef),
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
              ? (window.emyVideoPlayerMarkup ? window.emyVideoPlayerMarkup("", title, item.ref, item.posterSrc, item.posterRef, "none") : '<video' + (item.ref ? ' data-emy-media-ref="' + esc(item.ref) + '"' : '') + (deferredVideoSrc ? ' data-emy-deferred-src="' + esc(deferredVideoSrc) + '"' : '') + (item.posterSrc ? ' poster="' + esc(item.posterSrc) + '"' : '') + (item.posterRef ? ' data-emy-poster-ref="' + esc(item.posterRef) + '"' : '') + ' playsinline preload="none"></video>')
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
              ? '<button class="feed-media-carousel-arrow is-prev" type="button" data-feed-carousel-prev aria-label="Previous media" aria-disabled="true" disabled hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg></button><button class="feed-media-carousel-arrow is-next" type="button" data-feed-carousel-next aria-label="Next media" aria-disabled="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button>'
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
            const userNavigated = indexChanged && !(options && options.init);
            if (indexChanged && !uiOnly) pauseActiveCarouselVideo(carousel);
            carousel.dataset.feedCarouselIndex = String(index);
            slides.forEach((slide, slideIndex) => {
              slide.classList.toggle("is-active", slideIndex === index);
            });
            if (!uiOnly) {
              pauseInactiveCarouselVideos(carousel);
              const activeSlide = slides[index];
              if (activeSlide) activateCarouselSlideMedia(activeSlide);
              if (indexChanged && activeSlide && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(activeSlide);
              if (indexChanged && activeSlide && window.emySetupVideoPlayers) window.emySetupVideoPlayers(activeSlide);
              if (indexChanged && activeSlide && window.emyEnhanceVideoControls) window.emyEnhanceVideoControls(activeSlide);
            }
            if (userNavigated) {
              carousel.dataset.feedCarouselUserNav = "true";
              if (carousel._emyCarouselUserNavTimer) window.clearTimeout(carousel._emyCarouselUserNavTimer);
              carousel._emyCarouselUserNavTimer = window.setTimeout(() => {
                delete carousel.dataset.feedCarouselUserNav;
                carousel._emyCarouselUserNavTimer = 0;
              }, 45000);
            }
            carousel.querySelectorAll("[data-feed-carousel-dot]").forEach((dot) => {
              dot.classList.toggle("is-active", Number(dot.dataset.feedCarouselDot) === index);
            });
            const count = carousel.querySelector("[data-feed-carousel-count]");
            if (count) count.textContent = (index + 1) + "/" + total;
            const prev = carousel.querySelector("[data-feed-carousel-prev]");
            const next = carousel.querySelector("[data-feed-carousel-next]");
            if (prev) {
              const disabled = index <= 0;
              prev.hidden = disabled;
              prev.disabled = disabled;
              prev.setAttribute("aria-disabled", disabled ? "true" : "false");
            }
            if (next) {
              const disabled = index >= total - 1;
              next.hidden = disabled;
              next.disabled = disabled;
              next.setAttribute("aria-disabled", disabled ? "true" : "false");
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
            let resizeFrame = 0;
            window.addEventListener("resize", () => {
              if (resizeFrame) cancelAnimationFrame(resizeFrame);
              resizeFrame = requestAnimationFrame(() => {
                resizeFrame = 0;
                document.querySelectorAll("[data-feed-media-carousel]").forEach((carousel) => {
                  setCarouselIndex(carousel, Number(carousel.dataset.feedCarouselIndex) || 0, { uiOnly: true });
                });
              });
            }, { passive: true });
          }
          document.addEventListener("click", (event) => {
            const control = event.target.closest("[data-feed-carousel-prev], [data-feed-carousel-next], [data-feed-carousel-dot]");
            if (!control) return;
            if (control.hidden || control.disabled || control.getAttribute("aria-disabled") === "true") return;
            const carousel = control.closest("[data-feed-media-carousel]");
            if (!carousel) return;
            pauseActiveCarouselVideo(carousel);
            event.preventDefault();
            event.stopPropagation();
            const current = Number(carousel.dataset.feedCarouselIndex) || 0;
            if (control.hasAttribute("data-feed-carousel-dot")) setCarouselIndex(carousel, Number(control.dataset.feedCarouselDot) || 0);
            else setCarouselIndex(carousel, current + (control.hasAttribute("data-feed-carousel-prev") ? -1 : 1));
          }, true);
        })();


        (function setupEmyFeedEditSheetRuntime() {
          if (window.emyOpenFeedEditSheet && window.emyApplyFeedEditPatch) return;
          function esc(value) {
            return String(value || "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[char]));
          }
          function injectStyle() {
            if (document.getElementById("emy-feed-edit-sheet-style")) return;
            const style = document.createElement("style");
            style.id = "emy-feed-edit-sheet-style";
            style.textContent =
              ".emy-feed-edit-modal{position:fixed;inset:0;z-index:360;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(0,27,71,.48);backdrop-filter:blur(14px)}" +
              ".emy-feed-edit-modal.is-open{display:flex}.emy-feed-edit-sheet{width:min(100%,860px);max-height:calc(100dvh - 36px);display:grid;grid-template-rows:auto minmax(0,1fr) auto;overflow:hidden;border:1px solid rgba(255,255,255,.68);border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,.96),rgba(255,248,241,.90));color:#001b47;box-shadow:0 30px 86px rgba(0,27,71,.28),inset 0 1px 0 rgba(255,255,255,.86)}" +
              ".emy-feed-edit-head{min-height:66px;display:grid;grid-template-columns:minmax(0,1fr) 38px;gap:12px;align-items:center;border-bottom:1px solid rgba(0,27,71,.08);padding:14px 16px}.emy-feed-edit-head h2{margin:0;font-size:22px;line-height:1.1;font-weight:900}.emy-feed-edit-head p{margin:5px 0 0;color:#667085;font-size:12.5px;line-height:1.35;font-weight:620}.emy-feed-edit-close{width:38px;height:38px;border:1px solid rgba(0,27,71,.08);border-radius:999px;background:#fff;color:#001b47;cursor:pointer;font:inherit;font-size:18px;font-weight:850}" +
              ".emy-feed-edit-body{min-height:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,340px);gap:14px;overflow:auto;padding:14px}.emy-feed-edit-preview{position:relative;min-height:260px;overflow:hidden;border:1px solid rgba(0,27,71,.08);border-radius:14px;background:linear-gradient(145deg,#eef3f8,#fff7ef);box-shadow:inset 0 1px 0 rgba(255,255,255,.82)}.emy-feed-edit-preview img,.emy-feed-edit-preview video{position:absolute;inset:0;width:100%;height:100%;object-fit:var(--media-fit,contain);transform:translate(var(--media-x,0%),var(--media-y,0%)) scale(var(--media-zoom,1));transform-origin:center;background:#101828}.emy-feed-edit-preview.is-empty{display:grid;align-content:end;gap:7px;padding:16px}.emy-feed-edit-preview.is-empty strong{font-size:24px;line-height:1.08;font-weight:900;overflow-wrap:anywhere}.emy-feed-edit-preview.is-empty span{color:#667085;font-size:13px;font-weight:650}.emy-feed-edit-media-actions{position:absolute;left:12px;right:12px;bottom:12px;z-index:3;display:grid;grid-template-columns:repeat(auto-fit,minmax(116px,1fr));gap:8px;align-items:stretch;max-width:calc(100% - 24px)}.emy-feed-edit-media-btn{box-sizing:border-box;min-width:0;width:100%;min-height:36px;border:1px solid rgba(255,255,255,.72);border-radius:999px;background:rgba(255,255,255,.94);color:#001b47;cursor:pointer;padding:0 13px;font:inherit;font-size:12px;line-height:1;font-weight:850;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 12px 24px rgba(0,27,71,.16)}.emy-feed-edit-media-btn[data-feed-edit-remove-media]{border-color:rgba(180,35,24,.20);background:#fff;color:#b42318}.emy-feed-edit-media-btn[hidden]{display:none}" +
              ".emy-feed-edit-form{display:grid;gap:10px;align-content:start}.emy-feed-edit-form label{display:grid;gap:6px;color:#001b47;font-size:11.5px;line-height:1.2;font-weight:850}.emy-feed-edit-form input,.emy-feed-edit-form textarea,.emy-feed-edit-form select{width:100%;min-width:0;border:1px solid rgba(0,27,71,.11);border-radius:12px;background:rgba(255,255,255,.88);color:#001b47;outline:0;padding:10px 11px;font:inherit;font-size:13px;font-weight:620}.emy-feed-edit-form textarea{min-height:112px;resize:vertical}.emy-feed-edit-dynamic{display:grid;gap:10px}.emy-feed-edit-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.emy-feed-edit-form input:focus,.emy-feed-edit-form textarea:focus,.emy-feed-edit-form select:focus{border-color:rgba(255,106,0,.38);box-shadow:0 0 0 3px rgba(255,106,0,.10)}" +
              ".emy-feed-edit-foot{display:flex;align-items:center;justify-content:flex-end;gap:10px;border-top:1px solid rgba(0,27,71,.08);padding:12px 16px}.emy-feed-edit-foot button{min-height:38px;border:1px solid rgba(0,27,71,.10);border-radius:999px;background:#fff;color:#001b47;cursor:pointer;padding:0 15px;font:inherit;font-size:12.5px;font-weight:850}.emy-feed-edit-save{border-color:rgba(255,106,0,.34)!important;background:linear-gradient(135deg,#ff7a1a,#ff6a00)!important;color:#fff!important;box-shadow:0 12px 24px rgba(255,106,0,.20)}body.emy-feed-edit-locked{overflow:hidden}" +
              "@media(max-width:720px){.emy-feed-edit-modal{align-items:flex-end;padding:0}.emy-feed-edit-sheet{max-height:100dvh;border-radius:18px 18px 0 0}.emy-feed-edit-body{grid-template-columns:1fr}.emy-feed-edit-preview{min-height:220px}.emy-feed-edit-two{grid-template-columns:1fr}}";
            document.head.appendChild(style);
          }
          function modalKind(card, explicitKind) {
            const kind = String(explicitKind || (card && card.dataset.detailKind) || "post").toLowerCase();
            const mediaType = String(card && card.dataset.detailMediaType || "").toLowerCase();
            if (mediaType === "video" && (kind === "post" || kind === "clip" || kind === "product clip")) return "video";
            if (mediaType === "image" && kind === "post") return "photo";
            if (kind.indexOf("job") >= 0) return "job";
            if (kind.indexOf("event") >= 0) return "event";
            if (kind.indexOf("article") >= 0) return "article";
            if (kind.indexOf("product") >= 0) return "product";
            if (kind.indexOf("clip") >= 0) return "clip";
            return kind || "post";
          }
          function titleForKind(kind) {
            if (kind === "video") return "Edit video";
            if (kind === "photo" || kind === "image") return "Edit photo";
            if (kind === "job") return "Edit job";
            if (kind === "event") return "Edit event";
            if (kind === "article") return "Edit article";
            if (kind === "product") return "Edit product";
            if (kind === "clip") return "Edit clip";
            return "Edit post";
          }
          function helperForKind(kind) {
            if (kind === "video") return "Update the video caption, text, and fitted frame before saving.";
            if (kind === "job") return "Update the job information people see before they apply.";
            if (kind === "event") return "Update the event details people can save or accept.";
            if (kind === "article") return "Update the article title and body shown in feeds.";
            if (kind === "product") return "Update the product text, price, and media.";
            return "Update the information shown on this feed card.";
          }
          function readMeta(card) {
            return String(card && card.dataset.detailMeta || "").split("|");
          }
          function mediaContainer(card) {
            return card && card.querySelector(".social-feed-media,.feed-media,.photo,.home-created-media,.feed-article-card-cover,.feed-event-post-hero,.feed-job-hero");
          }
          function mediaSettingsFromCard(card) {
            const media = mediaContainer(card);
            const style = media ? getComputedStyle(media) : null;
            function css(name, fallback) {
              return (style && style.getPropertyValue(name).trim()) || (media && media.style.getPropertyValue(name).trim()) || fallback;
            }
            const zoom = parseFloat(css("--media-zoom", "1")) || 1;
            const x = parseFloat(String(css("--media-x", "0")).replace("%", "")) || 0;
            const y = parseFloat(String(css("--media-y", "0")).replace("%", "")) || 0;
            const overlayNode = media && media.querySelector(".emy-media-overlay-text");
            const overlayStyle = overlayNode ? getComputedStyle(overlayNode) : null;
            function overlayCss(name, fallback) {
              return (overlayStyle && overlayStyle.getPropertyValue(name).trim()) || (style && style.getPropertyValue(name).trim()) || (media && media.style.getPropertyValue(name).trim()) || fallback;
            }
            const overlay = overlayNode ? overlayNode.textContent || "" : "";
            const overlayX = parseFloat(String(overlayCss("--overlay-x", "50")).replace("%", "")) || 50;
            const overlayY = parseFloat(String(overlayCss("--overlay-y", "84")).replace("%", "")) || 84;
            const video = media && media.querySelector("video");
            return {
              fit: css("--media-fit", "contain") || "contain",
              zoom,
              x,
              y,
              aspect: css("--media-aspect-ratio", "auto") || "auto",
              overlay,
              overlayX,
              overlayY,
              muted: true,
              posterSrc: video ? (video.getAttribute("poster") || video.poster || (card && card.dataset && card.dataset.detailPosterSrc) || "") : "",
              posterRef: video && video.dataset ? (video.dataset.emyPosterRef || (card && card.dataset && card.dataset.detailPosterRef) || "") : ""
            };
          }
          function setMetaValue(node, value) {
            if (!node) return;
            const label = node.querySelector("b");
            if (label) {
              const labelText = label.textContent || "";
              node.textContent = "";
              const nextLabel = document.createElement("b");
              nextLabel.textContent = labelText;
              node.appendChild(nextLabel);
              node.appendChild(document.createTextNode(value || ""));
            } else {
              node.textContent = value || "";
            }
          }
          function applyMediaSettings(card, settings) {
            if (!card || !settings) return;
            const media = mediaContainer(card);
            if (!media) return;
            media.style.setProperty("--media-fit", settings.fit || "contain");
            media.style.setProperty("--media-zoom", String(settings.zoom || 1));
            media.style.setProperty("--media-x", (Number(settings.x) || 0) + "%");
            media.style.setProperty("--media-y", (Number(settings.y) || 0) + "%");
            media.style.setProperty("--media-aspect-ratio", settings.aspect || settings.naturalAspect || "auto");
            media.style.setProperty("--overlay-x", (Number(settings.overlayX) || 50) + "%");
            media.style.setProperty("--overlay-y", (Number(settings.overlayY) || 84) + "%");
            const active = media.querySelector("img,video");
            if (active) {
              active.style.objectFit = settings.fit || "contain";
              active.style.transform = "translate(" + (Number(settings.x) || 0) + "%, " + (Number(settings.y) || 0) + "%) scale(" + (Number(settings.zoom) || 1) + ")";
              if (active.tagName === "VIDEO") {
                const posterSrc = settings.posterSrc || settings.thumbnailSrc || "";
                const posterRef = settings.posterRef || settings.thumbnailRef || "";
                if (posterSrc) active.poster = posterSrc;
                else active.removeAttribute("poster");
                if (posterRef) active.setAttribute("data-emy-poster-ref", posterRef);
                else active.removeAttribute("data-emy-poster-ref");
              }
            }
            let overlay = media.querySelector(".emy-media-overlay-text");
            if (!overlay && settings.overlay) {
              overlay = document.createElement("span");
              overlay.className = "emy-media-overlay-text";
              media.appendChild(overlay);
            }
            if (overlay) {
              overlay.textContent = settings.overlay || "";
              overlay.hidden = !String(settings.overlay || "").trim();
              overlay.style.setProperty("--overlay-x", (Number(settings.overlayX) || 50) + "%");
              overlay.style.setProperty("--overlay-y", (Number(settings.overlayY) || 84) + "%");
            }
          }
          function editReadArray(key) {
            try {
              const parsed = JSON.parse(localStorage.getItem(key) || "[]");
              return Array.isArray(parsed) ? parsed : [];
            } catch (error) {
              return [];
            }
          }
          function editStorageIsQuotaError(error) {
            return !!error && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED" || String(error.message || "").toLowerCase().includes("quota"));
          }
          function editTrimStoredMedia(item) {
            if (!item || typeof item !== "object") return item;
            const next = Object.assign({}, item);
            const hasRefForInlineMedia = (key) => {
              if (key === "coverSrc") return !!(next.coverRef || next.eventCoverRef || next.jobCoverRef || next.mediaRef);
              if (key === "eventCoverSrc") return !!(next.eventCoverRef || next.coverRef || next.mediaRef);
              if (key === "jobCoverSrc") return !!(next.jobCoverRef || next.coverRef || next.mediaRef);
              if (key === "posterSrc" || key === "thumbnailSrc") return !!(next.posterRef || next.thumbnailRef);
              return !!next.mediaRef;
            };
            ["coverSrc", "eventCoverSrc", "jobCoverSrc", "mediaSrc", "image", "video", "posterSrc", "thumbnailSrc"].forEach((key) => {
              if (typeof next[key] === "string" && next[key].length > 180000 && hasRefForInlineMedia(key)) next[key] = "";
            });
            if (Array.isArray(next.mediaItems)) {
              next.mediaItems = next.mediaItems.slice(0, 10).map((media) => {
                if (!media || typeof media !== "object") return media;
                const clean = Object.assign({}, media);
                if (typeof clean.src === "string" && clean.src.length > 180000 && clean.ref) clean.src = "";
                if (typeof clean.mediaSrc === "string" && clean.mediaSrc.length > 180000 && (clean.ref || clean.mediaRef)) clean.mediaSrc = "";
                if (typeof clean.posterSrc === "string" && clean.posterSrc.length > 180000 && (clean.posterRef || clean.thumbnailRef)) clean.posterSrc = "";
                if (typeof clean.thumbnailSrc === "string" && clean.thumbnailSrc.length > 180000 && (clean.posterRef || clean.thumbnailRef)) clean.thumbnailSrc = "";
                if (clean.settings && typeof clean.settings === "object") {
                  clean.settings = Object.assign({}, clean.settings);
                  if (typeof clean.settings.posterSrc === "string" && clean.settings.posterSrc.length > 180000 && (clean.settings.posterRef || clean.posterRef || clean.thumbnailRef)) clean.settings.posterSrc = "";
                  if (typeof clean.settings.thumbnailSrc === "string" && clean.settings.thumbnailSrc.length > 180000 && (clean.settings.posterRef || clean.posterRef || clean.thumbnailRef)) clean.settings.thumbnailSrc = "";
                }
                return clean;
              }).filter(Boolean);
            }
            return next;
          }
          function editCompactStorage() {
            ["emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents"].forEach((key) => {
              try {
                const parsed = JSON.parse(localStorage.getItem(key) || "[]");
                if (!Array.isArray(parsed)) return;
                localStorage.setItem(key, JSON.stringify(parsed.slice(0, key === "emyFeedCreatedPosts" ? 40 : 30).map(editTrimStoredMedia)));
              } catch (error) {}
            });
          }
          function editWriteArray(key, items, limit) {
            const next = (items || []).slice(0, limit || 60).map(editTrimStoredMedia);
            try {
              localStorage.setItem(key, JSON.stringify(next));
              return true;
            } catch (error) {
              if (!editStorageIsQuotaError(error)) return false;
            }
            editCompactStorage();
            try {
              localStorage.setItem(key, JSON.stringify(next.slice(0, Math.min(next.length, 20)).map(editTrimStoredMedia)));
              return true;
            } catch (error) {
              return false;
            }
          }
          function editDeletedIdsKey() {
            return "emyFeedDeletedIds";
          }
          function editReadDeletedIds() {
            try {
              const parsed = JSON.parse(localStorage.getItem(editDeletedIdsKey()) || "{}");
              if (Array.isArray(parsed)) {
                return parsed.reduce((map, id) => {
                  if (id) map[String(id)] = Date.now();
                  return map;
                }, {});
              }
              return parsed && typeof parsed === "object" ? parsed : {};
            } catch (error) {
              return {};
            }
          }
          function editWriteDeletedIds(ids) {
            try {
              const entries = Object.entries(ids || {}).filter(([id]) => id).slice(-900);
              localStorage.setItem(editDeletedIdsKey(), JSON.stringify(Object.fromEntries(entries)));
            } catch (error) {}
          }
          function editItemId(value) {
            if (!value) return "";
            if (typeof value === "string") return value.trim();
            if (value.dataset) return String(value.dataset.feedId || "").trim();
            return String(value.id || "").trim();
          }
          function editMarkDeletedId(id) {
            const aliases = editDeletedAliases(id);
            if (!aliases.length) return;
            const ids = editReadDeletedIds();
            const stamp = Date.now();
            aliases.forEach((alias) => { ids[alias] = stamp; });
            editWriteDeletedIds(ids);
          }
          window.emyMarkDeletedFeedItem = editMarkDeletedId;
          function editClearDeletedId(id) {
            const aliases = editDeletedAliases(id);
            if (!aliases.length) return;
            const ids = editReadDeletedIds();
            let changed = false;
            aliases.forEach((alias) => {
              if (ids[alias]) {
                delete ids[alias];
                changed = true;
              }
            });
            if (changed) editWriteDeletedIds(ids);
          }
          window.emyIsDeletedFeedItem = function isDeletedFeedItem(itemOrId) {
            const aliases = editDeletedAliases(itemOrId);
            if (!aliases.length) return false;
            const ids = editReadDeletedIds();
            return aliases.some((alias) => !!ids[alias]);
          };
          function editSeedDeletedIdsFromActionState() {
            try {
              const state = JSON.parse(localStorage.getItem("emyFeedActionState") || "{}");
              if (!state || typeof state !== "object") return;
              const ids = editReadDeletedIds();
              let changed = false;
              Object.keys(state).forEach((id) => {
                if (id && state[id] && state[id].deleted) {
                  editDeletedAliases(id).forEach((alias) => {
                    if (!ids[alias]) {
                      ids[alias] = Date.now();
                      changed = true;
                    }
                  });
                }
              });
              if (changed) editWriteDeletedIds(ids);
            } catch (error) {}
          }
          editSeedDeletedIdsFromActionState();
          function editSourceKey(card, kind) {
            const sourceKind = String(kind || (card && card.dataset.detailKind) || "").toLowerCase();
            if (sourceKind.indexOf("job") >= 0 || sourceKind.indexOf("hiring") >= 0) return "emyFeedCreatedJobs";
            if (sourceKind.indexOf("event") >= 0) return "emyFeedCreatedEvents";
            return "emyFeedCreatedPosts";
          }
          function editDispatchCreatedChange(key, id, detail) {
            const payload = Object.assign({ id: id || "" }, detail || {});
            if (key === "emyFeedCreatedPosts") window.dispatchEvent(new CustomEvent("emy:created-posts-changed", { detail: payload }));
            if (key === "emyFeedCreatedJobs") window.dispatchEvent(new CustomEvent("emy:created-jobs-changed", { detail: payload }));
            if (key === "emyFeedCreatedEvents") window.dispatchEvent(new CustomEvent("emy:created-events-changed", { detail: payload }));
          }
          function editClean(value) {
            return String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
          }
          function editSlug(value) {
            return editClean(value).replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
          }
          function editUnique(values) {
            return Array.from(new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean)));
          }
          function editCardAliases(card) {
            if (!card || !card.dataset) return [];
            const data = card.dataset;
            const values = [
              data.feedId,
              data.originalFeedId,
              data.repostOriginalId,
              data.detailId,
              data.detailRepostId,
              data.publicActivityId,
              data.businessProductId,
              data.productId,
              data.productKey,
              data.clipId,
              data.reelId,
              data.jobId,
              data.eventId,
              data.articleId
            ];
            const title = data.detailTitle || data.title || "";
            const business = data.detailBusiness || data.businessName || data.business || "";
            const kind = data.detailKind || data.kind || data.type || "";
            const content = editSlug([kind, business, title].filter(Boolean).join(":"));
            const copy = editSlug([business, title, data.detailDescription || data.description || ""].filter(Boolean).join(":"));
            if (content) values.push("emy:" + content, content);
            if (copy) values.push("copy:" + copy, copy);
            try {
              if (window.emyEngagement && typeof window.emyEngagement.idsForCard === "function") {
                values.push.apply(values, window.emyEngagement.idsForCard(card));
              }
            } catch (error) {}
            return editUnique(values);
          }
          function editItemAliases(item, storageKey, index) {
            const row = item && typeof item === "object" ? item : {};
            const values = [
              row.id,
              row.feedId,
              row.originalFeedId,
              row.postId,
              row.articleId,
              row.eventId,
              row.jobId,
              row.productId,
              row.businessProductId,
              row.clipId,
              row.reelId,
              row.productKey,
              storageKey && index !== undefined ? storageKey + "-" + index : ""
            ];
            const kind = row.kind || row.type || row.createType || row.postMode || "";
            const business = row.business || row.businessName || row.actor || row.name || row.ownerName || "";
            const title = row.jobTitle || row.title || row.eventName || row.productName || row.productTitle || row.name || "";
            const description = row.description || row.text || row.summary || row.body || "";
            const content = editSlug([kind, business, title].filter(Boolean).join(":"));
            const copy = editSlug([business, title, description].filter(Boolean).join(":"));
            if (content) values.push("emy:" + content, content);
            if (copy) values.push("copy:" + copy, copy);
            return editUnique(values);
          }
          function editAliasesOverlap(left, right) {
            const set = new Set((right || []).map((value) => editClean(value)));
            return (left || []).some((value) => set.has(editClean(value)));
          }
          function editDeletedAliases(value, storageKey, index) {
            if (!value) return [];
            let aliases = [];
            if (typeof value === "string") {
              aliases = [value];
            } else if (value.dataset) {
              aliases = editCardAliases(value);
            } else if (typeof value === "object") {
              aliases = editItemAliases(value, storageKey, index);
            }
            const primary = editItemId(value);
            if (primary) aliases.unshift(primary);
            return editUnique(aliases);
          }
          function editActionStatePatch(card, patch) {
            if (!card || !patch) return;
            try {
              const aliases = editCardAliases(card);
              if (!aliases.length) return;
              const state = JSON.parse(localStorage.getItem("emyFeedActionState") || "{}");
              const map = state && typeof state === "object" && !Array.isArray(state) ? state : {};
              const merged = aliases.reduce((next, id) => Object.assign(next, map[id] || {}), {});
              Object.assign(merged, patch);
              aliases.forEach((id) => { map[id] = Object.assign({}, map[id] || {}, merged); });
              localStorage.setItem("emyFeedActionState", JSON.stringify(map));
              window.dispatchEvent(new CustomEvent("emy:feed-action-state-changed", { detail: { key: "emyFeedActionState", ids: aliases, edited: true } }));
            } catch (error) {}
          }
          function editNormaliseCreatedItem(item, kind) {
            const next = Object.assign({}, item || {});
            const sourceKind = String(kind || next.kind || next.type || next.createType || "").toLowerCase();
            const now = new Date().toISOString();
            if (!next.id) next.id = "feed-create-" + Date.now();
            if (!next.kind) next.kind = sourceKind.indexOf("job") >= 0 ? "job" : sourceKind.indexOf("event") >= 0 ? "event" : "post";
            if (!next.business && next.name) next.business = next.name;
            if (!next.actor && next.business) next.actor = next.business;
            if (!next.text && next.description) next.text = next.description;
            if (!next.description && next.text) next.description = next.text;
            if (next.mediaType === "image" && !next.image && next.mediaSrc) next.image = next.mediaSrc;
            if (next.mediaType === "video" && !next.video && next.mediaSrc) next.video = next.mediaSrc;
            next.updatedAt = now;
            next.createdAt = next.createdAt || now;
            return next;
          }
          function editItemMatchesCard(item, card) {
            if (!item || !card || !card.dataset) return false;
            if (editAliasesOverlap(editItemAliases(item), editCardAliases(card))) return true;
            const id = String(card.dataset.feedId || "").trim();
            if (id && String(item.id || "").trim() === id) return true;
            const oldTitle = editClean(card.dataset.detailTitle);
            const oldBusiness = editClean(card.dataset.detailBusiness);
            if (!oldTitle) return false;
            const itemTitle = editClean(item.jobTitle || item.title || item.eventName);
            const itemBusiness = editClean(item.business || item.actor || item.name);
            return itemTitle === oldTitle && (!oldBusiness || !itemBusiness || itemBusiness === oldBusiness);
          }
          function editStoredItemOwned(item) {
            if (!item || typeof item !== "object") return false;
            const id = String(item.id || "");
            const owner = String(item.owner || item.actorType || item.repostedByType || "").trim().toLowerCase();
            const key = String(item.key || item.businessKey || "").trim().toLowerCase();
            if (owner === "business") return false;
            if (key && key !== "customer-profile") return false;
            return item.isUserPost === true ||
              item.my === true ||
              item.owner === "customer" ||
              item.key === "customer-profile" ||
              item.businessKey === "customer-profile" ||
              item.profileHref === "emy-customer-profile.html" ||
              id.indexOf("customer-post-") === 0 ||
              id.indexOf("feed-create-") === 0 ||
              id.indexOf("repost-") === 0;
          }
          function editCardLooksBusinessOwned(card) {
            if (!card || !card.dataset) return false;
            const data = card.dataset;
            const owner = String(data.owner || data.repostActorType || data.detailOwner || "").trim().toLowerCase();
            if (owner === "business") return true;
            if (owner === "customer") return false;
            const key = String(data.businessKey || data.detailBusinessKey || data.ownerKey || "").trim().toLowerCase();
            if (key && key !== "customer-profile") return true;
            return !!(data.businessStorageKey || data.businessPostStorageKey);
          }
          function editCardLooksOwned(card) {
            if (!card || !card.dataset) return false;
            const data = card.dataset;
            const id = String(data.feedId || "").trim();
            if (editCardLooksBusinessOwned(card)) return false;
            if (card.classList && (card.classList.contains("is-user-post") || card.classList.contains("is-owned"))) return true;
            if (data.ownedJob === "true" || data.owner === "customer" || data.businessKey === "customer-profile") return true;
            if (card.querySelector && card.querySelector('a[href="emy-customer-profile.html"], a[href$="/emy-customer-profile.html"]')) return true;
            if (id.indexOf("customer-post-") === 0 || id.indexOf("feed-create-") === 0 || id.indexOf("repost-") === 0) return true;
            return ["emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents"].some((key) => editReadArray(key).some((item) => editStoredItemOwned(item) && editItemMatchesCard(item, card)));
          }
          window.emyFeedCardLooksOwned = editCardLooksOwned;
          window.emyPersistCreatedFeedItem = function persistCreatedFeedItem(item, kind) {
            const key = editSourceKey(null, kind || (item && (item.kind || item.type || item.createType)));
            const normalised = editNormaliseCreatedItem(item, kind);
            editClearDeletedId(normalised);
            const items = editReadArray(key).filter((existing) => existing && String(existing.id || "") !== String(normalised.id || ""));
            items.unshift(normalised);
            const ok = editWriteArray(key, items, key === "emyFeedCreatedPosts" ? 80 : 60);
            if (ok) editDispatchCreatedChange(key, normalised.id, { saved: true, createType: normalised.createType || normalised.postMode || normalised.tag || normalised.kind || kind || "post" });
            return ok;
          };
          window.emyDeleteStoredFeedItem = function deleteStoredFeedItem(card, kind) {
            if (!card || !card.dataset) return true;
            const primaryKey = editSourceKey(card, kind);
            const kindText = String(kind || card.dataset.detailKind || "").toLowerCase();
            const isClip = /clip|reel/.test(kindText) || card.classList.contains("is-clip") || card.classList.contains("reel-card");
            const mirrorKeys = primaryKey === "emyFeedCreatedPosts"
              ? ["emyBusinessFeedPosts", "emyBusinessPosts", "emyBusinessArticles", "emyBusinessArticlePosts"].concat(isClip ? ["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels"] : [])
              : primaryKey === "emyFeedCreatedJobs"
                ? ["emyBusinessJobs", "emyBusinessJobPosts"]
                : primaryKey === "emyFeedCreatedEvents"
                  ? ["emyBusinessEvents", "emyBusinessEventPosts"]
                  : isClip ? ["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels"] : [];
            const keys = [primaryKey, "emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents"].concat(mirrorKeys).filter((key, index, list) => list.indexOf(key) === index);
            let changed = false;
            let failed = false;
            const removedItems = [];
            keys.forEach((key) => {
              const items = editReadArray(key);
              const next = items.filter((item, index) => {
                const matches = editItemMatchesCard(item, card);
                if (matches) removedItems.push(item);
                return !matches;
              });
              if (next.length === items.length) return;
              const ok = editWriteArray(key, next, key === "emyFeedCreatedPosts" ? 80 : 60);
              if (!ok) failed = true;
              else {
                changed = true;
                editDispatchCreatedChange(key, card.dataset.feedId || "", { deleted: true });
              }
            });
            if (failed) return false;
            editMarkDeletedId(card);
            removedItems.forEach((item) => editMarkDeletedId(item));
            editDispatchCreatedChange(primaryKey, card.dataset.feedId || "", { deleted: true, tombstone: true, removedFromStorage: changed });
            return true;
          };
          function editFindIndex(items, card) {
            const aliases = editCardAliases(card);
            if (aliases.length) {
              const exact = items.findIndex((item, index) => item && editAliasesOverlap(editItemAliases(item, "", index), aliases));
              if (exact >= 0) return exact;
            }
            const oldTitle = editClean(card && card.dataset.detailTitle);
            const oldBusiness = editClean(card && card.dataset.detailBusiness);
            if (!oldTitle) return -1;
            return items.findIndex((item) => {
              if (!item || typeof item !== "object") return false;
              const itemTitle = editClean(item.jobTitle || item.title || item.eventName);
              const itemBusiness = editClean(item.business || item.actor || item.name);
              return itemTitle === oldTitle && (!oldBusiness || !itemBusiness || itemBusiness === oldBusiness);
            });
          }
          function editPatchToSourceItem(item, card, kind, patch) {
            const sourceKind = String(kind || (card && card.dataset.detailKind) || "").toLowerCase();
            const next = Object.assign({}, item || {});
            const title = patch.editedTitle !== undefined ? patch.editedTitle : patch.title;
            const text = patch.editedText !== undefined ? patch.editedText : patch.text;
            const patchIncludesMedia = patch.mediaSrc !== undefined || patch.mediaRef !== undefined || patch.mediaType !== undefined;
            if (title !== undefined) {
              next.title = title;
              if (sourceKind.indexOf("job") >= 0 || sourceKind.indexOf("hiring") >= 0) next.jobTitle = title;
              if (sourceKind.indexOf("event") >= 0) next.eventName = title;
            }
            if (text !== undefined) {
              next.text = text;
              next.description = text;
              if (sourceKind.indexOf("article") >= 0 || String(next.postMode || "").toLowerCase() === "article" || String(next.createType || "").toLowerCase() === "article") next.articleBody = text;
            }
            if (patch.editedPrice !== undefined) {
              next.price = patch.editedPrice;
              next.priceText = patch.editedPrice;
            }
            if (patchIncludesMedia) {
              const mediaSrc = patch.mediaRef ? "" : (patch.mediaSrc || "");
              const mediaRef = patch.mediaRef || "";
              const mediaType = patch.mediaType || (mediaSrc || mediaRef ? "image" : "");
              const posterSrc = patch.posterRef ? "" : (patch.posterSrc || "");
              const posterRef = patch.posterRef || "";
              next.mediaSrc = mediaSrc;
              next.mediaRef = mediaRef;
              next.mediaType = mediaType;
              next.posterSrc = posterSrc;
              next.posterRef = posterRef;
              next.thumbnailSrc = posterSrc;
              next.thumbnailRef = posterRef;
              if (mediaType === "image") {
                next.image = mediaSrc;
                next.video = "";
              } else if (mediaType === "video") {
                next.video = mediaSrc;
                next.image = "";
              } else {
                next.image = "";
                next.video = "";
              }
              if (sourceKind.indexOf("job") >= 0 || sourceKind.indexOf("hiring") >= 0) {
                next.coverSrc = mediaSrc;
                next.jobCoverSrc = mediaSrc;
                next.coverRef = mediaRef;
                next.jobCoverRef = mediaRef;
                next.coverType = mediaType;
                next.jobCoverType = mediaType;
                next.coverPosterSrc = posterSrc;
                next.coverPosterRef = posterRef;
                next.jobCoverPosterSrc = posterSrc;
                next.jobCoverPosterRef = posterRef;
              }
              if (sourceKind.indexOf("event") >= 0) {
                next.coverSrc = mediaSrc;
                next.eventCoverSrc = mediaSrc;
                next.coverRef = mediaRef;
                next.eventCoverRef = mediaRef;
                next.coverPosterSrc = posterSrc;
                next.coverPosterRef = posterRef;
                next.eventCoverPosterSrc = posterSrc;
                next.eventCoverPosterRef = posterRef;
              }
            }
            if (patch.editedJobLocation !== undefined) {
              next.jobLocation = patch.editedJobLocation;
              next.location = patch.editedJobLocation;
            }
            if (patch.editedJobWorkplace !== undefined) next.workplace = patch.editedJobWorkplace;
            if (patch.editedJobEmployment !== undefined) next.employment = patch.editedJobEmployment;
            if (patch.editedJobExperience !== undefined) next.experience = patch.editedJobExperience;
            if (patch.editedJobApply !== undefined) next.apply = patch.editedJobApply;
            if (patch.editedJobNotes !== undefined) next.notes = patch.editedJobNotes;
            if (patch.editedEventType !== undefined) next.eventType = patch.editedEventType;
            if (patch.editedEventWhen !== undefined) next.eventWhen = patch.editedEventWhen;
            if (patch.editedEventWhere !== undefined) next.eventWhere = patch.editedEventWhere;
            if (patch.mediaSettings) {
              next.mediaSettings = Object.assign({}, patch.mediaSettings);
              next.mediaOverlay = patch.mediaSettings.overlay || "";
              if (patch.mediaSettings.posterSrc !== undefined || patch.mediaSettings.posterRef !== undefined || patch.mediaSettings.thumbnailSrc !== undefined || patch.mediaSettings.thumbnailRef !== undefined) {
                next.posterSrc = patch.mediaSettings.posterRef ? "" : (patch.mediaSettings.posterSrc || patch.mediaSettings.thumbnailSrc || "");
                next.posterRef = patch.mediaSettings.posterRef || patch.mediaSettings.thumbnailRef || "";
                next.thumbnailSrc = next.posterSrc;
                next.thumbnailRef = next.posterRef;
              }
              if (sourceKind.indexOf("job") >= 0 || sourceKind.indexOf("hiring") >= 0) next.coverSettings = Object.assign({}, patch.mediaSettings);
              if (sourceKind.indexOf("event") >= 0) {
                next.coverSettings = Object.assign({}, patch.mediaSettings);
                next.eventCoverSettings = Object.assign({}, patch.mediaSettings);
              }
            }
            if (card && card.dataset) {
              next.id = next.id || card.dataset.feedId || "";
              next.business = next.business || card.dataset.detailBusiness || "";
              next.actor = next.actor || card.dataset.detailBusiness || "";
              if (!patchIncludesMedia) {
                const cardMediaRef = card.dataset.detailMediaRef || "";
                const cardMediaSrc = cardMediaRef ? "" : (card.dataset.detailMediaSrc || "");
                const cardMediaType = card.dataset.detailMediaType || (cardMediaRef || cardMediaSrc ? "image" : "");
                if (cardMediaRef) next.mediaRef = cardMediaRef;
                if (cardMediaType) next.mediaType = cardMediaType;
                if (card.dataset.detailPosterRef) {
                  next.posterRef = card.dataset.detailPosterRef;
                  next.thumbnailRef = card.dataset.detailPosterRef;
                }
                if (card.dataset.detailPosterSrc && !next.posterRef) {
                  next.posterSrc = card.dataset.detailPosterSrc;
                  next.thumbnailSrc = card.dataset.detailPosterSrc;
                }
                if (cardMediaSrc && !next.mediaRef) {
                  next.mediaSrc = cardMediaSrc;
                  if (cardMediaType === "image") next.image = cardMediaSrc;
                  if (cardMediaType === "video") next.video = cardMediaSrc;
                }
                if ((cardMediaRef || cardMediaSrc || cardMediaType) && (sourceKind.indexOf("job") >= 0 || sourceKind.indexOf("hiring") >= 0)) {
                  next.coverSrc = cardMediaSrc;
                  next.jobCoverSrc = cardMediaSrc;
                  next.coverRef = cardMediaRef;
                  next.jobCoverRef = cardMediaRef;
                  next.coverType = cardMediaType;
                  next.jobCoverType = cardMediaType;
                }
                if ((cardMediaRef || cardMediaSrc || cardMediaType) && sourceKind.indexOf("event") >= 0) {
                  next.coverSrc = cardMediaSrc;
                  next.eventCoverSrc = cardMediaSrc;
                  next.coverRef = cardMediaRef;
                  next.eventCoverRef = cardMediaRef;
                  next.coverType = cardMediaType;
                  next.eventCoverType = cardMediaType;
                }
              }
            }
            next.updatedAt = new Date().toISOString();
            return next;
          }
          window.emyPersistFeedEditPatch = function persistFeedEditPatch(card, patch, kind) {
            if (!card || !patch || !editCardLooksOwned(card)) return true;
            const primaryKey = editSourceKey(card, kind);
            const keys = [primaryKey, "emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents"].filter((key, index, list) => key && list.indexOf(key) === index);
            let matchedKey = "";
            let matchedId = "";
            let failed = false;
            keys.forEach((key) => {
              if (failed || matchedKey) return;
              const items = editReadArray(key);
              const index = editFindIndex(items, card);
              if (index < 0) return;
              items[index] = editPatchToSourceItem(items[index], card, kind, patch);
              const ok = editWriteArray(key, items, key === "emyFeedCreatedPosts" ? 80 : 60);
              if (!ok) {
                failed = true;
                return;
              }
              matchedKey = key;
              matchedId = card.dataset.feedId || items[index].id || "";
              editDispatchCreatedChange(key, matchedId, { edited: true });
            });
            if (failed) return "quota";
            editActionStatePatch(card, patch);
            if (!matchedKey) {
              editDispatchCreatedChange(primaryKey, card.dataset.feedId || "", { edited: true, actionStateOnly: true });
            }
            return true;
          };
          function internalApplyText(card, title, text) {
            if (!card) return;
            if (title !== undefined) {
              card.dataset.detailTitle = title;
              card.querySelectorAll(".feed-job-hero strong,.feed-event-post-hero strong,.feed-article-card-body h2,.feed-product-card h3,.social-feed-quote-title,.caption strong").forEach((node) => { node.textContent = title; });
              const textPanel = card.querySelector(".social-feed-text-panel p");
              if (textPanel && !card.classList.contains("is-repost")) textPanel.textContent = title;
            }
            if (text !== undefined) {
              card.dataset.detailDescription = text;
              card.querySelectorAll(".feed-job-desc,.feed-event-post-details p,.feed-article-card-body p,.feed-product-card .body p,.social-feed-quote-text,.caption > span").forEach((node) => { node.textContent = text; });
              const caption = card.querySelector(".social-feed-caption");
              const business = card.dataset.detailBusiness || "Stephane";
              if (caption && !card.classList.contains("is-repost")) caption.innerHTML = '<strong>' + esc(business) + '</strong>' + esc(text);
            }
          }
          function applyEditedMediaToCard(card, patch) {
            if (!card || !patch || (patch.mediaSrc === undefined && patch.mediaRef === undefined && patch.mediaType === undefined)) return;
            const mediaSrc = patch.mediaRef ? "" : (patch.mediaSrc || "");
            const mediaRef = patch.mediaRef || "";
            const mediaType = patch.mediaType || (mediaSrc || mediaRef ? "image" : "");
            const posterSrc = patch.posterRef ? "" : (patch.posterSrc || "");
            const posterRef = patch.posterRef || "";
            card.dataset.detailMediaSrc = mediaSrc;
            card.dataset.detailMediaRef = mediaRef;
            card.dataset.detailMediaType = mediaType;
            card.dataset.detailPosterSrc = posterSrc;
            card.dataset.detailPosterRef = posterRef;
            const media = mediaContainer(card);
            if (!media) return;
            const isJobHero = media.classList && media.classList.contains("feed-job-hero");
            const isEventHero = media.classList && media.classList.contains("feed-event-post-hero");
            media.querySelectorAll("img,video").forEach((node) => node.remove());
            if (!(mediaSrc || mediaRef)) {
              media.classList.remove("has-cover");
              const eventPost = media.closest(".feed-event-post");
              if (eventPost) eventPost.classList.remove("has-cover");
              const jobCard = media.closest(".feed-job-card");
              if (jobCard) jobCard.classList.remove("has-cover");
              return;
            }
            const node = document.createElement(mediaType === "video" ? "video" : "img");
            if (isEventHero) {
              node.className = "feed-event-card-cover-image";
              node.setAttribute("data-emy-event-card-cover", "");
              media.classList.add("has-cover");
              const eventPost = media.closest(".feed-event-post");
              if (eventPost) eventPost.classList.add("has-cover");
            }
            if (isJobHero) {
              node.className = "feed-job-cover-media";
              node.setAttribute("data-emy-job-cover-media", "");
              media.classList.add("has-cover");
              const jobCard = media.closest(".feed-job-card");
              if (jobCard) jobCard.classList.add("has-cover");
            }
            if (mediaType === "video") {
              node.muted = true;
              node.playsInline = true;
              node.preload = "metadata";
              if (posterSrc) node.poster = posterSrc;
              if (posterRef) node.setAttribute("data-emy-poster-ref", posterRef);
            } else {
              node.alt = "";
            }
            if (mediaRef) node.setAttribute("data-emy-media-ref", mediaRef);
            if (mediaSrc) node.src = mediaSrc;
            media.insertBefore(node, media.firstChild);
            if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(media);
            if (window.emySetupVideoPlayers) window.emySetupVideoPlayers(media);
          }
          window.emyApplyFeedEditPatch = function applyFeedEditPatch(card, patch, options) {
            if (!card || !patch) return;
            const title = patch.editedTitle !== undefined ? patch.editedTitle : patch.title;
            const text = patch.editedText !== undefined ? patch.editedText : patch.text;
            if (typeof options === "object" && typeof options.setVisibleText === "function") options.setVisibleText(card, title, text);
            else internalApplyText(card, title, text);
            if (patch.editedPrice !== undefined) {
              card.dataset.detailPrice = patch.editedPrice || "";
              card.querySelectorAll(".price,.product-clip-price,.social-feed-product-price").forEach((node) => { node.textContent = patch.editedPrice || ""; });
            }
            if (patch.editedJobLocation !== undefined) card.dataset.jobLocation = patch.editedJobLocation;
            if (patch.editedJobWorkplace !== undefined) card.dataset.jobWorkplace = patch.editedJobWorkplace;
            if (patch.editedJobEmployment !== undefined) card.dataset.jobEmployment = patch.editedJobEmployment;
            if (patch.editedJobExperience !== undefined) card.dataset.jobExperience = patch.editedJobExperience;
            if (patch.editedJobApply !== undefined) card.dataset.jobApply = patch.editedJobApply;
            if (patch.editedJobNotes !== undefined) card.dataset.jobNotes = patch.editedJobNotes;
            applyEditedMediaToCard(card, patch);
            if (patch.posterSrc !== undefined || patch.posterRef !== undefined) {
              card.dataset.detailPosterSrc = patch.posterRef ? "" : (patch.posterSrc || "");
              card.dataset.detailPosterRef = patch.posterRef || "";
            }
            if (patch.mediaSettings && (patch.mediaSettings.posterSrc !== undefined || patch.mediaSettings.posterRef !== undefined || patch.mediaSettings.thumbnailSrc !== undefined || patch.mediaSettings.thumbnailRef !== undefined)) {
              card.dataset.detailPosterSrc = (patch.mediaSettings.posterRef || patch.mediaSettings.thumbnailRef) ? "" : (patch.mediaSettings.posterSrc || patch.mediaSettings.thumbnailSrc || "");
              card.dataset.detailPosterRef = patch.mediaSettings.posterRef || patch.mediaSettings.thumbnailRef || "";
            }
            const jobMeta = card.querySelectorAll(".feed-job-meta span");
            if (jobMeta.length) {
              if (patch.editedJobLocation !== undefined) setMetaValue(jobMeta[0], patch.editedJobLocation);
              if (patch.editedJobWorkplace !== undefined) setMetaValue(jobMeta[1], patch.editedJobWorkplace);
              if (patch.editedJobEmployment !== undefined) setMetaValue(jobMeta[2], patch.editedJobEmployment);
              if (patch.editedJobNotes !== undefined) setMetaValue(jobMeta[3], patch.editedJobNotes);
            }
            if (patch.editedEventType !== undefined || patch.editedEventWhen !== undefined || patch.editedEventWhere !== undefined) {
              const meta = readMeta(card);
              const type = patch.editedEventType !== undefined ? patch.editedEventType : meta[0] || "Event";
              const when = patch.editedEventWhen !== undefined ? patch.editedEventWhen : meta[1] || "Date to confirm";
              const where = patch.editedEventWhere !== undefined ? patch.editedEventWhere : meta[2] || "Place to confirm";
              card.dataset.detailMeta = [type, when, where].join("|");
              const badge = card.querySelector(".feed-event-post-hero span");
              const eventMeta = card.querySelectorAll(".feed-event-post-meta span");
              if (badge) badge.textContent = type;
              if (eventMeta.length) {
                setMetaValue(eventMeta[0], when);
                setMetaValue(eventMeta[1], where);
              }
            }
            if (patch.mediaSettings) applyMediaSettings(card, patch.mediaSettings);
          };
          function ensureModal() {
            injectStyle();
            let modal = document.querySelector("[data-emy-feed-edit]");
            if (modal) return modal;
            modal = document.createElement("div");
            modal.className = "emy-feed-edit-modal";
            modal.dataset.emyFeedEdit = "true";
            modal.setAttribute("aria-hidden", "true");
            modal.innerHTML =
              '<section class="emy-feed-edit-sheet" role="dialog" aria-modal="true" aria-labelledby="emy-feed-edit-title">' +
                '<header class="emy-feed-edit-head"><span><h2 id="emy-feed-edit-title" data-feed-edit-title-label>Edit post</h2><p data-feed-edit-help>Update this item.</p></span><button class="emy-feed-edit-close" type="button" data-feed-edit-close aria-label="Close editor">x</button></header>' +
                '<div class="emy-feed-edit-body">' +
                  '<div class="emy-feed-edit-preview" data-feed-edit-preview></div>' +
                  '<input type="file" accept="image/*,video/*" data-feed-edit-media-file hidden />' +
                  '<form class="emy-feed-edit-form" data-feed-edit-form>' +
                    '<label>Title<input data-feed-edit-title maxlength="140" /></label>' +
                    '<label>Description<textarea data-feed-edit-description maxlength="1200"></textarea></label>' +
                    '<div class="emy-feed-edit-dynamic" data-feed-edit-dynamic></div>' +
                  '</form>' +
                '</div>' +
                '<footer class="emy-feed-edit-foot"><button type="button" data-feed-edit-cancel>Cancel</button><button class="emy-feed-edit-save" type="button" data-feed-edit-save>Save changes</button></footer>' +
              '</section>';
            document.body.appendChild(modal);
            return modal;
          }
          function setOpen(modal, open) {
            modal.classList.toggle("is-open", !!open);
            modal.setAttribute("aria-hidden", open ? "false" : "true");
            document.body.classList.toggle("emy-feed-edit-locked", !!open);
          }
          function renderDynamicFields(dynamic, card, kind) {
            const meta = readMeta(card);
            if (kind === "job") {
              dynamic.innerHTML =
                '<div class="emy-feed-edit-two"><label>Location<input data-feed-edit-job-location /></label><label>Workplace<input data-feed-edit-job-workplace /></label></div>' +
                '<div class="emy-feed-edit-two"><label>Type<input data-feed-edit-job-employment /></label><label>Pay / notes<input data-feed-edit-job-notes /></label></div>' +
                '<label>How to apply<textarea data-feed-edit-job-apply></textarea></label>';
              dynamic.querySelector("[data-feed-edit-job-location]").value = card.dataset.jobLocation || meta[0] || "";
              dynamic.querySelector("[data-feed-edit-job-workplace]").value = card.dataset.jobWorkplace || meta[1] || "";
              dynamic.querySelector("[data-feed-edit-job-employment]").value = card.dataset.jobEmployment || meta[2] || "";
              dynamic.querySelector("[data-feed-edit-job-notes]").value = card.dataset.jobNotes || "";
              dynamic.querySelector("[data-feed-edit-job-apply]").value = card.dataset.jobApply || "";
              return;
            }
            if (kind === "event") {
              dynamic.innerHTML =
                '<div class="emy-feed-edit-two"><label>Event type<input data-feed-edit-event-type /></label><label>Date and time<input data-feed-edit-event-when /></label></div>' +
                '<label>Place<input data-feed-edit-event-where /></label>';
              dynamic.querySelector("[data-feed-edit-event-type]").value = meta[0] || "Event";
              dynamic.querySelector("[data-feed-edit-event-when]").value = meta[1] || "";
              dynamic.querySelector("[data-feed-edit-event-where]").value = meta[2] || "";
              return;
            }
            if (kind === "product") {
              dynamic.innerHTML = '<label>Price<input data-feed-edit-price /></label>';
              dynamic.querySelector("[data-feed-edit-price]").value = card.dataset.detailPrice || "";
              return;
            }
            dynamic.innerHTML = "";
          }
          function editMediaItemsFromCard(card) {
            const raw = card && card.dataset && card.dataset.detailMediaItems;
            if (!raw) return [];
            try {
              const parsed = JSON.parse(raw);
              if (window.emyFeedMediaItemsFromItem) return window.emyFeedMediaItemsFromItem({ mediaItems: parsed });
              return Array.isArray(parsed) ? parsed.filter((item) => item && (item.src || item.ref || item.mediaSrc || item.mediaRef || item.video || item.image)) : [];
            } catch (error) {
              return [];
            }
          }
          function editKnownProfileMedia(kind) {
            const suffix = kind === "ref" ? "Ref" : "";
            return [
              "emyCustomerProfilePhoto" + suffix,
              "emyCustomerProfilePhotoSrc" + suffix,
              "emyCustomerAvatar" + suffix,
              "emyCustomerPhoto" + suffix,
              "emyCustomerProfileImage" + suffix,
              "emyBusinessOwnerCustomerPhoto" + suffix,
              "emyBusinessProfilePhoto" + suffix,
              "emyBusinessAvatar" + suffix,
              "emyBusinessPhoto" + suffix,
              "emyMainPendingSignupPhoto" + suffix,
              "emyMainPendingSignupBusinessPhoto" + suffix
            ].map((key) => String(localStorage.getItem(key) || "").trim()).filter(Boolean);
          }
          function editContentSrc(value) {
            const clean = String(value || "").trim();
            if (!clean) return "";
            return editKnownProfileMedia("src").includes(clean) ? "" : clean;
          }
          function editContentRef(value) {
            const clean = String(value || "").trim();
            if (!clean) return "";
            return editKnownProfileMedia("ref").includes(clean) ? "" : clean;
          }
          function editMediaFromCard(card) {
            const firstMedia = editMediaItemsFromCard(card)[0] || {};
            const node = card && card.querySelector(".feed-job-hero video,.feed-job-hero img,.feed-event-post-hero video,.feed-event-post-hero img,.social-feed-media video,.social-feed-media img,.feed-media video,.feed-media img,.photo video,.photo img,.home-created-media video,.home-created-media img,.feed-article-card-cover video,.feed-article-card-cover img");
            const nodeSrc = editContentSrc(node && (node.currentSrc || node.src || node.getAttribute("src")));
            const nodeRef = editContentRef(node && node.dataset && node.dataset.emyMediaRef);
            const itemSrc = editContentSrc(firstMedia.src || firstMedia.mediaSrc || firstMedia.image || firstMedia.video || firstMedia.url || firstMedia.thumbnailSrc || firstMedia.posterSrc);
            const itemRef = editContentRef(firstMedia.ref || firstMedia.mediaRef || firstMedia.imageRef || firstMedia.videoRef || firstMedia.coverRef);
            const trustCardData = !!(nodeSrc || nodeRef || itemSrc || itemRef);
            const cardSrc = trustCardData ? editContentSrc(card && card.dataset.detailMediaSrc) : "";
            const cardRef = trustCardData ? editContentRef(card && card.dataset.detailMediaRef) : "";
            return {
              src: nodeSrc || cardSrc || itemSrc || "",
              ref: nodeRef || cardRef || itemRef || "",
              type: String(card && card.dataset.detailMediaType || firstMedia.type || firstMedia.mediaType || (node && node.tagName === "VIDEO" ? "video" : node ? "image" : "")).toLowerCase(),
              posterSrc: card && card.dataset.detailPosterSrc || firstMedia.posterSrc || firstMedia.thumbnailSrc || (node && node.tagName === "VIDEO" && (node.getAttribute("poster") || node.poster)) || "",
              posterRef: card && card.dataset.detailPosterRef || firstMedia.posterRef || firstMedia.thumbnailRef || (node && node.dataset && node.dataset.emyPosterRef) || ""
            };
          }
          function editReadMediaFile(file) {
            return new Promise((resolve) => {
              if (!file || !window.FileReader) { resolve(""); return; }
              const reader = new FileReader();
              reader.addEventListener("load", () => resolve(String(reader.result || "")), { once: true });
              reader.addEventListener("error", () => resolve(""), { once: true });
              reader.readAsDataURL(file);
            });
          }
          function renderPreview(preview, card, kind, pendingSettings, pendingMedia) {
            const media = pendingMedia || editMediaFromCard(card);
            const mediaSrc = media.src || "";
            const mediaRef = media.ref || "";
            const mediaType = String(media.type || "").toLowerCase();
            const settings = pendingSettings || mediaSettingsFromCard(card);
            const posterSrc = media.posterRef ? "" : (media.posterSrc || settings.posterSrc || settings.thumbnailSrc || "");
            const posterRef = media.posterRef || settings.posterRef || settings.thumbnailRef || "";
            const hasRealMedia = !!(mediaSrc || mediaRef);
            preview.classList.toggle("is-empty", !hasRealMedia);
            preview.style.setProperty("--media-fit", settings.fit || "contain");
            preview.style.setProperty("--media-zoom", String(settings.zoom || 1));
            preview.style.setProperty("--media-x", (Number(settings.x) || 0) + "%");
            preview.style.setProperty("--media-y", (Number(settings.y) || 0) + "%");
            preview.style.setProperty("--media-aspect-ratio", settings.aspect || "auto");
            preview.style.setProperty("--overlay-x", (Number(settings.overlayX) || 50) + "%");
            preview.style.setProperty("--overlay-y", (Number(settings.overlayY) || 84) + "%");
            if (hasRealMedia) {
              const tag = mediaType === "video" || kind === "video" || kind === "clip" ? "video" : "img";
              const attrs = (mediaSrc ? ' src="' + esc(mediaSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + esc(mediaRef) + '"' : '') + (tag === "video" && posterSrc ? ' poster="' + esc(posterSrc) + '"' : '') + (tag === "video" && posterRef ? ' data-emy-poster-ref="' + esc(posterRef) + '"' : '');
              preview.innerHTML = tag === "video" ? '<video' + attrs + ' controls playsinline preload="metadata"></video>' : '<img' + attrs + ' alt="" />';
              if (settings.overlay) preview.insertAdjacentHTML("beforeend", '<span class="emy-media-overlay-text">' + esc(settings.overlay) + '</span>');
              preview.insertAdjacentHTML("beforeend", '<span class="emy-feed-edit-media-actions"><button class="emy-feed-edit-media-btn" type="button" data-feed-edit-media>Edit media</button><button class="emy-feed-edit-media-btn" type="button" data-feed-edit-change-media>Change</button><button class="emy-feed-edit-media-btn" type="button" data-feed-edit-remove-media>Remove</button></span>');
              if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(preview);
            } else {
              preview.innerHTML = '<strong>' + esc(card.dataset.detailTitle || titleForKind(kind)) + '</strong><span>' + esc(card.dataset.detailDescription || "No media attached.") + '</span><span class="emy-feed-edit-media-actions"><button class="emy-feed-edit-media-btn" type="button" data-feed-edit-change-media>Add image/video</button></span>';
            }
          }
          window.emyOpenFeedEditSheet = function openFeedEditSheet(options) {
            const opts = options || {};
            const card = opts.card;
            if (!card) return;
            if ((card.classList && card.classList.contains("is-repost")) || String(card.dataset && card.dataset.detailKind || "").toLowerCase() === "repost") {
              if (window.emyEditRepostThought) {
                window.emyEditRepostThought(card, opts);
                return;
              }
              if (typeof opts.showToast === "function") opts.showToast("Only your repost note can be edited.");
              return;
            }
            const kind = modalKind(card, opts.kind);
            const modal = ensureModal();
            const titleLabel = modal.querySelector("[data-feed-edit-title-label]");
            const help = modal.querySelector("[data-feed-edit-help]");
            const preview = modal.querySelector("[data-feed-edit-preview]");
            const title = modal.querySelector("[data-feed-edit-title]");
            const description = modal.querySelector("[data-feed-edit-description]");
            const dynamic = modal.querySelector("[data-feed-edit-dynamic]");
            const mediaFile = modal.querySelector("[data-feed-edit-media-file]");
            let pendingMediaSettings = null;
            let pendingMedia = editMediaFromCard(card);
            let pendingMediaChanged = false;
            let pendingMediaSaving = false;
            if (titleLabel) titleLabel.textContent = titleForKind(kind);
            if (help) help.textContent = helperForKind(kind);
            if (title) title.value = card.dataset.detailTitle || "";
            if (description) description.value = card.dataset.detailDescription || "";
            renderDynamicFields(dynamic, card, kind);
            renderPreview(preview, card, kind, pendingMediaSettings, pendingMedia);
            function buildPatch() {
              const patch = {
                editedTitle: title ? title.value.trim() : "",
                editedText: description ? description.value.trim() : ""
              };
              const price = dynamic.querySelector("[data-feed-edit-price]");
              if (price) patch.editedPrice = price.value.trim();
              const jobLocation = dynamic.querySelector("[data-feed-edit-job-location]");
              if (jobLocation) {
                patch.editedJobLocation = jobLocation.value.trim();
                patch.editedJobWorkplace = (dynamic.querySelector("[data-feed-edit-job-workplace]") || {}).value ? dynamic.querySelector("[data-feed-edit-job-workplace]").value.trim() : "";
                patch.editedJobEmployment = (dynamic.querySelector("[data-feed-edit-job-employment]") || {}).value ? dynamic.querySelector("[data-feed-edit-job-employment]").value.trim() : "";
                patch.editedJobNotes = (dynamic.querySelector("[data-feed-edit-job-notes]") || {}).value ? dynamic.querySelector("[data-feed-edit-job-notes]").value.trim() : "";
                patch.editedJobApply = (dynamic.querySelector("[data-feed-edit-job-apply]") || {}).value ? dynamic.querySelector("[data-feed-edit-job-apply]").value.trim() : "";
              }
              const eventType = dynamic.querySelector("[data-feed-edit-event-type]");
              if (eventType) {
                patch.editedEventType = eventType.value.trim() || "Event";
                patch.editedEventWhen = (dynamic.querySelector("[data-feed-edit-event-when]") || {}).value ? dynamic.querySelector("[data-feed-edit-event-when]").value.trim() : "";
                patch.editedEventWhere = (dynamic.querySelector("[data-feed-edit-event-where]") || {}).value ? dynamic.querySelector("[data-feed-edit-event-where]").value.trim() : "";
              }
              if (pendingMediaChanged) {
                patch.mediaSrc = pendingMedia.ref ? "" : (pendingMedia.src || "");
                patch.mediaRef = pendingMedia.ref || "";
                patch.mediaType = pendingMedia.type || "";
              }
              if (pendingMediaSettings) patch.mediaSettings = pendingMediaSettings;
              if (pendingMediaChanged || pendingMediaSettings) {
                const posterRef = pendingMedia.posterRef || (pendingMediaSettings && (pendingMediaSettings.posterRef || pendingMediaSettings.thumbnailRef)) || "";
                const posterSrc = posterRef ? "" : (pendingMedia.posterSrc || (pendingMediaSettings && (pendingMediaSettings.posterSrc || pendingMediaSettings.thumbnailSrc)) || "");
                patch.posterSrc = posterSrc;
                patch.posterRef = posterRef;
              }
              return patch;
            }
            function save() {
              if (pendingMediaSaving) {
                if (typeof opts.showToast === "function") opts.showToast("Hold on while EMY adds this media.");
                return;
              }
              const patch = buildPatch();
              window.emyApplyFeedEditPatch(card, patch, opts);
              const persisted = window.emyPersistFeedEditPatch ? window.emyPersistFeedEditPatch(card, patch, kind) : true;
              if (persisted !== true) {
                if (typeof opts.showToast === "function") {
                  opts.showToast(persisted === "missing" ? "EMY could not find the original saved item to update." : "EMY could not save this edit yet because browser storage is full.");
                }
                return;
              }
              if (typeof opts.updateState === "function") opts.updateState(card, patch);
              if (typeof opts.onSave === "function") opts.onSave(card, patch);
              setOpen(modal, false);
              if (typeof opts.showToast === "function") opts.showToast(titleForKind(kind).replace("Edit", "").trim() + " updated.");
            }
            if (mediaFile) {
              mediaFile.value = "";
              mediaFile.onchange = () => {
                const file = mediaFile.files && mediaFile.files[0];
                if (!file) return;
                const fileType = String(file.type || "").toLowerCase();
                const mediaType = fileType.startsWith("video/") ? "video" : "image";
                const objectUrl = URL.createObjectURL(file);
                pendingMedia = { src: objectUrl, ref: "", type: mediaType, posterSrc: "", posterRef: "" };
                pendingMediaSettings = window.emyDefaultMediaEditSettings ? window.emyDefaultMediaEditSettings(mediaType) : mediaSettingsFromCard(card);
                pendingMediaChanged = true;
                pendingMediaSaving = true;
                renderPreview(preview, card, kind, pendingMediaSettings, pendingMedia);
                const readPromise = mediaType === "video" ? Promise.resolve("") : editReadMediaFile(file);
                const storePromise = window.emyStoreFeedMedia ? window.emyStoreFeedMedia(file, { type: mediaType, name: file.name || "feed-edit-media" }).catch(() => null) : Promise.resolve(null);
                Promise.all([readPromise, storePromise]).then(([src, record]) => {
                  pendingMedia = { src: mediaType === "video" ? objectUrl : (src || objectUrl), ref: record && record.id || "", type: mediaType, posterSrc: pendingMedia.posterSrc || "", posterRef: pendingMedia.posterRef || "" };
                  renderPreview(preview, card, kind, pendingMediaSettings, pendingMedia);
                  if (!pendingMedia.ref && typeof opts.showToast === "function") opts.showToast("Media added for this session, but browser storage did not save it.");
                }).finally(() => {
                  pendingMediaSaving = false;
                });
              };
            }
            modal.onclick = (event) => {
              if (event.target === modal || event.target.closest("[data-feed-edit-close], [data-feed-edit-cancel]")) {
                event.preventDefault();
                setOpen(modal, false);
                return;
              }
              if (event.target.closest("[data-feed-edit-save]")) {
                event.preventDefault();
                save();
                return;
              }
              if (event.target.closest("[data-feed-edit-change-media]")) {
                event.preventDefault();
                if (mediaFile) mediaFile.click();
                return;
              }
              if (event.target.closest("[data-feed-edit-remove-media]")) {
                event.preventDefault();
                pendingMedia = { src: "", ref: "", type: "", posterSrc: "", posterRef: "" };
                pendingMediaChanged = true;
                pendingMediaSettings = null;
                renderPreview(preview, card, kind, pendingMediaSettings, pendingMedia);
                return;
              }
              if (event.target.closest("[data-feed-edit-media]")) {
                event.preventDefault();
                const mediaSrc = pendingMedia.src || "";
                const mediaRef = pendingMedia.ref || "";
                const mediaType = String(pendingMedia.type || "").toLowerCase();
                if (!window.emyOpenMediaEditor || !(mediaSrc || mediaRef)) return;
                const openEditor = (src) => window.emyOpenMediaEditor({
                  src: src || mediaSrc,
                  type: mediaType === "video" || kind === "video" || kind === "clip" ? "video" : "image",
                  settings: pendingMediaSettings || mediaSettingsFromCard(card),
                  applyLabel: "Apply media",
                  postLabel: "Save changes",
                  onApply: (settings, submitNow) => {
                    pendingMediaSettings = settings;
                    pendingMedia.posterSrc = settings && (settings.posterRef || settings.thumbnailRef) ? "" : (settings && (settings.posterSrc || settings.thumbnailSrc) || "");
                    pendingMedia.posterRef = settings && (settings.posterRef || settings.thumbnailRef) || "";
                    renderPreview(preview, card, kind, pendingMediaSettings, pendingMedia);
                    if (submitNow) save();
                  }
                });
                if (!mediaSrc && mediaRef && window.emyResolveFeedMedia) {
                  window.emyResolveFeedMedia(mediaRef).then((record) => {
                    if (record && record.url) {
                      pendingMedia = { src: record.url, ref: mediaRef, type: record.mediaType || mediaType || "", posterSrc: pendingMedia.posterSrc || "", posterRef: pendingMedia.posterRef || "" };
                      openEditor(record.url);
                    }
                  }).catch(() => {});
                  return;
                }
                openEditor(mediaSrc);
              }
            };
            setOpen(modal, true);
            if (title) title.focus({ preventScroll: true });
          };
        })();

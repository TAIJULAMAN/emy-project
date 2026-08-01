

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

    

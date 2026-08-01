/* EMY generator section: 17-feed-edit-runtime.cjs (source lines 18898-20031) */
const emyFeedEditSheetRuntimeScript = String.raw`
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
          function editScheduleHeavyInteraction(callback, timeout) {
            const schedule = window.emyScheduleHeavyInteraction;
            if (typeof schedule === "function") {
              schedule(callback, { timeout: timeout || 900 });
              return;
            }
            if (typeof window.requestIdleCallback === "function") {
              window.requestIdleCallback(callback, { timeout: timeout || 900 });
              return;
            }
            window.setTimeout(callback, 40);
          }
          function editSourceKey(card, kind) {
            const sourceKind = String(kind || (card && card.dataset.detailKind) || "").toLowerCase();
            if (sourceKind.indexOf("job") >= 0 || sourceKind.indexOf("hiring") >= 0) return "emyFeedCreatedJobs";
            if (sourceKind.indexOf("event") >= 0) return "emyFeedCreatedEvents";
            if (sourceKind.indexOf("article") >= 0) return "emyFeedCreatedPosts";
            return "emyFeedCreatedPosts";
          }
          function editDispatchCreatedChange(key, id, detail) {
            const payload = Object.assign({ id: id || "" }, detail || {});
            if (key === "emyFeedCreatedPosts") window.dispatchEvent(new CustomEvent("emy:created-posts-changed", { detail: payload }));
            if (key === "emyFeedCreatedJobs") window.dispatchEvent(new CustomEvent("emy:created-jobs-changed", { detail: payload }));
            if (key === "emyFeedCreatedEvents") window.dispatchEvent(new CustomEvent("emy:created-events-changed", { detail: payload }));
          }
          function editDispatchCreatedChangeLater(key, id, detail) {
            editScheduleHeavyInteraction(() => editDispatchCreatedChange(key, id, detail), 800);
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
          function editCloudinaryCloudName() {
            const backendConfig = window.EMY_REAL_BACKEND_CONFIG && window.EMY_REAL_BACKEND_CONFIG.cloudinary;
            const authConfig = window.emyRealAuth && window.emyRealAuth.config && window.emyRealAuth.config.cloudinary;
            return String((backendConfig && backendConfig.cloudName) || (authConfig && authConfig.cloudName) || "dupytlsjv").trim() || "dupytlsjv";
          }
          function editLooksStoredMediaRef(value) {
            const clean = String(value || "").trim();
            if (!clean) return false;
            if (/^(data:image\/|data:video\/|blob:|https?:\/\/|file:|\/|\.{1,2}\/|assets\/)/i.test(clean)) return false;
            return /^emy-media-|^business-|^customer-|^profile-|^media-/i.test(clean);
          }
          function editCloudinaryMediaUrl(publicId, type) {
            let clean = String(publicId || "").trim();
            if (!clean) return "";
            if (/^(https?:\/\/|data:image\/|data:video\/|blob:)/i.test(clean)) return clean;
            clean = clean.replace(/^emy-video-ref:/i, "").replace(/^emy-ref:/i, "");
            if (!clean || editLooksStoredMediaRef(clean)) return "";
            const resource = String(type || "").toLowerCase() === "video" ? "video" : "image";
            return "https://res.cloudinary.com/" + encodeURIComponent(editCloudinaryCloudName()) + "/" + resource + "/upload/" + clean.split("/").map((part) => encodeURIComponent(part)).join("/");
          }
          function editCloudinaryVideoPosterUrl(publicId) {
            let clean = String(publicId || "").trim();
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
            if (!clean || editLooksStoredMediaRef(clean)) return "";
            return "https://res.cloudinary.com/" + encodeURIComponent(editCloudinaryCloudName()) + "/video/upload/so_0.2,f_jpg/" + clean.split("/").map((part) => encodeURIComponent(part)).join("/") + ".jpg";
          }
          function editCloudinaryPosterUrl(publicId, posterPublicId, type) {
            const explicitPoster = editCloudinaryMediaUrl(posterPublicId, "image");
            if (explicitPoster) return explicitPoster;
            return String(type || "").toLowerCase() === "video" ? editCloudinaryVideoPosterUrl(publicId) : "";
          }
          function editNormaliseCreatedMedia(next) {
            if (!next || typeof next !== "object") return next;
            const mediaItems = Array.isArray(next.mediaItems) ? next.mediaItems : [];
            const first = mediaItems[0] && typeof mediaItems[0] === "object" ? mediaItems[0] : null;
            const firstType = first && (first.type || first.mediaType || first.cloudinaryResourceType || first.resourceType) || "";
            const firstPosterPublicId = first && (first.cloudinaryPosterPublicId || first.posterPublicId || first.thumbnailPublicId) || "";
            if (!next.mediaType && firstType) next.mediaType = String(firstType).toLowerCase() === "video" ? "video" : "image";
            if (!next.mediaRef && first) next.mediaRef = first.ref || first.mediaRef || first.imageRef || first.videoRef || "";
            if (!next.mediaSrc && first) next.mediaSrc = first.src || first.mediaSrc || first.image || first.video || first.url || "";
            if (!next.cloudinaryPublicId && first) next.cloudinaryPublicId = first.cloudinaryPublicId || first.mediaPublicId || first.imagePublicId || first.videoPublicId || first.publicId || "";
            if (!next.cloudinaryResourceType && first) next.cloudinaryResourceType = first.cloudinaryResourceType || first.resourceType || first.mediaResourceType || next.mediaType || "";
            const resourceType = next.cloudinaryResourceType || next.mediaType || firstType;
            const uploadedSrc = editCloudinaryMediaUrl(next.cloudinaryPublicId, resourceType);
            const uploadedPosterSrc = editCloudinaryPosterUrl(next.cloudinaryPublicId, next.cloudinaryPosterPublicId || firstPosterPublicId, resourceType);
            if (!next.mediaSrc && !next.mediaRef && uploadedSrc) next.mediaSrc = uploadedSrc;
            if (!next.posterSrc && !next.posterRef && uploadedPosterSrc) {
              next.posterSrc = uploadedPosterSrc;
              next.thumbnailSrc = uploadedPosterSrc;
            }
            if (first && !first.src && !first.mediaSrc && !first.ref && !first.mediaRef && uploadedSrc) {
              first.src = uploadedSrc;
              first.type = next.mediaType || (String(next.cloudinaryResourceType || firstType).toLowerCase() === "video" ? "video" : "image");
              first.cloudinaryPublicId = next.cloudinaryPublicId || first.cloudinaryPublicId || "";
              first.cloudinaryResourceType = next.cloudinaryResourceType || first.cloudinaryResourceType || first.type;
            }
            if (first && !first.posterSrc && !first.thumbnailSrc && !first.posterRef && !first.thumbnailRef && uploadedPosterSrc) {
              first.posterSrc = uploadedPosterSrc;
              first.thumbnailSrc = uploadedPosterSrc;
              if (next.cloudinaryPosterPublicId || firstPosterPublicId) first.cloudinaryPosterPublicId = next.cloudinaryPosterPublicId || firstPosterPublicId;
            }
            if (next.mediaType === "image" && !next.image && next.mediaSrc) next.image = next.mediaSrc;
            if (next.mediaType === "video" && !next.video && next.mediaSrc) next.video = next.mediaSrc;
            return next;
          }
          function editNormaliseCreatedItem(item, kind) {
            const next = Object.assign({}, item || {});
            const sourceKind = String(kind || next.kind || next.type || next.createType || "").toLowerCase();
            const now = new Date().toISOString();
            const originalCreatedAt = String(next.createdAt || next.postedAt || "").trim();
            if (!next.id) next.id = "feed-create-" + Date.now();
            if (!next.kind) next.kind = sourceKind.indexOf("job") >= 0 ? "job" : sourceKind.indexOf("event") >= 0 ? "event" : sourceKind.indexOf("article") >= 0 ? "article" : "post";
            if (!next.type) next.type = next.kind;
            if (!next.createType) next.createType = next.kind;
            if (!next.business && next.name) next.business = next.name;
            if (!next.actor && next.business) next.actor = next.business;
            if (!next.text && next.description) next.text = next.description;
            if (!next.description && next.text) next.description = next.text;
            editNormaliseCreatedMedia(next);
            next.updatedAt = now;
            next.createdAt = originalCreatedAt || now;
            next.postedAt = String(next.postedAt || "").trim() || next.createdAt;
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
          function editSlug(value) {
            return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          }
          function editActiveRole() {
            try {
              const params = new URLSearchParams(window.location.search || "");
              const mode = String(params.get("mode") || "").trim().toLowerCase();
              const path = String(window.location.pathname || "").toLowerCase();
              if (mode === "business" || mode === "customer") return mode;
              if (/emy-customer-/i.test(path)) return "customer";
              if (/emy-business-profile\.html/i.test(path)) {
                const view = String(params.get("view") || "").toLowerCase();
                if (params.get("setup") === "1" || view === "business" || ["business", "statistics", "services", "chat", "customers", "upload", "profile", "edit"].includes(mode)) return "business";
                if (params.has("business") || view === "customer") return "customer";
                if (
                  localStorage.getItem("emyBusinessProfileDraft") ||
                  localStorage.getItem("emyBusinessProfilePhoto") ||
                  localStorage.getItem("emyBusinessProfilePhotoSrc") ||
                  localStorage.getItem("emyBusinessProfilePhotoRef") ||
                  localStorage.getItem("emyBusinessDisplayName") ||
                  localStorage.getItem("emyBusinessName")
                ) return "business";
              }
              const role = String(localStorage.getItem("emyMainSignedInRole") || localStorage.getItem("emyMainPendingSignupRole") || "").trim().toLowerCase();
              return role === "business" ? "business" : "customer";
            } catch (error) {
              return "customer";
            }
          }
          function editCurrentBusinessKeySet() {
            const keys = new Set();
            function add(value) {
              const slug = editSlug(value);
              if (slug) keys.add(slug);
            }
            ["profile", "business-profile"].forEach(add);
            add(localStorage.getItem("emyBusinessProfileKey"));
            add(localStorage.getItem("emyBusinessKey"));
            add(localStorage.getItem("emyBusinessDisplayName"));
            add(localStorage.getItem("emyBusinessName"));
            try {
              const draft = JSON.parse(localStorage.getItem("emyBusinessProfileDraft") || "null");
              if (draft && typeof draft === "object") {
                add(draft.businessKey);
                add(draft.key);
                add(draft.slug);
                add(draft.businessName);
                add(draft.name);
              }
            } catch (error) {}
            return keys;
          }
          function editJobCardOwnedByActiveBusiness(card) {
            if (editActiveRole() !== "business" || !card || !card.dataset) return false;
            const data = card.dataset;
            const keys = editCurrentBusinessKeySet();
            const candidates = [data.businessKey, data.detailBusinessKey, data.ownerKey, data.detailBusiness].map(editSlug).filter(Boolean);
            return candidates.some((key) => keys.has(key));
          }
          function emyJobCardIsCreator(card) {
            if (!card) return false;
            const data = card.dataset || {};
            if (data.publicCustomerSurface === "true" || (card.closest && card.closest("[data-public-business], .public-business-profile, .public-activity-section, .public-business-catalog, .public-business-product-card, .public-business-post-card, .public-business-clip-card"))) return false;
            if (data.ownedJob === "true" || card.classList.contains("is-owned")) return true;
            if (card.closest && card.closest(".business-posted-list")) return true;
            if (editCardLooksBusinessOwned(card)) return editJobCardOwnedByActiveBusiness(card);
            return editCardLooksOwned(card);
          }
          window.emyJobCardIsCreator = emyJobCardIsCreator;
          window.emyPersistCreatedFeedItem = function persistCreatedFeedItem(item, kind) {
            const key = editSourceKey(null, kind || (item && (item.kind || item.type || item.createType)));
            const normalised = editNormaliseCreatedItem(item, kind);
            editClearDeletedId(normalised);
            const items = editReadArray(key);
            const existingIndex = items.findIndex((existing) => existing && String(existing.id || "") === String(normalised.id || ""));
            if (existingIndex >= 0) items[existingIndex] = normalised;
            else items.unshift(normalised);
            const ok = editWriteArray(key, items, key === "emyFeedCreatedPosts" ? 80 : 60);
            if (ok) editDispatchCreatedChange(key, normalised.id, { saved: true, createType: normalised.createType || normalised.postMode || normalised.tag || normalised.kind || kind || "post" });
            return ok;
          };
          window.emyDeleteStoredFeedItem = function deleteStoredFeedItem(card, kind) {
            if (!card || !card.dataset) return true;
            const primaryKey = editSourceKey(card, kind);
            const feedId = card.dataset.feedId || "";
            const kindText = String(kind || card.dataset.detailKind || "").toLowerCase();
            const isClip = /clip|reel/.test(kindText) || card.classList.contains("is-clip") || card.classList.contains("reel-card");
            const mirrorKeys = primaryKey === "emyFeedCreatedPosts"
              ? ["emyBusinessFeedPosts", "emyBusinessPosts", "emyBusinessArticles", "emyBusinessArticlePosts"].concat(isClip ? ["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"] : [])
              : primaryKey === "emyFeedCreatedJobs"
                ? ["emyBusinessJobs", "emyBusinessJobPosts"]
                : primaryKey === "emyFeedCreatedEvents"
                  ? ["emyBusinessEvents", "emyBusinessEventPosts"]
                  : isClip ? ["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"] : [];
            const keys = [primaryKey, "emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents"].concat(mirrorKeys).filter((key, index, list) => list.indexOf(key) === index);
            editMarkDeletedId(card);
            editActionStatePatch(card, { hidden: true, deleted: true });
            editScheduleHeavyInteraction(() => {
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
                  editDispatchCreatedChange(key, feedId, { deleted: true });
                }
              });
              removedItems.forEach((item) => editMarkDeletedId(item));
              editDispatchCreatedChange(primaryKey, feedId, { deleted: true, tombstone: true, removedFromStorage: changed, failed });
              if (changed && typeof window.emyFlushSharedPortContentKeys === "function") {
                window.emyFlushSharedPortContentKeys(keys, "delete-flush");
              }
              if (failed && typeof showToast === "function") showToast("EMY is still cleaning up this deleted post.");
            }, 1000);
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
              const hasReplacementMedia = !!(mediaSrc || mediaRef);
              next.mediaSrc = mediaSrc;
              next.mediaRef = mediaRef;
              next.mediaType = mediaType;
              next.posterSrc = posterSrc;
              next.posterRef = posterRef;
              next.thumbnailSrc = posterSrc;
              next.thumbnailRef = posterRef;
              next.mediaItems = hasReplacementMedia ? [{ type: mediaType || "image", src: mediaSrc, ref: mediaRef, posterSrc, posterRef, settings: next.mediaSettings || null }] : [];
              next.mediaRemoved = !hasReplacementMedia;
              next.mediaClearedAt = hasReplacementMedia ? "" : new Date().toISOString();
              if (hasReplacementMedia) {
                next.cloudinaryPublicId = patch.cloudinaryPublicId || "";
                next.cloudinaryResourceType = patch.cloudinaryResourceType || "";
                next.cloudinaryBytes = Number(patch.cloudinaryBytes) || 0;
                next.cloudinaryDuration = Number(patch.cloudinaryDuration) || 0;
                next.cloudinaryPosterPublicId = patch.cloudinaryPosterPublicId || "";
                if (next.mediaItems[0]) {
                  next.mediaItems[0].cloudinaryPublicId = next.cloudinaryPublicId;
                  next.mediaItems[0].cloudinaryResourceType = next.cloudinaryResourceType;
                  next.mediaItems[0].cloudinaryBytes = next.cloudinaryBytes;
                  next.mediaItems[0].cloudinaryDuration = next.cloudinaryDuration;
                  next.mediaItems[0].cloudinaryPosterPublicId = next.cloudinaryPosterPublicId;
                }
              } else {
                [
                  "cloudinaryPublicId",
                  "cloudinaryResourceType",
                  "cloudinaryPosterPublicId",
                  "mediaPublicId",
                  "imagePublicId",
                  "videoPublicId",
                  "posterPublicId",
                  "thumbnailPublicId",
                  "coverPublicId",
                  "eventCoverPublicId",
                  "jobCoverPublicId",
                  "coverPosterPublicId",
                  "eventCoverPosterPublicId",
                  "jobCoverPosterPublicId"
                ].forEach((key) => { if (Object.prototype.hasOwnProperty.call(next, key)) next[key] = ""; });
              }
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
            const originalCreatedAt = String((item && (item.createdAt || item.postedAt)) || "").trim();
            if (originalCreatedAt) {
              next.createdAt = originalCreatedAt;
              next.postedAt = String(next.postedAt || "").trim() || originalCreatedAt;
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
              editDispatchCreatedChangeLater(key, matchedId, { edited: true });
            });
            if (failed) return "quota";
            editActionStatePatch(card, patch);
            if (!matchedKey) {
              editDispatchCreatedChangeLater(primaryKey, card.dataset.feedId || "", { edited: true, actionStateOnly: true });
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
              if (window.emyHydrateFeedMedia) editScheduleHeavyInteraction(() => window.emyHydrateFeedMedia(preview), 700);
            } else {
              preview.innerHTML = '<strong>' + esc(card.dataset.detailTitle || titleForKind(kind)) + '</strong><span>' + esc(card.dataset.detailDescription || "No media attached.") + '</span><span class="emy-feed-edit-media-actions"><button class="emy-feed-edit-media-btn" type="button" data-feed-edit-change-media>Add image/video</button></span>';
            }
          }
          function editPrepareMediaUpload(fileOrBlob, type, name) {
            if (window.emyPrepareFeedMediaUpload) {
              return window.emyPrepareFeedMediaUpload(fileOrBlob, { type, name, kind:"feed-edit", role:"customer", allowBrowserFallback:false }).catch(() => null);
            }
            return Promise.resolve(null);
          }
          function editApplyPreparedMedia(pendingMedia, record, objectUrl) {
            if (!pendingMedia || !record) return false;
            if (record.src) {
              if (objectUrl && objectUrl.indexOf("blob:") === 0) {
                try { URL.revokeObjectURL(objectUrl); } catch (error) {}
              }
              pendingMedia.src = record.src;
              pendingMedia.ref = "";
            } else if (record.ref || record.id) {
              pendingMedia.ref = record.ref || record.id || "";
            } else {
              return false;
            }
            pendingMedia.type = record.type || pendingMedia.type || "image";
            pendingMedia.name = record.name || pendingMedia.name || "";
            pendingMedia.cloudinaryPublicId = record.cloudinaryPublicId || "";
            pendingMedia.cloudinaryResourceType = record.cloudinaryResourceType || "";
            pendingMedia.cloudinaryBytes = Number(record.cloudinaryBytes) || 0;
            pendingMedia.cloudinaryDuration = Number(record.cloudinaryDuration) || 0;
            pendingMedia.cloudinaryPosterPublicId = record.cloudinaryPosterPublicId || pendingMedia.cloudinaryPosterPublicId || "";
            if (pendingMedia.type === "video" && !pendingMedia.posterRef && !pendingMedia.posterSrc) {
              const posterSrc = editCloudinaryPosterUrl(pendingMedia.cloudinaryPublicId || pendingMedia.src, pendingMedia.cloudinaryPosterPublicId, "video");
              if (posterSrc) pendingMedia.posterSrc = posterSrc;
            }
            return true;
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
            let pendingMediaUploadFailed = false;
            let pendingSaveAfterMedia = false;
            if (titleLabel) titleLabel.textContent = titleForKind(kind);
            if (help) help.textContent = helperForKind(kind);
            if (title) title.value = card.dataset.detailTitle || "";
            if (description) description.value = card.dataset.detailDescription || "";
            renderDynamicFields(dynamic, card, kind);
            renderPreview(preview, card, kind, pendingMediaSettings, pendingMedia);
            const saveButton = modal.querySelector("[data-feed-edit-save]");
            if (saveButton) {
              saveButton.disabled = false;
              saveButton.textContent = "Save changes";
            }
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
                patch.cloudinaryPublicId = pendingMedia.cloudinaryPublicId || "";
                patch.cloudinaryResourceType = pendingMedia.cloudinaryResourceType || "";
                patch.cloudinaryBytes = Number(pendingMedia.cloudinaryBytes) || 0;
                patch.cloudinaryDuration = Number(pendingMedia.cloudinaryDuration) || 0;
                patch.cloudinaryPosterPublicId = pendingMedia.cloudinaryPosterPublicId || "";
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
              if (pendingMediaSaving && pendingMediaChanged) {
                pendingSaveAfterMedia = true;
                const queuedSaveButton = modal.querySelector("[data-feed-edit-save]");
                if (queuedSaveButton) {
                  queuedSaveButton.disabled = true;
                  queuedSaveButton.textContent = "Saving...";
                }
                if (typeof opts.showToast === "function") opts.showToast("Media is uploading. EMY will save this edit when it is ready.");
                return;
              }
              if (pendingMediaUploadFailed) {
                pendingSaveAfterMedia = false;
                const failedSaveButton = modal.querySelector("[data-feed-edit-save]");
                if (failedSaveButton) {
                  failedSaveButton.disabled = false;
                  failedSaveButton.textContent = "Save changes";
                }
                if (typeof opts.showToast === "function") opts.showToast("Upload this media before saving.");
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
                pendingMediaUploadFailed = false;
                renderPreview(preview, card, kind, pendingMediaSettings, pendingMedia);
                const readPromise = mediaType === "video" ? Promise.resolve("") : editReadMediaFile(file);
                const storePromise = editPrepareMediaUpload(file, mediaType, file.name || "feed-edit-media");
                Promise.all([readPromise, storePromise]).then(([src, record]) => {
                  const nextMedia = { src: mediaType === "video" ? objectUrl : (src || objectUrl), ref: "", type: mediaType, posterSrc: pendingMedia.posterSrc || "", posterRef: pendingMedia.posterRef || "" };
                  const applied = editApplyPreparedMedia(nextMedia, record, objectUrl);
                  pendingMediaUploadFailed = !applied;
                  nextMedia.uploadFailed = !applied;
                  pendingMedia = nextMedia;
                  renderPreview(preview, card, kind, pendingMediaSettings, pendingMedia);
                  if (!applied && typeof opts.showToast === "function") opts.showToast("Media upload failed. Try a smaller file or check your connection.");
                }).finally(() => {
                  pendingMediaSaving = false;
                  const readySaveButton = modal.querySelector("[data-feed-edit-save]");
                  if (readySaveButton) {
                    readySaveButton.disabled = false;
                    readySaveButton.textContent = "Save changes";
                  }
                  if (pendingSaveAfterMedia) {
                    pendingSaveAfterMedia = false;
                    window.setTimeout(save, 0);
                  }
                });
              };
            }
            modal.onclick = (event) => {
              if (event.target === modal || event.target.closest("[data-feed-edit-close], [data-feed-edit-cancel]")) {
                event.preventDefault();
                pendingSaveAfterMedia = false;
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
                pendingMediaUploadFailed = false;
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
                    const resolvedSrc = record && (record.url || record.src) || "";
                    if (resolvedSrc) {
                      pendingMedia = { src: resolvedSrc, ref: mediaRef, type: record.mediaType || mediaType || "", posterSrc: pendingMedia.posterSrc || "", posterRef: pendingMedia.posterRef || "" };
                      openEditor(resolvedSrc);
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
`;

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

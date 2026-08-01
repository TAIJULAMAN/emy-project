/* restored from backup */
function patchLockedCustomerHomeNotifications(html) {
  let next = String(html || '');
  if (!next.includes('.notification-thumb.is-fallback b')) {
    next = next.replace(
      '.notification-thumb.is-fallback { color: #c14f00; font-size: 10px; font-weight: 800; text-transform: uppercase; }',
      String.raw`.notification-thumb.is-fallback {
        display: grid;
        place-items: center;
        gap: 2px;
        border: 1px solid rgba(0,27,71,.06);
        color: #344054;
        font-size: 10px;
        font-weight: 800;
        text-transform: none;
        text-align: center;
        line-height: 1.05;
        padding: 4px;
      }
      .notification-thumb.is-fallback b { display: block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 10px; line-height: 1.05; }
      .notification-thumb.is-fallback small { display: block; color: rgba(52,64,84,.72); font-size: 8px; font-weight: 800; letter-spacing: 0; text-transform: uppercase; }
      .notification-thumb.is-product { background: linear-gradient(145deg, #fff7ed, #fffaf4); color: #b54708; }
      .notification-thumb.is-post, .notification-thumb.is-image, .notification-thumb.is-video { background: linear-gradient(145deg, #eff8ff, #f7fbff); color: #175cd3; }
      .notification-thumb.is-clip { background: linear-gradient(145deg, #101828, #344054); color: #fff; }
      .notification-thumb.is-message, .notification-thumb.is-comment, .notification-thumb.is-reply { background: linear-gradient(145deg, #f4f3ff, #fbfaff); color: #5925dc; }`
    );
  }
  next = next.replace(
    /        function notificationMediaFromStorage\(item\) \{[\s\S]*?\n        function markNotificationsSeen\(\) \{/,
    String.raw`        function notificationMediaFromStorage(item) {
          const ref = item && item.ref && typeof item.ref === "object" ? item.ref : {};
          const title = notificationSlug(ref.itemTitle || ref.title || ref.name || item.itemTitle || item.clipTitle || item.jobTitle || item.title || item.message);
          const id = String(ref.id || ref.itemId || ref.feedId || item.itemId || item.feedId || item.postId || item.jobId || item.eventId || item.id || "");
          const businessKey = notificationSlug(item.businessKey || item.key || item.businessName || ref.businessKey || ref.businessName);
          const match = notificationStoredItems().find((entry) => {
            const entryId = String(entry.id || entry.itemId || entry.feedId || entry.jobId || entry.eventId || "");
            const entryTitle = notificationSlug(entry.itemTitle || entry.jobTitle || entry.title || entry.name || entry.text || entry.caption);
            const entryKey = notificationSlug(entry.businessKey || entry.key || entry.business || entry.businessName || entry.actor);
            return (id && entryId && (id === entryId || id.indexOf(entryId) >= 0 || entryId.indexOf(id) >= 0)) ||
              (title && entryTitle && (entryTitle.indexOf(title) >= 0 || title.indexOf(entryTitle) >= 0)) ||
              (businessKey && entryKey === businessKey && (entry.mediaSrc || entry.mediaRef || entry.image || entry.imageRef || entry.video || entry.videoRef || entry.coverRef || entry.eventCoverRef || entry.jobCoverRef || entry.avatarSrc || (Array.isArray(entry.mediaItems) && entry.mediaItems.length)));
          }) || {};
          const matchMediaItems = Array.isArray(match.mediaItems) ? match.mediaItems : [];
          const refMediaItems = Array.isArray(ref.mediaItems) ? ref.mediaItems : [];
          const firstMedia = refMediaItems[0] || matchMediaItems[0] || {};
          const itemSettings = item.mediaSettings && typeof item.mediaSettings === "object" ? item.mediaSettings : {};
          const refSettings = ref.mediaSettings && typeof ref.mediaSettings === "object" ? ref.mediaSettings : {};
          const matchSettings = firstMedia.settings && typeof firstMedia.settings === "object" ? firstMedia.settings : (match.mediaSettings && typeof match.mediaSettings === "object" ? match.mediaSettings : {});
          const businessPhoto = notificationDirectOrRef(localStorage.getItem("emyBusinessProfilePhoto") || localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyBusinessProfilePhotoRef"), "image");
          const pendingRoleForAvatar = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          const customerSignupPhoto = pendingRoleForAvatar === "customer" ? localStorage.getItem("emyMainPendingSignupPhoto") || localStorage.getItem("emyMainPendingSignupPhotoSrc") : "";
          const customerSignupPhotoRef = pendingRoleForAvatar === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "";
          const customerPhoto = notificationDirectOrRef(localStorage.getItem("emyCustomerProfilePhoto") || localStorage.getItem("emyCustomerProfilePhotoSrc") || customerSignupPhoto, localStorage.getItem("emyCustomerProfilePhotoRef") || customerSignupPhotoRef, "image");
          const avatar = notificationDirectOrRef(item.avatar || item.avatarSrc || item.actorPhoto || item.actorAvatar || item.viewerPhoto || item.customerPhoto || item.customerPhotoSrc || item.customerAvatar || item.profilePhoto || item.profilePhotoSrc || item.photo || item.photoSrc || item.imageSrc || item.logo || item.businessPhoto, item.avatarRef || item.actorPhotoRef || item.actorAvatarRef || item.viewerPhotoRef || item.customerPhotoRef || item.customerAvatarRef || item.profilePhotoRef || item.photoRef || item.imageRef || item.logoRef || item.businessPhotoRef, "image") ||
            notificationDirectOrRef(ref.avatar || ref.avatarSrc || ref.actorPhoto || ref.customerPhoto || ref.profilePhoto || ref.logo || ref.photo, ref.avatarRef || ref.actorPhotoRef || ref.customerPhotoRef || ref.profilePhotoRef || ref.logoRef || ref.photoRef, "image") ||
            notificationDirectOrRef(match.avatarSrc || match.avatar || match.actorPhoto || match.viewerPhoto || match.customerPhoto || match.profilePhoto || match.logo || match.photo, match.avatarRef || match.actorPhotoRef || match.viewerPhotoRef || match.customerPhotoRef || match.profilePhotoRef || match.logoRef || match.photoRef, "image") ||
            (businessKey ? businessPhoto : "") ||
            customerPhoto;
          const itemThumb = notificationDirectOrRef(item.thumb || item.thumbnail || item.image || item.imageSrc || item.cover || item.coverSrc || item.eventCoverSrc || item.jobCoverSrc || ref.thumb || ref.thumbnail || ref.image || ref.imageSrc || ref.cover || ref.coverSrc, item.thumbRef || item.thumbnailRef || item.imageRef || item.coverRef || item.eventCoverRef || item.jobCoverRef || ref.thumbRef || ref.thumbnailRef || ref.imageRef || ref.coverRef, "image");
          const itemPoster = notificationDirectOrRef(item.posterSrc || item.thumbnailSrc || itemSettings.posterSrc || itemSettings.thumbnailSrc || ref.posterSrc || ref.thumbnailSrc || refSettings.posterSrc || refSettings.thumbnailSrc, item.posterRef || item.thumbnailRef || itemSettings.posterRef || itemSettings.thumbnailRef || ref.posterRef || ref.thumbnailRef || refSettings.posterRef || refSettings.thumbnailRef, "image");
          const itemMain = notificationDirectOrRef(item.mediaSrc || item.video || item.videoSrc || item.media || item.url || ref.mediaSrc || ref.video || ref.videoSrc || ref.media || ref.url, item.mediaRef || item.videoRef || ref.mediaRef || ref.videoRef, item.mediaType || ref.mediaType);
          const matchPoster = notificationDirectOrRef(firstMedia.posterSrc || firstMedia.thumbnailSrc || match.posterSrc || match.thumbnailSrc || matchSettings.posterSrc || matchSettings.thumbnailSrc, firstMedia.posterRef || firstMedia.thumbnailRef || match.posterRef || match.thumbnailRef || matchSettings.posterRef || matchSettings.thumbnailRef, "image");
          const matchMain = notificationDirectOrRef(firstMedia.src || firstMedia.mediaSrc || match.image || match.video || match.mediaSrc || match.cover || match.coverSrc || match.eventCoverSrc || match.jobCoverSrc, firstMedia.ref || firstMedia.mediaRef || match.mediaRef || match.imageRef || match.videoRef || match.coverRef || match.eventCoverRef || match.jobCoverRef, firstMedia.type || match.mediaType || match.coverType || match.eventCoverType || match.jobCoverType);
          return {
            avatar,
            thumb: itemThumb || itemPoster || itemMain || matchPoster || matchMain
          };
        }

        function markNotificationsSeen() {`
  );
  next = next.replace(
    /        function readNotifications\(\) \{[\s\S]*?\n        function formatNotificationTime\(value\) \{/,
    String.raw`        function readNotifications() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyCustomerNotifications") || "[]");
            if (!Array.isArray(parsed)) return [];
            return parsed.filter((item) => !notificationIsSelfAction(item) && !(item && item.hidden)).map((item, index) => {
              const media = notificationMediaFromStorage(item || {});
              return {
                id: String(item.id || "notification-" + index),
                group: String(item.group || item.type || (item.important ? "important" : "more")),
                type: String(item.type || ""),
                action: String(item.action || ""),
                itemKind: String(item.itemKind || item.kind || item.contentKind || ""),
                itemTitle: String(item.itemTitle || item.clipTitle || item.jobTitle || item.title || item.message || ""),
                feedId: String(item.feedId || item.itemId || item.postId || item.clipId || item.productId || item.jobId || item.eventId || ""),
                title: String(item.title || item.message || ""),
                body: String(item.body || item.detail || item.message || ""),
                message: String(item.message || ""),
                time: formatNotificationTime(item.time || item.createdAt || item.addedAt),
                rawTime: String(item.time || item.createdAt || item.addedAt || ""),
                businessKey: String(item.businessKey || item.key || ""),
                customerKey: String(item.customerKey || item.customerId || item.viewerKey || item.actorKey || ""),
                href: String(item.href || item.url || ""),
                avatar: media.avatar,
                thumb: media.thumb,
                actorName: String(item.actorName || item.customerName || item.viewerName || item.author || item.name || ""),
                initials: String(item.actorName || item.customerName || item.viewerName || item.author || item.name || item.initials || ""),
                ref: item.ref && typeof item.ref === "object" ? item.ref : {},
                raw: item,
                unread: item.unread !== false && item.read !== true
              };
            }).filter((item) => item.title.trim());
          } catch (error) {
            return [];
          }
        }

        function formatNotificationTime(value) {`
  );
  if (!next.includes('function notificationKindLabel(item)')) {
    next = next.replace(
      /        function notificationTarget\(item\) \{[\s\S]*?\n        function dismissNotification\(id, message\) \{/,
      String.raw`        function notificationIsBusinessReview(item) {
          const ref = item && item.ref && typeof item.ref === "object" ? item.ref : {};
          const identity = [
            item && item.id,
            item && item.itemKind,
            item && item.kind,
            item && item.action,
            item && item.type,
            item && item.title,
            ref && (ref.kind || ref.type || ref.itemKind || ref.action || ref.target)
          ].join(" ").toLowerCase();
          const message = [
            item && item.title,
            item && item.body,
            item && item.message,
            ref && (ref.title || ref.name)
          ].join(" ").toLowerCase();
          return (
            identity.includes("business-approved") ||
            identity.includes("business-rejected") ||
            identity.includes("customer-business-approved") ||
            identity.includes("customer-business-rejected") ||
            identity.includes("business-review") ||
            identity.includes("business profile") ||
            message.includes("your business has been approved") ||
            message.includes("has been approved. welcome to emy business") ||
            message.includes("needs changes before approval") ||
            message.includes("business registration")
          );
        }

        function notificationKindLabel(item) {
          if (notificationIsBusinessReview(item)) return "Business";
          const ref = item && item.ref && typeof item.ref === "object" ? item.ref : {};
          const raw = [
            item && item.itemKind,
            item && item.kind,
            item && item.action,
            item && item.type,
            item && item.itemTitle,
            item && item.clipTitle,
            item && item.productTitle,
            item && item.postTitle,
            item && item.title,
            ref && (ref.kind || ref.type || ref.itemKind || ref.title)
          ].join(" ").toLowerCase();
          if (raw.includes("reply")) return "Reply";
          if (raw.includes("comment")) return "Comment";
          if (raw.includes("chat") || raw.includes("message")) return "Message";
          if (raw.includes("clip") || raw.includes("reel")) return "Clip";
          if (raw.includes("product")) return "Product";
          if (raw.includes("job")) return "Job";
          if (raw.includes("event")) return "Event";
          if (raw.includes("image") || raw.includes("photo")) return "Image";
          if (raw.includes("video")) return "Video";
          if (raw.includes("post") || raw.includes("feed")) return "Post";
          if (raw.includes("chat") || raw.includes("message")) return "Message";
          return "Update";
        }

        function notificationThumbFallback(item) {
          return notificationKindLabel(item);
        }

        function notificationStorePendingItemDetail(item) {
          try {
            const raw = item && typeof item === "object" ? item : {};
            const wrapped = raw.raw && typeof raw.raw === "object" ? raw.raw : {};
            const ref = raw.ref && typeof raw.ref === "object" ? raw.ref : wrapped.ref && typeof wrapped.ref === "object" ? wrapped.ref : {};
            const detail = raw.detailSnapshot && typeof raw.detailSnapshot === "object" ? raw.detailSnapshot : wrapped.detailSnapshot && typeof wrapped.detailSnapshot === "object" ? wrapped.detailSnapshot : ref.detailSnapshot && typeof ref.detailSnapshot === "object" ? ref.detailSnapshot : raw.original && typeof raw.original === "object" ? raw.original : wrapped.original && typeof wrapped.original === "object" ? wrapped.original : ref.original && typeof ref.original === "object" ? ref.original : ref;
            const clean = (value) => String(value || "").trim();
            const kind = clean(raw.itemKind || raw.kind || detail.itemKind || detail.detailKind || detail.kind || ref.type || ref.kind || notificationKindLabel(item) || "Item");
            const title = clean(raw.itemTitle || detail.itemTitle || detail.title || ref.itemTitle || ref.title || ref.productTitle || ref.name || raw.productTitle || raw.postTitle || raw.title);
            const feedId = clean(raw.feedId || raw.itemId || raw.postId || raw.productId || detail.feedId || detail.id || ref.feedId || ref.id);
            if (!title && !feedId) return;
            const avatarSrc = clean(raw.detailAvatarSrc || raw.itemAvatarSrc || detail.detailAvatarSrc || detail.itemAvatarSrc || detail.avatarSrc || detail.profilePhoto || detail.businessPhoto || raw.businessPhoto || raw.profilePhoto || ref.detailAvatarSrc || ref.itemAvatarSrc || ref.businessPhoto || ref.profilePhoto);
            const avatarRef = clean(raw.detailAvatarRef || raw.itemAvatarRef || detail.detailAvatarRef || detail.itemAvatarRef || detail.avatarRef || detail.profilePhotoRef || detail.businessPhotoRef || raw.businessPhotoRef || raw.profilePhotoRef || ref.detailAvatarRef || ref.itemAvatarRef || ref.businessPhotoRef || ref.profilePhotoRef);
            localStorage.setItem("emyPendingItemDetailOpen", JSON.stringify({
              createdAt: Date.now(),
              id: feedId,
              feedId,
              businessKey: clean(raw.businessKey || raw.key || detail.businessKey || detail.key || ref.businessKey || ref.key),
              detailKind: kind,
              kind,
              title: title || kind,
              description: clean(raw.detailDescription || detail.detailDescription || detail.description || detail.text || detail.productDescription || raw.description || ref.description || ref.productDescription || raw.body || raw.message),
              business: clean(detail.businessName || detail.business || raw.businessName || raw.business || ref.businessName || ref.business),
              price: clean(detail.price || detail.productPrice || raw.price || ref.price || ref.productPrice),
              media: clean(detail.mediaClass || detail.media || raw.mediaClass || raw.media || ref.mediaClass || kind),
              mediaSrc: clean(detail.mediaSrc || detail.detailMediaSrc || raw.mediaSrc || ref.mediaSrc),
              mediaRef: clean(detail.mediaRef || detail.detailMediaRef || raw.mediaRef || ref.mediaRef),
              mediaType: clean(detail.mediaType || detail.detailMediaType || raw.mediaType || ref.mediaType),
              posterSrc: clean(detail.posterSrc || detail.detailPosterSrc || raw.posterSrc || ref.posterSrc || raw.thumbnailSrc || ref.thumbnailSrc),
              posterRef: clean(detail.posterRef || detail.detailPosterRef || raw.posterRef || ref.posterRef || raw.thumbnailRef || ref.thumbnailRef),
              avatarSrc,
              avatarRef,
              detailAvatarSrc: avatarSrc,
              detailAvatarRef: avatarRef,
              businessPhoto: avatarSrc,
              businessPhotoRef: avatarRef,
              action: clean(raw.action || raw.type),
              ref
            }));
          } catch (error) {}
        }
        function notificationOpenItemInPlace(item) {
          try {
            if (!item || notificationIsBusinessReview(item) || typeof window.emyOpenItemDetail !== "function") return false;
            const kindLabel = notificationKindLabel(item);
            const kind = kindLabel.toLowerCase();
            const type = String(item.type || item.action || "").toLowerCase();
            if (type.includes("chat") || type.includes("message") || kind === "message") return false;
            notificationStorePendingItemDetail(item);
            const payload = JSON.parse(localStorage.getItem("emyPendingItemDetailOpen") || "null");
            if (!payload || typeof payload !== "object") return false;
            const titleText = String(payload.title || payload.detailTitle || payload.productTitle || "").trim();
            const feedId = String(payload.feedId || payload.id || payload.productId || "").trim();
            if (!titleText && !feedId) return false;
            const kindText = String(payload.detailKind || payload.kind || payload.type || kindLabel || "Post").trim();
            const kindLower = kindText.toLowerCase();
            const virtualCard = document.createElement("article");
            virtualCard.className = kindLower.includes("clip") || kindLower.includes("reel") ? "card reel-card feed-product-clip-card is-clip" : kindLower.includes("product") ? "card product-card feed-product-card is-product" : "feed-card social-feed-card is-post";
            virtualCard.setAttribute("data-card", "");
            virtualCard.setAttribute("data-open-item-detail", "");
            virtualCard.style.cssText = "position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;pointer-events:none;";
            virtualCard.setAttribute("aria-hidden", "true");
            const setData = (name, value) => {
              const clean = String(value || "").trim();
              if (clean) virtualCard.dataset[name] = clean;
            };
            setData("feedId", feedId);
            setData("businessKey", payload.businessKey || payload.key);
            setData("detailKind", kindText);
            setData("detailTitle", titleText || kindText);
            setData("detailDescription", payload.description || payload.detailDescription || payload.productDescription);
            setData("detailBusiness", payload.business || payload.detailBusiness || payload.businessName);
            setData("detailPrice", payload.price || payload.detailPrice || payload.productPrice);
            setData("detailMedia", payload.media || payload.detailMedia || payload.mediaClass || "feed");
            setData("detailMediaSrc", payload.mediaSrc || payload.detailMediaSrc);
            setData("detailMediaRef", payload.mediaRef || payload.detailMediaRef);
            setData("detailMediaType", payload.mediaType || payload.detailMediaType);
            setData("detailPosterSrc", payload.posterSrc || payload.detailPosterSrc);
            setData("detailPosterRef", payload.posterRef || payload.detailPosterRef);
            setData("detailAvatarSrc", payload.avatarSrc || payload.detailAvatarSrc || payload.businessPhoto || payload.profilePhoto);
            setData("detailAvatarRef", payload.avatarRef || payload.detailAvatarRef || payload.businessPhotoRef || payload.profilePhotoRef);
            setData("profilePhoto", payload.avatarSrc || payload.detailAvatarSrc || payload.businessPhoto || payload.profilePhoto);
            setData("profilePhotoRef", payload.avatarRef || payload.detailAvatarRef || payload.businessPhotoRef || payload.profilePhotoRef);
            setData("businessPhoto", payload.avatarSrc || payload.detailAvatarSrc || payload.businessPhoto || payload.profilePhoto);
            setData("businessPhotoRef", payload.avatarRef || payload.detailAvatarRef || payload.businessPhotoRef || payload.profilePhotoRef);
            setData("detailMeta", payload.meta || payload.detailMeta);
            try { virtualCard.dataset.detailSnapshot = JSON.stringify(payload); } catch (error) {}
            if (Array.isArray(payload.mediaItems) && payload.mediaItems.length) virtualCard.dataset.detailMediaItems = JSON.stringify(payload.mediaItems);
            document.body.appendChild(virtualCard);
            const opened = window.emyOpenItemDetail(virtualCard);
            if (!opened) return false;
            try { localStorage.removeItem("emyPendingItemDetailOpen"); } catch (error) {}
            if (typeof setNotificationsOpen === "function") setNotificationsOpen(false);
            if (typeof showToast === "function") showToast("Opened " + (kindText || "notification item") + " activity.");
            return true;
          } catch (error) {}
          return false;
        }

        function notificationTarget(item) {
          if (!item) return "emy-customer-home.html";
          const kindLabel = notificationKindLabel(item);
          const kind = kindLabel.toLowerCase();
          const action = String(item.action || item.type || "").toLowerCase();
          const ref = item && item.ref && typeof item.ref === "object" ? item.ref : {};
          if (notificationIsBusinessReview(item)) {
            const businessKey = String(item.businessKey || ref.businessKey || ref.key || ref.id || "").trim();
            if (businessKey) {
              try { localStorage.setItem("emySelectedBusinessProfileKey", businessKey); } catch (error) {}
              return "emy-business-profile.html?view=customer&business=" + encodeURIComponent(businessKey);
            }
            return "emy-business-profile.html?view=customer";
          }
          const hasItemTarget = !!(item.feedId || item.itemTitle || (item.ref && Object.keys(item.ref).length));
          const query = "?notificationAction=" + encodeURIComponent(action || kind) +
            (item.feedId ? "&feedId=" + encodeURIComponent(item.feedId) : "") +
            (item.itemTitle ? "&item=" + encodeURIComponent(item.itemTitle) : "") +
            (kindLabel ? "&kind=" + encodeURIComponent(kindLabel) : "");
          if (action.includes("chat") || action.includes("message") || kind === "message") {
            return "emy-customer-chat.html" + (item.businessKey ? "?business=" + encodeURIComponent(item.businessKey) : "");
          }
          if (hasItemTarget) {
            notificationStorePendingItemDetail(item);
            if (kind === "product") return "emy-customer-search.html" + query + "#products";
            if (kind === "clip") return "emy-customer-home.html" + query + "#reels";
            return "emy-customer-home.html" + query + "#feeds";
          }
          if (item.href && !/emy-(?:business|customer)-profile\.html/i.test(item.href)) return item.href;
          if (item.businessKey && (kind === "product")) return "emy-customer-search.html#products";
          return "emy-customer-home.html#feeds";
        }

        function openNotification(item) {
          if (!item) return;
          mutateStoredNotification(item.id, (stored) => ({ ...stored, read: true, unread: false }));
          if (item.businessKey) {
            try { localStorage.setItem("emySelectedBusinessProfileKey", item.businessKey); } catch (error) {}
          }
          if (notificationOpenItemInPlace(item)) return;
          window.location.href = notificationTarget(item);
        }

        function dismissNotification(id, message) {`
    );
  }
  next = next.replace(
    /        function notificationImage\(src, className, alt, fallback\) \{[\s\S]*?\n        function renderNotificationGroup\(title, items\) \{/,
    String.raw`        function notificationImage(src, className, alt, fallback) {
          let media = String(src || "").trim();
          let ref = "";
          let refType = "";
          if (media.indexOf("emy-video-ref:") === 0) {
            ref = media.slice("emy-video-ref:".length);
            refType = "video";
            media = "";
          } else if (media.indexOf("emy-ref:") === 0) {
            ref = media.slice("emy-ref:".length);
            media = "";
          }
          const isThumb = className.indexOf("thumb") >= 0;
          const label = fallback || (isThumb ? "Update" : "");
          if (!(media || ref)) {
            if (isThumb) {
              const kind = String(label || "Update").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "update";
              return '<span class="' + className + ' is-fallback is-' + escapeHtml(kind) + '"><b>' + escapeHtml(label || "Update") + '</b><small>Open</small></span>';
            }
            return '<span class="' + className + ' is-fallback">' + escapeHtml(label) + '</span>';
          }
          const refAttr = ref ? ' data-emy-media-ref="' + escapeHtml(ref) + '"' : "";
          const fallbackAttr = label ? ' data-notification-fallback="' + escapeHtml(label) + '"' : "";
          const isVideo = refType === "video" || /^(data:video|blob:)|\.(mp4|webm|mov)(\?|#|$)/i.test(media);
          return '<span class="' + className + '"' + fallbackAttr + '>' + (isVideo ? '<video' + (media ? ' src="' + escapeHtml(media) + '"' : '') + refAttr + ' muted playsinline preload="metadata" aria-hidden="true"></video>' : '<img' + (media ? ' src="' + escapeHtml(media) + '"' : '') + refAttr + fallbackAttr + ' alt="' + escapeHtml(alt || "") + '" />') + '</span>';
        }

        function restoreNotificationImageFallback(node) {
          const wrapper = node && node.closest ? node.closest(".notification-avatar, .notification-thumb") : null;
          if (!wrapper) return;
          const label = node.getAttribute("data-notification-fallback") || wrapper.getAttribute("data-notification-fallback") || "";
          const isThumb = wrapper.classList.contains("notification-thumb");
          wrapper.classList.add("is-fallback");
          wrapper.removeAttribute("data-emy-media-ref");
          while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
          if (isThumb) {
            const title = document.createElement("b");
            const sub = document.createElement("small");
            title.textContent = label || "Update";
            sub.textContent = "Open";
            wrapper.appendChild(title);
            wrapper.appendChild(sub);
          } else {
            wrapper.textContent = label || "?";
          }
        }

        function hydrateNotificationImageFallbacks(root) {
          const scope = root && root.querySelectorAll ? root : document;
          scope.querySelectorAll(".notification-avatar img, .notification-thumb img").forEach((node) => {
            if (node.dataset.notificationFallbackReady === "true") return;
            node.dataset.notificationFallbackReady = "true";
            node.addEventListener("error", () => restoreNotificationImageFallback(node), { once: true });
            if (node.complete && !node.naturalWidth) restoreNotificationImageFallback(node);
          });
        }

        function notificationFallback(item) {
          let source = String(item && (item.actorName || item.customerName || item.viewerName || item.author || item.name || item.initials || item.title) || "").trim();
          const requestName = source.match(/^["'\u201c\u201d]*([^"'\u201c\u201d]+?)["'\u201c\u201d]*\s+requested\b/i);
          source = (requestName ? requestName[1] : source).replace(/["'\u201c\u201d]+/g, " ").replace(/\s+/g, " ").trim();
          const parts = source.split(/\s+/).filter(Boolean);
          return parts.slice(0, 2).map((word) => word.charAt(0)).join("").toUpperCase() || source.slice(0, 2).toUpperCase() || "?";
        }

        function renderNotificationGroup(title, items) {`
  );
  next = next.replace(
    /notificationImage\(item\.thumb, "notification-thumb", "", ""\) \+/g,
    'notificationImage(item.thumb, "notification-thumb", "", notificationThumbFallback(item)) +'
  );
  next = next.replace(
    /if \(window\.emyHydrateFeedMedia\) window\.emyHydrateFeedMedia\(notificationList\);\n(?!\s*hydrateNotificationImageFallbacks\(notificationList\);)/g,
    'if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(notificationList);\n          hydrateNotificationImageFallbacks(notificationList);\n'
  );
  return next;
}
function patchNotificationThumbBoxes(html) {
  let next = String(html || '');
  next = next.replace(/\n?\s*<style data-emy-notification-thumb-box-removal>[\s\S]*?<\/style>/g, '');
  next = next.replace(
    /grid-template-columns:\s*42px\s+minmax\(0,\s*1fr\)\s+72px\s+28px/g,
    'grid-template-columns: 42px minmax(0, 1fr) 28px'
  );
  next = next.replace(
    /grid-template-columns:\s*42px\s+minmax\(0,\s*1fr\)\s+92px\s+28px/g,
    'grid-template-columns: 42px minmax(0, 1fr) 28px'
  );
  next = next.replace(
    /grid-template-columns:\s*54px\s+minmax\(0,\s*1fr\)\s+92px\s+28px/g,
    'grid-template-columns: 54px minmax(0, 1fr) 28px'
  );
  next = next.replace(
    /\n\s*(?:notificationImage|chatNotificationImage|businessNotificationImage)\(item\.thumb,\s*"(?:business-)?notification-thumb"(?:,\s*"")?,\s*(?:notificationThumbFallback|chatNotificationThumbFallback|businessNotificationThumbFallback)\(item\)\)\s*\+/g,
    ''
  );
  if ((next.includes('notification-row') || next.includes('business-notification-row')) && next.includes('</head>')) {
    const style = String.raw`  <style data-emy-notification-thumb-box-removal>
    .notification-row { grid-template-columns: 42px minmax(0, 1fr) 28px !important; }
    .business-notification-row { grid-template-columns: 54px minmax(0, 1fr) 28px !important; }
    .notification-thumb,
    .business-notification-thumb { display: none !important; }
  </style>`;
    next = next.replace('</head>', () => style + '\n  </head>');
  }
  return next;
}

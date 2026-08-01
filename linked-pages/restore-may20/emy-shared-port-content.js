(function setupEmySharedPortContent() {
  if (window.__emySharedPortContentInstalled) return;
  window.__emySharedPortContentInstalled = true;

  const localHost = /^(127\.0\.0\.1|localhost)$/i.test(window.location.hostname || "");
  window.__emySharedPortContentInitialSyncDone = !localHost;
  window.__emySharedPortContentReady = !localHost;
  if (!localHost) return;

  const endpoint = "/api/emy-shared-content";
  const baseKeys = [
    "emyBusinessProfiles", "emyBusinessDirectory", "emyNearbyBusinesses", "emyLocalBusinesses", "emyBusinesses",
    "emyBusinessProfileDraft", "emyBusinessMediaLibrary", "emyBusinessHeroCoverMedia", "emyBusinessCoverMedia",
    "emyBusinessProfilePhoto", "emyBusinessProfilePhotoSrc", "emyBusinessProfilePhotoRef",
    "emyBusinessProfileImage", "emyBusinessProfileImageSrc", "emyBusinessProfileImageRef",
    "emyBusinessPhoto", "emyBusinessPhotoSrc", "emyBusinessPhotoRef",
    "emyBusinessAvatar", "emyBusinessAvatarSrc", "emyBusinessAvatarRef",
    "emyBusinessLogo", "emyBusinessLogoSrc", "emyBusinessLogoRef",
    "emyBusinessDisplayName", "emyBusinessName", "emyBusinessKey", "emyBusinessAskLocation",
    "emyBusinessWorkingDays", "emyBusinessWorkingDaysSchedule", "emyBusinessUploads",
    "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts",
    "emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClipsByBusiness", "emyUploadedClips",
    "emyBusinessPosts", "emyBusinessFeedPosts",
    "emyBusinessArticles", "emyBusinessArticlePosts",
    "emyBusinessEvents", "emyBusinessEventPosts",
    "emyBusinessJobs", "emyBusinessJobPosts",
    "emyFeedCommentThreads", "emySavedFeedItems", "emyCustomerSavedFeedItems",
    "emyFeedCreatedPosts", "emyFeedCreatedProducts", "emyFeedCreatedClips", "emyFeedCreatedEvents", "emyFeedCreatedJobs", "emyFeedCreatedArticles", "emyFeedReposts",
    "emyFeedDeletedIds", "emyBusinessDeletedProductIds", "emyFeedActionState", "emyClipViewStats", "emyProductViewStats", "emyPostViewStats",
    "emyBusinessProfileViewStats", "emyBusinessDirectionStats",
    "emyCustomerProductVisits", "emyProductVisitHistory",
    "emyBusinessLikeState", "emyBusinessLikePairs", "emyProductMascotLikeState", "emyClipMascotLikeState",
    "emyCustomerProfiles", "emyCustomerProfileDraft",
    "emyCustomerProfilePhoto", "emyCustomerProfilePhotoSrc", "emyCustomerProfilePhotoRef",
    "emyCustomerProfileImage", "emyCustomerProfileImageSrc", "emyCustomerProfileImageRef",
    "emyCustomerPhoto", "emyCustomerPhotoSrc", "emyCustomerPhotoRef",
    "emyCustomerAvatar", "emyCustomerAvatarSrc", "emyCustomerAvatarRef",
    "emyCustomerBusinesses", "emyCustomerRelationshipRequests", "emyCustomerUploads", "emyCustomerEvents"
  ];
  const customerHomeInitialKeys = [
    "emyCustomerProfilePhoto", "emyCustomerProfilePhotoSrc", "emyCustomerProfilePhotoRef",
    "emyCustomerProfileImage", "emyCustomerProfileImageSrc", "emyCustomerProfileImageRef",
    "emyCustomerAvatar", "emyCustomerAvatarSrc", "emyCustomerAvatarRef",
    "emyCustomerPhoto", "emyCustomerPhotoSrc", "emyCustomerPhotoRef",
    "emyFeedCreatedPosts", "emyFeedCreatedProducts", "emyFeedCreatedClips", "emyFeedCreatedEvents", "emyFeedCreatedJobs", "emyFeedCreatedArticles", "emyFeedReposts",
    "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts",
    "emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClipsByBusiness", "emyUploadedClips",
    "emyBusinessPosts", "emyBusinessFeedPosts", "emyBusinessArticles", "emyBusinessArticlePosts", "emyBusinessEvents", "emyBusinessEventPosts", "emyBusinessJobs", "emyBusinessJobPosts",
    "emyCustomerProductVisits", "emyProductVisitHistory",
    "emyCustomerBusinesses", "emyCustomerRelationshipRequests", "emyBusinessDirectory", "emyNearbyBusinesses", "emyLocalBusinesses", "emyBusinesses"
  ];
  const keySet = new Set(baseKeys);
  const fingerprintKey = "emySharedPortContentFingerprint";
  const fingerprintMapKey = "emySharedPortContentFingerprintsV2";
  const fingerprintCleanupKey = "emySharedPortContentFingerprintCleanupV3";
  const maxValueBytes = 12 * 1024 * 1024;
  const maxSnapshotValueBytes = 2 * 1024 * 1024;
  const bootSyncDelayMs = 2200;
  const resumeSyncDelayMs = 1500;
  let busy = false;
  let pending = false;
  let timer = 0;
  let firstRemotePullDone = false;
  let initialSyncReadyDispatched = false;
  let deferredInitialChangedKeys = [];

  try {
    if (localStorage.getItem(fingerprintCleanupKey) !== "1") {
      localStorage.removeItem(fingerprintKey);
      localStorage.removeItem(fingerprintMapKey);
      localStorage.setItem(fingerprintCleanupKey, "1");
    }
  } catch (error) {}

  function clean(value) {
    return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
  }

  function readValue(key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null || raw === "") return null;
      if (raw.length > maxSnapshotValueBytes) return null;
      if (/^data:(?:image|video|application)\//i.test(raw) && /(?:src|photo|image|avatar|logo|cover|media|upload)/i.test(String(key || ""))) return null;
      return JSON.parse(raw);
    } catch (error) {
      try { return localStorage.getItem(key); } catch (innerError) { return null; }
    }
  }

  function hasValue(value) {
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === "object") return Object.keys(value).length > 0;
    return clean(value) !== "";
  }

  function isSharedContentKey(key) {
    const text = clean(key);
    if (!/^emy/i.test(text)) return false;
    if (text === fingerprintKey || text === fingerprintMapKey) return false;
    if (/Runtime|Ready|Bound|Timer|Debug|Replay|Pending|Interaction|Carousel|Viewport|Scroll|Cache|MigrationStatus/i.test(text)) return false;
    if (/Auth|Firebase|Password|Token|Secret|ApiKey|OpenRouter|DeepSeek|ConfirmationCode|VerificationCode|Session/i.test(text)) return false;
    if (/^emyCustomerBusiness:/i.test(text)) return false;
    if (/^(emyAskSavedChats|emyAskSearchHistory|emyAskSidebar|emyAskMiniChatId|emyComingSoon|emyDatePicker|emyDeleteConfirm|emyAvatarBroken|emyClipViewer|emyClipState:)/i.test(text)) return false;
    return keySet.has(text);
  }

  function discoverKeys() {
    const discovered = new Set(baseKeys);
    return Array.from(discovered).filter(isSharedContentKey);
  }

  function stableStringify(value) {
    try {
      if (!value || typeof value !== "object") return JSON.stringify(value);
      if (Array.isArray(value)) return JSON.stringify(value);
      const output = {};
      Object.keys(value).sort().forEach(function assign(key) { output[key] = value[key]; });
      return JSON.stringify(output);
    } catch (error) {
      return "";
    }
  }

  function readFingerprintMap() {
    try {
      const parsed = JSON.parse(localStorage.getItem(fingerprintMapKey) || "{}");
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function writeFingerprintMap(map) {
    try { localStorage.setItem(fingerprintMapKey, JSON.stringify(map || {})); } catch (error) {}
  }

  function rowFreshness(row) {
    if (!row || typeof row !== "object") return 0;
    const stamps = [row.updatedAt, row.savedAt, row.createdAt, row.postedAt, row.publishedAt, row.at, row.timestamp, row.liveAt, row.created];
    let max = 0;
    stamps.forEach(function each(stamp) {
      const text = clean(stamp);
      if (!text) return;
      const parsed = Date.parse(text);
      if (!isNaN(parsed)) max = Math.max(max, parsed);
    });
    return max;
  }

  function collectionFreshness(value) {
    if (Array.isArray(value)) {
      return value.reduce(function maxRow(max, row) {
        return Math.max(max, rowFreshness(row));
      }, 0);
    }
    if (value && typeof value === "object") {
      return Object.keys(value).reduce(function maxProp(max, prop) {
        return Math.max(max, rowFreshness(value[prop]));
      }, rowFreshness(value));
    }
    return 0;
  }

  function readDeletedIdMap() {
    try {
      const parsed = JSON.parse(localStorage.getItem("emyFeedDeletedIds") || "{}");
      if (Array.isArray(parsed)) {
        return parsed.reduce(function mapDeleted(map, id) {
          if (id) map[String(id)] = true;
          return map;
        }, {});
      }
      if (parsed && typeof parsed === "object") {
        return Object.keys(parsed).reduce(function mapDeleted(map, id) {
          if (id) map[String(id)] = true;
          return map;
        }, {});
      }
    } catch (error) {}
    return {};
  }

  function feedItemAliases(row) {
    if (!row || typeof row !== "object") return [];
    return [
      row.id, row.postId, row.feedId, row.jobId, row.eventId, row.clipId, row.reelId,
      row.productId, row.articleId, row.storageId, row.sourceId
    ].map(clean).filter(Boolean);
  }

  function feedTombstonesApplyToKey(key) {
    return !/^(emybusinessclips|emybusinessreels|emybusinessproductreels)$/i.test(clean(key));
  }

  function feedItemTombstoned(row, tombstones, key) {
    if (!row) return true;
    if (row.deleted === true || row.removed === true || row.hidden === true || row.deletedAt) return true;
    if (!feedTombstonesApplyToKey(key)) return false;
    if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(row)) return true;
    if (!tombstones || !Object.keys(tombstones).length) return false;
    return feedItemAliases(row).some(function hasAlias(id) { return !!tombstones[id]; });
  }

  function rowMediaIsStable(row) {
    if (!row || typeof row !== "object") return false;
    const values = [
      row.mediaSrc, row.video, row.videoSrc, row.videoUrl, row.clipVideoSrc, row.reelSrc,
      row.image, row.imageSrc, row.photo, row.photoSrc, row.posterSrc, row.thumbnailSrc
    ].map(clean).filter(Boolean);
    const refs = [
      row.mediaRef, row.videoRef, row.imageRef, row.photoRef, row.posterRef, row.thumbnailRef,
      row.cloudinaryPublicId, row.cloudinaryPosterPublicId
    ].map(clean).filter(Boolean);
    const itemHasStableMedia = Array.isArray(row.mediaItems) && row.mediaItems.some(function each(item) {
      if (!item || typeof item !== "object") return false;
      const ref = clean(item.ref || item.mediaRef || item.publicId || item.cloudinaryPublicId);
      const src = clean(item.src || item.url || item.mediaSrc);
      return !!ref || (!!src && !/^blob:/i.test(src));
    });
    return refs.length > 0 || itemHasStableMedia || values.some(function stable(src) { return !/^blob:/i.test(src); });
  }

  function isBrokenLocalTestClip(row) {
    if (!row || typeof row !== "object") return false;
    const id = clean(row.id || row.feedId || row.clipId || row.reelId || row.sourceId).toLowerCase();
    const title = clean(row.title || row.clipTitle || row.detailTitle || row.name).toLowerCase();
    if (id === "small-box-smoke-clip" || /^browser-blob-clip-/i.test(id)) return true;
    if (title === "small box smoke clip" || title === "blob test clip") return true;
    const typeText = clean([
      row.kind, row.type, row.contentType, row.uploadType, row.mediaKind, row.postMode,
      row.clipKind, row.reelKind, row.clipType, row.reelType, row.tag
    ].join(" ")).toLowerCase();
    if (!/(clip|reel)/.test(typeText)) return false;
    return !rowMediaIsStable(row);
  }

  function stripTombstonedFeedRows(value, tombstones, key) {
    if (!Array.isArray(value)) return value;
    const appliesTombstones = feedTombstonesApplyToKey(key);
    const hasTombstones = !!(tombstones && Object.keys(tombstones).length);
    return value.filter(function keepRow(row) {
      if (isBrokenLocalTestClip(row)) return false;
      if (appliesTombstones && hasTombstones && feedItemTombstoned(row, tombstones, key)) return false;
      return true;
    });
  }

  function mergeDeletedIdMaps(existing, incoming) {
    const output = existing && typeof existing === "object" && !Array.isArray(existing) ? Object.assign({}, existing) : {};
    if (Array.isArray(incoming)) {
      incoming.forEach(function stamp(id) {
        if (id) output[String(id)] = Math.max(Number(output[String(id)] || 0), Date.now());
      });
      return output;
    }
    if (!incoming || typeof incoming !== "object") return output;
    Object.keys(incoming).forEach(function assign(id) {
      if (!id) return;
      output[id] = Math.max(Number(output[id] || 0), Number(incoming[id] || 0) || Date.now());
    });
    return output;
  }

  function contentId(value, key, index) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const direct = [
        value.id, value.productId, value.clipId, value.reelId, value.postId, value.feedId,
        value.eventId, value.jobId, value.articleId, value.businessKey, value.key, value.slug,
        value.storageId, value.sourceId
      ].map(clean).find(Boolean);
      if (direct) return key + ":id:" + direct.toLowerCase();
      const title = clean(value.title || value.name || value.productName || value.businessName || value.text || value.description);
      const time = clean(value.createdAt || value.updatedAt || value.savedAt || value.at || value.timestamp);
      const business = clean(value.businessKey || value.businessName || value.business || value.ownerName);
      if (title || time || business) return key + ":fallback:" + business.toLowerCase() + "|" + title.toLowerCase() + "|" + time.toLowerCase();
    }
    try {
      return key + ":json:" + JSON.stringify(value).slice(0, 600);
    } catch (error) {
      return key + ":index:" + index;
    }
  }

  function mergeValue(existing, incoming, key) {
    if (incoming === undefined || incoming === null) return existing;
    if (key === "emyFeedDeletedIds") return mergeDeletedIdMaps(existing, incoming);
    const tombstones = readDeletedIdMap();
    if (Array.isArray(existing) || Array.isArray(incoming)) {
      const rows = [];
      if (Array.isArray(existing)) rows.push.apply(rows, existing);
      if (Array.isArray(incoming)) rows.push.apply(rows, incoming);
      if (!rows.length) return Array.isArray(existing) ? existing : [];
      const map = new Map();
      rows.forEach(function each(row, index) {
        if (row === undefined || row === null) return;
        if (feedItemTombstoned(row, tombstones, key)) return;
        const id = contentId(row, key, index);
        if (map.has(id)) {
          const prev = map.get(id);
          const prevFresh = rowFreshness(prev);
          const rowFresh = rowFreshness(row);
          const primary = prevFresh >= rowFresh ? prev : row;
          const secondary = primary === prev ? row : prev;
          map.set(id, mergeValue(primary, secondary, key));
        } else {
          map.set(id, row);
        }
      });
      return stripTombstonedFeedRows(Array.from(map.values()).slice(-500), tombstones, key);
    }
    const existingObject = existing && typeof existing === "object";
    const incomingObject = incoming && typeof incoming === "object";
    if (existingObject || incomingObject) {
      const output = existingObject ? Object.assign({}, existing) : {};
      if (!incomingObject) return output;
      Object.keys(incoming).forEach(function assign(prop) {
        const value = incoming[prop];
        if (value === undefined || value === null) return;
        if (output[prop] !== undefined && (Array.isArray(value) || (value && typeof value === "object"))) {
          output[prop] = mergeValue(output[prop], value, key + "." + prop);
        } else if (output[prop] === undefined) {
          output[prop] = value;
        } else {
          const prevFresh = rowFreshness(output);
          const nextFresh = rowFreshness(value);
          if (nextFresh > prevFresh) output[prop] = value;
        }
      });
      return output;
    }
    return existing !== undefined && existing !== null ? existing : incoming;
  }

  function snapshot() {
    const data = {};
    discoverKeys().forEach(function collect(key) {
      const value = readValue(key);
      if (hasValue(value)) data[key] = value;
    });
    return data;
  }

  function sharedContentPullUrl() {
    const path = String(window.location && window.location.pathname || "").toLowerCase();
    if (path.indexOf("emy-customer-home.html") !== -1) {
      return endpoint + "?keys=" + customerHomeInitialKeys.map(encodeURIComponent).join(",");
    }
    return endpoint + "?keys=" + baseKeys.map(encodeURIComponent).join(",");
  }

  function writeValue(key, value) {
    try {
      if (!isSharedContentKey(key) || !hasValue(value)) return false;
      keySet.add(key);
      const tombstones = readDeletedIdMap();
      const cleaned = key === "emyFeedDeletedIds"
        ? value
        : (Array.isArray(value) ? stripTombstonedFeedRows(value, tombstones, key) : value);
      if (!hasValue(cleaned)) return false;
      const next = typeof cleaned === "string" ? cleaned : JSON.stringify(cleaned);
      if (localStorage.getItem(key) === next) return false;
      localStorage.setItem(key, next);
      return true;
    } catch (error) {
      return false;
    }
  }

  function dispatchStorageKey(key) {
    try {
      window.dispatchEvent(new StorageEvent("storage", { key: key, newValue: localStorage.getItem(key), storageArea: localStorage }));
    } catch (error) {
      const event = new CustomEvent("storage", { detail: { key: key } });
      event.key = key;
      window.dispatchEvent(event);
    }
  }

  function requestSurfaceRefresh(changedKeys) {
    const keysChanged = Array.isArray(changedKeys) ? changedKeys.slice() : [];
    window.setTimeout(function refreshSoon() {
      try {
        if (window.emyContentSync && typeof window.emyContentSync.notify === "function") {
          window.emyContentSync.notify({ source: "shared-port-content", keys: keysChanged });
          return;
        }
      } catch (error) {}
      try { if (typeof window.emyRefreshRealHomeSurfaces === "function") window.emyRefreshRealHomeSurfaces("shared-port-content"); } catch (error) {}
      try { if (typeof window.emyRenderAnnexedFeeds === "function") window.emyRenderAnnexedFeeds(); } catch (error) {}
      try {
        const feedList = document.querySelector("[data-annexed-feed-list]");
        const activeTab = document.querySelector("[data-annexed-feed-filter].is-active");
        const filter = activeTab && activeTab.dataset ? activeTab.dataset.annexedFeedFilter : "all";
        if (feedList && !feedList.querySelector("[data-feed-id]") && typeof window.emyFillRealFeedListFallback === "function") {
          window.emyFillRealFeedListFallback(feedList, filter || "all");
        }
      } catch (error) {}
    }, 60);
  }

  function markInitialSharedSyncReady(reason) {
    if (initialSyncReadyDispatched) return;
    initialSyncReadyDispatched = true;
    window.__emySharedPortContentInitialSyncDone = true;
    window.__emySharedPortContentReady = true;
    try {
      window.dispatchEvent(new CustomEvent("emy:shared-port-content-ready", {
        detail: {
          source: "shared-port-content",
          reason: reason || "initial-sync"
        }
      }));
    } catch (error) {}
  }

  function deferInitialRefresh(changedKeys) {
    if (!Array.isArray(changedKeys) || !changedKeys.length) return;
    const seen = new Set(deferredInitialChangedKeys);
    changedKeys.forEach(function each(key) {
      if (!seen.has(key)) {
        seen.add(key);
        deferredInitialChangedKeys.push(key);
      }
    });
  }

  function dispatchRefresh(changedKeys) {
    const eventNames = new Set(["emy:business-content-changed", "emy:media-stored"]);
    changedKeys.forEach(function addEvents(key) {
      dispatchStorageKey(key);
      if (/BusinessProfiles|BusinessDirectory|NearbyBusinesses|LocalBusinesses|Businesses$/.test(key)) eventNames.add("emy:real-business-profiles-synced");
      if (/^emyCustomer(?:ProfilePhoto|ProfileImage|Avatar|Photo)/.test(key)) eventNames.add("emy:customer-profile-photo-changed");
      if (/Product/.test(key)) eventNames.add("emy:business-products-changed");
      if (/Clip|Reel/.test(key)) eventNames.add("emy:business-clips-changed");
      if (/FeedCreatedPosts|FeedCreatedArticles|BusinessPosts|BusinessFeedPosts|BusinessArticles|BusinessArticlePosts|FeedReposts/.test(key)) eventNames.add("emy:created-posts-changed");
      if (/FeedCreatedEvents|BusinessEvents|BusinessEventPosts/.test(key)) eventNames.add("emy:created-events-changed");
      if (/FeedCreatedJobs|BusinessJobs|BusinessJobPosts/.test(key)) eventNames.add("emy:created-jobs-changed");
      if (key === "emyFeedActionState" || key === "emyFeedDeletedIds") eventNames.add("emy:feed-action-state-changed");
      if (key === "emyClipViewStats") eventNames.add("emy:clip-view-stats-changed");
      if (key === "emyBusinessLikeState") eventNames.add("emy:business-likes-changed");
      if (key === "emyCustomerBusinesses" || key === "emyCustomerRelationshipRequests" || /^emyCustomerBusiness:/i.test(key)) eventNames.add("emy:customer-business-changed");
    });
    eventNames.forEach(function dispatch(name) {
      try { window.dispatchEvent(new CustomEvent(name, { detail: { keys: changedKeys.slice() } })); } catch (error) {}
    });
    try { if (typeof window.emySyncBusinessLikeButtons === "function") window.emySyncBusinessLikeButtons(document); } catch (error) {}
    try { if (typeof window.emySyncProductMascotLikeButtons === "function") window.emySyncProductMascotLikeButtons(document); } catch (error) {}
    requestSurfaceRefresh(changedKeys);
  }

  async function pullSharedContent(options) {
    const opts = options || {};
    const response = await fetch(sharedContentPullUrl());
    if (!response.ok) return false;
    const payload = await response.json();
    const shared = payload && payload.data && typeof payload.data === "object" ? payload.data : {};
    const changed = [];
    Object.keys(shared).filter(isSharedContentKey).forEach(function mergeKey(key) {
      if (!Object.prototype.hasOwnProperty.call(shared, key) || !hasValue(shared[key])) return;
      const local = readValue(key);
      const merged = mergeValue(local, shared[key], key);
      if (writeValue(key, merged)) changed.push(key);
    });
    if (changed.length) {
      localStorage.removeItem(fingerprintKey);
      if (opts.deferRefresh) deferInitialRefresh(changed);
      else dispatchRefresh(changed);
    }
    return true;
  }

  async function pushSharedContent(reason) {
    const localData = snapshot();
    const localKeys = Object.keys(localData).filter(isSharedContentKey);
    if (!localKeys.length) return false;
    const fingerprints = readFingerprintMap();
    let pushed = false;
    for (let index = 0; index < localKeys.length; index += 1) {
      const key = localKeys[index];
      const value = localData[key];
      const encoded = stableStringify(value);
      if (!encoded || encoded.length > maxValueBytes) continue;
      if (fingerprints[key] === encoded) continue;
      const postBody = { reason: reason || "sync", data: {} };
      postBody.data[key] = value;
      const postResponse = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postBody)
      });
      if (postResponse.ok) {
        fingerprints[key] = encoded;
        pushed = true;
      }
    }
    if (pushed) {
      writeFingerprintMap(fingerprints);
      try { localStorage.removeItem(fingerprintKey); } catch (error) {}
    }
    return pushed;
  }

  async function syncNow(reason) {
    if (window.__emySharedPortContentResetting) return;
    if (busy) {
      pending = true;
      return;
    }
    busy = true;
    pending = false;
    try {
      if (!firstRemotePullDone) {
        firstRemotePullDone = true;
        await pullSharedContent({ deferRefresh: true });
      }
      await pushSharedContent(reason);
      await pullSharedContent({ deferRefresh: !initialSyncReadyDispatched });
    } catch (error) {
      try { console.warn("EMY shared content bridge skipped:", error && error.message ? error.message : error); } catch (ignored) {}
    } finally {
      markInitialSharedSyncReady(reason);
      if (deferredInitialChangedKeys.length) {
        const changedKeys = deferredInitialChangedKeys.slice();
        deferredInitialChangedKeys = [];
        dispatchRefresh(changedKeys);
      }
      busy = false;
      if (pending) scheduleSync("pending");
    }
  }

  function scheduleSync(reason, delay) {
    if (window.__emySharedPortContentResetting) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(function runSync() { syncNow(reason); }, typeof delay === "number" ? delay : 250);
  }

  window.emyPauseSharedPortContentForReset = function pauseSharedPortContentForReset() {
    window.__emySharedPortContentResetting = true;
    window.clearTimeout(timer);
    pending = false;
  };

  window.emyFlushSharedPortContentKeys = function flushSharedPortContentKeys(keys, reason) {
    const storageKeys = Array.isArray(keys) ? keys.filter(isSharedContentKey) : [];
    if (!storageKeys.length) return Promise.resolve(false);
    const localHost = /^(127\.0\.0\.1|localhost)$/i.test(String(window.location.hostname || ""));
    if (!localHost) return Promise.resolve(false);
    const data = {};
    storageKeys.forEach(function collect(key) {
      try {
        const raw = localStorage.getItem(key);
        data[key] = raw ? JSON.parse(raw) : [];
      } catch (error) {
        data[key] = [];
      }
    });
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason: reason || "replace-flush", replaceKeys: storageKeys, data: data })
    }).then(function onFlush(response) {
      if (response && response.ok) {
        try { localStorage.removeItem(fingerprintKey); } catch (error) {}
        try {
          const fingerprints = readFingerprintMap();
          storageKeys.forEach(function clear(key) { delete fingerprints[key]; });
          writeFingerprintMap(fingerprints);
        } catch (error) {}
        return true;
      }
      return false;
    }).catch(function onFlushError() { return false; });
  };

  window.emySyncSharedPortContentNow = function syncSharedPortContentNow(reason) {
    scheduleSync(reason || "manual-sync", 0);
    return true;
  };

  window.emyResetSharedPortContentStore = function resetSharedPortContentStore() {
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reset", reset: true, reason: "manual-reset" })
    }).then(function onReset(response) {
      if (response && response.ok) {
        try { localStorage.removeItem(fingerprintKey); } catch (error) {}
      }
      return !!(response && response.ok);
    }).catch(function onResetError() { return false; });
  };

  try {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function patchedSetItem(key, value) {
      const result = originalSetItem.apply(this, arguments);
      if (this === localStorage && isSharedContentKey(String(key))) {
        keySet.add(String(key));
        scheduleSync("local-write", 700);
      }
      return result;
    };
  } catch (error) {}

  [
    "emy:business-profile-changed", "emy:real-business-profiles-synced",
    "emy:business-products-changed", "emy:business-clips-changed", "emy:business-content-changed",
    "emy:feed-source-edited", "emy:created-posts-changed", "emy:created-jobs-changed",
    "emy:created-events-changed", "emy:feed-reposts-changed", "emy:feed-action-state-changed",
    "emy:clip-view-stats-changed", "emy:business-likes-changed", "emy:customer-business-changed", "emy:media-stored"
  ].forEach(function bind(name) {
    window.addEventListener(name, function onContentEvent() { scheduleSync(name, 500); });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function onReady() { scheduleSync("dom-ready", bootSyncDelayMs); }, { once: true });
    scheduleSync("boot-early", bootSyncDelayMs);
  } else {
    scheduleSync("boot", bootSyncDelayMs);
  }
  window.addEventListener("pageshow", function onPageShow() { scheduleSync("pageshow", resumeSyncDelayMs); });
  window.addEventListener("focus", function onWindowFocus() { scheduleSync("window-focus", resumeSyncDelayMs); });
  document.addEventListener("visibilitychange", function onVisibilityChange() {
    if (!document.hidden) scheduleSync("visible", resumeSyncDelayMs);
  });
  [3500, 7000, 12000].forEach(function delayed(delay) { window.setTimeout(function later() { scheduleSync("delayed", resumeSyncDelayMs); }, delay); });
})();

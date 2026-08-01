(function setupEmyCentralStorage() {
  if (window.__emyCentralStorageInstalled) return;
  window.__emyCentralStorageInstalled = true;

  const endpoint = "/api/emy-shared-content";
  const localSharedHost = /^(127\.0\.0\.1|localhost)$/i.test(String(window.location && window.location.hostname || ""));
  const maxLocalValueBytes = 2 * 1024 * 1024;
  const bootSyncDelayMs = 2400;
  const resumeSyncDelayMs = 1600;
  const defaultKeys = [
    "emyBusinessProfiles",
    "emyBusinessDirectory",
    "emyNearbyBusinesses",
    "emyLocalBusinesses",
    "emyBusinesses",
    "emyBusinessProfileDraft",
    "emyBusinessUploads",
    "emyBusinessProducts",
    "emyBusinessProductList",
    "emyBusinessProductPosts",
    "emyBusinessClips",
    "emyBusinessReels",
    "emyBusinessProductReels",
    "emyBusinessPosts",
    "emyBusinessFeedPosts",
    "emyBusinessArticles",
    "emyBusinessArticlePosts",
    "emyBusinessEvents",
    "emyBusinessEventPosts",
    "emyBusinessJobs",
    "emyBusinessJobPosts",
    "emyFeedCreatedPosts",
    "emyFeedCreatedProducts",
    "emyFeedCreatedClips",
    "emyFeedCreatedEvents",
    "emyFeedCreatedJobs",
    "emyFeedCreatedArticles",
    "emyFeedReposts",
    "emyFeedDeletedIds",
    "emyBusinessDeletedProductIds",
    "emyFeedActionState",
    "emyClipViewStats",
    "emyProductViewStats",
    "emyPostViewStats",
    "emyBusinessProfileViewStats",
    "emyBusinessDirectionStats",
    "emyBusinessLikeState",
    "emyBusinessLikePairs",
    "emyProductMascotLikeState",
    "emyClipMascotLikeState",
    "emyCustomerProfiles",
    "emyCustomerProfileDraft",
    "emyCustomerBusinesses",
    "emyCustomerRelationshipRequests"
  ];
  const state = {
    busy: false,
    pending: false,
    lastError: "",
    lastProvider: localSharedHost ? "local-shared" : "browser-local",
    lastSyncAt: "",
    lastPulledChangedKeys: [],
    lastSyncStartedAt: 0,
    lastPassiveScheduleAt: 0,
    scheduleTimer: 0
  };

  function clean(value) {
    return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
  }

  function isSharedKey(key) {
    const text = clean(key);
    if (!/^emy/i.test(text)) return false;
    return !/(Password|Token|Secret|ApiKey|ConfirmationCode|VerificationCode|Session|Auth|Credential)/i.test(text);
  }

  function discoverLocalKeys() {
    return [];
  }

  function normalizeKeys(input) {
    const source = Array.isArray(input) && input.length ? input : defaultKeys.concat(discoverLocalKeys());
    return Array.from(new Set(source.map(clean).filter(isSharedKey)));
  }

  function hasValue(value) {
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === "object") return Object.keys(value).length > 0;
    return clean(value) !== "";
  }

  function readValue(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null || raw === "") return fallback;
      if (raw.length > maxLocalValueBytes) return fallback;
      if (/^data:(?:image|video|application)\//i.test(raw)) return fallback;
      try { return JSON.parse(raw); } catch (error) { return raw; }
    } catch (error) {
      return fallback;
    }
  }

  function rowFreshness(row) {
    if (!row || typeof row !== "object") return 0;
    const stamps = [row.updatedAt, row.savedAt, row.createdAt, row.postedAt, row.publishedAt, row.at, row.timestamp, row.liveAt, row.created];
    let max = 0;
    stamps.forEach((stamp) => {
      const text = clean(stamp);
      if (!text) return;
      const parsed = Date.parse(text);
      if (!isNaN(parsed)) max = Math.max(max, parsed);
    });
    return max;
  }

  function readDeletedIdMap() {
    try {
      const parsed = JSON.parse(localStorage.getItem("emyFeedDeletedIds") || "{}");
      if (Array.isArray(parsed)) {
        return parsed.reduce((map, id) => {
          if (id) map[String(id)] = true;
          return map;
        }, {});
      }
      if (parsed && typeof parsed === "object") {
        return Object.keys(parsed).reduce((map, id) => {
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
    return feedItemAliases(row).some((id) => !!tombstones[id]);
  }

  function stripTombstonedFeedRows(value, tombstones, key) {
    if (!Array.isArray(value)) return value;
    const appliesTombstones = feedTombstonesApplyToKey(key);
    const hasTombstones = !!(tombstones && Object.keys(tombstones).length);
    return value.filter((row) => {
      if (appliesTombstones && hasTombstones && feedItemTombstoned(row, tombstones, key)) return false;
      return true;
    });
  }

  function mergeDeletedIdMaps(existing, incoming) {
    const output = existing && typeof existing === "object" && !Array.isArray(existing) ? Object.assign({}, existing) : {};
    if (Array.isArray(incoming)) {
      incoming.forEach((id) => {
        if (id) output[String(id)] = Math.max(Number(output[String(id)] || 0), Date.now());
      });
      return output;
    }
    if (!incoming || typeof incoming !== "object") return output;
    Object.keys(incoming).forEach((id) => {
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

  function mergeStorageValue(existing, incoming, key) {
    if (incoming === undefined || incoming === null) return existing;
    if (key === "emyFeedDeletedIds") return mergeDeletedIdMaps(existing, incoming);
    const tombstones = readDeletedIdMap();
    if (Array.isArray(existing) || Array.isArray(incoming)) {
      const rows = [];
      if (Array.isArray(existing)) rows.push.apply(rows, existing);
      if (Array.isArray(incoming)) rows.push.apply(rows, incoming);
      if (!rows.length) return Array.isArray(existing) ? existing : [];
      const map = new Map();
      rows.forEach((row, index) => {
        if (row === undefined || row === null) return;
        if (feedItemTombstoned(row, tombstones, key)) return;
        const id = contentId(row, key, index);
        if (map.has(id)) {
          const prev = map.get(id);
          const prevFresh = rowFreshness(prev);
          const rowFresh = rowFreshness(row);
          const primary = prevFresh >= rowFresh ? prev : row;
          const secondary = primary === prev ? row : prev;
          map.set(id, mergeStorageValue(primary, secondary, key));
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
      Object.keys(incoming).forEach((prop) => {
        const value = incoming[prop];
        if (value === undefined || value === null) return;
        if (output[prop] !== undefined && (Array.isArray(value) || (value && typeof value === "object"))) {
          output[prop] = mergeStorageValue(output[prop], value, key + "." + prop);
        } else if (output[prop] === undefined) {
          output[prop] = value;
        } else if (rowFreshness(value) > rowFreshness(output[prop])) {
          output[prop] = value;
        }
      });
      return output;
    }
    return existing !== undefined && existing !== null && clean(existing) !== "" ? existing : incoming;
  }

  function writeValue(key, value, options) {
    if (!isSharedKey(key) || value === undefined || value === null) return false;
    const opts = options || {};
    const existing = readValue(key, undefined);
    const merged = opts.replace === true ? value : mergeStorageValue(existing, value, key);
    if (!hasValue(merged)) return false;
    const next = typeof merged === "string" ? merged : JSON.stringify(merged);
    try {
      if (localStorage.getItem(key) === next) return false;
      localStorage.setItem(key, next);
      return true;
    } catch (error) {
      return false;
    }
  }

  function cloudStorage() {
    return window.emyCloudStorage || null;
  }

  function cloudReady() {
    const cloud = cloudStorage();
    return !!(cloud && typeof cloud.syncPublicContent === "function");
  }

  function cloudinaryConfig() {
    const config = window.emyRealAuth && window.emyRealAuth.config && window.emyRealAuth.config.cloudinary || {};
    return {
      cloudName: clean(config.cloudName) || "dupytlsjv",
      uploadPreset: clean(config.uploadPreset) || "emy_unsigned_upload"
    };
  }

  function notify(keys, action) {
    const changedKeys = normalizeKeys(keys);
    const detail = {
      source: "central-storage",
      provider: state.lastProvider,
      action: action || "sync",
      keys: changedKeys
    };
    try { window.dispatchEvent(new CustomEvent("emy:central-storage-synced", { detail })); } catch (error) {}
    try { window.dispatchEvent(new CustomEvent("emy:business-content-changed", { detail })); } catch (error) {}
    if (changedKeys.some((key) => /Product/i.test(key))) {
      try { window.dispatchEvent(new CustomEvent("emy:business-products-changed", { detail })); } catch (error) {}
    }
    if (changedKeys.some((key) => /Clip|Reel/i.test(key))) {
      try { window.dispatchEvent(new CustomEvent("emy:business-clips-changed", { detail })); } catch (error) {}
    }
    if (changedKeys.some((key) => /FeedCreatedPosts|FeedCreatedArticles|BusinessPosts|BusinessFeedPosts|BusinessArticles|BusinessArticlePosts|FeedReposts|Post/i.test(key))) {
      try { window.dispatchEvent(new CustomEvent("emy:created-posts-changed", { detail })); } catch (error) {}
    }
    if (changedKeys.some((key) => /FeedCreatedEvents|BusinessEvents|BusinessEventPosts/i.test(key))) {
      try { window.dispatchEvent(new CustomEvent("emy:created-events-changed", { detail })); } catch (error) {}
    }
    if (changedKeys.some((key) => /FeedCreatedJobs|BusinessJobs|BusinessJobPosts/i.test(key))) {
      try { window.dispatchEvent(new CustomEvent("emy:created-jobs-changed", { detail })); } catch (error) {}
    }
    if (changedKeys.some((key) => /Customer|Relationship/i.test(key))) {
      try { window.dispatchEvent(new CustomEvent("emy:customer-relationships-changed", { detail })); } catch (error) {}
    }
  }

  function mergeChangedKeys(target, keys) {
    if (!Array.isArray(target) || !Array.isArray(keys)) return target;
    const seen = new Set(target);
    keys.forEach((key) => {
      const cleanKey = clean(key);
      if (cleanKey && !seen.has(cleanKey)) {
        seen.add(cleanKey);
        target.push(cleanKey);
      }
    });
    return target;
  }

  async function pull(keys, options) {
    if (!localSharedHost || typeof fetch !== "function") return false;
    const opts = options || {};
    const list = normalizeKeys(keys);
    const url = endpoint + (list.length ? "?keys=" + encodeURIComponent(list.join(",")) : "");
    const response = await fetch(url, { cache: "no-store" });
    if (!response || !response.ok) return false;
    const payload = await response.json().catch(() => ({}));
    const data = payload && payload.data && typeof payload.data === "object" ? payload.data : {};
    const changed = [];
    Object.keys(data).filter(isSharedKey).forEach((key) => {
      if (writeValue(key, data[key], { merge: true })) changed.push(key);
    });
    state.lastPulledChangedKeys = changed.slice();
    if (changed.length && !opts.silent) notify(changed, "pull");
    return true;
  }

  async function push(keys, reason, replace) {
    if (!localSharedHost || typeof fetch !== "function") return false;
    const data = {};
    normalizeKeys(keys).forEach((key) => {
      const value = readValue(key, null);
      if (hasValue(value)) data[key] = value;
    });
    if (!Object.keys(data).length && !replace) return false;
    const body = { reason: reason || "central-storage", data };
    if (replace) body.replaceKeys = normalizeKeys(keys);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    return !!(response && response.ok);
  }

  async function sync(keys, reason) {
    if (state.busy) {
      state.pending = true;
      return false;
    }
    const reasonText = clean(reason || "");
    const passiveReason = /^(boot|dom-ready|load|pageshow|focus|visible|cloud-late|pending)$/i.test(reasonText);
    if (passiveReason && state.lastSyncStartedAt && Date.now() - state.lastSyncStartedAt < 5000) return false;
    state.busy = true;
    state.pending = false;
    state.lastError = "";
    state.lastSyncStartedAt = Date.now();
    const list = normalizeKeys(keys);
    try {
      if (cloudReady()) {
        state.lastProvider = "firebase";
        const cloud = cloudStorage();
        if (typeof cloud.syncPublicContent === "function") await cloud.syncPublicContent().catch(() => {});
        if (typeof cloud.syncUser === "function") await cloud.syncUser().catch(() => {});
        if (typeof cloud.flush === "function") await cloud.flush().catch(() => {});
      } else {
        state.lastProvider = localSharedHost ? "local-shared" : "browser-local";
      }
      const changed = [];
      state.lastPulledChangedKeys = [];
      await pull(list, { silent: true }).catch(() => false);
      mergeChangedKeys(changed, state.lastPulledChangedKeys);
      await push(list, reason || "central-sync", false).catch(() => false);
      state.lastPulledChangedKeys = [];
      await pull(list, { silent: true }).catch(() => false);
      mergeChangedKeys(changed, state.lastPulledChangedKeys);
      state.lastSyncAt = new Date().toISOString();
      if (changed.length) notify(changed, "sync");
      return true;
    } catch (error) {
      state.lastError = clean(error && error.message || error);
      return false;
    } finally {
      state.busy = false;
      if (state.pending) window.setTimeout(() => sync(keys, "pending"), 60);
    }
  }

  async function setValue(key, value, options) {
    if (!isSharedKey(key)) return false;
    try {
      localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    } catch (error) {
      return false;
    }
    if (!options || options.flush !== false) {
      await push([key], options && options.reason || "central-set", !!(options && options.replace)).catch(() => false);
      const cloud = cloudStorage();
      if (cloud && typeof cloud.flush === "function") await cloud.flush().catch(() => {});
    }
    notify([key], "set");
    return true;
  }

  async function removeValue(key, options) {
    if (!isSharedKey(key)) return false;
    try { localStorage.removeItem(key); } catch (error) {}
    await push([key], options && options.reason || "central-remove", true).catch(() => false);
    const cloud = cloudStorage();
    if (cloud && typeof cloud.flush === "function") await cloud.flush().catch(() => {});
    notify([key], "remove");
    return true;
  }

  function mediaUrl(publicId, type) {
    const id = clean(publicId);
    if (!id) return "";
    if (/^https?:\/\//i.test(id)) return id;
    const resource = String(type || "image").toLowerCase() === "video" ? "video" : "image";
    const config = cloudinaryConfig();
    return "https://res.cloudinary.com/" + encodeURIComponent(config.cloudName) + "/" + resource + "/upload/" + id.split("/").map(encodeURIComponent).join("/");
  }

  async function uploadMedia(value, options) {
    if (window.emyRealAuth && typeof window.emyRealAuth.uploadToCloudinary === "function") {
      return window.emyRealAuth.uploadToCloudinary(value, options || {});
    }
    throw new Error("Cloudinary upload is not ready yet.");
  }

  function status() {
    return {
      provider: state.lastProvider,
      records: cloudReady() ? "firebase" : state.lastProvider,
      media: "cloudinary",
      localShared: localSharedHost,
      cloudRecords: cloudReady(),
      cloudinary: cloudinaryConfig(),
      lastSyncAt: state.lastSyncAt,
      lastError: state.lastError
    };
  }

  window.emyCentralStorage = {
    status,
    providers: status,
    keys: normalizeKeys,
    get: readValue,
    set: setValue,
    remove: removeValue,
    sync,
    pull,
    push,
    mediaUrl,
    uploadMedia
  };

  function schedule(reason, delay) {
    const reasonText = clean(reason || "scheduled");
    const passiveReason = /^(boot|dom-ready|load|pageshow|focus|visible|cloud-late)$/i.test(reasonText);
    const now = Date.now();
    if (passiveReason && state.lastPassiveScheduleAt && now - state.lastPassiveScheduleAt < 5000) return;
    if (passiveReason) state.lastPassiveScheduleAt = now;
    if (state.scheduleTimer) window.clearTimeout(state.scheduleTimer);
    state.scheduleTimer = window.setTimeout(() => {
      state.scheduleTimer = 0;
      sync(null, reasonText);
    }, typeof delay === "number" ? delay : 0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => schedule("dom-ready", bootSyncDelayMs), { once: true });
  } else {
    schedule("boot", bootSyncDelayMs);
  }
  window.addEventListener("load", () => schedule("load", bootSyncDelayMs));
  window.addEventListener("pageshow", () => schedule("pageshow", resumeSyncDelayMs));
  window.addEventListener("focus", () => schedule("focus", resumeSyncDelayMs));
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) schedule("visible", resumeSyncDelayMs);
  });
  window.addEventListener("emy:cloud-public-content-synced", () => schedule("cloud-public", 0));
  window.addEventListener("emy:cloud-user-storage-synced", () => schedule("cloud-user", 0));
  window.setTimeout(() => schedule("cloud-late", resumeSyncDelayMs), 4500);
})();

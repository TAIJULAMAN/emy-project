const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const port = Number(process.env.PORT || 8000);
const host = "127.0.0.1";
const root = path.join(__dirname, "linked-pages");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webm": "video/webm",
  ".mp4": "video/mp4",
};

const COMPRESSIBLE_EXT = new Set([".html", ".htm", ".css", ".js", ".json", ".svg", ".txt"]);

function cacheControlFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html" || ext === ".htm") return "no-cache";
  if (filePath.includes(`${path.sep}assets${path.sep}`) || COMPRESSIBLE_EXT.has(ext)) {
    return "public, max-age=31536000, immutable";
  }
  return "public, max-age=3600";
}

function sendStaticFile(req, res, filePath, data) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = types[ext] || "application/octet-stream";
  const headers = {
    "Content-Type": contentType,
    "Cache-Control": cacheControlFor(filePath),
  };
  const acceptEncoding = String(req.headers["accept-encoding"] || "");
  const shouldCompress = COMPRESSIBLE_EXT.has(ext) && data.length > 1024 && acceptEncoding.includes("gzip");

  if (req.method === "HEAD") {
    res.writeHead(200, headers);
    res.end();
    return;
  }

  if (!shouldCompress) {
    res.writeHead(200, headers);
    res.end(data);
    return;
  }

  zlib.gzip(data, (gzipError, compressed) => {
    if (gzipError) {
      res.writeHead(200, headers);
      res.end(data);
      return;
    }
    headers["Content-Encoding"] = "gzip";
    headers["Vary"] = "Accept-Encoding";
    res.writeHead(200, headers);
    res.end(compressed);
  });
}

const sharedContentStorePath = path.join(__dirname, ".emy-shared-public-content.json");
let sharedContentResetUntil = 0;
const sharedContentKeys = new Set([
  "emyBusinessProfiles", "emyBusinessDirectory", "emyNearbyBusinesses", "emyLocalBusinesses", "emyBusinesses",
  "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts",
  "emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels",
  "emyBusinessPosts", "emyBusinessFeedPosts",
  "emyBusinessArticles", "emyBusinessArticlePosts",
  "emyBusinessEvents", "emyBusinessEventPosts",
  "emyBusinessJobs", "emyBusinessJobPosts",
  "emyFeedCreatedPosts", "emyFeedCreatedClips", "emyFeedCreatedEvents", "emyFeedCreatedJobs", "emyFeedReposts",
  "emyFeedActionState", "emyClipViewStats", "emyProductViewStats", "emyPostViewStats",
  "emyBusinessProfileViewStats", "emyBusinessDirectionStats",
  "emyBusinessLikeState", "emyBusinessLikePairs", "emyProductMascotLikeState", "emyClipMascotLikeState"
]);
const BUSINESS_LIKE_PAIRS_KEY = "emyBusinessLikePairs";

function slugBusinessLikeId(value) {
  return cleanSharedText(value).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 140);
}

function businessLikePairIdentity(businessId, userId) {
  return slugBusinessLikeId(businessId) + "\0" + cleanSharedText(userId).toLowerCase();
}

function readBusinessLikePairs(data) {
  const raw = data && data[BUSINESS_LIKE_PAIRS_KEY];
  if (!Array.isArray(raw)) return [];
  const map = new Map();
  raw.forEach((row) => {
    if (!row || typeof row !== "object") return;
    const businessId = slugBusinessLikeId(row.businessId);
    const userId = cleanSharedText(row.userId);
    if (!businessId || !userId) return;
    const id = businessLikePairIdentity(businessId, userId);
    if (!map.has(id)) {
      map.set(id, {
        businessId,
        userId,
        likedAt: cleanSharedText(row.likedAt) || new Date().toISOString(),
      });
    }
  });
  return Array.from(map.values());
}

function rebuildBusinessLikeStateFromPairs(pairs) {
  const state = {};
  pairs.forEach(({ businessId, userId, likedAt }) => {
    const key = slugBusinessLikeId(businessId);
    if (!key) return;
    if (!state[key]) {
      state[key] = { likedBy: [], count: 0, baseCount: 0, updatedAt: likedAt || new Date().toISOString() };
    }
    if (!state[key].likedBy.includes(userId)) state[key].likedBy.push(userId);
    state[key].count = state[key].likedBy.length;
    state[key].updatedAt = likedAt || state[key].updatedAt;
  });
  return state;
}

function mergeBusinessLikePairs(existing, incoming) {
  const map = new Map();
  readBusinessLikePairs({ [BUSINESS_LIKE_PAIRS_KEY]: existing }).forEach((row) => {
    map.set(businessLikePairIdentity(row.businessId, row.userId), row);
  });
  readBusinessLikePairs({ [BUSINESS_LIKE_PAIRS_KEY]: incoming }).forEach((row) => {
    map.set(businessLikePairIdentity(row.businessId, row.userId), row);
  });
  return Array.from(map.values()).slice(-5000);
}

function countBusinessLikePairs(pairs, businessId) {
  const target = slugBusinessLikeId(businessId);
  return pairs.filter((row) => slugBusinessLikeId(row.businessId) === target).length;
}

function applyBusinessLikeAction(store, payload) {
  const action = cleanSharedText(payload.action).toLowerCase();
  const businessId = slugBusinessLikeId(payload.businessId);
  const userId = cleanSharedText(payload.userId);
  if (action !== "like" && action !== "unlike") return { error: "Invalid action. Use like or unlike." };
  if (!businessId || !userId) return { error: "businessId and userId are required." };
  const data = store.data && typeof store.data === "object" ? { ...store.data } : {};
  let pairs = readBusinessLikePairs(data);
  const identity = businessLikePairIdentity(businessId, userId);
  const exists = pairs.some((row) => businessLikePairIdentity(row.businessId, row.userId) === identity);
  if (action === "like" && !exists) {
    pairs.push({ businessId, userId, likedAt: new Date().toISOString() });
  } else if (action === "unlike" && exists) {
    pairs = pairs.filter((row) => businessLikePairIdentity(row.businessId, row.userId) !== identity);
  }
  pairs = pairs.slice(-5000);
  data[BUSINESS_LIKE_PAIRS_KEY] = pairs;
  data.emyBusinessLikeState = rebuildBusinessLikeStateFromPairs(pairs);
  const saved = writeSharedContentStore({ data });
  return {
    ok: true,
    action,
    businessId,
    userId,
    liked: pairs.some((row) => businessLikePairIdentity(row.businessId, row.userId) === identity),
    cumulativeLikes: countBusinessLikePairs(pairs, businessId),
    updatedAt: saved.updatedAt,
  };
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req, limit = 60_000_000) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > limit) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body.trim()) return resolve({});
      try { resolve(JSON.parse(body)); }
      catch (error) { reject(new Error("Invalid JSON body")); }
    });
    req.on("error", reject);
  });
}

function readSharedContentStore() {
  try {
    const parsed = JSON.parse(fs.readFileSync(sharedContentStorePath, "utf8"));
    if (parsed && typeof parsed === "object" && parsed.data && typeof parsed.data === "object") return parsed;
  } catch (error) {}
  return { version: 1, updatedAt: "", data: {} };
}

function writeSharedContentStore(store) {
  const next = {
    version: 1,
    updatedAt: new Date().toISOString(),
    data: store && store.data && typeof store.data === "object" ? store.data : {},
  };
  fs.writeFileSync(sharedContentStorePath, JSON.stringify(next, null, 2), "utf8");
  return next;
}

function cleanSharedText(value) {
  return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
}

function sharedContentId(value, key, index) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const direct = [
      value.id, value.productId, value.clipId, value.reelId, value.postId, value.feedId,
      value.eventId, value.jobId, value.articleId, value.businessKey, value.key, value.slug,
      value.storageId, value.sourceId
    ].map(cleanSharedText).find(Boolean);
    if (direct) return `${key}:id:${direct.toLowerCase()}`;
    const title = cleanSharedText(value.title || value.name || value.productName || value.businessName || value.text || value.description);
    const time = cleanSharedText(value.createdAt || value.updatedAt || value.savedAt || value.at || value.timestamp);
    const business = cleanSharedText(value.businessKey || value.businessName || value.business || value.ownerName);
    if (title || time || business) return `${key}:fallback:${business.toLowerCase()}|${title.toLowerCase()}|${time.toLowerCase()}`;
  }
  try { return `${key}:json:${JSON.stringify(value).slice(0, 600)}`; }
  catch (error) { return `${key}:index:${index}`; }
}

function mergeSharedValue(existing, incoming, key) {
  if (incoming === undefined || incoming === null) return existing;
  if (Array.isArray(existing) || Array.isArray(incoming)) {
    const rows = [];
    if (Array.isArray(existing)) rows.push(...existing);
    if (Array.isArray(incoming)) rows.push(...incoming);
    if (!rows.length) return Array.isArray(existing) ? existing : [];
    const map = new Map();
    rows.forEach((row, index) => {
      if (row === undefined || row === null) return;
      const id = sharedContentId(row, key, index);
      map.set(id, map.has(id) ? mergeSharedValue(map.get(id), row, key) : row);
    });
    return Array.from(map.values()).slice(-500);
  }
  const existingObject = existing && typeof existing === "object";
  const incomingObject = incoming && typeof incoming === "object";
  if (existingObject || incomingObject) {
    const output = existingObject ? { ...existing } : {};
    if (!incomingObject) return output;
    Object.keys(incoming).forEach((prop) => {
      const value = incoming[prop];
      if (value === undefined || value === null) return;
      if (output[prop] !== undefined && (Array.isArray(value) || (value && typeof value === "object"))) {
        output[prop] = mergeSharedValue(output[prop], value, `${key}.${prop}`);
      } else {
        output[prop] = value;
      }
    });
    return output;
  }
  return incoming;
}

function hasSharedContentValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.keys(value).length > 0;
  return cleanSharedText(value) !== "";
}

function readSharedStoredValue(value) {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}

function sharedContentHasStoredRows(value) {
  return hasSharedContentValue(readSharedStoredValue(value));
}

function isSharedContentListKey(key) {
  return /^(emyBusinessProducts|emyBusinessProductList|emyBusinessProductPosts|emyFeedCreatedProducts|emyBusinessClips|emyBusinessReels|emyBusinessProductReels|emyFeedCreatedClips|emyFeedCreatedClipsByBusiness|emyUploadedClips|emyBusinessPosts|emyBusinessFeedPosts|emyFeedCreatedPosts|emyFeedCreatedEvents|emyFeedCreatedJobs|emyFeedCreatedArticles|emyBusinessEvents|emyBusinessEventPosts|emyBusinessJobs|emyBusinessJobPosts|emyBusinessArticles|emyBusinessArticlePosts)$/i.test(cleanSharedText(key));
}

function fallbackSharedContentValue(data, key) {
  if (sharedContentHasStoredRows(data && data[key])) return data[key];
  const fingerprints = data && data.emySharedPortContentFingerprintsV2;
  if (fingerprints && typeof fingerprints === "object" && sharedContentHasStoredRows(fingerprints[key])) {
    return fingerprints[key];
  }
  return undefined;
}

async function handleSharedContent(req, res) {
  if (req.method === "OPTIONS") return sendJson(res, 204, {});
  const store = readSharedContentStore();
  if (req.method === "GET") {
    const requestUrl = new URL(req.url, `http://${host}:${port}`);
    const requestedKeys = cleanSharedText(requestUrl.searchParams.get("keys"))
      .split(",")
      .map((key) => cleanSharedText(key))
      .filter((key) => key && sharedContentKeys.has(key));
    const data = store.data && typeof store.data === "object" ? store.data : {};
    if (requestedKeys.length) {
      const filtered = {};
      requestedKeys.forEach((key) => {
        filtered[key] = Object.prototype.hasOwnProperty.call(data, key) ? data[key] : [];
      });
      return sendJson(res, 200, { ok: true, updatedAt: store.updatedAt || "", keys: requestedKeys, data: filtered });
    }
    return sendJson(res, 200, { ok: true, updatedAt: store.updatedAt || "", data });
  }
  if (req.method === "DELETE") {
    const saved = writeSharedContentStore({ data: {} });
    return sendJson(res, 200, { ok: true, reset: true, updatedAt: saved.updatedAt, keys: [] });
  }
  if (req.method !== "POST") return sendJson(res, 405, { ok: false, error: "Use GET, POST, or DELETE" });
  try {
    const payload = await readJsonBody(req);
    if (payload && (payload.reset === true || payload.action === "reset" || payload.action === "clear")) {
      sharedContentResetUntil = Date.now() + 12000;
      const saved = writeSharedContentStore({ data: {} });
      return sendJson(res, 200, { ok: true, reset: true, updatedAt: saved.updatedAt, keys: [] });
    }
    if (sharedContentResetUntil && Date.now() < sharedContentResetUntil) {
      return sendJson(res, 200, { ok: true, ignored: true, resetWindow: true, keys: Object.keys(store.data || {}) });
    }
    if (payload && (payload.action === "like" || payload.action === "unlike")) {
      const result = applyBusinessLikeAction(store, payload);
      if (result.error) return sendJson(res, 400, { ok: false, error: result.error });
      return sendJson(res, 200, result);
    }
    const incoming = payload && payload.data && typeof payload.data === "object" ? payload.data : payload;
    const next = store.data && typeof store.data === "object" ? { ...store.data } : {};
    const reason = cleanSharedText(payload && payload.reason).toLowerCase();
    const allowReplaceKeys = /(?:delete|replace|manual|clear)/.test(reason);
    const destructiveReplace = /(?:delete|clear|reset)/.test(reason);
    const replaceKeys = allowReplaceKeys && Array.isArray(payload && payload.replaceKeys) ? payload.replaceKeys.filter((key) => sharedContentKeys.has(key)) : [];
    if (replaceKeys.length) {
      replaceKeys.forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(incoming || {}, key)) {
          const fallback = !destructiveReplace && isSharedContentListKey(key) ? fallbackSharedContentValue(next, key) : undefined;
          if (fallback !== undefined) {
            next[key] = fallback;
            return;
          }
          next[key] = [];
          return;
        }
        const value = incoming[key];
        const fallback = !destructiveReplace && isSharedContentListKey(key) && !hasSharedContentValue(value) ? fallbackSharedContentValue(next, key) : undefined;
        if (fallback !== undefined) {
          next[key] = fallback;
          return;
        }
        next[key] = Array.isArray(value) ? value.slice(-500) : (value && typeof value === "object" ? value : []);
      });
    }
    sharedContentKeys.forEach((key) => {
      if (replaceKeys.includes(key)) return;
      if (!Object.prototype.hasOwnProperty.call(incoming || {}, key)) return;
      const value = incoming[key];
      if (!hasSharedContentValue(value)) return;
      if (key === BUSINESS_LIKE_PAIRS_KEY) {
        next[key] = mergeBusinessLikePairs(next[key], value);
        next.emyBusinessLikeState = rebuildBusinessLikeStateFromPairs(next[key]);
        return;
      }
      next[key] = mergeSharedValue(next[key], value, key);
    });
    const saved = writeSharedContentStore({ data: next });
    sendJson(res, 200, { ok: true, updatedAt: saved.updatedAt, keys: Object.keys(saved.data || {}) });
  } catch (error) {
    sendJson(res, 400, { ok: false, error: error.message || "Could not save shared content" });
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${host}:${port}`);
  if (url.pathname === "/api/emy-shared-content") {
    handleSharedContent(req, res);
    return;
  }
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";

  const file = path.resolve(root, `.${pathname}`);
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    sendStaticFile(req, res, file, data);
  });
});

server.listen(port, host, () => {
  console.log(`EMY preview running at http://${host}:${port}/`);
});

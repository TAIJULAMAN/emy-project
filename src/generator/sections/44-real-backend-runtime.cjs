/* EMY generator section: 44-real-backend-runtime.cjs (source lines 109445-110977) */
const emyRealBackendRuntimeScript = String.raw`(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyB9bbSz9qCWFz4r8iD8RPBQn2hHAlI4aK4",
    authDomain: "my-emy-db032.firebaseapp.com",
    projectId: "my-emy-db032",
    storageBucket: "my-emy-db032.firebasestorage.app",
    messagingSenderId: "351472903488",
    appId: "1:351472903488:web:93862ed87fe5714d7646a5",
    measurementId: "G-7F5BP1MT2R"
  };
  const adminEmail = "i.stephane@my-emy.com";
  const cloudinary = { cloudName: "dupytlsjv", uploadPreset: "emy_unsigned_upload" };
  const functionsRegion = "europe-west2";
  const state = { app: null, auth: null, db: null, functions: null, ready: false, error: "" };

  function clean(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }
  function cleanEmail(value) {
    return clean(value).toLowerCase();
  }
  function roleValue(value) {
    const role = clean(value).toLowerCase();
    return role === "business" ? "business" : "customer";
  }
  function nowIso() {
    return new Date().toISOString();
  }
  function serverTimestamp() {
    try {
      return firebase.firestore.FieldValue.serverTimestamp();
    } catch (error) {
      return nowIso();
    }
  }
  function setLocal(key, value) {
    try {
      if (value === undefined || value === null || value === "") localStorage.removeItem(key);
      else localStorage.setItem(key, String(value));
    } catch (error) {}
  }
  function setLocalJson(key, value) {
    try {
      if (value === undefined || value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }
  const customerProfilePhotoKeys = [
    "emyCustomerProfilePhoto",
    "emyCustomerProfilePhotoSrc",
    "emyCustomerProfileImage",
    "emyCustomerProfileImageSrc",
    "emyCustomerAvatar",
    "emyCustomerAvatarSrc",
    "emyCustomerPhoto",
    "emyCustomerPhotoSrc"
  ];
  const customerProfilePhotoRefKeys = [
    "emyCustomerProfilePhotoRef",
    "emyCustomerProfileImageRef",
    "emyCustomerAvatarRef",
    "emyCustomerPhotoRef"
  ];
  function firstCleanValue(values) {
    for (let index = 0; index < values.length; index += 1) {
      const text = clean(values[index]);
      if (text) return text;
    }
    return "";
  }
  function setCustomerProfilePhotoLocals(photo, ref) {
    const nextPhoto = clean(photo);
    const nextRef = clean(ref);
    if (!nextPhoto && !nextRef) return;
    customerProfilePhotoKeys.forEach(function (key) { setLocal(key, nextPhoto); });
    customerProfilePhotoRefKeys.forEach(function (key) { setLocal(key, nextRef); });
    setLocal("emyCustomerProfileUpdatedAt", new Date().toISOString());
    try { window.dispatchEvent(new CustomEvent("emy:customer-profile-updated")); } catch (error) {}
  }
  function clearCustomerProfilePhotoLocals() {
    customerProfilePhotoKeys.concat(customerProfilePhotoRefKeys).forEach(function (key) { setLocal(key, ""); });
    setLocal("emyCustomerProfilePhotoBackup", "");
    setLocal("emyCustomerProfilePhotoSrcBackup", "");
    setLocal("emyCustomerProfilePhotoRefBackup", "");
    setLocal("emyCustomerProfilePhotoCrop", "");
    setLocal("emyCustomerProfileUpdatedAt", new Date().toISOString());
    try { window.dispatchEvent(new CustomEvent("emy:customer-profile-updated")); } catch (error) {}
  }
  function readLocalJson(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "null");
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch (error) {
      return fallback;
    }
  }
  function publicError(error) {
    const code = clean(error && error.code).toLowerCase();
    if (code.indexOf("email-already-in-use") >= 0) return "This email already has a real EMY account. Please sign in instead.";
    if (code.indexOf("invalid-email") >= 0) return "Please enter a valid email address.";
    if (code.indexOf("weak-password") >= 0) return "Please use a stronger password with at least 6 characters.";
    if (code.indexOf("user-not-found") >= 0 || code.indexOf("wrong-password") >= 0 || code.indexOf("invalid-credential") >= 0) return "The email or password is not correct.";
    if (code.indexOf("too-many-requests") >= 0) return "Firebase blocked this temporarily after too many attempts. Please wait and try again.";
    if (code.indexOf("unauthenticated") >= 0) return "Please sign in again so EMY can send or check your confirmation code.";
    if (code.indexOf("failed-precondition") >= 0 || code.indexOf("functions/failed-precondition") >= 0) return error && error.message ? clean(error.message) : "The EMY code sender is not configured yet.";
    if (code.indexOf("resource-exhausted") >= 0) return error && error.message ? clean(error.message) : "Please wait before asking for another EMY code.";
    if (code.indexOf("deadline-exceeded") >= 0) return error && error.message ? clean(error.message) : "This EMY code expired. Please resend it.";
    if (code.indexOf("permission-denied") >= 0) return error && error.message ? clean(error.message) : "That EMY code is not correct.";
    if (code.indexOf("internal") >= 0 || clean(error && error.message).toLowerCase() === "internal") return "EMY code backend is not reachable yet. Deploy Firebase Functions and configure the email sender, then resend the code.";
    if (error && error.message) return clean(error.message);
    return "EMY could not reach the real account backend. Please check your connection and try again.";
  }
  function init() {
    if (state.ready) return state;
    if (!window.firebase || !firebase.initializeApp) {
      state.error = "Firebase SDK did not load. Check your internet connection and refresh.";
      return state;
    }
    try {
      state.app = firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
      state.auth = firebase.auth();
      state.db = firebase.firestore();
      if (firebase.app && firebase.app().functions) state.functions = firebase.app().functions(functionsRegion);
      else if (firebase.functions) state.functions = firebase.functions();
      state.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function () {});
      state.ready = true;
    } catch (error) {
      state.error = publicError(error);
    }
    return state;
  }
  function requireReady() {
    init();
    if (!state.ready || !state.auth || !state.db) throw new Error(state.error || "Firebase is not ready yet.");
    try { installEmyCloudStorage(); } catch (error) {}
    return state;
  }
  function activeUser() {
    requireReady();
    return state.auth.currentUser;
  }
  function updateUserLocals(user, role) {
    const nextRole = roleValue(role || localStorage.getItem("emyMainSignedInRole") || localStorage.getItem("emyMainPendingSignupRole"));
    setLocal("emyRealBackend", "firebase");
    setLocal("emyFirebaseProjectId", firebaseConfig.projectId);
    setLocal("emyFirebaseUid", user && user.uid);
    setLocal("emyMainSignedInRole", nextRole);
    setLocal("emyMainSignedInEmail", user && user.email);
    setLocal("emyMainSignedOut", "");
    if (user && user.emailVerified) setLocal("emyMainConfirmationCompleted", "1");
  }
  function profileName(input) {
    const first = clean(input && input.firstName);
    const last = clean(input && input.lastName);
    return clean(input && input.displayName) || [first, last].filter(Boolean).join(" ") || cleanEmail(input && input.email).split("@")[0] || "EMY user";
  }
  function localPendingProfile() {
    return {
      firstName: localStorage.getItem("emyMainPendingSignupFirstName") || "",
      lastName: localStorage.getItem("emyMainPendingSignupLastName") || "",
      email: localStorage.getItem("emyMainPendingSignupEmail") || localStorage.getItem("emyMainSignedInEmail") || "",
      phone: localStorage.getItem("emyMainPendingSignupPhone") || "",
      privacy: localStorage.getItem("emyMainPendingSignupPrivacy") || localStorage.getItem("emyCustomerProfileVisibility") || "private"
    };
  }
  function cloudinaryResourceType(value) {
    const type = clean(value).toLowerCase();
    return type === "video" || type === "raw" || type === "image" ? type : "";
  }
  function dataUrlType(value, options) {
    const requested = cloudinaryResourceType(options && (options.resourceType || options.resource_type || options.type));
    if (requested) return requested;
    const text = String(value || "");
    if (/^data:video\//i.test(text)) return "video";
    if (/^data:image\//i.test(text)) return "image";
    if (/^data:/i.test(text)) return "raw";
    return "image";
  }
  function blobUploadType(value, options) {
    const requested = cloudinaryResourceType(options && (options.resourceType || options.resource_type || options.type));
    if (requested) return requested;
    const type = String(value && value.type || "").toLowerCase();
    if (type.indexOf("video/") === 0) return "video";
    if (type.indexOf("image/") === 0) return "image";
    if (type) return "raw";
    return "image";
  }
  function notifyCloudinaryUploadProgress(options, percent, detail) {
    const onProgress = options && typeof options.onProgress === "function" ? options.onProgress : null;
    if (!onProgress) return;
    const cleanPercent = Math.max(0, Math.min(100, Math.round(Number(percent) || 0)));
    try { onProgress(cleanPercent, detail || {}); } catch (error) {}
  }
  function cloudinaryUploadResult(data, type) {
    return {
      url: data.secure_url || data.url || "",
      publicId: data.public_id || "",
      resourceType: data.resource_type || type,
      format: data.format || "",
      bytes: data.bytes || 0,
      width: data.width || 0,
      height: data.height || 0,
      duration: data.duration || 0
    };
  }
  function looksBrowserOnlyMediaRef(value) {
    const cleanRef = clean(value);
    if (!cleanRef) return false;
    if (/^(data:image\/|data:video\/|blob:|https?:\/\/|file:|\/|\.{1,2}\/|assets\/)/i.test(cleanRef)) return false;
    return /^emy-media-|^business-|^customer-|^profile-|^media-/i.test(cleanRef);
  }
  function cloudinaryMediaUrl(publicId, type) {
    let cleanId = clean(publicId);
    if (!cleanId) return "";
    if (/^https?:\/\//i.test(cleanId)) return cleanId;
    if (/^(data:|blob:|file:|\/|\.{1,2}\/|assets\/)/i.test(cleanId) || looksBrowserOnlyMediaRef(cleanId)) return "";
    cleanId = cleanId.replace(/^emy-video-ref:/i, "").replace(/^emy-ref:/i, "");
    const resource = String(type || "").toLowerCase() === "video" ? "video" : "image";
    return "https://res.cloudinary.com/" + encodeURIComponent(cloudinary.cloudName) + "/" + resource + "/upload/" + cleanId.split("/").map(function (part) { return encodeURIComponent(part); }).join("/");
  }
  function cloudinaryUploadTimeoutMs(blob, type, options) {
    const configured = Number(options && options.timeoutMs) || Number(window.emyCloudinaryUploadTimeoutMs);
    if (Number.isFinite(configured) && configured > 0) return Math.max(30000, Math.round(configured));
    const bytes = blob && Number(blob.size) ? Number(blob.size) : 0;
    const megabytes = bytes > 0 ? bytes / 1048576 : 0;
    const isVideo = type === "video";
    const base = isVideo ? 60000 : 35000;
    const perMegabyte = isVideo ? 2500 : 900;
    const cap = isVideo ? 180000 : 90000;
    return Math.min(cap, Math.max(base, Math.round(base + (megabytes * perMegabyte))));
  }
  async function uploadToCloudinary(value, options) {
    const sourceBlob = typeof Blob !== "undefined" && value instanceof Blob ? value : null;
    const source = sourceBlob ? "" : String(value || "").trim();
    if (!sourceBlob && (!source || !/^data:/i.test(source))) return null;
    const type = sourceBlob ? blobUploadType(sourceBlob, options) : dataUrlType(source, options);
    const form = new FormData();
    if (sourceBlob) form.append("file", sourceBlob, clean(options && options.name) || sourceBlob.name || (type === "video" ? "emy-upload.webm" : "emy-upload.jpg"));
    else form.append("file", source);
    form.append("upload_preset", cloudinary.uploadPreset);
    form.append("folder", clean(options && options.folder) || "emy");
    form.append("tags", ["emy", clean(options && options.role), clean(options && options.kind)].filter(Boolean).join(","));
    const url = "https://api.cloudinary.com/v1_1/" + encodeURIComponent(cloudinary.cloudName) + "/" + type + "/upload";
    const hasProgress = options && typeof options.onProgress === "function";
    const timeoutMs = cloudinaryUploadTimeoutMs(sourceBlob, type, options);
    notifyCloudinaryUploadProgress(options, 1, { phase: "starting", loaded: 0, total: sourceBlob && sourceBlob.size || 0 });
    if (hasProgress && typeof XMLHttpRequest !== "undefined") {
      return await new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.timeout = timeoutMs;
        request.upload.onloadstart = function () {
          notifyCloudinaryUploadProgress(options, 3, { phase: "connecting", loaded: 0, total: sourceBlob && sourceBlob.size || 0 });
        };
        request.upload.onprogress = function (event) {
          if (event && event.lengthComputable && event.total) {
            const percent = Math.max(1, Math.min(98, Math.round((event.loaded / event.total) * 98)));
            notifyCloudinaryUploadProgress(options, percent, { phase: "uploading", loaded: event.loaded, total: event.total });
          }
        };
        request.onload = function () {
          let data = {};
          try { data = JSON.parse(request.responseText || "{}"); } catch (error) { data = {}; }
          if (request.status < 200 || request.status >= 300 || data.error) {
            reject(new Error(data && data.error && data.error.message || "Media upload failed."));
            return;
          }
          notifyCloudinaryUploadProgress(options, 100, { phase: "complete" });
          resolve(cloudinaryUploadResult(data, type));
        };
        request.onerror = function () { reject(new Error("Media upload failed.")); };
        request.ontimeout = function () { reject(new Error("Media upload timed out. Check your connection and try again.")); };
        request.onabort = function () { reject(new Error("Media upload was cancelled.")); };
        notifyCloudinaryUploadProgress(options, 2, { phase: "sending", loaded: 0, total: sourceBlob && sourceBlob.size || 0 });
        request.send(form);
      });
    }
    let timeoutId = 0;
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    if (controller) {
      timeoutId = window.setTimeout(function () {
        try { controller.abort(); } catch (error) {}
      }, timeoutMs);
    }
    notifyCloudinaryUploadProgress(options, 4, { phase: "sending", loaded: 0, total: sourceBlob && sourceBlob.size || 0 });
    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        body: form,
        signal: controller ? controller.signal : undefined
      });
    } catch (error) {
      if (error && error.name === "AbortError") throw new Error("Media upload timed out. Check your connection and try again.");
      throw error;
    } finally {
      if (timeoutId) window.clearTimeout(timeoutId);
    }
    const data = await response.json().catch(function () { return {}; });
    if (!response.ok || data.error) {
      throw new Error(data && data.error && data.error.message || "Media upload failed.");
    }
    notifyCloudinaryUploadProgress(options, 100, { phase: "complete" });
    return cloudinaryUploadResult(data, type);
  }
  async function resolveMediaValue(src, ref) {
    const direct = clean(src);
    if (/^data:/i.test(direct)) return direct;
    if (/^https?:\/\//i.test(direct)) return direct;
    const mediaRef = clean(ref);
    if (mediaRef && window.emyResolveFeedMedia) {
      try {
        const record = await window.emyResolveFeedMedia(mediaRef);
        if (record && record.url) return record.url;
        if (record && record.blob) {
          return await new Promise(function (resolve) {
            const reader = new FileReader();
            reader.addEventListener("load", function () { resolve(String(reader.result || "")); }, { once: true });
            reader.addEventListener("error", function () { resolve(""); }, { once: true });
            reader.readAsDataURL(record.blob);
          });
        }
      } catch (error) {}
    }
    return direct;
  }
  async function uploadResolvedMedia(src, ref, options) {
    if (typeof Blob !== "undefined" && src instanceof Blob) return uploadToCloudinary(src, options);
    const mediaRef = clean(ref);
    if (mediaRef && window.emyResolveFeedMedia) {
      try {
        const record = await window.emyResolveFeedMedia(mediaRef);
        if (record && record.blob) return uploadToCloudinary(record.blob, Object.assign({}, options || {}, { name: record.name || options && options.name || "" }));
      } catch (error) {}
    }
    if (mediaRef && !looksBrowserOnlyMediaRef(mediaRef)) {
      const resourceType = dataUrlType(src, options);
      const url = cloudinaryMediaUrl(mediaRef, resourceType);
      if (url) return { url: url, publicId: mediaRef, resourceType: resourceType };
    }
    const value = await resolveMediaValue(src, ref);
    if (/^https?:\/\//i.test(value)) return { url: value, publicId: mediaRef && !looksBrowserOnlyMediaRef(mediaRef) ? mediaRef : "", resourceType: dataUrlType(value, options) };
    return uploadToCloudinary(value, options);
  }
  function mediaObjectSource(item) {
    return clean(item && (item.src || item.mediaSrc || item.url || item.dataUrl));
  }
  function mediaObjectRef(item) {
    return clean(item && (item.ref || item.mediaRef || item.coverRef || item.imageRef || item.videoRef));
  }
  function mediaPosterSource(item) {
    return clean(item && (item.posterSrc || item.thumbnailSrc || item.poster || item.thumbnail));
  }
  function mediaPosterRef(item) {
    return clean(item && (item.posterRef || item.thumbnailRef));
  }
  function mediaNeedsCloudUpload(src, ref) {
    const direct = clean(src);
    if (/^(data:|blob:)/i.test(direct)) return true;
    return !!clean(ref);
  }
  function stripBrowserOnlyMediaStrings(value) {
    if (typeof value === "string") return /^(data:|blob:)/i.test(value.trim()) ? "" : value;
    if (Array.isArray(value)) return value.map(stripBrowserOnlyMediaStrings);
    if (!value || typeof value !== "object") return value;
    const ctorName = value.constructor && value.constructor.name ? String(value.constructor.name) : "";
    if (/FieldValue|Timestamp|GeoPoint|DocumentReference/i.test(ctorName)) return value;
    const copy = {};
    Object.keys(value).forEach(function (key) {
      copy[key] = stripBrowserOnlyMediaStrings(value[key]);
    });
    return copy;
  }
  function cleanUploadedMediaObject(item) {
    const copy = Object.assign({}, item || {});
    ["dataUrl", "coverRef", "imageRef", "videoRef"].forEach(function (key) { delete copy[key]; });
    ["src", "mediaSrc", "url", "posterSrc", "thumbnailSrc", "poster", "thumbnail"].forEach(function (key) {
      if (/^(data:|blob:)/i.test(clean(copy[key]))) delete copy[key];
    });
    return copy;
  }
  async function uploadBusinessMediaObject(item, options) {
    if (!item || typeof item !== "object") return item;
    const copy = Object.assign({}, item);
    const source = mediaObjectSource(copy);
    const ref = mediaObjectRef(copy);
    if (mediaNeedsCloudUpload(source, ref)) {
      const upload = await uploadResolvedMedia(source, ref, options);
      if (!upload || !upload.url) throw new Error("EMY could not upload this business media.");
      copy.src = upload.url;
      copy.mediaSrc = upload.url;
      copy.url = upload.url;
      copy.ref = "";
      copy.mediaRef = "";
      copy.cloudinaryPublicId = upload.publicId;
      copy.cloudinaryResourceType = upload.resourceType;
      copy.cloudinaryBytes = upload.bytes || copy.cloudinaryBytes || 0;
      copy.cloudinaryDuration = upload.duration || copy.cloudinaryDuration || 0;
    } else if (/^https?:\/\//i.test(source)) {
      copy.src = source;
      copy.mediaSrc = copy.mediaSrc || source;
      copy.url = copy.url || source;
    }
    const posterSource = mediaPosterSource(copy);
    const posterRef = mediaPosterRef(copy);
    if (mediaNeedsCloudUpload(posterSource, posterRef)) {
      try {
        const posterUpload = await uploadResolvedMedia(posterSource, posterRef, Object.assign({}, options || {}, { kind: "poster", name: "video-poster.jpg" }));
        if (posterUpload && posterUpload.url) {
          copy.posterSrc = posterUpload.url;
          copy.thumbnailSrc = posterUpload.url;
          copy.posterRef = "";
          copy.thumbnailRef = "";
          copy.cloudinaryPosterPublicId = posterUpload.publicId;
        }
      } catch (error) {
        copy.posterSrc = "";
        copy.thumbnailSrc = "";
        copy.posterRef = "";
        copy.thumbnailRef = "";
      }
    }
    return cleanUploadedMediaObject(copy);
  }
  async function mergeDoc(path, data) {
    const ctx = requireReady();
    const payload = Object.assign({}, data || {}, { updatedAt: serverTimestamp() });
    return ctx.db.doc(path).set(payload, { merge: true });
  }
  async function callVerificationFunction(name, payload) {
    const ctx = requireReady();
    if (!ctx.functions || !ctx.functions.httpsCallable) {
      throw new Error("Firebase Functions did not load. Refresh and try again.");
    }
    const callable = ctx.functions.httpsCallable(name);
    const result = await callable(payload || {});
    return result && result.data ? result.data : {};
  }
  async function requestVerificationCode(channel, input) {
    const nextChannel = clean(channel).toLowerCase() === "phone" ? "phone" : "email";
    const payload = Object.assign({}, input || {}, {
      role: roleValue(input && input.role || localStorage.getItem("emyMainPendingSignupRole") || localStorage.getItem("emyMainSignedInRole")),
      phone: clean(input && input.phone) || localStorage.getItem("emyMainPendingSignupPhone") || localStorage.getItem("emyCustomerPhone") || ""
    });
    const functionName = nextChannel === "phone" ? "sendPhoneVerificationCode" : "sendEmailVerificationCode";
    return callVerificationFunction(functionName, payload);
  }
  async function confirmVerificationCode(code, role, channel) {
    const nextChannel = clean(channel).toLowerCase() === "phone" ? "phone" : "email";
    const functionName = nextChannel === "phone" ? "confirmPhoneVerificationCode" : "confirmEmailVerificationCode";
    const result = await callVerificationFunction(functionName, {
      code: clean(code).replace(/\D/g, ""),
      role: roleValue(role)
    });
    if (!result || !result.verified) return { emailVerified: false, accountVerified: false };
    return completeEmailVerification(role);
  }
  async function hydrateLocalProfile(user, role) {
    const ctx = requireReady();
    const nextRole = roleValue(role);
    updateUserLocals(user, nextRole);
    const docPath = nextRole === "business" ? "businessProfiles/" + user.uid : "customerProfiles/" + user.uid;
    const snap = await ctx.db.doc(docPath).get().catch(function () { return null; });
    const profileExists = !!(snap && snap.exists);
    const data = snap && snap.exists ? (snap.data() || {}) : {};
    if (nextRole === "customer") {
      setLocal("emyCustomerFirstName", data.firstName || "");
      setLocal("emyCustomerLastName", data.lastName || "");
      setLocal("emyCustomerDisplayName", data.displayName || profileName(data));
      setLocal("emyCustomerEmail", data.email || user.email || "");
      setLocal("emyCustomerProfileVisibility", data.visibility || data.privacy || "");
      const customerPhotoFallback = profileExists ? [] : [localStorage.getItem("emyCustomerProfilePhoto"), localStorage.getItem("emyCustomerProfilePhotoSrc"), localStorage.getItem("emyCustomerProfileImage"), localStorage.getItem("emyCustomerProfileImageSrc"), localStorage.getItem("emyCustomerAvatar"), localStorage.getItem("emyCustomerAvatarSrc"), localStorage.getItem("emyCustomerPhoto"), localStorage.getItem("emyCustomerPhotoSrc")];
      const customerPhotoRefFallback = profileExists ? [] : [localStorage.getItem("emyCustomerProfilePhotoRef"), localStorage.getItem("emyCustomerProfileImageRef"), localStorage.getItem("emyCustomerAvatarRef"), localStorage.getItem("emyCustomerPhotoRef")];
      const customerPhoto = firstCleanValue([data.photoUrl, data.photo, data.profilePhoto, data.profilePhotoSrc, data.profileImage, data.profileImageSrc, data.avatar, data.avatarSrc, data.image, data.imageSrc, user.photoURL].concat(customerPhotoFallback));
      const customerPhotoRef = firstCleanValue([data.photoPublicId, data.photoRef, data.profilePhotoRef, data.profileImageRef, data.avatarRef, data.imageRef].concat(customerPhotoRefFallback));
      if (customerPhoto || customerPhotoRef) setCustomerProfilePhotoLocals(customerPhoto, customerPhotoRef);
      else if (profileExists) clearCustomerProfilePhotoLocals();
      if (data.photoCrop) setLocalJson("emyCustomerProfilePhotoCrop", data.photoCrop);
    } else {
      const businessName = clean(data.businessName || data.name || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName"));
      setLocal("emyBusinessName", businessName);
      setLocal("emyBusinessDisplayName", businessName);
      setLocal("emyBusinessProfilePhoto", data.photoUrl || data.photo || "");
      setLocal("emyBusinessProfilePhotoSrc", data.photoUrl || data.photo || "");
      setLocal("emyBusinessProfilePhotoRef", data.photoPublicId || data.photoRef || "");
      setLocal("emyBusinessReviewStatus", data.reviewStatus || data.status || "");
      if (Object.keys(data).length) setLocalJson("emyBusinessProfileDraft", data);
    }
    return data;
  }
  async function registerAccount(input) {
    const ctx = requireReady();
    const role = roleValue(input && input.role);
    const email = cleanEmail(input && input.email);
    const password = String(input && input.password || "");
    const displayName = profileName(input);
    const credential = await ctx.auth.createUserWithEmailAndPassword(email, password);
    const user = credential.user;
    if (user.updateProfile) await user.updateProfile({ displayName: displayName }).catch(function () {});
    const folder = "emy/" + role + "-profiles/" + user.uid;
    let upload = null;
    try {
      upload = await uploadResolvedMedia(input && (input.photoBlob || input.photoFile || input.photoDataUrl), input && input.photoRef, { role: role, kind: "profile", folder: folder, name: "profile-photo.jpg" });
    } catch (error) {
      console.warn("[EMY real backend] profile media upload skipped", error);
    }
    const baseUser = {
      uid: user.uid,
      email: email,
      displayName: displayName,
      activeRole: role,
      roles: role === "business" ? { business: true } : { customer: true },
      isAdmin: email === adminEmail,
      emailVerified: !!user.emailVerified,
      provider: "password",
      createdAt: serverTimestamp()
    };
    await mergeDoc("users/" + user.uid, baseUser);
    if (role === "customer") {
      const profile = {
        uid: user.uid,
        email: email,
        firstName: clean(input && input.firstName),
        lastName: clean(input && input.lastName),
        displayName: displayName,
        phone: clean(input && input.phone),
        privacy: clean(input && input.privacy) || "private",
        visibility: clean(input && input.privacy) || "private",
        photoUrl: upload && upload.url || "",
        photoPublicId: upload && upload.publicId || "",
        photoCrop: input && input.photoCrop || null,
        emailVerified: !!user.emailVerified,
        createdAt: serverTimestamp()
      };
      await mergeDoc("customerProfiles/" + user.uid, profile);
      setLocal("emyCustomerFirstName", profile.firstName);
      setLocal("emyCustomerLastName", profile.lastName);
      setLocal("emyCustomerDisplayName", profile.displayName);
      setLocal("emyCustomerEmail", email);
      setLocal("emyCustomerProfileVisibility", profile.visibility);
      setCustomerProfilePhotoLocals(profile.photoUrl, profile.photoPublicId);
    } else {
      await mergeDoc("businessAccounts/" + user.uid, {
        uid: user.uid,
        ownerUserId: user.uid,
        ownerEmail: email,
        ownerName: displayName,
        phone: clean(input && input.phone),
        businessPhone: clean(input && input.phone),
        emailVerified: !!user.emailVerified,
        profileComplete: false,
        status: "email-verification-required",
        reviewStatus: "draft",
        createdAt: serverTimestamp()
      });
    }
    updateUserLocals(user, role);
    setLocal("emyMainPendingSignupRole", role);
    setLocal("emyMainPendingSignupFirstName", clean(input && input.firstName));
    setLocal("emyMainPendingSignupLastName", clean(input && input.lastName));
    setLocal("emyMainPendingSignupEmail", email);
    setLocal("emyMainPendingSignupPhone", clean(input && input.phone));
    setLocal("emyMainPendingSignupPrivacy", clean(input && input.privacy));
    let codeDelivery = null;
    try {
      codeDelivery = await requestVerificationCode("email", { role: role, phone: clean(input && input.phone) });
      setLocal("emyMainPendingVerificationChannel", "email");
      setLocal("emyMainPendingVerificationTarget", codeDelivery && codeDelivery.target || email);
      setLocal("emyMainPendingVerificationDeliveryError", "");
    } catch (error) {
      codeDelivery = { sent: false, error: publicError(error), code: clean(error && error.code) };
      setLocal("emyMainPendingVerificationDeliveryError", codeDelivery.error);
      try { console.warn("[EMY real backend] verification code delivery failed", error); } catch (logError) {}
    }
    if (upload && upload.url && role === "customer") {
      setLocal("emyMainPendingSignupPhoto", upload.url);
      setLocal("emyMainPendingSignupPhotoSrc", upload.url);
      setLocal("emyMainPendingSignupPhotoRef", upload.publicId);
    }
    return { user: user, uid: user.uid, email: email, emailVerified: !!user.emailVerified, photoUrl: upload && upload.url || "", photoPublicId: upload && upload.publicId || "", codeDelivery: codeDelivery };
  }
  async function signIn(emailValue, password, role) {
    const ctx = requireReady();
    const credential = await ctx.auth.signInWithEmailAndPassword(cleanEmail(emailValue), String(password || ""));
    const user = credential.user;
    await user.reload().catch(function () {});
    const freshUser = ctx.auth.currentUser || user;
    await mergeDoc("users/" + freshUser.uid, {
      uid: freshUser.uid,
      email: freshUser.email || cleanEmail(emailValue),
      activeRole: roleValue(role),
      emailVerified: !!freshUser.emailVerified,
      isAdmin: cleanEmail(freshUser.email) === adminEmail,
      lastLoginAt: serverTimestamp()
    });
    if (!freshUser.emailVerified) {
      setLocal("emyMainPendingSignupRole", roleValue(role));
      setLocal("emyMainPendingSignupEmail", freshUser.email || cleanEmail(emailValue));
      await requestVerificationCode("email", { role: roleValue(role) }).catch(function (error) {
        setLocal("emyMainPendingVerificationDeliveryError", publicError(error));
      });
      return { user: freshUser, uid: freshUser.uid, emailVerified: false, needsVerification: true };
    }
    await hydrateLocalProfile(freshUser, role);
    return { user: freshUser, uid: freshUser.uid, emailVerified: true, needsVerification: false };
  }
  async function completeEmailVerification(role) {
    const ctx = requireReady();
    const user = ctx.auth.currentUser;
    if (!user) throw new Error("Please sign in again so EMY can check your Firebase email verification.");
    await user.reload();
    const freshUser = ctx.auth.currentUser || user;
    await mergeDoc("users/" + freshUser.uid, {
      uid: freshUser.uid,
      email: freshUser.email || "",
      emailVerified: !!freshUser.emailVerified,
      activeRole: roleValue(role),
      isAdmin: cleanEmail(freshUser.email) === adminEmail,
      verifiedCheckedAt: serverTimestamp()
    });
    if (!freshUser.emailVerified) return { emailVerified: false };
    updateUserLocals(freshUser, role);
    if (roleValue(role) === "business") {
      await mergeDoc("businessAccounts/" + freshUser.uid, {
        uid: freshUser.uid,
        ownerUserId: freshUser.uid,
        ownerEmail: freshUser.email || "",
        emailVerified: true,
        status: "profile-required",
        reviewStatus: "draft"
      });
    } else {
      const pending = localPendingProfile();
      await mergeDoc("customerProfiles/" + freshUser.uid, {
        uid: freshUser.uid,
        email: freshUser.email || pending.email,
        firstName: pending.firstName,
        lastName: pending.lastName,
        displayName: profileName(pending),
        phone: pending.phone,
        privacy: pending.privacy || "private",
        visibility: pending.privacy || "private",
        emailVerified: true
      });
    }
    return { emailVerified: true };
  }
  async function updateCustomerProfilePhoto(input) {
    const ctx = requireReady();
    const user = ctx.auth.currentUser;
    if (!user) throw new Error("Please sign in so EMY can save this profile image to your account.");
    await user.reload().catch(function () {});
    const freshUser = ctx.auth.currentUser || user;
    const source = input && (input.photoBlob || input.photoFile || input.photoDataUrl || input.photo || input.profilePhoto || input.photoUrl || input.profilePhotoUrl);
    const sourceRef = input && (input.photoRef || input.profilePhotoRef || input.photoPublicId || input.profilePhotoPublicId);
    const remove = !!(input && input.remove);
    const crop = input && input.photoCrop || null;
    let upload = null;
    if (!remove) {
      try {
        upload = await uploadResolvedMedia(source, sourceRef, {
          role: "customer",
          kind: "profile",
          folder: "emy/customer-profiles/" + freshUser.uid,
          name: "profile-photo.jpg"
        });
      } catch (error) {
        throw new Error("EMY could not upload the customer profile image. Check your connection, then try again.");
      }
      if (!upload || !upload.url) throw new Error("EMY could not upload the customer profile image. Check your connection, then try again.");
    }
    const photoUrl = upload && upload.url || "";
    const photoPublicId = upload && upload.publicId || "";
    const displayName = clean(input && input.displayName) || clean(localStorage.getItem("emyCustomerDisplayName")) || clean(freshUser.displayName) || "";
    const customerProfile = {
      uid: freshUser.uid,
      email: freshUser.email || clean(localStorage.getItem("emyCustomerEmail") || localStorage.getItem("emyMainSignedInEmail")),
      displayName: displayName,
      photoUrl: photoUrl,
      photo: photoUrl,
      profilePhoto: photoUrl,
      profileImage: photoUrl,
      avatar: photoUrl,
      photoPublicId: photoPublicId,
      photoRef: photoPublicId,
      profilePhotoRef: photoPublicId,
      profileImageRef: photoPublicId,
      avatarRef: photoPublicId,
      photoCrop: remove ? null : crop,
      updatedAt: serverTimestamp()
    };
    await mergeDoc("customerProfiles/" + freshUser.uid, customerProfile);
    await mergeDoc("users/" + freshUser.uid, {
      uid: freshUser.uid,
      email: freshUser.email || "",
      displayName: displayName,
      photoUrl: photoUrl,
      photoPublicId: photoPublicId
    });
    if (freshUser.updateProfile) await freshUser.updateProfile({ photoURL: photoUrl }).catch(function () {});
    if (remove) {
      clearCustomerProfilePhotoLocals();
    } else {
      setCustomerProfilePhotoLocals(photoUrl, photoPublicId);
      if (crop) setLocalJson("emyCustomerProfilePhotoCrop", crop);
    }
    const localProfile = Object.assign({}, readLocalJson("emyCustomerProfile", {}), customerProfile, {
      updatedAt: nowIso()
    });
    setLocalJson("emyCustomerProfile", localProfile);
    setLocalJson("emyCurrentCustomerProfile", localProfile);
    setLocalJson("emyFirebaseCustomerProfile", localProfile);
    return localProfile;
  }
  async function sendPasswordReset(emailValue) {
    const ctx = requireReady();
    await ctx.auth.sendPasswordResetEmail(cleanEmail(emailValue));
    return true;
  }
  async function resendVerification() {
    return requestVerificationCode(arguments.length ? arguments[0] : "email", arguments.length > 1 ? arguments[1] : {});
  }
  async function resendFirebaseLinkFallback() {
    const user = activeUser();
    if (!user) throw new Error("Please sign in again so EMY can resend the verification email.");
    await user.sendEmailVerification();
    return true;
  }
  async function signOut() {
    const ctx = requireReady();
    await ctx.auth.signOut();
    setLocal("emyMainSignedOut", "1");
    setLocal("emyMainSignedInRole", "");
    setLocal("emyMainSignedInEmail", "");
    setLocal("emyFirebaseUid", "");
  }
  async function submitBusinessProfile(profileInput) {
    const ctx = requireReady();
    const user = ctx.auth.currentUser;
    if (!user) throw new Error("Please sign in to a real EMY account before submitting this business registration.");
    await user.reload();
    const freshUser = ctx.auth.currentUser || user;
    if (!freshUser.emailVerified) throw new Error("Please verify your email before submitting the business profile for review.");
    const profile = Object.assign({}, profileInput || {});
    async function readExistingBusinessDoc(path) {
      try {
        const snapshot = await ctx.db.doc(path).get();
        return snapshot && snapshot.exists ? (snapshot.data() || {}) : {};
      } catch (error) {
        return {};
      }
    }
    const existingProfile = await readExistingBusinessDoc("businessProfiles/" + freshUser.uid);
    const existingAccount = await readExistingBusinessDoc("businessAccounts/" + freshUser.uid);
    const existingApproval = await readExistingBusinessDoc("businessApprovals/" + freshUser.uid);
    function cleanBusinessStatus(value) {
      return clean(value).toLowerCase();
    }
    function hasApprovedBusinessState() {
      const statuses = [
        profile.status,
        profile.reviewStatus,
        existingProfile.status,
        existingProfile.reviewStatus,
        existingAccount.status,
        existingAccount.reviewStatus,
        existingApproval.status,
        existingApproval.reviewStatus,
        localStorage.getItem("emyBusinessReviewStatus")
      ].map(cleanBusinessStatus).filter(Boolean);
      const approvedAt = clean(profile.approvedAt || existingProfile.approvedAt || existingAccount.approvedAt || existingApproval.approvedAt || localStorage.getItem("emyBusinessApprovedAt"));
      return !!approvedAt || statuses.some(function (status) { return status === "approved" || status === "active" || status === "live"; });
    }
    const folder = "emy/business-profiles/" + freshUser.uid;
    let photoUpload = null;
    try {
      photoUpload = await uploadResolvedMedia(profile.photo || profile.profilePhoto || profile.photoUrl || profile.profilePhotoUrl, profile.photoRef || profile.profilePhotoRef || profile.photoPublicId, { role: "business", kind: "profile", folder: folder });
    } catch (error) {
      throw new Error("EMY could not upload the business profile image. Check your connection, then try again.");
    }
    if (!photoUpload || !photoUpload.url) {
      throw new Error("EMY could not upload the business profile image. Check your connection, then try again.");
    }
    if (photoUpload && photoUpload.url) {
      profile.photo = photoUpload.url;
      profile.profilePhoto = photoUpload.url;
      profile.photoRef = "";
      profile.profilePhotoRef = "";
      profile.photoUrl = photoUpload.url;
      profile.photoPublicId = photoUpload.publicId;
    }
    if (profile.heroCoverMedia && typeof profile.heroCoverMedia === "object") {
      try {
        profile.heroCoverMedia = await uploadBusinessMediaObject(profile.heroCoverMedia, { role: "business", kind: "cover", folder: folder + "/covers", name: "business-cover" });
      } catch (error) {
        throw new Error("EMY could not upload the business cover image or video. Try again with a shorter video or smaller image.");
      }
    }
    if (Array.isArray(profile.coverMedia)) {
      const uploadedCoverMedia = [];
      for (let index = 0; index < profile.coverMedia.length; index += 1) {
        try {
          uploadedCoverMedia.push(await uploadBusinessMediaObject(profile.coverMedia[index], { role: "business", kind: "library", folder: folder + "/library", name: "business-media-" + (index + 1) }));
        } catch (error) {
          throw new Error("EMY could not upload one of the business library images or videos. Try again with a shorter video or smaller image.");
        }
      }
      profile.coverMedia = uploadedCoverMedia;
    }
    profile.coverMediaCrop = Array.isArray(profile.coverMediaCrop) ? stripBrowserOnlyMediaStrings(profile.coverMediaCrop) : profile.coverMediaCrop;
    const businessName = clean(profile.businessName || profile.name || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName")) || "Your business";
    const stableKeySource = clean(profile.businessKey || profile.key || existingProfile.businessKey || existingProfile.key || existingAccount.businessKey || existingApproval.businessKey || localStorage.getItem("emyBusinessReviewBusinessKey") || localStorage.getItem("emyBusinessProfileKey") || localStorage.getItem("emyBusinessKey"));
    const key = clean(stableKeySource || businessName).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || freshUser.uid;
    const existingApproved = hasApprovedBusinessState();
    const reviewStatus = existingApproved ? "approved" : "under-review";
    const submittedAt = existingApproved
      ? (profile.submittedAt || existingProfile.submittedAt || existingAccount.submittedAt || existingApproval.submittedAt || nowIso())
      : (profile.submittedAt || nowIso());
    const approvedAt = existingApproved ? clean(profile.approvedAt || existingProfile.approvedAt || existingAccount.approvedAt || existingApproval.approvedAt || localStorage.getItem("emyBusinessApprovedAt") || nowIso()) : "";
    const saved = Object.assign({}, stripBrowserOnlyMediaStrings(profile), {
      uid: freshUser.uid,
      ownerUserId: freshUser.uid,
      ownerEmail: freshUser.email || "",
      businessName: businessName,
      name: businessName,
      businessKey: key,
      key: key,
      emailVerified: true,
      status: reviewStatus,
      reviewStatus: reviewStatus,
      submittedAt: submittedAt,
      approvedAt: approvedAt,
      updatedAt: serverTimestamp()
    });
    await ctx.db.doc("businessProfiles/" + freshUser.uid).set(saved, { merge: true });
    await mergeDoc("businessAccounts/" + freshUser.uid, {
      uid: freshUser.uid,
      ownerUserId: freshUser.uid,
      ownerEmail: freshUser.email || "",
      businessName: businessName,
      businessKey: key,
      emailVerified: true,
      profileComplete: true,
      status: reviewStatus,
      reviewStatus: reviewStatus,
      submittedAt: saved.submittedAt,
      approvedAt: approvedAt
    });
    await ctx.db.doc("businessApprovals/" + freshUser.uid).set({
      uid: freshUser.uid,
      businessKey: key,
      businessName: businessName,
      ownerEmail: freshUser.email || "",
      status: reviewStatus,
      reviewStatus: reviewStatus,
      adminEmail: adminEmail,
      submittedAt: saved.submittedAt,
      approvedAt: approvedAt,
      updatedAt: serverTimestamp()
    }, { merge: true });
    await ctx.db.collection("businessAnalytics").doc(key).set({
      businessKey: key,
      businessName: businessName,
      ownerUserId: freshUser.uid,
      ownerEmail: freshUser.email || "",
      updatedAt: serverTimestamp(),
      updatedAtIso: nowIso()
    }, { merge: true });
    setLocal("emyBusinessProfilePhoto", saved.photoUrl || saved.photo || "");
    setLocal("emyBusinessProfilePhotoSrc", saved.photoUrl || saved.photo || "");
    setLocal("emyBusinessProfilePhotoRef", saved.photoPublicId || "");
    setLocal("emyBusinessReviewBusinessKey", key);
    setLocal("emyBusinessReviewStatus", reviewStatus);
    setLocal("emyBusinessReviewSubmittedAt", saved.submittedAt);
    if (existingApproved) {
      setLocal("emyBusinessApprovedAt", approvedAt);
      setLocal("emyBusinessRejectedAt", "");
    }
    setLocalJson("emyBusinessProfileDraft", saved);
    return saved;
  }
  function publicBusinessProfileIsLive(profile) {
    const statusText = clean([
      profile && profile.status,
      profile && profile.reviewStatus,
      profile && profile.visibility,
      profile && profile.publicStatus
    ].filter(Boolean).join(" ")).toLowerCase();
    if (profile && profile.hidden === true || profile && profile.deleted === true || profile && profile.deletedAt) return false;
    return /\b(approved|active|live|public)\b/.test(statusText);
  }
  function businessSlug(value, fallback) {
    return clean(value || fallback || "business").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || clean(fallback) || "business";
  }
  function normalisePublicBusinessProfile(profile, id) {
    const source = profile && typeof profile === "object" ? profile : {};
    const businessName = clean(source.businessName || source.name || source.title || source.displayName || "Business");
    const key = businessSlug(source.businessKey || source.key || source.slug || businessName, id);
    const photo = clean(source.photoUrl || source.photo || source.profilePhoto || source.profilePhotoUrl || source.businessPhoto || source.businessPhotoSrc);
    const photoRef = clean(source.photoPublicId || source.photoRef || source.profilePhotoRef || source.businessPhotoRef);
    const hero = source.heroCoverMedia && typeof source.heroCoverMedia === "object" ? source.heroCoverMedia : null;
    return Object.assign({}, source, {
      id: id || source.uid || key,
      uid: source.uid || id || "",
      key: key,
      businessKey: key,
      name: businessName,
      businessName: businessName,
      photo: photo,
      photoUrl: photo,
      profilePhoto: photo,
      photoSrc: photo,
      photoRef: photoRef,
      profilePhotoRef: photoRef,
      photoPublicId: clean(source.photoPublicId || photoRef),
      cover: hero || source.cover || source.heroCover || null,
      category: clean(source.businessCategory || source.category || source.primarySector || source.sector || source.type),
      location: clean(source.businessLocation || source.location || source.address || source.businessAddress || source.city || source.businessCity),
      address: clean(source.businessAddress || source.address || source.businessAddressLine1),
      postcode: clean(source.businessPostcode || source.postcode),
      latitude: clean(source.businessLatitude || source.latitude || source.lat),
      longitude: clean(source.businessLongitude || source.longitude || source.lng || source.lon),
      description: clean(source.businessDescription || source.description || source.businessAbout || source.about || source.businessBio || source.bio || source.summary),
      explicitBusinessProfile: true,
      isBusinessProfile: true,
      profileType: "business",
      source: "firebase"
    });
  }
  function savePublicBusinessProfiles(rows) {
    const list = Array.isArray(rows) ? rows.filter(function (row) { return row && row.name; }) : [];
    setLocalJson("emyRealPublicBusinessProfiles", list);
    setLocalJson("emyBusinessProfiles", list);
    setLocalJson("emyBusinessDirectory", list);
    setLocalJson("emyNearbyBusinesses", list);
    setLocal("emyRealBackendProfilesSyncedAt", nowIso());
    try {
      window.dispatchEvent(new CustomEvent("emy:real-business-profiles-synced", { detail: { rows: list } }));
    } catch (error) {}
    return list;
  }
  const cloudPublicContentKeys = [
    "emyFeedCreatedPosts",
    "emyFeedCreatedProducts",
    "emyFeedCreatedClips",
    "emyFeedCreatedArticles",
    "emyBusinessPosts",
    "emyBusinessFeedPosts",
    "emyBusinessProducts",
    "emyBusinessProductList",
    "emyBusinessProductPosts",
    "emyBusinessClips",
    "emyBusinessReels",
    "emyBusinessProductReels",
    "emyFeedCreatedEvents",
    "emyBusinessEvents",
    "emyBusinessEventPosts",
    "emyFeedCreatedJobs",
    "emyBusinessJobs",
    "emyBusinessJobPosts",
    "emyBusinessArticles",
    "emyBusinessArticlePosts"
  ];
  const cloudStatKeys = [
    "emyProductViewStats",
    "emyPostViewStats",
    "emyClipViewStats",
    "emyBusinessProfileViewStats",
    "emyBusinessDirectionStats"
  ];
  const cloudLocalOnlyKeys = [
    "emyCloudStorageManifest",
    "emyCloudStorageStatus",
    "emyCloudStorageLastSyncAt",
    "emyRealBackend",
    "emyFirebaseProjectId",
    "emyFirebaseUid",
    "emyMainSignedOut",
    "emyMainSignedInRole",
    "emyMainSignedInEmail",
    "emyMainPendingSignupPassword",
    "emyMainPendingVerificationTarget",
    "emyMainPendingVerificationChannel",
    "emyMainPendingVerificationDeliveryError",
    "emyMainConfirmationCompleted",
    "emyTestModeEnabled",
    "emyLocalDevAccess",
    "emyRealPublicBusinessProfiles",
    "emyBusinessProfiles",
    "emyBusinessDirectory",
    "emyNearbyBusinesses",
    "emyCustomerProfile",
    "emyCustomerProfileDraft",
    "emyCustomerProfileData",
    "emyCurrentCustomerProfile",
    "emyFirebaseCustomerProfile",
    "emyCustomerAccount",
    "emyCustomerFirstName",
    "emyCustomerLastName",
    "emyCustomerDisplayName",
    "emyCustomerEmail",
    "emyCustomerProfileVisibility",
    "emyBusinessProfileDraft",
    "emyBusinessName",
    "emyBusinessDisplayName",
    "emyBusinessReviewBusinessKey",
    "emyBusinessReviewStatus",
    "emyBusinessReviewSubmittedAt",
    "emyBusinessApprovedAt",
    "emyBusinessAskLocation",
    "emyBusinessWorkingDays",
    "emyBusinessWorkingDaysSchedule",
    "emyBusinessLocation",
    "emyBusinessLocationLabel",
    "emyCustomerProfilePhoto",
    "emyCustomerProfilePhotoSrc",
    "emyCustomerProfilePhotoBackup",
    "emyCustomerProfilePhotoSrcBackup",
    "emyCustomerProfilePhotoRef",
    "emyCustomerProfilePhotoRefBackup",
    "emyCustomerProfilePhotoCrop",
    "emyCustomerProfileImage",
    "emyCustomerProfileImageSrc",
    "emyCustomerProfileImageRef",
    "emyCustomerAvatar",
    "emyCustomerAvatarSrc",
    "emyCustomerAvatarRef",
    "emyCustomerPhoto",
    "emyCustomerPhotoSrc",
    "emyCustomerPhotoRef",
    "emyBusinessProfilePhoto",
    "emyBusinessProfilePhotoSrc",
    "emyBusinessProfilePhotoBackup",
    "emyBusinessProfilePhotoSrcBackup",
    "emyBusinessProfilePhotoRef",
    "emyBusinessProfilePhotoRefBackup",
    "emyBusinessProfilePhotoCrop",
    "emyBusinessProfileCrop",
    "emyBusinessProfileImage",
    "emyBusinessProfileImageSrc",
    "emyBusinessProfileImageRef",
    "emyBusinessPhoto",
    "emyBusinessPhotoSrc",
    "emyBusinessPhotoRef",
    "emyBusinessAvatar",
    "emyBusinessAvatarSrc",
    "emyBusinessAvatarRef",
    "emyBusinessLogo",
    "emyBusinessLogoSrc",
    "emyBusinessLogoRef"
  ];
  const emyCloudState = {
    installed: false,
    patchInstalled: false,
    localWrite: false,
    pending: new Map(),
    pendingDeletes: new Set(),
    flushTimer: null,
    authHooked: false,
    syncingUser: false,
    syncingPublic: false,
    syncingAnalytics: false,
    syncedUserKeys: new Set(),
    originalSetItem: null,
    originalRemoveItem: null
  };
  function cloudLower(value) {
    return clean(value).toLowerCase();
  }
  function cloudSlug(value, fallback) {
    const raw = clean(value || fallback || "");
    return raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || clean(fallback) || "item";
  }
  function cloudUnique(values) {
    const seen = {};
    const rows = [];
    (Array.isArray(values) ? values : []).forEach(function (value) {
      const text = clean(value);
      const key = cloudLower(text);
      if (!text || seen[key]) return;
      seen[key] = true;
      rows.push(text);
    });
    return rows;
  }
  function cloudDocId(value) {
    const text = String(value || "key");
    try {
      return btoa(unescape(encodeURIComponent(text))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "").slice(0, 420) || "key";
    } catch (error) {
      return cloudSlug(text, "key").slice(0, 420) || "key";
    }
  }
  function cloudReadJsonText(text, fallback) {
    try {
      const parsed = JSON.parse(String(text || ""));
      return parsed === undefined ? fallback : parsed;
    } catch (error) {
      return fallback;
    }
  }
  function cloudReadLocalJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null || raw === undefined || raw === "") return fallback;
      return cloudReadJsonText(raw, fallback);
    } catch (error) {
      return fallback;
    }
  }
  function cloudIsLocalOnlyKey(key) {
    const name = clean(key);
    if (!name) return true;
    if (cloudLocalOnlyKeys.indexOf(name) >= 0) return true;
    if (/password|token|secret|credential/i.test(name)) return true;
    if (/^emyPending(ItemDetailOpen|EventCover|BusinessContactIntent|CustomerBusinessIntent|Selected)/i.test(name)) return true;
    return false;
  }
  function cloudShouldSyncKey(key) {
    const name = clean(key);
    return /^emy/i.test(name) && !cloudIsLocalOnlyKey(name);
  }
  function cloudIsPublicContentKey(key) {
    return cloudPublicContentKeys.indexOf(clean(key)) >= 0;
  }
  function cloudIsStatKey(key) {
    return cloudStatKeys.indexOf(clean(key)) >= 0;
  }
  function cloudIsSharedAccountStateKey(key) {
    const name = clean(key);
    if (!name) return false;
    if (/^(emyCustomerBusiness:|emyCustomerFollow:|emyBusinessNotifications:|emyBusinessJobApplications:|emyBusinessChatThread:|emyCustomerChatThread:)/.test(name)) return true;
    return [
      "emyFeedActionState",
      "emySavedFeedItems",
      "emyFeedDeletedIds",
      "emyFeedReposts",
      "emyCustomerBusinesses",
      "emyCustomerFollowing",
      "emyCustomerRelationshipRequests",
      "emySavedBusinesses",
      "emyBusinessLikeState",
      "emyProductMascotLikeState",
      "emyClipMascotLikeState",
      "emyJobApplications",
      "emyCustomerNotifications",
      "emyCustomerProductVisits",
      "emyProductVisitHistory"
    ].indexOf(name) >= 0;
  }
  function cloudDispatchUserStorageSyncEvents(keys) {
    const rows = Array.isArray(keys) ? keys.map(clean).filter(Boolean) : [];
    if (!rows.length) return;
    const hasFeedState = rows.some(function (key) {
      return key === "emyFeedActionState" || key === "emySavedFeedItems" || key === "emyFeedDeletedIds" || key === "emyFeedReposts";
    });
    const hasCustomerBusinessState = rows.some(function (key) {
      return key === "emyCustomerBusinesses" || key === "emyCustomerFollowing" || key === "emyCustomerRelationshipRequests" ||
        key.indexOf("emyCustomerBusiness:") === 0 || key.indexOf("emyCustomerFollow:") === 0;
    });
    try {
      if (hasFeedState) {
        window.dispatchEvent(new CustomEvent("emy:feed-action-state-changed", { detail: { source: "firebase", keys: rows.slice() } }));
        window.dispatchEvent(new CustomEvent("emy:feed-reposts-changed", { detail: { source: "firebase", keys: rows.slice() } }));
      }
      if (hasCustomerBusinessState) {
        window.dispatchEvent(new CustomEvent("emy:customer-business-changed", { detail: { source: "firebase", keys: rows.slice() } }));
        window.dispatchEvent(new CustomEvent("emy:business-content-changed", { detail: { source: "firebase", action: "customer-sync", keys: rows.slice() } }));
      }
      window.dispatchEvent(new CustomEvent("emy:shared-account-state-synced", { detail: { source: "firebase", keys: rows.slice() } }));
    } catch (error) {}
  }
  function cloudSanitiseValue(value, depth) {
    const level = Number(depth) || 0;
    if (level > 9) return null;
    if (value === undefined || typeof value === "function") return null;
    if (value === null || typeof value === "number" || typeof value === "boolean") return value;
    if (typeof value === "string") {
      const text = value.trim();
      if (/^(data:|blob:)/i.test(text)) return "";
      if (text.length > 180000) return text.slice(0, 180000);
      return value;
    }
    if (Array.isArray(value)) {
      return value.slice(0, 240).map(function (item) { return cloudSanitiseValue(item, level + 1); });
    }
    if (typeof Blob !== "undefined" && value instanceof Blob) return null;
    if (value && typeof File !== "undefined" && value instanceof File) return null;
    if (value && typeof Date !== "undefined" && value instanceof Date) return value.toISOString();
    if (!value || typeof value !== "object") return value;
    const copy = {};
    Object.keys(value).slice(0, 160).forEach(function (key) {
      const next = cloudSanitiseValue(value[key], level + 1);
      if (next !== undefined) copy[key] = next;
    });
    return copy;
  }
  function cloudCompactStorageText(value) {
    const raw = String(value === undefined || value === null ? "" : value);
    const parsed = cloudReadJsonText(raw, null);
    if (parsed === null || parsed === undefined) return raw.length > 220000 ? raw.slice(0, 220000) : raw;
    try {
      return JSON.stringify(cloudSanitiseValue(parsed, 0));
    } catch (error) {
      return raw.length > 220000 ? raw.slice(0, 220000) : raw;
    }
  }
  function cloudValueFromStorageText(text) {
    const raw = String(text === undefined || text === null ? "" : text);
    const parsed = cloudReadJsonText(raw, undefined);
    if (parsed !== undefined) return { json: true, value: cloudSanitiseValue(parsed, 0) };
    return { json: false, value: cloudSanitiseValue(raw, 0) };
  }
  function cloudStorageTextFromDoc(data) {
    const row = data && typeof data === "object" ? data : {};
    if (row.deleted) return null;
    if (row.json === false) return String(row.value === undefined || row.value === null ? "" : row.value);
    try { return JSON.stringify(row.value === undefined ? null : row.value); } catch (error) { return null; }
  }
  function cloudCurrentUser() {
    init();
    return state.auth && state.auth.currentUser ? state.auth.currentUser : null;
  }
  function cloudCurrentRole() {
    return roleValue(localStorage.getItem("emyMainSignedInRole") || localStorage.getItem("emyMainPendingSignupRole") || "customer");
  }
  function cloudCurrentBusinessName() {
    const draft = cloudReadLocalJson("emyBusinessProfileDraft", {});
    return clean(localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || draft.businessName || draft.name || "");
  }
  function cloudCurrentBusinessKey() {
    const draft = cloudReadLocalJson("emyBusinessProfileDraft", {});
    return cloudSlug(localStorage.getItem("emyBusinessReviewBusinessKey") || localStorage.getItem("emyBusinessProfileKey") || localStorage.getItem("emyBusinessKey") || draft.businessKey || draft.key || cloudCurrentBusinessName(), cloudCurrentBusinessName() || "business");
  }
  function cloudBusinessKeyForItem(item) {
    const row = item && typeof item === "object" ? item : {};
    return cloudSlug(row.businessKey || row.detailBusinessKey || row.ownerKey || row.sellerKey || row.profileKey || row.businessSlug || row.businessId || row.business || row.businessName || row.sellerName || cloudCurrentBusinessKey(), cloudCurrentBusinessKey());
  }
  function cloudBusinessNameForItem(item) {
    const row = item && typeof item === "object" ? item : {};
    return clean(row.businessName || row.detailBusiness || row.business || row.sellerName || cloudCurrentBusinessName() || "Business");
  }
  function cloudContentKindForKey(key, item) {
    const source = cloudLower(key + " " + clean(item && (item.kind || item.type || item.itemKind || item.mediaType || item.category)));
    if (source.indexOf("product") >= 0) return "product";
    if (source.indexOf("clip") >= 0 || source.indexOf("reel") >= 0) return "clip";
    if (source.indexOf("event") >= 0) return "event";
    if (source.indexOf("job") >= 0 || source.indexOf("hiring") >= 0) return "job";
    if (source.indexOf("article") >= 0) return "article";
    return "post";
  }
  function cloudContentTitle(item, fallback) {
    const row = item && typeof item === "object" ? item : {};
    return clean(row.title || row.name || row.productName || row.productTitle || row.clipTitle || row.heading || row.eventName || row.jobTitle || row.text || fallback || "Untitled");
  }
  function cloudContentItemId(item, key, index) {
    const row = item && typeof item === "object" ? item : {};
    const direct = clean(row.id || row.feedId || row.originalFeedId || row.postId || row.productId || row.businessProductId || row.clipId || row.reelId || row.articleId || row.eventId || row.jobId || row.key);
    if (direct) return cloudDocId(direct);
    return cloudDocId([cloudBusinessKeyForItem(row), key, cloudContentTitle(row, "item"), String(index)].join(":"));
  }
  function cloudContentIdentity(item, key, index) {
    const row = item && typeof item === "object" ? item : {};
    return clean(row.id || row.feedId || row.originalFeedId || row.postId || row.productId || row.businessProductId || row.clipId || row.reelId || row.articleId || row.eventId || row.jobId || row.key) ||
      [cloudBusinessKeyForItem(row), key, cloudContentTitle(row, "item"), String(index)].join(":");
  }
  function cloudContentIsLive(item) {
    const row = item && typeof item === "object" ? item : {};
    const status = cloudLower([row.status, row.reviewStatus, row.visibility, row.publicStatus].filter(Boolean).join(" "));
    if (row.deleted === true || row.removed === true || row.deletedAt || row.hidden === true) return false;
    if (row.paused === true || row.archived === true || row.draft === true) return false;
    if (status && /(deleted|removed|hidden|paused|draft|archived)/.test(status)) return false;
    return true;
  }
  async function cloudSaveStorageKey(user, key, value, deleted) {
    if (!user || !cloudShouldSyncKey(key)) return;
    const ctx = requireReady();
    const doc = ctx.db.collection("users").doc(user.uid).collection("appStorage").doc(cloudDocId(key));
    if (deleted) {
      await doc.set({ key: key, deleted: true, json: true, updatedAt: serverTimestamp(), updatedAtIso: nowIso() }, { merge: true });
      return;
    }
    const parsed = cloudValueFromStorageText(value);
    let payload = {
      key: key,
      json: parsed.json,
      value: parsed.value,
      ownerUserId: user.uid,
      role: cloudCurrentRole(),
      updatedAt: serverTimestamp(),
      updatedAtIso: nowIso()
    };
    try {
      if (JSON.stringify(payload).length > 850000) {
        payload.value = cloudSanitiseValue(parsed.value, 0);
      }
    } catch (error) {}
    await doc.set(payload, { merge: true });
  }
  async function cloudMirrorPublicContentKey(user, key, value) {
    if (!user || !cloudIsPublicContentKey(key)) return;
    const parsed = cloudReadJsonText(value, []);
    const rows = Array.isArray(parsed) ? parsed.filter(function (item) { return item && typeof item === "object"; }) : [];
    const ctx = requireReady();
    const byBusiness = {};
    rows.forEach(function (item, index) {
      if (!cloudContentIsLive(item)) return;
      const businessKey = cloudBusinessKeyForItem(item);
      if (!businessKey) return;
      if (!byBusiness[businessKey]) byBusiness[businessKey] = [];
      byBusiness[businessKey].push({ item: item, index: index });
    });
    const businessKeys = Object.keys(byBusiness);
    for (let b = 0; b < businessKeys.length; b += 1) {
      const businessKey = businessKeys[b];
      const present = {};
      const collection = ctx.db.collection("businessContent").doc(businessKey).collection("items");
      const publicCollection = ctx.db.collection("publicBusinessContent");
      const batch = ctx.db.batch();
      batch.set(ctx.db.collection("businessAnalytics").doc(businessKey), {
        businessKey: businessKey,
        businessName: cloudBusinessNameForItem(byBusiness[businessKey][0] && byBusiness[businessKey][0].item),
        ownerUserId: user.uid,
        ownerEmail: user.email || "",
        updatedAt: serverTimestamp(),
        updatedAtIso: nowIso()
      }, { merge: true });
      byBusiness[businessKey].slice(0, 160).forEach(function (entry) {
        const item = entry.item;
        const kind = cloudContentKindForKey(key, item);
        const itemId = cloudContentIdentity(item, key, entry.index);
        const docId = cloudContentItemId(item, key, entry.index);
        const publicDocId = cloudDocId(businessKey + ":" + docId);
        present[docId] = true;
        const payload = {
          id: itemId,
          itemId: itemId,
          sourceKey: key,
          kind: kind,
          type: kind,
          businessKey: businessKey,
          businessName: cloudBusinessNameForItem(item),
          title: cloudContentTitle(item, kind),
          ownerUserId: user.uid,
          ownerEmail: user.email || "",
          payload: cloudSanitiseValue(Object.assign({}, item, {
            businessKey: businessKey,
            businessName: cloudBusinessNameForItem(item),
            itemKind: kind
          }), 0),
          deleted: false,
          updatedAt: serverTimestamp(),
          updatedAtIso: nowIso()
        };
        batch.set(collection.doc(docId), payload, { merge: true });
        batch.set(publicCollection.doc(publicDocId), payload, { merge: true });
      });
      const existing = await collection.where("sourceKey", "==", key).get().catch(function () { return null; });
      if (existing) {
        existing.forEach(function (doc) {
          const data = doc.data() || {};
          if (data.ownerUserId !== user.uid || present[doc.id]) return;
          batch.set(collection.doc(doc.id), { deleted: true, updatedAt: serverTimestamp(), updatedAtIso: nowIso() }, { merge: true });
          batch.set(publicCollection.doc(cloudDocId(businessKey + ":" + doc.id)), { deleted: true, ownerUserId: user.uid, updatedAt: serverTimestamp(), updatedAtIso: nowIso() }, { merge: true });
        });
      }
      await batch.commit().catch(function (error) {
        try { console.warn("[EMY cloud storage] public content sync skipped", publicError(error)); } catch (logError) {}
      });
    }
  }
  function cloudSourceKeyForKind(kind) {
    const text = cloudLower(kind);
    if (text.indexOf("product") >= 0) return "emyBusinessProducts";
    if (text.indexOf("clip") >= 0 || text.indexOf("reel") >= 0) return "emyBusinessClips";
    if (text.indexOf("event") >= 0) return "emyFeedCreatedEvents";
    if (text.indexOf("job") >= 0) return "emyFeedCreatedJobs";
    if (text.indexOf("article") >= 0) return "emyBusinessArticles";
    return "emyFeedCreatedPosts";
  }
  function cloudMergeArrayByIdentity(existing, incoming, sourceKey) {
    const rows = Array.isArray(existing) ? existing.slice() : [];
    const index = {};
    rows.forEach(function (item, rowIndex) {
      const id = cloudContentIdentity(item, sourceKey, rowIndex);
      if (id) index[cloudLower(id)] = rowIndex;
    });
    incoming.forEach(function (item, rowIndex) {
      if (!item || typeof item !== "object") return;
      const id = cloudContentIdentity(item, sourceKey, rowIndex);
      const key = cloudLower(id);
      if (key && index[key] !== undefined) rows[index[key]] = Object.assign({}, rows[index[key]] || {}, item);
      else rows.unshift(item);
    });
    return rows.filter(cloudContentIsLive).slice(0, 160);
  }
  function cloudAuthoritativePublicRows(incoming) {
    const rows = Array.isArray(incoming) ? incoming.filter(function (item) { return item && typeof item === "object" && cloudContentIsLive(item); }) : [];
    rows.sort(function (a, b) {
      const left = Date.parse(clean(a && (a.updatedAtIso || a.updatedAt || a.createdAt || a.createdAtIso || a.time || a.date)) || "0") || 0;
      const right = Date.parse(clean(b && (b.updatedAtIso || b.updatedAt || b.createdAt || b.createdAtIso || b.time || b.date)) || "0") || 0;
      return right - left;
    });
    return rows.slice(0, 160);
  }
  async function cloudSyncPublicContentFromCloud() {
    if (emyCloudState.syncingPublic) return;
    init();
    if (!state.ready || !state.db) return;
    emyCloudState.syncingPublic = true;
    try {
      const snapshot = await state.db.collection("publicBusinessContent").where("deleted", "==", false).limit(250).get();
      const grouped = {};
      snapshot.forEach(function (doc) {
        const data = doc.data() || {};
        if (data.deleted === true) return;
        const sourceKey = clean(data.sourceKey) || cloudSourceKeyForKind(data.kind || data.type);
        if (cloudPublicContentKeys.indexOf(sourceKey) < 0) return;
        const item = Object.assign({}, data.payload || {}, {
          id: data.itemId || data.id || doc.id,
          feedId: data.payload && data.payload.feedId || data.itemId || data.id || doc.id,
          businessKey: data.businessKey || data.payload && data.payload.businessKey || "",
          businessName: data.businessName || data.payload && data.payload.businessName || "",
          itemKind: data.kind || data.type || data.payload && data.payload.itemKind || ""
        });
        if (!grouped[sourceKey]) grouped[sourceKey] = [];
        grouped[sourceKey].push(item);
      });
      emyCloudState.localWrite = true;
      cloudPublicContentKeys.forEach(function (sourceKey) {
        const authoritativeRows = cloudAuthoritativePublicRows(grouped[sourceKey] || []);
        try { localStorage.setItem(sourceKey, JSON.stringify(authoritativeRows)); } catch (error) {}
      });
      emyCloudState.localWrite = false;
      setLocal("emyCloudStorageLastSyncAt", nowIso());
      try {
        [
          "emy:business-products-changed",
          "emy:business-clips-changed",
          "emy:created-posts-changed",
          "emy:created-jobs-changed",
          "emy:created-events-changed"
        ].forEach(function (eventName) {
          window.dispatchEvent(new CustomEvent(eventName, { detail: { source: "firebase", action: "sync" } }));
        });
      } catch (eventError) {}
      try { window.dispatchEvent(new CustomEvent("emy:cloud-public-content-synced", { detail: { keys: cloudPublicContentKeys.slice() } })); } catch (error) {}
    } catch (error) {
      try { console.warn("[EMY cloud storage] public content load skipped", publicError(error)); } catch (logError) {}
    } finally {
      emyCloudState.localWrite = false;
      emyCloudState.syncingPublic = false;
    }
  }
  async function cloudSyncUserStorageFromCloud(user) {
    if (!user || emyCloudState.syncingUser) return;
    const ctx = requireReady();
    emyCloudState.syncingUser = true;
    try {
      const snapshot = await ctx.db.collection("users").doc(user.uid).collection("appStorage").limit(350).get();
      const syncedKeys = new Set();
      const changedKeys = [];
      emyCloudState.localWrite = true;
      snapshot.forEach(function (doc) {
        const data = doc.data() || {};
        const key = clean(data.key);
        if (!key || !cloudShouldSyncKey(key)) return;
        if (cloudIsPublicContentKey(key)) return;
        syncedKeys.add(key);
        const accountStateKey = cloudIsSharedAccountStateKey(key);
        if (data.deleted) {
          if (accountStateKey && localStorage.getItem(key) !== null) {
            try { localStorage.removeItem(key); } catch (error) {}
            changedKeys.push(key);
          }
          return;
        }
        if (!accountStateKey && localStorage.getItem(key) !== null) return;
        const text = cloudStorageTextFromDoc(data);
        if (text === null) return;
        try {
          const current = localStorage.getItem(key);
          if (current !== text) {
            localStorage.setItem(key, text);
            changedKeys.push(key);
          }
        } catch (error) {}
      });
      emyCloudState.localWrite = false;
      emyCloudState.syncedUserKeys = syncedKeys;
      setLocal("emyCloudStorageLastSyncAt", nowIso());
      cloudDispatchUserStorageSyncEvents(changedKeys);
      try { window.dispatchEvent(new CustomEvent("emy:cloud-user-storage-synced", { detail: { uid: user.uid, keys: Array.from(syncedKeys) } })); } catch (error) {}
    } catch (error) {
      try { console.warn("[EMY cloud storage] user storage load skipped", publicError(error)); } catch (logError) {}
    } finally {
      emyCloudState.localWrite = false;
      emyCloudState.syncingUser = false;
    }
  }
  function cloudQueueStorageWrite(key, value, deleted) {
    const name = clean(key);
    if (!cloudShouldSyncKey(name) || emyCloudState.localWrite) return;
    if (deleted) emyCloudState.pendingDeletes.add(name);
    else {
      emyCloudState.pending.set(name, String(value === undefined || value === null ? "" : value));
      emyCloudState.pendingDeletes.delete(name);
    }
    if (emyCloudState.flushTimer) clearTimeout(emyCloudState.flushTimer);
    emyCloudState.flushTimer = window.setTimeout(cloudFlushStorageWrites, 650);
  }
  async function cloudFlushStorageWrites() {
    const user = cloudCurrentUser();
    if (!user || !state.ready || !state.db) return;
    const pending = Array.from(emyCloudState.pending.entries());
    const deletes = Array.from(emyCloudState.pendingDeletes.values());
    emyCloudState.pending.clear();
    emyCloudState.pendingDeletes.clear();
    for (let index = 0; index < pending.length; index += 1) {
      const key = pending[index][0];
      const value = pending[index][1];
      if (cloudIsPublicContentKey(key)) {
        await cloudMirrorPublicContentKey(user, key, value).catch(function (error) {
          try { console.warn("[EMY cloud storage] public key sync skipped", key, publicError(error)); } catch (logError) {}
        });
        continue;
      }
      await cloudSaveStorageKey(user, key, value, false).catch(function (error) {
        try { console.warn("[EMY cloud storage] key sync skipped", key, publicError(error)); } catch (logError) {}
      });
    }
    for (let d = 0; d < deletes.length; d += 1) {
      if (cloudIsPublicContentKey(deletes[d])) continue;
      await cloudSaveStorageKey(user, deletes[d], "", true).catch(function () {});
    }
    setLocal("emyCloudStorageLastSyncAt", nowIso());
  }
  function cloudCurrentActorSnapshot() {
    const role = cloudCurrentRole();
    const email = clean(localStorage.getItem("emyMainSignedInEmail") || localStorage.getItem("emyMainPendingSignupEmail") || "");
    const customerName = clean(localStorage.getItem("emyCustomerDisplayName") || [localStorage.getItem("emyCustomerFirstName"), localStorage.getItem("emyCustomerLastName")].map(clean).filter(Boolean).join(" ") || (email ? email.split("@")[0] : ""));
    const businessName = cloudCurrentBusinessName();
    return {
      role: role,
      email: email,
      name: role === "business" ? businessName || customerName || "Business" : customerName || "Customer",
      key: role === "business" ? cloudCurrentBusinessKey() : cloudSlug(email || customerName || "customer", "customer")
    };
  }
  async function cloudRecordBusinessAnalyticsEvent(event) {
    const user = cloudCurrentUser();
    if (!user || !state.ready || !state.db) return null;
    const input = event && typeof event === "object" ? event : {};
    const actor = cloudCurrentActorSnapshot();
    const businessKey = cloudSlug(input.businessKey || input.detailBusinessKey || input.businessName || input.business || cloudCurrentBusinessKey(), cloudCurrentBusinessKey());
    if (!businessKey) return null;
    const now = clean(input.at) || nowIso();
    const itemTitle = clean(input.itemTitle || input.title || input.productName || input.name || input.itemName || "");
    const itemId = clean(input.itemId || input.feedId || input.productId || input.clipId || input.postId || itemTitle || businessKey);
    const itemKeys = cloudUnique([].concat(input.itemKeys || [], [itemId, itemTitle, cloudSlug([businessKey, itemTitle].join("-"), "")]));
    const metric = clean(input.metric || input.type || input.action || "activity");
    const id = clean(input.id) || cloudDocId([metric, businessKey, itemId, now, user.uid].join(":"));
    const payload = {
      id: id,
      businessKey: businessKey,
      businessName: clean(input.businessName || input.business || cloudCurrentBusinessName() || "Business"),
      metric: metric,
      action: clean(input.action || metric),
      itemKind: clean(input.itemKind || input.kind || ""),
      itemId: itemId,
      itemTitle: itemTitle,
      itemKeys: itemKeys,
      source: clean(input.source || "Recorded activity"),
      actorUid: user.uid,
      actorEmail: clean(input.actorEmail || actor.email || user.email || ""),
      actorName: clean(input.actorName || actor.name || user.displayName || "Customer"),
      actorKey: clean(input.actorKey || actor.key || user.uid),
      actorRole: clean(input.actorRole || actor.role || "customer"),
      at: now,
      createdAt: serverTimestamp()
    };
    await state.db.collection("businessAnalytics").doc(businessKey).collection("events").doc(id).set(cloudSanitiseValue(payload, 0), { merge: true });
    return payload;
  }
  function cloudAppendAnalyticsRecord(map, key, event) {
    const statKey = clean(key);
    if (!statKey) return;
    const record = map[statKey] && typeof map[statKey] === "object" ? map[statKey] : {};
    const rows = Array.isArray(record.events) ? record.events.slice() : [];
    const eventId = clean(event && event.id) || cloudDocId([event && event.metric, event && event.itemId, event && event.at, event && event.actorKey].join(":"));
    if (!rows.some(function (row) { return clean(row && row.id) === eventId; })) {
      rows.push({
        id: eventId,
        at: clean(event && event.at) || nowIso(),
        viewerName: clean(event && (event.actorName || event.viewerName)) || "Customer",
        viewerKey: clean(event && (event.actorKey || event.viewerKey)),
        viewerEmail: clean(event && (event.actorEmail || event.viewerEmail)),
        role: clean(event && event.actorRole) || "customer",
        source: clean(event && event.source) || "Recorded activity"
      });
    }
    rows.sort(function (a, b) { return new Date(b && b.at || 0).getTime() - new Date(a && a.at || 0).getTime(); });
    map[statKey] = Object.assign({}, record, { events: rows.slice(0, 240), total: rows.length, lastViewedAt: rows[0] && rows[0].at || nowIso() });
  }
  function cloudMergeAnalyticsEventsIntoLocal(events) {
    const maps = {
      productViews: cloudReadLocalJson("emyProductViewStats", {}),
      postViews: cloudReadLocalJson("emyPostViewStats", {}),
      clipViews: cloudReadLocalJson("emyClipViewStats", {}),
      profileVisits: cloudReadLocalJson("emyBusinessProfileViewStats", {}),
      directions: cloudReadLocalJson("emyBusinessDirectionStats", {})
    };
    (Array.isArray(events) ? events : []).forEach(function (event) {
      const metric = clean(event && event.metric);
      let target = "";
      if (metric === "productViews") target = "productViews";
      else if (metric === "postViews") target = "postViews";
      else if (metric === "clipViews") target = "clipViews";
      else if (metric === "profileVisits") target = "profileVisits";
      else if (metric === "directions") target = "directions";
      if (!target) return;
      const keys = cloudUnique([].concat(event.itemKeys || [], [event.itemId, event.itemTitle, event.businessKey, target === "directions" ? "directions:" + event.businessKey : ""]));
      keys.forEach(function (key) { cloudAppendAnalyticsRecord(maps[target], key, event); });
    });
    emyCloudState.localWrite = true;
    try { localStorage.setItem("emyProductViewStats", JSON.stringify(maps.productViews || {})); } catch (error) {}
    try { localStorage.setItem("emyPostViewStats", JSON.stringify(maps.postViews || {})); } catch (error) {}
    try { localStorage.setItem("emyClipViewStats", JSON.stringify(maps.clipViews || {})); } catch (error) {}
    try { localStorage.setItem("emyBusinessProfileViewStats", JSON.stringify(maps.profileVisits || {})); } catch (error) {}
    try { localStorage.setItem("emyBusinessDirectionStats", JSON.stringify(maps.directions || {})); } catch (error) {}
    emyCloudState.localWrite = false;
  }
  function cloudBusinessAnalyticsKeys() {
    return cloudUnique([
      cloudCurrentBusinessKey(),
      cloudCurrentBusinessName(),
      localStorage.getItem("emyBusinessReviewBusinessKey"),
      localStorage.getItem("emyBusinessProfileKey"),
      localStorage.getItem("emyBusinessKey")
    ].map(function (value) { return cloudSlug(value, ""); }));
  }
  async function cloudSyncBusinessAnalyticsFromCloud(keys) {
    if (emyCloudState.syncingAnalytics) return;
    init();
    if (!state.ready || !state.db) return;
    const businessKeys = cloudUnique(Array.isArray(keys) && keys.length ? keys : cloudBusinessAnalyticsKeys());
    if (!businessKeys.length) return;
    emyCloudState.syncingAnalytics = true;
    try {
      const events = [];
      for (let index = 0; index < businessKeys.length; index += 1) {
        const snap = await state.db.collection("businessAnalytics").doc(businessKeys[index]).collection("events").limit(350).get().catch(function () { return null; });
        if (!snap) continue;
        snap.forEach(function (doc) { events.push(Object.assign({ id: doc.id }, doc.data() || {})); });
      }
      cloudMergeAnalyticsEventsIntoLocal(events);
      try { window.dispatchEvent(new CustomEvent("emy:cloud-analytics-synced", { detail: { count: events.length } })); } catch (error) {}
    } finally {
      emyCloudState.localWrite = false;
      emyCloudState.syncingAnalytics = false;
    }
  }
  function cloudInstallStoragePatch() {
    if (emyCloudState.patchInstalled || !window.Storage || !Storage.prototype || !Storage.prototype.setItem) return;
    emyCloudState.originalSetItem = Storage.prototype.setItem;
    emyCloudState.originalRemoveItem = Storage.prototype.removeItem;
    Storage.prototype.setItem = function emyCloudStorageSetItem(key, value) {
      if (emyCloudState.localWrite || !cloudShouldSyncKey(key)) {
        return emyCloudState.originalSetItem.apply(this, arguments);
      }
      let result;
      try {
        result = emyCloudState.originalSetItem.apply(this, arguments);
      } catch (error) {
        const compacted = cloudCompactStorageText(value);
        if (compacted !== String(value)) {
          result = emyCloudState.originalSetItem.call(this, key, compacted);
          value = compacted;
        } else {
          throw error;
        }
      }
      cloudQueueStorageWrite(key, value, false);
      return result;
    };
    if (Storage.prototype.removeItem) {
      Storage.prototype.removeItem = function emyCloudStorageRemoveItem(key) {
        const result = emyCloudState.originalRemoveItem.apply(this, arguments);
        cloudQueueStorageWrite(key, "", true);
        return result;
      };
    }
    emyCloudState.patchInstalled = true;
  }
  function cloudPushExistingLocalKeys() {
    try {
      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (!cloudShouldSyncKey(key)) continue;
        if (cloudIsPublicContentKey(key)) continue;
        if (cloudIsSharedAccountStateKey(key)) continue;
        const value = localStorage.getItem(key);
        if (value !== null) cloudQueueStorageWrite(key, value, false);
      }
      cloudFlushStorageWrites();
    } catch (error) {}
  }
  function installEmyCloudStorage() {
    cloudInstallStoragePatch();
    init();
    if (emyCloudState.installed && emyCloudState.authHooked) return;
    emyCloudState.installed = true;
    if (!state.ready || !state.auth || !state.db || emyCloudState.authHooked) return;
    emyCloudState.authHooked = true;
    state.auth.onAuthStateChanged(function (user) {
      if (!user) return;
      setLocal("emyCloudStorageStatus", "firebase");
      window.setTimeout(function () {
        hydrateLocalProfile(user, cloudCurrentRole()).catch(function (error) {
          try { console.warn("[EMY cloud storage] profile hydrate skipped", publicError(error)); } catch (logError) {}
        }).then(function () {
          return cloudSyncUserStorageFromCloud(user);
        }).then(function () {
          cloudPushExistingLocalKeys();
          return cloudSyncPublicContentFromCloud();
        }).then(function () {
          return cloudSyncBusinessAnalyticsFromCloud();
        }).catch(function (error) {
          try { console.warn("[EMY cloud storage] startup sync skipped", publicError(error)); } catch (logError) {}
        });
      }, 150);
    });
  }
  async function syncPublicBusinessProfiles() {
    const ctx = requireReady();
    const statuses = ["approved", "active", "live", "public"];
    const rowsByKey = new Map();
    async function queryBy(field) {
      const snapshot = await ctx.db.collection("businessProfiles").where(field, "in", statuses).limit(80).get();
      snapshot.forEach(function (doc) {
        const data = doc.data() || {};
        if (!publicBusinessProfileIsLive(data)) return;
        const row = normalisePublicBusinessProfile(data, doc.id);
        rowsByKey.set(row.key || doc.id, row);
      });
    }
    await Promise.all([
      queryBy("reviewStatus").catch(function () {}),
      queryBy("status").catch(function () {})
    ]);
    return savePublicBusinessProfiles(Array.from(rowsByKey.values()));
  }
  async function currentSession() {
    const ctx = requireReady();
    const user = ctx.auth.currentUser;
    if (!user) return null;
    const role = roleValue(localStorage.getItem("emyMainSignedInRole") || localStorage.getItem("emyMainPendingSignupRole"));
    await hydrateLocalProfile(user, role).catch(function () {});
    return { uid: user.uid, email: user.email, emailVerified: user.emailVerified, role: role, isAdmin: cleanEmail(user.email) === adminEmail };
  }
  init();
  window.emyRealAuth = {
    config: { firebase: firebaseConfig, adminEmail: adminEmail, cloudinary: cloudinary },
    ready: function () { return Promise.resolve(requireReady()); },
    registerAccount: registerAccount,
    signIn: signIn,
    completeEmailVerification: completeEmailVerification,
    requestVerificationCode: requestVerificationCode,
    confirmVerificationCode: confirmVerificationCode,
    resendVerification: resendVerification,
    resendFirebaseLinkFallback: resendFirebaseLinkFallback,
    sendPasswordReset: sendPasswordReset,
    submitBusinessProfile: submitBusinessProfile,
    updateCustomerProfilePhoto: updateCustomerProfilePhoto,
    syncPublicBusinessProfiles: syncPublicBusinessProfiles,
    uploadToCloudinary: uploadToCloudinary,
    currentSession: currentSession,
    signOut: signOut,
    publicError: publicError
  };
  window.emyCloudStorage = {
    ready: function () { installEmyCloudStorage(); return Promise.resolve(requireReady()); },
    flush: cloudFlushStorageWrites,
    syncUser: function () { return cloudSyncUserStorageFromCloud(cloudCurrentUser()); },
    syncPublicContent: cloudSyncPublicContentFromCloud,
    syncBusinessAnalytics: cloudSyncBusinessAnalyticsFromCloud,
    recordBusinessAnalyticsEvent: cloudRecordBusinessAnalyticsEvent,
    compactValue: cloudCompactStorageText
  };
  installEmyCloudStorage();
  if (/emy-(customer|business|admin)/i.test(String(window.location && window.location.pathname || ""))) {
    window.setTimeout(function () {
      if (!state.ready || !state.db) return;
      syncPublicBusinessProfiles().catch(function (error) {
        try { console.warn("[EMY real backend] public business profile sync skipped", publicError(error)); } catch (logError) {}
      });
      cloudSyncPublicContentFromCloud().catch(function (error) {
        try { console.warn("[EMY cloud storage] public content sync skipped", publicError(error)); } catch (logError) {}
      });
      cloudSyncBusinessAnalyticsFromCloud().catch(function (error) {
        try { console.warn("[EMY cloud storage] analytics sync skipped", publicError(error)); } catch (logError) {}
      });
    }, 350);
  }
})();`;

sharedEmyRealBackendLoaderScript = [
  '    <!-- emy-real-backend:start -->',
  '    <script data-emy-real-backend-inline>',
  emyRealBackendRuntimeScript.replace(/<\/script/gi, '<\\/script'),
  '    </script>',
  '    <script data-emy-real-backend-loader defer src="https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js"></script>',
  '    <script data-emy-real-backend-loader defer src="https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js"></script>',
  '    <script data-emy-real-backend-loader defer src="https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js"></script>',
  '    <script data-emy-real-backend-loader defer src="https://www.gstatic.com/firebasejs/10.12.5/firebase-functions-compat.js"></script>',
  '    <!-- emy-real-backend:end -->'
].join('\n');

const emyRealBackendNonBlockingLoaderRuntimeScript = String.raw`(function () {
  if (window.__emyFirebaseCompatLoaderStarted) return;
  window.__emyFirebaseCompatLoaderStarted = true;
  const urls = [
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-functions-compat.js"
  ];
  function warn(error) {
    try { console.warn("[EMY real backend] Firebase compat loader skipped", error && error.message ? error.message : error); } catch (logError) {}
  }
  function finish() {
    try { window.dispatchEvent(new CustomEvent("emy:firebase-compat-loaded")); } catch (error) {}
    try {
      if (window.emyRealAuth && typeof window.emyRealAuth.ready === "function") {
        window.emyRealAuth.ready().catch(warn);
      }
    } catch (error) {
      warn(error);
    }
  }
  function load(index) {
    if (index >= urls.length) {
      finish();
      return;
    }
    const script = document.createElement("script");
    script.src = urls[index];
    script.async = false;
    script.dataset.emyRealBackendLoader = "dynamic";
    script.onload = function () { load(index + 1); };
    script.onerror = function () { warn(new Error("Could not load " + urls[index])); load(index + 1); };
    document.head.appendChild(script);
  }
  let started = false;
  function createSurfaceActive() {
    return !!document.querySelector(".feed-create-modal[aria-hidden='false'],[data-feed-create-menu][aria-hidden='false'],[data-feed-compose-source-sheet][aria-hidden='false'],[data-feed-compose-camera-sheet][aria-hidden='false']");
  }
  const start = function () {
    if (started) return;
    started = true;
    window.setTimeout(function () {
      if (createSurfaceActive()) {
        started = false;
        window.setTimeout(start, 1800);
        return;
      }
      load(0);
    }, 0);
  };
  window.emyEnsureFirebaseCompat = start;
  function scheduleStart() {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(start, { timeout: 12000 });
      return;
    }
    window.setTimeout(start, 6500);
  }
  if (document.readyState === "complete") {
    scheduleStart();
  } else {
    window.addEventListener("load", scheduleStart, { once: true });
  }
})();`;

sharedEmyRealBackendNonBlockingLoaderScript = [
  '    <!-- emy-real-backend:start -->',
  '    <script data-emy-real-backend-inline>',
  emyRealBackendRuntimeScript.replace(/<\/script/gi, '<\\/script'),
  '    </script>',
  '    <script data-emy-real-backend-loader>',
  emyRealBackendNonBlockingLoaderRuntimeScript.replace(/<\/script/gi, '<\\/script'),
  '    </script>',
  '    <!-- emy-real-backend:end -->'
].join('\n');

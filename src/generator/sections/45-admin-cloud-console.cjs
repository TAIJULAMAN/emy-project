/* EMY generator section: 45-admin-cloud-console.cjs (source lines 110978-111948) */
const adminCloudConsoleStyle = String.raw`
    <style data-emy-admin-cloud-console-style>
      .admin-cloud-console { border:1px solid rgba(21,112,239,.18); border-radius:12px; background:#fff; box-shadow:0 10px 24px rgba(16,24,40,.045); margin:0 0 14px; overflow:hidden; }
      .admin-cloud-head { min-height:54px; display:flex; align-items:center; justify-content:space-between; gap:12px; border-bottom:1px solid var(--line,#d9e2ee); background:linear-gradient(180deg,#f8fbff,#fff); padding:12px 14px; }
      .admin-cloud-head h2 { margin:0; color:var(--navy,#001b47); font-size:16px; line-height:1.12; font-weight:900; }
      .admin-cloud-head p { margin:4px 0 0; color:#667085; font-size:12px; line-height:1.35; font-weight:700; }
      .admin-cloud-actions { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:8px; }
      .admin-cloud-actions button, .admin-cloud-tab { min-height:32px; border:1px solid var(--line,#d9e2ee); border-radius:999px; background:#fff; color:var(--navy,#001b47); display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:0 11px; font-size:11.5px; line-height:1; font-weight:850; }
      .admin-cloud-actions .primary { border-color:var(--orange,#ff6a00); background:var(--orange,#ff6a00); color:#fff; }
      .admin-cloud-body { padding:14px; display:grid; gap:12px; }
      .admin-cloud-status { border:1px solid rgba(21,112,239,.12); border-radius:10px; background:#f8fbff; color:#344054; padding:10px 11px; font-size:12.5px; line-height:1.4; font-weight:720; overflow-wrap:anywhere; }
      .admin-cloud-tabs { display:flex; flex-wrap:wrap; gap:7px; }
      .admin-cloud-tab.is-active { border-color:rgba(255,106,0,.28); background:#fff7ed; color:#c14f00; }
      .admin-cloud-metrics { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px; }
      .admin-cloud-metric { border:1px solid var(--line,#d9e2ee); border-radius:10px; background:#fbfcff; padding:10px; }
      .admin-cloud-metric small { display:block; color:#667085; font-size:10px; text-transform:uppercase; letter-spacing:.06em; font-weight:900; }
      .admin-cloud-metric strong { display:block; margin-top:6px; color:var(--navy,#001b47); font-size:22px; line-height:1; font-weight:900; }
      .admin-cloud-list { display:grid; gap:10px; }
      .admin-cloud-card { border:1px solid var(--line,#d9e2ee); border-radius:11px; background:#fff; padding:11px; display:grid; grid-template-columns:74px minmax(0,1fr) auto; gap:11px; align-items:start; }
      .admin-cloud-media { width:74px; height:74px; border:1px solid var(--line,#d9e2ee); border-radius:10px; background:#f2f4f7; color:#667085; display:grid; place-items:center; overflow:hidden; font-size:11px; font-weight:900; }
      .admin-cloud-media img, .admin-cloud-media video { width:100%; height:100%; object-fit:cover; display:block; }
      .admin-cloud-copy h3 { margin:0; color:var(--navy,#001b47); font-size:14px; line-height:1.2; font-weight:900; overflow-wrap:anywhere; }
      .admin-cloud-copy p { margin:5px 0 0; color:#475467; font-size:12px; line-height:1.4; font-weight:650; overflow-wrap:anywhere; }
      .admin-cloud-tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
      .admin-cloud-tag { min-height:22px; border-radius:999px; background:#eef4ff; color:#175cd3; display:inline-flex; align-items:center; padding:0 8px; font-size:10.5px; font-weight:850; }
      .admin-cloud-tag.good { background:#ecfdf3; color:#027a48; }
      .admin-cloud-tag.bad { background:#fff1f0; color:#b42318; }
      .admin-cloud-card-actions { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:7px; }
      .admin-cloud-card-actions button { min-height:30px; border:1px solid var(--line,#d9e2ee); border-radius:999px; background:#fff; color:var(--navy,#001b47); display:inline-flex; align-items:center; justify-content:center; padding:0 10px; font-size:11px; font-weight:850; }
      .admin-cloud-card-actions .danger { border-color:rgba(180,35,24,.18); background:#fff1f0; color:#b42318; }
      .admin-cloud-empty { border:1px dashed var(--line,#d9e2ee); border-radius:10px; background:#fbfcff; color:#667085; padding:22px; text-align:center; font-size:13px; font-weight:720; }
      .admin-cloud-detail-media { border:1px solid var(--line,#d9e2ee); border-radius:12px; background:#f8fafc; overflow:hidden; min-height:220px; display:grid; place-items:center; }
      .admin-cloud-detail-media img, .admin-cloud-detail-media video { width:100%; max-height:420px; object-fit:contain; display:block; background:#0f172a; }
      .admin-cloud-field-media { display:block; border:1px solid var(--line,#d9e2ee); border-radius:10px; background:#0f172a; overflow:hidden; }
      .admin-cloud-field-media img, .admin-cloud-field-media video { width:100%; max-height:260px; object-fit:contain; display:block; background:#0f172a; }
      .admin-cloud-field-media small { display:block; padding:7px 9px; background:#fff; color:#475467; font-size:11px; line-height:1.2; font-weight:850; }
      @media (max-width:780px) { .admin-cloud-metrics { grid-template-columns:repeat(2,minmax(0,1fr)); } .admin-cloud-card { grid-template-columns:58px minmax(0,1fr); } .admin-cloud-media { width:58px; height:58px; } .admin-cloud-card-actions { grid-column:1 / -1; justify-content:flex-start; } }
    </style>`;

const adminCloudConsoleScript = String.raw`
    <script data-emy-admin-cloud-console>
      (function () {
        const adminEmail = "i.stephane@my-emy.com";
        const cloud = { loading:false, loaded:false, records:[], errors:[], session:null, tab:"all", lastLoaded:"" };
        const peopleTypes = ["customer","business","user","approval"];
        const contentTypes = ["product","post","clip","video","job","event","content","notification"];

        function esc(value) { return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) { return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]; }); }
        function clean(value) { return String(value == null ? "" : value).replace(/\s+/g, " ").trim(); }
        function lower(value) { return clean(value).toLowerCase(); }
        function wait(ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); }
        function isObject(value) { return value && typeof value === "object" && !Array.isArray(value); }
        function docDate(value) {
          if (!value) return "";
          if (value.toDate) return value.toDate().toLocaleString();
          if (typeof value.seconds === "number") return new Date(value.seconds * 1000).toLocaleString();
          return clean(value);
        }
        function deepValues(source, keys, maxDepth, out) {
          out = out || [];
          if (!source || out.length > 80 || maxDepth < 0) return out;
          if (Array.isArray(source)) {
            source.slice(0, 12).forEach(function (item) { deepValues(item, keys, maxDepth - 1, out); });
            return out;
          }
          if (!isObject(source)) return out;
          Object.keys(source).forEach(function (key) {
            const value = source[key];
            if (keys.indexOf(lower(key)) >= 0 && typeof value !== "object") out.push(clean(value));
            if (isObject(value) || Array.isArray(value)) deepValues(value, keys, maxDepth - 1, out);
          });
          return out;
        }
        function firstValue(source, keys) {
          const wanted = keys.map(lower);
          const values = deepValues(source, wanted, 5, []).filter(Boolean);
          return values[0] || "";
        }
        function firstUrl(source, keys, mediaType) {
          const wanted = keys.map(lower);
          const values = deepValues(source, wanted, 5, []).filter(Boolean);
          const urls = values.filter(function (value) { return /^(https?:\/\/|data:image\/|data:video\/|blob:)/i.test(value); });
          if (mediaType === "video") return urls.find(function (value) { return /^(data:video\/|blob:)|\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(value); }) || "";
          if (mediaType === "image") return urls.find(function (value) { return !/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(value) && !/^data:video\//i.test(value); }) || "";
          return urls[0] || "";
        }
        function mediaFor(data) {
          const source = isObject(data && data.payload) ? Object.assign({}, data.payload, data) : (data || {});
          const mediaType = lower(firstValue(source, ["mediaType","resourceType","cloudinaryResourceType","type","kind"]));
          const video = firstUrl(source, ["video","videoSrc","videoUrl","clip","clipSrc","mediaSrc","src","url","secure_url"], "video") || (mediaType.indexOf("video") >= 0 ? firstUrl(source, ["mediaSrc","src","url","secure_url"], "") : "");
          const image = firstUrl(source, ["photoUrl","profilePhoto","profilePhotoSrc","photo","photoSrc","avatar","avatarSrc","logo","logoSrc","businessPhoto","businessPhotoSrc","coverSrc","image","imageSrc","thumbnailSrc","posterSrc","mediaSrc","src","url","secure_url"], "image");
          const ref = firstValue(source, ["photoPublicId","profilePhotoRef","photoRef","avatarRef","logoRef","businessPhotoRef","coverRef","imageRef","videoRef","mediaRef","cloudinaryPublicId","publicId","posterRef","thumbnailRef"]);
          return { image:image, video:video, ref:ref, kind:video ? "video" : (image ? "image" : "") };
        }
        function titleFor(data, fallback) {
          return firstValue(data, ["businessName","displayName","name","title","productName","productTitle","clipTitle","eventName","jobTitle","email","key"]) || fallback;
        }
        function statusFor(data) {
          return firstValue(data, ["reviewStatus","status","visibility","publicStatus"]) || (data && data.deleted ? "deleted" : "active");
        }
        function recordType(collection, data, path) {
          const source = isObject(data && data.payload) ? Object.assign({}, data.payload, data) : (data || {});
          const text = lower([collection, path, source.kind, source.type, source.itemKind, source.mediaType, source.sourceKey].join(" "));
          if (collection === "users") return "user";
          if (collection === "customerProfiles") return "customer";
          if (collection === "businessProfiles" || collection === "businessAccounts") return "business";
          if (collection === "businessApprovals") return "approval";
          if (collection === "appStorage") return "storage";
          if (collection === "businessAnalytics" || collection === "businessAnalyticsEvents" || collection === "analyticsEvents") return "analytics";
          if (text.indexOf("clip") >= 0 || text.indexOf("reel") >= 0 || text.indexOf("video") >= 0) return "clip";
          if (text.indexOf("product") >= 0) return "product";
          if (text.indexOf("job") >= 0 || text.indexOf("hiring") >= 0) return "job";
          if (text.indexOf("event") >= 0) return "event";
          if (text.indexOf("notification") >= 0) return "notification";
          if (collection === "publicBusinessContent" || collection === "businessContentItems") return "post";
          return "content";
        }
        function normalizeDoc(collection, doc) {
          const data = doc.data() || {};
          const path = doc.ref && doc.ref.path || collection + "/" + doc.id;
          const type = recordType(collection, data, path);
          const media = mediaFor(data);
          const payload = isObject(data.payload) ? data.payload : {};
          const title = titleFor(data, doc.id);
          return {
            id:"cloud:" + path,
            cloudPath:path,
            type:type,
            title:title,
            source:"Firestore " + path,
            status:statusFor(data),
            email:firstValue(data, ["email","ownerEmail","customerEmail","businessEmail","actorEmail"]),
            phone:firstValue(data, ["phone","businessPhone","mobile","mobileNumber"]),
            business:firstValue(data, ["businessName","business","sellerName"]) || payload.businessName || "",
            owner:firstValue(data, ["ownerUserId","uid","actorUid","ownerEmail"]),
            price:firstValue(data, ["price","priceText","amount"]),
            created:docDate(data.createdAt || data.createdAtIso || data.updatedAt || data.updatedAtIso || data.lastLoginAt),
            image:media.image,
            video:media.video,
            mediaRef:media.ref,
            mediaKind:media.kind,
            raw:data,
            open:type === "customer" ? "emy-customer-profile.html" : type === "business" ? "emy-business-profile.html" : type === "clip" ? "emy-customer-home.html#reels" : "emy-customer-home.html#feeds"
          };
        }
        function normalizeAuthUser(data) {
          const user = data && typeof data === "object" ? data : {};
          const firestore = user.firestore && typeof user.firestore === "object" ? user.firestore : {};
          const hasFirestore = !!(firestore.userDoc || firestore.customerProfile || firestore.businessProfile || firestore.businessAccount || firestore.businessApproval);
          return {
            id:"auth:" + clean(user.uid),
            authUid:clean(user.uid),
            cloudPath:"authUsers/" + clean(user.uid),
            type:"auth-user",
            title:clean(user.displayName || user.email || user.uid || "Auth user"),
            source:hasFirestore ? "Firebase Auth + Firestore" : "Firebase Auth only",
            status:clean(user.status) || (user.disabled ? "disabled" : hasFirestore ? "active" : "auth-only"),
            email:clean(user.email),
            phone:clean(user.phoneNumber),
            business:"",
            owner:clean(user.uid),
            provider:clean(user.provider),
            created:clean(user.createdAt || user.lastSignInAt),
            image:clean(user.photoURL || user.photoUrl),
            raw:user,
            open:""
          };
        }
        function ensurePanel() {
          let panel = document.querySelector("[data-admin-cloud-console]");
          if (!panel) {
            panel = document.createElement("section");
            panel.className = "admin-cloud-console";
            panel.dataset.adminCloudConsole = "1";
            const filters = document.querySelector(".filters");
            const root = document.querySelector("[data-root]");
            if (filters && filters.parentNode) filters.parentNode.insertBefore(panel, filters.nextSibling);
            else if (root && root.parentNode) root.parentNode.insertBefore(panel, root);
            else document.body.appendChild(panel);
          }
          const topActions = document.querySelector(".top-actions");
          if (topActions && !topActions.querySelector("[data-cloud-refresh]")) {
            const button = document.createElement("button");
            button.className = "btn";
            button.type = "button";
            button.dataset.cloudRefresh = "1";
            button.textContent = "Sync cloud data";
            topActions.appendChild(button);
          }
          return panel;
        }
        function typeGroup(row) {
          if (row.type === "auth-user") return "identities";
          if (peopleTypes.indexOf(row.type) >= 0) return "people";
          if (contentTypes.indexOf(row.type) >= 0) return "content";
          if (row.type === "storage") return "storage";
          if (row.type === "analytics") return "analytics";
          return "all";
        }
        function filteredCloudRecords() {
          const q = lower(document.querySelector("[data-search]") && document.querySelector("[data-search]").value || "");
          return cloud.records.filter(function (row) {
            const group = typeGroup(row);
            const tabOk = cloud.tab === "all" || cloud.tab === group || cloud.tab === row.type;
            const textOk = !q || lower(JSON.stringify(row)).indexOf(q) >= 0;
            return tabOk && textOk;
          });
        }
        function metric(label, value) {
          return '<article class="admin-cloud-metric"><small>' + esc(label) + '</small><strong>' + esc(value) + '</strong></article>';
        }
        function mediaMarkup(row) {
          const refText = clean(row && row.mediaRef);
          const refIsVideo = /^emy-video-ref:/i.test(refText) || /video|clip/.test(lower((row && row.mediaKind) || (row && row.type) || ""));
          const refSrc = refText ? cloudinaryFieldUrl(refText, refIsVideo ? "videoRef" : "imageRef") : "";
          const video = row.video || (refIsVideo ? refSrc : "");
          const image = row.image || (!refIsVideo ? refSrc : "");
          if (video) return '<span class="admin-cloud-media"><video src="' + esc(video) + '" muted playsinline preload="metadata"></video></span>';
          if (image) return '<span class="admin-cloud-media"><img src="' + esc(image) + '" alt="" /></span>';
          return '<span class="admin-cloud-media">' + esc((row.type || "EM").slice(0, 2).toUpperCase()) + '</span>';
        }
        function tag(text, tone) {
          return '<span class="admin-cloud-tag ' + esc(tone || "") + '">' + esc(text || "-") + '</span>';
        }
        function cloudFieldLabel(key, value) {
          const text = clean(value);
          if (!text) return "";
          const field = lower(key);
          const mediaKey = /image|photo|avatar|logo|cover|poster|thumb|thumbnail|media|video|clip|ref|src/.test(field);
          if (/^data:video\//i.test(text) || (mediaKey && /^(data:video\/|blob:)|\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(text))) return "Uploaded video";
          if (/^data:image\//i.test(text) || (mediaKey && (/^(https?:\/\/|data:image\/|blob:)/i.test(text) || /\.(jpg|jpeg|png|gif|webp|avif|svg)(\?|#|$)/i.test(text)))) return "Uploaded image";
          if (mediaKey && (text.indexOf("emy-video-ref:") === 0 || /video|clip/.test(field))) return "Video reference saved";
          if (mediaKey && (text.indexOf("emy-ref:") === 0 || text.indexOf("emy/") === 0 || text.length > 80)) return "Image reference saved";
          if (/^data:/i.test(text) || /base64,[A-Za-z0-9+/=]{60,}/i.test(text)) return "Uploaded media";
          return "";
        }
        function cloudinaryFieldUrl(value, key) {
          let text = clean(value);
          if (!text) return "";
          if (/^(https?:\/\/|data:image\/|data:video\/|blob:)/i.test(text)) return text;
          let forcedVideo = false;
          if (/^emy-video-ref:/i.test(text)) {
            text = text.replace(/^emy-video-ref:/i, "");
            forcedVideo = true;
          } else if (/^emy-ref:/i.test(text)) {
            text = text.replace(/^emy-ref:/i, "");
          }
          if (text.indexOf("emy/") !== 0) return "";
          const type = forcedVideo || /video|clip/.test(lower(key)) ? "video" : "image";
          return "https://res.cloudinary.com/dupytlsjv/" + type + "/upload/" + text;
        }
        function cloudFieldMediaMarkup(key, value) {
          const src = cloudinaryFieldUrl(value, key);
          if (!src) return "";
          const field = lower(key);
          const type = /^data:video\//i.test(src) || /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(src) || /video|clip/.test(field) ? "video" : "image";
          const label = cloudFieldLabel(key, value) || (type === "video" ? "Uploaded video" : "Uploaded image");
          if (type === "video") return '<span class="admin-cloud-field-media"><video src="' + esc(src) + '" controls playsinline preload="metadata"></video><small>' + esc(label) + '</small></span>';
          return '<span class="admin-cloud-field-media"><img src="' + esc(src) + '" alt="' + esc(label) + '" /><small>' + esc(label) + '</small></span>';
        }
        function cloudFieldMarkup(key, value) {
          const media = cloudFieldMediaMarkup(key, value);
          if (media) return media;
          const label = cloudFieldLabel(key, value);
          const text = label || clean(value);
          const display = text.length > 220 ? text.slice(0, 180) + "..." : text;
          return label ? '<span class="tag good">' + esc(display) + '</span>' : esc(display);
        }
        function canDeleteCloudRecord(row) {
          return row && (row.authUid || row.cloudPath) && String(row.cloudPath || "").indexOf("adminAuditLogs/") !== 0;
        }
        function shouldDeleteAuthWithRecord(row) {
          return !!(row && (row.authUid || row.type === "auth-user" || row.type === "user" || row.type === "customer" || row.type === "business"));
        }
        function card(row) {
          const meta = [row.email, row.phone, row.business, row.owner, row.price].filter(Boolean).join(" | ") || row.source;
          const sourceTone = row.source.indexOf("Firestore") === 0 || row.source.indexOf("Firebase Auth") === 0 ? "good" : "";
          const statusTone = /delete|hidden|reported|reject/i.test(row.status) ? "bad" : /active|approved|live|public/i.test(row.status) ? "good" : "";
          const deleteButton = canDeleteCloudRecord(row) ? '<button class="danger" type="button" data-cloud-delete="' + esc(row.id) + '">Delete</button>' : '';
          return '<article class="admin-cloud-card">' + mediaMarkup(row) + '<div class="admin-cloud-copy"><h3>' + esc(row.title || "Cloud record") + '</h3><p>' + esc(meta) + '</p><div class="admin-cloud-tags">' + tag(row.type) + tag(row.status, statusTone) + tag(row.source, sourceTone) + (row.mediaRef ? tag("media ref") : "") + '</div></div><div class="admin-cloud-card-actions"><button type="button" data-cloud-view="' + esc(row.id) + '">Details</button>' + deleteButton + '</div></article>';
        }
        function renderCloudPanel() {
          const panel = ensurePanel();
          const rows = filteredCloudRecords();
          const people = cloud.records.filter(function (row) { return typeGroup(row) === "people"; }).length;
          const authUsers = cloud.records.filter(function (row) { return row.type === "auth-user"; }).length;
          const content = cloud.records.filter(function (row) { return typeGroup(row) === "content"; }).length;
          const storage = cloud.records.filter(function (row) { return row.type === "storage"; }).length;
          const media = cloud.records.filter(function (row) { return row.image || row.video || row.mediaRef; }).length;
          const status = cloud.loading ? "Loading Firebase admin data..." : cloud.error ? cloud.error : cloud.loaded ? ("Cloud connected as " + (cloud.session && cloud.session.email || adminEmail) + ". Loaded " + cloud.records.length + " records" + (cloud.lastLoaded ? " at " + cloud.lastLoaded : "") + ".") : "Cloud data has not been loaded yet.";
          panel.innerHTML = '<div class="admin-cloud-head"><span><h2>Cloud admin console</h2><p>Firebase identities, customers, businesses, profile images, posts, videos, storage rows, and raw Firestore records.</p></span><div class="admin-cloud-actions"><button type="button" data-cloud-refresh>Refresh cloud</button><button class="primary" type="button" data-cloud-tab="all">Show all</button></div></div><div class="admin-cloud-body"><div class="admin-cloud-status">' + esc(status) + (cloud.errors.length ? '<br>Skipped: ' + esc(cloud.errors.join(" | ")) : '') + '</div><div class="admin-cloud-metrics">' + metric("People", people) + metric("Auth users", authUsers) + metric("Content", content) + metric("Raw storage", storage) + '</div><div class="admin-cloud-tabs">' + ["all","identities","people","content","storage","analytics"].map(function (tab) { return '<button class="admin-cloud-tab ' + (cloud.tab === tab ? 'is-active' : '') + '" type="button" data-cloud-tab="' + esc(tab) + '">' + esc(tab) + '</button>'; }).join("") + '</div><div class="admin-cloud-list">' + (rows.length ? rows.slice(0, 220).map(card).join("") : '<div class="admin-cloud-empty">No cloud records match this filter yet. Sign in as the admin account, then press Refresh cloud.</div>') + '</div></div>';
        }
        async function backendReady() {
          let lastError = "";
          for (let attempt = 0; attempt < 48; attempt += 1) {
            try {
              if (window.emyRealAuth && window.emyRealAuth.ready) {
                const ctx = await window.emyRealAuth.ready();
                if (ctx && ctx.db && ctx.auth) return ctx;
              }
            } catch (error) {
              lastError = error && error.message || String(error || "");
            }
            await wait(250);
          }
          throw new Error(lastError || "Firebase backend is not ready yet.");
        }
        async function readCollection(ctx, name, collection, output) {
          try {
            const snap = await ctx.db.collection(collection).limit(500).get();
            snap.forEach(function (doc) { output.push(normalizeDoc(name, doc)); });
          } catch (error) {
            cloud.errors.push(collection + ": " + clean(error && error.message || error));
          }
        }
        async function readGroup(ctx, name, group, output) {
          try {
            if (!ctx.db.collectionGroup) return;
            const snap = await ctx.db.collectionGroup(group).limit(500).get();
            snap.forEach(function (doc) { output.push(normalizeDoc(name, doc)); });
          } catch (error) {
            cloud.errors.push(group + " group: " + clean(error && error.message || error));
          }
        }
        async function readAuthUsers(ctx, output) {
          try {
            if (!ctx.functions || !ctx.functions.httpsCallable) {
              cloud.errors.push("Firebase Auth users: callable backend not available");
              return;
            }
            const callable = ctx.functions.httpsCallable("adminListAuthUsers");
            let pageToken = "";
            let loaded = 0;
            do {
              const response = await callable({ maxResults:1000, pageToken:pageToken });
              const payload = response && response.data || {};
              const users = Array.isArray(payload.users) ? payload.users : [];
              users.forEach(function (user) { output.push(normalizeAuthUser(user)); });
              loaded += users.length;
              pageToken = clean(payload.nextPageToken);
            } while (pageToken && loaded < 3000);
          } catch (error) {
            cloud.errors.push("Firebase Auth users: " + clean(error && error.message || error));
          }
        }
        function dedupe(rows) {
          const seen = {};
          return rows.filter(function (row) {
            if (!row || seen[row.id]) return false;
            seen[row.id] = true;
            return true;
          });
        }
        async function loadCloudRecords() {
          if (cloud.loading) return;
          cloud.loading = true;
          cloud.error = "";
          cloud.errors = [];
          renderCloudPanel();
          try {
            const ctx = await backendReady();
            const user = ctx.auth.currentUser;
            if (!user) throw new Error("Sign in first, then open this admin page with the EMY admin account.");
            const session = window.emyRealAuth && window.emyRealAuth.currentSession ? await window.emyRealAuth.currentSession().catch(function () { return null; }) : null;
            cloud.session = session || { uid:user.uid, email:user.email, isAdmin:lower(user.email) === adminEmail };
            if (lower(user.email) !== adminEmail && !(cloud.session && cloud.session.isAdmin)) {
              throw new Error("You are signed in as " + (user.email || "another account") + ". Only " + adminEmail + " can see all backend records.");
            }
            const rows = [];
            await readCollection(ctx, "users", "users", rows);
            await readCollection(ctx, "customerProfiles", "customerProfiles", rows);
            await readCollection(ctx, "businessProfiles", "businessProfiles", rows);
            await readCollection(ctx, "businessAccounts", "businessAccounts", rows);
            await readCollection(ctx, "businessApprovals", "businessApprovals", rows);
            await readCollection(ctx, "publicBusinessContent", "publicBusinessContent", rows);
            await readCollection(ctx, "businessAnalytics", "businessAnalytics", rows);
            await readCollection(ctx, "analyticsEvents", "analyticsEvents", rows);
            await readCollection(ctx, "adminAuditLogs", "adminAuditLogs", rows);
            await readGroup(ctx, "appStorage", "appStorage", rows);
            await readGroup(ctx, "businessContentItems", "items", rows);
            await readGroup(ctx, "businessAnalyticsEvents", "events", rows);
            await readAuthUsers(ctx, rows);
            cloud.records = dedupe(rows);
            cloud.loaded = true;
            cloud.lastLoaded = new Date().toLocaleTimeString();
            try { localStorage.setItem("emyAdminCloudRecordCount", String(cloud.records.length)); } catch (error) {}
          } catch (error) {
            cloud.error = clean(error && error.message || error);
          } finally {
            cloud.loading = false;
            renderCloudPanel();
          }
        }
        function findCloudRecord(id) {
          return cloud.records.find(function (row) { return row.id === id; });
        }
        function openCloudDetails(id) {
          const row = findCloudRecord(id);
          const modal = document.querySelector("[data-modal]");
          const title = document.querySelector("[data-modal-title]");
          const body = document.querySelector("[data-modal-body]");
          if (!row || !modal || !title || !body) return;
          title.textContent = row.title || "Cloud record";
          const media = row.video ? '<div class="admin-cloud-detail-media"><video src="' + esc(row.video) + '" controls playsinline preload="metadata"></video></div>' : row.image ? '<div class="admin-cloud-detail-media"><img src="' + esc(row.image) + '" alt="" /></div>' : '';
          const fields = ["type","status","email","phone","business","owner","provider","price","created","cloudPath","mediaRef"].map(function (key) {
            return row[key] ? '<div class="detail"><b>' + esc(key) + '</b><span>' + cloudFieldMarkup(key, row[key]) + '</span></div>' : "";
          }).join("");
          const deleteButton = canDeleteCloudRecord(row) ? '<div class="record-actions"><button class="danger" type="button" data-cloud-delete="' + esc(row.id) + '">Delete this cloud record</button></div>' : '<div class="admin-cloud-status">Audit log records are read-only so the admin trail remains intact.</div>';
          body.innerHTML = media + '<div class="detail-grid">' + fields + '</div><details class="raw-block"><summary>Raw JSON</summary><textarea class="textarea" readonly>' + esc(JSON.stringify(row.raw || row, null, 2)) + '</textarea></details>' + deleteButton;
          modal.hidden = false;
        }
        async function fallbackDelete(ctx, row) {
          if (row.authUid) throw new Error("Firebase Auth user deletion needs the deployed admin function.");
          const ref = ctx.db.doc(row.cloudPath);
          const user = ctx.auth.currentUser;
          const stamp = window.firebase && firebase.firestore && firebase.firestore.FieldValue ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString();
          if (row.type === "customer") {
            const uid = row.owner || row.cloudPath.split("/")[1];
            await ctx.db.collection("customerProfiles").doc(uid).delete().catch(function () {});
            await ctx.db.collection("users").doc(uid).delete().catch(function () {});
            return;
          }
          if (row.type === "business") {
            const uid = row.owner || row.cloudPath.split("/")[1];
            await ctx.db.collection("businessProfiles").doc(uid).delete().catch(function () {});
            await ctx.db.collection("businessAccounts").doc(uid).delete().catch(function () {});
            await ctx.db.collection("businessApprovals").doc(uid).delete().catch(function () {});
            return;
          }
          if (row.type === "storage") {
            await ref.delete();
            return;
          }
          await ref.set({ deleted:true, hidden:true, deletedAt:stamp, deletedAtIso:new Date().toISOString(), deletedBy:user && user.uid || "", deletedByEmail:user && user.email || "" }, { merge:true });
        }
        async function deleteCloudRecord(id) {
          const row = findCloudRecord(id);
          if (!row) return;
          const ok = window.confirm((row.authUid ? "Delete this Firebase identity from Firebase Auth?" : "Delete this EMY backend record?") + "\\n\\n" + (row.title || row.email || row.cloudPath) + "\\n\\nThis removes the account from the admin-visible backend and unblocks the email for signup.");
          if (!ok) return;
          try {
            const ctx = await backendReady();
            let usedFunction = false;
            if (ctx.functions && ctx.functions.httpsCallable) {
              try {
                if (row.authUid) {
                  const callable = ctx.functions.httpsCallable("adminDeleteAuthUser");
                  await callable({ uid:row.authUid, email:row.email || "", deleteRelatedContent:true });
                } else {
                  const callable = ctx.functions.httpsCallable("adminDeleteRecord");
                  await callable({ path:row.cloudPath, kind:row.type, title:row.title, uid:row.owner || "", deleteRelatedContent:true, deleteAuthUser:shouldDeleteAuthWithRecord(row) });
                }
                usedFunction = true;
              } catch (error) {
                const message = clean(error && error.message || error);
                cloud.errors.push((row.authUid ? "adminDeleteAuthUser" : "adminDeleteRecord") + ": " + message);
                if (row.authUid) throw new Error("Firebase identity was not deleted. " + message + " Deploy adminDeleteAuthUser, then try again.");
              }
            }
            if (row.authUid && !usedFunction) throw new Error("Firebase identity was not deleted because adminDeleteAuthUser is not available.");
            if (!usedFunction) await fallbackDelete(ctx, row);
            cloud.records = cloud.records.filter(function (item) { return item.id !== id; });
            try {
              const audit = JSON.parse(localStorage.getItem("emyAdminAuditLog") || "[]");
              audit.unshift({ id:"cloud-delete-" + Date.now(), actor:"Cloud admin", action:"deleted cloud record", title:row.title, recordId:row.cloudPath, createdAt:new Date().toLocaleString(), status:"logged" });
              localStorage.setItem("emyAdminAuditLog", JSON.stringify(audit.slice(0, 80)));
            } catch (error) {}
            const modal = document.querySelector("[data-modal]");
            if (modal) modal.hidden = true;
            renderCloudPanel();
          } catch (error) {
            cloud.error = "Delete failed: " + clean(error && error.message || error);
            renderCloudPanel();
          }
        }
        document.addEventListener("click", function (event) {
          const tab = event.target.closest("[data-cloud-tab]");
          if (tab) {
            cloud.tab = tab.dataset.cloudTab || "all";
            renderCloudPanel();
            return;
          }
          const refresh = event.target.closest("[data-cloud-refresh]");
          if (refresh || (event.target.closest("[data-action]") && event.target.closest("[data-action]").dataset.action === "refresh")) {
            loadCloudRecords();
          }
          const view = event.target.closest("[data-cloud-view]");
          if (view) openCloudDetails(view.dataset.cloudView);
          const del = event.target.closest("[data-cloud-delete]");
          if (del) deleteCloudRecord(del.dataset.cloudDelete);
        });
        const search = document.querySelector("[data-search]");
        if (search) search.addEventListener("input", renderCloudPanel);
        window.addEventListener("emy:cloud-public-content-synced", function () { loadCloudRecords(); });
        ensurePanel();
        renderCloudPanel();
        window.setTimeout(loadCloudRecords, 900);
      })();
    </script>`;

function patchAdminCloudConsole(html) {
  let next = String(html || '')
    .replace(/\n?\s*<!-- emy-admin-cloud-console:start -->[\s\S]*?<!-- emy-admin-cloud-console:end -->/g, '')
    .replace(/\n?\s*<style data-emy-admin-cloud-console-style>[\s\S]*?<\/style>/g, '')
    .replace(/\n?\s*<script data-emy-admin-cloud-console>[\s\S]*?<\/script>/g, '')
    .replace(/\n?\s*<link rel="stylesheet" href="assets\/[^"]+" data-emy-admin-cloud-console-style\s*\/?>/g, '')
    .replace(/\n?\s*<script src="assets\/[^"]+" data-emy-admin-cloud-console><\/script>/g, '');
  if (!next.includes('</body>')) return next;
  const payload = [
    '    <!-- emy-admin-cloud-console:start -->',
    ASSETS.adminCloudConsoleStyle,
    ASSETS.adminCloudConsoleScript,
    '    <!-- emy-admin-cloud-console:end -->'
  ].join('\n');
  return next.replace('</body>', payload + '\n  </body>');
}

function patchHomeCarouselVisibleItemCounter(html) {
  const patched = `function homeCarouselVisibleItems(list) {
          if (!list) return [];
          const cardSelector = ".product-card,.feed-product-card,.post-card,.social-feed-card,.reel-card,.feed-card,.home-created-card,.home-flow-item,[data-feed-id],[data-card]";
          return Array.from(list.children).filter((item) => {
            if (!item || item.hidden) return false;
            if (item.matches && item.matches("[hidden]")) return false;
            if (item.matches && item.matches("[data-emy-real-empty],.emy-real-empty")) return false;
            return !!(item.matches && item.matches(cardSelector));
          });
        }`;
  return String(html || '').replace(
    /function homeCarouselVisibleItems\(list\) \{\s*if \(!list\) return \[\];\s*return Array\.from\(list\.children\)\.filter\(\(item\) => \{\s*if \(!item \|\| item\.hidden\) return false;\s*if \(item\.matches && item\.matches\("\[hidden\]"\)\) return false;\s*return true;\s*\}\);\s*\}/g,
    patched
  );
}

const sharedNotificationRouterScript = String.raw`
    <script data-emy-notification-router>
      (function () {
        const VERSION = "2026-06-07-central-router";
        if (window.emyNotificationRouter && window.emyNotificationRouter.version === VERSION) return;

        const FOCUS_KEY = "emyNotificationFocusRequest";
        const CATEGORY = { CHAT: true, POST_COMMENT: true, PRODUCT_COMMENT: true, SYSTEM: true };
        const ROUTE_PARAM_KEYS = ["notificationAction", "feedId", "postId", "productId", "item", "kind", "comment", "message", "thread", "customer", "notifications"];

        function clean(value) {
          return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
        }

        function lower(value) {
          return clean(value).toLowerCase();
        }

        function first(values) {
          const list = Array.isArray(values) ? values : [values];
          for (const value of list) {
            const text = clean(value);
            if (text) return text;
          }
          return "";
        }

        function safeParseJson(value, fallback) {
          try {
            const parsed = JSON.parse(value || "null");
            return parsed == null ? fallback : parsed;
          } catch (error) {
            return fallback;
          }
        }

        function readArray(key) {
          const rows = safeParseJson(localStorage.getItem(key), []);
          return Array.isArray(rows) ? rows : [];
        }

        function writeArray(key, rows) {
          try { localStorage.setItem(key, JSON.stringify(rows)); } catch (error) {}
        }

        function refObject(raw) {
          return raw && raw.ref && typeof raw.ref === "object" ? raw.ref : {};
        }

        function detailObject(raw) {
          if (raw && raw.detailSnapshot && typeof raw.detailSnapshot === "object") return raw.detailSnapshot;
          if (raw && typeof raw.detailSnapshot === "string") return safeParseJson(raw.detailSnapshot, {});
          return {};
        }

        function categoryFromRaw(raw) {
          const ref = refObject(raw);
          const detail = detailObject(raw);
          const explicit = clean(raw && raw.category).toUpperCase();
          if (CATEGORY[explicit]) return explicit;
          const text = lower([
            raw && raw.type,
            raw && raw.action,
            raw && raw.kind,
            raw && raw.itemKind,
            raw && raw.detailKind,
            raw && raw.title,
            raw && raw.body,
            ref.kind,
            ref.detailKind,
            detail.kind,
            detail.detailKind
          ].join(" "));
          if (/customer-message|direct-message|\bmessage\b|\bchat\b|\bdm\b/.test(text)) return "CHAT";
          if (/product/.test(text) && /comment|reply|review/.test(text)) return "PRODUCT_COMMENT";
          if (/comment|reply/.test(text)) return "POST_COMMENT";
          return "SYSTEM";
        }

        function normalizeActivity(notification) {
          const raw = notification && typeof notification === "object" ? notification : {};
          const ref = refObject(raw);
          const detail = detailObject(raw);
          const category = categoryFromRaw(raw);
          const targetId = first([
            raw.targetId,
            raw.messageId,
            raw.chatMessageId,
            raw.businessMessageId,
            raw.customerMessageId,
            raw.commentId,
            raw.replyId,
            raw.feedCommentId,
            raw.itemProductCommentId,
            raw.clipCommentId,
            ref.targetId,
            ref.messageId,
            ref.commentId,
            detail.targetId,
            detail.commentId,
            raw.id
          ]);
          const parentByCategory = category === "CHAT"
            ? [raw.parentId, raw.threadId, raw.groupChatId, raw.customerKey, ref.customerKey, detail.customerKey, raw.businessKey, ref.businessKey, detail.businessKey]
            : category === "PRODUCT_COMMENT"
              ? [raw.parentId, raw.productId, raw.businessProductId, raw.feedId, raw.itemId, raw.postId, ref.productId, ref.businessProductId, ref.feedId, ref.id, detail.productId, detail.feedId, detail.id]
              : [raw.parentId, raw.postId, raw.feedId, raw.itemId, raw.productId, ref.postId, ref.feedId, ref.id, detail.postId, detail.feedId, detail.id];
          return {
            id: first([raw.id, targetId]),
            category,
            targetId,
            parentId: first(parentByCategory),
            currentUrlState: raw.currentUrlState || window.location.search || "",
            raw
          };
        }

        function isBusinessContext(activity) {
          const params = new URLSearchParams(window.location.search || "");
          const path = lower(window.location.pathname);
          const mode = lower(params.get("mode"));
          const view = lower(params.get("view"));
          const raw = activity && activity.raw || {};
          if (lower(raw.context || raw.profileMode || raw.ownerMode) === "business") return true;
          if (path.indexOf("emy-business-profile.html") >= 0) {
            if (view === "customer") return false;
            if (params.get("setup") === "1" || view === "business") return true;
            if (["business", "statistics", "services", "chat", "customers", "upload", "profile", "edit"].includes(mode)) return true;
            return !params.has("view");
          }
          return lower(localStorage.getItem("emyMainSignedInRole")) === "business" && path.indexOf("emy-customer-") === -1;
        }

        function currentBusinessKey() {
          const params = new URLSearchParams(window.location.search || "");
          const draft = safeParseJson(localStorage.getItem("emyBusinessProfileDraft"), {});
          return first([
            params.get("business"),
            localStorage.getItem("emySelectedBusinessProfileKey"),
            draft && (draft.key || draft.businessKey || draft.name || draft.businessName),
            localStorage.getItem("emyBusinessDisplayName"),
            localStorage.getItem("emyBusinessName")
          ]);
        }

        function paramsFromState(activity) {
          const params = new URLSearchParams(window.location.search || "");
          const state = activity && activity.currentUrlState;
          if (typeof state === "string" && clean(state)) {
            const text = state.indexOf("?") >= 0 ? state.slice(state.indexOf("?") + 1) : state;
            new URLSearchParams(text).forEach((value, key) => params.set(key, value));
          } else if (state && typeof state === "object") {
            Object.keys(state).forEach((key) => {
              const value = state[key];
              if (value == null || value === "") params.delete(key);
              else params.set(key, String(value));
            });
          }
          ROUTE_PARAM_KEYS.forEach((key) => params.delete(key));
          return params;
        }

        function routeWithState(page, routeParams, hash, activity) {
          const params = paramsFromState(activity);
          Object.keys(routeParams || {}).forEach((key) => {
            const value = routeParams[key];
            if (value == null || value === "") params.delete(key);
            else params.set(key, String(value));
          });
          const query = params.toString();
          return page + (query ? "?" + query : "") + (hash || "");
        }

        function notificationInboxRoute(activity) {
          if (isBusinessContext(activity)) {
            return routeWithState("emy-business-profile.html", { mode: "business", view: null, notifications: "1" }, "#notifications", activity);
          }
          return routeWithState("emy-customer-home.html", { mode: null, view: null, notifications: "1" }, "#notifications", activity);
        }

        function safeAppHref(href) {
          const text = clean(href);
          if (!text || text === "#") return "";
          if (/^(?:javascript|data):/i.test(text)) return "";
          if (/^https?:\/\//i.test(text)) {
            try {
              const url = new URL(text);
              if (url.origin !== window.location.origin) return "";
              return url.pathname.split("/").pop() + url.search + url.hash;
            } catch (error) {
              return "";
            }
          }
          return text;
        }

        function storePendingFocus(activity, route) {
          const payload = {
            id: activity.id,
            category: activity.category,
            parentId: activity.parentId,
            targetId: activity.targetId,
            route,
            createdAt: Date.now()
          };
          try { localStorage.setItem(FOCUS_KEY, JSON.stringify(payload)); } catch (error) {}
        }

        function storePendingItem(activity) {
          if (activity.category !== "POST_COMMENT" && activity.category !== "PRODUCT_COMMENT") return;
          const raw = activity.raw || {};
          const ref = refObject(raw);
          const detail = detailObject(raw);
          const parentId = activity.parentId;
          const payload = Object.assign({}, detail, ref, {
            id: first([parentId, detail.id, ref.id]),
            feedId: first([parentId, raw.feedId, raw.postId, raw.productId, ref.feedId, detail.feedId]),
            productId: activity.category === "PRODUCT_COMMENT" ? first([parentId, raw.productId, ref.productId, detail.productId]) : first([raw.productId, ref.productId, detail.productId]),
            title: first([raw.itemTitle, raw.productTitle, raw.postTitle, raw.title, ref.title, ref.detailTitle, detail.title, detail.detailTitle]),
            detailKind: activity.category === "PRODUCT_COMMENT" ? "Product" : "Post"
          });
          try { localStorage.setItem("emyPendingItemDetailOpen", JSON.stringify(payload)); } catch (error) {}
        }

        function buildRoute(activity) {
          const raw = activity.raw || {};
          const ref = refObject(raw);
          const detail = detailObject(raw);
          const business = isBusinessContext(activity);
          const businessKey = first([raw.businessKey, ref.businessKey, detail.businessKey, currentBusinessKey()]);
          const itemTitle = first([raw.itemTitle, raw.productTitle, raw.postTitle, raw.title, ref.title, ref.detailTitle, detail.title, detail.detailTitle]);

          if (activity.category === "CHAT") {
            const threadId = business
              ? first([raw.parentId, raw.threadId, raw.groupChatId, raw.customerKey, ref.customerKey, detail.customerKey, activity.parentId])
              : first([raw.parentId, raw.threadId, raw.groupChatId, raw.businessKey, ref.businessKey, detail.businessKey, activity.parentId]);
            if (!threadId) throw new Error("CHAT notification is missing parentId/thread id.");
            const messageId = first([activity.targetId, raw.messageId, raw.chatMessageId, raw.id]);
            if (business) {
              return routeWithState("emy-business-profile.html", {
                mode: "chat",
                view: null,
                business: businessKey,
                customer: threadId,
                thread: threadId,
                message: messageId
              }, "", activity);
            }
            return routeWithState("emy-customer-chat.html", {
              mode: null,
              view: null,
              business: threadId,
              thread: threadId,
              message: messageId
            }, "", activity);
          }

          if (activity.category === "POST_COMMENT" || activity.category === "PRODUCT_COMMENT") {
            if (!activity.parentId) throw new Error(activity.category + " notification is missing parentId.");
            if (!activity.targetId) throw new Error(activity.category + " notification is missing targetId.");
            const isProduct = activity.category === "PRODUCT_COMMENT";
            storePendingItem(activity);
            if (business) {
              return routeWithState("emy-business-profile.html", {
                mode: "business",
                view: null,
                business: businessKey,
                notificationAction: "comment",
                feedId: activity.parentId,
                postId: isProduct ? null : activity.parentId,
                productId: isProduct ? activity.parentId : null,
                item: itemTitle,
                kind: isProduct ? "Product" : "Post",
                comment: activity.targetId
              }, "", activity);
            }
            return routeWithState(isProduct ? "emy-customer-search.html" : "emy-customer-home.html", {
              mode: null,
              view: null,
              notificationAction: "comment",
              feedId: activity.parentId,
              postId: isProduct ? null : activity.parentId,
              productId: isProduct ? activity.parentId : null,
              item: itemTitle,
              kind: isProduct ? "Product" : "Post",
              comment: activity.targetId
            }, isProduct ? "#products" : "#feeds", activity);
          }

          return safeAppHref(raw.href) || notificationInboxRoute(activity);
        }

        function logRoutingError(notification, error) {
          try {
            console.error("[EMY notifications] Broken notification route", { notification, error: error && (error.stack || error.message) || error });
          } catch (ignored) {}
        }

        function handleNotificationClick(notification) {
          const activity = normalizeActivity(notification);
          try {
            const route = buildRoute(activity);
            storePendingFocus(activity, route);
            window.location.href = route;
            return route;
          } catch (error) {
            logRoutingError(notification, error);
            const fallback = notificationInboxRoute(activity);
            window.location.href = fallback;
            return fallback;
          }
        }

        function cssEscape(value) {
          const text = clean(value);
          if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(text);
          return text.replace(/["\\]/g, "\\$&");
        }

        function focusSelectorFor(request) {
          const target = cssEscape(request.targetId);
          const parent = cssEscape(request.parentId);
          const selectors = [];
          if (target) {
            selectors.push('[data-message-id="' + target + '"]');
            selectors.push('[data-business-chat-message-id="' + target + '"]');
            selectors.push('[data-item-product-chat-message-id="' + target + '"]');
            selectors.push('[data-comment-id="' + target + '"]');
            selectors.push('[data-feed-comment-id="' + target + '"]');
            selectors.push('[data-item-product-comment-id="' + target + '"]');
            selectors.push('[data-clip-comment-id="' + target + '"]');
            selectors.push('[data-clip-comment-reply-item="' + target + '"]');
          }
          if (parent) {
            selectors.push('[data-feed-id="' + parent + '"]');
            selectors.push('[data-business-product-id="' + parent + '"]');
            selectors.push('[data-product-id="' + parent + '"]');
          }
          return selectors.join(",");
        }

        function focusStoredRequest() {
          const request = safeParseJson(localStorage.getItem(FOCUS_KEY), null);
          if (!request || !request.createdAt || Date.now() - Number(request.createdAt) > 15 * 60 * 1000) return;
          const selector = focusSelectorFor(request);
          if (!selector) return;
          const target = document.querySelector(selector);
          if (!target) return;
          document.querySelectorAll(".is-notification-target").forEach((node) => node.classList.remove("is-notification-target"));
          target.classList.add("is-notification-target");
          if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
          if (target.scrollIntoView) target.scrollIntoView({ behavior: "smooth", block: "center" });
          try { target.focus({ preventScroll: true }); } catch (error) {}
          try { localStorage.removeItem(FOCUS_KEY); } catch (error) {}
        }

        function notificationRows(key) {
          return readArray(key).filter((item) => item && typeof item === "object");
        }

        function findStoredNotification(id, preferBusiness) {
          const keys = preferBusiness ? ["emyBusinessNotifications", "emyCustomerNotifications"] : ["emyCustomerNotifications", "emyBusinessNotifications"];
          for (const key of keys) {
            const match = notificationRows(key).find((item) => clean(item.id) === id);
            if (match) return { key, item: match };
          }
          return null;
        }

        function markRead(key, id) {
          if (!key || !id) return;
          const rows = notificationRows(key);
          let changed = false;
          const next = rows.map((item) => {
            if (clean(item.id) !== id) return item;
            changed = true;
            return Object.assign({}, item, { read: true, unread: false });
          });
          if (changed) writeArray(key, next);
        }

        function openRow(row, event) {
          const isBusinessRow = row.hasAttribute("data-business-notification-id");
          const id = clean(row.getAttribute(isBusinessRow ? "data-business-notification-id" : "data-notification-id"));
          const stored = findStoredNotification(id, isBusinessRow);
          if (event) {
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
          }
          if (!stored) {
            handleNotificationClick({ id, category: "SYSTEM", currentUrlState: window.location.search });
            return;
          }
          markRead(stored.key, id);
          handleNotificationClick(stored.item);
        }

        document.addEventListener("click", function (event) {
          if (!event.target || !event.target.closest) return;
          if (event.target.closest("[data-notification-action],[data-business-notification-action],[data-notification-menu],[data-notification-menu-panel]")) return;
          const row = event.target.closest("[data-business-notification-id],[data-notification-id]");
          if (row) openRow(row, event);
        }, true);

        document.addEventListener("keydown", function (event) {
          if (event.key !== "Enter" && event.key !== " ") return;
          if (!event.target || !event.target.closest) return;
          const row = event.target.closest("[data-business-notification-id],[data-notification-id]");
          if (row) openRow(row, event);
        }, true);

        [120, 500, 1200, 2400].forEach((delay) => window.setTimeout(focusStoredRequest, delay));
        window.addEventListener("load", function () { window.setTimeout(focusStoredRequest, 120); });

        window.emyNotificationRouter = {
          version: VERSION,
          normalizeActivity,
          buildRoute,
          handleNotificationClick,
          notificationInboxRoute,
          focusStoredRequest
        };
        window.handleNotificationClick = handleNotificationClick;
      })();
    </script>`;

const sharedBusinessVideoPopupControlsScript = String.raw`
    <style data-emy-business-video-popup-controls>
      .item-detail-modal [data-emy-video-player] .emy-video-controls,
      [data-item-detail-modal] [data-emy-video-player] .emy-video-controls,
      .gallery-modal [data-emy-video-player] .emy-video-controls,
      [data-gallery-modal] [data-emy-video-player] .emy-video-controls {
        opacity: 1 !important;
        pointer-events: auto !important;
        transform: translateY(0) !important;
      }
    </style>`;


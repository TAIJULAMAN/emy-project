function setupFeedCreateFlow(addCreatedFeedItem, getCreatedActorName) {
          const createOpenButtons = Array.from(document.querySelectorAll("[data-feed-create-open]"));
          const createMenu = document.querySelector("[data-feed-create-menu]");
          if (!createMenu || createMenu.dataset.bound === "1") return;
          createMenu.dataset.bound = "1";
          const createClose = document.querySelector("[data-feed-create-close]");
          const createChoices = Array.from(document.querySelectorAll("[data-feed-create-choice]"));
          const clipFrameSheet = document.querySelector("[data-feed-clip-frame-sheet]");
          const clipFrameClose = document.querySelector("[data-feed-clip-frame-close]");
          const clipFrameCancel = document.querySelector("[data-feed-clip-frame-cancel]");
          const clipFrameContinue = document.querySelector("[data-feed-clip-frame-continue]");
          const clipFrameChoices = Array.from(document.querySelectorAll("[data-feed-clip-frame-choice]"));
          const clipKindChoices = Array.from(document.querySelectorAll("[data-feed-clip-kind-choice]"));
          const postSheet = document.querySelector("[data-feed-post-sheet]");
          const postClose = document.querySelector("[data-feed-post-close]");
          const postText = document.querySelector("[data-feed-post-text]");
          const postSubmit = document.querySelector("[data-feed-post-submit]");
          const postModeButtons = Array.from(document.querySelectorAll("[data-feed-post-mode]"));
          const postModeTabs = postModeButtons.length ? postModeButtons[0].closest(".feed-post-kind-tabs") : null;
          const postAddPhoto = document.querySelector("[data-feed-post-add-photo]");
          const postAddClip = document.querySelector("[data-feed-post-add-clip]");
          const postPhotoFile = document.querySelector("[data-feed-post-photo-file]");
          const postClipFile = document.querySelector("[data-feed-post-clip-file]");
          const postMediaPreview = document.querySelector("[data-feed-post-media]");
          const postMediaImage = document.querySelector("[data-feed-post-media-image]");
          const postMediaVideo = document.querySelector("[data-feed-post-media-video]");
          const postEditMedia = document.querySelector("[data-feed-post-edit-media]");
          const postRemoveMedia = document.querySelector("[data-feed-post-remove-media]");
          const postHelp = document.querySelector("[data-feed-post-help]");
          const clipProductFields = document.querySelector("[data-feed-clip-product-fields]");
          const clipProductName = document.querySelector("[data-feed-clip-product-name]");
          const clipProductCurrency = document.querySelector("[data-feed-clip-product-currency]");
          const clipProductPrice = document.querySelector("[data-feed-clip-product-price]");
          const clipProductAvailability = document.querySelector("[data-feed-clip-product-availability]");
          const clipProductCategory = document.querySelector("[data-feed-clip-product-category]");
          const clipProductDescription = document.querySelector("[data-feed-clip-product-description]");
          const postSourceSheet = document.querySelector("[data-feed-post-source-sheet]");
          const postSourceClose = document.querySelector("[data-feed-post-source-close]");
          const postSourceButtons = Array.from(document.querySelectorAll("[data-feed-post-source]"));
          const postSourceTitle = document.querySelector("[data-feed-post-source-title]");
          const postSourceHelp = document.querySelector("[data-feed-post-source-help]");
          const postSourceLibraryTitle = document.querySelector("[data-feed-post-source-library-title]");
          const postSourceLibraryHelp = document.querySelector("[data-feed-post-source-library-help]");
          const postSourceCameraTitle = document.querySelector("[data-feed-post-source-camera-title]");
          const postSourceCameraHelp = document.querySelector("[data-feed-post-source-camera-help]");
          const postCameraSheet = document.querySelector("[data-feed-post-camera-sheet]");
          const postCameraTitle = document.querySelector("[data-feed-post-camera-title]");
          const postCameraCopy = document.querySelector("[data-feed-post-camera-copy]");
          const postCameraFrame = document.querySelector("[data-feed-post-camera-frame]");
          const postCameraPreview = document.querySelector("[data-feed-post-camera-preview]");
          const postCameraSound = document.querySelector("[data-feed-post-camera-sound]");
          const postCameraAudio = document.querySelector("[data-feed-post-camera-audio]");
          const postCameraTimer = document.querySelector("[data-feed-post-camera-timer]");
          const postCameraStatus = document.querySelector("[data-feed-post-camera-status]");
          const postCameraActions = document.querySelector("[data-feed-post-camera-actions]");
          const postCameraClose = document.querySelector("[data-feed-post-camera-close]");
          const postCameraCancel = document.querySelector("[data-feed-post-camera-cancel]");
          const postCameraCapture = document.querySelector("[data-feed-post-camera-capture]");
          const postCameraStop = document.querySelector("[data-feed-post-camera-stop]");
          const eventSheet = document.querySelector("[data-feed-event-sheet]");
          const eventClose = document.querySelector("[data-feed-event-close]");
          const eventName = document.querySelector("[data-feed-event-name]");
          const eventLink = document.querySelector("[data-feed-event-link]");
          const eventTypeInputs = Array.from(document.querySelectorAll("[data-feed-event-type]"));
          const eventStartDate = document.querySelector("[data-feed-event-start-date]");
          const eventStartTime = document.querySelector("[data-feed-event-start-time]");
          const eventIntro = document.querySelector("[data-feed-event-intro]");
          const eventDescription = document.querySelector("[data-feed-event-description]");
          const eventNext = document.querySelector("[data-feed-event-next]");
          const eventPreviewType = document.querySelector("[data-feed-event-preview-type]");
          const eventPreviewTitle = document.querySelector("[data-feed-event-preview-title]");
          const eventPreviewMeta = document.querySelector("[data-feed-event-preview-meta]");
          const eventPreview = document.querySelector("[data-feed-event-preview], .feed-event-preview");
          const eventCoverImage = document.querySelector("[data-feed-event-cover-image]");
          const eventCoverButton = document.querySelector("[data-feed-event-cover]");
          const eventCoverEdit = document.querySelector("[data-feed-event-cover-edit]");
          const eventCoverRemove = document.querySelector("[data-feed-event-cover-remove]");
          const eventCoverFile = document.querySelector("[data-feed-event-cover-file]");
          const hiringSheet = document.querySelector("[data-feed-hiring-sheet]");
          const hiringClose = document.querySelector("[data-feed-hiring-close]");
          const hiringCompany = document.querySelector("[data-feed-hiring-company]");
          const hiringTitle = document.querySelector("[data-feed-hiring-title]");
          const hiringWorkplace = document.querySelector("[data-feed-hiring-workplace]");
          const hiringLocation = document.querySelector("[data-feed-hiring-location]");
          const hiringEmployment = document.querySelector("[data-feed-hiring-employment]");
          const hiringExperience = document.querySelector("[data-feed-hiring-experience]");
          const hiringIntro = document.querySelector("[data-feed-hiring-intro]");
          const hiringDescription = document.querySelector("[data-feed-hiring-description]");
          const hiringApply = document.querySelector("[data-feed-hiring-apply]");
          const hiringNotes = document.querySelector("[data-feed-hiring-notes]");
          const hiringCoverPreview = document.querySelector("[data-feed-job-cover-preview]");
          const hiringCoverImage = document.querySelector("[data-feed-job-cover-image]");
          const hiringCoverVideo = document.querySelector("[data-feed-job-cover-video]");
          const hiringCoverTitle = document.querySelector("[data-feed-job-cover-title]");
          const hiringCoverAdd = document.querySelector("[data-feed-job-cover-add]");
          const hiringCoverEdit = document.querySelector("[data-feed-job-cover-edit]");
          const hiringCoverRemove = document.querySelector("[data-feed-job-cover-remove]");
          const hiringCoverFile = document.querySelector("[data-feed-job-cover-file]");
          const hiringSave = document.querySelector("[data-feed-hiring-save]");
          const hiringPreview = document.querySelector("[data-feed-hiring-preview]");
          const hiringContinue = document.querySelector("[data-feed-hiring-continue]");
          const hiringPreviewSheet = document.querySelector("[data-feed-hiring-preview-sheet]");
          const hiringPreviewClose = document.querySelector("[data-feed-hiring-preview-close]");
          const hiringPreviewCard = document.querySelector("[data-feed-hiring-preview-card]");
          const hiringPreviewEdit = document.querySelector("[data-feed-hiring-preview-edit]");
          const hiringPreviewPost = document.querySelector("[data-feed-hiring-preview-post]");
          const jobApplySheet = document.querySelector("[data-feed-job-apply-sheet]");
          const jobApplyClose = document.querySelector("[data-feed-job-apply-close]");
          const jobApplyCancel = document.querySelector("[data-feed-job-apply-cancel]");
          const jobApplySubmit = document.querySelector("[data-feed-job-apply-submit]");
          const jobApplyBusiness = document.querySelector("[data-feed-job-apply-business]");
          const jobApplyJob = document.querySelector("[data-feed-job-apply-job]");
          const jobApplyMeta = document.querySelector("[data-feed-job-apply-meta]");
          const jobApplyMessage = document.querySelector("[data-feed-job-apply-message]");
          const jobApplyCv = document.querySelector("[data-feed-job-apply-cv]");
          const jobApplyFile = document.querySelector("[data-feed-job-apply-file]");
          const jobApplyFileInput = document.querySelector("[data-feed-job-apply-file-input]");
          const jobApplyFileName = document.querySelector("[data-feed-job-apply-file-name]");
          const jobApplyProfile = document.querySelector("[data-feed-job-apply-profile]");
          const jobApplyConsent = document.querySelector("[data-feed-job-apply-consent]");
          const jobApplicantsSheet = document.querySelector("[data-feed-job-applicants-sheet]");
          const jobApplicantsTitle = document.querySelector("[data-feed-job-applicants-title]");
          const jobApplicantsSubtitle = document.querySelector("[data-feed-job-applicants-subtitle]");
          const jobApplicantsCount = document.querySelector("[data-feed-job-applicants-count]");
          const jobApplicantsList = document.querySelector("[data-feed-job-applicants-list]");
          const jobApplicantsCloseButtons = Array.from(document.querySelectorAll("[data-feed-job-applicants-close]"));
          const articleEditor = document.querySelector("[data-feed-article-editor]");
          const articleClose = document.querySelector("[data-feed-article-close]");
          const articleTitle = document.querySelector("[data-feed-article-title]");
          const articleBody = document.querySelector("[data-feed-article-body]");
          const articleNext = document.querySelector("[data-feed-article-next]");
          const articlePublish = document.querySelector("[data-feed-article-publish]");
          const articlePublishClose = document.querySelector("[data-feed-article-publish-close]");
          const articleShare = document.querySelector("[data-feed-article-share]");
          const articlePublishSubmit = document.querySelector("[data-feed-article-publish-submit]");
          const articlePreviewTitle = document.querySelector("[data-feed-article-preview-title]");
          const articlePreviewCopy = document.querySelector("[data-feed-article-preview-copy]");
          const articlePreviewCover = document.querySelector("[data-feed-article-preview-cover]");
          const articlePreviewMeta = document.querySelector("[data-feed-article-preview-meta]");
          const articleStatus = document.querySelector("[data-feed-article-status]");
          const articleReadTime = document.querySelector("[data-feed-article-read-time]");
          const articleCover = document.querySelector("[data-feed-article-cover]");
          const articleCoverFile = document.querySelector("[data-feed-article-cover-file]");
          const discardSheet = document.querySelector("[data-feed-discard-sheet]");
          const discardBackButtons = Array.from(document.querySelectorAll("[data-feed-discard-back]"));
          const discardConfirm = document.querySelector("[data-feed-discard-confirm]");
          let activePostMode = "update";
          let activeClipFrame = "original";
          let pendingClipFrame = "phone";
          let activeClipKind = "business";
          let pendingClipKind = "business";
          let pendingClipDraft = null;
          let postIsClipComposer = false;
          let postMediaSrc = "";
          let postMediaRef = "";
          let postMediaType = "";
          let postMediaSettings = window.emyDefaultMediaEditSettings ? window.emyDefaultMediaEditSettings("image") : { fit:"contain", zoom:1, x:0, y:0, aspect:"auto", overlay:"" };
          let postMediaSaving = false;
          let postMediaSaveCount = 0;
          let postSubmitQueuedUntilMediaReady = false;
          let postQueuedUploadId = "";
          let postQueuedUploadBody = "";
          let postSubmitScheduled = false;
          let postUploadProgressLastValue = -1;
          let postUploadProgressLastTime = 0;
          let postPrepareNoticeTimer = 0;
          let postPrepareTimeoutTimer = 0;
          let postMediaItems = [];
          let postActiveMediaIndex = 0;
          let pendingPostSourceType = "image";
          let postCameraMode = "image";
          let postCameraStream = null;
          let postMediaRecorder = null;
          let postRecordedChunks = [];
          let postRecordingCancelled = false;
          let postRecordingTimer = null;
          let postRecordingStart = 0;
          let postRecordedWithAudio = false;
          function handleFeedCreatePostSubmitClick(event) {
            const target = event && event.target && event.target.closest ? event.target.closest("[data-feed-post-submit]") : null;
            if (!target || target.disabled || target.getAttribute("aria-disabled") === "true") return;
            stopFeedCreateEvent(event);
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
            scheduleSubmitPost(event);
          }
          if (!window.__EMY_FEED_CREATE_POST_SUBMIT_CAPTURE_BOUND__) {
            window.__EMY_FEED_CREATE_POST_SUBMIT_CAPTURE_BOUND__ = true;
            document.addEventListener("click", handleFeedCreatePostSubmitClick, true);
          }
          let hiringEditingId = "";
          let hiringDraftId = "";
          let hiringCoverSrc = "";
          let hiringCoverRef = "";
          let hiringCoverType = "";
          let hiringCoverSettings = null;
          let hiringCoverSaving = false;
          let hiringCoverPendingPromise = null;
          let hiringCoverPendingAction = "";
          let hiringCoverSaveToken = 0;
          let feedEditingId = "";
          let feedEditingCreatedAt = "";
          let feedEditingKind = "";
          let activeJobApplyCard = null;
          let activeJobApplyButton = null;
          let activeJobApplyFileName = "";
          let activeJobApplyFileRecord = null;
          let activeJobApplyFileSavePromise = null;
          let activeJobApplyFileSaveFailed = false;
          let activeJobApplicantsRows = [];
          const JOB_APPLICANTS_BATCH_SIZE = 10;
          let activeJobApplicantsVisibleCount = JOB_APPLICANTS_BATCH_SIZE;
          let eventCoverSrc = "";
          let eventCoverRef = "";
          let eventCoverSettings = eventCoverDefaultSettings();
          let eventCoverSaving = false;
          let articleMediaSrc = "";
          let articleMediaRef = "";
          let articleMediaType = "";
          let articleMediaSaving = false;
          function actorName() {
            if (feedCreateActorRole() === "business") {
              const profile = readFeedCreateJson("emyBusinessProfileDraft", {});
              return String(profile.businessName || profile.name || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || (typeof getCreatedActorName === "function" && getCreatedActorName()) || "Your Business").trim() || "Your Business";
            }
            return (typeof getCreatedActorName === "function" && getCreatedActorName()) || "HireNest";
          }
          function escapeHtml(value) {
            return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;"
            })[char] || char);
          }
          function setOpen(sheet, isOpen) {
            if (!sheet) return;
            sheet.classList.toggle("is-open", !!isOpen);
            sheet.setAttribute("aria-hidden", isOpen ? "false" : "true");
          }
          function readFeedCreateJson(key, fallback) {
            try {
              const parsed = JSON.parse(localStorage.getItem(key) || "null");
              return parsed && typeof parsed === "object" ? parsed : fallback;
            } catch (error) {
              return fallback;
            }
          }
          function feedCreateAskDraftTarget(value) {
            const clean = String(value || "").trim().toLowerCase();
            if (/hiring|job|role|vacanc/.test(clean)) return "job";
            if (/clip|reel|video/.test(clean)) return "clip";
            if (/event/.test(clean)) return "event";
            if (/article|blog/.test(clean)) return "article";
            return "post";
          }
          function feedCreateAskDraftChoice(target) {
            if (target === "job") return "hiring";
            if (target === "event" || target === "article") return target;
            return "post";
          }
          function feedCreateAskDraftMatchesTarget(draft, target) {
            if (!draft || typeof draft !== "object") return false;
            const draftTarget = feedCreateAskDraftTarget(draft.target || draft.entity || draft.type || draft.label || "");
            return draftTarget === target;
          }
          function feedCreateFlattenAskDraft(draft) {
            if (!draft || typeof draft !== "object") return null;
            const fields = draft.fields && typeof draft.fields === "object" && !Array.isArray(draft.fields) ? draft.fields : {};
            return Object.assign({}, draft, fields, { askDraft: draft });
          }
          function feedCreateReadAskActionDraft(target) {
            const cleanTarget = feedCreateAskDraftTarget(target);
            const keys = ["emyAskActionDraft:" + cleanTarget, "emyAskActionLatestDraft"];
            for (const key of keys) {
              const draft = readFeedCreateJson(key, null);
              if (!draft || typeof draft !== "object") continue;
              const scope = String(draft.scope || "").trim().toLowerCase();
              if (scope && scope !== "customer") continue;
              if (key !== "emyAskActionLatestDraft" || feedCreateAskDraftMatchesTarget(draft, cleanTarget)) return draft;
            }
            return null;
          }
          function feedCreateClearAskActionDraft(target, draft) {
            const cleanTarget = feedCreateAskDraftTarget(target);
            try { localStorage.removeItem("emyAskActionDraft:" + cleanTarget); } catch (error) {}
            try {
              const latest = readFeedCreateJson("emyAskActionLatestDraft", null);
              if (!draft || !latest || !latest.id || latest.id === draft.id || feedCreateAskDraftMatchesTarget(latest, cleanTarget)) {
                localStorage.removeItem("emyAskActionLatestDraft");
              }
            } catch (error) {}
          }
          function feedCreateDropAskDraftParam() {
            try {
              const url = new URL(window.location.href);
              if (!url.searchParams.has("askDraft")) return;
              url.searchParams.delete("askDraft");
              window.history.replaceState(null, "", url.pathname + url.search + url.hash);
            } catch (error) {}
          }
          function feedCreateApplyAskActionDraftFromQuery() {
            try {
              const params = new URLSearchParams(window.location.search || "");
              const rawTarget = params.get("askDraft");
              if (!rawTarget || feedCreateActorRole() !== "customer") return false;
              const target = feedCreateAskDraftTarget(rawTarget);
              const draft = feedCreateFlattenAskDraft(feedCreateReadAskActionDraft(target));
              window.setTimeout(() => {
                if (target === "clip") {
                  openClipFramePicker(null, { askDraft: draft || {}, defaultKind: "business" });
                } else {
                  window.emyOpenFeedCreateChoice(feedCreateAskDraftChoice(target), draft || {}, null);
                }
                if (draft && draft.askDraft) feedCreateClearAskActionDraft(target, draft.askDraft);
                feedCreateDropAskDraftParam();
              }, 140);
              return true;
            } catch (error) {
              return false;
            }
          }
          function feedCreateOwnsBusinessParam(value) {
            const requested = feedCreateSlug(value);
            if (!requested) return false;
            const profile = readFeedCreateJson("emyBusinessProfileDraft", {});
            const hasBusinessProfile = !!(
              localStorage.getItem("emyBusinessProfileDraft") ||
              localStorage.getItem("emyBusinessProfilePhoto") ||
              localStorage.getItem("emyBusinessProfilePhotoSrc") ||
              localStorage.getItem("emyBusinessProfilePhotoRef") ||
              localStorage.getItem("emyBusinessDisplayName") ||
              localStorage.getItem("emyBusinessName") ||
              localStorage.getItem("emyBusinessProfileKey") ||
              localStorage.getItem("emyBusinessKey") ||
              profile.businessName ||
              profile.name ||
              profile.businessKey ||
              profile.key ||
              profile.slug
            );
            if (!hasBusinessProfile) return false;
            const candidates = [
              profile.businessKey,
              profile.key,
              profile.slug,
              localStorage.getItem("emyBusinessProfileKey"),
              localStorage.getItem("emyBusinessKey"),
              profile.businessName,
              profile.name,
              localStorage.getItem("emyBusinessDisplayName"),
              localStorage.getItem("emyBusinessName"),
              "profile",
              "business-profile"
            ].map((candidate) => feedCreateSlug(candidate)).filter(Boolean);
            return candidates.indexOf(requested) !== -1;
          }
          function feedCreateActorRole() {
            try {
              const params = new URLSearchParams(window.location.search || "");
              const mode = String(params.get("mode") || "").trim().toLowerCase();
              const path = String(window.location.pathname || "").toLowerCase();
              if (mode === "business" || mode === "customer") return mode;
              if (/emy-customer-/i.test(path)) return "customer";
              if (/emy-business-profile\.html/i.test(path)) {
                const view = String(params.get("view") || "").toLowerCase();
                if (params.get("setup") === "1" || view === "business" || ["business", "statistics", "services", "chat", "customers", "upload", "profile", "edit"].includes(mode)) return "business";
                if (view !== "customer" && params.has("business") && feedCreateOwnsBusinessParam(params.get("business"))) return "business";
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
          function feedCreateSlug(value) {
            return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          }
          function feedCreateBusinessKey() {
            if (feedCreateActorRole() !== "business") return "customer-profile";
            const profile = readFeedCreateJson("emyBusinessProfileDraft", {});
            const name = profile.businessName || profile.name || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || actorName();
            return feedCreateSlug(profile.businessKey || profile.key || profile.slug || localStorage.getItem("emyBusinessProfileKey") || localStorage.getItem("emyBusinessKey") || name) || "profile";
          }
          function feedCreateProfileHref() {
            if (feedCreateActorRole() === "business") return "emy-business-profile.html?business=" + encodeURIComponent(feedCreateBusinessKey());
            return "emy-customer-profile.html";
          }
          function applyFeedCreateOwnership(payload) {
            if (!payload || typeof payload !== "object") return payload;
            const role = feedCreateActorRole();
            const actor = actorName();
            payload.owner = role;
            payload.createdAs = role;
            payload.accountType = role;
            payload.actorType = role;
            payload.role = role;
            payload.authorRole = role;
            payload.source = payload.source || (role === "business" ? "business-create" : "customer-create");
            payload.profileHref = feedCreateProfileHref();
            if (role === "business") {
              const key = feedCreateBusinessKey();
              payload.businessKey = key;
              payload.key = key;
              payload.profileKey = key;
              payload.businessName = payload.businessName || payload.business || actor;
              payload.business = payload.business || actor;
              payload.name = payload.name || actor;
              payload.actor = actor;
            } else {
              payload.businessKey = "customer-profile";
              payload.key = "customer-profile";
              payload.profileKey = "customer-profile";
              payload.business = payload.business || actor;
              payload.name = payload.name || actor;
              payload.actor = actor;
            }
            return payload;
          }
          function feedCreateDefaultCrop() {
            return { zoom: 100, x: 50, y: 50 };
          }
          function feedCreateMediaText(value) {
            return String(value || "").trim();
          }
          function feedCreateLooksMediaSrc(value) {
            const clean = feedCreateMediaText(value);
            return /^(data:image\/|blob:|https?:\/\/|file:|\/|\.{1,2}\/|assets\/)/i.test(clean);
          }
          function feedCreateLooksMediaRef(value) {
            const clean = feedCreateMediaText(value);
            if (!clean || feedCreateLooksMediaSrc(clean)) return false;
            return /^emy-media-|^business-|^customer-|^profile-|^media-/i.test(clean);
          }
          function feedCreateFirstMediaSrc(values) {
            for (const value of values || []) {
              const clean = feedCreateMediaText(value);
              if (clean && feedCreateLooksMediaSrc(clean)) return clean;
            }
            return "";
          }
          function feedCreateFirstMediaRef(values) {
            for (const value of values || []) {
              const clean = feedCreateMediaText(value);
              if (clean && feedCreateLooksMediaRef(clean)) return clean;
            }
            return "";
          }
          function feedCreateCloudinaryCloudName() {
            const backendConfig = window.EMY_REAL_BACKEND_CONFIG && window.EMY_REAL_BACKEND_CONFIG.cloudinary;
            const authConfig = window.emyRealAuth && window.emyRealAuth.config && window.emyRealAuth.config.cloudinary;
            return feedCreateMediaText((backendConfig && backendConfig.cloudName) || (authConfig && authConfig.cloudName) || "dupytlsjv") || "dupytlsjv";
          }
          function feedCreateCloudinaryMediaUrl(publicId, type) {
            let clean = feedCreateMediaText(publicId);
            if (!clean) return "";
            if (/^(https?:\/\/|data:image\/|data:video\/|blob:)/i.test(clean)) return clean;
            clean = clean.replace(/^emy-video-ref:/i, "").replace(/^emy-ref:/i, "");
            if (!clean || feedCreateLooksMediaRef(clean)) return "";
            const resource = String(type || "").toLowerCase() === "video" ? "video" : "image";
            return "https://res.cloudinary.com/" + encodeURIComponent(feedCreateCloudinaryCloudName()) + "/" + resource + "/upload/" + clean.split("/").map((part) => encodeURIComponent(part)).join("/");
          }
          function feedCreateCloudinaryVideoPosterUrl(publicId) {
            let clean = feedCreateMediaText(publicId);
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
            if (!clean || feedCreateLooksMediaRef(clean)) return "";
            return "https://res.cloudinary.com/" + encodeURIComponent(feedCreateCloudinaryCloudName()) + "/video/upload/so_0.2,f_jpg/" + clean.split("/").map((part) => encodeURIComponent(part)).join("/") + ".jpg";
          }
          function feedCreateCloudinaryPosterUrl(publicId, posterPublicId, type) {
            const explicitPoster = feedCreateCloudinaryMediaUrl(posterPublicId, "image");
            if (explicitPoster) return explicitPoster;
            return String(type || "").toLowerCase() === "video" ? feedCreateCloudinaryVideoPosterUrl(publicId) : "";
          }
          function feedCreatePromoteStoredMediaRef(src, ref) {
            let nextSrc = feedCreateMediaText(src);
            let nextRef = feedCreateMediaText(ref);
            if (!nextRef && feedCreateLooksMediaRef(nextSrc)) {
              nextRef = nextSrc;
              nextSrc = "";
            }
            return { src: nextSrc, ref: nextRef };
          }
          function normaliseFeedCreateMediaPayload(payload) {
            if (!payload || typeof payload !== "object") return payload;
            const mediaItems = Array.isArray(payload.mediaItems) ? payload.mediaItems : [];
            const first = mediaItems[0] && typeof mediaItems[0] === "object" ? mediaItems[0] : null;
            const firstType = first && (first.type || first.mediaType || first.cloudinaryResourceType || first.resourceType) || "";
            const firstPublicId = first && (first.cloudinaryPublicId || first.mediaPublicId || first.imagePublicId || first.videoPublicId || first.publicId) || "";
            const firstPosterPublicId = first && (first.cloudinaryPosterPublicId || first.posterPublicId || first.thumbnailPublicId) || "";
            if (!payload.mediaType && firstType) payload.mediaType = String(firstType).toLowerCase() === "video" ? "video" : "image";
            if (!payload.mediaRef && first) payload.mediaRef = first.ref || first.mediaRef || first.imageRef || first.videoRef || "";
            if (!payload.mediaSrc && first) payload.mediaSrc = first.src || first.mediaSrc || first.image || first.video || first.url || "";
            const payloadPromoted = feedCreatePromoteStoredMediaRef(payload.mediaSrc, payload.mediaRef);
            payload.mediaSrc = payloadPromoted.src;
            payload.mediaRef = payloadPromoted.ref;
            if (first) {
              const firstPromoted = feedCreatePromoteStoredMediaRef(
                first.src || first.mediaSrc || first.image || first.video || first.url || "",
                first.ref || first.mediaRef || first.imageRef || first.videoRef || ""
              );
              first.src = firstPromoted.src;
              first.ref = firstPromoted.ref;
              first.mediaSrc = firstPromoted.src;
              first.mediaRef = firstPromoted.ref;
            }
            if (!payload.cloudinaryPublicId) payload.cloudinaryPublicId = firstPublicId || "";
            if (!payload.cloudinaryResourceType && first) payload.cloudinaryResourceType = first.cloudinaryResourceType || first.resourceType || first.mediaResourceType || payload.mediaType || "";
            const resourceType = payload.cloudinaryResourceType || payload.mediaType || firstType;
            const uploadedSrc = feedCreateCloudinaryMediaUrl(payload.cloudinaryPublicId, resourceType);
            const uploadedPosterSrc = feedCreateCloudinaryPosterUrl(payload.cloudinaryPublicId, payload.cloudinaryPosterPublicId || firstPosterPublicId, resourceType);
            if (!payload.mediaSrc && !payload.mediaRef && uploadedSrc) payload.mediaSrc = uploadedSrc;
            if (!payload.posterSrc && !payload.posterRef && uploadedPosterSrc) {
              payload.posterSrc = uploadedPosterSrc;
              payload.thumbnailSrc = uploadedPosterSrc;
            }
            if (first && !first.src && !first.mediaSrc && !first.ref && !first.mediaRef && uploadedSrc) {
              first.src = uploadedSrc;
              first.type = payload.mediaType || (String(resourceType).toLowerCase() === "video" ? "video" : "image");
              first.cloudinaryPublicId = payload.cloudinaryPublicId || first.cloudinaryPublicId || "";
              first.cloudinaryResourceType = payload.cloudinaryResourceType || first.cloudinaryResourceType || first.type;
            }
            if (first && !first.posterSrc && !first.thumbnailSrc && !first.posterRef && !first.thumbnailRef && uploadedPosterSrc) {
              first.posterSrc = uploadedPosterSrc;
              first.thumbnailSrc = uploadedPosterSrc;
              if (payload.cloudinaryPosterPublicId || firstPosterPublicId) first.cloudinaryPosterPublicId = payload.cloudinaryPosterPublicId || firstPosterPublicId;
            }
            if (payload.mediaType === "image" && !payload.image && payload.mediaSrc) payload.image = payload.mediaSrc;
            if (payload.mediaType === "video" && !payload.video && payload.mediaSrc) payload.video = payload.mediaSrc;
            return payload;
          }
          function feedCreateCustomerMediaSet() {
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
            ].map((value) => feedCreateMediaText(value)).filter(Boolean));
          }
          function feedCreateBusinessOnlyMedia(values) {
            const customerMedia = feedCreateCustomerMediaSet();
            return (Array.isArray(values) ? values : []).map((value) => feedCreateMediaText(value)).filter((value) => value && !customerMedia.has(value));
          }
          function normaliseFeedCreateCrop(crop) {
            const source = crop && typeof crop === "object" ? crop : {};
            return {
              zoom: Math.min(260, Math.max(100, Number(source.zoom) || 100)),
              x: Math.min(100, Math.max(0, Number(source.x) || 50)),
              y: Math.min(100, Math.max(0, Number(source.y) || 50))
            };
          }
          function feedCreateActorPhoto() {
            try {
              const role = feedCreateActorRole();
              if (role === "business") {
                const profile = readFeedCreateJson("emyBusinessProfileDraft", {});
                return feedCreateFirstMediaSrc(feedCreateBusinessOnlyMedia([
                  localStorage.getItem("emyBusinessProfilePhoto"),
                  localStorage.getItem("emyBusinessProfilePhotoSrc"),
                  localStorage.getItem("emyMainPendingSignupBusinessPhoto"),
                  profile.profilePhoto,
                  profile.profilePhotoSrc,
                  profile.photo,
                  profile.photoSrc
                ]));
              }
              const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
              return feedCreateFirstMediaSrc([
                localStorage.getItem("emyCustomerProfilePhoto"),
                localStorage.getItem("emyCustomerProfilePhotoSrc"),
                pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhoto") : "",
                pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoSrc") : ""
              ]);
            } catch (error) {
              return "";
            }
          }
          function feedCreateActorPhotoRef() {
            try {
              const role = feedCreateActorRole();
              if (role === "business") {
                const profile = readFeedCreateJson("emyBusinessProfileDraft", {});
                return feedCreateFirstMediaRef(feedCreateBusinessOnlyMedia([
                  localStorage.getItem("emyBusinessProfilePhotoRef"),
                  localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"),
                  profile.profilePhotoRef,
                  profile.photoRef,
                  localStorage.getItem("emyBusinessProfilePhoto"),
                  localStorage.getItem("emyBusinessProfilePhotoSrc"),
                  localStorage.getItem("emyMainPendingSignupBusinessPhoto"),
                  profile.profilePhoto,
                  profile.profilePhotoSrc,
                  profile.photo,
                  profile.photoSrc
                ]));
              }
              const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
              return feedCreateFirstMediaRef([
                localStorage.getItem("emyCustomerProfilePhotoRef"),
                pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "",
                localStorage.getItem("emyCustomerProfilePhoto"),
                localStorage.getItem("emyCustomerProfilePhotoSrc")
              ]);
            } catch (error) {
              return "";
            }
          }
          function feedCreateActorCrop() {
            try {
              const role = feedCreateActorRole();
              if (role === "business") return normaliseFeedCreateCrop(readFeedCreateJson("emyBusinessProfilePhotoCrop", feedCreateDefaultCrop()));
              const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
              return normaliseFeedCreateCrop(readFeedCreateJson("emyCustomerProfilePhotoCrop", pendingRole === "customer" ? readFeedCreateJson("emyMainPendingSignupPhotoCrop", feedCreateDefaultCrop()) : feedCreateDefaultCrop()));
            } catch (error) {
              return feedCreateDefaultCrop();
            }
          }
          function feedCreateAvatarInitial(name) {
            return (String(name || "S").trim().charAt(0) || "S").toUpperCase();
          }
          function showFeedCreateAvatarInitial(node, name) {
            node.innerHTML = "";
            node.textContent = feedCreateAvatarInitial(name);
            node.dataset.feedAvatarState = "initial";
          }
          function renderFeedCreateAvatar(node, name, photo, photoRef, crop) {
            if (!node) return;
            showFeedCreateAvatarInitial(node, name);
            if (!photo && !photoRef) return;
            const image = document.createElement("img");
            image.hidden = true;
            image.alt = "";
            const reveal = () => {
              if (!image.parentElement) return;
              image.hidden = false;
              node.dataset.feedAvatarState = "image";
            };
            const fallback = () => {
              if (image.parentElement === node) image.remove();
              showFeedCreateAvatarInitial(node, name);
            };
            image.addEventListener("load", reveal, { once: true });
            image.addEventListener("error", fallback, { once: true });
            if (photo) image.src = photo;
            if (photoRef) image.dataset.emyMediaRef = photoRef;
            node.appendChild(image);
            applyFeedCreateCrop(image, crop);
            if (photoRef && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(node);
            window.setTimeout(() => {
              if (!image.parentElement || !image.hidden) return;
              if ((image.currentSrc || image.src) && image.complete && image.naturalWidth > 0) reveal();
              else if (!image.currentSrc && !image.src) fallback();
            }, 3000);
          }
          function applyFeedCreateCrop(image, crop) {
            const clean = normaliseFeedCreateCrop(crop);
            const overflow = clean.zoom - 100;
            image.style.objectFit = "cover";
            image.style.objectPosition = clean.x + "% " + clean.y + "%";
            image.style.width = clean.zoom + "%";
            image.style.height = clean.zoom + "%";
            image.style.left = (-overflow * (clean.x / 100)).toFixed(3) + "%";
            image.style.top = (-overflow * (clean.y / 100)).toFixed(3) + "%";
            image.style.right = "auto";
            image.style.bottom = "auto";
          }
          function syncActorLabels() {
            const name = actorName();
            document.querySelectorAll("[data-feed-create-actor], [data-feed-article-actor], [data-feed-article-publish-actor]").forEach((node) => {
              node.textContent = name;
            });
            const photo = feedCreateActorPhoto();
            const photoRef = feedCreateActorPhotoRef();
            const crop = feedCreateActorCrop();
            document.querySelectorAll("[data-feed-actor-avatar]").forEach((node) => {
              renderFeedCreateAvatar(node, name, photo, photoRef, crop);
            });
            if (hiringCompany && !hiringCompany.value) hiringCompany.value = name;
          }
          function postModeCopy(mode) {
            if (mode === "question") return {
              placeholder: "Ask a question customers can reply to...",
              help: "Questions post into Feeds with comments ready for replies.",
              tag: "Question"
            };
            if (mode === "photo") return {
              placeholder: "Add a caption for your photo...",
              help: "Choose a photo, preview it, then post it to Feeds.",
              tag: "Photo"
            };
            if (mode === "video") return {
              placeholder: "Add a caption for your video...",
              help: "Choose or record a video, preview it, then post it to Feeds.",
              tag: "Video"
            };
            return {
              placeholder: "What are you sharing today?",
              help: "Write a quick update for Feeds.",
              tag: "Update"
            };
          }
          function normalisePostClipFrame(value) {
            return value === "phone" ? "phone" : "original";
          }
          function normalisePostClipKind(value) {
            return value === "product" ? "product" : "business";
          }
          function postClipFrameLabel(value) {
            return normalisePostClipFrame(value) === "phone" ? "Phone view" : "Original size";
          }
          function postClipKindLabel(value) {
            return normalisePostClipKind(value) === "product" ? "Product Clip" : "Business Clip";
          }
          const postProductCurrencies = ["GBP", "EUR", "USD"];
          const postProductCategories = ["Food and drink", "Retail", "Beauty and wellness", "Home services", "Technology", "Professional services", "Other"];
          const postProductCategoryAliases = {
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
          function postProductText(value, fallback) {
            const text = String(value || "").replace(/\s+/g, " ").trim();
            return text || (fallback || "");
          }
          function postProductCurrencyCode(value) {
            const code = postProductText(value).toUpperCase();
            return postProductCurrencies.includes(code) ? code : "GBP";
          }
          function postProductSanitisePriceInput(value) {
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
          function postProductNormalisePriceAmount(value) {
            const clean = postProductSanitisePriceInput(value);
            if (!clean) return "";
            const number = Number(clean);
            if (!Number.isFinite(number) || number < 0) return "";
            return number.toFixed(2);
          }
          function postProductFormatMoney(amount, currencyCode) {
            const number = Number(amount);
            if (!Number.isFinite(number) || number < 0) return "";
            const code = postProductCurrencyCode(currencyCode);
            const locale = code === "USD" ? "en-US" : (code === "EUR" ? "en-IE" : "en-GB");
            try {
              return new Intl.NumberFormat(locale, { style: "currency", currency: code, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
            } catch (error) {
              return code + " " + number.toFixed(2);
            }
          }
          function postProductPriceParts(value, fallbackCurrency) {
            const text = postProductText(value);
            let code = postProductCurrencyCode(fallbackCurrency);
            if (/\bEUR\b|\u20ac/i.test(text)) code = "EUR";
            if (/\bUSD\b|\$/i.test(text)) code = "USD";
            if (/\bGBP\b|\u00a3/i.test(text)) code = "GBP";
            const match = text.replace(/,/g, ".").match(/\d+(?:\.\d{1,2})?/);
            const amount = postProductNormalisePriceAmount(match && match[0] || value || "");
            return { amount, currencyCode: code, text: amount ? postProductFormatMoney(amount, code) : "" };
          }
          function postProductCategory(value) {
            const raw = postProductText(value);
            if (!raw) return "";
            const direct = postProductCategories.find((category) => category.toLowerCase() === raw.toLowerCase());
            if (direct) return direct;
            const key = raw.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
            return postProductCategoryAliases[key] || "";
          }
          function postProductPriceDisplay(details) {
            const source = details || {};
            return source.priceAmount ? postProductFormatMoney(source.priceAmount, source.currencyCode) : "Price to confirm";
          }
          function postClipProductDetails() {
            const rawPrice = clipProductPrice && clipProductPrice.value.trim() || "";
            const currencyCode = postProductCurrencyCode(clipProductCurrency && clipProductCurrency.value);
            const priceAmount = postProductNormalisePriceAmount(rawPrice);
            return {
              productName: clipProductName && clipProductName.value.trim() || "",
              rawPrice,
              priceAmount,
              currencyCode,
              currency: currencyCode,
              priceCurrency: currencyCode,
              priceText: priceAmount ? postProductFormatMoney(priceAmount, currencyCode) : "",
              availability: clipProductAvailability && clipProductAvailability.value || "",
              category: postProductCategory(clipProductCategory && clipProductCategory.value),
              productDescription: clipProductDescription && clipProductDescription.value.trim() || ""
            };
          }
          function setClipProductDetails(details) {
            const source = details || {};
            const priceParts = postProductPriceParts(source.priceText || source.price || source.amount || source.priceAmount || "", source.currencyCode || source.currency || source.priceCurrency);
            if (clipProductName) clipProductName.value = source.productName || source.productTitle || "";
            if (clipProductCurrency) clipProductCurrency.value = priceParts.currencyCode;
            if (clipProductPrice) clipProductPrice.value = priceParts.amount;
            if (clipProductAvailability) clipProductAvailability.value = source.availability || source.stockStatus || "In stock";
            if (clipProductCategory) clipProductCategory.value = postProductCategory(source.category || source.productCategory || source.productType) || "";
            if (clipProductDescription) clipProductDescription.value = source.productDescription || source.productInfo || "";
            updatePostReady();
          }
          function clearClipProductDetails() {
            setClipProductDetails({});
          }
          function clipDraftSourceFromOptions(options) {
            const draft = options && typeof options === "object" ? (options.askDraft || options.draft || null) : null;
            if (!draft || typeof draft !== "object") return null;
            const fields = draft.fields && typeof draft.fields === "object" && !Array.isArray(draft.fields) ? draft.fields : {};
            return Object.assign({}, draft, fields);
          }
          function clipDraftFirst(source, keys) {
            for (const key of keys) {
              const value = source && source[key];
              const clean = postProductText(value);
              if (clean) return clean;
            }
            return "";
          }
          function clipDraftKind(source) {
            if (!source || typeof source !== "object") return "";
            if (clipDraftFirst(source, ["productName", "productTitle", "product_name", "product", "price", "priceText", "priceAmount", "availability", "stock", "stockStatus", "productCategory"])) return "product";
            const text = [
              source.defaultKind,
              source.clipKind,
              source.reelKind,
              source.clipType,
              source.reelType,
              source.kind,
              source.type,
              source.target,
              source.label,
              source.title,
              source.name
            ].map(postProductText).join(" ").toLowerCase();
            return /product|item|stock|listing/.test(text) ? "product" : "business";
          }
          function clipDraftProductDetails(source) {
            const title = clipDraftFirst(source, ["productName", "productTitle", "product_name", "product", "title", "name"]);
            const description = clipDraftFirst(source, ["productDescription", "productInfo", "description", "details", "summary", "text", "body", "caption"]);
            return {
              productName: title,
              productTitle: title,
              price: clipDraftFirst(source, ["price", "priceText", "amount", "priceAmount", "cost"]),
              priceText: clipDraftFirst(source, ["priceText", "price", "amount", "priceAmount", "cost"]),
              currencyCode: clipDraftFirst(source, ["currencyCode", "currency", "priceCurrency"]),
              currency: clipDraftFirst(source, ["currency", "currencyCode", "priceCurrency"]),
              priceCurrency: clipDraftFirst(source, ["priceCurrency", "currencyCode", "currency"]),
              availability: clipDraftFirst(source, ["availability", "stock", "stockStatus", "status"]),
              stockStatus: clipDraftFirst(source, ["stockStatus", "availability", "stock", "status"]),
              category: clipDraftFirst(source, ["category", "productCategory", "product_type", "productType"]),
              productCategory: clipDraftFirst(source, ["productCategory", "category", "product_type", "productType"]),
              productDescription: description,
              productInfo: description
            };
          }
          function applyClipDraftToComposer(source) {
            const draft = source && typeof source === "object" ? source : null;
            if (!draft) return;
            if (normalisePostClipKind(activeClipKind) === "product") {
              setClipProductDetails(clipDraftProductDetails(draft));
            }
            updatePostReady();
            if (typeof showToast === "function") showToast("Ask EMY clip draft opened in the clip flow. Choose or record the video to continue.");
          }
          function postClipModeCopy() {
            const label = postClipFrameLabel(activeClipFrame);
            const kind = postClipKindLabel(activeClipKind);
            return {
              placeholder: activeClipKind === "product" ? "Add a caption for this product clip..." : "Add a caption for your business clip...",
              help: label + " selected. " + kind + " selected. Choose or record a short clip for Feeds and Clips.",
              tag: kind
            };
          }
          function postSubmitLabel() {
            const isProductClip = postIsClipComposer && normalisePostClipKind(activeClipKind) === "product";
            return postIsClipComposer ? (isProductClip ? "Post product clip" : "Post business clip") : "Post";
          }
          function postMediaPrepareTimeoutMs() {
            const configured = Number(window.emyFeedPostMediaTimeoutMs);
            return Number.isFinite(configured) && configured > 0 ? configured : 180000;
          }
          function clearPostPrepareTimers() {
            if (postPrepareNoticeTimer) window.clearTimeout(postPrepareNoticeTimer);
            if (postPrepareTimeoutTimer) window.clearTimeout(postPrepareTimeoutTimer);
            postPrepareNoticeTimer = 0;
            postPrepareTimeoutTimer = 0;
          }
          function resetPostPreparingState() {
            postSubmitQueuedUntilMediaReady = false;
            clearPostPrepareTimers();
            if (postSubmit) postSubmit.textContent = postSubmitLabel();
          }
          function setPostHelpText(text) {
            if (postHelp) postHelp.textContent = text || "";
          }
          function uploadStatusFromTitle(title) {
            const text = String(title || "").toLowerCase();
            if (text.includes("completed") || text.includes("published")) return "completed";
            if (text.includes("attention") || text.includes("failed") || text.includes("too long")) return "failed";
            return "running";
          }
          function normalisePostUploadProgress(value, fallback, status) {
            if (status === "completed") return 100;
            const numeric = Number(value);
            if (Number.isFinite(numeric)) return Math.max(0, Math.min(99, Math.round(numeric)));
            const fallbackNumeric = Number(fallback);
            if (Number.isFinite(fallbackNumeric)) return Math.max(0, Math.min(status === "failed" ? 100 : 99, Math.round(fallbackNumeric)));
            return status === "running" ? 1 : 0;
          }
          function postUploadContentTypeFromText(value) {
            const text = String(value || "").toLowerCase();
            if (!text) return "";
            if (/product[\s-]*clip|clip[\s-]*product/.test(text)) return "product-clip";
            if (/carousel|carrosel/.test(text)) return "carousel";
            if (/clip|reel/.test(text)) return "clip";
            if (/video/.test(text)) return "video";
            if (/\.(mp4|mov|m4v|webm|avi|mkv)\b/.test(text)) return "video";
            if (/image|photo|picture/.test(text)) return "image";
            if (/\.(jpg|jpeg|png|gif|webp|heic|heif)\b/.test(text)) return "image";
            if (/job|hiring/.test(text)) return "job";
            if (/event/.test(text)) return "event";
            if (/article/.test(text)) return "article";
            if (/product/.test(text)) return "product";
            if (/question/.test(text)) return "question";
            if (/post|update/.test(text)) return "post";
            return "";
          }
          function currentPostUploadContentType() {
            if (postIsClipComposer && postComposerHasVideoMedia()) {
              return normalisePostClipKind(activeClipKind) === "product" ? "product-clip" : "clip";
            }
            if (postMediaItems.filter(Boolean).length > 1) return "carousel";
            if (postMediaItems.some((item) => item && item.type === "video") || postMediaType === "video") return "video";
            if (postMediaItems.some((item) => item && item.type === "image") || postMediaType === "image") return "image";
            if (activePostMode === "question") return "question";
            return "post";
          }
          function postUploadContentTypeLabel(type) {
            const clean = postUploadContentTypeFromText(type) || "post";
            if (clean === "product-clip") return "Product clip";
            if (clean === "carousel") return "Carousel";
            if (clean === "clip") return "Clip";
            if (clean === "video") return "Video";
            if (clean === "image") return "Image";
            if (clean === "job") return "Job";
            if (clean === "event") return "Event";
            if (clean === "article") return "Article";
            if (clean === "product") return "Product";
            if (clean === "question") return "Question";
            return "Post";
          }
          function postUploadTitleForStatus(status, contentType) {
            const label = postUploadContentTypeLabel(contentType);
            if (status === "failed") return label + " upload needs attention";
            if (status === "completed") return label + " upload completed";
            return label + " upload";
          }
          function currentPostUploadMediaName() {
            const names = postMediaItems.map((item) => String(item && item.name || "").trim()).filter(Boolean);
            if (!names.length) return "";
            return names.length > 1 ? names[0] + " +" + (names.length - 1) : names[0];
          }
          function recordPostUploadStatus(uploadId, title, body, href, progress, contentType, mediaName, targetMeta) {
            const id = String(uploadId || "").trim();
            if (!id) return;
            const role = feedCreateActorRole() === "business" ? "business" : "customer";
            const key = role === "business" ? "emyBusinessUploads" : "emyCustomerUploads";
            const now = new Date().toISOString();
            const status = uploadStatusFromTitle(title);
            const defaultHref = role === "business" ? "emy-business-profile.html?mode=upload" : "emy-customer-home.html?tab=uploads#uploads";
            const target = targetMeta && typeof targetMeta === "object" ? targetMeta : {};
            try {
              const parsed = JSON.parse(localStorage.getItem(key) || "[]");
              const rows = Array.isArray(parsed) ? parsed : [];
              const existing = rows.find((item) => item && item.id === id) || {};
              const progressValue = normalisePostUploadProgress(progress, existing.progress, status);
              const uploadContentType = postUploadContentTypeFromText(contentType || existing.contentType || [title, body, existing.title, existing.body, existing.message].join(" ")) || currentPostUploadContentType();
              const uploadMediaName = String(mediaName || currentPostUploadMediaName() || existing.mediaName || existing.fileName || existing.name || "").trim();
              const uploadMediaType = /video|clip/.test(uploadContentType) ? "video" : /image|carousel/.test(uploadContentType) ? "image" : (existing.mediaType || "");
              const targetId = String(target.feedId || target.id || target.itemId || existing.feedId || existing.itemId || existing.targetId || "").trim();
              const targetKind = String(target.kind || target.type || target.createType || target.detailKind || existing.detailKind || existing.itemKind || uploadContentType || "").trim();
              const targetTitle = String(target.title || target.itemTitle || target.detailTitle || existing.itemTitle || existing.detailTitle || "").trim();
              const targetMediaItems = Array.isArray(target.mediaItems)
                ? target.mediaItems.filter(Boolean)
                : (Array.isArray(existing.mediaItems) ? existing.mediaItems.filter(Boolean) : []);
              const firstTargetMedia = targetMediaItems[0] || {};
              const targetMediaRef = String(target.mediaRef || target.videoRef || target.clipVideoRef || target.reelRef || firstTargetMedia.ref || firstTargetMedia.mediaRef || firstTargetMedia.videoRef || existing.mediaRef || existing.videoRef || "").trim();
              const targetMediaSrc = targetMediaRef ? "" : String(target.mediaSrc || target.secureUrl || target.secure_url || target.url || target.video || target.videoSrc || target.videoUrl || target.clipVideoSrc || target.reelSrc || firstTargetMedia.src || firstTargetMedia.mediaSrc || firstTargetMedia.secureUrl || firstTargetMedia.secure_url || firstTargetMedia.url || firstTargetMedia.videoSrc || firstTargetMedia.videoUrl || firstTargetMedia.clipVideoSrc || firstTargetMedia.reelSrc || existing.mediaSrc || existing.video || existing.videoSrc || existing.videoUrl || "").trim();
              const targetPosterRef = String(target.posterRef || target.thumbnailRef || firstTargetMedia.posterRef || firstTargetMedia.thumbnailRef || existing.posterRef || existing.thumbnailRef || "").trim();
              const targetPosterSrc = targetPosterRef ? "" : String(target.posterSrc || target.thumbnailSrc || firstTargetMedia.posterSrc || firstTargetMedia.thumbnailSrc || existing.posterSrc || existing.thumbnailSrc || "").trim();
              const targetPublicId = String(target.cloudinaryPublicId || target.mediaPublicId || target.videoPublicId || target.publicId || firstTargetMedia.cloudinaryPublicId || firstTargetMedia.mediaPublicId || firstTargetMedia.videoPublicId || firstTargetMedia.publicId || existing.cloudinaryPublicId || existing.videoPublicId || "").trim();
              const targetResourceType = String(target.cloudinaryResourceType || target.resourceType || target.resource_type || firstTargetMedia.cloudinaryResourceType || firstTargetMedia.resourceType || firstTargetMedia.resource_type || existing.cloudinaryResourceType || existing.resourceType || (uploadMediaType === "video" ? "video" : "")).trim();
              const targetClipKind = String(target.clipKind || target.reelKind || target.clipType || target.reelType || existing.clipKind || existing.reelKind || (/product/.test(uploadContentType) ? "product" : /clip|reel/.test(uploadContentType) ? "business" : "")).trim();
              const targetHref = targetId
                ? (role === "business" ? "emy-business-profile.html?mode=business&feedId=" + encodeURIComponent(targetId) + "&kind=" + encodeURIComponent(targetKind || uploadContentType) : "emy-customer-home.html?tab=feeds&feedId=" + encodeURIComponent(targetId) + "#feeds")
                : "";
              const record = Object.assign({}, existing, {
                id,
                role,
                kind: /clip|reel/.test(uploadContentType) ? "clip" : (targetKind || existing.kind || "post"),
                contentType: uploadContentType,
                uploadType: uploadContentType,
                mediaKind: uploadContentType,
                mediaType: targetResourceType === "video" || /video|clip|reel/.test(uploadContentType) ? "video" : uploadMediaType,
                postMode: target.postMode || existing.postMode || uploadContentType,
                clipKind: targetClipKind,
                reelKind: target.reelKind || targetClipKind,
                clipType: target.clipType || targetClipKind,
                reelType: target.reelType || targetClipKind,
                businessKey: target.businessKey || target.key || target.profileKey || existing.businessKey || "",
                key: target.businessKey || target.key || target.profileKey || existing.key || "",
                profileKey: target.profileKey || target.businessKey || target.key || existing.profileKey || "",
                businessName: target.businessName || target.business || target.name || existing.businessName || "",
                business: target.business || target.businessName || target.name || existing.business || "",
                actor: target.actor || target.author || existing.actor || "",
                productName: target.productName || target.productTitle || existing.productName || "",
                productTitle: target.productTitle || target.productName || existing.productTitle || "",
                productInfo: target.productInfo || target.productDescription || existing.productInfo || "",
                productDescription: target.productDescription || target.productInfo || existing.productDescription || "",
                price: target.price || target.priceText || existing.price || "",
                priceText: target.priceText || target.price || existing.priceText || "",
                availability: target.availability || target.stockStatus || existing.availability || "",
                stockStatus: target.stockStatus || target.availability || existing.stockStatus || "",
                category: target.category || target.productCategory || existing.category || "",
                productCategory: target.productCategory || target.category || existing.productCategory || "",
                mediaRef: targetMediaRef,
                videoRef: target.videoRef || targetMediaRef || existing.videoRef || "",
                mediaSrc: targetMediaSrc,
                video: targetMediaSrc,
                videoSrc: target.videoSrc || target.videoUrl || targetMediaSrc,
                videoUrl: target.videoUrl || target.videoSrc || targetMediaSrc,
                clipVideoSrc: target.clipVideoSrc || targetMediaSrc,
                reelSrc: target.reelSrc || targetMediaSrc,
                posterRef: targetPosterRef,
                posterSrc: targetPosterSrc,
                thumbnailRef: target.thumbnailRef || targetPosterRef || existing.thumbnailRef || "",
                thumbnailSrc: target.thumbnailSrc || targetPosterSrc || existing.thumbnailSrc || "",
                cloudinaryPublicId: targetPublicId,
                mediaPublicId: target.mediaPublicId || targetPublicId || existing.mediaPublicId || "",
                videoPublicId: target.videoPublicId || targetPublicId || existing.videoPublicId || "",
                cloudinaryResourceType: targetResourceType,
                resourceType: target.resourceType || targetResourceType || existing.resourceType || "",
                mediaItems: targetMediaItems.length ? targetMediaItems : existing.mediaItems,
                mediaSettings: target.mediaSettings || firstTargetMedia.settings || existing.mediaSettings,
                mediaName: uploadMediaName,
                fileName: uploadMediaName,
                title: postUploadTitleForStatus(status, uploadContentType),
                body: String(body || title || "Upload status saved."),
                message: String(body || title || "Upload status saved."),
                status,
                progress: progressValue,
                feedId: targetId,
                itemId: targetId,
                targetId,
                detailKind: targetKind,
                itemKind: targetKind,
                itemTitle: targetTitle,
                detailTitle: targetTitle,
                href: href || targetHref || existing.href || defaultHref,
                createdAt: existing.createdAt || now,
                updatedAt: now
              });
              const storedRecord = typeof feedTrimLargeInlineMedia === "function" ? feedTrimLargeInlineMedia(record) : record;
              localStorage.setItem(key, JSON.stringify([storedRecord].concat(rows.filter((item) => item && item.id !== id)).slice(0, 80)));
              if (role === "business" && status === "completed" && /clip|reel/.test(uploadContentType) && typeof persistBusinessCreatedClipCopy === "function") {
                try {
                  persistBusinessCreatedClipCopy(Object.assign({}, storedRecord, target, {
                    id: targetId || storedRecord.feedId || storedRecord.id,
                    feedId: targetId || storedRecord.feedId || storedRecord.id,
                    kind: "clip",
                    type: "clip",
                    createType: "clip",
                    postMode: "clip",
                    tag: /product/.test(uploadContentType) ? "Product Clip" : "Clip",
                    title: target.title || target.itemTitle || storedRecord.itemTitle || storedRecord.detailTitle || storedRecord.title,
                    description: target.description || target.text || storedRecord.description || storedRecord.text || storedRecord.body || "",
                    mediaType: "video"
                  }));
                } catch (clipPersistError) {}
              }
              window.dispatchEvent(new CustomEvent(role === "business" ? "emy:business-upload-updated" : "emy:customer-upload-updated", { detail: storedRecord }));
            } catch (error) {}
          }
          function postUploadAverageProgress() {
            const media = postMediaItems.filter(Boolean);
            if (!media.length) return postMediaSaving ? 1 : 100;
            if (media.every((item) => item && item.uploadFailed)) return 0;
            const total = media.reduce((sum, item) => {
              if (item.cloudinaryPublicId || item.ref) return sum + 100;
              if (item.uploadFailed) return sum;
              const value = Number(item.uploadProgress);
              return sum + (Number.isFinite(value) ? Math.max(1, Math.min(99, value)) : 1);
            }, 0);
            return Math.max(1, Math.min(99, Math.round(total / media.length)));
          }
          function updateQueuedPostUploadProgress(force) {
            if (!postQueuedUploadId) return;
            const progress = postUploadAverageProgress();
            const now = Date.now();
            if (!force && progress === postUploadProgressLastValue) return;
            if (!force && now - postUploadProgressLastTime < 650 && progress < 100) return;
            postUploadProgressLastValue = progress;
            postUploadProgressLastTime = now;
            recordPostUploadStatus(postQueuedUploadId, "Upload progress", postQueuedUploadBody || "Your post is uploading in the background.", "", progress, currentPostUploadContentType(), currentPostUploadMediaName());
          }
          function notifyPostUploadStatus(title, body, href, uploadId, progress, contentType, mediaName, targetMeta) {
            const cleanTitle = String(title || "Upload update").trim();
            const cleanBody = String(body || cleanTitle).trim();
            if (typeof showToast === "function") showToast(cleanBody || cleanTitle);
            const role = feedCreateActorRole() === "business" ? "business" : "customer";
            const defaultHref = role === "business" ? "emy-business-profile.html?mode=upload" : "emy-customer-home.html?tab=uploads#uploads";
            const uploadContentType = postUploadContentTypeFromText(contentType || [cleanTitle, cleanBody].join(" ")) || currentPostUploadContentType();
            const target = targetMeta && typeof targetMeta === "object" ? targetMeta : {};
            const targetId = String(target.feedId || target.id || target.itemId || "").trim();
            const targetKind = String(target.kind || target.type || target.createType || target.detailKind || uploadContentType || "").trim();
            const targetTitle = String(target.title || target.itemTitle || target.detailTitle || "").trim();
            recordPostUploadStatus(uploadId, cleanTitle, cleanBody, href || defaultHref, progress, uploadContentType, mediaName || currentPostUploadMediaName(), target);
            try {
              const notificationKey = role === "business" ? "emyBusinessNotifications" : "emyCustomerNotifications";
              const current = JSON.parse(localStorage.getItem(notificationKey) || "[]");
              const rows = Array.isArray(current) ? current : [];
              const notification = {
                id: "upload-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
                type: "upload",
                category: "upload",
                group: "important",
                title: cleanTitle,
                body: cleanBody || cleanTitle,
                message: cleanBody || cleanTitle,
                contentType: uploadContentType,
                feedId: targetId,
                itemId: targetId,
                itemKind: targetKind,
                itemTitle: targetTitle,
                href: href || defaultHref,
                createdAt: new Date().toISOString(),
                created: new Date().toISOString(),
                time: new Date().toLocaleString(),
                read: false,
                unread: true
              };
              localStorage.setItem(notificationKey, JSON.stringify([notification].concat(rows).slice(0, 80)));
              window.dispatchEvent(new CustomEvent(role === "business" ? "emy:business-notification-created" : "emy:customer-notification-created", { detail: notification }));
            } catch (error) {}
          }
          window.emyNotifyUploadStatus = notifyPostUploadStatus;
          window.emyRecordUploadProgress = function recordUploadProgress(uploadId, body, href, progress, contentType, mediaName) {
            recordPostUploadStatus(uploadId, "Upload progress", body || "Your post is uploading in the background.", href || "", progress, contentType || currentPostUploadContentType(), mediaName);
          };
          function queuePostUntilMediaReady() {
            const wasAlreadyQueued = postSubmitQueuedUntilMediaReady;
            postSubmitQueuedUntilMediaReady = true;
            if (!postQueuedUploadId) postQueuedUploadId = "post-upload-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
            clearPostPrepareTimers();
            if (postSubmit) {
              postSubmit.textContent = "Queued";
              postSubmit.disabled = true;
            }
            setPostHelpText("Uploading in the background. You can keep using EMY.");
            const pendingText = postText ? postText.value.trim() : "";
            postQueuedUploadBody = pendingText ? "Preparing media for: " + pendingText.slice(0, 90) : "Your post is uploading in the background.";
            if (!wasAlreadyQueued) {
              postUploadProgressLastValue = -1;
              postUploadProgressLastTime = 0;
              notifyPostUploadStatus("Upload started", postQueuedUploadBody, "", postQueuedUploadId, postUploadAverageProgress(), currentPostUploadContentType());
            }
            updateQueuedPostUploadProgress(true);
            setOpen(postSourceSheet, false);
            setOpen(postCameraSheet, false);
            setOpen(postSheet, false);
            setOpen(createMenu, false);
            const timeoutMs = postMediaPrepareTimeoutMs();
            const noticeMs = Math.min(15000, Math.max(1200, Math.floor(timeoutMs / 3)));
            postPrepareNoticeTimer = window.setTimeout(() => {
              if (!postSubmitQueuedUntilMediaReady || !postMediaSaving) return;
              setPostHelpText("Still uploading in the background. EMY will publish when it is ready.");
              notifyPostUploadStatus("Upload still running", postQueuedUploadBody || "Your post is still uploading in the background.", "", postQueuedUploadId, postUploadAverageProgress(), currentPostUploadContentType());
            }, noticeMs);
            postPrepareTimeoutTimer = window.setTimeout(() => {
              if (!postSubmitQueuedUntilMediaReady || !postMediaSaving) return;
              resetPostPreparingState();
              updatePostReady();
              setPostHelpText("This media is taking too long. Try a smaller file or try again.");
              notifyPostUploadStatus("Upload needs attention", "This media is taking too long. Try a smaller file or try again.", "", postQueuedUploadId, postUploadAverageProgress(), currentPostUploadContentType());
              postQueuedUploadId = "";
              postQueuedUploadBody = "";
            }, timeoutMs);
          }
          function postComposerHasVideoMedia() {
            return postMediaItems.some((item) => item && item.type === "video") || postMediaType === "video" || postVisiblePreviewMediaType() === "video";
          }
          function postModeAfterMediaAdded(detectedType) {
            if (postIsClipComposer) return detectedType === "video" ? "video" : "photo";
            if (postMediaItems.length > 1) return "update";
            return detectedType === "video" ? "video" : detectedType === "image" ? "photo" : activePostMode;
          }
          function applyPostComposerLayoutIsolation() {
            const videoTabActive = activePostMode === "video";
            const hasVideoMedia = postComposerHasVideoMedia();
            const clipVideoComposer = postIsClipComposer && videoTabActive;
            const lockClipLayout = clipVideoComposer && hasVideoMedia;
            const clipNeedsMedia = postIsClipComposer && !postHasSelectedMedia();
            if (postSheet) {
              postSheet.classList.toggle("is-video-post-active", clipVideoComposer);
              postSheet.classList.toggle("is-clip-media-locked", lockClipLayout);
              postSheet.classList.toggle("is-clip-needs-media", clipNeedsMedia);
            }
            if (postModeTabs) {
              postModeTabs.hidden = postIsClipComposer && !clipNeedsMedia;
              postModeTabs.style.display = postModeTabs.hidden ? "none" : "";
              if (postModeTabs.hidden) postModeTabs.setAttribute("aria-hidden", "true");
              else {
                postModeTabs.removeAttribute("aria-hidden");
                postModeTabs.style.removeProperty("display");
              }
            }
            if (postText) {
              const hideText = clipVideoComposer;
              postText.hidden = hideText;
              postText.disabled = hideText;
              postText.style.display = hideText ? "none" : "";
              if (hideText) {
                postText.setAttribute("aria-hidden", "true");
                postText.value = "";
              } else {
                postText.removeAttribute("aria-hidden");
                postText.style.removeProperty("display");
              }
            }
            postModeButtons.forEach((button) => {
              const mode = button.dataset.feedPostMode || "";
              if (mode === "video") button.textContent = postIsClipComposer ? "Create Clip" : "Video";
              const hideTab = postIsClipComposer ? (mode !== "video" || !clipNeedsMedia) : false;
              button.hidden = hideTab;
              button.disabled = hideTab;
              button.style.display = hideTab ? "none" : "";
              if (hideTab) button.setAttribute("aria-hidden", "true");
              else {
                button.removeAttribute("aria-hidden");
                button.style.removeProperty("display");
              }
            });
          }
          function applyClipComposerUi() {
            const frame = postIsClipComposer ? normalisePostClipFrame(activeClipFrame) : "";
            const isProductClip = postIsClipComposer && normalisePostClipKind(activeClipKind) === "product";
            if (postSheet) {
              postSheet.classList.toggle("is-clip-composer", postIsClipComposer);
              postSheet.classList.toggle("is-product-clip-composer", isProductClip);
              if (frame) postSheet.dataset.clipFrame = frame;
              else delete postSheet.dataset.clipFrame;
            }
            if (clipProductFields) clipProductFields.hidden = !isProductClip;
            if (postMediaPreview) {
              if (frame && postMediaType === "video") postMediaPreview.dataset.clipFrame = frame;
              else delete postMediaPreview.dataset.clipFrame;
            }
            if (postCameraFrame) {
              postCameraFrame.classList.toggle("is-phone-frame", frame === "phone" && postCameraMode === "video");
              if (frame) postCameraFrame.dataset.clipFrame = frame;
              else delete postCameraFrame.dataset.clipFrame;
            }
            if (postSubmit && !postSubmitQueuedUntilMediaReady) postSubmit.textContent = postSubmitLabel();
            applyPostComposerLayoutIsolation();
          }
          function setClipFrameSelection(frame) {
            pendingClipFrame = normalisePostClipFrame(frame);
            clipFrameChoices.forEach((button) => {
              const active = normalisePostClipFrame(button.dataset.feedClipFrameChoice) === pendingClipFrame;
              button.classList.toggle("is-active", active);
              button.setAttribute("aria-checked", active ? "true" : "false");
              button.setAttribute("aria-pressed", active ? "true" : "false");
            });
          }
          function setClipKindSelection(kind) {
            pendingClipKind = normalisePostClipKind(kind);
            clipKindChoices.forEach((button) => {
              const active = normalisePostClipKind(button.dataset.feedClipKindChoice) === pendingClipKind;
              button.classList.toggle("is-active", active);
              button.setAttribute("aria-checked", active ? "true" : "false");
              button.setAttribute("aria-pressed", active ? "true" : "false");
            });
          }
          function resetClipComposerState() {
            postIsClipComposer = false;
            activeClipFrame = "original";
            pendingClipFrame = "phone";
            activeClipKind = "business";
            pendingClipKind = "business";
            pendingClipDraft = null;
            setClipKindSelection("business");
            clearClipProductDetails();
            applyClipComposerUi();
          }
          function setPostMode(mode, focusText) {
            if (mode === "clip") mode = "video";
            activePostMode = ["update", "question", "photo", "video"].includes(mode) ? mode : "update";
            const copy = postIsClipComposer && activePostMode === "video" ? postClipModeCopy() : postModeCopy(activePostMode);
            postModeButtons.forEach((button) => {
              const active = button.dataset.feedPostMode === activePostMode;
              button.classList.toggle("is-active", active);
              button.setAttribute("aria-pressed", active ? "true" : "false");
            });
            if (postText) postText.placeholder = copy.placeholder;
            if (postHelp) postHelp.textContent = copy.help;
            applyClipComposerUi();
            updatePostReady();
            if (focusText && postText && activePostMode !== "video") window.setTimeout(() => postText.focus(), 20);
          }
          function resetPostMediaPreview() {
            if (postMediaPreview) postMediaPreview.querySelectorAll("[data-feed-post-carousel-preview]").forEach((node) => node.remove());
            if (postMediaImage) {
              postMediaImage.hidden = true;
              postMediaImage.removeAttribute("src");
              postMediaImage.removeAttribute("data-emy-media-ref");
              delete postMediaImage.dataset.emyMediaHydrating;
              delete postMediaImage.dataset.emyMediaHydrated;
            }
            if (postMediaVideo) {
              try { postMediaVideo.pause(); } catch (error) {}
              postMediaVideo.hidden = true;
              postMediaVideo.removeAttribute("src");
              postMediaVideo.removeAttribute("poster");
              postMediaVideo.removeAttribute("data-emy-media-ref");
              postMediaVideo.removeAttribute("data-emy-poster-ref");
              delete postMediaVideo.dataset.emyMediaHydrating;
              delete postMediaVideo.dataset.emyMediaHydrated;
              delete postMediaVideo.dataset.emyPosterHydrating;
              delete postMediaVideo.dataset.emyPosterHydrated;
              try { postMediaVideo.load(); } catch (error) {}
            }
            if (postMediaPreview) {
              postMediaPreview.hidden = true;
              postMediaPreview.classList.remove("has-carousel");
              delete postMediaPreview.dataset.clipFrame;
            }
            if (postSheet) postSheet.classList.remove("has-media");
            applyPostComposerLayoutIsolation();
          }
          function setPostMediaSaving(delta) {
            const wasSaving = postMediaSaving;
            postMediaSaveCount = Math.max(0, postMediaSaveCount + delta);
            postMediaSaving = postMediaSaveCount > 0;
            if (wasSaving && !postMediaSaving && postSubmitQueuedUntilMediaReady) {
              clearPostPrepareTimers();
              window.setTimeout(() => {
                if (!postSubmitQueuedUntilMediaReady || postMediaSaving) return;
                if (postSubmit) {
                  postSubmit.disabled = false;
                  postSubmit.textContent = postSubmitLabel();
                }
                updatePostReady();
                submitPost();
              }, 0);
            }
          }
          function postDefaultMediaSettings(type) {
            return window.emyDefaultMediaEditSettings ? window.emyDefaultMediaEditSettings(type || "image") : { fit:"contain", zoom:1, x:0, y:0, aspect:"auto", overlay:"" };
          }
          function postClipMediaSettings(type, frame) {
            const base = postDefaultMediaSettings(type || "video");
            if (normalisePostClipFrame(frame) === "phone") return Object.assign({}, base, { fit:"cover", aspect:"9 / 16", clipFrame:"phone" });
            return Object.assign({}, base, { fit:"contain", aspect:"auto", clipFrame:"original" });
          }
          function postMediaPosterSrc(item) {
            const settings = item && item.settings || {};
            const storedPoster = String((item && (item.posterSrc || item.thumbnailSrc)) || settings.posterSrc || settings.thumbnailSrc || "");
            if (storedPoster) return storedPoster;
            if (!item || String(item.type || "").toLowerCase() !== "video") return "";
            return feedCreateCloudinaryPosterUrl(item.cloudinaryPublicId || item.mediaPublicId || item.videoPublicId || item.publicId || item.src, item.cloudinaryPosterPublicId || item.posterPublicId || item.thumbnailPublicId, "video");
          }
          function postMediaPosterRef(item) {
            const settings = item && item.settings || {};
            return String((item && (item.posterRef || item.thumbnailRef)) || settings.posterRef || settings.thumbnailRef || "");
          }
          function postStoredMediaItems() {
            return postMediaItems.map((item) => {
              if (!item) return null;
              const rawSrc = String(item.src || "");
              const temporarySrc = /^(blob:|data:)/i.test(rawSrc);
              const durableSrc = item.ref || (temporarySrc && item.cloudinaryPublicId) ? "" : rawSrc;
              return {
                type: item.type || "image",
                src: durableSrc,
                ref: item.ref || "",
                posterSrc: postMediaPosterRef(item) ? "" : postMediaPosterSrc(item),
                posterRef: postMediaPosterRef(item),
                name: item.name || "",
                clipFrame: item.clipFrame || item.settings && item.settings.clipFrame || "",
                cloudinaryPublicId: item.cloudinaryPublicId || "",
                cloudinaryResourceType: item.cloudinaryResourceType || "",
                cloudinaryBytes: Number(item.cloudinaryBytes) || 0,
                cloudinaryDuration: Number(item.cloudinaryDuration) || 0,
                cloudinaryPosterPublicId: item.cloudinaryPosterPublicId || "",
                settings: Object.assign({}, item.settings || postDefaultMediaSettings(item.type || "image"))
              };
            }).filter(Boolean);
          }
          function syncPostActiveMedia(index) {
            if (!postMediaItems.length) {
              postActiveMediaIndex = 0;
              postMediaSrc = "";
              postMediaRef = "";
              postMediaType = "";
              postMediaSettings = postDefaultMediaSettings("image");
              return null;
            }
            postActiveMediaIndex = Math.min(Math.max(0, Number(index) || 0), postMediaItems.length - 1);
            const item = postMediaItems[postActiveMediaIndex];
            postMediaSrc = item.src || "";
            postMediaRef = item.ref || "";
            postMediaType = item.type || "image";
            postMediaSettings = Object.assign({}, item.settings || postDefaultMediaSettings(postMediaType));
            item.posterSrc = postMediaPosterSrc(item);
            item.posterRef = postMediaPosterRef(item);
            return item;
          }
          function revealPostMediaVideoFrame(video) {
            if (!video || video.tagName !== "VIDEO" || video.poster) return;
            const seek = () => {
              try {
                const duration = Number(video.duration) || 0;
                const target = duration ? Math.min(0.16, Math.max(0, duration - 0.05)) : 0.04;
                if ((Number(video.currentTime) || 0) < 0.04) video.currentTime = target;
              } catch (error) {}
            };
            if (video.readyState >= 1) window.setTimeout(seek, 0);
            else video.addEventListener("loadedmetadata", seek, { once: true });
          }
          function resolvePostPreviewMedia(active, node) {
            if (!active) return;
            if (node && node.tagName === "VIDEO") {
              node.preload = "auto";
              if (active.src) revealPostMediaVideoFrame(node);
            }
            const ref = active.ref || "";
            if (!ref || active.src || !window.emyResolveFeedMedia || active._emyPreviewHydratingRef === ref) return;
            active._emyPreviewHydratingRef = ref;
            window.emyResolveFeedMedia(ref).then((record) => {
              const current = syncPostActiveMedia(postActiveMediaIndex);
              if (!record || !record.url || !current || current.ref !== ref) return;
              current.src = record.url;
              current.type = current.type || record.mediaType || (node && node.tagName === "VIDEO" ? "video" : "image");
              postMediaSrc = record.url;
              postMediaType = current.type;
              if (node && node.getAttribute("data-emy-media-ref") === ref) {
                node.src = record.url;
                if (node.tagName === "VIDEO") {
                  node.preload = "auto";
                  try { node.load(); } catch (error) {}
                  revealPostMediaVideoFrame(node);
                }
              }
              if (postEditMedia) postEditMedia.hidden = false;
              updatePostReady();
            }).catch(() => {}).finally(() => {
              if (active._emyPreviewHydratingRef === ref) active._emyPreviewHydratingRef = "";
            });
          }
          function renderPostMediaPreview() {
            if (!postMediaPreview) return;
            resetPostMediaPreview();
            if (!postMediaItems.length) {
              updatePostReady();
              return;
            }
            const active = syncPostActiveMedia(postActiveMediaIndex);
            postMediaPreview.hidden = false;
            postMediaPreview.dataset.mediaType = active && active.type || "image";
            if (postIsClipComposer && active && active.type === "video") postMediaPreview.dataset.clipFrame = activeClipFrame;
            else delete postMediaPreview.dataset.clipFrame;
            postMediaPreview.classList.toggle("has-carousel", postMediaItems.length > 1);
            if (postSheet) postSheet.classList.add("has-media");
            if (postMediaItems.length > 1 && window.emyFeedMediaCarouselMarkup) {
              const host = document.createElement("div");
              host.innerHTML = window.emyFeedMediaCarouselMarkup(postMediaItems, { label:"Selected media" });
              const carousel = host.firstElementChild;
              if (carousel) {
                carousel.dataset.feedPostCarouselPreview = "true";
                postMediaPreview.insertBefore(carousel, postMediaPreview.firstChild);
                if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(carousel);
                if (window.emySetupVideoPlayers) window.emySetupVideoPlayers(carousel);
                if (window.emySetupFeedMediaCarousels) window.emySetupFeedMediaCarousels(carousel);
                if (window.emySetFeedMediaCarouselIndex) window.emySetFeedMediaCarouselIndex(carousel, postActiveMediaIndex, { init: true });
                if (!carousel.dataset.feedPostCarouselSyncBound) {
                  carousel.dataset.feedPostCarouselSyncBound = "true";
                  carousel.addEventListener("click", (navEvent) => {
                    const navControl = navEvent.target.closest("[data-feed-carousel-prev], [data-feed-carousel-next], [data-feed-carousel-dot]");
                    if (!navControl || navControl.hidden || navControl.disabled) return;
                    window.requestAnimationFrame(() => {
                      const nextIndex = Number(carousel.dataset.feedCarouselIndex) || 0;
                      if (nextIndex === postActiveMediaIndex) return;
                      postActiveMediaIndex = nextIndex;
                      syncPostActiveMedia(nextIndex);
                      if (postEditMedia) {
                        const item = postMediaItems[postActiveMediaIndex];
                        postEditMedia.hidden = !(item && item.src);
                      }
                    });
                  });
                }
              }
            } else if (active && active.type === "video" && postMediaVideo) {
              if (active.ref) postMediaVideo.setAttribute("data-emy-media-ref", active.ref);
              const posterSrc = postMediaPosterSrc(active);
              const posterRef = postMediaPosterRef(active);
              if (posterSrc) postMediaVideo.poster = posterSrc;
              else postMediaVideo.removeAttribute("poster");
              if (posterRef) postMediaVideo.setAttribute("data-emy-poster-ref", posterRef);
              else postMediaVideo.removeAttribute("data-emy-poster-ref");
              if (active.src) postMediaVideo.src = active.src;
              postMediaVideo.hidden = false;
              resolvePostPreviewMedia(active, postMediaVideo);
            } else if (active && postMediaImage) {
              if (active.ref) postMediaImage.setAttribute("data-emy-media-ref", active.ref);
              if (active.src) postMediaImage.src = active.src;
              postMediaImage.hidden = false;
              resolvePostPreviewMedia(active, postMediaImage);
            }
            if (postEditMedia) postEditMedia.hidden = !(active && active.src);
            if (window.emyApplyMediaEditPreview) window.emyApplyMediaEditPreview(postMediaPreview, postMediaSettings);
            if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(postMediaPreview);
            applyPostComposerLayoutIsolation();
            updatePostReady();
          }
          function addPostMediaItem(item) {
            const next = Object.assign({ type:"image", src:"", ref:"", name:"", settings:postDefaultMediaSettings(item && item.type) }, item || {});
            next.settings = Object.assign({}, next.settings || postDefaultMediaSettings(next.type));
            next.clipFrame = next.clipFrame || next.settings.clipFrame || "";
            next.posterSrc = postMediaPosterSrc(next);
            next.posterRef = postMediaPosterRef(next);
            if (!(next.src || next.ref)) return null;
            postMediaItems.push(next);
            postActiveMediaIndex = postMediaItems.length - 1;
            renderPostMediaPreview();
            return next;
          }
          function clearPostMedia(revokeUrl) {
            if (revokeUrl) {
              postMediaItems.forEach((item) => {
                if (item && !item.ref && item.src && item.src.indexOf("blob:") === 0) {
                  try { URL.revokeObjectURL(item.src); } catch (error) {}
                }
              });
            }
            if (revokeUrl && postMediaSrc && !postMediaRef && postMediaSrc.indexOf("blob:") === 0) {
              try { URL.revokeObjectURL(postMediaSrc); } catch (error) {}
            }
            postMediaSrc = "";
            postMediaRef = "";
            postMediaType = "";
            postMediaSettings = postDefaultMediaSettings("image");
            postMediaSaving = false;
            postMediaSaveCount = 0;
            resetPostPreparingState();
            postMediaItems = [];
            postActiveMediaIndex = 0;
            resetPostMediaPreview();
            if (postPhotoFile) postPhotoFile.value = "";
            if (postClipFile) postClipFile.value = "";
            updatePostReady();
          }
          function showPostMediaPreview(src, type, ref) {
            const mediaSrc = String(src || "");
            const mediaRef = String(ref || "");
            const mediaType = type === "video" ? "video" : "image";
            if (!(mediaSrc || mediaRef) || !postMediaPreview) return;
            if (!postMediaItems.length) addPostMediaItem({ type:mediaType, src:mediaSrc, ref:mediaRef, settings:postMediaSettings });
            else {
              const active = syncPostActiveMedia(postActiveMediaIndex);
              if (active) {
                active.type = mediaType;
                active.src = mediaSrc;
                active.ref = mediaRef || active.ref || "";
                active.settings = Object.assign({}, postMediaSettings || active.settings || postDefaultMediaSettings(mediaType));
              }
              renderPostMediaPreview();
            }
          }
          function openPostMediaEditor(event, submitAfterApply) {
            stopFeedCreateEvent(event);
            const active = syncPostActiveMedia(postActiveMediaIndex);
            if (!active || !active.src || !active.type || !window.emyOpenMediaEditor) return;
            const editorProductClip = postIsClipComposer && normalisePostClipKind(activeClipKind) === "product";
            window.emyOpenMediaEditor({
              src: active.src,
              type: active.type,
              settings: active.settings || postMediaSettings,
              productClip: editorProductClip,
              productClipDetails: editorProductClip ? postClipProductDetails() : null,
              applyLabel: editorProductClip ? "Apply media and details" : "Apply media",
              postLabel: editorProductClip ? "Post product clip" : "Post now",
              onProductDetailsChange: editorProductClip ? setClipProductDetails : null,
              showToast: typeof showToast === "function" ? showToast : null,
              onApply: (settings, submitNow, editorProductDetails) => {
                if (editorProductClip && editorProductDetails) setClipProductDetails(editorProductDetails);
                active.settings = Object.assign({}, settings || active.settings || postDefaultMediaSettings(active.type));
                active.posterSrc = postMediaPosterSrc(active);
                active.posterRef = postMediaPosterRef(active);
                syncPostActiveMedia(postActiveMediaIndex);
                renderPostMediaPreview();
                updatePostReady();
                if (submitNow || submitAfterApply) submitPost();
              }
            });
          }
          function storeFeedCreateMedia(fileOrBlob, type, name, progressItem) {
            if (window.emyPrepareFeedMediaUpload) {
              return window.emyPrepareFeedMediaUpload(fileOrBlob, {
                type,
                name,
                kind:"feed-create",
                role:feedCreateActorRole(),
                allowBrowserFallback:false,
                onProgress: (progress) => {
                  if (progressItem) progressItem.uploadProgress = progress;
                  updateQueuedPostUploadProgress(false);
                }
              }).catch(() => {
                if (progressItem) {
                  progressItem.uploadFailed = true;
                  progressItem.uploadProgress = 0;
                }
                updateQueuedPostUploadProgress(true);
                return null;
              });
            }
            return Promise.resolve(null);
          }
          function applyFeedCreatePreparedMedia(item, record, objectUrl) {
            if (!item || !record) return false;
            if (objectUrl && item.src !== objectUrl && !/^data:image\//i.test(String(item.src || ""))) return false;
            if (record.src) {
              if (objectUrl && objectUrl.indexOf("blob:") === 0) {
                try { URL.revokeObjectURL(objectUrl); } catch (error) {}
              }
              item.src = record.src;
              item.ref = "";
            } else if (record.ref || record.id) {
              item.ref = record.ref || record.id || "";
            } else {
              return false;
            }
            item.type = record.type || item.type || "image";
            item.name = record.name || item.name || "";
            item.cloudinaryPublicId = record.cloudinaryPublicId || "";
            item.cloudinaryResourceType = record.cloudinaryResourceType || "";
            item.cloudinaryBytes = Number(record.cloudinaryBytes) || 0;
            item.cloudinaryDuration = Number(record.cloudinaryDuration) || 0;
            item.cloudinaryPosterPublicId = record.cloudinaryPosterPublicId || item.cloudinaryPosterPublicId || "";
            item.uploadProgress = 100;
            if (item.type === "video" && !postMediaPosterRef(item) && !postMediaPosterSrc(item)) {
              const posterSrc = feedCreateCloudinaryPosterUrl(item.cloudinaryPublicId || item.src, item.cloudinaryPosterPublicId, "video");
              if (posterSrc) {
                item.posterSrc = posterSrc;
                item.thumbnailSrc = posterSrc;
                item.settings = Object.assign({}, item.settings || postDefaultMediaSettings("video"), { posterSrc, thumbnailSrc: posterSrc });
              }
            }
            item.uploadFailed = false;
            return true;
          }
          function jobCoverDefaultSettings(type) {
            const base = window.emyDefaultMediaEditSettings ? window.emyDefaultMediaEditSettings(type || "image") : { fit:"cover", zoom:1, x:0, y:0, aspect:"16 / 9", overlay:"" };
            return Object.assign({}, base, { fit:"cover", aspect:"16 / 9" });
          }
          function applyHiringCoverSettings() {
            if (!hiringCoverPreview || !window.emyApplyMediaEditPreview) return;
            window.emyApplyMediaEditPreview(hiringCoverPreview, hiringCoverSettings || jobCoverDefaultSettings(hiringCoverType || "image"));
          }
          function setHiringCover(src, ref, type, settings) {
            hiringCoverSrc = String(src || "");
            hiringCoverRef = String(ref || "");
            hiringCoverType = type === "video" ? "video" : (hiringCoverSrc || hiringCoverRef ? "image" : "");
            hiringCoverSettings = Object.assign(jobCoverDefaultSettings(hiringCoverType || "image"), settings || hiringCoverSettings || {});
            const hasCover = !!(hiringCoverSrc || hiringCoverRef);
            if (hiringCoverPreview) {
              hiringCoverPreview.classList.toggle("has-cover", hasCover);
              hiringCoverPreview.dataset.mediaType = hiringCoverType || "";
            }
            if (hiringCoverTitle) hiringCoverTitle.textContent = hasCover ? "Job media added" : "Job cover";
            if (hiringCoverImage) {
              hiringCoverImage.hidden = !(hasCover && hiringCoverType !== "video");
              hiringCoverImage.removeAttribute("src");
              hiringCoverImage.removeAttribute("data-emy-media-ref");
              delete hiringCoverImage.dataset.emyMediaHydrating;
              delete hiringCoverImage.dataset.emyMediaHydrated;
              if (hasCover && hiringCoverType !== "video") {
                if (hiringCoverRef) hiringCoverImage.setAttribute("data-emy-media-ref", hiringCoverRef);
                if (hiringCoverSrc) hiringCoverImage.src = hiringCoverSrc;
              }
            }
            if (hiringCoverVideo) {
              try { hiringCoverVideo.pause(); } catch (error) {}
              hiringCoverVideo.hidden = !(hasCover && hiringCoverType === "video");
              hiringCoverVideo.removeAttribute("src");
              hiringCoverVideo.removeAttribute("poster");
              hiringCoverVideo.removeAttribute("data-emy-media-ref");
              hiringCoverVideo.removeAttribute("data-emy-poster-ref");
              delete hiringCoverVideo.dataset.emyMediaHydrating;
              delete hiringCoverVideo.dataset.emyMediaHydrated;
              delete hiringCoverVideo.dataset.emyPosterHydrating;
              delete hiringCoverVideo.dataset.emyPosterHydrated;
              if (hasCover && hiringCoverType === "video") {
                const posterSrc = hiringCoverSettings && (hiringCoverSettings.posterSrc || hiringCoverSettings.thumbnailSrc) || "";
                const posterRef = hiringCoverSettings && (hiringCoverSettings.posterRef || hiringCoverSettings.thumbnailRef) || "";
                if (hiringCoverRef) hiringCoverVideo.setAttribute("data-emy-media-ref", hiringCoverRef);
                if (posterRef) hiringCoverVideo.setAttribute("data-emy-poster-ref", posterRef);
                if (posterSrc) hiringCoverVideo.poster = posterSrc;
                if (hiringCoverSrc) hiringCoverVideo.src = hiringCoverSrc;
              } else {
                try { hiringCoverVideo.load(); } catch (error) {}
              }
            }
            if (hiringCoverAdd) {
              const label = hiringCoverAdd.querySelector("span");
              if (label) label.textContent = hasCover ? "Change media" : "Add image/video";
            }
            if (hiringCoverEdit) hiringCoverEdit.hidden = !(hasCover && hiringCoverSrc && window.emyOpenMediaEditor);
            if (hiringCoverRemove) hiringCoverRemove.hidden = !hasCover;
            applyHiringCoverSettings();
            if (hasCover && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(hiringCoverPreview || document);
          }
          function clearHiringCover(revokeUrl) {
            if (revokeUrl && hiringCoverSrc && !hiringCoverRef && hiringCoverSrc.indexOf("blob:") === 0) {
              try { URL.revokeObjectURL(hiringCoverSrc); } catch (error) {}
            }
            hiringCoverSaveToken += 1;
            hiringCoverSaving = false;
            hiringCoverPendingPromise = null;
            hiringCoverPendingAction = "";
            hiringCoverSettings = jobCoverDefaultSettings("image");
            if (hiringCoverFile) hiringCoverFile.value = "";
            setHiringCover("", "", "", hiringCoverSettings);
          }
          function hiringCoverIsTemporaryBlob() {
            return !!(hiringCoverSrc && !hiringCoverRef && hiringCoverSrc.indexOf("blob:") === 0);
          }
          function hiringCoverHasLargeUnsavedInlineMedia() {
            return !!(hiringCoverSrc && !hiringCoverRef && /^data:/i.test(hiringCoverSrc));
          }
          function hiringCoverIsNotPushed() {
            return hiringCoverIsTemporaryBlob() || hiringCoverHasLargeUnsavedInlineMedia();
          }
          function resetHiringCoverActionButtons() {
            [hiringSave, hiringPreview, hiringContinue, hiringPreviewPost].forEach((button) => {
              if (!button) return;
              if (button.dataset && button.dataset.hiringOriginalLabel) {
                button.textContent = button.dataset.hiringOriginalLabel;
                delete button.dataset.hiringOriginalLabel;
              }
              button.disabled = false;
            });
          }
          function setHiringCoverActionPreparing(actionName) {
            const buttons = actionName === "draft" ? [hiringSave] : actionName === "preview" ? [hiringPreview] : [hiringContinue, hiringPreviewPost];
            buttons.forEach((button) => {
              if (!button) return;
              if (button.dataset && !button.dataset.hiringOriginalLabel) button.dataset.hiringOriginalLabel = button.textContent || "";
              button.disabled = true;
            });
          }
          function deferHiringActionForCover(actionName, action) {
            if (hiringCoverSaving && hiringCoverPendingPromise) {
              hiringCoverPendingAction = actionName;
              setHiringCoverActionPreparing(actionName);
              if (typeof showToast === "function") showToast("Preparing your job media. EMY will continue when it is ready.");
              Promise.resolve(hiringCoverPendingPromise).finally(() => {
                const shouldRun = hiringCoverPendingAction === actionName;
                hiringCoverPendingAction = "";
                resetHiringCoverActionButtons();
                if (!shouldRun) return;
                window.setTimeout(() => {
                  if (hiringCoverSaving) return;
                  if (hiringCoverIsNotPushed()) {
                    if (typeof showToast === "function") showToast("EMY could not push this job media. Try a smaller file or remove it before posting.");
                    return;
                  }
                  action();
                }, 0);
              });
              return true;
            }
            if (hiringCoverSaving) {
              if (typeof showToast === "function") showToast("Hold on while EMY adds the job media.");
              return true;
            }
            if (hiringCoverIsNotPushed()) {
              if (typeof showToast === "function") showToast("EMY could not push this job media. Try a smaller file or remove it before posting.");
              return true;
            }
            return false;
          }
          function openHiringCoverEditor(event) {
            stopFeedCreateEvent(event);
            if (!hiringCoverSrc || !window.emyOpenMediaEditor) return;
            window.emyOpenMediaEditor({
              src: hiringCoverSrc,
              type: hiringCoverType === "video" ? "video" : "image",
              settings: hiringCoverSettings || jobCoverDefaultSettings(hiringCoverType || "image"),
              applyLabel: "Apply media",
              hidePostButton: true,
              onApply: (settings) => {
                hiringCoverSettings = Object.assign(jobCoverDefaultSettings(hiringCoverType || "image"), settings || {});
                applyHiringCoverSettings();
              }
            });
          }
          function setHiringCoverFile(file) {
            if (!file) return;
            const fileType = String(file.type || "").toLowerCase();
            const detectedType = fileType.startsWith("video/") ? "video" : "image";
            const objectUrl = URL.createObjectURL(file);
            const token = ++hiringCoverSaveToken;
            hiringCoverSaving = true;
            hiringCoverSettings = jobCoverDefaultSettings(detectedType);
            setHiringCover(objectUrl, "", detectedType, hiringCoverSettings);
            const storePromise = storeFeedCreateMedia(file, detectedType, file.name || "job-cover").catch(() => null);
            const storeResult = storePromise.then((record) => ({ record, timedOut:false }));
            const timeoutResult = new Promise((resolve) => {
              window.setTimeout(() => resolve({ record:null, timedOut:true }), 45000);
            });
            storePromise.then((record) => {
              if (token !== hiringCoverSaveToken || !record || hiringCoverRef) return;
              const ref = record.ref || record.id || "";
              const src = record.src || hiringCoverSrc || objectUrl;
              if (!(src || ref)) return;
              setHiringCover(src, ref, detectedType, hiringCoverSettings);
            }).catch(() => {});
            hiringCoverPendingPromise = Promise.race([storeResult, timeoutResult]).then((result) => {
              if (token !== hiringCoverSaveToken) return;
              if (result && result.timedOut) {
                if (typeof showToast === "function") showToast("This job media is taking too long to push. Try a smaller file.");
                return;
              }
              const record = result && result.record;
              const ref = record && (record.ref || record.id) || "";
              const finalSrc = record && record.src || hiringCoverSrc || objectUrl;
              setHiringCover(finalSrc, ref, detectedType, hiringCoverSettings);
              if (!(record && (record.src || ref)) && typeof showToast === "function") {
                showToast(detectedType === "video" ? "Video upload failed. Try a smaller video or check your connection." : "Image upload failed. Try a smaller image or check your connection.");
              }
            }).catch(() => {
              if (token !== hiringCoverSaveToken) return;
              if (typeof showToast === "function") showToast("Could not add this job media.");
            }).finally(() => {
              if (token !== hiringCoverSaveToken) return;
              hiringCoverSaving = false;
              hiringCoverPendingPromise = null;
            });
          }
          function hiringCoverPayload() {
            const src = hiringCoverRef || hiringCoverIsNotPushed() ? "" : (hiringCoverSrc || "");
            const ref = hiringCoverRef || "";
            const type = hiringCoverType || (src || ref ? "image" : "");
            const settings = hiringCoverSettings || jobCoverDefaultSettings(type || "image");
            const posterRef = settings.posterRef || settings.thumbnailRef || "";
            const posterSrc = posterRef ? "" : (settings.posterSrc || settings.thumbnailSrc || "");
            return {
              coverSrc: src,
              jobCoverSrc: src,
              mediaSrc: src,
              posterSrc,
              thumbnailSrc: posterSrc,
              coverPosterSrc: posterSrc,
              jobCoverPosterSrc: posterSrc,
              coverRef: ref,
              jobCoverRef: ref,
              mediaRef: ref,
              posterRef,
              thumbnailRef: posterRef,
              coverPosterRef: posterRef,
              jobCoverPosterRef: posterRef,
              coverType: type,
              jobCoverType: type,
              mediaType: type,
              coverSettings: settings,
              jobCoverSettings: settings,
              mediaSettings: settings
            };
          }
          function setPostMediaFile(file, requestedType) {
            if (!file) return;
            const fileType = String(file.type || "").toLowerCase();
            const detectedType = fileType.startsWith("video/") ? "video" : fileType.startsWith("image/") ? "image" : (requestedType === "video" ? "video" : "image");
            if (requestedType === "image" && detectedType !== "image") {
              if (typeof showToast === "function") showToast("Choose a photo file for this post.");
              return;
            }
            if (requestedType === "video" && detectedType !== "video") {
              if (typeof showToast === "function") showToast("Choose a video file for this post.");
              return;
            }
            const objectUrl = URL.createObjectURL(file);
            postMediaSettings = postIsClipComposer && detectedType === "video" ? postClipMediaSettings("video", activeClipFrame) : postDefaultMediaSettings(detectedType);
            postMediaSrc = objectUrl;
            postMediaRef = "";
            postMediaType = detectedType;
            const addedItem = addPostMediaItem({ type:detectedType, src:objectUrl, ref:"", settings:postMediaSettings, name:file.name || "", clipFrame:postIsClipComposer && detectedType === "video" ? activeClipFrame : "" });
            setPostMode(postModeAfterMediaAdded(detectedType), true);
            setPostMediaSaving(1);
            updatePostReady();
            if (detectedType === "video") {
              storeFeedCreateMedia(file, detectedType, file.name || "", addedItem).then((record) => {
                if (applyFeedCreatePreparedMedia(addedItem, record, objectUrl)) {
                  syncPostActiveMedia(postActiveMediaIndex);
                  renderPostMediaPreview();
                } else if (addedItem && addedItem.src === objectUrl && typeof showToast === "function") {
                  addedItem.uploadFailed = true;
                  showToast("Video upload failed. Try a smaller video or check your connection.");
                }
              }).finally(() => {
                setPostMediaSaving(-1);
                updatePostReady();
              });
              return;
            }
            const itemStillSelected = () => addedItem && postMediaItems.indexOf(addedItem) >= 0;
            storeFeedCreateMedia(file, detectedType, file.name || "", addedItem).then((record) => {
              if (!itemStillSelected()) return;
              if (applyFeedCreatePreparedMedia(addedItem, record, objectUrl)) {
                syncPostActiveMedia(postActiveMediaIndex);
                renderPostMediaPreview();
              } else if (typeof showToast === "function") {
                addedItem.uploadFailed = true;
                showToast("Photo upload failed. Try a smaller image or check your connection.");
              }
            }).catch(() => {
              if (addedItem) addedItem.uploadFailed = true;
              if (typeof showToast === "function") showToast("Photo upload failed. Try a smaller image or check your connection.");
            }).finally(() => {
              setPostMediaSaving(-1);
              updatePostReady();
            });
          }
          function pickPostMediaFromDevice(type, capture) {
            const isVideo = type === "video";
            const input = isVideo ? postClipFile : postPhotoFile;
            if (!input) return;
            input.value = "";
            if (capture) input.setAttribute("capture", "environment");
            else input.removeAttribute("capture");
            input.click();
          }
          function setPostCameraStatus(text, warning) {
            if (!postCameraStatus) return;
            postCameraStatus.textContent = text || "";
            postCameraStatus.style.color = warning ? "#9a4b00" : "#61708c";
          }
          function formatPostCameraSeconds(seconds) {
            const total = Math.max(0, Math.floor(Number(seconds) || 0));
            return Math.floor(total / 60) + ":" + String(total % 60).padStart(2, "0");
          }
          function updatePostCameraTimer() {
            if (!postCameraTimer || !postRecordingStart) return;
            postCameraTimer.textContent = formatPostCameraSeconds((Date.now() - postRecordingStart) / 1000);
            postCameraTimer.classList.add("is-visible");
          }
          function setPostCameraRecordingUi(isRecording) {
            if (postCameraActions) postCameraActions.classList.toggle("is-recording", !!isRecording);
            if (postCameraCapture) postCameraCapture.hidden = !!isRecording;
            if (postCameraStop) postCameraStop.hidden = !isRecording;
            if (!isRecording && postCameraTimer) {
              postCameraTimer.classList.remove("is-visible");
              postCameraTimer.textContent = "0:00";
            }
          }
          function stopPostCameraStream() {
            if (postRecordingTimer) {
              clearInterval(postRecordingTimer);
              postRecordingTimer = null;
            }
            postRecordingStart = 0;
            if (postCameraStream) postCameraStream.getTracks().forEach((track) => track.stop());
            postCameraStream = null;
            if (postCameraPreview) postCameraPreview.srcObject = null;
            setPostCameraRecordingUi(false);
          }
          function closePostCamera(cancelRecording = true) {
            if (postMediaRecorder && postMediaRecorder.state !== "inactive") {
              postRecordingCancelled = !!cancelRecording;
              postMediaRecorder.stop();
              return;
            }
            stopPostCameraStream();
            setOpen(postCameraSheet, false);
          }
          async function openPostCamera(mode) {
            postCameraMode = mode === "video" ? "video" : "image";
            const isVideo = postCameraMode === "video";
            const isPhoneClip = isVideo && postIsClipComposer && normalisePostClipFrame(activeClipFrame) === "phone";
            setOpen(postCameraSheet, true);
            if (postCameraFrame) {
              postCameraFrame.classList.toggle("is-video", isVideo);
              postCameraFrame.classList.toggle("is-phone-frame", isPhoneClip);
              if (postIsClipComposer && isVideo) postCameraFrame.dataset.clipFrame = activeClipFrame;
              else delete postCameraFrame.dataset.clipFrame;
            }
            if (postCameraSound) postCameraSound.classList.toggle("is-visible", isVideo);
            if (postCameraTitle) postCameraTitle.textContent = postIsClipComposer && isVideo ? "Record clip now" : isVideo ? "Record video now" : "Take picture now";
            if (postCameraCopy) postCameraCopy.textContent = postIsClipComposer && isVideo ? (isPhoneClip ? "Allow camera access, then record in a vertical phone frame." : "Allow camera access, then record in the original camera frame.") : isVideo ? "Allow camera access, then record a short feed video." : "Allow camera access, then capture your feed photo.";
            if (postCameraCapture) postCameraCapture.textContent = isVideo ? "Start recording" : "Take picture";
            setPostCameraRecordingUi(false);
            setPostCameraStatus("Requesting camera permission...", false);
            if (window.location.protocol === "file:") {
              setPostCameraStatus("Camera is blocked in this file preview. Open the site through localhost or use Gallery or computer.", true);
              return;
            }
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
              setPostCameraStatus("Camera is not available in this browser. Use Gallery or computer.", true);
              return;
            }
            stopPostCameraStream();
            postRecordedChunks = [];
            postRecordedWithAudio = false;
            try {
              const wantsAudio = isVideo && (!postCameraAudio || postCameraAudio.checked);
              const videoConstraints = isVideo
                ? isPhoneClip
                  ? { facingMode: { ideal: "environment" }, width: { ideal: 1080 }, height: { ideal: 1920 }, aspectRatio: { ideal: 9 / 16 }, frameRate: { ideal: 30, max: 30 } }
                  : { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30, max: 30 } }
                : { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } };
              try {
                postCameraStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: wantsAudio ? { echoCancellation: true, noiseSuppression: true } : false });
              } catch (error) {
                postCameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
              }
              postRecordedWithAudio = !!(postCameraStream.getAudioTracks && postCameraStream.getAudioTracks().length);
              if (postCameraPreview) {
                postCameraPreview.srcObject = postCameraStream;
                const playPromise = postCameraPreview.play();
                if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
              }
              setPostCameraStatus(isVideo ? (postRecordedWithAudio ? "Camera and microphone ready. Tap Start recording." : "Camera ready without sound. Tap Start recording.") : "Camera ready. Tap Take picture when you are ready.", false);
            } catch (error) {
              setPostCameraStatus("Camera permission was blocked or unavailable. Use Gallery or computer instead.", true);
            }
          }
          function capturePostCameraPhoto() {
            if (!postCameraPreview || !postCameraStream) {
              setPostCameraStatus("Camera is not ready yet.", true);
              return;
            }
            const canvas = document.createElement("canvas");
            canvas.width = postCameraPreview.videoWidth || 1280;
            canvas.height = postCameraPreview.videoHeight || 720;
            const context = canvas.getContext("2d");
            context.drawImage(postCameraPreview, 0, 0, canvas.width, canvas.height);
            const applyCameraBlob = (blob) => {
              if (!blob) {
                if (typeof showToast === "function") showToast("Could not capture this photo. Try again.");
                updatePostReady();
                return;
              }
              const objectUrl = URL.createObjectURL(blob);
              closePostCamera(false);
              postMediaSrc = objectUrl;
              postMediaRef = "";
              postMediaType = "image";
              postMediaSettings = postDefaultMediaSettings("image");
              const addedItem = addPostMediaItem({ type:"image", src:objectUrl, ref:"", settings:postMediaSettings, name:"Camera photo" });
              setPostMode("photo", true);
              if (addedItem) {
                setPostMediaSaving(1);
                storeFeedCreateMedia(blob, "image", "camera-photo.jpg", addedItem).then((record) => {
                  if (applyFeedCreatePreparedMedia(addedItem, record, objectUrl)) {
                    syncPostActiveMedia(postActiveMediaIndex);
                    renderPostMediaPreview();
                  } else if (typeof showToast === "function") {
                    addedItem.uploadFailed = true;
                    showToast("Photo upload failed. Try a smaller image or check your connection.");
                  }
                }).finally(() => {
                  setPostMediaSaving(-1);
                  updatePostReady();
                });
              }
              updatePostReady();
            };
            if (canvas.toBlob) {
              canvas.toBlob(applyCameraBlob, "image/jpeg", .86);
              return;
            }
            applyCameraBlob(null);
          }
          function startPostCameraVideoRecording() {
            if (!postCameraStream) {
              setPostCameraStatus("Camera is not ready yet.", true);
              return;
            }
            if (!window.MediaRecorder) {
              setPostCameraStatus("Video recording is not available in this browser. Use Gallery or computer.", true);
              return;
            }
            postRecordedChunks = [];
            postRecordingCancelled = false;
            let options = { videoBitsPerSecond: 1600000, audioBitsPerSecond: 64000 };
            if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) options.mimeType = "video/webm;codecs=vp9";
            else if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) options.mimeType = "video/webm;codecs=vp8";
            try {
              postMediaRecorder = new MediaRecorder(postCameraStream, options);
            } catch (error) {
              postMediaRecorder = new MediaRecorder(postCameraStream);
            }
            postMediaRecorder.addEventListener("dataavailable", (event) => {
              if (event.data && event.data.size) postRecordedChunks.push(event.data);
            });
            postMediaRecorder.addEventListener("stop", () => {
              const shouldSave = !postRecordingCancelled && postRecordedChunks.length;
              const mimeType = postMediaRecorder && postMediaRecorder.mimeType ? postMediaRecorder.mimeType : "video/webm";
              stopPostCameraStream();
              setOpen(postCameraSheet, false);
              if (shouldSave) {
                const blob = new Blob(postRecordedChunks, { type:mimeType });
                const objectUrl = URL.createObjectURL(blob);
                postMediaSettings = postIsClipComposer ? postClipMediaSettings("video", activeClipFrame) : postDefaultMediaSettings("video");
                postMediaSrc = objectUrl;
                postMediaRef = "";
                postMediaType = "video";
                const addedItem = addPostMediaItem({ type:"video", src:objectUrl, ref:"", settings:postMediaSettings, name:postIsClipComposer ? "Recorded clip" : "Recorded video", clipFrame:postIsClipComposer ? activeClipFrame : "" });
                setPostMode(postModeAfterMediaAdded("video"), true);
                setPostMediaSaving(1);
                updatePostReady();
                storeFeedCreateMedia(blob, "video", "recorded-video.webm", addedItem).then((record) => {
                  if (applyFeedCreatePreparedMedia(addedItem, record, objectUrl)) {
                    syncPostActiveMedia(postActiveMediaIndex);
                    renderPostMediaPreview();
                  } else if (addedItem && addedItem.src === objectUrl && typeof showToast === "function") {
                    addedItem.uploadFailed = true;
                    showToast("Video upload failed. Try a smaller video or check your connection.");
                  }
                }).finally(() => {
                  setPostMediaSaving(-1);
                  updatePostReady();
                });
                if (typeof showToast === "function") showToast(postRecordedWithAudio ? "Video added with sound." : "Video added without sound.");
              }
              postRecordedChunks = [];
              postMediaRecorder = null;
            });
            postMediaRecorder.start();
            postRecordingStart = Date.now();
            updatePostCameraTimer();
            postRecordingTimer = setInterval(updatePostCameraTimer, 500);
            setPostCameraRecordingUi(true);
            setPostCameraStatus(postRecordedWithAudio ? "Recording with sound... tap Stop recording when finished." : "Recording without sound... tap Stop recording when finished.", false);
          }
          function openPostSource(type, event) {
            stopFeedCreateEvent(event);
            pendingPostSourceType = type === "video" ? "video" : "image";
            const isVideo = pendingPostSourceType === "video";
            if (postIsClipComposer || postMediaItems.length <= 1) setPostMode(isVideo ? "video" : "photo", false);
            const isClip = isVideo && postIsClipComposer;
            const frameLabel = postClipFrameLabel(activeClipFrame).toLowerCase();
            const clipKindLabel = postClipKindLabel(activeClipKind).toLowerCase();
            if (postSourceTitle) postSourceTitle.textContent = isClip ? "Add " + clipKindLabel : isVideo ? "Add video" : "Add photo";
            if (postSourceHelp) postSourceHelp.textContent = isClip ? "Choose a saved " + clipKindLabel + " or record now in " + frameLabel + "." : isVideo ? "Choose from gallery, computer, or record now." : "Choose from gallery, computer, or take a picture now.";
            if (postSourceLibraryTitle) postSourceLibraryTitle.textContent = "Gallery or computer";
            if (postSourceLibraryHelp) postSourceLibraryHelp.textContent = isClip ? "Choose a saved " + clipKindLabel + " from your phone gallery, laptop, or files." : isVideo ? "Choose a saved video from your phone gallery, laptop, or files." : "Choose a photo from your phone gallery, laptop, or files.";
            if (postSourceCameraTitle) postSourceCameraTitle.textContent = isClip ? "Record " + clipKindLabel + " now" : isVideo ? "Record video now" : "Take picture now";
            if (postSourceCameraHelp) postSourceCameraHelp.textContent = isClip ? (normalisePostClipFrame(activeClipFrame) === "phone" ? "Use your camera in phone view for a vertical clip." : "Use your camera and keep the original frame.") : isVideo ? "Use your camera to record a new video if available." : "Use your camera to take a new picture if available.";
            setOpen(postSourceSheet, true);
          }
          function choosePostSource(source, event) {
            stopFeedCreateEvent(event);
            setOpen(postSourceSheet, false);
            if (source === "camera") {
              openPostCamera(pendingPostSourceType);
              return;
            }
            pickPostMediaFromDevice(pendingPostSourceType, false);
          }
          function choosePostMode(mode, event) {
            stopFeedCreateEvent(event);
            setPostMode(mode, mode !== "photo" && mode !== "video");
            if (mode === "photo") openPostSource("image", event);
            if (mode === "video" || mode === "clip") openPostSource("video", event);
          }
          function openPostPhoto(event) {
            openPostSource("image", event);
          }
          function openPostClip(event) {
            openPostSource("video", event);
          }
          function postTitleFromText(text, mode, mediaType) {
            const cleaned = String(text || "").trim().replace(/\s+/g, " ");
            if (cleaned) return cleaned.split(/\s+/).slice(0, 8).join(" ");
            if (mode === "question") return "Customer question";
            if (mode === "clip") return "New clip";
            return "";
          }
          function isGenericPostCaption(value) {
            return /^(photo update|video update|carousel update|new update|new photo update|new video update|new carousel update|shared a photo update|shared a new video|shared new media|new customer update|new business update|your update|update)$/i.test(String(value || "").trim());
          }
          function feedPostDetailKind(item) {
            const mode = String(item && item.postMode || "").toLowerCase();
            const tag = String(item && item.tag || "").toLowerCase();
            const mediaType = String(item && item.mediaType || "").toLowerCase();
            const createType = String(item && item.createType || item.kind || item.type || "").toLowerCase();
            if (createType === "clip" || mode === "clip" || tag === "clip" || tag === "product clip") return tag === "product clip" ? "Product Clip" : "Clip";
            if (mode === "carousel" || tag === "carousel") return "Carousel";
            if (mode === "video" || tag === "video" || mediaType === "video") return "Video";
            if (mode === "photo" || tag === "photo" || mediaType === "image") return "Image";
            if (mode === "question" || tag === "question") return "Question";
            return "";
          }
          function postTextFallback(mode, mediaType) {
            if (mode === "question") return "Question for customers.";
            if (mode === "clip") return "Shared a new clip.";
            if (mediaType === "video" || mode === "video") return "";
            if (mediaType === "image" || mode === "photo") return "";
            return "";
          }
          function postSelectedMedia() {
            const active = postMediaItems[postActiveMediaIndex] || null;
            if (active && (active.src || active.ref)) return active;
            return { type: postMediaType, src: postMediaSrc, ref: postMediaRef };
          }
          function postVisiblePreviewMediaType() {
            if (!postMediaPreview || postMediaPreview.hidden) return "";
            const dataType = String(postMediaPreview.dataset.mediaType || "").trim().toLowerCase();
            if (dataType === "video" || dataType === "image") return dataType;
            const video = postMediaPreview.querySelector && postMediaPreview.querySelector("video");
            if (video && !video.hidden && (video.currentSrc || video.src || video.getAttribute("data-emy-media-ref"))) return "video";
            const image = postMediaPreview.querySelector && postMediaPreview.querySelector("img");
            if (image && !image.hidden && (image.currentSrc || image.src || image.getAttribute("data-emy-media-ref"))) return "image";
            return "";
          }
          function postVisiblePreviewHasMedia() {
            return !!postVisiblePreviewMediaType();
          }
          function postSelectedMediaType() {
            const selected = postSelectedMedia();
            return String(selected.type || postMediaType || postVisiblePreviewMediaType() || "").trim().toLowerCase();
          }
          function postHasSelectedMedia() {
            const selected = postSelectedMedia();
            return !!(selected.src || selected.ref || postMediaSrc || postMediaRef || postVisiblePreviewHasMedia());
          }
          function postHasPublishableMedia() {
            const items = postMediaItems.length ? postMediaItems : [postSelectedMedia()];
            return items.some((item) => {
              if (!item) return false;
              const src = String(item.src || "");
              return !!(item.ref || (src && (!/^blob:/i.test(src) || !postMediaSaving)));
            });
          }
          function updatePostReady() {
            if (!postSubmit || !postText) return;
            const text = postText.value.trim();
            const selectedMediaType = postSelectedMediaType();
            const hasSelectedMedia = postHasSelectedMedia();
            if (postMediaSaving && !hasSelectedMedia) {
              postSubmit.disabled = true;
              return;
            }
            if (postSubmitQueuedUntilMediaReady && postMediaSaving) {
              postSubmit.textContent = "Queued";
              postSubmit.disabled = true;
              return;
            }
            postSubmit.textContent = postSubmitLabel();
            if (activePostMode === "photo") {
              postSubmit.disabled = !(selectedMediaType === "image" && hasSelectedMedia);
              return;
            }
            if (activePostMode === "video") {
              postSubmit.disabled = !(selectedMediaType === "video" && hasSelectedMedia);
              return;
            }
            postSubmit.disabled = !(text || hasSelectedMedia);
          }
          function todayValue() {
            const now = new Date();
            const offset = now.getTimezoneOffset() * 60000;
            return new Date(now.getTime() - offset).toISOString().slice(0, 10);
          }
          function selectedEventType() {
            const selected = eventTypeInputs.find((input) => input.checked);
            return selected && selected.value ? selected.value : "In person";
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
          function eventWhenText() {
            const dateText = formatEventDate(eventStartDate && eventStartDate.value);
            const timeText = formatEventTime(eventStartTime && eventStartTime.value);
            if (dateText && timeText) return dateText + " at " + timeText;
            return dateText || timeText || "Date to confirm";
          }
          function feedPreviewIntro(value, details, fallback) {
            const intro = String(value || "").trim();
            if (intro) return intro;
            const text = String(details || "").trim();
            if (!text) return String(fallback || "").trim();
            if (text.length <= 180) return text;
            return text.slice(0, 177).replace(/\s+\S*$/, "").trim() + "...";
          }
          function updateEventPreview() {
            const title = eventName && eventName.value.trim() ? eventName.value.trim() : "What is the event?";
            const place = eventLink && eventLink.value.trim() ? eventLink.value.trim() : (selectedEventType() === "Online" ? "Online" : "Location to confirm");
            if (eventPreviewType) eventPreviewType.textContent = selectedEventType();
            if (eventPreviewTitle) eventPreviewTitle.textContent = title;
            if (eventPreviewMeta) eventPreviewMeta.textContent = eventWhenText() + " - " + place;
          }
          function eventCoverDefaultSettings() {
            const base = window.emyDefaultMediaEditSettings ? window.emyDefaultMediaEditSettings("image") : { fit:"cover", zoom:1, x:0, y:0, aspect:"16 / 9", overlay:"" };
            return Object.assign({}, base, { fit:"cover", aspect:"16 / 9" });
          }
          function applyEventCoverSettings() {
            if (eventPreview && window.emyApplyMediaEditPreview) window.emyApplyMediaEditPreview(eventPreview, eventCoverSettings || eventCoverDefaultSettings());
          }
          function setEventCover(src, ref) {
            eventCoverSrc = String(src || "");
            eventCoverRef = String(ref || "");
            const hasCover = !!(eventCoverSrc || eventCoverRef);
            if (eventPreview) eventPreview.classList.toggle("has-cover", hasCover);
            const coverImage = eventCoverImage || eventPreview && eventPreview.querySelector("[data-feed-event-cover-image]");
            if (coverImage) {
              coverImage.hidden = !hasCover;
              coverImage.removeAttribute("src");
              coverImage.removeAttribute("data-emy-media-ref");
              delete coverImage.dataset.emyMediaHydrating;
              delete coverImage.dataset.emyMediaHydrated;
              if (eventCoverRef) coverImage.setAttribute("data-emy-media-ref", eventCoverRef);
              if (eventCoverSrc) coverImage.src = eventCoverSrc;
            }
            applyEventCoverSettings();
            if (hasCover && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(eventPreview || coverImage || document);
            if (eventCoverButton) {
              const label = eventCoverButton.querySelector("span");
              if (label) label.textContent = hasCover ? "Change cover" : "Add cover image";
            }
            if (eventCoverEdit) eventCoverEdit.hidden = !hasCover;
            if (eventCoverRemove) eventCoverRemove.hidden = !hasCover;
            try {
              if (eventCoverRef) localStorage.setItem("emyPendingEventCoverRef", eventCoverRef);
              else localStorage.removeItem("emyPendingEventCoverRef");
              if (eventCoverSrc && !/^(data:|blob:)/i.test(eventCoverSrc) && eventCoverSrc.length < 120000) localStorage.setItem("emyPendingEventCoverSrc", eventCoverSrc);
              else localStorage.removeItem("emyPendingEventCoverSrc");
              if (hasCover) localStorage.setItem("emyPendingEventCoverSettings", JSON.stringify(eventCoverSettings || eventCoverDefaultSettings()));
              else localStorage.removeItem("emyPendingEventCoverSettings");
            } catch (error) {}
          }
          function openEventCoverEditor(event) {
            stopFeedCreateEvent(event);
            if (!window.emyOpenMediaEditor) return;
            const coverImage = eventCoverImage || eventPreview && eventPreview.querySelector("[data-feed-event-cover-image]");
            const visibleSrc = coverImage ? (coverImage.currentSrc || coverImage.src || coverImage.getAttribute("src") || "") : "";
            const ref = eventCoverRef || coverImage && coverImage.dataset && coverImage.dataset.emyMediaRef || "";
            const openWithSrc = (src) => {
              const cleanSrc = String(src || "");
              if (!cleanSrc) {
                if (typeof showToast === "function") showToast("Hold on while EMY loads this event cover.");
                if (ref && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(eventPreview || coverImage || document);
                return;
              }
              if (!eventCoverSrc) eventCoverSrc = cleanSrc;
              window.emyOpenMediaEditor({
                src: cleanSrc,
                type: "image",
                settings: eventCoverSettings || eventCoverDefaultSettings(),
                applyLabel: "Apply cover",
                hidePostButton: true,
                onApply: (settings) => {
                  eventCoverSettings = Object.assign(eventCoverDefaultSettings(), settings || {});
                  applyEventCoverSettings();
                  try { localStorage.setItem("emyPendingEventCoverSettings", JSON.stringify(eventCoverSettings)); } catch (error) {}
                }
              });
            };
            const src = eventCoverSrc || visibleSrc;
            if (src) {
              openWithSrc(src);
              return;
            }
            if (ref && window.emyResolveFeedMedia) {
              if (typeof showToast === "function") showToast("Loading event cover...");
              window.emyResolveFeedMedia(ref).then((record) => {
                const resolvedSrc = record && (record.url || record.src) || "";
                if (resolvedSrc) {
                  setEventCover(resolvedSrc, ref);
                  openWithSrc(resolvedSrc);
                } else {
                  openWithSrc("");
                }
              }).catch(() => openWithSrc(""));
              return;
            }
            openWithSrc("");
          }
          function clearEventCover() {
            eventCoverSaving = false;
            eventCoverRef = "";
            eventCoverSettings = eventCoverDefaultSettings();
            if (eventCoverFile) eventCoverFile.value = "";
            setEventCover("", "");
          }
          function setEventCoverFile(file) {
            if (!file || !String(file.type || "").toLowerCase().startsWith("image/")) return;
            eventCoverSaving = true;
            if (eventNext) eventNext.disabled = true;
            const storePromise = storeFeedCreateMedia(file, "image", file.name || "event-cover").catch(() => null);
            storePromise.then((record) => {
              eventCoverSettings = eventCoverDefaultSettings();
              const ref = record && (record.ref || record.id) || "";
              const uploadedSrc = record && record.src || "";
              if (uploadedSrc || ref) {
                setEventCover(uploadedSrc, ref);
              } else {
                setEventCover("", "");
                if (typeof showToast === "function") showToast("Event cover upload failed. Try a smaller image or check your connection.");
              }
            }).finally(() => {
              eventCoverSaving = false;
              if (eventNext) eventNext.disabled = false;
            });
          }
          function setEventDefaults() {
            if (eventStartDate && !eventStartDate.value) eventStartDate.value = todayValue();
            if (eventStartTime && !eventStartTime.value) eventStartTime.value = "19:00";
            updateEventPreview();
          }
          function articleDraftTitle() {
            const title = articleTitle && articleTitle.value.trim();
            const body = articleBody && articleBody.value.trim();
            return title || (body ? body.split(/\s+/).slice(0, 7).join(" ") : "Untitled article");
          }
          function articleDraftBody() {
            return articleBody && articleBody.value.trim() ? articleBody.value.trim() : "";
          }
          function articleDraftShare() {
            return articleShare && articleShare.value.trim() ? articleShare.value.trim() : "";
          }
          function articleDraftCopy() {
            return articleDraftBody() || articleDraftShare() || "Article preview will appear here.";
          }
          function articlePreviewCopyText() {
            return articleDraftShare() || articleDraftBody() || "Article preview will appear here.";
          }
          function articleReadLabel() {
            const words = (articleDraftBody() || articleDraftShare() || "").split(/\s+/).filter(Boolean).length;
            return Math.max(1, Math.ceil(words / 220)) + " min read";
          }
          function articleHasDraft() {
            return !!((articleTitle && articleTitle.value.trim()) || articleDraftBody() || articleDraftShare() || articleMediaSrc || articleMediaRef);
          }
          function updateArticleReady() {
            if (articleMediaSaving) {
              if (articleNext) articleNext.disabled = true;
              if (articleStatus) articleStatus.textContent = "Saving media...";
              return;
            }
            const ready = !!((articleTitle && articleTitle.value.trim()) || articleDraftBody());
            const readLabel = articleReadLabel();
            if (articleNext) articleNext.disabled = !ready;
            if (articleStatus) articleStatus.textContent = ready ? "Ready to publish" : "Article draft";
            if (articleReadTime) articleReadTime.textContent = readLabel;
            if (articlePreviewTitle) articlePreviewTitle.textContent = articleDraftTitle();
            if (articlePreviewCopy) articlePreviewCopy.textContent = articlePreviewCopyText().slice(0, 220);
            if (articlePreviewMeta) articlePreviewMeta.textContent = readLabel;
          }
          function renderArticleCover() {
            const hasMedia = !!(articleMediaSrc || articleMediaRef);
            const mediaType = articleMediaType === "video" ? "video" : "image";
            [articleCover, articlePreviewCover].forEach((node) => {
              if (!node) return;
              node.querySelectorAll("[data-feed-article-cover-media]").forEach((media) => media.remove());
              node.classList.toggle("has-media", hasMedia);
              if (node === articlePreviewCover) node.hidden = !hasMedia;
              node.style.backgroundImage = hasMedia && articleMediaSrc && mediaType === "image" ? 'url("' + articleMediaSrc.replace(/"/g, "%22") + '")' : "";
              if (hasMedia) {
                const media = document.createElement(mediaType === "video" ? "video" : "img");
                media.dataset.feedArticleCoverMedia = "true";
                if (articleMediaRef) media.setAttribute("data-emy-media-ref", articleMediaRef);
                if (articleMediaSrc) media.src = articleMediaSrc;
                if (mediaType === "video") {
                  media.muted = true;
                  media.playsInline = true;
                  media.loop = true;
                  media.autoplay = true;
                } else {
                  media.alt = "";
                }
                node.prepend(media);
                if (mediaType === "video" && articleMediaSrc) {
                  const play = media.play();
                  if (play && typeof play.catch === "function") play.catch(() => {});
                }
                if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(node);
              }
            });
            if (articleCover) {
              const titleNode = articleCover.querySelector("[data-feed-article-cover-title]");
              const helpNode = articleCover.querySelector("[data-feed-article-cover-help]");
              if (titleNode) titleNode.textContent = hasMedia ? (mediaType === "video" ? "Video cover added" : "Cover added") : "Add cover";
              if (helpNode) helpNode.textContent = hasMedia ? "Click to replace" : "Photo or video, optional";
            }
          }
          function clearArticleCover() {
            articleMediaSrc = "";
            articleMediaRef = "";
            articleMediaType = "";
            articleMediaSaving = false;
            renderArticleCover();
            if (articleCoverFile) articleCoverFile.value = "";
          }
          function setArticleCoverFile(file) {
            if (!file) return;
            const fileType = String(file.type || "").toLowerCase();
            articleMediaType = fileType.startsWith("video/") ? "video" : "image";
            articleMediaRef = "";
            articleMediaSaving = true;
            updateArticleReady();
            const storePromise = storeFeedCreateMedia(file, articleMediaType, file.name || "article-cover").catch(() => null);
            storePromise.then((record) => {
              articleMediaRef = record && (record.ref || record.id) || "";
              articleMediaSrc = record && record.src || "";
              renderArticleCover();
              if (!(record && (record.src || articleMediaRef)) && typeof showToast === "function") showToast("Article media upload failed. Try a smaller file or check your connection.");
            }).catch(() => {
              if (typeof showToast === "function") showToast("Could not read this article cover.");
            }).finally(() => {
              articleMediaSaving = false;
              updateArticleReady();
            });
          }
          function clearFeedEditTarget() {
            feedEditingId = "";
            feedEditingCreatedAt = "";
            feedEditingKind = "";
          }
          function clearDrafts() {
            [postText, eventName, eventLink, eventIntro, eventDescription, eventStartDate, eventStartTime, hiringTitle, hiringLocation, hiringIntro, hiringDescription, hiringApply, hiringNotes, articleTitle, articleBody, articleShare].forEach((node) => {
              if (node) node.value = "";
            });
            hiringEditingId = "";
            hiringDraftId = "";
            clearFeedEditTarget();
            clearPostMedia(true);
            clearEventCover();
            clearHiringCover(true);
            resetClipComposerState();
            setPostMode("update", false);
            clearArticleCover();
            updatePostReady();
            updateEventPreview();
            updateArticleReady();
          }
          function closeEverything(clear) {
            closePostCamera(true);
            [createMenu, clipFrameSheet, postSheet, postSourceSheet, postCameraSheet, eventSheet, hiringSheet, hiringPreviewSheet, jobApplySheet, articleEditor, articlePublish, discardSheet].forEach((sheet) => setOpen(sheet, false));
            if (clear) clearDrafts();
          }
          function closeEverythingForPublishedPost() {
            [createMenu, clipFrameSheet, postSheet, postSourceSheet, postCameraSheet, eventSheet, hiringSheet, hiringPreviewSheet, jobApplySheet, articleEditor, articlePublish, discardSheet].forEach((sheet) => setOpen(sheet, false));
            runFeedCreateAfterPaint(() => {
              closePostCamera(true);
              clearDrafts();
            });
          }
          function feedCreateTimeLooksFake(value) {
            return /^(now|just now)$/i.test(String(value || "").trim());
          }
          function feedCreateRealTimeLabel(value, fallback) {
            const raw = String(value || "").trim();
            const fallbackText = String(fallback || "").trim();
            const date = raw ? new Date(raw) : null;
            if (!date || Number.isNaN(date.getTime())) return fallbackText && !feedCreateTimeLooksFake(fallbackText) ? fallbackText : "Time saved";
            const now = new Date();
            const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
            const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
            if (startDate === startToday) return "Today at " + time;
            if (startDate === startToday - 86400000) return "Yesterday at " + time;
            const dateOptions = date.getFullYear() === now.getFullYear() ? { day: "numeric", month: "short" } : { day: "numeric", month: "short", year: "numeric" };
            return date.toLocaleDateString("en-GB", dateOptions) + " at " + time;
          }
          function feedCreatePublishedToast(kind, wasEditing) {
            if (typeof showToast !== "function") return;
            if (wasEditing) {
              const editLabels = { post: "Post updated.", job: "Job updated.", event: "Event updated.", article: "Article updated." };
              showToast(editLabels[kind] || "Update saved.");
              return;
            }
            const labels = { post: "Post published.", job: "Job posted.", event: "Event posted.", article: "Article published." };
            showToast(labels[kind] || "Posted to Feeds.");
          }
          function publishFeedCreatedItem(kind, title, text, extra) {
            const cleanTitle = String(title || "").trim();
            const cleanText = String(text || "").trim();
            const extraData = normaliseFeedCreateMediaPayload(Object.assign({}, extra || {}));
            const rawKind = kind === "hiring" ? "job" : (kind || "post");
            const itemKind = rawKind;
            const itemTag = rawKind === "article" ? "Article" : itemKind === "event" ? "Event" : itemKind === "job" ? "Job" : (extraData.tag || "Post");
            const wasEditing = !!feedEditingId || (itemKind === "job" && !!hiringEditingId);
            const createdAt = extraData.createdAt || extraData.postedAt || feedEditingCreatedAt || new Date().toISOString();
            const hasMedia = !!(extraData.mediaSrc || extraData.mediaRef || (Array.isArray(extraData.mediaItems) && extraData.mediaItems.length));
            const mediaDetailKind = feedPostDetailKind(extraData);
            const actorRole = feedCreateActorRole();
            const payload = {
              id: extraData.id || feedEditingId || (itemKind === "job" ? hiringEditingId : "") || ("feed-create-" + Date.now()),
              type: rawKind,
              kind: itemKind,
              createType: extraData.createType || rawKind,
              tag: itemTag,
              actor: actorName(),
              avatarSrc: feedCreateActorPhoto(),
              avatarRef: feedCreateActorPhotoRef(),
              createdAt,
              postedAt: createdAt,
              updatedAt: new Date().toISOString(),
              time: feedCreateRealTimeLabel(createdAt, "Time saved"),
              title: cleanTitle || (rawKind === "article" ? "New article" : itemKind === "event" ? "New event" : itemKind === "job" ? "New job post" : mediaDetailKind ? "" : "New update"),
              text: cleanText || (hasMedia ? "" : (actorRole === "business" ? "New business update." : "New customer update."))
            };
            Object.assign(payload, extraData);
            normaliseFeedCreateMediaPayload(payload);
            if (hasMedia && isGenericPostCaption(payload.text)) payload.text = "";
            if (hasMedia && isGenericPostCaption(payload.title)) payload.title = "";
            if (!payload.description && payload.text) payload.description = payload.text;
            payload.createdAt = payload.createdAt || createdAt;
            payload.postedAt = payload.postedAt || payload.createdAt;
            payload.updatedAt = new Date().toISOString();
            payload.time = feedCreateRealTimeLabel(payload.createdAt, payload.time || "Time saved");
            applyFeedCreateOwnership(payload);
            if (!payload.mediaRef && Array.isArray(payload.mediaItems) && payload.mediaItems[0] && payload.mediaItems[0].ref) {
              payload.mediaRef = payload.mediaItems[0].ref;
            }
            if (!payload.mediaType && Array.isArray(payload.mediaItems) && payload.mediaItems[0] && payload.mediaItems[0].type) {
              payload.mediaType = payload.mediaItems[0].type;
            }
            if (payload.mediaType === "image" && payload.mediaRef && !payload.mediaSrc && !payload.image) {
              payload.image = "";
            }
            const saved = itemKind === "job"
              ? persistCreatedJob(payload)
              : itemKind === "event"
                ? persistCreatedEvent(payload)
                : persistCreatedPost(payload);
            if (!saved) return false;
            const syncDetail = wasEditing
              ? { action: "edit", id: payload.id, feedId: payload.id, kind: itemKind }
              : { action: "create", id: payload.id, feedId: payload.id, kind: itemKind };
            feedCreatePublishedToast(itemKind, wasEditing);
            try { window.__emyLastPublishedFeedItem = payload; } catch (error) {}
            closeEverythingForPublishedPost();
            let createdFeedItemDelivered = false;
            const deliverCreatedFeedItem = () => {
              if (wasEditing || typeof addCreatedFeedItem !== "function" || createdFeedItemDelivered) return;
              createdFeedItemDelivered = true;
              try {
                Object.defineProperty(payload, "__emyFeedCreateAlreadyPersisted", { value: true, configurable: true });
                addCreatedFeedItem(payload);
              } catch (error) {
                reportFeedCreateRenderError(error);
              }
            };
            const shouldDeliverImmediately = feedCreateActorRole() === "business" && itemKind === "clip";
            if (shouldDeliverImmediately) deliverCreatedFeedItem();
            runFeedCreateAfterPaint(() => scheduleFeedCreateHeavyInteraction(() => {
              deliverCreatedFeedItem();
              if (typeof window.emySyncContentSurfaces === "function") {
                try { window.emySyncContentSurfaces(syncDetail); } catch (error) { reportFeedCreateRenderError(error); }
              } else if (typeof refreshHomeFeedSurfacesFromStorage === "function") {
                try { refreshHomeFeedSurfacesFromStorage({ detail: syncDetail }); } catch (error) { reportFeedCreateRenderError(error); }
              } else if (typeof renderAnnexedFeeds === "function") {
                try { renderAnnexedFeeds(); } catch (error) { reportFeedCreateRenderError(error); }
              } else if (typeof window.emyRenderAnnexedFeeds === "function") {
                try { window.emyRenderAnnexedFeeds(); } catch (error) { reportFeedCreateRenderError(error); }
              }
            }));
            return payload;
          }
          const hiringDraftStorageKey = "emyFeedHiringDraft";
          const createdPostsStorageKey = "emyFeedCreatedPosts";
          const createdClipsStorageKey = "emyFeedCreatedClips";
          const createdJobsStorageKey = "emyFeedCreatedJobs";
          const createdEventsStorageKey = "emyFeedCreatedEvents";
          function readHiringDraftRecord() {
            try {
              const parsed = JSON.parse(localStorage.getItem(hiringDraftStorageKey) || "null");
              return parsed && typeof parsed === "object" ? parsed : null;
            } catch (error) {
              return null;
            }
          }
          function writeHiringDraftRecord(draft) {
            try {
              localStorage.setItem(hiringDraftStorageKey, JSON.stringify(draft || {}));
              return true;
            } catch (error) {
              if (typeof showToast === "function") showToast("EMY could not save this job draft because browser storage is full.");
              return false;
            }
          }
          function clearHiringDraftRecord() {
            try { localStorage.removeItem(hiringDraftStorageKey); } catch (error) {}
          }
          function isSavedHiringDraft(draft) {
            return !!(draft && typeof draft === "object" && draft.draftMode === "saved");
          }
          function readJsonArray(key) {
            try {
              const parsed = JSON.parse(localStorage.getItem(key) || "[]");
              return Array.isArray(parsed) ? parsed : [];
            } catch (error) {
              return [];
            }
          }
          function feedStorageIsQuotaError(error) {
            return !!error && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED" || String(error.message || "").toLowerCase().includes("quota"));
          }
          function reportFeedCreateRenderError(error) {
            try { console.warn("EMY saved this feed item, but the page could not redraw immediately.", error); } catch (logError) {}
            if (typeof showToast === "function") showToast("Posted. Refresh Feeds if it does not appear straight away.");
          }
          function feedTrimLargeInlineMedia(item) {
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
              if (typeof next[key] === "string" && next[key].length > 180000 && hasRefForInlineMedia(key)) {
                next[key] = "";
              }
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
          function compactFeedStorageForWrite() {
            try { localStorage.removeItem("emyPendingEventCoverSrc"); } catch (error) {}
            [createdEventsStorageKey, createdPostsStorageKey, createdClipsStorageKey, createdJobsStorageKey].forEach((key) => {
              try {
                const parsed = JSON.parse(localStorage.getItem(key) || "[]");
                if (!Array.isArray(parsed)) return;
                const limit = key === createdPostsStorageKey ? 40 : 30;
                localStorage.setItem(key, JSON.stringify(parsed.slice(0, limit).map(feedTrimLargeInlineMedia)));
              } catch (error) {}
            });
          }
          function writeJsonArray(key, items, limit) {
            const next = (items || []).slice(0, limit || 60).map(feedTrimLargeInlineMedia);
            try {
              localStorage.setItem(key, JSON.stringify(next));
              return true;
            } catch (error) {
              if (!feedStorageIsQuotaError(error)) return false;
            }
            compactFeedStorageForWrite();
            try {
              localStorage.setItem(key, JSON.stringify(next.slice(0, Math.min(next.length, 20)).map(feedTrimLargeInlineMedia)));
              return true;
            } catch (error) {
              if (typeof showToast === "function") showToast("EMY could not save this yet because browser storage is full.");
              return false;
            }
          }
          function notifyFeedContentChanged(detail) {
            const payload = Object.assign({ action: "create", source: "feed-create" }, detail || {});
            if (window.emyContentSync && typeof window.emyContentSync.notify === "function") {
              try { window.emyContentSync.notify(payload); } catch (error) {}
            }
          }
          function scheduleCreatedContentUpdate(eventName, detail, flushKeys) {
            const run = () => {
              try { window.dispatchEvent(new CustomEvent(eventName, { detail: detail })); } catch (error) {}
              notifyFeedContentChanged(detail);
              if (flushKeys && flushKeys.length && typeof window.emyFlushSharedPortContentKeys === "function") {
                window.emyFlushSharedPortContentKeys(flushKeys, "create-flush");
              }
            };
            runFeedCreateAfterPaint(() => scheduleFeedCreateHeavyInteraction(run));
          }
          function feedCreatedClipText(value, fallback) {
            const text = String(value || "").replace(/\s+/g, " ").trim();
            return text || (fallback || "");
          }
          function feedCreatedClipIsProduct(payload) {
            const marker = String([
              payload && payload.clipKind,
              payload && payload.reelKind,
              payload && payload.clipType,
              payload && payload.reelType,
              payload && payload.tag,
              payload && payload.category,
              payload && payload.title,
              payload && payload.description,
              payload && payload.text
            ].filter(Boolean).join(" ")).toLowerCase();
            return /product\s*clip|shared\s+a\s+product\s+clip|product\s+video|clip\s+product/.test(marker) ||
              !!(payload && (payload.productName || payload.productTitle || payload.productDescription || payload.productInfo || payload.price || payload.priceText));
          }
          function feedCreatedClipMediaRows(payload) {
            const rawRows = Array.isArray(payload && payload.mediaItems) ? payload.mediaItems.filter(Boolean) : [];
            const fallbackPromoted = feedCreatePromoteStoredMediaRef(
              payload && (payload.mediaRef || payload.videoRef ? "" : (payload.mediaSrc || payload.video || payload.videoSrc || payload.videoUrl || payload.clipVideoSrc || payload.reelSrc || "")),
              payload && (payload.mediaRef || payload.videoRef || "")
            );
            const fallbackRow = {
              type: "video",
              src: fallbackPromoted.src,
              ref: fallbackPromoted.ref,
              posterSrc: payload && (payload.posterRef || payload.thumbnailRef ? "" : (payload.posterSrc || payload.thumbnailSrc || "")),
              posterRef: payload && (payload.posterRef || payload.thumbnailRef || ""),
              thumbnailSrc: payload && (payload.posterRef || payload.thumbnailRef ? "" : (payload.thumbnailSrc || payload.posterSrc || "")),
              thumbnailRef: payload && (payload.thumbnailRef || payload.posterRef || ""),
              cloudinaryPublicId: payload && (payload.cloudinaryPublicId || payload.mediaPublicId || payload.videoPublicId || payload.publicId || ""),
              cloudinaryResourceType: payload && (payload.cloudinaryResourceType || payload.resourceType || payload.resource_type || payload.mediaType || "video"),
              cloudinaryPosterPublicId: payload && (payload.cloudinaryPosterPublicId || payload.posterPublicId || payload.thumbnailPublicId || ""),
              settings: Object.assign({}, payload && payload.mediaSettings || {})
            };
            const rows = rawRows.length ? rawRows : [fallbackRow];
            return rows.map((row) => {
              const rowPromoted = feedCreatePromoteStoredMediaRef(
                row.src || row.mediaSrc || row.secureUrl || row.secure_url || row.url || row.video || row.videoSrc || row.videoUrl || row.clipVideoSrc || row.reelSrc || "",
                row.ref || row.mediaRef || row.videoRef || ""
              );
              const ref = rowPromoted.ref;
              const src = ref ? "" : rowPromoted.src;
              const publicId = row.cloudinaryPublicId || row.mediaPublicId || row.videoPublicId || row.publicId || row.public_id || "";
              const resourceType = row.cloudinaryResourceType || row.resourceType || row.resource_type || row.mediaType || row.type || "video";
              const posterRef = row.posterRef || row.thumbnailRef || row.settings && (row.settings.posterRef || row.settings.thumbnailRef) || "";
              return Object.assign({}, row, {
                type: "video",
                src,
                ref,
                posterSrc: posterRef ? "" : (row.posterSrc || row.thumbnailSrc || row.settings && (row.settings.posterSrc || row.settings.thumbnailSrc) || ""),
                posterRef,
                thumbnailSrc: posterRef ? "" : (row.thumbnailSrc || row.posterSrc || row.settings && (row.settings.thumbnailSrc || row.settings.posterSrc) || ""),
                thumbnailRef: row.thumbnailRef || row.posterRef || row.settings && (row.settings.thumbnailRef || row.settings.posterRef) || "",
                cloudinaryPublicId: publicId,
                cloudinaryResourceType: resourceType,
                cloudinaryPosterPublicId: row.cloudinaryPosterPublicId || row.posterPublicId || row.thumbnailPublicId || "",
                settings: Object.assign({}, row.settings || {}, payload && payload.mediaSettings || {})
              });
            }).filter((row) => row && (row.src || row.ref || row.cloudinaryPublicId));
          }
          function persistBusinessCreatedClipCopy(payload) {
            if (!payload || typeof payload !== "object") return false;
            const mediaItems = feedCreatedClipMediaRows(payload);
            const firstMedia = mediaItems[0] || {};
            const mediaRef = firstMedia.ref || payload.mediaRef || payload.videoRef || "";
            const mediaSrc = mediaRef ? "" : (firstMedia.src || payload.mediaSrc || payload.video || payload.videoSrc || payload.videoUrl || payload.clipVideoSrc || payload.reelSrc || "");
            const publicId = firstMedia.cloudinaryPublicId || payload.cloudinaryPublicId || payload.videoPublicId || payload.publicId || "";
            if (!(mediaRef || mediaSrc || publicId)) return false;
            const isProductClip = feedCreatedClipIsProduct(payload);
            const businessKey = feedCreatedClipText(payload.businessKey || payload.key || payload.profileKey || feedCreateBusinessKey(), "profile");
            const businessName = feedCreatedClipText(payload.businessName || payload.business || payload.name || actorName(), "Your Business");
            const id = feedCreatedClipText(payload.id || payload.feedId || payload.clipId || payload.reelId || ("business-clip-" + Date.now()));
            const title = feedCreatedClipText((isProductClip && (payload.productName || payload.productTitle)) || payload.clipTitle || payload.title || payload.text, isProductClip ? "Product clip" : "Business clip");
            const description = feedCreatedClipText((isProductClip && (payload.productDescription || payload.productInfo)) || payload.description || payload.text, isProductClip ? "Short product clip." : "Short business clip.");
            const posterRef = firstMedia.posterRef || payload.posterRef || payload.thumbnailRef || "";
            const posterSrc = posterRef ? "" : (firstMedia.posterSrc || firstMedia.thumbnailSrc || payload.posterSrc || payload.thumbnailSrc || "");
            const clip = Object.assign({}, payload, {
              id,
              feedId: id,
              clipId: payload.clipId || id,
              reelId: payload.reelId || payload.clipId || id,
              type: "clip",
              kind: "clip",
              createType: "clip",
              postMode: "clip",
              tag: isProductClip ? "Product Clip" : "Clip",
              clipKind: isProductClip ? "product" : "business",
              reelKind: isProductClip ? "product" : "business",
              clipType: isProductClip ? "product" : "business",
              reelType: isProductClip ? "product" : "business",
              source: "business-create",
              createdFrom: "business-create",
              owner: "business",
              createdAs: "business",
              accountType: "business",
              actorType: "business",
              role: "business",
              authorRole: "business",
              businessKey,
              key: businessKey,
              profileKey: businessKey,
              businessName,
              business: businessName,
              name: businessName,
              actor: businessName,
              author: businessName,
              title,
              clipTitle: title,
              description,
              text: payload.text || description,
              mediaSrc,
              mediaRef,
              mediaType: "video",
              video: mediaRef ? "" : (mediaSrc || ""),
              image: "",
              mediaItems,
              posterSrc,
              posterRef,
              thumbnailSrc: payload.thumbnailSrc || posterSrc,
              thumbnailRef: payload.thumbnailRef || posterRef,
              cloudinaryPublicId: publicId,
              cloudinaryResourceType: firstMedia.cloudinaryResourceType || payload.cloudinaryResourceType || "video",
              cloudinaryPosterPublicId: firstMedia.cloudinaryPosterPublicId || payload.cloudinaryPosterPublicId || "",
              profileHref: "emy-business-profile.html?business=" + encodeURIComponent(businessKey || businessName),
              status: "published",
              publishStatus: "published",
              visibility: "public",
              liveStatus: "active",
              isPublished: true,
              published: true,
              isLive: true,
              my: true,
              isUserPost: false,
              createdAt: payload.createdAt || new Date().toISOString(),
              postedAt: payload.postedAt || payload.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
            const storageKey = isProductClip ? "emyBusinessProductReels" : "emyBusinessClips";
            const ids = [clip.id, clip.clipId, clip.reelId].map((value) => feedCreatedClipText(value)).filter(Boolean);
            const rows = readJsonArray(storageKey).filter((item) => {
              if (!item) return false;
              const rowIds = [item.id, item.feedId, item.clipId, item.reelId].map((value) => feedCreatedClipText(value)).filter(Boolean);
              return !rowIds.some((rowId) => ids.indexOf(rowId) !== -1);
            });
            rows.unshift(clip);
            if (!writeJsonArray(storageKey, rows, 120)) return false;
            const syncedKeys = [storageKey];
            const createdClipRows = readJsonArray(createdClipsStorageKey).filter((item) => {
              if (!item) return false;
              const rowIds = [item.id, item.feedId, item.clipId, item.reelId].map((value) => feedCreatedClipText(value)).filter(Boolean);
              return !rowIds.some((rowId) => ids.indexOf(rowId) !== -1);
            });
            createdClipRows.unshift(clip);
            if (writeJsonArray(createdClipsStorageKey, createdClipRows, 120)) syncedKeys.push(createdClipsStorageKey);
            scheduleCreatedContentUpdate("emy:business-clips-changed", { action: "create", kind: "clip", id, feedId: id, storageKey, sharedStorageKey: createdClipsStorageKey, businessKey }, syncedKeys);
            return true;
          }
          function persistCreatedPost(payload) {
            const posts = readJsonArray(createdPostsStorageKey);
            const existingIndex = posts.findIndex((item) => item && item.id === payload.id);
            if (existingIndex >= 0) posts[existingIndex] = payload;
            else posts.unshift(payload);
            if (!writeJsonArray(createdPostsStorageKey, posts, 80)) return false;
            const isBusinessPost = String(payload.owner || payload.createdAs || payload.actorType || "").toLowerCase() === "business" || feedCreateActorRole() === "business";
            const isClipPayload = /clip|reel/.test(String([payload.kind, payload.type, payload.createType, payload.postMode, payload.tag, payload.clipKind, payload.reelKind, payload.clipType, payload.reelType].filter(Boolean).join(" ")).toLowerCase());
            if (isBusinessPost && isClipPayload && !persistBusinessCreatedClipCopy(payload)) return false;
            if (isBusinessPost && !isClipPayload) {
              ["emyBusinessPosts", "emyBusinessFeedPosts"].forEach((businessKey) => {
                const businessPosts = readJsonArray(businessKey);
                const businessIndex = businessPosts.findIndex((item) => item && item.id === payload.id);
                if (businessIndex >= 0) businessPosts[businessIndex] = payload;
                else businessPosts.unshift(payload);
                writeJsonArray(businessKey, businessPosts, 80);
              });
            }
            const detail = { id: payload.id, action: existingIndex >= 0 ? "edit" : "create", createType: payload.createType || payload.postMode || payload.tag || "post" };
            scheduleCreatedContentUpdate("emy:created-posts-changed", detail, [createdPostsStorageKey]);
            return true;
          }
          function persistCreatedJob(payload) {
            const jobs = readJsonArray(createdJobsStorageKey);
            const existingIndex = jobs.findIndex((item) => item && item.id === payload.id);
            if (existingIndex >= 0) jobs[existingIndex] = payload;
            else jobs.unshift(payload);
            if (!writeJsonArray(createdJobsStorageKey, jobs, 60)) return false;
            const isBusinessJob = String(payload.owner || payload.createdAs || payload.actorType || "").toLowerCase() === "business" || feedCreateActorRole() === "business";
            if (isBusinessJob) {
              ["emyBusinessJobs", "emyBusinessJobPosts"].forEach((key) => {
                const businessJobs = readJsonArray(key);
                const businessIndex = businessJobs.findIndex((item) => item && item.id === payload.id);
                if (businessIndex >= 0) businessJobs[businessIndex] = payload;
                else businessJobs.unshift(payload);
                writeJsonArray(key, businessJobs, 60);
              });
            }
            const detail = { id: payload.id, action: existingIndex >= 0 ? "edit" : "create", kind: "job" };
            scheduleCreatedContentUpdate("emy:created-jobs-changed", detail, [createdJobsStorageKey]);
            return true;
          }
          function persistCreatedEvent(payload) {
            const events = readJsonArray(createdEventsStorageKey);
            const existingIndex = events.findIndex((item) => item && item.id === payload.id);
            if (existingIndex >= 0) events[existingIndex] = payload;
            else events.unshift(payload);
            if (!writeJsonArray(createdEventsStorageKey, events, 60)) return false;
            const detail = { id: payload.id, action: existingIndex >= 0 ? "edit" : "create", kind: "event" };
            scheduleCreatedContentUpdate("emy:created-events-changed", detail, [createdEventsStorageKey]);
            return true;
          }
          function updateCreatedJob(id, patch) {
            const cleanId = String(id || "").trim();
            if (!cleanId) return;
            const jobs = readJsonArray(createdJobsStorageKey);
            const next = jobs.map((item) => item && item.id === cleanId ? Object.assign({}, item, patch || {}) : item);
            writeJsonArray(createdJobsStorageKey, next, 60);
            window.dispatchEvent(new CustomEvent("emy:created-jobs-changed", { detail: { id: cleanId } }));
          }
          function scheduleFeedCreateHeavyInteraction(callback) {
            const schedule = window.emyScheduleHeavyInteraction;
            if (typeof schedule === "function") {
              schedule(callback, { timeout: 900 });
              return;
            }
            if (typeof window.requestIdleCallback === "function") {
              window.requestIdleCallback(callback, { timeout: 900 });
              return;
            }
            window.setTimeout(callback, 50);
          }
          function deleteCreatedJob(id, options) {
            const cleanId = String(id || "").trim();
            if (!cleanId) return;
            const runDelete = () => {
              const jobs = readJsonArray(createdJobsStorageKey).filter((item) => item && item.id !== cleanId);
              writeJsonArray(createdJobsStorageKey, jobs, 60);
              window.dispatchEvent(new CustomEvent("emy:created-jobs-changed", { detail: { id: cleanId } }));
            };
            if (options && options.defer) scheduleFeedCreateHeavyInteraction(runDelete);
            else runDelete();
          }
          function textFromJobCard(card, selector, fallback) {
            const node = card && card.querySelector(selector);
            const text = node ? String(node.textContent || "").trim() : "";
            return text || fallback || "";
          }
          function jobPayloadFromCard(card) {
            const data = card && card.dataset ? card.dataset : {};
            const business = data.detailBusiness || textFromJobCard(card, ".feed-job-business span", actorName());
            const title = data.detailTitle || textFromJobCard(card, ".feed-job-hero strong", "Help wanted");
            const location = data.jobLocation || "Location to confirm";
            const workplace = data.jobWorkplace || "On-site";
            const employment = data.jobEmployment || "Flexible";
            const apply = data.jobApply || "Message this business on EMY";
            const notes = data.jobNotes || "";
            const mediaNode = feedEditMediaNode(card);
            const coverSrc = data.detailMediaSrc || data.jobCoverSrc || feedEditMediaNodeSrc(mediaNode) || "";
            const coverRef = data.detailMediaRef || data.jobCoverRef || feedEditMediaNodeRef(mediaNode) || "";
            const coverType = data.detailMediaType || data.jobCoverType || feedEditMediaNodeType(mediaNode) || (coverSrc || coverRef ? "image" : "");
            return {
              id: data.feedId || ("job-" + Date.now()),
              business,
              businessKey: data.businessKey || business.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "business",
              jobTitle: title,
              title,
              location,
              jobLocation: location,
              workplace,
              employment,
              experience: data.jobExperience || "Open to applicants",
              feedIntro: data.feedIntro || textFromJobCard(card, ".feed-job-desc", ""),
              description: data.detailDescription || textFromJobCard(card, ".feed-job-desc", business + " is hiring for a local role."),
              apply,
              notes,
              coverSrc: coverRef ? "" : coverSrc,
              jobCoverSrc: coverRef ? "" : coverSrc,
              mediaSrc: coverRef ? "" : coverSrc,
              coverRef,
              jobCoverRef: coverRef,
              mediaRef: coverRef,
              coverType,
              jobCoverType: coverType,
              mediaType: coverType,
              applicants: Number(data.jobApplicants) || Number((textFromJobCard(card, "[data-feed-job-applicants]", "0").match(/\d+/) || ["0"])[0]) || 0,
              stats: textFromJobCard(card, "[data-feed-job-applicants]", "0 applicants"),
              createdAt: data.jobCreatedAt || new Date().toISOString()
            };
          }
          function applicantLabel(count) {
            const next = Math.max(0, Number(count) || 0);
            return next + " applicant" + (next === 1 ? "" : "s");
          }
          function jobApplicationsStatusHref() {
            return "emy-customer-profile.html#applications";
          }
          function jobIdentitySlug(value) {
            return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
          }
          function readCustomerJobApplications() {
            try {
              const rows = JSON.parse(localStorage.getItem("emyJobApplications") || "[]");
              return Array.isArray(rows) ? rows : [];
            } catch (error) {
              return [];
            }
          }
          function readCustomerAppliedJobFeedIds() {
            try {
              const rows = JSON.parse(localStorage.getItem("emyCustomerAppliedJobFeedIds") || "[]");
              return Array.isArray(rows) ? rows.map((value) => String(value || "").trim()).filter(Boolean) : [];
            } catch (error) {
              return [];
            }
          }
          function writeCustomerAppliedJobFeedIds(ids) {
            try {
              localStorage.setItem("emyCustomerAppliedJobFeedIds", JSON.stringify(Array.from(new Set(ids)).slice(0, 120)));
            } catch (error) {}
          }
          function jobCardIdentityKeys(card) {
            const data = card && card.dataset ? card.dataset : {};
            const job = jobPayloadFromCard(card);
            const keys = new Set();
            function add(value) {
              const clean = String(value || "").trim();
              if (clean) keys.add(clean);
            }
            add(data.feedId);
            add(data.originalFeedId);
            add(data.repostOriginalId);
            add(job.id);
            const titleSlug = jobIdentitySlug(job.jobTitle || job.title || textFromJobCard(card, ".feed-job-hero strong", ""));
            const businessSlug = jobIdentitySlug(job.businessKey || data.businessKey || job.business || data.detailBusiness);
            if (titleSlug && businessSlug) {
              add("feed-job-" + businessSlug + "-" + titleSlug);
              add("feed-hiring-" + businessSlug + "-" + titleSlug);
            }
            return keys;
          }
          function jobApplicationIdentityKeys(app) {
            const keys = new Set();
            function add(value) {
              const clean = String(value || "").trim();
              if (!clean) return;
              keys.add(clean);
              const base = clean.match(/^(.+)-application-/i);
              if (base && base[1]) keys.add(base[1]);
            }
            if (!app || typeof app !== "object") return keys;
            add(app.jobId);
            add(app.feedId);
            add(app.id);
            const titleSlug = jobIdentitySlug(app.jobTitle || app.title);
            const businessSlug = jobIdentitySlug(app.businessKey || app.business);
            if (titleSlug && businessSlug) add("feed-job-" + businessSlug + "-" + titleSlug);
            return keys;
          }
          function jobIdentityKeysOverlap(left, right) {
            if (!left || !right) return false;
            for (const key of left) if (right.has(key)) return true;
            return false;
          }
          function backfillCustomerAppliedJobFeedIds() {
            const pinned = readCustomerAppliedJobFeedIds();
            const seen = new Set(pinned);
            let changed = false;
            readCustomerJobApplications().forEach((app) => {
              jobApplicationIdentityKeys(app).forEach((key) => {
                if (seen.has(key)) return;
                pinned.push(key);
                seen.add(key);
                changed = true;
              });
            });
            if (changed) writeCustomerAppliedJobFeedIds(pinned);
          }
          function recordCustomerAppliedJobForCard(card) {
            if (!card) return;
            const keys = jobCardIdentityKeys(card);
            const next = readCustomerAppliedJobFeedIds();
            keys.forEach((key) => {
              if (!next.includes(key)) next.unshift(key);
            });
            writeCustomerAppliedJobFeedIds(next);
          }
          function customerHasAppliedToJob(card) {
            if (!card) return false;
            backfillCustomerAppliedJobFeedIds();
            const cardKeys = jobCardIdentityKeys(card);
            if (readCustomerAppliedJobFeedIds().some((id) => cardKeys.has(id))) return true;
            return readCustomerJobApplications().some((app) => jobIdentityKeysOverlap(cardKeys, jobApplicationIdentityKeys(app)));
          }
          function setJobApplyAppliedControl(control) {
            if (!control) return control;
            const href = jobApplicationsStatusHref();
            const label = "Already applied check your status here";
            let btn = control;
            if (control.tagName === "A") {
              btn = document.createElement("button");
              btn.type = "button";
              btn.className = String(control.className || "feed-job-apply").replace(/\bis-applied\b/g, "").trim();
              control.replaceWith(btn);
            }
            btn.setAttribute("data-feed-job-applied-link", "");
            btn.removeAttribute("data-feed-job-apply");
            btn.removeAttribute("data-feed-job-applicants-view");
            btn.classList.add("is-applied");
            btn.classList.remove("is-active");
            btn.textContent = label;
            btn.setAttribute("aria-label", label);
            btn.onclick = (event) => {
              if (event) {
                event.preventDefault();
                event.stopPropagation();
              }
              window.location.href = href;
            };
            return btn;
          }
          function setJobApplyCandidateControl(control) {
            if (!control) return control;
            const icon = control.querySelector && control.querySelector("svg");
            const iconHtml = icon ? icon.outerHTML : feedHiringActionIcon("apply");
            let btn = control;
            if (control.tagName === "A") {
              btn = document.createElement("button");
              btn.type = "button";
              btn.className = String(control.className || "feed-job-apply").replace(/\bis-applied\b/g, "").trim();
              control.replaceWith(btn);
            }
            btn.setAttribute("data-feed-job-apply", "");
            btn.removeAttribute("data-feed-job-applicants-view");
            btn.removeAttribute("data-feed-job-applied-link");
            btn.classList.remove("is-applied", "is-active");
            btn.innerHTML = iconHtml + "Apply with CV";
            btn.setAttribute("aria-label", "Apply with CV");
            btn.onclick = null;
            return btn;
          }
          function setJobApplyCreatorControl(control) {
            if (!control) return control;
            const icon = control.querySelector && control.querySelector("svg");
            const iconHtml = icon ? icon.outerHTML : feedHiringActionIcon("apply");
            let btn = control;
            if (control.tagName === "A") {
              btn = document.createElement("button");
              btn.type = "button";
              btn.className = String(control.className || "feed-job-apply").replace(/\bis-applied\b/g, "").trim();
              control.replaceWith(btn);
            }
            btn.setAttribute("data-feed-job-applicants-view", "");
            btn.removeAttribute("data-feed-job-apply");
            btn.removeAttribute("data-feed-job-applied-link");
            btn.classList.remove("is-applied", "is-active");
            btn.innerHTML = iconHtml + "See applicants CV's";
            btn.setAttribute("aria-label", "See applicants CV's");
            btn.onclick = null;
            return btn;
          }
          function persistJobApplicants(card, count) {
            const id = card && card.dataset && card.dataset.feedId;
            if (!id) return;
            updateCreatedJob(id, { applicants: count, stats: applicantLabel(count) });
          }
          function applyJobApplicationState(card) {
            if (!card) return 0;
            recordCustomerAppliedJobForCard(card);
            const applicants = card.querySelector("[data-feed-job-applicants]");
            const current = applicants ? (Number((applicants.textContent.match(/\d+/) || ["0"])[0]) || 0) : 0;
            const next = current + 1;
            if (applicants) applicants.textContent = applicantLabel(next);
            const stat = card.querySelector("[data-feed-stat]");
            if (stat) stat.textContent = applicantLabel(next);
            if (card.dataset) card.dataset.jobApplicants = String(next);
            persistJobApplicants(card, next);
            return next;
          }
          function formatJobApplicantDate(value) {
            try {
              const date = new Date(value);
              if (!Number.isFinite(date.getTime())) return "Applied recently";
              return date.toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
            } catch (error) {
              return "Applied recently";
            }
          }
          function jobApplicationTypeBadge(app) {
            if (app && app.profileShared) return "Profile shared";
            if (app && app.cvFile) return "CV file";
            if (app && app.cvLink) return "CV link";
            if (app && app.message) return "Message";
            return "Application";
          }
          function cleanJobCvText(value) {
            return String(value || "").replace(/\s+/g, " ").trim();
          }
          function jobCvPayloadFromFile(file, record) {
            if (!file && !record) return null;
            const name = cleanJobCvText(record && record.name || file && file.name || "CV document");
            const url = cleanJobCvText(record && (record.url || record.secureUrl || record.secure_url || record.cvFileUrl) || "");
            const publicId = cleanJobCvText(record && (record.publicId || record.public_id || record.cloudinaryPublicId) || "");
            const resourceType = cleanJobCvText(record && (record.resourceType || record.resource_type || record.cloudinaryResourceType) || "");
            return {
              cvFile: name,
              cvFileName: name,
              cvFileType: cleanJobCvText(record && record.mime || file && file.type || ""),
              cvFileSize: Number(record && record.size || file && file.size) || 0,
              cvFileRef: cleanJobCvText(record && (record.id || record.ref) || ""),
              cvFileDataUrl: cleanJobCvText(record && record.dataUrl || ""),
              cvFileUrl: url,
              cvCloudinaryPublicId: publicId,
              cvCloudinaryResourceType: resourceType,
              cvStoredInCloudinary: !!(url || publicId),
              cvFileStoredAt: new Date().toISOString()
            };
          }
          async function storeJobApplicationCvFile(file) {
            if (!file) return null;
            const name = cleanJobCvText(file.name || "CV document");
            const uploader = window.emyRealAuth && typeof window.emyRealAuth.uploadToCloudinary === "function" ? window.emyRealAuth.uploadToCloudinary : null;
            if (!uploader) throw new Error("Shared document upload is not ready yet.");
            const upload = await uploader(file, {
              folder: "emy/job-cvs",
              kind: "job-cv",
              name,
              resourceType: "raw",
              role: feedCreateActorRole(),
              timeoutMs: Math.max(60000, Number(window.emyCloudinaryDocumentUploadTimeoutMs) || 0)
            });
            const url = cleanJobCvText(upload && upload.url || "");
            if (!url) {
              throw new Error("CV document upload did not return a shared file URL.");
            }
            return jobCvPayloadFromFile(file, Object.assign({}, upload || {}, {
              name,
              mime: file.type || "",
              size: file.size || upload && upload.bytes || 0,
              url
            }));
          }
          function readJobApplicationsForJob(jobId, businessKey) {
            const id = String(jobId || "").trim();
            const key = String(businessKey || "").trim();
            const seen = new Set();
            const results = [];
            function addRows(rows) {
              (Array.isArray(rows) ? rows : []).forEach((app) => {
                if (!app || !id) return;
                const appId = String(app.id || "");
                if (!appId || seen.has(appId)) return;
                if (String(app.jobId || "") !== id) return;
                seen.add(appId);
                results.push(app);
              });
            }
            try { addRows(JSON.parse(localStorage.getItem("emyJobApplications") || "[]")); } catch (error) {}
            if (key) {
              try { addRows(JSON.parse(localStorage.getItem("emyBusinessJobApplications:" + key) || "[]")); } catch (error) {}
            }
            return results.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
          }
          function jobApplicationSharedDocId(value) {
            const text = cleanJobCvText(value || "application-" + Date.now());
            try {
              return btoa(unescape(encodeURIComponent(text))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "").slice(0, 420) || "application";
            } catch (error) {
              return text.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-|-$/g, "").slice(0, 420) || "application";
            }
          }
          function jobApplicationPlainRecord(application) {
            const source = application && typeof application === "object" ? application : {};
            const copy = {};
            Object.keys(source).forEach((key) => {
              const value = source[key];
              if (value === undefined || typeof value === "function") return;
              if (value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
                copy[key] = value;
              }
            });
            copy.sharedStorage = "firebase";
            copy.sharedAt = new Date().toISOString();
            return copy;
          }
          function mergeJobApplicationRows() {
            const seen = new Set();
            const rows = [];
            Array.from(arguments).forEach((group) => {
              (Array.isArray(group) ? group : []).forEach((app) => {
                if (!app) return;
                const key = cleanJobCvText(app.id || [app.jobId, app.applicantKey, app.createdAt, app.cvFileName || app.cvFile || app.cvLink].join(":"));
                if (key && seen.has(key)) return;
                if (key) seen.add(key);
                rows.push(app);
              });
            });
            return rows.sort((a, b) => new Date(b.createdAt || b.sharedAt || 0).getTime() - new Date(a.createdAt || a.sharedAt || 0).getTime());
          }
          async function saveJobApplicationToSharedStorage(application) {
            if (!application || !window.emyRealAuth || typeof window.emyRealAuth.ready !== "function") return false;
            const ctx = await window.emyRealAuth.ready();
            const db = ctx && ctx.db;
            const user = ctx && ctx.auth && ctx.auth.currentUser;
            if (!db || !user) return false;
            const id = jobApplicationSharedDocId(application.id || [application.jobId, user.uid, application.createdAt].join(":"));
            const businessDoc = jobApplicationSharedDocId(application.businessKey || application.business || "business");
            const record = Object.assign(jobApplicationPlainRecord(application), {
              id: application.id || id,
              applicantUserId: user.uid,
              updatedAtIso: new Date().toISOString()
            });
            await Promise.all([
              db.collection("jobApplications").doc(id).set(record, { merge: true }),
              db.collection("businessJobApplications").doc(businessDoc).collection("applications").doc(id).set(record, { merge: true })
            ]);
            return true;
          }
          async function readSharedJobApplicationsForJob(job) {
            const id = cleanJobCvText(job && job.id);
            if (!id || !window.emyRealAuth || typeof window.emyRealAuth.ready !== "function") return [];
            const ctx = await window.emyRealAuth.ready();
            const db = ctx && ctx.db;
            if (!db) return [];
            const rows = [];
            function addSnapshot(snapshot) {
              if (!snapshot || !snapshot.forEach) return;
              snapshot.forEach((doc) => {
                const data = doc && typeof doc.data === "function" ? doc.data() || {} : {};
                if (String(data.jobId || "") !== id) return;
                rows.push(Object.assign({ id: data.id || doc.id }, data));
              });
            }
            const businessDoc = jobApplicationSharedDocId(job.businessKey || job.business || "business");
            const businessSnap = await db.collection("businessJobApplications").doc(businessDoc).collection("applications").where("jobId", "==", id).limit(100).get().catch(() => null);
            addSnapshot(businessSnap);
            const directSnap = await db.collection("jobApplications").where("jobId", "==", id).limit(100).get().catch(() => null);
            addSnapshot(directSnap);
            return mergeJobApplicationRows(rows);
          }
          function renderJobApplicantsIntoSheet(job, apps, options) {
            const rows = Array.isArray(apps) ? apps : [];
            const opts = options || {};
            if (!opts.keepVisible) activeJobApplicantsVisibleCount = JOB_APPLICANTS_BATCH_SIZE;
            activeJobApplicantsRows = rows;
            if (jobApplicantsTitle) jobApplicantsTitle.textContent = "Job applicants";
            if (jobApplicantsSubtitle) jobApplicantsSubtitle.textContent = job.jobTitle || job.title || "Help wanted";
            if (jobApplicantsCount) jobApplicantsCount.textContent = rows.length + " applicant" + (rows.length === 1 ? "" : "s");
            if (jobApplicantsList) {
              const visibleRows = rows.slice(0, Math.max(JOB_APPLICANTS_BATCH_SIZE, activeJobApplicantsVisibleCount));
              const remainingRows = Math.max(0, rows.length - visibleRows.length);
              const moreButton = remainingRows > 0
                ? '<button class="feed-job-applicants-more" type="button" data-feed-job-applicants-more>Load 10 more (' + remainingRows + ' left)</button>'
                : "";
              jobApplicantsList.innerHTML = rows.length
                ? visibleRows.map(renderJobApplicantCard).join("") + moreButton
                : '<div class="feed-job-applicants-empty"><strong>No applications yet</strong><span>When people apply with a CV, link, or shared profile, they will appear here.</span></div>';
            }
          }
          function loadMoreJobApplicants(event) {
            stopFeedCreateEvent(event);
            activeJobApplicantsVisibleCount += JOB_APPLICANTS_BATCH_SIZE;
            const job = activeJobApplyCard ? jobPayloadFromCard(activeJobApplyCard) : {};
            renderJobApplicantsIntoSheet(job, activeJobApplicantsRows, { keepVisible: true });
          }
          function readAllJobApplications() {
            const rows = [];
            const seen = new Set();
            function addRows(items) {
              (Array.isArray(items) ? items : []).forEach((app) => {
                if (!app) return;
                const id = String(app.id || "");
                if (id && seen.has(id)) return;
                if (id) seen.add(id);
                rows.push(app);
              });
            }
            try { addRows(JSON.parse(localStorage.getItem("emyJobApplications") || "[]")); } catch (error) {}
            try {
              for (let index = 0; index < localStorage.length; index += 1) {
                const key = localStorage.key(index);
                if (!/^emyBusinessJobApplications:/.test(String(key || ""))) continue;
                addRows(JSON.parse(localStorage.getItem(key) || "[]"));
              }
            } catch (error) {}
            return rows;
          }
          function findJobApplicationById(id) {
            const cleanId = String(id || "").trim();
            if (!cleanId) return null;
            const activeMatch = activeJobApplicantsRows.find((app) => String(app && app.id || "") === cleanId);
            if (activeMatch) return activeMatch;
            const job = activeJobApplyCard ? jobPayloadFromCard(activeJobApplyCard) : null;
            const currentRows = job ? readJobApplicationsForJob(job.id, job.businessKey) : [];
            return currentRows.concat(readAllJobApplications()).find((app) => String(app && app.id || "") === cleanId) || null;
          }
          function triggerJobCvDownload(url, name) {
            if (!url) return false;
            const link = document.createElement("a");
            link.href = url;
            link.download = cleanJobCvText(name || "CV document") || "CV document";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            document.body.appendChild(link);
            link.click();
            window.setTimeout(() => link.remove(), 0);
            return true;
          }
          function downloadJobApplicantCv(id, event) {
            stopFeedCreateEvent(event);
            const app = findJobApplicationById(id);
            if (!app) {
              if (typeof showToast === "function") showToast("This CV application could not be found.");
              return;
            }
            const fileName = app.cvFileName || app.cvFile || "CV document";
            if (app.cvFileUrl) {
              triggerJobCvDownload(app.cvFileUrl, fileName);
              return;
            }
            if (app.cvFileDataUrl) {
              triggerJobCvDownload(app.cvFileDataUrl, fileName);
              return;
            }
            if (app.cvFileRef && window.emyResolveFeedMedia) {
              if (typeof showToast === "function") showToast("Preparing CV download...");
              window.emyResolveFeedMedia(app.cvFileRef).then((record) => {
                const url = record && record.url || "";
                if (!triggerJobCvDownload(url, fileName || record && record.name)) throw new Error("CV unavailable");
              }).catch(() => {
                if (typeof showToast === "function") showToast("This CV file was not found in saved storage. Ask the applicant to resend it or paste a CV link.");
              });
              return;
            }
            if (app.cvLink) {
              const href = /^https?:\/\//i.test(app.cvLink) ? app.cvLink : "https://" + app.cvLink;
              window.open(href, "_blank", "noopener,noreferrer");
              return;
            }
            if (typeof showToast === "function") showToast("This older application only saved the CV filename. Ask the applicant to resend the CV or add a CV link.");
          }
          function renderJobApplicantCard(app) {
            const name = escapeHtml(app.applicantName || "Applicant");
            const when = escapeHtml(formatJobApplicantDate(app.createdAt));
            const badge = escapeHtml(jobApplicationTypeBadge(app));
            const message = app.message ? '<p class="feed-job-applicant-message">' + escapeHtml(app.message) + '</p>' : "";
            let actions = "";
            if (app.profileShared) {
              const profileHref = app.applicantProfileHref || "emy-customer-profile.html";
              actions += '<a class="feed-job-applicant-link" href="' + escapeHtml(profileHref) + '">View profile</a>';
            }
            if (app.cvLink) {
              const href = /^https?:\/\//i.test(app.cvLink) ? app.cvLink : "https://" + app.cvLink;
              actions += '<a class="feed-job-applicant-link" href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer">Open CV link</a>';
            }
            if (app.cvFile) {
              const canDownload = !!(app.cvFileUrl || app.cvFileRef || app.cvFileDataUrl);
              actions += '<span class="feed-job-applicant-file">CV file: ' + escapeHtml(app.cvFileName || app.cvFile) + (canDownload ? '</span><button class="feed-job-applicant-link" type="button" data-feed-job-cv-download="' + escapeHtml(app.id || "") + '">Download CV</button>' : ' <small>file not stored for download</small></span>');
            }
            const actionsHtml = actions ? '<div class="feed-job-applicant-actions">' + actions + '</div>' : "";
            return '<article class="feed-job-applicant-card"><div class="feed-job-applicant-top"><strong>' + name + '</strong><span class="feed-job-applicant-badge">' + badge + '</span></div><small class="feed-job-applicant-date">' + when + '</small>' + message + actionsHtml + '</article>';
          }
          function openJobApplicants(card, event) {
            stopFeedCreateEvent(event);
            activeJobApplyCard = card && card.closest ? card.closest("[data-feed-id]") || card : card;
            const job = jobPayloadFromCard(activeJobApplyCard);
            const localApps = readJobApplicationsForJob(job.id, job.businessKey);
            renderJobApplicantsIntoSheet(job, localApps);
            if (jobApplicantsSheet && jobApplicantsSheet.parentElement !== document.body) {
              document.body.appendChild(jobApplicantsSheet);
            }
            setOpen(jobApplicantsSheet, true);
            const closeButton = jobApplicantsSheet && jobApplicantsSheet.querySelector("[data-feed-job-applicants-close]");
            if (closeButton) window.setTimeout(() => closeButton.focus(), 30);
            readSharedJobApplicationsForJob(job).then((sharedApps) => {
              const currentJob = activeJobApplyCard ? jobPayloadFromCard(activeJobApplyCard) : {};
              if (!jobApplicantsSheet || !jobApplicantsSheet.classList.contains("is-open")) return;
              if (String(currentJob.id || "") !== String(job.id || "")) return;
              renderJobApplicantsIntoSheet(job, mergeJobApplicationRows(localApps, sharedApps), { keepVisible: true });
            }).catch(() => {});
          }
          function emySyncJobCreatorButtons(root) {
            backfillCustomerAppliedJobFeedIds();
            const scope = root && root.querySelectorAll ? root : document;
            const cards = scope.querySelectorAll
              ? scope.querySelectorAll("[data-feed-id].is-job, [data-feed-id][data-detail-kind='Job'], [data-owned-job='true'], .home-posted-job-card[data-feed-id]")
              : [];
            cards.forEach((card) => {
              const control = card.querySelector("[data-feed-job-apply], [data-feed-job-applicants-view], [data-feed-job-applied-link]");
              if (!control) return;
              const isCreator = window.emyJobCardIsCreator && window.emyJobCardIsCreator(card);
              if (isCreator) setJobApplyCreatorControl(control);
              else if (customerHasAppliedToJob(card)) setJobApplyAppliedControl(control);
              else setJobApplyCandidateControl(control);
            });
          }
          function openJobApplication(card, event) {
            stopFeedCreateEvent(event);
            const sourceButton = event && event.target && event.target.closest ? event.target.closest("button") : null;
            activeJobApplyCard = card && card.closest ? card.closest("[data-feed-id]") || card : card;
            if (window.emyJobCardIsCreator && window.emyJobCardIsCreator(activeJobApplyCard)) {
              openJobApplicants(activeJobApplyCard, event);
              return;
            }
            if (customerHasAppliedToJob(activeJobApplyCard)) {
              window.location.href = jobApplicationsStatusHref();
              return;
            }
            activeJobApplyButton = sourceButton && (sourceButton.matches("[data-feed-job-apply], [data-feed-action='apply']") || sourceButton.closest("[data-feed-job-apply], [data-feed-action='apply']")) ? sourceButton : null;
            const job = jobPayloadFromCard(activeJobApplyCard);
            if (jobApplyBusiness) jobApplyBusiness.textContent = job.business;
            if (jobApplyJob) jobApplyJob.textContent = job.jobTitle || job.title;
            if (jobApplyMeta) jobApplyMeta.textContent = [job.location || job.jobLocation, job.workplace, job.employment].filter(Boolean).join(" · ");
            if (jobApplyMessage) jobApplyMessage.value = "Hi " + job.business + ", I am interested in " + (job.jobTitle || job.title) + ". I can share my CV and availability.";
            if (jobApplyCv) jobApplyCv.value = "";
            activeJobApplyFileName = "";
            activeJobApplyFileRecord = null;
            activeJobApplyFileSavePromise = null;
            activeJobApplyFileSaveFailed = false;
            if (jobApplyFileInput) {
              try { jobApplyFileInput.value = ""; } catch (error) {}
            }
            if (jobApplyFileName) jobApplyFileName.textContent = "No CV selected yet. You can also paste a link below.";
            if (jobApplyFile) jobApplyFile.classList.remove("is-active");
            if (jobApplyProfile) {
              jobApplyProfile.classList.add("is-active");
              jobApplyProfile.setAttribute("aria-pressed", "true");
            }
            if (jobApplyConsent) jobApplyConsent.checked = true;
            setOpen(jobApplySheet, true);
            if (jobApplyMessage) window.setTimeout(() => jobApplyMessage.focus(), 40);
          }
          async function submitJobApplication(event) {
            stopFeedCreateEvent(event);
            if (!activeJobApplyCard) return;
            const message = jobApplyMessage && jobApplyMessage.value.trim();
            const cvLink = jobApplyCv && jobApplyCv.value.trim();
            const cvFile = activeJobApplyFileName;
            const profileShared = !!((jobApplyProfile && jobApplyProfile.classList.contains("is-active")) || (jobApplyConsent && jobApplyConsent.checked));
            if (!message && !cvLink && !cvFile && !profileShared) {
              if (typeof showToast === "function") showToast("Add a message, attach a CV, paste a CV link, or share your EMY profile.");
              if (jobApplyMessage) jobApplyMessage.focus();
              return;
            }
            let cvRecord = activeJobApplyFileRecord;
            if (cvFile && activeJobApplyFileSavePromise) {
              const originalLabel = jobApplySubmit ? jobApplySubmit.textContent : "";
              if (jobApplySubmit) {
                jobApplySubmit.disabled = true;
                jobApplySubmit.textContent = "Saving CV...";
              }
              try {
                cvRecord = await activeJobApplyFileSavePromise;
              } catch (error) {
                cvRecord = null;
              } finally {
                if (jobApplySubmit) {
                  jobApplySubmit.disabled = false;
                  jobApplySubmit.textContent = originalLabel || "Send CV application";
                }
              }
            }
            if (cvFile && activeJobApplyFileSaveFailed && !cvRecord) {
              if (typeof showToast === "function") showToast("This CV file could not be saved for download. Try a smaller file or paste a CV link.");
              return;
            }
            const job = jobPayloadFromCard(activeJobApplyCard);
            const next = applyJobApplicationState(activeJobApplyCard);
            const applicationParts = [];
            if (message) applicationParts.push("Message: " + message);
            if (cvFile) applicationParts.push("CV file: " + cvFile);
            if (cvLink) applicationParts.push("CV/profile link: " + cvLink);
            if (profileShared) applicationParts.push("EMY profile shared");
            if (typeof pushFeedNotification === "function") {
              pushFeedNotification({
                id: (job.id || "job") + "-application-" + Date.now(),
                type: "job-application",
                group: "important",
                title: "New application for " + (job.jobTitle || job.title || "your job post"),
                body: applicationParts.join(" | "),
                businessKey: job.businessKey,
                businessName: job.business,
                initials: "A",
                avatar: feedCreateActorPhoto(),
                href: "emy-customer-home.html#feeds",
                createdAt: new Date().toISOString(),
                unread: true,
                notifyCustomer: false
              });
            }
            try {
              const application = {
                id: (job.id || "job") + "-application-" + Date.now(),
                jobId: job.id || "",
                jobTitle: job.jobTitle || job.title || "Job post",
                business: job.business,
                businessKey: job.businessKey,
                applicantName: actorName(),
                applicantKey: feedCreateActorRole() === "business" ? feedCreateBusinessKey() : "customer-profile",
                applicantProfileHref: feedCreateProfileHref(),
                applicantRole: feedCreateActorRole(),
                message,
                cvFile,
                cvFileName: cvRecord && cvRecord.cvFileName || cvFile,
                cvFileType: cvRecord && cvRecord.cvFileType || "",
                cvFileSize: cvRecord && cvRecord.cvFileSize || 0,
                cvFileRef: cvRecord && cvRecord.cvFileRef || "",
                cvFileDataUrl: cvRecord && cvRecord.cvFileDataUrl || "",
                cvFileUrl: cvRecord && cvRecord.cvFileUrl || "",
                cvCloudinaryPublicId: cvRecord && cvRecord.cvCloudinaryPublicId || "",
                cvCloudinaryResourceType: cvRecord && cvRecord.cvCloudinaryResourceType || "",
                cvStoredInCloudinary: !!(cvRecord && cvRecord.cvStoredInCloudinary),
                cvFileStoredAt: cvRecord && cvRecord.cvFileStoredAt || "",
                cvLink,
                profileShared,
                createdAt: new Date().toISOString()
              };
              const applications = JSON.parse(localStorage.getItem("emyJobApplications") || "[]");
              applications.unshift(application);
              localStorage.setItem("emyJobApplications", JSON.stringify(applications.slice(0, 80)));
              const businessApplications = JSON.parse(localStorage.getItem("emyBusinessJobApplications:" + (job.businessKey || job.business)) || "[]");
              businessApplications.unshift(application);
              localStorage.setItem("emyBusinessJobApplications:" + (job.businessKey || job.business), JSON.stringify(businessApplications.slice(0, 80)));
              saveJobApplicationToSharedStorage(application).then((saved) => {
                if (!saved && typeof showToast === "function") showToast("Application saved here. Sign in or check your connection so the business can see it.");
              }).catch(() => {
                if (typeof showToast === "function") showToast("Application saved here but could not be shared yet. Check your connection and try again.");
              });
            } catch (error) {}
            recordCustomerAppliedJobForCard(activeJobApplyCard);
            setOpen(jobApplySheet, false);
            activeJobApplyCard = null;
            activeJobApplyButton = null;
            activeJobApplyFileName = "";
            activeJobApplyFileRecord = null;
            activeJobApplyFileSavePromise = null;
            activeJobApplyFileSaveFailed = false;
            if (jobApplyFileInput) {
              try { jobApplyFileInput.value = ""; } catch (error) {}
            }
            if (typeof showToast === "function") showToast("Application sent with " + (cvFile ? "your CV file" : cvLink ? "your CV link" : profileShared ? "your EMY profile" : "your message") + ". " + job.business + " will see it in notifications.");
            window.dispatchEvent(new CustomEvent("emy:job-application-sent", { detail: { id: job.id, applicants: next, cvFile, cvLink, profileShared } }));
          }
          function editCreatedJobFromCard(card, event) {
            stopFeedCreateEvent(event);
            if (window.emyOpenOriginalFeedEdit && card && window.emyOpenOriginalFeedEdit(card, { kind: "job", showToast, event })) {
              return;
            }
            const draft = jobPayloadFromCard(card);
            hiringEditingId = draft.id || "";
            hiringDraftId = draft.id || "";
            writeHiringDraftRecord(Object.assign({}, draft, { draftMode: "edit" }));
            openChoice("hiring", event);
          }
          function deleteCreatedJobFromCard(card, event) {
            stopFeedCreateEvent(event);
            const id = card && card.dataset && card.dataset.feedId;
            const storedDeleted = window.emyDeleteStoredFeedItem && card ? window.emyDeleteStoredFeedItem(card, "job") : true;
            if (storedDeleted === false) {
              if (typeof showToast === "function") showToast("EMY could not delete this job yet.");
              return;
            }
            if (window.emyMarkDeletedFeedItem && card) window.emyMarkDeletedFeedItem(card);
            deleteCreatedJob(id, { defer: true });
            if (card && card.remove) card.remove();
            if (typeof showToast === "function") showToast("Job post deleted.");
          }
          window.emyOpenJobApplication = openJobApplication;
          window.emyOpenJobApplicants = openJobApplicants;
          window.emySyncJobCreatorButtons = emySyncJobCreatorButtons;
          window.emyCustomerHasAppliedToJob = customerHasAppliedToJob;
          window.emyJobApplicationsStatusHref = jobApplicationsStatusHref;
          window.emyEditCreatedJob = editCreatedJobFromCard;
          window.emyDeleteCreatedJob = deleteCreatedJobFromCard;
          function feedEditCleanText(value) {
            return String(value || "").replace(/\s+/g, " ").trim();
          }
          function feedEditCleanKey(value) {
            return feedEditCleanText(value).toLowerCase();
          }
          function feedEditMeta(card) {
            return String(card && card.dataset && card.dataset.detailMeta || "").split("|").map(feedEditCleanText);
          }
          function feedEditKindText(card, options, source) {
            const data = card && card.dataset || {};
            return [
              options && options.kind,
              data.detailKind,
              data.detailMediaType,
              data.articleBody ? "article" : "",
              source && source.kind,
              source && source.createType,
              source && source.postMode,
              source && source.tag,
              source && source.type,
              card && card.className
            ].join(" ").toLowerCase();
          }
          function feedEditStorageKeys(kindText) {
            const keys = [];
            if (kindText.indexOf("job") >= 0 || kindText.indexOf("hiring") >= 0) keys.push(createdJobsStorageKey);
            if (kindText.indexOf("event") >= 0) keys.push(createdEventsStorageKey);
            keys.push(createdPostsStorageKey, createdJobsStorageKey, createdEventsStorageKey);
            return keys.filter((key, index, list) => key && list.indexOf(key) === index);
          }
          function feedEditFindSource(card, options) {
            if (!card || !card.dataset) return null;
            const id = String(card.dataset.feedId || "").trim();
            const kindText = feedEditKindText(card, options || {}, null);
            const keys = feedEditStorageKeys(kindText);
            for (const key of keys) {
              const exact = readJsonArray(key).find((item) => item && String(item.id || "").trim() === id);
              if (exact) return exact;
            }
            const title = feedEditCleanKey(card.dataset.detailTitle);
            const business = feedEditCleanKey(card.dataset.detailBusiness);
            if (!title) return null;
            for (const key of keys) {
              const match = readJsonArray(key).find((item) => {
                if (!item || typeof item !== "object") return false;
                const itemTitle = feedEditCleanKey(item.title || item.jobTitle || item.eventName);
                const itemBusiness = feedEditCleanKey(item.business || item.actor || item.name);
                return itemTitle === title && (!business || !itemBusiness || itemBusiness === business);
              });
              if (match) return match;
            }
            return null;
          }
          function feedEditSetTarget(card, source, kind) {
            const data = card && card.dataset || {};
            feedEditingId = String(source && source.id || data.feedId || "").trim();
            feedEditingCreatedAt = String(source && (source.createdAt || source.postedAt) || "").trim();
            feedEditingKind = feedEditCleanText(kind || source && (source.createType || source.kind || source.postMode || source.tag) || data.detailKind || "");
          }
          function feedEditMediaSettings(card, type, stored) {
            const base = window.emyDefaultMediaEditSettings ? window.emyDefaultMediaEditSettings(type || "image") : { fit:"contain", zoom:1, x:0, y:0, aspect:"auto", overlay:"" };
            const storedSettings = stored && typeof stored === "object" ? stored : {};
            const media = card && card.querySelector("[data-business-posted-media],.business-posted-media,.social-feed-media,.feed-media,.photo,.home-created-media,.feed-article-card-cover,.feed-event-post-hero,.feed-job-hero");
            if (!media || !window.getComputedStyle) return Object.assign({}, base, storedSettings);
            const style = getComputedStyle(media);
            const css = (name, fallback) => String(media.style.getPropertyValue(name).trim() || style.getPropertyValue(name).trim() || fallback || "");
            const parseCssNumber = (name, fallback) => {
              const parsed = parseFloat(String(css(name, fallback)).replace("%", ""));
              return Number.isFinite(parsed) ? parsed : (Number(fallback) || 0);
            };
            return Object.assign({}, base, storedSettings, {
              fit: css("--media-fit", storedSettings.fit || base.fit || "contain"),
              zoom: parseCssNumber("--media-zoom", storedSettings.zoom || base.zoom || 1) || 1,
              x: parseCssNumber("--media-x", storedSettings.x || base.x || 0),
              y: parseCssNumber("--media-y", storedSettings.y || base.y || 0),
              aspect: css("--media-aspect-ratio", storedSettings.aspect || base.aspect || "auto") || storedSettings.aspect || base.aspect || "auto"
            });
          }
          function feedEditMediaNode(card) {
            return card && card.querySelector ? card.querySelector("[data-business-posted-media] video,[data-business-posted-media] img,.business-posted-media video,.business-posted-media img,.social-feed-media video,.social-feed-media img,.feed-media video,.feed-media img,.photo video,.photo img,.home-created-media video,.home-created-media img,.feed-article-card-cover video,.feed-article-card-cover img,.feed-event-post-hero video,.feed-event-post-hero img,.feed-job-hero video,.feed-job-hero img,.feed-job-cover-media,.home-flow-media video,.home-flow-media img") : null;
          }
          function feedEditMediaNodeSrc(node) {
            return node ? (node.currentSrc || node.src || node.getAttribute("src") || "") : "";
          }
          function feedEditMediaNodeRef(node) {
            return node && node.dataset ? (node.dataset.emyMediaRef || "") : "";
          }
          function feedEditMediaNodeType(node) {
            return node && node.tagName === "VIDEO" ? "video" : node ? "image" : "";
          }
          function feedEditMediaItemsFromCard(card) {
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
          function feedEditKnownProfileMedia(kind) {
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
          function feedEditContentSrc(value) {
            const clean = String(value || "").trim();
            if (!clean) return "";
            return feedEditKnownProfileMedia("src").includes(clean) ? "" : clean;
          }
          function feedEditContentRef(value) {
            const clean = String(value || "").trim();
            if (!clean) return "";
            return feedEditKnownProfileMedia("ref").includes(clean) ? "" : clean;
          }
          function feedEditFirstMediaItem(card, source) {
            const cardItems = feedEditMediaItemsFromCard(card);
            if (cardItems && cardItems.length) return cardItems[0] || {};
            const sourceItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(source || {}) : (Array.isArray(source && source.mediaItems) ? source.mediaItems : []);
            return sourceItems && sourceItems.length ? sourceItems[0] || {} : {};
          }
          function feedEditMedia(card, source, kindText) {
            const data = card && card.dataset || {};
            const mediaNode = feedEditMediaNode(card);
            const firstMedia = feedEditFirstMediaItem(card, source);
            const sourceSrc = feedEditContentSrc(source && (source.mediaSrc || source.image || source.video || source.coverSrc || source.eventCoverSrc || source.jobCoverSrc || source.cover) || "");
            const sourceRef = feedEditContentRef(source && (source.mediaRef || source.coverRef || source.eventCoverRef || source.jobCoverRef || source.imageRef || source.videoRef) || "");
            const sourceType = source && (source.mediaType || source.coverType || source.eventCoverType || source.jobCoverType) || "";
            const itemSrc = feedEditContentSrc(firstMedia && (firstMedia.src || firstMedia.mediaSrc || firstMedia.image || firstMedia.video || firstMedia.url || firstMedia.thumbnailSrc || firstMedia.posterSrc) || "");
            const itemRef = feedEditContentRef(firstMedia && (firstMedia.ref || firstMedia.mediaRef || firstMedia.imageRef || firstMedia.videoRef || firstMedia.coverRef) || "");
            const itemType = firstMedia && (firstMedia.type || firstMedia.mediaType) || "";
            const nodeSrc = feedEditContentSrc(feedEditMediaNodeSrc(mediaNode));
            const nodeRef = feedEditContentRef(feedEditMediaNodeRef(mediaNode));
            const cardItems = feedEditMediaItemsFromCard(card);
            const dataSrc = feedEditContentSrc(data.detailMediaSrc);
            const dataRef = feedEditContentRef(data.detailMediaRef);
            const trustCardData = !!(nodeSrc || nodeRef || cardItems.length || dataSrc || dataRef || data.detailMediaType);
            const cardSrc = nodeSrc || (trustCardData ? dataSrc : "");
            const cardRef = nodeRef || (trustCardData ? dataRef : "");
            const cardType = data.detailMediaType || feedEditMediaNodeType(mediaNode) || "";
            const cardHasMedia = !!(cardSrc || cardRef);
            const ref = cardRef || (cardHasMedia ? "" : (itemRef || sourceRef || ""));
            const src = ref ? "" : (cardSrc || itemSrc || sourceSrc || "");
            const type = cardType || itemType || sourceType || (source && source.video || kindText.indexOf("video") >= 0 || kindText.indexOf("clip") >= 0 ? "video" : src || ref ? "image" : "");
            const sourcePosterSrc = source && (source.posterSrc || source.thumbnailSrc) || "";
            const sourcePosterRef = source && (source.posterRef || source.thumbnailRef) || "";
            const itemPosterSrc = firstMedia && (firstMedia.posterSrc || firstMedia.thumbnailSrc) || "";
            const itemPosterRef = firstMedia && (firstMedia.posterRef || firstMedia.thumbnailRef) || "";
            const cardPosterSrc = data.detailPosterSrc || mediaNode && mediaNode.tagName === "VIDEO" && (mediaNode.poster || mediaNode.getAttribute("poster")) || "";
            const cardPosterRef = data.detailPosterRef || mediaNode && mediaNode.dataset && mediaNode.dataset.emyPosterRef || "";
            const posterRef = cardPosterRef || itemPosterRef || sourcePosterRef || "";
            return {
              src,
              ref,
              type,
              posterSrc: posterRef ? "" : (cardPosterSrc || itemPosterSrc || sourcePosterSrc || ""),
              posterRef,
              settings: feedEditMediaSettings(card, type || "image", source && (source.mediaSettings || source.coverSettings || source.eventCoverSettings || source.jobCoverSettings) || firstMedia && firstMedia.settings)
            };
          }
          function feedEditResolve(ref, apply) {
            if (!ref || !window.emyResolveFeedMedia) return;
            window.emyResolveFeedMedia(ref).then((record) => {
              if (!record) return;
              apply(record.url || record.src || "", record.mediaType || record.type || "");
            }).catch(() => {});
          }
          function feedEditText(card, source) {
            const data = card && card.dataset || {};
            return source && (source.text || source.description || source.articleBody || source.shareText) || data.detailDescription || data.articleBody || data.detailTitle || "";
          }
          function feedEditLooksProductClip(card, source, kindText) {
            const data = card && card.dataset || {};
            const className = card && card.className || "";
            const text = [
              kindText,
              data.detailKind,
              data.detailTitle,
              source && source.tag,
              source && source.kindLabel,
              source && source.clipKind,
              source && source.reelKind,
              source && source.clipType,
              source && source.postMode
            ].join(" ").toLowerCase();
            return !!(
              source && (source.productClip === true || source.isProductClip === true || source.productClipDetails) ||
              /\bproduct\s*clip\b|\bproduct\s*video\b|\bclip\s*product\b/.test(text) ||
              /feed-product-clip-card/.test(className) ||
              source && (source.productName || source.productTitle || source.productDescription || source.productInfo || source.price || source.priceText) ||
              data.detailPrice
            );
          }
          function feedEditClipFrame(card, source, media) {
            const data = card && card.dataset || {};
            const first = (window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(source || {}) : [])[0] || {};
            const settings = media && media.settings || first.settings || source && source.mediaSettings || {};
            const direct = source && (source.clipFrame || source.frame || source.reelFrame) || data.clipFrame || first.clipFrame || settings.clipFrame || "";
            const frame = normalisePostClipFrame(direct);
            if (frame) return frame;
            return String(settings.aspect || "").replace(/\s+/g, "") === "9/16" ? "phone" : "original";
          }
          function feedEditClipProductDetails(card, source) {
            const data = card && card.dataset || {};
            const details = source && source.productClipDetails && typeof source.productClipDetails === "object" ? source.productClipDetails : {};
            return Object.assign({}, details, {
              productName: details.productName || source && (source.productName || source.productTitle) || data.detailTitle || "",
              productTitle: details.productTitle || details.productName || source && (source.productTitle || source.productName) || data.detailTitle || "",
              productDescription: details.productDescription || source && (source.productDescription || source.productInfo || source.description || source.text) || data.detailDescription || "",
              productInfo: details.productInfo || source && (source.productInfo || source.productDescription) || data.detailDescription || "",
              priceText: details.priceText || source && (source.priceText || source.price) || data.detailPrice || "",
              price: details.price || source && (source.price || source.priceText) || data.detailPrice || "",
              priceAmount: details.priceAmount || source && source.priceAmount || "",
              currencyCode: details.currencyCode || source && (source.currencyCode || source.currency || source.priceCurrency) || "GBP",
              currency: details.currency || source && (source.currency || source.currencyCode || source.priceCurrency) || "GBP",
              priceCurrency: details.priceCurrency || source && (source.priceCurrency || source.currencyCode || source.currency) || "GBP",
              availability: details.availability || source && (source.availability || source.stockStatus) || "",
              stockStatus: details.stockStatus || source && (source.stockStatus || source.availability) || "",
              category: details.category || source && (source.category || source.productCategory || source.productType) || "",
              productCategory: details.productCategory || source && (source.productCategory || source.category || source.productType) || ""
            });
          }
          function feedEditOpenClip(card, source, options) {
            const kindText = feedEditKindText(card, options || {}, source);
            const media = feedEditMedia(card, source, kindText);
            const frame = feedEditClipFrame(card, source || {}, media);
            const productClip = feedEditLooksProductClip(card, source || {}, kindText);
            feedEditSetTarget(card, source || {}, kindText || "clip");
            closeEverything(false);
            syncActorLabels();
            clearPostMedia(false);
            postIsClipComposer = true;
            activeClipFrame = normalisePostClipFrame(frame);
            pendingClipFrame = activeClipFrame;
            activeClipKind = productClip ? "product" : "business";
            pendingClipKind = activeClipKind;
            setClipFrameSelection(activeClipFrame);
            setClipKindSelection(activeClipKind);
            setClipProductDetails(productClip ? feedEditClipProductDetails(card, source || {}) : {});
            if (postText) postText.value = source && (source.text || source.caption || source.shareText) || (card && card.dataset && card.dataset.detailDescription) || "";
            postMediaSrc = media.src || "";
            postMediaRef = media.ref || "";
            postMediaType = "video";
            postMediaSettings = Object.assign(postClipMediaSettings("video", activeClipFrame), media.settings || {}, { clipFrame: activeClipFrame });
            setPostMode("video", false);
            const cardMediaItems = feedEditMediaItemsFromCard(card);
            const sourceMediaItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(source || {}) : [];
            const editMediaItems = cardMediaItems.length ? cardMediaItems : sourceMediaItems;
            if (editMediaItems.length) {
              postMediaItems = editMediaItems.map((item) => {
                const type = String(item.type || item.mediaType || media.type || "video").toLowerCase().indexOf("video") >= 0 ? "video" : "image";
                const settings = Object.assign(postClipMediaSettings(type, activeClipFrame), item.settings || media.settings || {}, { clipFrame: activeClipFrame });
                return {
                  type,
                  src: item.src || item.mediaSrc || item.video || item.image || item.url || "",
                  ref: item.ref || item.mediaRef || item.videoRef || item.imageRef || "",
                  name: item.name || "",
                  posterSrc: item.posterRef || item.thumbnailRef ? "" : (item.posterSrc || item.thumbnailSrc || ""),
                  posterRef: item.posterRef || item.thumbnailRef || "",
                  clipFrame: activeClipFrame,
                  settings
                };
              }).filter((item) => item.src || item.ref);
              postActiveMediaIndex = 0;
              renderPostMediaPreview();
            } else if (postMediaSrc || postMediaRef) {
              showPostMediaPreview(postMediaSrc, "video", postMediaRef);
            }
            if (!postMediaSrc && postMediaRef) feedEditResolve(postMediaRef, (url, resolvedType) => {
              if (!url) return;
              postMediaSrc = url;
              postMediaType = "video";
              const active = syncPostActiveMedia(postActiveMediaIndex);
              if (active) {
                active.src = url;
                active.type = "video";
                active.settings = Object.assign(postClipMediaSettings("video", activeClipFrame), active.settings || {}, { clipFrame: activeClipFrame });
              }
              showPostMediaPreview(postMediaSrc, "video", postMediaRef);
              updatePostReady();
            });
            setOpen(postSheet, true);
            updatePostReady();
            if (productClip && clipProductName) window.setTimeout(() => clipProductName.focus(), 30);
            else if (postText) window.setTimeout(() => postText.focus(), 30);
            return true;
          }
          function feedEditOpenPost(card, source, options) {
            const data = card && card.dataset || {};
            const kindText = feedEditKindText(card, options || {}, source);
            const media = feedEditMedia(card, source, kindText);
            feedEditSetTarget(card, source || {}, kindText);
            closeEverything(false);
            syncActorLabels();
            clearPostMedia(false);
            if (postText) postText.value = feedEditText(card, source || {});
            postMediaSrc = media.src || "";
            postMediaRef = media.ref || "";
            postMediaType = media.type || "";
            postMediaSettings = media.settings;
            const mode = media.type === "video" ? "video" : media.type === "image" ? "photo" : source && source.postMode || "update";
            setPostMode(mode, false);
            const cardMediaItems = feedEditMediaItemsFromCard(card);
            const sourceMediaItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(source || {}) : [];
            const editMediaItems = cardMediaItems.length ? cardMediaItems : sourceMediaItems;
            if (editMediaItems.length > 1) {
              postMediaItems = editMediaItems.map((item) => ({
                type: item.type || "image",
                src: item.src || "",
                ref: item.ref || "",
                name: item.name || "",
                settings: Object.assign({}, item.settings || postDefaultMediaSettings(item.type || "image"))
              }));
              postActiveMediaIndex = 0;
              renderPostMediaPreview();
            } else if (postMediaSrc || postMediaRef) showPostMediaPreview(postMediaSrc, postMediaType || "image", postMediaRef);
            if (!postMediaSrc && postMediaRef) feedEditResolve(postMediaRef, (url, resolvedType) => {
              if (!url) return;
              postMediaSrc = url;
              postMediaType = postMediaType || resolvedType || "image";
              showPostMediaPreview(postMediaSrc, postMediaType, postMediaRef);
              updatePostReady();
            });
            setOpen(postSheet, true);
            updatePostReady();
            if (postText) window.setTimeout(() => postText.focus(), 30);
            return true;
          }
          function feedEditOpenArticle(card, source, options) {
            const data = card && card.dataset || {};
            const kindText = feedEditKindText(card, options || {}, source);
            const media = feedEditMedia(card, source, kindText);
            feedEditSetTarget(card, source || {}, "article");
            closeEverything(false);
            syncActorLabels();
            if (articleTitle) articleTitle.value = source && source.title || data.detailTitle || "";
            if (articleBody) articleBody.value = source && (source.articleBody || source.text || source.description) || data.articleBody || data.detailDescription || "";
            if (articleShare) articleShare.value = source && source.shareText || data.articleShare || "";
            articleMediaSrc = media.src || "";
            articleMediaRef = media.ref || "";
            articleMediaType = media.type || "";
            renderArticleCover();
            if (!articleMediaSrc && articleMediaRef) feedEditResolve(articleMediaRef, (url, resolvedType) => {
              articleMediaSrc = url || "";
              articleMediaType = articleMediaType || resolvedType || "image";
              renderArticleCover();
              updateArticleReady();
            });
            setOpen(articleEditor, true);
            updateArticleReady();
            if (articleTitle) window.setTimeout(() => articleTitle.focus(), 30);
            return true;
          }
          function feedEditApplyEventCover(media) {
            const src = media && media.src || "";
            const ref = media && media.ref || "";
            const settings = media && media.settings || (typeof eventCoverDefaultSettings === "function" ? eventCoverDefaultSettings() : null);
            if (typeof eventCoverSettings !== "undefined" && settings) eventCoverSettings = settings;
            if (typeof setEventCover === "function") {
              setEventCover(src, ref);
              if (!src && ref) feedEditResolve(ref, (url) => {
                setEventCover(url || "", ref);
                updateEventPreview();
              });
              return;
            }
            try {
              if (ref) localStorage.setItem("emyPendingEventCoverRef", ref);
              else localStorage.removeItem("emyPendingEventCoverRef");
              if (src && src.length < 120000) localStorage.setItem("emyPendingEventCoverSrc", src);
              else localStorage.removeItem("emyPendingEventCoverSrc");
              if (settings) localStorage.setItem("emyPendingEventCoverSettings", JSON.stringify(settings));
              else localStorage.removeItem("emyPendingEventCoverSettings");
            } catch (error) {}
            if (window.emySetEventComposerCover) window.emySetEventComposerCover(eventSheet, src, ref, settings);
          }
          function feedEditOpenEvent(card, source, options) {
            const data = card && card.dataset || {};
            const meta = feedEditMeta(card);
            const media = feedEditMedia(card, source, feedEditKindText(card, options || {}, source));
            feedEditSetTarget(card, source || {}, "event");
            closeEverything(false);
            syncActorLabels();
            setEventDefaults();
            if (eventName) eventName.value = source && (source.title || source.eventName) || data.detailTitle || "";
            if (eventIntro) eventIntro.value = source && (source.feedIntro || source.intro || source.summary || source.shareText) || data.feedIntro || "";
            if (eventDescription) eventDescription.value = source && (source.text || source.description) || data.detailDescription || "";
            if (eventLink) eventLink.value = source && (source.eventWhere || source.location || source.eventLink) || meta[2] || "";
            if (eventStartDate) eventStartDate.value = source && source.eventDate || "";
            if (eventStartTime) eventStartTime.value = source && source.eventTime || "";
            const eventType = feedEditCleanKey(source && source.eventType || meta[0] || "In person");
            eventTypeInputs.forEach((input) => { input.checked = feedEditCleanKey(input.value) === eventType; });
            if (!eventTypeInputs.some((input) => input.checked) && eventTypeInputs[0]) eventTypeInputs[0].checked = true;
            feedEditApplyEventCover(media);
            setOpen(eventSheet, true);
            updateEventPreview();
            if (eventName) window.setTimeout(() => eventName.focus(), 30);
            return true;
          }
          function feedEditOpenHiring(card, source, eventArg) {
            const cardDraft = jobPayloadFromCard(card);
            const draft = Object.assign({}, cardDraft, source || {});
            const cardHasCover = !!(cardDraft.coverSrc || cardDraft.coverRef || cardDraft.jobCoverSrc || cardDraft.jobCoverRef || cardDraft.mediaSrc || cardDraft.mediaRef);
            if (cardHasCover) {
              const cardType = cardDraft.coverType || cardDraft.jobCoverType || cardDraft.mediaType || "image";
              const cardSettings = feedEditMediaSettings(card, cardType, source && (source.coverSettings || source.jobCoverSettings || source.mediaSettings));
              draft.coverSrc = cardDraft.coverSrc || "";
              draft.jobCoverSrc = cardDraft.jobCoverSrc || cardDraft.coverSrc || "";
              draft.mediaSrc = cardDraft.mediaSrc || cardDraft.coverSrc || "";
              draft.coverRef = cardDraft.coverRef || "";
              draft.jobCoverRef = cardDraft.jobCoverRef || cardDraft.coverRef || "";
              draft.mediaRef = cardDraft.mediaRef || cardDraft.coverRef || "";
              draft.coverType = cardType;
              draft.jobCoverType = cardType;
              draft.mediaType = cardType;
              draft.coverSettings = cardSettings;
              draft.jobCoverSettings = cardSettings;
              draft.mediaSettings = cardSettings;
            }
            draft.id = draft.id || card && card.dataset && card.dataset.feedId || "";
            draft.jobTitle = draft.jobTitle || draft.title || card && card.dataset && card.dataset.detailTitle || "Help wanted";
            draft.feedIntro = draft.feedIntro || draft.intro || draft.summary || card && card.dataset && card.dataset.feedIntro || "";
            draft.description = draft.description || draft.text || card && card.dataset && card.dataset.detailDescription || "";
            draft.draftMode = "edit";
            hiringEditingId = draft.id || "";
            hiringDraftId = draft.id || "";
            writeHiringDraftRecord(draft);
            closeEverything(false);
            syncActorLabels();
            openChoice("hiring", eventArg);
            return true;
          }
          function feedEditActiveRole() {
            const signedRole = feedEditCleanKey(localStorage.getItem("emyMainSignedInRole"));
            if (signedRole === "business" || signedRole === "customer") return signedRole;
            if (localStorage.getItem("emyMainSignedOut") === "1") return "";
            const pendingRole = feedEditCleanKey(localStorage.getItem("emyMainPendingSignupRole"));
            return pendingRole === "business" || pendingRole === "customer" ? pendingRole : "";
          }
          function feedEditOpenBusinessRoute(card, source, kindText, options) {
            if (feedEditActiveRole() !== "business") {
              const notify = options && typeof options.showToast === "function" ? options.showToast : (typeof showToast === "function" ? showToast : null);
              if (notify) notify("Only the business account can edit this product.");
              return false;
            }
            try {
              localStorage.setItem("emyBusinessEditTarget", JSON.stringify({
                id: source && source.id || card && card.dataset && card.dataset.feedId || "",
                kind: kindText || "",
                title: source && (source.title || source.name) || card && card.dataset && card.dataset.detailTitle || "",
                source: "feed-edit"
              }));
            } catch (error) {}
            window.location.href = "emy-business-profile.html?setup=1";
            return true;
          }
          window.emyOpenOriginalFeedEdit = function openOriginalFeedEdit(card, options) {
            if (!card || !card.dataset) return false;
            if ((card.classList && card.classList.contains("is-repost")) || String(card.dataset.detailKind || "").toLowerCase() === "repost") {
              if (window.emyEditRepostThought) return window.emyEditRepostThought(card, options || {});
              return false;
            }
            const opts = options || {};
            const source = feedEditFindSource(card, opts) || {};
            const kindText = feedEditKindText(card, opts, source);
            if (kindText.indexOf("job") >= 0 || kindText.indexOf("hiring") >= 0) return feedEditOpenHiring(card, source, opts.event);
            if (kindText.indexOf("event") >= 0) return feedEditOpenEvent(card, source, opts);
            if (kindText.indexOf("article") >= 0) return feedEditOpenArticle(card, source, opts);
            if (kindText.indexOf("clip") >= 0 || kindText.indexOf("reel") >= 0) return feedEditOpenClip(card, source, opts);
            if (kindText.indexOf("video") >= 0) return feedEditOpenPost(card, source, opts);
            if (kindText.indexOf("product") >= 0 && kindText.indexOf("post") < 0) return feedEditOpenBusinessRoute(card, source, kindText, opts);
            return feedEditOpenPost(card, source, opts);
          };
          window.emyOpenFeedCreateChoice = (choice, draft, event) => {
            if (draft && typeof draft === "object") {
              const selectedChoice = choice || "post";
              if (selectedChoice === "hiring") return feedEditOpenHiring(null, Object.assign({}, draft, { draftMode: "edit" }), event);
              if (selectedChoice === "event") return feedEditOpenEvent(null, draft, { event });
              if (selectedChoice === "article") return feedEditOpenArticle(null, draft, { event });
              return feedEditOpenPost(null, draft, { event });
            }
            openChoice(choice || "post", event);
          };
          function fieldValue(node, fallback) {
            const value = node && typeof node.value === "string" ? node.value.trim() : "";
            return value || fallback || "";
          }
          function normaliseSelectValue(value, fallback) {
            const text = String(value || "").trim();
            return text && !/^choose one/i.test(text) ? text : (fallback || "");
          }
          function hiringDraft() {
            const company = fieldValue(hiringCompany, actorName());
            const title = fieldValue(hiringTitle, "Help wanted");
            const location = fieldValue(hiringLocation, "Location to confirm");
            const description = fieldValue(hiringDescription, company + " is hiring for a local role.");
            const feedIntro = feedPreviewIntro(hiringIntro && hiringIntro.value, description, company + " is hiring.");
            const storedDraft = readHiringDraftRecord();
            const reusableStoredId = isSavedHiringDraft(storedDraft) ? (storedDraft.id || "") : "";
            const reusableCreatedAt = (storedDraft && (hiringDraftId || hiringEditingId || reusableStoredId) && storedDraft.createdAt) ? storedDraft.createdAt : "";
            const storedApplicantCount = Number(storedDraft && storedDraft.applicants);
            const businessKey = feedCreateActorRole() === "business" ? feedCreateBusinessKey() : "customer-profile";
            return Object.assign({
              id: hiringEditingId || hiringDraftId || reusableStoredId || "job-" + Date.now(),
              business: company,
              businessKey,
              jobTitle: title,
              title,
              workplace: fieldValue(hiringWorkplace, "On-site"),
              location,
              employment: normaliseSelectValue(hiringEmployment && hiringEmployment.value, "Flexible"),
              experience: normaliseSelectValue(hiringExperience && hiringExperience.value, "Open to applicants"),
              feedIntro,
              description,
              apply: fieldValue(hiringApply, "Message this business on EMY"),
              notes: fieldValue(hiringNotes, ""),
              applicants: Number.isFinite(storedApplicantCount) ? storedApplicantCount : 0,
              stats: storedDraft && storedDraft.stats || ((Number.isFinite(storedApplicantCount) ? storedApplicantCount : 0) + " applicants"),
              comments: Array.isArray(storedDraft && storedDraft.comments) ? storedDraft.comments : [],
              createdAt: reusableCreatedAt || new Date().toISOString()
            }, hiringCoverPayload());
          }
          function applyHiringDraft(draft) {
            if (!draft || typeof draft !== "object") return;
            const isEditDraft = draft.draftMode === "edit" || (!!hiringEditingId && draft.id === hiringEditingId && !isSavedHiringDraft(draft));
            hiringEditingId = isEditDraft ? (draft.id || "") : "";
            hiringDraftId = draft.id || "";
            if (hiringCompany) hiringCompany.value = draft.business || draft.company || actorName();
            if (hiringTitle) hiringTitle.value = draft.jobTitle || draft.title || "";
            if (hiringWorkplace && draft.workplace) hiringWorkplace.value = draft.workplace;
            if (hiringLocation) hiringLocation.value = draft.location || "";
            if (hiringEmployment && draft.employment) hiringEmployment.value = draft.employment;
            if (hiringExperience && draft.experience) hiringExperience.value = draft.experience;
            if (hiringIntro) hiringIntro.value = draft.feedIntro || draft.intro || draft.summary || "";
            if (hiringDescription) hiringDescription.value = draft.description || "";
            if (hiringApply) hiringApply.value = draft.apply || "";
            if (hiringNotes) hiringNotes.value = draft.notes || "";
            const coverSrc = draft.coverSrc || draft.jobCoverSrc || draft.mediaSrc || draft.image || draft.video || "";
            const coverRef = draft.coverRef || draft.jobCoverRef || draft.mediaRef || "";
            const coverType = draft.coverType || draft.jobCoverType || draft.mediaType || (draft.video ? "video" : (coverSrc || coverRef ? "image" : ""));
            const coverSettings = draft.coverSettings || draft.mediaSettings || null;
            setHiringCover(coverSrc, coverRef, coverType, coverSettings);
            if (!coverSrc && coverRef) feedEditResolve(coverRef, (url, resolvedType) => {
              setHiringCover(url || "", coverRef, coverType || resolvedType || "image", coverSettings);
            });
          }
          function resetHiringForm(clearStoredDraft) {
            hiringEditingId = "";
            hiringDraftId = "";
            if (clearStoredDraft) {
              clearHiringDraftRecord();
            }
            if (hiringCompany) hiringCompany.value = actorName();
            if (hiringTitle) hiringTitle.value = "";
            if (hiringWorkplace) hiringWorkplace.value = "On-site";
            if (hiringLocation) hiringLocation.value = "";
            if (hiringEmployment) hiringEmployment.selectedIndex = 0;
            if (hiringExperience) hiringExperience.selectedIndex = 0;
            if (hiringIntro) hiringIntro.value = "";
            if (hiringDescription) hiringDescription.value = "";
            if (hiringApply) hiringApply.value = "Message this business on EMY";
            if (hiringNotes) hiringNotes.value = "";
            clearHiringCover(true);
          }
          function restoreHiringDraft() {
            const draft = readHiringDraftRecord();
            const options = arguments[0] || {};
            const includeEdit = !!options.includeEdit;
            const includeSaved = options.includeSaved !== false;
            const canRestore = !!draft && ((includeSaved && isSavedHiringDraft(draft)) || (includeEdit && (draft.draftMode === "edit" || (!!hiringEditingId && draft.id === hiringEditingId))));
            if (canRestore) {
              applyHiringDraft(draft);
              return true;
            }
            if (hiringCompany && !hiringCompany.value) hiringCompany.value = actorName();
            return false;
          }
          function saveHiringDraft(event) {
            stopFeedCreateEvent(event);
            if (deferHiringActionForCover("draft", () => saveHiringDraft())) return;
            const draft = Object.assign({}, hiringDraft(), { draftMode: "saved", savedAt: new Date().toISOString() });
            hiringDraftId = draft.id || hiringDraftId;
            if (writeHiringDraftRecord(draft)) {
              if (typeof showToast === "function") showToast("Job draft saved.");
              if (hiringSave) {
                const label = hiringSave.textContent || "Save a draft";
                hiringSave.textContent = "Saved";
                window.setTimeout(() => { hiringSave.textContent = label; }, 1200);
              }
            }
          }
          function feedHiringActionIcon(name) {
            if (typeof actionIcon === "function") {
              try { return actionIcon(name); } catch (error) {}
            }
            if (name === "view") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" stroke="currentColor" fill="none" stroke-linejoin="round"/><path d="M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" stroke="currentColor" fill="none" stroke-linejoin="round"/></svg>';
            if (name === "apply") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l3 3V20H7V3.5Z" stroke="currentColor" fill="none" stroke-linejoin="round"/><path d="M14 3.5V7h3M9.5 14l2 2 4-5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            return "";
          }
          function renderHiringJobCover(draft) {
            const src = draft.coverSrc || draft.jobCoverSrc || draft.mediaSrc || draft.image || draft.video || "";
            const ref = draft.coverRef || draft.jobCoverRef || draft.mediaRef || "";
            const type = draft.coverType || draft.jobCoverType || draft.mediaType || (draft.video ? "video" : (src || ref ? "image" : ""));
            if (!(src || ref)) return "";
            const attrs = (src ? ' src="' + escapeHtml(src) + '"' : '') + (ref ? ' data-emy-media-ref="' + escapeHtml(ref) + '"' : '');
            return type === "video"
              ? '<video class="feed-job-cover-media" data-emy-job-cover-media' + attrs + ' muted playsinline preload="metadata"></video>'
              : '<img class="feed-job-cover-media" data-emy-job-cover-media' + attrs + ' alt="" />';
          }
          function renderHiringJobCard(draft, preview) {
            const initials = (draft.business || actorName() || "B").slice(0, 1).toUpperCase();
            const jobBusinessPhoto = draft.avatarSrc || feedCreateActorPhoto();
            const jobBusinessAvatar = jobBusinessPhoto ? '<i class="has-image"><img src="' + escapeHtml(jobBusinessPhoto) + '" alt="" /></i>' : '<i>' + escapeHtml(initials) + '</i>';
            const applicantText = preview ? "Preview" : ((Number(draft.applicants) || 0) + " applicants");
            const coverHtml = renderHiringJobCover(draft);
            const coverSrc = draft.coverRef || draft.jobCoverRef || draft.mediaRef ? "" : (draft.coverSrc || draft.jobCoverSrc || draft.mediaSrc || draft.image || draft.video || "");
            const coverRef = draft.coverRef || draft.jobCoverRef || draft.mediaRef || "";
            const coverType = draft.coverType || draft.jobCoverType || draft.mediaType || (draft.video ? "video" : (coverSrc || coverRef ? "image" : ""));
            const cardIntro = feedPreviewIntro(draft.feedIntro || draft.intro || draft.summary, draft.description, "This business is hiring.");
            return '<article class="feed-job-card social-feed-job-card' + (coverHtml ? ' has-cover' : '') + '" data-feed-id="' + escapeHtml(draft.id || "") + '" data-detail-kind="Job" data-detail-title="' + escapeHtml(draft.jobTitle || draft.title || "Help wanted") + '" data-detail-description="' + escapeHtml(draft.description || "") + '" data-feed-intro="' + escapeHtml(cardIntro) + '" data-detail-business="' + escapeHtml(draft.business || actorName()) + '" data-detail-media-src="' + escapeHtml(coverSrc) + '" data-detail-media-ref="' + escapeHtml(coverRef) + '" data-detail-media-type="' + escapeHtml(coverType) + '" data-business-key="' + escapeHtml(draft.businessKey || "") + '" data-job-location="' + escapeHtml(draft.location || draft.jobLocation || "Location to confirm") + '" data-job-workplace="' + escapeHtml(draft.workplace || "On-site") + '" data-job-employment="' + escapeHtml(draft.employment || "Flexible") + '" data-job-experience="' + escapeHtml(draft.experience || "Open to applicants") + '" data-job-apply="' + escapeHtml(draft.apply || "Message this business on EMY") + '" data-job-notes="' + escapeHtml(draft.notes || "") + '" data-job-applicants="' + escapeHtml(String(Number(draft.applicants) || 0)) + '">' +
              '<div class="feed-job-hero' + (coverHtml ? ' has-cover' : '') + '">' + coverHtml + '<span>Job</span><strong>' + escapeHtml(draft.jobTitle || draft.title || "Help wanted") + '</strong></div>' +
              '<div class="feed-job-body"><div class="feed-job-business">' + jobBusinessAvatar + '<span>' + escapeHtml(draft.business || actorName()) + '</span></div><p class="feed-job-desc">' + escapeHtml(cardIntro) + '</p><div class="feed-job-meta"><span><b>Location</b>' + escapeHtml(draft.location || "Location to confirm") + '</span><span><b>Workplace</b>' + escapeHtml(draft.workplace || "On-site") + '</span><span><b>Type</b>' + escapeHtml(draft.employment || "Flexible") + '</span><span><b>Pay / notes</b>' + escapeHtml(draft.notes || "Details in the post") + '</span></div><div class="feed-job-actions">' + (preview ? '<button class="feed-job-manage" type="button">' + feedHiringActionIcon("view") + 'Preview card</button>' : '<button class="feed-job-apply" type="button" data-feed-job-apply>' + feedHiringActionIcon("apply") + 'Apply with CV</button>') + '<span class="feed-job-count" data-feed-job-applicants>' + escapeHtml(applicantText) + '</span></div></div>' +
            '</article>';
          }
          function openHiringPreview(event) {
            stopFeedCreateEvent(event);
            if (deferHiringActionForCover("preview", () => openHiringPreview())) return;
            const draft = hiringDraft();
            hiringDraftId = draft.id || hiringDraftId;
            if (hiringPreviewCard) hiringPreviewCard.innerHTML = renderHiringJobCard(draft, true);
            if (hiringPreviewCard && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(hiringPreviewCard);
            if (hiringPreviewCard && window.emySetupVideoPlayers) window.emySetupVideoPlayers(hiringPreviewCard);
            setOpen(hiringPreviewSheet, true);
          }
          function stopFeedCreateEvent(event) {
            if (!event) return;
            event.preventDefault();
            event.stopPropagation();
          }
          function runFeedCreateAfterPaint(callback) {
            const run = () => window.setTimeout(callback, 0);
            if (window.requestAnimationFrame) window.requestAnimationFrame(run);
            else window.setTimeout(callback, 16);
          }
          function syncActorLabelsAfterOpen() {
            runFeedCreateAfterPaint(syncActorLabels);
          }
          function feedCreateButtonText(button) {
            return button ? String(button.textContent || "").trim() : "";
          }
          function scheduleFeedCreateBusyAction(event, button, busyText, action) {
            stopFeedCreateEvent(event);
            if (button && button.dataset.feedCreateBusy === "1") return;
            if (button) {
              button.dataset.feedCreateBusy = "1";
              button.dataset.feedCreateOriginalText = feedCreateButtonText(button);
              if (busyText) button.textContent = busyText;
              button.setAttribute("aria-busy", "true");
            }
            runFeedCreateAfterPaint(() => {
              try {
                action();
              } finally {
                if (button) {
                  button.removeAttribute("aria-busy");
                  delete button.dataset.feedCreateBusy;
                  if (button.dataset.feedCreateOriginalText) {
                    button.textContent = button.dataset.feedCreateOriginalText;
                    delete button.dataset.feedCreateOriginalText;
                  }
                }
              }
            });
          }
          function openCreateMenu(event) {
            stopFeedCreateEvent(event);
            closeEverything(true);
            syncActorLabels();
            setOpen(createMenu, true);
          }
          function closeSheet(sheet, event) {
            stopFeedCreateEvent(event);
            setOpen(sheet, false);
          }
          function openClipFramePicker(event, options) {
            stopFeedCreateEvent(event);
            syncActorLabels();
            resetClipComposerState();
            pendingClipDraft = clipDraftSourceFromOptions(options || {});
            setOpen(createMenu, false);
            setClipFrameSelection(options && options.defaultFrame || "phone");
            setClipKindSelection(options && options.defaultKind || clipDraftKind(pendingClipDraft) || "business");
            setOpen(clipFrameSheet, true);
          }
          function openClipComposerWithFrame(frame, event, kind) {
            stopFeedCreateEvent(event);
            const clipDraft = pendingClipDraft;
            postIsClipComposer = true;
            activeClipFrame = normalisePostClipFrame(frame);
            activeClipKind = normalisePostClipKind(kind || pendingClipKind);
            applyClipComposerUi();
            setOpen(clipFrameSheet, false);
            setOpen(createMenu, false);
            setOpen(postSheet, true);
            setPostMode("video", false);
            applyClipDraftToComposer(clipDraft);
            pendingClipDraft = null;
            openPostSource("video", event);
          }
          function continueClipFrame(event) {
            openClipComposerWithFrame(pendingClipFrame, event, pendingClipKind);
          }
          window.emyOpenFeedClipFramePicker = function emyOpenFeedClipFramePicker(options) {
            openClipFramePicker(null, options || {});
          };
          window.emyOpenFeedClipComposer = function emyOpenFeedClipComposer(options) {
            pendingClipDraft = clipDraftSourceFromOptions(options || {});
            openClipComposerWithFrame(options && options.frame || "phone", null, options && options.kind || options && options.defaultKind || "business");
          };
          window.emyOpenFeedCreateMenu = function emyOpenFeedCreateMenu() {
            openCreateMenu(null);
            const focusTarget = createMenu && createMenu.querySelector("[data-feed-create-choice]");
            if (focusTarget) window.setTimeout(() => focusTarget.focus(), 30);
          };
          window.emyOpenFeedCreateChoice = function emyOpenFeedCreateChoice(choice, draft, event) {
            if (draft && typeof draft === "object") {
              const selectedChoice = choice || "post";
              if (selectedChoice === "hiring") return feedEditOpenHiring(null, Object.assign({}, draft, { draftMode: "edit" }), event);
              if (selectedChoice === "event") return feedEditOpenEvent(null, draft, { event });
              if (selectedChoice === "article") return feedEditOpenArticle(null, draft, { event });
              return feedEditOpenPost(null, draft, { event });
            }
            openChoice(choice || "post", event || null);
          };
          window.emyOpenFeedPostSource = function emyOpenFeedPostSource(options) {
            const sourceType = typeof options === "string" ? options : options && options.type;
            const cleanType = sourceType === "video" ? "video" : "image";
            closeEverything(true);
            syncActorLabels();
            resetClipComposerState();
            setOpen(createMenu, false);
            setOpen(postSheet, true);
            setPostMode(cleanType === "video" ? "video" : "photo", false);
            updatePostReady();
            openPostSource(cleanType, null);
          };
          function openChoice(choice, event) {
            stopFeedCreateEvent(event);
            setOpen(createMenu, false);
            resetClipComposerState();
            const selected = choice || "post";
            if (selected === "event") {
              syncActorLabelsAfterOpen();
              setEventDefaults();
              setOpen(eventSheet, true);
              if (eventName) window.setTimeout(() => eventName.focus(), 30);
            } else if (selected === "hiring") {
              syncActorLabelsAfterOpen();
              if (hiringEditingId) {
                if (!restoreHiringDraft({ includeEdit: true, includeSaved: true })) resetHiringForm(false);
              } else if (!restoreHiringDraft({ includeSaved: true })) {
                resetHiringForm(false);
              }
              setOpen(hiringSheet, true);
              if (hiringTitle) window.setTimeout(() => hiringTitle.focus(), 30);
            } else if (selected === "article") {
              syncActorLabelsAfterOpen();
              setOpen(articleEditor, true);
              updateArticleReady();
              if (articleTitle) window.setTimeout(() => articleTitle.focus(), 30);
            } else {
              setOpen(postSheet, true);
              updatePostReady();
              syncActorLabelsAfterOpen();
              if (postText) window.setTimeout(() => postText.focus(), 30);
            }
          }
          feedCreateApplyAskActionDraftFromQuery();
          function scheduleSubmitPost(event) {
            stopFeedCreateEvent(event);
            if (postSubmitScheduled) return;
            postSubmitScheduled = true;
            if (postSubmit && !postMediaSaving && !postSubmitQueuedUntilMediaReady) postSubmit.textContent = "Posting...";
            runFeedCreateAfterPaint(() => {
              postSubmitScheduled = false;
              submitPost();
            });
          }
          function submitPost(event) {
            stopFeedCreateEvent(event);
            if (!postSubmit || (!postSubmitQueuedUntilMediaReady && postSubmit.disabled) || !postText) return;
            if (postIsClipComposer && activePostMode === "video" && postComposerHasVideoMedia()) postText.value = "";
            if (postMediaSaving) {
              queuePostUntilMediaReady();
              updatePostReady();
              return;
            }
            const wasQueuedUpload = postSubmitQueuedUntilMediaReady;
            const queuedUploadId = postQueuedUploadId;
            resetPostPreparingState();
            const selectedMediaType = postSelectedMediaType();
            const hasSelectedMedia = postHasSelectedMedia();
            if (activePostMode === "photo" && !(selectedMediaType === "image" && hasSelectedMedia)) {
              if (typeof showToast === "function") showToast("Add a photo before posting.");
              openPostSource("image", event);
              return;
            }
            if (activePostMode === "video" && !(selectedMediaType === "video" && hasSelectedMedia)) {
              if (typeof showToast === "function") showToast("Add a video before posting.");
              openPostSource("video", event);
              return;
            }
            const mediaItems = postStoredMediaItems();
            const firstMedia = mediaItems[0] || null;
            const mediaSrc = firstMedia ? firstMedia.src : postMediaSrc;
            const mediaRef = firstMedia ? firstMedia.ref : postMediaRef;
            const mediaType = firstMedia ? firstMedia.type : postMediaType;
            const hasUnuploadedMedia = postMediaItems.some((media) => media && (media.uploadFailed || (!media.ref && !media.cloudinaryPublicId && /^(blob:|data:)/i.test(String(media.src || "")))));
            if (hasUnuploadedMedia) {
              const failedMessage = "Media upload stopped before posting. Try a smaller file or check your connection.";
              if (typeof showToast === "function") showToast(failedMessage);
              if (wasQueuedUpload && queuedUploadId) {
                notifyPostUploadStatus("Upload needs attention", failedMessage, "", queuedUploadId, postUploadAverageProgress(), currentPostUploadContentType());
                postQueuedUploadId = "";
                postQueuedUploadBody = "";
              }
              updatePostReady();
              return;
            }
            const userText = (postIsClipComposer && activePostMode === "video" && mediaType === "video") ? "" : postText.value.trim();
            const hasMedia = !!(mediaSrc || mediaRef || mediaItems.length);
            const mediaSettings = Object.assign({}, firstMedia && firstMedia.settings || postMediaSettings || {});
            const posterRef = firstMedia ? (firstMedia.posterRef || mediaSettings.posterRef || mediaSettings.thumbnailRef || "") : (mediaSettings.posterRef || mediaSettings.thumbnailRef || "");
            const posterSrc = posterRef ? "" : (firstMedia ? (firstMedia.posterSrc || firstMedia.thumbnailSrc || mediaSettings.posterSrc || mediaSettings.thumbnailSrc || "") : (mediaSettings.posterSrc || mediaSettings.thumbnailSrc || ""));
            const publishMediaType = String(mediaType || postMediaType || postSelectedMediaType() || postVisiblePreviewMediaType() || "").trim().toLowerCase();
            const isClipPost = mediaItems.length <= 1 && postIsClipComposer && (publishMediaType === "video" || postComposerHasVideoMedia());
            const clipKind = isClipPost ? normalisePostClipKind(activeClipKind) : "";
            const isProductClip = isClipPost && clipKind === "product";
            const productDetails = isProductClip ? postClipProductDetails() : {};
            if (isProductClip && !productDetails.productName) {
              if (typeof showToast === "function") showToast("Add the product name before posting this product clip.");
              if (clipProductName) window.setTimeout(() => clipProductName.focus(), 20);
              return;
            }
            if (isProductClip && productDetails.rawPrice && !productDetails.priceAmount) {
              if (typeof showToast === "function") showToast("Use numbers only for price, for example 12.99.");
              if (clipProductPrice) window.setTimeout(() => clipProductPrice.focus(), 20);
              return;
            }
            if (isProductClip && !productDetails.category) {
              if (typeof showToast === "function") showToast("Choose a product category.");
              if (clipProductCategory) window.setTimeout(() => clipProductCategory.focus(), 20);
              return;
            }
            const productPriceText = isProductClip ? postProductPriceDisplay(productDetails) : "";
            const publishMode = isClipPost ? "clip" : activePostMode;
            const publishClipFrame = isClipPost ? normalisePostClipFrame(activeClipFrame) : "";
            const tag = mediaItems.length > 1 ? "Carousel" : isProductClip ? "Product Clip" : isClipPost ? "Clip" : publishMediaType === "video" || activePostMode === "video" ? "Video" : publishMediaType === "image" || activePostMode === "photo" ? "Photo" : activePostMode === "question" ? "Question" : "Update";
            const uploadContentType = mediaItems.length > 1 ? "carousel" : isProductClip ? "product-clip" : isClipPost ? "clip" : publishMediaType === "video" || activePostMode === "video" ? "video" : publishMediaType === "image" || activePostMode === "photo" ? "image" : activePostMode === "question" ? "question" : "post";
            const kind = isClipPost ? "clip" : "post";
            const title = isProductClip ? (productDetails.productName || postTitleFromText(userText, publishMode, publishMediaType || mediaType)) : postTitleFromText(userText, publishMode, publishMediaType || mediaType);
            const fallbackText = isProductClip ? (productDetails.productDescription || "Shared a product clip.") : postTextFallback(publishMode, publishMediaType || mediaType);
            const bodyText = userText || (hasMedia ? "" : fallbackText);
            const posted = publishFeedCreatedItem(kind, title, bodyText, {
              tag,
              createType: isClipPost ? "clip" : "post",
              postMode: mediaItems.length > 1 ? "carousel" : publishMode,
              clipKind,
              reelKind: clipKind,
              clipType: isProductClip ? "product" : (isClipPost ? "business" : ""),
              clipFrame: publishClipFrame,
              clipFrameLabel: publishClipFrame ? postClipFrameLabel(publishClipFrame) : "",
              productName: productDetails.productName || "",
              productTitle: productDetails.productName || "",
              productInfo: productDetails.productDescription || "",
              productDescription: productDetails.productDescription || "",
              price: productPriceText,
              priceText: productPriceText,
              priceAmount: productDetails.priceAmount || "",
              currencyCode: productDetails.currencyCode || "GBP",
              currency: productDetails.currencyCode || "GBP",
              priceCurrency: productDetails.currencyCode || "GBP",
              availability: productDetails.availability || "",
              stockStatus: productDetails.availability || "",
              category: productDetails.category || "",
              productCategory: productDetails.category || "",
              mediaSrc,
              mediaRef,
              mediaItems,
              mediaType: isClipPost ? "video" : mediaType,
              cloudinaryPublicId: firstMedia && firstMedia.cloudinaryPublicId || "",
              cloudinaryResourceType: firstMedia && firstMedia.cloudinaryResourceType || "",
              cloudinaryBytes: firstMedia && Number(firstMedia.cloudinaryBytes) || 0,
              cloudinaryDuration: firstMedia && Number(firstMedia.cloudinaryDuration) || 0,
              cloudinaryPosterPublicId: firstMedia && firstMedia.cloudinaryPosterPublicId || "",
              posterSrc,
              posterRef,
              thumbnailSrc: posterSrc,
              thumbnailRef: posterRef,
              mediaSettings,
              mediaOverlay: mediaSettings.overlay || "",
              image: !isClipPost && mediaType === "image" ? mediaSrc : "",
              video: (isClipPost || mediaType === "video") ? mediaSrc : ""
            });
            if (!posted) {
              setPostHelpText("EMY could not post this media because browser storage is full. Try a smaller file or remove old saved media.");
              if (typeof showToast === "function") showToast("Could not post. Browser storage is full.");
              if (wasQueuedUpload) notifyPostUploadStatus("Upload needs attention", "Your media uploaded, but EMY could not save the post. Try again after freeing space.", "", queuedUploadId, 100, uploadContentType);
              if (wasQueuedUpload) postQueuedUploadId = "";
              if (wasQueuedUpload) postQueuedUploadBody = "";
              updatePostReady();
              return;
            }
            if (wasQueuedUpload) {
              notifyPostUploadStatus("Upload completed", "Your post was published.", "", queuedUploadId, 100, uploadContentType, currentPostUploadMediaName(), posted);
              postQueuedUploadId = "";
              postQueuedUploadBody = "";
            }
            if (isProductClip) clearClipProductDetails();
          }
          function submitEvent(event) {
            stopFeedCreateEvent(event);
            if (eventCoverSaving) {
              if (typeof showToast === "function") showToast("Hold on while EMY adds the event cover.");
              return;
            }
            if (!eventName || !eventName.value.trim()) {
              if (eventName) eventName.focus();
              if (typeof showToast === "function") showToast("Add an event name first.");
              return;
            }
            const text = eventDescription && eventDescription.value.trim() ? eventDescription.value.trim() : "Event details will be shared soon.";
            const intro = feedPreviewIntro(eventIntro && eventIntro.value, text, "Event details will be shared soon.");
            const eventType = selectedEventType();
            const eventWhere = eventLink && eventLink.value.trim() ? eventLink.value.trim() : (eventType === "Online" ? "Online" : "Location to confirm");
            const coverRef = eventCoverRef || (() => { try { return localStorage.getItem("emyPendingEventCoverRef") || ""; } catch (error) { return ""; } })();
            const coverSrc = coverRef ? "" : (eventCoverSrc || (() => { try { return localStorage.getItem("emyPendingEventCoverSrc") || ""; } catch (error) { return ""; } })());
            if (coverSrc && /^(data:|blob:)/i.test(coverSrc)) {
              if (typeof showToast === "function") showToast("Event cover upload is still required before posting. Try a smaller image or check your connection.");
              return;
            }
            const posted = publishFeedCreatedItem("event", eventName.value.trim(), text, {
              business: actorName(),
              eventType,
              eventWhen: eventWhenText(),
              eventWhere,
              feedIntro: intro,
              shareText: intro,
              eventDate: eventStartDate && eventStartDate.value || "",
              eventTime: eventStartTime && eventStartTime.value || "",
              coverSrc,
              eventCoverSrc: coverSrc,
              coverRef,
              eventCoverRef: coverRef,
              coverSettings: eventCoverSettings || eventCoverDefaultSettings(),
              eventCoverSettings: eventCoverSettings || eventCoverDefaultSettings()
            });
            if (!posted && typeof showToast === "function") showToast("EMY could not save this event because browser storage is full.");
          }
          function submitHiring(event) {
            stopFeedCreateEvent(event);
            if (deferHiringActionForCover("post", () => submitHiring())) return;
            const draft = hiringDraft();
            const posted = publishFeedCreatedItem("job", draft.jobTitle || "Help wanted", draft.description, {
              id: draft.id,
              businessKey: draft.businessKey,
              business: draft.business,
              jobTitle: draft.jobTitle,
              jobLocation: draft.location,
              workplace: draft.workplace,
              employment: draft.employment,
              experience: draft.experience,
              feedIntro: draft.feedIntro,
              shareText: draft.feedIntro,
              apply: draft.apply,
              notes: draft.notes,
              coverSrc: draft.coverSrc,
              jobCoverSrc: draft.jobCoverSrc,
              mediaSrc: draft.mediaSrc,
              coverRef: draft.coverRef,
              jobCoverRef: draft.jobCoverRef,
              mediaRef: draft.mediaRef,
              posterSrc: draft.posterSrc,
              thumbnailSrc: draft.thumbnailSrc,
              coverPosterSrc: draft.coverPosterSrc,
              jobCoverPosterSrc: draft.jobCoverPosterSrc,
              posterRef: draft.posterRef,
              thumbnailRef: draft.thumbnailRef,
              coverPosterRef: draft.coverPosterRef,
              jobCoverPosterRef: draft.jobCoverPosterRef,
              coverType: draft.coverType,
              jobCoverType: draft.jobCoverType,
              mediaType: draft.mediaType,
              coverSettings: draft.coverSettings,
              jobCoverSettings: draft.jobCoverSettings,
              mediaSettings: draft.mediaSettings,
              applicants: Number(draft.applicants) || 0,
              stats: draft.stats || ((Number(draft.applicants) || 0) + " applicants"),
              comments: Array.isArray(draft.comments) ? draft.comments : []
            });
            if (!posted) return;
            clearHiringDraftRecord();
            hiringEditingId = "";
            hiringDraftId = "";
          }
          function closeHiringSheet(event) {
            stopFeedCreateEvent(event);
            setOpen(hiringSheet, false);
            const draft = readHiringDraftRecord();
            if (hiringEditingId && (!draft || draft.draftMode === "edit")) {
              if (draft && draft.draftMode === "edit") clearHiringDraftRecord();
              hiringEditingId = "";
              hiringDraftId = "";
            }
          }
          function openArticlePublish(event) {
            stopFeedCreateEvent(event);
            updateArticleReady();
            if (articleNext && articleNext.disabled) {
              if (typeof showToast === "function") showToast("Add a title or article text first.");
              if (articleTitle) articleTitle.focus();
              return;
            }
            submitArticle(event);
          }
          function submitArticle(event) {
            stopFeedCreateEvent(event);
            updateArticleReady();
            if (articleNext && articleNext.disabled) {
              if (typeof showToast === "function") showToast("Add a title or article text first.");
              if (articleTitle) articleTitle.focus();
              return;
            }
            const body = articleDraftBody();
            const share = articleDraftShare();
            if (articleMediaSrc && !articleMediaRef && /^(data:|blob:)/i.test(articleMediaSrc)) {
              if (typeof showToast === "function") showToast("Article media upload is still required before publishing. Try a smaller file or check your connection.");
              return;
            }
            const posted = publishFeedCreatedItem("article", articleDraftTitle(), body || share, {
              postMode: "article",
              tag: "Article",
              shareText: share,
              articleBody: body,
              readTime: articleReadLabel(),
              mediaSrc: articleMediaSrc,
              mediaRef: articleMediaRef,
              mediaType: articleMediaType,
              image: articleMediaType === "image" ? articleMediaSrc : "",
              video: articleMediaType === "video" ? articleMediaSrc : ""
            });
            if (!posted) {
              if (typeof showToast === "function") showToast("EMY could not save this article because browser storage is full.");
            }
          }
          function requestDiscard(event) {
            stopFeedCreateEvent(event);
            if (articleHasDraft()) setOpen(discardSheet, true);
            else closeEverything(true);
          }
          createOpenButtons.forEach((button) => button.addEventListener("click", openCreateMenu));
          if (createClose) createClose.addEventListener("click", (event) => closeSheet(createMenu, event));
          if (createMenu) createMenu.addEventListener("click", (event) => {
            if (event.target === createMenu) setOpen(createMenu, false);
          });
          if (clipFrameClose) clipFrameClose.addEventListener("click", (event) => closeSheet(clipFrameSheet, event));
          if (clipFrameCancel) clipFrameCancel.addEventListener("click", (event) => closeSheet(clipFrameSheet, event));
          if (clipFrameContinue) clipFrameContinue.addEventListener("click", continueClipFrame);
          if (clipFrameSheet) clipFrameSheet.addEventListener("click", (event) => {
            if (event.target === clipFrameSheet) setOpen(clipFrameSheet, false);
          });
          clipFrameChoices.forEach((button) => {
            button.addEventListener("click", (event) => {
              stopFeedCreateEvent(event);
              setClipFrameSelection(button.dataset.feedClipFrameChoice);
            });
          });
          clipKindChoices.forEach((button) => {
            button.addEventListener("click", (event) => {
              stopFeedCreateEvent(event);
              setClipKindSelection(button.dataset.feedClipKindChoice);
            });
          });
          [clipProductName, clipProductCurrency, clipProductPrice, clipProductAvailability, clipProductCategory, clipProductDescription].forEach((input) => {
            if (!input) return;
            input.addEventListener("input", () => {
              if (input === clipProductPrice) {
                const cleanPrice = postProductSanitisePriceInput(input.value);
                if (input.value !== cleanPrice) input.value = cleanPrice;
              }
              updatePostReady();
            });
            if (input.tagName === "SELECT") input.addEventListener("change", updatePostReady);
          });
          createChoices.forEach((button) => {
            button.addEventListener("click", (event) => openChoice(button.dataset.feedCreateChoice, event));
          });
          if (postClose) postClose.addEventListener("click", (event) => closeSheet(postSheet, event));
          if (postSheet) postSheet.addEventListener("click", (event) => {
            if (event.target === postSheet) setOpen(postSheet, false);
          });
          if (postSourceClose) postSourceClose.addEventListener("click", (event) => closeSheet(postSourceSheet, event));
          if (postSourceSheet) postSourceSheet.addEventListener("click", (event) => {
            if (event.target === postSourceSheet) setOpen(postSourceSheet, false);
          });
          postSourceButtons.forEach((button) => {
            button.addEventListener("click", (event) => choosePostSource(button.dataset.feedPostSource, event));
          });
          if (postText) postText.addEventListener("input", updatePostReady);
          if (postSubmit) postSubmit.addEventListener("click", scheduleSubmitPost);
          postModeButtons.forEach((button) => {
            button.addEventListener("click", (event) => choosePostMode(button.dataset.feedPostMode, event));
          });
          if (postAddPhoto) postAddPhoto.addEventListener("click", openPostPhoto);
          if (postAddClip) postAddClip.addEventListener("click", openPostClip);
          if (postPhotoFile) postPhotoFile.addEventListener("change", () => {
            Array.from(postPhotoFile.files || []).forEach((file) => setPostMediaFile(file, "image"));
          });
          if (postClipFile) postClipFile.addEventListener("change", () => {
            Array.from(postClipFile.files || []).forEach((file) => setPostMediaFile(file, "video"));
          });
          if (postRemoveMedia) postRemoveMedia.addEventListener("click", (event) => {
            stopFeedCreateEvent(event);
            clearPostMedia(true);
          });
          if (postEditMedia) postEditMedia.addEventListener("click", openPostMediaEditor);
          if (eventClose) eventClose.addEventListener("click", (event) => closeSheet(eventSheet, event));
          if (eventSheet) eventSheet.addEventListener("click", (event) => {
            if (event.target === eventSheet) setOpen(eventSheet, false);
          });
          [eventName, eventLink, eventIntro, eventDescription, eventStartDate, eventStartTime].forEach((input) => {
            if (input) input.addEventListener("input", updateEventPreview);
          });
          eventTypeInputs.forEach((input) => input.addEventListener("change", updateEventPreview));
          if (eventCoverButton && eventCoverFile) eventCoverButton.addEventListener("click", (event) => {
            stopFeedCreateEvent(event);
            eventCoverFile.click();
          });
          if (eventCoverEdit) eventCoverEdit.addEventListener("click", openEventCoverEditor);
          if (eventCoverRemove) eventCoverRemove.addEventListener("click", (event) => {
            stopFeedCreateEvent(event);
            clearEventCover();
          });
          if (eventCoverFile) eventCoverFile.addEventListener("change", () => {
            const file = eventCoverFile.files && eventCoverFile.files[0];
            setEventCoverFile(file);
          });
          if (eventNext) eventNext.addEventListener("click", (event) => scheduleFeedCreateBusyAction(event, eventNext, "Posting...", () => submitEvent()));
          if (hiringClose) hiringClose.addEventListener("click", closeHiringSheet);
          if (hiringSheet) hiringSheet.addEventListener("click", (event) => {
            if (event.target === hiringSheet) setOpen(hiringSheet, false);
          });
          if (hiringCoverAdd && hiringCoverFile) hiringCoverAdd.addEventListener("click", (event) => {
            stopFeedCreateEvent(event);
            hiringCoverFile.click();
          });
          if (hiringCoverEdit) hiringCoverEdit.addEventListener("click", openHiringCoverEditor);
          if (hiringCoverRemove) hiringCoverRemove.addEventListener("click", (event) => {
            stopFeedCreateEvent(event);
            clearHiringCover(true);
          });
          if (hiringCoverFile) hiringCoverFile.addEventListener("change", () => {
            const file = hiringCoverFile.files && hiringCoverFile.files[0];
            setHiringCoverFile(file);
          });
          if (hiringSave) hiringSave.addEventListener("click", saveHiringDraft);
          if (hiringPreview) hiringPreview.addEventListener("click", openHiringPreview);
          if (hiringContinue) hiringContinue.addEventListener("click", (event) => scheduleFeedCreateBusyAction(event, hiringContinue, "Posting...", () => submitHiring()));
          if (hiringPreviewClose) hiringPreviewClose.addEventListener("click", (event) => closeSheet(hiringPreviewSheet, event));
          if (hiringPreviewEdit) hiringPreviewEdit.addEventListener("click", (event) => closeSheet(hiringPreviewSheet, event));
          if (hiringPreviewPost) hiringPreviewPost.addEventListener("click", (event) => scheduleFeedCreateBusyAction(event, hiringPreviewPost, "Posting...", () => submitHiring()));
          if (hiringPreviewSheet) hiringPreviewSheet.addEventListener("click", (event) => {
            if (event.target === hiringPreviewSheet) setOpen(hiringPreviewSheet, false);
          });
          if (jobApplyClose) jobApplyClose.addEventListener("click", (event) => closeSheet(jobApplySheet, event));
          if (jobApplyCancel) jobApplyCancel.addEventListener("click", (event) => closeSheet(jobApplySheet, event));
          if (jobApplySubmit) jobApplySubmit.addEventListener("click", submitJobApplication);
          if (jobApplyFile) jobApplyFile.addEventListener("click", (event) => {
            stopFeedCreateEvent(event);
            if (jobApplyFileInput) jobApplyFileInput.click();
          });
          if (jobApplyFileInput) jobApplyFileInput.addEventListener("change", () => {
            const file = jobApplyFileInput.files && jobApplyFileInput.files[0];
            activeJobApplyFileName = file && file.name ? file.name : "";
            activeJobApplyFileRecord = null;
            activeJobApplyFileSavePromise = null;
            activeJobApplyFileSaveFailed = false;
            if (!file) {
              if (jobApplyFileName) jobApplyFileName.textContent = "No CV selected yet. You can also paste a link below.";
              if (jobApplyFile) jobApplyFile.classList.remove("is-active");
              return;
            }
            if (jobApplyFileName) jobApplyFileName.textContent = "Uploading CV for download: " + activeJobApplyFileName;
            if (jobApplyFile) jobApplyFile.classList.toggle("is-active", !!activeJobApplyFileName);
            activeJobApplyFileSavePromise = storeJobApplicationCvFile(file).then((record) => {
              activeJobApplyFileRecord = record;
              activeJobApplyFileSaveFailed = !record;
              if (jobApplyFileName) jobApplyFileName.textContent = record ? "CV ready for download: " + (record.cvFileName || activeJobApplyFileName) : "CV could not be uploaded. Paste a CV link or try again.";
              return record;
            }).catch(() => {
              activeJobApplyFileRecord = null;
              activeJobApplyFileSaveFailed = true;
              if (jobApplyFileName) jobApplyFileName.textContent = "CV could not be uploaded. Paste a CV link or try again.";
              if (typeof showToast === "function") showToast("This CV could not be uploaded for download. Try again or paste a CV link.");
              return null;
            });
          });
          if (jobApplyProfile) jobApplyProfile.addEventListener("click", (event) => {
            stopFeedCreateEvent(event);
            const active = !jobApplyProfile.classList.contains("is-active");
            jobApplyProfile.classList.toggle("is-active", active);
            jobApplyProfile.setAttribute("aria-pressed", active ? "true" : "false");
            if (jobApplyConsent) jobApplyConsent.checked = active;
          });
          if (jobApplyConsent) jobApplyConsent.addEventListener("change", () => {
            if (!jobApplyProfile) return;
            jobApplyProfile.classList.toggle("is-active", jobApplyConsent.checked);
            jobApplyProfile.setAttribute("aria-pressed", jobApplyConsent.checked ? "true" : "false");
          });
          if (jobApplySheet) jobApplySheet.addEventListener("click", (event) => {
            if (event.target === jobApplySheet) setOpen(jobApplySheet, false);
          });
          [articleTitle, articleBody, articleShare].forEach((input) => {
            if (input) input.addEventListener("input", updateArticleReady);
          });
          if (articleClose) articleClose.addEventListener("click", requestDiscard);
          if (articleEditor) articleEditor.addEventListener("click", (event) => {
            if (event.target === articleEditor) requestDiscard();
          });
          if (articleNext) articleNext.addEventListener("click", (event) => scheduleFeedCreateBusyAction(event, articleNext, "Publishing...", () => submitArticle()));
          if (articleCover) articleCover.addEventListener("click", (event) => {
            stopFeedCreateEvent(event);
            if (articleCoverFile) articleCoverFile.click();
          });
          if (articleCoverFile) articleCoverFile.addEventListener("change", () => {
            const file = articleCoverFile.files && articleCoverFile.files[0];
            setArticleCoverFile(file);
          });
          if (articlePublishClose) articlePublishClose.addEventListener("click", requestDiscard);
          if (articlePublish) articlePublish.addEventListener("click", (event) => {
            if (event.target === articlePublish) requestDiscard();
          });
          if (articlePublishSubmit) articlePublishSubmit.addEventListener("click", (event) => scheduleFeedCreateBusyAction(event, articlePublishSubmit, "Publishing...", () => submitArticle()));
          discardBackButtons.forEach((button) => button.addEventListener("click", (event) => closeSheet(discardSheet, event)));
          if (discardConfirm) discardConfirm.addEventListener("click", (event) => {
            stopFeedCreateEvent(event);
            closeEverything(true);
          });
          document.addEventListener("click", (event) => {
            const target = event.target;
            if (!target || !target.closest) return;
            if (target === postCameraSheet) { stopFeedCreateEvent(event); closePostCamera(true); return; }
            const openButton = target.closest("[data-feed-create-open]");
            if (openButton) { openCreateMenu(event); return; }
            const choiceButton = target.closest("[data-feed-create-choice]");
            if (choiceButton) { openChoice(choiceButton.dataset.feedCreateChoice, event); return; }
            if (target.closest("[data-feed-create-close]")) { closeSheet(createMenu, event); return; }
            const clipFrameButton = target.closest("[data-feed-clip-frame-choice]");
            if (clipFrameButton) { stopFeedCreateEvent(event); setClipFrameSelection(clipFrameButton.dataset.feedClipFrameChoice); return; }
            if (target.closest("[data-feed-clip-frame-continue]")) { continueClipFrame(event); return; }
            if (target.closest("[data-feed-clip-frame-close], [data-feed-clip-frame-cancel]")) { closeSheet(clipFrameSheet, event); return; }
            if (target.closest("[data-feed-post-close]")) { closeSheet(postSheet, event); return; }
            const postModeButton = target.closest("[data-feed-post-mode]");
            if (postModeButton) { choosePostMode(postModeButton.dataset.feedPostMode, event); return; }
            if (target.closest("[data-feed-post-add-photo]")) { openPostPhoto(event); return; }
            if (target.closest("[data-feed-post-add-clip]")) { openPostClip(event); return; }
            const postSourceButton = target.closest("[data-feed-post-source]");
            if (postSourceButton) { choosePostSource(postSourceButton.dataset.feedPostSource, event); return; }
            if (target.closest("[data-feed-post-source-close]")) { closeSheet(postSourceSheet, event); return; }
            if (target.closest("[data-feed-post-camera-close], [data-feed-post-camera-cancel]")) { stopFeedCreateEvent(event); closePostCamera(true); return; }
            if (target.closest("[data-feed-post-camera-capture]")) { stopFeedCreateEvent(event); if (postCameraMode === "video") startPostCameraVideoRecording(); else capturePostCameraPhoto(); return; }
            if (target.closest("[data-feed-post-camera-stop]")) { stopFeedCreateEvent(event); closePostCamera(false); return; }
            if (target.closest("[data-feed-post-edit-media]")) { openPostMediaEditor(event); return; }
            if (target.closest("[data-feed-post-remove-media]")) { stopFeedCreateEvent(event); clearPostMedia(true); return; }
            if (target.closest("[data-feed-post-submit]")) { scheduleSubmitPost(event); return; }
            if (target.closest("[data-feed-event-close]")) { closeSheet(eventSheet, event); return; }
            if (target.closest("[data-feed-event-next]")) { scheduleFeedCreateBusyAction(event, target.closest("[data-feed-event-next]"), "Posting...", () => submitEvent()); return; }
            if (target.closest("[data-feed-hiring-close]")) { closeHiringSheet(event); return; }
            if (target.closest("[data-feed-hiring-save]")) { saveHiringDraft(event); return; }
            if (target.closest("[data-feed-hiring-preview]")) { openHiringPreview(event); return; }
            if (target.closest("[data-feed-hiring-continue]")) { scheduleFeedCreateBusyAction(event, target.closest("[data-feed-hiring-continue]"), "Posting...", () => submitHiring()); return; }
            if (target.closest("[data-feed-hiring-preview-close]")) { closeSheet(hiringPreviewSheet, event); return; }
            if (target.closest("[data-feed-hiring-preview-edit]")) { closeSheet(hiringPreviewSheet, event); return; }
            if (target.closest("[data-feed-hiring-preview-post]")) { scheduleFeedCreateBusyAction(event, target.closest("[data-feed-hiring-preview-post]"), "Posting...", () => submitHiring()); return; }
            if (target.closest("[data-feed-job-apply-close], [data-feed-job-apply-cancel]")) { closeSheet(jobApplySheet, event); return; }
            if (target.closest("[data-feed-job-apply-submit]")) { submitJobApplication(event); return; }
            const cvDownloadButton = target.closest("[data-feed-job-cv-download]");
            if (cvDownloadButton) { downloadJobApplicantCv(cvDownloadButton.dataset.feedJobCvDownload, event); return; }
            if (target.closest("[data-feed-job-applicants-more]")) { loadMoreJobApplicants(event); return; }
            if (target.closest("[data-feed-job-applicants-close]")) { closeSheet(jobApplicantsSheet, event); return; }
            if (target.closest("[data-feed-article-close]")) { requestDiscard(event); return; }
            if (target.closest("[data-feed-article-next]")) { scheduleFeedCreateBusyAction(event, target.closest("[data-feed-article-next]"), "Publishing...", () => submitArticle()); return; }
            if (target.closest("[data-feed-article-publish-close]")) { requestDiscard(event); return; }
            if (target.closest("[data-feed-article-publish-submit]")) { scheduleFeedCreateBusyAction(event, target.closest("[data-feed-article-publish-submit]"), "Publishing...", () => submitArticle()); return; }
            if (target.closest("[data-feed-discard-back]")) { closeSheet(discardSheet, event); return; }
            if (target.closest("[data-feed-discard-confirm]")) {
              stopFeedCreateEvent(event);
              closeEverything(true);
            }
          });
          if (!document.documentElement.dataset.emyJobApplyDelegated) {
            document.documentElement.dataset.emyJobApplyDelegated = "1";
            document.addEventListener("click", (event) => {
              const btn = event.target && event.target.closest ? event.target.closest("[data-feed-job-apply], [data-feed-job-applicants-view]") : null;
              if (!btn || btn.disabled) return;
              const card = btn.closest("[data-feed-id], [data-owned-job]");
              if (!card) return;
              event.preventDefault();
              if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
              if (btn.hasAttribute("data-feed-job-applicants-view")) {
                if (window.emyOpenJobApplicants) window.emyOpenJobApplicants(card, event);
                return;
              }
              if (window.emyOpenJobApplication) window.emyOpenJobApplication(card, event);
            }, true);
          }
          jobApplicantsCloseButtons.forEach((button) => {
            button.addEventListener("click", (event) => closeSheet(jobApplicantsSheet, event));
          });
          emySyncJobCreatorButtons(document);
          window.addEventListener("emy:created-jobs-changed", () => emySyncJobCreatorButtons(document));
          window.addEventListener("emy:job-application-sent", () => emySyncJobCreatorButtons(document));
          document.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") return;
            if (discardSheet && discardSheet.classList.contains("is-open")) { setOpen(discardSheet, false); return; }
            if (hiringPreviewSheet && hiringPreviewSheet.classList.contains("is-open")) { setOpen(hiringPreviewSheet, false); return; }
            if (jobApplicantsSheet && jobApplicantsSheet.classList.contains("is-open")) { setOpen(jobApplicantsSheet, false); return; }
            if (jobApplySheet && jobApplySheet.classList.contains("is-open")) { setOpen(jobApplySheet, false); return; }
            if (articlePublish && articlePublish.classList.contains("is-open")) { requestDiscard(); return; }
            if (articleEditor && articleEditor.classList.contains("is-open")) { requestDiscard(); return; }
            if (hiringSheet && hiringSheet.classList.contains("is-open")) { closeHiringSheet(); return; }
            [eventSheet, postSourceSheet, postSheet, clipFrameSheet, createMenu].forEach((sheet) => {
              if (sheet && sheet.classList.contains("is-open")) setOpen(sheet, false);
            });
          });
        }

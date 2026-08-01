(function setupItemDetailModal() {
          const modal = document.querySelector("[data-item-detail-modal]");
          if (!modal || (modal.dataset.bound === "1" && typeof window.emyOpenClipViewer === "function" && typeof window.emyOpenItemDetail === "function")) return;
          modal.dataset.bound = "1";
          const detailOptionsButton = modal.querySelector("[data-item-detail-options]");
          const detailOptionsMenu = modal.querySelector("[data-item-detail-options-menu]");
          const media = modal.querySelector("[data-item-detail-media]");
          const kind = modal.querySelector("[data-item-detail-kind]");
          const title = modal.querySelector("[data-item-detail-title]");
          const business = modal.querySelector("[data-item-detail-business]");
          const description = modal.querySelector("[data-item-detail-description]");
          const price = modal.querySelector("[data-item-detail-price]");
          const meta = modal.querySelector("[data-item-detail-meta]");
          const repostAttachment = modal.querySelector("[data-item-detail-repost-attachment]");
          const save = modal.querySelector("[data-item-detail-save]");
          const jobPanel = modal.querySelector("[data-item-job-panel]");
          const jobTitleNode = modal.querySelector("[data-item-job-title]");
          const jobInitialNode = modal.querySelector("[data-item-job-initial]");
          const jobBusinessNode = modal.querySelector("[data-item-job-business]");
          const jobDescriptionNode = modal.querySelector("[data-item-job-description]");
          const jobLocationNode = modal.querySelector("[data-item-job-location]");
          const jobWorkplaceNode = modal.querySelector("[data-item-job-workplace]");
          const jobEmploymentNode = modal.querySelector("[data-item-job-employment]");
          const jobExperienceNode = modal.querySelector("[data-item-job-experience]");
          const jobApplyTextNode = modal.querySelector("[data-item-job-apply-text]");
          const jobNotesNode = modal.querySelector("[data-item-job-notes]");
          const jobApplicantsNode = modal.querySelector("[data-item-job-applicants]");
          const jobApplyButton = modal.querySelector("[data-item-job-apply]");
          const jobOwnerTools = modal.querySelector("[data-item-job-owner-tools]");
          const jobEditButton = modal.querySelector("[data-item-job-edit]");
          const jobDeleteButton = modal.querySelector("[data-item-job-delete]");
          const jobCoverHead = modal.querySelector("[data-item-job-cover-head]");
          const eventPanel = modal.querySelector("[data-item-event-panel]");
          const eventDayNode = modal.querySelector("[data-item-event-day]");
          const eventMonthNode = modal.querySelector("[data-item-event-month]");
          const eventTitleNode = modal.querySelector("[data-item-event-title]");
          const eventHostNode = modal.querySelector("[data-item-event-host]");
          const eventCoverNode = modal.querySelector("[data-item-event-cover]");
          const eventCoverImage = modal.querySelector("[data-item-event-cover-image]");
          const eventWhenNode = modal.querySelector("[data-item-event-when]");
          const eventWhereNode = modal.querySelector("[data-item-event-where]");
          const eventFormatNode = modal.querySelector("[data-item-event-format]");
          const eventSaveButton = modal.querySelector("[data-item-event-save]");
          const eventChatLink = modal.querySelector("[data-item-event-chat]");
          const eventProfileLink = modal.querySelector("[data-item-event-profile]");
          const businessPanel = modal.querySelector("[data-item-business-panel]");
          const businessNameNode = modal.querySelector("[data-item-business-name]");
          const businessCategoryNode = modal.querySelector("[data-item-business-category]");
          const businessAddressNode = modal.querySelector("[data-item-business-address]");
          const businessAvatar = modal.querySelector("[data-item-business-avatar]");
          const businessAvatarInitial = modal.querySelector("[data-item-business-avatar-initial]");
          const businessPresence = modal.querySelector("[data-item-business-presence]");
          const businessFacts = modal.querySelector("[data-item-business-facts]");
          const businessLibrary = modal.querySelector("[data-item-business-library]");
          const businessProfileLinks = modal.querySelectorAll("[data-item-business-profile-link]");
          const businessChatLink = modal.querySelector("[data-item-business-chat]");
          const businessCustomer = modal.querySelector("[data-item-business-customer]");
          const businessCustomerNote = modal.querySelector("[data-item-business-customer-note]");
          const businessRepost = modal.querySelector("[data-item-business-repost]");
          const businessRepostCount = modal.querySelector("[data-item-business-repost-count]");
          const productPanel = modal.querySelector("[data-item-product-panel]");
          const productSellerCard = modal.querySelector("[data-item-product-seller-card]");
          const productSeller = modal.querySelector("[data-item-product-seller]");
          const productSellerStatus = modal.querySelector("[data-item-product-seller-status]");
          const productPresence = modal.querySelector("[data-item-product-presence]");
          const productNote = modal.querySelector(".item-product-note");
          const productSocial = modal.querySelector(".item-product-social");
          const productAvatar = modal.querySelector("[data-item-product-avatar]");
          const productAvatarInitial = modal.querySelector("[data-item-product-avatar-initial]");
          const productSpecs = modal.querySelector("[data-item-product-specs]");
          const productProfileLinks = modal.querySelectorAll("[data-item-product-profile-link], [data-item-product-profile-action]");
          const productChat = modal.querySelector("[data-item-product-chat]");
          const productCustomer = modal.querySelector("[data-item-product-customer]");
          const productCustomerNote = modal.querySelector("[data-item-product-customer-note]");
          const productConnect = modal.querySelector(".item-product-connect");
          const productLike = modal.querySelector("[data-item-product-like]");
          const productComment = modal.querySelector("[data-item-product-comment]");
          const productRepost = modal.querySelector("[data-item-product-repost]");
          const productShare = modal.querySelector("[data-item-product-share]");
          const productSocialSave = modal.querySelector("[data-item-product-social-save]");
          const productLikeCount = modal.querySelector("[data-item-product-like-count]");
          const productCommentCount = modal.querySelector("[data-item-product-comment-count]");
          const productRepostCount = modal.querySelector("[data-item-product-repost-count]");
          const productSaveCount = modal.querySelector("[data-item-product-save-count]");
          const productCommentInput = modal.querySelector("[data-item-product-comment-input]");
          const productCommentSend = modal.querySelector("[data-item-product-comment-send]");
          const productFeedback = modal.querySelector("[data-item-product-feedback]");
          const productDetailScroll = modal.querySelector("[data-item-detail-scroll]");
          const productComments = modal.querySelector("[data-item-product-comments]");
          const productCommentTotal = modal.querySelector("[data-item-product-comment-total]");
          const productCommentList = modal.querySelector("[data-item-product-comment-list]");
          const productCommentPreviewAvatar = modal.querySelector(".item-product-comment-preview .item-product-comment-avatar");
          const productCommentTitle = productComments ? productComments.querySelector(".item-product-section-title strong") : null;
          const productCommentNote = productComments ? productComments.querySelector(".item-product-section-note") : null;
          const productChatSection = modal.querySelector("[data-item-product-chat-section]");
          const productChatStatus = modal.querySelector("[data-item-product-chat-status]");
          const productChatThread = modal.querySelector("[data-item-product-chat-thread]");
          const productChatInput = modal.querySelector("[data-item-product-chat-input]");
          const productChatSend = modal.querySelector("[data-item-product-chat-send]");
          const productChatAttach = modal.querySelector("[data-item-product-chat-attach]");
          const productChatAttachPreview = modal.querySelector("[data-item-product-chat-attach-preview]");
          const productOwnerPanel = modal.querySelector("[data-item-product-owner-panel]");
          const productOwnerNote = modal.querySelector("[data-item-product-owner-note]");
          const productOwnerMetrics = modal.querySelector("[data-item-product-owner-metrics]");
          const productOwnerActivity = modal.querySelector("[data-item-product-owner-activity]");
          const productOwnerActivityTotal = modal.querySelector("[data-item-product-owner-activity-total]");
          const productOwnerStats = modal.querySelector("[data-item-product-owner-stats]");
          const clipModal = document.querySelector("[data-clip-viewer-modal]");
          const clipTrack = document.querySelector("[data-clip-viewer-track]");
          const clipClose = document.querySelector("[data-clip-viewer-close]");
          const cardSelector = ".product-card, .feed-product-card, .post-card, .reel-card, .business-card, [data-card], [data-feed-id], .feed-card, .social-feed-card, .home-created-card, .home-flow-item, .feed-clip-card, .feed-product-clip-card, .search-reel-card, .business-posted-clip-card, .business-preview-card, .business-preview-card-reel";
          const ignoredClickSelector = "button, input, textarea, select, label, .business-arrow, .business-preview-arrow, .feed-action, .feed-comment-form, .feed-profile-link, .emy-video-controls, .emy-video-volume-wrap, [data-emy-video-play], [data-emy-video-mute], [data-emy-video-fullscreen], [data-emy-video-progress], [data-feed-carousel-prev], [data-feed-carousel-next], [data-feed-carousel-dot]";
          const typingTargetSelector = "input, textarea, select, [contenteditable=''], [contenteditable='true'], [role='textbox'], .feed-comment-form, .feed-comment-reply-form, .item-product-comment-reply-form, .clip-viewer-comment-form, .clip-viewer-comment-reply-form";
          const mediaClassNames = ["photo", "media", "feed-media", "business-preview-media", "home-flow-media", "home-created-media", "post-avatar", "reel-avatar", "feed-avatar", "search-reel-avatar", "business-preview-post-avatar"];
          let activeClipCards = [];
          let activeClipSlideKey = "";
          let clipViewerSoundOn = (() => {
            try {
              return localStorage.getItem("emyClipViewerSoundOn") !== "0";
            } catch (error) {
              return true;
            }
          })();
          let clipViewerVolume = (() => {
            try {
              const saved = Number(localStorage.getItem("emyClipViewerVolume"));
              return Number.isFinite(saved) && saved >= 0 && saved <= 1 ? saved : 1;
            } catch (error) {
              return 1;
            }
          })();
          let clipAutoplayTimer = 0;
          let activeChatBusinessKey = "";
          let activeChatBusinessName = "";
          let activeChatItemContext = null;
          let attachCurrentItemToChat = false;
          let activeDetailCard = null;
          let activeDetailDetails = null;
          let activeJobDetailCard = null;

          function escapeDetail(value) {
            return String(value || "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[char]));
          }
          function cleanText(value) { return String(value || "").replace(/\s+/g, " ").trim(); }
          function readEngagementCount(value) {
            const raw = value && value.dataset ? value.dataset.rawCount : "";
            const source = raw !== undefined && raw !== "" ? raw : (value && value.textContent !== undefined ? value.textContent : value);
            const match = String(source || "").replace(/,/g, "").match(/-?\d+(?:\.\d+)?\s*[kKmM]?/);
            if (!match) return 0;
            const token = match[0].replace(/\s+/g, "");
            const multiplier = /m$/i.test(token) ? 1000000 : /k$/i.test(token) ? 1000 : 1;
            const number = Number(token.replace(/[kKmM]$/g, ""));
            return Number.isFinite(number) ? Math.max(0, Math.round(number * multiplier)) : 0;
          }
          function formatEngagementCount(value) {
            const count = readEngagementCount(value);
            const format = (divisor, suffix) => {
              const scaled = count / divisor;
              const rounded = scaled >= 10 ? Math.round(scaled) : Math.round(scaled * 10) / 10;
              return String(rounded).replace(/\.0$/, "") + suffix;
            };
            if (count >= 1000000) return format(1000000, "M");
            if (count >= 1000) return format(1000, "K");
            return String(count);
          }
          function setEngagementCountText(node, value, hideZero) {
            if (!node) return;
            const count = readEngagementCount(value);
            node.dataset.rawCount = String(count);
            node.textContent = hideZero && !count ? "" : formatEngagementCount(count);
          }
          function cleanMultilineText(value) {
            return String(value || "")
              .replace(/\r\n?/g, "\n")
              .replace(/[ \t]+\n/g, "\n")
              .replace(/\n[ \t]+/g, "\n")
              .replace(/\n{3,}/g, "\n\n")
              .trim();
          }
          function isTypingTarget(target) {
            if (!target || !target.closest) return false;
            return !!target.closest(typingTargetSelector);
          }
          function currentUserDisplayName() {
            try {
              if (activeDetailAccountRole() === "business") {
                const businessName = currentBusinessDisplayName();
                if (businessName) return businessName;
              }
            } catch (error) {}
            const storedName = cleanText(localStorage.getItem("emyCustomerDisplayName"));
            const first = cleanText(localStorage.getItem("emyCustomerFirstName") || localStorage.getItem("emyMainPendingSignupFirstName"));
            const last = cleanText(localStorage.getItem("emyCustomerLastName") || localStorage.getItem("emyMainPendingSignupLastName"));
            const signedEmail = cleanText(localStorage.getItem("emyMainSignedInEmail"));
            if (storedName) return storedName;
            const fullName = cleanText([first, last].filter(Boolean).join(" "));
            if (fullName) return fullName;
            return signedEmail ? signedEmail.split("@")[0] : "Customer";
          }
          function activeDetailAccountRole() {
            try {
              const path = String(window.location.pathname || "");
              const params = new URLSearchParams(window.location.search || "");
              const mode = cleanText(params.get("mode")).toLowerCase();
              const view = cleanText(params.get("view")).toLowerCase();
              const signedRole = cleanText(localStorage.getItem("emyMainSignedInRole")).toLowerCase();
              const pendingRole = cleanText(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase();
              if (/emy-customer-/i.test(path)) return "customer";
              if (/emy-business-profile\.html$/i.test(path)) {
                if (mode === "customer" || view === "customer") return "customer";
                if (mode === "business" || view === "business" || signedRole === "business" || pendingRole === "business" || currentBusinessDisplayName()) return "business";
              }
            } catch (error) {}
            const signedRole = cleanText(localStorage.getItem("emyMainSignedInRole")).toLowerCase();
            if (signedRole === "customer" || signedRole === "business") return signedRole;
            const pendingRole = cleanText(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase();
            return pendingRole === "customer" || pendingRole === "business" ? pendingRole : "";
          }
          function detailIsBusinessAccount() {
            return activeDetailAccountRole() === "business";
          }
          function detailCanBecomeCustomer() {
            return !detailIsBusinessAccount();
          }
          function detailSlug(value) {
            return cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
          }
          function currentBusinessDisplayName() {
            const profile = detailReadJson("emyBusinessProfileDraft", {});
            return cleanText((profile && (profile.businessName || profile.name)) || detailReadStorage("emyBusinessDisplayName") || detailReadStorage("emyBusinessName") || detailReadStorage("emyMainPendingSignupBusinessName"));
          }
          function currentBusinessProfilePhoto() {
            const profile = detailReadJson("emyBusinessProfileDraft", {});
            return detailFirstClean([
              detailReadStorage("emyBusinessProfilePhoto"),
              detailReadStorage("emyBusinessProfilePhotoSrc"),
              detailReadStorage("emyBusinessProfilePhotoBackup"),
              detailReadStorage("emyBusinessProfilePhotoSrcBackup"),
              detailReadStorage("emyBusinessProfileImage"),
              detailReadStorage("emyBusinessProfileImageSrc"),
              detailReadStorage("emyBusinessPhoto"),
              detailReadStorage("emyBusinessPhotoSrc"),
              detailReadStorage("emyBusinessAvatar"),
              detailReadStorage("emyBusinessAvatarSrc"),
              detailReadStorage("emyBusinessLogo"),
              detailReadStorage("emyBusinessLogoSrc"),
              detailReadStorage("emyMainPendingSignupBusinessPhoto"),
              profile && profile.photoUrl,
              profile && profile.profilePhotoUrl,
              profile && profile.businessProfilePhotoUrl,
              profile && profile.businessPhotoUrl,
              profile && profile.businessAvatarUrl,
              profile && profile.businessLogoUrl,
              profile && profile.logoUrl,
              profile && profile.imageUrl,
              profile && profile.profilePhoto,
              profile && profile.profilePhotoSrc,
              profile && profile.businessProfilePhoto,
              profile && profile.businessProfilePhotoSrc,
              profile && profile.businessPhoto,
              profile && profile.businessPhotoSrc,
              profile && profile.businessAvatar,
              profile && profile.businessAvatarSrc,
              profile && profile.businessLogo,
              profile && profile.businessLogoSrc,
              profile && profile.logo,
              profile && profile.logoSrc,
              profile && profile.photo,
              profile && profile.photoSrc,
              profile && profile.image,
              profile && profile.imageSrc
            ]);
          }
          function currentBusinessProfilePhotoRef() {
            const profile = detailReadJson("emyBusinessProfileDraft", {});
            return detailFirstClean([
              detailReadStorage("emyBusinessProfilePhotoRef"),
              detailReadStorage("emyBusinessProfilePhotoRefBackup"),
              detailReadStorage("emyBusinessProfileImageRef"),
              detailReadStorage("emyBusinessPhotoRef"),
              detailReadStorage("emyBusinessAvatarRef"),
              detailReadStorage("emyBusinessLogoRef"),
              detailReadStorage("emyMainPendingSignupBusinessPhotoRef"),
              profile && profile.photoPublicId,
              profile && profile.profilePhotoPublicId,
              profile && profile.profilePhotoRef,
              profile && profile.businessProfilePhotoPublicId,
              profile && profile.businessProfilePhotoRef,
              profile && profile.businessPhotoPublicId,
              profile && profile.businessPhotoRef,
              profile && profile.businessAvatarPublicId,
              profile && profile.businessAvatarRef,
              profile && profile.businessLogoPublicId,
              profile && profile.businessLogoRef,
              profile && profile.logoPublicId,
              profile && profile.logoRef,
              profile && profile.photoRef,
              profile && profile.imagePublicId,
              profile && profile.imageRef
            ]);
          }
          function detailRepostActorIdentity() {
            let businessSurface = activeDetailAccountRole() === "business";
            try {
              const params = new URLSearchParams(window.location.search || "");
              const path = String(window.location.pathname || "");
              if (/emy-business-profile\.html$/i.test(path) && params.get("mode") === "business") businessSurface = true;
            } catch (error) {}
            const businessName = currentBusinessDisplayName();
            if (businessSurface && businessName) {
              const businessKey = detailReadStorage("emyBusinessProfileKey") || detailReadStorage("emyBusinessKey") || detailSlug(businessName) || "profile";
              return {
                type: "business",
                name: businessName,
                key: businessKey,
                href: "emy-business-profile.html?mode=business",
                photo: currentBusinessProfilePhoto(),
                photoRef: currentBusinessProfilePhotoRef()
              };
            }
            const customerName = currentUserDisplayName();
            const customerEmail = cleanText(detailReadStorage("emyMainSignedInEmail") || detailReadStorage("emyMainPendingSignupEmail"));
            const customerKey = cleanText(detailReadStorage("emyCustomerProfileKey") || detailReadStorage("emyCustomerKey") || customerEmail || customerName || "customer-profile");
            const customerHref = "emy-customer-profile.html" + (customerKey && customerKey.toLowerCase() !== "customer" && customerKey.toLowerCase() !== "customer-profile" ? "?customer=" + encodeURIComponent(customerKey) : "");
            return {
              type: "customer",
              name: customerName,
              key: customerKey,
              email: customerEmail,
              href: customerHref,
              photo: detailReadStorage("emyCustomerProfilePhoto") || detailReadStorage("emyCustomerProfilePhotoSrc") || (String(detailReadStorage("emyMainPendingSignupRole") || "").toLowerCase() === "customer" ? detailReadStorage("emyMainPendingSignupPhoto") : ""),
              photoRef: detailReadStorage("emyCustomerProfilePhotoRef") || (String(detailReadStorage("emyMainPendingSignupRole") || "").toLowerCase() === "customer" ? detailReadStorage("emyMainPendingSignupPhotoRef") : "")
            };
          }
          function currentBusinessIdentitySet() {
            const profile = detailReadJson("emyBusinessProfileDraft", {});
            const values = [
              "profile",
              profile && profile.key,
              profile && profile.businessKey,
              detailReadStorage("emyBusinessProfileKey"),
              detailReadStorage("emyBusinessKey"),
              currentBusinessDisplayName()
            ];
            const identities = new Set();
            values.forEach((value) => {
              const clean = cleanText(value).toLowerCase();
              const key = detailSlug(value);
              if (clean) identities.add(clean);
              if (key) identities.add(key);
            });
            return identities;
          }
          function detailIsCurrentBusinessIdentity(value) {
            const identities = currentBusinessIdentitySet();
            const clean = cleanText(value).toLowerCase();
            const key = detailSlug(value);
            return !!((clean && identities.has(clean)) || (key && identities.has(key)));
          }
          function detailBusinessOwnsItem(card, details) {
            if (!card || !detailIsBusinessAccount()) return false;
            const data = card.dataset || {};
            const identities = currentBusinessIdentitySet();
            const currentName = currentBusinessDisplayName();
            const candidateKeys = [
              data.businessKey,
              data.detailBusinessKey,
              data.businessLink,
              data.ownerKey,
              details && details.businessKey
            ].map(detailSlug).filter(Boolean);
            if (candidateKeys.some((key) => identities.has(key))) return true;
            const candidateNames = [
              details && details.business,
              data.detailBusiness,
              data.businessName,
              data.business,
              card.getAttribute("aria-label")
            ].map(detailSlug).filter(Boolean);
            if (currentName && candidateNames.some((name) => name === detailSlug(currentName))) return true;
            if (cleanText(data.owner).toLowerCase() === "business" && candidateKeys.includes("profile")) return true;
            return card.classList.contains("business-live-product-card") || (card.classList.contains("is-user-post") && !!data.businessStorageKey);
          }
          function detailCardLooksBusinessOwned(card, details) {
            if (!card) return false;
            const data = card.dataset || {};
            const owner = cleanText(data.owner || data.repostActorType || data.detailOwner || data.accountType).toLowerCase();
            if (owner === "business") return true;
            if (owner === "customer") return false;
            const keys = [
              data.businessKey,
              data.detailBusinessKey,
              data.businessLink,
              data.ownerKey,
              details && details.businessKey
            ].map(detailSlug).filter(Boolean);
            if (keys.some((key) => key && key !== "customer-profile")) return true;
            if (data.businessStorageKey || data.businessPostStorageKey) return true;
            return card.classList.contains("business-live-product-card");
          }
          function detailCustomerOwnsItem(card, details) {
            if (!card || detailIsBusinessAccount()) return false;
            return detailCardLooksCustomerOwned(card, details);
          }
          function detailIsPublicCustomerSurface(card) {
            const body = document.body;
            if (body && body.classList && body.classList.contains("is-public-customer-shell")) return true;
            if (card && card.dataset && card.dataset.publicCustomerSurface === "true") return true;
            if (card && card.closest && card.closest(".public-business-profile, [data-public-business], .public-activity-section, .public-business-product-card, .public-business-post-card, .public-business-clip-card")) return true;
            try {
              const url = new URL(window.location.href);
              if (url.searchParams.get("business") && !(body && body.classList && body.classList.contains("is-business-owner-shell"))) return true;
            } catch (error) {}
            return false;
          }
          function detailViewerCanUseOwnerActions(card, details) {
            if (!card) return false;
            if (detailBusinessOwnsItem(card, details)) return !detailIsPublicCustomerSurface(card);
            return detailCustomerOwnsItem(card, details);
          }
          function detailCardLooksCustomerOwned(card, details) {
            if (!card) return false;
            const data = card.dataset || {};
            if (detailCardLooksBusinessOwned(card, details)) return false;
            const owner = cleanText(data.owner || data.repostActorType || data.detailOwner || data.accountType || data.actorType || data.createdAs).toLowerCase();
            if (owner === "customer") return true;
            if (owner === "business") return false;
            const quoteInsideRepost = card.classList && card.classList.contains("social-feed-quote") && card.closest && card.closest(".is-repost");
            if (quoteInsideRepost) return data.businessKey === "customer-profile" || data.detailBusinessKey === "customer-profile";
            if (data.businessKey === "customer-profile" || data.detailBusinessKey === "customer-profile") return true;
            if (card.classList.contains("customer-public-activity-item")) return true;
            if (card.classList.contains("home-created-card") && (data.businessKey === "customer-profile" || data.detailBusinessKey === "customer-profile" || owner === "customer")) return true;
            if (card.classList.contains("is-user-post") && (data.businessKey === "customer-profile" || data.detailBusinessKey === "customer-profile" || owner === "customer")) return true;
            const profileHref = String(data.profileHref || data.detailHref || "").toLowerCase();
            if (profileHref.indexOf("emy-customer-profile") >= 0) return true;
            const feedId = String(data.feedId || data.originalFeedId || "").trim().toLowerCase();
            if (/^(customer-post-|user-feed-)/.test(feedId)) return true;
            if (/^feed-create-/.test(feedId) && owner.indexOf("business") === -1 && profileHref.indexOf("emy-business-profile") < 0) return true;
            return false;
          }
          function detailActorIsCustomerContentOwner(card, actor) {
            if (!card || !actor || actor.type !== "customer" || !detailCardLooksCustomerOwned(card)) return false;
            const data = card.dataset || {};
            const ownerName = currentUserDisplayName().trim().toLowerCase();
            const posterName = cleanText(data.detailBusiness || "").trim().toLowerCase();
            if (ownerName && posterName && ownerName === posterName) return true;
            const cardOwnerKey = detailSlug(data.businessKey || data.detailBusinessKey || data.ownerKey || "");
            const actorKey = detailSlug(actor.key || "");
            if (cardOwnerKey === "customer-profile" && (!actorKey || actorKey === "customer-profile")) return true;
            return data.owner === "customer" || data.accountType === "customer" || data.actorType === "customer";
          }
          function detailOwnedPostDisplayName(card, details) {
            if (detailCardLooksBusinessOwned(card, details)) return cleanText(details && details.business) || cleanText(card && card.dataset && card.dataset.detailBusiness) || currentBusinessDisplayName() || "Business";
            return currentUserDisplayName();
          }
          function currentUserInitial() {
            return (currentUserDisplayName().charAt(0) || "S").toUpperCase();
          }
          function detailInitialFromName(value, fallback) {
            return (cleanText(value).charAt(0) || fallback || "C").toUpperCase();
          }
          function currentUserPhotoSrc() {
            try {
              if (activeDetailAccountRole() === "business") return currentBusinessProfilePhoto() || "";
            } catch (error) {}
            const signedRole = String(localStorage.getItem("emyMainSignedInRole") || "").toLowerCase();
            if (signedRole === "business") return "";
            const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
            const customerPhoto = localStorage.getItem("emyCustomerProfilePhoto") ||
              localStorage.getItem("emyCustomerProfilePhotoSrc") ||
              (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhoto") : "") ||
              (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoSrc") : "") ||
              "";
            if (customerPhoto) return customerPhoto;
            if (typeof activeProfileRole === "function" && activeProfileRole() === "customer" && typeof readActiveProfilePhoto === "function") return readActiveProfilePhoto() || "";
            return "";
          }
          function currentUserPhotoRef() {
            try {
              if (activeDetailAccountRole() === "business") return currentBusinessProfilePhotoRef() || "";
            } catch (error) {}
            const signedRole = String(localStorage.getItem("emyMainSignedInRole") || "").toLowerCase();
            if (signedRole === "business") return "";
            const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
            if (pendingRole === "customer") return localStorage.getItem("emyCustomerProfilePhotoRef") || localStorage.getItem("emyMainPendingSignupPhotoRef") || "";
            return localStorage.getItem("emyCustomerProfilePhotoRef") || "";
          }
          function isCurrentUserName(name, mine) {
            if (mine) return true;
            const cleanName = cleanText(name).toLowerCase();
            if (detailIsBusinessAccount()) {
              const businessName = currentBusinessDisplayName().toLowerCase();
              return cleanName === "you" || (!!businessName && cleanName === businessName);
            }
            const ownName = currentUserDisplayName().toLowerCase();
            return cleanName === "you" || (!!ownName && cleanName === ownName);
          }
          function detailCommentAuthorRole(comment, card, details) {
            const explicit = cleanText(comment && (comment.role || comment.actorType || comment.accountRole)).toLowerCase();
            if (explicit === "business" || explicit === "customer") return explicit;
            const href = cleanText(comment && comment.href).toLowerCase();
            if (href.indexOf("emy-business-profile") >= 0 || href.indexOf("mode=business") >= 0) return "business";
            if (href.indexOf("emy-customer-profile") >= 0) return "customer";
            const data = card && card.dataset ? card.dataset : {};
            const cardBusiness = cleanText((details && details.business) || data.detailBusiness || data.businessName || data.business).toLowerCase();
            const authorName = cleanText(comment && (comment.name || comment.author)).toLowerCase();
            if (cardBusiness && authorName && cardBusiness === authorName) return "business";
            return "";
          }
          function detailCommentOwnForViewer(comment, name, card, details) {
            const authorRole = detailCommentAuthorRole(comment, card, details);
            const viewer = detailCurrentPersonSnapshot();
            const viewerRole = cleanText(viewer && viewer.role).toLowerCase() || activeDetailAccountRole();
            if (authorRole === "business" && viewerRole === "customer") return false;
            if (authorRole === "customer" && viewerRole === "business") return false;
            const commentPerson = {
              role: authorRole || cleanText(comment && (comment.role || comment.actorType || comment.accountRole)).toLowerCase(),
              name: name || comment && (comment.name || comment.author),
              key: comment && (comment.key || comment.actorKey || comment.accountKey || comment.customerKey || comment.businessKey || comment.viewerKey),
              email: comment && (comment.email || comment.accountEmail || comment.customerEmail || comment.viewerEmail),
              href: comment && (comment.href || comment.profileHref || comment.customerHref || comment.viewerHref),
              actorName: comment && (comment.actorName || comment.authorName || comment.commenterName)
            };
            if (detailSameAccountPerson(commentPerson, viewer)) return true;
            const cleanName = cleanText(name || comment && (comment.name || comment.author)).toLowerCase();
            if (viewerRole === "customer") {
              if (authorRole === "business") return false;
              const ownName = currentUserDisplayName().toLowerCase();
              return cleanName === "you" || (!!ownName && cleanName === ownName);
            }
            if (viewerRole === "business") {
              if (authorRole === "customer") return false;
              const businessName = currentBusinessDisplayName().toLowerCase();
              return cleanName === "you" || (!!businessName && cleanName === businessName);
            }
            return false;
          }
          function detailCommentReactionActive(comment, kind, card, details) {
            const active = kind === "dislike" ? !!(comment && comment.disliked) : !!(comment && comment.liked);
            if (!active) return false;
            const authorRole = detailCommentAuthorRole(comment, card, details);
            const viewerRole = activeDetailAccountRole();
            if (authorRole && viewerRole && authorRole !== viewerRole) return false;
            return true;
          }
          function profileHrefForOwner(author, mine) {
            if (isCurrentUserName(author, mine)) return activeDetailAccountRole() === "business" ? "emy-business-profile.html?mode=business" : "emy-customer-profile.html";
            const key = cleanText(author || "business").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "business";
            return "emy-business-profile.html?business=" + encodeURIComponent(key);
          }
          function currentUserAvatarMarkup(className, author, mine, fallbackInitial, photoOverride, photoRefOverride, hrefOverride) {
            const own = isCurrentUserName(author, mine);
            const photo = cleanText(photoOverride) || (own ? currentUserPhotoSrc() : "");
            const photoRef = cleanText(photoRefOverride) || (own ? currentUserPhotoRef() : "");
            const initial = cleanText(fallbackInitial || author || currentUserInitial()).charAt(0).toUpperCase() || "S";
            const href = cleanText(hrefOverride) || profileHrefForOwner(author, own);
            return '<a class="' + escapeDetail(className) + (photo || photoRef ? ' has-image' : '') + '" href="' + escapeDetail(href) + '" aria-label="Open ' + escapeDetail(author || "profile") + ' profile">' + (photo || photoRef ? '<img' + (photo ? ' src="' + escapeDetail(photo) + '"' : '') + (photoRef ? ' data-emy-media-ref="' + escapeDetail(photoRef) + '"' : '') + ' alt="" />' : escapeDetail(initial)) + '</a>';
          }
          function emyIsBusinessCoverMedia(node) {
            return !!(node && node.matches && node.matches("video[data-business-cover-media]"));
          }
          function emyPauseMediaNode(node) {
            if (!node || typeof node.pause !== "function") return;
            try { node.pause(); } catch (error) {}
            if (!emyIsBusinessCoverMedia(node)) {
              try { node.autoplay = false; } catch (error) {}
              try { node.removeAttribute("autoplay"); } catch (error) {}
              try {
                if (Number.isFinite(node.duration) || node.readyState >= 1) node.currentTime = 0;
              } catch (error) {}
            }
            if (node.dataset) node.dataset.emyHoverPreviewActive = "false";
            const player = node.closest && node.closest("[data-emy-video-player]");
            if (player) player.classList.remove("is-playing", "is-controls-visible");
            const previewCard = node.closest && node.closest(".is-hover-previewing,.is-previewing,[data-emy-hover-preview-token]");
            if (previewCard) {
              previewCard.classList.remove("is-hover-previewing", "is-previewing");
              if (previewCard.dataset) previewCard.dataset.emyHoverPreviewToken = "";
            }
          }
          function emyPausePreviewCardsOutside(root) {
            if (window.emyStopClipHoverPreviews) {
              try { window.emyStopClipHoverPreviews(root || null); } catch (error) {}
            }
            document.querySelectorAll(".is-hover-previewing,.is-previewing,[data-emy-hover-preview-token]").forEach((card) => {
              if (root && root.contains && root.contains(card)) return;
              card.classList.remove("is-hover-previewing", "is-previewing");
              if (card.dataset) card.dataset.emyHoverPreviewToken = "";
            });
          }
          window.emyPauseOtherMedia = function pauseOtherMedia(activeMedia) {
            const activeRoot = activeMedia && activeMedia.closest ? (activeMedia.closest(".clip-viewer-modal,.item-detail-modal,.is-hover-previewing,.is-previewing,[data-emy-hover-preview-token],.reel-card,.feed-card.is-clip,.feed-clip-card,.feed-product-clip-card,.business-posted-clip-card,.business-preview-card-reel,.business-card,[data-emy-video-player]") || activeMedia) : activeMedia;
            emyPausePreviewCardsOutside(activeRoot);
            document.querySelectorAll("video, audio").forEach((node) => {
              if (node !== activeMedia && !emyIsBusinessCoverMedia(node)) emyPauseMediaNode(node);
            });
          };
          window.emyPauseMediaInside = function pauseMediaInside(root) {
            const scope = root && root.querySelectorAll ? root : document;
            scope.querySelectorAll("video, audio").forEach(emyPauseMediaNode);
          };
          window.emyPauseMediaOutside = function pauseMediaOutside(root) {
            emyPausePreviewCardsOutside(root);
            document.querySelectorAll("video, audio").forEach((node) => {
              if (!root || !root.contains || !root.contains(node)) emyPauseMediaNode(node);
            });
          };
          if (!window.emyMediaPlaybackGuardBound) {
            window.emyMediaPlaybackGuardBound = "true";
            document.addEventListener("play", (event) => {
              const mediaNode = event.target;
              if (!mediaNode || !mediaNode.matches || !mediaNode.matches("video, audio")) return;
              window.emyPauseOtherMedia(mediaNode);
            }, true);
          }
          function emyVideoPlayerMarkup(src, label, mediaRef, posterSrc, posterRef) {
            const cleanSrc = cleanText(src);
            const cleanRef = cleanText(mediaRef);
            const cleanLabel = cleanText(label) || "Video";
            const cleanPosterSrc = cleanText(posterSrc);
            const cleanPosterRef = cleanText(posterRef);
            if (!cleanSrc && !cleanRef) return "";
            return '<div class="emy-video-player" data-emy-video-player data-quality="auto">' +
              '<video' + (cleanSrc ? ' src="' + escapeDetail(cleanSrc) + '"' : '') + (cleanRef ? ' data-emy-media-ref="' + escapeDetail(cleanRef) + '"' : '') + (cleanPosterSrc ? ' poster="' + escapeDetail(cleanPosterSrc) + '"' : '') + (cleanPosterRef ? ' data-emy-poster-ref="' + escapeDetail(cleanPosterRef) + '"' : '') + ' playsinline preload="auto" aria-label="' + escapeDetail(cleanLabel) + '"></video>' +
              '<span class="emy-video-surface" data-emy-video-open aria-hidden="true"></span>' +
              '<div class="emy-video-error" data-emy-video-error hidden></div>' +
              '<div class="emy-video-controls" aria-label="Video controls">' +
                '<button class="emy-video-control" type="button" data-emy-video-play aria-label="Play video"><svg class="play-icon" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg><svg class="pause-icon" viewBox="0 0 24 24"><path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z"/></svg></button>' +
                '<input class="emy-video-progress" type="range" min="0" max="1000" value="0" step="1" data-emy-video-progress aria-label="Video progress" />' +
                '<span class="emy-video-time" data-emy-video-time>0:00</span>' +
                '<select class="emy-video-quality" data-emy-video-quality aria-label="Video quality"><option value="auto">Auto</option><option value="hd">HD</option><option value="data">Saver</option></select>' +
                '<button class="emy-video-control" type="button" data-emy-video-mute aria-pressed="false" aria-label="Mute video"><svg viewBox="0 0 24 24"><path d="M4 9.5v5h4l5 4v-13l-5 4H4Z"/><path data-sound-wave d="M17 9.2c1.1 1.4 1.1 4.2 0 5.6"/><path data-muted-mark d="m18 9 3 3m0-3-3 3"/></svg></button>' +
                '<button class="emy-video-control" type="button" data-emy-video-fullscreen aria-label="Expand video"><svg viewBox="0 0 24 24"><path d="M8 4H4v4M16 4h4v4M8 20H4v-4M20 16v4h-4"/></svg></button>' +
              '</div>' +
            '</div>';
          }
          function formatEmyVideoTime(seconds) {
            const total = Math.max(0, Math.floor(Number(seconds) || 0));
            return Math.floor(total / 60) + ":" + String(total % 60).padStart(2, "0");
          }
          function setupEmyVideoPlayers(root = document) {
            const scope = root && root.querySelectorAll ? root : document;
            const players = [];
            if (root && root.nodeType === 1 && root.matches && root.matches("[data-emy-video-player]")) players.push(root);
            scope.querySelectorAll("[data-emy-video-player]").forEach((player) => players.push(player));
            players.forEach((player) => {
              if (!player || player.dataset.emyVideoBound === "true") return;
              const inactiveSlide = player.closest("[data-feed-carousel-slide]:not(.is-active)");
              if (inactiveSlide) {
                const deferredVideo = player.querySelector("video");
                if (deferredVideo && window.emyDeferCarouselVideoSource) window.emyDeferCarouselVideoSource(deferredVideo);
                else if (deferredVideo) {
                  try { deferredVideo.pause(); deferredVideo.preload = "none"; deferredVideo.setAttribute("preload", "none"); } catch (error) {}
                }
                return;
              }
              const video = player.querySelector("video");
              if (!video) return;
              try { video.controls = false; video.removeAttribute("controls"); } catch (error) {}
              player.querySelectorAll(".emy-video-big-play").forEach((node) => node.remove());
              player.dataset.emyVideoBound = "true";
              const playButtons = player.querySelectorAll("[data-emy-video-play]");
              const playSurface = player.querySelector("[data-emy-video-open]");
              const progress = player.querySelector("[data-emy-video-progress]");
              const time = player.querySelector("[data-emy-video-time]");
              const mute = player.querySelector("[data-emy-video-mute]");
              const fullscreen = player.querySelector("[data-emy-video-fullscreen]");
              const quality = player.querySelector("[data-emy-video-quality]");
              const error = player.querySelector("[data-emy-video-error]");
              const feedCardPlayer = !!(player.closest && player.closest(".feed-media, .social-feed-media, .home-created-media, .feed-media-carousel, .feed-post-media"));
              const stopPlayerControlEvent = (event) => {
                event.stopPropagation();
              };
              [player.querySelector(".emy-video-controls"), progress, quality, mute, fullscreen].concat(Array.from(playButtons)).filter(Boolean).forEach((node) => {
                ["pointerdown", "mousedown", "touchstart", "click"].forEach((type) => node.addEventListener(type, stopPlayerControlEvent, { passive: true }));
              });
              if (playSurface && !feedCardPlayer) {
                ["pointerdown", "mousedown", "touchstart", "click"].forEach((type) => playSurface.addEventListener(type, stopPlayerControlEvent, { passive: true }));
              }
              const showPlayerControls = () => player.classList.add("is-controls-visible");
              const hidePlayerControls = () => {
                player.classList.remove("is-controls-visible");
                if (!player.matches(":hover") && player.contains(document.activeElement) && document.activeElement && typeof document.activeElement.blur === "function") {
                  document.activeElement.blur();
                }
              };
              if (!feedCardPlayer) {
                player.addEventListener("mouseenter", showPlayerControls);
                player.addEventListener("mousemove", showPlayerControls);
                player.addEventListener("mouseleave", hidePlayerControls);
              }
              const showError = (message) => {
                if (!error) return;
                error.textContent = message;
                error.hidden = false;
              };
              const supportedQualities = ["auto", "hd", "data"];
              const normaliseQuality = (value) => supportedQualities.includes(String(value || "").toLowerCase()) ? String(value || "").toLowerCase() : "auto";
              const readQualityPreference = () => {
                try { return normaliseQuality(localStorage.getItem("emyVideoQualityPreference")); } catch (error) { return "auto"; }
              };
              const saveQualityPreference = (value) => {
                try { localStorage.setItem("emyVideoQualityPreference", normaliseQuality(value)); } catch (error) {}
              };
              const currentVideoSource = () => cleanText(video.currentSrc || video.src || video.getAttribute("src"));
              const rememberOriginalSource = () => {
                const source = currentVideoSource();
                if (source && !video.dataset.emyOriginalSrc) video.dataset.emyOriginalSrc = source;
                return video.dataset.emyOriginalSrc || source;
              };
              const findQualitySource = (mode) => {
                const normalized = normaliseQuality(mode);
                const sources = Array.from(video.querySelectorAll("source"));
                if (sources.length) {
                  const wanted = normalized === "hd" ? ["hd", "1080", "1080p", "720", "720p", "high"] : normalized === "data" ? ["data", "saver", "low", "360", "360p"] : ["auto", "default"];
                  const match = sources.find((source) => {
                    const label = cleanText(source.dataset.quality || source.dataset.videoQuality || source.getAttribute("label") || source.getAttribute("res")).toLowerCase();
                    return wanted.some((item) => label.indexOf(item) >= 0);
                  });
                  if (match && match.src) return match.src;
                }
                return normalized === "hd" ? rememberOriginalSource() : "";
              };
              const switchVideoSource = (nextSource) => {
                const current = currentVideoSource();
                if (!nextSource || nextSource === current) return;
                const wasPlaying = !video.paused && !video.ended;
                const currentTime = Number.isFinite(video.currentTime) ? video.currentTime : 0;
                video.src = nextSource;
                video.load();
                video.addEventListener("loadedmetadata", () => {
                  const duration = Number.isFinite(video.duration) ? video.duration : 0;
                  if (duration && currentTime) video.currentTime = Math.min(currentTime, Math.max(0, duration - 0.2));
                  if (wasPlaying) {
                    const playPromise = video.play();
                    if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
                  }
                  update();
                }, { once: true });
              };
              const applyQuality = (value, options = {}) => {
                const mode = normaliseQuality(value);
                player.dataset.quality = mode;
                video.dataset.emyQuality = mode;
                player.classList.toggle("is-quality-hd", mode === "hd");
                player.classList.toggle("is-quality-data", mode === "data");
                if (quality && quality.value !== mode) quality.value = mode;
                video.preload = mode === "data" ? "metadata" : "auto";
                if (mode === "data") video.setAttribute("preload", "metadata");
                else video.setAttribute("preload", "auto");
                switchVideoSource(findQualitySource(mode));
                if (!options.silent) {
                  saveQualityPreference(mode);
                  if (typeof showToast === "function") showToast(mode === "hd" ? "HD video mode applied." : mode === "data" ? "Data saver video mode applied." : "Auto video quality applied.");
                }
                update();
              };
              const syncSoundState = () => {
                const soundOn = !video.muted && Number(video.volume) > 0;
                player.classList.toggle("is-muted", !soundOn);
                player.classList.toggle("is-sound-on", soundOn);
                if (mute) {
                  mute.setAttribute("aria-label", soundOn ? "Mute video" : "Unmute video");
                  mute.setAttribute("aria-pressed", soundOn ? "false" : "true");
                  mute.title = soundOn ? "Mute video" : "Unmute video";
                }
              };
              const applyMute = (muted) => {
                if (muted) {
                  if (Number(video.volume) > 0) player.dataset.emyLastVolume = String(video.volume);
                  video.muted = true;
                } else {
                  video.muted = false;
                  const storedVolume = Number(player.dataset.emyLastVolume);
                  if (!Number.isFinite(video.volume) || video.volume <= 0.02) {
                    try { video.volume = Number.isFinite(storedVolume) && storedVolume > 0 ? Math.min(1, storedVolume) : 1; } catch (error) {}
                  }
                }
                syncSoundState();
                update();
              };
              const browserFullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement || null;
              const isExpanded = () => browserFullscreenElement() === player || player.classList.contains("is-expanded-fullscreen");
              const setFallbackFullscreen = (active) => {
                player.classList.toggle("is-expanded-fullscreen", !!active);
                document.body.classList.toggle("emy-video-fullscreen-lock", !!active);
                update();
              };
              const toggleFullscreen = () => {
                if (isExpanded()) {
                  if (browserFullscreenElement() === player && document.exitFullscreen) document.exitFullscreen().catch(() => setFallbackFullscreen(false));
                  else if (browserFullscreenElement() === player && document.webkitExitFullscreen) document.webkitExitFullscreen();
                  setFallbackFullscreen(false);
                  return;
                }
                if (player.requestFullscreen) {
                  player.requestFullscreen().then(update).catch(() => setFallbackFullscreen(true));
                  return;
                }
                if (player.webkitRequestFullscreen) {
                  try { player.webkitRequestFullscreen(); update(); } catch (error) { setFallbackFullscreen(true); }
                  return;
                }
                if (video.webkitEnterFullscreen) {
                  try { video.webkitEnterFullscreen(); } catch (error) { setFallbackFullscreen(true); }
                  return;
                }
                setFallbackFullscreen(true);
              };
              const update = () => {
                const duration = Number.isFinite(video.duration) ? video.duration : 0;
                const current = Number.isFinite(video.currentTime) ? video.currentTime : 0;
                player.classList.toggle("is-playing", !video.paused && !video.ended);
                if (progress && duration) progress.value = String(Math.min(1000, Math.round((current / duration) * 1000)));
                if (time) time.textContent = duration ? formatEmyVideoTime(current) + " / " + formatEmyVideoTime(duration) : "0:00";
                syncSoundState();
                if (fullscreen) {
                  fullscreen.setAttribute("aria-label", isExpanded() ? "Exit full screen" : "Expand video");
                  fullscreen.setAttribute("aria-pressed", isExpanded() ? "true" : "false");
                  fullscreen.title = isExpanded() ? "Exit full screen" : "Expand video";
                }
              };
              const togglePlay = () => {
                if (video.paused || video.ended) {
                  if (window.emyPauseOtherMedia) window.emyPauseOtherMedia(video);
                  const playPromise = video.play();
                  if (playPromise && typeof playPromise.catch === "function") {
                    playPromise.catch(() => showError("This video cannot play in this browser. Try MP4/H.264 or record it again."));
                  }
                } else {
                  video.pause();
                }
                update();
              };
              playButtons.forEach((button) => button.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                showPlayerControls();
                togglePlay();
              }));
              if (playSurface && !feedCardPlayer) playSurface.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                showPlayerControls();
                togglePlay();
              });
              if (progress) progress.addEventListener("input", (event) => {
                event.stopPropagation();
                showPlayerControls();
                const duration = Number.isFinite(video.duration) ? video.duration : 0;
                if (duration) video.currentTime = (Number(progress.value) / 1000) * duration;
                update();
              });
              if (mute) mute.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                applyMute(!video.muted || Number(video.volume) <= 0);
              });
              if (fullscreen) fullscreen.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleFullscreen();
              });
              if (quality) quality.addEventListener("change", (event) => {
                event.stopPropagation();
                applyQuality(quality.value || "auto");
              });
              video.addEventListener("loadedmetadata", update);
              video.addEventListener("timeupdate", update);
              video.addEventListener("play", update);
              video.addEventListener("pause", update);
              video.addEventListener("ended", update);
              video.addEventListener("volumechange", update);
              document.addEventListener("fullscreenchange", update);
              document.addEventListener("webkitfullscreenchange", update);
              document.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && player.classList.contains("is-expanded-fullscreen")) setFallbackFullscreen(false);
              });
              video.addEventListener("error", () => {
                const source = cleanText(video.currentSrc || video.src);
                showError(source.indexOf("blob:") === 0 ? "This old video link expired. Upload or record it again so EMY can save a playable copy." : "Saved, but this browser cannot decode this video. MP4/H.264 or WebM works best.");
                update();
              });
              if (!video.dataset.emyOriginalSrc) rememberOriginalSource();
              applyQuality(readQualityPreference(), { silent: true });
              update();
            });
          }
          if (!window.emySetupVideoPlayers || !window.emySetupVideoPlayers.__emyCarouselAware) {
            window.emyVideoPlayerMarkup = emyVideoPlayerMarkup;
            window.emySetupVideoPlayers = setupEmyVideoPlayers;
          }
          function getText(card, selector) {
            const node = card.querySelector(selector);
            return node ? cleanText(node.textContent) : "";
          }
          function getMultilineText(card, selector) {
            const node = card.querySelector(selector);
            return node ? cleanMultilineText(node.textContent) : "";
          }
          function inferKind(card) {
            if (card.classList.contains("reel-card") || card.classList.contains("is-clip")) return "Clip";
            if (card.classList.contains("product-card") || card.querySelector(".price, .feed-price, .reel-product-strip")) return "Product";
            if (card.classList.contains("business-card") || card.querySelector(".status, .closed")) return "Business";
            if (card.classList.contains("post-card") || card.querySelector(".post-head, .feed-comments")) return "Post";
            if (card.classList.contains("business-preview-card-reel")) return "Clip";
            if (card.classList.contains("business-preview-card-post")) return "Post";
            return "Details";
          }
          function findMediaNode(card) {
            return card.querySelector(".feed-article-card-cover, .feed-event-post-hero, .feed-media, .business-preview-media, .home-created-media, .feed-job-hero, .photo, .media, .home-flow-media");
          }
          function mediaSourceFromCard(card) {
            const mediaNode = findMediaNode(card);
            const video = mediaNode && mediaNode.querySelector("video");
            const image = mediaNode && mediaNode.querySelector("img");
            if (video) return cleanText(video.currentSrc || video.src || video.getAttribute("src"));
            if (image) return cleanText(image.currentSrc || image.src || image.getAttribute("src"));
            return "";
          }
          function mediaRefFromCard(card) {
            const mediaNode = findMediaNode(card);
            const stored = mediaNode && mediaNode.querySelector("[data-emy-media-ref]");
            const visibleRef = cleanText(stored && stored.dataset && stored.dataset.emyMediaRef);
            if (visibleRef) return visibleRef;
            const data = card && card.dataset ? card.dataset : {};
            return cleanText(data.detailMediaRef);
          }
          function mediaTypeFromCard(card) {
            const mediaNode = findMediaNode(card);
            if (mediaNode && mediaNode.querySelector("video")) return "video";
            if (mediaNode && mediaNode.querySelector("img")) return "image";
            return "";
          }
          function mediaClasses(node) {
            if (!node) return "";
            return Array.from(node.classList).filter((name) => !mediaClassNames.includes(name)).join(" ");
          }
          function formatVideoDuration(seconds) {
            const value = Number(seconds);
            if (!Number.isFinite(value) || value <= 0) return "";
            const total = Math.round(value);
            const minutes = Math.floor(total / 60);
            const remainingSeconds = String(total % 60).padStart(2, "0");
            return minutes + ":" + remainingSeconds;
          }
          function parseVideoDurationLabel(label) {
            const text = cleanText(label);
            if (!text) return 0;
            const parts = text.split(":").map((part) => Number(part));
            if (parts.length === 2 && parts.every(Number.isFinite)) return Math.max(0, (parts[0] * 60) + parts[1]);
            if (parts.length === 3 && parts.every(Number.isFinite)) return Math.max(0, (parts[0] * 3600) + (parts[1] * 60) + parts[2]);
            const seconds = Number(text.replace(/[^0-9.]/g, ""));
            return Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
          }
          function inferClipDuration(card) {
            const data = card && card.dataset ? card.dataset : {};
            const explicit = cleanText(data.detailDuration || data.videoDuration || (card && card.getAttribute("data-video-duration")));
            if (explicit) return explicit;
            const text = cleanText([
              data.detailTitle,
              data.detailBusiness,
              data.detailMeta,
              card && card.textContent
            ].join(" ")).toLowerCase();
            if (/kitchen|pizza|slice|oven|fresh/.test(text)) return "0:18";
            if (/glow|skincare|face wash|cleanser|routine|texture/.test(text)) return "0:24";
            if (/steel|bottle|travel mug|product clip|stock|shelf|packing/.test(text)) return "0:29";
            if (/customer|ross|profile|note|short update/.test(text)) return "0:20";
            if (/good day|working day|business 111/.test(text)) return "0:31";
            return "";
          }
          function durationBadgeHost(card) {
            if (!card) return null;
            return card.querySelector(".clip-viewer-media, .item-product-gallery-frame.is-active, .feed-media, .business-preview-media, .photo, .media, .home-flow-media") || card;
          }
          function ensureVideoDurationBadge(card) {
            if (!card) return;
            const host = durationBadgeHost(card);
            if (!host) return;
            const video = host.querySelector("video") || card.querySelector("video");
            const data = card && card.dataset ? card.dataset : {};
            const explicit = cleanText(data.detailDuration || data.videoDuration || card.getAttribute("data-video-duration"));
            const businessVideoCard = card.matches && card.matches(".business-card") && !card.matches(".reel-card, .feed-card.is-clip, .business-preview-card-reel");
            const galleryFrame = card.matches && card.matches(".item-product-gallery-frame");
            const clipLike = card.matches && card.matches(".reel-card, .feed-card.is-clip, .business-preview-card-reel, .clip-viewer-frame");
            const customPlayer = host.querySelector("[data-emy-video-player]") || card.querySelector("[data-emy-video-player]");
            if (customPlayer) {
              const oldBadge = host.querySelector(".video-duration-badge");
              if (oldBadge) oldBadge.remove();
              return;
            }
            if (galleryFrame && !video) {
              const oldBadge = host.querySelector(".video-duration-badge");
              if (oldBadge) oldBadge.remove();
              return;
            }
            const fallback = businessVideoCard ? explicit : inferClipDuration(card);
            if (!fallback && !video) return;
            let badge = host.querySelector(".video-duration-badge");
            if (!badge) {
              badge = document.createElement("span");
              badge.className = "video-duration-badge";
              badge.setAttribute("aria-label", clipLike ? "Video time remaining" : "Video duration");
              host.appendChild(badge);
            }
            const progress = host.querySelector(".clip-progress-fill");
            const setProgress = (ratio) => {
              if (!progress) return;
              const clean = Math.max(0, Math.min(1, Number(ratio) || 0));
              progress.style.setProperty("--clip-progress", (clean * 100).toFixed(1) + "%");
            };
            const fallbackSeconds = parseVideoDurationLabel(fallback);
            const autoActive = card.matches && card.matches(".clip-viewer-frame");
            const hoverOnly = card.matches && card.matches(".reel-card, .feed-card.is-clip, .business-preview-card-reel, .business-card") && !autoActive;
            const hoverTarget = hoverOnly ? card : host;
            const isActive = () => !hoverOnly || badge.dataset.hoverActive === "true";
            const updateBadgeVisibility = () => {
              const hasText = !!cleanText(badge.textContent);
              badge.hidden = !hasText || !isActive();
            };
            const stopSyntheticCountdown = (reset) => {
              if (badge._emyCountdownTimer) window.clearTimeout(badge._emyCountdownTimer);
              badge._emyCountdownTimer = null;
              if (reset) {
                badge._emyCountdownElapsed = 0;
                setDuration();
              }
            };
            const startSyntheticCountdown = () => {
              if (!clipLike || video || !fallbackSeconds) return;
              stopSyntheticCountdown(false);
              const start = performance.now() - ((badge._emyCountdownElapsed || 0) * 1000);
              const tick = () => {
                if (!isActive()) return;
                const elapsed = ((performance.now() - start) / 1000) % fallbackSeconds;
                badge._emyCountdownElapsed = elapsed;
                setDuration();
                badge._emyCountdownTimer = window.setTimeout(tick, 250);
              };
              tick();
            };
            if (hoverOnly && badge.dataset.hoverListener !== "true") {
              badge.dataset.hoverListener = "true";
              badge.dataset.hoverActive = "false";
              hoverTarget.addEventListener("mouseenter", () => {
                badge.dataset.hoverActive = "true";
                updateBadgeVisibility();
                startSyntheticCountdown();
              });
              hoverTarget.addEventListener("mouseleave", () => {
                badge.dataset.hoverActive = "false";
                stopSyntheticCountdown(true);
                updateBadgeVisibility();
              });
              hoverTarget.addEventListener("focusin", () => {
                badge.dataset.hoverActive = "true";
                updateBadgeVisibility();
                startSyntheticCountdown();
              });
              hoverTarget.addEventListener("focusout", () => {
                badge.dataset.hoverActive = "false";
                stopSyntheticCountdown(true);
                window.setTimeout(updateBadgeVisibility, 0);
              });
            }
            function setDuration() {
              const actualSeconds = video ? Number(video.duration) : 0;
              const totalSeconds = Number.isFinite(actualSeconds) && actualSeconds > 0 ? actualSeconds : fallbackSeconds;
              if (clipLike && totalSeconds) {
                const elapsed = video ? Math.max(0, Math.min(totalSeconds, Number(video.currentTime) || 0)) : Math.max(0, Math.min(totalSeconds, badge._emyCountdownElapsed || 0));
                const remaining = Math.max(0, totalSeconds - elapsed);
                badge.dataset.countdown = "true";
                badge.textContent = formatVideoDuration(remaining || totalSeconds);
                setProgress(elapsed / totalSeconds);
              } else {
                const actual = video ? formatVideoDuration(video.duration) : "";
                badge.dataset.countdown = "false";
                badge.textContent = actual || fallback;
                setProgress(0);
              }
              updateBadgeVisibility();
            }
            const tickDuration = () => {
              setDuration();
              if (video && !video.paused && !video.ended) {
                window.setTimeout(tickDuration, 250);
              }
            };
            setDuration();
            if (autoActive) {
              badge.dataset.hoverActive = "true";
              updateBadgeVisibility();
              startSyntheticCountdown();
            }
            if (video && !formatVideoDuration(video.duration) && badge.dataset.durationListener !== "true") {
              badge.dataset.durationListener = "true";
              video.addEventListener("loadedmetadata", setDuration, { once: true });
            }
            if (video && badge.dataset.playbackListener !== "true") {
              badge.dataset.playbackListener = "true";
              video.addEventListener("play", tickDuration);
              video.addEventListener("timeupdate", setDuration);
              video.addEventListener("pause", setDuration);
              video.addEventListener("ended", setDuration);
            }
          }
          function setupVideoDurationBadges(root = document) {
            if (!root) return;
            setupEmyVideoPlayers(root);
            const targets = [];
            if (root.nodeType === 1 && root.matches && root.matches(".reel-card, .feed-card.is-clip, .business-preview-card-reel, .clip-viewer-frame, .item-product-gallery-frame, .business-card")) {
              targets.push(root);
            }
            const scope = root.querySelectorAll ? root : document;
            scope.querySelectorAll(".reel-card, .feed-card.is-clip, .business-preview-card-reel, .clip-viewer-frame, .item-product-gallery-frame, .business-card").forEach((card) => targets.push(card));
            targets.forEach(ensureVideoDurationBadge);
          }
          window.emySetupVideoDurations = setupVideoDurationBadges;
          try {
            setupEmyVideoPlayers(document);
          } catch (error) {
            console.warn("EMY video player setup failed", error);
          }
          function collectMeta(card) {
            const nodes = card.querySelectorAll(".status, .distance, .product-source, .post-meta span, .reel-actions span, .meta span, .feed-actions > span, .feed-tag, .search-reel-actions span, .business-preview-pill");
            const values = [];
            nodes.forEach((node) => {
              const value = cleanText(node.textContent);
              if (value && !values.includes(value)) values.push(value);
            });
            return values.slice(0, 5);
          }
          function textForBusinessInference(card, details) {
            return cleanText([
              details && details.business,
              details && details.title,
              details && details.description,
              details && details.mediaClass,
              card && card.getAttribute("data-search-text"),
              card && card.textContent
            ].join(" ")).toLowerCase();
          }
          function inferProductBusiness(card, details) {
            const explicit = cleanText(details && details.business);
            if (explicit) return explicit;
            const text = textForBusinessInference(card, details);
            if (/angi|pizza|garlic|family/.test(text)) return "Angi Pizza Zone";
            if (/ever glow|face wash|serum|cleanser|skincare|beauty/.test(text)) return "Ever Glow Face Wash";
            if (/ross galler/.test(text)) return "Ross Galler";
            if (/business 111|steel|bottle|travel mug|lunch box|desk lamp|phone stand|tote|tech/.test(text)) return "business 111";
            return "Local EMY business";
          }
          function businessKeyFromDetails(card, details, businessName) {
            const data = card && card.dataset ? card.dataset : {};
            const explicit = cleanText(data.detailBusinessKey || data.businessKey || data.businessLink);
            if (explicit) {
              const normalized = explicit.toLowerCase();
              if (normalized.includes("angi-pizza")) return "angi-pizza";
              if (normalized.includes("ever-glow")) return "ever-glow";
              if (normalized.includes("ross-galler")) return "ross-galler";
              if (normalized.includes("business-111")) return "business-111";
              return explicit;
            }
            const text = (businessName + " " + textForBusinessInference(card, details)).toLowerCase();
            if (text.includes("angi pizza")) return "angi-pizza";
            if (text.includes("ever glow")) return "ever-glow";
            if (text.includes("ross galler")) return "ross-galler";
            if (text.includes("business 111") || /steel|bottle|travel mug|lunch box|desk lamp|phone stand|tote|tech/.test(text)) return "business-111";
            return detailSlug(businessName) || "business";
          }
          function productSpecValue(values, fallback) {
            return values.find((value) => value && value !== "New") || fallback;
          }
          function productAvailabilityMetaValue(values) {
            const list = Array.isArray(values) ? values : [];
            const direct = list.find((value) => /stock|available|availability|open|closed|left|sold|limited|ready|unavailable|pause|pre.?order|back.?order|made\s+to\s+order|custom|bespoke|online/i.test(String(value || "")));
            if (direct) return direct;
            const orderedAvailability = list[1] || "";
            if (orderedAvailability && !/\b(mi|likes?|saved|views?|reposts?)\b/i.test(orderedAvailability) && !/my business|nearby|businesses/i.test(orderedAvailability)) return orderedAvailability;
            return "";
          }
          function productNumberFromMeta(details, pattern, fallback) {
            const match = (details.meta || []).find((item) => pattern.test(item));
            const value = match ? readEngagementCount(match) : NaN;
            return Number.isFinite(value) ? value : fallback;
          }
          function productAvatarClass(businessKey, businessName) {
            const text = (businessKey + " " + businessName).toLowerCase();
            if (text.includes("angi") || text.includes("pizza")) return "pizza";
            if (text.includes("ever") || text.includes("glow")) return "shop";
            if (text.includes("ross")) return "feed";
            if (text.includes("business-111") || text.includes("111")) return "bottle";
            return "tech";
          }
          function detailReadJson(key, fallback) {
            try {
              const stored = localStorage.getItem(key);
              return stored ? JSON.parse(stored) : fallback;
            } catch (error) {
              return fallback;
            }
          }
          function detailReadStorage(key) {
            try { return localStorage.getItem(key) || ""; } catch (error) { return ""; }
          }
          function detailFirstClean(values) {
            for (const value of values || []) {
              const next = cleanText(value);
              if (next) return next;
            }
            return "";
          }
          function detailRowsFromStorageKey(key) {
            const value = detailReadJson(key, []);
            if (Array.isArray(value)) return value;
            if (value && typeof value === "object") return Object.values(value);
            return [];
          }
          function detailObject(value) {
            if (value && typeof value === "object" && !Array.isArray(value)) return value;
            if (typeof value !== "string") return {};
            const text = value.trim();
            if (!text || (text.charAt(0) !== "{" && text.charAt(0) !== "[")) return {};
            try {
              const parsed = JSON.parse(text);
              return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
            } catch (error) {
              return {};
            }
          }
          function detailSnapshotFromCard(card) {
            const data = card && card.dataset ? card.dataset : {};
            return detailObject(data.detailSnapshot || data.detailPayload || data.notificationPayload);
          }
          function detailFirstValue(source, keys) {
            const row = source && typeof source === "object" ? source : {};
            for (const key of keys || []) {
              const value = cleanText(row[key]);
              if (value) return value;
            }
            return "";
          }
          function detailMediaRefValue(src, ref) {
            const directRef = cleanText(ref);
            if (directRef && directRef.indexOf("emy-ref:") === 0) return directRef.slice("emy-ref:".length);
            if (directRef && directRef.indexOf("emy-video-ref:") === 0) return directRef.slice("emy-video-ref:".length);
            if (directRef) return directRef;
            const source = cleanText(src);
            if (source.indexOf("emy-ref:") === 0) return source.slice("emy-ref:".length);
            if (source.indexOf("emy-video-ref:") === 0) return source.slice("emy-video-ref:".length);
            if (source && !/^(data:image|data:video|blob:|https?:\/\/)/i.test(source)) return source;
            return "";
          }
          function detailDirectMediaValue(value) {
            const source = cleanText(value);
            return /^(data:image|data:video|blob:|https?:\/\/)/i.test(source) ? source : "";
          }
          function detailRecoveryStorageItems() {
            const keys = [
              "emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents",
              "emyBusinessPosts", "emyBusinessFeedPosts", "emyBusinessArticles", "emyBusinessArticlePosts",
              "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts",
              "emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips",
              "emyBusinessEvents", "emyBusinessEventPosts", "emyBusinessJobs", "emyBusinessJobPosts",
              "emyFeedReposts", "emySavedFeedItems"
            ];
            const rows = [];
            const push = (item, sourceKey, parent) => {
              if (!item || typeof item !== "object") return;
              try {
                if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(item)) return;
              } catch (error) {}
              const row = Object.assign({ _sourceKey: sourceKey || "", _parentItem: parent || null }, item);
              rows.push(row);
              const detail = item.detailSnapshot && typeof item.detailSnapshot === "object" ? item.detailSnapshot : null;
              if (detail) push(Object.assign({}, detail, {
                id: detail.id || detail.feedId || item.feedId || item.itemId || item.id,
                feedId: detail.feedId || detail.id || item.feedId || item.itemId || item.id,
                businessName: detail.businessName || detail.business || item.businessName || item.business,
                business: detail.business || detail.businessName || item.business || item.businessName
              }), sourceKey, item);
              const original = item.original && typeof item.original === "object" ? item.original : null;
              if (original) push(Object.assign({}, original, {
                id: original.id || original.feedId || item.originalId || item.originalFeedId || item.feedId || item.id,
                feedId: original.feedId || original.id || item.originalFeedId || item.feedId || item.id,
                itemTitle: original.itemTitle || original.title || item.itemTitle || item.title,
                businessName: original.businessName || original.business || item.businessName || item.business,
                business: original.business || original.businessName || item.business || item.businessName
              }), sourceKey, item);
            };
            keys.forEach((key) => {
              const value = detailReadJson(key, []);
              if (Array.isArray(value)) value.forEach((item) => push(item, key, null));
              else if (value && typeof value === "object") Object.values(value).forEach((item) => push(item, key, null));
            });
            return rows;
          }
          function detailRecoveryIdValues(card, details, snapshot) {
            const data = card && card.dataset ? card.dataset : {};
            const source = snapshot || {};
            const ids = [
              data.feedId, data.itemId, data.detailId, data.originalFeedId, data.repostOriginalId, data.productId, data.businessProductId, data.clipId, data.reelId,
              details && details.id, details && details.feedId, details && details.itemId, details && details.productId,
              source.id, source.feedId, source.itemId, source.postId, source.productId, source.originalId, source.originalFeedId
            ];
            return Array.from(new Set(ids.map(cleanText).filter(Boolean).map((id) => id.toLowerCase())));
          }
          function detailRecoveryTextKey(source) {
            const row = source && typeof source === "object" ? source : {};
            return detailSlug([
              row.itemTitle, row.productTitle, row.postTitle, row.title, row.name, row.caption, row.text, row.description
            ].map(cleanText).find(Boolean) || "");
          }
          function detailRecoveryBusinessKey(source) {
            const row = source && typeof source === "object" ? source : {};
            return detailSlug([row.businessKey, row.key, row.detailBusinessKey, row.businessName, row.business, row.storeName, row.sellerName, row.actor].map(cleanText).find(Boolean) || "");
          }
          function detailRecoveryUsableRow(row) {
            return !!(row && typeof row === "object" && Object.keys(row).some((key) => key !== "_sourceKey" && key !== "_parentItem"));
          }
          function detailRecoveryStoredMatch(card, details) {
            const snapshot = detailSnapshotFromCard(card);
            const wantedIds = detailRecoveryIdValues(card, details, snapshot);
            const wantedTitle = detailSlug([details && details.title, snapshot.itemTitle, snapshot.title, snapshot.productTitle].map(cleanText).find(Boolean) || "");
            const wantedBusiness = detailSlug([details && details.business, snapshot.businessName, snapshot.business, snapshot.businessKey, snapshot.key].map(cleanText).find(Boolean) || "");
            const rows = detailRecoveryStorageItems();
            const byId = rows.find((row) => {
              const ids = [
                row.id, row.feedId, row.itemId, row.postId, row.productId, row.clipId, row.reelId, row.originalId, row.originalFeedId
              ].map(cleanText).filter(Boolean).map((id) => id.toLowerCase());
              return ids.some((id) => wantedIds.some((wanted) => id === wanted || id.indexOf(wanted) >= 0 || wanted.indexOf(id) >= 0));
            });
            if (byId) return byId;
            return rows.find((row) => {
              const title = detailRecoveryTextKey(row);
              const business = detailRecoveryBusinessKey(row);
              if (wantedTitle && title && (title === wantedTitle || title.indexOf(wantedTitle) >= 0 || wantedTitle.indexOf(title) >= 0)) return true;
              return !!(wantedTitle && wantedBusiness && title && business && business === wantedBusiness && (title.indexOf(wantedTitle) >= 0 || wantedTitle.indexOf(title) >= 0));
            }) || {};
          }
          function detailRecoveryDirectPayloadMatch(payload, details) {
            const raw = payload && typeof payload === "object" ? payload : {};
            const ids = [
              raw.id, raw.feedId, raw.itemId, raw.postId, raw.productId, raw.clipId, raw.reelId, raw.originalId, raw.originalFeedId,
              details && details.id, details && details.feedId, details && details.itemId, details && details.postId, details && details.productId
            ].map(cleanText).filter(Boolean).map((id) => id.toLowerCase());
            const wantedIds = Array.from(new Set(ids));
            const wantedTitle = detailSlug([raw.itemTitle, raw.productTitle, raw.postTitle, raw.title, raw.detailTitle, details && details.title].map(cleanText).find(Boolean) || "");
            const wantedBusiness = detailSlug([raw.businessKey, raw.key, raw.detailBusinessKey, raw.businessName, raw.business, raw.detailBusiness, details && details.businessKey, details && details.business].map(cleanText).find(Boolean) || "");
            const keys = [
              "emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents",
              "emyBusinessPosts", "emyBusinessFeedPosts", "emyBusinessArticles", "emyBusinessArticlePosts",
              "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts",
              "emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips",
              "emyBusinessEvents", "emyBusinessEventPosts", "emyBusinessJobs", "emyBusinessJobPosts",
              "emyFeedReposts", "emySavedFeedItems"
            ];
            const rows = [];
            keys.forEach((key) => detailRowsFromStorageKey(key).forEach((item) => {
              if (!item || typeof item !== "object") return;
              rows.push(Object.assign({ _sourceKey: key }, item));
              if (item.detailSnapshot && typeof item.detailSnapshot === "object") rows.push(Object.assign({ _sourceKey: key, _parentItem: item }, item.detailSnapshot));
              if (item.original && typeof item.original === "object") rows.push(Object.assign({ _sourceKey: key, _parentItem: item }, item.original));
            }));
            const byId = rows.find((row) => {
              try {
                if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(row)) return false;
              } catch (error) {}
              const rowIds = [
                row.id, row.feedId, row.itemId, row.postId, row.productId, row.clipId, row.reelId, row.originalId, row.originalFeedId
              ].map(cleanText).filter(Boolean).map((id) => id.toLowerCase());
              return rowIds.some((id) => wantedIds.some((wanted) => id === wanted || id.indexOf(wanted) >= 0 || wanted.indexOf(id) >= 0));
            });
            if (byId) return byId;
            return rows.find((row) => {
              try {
                if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(row)) return false;
              } catch (error) {}
              const title = detailRecoveryTextKey(row);
              const business = detailRecoveryBusinessKey(row);
              if (wantedTitle && title && (title === wantedTitle || title.indexOf(wantedTitle) >= 0 || wantedTitle.indexOf(title) >= 0)) return true;
              return !!(wantedTitle && wantedBusiness && title && business && business === wantedBusiness && (title.indexOf(wantedTitle) >= 0 || wantedTitle.indexOf(title) >= 0));
            }) || {};
          }
          function detailRecoveryMediaItems(sources) {
            for (const source of sources || []) {
              if (!source || typeof source !== "object") continue;
              if (Array.isArray(source.mediaItems) && source.mediaItems.length) return source.mediaItems;
              const settings = source.mediaSettings && typeof source.mediaSettings === "object" ? source.mediaSettings : {};
              const item = {
                type: cleanText(source.mediaType || source.type || source.kind),
                src: cleanText(source.mediaSrc || source.detailMediaSrc || source.image || source.imageSrc || source.video || source.videoSrc || source.url || source.cover || source.coverSrc || settings.src),
                ref: cleanText(source.mediaRef || source.detailMediaRef || source.imageRef || source.videoRef || source.coverRef || settings.ref),
                posterSrc: cleanText(source.posterSrc || source.detailPosterSrc || source.thumbnailSrc || settings.posterSrc || settings.thumbnailSrc),
                posterRef: cleanText(source.posterRef || source.detailPosterRef || source.thumbnailRef || settings.posterRef || settings.thumbnailRef)
              };
              if (item.src || item.ref || item.posterSrc || item.posterRef) return [item];
            }
            return [];
          }
          function detailMergeRecoveredDetails(card, details) {
            const base = Object.assign({}, details || {});
            const snapshot = detailSnapshotFromCard(card);
            let match = detailRecoveryStoredMatch(card, base);
            if (!detailRecoveryUsableRow(match)) match = detailRecoveryDirectPayloadMatch(snapshot, base);
            const parent = match && match._parentItem && typeof match._parentItem === "object" ? match._parentItem : {};
            const original = match && match.original && typeof match.original === "object" ? match.original : {};
            const sources = [snapshot, match, original, parent].filter((item) => item && typeof item === "object");
            const genericDescription = !cleanText(base.description) || /^more details are available here\.?$/i.test(cleanText(base.description));
            const recoveredTitle = detailFirstValue(sources, ["itemTitle", "productTitle", "postTitle", "title", "name", "caption", "heading", "text"]);
            const recoveredBusiness = detailFirstValue(sources, ["businessName", "business", "detailBusiness", "storeName", "sellerName", "ownerName", "authorName", "actor"]);
            const recoveredDescription = detailFirstValue(sources, ["detailDescription", "description", "productDescription", "productInfo", "body", "text", "caption", "message", "details", "subtitle"]);
            const recoveredProductName = detailFirstValue(sources, ["productName", "productTitle", "detailProductName", "detailProductTitle", "itemTitle"]);
            const recoveredProductDescription = detailFirstValue(sources, ["productDescription", "productInfo", "detailProductDescription", "detailProductInfo"]);
            const recoveredProductCategory = detailFirstValue(sources, ["productCategory", "category", "detailProductCategory", "detailCategory"]);
            const recoveredProductAvailability = detailFirstValue(sources, ["productAvailability", "availability", "stockStatus", "detailProductAvailability", "detailAvailability"]);
            const recoveredAvatarSrc = detailFirstValue(sources, ["detailAvatarSrc", "itemAvatarSrc", "avatarSrc", "businessPhoto", "profilePhoto", "businessAvatar", "businessLogo", "logo", "authorPhoto", "actorPhoto", "ownerPhoto", "customerPhoto", "photo"]);
            const recoveredAvatarRef = detailFirstValue(sources, ["detailAvatarRef", "itemAvatarRef", "avatarRef", "businessPhotoRef", "profilePhotoRef", "businessAvatarRef", "businessLogoRef", "logoRef", "authorPhotoRef", "actorPhotoRef", "ownerPhotoRef", "customerPhotoRef", "photoRef"]);
            const recoveredMediaItems = detailRecoveryMediaItems(sources);
            const firstMedia = recoveredMediaItems[0] || {};
            base.id = cleanText(base.id || detailFirstValue(sources, ["id", "feedId", "itemId", "postId", "productId"]));
            base.feedId = cleanText(base.feedId || detailFirstValue(sources, ["feedId", "id", "itemId", "postId", "productId"]));
            base.title = cleanText(base.title && base.title !== "Details" ? base.title : recoveredTitle) || base.title || "Details";
            base.business = cleanText(base.business || recoveredBusiness);
            if (genericDescription && recoveredDescription) base.description = recoveredDescription;
            base.price = cleanText(base.price || detailFirstValue(sources, ["price", "productPrice", "priceText", "detailPrice"]));
            base.productName = cleanText(base.productName || base.productTitle || recoveredProductName || (cleanText(base.kind).toLowerCase().includes("product") ? base.title : ""));
            base.productTitle = cleanText(base.productTitle || base.productName);
            base.productDescription = cleanMultilineText(base.productDescription || base.productInfo || recoveredProductDescription || (cleanText(base.kind).toLowerCase().includes("product") ? base.description : ""));
            base.productInfo = cleanMultilineText(base.productInfo || base.productDescription);
            base.productCategory = cleanText(base.productCategory || base.category || recoveredProductCategory);
            base.category = cleanText(base.category || base.productCategory);
            base.productAvailability = cleanText(base.productAvailability || base.availability || base.stockStatus || recoveredProductAvailability);
            base.availability = cleanText(base.availability || base.productAvailability);
            base.stockStatus = cleanText(base.stockStatus || base.productAvailability);
            base.businessKey = cleanText(base.businessKey || detailFirstValue(sources, ["businessKey", "key", "detailBusinessKey", "ownerKey"]));
            base.avatarSrc = detailDirectMediaValue(base.avatarSrc) || detailDirectMediaValue(recoveredAvatarSrc);
            base.avatarRef = detailMediaRefValue(base.avatarSrc || recoveredAvatarSrc, base.avatarRef || recoveredAvatarRef);
            if ((!Array.isArray(base.mediaItems) || !base.mediaItems.length) && recoveredMediaItems.length) base.mediaItems = recoveredMediaItems;
            base.mediaSrc = detailDirectMediaValue(base.mediaSrc) || detailDirectMediaValue(detailFirstValue(sources, ["mediaSrc", "detailMediaSrc", "image", "imageSrc", "video", "videoSrc", "cover", "coverSrc"]) || firstMedia.src);
            base.mediaRef = detailMediaRefValue(base.mediaSrc || detailFirstValue(sources, ["mediaSrc", "detailMediaSrc", "image", "imageSrc", "video", "videoSrc", "cover", "coverSrc"]) || firstMedia.src, base.mediaRef || detailFirstValue(sources, ["mediaRef", "detailMediaRef", "imageRef", "videoRef", "coverRef"]) || firstMedia.ref);
            base.mediaType = cleanText(base.mediaType || detailFirstValue(sources, ["mediaType", "detailMediaType", "type"]) || firstMedia.type);
            base.posterSrc = detailDirectMediaValue(base.posterSrc) || detailDirectMediaValue(detailFirstValue(sources, ["posterSrc", "detailPosterSrc", "thumbnailSrc"]) || firstMedia.posterSrc);
            base.posterRef = detailMediaRefValue(base.posterSrc || detailFirstValue(sources, ["posterSrc", "detailPosterSrc", "thumbnailSrc"]) || firstMedia.posterSrc, base.posterRef || detailFirstValue(sources, ["posterRef", "detailPosterRef", "thumbnailRef"]) || firstMedia.posterRef);
            if (card && card.dataset) {
              if (base.feedId && !card.dataset.feedId) card.dataset.feedId = base.feedId;
              if (base.businessKey && !card.dataset.businessKey) card.dataset.businessKey = base.businessKey;
              if (base.avatarSrc && !card.dataset.detailAvatarSrc) card.dataset.detailAvatarSrc = base.avatarSrc;
              if (base.avatarRef && !card.dataset.detailAvatarRef) card.dataset.detailAvatarRef = base.avatarRef;
              if (base.business && !card.dataset.detailBusiness) card.dataset.detailBusiness = base.business;
              if (base.description && !card.dataset.detailDescription) card.dataset.detailDescription = base.description;
              if (base.productName && !card.dataset.productName) card.dataset.productName = base.productName;
              if (base.productDescription && !card.dataset.productDescription) card.dataset.productDescription = base.productDescription;
              if (base.productCategory && !card.dataset.productCategory) card.dataset.productCategory = base.productCategory;
              if (base.productAvailability && !card.dataset.productAvailability) card.dataset.productAvailability = base.productAvailability;
            }
            return base;
          }
          function detailRecoverPendingPayload(payload) {
            const raw = payload && typeof payload === "object" ? payload : {};
            const probe = {
              dataset: {
                feedId: cleanText(raw.feedId || raw.id || raw.itemId || raw.postId || raw.productId),
                itemId: cleanText(raw.itemId || raw.id),
                productId: cleanText(raw.productId),
                detailTitle: cleanText(raw.title || raw.detailTitle || raw.itemTitle || raw.productTitle),
                detailBusiness: cleanText(raw.business || raw.detailBusiness || raw.businessName),
                businessKey: cleanText(raw.businessKey || raw.key)
              }
            };
            const base = {
              id: cleanText(raw.id || raw.feedId || raw.itemId || raw.postId || raw.productId),
              feedId: cleanText(raw.feedId || raw.id || raw.itemId || raw.postId || raw.productId),
              title: cleanText(raw.title || raw.detailTitle || raw.itemTitle || raw.productTitle),
              business: cleanText(raw.business || raw.detailBusiness || raw.businessName),
              businessKey: cleanText(raw.businessKey || raw.key),
              description: cleanText(raw.description || raw.detailDescription || raw.productDescription),
              avatarSrc: cleanText(raw.avatarSrc || raw.detailAvatarSrc || raw.businessPhoto || raw.profilePhoto),
              avatarRef: cleanText(raw.avatarRef || raw.detailAvatarRef || raw.businessPhotoRef || raw.profilePhotoRef),
              mediaSrc: cleanText(raw.mediaSrc || raw.detailMediaSrc),
              mediaRef: cleanText(raw.mediaRef || raw.detailMediaRef),
              mediaType: cleanText(raw.mediaType || raw.detailMediaType),
              posterSrc: cleanText(raw.posterSrc || raw.detailPosterSrc),
              posterRef: cleanText(raw.posterRef || raw.detailPosterRef),
              mediaItems: Array.isArray(raw.mediaItems) ? raw.mediaItems : []
            };
            let match = detailRecoveryStoredMatch(probe, base);
            if (!detailRecoveryUsableRow(match)) match = detailRecoveryDirectPayloadMatch(raw, base);
            const parent = match && match._parentItem && typeof match._parentItem === "object" ? match._parentItem : {};
            const original = match && match.original && typeof match.original === "object" ? match.original : {};
            const sources = [match, original, parent].filter((item) => item && typeof item === "object");
            const firstMedia = detailRecoveryMediaItems(sources)[0] || {};
            const next = Object.assign({}, raw);
            const recoveredTitle = detailFirstValue(sources, ["itemTitle", "productTitle", "postTitle", "title", "name", "caption", "heading", "text"]);
            const recoveredBusiness = detailFirstValue(sources, ["businessName", "business", "detailBusiness", "storeName", "sellerName", "ownerName", "authorName", "actor"]);
            const recoveredDescription = detailFirstValue(sources, ["detailDescription", "description", "productDescription", "productInfo", "body", "text", "caption", "message", "details", "subtitle"]);
            const recoveredAvatarSrc = detailFirstValue(sources, ["detailAvatarSrc", "itemAvatarSrc", "avatarSrc", "businessPhoto", "profilePhoto", "businessAvatar", "businessLogo", "logo", "authorPhoto", "actorPhoto", "ownerPhoto", "customerPhoto", "photo"]);
            const recoveredAvatarRef = detailFirstValue(sources, ["detailAvatarRef", "itemAvatarRef", "avatarRef", "businessPhotoRef", "profilePhotoRef", "businessAvatarRef", "businessLogoRef", "logoRef", "authorPhotoRef", "actorPhotoRef", "ownerPhotoRef", "customerPhotoRef", "photoRef"]);
            if (!cleanText(next.title || next.detailTitle || next.itemTitle) && recoveredTitle) next.title = recoveredTitle;
            if (!cleanText(next.business || next.detailBusiness || next.businessName) && recoveredBusiness) next.business = recoveredBusiness;
            if ((!cleanText(next.description || next.detailDescription || next.productDescription) || /^more details are available here\.?$/i.test(cleanText(next.description || next.detailDescription || next.productDescription))) && recoveredDescription) next.description = recoveredDescription;
            if (!cleanText(next.avatarSrc || next.detailAvatarSrc || next.businessPhoto || next.profilePhoto) && recoveredAvatarSrc) {
              next.avatarSrc = recoveredAvatarSrc;
              next.detailAvatarSrc = recoveredAvatarSrc;
              next.businessPhoto = recoveredAvatarSrc;
              next.profilePhoto = recoveredAvatarSrc;
            }
            if (!cleanText(next.avatarRef || next.detailAvatarRef || next.businessPhotoRef || next.profilePhotoRef) && recoveredAvatarRef) {
              next.avatarRef = recoveredAvatarRef;
              next.detailAvatarRef = recoveredAvatarRef;
              next.businessPhotoRef = recoveredAvatarRef;
              next.profilePhotoRef = recoveredAvatarRef;
            }
            if (!cleanText(next.mediaSrc || next.detailMediaSrc) && (firstMedia.src || firstMedia.mediaSrc)) next.mediaSrc = firstMedia.src || firstMedia.mediaSrc;
            if (!cleanText(next.mediaRef || next.detailMediaRef) && (firstMedia.ref || firstMedia.mediaRef)) next.mediaRef = firstMedia.ref || firstMedia.mediaRef;
            if (!cleanText(next.posterSrc || next.detailPosterSrc) && (firstMedia.posterSrc || firstMedia.thumbnailSrc)) next.posterSrc = firstMedia.posterSrc || firstMedia.thumbnailSrc;
            if (!cleanText(next.posterRef || next.detailPosterRef) && (firstMedia.posterRef || firstMedia.thumbnailRef)) next.posterRef = firstMedia.posterRef || firstMedia.thumbnailRef;
            if (!Array.isArray(next.mediaItems) || !next.mediaItems.length) {
              const mediaItems = detailRecoveryMediaItems(sources);
              if (mediaItems.length) next.mediaItems = mediaItems;
            }
            return next;
          }
          function detailBusinessImageFromObject(item) {
            const row = item && typeof item === "object" ? item : {};
            const profile = row.profile && typeof row.profile === "object" ? row.profile : {};
            const src = detailFirstClean([
              row.detailAvatarSrc, row.itemAvatarSrc, row.avatarSrc, row.avatar, row.profilePhotoUrl, row.profilePhoto, row.profilePhotoSrc, row.businessProfilePhotoUrl, row.businessProfilePhoto, row.businessProfilePhotoSrc, row.businessPhotoUrl, row.businessPhoto, row.businessPhotoSrc, row.businessAvatarUrl, row.businessAvatar, row.businessAvatarSrc, row.businessLogoUrl, row.businessLogo, row.businessLogoSrc, row.logoUrl, row.logo, row.logoSrc, row.imageUrl, row.image, row.imageSrc, row.authorPhoto, row.actorPhoto, row.ownerPhoto, row.customerPhoto, row.photoUrl, row.photo,
              profile.avatarSrc, profile.avatar, profile.profilePhotoUrl, profile.profilePhoto, profile.profilePhotoSrc, profile.businessProfilePhotoUrl, profile.businessProfilePhoto, profile.businessProfilePhotoSrc, profile.businessPhotoUrl, profile.businessPhoto, profile.businessPhotoSrc, profile.businessAvatarUrl, profile.businessAvatar, profile.businessAvatarSrc, profile.businessLogoUrl, profile.businessLogo, profile.businessLogoSrc, profile.logoUrl, profile.logo, profile.logoSrc, profile.imageUrl, profile.image, profile.imageSrc, profile.photoUrl, profile.photo, profile.photoSrc
            ]);
            const ref = detailFirstClean([
              row.detailAvatarRef, row.itemAvatarRef, row.avatarRef, row.profilePhotoPublicId, row.profilePhotoRef, row.businessProfilePhotoPublicId, row.businessProfilePhotoRef, row.businessPhotoPublicId, row.businessPhotoRef, row.businessAvatarPublicId, row.businessAvatarRef, row.businessLogoPublicId, row.businessLogoRef, row.logoPublicId, row.logoRef, row.imagePublicId, row.imageRef, row.authorPhotoRef, row.actorPhotoRef, row.ownerPhotoRef, row.customerPhotoRef, row.photoPublicId, row.photoRef,
              profile.avatarRef, profile.profilePhotoPublicId, profile.profilePhotoRef, profile.businessProfilePhotoPublicId, profile.businessProfilePhotoRef, profile.businessPhotoPublicId, profile.businessPhotoRef, profile.businessAvatarPublicId, profile.businessAvatarRef, profile.businessLogoPublicId, profile.businessLogoRef, profile.logoPublicId, profile.logoRef, profile.imagePublicId, profile.imageRef, profile.photoPublicId, profile.photoRef
            ]);
            return { profilePhoto: src, profilePhotoRef: ref };
          }
          function detailBusinessRowMatches(row, key, name) {
            if (!row || typeof row !== "object") return false;
            const wanted = [key, name].map(detailSlug).filter(Boolean);
            if (!wanted.length) return false;
            const profile = row.profile && typeof row.profile === "object" ? row.profile : {};
            const candidates = [
              row.businessKey, row.key, row.profileKey, row.ownerKey, row.businessName, row.business, row.storeName, row.sellerName,
              row.displayName, row.name, row.title, profile.businessKey, profile.key, profile.businessName, profile.name
            ].map(detailSlug).filter(Boolean);
            return candidates.some((candidate) => wanted.some((target) => candidate === target || candidate.indexOf(target) >= 0 || target.indexOf(candidate) >= 0));
          }
          function detailNumberValue(value) {
            const number = Number(value);
            return Number.isFinite(number) ? number : null;
          }
          function detailNormaliseSchedule(value) {
            let schedule = value;
            if (typeof schedule === "string") {
              try { schedule = JSON.parse(schedule); } catch (error) { schedule = null; }
            }
            return schedule && typeof schedule === "object" && !Array.isArray(schedule) ? schedule : null;
          }
          function detailBusinessScheduleFromRecord(record) {
            const row = record && typeof record === "object" ? record : {};
            const profile = row.profile && typeof row.profile === "object" ? row.profile : {};
            return detailNormaliseSchedule(row.workingDaysSchedule || row.businessWorkingDaysSchedule || row.openingSchedule || profile.workingDaysSchedule || profile.businessWorkingDaysSchedule);
          }
          function detailFormatClock(value) {
            const match = String(value || "").trim().match(/^(\d{1,2}):(\d{2})$/);
            if (!match) return cleanText(value);
            const date = new Date(2000, 0, 1, Number(match[1]), Number(match[2]));
            return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
          }
          function detailTimeMinutes(value) {
            const match = String(value || "").trim().match(/^(\d{1,2}):(\d{2})$/);
            if (!match) return null;
            const hours = Number(match[1]);
            const minutes = Number(match[2]);
            if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
            return hours * 60 + minutes;
          }
          function detailNextScheduleDay(days, today) {
            const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const current = names.indexOf(today);
            if (current < 0 || !Array.isArray(days) || !days.length) return "";
            for (let offset = 1; offset <= 7; offset += 1) {
              const name = names[(current + offset) % 7];
              if (days.includes(name)) return offset === 1 ? "tomorrow" : name;
            }
            return "";
          }
          function detailOpenClosedOnly(value, fallback) {
            const text = cleanText(value);
            if (/\b(closed|offline|unavailable)\b/i.test(text)) return "Closed now";
            if (/\b(open now|open|online|available|active|live)\b/i.test(text)) return "Open now";
            return fallback || "";
          }
          function detailBusinessOpenLabel(profile) {
            const record = profile && typeof profile === "object" ? profile : {};
            const schedule = detailBusinessScheduleFromRecord(record);
            const days = schedule && Array.isArray(schedule.days) ? schedule.days : [];
            const start = detailTimeMinutes(schedule && schedule.startTime);
            const end = detailTimeMinutes(schedule && schedule.endTime);
            if (days.length && start !== null && end !== null) {
              const now = new Date();
              const today = now.toLocaleDateString("en-GB", { weekday: "long" });
              const current = now.getHours() * 60 + now.getMinutes();
              const opensToday = days.includes(today);
              if (!opensToday) return "Closed now";
              const overnight = end <= start;
              const isOpen = overnight ? current >= start || current <= end : current >= start && current <= end;
              return isOpen ? "Open now" : "Closed now";
            }
            const status = detailFirstClean([record.openStatus, record.statusText, record.status, record.businessStatus]);
            const statusText = detailOpenClosedOnly(status, "");
            if (statusText) return statusText;
            if (/\b(open|closed)\b/i.test(status) && /\b(closes?|opens?)\b/i.test(status)) return status.replace(/\s*[·•]\s*/g, " - ");
            const hours = detailFirstClean([record.hours, record.workingDays, record.businessHours, record.openingHours, record.availability]);
            const hoursText = detailOpenClosedOnly(hours, "");
            if (hoursText) return hoursText;
            if (hours) return "Hours: " + hours.replace(/\s*[·•]\s*/g, " - ");
            return "Opening hours not set for this business";
          }
          function detailBusinessLocationText(profile) {
            const record = profile && typeof profile === "object" ? profile : {};
            const joined = [
              record.businessAddressLine1, record.addressLine1, record.businessLocation, record.location, record.area, record.city, record.businessPostcode, record.postcode
            ].map(cleanText).filter(Boolean);
            const direct = detailFirstClean([record.address, record.businessAddress, record.locationLabel, record.businessLocationLabel]);
            const location = direct || joined.filter((value, index, list) => list.findIndex((item) => item.toLowerCase() === value.toLowerCase()) === index).join(", ");
            return location || "Business location not set";
          }
          function detailLocationLooksSaved(value) {
            const text = cleanText(value);
            if (!text) return false;
            const lower = text.toLowerCase();
            if (/^(near me|nearby|location to confirm|to confirm|business location not set|location saved on business profile|no business location saved yet|not saved yet|hours not set)$/i.test(text)) return false;
            if (/^0(?:\.0+)?\s*,\s*0(?:\.0+)?$/.test(lower)) return false;
            return true;
          }
          function detailBusinessSavedLocationText(profile) {
            const location = detailBusinessLocationText(profile);
            return detailLocationLooksSaved(location) ? location : "";
          }
          function detailValidGeoPoint(point) {
            if (!point) return false;
            const latitude = Number(point.latitude);
            const longitude = Number(point.longitude);
            if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return false;
            if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) return false;
            return !(Math.abs(latitude) < 0.000001 && Math.abs(longitude) < 0.000001);
          }
          function detailBusinessPoint(profile) {
            const record = profile && typeof profile === "object" ? profile : {};
            const latitude = detailNumberValue(record.latitude || record.lat || record.businessLatitude || record.locationLatitude);
            const longitude = detailNumberValue(record.longitude || record.lng || record.lon || record.businessLongitude || record.locationLongitude);
            return latitude !== null && longitude !== null ? { latitude, longitude } : null;
          }
          function detailCurrentLocationPoint() {
            let latitude = null;
            let longitude = null;
            let label = "";
            try {
              if (typeof selectedLatitude !== "undefined" && typeof selectedLongitude !== "undefined") {
                latitude = detailNumberValue(selectedLatitude);
                longitude = detailNumberValue(selectedLongitude);
              }
              if (typeof selectedLocation !== "undefined") label = cleanText(selectedLocation);
            } catch (error) {}
            const storedKeys = ["emyAskLocation", "emyCustomerAskLocation", "emyBusinessAskLocation"];
            for (const key of storedKeys) {
              if (latitude !== null && longitude !== null) break;
              const stored = detailReadJson(key, null);
              if (!stored || typeof stored !== "object") continue;
              latitude = detailNumberValue(stored.latitude);
              longitude = detailNumberValue(stored.longitude);
              label = label || cleanText(stored.location || stored.address || stored.label);
            }
            const point = latitude !== null && longitude !== null ? { latitude, longitude, label: label || "your saved location" } : null;
            return detailValidGeoPoint(point) ? point : null;
          }
          function detailMilesBetween(lat1, lon1, lat2, lon2) {
            const radiusMiles = 3958.8;
            const toRadians = (value) => value * Math.PI / 180;
            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            return radiusMiles * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
          }
          function detailFormatMiles(value) {
            return value < 10 ? value.toFixed(1) + " mi" : Math.round(value) + " mi";
          }
          function detailBusinessDistanceText(profile) {
            const businessPoint = detailBusinessPoint(profile);
            const currentPoint = detailCurrentLocationPoint();
            if (detailValidGeoPoint(businessPoint) && detailValidGeoPoint(currentPoint)) {
              const miles = detailMilesBetween(currentPoint.latitude, currentPoint.longitude, businessPoint.latitude, businessPoint.longitude);
              return detailFormatMiles(miles) + " from " + currentPoint.label;
            }
            return "";
          }
          function detailNormaliseBusinessProfileRecord(row, fallbackKey, fallbackName) {
            const source = row && typeof row === "object" ? row : {};
            const profile = source.profile && typeof source.profile === "object" ? source.profile : {};
            const schedule = detailBusinessScheduleFromRecord(source);
            return {
              key: detailFirstClean([source.businessKey, source.key, source.profileKey, profile.businessKey, profile.key, fallbackKey]),
              name: detailFirstClean([source.businessName, source.business, source.storeName, source.sellerName, source.displayName, source.name, source.title, profile.businessName, profile.name, fallbackName]),
              address: detailFirstClean([source.address, source.businessAddress, profile.address, profile.businessAddress]),
              businessAddressLine1: detailFirstClean([source.businessAddressLine1, source.addressLine1, profile.businessAddressLine1, profile.addressLine1]),
              businessLocation: detailFirstClean([source.businessLocation, source.location, source.area, source.city, profile.businessLocation, profile.location, profile.area, profile.city]),
              businessPostcode: detailFirstClean([source.businessPostcode, source.postcode, profile.businessPostcode, profile.postcode]),
              latitude: detailFirstClean([source.latitude, source.lat, source.businessLatitude, source.locationLatitude, profile.latitude, profile.lat, profile.businessLatitude, profile.locationLatitude]),
              longitude: detailFirstClean([source.longitude, source.lng, source.lon, source.businessLongitude, source.locationLongitude, profile.longitude, profile.lng, profile.lon, profile.businessLongitude, profile.locationLongitude]),
              workingDaysSchedule: schedule,
              workingDays: detailFirstClean([source.workingDays, source.hours, source.businessHours, source.openingHours, profile.workingDays, profile.hours, profile.businessHours, profile.openingHours]),
              status: detailFirstClean([source.statusText, source.openStatus, source.status, source.reviewStatus, profile.statusText, profile.openStatus, profile.status, profile.reviewStatus])
            };
          }
          function detailCurrentBusinessProfileRecord(key, name) {
            const stored = detailReadJson("emyBusinessProfileDraft", {});
            const profile = stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
            const schedule = profile.workingDaysSchedule || detailReadJson("emyBusinessWorkingDaysSchedule", {});
            return detailNormaliseBusinessProfileRecord(Object.assign({}, profile, {
              key: key || profile.businessKey || profile.key || "profile",
              businessKey: key || profile.businessKey || profile.key || "profile",
              businessName: profile.businessName || profile.name || detailReadStorage("emyBusinessDisplayName") || detailReadStorage("emyBusinessName") || name,
              workingDaysSchedule: schedule,
              workingDays: profile.workingDays || detailReadStorage("emyBusinessWorkingDays"),
              latitude: profile.businessLatitude || profile.latitude,
              longitude: profile.businessLongitude || profile.longitude
            }), key, name);
          }
          function detailBusinessProfileForKey(key, name) {
            if (key === "profile" || detailIsCurrentBusinessIdentity(key) || detailIsCurrentBusinessIdentity(name)) {
              return detailCurrentBusinessProfileRecord(key, name);
            }
            const storageKeys = [
              "emyCustomerBusinesses", "emySavedBusinesses", "emyNearbyBusinesses", "emyLocalBusinesses", "emyBusinessDirectory", "emyBusinesses", "emyBusinessProfiles",
              "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyBusinessPosts", "emyBusinessFeedPosts", "emyBusinessReels", "emyBusinessClips", "emyBusinessProductReels"
            ];
            for (const storageKey of storageKeys) {
              const rows = detailRowsFromStorageKey(storageKey);
              for (const row of rows) {
                if (detailBusinessRowMatches(row, key, name)) return detailNormaliseBusinessProfileRecord(row, key, name);
              }
            }
            return null;
          }
          function detailBusinessRelationshipText(key, name) {
            if (key === "profile" || detailIsCurrentBusinessIdentity(key) || detailIsCurrentBusinessIdentity(name)) return "Your business profile";
            try {
              const cleanKey = normaliseCustomerBusinessKey(key || name);
              const saved = localStorage.getItem("emyCustomerBusiness:" + cleanKey) === "1";
              const rows = JSON.parse(localStorage.getItem("emyCustomerBusinesses") || "{}");
              if (saved || (rows && typeof rows === "object" && rows[cleanKey])) return "Saved in My Businesses";
            } catch (error) {}
            return "Business profile";
          }
          function detailProductAvailabilityText(productAvailability, openLabel) {
            const productText = cleanText(productAvailability);
            const hoursText = cleanText(openLabel) || "Opening hours not set for this business";
            if (productText) return productText.replace(/\s*[Â·â€¢]\s*/g, " - ");
            return detailOpenClosedOnly(hoursText, "") || hoursText;
          }
          function detailBusinessImageFromStorage(key, name) {
            if (detailIsCurrentBusinessIdentity(key) || detailIsCurrentBusinessIdentity(name)) {
              return { profilePhoto: currentBusinessProfilePhoto(), profilePhotoRef: currentBusinessProfilePhotoRef() };
            }
            const storageKeys = [
              "emyCustomerBusinesses", "emySavedBusinesses", "emyNearbyBusinesses", "emyLocalBusinesses", "emyBusinessDirectory", "emyBusinesses", "emyBusinessProfiles",
              "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyBusinessPosts", "emyBusinessFeedPosts", "emyBusinessReels", "emyBusinessClips", "emyBusinessProductReels"
            ];
            for (const storageKey of storageKeys) {
              const rows = detailRowsFromStorageKey(storageKey);
              for (const row of rows) {
                if (!detailBusinessRowMatches(row, key, name)) continue;
                const image = detailBusinessImageFromObject(row);
                if (image.profilePhoto || image.profilePhotoRef) return image;
              }
            }
            return { profilePhoto: "", profilePhotoRef: "" };
          }
          function detailBusinessImageFromCard(card, details, key, name) {
            const data = card && card.dataset ? card.dataset : {};
            const direct = detailBusinessImageFromObject(Object.assign({}, details || {}, data || {}));
            if (direct.profilePhoto || direct.profilePhotoRef) return direct;
            const imageNode = card && card.querySelector && card.querySelector(".business-avatar img,.feed-avatar img,.reel-avatar img,.post-avatar img,.social-feed-avatar img,.my-business-avatar img,.nearby-business-media img,.business-top-avatar img,[data-business-link] img,[data-detail-avatar] img");
            if (imageNode) {
              const image = {
                profilePhoto: cleanText(imageNode.getAttribute("src")),
                profilePhotoRef: cleanText(imageNode.getAttribute("data-emy-media-ref"))
              };
              if (image.profilePhoto || image.profilePhotoRef) return image;
            }
            return detailBusinessImageFromStorage(key, name);
          }
          function firstPreviewItems(preview, type, count) {
            const items = preview && Array.isArray(preview[type]) ? preview[type] : [];
            return items.slice(0, count || 2);
          }
          function previewItemTotal(preview, type, fallbackItems) {
            const items = preview && Array.isArray(preview[type]) ? preview[type] : [];
            return items.length || (Array.isArray(fallbackItems) ? fallbackItems.length : 0);
          }
          function fallbackBusinessPreview(key) {
            return { products: [], posts: [], reels: [] };
          }
          function detailBusinessPreviewHasContent(preview) {
            return !!(preview && ["products", "posts", "reels"].some((type) => Array.isArray(preview[type]) && preview[type].length));
          }
          function detailMergeBusinessPreview(primary, fallback) {
            const source = primary || {};
            const backup = fallback || {};
            return {
              products: Array.isArray(source.products) && source.products.length ? source.products : (Array.isArray(backup.products) ? backup.products : []),
              posts: Array.isArray(source.posts) && source.posts.length ? source.posts : (Array.isArray(backup.posts) ? backup.posts : []),
              reels: Array.isArray(source.reels) && source.reels.length ? source.reels : (Array.isArray(backup.reels) ? backup.reels : [])
            };
          }
          function detailPreviewItemIsLive(item) {
            if (!item || typeof item !== "object") return false;
            if (item.hidden === true || item.deleted === true || item.deletedAt || item.isPublished === false || item.isLive === false || item.isPaused === true || item.paused === true) return false;
            const status = cleanText(item.publishStatus || item.liveStatus || item.visibility || item.status || item.productStatus || item.reviewStatus || "active").toLowerCase();
            return !["paused", "pause", "unpublished", "hidden", "draft", "inactive", "offline", "deleted", "archived", "rejected"].includes(status);
          }
          function detailPreviewItemLooksClip(item, sourceKey) {
            const source = cleanText(sourceKey).toLowerCase();
            if (/business(?:clips|reels)|productreels/.test(source)) return true;
            const marker = [
              source,
              item && item.detailKind,
              item && item.kind,
              item && item.type,
              item && item.tag,
              item && item.category,
              item && item.postMode,
              item && item.createType,
              item && item.clipKind,
              item && item.reelKind,
              item && item.clipType,
              item && item.reelType,
              item && item.mediaType
            ].map(cleanText).join(" ").toLowerCase();
            const explicitClip = /clip|reel|short video/.test(marker);
            if (/businessproducts|businessproductlist/.test(source) && !explicitClip) return false;
            return explicitClip || /video/.test(marker) || !!(item && (item.video || item.videoRef));
          }
          function detailPreviewRowMatchesCurrentBusiness(item, sourceKey) {
            const source = cleanText(sourceKey);
            if (source.indexOf("emyBusiness") === 0) return true;
            const sourceText = cleanText(sourceKey || item && (item.source || item.createdFrom || item.origin)).toLowerCase();
            const owner = cleanText([
              item && item.owner,
              item && item.createdAs,
              item && item.accountType,
              item && item.role,
              item && item.authorRole,
              item && item.actorType,
              item && item.repostActorType
            ].filter(Boolean).join(" ")).toLowerCase();
            const key = detailSlug(item && (item.businessKey || item.key || item.profileKey || item.detailBusinessKey || ""));
            const href = cleanText(item && (item.profileHref || item.href)).toLowerCase();
            const id = cleanText(item && (item.id || item.postId || item.feedId)).toLowerCase();
            const explicitBusinessContext = sourceText.indexOf("business") !== -1 ||
              /(^|[^a-z])(?:business|merchant|seller|company)([^a-z]|$)/.test(owner + " " + sourceText) ||
              key === "profile" ||
              key === "business-profile" ||
              id.indexOf("business-") === 0 ||
              href.indexOf("emy-business-profile") !== -1;
            if (sourceText.indexOf("customer") !== -1 ||
              /(^|[^a-z])(?:customer|buyer|personal|user)([^a-z]|$)/.test(owner) ||
              key === "customer-profile" ||
              href.indexOf("emy-customer-profile") !== -1 ||
              id.indexOf("customer-") === 0 ||
              (id.indexOf("user-feed-") === 0 && !explicitBusinessContext) ||
              (id.indexOf("feed-create-") === 0 && !explicitBusinessContext) ||
              (item && item.isUserPost === true && !explicitBusinessContext) ||
              (item && item.my === true && !explicitBusinessContext)) return false;
            const hasBusinessSignal = sourceText.indexOf("business") !== -1 ||
              /(^|[^a-z])(?:business|merchant|seller|company)([^a-z]|$)/.test(owner) ||
              key === "profile" ||
              key === "business-profile" ||
              id.indexOf("business-") === 0 ||
              href.indexOf("emy-business-profile") !== -1;
            if (!hasBusinessSignal) return false;
            const candidates = [
              item && item.businessKey,
              item && item.key,
              item && item.detailBusinessKey,
              item && item.ownerBusinessKey,
              item && item.businessName,
              item && item.business,
              item && item.actor,
              item && item.ownerName,
              item && item.authorName,
              item && item.name
            ];
            return owner === "business" || candidates.some((value) => detailIsCurrentBusinessIdentity(value));
          }
          function detailPreviewItemFromRow(item, type, sourceKey) {
            if (!item || typeof item !== "object" || !detailPreviewItemIsLive(item)) return null;
            if (!detailPreviewRowMatchesCurrentBusiness(item, sourceKey)) return null;
            const isClip = detailPreviewItemLooksClip(item, sourceKey);
            if (type === "products" && isClip) return null;
            if (type === "posts" && isClip) return null;
            if (type === "reels" && !isClip) return null;
            const title = cleanText(item.title || item.name || item.productName || item.productTitle || item.clipTitle || item.caption || item.heading || item.jobTitle || item.eventName);
            if (!title) return null;
            return {
              id: cleanText(item.id || item.productId || item.postId || item.clipId || item.reelId),
              title,
              description: cleanText(item.description || item.details || item.body || item.caption || item.subtitle || item.text || item.productInfo || item.productDescription),
              publishedAt: cleanText(item.publishedAt || item.createdAt || item.updatedAt || item.date || item.liveAt || item.postedAt)
            };
          }
          function detailPreviewRowsFromStorage(keys, type) {
            const rows = [];
            keys.forEach((storageKey) => {
              detailRowsFromStorageKey(storageKey).forEach((item) => {
                const row = detailPreviewItemFromRow(item, type, storageKey);
                if (row) rows.push(row);
              });
            });
            const seen = new Set();
            return rows.filter((item) => {
              const key = detailSlug([item.id, item.title, item.description].filter(Boolean).join("|"));
              if (!key) return true;
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            }).sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
          }
          function detailCurrentBusinessPreviewContent() {
            return {
              products: detailPreviewRowsFromStorage(["emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts"], "products"),
              posts: detailPreviewRowsFromStorage(["emyBusinessPosts", "emyBusinessFeedPosts", "emyFeedCreatedPosts"], "posts"),
              reels: detailPreviewRowsFromStorage(["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips", "emyBusinessProductPosts", "emyFeedCreatedPosts"], "reels")
            };
          }
          function savedProfileBusinessMatches(card, details, key) {
            if (key === "profile" || detailIsCurrentBusinessIdentity(key)) return true;
            const data = card && card.dataset ? card.dataset : {};
            return [
              details && details.business,
              details && details.title,
              data.detailBusiness,
              data.businessName,
              data.business,
              card && card.querySelector && getText(card, ".business-title-link, h3")
            ].some((value) => detailIsCurrentBusinessIdentity(value));
          }
          function detailBusinessPreviewMatchesSavedContent(card, details, key) {
            if (savedProfileBusinessMatches(card, details, key)) return true;
            try {
              if (typeof businessPreviewCardMatchesSavedBusiness === "function" && businessPreviewCardMatchesSavedBusiness(card, key)) return true;
            } catch (error) {}
            try {
              if (typeof savedBusinessPreviewIdentitySet === "function") {
                const identities = savedBusinessPreviewIdentitySet();
                const data = card && card.dataset ? card.dataset : {};
                const title = card && card.querySelector ? getText(card, ".business-title-link, h3") : "";
                return [key, details && details.business, details && details.title, data.businessKey, data.detailBusinessKey, data.detailBusiness, data.businessName, data.business, title].some((value) => {
                  const clean = cleanText(value).toLowerCase();
                  const slug = detailSlug(value);
                  return (clean && identities.has(clean)) || (slug && identities.has(slug));
                });
              }
            } catch (error) {}
            return false;
          }
          function detailBusinessPreview(card, key, details) {
            const matchesSaved = detailBusinessPreviewMatchesSavedContent(card, details, key);
            const livePreview = matchesSaved ? detailCurrentBusinessPreviewContent() : fallbackBusinessPreview(key);
            if (matchesSaved && typeof readSavedBusinessPreviewContent === "function") {
              try {
                const savedPreview = readSavedBusinessPreviewContent();
                const mergedPreview = detailMergeBusinessPreview(savedPreview, livePreview);
                if (detailBusinessPreviewHasContent(mergedPreview)) return mergedPreview;
              } catch (error) {}
            }
            if (typeof businessPreviewForCard === "function" && card) {
              try {
                const cardPreview = businessPreviewForCard(card);
                const mergedPreview = matchesSaved ? detailMergeBusinessPreview(cardPreview, livePreview) : cardPreview;
                if (detailBusinessPreviewHasContent(mergedPreview) || !matchesSaved) return mergedPreview;
              } catch (error) {}
            }
            if (matchesSaved && detailBusinessPreviewHasContent(livePreview)) return livePreview;
            return fallbackBusinessPreview(key);
          }
          function savedProfileBusinessDetails(card, details, key) {
            if (!savedProfileBusinessMatches(card, details, key)) return null;
            const stored = detailReadJson("emyBusinessProfileDraft", null);
            const profile = stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
            const profileImage = detailBusinessImageFromObject(profile);
            const profilePhoto = currentBusinessProfilePhoto() || profileImage.profilePhoto;
            const profilePhotoRef = currentBusinessProfilePhotoRef() || profileImage.profilePhotoRef;
            const cover = detailReadJson("emyBusinessHeroCoverMedia", null);
            const gallery = detailReadJson("emyBusinessMediaLibrary", detailReadJson("emyBusinessCoverMedia", []));
            const hasProfile = Object.keys(profile).length > 0 || profilePhoto || profilePhotoRef || (cover && cover.src) || (Array.isArray(gallery) && gallery.length);
            if (!hasProfile) return null;
            const address = [profile.businessAddressLine1, profile.businessLocation, profile.businessPostcode].map(cleanText).filter(Boolean).join(", ");
            const category = cleanText(profile.businessCategory || profile.businessCategorySelected || profile.primarySector) || "Local business";
            const service = cleanText(profile.emyService || profile.primarySector || "");
            const hours = cleanText(profile.workingDays || (profile.workingDaysSchedule && profile.workingDaysSchedule.days ? profile.workingDaysSchedule.days.join(", ") : ""));
            let openStateLabel = "";
            let distanceText = "";
            try { if (typeof businessOpenState === "function") openStateLabel = businessOpenState(profile).label; } catch (error) {}
            try { distanceText = detailBusinessDistanceText(profile); } catch (error) {}
            const savedAddress = detailLocationLooksSaved(address) ? address : detailBusinessSavedLocationText(profile);
            const cardAddressText = getText(card, ".business-address");
            const cardAddress = detailLocationLooksSaved(cardAddressText) ? cardAddressText : "";
            return {
              key: key || detailSlug(profile.businessName || profile.name) || "profile",
              name: cleanText(profile.businessName || profile.name || detailReadStorage("emyBusinessDisplayName") || detailReadStorage("emyBusinessName") || details.title) || "Your business",
              category,
              service,
              address: savedAddress || cardAddress || "No business location saved yet",
              description: cleanText(profile.description || details.description) || "Profile details have not been completed yet.",
              status: openStateLabel || cleanText(profile.status || profile.businessStatus) || getText(card, ".status") || "Hours not set",
              distance: distanceText,
              hours,
              mediaClass: mediaClasses(findMediaNode(card)) || "tech",
              profilePhoto,
              profilePhotoRef,
              href: "emy-business-profile.html?business=profile"
            };
          }
          function businessDetailsFromCard(card, details) {
            const titleText = details.title || getText(card, "h3") || "Business";
            const key = businessKeyFromDetails(card, details, titleText);
            const saved = savedProfileBusinessDetails(card, details, key);
            if (saved) return saved;
            const text = (key + " " + titleText).toLowerCase();
            const categoryFallback = text.includes("pizza") || text.includes("angi") ? "Food and local orders" : text.includes("ever") || text.includes("glow") ? "Beauty products" : text.includes("ross") ? "Customer business" : "Products and services";
            const businessImage = detailBusinessImageFromCard(card, details, key, titleText);
            const cardAddressText = getText(card, ".business-address") || getText(card, ".nearby-city");
            const cardAddress = detailLocationLooksSaved(cardAddressText) ? cardAddressText : "";
            const cardDistanceText = getText(card, ".distance") || getText(card, ".nearby-distance strong");
            return {
              key,
              name: titleText,
              category: getText(card, ".nearby-kind") || categoryFallback,
              service: getText(card, ".business-profile-meta span") || "",
              address: cardAddress || "No business location saved yet",
              description: details.description || getText(card, ".business-description") || "Open this business to see profile details, products, posts, clips, images and videos.",
              status: getText(card, ".status") || getText(card, ".nearby-status span") || "Hours not set",
              distance: cardAddress && /^\d/.test(cardDistanceText) ? cardDistanceText : "",
              hours: getText(card, ".business-hours") || (getText(card, ".nearby-status") || "").replace(/^Open(ed)?\s*/i, "").replace(/^Closed\s*/i, ""),
              mediaClass: mediaClasses(findMediaNode(card)) || productAvatarClass(key, titleText),
              profilePhoto: businessImage.profilePhoto,
              profilePhotoRef: businessImage.profilePhotoRef,
              href: "emy-business-profile.html?business=" + encodeURIComponent(key)
            };
          }
          function statusClassFromText(value) {
            return /^closed/i.test(String(value || "")) ? "is-closed" : "is-open";
          }
          function businessPresenceInfo(key, name, statusText) {
            const direct = cleanText(statusText).replace(/\s*[·•]\s*/g, " - ");
            const profile = detailBusinessProfileForKey(key, name);
            const profileHours = detailBusinessOpenLabel(profile);
            const vague = !direct || /online and available|available from this business|^active$|^live$|^opened?$/i.test(direct);
            let text = detailOpenClosedOnly(vague ? profileHours : direct, "");
            if (!text && !vague) text = detailOpenClosedOnly(profileHours, "");
            if (!text) text = (vague ? profileHours : direct) || "Opening hours not set for this business";
            const offline = /\b(closed|offline|unavailable)\b/i.test(text);
            return { online: !offline, text: text || "Opening hours not set for this business" };
          }
          function setPresenceNode(node, info) {
            if (!node || !info) return;
            node.textContent = info.text;
            node.classList.add("presence-link");
            node.classList.toggle("is-offline", !info.online);
          }
          function businessLibraryCard(label, items, total) {
            const count = Number.isFinite(Number(total)) ? Math.max(0, Math.round(Number(total))) : (Array.isArray(items) ? items.length : 0);
            const first = count ? items[0] : null;
            const countLabel = count + " " + (count === 1 ? label.replace(/s$/i, "") : label);
            return '<div class="item-business-library-card"><strong>' + escapeDetail(countLabel) + '</strong><span>' + escapeDetail(first ? ((first.title || label) + (first.description ? " - " + first.description : "")) : "No " + label.toLowerCase() + " yet.") + '</span></div>';
            return '<div class="item-business-library-card"><strong>' + escapeDetail(count + " " + label) + '</strong><span>' + escapeDetail(first ? ((first.title || label) + (first.description ? " · " + first.description : "")) : "No " + label.toLowerCase() + " yet.") + '</span></div>';
          }
          function renderBusinessPanel(card, details) {
            if (!businessPanel) return;
            const isBusiness = cleanText(details.kind).toLowerCase().includes("business");
            businessPanel.hidden = !isBusiness;
            modal.classList.toggle("is-business", isBusiness);
            if (!isBusiness) return;
            const info = businessDetailsFromCard(card, details);
            const preview = detailBusinessPreview(card, info.key, details);
            const products = firstPreviewItems(preview, "products", 3);
            const posts = firstPreviewItems(preview, "posts", 3);
            const reels = firstPreviewItems(preview, "reels", 3);
            const productTotal = previewItemTotal(preview, "products", products);
            const postTotal = previewItemTotal(preview, "posts", posts);
            const reelTotal = previewItemTotal(preview, "reels", reels);
            const presence = businessPresenceInfo(info.key, info.name, info.status);
            const resolvedAvatar = detailBusinessImageFromCard(card, Object.assign({}, details || {}, info || {}), info.key, info.name);
            if (!info.profilePhoto && resolvedAvatar.profilePhoto) info.profilePhoto = resolvedAvatar.profilePhoto;
            if (!info.profilePhotoRef && resolvedAvatar.profilePhotoRef) info.profilePhotoRef = resolvedAvatar.profilePhotoRef;
            if (businessNameNode) businessNameNode.textContent = info.name;
            if (businessCategoryNode) businessCategoryNode.textContent = [info.category, info.service].filter(Boolean).slice(0, 2).join(" · ") || "Business profile";
            if (businessAddressNode) businessAddressNode.textContent = info.address;
            setPresenceNode(businessPresence, presence);
            if (businessAvatar) {
              const hasBusinessAvatar = !!(info.profilePhoto || info.profilePhotoRef);
              businessAvatar.className = "item-business-avatar" + (hasBusinessAvatar ? " " + productAvatarClass(info.key, info.name) + " has-image" : "");
              businessAvatar.href = info.href;
              businessAvatar.setAttribute("aria-label", "Open " + info.name + " profile");
              if (hasBusinessAvatar) {
                businessAvatar.innerHTML = '<img' + (info.profilePhoto ? ' src="' + escapeDetail(info.profilePhoto) + '"' : '') + (info.profilePhotoRef ? ' data-emy-media-ref="' + escapeDetail(info.profilePhotoRef) + '"' : '') + ' alt="' + escapeDetail(info.name) + ' profile picture" />';
                if (info.profilePhotoRef && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(businessAvatar);
              }
              else businessAvatar.innerHTML = '<span data-item-business-avatar-initial>' + escapeDetail((info.name.charAt(0) || "B").toUpperCase()) + '</span>';
            }
            if (businessAvatarInitial && !(info.profilePhoto || info.profilePhotoRef)) businessAvatarInitial.textContent = (info.name.charAt(0) || "B").toUpperCase();
            businessProfileLinks.forEach((link) => {
              link.href = info.href;
              link.setAttribute("aria-label", "Open " + info.name + " profile");
            });
            if (businessChatLink) {
              businessChatLink.href = customerBusinessChatHref(info.key);
              businessChatLink.onclick = (event) => {
                event.preventDefault();
                openCustomerBusinessChat(info.key, info.name, "chat", details);
              };
            }
            if (businessFacts) {
              const factRows = [
                '<span class="' + statusClassFromText(info.status) + '">' + escapeDetail(info.status) + '<em>' + escapeDetail(info.hours || "Business hours") + '</em></span>'
              ];
              if (cleanText(info.distance)) factRows.push('<span>' + escapeDetail(info.distance) + '<em>From your saved location</em></span>');
              factRows.push('<span>' + escapeDetail(info.category) + '<em>Business category</em></span>');
              businessFacts.innerHTML = factRows.join("");
            }
            if (businessLibrary) {
              businessLibrary.innerHTML = businessLibraryCard("Products", products, productTotal) + businessLibraryCard("Posts", posts, postTotal) + businessLibraryCard("Clips", reels, reelTotal);
            }
            updateDetailRepostUi(card, details);
            if (businessCustomer) {
              const blockedForBusinessAccount = !detailCanBecomeCustomer();
              const stored = isCustomerBusinessKey(info.key, info.name);
              businessCustomer.hidden = blockedForBusinessAccount;
              businessCustomer.disabled = blockedForBusinessAccount;
              businessCustomer.classList.toggle("is-active", stored);
              businessCustomer.setAttribute("aria-pressed", stored ? "true" : "false");
              businessCustomer.textContent = stored ? "In My Businesses" : "Add to My Businesses";
              if (businessCustomerNote) businessCustomerNote.innerHTML = customerBusinessNoteHtml(stored);
              businessCustomer.onclick = () => {
                if (!detailCanBecomeCustomer()) {
                  detailFeedback("Business accounts cannot become customers. Switch to a customer account first.");
                  return;
                }
                const active = !businessCustomer.classList.contains("is-active");
                businessCustomer.classList.toggle("is-active", active);
                businessCustomer.textContent = active ? "In My Businesses" : "Add to My Businesses";
                businessCustomer.setAttribute("aria-pressed", active ? "true" : "false");
                if (businessCustomerNote) businessCustomerNote.innerHTML = customerBusinessNoteHtml(active);
                setCustomerBusinessState(info.key, info.name, active, details);
              };
            }
          }
          function setProductFeedback(message) {
            if (!productFeedback) return;
            productFeedback.textContent = message || "";
            productFeedback.classList.toggle("is-visible", !!message);
          }
          function toggleCountButton(button, countNode, activeMessage, inactiveMessage) {
            if (!button || !countNode) return false;
            const active = !button.classList.contains("is-active");
            button.classList.toggle("is-active", active);
            const count = readEngagementCount(countNode);
            setEngagementCountText(countNode, Math.max(0, count + (active ? 1 : -1)));
            setProductFeedback(active ? activeMessage : inactiveMessage);
            return active;
          }
          function detailNumber(value) {
            return readEngagementCount(value);
          }
          function detailReadFeedStateMap() {
            try {
              const parsed = JSON.parse(localStorage.getItem("emyFeedActionState") || "{}");
              return parsed && typeof parsed === "object" ? parsed : {};
            } catch (error) {
              return {};
            }
          }
          function detailWriteFeedStateMap(state) {
            try {
              localStorage.setItem("emyFeedActionState", JSON.stringify(state || {}));
              window.dispatchEvent(new CustomEvent("emy:feed-action-state-changed", { detail: { key: "emyFeedActionState" } }));
            } catch (error) {}
          }
          function detailFeedIdsForCard(card) {
            if (!card || !card.dataset) return [];
            const data = card.dataset || {};
            const rawKind = cleanText(data.detailKind || data.kind || data.type || inferKind(card)).toLowerCase();
            const statsKind = rawKind.includes("product") ? "product" : rawKind.includes("post") ? "post" : rawKind.includes("clip") ? "clip" : rawKind.includes("article") ? "article" : rawKind || "item";
            const businessName = cleanText(data.detailBusiness || data.businessName || data.business || data.ownerName || getText(card, ".feed-profile-link strong") || getText(card, ".post-head strong") || getText(card, ".reel-top strong"));
            const titleText = cleanText(data.productName || data.productTitle || data.detailTitle || data.title || getText(card, ".feed-body h2") || getText(card, ".business-preview-copy strong") || getText(card, ".caption strong") || getText(card, ".card-body h3") || getText(card, ".body h3") || getText(card, "h3") || getText(card, "h2"));
            const descriptionText = cleanText(data.productDescription || data.productInfo || data.detailDescription || data.description || getText(card, ".feed-body p") || getText(card, ".business-preview-copy small") || getText(card, ".caption > span") || getText(card, ".card-body p") || getText(card, ".body p") || getText(card, "p"));
            const ids = [
              data.feedId,
              data.detailId,
              data.detailRepostId,
              data.businessProductId,
              data.productId,
              data.productKey,
              data.detailTitle
            ];
            const contentSlug = detailSlug([statsKind, businessName, titleText].filter(Boolean).join(":"));
            const copySlug = detailSlug([businessName, titleText, descriptionText].filter(Boolean).join(":"));
            if (contentSlug) ids.push("emy:" + contentSlug, contentSlug);
            if (copySlug) ids.push("copy:" + copySlug, copySlug);
            try {
              if (typeof detailRepostId === "function") ids.push(detailRepostId(card, detailsFromCard(card)));
            } catch (error) {}
            try {
              if (window.emyEngagement && typeof window.emyEngagement.idsForCard === "function") {
                ids.push.apply(ids, window.emyEngagement.idsForCard(card));
              }
            } catch (error) {}
            return Array.from(new Set(ids.map(cleanText).filter(Boolean)));
          }
          function detailFeedStateKeysForCard(card) {
            const ids = detailFeedIdsForCard(card).map(cleanText).filter(Boolean);
            const seen = new Set(ids.map((value) => value.toLowerCase()));
            const addId = (value) => {
              const clean = cleanText(value);
              if (!clean) return;
              const key = clean.toLowerCase();
              if (seen.has(key)) return;
              seen.add(key);
              ids.push(clean);
            };
            const details = card === activeDetailCard && activeDetailDetails ? activeDetailDetails : detailsFromCard(card);
            const data = card && card.dataset ? card.dataset : {};
            const wantedTitle = detailProductCompare(details && (details.title || details.productName || details.productTitle) || data.detailTitle);
            const wantedBusiness = detailProductCompare(details && details.business || data.detailBusiness || data.businessName);
            detailProductStoredRows().forEach((row) => {
              const rowIds = [row.id, row.feedId, row.productId, row.businessProductId, row.itemId, row.uid, row.rawId].map(cleanText).filter(Boolean);
              const rowTitle = detailProductCompare(detailProductFirstText([row.productName, row.productTitle, row.title, row.name], false));
              const rowBusiness = detailProductCompare(detailProductFirstText([row.businessName, row.business], false));
              const idMatch = rowIds.some((id) => seen.has(id.toLowerCase()));
              const titleMatch = wantedTitle && rowTitle && (rowTitle === wantedTitle || rowTitle.indexOf(wantedTitle) === 0 || wantedTitle.indexOf(rowTitle) === 0);
              const businessMatch = !wantedBusiness || !rowBusiness || rowBusiness === wantedBusiness;
              if (idMatch || (titleMatch && businessMatch)) rowIds.forEach(addId);
            });
            const stateMap = detailReadFeedStateMap();
            const titleSlug = wantedTitle ? detailSlug(wantedTitle) : "";
            const businessSlug = wantedBusiness ? detailSlug(wantedBusiness) : "";
            Object.keys(stateMap).forEach((stateKey) => {
              const cleanKey = cleanText(stateKey);
              if (!cleanKey || seen.has(cleanKey.toLowerCase())) return;
              const row = stateMap[stateKey];
              const hasComments = Array.isArray(row && row.comments) && row.comments.length;
              const hasReplies = Array.isArray(row && row.replies) && row.replies.length;
              if (!hasComments && !hasReplies) return;
              const keyLower = cleanKey.toLowerCase();
              if (ids.some((id) => {
                const idLower = id.toLowerCase();
                return keyLower === idLower || keyLower.endsWith(":" + idLower) || idLower.endsWith(":" + keyLower);
              })) {
                addId(cleanKey);
                return;
              }
              if (titleSlug && businessSlug && keyLower.indexOf(titleSlug) >= 0 && keyLower.indexOf(businessSlug) >= 0) addId(cleanKey);
            });
            return ids;
          }
          function detailProductViewIdsForCard(card, details) {
            const info = details || detailsFromCard(card);
            const data = card && card.dataset || {};
            const ids = detailFeedIdsForCard(card).concat([
              info && info.id,
              info && info.productId,
              info && info.feedId,
              info && info.rawId,
              info && info.title,
              info && info.name,
              data.detailTitle,
              data.detailName,
              data.detailProductId,
              data.productName
            ]);
            const business = cleanText(info && info.business) || inferProductBusiness(card, info);
            const title = cleanText(info && info.title) || cleanText(data.detailTitle);
            if (business && title) ids.push(detailSlug([business, title].join("-")));
            return Array.from(new Set(ids.map(cleanText).filter(Boolean)));
          }
          function detailFeedId(card) {
            const ids = detailFeedIdsForCard(card);
            return ids[0] || "";
          }
          function detailFeedStateForCard(card) {
            const ids = detailFeedStateKeysForCard(card);
            const state = detailReadFeedStateMap();
            return ids.reduce((merged, id) => {
              const row = state[id];
              if (!row || typeof row !== "object") return merged;
              Object.keys(row).forEach((key) => {
                const value = row[key];
                if (Array.isArray(value)) {
                  if (key === "comments") {
                    merged[key] = detailMergeCommentThreads(Array.isArray(merged[key]) ? merged[key] : [], value);
                  } else if (key === "replies") {
                    merged[key] = detailMergeCommentReplies(Array.isArray(merged[key]) ? merged[key] : [], value);
                  } else {
                    merged[key] = detailMergeRows([].concat(Array.isArray(merged[key]) ? merged[key] : [], value));
                  }
                } else if (typeof value === "number") {
                  merged[key] = Math.max(Number(merged[key]) || 0, value);
                } else if (value !== undefined && value !== null && value !== "") {
                  merged[key] = value;
                }
              });
              return merged;
            }, {});
          }
          function detailUpdateFeedStateForCard(card, patch) {
            const ids = detailFeedStateKeysForCard(card);
            try {
              const details = card === activeDetailCard && activeDetailDetails ? activeDetailDetails : detailsFromCard(card);
              const kind = cleanText(details && details.kind || card && card.dataset && (card.dataset.detailKind || card.dataset.kind || card.dataset.type)).toLowerCase();
              if (kind.includes("product")) ids.push.apply(ids, detailProductViewIdsForCard(card, details));
            } catch (error) {}
            const uniqueIds = Array.from(new Set(ids.map(cleanText).filter(Boolean)));
            if (!uniqueIds.length) return;
            const state = detailReadFeedStateMap();
            uniqueIds.forEach((id) => {
              state[id] = Object.assign({}, state[id] || {}, patch || {});
            });
            detailWriteFeedStateMap(state);
          }
          function detailSavedFeedRecord(card, details) {
            const info = details || detailsFromCard(card);
            const kind = cleanText(info && info.kind) || "Saved item";
            const title = cleanText(info && info.title) || cleanText(card && card.dataset && card.dataset.detailTitle) || kind;
            const business = cleanText(info && info.business) || inferProductBusiness(card, info);
            const id = detailFeedId(card) || ("detail-" + detailSlug([kind, business, title].join("-")));
            const key = businessKeyFromDetails(card, info, business);
            const kindText = kind.toLowerCase();
            let href = "emy-customer-home.html#feeds";
            if (kindText.includes("clip")) href = "emy-customer-home.html#reels";
            else if (kindText.includes("product")) href = "emy-customer-search.html#products";
            if (key && (kindText.includes("product") || kindText.includes("business"))) href = "emy-business-profile.html?business=" + encodeURIComponent(key);
            return { id, kind, title, business, href, savedAt: new Date().toISOString() };
          }
          function detailSetSavedFeedItem(card, details, active) {
            try {
              const record = detailSavedFeedRecord(card, details);
              if (!record.id) return;
              const person = detailCurrentPersonSnapshot();
              const scopedId = (detailSlug([person.role, person.key || person.name || "account"].join(":")) || person.role || "account") + ":" + record.id;
              let saved = JSON.parse(localStorage.getItem("emySavedFeedItems") || "{}");
              if (!saved || typeof saved !== "object" || Array.isArray(saved)) saved = {};
              if (active) saved[scopedId] = Object.assign({}, record, { id: scopedId, itemId: record.id, accountRole: person.role, accountKey: person.key, accountName: person.name });
              else {
                delete saved[scopedId];
                if (person.role === "customer") delete saved[record.id];
              }
              localStorage.setItem("emySavedFeedItems", JSON.stringify(saved));
              window.dispatchEvent(new CustomEvent("emy:saved-feed-items-changed", { detail: { id: record.id, scopedId, accountRole: person.role, accountKey: person.key, saved: !!active } }));
            } catch (error) {}
          }
          function detailCurrentPersonSnapshot() {
            const email = cleanText(localStorage.getItem("emyMainSignedInEmail"));
            let profile = {};
            try { profile = JSON.parse(localStorage.getItem("emyBusinessProfileDraft") || "{}") || {}; } catch (error) { profile = {}; }
            const signedRole = String(localStorage.getItem("emyMainSignedInRole") || "").toLowerCase();
            const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
            const role = activeDetailAccountRole() || cleanText(signedRole || localStorage.getItem("emyMainRole") || pendingRole || "customer").toLowerCase() || "customer";
            const businessName = cleanText(localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || localStorage.getItem("emyMainPendingSignupBusinessName") || profile.businessName || profile.name);
            const customerName = currentUserDisplayName();
            const name = role === "business" && businessName ? businessName : customerName;
            const key = role === "business"
              ? detailSlug(localStorage.getItem("emyBusinessProfileKey") || localStorage.getItem("emyBusinessKey") || businessName || name || "business")
              : (cleanText(email || name).toLowerCase() || "customer");
            const customerMediaValues = new Set([
              localStorage.getItem("emyCustomerProfilePhoto"),
              localStorage.getItem("emyCustomerProfilePhotoSrc"),
              localStorage.getItem("emyCustomerProfilePhotoRef"),
              localStorage.getItem("emyMainPendingSignupPhoto"),
              localStorage.getItem("emyMainPendingSignupPhotoSrc"),
              localStorage.getItem("emyMainPendingSignupPhotoRef")
            ].map((value) => cleanText(value)).filter(Boolean));
            const businessOnlyMedia = (values) => (Array.isArray(values) ? values : []).map((value) => cleanText(value)).find((value) => value && !customerMediaValues.has(value)) || "";
            const photo = role === "business"
              ? businessOnlyMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyBusinessProfileImage"), localStorage.getItem("emyBusinessPhoto"), localStorage.getItem("emyBusinessAvatar"), localStorage.getItem("emyBusinessLogo"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), profile.profilePhoto, profile.profilePhotoSrc, profile.photo, profile.photoSrc])
              : cleanText(localStorage.getItem("emyCustomerProfilePhoto") || localStorage.getItem("emyCustomerProfilePhotoSrc") || (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhoto") : "") || (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoSrc") : ""));
            const photoRef = role === "business"
              ? businessOnlyMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyBusinessProfileImageRef"), localStorage.getItem("emyBusinessPhotoRef"), localStorage.getItem("emyBusinessAvatarRef"), localStorage.getItem("emyBusinessLogoRef"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), profile.profilePhotoRef, profile.photoRef])
              : cleanText(localStorage.getItem("emyCustomerProfilePhotoRef") || (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : ""));
            const href = role === "business" ? "emy-business-profile.html?mode=business" : "emy-customer-profile.html" + (key && key !== "customer" ? "?customer=" + encodeURIComponent(key) : "");
            return { name, key, email, role, photo, photoRef, href };
          }
          function detailPersonRole(person) {
            const source = person && typeof person === "object" ? person : {};
            const explicit = cleanText(source.role || source.actorType || source.repostedByType || source.createdAs || source.accountType || source.owner || source.type).toLowerCase();
            if (explicit) return explicit;
            if (source.customerKey || source.customerName || source.viewerKey || source.viewerName || source.viewerEmail) return "customer";
            if (source.businessKey || source.businessName || source.business || source.sellerName) return "business";
            return "";
          }
          function detailPersonIdentityValues(person) {
            const source = person && typeof person === "object" ? person : {};
            return Array.from(new Set([
              source.key,
              source.actorKey,
              source.customerKey,
              source.viewerKey,
              source.repostedByKey,
              source.email,
              source.viewerEmail,
              source.name,
              source.actorName,
              source.customerName,
              source.viewerName,
              source.repostedBy
            ].map((value) => cleanText(value).toLowerCase()).filter(Boolean)));
          }
          function detailSameAccountPerson(left, right) {
            const leftRole = detailPersonRole(left);
            const rightRole = detailPersonRole(right);
            if ((leftRole || rightRole) && leftRole !== rightRole) return false;
            const rightValues = new Set(detailPersonIdentityValues(right));
            return detailPersonIdentityValues(left).some((value) => rightValues.has(value));
          }
          function detailCurrentPersonIn(list) {
            const person = detailCurrentPersonSnapshot();
            return (Array.isArray(list) ? list : []).some((item) => detailSameAccountPerson(item, person));
          }
          function detailPeopleCount(list) {
            const seen = new Set();
            (Array.isArray(list) ? list : []).forEach((item) => {
              const role = detailPersonRole(item);
              const identity = detailPersonIdentityValues(item)[0] || cleanText(JSON.stringify(item)).toLowerCase();
              const key = [role, identity].filter(Boolean).join(":");
              if (key) seen.add(key);
            });
            return seen.size;
          }
          function detailActionActive(state, listKey) {
            return detailCurrentPersonIn(state && state[listKey]);
          }
          function detailActionBaseCount(state, baseKey, countKey, listKey, visible) {
            if (state && Object.prototype.hasOwnProperty.call(state, baseKey)) return Math.max(0, Number(state[baseKey]) || 0);
            const people = detailPeopleCount(state && state[listKey]);
            const stored = Math.max(Number(state && state[countKey]) || 0, Number(visible) || 0, people);
            return Math.max(0, stored - people);
          }
          function detailPeopleListWithCurrent(list, active) {
            const person = detailCurrentPersonSnapshot();
            const rows = (Array.isArray(list) ? list : []).filter((item) => item && !detailSameAccountPerson(item, person));
            if (active) rows.unshift({ name: person.name, key: person.key, email: person.email, role: person.role, actorType: person.role, photo: person.photo, photoRef: person.photoRef, href: person.href, at: new Date().toISOString() });
            return rows.slice(0, 80);
          }
          function detailProductViewStatsMap() {
            try {
              const parsed = JSON.parse(localStorage.getItem("emyProductViewStats") || "{}");
              return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
            } catch (error) {
              return {};
            }
          }
          window.emyReadProductViewStats = window.emyReadProductViewStats || detailProductViewStatsMap;
          function detailWriteProductViewStatsMap(stats) {
            try {
              localStorage.setItem("emyProductViewStats", JSON.stringify(stats || {}));
              window.dispatchEvent(new CustomEvent("emy:product-view-stats-changed", { detail: { key: "emyProductViewStats" } }));
            } catch (error) {}
          }
          function detailProductViewMetadata(card, details, ids) {
            const info = details || detailsFromCard(card);
            const data = card && card.dataset || {};
            const business = cleanText(info && info.business) || inferProductBusiness(card, info) || cleanText(data.businessName || data.business || data.detailBusiness);
            const businessKey = detailSlug(info && info.businessKey || data.businessKey || data.detailBusinessKey || data.ownerKey || business || "profile");
            const title = cleanText(info && (info.productName || info.productTitle || info.title)) || cleanText(data.productName || data.productTitle || data.detailTitle) || "Product";
            const productId = cleanText(info && (info.productId || info.id || info.feedId || info.rawId)) || cleanText(data.detailProductId || data.productId || data.itemId || data.feedId) || cleanText(ids && ids[0]) || detailSlug([business || "product", title].join("-"));
            const image = cleanText(info && (info.mediaSrc || info.imageSrc || info.posterSrc)) || mediaSourceFromCard(card);
            const imageRef = cleanText(info && (info.mediaRef || info.imageRef || info.posterRef)) || mediaRefFromCard(card);
            const price = cleanText(info && info.price) || cleanText(data.detailPrice || data.price || data.productPrice);
            return {
              type: "product",
              kind: cleanText(info && info.kind) || "product",
              title,
              name: title,
              productName: title,
              productTitle: title,
              productId,
              productKey: productId,
              business,
              businessName: business,
              businessKey,
              detailBusinessKey: businessKey,
              price,
              priceText: price,
              image,
              imageSrc: image,
              mediaSrc: image,
              mediaRef: imageRef,
              source: "product-view"
            };
          }
          function detailReadProductVisitRows(key) {
            try {
              const parsed = JSON.parse(localStorage.getItem(key) || "[]");
              return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item === "object") : [];
            } catch (error) {
              return [];
            }
          }
          function detailProductVisitIdentity(row) {
            return [
              detailSlug(row && (row.customerKey || row.viewerKey || row.viewerEmail || row.customerEmail || row.customerName || row.viewerName || row.name)),
              detailSlug(row && (row.businessKey || row.detailBusinessKey || row.businessId || row.businessName || row.business || row.seller || row.shop)),
              detailSlug(row && (row.productId || row.productKey || row.itemId || row.feedId || row.title || row.productName || row.name)),
              cleanText(row && (row.price || row.priceText || row.productPrice)).toLowerCase()
            ].join("|");
          }
          function detailWriteCustomerProductVisitHistory(card, details, person, ids, viewedAt) {
            if (!person || cleanText(person.role).toLowerCase() !== "customer") return;
            const metadata = detailProductViewMetadata(card, details, ids);
            const row = Object.assign({}, metadata, {
              id: "product-visit-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
              customerName: person.name,
              customerKey: person.key,
              customerEmail: person.email,
              viewerName: person.name,
              viewerKey: person.key,
              viewerEmail: person.email,
              viewerPhoto: person.photo,
              viewerPhotoRef: person.photoRef,
              href: person.href,
              visitedAt: viewedAt,
              viewedAt,
              createdAt: viewedAt,
              updatedAt: viewedAt,
              visitCount: 1
            });
            const identity = detailProductVisitIdentity(row);
            ["emyCustomerProductVisits", "emyProductVisitHistory"].forEach((storageKey) => {
              const rows = detailReadProductVisitRows(storageKey);
              let merged = false;
              const next = rows.map((item) => {
                if (detailProductVisitIdentity(item) !== identity) return item;
                merged = true;
                return Object.assign({}, item, row, {
                  id: item.id || row.id,
                  firstVisitedAt: item.firstVisitedAt || item.visitedAt || row.visitedAt,
                  visitCount: Math.max(1, Number(item.visitCount) || 1) + 1
                });
              });
              if (!merged) next.unshift(Object.assign({ firstVisitedAt: viewedAt }, row));
              next.sort((left, right) => new Date(right.visitedAt || right.viewedAt || right.updatedAt || 0).getTime() - new Date(left.visitedAt || left.viewedAt || left.updatedAt || 0).getTime());
              try { localStorage.setItem(storageKey, JSON.stringify(next.slice(0, 300))); } catch (error) {}
            });
            try { window.dispatchEvent(new CustomEvent("emy:customer-product-visits-changed", { detail: { key: "emyCustomerProductVisits", productId: metadata.productId, customerKey: person.key } })); } catch (error) {}
          }
          function detailRecordProductView(card, details) {
            const kind = cleanText(details && details.kind).toLowerCase();
            if (!kind.includes("product") || detailBusinessOwnsItem(card, details)) return;
            const ids = detailProductViewIdsForCard(card, details);
            if (!ids.length) return;
            const person = detailCurrentPersonSnapshot();
            const now = Date.now();
            const viewedAt = new Date(now).toISOString();
            const stats = detailProductViewStatsMap();
            const record = detailMergeProductViewRecords(ids.map((id) => stats[id]).filter((item) => item && typeof item === "object"));
            const yearAgo = now - 370 * 24 * 60 * 60 * 1000;
            const events = (Array.isArray(record.events) ? record.events : []).filter((item) => {
              const at = new Date(item && item.at || 0).getTime();
              return Number.isFinite(at) && at >= yearAgo;
            });
            events.push({ id: "product-view-" + now + "-" + Math.random().toString(36).slice(2, 8), at: viewedAt, viewerName: person.name, viewerKey: person.key, viewerPhoto: person.photo, viewerPhotoRef: person.photoRef, href: person.href, role: person.role });
            const total = Math.max(events.length, Number(record && record.total) || 0, detailProductViewCountForCard(card, details));
            const metadata = detailProductViewMetadata(card, details, ids);
            ids.forEach((id) => {
              stats[id] = Object.assign({}, record, metadata, { events: events.slice(), total, lastViewedAt: events[events.length - 1].at });
            });
            detailWriteProductViewStatsMap(stats);
            detailWriteCustomerProductVisitHistory(card, details, person, ids, viewedAt);
          }
          function detailRecordProductViewFromCard(card) {
            if (!card || !card.dataset) return;
            if (window.emyEngagement && typeof window.emyEngagement.scheduleView === "function") {
              window.emyEngagement.scheduleView(card);
            }
            detailRecordProductView(card, detailsFromCard(card));
          }
          window.emyRecordProductView = window.emyRecordProductView || detailRecordProductViewFromCard;
          function initProductViewImpressionTracking() {
            const recordedCards = new WeakSet();
            const observedCards = new WeakSet();
            const recordVisibleCard = (card) => {
              if (!card || recordedCards.has(card)) return;
              const details = detailsFromCard(card);
              const kind = cleanText(details && details.kind).toLowerCase();
              if (!kind.includes("product")) return;
              recordedCards.add(card);
              detailRecordProductView(card, details);
            };
            if (window.IntersectionObserver) {
              const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                  if (!entry.isIntersecting || entry.intersectionRatio < 0.45) return;
                  observer.unobserve(entry.target);
                  window.setTimeout(() => recordVisibleCard(entry.target), 350);
                });
              }, { threshold: [0.45, 0.75] });
              const observeCard = (card) => {
                if (!card || observedCards.has(card) || recordedCards.has(card)) return;
                const details = detailsFromCard(card);
                const kind = cleanText(details && details.kind).toLowerCase();
                if (!kind.includes("product")) return;
                observedCards.add(card);
                observer.observe(card);
              };
              const scan = (root) => {
                const scope = root && root.querySelectorAll ? root : document;
                if (scope.matches && scope.matches("[data-card]")) observeCard(scope);
                scope.querySelectorAll("[data-card]").forEach(observeCard);
              };
              scan(document);
              if (window.MutationObserver && document.body) {
                const mutations = new MutationObserver((items) => {
                  items.forEach((item) => {
                    item.addedNodes.forEach((node) => {
                      if (node && node.nodeType === 1) scan(node);
                    });
                  });
                });
                mutations.observe(document.body, { childList: true, subtree: true });
              }
            } else {
              window.setTimeout(() => {
                document.querySelectorAll("[data-card]").forEach(recordVisibleCard);
              }, 600);
            }
          }
          // Product/card views are now counted by central engagement after a 3-second opened detail view.
          function detailCommentIdentityKey(comment) {
            if (!comment || typeof comment !== "object") return "";
            const id = cleanText(comment.id || comment.commentId || comment.replyId);
            if (id) return "id:" + id.toLowerCase();
            return ["name", "text"].map((field) => cleanText(comment[field])).join("|").toLowerCase();
          }
          function detailMergeCommentReplies(existing, incoming) {
            const merged = [];
            const indexByKey = new Map();
            (Array.isArray(existing) ? existing : []).concat(Array.isArray(incoming) ? incoming : []).forEach((reply) => {
              const clean = detailNormaliseComment(reply);
              if (!clean) return;
              const key = detailCommentIdentityKey(clean);
              if (!key || indexByKey.has(key)) return;
              indexByKey.set(key, merged.length);
              merged.push(clean);
            });
            return merged;
          }
          function detailMergeCommentThreads(existing, incoming) {
            const merged = [];
            const indexByKey = new Map();
            (Array.isArray(existing) ? existing : []).concat(Array.isArray(incoming) ? incoming : []).forEach((comment) => {
              const clean = detailNormaliseComment(comment);
              if (!clean) return;
              const key = detailCommentIdentityKey(clean);
              if (!key) return;
              if (indexByKey.has(key)) {
                const slot = indexByKey.get(key);
                const current = merged[slot];
                merged[slot] = Object.assign({}, current, clean, {
                  replies: detailMergeCommentReplies(current.replies, clean.replies)
                });
                return;
              }
              indexByKey.set(key, merged.length);
              merged.push(Object.assign({}, clean, { replies: detailMergeCommentReplies([], clean.replies) }));
            });
            return merged;
          }
          function detailNormaliseComment(comment, card) {
            const contextCard = card || activeDetailCard;
            const details = contextCard ? detailsFromCard(contextCard) : (activeDetailDetails || {});
            const name = cleanText(comment && (comment.name || comment.author)) || currentUserDisplayName();
            const text = cleanText(comment && comment.text);
            if (!text) return null;
            const id = cleanText(comment && (comment.id || comment.commentId || comment.replyId));
            const createdAt = cleanText(comment && (comment.createdAt || comment.at || comment.postedAt));
            const authorRole = detailCommentAuthorRole(comment, contextCard, details) || cleanText(comment && (comment.role || comment.actorType || comment.accountRole)).toLowerCase();
            const own = detailCommentOwnForViewer(comment, name, contextCard, details);
            return {
              ...(id ? { id, commentId: id } : {}),
              name,
              author: name,
              text,
              likes: Math.max(0, Number(comment && comment.likes) || 0),
              dislikes: Math.max(0, Number(comment && comment.dislikes) || 0),
              liked: detailCommentReactionActive(comment, "like", contextCard, details),
              disliked: detailCommentReactionActive(comment, "dislike", contextCard, details),
              own,
              mine: own,
              role: authorRole,
              actorType: authorRole,
              createdAt,
              at: createdAt || cleanText(comment && (comment.at || comment.createdAt || comment.postedAt)),
              photo: cleanText(comment && (comment.photo || comment.avatarSrc || comment.avatar || comment.profilePhoto || comment.customerPhoto || comment.viewerPhoto || comment.image || comment.imageSrc)),
              photoRef: cleanText(comment && (comment.photoRef || comment.avatarRef || comment.profilePhotoRef || comment.customerPhotoRef || comment.viewerPhotoRef || comment.imageRef)),
              href: cleanText(comment && (comment.href || comment.profileHref || comment.customerHref || comment.viewerHref)) || "emy-customer-profile.html",
              replies: Array.isArray(comment && comment.replies) ? comment.replies.map((reply) => detailNormaliseComment(reply, contextCard)).filter(Boolean) : []
            };
          }
          function detailCommentsFromState(state) {
            const comments = Array.isArray(state && state.comments) ? state.comments.map(detailNormaliseComment).filter(Boolean) : [];
            if (Array.isArray(state && state.replies)) {
              state.replies.forEach((reply) => {
                const rowIndex = Math.max(0, Number(reply && reply.rowIndex) || 0);
                const cleanReply = detailNormaliseComment(reply);
                if (!cleanReply) return;
                if (!comments[rowIndex]) {
                  comments.push(cleanReply);
                  return;
                }
                comments[rowIndex].replies = comments[rowIndex].replies || [];
                comments[rowIndex].replies.push(cleanReply);
              });
            }
            return comments;
          }
          function detailReadFeedCommentRow(row) {
            if (!row) return null;
            const bubble = row.querySelector(".feed-comment-bubble");
            const name = cleanText(row.dataset.feedCommentName || (bubble && bubble.querySelector("strong") && bubble.querySelector("strong").textContent)) || currentUserDisplayName();
            const textNode = bubble && bubble.querySelector("[data-feed-comment-text]");
            const likeButton = row.querySelector("[data-feed-comment-like]");
            const dislikeButton = row.querySelector("[data-feed-comment-dislike]");
            const avatarLink = row.querySelector(".feed-comment-avatar");
            const avatarImg = avatarLink && avatarLink.querySelector("img");
            return detailNormaliseComment({
              id: cleanText(row.dataset.feedCommentId || row.dataset.commentId || ""),
              createdAt: cleanText(row.dataset.feedCommentCreatedAt || row.dataset.commentCreatedAt || row.dataset.createdAt || ""),
              at: cleanText(row.dataset.feedCommentCreatedAt || row.dataset.commentCreatedAt || row.dataset.createdAt || ""),
              name,
              text: textNode ? textNode.textContent : "",
              likes: detailNumber(row.querySelector("[data-feed-comment-likes]") && row.querySelector("[data-feed-comment-likes]").textContent),
              dislikes: detailNumber(row.querySelector("[data-feed-comment-dislikes]") && row.querySelector("[data-feed-comment-dislikes]").textContent),
              liked: !!(likeButton && likeButton.classList.contains("is-active")),
              disliked: !!(dislikeButton && dislikeButton.classList.contains("is-active")),
              own: row.dataset.feedCommentOwned === "true",
              role: cleanText(row.dataset.feedCommentAuthorRole || row.dataset.commentAuthorRole),
              actorType: cleanText(row.dataset.feedCommentAuthorRole || row.dataset.commentAuthorRole),
              key: cleanText(row.dataset.feedCommentAccountKey || row.dataset.commentAccountKey),
              email: cleanText(row.dataset.feedCommentEmail || row.dataset.commentEmail),
              href: cleanText(row.dataset.feedCommentHref || row.dataset.commentHref || (avatarLink && avatarLink.getAttribute("href"))),
              photo: cleanText(avatarImg && (avatarImg.currentSrc || avatarImg.src || avatarImg.getAttribute("src"))),
              photoRef: cleanText(avatarImg && avatarImg.getAttribute("data-emy-media-ref")),
              replies: Array.from(row.querySelectorAll("[data-feed-comment-reply-row]")).map((replyRow) => {
                const replyBubble = replyRow.querySelector(".feed-comment-reply-bubble, .feed-comment-bubble");
                const replyName = cleanText(replyRow.dataset.feedCommentName || (replyBubble && replyBubble.querySelector("strong") && replyBubble.querySelector("strong").textContent)) || currentUserDisplayName();
                const replyLike = replyRow.querySelector("[data-feed-comment-like]");
                const replyDislike = replyRow.querySelector("[data-feed-comment-dislike]");
                const replyAvatarLink = replyRow.querySelector(".feed-comment-avatar");
                const replyAvatarImg = replyAvatarLink && replyAvatarLink.querySelector("img");
                return {
                  id: cleanText(replyRow.dataset.feedCommentId || replyRow.dataset.commentId || ""),
                  createdAt: cleanText(replyRow.dataset.feedCommentCreatedAt || replyRow.dataset.commentCreatedAt || replyRow.dataset.createdAt || ""),
                  at: cleanText(replyRow.dataset.feedCommentCreatedAt || replyRow.dataset.commentCreatedAt || replyRow.dataset.createdAt || ""),
                  name: replyName,
                  text: replyBubble && replyBubble.querySelector("[data-feed-comment-text]") ? replyBubble.querySelector("[data-feed-comment-text]").textContent : "",
                  likes: detailNumber(replyRow.querySelector("[data-feed-comment-likes]") && replyRow.querySelector("[data-feed-comment-likes]").textContent),
                  dislikes: detailNumber(replyRow.querySelector("[data-feed-comment-dislikes]") && replyRow.querySelector("[data-feed-comment-dislikes]").textContent),
                  liked: !!(replyLike && replyLike.classList.contains("is-active")),
                  disliked: !!(replyDislike && replyDislike.classList.contains("is-active")),
                  own: replyRow.dataset.feedCommentOwned === "true",
                  role: cleanText(replyRow.dataset.feedCommentAuthorRole || replyRow.dataset.commentAuthorRole),
                  actorType: cleanText(replyRow.dataset.feedCommentAuthorRole || replyRow.dataset.commentAuthorRole),
                  key: cleanText(replyRow.dataset.feedCommentAccountKey || replyRow.dataset.commentAccountKey),
                  email: cleanText(replyRow.dataset.feedCommentEmail || replyRow.dataset.commentEmail),
                  href: cleanText(replyRow.dataset.feedCommentHref || replyRow.dataset.commentHref || (replyAvatarLink && replyAvatarLink.getAttribute("href"))),
                  photo: cleanText(replyAvatarImg && (replyAvatarImg.currentSrc || replyAvatarImg.src || replyAvatarImg.getAttribute("src"))),
                  photoRef: cleanText(replyAvatarImg && replyAvatarImg.getAttribute("data-emy-media-ref"))
                };
              })
            });
          }
          function detailCommentsFromSourceDom(card) {
            if (!card || !card.querySelectorAll) return [];
            const seen = new Set();
            const rows = [];
            card.querySelectorAll("[data-feed-comments-list] > [data-feed-comment-row], .feed-comments [data-feed-comment-row]").forEach((row) => {
              if (seen.has(row) || row.closest("[data-feed-comment-replies]")) return;
              seen.add(row);
              rows.push(row);
            });
            return rows.map(detailReadFeedCommentRow).filter(Boolean);
          }
          function detailCommentsFromStoredProduct(card) {
            if (!card) return [];
            const data = card.dataset || {};
            const details = card === activeDetailCard && activeDetailDetails ? activeDetailDetails : detailsFromCard(card);
            const wantedIds = detailFeedIdsForCard(card).concat([
              details && details.id,
              details && details.productId,
              details && details.feedId,
              data.businessProductId,
              data.productId,
              data.feedId
            ]).map(cleanText).filter(Boolean).map((value) => value.toLowerCase());
            const wantedTitle = detailProductCompare(details && (details.title || details.productName || details.productTitle));
            const wantedBusiness = detailProductCompare(details && details.business || data.detailBusiness || data.businessName);
            let best = null;
            let bestScore = 0;
            detailStoredCommentRows().forEach((row) => {
              const rowIds = detailCommentRowValues(row, ["id", "feedId", "postId", "productId", "businessProductId", "itemId", "clipId", "reelId", "eventId", "jobId", "uid", "rawId", "originalId", "originalFeedId"]).map(cleanText).filter(Boolean).map((value) => value.toLowerCase());
              let score = 0;
              if (wantedIds.length && rowIds.some((id) => wantedIds.some((wanted) => id === wanted || id.indexOf(wanted) >= 0 || wanted.indexOf(id) >= 0))) score += 90;
              const rowTitle = detailProductCompare(detailProductFirstText(detailCommentRowValues(row, ["productName", "productTitle", "fullTitle", "itemTitle", "jobTitle", "eventTitle", "clipTitle", "title", "name", "caption", "text", "description"]), false));
              const rowBusiness = detailProductCompare(detailProductFirstText(detailCommentRowValues(row, ["businessName", "business", "businessKey", "ownerName", "actor", "sellerName", "storeName", "key"]), false));
              if (wantedTitle && rowTitle && (rowTitle === wantedTitle || rowTitle.indexOf(wantedTitle) === 0 || wantedTitle.indexOf(rowTitle) === 0)) score += 30;
              if (wantedBusiness && rowBusiness && rowBusiness === wantedBusiness) score += 20;
              if (score > bestScore) {
                bestScore = score;
                best = row;
              }
            });
            if (!best || bestScore < 50 || !Array.isArray(best.comments)) return [];
            return best.comments.map(detailNormaliseComment).filter(Boolean);
          }
          function detailCommentsForCard(card) {
            const sources = [
              detailCommentsFromState(detailFeedStateForCard(card)),
              detailCommentsFromSourceDom(card),
              detailCommentsFromStoredProduct(card)
            ];
            return sources.reduce((merged, comments) => {
              if (!comments.length) return merged;
              return merged.length ? detailMergeCommentThreads(merged, comments) : comments;
            }, []);
          }
          function detailModalCommentRow(row) {
            if (!row) return null;
            const name = cleanText(row.querySelector("strong") && row.querySelector("strong").textContent) || currentUserDisplayName();
            const likeButton = row.querySelector("[data-item-product-comment-like]");
            const dislikeButton = row.querySelector("[data-item-product-comment-dislike]");
            const avatarLink = row.querySelector(".item-product-comment-avatar");
            const avatarImg = avatarLink && avatarLink.querySelector("img");
            return detailNormaliseComment({
              id: cleanText(row.dataset.itemProductCommentId || row.dataset.commentId || row.dataset.feedCommentId || ""),
              createdAt: cleanText(row.dataset.itemProductCommentCreatedAt || row.dataset.commentCreatedAt || row.dataset.feedCommentCreatedAt || row.dataset.createdAt || ""),
              at: cleanText(row.dataset.itemProductCommentCreatedAt || row.dataset.commentCreatedAt || row.dataset.feedCommentCreatedAt || row.dataset.createdAt || ""),
              name,
              text: row.querySelector("[data-item-product-comment-text]") && row.querySelector("[data-item-product-comment-text]").textContent,
              likes: detailNumber(row.querySelector("[data-item-product-comment-like-count]") && row.querySelector("[data-item-product-comment-like-count]").textContent),
              dislikes: detailNumber(row.querySelector("[data-item-product-comment-dislike-count]") && row.querySelector("[data-item-product-comment-dislike-count]").textContent),
              liked: !!(likeButton && likeButton.classList.contains("is-active")),
              disliked: !!(dislikeButton && dislikeButton.classList.contains("is-active")),
              own: row.dataset.ownComment === "true",
              role: cleanText(row.dataset.itemProductCommentAuthorRole || row.dataset.commentAuthorRole),
              actorType: cleanText(row.dataset.itemProductCommentAuthorRole || row.dataset.commentAuthorRole),
              key: cleanText(row.dataset.itemProductCommentAccountKey || row.dataset.commentAccountKey),
              email: cleanText(row.dataset.itemProductCommentEmail || row.dataset.commentEmail),
              href: cleanText(row.dataset.itemProductCommentHref || row.dataset.commentHref || (avatarLink && avatarLink.getAttribute("href"))),
              photo: cleanText(avatarImg && (avatarImg.currentSrc || avatarImg.src || avatarImg.getAttribute("src"))),
              photoRef: cleanText(avatarImg && avatarImg.getAttribute("data-emy-media-ref")),
              replies: Array.from(row.querySelectorAll("[data-item-product-comment-reply-row]")).map((replyRow) => {
                const replyAvatarLink = replyRow.querySelector(".item-product-comment-avatar");
                const replyAvatarImg = replyAvatarLink && replyAvatarLink.querySelector("img");
                return {
                  id: cleanText(replyRow.dataset.itemProductCommentId || replyRow.dataset.commentId || replyRow.dataset.feedCommentId || ""),
                  createdAt: cleanText(replyRow.dataset.itemProductCommentCreatedAt || replyRow.dataset.commentCreatedAt || replyRow.dataset.feedCommentCreatedAt || replyRow.dataset.createdAt || ""),
                  at: cleanText(replyRow.dataset.itemProductCommentCreatedAt || replyRow.dataset.commentCreatedAt || replyRow.dataset.feedCommentCreatedAt || replyRow.dataset.createdAt || ""),
                  name: cleanText(replyRow.querySelector("strong") && replyRow.querySelector("strong").textContent) || currentUserDisplayName(),
                  text: replyRow.querySelector("[data-item-product-comment-text]") && replyRow.querySelector("[data-item-product-comment-text]").textContent,
                  likes: detailNumber(replyRow.querySelector("[data-item-product-comment-like-count]") && replyRow.querySelector("[data-item-product-comment-like-count]").textContent),
                  dislikes: detailNumber(replyRow.querySelector("[data-item-product-comment-dislike-count]") && replyRow.querySelector("[data-item-product-comment-dislike-count]").textContent),
                  liked: !!(replyRow.querySelector("[data-item-product-comment-like]") && replyRow.querySelector("[data-item-product-comment-like]").classList.contains("is-active")),
                  disliked: !!(replyRow.querySelector("[data-item-product-comment-dislike]") && replyRow.querySelector("[data-item-product-comment-dislike]").classList.contains("is-active")),
                  own: replyRow.dataset.ownComment === "true",
                  role: cleanText(replyRow.dataset.itemProductCommentAuthorRole || replyRow.dataset.commentAuthorRole),
                  actorType: cleanText(replyRow.dataset.itemProductCommentAuthorRole || replyRow.dataset.commentAuthorRole),
                  key: cleanText(replyRow.dataset.itemProductCommentAccountKey || replyRow.dataset.commentAccountKey),
                  email: cleanText(replyRow.dataset.itemProductCommentEmail || replyRow.dataset.commentEmail),
                  href: cleanText(replyRow.dataset.itemProductCommentHref || replyRow.dataset.commentHref || (replyAvatarLink && replyAvatarLink.getAttribute("href"))),
                  photo: cleanText(replyAvatarImg && (replyAvatarImg.currentSrc || replyAvatarImg.src || replyAvatarImg.getAttribute("src"))),
                  photoRef: cleanText(replyAvatarImg && replyAvatarImg.getAttribute("data-emy-media-ref"))
                };
              })
            });
          }
          function detailModalCommentsFromDom() {
            if (!productCommentList) return [];
            return Array.from(productCommentList.querySelectorAll("[data-item-product-comment-row]")).map(detailModalCommentRow).filter(Boolean);
          }
          function detailFeedCommentMarkup(comment, card) {
            const contextCard = card || activeDetailCard;
            const clean = detailNormaliseComment(comment, contextCard);
            if (!clean) return "";
            try {
              if (typeof renderAnnexedComment === "function") return renderAnnexedComment(clean, contextCard);
              if (typeof renderComment === "function") return renderComment(clean, contextCard);
            } catch (error) {}
            const contextDetails = contextCard ? detailsFromCard(contextCard) : (activeDetailDetails || {});
            const replies = (clean.replies || []).map((reply) => {
              const replyName = cleanText(reply.name || reply.author) || currentUserDisplayName();
              const replyOwn = detailCommentOwnForViewer(reply, replyName, contextCard, contextDetails);
              const replyId = escapeDetail(reply.id || reply.commentId || reply.replyId || reply.createdAt || reply.at || "");
              const replyRole = detailCommentAuthorRole(reply, contextCard, contextDetails);
              const replyOwnerTools = replyOwn ? '<button type="button" data-feed-comment-edit aria-label="Edit reply" title="Edit">' + actionIcon("edit") + '</button><button type="button" data-feed-comment-delete aria-label="Delete reply" title="Delete">' + actionIcon("delete") + '</button>' : "";
              return '<div class="feed-comment-reply" data-feed-comment-reply-row' + (replyId ? ' data-feed-comment-id="' + replyId + '" data-comment-id="' + replyId + '"' : '') + ' data-feed-comment-name="' + escapeDetail(replyName) + '"' + (replyRole ? ' data-feed-comment-author-role="' + escapeDetail(replyRole) + '"' : '') + (replyOwn ? ' data-feed-comment-owned="true"' : '') + '>' + currentUserAvatarMarkup("feed-comment-avatar", replyName, replyOwn, replyName, reply && reply.photo, reply && reply.photoRef, reply && reply.href) + '<span class="feed-comment-reply-bubble"><strong>' + escapeDetail(replyName) + '</strong><span data-feed-comment-text>' + escapeDetail(reply.text || "") + '</span><span class="feed-comment-actions"><button type="button" data-feed-comment-like aria-pressed="' + (reply.liked ? 'true' : 'false') + '"' + (reply.liked ? ' class="is-active"' : '') + ' aria-label="Like reply" title="Like">' + actionIcon("like") + '</button><span class="feed-comment-action-count" data-feed-comment-likes>' + (Number(reply.likes) || 0) + '</span><button type="button" data-feed-comment-dislike aria-pressed="' + (reply.disliked ? 'true' : 'false') + '"' + (reply.disliked ? ' class="is-active"' : '') + ' aria-label="Dislike reply" title="Dislike">' + actionIcon("dislike") + '</button><span class="feed-comment-action-count" data-feed-comment-dislikes>' + (Number(reply.dislikes) || 0) + '</span>' + replyOwnerTools + '</span></span></div>';
            }).join("");
            const commentId = escapeDetail(clean.id || clean.commentId || clean.createdAt || clean.at || "");
            const ownerTools = clean.own ? '<button type="button" data-feed-comment-edit aria-label="Edit comment" title="Edit">' + actionIcon("edit") + '</button><button type="button" data-feed-comment-delete aria-label="Delete comment" title="Delete">' + actionIcon("delete") + '</button>' : "";
            return '<div class="feed-comment" data-feed-comment-row' + (commentId ? ' data-feed-comment-id="' + commentId + '" data-comment-id="' + commentId + '"' : '') + ' data-feed-comment-name="' + escapeDetail(clean.name) + '"' + (clean.role ? ' data-feed-comment-author-role="' + escapeDetail(clean.role) + '"' : '') + (clean.own ? ' data-feed-comment-owned="true"' : '') + '>' + currentUserAvatarMarkup("feed-comment-avatar", clean.name, !!clean.own, clean.name, clean.photo, clean.photoRef, clean.href) + '<div class="feed-comment-bubble"><strong>' + escapeDetail(clean.name) + '</strong><span data-feed-comment-text>' + escapeDetail(clean.text || "") + '</span><span class="feed-comment-actions"><button type="button" data-feed-comment-like aria-pressed="' + (clean.liked ? 'true' : 'false') + '"' + (clean.liked ? ' class="is-active"' : '') + ' aria-label="Like comment" title="Like">' + actionIcon("like") + '</button><span class="feed-comment-action-count" data-feed-comment-likes>' + (Number(clean.likes) || 0) + '</span><button type="button" data-feed-comment-dislike aria-pressed="' + (clean.disliked ? 'true' : 'false') + '"' + (clean.disliked ? ' class="is-active"' : '') + ' aria-label="Dislike comment" title="Dislike">' + actionIcon("dislike") + '</button><span class="feed-comment-action-count" data-feed-comment-dislikes>' + (Number(clean.dislikes) || 0) + '</span><button type="button" data-feed-comment-reply aria-label="Reply to comment" title="Reply">' + actionIcon("reply") + '</button>' + ownerTools + '</span><form class="feed-comment-reply-form" data-feed-comment-reply-form hidden><input type="text" placeholder="Write a reply..." aria-label="Write a reply" /><button type="submit" aria-label="Send reply" title="Send reply">' + actionIcon("send") + '</button></form><div class="feed-comment-replies" data-feed-comment-replies>' + replies + '</div></div></div>';
          }
          function detailSetCountText(card, selector, value) {
            if (!card) return;
            card.querySelectorAll(selector).forEach((node) => setEngagementCountText(node, value));
          }
          function detailFlattenCommentRows(comments, parent) {
            const rows = [];
            (Array.isArray(comments) ? comments : []).forEach((comment) => {
              const cleanComment = detailNormaliseComment(comment);
              if (!cleanComment) return;
              rows.push({ comment: cleanComment, isReply: !!parent, parentText: cleanText(parent && parent.text) });
              detailFlattenCommentRows(cleanComment.replies, cleanComment).forEach((reply) => rows.push(reply));
            });
            return rows;
          }
          function detailCommentThreadCount(comments) {
            return detailFlattenCommentRows(comments).length;
          }
          function detailCommentLikeTotal(comments) {
            return detailFlattenCommentRows(comments).reduce((total, row) => total + Math.max(0, Number(row.comment && row.comment.likes) || 0), 0);
          }
          function detailSyncSourceFooter(card) {
            if (!card) return;
            const commentCount = detailCommentThreadCount(detailCommentsForCard(card));
            detailSetCountText(card, "[data-feed-comment-count], [data-feed-comment-total], [data-home-created-comment-count], [data-home-created-comment-total]", commentCount);
            detailSetCountText(card, "[data-feed-repost-count], [data-home-created-repost-count]", detailRepostCount(card, activeDetailDetails || detailsFromCard(card)));
            try { if (typeof syncAnnexedCountedFooter === "function") syncAnnexedCountedFooter(card); } catch (error) {}
            try { if (typeof syncHomeCreatedSocialCounts === "function") syncHomeCreatedSocialCounts(card); } catch (error) {}
            try { if (typeof syncFeedCountedFooter === "function") syncFeedCountedFooter(card); } catch (error) {}
          }
          function detailApplyCommentsToSource(card, comments) {
            if (!card) return;
            const cleanComments = (Array.isArray(comments) ? comments : []).map((comment) => detailNormaliseComment(comment, card)).filter(Boolean);
            detailUpdateFeedStateForCard(card, { comments: cleanComments, replies: [] });
            detailPersistCommentsToStoredItems(card, cleanComments);
            const list = card.querySelector("[data-feed-comments-list]");
            if (list) {
              list.innerHTML = cleanComments.map((comment) => detailFeedCommentMarkup(comment, card)).join("");
              list.dataset.feedStateApplied = "true";
            }
            detailSyncSourceFooter(card);
            try { if (typeof setAnnexedCommentToggleLabels === "function") setAnnexedCommentToggleLabels(card); } catch (error) {}
          }
          function detailCommitModalComments(message) {
            const comments = detailModalCommentsFromDom();
            const count = detailCommentThreadCount(comments);
            if (productCommentCount) setEngagementCountText(productCommentCount, count);
            if (productCommentTotal) productCommentTotal.textContent = formatEngagementCount(count) + (count === 1 ? " comment" : " comments");
            detailApplyCommentsToSource(activeDetailCard, comments);
            if (message) setProductFeedback(message);
          }
          function detailVisibleNumber(card, selectors) {
            if (!card) return 0;
            for (const selector of selectors) {
              const node = card.querySelector(selector);
              const value = node ? detailNumber(node.textContent) : 0;
              if (value) return value;
            }
            return 0;
          }
          function detailTextNumber(value, word) {
            const match = String(value || "").match(new RegExp("(\\d+)\\s+" + word + "s?", "i"));
            return match ? Number(match[1]) || 0 : 0;
          }
          function detailStoredPeopleCount(state, listKey) {
            const rows = Array.isArray(state && state[listKey]) ? state[listKey] : [];
            return rows.filter(Boolean).length;
          }
          function detailMergeRows(rows, fields) {
            const seen = new Set();
            return (Array.isArray(rows) ? rows : []).filter((item) => {
              if (!item || typeof item !== "object") return false;
              const key = (fields || ["id", "at", "viewerKey", "key", "viewerEmail", "email", "viewerName", "name", "text"]).map((field) => cleanText(item && item[field])).join("|").toLowerCase();
              if (!key || seen.has(key)) return false;
              seen.add(key);
              return true;
            });
          }
          function detailMergeProductViewRecords(records) {
            return (Array.isArray(records) ? records : []).reduce((merged, record) => {
              if (!record || typeof record !== "object") return merged;
              const events = detailMergeRows([].concat(Array.isArray(merged.events) ? merged.events : [], Array.isArray(record.events) ? record.events : []), ["id", "at", "viewerKey", "key", "viewerEmail", "email", "viewerName", "name"]);
              return Object.assign({}, merged, record, {
                events,
                total: Math.max(Number(merged.total) || 0, Number(record.total) || 0, events.length),
                lastViewedAt: cleanText(record.lastViewedAt || merged.lastViewedAt)
              });
            }, {});
          }
          function detailCountsFromCard(card, details) {
            const state = detailFeedStateForCard(card);
            const mergedComments = detailCommentsForCard(card);
            const commentLikes = Math.max(detailCommentLikeTotal(mergedComments), Number(state.commentLikeCount) || 0);
            return {
              likes: detailStoredPeopleCount(state, "likedBy") + commentLikes,
              comments: detailCommentThreadCount(mergedComments),
              reposts: Math.max(detailStoredPeopleCount(state, "repostedBy"), detailRepostCount(card, details || {})),
              shares: detailStoredPeopleCount(state, "sharedBy"),
              saved: detailStoredPeopleCount(state, "savedBy")
            };
          }
          function detailProductViewRecordForCard(card, details) {
            const stats = detailProductViewStatsMap();
            const ids = detailProductViewIdsForCard(card, details || detailsFromCard(card)).map(cleanText).filter(Boolean);
            return detailMergeProductViewRecords(ids.map((id) => stats[id]).filter((record) => record && typeof record === "object"));
          }
          function detailProductViewRowsForCard(card, details) {
            const state = detailFeedStateForCard(card);
            const record = detailProductViewRecordForCard(card, details || detailsFromCard(card));
            const rows = [].concat(
              Array.isArray(record && record.events) ? record.events : [],
              Array.isArray(state && state.viewedBy) ? state.viewedBy : []
            ).filter((item) => !detailOwnerActivityIsCurrentBusiness(item));
            const seen = new Set();
            return rows.filter((item) => {
              const key = [
                cleanText(item && item.id),
                cleanText(item && item.at),
                cleanText(item && (item.viewerKey || item.key || item.viewerEmail || item.email || item.viewerName || item.name))
              ].join("|").toLowerCase();
              if (!key || seen.has(key)) return false;
              seen.add(key);
              return true;
            });
          }
          function detailViewCountFromText(value) {
            const text = cleanText(value);
            if (!text) return 0;
            const match = text.match(/(\d[\d,]*)\s*views?/i) || text.match(/views?\s*(\d[\d,]*)/i);
            return match ? Math.max(0, Number(String(match[1]).replace(/,/g, "")) || 0) : 0;
          }
          function detailProductStoredViewFallback(card, details) {
            const values = [];
            const push = (value) => {
              const count = Math.max(0, Number(value) || 0);
              if (count) values.push(count);
            };
            const pushText = (value) => {
              const count = detailViewCountFromText(value);
              if (count) values.push(count);
            };
            const pushRow = (row) => {
              const source = row && typeof row === "object" ? row : {};
              push(source.viewCount);
              push(source.views);
              push(source.totalViews);
              pushText(source.viewsText || source.viewText || source.stats || source.detailMeta || source.metaText || source.engagement);
            };
            const data = card && card.dataset ? card.dataset : {};
            push(data.viewCount);
            push(data.views);
            push(data.productViewCount);
            push(data.detailViewCount);
            pushText(data.viewsText || data.viewText || data.stats || data.detailMeta || data.metaText);
            const match = detailRecoveryStoredMatch(card, details || detailsFromCard(card));
            pushRow(match);
            pushRow(match && match._parentItem);
            if (card && card.querySelectorAll) {
              card.querySelectorAll("[data-product-view-count], [data-item-product-view-count], [data-feed-view-count], [data-public-view-count], [data-business-product-view-count], .product-stats span, .rank-value, .analytics-summary-breakdown-value").forEach((node) => {
                push(node && node.dataset && (node.dataset.rawCount || node.dataset.productViewCount || node.dataset.viewCount));
                pushText(node && node.textContent);
              });
              const text = cleanText(card.textContent);
              const matches = text.match(/\d[\d,]*\s*views?/gi) || [];
              matches.forEach(pushText);
            }
            return values.length ? Math.max.apply(Math, values) : 0;
          }
          function detailBusinessProductPerformanceViewFallback(card, details) {
            const info = details || detailsFromCard(card);
            const wantedTitle = detailSlug(info && info.title);
            const wantedBusiness = detailSlug(info && info.business);
            const data = card && card.dataset ? card.dataset : {};
            const wantedIds = new Set([
              data.businessProductId,
              data.productId,
              data.detailProductId,
              data.productKey,
              data.feedId,
              data.detailId,
              data.detailTitle,
              info && info.title
            ].map(detailSlug).filter(Boolean));
            let best = 0;
            let bestScore = 0;
            try {
              if (typeof businessStatsProductPerformanceRows !== "function") return 0;
              (businessStatsProductPerformanceRows(0, Infinity) || []).forEach((row) => {
                const item = row && row.item && typeof row.item === "object" ? row.item : {};
                const rowIds = [
                  row && row.id,
                  row && row.statsKey,
                  item.id,
                  item.productId,
                  item.businessProductId,
                  item.productKey,
                  item.feedId
                ].map(detailSlug).filter(Boolean);
                const rowTitle = detailSlug((row && row.title) || item.title || item.name || item.productName || item.productTitle);
                const rowBusiness = detailSlug(item.businessName || item.business || item.sellerName || item.storeName || item.actor || item.ownerName);
                let score = 0;
                if (rowIds.some((id) => wantedIds.has(id))) score += 100;
                if (wantedTitle && rowTitle === wantedTitle) score += 50;
                else if (wantedTitle && rowTitle && (rowTitle.indexOf(wantedTitle) >= 0 || wantedTitle.indexOf(rowTitle) >= 0)) score += 20;
                if (wantedBusiness && rowBusiness === wantedBusiness) score += 10;
                if (!score) return;
                const count = Math.max(0, Number(row && row.views) || 0);
                if (score > bestScore || score === bestScore && count > best) {
                  bestScore = score;
                  best = count;
                }
              });
            } catch (error) {}
            return best;
          }
          function detailProductViewCountForCard(card, details) {
            const record = detailProductViewRecordForCard(card, details || detailsFromCard(card));
            const state = detailFeedStateForCard(card);
            let centralCount = 0;
            try {
              if (card && window.emyEngagement && typeof window.emyEngagement.viewCountForCard === "function") {
                centralCount = Number(window.emyEngagement.viewCountForCard(card)) || 0;
              }
            } catch (error) {}
            return Math.max(
              detailProductViewRowsForCard(card, details).length,
              Number(record && record.total) || 0,
              Number(state && state.viewCount) || 0,
              centralCount,
              detailProductStoredViewFallback(card, details),
              detailBusinessProductPerformanceViewFallback(card, details)
            );
          }
          function detailOwnerActivityTime(value) {
            const time = new Date(value || 0).getTime();
            if (!Number.isFinite(time) || time <= 0) return "Recent";
            try {
              const date = new Date(time);
              const now = new Date();
              const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
              const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
              const timeText = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
              if (day === today) return "Today at " + timeText;
              if (day === today - 24 * 60 * 60 * 1000) return "Yesterday at " + timeText;
              if (day > today - 7 * 24 * 60 * 60 * 1000) return date.toLocaleDateString("en-GB", { weekday: "short" }) + " at " + timeText;
              return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) + " at " + timeText;
            } catch (error) {
              return "Recent";
            }
          }
          function detailOwnerActivityName(item) {
            return cleanText(item && (item.viewerName || item.repostedBy || item.actorName || item.name || item.author || item.key || item.email)) || "A customer";
          }
          function detailOwnerActivityHref(item) {
            const href = cleanText(item && (item.viewerHref || item.customerHref || item.profileHref || item.repostedByHref || item.href));
            const key = cleanText(item && (item.customerKey || item.viewerKey || item.key || item.email || item.name));
            if (/^(?:\.\/)?emy-customer-profile\.html$/i.test(href) && key && key.toLowerCase() !== "customer") return "emy-customer-profile.html?customer=" + encodeURIComponent(key);
            if (/^(?:\.\/)?emy-[a-z0-9-]+\.html(?:[?#][^"'<>\s]*)?$/i.test(href)) return href;
            return "emy-customer-profile.html" + (key && key.toLowerCase() !== "customer" ? "?customer=" + encodeURIComponent(key) : "");
          }
          function detailOwnerPhotoSrc(value) {
            const text = cleanText(value);
            return /^(data:image\/|blob:|https?:\/\/|\/|\.\.?\/)/i.test(text) ? text : "";
          }
          function detailOwnerPhotoRef(value) {
            const text = cleanText(value);
            if (!text || detailOwnerPhotoSrc(text)) return "";
            if (text.length <= 2 && /^[a-z0-9]+$/i.test(text)) return "";
            return text;
          }
          function detailOwnerFirstMedia(values, resolver) {
            for (const value of values) {
              const media = resolver(value);
              if (media) return media;
            }
            return "";
          }
          function detailOwnerDirectActivityPhoto(item) {
            const srcValues = item ? [item.viewerPhoto, item.customerPhoto, item.actorPhoto, item.repostedByPhoto, item.avatarSrc, item.avatar, item.profilePhoto, item.photo, item.photoSrc, item.image, item.imageSrc] : [];
            const refValues = item ? [item.viewerPhotoRef, item.customerPhotoRef, item.actorPhotoRef, item.repostedByPhotoRef, item.avatarRef, item.profilePhotoRef, item.photoRef, item.imageRef, item.avatarSrc, item.avatar, item.profilePhoto, item.photo] : [];
            return {
              src: detailOwnerFirstMedia(srcValues, detailOwnerPhotoSrc),
              ref: detailOwnerFirstMedia(refValues, detailOwnerPhotoRef)
            };
          }
          function detailOwnerActivityIdentityKeys(item) {
            const raw = item && typeof item === "object" ? item : {};
            const values = [
              raw.viewerKey,
              raw.customerKey,
              raw.actorKey,
              raw.repostedByKey,
              raw.key,
              raw.email,
              raw.viewerEmail,
              raw.customerEmail,
              raw.name,
              raw.viewerName,
              raw.customerName,
              raw.actorName,
              raw.repostedBy,
              raw.author
            ];
            const href = cleanText(raw.viewerHref || raw.customerHref || raw.profileHref || raw.repostedByHref || raw.actorHref || raw.href);
            if (href) {
              try {
                const params = new URL(href, window.location.href).searchParams;
                values.push(params.get("customer"), params.get("customerKey"), params.get("email"));
              } catch (error) {}
            }
            const keys = new Set();
            values.forEach((value) => {
              const clean = cleanText(value);
              if (!clean) return;
              keys.add(clean.toLowerCase());
              const slug = detailSlug(clean);
              if (slug) keys.add(slug);
              if (clean.indexOf("@") > 0) {
                const emailName = clean.split("@")[0];
                keys.add(emailName.toLowerCase());
                const emailSlug = detailSlug(emailName);
                if (emailSlug) keys.add(emailSlug);
              }
            });
            return keys;
          }
          function detailOwnerCurrentCustomerKeys() {
            const first = cleanText(localStorage.getItem("emyCustomerFirstName") || localStorage.getItem("emyMainPendingSignupFirstName"));
            const last = cleanText(localStorage.getItem("emyCustomerLastName") || localStorage.getItem("emyMainPendingSignupLastName"));
            const fullName = cleanText([first, last].filter(Boolean).join(" "));
            const values = [
              "customer-profile",
              localStorage.getItem("emyCustomerProfileKey"),
              localStorage.getItem("emyCustomerKey"),
              localStorage.getItem("emyMainSignedInEmail"),
              localStorage.getItem("emyMainPendingSignupEmail"),
              localStorage.getItem("emyCustomerDisplayName"),
              currentUserDisplayName(),
              fullName
            ];
            const keys = new Set();
            values.forEach((value) => {
              const clean = cleanText(value);
              if (!clean) return;
              keys.add(clean.toLowerCase());
              const slug = detailSlug(clean);
              if (slug) keys.add(slug);
              if (clean.indexOf("@") > 0) {
                const emailName = clean.split("@")[0];
                keys.add(emailName.toLowerCase());
                const emailSlug = detailSlug(emailName);
                if (emailSlug) keys.add(emailSlug);
              }
            });
            return keys;
          }
          function detailOwnerKeysOverlap(left, right) {
            for (const key of left) {
              if (right.has(key)) return true;
            }
            return false;
          }
          function detailOwnerActivityIsCurrentBusiness(item) {
            if (detailPersonRole(item) !== "business") return false;
            return detailOwnerKeysOverlap(detailOwnerActivityIdentityKeys(item), currentBusinessIdentitySet());
          }
          function detailOwnerStoredCustomerPhoto(item) {
            if (detailPersonRole(item) === "business") return { src: "", ref: "" };
            const keys = detailOwnerActivityIdentityKeys(item);
            if (!keys.size || !detailOwnerKeysOverlap(keys, detailOwnerCurrentCustomerKeys())) return { src: "", ref: "" };
            const pendingRole = cleanText(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase();
            return {
              src: cleanText(localStorage.getItem("emyCustomerProfilePhoto") || localStorage.getItem("emyCustomerProfilePhotoSrc") || (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhoto") : "") || (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoSrc") : "")),
              ref: cleanText(localStorage.getItem("emyCustomerProfilePhotoRef") || (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : ""))
            };
          }
          function detailOwnerNotificationPhoto(item) {
            const keys = detailOwnerActivityIdentityKeys(item);
            if (!keys.size) return { src: "", ref: "" };
            try {
              for (let index = 0; index < localStorage.length; index += 1) {
                const storageKey = localStorage.key(index) || "";
                if (storageKey.indexOf("emyBusinessNotifications:") !== 0) continue;
                const rows = JSON.parse(localStorage.getItem(storageKey) || "[]");
                if (!Array.isArray(rows)) continue;
                for (const row of rows) {
                  if (!row || typeof row !== "object") continue;
                  const rowKeys = detailOwnerActivityIdentityKeys({
                    viewerKey: row.customerKey || row.actorKey || row.key,
                    customerKey: row.customerKey || row.actorKey || row.key,
                    email: row.customerEmail || row.email,
                    name: row.customerName || row.actorName || row.author || row.name,
                    href: row.actorHref || row.customerHref || row.href
                  });
                  if (!detailOwnerKeysOverlap(keys, rowKeys)) continue;
                  const media = detailOwnerDirectActivityPhoto(row);
                  if (media.src || media.ref) return media;
                }
              }
            } catch (error) {}
            return { src: "", ref: "" };
          }
          function detailOwnerActivityPhoto(item) {
            const direct = detailOwnerDirectActivityPhoto(item);
            if (direct.src || direct.ref) return direct;
            const stored = detailOwnerStoredCustomerPhoto(item);
            if (stored.src || stored.ref) return stored;
            return detailOwnerNotificationPhoto(item);
          }
          function detailOwnerActivityAvatarMarkup(row) {
            const name = cleanText(row && row.name) || "Customer";
            const href = detailOwnerActivityHref(row);
            const media = detailOwnerActivityPhoto(row);
            const initial = (name.charAt(0) || "C").toUpperCase();
            const image = media.src || media.ref
              ? '<img' + (media.src ? ' src="' + escapeDetail(media.src) + '"' : '') + (media.ref ? ' data-emy-media-ref="' + escapeDetail(media.ref) + '"' : '') + ' alt="" />'
              : '<span>' + escapeDetail(initial) + '</span>';
            return '<a class="item-product-owner-activity-avatar' + (media.src || media.ref ? ' has-image' : '') + '" href="' + escapeDetail(href) + '" aria-label="Open ' + escapeDetail(name) + ' profile">' + image + '</a>';
          }
          function detailOwnerActivityRowMarkup(row) {
            const name = cleanText(row && row.name) || "A customer";
            const href = detailOwnerActivityHref(row);
            const detailText = cleanText(row && row.detail);
            const actionText = cleanText(row && row.action) + (detailText ? ": " + detailText : "");
            return '<div class="item-product-owner-activity-row" data-owner-activity-type="' + escapeDetail(row && row.type || "activity") + '">' + detailOwnerActivityAvatarMarkup(row) + '<a class="item-product-owner-activity-main" href="' + escapeDetail(href) + '"><strong>' + escapeDetail(name) + '</strong><span>' + escapeDetail(actionText) + '</span></a><small>' + escapeDetail(detailOwnerActivityTime(row && row.at)) + '</small></div>';
          }
          function detailOwnerActivityKey(card, details) {
            const data = card && card.dataset ? card.dataset : {};
            return cleanText(detailFeedId(card) || data.businessProductId || data.productId || data.feedId || details && details.title || "product");
          }
          function detailOwnerActivityVisibleCount(key, filter, total) {
            const saved = productOwnerActivity && productOwnerActivity.dataset.activityKey === key && productOwnerActivity.dataset.activityFilter === filter ? Number(productOwnerActivity.dataset.visibleCount) || 0 : 0;
            return Math.min(total, Math.max(10, saved || 10));
          }
          function detailOwnerActivityTypeLabel(type) {
            const clean = cleanText(type).toLowerCase();
            if (clean === "views") return "views";
            if (clean === "likes") return "likes";
            if (clean === "comments") return "comments";
            if (clean === "shares") return "shares";
            if (clean === "reposts") return "reposts";
            if (clean === "saved") return "saves";
            return "actions";
          }
          function detailOwnerActionTypeFromText(value) {
            const text = cleanText(value).toLowerCase();
            if (/comment|reply/.test(text)) return "comments";
            if (/repost/.test(text)) return "reposts";
            if (/share/.test(text)) return "shares";
            if (/sav/.test(text)) return "saved";
            if (/like/.test(text)) return "likes";
            if (/view|open/.test(text)) return "views";
            return "";
          }
          function detailOwnerActivityAction(type) {
            if (type === "views") return "viewed this product";
            if (type === "likes") return "liked this product";
            if (type === "comments") return "commented";
            if (type === "shares") return "shared this product";
            if (type === "reposts") return "reposted this product";
            if (type === "saved") return "saved this product";
            return "interacted with this product";
          }
          function detailOwnerNotificationMatches(row, card, details) {
            const info = details || {};
            const title = cleanText(info.title).toLowerCase();
            const kind = cleanText(info.kind).toLowerCase();
            const ids = new Set(detailFeedIdsForCard(card).map((id) => cleanText(id).toLowerCase()).filter(Boolean));
            const ref = row && row.ref && typeof row.ref === "object" ? row.ref : {};
            const rowIds = [row && row.feedId, row && row.itemId, ref.feedId, ref.id, ref.originalId].map((id) => cleanText(id).toLowerCase()).filter(Boolean);
            if (rowIds.some((id) => ids.has(id))) return true;
            const itemTitle = cleanText(row && (row.itemTitle || row.productTitle || row.title || ref.title)).toLowerCase();
            if (title && itemTitle && (itemTitle === title || itemTitle.indexOf(title) >= 0 || title.indexOf(itemTitle) >= 0)) return true;
            const rowKind = cleanText(row && (row.itemKind || row.kind || ref.kind || ref.type)).toLowerCase();
            const body = cleanText(row && row.body).toLowerCase();
            return !!title && !!kind && rowKind && kind.indexOf(rowKind) >= 0 && body.indexOf(title) >= 0;
          }
          function detailOwnerNotificationRows(card, details) {
            const rows = [];
            const info = details || {};
            const businessName = activeChatBusinessName || cleanText(info.business) || inferProductBusiness(card, info) || "Business";
            const businessKey = activeChatBusinessKey || businessKeyFromDetails(card, info, businessName);
            detailBusinessNotificationKeys(businessKey, businessName).forEach((key) => {
              detailRowsFromStorageKey("emyBusinessNotifications:" + key).forEach((item) => {
                if (!item || typeof item !== "object" || !detailOwnerNotificationMatches(item, card, info)) return;
                const type = detailOwnerActionTypeFromText([item.type, item.ref && item.ref.action, item.body].filter(Boolean).join(" "));
                if (!type) return;
                rows.push({
                  name: cleanText(item.customerName || item.actorName || item.name) || "A customer",
                  action: detailOwnerActivityAction(type),
                  detail: type === "comments" ? cleanText(item.body).replace(/^.+?:\s*/, "") : "",
                  at: cleanText(item.createdAt || item.at),
                  href: cleanText(item.actorHref || item.customerHref || item.href),
                  photo: cleanText(item.customerPhoto || item.avatarSrc || item.avatar),
                  photoRef: cleanText(item.customerPhotoRef || item.avatarRef),
                  key: cleanText(item.customerKey || item.actorKey || item.key || item.email || item.customerName || item.actorName),
                  type,
                  order: 1000 + rows.length
                });
              });
            });
            return rows;
          }
          function detailOwnerUniqueActivityRows(rows) {
            const seen = new Set();
            return (Array.isArray(rows) ? rows : []).filter((row) => {
              const key = [row.type, row.key || row.name, row.detail, row.at].map((value) => cleanText(value).toLowerCase()).join("|");
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            });
          }
          function detailOwnerActivityRows(card, details) {
            const rows = [];
            let order = 0;
            const push = (person, action, detail, at, type) => {
              const source = person && typeof person === "object" ? person : {};
              const name = typeof person === "string" ? cleanText(person) : detailOwnerActivityName(person);
              const media = detailOwnerActivityPhoto(source);
              rows.push({
                name: name || "A customer",
                action: cleanText(action),
                detail: cleanText(detail),
                at: cleanText(at),
                href: detailOwnerActivityHref(source),
                photo: media.src,
                photoRef: media.ref,
                key: cleanText(source.viewerKey || source.customerKey || source.key || source.email || name),
                type: cleanText(type || detailOwnerActionTypeFromText(action) || "activity").toLowerCase(),
                order: order++
              });
            };
            const state = detailFeedStateForCard(card);
            detailProductViewRowsForCard(card, details).forEach((item) => push(item, "viewed this product", "", item && item.at, "views"));
            (Array.isArray(state.likedBy) ? state.likedBy : []).forEach((item) => push(item, "liked this product", "", item && item.at, "likes"));
            (Array.isArray(state.savedBy) ? state.savedBy : []).forEach((item) => push(item, "saved this product", "", item && item.at, "saved"));
            (Array.isArray(state.sharedBy) ? state.sharedBy : []).forEach((item) => push(item, "shared this product", "", item && item.at, "shares"));
            (Array.isArray(state.repostedBy) ? state.repostedBy : []).forEach((item) => push(item, "reposted this product", "", item && item.at, "reposts"));
            detailFlattenCommentRows(detailCommentsForCard(card)).forEach((row) => {
              const comment = row.comment || {};
              push(comment, row.isReply ? "replied" : "commented", comment.text, comment.at || comment.createdAt, "comments");
              if (comment.liked || Number(comment.likes) > 0) {
                const liker = comment.liked && typeof detailCurrentPersonSnapshot === "function" ? detailCurrentPersonSnapshot() : comment;
                push(Object.assign({}, liker, { at: comment.at || comment.createdAt }), row.isReply ? "liked a reply" : "liked a comment", comment.text, comment.at || comment.createdAt, "likes");
              }
            });
            (Array.isArray(state.commentLikedBy) ? state.commentLikedBy : []).forEach((item) => push(item, item && item.isReply ? "liked a reply" : "liked a comment", item && item.text, item && item.at, "likes"));
            readDetailReposts().filter((item) => detailRepostMatches(item, card, details || {})).forEach((item) => push(item, "reposted this product", item && (item.thought || item.text || item.comment), item && (item.createdAt || item.repostedAt || item.at), "reposts"));
            return detailOwnerUniqueActivityRows(rows.concat(detailOwnerNotificationRows(card, details))).sort((a, b) => {
              const aTime = new Date(a.at || 0).getTime();
              const bTime = new Date(b.at || 0).getTime();
              if (Number.isFinite(aTime) && Number.isFinite(bTime) && aTime !== bTime) return bTime - aTime;
              return a.order - b.order;
            });
          }
          function detailOwnerMetricMarkup(type, label, value, note, activeFilter) {
            const active = activeFilter === type;
            return '<button type="button" class="item-product-owner-metric' + (active ? ' is-active' : '') + '" data-item-product-owner-filter="' + escapeDetail(type) + '" aria-pressed="' + (active ? 'true' : 'false') + '" aria-label="Open ' + escapeDetail(label) + ' activity"><span>' + escapeDetail(label) + '</span><strong>' + escapeDetail(formatEngagementCount(value)) + '</strong><small>' + escapeDetail(note) + '</small></button>';
          }
          function openOwnerProductComments() {
            if (!productComments) return;
            productComments.hidden = false;
            const card = activeDetailCard;
            const details = activeDetailDetails || (card ? detailsFromCard(card) : {});
            const counts = detailCountsFromCard(card, details);
            const label = modal.classList.contains("is-article") ? "article" : modal.classList.contains("is-post") ? "post" : "product";
            renderProductCommentList(
              inferProductBusiness(card, details),
              details.title,
              counts.comments,
              modal.classList.contains("is-article") ? "article" : modal.classList.contains("is-post") ? "post" : "product"
            );
            const firstReply = productCommentList && productCommentList.querySelector("[data-item-product-comment-reply]");
            productSectionScroll(productComments, firstReply || productCommentInput, "Public comments opened for this " + label + ". Use Reply under a comment to respond.");
          }
          function renderProductOwnerPanel(card, details, counts) {
            if (!productOwnerPanel) return;
            const safeCounts = counts || detailCountsFromCard(card, details);
            const views = detailProductViewCountForCard(card, details);
            if (productOwnerNote) productOwnerNote.textContent = "Click a stat to see the customers and actions behind it. Comments opens the public comment thread so you can respond.";
            const activityKey = detailOwnerActivityKey(card, details);
            const activeFilter = productOwnerActivity && productOwnerActivity.dataset.activityKey === activityKey ? (productOwnerActivity.dataset.activityFilter || "all") : "all";
            const metricRows = [
              ["views", "Views", views, "All-time product opens"],
              ["likes", "Likes", safeCounts.likes, "All-time customer likes"],
              ["comments", "Comments", safeCounts.comments, "All-time public comments"],
              ["reposts", "Reposts", safeCounts.reposts, "All-time reposts"]
            ];
            const metricTotals = metricRows.reduce((map, row) => {
              map[row[0]] = Number(row[2]) || 0;
              return map;
            }, {});
            const aggregateMetricTotal = Object.keys(metricTotals).reduce((total, key) => total + Math.max(0, Number(metricTotals[key]) || 0), 0);
            if (productOwnerMetrics) {
              productOwnerMetrics.innerHTML = metricRows.map((row) => detailOwnerMetricMarkup(row[0], row[1], row[2], row[3], activeFilter)).join("");
              productOwnerMetrics.querySelectorAll("[data-item-product-owner-filter]").forEach((button) => {
                button.addEventListener("click", () => {
                  const filter = cleanText(button.dataset.itemProductOwnerFilter).toLowerCase();
                  if (productOwnerActivity) {
                    productOwnerActivity.dataset.activityFilter = filter;
                    productOwnerActivity.dataset.visibleCount = "10";
                  }
                  if (filter === "comments") openOwnerProductComments();
                  renderProductOwnerPanel(card, details, safeCounts);
                });
              });
            }
            const allActivityRows = detailOwnerActivityRows(card, details);
            const filter = activeFilter && activeFilter !== "all" ? activeFilter : "all";
            const filteredRows = filter === "all" ? allActivityRows : allActivityRows.filter((row) => row && row.type === filter);
            const visibleCount = detailOwnerActivityVisibleCount(activityKey, filter, filteredRows.length);
            const activityRows = filteredRows.slice(0, visibleCount);
            if (productOwnerActivityTotal) {
              const total = filter === "all" ? Math.max(allActivityRows.length, aggregateMetricTotal) : metricTotals[filter] || filteredRows.length;
              productOwnerActivityTotal.textContent = filter === "all"
                ? total + " all-time action" + (total === 1 ? "" : "s")
                : formatEngagementCount(total) + " " + detailOwnerActivityTypeLabel(filter);
            }
            if (productOwnerActivity) {
              productOwnerActivity.dataset.activityKey = activityKey;
              productOwnerActivity.dataset.activityFilter = filter;
              productOwnerActivity.dataset.visibleCount = String(visibleCount);
              const remaining = Math.max(0, filteredRows.length - visibleCount);
              const aggregateOnly = filter !== "all" && !activityRows.length && (metricTotals[filter] || 0) > 0;
              const emptyText = aggregateOnly
                ? formatEngagementCount(metricTotals[filter]) + " " + detailOwnerActivityTypeLabel(filter) + " are counted for this product, but individual customer records were not saved yet."
                : filter === "all" ? "No customer activity saved for this product yet." : "No " + detailOwnerActivityTypeLabel(filter) + " saved for this product yet.";
              productOwnerActivity.innerHTML = activityRows.length
                ? activityRows.map(detailOwnerActivityRowMarkup).join("") + (remaining ? '<button type="button" class="item-product-owner-activity-more" data-item-product-owner-activity-more>Load ' + Math.min(10, remaining) + ' more</button>' : "")
                : '<p class="item-product-owner-empty">' + escapeDetail(emptyText) + '</p>';
              const moreActivity = productOwnerActivity.querySelector("[data-item-product-owner-activity-more]");
              if (moreActivity) {
                moreActivity.addEventListener("click", () => {
                  productOwnerActivity.dataset.visibleCount = String(Math.min(filteredRows.length, visibleCount + 10));
                  renderProductOwnerPanel(card, details, safeCounts);
                });
              }
              if (window.emyHydrateFeedMedia) {
                try { window.emyHydrateFeedMedia(productOwnerActivity); } catch (error) {}
              }
            }
            if (productOwnerStats) {
              const sourceStatsButton = card && card.querySelector ? card.querySelector("[data-business-product-stats]") : null;
              productOwnerStats.hidden = !sourceStatsButton;
              productOwnerStats.onclick = () => {
                if (!sourceStatsButton) {
                  setProductFeedback("Full stats are available from your business Products section.");
                  return;
                }
                setModalOpen(false);
                window.setTimeout(() => {
                  const statsCard = sourceStatsButton.closest("[data-business-product-id]");
                  const statsId = statsCard && statsCard.dataset ? statsCard.dataset.businessProductId : "";
                  if (statsId && typeof window.emyOpenBusinessProductStats === "function") {
                    window.emyOpenBusinessProductStats(statsId, "all");
                    return;
                  }
                  sourceStatsButton.click();
                }, 0);
              };
            }
          }
          function detailEngagementMessage(action, label) {
            const itemLabel = cleanText(label || "item");
            const actorName = currentUserDisplayName();
            if (action === "like") return actorName + " liked your " + itemLabel + ".";
            if (action === "save") return actorName + " saved your " + itemLabel + ".";
            return actorName + " interacted with your " + itemLabel + ".";
          }
          function detailRecordOwnerEngagementAction(action, active, previousActive, options) {
            const data = options && typeof options === "object" ? options : {};
            const card = data.card || activeDetailCard;
            const details = data.details || activeDetailDetails || (card ? detailsFromCard(card) : null);
            if (!card || !details || detailBusinessOwnsItem(card, details)) return;
            const state = detailFeedStateForCard(card);
            const counts = detailCountsFromCard(card, details);
            const beforeCounts = data.beforeCounts || {};
            const patch = {};
            if (action === "like") {
              const previousLikedBy = detailPeopleListWithCurrent(state.likedBy, !!previousActive);
              const nextLikedBy = detailPeopleListWithCurrent(previousLikedBy, !!active);
              const previousPeople = detailPeopleCount(previousLikedBy);
              const nextPeople = detailPeopleCount(nextLikedBy);
              const visibleLikes = Math.max(
                0,
                Number(beforeCounts.likes) || 0,
                Number(counts.likes) || 0,
                Number(state.countedLikeCount) || 0,
                previousPeople
              );
              const baseLikes = Math.max(
                0,
                Number(state.baseLikeCount) || 0,
                visibleLikes - previousPeople
              );
              patch.liked = false;
              patch.baseLikeCount = baseLikes;
              patch.countedLikeCount = Math.max(0, baseLikes + nextPeople);
              patch.likeCount = patch.countedLikeCount;
              patch.likedBy = nextLikedBy;
            } else if (action === "save") {
              const nextSavedBy = detailPeopleListWithCurrent(state.savedBy, !!active);
              patch.saved = false;
              patch.baseSavedCount = 0;
              patch.savedCount = detailPeopleCount(nextSavedBy);
              patch.savedBy = nextSavedBy;
              detailSetSavedFeedItem(card, details, !!active);
            } else {
              return;
            }
            detailUpdateFeedStateForCard(card, patch);
            if (!!active && !previousActive) {
              detailNotifyCardOwnerAction(card, details, action, (label) => detailEngagementMessage(action, label));
            }
            if (card === activeDetailCard) {
              window.setTimeout(() => {
                syncDetailModalFromSource(card, details);
                if (productOwnerPanel && !productOwnerPanel.hidden) renderProductOwnerPanel(card, details, detailCountsFromCard(card, details));
              }, 0);
            }
          }
          function detailSourceActionButton(card, action) {
            if (!card) return null;
            const selectors = {
              like: '[data-feed-action="like"], [data-feed-like]',
              repost: '[data-feed-action="repost"], [data-feed-repost]',
              save: '[data-feed-action="save"], [data-feed-save], .social-feed-save, [data-heart]'
            };
            return selectors[action] ? card.querySelector(selectors[action]) : null;
          }
          function detailSourceActionActive(card, action) {
            const state = detailFeedStateForCard(card);
            const button = detailSourceActionButton(card, action);
            if (action === "like") return detailActionActive(state, "likedBy");
            if (action === "save") return detailActionActive(state, "savedBy");
            if (action === "repost") return detailActionActive(state, "repostedBy");
            return !!(button && button.classList.contains("is-active"));
          }
          function detailDispatchSourceAction(action) {
            const button = detailSourceActionButton(activeDetailCard, action);
            if (!button) return false;
            if (window.emyEngagement && typeof window.emyEngagement.update === "function") {
              window.emyEngagement.update(activeDetailCard, action);
              syncDetailModalFromSource(activeDetailCard, activeDetailDetails);
              return true;
            }
            const previousActive = detailSourceActionActive(activeDetailCard, action);
            const beforeCounts = detailCountsFromCard(activeDetailCard, activeDetailDetails || detailsFromCard(activeDetailCard));
            button.dataset.detailSyntheticAction = "1";
            button.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
            window.setTimeout(() => {
              delete button.dataset.detailSyntheticAction;
              const active = detailSourceActionActive(activeDetailCard, action);
              detailRecordOwnerEngagementAction(action, active, previousActive, { beforeCounts });
              syncDetailModalFromSource(activeDetailCard, activeDetailDetails);
            }, 0);
            return true;
          }
          function detailActionFromSourceButton(button) {
            if (!button) return "";
            const explicit = cleanText(button.dataset && button.dataset.feedAction).toLowerCase();
            if (["like", "save"].includes(explicit)) return explicit;
            if (button.matches("[data-feed-like]")) return "like";
            if (button.matches("[data-feed-save], .social-feed-save, [data-heart]")) return "save";
            return "";
          }
          function bindDirectFeedEngagementTracking() {
            document.addEventListener("click", (event) => {
              const button = event.target && event.target.closest ? event.target.closest("[data-feed-action], [data-feed-like], [data-feed-save], .social-feed-save, [data-heart]") : null;
              if (!button || button.dataset.detailSyntheticAction === "1" || button.closest("[data-item-detail-modal]")) return;
              const action = detailActionFromSourceButton(button);
              if (!action) return;
              if (window.emyEngagement && typeof window.emyEngagement.update === "function") return;
              const card = button.closest(cardSelector);
              if (!card || card.hidden || card.closest("[hidden]")) return;
              const details = detailsFromCard(card);
              const previousActive = action === "share" ? false : detailSourceActionActive(card, action);
              const beforeCounts = detailCountsFromCard(card, details);
              window.setTimeout(() => {
                const active = action === "share" ? true : detailSourceActionActive(card, action);
                detailRecordOwnerEngagementAction(action, active, previousActive, { card, details, beforeCounts });
              }, 0);
            }, true);
          }
          function syncDetailModalFromSource(card, details) {
            if (!card || !details) return;
            if (!productPanel || productPanel.hidden) return;
            const counts = detailCountsFromCard(card, details);
            if (productLikeCount) setEngagementCountText(productLikeCount, counts.likes);
            if (productCommentCount) setEngagementCountText(productCommentCount, counts.comments);
            if (productRepostCount) setEngagementCountText(productRepostCount, counts.reposts);
            if (productSaveCount) setEngagementCountText(productSaveCount, counts.saved);
            if (productLike) productLike.classList.toggle("is-active", detailSourceActionActive(card, "like"));
            if (productSocialSave) productSocialSave.classList.toggle("is-active", detailSourceActionActive(card, "save"));
            setProductSavedState(detailSourceActionActive(card, "save"));
            updateDetailRepostUi(card, details);
            const detailKindText = cleanText(details.kind).toLowerCase();
            renderProductCommentList(inferProductBusiness(card, details), details.title, counts.comments, detailKindText.includes("article") ? "article" : detailKindText.includes("post") ? "post" : "product");
          }
          function detailSubmitCommentToSource(value) {
            const card = activeDetailCard;
            if (!card || !value) return false;
            const actor = typeof detailCurrentPersonSnapshot === "function" ? detailCurrentPersonSnapshot() : {};
            const actorName = cleanText(actor && actor.name) || currentUserDisplayName();
            const now = new Date().toISOString();
            const comment = { id: "comment-" + Date.now(), name: actorName, author: actorName, text: value, likes: 0, dislikes: 0, liked: false, disliked: false, own: true, mine: true, role: cleanText(actor && actor.role), actorType: cleanText(actor && actor.role), key: cleanText(actor && actor.key), email: cleanText(actor && actor.email), photo: cleanText(actor && actor.photo), photoRef: cleanText(actor && actor.photoRef), href: cleanText(actor && actor.href), createdAt: now, at: now, replies: [] };
            const comments = detailCommentsForCard(card).concat(comment);
            detailApplyCommentsToSource(card, comments);
            const formInput = card.querySelector("[data-feed-comment-form] input, [data-feed-comment-form] textarea");
            if (formInput) formInput.value = "";
            if (modal.classList.contains("is-post") || modal.classList.contains("is-product") || modal.classList.contains("is-article")) {
              const label = modal.classList.contains("is-product") ? "product" : modal.classList.contains("is-article") ? "article" : "post";
              notifyPostOwner("comment", actorName + " commented on your " + label + ": " + cleanText(value));
            }
            syncDetailModalFromSource(card, activeDetailDetails || detailsFromCard(card));
            const postedText = cleanText(value);
            const hasVisibleRow = detailModalCommentsFromDom().some((item) => cleanText(item && item.text) === postedText && cleanText(item && (item.name || item.author)) === actorName);
            if (!hasVisibleRow && productCommentList) {
              productCommentList.insertAdjacentHTML("beforeend", renderProductComment(comment));
              detailCommitModalComments("");
            }
            return true;
          }
          function detailAvatarFromCard(card) {
            const data = card && card.dataset ? card.dataset : {};
            const info = activeDetailDetails || detailMergeRecoveredDetails(card, detailsFromCard(card));
            if (detailCardLooksBusinessOwned(card, info || {})) {
              const liveBusinessPhoto = cleanText(currentBusinessProfilePhoto());
              if (liveBusinessPhoto) return liveBusinessPhoto;
            }
            if (detailCustomerOwnsItem(card, info || {})) {
              const livePhoto = cleanText(currentUserPhotoSrc());
              if (livePhoto) return livePhoto;
              const copiedPhoto = cleanText(info && (info.viewerPhoto || info.customerPhoto || info.actorPhoto || info.ownerPhoto || info.avatarSrc || info.profilePhoto)) || cleanText(data.detailAvatarSrc || data.profilePhoto || data.avatarSrc || data.photo);
              return detailDirectMediaValue(copiedPhoto);
            }
            const direct = cleanText(info && info.avatarSrc) || cleanText(data.detailAvatarSrc || data.profilePhoto || data.avatarSrc || data.businessPhoto || data.businessAvatar || data.businessLogo || data.logo || data.photo);
            const directSrc = /^(data:image|blob:|https?:\/\/)/i.test(direct) ? direct : "";
            const avatar = card && card.querySelector && card.querySelector(".home-created-avatar img, .social-feed-avatar img, .feed-avatar img, .post-avatar img, .reel-avatar img, .business-preview-post-avatar img, .my-business-avatar img, [data-detail-avatar] img");
            const src = directSrc || cleanText(avatar && (avatar.currentSrc || avatar.src || avatar.getAttribute("src")));
            if (src) return src;
            const businessName = cleanText(info && info.business) || cleanText(data.detailBusiness || data.businessName || data.business);
            const businessKey = cleanText(info && info.businessKey) || cleanText(data.businessKey || data.detailBusinessKey);
            const businessImage = detailBusinessImageFromStorage(businessKey, businessName);
            if (detailCardLooksBusinessOwned(card, info || {})) return detailDirectMediaValue(businessImage.profilePhoto) || cleanText(currentBusinessProfilePhoto());
            return detailDirectMediaValue(businessImage.profilePhoto) || (isOwnedPostDetail(card, info || {}) && detailCardLooksCustomerOwned(card, info || {}) ? currentUserPhotoSrc() : "");
          }
          function detailAvatarRefFromCard(card) {
            const data = card && card.dataset ? card.dataset : {};
            const info = activeDetailDetails || detailMergeRecoveredDetails(card, detailsFromCard(card));
            if (detailCardLooksBusinessOwned(card, info || {})) {
              const liveBusinessRef = cleanText(currentBusinessProfilePhotoRef());
              if (liveBusinessRef) return detailMediaRefValue("", liveBusinessRef);
            }
            if (detailCustomerOwnsItem(card, info || {})) {
              const liveRef = cleanText(currentUserPhotoRef());
              if (liveRef) return detailMediaRefValue("", liveRef);
              const copiedRef = cleanText(info && (info.viewerPhotoRef || info.customerPhotoRef || info.actorPhotoRef || info.ownerPhotoRef || info.avatarRef || info.profilePhotoRef)) || cleanText(data.detailAvatarRef || data.profilePhotoRef || data.avatarRef || data.photoRef);
              const copiedSrc = cleanText(info && (info.viewerPhoto || info.customerPhoto || info.actorPhoto || info.ownerPhoto || info.avatarSrc || info.profilePhoto)) || cleanText(data.detailAvatarSrc || data.profilePhoto || data.avatarSrc || data.photo);
              return detailMediaRefValue(copiedSrc, copiedRef);
            }
            const direct = cleanText(data.detailAvatarRef || data.profilePhotoRef || data.avatarRef || data.businessPhotoRef || data.businessAvatarRef || data.businessLogoRef || data.logoRef || data.photoRef);
            const directSrc = cleanText(info && info.avatarSrc) || cleanText(data.detailAvatarSrc || data.profilePhoto || data.avatarSrc || data.businessPhoto || data.businessAvatar || data.businessLogo || data.logo || data.photo);
            const recoveredRef = detailMediaRefValue(directSrc, cleanText(info && info.avatarRef) || direct);
            const businessName = cleanText(info && info.business) || cleanText(data.detailBusiness || data.businessName || data.business);
            const businessKey = cleanText(info && info.businessKey) || cleanText(data.businessKey || data.detailBusinessKey);
            const businessImage = detailBusinessImageFromStorage(businessKey, businessName);
            const avatar = card && card.querySelector && card.querySelector(".home-created-avatar img, .social-feed-avatar img, .feed-avatar img, .post-avatar img, .reel-avatar img, .business-preview-post-avatar img, .my-business-avatar img, [data-detail-avatar] img");
            return recoveredRef || detailMediaRefValue(businessImage.profilePhoto, businessImage.profilePhotoRef) || detailMediaRefValue(cleanText(avatar && (avatar.currentSrc || avatar.src || avatar.getAttribute("src"))), cleanText(avatar && avatar.dataset && avatar.dataset.emyMediaRef));
          }
          function setDetailBusinessAvatar(card) {
            if (!business) return;
            const info = activeDetailDetails || detailMergeRecoveredDetails(card, detailsFromCard(card));
            const displayName = cleanText(business.textContent) || (detailCustomerOwnsItem(card, info || {}) ? detailOwnedPostDisplayName(card, info || {}) : cleanText(info && info.business));
            const initial = detailInitialFromName(displayName, detailCustomerOwnsItem(card, info || {}) ? currentUserInitial() : "B");
            const canShowProfileMark = modal.classList.contains("is-post") || modal.classList.contains("is-article");
            business.setAttribute("data-avatar-initial", initial);
            const src = detailAvatarFromCard(card);
            const ref = src ? "" : detailAvatarRefFromCard(card);
            business.classList.toggle("has-avatar", !!src && canShowProfileMark);
            business.classList.toggle("has-initial", !src && canShowProfileMark && !!initial);
            if (src) {
              business.classList.remove("has-initial");
              business.style.setProperty("--item-detail-avatar", 'url("' + src.replace(/"/g, "%22") + '")');
            }
            else if (ref && typeof window.emyResolveFeedMedia === "function") {
              const currentCard = card;
              window.emyResolveFeedMedia(ref).then((record) => {
                const url = cleanText(record && (record.url || record.src));
                if (!url || activeDetailCard !== currentCard) return;
                business.classList.remove("has-initial");
                business.classList.toggle("has-avatar", modal.classList.contains("is-post") || modal.classList.contains("is-article"));
                business.style.setProperty("--item-detail-avatar", 'url("' + url.replace(/"/g, "%22") + '")');
              }).catch(() => {});
            } else business.style.removeProperty("--item-detail-avatar");
          }
          function detailFeedback(message) {
            if (!message) return;
            if (typeof showToast === "function") {
              showToast(message);
              return;
            }
            setProductFeedback(message);
          }
          function detailRepostSlug(value) {
            return cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "item";
          }
          function detailOptionalRepostSlug(value) {
            const text = cleanText(value);
            return text ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) : "";
          }
          function detailIsBusinessRepost(details) {
            return cleanText(details && details.kind).toLowerCase().includes("business");
          }
          function detailAddBusinessRepostKey(keys, value) {
            const slug = detailOptionalRepostSlug(value);
            if (!slug) return;
            keys.add(slug);
            ["search-business", "business-profile", "business-card", "detail-business"].forEach((prefix) => {
              if (slug.indexOf(prefix + "-") === 0) keys.add(slug.slice(prefix.length + 1));
            });
          }
          function detailBusinessRepostKeys(card, details) {
            const data = card && card.dataset ? card.dataset : {};
            const keys = new Set();
            [
              details && details.business,
              details && details.title,
              data.detailBusiness,
              data.detailTitle,
              data.businessKey,
              data.detailBusinessKey,
              data.repostOriginalId,
              data.originalFeedId,
              data.feedId,
              data.detailRepostId
            ].forEach((value) => detailAddBusinessRepostKey(keys, value));
            return Array.from(keys).filter(Boolean);
          }
          function detailBusinessPrimaryRepostKey(card, details) {
            const keys = detailBusinessRepostKeys(card, details);
            const generic = { business:true, profile:true, "business-profile":true, "this-business":true, item:true };
            return keys.find((key) => !generic[key]) || keys[0] || "profile";
          }
          function detailBusinessRepostId(card, details) {
            if (!detailIsBusinessRepost(details)) return "";
            return "business-profile-" + detailBusinessPrimaryRepostKey(card, details);
          }
          function detailRepostId(card, details) {
            const businessId = detailBusinessRepostId(card, details);
            if (businessId) {
              if (card && card.dataset) card.dataset.detailRepostId = businessId;
              return businessId;
            }
            if (card && card.dataset) {
              if (card.dataset.repostOriginalId) return card.dataset.repostOriginalId;
              if (card.dataset.originalFeedId) return card.dataset.originalFeedId;
              if (card.dataset.feedId) return card.dataset.feedId;
              if (card.dataset.detailRepostId) return card.dataset.detailRepostId;
            }
            const nextId = "detail-" + detailRepostSlug((details && details.kind) || "item") + "-" + detailRepostSlug((details && details.business) || "business") + "-" + detailRepostSlug((details && details.title) || "details");
            if (card && card.dataset) card.dataset.detailRepostId = nextId;
            return nextId;
          }
          function readDetailReposts() {
            try {
              const parsed = JSON.parse(localStorage.getItem("emyFeedReposts") || "[]");
              const items = Array.isArray(parsed) ? parsed : [];
              return window.emyRepairFeedRepostMedia ? window.emyRepairFeedRepostMedia(items, { persist: true }) : items;
            } catch (error) {
              return [];
            }
          }
          function writeDetailReposts(items) {
            try {
              localStorage.setItem("emyFeedReposts", JSON.stringify(Array.isArray(items) ? items : []));
              window.dispatchEvent(new CustomEvent("emy:feed-reposts-changed", { detail: { key: "emyFeedReposts" } }));
              return true;
            } catch (error) {
              detailFeedback("EMY could not save the repost because browser storage is full.");
              return false;
            }
          }
          function detailRepostRecordId(item) {
            return cleanText(item && (item.originalId || item.originalFeedId || item.feedId || (item.original && item.original.id)));
          }
          function detailRepostRecordLooksBusiness(item) {
            const original = item && item.original || {};
            const kind = cleanText(original.kind || item && (item.kind || item.detailKind)).toLowerCase();
            const id = detailOptionalRepostSlug(detailRepostRecordId(item));
            return kind.includes("business") || id.indexOf("search-business-") === 0 || id.indexOf("business-profile-") === 0 || id.indexOf("detail-business-") === 0;
          }
          function detailRepostRecordBusinessKeys(item) {
            const original = item && item.original || {};
            const keys = new Set();
            [
              item && item.businessKey,
              item && item.key,
              item && item.detailBusinessKey,
              item && item.originalKey,
              item && item.business,
              item && item.name,
              item && item.title,
              original.key,
              original.businessKey,
              original.detailBusinessKey,
              original.business,
              original.name,
              original.title,
              detailRepostRecordId(item)
            ].forEach((value) => detailAddBusinessRepostKey(keys, value));
            return keys;
          }
          function detailRepostMatches(item, card, details) {
            const id = detailRepostId(card, details);
            const originalId = detailRepostRecordId(item);
            if (originalId && originalId === id) return true;
            if (!detailIsBusinessRepost(details) || !detailRepostRecordLooksBusiness(item)) return false;
            const wantedKeys = detailBusinessRepostKeys(card, details);
            const wantedIds = new Set([id]);
            wantedKeys.forEach((key) => {
              wantedIds.add(key);
              wantedIds.add("search-business-" + key);
              wantedIds.add("business-profile-" + key);
              wantedIds.add("detail-business-" + key);
            });
            if (wantedIds.has(detailOptionalRepostSlug(originalId))) return true;
            const recordKeys = detailRepostRecordBusinessKeys(item);
            return wantedKeys.some((key) => recordKeys.has(key));
          }
          function detailRepostCount(card, details) {
            return readDetailReposts().filter((item) => detailRepostMatches(item, card, details)).length;
          }
          function detailRepostText(count) {
            const total = readEngagementCount(count);
            return formatEngagementCount(total) + " repost" + (total === 1 ? "" : "s");
          }
          function detailBaseStatText(value) {
            const clean = String(value || "").replace(/\s*(?:\u00b7|\u2022)\s*\d+(?:\.\d+)?\s*[kKmM]?\s+reposts?$/i, "").trim();
            return clean || "0 likes";
          }
          function detailKindLabel(details) {
            const kindText = cleanText(details && details.kind).toLowerCase();
            if (kindText.includes("business")) return "Business";
            if (kindText.includes("clip")) return "Clip";
            if (kindText.includes("product")) return "Product";
            if (kindText.includes("article")) return "Article";
            if (kindText.includes("event")) return "Event";
            return "Post";
          }
          function setDetailRepostButton(button, countNode, count) {
            if (countNode) setEngagementCountText(countNode, count);
            if (!button) return;
            button.classList.toggle("is-active", count > 0);
            button.setAttribute("aria-pressed", count > 0 ? "true" : "false");
            button.setAttribute("aria-label", detailRepostText(count));
          }
          function updateDetailRepostUi(card, details) {
            const count = detailRepostCount(card, details);
            setDetailRepostButton(productRepost, productRepostCount, count);
            setDetailRepostButton(businessRepost, businessRepostCount, count);
            return count;
          }
          function syncDetailRepostCardState(card, details) {
            if (!card) return;
            const count = detailRepostCount(card, details);
            const stat = card.querySelector("[data-feed-stat]");
            if (stat) stat.textContent = detailBaseStatText(stat.textContent) + " \u00b7 " + detailRepostText(count);
            const productStats = card.querySelector(".product-stats");
            if (productStats) {
              let productRepostStat = productStats.querySelector("[data-product-repost-stat]");
              if (!productRepostStat) {
                productRepostStat = document.createElement("span");
                productRepostStat.setAttribute("data-product-repost-stat", "true");
                productStats.appendChild(productRepostStat);
              }
              productRepostStat.textContent = detailRepostText(count);
            }
            card.querySelectorAll("[data-feed-repost], [data-feed-action='repost']").forEach((button) => {
              button.querySelectorAll("[data-feed-repost-count]").forEach((node) => node.remove());
              button.classList.toggle("is-active", count > 0);
              button.setAttribute("aria-label", count === 1 ? "1 repost" : count + " reposts");
            });
            detailSetCountText(card, "[data-feed-repost-count], [data-home-created-repost-count]", count);
            detailSyncSourceFooter(card);
          }
          function detailRepostRecordFrom(card, details, thought) {
            if (!details) return null;
            const id = detailRepostId(card, details);
            const businessKey = detailIsBusinessRepost(details) ? detailBusinessPrimaryRepostKey(card, details) : (card && card.dataset ? (card.dataset.businessKey || "") : "");
            const actor = detailRepostActorIdentity();
            return {
              id: "repost-" + id + "-" + Date.now(),
              originalId: id,
              repostedAt: new Date().toISOString(),
              repostedBy: actor.name,
              repostedByType: actor.type,
              actorType: actor.type,
              owner: actor.type,
              repostedByKey: actor.key,
              repostedByHref: actor.href,
              profileHref: actor.href,
              repostedByPhoto: actor.photo,
              repostedByAvatar: actor.photo,
              avatarSrc: actor.photo,
              thought: cleanText(thought),
              repostThought: cleanText(thought),
              original: {
                id,
                key: businessKey,
                businessKey,
                business: details.business || "Business",
                kind: detailKindLabel(details),
                title: details.title || "Feed update",
                text: details.description || "",
                media: details.mediaClass || "feed",
                mediaSrc: details.mediaSrc || "",
                mediaRef: details.mediaRef || "",
                mediaType: details.mediaType || "",
                duration: details.duration || "",
                articleBody: details.articleBody || "",
                articleShare: details.articleShare || "",
                articleReadTime: details.articleReadTime || "",
                price: details.price || "",
                meta: Array.isArray(details.meta) ? details.meta.join("|") : "",
                href: "emy-customer-home.html#feeds"
              }
            };
          }
          function saveDetailRepost(card, details, thought) {
            const record = detailRepostRecordFrom(card, details, thought);
            if (!record || !record.original || !record.original.id) return false;
            const items = readDetailReposts().filter((item) => !detailRepostMatches(item, card, details));
            items.unshift(record);
            if (!writeDetailReposts(items.slice(0, 60))) return false;
            updateDetailRepostUi(card, details);
            syncDetailRepostCardState(card, details);
            detailNotifyOwnerAction("repost", (label) => currentUserDisplayName() + " reposted your " + label + ".");
            detailFeedback(detailKindLabel(details) + " reposted to your feed.");
            return true;
          }
          function removeDetailRepost(card, details) {
            const id = detailRepostId(card, details);
            if (!id) return false;
            const items = readDetailReposts();
            const next = items.filter((item) => !detailRepostMatches(item, card, details));
            if (next.length === items.length) return false;
            if (!writeDetailReposts(next)) return false;
            updateDetailRepostUi(card, details);
            syncDetailRepostCardState(card, details);
            detailFeedback("Repost removed.");
            return true;
          }
          function toggleDetailRepost(card, details, afterRemove) {
            if (detailRepostCount(card, details) > 0) {
              if (removeDetailRepost(card, details) && typeof afterRemove === "function") afterRemove();
              return true;
            }
            return false;
          }
          function openDetailRepostDialog(card, details, afterSubmit) {
            const sourceCard = card || activeDetailCard;
            const sourceDetails = details || activeDetailDetails || (sourceCard ? detailsFromCard(sourceCard) : null);
            if (!sourceDetails) return;
            const existing = document.querySelector("[data-emy-repost-dialog]");
            if (existing) existing.remove();
            const dialog = document.createElement("div");
            dialog.className = "emy-repost-dialog is-open";
            dialog.setAttribute("data-emy-repost-dialog", "true");
            dialog.innerHTML =
              '<div class="emy-repost-card" role="dialog" aria-modal="true" aria-labelledby="emy-detail-repost-title">' +
                '<div class="emy-repost-head"><div><strong id="emy-detail-repost-title">Repost on EMY</strong><span>Add your thoughts or repost it straight to your feed.</span></div><button class="emy-repost-close" type="button" data-emy-repost-cancel aria-label="Close">x</button></div>' +
                '<div class="emy-repost-body"><div class="emy-repost-source">' + escapeDetail(sourceDetails.title || sourceDetails.business || "This update") + '</div><textarea data-emy-repost-text maxlength="500" placeholder="Add your thoughts..." aria-label="Add your thoughts"></textarea><div class="emy-repost-actions"><button class="emy-repost-cancel" type="button" data-emy-repost-cancel>Cancel</button><button class="emy-repost-submit" type="button" data-emy-repost-submit>Repost</button></div></div>' +
              '</div>';
            const close = () => dialog.remove();
            const submit = () => {
              const textarea = dialog.querySelector("[data-emy-repost-text]");
              const thought = textarea ? textarea.value : "";
              close();
              if (saveDetailRepost(sourceCard, sourceDetails, thought) && typeof afterSubmit === "function") afterSubmit();
            };
            dialog.addEventListener("click", (event) => { if (event.target === dialog) close(); });
            dialog.addEventListener("keydown", (event) => {
              if (event.key === "Escape") close();
              if ((event.ctrlKey || event.metaKey) && event.key === "Enter") submit();
            });
            dialog.querySelectorAll("[data-emy-repost-cancel]").forEach((button) => button.addEventListener("click", close));
            const submitButton = dialog.querySelector("[data-emy-repost-submit]");
            if (submitButton) submitButton.addEventListener("click", submit);
            document.body.appendChild(dialog);
            const textarea = dialog.querySelector("[data-emy-repost-text]");
            if (textarea) textarea.focus();
          }
          function productSectionScroll(section, focusNode, message) {
            if (!section) return;
            [productComments, productChatSection].forEach((node) => node && node.classList.remove("is-highlighted"));
            section.classList.add("is-highlighted");
            if (productDetailScroll && typeof section.offsetTop === "number") {
              const topGap = section === productChatSection ? 58 : 8;
              productDetailScroll.scrollTo({ top: Math.max(0, section.offsetTop - productDetailScroll.offsetTop - topGap), behavior: "smooth" });
            } else if (section.scrollIntoView) {
              section.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
            window.setTimeout(() => section.classList.remove("is-highlighted"), 1400);
            if (focusNode && focusNode.focus) window.setTimeout(() => focusNode.focus(), 260);
            setProductFeedback(message);
          }
          function cleanGalleryClass(value) {
            return String(value || "").split(/\s+/).filter(Boolean).slice(0, 3).join(" ");
          }
          function productGalleryItems(details, image, video) {
            const mediaBase = cleanGalleryClass(details.mediaClass) || "tech";
            const titleText = cleanText(details.title) || "Product";
            const detailMediaSrc = cleanText(details.mediaSrc);
            const detailMediaType = cleanText(details.mediaType).toLowerCase();
            const detailMediaRef = cleanText(details.mediaRef);
            const detailMediaItems = Array.isArray(details.mediaItems) ? details.mediaItems : [];
            const firstImageItem = detailMediaItems.find((item) => item && item.type !== "video") || null;
            const secondImageItem = detailMediaItems.filter((item) => item && item.type !== "video")[1] || null;
            const thirdImageItem = detailMediaItems.filter((item) => item && item.type !== "video")[2] || null;
            const videoItem = detailMediaItems.find((item) => item && item.type === "video") || null;
            const imageRef = cleanText(image && image.dataset && image.dataset.emyMediaRef) || cleanText(firstImageItem && firstImageItem.ref) || (detailMediaType === "image" ? detailMediaRef : "");
            const videoRef = cleanText(video && video.dataset && video.dataset.emyMediaRef) || cleanText(videoItem && videoItem.ref) || (detailMediaType === "video" ? detailMediaRef : "");
            const sourceImage = imageRef ? "" : (image && image.src ? image.src : cleanText(firstImageItem && firstImageItem.src) || (detailMediaType === "image" ? detailMediaSrc : ""));
            const sourceVideo = videoRef ? "" : (video && video.src ? video.src : cleanText(videoItem && videoItem.src) || (detailMediaType === "video" ? detailMediaSrc : ""));
            const detailImageRef = cleanText(secondImageItem && secondImageItem.ref);
            const detailImageSrc = detailImageRef ? "" : cleanText(secondImageItem && secondImageItem.src);
            const inUseImageRef = cleanText(thirdImageItem && thirdImageItem.ref);
            const inUseImageSrc = inUseImageRef ? "" : cleanText(thirdImageItem && thirdImageItem.src);
            const posterRef = cleanText(videoItem && videoItem.posterRef) || cleanText(details.posterRef);
            const posterSrc = posterRef ? "" : (cleanText(videoItem && videoItem.posterSrc) || cleanText(details.posterSrc));
            const firstSettings = Object.assign({}, firstImageItem && firstImageItem.settings || {});
            const detailSettings = Object.assign({}, secondImageItem && secondImageItem.settings || firstSettings);
            const inUseSettings = Object.assign({}, thirdImageItem && thirdImageItem.settings || firstSettings);
            const videoSettings = Object.assign({}, videoItem && videoItem.settings || firstSettings);
            return [
              { label: "Main", note: "Product photo", mediaClass: mediaBase, imageSrc: sourceImage, imageRef, videoSrc: "", videoRef: "", settings: firstSettings },
              { label: "Detail", note: "Closer view", mediaClass: mediaBase + " angle-detail", imageSrc: detailImageSrc, imageRef: detailImageRef, videoSrc: "", videoRef: "", settings: detailSettings },
              { label: "In use", note: "Seller photo", mediaClass: mediaBase + " angle-use", imageSrc: inUseImageSrc, imageRef: inUseImageRef, videoSrc: "", videoRef: "", settings: inUseSettings },
              { label: "Video", note: "Business video", mediaClass: mediaBase + " angle-video", imageSrc: posterSrc, imageRef: "", videoSrc: sourceVideo, videoRef, posterSrc, posterRef, isVideo: true, settings: videoSettings }
            ].filter((item) => item.imageSrc || item.imageRef || item.videoSrc || item.videoRef).map((item) => Object.assign({ title: titleText }, item));
          }
          function detailMediaInlineStyle(settings, compact) {
            const data = settings && typeof settings === "object" ? settings : {};
            const fit = cleanText(data.fit) || (compact ? "cover" : "contain");
            const zoom = Number(data.zoom);
            const x = Number(data.x);
            const y = Number(data.y);
            const overlayX = Number(data.overlayX);
            const overlayY = Number(data.overlayY);
            const aspect = cleanText(data.aspect && data.aspect !== "auto" ? data.aspect : data.naturalAspect);
            return ' style="--media-fit:' + escapeDetail(fit) + ';--media-zoom:' + escapeDetail(Number.isFinite(zoom) && zoom > 0 ? zoom : 1) + ';--media-x:' + escapeDetail(Number.isFinite(x) ? x : 0) + '%;--media-y:' + escapeDetail(Number.isFinite(y) ? y : 0) + '%;--overlay-x:' + escapeDetail(Number.isFinite(overlayX) ? overlayX : 50) + '%;--overlay-y:' + escapeDetail(Number.isFinite(overlayY) ? overlayY : 84) + '%;' + (aspect ? '--media-aspect-ratio:' + escapeDetail(aspect) + ';' : '') + '"';
          }
          function detailMediaOverlayMarkup(settings) {
            const overlay = cleanText(settings && settings.overlay);
            return overlay ? '<span class="emy-media-overlay-text">' + escapeDetail(overlay) + '</span>' : "";
          }
          function productGalleryFrame(item, index) {
            const active = index === 0 ? " is-active" : "";
            const visual = item.videoSrc || item.videoRef
              ? (window.emyVideoPlayerMarkup ? window.emyVideoPlayerMarkup(item.videoSrc || "", item.title || "Business video", item.videoRef || "", item.posterSrc || "", item.posterRef || "") : '<video' + (item.videoSrc ? ' src="' + escapeDetail(item.videoSrc) + '"' : '') + (item.videoRef ? ' data-emy-media-ref="' + escapeDetail(item.videoRef) + '"' : '') + (item.posterSrc ? ' poster="' + escapeDetail(item.posterSrc) + '"' : '') + (item.posterRef ? ' data-emy-poster-ref="' + escapeDetail(item.posterRef) + '"' : '') + ' muted playsinline preload="metadata"></video>')
              : item.imageSrc || item.imageRef
                ? '<img' + (item.imageSrc ? ' src="' + escapeDetail(item.imageSrc) + '"' : '') + (item.imageRef ? ' data-emy-media-ref="' + escapeDetail(item.imageRef) + '"' : '') + ' alt="" />'
                : "";
            return '<div class="item-product-gallery-frame ' + escapeDetail(item.mediaClass) + active + '" data-item-product-gallery-frame="' + index + '"' + detailMediaInlineStyle(item.settings, false) + '>' +
              visual + detailMediaOverlayMarkup(item.settings) +
            '</div>';
          }
          function productGalleryThumb(item, index) {
            const active = index === 0 ? " is-active" : "";
            const visual = item.imageSrc || item.imageRef
              ? '<img' + (item.imageSrc ? ' src="' + escapeDetail(item.imageSrc) + '"' : '') + (item.imageRef ? ' data-emy-media-ref="' + escapeDetail(item.imageRef) + '"' : '') + ' alt="" />'
              : item.videoSrc || item.videoRef
                ? '<video muted playsinline preload="metadata" data-product-gallery-thumb-video="true"' + (item.videoSrc ? ' src="' + escapeDetail(item.videoSrc) + '"' : '') + (item.videoRef ? ' data-emy-media-ref="' + escapeDetail(item.videoRef) + '"' : '') + (item.posterSrc ? ' poster="' + escapeDetail(item.posterSrc) + '"' : '') + (item.posterRef ? ' data-emy-poster-ref="' + escapeDetail(item.posterRef) + '"' : '') + '></video>'
                : "";
            return '<button class="item-product-gallery-thumb ' + escapeDetail(item.mediaClass) + active + '" type="button" data-item-product-gallery-thumb="' + index + '" aria-label="Show ' + escapeDetail(item.label) + ' media"' + detailMediaInlineStyle(item.settings, true) + '>' +
              visual +
              '<span>' + escapeDetail(item.label) + '</span>' +
            '</button>';
          }
          function primeProductGalleryVideoThumbs(root) {
            const scope = root && root.querySelectorAll ? root : document;
            scope.querySelectorAll(".item-product-gallery-thumb video[data-product-gallery-thumb-video]").forEach((video) => {
              if (!video || video.dataset.emyProductThumbPrimed === "true") return;
              video.dataset.emyProductThumbPrimed = "true";
              video.muted = true;
              video.playsInline = true;
              video.setAttribute("playsinline", "");
              video.preload = "metadata";
              const reveal = () => {
                if (!video.isConnected) return;
                try {
                  const duration = Number(video.duration) || 0;
                  if (!video.poster && video.readyState >= 1 && (!video.currentTime || video.currentTime < 0.04)) {
                    video.currentTime = duration ? Math.min(0.16, Math.max(0, duration - 0.05)) : 0.04;
                  }
                } catch (error) {}
                const playPromise = video.play();
                if (playPromise && typeof playPromise.then === "function") {
                  playPromise.then(() => {
                    window.setTimeout(() => {
                      try { video.pause(); } catch (error) {}
                    }, 160);
                  }).catch(() => {});
                }
              };
              video.addEventListener("loadedmetadata", reveal);
              video.addEventListener("loadeddata", reveal);
              window.setTimeout(reveal, 140);
            });
          }
          function renderProductGallery(card, details, image, video) {
            const items = productGalleryItems(details, image, video);
            media.className = "item-detail-art";
            media.innerHTML = '<div class="item-product-gallery-stage">' +
              items.map(productGalleryFrame).join("") +
            '</div>' +
              '<div class="item-product-gallery-thumbs" aria-label="Product photos and videos">' + items.map(productGalleryThumb).join("") + '</div>';
            if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(media);
            primeProductGalleryVideoThumbs(media);
            setupVideoDurationBadges(media);
            setupEmyVideoPlayers(media);
          }
          function detailOwnerItemKind() {
            return detailOwnerItemKindForDetails(activeDetailDetails, modal);
          }
          function detailOwnerItemKindForDetails(details, surface) {
            const kindText = cleanText(details && details.kind).toLowerCase();
            const classes = surface && surface.classList;
            if ((classes && classes.contains("is-product")) || kindText.includes("product")) return "product";
            if ((classes && classes.contains("is-article")) || kindText.includes("article")) return "article";
            if ((classes && classes.contains("is-post")) || kindText.includes("post")) return "post";
            if ((classes && classes.contains("is-job")) || kindText.includes("job")) return "job";
            if ((classes && classes.contains("is-event")) || kindText.includes("event")) return "event";
            if (kindText.includes("clip")) return "clip";
            return "content";
          }
          function detailNotifyCardOwnerAction(card, details, action, bodyForKind) {
            const info = details || (card ? detailsFromCard(card) : activeDetailDetails);
            const itemKind = detailOwnerItemKindForDetails(info, card === activeDetailCard ? modal : null);
            const body = typeof bodyForKind === "function" ? bodyForKind(itemKind) : bodyForKind;
            const customerOwned = typeof detailCardLooksCustomerOwned === "function" ? detailCardLooksCustomerOwned(card, info) : detailCustomerOwnsItem(card, info);
            if (customerOwned) {
              if (card === activeDetailCard && typeof notifyCustomerOwner === "function") {
                notifyCustomerOwner(action, body, {
                  itemKind,
                  itemTitle: cleanText(info && info.title) || itemKind
                });
              }
              return;
            }
            if (!["product", "article", "post", "clip", "job", "event"].includes(itemKind) && !detailCardLooksBusinessOwned(card, info)) return;
            const businessName = card === activeDetailCard ? (activeChatBusinessName || cleanText(info && info.business) || "Business") : (inferProductBusiness(card, info) || cleanText(info && info.business) || "Business");
            const businessKey = card === activeDetailCard ? (activeChatBusinessKey || businessKeyFromDetails(card, info, businessName)) : businessKeyFromDetails(card, info, businessName);
            notifyBusinessOwner(action, body, businessKey, businessName, {
              itemKind,
              itemTitle: cleanText(info && info.title) || itemKind,
              mediaSrc: cleanText(info && info.mediaSrc),
              mediaRef: cleanText(info && info.mediaRef),
              mediaType: cleanText(info && info.mediaType),
              posterSrc: cleanText(info && info.posterSrc),
              posterRef: cleanText(info && info.posterRef)
            });
          }
          function detailNotifyOwnerAction(action, bodyForKind) {
            detailNotifyCardOwnerAction(activeDetailCard, activeDetailDetails, action, bodyForKind);
          }
          function detailNotificationSnapshot(data, itemKind, itemTitle, feedId, businessName, businessKey) {
            const extra = data && typeof data === "object" ? data : {};
            const source = extra.detailSnapshot && typeof extra.detailSnapshot === "object" ? extra.detailSnapshot : {};
            const details = activeDetailDetails || {};
            const cardData = activeDetailCard && activeDetailCard.dataset ? activeDetailCard.dataset : {};
            let mediaItems = [];
            const mediaItemsSource = source.mediaItems || extra.mediaItems;
            if (Array.isArray(mediaItemsSource)) {
              mediaItems = mediaItemsSource;
            } else if (cardData.detailMediaItems) {
              try {
                const parsed = JSON.parse(cardData.detailMediaItems);
                mediaItems = Array.isArray(parsed) ? parsed : [];
              } catch (error) {
                mediaItems = [];
              }
            }
            const cleanKind = cleanText(itemKind || source.detailKind || source.kind || details.kind || cardData.detailKind || "content");
            const cleanTitle = cleanText(itemTitle || source.itemTitle || source.title || details.title || cardData.detailTitle || cleanKind);
            const cleanBusiness = cleanText(source.businessName || source.business || businessName || details.business || cardData.detailBusiness || cardData.businessName || cardData.business || "");
            const avatarSrc = cleanText(extra.detailAvatarSrc || extra.itemAvatarSrc || source.detailAvatarSrc || source.itemAvatarSrc || source.avatarSrc || source.profilePhoto || source.businessPhoto || details.avatarSrc || cardData.detailAvatarSrc || cardData.avatarSrc || cardData.profilePhoto || cardData.businessPhoto || "");
            const avatarRef = cleanText(extra.detailAvatarRef || extra.itemAvatarRef || source.detailAvatarRef || source.itemAvatarRef || source.avatarRef || source.profilePhotoRef || source.businessPhotoRef || details.avatarRef || cardData.detailAvatarRef || cardData.avatarRef || cardData.profilePhotoRef || cardData.businessPhotoRef || "");
            const mediaSrc = cleanText(extra.mediaSrc || source.mediaSrc || source.detailMediaSrc || details.mediaSrc || cardData.detailMediaSrc || cardData.mediaSrc || "");
            const mediaRef = cleanText(extra.mediaRef || source.mediaRef || source.detailMediaRef || details.mediaRef || cardData.detailMediaRef || cardData.mediaRef || "");
            const mediaType = cleanText(extra.mediaType || source.mediaType || source.detailMediaType || details.mediaType || cardData.detailMediaType || cardData.mediaType || "");
            const posterSrc = cleanText(extra.posterSrc || source.posterSrc || source.detailPosterSrc || details.posterSrc || cardData.detailPosterSrc || cardData.posterSrc || "");
            const posterRef = cleanText(extra.posterRef || source.posterRef || source.detailPosterRef || details.posterRef || cardData.detailPosterRef || cardData.posterRef || "");
            return {
              feedId,
              id: feedId,
              kind: cleanKind,
              type: cleanKind,
              detailKind: cleanKind,
              title: cleanTitle,
              itemTitle: cleanTitle,
              description: cleanText(extra.detailDescription || source.detailDescription || source.description || details.description || cardData.detailDescription || cardData.description || cardData.text || ""),
              detailDescription: cleanText(extra.detailDescription || source.detailDescription || source.description || details.description || cardData.detailDescription || cardData.description || cardData.text || ""),
              business: cleanBusiness,
              businessName: cleanBusiness,
              businessKey: cleanText(businessKey || source.businessKey || source.key || cardData.businessKey || cardData.detailBusinessKey || ""),
              price: cleanText(extra.price || source.price || details.price || cardData.detailPrice || cardData.price || ""),
              media: cleanText(extra.media || extra.mediaClass || source.media || source.mediaClass || cardData.detailMedia || cardData.media || cleanKind),
              mediaClass: cleanText(extra.mediaClass || extra.media || source.mediaClass || source.media || cardData.detailMedia || cardData.media || cleanKind),
              mediaSrc,
              mediaRef,
              mediaType,
              posterSrc,
              posterRef,
              thumb: mediaSrc || posterSrc,
              thumbRef: mediaRef || posterRef,
              avatarSrc,
              avatarRef,
              itemAvatarSrc: avatarSrc,
              itemAvatarRef: avatarRef,
              detailAvatarSrc: avatarSrc,
              detailAvatarRef: avatarRef,
              businessPhoto: avatarSrc,
              businessPhotoRef: avatarRef,
              profilePhoto: avatarSrc,
              profilePhotoRef: avatarRef,
              mediaItems,
              meta: cleanText(extra.meta || source.meta || cardData.detailMeta || cardData.meta || "")
            };
          }
          function notifyBusinessOwner(action, body, businessKey, businessName, extra) {
            try {
              const data = extra && typeof extra === "object" ? extra : {};
              const cleanBusinessName = cleanText(businessName || data.businessName || "Business");
              const cleanBusinessKey = cleanText(businessKey || data.businessKey || normaliseCustomerBusinessKey(cleanBusinessName || "business"));
              const itemKind = cleanText(data.itemKind || "business");
              const itemTitle = cleanText(data.itemTitle || (activeDetailDetails && activeDetailDetails.title) || itemKind);
              const actor = detailRepostActorIdentity();
              if (actor.type === "business" && (detailIsCurrentBusinessIdentity(cleanBusinessKey) || detailIsCurrentBusinessIdentity(cleanBusinessName))) return;
              const customerName = cleanText(actor.name) || currentUserDisplayName();
              const customerPhoto = cleanText(actor.photo) || currentUserPhotoSrc();
              const customerPhotoRef = actor.type === "business" ? currentBusinessProfilePhotoRef() : detailReadStorage("emyCustomerProfilePhotoRef");
              const customerEmail = actor.type === "customer" ? cleanText(actor.email || detailReadStorage("emyMainSignedInEmail") || detailReadStorage("emyMainPendingSignupEmail")) : "";
              const customerKey = actor.type === "customer" ? cleanText(actor.key || customerEmail || customerName) : "";
              const customerHref = actor.type === "customer" ? cleanText(actor.href || ("emy-customer-profile.html" + (customerKey && customerKey.toLowerCase() !== "customer" && customerKey.toLowerCase() !== "customer-profile" ? "?customer=" + encodeURIComponent(customerKey) : ""))) : "";
              const isCustomerRelationshipAction = action === "customer-add" || action === "customer-remove";
              const mediaDetails = activeDetailDetails || {};
              const feedId = cleanText(activeDetailCard && activeDetailCard.dataset && (activeDetailCard.dataset.feedId || activeDetailCard.dataset.originalFeedId) || mediaDetails.feedId || mediaDetails.id);
              const itemDetail = detailNotificationSnapshot(data, itemKind, itemTitle, feedId, cleanBusinessName, cleanBusinessKey);
              const createdAt = new Date().toISOString();
              let bodyText = cleanText(body || data.body || customerName + " interacted with your " + itemKind + ".");
              const fallbackCustomer = currentUserDisplayName();
              if (actor.name && fallbackCustomer && bodyText.indexOf(fallbackCustomer) === 0) bodyText = actor.name + bodyText.slice(fallbackCustomer.length);
              if (actor.name && bodyText.indexOf("Stephane") === 0) bodyText = actor.name + bodyText.slice("Stephane".length);
              const notification = {
                id: (itemKind || "business") + "-" + action + "-" + (cleanBusinessKey || "business") + "-" + Date.now(),
                type: (itemKind || "business") + "-" + action,
                group: "business",
                businessKey: cleanBusinessKey,
                businessName: cleanBusinessName,
                title: data.title || cleanBusinessName + " " + itemKind + " activity",
                body: bodyText,
                itemKind,
                itemTitle,
                detailKind: itemDetail.detailKind,
                description: itemDetail.description,
                detailDescription: itemDetail.description,
                business: itemDetail.business || cleanBusinessName,
                feedId,
                itemId: feedId,
                customerKey,
                customerEmail,
                customerHref,
                customerProfileHref: customerHref,
                customerName,
                actorName: customerName,
                actorType: actor.type,
                actorKey: actor.key,
                actorHref: actor.href,
                avatar: customerPhoto,
                avatarSrc: customerPhoto,
                avatarRef: customerPhotoRef,
                customerPhoto,
                customerPhotoRef,
                itemAvatarSrc: itemDetail.avatarSrc,
                itemAvatarRef: itemDetail.avatarRef,
                detailAvatarSrc: itemDetail.avatarSrc,
                detailAvatarRef: itemDetail.avatarRef,
                businessPhoto: itemDetail.avatarSrc,
                businessPhotoRef: itemDetail.avatarRef,
                profilePhoto: itemDetail.avatarSrc,
                profilePhotoRef: itemDetail.avatarRef,
                thumb: data.thumb || data.thumbnail || itemDetail.thumb || mediaDetails.mediaSrc || mediaDetails.posterSrc || "",
                thumbRef: data.thumbRef || data.thumbnailRef || itemDetail.thumbRef || mediaDetails.mediaRef || mediaDetails.posterRef || "",
                media: itemDetail.media,
                mediaClass: itemDetail.mediaClass,
                mediaSrc: itemDetail.mediaSrc || data.mediaSrc || mediaDetails.mediaSrc || "",
                mediaRef: itemDetail.mediaRef || data.mediaRef || mediaDetails.mediaRef || "",
                mediaType: itemDetail.mediaType || data.mediaType || mediaDetails.mediaType || "",
                posterSrc: itemDetail.posterSrc || data.posterSrc || mediaDetails.posterSrc || "",
                posterRef: itemDetail.posterRef || data.posterRef || mediaDetails.posterRef || "",
                mediaItems: itemDetail.mediaItems,
                meta: itemDetail.meta,
                href: data.href || (isCustomerRelationshipAction && customerHref ? customerHref : "emy-business-profile.html?mode=business&business=" + encodeURIComponent(cleanBusinessKey || cleanBusinessName) + "&notificationAction=" + encodeURIComponent(action) + (feedId ? "&feedId=" + encodeURIComponent(feedId) : "") + (itemTitle ? "&item=" + encodeURIComponent(itemTitle) : "") + (itemKind ? "&kind=" + encodeURIComponent(itemKind) : "")),
                createdAt,
                read: false,
                unread: true,
                detailSnapshot: itemDetail,
                ref: Object.assign({}, activeChatItemContext ? Object.assign({}, activeChatItemContext) : {}, data.ref && typeof data.ref === "object" ? data.ref : {}, itemDetail, { feedId, action, title: itemTitle, kind: itemKind, customerKey, customerName, customerHref, customerProfileHref: customerHref, customerEmail, actorKey: actor.key, actorHref: actor.href })
              };
              const keys = detailBusinessNotificationKeys(cleanBusinessKey, cleanBusinessName);
              (keys.length ? keys : [cleanBusinessKey || cleanBusinessName || "business"]).forEach((key) => detailPushNotification("emyBusinessNotifications:" + key, notification, 80));
              try { window.dispatchEvent(new CustomEvent("emy:business-notification-created", { detail: { businessKey: cleanBusinessKey, businessName: cleanBusinessName, action } })); } catch (eventError) {}
            } catch (error) {}
          }
          function notifyCustomerOwner(action, body, extra) {
            try {
              const data = extra && typeof extra === "object" ? extra : {};
              const actor = detailRepostActorIdentity();
              if (detailActorIsCustomerContentOwner(activeDetailCard, actor)) return;
              const itemKind = cleanText(data.itemKind || detailOwnerItemKind() || "content");
              const itemTitle = cleanText(data.itemTitle || (activeDetailDetails && activeDetailDetails.title) || itemKind);
              const actorName = cleanText(actor.name) || "Business";
              const actorPhoto = cleanText(actor.photo) || currentBusinessProfilePhoto();
              const actorPhotoRef = actor.type === "business" ? currentBusinessProfilePhotoRef() : detailReadStorage("emyCustomerProfilePhotoRef");
              const mediaDetails = activeDetailDetails || {};
              const feedId = cleanText(activeDetailCard && activeDetailCard.dataset && (activeDetailCard.dataset.feedId || activeDetailCard.dataset.originalFeedId) || mediaDetails.feedId || mediaDetails.id);
              const itemDetail = detailNotificationSnapshot(data, itemKind, itemTitle, feedId, cleanText(data.businessName || mediaDetails.business || activeChatBusinessName || actorName), cleanText(data.businessKey || activeChatBusinessKey || ""));
              let bodyText = cleanText(body || data.body || actorName + " interacted with your " + itemKind + ".");
              const fallbackCustomer = currentUserDisplayName();
              if (fallbackCustomer && bodyText.indexOf(fallbackCustomer) === 0) bodyText = actorName + bodyText.slice(fallbackCustomer.length);
              if (bodyText.indexOf("Stephane") === 0) bodyText = actorName + bodyText.slice("Stephane".length);
              const notification = {
                id: "customer-" + (itemKind || "content") + "-" + action + "-" + Date.now(),
                type: "customer-" + (itemKind || "content") + "-" + action,
                group: "important",
                title: "Your " + itemKind + " has new activity",
                body: bodyText,
                itemKind,
                itemTitle,
                detailKind: itemDetail.detailKind,
                description: itemDetail.description,
                detailDescription: itemDetail.description,
                business: itemDetail.business,
                feedId,
                itemId: feedId,
                actorName,
                actorType: actor.type,
                actorKey: actor.key,
                actorHref: actor.href,
                businessName: actor.type === "business" ? actorName : "",
                avatar: actorPhoto,
                avatarSrc: actorPhoto,
                avatarRef: actorPhotoRef,
                itemAvatarSrc: itemDetail.avatarSrc,
                itemAvatarRef: itemDetail.avatarRef,
                detailAvatarSrc: itemDetail.avatarSrc,
                detailAvatarRef: itemDetail.avatarRef,
                businessPhoto: itemDetail.avatarSrc,
                businessPhotoRef: itemDetail.avatarRef,
                profilePhoto: itemDetail.avatarSrc,
                profilePhotoRef: itemDetail.avatarRef,
                thumb: data.thumb || data.thumbnail || itemDetail.thumb || mediaDetails.mediaSrc || mediaDetails.posterSrc || "",
                thumbRef: data.thumbRef || data.thumbnailRef || itemDetail.thumbRef || mediaDetails.mediaRef || mediaDetails.posterRef || "",
                media: itemDetail.media,
                mediaClass: itemDetail.mediaClass,
                mediaSrc: itemDetail.mediaSrc || data.mediaSrc || mediaDetails.mediaSrc || "",
                mediaRef: itemDetail.mediaRef || data.mediaRef || mediaDetails.mediaRef || "",
                mediaType: itemDetail.mediaType || data.mediaType || mediaDetails.mediaType || "",
                posterSrc: itemDetail.posterSrc || data.posterSrc || mediaDetails.posterSrc || "",
                posterRef: itemDetail.posterRef || data.posterRef || mediaDetails.posterRef || "",
                mediaItems: itemDetail.mediaItems,
                meta: itemDetail.meta,
                href: data.href || ((itemKind.toLowerCase().indexOf("clip") >= 0 || itemKind.toLowerCase().indexOf("reel") >= 0) ? "emy-customer-home.html" : itemKind.toLowerCase().indexOf("product") >= 0 ? "emy-customer-search.html" : "emy-customer-home.html") + "?notificationAction=" + encodeURIComponent(action) + (feedId ? "&feedId=" + encodeURIComponent(feedId) : "") + (itemTitle ? "&item=" + encodeURIComponent(itemTitle) : "") + (itemKind ? "&kind=" + encodeURIComponent(itemKind) : "") + ((itemKind.toLowerCase().indexOf("clip") >= 0 || itemKind.toLowerCase().indexOf("reel") >= 0) ? "#reels" : itemKind.toLowerCase().indexOf("product") >= 0 ? "#products" : "#feeds"),
                createdAt: new Date().toISOString(),
                read: false,
                unread: true,
                detailSnapshot: itemDetail,
                ref: Object.assign({}, activeChatItemContext ? Object.assign({}, activeChatItemContext) : {}, data.ref && typeof data.ref === "object" ? data.ref : {}, itemDetail, { feedId, action, title: itemTitle, kind: itemKind })
              };
              detailPushNotification("emyCustomerNotifications", notification, 80);
              try { window.dispatchEvent(new CustomEvent("emy:customer-notification-created", { detail: { action, itemKind, itemTitle } })); } catch (eventError) {}
            } catch (error) {}
          }
          function notifyPostOwner(action, body) {
            const details = activeDetailDetails || {};
            const itemKind = detailOwnerItemKind();
            if (detailCardLooksCustomerOwned(activeDetailCard, details)) {
              notifyCustomerOwner(action, body, {
                itemKind,
                itemTitle: cleanText(details.title) || itemKind
              });
              return;
            }
            const businessName = activeChatBusinessName || cleanText(details.business) || "Business";
            const businessKey = activeChatBusinessKey || businessKeyFromDetails(activeDetailCard, details, businessName) || normaliseCustomerBusinessKey(businessName || "business");
            notifyBusinessOwner(action, body, businessKey, businessName, {
              itemKind,
              itemTitle: cleanText(details.title) || itemKind
            });
          }
          function renderProductCommentList(businessName, titleText, commentTotal, context) {
            if (!productCommentList) return;
            if (productCommentPreviewAvatar) {
              const photo = currentUserPhotoSrc();
              const photoRef = currentUserPhotoRef();
              productCommentPreviewAvatar.className = "item-product-comment-avatar" + (photo || photoRef ? " has-image" : "");
              productCommentPreviewAvatar.innerHTML = photo || photoRef ? '<img' + (photo ? ' src="' + escapeDetail(photo) + '"' : '') + (photoRef ? ' data-emy-media-ref="' + escapeDetail(photoRef) + '"' : '') + ' alt="" />' : escapeDetail(currentUserInitial());
            }
            const sourceComments = detailCommentsForCard(activeDetailCard);
            const total = Math.max(readEngagementCount(commentTotal), detailCommentThreadCount(sourceComments));
            const countText = formatEngagementCount(total) + (total === 1 ? " comment" : " comments");
            if (productCommentTotal) productCommentTotal.textContent = countText;
            if (productCommentCount) setEngagementCountText(productCommentCount, total);
            const starter = sourceComments;
            productCommentList.innerHTML = starter.map(renderProductComment).join("");
          }
          function renderProductComment(item) {
            const likes = Number(item && item.likes) || 0;
            const dislikes = Number(item && item.dislikes) || 0;
            const author = cleanText(item && (item.author || item.name)) || currentUserDisplayName();
            const details = activeDetailDetails || (activeDetailCard ? detailsFromCard(activeDetailCard) : {});
            const mine = detailCommentOwnForViewer(item, author, activeDetailCard, details);
            const authorRole = detailCommentAuthorRole(item, activeDetailCard, details) || cleanText(item && (item.role || item.actorType || item.accountRole)).toLowerCase();
            const accountKey = cleanText(item && (item.key || item.actorKey || item.accountKey || item.customerKey || item.businessKey || item.viewerKey));
            const accountEmail = cleanText(item && (item.email || item.accountEmail || item.customerEmail || item.viewerEmail));
            const accountHref = cleanText(item && (item.href || item.profileHref || item.customerHref || item.viewerHref));
            const identityAttrs = (authorRole ? ' data-item-product-comment-author-role="' + escapeDetail(authorRole) + '" data-comment-author-role="' + escapeDetail(authorRole) + '"' : '') + (accountKey ? ' data-item-product-comment-account-key="' + escapeDetail(accountKey) + '" data-comment-account-key="' + escapeDetail(accountKey) + '"' : '') + (accountEmail ? ' data-item-product-comment-email="' + escapeDetail(accountEmail) + '" data-comment-email="' + escapeDetail(accountEmail) + '"' : '') + (accountHref ? ' data-item-product-comment-href="' + escapeDetail(accountHref) + '" data-comment-href="' + escapeDetail(accountHref) + '"' : '');
            const liked = detailCommentReactionActive(item, "like", activeDetailCard, details);
            const disliked = detailCommentReactionActive(item, "dislike", activeDetailCard, details);
            const replies = Array.isArray(item && item.replies) ? item.replies.map((reply) => renderProductCommentReply(reply)).join("") : "";
            const ownActions = mine
              ? '<button class="item-product-comment-edit" type="button" data-item-product-comment-edit aria-label="Edit comment" title="Edit">' + actionIcon("edit") + '</button><button class="item-product-comment-delete" type="button" data-item-product-comment-delete aria-label="Delete comment" title="Delete">' + actionIcon("delete") + '</button>'
              : "";
            const commentId = escapeDetail(item && (item.id || item.commentId || item.createdAt || item.at) || "");
            const createdAt = cleanText(item && (item.createdAt || item.at || item.postedAt));
            const createdAtAttrs = createdAt ? ' data-item-product-comment-created-at="' + escapeDetail(createdAt) + '" data-comment-created-at="' + escapeDetail(createdAt) + '"' : "";
            return '<div class="item-product-comment-row" data-item-product-comment-row' + (commentId ? ' data-item-product-comment-id="' + commentId + '" data-comment-id="' + commentId + '"' : '') + createdAtAttrs + (mine ? ' data-own-comment="true"' : '') + identityAttrs + '>' + currentUserAvatarMarkup("item-product-comment-avatar", author, mine, item && item.initial || author, item && item.photo, item && item.photoRef, accountHref) + '<span class="item-product-comment-bubble"><strong>' + escapeDetail(author) + '</strong><span class="item-product-comment-text" data-item-product-comment-text>' + escapeDetail(item && item.text || "") + '</span><span class="item-product-comment-actions"><button class="item-product-comment-like' + (liked ? ' is-active' : '') + '" type="button" data-item-product-comment-like aria-pressed="' + (liked ? 'true' : 'false') + '" aria-label="Like comment" title="Like">' + actionIcon("like") + '<span data-item-product-comment-like-count data-raw-count="' + likes + '">' + formatEngagementCount(likes) + '</span></button><button class="item-product-comment-dislike' + (disliked ? ' is-active' : '') + '" type="button" data-item-product-comment-dislike aria-pressed="' + (disliked ? 'true' : 'false') + '" aria-label="Dislike comment" title="Dislike">' + actionIcon("dislike") + '<span data-item-product-comment-dislike-count data-raw-count="' + dislikes + '">' + formatEngagementCount(dislikes) + '</span></button><button class="item-product-comment-reply" type="button" data-item-product-comment-reply aria-label="Reply to comment" title="Reply">' + actionIcon("reply") + '</button>' + ownActions + '</span><span class="item-product-comment-replies" data-item-product-comment-replies>' + replies + '</span><form class="item-product-comment-reply-form" data-item-product-comment-reply-form hidden><input type="text" placeholder="Write a reply..." aria-label="Reply to comment" /><button type="submit" aria-label="Send reply" title="Send reply">' + actionIcon("send") + '</button></form></span></div>';
          }
          function renderProductCommentReply(author, text) {
            const reply = author && typeof author === "object" ? author : { author, name: author, text };
            const name = cleanText(reply.author || reply.name) || currentUserDisplayName();
            const details = activeDetailDetails || (activeDetailCard ? detailsFromCard(activeDetailCard) : {});
            const mine = detailCommentOwnForViewer(reply, name, activeDetailCard, details);
            const authorRole = detailCommentAuthorRole(reply, activeDetailCard, details) || cleanText(reply.role || reply.actorType || reply.accountRole).toLowerCase();
            const accountKey = cleanText(reply.key || reply.actorKey || reply.accountKey || reply.customerKey || reply.businessKey || reply.viewerKey);
            const accountEmail = cleanText(reply.email || reply.accountEmail || reply.customerEmail || reply.viewerEmail);
            const accountHref = cleanText(reply.href || reply.profileHref || reply.customerHref || reply.viewerHref);
            const identityAttrs = (authorRole ? ' data-item-product-comment-author-role="' + escapeDetail(authorRole) + '" data-comment-author-role="' + escapeDetail(authorRole) + '"' : '') + (accountKey ? ' data-item-product-comment-account-key="' + escapeDetail(accountKey) + '" data-comment-account-key="' + escapeDetail(accountKey) + '"' : '') + (accountEmail ? ' data-item-product-comment-email="' + escapeDetail(accountEmail) + '" data-comment-email="' + escapeDetail(accountEmail) + '"' : '') + (accountHref ? ' data-item-product-comment-href="' + escapeDetail(accountHref) + '" data-comment-href="' + escapeDetail(accountHref) + '"' : '');
            const likes = Number(reply.likes) || 0;
            const dislikes = Number(reply.dislikes) || 0;
            const liked = detailCommentReactionActive(reply, "like", activeDetailCard, details);
            const disliked = detailCommentReactionActive(reply, "dislike", activeDetailCard, details);
            const ownActions = mine
              ? '<button class="item-product-comment-edit" type="button" data-item-product-comment-edit aria-label="Edit reply" title="Edit">' + actionIcon("edit") + '</button><button class="item-product-comment-delete" type="button" data-item-product-comment-delete aria-label="Delete reply" title="Delete">' + actionIcon("delete") + '</button>'
              : "";
            const replyId = escapeDetail(reply.id || reply.commentId || reply.replyId || reply.createdAt || reply.at || "");
            const replyCreatedAt = cleanText(reply.createdAt || reply.at || reply.postedAt);
            const replyCreatedAtAttrs = replyCreatedAt ? ' data-item-product-comment-created-at="' + escapeDetail(replyCreatedAt) + '" data-comment-created-at="' + escapeDetail(replyCreatedAt) + '"' : "";
            return '<span class="item-product-comment-reply-row" data-item-product-comment-reply-row' + (replyId ? ' data-item-product-comment-id="' + replyId + '" data-comment-id="' + replyId + '"' : '') + replyCreatedAtAttrs + (mine ? ' data-own-comment="true"' : '') + identityAttrs + '>' + currentUserAvatarMarkup("item-product-comment-avatar", name, mine, name, reply.photo, reply.photoRef, accountHref) + '<span class="item-product-comment-bubble"><strong>' + escapeDetail(name) + '</strong><span class="item-product-comment-text" data-item-product-comment-text>' + escapeDetail(reply.text || "") + '</span><span class="item-product-comment-actions"><button class="item-product-comment-like' + (liked ? ' is-active' : '') + '" type="button" data-item-product-comment-like aria-pressed="' + (liked ? 'true' : 'false') + '" aria-label="Like reply" title="Like">' + actionIcon("like") + '<span data-item-product-comment-like-count data-raw-count="' + likes + '">' + formatEngagementCount(likes) + '</span></button><button class="item-product-comment-dislike' + (disliked ? ' is-active' : '') + '" type="button" data-item-product-comment-dislike aria-pressed="' + (disliked ? 'true' : 'false') + '" aria-label="Dislike reply" title="Dislike">' + actionIcon("dislike") + '<span data-item-product-comment-dislike-count data-raw-count="' + dislikes + '">' + formatEngagementCount(dislikes) + '</span></button>' + ownActions + '</span></span></span>';
          }
          function renderProductChat(businessName, titleText, presence) {
            if (productChatStatus) {
              if (presence) setPresenceNode(productChatStatus, presence);
              else productChatStatus.textContent = "Ask about " + titleText;
            }
            if (!productChatThread) return;
            const items = readBusinessChatThread(activeChatBusinessKey, businessName);
            productChatThread.innerHTML = items.map(renderProductChatMessage).join("");
            if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(productChatThread);
            productChatThread.scrollTop = productChatThread.scrollHeight;
          }
          function businessChatStorageKey(key) {
            return "emyBusinessChatThread:" + (cleanText(key) || "business");
          }
          function detailChatSenderRole(item) {
            const explicit = cleanText(item && (item.senderRole || item.role || item.fromRole)).toLowerCase();
            if (explicit === "business" || explicit === "customer") return explicit;
            const recipient = cleanText(item && item.recipientRole).toLowerCase();
            if (recipient === "business") return "customer";
            if (recipient === "customer") return "business";
            const author = normaliseCustomerBusinessKey(item && (item.author || item.senderName || item.name));
            const businessName = normaliseCustomerBusinessKey((item && item.businessName) || detailChatBusinessName());
            const customerName = normaliseCustomerBusinessKey(item && (item.customerName || item.customer || item.customerDisplayName));
            if (author && businessName && author === businessName) return "business";
            if (author && customerName && author === customerName) return "customer";
            return item && item.mine ? "customer" : "business";
          }
          function detailChatOwnsCurrentView(item) {
            const role = activeDetailAccountRole() === "business" ? "business" : "customer";
            return detailChatSenderRole(item) === role;
          }
          function detailChatCustomerName() {
            return currentUserDisplayName();
          }
          function detailChatIdentitySlug(value) {
            return cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "customer";
          }
          function detailChatIdentityKey(email, name) {
            const emailText = cleanText(email).toLowerCase();
            if (emailText) return "email-" + detailChatIdentitySlug(emailText);
            const nameText = cleanText(name);
            if (nameText && !detailLooksPlaceholderCustomerName(nameText)) return "name-" + detailChatIdentitySlug(nameText);
            return "";
          }
          function detailChatCurrentCustomerKey() {
            return detailChatIdentityKey(detailReadStorage("emyMainSignedInEmail"), detailChatCustomerName()) || "customer-local";
          }
          function detailChatMessageCustomerKey(item) {
            const explicit = cleanText(item && (item.customerKey || item.customerId || item.customerProfileKey));
            if (explicit) return explicit;
            const email = cleanText(item && (item.customerEmail || item.email));
            if (email) return detailChatIdentityKey(email, "");
            const senderRole = detailChatSenderRole(item);
            const name = cleanText(item && (item.customerName || item.customer || item.customerDisplayName || (senderRole === "customer" ? item.author || item.senderName || item.name : "")));
            return detailChatIdentityKey("", name);
          }
          function detailChatMessageBelongsToCurrentCustomer(item) {
            const itemKey = detailChatMessageCustomerKey(item);
            return !!itemKey && itemKey === detailChatCurrentCustomerKey();
          }
          function detailAttachCurrentCustomer(item) {
            const currentKey = detailChatCurrentCustomerKey();
            return Object.assign({}, item || {}, {
              customerKey: cleanText(item && item.customerKey) || currentKey,
              customerName: cleanText(item && item.customerName) || detailChatCustomerName(),
              customerEmail: cleanText(item && item.customerEmail) || detailReadStorage("emyMainSignedInEmail")
            });
          }
          function detailChatBusinessName() {
            return activeChatBusinessName || currentBusinessDisplayName() || "Business";
          }
          function detailLooksPlaceholderCustomerName(value, businessName) {
            const text = cleanText(value);
            if (!text) return true;
            const key = normaliseCustomerBusinessKey(text);
            const businessKey = normaliseCustomerBusinessKey(businessName || detailChatBusinessName());
            if (["profile", "business-profile", "business", "your-business", "customer"].includes(key)) return true;
            return !!businessKey && key === businessKey;
          }
          function detailChatDisplayName(item) {
            const senderRole = detailChatSenderRole(item);
            const businessName = cleanText(item && item.businessName) || detailChatBusinessName();
            if (senderRole === "business") return businessName || "Business";
            const customerName = cleanText(item && (item.customerName || item.customer || item.customerDisplayName));
            if (!detailLooksPlaceholderCustomerName(customerName, businessName)) return customerName;
            const author = cleanText(item && (item.author || item.senderName || item.name));
            if (!detailLooksPlaceholderCustomerName(author, businessName)) return author;
            return detailChatCustomerName();
          }
          function detailChatMessageId(prefix) {
            return (prefix || "chat") + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
          }
          function detailReadJsonArray(key) {
            try {
              const parsed = JSON.parse(localStorage.getItem(key) || "[]");
              return Array.isArray(parsed) ? parsed : [];
            } catch (error) {
              return [];
            }
          }
          function detailWriteJsonArray(key, rows, limit) {
            try { localStorage.setItem(key, JSON.stringify((Array.isArray(rows) ? rows : []).slice(0, limit || 80))); } catch (error) {}
          }
          function detailPushNotification(key, notification, limit) {
            const rows = detailReadJsonArray(key).filter((item) => item && item.id !== notification.id);
            rows.unshift(notification);
            detailWriteJsonArray(key, rows, limit || 80);
          }
          function detailBusinessNotificationKeys(businessKey, businessName) {
            const values = [
              businessKey,
              normaliseCustomerBusinessKey(businessKey),
              detailSlug(businessKey),
              businessName,
              normaliseCustomerBusinessKey(businessName),
              detailSlug(businessName)
            ].map(cleanText).filter(Boolean);
            if (values.includes("angi-pizza-zone")) values.push("angi-pizza");
            if (values.includes("angi-pizza")) values.push("angi-pizza-zone");
            if (values.includes("ever-glow-face-wash")) values.push("ever-glow");
            if (values.includes("ever-glow")) values.push("ever-glow-face-wash");
            return Array.from(new Set(values));
          }
          function detailNotifyChatCounterpart(message, ref) {
            try {
              const senderRole = detailChatSenderRole(message);
              const businessKey = cleanText(activeChatBusinessKey || (message && message.businessKey) || normaliseCustomerBusinessKey(activeChatBusinessName || "business"));
              const businessName = cleanText(activeChatBusinessName || (message && message.businessName) || "Business");
              const customerName = cleanText(message && message.customerName) || detailChatCustomerName();
              const customerKey = detailChatMessageCustomerKey(message) || detailChatCurrentCustomerKey();
              const customerPhoto = cleanText(message && message.customerPhoto) || detailReadStorage("emyCustomerProfilePhoto") || (String(detailReadStorage("emyMainPendingSignupRole") || "").toLowerCase() === "customer" ? detailReadStorage("emyMainPendingSignupPhoto") : "");
              const customerPhotoRef = cleanText(message && message.customerPhotoRef) || detailReadStorage("emyCustomerProfilePhotoRef");
              const createdAt = cleanText(message && message.createdAt) || new Date().toISOString();
              const body = cleanText(message && message.text);
              if (senderRole === "business") {
                detailPushNotification("emyCustomerNotifications", {
                  id: detailChatMessageId("customer-message"),
                  type: "business-message",
                  group: "important",
                  businessKey,
                  businessName,
                  title: "New reply from " + businessName,
                  body,
                  href: "emy-customer-chat.html?business=" + encodeURIComponent(businessKey || businessName),
                  customerKey,
                  createdAt,
                  read: false,
                  unread: true,
                  ref: ref || null
                }, 80);
                return;
              }
              const notification = {
                id: detailChatMessageId("business-message"),
                type: "customer-message",
                group: "business",
                businessKey,
                businessName,
                title: "New message from " + customerName,
                body,
                customerName,
                customerKey,
                href: "emy-business-profile.html?mode=chat&business=" + encodeURIComponent(businessKey || businessName) + "&customer=" + encodeURIComponent(customerKey),
                createdAt,
                read: false,
                unread: true,
                initials: (customerName || "C").slice(0, 2).toUpperCase(),
                avatar: customerPhoto,
                avatarSrc: customerPhoto,
                avatarRef: customerPhotoRef,
                customerPhoto,
                customerPhotoRef,
                ref: ref || null
              };
              detailBusinessNotificationKeys(businessKey, businessName).forEach((key) => detailPushNotification("emyBusinessNotifications:" + key, notification, 80));
            } catch (error) {}
          }
          function detailCreateChatMessage(text, ref) {
            const senderRole = activeDetailAccountRole() === "business" ? "business" : "customer";
            const businessKey = cleanText(activeChatBusinessKey || normaliseCustomerBusinessKey(activeChatBusinessName || "business"));
            const businessName = detailChatBusinessName();
            const customerName = detailChatCustomerName();
            const customerKey = detailChatCurrentCustomerKey();
            const customerPhoto = detailReadStorage("emyCustomerProfilePhoto") || (String(detailReadStorage("emyMainPendingSignupRole") || "").toLowerCase() === "customer" ? detailReadStorage("emyMainPendingSignupPhoto") : "");
            const customerPhotoRef = detailReadStorage("emyCustomerProfilePhotoRef");
            return {
              id: detailChatMessageId("message"),
              author: senderRole === "business" ? businessName : customerName,
              text: cleanText(text),
              mine: senderRole === "customer",
              senderRole,
              recipientRole: senderRole === "business" ? "customer" : "business",
              businessKey,
              businessName,
              customerKey,
              customerName,
              customerEmail: detailReadStorage("emyMainSignedInEmail"),
              customerPhoto,
              customerPhotoRef,
              likes: 0,
              ref: ref || null,
              createdAt: new Date().toISOString(),
              readBySender: true,
              readByBusiness: senderRole === "business",
              readByCustomer: senderRole === "customer"
            };
          }
          function defaultBusinessChatThread(businessName) {
            return [];
          }
          function readBusinessChatThread(key, businessName) {
            try {
              const stored = localStorage.getItem(businessChatStorageKey(key));
              const parsed = stored ? JSON.parse(stored) : null;
              if (Array.isArray(parsed)) return parsed.filter((item) => item && item.text && detailChatMessageBelongsToCurrentCustomer(item)).map((item) => {
                const senderRole = detailChatSenderRole(item);
                const customerKey = detailChatMessageCustomerKey(item) || detailChatCurrentCustomerKey();
                return {
                id: cleanText(item.id),
                author: cleanText(item.author) || (senderRole === "business" ? businessName || "Business" : detailChatCustomerName()),
                text: cleanText(item.text),
                mine: detailChatOwnsCurrentView(Object.assign({}, item, { senderRole })),
                senderRole,
                recipientRole: cleanText(item.recipientRole) || (senderRole === "business" ? "customer" : "business"),
                businessKey: cleanText(item.businessKey || key),
                businessName: cleanText(item.businessName || businessName),
                customerKey,
                customerName: cleanText(item.customerName),
                customerEmail: cleanText(item.customerEmail),
                customerPhoto: cleanText(item.customerPhoto),
                customerPhotoRef: cleanText(item.customerPhotoRef),
                createdAt: cleanText(item.createdAt),
                likes: Math.max(0, Number(item.likes) || 0),
                ref: item.ref && item.ref.title ? {
                  type: cleanText(item.ref.type) || "Item",
                  title: cleanText(item.ref.title),
                  description: cleanText(item.ref.description),
                  price: cleanText(item.ref.price),
                  href: cleanText(item.ref.href),
                  mediaClass: cleanText(item.ref.mediaClass),
                  mediaSrc: cleanText(item.ref.mediaSrc),
                  mediaRef: cleanText(item.ref.mediaRef),
                  mediaType: cleanText(item.ref.mediaType),
                  posterSrc: cleanText(item.ref.posterSrc),
                  posterRef: cleanText(item.ref.posterRef),
                  mediaSettings: Object.assign({}, item.ref.mediaSettings || {})
                } : null
              };
              });
            } catch (error) {}
            return defaultBusinessChatThread(businessName);
          }
          function saveBusinessChatThread(key, items) {
            try {
              const storage = businessChatStorageKey(key);
              const existing = detailReadJsonArray(storage);
              const others = existing.filter((item) => !detailChatMessageBelongsToCurrentCustomer(item));
              const current = (Array.isArray(items) ? items : []).filter((item) => item && item.text).map(detailAttachCurrentCustomer);
              localStorage.setItem(storage, JSON.stringify(others.concat(current).slice(-160)));
            } catch (error) {}
          }
          function chatItemsFromDom() {
            if (!productChatThread) return [];
            return Array.from(productChatThread.querySelectorAll("[data-item-product-chat-message]")).map((node) => {
              const countNode = node.querySelector("[data-item-product-chat-like-count]");
              const refNode = node.querySelector("[data-item-product-chat-reference]");
              return {
                author: cleanText(node.querySelector("strong") && node.querySelector("strong").textContent) || (node.dataset.ownChat === "true" ? detailChatCustomerName() : activeChatBusinessName || "Business"),
                text: cleanText(node.querySelector("[data-item-product-chat-text]") && node.querySelector("[data-item-product-chat-text]").textContent),
                mine: cleanText(node.dataset.senderRole).toLowerCase() !== "business",
                senderRole: cleanText(node.dataset.senderRole).toLowerCase() || (node.dataset.ownChat === "true" ? activeDetailAccountRole() || "customer" : "business"),
                recipientRole: cleanText(node.dataset.senderRole).toLowerCase() === "business" ? "customer" : "business",
                businessKey: activeChatBusinessKey,
                businessName: activeChatBusinessName,
                customerKey: detailChatCurrentCustomerKey(),
                customerName: detailChatCustomerName(),
                customerEmail: detailReadStorage("emyMainSignedInEmail"),
                likes: readEngagementCount(countNode),
                ref: refNode ? {
                  type: cleanText(refNode.dataset.refType) || "Item",
                  title: cleanText(refNode.dataset.refTitle),
                  description: cleanText(refNode.dataset.refDescription),
                  price: cleanText(refNode.dataset.refPrice),
                  href: cleanText(refNode.dataset.refHref),
                  mediaClass: cleanText(refNode.dataset.refMedia),
                  mediaSrc: cleanText(refNode.dataset.refMediaSrc),
                  mediaRef: cleanText(refNode.dataset.refMediaRef),
                  mediaType: cleanText(refNode.dataset.refMediaType),
                  posterSrc: cleanText(refNode.dataset.refPosterSrc),
                  posterRef: cleanText(refNode.dataset.refPosterRef)
                } : null
              };
            }).filter((item) => item.text);
          }
          function syncBusinessChatThread() {
            if (activeChatBusinessKey) saveBusinessChatThread(activeChatBusinessKey, chatItemsFromDom());
          }
          function chatReferenceKind(ref) {
            const text = cleanText(ref && ref.type).toLowerCase();
            if (text.includes("clip")) return "clip";
            if (text.includes("post")) return "post";
            return "product";
          }
          function chatReferenceHref(ref) {
            if (ref && ref.href) return ref.href;
            const kind = chatReferenceKind(ref);
            if (kind === "clip") return "emy-customer-home.html#reels";
            if (kind === "post") return "emy-customer-home.html#feeds";
            return "emy-customer-search.html#products";
          }
          function chatContextFromDetails(details) {
            const type = cleanText(details && details.kind) || "Item";
            const kind = chatReferenceKind({ type });
            const mediaItems = Array.isArray(details && details.mediaItems) ? details.mediaItems : [];
            const firstMedia = mediaItems.find((item) => item && (item.src || item.ref)) || null;
            const mediaRef = cleanText(firstMedia && firstMedia.ref) || cleanText(details && details.mediaRef);
            const mediaSrc = mediaRef ? "" : (cleanText(firstMedia && firstMedia.src) || cleanText(details && details.mediaSrc));
            const mediaType = cleanText(firstMedia && firstMedia.type) || cleanText(details && details.mediaType);
            const posterRef = cleanText(firstMedia && firstMedia.posterRef) || cleanText(details && details.posterRef);
            const posterSrc = posterRef ? "" : (cleanText(firstMedia && firstMedia.posterSrc) || cleanText(details && details.posterSrc));
            return {
              type,
              title: cleanText(details && details.title) || "Current item",
              description: cleanText(details && details.description) || "",
              price: cleanText(details && details.price) || "",
              mediaClass: cleanText(details && details.mediaClass) || kind,
              mediaSrc,
              mediaRef,
              mediaType,
              posterSrc,
              posterRef,
              mediaSettings: Object.assign({}, firstMedia && firstMedia.settings || {}),
              href: kind === "clip" ? "emy-customer-home.html#reels" : kind === "post" ? "emy-customer-home.html#feeds" : "emy-customer-search.html#products"
            };
          }
          function chatContactIntentPayload(businessKey, businessName, intent, details) {
            const context = chatContextFromDetails(details || {});
            return {
              businessKey,
              businessName,
              productTitle: context.title,
              productDescription: context.description,
              productPrice: context.price,
              productType: context.type,
              mediaClass: context.mediaClass,
              mediaSrc: context.mediaSrc,
              mediaRef: context.mediaRef,
              mediaType: context.mediaType,
              posterSrc: context.posterSrc,
              posterRef: context.posterRef,
              mediaSettings: context.mediaSettings || {},
              href: context.href,
              intent: intent || "chat"
            };
          }
          function chatReferenceMediaMarkup(ref, kind) {
            const mediaType = cleanText(ref && ref.mediaType).toLowerCase();
            const mediaSrc = cleanText(ref && ref.mediaSrc);
            const mediaRef = cleanText(ref && ref.mediaRef);
            const posterSrc = cleanText(ref && ref.posterSrc);
            const posterRef = cleanText(ref && ref.posterRef);
            const hasMedia = !!(mediaSrc || mediaRef);
            const style = detailMediaInlineStyle(ref && ref.mediaSettings, true);
            const media = hasMedia
              ? (mediaType === "video"
                ? '<video' + (mediaSrc ? ' src="' + escapeDetail(mediaSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + escapeDetail(mediaRef) + '"' : '') + (posterSrc ? ' poster="' + escapeDetail(posterSrc) + '"' : '') + (posterRef ? ' data-emy-poster-ref="' + escapeDetail(posterRef) + '"' : '') + ' muted playsinline preload="metadata"></video>'
                : '<img' + (mediaSrc ? ' src="' + escapeDetail(mediaSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + escapeDetail(mediaRef) + '"' : '') + ' alt="" />')
              : "";
            return '<span class="item-product-chat-reference-media ' + escapeDetail(ref && ref.mediaClass || kind) + '"' + style + ' aria-hidden="true">' + media + '</span>';
          }
          function renderChatReferenceInner(ref, note) {
            const kind = chatReferenceKind(ref);
            const summary = [ref.description, ref.price].filter(Boolean).join(" - ");
            return chatReferenceMediaMarkup(ref, kind) + '<span class="item-product-chat-reference-copy"><small>' + escapeDetail(ref.type || "Item") + '</small><strong>' + escapeDetail(ref.title || "") + '</strong>' + (summary ? '<span>' + escapeDetail(summary) + '</span>' : '') + '</span>' + (note ? '<span class="item-product-chat-attach-preview-note">' + escapeDetail(note) + '</span>' : '');
          }
          function renderChatReference(ref) {
            if (!ref || !ref.title) return "";
            const kind = chatReferenceKind(ref);
            const href = chatReferenceHref(ref);
            const type = cleanText(ref.type || "Item");
            const detailMedia = cleanText(ref.mediaSrc || ref.mediaRef || ref.posterSrc || ref.posterRef) ? "feed" : (ref.mediaClass || kind);
            const detailMeta = [ref.description, ref.price].filter(Boolean).join("|");
            return '<a class="item-product-chat-reference is-' + escapeDetail(kind) + '" href="' + escapeDetail(href) + '" data-card data-open-item-detail data-item-product-chat-reference data-business-key="' + escapeDetail(activeChatBusinessKey || "") + '" data-detail-kind="' + escapeDetail(type) + '" data-detail-title="' + escapeDetail(ref.title || "") + '" data-detail-description="' + escapeDetail(ref.description || "") + '" data-detail-business="' + escapeDetail(activeChatBusinessName || "") + '" data-detail-price="' + escapeDetail(ref.price || "") + '" data-detail-media="' + escapeDetail(detailMedia) + '" data-detail-media-src="' + escapeDetail(ref.mediaSrc || "") + '" data-detail-media-ref="' + escapeDetail(ref.mediaRef || "") + '" data-detail-media-type="' + escapeDetail(ref.mediaType || "") + '" data-detail-poster-src="' + escapeDetail(ref.posterSrc || "") + '" data-detail-poster-ref="' + escapeDetail(ref.posterRef || "") + '" data-detail-meta="' + escapeDetail(detailMeta) + '" data-ref-type="' + escapeDetail(type) + '" data-ref-title="' + escapeDetail(ref.title || "") + '" data-ref-description="' + escapeDetail(ref.description || "") + '" data-ref-price="' + escapeDetail(ref.price || "") + '" data-ref-href="' + escapeDetail(href) + '" data-ref-media="' + escapeDetail(ref.mediaClass || kind) + '" data-ref-media-src="' + escapeDetail(ref.mediaSrc || "") + '" data-ref-media-ref="' + escapeDetail(ref.mediaRef || "") + '" data-ref-media-type="' + escapeDetail(ref.mediaType || "") + '" data-ref-poster-src="' + escapeDetail(ref.posterSrc || "") + '" data-ref-poster-ref="' + escapeDetail(ref.posterRef || "") + '">' + renderChatReferenceInner(ref, "") + '</a>';
          }
          function renderChatAttachPreview() {
            if (!productChatAttachPreview || !activeChatItemContext) return;
            if (!attachCurrentItemToChat) {
              productChatAttachPreview.hidden = true;
              productChatAttachPreview.innerHTML = "";
              return;
            }
            const kind = chatReferenceKind(activeChatItemContext);
            productChatAttachPreview.hidden = false;
            productChatAttachPreview.className = "item-product-chat-attach-preview is-" + kind;
            productChatAttachPreview.innerHTML = renderChatReferenceInner(activeChatItemContext, "Will share");
            if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(productChatAttachPreview);
          }
          function renderProductChatMessage(item) {
            const likes = Number(item && item.likes) || 0;
            const senderRole = detailChatSenderRole(item);
            const ownMessage = detailChatOwnsCurrentView(item);
            const ownActions = ownMessage
              ? '<button class="item-product-chat-action" type="button" data-item-product-chat-edit aria-label="Edit message" title="Edit">' + actionIcon("edit") + '</button><button class="item-product-chat-action is-danger" type="button" data-item-product-chat-delete aria-label="Delete message" title="Delete">' + actionIcon("delete") + '</button>'
              : "";
            const messageId = escapeDetail(item && (item.id || item.messageId || item.chatMessageId || item.createdAt || item.at) || "");
            return '<span class="item-product-chat-message' + (ownMessage ? ' is-user' : '') + '" data-item-product-chat-message data-sender-role="' + escapeDetail(senderRole) + '"' + (messageId ? ' data-item-product-chat-message-id="' + messageId + '" data-message-id="' + messageId + '"' : '') + (ownMessage ? ' data-own-chat="true"' : '') + '><strong>' + escapeDetail(detailChatDisplayName(item)) + '</strong><span class="item-product-chat-text" data-item-product-chat-text>' + escapeDetail(item && item.text || "") + '</span>' + renderChatReference(item && item.ref) + '<span class="item-product-chat-actions"><button class="item-product-chat-action" type="button" data-item-product-chat-like aria-pressed="false" aria-label="Like message" title="Like">' + actionIcon("like") + '<span data-item-product-chat-like-count data-raw-count="' + likes + '">' + formatEngagementCount(likes) + '</span></button>' + ownActions + '</span></span>';
          }
          function productCustomerButtonHtml(active) {
            if (!detailCanBecomeCustomer()) {
              return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke-linejoin="round"/><path d="M5 20c.7-3.4 3-5.2 7-5.2s6.3 1.8 7 5.2" stroke-linecap="round"/></svg>Business account';
            }
            const icon = active
              ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 12.2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke-linejoin="round"/><path d="M3.8 19.2c.7-3.1 3-5 6.7-5 1.5 0 2.8.3 3.8.9" stroke-linecap="round"/><path d="m16 14.5 1.9 1.9 3.3-4.1" stroke-linecap="round" stroke-linejoin="round"/></svg>'
              : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 12.2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke-linejoin="round"/><path d="M3.8 19.2c.7-3.1 3-5 6.7-5 1.5 0 2.8.3 3.8.9" stroke-linecap="round"/><path d="M18 10.8v6.4M14.8 14h6.4" stroke-linecap="round"/></svg>';
            return icon + (active ? "In My Businesses" : "Add to My Businesses");
          }
          function customerBusinessNoteHtml(active) {
            if (!detailCanBecomeCustomer()) return 'Business accounts cannot become customers. Switch to a customer account to save this business in My Businesses.';
            return active
              ? '<strong>Saved.</strong> You will see this business in My Businesses and get their updates.'
              : 'Get this business in My Businesses and receive updates when they post.';
          }
          function setCustomerBusinessState(key, name, active, details) {
            if (!detailCanBecomeCustomer()) {
              detailFeedback("Business accounts cannot become customers. Switch to a customer account first.");
              return false;
            }
            let cleanKey = normaliseCustomerBusinessKey(key || name || "business");
            let aliases = customerBusinessAliasKeys(key, name, cleanKey);
            try {
              cleanKey = normaliseCustomerBusinessKey(key || name || "business");
              aliases = customerBusinessAliasKeys(key, name, cleanKey);
              aliases.forEach((alias) => localStorage.setItem("emyCustomerBusiness:" + alias, active ? "1" : "0"));
              const stored = JSON.parse(localStorage.getItem("emyCustomerBusinesses") || "{}");
              if (active) {
                stored[cleanKey] = {
                  key: cleanKey,
                  businessKey: cleanKey,
                  name,
                  aliases,
                  active: true,
                  isCustomer: true,
                  opened: true,
                  status: "Opened",
                  addedAt: new Date().toISOString(),
                  reason: "customer-subscription",
                  updates: ["posts", "products", "clips", "offers"],
                  lastContext: cleanText(details && details.title)
                };
              } else {
                aliases.forEach((alias) => { delete stored[alias]; });
              }
              localStorage.setItem("emyCustomerBusinesses", JSON.stringify(stored));
            } catch (error) {}
            notifyBusinessOwner(active ? "customer-add" : "customer-remove", currentUserDisplayName() + (active ? " added your business to My Businesses." : " removed your business from My Businesses."), key, name, {
              itemKind: "business",
              itemTitle: name,
              title: active ? "New customer added" : "Customer removed"
            });
            if (window.emyRefreshBusinessCustomerBadges) window.emyRefreshBusinessCustomerBadges(document);
            try {
              const detail = { key: cleanKey, businessKey: cleanKey, name, active: !!active, aliases };
              window.dispatchEvent(new CustomEvent("emy:customer-business-changed", { detail }));
              window.dispatchEvent(new CustomEvent("emy:business-content-changed", { detail: Object.assign({ action: active ? "customer-add" : "customer-remove" }, detail) }));
              if (window.emySyncContentSurfaces) window.emySyncContentSurfaces({ action: active ? "customer-add" : "customer-remove", type: "customer-business", key: cleanKey, businessKey: cleanKey, name });
              else if (window.emyRefreshRealHomeSurfaces) window.emyRefreshRealHomeSurfaces({ action: active ? "customer-add" : "customer-remove", key: cleanKey, name });
            } catch (error) {}
            return true;
          }
          function customerBusinessChatHref(key) {
            const businessKey = normaliseCustomerBusinessKey(key || "business");
            return "emy-customer-chat.html?business=" + encodeURIComponent(businessKey);
          }
          function ensureCustomerBusinessChatThread(key, name) {
            const businessKey = normaliseCustomerBusinessKey(key || name || "business");
            const businessName = cleanText(name || businessKey || "Business");
            if (!businessKey) return "";
            try {
              const storageKey = "emyBusinessChatThread:" + businessKey;
              const existing = JSON.parse(localStorage.getItem(storageKey) || "null");
              if (!Array.isArray(existing)) localStorage.setItem(storageKey, JSON.stringify([]));
            } catch (error) {}
            return businessKey;
          }
          function openCustomerBusinessChat(key, name, intent, details) {
            const businessKey = ensureCustomerBusinessChatThread(key, name);
            if (!businessKey) return;
            const businessName = cleanText(name || businessKey || "Business");
            try {
              localStorage.setItem("emySelectedBusinessProfileKey", businessKey);
              localStorage.setItem("emySelectedBusinessProfileName", businessName);
              localStorage.setItem("emyCustomerChatOpenKey", businessKey);
              localStorage.setItem("emyBusinessContactIntent", JSON.stringify(chatContactIntentPayload(businessKey, businessName, intent || "chat", details)));
            } catch (error) {}
            window.location.href = customerBusinessChatHref(businessKey);
          }
          function notifyClipOwner(slide, action, body) {
            try {
              if (!slide) return;
              const businessKey = cleanText(slide.dataset.clipBusinessKey || "");
              const businessName = cleanText(slide.dataset.clipBusinessName || "Business");
              const clipTitle = cleanText(slide.querySelector(".clip-viewer-info h3") && slide.querySelector(".clip-viewer-info h3").textContent) || "clip";
              const media = slide.querySelector(".clip-viewer-media video, .clip-viewer-media img");
              const clipCard = clipSourceCard(slide);
              if (normaliseCustomerBusinessKey(businessKey) === "customer-profile" || (clipCard && detailCardLooksCustomerOwned(clipCard, null))) {
                notifyCustomerOwner(action, body || (currentUserDisplayName() + " interacted with your clip."), {
                  itemKind: "clip",
                  itemTitle: clipTitle,
                  mediaSrc: cleanText(media && (media.currentSrc || media.src || media.getAttribute("src"))),
                  mediaType: media && media.tagName && media.tagName.toLowerCase() === "video" ? "video" : "image"
                });
                return;
              }
              notifyBusinessOwner(action, body || (currentUserDisplayName() + " interacted with your clip."), businessKey, businessName, {
                itemKind: "clip",
                itemTitle: clipTitle,
                title: businessName + " clip activity",
                clipTitle,
                mediaSrc: cleanText(media && (media.currentSrc || media.src || media.getAttribute("src"))),
                mediaType: media && media.tagName && media.tagName.toLowerCase() === "video" ? "video" : "image"
              });
            } catch (error) {}
          }
          function normaliseCustomerBusinessKey(value) {
            const raw = cleanText(value).toLowerCase();
            const key = raw.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
            if (key.includes("angi-pizza")) return "angi-pizza";
            if (key.includes("ever-glow")) return "ever-glow";
            if (key.includes("ross-galler")) return "ross-galler";
            if (key.includes("business-111")) return "business-111";
            return key;
          }
          function customerBusinessAliasKeys(...values) {
            const aliases = new Set();
            const add = (value) => {
              const raw = cleanText(value).toLowerCase();
              if (!raw) return;
              const compact = raw.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
              [raw, compact, normaliseCustomerBusinessKey(raw), compact.replace(/-/g, " ")].forEach((alias) => {
                const cleanAlias = cleanText(alias).toLowerCase();
                if (cleanAlias) aliases.add(cleanAlias);
              });
            };
            values.forEach(add);
            let matchesCurrentBusiness = false;
            try {
              matchesCurrentBusiness = values.some((value) => {
                const key = normaliseCustomerBusinessKey(value);
                return key === "profile" || key === "business-profile" ||
                  (typeof detailIsCurrentBusinessIdentity === "function" && detailIsCurrentBusinessIdentity(value)) ||
                  (typeof isCurrentBusiness === "function" && isCurrentBusiness(value));
              });
            } catch (error) {}
            if (matchesCurrentBusiness) {
              add("profile");
              add("business-profile");
              add(localStorage.getItem("emyBusinessDisplayName"));
              add(localStorage.getItem("emyBusinessName"));
              add(localStorage.getItem("emyBusinessProfileKey"));
              add(localStorage.getItem("emyBusinessKey"));
              try {
                const profile = JSON.parse(localStorage.getItem("emyBusinessProfileDraft") || "{}");
                add(profile && profile.key);
                add(profile && profile.businessKey);
                add(profile && profile.businessName);
                add(profile && profile.name);
              } catch (error) {}
            }
            return Array.from(aliases);
          }
          function businessCardCustomerKey(card) {
            if (!card) return "";
            const data = card.dataset || {};
            const explicit = data.businessKey || data.businessLink || data.detailBusinessKey || "";
            if (explicit) return normaliseCustomerBusinessKey(explicit);
            const text = cleanText(card.textContent || "").toLowerCase();
            if (text.includes("angi pizza")) return "angi-pizza";
            if (text.includes("ever glow")) return "ever-glow";
            if (text.includes("ross galler")) return "ross-galler";
            if (text.includes("business 111")) return "business-111";
            const titleNode = card.querySelector(".business-title-link, h3, strong");
            return normaliseCustomerBusinessKey(titleNode && titleNode.textContent);
          }
          function isCustomerBusinessKey(key, name) {
            const aliases = customerBusinessAliasKeys(key, name);
            if (!aliases.length) return false;
            const aliasSet = new Set(aliases);
            try {
              if (aliases.some((alias) => localStorage.getItem("emyCustomerBusiness:" + alias) === "1")) return true;
              const stored = JSON.parse(localStorage.getItem("emyCustomerBusinesses") || "{}");
              return Object.keys(stored || {}).some((storageKey) => {
                const item = stored[storageKey] || {};
                if (item.active === false || item.isCustomer === false) return false;
                return customerBusinessAliasKeys(storageKey, item.key, item.businessKey, item.profileKey, item.name, item.businessName, item.business, item.title)
                  .some((alias) => aliasSet.has(alias));
              });
            } catch (error) {
              return false;
            }
          }
          function setupBusinessCustomerBadges(root = document) {
            (root || document).querySelectorAll(".business-card, [data-business-card]").forEach((card) => {
              const key = businessCardCustomerKey(card);
              const actions = card.querySelector(".business-card-actions");
              if (!actions || !key) return;
              let badge = actions.querySelector("[data-business-customer-badge]");
              const isCustomer = isCustomerBusinessKey(key, card.dataset && (card.dataset.detailBusiness || card.dataset.detailTitle || card.dataset.businessName));
              card.classList.toggle("is-customer-business", isCustomer);
              if (!isCustomer) {
                if (badge) badge.remove();
                return;
              }
              if (!badge) {
                badge = document.createElement("span");
                badge.className = "business-customer-badge";
                badge.dataset.businessCustomerBadge = "true";
                badge.textContent = "Customer";
                actions.insertBefore(badge, actions.firstChild);
              }
              badge.hidden = false;
            });
          }
          window.emyRefreshBusinessCustomerBadges = setupBusinessCustomerBadges;
          function businessLikeStateMap() {
            try {
              const parsed = JSON.parse(localStorage.getItem("emyBusinessLikeState") || "{}");
              return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
            } catch (error) {
              return {};
            }
          }
          function businessLikeActorKey() {
            return cleanText(
              localStorage.getItem("emyMainSignedInEmail") ||
              localStorage.getItem("emyCustomerEmail") ||
              localStorage.getItem("emyCurrentCustomerEmail") ||
              localStorage.getItem("emyCustomerProfileKey") ||
              localStorage.getItem("emyCustomerKey") ||
              localStorage.getItem("emyCurrentCustomerKey") ||
              currentUserDisplayName() ||
              "customer"
            ).toLowerCase();
          }
          function businessLikeActorIdentity(value) {
            const raw = cleanText(value).toLowerCase().replace(/^(customer|business):/, "");
            return normaliseCustomerBusinessKey(raw) || raw;
          }
          function businessLikeActorMatches(value, actor) {
            const raw = cleanText(value).toLowerCase();
            const wanted = cleanText(actor).toLowerCase();
            if (!raw || !wanted) return false;
            if (raw === wanted) return true;
            return businessLikeActorIdentity(raw) === businessLikeActorIdentity(wanted);
          }
          function uniqueBusinessLikeActors(values) {
            const seen = new Set();
            const rows = [];
            (Array.isArray(values) ? values : []).forEach((value) => {
              const cleanValue = cleanText(value).toLowerCase();
              const identity = businessLikeActorIdentity(cleanValue);
              if (!cleanValue || !identity || seen.has(identity)) return;
              seen.add(identity);
              rows.push(cleanValue);
            });
            return rows;
          }
          function businessCardLikeKey(card) {
            return businessCardCustomerKey(card) || normaliseCustomerBusinessKey(card && card.querySelector && card.querySelector(".business-title-link, h3, strong") && card.querySelector(".business-title-link, h3, strong").textContent);
          }
          function businessCardLikeAliases(card, key) {
            const aliases = new Set();
            const add = (value) => {
              const cleanKey = normaliseCustomerBusinessKey(value || "");
              if (cleanKey) aliases.add(cleanKey);
            };
            add(key);
            const data = card && card.dataset || {};
            cleanText(data.businessLikeAliases || data.businessAliases || "").split(/[|,]+/).forEach(add);
            return aliases;
          }
          function businessLikeBagMarkup() {
            return '<svg class="emy-business-like-bag" viewBox="0 0 24 24" fill="none" focusable="false" aria-hidden="true"><path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/><path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/><path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/><path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/></svg>';
          }
          function ensureBusinessLikeIcon(button) {
            const icon = button && button.querySelector && button.querySelector(".emy-business-like-icon");
            if (!icon || icon.querySelector("svg")) return;
            icon.innerHTML = businessLikeBagMarkup();
          }
          function applyBusinessLikeButton(button, active, count) {
            if (!button) return;
            ensureBusinessLikeIcon(button);
            const safeCount = Math.max(0, Number(count) || 0);
            button.classList.toggle("is-liked", !!active);
            button.classList.toggle("is-active", !!active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
            const label = button.querySelector("[data-business-like-label]") || button.querySelector("span:not(.emy-business-like-icon)");
            if (label) label.textContent = active ? "Liked business" : "Like business";
            const countNode = button.querySelector("[data-business-like-count]");
            if (countNode) setEngagementCountText(countNode, safeCount, false);
          }
          function setupBusinessLikeBadges(root = document) {
            const map = businessLikeStateMap();
            const actor = businessLikeActorKey();
            (root || document).querySelectorAll("[data-business-like]").forEach((button) => {
              const card = button.closest(".business-card, [data-business-card]");
              const key = businessCardLikeKey(card);
              const aliases = businessCardLikeAliases(card, key);
              const entries = [];
              aliases.forEach((alias) => {
                if (map[alias]) entries.push(map[alias]);
              });
              if (!key || !entries.length) return;
              const likedBy = uniqueBusinessLikeActors(entries.reduce((rows, entry) => rows.concat(Array.isArray(entry && entry.likedBy) ? entry.likedBy : []), []));
              const active = likedBy.some((value) => businessLikeActorMatches(value, actor));
              const uniqueOnly = !!(button.hasAttribute && button.hasAttribute("data-business-like-unique-only"));
              const baseCount = uniqueOnly ? 0 : entries.reduce((max, entry) => Math.max(max, Number(entry && entry.baseCount) || 0), 0);
              const storedCount = entries.reduce((max, entry) => Math.max(max, Number(entry && entry.count) || 0), 0);
              const count = uniqueOnly ? likedBy.length : Math.max(storedCount, baseCount + likedBy.length, likedBy.length);
              applyBusinessLikeButton(button, active, count);
            });
          }
          function saveBusinessLikeButton(button, active, visibleCount) {
            const card = button && button.closest(".business-card, [data-business-card]");
            const key = businessCardLikeKey(card);
            if (!key) return;
            const actor = businessLikeActorKey();
            const map = businessLikeStateMap();
            const aliases = businessCardLikeAliases(card, key);
            aliases.forEach((alias) => {
              if (alias === key || !map[alias]) return;
              const aliasEntry = map[alias] && typeof map[alias] === "object" ? map[alias] : {};
              const aliasLikedBy = uniqueBusinessLikeActors(aliasEntry.likedBy).filter((value) => !businessLikeActorMatches(value, actor));
              const aliasBaseCount = Math.max(0, Number(aliasEntry.baseCount) || 0);
              if (aliasLikedBy.length || aliasBaseCount) {
                map[alias] = Object.assign({}, aliasEntry, { likedBy: aliasLikedBy, count: aliasBaseCount + aliasLikedBy.length, updatedAt: new Date().toISOString() });
              } else {
                delete map[alias];
              }
            });
            const entry = map[key] && typeof map[key] === "object" ? map[key] : {};
            const currentLikedBy = uniqueBusinessLikeActors(entry.likedBy);
            const likedBy = currentLikedBy.filter((value) => !businessLikeActorMatches(value, actor));
            if (active) likedBy.push(actor);
            const visible = Math.max(0, Number(visibleCount) || 0);
            const uniqueLikedBy = Array.from(new Set(likedBy));
            const uniqueOnly = !!(button.hasAttribute && button.hasAttribute("data-business-like-unique-only"));
            const baseCount = uniqueOnly ? 0 : Math.max(0, visible - uniqueLikedBy.length);
            const count = baseCount + uniqueLikedBy.length;
            map[key] = Object.assign({}, entry, { key, baseCount, likedBy: uniqueLikedBy, count, updatedAt: new Date().toISOString() });
            try { localStorage.setItem("emyBusinessLikeState", JSON.stringify(map)); } catch (error) {}
          }
          window.emyRefreshBusinessLikeBadges = setupBusinessLikeBadges;
          function setProductSavedState(active) {
            const isProduct = modal.classList.contains("is-product");
            if (save) {
              save.hidden = isProduct;
              save.disabled = isProduct;
              save.classList.toggle("is-saved", active);
              if (!isProduct) save.textContent = active ? "Saved" : "Save";
            }
            if (productSocialSave) {
              productSocialSave.classList.toggle("is-active", active);
              productSocialSave.setAttribute("aria-pressed", active ? "true" : "false");
            }
          }
          function detailDistanceParts(value) {
            const text = cleanText(value);
            const match = text.match(/^([0-9]+(?:\.[0-9]+)?\s*mi)\s+from\s+(.+)$/i);
            if (match) return { main: match[1] + " away", sub: "From your saved location", address: match[2] };
            if (/^set your location/i.test(text)) {
              return { main: "Set your location", sub: "Distance is not ready yet", address: text.replace(/^Set your location to calculate distance to\s*/i, "") };
            }
            if (/^distance unavailable/i.test(text)) {
              return { main: "Distance unavailable", sub: "Business coordinates are not saved yet", address: text.replace(/^Distance unavailable\s*-\s*/i, "") };
            }
            return { main: text || "Distance unavailable", sub: "", address: "" };
          }
          function renderProductSpecRow(row) {
            const label = row && row[0] || "";
            const value = row && row[1] || "";
            if (String(label).toLowerCase() === "distance from you") {
              const parts = detailDistanceParts(value);
              return '<div class="is-distance"><dt>' + escapeDetail(label) + '</dt><dd><span class="item-product-distance-main"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"/><path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"/></svg>' + escapeDetail(parts.main) + '</span>' + (parts.sub ? '<span class="item-product-distance-sub">' + escapeDetail(parts.sub) + '</span>' : '') + (parts.address ? '<span class="item-product-distance-address">' + escapeDetail(parts.address) + '</span>' : '') + '</dd></div>';
            }
            return '<div><dt>' + escapeDetail(label) + '</dt><dd>' + escapeDetail(value) + '</dd></div>';
          }
          function renderProductPanel(card, details) {
            if (!productPanel || !productSeller || !productSpecs) return;
            const kindText = cleanText(details.kind).toLowerCase();
            const isProduct = kindText.includes("product");
            const isBusiness = kindText.includes("business");
            const isPost = kindText.includes("post");
            const isJob = kindText.includes("job") || kindText.includes("hiring");
            const isEvent = kindText.includes("event");
            const isArticle = kindText.includes("article");
            const isDiscussion = isPost || isArticle;
            const isOwnedProduct = isProduct && detailBusinessOwnsItem(card, details);
            productPanel.hidden = isBusiness || isJob || isEvent;
            modal.classList.toggle("is-product", isProduct);
            modal.classList.toggle("is-owned-product", isOwnedProduct);
            if (save) {
              save.hidden = isProduct;
              save.disabled = isProduct;
            }
            if (isBusiness || isJob || isEvent) return;
            const businessName = inferProductBusiness(card, details);
            const businessKey = businessKeyFromDetails(card, details, businessName);
            activeChatBusinessKey = businessKey;
            activeChatBusinessName = businessName;
            activeChatItemContext = chatContextFromDetails(details);
            attachCurrentItemToChat = isProduct || isDiscussion || cleanText(details.kind).toLowerCase().includes("clip");
            const href = "emy-business-profile.html?business=" + encodeURIComponent(businessKey);
            const businessProfile = detailBusinessProfileForKey(businessKey, businessName);
            const source = detailBusinessRelationshipText(businessKey, businessName);
            const location = detailBusinessSavedLocationText(businessProfile) || "No business location saved yet";
            const distance = detailBusinessDistanceText(businessProfile);
            const openLabel = detailBusinessOpenLabel(businessProfile);
            const productBusinessAvatar = detailBusinessImageFromCard(card, Object.assign({}, details || {}, businessProfile || {}, { businessKey, key: businessKey, business: businessName, businessName }), businessKey, businessName);
            const productAvailability = cleanText(details.productAvailability || details.availability || details.stockStatus) || productAvailabilityMetaValue(details.meta);
            const availability = detailProductAvailabilityText(productAvailability, openLabel);
            const presence = businessPresenceInfo(businessKey, businessName, [openLabel, getText(card, ".status")].join(" "));
            const connectedCounts = detailCountsFromCard(card, details);
            const likeTotal = connectedCounts.likes;
            const savedTotal = connectedCounts.saved;
            const commentTotal = connectedCounts.comments;
            const repostTotal = connectedCounts.reposts;
            const isCustomerBusiness = isCustomerBusinessKey(businessKey, businessName);
            const deferDetailHeavy = !!(window.emyHomeInteractionActive && window.emyHomeInteractionActive());
            const rows = [
              ["Price shown", details.price || "Ask the business"],
              ["Business location", location]
            ];
            if (distance) rows.push(["Distance from you", distance]);
            if (productNote) {
              productNote.hidden = isDiscussion;
              productNote.textContent = isOwnedProduct ? "You posted this product. Click a stat below to inspect real customer activity; click Comments to review and reply." : isProduct ? "EMY connects you with the business selling this product. The product is not sold or checked out through EMY." : "This is the same business chat across products, posts, clips, and the business profile.";
            }
            if (productSellerCard) productSellerCard.hidden = isBusiness || isDiscussion || isOwnedProduct;
            if (productSocial) productSocial.hidden = isOwnedProduct || !(isProduct || isDiscussion);
            if (productSpecs) productSpecs.hidden = !isProduct;
            if (productOwnerPanel) productOwnerPanel.hidden = !isOwnedProduct;
            if (productComments) productComments.hidden = !(isProduct || isDiscussion);
            if (productChatSection) productChatSection.hidden = isOwnedProduct || !isProduct;
            if (productConnect) productConnect.hidden = isOwnedProduct || isBusiness || isDiscussion;
            if (productCommentTitle) productCommentTitle.textContent = isDiscussion ? "Comments" : "Public comments";
            if (productCommentNote) productCommentNote.textContent = isArticle ? "Visible to people reading this article." : isPost ? "Visible to people viewing this post." : "Visible to people viewing this item. Use Chat for private details with the business.";
            productSeller.textContent = businessName;
            if (productSellerStatus) productSellerStatus.textContent = availability;
            setPresenceNode(productPresence, presence);
            setPresenceNode(productChatStatus, presence);
            if (productAvatar) {
              const hasProductBusinessAvatar = !!(productBusinessAvatar.profilePhoto || productBusinessAvatar.profilePhotoRef);
              productAvatar.className = "item-product-avatar" + (hasProductBusinessAvatar ? " " + productAvatarClass(businessKey, businessName) + " has-image" : "");
              productAvatar.href = href;
              productAvatar.setAttribute("aria-label", "Open " + businessName + " profile");
              if (hasProductBusinessAvatar) {
                productAvatar.innerHTML = '<img' + (productBusinessAvatar.profilePhoto ? ' src="' + escapeDetail(productBusinessAvatar.profilePhoto) + '"' : '') + (productBusinessAvatar.profilePhotoRef ? ' data-emy-media-ref="' + escapeDetail(productBusinessAvatar.profilePhotoRef) + '"' : '') + ' alt="' + escapeDetail(businessName) + ' profile picture" />';
                if (productBusinessAvatar.profilePhotoRef && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(productAvatar);
              } else {
                productAvatar.innerHTML = '<span data-item-product-avatar-initial>' + escapeDetail((businessName.trim().charAt(0) || "B").toUpperCase()) + '</span>';
              }
            }
            if (productAvatarInitial && !(productBusinessAvatar.profilePhoto || productBusinessAvatar.profilePhotoRef)) productAvatarInitial.textContent = (businessName.trim().charAt(0) || "B").toUpperCase();
            if (!isProduct && productSellerStatus) productSellerStatus.textContent = isBusiness ? "Business profile chat" : cleanText(details.kind || "Business update") + " chat";
            productProfileLinks.forEach((link) => {
              link.href = href;
              link.setAttribute("aria-label", "Open " + businessName + " profile");
            });
            productSpecs.innerHTML = isProduct ? rows.map(renderProductSpecRow).join("") : "";
            if (productLikeCount) setEngagementCountText(productLikeCount, likeTotal);
            if (productSaveCount) setEngagementCountText(productSaveCount, savedTotal);
            if (productCommentCount) setEngagementCountText(productCommentCount, commentTotal);
            if (productRepostCount) setEngagementCountText(productRepostCount, repostTotal);
            if (isOwnedProduct && !deferDetailHeavy) renderProductOwnerPanel(card, details, connectedCounts);
            else if (isOwnedProduct && productOwnerActivity) productOwnerActivity.innerHTML = "";
            else if (productOwnerPanel) productOwnerPanel.hidden = true;
            if (productLike) productLike.classList.remove("is-active");
            if (productRepost) {
              productRepost.classList.toggle("is-active", repostTotal > 0);
              productRepost.setAttribute("aria-pressed", repostTotal > 0 ? "true" : "false");
              productRepost.setAttribute("aria-label", detailRepostText(repostTotal));
            }
            setProductSavedState(false);
            if (productCommentInput) productCommentInput.value = "";
            if (productChatInput) {
              productChatInput.value = "";
              productChatInput.placeholder = isProduct ? "Ask the seller about this product" : "Message this business";
            }
            if (productCommentInput) {
              productCommentInput.placeholder = isDiscussion ? "Write a public comment..." : "Ask about availability or details";
              productCommentInput.setAttribute("aria-label", isArticle ? "Comment on this article" : isPost ? "Comment on this post" : "Comment on this product");
            }
            if (productChatAttach) {
              productChatAttach.hidden = !activeChatItemContext || cleanText(details.kind).toLowerCase().includes("business");
              productChatAttach.classList.toggle("is-active", attachCurrentItemToChat);
              productChatAttach.setAttribute("aria-pressed", attachCurrentItemToChat ? "true" : "false");
              productChatAttach.setAttribute("aria-label", "Attach " + (activeChatItemContext && activeChatItemContext.type ? activeChatItemContext.type.toLowerCase() : "item") + " to chat");
            }
            renderChatAttachPreview();
            if (productCustomer) {
              const blockedForBusinessAccount = !detailCanBecomeCustomer();
              productCustomer.hidden = blockedForBusinessAccount;
              productCustomer.disabled = blockedForBusinessAccount;
              productCustomer.classList.toggle("is-active", isCustomerBusiness);
              productCustomer.setAttribute("aria-pressed", isCustomerBusiness ? "true" : "false");
              productCustomer.innerHTML = productCustomerButtonHtml(isCustomerBusiness);
            }
            if (productCustomerNote) productCustomerNote.innerHTML = customerBusinessNoteHtml(isCustomerBusiness);
            if (deferDetailHeavy) {
              if (productCommentTotal) productCommentTotal.textContent = formatEngagementCount(commentTotal) + (commentTotal === 1 ? " comment" : " comments");
              if (productCommentList) productCommentList.innerHTML = "";
              if (productChatThread) productChatThread.innerHTML = "";
              window.setTimeout(() => {
                if (activeDetailCard !== card || !modal.classList.contains("is-open")) return;
                if (isOwnedProduct) renderProductOwnerPanel(card, details, connectedCounts);
                if (isProduct || isDiscussion) renderProductCommentList(businessName, details.title, commentTotal, isArticle ? "article" : isPost ? "post" : "product");
                if (!isOwnedProduct) renderProductChat(businessName, details.title, presence);
                syncDetailModalFromSource(card, details);
              }, 1100);
            } else if (isOwnedProduct) {
              if (isProduct || isDiscussion) renderProductCommentList(businessName, details.title, commentTotal, isArticle ? "article" : isPost ? "post" : "product");
              else if (productCommentTotal) productCommentTotal.textContent = "0 comments";
              if (productChatThread) productChatThread.innerHTML = "";
            } else if (isProduct || isDiscussion) renderProductCommentList(businessName, details.title, commentTotal, isArticle ? "article" : isPost ? "post" : "product");
            else if (productCommentTotal) productCommentTotal.textContent = "0 comments";
            if (!isOwnedProduct && !deferDetailHeavy) renderProductChat(businessName, details.title, presence);
            setProductFeedback("");
            if (save && !isProduct) save.textContent = isArticle ? "Save article" : isPost ? "Save post" : "Save";
            const rememberIntent = (intent) => {
              try {
                localStorage.setItem("emySelectedBusinessProfileKey", businessKey);
                localStorage.setItem("emyBusinessContactIntent", JSON.stringify(chatContactIntentPayload(businessKey, businessName, intent, details)));
              } catch (error) {}
            };
            if (productChat) productChat.onclick = () => {
              rememberIntent("chat");
              if (productChatSection && productChatSection.hidden) productChatSection.hidden = false;
              productSectionScroll(productChatSection, productChatInput, "Chat opened for this business.");
            };
            if (productCustomer) productCustomer.onclick = () => {
              if (!detailCanBecomeCustomer()) {
                setProductFeedback("Business accounts cannot become customers. Switch to a customer account first.");
                return;
              }
              const active = !productCustomer.classList.contains("is-active");
              productCustomer.classList.toggle("is-active", active);
              productCustomer.setAttribute("aria-pressed", active ? "true" : "false");
              productCustomer.innerHTML = productCustomerButtonHtml(active);
              if (productCustomerNote) productCustomerNote.innerHTML = customerBusinessNoteHtml(active);
              rememberIntent(active ? "become-customer" : "leave-customer");
              if (setCustomerBusinessState(businessKey, businessName, active, details)) {
                setProductFeedback(active ? businessName + " is now in My Businesses. New posts, products, clips, and offers will appear in your updates." : businessName + " has been removed from My Businesses updates.");
              }
            };
          }
          function renderJobPanel(card, details) {
            const kindText = cleanText(details.kind).toLowerCase();
            const isJob = kindText.includes("job") || kindText.includes("hiring");
            modal.classList.toggle("is-job", isJob);
            if (!jobPanel) return;
            jobPanel.hidden = !isJob;
            if (!isJob) {
              activeJobDetailCard = null;
              return;
            }
            activeJobDetailCard = card;
            const data = card && card.dataset ? card.dataset : {};
            const businessName = details.business || data.detailBusiness || "Business";
            const applicantText = card && card.querySelector("[data-feed-job-applicants]") ? card.querySelector("[data-feed-job-applicants]").textContent : "";
            const applicants = Number(data.jobApplicants) || Number((applicantText.match(/\d+/) || ["0"])[0]) || 0;
            const isOwnedJob = !!(window.emyJobCardIsCreator ? window.emyJobCardIsCreator(card) : (card && !detailIsPublicCustomerSurface(card) && (card.classList.contains("is-owned") || card.classList.contains("is-user-post") || data.ownedJob === "true")));
            const jobOwnerImage = card && card.querySelector(".social-feed-avatar img, .feed-avatar img, .feed-job-business i.has-image img");
            const jobOwnerPhoto = jobOwnerImage ? cleanText(jobOwnerImage.getAttribute("src")) : (isOwnedJob && typeof currentUserPhotoSrc === "function" ? currentUserPhotoSrc() : "");
            if (jobTitleNode) jobTitleNode.textContent = details.title || "Help wanted";
            if (jobInitialNode) {
              jobInitialNode.classList.toggle("has-image", !!jobOwnerPhoto);
              if (jobOwnerPhoto) jobInitialNode.innerHTML = '<img src="' + escapeDetail(jobOwnerPhoto) + '" alt="" />';
              else jobInitialNode.textContent = (businessName.trim().charAt(0) || "B").toUpperCase();
            }
            if (jobBusinessNode) jobBusinessNode.textContent = businessName;
            if (jobDescriptionNode) jobDescriptionNode.textContent = details.description || data.detailDescription || businessName + " is hiring.";
            if (jobLocationNode) jobLocationNode.textContent = data.jobLocation || productSpecValue(details.meta.filter((item) => /location|confirm|city|london|near/i.test(item)), "Location to confirm");
            if (jobWorkplaceNode) jobWorkplaceNode.textContent = data.jobWorkplace || productSpecValue(details.meta.filter((item) => /site|remote|hybrid/i.test(item)), "On-site");
            if (jobEmploymentNode) jobEmploymentNode.textContent = data.jobEmployment || productSpecValue(details.meta.filter((item) => /full|part|temporary|flexible|weekend/i.test(item)), "Flexible");
            if (jobExperienceNode) jobExperienceNode.textContent = data.jobExperience || "Open to applicants";
            if (jobApplyTextNode) jobApplyTextNode.textContent = data.jobApply || "Message this business on EMY";
            if (jobNotesNode) jobNotesNode.textContent = data.jobNotes || "Details in the post";
            if (jobApplicantsNode) jobApplicantsNode.textContent = applicants + " applicant" + (applicants === 1 ? "" : "s");
            if (jobOwnerTools) jobOwnerTools.hidden = !isOwnedJob;
            if (jobApplyButton) {
              const statusHref = window.emyJobApplicationsStatusHref ? window.emyJobApplicationsStatusHref() : "emy-customer-profile.html#applications";
              const alreadyApplied = !isOwnedJob && window.emyCustomerHasAppliedToJob && window.emyCustomerHasAppliedToJob(card);
              jobApplyButton.textContent = isOwnedJob ? "See applicants CV's" : alreadyApplied ? "Already applied check your status here" : "Apply with CV";
              jobApplyButton.setAttribute("aria-label", jobApplyButton.textContent);
              jobApplyButton.classList.toggle("is-applied", !!alreadyApplied);
              jobApplyButton.onclick = (event) => {
                if (isOwnedJob && window.emyOpenJobApplicants) window.emyOpenJobApplicants(activeJobDetailCard, event);
                else if (alreadyApplied) {
                  if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                  window.location.href = statusHref;
                } else if (window.emyOpenJobApplication) window.emyOpenJobApplication(activeJobDetailCard, event);
              };
            }
            if (jobEditButton) {
              jobEditButton.onclick = (event) => {
                if (window.emyEditCreatedJob) {
                  setModalOpen(false);
                  const runEdit = () => window.emyEditCreatedJob(activeJobDetailCard, event);
                  if (window.emyRunAfterNextPaint) window.emyRunAfterNextPaint(runEdit);
                  else window.setTimeout(runEdit, 16);
                }
              };
            }
            if (jobDeleteButton) {
              jobDeleteButton.onclick = (event) => {
                if (window.emyDeleteCreatedJob) {
                  setModalOpen(false);
                  const runDelete = () => window.emyDeleteCreatedJob(activeJobDetailCard, event);
                  if (window.emyRunAfterNextPaint) window.emyRunAfterNextPaint(runDelete);
                  else window.setTimeout(runDelete, 16);
                }
              };
            }
          }
          function eventMetaValue(details, pattern, fallback) {
            const items = details && Array.isArray(details.meta) ? details.meta : [];
            const found = items.find((item) => pattern.test(cleanText(item)));
            return cleanText(found) || fallback;
          }
          function eventDateParts(value) {
            const text = cleanText(value);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const dayMatch = text.match(/\b([0-3]?\d)\b/);
            const monthMatch = text.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*/i);
            return {
              day: dayMatch ? dayMatch[1] : "--",
              month: monthMatch ? (monthMatch[1].slice(0, 3).charAt(0).toUpperCase() + monthMatch[1].slice(1, 3).toLowerCase()) : "Event"
            };
          }
          function setEventCover(card, details) {
            if (!eventCoverNode || !eventCoverImage) return;
            const mediaNode = card && card.querySelector ? card.querySelector(".home-created-media, .feed-event-post-hero, .feed-media, .photo, .media") : null;
            const mediaImage = mediaNode && mediaNode.querySelector ? mediaNode.querySelector("img[data-emy-event-card-cover], img[data-emy-media-ref], img") : null;
            const src = cleanText((details && details.mediaSrc) || (mediaImage && (mediaImage.currentSrc || mediaImage.src || mediaImage.getAttribute("src"))));
            const ref = cleanText((details && details.mediaRef) || (mediaImage && mediaImage.dataset && mediaImage.dataset.emyMediaRef));
            eventCoverImage.removeAttribute("src");
            eventCoverImage.removeAttribute("data-emy-media-ref");
            eventCoverNode.hidden = !(src || ref);
            if (!src && !ref) return;
            if (ref) eventCoverImage.setAttribute("data-emy-media-ref", ref);
            if (src) eventCoverImage.src = src;
            if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(eventCoverNode);
            if (!src && ref && window.emyResolveFeedMedia) {
              window.emyResolveFeedMedia(ref).then((record) => {
                if (record && record.url) eventCoverImage.src = record.url;
              }).catch(() => {});
            }
          }
          function renderEventPanel(card, details) {
            const kindText = cleanText(details.kind).toLowerCase();
            const isEvent = kindText.includes("event");
            modal.classList.toggle("is-event", isEvent);
            if (!eventPanel) return;
            eventPanel.hidden = !isEvent;
            if (!isEvent && eventCoverNode) eventCoverNode.hidden = true;
            if (!isEvent) return;
            const data = card && card.dataset ? card.dataset : {};
            const businessName = details.business || data.detailBusiness || "Host";
            const businessKey = businessKeyFromDetails(card, details, businessName);
            const href = "emy-business-profile.html?business=" + encodeURIComponent(businessKey);
            const whenText = eventMetaValue(details, /\b(am|pm|at|today|tomorrow|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|mon|tue|wed|thu|fri|sat|sun|\d{1,2}:\d{2})\b/i, "Time to confirm");
            const whereText = eventMetaValue(details, /\b(in person|online|remote|virtual|venue|location|london|nearby|street|road|shop|store)\b/i, "Location to confirm");
            const formatText = eventMetaValue(details, /\b(in person|online|remote|virtual|meetup|workshop|launch|open day)\b/i, "Event");
            const dateParts = eventDateParts(whenText);
            if (eventDayNode) eventDayNode.textContent = dateParts.day;
            if (eventMonthNode) eventMonthNode.textContent = dateParts.month;
            if (eventTitleNode) eventTitleNode.textContent = details.title || "Event";
            if (eventHostNode) eventHostNode.textContent = "Hosted by " + businessName;
            setEventCover(card, details);
            if (eventWhenNode) eventWhenNode.textContent = whenText;
            if (eventWhereNode) eventWhereNode.textContent = whereText;
            if (eventFormatNode) eventFormatNode.textContent = formatText;
            if (eventProfileLink) {
              eventProfileLink.href = href;
              eventProfileLink.setAttribute("aria-label", "Open " + businessName + " profile");
            }
            if (eventChatLink) {
              eventChatLink.href = customerBusinessChatHref(businessKey);
              eventChatLink.setAttribute("aria-label", "Message " + businessName + " about this event");
              eventChatLink.onclick = (event) => {
                event.preventDefault();
                openCustomerBusinessChat(businessKey, businessName, "event-chat", details);
              };
            }
            if (eventSaveButton) {
              const eventId = cleanText(data.feedId || data.eventId || data.detailId || String(businessKey + "-" + (details.title || "event")).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
              const readCustomerEvents = () => {
                try {
                  const parsed = JSON.parse(localStorage.getItem("emyCustomerEvents") || "[]");
                  return Array.isArray(parsed) ? parsed : [];
                } catch (error) {
                  return [];
                }
              };
              const writeCustomerEvents = (events) => {
                try { localStorage.setItem("emyCustomerEvents", JSON.stringify(events.slice(0, 80))); } catch (error) {}
              };
              const eventIsSaved = () => readCustomerEvents().some((item) => String(item.id || item.eventId || "") === eventId);
              const syncEventSaveButton = (active) => {
                eventSaveButton.classList.toggle("is-saved", active);
                eventSaveButton.setAttribute("aria-pressed", active ? "true" : "false");
                eventSaveButton.innerHTML = active
                  ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>Saved'
                  : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.7L6 21V4.8Z"/></svg>Save event';
              };
              syncEventSaveButton(eventIsSaved());
              eventSaveButton.onclick = () => {
                const active = !eventSaveButton.classList.contains("is-saved");
                const current = readCustomerEvents().filter((item) => String(item.id || item.eventId || "") !== eventId);
                if (active) {
                  current.unshift({
                    id: eventId,
                    eventId,
                    title: details.title || "Event",
                    business: businessName,
                    businessKey,
                    when: whenText,
                    where: whereText,
                    eventType: formatText,
                    status: "Saved",
                    reminder: true,
                    href: "emy-customer-home.html#feeds",
                    savedAt: new Date().toISOString()
                  });
                }
                writeCustomerEvents(current);
                syncEventSaveButton(active);
                window.dispatchEvent(new CustomEvent("emy:customer-events-changed", { detail: { id:eventId, saved:active } }));
                if (typeof showToast === "function") showToast(active ? "Event saved with reminder." : "Event removed from saved.");
              };
            }
          }
          function detailMediaItemsFromCard(card, data) {
            const raw = cleanText(data && data.detailMediaItems);
            if (raw) {
              try {
                const parsed = JSON.parse(raw);
                if (window.emyFeedMediaItemsFromItem) return window.emyFeedMediaItemsFromItem({ mediaItems: parsed });
                if (Array.isArray(parsed)) return parsed;
              } catch (error) {}
            }
            const carousel = card && card.querySelector && card.querySelector("[data-feed-media-carousel]");
            if (!carousel) return [];
            return Array.from(carousel.querySelectorAll("[data-feed-carousel-slide]")).map((slide) => {
              const video = slide.querySelector("video");
              const image = slide.querySelector("img");
              const media = video || image;
              return {
                type: video ? "video" : "image",
                src: cleanText(media && (media.currentSrc || media.src || media.getAttribute("src"))),
                ref: cleanText(media && media.dataset && media.dataset.emyMediaRef),
                posterSrc: cleanText(video && (video.getAttribute("poster") || video.poster)),
                posterRef: cleanText(video && video.dataset && video.dataset.emyPosterRef)
              };
            }).filter((item) => item.src || item.ref);
          }
          function normaliseDetailKind(card, rawKind, priceValue, metaValues) {
            const fallbackKind = inferKind(card);
            const kind = cleanText(rawKind) || fallbackKind;
            const lower = kind.toLowerCase();
            const data = card && card.dataset ? card.dataset : {};
            const classText = card && card.getAttribute ? cleanText(card.getAttribute("class")).toLowerCase() : "";
            const metaText = (Array.isArray(metaValues) ? metaValues : []).join(" ").toLowerCase();
            const productText = [
              kind,
              data.detailMeta,
              data.productName,
              data.productTitle,
              data.productDescription,
              data.productInfo,
              data.productCategory,
              data.productAvailability,
              data.detailProductName,
              data.detailProductTitle,
              data.detailProductDescription,
              data.detailProductInfo,
              data.detailProductCategory,
              data.detailProductAvailability,
              data.productPrice,
              data.detailProduct,
              priceValue
            ].map(cleanText).join(" ").toLowerCase();
            const hasProductMarker = !!cleanText(priceValue) ||
              lower.includes("product") ||
              /\bproduct\b/.test(metaText) ||
              /\bproduct\b/.test(productText) ||
              /\b(feed-product-card|product-card|business-live-product-card|feed-product-clip-card)\b/.test(classText);
            if (lower.includes("business") && !lower.includes("product")) return "Business";
            if (lower.includes("job") || lower.includes("hiring")) return "Job";
            if (lower.includes("event")) return "Event";
            if (lower.includes("article")) return "Article";
            if (lower.includes("clip") || classText.includes("reel-card") || classText.includes("is-clip")) return hasProductMarker ? "Product Clip" : "Clip";
            if (hasProductMarker) return "Product";
            return kind;
          }
          function detailProductCompare(value) {
            return cleanText(value)
              .toLowerCase()
              .replace(/…/g, "...")
              .replace(/\.\.\.$/, "")
              .replace(/[^a-z0-9]+/g, "");
          }
          function detailProductLooksShort(value) {
            return /(?:\.\.\.|…)$/.test(cleanText(value));
          }
          function detailProductFirstText(values, multiline) {
            return (Array.isArray(values) ? values : []).map((value) => multiline ? cleanMultilineText(value) : cleanText(value)).find(Boolean) || "";
          }
          function detailProductStoredRows() {
            const rows = [];
            ["emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts"].forEach((key) => {
              try {
                const value = JSON.parse(localStorage.getItem(key) || "[]");
                if (Array.isArray(value)) value.forEach((item) => { if (item && typeof item === "object") rows.push(item); });
              } catch (error) {}
            });
            return rows;
          }
          function detailCommentStorageKeys() {
            return [
              "emyFeedCommentThreads",
              "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts",
              "emyBusinessPosts", "emyBusinessFeedPosts", "emyBusinessArticles", "emyBusinessArticlePosts",
              "emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips",
              "emyBusinessEvents", "emyBusinessEventPosts", "emyBusinessJobs", "emyBusinessJobPosts",
              "emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents", "emyFeedCreatedProducts", "emyFeedCreatedArticles",
              "emyFeedReposts"
            ];
          }
          function detailStoredCommentRows() {
            const rows = [];
            detailCommentStorageKeys().forEach((key) => {
              const value = detailReadJson(key, []);
              const push = (item, index) => {
                if (item && typeof item === "object") rows.push(Object.assign({ _sourceKey: key, _sourceIndex: index }, item));
              };
              if (Array.isArray(value)) value.forEach(push);
              else if (value && typeof value === "object") Object.keys(value).forEach((rowKey) => push(Object.assign({ _objectKey: rowKey }, value[rowKey] || {}), rowKey));
            });
            return rows;
          }
          function detailCommentThreadRecordKey(card, details) {
            const data = card && card.dataset ? card.dataset : {};
            const info = details || detailsFromCard(card);
            const ids = detailFeedIdsForCard(card).concat([
              info && info.id,
              info && info.feedId,
              info && info.itemId,
              info && info.productId,
              data.feedId,
              data.itemId,
              data.productId,
              data.businessProductId,
              data.clipId,
              data.reelId
            ]).map(cleanText).filter(Boolean);
            if (ids.length) return "thread:" + detailSlug(ids[0]);
            const kind = cleanText(info && info.kind || data.detailKind || inferKind(card) || "item");
            const business = cleanText(info && info.business || data.detailBusiness || data.businessName || data.business || "");
            const title = cleanText(info && (info.productName || info.productTitle || info.title) || data.productName || data.productTitle || data.detailTitle || data.title || "");
            return "thread:" + (detailSlug([kind, business, title].filter(Boolean).join(":")) || ("comment-" + Date.now()));
          }
          function detailPersistCommentThreadRecord(card, details, comments, count) {
            if (!card) return false;
            const data = card.dataset || {};
            const info = details || detailsFromCard(card);
            const key = detailCommentThreadRecordKey(card, info);
            if (!key) return false;
            const title = cleanText(info && (info.productName || info.productTitle || info.title) || data.productName || data.productTitle || data.detailTitle || data.title || "");
            const businessName = cleanText(info && (info.businessName || info.business) || data.detailBusiness || data.businessName || data.business || "");
            const businessKey = cleanText(info && info.businessKey || data.businessKey || data.detailBusinessKey || businessKeyFromDetails(card, info, businessName));
            const kind = cleanText(info && info.kind || data.detailKind || inferKind(card) || "content");
            const feedId = cleanText(detailFeedId(card) || info && info.feedId || data.feedId || key);
            const rows = detailReadJson("emyFeedCommentThreads", {});
            const map = rows && typeof rows === "object" && !Array.isArray(rows) ? rows : {};
            const itemDetail = typeof detailNotificationSnapshot === "function" ? detailNotificationSnapshot({}, kind, title || kind, feedId, businessName, businessKey) : {};
            map[key] = Object.assign({}, map[key] || {}, {
              id: key,
              feedId,
              itemId: feedId,
              productId: cleanText(info && info.productId || data.productId || data.businessProductId),
              businessProductId: cleanText(data.businessProductId || info && info.businessProductId || info && info.productId),
              clipId: cleanText(info && info.clipId || data.clipId),
              reelId: cleanText(info && info.reelId || data.reelId),
              kind,
              type: kind,
              detailKind: kind,
              title,
              itemTitle: title,
              productName: cleanText(info && (info.productName || info.productTitle) || data.productName || data.productTitle || (kind.toLowerCase().indexOf("product") >= 0 ? title : "")),
              productTitle: cleanText(info && (info.productTitle || info.productName) || data.productTitle || data.productName || (kind.toLowerCase().indexOf("product") >= 0 ? title : "")),
              businessName,
              business: businessName,
              businessKey,
              key: businessKey,
              comments: detailMergeCommentThreads([], comments),
              commentCount: count,
              commentReplyCount: Math.max(0, count - (Array.isArray(comments) ? comments.length : 0)),
              updatedAt: new Date().toISOString(),
              detailSnapshot: Object.assign({}, itemDetail, {
                comments: detailMergeCommentThreads([], comments),
                commentCount: count
              })
            });
            try {
              localStorage.setItem("emyFeedCommentThreads", JSON.stringify(map));
              window.dispatchEvent(new CustomEvent("emy:feed-comments-changed", { detail: { key, comments: count } }));
              return true;
            } catch (error) {
              return false;
            }
          }
          function detailCommentRowValues(row, fields) {
            const values = [];
            const collect = (source) => {
              if (!source || typeof source !== "object") return;
              (fields || []).forEach((field) => values.push(source[field]));
            };
            collect(row);
            collect(row && row.detailSnapshot);
            collect(row && row.original);
            return values;
          }
          function detailCommentStorageMatchScore(row, card, details) {
            if (!row || typeof row !== "object") return 0;
            const data = card && card.dataset ? card.dataset : {};
            const info = details || detailsFromCard(card);
            const wantedIds = detailFeedIdsForCard(card).concat([
              info && info.id,
              info && info.feedId,
              info && info.itemId,
              info && info.productId,
              data.feedId,
              data.itemId,
              data.productId,
              data.businessProductId,
              data.clipId,
              data.reelId
            ]).map(cleanText).filter(Boolean).map((value) => value.toLowerCase());
            const rowIds = detailCommentRowValues(row, ["id", "feedId", "itemId", "postId", "productId", "businessProductId", "clipId", "reelId", "eventId", "jobId", "uid", "rawId", "originalId", "originalFeedId"]).map(cleanText).filter(Boolean).map((value) => value.toLowerCase());
            let score = 0;
            if (wantedIds.length && rowIds.some((id) => wantedIds.some((wanted) => id === wanted || id.indexOf(wanted) >= 0 || wanted.indexOf(id) >= 0))) score += 90;
            const wantedTitle = detailProductCompare(detailProductFirstText([info && info.productName, info && info.productTitle, info && info.title, data.productName, data.productTitle, data.detailTitle, data.title], false));
            const rowTitle = detailProductCompare(detailProductFirstText(detailCommentRowValues(row, ["productName", "productTitle", "fullTitle", "originalTitle", "itemTitle", "jobTitle", "eventTitle", "clipTitle", "title", "name", "caption", "text", "description"]), false));
            if (wantedTitle && rowTitle && (rowTitle === wantedTitle || rowTitle.indexOf(wantedTitle) === 0 || wantedTitle.indexOf(rowTitle) === 0)) score += 35;
            const wantedBusiness = detailProductCompare(detailProductFirstText([info && info.business, info && info.businessName, info && info.businessKey, data.detailBusiness, data.businessName, data.business, data.businessKey], false));
            const rowBusiness = detailProductCompare(detailProductFirstText(detailCommentRowValues(row, ["businessName", "business", "businessKey", "ownerName", "actor", "sellerName", "storeName", "key"]), false));
            if (wantedBusiness && rowBusiness && rowBusiness === wantedBusiness) score += 25;
            return score;
          }
          function detailPersistCommentsToStoredItems(card, comments) {
            if (!card) return;
            const details = card === activeDetailCard && activeDetailDetails ? activeDetailDetails : detailsFromCard(card);
            const cleanComments = (Array.isArray(comments) ? comments : []).map((comment) => detailNormaliseComment(comment, card)).filter(Boolean);
            const count = detailCommentThreadCount(cleanComments);
            let wrote = false;
            detailCommentStorageKeys().forEach((key) => {
              const value = detailReadJson(key, null);
              if (!value || typeof value !== "object") return;
              let changed = false;
              const patchItem = (item) => {
                if (!item || typeof item !== "object") return;
                if (detailCommentStorageMatchScore(item, card, details) < 50) return;
                item.comments = detailMergeCommentThreads([], cleanComments);
                item.commentCount = count;
                item.commentReplyCount = Math.max(0, count - item.comments.length);
                item.updatedAt = new Date().toISOString();
                if (item.detailSnapshot && typeof item.detailSnapshot === "object") {
                  item.detailSnapshot.comments = detailMergeCommentThreads([], cleanComments);
                  item.detailSnapshot.commentCount = count;
                }
                changed = true;
              };
              if (Array.isArray(value)) value.forEach(patchItem);
              else Object.keys(value).forEach((rowKey) => patchItem(value[rowKey]));
              if (!changed) return;
              try {
                localStorage.setItem(key, JSON.stringify(value));
                wrote = true;
                const eventName = key === "emyFeedCreatedJobs" ? "emy:created-jobs-changed" : key === "emyFeedCreatedEvents" ? "emy:created-events-changed" : key.indexOf("Product") >= 0 || key.indexOf("Products") >= 0 ? "emy:business-products-changed" : key.indexOf("Clip") >= 0 || key.indexOf("Reel") >= 0 ? "emy:business-clips-changed" : "emy:created-posts-changed";
                window.dispatchEvent(new CustomEvent(eventName, { detail: { key, comments: count } }));
              } catch (error) {}
            });
            if (detailPersistCommentThreadRecord(card, details, cleanComments, count)) wrote = true;
            if (wrote) {
              try { window.dispatchEvent(new CustomEvent("emy:business-content-changed", { detail: { action: "comments", comments: count } })); } catch (error) {}
            }
          }
          function detailBetterProductText(current, candidate, multiline) {
            const currentText = multiline ? cleanMultilineText(current) : cleanText(current);
            const candidateText = multiline ? cleanMultilineText(candidate) : cleanText(candidate);
            if (!candidateText) return currentText;
            if (!currentText) return candidateText;
            const currentKey = detailProductCompare(currentText);
            const candidateKey = detailProductCompare(candidateText);
            if (candidateText.length > currentText.length && (detailProductLooksShort(currentText) || candidateKey.indexOf(currentKey) === 0)) return candidateText;
            return currentText;
          }
          function detailUpgradeProductDetailsFromStorage(card, details) {
            if (!details || !cleanText(details.kind).toLowerCase().includes("product")) return details;
            const data = card && card.dataset ? card.dataset : {};
            const wantedIds = [details.id, details.feedId, data.feedId, data.productId, data.businessProductId, data.detailId, data.itemId].map(cleanText).filter(Boolean).map((value) => value.toLowerCase());
            const wantedTitle = detailProductCompare(details.productTitle || details.productName || details.title);
            const wantedBusiness = detailProductCompare(details.business || data.detailBusiness || data.businessKey);
            const wantedPrice = cleanText(details.price || data.detailPrice);
            const wantedMedia = [details.mediaRef, details.mediaSrc, data.detailMediaRef, data.detailMediaSrc].map(cleanText).filter(Boolean);
            let best = null;
            let bestScore = 0;
            detailProductStoredRows().forEach((row) => {
              const rowIds = [row.id, row.feedId, row.productId, row.businessProductId, row.itemId, row.uid].map(cleanText).filter(Boolean).map((value) => value.toLowerCase());
              const rowTitle = detailProductFirstText([row.productName, row.productTitle, row.fullTitle, row.originalTitle, row.itemTitle, row.title, row.name], false);
              const rowBusiness = detailProductFirstText([row.businessName, row.business, row.ownerName], false);
              const rowPrice = cleanText(row.priceText || row.displayPrice || row.price || row.amount);
              const rowMedia = [row.mediaRef, row.imageRef, row.videoRef, row.mediaSrc, row.image, row.video, row.coverRef, row.coverSrc, row.posterRef, row.posterSrc].map(cleanText).filter(Boolean);
              let score = 0;
              if (wantedIds.length && rowIds.some((id) => wantedIds.includes(id))) score += 90;
              const rowTitleKey = detailProductCompare(rowTitle);
              if (wantedTitle && rowTitleKey && (rowTitleKey === wantedTitle || rowTitleKey.indexOf(wantedTitle) === 0 || wantedTitle.indexOf(rowTitleKey) === 0)) score += detailProductLooksShort(details.title) ? 55 : 30;
              if (wantedBusiness && detailProductCompare(rowBusiness) === wantedBusiness) score += 20;
              if (wantedPrice && rowPrice === wantedPrice) score += 10;
              if (wantedMedia.length && rowMedia.some((value) => wantedMedia.includes(value))) score += 35;
              if (score > bestScore) {
                bestScore = score;
                best = row;
              }
            });
            if (!best || bestScore < 50) return details;
            const fullTitle = detailProductFirstText([best.productName, best.productTitle, best.fullTitle, best.originalTitle, best.itemTitle, best.title, best.name], false);
            const fullDescription = detailProductFirstText([best.productDescription, best.productInfo, best.fullDescription, best.originalDescription, best.itemDescription, best.description, best.text, best.body], true);
            const title = detailBetterProductText(details.title, fullTitle, false);
            const productDescription = detailBetterProductText(details.productDescription || details.description, fullDescription, true);
            return Object.assign({}, details, {
              title,
              productName: title,
              productTitle: title,
              description: productDescription,
              productDescription,
              productInfo: productDescription
            });
          }
          function detailsFromCard(card) {
            const data = card.dataset || {};
            const visibleMediaSrc = mediaSourceFromCard(card);
            const visibleMediaRef = mediaRefFromCard(card);
            const visibleMediaType = mediaTypeFromCard(card);
            const metaValues = data.detailMeta ? data.detailMeta.split("|").map(cleanText).filter(Boolean) : collectMeta(card);
            const rawKindValue = cleanText(data.detailKind) || inferKind(card);
            const priceValue = cleanText(data.detailPrice) || getText(card, ".price") || getText(card, ".feed-price") || getText(card, ".reel-product-strip b") || getText(card, ".social-feed-quote-price") || "";
            const kindValue = normaliseDetailKind(card, rawKindValue, priceValue, metaValues);
            const isArticle = kindValue.toLowerCase().includes("article");
            const baseDescription = cleanMultilineText(data.detailDescription) || getMultilineText(card, ".feed-body p") || getMultilineText(card, ".business-preview-copy small") || getMultilineText(card, ".caption > span") || getMultilineText(card, ".card-body p") || getMultilineText(card, ".body p") || getMultilineText(card, "p") || "More details are available here.";
            const isProductKind = kindValue.toLowerCase().includes("product");
            const productNameValue = cleanText(data.productName || data.productTitle || data.detailProductName || data.detailProductTitle) || (isProductKind ? cleanText(data.detailTitle) : "");
            const productDescriptionValue = cleanMultilineText(data.productDescription || data.productInfo || data.detailProductDescription || data.detailProductInfo) || (isProductKind ? baseDescription : "");
            const productCategoryValue = cleanText(data.productCategory || data.category || data.detailProductCategory || data.detailCategory);
            const productAvailabilityValue = cleanText(data.productAvailability || data.availability || data.stockStatus || data.detailProductAvailability || data.detailAvailability);
            const articleBody = cleanMultilineText(data.articleBody || data.detailArticleBody) || baseDescription;
            const articleReadTime = cleanText(data.articleReadTime || data.detailArticleReadTime);
            if (isArticle && articleReadTime && !metaValues.some((item) => item.toLowerCase() === articleReadTime.toLowerCase())) metaValues.push(articleReadTime);
            const details = {
              kind: kindValue,
              title: cleanText(data.detailTitle) || getText(card, ".feed-body h2") || getText(card, ".business-preview-copy strong") || getText(card, ".caption strong") || getText(card, ".card-body h3") || getText(card, ".body h3") || getText(card, "h3") || getText(card, "h2") || "Details",
              business: cleanText(data.detailBusiness) || getText(card, ".feed-profile-link strong") || getText(card, ".post-head strong") || getText(card, ".reel-top strong") || "",
              description: isArticle ? articleBody : baseDescription,
              articleBody,
              articleShare: cleanMultilineText(data.articleShare || data.detailArticleShare),
              articleReadTime,
              price: priceValue,
              productName: productNameValue,
              productTitle: productNameValue,
              productDescription: productDescriptionValue,
              productInfo: productDescriptionValue,
              productCategory: productCategoryValue,
              category: productCategoryValue,
              productAvailability: productAvailabilityValue,
              availability: productAvailabilityValue,
              stockStatus: productAvailabilityValue,
              id: cleanText(data.detailId || data.itemId || data.feedId || data.productId || data.businessProductId || data.clipId || data.reelId),
              feedId: cleanText(data.feedId || data.originalFeedId || data.repostOriginalId || data.itemId || data.detailId),
              businessKey: cleanText(data.businessKey || data.detailBusinessKey || data.ownerKey || data.key),
              avatarSrc: cleanText(data.detailAvatarSrc || data.itemAvatarSrc || data.avatarSrc || data.profilePhoto || data.businessPhoto || data.photo),
              avatarRef: cleanText(data.detailAvatarRef || data.itemAvatarRef || data.avatarRef || data.profilePhotoRef || data.businessPhotoRef || data.photoRef),
              mediaItems: detailMediaItemsFromCard(card, data),
              mediaClass: cleanText(data.detailMedia) || mediaClasses(findMediaNode(card)),
              mediaSrc: visibleMediaSrc || cleanText(data.detailMediaSrc),
              mediaRef: visibleMediaRef,
              mediaType: visibleMediaType || cleanText(data.detailMediaType),
              posterSrc: cleanText(data.detailPosterSrc) || cleanText(card.querySelector("video") && (card.querySelector("video").getAttribute("poster") || card.querySelector("video").poster)),
              posterRef: cleanText(data.detailPosterRef) || cleanText(card.querySelector("video") && card.querySelector("video").dataset && card.querySelector("video").dataset.emyPosterRef),
              duration: cleanText(data.detailDuration || data.videoDuration || card.getAttribute("data-video-duration")) || inferClipDuration(card),
              meta: metaValues
            };
            return detailUpgradeProductDetailsFromStorage(card, detailMergeRecoveredDetails(card, details));
          }
          function isClipCard(card, details) {
            const kindText = cleanText((details && details.kind) || (card.dataset && card.dataset.detailKind) || inferKind(card)).toLowerCase();
            const classes = card && card.classList;
            if (!classes) return kindText.includes("clip");
            return kindText.includes("clip") ||
              classes.contains("reel-card") ||
              classes.contains("is-clip") ||
              classes.contains("feed-clip-card") ||
              classes.contains("feed-product-clip-card") ||
              classes.contains("search-reel-card") ||
              classes.contains("business-posted-clip-card") ||
              classes.contains("business-preview-card-reel") ||
              (classes.contains("social-feed-card") && classes.contains("is-clip"));
          }
          function visibleClipCards(anchor) {
            const scope = anchor && anchor.closest && (anchor.closest("[data-annexed-feed-list],[data-home-static-clip-list],[data-home-flow-list],[data-section],[data-view-block]") || document);
            const cards = Array.from((scope || document).querySelectorAll(cardSelector)).filter((card) => {
              if (!candidateCard(card)) return false;
              if (card.hidden || card.closest("[hidden]")) return false;
              if (card.getClientRects && card.getClientRects().length === 0) return false;
              return isClipCard(card);
            });
            if (!anchor || !cards.length) return cards.slice(0, 8);
            const index = Math.max(0, cards.indexOf(anchor));
            const start = Math.max(0, index - 2);
            const end = Math.min(cards.length, start + 8);
            const windowed = cards.slice(start, end);
            return windowed.includes(anchor) ? windowed : [anchor].concat(windowed).slice(0, 8);
          }
          function isAskEmySingleClipSource(card) {
            if (!card || !card.closest) return false;
            if (card.getAttribute("data-clip-open-mode") === "single") return true;
            if (card.hasAttribute("data-ask-native-detail-card")) return true;
            return !!card.closest("[data-ask-native-detail-source]");
          }
          function actionIcon(name) {
            if (name === "dislike") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3H8.7a2 2 0 0 0-1.86 1.25L4 11v2h5.5L8.7 19.1A1.7 1.7 0 0 0 10.38 21h.22L17 13.8V5a2 2 0 0 0-1-2Z" stroke-linejoin="round"/><path d="M17 5h3v8h-3" stroke-linejoin="round"/></svg>';
            if (name === "send") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 20 4l-7.5 16-2.2-6.3L4 11.5Z" stroke-linejoin="round"/><path d="m10.3 13.7 4.5-4.5" stroke-linecap="round"/></svg>';
            if (name === "reply") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 10 4 15l5 5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15h8a6 6 0 0 0 6-6V5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            if (name === "edit") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4.5L19 9.5 14.5 5 4 15.5V20Z" stroke-linejoin="round"/><path d="m13.5 6 4.5 4.5" stroke-linecap="round"/></svg>';
            if (name === "delete") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 14h8l1-14" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            if (name === "saved" || name === "bookmark") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.8A1.8 1.8 0 0 1 8.8 3h6.4A1.8 1.8 0 0 1 17 4.8V21l-5-3.25L7 21V4.8Z" stroke-linejoin="round"/></svg>';
            if (name === "save") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            if (name === "cancel") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke-linecap="round"/></svg>';
            if (name === "view") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" stroke-linejoin="round"/><path d="M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" stroke-linejoin="round"/></svg>';
            if (name === "apply") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l3 3V20H7V3.5Z" stroke-linejoin="round"/><path d="M14 3.5V7h3M9.5 14l2 2 4-5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            if (name === "comment" || name === "chat") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v10.8H9.2L5 19.5v-14Z" stroke-linejoin="round"/><path d="M9 10.8h6" stroke-linecap="round"/></svg>';
            if (name === "repost") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8l-4 4"/><path d="M3 11V9a2.2 2.2 0 0 1 2.2-2.2H21"/><path d="M7 21.2l-4-4 4-4"/><path d="M21 13v2a2.2 2.2 0 0 1-2.2 2.2H3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            if (name === "share") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a3 3 0 1 0-2.8-4.05L8.7 7.25a3 3 0 1 0 0 3.5l6.5 3.3A3 3 0 1 0 16 12.5L9.6 9.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 10.6V21H5a2 2 0 0 1-2-2v-6.4a2 2 0 0 1 2-2h2.5Zm0 0 4.1-7.6a1.9 1.9 0 0 1 3.55 1.25l-.45 4.1H19a2 2 0 0 1 1.9 2.6l-2 7A2.8 2.8 0 0 1 16.2 20H7.5" stroke-linejoin="round"/></svg>';
          }
          function clipActions(details) {
            return [];
          }
          function clipActionMarkup(action) {
            return "";
          }
          function clipHandle(details) {
            const base = cleanText(details.business || details.kind || "emy clip").toLowerCase().replace(/[^a-z0-9]+/g, "");
            return "@" + (base || "emyclip");
          }
          function clipStorageKey(key) {
            return "emyClipState:" + (cleanText(key) || "clip");
          }
          function clipViewStatsMap() {
            try {
              const parsed = JSON.parse(localStorage.getItem("emyClipViewStats") || "{}");
              return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
            } catch (error) {
              return {};
            }
          }
          window.emyReadClipViewStats = window.emyReadClipViewStats || clipViewStatsMap;
          function writeClipViewStatsMap(stats) {
            try {
              localStorage.setItem("emyClipViewStats", JSON.stringify(stats || {}));
              window.dispatchEvent(new CustomEvent("emy:clip-view-stats-changed", { detail: { key: "emyClipViewStats" } }));
            } catch (error) {}
          }
          function readClipState(key) {
            try {
              const parsed = JSON.parse(localStorage.getItem(clipStorageKey(key)) || "{}");
              return parsed && typeof parsed === "object" ? parsed : {};
            } catch (error) {
              return {};
            }
          }
          function writeClipState(key, next) {
            try {
              localStorage.setItem(clipStorageKey(key), JSON.stringify(next || {}));
            } catch (error) {}
          }
          function clipStableKey(details, businessKey) {
            return [businessKey, details.title, details.duration || details.description].map(cleanText).join(":").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "clip";
          }
          function clipKeyForCard(card, details) {
            if (!card) return "";
            const info = details || detailsFromCard(card);
            const businessKey = businessCardCustomerKey(card) || normaliseCustomerBusinessKey(info.business || "");
            return clipStableKey(info, businessKey);
          }
          function clipHashKey(value) {
            const text = cleanText(value);
            if (!text) return "";
            let hash = 2166136261;
            for (let index = 0; index < text.length; index += 1) {
              hash ^= text.charCodeAt(index);
              hash = Math.imul(hash, 16777619);
            }
            return (hash >>> 0).toString(36);
          }
          function clipStoredViewNumber(source) {
            const item = source && typeof source === "object" ? source : {};
            const values = [];
            const push = (value) => {
              const count = readEngagementCount(value);
              if (Number.isFinite(count) && count > 0) values.push(count);
            };
            const pushText = (value) => {
              const text = cleanText(value);
              if (!text) return;
              const matches = text.match(/\\d[\\d,]*\\s*views?/gi) || [];
              matches.forEach((match) => push(match));
            };
            push(item.views);
            push(item.viewCount);
            push(item.clipViews);
            push(item.totalViews);
            pushText(item.viewsText);
            pushText(item.viewText);
            pushText(item.stats);
            pushText(item.detailMeta);
            pushText(item.metaText);
            pushText(item.engagement);
            return values.length ? Math.max.apply(Math, values) : 0;
          }
          function clipViewKeysForItem(item, sourceKey) {
            const data = item && typeof item === "object" ? item : {};
            const values = [
              data.clipViewKey,
              data.clipKey,
              data.reelKey,
              data.reelId,
              data.clipId,
              data.id,
              data.feedId,
              data.originalFeedId,
              data.repostOriginalId,
              data.detailId,
              data.itemId
            ];
            const title = data.productTitle || data.productName || data.clipTitle || data.title || data.name;
            const description = data.productDescription || data.productInfo || data.description || data.text || data.summary;
            const duration = data.duration || data.timeLeft;
            [data.businessKey, data.key, data.profileKey, data.businessName, data.business, data.actor, data.name, "profile"].forEach((businessKey) => {
              values.push(clipStableKey({ title, description, duration }, cleanText(businessKey)));
            });
            const mediaValues = [
              data.mediaRef,
              data.videoRef,
              data.imageRef,
              data.coverRef,
              data.posterRef,
              data.thumbnailRef,
              data.mediaSrc,
              data.video,
              data.videoSrc,
              data.image,
              data.imageSrc,
              data.coverSrc,
              data.posterSrc,
              data.thumbnailSrc
            ];
            if (Array.isArray(data.mediaItems)) {
              data.mediaItems.forEach((media) => {
                if (!media || typeof media !== "object") return;
                mediaValues.push(media.ref, media.src, media.posterRef, media.posterSrc, media.thumbnailRef, media.thumbnailSrc);
              });
            }
            mediaValues.forEach((value) => {
              const key = clipHashKey(value);
              if (key) values.push("media:" + key);
            });
            return Array.from(new Set(values.map(cleanText).filter(Boolean)));
          }
          function clipSharedBusinessRows() {
            const rows = [];
            const sources = [
              ["emyBusinessClips", 30],
              ["emyBusinessReels", 30],
              ["emyBusinessProductReels", 30],
              ["emyFeedCreatedClips", 30],
              ["emyFeedCreatedClipsByBusiness", 30],
              ["emyUploadedClips", 30],
              ["emyFeedCreatedPosts", 10]
            ];
            sources.forEach(([storageKey, priority]) => {
              let items = [];
              try {
                const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
                if (Array.isArray(parsed)) items = parsed;
              } catch (error) {}
              items.forEach((item, index) => {
                if (!item || typeof item !== "object") return;
                const marker = cleanText([storageKey, item.kind, item.type, item.tag, item.postMode, item.createType, item.clipKind, item.reelKind, item.clipType, item.reelType].filter(Boolean).join(" ")).toLowerCase();
                const hasClipMedia = item.mediaType === "video" || !!(item.video || item.videoRef || item.mediaRef || item.mediaSrc);
                if (!/clip|reel/.test(marker) && storageKey === "emyFeedCreatedPosts" && !hasClipMedia) return;
                rows.push({ item, sourceKey: storageKey, index, priority });
              });
            });
            return rows;
          }
          function clipSharedTextKey(value) {
            return cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          }
          function clipSharedStoredViewCount(card, details, keys) {
            const info = details || (card ? detailsFromCard(card) : {}) || {};
            const data = card && card.dataset ? card.dataset : {};
            const wantedKeys = new Set((Array.isArray(keys) ? keys : []).map(clipSharedTextKey).filter(Boolean));
            const wantedTitle = clipSharedTextKey(info.title || data.detailTitle || data.title);
            const wantedBusiness = clipSharedTextKey(info.business || info.businessName || info.name || info.key || data.detailBusiness || data.businessName || data.businessKey);
            let found = false;
            let bestScore = 0;
            let bestCount = 0;
            clipSharedBusinessRows().forEach((row) => {
              const item = row.item || {};
              const itemKeys = clipViewKeysForItem(item, row.sourceKey).map(clipSharedTextKey).filter(Boolean);
              const itemTitle = clipSharedTextKey(item.productTitle || item.productName || item.clipTitle || item.title || item.name);
              const itemBusiness = clipSharedTextKey(item.businessName || item.business || item.actor || item.name || item.key || item.businessKey);
              let score = Number(row.priority) || 0;
              if (itemKeys.some((key) => wantedKeys.has(key))) score += 120;
              if (wantedTitle && itemTitle && (wantedTitle === itemTitle || wantedTitle.indexOf(itemTitle) >= 0 || itemTitle.indexOf(wantedTitle) >= 0)) score += 45;
              if (wantedBusiness && itemBusiness && (wantedBusiness === itemBusiness || wantedBusiness.indexOf(itemBusiness) >= 0 || itemBusiness.indexOf(wantedBusiness) >= 0)) score += 20;
              if (score < 70) return;
              const count = clipStoredViewNumber(item);
              if (!found || score > bestScore || (score === bestScore && row.priority > 10 && count >= bestCount)) {
                found = true;
                bestScore = score;
                bestCount = count;
              }
            });
            return { found, count: bestCount };
          }
          function sharedClipViewCountForItem(item, sourceKey, fallbackCount) {
            const keys = clipViewKeysForItem(item, sourceKey);
            const stats = clipViewStatsMap();
            const record = clipMergedViewRecord(stats, keys);
            const stored = clipSharedStoredViewCount(null, item || {}, keys);
            const statsCount = Math.max(Number(record.total) || 0, record.events.length);
            const ownCount = clipStoredViewNumber(item);
            const fallback = Math.max(0, readEngagementCount(fallbackCount));
            if (stored.found) return Math.max(statsCount, stored.count, ownCount);
            return Math.max(statsCount, ownCount, fallback);
          }
          if (!window.emySharedClipViewCountForItem || window.emySharedClipViewCountForItem._emyHomeFallback === true) window.emySharedClipViewCountForItem = sharedClipViewCountForItem;
          function clipViewKeysForCard(card, details, clipKey) {
            const data = card && card.dataset ? card.dataset : {};
            const info = details || (card ? detailsFromCard(card) : {}) || {};
            const values = [
              clipKey,
              data.clipViewKey,
              data.clipKey,
              data.reelId,
              data.clipId,
              data.feedId,
              data.originalFeedId,
              data.repostOriginalId,
              data.detailId,
              data.itemId,
              info.id,
              info.feedId
            ];
            const businessKey = card ? businessCardCustomerKey(card) || normaliseCustomerBusinessKey(info.business || "") : "";
            values.push(clipStableKey(info, businessKey));
            try {
              if (card && window.emyEngagement && typeof window.emyEngagement.idsForCard === "function") {
                window.emyEngagement.idsForCard(card).forEach((id) => values.push(id));
              }
            } catch (error) {}
            const mediaValues = [
              data.detailMediaRef,
              data.mediaRef,
              data.clipMediaRef,
              data.videoRef,
              data.imageRef,
              data.detailMediaSrc,
              data.mediaSrc,
              data.clipMediaSrc,
              data.videoSrc,
              data.imageSrc,
              data.detailPosterRef,
              data.posterRef,
              data.thumbnailRef,
              data.detailPosterSrc,
              data.posterSrc,
              data.thumbnailSrc,
              info.mediaRef,
              info.mediaSrc,
              info.posterRef,
              info.posterSrc
            ];
            const mediaNode = card && findMediaNode(card);
            const video = mediaNode && mediaNode.querySelector && mediaNode.querySelector("video");
            const image = mediaNode && mediaNode.querySelector && mediaNode.querySelector("img");
            if (video) mediaValues.push(video.dataset && video.dataset.emyMediaRef, video.currentSrc || video.src || video.getAttribute("src"), video.dataset && video.dataset.emyPosterRef, video.poster || video.getAttribute("poster"));
            if (image) mediaValues.push(image.dataset && image.dataset.emyMediaRef, image.currentSrc || image.src || image.getAttribute("src"));
            mediaValues.forEach((value) => {
              const key = clipHashKey(value);
              if (key) values.push("media:" + key);
            });
            return Array.from(new Set(values.map(cleanText).filter(Boolean)));
          }
          function clipMergedViewRecord(stats, keys) {
            const events = [];
            const seen = {};
            let total = 0;
            let lastViewedAt = "";
            (Array.isArray(keys) ? keys : []).forEach((key) => {
              const record = stats && stats[key] && typeof stats[key] === "object" ? stats[key] : null;
              if (!record) return;
              total = Math.max(total, Number(record.total) || 0);
              if (record.lastViewedAt && (!lastViewedAt || new Date(record.lastViewedAt).getTime() > new Date(lastViewedAt || 0).getTime())) lastViewedAt = record.lastViewedAt;
              (Array.isArray(record.events) ? record.events : []).forEach((item) => {
                const eventKey = cleanText(item && (item.id || [item.at, item.role, item.viewerKey || item.key || item.email || item.name].filter(Boolean).join("|"))).toLowerCase();
                if (!eventKey || seen[eventKey]) return;
                seen[eventKey] = true;
                events.push(item);
              });
            });
            return { events, total: Math.max(total, events.length), lastViewedAt };
          }
          function detailBusinessClipPerformanceViewFallback(card, details) {
            const info = details || (card ? detailsFromCard(card) : {}) || {};
            const data = card && card.dataset ? card.dataset : {};
            const wantedTitle = detailSlug(info.title || data.detailTitle);
            const wantedBusiness = detailSlug(info.business || data.detailBusiness || data.businessName);
            const wantedIds = new Set([
              data.clipViewKey,
              data.clipKey,
              data.reelId,
              data.clipId,
              data.feedId,
              data.originalFeedId,
              data.detailId,
              data.itemId,
              data.detailTitle,
              info.title,
              clipKeyForCard(card, info)
            ].map(detailSlug).filter(Boolean));
            let best = 0;
            let bestScore = 0;
            try {
              if (typeof businessStatsContentPerformanceRows !== "function" || typeof businessReadPostedClips !== "function") return 0;
              const viewMap = typeof businessStatsReadObject === "function" ? businessStatsReadObject("emyClipViewStats") : clipViewStatsMap();
              (businessStatsContentPerformanceRows(businessReadPostedClips(), "clip", 0, Infinity, viewMap) || []).forEach((row) => {
                const item = row && row.item && typeof row.item === "object" ? row.item : {};
                const rowIds = [
                  row && row.id,
                  row && row.statsKey,
                  item.id,
                  item.feedId,
                  item.clipId,
                  item.reelId,
                  item.clipKey,
                  item.clipViewKey
                ].map(detailSlug).filter(Boolean);
                const rowTitle = detailSlug((row && row.title) || item.title || item.name || item.productName || item.productTitle || item.clipTitle || item.text);
                const rowBusiness = detailSlug(item.businessName || item.business || item.sellerName || item.storeName || item.actor || item.ownerName);
                let score = 0;
                if (rowIds.some((id) => wantedIds.has(id))) score += 100;
                if (wantedTitle && rowTitle === wantedTitle) score += 50;
                else if (wantedTitle && rowTitle && (rowTitle.indexOf(wantedTitle) >= 0 || wantedTitle.indexOf(rowTitle) >= 0)) score += 20;
                if (wantedBusiness && rowBusiness === wantedBusiness) score += 10;
                if (!score) return;
                const count = Math.max(0, Number(row && row.views) || 0);
                if (score > bestScore || score === bestScore && count > best) {
                  bestScore = score;
                  best = count;
                }
              });
            } catch (error) {}
            return best;
          }
          function clipViewBaseCount(card, details) {
            if (card && window.emyEngagement && typeof window.emyEngagement.viewCountForCard === "function") {
              const count = Number(window.emyEngagement.viewCountForCard(card));
              if (Number.isFinite(count)) return Math.max(0, count);
            }
            return 0;
          }
          function clipViewCount(clipKey, card, details) {
            const stats = clipViewStatsMap();
            const keys = clipViewKeysForCard(card, details, clipKey);
            const record = clipMergedViewRecord(stats, keys);
            const stored = clipSharedStoredViewCount(card, details, keys);
            const statsCount = Math.max(Number(record.total) || 0, record.events.length);
            if (stored.found) return Math.max(statsCount, stored.count, detailBusinessClipPerformanceViewFallback(card, details));
            return Math.max(statsCount, clipViewBaseCount(card, details), detailBusinessClipPerformanceViewFallback(card, details));
          }
          function setClipViewLabel(node, count) {
            if (!node) return;
            const next = Math.max(0, readEngagementCount(count));
            node.dataset.clipViewCount = "true";
            node.dataset.rawCount = String(next);
            node.textContent = formatEngagementCount(next) + " " + (next === 1 ? "view" : "views");
          }
          function syncClipViewCountForCard(card, forcedCount) {
            if (!card || !isClipCard(card)) return 0;
            const details = detailsFromCard(card);
            const clipKey = clipKeyForCard(card, details);
            const resolvedCount = clipViewCount(clipKey, card, details);
            const count = Number.isFinite(Number(forcedCount)) ? Math.max(0, Number(forcedCount), resolvedCount) : resolvedCount;
            const labels = Array.from(card.querySelectorAll("[data-clip-view-count]"));
            const actionRow = card.querySelector(".reel-actions, .search-reel-actions");
            if (actionRow && !labels.length) {
              const viewLabel = Array.from(actionRow.querySelectorAll("span")).find((node) => /view/i.test(node.textContent || ""));
              if (viewLabel) {
                viewLabel.setAttribute("data-clip-view-count", "");
                labels.push(viewLabel);
              } else {
                const label = document.createElement("span");
                label.setAttribute("data-clip-view-count", "");
                actionRow.insertBefore(label, actionRow.firstChild || null);
                labels.push(label);
              }
            }
            card.querySelectorAll(".reel-actions span, .search-reel-actions span").forEach((node) => {
              if (/view/i.test(node.textContent || "") && !labels.includes(node)) labels.push(node);
            });
            labels.forEach((node) => setClipViewLabel(node, count));
            if (card.dataset) {
              card.dataset.clipViewKey = clipKey;
              card.dataset.clipViewCount = String(count);
            }
            return count;
          }
          function syncAllClipViewCounts(root) {
            const scope = root && root.querySelectorAll ? root : document;
            if (scope.matches && scope.matches(cardSelector)) syncClipViewCountForCard(scope);
            scope.querySelectorAll(cardSelector).forEach((card) => syncClipViewCountForCard(card));
          }
          function syncClipViewCountForKey(clipKey, count) {
            if (!clipKey) return;
            document.querySelectorAll(cardSelector).forEach((card) => {
              if (!isClipCard(card)) return;
              const details = detailsFromCard(card);
              if (!clipViewKeysForCard(card, details, clipKeyForCard(card, details)).includes(clipKey)) return;
              syncClipViewCountForCard(card, count);
            });
          }
          function recordClipViewForSlide(slide) {
            if (!slide || !slide.dataset) return 0;
            const sourceCard = clipSourceCard(slide);
            const details = sourceCard ? detailsFromCard(sourceCard) : clipSourceDetails(slide);
            const clipKey = slide.dataset.clipKey || (sourceCard ? clipKeyForCard(sourceCard, details) : "");
            if (!clipKey) return 0;
            const person = detailCurrentPersonSnapshot();
            const now = Date.now();
            const stats = clipViewStatsMap();
            const keys = clipViewKeysForCard(sourceCard, details, clipKey);
            const record = clipMergedViewRecord(stats, keys);
            const yearAgo = now - 370 * 24 * 60 * 60 * 1000;
            const events = (Array.isArray(record.events) ? record.events : []).filter((item) => {
              const at = new Date(item && item.at || 0).getTime();
              return Number.isFinite(at) && at >= yearAgo;
            });
            const viewerKey = cleanText(person.key || person.name || "viewer").toLowerCase() || "viewer";
            const baseCount = clipViewCount(clipKey, sourceCard, details);
            events.push({ id: "clip-view-" + now + "-" + Math.random().toString(36).slice(2, 8), at: new Date(now).toISOString(), viewerName: person.name, viewerKey, role: person.role || activeDetailAccountRole() || "customer" });
            const storedEvents = events.slice(-220);
            const nextTotal = Math.max(baseCount + 1, storedEvents.length, (Number(record.total) || 0) + 1);
            keys.forEach((key) => {
              stats[key] = Object.assign({}, record, {
                events: storedEvents,
                total: Math.max(baseCount, nextTotal),
                lastViewedAt: storedEvents.length ? storedEvents[storedEvents.length - 1].at : (record.lastViewedAt || "")
              });
            });
            writeClipViewStatsMap(stats);
            const count = clipViewCount(clipKey, sourceCard, details);
            syncClipViewCountForKey(clipKey, count);
            return count;
          }
          function scheduleClipViewForSlide(slide) {
            if (!slide || !slide.dataset || !clipModal || !clipModal.classList.contains("is-open")) return;
            const session = String(clipViewerSessionId || 0);
            if (slide.dataset.clipViewRecordedSession === session) return;
            const sourceCard = clipSourceCard(slide);
            if (sourceCard && window.emyEngagement && typeof window.emyEngagement.scheduleView === "function") {
              window.emyEngagement.scheduleView(sourceCard);
            }
            if (clipViewQualificationTimer) window.clearTimeout(clipViewQualificationTimer);
            const token = session + ":" + (slide.dataset.clipKey || slide.dataset.clipSlide || "") + ":" + Date.now();
            clipViewQualificationToken = token;
            slide.dataset.clipViewPendingToken = token;
            clipViewQualificationTimer = window.setTimeout(() => {
              clipViewQualificationTimer = 0;
              if (clipViewQualificationToken !== token || slide.dataset.clipViewPendingToken !== token) return;
              if (!clipModal || !clipModal.classList.contains("is-open") || !slide.classList.contains("is-active")) return;
              slide.dataset.clipViewRecordedSession = session;
              recordClipViewForSlide(slide);
            }, 3000);
          }
          function clipProfileHref(key) {
            return "emy-business-profile.html?business=" + encodeURIComponent(cleanText(key) || "business");
          }
          function makeClipCommentId() {
            return "comment-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
          }
          function normaliseClipComments(comments) {
            return Array.isArray(comments) ? comments.map((comment) => ({
              id: cleanText(comment && comment.id) || makeClipCommentId(),
              author: cleanText(comment && comment.author) || currentUserDisplayName(),
              text: cleanText(comment && comment.text),
              createdAt: cleanText(comment && comment.createdAt) || new Date().toISOString(),
              mine: !!(comment && comment.mine) || isCurrentUserName(comment && comment.author, false),
              liked: !!(comment && comment.liked),
              likes: Math.max(0, Number(comment && comment.likes) || 0),
              disliked: !!(comment && comment.disliked),
              dislikes: Math.max(0, Number(comment && comment.dislikes) || 0),
              replies: Array.isArray(comment && comment.replies) ? comment.replies.map((reply) => ({
                id: cleanText(reply && reply.id) || makeClipCommentId(),
                author: cleanText(reply && reply.author) || currentUserDisplayName(),
                text: cleanText(reply && reply.text),
                mine: !!(reply && reply.mine) || isCurrentUserName(reply && reply.author, false),
                createdAt: cleanText(reply && reply.createdAt) || new Date().toISOString(),
                liked: !!(reply && reply.liked),
                likes: Math.max(0, Number(reply && reply.likes) || 0),
                disliked: !!(reply && reply.disliked),
                dislikes: Math.max(0, Number(reply && reply.dislikes) || 0)
              })).filter((reply) => reply.text) : []
            })).filter((comment) => comment.text) : [];
          }
          function clipCommentActionsMarkup(comment) {
            const likes = Math.max(0, Number(comment && comment.likes) || 0);
            const dislikes = Math.max(0, Number(comment && comment.dislikes) || 0);
            const ownerTools = comment && comment.mine ? '<button type="button" data-clip-comment-edit aria-label="Edit comment" title="Edit">' + actionIcon("edit") + '</button><button type="button" data-clip-comment-delete aria-label="Delete comment" title="Delete">' + actionIcon("delete") + '</button>' : "";
            return '<span class="clip-viewer-comment-actions"><button type="button" data-clip-comment-like class="' + (comment && comment.liked ? "is-active" : "") + '" aria-pressed="' + (comment && comment.liked ? "true" : "false") + '" aria-label="Like comment" title="Like">' + actionIcon("like") + '</button><span data-clip-comment-like-count data-raw-count="' + likes + '">' + formatEngagementCount(likes) + '</span><button type="button" data-clip-comment-dislike class="' + (comment && comment.disliked ? "is-active" : "") + '" aria-pressed="' + (comment && comment.disliked ? "true" : "false") + '" aria-label="Dislike comment" title="Dislike">' + actionIcon("dislike") + '</button><span data-clip-comment-dislike-count data-raw-count="' + dislikes + '">' + formatEngagementCount(dislikes) + '</span><button type="button" data-clip-comment-reply aria-label="Reply to comment" title="Reply">' + actionIcon("reply") + '</button>' + ownerTools + '</span>';
          }
          function renderClipReply(reply) {
            const author = cleanText(reply && reply.author) || currentUserDisplayName();
            const text = cleanText(reply && reply.text);
            if (!text) return "";
            const mine = !!(reply && reply.mine) || isCurrentUserName(author, false);
            const ownerTools = mine ? '<button type="button" data-clip-reply-edit aria-label="Edit reply" title="Edit">' + actionIcon("edit") + '</button><button type="button" data-clip-reply-delete aria-label="Delete reply" title="Delete">' + actionIcon("delete") + '</button>' : "";
            const likes = Math.max(0, Number(reply && reply.likes) || 0);
            const dislikes = Math.max(0, Number(reply && reply.dislikes) || 0);
            return '<div class="clip-viewer-comment-reply" data-clip-comment-reply-item="' + escapeDetail(reply.id || "") + '"' + (mine ? ' data-clip-reply-owned="true"' : '') + '>' + currentUserAvatarMarkup("clip-viewer-comment-avatar", author, mine, author) + '<span class="clip-viewer-comment-bubble"><strong>' + escapeDetail(author) + '</strong><span data-clip-comment-reply-text>' + escapeDetail(text) + '</span><span class="clip-viewer-comment-actions"><button type="button" data-clip-reply-like class="' + (reply && reply.liked ? "is-active" : "") + '" aria-pressed="' + (reply && reply.liked ? "true" : "false") + '" aria-label="Like reply" title="Like">' + actionIcon("like") + '</button><span data-clip-reply-like-count data-raw-count="' + likes + '">' + formatEngagementCount(likes) + '</span><button type="button" data-clip-reply-dislike class="' + (reply && reply.disliked ? "is-active" : "") + '" aria-pressed="' + (reply && reply.disliked ? "true" : "false") + '" aria-label="Dislike reply" title="Dislike">' + actionIcon("dislike") + '</button><span data-clip-reply-dislike-count data-raw-count="' + dislikes + '">' + formatEngagementCount(dislikes) + '</span>' + ownerTools + '</span></span></div>';
          }
          function renderSavedClipComment(comment) {
            const author = cleanText(comment && comment.author) || currentUserDisplayName();
            const text = cleanText(comment && comment.text);
            if (!text) return "";
            const replies = Array.isArray(comment && comment.replies) ? comment.replies.map(renderClipReply).join("") : "";
            const mine = !!(comment && comment.mine) || isCurrentUserName(author, false);
            return '<div class="clip-viewer-comment" data-clip-saved-comment data-clip-comment-id="' + escapeDetail(comment.id || "") + '"' + (mine ? ' data-clip-comment-owned="true"' : '') + '>' + currentUserAvatarMarkup("clip-viewer-comment-avatar", author, mine, author) + '<span class="clip-viewer-comment-body"><span class="clip-viewer-comment-bubble"><strong>' + escapeDetail(author) + '</strong><span data-clip-comment-text>' + escapeDetail(text) + '</span></span>' + clipCommentActionsMarkup(Object.assign({}, comment, { mine })) + '<span class="clip-viewer-comment-replies" data-clip-comment-replies>' + replies + '</span><form class="clip-viewer-comment-reply-form" data-clip-comment-reply-form hidden><input type="text" placeholder="Write a reply..." aria-label="Reply to comment" /><button type="submit" aria-label="Send reply" title="Send reply">' + actionIcon("send") + '</button></form></span></div>';
          }
          function clipInfoMarkup(details, businessKey) {
            const business = details.business || details.kind || "EMY Clip";
            const handle = clipHandle(details);
            const mediaClass = details.mediaClass ? " " + details.mediaClass : "";
            const sound = "Original clip - " + business;
            const price = cleanText(details.price);
            const isProductClip = cleanText(details.kind).toLowerCase().includes("product") || !!(details.productName || details.productTitle || details.productDescription || details.productInfo || details.productCategory || details.category || details.productAvailability || details.availability || price);
            const productName = cleanText(details.productName || details.productTitle || (isProductClip ? details.title : ""));
            const productDescription = cleanMultilineText(details.productDescription || details.productInfo || (isProductClip ? details.description : ""));
            const productCategory = cleanText(details.productCategory || details.category);
            const productAvailability = cleanText(details.productAvailability || details.availability || details.stockStatus);
            const productFacts = [
              price ? ["Price", price] : null,
              productCategory ? ["Category", productCategory] : null,
              productAvailability ? ["Status", productAvailability] : null
            ].filter(Boolean);
            const productDetails = isProductClip
              ? '<div class="clip-viewer-product-details" data-clip-viewer-product-details>' +
                  (productDescription ? '<p class="clip-viewer-product-copy">' + escapeDetail(productDescription) + '</p>' : '') +
                  (productFacts.length ? '<dl class="clip-viewer-product-facts">' + productFacts.map((item) => '<div><dt>' + escapeDetail(item[0]) + '</dt><dd>' + escapeDetail(item[1]) + '</dd></div>').join("") + '</dl>' : '') +
                '</div>'
              : "";
            const currentBusinessAvatar = detailIsCurrentBusinessIdentity(businessKey) || detailIsCurrentBusinessIdentity(business) ? currentBusinessProfilePhoto() : "";
            const avatarSrc = cleanText(details.avatarSrc || details.profilePhoto || details.photo || details.businessPhoto || currentBusinessAvatar);
            const avatarMarkup = avatarSrc
              ? '<span class="clip-viewer-avatar has-image" aria-hidden="true"><img src="' + escapeDetail(avatarSrc) + '" alt="" /></span>'
              : '<span class="clip-viewer-avatar' + escapeDetail(mediaClass) + '" aria-hidden="true"></span>';
            return '<aside class="clip-viewer-info" aria-label="Clip details">' +
              '<div class="clip-viewer-creator"><a class="clip-viewer-profile" href="' + escapeDetail(clipProfileHref(businessKey)) + '" data-clip-profile>' + avatarMarkup + '<span class="clip-viewer-identity"><strong>' + escapeDetail(business) + '</strong><span>' + escapeDetail(handle) + '</span></span></a><button class="clip-viewer-customer" type="button" data-clip-customer aria-label="Add ' + escapeDetail(business) + ' to My Businesses">Add to My Businesses</button></div>' +
              '<span class="clip-viewer-sound"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg>' + escapeDetail(sound) + '</span>' +
              '<h3>' + escapeDetail(productName || details.title) + '</h3>' +
              productDetails +
              (!isProductClip ? '<p>' + escapeDetail(details.description) + '</p>' : "") +
            '</aside>';
          }
          function clipCommentsMarkup(details, clipKey) {
            const businessName = details.business || details.kind || "Business";
            const state = readClipState(clipKey);
            const comments = normaliseClipComments(state.comments);
            if (comments.length || Array.isArray(state.comments)) writeClipState(clipKey, Object.assign({}, state, { comments }));
            const saved = comments.map(renderSavedClipComment).join("");
            return '<section class="clip-viewer-comments-panel" data-clip-comments-panel hidden>' +
              '<div class="clip-viewer-comments-head"><strong>Comments</strong><button type="button" data-clip-comments-close aria-label="Close comments">x</button></div>' +
              '<div class="clip-viewer-comments-list" data-clip-comments-list>' +
                saved +
              '</div>' +
              '<form class="clip-viewer-comment-form" data-clip-comment-form><input type="text" placeholder="Write a comment..." aria-label="Write a clip comment" /><button type="submit">Post</button></form>' +
            '</section>';
          }
          function clipMoreMenuMarkup(card, details) {
            const items = detailMenuItems(card, details);
            if (!items.length) return "";
            return '<div class="clip-viewer-more-menu" data-clip-more-menu hidden>' + items.map((item) => '<button type="button" data-clip-more-action="' + escapeDetail(item.action) + '"' + (item.danger ? ' class="is-danger"' : '') + '>' + escapeDetail(item.label) + '</button>').join("") + '</div>';
          }
          function clipMascotIconMarkup() {
            return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
              '<path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/>' +
              '<path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/>' +
              '<path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/>' +
              '<path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/>' +
              '<path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/>' +
              '<path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/>' +
              '<path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/>' +
            '</svg>';
          }
          function clipLikeChipMarkup() {
            return '<button class="clip-viewer-like-chip" type="button" data-clip-like-toggle aria-pressed="false" aria-label="Like Clip" title="Like Clip">' +
              '<span class="clip-viewer-like-icon">' + clipMascotIconMarkup() + '</span>' +
              '<span class="clip-viewer-like-label" data-clip-like-label>Like Clip</span>' +
              '<strong class="clip-viewer-like-count" data-clip-like-count data-raw-count="0">0</strong>' +
            '</button>';
          }
          function clipSlideMarkup(card, index) {
            const details = detailsFromCard(card);
            const businessName = details.business || details.kind || "EMY Clip";
            const businessKey = businessCardCustomerKey(card) || normaliseCustomerBusinessKey(businessName);
            const clipKey = clipStableKey(details, businessKey);
            const mediaNode = findMediaNode(card);
            const image = mediaNode && mediaNode.querySelector("img");
            const video = mediaNode && mediaNode.querySelector("video");
            const mediaClass = details.mediaClass ? " " + details.mediaClass : "";
            const detailMediaSrc = cleanText(details.mediaSrc);
            const detailMediaRef = cleanText(details.mediaRef);
            const detailMediaType = cleanText(details.mediaType).toLowerCase();
            const detailPosterSrc = cleanText(details.posterSrc);
            const detailPosterRef = cleanText(details.posterRef);
            const videoSrc = cleanText(video && (video.currentSrc || video.src || video.getAttribute("src"))) || (detailMediaType === "video" ? detailMediaSrc : "");
            const imageSrc = cleanText(image && (image.currentSrc || image.src || image.getAttribute("src"))) || (detailMediaType === "image" ? detailMediaSrc : "");
            const videoRef = detailMediaType === "video" ? detailMediaRef : "";
            const imageRef = detailMediaType === "image" ? detailMediaRef : "";
            const mediaHtml = videoSrc || videoRef
              ? '<video data-emy-frame-ready="false"' + (videoSrc ? ' src="' + escapeDetail(videoSrc) + '"' : '') + (videoRef ? ' data-emy-media-ref="' + escapeDetail(videoRef) + '"' : '') + (detailPosterSrc ? ' poster="' + escapeDetail(detailPosterSrc) + '"' : '') + (detailPosterRef ? ' data-emy-poster-ref="' + escapeDetail(detailPosterRef) + '"' : '') + ' muted playsinline preload="metadata"></video>'
              : imageSrc || imageRef
                ? '<img' + (imageSrc ? ' src="' + escapeDetail(imageSrc) + '"' : '') + (imageRef ? ' data-emy-media-ref="' + escapeDetail(imageRef) + '"' : '') + ' alt="" />'
                : "";
            const actions = clipActions(details).map(clipActionMarkup).join("");
            const commentCount = ((details.meta || []).find((item) => /comment/i.test(item)) || "").match(/\d+/);
            const info = clipInfoMarkup(details, businessKey);
            const videoProductName = cleanText(details.productName || details.productTitle || (cleanText(details.kind).toLowerCase().includes("product") ? details.title : ""));
            const videoProductPrice = cleanText(details.price);
            const videoProductChip = (videoProductName || videoProductPrice) && cleanText(details.kind).toLowerCase().includes("product")
              ? '<div class="clip-viewer-video-product-chip" data-clip-viewer-video-product><strong>' + escapeDetail(videoProductName || details.title) + '</strong>' + (videoProductPrice ? '<span>' + escapeDetail(videoProductPrice) + '</span>' : '') + '</div>'
              : "";
            const clipControls = '<div class="clip-viewer-controls" aria-label="Clip controls">' +
              '<button class="clip-viewer-control clip-viewer-control-play" type="button" data-clip-video-play aria-label="Play clip" aria-pressed="false"><svg class="pause-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z"/></svg><svg class="play-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></button>' +
              '<span class="clip-viewer-volume" data-clip-volume-wrap><button class="clip-viewer-control clip-viewer-control-sound" type="button" data-clip-video-mute aria-label="Mute clip" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5v5h4l5 4v-13l-5 4H4Z"/><path data-sound-wave d="M16.5 8.6c1.3 1.5 1.3 5.3 0 6.8"/><path data-sound-wave d="M19 6.6c2.2 2.7 2.2 8.1 0 10.8"/><path data-muted-mark d="m18 9 3 3m0-3-3 3"/></svg></button><span class="clip-viewer-volume-popover" data-clip-volume-popover><span class="clip-viewer-volume-track" aria-hidden="true"><span class="clip-viewer-volume-fill"></span><span class="clip-viewer-volume-knob"></span></span><input class="clip-viewer-volume-slider" type="range" min="0" max="1" step="0.01" value="1" data-clip-video-volume aria-label="Clip volume" /></span></span>' +
              '<button class="clip-viewer-control clip-viewer-control-more" type="button" data-clip-more aria-label="More clip options" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6.5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="17.5" cy="12" r="1.8"/></svg></button>' +
            '</div>';
            return '<section class="clip-viewer-slide" data-clip-slide="' + index + '" data-clip-key="' + escapeDetail(clipKey) + '" data-clip-base-comments="' + escapeDetail(commentCount ? commentCount[0] : "0") + '" data-clip-business-key="' + escapeDetail(businessKey) + '" data-clip-business-name="' + escapeDetail(businessName) + '">' +
              '<div class="clip-viewer-side">' +
                clipLikeChipMarkup() +
                info +
              '</div>' +
              '<article class="clip-viewer-frame" data-video-duration="' + escapeDetail(details.duration || "") + '">' +
                '<div class="clip-viewer-media' + mediaClass + '">' + mediaHtml + '<span class="clip-progress" aria-hidden="true"><span class="clip-progress-fill"></span></span></div>' +
                videoProductChip +
                clipControls +
                clipMoreMenuMarkup(card, details) +
                '<button class="clip-viewer-play" type="button" data-clip-video-play aria-label="Play clip"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></button>' +
                '<div class="clip-viewer-caption">' +
                  '<small>' + escapeDetail(details.business || details.kind || "EMY Clip") + '</small>' +
                  '<h3>' + escapeDetail(details.title) + '</h3>' +
                  '<p>' + escapeDetail(details.description) + '</p>' +
                  (details.price ? '<span class="clip-viewer-price">' + escapeDetail(details.price) + '</span>' : "") +
                '</div>' +
              '</article>' +
              clipCommentsMarkup(details, clipKey) +
            '</section>';
          }
          function clipCountValue(node) {
            return readEngagementCount(node);
          }
          function setClipCount(actionWrap, value) {
            if (!actionWrap) return;
            const countNode = actionWrap.querySelector("[data-clip-action-count]");
            if (!countNode) return;
            const next = Math.max(0, value);
            setEngagementCountText(countNode, next, true);
            actionWrap.classList.toggle("is-label-only", !next);
          }
          function setClipLikeChip(button, active, count) {
            if (!button) return;
            const nextCount = Math.max(0, Number(count) || 0);
            button.classList.toggle("is-active", !!active);
            button.classList.toggle("is-liked", !!active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
            button.setAttribute("aria-label", active ? "Liked Clip" : "Like Clip");
            button.setAttribute("title", active ? "Liked Clip" : "Like Clip");
            const label = button.querySelector("[data-clip-like-label]");
            if (label) label.textContent = active ? "Liked Clip" : "Like Clip";
            const countNode = button.querySelector("[data-clip-like-count]");
            if (countNode) {
              countNode.hidden = false;
              countNode.setAttribute("aria-hidden", "false");
              setEngagementCountText(countNode, nextCount, false);
            }
          }
          function pulseClipLikeMascot(button) {
            if (!button) return;
            button.classList.remove("is-bouncing");
            void button.offsetWidth;
            button.classList.add("is-bouncing");
            window.clearTimeout(button._clipLikeBounceTimer);
            button._clipLikeBounceTimer = window.setTimeout(() => button.classList.remove("is-bouncing"), 760);
          }
          function setClipFeedback(slide, message) {
            if (!slide) return;
            const node = slide.querySelector("[data-clip-feedback]");
            if (!node) return;
            node.textContent = message || "";
            window.clearTimeout(node._clipFeedbackTimer);
            if (message) node._clipFeedbackTimer = window.setTimeout(() => { node.textContent = ""; }, 1800);
          }
          function clipStateForSlide(slide) {
            return readClipState(slide && slide.dataset.clipKey);
          }
          function saveClipStateForSlide(slide, patch) {
            if (!slide || !slide.dataset.clipKey) return;
            const current = clipStateForSlide(slide);
            writeClipState(slide.dataset.clipKey, Object.assign({}, current, patch || {}));
          }
          function clipSourceCard(slide) {
            const index = Number(slide && slide.dataset.clipSlide);
            return Number.isFinite(index) ? activeClipCards[index] || null : null;
          }
          function clipSourceDetails(slide) {
            const card = clipSourceCard(slide);
            return card ? detailsFromCard(card) : null;
          }
          function clipVideoForSlide(slide) {
            return slide && slide.querySelector ? slide.querySelector(".clip-viewer-media video") : null;
          }
          function clipVideoSourceReady(video) {
            if (!video) return Promise.resolve("");
            const current = cleanText(video.currentSrc || video.src || video.getAttribute("src"));
            if (current) return Promise.resolve(current);
            const ref = cleanText(video.dataset && video.dataset.emyMediaRef);
            if (!ref || !window.emyResolveFeedMedia) return Promise.resolve("");
            video.dataset.emyMediaHydrating = "true";
            return window.emyResolveFeedMedia(ref).then((record) => {
              if (!record || !record.url) return "";
              video.src = record.url;
              video.dataset.emyMediaHydrated = "true";
              video.dataset.emyMediaHydratedRef = ref;
              video.dataset.emyMediaHydratedUrl = record.url;
              video.preload = "auto";
              video.setAttribute("preload", "auto");
              video.load();
              return record.url;
            }).catch(() => "").finally(() => {
              video.dataset.emyMediaHydrating = "false";
            });
          }
          function hydrateClipViewerSlidesAround(index) {
            if (!clipTrack || !window.emyHydrateFeedMedia) return;
            const slides = Array.from(clipTrack.querySelectorAll("[data-clip-slide]"));
            const hydrateAt = (offset) => {
              const slide = slides[index + offset];
              if (slide) window.emyHydrateFeedMedia(slide);
            };
            hydrateAt(0);
            window.setTimeout(() => { hydrateAt(-1); hydrateAt(1); }, 260);
            window.setTimeout(() => { hydrateAt(-2); hydrateAt(2); }, 1400);
          }
          function hardStopClipViewerMedia(reason) {
            const scope = clipModal || document;
            if (typeof window.emyStopAllMedia === "function") {
              try { window.emyStopAllMedia(scope, reason || "clip-viewer-close"); } catch (error) {}
            }
            const mediaNodes = [];
            if (scope && scope.querySelectorAll) {
              scope.querySelectorAll(".clip-viewer-media video, .clip-viewer-media audio, video, audio").forEach((media) => mediaNodes.push(media));
            }
            mediaNodes.forEach((media) => {
              try { media.pause(); } catch (error) {}
              try {
                media.autoplay = false;
                media.removeAttribute("autoplay");
                media.muted = true;
                media.defaultMuted = true;
                media.setAttribute("muted", "");
              } catch (error) {}
              try {
                if (Number.isFinite(media.duration) || media.readyState >= 1) media.currentTime = 0;
              } catch (error) {}
              if (media.dataset) {
                media.dataset.clipViewerNeedsRestart = "true";
                media.dataset.emyStoppedReason = reason || "clip-viewer-close";
              }
            });
            if (clipTrack && clipTrack.querySelectorAll) {
              clipTrack.querySelectorAll("[data-clip-slide]").forEach((slide) => updateClipVideoControls(slide));
            }
          }
          function resetClipVideoToStart(slide) {
            const video = clipVideoForSlide(slide);
            if (!video) return;
            const seek = () => {
              try { video.currentTime = 0; } catch (error) {}
              if (video.dataset) video.dataset.clipViewerNeedsRestart = "false";
              updateClipVideoControls(slide);
            };
            if (video.readyState >= 1 || Number.isFinite(video.duration)) seek();
            else video.addEventListener("loadedmetadata", seek, { once: true });
          }
          function clampClipViewerVolume(value) {
            const number = Number(value);
            if (!Number.isFinite(number)) return 1;
            return Math.max(0, Math.min(1, number));
          }
          function setClipViewerSoundPreference(enabled, persist = true) {
            clipViewerSoundOn = !!enabled;
            if (!persist) return;
            try {
              localStorage.setItem("emyClipViewerSoundOn", clipViewerSoundOn ? "1" : "0");
            } catch (error) {}
          }
          function setClipViewerVolumePreference(value, persist = true) {
            clipViewerVolume = clampClipViewerVolume(value);
            if (!persist) return;
            try {
              localStorage.setItem("emyClipViewerVolume", String(clipViewerVolume));
            } catch (error) {}
          }
          function updateClipVideoControls(slide) {
            if (!slide) return;
            const frame = slide.querySelector(".clip-viewer-frame");
            const video = clipVideoForSlide(slide);
            const hasVideo = !!video;
            const paused = !hasVideo || video.paused || video.ended;
            const muted = !hasVideo || video.muted || Number(video.volume) <= 0;
            const volume = hasVideo && !muted ? clampClipViewerVolume(video.volume) : 0;
            if (frame) {
              frame.classList.toggle("has-video", hasVideo);
              frame.classList.toggle("is-paused", paused);
              frame.classList.toggle("is-playing", hasVideo && !paused);
              frame.classList.toggle("is-muted", muted);
            }
            slide.querySelectorAll("[data-clip-video-play]").forEach((button) => {
              button.disabled = !hasVideo;
              button.setAttribute("aria-label", paused ? "Play clip" : "Pause clip");
              button.setAttribute("aria-pressed", paused ? "false" : "true");
            });
            slide.querySelectorAll("[data-clip-video-mute]").forEach((button) => {
              button.disabled = !hasVideo;
              button.setAttribute("aria-label", muted ? "Turn clip sound on" : "Mute clip");
              button.setAttribute("aria-pressed", muted ? "true" : "false");
            });
            slide.querySelectorAll("[data-clip-volume-wrap]").forEach((wrap) => {
              wrap.style.setProperty("--clip-viewer-volume", String(volume));
            });
            slide.querySelectorAll("[data-clip-video-volume]").forEach((input) => {
              input.disabled = !hasVideo;
              if (document.activeElement !== input) input.value = String(volume);
              input.setAttribute("aria-valuetext", Math.round(volume * 100) + "%");
            });
          }
          function setupClipVideoControls(root) {
            (root || document).querySelectorAll("[data-clip-slide]").forEach((slide) => {
              const video = clipVideoForSlide(slide);
              if (video && video.dataset.clipVideoControlsBound !== "true") {
                video.dataset.clipVideoControlsBound = "true";
                video.controls = false;
                video.playsInline = true;
                video.autoplay = true;
                video.preload = "auto";
                video.setAttribute("playsinline", "");
                video.volume = clipViewerVolume > 0 ? clipViewerVolume : 1;
                video.defaultMuted = !clipViewerSoundOn;
                video.muted = !clipViewerSoundOn;
                if (clipViewerSoundOn) video.removeAttribute("muted");
                else video.setAttribute("muted", "");
                ["play", "pause", "ended", "loadedmetadata", "volumechange"].forEach((type) => {
                  video.addEventListener(type, () => updateClipVideoControls(slide));
                });
              }
              updateClipVideoControls(slide);
            });
          }
          function pauseInactiveClipVideos(activeSlide) {
            if (!clipTrack) return;
            const slides = Array.from(clipTrack.querySelectorAll("[data-clip-slide]"));
            const activeIndex = slides.indexOf(activeSlide);
            const candidates = new Set();
            clipTrack.querySelectorAll("[data-clip-slide].is-active").forEach((slide) => candidates.add(slide));
            if (activeIndex >= 0) {
              slides.forEach((slide, index) => {
                if (Math.abs(index - activeIndex) <= 1) candidates.add(slide);
              });
            } else {
              slides.forEach((slide) => candidates.add(slide));
            }
            candidates.forEach((slide) => {
              if (slide === activeSlide) return;
              const video = clipVideoForSlide(slide);
              if (video) {
                if (!video.paused) video.pause();
                if (video.dataset) video.dataset.clipViewerNeedsRestart = "true";
                resetClipVideoToStart(slide);
              }
              updateClipVideoControls(slide);
            });
          }
          function applyClipViewerSoundPreference(video) {
            if (!video) return;
            if (clipViewerSoundOn) {
              video.volume = clipViewerVolume > 0 ? clipViewerVolume : 1;
              video.muted = false;
              video.defaultMuted = false;
              video.removeAttribute("muted");
            } else {
              video.muted = true;
              video.defaultMuted = true;
              video.setAttribute("muted", "");
            }
          }
          function restoreClipViewerSound(slide) {
            if (!clipViewerSoundOn) return;
            const targetSlide = slide || activeClipSlideFromTrack();
            const video = clipVideoForSlide(targetSlide);
            if (!video) return;
            video.volume = clipViewerVolume > 0 ? clipViewerVolume : 1;
            video.muted = false;
            video.defaultMuted = false;
            video.removeAttribute("muted");
            const playPromise = video.paused ? video.play() : null;
            if (playPromise && typeof playPromise.catch === "function") {
              playPromise.catch(() => updateClipVideoControls(targetSlide));
            }
            updateClipVideoControls(targetSlide);
          }
          function setClipVideoPlayback(slide, shouldPlay, options = {}) {
            const video = clipVideoForSlide(slide);
            if (!video) return;
            if (shouldPlay) {
              pauseInactiveClipVideos(slide);
              let fallbackMuted = false;
              let mutedRetryCount = 0;
              applyClipViewerSoundPreference(video);
              if (options.restart === true || video.ended || video.dataset.clipViewerNeedsRestart === "true") resetClipVideoToStart(slide);
              if (window.emyPauseOtherMedia) window.emyPauseOtherMedia(video);
              const tryPlay = () => {
                if (!slide.classList.contains("is-active") || !clipModal || !clipModal.classList.contains("is-open")) return;
                if (fallbackMuted || !clipViewerSoundOn) {
                  video.muted = true;
                  video.defaultMuted = true;
                  video.setAttribute("muted", "");
                } else {
                  applyClipViewerSoundPreference(video);
                }
                const playPromise = video.play();
                if (playPromise && typeof playPromise.catch === "function") {
                  playPromise.then(() => {
                    updateClipVideoControls(slide);
                  }).catch(() => {
                    const wasTryingSound = !video.muted && clipViewerSoundOn && !fallbackMuted;
                    if (wasTryingSound) {
                      fallbackMuted = true;
                      video.muted = true;
                      video.defaultMuted = true;
                      video.setAttribute("muted", "");
                      window.setTimeout(tryPlay, video.readyState < 2 ? 220 : 80);
                      updateClipVideoControls(slide);
                      return;
                    }
                    if (mutedRetryCount < 4) {
                      mutedRetryCount += 1;
                      window.setTimeout(tryPlay, video.readyState < 2 ? 260 : 120);
                      updateClipVideoControls(slide);
                      return;
                    }
                    video.muted = true;
                    video.defaultMuted = true;
                    video.setAttribute("muted", "");
                    updateClipVideoControls(slide);
                  });
                } else {
                  updateClipVideoControls(slide);
                }
              };
              if (!cleanText(video.currentSrc || video.src || video.getAttribute("src")) && cleanText(video.dataset && video.dataset.emyMediaRef)) {
                clipVideoSourceReady(video).then(() => {
                  if (slide.classList.contains("is-active")) tryPlay();
                  updateClipVideoControls(slide);
                });
                updateClipVideoControls(slide);
                return;
              }
              if (video.readyState < 2) {
                try { video.load(); } catch (error) {}
                ["loadedmetadata", "loadeddata", "canplay"].forEach((eventName) => {
                  video.addEventListener(eventName, tryPlay, { once: true });
                });
                window.setTimeout(tryPlay, 260);
              }
              tryPlay();
            } else {
              video.pause();
              if (video.dataset) video.dataset.clipViewerNeedsRestart = "true";
              if (options.reset === true) resetClipVideoToStart(slide);
            }
            updateClipVideoControls(slide);
          }
          function activeClipSlideFromTrack() {
            if (!clipModal || !clipTrack || !clipModal.classList.contains("is-open")) return null;
            const slides = Array.from(clipTrack.querySelectorAll("[data-clip-slide]"));
            if (!slides.length) return null;
            const trackRect = clipTrack.getBoundingClientRect();
            const trackCenter = trackRect.top + trackRect.height / 2;
            let bestSlide = null;
            let bestScore = -Infinity;
            slides.forEach((slide) => {
              const rect = slide.getBoundingClientRect();
              if (!rect.height || !rect.width) return;
              const visible = Math.max(0, Math.min(rect.bottom, trackRect.bottom) - Math.max(rect.top, trackRect.top));
              const ratio = visible / Math.max(1, rect.height);
              const distance = Math.abs((rect.top + rect.height / 2) - trackCenter) / Math.max(1, trackRect.height);
              const score = ratio - distance;
              if (score > bestScore) {
                bestScore = score;
                bestSlide = slide;
              }
            });
            return bestSlide || slides[0] || null;
          }
          function activateClipViewerSlide(activeSlide, force) {
            if (!activeSlide) return;
            const nextKey = activeSlide.dataset.clipSlide || activeSlide.dataset.clipKey || "";
            clipTrack.querySelectorAll("[data-clip-slide]").forEach((slide) => {
              slide.classList.toggle("is-active", slide === activeSlide);
            });
            hydrateClipViewerSlidesAround(Number(activeSlide.dataset.clipSlide) || 0);
            pauseInactiveClipVideos(activeSlide);
            if (force || nextKey !== activeClipSlideKey) {
              activeClipSlideKey = nextKey;
              scheduleClipViewForSlide(activeSlide);
              setClipVideoPlayback(activeSlide, true, { restart: true });
            } else {
              const video = clipVideoForSlide(activeSlide);
              if (video && video.paused) setClipVideoPlayback(activeSlide, true);
            }
          }
          function syncActiveClipPlayback(force) {
            activateClipViewerSlide(activeClipSlideFromTrack(), force);
          }
          function scheduleActiveClipPlayback(force) {
            if (clipAutoplayTimer) window.clearTimeout(clipAutoplayTimer);
            clipAutoplayTimer = window.setTimeout(() => {
              clipAutoplayTimer = 0;
              syncActiveClipPlayback(!!force);
            }, force ? 16 : 84);
          }
          function toggleClipVideoPlayback(slide) {
            const video = clipVideoForSlide(slide);
            if (!video) return;
            setClipVideoPlayback(slide, video.paused || video.ended);
          }
          function setClipVideoVolume(slide, value, persist = true) {
            const video = clipVideoForSlide(slide);
            if (!video) return;
            const volume = clampClipViewerVolume(value);
            setClipViewerVolumePreference(volume, persist);
            if (volume <= 0) {
              video.volume = 0;
              video.muted = true;
              video.defaultMuted = true;
              video.setAttribute("muted", "");
              setClipViewerSoundPreference(false, persist);
            } else {
              video.volume = volume;
              video.muted = false;
              video.defaultMuted = false;
              video.removeAttribute("muted");
              setClipViewerSoundPreference(true, persist);
              if (persist && (video.paused || video.ended)) setClipVideoPlayback(slide, true);
            }
            updateClipVideoControls(slide);
          }
          function toggleClipVideoMute(slide) {
            const video = clipVideoForSlide(slide);
            if (!video) return;
            const isMuted = video.muted || Number(video.volume) <= 0;
            if (isMuted) {
              if (clipViewerVolume <= 0) setClipViewerVolumePreference(1, true);
              video.volume = clipViewerVolume > 0 ? clipViewerVolume : 1;
              video.muted = false;
              video.defaultMuted = false;
              video.removeAttribute("muted");
            } else {
              video.muted = true;
              video.defaultMuted = true;
              video.setAttribute("muted", "");
            }
            setClipViewerSoundPreference(!(video.muted || Number(video.volume) <= 0));
            if (clipViewerSoundOn && (video.paused || video.ended)) setClipVideoPlayback(slide, true);
            updateClipVideoControls(slide);
          }
          function closeClipMoreMenus(exceptMenu) {
            if (!clipTrack) return;
            clipTrack.querySelectorAll("[data-clip-more-menu]").forEach((menu) => {
              if (menu !== exceptMenu) menu.hidden = true;
            });
            clipTrack.querySelectorAll("[data-clip-more]").forEach((button) => {
              const slide = button.closest("[data-clip-slide]");
              const menu = slide && slide.querySelector("[data-clip-more-menu]");
              button.setAttribute("aria-expanded", menu && !menu.hidden ? "true" : "false");
            });
          }
          function positionClipMoreMenu(menu, button) {
            if (!menu || !button || !button.getBoundingClientRect) return;
            const margin = 12;
            const rect = button.getBoundingClientRect();
            const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            const menuWidth = Math.min(260, Math.max(180, viewportWidth - margin * 2));
            menu.style.width = menuWidth + "px";
            menu.style.maxHeight = Math.max(120, viewportHeight - margin * 2) + "px";
            const left = Math.max(margin, Math.min(viewportWidth - menuWidth - margin, rect.left));
            menu.style.setProperty("--clip-more-left", left + "px");
            menu.style.setProperty("--clip-more-top", Math.max(margin, rect.bottom + 8) + "px");
            window.requestAnimationFrame(() => {
              const height = Math.min(menu.scrollHeight || menu.offsetHeight || 0, viewportHeight - margin * 2);
              const below = rect.bottom + 8;
              const above = rect.top - height - 8;
              const top = below + height <= viewportHeight - margin ? below : Math.max(margin, above);
              menu.style.setProperty("--clip-more-top", top + "px");
            });
          }
          function openClipMoreOptions(button) {
            const slide = button && button.closest("[data-clip-slide]");
            const menu = slide && slide.querySelector("[data-clip-more-menu]");
            if (!slide || !menu) {
              setClipFeedback(slide, "No more options for this clip.");
              return;
            }
            const shouldOpen = menu.hidden || button.getAttribute("aria-expanded") !== "true";
            closeClipMoreMenus(menu);
            if (!shouldOpen) {
              menu.hidden = true;
              button.setAttribute("aria-expanded", "false");
              return;
            }
            menu.hidden = false;
            positionClipMoreMenu(menu, button);
            button.setAttribute("aria-expanded", "true");
          }
          function handleClipMoreAction(button) {
            const slide = button && button.closest("[data-clip-slide]");
            const action = cleanText(button && button.dataset.clipMoreAction);
            if (!slide || !action) return;
            closeClipMoreMenus();
            const sourceCard = clipSourceCard(slide);
            const details = sourceCard ? detailsFromCard(sourceCard) : clipSourceDetails(slide);
            if (action === "edit") {
              const editKind = detailKindLabel(sourceCard, details) || "clip";
              const editFeedback = (message) => {
                if (typeof showToast === "function") showToast(message);
                else setClipFeedback(slide, message);
              };
              if (sourceCard && window.emyOpenOriginalFeedEdit) {
                try {
                  const opened = window.emyOpenOriginalFeedEdit(sourceCard, { kind: editKind, showToast: editFeedback });
                  if (opened !== false) {
                    setClipViewerOpen(false);
                    return;
                  }
                } catch (error) {}
              }
              setClipFeedback(slide, "Open the original clip post to edit it.");
              return;
            }
            const sourceButton = sourceDetailOption(sourceCard, action);
            const closeForSource = action === "edit" || action === "open" || action === "delete";
            const runSourceButton = () => {
              if (closeForSource) {
                setClipViewerOpen(false);
                const clickSource = () => sourceButton.click();
                if (window.emyRunAfterNextPaint) window.emyRunAfterNextPaint(clickSource);
                else window.setTimeout(clickSource, 16);
                return;
              }
              sourceButton.click();
            };
            if (sourceButton && action === "delete") {
              const copy = detailDeleteCopy(sourceCard, details);
              const finishDelete = () => {
                setClipViewerOpen(false);
                const runDelete = () => {
                  sourceButton.dataset.emyDeleteConfirmedOnce = "true";
                  window.__emyDeleteConfirmBypass = true;
                  try {
                    sourceButton.click();
                  } finally {
                    window.setTimeout(() => {
                      delete sourceButton.dataset.emyDeleteConfirmedOnce;
                      window.__emyDeleteConfirmBypass = false;
                    }, 0);
                  }
                };
                if (window.emyRunAfterNextPaint) window.emyRunAfterNextPaint(runDelete);
                else window.setTimeout(runDelete, 16);
              };
              if (window.emyConfirmDelete) window.emyConfirmDelete(copy).then((confirmed) => { if (confirmed) finishDelete(); });
              else finishDelete();
              return;
            }
            if (sourceButton) {
              runSourceButton();
              return;
            }
            if (action === "delete") {
              const finishDelete = () => {
                if (sourceCard) sourceCard.hidden = true;
                slide.remove();
                if (!clipTrack || !clipTrack.querySelector("[data-clip-slide]")) setClipViewerOpen(false);
                else scheduleActiveClipPlayback(true);
              };
              const copy = detailDeleteCopy(sourceCard, details);
              if (window.emyConfirmDelete) window.emyConfirmDelete(copy).then((confirmed) => { if (confirmed) finishDelete(); });
              else finishDelete();
              return;
            }
            if (action === "hide") {
              if (sourceCard) sourceCard.hidden = true;
              slide.remove();
              if (!clipTrack || !clipTrack.querySelector("[data-clip-slide]")) setClipViewerOpen(false);
              else scheduleActiveClipPlayback(true);
              return;
            }
            if (action === "open") {
              setClipFeedback(slide, "This clip is already open.");
              return;
            }
            if (action === "repost" && sourceCard && details) {
              if (toggleDetailRepost(sourceCard, details, () => {
                refreshClipActionStates(clipTrack || document);
                setClipFeedback(slide, "Repost removed.");
              })) return;
              openDetailRepostDialog(sourceCard, details, () => {
                refreshClipActionStates(clipTrack || document);
                setClipFeedback(slide, "Clip reposted.");
              });
              return;
            }
            if (action === "share") {
              if (sourceCard) shareLiveCard(sourceCard);
              else setClipFeedback(slide, "Share this clip from the browser.");
              return;
            }
            if (action === "copy") {
              const shareUrl = (() => {
                const next = new URL(window.location.href);
                next.searchParams.set("clip", slide.dataset.clipKey || "clip");
                return next.href;
              })();
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(shareUrl).then(() => setClipFeedback(slide, "Clip link copied."));
              } else {
                setClipFeedback(slide, "Copy this page link from the browser.");
              }
              return;
            }
            if (action === "report") {
              setClipFeedback(slide, "Report sent.");
            }
          }
          function setClipSourceButtons(card, action, active) {
            if (!card) return;
            const selectors = {
              like: '[data-feed-action="like"], [data-feed-like]',
              save: '[data-feed-action="save"], [data-feed-save], .social-feed-save, [data-heart]'
            };
            const selector = selectors[action];
            if (!selector) return;
            card.querySelectorAll(selector).forEach((button) => {
              button.classList.toggle("is-active", !!active);
              if (action === "save") button.classList.toggle("is-liked", !!active);
              button.setAttribute("aria-pressed", active ? "true" : "false");
              if (action === "save") {
                button.setAttribute("aria-label", active ? "Saved" : "Save");
                button.setAttribute("title", active ? "Saved" : "Save");
              }
            });
          }
          function clipUniqueLikedByFromStates(feedState, clipState) {
            return detailMergeRows([].concat(
              Array.isArray(feedState && feedState.likedBy) ? feedState.likedBy : [],
              Array.isArray(clipState && clipState.likedBy) ? clipState.likedBy : []
            ), ["role", "actorType", "key", "email", "name"]);
          }
          function clipLikeCrowdState(slide, options) {
            const opts = options || {};
            const sourceCard = Object.prototype.hasOwnProperty.call(opts, "sourceCard") ? opts.sourceCard : clipSourceCard(slide);
            const sourceDetails = Object.prototype.hasOwnProperty.call(opts, "sourceDetails") ? opts.sourceDetails : (sourceCard ? detailsFromCard(sourceCard) : null);
            const clipState = clipStateForSlide(slide);
            const feedState = sourceCard ? detailFeedStateForCard(sourceCard) : {};
            let likedBy = clipUniqueLikedByFromStates(feedState, clipState);
            if (!likedBy.length && (feedState.liked || clipState.liked)) likedBy = detailPeopleListWithCurrent(likedBy, true);
            const active = detailCurrentPersonIn(likedBy);
            const peopleCount = detailPeopleCount(likedBy);
            const visibleCount = Number(opts.visibleCount);
            const fallbackCount = Math.max(
              0,
              Number(feedState.countedLikeCount) || 0,
              Number(feedState.likeCount) || 0,
              Number(clipState.countedLikeCount) || 0,
              Number(clipState.likeCount) || 0,
              Number.isFinite(visibleCount) ? visibleCount : 0,
              peopleCount
            );
            const feedHasBase = Object.prototype.hasOwnProperty.call(feedState, "baseLikeCount");
            const clipHasBase = Object.prototype.hasOwnProperty.call(clipState, "baseLikeCount");
            const storedBase = feedHasBase ? Number(feedState.baseLikeCount) : (clipHasBase ? Number(clipState.baseLikeCount) : NaN);
            const baseLikeCount = Number.isFinite(storedBase) ? Math.max(0, storedBase) : Math.max(0, fallbackCount - peopleCount);
            return { sourceCard, sourceDetails, active, likedBy, baseLikeCount, count: baseLikeCount + peopleCount };
          }
          function commitClipLikeCrowd(slide, crowdState, active) {
            const likedBy = detailPeopleListWithCurrent(crowdState && crowdState.likedBy, !!active);
            const baseLikeCount = Math.max(0, Number(crowdState && crowdState.baseLikeCount) || 0);
            const nextCount = baseLikeCount + detailPeopleCount(likedBy);
            const patch = { liked: false, disliked: false, baseLikeCount, countedLikeCount: nextCount, likeCount: nextCount, likedBy };
            saveClipStateForSlide(slide, patch);
            syncClipSourceLike(slide, !!active, nextCount, patch);
            return { active: !!active, count: nextCount, patch };
          }
          function syncClipSourceLike(slide, active, count, crowdPatch) {
            const sourceCard = clipSourceCard(slide);
            if (!sourceCard) return;
            const nextCount = Math.max(0, Number(count) || 0);
            detailSetCountText(sourceCard, "[data-feed-like-count], [data-home-created-like-count]", nextCount);
            setClipSourceButtons(sourceCard, "like", active);
            const state = detailFeedStateForCard(sourceCard);
            const nextLikedBy = crowdPatch && Array.isArray(crowdPatch.likedBy) ? crowdPatch.likedBy : detailPeopleListWithCurrent(state.likedBy, !!active);
            const nextBase = crowdPatch && Number.isFinite(Number(crowdPatch.baseLikeCount)) ? Math.max(0, Number(crowdPatch.baseLikeCount)) : Math.max(0, nextCount - detailPeopleCount(nextLikedBy));
            detailUpdateFeedStateForCard(sourceCard, { liked: false, disliked: false, baseLikeCount: nextBase, countedLikeCount: nextCount, likeCount: nextCount, likedBy: nextLikedBy });
            detailSyncSourceFooter(sourceCard);
          }
          function syncClipSourceSaved(slide, active) {
            const sourceCard = clipSourceCard(slide);
            if (!sourceCard) return;
            const details = detailsFromCard(sourceCard);
            const wasActive = detailSourceActionActive(sourceCard, "save");
            const counts = detailCountsFromCard(sourceCard, details);
            const nextSavedCount = Math.max(0, counts.saved + (active === wasActive ? 0 : active ? 1 : -1));
            setClipSourceButtons(sourceCard, "save", active);
            const state = detailFeedStateForCard(sourceCard);
            const nextSavedBy = detailPeopleListWithCurrent(state.savedBy, !!active);
            detailUpdateFeedStateForCard(sourceCard, { saved: false, baseSavedCount: 0, savedCount: detailPeopleCount(nextSavedBy), savedBy: nextSavedBy });
            detailSetSavedFeedItem(sourceCard, details, active);
            detailSyncSourceFooter(sourceCard);
            if (active && !wasActive) notifyClipOwner(slide, "save", currentUserDisplayName() + " saved your clip.");
          }
          function refreshClipActionStates(root) {
            (root || document).querySelectorAll("[data-clip-slide]").forEach((slide) => {
              const state = clipStateForSlide(slide);
              const likeWrap = slide.querySelector('[data-clip-action-wrap="like"]');
              const dislikeWrap = slide.querySelector('[data-clip-action-wrap="dislike"]');
              const commentWrap = slide.querySelector('[data-clip-action-wrap="comment"]');
              const repostWrap = slide.querySelector('[data-clip-action-wrap="repost"]');
              const savedWrap = slide.querySelector('[data-clip-action-wrap="saved"]');
              const likeChip = slide.querySelector("[data-clip-like-toggle]");
              const sourceCard = clipSourceCard(slide);
              const sourceDetails = clipSourceDetails(slide);
              const likeState = clipLikeCrowdState(slide, { sourceCard, sourceDetails });
              const liked = likeState.active;
              const likeCount = likeState.count;
              if (likeChip) setClipLikeChip(likeChip, liked, Number.isFinite(Number(likeCount)) ? Number(likeCount) : 0);
              if (likeWrap) {
                likeWrap.classList.toggle("is-active", liked);
                const likeButton = likeWrap.querySelector("[data-clip-action]");
                if (likeButton) likeButton.setAttribute("aria-pressed", liked ? "true" : "false");
                if (Number.isFinite(Number(likeCount))) setClipCount(likeWrap, Number(likeCount));
              }
              if (dislikeWrap) {
                dislikeWrap.classList.toggle("is-active", !!state.disliked);
                const dislikeButton = dislikeWrap.querySelector("[data-clip-action]");
                if (dislikeButton) dislikeButton.setAttribute("aria-pressed", state.disliked ? "true" : "false");
              }
              if (commentWrap && Number.isFinite(Number(state.commentCount))) {
                setClipCount(commentWrap, Number(state.commentCount));
              }
              if (repostWrap && sourceCard && sourceDetails) {
                const count = detailRepostCount(sourceCard, sourceDetails);
                setClipCount(repostWrap, count);
                repostWrap.classList.toggle("is-active", count > 0);
                const repostButton = repostWrap.querySelector("[data-clip-action]");
                if (repostButton) {
                  repostButton.setAttribute("aria-pressed", count > 0 ? "true" : "false");
                  repostButton.setAttribute("aria-label", count === 1 ? "1 repost" : count + " reposts");
                }
              }
              if (savedWrap) {
                const saved = sourceCard ? detailSourceActionActive(sourceCard, "save") : !!state.saved;
                savedWrap.classList.toggle("is-active", saved);
                const savedButton = savedWrap.querySelector("[data-clip-action]");
                if (savedButton) {
                  savedButton.setAttribute("aria-pressed", saved ? "true" : "false");
                  savedButton.setAttribute("aria-label", saved ? "Saved clip" : "Save clip");
                }
              }
            });
          }
          function toggleClipLikeChip(button) {
            const slide = button && button.closest("[data-clip-slide]");
            if (!slide) return;
            const sourceCard = clipSourceCard(slide);
            const sourceDetails = sourceCard ? detailsFromCard(sourceCard) : null;
            const beforeCounts = sourceCard && sourceDetails ? detailCountsFromCard(sourceCard, sourceDetails) : null;
            const likeState = clipLikeCrowdState(slide, { sourceCard, sourceDetails, visibleCount: clipCountValue(button.querySelector("[data-clip-like-count]")) });
            const wasActive = likeState.active;
            const active = !wasActive;
            const nextLike = commitClipLikeCrowd(slide, likeState, active);
            const nextCount = nextLike.count;
            const likeWrap = slide.querySelector('[data-clip-action-wrap="like"]');
            const dislikeWrap = slide.querySelector('[data-clip-action-wrap="dislike"]');
            if (likeWrap) {
              likeWrap.classList.toggle("is-active", active);
              setClipCount(likeWrap, nextCount);
              const likeButton = likeWrap.querySelector("[data-clip-action]");
              if (likeButton) likeButton.setAttribute("aria-pressed", active ? "true" : "false");
            }
            if (dislikeWrap) {
              dislikeWrap.classList.remove("is-active");
              const dislikeButton = dislikeWrap.querySelector("[data-clip-action]");
              if (dislikeButton) dislikeButton.setAttribute("aria-pressed", "false");
            }
            setClipLikeChip(button, active, nextCount);
            pulseClipLikeMascot(button);
            if (sourceCard && sourceDetails) detailRecordOwnerEngagementAction("like", active, wasActive, { card: sourceCard, details: sourceDetails, beforeCounts });
            else if (active && !wasActive) notifyClipOwner(slide, "like", currentUserDisplayName() + " liked your clip.");
            refreshClipActionStates(slide);
            setClipFeedback(slide, active ? "Clip liked." : "Like removed.");
          }
          function handleClipAction(button) {
            const slide = button.closest("[data-clip-slide]");
            const action = button.dataset.clipAction || "";
            const wrap = button.closest("[data-clip-action-wrap]");
            if (!slide || !wrap) return;
            if (action === "like") {
              const dislikeWrap = slide.querySelector('[data-clip-action-wrap="dislike"]');
              const sourceCard = clipSourceCard(slide);
              const sourceDetails = sourceCard ? detailsFromCard(sourceCard) : null;
              const beforeCounts = sourceCard && sourceDetails ? detailCountsFromCard(sourceCard, sourceDetails) : null;
              const likeState = clipLikeCrowdState(slide, { sourceCard, sourceDetails, visibleCount: clipCountValue(wrap.querySelector("[data-clip-action-count]")) });
              const wasActive = likeState.active;
              const active = !wasActive;
              const nextLike = commitClipLikeCrowd(slide, likeState, active);
              const nextCount = nextLike.count;
              wrap.classList.toggle("is-active", active);
              if (dislikeWrap) dislikeWrap.classList.remove("is-active");
              setClipCount(wrap, nextCount);
              button.setAttribute("aria-pressed", active ? "true" : "false");
              const dislikeButton = dislikeWrap && dislikeWrap.querySelector("[data-clip-action]");
              if (dislikeButton) dislikeButton.setAttribute("aria-pressed", "false");
              if (sourceCard && sourceDetails) detailRecordOwnerEngagementAction("like", active, wasActive, { card: sourceCard, details: sourceDetails, beforeCounts });
              else if (active) notifyClipOwner(slide, "like", currentUserDisplayName() + " liked your clip.");
              setClipFeedback(slide, wasActive ? "Like removed." : "Clip liked.");
              refreshClipActionStates(slide);
              return;
            }
            if (action === "dislike") {
              const likeWrap = slide.querySelector('[data-clip-action-wrap="like"]');
              const sourceCard = clipSourceCard(slide);
              const sourceDetails = sourceCard ? detailsFromCard(sourceCard) : null;
              const beforeCounts = sourceCard && sourceDetails ? detailCountsFromCard(sourceCard, sourceDetails) : null;
              const likeState = clipLikeCrowdState(slide, { sourceCard, sourceDetails, visibleCount: likeWrap ? clipCountValue(likeWrap.querySelector("[data-clip-action-count]")) : 0 });
              const wasLiked = likeState.active;
              let likeCount = likeState.count;
              let nextLikedBy = likeState.likedBy;
              if (likeWrap && wasLiked) {
                const nextLike = commitClipLikeCrowd(slide, likeState, false);
                likeCount = nextLike.count;
                nextLikedBy = nextLike.patch.likedBy;
                likeWrap.classList.remove("is-active");
                setClipCount(likeWrap, likeCount);
                const likeButton = likeWrap.querySelector("[data-clip-action]");
                if (likeButton) likeButton.setAttribute("aria-pressed", "false");
              }
              const active = !wrap.classList.contains("is-active");
              wrap.classList.toggle("is-active", active);
              button.setAttribute("aria-pressed", active ? "true" : "false");
              saveClipStateForSlide(slide, { liked: false, disliked: active, baseLikeCount: likeState.baseLikeCount, countedLikeCount: likeCount, likeCount, likedBy: nextLikedBy });
              syncClipSourceLike(slide, false, likeCount, { baseLikeCount: likeState.baseLikeCount, likedBy: nextLikedBy });
              if (sourceCard && sourceDetails && wasLiked) detailRecordOwnerEngagementAction("like", false, true, { card: sourceCard, details: sourceDetails, beforeCounts });
              setClipFeedback(slide, active ? "Feedback saved." : "Feedback removed.");
              refreshClipActionStates(slide);
              return;
            }
            if (action === "comment") {
              const panel = slide.querySelector("[data-clip-comments-panel]");
              if (!panel) return;
              panel.hidden = false;
              setClipFeedback(slide, "Comments opened.");
              const input = panel.querySelector("input");
              if (input) window.setTimeout(() => input.focus(), 80);
              return;
            }
            if (action === "chat") {
              const sourceCard = activeClipCards[Number(slide.dataset.clipSlide) || 0];
              if (sourceCard) openSharedBusinessChat(sourceCard);
              return;
            }
            if (action === "repost") {
              const sourceCard = activeClipCards[Number(slide.dataset.clipSlide) || 0];
              const sourceDetails = sourceCard ? detailsFromCard(sourceCard) : null;
              if (sourceCard && sourceDetails) {
                if (toggleDetailRepost(sourceCard, sourceDetails, () => {
                  refreshClipActionStates(clipTrack || document);
                  setClipFeedback(slide, "Repost removed.");
                })) return;
                openDetailRepostDialog(sourceCard, sourceDetails, () => {
                  refreshClipActionStates(clipTrack || document);
                  setClipFeedback(slide, "Clip reposted.");
                });
              }
              return;
            }
            if (action === "share") {
              const sourceCard = activeClipCards[Number(slide.dataset.clipSlide) || 0];
              const sourceDetails = sourceCard ? detailsFromCard(sourceCard) : null;
              const beforeCounts = sourceCard && sourceDetails ? detailCountsFromCard(sourceCard, sourceDetails) : null;
              const recordShare = () => {
                if (sourceCard && sourceDetails) detailRecordOwnerEngagementAction("share", true, false, { card: sourceCard, details: sourceDetails, beforeCounts });
                else notifyClipOwner(slide, "share", currentUserDisplayName() + " shared your clip.");
              };
              const shareTitle = cleanText((slide.querySelector(".clip-viewer-info h3") || slide.querySelector(".clip-viewer-caption h3")) && (slide.querySelector(".clip-viewer-info h3") || slide.querySelector(".clip-viewer-caption h3")).textContent) || document.title;
              const shareUrl = (() => {
                const next = new URL(window.location.href);
                next.searchParams.set("clip", slide.dataset.clipKey || "clip");
                return next.href;
              })();
              if (navigator.share) {
                navigator.share({ title: shareTitle, url: shareUrl }).then(() => { recordShare(); setClipFeedback(slide, "Share sheet opened."); }).catch(() => {});
                return;
              }
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(shareUrl).then(() => { recordShare(); setClipFeedback(slide, "Clip link copied."); });
                return;
              }
              recordShare();
              setClipFeedback(slide, "Share from this clip page.");
              return;
            }
            if (action === "saved") {
              const wasActive = wrap.classList.contains("is-active");
              const active = !wasActive;
              wrap.classList.toggle("is-active", active);
              button.setAttribute("aria-pressed", active ? "true" : "false");
              button.setAttribute("aria-label", active ? "Saved clip" : "Save clip");
              saveClipStateForSlide(slide, { saved: active });
              syncClipSourceSaved(slide, active);
              refreshClipActionStates(slide);
              setClipFeedback(slide, active ? "Clip saved." : "Removed from saved.");
              return;
            }
          }
          function setClipViewerOpen(open) {
            if (!clipModal) return;
            if (!open) hardStopClipViewerMedia("clip-viewer-close");
            clipModal.classList.toggle("is-open", open);
            clipModal.setAttribute("aria-hidden", open ? "false" : "true");
            document.body.classList.toggle("item-detail-locked", open || modal.classList.contains("is-open"));
            if (open) clipViewerSessionId += 1;
            if (open && window.emyPauseMediaOutside) window.emyPauseMediaOutside(clipModal);
            if (!open) {
              activeClipSlideKey = "";
              clipViewQualificationToken = "";
              if (clipViewQualificationTimer) {
                window.clearTimeout(clipViewQualificationTimer);
                clipViewQualificationTimer = 0;
              }
              if (clipAutoplayTimer) {
                window.clearTimeout(clipAutoplayTimer);
                clipAutoplayTimer = 0;
              }
              if (window.emyPauseMediaInside) window.emyPauseMediaInside(clipModal);
              else if (clipTrack) pauseInactiveClipVideos(null);
              if (window.emyPauseMediaInside) window.emyPauseMediaInside(document);
              hardStopClipViewerMedia("clip-viewer-closed");
              if (clipTrack) clipTrack.innerHTML = "";
              if (clipTrack) delete clipTrack.dataset.clipViewerMode;
              clipModal.classList.remove("is-ask-emy-single");
              activeClipCards = [];
            }
          }
          function refreshClipCustomerButtons(root) {
            (root || document).querySelectorAll("[data-clip-customer]").forEach((button) => {
              const slide = button.closest("[data-clip-slide]");
              const key = slide && slide.dataset.clipBusinessKey;
              if (!key) return;
              const active = isCustomerBusinessKey(key, slide && slide.dataset.clipBusinessName);
              const blockedForBusinessAccount = !detailCanBecomeCustomer();
              button.hidden = blockedForBusinessAccount;
              button.disabled = blockedForBusinessAccount;
              button.classList.toggle("is-customer", active);
              button.setAttribute("aria-pressed", active ? "true" : "false");
              button.textContent = active ? "View My Businesses" : "Add to My Businesses";
              button.setAttribute("aria-label", active ? "Open My Businesses" : "Add " + (slide && slide.dataset.clipBusinessName || "this business") + " to My Businesses");
            });
          }
          function openClipViewer(card) {
            if (!clipModal || !clipTrack) {
              return;
            }
            try {
              window.dispatchEvent(new Event("emy-ask-close-result-overlays"));
            } catch (error) {}
            if (modal && modal.classList && modal.classList.contains("is-open")) {
              setModalOpen(false);
            }
            const askSingleClip = isAskEmySingleClipSource(card);
            activeClipCards = askSingleClip ? [card] : visibleClipCards(card);
            if (!activeClipCards.includes(card)) activeClipCards.unshift(card);
            const startIndex = Math.max(0, activeClipCards.indexOf(card));
            clipModal.classList.toggle("is-ask-emy-single", askSingleClip);
            if (askSingleClip) clipTrack.dataset.clipViewerMode = "single";
            else delete clipTrack.dataset.clipViewerMode;
            if (clipViewerVolume <= 0) setClipViewerVolumePreference(1, true);
            setClipViewerSoundPreference(true, true);
            clipTrack.innerHTML = activeClipCards.map(clipSlideMarkup).join("");
            refreshClipCustomerButtons(clipTrack);
            refreshClipActionStates(clipTrack);
            setupVideoDurationBadges(clipTrack);
            setupClipVideoControls(clipTrack);
            setClipViewerOpen(true);
            const startSlide = clipTrack.querySelector('[data-clip-slide="' + startIndex + '"]');
            if (startSlide) {
              clipTrack.scrollTop = startSlide.offsetTop;
              activeClipSlideKey = "";
              activateClipViewerSlide(startSlide, true);
            }
            requestAnimationFrame(() => {
              const slide = clipTrack.querySelector('[data-clip-slide="' + startIndex + '"]');
              if (slide) {
                clipTrack.scrollTop = slide.offsetTop;
                activateClipViewerSlide(slide, true);
              }
              setupClipVideoControls(clipTrack);
              scheduleActiveClipPlayback(true);
              window.setTimeout(() => scheduleActiveClipPlayback(true), 180);
            });
          }
          function clearJobCoverMedia() {
            if (!jobCoverHead) return;
            jobCoverHead.classList.remove("has-cover");
            jobCoverHead.querySelectorAll("[data-item-job-cover-media]").forEach((node) => node.remove());
            ["--media-fit", "--media-zoom", "--media-x", "--media-y"].forEach((name) => jobCoverHead.style.removeProperty(name));
          }
          function applyJobCoverSourceStyle(card) {
            if (!jobCoverHead || !card || !card.querySelector) return;
            const source = card.querySelector(".feed-job-hero, .feed-job-cover-editor");
            if (!source) return;
            const style = getComputedStyle(source);
            ["--media-fit", "--media-zoom", "--media-x", "--media-y"].forEach((name) => {
              const value = style.getPropertyValue(name);
              if (value) jobCoverHead.style.setProperty(name, value.trim());
            });
          }
          function setJobCoverMedia(card, details, imageSrc, videoSrc, mediaRef, mediaType, posterSrc, posterRef) {
            clearJobCoverMedia();
            if (!jobCoverHead) return false;
            const isVideo = mediaType === "video" || !!videoSrc;
            const hasCover = !!(imageSrc || videoSrc || mediaRef);
            jobCoverHead.classList.toggle("has-cover", hasCover);
            if (!hasCover) return false;
            applyJobCoverSourceStyle(card);
            if (isVideo) {
              const videoAttrs = (videoSrc ? ' src="' + escapeDetail(videoSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + escapeDetail(mediaRef) + '"' : '') + (posterSrc ? ' poster="' + escapeDetail(posterSrc) + '"' : '') + (posterRef ? ' data-emy-poster-ref="' + escapeDetail(posterRef) + '"' : '');
              jobCoverHead.insertAdjacentHTML("afterbegin", '<video class="item-job-cover-media" data-item-job-cover-media' + videoAttrs + ' muted playsinline preload="metadata" aria-label="' + escapeDetail((details && details.title) || "Job video") + '"></video>');
            } else {
              const imageAttrs = (imageSrc ? ' src="' + escapeDetail(imageSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + escapeDetail(mediaRef) + '"' : '');
              jobCoverHead.insertAdjacentHTML("afterbegin", '<img class="item-job-cover-media" data-item-job-cover-media' + imageAttrs + ' alt="" />');
            }
            if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(jobCoverHead);
            return true;
          }
          function detailKindIsPost(details) {
            const raw = cleanText(details && details.kind).toLowerCase();
            if (raw.includes("post") || raw.includes("update")) return true;
            return raw === "photo" || raw === "image" || raw === "video" || raw === "question" || raw === "carousel";
          }
          function detailCardIsBusinessProfileRepost(card) {
            return !!(card && card.classList && card.classList.contains("is-repost") && card.querySelector && card.querySelector(".social-feed-quote[data-business-profile-card]"));
          }
          function clearDetailRepostAttachment() {
            if (!repostAttachment) return;
            repostAttachment.innerHTML = "";
            repostAttachment.hidden = true;
          }
          function renderDetailRepostAttachment(card) {
            clearDetailRepostAttachment();
            if (!repostAttachment || !detailCardIsBusinessProfileRepost(card)) return;
            const source = card.querySelector(".social-feed-quote[data-business-profile-card]");
            if (!source) return;
            const clone = source.cloneNode(true);
            clone.classList.add("is-detail-repost-quote");
            clone.setAttribute("role", "link");
            clone.setAttribute("tabindex", "0");
            repostAttachment.appendChild(clone);
            repostAttachment.hidden = false;
            if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(repostAttachment);
          }
          function detailHasModalMedia(card, details) {
            if (detailCardIsBusinessProfileRepost(card)) return false;
            const mediaNode = findMediaNode(card);
            const hasCardMedia = !!(mediaNode && mediaNode.querySelector("img, video"));
            const mediaItems = Array.isArray(details && details.mediaItems) ? details.mediaItems : [];
            return hasCardMedia || mediaItems.length > 0 || !!cleanText(details && (details.mediaSrc || details.mediaRef));
          }
          function setMedia(card, details) {
            if (detailCardIsBusinessProfileRepost(card)) {
              media.className = "item-detail-art";
              media.innerHTML = "";
              media.hidden = true;
              modal.classList.add("is-text-post");
              modal.classList.remove("is-media-post");
              return;
            }
            const mediaNode = findMediaNode(card);
            const image = mediaNode && mediaNode.querySelector("img");
            const video = mediaNode && mediaNode.querySelector("video");
            const detailMediaSrc = cleanText(details && details.mediaSrc);
            const detailMediaType = cleanText(details && details.mediaType).toLowerCase();
            const detailMediaRef = cleanText(details && details.mediaRef);
            const detailMediaItems = Array.isArray(details && details.mediaItems) ? details.mediaItems : [];
            const imageSrc = cleanText(image && (image.currentSrc || image.src || image.getAttribute("src")));
            const videoSrc = cleanText(video && (video.currentSrc || video.src || video.getAttribute("src")));
            const cardMediaRef = cleanText(video && video.dataset && video.dataset.emyMediaRef) || cleanText(image && image.dataset && image.dataset.emyMediaRef);
            const cardHasVisibleMediaSrc = !!(imageSrc || videoSrc);
            const resolvedMediaRef = cardHasVisibleMediaSrc ? "" : (cardMediaRef || detailMediaRef);
            const resolvedMediaType = videoSrc || (resolvedMediaRef && video) ? "video" : imageSrc || (resolvedMediaRef && image) ? "image" : detailMediaType;
            const posterSrc = cleanText(details && details.posterSrc) || cleanText(video && (video.getAttribute("poster") || video.poster));
            const posterRef = cleanText(details && details.posterRef) || cleanText(video && video.dataset && video.dataset.emyPosterRef);
            const detailMediaLooksVideo = detailMediaType === "video" || /^data:video/i.test(detailMediaSrc);
            const detailMediaLooksImage = detailMediaType === "image" || (!!detailMediaSrc && !detailMediaLooksVideo);
            const resolvedVideoSrc = videoSrc || (resolvedMediaRef ? "" : (detailMediaLooksVideo ? detailMediaSrc : ""));
            const resolvedImageSrc = imageSrc || (resolvedMediaRef ? "" : (detailMediaLooksImage ? detailMediaSrc : ""));
            media.hidden = false;
            modal.classList.remove("is-text-post");
            if (cleanText(details.kind).toLowerCase().includes("product")) {
              renderProductGallery(card, Object.assign({}, details, {
                mediaSrc: resolvedVideoSrc || resolvedImageSrc || detailMediaSrc,
                mediaRef: resolvedMediaRef,
                mediaType: resolvedMediaType
              }), image, video);
              return;
            }
            if (cleanText(details.kind).toLowerCase().includes("job") || cleanText(details.kind).toLowerCase().includes("hiring")) {
              setJobCoverMedia(card, details, resolvedImageSrc, resolvedVideoSrc, resolvedMediaRef, resolvedMediaType, posterSrc, posterRef);
              media.className = "item-detail-art";
              media.innerHTML = "";
              media.hidden = true;
              return;
            }
            if (cleanText(details.kind).toLowerCase().includes("event")) {
              media.className = "item-detail-art";
              media.innerHTML = "";
              media.hidden = true;
              return;
            }
            if (cleanText(details.kind).toLowerCase().includes("article")) {
              modal.classList.remove("is-text-post");
              modal.classList.remove("is-media-post");
              media.className = "item-detail-art" + (details.mediaClass ? " " + details.mediaClass : "");
              if (!resolvedVideoSrc && !resolvedImageSrc && !resolvedMediaRef) {
                media.innerHTML = "";
                media.hidden = true;
                return;
              }
              media.hidden = false;
              if (resolvedVideoSrc || (resolvedMediaRef && resolvedMediaType === "video")) {
                media.innerHTML = emyVideoPlayerMarkup(resolvedVideoSrc, details.title || "Article video", resolvedMediaRef, posterSrc, posterRef);
                if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(media);
                setupEmyVideoPlayers(media);
                return;
              }
              media.innerHTML = '<img' + (resolvedImageSrc ? ' src="' + escapeDetail(resolvedImageSrc) + '"' : '') + (resolvedMediaRef ? ' data-emy-media-ref="' + escapeDetail(resolvedMediaRef) + '"' : '') + ' alt="" />';
              if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(media);
              return;
            }
            const isPost = detailKindIsPost(details);
            const isTextPost = isPost && !detailMediaItems.length && (card.classList.contains("is-text-only") || (!resolvedImageSrc && !resolvedVideoSrc));
            modal.classList.toggle("is-text-post", isTextPost);
            modal.classList.toggle("is-media-post", isPost && !isTextPost);
            if (isTextPost) {
              media.className = "item-detail-art";
              media.innerHTML = "";
              media.hidden = true;
              return;
            }
            media.className = "item-detail-art" + (details.mediaClass ? " " + details.mediaClass : "");
            if (detailMediaItems.length > 1 && window.emyFeedMediaCarouselMarkup) {
              media.innerHTML = window.emyFeedMediaCarouselMarkup(detailMediaItems, { label:details.title || "Post media" });
              if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(media);
              setupEmyVideoPlayers(media);
              if (window.emySetupFeedMediaCarousels) window.emySetupFeedMediaCarousels(media);
              return;
            }
            if (resolvedVideoSrc || (resolvedMediaRef && resolvedMediaType === "video")) {
              media.innerHTML = emyVideoPlayerMarkup(resolvedVideoSrc, details.title || "Video post", resolvedMediaRef, posterSrc, posterRef);
              if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(media);
              setupEmyVideoPlayers(media);
              return;
            }
            media.innerHTML = (resolvedImageSrc || (resolvedMediaRef && resolvedMediaType === "image")) ? '<img' + (resolvedImageSrc ? ' src="' + escapeDetail(resolvedImageSrc) + '"' : '') + (resolvedMediaRef ? ' data-emy-media-ref="' + escapeDetail(resolvedMediaRef) + '"' : '') + ' alt="" />' : "";
            if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(media);
          }
          function closeDetailOptionsMenu() {
            if (detailOptionsMenu) detailOptionsMenu.hidden = true;
            if (detailOptionsButton) detailOptionsButton.setAttribute("aria-expanded", "false");
          }
          function positionDetailOptionsMenu() {
            if (!detailOptionsButton || !detailOptionsMenu) return;
            const rect = detailOptionsButton.getBoundingClientRect();
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
            const menuWidth = Math.min(260, Math.max(210, viewportWidth - 24));
            const maxHeight = Math.max(160, viewportHeight - 24);
            detailOptionsMenu.style.width = menuWidth + "px";
            detailOptionsMenu.style.maxHeight = maxHeight + "px";
            const measuredHeight = Math.min(detailOptionsMenu.scrollHeight || 320, maxHeight);
            const left = Math.max(12, Math.min(viewportWidth - menuWidth - 12, rect.right - menuWidth));
            const belowTop = rect.bottom + 8;
            const aboveTop = rect.top - measuredHeight - 8;
            const top = belowTop + measuredHeight + 12 <= viewportHeight || aboveTop < 12
              ? Math.max(12, Math.min(viewportHeight - measuredHeight - 12, belowTop))
              : aboveTop;
            detailOptionsMenu.style.left = left + "px";
            detailOptionsMenu.style.top = top + "px";
          }
          function sourceDetailMenu(card) {
            if (!card) return null;
            const direct = card.querySelector("[data-feed-options-menu]");
            if (direct) return direct;
            const feedId = card.dataset && card.dataset.feedId;
            if (!feedId) return null;
            return Array.from(document.querySelectorAll("[data-feed-options-menu][data-feed-options-card-id]")).find((menu) => menu.dataset.feedOptionsCardId === feedId) || null;
          }
          function sourceDetailOption(card, action) {
            const menu = sourceDetailMenu(card);
            if (!menu || !action) return null;
            return Array.from(menu.querySelectorAll("[data-feed-option]")).find((button) => button.dataset.feedOption === action) || null;
          }
          function detailKindLabel(card, details) {
            const raw = cleanText((details && details.kind) || (card && card.dataset && card.dataset.detailKind) || "post").toLowerCase();
            if (raw.includes("job") || raw.includes("hiring")) return "job post";
            if (raw.includes("event")) return "event";
            if (raw.includes("article")) return "article";
            if (raw.includes("clip")) return "clip";
            if (raw.includes("product")) return "product";
            if (raw.includes("business")) return "business";
            if (raw.includes("repost")) return "repost";
            return "post";
          }
          function detailDeleteCopy(card, details) {
            const label = detailKindLabel(card, details);
            return { title: "Delete " + label, message: "Delete this " + label + " permanently?" };
          }
          function detailOptionLabel(action, sourceText) {
            const text = cleanText(sourceText);
            if (text) return text;
            if (action === "edit") return "Edit";
            if (action === "delete") return "Delete";
            if (action === "report") return "Report";
            if (action === "hide") return "Not interested";
            if (action === "open") return "Open";
            if (action === "copy") return "Copy link";
            return action ? action.charAt(0).toUpperCase() + action.slice(1) : "Option";
          }
          function detailOpenOptionLabel(card, details) {
            const kind = detailKindLabel(card, details);
            if (kind === "article") return "Go to article";
            if (kind === "event") return "Go to event";
            if (kind === "job post") return "Go to job";
            if (kind === "clip") return "Go to clip";
            if (kind === "product") return "Go to product";
            if (kind === "business") return "Go to business";
            if (kind === "repost") return "Go to repost";
            return "Go to post";
          }
          function detailMenuItems(card, details) {
            const sourceMenu = sourceDetailMenu(card);
            const seen = new Set();
            const items = [];
            function add(action, label, danger) {
              action = cleanText(action);
              if (!action || seen.has(action)) return;
              seen.add(action);
              items.push({ action, label: detailOptionLabel(action, label), danger: !!danger || action === "delete" || action === "report" });
            }
            const isOwner = card && detailViewerCanUseOwnerActions(card, details);
            if (sourceMenu) {
              let ownerInserted = false;
              Array.from(sourceMenu.querySelectorAll("[data-feed-option]")).forEach((button) => {
                const action = button.dataset.feedOption;
                if ((action === "edit" || action === "delete") && !isOwner) return;
                add(action, button.textContent, button.classList.contains("is-danger"));
                if (action === "open" && isOwner) {
                  add("edit", "Edit", false);
                  add("delete", "Delete", true);
                  ownerInserted = true;
                }
              });
              if (isOwner && !ownerInserted) {
                add("edit", "Edit", false);
                add("delete", "Delete", true);
              }
              return items;
            }
            if (!seen.has("report")) add("report", "Report", true);
            if (!seen.has("hide")) add("hide", "Not interested", false);
            if (!seen.has("open")) add("open", detailOpenOptionLabel(card, details), false);
            if (isOwner) {
              if (!seen.has("edit")) add("edit", "Edit", false);
              if (!seen.has("delete")) add("delete", "Delete", true);
            }
            if (!seen.has("copy")) add("copy", "Copy link", false);
            return items;
          }
          function renderDetailOptions(card, details) {
            if (!detailOptionsButton || !detailOptionsMenu) return;
            const items = detailMenuItems(card, details);
            detailOptionsButton.hidden = !items.length;
            if (!items.length) {
              detailOptionsMenu.innerHTML = "";
              closeDetailOptionsMenu();
              return;
            }
            detailOptionsMenu.innerHTML = items.map((item) => '<button type="button" data-item-detail-option="' + escapeDetail(item.action) + '"' + (item.danger ? ' class="is-danger"' : '') + '>' + escapeDetail(item.label) + '</button>').join("");
            closeDetailOptionsMenu();
          }
          function fallbackDetailOption(action) {
            if ((action === "edit" || action === "delete") && !detailViewerCanUseOwnerActions(activeDetailCard, activeDetailDetails)) {
              setProductFeedback("Only the owner can " + action + " this item.");
              return true;
            }
            if (action === "edit" && activeDetailCard) {
              const kind = detailKindLabel(activeDetailCard, activeDetailDetails);
              const isRepost = activeDetailCard.classList && activeDetailCard.classList.contains("is-repost") || String(activeDetailCard.dataset && activeDetailCard.dataset.detailKind || "").toLowerCase() === "repost";
              setModalOpen(false);
              if (kind === "product" && detailBusinessOwnsItem(activeDetailCard, activeDetailDetails) && typeof window.emyOpenBusinessProductEditor === "function") {
                if (window.emyOpenBusinessProductEditor(activeDetailCard, activeDetailDetails) !== false) return true;
              }
              if (isRepost && window.emyEditRepostThought) return window.emyEditRepostThought(activeDetailCard, { showToast: setProductFeedback });
              if (window.emyOpenOriginalFeedEdit && window.emyOpenOriginalFeedEdit(activeDetailCard, { kind, showToast: setProductFeedback })) return true;
              if (window.emyOpenFeedEditSheet) {
                window.emyOpenFeedEditSheet({ card: activeDetailCard, kind, showToast: setProductFeedback });
                return true;
              }
              return false;
            }
            if (action === "share" && productShare) {
              productShare.click();
              return true;
            }
            if (action === "repost" && (productRepost || businessRepost)) {
              (productRepost || businessRepost).click();
              return true;
            }
            if (action === "copy") {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(window.location.href).then(() => setProductFeedback("Link copied."));
              } else {
                setProductFeedback("Copy this page link from the browser.");
              }
              return true;
            }
            if (action === "report") {
              setProductFeedback("Report sent.");
              return true;
            }
            if (action === "hide") {
              setModalOpen(false);
              if (activeDetailCard) activeDetailCard.hidden = true;
              return true;
            }
            if (action === "open") {
              setModalOpen(false);
              return true;
            }
            return false;
          }
          function triggerDetailOption(action) {
            action = cleanText(action);
            if (!action) return;
            closeDetailOptionsMenu();
            if ((action === "edit" || action === "delete") && !detailViewerCanUseOwnerActions(activeDetailCard, activeDetailDetails)) {
              setProductFeedback("Only the owner can " + action + " this item.");
              return;
            }
            const sourceButton = sourceDetailOption(activeDetailCard, action);
            if (sourceButton && action === "delete") {
              const copy = detailDeleteCopy(activeDetailCard, activeDetailDetails);
              const finishDelete = () => {
                setModalOpen(false);
                const runDelete = () => {
                  sourceButton.dataset.emyDeleteConfirmedOnce = "true";
                  window.__emyDeleteConfirmBypass = true;
                  try {
                    sourceButton.click();
                  } finally {
                    window.setTimeout(() => {
                      delete sourceButton.dataset.emyDeleteConfirmedOnce;
                      window.__emyDeleteConfirmBypass = false;
                    }, 0);
                  }
                };
                if (window.emyRunAfterNextPaint) window.emyRunAfterNextPaint(runDelete);
                else window.setTimeout(runDelete, 16);
              };
              if (window.emyConfirmDelete) {
                window.emyConfirmDelete(copy).then((confirmed) => {
                  if (confirmed) finishDelete();
                });
              } else {
                finishDelete();
              }
              return;
            }
            if (sourceButton) {
              if (action === "edit" || action === "open") {
                setModalOpen(false);
                const clickSource = () => sourceButton.click();
                if (window.emyRunAfterNextPaint) window.emyRunAfterNextPaint(clickSource);
                else window.setTimeout(clickSource, 16);
                return;
              }
              sourceButton.click();
              return;
            }
            if (action === "delete") {
              const copy = detailDeleteCopy(activeDetailCard, activeDetailDetails);
              const finishDelete = () => {
                if (activeDetailCard) activeDetailCard.hidden = true;
                setModalOpen(false);
              };
              if (window.emyConfirmDelete) window.emyConfirmDelete(copy).then((confirmed) => { if (confirmed) finishDelete(); });
              else finishDelete();
              return;
            }
            fallbackDetailOption(action);
          }
          function setModalOpen(open) {
            modal.classList.toggle("is-open", open);
            modal.setAttribute("aria-hidden", open ? "false" : "true");
            document.body.classList.toggle("item-detail-locked", open);
            if (open && window.emyPauseMediaOutside) window.emyPauseMediaOutside(modal);
            if (!open && window.emyPauseMediaInside) window.emyPauseMediaInside(modal);
            if (!open && window.emyPauseMediaInside) window.emyPauseMediaInside(document);
            if (!open && save) {
              setProductSavedState(false);
            }
            if (!open) {
              delete modal.dataset.realRailOpenToken;
              if (activeDetailCard && productCommentList) detailCommitModalComments("");
              closeDetailOptionsMenu();
              modal.classList.remove("is-product");
              modal.classList.remove("is-business");
              modal.classList.remove("is-post");
              modal.classList.remove("is-job");
              modal.classList.remove("is-event");
              modal.classList.remove("is-article");
              modal.classList.remove("is-text-post");
              modal.classList.remove("is-media-post");
              modal.classList.remove("is-owned-post");
              modal.classList.remove("is-owned-product");
              if (business) {
                business.classList.remove("has-avatar");
                business.classList.remove("has-initial");
                business.removeAttribute("data-avatar-initial");
                business.style.removeProperty("--item-detail-avatar");
              }
              media.hidden = false;
              activeJobDetailCard = null;
              if (jobPanel) jobPanel.hidden = true;
              if (eventPanel) eventPanel.hidden = true;
              if (businessPanel) businessPanel.hidden = true;
              if (productPanel) productPanel.hidden = true;
              if (productOwnerPanel) productOwnerPanel.hidden = true;
              clearDetailRepostAttachment();
              if (productCommentInput) productCommentInput.value = "";
              if (productChatInput) productChatInput.value = "";
              setProductFeedback("");
            }
          }
          function isOwnedPostDetail(card, details) {
            if (!card) return false;
            return detailViewerCanUseOwnerActions(card, details);
          }
          function normalisePostDetailMeta(items, owned) {
            const values = [];
            (Array.isArray(items) ? items : []).forEach((item) => {
              let value = cleanText(item);
              if (!value || /^view post$/i.test(value)) return;
              if (/my businesses/i.test(value)) value = owned ? "Posted by you" : "From My Businesses";
              if (/nearby/i.test(value) && owned) value = "Posted by you";
              if (!values.some((current) => current.toLowerCase() === value.toLowerCase())) values.push(value);
            });
            if (owned && !values.some((current) => /posted by you/i.test(current))) values.push("Posted by you");
            return values.slice(0, 4);
          }
          function articleInlineMetaMarkup(items) {
            const values = (Array.isArray(items) ? items : []).map(cleanText).filter(Boolean);
            if (!values.length) return "";
            return '<span class="item-detail-inline-meta" data-item-detail-inline-meta>' + values.map((item) => '<span>' + escapeDetail(item) + '</span>').join("") + '</span>';
          }
          function openDetails(card) {
            const details = detailsFromCard(card);
            if (isClipCard(card, details)) {
              openClipViewer(card);
              return;
            }
            activeDetailCard = card;
            activeDetailDetails = details;
            renderDetailOptions(card, details);
            const isPost = detailKindIsPost(details);
            const isEvent = cleanText(details.kind).toLowerCase().includes("event");
            const isArticle = cleanText(details.kind).toLowerCase().includes("article");
            modal.classList.toggle("is-post", isPost);
            modal.classList.toggle("is-article", isArticle);
            const isTextPost = isPost && (card.classList.contains("is-text-only") || !detailHasModalMedia(card, details));
            modal.classList.toggle("is-text-post", isTextPost);
            modal.classList.toggle("is-media-post", isPost && !isTextPost);
            media.className = "item-detail-art";
            media.innerHTML = "";
            media.hidden = true;
            const ownedPost = isPost && isOwnedPostDetail(card, details);
            modal.classList.toggle("is-owned-post", ownedPost);
            const visibleMeta = isPost ? normalisePostDetailMeta(details.meta, ownedPost) : details.meta.filter((item) => !/^view post$/i.test(cleanText(item)));
            const postBody = cleanText(details.description) || cleanText(details.title);
            kind.textContent = isTextPost && ownedPost ? "Your post" : details.kind;
            title.textContent = isTextPost ? postBody : details.title;
            const businessText = isTextPost && ownedPost ? detailOwnedPostDisplayName(card, details) : details.business;
            business.textContent = businessText;
            business.hidden = !businessText;
            setDetailBusinessAvatar(card);
            if (isArticle) description.innerHTML = escapeDetail(details.description) + articleInlineMetaMarkup(visibleMeta);
            else description.textContent = details.description;
            description.hidden = isTextPost || (isPost && (!cleanText(details.description) || cleanText(details.description).toLowerCase() === cleanText(details.title).toLowerCase()));
            price.textContent = details.price;
            price.hidden = !details.price;
            meta.hidden = isArticle || visibleMeta.length === 0;
            meta.innerHTML = isArticle ? "" : visibleMeta.map((item) => '<span>' + escapeDetail(item) + '</span>').join("");
            renderDetailRepostAttachment(card);
            setModalOpen(true);
            renderJobPanel(card, details);
            renderEventPanel(card, details);
            renderProductPanel(card, details);
            renderBusinessPanel(card, details);
            window.setTimeout(() => {
              if (activeDetailCard !== card || !modal.classList.contains("is-open")) return;
              setMedia(card, details);
            }, 0);
            const recordOpenView = () => {
              if (activeDetailCard !== card || !modal.classList.contains("is-open")) return;
              if (window.emyEngagement && typeof window.emyEngagement.scheduleView === "function") window.emyEngagement.scheduleView(card);
              detailRecordProductView(card, details);
            };
            if (window.requestIdleCallback) window.requestIdleCallback(recordOpenView, { timeout: 1200 });
            else window.setTimeout(recordOpenView, 120);
            window.setTimeout(() => {
              if (activeDetailCard !== card || !modal.classList.contains("is-open")) return;
              syncDetailModalFromSource(card, details);
            }, window.emyHomeInteractionActive && window.emyHomeInteractionActive() ? 1300 : 80);
          }
          window.emyOpenClipViewer = function openClipViewerFromCard(card) {
            const target = candidateCard(card);
            if (!target || !isClipCard(target, detailsFromCard(target))) return false;
            openClipViewer(target);
            return true;
          };
          window.emyOpenItemDetail = function openItemDetailFromCard(card) {
            const target = candidateCard(card);
            if (!target) return false;
            openDetails(target);
            return true;
          };
          let askEmyProfileTargetOpened = false;
          let askEmyProfileTargetAttempts = 0;
          function expandAskEmyProfileTargetTab(targetTab, profile) {
            try {
              if (targetTab === "reels" && typeof publicBusinessClipItems === "function" && typeof publicBusinessClipVisibleCount !== "undefined") {
                const clips = publicBusinessClipItems(profile);
                const initialCount = typeof publicBusinessClipsInitialCount !== "undefined" ? publicBusinessClipsInitialCount : 0;
                publicBusinessClipVisibleCount = Math.max(publicBusinessClipVisibleCount || 0, Array.isArray(clips) ? clips.length : 0, initialCount);
              } else if (targetTab === "products" && typeof publicBusinessStoredProducts === "function" && typeof publicBusinessProductVisibleCount !== "undefined") {
                const products = publicBusinessStoredProducts(profile);
                const initialCount = typeof publicBusinessProductsInitialCount !== "undefined" ? publicBusinessProductsInitialCount : 0;
                publicBusinessProductVisibleCount = Math.max(publicBusinessProductVisibleCount || 0, Array.isArray(products) ? products.length : 0, initialCount);
              } else if (targetTab === "posts" && typeof publicBusinessStoredPosts === "function" && typeof publicBusinessPostVisibleCount !== "undefined") {
                const posts = publicBusinessStoredPosts(profile);
                const initialCount = typeof publicBusinessPostsInitialCount !== "undefined" ? publicBusinessPostsInitialCount : 0;
                publicBusinessPostVisibleCount = Math.max(publicBusinessPostVisibleCount || 0, Array.isArray(posts) ? posts.length : 0, initialCount);
              }
            } catch (error) {}
          }
          function openAskEmyProfileTargetFromQuery() {
            if (askEmyProfileTargetOpened) return;
            let query = null;
            try { query = new URLSearchParams(window.location.search || ""); } catch (error) { return; }
            const targetType = cleanText(query.get("open") || query.get("detail") || query.get("type")).toLowerCase();
            const supportedTypes = ["product", "job", "event", "clip", "reel", "post", "article"];
            if (!supportedTypes.includes(targetType)) return;
            const wantedId = detailSlug(query.get("item") || query.get(targetType) || query.get("job") || query.get("product") || query.get("clip") || query.get("event") || query.get("post") || query.get("article") || query.get("id"));
            const wantedTitle = detailSlug(query.get("title") || query.get("q"));
            const wantedBusiness = detailSlug(query.get("business"));
            const targetTab = targetType === "product" ? "products" : (targetType === "clip" || targetType === "reel") ? "reels" : "posts";
            const profile = typeof currentPublicBusinessForNav === "function" ? currentPublicBusinessForNav() : null;
            try {
              if (typeof renderPublicTab === "function") renderPublicTab(targetTab, profile);
            } catch (error) {}
            expandAskEmyProfileTargetTab(targetTab, profile);
            try {
              if (typeof renderPublicTab === "function") renderPublicTab(targetTab, profile);
            } catch (error) {}
            const kindMatches = (kind) => {
              const cleanKind = cleanText(kind).toLowerCase();
              if (targetType === "clip" || targetType === "reel") return cleanKind.includes("clip") || cleanKind.includes("reel");
              if (targetType === "post") return cleanKind.includes("post") && !cleanKind.includes("job") && !cleanKind.includes("event") && !cleanKind.includes("article");
              return cleanKind.includes(targetType);
            };
            const findCard = () => {
              const scope = publicContent || document;
              const cards = Array.from(scope.querySelectorAll("[data-feed-id], [data-detail-kind], [data-business-product-id]"));
              const prepared = cards.map((card) => {
                const data = card.dataset || {};
                const kind = cleanText(data.detailKind).toLowerCase();
                const heading = card.querySelector("h3, strong");
                const businessNode = card.querySelector(".feed-job-business, .social-feed-name strong");
                const idValues = [data.feedId, data.itemId, data.jobId, data.productId, data.businessProductId, data.clipId, data.reelId, data.eventId, data.postId, data.articleId, data.originalFeedId, data.repostOriginalId, data.detailMediaRef, data.detailPosterRef, card.getAttribute("id")].map(detailSlug).filter(Boolean);
                const cardTitle = detailSlug(data.detailTitle || data.title || (heading && heading.textContent));
                const cardBusiness = detailSlug(data.businessKey || data.detailBusiness || data.businessName || (businessNode && businessNode.textContent));
                return { card, kind, idValues, cardTitle, cardBusiness };
              }).filter((entry) => kindMatches(entry.kind));
              const idMatches = (entry) => wantedId && entry.idValues.some((id) => id === wantedId || id.endsWith("-" + wantedId) || wantedId.endsWith("-" + id));
              const titleMatches = (entry) => wantedTitle && entry.cardTitle && (entry.cardTitle === wantedTitle || entry.cardTitle.includes(wantedTitle) || wantedTitle.includes(entry.cardTitle));
              const businessMatches = (entry) => wantedBusiness && entry.cardBusiness && entry.cardBusiness === wantedBusiness;
              return (prepared.find(idMatches)
                || prepared.find((entry) => titleMatches(entry) && (!wantedBusiness || businessMatches(entry)))
                || prepared.find((entry) => businessMatches(entry) && (targetType === "clip" || targetType === "reel"))
                || prepared.find((entry) => !wantedId && !wantedTitle && (!wantedBusiness || businessMatches(entry)))
                || null)?.card || null;
            };
            const retry = () => {
              if (askEmyProfileTargetOpened) return;
              askEmyProfileTargetAttempts += 1;
              if (askEmyProfileTargetAttempts > 100) return;
              window.setTimeout(openAskEmyProfileTargetFromQuery, 160);
            };
            window.setTimeout(() => {
              const card = findCard();
              if (!card) {
                retry();
                return;
              }
              card.classList.add("is-ask-emy-target");
              if (card.scrollIntoView) card.scrollIntoView({ behavior: "smooth", block: "center" });
              window.setTimeout(() => {
                let opened = false;
                if ((targetType === "clip" || targetType === "reel") && window.emyOpenClipViewer) {
                  opened = window.emyOpenClipViewer(card) !== false;
                } else if (window.emyOpenItemDetail) {
                  opened = window.emyOpenItemDetail(card) !== false;
                }
                if (opened) askEmyProfileTargetOpened = true;
                else retry();
              }, 180);
            }, 120);
          }
          window.setTimeout(openAskEmyProfileTargetFromQuery, 160);
          ["emy:business-clips-changed", "emy:business-content-changed", "emy:business-products-changed"].forEach((eventName) => {
            window.addEventListener(eventName, () => {
              if (!askEmyProfileTargetOpened) window.setTimeout(openAskEmyProfileTargetFromQuery, 80);
            });
          });
          function refreshActiveDetailPanels() {
            if (!activeDetailCard || !modal.classList.contains("is-open")) return;
            const details = activeDetailDetails || detailsFromCard(activeDetailCard);
            renderBusinessPanel(activeDetailCard, details);
            if (productOwnerPanel && !productOwnerPanel.hidden) renderProductOwnerPanel(activeDetailCard, details, detailCountsFromCard(activeDetailCard, details));
          }
          ["emy:business-products-changed", "emy:business-content-changed", "emy:business-clips-changed", "emy:created-posts-changed", "emy:created-jobs-changed", "emy:created-events-changed", "emy:feed-action-state-changed", "emy:product-view-stats-changed", "emy:feed-reposts-changed"].forEach((eventName) => {
            window.addEventListener(eventName, () => window.setTimeout(refreshActiveDetailPanels, 0));
          });
          window.addEventListener("storage", (event) => {
            if (!event || !["emyFeedCommentThreads", "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyBusinessPosts", "emyBusinessFeedPosts", "emyFeedCreatedPosts", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips", "emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyFeedActionState", "emyProductViewStats", "emyFeedReposts"].includes(event.key)) return;
            refreshActiveDetailPanels();
          });
          function openPendingItemDetailIntent() {
            let payload = null;
            try {
              payload = JSON.parse(localStorage.getItem("emyPendingItemDetailOpen") || "null");
            } catch (error) {}
            if (!payload || typeof payload !== "object") return;
            try { localStorage.removeItem("emyPendingItemDetailOpen"); } catch (error) {}
            const createdAt = Number(payload.createdAt) || 0;
            if (createdAt && Date.now() - createdAt > 5 * 60 * 1000) return;
            if (typeof detailRecoverPendingPayload === "function") payload = detailRecoverPendingPayload(payload);
            const titleText = cleanText(payload.title || payload.detailTitle || payload.productTitle);
            if (!titleText) return;
            const kindText = cleanText(payload.detailKind || payload.kind || payload.type || payload.productType || "Product");
            const kindLower = kindText.toLowerCase();
            const virtualCard = document.createElement("article");
            virtualCard.className = kindLower.includes("clip") ? "card reel-card feed-product-clip-card is-clip" : kindLower.includes("post") ? "feed-card social-feed-card is-post" : "card product-card feed-product-card is-product";
            virtualCard.setAttribute("data-card", "");
            virtualCard.style.cssText = "position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;pointer-events:none;";
            virtualCard.setAttribute("aria-hidden", "true");
            const setData = (name, value) => {
              const clean = cleanText(value);
              if (clean) virtualCard.dataset[name] = clean;
            };
            setData("feedId", payload.feedId || payload.id || payload.productId);
            setData("businessKey", payload.businessKey || payload.key);
            setData("detailKind", kindText);
            setData("detailTitle", titleText);
            setData("detailDescription", payload.description || payload.detailDescription || payload.productDescription);
            setData("detailBusiness", payload.business || payload.detailBusiness || payload.businessName);
            setData("detailPrice", payload.price || payload.detailPrice || payload.productPrice);
            setData("detailMedia", payload.media || payload.detailMedia || payload.mediaClass || "product");
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
            if (Array.isArray(payload.mediaItems) && payload.mediaItems.length) {
              try { virtualCard.dataset.detailMediaItems = JSON.stringify(payload.mediaItems); } catch (error) {}
            }
            document.body.appendChild(virtualCard);
            openDetails(virtualCard);
          }
          window.setTimeout(openPendingItemDetailIntent, 80);
          function openSharedBusinessChat(card) {
            if (!card) return;
            const details = detailsFromCard(card);
            const businessName = inferProductBusiness(card, details);
            const businessKey = businessKeyFromDetails(card, details, businessName);
            openCustomerBusinessChat(businessKey, businessName, "clip-chat", details);
            return;
            setClipViewerOpen(false);
            const isPost = cleanText(details.kind).toLowerCase().includes("post");
            const isEvent = cleanText(details.kind).toLowerCase().includes("event");
            const isArticle = cleanText(details.kind).toLowerCase().includes("article");
            modal.classList.toggle("is-post", isPost);
            modal.classList.toggle("is-article", isArticle);
            setMedia(card, details);
            const isTextPost = isPost && modal.classList.contains("is-text-post");
            const visibleMeta = details.meta.filter((item) => !/^view post$/i.test(cleanText(item)));
            const postBody = cleanText(details.description) || cleanText(details.title);
            kind.textContent = details.kind;
            title.textContent = isTextPost ? postBody : details.title;
            business.textContent = isTextPost ? [details.business].concat(visibleMeta).filter(Boolean).join(" - ") : details.business;
            business.hidden = !details.business;
            if (isArticle) description.innerHTML = escapeDetail(details.description) + articleInlineMetaMarkup(visibleMeta);
            else description.textContent = details.description;
            description.hidden = isTextPost || (isPost && (!cleanText(details.description) || cleanText(details.description).toLowerCase() === cleanText(details.title).toLowerCase()));
            price.textContent = details.price;
            price.hidden = !details.price;
            meta.hidden = isArticle || isTextPost || visibleMeta.length === 0;
            meta.innerHTML = (isArticle || isTextPost) ? "" : visibleMeta.map((item) => '<span>' + escapeDetail(item) + '</span>').join("");
            renderJobPanel(card, details);
            renderEventPanel(card, details);
            renderProductPanel(card, details);
            renderBusinessPanel(card, details);
            setModalOpen(true);
            productSectionScroll(productChatSection, productChatInput, "Shared business chat opened.");
          }
          function candidateCard(target) {
            const card = target && target.closest ? target.closest(cardSelector) : null;
            if (!card || card.hidden || card.closest("[hidden]")) return null;
            if (card.classList.contains("business-preview-profile-card") || card.hasAttribute("data-business-preview-profile-card")) return null;
            return card;
          }
          function isBusinessProfilePreviewKind(value) {
            const kind = cleanText(value).toLowerCase();
            if (!kind) return false;
            if (/(product|clip|event|job|hiring|article|post|repost)/.test(kind)) return false;
            return kind === "business" || kind === "profile" || kind.includes("business profile") || kind.includes("this business");
          }
          function embeddedBusinessProfileTarget(target) {
            if (!target || !target.closest) return null;
            if (target.closest(ignoredClickSelector + ", [data-feed-options-menu], [data-public-activity-options-menu]")) return null;
            const node = target.closest(".social-feed-quote, .feed-business-profile-card, .search-business-profile-card, .business-card.is-profile, [data-business-profile-card], [data-detail-kind]");
            if (!node) return null;
            const insideOverlay = node.closest("[data-item-detail-modal], .item-detail-modal, [data-clip-viewer-modal], .clip-viewer-modal");
            if (insideOverlay && !node.hasAttribute("data-business-profile-card")) return null;
            const classes = node.classList;
            const isProfileCard = !!(classes && (classes.contains("feed-business-profile-card") || classes.contains("search-business-profile-card") || classes.contains("business-card") && classes.contains("is-profile")));
            const isPlainBusinessCard = !!(classes && classes.contains("business-card") && !classes.contains("feed-business-profile-card") && !classes.contains("search-business-profile-card")) || node.hasAttribute("data-business-card");
            if (isPlainBusinessCard && !node.hasAttribute("data-business-profile-card")) return null;
            const data = node.dataset || {};
            if (!isProfileCard && !isBusinessProfilePreviewKind(data.detailKind)) return null;
            let key = cleanText(data.businessLink || data.businessKey || data.detailBusinessKey);
            if (!key || /^(business|profile|this-business)$/i.test(key)) {
              key = detailSlug(data.detailBusiness || data.detailTitle || getText(node, ".social-feed-quote-title") || getText(node, "h3") || getText(node, "strong"));
            }
            if (!key || key === "customer-profile") return null;
            return { node, key };
          }
          function openEmbeddedBusinessProfile(target, event) {
            const match = embeddedBusinessProfileTarget(target);
            if (!match) return false;
            event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
            try { localStorage.setItem("emySelectedBusinessProfileKey", match.key); } catch (error) {}
            window.location.href = "emy-business-profile.html?business=" + encodeURIComponent(match.key);
            return true;
          }
          function makeCardsFocusable(root) {
            (root || document).querySelectorAll(cardSelector).forEach((card) => {
              if (card.matches("a") || card.classList.contains("business-preview-profile-card") || card.hasAttribute("data-business-preview-profile-card")) return;
              if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
              if (!card.hasAttribute("role")) card.setAttribute("role", "button");
            });
          }
          function liveToast(message) {
            if (!message) return;
            if (typeof showToast === "function") {
              showToast(message);
              return;
            }
            setProductFeedback(message);
          }
          function updateInlineLike(node) {
            if (!node) return;
            const text = cleanText(node.textContent);
            const current = readEngagementCount(text);
            const active = !node.classList.contains("is-active");
            node.classList.toggle("is-active", active);
            const next = Math.max(0, current + (active ? 1 : -1));
            const countNode = node.querySelector("[data-reel-like-count]");
            if (countNode) setEngagementCountText(countNode, next);
            else node.textContent = formatEngagementCount(next);
            node.setAttribute("aria-label", active ? "Liked" : "Like");
            liveToast(active ? "Liked." : "Like removed.");
          }
          function shareLiveCard(card) {
            if (!card) return;
            const details = detailsFromCard(card);
            const titleText = cleanText(details.title) || document.title;
            const shareUrl = window.location.href;
            if (navigator.share) {
              navigator.share({ title: titleText, url: shareUrl }).then(() => liveToast("Share sheet opened.")).catch(() => {});
              return;
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(shareUrl).then(() => liveToast("Link copied."));
              return;
            }
            liveToast("Share this from the item details.");
          }
          function directClipOpenCard(target) {
            const node = target && target.closest ? target : null;
            if (!node) return null;
            const card = node.closest(".reel-card, .feed-clip-card, .feed-product-clip-card, .search-reel-card, .business-posted-clip-card, .business-preview-card-reel, .social-feed-card.is-clip, [data-detail-kind='Clip'], [data-detail-kind='Product Clip']");
            if (!card || card.closest("[data-clip-viewer-modal], .clip-viewer-modal, [data-item-detail-modal], .item-detail-modal")) return null;
            if (node.closest(ignoredClickSelector + ", [data-feed-options-menu], [data-public-activity-options-menu], [data-clip-like-toggle], .clip-viewer-like-chip")) return null;
            return isClipCard(card, detailsFromCard(card)) ? card : null;
          }
          document.addEventListener("click", (event) => {
            if (openEmbeddedBusinessProfile(event.target, event)) return;
          }, true);
          document.addEventListener("click", (event) => {
            const card = directClipOpenCard(event.target);
            if (!card) return;
            event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
            openClipViewer(card);
          }, true);
          document.addEventListener("click", (event) => {
            const playControl = event.target.closest(".reel-play, .search-reel-play, .feed-play, .social-feed-play, .clip-play, .video-play, .media-play, .feed-media-play, .feed-video-play, .play-button, [data-feed-play], [data-open-clip], [data-clip-open], [data-video-play], [data-play-video], [data-feed-video-play]");
            if (playControl) {
              const card = candidateCard(playControl);
              if (card) {
                event.preventDefault();
                event.stopImmediatePropagation();
                openClipViewer(card);
              }
              return;
            }
            const reelAction = event.target.closest(".reel-actions span, .search-reel-actions span");
            if (!reelAction) return;
            const card = candidateCard(reelAction);
            if (!card) return;
            const label = cleanText(reelAction.textContent).toLowerCase();
            event.preventDefault();
            event.stopImmediatePropagation();
            if (label.includes("like")) {
              updateInlineLike(reelAction);
              return;
            }
            if (label.includes("share")) {
              shareLiveCard(card);
              return;
            }
            if (label.includes("view")) {
              openClipViewer(card);
            }
          });
          document.addEventListener("click", (event) => {
            const card = candidateCard(event.target);
            if (!card) return;
            if (event.target.closest(ignoredClickSelector)) return;
            const link = event.target.closest("a");
            const opensItemDetail = link && (link.classList.contains("feed-media-link") || link.hasAttribute("data-open-item-detail"));
            const businessCardLink = link && card.matches && card.matches(".business-card, [data-business-card]") && link.closest(".business-card, [data-business-card]") === card;
            if (link && !opensItemDetail && !businessCardLink) return;
            if (opensItemDetail || businessCardLink) event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
            openDetails(card);
          });
          document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && clipModal && clipModal.classList.contains("is-open")) {
              setClipViewerOpen(false);
              return;
            }
            if ((event.key === "ArrowDown" || event.key === "PageDown") && clipModal && clipModal.classList.contains("is-open")) {
              event.preventDefault();
              clipTrack.scrollBy({ top: clipTrack.clientHeight, behavior: "auto" });
              return;
            }
            if ((event.key === "ArrowUp" || event.key === "PageUp") && clipModal && clipModal.classList.contains("is-open")) {
              event.preventDefault();
              clipTrack.scrollBy({ top: -clipTrack.clientHeight, behavior: "auto" });
              return;
            }
            if (event.key === "Escape" && modal.classList.contains("is-open")) {
              setModalOpen(false);
              return;
            }
            if (event.key !== "Enter" && event.key !== " ") return;
            if (isTypingTarget(event.target) || isTypingTarget(document.activeElement)) return;
            const card = candidateCard(document.activeElement);
            if (!card) return;
            event.preventDefault();
            openDetails(card);
          });
          modal.addEventListener("click", (event) => {
            const optionAction = event.target.closest("[data-item-detail-option]");
            if (optionAction) {
              event.preventDefault();
              event.stopPropagation();
              triggerDetailOption(optionAction.dataset.itemDetailOption);
              return;
            }
            const optionsButton = event.target.closest("[data-item-detail-options]");
            if (optionsButton) {
              event.preventDefault();
              event.stopPropagation();
              if (detailOptionsMenu && !detailOptionsMenu.children.length) renderDetailOptions(activeDetailCard, activeDetailDetails);
              const open = detailOptionsMenu && detailOptionsMenu.hidden;
              if (detailOptionsMenu) {
                detailOptionsMenu.hidden = !open;
                if (open) positionDetailOptionsMenu();
              }
              if (detailOptionsButton) detailOptionsButton.setAttribute("aria-expanded", open ? "true" : "false");
              return;
            }
            if (detailOptionsMenu && !detailOptionsMenu.hidden && !event.target.closest("[data-item-detail-options-menu]")) {
              closeDetailOptionsMenu();
            }
            if (event.target === modal || event.target.closest("[data-item-detail-close]") || event.target.closest("[data-item-detail-done]")) setModalOpen(false);
          });
          media.addEventListener("click", (event) => {
            const thumb = event.target.closest("[data-item-product-gallery-thumb]");
            if (!thumb) return;
            const index = thumb.getAttribute("data-item-product-gallery-thumb");
            media.querySelectorAll("[data-item-product-gallery-thumb]").forEach((node) => node.classList.toggle("is-active", node === thumb));
            media.querySelectorAll("[data-item-product-gallery-frame]").forEach((node) => node.classList.toggle("is-active", node.getAttribute("data-item-product-gallery-frame") === index));
          });
          if (clipModal) {
            if (clipTrack) {
              clipTrack.addEventListener("scroll", () => scheduleActiveClipPlayback(false), { passive: true });
              ["pointerdown", "touchstart", "wheel"].forEach((eventName) => {
                clipTrack.addEventListener(eventName, () => restoreClipViewerSound(activeClipSlideFromTrack()), { passive: true });
              });
            }
            const handleClipVolumeInput = (event) => {
              const input = event.target && event.target.closest ? event.target.closest("[data-clip-video-volume]") : null;
              if (!input) return;
              event.stopPropagation();
              setClipVideoVolume(input.closest("[data-clip-slide]"), input.value, event.type !== "input");
            };
            let clipVolumeDrag = null;
            const setClipVolumeFromPointer = (event, popover, persist) => {
              if (!popover) return;
              const slide = popover.closest("[data-clip-slide]");
              if (!slide) return;
              const rect = popover.getBoundingClientRect();
              const padding = 14;
              const top = rect.top + padding;
              const bottom = rect.bottom - padding;
              const usable = Math.max(1, bottom - top);
              const y = Math.max(top, Math.min(bottom, Number(event.clientY)));
              const volume = Math.max(0, Math.min(1, 1 - ((y - top) / usable)));
              const input = popover.querySelector("[data-clip-video-volume]");
              if (input) input.value = String(volume);
              setClipVideoVolume(slide, volume, persist);
            };
            const commitClipVolume = (popover) => {
              if (!popover) return;
              const slide = popover.closest("[data-clip-slide]");
              const input = popover.querySelector("[data-clip-video-volume]");
              if (!slide || !input) return;
              setClipVideoVolume(slide, input.value, true);
            };
            clipModal.addEventListener("pointerdown", (event) => {
              const popover = event.target && event.target.closest ? event.target.closest("[data-clip-volume-popover]") : null;
              if (!popover) return;
              event.preventDefault();
              event.stopPropagation();
              clipVolumeDrag = { id: event.pointerId, popover };
              if (popover.setPointerCapture) {
                try { popover.setPointerCapture(event.pointerId); } catch (error) {}
              }
              setClipVolumeFromPointer(event, popover, false);
            }, true);
            clipModal.addEventListener("pointermove", (event) => {
              if (!clipVolumeDrag || clipVolumeDrag.id !== event.pointerId) return;
              event.preventDefault();
              event.stopPropagation();
              setClipVolumeFromPointer(event, clipVolumeDrag.popover, false);
            }, true);
            ["pointerup", "pointercancel", "lostpointercapture"].forEach((eventName) => {
              clipModal.addEventListener(eventName, (event) => {
                if (!clipVolumeDrag || (event.pointerId != null && clipVolumeDrag.id !== event.pointerId)) return;
                const popover = clipVolumeDrag.popover;
                if (Number.isFinite(Number(event.clientY))) setClipVolumeFromPointer(event, popover, true);
                else commitClipVolume(popover);
                clipVolumeDrag = null;
              }, true);
            });
            clipModal.addEventListener("wheel", (event) => {
              const popover = event.target && event.target.closest ? event.target.closest("[data-clip-volume-popover]") : null;
              if (!popover) return;
              event.preventDefault();
              event.stopPropagation();
              const slide = popover.closest("[data-clip-slide]");
              const input = popover.querySelector("[data-clip-video-volume]");
              const current = input ? Number(input.value) : clipViewerVolume;
              const next = Math.max(0, Math.min(1, current + (event.deltaY < 0 ? 0.06 : -0.06)));
              if (input) input.value = String(next);
              setClipVideoVolume(slide, next, false);
              window.clearTimeout(popover._clipVolumeWheelTimer);
              popover._clipVolumeWheelTimer = window.setTimeout(() => setClipVideoVolume(slide, next, true), 180);
            }, { passive: false, capture: true });
            clipModal.addEventListener("input", handleClipVolumeInput);
            clipModal.addEventListener("change", handleClipVolumeInput);
            clipModal.addEventListener("click", (event) => {
              if (!event.target.closest("[data-clip-video-mute], [data-clip-video-volume], [data-clip-volume-wrap]")) {
                restoreClipViewerSound(event.target.closest("[data-clip-slide]") || activeClipSlideFromTrack());
              }
              const clipMoreButton = event.target.closest("[data-clip-more]");
              if (clipMoreButton) {
                event.preventDefault();
                event.stopPropagation();
                openClipMoreOptions(clipMoreButton);
                return;
              }
              const clipMoreAction = event.target.closest("[data-clip-more-action]");
              if (clipMoreAction) {
                event.preventDefault();
                event.stopPropagation();
                handleClipMoreAction(clipMoreAction);
                return;
              }
              if (!event.target.closest("[data-clip-more-menu]")) closeClipMoreMenus();
              const clipLikeToggle = event.target.closest("[data-clip-like-toggle]");
              if (clipLikeToggle) {
                event.preventDefault();
                event.stopPropagation();
                toggleClipLikeChip(clipLikeToggle);
                return;
              }
              const clipMuteButton = event.target.closest("[data-clip-video-mute]");
              if (clipMuteButton) {
                event.preventDefault();
                event.stopPropagation();
                toggleClipVideoMute(clipMuteButton.closest("[data-clip-slide]"));
                return;
              }
              const clipPlayButton = event.target.closest("[data-clip-video-play]");
              if (clipPlayButton) {
                event.preventDefault();
                event.stopPropagation();
                toggleClipVideoPlayback(clipPlayButton.closest("[data-clip-slide]"));
                return;
              }
              const clipMedia = event.target.closest(".clip-viewer-media");
              if (clipMedia && clipMedia.querySelector("video")) {
                event.preventDefault();
                toggleClipVideoPlayback(clipMedia.closest("[data-clip-slide]"));
                return;
              }
              const clipActionButton = event.target.closest("[data-clip-action]");
              if (clipActionButton) {
                clipActionButton.closest(".clip-viewer-actions,[data-clip-action-wrap]")?.remove();
                return;
              }
              const customerButton = event.target.closest("[data-clip-customer]");
              if (customerButton) {
                if (!detailCanBecomeCustomer()) {
                  const slide = customerButton.closest("[data-clip-slide]");
                  if (slide) setClipFeedback(slide, "Business accounts cannot become customers. Switch to a customer account first.");
                  return;
                }
                const slide = customerButton.closest("[data-clip-slide]");
                const isAlreadyCustomer = customerButton.classList.contains("is-customer");
                const businessKey = slide && slide.dataset.clipBusinessKey;
                const businessName = slide && slide.dataset.clipBusinessName || "Business";
                const title = cleanText(slide && slide.querySelector(".clip-viewer-info h3") && slide.querySelector(".clip-viewer-info h3").textContent);
                if (isAlreadyCustomer) {
                  window.location.href = "emy-customer-search.html#following";
                  return;
                }
                if (businessKey) {
                  try {
                    localStorage.setItem("emySelectedBusinessProfileKey", businessKey);
                    localStorage.setItem("emyBusinessContactIntent", JSON.stringify({
                      businessKey,
                      businessName,
                      productTitle: title,
                      intent: "become-customer"
                    }));
                  } catch (error) {}
                  if (!setCustomerBusinessState(businessKey, businessName, true, { title })) return;
                }
                customerButton.classList.add("is-customer");
                customerButton.setAttribute("aria-pressed", "true");
                customerButton.textContent = "View My Businesses";
                customerButton.setAttribute("aria-label", "Open My Businesses");
                if (slide) setClipFeedback(slide, "Added. Opening My Businesses...");
                window.setTimeout(() => {
                  window.location.href = "emy-customer-search.html#following";
                }, 450);
                return;
              }
              const commentsClose = event.target.closest("[data-clip-comments-close]");
              if (commentsClose) {
                const panel = commentsClose.closest("[data-clip-comments-panel]");
                if (panel) panel.hidden = true;
                return;
              }
              const replyLike = event.target.closest("[data-clip-reply-like]");
              const replyDislike = event.target.closest("[data-clip-reply-dislike]");
              const replyEdit = event.target.closest("[data-clip-reply-edit]");
              const replyDelete = event.target.closest("[data-clip-reply-delete]");
              const replySaveEdit = event.target.closest("[data-clip-reply-save-edit]");
              const replyCancelEdit = event.target.closest("[data-clip-reply-cancel-edit]");
              if (replyLike || replyDislike || replyEdit || replyDelete || replySaveEdit || replyCancelEdit) {
                const replyNode = event.target.closest("[data-clip-comment-reply-item]");
                const commentNode = event.target.closest("[data-clip-comment-id]");
                const slide = event.target.closest("[data-clip-slide]");
                const commentId = commentNode && commentNode.dataset.clipCommentId;
                const replyId = replyNode && replyNode.dataset.clipCommentReplyItem;
                const state = clipStateForSlide(slide);
                const comments = normaliseClipComments(state.comments);
                const comment = comments.find((item) => item.id === commentId);
                const reply = comment && Array.isArray(comment.replies) ? comment.replies.find((item) => item.id === replyId) : null;
                if (!reply || !replyNode) return;
                if (replyLike || replyDislike) {
                  const likedAction = !!replyLike;
                  if (likedAction) {
                    reply.liked = !reply.liked;
                    reply.likes = Math.max(0, Number(reply.likes) + (reply.liked ? 1 : -1));
                    if (reply.liked && reply.disliked) {
                      reply.disliked = false;
                      reply.dislikes = Math.max(0, Number(reply.dislikes) - 1);
                    }
                  } else {
                    reply.disliked = !reply.disliked;
                    reply.dislikes = Math.max(0, Number(reply.dislikes) + (reply.disliked ? 1 : -1));
                    if (reply.disliked && reply.liked) {
                      reply.liked = false;
                      reply.likes = Math.max(0, Number(reply.likes) - 1);
                    }
                  }
                  const likeButton = replyNode.querySelector("[data-clip-reply-like]");
                  const dislikeButton = replyNode.querySelector("[data-clip-reply-dislike]");
                  const likeCount = replyNode.querySelector("[data-clip-reply-like-count]");
                  const dislikeCount = replyNode.querySelector("[data-clip-reply-dislike-count]");
                  if (likeButton) {
                    likeButton.classList.toggle("is-active", !!reply.liked);
                    likeButton.setAttribute("aria-pressed", reply.liked ? "true" : "false");
                  }
                  if (dislikeButton) {
                    dislikeButton.classList.toggle("is-active", !!reply.disliked);
                    dislikeButton.setAttribute("aria-pressed", reply.disliked ? "true" : "false");
                  }
                  if (likeCount) setEngagementCountText(likeCount, reply.likes);
                  if (dislikeCount) setEngagementCountText(dislikeCount, reply.dislikes);
                  saveClipStateForSlide(slide, { comments });
                  if (likedAction && reply.liked) notifyClipOwner(slide, "reply-like", currentUserDisplayName() + " liked a reply on your clip.");
                  if (!likedAction && reply.disliked) notifyClipOwner(slide, "reply-dislike", currentUserDisplayName() + " disliked a reply on your clip.");
                  setClipFeedback(slide, likedAction ? (reply.liked ? "Reply liked." : "Reply like removed.") : (reply.disliked ? "Reply disliked." : "Reply dislike removed."));
                  return;
                }
                if (!reply.mine || replyNode.dataset.clipReplyOwned !== "true") return;
                if (replyDelete) {
                  comment.replies = comment.replies.filter((item) => item.id !== replyId);
                  replyNode.remove();
                  saveClipStateForSlide(slide, { comments });
                  notifyClipOwner(slide, "reply-delete", currentUserDisplayName() + " deleted a reply on your clip.");
                  setClipFeedback(slide, "Reply deleted.");
                  return;
                }
                const textNode = replyNode.querySelector("[data-clip-comment-reply-text]");
                const actions = replyNode.querySelector(".clip-viewer-comment-actions");
                if (replyEdit && textNode && actions && replyNode.dataset.editing !== "true") {
                  replyNode.dataset.editing = "true";
                  replyNode.dataset.originalText = textNode.textContent || "";
                  textNode.innerHTML = '<input class="clip-viewer-comment-edit-field" data-clip-reply-edit-field value="' + escapeDetail(replyNode.dataset.originalText || "") + '" aria-label="Edit reply" />';
                  actions.querySelectorAll("[data-clip-reply-edit], [data-clip-reply-delete]").forEach((button) => button.hidden = true);
                  actions.insertAdjacentHTML("beforeend", '<button type="button" data-clip-reply-save-edit aria-label="Save edit" title="Save">' + actionIcon("save") + '</button><button type="button" data-clip-reply-cancel-edit aria-label="Cancel edit" title="Cancel">' + actionIcon("cancel") + '</button>');
                  const field = replyNode.querySelector("[data-clip-reply-edit-field]");
                  if (field) field.focus();
                  return;
                }
                if (replySaveEdit && textNode) {
                  const field = replyNode.querySelector("[data-clip-reply-edit-field]");
                  const value = cleanText(field && field.value);
                  if (!value) {
                    if (field) field.focus();
                    return;
                  }
                  reply.text = value;
                  textNode.textContent = value;
                  delete replyNode.dataset.editing;
                  delete replyNode.dataset.originalText;
                  replyNode.querySelectorAll("[data-clip-reply-save-edit], [data-clip-reply-cancel-edit]").forEach((button) => button.remove());
                  replyNode.querySelectorAll("[data-clip-reply-edit], [data-clip-reply-delete]").forEach((button) => button.hidden = false);
                  saveClipStateForSlide(slide, { comments });
                  notifyClipOwner(slide, "reply-edit", currentUserDisplayName() + " edited a reply on your clip.");
                  setClipFeedback(slide, "Reply updated.");
                  return;
                }
                if (replyCancelEdit && textNode) {
                  textNode.textContent = replyNode.dataset.originalText || "";
                  delete replyNode.dataset.editing;
                  delete replyNode.dataset.originalText;
                  replyNode.querySelectorAll("[data-clip-reply-save-edit], [data-clip-reply-cancel-edit]").forEach((button) => button.remove());
                  replyNode.querySelectorAll("[data-clip-reply-edit], [data-clip-reply-delete]").forEach((button) => button.hidden = false);
                  return;
                }
              }
              const commentLike = event.target.closest("[data-clip-comment-like]");
              if (commentLike) {
                const commentNode = commentLike.closest("[data-clip-comment-id]");
                const slide = commentLike.closest("[data-clip-slide]");
                const commentId = commentNode && commentNode.dataset.clipCommentId;
                const state = clipStateForSlide(slide);
                const comments = normaliseClipComments(state.comments);
                const comment = comments.find((item) => item.id === commentId);
                if (!comment) return;
                comment.liked = !comment.liked;
                comment.likes = Math.max(0, Number(comment.likes) + (comment.liked ? 1 : -1));
                if (comment.liked && comment.disliked) {
                  comment.disliked = false;
                  comment.dislikes = Math.max(0, Number(comment.dislikes) - 1);
                  const dislikeButton = commentNode.querySelector("[data-clip-comment-dislike]");
                  const dislikeCount = commentNode.querySelector("[data-clip-comment-dislike-count]");
                  if (dislikeButton) {
                    dislikeButton.classList.remove("is-active");
                    dislikeButton.setAttribute("aria-pressed", "false");
                  }
                  if (dislikeCount) setEngagementCountText(dislikeCount, comment.dislikes);
                }
                commentLike.classList.toggle("is-active", comment.liked);
                commentLike.setAttribute("aria-pressed", comment.liked ? "true" : "false");
                const count = commentNode.querySelector("[data-clip-comment-like-count]");
                if (count) setEngagementCountText(count, comment.likes);
                saveClipStateForSlide(slide, { comments });
                if (comment.liked) notifyClipOwner(slide, "comment-like", currentUserDisplayName() + " liked a comment on your clip.");
                setClipFeedback(slide, comment.liked ? "Comment liked." : "Comment like removed.");
                return;
              }
              const commentDislike = event.target.closest("[data-clip-comment-dislike]");
              if (commentDislike) {
                const commentNode = commentDislike.closest("[data-clip-comment-id]");
                const slide = commentDislike.closest("[data-clip-slide]");
                const commentId = commentNode && commentNode.dataset.clipCommentId;
                const state = clipStateForSlide(slide);
                const comments = normaliseClipComments(state.comments);
                const comment = comments.find((item) => item.id === commentId);
                if (!comment) return;
                comment.disliked = !comment.disliked;
                comment.dislikes = Math.max(0, Number(comment.dislikes) + (comment.disliked ? 1 : -1));
                if (comment.disliked && comment.liked) {
                  comment.liked = false;
                  comment.likes = Math.max(0, Number(comment.likes) - 1);
                  const likeButton = commentNode.querySelector("[data-clip-comment-like]");
                  const likeCount = commentNode.querySelector("[data-clip-comment-like-count]");
                  if (likeButton) {
                    likeButton.classList.remove("is-active");
                    likeButton.setAttribute("aria-pressed", "false");
                  }
                  if (likeCount) setEngagementCountText(likeCount, comment.likes);
                }
                commentDislike.classList.toggle("is-active", comment.disliked);
                commentDislike.setAttribute("aria-pressed", comment.disliked ? "true" : "false");
                const count = commentNode.querySelector("[data-clip-comment-dislike-count]");
                if (count) setEngagementCountText(count, comment.dislikes);
                saveClipStateForSlide(slide, { comments });
                if (comment.disliked) notifyClipOwner(slide, "comment-dislike", currentUserDisplayName() + " disliked a comment on your clip.");
                setClipFeedback(slide, comment.disliked ? "Comment disliked." : "Comment dislike removed.");
                return;
              }
              const commentDelete = event.target.closest("[data-clip-comment-delete]");
              if (commentDelete) {
                const commentNode = commentDelete.closest("[data-clip-comment-id]");
                const slide = commentDelete.closest("[data-clip-slide]");
                const commentId = commentNode && commentNode.dataset.clipCommentId;
                const state = clipStateForSlide(slide);
                const comments = normaliseClipComments(state.comments);
                const comment = comments.find((item) => item.id === commentId);
                if (!comment || !comment.mine) return;
                const nextComments = comments.filter((item) => item.id !== commentId);
                const commentWrap = slide && slide.querySelector('[data-clip-action-wrap="comment"]');
                const nextCount = Math.max(0, clipCountValue(commentWrap && commentWrap.querySelector("[data-clip-action-count]")) - 1);
                if (commentWrap) setClipCount(commentWrap, nextCount);
                if (commentNode) commentNode.remove();
                saveClipStateForSlide(slide, { comments: nextComments, commentCount: nextCount });
                notifyClipOwner(slide, "comment-delete", currentUserDisplayName() + " deleted a comment on your clip.");
                setClipFeedback(slide, "Comment deleted.");
                return;
              }
              const commentEdit = event.target.closest("[data-clip-comment-edit]");
              if (commentEdit) {
                const commentNode = commentEdit.closest("[data-clip-comment-id]");
                if (!commentNode || commentNode.dataset.clipCommentOwned !== "true" || commentNode.dataset.editing === "true") return;
                const textNode = commentNode.querySelector("[data-clip-comment-text]");
                const actions = commentNode.querySelector(".clip-viewer-comment-actions");
                if (!textNode || !actions) return;
                commentNode.dataset.editing = "true";
                commentNode.dataset.originalText = textNode.textContent || "";
                textNode.innerHTML = '<input class="clip-viewer-comment-edit-field" data-clip-comment-edit-field value="' + escapeDetail(commentNode.dataset.originalText || "") + '" aria-label="Edit comment" />';
                actions.querySelectorAll("[data-clip-comment-edit], [data-clip-comment-delete]").forEach((button) => button.hidden = true);
                actions.insertAdjacentHTML("beforeend", '<button type="button" data-clip-comment-save-edit aria-label="Save edit" title="Save">' + actionIcon("save") + '</button><button type="button" data-clip-comment-cancel-edit aria-label="Cancel edit" title="Cancel">' + actionIcon("cancel") + '</button>');
                const field = commentNode.querySelector("[data-clip-comment-edit-field]");
                if (field) field.focus();
                return;
              }
              const commentSaveEdit = event.target.closest("[data-clip-comment-save-edit]");
              if (commentSaveEdit) {
                const commentNode = commentSaveEdit.closest("[data-clip-comment-id]");
                const slide = commentSaveEdit.closest("[data-clip-slide]");
                if (!commentNode || commentNode.dataset.clipCommentOwned !== "true") return;
                const field = commentNode.querySelector("[data-clip-comment-edit-field]");
                const textNode = commentNode.querySelector("[data-clip-comment-text]");
                const value = cleanText(field && field.value);
                if (!value) {
                  if (field) field.focus();
                  return;
                }
                const state = clipStateForSlide(slide);
                const comments = normaliseClipComments(state.comments);
                const comment = comments.find((item) => item.id === commentNode.dataset.clipCommentId);
                if (!comment || !comment.mine) return;
                comment.text = value;
                if (textNode) textNode.textContent = value;
                delete commentNode.dataset.editing;
                delete commentNode.dataset.originalText;
                commentNode.querySelectorAll("[data-clip-comment-save-edit], [data-clip-comment-cancel-edit]").forEach((button) => button.remove());
                commentNode.querySelectorAll("[data-clip-comment-edit], [data-clip-comment-delete]").forEach((button) => button.hidden = false);
                saveClipStateForSlide(slide, { comments });
                notifyClipOwner(slide, "comment-edit", currentUserDisplayName() + " edited a comment on your clip.");
                setClipFeedback(slide, "Comment updated.");
                return;
              }
              const commentCancelEdit = event.target.closest("[data-clip-comment-cancel-edit]");
              if (commentCancelEdit) {
                const commentNode = commentCancelEdit.closest("[data-clip-comment-id]");
                if (!commentNode || commentNode.dataset.clipCommentOwned !== "true") return;
                const textNode = commentNode.querySelector("[data-clip-comment-text]");
                if (textNode) textNode.textContent = commentNode.dataset.originalText || "";
                delete commentNode.dataset.editing;
                delete commentNode.dataset.originalText;
                commentNode.querySelectorAll("[data-clip-comment-save-edit], [data-clip-comment-cancel-edit]").forEach((button) => button.remove());
                commentNode.querySelectorAll("[data-clip-comment-edit], [data-clip-comment-delete]").forEach((button) => button.hidden = false);
                return;
              }
              const replyButton = event.target.closest("[data-clip-comment-reply]");
              if (replyButton) {
                const commentNode = replyButton.closest("[data-clip-comment-id]");
                const form = commentNode && commentNode.querySelector("[data-clip-comment-reply-form]");
                if (!form) return;
                form.hidden = !form.hidden;
                const input = form.querySelector("input");
                if (!form.hidden && input) window.setTimeout(() => input.focus(), 60);
                return;
              }
              if (event.target === clipModal || event.target.closest("[data-clip-viewer-close]")) setClipViewerOpen(false);
            });
            clipModal.addEventListener("submit", (event) => {
              const replyForm = event.target.closest("[data-clip-comment-reply-form]");
              if (replyForm) {
                event.preventDefault();
                const input = replyForm.querySelector("input");
                const value = input && input.value.trim();
                const slide = replyForm.closest("[data-clip-slide]");
                const commentNode = replyForm.closest("[data-clip-comment-id]");
                const commentId = commentNode && commentNode.dataset.clipCommentId;
                if (!value) {
                  setClipFeedback(slide, "Write a reply first.");
                  return;
                }
                const state = clipStateForSlide(slide);
                const comments = normaliseClipComments(state.comments);
                const comment = comments.find((item) => item.id === commentId);
                if (!comment) return;
                const reply = { id: makeClipCommentId(), author: currentUserDisplayName(), text: value, mine: true, createdAt: new Date().toISOString() };
                comment.replies = Array.isArray(comment.replies) ? comment.replies.concat(reply) : [reply];
                const repliesNode = commentNode.querySelector("[data-clip-comment-replies]");
                if (repliesNode) repliesNode.insertAdjacentHTML("beforeend", renderClipReply(reply));
                saveClipStateForSlide(slide, { comments });
                notifyClipOwner(slide, "reply", currentUserDisplayName() + " replied to a comment on your clip.");
                input.value = "";
                replyForm.hidden = true;
                setClipFeedback(slide, "Reply added.");
                return;
              }
              const form = event.target.closest("[data-clip-comment-form]");
              if (!form) return;
              event.preventDefault();
              const input = form.querySelector("input");
              const value = input && input.value.trim();
              const slide = form.closest("[data-clip-slide]");
              if (!value) {
                setClipFeedback(slide, "Write a comment first.");
                return;
              }
              const list = slide && slide.querySelector("[data-clip-comments-list]");
              const newComment = { id: makeClipCommentId(), author: currentUserDisplayName(), text: value, mine: true, createdAt: new Date().toISOString(), liked: false, likes: 0, disliked: false, dislikes: 0, replies: [] };
              if (list) {
                list.insertAdjacentHTML("beforeend", renderSavedClipComment(newComment));
              }
              const commentWrap = slide && slide.querySelector('[data-clip-action-wrap="comment"]');
              let nextCommentCount = 1;
              if (commentWrap) {
                nextCommentCount = clipCountValue(commentWrap.querySelector("[data-clip-action-count]")) + 1;
                setClipCount(commentWrap, nextCommentCount);
              }
              const state = clipStateForSlide(slide);
              const comments = normaliseClipComments(state.comments);
              comments.push(newComment);
              saveClipStateForSlide(slide, { comments: comments.slice(-40), commentCount: nextCommentCount });
              notifyClipOwner(slide, "comment", currentUserDisplayName() + " commented on your clip: " + value);
              input.value = "";
              setClipFeedback(slide, "Comment added.");
            });
          }
          if (save) {
            save.addEventListener("click", () => {
              if (modal.classList.contains("is-product") && productSocialSave) {
                productSocialSave.click();
                return;
              }
              setProductSavedState(!save.classList.contains("is-saved"));
            });
          }
          if (productLike) {
            productLike.addEventListener("click", () => {
              if (detailDispatchSourceAction("like")) return;
              const label = modal.classList.contains("is-article") ? "Article" : modal.classList.contains("is-post") ? "Post" : "Product";
              const active = toggleCountButton(productLike, productLikeCount, label + " liked.", label + " like removed.");
              const state = detailFeedStateForCard(activeDetailCard);
              const nextLikedBy = detailPeopleListWithCurrent(state.likedBy, active);
              detailUpdateFeedStateForCard(activeDetailCard, { liked: false, baseLikeCount: 0, countedLikeCount: detailPeopleCount(nextLikedBy), likedBy: nextLikedBy });
              if (active) detailNotifyOwnerAction("like", (label) => currentUserDisplayName() + " liked your " + label + ".");
            });
          }
          if (productRepost) {
            productRepost.addEventListener("click", () => {
              if (toggleDetailRepost(activeDetailCard, activeDetailDetails)) return;
              openDetailRepostDialog(activeDetailCard, activeDetailDetails);
            });
          }
          if (businessRepost) {
            businessRepost.addEventListener("click", () => {
              if (toggleDetailRepost(activeDetailCard, activeDetailDetails)) return;
              openDetailRepostDialog(activeDetailCard, activeDetailDetails);
            });
          }
          if (productSocialSave) {
            productSocialSave.addEventListener("click", () => {
              if (detailDispatchSourceAction("save")) return;
              const label = modal.classList.contains("is-article") ? "Article" : modal.classList.contains("is-post") ? "Post" : "Product";
              const active = toggleCountButton(productSocialSave, productSaveCount, label + " saved.", label + " removed from saved items.");
              setProductSavedState(productSocialSave.classList.contains("is-active"));
              const state = detailFeedStateForCard(activeDetailCard);
              const nextSavedBy = detailPeopleListWithCurrent(state.savedBy, active);
              detailUpdateFeedStateForCard(activeDetailCard, { saved: false, baseSavedCount: 0, savedCount: detailPeopleCount(nextSavedBy), savedBy: nextSavedBy });
              detailSetSavedFeedItem(activeDetailCard, activeDetailDetails, active);
              if (active) detailNotifyOwnerAction("save", (label) => currentUserDisplayName() + " saved your " + label + ".");
            });
          }
          if (productComment && productCommentInput) {
            productComment.addEventListener("click", () => {
              if (productComments && productComments.hidden) productComments.hidden = false;
              const label = modal.classList.contains("is-article") ? "article" : modal.classList.contains("is-post") ? "post" : "product";
              productSectionScroll(productComments, productCommentInput, "Public comments opened for this " + label + ".");
            });
          }
          if (productCommentSend) {
            productCommentSend.addEventListener("click", () => {
              const commentValue = productCommentInput ? productCommentInput.value.trim() : "";
              if (commentValue) {
                if (detailSubmitCommentToSource(commentValue)) {
                  if (productCommentInput) productCommentInput.value = "";
                  setProductFeedback("Public comment added.");
                  return;
                }
                const count = readEngagementCount(productCommentCount);
                const nextCount = count + 1;
                if (productCommentCount) setEngagementCountText(productCommentCount, nextCount);
                if (productCommentTotal) productCommentTotal.textContent = formatEngagementCount(nextCount) + (nextCount === 1 ? " comment" : " comments");
                if (productCommentList) {
                  const commentCreatedAt = new Date().toISOString();
                  const actor = detailCurrentPersonSnapshot();
                  productCommentList.insertAdjacentHTML("beforeend", renderProductComment({ id: "comment-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7), initial: currentUserInitial(), author: cleanText(actor && actor.name) || currentUserDisplayName(), name: cleanText(actor && actor.name) || currentUserDisplayName(), text: commentValue, likes: 0, dislikes: 0, mine: true, own: true, role: cleanText(actor && actor.role), actorType: cleanText(actor && actor.role), key: cleanText(actor && actor.key), email: cleanText(actor && actor.email), photo: cleanText(actor && actor.photo), photoRef: cleanText(actor && actor.photoRef), href: cleanText(actor && actor.href), createdAt: commentCreatedAt, at: commentCreatedAt }));
                  productCommentList.scrollTop = productCommentList.scrollHeight;
                }
                detailCommitModalComments("");
                productCommentInput.value = "";
                if (modal.classList.contains("is-post") || modal.classList.contains("is-product") || modal.classList.contains("is-article")) {
                  const label = modal.classList.contains("is-product") ? "product" : modal.classList.contains("is-article") ? "article" : "post";
                  notifyPostOwner("comment", currentUserDisplayName() + " commented on your " + label + ": " + cleanText(commentValue));
                }
                setProductFeedback("Public comment added.");
              } else {
                setProductFeedback("Type a question before posting.");
              }
            });
          }
          if (productCommentList) {
            productCommentList.addEventListener("click", (event) => {
              const likeButton = event.target.closest("[data-item-product-comment-like]");
              const dislikeButton = event.target.closest("[data-item-product-comment-dislike]");
              const editButton = event.target.closest("[data-item-product-comment-edit]");
              const deleteButton = event.target.closest("[data-item-product-comment-delete]");
              const saveEditButton = event.target.closest("[data-item-product-comment-save-edit]");
              const cancelEditButton = event.target.closest("[data-item-product-comment-cancel-edit]");
              const replyButton = event.target.closest("[data-item-product-comment-reply]");
              const row = event.target.closest("[data-item-product-comment-reply-row], [data-item-product-comment-row]");
              if (replyButton && row) {
                const form = row.querySelector("[data-item-product-comment-reply-form]");
                if (form) {
                  form.hidden = !form.hidden;
                  if (!form.hidden) {
                    const input = form.querySelector("input");
                    if (input) {
                      input.focus();
                      if (window.emyFocusEmojiTarget) window.emyFocusEmojiTarget(input);
                    }
                  }
                }
                return;
              }
              if (deleteButton && row && row.dataset.ownComment === "true") {
                const isReplyRow = row.hasAttribute("data-item-product-comment-reply-row");
                row.remove();
                if (!isReplyRow) {
                  const current = readEngagementCount(productCommentCount);
                  const nextCount = Math.max(0, current - 1);
                  if (productCommentCount) setEngagementCountText(productCommentCount, nextCount);
                  if (productCommentTotal) productCommentTotal.textContent = formatEngagementCount(nextCount) + (nextCount === 1 ? " comment" : " comments");
                }
                detailCommitModalComments(isReplyRow ? "Reply deleted." : "Public comment deleted.");
                detailNotifyOwnerAction(isReplyRow ? "reply-delete" : "comment-delete", (label) => currentUserDisplayName() + " deleted " + (isReplyRow ? "a reply" : "a comment") + " on your " + label + ".");
                return;
              }
              if (editButton && row && row.dataset.ownComment === "true") {
                const text = row.querySelector("[data-item-product-comment-text]");
                const actions = row.querySelector(".item-product-comment-actions");
                if (!text || !actions || row.dataset.editing === "true") return;
                row.dataset.editing = "true";
                row.dataset.originalText = text.textContent || "";
                text.innerHTML = '<input class="item-product-comment-edit-field" data-item-product-comment-edit-field value="' + escapeDetail(row.dataset.originalText || "") + '" aria-label="Edit comment" />';
                actions.querySelectorAll("[data-item-product-comment-edit], [data-item-product-comment-delete]").forEach((button) => button.hidden = true);
                actions.insertAdjacentHTML("beforeend", '<button class="item-product-comment-save-edit" type="button" data-item-product-comment-save-edit aria-label="Save edit" title="Save">' + actionIcon("save") + '</button><button class="item-product-comment-cancel-edit" type="button" data-item-product-comment-cancel-edit aria-label="Cancel edit" title="Cancel">' + actionIcon("cancel") + '</button>');
                const field = row.querySelector("[data-item-product-comment-edit-field]");
                if (field) field.focus();
                return;
              }
              if (saveEditButton && row && row.dataset.ownComment === "true") {
                const field = row.querySelector("[data-item-product-comment-edit-field]");
                const text = row.querySelector("[data-item-product-comment-text]");
                const value = field ? field.value.trim() : "";
                if (!value) {
                  if (field) field.focus();
                  return;
                }
                if (text) text.textContent = value;
                delete row.dataset.editing;
                delete row.dataset.originalText;
                row.querySelectorAll("[data-item-product-comment-save-edit], [data-item-product-comment-cancel-edit]").forEach((button) => button.remove());
                row.querySelectorAll("[data-item-product-comment-edit], [data-item-product-comment-delete]").forEach((button) => button.hidden = false);
                detailCommitModalComments("Public comment updated.");
                detailNotifyOwnerAction(row.hasAttribute("data-item-product-comment-reply-row") ? "reply-edit" : "comment-edit", (label) => currentUserDisplayName() + " edited " + (row.hasAttribute("data-item-product-comment-reply-row") ? "a reply" : "a comment") + " on your " + label + ".");
                return;
              }
              if (cancelEditButton && row && row.dataset.ownComment === "true") {
                const text = row.querySelector("[data-item-product-comment-text]");
                if (text) text.textContent = row.dataset.originalText || "";
                delete row.dataset.editing;
                delete row.dataset.originalText;
                row.querySelectorAll("[data-item-product-comment-save-edit], [data-item-product-comment-cancel-edit]").forEach((button) => button.remove());
                row.querySelectorAll("[data-item-product-comment-edit], [data-item-product-comment-delete]").forEach((button) => button.hidden = false);
                return;
              }
              if (dislikeButton) {
                const countNode = dislikeButton.querySelector("[data-item-product-comment-dislike-count]");
                const labelNode = dislikeButton.querySelector("[data-item-product-comment-dislike-label]");
                const active = !dislikeButton.classList.contains("is-active");
                const count = readEngagementCount(countNode);
                const nextCount = Math.max(0, count + (active ? 1 : -1));
                dislikeButton.classList.toggle("is-active", active);
                dislikeButton.setAttribute("aria-pressed", active ? "true" : "false");
                if (countNode) setEngagementCountText(countNode, nextCount);
                if (labelNode) labelNode.textContent = nextCount === 1 ? "dislike" : "dislikes";
                const rowLike = row && row.querySelector("[data-item-product-comment-like]");
                if (active && rowLike && rowLike.classList.contains("is-active")) {
                  const likeCountNode = rowLike.querySelector("[data-item-product-comment-like-count]");
                  const likeLabelNode = rowLike.querySelector("[data-item-product-comment-like-label]");
                  const likeCount = readEngagementCount(likeCountNode);
                  const nextLikeCount = Math.max(0, likeCount - 1);
                  rowLike.classList.remove("is-active");
                  rowLike.setAttribute("aria-pressed", "false");
                  if (likeCountNode) setEngagementCountText(likeCountNode, nextLikeCount);
                  if (likeLabelNode) likeLabelNode.textContent = nextLikeCount === 1 ? "like" : "likes";
                }
                if (active) detailNotifyOwnerAction("comment-dislike", (label) => currentUserDisplayName() + " disliked a comment on your " + label + ".");
                detailCommitModalComments(active ? "Public comment disliked." : "Public comment dislike removed.");
                return;
              }
              if (!likeButton) return;
              const countNode = likeButton.querySelector("[data-item-product-comment-like-count]");
              const labelNode = likeButton.querySelector("[data-item-product-comment-like-label]");
              const active = !likeButton.classList.contains("is-active");
              const count = readEngagementCount(countNode);
              const nextCount = Math.max(0, count + (active ? 1 : -1));
              likeButton.classList.toggle("is-active", active);
              likeButton.setAttribute("aria-pressed", active ? "true" : "false");
              if (countNode) setEngagementCountText(countNode, nextCount);
              if (labelNode) labelNode.textContent = nextCount === 1 ? "like" : "likes";
              const rowDislike = row && row.querySelector("[data-item-product-comment-dislike]");
              if (active && rowDislike && rowDislike.classList.contains("is-active")) {
                const dislikeCountNode = rowDislike.querySelector("[data-item-product-comment-dislike-count]");
                const dislikeLabelNode = rowDislike.querySelector("[data-item-product-comment-dislike-label]");
                const dislikeCount = readEngagementCount(dislikeCountNode);
                const nextDislikeCount = Math.max(0, dislikeCount - 1);
                rowDislike.classList.remove("is-active");
                rowDislike.setAttribute("aria-pressed", "false");
                if (dislikeCountNode) setEngagementCountText(dislikeCountNode, nextDislikeCount);
                if (dislikeLabelNode) dislikeLabelNode.textContent = nextDislikeCount === 1 ? "dislike" : "dislikes";
              }
              if (active) detailNotifyOwnerAction("comment-like", (label) => currentUserDisplayName() + " liked a comment on your " + label + ".");
              detailCommitModalComments(active ? "Public comment liked." : "Public comment like removed.");
            });
            productCommentList.addEventListener("submit", (event) => {
              const replyForm = event.target.closest("[data-item-product-comment-reply-form]");
              if (!replyForm) return;
              event.preventDefault();
              const input = replyForm.querySelector("input");
              const value = cleanText(input && input.value);
              if (!value) {
                if (input) {
                  input.focus();
                  if (window.emyFocusEmojiTarget) window.emyFocusEmojiTarget(input);
                }
                return;
              }
              const row = replyForm.closest("[data-item-product-comment-row]");
              const replies = row && row.querySelector("[data-item-product-comment-replies]");
              const replyNow = new Date().toISOString();
              const actor = detailCurrentPersonSnapshot();
              const replyPayload = {
                id: "reply-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
                name: cleanText(actor && actor.name) || currentUserDisplayName(),
                text: value,
                own: true,
                mine: true,
                role: cleanText(actor && actor.role),
                actorType: cleanText(actor && actor.role),
                key: cleanText(actor && actor.key),
                email: cleanText(actor && actor.email),
                photo: cleanText(actor && actor.photo),
                photoRef: cleanText(actor && actor.photoRef),
                href: cleanText(actor && actor.href),
                createdAt: replyNow,
                at: replyNow
              };
              if (replies) replies.insertAdjacentHTML("beforeend", renderProductCommentReply(replyPayload));
              if (input) input.value = "";
              replyForm.hidden = true;
              detailNotifyOwnerAction("reply", (label) => currentUserDisplayName() + " replied to a comment on your " + label + ".");
              detailCommitModalComments("Reply added.");
            });
          }
          if (productCommentInput && productCommentSend) {
            productCommentInput.addEventListener("keydown", (event) => {
              if (event.key !== "Enter") return;
              event.preventDefault();
              productCommentSend.click();
            });
          }
          if (productChatSend) {
            productChatSend.addEventListener("click", () => {
              const message = productChatInput && productChatInput.value.trim();
              if (!message) {
                productSectionScroll(productChatSection, productChatInput, "Type a message before sending.");
                return;
              }
              if (productChatThread) {
                const ref = attachCurrentItemToChat && activeChatItemContext ? Object.assign({}, activeChatItemContext) : null;
                const chatMessage = detailCreateChatMessage(message, ref);
                productChatThread.insertAdjacentHTML("beforeend", renderProductChatMessage(chatMessage));
                const sentMessage = productChatThread.querySelector("[data-item-product-chat-message]:last-child");
                if (sentMessage && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(sentMessage);
                productChatThread.scrollTop = productChatThread.scrollHeight;
                syncBusinessChatThread();
                detailNotifyChatCounterpart(chatMessage, ref);
              }
              productChatInput.value = "";
              setProductFeedback("Message sent.");
            });
          }
          if (productChatAttach) {
            productChatAttach.addEventListener("click", () => {
              attachCurrentItemToChat = !attachCurrentItemToChat;
              productChatAttach.classList.toggle("is-active", attachCurrentItemToChat);
              productChatAttach.setAttribute("aria-pressed", attachCurrentItemToChat ? "true" : "false");
              renderChatAttachPreview();
              setProductFeedback(attachCurrentItemToChat ? "This item will be shared with your next chat message." : "Item removed from the next chat message.");
              if (productChatInput) productChatInput.focus();
            });
          }
          if (productChatThread) {
            productChatThread.addEventListener("click", (event) => {
              const likeButton = event.target.closest("[data-item-product-chat-like]");
              const editButton = event.target.closest("[data-item-product-chat-edit]");
              const deleteButton = event.target.closest("[data-item-product-chat-delete]");
              const saveButton = event.target.closest("[data-item-product-chat-save-edit]");
              const cancelButton = event.target.closest("[data-item-product-chat-cancel-edit]");
              const message = event.target.closest("[data-item-product-chat-message]");
              if (deleteButton && message && message.dataset.ownChat === "true") {
                message.remove();
                syncBusinessChatThread();
                setProductFeedback("Chat message deleted.");
                return;
              }
              if (editButton && message && message.dataset.ownChat === "true") {
                const text = message.querySelector("[data-item-product-chat-text]");
                const actions = message.querySelector(".item-product-chat-actions");
                if (!text || !actions || message.dataset.editing === "true") return;
                message.dataset.editing = "true";
                message.dataset.originalText = text.textContent || "";
                text.innerHTML = '<input class="item-product-chat-edit-field" data-item-product-chat-edit-field value="' + escapeDetail(message.dataset.originalText || "") + '" aria-label="Edit chat message" />';
                actions.querySelectorAll("[data-item-product-chat-edit], [data-item-product-chat-delete]").forEach((button) => button.hidden = true);
                actions.insertAdjacentHTML("beforeend", '<button class="item-product-chat-action" type="button" data-item-product-chat-save-edit aria-label="Save edit" title="Save">' + actionIcon("save") + '</button><button class="item-product-chat-action" type="button" data-item-product-chat-cancel-edit aria-label="Cancel edit" title="Cancel">' + actionIcon("cancel") + '</button>');
                const field = message.querySelector("[data-item-product-chat-edit-field]");
                if (field) field.focus();
                return;
              }
              if (saveButton && message && message.dataset.ownChat === "true") {
                const field = message.querySelector("[data-item-product-chat-edit-field]");
                const text = message.querySelector("[data-item-product-chat-text]");
                const value = field ? field.value.trim() : "";
                if (!value) {
                  if (field) field.focus();
                  return;
                }
                if (text) text.textContent = value;
                delete message.dataset.editing;
                delete message.dataset.originalText;
                message.querySelectorAll("[data-item-product-chat-save-edit], [data-item-product-chat-cancel-edit]").forEach((button) => button.remove());
                message.querySelectorAll("[data-item-product-chat-edit], [data-item-product-chat-delete]").forEach((button) => button.hidden = false);
                syncBusinessChatThread();
                setProductFeedback("Chat message updated.");
                return;
              }
              if (cancelButton && message && message.dataset.ownChat === "true") {
                const text = message.querySelector("[data-item-product-chat-text]");
                if (text) text.textContent = message.dataset.originalText || "";
                delete message.dataset.editing;
                delete message.dataset.originalText;
                message.querySelectorAll("[data-item-product-chat-save-edit], [data-item-product-chat-cancel-edit]").forEach((button) => button.remove());
                message.querySelectorAll("[data-item-product-chat-edit], [data-item-product-chat-delete]").forEach((button) => button.hidden = false);
                return;
              }
              if (!likeButton) return;
              const countNode = likeButton.querySelector("[data-item-product-chat-like-count]");
              const labelNode = likeButton.querySelector("[data-item-product-chat-like-label]");
              const active = !likeButton.classList.contains("is-active");
              const count = readEngagementCount(countNode);
              const nextCount = Math.max(0, count + (active ? 1 : -1));
              likeButton.classList.toggle("is-active", active);
              likeButton.setAttribute("aria-pressed", active ? "true" : "false");
              if (countNode) setEngagementCountText(countNode, nextCount);
              if (labelNode) labelNode.textContent = nextCount === 1 ? "like" : "likes";
              syncBusinessChatThread();
              setProductFeedback(active ? "Chat message liked." : "Chat message like removed.");
            });
          }
          if (productChatInput && productChatSend) {
            productChatInput.addEventListener("keydown", (event) => {
              if (event.key !== "Enter") return;
              event.preventDefault();
              productChatSend.click();
            });
          }
          if (productShare) {
            productShare.addEventListener("click", () => {
              if (detailDispatchSourceAction("share")) return;
              const shareText = title && title.textContent ? title.textContent : document.title;
              const recordShare = () => detailRecordOwnerEngagementAction("share", true, false, { beforeCounts: detailCountsFromCard(activeDetailCard, activeDetailDetails || detailsFromCard(activeDetailCard)) });
              if (navigator.share) {
                navigator.share({ title: shareText, url: window.location.href }).then(() => { recordShare(); setProductFeedback("Share sheet opened."); }).catch(() => {});
                return;
              }
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(window.location.href).then(() => { recordShare(); setProductFeedback("Product link copied."); });
                return;
              }
              recordShare();
              setProductFeedback("Share this product from the business profile.");
            });
          }
          makeCardsFocusable(document);
          bindDirectFeedEngagementTracking();
          setupVideoDurationBadges(document);
          setupBusinessCustomerBadges(document);
          setupBusinessLikeBadges(document);
          syncAllClipViewCounts(document);
          window.addEventListener("emy:clip-view-stats-changed", () => syncAllClipViewCounts(document));
          window.addEventListener("storage", (event) => {
            if (!event || event.key === "emyClipViewStats") syncAllClipViewCounts(document);
            if (!event || event.key === "emyCustomerBusinesses" || event.key === "emyBusinessLikeState" || String(event.key || "").indexOf("emyCustomerBusiness:") === 0) {
              setupBusinessCustomerBadges(document);
              setupBusinessLikeBadges(document);
            }
          });
          if ("MutationObserver" in window) {
            const observer = new MutationObserver((records) => {
              records.forEach((record) => record.addedNodes.forEach((node) => {
                if (node && node.nodeType === 1) {
                  makeCardsFocusable(node);
                  setupVideoDurationBadges(node);
                  setupBusinessCustomerBadges(node);
                  setupBusinessLikeBadges(node);
                  syncAllClipViewCounts(node);
                }
              }));
            });
            observer.observe(document.body, { childList: true, subtree: true });
          }
          window.emyDetailFeedStateForCard = detailFeedStateForCard;
          window.emyDetailCommentsForCard = detailCommentsForCard;
        })();

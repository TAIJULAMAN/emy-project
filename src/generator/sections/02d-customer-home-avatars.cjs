/* restored from backup */
function patchLockedCustomerHomeAccountMediaSeparation(html) {
  let next = String(html || '');
  next = next.replace(
    /        function activeProfileRole\(\) \{\s*const signedRole = String\(localStorage\.getItem\("emyMainSignedInRole"\) \|\| ""\)\.toLowerCase\(\);\s*if \(signedRole === "business" \|\| signedRole === "customer"\) return signedRole;\s*if \(localStorage\.getItem\("emyMainSignedOut"\) === "1"\) return "";\s*const pendingRole = String\(localStorage\.getItem\("emyMainPendingSignupRole"\) \|\| ""\)\.toLowerCase\(\);\s*return pendingRole === "business" \|\| pendingRole === "customer" \? pendingRole : "";\s*\}/g,
    String.raw`        function activeProfileRole() {
          try {
            const path = String(window.location.pathname || "").toLowerCase();
            if (/emy-customer-/i.test(path)) return "customer";
            if (/emy-business-profile\.html/i.test(path)) return "business";
          } catch (error) {}
          const signedRole = String(localStorage.getItem("emyMainSignedInRole") || "").toLowerCase();
          if (signedRole === "business" || signedRole === "customer") return signedRole;
          if (localStorage.getItem("emyMainSignedOut") === "1") return "";
          const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          return pendingRole === "business" || pendingRole === "customer" ? pendingRole : "";
        }`
  );
  next = next.replace(
    /        function customerPendingSignupCrop\(fallback\) \{\s*const pendingRole = String\(localStorage\.getItem\("emyMainPendingSignupRole"\) \|\| ""\)\.toLowerCase\(\);\s*return pendingRole === "customer" \? \(localStorage\.getItem\("emyMainPendingSignupPhotoCrop"\) \|\| ""\) : fallback;\s*\}\s*        function readActiveProfilePhoto\(\) \{/g,
    String.raw`        function customerPendingSignupCrop(fallback) {
          const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          return pendingRole === "customer" ? (localStorage.getItem("emyMainPendingSignupPhotoCrop") || "") : fallback;
        }
        function lockedAccountCustomerMediaSet() {
          return new Set([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef")
          ].map((value) => String(value || "").trim()).filter(Boolean));
        }
        function lockedAccountBusinessOnlyMedia(values) {
          const customerMedia = lockedAccountCustomerMediaSet();
          return (Array.isArray(values) ? values : []).map((value) => String(value || "").trim()).find((value) => value && !customerMedia.has(value)) || "";
        }
        function readActiveProfilePhoto() {`
  );
  next = next
    .replace(
      /const businessPhoto = localStorage\.getItem\("emyBusinessProfilePhoto"\) \|\| businessProfile\.profilePhoto \|\| businessProfile\.photo \|\| businessProfile\.avatar \|\| businessProfile\.logo \|\| "";/g,
      'const businessPhoto = lockedAccountBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), businessProfile.profilePhoto, businessProfile.profilePhotoSrc, businessProfile.photo, businessProfile.photoSrc]);'
    )
    .replace(
      /\? \(localStorage\.getItem\("emyBusinessProfilePhotoRef"\) \|\| businessProfile\.profilePhotoRef \|\| businessProfile\.photoRef \|\| businessProfile\.avatarRef \|\| businessProfile\.logoRef \|\| ""\)/g,
      '? lockedAccountBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), businessProfile.profilePhotoRef, businessProfile.photoRef])'
    );
  next = next.replace(
    /        function nearbyRealPhoto\(item\) \{\s*return nearbyRealFirst\(\[[^\]]*\]\);\s*\}\s*function nearbyRealPhotoRef\(item\) \{\s*return nearbyRealFirst\(\[[^\]]*\]\);\s*\}/g,
    String.raw`        function nearbyRealPhoto(item) {
          return nearbyRealFirst([
            item && item.avatarSrc,
            item && item.avatar,
            item && item.profilePhoto,
            item && item.profilePhotoSrc,
            item && item.businessProfilePhoto,
            item && item.businessProfilePhotoSrc,
            item && item.businessPhoto,
            item && item.businessPhotoSrc,
            item && item.businessAvatar,
            item && item.businessAvatarSrc,
            item && item.businessLogo,
            item && item.businessLogoSrc,
            item && item.logo,
            item && item.logoSrc,
            item && item.photoUrl,
            item && item.photo,
            item && item.photoSrc,
            item && item.image,
            item && item.imageSrc
          ]);
        }
        function nearbyRealPhotoRef(item) {
          return nearbyRealFirst([
            item && item.avatarRef,
            item && item.avatarPublicId,
            item && item.profilePhotoRef,
            item && item.profilePhotoPublicId,
            item && item.businessProfilePhotoRef,
            item && item.businessProfilePhotoPublicId,
            item && item.businessPhotoRef,
            item && item.businessPhotoPublicId,
            item && item.businessAvatarRef,
            item && item.businessAvatarPublicId,
            item && item.businessLogoRef,
            item && item.businessLogoPublicId,
            item && item.logoRef,
            item && item.logoPublicId,
            item && item.photoPublicId,
            item && item.photoRef,
            item && item.imagePublicId,
            item && item.imageRef
          ]);
        }
        function nearbyRealCustomerMediaSet() {
          return new Set([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef")
          ].map((value) => nearbyRealClean(value)).filter(Boolean));
        }
        function nearbyRealBusinessOnlyMedia(values) {
          const customerMedia = nearbyRealCustomerMediaSet();
          return (Array.isArray(values) ? values : []).map((value) => nearbyRealClean(value)).find((value) => value && !customerMedia.has(value)) || "";
        }`
  );
  next = next
    .replace(
      /photo: localStorage\.getItem\("emyBusinessProfilePhoto"\) \|\| nearbyRealFirst\(\[profile\.photo, profile\.profilePhoto, profile\.businessPhoto, profile\.avatar, profile\.avatarSrc, profile\.logo, profile\.image\]\),/g,
      'photo: nearbyRealBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyBusinessProfileImage"), localStorage.getItem("emyBusinessProfileImageSrc"), localStorage.getItem("emyBusinessPhoto"), localStorage.getItem("emyBusinessPhotoSrc"), localStorage.getItem("emyBusinessAvatar"), localStorage.getItem("emyBusinessAvatarSrc"), localStorage.getItem("emyBusinessLogo"), localStorage.getItem("emyBusinessLogoSrc"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), profile.photoUrl, profile.profilePhotoUrl, profile.photo, profile.photoSrc, profile.profilePhoto, profile.profilePhotoSrc, profile.businessProfilePhoto, profile.businessProfilePhotoSrc, profile.businessPhoto, profile.businessPhotoSrc, profile.businessAvatar, profile.businessAvatarSrc, profile.businessLogo, profile.businessLogoSrc, profile.logo, profile.logoSrc, profile.image, profile.imageSrc]),'
    )
    .replace(
      /photoRef: localStorage\.getItem\("emyBusinessProfilePhotoRef"\) \|\| nearbyRealFirst\(\[profile\.photoRef, profile\.profilePhotoRef, profile\.businessPhotoRef, profile\.avatarRef, profile\.businessAvatarRef, profile\.logoRef, profile\.imageRef\]\),/g,
      'photoRef: nearbyRealBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyBusinessProfileImageRef"), localStorage.getItem("emyBusinessPhotoRef"), localStorage.getItem("emyBusinessAvatarRef"), localStorage.getItem("emyBusinessLogoRef"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), profile.photoPublicId, profile.profilePhotoPublicId, profile.photoRef, profile.profilePhotoRef, profile.businessProfilePhotoPublicId, profile.businessProfilePhotoRef, profile.businessPhotoPublicId, profile.businessPhotoRef, profile.businessAvatarPublicId, profile.businessAvatarRef, profile.businessLogoPublicId, profile.businessLogoRef, profile.logoPublicId, profile.logoRef, profile.imagePublicId, profile.imageRef]),'
    );
  next = next.replace(
    /        function annexedCurrentBusinessPhoto\(\) \{\s*return localStorage\.getItem\("emyBusinessProfilePhoto"\) \|\| "";\s*\}/g,
    String.raw`        function annexedCustomerProfileMediaSet() {
          return new Set([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef")
          ].map((value) => String(value || "").trim()).filter(Boolean));
        }
        function annexedBusinessOnlyMedia(values) {
          const customerMedia = annexedCustomerProfileMediaSet();
          return (Array.isArray(values) ? values : []).map((value) => String(value || "").trim()).find((value) => value && !customerMedia.has(value) && !annexedLooksContentMediaValue(value)) || "";
        }
        function annexedLooksContentMediaValue(value) {
          const text = String(value || "").trim().toLowerCase();
          if (!text) return false;
          return /(?:^|[\/:_-])(?:business-product|product-reel|product-image|main-image|business-cover|clip-media|clip-video|clip-image|feed-media|post-media|reel-media|created-clip|created-post|feed-created)(?:[\/:_-]|$)/i.test(text);
        }
        function annexedCurrentBusinessPhoto() {
          const draft = annexedBusinessDraft();
          return annexedBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), draft.photo, draft.profilePhoto, draft.photoSrc, draft.profilePhotoSrc]);
        }`
  );
  return next;
}
function patchCustomerHomeNearbyAvatarMedia(html) {
  let next = String(html || '');
  const broadNearbyPhotoHelpers = String.raw`        function nearbyRealPhoto(item) {
          return nearbyRealFirst([
            item && item.avatarSrc,
            item && item.avatar,
            item && item.profilePhoto,
            item && item.profilePhotoSrc,
            item && item.businessProfilePhoto,
            item && item.businessProfilePhotoSrc,
            item && item.businessPhoto,
            item && item.businessPhotoSrc,
            item && item.businessAvatar,
            item && item.businessAvatarSrc,
            item && item.businessLogo,
            item && item.businessLogoSrc,
            item && item.logo,
            item && item.logoSrc,
            item && item.photoUrl,
            item && item.photo,
            item && item.photoSrc,
            item && item.image,
            item && item.imageSrc
          ]);
        }
        function nearbyRealPhotoRef(item) {
          return nearbyRealFirst([
            item && item.avatarRef,
            item && item.avatarPublicId,
            item && item.profilePhotoRef,
            item && item.profilePhotoPublicId,
            item && item.businessProfilePhotoRef,
            item && item.businessProfilePhotoPublicId,
            item && item.businessPhotoRef,
            item && item.businessPhotoPublicId,
            item && item.businessAvatarRef,
            item && item.businessAvatarPublicId,
            item && item.businessLogoRef,
            item && item.businessLogoPublicId,
            item && item.logoRef,
            item && item.logoPublicId,
            item && item.photoPublicId,
            item && item.photoRef,
            item && item.imagePublicId,
            item && item.imageRef
          ]);
        }`;
  next = next.replace(
    /        function nearbyRealPhoto\(item\) \{\s*return nearbyRealFirst\(\[[^\]]*\]\);\s*\}\s*function nearbyRealPhotoRef\(item\) \{\s*return nearbyRealFirst\(\[[^\]]*\]\);\s*\}/g,
    broadNearbyPhotoHelpers
  );
  next = next
    .replace(
      /photo: nearbyRealBusinessOnlyMedia\(\[[^\]]*?emyBusinessProfilePhoto[^\]]*?\]\),/g,
      'photo: nearbyRealBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyBusinessProfileImage"), localStorage.getItem("emyBusinessProfileImageSrc"), localStorage.getItem("emyBusinessPhoto"), localStorage.getItem("emyBusinessPhotoSrc"), localStorage.getItem("emyBusinessAvatar"), localStorage.getItem("emyBusinessAvatarSrc"), localStorage.getItem("emyBusinessLogo"), localStorage.getItem("emyBusinessLogoSrc"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), profile.photoUrl, profile.profilePhotoUrl, profile.photo, profile.photoSrc, profile.profilePhoto, profile.profilePhotoSrc, profile.businessProfilePhoto, profile.businessProfilePhotoSrc, profile.businessPhoto, profile.businessPhotoSrc, profile.businessAvatar, profile.businessAvatarSrc, profile.businessLogo, profile.businessLogoSrc, profile.logo, profile.logoSrc, profile.image, profile.imageSrc]),'
    )
    .replace(
      /photoRef: nearbyRealBusinessOnlyMedia\(\[[^\]]*?emyBusinessProfilePhotoRef[^\]]*?\]\),/g,
      'photoRef: nearbyRealBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyBusinessProfileImageRef"), localStorage.getItem("emyBusinessPhotoRef"), localStorage.getItem("emyBusinessAvatarRef"), localStorage.getItem("emyBusinessLogoRef"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), profile.photoPublicId, profile.profilePhotoPublicId, profile.photoRef, profile.profilePhotoRef, profile.businessProfilePhotoPublicId, profile.businessProfilePhotoRef, profile.businessPhotoPublicId, profile.businessPhotoRef, profile.businessAvatarPublicId, profile.businessAvatarRef, profile.businessLogoPublicId, profile.businessLogoRef, profile.logoPublicId, profile.logoRef, profile.imagePublicId, profile.imageRef]),'
    );
  return next;
}
function patchLockedCustomerHomeBusinessAvatarSeparation(html) {
  let next = String(html || '');
  if (!next.includes('function firstBusinessAvatarImageValue(values)')) {
    next = next.replace(
      /(        function firstAvatarImageValue\(values\) \{\s*for \(const value of values\) \{\s*const next = avatarImageValue\(value\);\s*if \(next\) return next;\s*\}\s*return "";\s*\}\s*)function currentCustomerIdentitySlugs\(\) \{/,
      `$1        function mediaCompareValue(value) {
          return avatarImageValue(value).replace(/[?#].*$/, "");
        }
        function mediaValuesMatch(left, right) {
          const a = mediaCompareValue(left);
          const b = mediaCompareValue(right);
          if (!a || !b) return false;
          if (a === b) return true;
          return a.length > 12 && b.length > 12 && (a.indexOf(b) >= 0 || b.indexOf(a) >= 0);
        }
        function currentCustomerMediaValues() {
          return [
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef"),
            currentCustomerPhoto(),
            currentCustomerPhotoRef()
          ].map(avatarImageValue).filter(Boolean);
        }
        function isCurrentCustomerMedia(value) {
          const next = avatarImageValue(value);
          return !!next && currentCustomerMediaValues().some((customerValue) => mediaValuesMatch(next, customerValue));
        }
        function firstBusinessAvatarImageValue(values) {
          for (const value of values) {
            const next = avatarImageValue(value);
            if (next && !isCurrentCustomerMedia(next)) return next;
          }
          return "";
        }
        function currentCustomerIdentitySlugs() {`
    );
  }
  next = next
    .replace(
      /return firstAvatarImageValue\(\[\s*localStorage\.getItem\("emyBusinessProfilePhoto"\),/g,
      'return firstBusinessAvatarImageValue([\n            localStorage.getItem("emyBusinessProfilePhoto"),'
    )
    .replace(
      /return firstAvatarImageValue\(\[\s*localStorage\.getItem\("emyBusinessProfilePhotoRef"\),/g,
      'return firstBusinessAvatarImageValue([\n            localStorage.getItem("emyBusinessProfilePhotoRef"),'
    );
  if (!next.includes('function itemBusinessPhoto(item)')) {
    next = next.replace(
      /(        function itemPhotoRef\(item\) \{\s*return firstAvatarImageValue\(\[[\s\S]*?\]\);\s*\}\s*)function activityBusinessPhoto\(item, row, businessKey, businessName\) \{/,
      `$1        function itemBusinessPhoto(item) {
          const profilePhoto = firstBusinessAvatarImageValue([
            item && item.businessPhoto,
            item && item.businessPhotoSrc,
            item && item.businessProfilePhoto,
            item && item.businessProfilePhotoSrc,
            item && item.businessAvatar,
            item && item.businessAvatarSrc,
            item && item.businessLogo,
            item && item.businessLogoSrc,
            item && item.logo,
            item && item.logoSrc,
            item && item.profilePhoto,
            item && item.profilePhotoSrc,
            item && item.avatarSrc,
            item && item.avatar
          ]);
          if (profilePhoto) return profilePhoto;
          return itemLooksLikeContent(item) ? "" : firstBusinessAvatarImageValue([item && item.photo, item && item.photoSrc, item && item.image, item && item.imageSrc]);
        }
        function itemBusinessPhotoRef(item) {
          return firstBusinessAvatarImageValue([
            item && item.businessPhotoRef,
            item && item.businessPhotoPublicId,
            item && item.businessProfilePhotoRef,
            item && item.businessProfilePhotoPublicId,
            item && item.businessAvatarRef,
            item && item.businessAvatarPublicId,
            item && item.businessLogoRef,
            item && item.businessLogoPublicId,
            item && item.logoRef,
            item && item.logoPublicId,
            item && item.profilePhotoRef,
            item && item.profilePhotoPublicId,
            item && item.avatarRef,
            item && item.avatarPublicId,
            item && !itemLooksLikeContent(item) ? item.photoRef : "",
            item && !itemLooksLikeContent(item) ? item.photoPublicId : "",
            item && !itemLooksLikeContent(item) ? item.imageRef : "",
            item && !itemLooksLikeContent(item) ? item.imagePublicId : ""
          ]);
        }
        function activityBusinessPhoto(item, row, businessKey, businessName) {`
    );
  }
  next = next
    .replace(
      /return firstAvatarImageValue\(\[\s*row && row\.photo,/g,
      'return firstBusinessAvatarImageValue([\n            row && row.photo,'
    )
    .replace(
      /return firstAvatarImageValue\(\[\s*row && row\.photoRef,/g,
      'return firstBusinessAvatarImageValue([\n            row && row.photoRef,'
    )
    .replace(
      /photo: existing\.photo \|\| itemPhoto\(item\) \|\| \(isCurrentBusiness\(key\) \|\| isCurrentBusiness\(name\) \? currentBusinessPhoto\(\) : ""\),/g,
      'photo: (isCurrentBusiness(key) || isCurrentBusiness(name) ? currentBusinessPhoto() : "") || existing.photo || itemBusinessPhoto(item),'
    )
    .replace(
      /photoRef: existing\.photoRef \|\| itemPhotoRef\(item\) \|\| \(isCurrentBusiness\(key\) \|\| isCurrentBusiness\(name\) \? currentBusinessPhotoRef\(\) : ""\),/g,
      'photoRef: (isCurrentBusiness(key) || isCurrentBusiness(name) ? currentBusinessPhotoRef() : "") || existing.photoRef || itemBusinessPhotoRef(item),'
    )
    .replace(
      /businessPhoto: itemPhoto\(item\) \|\| itemPhoto\(record\) \|\| business\.photo \|\| \(isCurrentBusiness\(businessKey\) \|\| isCurrentBusiness\(businessName\) \? currentBusinessPhoto\(\) : ""\),/g,
      'businessPhoto: (isCurrentBusiness(businessKey) || isCurrentBusiness(businessName) ? currentBusinessPhoto() : "") || itemBusinessPhoto(item) || itemBusinessPhoto(record) || business.photo,\n                businessPhotoRef: (isCurrentBusiness(businessKey) || isCurrentBusiness(businessName) ? currentBusinessPhotoRef() : "") || itemBusinessPhotoRef(item) || itemBusinessPhotoRef(record) || business.photoRef,'
    )
    .replace(
      /businessPhoto: itemPhoto\(item\) \|\| business\.photo \|\| \(isCurrentBusiness\(businessKey\) \|\| isCurrentBusiness\(businessName\) \? currentBusinessPhoto\(\) : ""\),/g,
      'businessPhoto: (isCurrentBusiness(businessKey) || isCurrentBusiness(businessName) ? currentBusinessPhoto() : "") || itemBusinessPhoto(item) || business.photo,\n                businessPhotoRef: (isCurrentBusiness(businessKey) || isCurrentBusiness(businessName) ? currentBusinessPhotoRef() : "") || itemBusinessPhotoRef(item) || business.photoRef,'
    )
    .replace(
      /function activityAvatarPhoto\(item\) \{\s*return firstAvatarImageValue\(\[item && item\.photo, businessAvatarForText\(item && \(item\.key \|\| item\.businessName\)\)\]\);\s*\}/g,
      'function activityAvatarPhoto(item) {\n          return firstBusinessAvatarImageValue([item && item.photo, businessAvatarForText(item && (item.key || item.businessName))]);\n        }'
    )
    .replace(
      /function activityAvatarPhotoRef\(item\) \{\s*return firstAvatarImageValue\(\[item && item\.photoRef, businessAvatarRefForText\(item && \(item\.key \|\| item\.businessName\)\)\]\);\s*\}/g,
      'function activityAvatarPhotoRef(item) {\n          return firstBusinessAvatarImageValue([item && item.photoRef, businessAvatarRefForText(item && (item.key || item.businessName))]);\n        }'
    );
  if (!next.includes("function isBusinessAccountAvatarTarget")) {
    next = next.replace(
      /function isCurrentCustomerAvatarTarget\(avatar, owner, ownerText\) \{\s*const profilePhoto = currentCustomerPhoto\(\);\s*const profilePhotoRef = currentCustomerPhotoRef\(\);\s*if \(!\(profilePhoto \|\| profilePhotoRef\)\) return false;/g,
      'function isBusinessAccountAvatarTarget(avatar, owner) {\n          return !!(\n            avatar && avatar.matches && avatar.matches("[data-business-top-avatar],.business-top-avatar") ||\n            owner && owner.matches && owner.matches(".business-topbar")\n          );\n        }\n        function isCurrentCustomerAvatarTarget(avatar, owner, ownerText) {\n          const profilePhoto = currentCustomerPhoto();\n          const profilePhotoRef = currentCustomerPhotoRef();\n          if (!(profilePhoto || profilePhotoRef)) return false;\n          if (isBusinessAccountAvatarTarget(avatar, owner)) return false;'
    );
  }
  next = next.replace(
    /const photo = isCustomerAvatar \? currentCustomerPhoto\(\) : direct\.src \|\| \(match && match\.photo \? match\.photo : currentBusinessIsRealProfile\(\) && isCurrentBusiness\(ownerText\) \? currentBusinessPhoto\(\) : ""\);\s*const photoRef = isCustomerAvatar \? currentCustomerPhotoRef\(\) : direct\.ref \|\| \(match && match\.photoRef \? match\.photoRef : currentBusinessIsRealProfile\(\) && isCurrentBusiness\(ownerText\) \? currentBusinessPhotoRef\(\) : ""\);/g,
    'const isBusinessAccountAvatar = isBusinessAccountAvatarTarget(avatar, owner);\n            const isCustomerAvatar = !isBusinessAccountAvatar && isCurrentCustomerAvatarTarget(avatar, owner, ownerText);\n            const directPhoto = firstBusinessAvatarImageValue([direct.src]);\n            const directPhotoRef = firstBusinessAvatarImageValue([direct.ref]);\n            const matchPhoto = firstBusinessAvatarImageValue([match && match.photo]);\n            const matchPhotoRef = firstBusinessAvatarImageValue([match && match.photoRef]);\n            const businessAccountPhoto = isBusinessAccountAvatar ? currentBusinessPhoto() : "";\n            const businessAccountPhotoRef = isBusinessAccountAvatar ? currentBusinessPhotoRef() : "";\n            const photo = isCustomerAvatar ? currentCustomerPhoto() : businessAccountPhoto || directPhoto || matchPhoto || (currentBusinessIsRealProfile() && isCurrentBusiness(ownerText) ? currentBusinessPhoto() : "");\n            const photoRef = isCustomerAvatar ? currentCustomerPhotoRef() : businessAccountPhotoRef || directPhotoRef || matchPhotoRef || (currentBusinessIsRealProfile() && isCurrentBusiness(ownerText) ? currentBusinessPhotoRef() : "");'
  );
  return next;
}
function patchLockedCustomerHomeSharedCustomerAvatarIdentity(html) {
  let next = String(html || '');
  next = next.replace(
    /const initial = name\.trim\(\)\.charAt\(0\)\.toUpperCase\(\) \|\| "S";/g,
    'const initial = (profileName || customerProfileNameFromStorage("Stephane")).trim().charAt(0).toUpperCase() || "S";'
  );
  return next;
}
function patchLockedCustomerHomeEmbeddedPreferenceRows(html) {
  let next = String(html || '');
  const preferenceGuard = `        function embeddedPreferenceOnlyContent(item, field) {
          if (!item || typeof item !== "object") return true;
          const label = firstClean([item.title, item.name, item.text, item.description]).toLowerCase();
          const preferenceLabel = /^(posts?|products?|clips?|reels?|offers?|updates?|activity|activities|feed|feeds?|latest updates?|news|items?)$/i.test(label);
          const hasContentIdentity = !!firstClean([item.id, item.productId, item.clipId, item.reelId, item.feedId, item.articleId, item.eventId, item.jobId]);
          const hasMedia = !!firstClean([item.mediaSrc, item.mediaRef, item.image, item.imageRef, item.video, item.videoRef, item.coverSrc, item.coverRef, item.thumbnailSrc, item.thumbnailRef, item.posterSrc, item.posterRef]) || (Array.isArray(item.mediaItems) && item.mediaItems.some((media) => media && (media.src || media.ref)));
          const hasSpecificContent = !!firstClean([item.productName, item.productTitle, item.clipTitle, item.articleBody, item.articleShare, item.eventName, item.eventWhen, item.jobTitle, item.priceText, item.price, item.amount]);
          const fieldLooksLikePreference = /^(updates|activity|activities|feed|feedItems|latestUpdates|news)$/i.test(field || "") && preferenceLabel;
          return (preferenceLabel || fieldLooksLikePreference) && !hasContentIdentity && !hasMedia && !hasSpecificContent;
        }`;
  next = next.replace(
    `        function asArray(value) {
          if (Array.isArray(value)) return value;
          if (value && typeof value === "object") return Object.values(value);
          if (typeof value === "string" && clean(value)) return [{ title: value, description: value }];
          return [];
        }`,
    `        function asArray(value) {
          if (Array.isArray(value)) return value;
          if (value && typeof value === "object") return Object.values(value);
          return [];
        }`
  );
  if (!next.includes('function embeddedPreferenceOnlyContent(item, field)')) {
    next = next.replace('        function embeddedContentValues(record, type) {', preferenceGuard + '\n        function embeddedContentValues(record, type) {');
  }
  next = next.replace(
    `              const value = item && typeof item === "object" ? item : { title: clean(item), description: clean(item) };
              rows.push(Object.assign({ __embeddedField: key }, value));`,
    `              if (!item || typeof item !== "object" || embeddedPreferenceOnlyContent(item, key)) return;
              rows.push(Object.assign({ __embeddedField: key }, item));`
  );
  next = next.replace(
    `            if (latest) rows.push({ title: latest, description: latest, __embeddedField: "latestUpdate" });`,
    `            if (latest && !embeddedPreferenceOnlyContent({ title: latest, description: latest }, "latestUpdate")) rows.push({ title: latest, description: latest, __embeddedField: "latestUpdate" });`
  );
  return next;
}
function patchLockedCustomerHomeCustomerBusinessAliases(html) {
  let next = String(html || '');
  next = next.replace(
    /const stored = \(\(\) => \{ try \{ return localStorage\.getItem\("emyCustomerBusiness:" \+ info\.key\) === "1"; \} catch \(error\) \{ return false; \} \}\)\(\);/g,
    'const stored = isCustomerBusinessKey(info.key, info.name);'
  );
  next = next.replace(
    /let isCustomerBusiness = false;\s*try \{\s*isCustomerBusiness = localStorage\.getItem\("emyCustomerBusiness:" \+ businessKey\) === "1";\s*\} catch \(error\) \{\}/g,
    'const isCustomerBusiness = isCustomerBusinessKey(businessKey, businessName);'
  );
  next = next.replace(
    /const active = localStorage\.getItem\("emyCustomerBusiness:" \+ key\) === "1";/g,
    'const active = isCustomerBusinessKey(key, slide && slide.dataset.clipBusinessName);'
  );
  next = next.replace(
    /function normaliseCustomerBusinessKey\(value\) \{\s*const key = cleanText\(value\)\.toLowerCase\(\);\s*if \(key\.includes\("angi-pizza"\)\) return "angi-pizza";\s*if \(key\.includes\("ever-glow"\)\) return "ever-glow";\s*if \(key\.includes\("ross-galler"\)\) return "ross-galler";\s*if \(key\.includes\("business-111"\)\) return "business-111";\s*return key;\s*\}/g,
    `function normaliseCustomerBusinessKey(value) {
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
          }`
  );
  next = next.replace(
    /function isCustomerBusinessKey\(key\) \{\s*const cleanKey = normaliseCustomerBusinessKey\(key\);\s*if \(!cleanKey\) return false;\s*try \{\s*if \(localStorage\.getItem\("emyCustomerBusiness:" \+ cleanKey\) === "1"\) return true;\s*const stored = JSON\.parse\(localStorage\.getItem\("emyCustomerBusinesses"\) \|\| "\{\}"\);\s*return Boolean\(stored && stored\[cleanKey\]\);\s*\} catch \(error\) \{\s*return false;\s*\}\s*\}/g,
    `function isCustomerBusinessKey(key, name) {
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
          }`
  );
  return next;
}

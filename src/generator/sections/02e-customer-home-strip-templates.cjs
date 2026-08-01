/* EMY customer home section: 02e-customer-home-strip-templates.cjs (lines 1081-1290) */
function applyCustomerHomeRuntimePatches(html) {
  let next = String(html || '');
  next = patchLockedCustomerHomeNotifications(next);
  next = patchLockedCustomerHomeAccountMediaSeparation(next);
  next = patchCustomerHomeNearbyAvatarMedia(next);
  next = patchLockedCustomerHomeBusinessAvatarSeparation(next);
  next = patchLockedCustomerHomeSharedCustomerAvatarIdentity(next);
  next = patchLockedCustomerHomeEmbeddedPreferenceRows(next);
  next = patchLockedCustomerHomeCustomerBusinessAliases(next);
  return next;
}

function stripCustomerHomeDemoTemplates(html) {
  let next = String(html || '');
  next = next
    .replace(/\n\s*<a class="my-business-row\b[\s\S]*?<\/a>/g, '')
    .replace(/\n\s*<a class="my-business-update\b[\s\S]*?<\/a>/g, '')
    .replace(/\n\s*<a class="nearby-map-pin\b[\s\S]*?<\/a>/g, '')
    .replace(/\n\s*<a class="nearby-business-row\b[\s\S]*?<\/a>/g, '')
    .replace(/\n\s*<article class="card product-card\b[\s\S]*?<\/article>/g, '')
    .replace(/\n\s*<article class="card post-card\b[\s\S]*?<\/article>/g, '')
    .replace(/\n\s*<article class="card reel-card\b[\s\S]*?<\/article>/g, '')
    .replace(/data-tip="Home:\s*local feed"/gi, 'data-tip="Local feed"')
    .replace(/data-tip="Nearby:\s*businesses close to you"/gi, 'data-tip="Businesses close to you"')
    .replace(/data-tip="Clips?:\s*short videos"/gi, 'data-tip="Short videos"')
    .replace(/data-tip="Profile:\s*your account"/gi, 'data-tip="Your account"')
    .replace(/data-tip="(?:Products?|Feeds?):\s*(?:product(?:s)?\s*(?:and|&)\s*posts?|products?\s*(?:and|&)\s*posts?)"/gi, 'data-tip="Product and posts"')
    .replace(/data-tip="(?:Chat|Messages):\s*messages"/gi, 'data-tip="Messages"')
    .replace(/data-tip="(?:Ask EMY|Ask|AI):\s*ai helper"/gi, 'data-tip="AI helper"')
    .replace(/"Tap the business card above to see more\."/g, '""')
    .replace(/return \{ name, key, role, photo, photoRef, href \};/g, 'return { name, key, email, role, photo, photoRef, href };')
    .replace(/if \(leftRole && rightRole && leftRole !== rightRole\) return false;/g, 'if ((leftRole || rightRole) && leftRole !== rightRole) return false;')
    .replace(/if \(active\) rows\.unshift\(\{ name: person\.name, key: person\.key, role: person\.role, actorType: person\.role, photo: person\.photo, photoRef: person\.photoRef, href: person\.href, at: new Date\(\)\.toISOString\(\) \}\);/g, 'if (active) rows.unshift({ name: person.name, key: person.key, email: person.email, role: person.role, actorType: person.role, photo: person.photo, photoRef: person.photoRef, href: person.href, at: new Date().toISOString() });')
    .replace(/const rows = \(Array\.isArray\(list\) \? list : \[\]\)\.filter\(\(item\) => item && cleanText\(item\.key \|\| item\.email \|\| item\.name\)\.toLowerCase\(\) !== person\.key\);\s*if \(active\) rows\.unshift\(\{ name: person\.name, key: person\.key, role: person\.role, photo: person\.photo, photoRef: person\.photoRef, href: person\.href, at: new Date\(\)\.toISOString\(\) \}\);/g, 'const rows = (Array.isArray(list) ? list : []).filter((item) => {\n              if (!item) return false;\n              const itemRole = cleanText(item.role || item.actorType || item.accountRole || item.type).toLowerCase();\n              if ((itemRole || person.role) && itemRole !== person.role) return true;\n              return cleanText(item.key || item.email || item.name).toLowerCase() !== person.key;\n            });\n            if (active) rows.unshift({ name: person.name, key: person.key, email: person.email, role: person.role, actorType: person.role, photo: person.photo, photoRef: person.photoRef, href: person.href, at: new Date().toISOString() });')
    .replace(/const businessPhoto = notificationDataMedia\(localStorage\.getItem\("emyBusinessProfilePhoto"\)\);/g, 'const businessPhoto = notificationDirectOrRef(localStorage.getItem("emyBusinessProfilePhoto") || localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyBusinessProfilePhotoRef"), "image");')
    .replace(/const customerSignupPhoto = String\(localStorage\.getItem\("emyMainPendingSignupRole"\) \|\| ""\)\.toLowerCase\(\) === "customer" \? localStorage\.getItem\("emyMainPendingSignupPhoto"\) : "";/g, 'const pendingRoleForAvatar = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();\n          const customerSignupPhoto = pendingRoleForAvatar === "customer" ? localStorage.getItem("emyMainPendingSignupPhoto") || localStorage.getItem("emyMainPendingSignupPhotoSrc") : "";\n          const customerSignupPhotoRef = pendingRoleForAvatar === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "";')
    .replace(/const customerPhoto = notificationDataMedia\(localStorage\.getItem\("emyCustomerProfilePhoto"\) \|\| customerSignupPhoto\);/g, 'const customerPhoto = notificationDirectOrRef(localStorage.getItem("emyCustomerProfilePhoto") || localStorage.getItem("emyCustomerProfilePhotoSrc") || customerSignupPhoto, localStorage.getItem("emyCustomerProfilePhotoRef") || customerSignupPhotoRef, "image");')
    .replace(/const avatar = notificationDirectOrRef\(item\.avatar \|\| item\.avatarSrc \|\| item\.logo \|\| item\.photo \|\| item\.businessPhoto \|\| item\.customerPhoto, item\.avatarRef \|\| item\.logoRef \|\| item\.photoRef, "image"\) \|\|\s*notificationDirectOrRef\(match\.avatarSrc \|\| match\.avatar \|\| match\.logo \|\| match\.photo, match\.avatarRef \|\| match\.logoRef \|\| match\.photoRef, "image"\) \|\|/g, 'const avatar = notificationDirectOrRef(item.avatar || item.avatarSrc || item.actorPhoto || item.actorAvatar || item.viewerPhoto || item.customerPhoto || item.customerPhotoSrc || item.customerAvatar || item.profilePhoto || item.profilePhotoSrc || item.photo || item.photoSrc || item.imageSrc || item.logo || item.businessPhoto, item.avatarRef || item.actorPhotoRef || item.actorAvatarRef || item.viewerPhotoRef || item.customerPhotoRef || item.customerAvatarRef || item.profilePhotoRef || item.photoRef || item.imageRef || item.logoRef || item.businessPhotoRef, "image") ||\n            notificationDirectOrRef(match.avatarSrc || match.avatar || match.actorPhoto || match.viewerPhoto || match.customerPhoto || match.profilePhoto || match.logo || match.photo, match.avatarRef || match.actorPhotoRef || match.viewerPhotoRef || match.customerPhotoRef || match.profilePhotoRef || match.logoRef || match.photoRef, "image") ||')
    .replace(/initials: String\(item\.initials \|\| ""\),/g, 'actorName: String(item.actorName || item.customerName || item.viewerName || item.author || item.name || ""),\n                initials: String(item.actorName || item.customerName || item.viewerName || item.author || item.name || item.initials || ""),')
    .replace(/function notificationFallback\(item\) \{\s*if \(item\.initials\) return item\.initials\.slice\(0, 2\)\.toUpperCase\(\);\s*return item\.title\.split\(\/\\s\+\/\)\.filter\(Boolean\)\.slice\(0, 2\)\.map\(\(word\) => word\[0\]\)\.join\(""\)\.toUpperCase\(\) \|\| "E";\s*\}/g, 'function notificationFallback(item) {\n          const source = String(item && (item.actorName || item.customerName || item.viewerName || item.author || item.name || item.initials || item.title) || "").trim();\n          const parts = source.split(/\\s+/).filter(Boolean);\n          return parts.slice(0, 2).map((word) => word.charAt(0)).join("").toUpperCase() || source.slice(0, 2).toUpperCase() || "?";\n        }')
    .replace(/\n\s*localStorage\.getItem\("emyBusinessOwnerCustomerPhoto(?:Ref)?"\)\s*\|\|/g, '')
    .replace(/\n\s*localStorage\.getItem\("emyBusinessOwnerCustomerPhoto(?:Ref)?"\)\s*,/g, '')
    .replace(/\n\s*localStorage\.getItem\("emyMainPendingSignupPhoto(?:Src|Ref)?"\)\s*\|\|/g, '')
    .replace(/\n\s*localStorage\.getItem\("emyMainPendingSignupPhoto(?:Src|Ref)?"\)\s*,/g, '')
    .replace(/const hasAskUser = Boolean\(String\(askUser\.name \|\| askUser\.email \|\| askUser\.image \|\| ""\)\.trim\(\)\);/g, 'const hasAskUser = Boolean(String(askUser.name || askUser.email || "").trim());')
    .replace(/const customerSignupPhoto = validRole\(localStorage\.getItem\("emyMainPendingSignupRole"\)\) === "customer" \? \(localStorage\.getItem\("emyMainPendingSignupPhoto"\) \|\| ""\) : "";/g, 'const customerSignupPhoto = validRole(localStorage.getItem("emyMainPendingSignupRole")) === "customer" ? (localStorage.getItem("emyMainPendingSignupPhoto") || localStorage.getItem("emyMainPendingSignupPhotoSrc") || "") : "";')
    .replace(/const signedRoleForPhoto = validRole\(localStorage\.getItem\("emyMainSignedInRole"\)\);\s*const customerSignupPhoto = !signedRoleForPhoto && validRole\(localStorage\.getItem\("emyMainPendingSignupRole"\)\) === "customer" \? \(localStorage\.getItem\("emyMainPendingSignupPhoto"\) \|\| ""\) : "";/g, 'const customerSignupPhoto = validRole(localStorage.getItem("emyMainPendingSignupRole")) === "customer" ? (localStorage.getItem("emyMainPendingSignupPhoto") || localStorage.getItem("emyMainPendingSignupPhotoSrc") || "") : "";')
    .replace(/\? sessionText\(localStorage\.getItem\("emyBusinessProfilePhoto"\), businessProfile\.profilePhoto, businessProfile\.photo, businessProfile\.avatar, businessProfile\.logo\)/g, '? sessionText(localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), businessProfile.profilePhoto, businessProfile.profilePhotoSrc, businessProfile.photo, businessProfile.photoSrc)')
    .replace(/: sessionText\(localStorage\.getItem\("emyCustomerProfilePhoto"\), customerSignupPhoto, sessionRole === "customer" && askUser\.image\)/g, ': sessionText(localStorage.getItem("emyCustomerProfilePhoto"), localStorage.getItem("emyCustomerProfilePhotoSrc"), customerSignupPhoto)')
    .replace(/\? sessionText\(localStorage\.getItem\("emyBusinessProfilePhotoRef"\), businessProfile\.profilePhotoRef, businessProfile\.photoRef, businessProfile\.avatarRef, businessProfile\.logoRef\)/g, '? sessionText(localStorage.getItem("emyBusinessProfilePhotoRef"), businessProfile.profilePhotoRef, businessProfile.photoRef)')
    .replace(/: sessionText\(localStorage\.getItem\("emyCustomerProfilePhotoRef"\), localStorage\.getItem\("emyMainPendingSignupPhotoRef"\)\)/g, ': sessionText(localStorage.getItem("emyCustomerProfilePhotoRef"), validRole(localStorage.getItem("emyMainPendingSignupRole")) === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "")')
    .replace(/: sessionText\(localStorage\.getItem\("emyCustomerProfilePhotoRef"\), !signedRoleForPhoto && validRole\(localStorage\.getItem\("emyMainPendingSignupRole"\)\) === "customer" \? localStorage\.getItem\("emyMainPendingSignupPhotoRef"\) : ""\)/g, ': sessionText(localStorage.getItem("emyCustomerProfilePhotoRef"), validRole(localStorage.getItem("emyMainPendingSignupRole")) === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "")')
    .replace(/(<button class="business-switch(?: home-business-switch)?" type="button" data-switch-business)(?![^>]*data-business-switch-mode)([^>]*>)/g, '$1 data-business-switch-mode="create"$2')
    .replace(/<span><strong>Switch to Business<\/strong><span>Open your business profile area\.<\/span><\/span>/g, '<span><strong>Create a Business Account</strong><span>Start a business profile when you are ready.</span></span>')
    .replace(/"\.business-switch\[data-business-switch-mode='create'\] \.switch-track,\.business-switch\[data-business-switch-mode='rejected'\] \.switch-track\{display:block!important;opacity:1!important\}",\s*"\.business-switch\[data-business-switch-mode='review'\] \.switch-track\{display:block!important;opacity:\.58!important\}",/g, '"\\.business-switch[data-business-switch-mode=\'switch\'] .switch-track{display:block!important;opacity:1!important}",\n            ".business-switch[data-business-switch-mode=\'create\'] .switch-track,.business-switch[data-business-switch-mode=\'review\'] .switch-track,.business-switch[data-business-switch-mode=\'rejected\'] .switch-track{display:none!important}",')
    .replace(/<div class="nearby-map-label" data-nearby-map-label>[\s\S]*?<\/div>/g, '<div class="nearby-map-label" data-nearby-map-label>Your saved area</div>')
    .replace(/const nearbyDefaultCenter = \{[^;]*label: "Ridge Way area" \};/g, 'const nearbyDefaultCenter = { latitude: 51.5074, longitude: -0.1278, label: "Your saved area" };')
    .replace(/let nearbyBusinessLocations = \[[\s\S]*?\];\s*(?=function nearbyRealClean)/g, 'let nearbyBusinessLocations = [];\n        ')
    .replace(/\.emy-feed-edit-media-actions\{position:absolute;left:12px;right:12px;bottom:12px;z-index:3;display:flex;flex-wrap:wrap;gap:8px;align-items:center\}\.emy-feed-edit-media-btn\{min-height:34px;border:1px solid rgba\(255,255,255,\.70\);border-radius:999px;background:rgba\(255,255,255,\.92\);color:#001b47;cursor:pointer;padding:0 12px;font:inherit;font-size:12px;font-weight:850;box-shadow:0 12px 24px rgba\(0,27,71,\.16\)\}\.emy-feed-edit-media-btn\[hidden\]\{display:none\}/g, '.emy-feed-edit-media-actions{position:absolute;left:12px;right:12px;bottom:12px;z-index:3;display:grid;grid-template-columns:repeat(auto-fit,minmax(116px,1fr));gap:8px;align-items:stretch;max-width:calc(100% - 24px)}.emy-feed-edit-media-btn{box-sizing:border-box;min-width:0;width:100%;min-height:36px;border:1px solid rgba(255,255,255,.72);border-radius:999px;background:rgba(255,255,255,.94);color:#001b47;cursor:pointer;padding:0 13px;font:inherit;font-size:12px;line-height:1;font-weight:850;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 12px 24px rgba(0,27,71,.16)}.emy-feed-edit-media-btn[data-feed-edit-remove-media]{border-color:rgba(180,35,24,.20);background:#fff;color:#b42318}.emy-feed-edit-media-btn[hidden]{display:none}')
    .replace(/if \(kindText\.indexOf\("clip"\) >= 0 \|\| kindText\.indexOf\("reel"\) >= 0 \|\| kindText\.indexOf\("video"\) >= 0\) return feedEditOpenPost\(card, source, opts\);/g, 'if (kindText.indexOf("clip") >= 0 || kindText.indexOf("reel") >= 0) return feedEditOpenClip(card, source, opts);\n            if (kindText.indexOf("video") >= 0) return feedEditOpenPost(card, source, opts);')
    .replace(/initProductViewImpressionTracking\(\);/g, '// Product/card views are counted by central engagement after a 3-second opened detail view.')
    .replace(/detailRecordProductView\(card, details\);/g, 'detailRecordProductView(card, details);')
    .replace(/let clipAutoplayTimer = 0;(?:\s*let clipViewQualificationTimer = 0;\s*let clipViewQualificationToken = "";\s*let clipViewerSessionId = 0;)*/g, 'let clipAutoplayTimer = 0;\n          let clipViewQualificationTimer = 0;\n          let clipViewQualificationToken = "";\n          let clipViewerSessionId = 0;')
    .replace(/function clipViewBaseCount\(card, details\) \{\s*const info = details \|\| \(card \? detailsFromCard\(card\) : \{\}\);\s*const metaCount = productNumberFromMeta\(info \|\| \{\}, \/views\?\/i, 0\);\s*let visibleCount = 0;\s*if \(card && card\.querySelectorAll\) \{\s*card\.querySelectorAll\("\[data-clip-view-count\], \.reel-actions span, \.search-reel-actions span"\)\.forEach\(\(node\) => \{\s*if \(\(node\.hasAttribute && node\.hasAttribute\("data-clip-view-count"\)\) \|\| \/view\/i\.test\(node\.textContent \|\| ""\)\) \{\s*visibleCount = Math\.max\(visibleCount, readEngagementCount\(node\)\);\s*\}\s*\}\);\s*\}\s*return Math\.max\(metaCount, visibleCount\);\s*\}/g, 'function clipViewBaseCount(card, details) {\n            if (card && window.emyEngagement && typeof window.emyEngagement.viewCountForCard === "function") {\n              const count = Number(window.emyEngagement.viewCountForCard(card));\n              if (Number.isFinite(count)) return Math.max(0, count);\n            }\n            return 0;\n          }')
    .replace(/const labels = Array\.from\(card\.querySelectorAll\("\[data-clip-view-count\]"\)\);\s*card\.querySelectorAll\("\.reel-actions span, \.search-reel-actions span"\)\.forEach\(\(node\) => \{\s*if \(\/view\/i\.test\(node\.textContent \|\| ""\) && !labels\.includes\(node\)\) labels\.push\(node\);\s*\}\);\s*labels\.forEach\(\(node\) => setClipViewLabel\(node, count\)\);/g, 'const labels = Array.from(card.querySelectorAll("[data-clip-view-count]"));\n            const actionRow = card.querySelector(".reel-actions, .search-reel-actions");\n            if (actionRow && !labels.length) {\n              const viewLabel = Array.from(actionRow.querySelectorAll("span")).find((node) => /view/i.test(node.textContent || ""));\n              if (viewLabel) {\n                viewLabel.setAttribute("data-clip-view-count", "");\n                labels.push(viewLabel);\n              } else {\n                const label = document.createElement("span");\n                label.setAttribute("data-clip-view-count", "");\n                actionRow.insertBefore(label, actionRow.firstChild || null);\n                labels.push(label);\n              }\n            }\n            card.querySelectorAll(".reel-actions span, .search-reel-actions span").forEach((node) => {\n              if (/view/i.test(node.textContent || "") && !labels.includes(node)) labels.push(node);\n            });\n            labels.forEach((node) => setClipViewLabel(node, count));')
    .replace(/const recent = events\.find\(\(item\) => cleanText\(item && \(item\.viewerKey \|\| item\.key \|\| item\.name\)\)\.toLowerCase\(\) === viewerKey && now - new Date\(item\.at \|\| 0\)\.getTime\(\) < 10 \* 60 \* 1000\);\s*const baseCount = clipViewBaseCount\(sourceCard, details\);\s*if \(!recent\) \{\s*events\.push\(\{ at: new Date\(now\)\.toISOString\(\), viewerName: person\.name, viewerKey, role: person\.role \|\| activeDetailAccountRole\(\) \|\| "customer" \}\);\s*\}\s*const nextTotal = Math\.max\(baseCount, events\.length, Number\(record\.total\) \|\| 0\);\s*stats\[clipKey\] = Object\.assign\(\{\}, record, \{\s*events,\s*total: Math\.max\(baseCount, nextTotal\),\s*lastViewedAt: events\.length \? events\[events\.length - 1\]\.at : \(record\.lastViewedAt \|\| ""\)\s*\}\);/g, 'const baseCount = clipViewCount(clipKey, sourceCard, details);\n            events.push({ id: "clip-view-" + now + "-" + Math.random().toString(36).slice(2, 8), at: new Date(now).toISOString(), viewerName: person.name, viewerKey, role: person.role || activeDetailAccountRole() || "customer" });\n            const storedEvents = events.slice(-220);\n            const nextTotal = Math.max(baseCount + 1, storedEvents.length, (Number(record.total) || 0) + 1);\n            stats[clipKey] = Object.assign({}, record, {\n              events: storedEvents,\n              total: Math.max(baseCount, nextTotal),\n              lastViewedAt: storedEvents.length ? storedEvents[storedEvents.length - 1].at : (record.lastViewedAt || "")\n            });')
    .replace(/(\n\s*function clipProfileHref\(key\) \{)/g, '\n          function scheduleClipViewForSlide(slide) {\n            if (!slide || !slide.dataset || !clipModal || !clipModal.classList.contains("is-open")) return;\n            const session = String(clipViewerSessionId || 0);\n            if (slide.dataset.clipViewRecordedSession === session) return;\n            const sourceCard = clipSourceCard(slide);\n            if (sourceCard && window.emyEngagement && typeof window.emyEngagement.scheduleView === "function") {\n              window.emyEngagement.scheduleView(sourceCard);\n            }\n            if (clipViewQualificationTimer) window.clearTimeout(clipViewQualificationTimer);\n            const token = session + ":" + (slide.dataset.clipKey || slide.dataset.clipSlide || "") + ":" + Date.now();\n            clipViewQualificationToken = token;\n            slide.dataset.clipViewPendingToken = token;\n            clipViewQualificationTimer = window.setTimeout(() => {\n              clipViewQualificationTimer = 0;\n              if (clipViewQualificationToken !== token || slide.dataset.clipViewPendingToken !== token) return;\n              if (!clipModal || !clipModal.classList.contains("is-open") || !slide.classList.contains("is-active")) return;\n              slide.dataset.clipViewRecordedSession = session;\n              recordClipViewForSlide(slide);\n            }, 3000);\n          }\n$1')
    .replace(/(\n\s*pauseInactiveClipVideos\(activeSlide\);\s*)recordClipViewForSlide\(activeSlide\);/g, '$1')
    .replace(/(\n\s*activeClipSlideKey = nextKey;\s*)setClipVideoPlayback\(activeSlide, true, \{ restart: true \}\);/g, '$1scheduleClipViewForSlide(activeSlide);\n              setClipVideoPlayback(activeSlide, true, { restart: true });')
    .replace(/(\n\s*activeClipSlideKey = nextKey;\s*)setClipVideoPlayback\(activeSlide, true\);/g, '$1scheduleClipViewForSlide(activeSlide);\n              setClipVideoPlayback(activeSlide, true);')
    .replace(/(clipModal\.setAttribute\("aria-hidden", open \? "false" : "true"\);\s*document\.body\.classList\.toggle\("item-detail-locked", open \|\| modal\.classList\.contains\("is-open"\)\);)/g, '$1\n            if (open) clipViewerSessionId += 1;')
    .replace(/(setupRealRailItemDetailLinks\(\);\s*)(?!if \(typeof compactDemoStorage)/g, '$1if (typeof compactDemoStorage === "function") compactDemoStorage();\n          ');
  if (!next.includes('function feedEditOpenClip(card, source, options)')) {
    next = next.replace(/\n\s*function feedEditOpenPost\(card, source, options\) \{/, `\n${lockedCustomerHomeClipEditRuntimePatch}\n          function feedEditOpenPost(card, source, options) {`);
  }
  if (!next.includes('function businessPreviewItemLooksPlaceholder(item)')) {
    next = next.replace(/\n\s*function normaliseBusinessPreviewItem\(item, type, sourceKey\) \{\s*if \(!item \|\| typeof item !== "object"\) return null;/, `
        function businessPreviewItemLooksPlaceholder(item) {
          if (!item || typeof item !== "object") return false;
          const text = String([
            item.title,
            item.name,
            item.description,
            item.details,
            item.body,
            item.caption,
            item.subtitle,
            item.text,
            item.productInfo,
            item.productDescription
          ].filter(Boolean).join(" ")).trim();
          return /tap\\s+the\\s+business\\s+card\\s+above\\s+(?:to\\s+)?see\\s+more/i.test(text);
        }

        function normaliseBusinessPreviewItem(item, type, sourceKey) {
          if (!item || typeof item !== "object") return null;
          if (businessPreviewItemLooksPlaceholder(item)) return null;`);
  }
  if (!next.includes('function businessPreviewStoredItemIsBusinessOwned(item, sourceKey)')) {
    next = next.replace(/\n\s*function readStoredBusinessPreviewItems\(keys, type\) \{/, `
        function businessPreviewStoredItemIsBusinessOwned(item, sourceKey) {
          if (!item || typeof item !== "object") return false;
          const source = String(sourceKey || item.source || item.createdFrom || item.origin || "").trim().toLowerCase();
          const owner = String([item.owner, item.ownerType, item.createdAs, item.accountType, item.role, item.authorRole, item.actorType, item.authorType, item.postedByType, item.createdByType, item.sourceType].filter(Boolean).join(" ")).trim().toLowerCase();
          const key = businessPreviewSlug(item.businessKey || item.key || item.profileKey || item.detailBusinessKey || "");
          const href = String(item.profileHref || item.href || "").trim().toLowerCase();
          const id = String(item.id || item.postId || item.feedId || "").trim().toLowerCase();
          const explicitBusinessContext = source.indexOf("business") !== -1 ||
            /(^|[^a-z])(?:business|merchant|seller|company)([^a-z]|$)/.test(owner + " " + source) ||
            key === "profile" ||
            key === "business-profile" ||
            id.indexOf("business-") === 0 ||
            href.indexOf("emy-business-profile") !== -1;
          const isCustomer = source.indexOf("customer") !== -1 ||
            /(^|[^a-z])(?:customer|buyer|personal|user)([^a-z]|$)/.test(owner) ||
            key === "customer-profile" ||
            href.indexOf("emy-customer-profile") !== -1 ||
            id.indexOf("customer-") === 0 ||
            (id.indexOf("user-feed-") === 0 && !explicitBusinessContext) ||
            (id.indexOf("feed-create-") === 0 && !explicitBusinessContext) ||
            item.customerKey ||
            item.customerName ||
            (item.isUserPost === true && !explicitBusinessContext) ||
            (item.my === true && !explicitBusinessContext);
          if (isCustomer) return false;
          if (source.indexOf("emybusiness") === 0) return true;
          return source.indexOf("business") !== -1 ||
            /(^|[^a-z])(?:business|merchant|seller|company)([^a-z]|$)/.test(owner) ||
            key === "profile" ||
            key === "business-profile" ||
            id.indexOf("business-") === 0 ||
            href.indexOf("emy-business-profile") !== -1;
        }

        function readStoredBusinessPreviewItems(keys, type) {`);
  }
  next = next.replace(
    /items\.push\(\.\.\.rows\.filter\(\(item\) => \{\s*if \(!businessPreviewItemIsPublished\(item, type\)\) return false;\s*const isClipLike = businessPreviewItemLooksClip\(item, key\);/g,
    'items.push(...rows.filter((item) => {\n              if (!businessPreviewStoredItemIsBusinessOwned(item, key)) return false;\n              if (!businessPreviewItemIsPublished(item, type)) return false;\n              const isClipLike = businessPreviewItemLooksClip(item, key);'
  );
  if (!next.includes('const preservedSignature = "preserved:"')) {
    next = next.replace(
      /(const existingCards = Array\.from\(stage\.querySelectorAll\("\[data-business-card\]"\)\);\s*)const expectedKeys = businesses\.map/g,
      `$1if (!businesses.length && existingCards.length) {
            const preservedCount = existingCards.length;
            const singleBusiness = preservedCount <= 1;
            const preservedSignature = "preserved:" + existingCards.map((card) => [card.dataset.businessKey || "", card.querySelector("h3") && card.querySelector("h3").textContent || ""].join("~")).join("|");
            stage.dataset.emyRealSignature = preservedSignature;
            stage.dataset.emyRealMediaActivatedSignature = preservedSignature;
            deck.classList.toggle("is-single-business", singleBusiness);
            deck.setAttribute("data-business-count", String(preservedCount));
            deck.querySelectorAll("[data-business-prev],[data-business-next]").forEach((button) => {
              button.hidden = singleBusiness;
              button.disabled = singleBusiness;
              button.setAttribute("aria-disabled", singleBusiness ? "true" : "false");
            });
            const sideToggle = document.querySelector(".deck-side-toggle");
            if (sideToggle) sideToggle.hidden = singleBusiness;
            stage.querySelectorAll("[data-emy-real-empty]").forEach((node) => node.remove());
            activateBusinessDeckMedia(stage);
            if (window.emyRenderBusinessDeck) window.emyRenderBusinessDeck();
            else if (window.emyRenderBusinessPreview) window.emyRenderBusinessPreview();
            if (window.emyRefreshBusinessCustomerBadges) window.emyRefreshBusinessCustomerBadges(stage);
            return;
          }
          const expectedKeys = businesses.map`
    );
  }
  next = next.split(/\n/).filter((line) => {
    const trimmed = line.trim();
    if (trimmed.includes('emyBusinessOwnerCustomerPhoto')) return false;
    if (trimmed.startsWith('localStorage.getItem("emyMainPendingSignupPhoto')) return false;
    return true;
  }).join('\n');
  if (!next.includes('.business-switch[data-business-switch-mode="create"] .switch-track')) {
    next = next.replace(/(\.switch-track::after\s*\{[\s\S]*?transition:\s*left \.55s ease, background \.55s ease, box-shadow \.55s ease;\s*\})/, `$1
        .business-switch[data-business-switch-mode="create"] .switch-track,
        .business-switch[data-business-switch-mode="review"] .switch-track,
        .business-switch[data-business-switch-mode="rejected"] .switch-track {
          display: none;
        }`);
  }
  next = next.replace(/function scrubCustomerOnlyHomeCards\(root\) \{\s*const scope = root && root\.querySelectorAll \? root : document;\s*const cards = \[\];\s*if \(scope\.matches && scope\.matches\("\.feed-card,\.social-feed-card,\.post-card,\.home-flow-item"\)\) cards\.push\(scope\);\s*scope\.querySelectorAll\("\.feed-card,\.social-feed-card,\.post-card,\.home-flow-item"\)\.forEach\(\(card\) => cards\.push\(card\)\);\s*cards\.forEach\(\(card\) => \{\s*if \(!card\.closest\("\[data-home-flow-list\],\[data-home-static-post-list\],\[data-annexed-feed-list\],\.annexed-feed-middle"\)\) return;\s*const data = card\.dataset \|\| \{\};\s*const key = slug\(first\(\[data\.businessKey, data\.detailBusinessKey\]\)\);\s*if \(key !== "customer-profile"\) return;\s*card\.remove\(\);\s*\}\);\s*\}/g, () => `function scrubCustomerOnlyHomeCards(root) {
          const scope = root && root.querySelectorAll ? root : document;
          const cards = [];
          if (scope.matches && scope.matches(".feed-card,.social-feed-card,.post-card,.home-flow-item")) cards.push(scope);
          scope.querySelectorAll(".feed-card,.social-feed-card,.post-card,.home-flow-item").forEach((card) => cards.push(card));
          cards.forEach((card) => {
            if (card.closest("[data-annexed-feed-list],.annexed-feed-middle")) return;
            if (!card.closest("[data-home-flow-list],[data-annexed-feed-list],.annexed-feed-middle")) return;
            const data = card.dataset || {};
            const feedId = first([data.feedId, data.originalFeedId, data.id]);
            if (/^(user-feed-|feed-create-|customer-post-|repost-)/i.test(feedId || "")) return;
            if (card.classList && (card.classList.contains("is-user-post") || card.classList.contains("is-owned"))) return;
            const owner = slug(first([data.owner, data.ownerKey, data.authorType]));
            if (owner === "customer" || owner === "customer-profile") return;
            const key = slug(first([data.businessKey, data.detailBusinessKey]));
            if (key !== "customer-profile") return;
            card.remove();
          });
        }`);
  next = next.replace(/<button class="my-business-toggle"([^>]*)>/g, (match, attrs) => {
    return /\shidden(?:[\s=>]|$)/.test(match) ? match : `<button class="my-business-toggle"${attrs} hidden>`;
  });
  return next;
}

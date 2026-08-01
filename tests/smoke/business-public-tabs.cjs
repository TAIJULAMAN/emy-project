'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const htmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-business-profile.html');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');
const avatarShapePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-post-profile-circle-removal.js');
const startupCssPath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-startup.css');
const html = fs.readFileSync(htmlPath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');
const avatarShape = fs.readFileSync(avatarShapePath, 'utf8');
const startupCss = fs.existsSync(startupCssPath) ? fs.readFileSync(startupCssPath, 'utf8') : '';
const combined = html + '\n' + runtime + '\n' + startupCss;
const productFunctionStart = runtime.indexOf('function publicBusinessProductCardHtml');
const productFunctionEnd = runtime.indexOf('function publicBusinessPostCardHtml', productFunctionStart);
const publicProductFunction = productFunctionStart >= 0 && productFunctionEnd > productFunctionStart
  ? runtime.slice(productFunctionStart, productFunctionEnd)
  : '';
const postFunctionStart = runtime.indexOf('function publicBusinessPostCardHtml');
const postFunctionEnd = runtime.indexOf('function publicBusinessClipCardHtml', postFunctionStart);
const publicPostFunction = postFunctionStart >= 0 && postFunctionEnd > postFunctionStart
  ? runtime.slice(postFunctionStart, postFunctionEnd)
  : '';
const clipFunctionStart = runtime.indexOf('function publicBusinessClipCardHtml');
const clipFunctionEnd = runtime.indexOf('function publicBusinessEmptyHtml', clipFunctionStart);
const publicClipFunction = clipFunctionStart >= 0 && clipFunctionEnd > clipFunctionStart
  ? runtime.slice(clipFunctionStart, clipFunctionEnd)
  : '';
const detailAttrsFunctionStart = runtime.indexOf('function publicBusinessDetailAttrs');
const detailAttrsFunctionEnd = runtime.indexOf('function publicBusinessMediaHtml', detailAttrsFunctionStart);
const publicDetailAttrsFunction = detailAttrsFunctionStart >= 0 && detailAttrsFunctionEnd > detailAttrsFunctionStart
  ? runtime.slice(detailAttrsFunctionStart, detailAttrsFunctionEnd)
  : '';

const staleReset = 'renderPublicTab("products", current)';
const preservedTab = 'renderPublicTab(activePublicBusinessTab || publicContent && publicContent.dataset.publicActiveTab || "products", current)';
const clickHandler = 'renderPublicTab(normalisePublicBusinessTab(button.dataset.publicTab || "products"), profile)';
const guardedPublicTabClick = 'if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();';
const capturedPublicTabClick = '}, true);';
const publicTabState = 'let activePublicBusinessTab = "products";';
const publicTabNormaliser = 'function normalisePublicBusinessTab(tab)';
const genericProductShell = 'class="public-business-card card product-card';
const publicProductCardShell = 'card product-card feed-product-card home-flow-item is-product public-business-product-card';
const genericPostPlaceholder = 'publicBusinessMediaHtml(item, media, title, kind)';
const publicPostFeedHead = 'publicBusinessPostHeadHtml(item, profile, "post")';
const publicClipCardShell = 'business-posted-clip-card home-flow-item is-clip public-business-clip-card';
const publicCustomerMarker = 'data-public-customer-surface="true"';
const publicJobCreatorSync = 'if (activeTab === "posts" && window.emySyncJobCreatorButtons) window.emySyncJobCreatorButtons(publicContent);';
const publicUnifiedCardTabs = 'const usesUnifiedCards = activeTab === "products" || activeTab === "posts" || activeTab === "reels";';
const publicPostedCardTabs = 'const usesPostedCards = activeTab === "posts" || activeTab === "reels";';
const publicEmptyBoxStyle = /\.public-business-catalog\s*>\s*\.public-business-empty/;
const publicEmptyDisplay = /\.public-business-catalog:has\(\s*>\s*\.public-business-empty\)/;
const publicProductEmpty = 'No products yet.';
const publicPostEmpty = 'No posts yet.';
const publicClipEmpty = 'No clips yet.';
const publicAvatarMarkup = '<span class="public-avatar" data-public-avatar>B</span>';
const publicAvatarVisibleFallback = 'avatar.hidden = false;';
const publicAvatarInitialSpan = 'public-avatar-initial';
const publicAvatarMediaHelper = 'function publicBusinessProfileAvatarMedia(profile)';
const publicAvatarImageClass = 'avatar.classList.add("has-image");';
const publicAvatarShapeOverride = '.public-avatar.emy-avatar-shape-business';
const hiddenPublicAvatarFallback = 'avatar.hidden = !businessProfileHasAvatarMedia(current);';
const placeholderHidesPublicAvatar = '.public-cover.is-placeholder-cover .public-avatar';
const sharedPublicAvatarBusinessFallback = '".public-avatar",';
const publicOptionsButtonHandler = 'const optionsButton = event.target && event.target.closest ? event.target.closest("[data-feed-options]") : null;';
const publicOptionsScopeGuard = 'if (optionsButton && publicContent.contains(optionsButton))';
const publicOptionsToggle = 'businessTogglePostedOptions(optionsButton);';
const publicOptionsCloseScope = '[data-public-content] [data-feed-options-menu]';
const publicOptionsOutsideClose = 'if (!event.target.closest("[data-feed-options], [data-feed-options-menu]")) businessClosePostedOptions();';
const plainBusinessAvatarFallback = 'businessAvatar.className = "item-business-avatar" + (hasBusinessAvatar ? " " + productAvatarClass(info.key, info.name) + " has-image" : "");';
const plainProductAvatarFallback = 'productAvatar.className = "item-product-avatar" + (hasProductBusinessAvatar ? " " + productAvatarClass(businessKey, businessName) + " has-image" : "");';
const fakeBusinessAvatarFallback = 'businessAvatar.className = "item-business-avatar " + productAvatarClass(info.key, info.name) + (hasBusinessAvatar ? " has-image" : "");';
const fakeProductAvatarFallback = 'productAvatar.className = "item-product-avatar " + productAvatarClass(businessKey, businessName) + (hasProductBusinessAvatar ? " has-image" : "");';
const inlineStyleBytes = (html.match(/<style\b[^>]*>[\s\S]*?<\/style>/g) || []).map((block) => Buffer.byteLength(block));
const largestInlineStyle = inlineStyleBytes.length ? Math.max(...inlineStyleBytes) : 0;
const startupCssBytes = Buffer.byteLength(startupCss);
const pageRuntimeIndex = html.indexOf('data-emy-page-runtime');
const lateScriptIndex = html.indexOf('data-emy-business-profile-late-scripts');
const directLateScriptRe = /<script\b(?=[^>]*\bdata-emy-(?:comment-replies|more-options-cleaner|home-clip-mascot-like|business-clip-product-mini-restore|clip-hover-preview|clip-scroll-restart|modal-close-guard|emoji-picker|video-controls-enhancer|event-system|real-data-guard|notification-router)\b)(?=[^>]*\bsrc=)[^>]*><\/script>/;

if (!html.includes('data-emy-business-profile-startup-style') || !html.includes('assets/emy-business-profile-startup.css')) {
  console.error('Business profile startup CSS was not extracted into a cacheable asset.');
  process.exit(1);
}

if (Buffer.byteLength(html) > 260000) {
  console.error('Business profile HTML is still too large for startup:', Buffer.byteLength(html));
  process.exit(1);
}

if (largestInlineStyle > 16384) {
  console.error('Business profile still has a large inline style block:', largestInlineStyle);
  process.exit(1);
}

if (startupCssBytes < 450000 || startupCssBytes > 650000 || !startupCss.includes('.public-business-profile')) {
  console.error('Business profile startup CSS asset is missing or unexpected size:', startupCssBytes);
  process.exit(1);
}

if (html.includes('<script data-emy-real-backend-inline src=') || html.includes('<script data-emy-real-backend-loader src=')) {
  console.error('Business profile real backend scripts are still parser-blocking.');
  process.exit(1);
}

if (lateScriptIndex < 0 || pageRuntimeIndex < 0 || lateScriptIndex < pageRuntimeIndex || !html.includes('emy:business-profile-late-scripts-ready')) {
  console.error('Business profile helper scripts are not delayed until after the main page runtime.');
  process.exit(1);
}

if (directLateScriptRe.test(html)) {
  console.error('Business profile still loads heavy helper scripts directly in the startup path.');
  process.exit(1);
}

if (runtime.includes(staleReset)) {
  console.error('Business public tabs still reset to Product during profile refresh.');
  process.exit(1);
}

if (!runtime.includes(preservedTab)) {
  console.error('Business public tabs do not preserve the active public tab during refresh.');
  process.exit(1);
}

if (!runtime.includes(publicTabState) || !runtime.includes(publicTabNormaliser) || !runtime.includes(clickHandler)) {
  console.error('Business public tab state is not explicitly normalized and preserved.');
  process.exit(1);
}

if (!runtime.includes(guardedPublicTabClick) || !runtime.includes(capturedPublicTabClick)) {
  console.error('Business public tab clicks are not guarded from broader product/detail click handlers.');
  process.exit(1);
}

if (!publicProductFunction || publicProductFunction.includes(genericProductShell)) {
  console.error('Business public Product tab still uses the generic public card shell.');
  process.exit(1);
}

if (!publicProductFunction.includes(publicProductCardShell) || !runtime.includes(publicUnifiedCardTabs)) {
  console.error('Business public Product tab is not using the normal product feed card shell.');
  process.exit(1);
}

if (!publicPostFunction || publicPostFunction.includes(genericPostPlaceholder)) {
  console.error('Business public Post tab still uses the generic placeholder media renderer.');
  process.exit(1);
}

if (!runtime.includes(publicPostFeedHead) || !runtime.includes(publicPostedCardTabs)) {
  console.error('Business public Post tab is not using the normal posted feed card shell.');
  process.exit(1);
}

if (!publicClipFunction || publicClipFunction.includes(genericPostPlaceholder)) {
  console.error('Business public Clips tab still uses the generic placeholder media renderer.');
  process.exit(1);
}

if (!publicClipFunction.includes(publicClipCardShell) || !runtime.includes(publicPostedCardTabs)) {
  console.error('Business public Clips tab is not using the normal reel card shell.');
  process.exit(1);
}

if (!publicDetailAttrsFunction.includes(publicCustomerMarker) || !publicProductFunction.includes('publicBusinessDetailAttrs') || !publicPostFunction.includes('publicBusinessDetailAttrs') || !publicClipFunction.includes('publicBusinessDetailAttrs')) {
  console.error('Business public cards are not marked as customer-facing surfaces.');
  process.exit(1);
}

if (/is-user-post public-business-(post|clip)-card/.test(publicPostFunction + publicClipFunction) || /public-business-(post|clip)-card[^']*is-user-post/.test(publicPostFunction + publicClipFunction) || runtime.includes(publicJobCreatorSync)) {
  console.error('Business public cards still expose owner-mode post/clip/job behavior.');
  process.exit(1);
}

if (!runtime.includes(plainBusinessAvatarFallback) || !runtime.includes(plainProductAvatarFallback) || runtime.includes(fakeBusinessAvatarFallback) || runtime.includes(fakeProductAvatarFallback)) {
  console.error('Business detail avatars still use fake decorative placeholders when no uploaded profile image exists.');
  process.exit(1);
}

if (!publicEmptyBoxStyle.test(combined) || !publicEmptyDisplay.test(combined)) {
  console.error('Business public tabs do not have a full-width visible empty box style.');
  process.exit(1);
}

if (!html.includes(publicAvatarMarkup) || !runtime.includes(publicAvatarVisibleFallback) || !runtime.includes(publicAvatarInitialSpan) || !runtime.includes(publicAvatarMediaHelper) || !runtime.includes(publicAvatarImageClass) || !combined.includes(publicAvatarShapeOverride) || runtime.includes(hiddenPublicAvatarFallback) || combined.includes(placeholderHidesPublicAvatar) || avatarShape.includes(sharedPublicAvatarBusinessFallback)) {
  console.error('Business public cover must keep the neutral profile avatar circle visible unless a real uploaded image replaces it.');
  process.exit(1);
}

if (![publicOptionsButtonHandler, publicOptionsScopeGuard, publicOptionsToggle, publicOptionsCloseScope, publicOptionsOutsideClose].every((marker) => runtime.includes(marker))) {
  console.error('Business public product/post/clip three-dot menus are not wired on the customer-facing profile.');
  process.exit(1);
}

if (![publicProductEmpty, publicPostEmpty, publicClipEmpty].every((marker) => runtime.includes(marker))) {
  console.error('Business public tabs are missing their section-specific empty messages.');
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  page: 'emy-business-profile.html',
  runtime: path.relative(root, runtimePath),
  preservesPublicTab: true,
  usesProductFeedCards: true,
  usesPostedFeedCards: true,
  usesClipReelCards: true,
  keepsPublicAvatarFallback: true,
  wiresPublicThreeDotMenus: true,
  hasSectionEmptyBoxes: true,
}, null, 2));

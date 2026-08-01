'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const htmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-business-profile.html');
const runtimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');
const sharedLikePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-like-sync.js');
const html = fs.readFileSync(htmlPath, 'utf8');
const runtime = fs.readFileSync(runtimePath, 'utf8');
const sharedLike = fs.readFileSync(sharedLikePath, 'utf8');

const requiredHtmlMarkers = [
  'class="public-hero" data-business-card data-business-key="profile"',
  'class="business-like-button public-business-like-button"',
  'data-business-like data-public-business-like',
  'data-business-like-label>Like business',
  'data-business-like-count>0',
  '.public-business-like-button.business-like-button',
];

const requiredRuntimeMarkers = [
  'const requestedPublicKey = normaliseBusinessKey(params.get("business") || "");',
  'const publicKey = requestedPublicKey && requestedPublicKey !== "profile" && requestedPublicKey !== "business-profile"',
  'const publicLikeAliases = Array.from(new Set([publicKey, currentPublicKey, currentPublicNameKey, requestedPublicKey, "profile", "business-profile"]',
  'const publicHeroCard = document.querySelector(".public-hero[data-business-card]");',
  'publicHeroCard.dataset.businessKey = publicKey;',
  'publicHeroCard.dataset.businessLikeAliases = publicLikeAliases;',
  'const publicBusinessLike = document.querySelector("[data-public-business-like]");',
  'publicBusinessLike.dataset.businessKey = publicKey;',
  'publicBusinessLike.dataset.businessLikeAliases = publicLikeAliases;',
  'publicBusinessLike.hidden = businessPageIsBusinessAccount();',
  'if (window.emySyncBusinessLikeButtons) window.emySyncBusinessLikeButtons(publicBusiness || document);',
  'function businessLikeActorIdentity(value) {',
  'function businessCardLikeAliases(card, key) {',
  'const active = likedBy.some((value) => businessLikeActorMatches(value, actor));',
];

const requiredSharedLikeMarkers = [
  'function businessAliasSetFor(button, businessId) {',
  'const wasLiked = userLiked(pairs, businessAliases, userId);',
  'applyOptimisticPairs(businessId, businessAliases, userId, action);',
  'reconcileFromServer(businessId, businessAliases, userId, result);',
];

const missingHtml = requiredHtmlMarkers.filter((marker) => !html.includes(marker));
if (missingHtml.length) {
  console.error('Public business profile is missing the connected Like business button:', missingHtml.join(', '));
  process.exit(1);
}

const missingRuntime = requiredRuntimeMarkers.filter((marker) => !runtime.includes(marker));
if (missingRuntime.length) {
  console.error('Public business profile Like business button is not wired to the current business key/sync:', missingRuntime.join(', '));
  process.exit(1);
}

const missingSharedLike = requiredSharedLikeMarkers.filter((marker) => !sharedLike.includes(marker));
if (missingSharedLike.length) {
  console.error('Shared business like sync is not alias-aware for the public profile button:', missingSharedLike.join(', '));
  process.exit(1);
}

const forbiddenMarkers = [
  'isAnonymousLocalUser',
  'count === 1 && isAnonymousLocalUser',
  'likedBy.length === 1 && (actorIdentity === "customer" || actorIdentity === "local-user")',
];
const forbiddenHits = forbiddenMarkers.filter((marker) => runtime.includes(marker) || sharedLike.includes(marker));
if (forbiddenHits.length) {
  console.error('Business likes must stay one-per-customer, not infer ownership from count alone:', forbiddenHits.join(', '));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  page: 'emy-business-profile.html',
  connectedLikeBusinessButton: true,
  source: 'public business profile hero',
}, null, 2));

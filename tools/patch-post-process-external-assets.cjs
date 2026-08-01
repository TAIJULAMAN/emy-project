'use strict';

const fs = require('fs');
const path = require('path');

const sectionPath = path.join(__dirname, '../src/generator/sections/46-manifest-post-process.cjs');
let source = fs.readFileSync(sectionPath, 'utf8');

const assetVars = [
  'sharedPageBootGateStyle',
  'sharedPageBootGateScript',
  'sharedCustomerShellSessionScript',
  'sharedEmyTestModeScript',
  'sharedCommentComposerPolishStyle',
  'sharedCommentWritingStyle',
  'sharedCommentRepliesScript',
  'sharedDeleteConfirmScript',
  'sharedItemDetailOptionsEnhancerScript',
  'sharedMoreOptionsButtonScript',
  'sharedFeedBoxWritingStyle',
  'sharedProductClipGlassStyle',
  'sharedClipCleanMediaOverlaysStyle',
  'sharedClipMiniProductOverlayStyle',
  'sharedSearchClipCardFixStyle',
  'sharedBusinessClipProductMiniRestoreScript',
  'sharedFeedsClipSizingStyle',
  'sharedResponsiveHoverStyle',
  'sharedRailSelectionStateStyle',
  'sharedRailSelectionStateScript',
  'sharedClipHoverPreviewScript',
  'sharedClipViewerScrollRestartScript',
  'sharedModalCloseControlsStyle',
  'sharedModalCloseGuardScript',
  'sharedEmySessionNavScript',
  'sharedAskMiniScript',
  'sharedEmyEmojiPickerScript',
  'sharedEmyVideoControlsScript',
  'sharedBusinessVideoPopupControlsScript',
  'sharedEmyEventSystemScript',
  'sharedRealDataGuardScript',
  'sharedNotificationRouterScript',
  'sharedPostProfileCircleRemovalStyle',
  'sharedBusinessLikeSyncScript',
  'sharedProductMascotLikeScript',
  'sharedPostProfileCircleRemovalScript',
  'sharedCentralEngagementScript',
  'sharedSocialEngagementDisabledScript',
  'sharedEmyRealBackendLoaderScript',
  'sharedEmyRealBackendNonBlockingLoaderScript',
];

for (const name of assetVars) {
  source = source.replace(new RegExp(`(?<!ASSETS\\.)\\b${name}\\b`, 'g'), `ASSETS.${name}`);
}

const replacements = [
  [
    `const htmlWithoutPageBootGate = html
    .replace(/\\n?\\s*<style data-emy-page-boot-gate>[\\s\\S]*?<\\/style>/g, '')
    .replace(/\\n?\\s*<script data-emy-page-boot-gate>[\\s\\S]*?<\\/script>/g, '')
    .replace(/\\n?\\s*<!-- emy-page-boot-loader:start -->[\\s\\S]*?<!-- emy-page-boot-loader:end -->/g, '');`,
    `const htmlWithoutPageBootGate = stripSharedStyle(stripSharedScript(html, 'data-emy-page-boot-gate'), 'data-emy-page-boot-gate')
    .replace(/\\n?\\s*<!-- emy-page-boot-loader:start -->[\\s\\S]*?<!-- emy-page-boot-loader:end -->/g, '');`,
  ],
  [
    `const htmlWithoutCustomerShellSession = html.replace(/\\n?\\s*<script data-emy-customer-shell-session>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutCustomerShellSession = stripSharedScript(html, 'data-emy-customer-shell-session');`,
  ],
  [
    `const htmlWithoutTestMode = html.replace(/\\n?\\s*<script data-emy-test-mode>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutTestMode = stripSharedScript(html, 'data-emy-test-mode');`,
  ],
  [
    `const htmlWithoutCommentComposerPolish = html.replace(/\\n?\\s*<style data-emy-comment-composer-polish>[\\s\\S]*?<\\/style>/g, '');`,
    `const htmlWithoutCommentComposerPolish = stripSharedStyle(html, 'data-emy-comment-composer-polish');`,
  ],
  [
    `const htmlWithoutCommentWriting = html.replace(/\\n?\\s*<style data-emy-comment-writing>[\\s\\S]*?<\\/style>/g, '');`,
    `const htmlWithoutCommentWriting = stripSharedStyle(html, 'data-emy-comment-writing');`,
  ],
  [
    `const htmlWithoutCommentReplies = html.replace(/\\n?\\s*<script data-emy-comment-replies>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutCommentReplies = stripSharedScript(html, 'data-emy-comment-replies');`,
  ],
  [
    `const htmlWithoutDeleteConfirm = html.replace(/\\n?\\s*<script data-emy-delete-confirm>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutDeleteConfirm = stripSharedScript(html, 'data-emy-delete-confirm');`,
  ],
  [
    `const htmlWithoutItemDetailOptionsEnhancer = html.replace(/\\n?\\s*<script data-emy-item-detail-options-enhancer>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutItemDetailOptionsEnhancer = stripSharedScript(html, 'data-emy-item-detail-options-enhancer');`,
  ],
  [
    `const htmlWithoutMoreOptionsCleaner = html.replace(/\\n?\\s*<script data-emy-more-options-cleaner>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutMoreOptionsCleaner = stripSharedScript(html, 'data-emy-more-options-cleaner');`,
  ],
  [
    `const htmlWithoutFeedBoxWriting = html.replace(/\\n?\\s*<style data-emy-feed-box-writing>[\\s\\S]*?<\\/style>/g, '');`,
    `const htmlWithoutFeedBoxWriting = stripSharedStyle(html, 'data-emy-feed-box-writing');`,
  ],
  [
    `const htmlWithoutProductClipGlass = html.replace(/\\n?\\s*<style data-emy-product-clip-glass>[\\s\\S]*?<\\/style>/g, '');`,
    `const htmlWithoutProductClipGlass = stripSharedStyle(html, 'data-emy-product-clip-glass');`,
  ],
  [
    `const htmlWithoutClipCleanMediaOverlays = html.replace(/\\n?\\s*<style data-emy-clip-clean-media-overlays>[\\s\\S]*?<\\/style>/g, '');`,
    `const htmlWithoutClipCleanMediaOverlays = stripSharedStyle(html, 'data-emy-clip-clean-media-overlays');`,
  ],
  [
    `const htmlWithoutClipMiniProductOverlay = html.replace(/\\n?\\s*<style data-emy-clip-mini-product-overlay>[\\s\\S]*?<\\/style>/g, '');`,
    `const htmlWithoutClipMiniProductOverlay = stripSharedStyle(html, 'data-emy-clip-mini-product-overlay');`,
  ],
  [
    `const htmlWithoutSearchClipCardFix = html.replace(/\\n?\\s*<style data-emy-search-clip-card-fix>[\\s\\S]*?<\\/style>/g, '');`,
    `const htmlWithoutSearchClipCardFix = stripSharedStyle(html, 'data-emy-search-clip-card-fix');`,
  ],
  [
    `const htmlWithoutBusinessClipProductMiniRestore = html.replace(/\\n?\\s*<script data-emy-business-clip-product-mini-restore>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutBusinessClipProductMiniRestore = stripSharedScript(html, 'data-emy-business-clip-product-mini-restore');`,
  ],
  [
    `const htmlWithoutFeedsClipSizing = html.replace(/\\n?\\s*<style data-emy-feeds-clip-sizing>[\\s\\S]*?<\\/style>/g, '');`,
    `const htmlWithoutFeedsClipSizing = stripSharedStyle(html, 'data-emy-feeds-clip-sizing');`,
  ],
  [
    `const htmlWithoutResponsiveHoverStyle = html.replace(/\\n?\\s*<style data-emy-responsive-hover-style>[\\s\\S]*?<\\/style>/g, '');`,
    `const htmlWithoutResponsiveHoverStyle = stripSharedStyle(html, 'data-emy-responsive-hover-style');`,
  ],
  [
    `const htmlWithoutRailSelectionStateStyle = html.replace(/\\n?\\s*<style data-emy-rail-selection-state-style>[\\s\\S]*?<\\/style>/g, '');`,
    `const htmlWithoutRailSelectionStateStyle = stripSharedStyle(html, 'data-emy-rail-selection-state-style');`,
  ],
  [
    `const htmlWithoutRailSelectionStateScript = html.replace(/\\n?\\s*<script data-emy-rail-selection-state>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutRailSelectionStateScript = stripSharedScript(html, 'data-emy-rail-selection-state');`,
  ],
  [
    `const htmlWithoutClipHoverPreview = html.replace(/\\n?\\s*<script data-emy-clip-hover-preview>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutClipHoverPreview = stripSharedScript(html, 'data-emy-clip-hover-preview');`,
  ],
  [
    `const htmlWithoutClipViewerScrollRestart = html.replace(/\\n?\\s*<script data-emy-clip-scroll-restart>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutClipViewerScrollRestart = stripSharedScript(html, 'data-emy-clip-scroll-restart');`,
  ],
  [
    `const htmlWithoutModalCloseControls = html.replace(/\\n?\\s*<style data-emy-modal-close-controls>[\\s\\S]*?<\\/style>/g, '');`,
    `const htmlWithoutModalCloseControls = stripSharedStyle(html, 'data-emy-modal-close-controls');`,
  ],
  [
    `const htmlWithoutModalCloseGuard = html.replace(/\\n?\\s*<script data-emy-modal-close-guard>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutModalCloseGuard = stripSharedScript(html, 'data-emy-modal-close-guard');`,
  ],
  [
    `const htmlWithoutAccountSessionNav = html.replace(/\\n?\\s*<script data-emy-account-session-nav>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutAccountSessionNav = stripSharedScript(html, 'data-emy-account-session-nav');`,
  ],
  [
    `const htmlWithoutAskMini = html.replace(/\\n?\\s*<script data-emy-ask-mini>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutAskMini = stripSharedScript(html, 'data-emy-ask-mini');`,
  ],
  [
    `const htmlWithoutEmojiPicker = html.replace(/\\n?\\s*<script data-emy-emoji-picker>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutEmojiPicker = stripSharedScript(html, 'data-emy-emoji-picker');`,
  ],
  [
    `const htmlWithoutVideoControlsEnhancer = html.replace(/\\n?\\s*<script data-emy-video-controls-enhancer>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutVideoControlsEnhancer = stripSharedScript(html, 'data-emy-video-controls-enhancer');`,
  ],
  [
    `const htmlWithoutHomeFeedsVisibleSync = html.replace(/\\n?\\s*<script data-emy-home-feeds-visible-sync>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutHomeFeedsVisibleSync = stripSharedScript(html, 'data-emy-home-feeds-visible-sync');`,
  ],
  [
    `const htmlWithoutRealDataGuard = html.replace(/\\n?\\s*<script data-emy-real-data-guard>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutRealDataGuard = stripSharedScript(html, 'data-emy-real-data-guard');`,
  ],
  [
    `const htmlWithoutNotificationRouter = html.replace(/\\n?\\s*<script data-emy-notification-router>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutNotificationRouter = stripSharedScript(html, 'data-emy-notification-router');`,
  ],
  [
    `const htmlWithoutCentralEngagement = html.replace(/\\n?\\s*<script data-emy-central-engagement>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutCentralEngagement = stripSharedScript(html, 'data-emy-central-engagement');`,
  ],
  [
    `const htmlWithoutSocialEngagementDisabled = html.replace(/\\n?\\s*<script data-emy-social-engagement-disabled>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutSocialEngagementDisabled = stripSharedScript(html, 'data-emy-social-engagement-disabled');`,
  ],
  [
    `const htmlWithoutPostProfileCircleRemoval = html.replace(/\\n?\\s*<script data-emy-post-profile-circle-removal>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutPostProfileCircleRemoval = stripSharedScript(html, 'data-emy-post-profile-circle-removal');`,
  ],
  [
    `const htmlWithoutPostProfileCircleRemovalStyle = html.replace(/\\n?\\s*<style data-emy-post-profile-circle-removal-style>[\\s\\S]*?<\\/style>/g, '');`,
    `const htmlWithoutPostProfileCircleRemovalStyle = stripSharedStyle(html, 'data-emy-post-profile-circle-removal-style');`,
  ],
  [
    `const htmlWithoutBusinessLikeSync = html.replace(/\\n?\\s*<script data-emy-business-like-sync>[\\s\\S]*?<\\/script>/g, '');`,
    `const htmlWithoutBusinessLikeSync = stripSharedScript(html, 'data-emy-business-like-sync');`,
  ],
];

for (const [from, to] of replacements) {
  if (!source.includes(from)) {
    console.warn('Missing expected block:', from.slice(0, 60));
    continue;
  }
  source = source.replace(from, to);
}

source = source.replace(
  `const htmlWithoutProductMascotLike = html
    .replace(/\\n?\\s*<style data-emy-product-mascot-like-style>[\\s\\S]*?<\\/style>/g, '')
    .replace(/\\n?\\s*<script data-emy-product-mascot-like-sync>[\\s\\S]*?<\\/script>/g, '');`,
  `const htmlWithoutProductMascotLike = stripSharedStyle(stripSharedScript(html, 'data-emy-product-mascot-like-sync'), 'data-emy-product-mascot-like-style');`
);

source = source.replace(
  `const htmlWithoutBusinessVideoPopupControls = html
    .replace(/\\n?\\s*<script data-emy-business-video-popup-controls>[\\s\\S]*?<\\/script>/g, '')
    .replace(/\\n?\\s*<style data-emy-business-video-popup-controls>[\\s\\S]*?<\\/style>/g, '');`,
  `const htmlWithoutBusinessVideoPopupControls = stripSharedStyle(stripSharedScript(html, 'data-emy-business-video-popup-controls'), 'data-emy-business-video-popup-controls');`
);

source = source.replace(
  `    html = html.replace(/\\n?\\s*<script data-emy-event-cover-enhancer>[\\s\\S]*?<\\/script>/g, '');
    html = html.replace(/\\n?\\s*<script data-emy-event-system>[\\s\\S]*?<\\/script>/g, '');`,
  `    html = stripSharedScript(stripSharedScript(html, 'data-emy-event-cover-enhancer'), 'data-emy-event-system');`
);

source = source.replace(
  `  html = html.replace(/\\n?\\s*<script data-emy-central-engagement>[\\s\\S]*?<\\/script>/g, '');
  html = html.replace(/\\n?\\s*<script data-emy-social-engagement-disabled>[\\s\\S]*?<\\/script>/g, '');
  html = html.replace(/\\n?\\s*<script data-emy-post-profile-circle-removal>[\\s\\S]*?<\\/script>/g, '');
  html = html.replace(/\\n?\\s*<style data-emy-post-profile-circle-removal-style>[\\s\\S]*?<\\/style>/g, '');
  html = html.replace(/\\n?\\s*<script data-emy-business-like-sync>[\\s\\S]*?<\\/script>/g, '');
  html = html.replace(/\\n?\\s*<style data-emy-product-mascot-like-style>[\\s\\S]*?<\\/style>/g, '');
  html = html.replace(/\\n?\\s*<script data-emy-product-mascot-like-sync>[\\s\\S]*?<\\/script>/g, '');`,
  `  html = stripSharedStyle(stripSharedScript(html, 'data-emy-product-mascot-like-sync'), 'data-emy-product-mascot-like-style');
  html = stripSharedStyle(stripSharedScript(html, 'data-emy-post-profile-circle-removal'), 'data-emy-post-profile-circle-removal-style');
  html = stripSharedScript(html, 'data-emy-business-like-sync');
  html = stripSharedScript(html, 'data-emy-social-engagement-disabled');
  html = stripSharedScript(html, 'data-emy-central-engagement');`
);

fs.writeFileSync(sectionPath, source, 'utf8');
console.log('Patched 46-manifest-post-process.cjs');

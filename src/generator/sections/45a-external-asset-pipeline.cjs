/* EMY generator section: 45a-external-asset-pipeline.cjs
   Materializes shared inline scripts/styles into linked-pages/restore-may20/assets/
   and exposes ASSETS.* tags for post-process injection. */

function materializeExternalAsset(inlineHtml, fileName, options = {}) {
  const snippet = String(inlineHtml || '').trim();
  if (!snippet) return '';
  const kind = options.kind || detectInlineAssetKind(snippet);
  const dataAttr = options.attr || detectInlineDataAttr(snippet);
  if (kind === 'style') return writeExternalStyleAsset(fileName, snippet, dataAttr);
  return writeExternalScriptAsset(fileName, snippet, dataAttr);
}

function materializeCombinedStyleScriptAsset(inlineHtml, styleFile, scriptFile, styleAttr, scriptAttr) {
  const snippet = String(inlineHtml || '').trim();
  if (!snippet) return '';
  const parts = [];
  const styleBody = extractInlineStyleBody(snippet);
  const scriptBody = extractInlineScriptBody(snippet);
  if (styleBody) {
    fs.writeFileSync(path.join(assetsDir, styleFile), styleBody + '\n', 'utf8');
    parts.push(`    <link rel="preload" as="style" href="assets/${styleFile}" onload="this.onload=null;this.rel='stylesheet'" ${styleAttr} data-emy-lazy-style />`);
    parts.push(`    <noscript ${styleAttr}><link rel="stylesheet" href="assets/${styleFile}" /></noscript>`);
  }
  if (scriptBody) {
    fs.writeFileSync(path.join(assetsDir, scriptFile), scriptBody + '\n', 'utf8');
    parts.push(`    <script defer src="assets/${scriptFile}" ${scriptAttr}></script>`);
  }
  return parts.join('\n');
}

function materializeAssetBundle(entries) {
  const bundle = {};
  for (const entry of entries) {
    if (entry.prebuilt) {
      bundle[entry.key] = entry.value();
      continue;
    }
    const inline = entry.value();
    bundle[entry.key] = materializeExternalAsset(inline, entry.file, {
      kind: entry.kind,
      attr: entry.attr,
    });
  }
  return bundle;
}

function versionAssetTag(tag, fileName) {
  const source = String(tag || '');
  if (!source || !fileName) return source;
  try {
    const body = fs.readFileSync(path.join(assetsDir, fileName));
    const version = require('crypto').createHash('sha256').update(body).digest('hex').slice(0, 12);
    return source.replace(`assets/${fileName}`, `assets/${fileName}?v=${version}`);
  } catch (error) {
    return source;
  }
}

const EXTERNAL_ASSET_ENTRIES = [
  { key: 'sharedPageBootGateStyle', value: () => sharedPageBootGateStyle, file: 'emy-page-boot-gate.css', kind: 'style', attr: 'data-emy-page-boot-gate' },
  { key: 'sharedPageBootGateScript', value: () => sharedPageBootGateScript, file: 'emy-page-boot-gate.js', kind: 'script', attr: 'data-emy-page-boot-gate' },
  { key: 'sharedCustomerShellSessionScript', value: () => sharedCustomerShellSessionScript, file: 'emy-customer-shell-session.js', kind: 'script', attr: 'data-emy-customer-shell-session' },
  { key: 'sharedEmyTestModeScript', value: () => sharedEmyTestModeScript, file: 'emy-test-mode.js', kind: 'script', attr: 'data-emy-test-mode' },
  { key: 'sharedCommentComposerPolishStyle', value: () => sharedCommentComposerPolishStyle, file: 'emy-comment-composer-polish.css', kind: 'style', attr: 'data-emy-comment-composer-polish' },
  { key: 'sharedCommentWritingStyle', value: () => sharedCommentWritingStyle, file: 'emy-comment-writing.css', kind: 'style', attr: 'data-emy-comment-writing' },
  { key: 'sharedCommentRepliesScript', value: () => sharedCommentRepliesScript, file: 'emy-comment-replies.js', kind: 'script', attr: 'data-emy-comment-replies' },
  { key: 'sharedDeleteConfirmScript', value: () => sharedDeleteConfirmScript, file: 'emy-delete-confirm.js', kind: 'script', attr: 'data-emy-delete-confirm' },
  { key: 'sharedItemDetailOptionsEnhancerScript', value: () => sharedItemDetailOptionsEnhancerScript, file: 'emy-item-detail-options-enhancer.js', kind: 'script', attr: 'data-emy-item-detail-options-enhancer' },
  { key: 'sharedMoreOptionsButtonScript', value: () => sharedMoreOptionsButtonScript, file: 'emy-more-options-cleaner.js', kind: 'script', attr: 'data-emy-more-options-cleaner' },
  { key: 'sharedFeedBoxWritingStyle', value: () => sharedFeedBoxWritingStyle, file: 'emy-feed-box-writing.css', kind: 'style', attr: 'data-emy-feed-box-writing' },
  { key: 'sharedProductClipGlassStyle', value: () => sharedProductClipGlassStyle, file: 'emy-product-clip-glass.css', kind: 'style', attr: 'data-emy-product-clip-glass' },
  { key: 'sharedClipCleanMediaOverlaysStyle', value: () => sharedClipCleanMediaOverlaysStyle, file: 'emy-clip-clean-media-overlays.css', kind: 'style', attr: 'data-emy-clip-clean-media-overlays' },
  { key: 'sharedClipMiniProductOverlayStyle', value: () => sharedClipMiniProductOverlayStyle, file: 'emy-clip-mini-product-overlay.css', kind: 'style', attr: 'data-emy-clip-mini-product-overlay' },
  { key: 'sharedSearchClipCardFixStyle', value: () => sharedSearchClipCardFixStyle, file: 'emy-search-clip-card-fix.css', kind: 'style', attr: 'data-emy-search-clip-card-fix' },
  { key: 'sharedBusinessClipProductMiniRestoreScript', value: () => sharedBusinessClipProductMiniRestoreScript, file: 'emy-business-clip-product-mini-restore.js', kind: 'script', attr: 'data-emy-business-clip-product-mini-restore' },
  { key: 'sharedFeedsClipSizingStyle', value: () => sharedFeedsClipSizingStyle, file: 'emy-feeds-clip-sizing.css', kind: 'style', attr: 'data-emy-feeds-clip-sizing' },
  { key: 'sharedResponsiveHoverStyle', value: () => sharedResponsiveHoverStyle, file: 'emy-responsive-hover.css', kind: 'style', attr: 'data-emy-responsive-hover-style' },
  { key: 'sharedRailSelectionStateStyle', value: () => sharedRailSelectionStateStyle, file: 'emy-rail-selection-state.css', kind: 'style', attr: 'data-emy-rail-selection-state-style' },
  { key: 'sharedRailSelectionStateScript', value: () => sharedRailSelectionStateScript, file: 'emy-rail-selection-state.js', kind: 'script', attr: 'data-emy-rail-selection-state' },
  { key: 'sharedClipHoverPreviewScript', value: () => sharedClipHoverPreviewScript, file: 'emy-clip-hover-preview.js', kind: 'script', attr: 'data-emy-clip-hover-preview' },
  { key: 'sharedClipViewerScrollRestartScript', value: () => sharedClipViewerScrollRestartScript, file: 'emy-clip-scroll-restart.js', kind: 'script', attr: 'data-emy-clip-scroll-restart' },
  { key: 'sharedModalCloseControlsStyle', value: () => sharedModalCloseControlsStyle, file: 'emy-modal-close-controls.css', kind: 'style', attr: 'data-emy-modal-close-controls' },
  { key: 'sharedModalCloseGuardScript', value: () => sharedModalCloseGuardScript, file: 'emy-modal-close-guard.js', kind: 'script', attr: 'data-emy-modal-close-guard' },
  { key: 'sharedEmySessionNavScript', value: () => sharedEmySessionNavScript, file: 'emy-account-session-nav.js', kind: 'script', attr: 'data-emy-account-session-nav' },
  { key: 'sharedAskMiniScript', value: () => sharedAskMiniScript, file: 'emy-ask-mini.js', kind: 'script', attr: 'data-emy-ask-mini' },
  { key: 'sharedEmyEmojiPickerScript', value: () => sharedEmyEmojiPickerScript, file: 'emy-emoji-picker.js', kind: 'script', attr: 'data-emy-emoji-picker' },
  { key: 'sharedEmyVideoControlsScript', value: () => sharedEmyVideoControlsScript, file: 'emy-video-controls-enhancer.js', kind: 'script', attr: 'data-emy-video-controls-enhancer' },
  { key: 'sharedBusinessVideoPopupControlsScript', value: () => sharedBusinessVideoPopupControlsScript, file: 'emy-business-video-popup-controls.css', kind: 'style', attr: 'data-emy-business-video-popup-controls' },
  { key: 'sharedEmyEventSystemScript', value: () => sharedEmyEventSystemScript, file: 'emy-event-system.js', kind: 'script', attr: 'data-emy-event-system' },
  { key: 'sharedPlatformContentSyncScript', value: () => sharedPlatformContentSyncScript, file: 'emy-platform-content-sync.js', kind: 'script', attr: 'data-emy-platform-content-sync' },
  { key: 'sharedRealDataGuardScript', value: () => sharedRealDataGuardScript, file: 'emy-real-data-guard.js', kind: 'script', attr: 'data-emy-real-data-guard' },
  { key: 'customerHomeCreateBootstrapScript', value: () => customerHomeEarlyFeedCreateScript, file: 'emy-customer-home-create-bootstrap.js', kind: 'script', attr: 'data-emy-customer-home-create-bootstrap' },
  { key: 'sharedNotificationRouterScript', value: () => sharedNotificationRouterScript, file: 'emy-notification-router.js', kind: 'script', attr: 'data-emy-notification-router' },
  { key: 'sharedPostProfileCircleRemovalStyle', value: () => sharedPostProfileCircleRemovalStyle, file: 'emy-post-profile-circle-removal.css', kind: 'style', attr: 'data-emy-post-profile-circle-removal-style' },
  { key: 'sharedBusinessLikeSyncScript', value: () => materializeCombinedStyleScriptAsset(
      sharedBusinessLikeSyncScript,
      'emy-business-like-sync.css',
      'emy-business-like-sync.js',
      'data-emy-business-like-style',
      'data-emy-business-like-sync'
    ), file: 'emy-business-like-sync.js', kind: 'script', attr: 'data-emy-business-like-sync', prebuilt: true },
  {
    key: 'sharedProductMascotLikeScript',
    value: () => materializeCombinedStyleScriptAsset(
      sharedProductMascotLikeScript,
      'emy-product-mascot-like.css',
      'emy-product-mascot-like.js',
      'data-emy-product-mascot-like-style',
      'data-emy-product-mascot-like-sync'
    ),
    file: 'emy-product-mascot-like.js',
    kind: 'script',
    attr: 'data-emy-product-mascot-like-sync',
    prebuilt: true,
  },
  { key: 'sharedPostProfileCircleRemovalScript', value: () => sharedPostProfileCircleRemovalScript, file: 'emy-post-profile-circle-removal.js', kind: 'script', attr: 'data-emy-post-profile-circle-removal' },
  { key: 'sharedCentralEngagementScript', value: () => sharedCentralEngagementScript, file: 'emy-central-engagement.js', kind: 'script', attr: 'data-emy-central-engagement' },
  { key: 'sharedSocialEngagementDisabledScript', value: () => sharedSocialEngagementDisabledScript, file: 'emy-social-engagement-disabled.js', kind: 'script', attr: 'data-emy-social-engagement-disabled' },
  { key: 'adminCloudConsoleStyle', value: () => adminCloudConsoleStyle, file: 'emy-admin-cloud-console.css', kind: 'style', attr: 'data-emy-admin-cloud-console-style' },
  { key: 'adminCloudConsoleScript', value: () => adminCloudConsoleScript, file: 'emy-admin-cloud-console.js', kind: 'script', attr: 'data-emy-admin-cloud-console' },
  {
    key: 'customerHomeClipMascotLikeStyle',
    value: () => {
      const match = String(customerHomeClipMascotLikeEnhancer || '').match(/<style[\s\S]*?<\/style>/);
      return match ? match[0] : '';
    },
    file: 'emy-home-clip-mascot-like.css',
    kind: 'style',
    attr: 'data-emy-home-clip-mascot-like',
    prebuilt: false,
  },
  {
    key: 'customerHomeClipMascotLikeScript',
    value: () => {
      const match = String(customerHomeClipMascotLikeEnhancer || '').match(/<script[\s\S]*?<\/script>/);
      return match ? match[0] : '';
    },
    file: 'emy-home-clip-mascot-like.js',
    kind: 'script',
    attr: 'data-emy-home-clip-mascot-like',
    prebuilt: false,
  },
];

const ASSETS = materializeAssetBundle(EXTERNAL_ASSET_ENTRIES);
ASSETS.sharedRealDataGuardScript = versionAssetTag(ASSETS.sharedRealDataGuardScript, 'emy-real-data-guard.js');
ASSETS.customerHomeCreateBootstrapScript = versionAssetTag(ASSETS.customerHomeCreateBootstrapScript, 'emy-customer-home-create-bootstrap.js');
ASSETS.sharedPostProfileCircleRemovalStyle = versionAssetTag(ASSETS.sharedPostProfileCircleRemovalStyle, 'emy-post-profile-circle-removal.css');
ASSETS.sharedPostProfileCircleRemovalScript = versionAssetTag(ASSETS.sharedPostProfileCircleRemovalScript, 'emy-post-profile-circle-removal.js');
globalThis.__EMY_ASSETS__ = ASSETS;

fs.writeFileSync(path.join(outDir, 'emy-account-runtime.js'), emyRealBackendRuntimeScript + '\n', 'utf8');
fs.writeFileSync(path.join(assetsDir, 'emy-real-backend-loader.js'), emyRealBackendNonBlockingLoaderRuntimeScript + '\n', 'utf8');

sharedEmyRealBackendLoaderScript = [
  '    <!-- emy-real-backend:start -->',
  '    <script data-emy-real-backend-inline defer src="emy-account-runtime.js"></script>',
  '    <script data-emy-real-backend-loader defer src="https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js"></script>',
  '    <script data-emy-real-backend-loader defer src="https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js"></script>',
  '    <script data-emy-real-backend-loader defer src="https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js"></script>',
  '    <script data-emy-real-backend-loader defer src="https://www.gstatic.com/firebasejs/10.12.5/firebase-functions-compat.js"></script>',
  '    <!-- emy-real-backend:end -->',
].join('\n');

sharedEmyRealBackendNonBlockingLoaderScript = [
  '    <!-- emy-real-backend:start -->',
  '    <script data-emy-real-backend-inline defer src="emy-account-runtime.js"></script>',
  '    <script data-emy-real-backend-loader defer src="assets/emy-real-backend-loader.js"></script>',
  '    <!-- emy-real-backend:end -->',
].join('\n');

ASSETS.sharedEmyRealBackendLoaderScript = sharedEmyRealBackendLoaderScript;
ASSETS.sharedEmyRealBackendNonBlockingLoaderScript = sharedEmyRealBackendNonBlockingLoaderScript;

fs.writeFileSync(
  path.join(assetsDir, 'asset-manifest.json'),
  JSON.stringify({
    generatedAt: new Date().toISOString(),
    files: EXTERNAL_ASSET_ENTRIES.map((entry) => entry.file),
  }, null, 2),
  'utf8'
);

const assetSourcesDir = path.join(process.cwd(), 'src', 'generator', 'asset-sources');
fs.mkdirSync(assetSourcesDir, { recursive: true });
for (const fileName of fs.readdirSync(assetsDir)) {
  if (!/\.(js|css|json)$/.test(fileName)) continue;
  fs.copyFileSync(path.join(assetsDir, fileName), path.join(assetSourcesDir, fileName));
}

{
  const homeFeedCreateBody = String(feedCreateFlowScript || '').trim();
  if (homeFeedCreateBody) {
    const fileName = 'emy-customer-home-feed-create.js';
    fs.writeFileSync(path.join(assetsDir, fileName), homeFeedCreateBody + '\n', 'utf8');
    fs.writeFileSync(path.join(assetSourcesDir, fileName), homeFeedCreateBody + '\n', 'utf8');
  }
}

{
  const homeItemDetailBody = extractInlineScriptBody(itemDetailModalScript) || String(itemDetailModalScript || '').trim();
  if (homeItemDetailBody) {
    const fileName = 'emy-customer-home-item-detail.js';
    fs.writeFileSync(path.join(assetsDir, fileName), homeItemDetailBody + '\n', 'utf8');
    fs.writeFileSync(path.join(assetSourcesDir, fileName), homeItemDetailBody + '\n', 'utf8');
  }
}

console.log(JSON.stringify({
  externalAssets: EXTERNAL_ASSET_ENTRIES.length,
  assetsDir,
  assetSourcesDir,
}, null, 2));

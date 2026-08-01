/* EMY generator section: 01-fs-write-hook.cjs (source lines 1-92) */
const fs = require('fs');
const path = require('path');

const originalWriteFileSync = fs.writeFileSync.bind(fs);
const originalRenameSync = fs.renameSync.bind(fs);
const originalUnlinkSync = fs.unlinkSync.bind(fs);
let emyAtomicWriteCounter = 0;
function waitForFileRetry(ms) {
  try {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  } catch (error) {
    const end = Date.now() + ms;
    while (Date.now() < end) {}
  }
}
function removeLegacyEngagementToolbarFeatureHtml(html) {
  let next = String(html || '');
  next = next
    .replace(/'<div class="social-feed-actions social-feed-actions-counted" data-feed-social-actions>[\s\S]*?<\/div>'\s*\+/g, "'' +")
    .replace(/"<div class=\\"social-feed-actions social-feed-actions-counted\\" data-feed-social-actions>[\s\S]*?<\\\/div>"\s*\+/g, '"" +')
    .replace(/'<div class="home-created-social" data-home-created-social>[\s\S]*?<\/div>'\s*\+/g, "'' +")
    .replace(/"<div class=\\"home-created-social\\" data-home-created-social>[\s\S]*?<\\\/div>"\s*\+/g, '"" +')
    .replace(/<div class="social-feed-actions social-feed-actions-counted" data-feed-social-actions>[\s\S]*?<\/div>/g, '')
    .replace(/<div class="social-feed-actions" data-feed-social-actions>[\s\S]*?<\/div>/g, '')
    .replace(/<div class="feed-actions" data-feed-social-actions>[\s\S]*?<\/div>/g, '')
    .replace(/<div class="home-created-social" data-home-created-social>[\s\S]*?<\/div>/g, '')
    .replace(/<button class="feed-action social-feed-comments-link" type="button" data-feed-action="comment">'\s*\+\s*commentLabel\s*\+\s*'<\/button>/g, '')
    .replace(/<button class="reel-inline-action feed-action" type="button" data-feed-action="share"[\s\S]*?<\/button>/g, '')
    .replace(/<button class=\\"reel-inline-action feed-action\\" type=\\"button\\" data-feed-action=\\"share\\"[\s\S]*?<\\\/button>/g, '')
    .replace(/<button class="feed-job-manage" type="button" data-feed-action="share">'\s*\+\s*(?:annexedSocialIcon|socialIcon)\("share"\)\s*\+\s*'Share<\/button>/g, '')
    .replace(/<button class="feed-job-manage" type="button" data-public-activity-action="share">'\s*\+\s*publicActivityIcon\("share"\)\s*\+\s*'Share<\/button>/g, '')
    .replace(/<button class="feed-job-manage" type="button" data-feed-action="share">[\s\S]*?<\/button>/g, '')
    .replace(/\n\s*const shareLabel = target === "image" \? "Share image\.\.\." : target === "video" \? "Share video\.\.\." : "Share to\.\.\.";\s*/g, '\n')
    .replace(/\n\s*'<button type="button" data-feed-option="repost">Repost to my feed<\/button>'\s*\+\s*/g, '\n')
    .replace(/\n\s*"<button type=\\"button\\" data-feed-option=\\"repost\\">Repost to my feed<\\\/button>"\s*\+\s*/g, '\n')
    .replace(/\n\s*'<button type="button" data-feed-option="share">'\s*\+\s*escape(?:Html|Text)\(shareLabel\)\s*\+\s*'<\/button>'\s*\+\s*/g, '\n')
    .replace(/\n\s*"<button type=\\"button\\" data-feed-option=\\"share\\">"\s*\+\s*escape(?:Html|Text)\(shareLabel\)\s*\+\s*"<\\\/button>"\s*\+\s*/g, '\n')
    .replace(/<button[^>]*data-feed-option="(?:repost|share)"[^>]*>[\s\S]*?<\/button>/g, '')
    .replace(/\n\s*if \(action === "repost"\) return "Repost to my feed";\s*/g, '\n')
    .replace(/\n\s*if \(action === "share"\) return "Share to\.\.\.";\s*/g, '\n')
    .replace(/\n\s*add\("repost", "Repost to my feed", false\);\s*/g, '\n')
    .replace(/\n\s*add\("share", "Share to\.\.\.", false\);\s*/g, '\n')
    .replace(/\n\s*share:\s*'\[data-feed-action="share"\], \[data-feed-share\]',?\s*/g, '\n')
    .replace(/\n\s*if \(button\.matches\("\[data-feed-share\]"\)\) return "share";\s*/g, '\n')
    .replace(/, \[data-feed-share\]/g, '')
    .replace(/<button class="reel-inline-action feed-action" type="button" data-feed-action="(?:save|like|repost)"[\s\S]*?<\/button>/g, '')
    .replace(/<button class=\\"reel-inline-action feed-action\\" type=\\"button\\" data-feed-action=\\"(?:save|like|repost)\\"[\s\S]*?<\\\/button>/g, '')
    .replace(/'<button class="reel-inline-action feed-action" type="button" data-feed-action="(?:save|like|repost)"[\s\S]*?<\/button>'\s*\+/g, "'' +")
    .replace(/"<button class=\\"reel-inline-action feed-action\\" type=\\"button\\" data-feed-action=\\"(?:save|like|repost)\\"[\s\S]*?<\\\/button>"\s*\+/g, '"" +')
    .replace(/<button class="feed-action social-feed-comments-link" type="button" data-feed-action="comment"[\s\S]*?<\/button>/g, '')
    .replace(/'<button class="feed-action social-feed-comments-link" type="button" data-feed-action="comment">[\s\S]*?<\/button>'\s*\+/g, "'' +")
    .replace(/<span class="social-feed-stat[^"]*"[^>]*data-feed-stat[^>]*>[\s\S]*?<\/span>/g, '')
    .replace(/<span class="social-feed-stat home-created-hidden-stat" data-feed-stat data-home-created-stat>[\s\S]*?<\/span>/g, '')
    .replace(/<div class="product-stats">[\s\S]*?<\/div>/g, '');
  return next;
}
const legacyEngagementToolbarRemovalStyle = String.raw`
  <style data-emy-legacy-engagement-toolbar-removal>
    [data-feed-social-actions],
    .home-created-social,
    .social-feed-actions,
    .social-feed-actions-counted,
    .social-feed-action-set,
    .social-feed-action-pair,
    .reel-inline-action[data-feed-action],
    .social-feed-comments-link,
    .product-stats,
    .feed-card [data-feed-stat],
    .home-created-card [data-feed-stat],
    .home-flow-item [data-feed-stat],
    .social-feed-card [data-feed-stat] { display: none !important; }
  </style>`;
function removeLegacyEngagementToolbarFeatureForWrite(filePath, data) {
  if (typeof data !== 'string') return data;
  const target = String(filePath || '').replace(/\\/g, '/').toLowerCase();
  if (!target.endsWith('.html')) return data;
  return removeLegacyEngagementToolbarFeatureHtml(data);
}
function shouldUseAtomicWrite(filePath, options) {
  if (typeof filePath !== 'string') return false;
  const flag = options && typeof options === 'object' ? String(options.flag || 'w') : 'w';
  if (flag && !/^w/.test(flag)) return false;
  const target = path.resolve(filePath);
  const linkedPagesRoot = path.resolve(process.cwd(), 'linked-pages') + path.sep;
  const generatedAssetSourceRoot = path.resolve(process.cwd(), 'src', 'generator', 'asset-sources') + path.sep;
  return target.startsWith(linkedPagesRoot) || target.startsWith(generatedAssetSourceRoot);
}
function atomicWriteFileSync(filePath, data, options) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);
  emyAtomicWriteCounter += 1;
  const tempPath = path.join(dir, `.${base}.${process.pid}.${Date.now()}.${emyAtomicWriteCounter}.tmp`);
  try {
    originalWriteFileSync(tempPath, data, options);
    originalRenameSync(tempPath, filePath);
  } catch (error) {
    try {
      if (fs.existsSync(tempPath)) originalUnlinkSync(tempPath);
    } catch (_) {}
    throw error;
  }
}
fs.writeFileSync = function writeFileSyncWithRetry(filePath, data, options) {
  const outputData = removeLegacyEngagementToolbarFeatureForWrite(filePath, data);
  let lastError = null;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      if (shouldUseAtomicWrite(filePath, options)) return atomicWriteFileSync(filePath, outputData, options);
      return originalWriteFileSync(filePath, outputData, options);
    } catch (error) {
      lastError = error;
      const code = String(error && error.code || '').toUpperCase();
      const isTransient = code === 'UNKNOWN' || code === 'EBUSY' || code === 'EPERM' || code === 'EACCES';
      if (!isTransient || attempt === 7) throw error;
      waitForFileRetry(80 * (attempt + 1));
    }
  }
  throw lastError;
};

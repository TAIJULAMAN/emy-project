/* EMY generator section: 03-assets.cjs (source lines 2037-2125) */
const assetsDir = path.join(outDir, 'assets');
fs.mkdirSync(assetsDir, { recursive: true });
const lockedAssetsDir = path.join(process.cwd(), 'backups', 'official-restore-may20', 'assets');
function loadPngPackage() {
  const candidates = [
    path.join(process.cwd(), 'node_modules', 'pngjs'),
    path.join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules', 'pngjs')
  ];
  for (const candidate of candidates) {
    try {
      if (candidate && fs.existsSync(candidate)) return require(candidate);
    } catch (error) {}
  }
  return null;
}
function isEdgeWhitePixel(data, index) {
  const red = data[index];
  const green = data[index + 1];
  const blue = data[index + 2];
  const alpha = data[index + 3];
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  return alpha > 0 && min >= 238 && max - min <= 24;
}
function copyAskMiniLogo(source, destination) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const pngPackage = loadPngPackage();
  if (!pngPackage || !pngPackage.PNG) {
    fs.copyFileSync(source, destination);
    return;
  }
  try {
    const png = pngPackage.PNG.sync.read(fs.readFileSync(source));
    const width = png.width;
    const height = png.height;
    const data = png.data;
    const visited = new Uint8Array(width * height);
    const queue = [];
    const enqueue = (x, y) => {
      if (x < 0 || y < 0 || x >= width || y >= height) return;
      const point = y * width + x;
      if (visited[point]) return;
      const index = point * 4;
      if (!isEdgeWhitePixel(data, index)) return;
      visited[point] = 1;
      queue.push(point);
    };
    for (let x = 0; x < width; x += 1) {
      enqueue(x, 0);
      enqueue(x, height - 1);
    }
    for (let y = 0; y < height; y += 1) {
      enqueue(0, y);
      enqueue(width - 1, y);
    }
    for (let cursor = 0; cursor < queue.length; cursor += 1) {
      const point = queue[cursor];
      const index = point * 4;
      data[index + 3] = 0;
      const x = point % width;
      const y = Math.floor(point / width);
      enqueue(x + 1, y);
      enqueue(x - 1, y);
      enqueue(x, y + 1);
      enqueue(x, y - 1);
    }
    fs.writeFileSync(destination, pngPackage.PNG.sync.write(png));
  } catch (error) {
    fs.copyFileSync(source, destination);
  }
}
const askMiniLogoAsset = 'assets/emy-ask-mini-logo.png';
const askMiniLogoMarkup = `<img src="${askMiniLogoAsset}" alt="" />`;
const askMiniLogoSource = [
  path.join(process.env.USERPROFILE || '', 'OneDrive - EMY', 'Pictures', 'Screenshots', 'Screenshot 2026-05-09 183219.png'),
  path.join(process.env.USERPROFILE || '', 'Downloads', 'Screenshot 2026-05-09 183219.png')
].find((candidate) => candidate && fs.existsSync(candidate));
if (askMiniLogoSource) {
  copyAskMiniLogo(askMiniLogoSource, path.join(assetsDir, 'emy-ask-mini-logo.png'));
  copyAskMiniLogo(askMiniLogoSource, path.join(lockedAssetsDir, 'emy-ask-mini-logo.png'));
}
const reviewLogoSource = [
  path.join(process.env.USERPROFILE || '', 'Downloads', '834c0bee-5cee-4880-ba3d-659703fe768d.png'),
  path.join(process.env.USERPROFILE || '', 'Downloads', 'ChatGPT Image May 9, 2026, 07_07_39 PM.png')
].find((candidate) => candidate && fs.existsSync(candidate));
if (reviewLogoSource) {
  fs.copyFileSync(reviewLogoSource, path.join(assetsDir, 'emy-review-logo.png'));
}

function extractInlineScriptBody(htmlSnippet) {
  const match = String(htmlSnippet || '').match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  return match ? match[1].trim() : '';
}

function extractInlineStyleBody(htmlSnippet) {
  const match = String(htmlSnippet || '').match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  return match ? match[1].trim() : '';
}

function detectInlineAssetKind(htmlSnippet) {
  return /<style[\s>]/i.test(String(htmlSnippet || '')) ? 'style' : 'script';
}

function detectInlineDataAttr(htmlSnippet) {
  const match = String(htmlSnippet || '').match(/<(script|style)\s+([^>]+)>/i);
  if (!match) return '';
  const dataMatch = match[2].match(/data-emy-[a-z0-9-]+/i);
  return dataMatch ? dataMatch[0] : '';
}

function writeExternalScriptAsset(fileName, inlineHtml, dataAttr) {
  const body = extractInlineScriptBody(inlineHtml);
  if (!body) return String(inlineHtml || '');
  fs.writeFileSync(path.join(assetsDir, fileName), body + '\n', 'utf8');
  const attr = dataAttr || detectInlineDataAttr(inlineHtml);
  return `    <script defer src="assets/${fileName}"${attr ? ` ${attr}` : ''}></script>`;
}

function writeExternalStyleAsset(fileName, inlineHtml, dataAttr) {
  const body = extractInlineStyleBody(inlineHtml);
  if (!body) return String(inlineHtml || '');
  fs.writeFileSync(path.join(assetsDir, fileName), body + '\n', 'utf8');
  const attr = dataAttr || detectInlineDataAttr(inlineHtml);
  return `    <link rel="preload" as="style" href="assets/${fileName}" onload="this.onload=null;this.rel='stylesheet'"${attr ? ` ${attr}` : ''} data-emy-lazy-style />\n    <noscript${attr ? ` ${attr}` : ''}><link rel="stylesheet" href="assets/${fileName}" /></noscript>`;
}

function stripSharedScript(html, dataAttr) {
  return String(html || '')
    .replace(new RegExp(`\\n?\\s*<script[^>]*${dataAttr}[^>]*>[\\s\\S]*?<\\/script>`, 'g'), '')
    .replace(new RegExp(`\\n?\\s*<script src="assets/[^"]+"[^>]*${dataAttr}[^>]*><\\/script>`, 'g'), '');
}

function stripSharedStyle(html, dataAttr) {
  return String(html || '')
    .replace(new RegExp(`\\n?\\s*<style[^>]*${dataAttr}[^>]*>[\\s\\S]*?<\\/style>`, 'g'), '')
    .replace(new RegExp(`\\n?\\s*<link rel="stylesheet" href="assets/[^"]+"[^>]*${dataAttr}[^>]*\\/?>`, 'g'), '');
}

function stripSharedScriptAndStyle(html, dataAttr) {
  return stripSharedStyle(stripSharedScript(html, dataAttr), dataAttr);
}

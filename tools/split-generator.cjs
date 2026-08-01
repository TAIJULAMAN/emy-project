'use strict';

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const sourcePath = path.join(projectRoot, 'generate-linked-pages.cjs');
const sectionsDir = path.join(projectRoot, 'src', 'generator', 'sections');

const SECTION_STARTS = [
  { name: '01-fs-write-hook.cjs', start: 1 },
  { name: '02-customer-home-patches.cjs', start: 93 },
  { name: '03-assets.cjs', start: 2037 },
  { name: '04-pages-config.cjs', start: 2126 },
  { name: '05-ask-session.cjs', start: 2138 },
  { name: '06-ask-ui-components.cjs', start: 2571 },
  { name: '07-ask-styles-mascots.cjs', start: 3016 },
  { name: '08-item-detail-modal-css.cjs', start: 3201 },
  { name: '09-feed-create-flow-css.cjs', start: 7707 },
  { name: '10-customer-topbar-css.cjs', start: 8533 },
  { name: '11-shared-comment-scripts.cjs', start: 8624 },
  { name: '12-customer-shell-markup.cjs', start: 12333 },
  { name: '13-item-detail-markup.cjs', start: 13008 },
  { name: '14-feed-create-flow-script.cjs', start: 13444 },
  { name: '15-media-runtimes.cjs', start: 16994 },
  { name: '16-customer-home-carousel-patches.cjs', start: 18559 },
  { name: '17-feed-edit-runtime.cjs', start: 18898 },
  { name: '18-item-detail-modal-script.cjs', start: 20032 },
  { name: '19-ask-auth-components.cjs', start: 28443 },
  { name: '20-transform-react-page.cjs', start: 28863 },
  { name: '21-linker.cjs', start: 30279 },
  { name: '22-page-template.cjs', start: 30617 },
  { name: '23-template-signin.cjs', start: 30724 },
  { name: '24-template-signup.cjs', start: 31031 },
  { name: '25-template-forgot-password.cjs', start: 32460 },
  { name: '26-template-business-profile.cjs', start: 32574 },
  { name: '27-template-customer-home.cjs', start: 51574 },
  { name: '28-template-notification-settings.cjs', start: 70367 },
  { name: '29-template-customer-search.cjs', start: 70641 },
  { name: '30-template-customer-feeds.cjs', start: 78860 },
  { name: '31-template-customer-profile.cjs', start: 84005 },
  { name: '32-template-customer-chat.cjs', start: 93052 },
  { name: '33-template-confirmation.cjs', start: 95122 },
  { name: '34-template-ask-about.cjs', start: 95549 },
  { name: '35-generate-marketing-pages.cjs', start: 96369 },
  { name: '36-template-ask-about-variants.cjs', start: 96386 },
  { name: '37-write-app-pages.cjs', start: 99416 },
  { name: '38-template-admin-backend.cjs', start: 99463 },
  { name: '39-write-admin-page.cjs', start: 101227 },
  { name: '40-shared-session-scripts.cjs', start: 101231 },
  { name: '41-shared-boot-scripts.cjs', start: 104108 },
  { name: '42-post-process-utils.cjs', start: 108400 },
  { name: '43-engagement-and-testing.cjs', start: 108434 },
  { name: '44-real-backend-runtime.cjs', start: 109445 },
  { name: '45-admin-cloud-console.cjs', start: 110978 },
  { name: '46-manifest-post-process.cjs', start: 111949 },
];

function splitGenerator() {
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const totalLines = lines.length;

  fs.mkdirSync(sectionsDir, { recursive: true });

  const manifest = [];
  for (let index = 0; index < SECTION_STARTS.length; index += 1) {
    const current = SECTION_STARTS[index];
    const nextStart = index + 1 < SECTION_STARTS.length
      ? SECTION_STARTS[index + 1].start
      : totalLines + 1;
    const startLine = current.start;
    const endLine = nextStart - 1;
    const chunk = lines.slice(startLine - 1, endLine).join('\n');
    const header = `/* EMY generator section: ${current.name} (source lines ${startLine}-${endLine}) */\n`;
    const outputPath = path.join(sectionsDir, current.name);
    fs.writeFileSync(outputPath, header + chunk + '\n', 'utf8');
    manifest.push({
      file: current.name,
      startLine,
      endLine,
      lines: endLine - startLine + 1,
      bytes: Buffer.byteLength(chunk),
    });
  }

  fs.writeFileSync(
    path.join(sectionsDir, 'manifest.json'),
    JSON.stringify({ totalSourceLines: totalLines, sections: manifest }, null, 2),
    'utf8'
  );

  console.log(JSON.stringify({
    sections: manifest.length,
    totalSourceLines: totalLines,
    sectionsDir,
  }, null, 2));
}

splitGenerator();

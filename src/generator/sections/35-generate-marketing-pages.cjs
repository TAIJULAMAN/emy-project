/* EMY generator section: 35-generate-marketing-pages.cjs (source lines 96369-96385) */
const manifest = [];
for (const page of pages) {
  const sourcePath = path.join(sourceDir, page.input);
  const source = fs.readFileSync(sourcePath, 'utf8');
  const transformed = transformReactPage(source, page);
  let html = pageTemplate({ title: page.title, standardizeHeader: page.standardizeHeader !== false, ...transformed });
  const babelScriptTag = '<script type="text/babel" data-presets="emy-react-classic">';
  const injectBeforeBabel = (markup) => {
    html = html.replace(babelScriptTag, markup + '\n    ' + babelScriptTag);
  };
  if ((page.output === 'ask-emy.html' || page.output === 'ask-emy-results.html') && !html.includes('setupEmyMediaStoreRuntime')) {
    injectBeforeBabel(`<script data-emy-media-store>\n${emyMediaStoreRuntimeScript}\n    </script>`);
  }
  if (page.output === 'ask-emy-results.html' && !html.includes('class="item-detail-modal" data-item-detail-modal')) {
    html = html.replace(
      '</head>',
      `<style data-ask-emy-item-detail>
      :root { --emy-navy: #001B47; --emy-orange: #ff6a00; }
${itemDetailModalCss}
      [data-clip-viewer-modal].clip-viewer-modal,
      [data-clip-viewer-modal].clip-viewer-modal.is-open {
        z-index: 10180;
      }
      [data-clip-viewer-close].clip-viewer-close {
        z-index: 10190;
      }
      [data-clip-viewer-modal].clip-viewer-modal.is-open {
        display: grid;
        place-items: center;
        overflow: hidden;
        background: rgba(0, 12, 32, .68);
        backdrop-filter: blur(18px) saturate(1.08);
      }
      [data-clip-viewer-modal].clip-viewer-modal.is-open [data-clip-viewer-track] {
        width: min(100vw, 980px);
        height: 100dvh;
        max-height: 100dvh;
        margin: 0 auto;
        overflow-y: auto;
        overflow-x: hidden;
        scroll-snap-type: y mandatory;
        scrollbar-width: none;
      }
      [data-clip-viewer-modal].clip-viewer-modal.is-open [data-clip-viewer-track]::-webkit-scrollbar {
        display: none;
      }
      [data-clip-viewer-modal].clip-viewer-modal.is-open .clip-viewer-slide {
        width: 100%;
        min-height: 100dvh;
        grid-template-columns: minmax(0, 300px) minmax(280px, 390px);
        justify-content: center;
        align-items: center;
        gap: 18px;
        padding: 22px 72px 22px 28px;
        overflow: hidden;
      }
      [data-clip-viewer-modal].clip-viewer-modal.is-open .clip-viewer-side {
        justify-self: end;
        max-width: 300px;
      }
      [data-clip-viewer-modal].clip-viewer-modal.is-open .clip-viewer-frame {
        justify-self: start;
        width: min(390px, calc(100vw - 112px));
        height: min(720px, calc(100dvh - 44px));
        max-height: calc(100dvh - 44px);
        overflow: hidden;
        border-radius: 22px;
        box-shadow: 0 32px 80px rgba(0, 0, 0, .46);
      }
      [data-clip-viewer-modal].clip-viewer-modal.is-open.is-ask-emy-single .clip-viewer-track {
        scroll-snap-type: none;
      }
      [data-clip-viewer-modal].clip-viewer-modal.is-open.is-ask-emy-single .clip-viewer-slide {
        scroll-snap-align: none;
      }
      [data-clip-viewer-modal].clip-viewer-modal.is-open.is-ask-emy-single .clip-viewer-frame {
        z-index: 2;
      }
      @media (max-width: 820px) {
        [data-clip-viewer-modal].clip-viewer-modal.is-open [data-clip-viewer-track] {
          width: 100vw;
        }
        [data-clip-viewer-modal].clip-viewer-modal.is-open .clip-viewer-slide,
        [data-clip-viewer-modal].clip-viewer-modal.is-open .clip-viewer-slide:has(.clip-viewer-comments-panel:not([hidden])),
        [data-clip-viewer-modal].clip-viewer-modal.is-open .clip-viewer-slide.is-comments-open {
          grid-template-columns: minmax(0, 1fr);
          justify-items: center;
          align-content: center;
          gap: 12px;
          padding: 18px 14px 24px;
        }
        [data-clip-viewer-modal].clip-viewer-modal.is-open .clip-viewer-side {
          order: 2;
          width: min(390px, calc(100vw - 28px));
          max-width: min(390px, calc(100vw - 28px));
          justify-self: center;
        }
        [data-clip-viewer-modal].clip-viewer-modal.is-open .clip-viewer-frame {
          order: 1;
          justify-self: center;
          width: min(390px, calc(100vw - 28px));
          height: min(68dvh, 650px);
          min-height: 420px;
        }
      }
    </style>
  </head>`
    );
    html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${itemDetailModalMarkup}`);
  }
  if ((page.output === 'ask-emy.html' || page.output === 'ask-emy-results.html') && !html.includes('data-ask-emy-boot')) {
    html = html.replace(
      '</head>',
      `<style data-ask-emy-boot>
      #root .ask-emy-boot {
        min-height: 100vh;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 96px 0 0 clamp(42px, 8vw, 112px);
        background: #fff8ef;
      }
      #root .ask-emy-boot-dots {
        display: inline-flex;
        align-items: center;
        gap: 7px;
      }
      #root .ask-emy-boot-dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: #ff6a00;
        animation: askEmyBootPulse 900ms ease-in-out infinite;
      }
      #root .ask-emy-boot-dot:nth-child(2) { animation-delay: 120ms; }
      #root .ask-emy-boot-dot:nth-child(3) { animation-delay: 240ms; }
      @keyframes askEmyBootPulse {
        0%, 80%, 100% { opacity: .45; transform: translateY(0); }
        40% { opacity: 1; transform: translateY(-3px); }
      }
    </style>
  </head>`
    );
    html = html.replace(
      '<div id="root"></div>',
      '<div id="root"><div class="ask-emy-boot" data-ask-emy-boot aria-label="Ask EMY is loading"><span class="ask-emy-boot-dots" aria-hidden="true"><span class="ask-emy-boot-dot"></span><span class="ask-emy-boot-dot"></span><span class="ask-emy-boot-dot"></span></span></div></div>'
    );
  }
  if (page.output === 'ask-emy-results.html' && !html.includes('setupEmyVideoPlayerRuntime')) {
    injectBeforeBabel(`<script data-emy-video-player-runtime>\n${emyVideoPlayerRuntimeScript}\n    </script>`);
  }
  if (page.output === 'ask-emy-results.html' && !html.includes('setupItemDetailModal')) {
    html = html.replace(
      '</body>',
      `    <script data-ask-emy-item-detail-runtime>\ntry {\n${itemDetailModalScript}\n} catch (error) {\n  window.emyAskItemDetailRuntimeError = error && (error.stack || error.message || String(error));\n  console.error("Ask EMY item detail runtime failed", error);\n}\n    </script>\n  </body>`
    );
  }
  const outputPath = path.join(outDir, page.output);
  fs.writeFileSync(outputPath, html, 'utf8');
  manifest.push({ page: page.output, component: transformed.componentName, bytes: Buffer.byteLength(html) });
}

/* EMY generator section: 22-page-template.cjs (source lines 30617-30723) */
function pageTemplate({ title, code, componentName, standardizeHeader = true }) {
  const headerLinkerCode = standardizeHeader ? linker : '';
  const linkedPageEffect = standardizeHeader
    ? `  React.useEffect(() => {
    __linkEMYPages();
  }, []);`
    : '';
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <script>
      (function () {
        try {
          if (new URLSearchParams(window.location.search || '').has('emyAuth')) {
            document.documentElement.setAttribute('data-emy-auth-pending', 'true');
          }
        } catch (error) {}
      })();
    </script>
    <script src="assets/vendor/tailwindcss.js"></script>
    <script src="auth-config.js"></script>
    <script crossorigin src="assets/vendor/react.production.min.js"></script>
    <script crossorigin src="assets/vendor/react-dom.production.min.js"></script>
    <script src="assets/vendor/babel.min.js"></script>
    <script src="assets/emy-babel-classic-preset.js"></script>
    <style>
      :root { --emy-page-scale: 0.85; --emy-page-shift: clamp(-220px, -10vw, -88px); }
      html { scroll-behavior: smooth; background: #fbfaf8; }
      body { margin: 0; min-height: 100vh; overflow-x: hidden; background: #fbfaf8; }
      #root { min-height: 100vh; width: 100%; }
      html[data-emy-auth-pending="true"],
      html[data-emy-auth-pending="true"] body { background: #fff8ef; }
      html[data-emy-auth-pending="true"] #root { visibility: hidden; }
      #root .font-black,
      #root .font-extrabold { font-weight: 700 !important; }
      #root .font-bold { font-weight: 600 !important; }
      #root .font-semibold { font-weight: 500 !important; }
      #root [class~="text-7xl"] { font-size: 4rem !important; line-height: 1.04 !important; }
      #root [class~="text-6xl"] { font-size: 3.4rem !important; line-height: 1.05 !important; }
      #root [class~="text-5xl"] { font-size: 2.8rem !important; line-height: 1.08 !important; }
      #root [class~="text-4xl"] { font-size: 2.15rem !important; line-height: 1.14 !important; }
      #root [class~="rounded-3xl"],
      #root [class*="rounded-[2"],
      #root [class*="rounded-[3"],
      #root [class*="rounded-[4"] { border-radius: 1.25rem !important; }
      #root [class~="rounded-2xl"],
      #root [class*="rounded-[1.5"] { border-radius: 0.9rem !important; }
      #root [class~="p-10"] { padding: 1.75rem !important; }
      #root [class~="p-8"] { padding: 1.5rem !important; }
      #root [class~="p-7"] { padding: 1.35rem !important; }
      #root [class~="p-6"] { padding: 1.2rem !important; }
      #root [class~="px-10"] { padding-left: 1.75rem !important; padding-right: 1.75rem !important; }
      #root [class~="px-8"] { padding-left: 1.45rem !important; padding-right: 1.45rem !important; }
      #root [class~="px-6"] { padding-left: 1.2rem !important; padding-right: 1.2rem !important; }
      #root [class~="py-6"] { padding-top: 1.05rem !important; padding-bottom: 1.05rem !important; }
      #root [class~="py-5"] { padding-top: 0.9rem !important; padding-bottom: 0.9rem !important; }
      #root [class~="py-4"] { padding-top: 0.78rem !important; padding-bottom: 0.78rem !important; }
      #root .shadow-2xl { box-shadow: 0 18px 45px rgba(0, 27, 71, 0.10) !important; }
      #root .shadow-xl { box-shadow: 0 12px 32px rgba(0, 27, 71, 0.08) !important; }
      #root .shadow-lg { box-shadow: 0 8px 20px rgba(0, 27, 71, 0.07) !important; }
      .emy-fullscreen-cover {
        width: 100vw;
        height: 100dvh;
      }
      .emy-visual-center {
        position: relative;
      }
      @media (min-width: 768px) {
        #root {
          width: calc(100% / var(--emy-page-scale));
          min-height: calc(100vh / var(--emy-page-scale));
          margin-left: var(--emy-page-shift);
          zoom: var(--emy-page-scale);
        }
        .emy-fullscreen-cover {
          width: calc(100vw / var(--emy-page-scale));
          height: calc(100dvh / var(--emy-page-scale));
        }
        #root [class~="md:text-7xl"] { font-size: 4.15rem !important; line-height: 1.04 !important; }
        #root [class~="md:text-6xl"] { font-size: 3.55rem !important; line-height: 1.06 !important; }
        #root [class~="md:text-5xl"] { font-size: 2.85rem !important; line-height: 1.12 !important; }
        #root [class~="md:p-12"] { padding: 2.1rem !important; }
        #root [class~="md:p-10"] { padding: 1.85rem !important; }
        #root [class~="md:p-9"] { padding: 1.7rem !important; }
        #root [class~="md:p-8"] { padding: 1.55rem !important; }
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel" data-presets="emy-react-classic">
const { useEffect, useMemo, useRef, useState } = React;
${headerLinkerCode}
${code}
function __LinkedEMYPage() {
${linkedPageEffect}
  return <${componentName} />;
}
ReactDOM.createRoot(document.getElementById('root')).render(<__LinkedEMYPage />);
    </script>
  </body>
</html>
`;
}

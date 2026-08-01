(function registerEmyBabelClassicPreset() {
  if (!window.Babel || !window.Babel.availablePlugins || !window.Babel.registerPreset) return;
  const reactJsxPlugin = window.Babel.availablePlugins["transform-react-jsx"];
  if (!reactJsxPlugin) return;
  window.Babel.registerPreset("emy-react-classic", function emyReactClassicPreset() {
    return {
      plugins: [[reactJsxPlugin, { runtime: "classic" }]]
    };
  });
})();

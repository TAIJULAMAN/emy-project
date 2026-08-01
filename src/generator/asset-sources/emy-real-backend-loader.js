(function () {
  if (window.__emyFirebaseCompatLoaderStarted) return;
  window.__emyFirebaseCompatLoaderStarted = true;
  const urls = [
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-functions-compat.js"
  ];
  function warn(error) {
    try { console.warn("[EMY real backend] Firebase compat loader skipped", error && error.message ? error.message : error); } catch (logError) {}
  }
  function finish() {
    try { window.dispatchEvent(new CustomEvent("emy:firebase-compat-loaded")); } catch (error) {}
    try {
      if (window.emyRealAuth && typeof window.emyRealAuth.ready === "function") {
        window.emyRealAuth.ready().catch(warn);
      }
    } catch (error) {
      warn(error);
    }
  }
  function load(index) {
    if (index >= urls.length) {
      finish();
      return;
    }
    const script = document.createElement("script");
    script.src = urls[index];
    script.async = false;
    script.dataset.emyRealBackendLoader = "dynamic";
    script.onload = function () { load(index + 1); };
    script.onerror = function () { warn(new Error("Could not load " + urls[index])); load(index + 1); };
    document.head.appendChild(script);
  }
  let started = false;
  function createSurfaceActive() {
    return !!document.querySelector(".feed-create-modal[aria-hidden='false'],[data-feed-create-menu][aria-hidden='false'],[data-feed-compose-source-sheet][aria-hidden='false'],[data-feed-compose-camera-sheet][aria-hidden='false']");
  }
  const start = function () {
    if (started) return;
    started = true;
    window.setTimeout(function () {
      if (createSurfaceActive()) {
        started = false;
        window.setTimeout(start, 1800);
        return;
      }
      load(0);
    }, 0);
  };
  window.emyEnsureFirebaseCompat = start;
  function scheduleStart() {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(start, { timeout: 12000 });
      return;
    }
    window.setTimeout(start, 6500);
  }
  if (document.readyState === "complete") {
    scheduleStart();
  } else {
    window.addEventListener("load", scheduleStart, { once: true });
  }
})();

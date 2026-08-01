(() => {
        if (window.__emyPageBootGateInstalled) return;
        window.__emyPageBootGateInstalled = true;
        const root = document.documentElement;
        const hasHomeGate = () => !!document.querySelector("[data-emy-home-boot-loader]");
        function afterPaint(callback) {
          if (window.requestAnimationFrame) window.requestAnimationFrame(() => window.requestAnimationFrame(callback));
          else window.setTimeout(callback, 0);
        }
        function markReady() {
          if (hasHomeGate()) return;
          root.classList.add("emy-page-real-ready");
          if (document.body && document.body.getAttribute("data-emy-page-boot-busy") === "true") {
            document.body.removeAttribute("aria-busy");
            document.body.removeAttribute("data-emy-page-boot-busy");
          }
        }
        function setBusy() {
          if (hasHomeGate() || !document.body || root.classList.contains("emy-page-real-ready")) return;
          document.body.setAttribute("aria-busy", "true");
          document.body.setAttribute("data-emy-page-boot-busy", "true");
        }
        function scheduleReady(delay) {
          let done = false;
          const run = () => {
            if (done) return;
            done = true;
            markReady();
          };
          window.setTimeout(() => afterPaint(run), delay);
          window.setTimeout(run, delay + 700);
        }
        window.__emyPageMarkReady = markReady;
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => { setBusy(); scheduleReady(180); }, { once: true });
        } else {
          setBusy();
          scheduleReady(180);
        }
        window.addEventListener("load", () => scheduleReady(120), { once: true });
        window.setTimeout(() => {
          if (root.classList.contains("emy-page-real-ready") || hasHomeGate()) return;
          root.classList.add("emy-page-real-timeout");
          markReady();
        }, 5500);
      })();

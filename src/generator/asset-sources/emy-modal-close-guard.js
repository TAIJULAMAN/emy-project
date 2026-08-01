(() => {
        if (window.__emyModalCloseGuardInstalled) return;
        window.__emyModalCloseGuardInstalled = true;
        function stopMedia(scope) {
          const root = scope || document;
          if (typeof window.emyStopAllMedia === "function") {
            try { window.emyStopAllMedia(root, "modal-close"); } catch (error) {}
          }
          if (root && root.querySelectorAll) {
            root.querySelectorAll("video,audio").forEach((media) => {
              try { media.pause(); } catch (error) {}
              try {
                media.autoplay = false;
                media.removeAttribute("autoplay");
                media.muted = true;
                media.defaultMuted = true;
                media.setAttribute("muted", "");
              } catch (error) {}
              try {
                if (Number.isFinite(media.duration) || media.readyState >= 1) media.currentTime = 0;
              } catch (error) {}
            });
          }
        }
        function closeClip(modal) {
          if (!modal) return;
          stopMedia(modal);
          modal.classList.remove("is-open");
          modal.setAttribute("aria-hidden", "true");
          const track = modal.querySelector("[data-clip-viewer-track],.clip-viewer-track");
          if (track) {
            track.innerHTML = "";
            try { track.scrollTop = 0; } catch (error) {}
          }
          document.body.classList.remove("item-detail-locked");
        }
        function closeItem(modal) {
          if (!modal) return;
          stopMedia(modal);
          delete modal.dataset.realRailOpenToken;
          modal.classList.remove("is-open", "is-product", "is-clip", "is-event", "is-job", "is-article");
          modal.setAttribute("aria-hidden", "true");
          document.body.classList.remove("item-detail-locked");
        }
        function handleClose(event) {
          const target = event && event.target;
          if (!target || !target.closest) return;
          const clipClose = target.closest("[data-clip-viewer-close],.clip-viewer-close");
          const itemClose = target.closest("[data-item-detail-close],.item-detail-close,[data-item-detail-done],.item-detail-done");
          if (!clipClose && !itemClose) return;
          if (event.preventDefault) event.preventDefault();
          if (event.stopPropagation) event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          if (clipClose) closeClip(clipClose.closest("[data-clip-viewer-modal],.clip-viewer-modal") || document.querySelector("[data-clip-viewer-modal],.clip-viewer-modal"));
          if (itemClose) closeItem(itemClose.closest("[data-item-detail-modal],.item-detail-modal") || document.querySelector("[data-item-detail-modal],.item-detail-modal"));
        }
        document.addEventListener("pointerdown", handleClose, true);
        document.addEventListener("click", handleClose, true);
      })();

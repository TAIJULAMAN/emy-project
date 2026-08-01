(() => {
        if (window.emyRailSelectionStateReady) return;
        window.emyRailSelectionStateReady = true;
        const selector = ".left-rail .my-business-row,.my-business-activity .my-business-update,.right-rail .rail-pulse-item";
        function setSelected(target) {
          const item = target && target.closest ? target.closest(selector) : null;
          if (!item) return;
          const section = item.closest(".rail-card,.my-business-activity,.right-rail") || document;
          section.querySelectorAll(".my-business-row.is-selected,.my-business-update.is-selected,.rail-pulse-item.is-selected,[data-emy-rail-selected='true']").forEach((node) => {
            if (node === item) return;
            node.classList.remove("is-selected");
            node.removeAttribute("data-emy-rail-selected");
          });
          item.classList.add("is-selected");
          item.setAttribute("data-emy-rail-selected", "true");
        }
        document.addEventListener("pointerdown", (event) => setSelected(event.target), true);
        document.addEventListener("focusin", (event) => setSelected(event.target), true);
        document.addEventListener("click", (event) => setSelected(event.target), true);
      })();

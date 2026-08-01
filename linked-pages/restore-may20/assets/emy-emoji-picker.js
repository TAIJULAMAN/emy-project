(() => {
        const recentKey = "emyEmojiRecent";
        const groups = [
          ["recent","\u25cc","Recently used",[]],
          ["smile","\u263a","Reactions",["\u{1F602}","\u{1F923}","\u{1F979}","\u{1F60A}","\u{1F600}","\u{1F603}","\u{1F604}","\u{1F601}","\u{1F606}","\u{1F605}","\u{1F642}","\u{1F609}","\u{1F60D}","\u{1F970}","\u{1F618}","\u{1F60B}","\u{1F61C}","\u{1F92A}","\u{1F60E}","\u{1F973}","\u{1F60C}","\u{1F622}","\u{1F62D}","\u{1F97A}","\u{1F64F}","\u{1F44F}","\u{1F64C}","\u{1F44D}","\u{1F44E}","\u{1F44C}","\u{1F4AA}","\u{1F440}","\u{1F499}","\u{1F9E1}","\u2764\uFE0F","\u{1F525}","\u2728","\u2B50"]],
          ["nature","\u2667","Nature",["\u{1F338}","\u{1F33A}","\u{1F33B}","\u{1F33C}","\u{1F337}","\u{1F331}","\u{1F33F}","\u{1F340}","\u{1F334}","\u{1F308}","\u2600\uFE0F","\u{1F324}\uFE0F","\u{1F319}","\u26A1","\u{1F4A7}","\u{1F30A}","\u2744\uFE0F"]],
          ["food","\u2668","Food",["\u{1F355}","\u{1F354}","\u{1F35F}","\u{1F32D}","\u{1F96A}","\u{1F32E}","\u{1F357}","\u{1F35D}","\u{1F35C}","\u{1F363}","\u{1F369}","\u{1F36A}","\u{1F382}","\u{1F36B}","\u2615","\u{1F9CB}","\u{1F964}","\u{1F37D}\uFE0F"]],
          ["activity","\u25ce","Work & fun",["\u26BD","\u{1F3C0}","\u{1F3C6}","\u{1F3AE}","\u{1F3A7}","\u{1F3A4}","\u{1F3AC}","\u{1F3A8}","\u{1F3AF}","\u{1F381}","\u{1F389}","\u{1F38A}","\u{1F6CD}\uFE0F","\u{1F4BC}","\u{1F4CC}","\u2705"]],
          ["places","\u2302","Places",["\u{1F697}","\u{1F695}","\u{1F68C}","\u{1F686}","\u2708\uFE0F","\u{1F6B2}","\u{1F3E0}","\u{1F3EA}","\u{1F3E2}","\u{1F3EC}","\u{1F4CD}","\u{1F5FA}\uFE0F","\u23F0","\u{1F4A1}","\u{1F527}","\u{1F4E6}","\u{1F4B3}","\u{1F4AC}"]],
          ["symbols","\u2261","Useful",["\u2705","\u2611\uFE0F","\u274C","\u26A0\uFE0F","\u2757","\u2753","\u{1F4AF}","\u{1F514}","\u{1F4E3}","\u{1F512}","\u{1F511}","\u{1F4DE}","\u2709\uFE0F","\u{1F4AC}","\u{1F50E}","\u2795","\u2796","\u27A1\uFE0F"]]
        ];
        const aliases = { laugh:["\u{1F602}","\u{1F923}","\u{1F606}"], smile:["\u{1F60A}","\u{1F642}","\u{1F604}","\u{1F601}"], love:["\u{1F60D}","\u{1F970}","\u2764\uFE0F"], sad:["\u{1F622}","\u{1F62D}","\u{1F97A}"], fire:["\u{1F525}"], ok:["\u{1F44C}","\u2705"], food:["\u{1F355}","\u{1F354}","\u{1F35F}","\u{1F37D}\uFE0F"], shop:["\u{1F6CD}\uFE0F","\u{1F3EA}"], car:["\u{1F697}","\u{1F695}"], money:["\u{1F4B3}","\u{1F4AF}"], message:["\u{1F4AC}","\u2709\uFE0F"] };
        let target = null, active = "recent", query = "", hideTimer = 0;
        const recent = () => { try { const value = JSON.parse(localStorage.getItem(recentKey) || "[]"); return Array.isArray(value) ? value.slice(0, 24) : []; } catch (error) { return []; } };
        const saveRecent = (emoji) => { try { localStorage.setItem(recentKey, JSON.stringify([emoji].concat(recent().filter((item) => item !== emoji)).slice(0, 24))); } catch (error) {} };
        const emojiAllowedTargetSelector = [
          "[data-chat-input]",
          "[data-business-chat-input]",
          "[data-item-product-chat-input]",
          ".feed-comment-form input",
          ".feed-comment-form textarea",
          ".feed-comment-reply-form input",
          ".feed-comment-reply-form textarea",
          ".item-product-comment-preview input",
          ".item-product-comment-preview textarea",
          ".item-product-comment-reply-form input",
          ".item-product-comment-reply-form textarea",
          ".clip-viewer-comment-form input",
          ".clip-viewer-comment-form textarea",
          ".clip-viewer-comment-reply-form input",
          ".clip-viewer-comment-reply-form textarea"
        ].join(",");
        const writable = (node) => {
          if (!node || node.disabled || node.readOnly) return null;
          if (!node.matches || !node.matches(emojiAllowedTargetSelector)) return null;
          if (node.isContentEditable) return node;
          const tag = String(node.tagName || "").toLowerCase();
          const type = String(node.getAttribute && node.getAttribute("type") || "text").toLowerCase();
          return tag === "textarea" || (tag === "input" && /^(text|search|email|tel|url)$/i.test(type)) ? node : null;
        };
        function ensure() {
          if (document.querySelector("[data-emy-emoji-root]")) return;
          const style = document.createElement("style");
          style.textContent = ".emy-emoji-trigger{position:fixed;z-index:380;width:28px;height:28px;border:1px solid rgba(0,27,71,.10);border-radius:999px;background:rgba(255,255,255,.96);color:#001b47;display:none;place-items:center;padding:0;cursor:pointer;box-shadow:0 5px 12px rgba(0,27,71,.08)}.emy-emoji-trigger.is-compact{width:24px;height:24px;border:0;background:transparent;color:#667085;box-shadow:none}.emy-emoji-trigger svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.emy-emoji-trigger.is-compact svg{width:15px;height:15px}.emy-emoji-trigger:hover,.emy-emoji-trigger.is-open{border-color:rgba(255,106,0,.34);background:#fff7f0;color:#e65f00}.emy-emoji-trigger.is-compact:hover,.emy-emoji-trigger.is-compact.is-open{background:transparent;color:#d85a00}.emy-emoji-panel{position:fixed;z-index:390;display:none;width:min(292px,calc(100vw - 20px));max-height:min(340px,calc(100dvh - 24px));overflow:hidden;border:1px solid rgba(0,27,71,.10);border-radius:14px;background:rgba(255,255,255,.99);box-shadow:0 16px 34px rgba(0,27,71,.16);backdrop-filter:blur(14px)}.emy-emoji-search{display:grid;grid-template-columns:18px minmax(0,1fr);gap:7px;align-items:center;margin:10px;border:1px solid rgba(0,27,71,.08);border-radius:999px;background:#f7f8fb;color:#667085;padding:0 10px;min-height:34px}.emy-emoji-search svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2}.emy-emoji-search input{min-width:0;border:0;background:transparent;outline:0;color:#001b47;font:inherit;font-size:13px;font-weight:560}.emy-emoji-scroll{max-height:230px;overflow:auto;padding:0 10px 10px}.emy-emoji-title{display:block;margin:9px 0 7px;color:#667085;font-size:11px;font-weight:850;text-transform:uppercase;letter-spacing:.02em}.emy-emoji-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}.emy-emoji-option{width:34px;height:32px;border:0;border-radius:9px;background:transparent;cursor:pointer;display:grid;place-items:center;font-size:21px;line-height:1}.emy-emoji-option:hover{background:#fff4e8}.emy-emoji-tabs{display:flex;gap:4px;overflow-x:auto;border-top:1px solid rgba(0,27,71,.07);padding:7px 8px;background:#fff}.emy-emoji-tab{min-width:32px;height:30px;border:0;border-radius:999px;background:transparent;color:#7a869e;cursor:pointer;font-size:15px;font-weight:800}.emy-emoji-tab.is-active{background:#fff4e8;color:#d85a00}@media(max-width:520px){.emy-emoji-panel{left:8px!important;right:8px!important;width:auto}.emy-emoji-option{width:33px;height:32px;font-size:20px}}";
          style.textContent += ".emy-emoji-trigger{width:24px;height:24px;border:0;background:rgba(255,255,255,.58);color:#4f5f7a;box-shadow:none;opacity:.82}.emy-emoji-trigger svg{width:14px;height:14px}.emy-emoji-trigger.is-compact{width:20px;height:20px;background:transparent;color:#7a869e;opacity:.72}.emy-emoji-trigger.is-compact svg{width:13px;height:13px}.emy-emoji-trigger:hover,.emy-emoji-trigger.is-open{background:rgba(255,244,232,.92);color:#d85a00;opacity:1}.emy-emoji-trigger.is-compact:hover,.emy-emoji-trigger.is-compact.is-open{background:rgba(255,244,232,.72);color:#d85a00}";
          const root = document.createElement("div");
          root.dataset.emyEmojiRoot = "true";
          root.innerHTML = '<button class="emy-emoji-trigger" type="button" tabindex="-1" data-emy-emoji-trigger aria-label="Add emoji" title="Add emoji"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8.8 9.3h.01M15.2 9.3h.01M8.6 14.1c1 1.2 2.1 1.8 3.4 1.8s2.4-.6 3.4-1.8"/></svg></button><section class="emy-emoji-panel" data-emy-emoji-panel aria-label="Emoji picker"><label class="emy-emoji-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg><input data-emy-emoji-search type="search" placeholder="Search emoji" aria-label="Search emoji"></label><div class="emy-emoji-scroll" data-emy-emoji-scroll></div><nav class="emy-emoji-tabs" data-emy-emoji-tabs aria-label="Emoji categories"></nav></section>';
          document.head.appendChild(style);
          document.body.appendChild(root);
          root.querySelector("[data-emy-emoji-trigger]").addEventListener("mousedown", (event) => event.preventDefault());
          root.querySelector("[data-emy-emoji-trigger]").addEventListener("click", togglePanel);
          root.querySelector("[data-emy-emoji-search]").addEventListener("input", (event) => { query = event.target.value.trim().toLowerCase(); render(); });
          root.querySelector("[data-emy-emoji-tabs]").addEventListener("click", (event) => {
            const tab = event.target.closest("[data-emoji-category]");
            if (!tab) return;
            active = tab.dataset.emojiCategory;
            query = "";
            root.querySelector("[data-emy-emoji-search]").value = "";
            render();
          });
          root.querySelector("[data-emy-emoji-scroll]").addEventListener("click", (event) => {
            const button = event.target.closest("[data-emoji]");
            if (button) insert(button.dataset.emoji || "");
          });
          root.addEventListener("mousedown", (event) => {
            if (!event.target.closest("[data-emy-emoji-search]")) event.preventDefault();
          });
        }
        const trigger = () => (ensure(), document.querySelector("[data-emy-emoji-trigger]"));
        const panel = () => (ensure(), document.querySelector("[data-emy-emoji-panel]"));
        function items() {
          const rec = recent();
          const all = groups.flatMap((group) => group[0] === "recent" ? rec : group[3]);
          if (query) return Array.from(new Set(Object.keys(aliases).filter((key) => key.includes(query)).flatMap((key) => aliases[key]).concat(all.filter((emoji) => emoji.includes(query)))));
          if (active === "recent") return rec.length ? rec : groups[1][3].slice(0, 14);
          return (groups.find((group) => group[0] === active) || groups[1])[3];
        }
        function render() {
          const root = document.querySelector("[data-emy-emoji-root]");
          if (!root) return;
          const label = query ? "Search" : (groups.find((group) => group[0] === active) || groups[0])[2];
          root.querySelector("[data-emy-emoji-scroll]").innerHTML = '<span class="emy-emoji-title">' + label + '</span><div class="emy-emoji-grid">' + items().map((emoji) => '<button class="emy-emoji-option" type="button" data-emoji="' + emoji + '" aria-label="Add emoji ' + emoji + '">' + emoji + '</button>').join("") + '</div>';
          root.querySelector("[data-emy-emoji-tabs]").innerHTML = groups.map((group) => '<button class="emy-emoji-tab' + (group[0] === active ? ' is-active' : '') + '" type="button" data-emoji-category="' + group[0] + '" aria-label="' + group[2] + '">' + group[1] + '</button>').join("");
        }
        function place() {
          if (!target) return;
          if (writable(target) !== target) {
            target = null;
            hideAll();
            return;
          }
          const rect = target.getBoundingClientRect();
          const button = trigger();
          const targetVisible = target.isConnected && rect.width > 0 && rect.height > 0 && rect.bottom > 4 && rect.top < window.innerHeight - 4 && rect.right > 4 && rect.left < window.innerWidth - 4;
          if (!targetVisible) {
            button.style.display = "none";
            if (panel().style.display === "block") panel().style.display = "none";
            button.classList.remove("is-open");
            return;
          }
          const compactForm = target.closest && target.closest(".feed-comment-form, .feed-comment-reply-form, .item-product-comment-preview, .item-product-comment-reply-form, .clip-viewer-comment-form, .clip-viewer-comment-reply-form");
          const size = compactForm ? 20 : 24;
          button.classList.toggle("is-compact", !!compactForm);
          button.style.display = "grid";
          if (compactForm) {
            const submit = compactForm.querySelector && compactForm.querySelector("button[type='submit']");
            const submitRect = submit ? submit.getBoundingClientRect() : null;
            const rightEdge = submitRect && submitRect.left > rect.left ? Math.min(rect.right, submitRect.left - 10) : rect.right;
            button.style.left = Math.max(rect.left + 8, Math.min(window.innerWidth - size - 8, rightEdge - size - 7)) + "px";
            button.style.top = Math.max(8, Math.min(window.innerHeight - size - 8, rect.top + (rect.height - size) / 2)) + "px";
            if (panel().style.display === "block") positionEmojiPanel();
            return;
          }
          button.style.left = Math.max(8, Math.min(window.innerWidth - size - 8, rect.right - size - 8)) + "px";
          button.style.top = Math.max(8, Math.min(window.innerHeight - size - 8, rect.bottom - size - 8)) + "px";
          if (panel().style.display === "block") positionEmojiPanel();
        }
        function positionEmojiPanel() {
          if (!target) return;
          const box = panel();
          const anchorNode = target.closest && target.closest(".feed-comment-form, .feed-comment-reply-form, .item-product-comment-preview, .item-product-comment-reply-form, .clip-viewer-comment-form, .clip-viewer-comment-reply-form") || target;
          const anchorRect = anchorNode.getBoundingClientRect();
          const wasVisible = box.style.visibility;
          if (box.style.display !== "block") box.style.display = "block";
          box.style.visibility = "hidden";
          const panelRect = box.getBoundingClientRect();
          const width = panelRect.width || Math.min(292, window.innerWidth - 20);
          const height = panelRect.height || Math.min(340, window.innerHeight - 24);
          const gap = 8;
          const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
          const maxLeft = Math.max(10, window.innerWidth - width - 10);
          const left = clamp(anchorRect.left, 10, maxLeft);
          const roomBelow = window.innerHeight - anchorRect.bottom - gap;
          const roomAbove = anchorRect.top - gap;
          let top = roomBelow >= height || roomBelow >= roomAbove ? anchorRect.bottom + gap : anchorRect.top - height - gap;
          top = clamp(top, 10, Math.max(10, window.innerHeight - height - 10));
          box.style.left = left + "px";
          box.style.top = top + "px";
          box.style.visibility = wasVisible || "";
        }
        function openPanel() {
          if (!target) return;
          const button = trigger();
          const box = panel();
          render();
          box.style.display = "block";
          positionEmojiPanel();
          button.classList.add("is-open");
          if (target && typeof target.focus === "function") target.focus({ preventScroll: true });
        }
        function togglePanel() {
          if (panel().style.display === "block") {
            panel().style.display = "none";
            trigger().classList.remove("is-open");
          } else openPanel();
        }
        function insert(emoji) {
          if (!emoji || !target) return;
          target.focus({ preventScroll: true });
          if (target.isContentEditable) document.execCommand("insertText", false, emoji);
          else if (typeof target.setRangeText === "function") {
            const start = target.selectionStart == null ? target.value.length : target.selectionStart;
            const end = target.selectionEnd == null ? start : target.selectionEnd;
            target.setRangeText(emoji, start, end, "end");
          } else target.value = String(target.value || "") + emoji;
          saveRecent(emoji);
          target.dispatchEvent(new Event("input", { bubbles: true }));
          target.dispatchEvent(new Event("change", { bubbles: true }));
          panel().style.display = "none";
          trigger().classList.remove("is-open");
          render();
          place();
        }
        function hideAll() {
          trigger().style.display = "none";
          trigger().classList.remove("is-open");
          panel().style.display = "none";
        }
        window.emyFocusEmojiTarget = (node) => {
          const next = writable(node);
          if (!next) return;
          clearTimeout(hideTimer);
          target = next;
          ensure();
          place();
          window.setTimeout(place, 0);
        };
        document.addEventListener("focusin", (event) => {
          const root = document.querySelector("[data-emy-emoji-root]");
          if (root && root.contains(event.target)) return;
          target = writable(event.target);
          if (target) { clearTimeout(hideTimer); ensure(); place(); window.setTimeout(place, 0); }
          else hideAll();
        }, true);
        document.addEventListener("click", (event) => {
          const root = document.querySelector("[data-emy-emoji-root]");
          if (root && root.contains(event.target)) return;
          const next = writable(event.target);
          if (next) { clearTimeout(hideTimer); target = next; ensure(); place(); }
          else hideAll();
        }, true);
        document.addEventListener("input", (event) => { if (event.target === target) place(); }, true);
        document.addEventListener("scroll", () => { if (target) place(); }, true);
        window.addEventListener("resize", () => { if (target) place(); });
        document.addEventListener("mousedown", (event) => {
          const root = document.querySelector("[data-emy-emoji-root]");
          if ((root && root.contains(event.target)) || writable(event.target)) {
            clearTimeout(hideTimer);
            return;
          }
          clearTimeout(hideTimer);
          hideTimer = setTimeout(hideAll, 120);
        }, true);
        document.addEventListener("keydown", (event) => { if (event.key === "Escape") hideAll(); }, true);
        ensure();
      })();

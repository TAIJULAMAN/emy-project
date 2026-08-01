(() => {
        const panel = document.querySelector("[data-ask-mini-panel]");
        if (!panel || panel.dataset.askMiniReady === "true") return;
        panel.dataset.askMiniReady = "true";
        const messages = panel.querySelector("[data-ask-mini-messages]");
        const form = panel.querySelector("[data-ask-mini-form]");
        const input = panel.querySelector("[data-ask-mini-input]");
        const closeButton = panel.querySelector("[data-ask-mini-close]");
        const triggers = () => Array.from(document.querySelectorAll("[data-open-ask-mini]"));
        const askMiniIconHtml = '<img src="assets/emy-ask-mini-logo.png" alt="" />';
        const chatKey = "emyAskSavedChats";
        const locationKey = "emyAskLocation";
        let chatId = sessionStorage.getItem("emyAskMiniChatId") || "";
        let miniMessages = [];
        let busy = false;

        function escapeHtml(value) {
          return String(value || "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
        }
        function readJson(key, fallback) {
          try {
            const parsed = JSON.parse(localStorage.getItem(key) || "");
            return parsed === undefined || parsed === null ? fallback : parsed;
          } catch (error) {
            return fallback;
          }
        }
        function writeJson(key, value) {
          try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {}
        }
        function currentLocationContext() {
          const stored = readJson(locationKey, {});
          const label = stored.location || stored.label || stored.address || localStorage.getItem("emyCustomerLocationLabel") || "Near me";
          const radius = stored.radius || localStorage.getItem("emyAskRadius") || 5;
          return { location: label, radius };
        }
        function ensureChatId() {
          if (!chatId) {
            chatId = "chat-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
            try { sessionStorage.setItem("emyAskMiniChatId", chatId); } catch (error) {}
          }
          return chatId;
        }
        function saveChat() {
          const userMessages = miniMessages.filter((item) => item.role === "user");
          if (!userMessages.length) return;
          const chats = Array.isArray(readJson(chatKey, [])) ? readJson(chatKey, []) : [];
          const id = ensureChatId();
          const title = (userMessages[0] && userMessages[0].text || "EMY chat").slice(0, 70);
          const record = {
            id,
            title,
            messages: miniMessages.map((item) => ({ role: item.role, text: item.text, results: item.results || [] })),
            updatedAt: new Date().toISOString(),
            source: "mini-chat"
          };
          const next = [record].concat(chats.filter((item) => item && item.id !== id)).slice(0, 40);
          writeJson(chatKey, next);
        }
        function resultHref(item) {
          const title = String(item && (item.title || item.name || "") || "");
          const type = String(item && (item.type || item.category || "") || "").toLowerCase();
          if (item && item.href) return item.href;
          if (type.includes("job")) return "emy-customer-search.html#jobs";
          if (type.includes("event")) return "emy-customer-search.html#events";
          if (type.includes("clip") || type.includes("reel")) return "emy-customer-search.html#reels";
          if (type.includes("business")) return "emy-customer-search.html#business";
          if (type.includes("article")) return "emy-customer-search.html#articles";
          if (title) return "emy-customer-search.html#products";
          return "emy-customer-search.html";
        }
        function resultsHtml(results) {
          const list = Array.isArray(results) ? results.slice(0, 3) : [];
          if (!list.length) return "";
          return '<div class="ask-mini-results">' + list.map((item) => {
            const title = item && (item.title || item.name || item.business || item.label) || "EMY result";
            const desc = item && (item.description || item.desc || item.place || item.location || item.category) || "Open in Search to see more.";
            return '<a class="ask-mini-result" href="' + escapeHtml(resultHref(item)) + '"><b>' + escapeHtml(title) + '</b><span>' + escapeHtml(desc) + '</span></a>';
          }).join("") + '</div>';
        }
        function renderMessage(item) {
          const role = item && item.role === "user" ? "user" : "assistant";
          const icon = role === "assistant" ? '<span class="ask-mini-icon" aria-hidden="true">' + askMiniIconHtml + '</span>' : "";
          return '<article class="ask-mini-message is-' + role + '">' + icon + '<div class="ask-mini-bubble"><p>' + escapeHtml(item && item.text || "") + '</p>' + resultsHtml(item && item.results) + '</div></article>';
        }
        function appendMessage(item) {
          miniMessages.push(item);
          if (messages) {
            messages.insertAdjacentHTML("beforeend", renderMessage(item));
            messages.scrollTop = messages.scrollHeight;
          }
          saveChat();
        }
        function setTyping(isTyping) {
          const existing = panel.querySelector("[data-ask-mini-typing]");
          if (existing) existing.remove();
          if (!isTyping || !messages) return;
          messages.insertAdjacentHTML("beforeend", '<article class="ask-mini-message is-assistant" data-ask-mini-typing><span class="ask-mini-icon" aria-hidden="true">' + askMiniIconHtml + '</span><div class="ask-mini-bubble"><p>EMY is checking...</p></div></article>');
          messages.scrollTop = messages.scrollHeight;
        }
        function apiCandidates() {
          const urls = [];
          const add = (url) => { if (url && !urls.includes(url)) urls.push(url); };
          try {
            add(window.EMY_ASK_EMY_API_URL);
            add(window.EMY_ASK_API_URL);
            add(localStorage.getItem("emyAskEmyApiUrl"));
            add(localStorage.getItem("emyAskApiUrl"));
            add(document.querySelector("meta[name='emy-ask-api-url']")?.content);
          } catch (error) {}
          if (window.location.protocol === "http:" || window.location.protocol === "https:") {
            add(window.location.origin + "/api/ask-emy");
            add("/api/ask-emy");
          }
          add("http://127.0.0.1:8779/api/ask-emy");
          add("http://localhost:8779/api/ask-emy");
          add("http://127.0.0.1:8767/api/ask-emy");
          add("http://localhost:8767/api/ask-emy");
          add("https://europe-west2-my-emy-db032.cloudfunctions.net/askEmyHttp");
          return urls;
        }
        function fallbackReply(query, reason) {
          const text = String(query || "").toLowerCase();
          const location = currentLocationContext().location || "your area";
          let tab = "products";
          if (/job|work|hiring|cv/.test(text)) tab = "jobs";
          else if (/event|book|today|tomorrow/.test(text)) tab = "events";
          else if (/clip|video|reel/.test(text)) tab = "reels";
          else if (/business|shop|store|service/.test(text)) tab = "business";
          else if (/article|read|news/.test(text)) tab = "articles";
          const prefix = reason ? "I could not reach EMY right now, so I used the saved EMY data for now. " : "";
          return {
            text: prefix + "I can help you look for " + query + " around " + location + ". I will point you toward nearby shops, products, services, events, jobs, articles, or clips from the EMY platform.",
            results: [{ title: "Open " + tab + " results", description: "See matching local EMY results.", type: tab, href: "emy-customer-search.html#" + tab }]
          };
        }
        async function ask(query) {
          const context = currentLocationContext();
          const body = JSON.stringify({
            query,
            location: context.location,
            radius: context.radius,
            history: miniMessages.slice(-8).map((item) => ({ role: item.role, text: item.text }))
          });
          let lastError = "";
          for (const endpoint of apiCandidates()) {
            try {
              const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body });
              if (!response.ok) throw new Error("EMY server returned " + response.status);
              const payload = await response.json();
              const results = Array.isArray(payload.results) ? payload.results : [];
              return {
                text: payload.answer || payload.text || "EMY found something useful.",
                results: results.length ? results : fallbackReply(query, "").results
              };
            } catch (error) {
              lastError = error && error.message ? error.message : "EMY server unreachable";
            }
          }
          return fallbackReply(query, lastError);
        }
        function setOpen(isOpen) {
          panel.classList.toggle("is-open", isOpen);
          panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
          triggers().forEach((button) => button.setAttribute("aria-expanded", isOpen ? "true" : "false"));
          if (isOpen && input) window.setTimeout(() => input.focus(), 30);
        }
        document.addEventListener("click", (event) => {
          const trigger = event.target && event.target.closest ? event.target.closest("[data-open-ask-mini]") : null;
          if (!trigger) return;
          event.preventDefault();
          event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          if (typeof window.emyPrepareAskMiniPanel === "function") {
            try { window.emyPrepareAskMiniPanel(trigger, panel); } catch (error) {}
          }
          setOpen(true);
        }, true);
        if (closeButton) closeButton.addEventListener("click", () => setOpen(false));
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape" && panel.classList.contains("is-open")) setOpen(false);
        });
        document.addEventListener("click", (event) => {
          if (!panel.classList.contains("is-open")) return;
          if (panel.contains(event.target)) return;
          if (event.target && event.target.closest && event.target.closest("[data-open-ask-mini]")) return;
          setOpen(false);
        });
        if (form) {
          async function submitQuery(value) {
            const query = String(value || "").trim();
            if (!query || busy) return;
            busy = true;
            if (input) input.value = "";
            appendMessage({ role: "user", text: query });
            setTyping(true);
            try {
              const reply = await ask(query);
              setTyping(false);
              appendMessage({ role: "assistant", text: reply.text, results: reply.results || [] });
            } finally {
              busy = false;
              if (input) input.focus();
            }
          }
          form.addEventListener("submit", async (event) => {
            event.preventDefault();
            await submitQuery(input && input.value);
          });
          panel.addEventListener("click", async (event) => {
            const prompt = event.target && event.target.closest ? event.target.closest("[data-ask-mini-prompt]") : null;
            if (!prompt) return;
            event.preventDefault();
            await submitQuery(prompt.getAttribute("data-ask-mini-prompt") || prompt.textContent);
          });
        }
      })();

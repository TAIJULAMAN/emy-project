(function () {
        if (window.__EMY_CUSTOMER_HOME_CREATE_BOOTSTRAP__) return;
        window.__EMY_CUSTOMER_HOME_CREATE_BOOTSTRAP__ = true;
        var createFlowLoading = null;
        var itemDetailLoading = null;
        function createdActorName() {
          try {
            return localStorage.getItem("emyCustomerDisplayName") || localStorage.getItem("emyCustomerName") || localStorage.getItem("emyMainSignedInEmail") || "Stephane";
          } catch (error) {
            return "Stephane";
          }
        }
        function addCreatedFeedItem(item) {
          if (typeof window.emyCustomerHomeAddCreatedFeedItem === "function") {
            return window.emyCustomerHomeAddCreatedFeedItem(item);
          }
          (window.__EMY_HOME_PENDING_CREATED_FEED_ITEMS__ || (window.__EMY_HOME_PENDING_CREATED_FEED_ITEMS__ = [])).push(item);
          return true;
        }
        function bindCreateFlow(replayButton) {
          if (typeof window.setupFeedCreateFlow !== "function") return false;
          window.setupFeedCreateFlow(addCreatedFeedItem, createdActorName);
          window.__EMY_CUSTOMER_HOME_CREATE_READY__ = true;
          if (replayButton && replayButton.dataset.emyCreateReplay !== "true") {
            replayButton.dataset.emyCreateReplay = "true";
            window.setTimeout(function () {
              try { replayButton.click(); } catch (error) {}
              replayButton.removeAttribute("aria-busy");
              delete replayButton.dataset.emyCreateReplay;
            }, 0);
          }
          return true;
        }
        function loadCreateFlow(replayButton) {
          if (replayButton) {
            window.__EMY_CUSTOMER_HOME_CREATE_ACTIVE__ = true;
            window.__EMY_CUSTOMER_HOME_CREATE_ACTIVE_AT__ = Date.now();
          }
          if (bindCreateFlow(replayButton)) return Promise.resolve(true);
          if (!createFlowLoading) {
            createFlowLoading = new Promise(function (resolve, reject) {
              var existing = document.querySelector('script[data-emy-customer-home-feed-create]');
              if (existing) {
                existing.addEventListener("load", function () { resolve(true); }, { once: true });
                existing.addEventListener("error", reject, { once: true });
                return;
              }
              var script = document.createElement("script");
              script.src = "assets/emy-customer-home-feed-create.js?v=post-click-submit-280001";
              script.async = true;
              script.setAttribute("data-emy-customer-home-feed-create", "");
              script.onload = function () { resolve(true); };
              script.onerror = reject;
              document.head.appendChild(script);
            }).then(function () {
              bindCreateFlow(replayButton);
              return true;
            }).catch(function () {
              createFlowLoading = null;
              if (replayButton) replayButton.removeAttribute("aria-busy");
              return false;
            });
          } else if (replayButton) {
            createFlowLoading.then(function () {
              bindCreateFlow(replayButton);
              replayButton.removeAttribute("aria-busy");
            });
          }
          return createFlowLoading;
        }
        function loadItemDetail() {
          if (typeof window.emyOpenItemDetail === "function") return Promise.resolve(true);
          if (!itemDetailLoading) {
            itemDetailLoading = new Promise(function (resolve, reject) {
              var existing = document.querySelector('script[data-emy-customer-home-item-detail]');
              if (existing) {
                existing.addEventListener("load", function () { resolve(true); }, { once: true });
                existing.addEventListener("error", reject, { once: true });
                return;
              }
              var script = document.createElement("script");
              script.src = "assets/emy-customer-home-item-detail.js?v=d83ec68f8f32";
              script.async = true;
              script.setAttribute("data-emy-customer-home-item-detail", "");
              script.onload = function () { resolve(true); };
              script.onerror = reject;
              document.head.appendChild(script);
            }).catch(function () {
              itemDetailLoading = null;
              return false;
            });
          }
          return itemDetailLoading;
        }
        function cleanDetailText(value) {
          return String(value || "").replace(/\s+/g, " ").trim();
        }
        function openBootstrapItemDetailFallback(card) {
          var modal = document.querySelector("[data-item-detail-modal]");
          if (!modal || !card || !card.dataset) return false;
          var data = card.dataset;
          var kindText = cleanDetailText(data.detailKind || "Details");
          var lowerKind = kindText.toLowerCase();
          if (lowerKind.indexOf("clip") >= 0 || (card.matches && card.matches(".reel-card,.feed-card.is-clip,.feed-clip-card,.feed-product-clip-card,.business-posted-clip-card,.business-preview-card-reel,.search-reel-card,.social-feed-card.is-clip,[data-detail-kind='Clip'],[data-detail-kind='Product Clip']"))) return false;
          var titleText = cleanDetailText(data.detailTitle || card.textContent || "Details");
          var businessText = cleanDetailText(data.detailBusiness || data.businessKey || "");
          var descriptionText = cleanDetailText(data.detailDescription || titleText);
          var priceText = cleanDetailText(data.detailPrice);
          var setText = function (selector, value, hideWhenEmpty) {
            var node = modal.querySelector(selector);
            if (!node) return;
            node.textContent = value || "";
            if (hideWhenEmpty) node.hidden = !value;
          };
          var close = function () {
            delete modal.dataset.realRailOpenToken;
            modal.classList.remove("is-open", "is-product", "is-business", "is-post", "is-job", "is-event", "is-article", "is-text-post", "is-media-post", "is-owned-post");
            modal.setAttribute("aria-hidden", "true");
            if (document.body) document.body.classList.remove("item-detail-locked");
          };
          var closeButton = modal.querySelector("[data-item-detail-close]");
          if (closeButton && modal.dataset.bootstrapDetailCloseBound !== "true") {
            modal.dataset.bootstrapDetailCloseBound = "true";
            closeButton.addEventListener("click", close);
            modal.addEventListener("click", function (event) { if (event.target === modal) close(); });
          }
          modal.classList.toggle("is-product", lowerKind.indexOf("product") >= 0);
          modal.classList.toggle("is-post", lowerKind.indexOf("post") >= 0);
          modal.classList.toggle("is-job", lowerKind.indexOf("job") >= 0 || lowerKind.indexOf("hiring") >= 0);
          modal.classList.toggle("is-event", lowerKind.indexOf("event") >= 0);
          modal.classList.toggle("is-article", lowerKind.indexOf("article") >= 0);
          setText("[data-item-detail-kind]", kindText, false);
          setText("[data-item-detail-title]", titleText, false);
          setText("[data-item-detail-business]", businessText, true);
          setText("[data-item-detail-description]", descriptionText, true);
          setText("[data-item-detail-price]", priceText, true);
          var productPanel = modal.querySelector("[data-item-product-panel]");
          if (productPanel) productPanel.hidden = !(lowerKind.indexOf("product") >= 0 || lowerKind.indexOf("post") >= 0 || lowerKind.indexOf("article") >= 0);
          setText("[data-item-product-seller]", businessText || "Business", false);
          setText("[data-item-product-seller-status]", kindText, false);
          var art = modal.querySelector("[data-item-detail-media]");
          if (art) {
            art.className = "item-detail-art";
            art.hidden = true;
            art.innerHTML = "";
          }
          var openToken = String(Date.now()) + "-" + Math.random().toString(36).slice(2);
          modal.dataset.realRailOpenToken = openToken;
          var markOpen = function () {
            if (modal.dataset.realRailOpenToken !== openToken) return;
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            if (document.body) document.body.classList.add("item-detail-locked");
          };
          markOpen();
          [0, 80, 250, 650].forEach(function (delay) { window.setTimeout(markOpen, delay); });
          if (window.requestAnimationFrame) window.requestAnimationFrame(markOpen);
          return true;
        }
        function createButtonFromEvent(event) {
          var target = event && event.target;
          return target && target.closest ? target.closest("[data-feed-create-open]") : null;
        }
        function setCreateMenuOpen(open) {
          var menu = document.querySelector("[data-feed-create-menu]");
          if (!menu) return false;
          menu.classList.toggle("is-open", !!open);
          menu.setAttribute("aria-hidden", open ? "false" : "true");
          if (document.body) document.body.classList.toggle("is-feed-create-open", !!open);
          return true;
        }
        document.addEventListener("click", function (event) {
          var button = createButtonFromEvent(event);
          if (!button || button.dataset.bound === "true" || button.dataset.emyCreateReplay === "true") return;
          event.preventDefault();
          event.stopPropagation();
          if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
          window.__EMY_CUSTOMER_HOME_CREATE_ACTIVE__ = true;
          window.__EMY_CUSTOMER_HOME_CREATE_ACTIVE_AT__ = Date.now();
          setCreateMenuOpen(true);
        }, true);
        document.addEventListener("click", function (event) {
          var target = event && event.target;
          var detailTrigger = target && target.closest ? target.closest("[data-feed-open], [data-open-item-detail]") : null;
          if (!detailTrigger || detailTrigger.dataset.emyDetailReplay === "true" || typeof window.emyOpenItemDetail === "function") return;
          if (detailTrigger.closest("[data-item-detail-modal], [data-feed-create-menu], .feed-create-modal")) return;
          var card = detailTrigger.closest("[data-feed-id], [data-card]");
          if (!card) return;
          var openedFallback = typeof window.emyOpenRealRailItemDetailFallback === "function"
            ? window.emyOpenRealRailItemDetailFallback(card)
            : openBootstrapItemDetailFallback(card);
          if (openedFallback) {
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
            detailTrigger.setAttribute("aria-busy", "true");
            loadItemDetail().then(function () {
              detailTrigger.removeAttribute("aria-busy");
              if (typeof window.emyOpenItemDetail === "function") window.emyOpenItemDetail(card);
            });
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
          detailTrigger.setAttribute("aria-busy", "true");
          loadItemDetail().then(function () {
            detailTrigger.removeAttribute("aria-busy");
            if (typeof window.emyOpenItemDetail === "function") {
              window.emyOpenItemDetail(card);
              return;
            }
            detailTrigger.dataset.emyDetailReplay = "true";
            window.setTimeout(function () {
              try { detailTrigger.click(); } catch (error) {}
              delete detailTrigger.dataset.emyDetailReplay;
            }, 0);
          });
        }, true);
        document.addEventListener("click", function (event) {
          var target = event && event.target;
          var choice = target && target.closest ? target.closest("[data-feed-create-choice]") : null;
          if (!choice || window.__EMY_CUSTOMER_HOME_CREATE_READY__ || choice.dataset.emyCreateReplay === "true") return;
          event.preventDefault();
          event.stopPropagation();
          if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
          choice.setAttribute("aria-busy", "true");
          loadCreateFlow().then(function () {
            choice.dataset.emyCreateReplay = "true";
            window.setTimeout(function () {
              try { choice.click(); } catch (error) {}
              choice.removeAttribute("aria-busy");
              delete choice.dataset.emyCreateReplay;
            }, 0);
          });
        }, true);
        document.addEventListener("click", function (event) {
          var closeTarget = event && event.target && event.target.closest ? event.target.closest("[data-feed-create-close], [data-feed-compose-source-close], [data-feed-compose-camera-close], [data-feed-compose-camera-cancel], [data-feed-post-cancel]") : null;
          if (closeTarget) {
            setCreateMenuOpen(false);
            window.setTimeout(function () { window.__EMY_CUSTOMER_HOME_CREATE_ACTIVE__ = false; }, 450);
          }
        }, true);
      })();

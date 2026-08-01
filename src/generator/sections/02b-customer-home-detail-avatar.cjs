/* EMY customer home: clip-edit runtime injected by stripCustomerHomeDemoTemplates (02e) */
const lockedCustomerHomeClipEditRuntimePatch = String.raw`
          function feedEditLooksProductClip(card, source, kindText) {
            const data = card && card.dataset || {};
            const className = card && card.className || "";
            const text = [
              kindText,
              data.detailKind,
              data.detailTitle,
              source && source.tag,
              source && source.kindLabel,
              source && source.clipKind,
              source && source.reelKind,
              source && source.clipType,
              source && source.postMode
            ].join(" ").toLowerCase();
            return !!(
              source && (source.productClip === true || source.isProductClip === true || source.productClipDetails) ||
              /\bproduct\s*clip\b|\bproduct\s*video\b|\bclip\s*product\b/.test(text) ||
              /feed-product-clip-card/.test(className) ||
              source && (source.productName || source.productTitle || source.productDescription || source.productInfo || source.price || source.priceText) ||
              data.detailPrice
            );
          }
          function feedEditClipFrame(card, source, media) {
            const data = card && card.dataset || {};
            const first = (window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(source || {}) : [])[0] || {};
            const settings = media && media.settings || first.settings || source && source.mediaSettings || {};
            const direct = source && (source.clipFrame || source.frame || source.reelFrame) || data.clipFrame || first.clipFrame || settings.clipFrame || "";
            const frame = normalisePostClipFrame(direct);
            if (frame) return frame;
            return String(settings.aspect || "").replace(/\s+/g, "") === "9/16" ? "phone" : "original";
          }
          function feedEditClipProductDetails(card, source) {
            const data = card && card.dataset || {};
            const details = source && source.productClipDetails && typeof source.productClipDetails === "object" ? source.productClipDetails : {};
            return Object.assign({}, details, {
              productName: details.productName || source && (source.productName || source.productTitle) || data.detailTitle || "",
              productTitle: details.productTitle || details.productName || source && (source.productTitle || source.productName) || data.detailTitle || "",
              productDescription: details.productDescription || source && (source.productDescription || source.productInfo || source.description || source.text) || data.detailDescription || "",
              productInfo: details.productInfo || source && (source.productInfo || source.productDescription) || data.detailDescription || "",
              priceText: details.priceText || source && (source.priceText || source.price) || data.detailPrice || "",
              price: details.price || source && (source.price || source.priceText) || data.detailPrice || "",
              priceAmount: details.priceAmount || source && source.priceAmount || "",
              currencyCode: details.currencyCode || source && (source.currencyCode || source.currency || source.priceCurrency) || "GBP",
              currency: details.currency || source && (source.currency || source.currencyCode || source.priceCurrency) || "GBP",
              priceCurrency: details.priceCurrency || source && (source.priceCurrency || source.currencyCode || source.currency) || "GBP",
              availability: details.availability || source && (source.availability || source.stockStatus) || "",
              stockStatus: details.stockStatus || source && (source.stockStatus || source.availability) || "",
              category: details.category || source && (source.category || source.productCategory || source.productType) || "",
              productCategory: details.productCategory || source && (source.productCategory || source.category || source.productType) || ""
            });
          }
          function feedEditOpenClip(card, source, options) {
            const kindText = feedEditKindText(card, options || {}, source);
            const media = feedEditMedia(card, source, kindText);
            const frame = feedEditClipFrame(card, source || {}, media);
            const productClip = feedEditLooksProductClip(card, source || {}, kindText);
            feedEditSetTarget(card, source || {}, kindText || "clip");
            closeEverything(false);
            syncActorLabels();
            clearPostMedia(false);
            postIsClipComposer = true;
            activeClipFrame = normalisePostClipFrame(frame);
            pendingClipFrame = activeClipFrame;
            activeClipKind = productClip ? "product" : "business";
            pendingClipKind = activeClipKind;
            setClipFrameSelection(activeClipFrame);
            setClipKindSelection(activeClipKind);
            setClipProductDetails(productClip ? feedEditClipProductDetails(card, source || {}) : {});
            if (postText) postText.value = source && (source.text || source.caption || source.shareText) || (card && card.dataset && card.dataset.detailDescription) || "";
            postMediaSrc = media.src || "";
            postMediaRef = media.ref || "";
            postMediaType = "video";
            postMediaSettings = Object.assign(postClipMediaSettings("video", activeClipFrame), media.settings || {}, { clipFrame: activeClipFrame });
            setPostMode("video", false);
            const cardMediaItems = feedEditMediaItemsFromCard(card);
            const sourceMediaItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(source || {}) : [];
            const editMediaItems = cardMediaItems.length ? cardMediaItems : sourceMediaItems;
            if (editMediaItems.length) {
              postMediaItems = editMediaItems.map((item) => {
                const type = String(item.type || item.mediaType || media.type || "video").toLowerCase().indexOf("video") >= 0 ? "video" : "image";
                const settings = Object.assign(postClipMediaSettings(type, activeClipFrame), item.settings || media.settings || {}, { clipFrame: activeClipFrame });
                return {
                  type,
                  src: item.src || item.mediaSrc || item.video || item.image || item.url || "",
                  ref: item.ref || item.mediaRef || item.videoRef || item.imageRef || "",
                  name: item.name || "",
                  posterSrc: item.posterRef || item.thumbnailRef ? "" : (item.posterSrc || item.thumbnailSrc || ""),
                  posterRef: item.posterRef || item.thumbnailRef || "",
                  clipFrame: activeClipFrame,
                  settings
                };
              }).filter((item) => item.src || item.ref);
              postActiveMediaIndex = 0;
              renderPostMediaPreview();
            } else if (postMediaSrc || postMediaRef) {
              showPostMediaPreview(postMediaSrc, "video", postMediaRef);
            }
            if (!postMediaSrc && postMediaRef) feedEditResolve(postMediaRef, (url, resolvedType) => {
              if (!url) return;
              postMediaSrc = url;
              postMediaType = "video";
              const active = syncPostActiveMedia(postActiveMediaIndex);
              if (active) {
                active.src = url;
                active.type = "video";
                active.settings = Object.assign(postClipMediaSettings("video", activeClipFrame), active.settings || {}, { clipFrame: activeClipFrame });
              }
              showPostMediaPreview(postMediaSrc, "video", postMediaRef);
              updatePostReady();
            });
            setOpen(postSheet, true);
            updatePostReady();
            if (productClip && clipProductName) window.setTimeout(() => clipProductName.focus(), 30);
            else if (postText) window.setTimeout(() => postText.focus(), 30);
            return true;
          }
`;

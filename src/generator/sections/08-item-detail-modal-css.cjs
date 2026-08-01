/* EMY generator section: 08-item-detail-modal-css.cjs (source lines 3201-7706) */
const itemDetailModalCss = String.raw`
      body.item-detail-locked { overflow: hidden; }
      body.item-detail-locked .home-carousel-arrow,
      body.item-detail-locked .business-preview-arrow,
      body.item-detail-locked .business-arrow {
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      .product-card, .post-card, .reel-card, .business-card, [data-card], .feed-card, .business-preview-card:not(.business-preview-profile-card) { cursor: pointer; }
      .reel-type-badge { display: none !important; }
      .reel-actions span,
      .search-reel-actions span {
        cursor: pointer;
        border-radius: 999px;
        transition: color .16s ease, background .16s ease, transform .16s ease;
      }
      .reel-actions span:hover,
      .search-reel-actions span:hover,
      .reel-actions span.is-active,
      .search-reel-actions span.is-active {
        color: #fff;
        background: rgba(255,255,255,.16);
        transform: translateY(-1px);
      }
      .business-customer-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-height: 33px;
        border: 1px solid rgba(15,143,87,.18);
        border-radius: 999px;
        background: #effaf4;
        color: #0f7a45;
        padding: 0 11px;
        font-size: 11.5px;
        line-height: 1;
        font-weight: 820;
        box-shadow: 0 8px 18px rgba(15,143,87,.08);
      }
      .business-customer-badge::before {
        content: "";
        width: 7px;
        height: 7px;
        border-radius: 999px;
        background: #10b981;
        box-shadow: 0 0 0 3px rgba(16,185,129,.13);
      }
      .business-customer-badge[hidden] { display: none !important; }
      .item-detail-modal {
        position: fixed;
        inset: 0;
        z-index: 220;
        display: grid;
        place-items: center;
        padding: 22px;
        background: rgba(0,27,71,.34);
        backdrop-filter: blur(10px);
        opacity: 0;
        pointer-events: none;
        transition: opacity .18s ease;
      }
      .item-detail-modal.is-open { opacity: 1 !important; pointer-events: auto; z-index: 10090; transition: none; }
      .item-detail-modal.is-product .item-detail-card {
        width: min(1060px, 100%);
        max-height: min(820px, calc(100dvh - 44px));
        overflow: hidden;
      }
      .item-detail-card {
        position: relative;
        width: min(650px, 100%);
        max-height: min(760px, calc(100dvh - 44px));
        overflow: auto;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 18px;
        background: radial-gradient(circle at 84% 10%, rgba(255,106,0,.11), transparent 140px), linear-gradient(180deg, rgba(255,255,255,.98), rgba(255,253,248,.97));
        box-shadow: 0 28px 80px rgba(0,27,71,.26), 0 18px 38px rgba(255,106,0,.10);
      }
      .item-detail-close {
        position: absolute;
        right: 13px;
        top: 13px;
        z-index: 40;
        width: 36px;
        height: 36px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 999px;
        background: rgba(255,255,255,.92);
        color: var(--emy-navy);
        cursor: pointer;
        display: grid;
        place-items: center;
        font-size: 19px;
        line-height: 1;
        font-weight: 650;
        box-shadow: 0 10px 24px rgba(0,27,71,.10);
      }
      .item-detail-close-label { display: none; }
      .item-detail-close-x { display: block; }
      .item-detail-more {
        position: absolute;
        right: 56px;
        top: 13px;
        z-index: 41;
        width: 36px;
        height: 36px;
        padding: 0;
        border: 1px solid rgba(255,255,255,.74);
        border-radius: 999px;
        background: linear-gradient(145deg, rgba(255,255,255,.88), rgba(255,250,244,.68));
        color: var(--emy-navy);
        cursor: pointer;
        display: grid;
        place-items: center;
        line-height: 0;
        box-shadow: 0 14px 30px rgba(0,27,71,.14), inset 0 1px 0 rgba(255,255,255,.92);
        backdrop-filter: blur(18px) saturate(1.14);
        -webkit-backdrop-filter: blur(18px) saturate(1.14);
        transition: transform .18s ease, color .18s ease, border-color .18s ease, background .18s ease, box-shadow .18s ease;
      }
      .item-detail-more svg {
        width: 18px;
        height: 18px;
        display: block;
        fill: currentColor;
        pointer-events: none;
      }
      .item-detail-more:hover,
      .item-detail-more[aria-expanded="true"] {
        color: var(--emy-orange);
        border-color: rgba(255,106,0,.30);
        background: linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,244,235,.86));
        box-shadow: 0 16px 34px rgba(255,106,0,.16), inset 0 1px 0 rgba(255,255,255,.94);
        transform: translateY(-1px);
      }
      .item-detail-options-menu {
        position: fixed;
        right: auto;
        left: 0;
        top: 0;
        z-index: 10120;
        width: min(260px, calc(100vw - 24px));
        max-height: calc(100dvh - 24px);
        overflow: auto;
        border: 1px solid rgba(255,255,255,.72);
        border-radius: 16px;
        background: linear-gradient(145deg, rgba(255,255,255,.88), rgba(255,250,244,.66));
        box-shadow: 0 18px 36px rgba(0,27,71,.14), inset 0 1px 0 rgba(255,255,255,.88), inset 0 -12px 24px rgba(0,27,71,.04);
        padding: 7px;
        backdrop-filter: blur(22px) saturate(1.16);
        -webkit-backdrop-filter: blur(22px) saturate(1.16);
      }
      .item-detail-options-menu[hidden] { display: none !important; }
      .item-detail-options-menu button {
        width: 100%;
        min-height: 36px;
        border: 0;
        border-radius: 11px;
        background: transparent;
        color: #26364f;
        cursor: pointer;
        padding: 0 11px;
        text-align: left;
        font: inherit;
        font-size: 12.5px;
        line-height: 1;
        font-weight: 680;
      }
      .item-detail-options-menu button:hover {
        background: rgba(255,255,255,.82);
        color: var(--emy-orange);
        box-shadow: inset 0 0 0 1px rgba(255,106,0,.10);
      }
      .item-detail-options-menu button.is-danger { color: #ef3f4a; font-weight: 760; }
      .item-detail-layout { display: grid; grid-template-columns: minmax(220px, .88fr) minmax(0, 1fr); gap: 18px; padding: 18px; }
      .item-detail-modal.is-product .item-detail-layout {
        height: min(820px, calc(100dvh - 44px));
        grid-template-columns: minmax(280px, .9fr) minmax(0, 1fr);
        gap: 20px;
      }
      .item-detail-art {
        min-height: 320px;
        border-radius: 14px;
        background: linear-gradient(135deg, #eef3f7, #fff);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.85), 0 18px 42px rgba(0,27,71,.14);
        overflow: hidden;
        position: relative;
      }
      .item-detail-art::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 48%, rgba(0,27,71,.10)); pointer-events: none; }
      .item-detail-art img, .item-detail-art video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .emy-video-player { position: absolute; inset: 0; z-index: 1; display: block; overflow: hidden; border-radius: inherit; background: radial-gradient(circle at 24% 16%, rgba(255,106,0,.18), transparent 28%), linear-gradient(180deg, #101828 0%, #071326 100%); color: #fff; isolation: isolate; }
      .emy-video-player video { position: absolute; inset: 0; z-index: 1; display: block; width: 100%; height: 100%; object-fit: contain; background: #071326; }
      .emy-video-player.is-quality-hd video { filter: contrast(1.05) saturate(1.08); }
      .emy-video-player.is-quality-data video { filter: saturate(.92) contrast(.98); }
      .emy-video-player.is-muted [data-sound-wave],
      .emy-video-player:not(.is-muted) [data-muted-mark] { display: none; }
      .emy-video-player::after { content: ""; position: absolute; inset: auto 0 0; z-index: 2; height: 42%; background: linear-gradient(180deg, transparent, rgba(0,27,71,.78)); opacity: 0; pointer-events: none; transition: opacity .16s ease; }
      .emy-video-player:hover::after,
      .emy-video-player:focus-within::after,
      .emy-video-player.is-controls-visible::after,
      .emy-video-player.is-expanded-fullscreen::after { opacity: 1; }
      .emy-video-surface { position: absolute; inset: 0; z-index: 3; border: 0; background: transparent; color: #fff; cursor: pointer; }
      .emy-video-big-play { display: none !important; }
      .emy-video-big-play svg { width: 25px; height: 25px; margin-left: 3px; fill: currentColor; }
      .emy-video-player.is-playing .emy-video-big-play { opacity: 0; transform: translate(-50%, -50%) scale(.92); }
      .emy-video-controls { position: absolute; left: 12px; right: 12px; bottom: 11px; z-index: 5; display: grid; grid-template-columns: auto minmax(0,1fr) auto auto auto auto; align-items: center; gap: 9px; padding: 8px 9px; border: 1px solid rgba(255,255,255,.18); border-radius: 15px; background: rgba(0,27,71,.62); backdrop-filter: blur(15px) saturate(1.18); box-shadow: 0 14px 34px rgba(0,0,0,.18); opacity: 0; pointer-events: none; transform: translateY(7px); transition: opacity .16s ease, transform .16s ease; }
      .emy-video-player:hover .emy-video-controls,
      .emy-video-player:focus-within .emy-video-controls,
      .emy-video-player:not(.is-playing) .emy-video-controls,
      .emy-video-player.is-controls-visible .emy-video-controls,
      .emy-video-player.is-expanded-fullscreen .emy-video-controls { opacity: 1; pointer-events: auto; transform: translateY(0); }
      .emy-video-control { width: 30px; height: 30px; display: grid; place-items: center; border: 0; border-radius: 999px; background: rgba(255,255,255,.12); color: #fff; cursor: pointer; }
      .emy-video-control:hover { background: rgba(255,106,0,.92); }
      .emy-video-player.is-sound-on [data-emy-video-mute],
      .emy-video-player.is-expanded-fullscreen [data-emy-video-fullscreen] { background: rgba(255,106,0,.95); color: #fff; }
      .emy-video-player.is-muted [data-emy-video-mute] { background: rgba(255,255,255,.16); color: rgba(255,255,255,.92); }
      .emy-video-control svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2.1; stroke-linecap: round; stroke-linejoin: round; }
      .emy-video-player.is-playing [data-emy-video-play] .play-icon { display: none; }
      .emy-video-player:not(.is-playing) [data-emy-video-play] .pause-icon { display: none; }
      .emy-video-progress { width: 100%; height: 4px; accent-color: var(--emy-orange, #ff6a00); cursor: pointer; }
      .emy-video-time { min-width: 70px; color: rgba(255,255,255,.88); font-size: 11px; line-height: 1; font-weight: 760; text-align: center; font-variant-numeric: tabular-nums; }
      .emy-video-quality { min-height: 28px; max-width: 74px; border: 1px solid rgba(255,255,255,.20); border-radius: 999px; background: rgba(255,255,255,.12); color: #fff; padding: 0 8px; font: inherit; font-size: 10.5px; font-weight: 820; outline: none; }
      .emy-video-quality option { color: #071326; }
      .emy-video-player.is-quality-hd .emy-video-quality { border-color: rgba(255,106,0,.70); background: rgba(255,106,0,.28); }
      .emy-video-player.is-quality-data .emy-video-quality { border-color: rgba(255,255,255,.28); background: rgba(255,255,255,.18); }
      .emy-video-player:fullscreen, .emy-video-player:-webkit-full-screen { inset: 0; width: 100%; height: 100%; border-radius: 0; background: #071326; }
      .emy-video-player:fullscreen video, .emy-video-player:-webkit-full-screen video { object-fit: contain; }
      body.emy-video-fullscreen-lock { overflow: hidden; }
      .emy-video-player.is-expanded-fullscreen { position: fixed !important; inset: 10px !important; z-index: 9999; width: auto !important; height: auto !important; border-radius: 18px; box-shadow: 0 30px 90px rgba(0,27,71,.48); }
      .emy-video-player.is-expanded-fullscreen video { object-fit: contain; }
      .emy-video-error { position: absolute; left: 14px; right: 14px; top: 14px; z-index: 6; border-radius: 12px; background: rgba(255,244,232,.94); color: #7a2e00; padding: 10px 12px; font-size: 12px; line-height: 1.35; font-weight: 760; box-shadow: 0 12px 28px rgba(0,27,71,.16); }
      .emy-video-error[hidden] { display: none; }
      .feed-media .emy-video-player,
      .social-feed-media .emy-video-player,
      .home-created-media .emy-video-player,
      .item-detail-art .emy-video-player { position: absolute; inset: 0; }
      .feed-media-carousel {
        position: absolute;
        inset: 0;
        z-index: 1;
        overflow: hidden;
        border-radius: inherit;
        background: #101828;
        color: #fff;
        isolation: isolate;
        contain: layout style paint;
        transform: none;
        pointer-events: auto;
      }
      .feed-media-carousel-slide {
        position: absolute;
        inset: 0;
        opacity: 0;
        pointer-events: none;
        transform: none;
        transition: none;
        will-change: auto;
      }
      .feed-media-carousel-slide.is-active {
        opacity: 1;
        pointer-events: auto;
        transform: none;
      }
      .feed-media .emy-video-player,
      .social-feed-media .emy-video-player,
      .home-created-media .emy-video-player,
      .feed-media-carousel .emy-video-player {
        pointer-events: none;
      }
      .feed-media .emy-video-player .emy-video-controls,
      .feed-media .emy-video-player .emy-video-volume-wrap,
      .social-feed-media .emy-video-player .emy-video-controls,
      .social-feed-media .emy-video-player .emy-video-volume-wrap,
      .home-created-media .emy-video-player .emy-video-controls,
      .home-created-media .emy-video-player .emy-video-volume-wrap,
      .feed-media-carousel .emy-video-player .emy-video-controls,
      .feed-media-carousel .emy-video-player .emy-video-volume-wrap {
        pointer-events: auto;
      }
      .feed-media .emy-video-surface,
      .social-feed-media .emy-video-surface,
      .home-created-media .emy-video-surface,
      .feed-media-carousel .emy-video-surface {
        pointer-events: none !important;
      }
      .feed-media-carousel .emy-video-player .emy-video-controls {
        transform: translateY(0);
        transition: none;
        opacity: 0;
        pointer-events: none;
      }
      .feed-media-carousel .emy-video-player:not(.is-playing) .emy-video-controls,
      .feed-media-carousel .emy-video-player:not(.is-playing):hover .emy-video-controls,
      .feed-media-carousel .emy-video-player:not(.is-playing).is-controls-visible .emy-video-controls {
        opacity: 0;
        pointer-events: none;
        transform: translateY(0);
      }
      .feed-media-carousel .emy-video-player.is-playing:focus-within .emy-video-controls,
      .feed-media-carousel .emy-video-player.is-playing.is-controls-visible .emy-video-controls,
      .feed-media-carousel .emy-video-player.is-playing:hover .emy-video-controls {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
        transition: opacity .16s ease;
      }
      .feed-media-carousel .emy-video-player::after,
      .feed-media-carousel .emy-video-player:hover::after,
      .feed-media-carousel .emy-video-player.is-controls-visible::after {
        opacity: 0;
        transition: none;
      }
      .feed-media-carousel .emy-video-player.is-playing:hover::after,
      .feed-media-carousel .emy-video-player.is-playing:focus-within::after,
      .feed-media-carousel .emy-video-player.is-playing.is-controls-visible::after {
        opacity: 1;
        transition: opacity .16s ease;
      }
      .emy-video-volume-wrap { position: relative; z-index: 8; display: inline-flex; align-items: center; justify-content: center; --emy-video-volume: 1; padding: 6px; margin: -6px; }
      .emy-video-volume-wrap [data-emy-video-mute] { width: 36px; height: 36px; }
      .emy-video-volume-popover { position: absolute; left: 50%; bottom: calc(100% + 6px); z-index: 12; width: 52px; height: 152px; padding: 10px 0; transform: translateX(-50%); border: 1px solid rgba(255,255,255,.14); border-radius: 999px; background: rgba(5,10,16,.9); box-shadow: 0 20px 44px rgba(0,0,0,.28); backdrop-filter: blur(14px) saturate(1.08); pointer-events: auto; }
      .emy-video-volume-popover[hidden] { display: none !important; }
      .emy-video-volume-wrap.is-open .emy-video-volume-popover,
      .emy-video-volume-wrap:hover .emy-video-volume-popover,
      .emy-video-volume-wrap:focus-within .emy-video-volume-popover { display: block !important; }
      .emy-video-volume-track { position: absolute; left: 50%; top: 18px; bottom: 18px; width: 10px; transform: translateX(-50%); border-radius: 999px; background: rgba(255,255,255,.2); overflow: visible; pointer-events: none; }
      .emy-video-volume-fill { position: absolute; left: 0; right: 0; bottom: 0; height: calc(var(--emy-video-volume) * 100%); border-radius: 999px; background: linear-gradient(180deg, #3aa0ff, #1285ff); }
      .emy-video-volume-knob { position: absolute; left: 50%; bottom: calc(var(--emy-video-volume) * 100%); width: 18px; height: 18px; transform: translate(-50%, 50%); border-radius: 999px; background: #fff; box-shadow: 0 5px 14px rgba(0,0,0,.22); pointer-events: none; }
      .emy-video-volume-slider { position: absolute; left: 50%; top: 10px; z-index: 3; width: 52px; height: 132px; margin-left: -26px; opacity: 0.01; cursor: pointer; writing-mode: vertical-lr; direction: rtl; -webkit-appearance: slider-vertical; appearance: slider-vertical; }
      .feed-media-carousel-slide img,
      .feed-media-carousel-slide video,
      .feed-media-carousel-slide .emy-video-player {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: var(--carousel-media-fit, contain);
        background: #101828;
        transform: none !important;
        transition: none !important;
        backface-visibility: hidden;
      }
      .feed-media-carousel-arrow {
        position: absolute;
        top: 50%;
        z-index: 9;
        width: 30px;
        height: 30px;
        border: 1px solid rgba(255,255,255,.68);
        border-radius: 999px;
        background: rgba(255,255,255,.88);
        color: var(--emy-navy, #001b47);
        display: grid;
        place-items: center;
        cursor: pointer;
        pointer-events: auto;
        opacity: .94;
        filter: none;
        box-shadow: 0 10px 22px rgba(0,27,71,.16);
        transform: translateY(-50%);
        transform-origin: center center;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        transition: none;
      }
      .feed-media-carousel:hover .feed-media-carousel-arrow,
      .feed-media-carousel:focus-within .feed-media-carousel-arrow {
        opacity: .94;
        border-color: rgba(255,255,255,.68);
        background: rgba(255,255,255,.88);
        box-shadow: 0 10px 22px rgba(0,27,71,.16);
        transform: translateY(-50%);
      }
      .feed-media-carousel-arrow:hover:not(:disabled):not([aria-disabled="true"]) { opacity: 1; background: rgba(255,106,0,.94); color: #fff; transform: translateY(-50%); box-shadow: 0 10px 22px rgba(0,27,71,.18); }
      .feed-media-carousel-arrow:disabled,
      .feed-media-carousel-arrow:disabled:hover,
      .feed-media-carousel-arrow[aria-disabled="true"],
      .feed-media-carousel-arrow[aria-disabled="true"]:hover {
        opacity: .42;
        cursor: default;
        background: rgba(255,255,255,.58);
        color: rgba(0,27,71,.52);
        box-shadow: none;
        transform: translateY(-50%);
        pointer-events: none;
      }
      .feed-media-carousel-arrow:active:not(:disabled):not([aria-disabled="true"]) { transform: translateY(-50%); opacity: .88; }
      .feed-media-carousel-arrow svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
      .feed-media-carousel-arrow.is-prev { left: 8px; }
      .feed-media-carousel-arrow.is-next { right: 8px; }
      .feed-media-carousel-arrow[hidden] { display: grid !important; visibility: visible !important; }
      .feed-media-carousel-dots {
        position: absolute;
        left: 50%;
        bottom: 14px;
        z-index: 9;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        border-radius: 999px;
        background: rgba(0,27,71,.28);
        padding: 5px 7px;
        transform: translateX(-50%);
      }
      .feed-media-carousel-dot {
        width: 6px;
        height: 6px;
        flex: 0 0 6px;
        border: 0;
        border-radius: 999px;
        background: rgba(255,255,255,.54);
        padding: 0;
        cursor: pointer;
        transition: none;
      }
      .feed-media-carousel-dot.is-active { width: 6px; background: var(--emy-orange, #ff6a00); box-shadow: 0 0 0 2px rgba(255,106,0,.28); }
      .feed-media-carousel-count {
        position: absolute;
        right: 12px;
        top: auto;
        bottom: 12px;
        z-index: 9;
        min-width: 38px;
        min-height: 25px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255,255,255,.70);
        border-radius: 999px;
        background: rgba(0,27,71,.72);
        color: #fff;
        padding: 0 9px;
        font-size: 11px;
        line-height: 1;
        font-weight: 780;
        box-shadow: none;
        transition: none;
      }
      .feed-media-carousel:hover .feed-media-carousel-count,
      .feed-media-carousel:focus-within .feed-media-carousel-count {
        border-color: rgba(255,255,255,.70);
        background: rgba(0,27,71,.72);
        color: #fff;
        box-shadow: none;
      }
      .feed-card:has(.feed-media-carousel),
      .social-feed-card:has(.feed-media-carousel),
      .feed-card:has([data-feed-media-carousel]),
      .social-feed-card:has([data-feed-media-carousel]),
      .feed-card:has(.feed-media-carousel):hover,
      .social-feed-card:has(.feed-media-carousel):hover,
      .feed-card:has([data-feed-media-carousel]):hover,
      .social-feed-card:has([data-feed-media-carousel]):hover,
      .feed-card:has(.feed-media-carousel):focus-within,
      .social-feed-card:has(.feed-media-carousel):focus-within,
      .feed-card:has([data-feed-media-carousel]):focus-within,
      .social-feed-card:has([data-feed-media-carousel]):focus-within {
        transform: none !important;
        transition: border-color .16s ease, box-shadow .16s ease !important;
      }
      .social-feed-media:has(.feed-media-carousel),
      .social-feed-media:has(.feed-media-carousel):hover,
      .feed-media:has(.feed-media-carousel),
      .feed-media:has(.feed-media-carousel):hover,
      .social-feed-media:has([data-feed-media-carousel]),
      .social-feed-media:has([data-feed-media-carousel]):hover,
      .feed-media:has([data-feed-media-carousel]),
      .feed-media:has([data-feed-media-carousel]):hover {
        transform: none !important;
        transition: none !important;
      }
      .feed-media-carousel-arrow,
      .feed-media-carousel-dots,
      .feed-media-carousel-dot,
      .feed-media-carousel-count {
        transition: none !important;
        will-change: auto;
      }
      .feed-card:has(.feed-media-carousel) .feed-media .video-duration-badge,
      .feed-card:has([data-feed-media-carousel]) .feed-media .video-duration-badge,
      .social-feed-card:has(.feed-media-carousel) .social-feed-media .video-duration-badge,
      .social-feed-card:has([data-feed-media-carousel]) .social-feed-media .video-duration-badge {
        opacity: 0 !important;
        visibility: hidden !important;
        transform: none !important;
        transition: none !important;
      }
      .composer-preview .feed-media-carousel,
      .feed-post-media .feed-media-carousel { z-index: 2; }
      .composer-preview.has-carousel > img,
      .composer-preview.has-carousel > video,
      .feed-post-media.has-carousel > img,
      .feed-post-media.has-carousel > video { display: none !important; }
      .feed-post-media .feed-media-carousel-arrow { z-index: 14; pointer-events: auto; }
      @media (max-width: 520px) {
        .emy-video-controls { left: 8px; right: 8px; bottom: 8px; grid-template-columns: auto minmax(0,1fr) auto auto; gap: 7px; padding: 7px; }
        .emy-video-quality, .emy-video-time { display: none; }
        .emy-video-big-play { width: 54px; height: 54px; }
        .feed-media-carousel-arrow { width: 28px; height: 28px; }
        .feed-media-carousel-arrow svg { width: 15px; height: 15px; }
        .feed-media-carousel-arrow.is-prev { left: 7px; }
        .feed-media-carousel-arrow.is-next { right: 7px; }
      }
      .item-detail-modal.is-post .item-detail-art {
        align-self: start;
        min-height: 0;
        aspect-ratio: 4 / 3;
        border: 1px solid rgba(255,255,255,.72);
        border-radius: 16px;
        background-blend-mode: screen, normal;
      }
      .item-detail-modal.is-post .item-detail-art.is-generated-post-media::before {
        content: "";
        position: absolute;
        inset: 14px;
        z-index: 1;
        border-radius: 14px;
        background:
          linear-gradient(180deg, rgba(255,255,255,.24), transparent 30%, rgba(0,27,71,.18)),
          radial-gradient(circle at 25% 72%, rgba(255,255,255,.92) 0 46px, transparent 47px),
          radial-gradient(circle at 67% 58%, rgba(255,84,58,.92) 0 24px, transparent 25px),
          linear-gradient(135deg, rgba(255,255,255,.18), transparent 36%);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.28), 0 18px 38px rgba(0,27,71,.14);
        pointer-events: none;
      }
      .item-detail-modal.is-post .item-detail-art::after {
        z-index: 2;
        background: linear-gradient(180deg, rgba(0,27,71,.02) 0%, transparent 45%, rgba(0,27,71,.22) 100%);
      }
      .item-detail-modal.is-post .item-detail-art.pizza,
      .item-detail-modal.is-post .item-detail-art.reel-a {
        background:
          radial-gradient(circle at 22% 24%, rgba(255,239,207,.54) 0 72px, transparent 73px),
          radial-gradient(circle at 82% 18%, rgba(255,255,255,.18) 0 120px, transparent 121px),
          linear-gradient(145deg, #f7ad55 0%, #d27632 48%, #8b3b20 100%);
      }
      .item-detail-modal.is-post .item-detail-art.shop,
      .item-detail-modal.is-post .item-detail-art.feed,
      .item-detail-modal.is-post .item-detail-art.reel,
      .item-detail-modal.is-post .item-detail-art.reel-b {
        background:
          radial-gradient(circle at 28% 28%, rgba(255,255,255,.72) 0 68px, transparent 69px),
          radial-gradient(circle at 80% 20%, rgba(255,106,0,.16) 0 120px, transparent 121px),
          linear-gradient(145deg, #e8eef5 0%, #cfd9e4 46%, #6c7889 100%);
      }
      .item-detail-modal.is-product .item-detail-art {
        align-self: stretch;
        min-height: 0;
        height: 100%;
        display: grid;
        grid-template-rows: minmax(0, 1fr) auto;
        gap: 10px;
        border: 1px solid rgba(0,27,71,.09);
        background: #fff;
        padding: 10px;
        box-shadow: 0 14px 34px rgba(0,27,71,.10);
      }
      .item-detail-modal.is-product .item-detail-art::after { display: none; }
      .item-detail-modal.is-post .item-detail-card {
        width: min(760px, calc(100vw - 32px));
        max-height: calc(100dvh - 32px);
        overflow: auto;
        border-radius: 20px;
        background: linear-gradient(180deg, #fff, #fffaf5);
      }
      .item-detail-modal.is-post .item-detail-layout {
        grid-template-columns: 1fr;
        gap: 0;
        padding: 0;
      }
      .item-detail-modal.is-post .item-detail-art {
        width: 100%;
        height: clamp(320px, 52dvh, 500px);
        min-height: 0;
        aspect-ratio: auto;
        border: 0;
        border-radius: 20px 20px 0 0;
        box-shadow: none;
      }
      .item-detail-modal.is-post .item-detail-art.is-generated-post-media::before {
        inset: 0;
        border-radius: inherit;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.22);
      }
      .item-detail-modal.is-post .item-detail-kind {
        position: absolute;
        left: 18px;
        top: 34px;
        z-index: 4;
        background: rgba(255,255,255,.86);
        backdrop-filter: blur(12px) saturate(1.15);
        box-shadow: 0 12px 28px rgba(0,27,71,.12);
      }
      .item-detail-modal.is-post .item-detail-copy {
        display: grid;
        gap: 10px;
        padding: 18px 22px 22px;
      }
      .item-detail-modal.is-post .item-detail-copy h2 {
        margin: 0;
        max-width: 100%;
        color: #24324a;
        overflow-wrap: anywhere;
        font-size: clamp(15px, 2vw, 18px);
        line-height: 1.42;
        font-weight: 720;
      }
      .item-detail-modal.is-post .item-detail-business {
        margin: -4px 0 0;
        color: var(--emy-navy);
        font-size: 14px;
      }
      .item-detail-modal.is-post .item-detail-description {
        margin: 0;
        max-width: 62ch;
        color: #5f6c85;
        font-size: 15px;
        line-height: 1.48;
      }
      .item-detail-modal.is-post .item-detail-meta {
        margin-top: 2px;
      }
      .item-detail-modal.is-post .item-detail-meta span {
        min-height: 28px;
        background: #fff4e8;
        color: #c14f00;
      }
      .item-detail-modal.is-post .item-product-panel {
        margin-top: 0;
        border-top: 1px solid rgba(0,27,71,.07);
        padding-top: 12px;
      }
      .item-detail-modal.is-post .item-product-note,
      .item-detail-modal.is-post .item-product-specs[hidden],
      .item-detail-modal.is-post .item-product-section[hidden] {
        display: none !important;
      }
      .item-detail-modal.is-post .item-product-seller {
        grid-template-columns: 46px minmax(0, 1fr) auto;
        gap: 10px;
        border-radius: 14px;
        padding: 10px;
        background: rgba(255,255,255,.82);
        box-shadow: 0 10px 24px rgba(0,27,71,.055);
      }
      .item-detail-modal.is-post .item-product-avatar {
        width: 46px;
        height: 46px;
        min-height: 46px;
      }
      .item-detail-modal.is-post .item-product-social {
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 8px;
      }
      .item-detail-modal.is-post .item-product-social button {
        min-height: 46px;
        border-radius: 12px;
        padding: 8px;
        background: rgba(255,255,255,.9);
      }
      .item-detail-modal.is-post .item-product-connect {
        border-radius: 14px;
        background: linear-gradient(135deg, rgba(255,244,232,.92), rgba(255,255,255,.9));
        padding: 12px;
      }
      .item-detail-modal.is-post .item-detail-actions {
        display: none;
      }
      .item-detail-modal.is-post.is-text-post {
        align-items: center;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-card {
        width: min(560px, calc(100vw - 28px));
        max-height: min(720px, calc(100dvh - 28px));
        overflow: auto;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 18px;
        background: #fff;
        box-shadow: 0 22px 54px rgba(0,27,71,.18);
      }
      .item-detail-modal.is-post.is-text-post .item-detail-layout {
        display: block;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-art {
        display: none;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-copy {
        display: grid;
        gap: 0;
        padding: 18px;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-kind {
        display: none;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-business {
        order: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 44px 0 0;
        border-bottom: 1px solid rgba(0,27,71,.08);
        color: #667085;
        padding: 0 0 12px;
        font-size: 12.5px;
        line-height: 1.35;
        font-weight: 760;
        overflow-wrap: anywhere;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-business::before {
        content: attr(data-avatar-initial);
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        border-radius: 999px;
        background: #fff;
        color: var(--emy-navy);
        font-size: 13px;
        line-height: 1;
        font-weight: 900;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.08);
      }
      .item-detail-modal.is-post .item-detail-business.has-avatar,
      .item-detail-modal.is-post .item-detail-business.has-initial {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .item-detail-modal.is-post .item-detail-business.has-avatar::before,
      .item-detail-modal.is-post.is-text-post .item-detail-business.has-avatar::before {
        content: "";
        width: 30px;
        height: 30px;
        flex: 0 0 auto;
        border-radius: 999px;
        background: #fff var(--item-detail-avatar, linear-gradient(145deg,#fff6ec,#eef3f8)) center / cover no-repeat;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.08);
      }
      .item-detail-modal.is-post .item-detail-business.has-initial::before {
        content: attr(data-avatar-initial);
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        border-radius: 999px;
        background: #fff;
        color: var(--emy-navy);
        font-size: 13px;
        line-height: 1;
        font-weight: 900;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.08);
      }
      .item-detail-modal.is-post.is-text-post .item-detail-copy > h2 {
        order: 1;
        margin: 14px 0 0;
        color: #344054;
        font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
        font-size: 14.5px;
        line-height: 1.58;
        font-weight: 520;
        letter-spacing: 0;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-description {
        order: 2;
        color: #667085;
        font-size: 14px;
        line-height: 1.55;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-description[hidden],
      .item-detail-modal.is-post.is-text-post .item-detail-price[hidden] {
        display: none;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-meta {
        display: none !important;
      }
      .item-detail-modal.is-post.is-text-post .item-product-panel {
        order: 3;
        display: grid;
        gap: 10px;
        margin-top: 14px;
        border-top: 1px solid rgba(0,27,71,.08);
        padding-top: 10px;
      }
      .item-detail-modal.is-post.is-text-post .item-product-social {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
        border: 0;
        padding: 0;
      }
      .item-detail-modal.is-post.is-text-post .item-product-social button {
        min-width: 0;
        min-height: 32px;
        border-radius: 8px;
        padding: 0 8px;
      }
      .item-detail-modal.is-post.is-text-post .item-product-social button svg {
        width: 17px;
        height: 17px;
      }
      .item-detail-modal.is-post.is-text-post .item-product-social button span {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .item-detail-modal.is-post.is-text-post .item-product-social button small {
        display: none;
      }
      .item-detail-modal.is-post.is-text-post .item-product-comments {
        border-top: 1px solid rgba(0,27,71,.07);
        padding-top: 10px;
      }
      .item-detail-modal.is-post.is-text-post .item-product-section-title strong {
        font-size: 13px;
      }
      .item-detail-modal.is-post.is-text-post .item-product-comment-list {
        max-height: min(260px, 34dvh);
      }
      .item-detail-modal.is-post.is-text-post .item-detail-copy {
        gap: 10px;
        padding: 20px;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-kind {
        position: static;
        order: 0;
        width: fit-content;
        min-height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255,106,0,.18);
        border-radius: 999px;
        background: #fff7ed;
        color: #d85a00;
        padding: 0 10px;
        font-size: 10px;
        line-height: 1;
        font-weight: 900;
        letter-spacing: 0;
        text-transform: uppercase;
        box-shadow: none;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-business {
        order: 1;
        margin: 0 44px 0 0;
        border-bottom: 1px solid rgba(0,27,71,.08);
        padding: 0 0 12px;
        color: var(--emy-navy);
        font-size: 14px;
        line-height: 1.25;
        font-weight: 850;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-copy > h2 {
        order: 2;
        max-height: min(250px, 34dvh);
        overflow: auto;
        margin: 0;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 14px;
        background: #f8fafc;
        color: #344054;
        padding: 13px 14px;
        font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
        font-size: 14.5px;
        line-height: 1.58;
        font-weight: 520;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-description {
        order: 3;
        margin: 0;
        color: #667085;
        font-size: 13px;
        line-height: 1.45;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-meta {
        order: 4;
        display: flex !important;
        flex-wrap: wrap;
        gap: 6px;
        margin: 0;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-meta[hidden] {
        display: none !important;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-meta span {
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: #f2f4f7;
        color: #667085;
        padding: 0 9px;
        font-size: 10.8px;
        line-height: 1;
        font-weight: 780;
      }
      .item-detail-repost-attachment {
        order: 5;
        width: 100%;
        margin: 2px 0 0;
      }
      .item-detail-repost-attachment[hidden] {
        display: none !important;
      }
      .item-detail-repost-attachment .social-feed-quote {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) !important;
        align-items: stretch !important;
        gap: 8px !important;
        width: 100%;
        min-width: 0;
        border: 1px solid rgba(255,106,0,.24);
        border-radius: 10px;
        background: linear-gradient(145deg, rgba(255,244,232,.94), rgba(255,250,245,.88));
        padding: 10px;
        color: inherit;
        cursor: pointer;
        text-decoration: none;
        box-sizing: border-box;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.78);
      }
      .item-detail-repost-attachment .social-feed-quote.is-detail-repost-quote {
        margin: 0;
      }
      .item-detail-repost-attachment .social-feed-quote-head {
        display: flex !important;
        min-width: 0;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        color: #667085;
        font-size: 10.8px;
        line-height: 1.2;
        font-weight: 760;
      }
      .item-detail-repost-attachment .social-feed-quote-head strong {
        display: block;
        min-width: 0;
        overflow: hidden;
        color: var(--emy-orange);
        font-size: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-detail-repost-attachment .social-feed-quote-head span {
        flex: 0 0 auto;
        max-width: 42%;
        overflow: hidden;
        border: 1px solid rgba(255,106,0,.10);
        border-radius: 999px;
        background: rgba(255,255,255,.62);
        color: #c14f00;
        padding: 3px 7px;
        font-size: 10px;
        line-height: 1;
        font-weight: 850;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-detail-repost-attachment .social-feed-quote-body {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) auto !important;
        align-items: start;
        gap: 9px;
        min-width: 0;
      }
      .item-detail-repost-attachment .social-feed-quote-copy {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr);
        gap: 4px;
        min-width: 0;
      }
      .item-detail-repost-attachment .social-feed-quote-title {
        display: -webkit-box !important;
        overflow: hidden;
        min-width: 0;
        color: var(--emy-navy);
        font-size: 12.8px;
        line-height: 1.22;
        font-weight: 800;
        text-overflow: ellipsis;
        white-space: normal;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .item-detail-repost-attachment .social-feed-quote-text {
        display: -webkit-box !important;
        overflow: hidden;
        min-width: 0;
        margin: 0;
        color: #667085;
        font-size: 11.7px;
        line-height: 1.35;
        font-weight: 520;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .item-detail-repost-attachment .social-feed-quote-price {
        display: inline-flex;
        justify-self: start;
        width: max-content;
        max-width: 100%;
        border-radius: 999px;
        background: #fff4e8;
        color: #c14f00;
        padding: 3px 7px;
        font-size: 10.8px;
        line-height: 1;
        font-weight: 800;
      }
      .item-detail-repost-attachment .social-feed-quote-media {
        width: 84px;
        height: 70px;
        overflow: hidden;
        border-radius: 7px;
        background: linear-gradient(135deg, #fffaf5, #e8eef6);
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.08);
      }
      .item-detail-repost-attachment .social-feed-quote-media img,
      .item-detail-repost-attachment .social-feed-quote-media video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .item-detail-modal.is-post.is-text-post .item-product-panel {
        order: 6;
      }
      .item-detail-modal.is-post .item-product-seller,
      .item-detail-modal.is-post .item-product-connect,
      .item-detail-modal.is-post .item-product-chat-box,
      .item-detail-modal.is-post .item-product-specs {
        display: none !important;
      }
      .item-detail-modal.is-post .item-product-social {
        border-top: 1px solid rgba(0,27,71,.08);
        border-bottom: 1px solid rgba(0,27,71,.08);
        padding: 7px 0;
      }
      .item-detail-modal.is-post .item-product-social button {
        border: 0;
        border-radius: 10px;
        background: transparent;
        box-shadow: none;
      }
      .item-detail-modal.is-post .item-product-social button:hover,
      .item-detail-modal.is-post .item-product-social button.is-active {
        background: #fff4e8;
        color: var(--emy-orange);
      }
      .item-detail-modal.is-post .item-product-comments {
        border: 0;
        border-radius: 0;
        background: transparent;
        padding: 0;
      }
      .item-detail-modal.is-post .item-product-section-note {
        display: none;
      }
      .item-detail-modal.is-post .item-product-comment-list {
        max-height: min(330px, 38dvh);
      }
      .item-detail-modal.is-post .item-product-comment-bubble {
        border-radius: 14px;
        background: #f6f8fb;
        color: #364157;
      }
      .item-detail-modal.is-post .item-product-comment-preview {
        border-radius: 16px;
        background: rgba(255,255,255,.92);
      }
      .item-detail-modal.is-post .item-product-comment-preview input {
        border-radius: 999px;
      }
      .item-detail-modal.is-post.is-media-post .item-detail-card {
        width: min(1180px, calc(100vw - 32px));
        max-height: calc(100dvh - 32px);
        overflow: hidden;
        background: #fff;
      }
      .item-detail-modal.is-post.is-media-post .item-detail-layout {
        height: calc(100dvh - 32px);
        max-height: 760px;
        display: grid;
        grid-template-columns: minmax(320px, .95fr) minmax(350px, .72fr);
        gap: 0;
        padding: 0;
      }
      .item-detail-modal.is-post.is-media-post .item-detail-art {
        align-self: stretch;
        height: 100%;
        min-height: 0;
        border-radius: 20px 0 0 20px;
        background: #071326;
        box-shadow: none;
      }
      .item-detail-modal.is-post.is-media-post .item-detail-art img,
      .item-detail-modal.is-post.is-media-post .item-detail-art video {
        object-fit: contain;
        background: #071326;
      }
      .item-detail-modal.is-post.is-media-post .item-detail-art::after,
      .item-detail-modal.is-post.is-media-post .item-detail-art.is-generated-post-media::before {
        display: none;
      }
      .item-detail-modal.is-post.is-media-post .item-detail-copy {
        display: grid;
        align-content: start;
        gap: 9px;
        min-height: 0;
        overflow-y: auto;
        padding: 20px 22px 18px;
        border-left: 1px solid rgba(0,27,71,.08);
        background: #fff;
      }
      .item-detail-modal.is-post.is-media-post .item-detail-kind {
        position: static;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        justify-self: start;
        min-height: 24px;
        border: 1px solid rgba(255,106,0,.22);
        border-radius: 999px;
        background: #fff7ed;
        color: #c14f00;
        padding: 0 10px;
        font-size: 10px;
        line-height: 1;
        font-weight: 850;
        letter-spacing: 0;
        box-shadow: none;
      }
      .item-detail-modal.is-post.is-media-post .item-detail-copy h2 {
        display: block;
        max-width: 100%;
        overflow: visible;
        margin: 2px 0 0;
        color: var(--emy-navy);
        font-size: clamp(17px, 1.8vw, 21px);
        line-height: 1.25;
        font-weight: 780;
        -webkit-line-clamp: unset;
        -webkit-box-orient: initial;
      }
      .item-detail-modal.is-post.is-media-post .item-detail-business {
        margin: 0;
        color: var(--emy-navy);
        font-size: 13.5px;
        line-height: 1.3;
        font-weight: 760;
      }
      .item-detail-modal.is-post.is-media-post .item-detail-description {
        margin: 2px 0 0;
        color: #46556f;
        font-size: 14px;
        line-height: 1.52;
        font-weight: 500;
      }
      .item-detail-modal.is-post.is-media-post .item-detail-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        margin: 6px 0 0;
      }
      .item-detail-modal.is-post.is-media-post .item-detail-meta span {
        width: auto;
        min-width: 0;
        min-height: 25px;
        border-radius: 999px;
        background: #f2f4f7;
        color: #667085;
        padding: 0 10px;
        font-size: 10.8px;
        line-height: 1;
        font-weight: 780;
      }
      .item-detail-modal.is-post.is-media-post .item-product-panel {
        display: grid;
        gap: 12px;
        border-top: 1px solid rgba(0,27,71,.08);
        padding-top: 12px;
      }
      .item-detail-modal.is-post.is-media-post .item-product-social {
        display: grid;
        grid-template-columns: repeat(5, minmax(0,1fr));
        gap: 7px;
      }
      .item-detail-modal.is-post.is-media-post .item-product-social button {
        min-height: 40px;
        border-radius: 999px;
      }
      .item-detail-modal.is-post.is-media-post .item-product-comments {
        display: grid;
        gap: 10px;
      }
      .item-detail-modal.is-post.is-media-post .item-product-comment-list {
        max-height: min(430px, 48dvh);
      }
      @media (max-width: 640px) {
        .item-detail-modal.is-post .item-detail-card { width: 100%; border-radius: 18px 18px 0 0; }
        .item-detail-modal.is-post .item-detail-art { height: clamp(280px, 46dvh, 410px); border-radius: 18px 18px 0 0; }
        .item-detail-modal.is-post .item-detail-copy { padding: 16px 16px 20px; }
        .item-detail-modal.is-post.is-text-post .item-detail-card { border-radius: 18px 18px 0 0; }
        .item-detail-modal.is-post.is-text-post .item-detail-copy { padding: 18px 16px 20px; }
        .item-detail-modal.is-post.is-media-post .item-detail-card {
          width: 100%;
          max-height: calc(100dvh - 20px);
          border-radius: 18px 18px 0 0;
          overflow: auto;
        }
        .item-detail-modal.is-post.is-media-post .item-detail-layout {
          height: auto;
          max-height: none;
          grid-template-columns: 1fr;
        }
        .item-detail-modal.is-post.is-media-post .item-detail-art {
          height: clamp(280px, 46dvh, 420px);
          border-radius: 18px 18px 0 0;
        }
        .item-detail-modal.is-post.is-media-post .item-detail-copy {
          overflow: visible;
          border-left: 0;
          padding: 14px 16px 16px;
          gap: 8px;
          background: #fff;
        }
        .item-detail-modal.is-post.is-media-post .item-detail-kind {
          min-height: 23px;
          padding: 0 9px;
          font-size: 9.8px;
        }
        .item-detail-modal.is-post.is-media-post .item-detail-copy h2 {
          margin-top: 1px;
          font-size: 18px;
          line-height: 1.24;
          font-weight: 780;
        }
        .item-detail-modal.is-post.is-media-post .item-detail-business {
          margin: 0;
          font-size: 13px;
          line-height: 1.25;
        }
        .item-detail-modal.is-post.is-media-post .item-detail-description {
          margin-top: 2px;
          font-size: 13.5px;
          line-height: 1.48;
        }
        .item-detail-modal.is-post.is-media-post .item-detail-meta {
          gap: 6px;
          margin-top: 4px;
        }
        .item-detail-modal.is-post.is-media-post .item-detail-meta span {
          min-height: 23px;
          padding: 0 8px;
          font-size: 10.5px;
        }
        .item-detail-modal.is-post .item-product-social { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .item-detail-modal.is-post .item-product-actions { grid-template-columns: 1fr; }
      }

      .item-product-gallery-stage {
        position: relative;
        min-height: 0;
        overflow: hidden;
        border-radius: 10px;
        background: #f7f9fc;
      }
      .item-product-gallery-frame {
        position: absolute;
        inset: 0;
        display: none;
        overflow: hidden;
        border-radius: inherit;
        background: linear-gradient(135deg, #eef3f7, #fff);
      }
      .item-product-gallery-frame.is-active { display: block; }
      .item-product-gallery-frame img,
      .item-product-gallery-frame video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: var(--media-fit, contain);
        transform: translate(var(--media-x, 0%), var(--media-y, 0%)) scale(var(--media-zoom, 1));
        transform-origin: center;
        background: #f7f9fc;
      }
      .item-product-gallery-frame.pizza, .item-product-gallery-thumb.pizza { background: radial-gradient(circle at 32% 42%, #ffd9a8 0 38px, transparent 39px), radial-gradient(circle at 67% 34%, #ed4f37 0 18px, transparent 19px), linear-gradient(135deg, #f4a04f, #8d3b1f); }
      .item-product-gallery-frame.shop, .item-product-gallery-thumb.shop { background: linear-gradient(135deg, #eef3f7, #fff), radial-gradient(circle at 66% 34%, #d8a082, transparent 72px), linear-gradient(90deg, #e6edf4, #fff); }
      .item-product-gallery-frame.bottle, .item-product-gallery-frame.clear-bottle, .item-product-gallery-thumb.bottle, .item-product-gallery-thumb.clear-bottle { background: linear-gradient(90deg, #e6edf2, #bfc8d0), radial-gradient(circle at 52% 42%, #44546b 0 42px, transparent 43px); }
      .item-product-gallery-frame.tech, .item-product-gallery-frame.keyboard, .item-product-gallery-thumb.tech, .item-product-gallery-thumb.keyboard { background: linear-gradient(135deg, #dbe2ea, #f8fafc), linear-gradient(100deg, transparent 0 40%, rgba(0,27,71,.25) 41% 45%, transparent 45%); }
      .item-product-gallery-frame.feed, .item-product-gallery-frame.reel, .item-product-gallery-thumb.feed, .item-product-gallery-thumb.reel { background: linear-gradient(145deg, #d9e6ef, #786f69), radial-gradient(circle at 64% 18%, rgba(255,255,255,.55), transparent 52px); }
      .item-product-gallery-frame.angle-detail { filter: saturate(.96) brightness(1.03); }
      .item-product-gallery-frame.angle-use { background-blend-mode: normal; }
      .item-product-gallery-frame.angle-video::before {
        content: none;
        display: none;
      }
      .item-product-gallery-frame.angle-video::after {
        content: none;
        display: none;
      }
      .item-product-gallery-caption {
        display: none !important;
      }
      .item-product-gallery-caption small { color: #667085; font-size: 11px; font-weight: 620; }
      .item-product-gallery-heart {
        position: absolute;
        top: 12px;
        right: 12px;
        z-index: 6;
        display: grid;
        width: 42px;
        height: 42px;
        place-items: center;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        color: #667085;
        cursor: pointer;
        box-shadow: 0 12px 26px rgba(0,27,71,.14);
        transition: color .16s ease, border-color .16s ease, background .16s ease, transform .16s ease;
      }
      .item-product-gallery-heart:hover {
        border-color: rgba(225,29,72,.22);
        background: #fff;
        color: #e11d48;
        transform: translateY(-1px);
      }
      .item-product-gallery-heart svg {
        width: 20px;
        height: 20px;
        stroke-width: 2;
        fill: none;
      }
      .item-product-gallery-heart.is-active {
        border-color: rgba(225,29,72,.20);
        background: #fff5f7;
        color: #e11d48;
      }
      .item-product-gallery-heart.is-active svg path {
        fill: currentColor;
      }
      .item-product-gallery-heart,
      .product-card > .heart,
      .feed-product-card > .heart,
      .business-preview-product-card > .heart,
      .business-live-product-card > .heart {
        display: none !important;
      }
      .item-product-gallery-thumbs {
        --item-gallery-thumb-size: clamp(74px, 16vw, 104px);
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(var(--item-gallery-thumb-size), var(--item-gallery-thumb-size)));
        grid-auto-rows: var(--item-gallery-thumb-size);
        justify-content: start;
        gap: 8px;
      }
      .item-product-gallery-thumb {
        position: relative;
        width: var(--item-gallery-thumb-size);
        height: var(--item-gallery-thumb-size);
        min-height: var(--item-gallery-thumb-size);
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: #eef3f7;
        color: var(--emy-navy);
        cursor: pointer;
        padding: 0;
      }
      .item-product-gallery-thumb img,
      .item-product-gallery-thumb video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        background: #f8fbff;
      }
      .item-product-gallery-thumb span {
        position: absolute;
        left: 6px;
        right: 6px;
        bottom: 6px;
        z-index: 2;
        border-radius: 999px;
        background: rgba(255,255,255,.90);
        padding: 4px 5px;
        font-size: 9.5px;
        line-height: 1;
        font-weight: 760;
        text-align: center;
      }
      .item-product-gallery-thumb.is-active {
        border-color: rgba(255,106,0,.64);
        box-shadow: 0 0 0 3px rgba(255,106,0,.12);
      }
      .item-detail-art.pizza, .item-detail-art.reel-a { background: radial-gradient(circle at 32% 42%, #ffd9a8 0 38px, transparent 39px), radial-gradient(circle at 67% 34%, #ed4f37 0 18px, transparent 19px), radial-gradient(circle at 56% 66%, #f4edb6 0 36px, transparent 37px), linear-gradient(135deg, #f9a94f, #7c301b); }
      .item-detail-art.shop { background: linear-gradient(135deg, #eef3f7, #fff), radial-gradient(circle at 64% 32%, #d8a082, transparent 72px), linear-gradient(90deg, #394250, transparent); }
      .item-detail-art.tech, .item-detail-art.keyboard { background: linear-gradient(135deg, #dbe2ea, #f8fafc), linear-gradient(100deg, transparent 0 40%, rgba(0,27,71,.25) 41% 45%, transparent 45%); }
      .item-detail-art.bottle, .item-detail-art.clear-bottle { background: linear-gradient(90deg, #e6edf2, #bfc8d0), radial-gradient(circle at 52% 42%, #44546b 0 42px, transparent 43px); }
      .item-detail-art.feed, .item-detail-art.reel, .item-detail-art.reel-b { background: linear-gradient(145deg, #d9e6ef, #786f69), radial-gradient(circle at 64% 18%, rgba(255,255,255,.55), transparent 52px); }
      .item-detail-art.person { background: radial-gradient(circle at 54% 24%, #caa28d 0 42px, transparent 43px), linear-gradient(145deg, #d9e4ee, #293446); }
      .item-detail-copy { min-width: 0; display: flex; flex-direction: column; padding: 12px 8px 8px 0; }
      .item-detail-modal.is-product .item-detail-copy {
        min-height: 0;
        overflow-y: auto;
        overscroll-behavior: contain;
        padding: 10px 10px 10px 0;
        scrollbar-width: thin;
        scrollbar-color: rgba(0,27,71,.22) transparent;
      }
      .item-detail-modal.is-product .item-detail-copy::-webkit-scrollbar { width: 8px; }
      .item-detail-modal.is-product .item-detail-copy::-webkit-scrollbar-thumb { border-radius: 999px; background: rgba(0,27,71,.22); }
      .item-detail-modal.is-business .item-detail-card {
        width: min(720px, 100%);
        max-height: min(760px, calc(100dvh - 44px));
        overflow: hidden;
      }
      .item-detail-modal.is-business .item-detail-layout {
        display: block;
        padding: 18px;
      }
      .item-detail-modal.is-business .item-detail-art,
      .item-detail-modal.is-business .item-detail-kind,
      .item-detail-modal.is-business .item-detail-copy > h2,
      .item-detail-modal.is-business .item-detail-business,
      .item-detail-modal.is-business .item-detail-description,
      .item-detail-modal.is-business .item-detail-price,
      .item-detail-modal.is-business .item-detail-meta,
      .item-detail-modal.is-business .item-detail-actions {
        display: none;
      }
      .item-detail-modal.is-business .item-detail-copy {
        max-height: calc(100dvh - 80px);
        overflow-y: auto;
        padding: 0;
      }
      .item-detail-modal.is-business .item-detail-copy::-webkit-scrollbar { width: 8px; }
      .item-detail-modal.is-business .item-detail-copy::-webkit-scrollbar-thumb { border-radius: 999px; background: rgba(0,27,71,.22); }
      .item-detail-kind { width: fit-content; border: 1px solid rgba(255,106,0,.18); border-radius: 999px; background: #fff4e8; color: #d85a00; padding: 7px 10px; font-size: 10px; line-height: 1; font-weight: 820; text-transform: uppercase; letter-spacing: .08em; }
      .item-detail-copy h2 { margin: 14px 0 0; color: var(--emy-navy); font-size: clamp(22px, 3vw, 34px); line-height: 1.04; font-weight: 820; letter-spacing: 0; }
      .item-detail-modal.is-product .item-detail-copy h2 { font-size: clamp(22px, 2.4vw, 30px); }
      .item-detail-modal.is-post .item-detail-copy > h2,
      .item-detail-modal:not(.is-product):not(.is-business):not(.is-job) .item-detail-copy > h2 {
        display: -webkit-box;
        max-width: 100%;
        overflow: hidden;
        overflow-wrap: anywhere;
        word-break: break-word;
        color: #24324a;
        font-size: clamp(15px, 1.55vw, 18px);
        line-height: 1.36;
        font-weight: 760;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .item-detail-modal.is-post.is-text-post:not(.is-product):not(.is-business):not(.is-job) .item-detail-copy > h2 {
        display: block;
        max-width: 100%;
        max-height: min(250px, 34dvh);
        overflow: auto;
        margin: 0;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 14px;
        background: #f8fafc;
        color: #344054;
        padding: 13px 14px;
        font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
        font-size: 14.5px;
        line-height: 1.58;
        font-weight: 520;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        -webkit-line-clamp: unset;
        -webkit-box-orient: initial;
      }
      .item-detail-business { margin: 9px 0 0; color: #667085; font-size: 13px; line-height: 1.35; font-weight: 700; }
      .item-detail-description { margin: 14px 0 0; color: #667085; font-size: 14px; line-height: 1.5; font-weight: 470; }
      .item-detail-price { width: fit-content; margin-top: 18px; border-radius: 999px; background: #fff4e8; color: #d85a00; padding: 9px 12px; font-size: 16px; line-height: 1; font-weight: 850; }
      .item-detail-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
      .item-detail-meta span { display: inline-flex; align-items: center; min-height: 25px; border-radius: 999px; background: rgba(0,27,71,.06); color: #667085; padding: 0 10px; font-size: 11px; font-weight: 720; }
      .item-business-panel {
        display: grid;
        gap: 12px;
        margin-top: 18px;
        border-top: 1px solid rgba(0,27,71,.08);
        padding-top: 16px;
      }
      .item-detail-modal.is-business .item-business-panel {
        margin-top: 0;
        border-top: 0;
        padding: 0 4px 4px;
      }
      .item-business-panel[hidden] { display: none; }
      .item-business-summary {
        display: grid;
        grid-template-columns: 58px minmax(0, 1fr) auto;
        gap: 12px;
        align-items: center;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 8px;
        background: #fff;
        padding: 12px;
        box-shadow: 0 10px 24px rgba(0,27,71,.055);
      }
      .item-detail-modal.is-business .item-business-summary {
        grid-template-columns: 76px minmax(0, 1fr) auto;
        gap: 14px;
        align-items: center;
        padding: 16px;
        background: linear-gradient(180deg, #fff, #fffaf5);
        box-shadow: 0 14px 34px rgba(0,27,71,.08);
      }
      .item-business-avatar {
        display: grid;
        width: 58px;
        height: 58px;
        place-items: center;
        overflow: hidden;
        border: 2px solid #fff;
        border-radius: 999px;
        background: linear-gradient(145deg, #f8fafc, #eef2f7);
        color: var(--emy-navy);
        text-decoration: none;
        box-shadow: 0 0 0 1px rgba(0,27,71,.10), 0 10px 18px rgba(0,27,71,.10);
      }
      .item-detail-modal.is-business .item-business-avatar {
        width: 76px;
        height: 76px;
      }
      .item-business-avatar.pizza,
      .item-business-avatar.shop,
      .item-business-avatar.tech,
      .item-business-avatar.bottle,
      .item-business-avatar.feed,
      .item-business-avatar.reel {
        background: linear-gradient(145deg, #f8fafc, #eef2f7);
      }
      .item-business-avatar img { width: 100%; height: 100%; object-fit: cover; }
      .item-business-avatar span {
        display: grid;
        width: 100%;
        height: 100%;
        place-items: center;
        border-radius: 999px;
        background: transparent;
        color: var(--emy-navy);
        font-size: 18px;
        line-height: 1;
        font-weight: 820;
      }
      .item-business-copy {
        min-width: 0;
      }
      .item-business-copy small {
        display: block;
        color: #667085;
        font-size: 11px;
        line-height: 1.25;
        font-weight: 620;
      }
      .item-business-copy strong {
        display: block;
        overflow: hidden;
        margin-top: 3px;
        color: var(--emy-navy);
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        line-height: 1.2;
        font-weight: 760;
      }
      .item-detail-modal.is-business .item-business-copy strong {
        overflow: visible;
        white-space: normal;
        font-size: 20px;
        line-height: 1.1;
        font-weight: 790;
      }
      .item-business-copy span {
        display: block;
        margin-top: 4px;
        color: #667085;
        font-size: 11.5px;
        line-height: 1.35;
        font-weight: 520;
      }
      .item-detail-modal.is-business .item-business-copy span {
        max-width: 360px;
        font-size: 12px;
      }
      .item-business-profile-pill {
        display: inline-flex;
        min-height: 40px;
        align-items: center;
        justify-content: center;
        gap: 6px;
        border: 1px solid rgba(255,106,0,.25);
        border-radius: 999px;
        background: #fff7ef;
        color: #c14f00;
        padding: 0 14px;
        text-decoration: none;
        font-size: 12px;
        line-height: 1;
        font-weight: 760;
      }
      .item-business-profile-pill svg {
        width: 15px;
        height: 15px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }
      .item-business-facts {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
      .item-detail-modal.is-business .item-business-facts {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .item-business-facts span {
        display: grid;
        gap: 3px;
        min-width: 0;
        min-height: 54px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 8px;
        background: #f8fafc;
        color: var(--emy-navy);
        padding: 9px 10px;
        font-size: 12px;
        line-height: 1.1;
        font-weight: 740;
        overflow-wrap: anywhere;
      }
      .item-business-facts em {
        display: block;
        min-width: 0;
        color: #667085;
        font-style: normal;
        font-size: 10.5px;
        line-height: 1.25;
        font-weight: 560;
        overflow-wrap: anywhere;
      }
      .item-business-facts .is-open { background: #effaf4; color: #0f7a45; }
      .item-business-facts .is-closed { background: #f3f4f6; color: #667085; }
      .item-business-library {
        display: grid;
        gap: 8px;
      }
      .item-business-library-title {
        color: var(--emy-navy);
        font-size: 13px;
        line-height: 1.2;
        font-weight: 760;
      }
      .item-business-library-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
      .item-detail-modal.is-business .item-business-library-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .item-business-library-card {
        min-height: 78px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 8px;
        background: #fff;
        padding: 9px;
      }
      .item-business-library-card strong {
        display: block;
        color: var(--emy-navy);
        font-size: 12px;
        line-height: 1.2;
        font-weight: 760;
      }
      .item-business-library-card span {
        display: block;
        margin-top: 5px;
        color: #667085;
        font-size: 11px;
        line-height: 1.3;
        font-weight: 520;
      }
      .item-business-actions {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 9px;
      }
      .item-business-actions a,
      .item-business-actions button {
        display: inline-flex;
        min-height: 40px;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        cursor: pointer;
        padding: 0 12px;
        text-decoration: none;
        font-size: 12px;
        line-height: 1;
        font-weight: 760;
      }
      .item-business-actions a:first-child {
        border: 0;
        background: var(--emy-orange);
        color: #fff;
      }
      .item-business-actions a:not(:first-child),
      .item-business-actions button {
        border: 1px solid rgba(0,27,71,.10);
        background: #fff;
        color: var(--emy-navy);
      }
      .item-business-actions button.is-active {
        border-color: rgba(15,143,87,.24);
        background: #0f8f57;
        color: #fff;
      }
      .item-business-repost {
        gap: 7px;
      }
      .item-business-repost svg {
        width: 17px;
        height: 17px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
      }
      .item-business-repost span {
        display: grid;
        gap: 2px;
        text-align: left;
      }
      .item-business-repost strong {
        color: inherit;
        font-size: 12px;
        line-height: 1;
        font-weight: 820;
      }
      .item-business-repost small {
        color: #667085;
        font-size: 10px;
        line-height: 1;
        font-weight: 640;
      }
      .item-business-repost.is-active {
        border-color: rgba(255,106,0,.34) !important;
        background: #fff4e8 !important;
        color: #c14f00 !important;
      }
      .item-business-customer-note,
      .item-product-customer-note {
        margin: -1px 0 0;
        color: #667085;
        font-size: 11px;
        line-height: 1.28;
        font-weight: 540;
      }
      .item-business-customer-note strong,
      .item-product-customer-note strong {
        color: var(--emy-navy);
        font-weight: 780;
      }
      .item-product-panel {
        display: grid;
        gap: 12px;
        margin-top: 18px;
        border-top: 1px solid rgba(0,27,71,.08);
        padding-top: 16px;
      }
      .item-product-panel[hidden] { display: none !important; }
      .item-detail-modal [data-emy-product-like-slot],
      .item-detail-modal .emy-product-like-chip,
      .item-detail-modal [data-item-product-like] { display: none !important; }
      .item-product-note[hidden],
      .item-product-social[hidden],
      .item-product-specs[hidden],
      .item-product-section[hidden],
      .item-product-owner-panel[hidden],
      .item-product-owner-stats[hidden],
      .item-product-connect[hidden] { display: none !important; }
      .item-product-note {
        margin: 0;
        border: 1px solid rgba(0,27,71,.08);
        border-left: 3px solid var(--emy-orange);
        border-radius: 8px;
        background: rgba(255,255,255,.78);
        color: #667085;
        padding: 10px 12px;
        font-size: 12.5px;
        line-height: 1.45;
        font-weight: 500;
      }
      .item-product-seller {
        display: grid;
        grid-template-columns: 52px minmax(0, 1fr) auto;
        align-items: center;
        gap: 12px;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 8px;
        background: #fff;
        padding: 12px;
        box-shadow: 0 10px 24px rgba(0,27,71,.055);
      }
      .item-product-seller[hidden] { display: none !important; }
      .item-product-avatar {
        position: relative;
        display: grid;
        width: 52px;
        height: 52px;
        min-height: 52px;
        place-items: center;
        overflow: hidden;
        border: 2px solid rgba(255,255,255,.92);
        border-radius: 999px;
        background: linear-gradient(145deg, #e9eff6, #fff);
        color: var(--emy-navy);
        text-decoration: none;
        box-shadow: 0 0 0 1px rgba(0,27,71,.10), 0 10px 18px rgba(0,27,71,.10);
      }
      .item-product-avatar.pizza { background: radial-gradient(circle at 34% 42%, #ffd8a8 0 15px, transparent 16px), radial-gradient(circle at 67% 34%, #ed4f37 0 8px, transparent 9px), linear-gradient(135deg, #f9b15d, #7c301b); }
      .item-product-avatar.shop { background: linear-gradient(135deg, #e8edf1, #fff), radial-gradient(circle at 66% 30%, #d6a083, transparent 24px), linear-gradient(90deg, #39424f, transparent); }
      .item-product-avatar.bottle,
      .item-product-avatar.tech { background: linear-gradient(90deg, #e6edf2, #bfc8d0), radial-gradient(circle at 52% 42%, #44546b 0 15px, transparent 16px); }
      .item-product-avatar.feed { background: linear-gradient(135deg, #d6dde8, #f7ede2), radial-gradient(circle at 40% 60%, #6e5648, transparent 18px); }
      .item-product-avatar span {
        display: grid;
        width: 28px;
        height: 28px;
        place-items: center;
        border-radius: 999px;
        background: rgba(255,255,255,.84);
        color: var(--emy-navy);
        font-size: 12px;
        line-height: 1;
        font-weight: 820;
      }
      .item-product-seller-copy {
        min-width: 0;
      }
      .item-product-seller small {
        display: block;
        color: #667085;
        font-size: 11px;
        line-height: 1.2;
        font-weight: 620;
      }
      .item-product-seller strong {
        display: block;
        overflow: hidden;
        margin-top: 3px;
        color: var(--emy-navy);
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        line-height: 1.2;
        font-weight: 760;
      }
      .item-product-seller-copy span {
        display: block;
        overflow: visible;
        margin-top: 4px;
        color: #667085;
        font-size: 11.5px;
        line-height: 1.25;
        font-weight: 520;
        text-overflow: clip;
        white-space: normal;
        overflow-wrap: anywhere;
      }
      .presence-link {
        position: relative;
        display: inline-block;
        max-width: 100%;
        margin-top: 7px;
        padding-left: 13px;
        color: #0f8f57;
        text-decoration: none;
        font-size: 11.5px;
        line-height: 1.25;
        font-weight: 760;
        overflow-wrap: anywhere;
        white-space: normal;
      }
      .presence-link::before {
        content: "";
        position: absolute;
        left: 0;
        top: .38em;
        width: 7px;
        height: 7px;
        border-radius: 999px;
        background: #10b981;
        box-shadow: 0 0 0 3px rgba(16,185,129,.13);
      }
      .presence-link.is-offline {
        color: #d92d20;
      }
      .presence-link.is-offline::before {
        background: #f04438;
        box-shadow: 0 0 0 3px rgba(240,68,56,.12);
      }
      .item-business-copy .presence-link,
      .item-product-seller-copy .presence-link {
        display: inline-block;
        max-width: 100%;
        overflow: visible;
        margin-top: 6px;
        text-overflow: clip;
        white-space: normal;
        overflow-wrap: anywhere;
      }
      .item-product-section-title .presence-link {
        margin-top: 0;
        font-size: 11px;
      }
      .item-product-profile-pill,
      .item-product-actions a,
      .item-product-actions button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 36px;
        border-radius: 999px;
        cursor: pointer;
        padding: 0 12px;
        text-decoration: none;
        font-size: 12px;
        line-height: 1;
        font-weight: 760;
      }
      .item-product-profile-pill {
        gap: 6px;
        border: 1px solid rgba(255,106,0,.25);
        background: #fff7ef;
        color: #c14f00;
      }
      .item-product-profile-pill svg,
      .item-product-actions svg,
      .item-product-social svg {
        width: 16px;
        height: 16px;
        flex: 0 0 auto;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }
      .item-product-connect {
        display: grid;
        gap: 7px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 8px;
        background: linear-gradient(180deg, rgba(255,255,255,.82), rgba(248,250,253,.64));
        padding: 9px 10px;
      }
      .item-product-connect-copy {
        display: flex;
        min-width: 0;
        align-items: baseline;
        gap: 7px;
        flex-wrap: wrap;
      }
      .item-product-connect-copy small {
        display: inline-flex;
        color: #667085;
        font-size: 10.5px;
        line-height: 1.2;
        font-weight: 680;
      }
      .item-product-connect-copy strong {
        display: inline-flex;
        margin-top: 0;
        color: var(--emy-navy);
        font-size: 13px;
        line-height: 1.18;
        font-weight: 780;
      }
      .item-product-feedback {
        display: none;
        margin: -1px 0 0;
        color: #667085;
        font-size: 11px;
        line-height: 1.25;
        font-weight: 540;
      }
      .item-product-feedback.is-visible { display: block; }
      .item-product-specs {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
        margin: 0;
        border: 0;
        background: transparent;
      }
      .item-product-specs div {
        display: grid;
        gap: 5px;
        min-width: 0;
        min-height: 66px;
        align-content: start;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 8px;
        background: linear-gradient(180deg, rgba(255,255,255,.94), rgba(248,250,253,.82));
        padding: 10px 11px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.82);
      }
      .item-product-specs div:last-child {
        grid-column: 1 / -1;
        min-height: 58px;
      }
      .item-product-specs div.is-distance {
        gap: 8px;
        border-color: rgba(255,106,0,.18);
        background: linear-gradient(135deg, rgba(255,250,245,.96), rgba(255,255,255,.92) 48%, rgba(246,249,255,.92));
        padding: 12px;
        box-shadow: 0 10px 24px rgba(0,27,71,.055), inset 0 1px 0 rgba(255,255,255,.9);
      }
      .item-product-specs dt {
        color: #7a8599;
        font-size: 10.5px;
        line-height: 1.15;
        font-weight: 760;
        text-transform: uppercase;
      }
      .item-product-specs dd {
        min-width: 0;
        margin: 0;
        color: var(--emy-navy);
        font-size: 13px;
        line-height: 1.28;
        font-weight: 760;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      .item-product-specs div.is-distance dd {
        display: grid;
        gap: 6px;
        font-weight: 650;
        word-break: normal;
      }
      .item-product-distance-main {
        display: inline-flex;
        width: fit-content;
        align-items: center;
        gap: 6px;
        border-radius: 999px;
        background: #fff1e6;
        padding: 7px 10px;
        color: #c45100;
        font-size: 14px;
        line-height: 1;
        font-weight: 850;
      }
      .item-product-distance-main svg {
        width: 15px;
        height: 15px;
        flex: 0 0 auto;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .item-product-distance-sub {
        color: #53627a;
        font-size: 12px;
        line-height: 1.25;
        font-weight: 760;
      }
      .item-product-distance-address {
        display: -webkit-box;
        overflow: hidden;
        color: var(--emy-navy);
        font-size: 12.5px;
        line-height: 1.36;
        font-weight: 650;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .item-product-actions {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 7px;
      }
      .item-product-actions a,
      .item-product-actions button {
        min-height: 34px;
        gap: 6px;
        border-radius: 8px;
        padding: 0 10px;
        font-size: 11.5px;
        line-height: 1.05;
        text-align: center;
        white-space: normal;
      }
      .item-product-chat {
        border: 0;
        background: var(--emy-orange);
        color: #fff;
        box-shadow: 0 8px 16px rgba(255,106,0,.14);
      }
      .item-product-customer {
        border: 1px solid rgba(0,27,71,.12);
        background: var(--emy-navy);
        color: #fff;
      }
      .item-product-customer.is-active {
        border-color: rgba(15,143,87,.24);
        background: #0f8f57;
        color: #fff;
      }
      .item-product-profile {
        border: 1px solid rgba(0,27,71,.10);
        background: #fff;
        color: var(--emy-navy);
      }
      .item-product-social {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 8px;
      }
      .item-product-social button {
        display: grid;
        min-height: 58px;
        grid-template-columns: 22px minmax(0, 1fr);
        align-items: center;
        gap: 7px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 8px;
        background: #fff;
        color: var(--emy-navy);
        cursor: pointer;
        padding: 9px;
        text-align: left;
      }
      .item-product-social button:hover {
        border-color: rgba(255,106,0,.22);
        background: #fff8f1;
      }
      .item-product-social button.is-active {
        border-color: rgba(255,106,0,.34);
        background: #fff4e8;
        color: #c14f00;
      }
      .item-product-social span {
        display: grid;
        min-width: 0;
        gap: 2px;
      }
      .item-product-social strong {
        overflow: hidden;
        color: inherit;
        font-size: 12px;
        line-height: 1;
        font-weight: 780;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-product-social small {
        color: #667085;
        font-size: 10px;
        line-height: 1;
        font-weight: 620;
      }
      .item-product-owner-panel {
        display: grid;
        gap: 12px;
        border: 1px solid rgba(255,106,0,.16);
        border-radius: 8px;
        background: linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,247,239,.78));
        padding: 12px;
        box-shadow: 0 14px 30px rgba(0,27,71,.07);
      }
      .item-product-owner-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }
      .item-product-owner-head span {
        display: grid;
        min-width: 0;
        gap: 4px;
      }
      .item-product-owner-head small {
        color: #c14f00;
        font-size: 10px;
        line-height: 1;
        font-weight: 860;
        text-transform: uppercase;
      }
      .item-product-owner-head strong {
        color: var(--emy-navy);
        font-size: 16px;
        line-height: 1.15;
        font-weight: 880;
      }
      .item-product-owner-head em {
        color: #667085;
        font-style: normal;
        font-size: 12px;
        line-height: 1.35;
        font-weight: 620;
      }
      .item-product-owner-stats {
        flex: 0 0 auto;
        min-height: 36px;
        border: 0;
        border-radius: 999px;
        background: var(--emy-orange);
        color: #fff;
        cursor: pointer;
        padding: 0 14px;
        font: inherit;
        font-size: 12px;
        line-height: 1;
        font-weight: 850;
        box-shadow: 0 12px 24px rgba(255,106,0,.20);
      }
      .item-product-owner-metrics {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
      .item-product-owner-metric {
        min-width: 0;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 8px;
        background: #fff;
        padding: 10px;
        text-align: left;
        font: inherit;
        cursor: pointer;
        transition: border-color .18s ease, background .18s ease, box-shadow .18s ease, transform .18s ease;
      }
      .item-product-owner-metric:hover,
      .item-product-owner-metric:focus-visible,
      .item-product-owner-metric.is-active {
        border-color: rgba(255,106,0,.42);
        background: #fff7ed;
        box-shadow: 0 10px 22px rgba(255,106,0,.12);
        outline: none;
      }
      .item-product-owner-metric:active {
        transform: translateY(1px);
      }
      .item-product-owner-metric span {
        display: block;
        color: #667085;
        font-size: 10px;
        line-height: 1;
        font-weight: 820;
        text-transform: uppercase;
      }
      .item-product-owner-metric strong {
        display: block;
        margin-top: 7px;
        color: var(--emy-navy);
        font-size: 22px;
        line-height: 1;
        font-weight: 920;
      }
      .item-product-owner-metric small {
        display: block;
        margin-top: 5px;
        color: #667085;
        font-size: 10.5px;
        line-height: 1.25;
        font-weight: 620;
      }
      .item-product-owner-activity {
        display: grid;
        gap: 8px;
      }
      .item-product-owner-activity-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        color: var(--emy-navy);
        font-size: 13px;
        line-height: 1.2;
        font-weight: 820;
      }
      .item-product-owner-activity-list {
        display: grid;
        gap: 7px;
      }
      .item-product-owner-activity-row {
        display: grid;
        grid-template-columns: 34px minmax(0, 1fr) auto;
        gap: 9px;
        align-items: center;
        border: 1px solid rgba(0,27,71,.07);
        border-radius: 8px;
        background: #fff;
        padding: 9px 10px;
      }
      .item-product-owner-activity-avatar {
        width: 34px;
        height: 34px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        overflow: hidden;
        text-decoration: none;
        background: linear-gradient(135deg, #fff7ed, #e8eef8);
        color: var(--emy-navy);
        font-size: 12px;
        font-weight: 860;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.08);
      }
      .item-product-owner-activity-avatar img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      .item-product-owner-activity-avatar span {
        display: block;
        margin: 0;
        color: inherit;
        font-size: inherit;
        line-height: 1;
        font-weight: inherit;
      }
      .item-product-owner-activity-main {
        min-width: 0;
        color: inherit;
        text-decoration: none;
      }
      .item-product-owner-activity-main:hover strong,
      .item-product-owner-activity-main:focus-visible strong {
        color: var(--emy-orange);
      }
      .item-product-owner-activity-row strong {
        display: block;
        overflow: hidden;
        color: var(--emy-navy);
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        line-height: 1.2;
        font-weight: 820;
      }
      .item-product-owner-activity-main > span {
        display: block;
        margin-top: 3px;
        color: #667085;
        font-size: 11.5px;
        line-height: 1.3;
        font-weight: 620;
        overflow-wrap: anywhere;
      }
      .item-product-owner-activity-row small {
        color: #8a94a6;
        font-size: 10.5px;
        line-height: 1;
        font-weight: 760;
        white-space: nowrap;
        text-align: right;
      }
      .item-product-owner-activity-more {
        width: 100%;
        min-height: 38px;
        border: 1px solid rgba(255,106,0,.28);
        border-radius: 999px;
        background: #fff7ed;
        color: var(--emy-orange);
        cursor: pointer;
        font-size: 12px;
        line-height: 1;
        font-weight: 840;
      }
      .item-product-owner-activity-more:hover,
      .item-product-owner-activity-more:focus-visible {
        border-color: rgba(255,106,0,.5);
        background: #fff;
        outline: none;
      }
      .item-product-owner-empty {
        margin: 0;
        border: 1px dashed rgba(0,27,71,.14);
        border-radius: 8px;
        background: rgba(248,250,252,.88);
        color: #667085;
        padding: 12px;
        text-align: center;
        font-size: 12px;
        line-height: 1.35;
        font-weight: 720;
      }
      .emy-repost-dialog {
        position: fixed;
        inset: 0;
        z-index: 10090;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 18px;
        background: rgba(0,27,71,.38);
        backdrop-filter: blur(10px);
      }
      .emy-repost-dialog.is-open { display: flex; }
      .emy-repost-card {
        width: min(100%, 520px);
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.74);
        border-radius: 18px;
        background: linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,248,240,.90));
        color: var(--emy-navy);
        box-shadow: 0 28px 70px rgba(0,27,71,.24), inset 0 1px 0 rgba(255,255,255,.88);
      }
      .emy-repost-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-bottom: 1px solid rgba(0,27,71,.08);
        padding: 16px 18px;
      }
      .emy-repost-head strong { display: block; font-size: 18px; line-height: 1.15; font-weight: 880; }
      .emy-repost-head span { display: block; margin-top: 4px; color: #667085; font-size: 12px; line-height: 1.3; font-weight: 640; }
      .emy-repost-close {
        width: 36px;
        height: 36px;
        border: 0;
        border-radius: 999px;
        background: rgba(255,255,255,.68);
        color: var(--emy-navy);
        cursor: pointer;
        font-size: 22px;
        line-height: 1;
        font-weight: 780;
      }
      .emy-repost-body { display: grid; gap: 12px; padding: 16px 18px 18px; }
      .emy-repost-source {
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 12px;
        background: rgba(255,255,255,.70);
        padding: 11px 12px;
        color: #344054;
        font-size: 12px;
        line-height: 1.35;
        font-weight: 720;
      }
      .emy-repost-body textarea {
        width: 100%;
        min-height: 118px;
        resize: vertical;
        box-sizing: border-box;
        border: 1px solid rgba(0,27,71,.12);
        border-radius: 14px;
        background: #fff;
        color: var(--emy-navy);
        outline: 0;
        padding: 12px;
        font: inherit;
        font-size: 14px;
        line-height: 1.4;
      }
      .emy-repost-body textarea:focus { border-color: rgba(255,106,0,.44); box-shadow: 0 0 0 4px rgba(255,106,0,.10); }
      .emy-repost-actions { display: flex; justify-content: flex-end; gap: 10px; }
      .emy-repost-actions button {
        min-height: 40px;
        border-radius: 999px;
        cursor: pointer;
        padding: 0 16px;
        font: inherit;
        font-size: 13px;
        line-height: 1;
        font-weight: 820;
      }
      .emy-repost-cancel { border: 1px solid rgba(0,27,71,.10); background: #fff; color: var(--emy-navy); }
      .emy-repost-submit { border: 0; background: var(--emy-orange); color: #fff; box-shadow: 0 12px 24px rgba(255,106,0,.22); }
      .item-product-comment-preview {
        display: grid;
        grid-template-columns: 30px minmax(0, 1fr) auto;
        gap: 9px;
        align-items: center;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 8px;
        background: #fff;
        padding: 9px;
      }
      .item-product-comment-avatar {
        display: grid;
        width: 30px;
        height: 30px;
        place-items: center;
        border-radius: 999px;
        background: #eef3f8;
        color: var(--emy-navy);
        font-size: 11px;
        font-weight: 760;
        text-decoration: none;
        cursor: pointer;
      }
      .item-product-comment-avatar.has-image {
        overflow: hidden;
        background: #fff;
        color: transparent;
      }
      .item-product-comment-avatar img {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        object-fit: cover;
        display: block;
      }
      .item-product-comment-preview input {
        width: 100%;
        min-width: 0;
        height: 34px;
        border: 0;
        border-radius: 8px;
        background: #f6f8fb;
        color: var(--emy-navy);
        padding: 0 10px;
        font: inherit;
        font-size: 12px;
        outline: none;
      }
      .item-product-comment-preview button {
        min-height: 34px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: #fff;
        color: var(--emy-navy);
        cursor: pointer;
        padding: 0 10px;
        font-size: 11.5px;
        line-height: 1;
        font-weight: 760;
      }
      .item-product-section {
        display: grid;
        gap: 10px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 8px;
        background: #fff;
        padding: 12px;
      }
      .item-product-chat-box {
        scroll-margin-top: 58px;
      }
      .item-product-section.is-highlighted {
        border-color: rgba(255,106,0,.34);
        box-shadow: 0 0 0 3px rgba(255,106,0,.10);
      }
      .item-product-section-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .item-product-section-title strong {
        color: var(--emy-navy);
        font-size: 14px;
        line-height: 1.2;
        font-weight: 780;
      }
      .item-product-section-title span {
        color: #667085;
        font-size: 11px;
        line-height: 1.2;
        font-weight: 620;
      }
      .item-product-section-note {
        margin: -3px 0 0;
        color: #667085;
        font-size: 11.5px;
        line-height: 1.4;
        font-weight: 500;
      }
      .item-product-comment-list {
        display: grid;
        gap: 9px;
        max-height: min(260px, 30dvh);
        overflow-y: auto;
        overscroll-behavior: contain;
        padding-right: 4px;
      }
      .item-product-comment-list::-webkit-scrollbar { width: 8px; }
      .item-product-comment-list::-webkit-scrollbar-thumb { border-radius: 999px; background: rgba(0,27,71,.20); }
      .item-product-comment-list::-webkit-scrollbar-track { background: transparent; }
      .item-product-comment-row {
        display: grid;
        grid-template-columns: 30px minmax(0, 1fr);
        gap: 9px;
        align-items: start;
      }
      .item-product-comment-bubble {
        border-radius: 8px;
        background: #f6f8fb;
        color: #667085;
        padding: 8px 10px;
        font-size: 12px;
        line-height: 1.35;
        font-weight: 520;
      }
      .item-product-comment-bubble strong {
        display: block;
        margin-bottom: 2px;
        color: var(--emy-navy);
        font-size: 12px;
        line-height: 1.2;
        font-weight: 760;
      }
      .item-product-comment-text {
        display: block;
        overflow-wrap: anywhere;
      }
      .item-product-comment-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
        margin-top: 7px;
      }
      .item-product-comment-like,
      .item-product-comment-dislike,
      .item-product-comment-reply,
      .item-product-comment-edit,
      .item-product-comment-delete,
      .item-product-comment-save-edit,
      .item-product-comment-cancel-edit {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: auto;
        min-width: 18px;
        height: 22px;
        min-height: 22px;
        gap: 4px;
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: #7a869e;
        cursor: pointer;
        padding: 0 2px;
        font: inherit;
        font-size: 0;
        line-height: 1;
        font-weight: 680;
        box-shadow: none;
      }
      .item-product-comment-delete { color: #d92d20; }
      .item-product-comment-like,
      .item-product-comment-dislike {
        width: auto;
        gap: 4px;
        padding: 0 2px;
      }
      .item-product-comment-like svg,
      .item-product-comment-dislike svg,
      .item-product-comment-reply svg,
      .item-product-comment-edit svg,
      .item-product-comment-delete svg,
      .item-product-comment-save-edit svg,
      .item-product-comment-cancel-edit svg {
        width: 14px;
        height: 14px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }
      .item-product-comment-actions [data-item-product-comment-like-count],
      .item-product-comment-actions [data-item-product-comment-dislike-count] {
        min-width: 14px;
        color: #7a869e;
        font-size: 11px;
        font-weight: 830;
        text-align: center;
      }
      .comment-action-label {
        display: none !important;
      }
      .item-product-comment-like.is-active {
        color: var(--emy-orange);
        background: transparent;
      }
      .item-product-comment-dislike.is-active {
        color: var(--emy-orange);
        background: transparent;
      }
      .item-product-comment-replies {
        display: grid;
        gap: 7px;
        margin-top: 8px;
      }
      .item-product-comment-reply-row {
        display: grid;
        grid-template-columns: 24px minmax(0, 1fr);
        gap: 7px;
        align-items: start;
      }
      .item-product-comment-reply-row .item-product-comment-avatar {
        width: 24px;
        height: 24px;
        font-size: 9px;
      }
      .item-product-comment-reply-row .item-product-comment-actions {
        margin-top: 6px;
      }
      .item-product-comment-reply-form {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 7px;
        margin-top: 8px;
        background: transparent;
      }
      .item-product-comment-reply-form[hidden] {
        display: none;
      }
      .item-product-comment-reply-form input {
        min-width: 0;
        height: 32px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 999px;
        background: #fff;
        color: var(--emy-navy);
        padding: 0 38px 0 10px;
        font: inherit;
        font-size: 12px;
        outline: none;
      }
      .item-product-comment-reply-form button {
        width: auto;
        min-width: 42px;
        height: 26px;
        min-height: 26px;
        border: 1px solid rgba(255,106,0,.34);
        border-radius: 999px;
        background: linear-gradient(145deg, rgba(255,106,0,.18), rgba(255,106,0,.10));
        color: #c14f00;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        padding: 0 7px;
        font-size: 10px;
        font-weight: 820;
        white-space: nowrap;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.22);
        backdrop-filter: blur(10px) saturate(1.08);
      }
      .item-product-comment-reply-form button::after {
        content: "Reply";
      }
      .item-product-comment-reply-form button svg {
        display: block;
        width: 11px;
        height: 11px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.2;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: 1;
      }
      .item-product-comment-edit-field {
        width: 100%;
        min-height: 34px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: #fff;
        color: var(--emy-navy);
        padding: 7px 9px;
        font: inherit;
        font-size: 12px;
        outline: none;
      }
      .item-product-chat-thread {
        display: grid;
        gap: 8px;
        align-content: start;
        max-height: min(300px, 34dvh);
        overflow-y: auto;
        overscroll-behavior: contain;
        border-radius: 8px;
        background: #f7f9fc;
        padding: 10px;
      }
      .item-product-chat-thread::-webkit-scrollbar { width: 8px; }
      .item-product-chat-thread::-webkit-scrollbar-thumb { border-radius: 999px; background: rgba(0,27,71,.22); }
      .item-product-chat-thread::-webkit-scrollbar-track { background: transparent; }
      .item-product-chat-message {
        max-width: 86%;
        width: fit-content;
        border-radius: 10px;
        background: #fff;
        color: #667085;
        padding: 8px 10px;
        font-size: 12px;
        line-height: 1.35;
        font-weight: 520;
        box-shadow: 0 1px 0 rgba(0,27,71,.06);
      }
      .item-product-chat-message.is-user {
        justify-self: end;
        background: var(--emy-navy);
        color: #fff;
      }
      .item-product-chat-text {
        display: block;
        overflow-wrap: anywhere;
      }
      .item-product-chat-message strong {
        display: block;
        margin-bottom: 2px;
        color: inherit;
        font-size: 12px;
        line-height: 1.2;
        font-weight: 760;
      }
      .item-product-chat-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
        margin-top: 7px;
      }
      .item-product-chat-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        min-width: 28px;
        height: 28px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 999px;
        background: rgba(255,255,255,.68);
        color: inherit;
        cursor: pointer;
        opacity: .78;
        padding: 0 7px;
        font: inherit;
        font-size: 11px;
        line-height: 1;
        font-weight: 680;
      }
      .item-product-chat-action svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .item-product-chat-action:hover,
      .item-product-chat-action.is-active { opacity: 1; color: var(--emy-orange); }
      .item-product-chat-message.is-user .item-product-chat-action:hover,
      .item-product-chat-message.is-user .item-product-chat-action.is-active { color: #ffb067; }
      .item-product-chat-action.is-danger:hover { color: #ffb4a8; }
      .item-product-chat-edit-field {
        width: 100%;
        min-height: 34px;
        border: 1px solid rgba(255,255,255,.24);
        border-radius: 8px;
        background: rgba(255,255,255,.94);
        color: var(--emy-navy);
        padding: 7px 9px;
        font: inherit;
        font-size: 12px;
        outline: none;
      }
      .item-product-chat-compose {
        position: relative;
        z-index: 5;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        gap: 9px;
      }
      .item-product-chat-compose input {
        position: relative;
        z-index: 1;
        min-width: 0;
        height: 36px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 8px;
        background: #f6f8fb;
        color: var(--emy-navy);
        padding: 0 10px;
        font: inherit;
        font-size: 12px;
        outline: none;
      }
      .item-product-chat-compose button {
        min-height: 36px;
        border: 0;
        border-radius: 8px;
        background: var(--emy-orange);
        color: #fff;
        cursor: pointer;
        padding: 0 13px;
        font-size: 11.5px;
        line-height: 1;
        font-weight: 780;
      }
      .item-product-chat-attach {
        width: 38px;
        min-width: 38px;
        display: grid;
        place-items: center;
        background: #fff !important;
        color: var(--emy-navy) !important;
        border: 1px solid rgba(0,27,71,.10) !important;
        padding: 0 !important;
      }
      .item-product-chat-attach svg {
        width: 17px;
        height: 17px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
      }
      .item-product-chat-attach.is-active {
        border-color: rgba(255,106,0,.42) !important;
        background: #fff4e8 !important;
        color: var(--emy-orange) !important;
      }
      .item-product-chat-attach-preview {
        display: grid;
        grid-template-columns: 48px minmax(0, 1fr) auto;
        gap: 9px;
        align-items: center;
        margin: 0 0 9px;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 10px;
        background: #fff;
        color: var(--emy-navy);
        padding: 8px;
        box-shadow: 0 8px 18px rgba(0,27,71,.05);
      }
      .item-product-chat-attach-preview[hidden] { display: none !important; }
      .item-product-chat-attach-preview-media,
      .item-product-chat-reference-media {
        position: relative;
        width: 48px;
        height: 48px;
        border-radius: 8px;
        overflow: hidden;
        background: linear-gradient(145deg, #dbe4ec, #f8fbff);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.62);
      }
      .item-product-chat-reference-media img,
      .item-product-chat-reference-media video {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: var(--media-fit, cover);
        transform: translate(var(--media-x, 0%), var(--media-y, 0%)) scale(var(--media-zoom, 1));
        transform-origin: center;
        background: #f8fbff;
      }
      .item-product-chat-attach-preview-media.pizza,
      .item-product-chat-reference-media.pizza,
      .item-product-chat-attach-preview-media.reel-a,
      .item-product-chat-reference-media.reel-a { background: radial-gradient(circle at 34% 42%, #ffd8a8 0 15px, transparent 16px), radial-gradient(circle at 66% 34%, #ed4f37 0 8px, transparent 9px), linear-gradient(135deg,#f9b15d,#7c301b); }
      .item-product-chat-attach-preview-media.shop,
      .item-product-chat-reference-media.shop { background: linear-gradient(135deg,#e8edf1,#fff), radial-gradient(circle at 66% 30%, #d6a083, transparent 26px), linear-gradient(90deg,#39424f,transparent); }
      .item-product-chat-attach-preview-media.bottle,
      .item-product-chat-reference-media.bottle { background: linear-gradient(90deg,#e6edf2,#bfc8d0), radial-gradient(circle at 52% 42%, #44546b 0 16px, transparent 17px); }
      .item-product-chat-attach-preview-media.feed,
      .item-product-chat-reference-media.feed,
      .item-product-chat-attach-preview-media.reel,
      .item-product-chat-reference-media.reel,
      .item-product-chat-attach-preview-media.reel-b,
      .item-product-chat-reference-media.reel-b { background: linear-gradient(145deg, #d9e6ef, #786f69), radial-gradient(circle at 64% 18%, rgba(255,255,255,.55), transparent 28px); }
      .item-product-chat-attach-preview-copy,
      .item-product-chat-reference-copy { min-width: 0; display: grid; gap: 2px; }
      .item-product-chat-attach-preview-copy small,
      .item-product-chat-reference-copy small {
        width: fit-content;
        border-radius: 999px;
        background: #fff4e8;
        color: #c14f00;
        padding: 3px 6px;
        font-size: 9px;
        line-height: 1;
        font-weight: 820;
        text-transform: uppercase;
      }
      .item-product-chat-attach-preview.is-post small,
      .item-product-chat-reference.is-post small { background: #eef4ff; color: #175cd3; }
      .item-product-chat-attach-preview.is-clip small,
      .item-product-chat-reference.is-clip small { background: #eef8f3; color: #067647; }
      .item-product-chat-attach-preview-copy strong,
      .item-product-chat-reference-copy strong {
        overflow: hidden;
        color: inherit;
        font-size: 12px;
        line-height: 1.18;
        font-weight: 840;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-product-chat-attach-preview-copy span,
      .item-product-chat-reference-copy span {
        display: -webkit-box;
        overflow: hidden;
        color: inherit;
        opacity: .76;
        font-size: 10.5px;
        line-height: 1.25;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .item-product-chat-attach-preview-note {
        color: var(--emy-orange);
        font-size: 10px;
        line-height: 1.1;
        font-weight: 780;
        white-space: nowrap;
      }
      .item-product-chat-reference {
        display: grid;
        grid-template-columns: 48px minmax(0, 1fr);
        gap: 9px;
        align-items: center;
        margin-top: 7px;
        border-radius: 10px;
        background: rgba(255,255,255,.12);
        color: inherit;
        padding: 8px;
        text-decoration: none;
        box-shadow: inset 3px 0 0 rgba(255,176,103,.95);
      }
      .item-product-chat-reference:hover { transform: translateY(-1px); }
      .item-product-chat-message:not(.is-user) .item-product-chat-reference {
        background: #f2f5f9;
        box-shadow: inset 3px 0 0 rgba(255,106,0,.74);
      }
      .item-detail-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: auto; padding-top: 24px; }
      .item-detail-actions button { height: 42px; border-radius: 999px; cursor: pointer; padding: 0 18px; font-size: 13px; line-height: 1; font-weight: 780; }
      .item-detail-save { border: 0; background: var(--emy-orange); color: #fff; box-shadow: 0 12px 24px rgba(255,106,0,.18); }
      .item-detail-save.is-saved { background: #0f8f57; }
      .item-detail-done { border: 1px solid rgba(0,27,71,.10); background: rgba(255,255,255,.82); color: var(--emy-navy); }
      .item-job-panel { display: grid; gap: 14px; margin-top: 18px; }
      .item-job-panel[hidden] { display: none !important; }
      .item-detail-modal.is-job .item-detail-card { width: min(100%, 720px); }
      .item-detail-modal.is-job .item-detail-layout { grid-template-columns: 1fr; }
      .item-detail-modal.is-job .item-detail-art { display: none; }
      .item-detail-modal.is-job .item-detail-kind,
      .item-detail-modal.is-job .item-detail-copy > h2,
      .item-detail-modal.is-job .item-detail-business,
      .item-detail-modal.is-job .item-detail-description,
      .item-detail-modal.is-job .item-detail-price,
      .item-detail-modal.is-job .item-detail-meta,
      .item-detail-modal.is-job .item-detail-actions {
        display: none;
      }
      .item-detail-modal.is-job .item-detail-copy { padding: 2px; }
      .item-detail-modal.is-job .item-job-panel { margin-top: 0; }
      .item-job-card { overflow: hidden; border: 1px solid rgba(255,255,255,.70); border-radius: 18px; background: linear-gradient(145deg, rgba(255,255,255,.88), rgba(244,248,252,.70)); box-shadow: inset 0 1px 0 rgba(255,255,255,.86), 0 16px 34px rgba(0,27,71,.08); }
      .item-job-card-head { position: relative; min-height: 108px; display: grid; align-content: end; gap: 8px; overflow: hidden; isolation: isolate; background: radial-gradient(circle at 86% 20%, rgba(255,106,0,.22), transparent 84px), linear-gradient(135deg,#fff8ef,#e9eef5); padding: 16px; }
      .item-job-card-head.has-cover { min-height: clamp(180px, 30dvh, 280px); background: #001b47; }
      .item-job-card-head.has-cover::after { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(0,27,71,.04) 0%, rgba(0,27,71,.18) 42%, rgba(0,27,71,.70) 100%); pointer-events: none; }
      .item-job-cover-media { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; display: block; object-fit: var(--media-fit, cover); transform: translate(var(--media-x, 0%), var(--media-y, 0%)) scale(var(--media-zoom, 1)); transform-origin: center; background: #0b1f3f; }
      .item-job-card-head span { width: fit-content; border: 1px solid rgba(255,106,0,.16); border-radius: 999px; background: rgba(255,255,255,.84); color: var(--emy-orange); padding: 6px 10px; font-size: 10.5px; line-height: 1; font-weight: 860; }
      .item-job-card-head strong { color: var(--emy-navy); font-size: 22px; line-height: 1.08; font-weight: 840; overflow-wrap: anywhere; }
      .item-job-card-head span,
      .item-job-card-head strong { position: relative; z-index: 2; }
      .item-job-card-head.has-cover span { border-color: rgba(255,255,255,.36); background: rgba(255,255,255,.22); color: #fff; }
      .item-job-card-head.has-cover strong { color: #fff; text-shadow: 0 1px 14px rgba(0,27,71,.50); }
      .item-job-card-body { display: grid; gap: 12px; padding: 14px; }
      .item-job-owner { display: flex; align-items: center; gap: 9px; color: #667085; font-size: 12.5px; line-height: 1.25; font-weight: 720; }
      .item-job-owner i { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 999px; background: #fff; color: var(--emy-navy); font-style: normal; font-weight: 860; box-shadow: 0 0 0 1px rgba(0,27,71,.08), 0 8px 16px rgba(0,27,71,.08); }
      .item-job-owner i.has-image { overflow: hidden; color: transparent; }
      .item-job-owner i img { width: 100%; height: 100%; display: block; object-fit: cover; border-radius: inherit; }
      .item-job-description { margin: 0; color: #46556f; font-size: 13.5px; line-height: 1.45; font-weight: 640; white-space: pre-wrap; overflow-wrap: anywhere; }
      .item-job-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 9px; }
      .item-job-grid span { min-width: 0; border-radius: 13px; background: rgba(255,255,255,.74); color: var(--emy-navy); padding: 10px 11px; font-size: 12px; line-height: 1.25; font-weight: 760; box-shadow: inset 0 0 0 1px rgba(0,27,71,.06); overflow-wrap: anywhere; }
      .item-job-grid span b { display: block; margin-bottom: 3px; color: #667085; font-size: 9.5px; line-height: 1; font-weight: 840; text-transform: uppercase; }
      .item-job-apply-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
      .item-job-apply-row button { min-height: 39px; border: 0; border-radius: 999px; background: var(--emy-orange); color: #fff; cursor: pointer; padding: 0 16px; font: inherit; font-size: 12.5px; line-height: 1; font-weight: 840; box-shadow: 0 12px 24px rgba(255,106,0,.18); }
      .item-job-apply-row button.is-applied { padding: 0 12px; font-size: 10.2px; line-height: 1.05; text-align: center; white-space: normal; max-width: 230px; }
      .item-job-apply-row small { color: #667085; font-size: 12px; line-height: 1.35; font-weight: 650; }
      .item-job-owner-tools { width: 100%; display: flex; flex-wrap: wrap; gap: 8px; border-top: 1px solid rgba(0,27,71,.08); padding-top: 10px; }
      .item-job-owner-tools[hidden] { display: none !important; }
      .item-job-owner-tools button { min-height: 35px; border: 1px solid rgba(0,27,71,.10); border-radius: 999px; background: rgba(255,255,255,.78); color: var(--emy-navy); cursor: pointer; padding: 0 13px; font: inherit; font-size: 12px; line-height: 1; font-weight: 820; box-shadow: inset 0 1px 0 rgba(255,255,255,.82); }
      .item-job-owner-tools button[data-item-job-delete] { border-color: rgba(248,113,113,.24); color: #b42318; }
      .item-event-panel { display: grid; gap: 13px; margin-top: 16px; }
      .item-event-panel[hidden] { display: none !important; }
      .item-detail-modal.is-event .item-detail-card { width: min(100%, 720px); max-height: min(760px, calc(100dvh - 32px)); }
      .item-detail-modal.is-event .item-detail-layout { grid-template-columns: 1fr; gap: 0; padding: 16px; }
      .item-detail-modal.is-event .item-detail-art,
      .item-detail-modal.is-event .item-product-panel,
      .item-detail-modal.is-event .item-business-panel,
      .item-detail-modal.is-event .item-detail-actions { display: none !important; }
      .item-detail-modal.is-event .item-detail-copy { padding: 0; overflow: visible; }
      .item-detail-modal.is-event .item-detail-kind {
        width: fit-content;
        min-height: 28px;
        display: inline-flex;
        align-items: center;
        border: 1px solid rgba(255,106,0,.22);
        border-radius: 999px;
        background: #fff7ed;
        color: var(--emy-orange);
        padding: 0 11px;
        font-size: 10px;
        line-height: 1;
        font-weight: 900;
        text-transform: uppercase;
      }
      .item-detail-modal.is-event .item-detail-copy > h2 {
        margin: 12px 0 7px;
        color: var(--emy-navy);
        font-size: clamp(24px, 4vw, 34px);
        line-height: 1.05;
        font-weight: 900;
        overflow-wrap: anywhere;
      }
      .item-detail-modal.is-event .item-detail-business,
      .item-detail-modal.is-event .item-detail-description {
        margin: 0;
        color: #667085;
        font-size: 14px;
        line-height: 1.45;
        font-weight: 680;
        overflow-wrap: anywhere;
      }
      .item-detail-modal.is-event .item-detail-description { margin-top: 12px; color: #46556f; white-space: pre-wrap; }
      .item-detail-modal.is-event .item-detail-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
      .item-detail-modal.is-event .item-detail-meta span { min-height: 30px; display: inline-flex; align-items: center; border-radius: 999px; background: #f2f4f7; color: #5f6c84; padding: 0 12px; font-size: 12px; line-height: 1; font-weight: 820; }
      .item-detail-modal.is-article { align-items: center; }
      .item-detail-modal.is-article .item-detail-card {
        width: min(1080px, calc(100vw - 28px));
        max-height: calc(100dvh - 32px);
        overflow: hidden;
        border-radius: 20px;
        background: #fff;
      }
      .item-detail-modal.is-article .item-detail-close {
        top: 13px;
        right: 13px;
        left: auto;
        width: 36px;
        min-width: 36px;
        height: 36px;
        display: grid;
        place-items: center;
        border-color: rgba(255,255,255,.74);
        background: linear-gradient(145deg, rgba(255,255,255,.94), rgba(247,250,253,.76));
        color: var(--emy-navy);
        padding: 0;
        font-size: 0;
        font-weight: 820;
        box-shadow: 0 14px 30px rgba(0,27,71,.14), inset 0 1px 0 rgba(255,255,255,.92);
        backdrop-filter: blur(18px) saturate(1.14);
        -webkit-backdrop-filter: blur(18px) saturate(1.14);
      }
      .item-detail-modal.is-article .item-detail-close:hover {
        background: #fff;
        border-color: rgba(255,106,0,.24);
        color: var(--emy-orange);
      }
      .item-detail-modal.is-article .item-detail-close-label { display: none; }
      .item-detail-modal.is-article .item-detail-close-x {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: transparent;
        font-size: 15px;
        line-height: 1;
        font-weight: 820;
      }
      .item-detail-modal.is-article .item-detail-layout {
        --article-cover-height: clamp(210px, 32dvh, 305px);
        height: min(860px, calc(100dvh - 32px));
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(420px, 460px);
        grid-template-rows: var(--article-cover-height) minmax(0, 1fr);
        gap: 0;
        padding: 0;
      }
      .item-detail-modal.is-article .item-detail-art {
        grid-column: 1;
        grid-row: 1;
        display: block;
        min-height: 0;
        height: var(--article-cover-height);
        border: 0;
        border-radius: 20px 0 0 0;
        background: linear-gradient(135deg, #eef3f8, #fff7ed);
        box-shadow: none;
        isolation: isolate;
      }
      .item-detail-modal.is-article .item-detail-art::after { z-index: 2; background: linear-gradient(180deg, rgba(0,27,71,.02) 0%, rgba(0,27,71,.04) 42%, rgba(255,255,255,.16) 68%, rgba(255,255,255,.72) 88%, #fff 100%); }
      .item-detail-modal.is-article .item-detail-art img,
      .item-detail-modal.is-article .item-detail-art video { object-fit: cover; }
      .item-detail-modal.is-article .item-detail-art[hidden] { display: none !important; }
      .item-detail-modal.is-article .item-detail-art[hidden] + .item-detail-copy { grid-row: 1 / span 2; }
      .item-detail-modal.is-article .item-detail-copy {
        grid-column: 1 / -1;
        grid-row: 1 / span 2;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(420px, 460px);
        grid-auto-rows: min-content;
        align-items: start;
        min-height: 0;
        height: 100%;
        overflow: hidden;
        padding: 0;
        background: transparent;
        position: relative;
        z-index: 3;
        box-shadow: none;
      }
      .item-detail-modal.is-article .item-business-panel { display: none !important; }
      .item-detail-modal.is-article .item-product-panel {
        grid-column: 2;
        grid-row: 1 / span 12;
        align-self: start;
        height: auto;
        max-height: calc(100dvh - 140px);
        display: flex !important;
        flex-direction: column;
        align-content: start;
        gap: 0;
        min-height: 0;
        overflow: hidden;
        margin: 66px 16px 0 0;
        border-top: 0;
        border-left: 1px solid rgba(0,27,71,.08);
        border-radius: 0;
        background: #fff;
        padding: 0;
        box-shadow: none;
      }
      .item-detail-modal.is-article .item-product-note,
      .item-detail-modal.is-article .item-product-seller,
      .item-detail-modal.is-article .item-product-specs,
      .item-detail-modal.is-article .item-product-connect,
      .item-detail-modal.is-article .item-product-chat-box { display: none !important; }
      .item-detail-modal.is-article .item-product-social {
        order: 1;
        flex: 0 0 auto;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 8px;
        margin: 0;
        border-top: 1px solid rgba(0,27,71,.08);
        border-bottom: 1px solid rgba(0,27,71,.08);
        background: #fff;
        padding: 15px 10px 14px;
      }
      .item-detail-modal.is-article .item-product-social button {
        min-height: 42px;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        grid-template-columns: 20px minmax(0, 1fr);
        justify-items: center;
        align-items: center;
        gap: 7px;
        padding: 0 5px;
        text-align: left;
      }
      .item-detail-modal.is-article .item-product-social button:hover,
      .item-detail-modal.is-article .item-product-social button.is-active {
        background: transparent;
        color: var(--emy-orange);
        transform: none;
      }
      .item-detail-modal.is-article .item-product-social button svg { width: 18px; height: 18px; }
      .item-detail-modal.is-article .item-product-social span { gap: 2px; }
      .item-detail-modal.is-article .item-product-social strong { color: var(--emy-navy); font-size: 14px; line-height: 1; font-weight: 880; }
      .item-detail-modal.is-article .item-product-social small { color: #667085; font-size: 11px; line-height: 1.05; font-weight: 720; }
      .item-detail-modal.is-article .item-product-comments {
        order: 2;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        min-height: 0;
        overflow: hidden;
        border: 0;
        border-radius: 0;
        background: #fff;
        padding: 18px 10px 0;
      }
      .item-detail-modal.is-article .item-product-comments .item-product-section-title {
        flex: 0 0 auto;
      }
      .item-detail-modal.is-article .item-product-comments .item-product-section-title strong {
        font-size: 18px;
        line-height: 1.15;
        font-weight: 880;
      }
      .item-detail-modal.is-article .item-product-comments .item-product-section-note {
        flex: 0 0 auto;
        margin: 16px 0 16px;
        color: #667085;
        font-size: 14px;
        line-height: 1.4;
      }
      .item-detail-modal.is-article .item-product-comment-list {
        flex: 1 1 auto;
        min-height: clamp(150px, 28dvh, 260px);
        max-height: none;
        overflow: auto;
        padding-right: 4px;
      }
      .item-detail-modal.is-article .item-product-comment-preview {
        flex: 0 0 auto;
        grid-template-columns: 38px minmax(0, 1fr) auto;
        gap: 11px;
        margin-top: 18px;
        border-radius: 18px;
        background: #fff;
        padding: 10px 12px;
      }
      .item-detail-modal.is-article .item-product-comment-preview .item-product-comment-avatar {
        width: 38px;
        height: 38px;
      }
      .item-detail-modal.is-article .item-product-comment-preview input {
        height: 42px;
        border-radius: 999px;
        padding: 0 16px;
        font-size: 14px;
      }
      .item-detail-modal.is-article .item-product-comment-preview button {
        min-height: 42px;
        border-radius: 12px;
        padding: 0 16px;
        font-size: 13px;
        font-weight: 820;
      }
      .item-detail-modal.is-article .item-detail-kind { width: fit-content; min-height: 28px; display: inline-flex; align-items: center; border: 1px solid rgba(255,106,0,.22); border-radius: 999px; background: #fff7ed; color: var(--emy-orange); padding: 0 11px; font-size: 10px; line-height: 1; font-weight: 900; text-transform: uppercase; }
      .item-detail-modal.is-article .item-detail-kind,
      .item-detail-modal.is-article .item-detail-copy > h2,
      .item-detail-modal.is-article .item-detail-business,
      .item-detail-modal.is-article .item-detail-description,
      .item-detail-modal.is-article .item-detail-meta {
        grid-column: 1;
        margin-left: clamp(18px, 3vw, 34px);
        margin-right: clamp(18px, 3vw, 34px);
      }
      .item-detail-modal.is-article .item-detail-kind {
        margin-top: calc(var(--article-cover-height) - 16px);
      }
      .item-detail-modal.is-article .item-detail-copy > h2,
      .item-detail-modal.is-article:not(.is-product):not(.is-business):not(.is-job) .item-detail-copy > h2 {
        display: block;
        max-width: 18ch;
        margin-top: 12px;
        margin-bottom: 7px;
        overflow: visible;
        color: var(--emy-navy);
        font-size: clamp(25px, 3.1vw, 34px);
        line-height: 1.08;
        font-weight: 880;
        overflow-wrap: anywhere;
        -webkit-line-clamp: initial;
      }
      .item-detail-modal.is-article .item-detail-business { display: flex; align-items: center; gap: 10px; margin-top: 0; margin-bottom: 0; color: #667085; font-size: 13.5px; line-height: 1.35; font-weight: 760; }
      .item-detail-modal.is-article .item-detail-business.has-avatar::before {
        content: "";
        width: 42px;
        height: 42px;
        flex: 0 0 auto;
        border-radius: 999px;
        background: #fff var(--item-detail-avatar, linear-gradient(145deg,#fff6ec,#eef3f8)) center / cover no-repeat;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.08), 0 8px 18px rgba(0,27,71,.10);
      }
      .item-detail-modal.is-article .item-detail-description { margin-top: 18px; max-width: min(76ch, calc(100% - clamp(36px, 6vw, 68px))); max-height: clamp(138px, calc(100dvh - var(--article-cover-height) - 176px), 430px); overflow: auto; color: #263348; font-size: clamp(15px, 1.35vw, 16.5px); line-height: 1.65; font-weight: 500; white-space: pre-wrap; overflow-wrap: anywhere; padding-right: 8px; }
      .item-detail-modal.is-article .item-detail-description { padding: 6px 0 24px; scrollbar-width: none; -ms-overflow-style: none; -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 10px, #000 calc(100% - 10px), transparent 100%); mask-image: linear-gradient(180deg, transparent 0, #000 10px, #000 calc(100% - 10px), transparent 100%); }
      .item-detail-modal.is-article .item-detail-description::-webkit-scrollbar { display: none; }
      .item-detail-modal.is-article .item-detail-inline-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 12px; margin-top: 22px; padding-bottom: 8px; white-space: normal; }
      .item-detail-modal.is-article .item-detail-inline-meta span { min-height: 32px; display: inline-flex; align-items: center; border-radius: 999px; background: #f2f4f7; color: #5f6c84; padding: 0 14px; font-size: 12px; line-height: 1.15; font-weight: 820; white-space: nowrap; }
      .item-detail-modal.is-article .item-detail-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 12px; margin-top: 18px; margin-bottom: 26px; }
      .item-detail-modal.is-article .item-detail-meta span { min-height: 32px; display: inline-flex; align-items: center; border-radius: 999px; background: #f2f4f7; color: #5f6c84; padding: 0 14px; font-size: 12px; line-height: 1.15; font-weight: 820; white-space: nowrap; }
      .item-detail-modal.is-article .item-detail-actions { display: none !important; }
      .item-detail-modal.is-job .item-job-card-head strong,
      .item-job-card-head strong,
      .item-detail-modal.is-job .item-job-description,
      .item-job-description,
      .item-detail-modal.is-job .item-job-grid span,
      .item-job-grid span,
      .item-detail-modal.is-job .item-job-grid em,
      .item-job-grid em,
      .item-detail-modal.is-post .item-detail-copy > h2,
      .item-detail-modal.is-post.is-media-post .item-detail-copy h2,
      .item-detail-modal.is-post .item-detail-description,
      .item-detail-modal.is-post.is-media-post .item-detail-description,
      .item-detail-modal.is-event .item-detail-copy > h2,
      .item-detail-modal.is-event .item-detail-description,
      .item-detail-modal.is-article .item-detail-description {
        font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
        font-style: normal;
        letter-spacing: 0;
      }
      .item-detail-modal.is-job .item-job-card-head strong,
      .item-job-card-head strong,
      .item-detail-modal.is-post .item-detail-copy > h2,
      .item-detail-modal.is-post.is-media-post .item-detail-copy h2,
      .item-detail-modal.is-event .item-detail-copy > h2 {
        font-weight: 620;
      }
      .item-detail-modal.is-post.is-text-post .item-detail-copy > h2,
      .item-detail-modal.is-job .item-job-description,
      .item-job-description,
      .item-detail-modal.is-post .item-detail-description,
      .item-detail-modal.is-post.is-media-post .item-detail-description,
      .item-detail-modal.is-event .item-detail-description,
      .item-detail-modal.is-article .item-detail-description {
        color: #344054;
        font-weight: 430;
      }
      .item-detail-modal.is-job .item-job-grid span {
        font-weight: 430;
      }
      .item-job-grid span {
        font-weight: 430;
      }
      .item-detail-modal.is-job .item-job-grid span b {
        color: #7a8599;
        font-weight: 760;
      }
      .item-job-grid span b {
        color: #7a8599;
        font-weight: 760;
      }
      .item-detail-modal.is-job .item-job-grid em {
        display: block;
        color: #344054;
        font-size: 14px;
        line-height: 1.3;
        font-weight: 430;
      }
      .item-job-grid em {
        display: block;
        color: #344054;
        font-size: 14px;
        line-height: 1.3;
        font-weight: 430;
      }
      .item-detail-modal.is-article .item-detail-description {
        line-height: 1.58;
      }
      @media (max-width: 760px) {
        .item-detail-modal.is-article { align-items: end; padding: 10px; }
        .item-detail-modal.is-article .item-detail-card { max-height: calc(100dvh - 20px); overflow: auto; border-radius: 18px 18px 0 0; }
        .item-detail-modal.is-article .item-detail-layout { height: auto; grid-template-columns: 1fr; grid-template-rows: auto auto auto; }
        .item-detail-modal.is-article .item-detail-art { grid-column: 1; grid-row: 1; height: clamp(180px, 34dvh, 280px); border-radius: 18px 18px 0 0; }
        .item-detail-modal.is-article .item-detail-copy,
        .item-detail-modal.is-article .item-detail-art[hidden] + .item-detail-copy { grid-column: 1; grid-row: 2; display: block; overflow: visible; padding: 24px 20px 28px; }
        .item-detail-modal.is-article .item-detail-kind,
        .item-detail-modal.is-article .item-detail-copy > h2,
        .item-detail-modal.is-article .item-detail-business,
        .item-detail-modal.is-article .item-detail-description,
        .item-detail-modal.is-article .item-detail-meta { margin-left: 0; margin-right: 0; }
        .item-detail-modal.is-article .item-detail-close { top: 13px; right: 13px; left: auto; width: 36px; min-width: 36px; height: 36px; padding: 0; }
        .item-detail-modal.is-article .item-detail-kind { margin-top: 0; }
        .item-detail-modal.is-article .item-product-panel { grid-column: 1; grid-row: 3; position: static; height: auto; overflow: visible; margin: 0; border-left: 0; border-top: 1px solid rgba(0,27,71,.08); padding-top: 14px; }
        .item-detail-modal.is-article .item-product-comments { overflow: visible; }
        .item-detail-modal.is-article .item-product-comment-list { overflow: visible; min-height: 0; }
        .item-detail-modal.is-article .item-product-social { grid-template-columns: repeat(2, minmax(0, 1fr)); padding-left: 0; padding-right: 0; }
        .item-detail-modal.is-article .item-detail-copy > h2,
        .item-detail-modal.is-article:not(.is-product):not(.is-business):not(.is-job) .item-detail-copy > h2 { max-width: none; font-size: clamp(24px, 6.8vw, 32px); }
      }
      .item-event-card { overflow: hidden; border: 1px solid rgba(0,27,71,.09); border-radius: 18px; background: linear-gradient(145deg,#fff,#fff8f0); box-shadow: 0 18px 38px rgba(0,27,71,.08); }
      .item-event-cover { position: relative; height: clamp(170px, 28vw, 230px); overflow: hidden; background: linear-gradient(135deg,#eef3f8,#fff8ef); }
      .item-event-cover[hidden] { display: none !important; }
      .item-event-cover::after { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(0,27,71,.02), rgba(0,27,71,.12) 48%, rgba(0,27,71,.48)); pointer-events: none; }
      .item-event-cover img { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; object-fit: cover; display: block; background: #001b47; }
      .item-event-hero { display: grid; grid-template-columns: 78px minmax(0,1fr); gap: 13px; align-items: center; padding: 15px; background: radial-gradient(circle at 92% 10%, rgba(255,106,0,.18), transparent 96px), linear-gradient(135deg,#fff,#edf2f7); }
      .item-event-date { width: 70px; height: 70px; display: grid; place-items: center; border-radius: 18px; background: var(--emy-navy); color: #fff; text-align: center; box-shadow: 0 14px 28px rgba(0,27,71,.18); }
      .item-event-date strong { display: block; font-size: 22px; line-height: 1; font-weight: 900; }
      .item-event-date span { display: block; margin-top: 4px; font-size: 10px; line-height: 1; font-weight: 860; text-transform: uppercase; }
      .item-event-hero-copy { min-width: 0; display: grid; gap: 5px; }
      .item-event-hero-copy strong { color: var(--emy-navy); font-size: 18px; line-height: 1.12; font-weight: 900; overflow-wrap: anywhere; }
      .item-event-hero-copy span { color: #667085; font-size: 12.5px; line-height: 1.3; font-weight: 730; }
      .item-event-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 9px; padding: 13px 15px 0; }
      .item-event-grid span { min-width: 0; border-radius: 13px; background: #fff; color: var(--emy-navy); padding: 10px 11px; font-size: 12px; line-height: 1.25; font-weight: 780; box-shadow: inset 0 0 0 1px rgba(0,27,71,.07); overflow-wrap: anywhere; }
      .item-event-grid b { display: block; margin-bottom: 4px; color: #667085; font-size: 9.5px; line-height: 1; font-weight: 900; text-transform: uppercase; }
      .item-event-actions { display: flex; flex-wrap: wrap; gap: 9px; padding: 14px 15px 15px; }
      .item-event-actions button,
      .item-event-actions a { min-height: 38px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border-radius: 999px; padding: 0 14px; font: inherit; font-size: 12.5px; line-height: 1; font-weight: 860; text-decoration: none; cursor: pointer; }
      .item-event-save { border: 0; background: var(--emy-orange); color: #fff; box-shadow: 0 12px 24px rgba(255,106,0,.18); }
      .item-event-chat,
      .item-event-profile { border: 1px solid rgba(0,27,71,.10); background: #fff; color: var(--emy-navy); }
      .item-event-actions svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      @media (max-width: 640px) {
        .item-detail-modal.is-event { align-items: end; padding: 10px; }
        .item-detail-modal.is-event .item-detail-card { border-radius: 18px 18px 0 0; max-height: calc(100dvh - 20px); }
        .item-detail-modal.is-event .item-event-grid { grid-template-columns: 1fr; }
        .item-detail-modal.is-event .item-event-actions > * { flex: 1 1 auto; }
      }
      .video-duration-badge {
        position: absolute;
        right: 9px;
        bottom: 9px;
        z-index: 7;
        display: inline-flex;
        min-width: 46px;
        min-height: 24px;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: rgba(0,27,71,.76);
        color: #fff;
        padding: 0 8px;
        font-size: 11px;
        line-height: 1;
        font-weight: 820;
        letter-spacing: 0;
        pointer-events: none;
        backdrop-filter: blur(10px);
        transition: opacity .16s ease, transform .16s ease;
      }
      .video-duration-badge[data-countdown="true"]::after { content: " left"; margin-left: 3px; font-size: 9px; font-weight: 780; opacity: .78; }
      .video-duration-badge[hidden] { display: none !important; }
      .clip-progress {
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: 12px;
        z-index: 6;
        height: 4px;
        border-radius: 999px;
        background: rgba(255,255,255,.28);
        overflow: hidden;
        pointer-events: none;
        box-shadow: 0 0 0 1px rgba(0,27,71,.10);
      }
      .clip-progress-fill {
        display: block;
        width: var(--clip-progress, 0%);
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, var(--emy-orange), #ffb067);
        transition: width .18s linear;
      }
      .reel-card .clip-progress,
      .feed-card.is-clip .clip-progress,
      .feed-clip-card .clip-progress,
      .feed-product-clip-card .clip-progress,
      .clip-viewer-media .clip-progress,
      .item-product-gallery-frame .clip-progress,
      .business-preview-card-reel .clip-progress {
        display: none !important;
      }
      .reel-card .video-duration-badge[data-countdown="true"],
      .feed-card.is-clip .video-duration-badge[data-countdown="true"],
      .feed-clip-card .video-duration-badge[data-countdown="true"],
      .feed-product-clip-card .video-duration-badge[data-countdown="true"],
      .clip-viewer-frame .video-duration-badge[data-countdown="true"],
      .item-product-gallery-frame .video-duration-badge[data-countdown="true"],
      .business-preview-card-reel .video-duration-badge[data-countdown="true"] {
        display: none !important;
      }
      .reel-card .photo::after,
      .reel-card .media::after,
      .feed-card.is-clip .feed-media::before,
      .feed-card.is-clip .feed-media::after,
      .feed-clip-card .photo::after,
      .feed-product-clip-card .photo::after,
      .clip-viewer-media::after,
      .business-preview-card-reel .photo::after,
      .business-preview-card-reel .business-preview-media::after,
      .social-feed-card.is-clip .social-feed-media::after {
        opacity: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
      }
      .reel-card .photo,
      .reel-card .media,
      .feed-clip-card .photo,
      .feed-product-clip-card .photo {
        opacity: 1 !important;
      }
      .item-product-gallery-frame .video-duration-badge { bottom: 44px; right: 12px; }
      .clip-viewer-media .video-duration-badge,
      .business-card .photo .video-duration-badge,
      .reel-card .photo .video-duration-badge,
      .reel-card .media .video-duration-badge,
      .feed-media .video-duration-badge { box-shadow: 0 8px 18px rgba(0,0,0,.22); }
      .reel-card .photo .video-duration-badge,
      .reel-card .media .video-duration-badge {
        top: auto;
        right: 12px;
        bottom: 58px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(4px);
      }
      .business-preview-card-reel .business-preview-media .video-duration-badge,
      .feed-media .video-duration-badge,
      .clip-viewer-media .video-duration-badge,
      .business-card .photo .video-duration-badge {
        opacity: 0;
        visibility: hidden;
        transform: translateY(4px);
      }
      .business-preview-card-reel .business-preview-media .video-duration-badge {
        top: auto;
        right: 8px;
        bottom: 10px;
      }
      .feed-media .video-duration-badge {
        top: auto;
        right: 10px;
        bottom: 10px;
      }
      .reel-card:hover .photo .video-duration-badge,
      .reel-card:focus-within .photo .video-duration-badge,
      .reel-card:hover .media .video-duration-badge,
      .reel-card:focus-within .media .video-duration-badge,
      .business-preview-card-reel:hover .business-preview-media .video-duration-badge,
      .business-preview-card-reel:focus-within .business-preview-media .video-duration-badge,
      .feed-card:hover .feed-media .video-duration-badge,
      .feed-card:focus-within .feed-media .video-duration-badge,
      .clip-viewer-frame:hover .clip-viewer-media .video-duration-badge,
      .clip-viewer-frame:focus-within .clip-viewer-media .video-duration-badge,
      .business-card:hover .photo .video-duration-badge,
      .business-card:focus-within .photo .video-duration-badge,
      .business-card .photo:hover .video-duration-badge,
      .business-card .photo:focus-within .video-duration-badge {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .reel-card:hover .photo .video-duration-badge[hidden],
      .reel-card:focus-within .photo .video-duration-badge[hidden],
      .reel-card:hover .media .video-duration-badge[hidden],
      .reel-card:focus-within .media .video-duration-badge[hidden],
      .business-preview-card-reel:hover .business-preview-media .video-duration-badge[hidden],
      .business-preview-card-reel:focus-within .business-preview-media .video-duration-badge[hidden],
      .feed-card:hover .feed-media .video-duration-badge[hidden],
      .feed-card:focus-within .feed-media .video-duration-badge[hidden],
      .clip-viewer-frame:hover .clip-viewer-media .video-duration-badge[hidden],
      .clip-viewer-frame:focus-within .clip-viewer-media .video-duration-badge[hidden],
      .business-card:hover .photo .video-duration-badge[hidden],
      .business-card:focus-within .photo .video-duration-badge[hidden],
      .business-card .photo:hover .video-duration-badge[hidden],
      .business-card .photo:focus-within .video-duration-badge[hidden] {
        display: inline-flex !important;
      }
      .clip-viewer-modal {
        position: fixed;
        inset: 0;
        z-index: 240;
        display: none;
        background: radial-gradient(circle at 78% 10%, rgba(255,106,0,.10), transparent 260px), rgba(255,253,248,.97);
        backdrop-filter: blur(14px);
      }
      .clip-viewer-modal.is-open { display: block; }
      .clip-viewer-close {
        position: fixed;
        right: 22px;
        top: 18px;
        z-index: 4;
        width: 42px;
        height: 42px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        color: var(--emy-navy);
        cursor: pointer;
        display: grid;
        place-items: center;
        font-size: 22px;
        line-height: 1;
        font-weight: 600;
        box-shadow: 0 14px 30px rgba(0,27,71,.12);
      }
      .clip-viewer-track {
        height: 100dvh;
        overflow-y: auto;
        overflow-x: hidden;
        overscroll-behavior: contain;
        scroll-behavior: auto;
        scroll-snap-type: y mandatory;
        scrollbar-width: none;
        touch-action: pan-y;
      }
      .clip-viewer-track::-webkit-scrollbar { display: none; }
      .clip-viewer-slide {
        min-height: 100dvh;
        position: relative;
        display: grid;
        grid-template-columns: minmax(240px, 360px) minmax(240px, 430px);
        justify-content: center;
        align-items: center;
        gap: 22px;
        padding: 30px 22px;
        scroll-snap-align: start;
        scroll-snap-stop: normal;
      }
      .clip-viewer-side {
        align-self: center;
        display: grid;
        gap: 14px;
        justify-items: center;
        min-width: 0;
        max-width: 392px;
      }
      .clip-viewer-side .clip-viewer-info {
        width: 100%;
      }
      .clip-viewer-slide:has(.clip-viewer-comments-panel:not([hidden])),
      .clip-viewer-slide.is-comments-open {
        grid-template-columns: minmax(210px, 320px) minmax(240px, 420px) minmax(300px, 420px);
      }
      .clip-viewer-frame {
        position: relative;
        width: min(430px, calc(100vw - 138px));
        height: min(calc(100dvh - 60px), 760px);
        aspect-ratio: 9 / 16;
        border-radius: 18px;
        overflow: visible;
        background: #111827;
        box-shadow: 0 28px 70px rgba(0,27,71,.24), 0 18px 34px rgba(255,106,0,.10);
      }
      .clip-viewer-media {
        position: absolute;
        inset: 0;
        overflow: hidden;
        border-radius: inherit;
        background: linear-gradient(145deg, #d9e6ef, #786f69), radial-gradient(circle at 64% 18%, rgba(255,255,255,.55), transparent 56px);
        cursor: pointer;
      }
      .clip-viewer-media.pizza, .clip-viewer-media.reel-a { background: radial-gradient(circle at 32% 42%, #ffd9a8 0 42px, transparent 43px), radial-gradient(circle at 67% 34%, #ed4f37 0 19px, transparent 20px), radial-gradient(circle at 56% 66%, #f4edb6 0 40px, transparent 41px), linear-gradient(135deg, #f9a94f, #7c301b); }
      .clip-viewer-media.shop { background: linear-gradient(135deg, #eef3f7, #fff), radial-gradient(circle at 64% 32%, #d8a082, transparent 78px), linear-gradient(90deg, #394250, transparent); }
      .clip-viewer-media.bottle, .clip-viewer-media.clear-bottle { background: linear-gradient(90deg, #e6edf2, #bfc8d0), radial-gradient(circle at 52% 42%, #44546b 0 42px, transparent 43px); }
      .clip-viewer-media.feed, .clip-viewer-media.reel, .clip-viewer-media.reel-b { background: linear-gradient(145deg, #d9e6ef, #786f69), radial-gradient(circle at 64% 18%, rgba(255,255,255,.55), transparent 58px); }
      .clip-viewer-media img, .clip-viewer-media video { width: 100%; height: 100%; object-fit: cover; display: block; }
      .clip-viewer-media .clip-progress { left: 18px; right: 18px; bottom: 18px; height: 5px; background: rgba(255,255,255,.26); }
      .clip-viewer-media .video-duration-badge { opacity: 1; visibility: visible; transform: translateY(0); }
      .clip-viewer-media::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(0,27,71,.10), transparent 34%, rgba(0,27,71,.92));
        pointer-events: none;
      }
      .clip-viewer-controls {
        position: absolute;
        left: auto;
        right: 14px;
        top: 70px;
        z-index: 9;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .clip-viewer-control {
        width: 46px;
        height: 46px;
        border: 1px solid rgba(255,255,255,.16);
        border-radius: 999px;
        background: rgba(0,0,0,.36);
        color: #fff;
        cursor: pointer;
        display: grid;
        place-items: center;
        padding: 0;
        box-shadow: 0 12px 28px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.12);
        backdrop-filter: blur(16px) saturate(1.08);
      }
      .clip-viewer-control:hover,
      .clip-viewer-control[aria-expanded="true"] {
        background: rgba(0,0,0,.48);
        border-color: rgba(255,255,255,.26);
      }
      .clip-viewer-control svg {
        width: 21px;
        height: 21px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.35;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .clip-viewer-control .play-icon { display: none; fill: currentColor; stroke: none; }
      .clip-viewer-frame.is-paused .clip-viewer-control-play .pause-icon { display: none; }
      .clip-viewer-frame.is-paused .clip-viewer-control-play .play-icon { display: block; }
      .clip-viewer-frame.is-muted .clip-viewer-control-sound [data-sound-wave] { display: none; }
      .clip-viewer-frame:not(.is-muted) .clip-viewer-control-sound [data-muted-mark] { display: none; }
      .clip-viewer-volume {
        position: relative;
        display: inline-grid;
        place-items: center;
        --clip-viewer-volume: 1;
      }
      .clip-viewer-volume-popover {
        position: absolute;
        left: auto;
        right: calc(100% + 8px);
        top: 50%;
        z-index: 12;
        width: 42px;
        height: 138px;
        transform: translate(4px, -50%);
        opacity: 0;
        pointer-events: none;
        border: 1px solid rgba(255,255,255,.18);
        border-radius: 999px;
        background: rgba(4,12,26,.78);
        box-shadow: 0 18px 38px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.12);
        backdrop-filter: blur(16px) saturate(1.08);
        touch-action: none;
        transition: opacity .16s ease, transform .16s ease;
      }
      .clip-viewer-volume:hover .clip-viewer-volume-popover,
      .clip-viewer-volume:focus-within .clip-viewer-volume-popover {
        opacity: 1;
        pointer-events: auto;
        transform: translate(0, -50%);
      }
      .clip-viewer-volume-track {
        position: absolute;
        left: 50%;
        top: 15px;
        bottom: 15px;
        width: 8px;
        transform: translateX(-50%);
        border-radius: 999px;
        background: rgba(255,255,255,.20);
      }
      .clip-viewer-volume-fill {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: calc(var(--clip-viewer-volume) * 100%);
        border-radius: inherit;
        background: linear-gradient(180deg, #ffb067, var(--emy-orange));
      }
      .clip-viewer-volume-knob {
        position: absolute;
        left: 50%;
        bottom: calc(var(--clip-viewer-volume) * 100%);
        width: 16px;
        height: 16px;
        transform: translate(-50%, 50%);
        border-radius: 999px;
        background: #fff;
        box-shadow: 0 6px 16px rgba(0,0,0,.26);
      }
      .clip-viewer-volume-slider {
        position: absolute;
        inset: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: ns-resize;
        pointer-events: none;
        touch-action: none;
      }
      .clip-viewer-control-more svg { fill: currentColor; stroke: none; }
      .clip-viewer-more-menu {
        position: fixed;
        left: var(--clip-more-left, 118px);
        top: var(--clip-more-top, 66px);
        z-index: 2147483647;
        width: min(260px, calc(100vw - 24px));
        max-height: min(420px, calc(100dvh - 24px));
        overflow: auto;
        border: 1px solid rgba(255,255,255,.34);
        border-radius: 16px;
        background: rgba(14,23,42,.84);
        color: #fff;
        padding: 7px;
        box-shadow: 0 18px 42px rgba(0,0,0,.32), inset 0 1px 0 rgba(255,255,255,.12);
        backdrop-filter: blur(18px) saturate(1.12);
      }
      .clip-viewer-more-menu[hidden] { display: none !important; }
      .clip-viewer-more-menu button {
        width: 100%;
        min-height: 36px;
        border: 0;
        border-radius: 11px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 0 11px;
        text-align: left;
        font: inherit;
        font-size: 12.5px;
        font-weight: 760;
      }
      .clip-viewer-more-menu button:hover { background: rgba(255,255,255,.12); color: #fff; }
      .clip-viewer-more-menu button.is-danger { color: #ffb4a8; }
      .clip-viewer-play {
        position: absolute;
        left: 50%;
        top: 44%;
        z-index: 2;
        width: 72px;
        height: 72px;
        border-radius: 999px;
        background: rgba(255,255,255,.82);
        color: var(--emy-orange);
        display: grid;
        place-items: center;
        border: 0;
        padding: 0;
        cursor: pointer;
        transform: translate(-50%, -50%);
        box-shadow: 0 14px 30px rgba(0,27,71,.20);
      }
      .clip-viewer-frame.is-playing .clip-viewer-play {
        opacity: 0;
        pointer-events: none;
        transform: translate(-50%, -50%) scale(.92);
      }
      .clip-viewer-play svg { width: 32px; height: 32px; margin-left: 3px; fill: currentColor; }
      .clip-viewer-info {
        align-self: center;
        display: grid;
        gap: 13px;
        color: var(--emy-navy);
        max-width: 392px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 24px;
        background: linear-gradient(145deg, rgba(255,255,255,.90), rgba(255,248,241,.70));
        box-shadow: 0 24px 60px rgba(0,27,71,.10), inset 0 1px 0 rgba(255,255,255,.86);
        padding: 16px;
        backdrop-filter: blur(18px);
      }
      .clip-viewer-creator {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 11px;
        min-width: 0;
        border: 1px solid rgba(0,27,71,.07);
        border-radius: 18px;
        background: rgba(255,255,255,.68);
        padding: 8px;
      }
      .clip-viewer-profile {
        min-width: 0;
        display: grid;
        grid-template-columns: 54px minmax(0, 1fr);
        align-items: center;
        gap: 11px;
        color: inherit;
        text-decoration: none;
        border-radius: 14px;
      }
      .clip-viewer-profile:hover .clip-viewer-identity strong { color: var(--emy-orange); }
      .clip-viewer-avatar {
        flex: 0 0 auto;
        width: 54px;
        height: 54px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        border: 3px solid rgba(255,255,255,.96);
        background: linear-gradient(145deg,#fff,#eef3f8);
        color: #08265a;
        font-size: 18px;
        font-weight: 900;
        line-height: 1;
        text-transform: uppercase;
        box-shadow: 0 0 0 1px rgba(0,27,71,.10), 0 14px 26px rgba(0,27,71,.16);
      }
      .clip-viewer-avatar > span { width: 100%; height: 100%; display: grid; place-items: center; border-radius: inherit; }
      .clip-viewer-avatar.has-image { overflow: hidden; background: #fff; }
      .clip-viewer-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: inherit; }
      .clip-viewer-avatar.pizza { background: radial-gradient(circle at 34% 42%, #ffd8a8 0 17px, transparent 18px), radial-gradient(circle at 67% 34%, #ed4f37 0 9px, transparent 10px), linear-gradient(135deg,#f9b15d,#7c301b); }
      .clip-viewer-avatar.shop { background: linear-gradient(135deg,#eef3f7,#fff), radial-gradient(circle at 64% 32%, #d8a082, transparent 30px), linear-gradient(90deg,#394250,transparent); }
      .clip-viewer-avatar.bottle, .clip-viewer-avatar.clear-bottle { background: linear-gradient(90deg,#e6edf2,#bfc8d0), radial-gradient(circle at 52% 42%, #44546b 0 18px, transparent 19px); }
      .clip-viewer-avatar.feed, .clip-viewer-avatar.reel, .clip-viewer-avatar.reel-a, .clip-viewer-avatar.reel-b { background: linear-gradient(145deg,#d9e6ef,#786f69), radial-gradient(circle at 64% 18%, rgba(255,255,255,.55), transparent 30px); }
      .clip-viewer-identity {
        min-width: 0;
        display: grid;
        gap: 3px;
      }
      .clip-viewer-identity strong {
        overflow: hidden;
        color: var(--emy-navy);
        font-size: 16px;
        line-height: 1.05;
        font-weight: 860;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .clip-viewer-identity span {
        overflow: hidden;
        color: #64728c;
        font-size: 12px;
        line-height: 1.1;
        font-weight: 680;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .clip-viewer-customer {
        flex: 0 0 auto;
        min-height: 38px;
        border: 1px solid rgba(255,106,0,.22);
        border-radius: 999px;
        background: linear-gradient(135deg, #ff6a00, #ff8c33);
        color: #fff;
        cursor: pointer;
        padding: 0 15px;
        font-size: 12px;
        line-height: 1;
        font-weight: 880;
        white-space: nowrap;
        box-shadow: 0 14px 26px rgba(255,106,0,.24);
      }
      .clip-viewer-customer:hover { transform: translateY(-1px); box-shadow: 0 18px 30px rgba(255,106,0,.30); }
      .clip-viewer-customer.is-customer { border-color: rgba(0,27,71,.12); background: var(--emy-navy); box-shadow: 0 14px 26px rgba(0,27,71,.18); }
      .clip-viewer-sound {
        display: inline-flex;
        width: fit-content;
        max-width: 100%;
        align-items: center;
        gap: 8px;
        border-radius: 999px;
        border: 1px solid rgba(255,106,0,.13);
        background: rgba(255,255,255,.82);
        color: #172b4d;
        padding: 8px 11px;
        box-shadow: 0 12px 24px rgba(0,27,71,.08);
        font-size: 12px;
        line-height: 1;
        font-weight: 720;
      }
      .clip-viewer-sound svg { width: 15px; height: 15px; fill: currentColor; }
      .clip-viewer-info h3 {
        margin: 0;
        color: var(--emy-navy);
        font-size: clamp(21px, 2.1vw, 30px);
        line-height: 1.16;
        font-weight: 620;
        letter-spacing: 0;
      }
      .clip-viewer-info p {
        margin: 0;
        color: #344054;
        font-size: 14.5px;
        line-height: 1.5;
        font-weight: 430;
      }
      .clip-viewer-caption {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        color: #fff;
        padding: 94px 18px 18px;
        background: linear-gradient(180deg, transparent, rgba(0,27,71,.86));
      }
      .clip-viewer-caption small { display: block; color: rgba(255,255,255,.74); font-size: 12px; line-height: 1.2; font-weight: 680; }
      .clip-viewer-caption h3 { margin: 7px 0 0; color: #fff; font-size: 21px; line-height: 1.08; font-weight: 820; }
      .clip-viewer-caption p { margin: 7px 0 0; color: rgba(255,255,255,.84); font-size: 13px; line-height: 1.35; font-weight: 520; }
      .clip-viewer-price { display: inline-flex; width: fit-content; margin-top: 10px; border-radius: 999px; background: rgba(255,244,232,.95); color: #d85a00; padding: 7px 10px; font-size: 13px; line-height: 1; font-weight: 850; }
      .clip-viewer-product-price {
        display: inline-flex;
        width: fit-content;
        min-height: 36px;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(255,106,0,.16);
        border-radius: 999px;
        background: linear-gradient(145deg, rgba(255,255,255,.90), rgba(255,244,232,.72));
        color: var(--emy-navy);
        padding: 0 12px 0 10px;
        box-shadow: 0 12px 26px rgba(255,106,0,.10), inset 0 1px 0 rgba(255,255,255,.82);
        font-size: 12px;
        line-height: 1;
        font-weight: 820;
        backdrop-filter: blur(14px);
      }
      .clip-viewer-product-price span {
        color: #d85a00;
        font-size: 10px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: .08em;
      }
      .clip-viewer-product-price strong {
        color: var(--emy-navy);
        font-size: 15px;
        line-height: 1;
        font-weight: 900;
      }
      .clip-viewer-video-product-chip {
        position: absolute;
        left: 14px;
        right: 14px;
        bottom: 14px;
        z-index: 6;
        min-height: 42px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        border: 1px solid rgba(255,255,255,.28);
        border-radius: 14px;
        background: rgba(0,27,71,.58);
        color: #fff;
        padding: 8px 10px;
        box-shadow: 0 12px 28px rgba(0,0,0,.20), inset 0 1px 0 rgba(255,255,255,.18);
        backdrop-filter: blur(14px) saturate(1.12);
        pointer-events: none;
      }
      .clip-viewer-video-product-chip strong {
        min-width: 0;
        overflow: hidden;
        color: #fff;
        font-size: 13px;
        line-height: 1.15;
        font-weight: 860;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .clip-viewer-video-product-chip span {
        flex: 0 0 auto;
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: rgba(255,244,232,.96);
        color: #d85a00;
        padding: 0 9px;
        font-size: 11px;
        line-height: 1;
        font-weight: 900;
        white-space: nowrap;
      }
      .clip-viewer-like-chip {
        position: relative;
        left: auto;
        bottom: auto;
        z-index: 8;
        min-height: 46px;
        width: fit-content;
        max-width: min(100%, 392px);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        border: 1px solid rgba(255,106,0,.34);
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        color: #d85a00;
        padding: 0 13px 0 10px;
        box-shadow: 0 18px 38px rgba(0,27,71,.18), inset 0 1px 0 rgba(255,255,255,.86);
        font: inherit;
        font-size: 14px;
        line-height: 1;
        font-weight: 900;
        cursor: pointer;
        transform: none;
        backdrop-filter: blur(14px) saturate(1.1);
      }
      .clip-viewer-like-chip:hover {
        border-color: rgba(255,106,0,.52);
        background: rgba(255,250,245,.98);
        transform: translateY(-1px);
      }
      .clip-viewer-like-chip.is-active {
        border-color: rgba(255,106,0,.48);
        background: rgba(255,244,232,.98);
      }
      .clip-viewer-like-icon {
        width: 28px;
        height: 28px;
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
      }
      .clip-viewer-like-icon svg,
      .clip-viewer-like-icon img {
        width: 28px;
        height: 28px;
        display: block;
        overflow: visible;
        filter: drop-shadow(0 9px 12px rgba(255,106,0,.22));
      }
      .clip-viewer-like-chip.is-bouncing .clip-viewer-like-icon svg,
      .clip-viewer-like-chip.is-bouncing .clip-viewer-like-icon img {
        animation: clipLikeBagHello .72s ease-in-out both;
      }
      .clip-viewer-like-label {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .clip-viewer-like-count {
        min-width: 24px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: #fff;
        color: #d85a00;
        padding: 0 7px;
        box-shadow: inset 0 0 0 1px rgba(255,106,0,.12);
        font-size: 12px;
        line-height: 1;
        font-weight: 900;
      }
      @keyframes clipLikeBagHello {
        0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
        20% { transform: translateY(-6px) rotate(-6deg) scale(1.08); }
        40% { transform: translateY(-2px) rotate(6deg) scale(1.05); }
        62% { transform: translateY(-4px) rotate(-3deg) scale(1.06); }
      }
      .clip-viewer-product-details {
        display: grid;
        gap: 9px;
        border: 1px solid rgba(255,106,0,.14);
        border-radius: 16px;
        background: rgba(255,255,255,.72);
        padding: 11px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.82);
      }
      .clip-viewer-product-copy {
        margin: 0;
        color: #344054;
        font-size: 13.5px;
        line-height: 1.42;
        font-weight: 520;
      }
      .clip-viewer-product-facts {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
        gap: 8px;
        margin: 0;
      }
      .clip-viewer-product-facts div {
        min-width: 0;
        display: grid;
        gap: 4px;
        border-radius: 12px;
        background: rgba(255,244,232,.78);
        padding: 8px 9px;
      }
      .clip-viewer-product-facts dt {
        color: #d85a00;
        font-size: 10px;
        line-height: 1;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0;
      }
      .clip-viewer-product-facts dd {
        min-width: 0;
        margin: 0;
        color: var(--emy-navy);
        font-size: 13px;
        line-height: 1.2;
        font-weight: 860;
        overflow-wrap: anywhere;
      }
      .clip-viewer-actions {
        display: none !important;
        align-content: center;
        justify-items: center;
        gap: 8px;
        width: 68px;
        color: rgba(255,255,255,.90);
        padding: 10px 6px;
        border: 1px solid rgba(255,255,255,.20);
        border-radius: 20px;
        background: linear-gradient(180deg, rgba(0,27,71,.74), rgba(3,42,89,.48));
        box-shadow: 0 18px 40px rgba(0,27,71,.24), inset 0 1px 0 rgba(255,255,255,.18), inset 0 -16px 30px rgba(0,0,0,.12);
        backdrop-filter: blur(18px) saturate(1.16);
      }
      .clip-viewer-action {
        position: relative;
        display: grid;
        justify-items: center;
        gap: 5px;
        width: 54px;
        min-height: 51px;
        color: rgba(255,255,255,.90);
        padding: 0;
      }
      .clip-viewer-action button {
        width: 38px;
        height: 34px;
        border: 1px solid rgba(255,255,255,.26);
        border-radius: 11px;
        background: rgba(255,255,255,.12);
        color: inherit;
        cursor: pointer;
        display: grid;
        place-items: center;
        box-shadow: 0 10px 22px rgba(0,27,71,.18), inset 0 1px 0 rgba(255,255,255,.22);
        backdrop-filter: blur(14px) saturate(1.12);
        transition: color .16s ease, background .16s ease, border-color .16s ease, box-shadow .16s ease, transform .16s ease;
      }
      .clip-viewer-action button:hover {
        border-color: rgba(255,255,255,.38);
        background: rgba(255,255,255,.20);
        color: #fff;
        transform: translateY(-1px);
        box-shadow: 0 14px 28px rgba(0,27,71,.24), inset 0 1px 0 rgba(255,255,255,.30);
      }
      .clip-viewer-action:focus-within {
        outline: 3px solid rgba(255,255,255,.18);
        outline-offset: 2px;
        border-radius: 14px;
      }
      .clip-viewer-action.is-active button {
        border-color: rgba(255,106,0,.28);
        background: rgba(255,244,232,.95);
        color: #d85a00;
        box-shadow: 0 12px 26px rgba(255,106,0,.18), inset 0 1px 0 rgba(255,255,255,.90);
      }
      .clip-viewer-action svg { width: 18px; height: 18px; stroke: currentColor; stroke-width: 2.2; fill: none; }
      .clip-viewer-action-text {
        display: block;
        width: 54px;
        text-align: center;
        color: rgba(255,255,255,.88);
        text-shadow: 0 1px 8px rgba(0,27,71,.30);
      }
      .clip-viewer-action-text strong {
        position: absolute;
        right: 5px;
        top: -5px;
        display: flex;
        min-width: 17px;
        height: 17px;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255,255,255,.48);
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        color: #001b47;
        padding: 0 4px;
        font-size: 10px;
        line-height: 1;
        font-weight: 850;
        box-shadow: 0 8px 16px rgba(0,27,71,.16);
        backdrop-filter: blur(10px);
      }
      .clip-viewer-action-text small {
        color: inherit;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 10.5px;
        line-height: 1;
        font-weight: 760;
      }
      .clip-viewer-action.is-label-only .clip-viewer-action-text strong { display: none; }
      .clip-viewer-feedback {
        width: 58px;
        min-height: 18px;
        margin: 0;
        border-radius: 999px;
        color: rgba(255,255,255,.72);
        text-align: center;
        font-size: 9.5px;
        line-height: 1.2;
        font-weight: 760;
      }
      .clip-viewer-comments-panel {
        position: relative;
        grid-column: 4;
        align-self: center;
        justify-self: stretch;
        z-index: 6;
        width: 100%;
        height: min(680px, calc(100dvh - 52px));
        max-height: calc(100dvh - 52px);
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 18px;
        background: rgba(255,255,255,.98);
        box-shadow: 0 24px 70px rgba(0,27,71,.16), 0 12px 28px rgba(255,106,0,.07);
        display: grid;
        grid-template-rows: auto minmax(0, 1fr) auto;
        transform: none;
        backdrop-filter: blur(16px);
      }
      .clip-viewer-comments-panel[hidden] { display: none; }
      .clip-viewer-comments-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        min-height: 64px;
        border-bottom: 1px solid rgba(0,27,71,.08);
        padding: 0 18px;
      }
      .clip-viewer-comments-title {
        display: flex;
        align-items: baseline;
        gap: 9px;
        min-width: 0;
      }
      .clip-viewer-comments-head strong {
        color: var(--emy-navy);
        font-size: 20px;
        line-height: 1.2;
        font-weight: 820;
      }
      .clip-viewer-comments-title b {
        color: #667085;
        font-size: 14px;
        line-height: 1;
        font-weight: 720;
      }
      .clip-viewer-comments-tools {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .clip-viewer-comments-head button {
        width: 34px;
        height: 34px;
        display: inline-grid;
        place-items: center;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--emy-navy);
        cursor: pointer;
        font-size: 0;
        line-height: 1;
        font-weight: 760;
      }
      .clip-viewer-comments-head button:hover { background: #f3f6fb; color: var(--emy-orange); }
      .clip-viewer-comments-head svg {
        width: 22px;
        height: 22px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .clip-viewer-comments-list {
        display: grid;
        align-content: start;
        gap: 17px;
        min-height: 0;
        overflow: auto;
        padding: 18px 18px 16px;
        scrollbar-width: thin;
      }
      .clip-viewer-comment {
        display: grid;
        grid-template-columns: 30px minmax(0, 1fr);
        gap: 8px;
        align-items: start;
      }
      .clip-viewer-comment-body {
        min-width: 0;
        display: grid;
        gap: 5px;
      }
      .clip-viewer-comment-avatar {
        display: grid;
        width: 30px;
        height: 30px;
        place-items: center;
        border-radius: 999px;
        background: #eef3f8;
        color: var(--emy-navy);
        font-size: 11px;
        font-weight: 800;
        text-decoration: none;
        cursor: pointer;
      }
      .clip-viewer-comment-avatar.has-image {
        overflow: hidden;
        background: #fff;
        color: transparent;
      }
      .clip-viewer-comment-avatar img {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        object-fit: cover;
        display: block;
      }
      .clip-viewer-comment-bubble {
        border: 1px solid rgba(0,27,71,.06);
        border-radius: 14px;
        background: linear-gradient(145deg, rgba(255,255,255,.92), rgba(248,251,255,.74));
        color: #667085;
        padding: 9px 11px;
        box-shadow: 0 10px 24px rgba(0,27,71,.055), inset 0 1px 0 rgba(255,255,255,.84);
        font-size: 12px;
        line-height: 1.35;
        font-weight: 520;
      }
      .clip-viewer-comment-bubble strong {
        display: block;
        margin-bottom: 2px;
        color: var(--emy-navy);
        font-size: 11.5px;
        line-height: 1.1;
        font-weight: 820;
      }
      .clip-viewer-comment-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
        padding-left: 2px;
        color: #667085;
        font-size: 11px;
        line-height: 1;
        font-weight: 820;
      }
      .clip-viewer-comment-actions button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        width: auto;
        min-width: 18px;
        height: 22px;
        min-height: 22px;
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: #7a869e;
        cursor: pointer;
        padding: 0 2px;
        font: inherit;
        font-size: 0;
        box-shadow: none;
      }
      .clip-viewer-comment-actions button svg {
        width: 14px;
        height: 14px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .clip-viewer-comment-actions button:hover,
      .clip-viewer-comment-actions button.is-active {
        background: transparent;
        color: var(--emy-orange);
      }
      .clip-viewer-comment-actions [data-clip-comment-like-count],
      .clip-viewer-comment-actions [data-clip-comment-dislike-count] {
        min-width: 14px;
        min-height: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #7a869e;
        padding: 0 2px;
        font-size: 11px;
        font-weight: 830;
      }
      .clip-viewer-comment-edit-field {
        width: min(100%, 420px);
        min-height: 34px;
        border: 1px solid rgba(0,27,71,.12);
        border-radius: 10px;
        background: #fff;
        color: var(--emy-navy);
        padding: 7px 9px;
        font: inherit;
        font-size: 12px;
        outline: none;
      }
      .clip-viewer-comment-replies {
        display: grid;
        gap: 7px;
        margin-top: 2px;
        padding-left: 12px;
        border-left: 2px solid rgba(0,27,71,.07);
      }
      .clip-viewer-comment-reply {
        display: grid;
        grid-template-columns: 24px minmax(0, 1fr);
        gap: 7px;
        align-items: start;
      }
      .clip-viewer-comment-reply .clip-viewer-comment-avatar {
        width: 24px;
        height: 24px;
        font-size: 10px;
      }
      .clip-viewer-comment-reply .clip-viewer-comment-bubble {
        padding: 7px 9px;
        font-size: 11.5px;
      }
      .clip-viewer-comment-reply-form {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 7px;
        padding-left: 4px;
      }
      .clip-viewer-comment-reply-form[hidden] { display: none; }
      .clip-viewer-comment-reply-form input {
        min-width: 0;
        height: 32px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 999px;
        background: #fff;
        color: var(--emy-navy);
        outline: none;
        padding: 0 38px 0 10px;
        font: inherit;
        font-size: 11.5px;
      }
      .clip-viewer-comment-reply-form button {
        width: auto;
        min-width: 54px;
        height: 30px;
        min-height: 30px;
        border: 0;
        border-radius: 999px;
        background: var(--emy-orange);
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 0 9px;
        font-size: 11px;
        font-weight: 820;
        white-space: nowrap;
        box-shadow: 0 6px 12px rgba(255,106,0,.14);
      }
      .clip-viewer-comment-reply-form button::after {
        content: "Reply";
      }
      .clip-viewer-comment-reply-form button svg {
        display: block;
        width: 13px;
        height: 13px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.2;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: 1;
      }
      .clip-viewer-comment-form {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 8px;
        margin-top: 12px;
      }
      .clip-viewer-comment-form input {
        min-width: 0;
        height: 38px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 999px;
        background: #f7f9fc;
        color: var(--emy-navy);
        outline: none;
        padding: 0 12px;
        font: inherit;
        font-size: 12px;
      }
      .clip-viewer-comment-form input:focus {
        border-color: rgba(255,106,0,.34);
        box-shadow: 0 0 0 3px rgba(255,106,0,.10);
      }
      .clip-viewer-comment-form button {
        min-width: 58px;
        height: 38px;
        border: 0;
        border-radius: 999px;
        background: var(--emy-orange);
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 14px;
        font-size: 12px;
        line-height: 1;
        font-weight: 800;
        white-space: nowrap;
      }
      @media (max-width: 680px) {
        .item-detail-modal { padding: 12px; align-items: end; }
        .item-detail-card { max-height: calc(100dvh - 24px); border-radius: 18px 18px 0 0; }
        .item-detail-modal.is-product .item-detail-card { max-height: calc(100dvh - 24px); }
        .item-detail-layout { grid-template-columns: 1fr; gap: 12px; padding: 14px; }
        .item-detail-modal.is-product .item-detail-layout { height: calc(100dvh - 24px); grid-template-columns: 1fr; grid-template-rows: 230px minmax(0, 1fr); }
        .item-detail-art { min-height: 220px; }
        .item-detail-modal.is-product .item-detail-art { height: 230px; }
        .item-detail-copy { padding: 2px 0 4px; }
        .item-detail-modal.is-product .item-detail-copy { padding-right: 2px; }
        .item-detail-modal.is-business .item-detail-card { max-height: calc(100dvh - 24px); }
        .item-detail-modal.is-business .item-detail-layout { padding: 14px; }
        .item-detail-modal.is-business .item-detail-copy { max-height: calc(100dvh - 52px); }
        .item-detail-modal.is-business .item-business-summary { grid-template-columns: 64px minmax(0, 1fr); padding: 14px; }
        .item-detail-modal.is-business .item-business-avatar { width: 64px; height: 64px; }
        .item-detail-modal.is-business .item-business-copy strong { font-size: 18px; }
        .item-detail-modal.is-business .item-business-profile-pill { grid-column: 1 / -1; width: 100%; }
        .item-job-grid { grid-template-columns: 1fr; }
        .item-business-summary { grid-template-columns: 52px minmax(0, 1fr); }
        .item-business-profile-pill { grid-column: 1 / -1; width: 100%; }
        .item-business-facts, .item-business-library-grid, .item-business-actions { grid-template-columns: 1fr; }
        .item-product-gallery-thumbs { --item-gallery-thumb-size: clamp(64px, 21vw, 92px); grid-template-columns: repeat(auto-fit, minmax(var(--item-gallery-thumb-size), var(--item-gallery-thumb-size))); }
        .item-product-gallery-thumb { width: var(--item-gallery-thumb-size); height: var(--item-gallery-thumb-size); min-height: var(--item-gallery-thumb-size); }
        .item-product-gallery-caption { left: 8px; right: 8px; bottom: 8px; padding: 7px 8px; }
        .item-product-actions { grid-template-columns: 1fr; }
        .item-product-seller { grid-template-columns: 48px minmax(0, 1fr); }
        .item-product-profile-pill { grid-column: 1 / -1; width: 100%; }
        .item-product-social { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .item-product-owner-head { display: grid; }
        .item-product-owner-stats { width: fit-content; }
        .item-product-owner-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .item-product-comment-preview { grid-template-columns: 30px minmax(0, 1fr); }
        .item-product-comment-preview button { grid-column: 2; width: fit-content; }
        .item-product-specs { grid-template-columns: 1fr; }
        .item-product-specs div { min-height: 0; }
        .clip-viewer-slide { grid-template-columns: minmax(0, 1fr); gap: 9px; padding: 18px 10px; }
        .clip-viewer-side { position: absolute; left: 18px; right: 82px; bottom: 24px; z-index: 5; max-width: none; gap: 8px; pointer-events: none; }
        .clip-viewer-info { position: absolute; left: 18px; right: 82px; bottom: 24px; z-index: 5; max-width: none; gap: 8px; border: 0; background: transparent; box-shadow: none; padding: 0; color: #fff; pointer-events: none; backdrop-filter: none; }
        .clip-viewer-side .clip-viewer-info { position: static; left: auto; right: auto; bottom: auto; max-width: none; }
        .clip-viewer-creator { grid-template-columns: minmax(0, 1fr) auto; gap: 8px; border: 0; background: transparent; padding: 0; }
        .clip-viewer-profile { grid-template-columns: 36px minmax(0, 1fr); gap: 8px; }
        .clip-viewer-avatar { width: 36px; height: 36px; box-shadow: 0 8px 18px rgba(0,27,71,.22); }
        .clip-viewer-identity strong, .clip-viewer-identity span, .clip-viewer-info h3, .clip-viewer-info p { color: #fff; text-shadow: 0 2px 10px rgba(0,27,71,.42); }
        .clip-viewer-identity span { color: rgba(255,255,255,.82); }
        .clip-viewer-info h3 { font-size: 20px; line-height: 1.08; }
        .clip-viewer-info p { display: -webkit-box; overflow: hidden; color: rgba(255,255,255,.84); font-size: 12px; line-height: 1.32; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
        .clip-viewer-sound { max-width: 100%; background: rgba(0,27,71,.42); color: #fff; backdrop-filter: blur(10px); }
        .clip-viewer-product-price { min-height: 32px; border-color: rgba(255,255,255,.20); background: rgba(0,27,71,.42); color: #fff; padding: 0 10px; box-shadow: 0 10px 24px rgba(0,27,71,.18); }
        .clip-viewer-product-price span { color: rgba(255,255,255,.74); font-size: 9px; }
        .clip-viewer-product-price strong { color: #fff; font-size: 13px; }
        .clip-viewer-video-product-chip { left: 10px; right: 10px; bottom: 12px; min-height: 36px; border-radius: 12px; padding: 7px 8px; }
        .clip-viewer-video-product-chip strong { font-size: 12px; }
        .clip-viewer-video-product-chip span { min-height: 22px; font-size: 10px; padding: 0 8px; }
        .clip-viewer-like-chip { min-height: 42px; max-width: calc(100% - 26px); gap: 7px; padding: 0 11px 0 8px; font-size: 12.5px; }
        .clip-viewer-like-icon, .clip-viewer-like-icon svg, .clip-viewer-like-icon img { width: 25px; height: 25px; }
        .clip-viewer-like-count { min-width: 22px; height: 22px; padding: 0 6px; font-size: 11px; }
        .clip-viewer-product-details { gap: 7px; border-color: rgba(255,255,255,.18); background: rgba(0,27,71,.36); padding: 9px; }
        .clip-viewer-product-copy { color: rgba(255,255,255,.86); font-size: 12px; line-height: 1.3; text-shadow: 0 2px 10px rgba(0,27,71,.42); }
        .clip-viewer-product-facts { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
        .clip-viewer-product-facts div { background: rgba(255,255,255,.12); padding: 7px; }
        .clip-viewer-product-facts dt { color: rgba(255,255,255,.70); font-size: 9px; }
        .clip-viewer-product-facts dd { color: #fff; font-size: 11.5px; }
        .clip-viewer-profile, .clip-viewer-customer, .clip-viewer-like-chip { pointer-events: auto; }
        .clip-viewer-customer { min-height: 34px; max-width: 116px; padding: 0 12px; overflow: hidden; text-overflow: ellipsis; font-size: 10.5px; }
        .clip-viewer-frame { width: min(100%, calc(100vw - 78px)); height: min(calc(100dvh - 36px), 720px); border-radius: 15px; }
        .clip-viewer-controls { left: auto; right: 12px; top: 56px; gap: 7px; }
        .clip-viewer-control { width: 42px; height: 42px; }
        .clip-viewer-control svg { width: 19px; height: 19px; }
        .clip-viewer-actions { display: none !important; }
        .clip-viewer-action { width: 52px; min-height: 49px; color: rgba(255,255,255,.90); }
        .clip-viewer-action button { width: 36px; height: 32px; border-color: rgba(255,255,255,.26); border-radius: 10px; background: rgba(255,255,255,.13); color: inherit; box-shadow: 0 10px 22px rgba(0,27,71,.18), inset 0 1px 0 rgba(255,255,255,.22); }
        .clip-viewer-action.is-active button { background: rgba(255,244,232,.95); color: #d85a00; box-shadow: 0 12px 26px rgba(255,106,0,.18), inset 0 1px 0 rgba(255,255,255,.90); }
        .clip-viewer-action-text { width: 52px; color: rgba(255,255,255,.88); text-shadow: 0 1px 8px rgba(0,27,71,.30); }
        .clip-viewer-action-text strong { right: 5px; top: -5px; min-width: 17px; height: 17px; border-color: rgba(255,255,255,.48); background: rgba(255,255,255,.94); color: #001b47; font-size: 10px; text-shadow: none; }
        .clip-viewer-action-text small { font-size: 10.5px; }
        .clip-viewer-feedback { width: 52px; color: rgba(255,255,255,.72); text-shadow: none; }
        .clip-viewer-comments-panel { position: fixed; left: 12px; right: 12px; bottom: 12px; top: auto; width: auto; max-height: 46dvh; transform: none; }
        .clip-viewer-close { right: 12px; top: 10px; width: 38px; height: 38px; }
      }`;

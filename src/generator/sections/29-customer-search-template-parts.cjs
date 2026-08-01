/* EMY template parts split from 29-template-customer-search.cjs */
const customer_search_part_1 = String.raw`
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | Search</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      :root {
        --emy-navy: #001b47;
        --emy-orange: #ff6a00;
        --emy-cream: #fff8ef;
        --emy-line: rgba(0,27,71,.10);
        --emy-muted: #667085;
        --search-height: 42px;
        --search-radius: 10px;
        --filter-size: 42px;
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; background: #fffdf8; color: var(--emy-navy); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      body { min-height: 100dvh; overflow-x: hidden; }
      button, input, select { font: inherit; }
      button { -webkit-tap-highlight-color: transparent; }
      .page {
        min-height: 100dvh;
        background:
          radial-gradient(circle at 84% 5%, rgba(255,106,0,.10), transparent 260px),
          linear-gradient(180deg, #fff8ef 0%, #fffdf8 55%, #fff8ef 100%);
      }
      .shell {
        width: min(100%, 1320px);
        margin: 0 auto;
        padding: 0 28px 112px;
      }
      .customer-header {
        position: sticky;
        top: 0;
        z-index: 40;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 10px;
        min-height: 62px;
        padding: 8px 0;
        border-bottom: 1px solid rgba(0,27,71,.07);
        background: rgba(255,253,248,.86);
        backdrop-filter: blur(16px);
      }
      .customer-avatar {
        height: 40px;
        width: 40px;
        border: 1px solid rgba(0,27,71,.12);
        border-radius: 999px;
        background: linear-gradient(145deg, #fff, #eef3f8);
        color: var(--emy-navy);
        cursor: pointer;
        display: grid;
        place-items: center;
        overflow: hidden;
        font-size: 14px;
        font-weight: 650;
        box-shadow: 0 8px 18px rgba(0,27,71,.07);
      }
      .customer-copy { min-width: 0; display: grid; gap: 2px; }
      .customer-copy strong { color: #172033; font-size: 14px; line-height: 1.1; font-weight: 680; }
      .customer-location {
        width: fit-content;
        max-width: 100%;
        border: 0;
        background: transparent;
        color: #657188;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 0;
        font-size: 12px;
        line-height: 1.2;
        font-weight: 480;
      }
      .customer-location span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .customer-location svg { width: 13px; height: 13px; stroke-width: 2; }
      .customer-actions { display: flex; align-items: center; gap: 8px; }
      .header-icon {
        position: relative;
        height: 38px;
        width: 38px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 999px;
        background:
          linear-gradient(145deg, rgba(255,255,255,.92), rgba(255,255,255,.42)),
          rgba(255,255,255,.38);
        color: var(--emy-navy);
        cursor: pointer;
        display: grid;
        place-items: center;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.72), 0 8px 18px rgba(0,27,71,.08);
      }
      .header-icon:hover { border-color: rgba(255,106,0,.22); color: var(--emy-orange); background: rgba(255,255,255,.92); }
      .header-icon svg { width: 19px; height: 19px; stroke-width: 2.15; }
      .header-count {
        position: absolute;
        right: -2px;
        top: -3px;
        min-width: 16px;
        height: 16px;
        border: 1px solid rgba(255,255,255,.9);
        border-radius: 999px;
        background: rgba(0,27,71,.92);
        color: #fff;
        display: grid;
        place-items: center;
        font-size: 9px;
        line-height: 1;
        font-weight: 650;
      }
      .topbar {
        display: grid;
        grid-template-columns: 46px minmax(0, 1fr) auto;
        align-items: center;
        gap: 10px;
        min-height: 58px;
        border-bottom: 1px solid rgba(0,27,71,.07);
        background: rgba(255,253,248,.86);
        backdrop-filter: blur(16px);
      }
      .avatar {
        position: relative;
        height: 42px;
        width: 42px;
        border: 2px solid rgba(255,255,255,.92);
        border-radius: 999px;
        background: linear-gradient(135deg, #e7edf6, #fff7ed);
        display: grid;
        place-items: center;
        overflow: hidden;
        cursor: pointer;
        padding: 0;
        color: var(--emy-navy);
        font-size: 14px;
        font: inherit;
        font-weight: 700;
        box-shadow: 0 0 0 1px rgba(0,27,71,.12), 0 8px 18px rgba(0,27,71,.08);
        transition: border-color .16s ease, box-shadow .16s ease, transform .16s ease;
      }
      .avatar:hover, .avatar:focus-visible { border-color: rgba(255,106,0,.55); box-shadow: 0 0 0 3px rgba(255,106,0,.12), 0 10px 22px rgba(0,27,71,.11); outline: none; transform: translateY(-1px); }
      .avatar img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; transform-origin: center; }
      .hello { min-width: 0; display: grid; gap: 3px; }
      .hello strong { display: block; color: var(--emy-navy); font-size: 14px; line-height: 1.05; font-weight: 700; letter-spacing: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .location-btn {
        width: fit-content;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 999px;
        background: rgba(255,255,255,.76);
        color: #59667f;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 9px;
        max-width: 100%;
        font-size: 11px;
        line-height: 1.2;
        font-weight: 430;
        box-shadow: 0 5px 14px rgba(0,27,71,.04);
        transition: background .16s ease, border-color .16s ease, color .16s ease, box-shadow .16s ease;
      }
      .location-btn:hover { border-color: rgba(255,106,0,.26); background: #fff; color: var(--emy-navy); box-shadow: 0 8px 18px rgba(0,27,71,.07); }
      .location-btn svg { flex: 0 0 auto; height: 13px; width: 13px; stroke-width: 2.2; }
      .location-pin { color: var(--emy-orange); }
      .location-chevron { color: #8993a8; }
      .location-btn span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .icon-btn {
        position: relative;
        height: 36px;
        width: 36px;
        border: 0;
        border-radius: 0;
        background: transparent;
        color: var(--emy-navy);
        cursor: pointer;
        display: grid;
        place-items: center;
        padding: 0;
      }
      .icon-btn svg {
        width: 22px;
        height: 22px;
        overflow: visible;
        filter: drop-shadow(0 2px 2px rgba(0,27,71,.20)) drop-shadow(0 8px 16px rgba(0,27,71,.14));
      }
      .icon-btn:hover { color: var(--emy-orange); }
      .notification-btn {
        width: 40px !important;
        height: 42px !important;
        padding: 0 !important;
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
      }
      .notification-btn:hover {
        background: transparent !important;
        box-shadow: none !important;
        color: var(--emy-orange);
      }
      .notification-btn svg {
        width: 28px;
        height: 28px;
        overflow: visible;
        filter: drop-shadow(0 2px 2px rgba(0,27,71,.22)) drop-shadow(0 9px 18px rgba(0,27,71,.16));
      }
      .notification-btn:hover svg { transform: translateY(-1px); filter: drop-shadow(0 3px 3px rgba(0,27,71,.24)) drop-shadow(0 10px 20px rgba(0,27,71,.18)); }
      .notification-btn .bell-body { fill: url(#emySearchBellFill); stroke: url(#emySearchBellStroke); stroke-width: 1.8; }
      .notification-btn .bell-rim { stroke: rgba(0,27,71,.92); stroke-width: 1.7; }
      .notification-btn .bell-highlight { stroke: rgba(255,255,255,.82); stroke-width: 1.15; }
      .notification-btn .bell-clapper { fill: rgba(0,27,71,.86); stroke: rgba(255,255,255,.78); stroke-width: .65; }
      .notification-count {
        position: absolute;
        right: 1px;
        top: 1px;
        min-width: 16px;
        height: 16px;
        padding: 0 3px;
        border: 1px solid rgba(255,255,255,.88);
        border-radius: 999px;
        background: rgba(255,255,255,.72);
        color: #001b47;
        display: grid;
        place-items: center;
        font-size: 9px;
        line-height: 1;
        font-weight: 750;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.86), 0 5px 12px rgba(0,27,71,.16);
        backdrop-filter: blur(8px);
      }
      .notification-count[aria-label="0 notifications"],
      .notification-count[aria-label="0 unread notifications"],
      .notification-count.is-empty { display: none !important; }
      .notifications-panel {
        position: fixed;
        top: 62px;
        left: 10px;
        z-index: 82;
        width: min(100% - 20px, 420px);
        max-height: min(74dvh, 620px);
        display: none;
        grid-template-rows: auto minmax(0, 1fr);
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 14px;
        background: rgba(255,255,255,.97);
        box-shadow: 0 24px 62px rgba(0,27,71,.20);
        overflow: hidden;
        transform: none;
      }
      .notifications-panel.is-open { display: grid; }
      .notifications-head {
        display: flex;
        align-items: center;
        gap: 14px;
        min-height: 64px;
        padding: 0 18px 0 20px;
        border-bottom: 1px solid rgba(0,27,71,.08);
        background: rgba(255,255,255,.90);
        backdrop-filter: blur(12px);
      }
      .notifications-head h2 { flex: 1 1 auto; min-width: 0; margin: 0; color: #111827; font-size: 18px; line-height: 1.2; font-weight: 560; }
      .notifications-icon {
        height: 36px;
        width: 36px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: #111827;
        cursor: pointer;
        display: grid;
        place-items: center;
      }
      .notifications-icon:hover { background: rgba(0,27,71,.06); }
      .notifications-icon svg { width: 21px; height: 21px; stroke-width: 2.1; }
      .notifications-scroll { overflow-y: auto; min-height: 220px; }
      .notifications-section-title { margin: 0; padding: 14px 12px 8px; color: #111827; font-size: 14px; line-height: 1.2; font-weight: 560; }
      .notification-row {
        position: relative;
        display: grid;
        grid-template-columns: 42px minmax(0, 1fr) 72px 28px;
        gap: 10px;
        align-items: center;
        padding: 10px 12px;
        border-left: 3px solid transparent;
        cursor: pointer;
      }
      .notification-row.is-unread { border-left-color: #1677d2; }
      .notification-row:hover { background: #f4f6f8; }
      .notification-avatar, .notification-thumb {
        overflow: hidden;
        background: #eef2f7;
        color: var(--emy-navy);
        display: grid;
        place-items: center;
        font-size: 11px;
        font-weight: 650;
      }
      .notification-avatar { height: 42px; width: 42px; border-radius: 999px; }
      .notification-thumb { height: 42px; width: 72px; border-radius: 6px; }
      .notification-avatar img, .notification-thumb img, .notification-avatar video, .notification-thumb video { width: 100%; height: 100%; object-fit: cover; display: block; }
      .notification-thumb.is-fallback { color: #c14f00; font-size: 10px; font-weight: 800; text-transform: uppercase; }
      .notification-thumb.is-fallback { box-sizing: border-box; gap: 2px; padding: 5px; text-align: center; text-transform: none; background: linear-gradient(145deg, #fff7ed, #eef4fb); color: var(--emy-navy); }
      .notification-thumb.is-fallback b { display: block; font-size: 10px; line-height: 1.05; font-weight: 850; }
      .notification-thumb.is-fallback small { display: block; color: #667085; font-size: 8.5px; line-height: 1; font-weight: 720; }
      .notification-thumb.is-product { background: linear-gradient(145deg, #fff7ed, #fffaf4); color: #b54708; }
      .notification-thumb.is-post, .notification-thumb.is-image, .notification-thumb.is-video { background: linear-gradient(145deg, #eff6ff, #f8fbff); color: #175cd3; }
      .notification-thumb.is-clip { background: linear-gradient(145deg, #ecfdf3, #f8fff9); color: #067647; }
      .notification-thumb.is-message, .notification-thumb.is-comment, .notification-thumb.is-reply { background: linear-gradient(145deg, #f4f3ff, #fbfaff); color: #5925dc; }
      .notification-text strong { display: block; color: #111827; font-size: 13px; line-height: 1.35; font-weight: 500; }
      .notification-text time { display: block; margin-top: 6px; color: #64748b; font-size: 12px; line-height: 1.25; font-weight: 450; }
      .notification-more {
        height: 28px;
        width: 28px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: #111827;
        cursor: pointer;
        display: grid;
        place-items: center;
      }
      .notification-more:hover { background: rgba(0,27,71,.06); }
      .notification-more svg { width: 19px; height: 19px; stroke-width: 2.5; }
      .notification-action-menu { position: absolute; right: 10px; top: 44px; z-index: 12; width: min(360px, calc(100vw - 40px)); border: 1px solid rgba(0,27,71,.10); border-radius: 10px; background: #fff; box-shadow: 0 18px 42px rgba(0,27,71,.18); overflow: hidden; }
      .notification-action-menu[hidden] { display: none; }
      .notification-action-menu button { width: 100%; min-height: 48px; border: 0; border-bottom: 1px solid rgba(0,27,71,.06); background: #fff; color: #111827; cursor: pointer; display: grid; grid-template-columns: 34px minmax(0, 1fr); align-items: center; gap: 10px; padding: 0 14px; text-align: left; font-size: 13px; font-weight: 450; }
      .notification-action-menu button:last-child { border-bottom: 0; }
      .notification-action-menu button:hover { background: #f4f6f8; }
      .notification-action-menu svg { width: 24px; height: 24px; stroke-width: 2; }
      .notifications-divider { height: 1px; margin: 8px 12px 4px; background: rgba(0,27,71,.10); }
      .notifications-empty { margin: 0; padding: 30px 24px 34px; text-align: center; color: #64748b; font-size: 13px; line-height: 1.45; font-weight: 430; }
      .notifications-empty strong { display: block; margin-bottom: 6px; color: var(--emy-navy); font-size: 15px; font-weight: 650; }
      .search-modal {
        position: fixed;
        inset: 0;
        z-index: 84;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 18px;
        background: rgba(15,23,42,.38);
        backdrop-filter: blur(8px);
      }
      .search-modal.is-open { display: flex; }
      .search-card {
        width: min(100%, 420px);
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 14px;
        background: rgba(255,255,255,.97);
        box-shadow: 0 24px 62px rgba(0,27,71,.22);
        padding: 20px;
      }
      .search-card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
      .search-card-head h2 { margin: 0; color: #171435; font-size: 18px; line-height: 1.2; font-weight: 620; }
      .search-card-close { height: 34px; width: 34px; border: 0; border-radius: 999px; background: #fff7ef; color: var(--emy-navy); cursor: pointer; display: grid; place-items: center; font-size: 18px; font-weight: 700; }
      .location-sheet {
        width: min(100%, 480px);
        max-height: min(86dvh, 650px);
        overflow: auto;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 14px;
        background: #fff;
        box-shadow: 0 24px 70px rgba(15,23,42,.20);
        padding: 18px;
      }
      .location-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      .location-title { display: inline-flex; align-items: center; gap: 9px; color: var(--emy-navy); font-size: 16px; font-weight: 700; }
      .location-title svg { width: 22px; height: 22px; }
      .location-actions { display: flex; align-items: center; gap: 8px; }
      .location-add, .location-close {
        height: 32px;
        border: 1px solid rgba(0,27,71,.12);
        border-radius: 6px;
        background: #fff;
        color: var(--emy-navy);
        cursor: pointer;
        padding: 0 12px;
        font-size: 12px;
        font-weight: 650;
      }
      .location-add { border-color: rgba(255,106,0,.26); color: #c14f00; background: #fff8f1; }
      .location-close { width: 32px; padding: 0; color: var(--emy-navy); background: #fff; border-color: rgba(0,27,71,.10); }
      .location-current {
        width: 100%;
        margin-top: 14px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: #fbfcfe;
        color: var(--emy-navy);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 11px 12px;
        text-align: left;
        font-size: 13px;
        font-weight: 600;
      }
      .location-current-copy { display: grid; gap: 3px; }
      .location-current-copy strong { font-size: 13px; line-height: 1.1; font-weight: 650; }
      .location-current-copy small { color: #6b7690; font-size: 11px; line-height: 1.25; font-weight: 450; }
      .radio-dot { width: 15px; height: 15px; border-radius: 999px; border: 1.5px solid rgba(0,27,71,.22); background: #fff; pointer-events: none; }
      .location-current.is-selected .radio-dot, .place-card.is-selected .place-check { background: var(--emy-orange); border-color: var(--emy-orange); box-shadow: inset 0 0 0 4px #fff; }
      .current-radius {
        margin-top: 10px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 9px;
        background: linear-gradient(180deg, rgba(255,250,244,.86), rgba(255,255,255,.92));
        padding: 11px;
      }
      .current-radius[hidden] { display: none; }
      .current-radius-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; color: #67728a; font-size: 11px; font-weight: 600; }
      .current-radius-head strong { color: var(--emy-navy); font-size: 12px; font-weight: 650; }
      .radius-options.compact { grid-template-columns: repeat(5, minmax(0, 1fr)); }
      .place-list { display: grid; gap: 8px; margin-top: 10px; }
      .place-card {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 10px;
        align-items: center;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: #fff;
        padding: 10px 12px;
      }
      .place-card.is-selected { border-color: rgba(255,106,0,.38); background: #fff8f1; }
      .place-main { min-width: 0; cursor: pointer; text-align: left; border: 0; background: transparent; padding: 0; color: var(--emy-navy); }
      .place-main strong { display: block; font-size: 12.5px; line-height: 1.2; font-weight: 700; }
      .place-main span { display: block; margin-top: 3px; color: #6d778f; font-size: 11px; line-height: 1.25; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .place-tools { display: flex; align-items: center; gap: 6px; }
      .place-tools button {
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 5px;
        background: #fff;
        color: #506079;
        cursor: pointer;
        padding: 4px 7px;
        font-size: 11px;
        font-weight: 600;
      }
      .place-tools button.place-check {
        width: 20px;
        height: 20px;
        min-width: 20px;
        padding: 0;
        border-radius: 999px;
        border: 1.5px solid rgba(0,27,71,.16);
        background: #fff;
      }
      .location-empty { margin: 12px 0 0; color: #6d778f; text-align: left !important; font-size: 12px; line-height: 1.4; }
      .location-status { min-height: 18px; margin: 10px 0 0; color: #9a4b00; text-align: center; font-size: 11.5px; line-height: 1.35; font-weight: 550; }
      .search-location-card { width: min(100%, 480px); padding: 18px; }
      .search-location-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      .search-location-title { display: inline-flex; align-items: center; gap: 9px; color: var(--emy-navy); font-size: 16px; font-weight: 700; }
      .search-location-title svg { width: 22px; height: 22px; color: var(--emy-navy); }
      .search-location-actions { display: flex; align-items: center; gap: 8px; }
      .search-location-add {
        height: 32px;
        border: 1px solid rgba(255,106,0,.24);
        border-radius: 6px;
        background: #fff8f1;
        color: #b95108;
        cursor: pointer;
        padding: 0 12px;
        font-size: 12px;
        font-weight: 650;
      }
      .search-location-card .search-card-close {
        height: 32px;
        width: 32px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 6px;
        background: #fff;
        font-size: 12px;
      }
      .search-profile-preview {
        position: relative;
        width: 118px;
        height: 118px;
        margin: 2px auto 14px;
        border: 1px solid rgba(0,27,71,.14);
        border-radius: 999px;
        background: linear-gradient(135deg, #e7edf6, #fff7ed);
        color: var(--emy-navy);
        display: grid;
        place-items: center;
        overflow: hidden;
        font-size: 34px;
        font-weight: 650;
        box-shadow: 0 12px 28px rgba(0,27,71,.10);
      }
      .search-profile-preview img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; transform-origin: center; }
      .search-card p { margin: 0; color: #667085; text-align: center; font-size: 13px; line-height: 1.45; font-weight: 430; }
      .search-card-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
      .search-card-actions button {
        min-height: 42px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: #fff;
        color: var(--emy-navy);
        cursor: pointer;
        padding: 0 12px;
        font-size: 13px;
        font-weight: 560;
      }
      .search-card-actions .primary { border-color: var(--emy-orange); background: var(--emy-orange); color: #fff; }
      .search-card-actions .danger { border-color: rgba(185,28,28,.18); background: #fff6f5; color: #b91c1c; }
      .search-photo-source-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
      .search-photo-source-actions button {
        min-height: 78px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 10px;
        background: #fff;
        color: var(--emy-navy);
        cursor: pointer;
        display: grid;
        gap: 5px;
        align-content: center;
        padding: 12px;
        text-align: center;
        font: inherit;
        box-shadow: 0 10px 22px rgba(0,27,71,.05);
      }
      .search-photo-source-actions button:hover { border-color: rgba(255,106,0,.34); background: #fff4e8; color: var(--emy-orange); }
      .search-photo-source-actions strong { color: inherit; font-size: 14px; line-height: 1.1; font-weight: 800; }
      .search-photo-source-actions span { color: #667085; font-size: 11px; line-height: 1.35; font-weight: 500; }
      .search-camera-frame { margin: 16px 0 10px; width: 100%; aspect-ratio: 4 / 3; border: 1px solid rgba(0,27,71,.10); border-radius: 12px; background: #101828; overflow: hidden; }
      .search-camera-frame video { width: 100%; height: 100%; object-fit: cover; display: block; }
      .search-camera-status { min-height: 18px; margin-top: 10px !important; font-size: 12px !important; }
      .location-summary {
        width: 100%;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: #fbfcfe;
        color: #4f5d75;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        margin-top: 14px;
        padding: 11px 12px;
        text-align: left;
        font-size: 13px;
        line-height: 1.45;
      }
      .location-summary.is-selected { border-color: rgba(255,106,0,.26); }
      .location-summary strong { display: block; color: var(--emy-navy); font-size: 13px; font-weight: 650; margin-bottom: 2px; }
      .location-summary span { display: block; color: #6b7690; font-size: 11px; line-height: 1.25; font-weight: 450; }
      .search-radio-dot {
        flex: 0 0 auto;
        width: 18px;
        height: 18px;
        border: 1.5px solid rgba(255,106,0,.75);
        border-radius: 999px;
        background: #fff;
      }
      .location-summary.is-selected .search-radio-dot, .location-row.is-active .search-radio-dot { background: var(--emy-orange); border-color: var(--emy-orange); box-shadow: inset 0 0 0 4px #fff; }
      .search-radius-card {
        margin-top: 10px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 9px;
        background: linear-gradient(180deg, rgba(255,250,244,.86), rgba(255,255,255,.92));
        padding: 11px;
      }
      .search-radius-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; color: #67728a; font-size: 11px; font-weight: 600; }
      .search-radius-head strong { color: var(--emy-navy); font-size: 12px; font-weight: 650; }
      .search-radius { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 0; }
      .search-radius button {
        min-height: 36px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: #fff;
        color: var(--emy-navy);
        cursor: pointer;
        font-size: 12px;
        font-weight: 650;
      }
      .search-radius button.is-active { border-color: var(--emy-orange); background: var(--emy-orange); color: #fff; }
      .search-location-help { margin: 14px 0 0; color: #6d778f; text-align: left !important; font-size: 13px; line-height: 1.45; font-weight: 430; }
      .search-location-status { min-height: 18px; margin: 12px 0 0; color: #a64b00; text-align: center; font-size: 12px; line-height: 1.35; font-weight: 650; }
      .location-form {
        display: none;
        margin-top: 12px;
        border-top: 1px solid rgba(0,27,71,.08);
        padding-top: 14px;
      }
      .location-form.is-open { display: block; }
      .place-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
      .place-tabs button {
        height: 36px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 6px;
        background: #fff;
        color: #6d778f;
        cursor: pointer;
        font-size: 12px;
        font-weight: 620;
      }
      .place-tabs button.is-active { background: var(--emy-navy); color: #fff; border-color: var(--emy-navy); }
      .location-search { position: relative; }
      .location-field {
        width: 100%;
        height: 42px;
        margin-top: 10px;
        border: 1px solid rgba(0,27,71,.12);
        border-radius: 6px;
        background: #fff;
        color: var(--emy-navy);
        outline: none;
        padding: 0 12px;
        font-size: 13px;
        font-weight: 520;
      }
      .location-field:focus { border-color: rgba(255,106,0,.60); box-shadow: 0 0 0 3px rgba(255,106,0,.10); }
      .location-suggestions {
        position: absolute;
        left: 0;
        right: 0;
        top: calc(100% + 6px);
        z-index: 9;
        display: grid;
        gap: 5px;
        max-height: 220px;
        overflow: auto;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: rgba(255,255,255,.98);
        box-shadow: 0 18px 38px rgba(0,27,71,.15);
        padding: 6px;
      }
      .location-suggestions[hidden] { display: none; }
      .location-suggestion {
        width: 100%;
        border: 1px solid transparent;
        border-radius: 6px;
        background: transparent;
        color: var(--emy-navy);
        cursor: pointer;
        padding: 9px 10px;
        text-align: left;
      }
      .location-suggestion:hover, .location-suggestion:focus { border-color: rgba(255,106,0,.22); background: #fff7ef; outline: none; }
      .location-suggestion strong { display: block; font-size: 12px; line-height: 1.25; font-weight: 650; }
      .location-suggestion small { display: block; margin-top: 2px; color: #6d778f; font-size: 10.5px; line-height: 1.25; font-weight: 450; }
      .location-suggestion-empty { padding: 9px 10px; color: #6d778f; font-size: 11px; line-height: 1.35; }
      .radius-title { margin: 12px 0 8px; color: #6d778f; font-size: 11px; font-weight: 650; }
      .radius-options { display: grid; grid-template-columns: repeat(5, 1fr); gap: 7px; }
      .radius-options button {
        height: 34px;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 6px;
        background: #fff;
        color: var(--emy-navy);
        cursor: pointer;
        font-size: 12px;
        font-weight: 650;
      }
      .radius-options button.is-active { background: var(--emy-orange); color: #fff; }
      .location-submit {
        display: block;
        min-width: 120px;
        height: 42px;
        margin: 16px auto 0;
        border: 0;
        border-radius: 6px;
        background: var(--emy-orange);
        color: #fff;
        cursor: pointer;
        padding: 0 20px;
        font-size: 13px;
        font-weight: 720;
      }
      .location-list { display: grid; gap: 8px; margin-top: 12px; max-height: 180px; overflow: auto; }
      .location-row {
        width: 100%;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 10px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: #fff;
        color: var(--emy-navy);
        padding: 10px 12px;
      }
      .location-row.is-active { border-color: rgba(255,106,0,.38); background: #fff8f1; }
      .location-row-main { min-width: 0; border: 0; background: transparent; color: inherit; cursor: pointer; padding: 0; text-align: left; }
      .location-row strong { display: block; font-size: 13px; line-height: 1.25; font-weight: 620; }
      .location-row span { display: block; margin-top: 3px; color: #667085; font-size: 12px; line-height: 1.3; font-weight: 430; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .location-tools { display: flex; align-items: center; gap: 7px; }
      .location-tools button {
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 6px;
        background: #fff;
        color: #506079;
        cursor: pointer;
        padding: 5px 9px;
        font-size: 12px;
        font-weight: 600;
      }
      .location-tools .search-radio-dot { cursor: pointer; padding: 0; width: 20px; height: 20px; border-radius: 999px; }
      .search-location-empty { margin: 0; border: 1px dashed rgba(0,27,71,.12); border-radius: 8px; background: rgba(255,255,255,.62); color: #6d778f; padding: 12px; font-size: 12px; line-height: 1.4; }
      .search-titlebar {
        position: relative;
        z-index: 20;
        display: flex;
        align-items: center;
        gap: 14px;
        min-height: 48px;
        margin-top: 12px;
        padding: 8px 0 4px;
        border-bottom: 0;
        background: transparent;
      }
      .search-titlebar > span[aria-hidden="true"] { display: none; }
      .search-heading { min-width: 0; }
      .search-heading h1 { margin: 0; color: #171435; font-size: 23px; line-height: 1.05; font-weight: 760; letter-spacing: 0; }
      .search-heading p { margin: 4px 0 0; color: #6f7890; font-size: 12.5px; line-height: 1.35; font-weight: 460; }
      .icon-button {
        height: 38px;
        width: 38px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 999px;
        background: rgba(255,255,255,.64);
        color: var(--emy-navy);
        cursor: pointer;
        display: grid;
        place-items: center;
        box-shadow: 0 6px 14px rgba(0,27,71,.05);
      }
      .icon-button:hover { border-color: rgba(255,106,0,.24); background: #fff; color: var(--emy-orange); }
      .icon-button svg { width: 20px; height: 20px; stroke-width: 2.35; }
      .search-command {
        width: min(100%, 1220px);
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(320px, 430px);
        align-items: center;
        gap: 12px;
        margin: 12px auto 0;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 14px;
        background: linear-gradient(145deg, rgba(255,255,255,.82), rgba(255,255,255,.48));
        box-shadow: 0 16px 34px rgba(0,27,71,.07);
        padding: 8px;
      }
      .tabs-wrap {
        width: auto;
        overflow: hidden;
        margin: 0;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        padding: 0;
      }
      .tabs {
        display: flex;
        gap: 6px;
        align-items: center;
        justify-content: flex-start;
        overflow-x: auto;
        scrollbar-width: none;
        padding: 0;
      }
      .tabs::-webkit-scrollbar { display: none; }
      .tab {
        position: relative;
        flex: 0 0 auto;
        border: 0;
        background: transparent;
        color: #56637b;
        cursor: pointer;
        min-height: 34px;
        border-radius: 10px;
        padding: 0 13px;
        font-size: 12.5px;
        line-height: 1;
        font-weight: 660;
        transition: background .16s ease, color .16s ease, box-shadow .16s ease;
      }
      .tab:hover { background: rgba(255,106,0,.06); color: var(--emy-navy); }
      .tab.is-active { background: var(--emy-orange); color: #fff; box-shadow: 0 8px 16px rgba(255,106,0,.16); }
      .search-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) var(--filter-size);
        gap: 8px;
        align-items: center;
        max-width: none;
        margin: 0;
      }
      .search-box {
        height: var(--search-height);
        display: grid;
        grid-template-columns: minmax(0, 1fr) 42px;
        align-items: center;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: var(--search-radius);
        background: rgba(255,255,255,.82);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.72);
        overflow: hidden;
      }
      .search-box:focus-within { border-color: rgba(255,106,0,.42); box-shadow: 0 0 0 3px rgba(255,106,0,.08), 0 12px 26px rgba(0,27,71,.07); }
      .search-box input {
        width: 100%;
        min-width: 0;
        height: 100%;
        border: 0;
        background: transparent;
        outline: none;
        color: var(--emy-navy);
        padding: 0 16px;
        font-size: 13px;
        font-weight: 480;
      }
      .search-box input::placeholder { color: #7b7f88; }
      .search-box svg { width: 21px; height: 21px; color: var(--emy-navy); stroke-width: 2.1; }
      .filter-btn {
        height: var(--filter-size);
        width: var(--filter-size);
        border: 1px solid rgba(0,27,71,.09);
        border-radius: var(--search-radius);
        background:
          linear-gradient(145deg, rgba(255,255,255,.94), rgba(255,255,255,.44)),
          rgba(255,255,255,.38);
        color: var(--emy-navy);
        cursor: pointer;
        display: grid;
        place-items: center;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.75), 0 7px 14px rgba(0,27,71,.08);
      }
      .filter-btn:hover { border-color: rgba(255,106,0,.32); color: var(--emy-orange); background: rgba(255,255,255,.94); }
      .filter-btn svg { width: 21px; height: 21px; stroke-width: 2; }
      .result-head {
        width: min(100%, 1220px);
        display: flex;
        justify-content: space-between;
        align-items: end;
        gap: 18px;
        margin: 26px auto 0;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(0,27,71,.07);
      }
      .result-head h2 { margin: 0; color: var(--emy-navy); font-size: 15px; line-height: 1.2; font-weight: 650; }
      .result-head p { margin: 3px 0 0; color: var(--emy-muted); font-size: 12px; line-height: 1.35; font-weight: 420; }
      .active-filter { color: #bf520c; font-size: 12px; line-height: 1.35; font-weight: 520; text-align: right; }
      .results { width: min(100%, 1220px); margin: 14px auto 0; }
      .search-results-list {
        width: 100%;
        display: flex;
        align-items: flex-start;
        gap: 14px;
      }
      .search-results-list > * {
        flex: 0 0 auto;
        align-self: flex-start;
        max-width: 100%;
      }
      .search-feed-list {
        flex-wrap: wrap;
        align-items: flex-start;
      }
      .search-feed-list > .social-feed-card,
      .search-feed-list > .feed-card,
      .results .search-feed-list > .social-feed-card,
      .results .search-feed-list > .feed-card {
        flex: 0 0 calc((100% - 28px) / 3);
        width: calc((100% - 28px) / 3);
        max-width: calc((100% - 28px) / 3);
        align-self: flex-start;
      }
      .search-product-list,
      .search-business-list,
      .search-article-list,
      .search-event-list,
      .search-job-list,
      .search-clip-list {
        flex-wrap: wrap;
      }
      .search-article-list,
      .search-event-list,
      .search-job-list {
        align-items: flex-start;
      }
      .search-article-list > .social-feed-article-card {
        flex: 0 0 calc((100% - 28px) / 3);
        width: calc((100% - 28px) / 3);
        max-width: calc((100% - 28px) / 3);
        align-self: flex-start;
        height: auto;
      }
      .search-event-list > .social-feed-event-card,
      .search-job-list > .social-feed-job-card {
        flex: 0 0 calc((100% - 14px) / 2);
        width: calc((100% - 14px) / 2);
        max-width: calc((100% - 14px) / 2);
        align-self: flex-start;
        height: auto;
      }
      .search-product-list > .feed-product-card {
        flex-basis: calc((100% - 28px) / 3);
        width: calc((100% - 28px) / 3);
      }
      .results.is-product-results {
        width: min(100%, 1660px);
        max-width: 1660px;
      }
      .search-product-list[data-unified-feed-cards="true"] {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 318px), 318px));
        justify-content: center;
        align-items: start;
        gap: 14px;
      }
      .search-product-list[data-unified-feed-cards="true"] > .feed-product-card {
        width: 100%;
        flex-basis: auto;
        justify-self: stretch;
      }
      .search-business-list {
        gap: 18px;
      }
      .search-business-list > .feed-business-profile-card {
        flex-basis: calc((100% - 18px) / 2);
        width: calc((100% - 18px) / 2);
        justify-self: auto;
      }
      .search-business-list > .business-card {
        flex-basis: calc((100% - 36px) / 3);
        width: calc((100% - 36px) / 3);
        justify-self: auto;
      }
      .search-clip-list {
        justify-content: center;
      }
      .search-clip-list > .feed-clip-card,
      .search-clip-list > .feed-product-clip-card {
        flex-basis: 224px;
        width: 224px;
      }
      .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; align-items: start; }
      .business-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; align-items: start; }
      .card {
        min-width: 0;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: rgba(255,255,255,.94);
        box-shadow: 0 8px 18px rgba(0,27,71,.06);
        overflow: hidden;
      }
      .media {
        height: 104px;
        margin: 8px 8px 0;
        border-radius: 7px;
        background: #efe8e2;
        position: relative;
        overflow: hidden;
      }
      .media::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 45%, rgba(0,0,0,.05)); }
      .pizza { background: radial-gradient(circle at 32% 40%, #ffd9a8 0 34px, transparent 35px), radial-gradient(circle at 66% 34%, #d93426 0 17px, transparent 18px), radial-gradient(circle at 55% 65%, #f5ecb8 0 30px, transparent 31px), linear-gradient(135deg, #f6a249, #64321f); }
      .bottle { background: linear-gradient(120deg, #e8edf2, #c2ccd4), radial-gradient(circle at 52% 44%, #4c5d70 0 38px, transparent 39px); }
      .clear-bottle { background: radial-gradient(ellipse at 50% 50%, rgba(154,166,180,.32), transparent 62px), linear-gradient(135deg, #f2f5f9, #d7dde6); }
      .keyboard { background: linear-gradient(135deg, #212936, #76818f), repeating-linear-gradient(90deg, rgba(255,255,255,.15) 0 22px, transparent 22px 44px); }
      .tech { background: linear-gradient(145deg, #dbe4ec, #f8fbff); }
      .shop { background: linear-gradient(135deg, #eef3f7, #fff), radial-gradient(circle at 64% 32%, #d8a082, transparent 64px), linear-gradient(90deg, #394250, transparent); }
      .reel-a { background: radial-gradient(circle at 45% 38%, #fff2d7 0 46px, transparent 47px), linear-gradient(145deg, #f5b46a, #7b3321); }
      .reel-b { background: linear-gradient(145deg, #d9e6ef, #786f69), radial-gradient(circle at 64% 18%, rgba(255,255,255,.55), transparent 48px); }
      .person { background: radial-gradient(circle at 54% 24%, #caa28d 0 36px, transparent 37px), linear-gradient(145deg, #d9e4ee, #293446); }
      .card-body { position: relative; padding: 9px 9px 10px; }
      .product-result-card,
      .post-result-card { display: flex; flex-direction: column; }
      .product-result-card .card-body,
      .post-result-card .card-body {
        display: flex;
        flex: 1;
        min-height: 148px;
        flex-direction: column;
      }
      .product-result-card h3,
      .post-result-card h3 {
        min-height: 32px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .product-result-card p,
      .post-result-card p {
        min-height: 32px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .card h3 { margin: 0; color: #182033; font-size: 13px; line-height: 1.2; font-weight: 540; letter-spacing: 0; }
      .card p { margin: 4px 0 0; color: #60646f; font-size: 11px; line-height: 1.35; font-weight: 390; }
      .results .feed-card { display: grid; grid-template-rows: auto auto 1fr; overflow: hidden; border: 1px solid rgba(0,27,71,.10); border-radius: 14px; background: #fff; color: inherit; text-decoration: none; box-shadow: 0 14px 34px rgba(0,27,71,.08); transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease; }
      .results .feed-card:hover { transform: translateY(-2px); border-color: rgba(255,106,0,.24); box-shadow: 0 20px 42px rgba(0,27,71,.12), 0 12px 26px rgba(255,106,0,.10); }
      .results .feed-card.is-product { border-color: rgba(6,118,71,.16); }
      .results .feed-card.is-post { border-color: rgba(23,92,211,.14); }
      .results .feed-card.is-business { border-color: rgba(255,106,0,.18); }
      .results .feed-card-head { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 10px; align-items: center; padding: 11px 12px 8px; }
      .results .feed-profile-link { display: grid; grid-template-columns: 34px minmax(0,1fr); gap: 9px; align-items: center; color: inherit; text-decoration: none; min-width: 0; }
      .results .feed-avatar { width: 34px; height: 34px; border-radius: 999px; box-shadow: inset 0 0 0 2px rgba(255,255,255,.88), 0 8px 18px rgba(0,27,71,.12); }
      .results .feed-card-head strong { display: block; overflow: hidden; color: var(--emy-navy); font-size: 13px; line-height: 1.15; font-weight: 760; text-overflow: ellipsis; white-space: nowrap; }
      .results .feed-card-head small { display: block; margin-top: 3px; color: var(--emy-muted); font-size: 10.5px; line-height: 1; font-weight: 580; }
      .results .feed-tag { display: inline-flex; align-items: center; justify-content: center; min-height: 24px; border-radius: 999px; background: #eef4ff; color: #175cd3; padding: 0 9px; font-size: 10px; line-height: 1; font-weight: 820; white-space: nowrap; }
      .results .feed-card.is-product .feed-tag { background: #eef8f3; color: #067647; }
      .results .feed-card.is-business .feed-tag { background: #fff4e8; color: #c14f00; }
      .results .feed-media-link { display: block; color: inherit; text-decoration: none; }
      .results .feed-media { position: relative; width: 100%; height: auto; aspect-ratio: 4 / 3; min-height: 0; margin: 0; border-radius: 0; overflow: hidden; background-size: cover; background-position: center; }
      .results .feed-media::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(0,27,71,.10)); }
      .results .feed-body { display: grid; gap: 8px; padding: 12px; }
      .results .feed-body h2 { margin: 0; color: var(--emy-navy); font-size: 14px; line-height: 1.2; font-weight: 820; }
      .results .feed-body p { display: -webkit-box; overflow: hidden; margin: 0; color: var(--emy-muted); font-size: 11px; line-height: 1.35; font-weight: 450; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
      .results .feed-price { display: inline-flex; width: fit-content; min-height: 26px; align-items: center; justify-content: center; border-radius: 999px; background: #fff4e8; color: #d85a00; padding: 0 10px; font-size: 12px; line-height: 1; font-weight: 820; }
      .results .feed-actions { display: grid; grid-template-columns: minmax(0,1fr); align-items: stretch; gap: 7px; margin-top: 2px; padding: 8px; border: 1px solid rgba(0,27,71,.07); border-radius: 12px; background: linear-gradient(180deg,#fbfcff,#fff); box-shadow: inset 0 1px 0 rgba(255,255,255,.92); }
      .results .feed-stat { display: inline-flex; width: fit-content; max-width: 100%; min-height: 22px; align-items: center; border-radius: 999px; background: #eef3f8; color: #59667f; padding: 0 9px; font-size: 10.5px; line-height: 1; font-weight: 820; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .results .feed-action-row { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 5px; min-width: 0; }
      .results .feed-action { width: 100%; min-width: 0; min-height: 29px; border: 0; border-radius: 9px; background: rgba(255,255,255,.82); color: #56637b; cursor: pointer; padding: 0 5px; font-size: 10.2px; line-height: 1; font-weight: 820; text-align: center; white-space: nowrap; box-shadow: 0 1px 0 rgba(0,27,71,.05), inset 0 0 0 1px rgba(0,27,71,.06); }
      .results .feed-action:hover, .results .feed-action.is-active { background: #fff4e8; color: var(--emy-orange); box-shadow: inset 0 0 0 1px rgba(255,106,0,.22); }
      .results .social-feed-card {
        position: relative;
        display: block;
        width: 100%;
        min-width: 0;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 10px;
        background: rgba(255,255,255,.96);
        color: var(--emy-navy);
        box-shadow: 0 10px 28px rgba(0,27,71,.065);
      }
      .results .social-feed-card:hover {
        transform: none;
        border-color: rgba(0,27,71,.12);
        box-shadow: 0 14px 34px rgba(0,27,71,.09);
      }
      .results .social-feed-head {
        min-width: 0;
        min-height: 54px;
        display: grid;
        grid-template-columns: 40px minmax(0,1fr) 30px;
        gap: 9px;
        align-items: center;
        padding: 10px 12px 5px;
        background: rgba(255,255,255,.90);
      }
      .results .social-feed-head .social-feed-name,
      .results .social-feed-head .feed-profile-link.social-feed-name {
        display: block;
        min-width: 0;
        overflow: hidden;
        color: inherit;
        text-decoration: none;
      }
      .results .social-feed-avatar.feed-avatar,
      .results .social-feed-head .feed-avatar {
        display: grid;
        width: 38px;
        min-width: 38px;
        height: 38px;
        place-items: center;
        overflow: hidden;
        border-radius: 999px;
        background: linear-gradient(145deg,#f8fafc,#eef2f7);
        color: #d85a00;
        font-size: 12px;
        font-weight: 850;
        text-decoration: none;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.07), 0 7px 14px rgba(0,27,71,.08);
      }
      .results .social-feed-avatar.feed-avatar > span {
        display: grid;
        width: 100%;
        height: 100%;
        place-items: center;
      }
      .results .social-feed-avatar.feed-avatar img,
      .results .social-feed-head .feed-avatar img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .results .social-feed-name strong {
        display: block;
        overflow: hidden;
        color: var(--emy-navy);
        font-size: 12.5px;
        line-height: 1.15;
        font-weight: 850;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .results .social-feed-name small {
        display: block;
        overflow: hidden;
        margin-top: 3px;
        color: #778197;
        font-size: 10px;
        line-height: 1.12;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .results .social-feed-more {
        width: 30px;
        min-width: 30px;
        height: 30px;
        min-height: 30px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: #26364f;
        box-shadow: none;
        padding: 0;
        position: relative;
        z-index: 8;
        display: grid;
        place-items: center;
        cursor: pointer;
        font-size: 17px;
        line-height: 1;
      }
      .results .social-feed-more:hover,
      .results .social-feed-more[aria-expanded="true"] {
        background: #fff4e8;
        color: var(--emy-orange);
      }
      .results .feed-options-menu,
      .feed-options-menu[data-feed-options-scope="search"] {
        position: fixed;
        right: auto;
        left: 0;
        top: 0;
        z-index: 10050;
        width: min(220px, calc(100vw - 24px));
        max-height: calc(100dvh - 24px);
        overflow: auto;
        border: 1px solid rgba(255,255,255,.72);
        border-radius: 16px;
        background: linear-gradient(145deg, rgba(255,255,255,.86), rgba(255,250,244,.66));
        backdrop-filter: blur(22px) saturate(1.16);
        box-shadow: 0 18px 36px rgba(0,27,71,.14), inset 0 1px 0 rgba(255,255,255,.88), inset 0 -12px 24px rgba(0,27,71,.04);
        padding: 7px;
      }
      .results .feed-options-menu[hidden],
      .feed-options-menu[data-feed-options-scope="search"][hidden] { display: none; }
      .results .feed-options-menu button,
      .feed-options-menu[data-feed-options-scope="search"] button {
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
        font-weight: 680;
      }
      .results .feed-options-menu button:hover,
      .feed-options-menu[data-feed-options-scope="search"] button:hover {
        background: rgba(255,255,255,.82);
        color: var(--emy-orange);
        box-shadow: inset 0 0 0 1px rgba(255,106,0,.10);
      }
      .results .feed-options-menu button.is-danger,
      .feed-options-menu[data-feed-options-scope="search"] button.is-danger { color: #ef3f4a; font-weight: 760; }
      .results .social-feed-media {
        position: relative;
        display: block;
        width: 100%;
        min-height: 0;
        margin: 0;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        border-radius: 0;
        background: #101828;
        background-size: cover;
        background-position: center;
      }
      .results .social-feed-media img,
      .results .social-feed-media video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: var(--media-fit, contain);
        transform: translate(var(--media-x,0%), var(--media-y,0%)) scale(var(--media-zoom,1));
        transform-origin: center;
        display: block;
        background: #101828;
      }
      .results .social-feed-media .post-badge {
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 4;
        min-height: 23px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        color: #d85a00;
        padding: 0 8px;
        font-size: 9px;
        line-height: 1;
        font-weight: 850;
        box-shadow: 0 7px 14px rgba(0,27,71,.08);
      }
      .results .social-feed-card.is-text-only .social-feed-text-panel {
        margin: 0 12px 4px;
        border: 0;
        border-radius: 0;
        background: transparent;
        padding: 8px 0 12px;
        box-shadow: none;
      }
      .results .social-feed-card.is-text-only .social-feed-text-panel p {
        margin: 0;
        overflow-wrap: anywhere;
      }
      .results .social-feed-actions {
        min-width: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        margin: 2px 10px 0;
        border-top: 1px solid rgba(0,27,71,.07);
        padding: 6px 0 5px;
      }
      .results .social-feed-action-set {
        display: flex;
        align-items: center;
        gap: 3px;
        min-width: 0;
      }
      .results .social-feed-icon {
        width: 31px;
        min-width: 31px;
        height: 30px;
        min-height: 30px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 9px;
        background: transparent;
        color: #26364f;
        cursor: pointer;
        padding: 0;
        box-shadow: none;
      }
      .results .social-feed-icon:hover,
      .results .social-feed-icon.is-active {
        background: #fff4e8;
        color: var(--emy-orange);
        box-shadow: none;
        transform: none;
      }
      .results .social-feed-icon svg {
        display: block;
        width: 16px;
        height: 16px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .results .social-feed-actions.social-feed-actions-counted {
        display: grid;
        grid-template-columns: minmax(0,1fr) auto;
        align-items: start;
        gap: 4px;
        margin: 1px 6px 0;
        border: 0;
        border-top: 1px solid rgba(0,27,71,.07);
        border-radius: 0;
        background: transparent;
        padding: 4px 0 0;
        box-shadow: none;
        backdrop-filter: none;
      }
      .results .social-feed-actions-counted .social-feed-action-set {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px 5px;
        min-width: 0;
      }
      .results .social-feed-actions-counted .social-feed-action-pair {
        display: inline-flex;
        min-width: 0;
        align-items: center;
        gap: 2px;
        color: #667085;
        font-size: 10.5px;
        line-height: 1;
        font-weight: 850;
      }
      .results .social-feed-actions-counted .social-feed-icon {
        width: 25px;
        min-width: 25px;
        height: 24px;
        min-height: 24px;
        border-radius: 7px;
      }
      .results .social-feed-actions-counted .social-feed-icon svg {
        width: 13px;
        height: 13px;
      }
      .results .social-feed-actions-counted .social-feed-save {
        justify-self: end;
        margin-left: 2px;
      }
      .results .social-feed-body {
        display: grid;
        grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center;
        gap: 5px 7px;
        padding: 4px 10px 10px;
      }
      .results .social-feed-stat {
        margin: 0;
        color: #26364f;
        font-size: 10.8px;
        line-height: 1.2;
        font-weight: 780;
        white-space: nowrap;
      }
      .results .social-feed-caption {
        grid-column: 1 / -1;
        margin: 0;
        color: #344054;
        font-size: 11.5px;
        line-height: 1.35;
        font-weight: 520;
        overflow-wrap: anywhere;
      }
      .results .social-feed-caption strong {
        margin-right: 4px;
        color: var(--emy-navy);
        font-weight: 820;
      }
      .results .social-feed-comments-link,
      .results .social-feed-time {
        min-width: 0;
        margin: 0;
        border: 0;
        background: transparent;
        padding: 0;
        color: #7a869e;
        font-size: 10.5px;
        line-height: 1.2;
        font-weight: 700;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-shadow: none;
      }
      .results .social-feed-time {
        justify-self: end;
        color: #98a2b3;
        text-align: right;
      }
      .results .social-feed-body.social-feed-body-counted {
        display: grid;
        grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center;
        gap: 4px;
        padding: 3px 6px 7px;
      }
      .results .social-feed-body-counted .social-feed-caption {
        grid-column: 1 / -1;
        margin: 0;
      }
      .results .social-feed-hidden-stat {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        white-space: nowrap;
      }
      .results .social-feed-body-counted .social-feed-comments-link {
        border-radius: 999px;
        background: #fff4e8;
        color: var(--emy-orange);
        padding: 2px 6px;
        font-size: 10px;
        line-height: 1.1;
        font-weight: 780;
      }
      .results [data-feed-id]:not(.is-comments-open) .social-feed-body-counted .social-feed-comments-link {
        display: none !important;
      }
      .results [data-feed-id]:not(.is-comments-open) .social-feed-body-counted .social-feed-time {
        grid-column: 3;
      }
      .results .feed-comments {
        position: relative;
        z-index: 9;
        isolation: isolate;
        display: none;
        margin: 0;
        border-top: 1px solid rgba(0,27,71,.07);
        background: #fff;
        padding: 9px 10px 10px;
        box-sizing: border-box;
        overflow: hidden;
      }
      .results .social-feed-card.is-comments-open .feed-comments,
      .results .reel-card.is-comments-open .feed-comments {
        display: block;
      }
      .results .feed-comment {
        display: grid;
        grid-template-columns: 28px minmax(0,1fr);
        gap: 7px;
        margin-top: 8px;
      }
      .results .feed-comment-avatar {
        width: 28px;
        height: 28px;
        min-width: 28px;
        display: grid;
        place-items: center;
        overflow: hidden;
        border-radius: 999px;
        background: #eef3f8;
        color: var(--emy-navy);
        font-size: 10px;
        line-height: 1;
        font-weight: 820;
        text-decoration: none;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.07);
      }
      .results .feed-comment-avatar img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: inherit;
        object-fit: cover;
      }
      .results .feed-comment-bubble {
        border-radius: 12px;
        background: #f6f8fb;
        color: #364157;
        padding: 8px 9px;
        font-size: 11.5px;
        line-height: 1.35;
        overflow-wrap: anywhere;
      }
      .results .feed-comment-bubble strong {
        display: block;
        margin-bottom: 2px;
        color: var(--emy-navy);
        font-size: 11.5px;
        line-height: 1.15;
        font-weight: 830;
      }
      .results .feed-comment-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
        margin-top: 7px;
        color: #7a869e;
        font-size: 11px;
        line-height: 1;
        font-weight: 760;
      }
      .results .feed-comment-actions button {
        width: auto;
        min-width: 18px;
        height: 22px;
        min-height: 22px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 0 2px;
        font: inherit;
        font-size: 0;
        box-shadow: none;
      }
      .results .feed-comment-actions button:hover,
      .results .feed-comment-actions button.is-active {
        color: var(--emy-orange);
      }
      .results .feed-comment-actions [data-feed-comment-delete] { color: #d92d20; }
      .results .feed-comment-actions button svg {
        width: 14px;
        height: 14px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .results .feed-comment-action-count {
        min-width: 14px;
        color: #7a869e;
        font-size: 11px;
        font-weight: 760;
        text-align: center;
      }
      .results .feed-product-card {
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
        justify-self: stretch;
        min-height: 420px;
        border-radius: 8px;
        background: rgba(255,255,255,.96);
        box-shadow: 0 18px 42px rgba(0,27,71,.10);
      }
      .results .feed-product-card.is-new::before,
      .results .feed-product-card[data-product-new="true"]::before {
        content: "New";
        position: absolute;
        left: 20px;
        top: 20px;
        z-index: 5;
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        color: #d85a00;
        padding: 0 11px;
        font-size: 11px;
        line-height: 1;
        font-weight: 850;
        box-shadow: 0 10px 22px rgba(0,27,71,.12);
      }
      .results .feed-product-card .photo {
        position: relative;
        display: block;
        flex: 0 0 auto;
        width: auto;
        height: 178px;
        min-height: 0;
        margin: 10px 10px 0;
        border-radius: 7px;
        overflow: hidden;
        background-size: cover;
        background-position: center;
      }
      .results .feed-product-card .photo img,
      .results .feed-product-card .photo video {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: var(--media-fit, cover);
        transform: translate(var(--media-x,0%), var(--media-y,0%)) scale(var(--media-zoom,1));
        transform-origin: center;
      }
      .results .feed-product-card .body {
        flex: 1 1 auto;
        min-width: 0;
        min-height: 232px;
        display: flex;
        flex-direction: column;
        padding: 22px 16px 16px;
      }
      .results .feed-product-card h3 {
        max-width: 24ch;
        min-height: 48px;
        display: -webkit-box;
        overflow: hidden;
        margin: 0;
        color: var(--emy-navy);
        font-size: 20px;
        line-height: 1.18;
        font-weight: 850;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .results .feed-product-card p {
        min-height: 23px;
        display: -webkit-box;
        overflow: hidden;
        margin: 0;
        color: #68738a;
        font-size: 16px;
        line-height: 1.35;
        font-weight: 650;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .results .feed-product-card .product-availability {
        display: inline-flex;
        max-width: 100%;
        align-items: flex-start;
        gap: 6px;
        margin-top: 9px;
        color: #079455;
        font-size: 12.5px;
        line-height: 1.25;
        font-weight: 820;
        white-space: normal;
        overflow-wrap: anywhere;
      }
      .results .feed-product-card .product-availability::before {
        content: "";
        width: 7px;
        height: 7px;
        flex: 0 0 7px;
        margin-top: .2em;
        border-radius: 999px;
        background: #20c987;
        box-shadow: 0 0 0 3px rgba(32,201,135,.12);
      }
      .results .feed-product-card .product-source,
      .results .feed-product-card .product-stats {
        font-size: 12.5px;
        line-height: 1.15;
        font-weight: 760;
      }
      .results .feed-product-card .product-source {
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        align-self: flex-start;
        margin-top: 10px;
        border-radius: 999px;
        background: #f3f6fb;
        color: #55657c;
        padding: 0 10px;
      }
      .results .feed-product-card .product-stats {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 9px;
        color: #68738a;
      }
      .results .feed-product-card .product-stats { display: none !important; }
      .results .feed-product-card .price {
        display: inline-flex;
        width: fit-content;
        min-width: 78px;
        min-height: 28px;
        align-items: center;
        justify-content: center;
        margin-top: 6px;
        border-radius: 999px;
        background: #fff4e8;
        color: #d85a00;
        padding: 0 10px;
        font-size: 13px;
        line-height: 1;
        font-weight: 850;
        white-space: nowrap;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card {
        min-width: 0;
        width: 100%;
        justify-self: stretch;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 8px;
        background: rgba(255,255,255,.96);
        color: #071326;
        box-shadow: 0 6px 18px rgba(0,27,71,.045);
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 0;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card.is-new::before,
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card[data-product-new="true"]::before {
        left: 12px;
        top: 12px;
        min-height: 20px;
        padding: 0 7px;
        font-size: 9px;
        box-shadow: 0 7px 14px rgba(0,27,71,.08);
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card .photo {
        position: relative;
        display: block;
        flex: 0 0 auto;
        width: auto;
        height: auto;
        min-height: 0;
        margin: 8px;
        aspect-ratio: 4 / 3;
        border-radius: 7px;
        overflow: hidden;
        background-size: cover;
        background-position: center;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card .body {
        flex: 1 1 auto;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
        padding: 11px 12px 12px;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card h3 {
        min-height: 0;
        font-size: 14.5px;
        line-height: 1.2;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card p {
        min-height: 0;
        margin: 6px 0 0;
        font-size: 11.5px;
        line-height: 1.35;
        font-weight: 560;
        -webkit-line-clamp: 2;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card .product-source,
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card .product-availability,
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card .product-stats {
        font-size: 10.8px;
        line-height: 1.15;
        font-weight: 720;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card .product-source {
        min-height: 21px;
        margin-top: 8px;
        padding: 0 8px;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card .product-availability {
        margin-top: 7px;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card .product-stats {
        gap: 6px;
        margin-top: 7px;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card .product-stats { display: none !important; }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card .price {
        min-width: 74px;
        min-height: 26px;
        margin-top: 8px;
        padding: 0 10px;
        font-size: 12px;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card .social-feed-more {
        position: absolute;
        z-index: 6;
        width: 32px;
        min-width: 32px;
        height: 32px;
        min-height: 32px;
        top: 11px;
        right: 11px;
        border: 1px solid rgba(255,255,255,.72);
        border-radius: 999px;
        background: rgba(255,255,255,.82);
        color: #59667f;
        display: grid;
        place-items: center;
        padding: 0;
        font-size: 16px;
        box-shadow: 0 8px 18px rgba(0,27,71,.08);
        backdrop-filter: blur(10px);
      }
      .results .search-product-list[data-unified-feed-cards="true"] .social-feed-body.social-feed-body-counted {
        display: grid;
        grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center;
        gap: 4px;
        padding: 3px 6px 7px;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .social-feed-hidden-stat {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        white-space: nowrap;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .social-feed-body-counted .social-feed-comments-link {
        min-width: 0;
        margin: 0;
        border: 0;
        border-radius: 999px;
        background: #fff4e8;
        color: var(--emy-orange);
        cursor: pointer;
        padding: 2px 6px;
        font: inherit;
        font-size: 10px;
        line-height: 1.1;
        font-weight: 780;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .results .search-product-list[data-unified-feed-cards="true"] [data-feed-id]:not(.is-comments-open) .social-feed-body-counted .social-feed-comments-link {
        display: none !important;
      }
      .results .search-product-list[data-unified-feed-cards="true"] [data-feed-id]:not(.is-comments-open) .social-feed-body-counted .social-feed-time {
        grid-column: 3;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .social-feed-body-counted .social-feed-time {
        justify-self: end;
        margin: 0;
        color: #98a2b3;
        font-size: 10px;
        line-height: 1.15;
        font-weight: 660;
        text-transform: none;
        letter-spacing: 0;
      }
      .results .search-product-list[data-unified-feed-cards="true"] .feed-product-card.is-comments-open .feed-comments {
        display: block;
      }
      .results .reel-card.feed-clip-card,
      .results .reel-card.feed-product-clip-card {
        position: relative;
        display: block;
        width: 100%;
        min-width: 0;
        min-height: 432px;
        aspect-ratio: 9 / 16;
        justify-self: stretch;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 10px;
        background: #101828;
        color: #fff;
        box-shadow: 0 10px 28px rgba(0,27,71,.065);
      }
      .results .reel-card .photo {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        min-height: 0;
        margin: 0;
        border-radius: 0;
        background-size: cover;
        background-position: center;
      }
      .results .reel-card .photo img,
      .results .reel-card .photo video {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: var(--media-fit, cover);
        transform: translate(var(--media-x,0%), var(--media-y,0%)) scale(var(--media-zoom,1));
        transform-origin: center;
      }
      .results .reel-card .photo::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(0,27,71,.20), rgba(0,27,71,.06) 42%, rgba(0,27,71,.88));
      }
      .results .feed-clip-card .photo { opacity: .78; background: linear-gradient(180deg,#cbd5dd 0%,#aeb8c0 42%,#56677f 70%,#061f4b 100%); }
      .results .feed-product-clip-card .photo { opacity: .80; background: radial-gradient(circle at 66% 44%, #e94234 0 13px, transparent 14px), radial-gradient(circle at 31% 21%, #ffd6a8 0 19px, transparent 20px), linear-gradient(180deg,#d9964d 0%,#b66d3b 48%,#061f4b 100%); }
      .results .reel-top {
        position: absolute;
        top: 12px;
        left: 12px;
        right: 52px;
        z-index: 6;
        display: grid;
        grid-template-columns: 32px minmax(0,1fr) auto;
        gap: 8px;
        align-items: center;
      }
      .results .reel-avatar {
        width: 32px;
        height: 32px;
        border: 2px solid rgba(255,255,255,.88);
        border-radius: 999px;
        background: rgba(255,255,255,.42);
        box-shadow: 0 8px 18px rgba(0,27,71,.20);
      }
      .results .reel-owner-link,
      .results .reel-top .feed-profile-link {
        display: block;
        min-width: 0;
        color: inherit;
        text-decoration: none;
      }
      .results .reel-top strong {
        display: block;
        overflow: hidden;
        color: #fff;
        font-size: 12.5px;
        line-height: 1.12;
        font-weight: 850;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-shadow: 0 2px 8px rgba(0,27,71,.22);
      }
      .results .reel-top small {
        display: block;
        overflow: hidden;
        margin-top: 2px;
        color: rgba(255,255,255,.86);
        font-size: 10.5px;
        line-height: 1.05;
        font-weight: 720;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .results .reel-type-badge {
        display: inline-flex;
        align-items: center;
        min-height: 24px;
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        color: var(--emy-navy);
        padding: 0 9px;
        font-size: 9px;
        line-height: 1;
        font-weight: 850;
      }
      .results .reel-play {
        position: absolute;
        left: 50%;
        top: 48%;
        z-index: 5;
        width: 46px;
        height: 46px;
        transform: translate(-50%, -50%);
        border-radius: 999px;
        background: rgba(255,255,255,.92);
        color: #061f4b;
        display: grid;
        place-items: center;
        box-shadow: 0 16px 32px rgba(0,27,71,.24), inset 0 1px 0 rgba(255,255,255,.86);
        backdrop-filter: blur(12px);
        transition: opacity .16s ease, transform .16s ease;
      }
      .results .reel-card:hover .reel-play,
      .results .reel-card:focus-within .reel-play,
      .results .reel-card.is-previewing .reel-play { opacity: .78; transform: translate(-50%, -50%) scale(.94); }
      .results .reel-play svg { width: 23px; height: 23px; margin-left: 2px; fill: currentColor; }
      .results .reel-card .caption {
        position: absolute;
        inset: auto 0 0;
        z-index: 4;
        display: flex;
        min-height: 152px;
        flex-direction: column;
        padding: 34px 12px 54px;
        color: #fff;
        background: linear-gradient(180deg, transparent 0%, rgba(0,27,71,.52) 24%, rgba(0,27,71,.92) 100%);
      }
      .results .feed-product-clip-card .caption {
        min-height: 222px;
        padding: 36px 12px 54px;
      }
      .results .reel-card .caption strong {
        display: -webkit-box;
        min-height: 0;
        overflow: hidden;
        color: #fff;
        font-size: 15px;
        line-height: 1.12;
        font-weight: 850;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .results .reel-card .caption > span {
        display: -webkit-box;
        min-height: 0;
        overflow: hidden;
        margin-top: 7px;
        color: rgba(255,255,255,.88);
        font-size: 12.5px;
        line-height: 1.2;
        font-weight: 650;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .results .reel-actions {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 10px;
        color: rgba(255,255,255,.86);
        font-size: 10.8px;
        line-height: 1.2;
        font-weight: 760;
      }
      .results .reel-actions span { white-space: nowrap; }
      .results .reel-inline-action {
        width: 30px;
        min-width: 30px;
        height: 28px;
        min-height: 28px;
        border: 1px solid rgba(255,255,255,.26);
        border-radius: 9px;
        background: rgba(255,255,255,.12);
        color: #fff;
        display: inline-grid;
        place-items: center;
        padding: 0;
        box-shadow: none;
      }
      .results .reel-inline-action svg {
        width: 16px;
        height: 16px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .results .product-clip-panel {
        min-height: 84px;
        margin-top: 8px;
        display: grid;
        grid-template-columns: minmax(0,1fr) auto;
        align-items: center;
        gap: 6px;
        border-radius: 7px;
        background: rgba(255,255,255,.90);
        color: #061f4b;
        padding: 10px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.86), 0 14px 30px rgba(0,27,71,.18);
      }
      .results .product-clip-panel strong {
        overflow: hidden;
        color: #061f4b;
        font-size: 15px;
        line-height: 1.1;
        font-weight: 850;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .results .product-clip-panel span {
        display: none;
      }
      .results .product-clip-price {
        display: inline-flex;
        min-height: 22px;
        align-items: center;
        border-radius: 999px;
        background: #fff4e8;
        color: #c14f00;
        padding: 0 8px;
        font-size: 10.5px;
        line-height: 1;
        font-style: normal;
        font-weight: 850;
      }
      .results .reel-card .social-feed-actions-counted {
        position: absolute;
        left: 8px;
        right: 8px;
        bottom: 23px;
        z-index: 6;
        margin: 0;
        border-top: 1px solid rgba(255,255,255,.22);
        padding: 4px 0 0;
        background: transparent;
      }
      .results .reel-card .social-feed-body {
        position: absolute;
        left: 8px;
        right: 8px;
        bottom: 5px;
        z-index: 6;
        padding: 0;
        background: transparent;
      }
      .results .reel-card .social-feed-stat {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        white-space: nowrap;
      }
      .results .reel-card .social-feed-actions-counted .social-feed-action-pair {
        color: rgba(255,255,255,.88);
      }
      .results .reel-card .social-feed-actions-counted .social-feed-icon {
        border-color: rgba(255,255,255,.24);
        background: rgba(255,255,255,.10);
        color: #fff;
      }
      .results .reel-card .social-feed-time {
        color: rgba(255,255,255,.84);
      }
      .results .reel-card:not(.is-comments-open) .social-feed-comments-link {
        display: none;
      }
      .results .reel-card.is-comments-open .social-feed-body {
        display: none;
      }
      .results .feed-product-card .heart,
      .results .feed-product-card .social-feed-more {
        position: absolute;
        top: 18px;
        z-index: 12;
        width: 46px;
        min-width: 46px;
        height: 46px;
        min-height: 46px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(255,255,255,.72);
        border-radius: 999px;
        background: rgba(255,255,255,.78);
        color: #667085;
        padding: 0;
        font-size: 18px;
        line-height: 1;
        box-shadow: 0 16px 30px rgba(0,27,71,.14), inset 0 1px 0 rgba(255,255,255,.88);
        backdrop-filter: blur(14px) saturate(1.08);
      }
      .results .feed-product-card .heart { right: 70px; }
      .results .feed-product-card .social-feed-more { right: 18px; }
      .results .feed-product-card .heart:hover,
      .results .feed-product-card .heart.is-active,
      .results .feed-product-card .social-feed-more:hover,
      .results .feed-product-card .social-feed-more[aria-expanded="true"] {
        border-color: rgba(255,106,0,.34);
        background: #fff4e8;
        color: var(--emy-orange);
        box-shadow: 0 12px 24px rgba(255,106,0,.16);
      }
      .results .reel-card .social-feed-more,
      .results .feed-clip-card .social-feed-more,
      .results .feed-product-clip-card .social-feed-more {
        position: absolute;
        top: 12px;
        right: 12px;
        z-index: 12;
        width: 32px;
        min-width: 32px;
        height: 32px;
        min-height: 32px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(255,255,255,.52);
        border-radius: 999px;
        background: rgba(8,19,38,.34);
        color: #fff;
        padding: 0;
        font-size: 18px;
        line-height: 1;
        box-shadow: 0 10px 22px rgba(0,27,71,.20), inset 0 1px 0 rgba(255,255,255,.18);
        backdrop-filter: blur(12px) saturate(1.08);
      }
      .results .reel-card .social-feed-more:hover,
      .results .feed-clip-card .social-feed-more:hover,
      .results .feed-product-clip-card .social-feed-more:hover,
      .results .reel-card .social-feed-more[aria-expanded="true"],
      .results .feed-clip-card .social-feed-more[aria-expanded="true"],
      .results .feed-product-clip-card .social-feed-more[aria-expanded="true"] {
        border-color: rgba(255,106,0,.42);
        background: rgba(255,106,0,.92);
        color: #fff;
        box-shadow: 0 12px 24px rgba(255,106,0,.22);
      }
      .results .feed-clip-card .reel-top,
      .results .feed-product-clip-card .reel-top {
        right: 52px;
      }
      .results .feed-business-profile-card {
        width: min(100%, 502px);
        justify-self: center;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: rgba(255,255,255,.98);
        color: var(--emy-navy);
        box-shadow: 0 18px 42px rgba(0,27,71,.10);
      }
      .results .feed-business-profile-card:hover {
        border-color: rgba(255,106,0,.22);
        transform: translateY(-1px);
        box-shadow: 0 22px 48px rgba(0,27,71,.13), 0 12px 26px rgba(255,106,0,.08);
      }
      .results .feed-business-profile-cover {
        position: relative;
        display: block;
        min-height: 272px;
        overflow: hidden;
        border-radius: 8px 8px 0 0;
        background: radial-gradient(circle at 30% 34%, rgba(255,255,255,.78) 0 86px, transparent 88px), radial-gradient(circle at 50% 72%, rgba(255,255,255,.42) 0 58px, transparent 60px), radial-gradient(circle at 74% 22%, rgba(214,175,152,.55) 0 118px, transparent 120px), radial-gradient(circle at 68% 58%, #e94b3e 0 29px, transparent 31px), linear-gradient(180deg,#e2eaf1 0%,#9baabb 52%,#233c64 100%);
        color: inherit;
        text-decoration: none;
      }
      .results .feed-business-profile-cover img,
      .results .feed-business-profile-cover video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .results .feed-business-profile-cover::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(0,27,71,.04) 42%, rgba(0,27,71,.20));
      }
      .results .feed-business-profile-badge,
      .results .feed-business-profile-pill {
        position: absolute;
        z-index: 3;
        min-height: 29px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        padding: 0 13px;
        font-size: 12px;
        line-height: 1;
        font-weight: 850;
        box-shadow: 0 14px 30px rgba(0,27,71,.12);
        backdrop-filter: blur(12px);
      }
      .results .feed-business-profile-badge { left: 14px; top: 14px; border: 1px solid rgba(255,106,0,.20); color: #d85a00; }
      .results .feed-business-profile-pill { right: 14px; top: 14px; border: 1px solid rgba(0,27,71,.08); color: var(--emy-navy); }
      .results .feed-business-profile-pause {
        position: absolute;
        right: 18px;
        top: 86px;
        z-index: 3;
        width: 42px;
        height: 42px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(255,255,255,.62);
        border-radius: 999px;
        background: rgba(255,250,246,.58);
        color: #fff;
        font-size: 13px;
        font-weight: 900;
        letter-spacing: .08em;
        box-shadow: 0 12px 26px rgba(0,27,71,.12);
        backdrop-filter: blur(12px);
      }
      .results .feed-business-profile-avatar {
        position: absolute;
        left: 16px;
        bottom: 16px;
        z-index: 3;
        width: 58px;
        height: 58px;
        display: grid;
        place-items: center;
        overflow: hidden;
        border: 3px solid rgba(255,255,255,.92);
        border-radius: 999px;
        background: radial-gradient(circle at 50% 34%, #6b4c3f 0 10px, transparent 11px), linear-gradient(145deg,#15263f,#0d1726);
        color: #fff;
        font-size: 19px;
        font-weight: 850;
        box-shadow: 0 13px 28px rgba(0,27,71,.24);
      }
      .results .feed-business-profile-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .results .feed-business-profile-duration {
        position: absolute;
        right: 16px;
        bottom: 15px;
        z-index: 3;
        min-height: 28px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(0,27,71,.86);
        color: #fff;
        padding: 0 10px;
        font-size: 13px;
        line-height: 1;
        font-weight: 850;
        box-shadow: 0 12px 24px rgba(0,27,71,.22);
      }
      .results .feed-business-profile-body { padding: 20px 18px 16px; }
      .results .feed-business-profile-body h3 { margin: 0; color: var(--emy-navy); font-size: 24px; line-height: 1.12; font-weight: 850; letter-spacing: 0; }
      .results .feed-business-profile-copy { margin: 7px 0 0; color: #667085; font-size: 16px; line-height: 1.35; font-weight: 650; }
      .results .feed-business-profile-status,
      .results .feed-business-profile-address,
      .results .feed-business-profile-hours { min-width: 0; max-width: 100%; margin-top: 8px; color: #68738a; font-size: 16px; line-height: 1.3; font-weight: 650; white-space: normal; overflow-wrap: anywhere; }
      .results .feed-business-profile-status { display: flex; align-items: flex-start; gap: 7px; color: #0f8f57; font-weight: 850; }
      .results .feed-business-profile-status::before { content: ""; width: 10px; height: 10px; flex: 0 0 10px; margin-top: .2em; border-radius: 999px; background: #20c987; box-shadow: 0 0 0 3px rgba(32,201,135,.13); }
      .results .feed-business-profile-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 12px; }
      .results .feed-business-profile-foot span { min-height: 28px; display: inline-flex; align-items: center; border-radius: 999px; background: #f3f6fb; color: #667085; padding: 0 12px; font-size: 13px; line-height: 1; font-weight: 850; }
      .results .feed-business-profile-foot .is-open { background: #ecfdf3; color: #087443; }
      .results .feed-business-profile-foot .is-closed { background: #fff1f3; color: #b42318; }
      .results .feed-business-profile-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
      .results .feed-business-profile-chips span { min-height: 26px; display: inline-flex; align-items: center; border-radius: 999px; background: #f3f6fb; color: #667085; padding: 0 11px; font-size: 12px; line-height: 1; font-weight: 800; }
      .results .feed-business-profile-hours { font-size: 14px; font-weight: 760; }
      .results .feed-business-profile-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 15px; }
      .results .feed-business-profile-actions button { min-height: 40px; border-radius: 999px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 14px; font-size: 13px; line-height: 1; font-weight: 850; }
      .results .feed-business-profile-customer { border: 1px solid rgba(32,201,135,.22); background: rgba(236,253,243,.78); color: #087443; box-shadow: 0 12px 24px rgba(16,185,129,.12), inset 0 1px 0 rgba(255,255,255,.78); backdrop-filter: blur(14px); }
      .results .feed-business-profile-customer::before { content: ""; width: 10px; height: 10px; border-radius: 999px; background: #20c987; box-shadow: 0 0 0 3px rgba(32,201,135,.13); }
      .results .feed-business-profile-like { border: 1px solid rgba(0,27,71,.10); background: rgba(255,255,255,.72); color: #4f5d77; box-shadow: 0 12px 26px rgba(0,27,71,.08), inset 0 1px 0 rgba(255,255,255,.82); backdrop-filter: blur(16px); }
      .results .feed-business-profile-like svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .results .feed-business-profile-like.is-active { border-color: rgba(255,106,0,.28); background: rgba(255,244,232,.78); color: #d85a00; }
      .results .business-card {
        position: relative;
        display: grid;
        grid-template-columns: 1fr;
        min-height: 336px;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: linear-gradient(180deg,#fff 0%,#fff 72%,#fffdf8 100%);
        color: var(--emy-navy);
        box-shadow: 0 10px 22px rgba(0,27,71,.055), inset 0 2px 0 rgba(255,255,255,.92);
      }
      .results .business-card:hover {
        border-color: rgba(255,106,0,.20);
        box-shadow: 0 14px 30px rgba(0,27,71,.085), 0 8px 18px rgba(255,106,0,.08), inset 0 2px 0 rgba(255,255,255,.92);
        transform: none;
      }
      .results .business-card .photo {
        position: relative;
        width: auto;
        height: 142px;
        min-height: 0;
        margin: 8px;
        overflow: hidden;
        border-radius: 7px;
        background-size: cover;
        background-position: center;
      }
      .results .business-card .photo::before,
      .results .business-card .photo::after {
        content: "";
        position: absolute;
        inset: 0;
      }
      .results .business-card .photo::after {
        z-index: 2;
        background: linear-gradient(180deg,transparent 42%,rgba(0,27,71,.22));
      }
      .results .business-card .photo.has-media::before {
        display: none;
      }
      .results .business-card .photo img,
      .results .business-card .photo video {
        position: absolute;
        inset: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center;
      }
      .results .business-avatar {
        position: absolute;
        left: 12px;
        bottom: 10px;
        z-index: 3;
        display: grid;
        width: 48px;
        height: 48px;
        place-items: center;
        overflow: hidden;
        border: 3px solid rgba(255,255,255,.94);
        border-radius: 999px;
        background: #fffaf5;
        color: var(--emy-navy);
        text-decoration: none;
        font-size: 16px;
        line-height: 1;
        font-weight: 800;
        box-shadow: 0 10px 22px rgba(0,27,71,.18);
      }
      .results .business-avatar img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      .results .business-media-chip {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 3;
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(255,255,255,.92);
        color: var(--emy-navy);
        padding: 0 9px;
        text-decoration: none;
        font-size: 10px;
        line-height: 1;
        font-weight: 750;
        box-shadow: 0 8px 18px rgba(0,27,71,.10);
      }
      .results .business-card .body {
        display: flex;
        min-height: 174px;
        flex-direction: column;
        padding: 11px 12px 12px;
      }
      .results .business-card h3 {
        min-height: 36px;
        display: -webkit-box;
        overflow: hidden;
        margin: 0;
        color: var(--emy-navy);
        font-size: 13px;
        line-height: 1.2;
        font-weight: 700;
        letter-spacing: 0;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .results .business-title-link {
        color: inherit;
        text-decoration: none;
      }
      .results .business-title-link:hover {
        color: var(--emy-orange);
      }
      .results .business-card p {
        margin: 5px 0 0;
        color: #667085;
        font-size: 11px;
        line-height: 1.35;
        font-weight: 450;
      }
      .results .business-address {
        color: #7a8498;
        font-weight: 560;
      }
      .results .business-card-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
      }
      .results .business-like-button {
        min-height: 33px;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 999px;
        background: #fff;
        color: #59667f;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 0 11px;
        font: inherit;
        font-size: 11.5px;
        line-height: 1;
        font-weight: 740;
        box-shadow: 0 8px 18px rgba(0,27,71,.06);
        transition: border-color .16s ease, background .16s ease, color .16s ease, box-shadow .16s ease, transform .16s ease;
      }
      .results .business-like-button:hover,
      .results .business-like-button.is-active,
      .results .business-like-button.is-liked {
        border-color: rgba(255,106,0,.28);
        background: #fff4e8;
        color: #c14f00;
      }
      .results .business-like-button .emy-business-like-icon svg {
        display: block;
        width: 20px;
        height: 20px;
        overflow: visible;
      }
      .results .business-like-button strong {
        color: inherit;
        font-size: 11px;
        font-weight: 820;
        transition: opacity .12s ease, transform .12s ease;
      }
      .results .business-card .status-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-top: auto;
        padding-top: 9px;
      }
      .results .business-card .status,
      .results .business-card .distance {
        display: inline-flex;
        min-height: 22px;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 0 8px;
        font-size: 10px;
        line-height: 1;
        font-weight: 700;
      }
      .results .business-card .status {
        background: #eafaf2;
        color: #0f8f57;
      }
      .results .business-card .status.closed {
        background: #fff1f1;
        color: #d33b3b;
      }
      .results .business-card .distance {
        background: #f3f6fb;
        color: #667085;
        font-weight: 650;
      }
      .results .social-feed-article-card .feed-article-card-body,
      .results .social-feed-event-card .feed-event-post,
      .results .social-feed-job-card .feed-job-card {
        margin: 0 10px 4px;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.075);
        border-radius: 10px;
        background: #fff;
        box-shadow: none;
      }
      .results .feed-article-card-body {
        background: linear-gradient(180deg,#fff,#fffaf5);
        padding: 14px;
      }
      .results .feed-article-card-body > span,
      .results .feed-event-post-hero span,
      .results .feed-job-hero span {
        width: fit-content;
        min-height: 21px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: #fff4e8;
        color: var(--emy-orange);
        padding: 0 9px;
        font-size: 10px;
        line-height: 1;
        font-weight: 850;
        box-shadow: inset 0 0 0 1px rgba(255,106,0,.18);
      }
      .results .feed-article-card-body h2,
      .results .feed-event-post-hero strong,
      .results .feed-job-hero strong {
        margin: 10px 0 7px;
        color: var(--emy-navy);
        font-size: 20px;
        line-height: 1.14;
        font-weight: 880;
        letter-spacing: 0;
        overflow-wrap: anywhere;
      }
      .results .feed-article-card-body p,
      .results .feed-event-post-details p,
      .results .feed-job-desc {
        display: -webkit-box;
        margin: 0;
        color: #46556f;
        font-size: 13px;
        line-height: 1.43;
        font-weight: 600;
        white-space: normal;
        overflow: hidden;
        overflow-wrap: anywhere;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .results .feed-article-card-body p {
        -webkit-line-clamp: 4;
      }
      .results .feed-article-card-cover {
        position: relative;
        height: 170px;
        overflow: hidden;
        border-radius: 9px;
        background: #eef3f8;
        margin-bottom: 12px;
      }
      .results .feed-article-card-cover img,
      .results .feed-article-card-cover video,
      .results .feed-job-cover-media,
      .results .feed-event-card-cover-image {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      .results .feed-article-card-cover .emy-video-player,
      .results .feed-event-card-cover-image .emy-video-player,
      .results .feed-job-cover-media .emy-video-player,
      .results .feed-event-card-cover-image img,
      .results .feed-event-card-cover-image video,
      .results .feed-job-cover-media img,
      .results .feed-job-cover-media video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      .results .feed-article-card-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        margin-top: 12px;
      }
      .results .feed-article-card-meta small,
      .results .feed-event-post-meta span,
      .results .feed-job-meta span {
        min-height: 24px;
        border-radius: 8px;
        background: #f2f4f7;
        color: #667085;
        padding: 7px 9px;
        font-size: 10.8px;
        line-height: 1.22;
        font-weight: 760;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.06);
        overflow-wrap: anywhere;
      }
      .results .feed-article-card-meta small {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 0 9px;
      }
      .results .feed-event-post-hero,
      .results .feed-job-hero {
        position: relative;
        min-height: 96px;
        display: grid;
        align-content: end;
        gap: 7px;
        overflow: hidden;
        background: linear-gradient(135deg,#fffaf5,#eef3f8);
        padding: 12px 14px;
        isolation: isolate;
      }
      .results .feed-event-post.has-cover .feed-event-post-hero,
      .results .feed-job-hero.has-cover,
      .results .feed-job-card.has-cover .feed-job-hero {
        min-height: 150px;
        background: #001b47;
      }
      .results .feed-event-card-cover-image,
      .results .feed-job-cover-media {
        position: absolute;
        inset: 0;
        z-index: 0;
      }
      .results .feed-event-post.has-cover .feed-event-post-hero::after,
      .results .feed-job-hero.has-cover::after,
      .results .feed-job-card.has-cover .feed-job-hero::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 1;
        background: linear-gradient(180deg,rgba(0,27,71,.04) 0%,rgba(0,27,71,.18) 44%,rgba(0,27,71,.72) 100%);
        pointer-events: none;
      }
      .results .feed-event-post.has-cover .feed-event-post-hero span,
      .results .feed-event-post.has-cover .feed-event-post-hero strong,
      .results .feed-job-hero.has-cover span,
      .results .feed-job-hero.has-cover strong,
      .results .feed-job-card.has-cover .feed-job-hero span,
      .results .feed-job-card.has-cover .feed-job-hero strong {
        position: relative;
        z-index: 2;
        color: #fff;
        text-shadow: 0 1px 14px rgba(0,27,71,.50);
      }
      .results .feed-event-post.has-cover .feed-event-post-hero span,
      .results .feed-job-hero.has-cover span,
      .results .feed-job-card.has-cover .feed-job-hero span {
        background: rgba(255,255,255,.22);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.36);
      }
      .results .feed-event-post-details,
      .results .feed-job-body {
        display: grid;
        gap: 8px;
        padding: 11px 12px 12px;
      }
      .results .feed-event-post-meta,
      .results .feed-job-meta {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 7px;
      }
      .results .feed-event-post-meta span b,
      .results .feed-job-meta span b {
        display: block;
        margin-bottom: 3px;
        color: #667085;
        font-size: 9px;
        line-height: 1;
        font-weight: 820;
        text-transform: uppercase;
      }
      .results .feed-job-business {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #667085;
        font-size: 11.5px;
        line-height: 1.2;
        font-weight: 730;
      }
      .results .feed-job-business i {
        width: 25px;
        height: 25px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: #f3f6fb;
        color: var(--emy-navy);
        font-style: normal;
        font-size: 11px;
        font-weight: 860;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.07);
      }
      .results .feed-job-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 7px;
        padding-top: 2px;
      }
      .results .feed-job-apply,
      .results .feed-job-manage {
        min-height: 31px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        border-radius: 999px;
        cursor: pointer;
        padding: 0 12px;
        font-size: 11.5px;
        line-height: 1;
        font-weight: 800;
        font-family: inherit;
      }
      .results .feed-job-apply { border: 0; background: var(--emy-orange); color: #fff; box-shadow: 0 8px 16px rgba(255,106,0,.16); }
      .results .feed-job-apply.is-applied { padding: 0 10px; font-size: 10.2px; line-height: 1.05; text-align: center; white-space: normal; max-width: 220px; }
      .results .feed-job-manage { border: 1px solid rgba(0,27,71,.10); background: rgba(255,255,255,.76); color: var(--emy-navy); }
      .results .feed-job-count { color: #667085; font-size: 11.5px; font-weight: 760; }
      .following-grid { gap: 16px; }
      .customer-business-card {
        position: relative;
        display: grid;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 18px;
        background: linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,250,245,.92));
        box-shadow: 0 18px 42px rgba(0,27,71,.10), 0 10px 24px rgba(255,106,0,.06);
        overflow: hidden;
      }
      .customer-business-card:hover {
        border-color: rgba(255,106,0,.24);
        box-shadow: 0 24px 52px rgba(0,27,71,.14), 0 14px 28px rgba(255,106,0,.10);
        transform: translateY(-1px);
      }
      .customer-business-media-link {
        position: relative;
        display: block;
        min-height: 170px;
        margin: 10px 10px 0;
        border-radius: 15px;
        color: inherit;
        overflow: hidden;
        text-decoration: none;
      }
      .customer-business-card .media {
        height: 100%;
        min-height: 170px;
        margin: 0;
        border-radius: 15px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.48);
      }
      .customer-business-card .media::after {
        background: linear-gradient(180deg, rgba(0,27,71,.02), rgba(0,27,71,.18) 54%, rgba(0,27,71,.40));
      }
      .customer-business-avatar {
        position: absolute;
        left: 14px;
        bottom: 12px;
        z-index: 2;
        width: 54px;
        height: 54px;
        border: 3px solid rgba(255,255,255,.92);
        border-radius: 999px;
        box-shadow: 0 12px 24px rgba(0,27,71,.20), inset 0 0 0 1px rgba(255,255,255,.52);
      }
      .customer-business-badge {
        position: absolute;
        right: 12px;
        bottom: 16px;
        z-index: 2;
        display: inline-flex;
        min-height: 28px;
        align-items: center;
        border: 1px solid rgba(255,255,255,.64);
        border-radius: 999px;
        background: rgba(255,255,255,.86);
        color: var(--emy-navy);
        padding: 0 12px;
        font-size: 11px;
        line-height: 1;
        font-weight: 850;
        box-shadow: 0 10px 20px rgba(0,27,71,.14);
        backdrop-filter: blur(12px);
      }
      .customer-business-card .card-body {
        display: grid;
        gap: 9px;
        padding: 14px 14px 15px;
      }
      .customer-business-card h3 {
        color: var(--emy-navy);
        font-size: 17px;
        line-height: 1.15;
        font-weight: 850;
      }
      .customer-business-card p {
        display: -webkit-box;
        min-height: 38px;
        overflow: hidden;
        margin: 0;
        color: #53627a;
        font-size: 13px;
        line-height: 1.42;
        font-weight: 560;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .customer-business-card .meta {
        margin-top: 0;
        color: #52627a;
        font-size: 12px;
        font-weight: 760;
      }
      .customer-business-card .status {
        display: inline-flex;
        min-height: 26px;
        align-items: center;
        border-radius: 999px;
        background: rgba(6,118,71,.10);
        color: #067647;
        padding: 0 10px;
      }
      .customer-business-profile-link {
        display: inline-flex;
        min-height: 34px;
        width: fit-content;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255,106,0,.18);
        border-radius: 999px;
        background: rgba(255,244,232,.84);
        color: #d85a00;
        padding: 0 13px;
        text-decoration: none;
        font-size: 12px;
        line-height: 1;
        font-weight: 850;
      }
      .customer-business-profile-link:hover { background: rgba(255,244,232,.98); border-color: rgba(255,106,0,.30); }
      .search-business-profile-card {
        width: 100%;
        max-width: 502px;
        justify-self: center;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 8px;
        background: rgba(255,255,255,.98);
        color: var(--emy-navy);
        box-shadow: 0 18px 42px rgba(0,27,71,.10);
      }
      .search-business-profile-card:hover {
        border-color: rgba(255,106,0,.22);
        transform: translateY(-1px);
        box-shadow: 0 22px 48px rgba(0,27,71,.13), 0 12px 26px rgba(255,106,0,.08);
      }
      .search-business-profile-cover {
        position: relative;
        display: block;
        height: auto;
        min-height: 190px;
        margin: 0;
        overflow: hidden;
        border-radius: 8px 8px 0 0;
        background: radial-gradient(circle at 33% 40%, rgba(255,255,255,.68) 0 54px, transparent 56px), radial-gradient(circle at 67% 32%, rgba(212,166,138,.66) 0 62px, transparent 64px), linear-gradient(145deg,#e7eef4 0%,#b6c1cb 48%,#283e61 100%);
        color: inherit;
        text-decoration: none;
      }
      .search-business-profile-cover.profile-video {
        background: radial-gradient(circle at 30% 34%, rgba(255,255,255,.78) 0 86px, transparent 88px), radial-gradient(circle at 50% 72%, rgba(255,255,255,.42) 0 58px, transparent 60px), radial-gradient(circle at 74% 22%, rgba(214,175,152,.55) 0 118px, transparent 120px), radial-gradient(circle at 68% 58%, #e94b3e 0 29px, transparent 31px), linear-gradient(180deg,#e2eaf1 0%,#9baabb 52%,#233c64 100%);
      }
      .search-business-profile-cover img,
      .search-business-profile-cover video {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .search-business-profile-cover::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(0,27,71,.04) 42%, rgba(0,27,71,.20));
      }
      .search-business-profile-badge,
      .search-business-profile-pill {
        position: absolute;
        z-index: 3;
        min-height: 29px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        padding: 0 13px;
        font-size: 12px;
        line-height: 1;
        font-weight: 850;
        box-shadow: 0 14px 30px rgba(0,27,71,.12);
        backdrop-filter: blur(12px);
      }
      .search-business-profile-badge { left: 14px; top: 14px; border: 1px solid rgba(255,106,0,.20); color: #d85a00; }
      .search-business-profile-pill { right: 14px; top: 14px; border: 1px solid rgba(0,27,71,.08); color: var(--emy-navy); }
      .search-business-profile-pause {
        position: absolute;
        right: 18px;
        top: 70px;
        z-index: 3;
        width: 42px;
        height: 42px;
        border: 1px solid rgba(255,255,255,.62);
        border-radius: 999px;
        background: rgba(255,250,246,.58);
        color: #fff;
        display: grid;
        place-items: center;
        font-size: 13px;
        font-weight: 900;
        letter-spacing: .08em;
        box-shadow: 0 12px 26px rgba(0,27,71,.12);
        backdrop-filter: blur(12px);
      }
      .search-business-profile-avatar {
        position: absolute;
        left: 16px;
        bottom: 16px;
        z-index: 3;
        width: 58px;
        height: 58px;
        overflow: hidden;
        border: 3px solid rgba(255,255,255,.92);
        border-radius: 999px;
        background: radial-gradient(circle at 50% 34%, #6b4c3f 0 10px, transparent 11px), linear-gradient(145deg,#15263f,#0d1726);
        color: #fff;
        display: grid;
        place-items: center;
        font-size: 19px;
        font-weight: 850;
        box-shadow: 0 13px 28px rgba(0,27,71,.24);
      }
      .search-business-profile-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .search-business-profile-duration {
        position: absolute;
        right: 16px;
        bottom: 15px;
        z-index: 3;
        min-height: 28px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(0,27,71,.86);
        color: #fff;
        padding: 0 10px;
        font-size: 13px;
        line-height: 1;
        font-weight: 850;
        box-shadow: 0 12px 24px rgba(0,27,71,.22);
      }
      .search-business-profile-body { padding: 17px 16px 14px; }
      .search-business-profile-body h3 { margin: 0; color: var(--emy-navy); font-size: 22px; line-height: 1.12; font-weight: 850; letter-spacing: 0; }
      .search-business-profile-copy { display: -webkit-box; overflow: hidden; margin: 7px 0 0; color: #667085; font-size: 15px; line-height: 1.34; font-weight: 650; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
      .search-business-profile-status,
      .search-business-profile-address,
      .search-business-profile-hours { margin-top: 7px; color: #68738a; font-size: 14px; line-height: 1.28; font-weight: 650; }
      .search-business-profile-status { display: flex; align-items: center; gap: 7px; color: #0f8f57; font-weight: 850; }
      .search-business-profile-status::before { content: ""; width: 10px; height: 10px; flex: 0 0 auto; border-radius: 999px; background: #20c987; box-shadow: 0 0 0 3px rgba(32,201,135,.13); }
      .search-business-profile-address { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
      .search-business-profile-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
      .search-business-profile-chips span { min-height: 26px; display: inline-flex; align-items: center; border-radius: 999px; background: #f3f6fb; color: #667085; padding: 0 11px; font-size: 12px; line-height: 1; font-weight: 800; }
      .search-business-profile-hours { font-size: 12.5px; font-weight: 760; }
      .search-business-profile-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 9px; margin-top: 12px; }
      .search-business-profile-actions button { width: auto; min-width: 0; min-height: 35px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 0 12px; font-size: 12px; line-height: 1; font-weight: 850; box-shadow: none; }
      .results .search-business-profile-actions .feed-action {
        width: auto;
        min-width: 0;
        min-height: 35px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 0 12px;
        font-size: 12px;
        line-height: 1;
        font-weight: 850;
        white-space: nowrap;
      }
      .search-business-profile-customer { border: 1px solid rgba(32,201,135,.22); background: rgba(236,253,243,.78); color: #087443; box-shadow: 0 12px 24px rgba(16,185,129,.12), inset 0 1px 0 rgba(255,255,255,.78); backdrop-filter: blur(14px); }
      .results .search-business-profile-actions .search-business-profile-customer { border: 1px solid rgba(32,201,135,.22); background: rgba(236,253,243,.78); color: #087443; box-shadow: 0 12px 24px rgba(16,185,129,.12), inset 0 1px 0 rgba(255,255,255,.78); }
      .search-business-profile-customer::before { content: ""; width: 10px; height: 10px; border-radius: 999px; background: #20c987; box-shadow: 0 0 0 3px rgba(32,201,135,.13); }
      .search-business-profile-customer.is-active { background: rgba(236,253,243,.92); color: #087443; }
      .search-business-profile-like { border: 1px solid rgba(0,27,71,.10); background: rgba(255,255,255,.72); color: #4f5d77; box-shadow: 0 12px 26px rgba(0,27,71,.08), inset 0 1px 0 rgba(255,255,255,.82); backdrop-filter: blur(16px); }
      .results .search-business-profile-actions .search-business-profile-like { border: 1px solid rgba(0,27,71,.10); background: rgba(255,255,255,.72); color: #4f5d77; box-shadow: 0 12px 26px rgba(0,27,71,.08), inset 0 1px 0 rgba(255,255,255,.82); }
      .search-business-profile-like svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .search-business-profile-like.is-active { border-color: rgba(255,106,0,.28); background: rgba(255,244,232,.78); color: #d85a00; }
      .results .search-business-profile-actions .search-business-profile-like.is-active { border-color: rgba(255,106,0,.28); background: rgba(255,244,232,.78); color: #d85a00; }
      .search-business-profile-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 9px; padding-top: 0; border-top: 0; }
      .search-business-profile-foot span { min-height: 26px; display: inline-flex; align-items: center; border-radius: 999px; background: #f3f6fb; color: #667085; padding: 0 10px; font-size: 12px; line-height: 1; font-weight: 850; }
      .search-business-profile-foot .is-open { background: rgba(236,253,243,.72); color: #087443; }
      .search-business-profile-foot .is-closed { background: rgba(255,241,243,.82); color: #c52c55; }
      .product-source {
        display: inline-flex;
        align-items: center;
        min-height: 20px;
        margin-top: 7px;
        border-radius: 999px;
        background: #f3f6fb;
        color: #55657c;
        padding: 0 8px;
        font-size: 10px;
        line-height: 1;
        font-weight: 660;
      }
      .product-stats {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
        color: #667085;
        font-size: 11px;
        line-height: 1;
        font-weight: 540;
      }
      .product-stats span + span::before {
        content: "";
        display: inline-block;
        width: 3px;
        height: 3px;
        margin: 0 8px 2px 0;
        border-radius: 999px;
        background: rgba(102,112,133,.55);
      }
      .product-stats { display: none !important; }
      .price { display: inline-flex; width: fit-content; min-width: 78px; min-height: 28px; align-items: center; justify-content: center; margin-top: 6px; border-radius: 999px; background: #fff4e8; color: #d85a00; padding: 0 10px; font-size: 12px; line-height: 1; font-weight: 800; white-space: nowrap; }
      .product-result-card .price { margin-top: auto; padding-top: 0; }
      .heart {
        position: absolute;
        right: 12px;
        top: 12px;
        z-index: 4;
        width: 36px;
        height: 36px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 999px;
        background: rgba(255,255,255,.92);
        color: #667085;
        cursor: pointer;
        display: grid;
        place-items: center;
        padding: 0;
        box-shadow: 0 8px 18px rgba(0,27,71,.10);
        transition: background .14s ease, border-color .14s ease, color .14s ease, transform .14s ease, box-shadow .14s ease;
      }
      .heart:hover {
        border-color: rgba(0,27,71,.16);
        background: #fff;
        color: var(--emy-navy);
        transform: translateY(-1px);
        box-shadow: 0 10px 22px rgba(0,27,71,.13);
      }
      .heart svg {
        display: block;
        width: 19px;
        height: 19px;
        overflow: visible;
      }
      .heart svg path {
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .heart.is-liked {
        border-color: rgba(225,29,72,.24);
        background: #fff5f7;
        color: #e11d48;
      }
      .heart.is-liked svg path {
        fill: currentColor;
        stroke: currentColor;
      }
      .meta { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 7px; color: #6b7280; font-size: 10.5px; font-weight: 420; }
      .post-result-card .meta { margin-top: auto; padding-top: 10px; }
      .status { color: #0f8f57; font-weight: 550; }
      .closed { color: #c52c55; }
      .reel-toggle {
        width: min(100%, 280px);
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 2px auto 18px;
        border: 1px solid rgba(0,27,71,.18);
        border-radius: 8px;
        overflow: hidden;
        background: rgba(255,255,255,.86);
      }
      .reel-toggle button {
        height: 40px;
        border: 0;
        background: transparent;
        color: #667085;
        cursor: pointer;
        font-size: 13px;
        font-weight: 520;
      }
      .reel-toggle button.is-active { background: var(--emy-orange); color: #fff; }
      .reel-card {
        position: relative;
        min-height: 300px;
        aspect-ratio: 9 / 16;
        border-radius: 12px;
        overflow: hidden;
        background: #101828;
        color: #fff;
        box-shadow: 0 14px 32px rgba(0,27,71,.15);
      }
      .reel-card .media { position: absolute; inset: 0; height: 100%; margin: 0; border-radius: 0; }
      .reel-card .media video { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover; }
      .reel-card .media::after { background: linear-gradient(180deg, rgba(0,27,71,.16) 0%, transparent 34%, rgba(0,27,71,.92) 100%); }
      .search-reel-top {
        position: absolute;
        top: 11px;
        left: 11px;
        right: 11px;
        z-index: 2;
        display: grid;
        grid-template-columns: 32px minmax(0, 1fr) auto;
        gap: 8px;
        align-items: center;
      }
      .search-reel-avatar {
        width: 32px;
        height: 32px;
        border: 2px solid rgba(255,255,255,.88);
        border-radius: 999px;
        box-shadow: 0 8px 18px rgba(0,27,71,.20);
      }
      .search-reel-top strong {
        display: block;
        overflow: hidden;
        color: #fff;
        font-size: 12px;
        line-height: 1.1;
        font-weight: 820;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .search-reel-top small {
        display: block;
        margin-top: 2px;
        color: rgba(255,255,255,.78);
        font-size: 9.5px;
        line-height: 1;
        font-weight: 650;
      }
      .search-reel-badge {
        display: inline-flex;
        align-items: center;
        min-height: 23px;
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        color: var(--emy-navy);
        padding: 0 8px;
        font-size: 9px;
        line-height: 1;
        font-weight: 820;
      }
      .search-reel-play {
        position: absolute;
        left: 50%;
        top: 47%;
        z-index: 2;
        width: 50px;
        height: 50px;
        transform: translate(-50%, -50%);
        border-radius: 999px;
        background: rgba(255,255,255,.92);
        color: var(--emy-navy);
        display: grid;
        place-items: center;
        box-shadow: 0 16px 34px rgba(0,27,71,.24);
        transition: opacity .16s ease, transform .16s ease;
      }
      .reel-card:hover .search-reel-play,
      .reel-card:focus-within .search-reel-play,
      .reel-card.is-previewing .search-reel-play { opacity: .74; transform: translate(-50%, -50%) scale(.92); }
      .search-reel-play svg { width: 25px; height: 25px; margin-left: 2px; fill: currentColor; }
      .reel-card .overlay { position: absolute; inset: auto 0 0; z-index: 2; display: flex; min-height: 150px; flex-direction: column; padding: 56px 13px 13px; color: #fff; background: linear-gradient(180deg, transparent, rgba(0,27,71,.94)); }
      .reel-card h3 {
        min-height: 38px;
        display: -webkit-box;
        overflow: hidden;
        margin: 0;
        color: #fff;
        font-size: 16px;
        line-height: 1.15;
        font-weight: 840;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .reel-card p {
        min-height: 30px;
        display: -webkit-box;
        overflow: hidden;
        margin: 5px 0 0;
        color: rgba(255,255,255,.84);
        font-size: 11px;
        line-height: 1.35;
        font-weight: 520;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .search-reel-actions { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: auto; padding-top: 9px; color: rgba(255,255,255,.86); font-size: 10px; font-weight: 760; }
      .search-reel-actions span { white-space: nowrap; }
      .search-reel-product {
        margin-top: 10px;
        display: grid;
        height: 98px;
        min-height: 98px;
        grid-template-rows: 28px 22px 26px;
        gap: 4px;
        border-radius: 8px;
        background: rgba(255,255,255,.95);
        color: var(--emy-navy);
        padding: 8px 10px;
        box-sizing: border-box;
      }
      .search-reel-product strong {
        display: -webkit-box;
        min-height: 28px;
        overflow: hidden;
        color: var(--emy-navy);
        font-size: 11px;
        line-height: 1.18;
        font-weight: 820;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .search-reel-product span {
        display: -webkit-box;
        min-height: 22px;
        overflow: hidden;
        margin-top: 0;
        color: #667085;
        font-size: 9.5px;
        line-height: 1.2;
        font-weight: 580;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .search-reel-product b { display: inline-flex; width: fit-content; min-width: 78px; min-height: 26px; align-items: center; justify-content: center; margin-top: 0; align-self: end; border-radius: 999px; background: #fff4e8; color: #d85a00; padding: 0 10px; font-size: 11px; line-height: 1; font-weight: 850; white-space: nowrap; }
      .empty { display: none; margin: 34px auto 0; max-width: 360px; text-align: center; color: var(--emy-muted); font-size: 14px; line-height: 1.45; }
      .empty.is-visible { display: block; }
      .bottom-nav {
        position: fixed;
        left: 50%;
        bottom: 10px;
        z-index: 35;
        width: min(calc(100% - 16px), 430px);
        transform: translateX(-50%);
        display: grid;
        grid-template-columns: repeat(8, minmax(0, 1fr));
        border: 1px solid rgba(0,27,71,.06);
        border-radius: 16px;
        background: rgba(248,251,255,.48);
        backdrop-filter: blur(18px);
        padding: 8px;
        box-shadow: 0 12px 30px rgba(0,27,71,.08);
        transition: background .18s ease, border-color .18s ease, box-shadow .18s ease;
      }
      .bottom-nav:hover { border-color: rgba(0,27,71,.14); background: rgba(248,251,255,.96); box-shadow: 0 18px 46px rgba(0,27,71,.18); }
      .nav-item {
        position: relative;
        border: 0;
        background: transparent;
        color: #68748c;
        cursor: pointer;
        display: grid;
        place-items: center;
        gap: 4px;
        min-width: 0;
        min-height: 56px;
        border-radius: 11px;
        font-size: 9.5px;
        font-weight: 600;
      }
      .nav-item span {
        position: relative;
        z-index: 1;
        line-height: 1;
        padding-bottom: 5px;
      }
`;
const customer_search_part_2 = String.raw`
      .nav-item svg {
        width: 34px;
        height: 34px;
        box-sizing: border-box;
        stroke-width: 2;
        color: rgba(0,27,71,.86);
        padding: 8px;
        border: 1px solid rgba(255,255,255,.88);
        border-radius: 13px;
        background:
          linear-gradient(145deg, rgba(255,255,255,.92), rgba(255,255,255,.42) 54%, rgba(255,255,255,.24)),
          rgba(255,255,255,.34);
        clip-path: polygon(18% 0, 100% 0, 100% 74%, 78% 100%, 0 100%, 0 22%);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.74), inset 0 -8px 16px rgba(0,27,71,.08), 0 9px 18px rgba(0,27,71,.16);
      }
      .nav-item.is-active { color: var(--emy-orange); background: rgba(0,27,71,.035); }
      .nav-item.is-active svg {
        color: var(--emy-orange);
        border-color: rgba(255,106,0,.36);
        background:
          linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,255,255,.48) 54%, rgba(255,255,255,.28)),
          rgba(255,255,255,.38);
        transform: translateY(-1px);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,.78),
          inset 0 -8px 16px rgba(255,106,0,.08),
          0 10px 20px rgba(0,27,71,.17);
      }
      .nav-item.is-active::after {
        content: "";
        position: absolute;
        bottom: 1px;
        width: 18px;
        height: 2px;
        border-radius: 999px;
        background: var(--emy-orange);
      }
      .nav-item.nav-item-ask svg {
        width: 48px;
        height: 48px;
        color: #fff;
        padding: 0;
        border: 0;
        border-radius: 0;
        background: transparent;
        clip-path: none;
        box-shadow: none;
        filter: drop-shadow(0 11px 15px rgba(255,106,0,.28));
      }
      .nav-item.nav-item-ask span { color: var(--emy-orange); font-size: 8.8px; white-space: nowrap; }
      .nav-item.nav-item-ask:hover svg { transform: translateY(-1px); }
`;
const customer_search_part_3 = String.raw`
      .toast {
        position: fixed;
        left: 50%;
        bottom: 92px;
        z-index: 70;
        transform: translateX(-50%) translateY(12px);
        min-width: min(320px, calc(100% - 32px));
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 10px;
        background: rgba(255,255,255,.96);
        color: var(--emy-navy);
        box-shadow: 0 18px 38px rgba(0,27,71,.16);
        padding: 12px 14px;
        text-align: center;
        opacity: 0;
        pointer-events: none;
        transition: .18s ease;
        font-size: 13px;
        font-weight: 560;
      }
      .toast.is-visible { opacity: 1; transform: translateX(-50%) translateY(0); }
      .filter-view {
        position: fixed;
        inset: 0;
        z-index: 80;
        display: none;
        background:
          radial-gradient(circle at 86% 6%, rgba(255,106,0,.10), transparent 250px),
          linear-gradient(180deg, #fff8ef 0%, #fffdf8 56%, #fff8ef 100%);
      }
      .filter-view.is-open { display: block; }
      .filter-shell { width: min(100%, 540px); min-height: 100dvh; margin: 0 auto; padding: 0 22px 28px; display: flex; flex-direction: column; }
      .filter-top { display: grid; grid-template-columns: 42px 1fr 42px; align-items: center; min-height: 60px; }
      .filter-top h2 { margin: 0; text-align: center; color: #171435; font-size: clamp(22px, 3vw, 30px); line-height: 1; font-weight: 680; }
      .filter-fields { display: grid; gap: 16px; padding-top: 18px; }
      .field label { display: block; margin-bottom: 8px; color: var(--emy-navy); font-size: 16px; line-height: 1.15; font-weight: 620; }
      .custom-select { position: relative; }
      .custom-select-trigger {
        width: 100%;
        min-height: 44px;
        border: 1px solid rgba(0,27,71,.18);
        border-radius: 8px;
        background:
          linear-gradient(145deg, rgba(255,255,255,.94), rgba(255,255,255,.52)),
          rgba(255,255,255,.48);
        color: #5f626b;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 0 13px;
        text-align: left;
        font-size: 14px;
        font-weight: 430;
      }
      .custom-select-trigger:focus, .custom-select.is-open .custom-select-trigger { outline: none; border-color: rgba(255,106,0,.48); box-shadow: 0 0 0 3px rgba(255,106,0,.09); }
      .custom-select-trigger svg { flex: 0 0 auto; width: 18px; height: 18px; color: #555b67; stroke-width: 2.1; transition: transform .16s ease; }
      .custom-select.is-open .custom-select-trigger svg { transform: rotate(180deg); }
      .custom-select-menu {
        position: absolute;
        left: 0;
        right: 0;
        top: calc(100% + 6px);
        z-index: 8;
        display: grid;
        gap: 4px;
        max-height: 220px;
        overflow: auto;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 9px;
        background: rgba(255,255,255,.98);
        box-shadow: 0 18px 38px rgba(0,27,71,.15);
        padding: 6px;
      }
      .custom-select-menu[hidden] { display: none; }
      .custom-option {
        width: 100%;
        min-height: 36px;
        border: 1px solid transparent;
        border-radius: 6px;
        background: transparent;
        color: var(--emy-navy);
        cursor: pointer;
        padding: 8px 10px;
        text-align: left;
        font-size: 13px;
        font-weight: 450;
      }
      .custom-option:hover, .custom-option.is-selected { border-color: rgba(255,106,0,.22); background: #fff7ef; color: #bf520c; }
      .filter-actions { margin-top: auto; display: grid; gap: 12px; padding-top: 30px; }
      .reset-btn, .apply-btn {
        width: 100%;
        height: 48px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        line-height: 1;
        font-weight: 620;
      }
      .reset-btn { border: 1px solid rgba(0,27,71,.18); background: rgba(255,255,255,.70); color: #696a70; }
      .apply-btn { border: 0; background: var(--emy-orange); color: #fff; box-shadow: 0 14px 24px rgba(255,106,0,.22); }
      @media (min-width: 760px) {
        .topbar {
          min-height: 70px;
          border-bottom: 1px solid rgba(0,27,71,.08);
          background: rgba(255,253,248,.86);
          backdrop-filter: blur(16px);
          padding: 0 4px;
        }
        .avatar { width: 44px; height: 44px; }
        .hello strong { font-size: 16px; }
        .location-btn { font-size: 12px; }
        .icon-btn { width: 42px; height: 42px; background: #fff; border: 1px solid rgba(0,27,71,.08); }
        .search-command { max-width: 1220px; }
        .results, .result-head { max-width: 1220px; }
        .business-grid, .following-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .filter-view { background: rgba(0,27,71,.36); backdrop-filter: blur(8px); padding: 28px; overflow: auto; }
        .filter-shell { min-height: auto; border: 1px solid rgba(0,27,71,.10); border-radius: 12px; background: #fffdf8; box-shadow: 0 24px 70px rgba(0,27,71,.20); padding: 0 26px 26px; }
      }
      @media (max-width: 900px) {
        .search-command { grid-template-columns: 1fr; }
        .grid, .following-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .search-product-list > .feed-product-card {
          flex-basis: calc((100% - 14px) / 2);
          width: calc((100% - 14px) / 2);
        }
        .search-business-list > .business-card {
          flex-basis: calc((100% - 18px) / 2);
          width: calc((100% - 18px) / 2);
        }
      }
      @media (max-width: 720px) {
        .business-grid, .following-grid { grid-template-columns: 1fr; }
        .search-results-list {
          gap: 12px;
        }
        .search-product-list > .feed-product-card,
        .search-feed-list > .social-feed-card,
        .search-feed-list > .feed-card,
        .search-article-list > .social-feed-article-card,
        .search-event-list > .social-feed-event-card,
        .search-job-list > .social-feed-job-card,
        .search-business-list > .feed-business-profile-card,
        .search-business-list > .business-card {
          flex-basis: 100%;
          width: 100%;
          max-width: 100%;
        }
        .search-clip-list > .feed-clip-card,
        .search-clip-list > .feed-product-clip-card {
          flex-basis: min(224px, 100%);
          width: min(224px, 100%);
        }
      }
      @media (min-width: 820px) {
        .bottom-nav {
          left: 50%;
          top: auto;
          bottom: 18px;
          transform: translateX(-50%);
          width: min(620px, calc(100% - 40px));
          height: auto;
          display: grid;
          grid-template-columns: repeat(8, minmax(0, 1fr));
          gap: 2px;
          border: 1px solid rgba(0,27,71,.06);
          border-radius: 14px;
          background: rgba(248,251,255,.48);
          box-shadow: 0 14px 36px rgba(0,27,71,.08);
          padding: 8px;
        }
        .bottom-nav::before {
          content: none;
          display: none;
        }
        .nav-item {
          min-height: 54px;
          display: grid;
          place-items: center;
          gap: 4px;
          padding: 0;
          border-radius: 11px;
          color: #56637b;
          font-size: 10px;
          font-weight: 600;
        }
        .nav-item:hover, .nav-item.is-active { background: rgba(255,106,0,.07); color: var(--emy-orange); }
        .nav-item svg { width: 34px; height: 34px; }
      }
      @media (max-width: 520px) {
        .shell { padding-left: 18px; padding-right: 18px; }
        .search-titlebar { margin-top: 8px; gap: 10px; }
        .search-heading h1 { font-size: 21px; }
        .search-heading p { display: none; }
        .search-command { padding: 7px; border-radius: 12px; }
        .tabs { gap: 4px; }
        .tab { min-height: 34px; padding: 0 12px; font-size: 12px; }
        .search-row { gap: 10px; }
        .grid { gap: 12px; }
        .media { height: 104px; margin: 8px 8px 0; }
        .search-business-profile-cover { min-height: 188px; }
        .search-business-profile-body { padding: 18px 16px 15px; }
        .search-business-profile-body h3 { font-size: 22px; }
        .search-business-profile-copy,
        .search-business-profile-status,
        .search-business-profile-address { font-size: 14px; }
      }
      @media (max-width: 390px) {
        .grid { grid-template-columns: 1fr; }
      }
`;
const customer_search_part_4 = String.raw`
    </style>
  </head>
  <body>
    <main class="page">
      <section class="shell" aria-label="EMY search">
${customerTopbarMarkup({
  avatarAttrs: 'data-avatar data-go-profile data-search-avatar',
  locationAttrs: 'data-location data-go-location',
  locationLabelAttrs: 'data-location-label data-search-location-label',
  searchAttrs: 'data-open-search data-search-action',
  notificationAttrs: 'data-notifications data-search-notifications aria-expanded="false"',
  notificationCountAttrs: 'data-notification-count data-search-notification-count'
})}
        <section class="notifications-panel" data-search-notification-panel aria-label="Notifications" aria-hidden="true">
          <header class="notifications-head">
            <h2>Notifications</h2>
            <button class="notifications-icon" type="button" data-search-notification-settings aria-label="Notification settings">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor"/><path d="M19.4 13.4a7.7 7.7 0 0 0 .05-2.7l2-1.45-2-3.45-2.4.95a8 8 0 0 0-2.3-1.35L14.4 3h-4.8l-.35 2.4a8 8 0 0 0-2.3 1.35l-2.4-.95-2 3.45 2 1.45a7.7 7.7 0 0 0 .05 2.7l-2.05 1.5 2 3.45 2.45-.98a7.7 7.7 0 0 0 2.25 1.28l.35 2.45h4.8l.35-2.45a7.7 7.7 0 0 0 2.25-1.28l2.45.98 2-3.45-2.05-1.5Z" stroke="currentColor" stroke-linejoin="round"/></svg>
            </button>
            <button class="notifications-icon" type="button" data-search-notification-close aria-label="Close notifications">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-linecap="round"/></svg>
            </button>
          </header>
          <div class="notifications-scroll" data-search-notification-list></div>
        </section>
        <section class="search-modal" data-search-profile-modal aria-hidden="true">
          <div class="search-card">
            <header class="search-card-head">
              <h2>Profile picture</h2>
              <button class="search-card-close" type="button" data-close-search-profile aria-label="Close profile picture">x</button>
            </header>
            <div class="search-profile-preview" data-search-profile-preview>S</div>
            <p>This is your customer profile image. Changes here stay connected to the customer home header.</p>
            <input data-search-profile-input type="file" accept="image/*" hidden />
            <div class="search-card-actions">
              <button class="primary" type="button" data-search-profile-new>New image</button>
              <button class="danger" type="button" data-search-profile-remove>Remove</button>
              <button type="button" data-close-search-profile>Cancel</button>
              <button type="button" data-search-profile-manage>Manage photo</button>
            </div>
          </div>
        </section>
        <section class="search-modal" data-search-profile-source-modal aria-hidden="true">
          <div class="search-card">
            <header class="search-card-head">
              <h2>Change profile photo</h2>
              <button class="search-card-close" type="button" data-search-profile-source-close aria-label="Close profile photo choices">x</button>
            </header>
            <p>Take a new picture now or choose one from your phone, laptop, or files.</p>
            <div class="search-photo-source-actions">
              <button type="button" data-search-profile-source="camera"><strong>Take picture</strong><span>Use your camera for a new customer profile photo.</span></button>
              <button type="button" data-search-profile-source="upload"><strong>Phone/laptop library</strong><span>Choose an existing photo from this device.</span></button>
            </div>
          </div>
        </section>
        <section class="search-modal" data-search-profile-camera-modal aria-hidden="true">
          <div class="search-card">
            <header class="search-card-head">
              <h2>Take profile photo</h2>
              <button class="search-card-close" type="button" data-search-profile-camera-cancel aria-label="Close camera">x</button>
            </header>
            <p>Allow camera access, then take a picture for your customer profile photo.</p>
            <div class="search-camera-frame">
              <video data-search-profile-camera-preview autoplay muted playsinline></video>
            </div>
            <p class="search-camera-status" data-search-profile-camera-status></p>
            <div class="search-card-actions">
              <button type="button" data-search-profile-camera-cancel>Cancel</button>
              <button class="primary" type="button" data-search-profile-camera-capture>Take picture</button>
            </div>
          </div>
        </section>
        <section class="search-modal" data-search-location-modal aria-hidden="true">
          <div class="location-sheet" aria-label="Select location">
            <div class="location-head">
              <div class="location-title">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" stroke="currentColor" stroke-linejoin="round"/><path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor"/></svg>
                <span>Select Location</span>
              </div>
              <div class="location-actions">
                <button class="location-add" type="button" data-search-location-add>Add +</button>
                <button class="location-close" type="button" data-close-search-location aria-label="Close location selector">x</button>
              </div>
            </div>
            <button class="location-current" type="button" data-search-current-location aria-pressed="false">
              <span class="location-current-copy">
                <strong data-search-location-title>Using Current Location</strong>
                <small data-search-location-detail>Detect your position for nearby businesses and posts.</small>
              </span>
              <span class="radio-dot" aria-hidden="true"></span>
            </button>
            <div class="current-radius" data-search-current-radius hidden>
              <div class="current-radius-head">
                <span>Distance radius from your current location</span>
                <strong data-search-radius-value>5 miles</strong>
              </div>
              <div class="radius-options compact" data-search-radius>
                <button type="button" data-radius="1">1 mi</button>
                <button type="button" data-radius="3">3 mi</button>
                <button type="button" data-radius="5">5 mi</button>
                <button type="button" data-radius="8">8 mi</button>
                <button type="button" data-radius="10">10 mi</button>
              </div>
            </div>
            <p class="location-empty">Saved coordinates help EMY show accurate businesses, products, and posts near you.</p>
            <div class="place-list" data-search-location-list></div>
            <p class="location-empty" data-search-location-empty>No saved locations yet. Click Add + to save Home, Office, or Other.</p>
            <form class="location-form" data-search-location-form>
              <div class="place-tabs" role="tablist" aria-label="Location type">
                <button class="is-active" type="button" data-search-place-tab="Home">Home</button>
                <button type="button" data-search-place-tab="Office">Office</button>
                <button type="button" data-search-place-tab="Other">Other</button>
              </div>
              <div class="location-search">
                <input class="location-field" data-search-place-input placeholder="Location*" autocomplete="off" aria-autocomplete="list" aria-expanded="false" />
                <div class="location-suggestions" data-search-place-suggestions hidden></div>
              </div>
              <p class="radius-title">Distance radius</p>
              <div class="radius-options" data-search-form-radius-options>
                <button type="button" data-radius="1">1</button>
                <button type="button" data-radius="3">3</button>
                <button class="is-active" type="button" data-radius="5">5</button>
                <button type="button" data-radius="8">8</button>
                <button type="button" data-radius="10">10</button>
              </div>
              <button class="location-submit" type="submit">Submit</button>
            </form>
            <p class="location-status" data-search-location-status></p>
          </div>
        </section>
        <header class="search-titlebar">
          <button class="icon-button" type="button" data-back aria-label="Back">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 19 8 12l7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="search-heading">
            <h1>Search</h1>
            <p>Find products, businesses, updates, articles, events, jobs, clips, and My Businesses.</p>
          </div>
          <span aria-hidden="true"></span>
        </header>

        <section class="search-command" aria-label="Search controls">
          <div class="tabs-wrap">
            <nav class="tabs" aria-label="Search type">
              <button class="tab is-active" type="button" data-tab="products">Products</button>
              <button class="tab" type="button" data-tab="business">Business</button>
              <button class="tab" type="button" data-tab="updates">Updates</button>
              <button class="tab" type="button" data-tab="articles">Articles</button>
              <button class="tab" type="button" data-tab="events">Events</button>
              <button class="tab" type="button" data-tab="jobs">Jobs</button>
              <button class="tab" type="button" data-tab="reels">Clips</button>
              <button class="tab" type="button" data-tab="following">My Businesses</button>
            </nav>
          </div>

          <div class="search-row">
            <label class="search-box">
              <input data-search-input type="search" placeholder="Search" autocomplete="off" />
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </label>
            <button class="filter-btn" type="button" data-open-filter aria-label="Open filters">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 7h8M17 7h2M9 17h10M5 17h2M12 7a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" stroke="currentColor" stroke-linecap="round"/></svg>
            </button>
          </div>
        </section>

        <div class="result-head">
          <span>
            <h2 data-results-title>Products</h2>
            <p data-results-copy>Search products listed by local businesses.</p>
          </span>
          <span class="active-filter" data-active-filter></span>
        </div>

        <section class="results" data-results></section>
        <p class="empty" data-empty>No results match your search yet.</p>
      </section>
`;
const customer_search_part_5 = String.raw`
      <div class="toast" data-toast role="status" aria-live="polite"></div>

      <nav class="bottom-nav" aria-label="Customer navigation">
        <button class="nav-item is-active" type="button" data-nav="home" data-tip="Local feed">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5V20H6v-6h12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Home</span>
        </button>
        <button class="nav-item" type="button" data-nav="nearby" data-tip="Businesses close to you">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" stroke="currentColor" stroke-linejoin="round"/><path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor"/></svg>
          <span>Nearby</span>
        </button>
        <button class="nav-item" type="button" data-nav="feeds" data-tip="Product and posts">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z" stroke="currentColor" stroke-linejoin="round"/></svg>
          <span>Feeds</span>
        </button>
        <button class="nav-item" type="button" data-nav="reels" data-tip="Short videos">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 7h14v12H5V7Zm3-4 2 4m4-4 2 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Clips</span>
        </button>
        <button class="nav-item" type="button" data-nav="uploads" data-tip="Upload status">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V5m0 0 4 4m-4-4-4 4M5 19h14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Uploads</span>
        </button>
        <button class="nav-item" type="button" data-nav="profile" data-tip="Your account">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-linecap="round"/></svg>
          <span>Profile</span>
        </button>
        <button class="nav-item" type="button" data-nav="chat" data-tip="Messages">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5.5h14v10.7H9.2L5 19.5v-14Z" stroke="currentColor" stroke-linejoin="round"/><path d="M9 10.8h.01M12 10.8h.01M15 10.8h.01" stroke="currentColor" stroke-linecap="round" stroke-width="2.6"/></svg>
          <span>Chat</span>
        </button>
        <button class="nav-item nav-item-ask" type="button" data-nav="ask" data-tip="AI helper">
          <span class="ask-emy-bubble">Hi, I'm EMY. Let me help you find what you need.</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/><path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/><path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/><path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/></svg>
          <span>Ask EMY</span>
        </button>
      </nav>

      <section class="filter-view" data-filter-view aria-hidden="true">
        <div class="filter-shell">
          <header class="filter-top">
            <button class="icon-button" type="button" data-close-filter aria-label="Back to search">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 19 8 12l7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <h2>Filter</h2>
            <span aria-hidden="true"></span>
          </header>
          <div class="filter-fields" data-filter-fields></div>
          <div class="filter-actions">
            <button class="reset-btn" type="button" data-reset-filter>Reset</button>
            <button class="apply-btn" type="button" data-apply-filter>Apply</button>
          </div>
        </div>
      </section>
    </main>
    <script>
      (function () {
`;
const customer_search_part_6 = String.raw`
        const tabs = Array.from(document.querySelectorAll("[data-tab]"));
        const results = document.querySelector("[data-results]");
        const title = document.querySelector("[data-results-title]");
        const copy = document.querySelector("[data-results-copy]");
        const empty = document.querySelector("[data-empty]");
        const searchInput = document.querySelector("[data-search-input]");
        const filterView = document.querySelector("[data-filter-view]");
        const filterFields = document.querySelector("[data-filter-fields]");
        const activeFilter = document.querySelector("[data-active-filter]");
        const headerAvatar = document.querySelector("[data-search-avatar]");
        const firstNameLabel = document.querySelector("[data-first-name]");
        const headerLocationButton = document.querySelector("[data-go-location]");
        const headerLocationLabel = document.querySelector("[data-search-location-label]");
        const notificationButton = document.querySelector("[data-search-notifications]");
        const notificationCount = document.querySelector("[data-search-notification-count]");
        const notificationPanel = document.querySelector("[data-search-notification-panel]");
        const notificationList = document.querySelector("[data-search-notification-list]");
        const notificationClose = document.querySelector("[data-search-notification-close]");
        const notificationSettings = document.querySelector("[data-search-notification-settings]");
        const profileModal = document.querySelector("[data-search-profile-modal]");
        const profilePreview = document.querySelector("[data-search-profile-preview]");
        const profileInput = document.querySelector("[data-search-profile-input]");
        const profileNew = document.querySelector("[data-search-profile-new]");
        const profileRemove = document.querySelector("[data-search-profile-remove]");
        const profileManage = document.querySelector("[data-search-profile-manage]");
        const profileSourceModal = document.querySelector("[data-search-profile-source-modal]");
        const profileSourceClose = document.querySelector("[data-search-profile-source-close]");
        const profileSourceButtons = Array.from(document.querySelectorAll("[data-search-profile-source]"));
        const profileCameraModal = document.querySelector("[data-search-profile-camera-modal]");
        const profileCameraPreview = document.querySelector("[data-search-profile-camera-preview]");
        const profileCameraStatus = document.querySelector("[data-search-profile-camera-status]");
        const profileCameraCancelButtons = Array.from(document.querySelectorAll("[data-search-profile-camera-cancel]"));
        const profileCameraCapture = document.querySelector("[data-search-profile-camera-capture]");
        const locationModal = document.querySelector("[data-search-location-modal]");
        const locationTitle = document.querySelector("[data-search-location-title]");
        const locationDetail = document.querySelector("[data-search-location-detail]");
        const currentRadius = document.querySelector("[data-search-current-radius]");
        const locationRadiusValue = document.querySelector("[data-search-radius-value]");
        const locationCurrentButton = document.querySelector("[data-search-current-location]");
        const locationList = document.querySelector("[data-search-location-list]");
        const locationEmpty = document.querySelector("[data-search-location-empty]");
        const locationForm = document.querySelector("[data-search-location-form]");
        const placeTabs = Array.from(document.querySelectorAll("[data-search-place-tab]"));
        const placeInput = document.querySelector("[data-search-place-input]");
        const placeSuggestions = document.querySelector("[data-search-place-suggestions]");
        const locationStatus = document.querySelector("[data-search-location-status]");
        const locationAdd = document.querySelector("[data-search-location-add]");
        const toast = document.querySelector("[data-toast]");
        const radiusButtons = Array.from(document.querySelectorAll("[data-search-radius] [data-radius]"));
        const formRadiusButtons = Array.from(document.querySelectorAll("[data-search-form-radius-options] [data-radius]"));
        const requestedSearchTab = String(window.location.hash || "").replace("#", "");
        const searchTabs = ["products", "business", "updates", "articles", "events", "jobs", "reels", "following"];
        let activeTab = searchTabs.includes(requestedSearchTab) ? requestedSearchTab : "products";
        const searchUrlParams = new URLSearchParams(window.location.search || "");
        const seededSearchQuery = String(searchUrlParams.get("business") || searchUrlParams.get("destination") || searchUrlParams.get("q") || "").trim();
        if (searchInput && seededSearchQuery) searchInput.value = seededSearchQuery;
        if (searchUrlParams.get("map") === "1") {
          try {
            localStorage.setItem("emyAskMapRoute", JSON.stringify({
              business: searchUrlParams.get("business") || "",
              origin: searchUrlParams.get("origin") || "",
              destination: searchUrlParams.get("destination") || "",
              latitude: searchUrlParams.get("lat") || "",
              longitude: searchUrlParams.get("lng") || "",
              openedAt: new Date().toISOString()
            }));
          } catch (error) {}
        }
        let activeReelType = "normal";
        let filterState = {};
        const customerPendingSignupPhoto = () => String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase() === "customer" ? (localStorage.getItem("emyMainPendingSignupPhoto") || localStorage.getItem("emyMainPendingSignupPhotoSrc") || "") : "";
        const customerPendingSignupCrop = () => !String(localStorage.getItem("emyMainSignedInRole") || "").trim() && String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase() === "customer" ? readJson("emyMainPendingSignupPhotoCrop", defaultCrop()) : defaultCrop();
        function searchCustomerProfileObjects() {
          const rows = [];
          ["emyCustomerProfile", "emyCustomerProfileDraft", "emyCustomerProfileData", "emyCurrentCustomerProfile", "emyFirebaseCustomerProfile", "emyCustomerAccount", "emyAskCurrentUser", "emyMainSignedInUser", "emyAuthUser", "emyFirebaseUser"].forEach((key) => {
            const value = readJson(key, null);
            if (value && typeof value === "object" && !Array.isArray(value)) rows.push(value);
          });
          rows.slice().forEach((item) => {
            ["profile", "customer", "user", "account", "data"].forEach((key) => {
              const nested = item && item[key];
              if (nested && typeof nested === "object" && !Array.isArray(nested)) rows.push(nested);
            });
          });
          return rows;
        }
        function searchCustomerProfileObjectValues(fields) {
          const values = [];
          searchCustomerProfileObjects().forEach((item) => fields.forEach((field) => values.push(item && item[field])));
          return values;
        }
        function searchFirstProfileMedia(values) {
          for (const value of values) {
            const next = String(value || "").trim();
            if (next && !/images\.unsplash|placeholder|avatar-placeholder|demo|stock|sample|lorem|faker|dummy|randomuser|pravatar|thispersondoesnotexist|ui-avatars|dicebear|robohash|gravatar/i.test(next) && next.indexOf("data:image/svg+xml") !== 0) return next;
          }
          return "";
        }
        const customerProfilePhotoFromStorage = () => searchFirstProfileMedia([
          localStorage.getItem("emyCustomerProfilePhoto"),
          localStorage.getItem("emyCustomerProfilePhotoSrc"),
          localStorage.getItem("emyCustomerProfileImage"),
          localStorage.getItem("emyCustomerProfileImageSrc"),
          localStorage.getItem("emyCustomerAvatar"),
          localStorage.getItem("emyCustomerAvatarSrc"),
          localStorage.getItem("emyCustomerPhoto"),
          localStorage.getItem("emyCustomerPhotoSrc"),
          localStorage.getItem("emyCustomerProfilePhotoBackup"),
          localStorage.getItem("emyCustomerProfilePhotoSrcBackup"),
          localStorage.getItem("emyMainSignedInPhoto"),
          localStorage.getItem("emyMainSignedInPhotoUrl"),
          localStorage.getItem("emyFirebasePhotoURL"),
          localStorage.getItem("emyFirebasePhotoUrl"),
          localStorage.getItem("emyFirebaseUserPhoto"),
          localStorage.getItem("emyAuthPhotoURL")
        ].concat(searchCustomerProfileObjectValues(["photoUrl", "photoURL", "photo", "photoSrc", "profilePhoto", "profilePhotoSrc", "profileImage", "profileImageSrc", "avatar", "avatarSrc", "image", "imageSrc"])).concat([customerPendingSignupPhoto()]));
        const syncCustomerProfilePhotoAliases = (photo) => {
          const nextPhoto = String(photo || "");
          const photoKeys = ["emyCustomerProfilePhoto", "emyCustomerProfilePhotoSrc", "emyCustomerProfileImage", "emyCustomerProfileImageSrc", "emyCustomerAvatar", "emyCustomerAvatarSrc", "emyCustomerPhoto", "emyCustomerPhotoSrc"];
          if (nextPhoto) {
            photoKeys.forEach((key) => localStorage.setItem(key, nextPhoto));
            if (!/^blob:/i.test(nextPhoto) && !(/^data:image\//i.test(nextPhoto) && nextPhoto.length > 180000)) {
              localStorage.setItem("emyCustomerProfilePhotoBackup", nextPhoto);
              localStorage.setItem("emyCustomerProfilePhotoSrcBackup", nextPhoto);
              localStorage.setItem("emyCustomerProfilePhotoBackupSavedAt", new Date().toISOString());
            }
          } else photoKeys.forEach((key) => localStorage.removeItem(key));
        };
        let currentProfilePhoto = customerProfilePhotoFromStorage();
        if (currentProfilePhoto) {
          try { syncCustomerProfilePhotoAliases(currentProfilePhoto); } catch (error) {}
        }
        let currentProfileCrop = readJson("emyCustomerProfilePhotoCrop", customerPendingSignupCrop());
        let activeSearchLocation = readJson("emyAskLocation", {});
        let draftSearchLocation = {};
        let draftSearchRadius = Number(activeSearchLocation.radius) || 5;
        let searchApplyingOwnLocationEvent = false;
        let searchLocationOptions = [];
        let searchPlaces = [];
        let activePlaceLabel = "Home";
        let editingPlaceId = "";
        let suggestionTimer = null;
        let toastTimer = null;
        let suggestionRequestId = 0;
        let currentPlaceSuggestions = [];
        let selectedPlaceSuggestion = null;
        let searchProfileCameraStream = null;

        const tabMeta = {
          products: ["Products", "Products near your saved location and from My Businesses."],
          business: ["Business", "Find businesses near your saved location."],
          updates: ["Updates", "Search photo, video and text updates from businesses and profiles."],
          articles: ["Articles", "Search published articles from the platform."],
          events: ["Events", "Search posted events and local activities."],
          jobs: ["Jobs", "Search jobs posted by businesses and profiles."],
          reels: ["Clips", "Search business clips and product clips."],
          following: ["My Businesses", "Businesses and profiles where you are a customer."]
        };

        const data = {
          products: [
            { type: "product", category: "Homeware", subCategory: "Bottles", price: "mid", title: "Steel Water Bottle", description: "500 ml Steel bottle", priceText: "£ 200.00", media: "bottle", source: "nearby", likes: 12, saved: 4, search: "steel water bottle 500 ml steel bottle near location" },
            { type: "product", category: "Food", subCategory: "Pizza", price: "mid", title: "Pizza", description: "Pizza slice", priceText: "£ 250.00", media: "pizza", source: "customer", likes: 9, saved: 3, businessName: "Angi Pizza Zone", search: "pizza pizza slice food customer angi pizza zone" },
            { type: "product", category: "Beauty", subCategory: "Skincare", price: "mid", title: "Ever Glow Face Wash", description: "Beauty product nearby", priceText: "£ 18.00", media: "shop", source: "customer", likes: 18, saved: 7, businessName: "Ever Glow Face Wash", search: "ever glow face wash beauty skincare customer" },
            { type: "product", category: "Homeware", subCategory: "Bottles", price: "mid", title: "Travel Mug", description: "Insulated coffee cup", priceText: "£ 14.00", media: "bottle", source: "nearby", likes: 6, saved: 2, search: "travel mug steel insulated coffee near location" },
            { type: "product", category: "Food", subCategory: "Pizza", price: "low", title: "Garlic Bread", description: "Warm side with product details", priceText: "£ 4.50", media: "pizza", source: "customer", likes: 7, saved: 2, businessName: "Angi Pizza Zone", search: "garlic bread pizza side food customer angi pizza zone" },
            { type: "product", category: "Beauty", subCategory: "Skincare", price: "mid", title: "Glow Serum", description: "Light daily serum", priceText: "£ 24.00", media: "shop", source: "customer", likes: 15, saved: 5, businessName: "Ever Glow Face Wash", search: "glow serum beauty skincare customer ever glow" },
            { type: "product", category: "Technology", subCategory: "Home Office", price: "mid", title: "Desk Lamp", description: "Compact work light", priceText: "£ 32.00", media: "keyboard", source: "nearby", likes: 4, saved: 1, search: "desk lamp home office tech near location" },
            { type: "product", category: "Beauty", subCategory: "Skincare", price: "mid", title: "Soft Cleanser", description: "Gentle cleanser in stock", priceText: "£ 12.00", media: "shop", source: "customer", likes: 11, saved: 4, businessName: "Ever Glow Face Wash", search: "soft cleanser skincare beauty customer ever glow" },
            { type: "product", category: "Technology", subCategory: "Home Office", price: "low", title: "Phone Stand", description: "Desk accessory", priceText: "£ 9.00", media: "keyboard", source: "nearby", likes: 3, saved: 1, search: "phone stand desk tech accessory near location" },
            { type: "product", category: "Homeware", subCategory: "Food Storage", price: "mid", title: "Lunch Box", description: "Steel food container", priceText: "£ 16.00", media: "bottle", source: "nearby", likes: 5, saved: 2, search: "lunch box steel food container near location" },
            { type: "product", category: "Food", subCategory: "Pizza", price: "mid", title: "Family Pizza", description: "Large pizza for sharing", priceText: "£ 18.00", media: "pizza", source: "customer", likes: 14, saved: 6, businessName: "Angi Pizza Zone", search: "family pizza large local food customer angi pizza zone" },
            { type: "product", category: "Homeware", subCategory: "Bags", price: "low", title: "Reusable Tote", description: "Local shop bag", priceText: "£ 7.00", media: "shop", source: "nearby", likes: 2, saved: 1, search: "reusable tote bag local shop near location" }
          ],
          business: [],
          posts: [
            { type: "post", category: "Food", date: "recent", popularity: "popular", title: "pizza", description: "we delivered best pizza with 50% discount.", dateText: "11 February 2026", likes: 6, media: "pizza", search: "pizza delivered discount food" },
            { type: "post", category: "Technology", date: "recent", popularity: "new", title: "Feed post", description: "Steel business feed post", dateText: "27 April 2026", likes: 0, media: "keyboard", search: "feed post steel business" },
            { type: "post", category: "Products", date: "older", popularity: "popular", title: "teet", description: "products", dateText: "20 March 2026", likes: 4, media: "bottle", search: "teet products" },
            { type: "post", category: "Products", date: "older", popularity: "popular", title: "Bottle", description: "Plastic bottle made with hard Plastic.", dateText: "10 February 2026", likes: 9, media: "clear-bottle", search: "bottle plastic bottle" }
          ],
          reels: [
            { type: "reel", reelType: "normal", category: "Food", date: "older", title: "Pizza with chilli", description: "A quick kitchen clip from Angi Pizza Zone.", dateText: "11 February 2026", likes: 5, viewsText: "126 views", businessName: "Angi Pizza Zone", media: "reel-a", search: "pizza with chilli business clip video angi pizza zone" },
            { type: "reel", reelType: "normal", category: "Business", date: "recent", title: "Good day", description: "Happy Working Day from business 111.", dateText: "27 April 2026", likes: 1, viewsText: "42 views", businessName: "business 111", media: "reel-b", search: "good day happy working day business clip video" },
            { type: "reel", reelType: "product", category: "Products", date: "older", title: "Steel Water Bottle", description: "Short product clip with the bottle details.", dateText: "03 April 2026", likes: 0, viewsText: "18 views", businessName: "business 111", productName: "Steel Water Bottle", productInfo: "500 ml steel bottle", priceText: "£ 200.00", media: "bottle", search: "product clip steel water bottle 500 ml 200" },
            { type: "reel", reelType: "product", category: "Products", date: "older", title: "Pizza Slice", description: "A short product clip with product details.", dateText: "03 April 2026", likes: 0, viewsText: "31 views", businessName: "Angi Pizza Zone", productName: "Pizza Slice", productInfo: "Fresh slice with clear product details", priceText: "£ 250.00", media: "pizza", search: "product clip pizza slice price food" }
          ],
          following: []
        };

        const filters = {
          products: [
            ["category", "Categories", "Select your categories", [["", "All categories"], ["Food", "Food"], ["Homeware", "Homeware"], ["Beauty", "Beauty"], ["Technology", "Technology"]]],
            ["subCategory", "Sub Categories", "Select your categories", [["", "All sub categories"], ["Pizza", "Pizza"], ["Bottles", "Bottles"], ["Skincare", "Skincare"], ["Home Office", "Home Office"], ["Food Storage", "Food Storage"], ["Bags", "Bags"]]],
            ["price", "Price", "Select your price", [["", "Any price"], ["low", "Under £10"], ["mid", "£10 to £500"], ["high", "Over £500"]]]
          ],
          business: [
            ["category", "Categories", "Select your categories", [["", "All categories"], ["Food", "Food"], ["Beauty", "Beauty"], ["Technology", "Technology"], ["Retail", "Retail"], ["Customer", "Customer"]]],
            ["distance", "Distance", "Select your distance", [["", "Any distance"], ["1", "Within 1 mile"], ["3", "Within 3 miles"], ["5", "Within 5 miles"]]],
            ["status", "Status", "Select your status", [["", "Any status"], ["open", "Opened"], ["closed", "Closed"]]]
          ],
          updates: [
            ["category", "Categories", "Select your categories", [["", "All updates"], ["Post", "Posts"], ["Photo", "Photo"], ["Video", "Video"], ["Food", "Food"], ["Technology", "Technology"], ["Products", "Products"]]],
            ["date", "Date", "Select date", [["", "Any date"], ["recent", "Recent"], ["older", "Older updates"]]],
            ["popularity", "Popularity", "Select popularity", [["", "Any popularity"], ["popular", "Most liked"], ["new", "Newest"]]]
          ],
          articles: [
            ["category", "Categories", "Select your categories", [["", "All articles"], ["Article", "Article"], ["Food", "Food"], ["Technology", "Technology"], ["Products", "Products"]]],
            ["date", "Date", "Select date", [["", "Any date"], ["recent", "Recent"], ["older", "Older articles"]]],
            ["popularity", "Popularity", "Select popularity", [["", "Any popularity"], ["popular", "Most liked"], ["new", "Newest"]]]
          ],
          events: [
            ["category", "Categories", "Select your categories", [["", "All events"], ["Event", "Event"], ["In person", "In person"], ["Online", "Online"], ["Food", "Food"], ["Business", "Business"]]],
            ["date", "Date", "Select date", [["", "Any date"], ["recent", "Recent"], ["older", "Older events"]]]
          ],
          jobs: [
            ["category", "Categories", "Select your categories", [["", "All jobs"], ["Job", "Job"], ["Full-time", "Full-time"], ["Part-time", "Part-time"], ["Contract", "Contract"], ["Flexible", "Flexible"]]],
            ["date", "Date", "Select date", [["", "Any date"], ["recent", "Recent"], ["older", "Older jobs"]]]
          ],
          reels: [
            ["reelType", "Clip type", "Select clip type", [["", "All clips"], ["normal", "Business Clip"], ["product", "Product Clip"]]],
            ["category", "Categories", "Select your categories", [["", "All categories"], ["Food", "Food"], ["Business", "Business"], ["Products", "Products"]]],
            ["date", "Date", "Select date", [["", "Any date"], ["recent", "Recent"], ["older", "Older clips"]]]
          ],
          following: [
            ["category", "Categories", "Select your categories", [["", "All categories"], ["Health", "Health"], ["Food", "Food"], ["Technology", "Technology"], ["Retail", "Retail"], ["Customer", "Customer"]]],
            ["distance", "Distance", "Select your distance", [["", "Any distance"], ["1", "Within 1 mile"], ["3", "Within 3 miles"], ["5", "Within 5 miles"]]],
            ["status", "Status", "Select your status", [["", "Any status"], ["open", "Opened"], ["closed", "Closed"]]]
          ]
        };

        function escapeHtml(value) {
          return String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
        }

        function defaultCrop() {
          return { zoom: 100, x: 50, y: 50 };
        }

        function normaliseCrop(crop) {
          const zoom = Math.min(260, Math.max(100, Number(crop && crop.zoom) || 100));
          const x = Math.min(100, Math.max(0, Number(crop && crop.x) || 50));
          const y = Math.min(100, Math.max(0, Number(crop && crop.y) || 50));
          return { zoom, x, y };
        }

        function applyCropStyle(image, crop) {
          const clean = normaliseCrop(crop);
          const overflow = clean.zoom - 100;
          image.style.objectFit = "cover";
          image.style.objectPosition = clean.x + "% " + clean.y + "%";
          image.style.transform = "none";
          image.style.width = clean.zoom + "%";
          image.style.height = clean.zoom + "%";
          image.style.left = (-overflow * (clean.x / 100)).toFixed(3) + "%";
          image.style.top = (-overflow * (clean.y / 100)).toFixed(3) + "%";
          image.style.right = "auto";
          image.style.bottom = "auto";
        }

        function readJson(key, fallback) {
          try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : fallback;
          } catch (error) {
            return fallback;
          }
        }
        function searchBusinessKey(value) {
          return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        }
        function searchBusinessKeyCandidates(item) {
          const row = item || {};
          const original = row.original && typeof row.original === "object" ? row.original : {};
          const values = [
            row.businessKey,
            row.ownerBusinessKey,
            row.ownerKey,
            row.profileKey,
            row.detailBusinessKey,
            row.businessName,
            row.business,
            row.actorBusiness,
            row.actorName,
            row.actor,
            row.ownerName,
            row.authorName,
            row.createdByName,
            row.repostedByName,
            original.businessKey,
            original.ownerKey,
            original.profileKey,
            original.detailBusinessKey,
            original.businessName,
            original.business,
            original.actorName,
            original.actor,
            row.key,
            row.name,
            row.title
          ];
          const seen = new Set();
          const keys = [];
          values.forEach((value) => {
            const key = searchBusinessKey(value);
            if (!key || seen.has(key)) return;
            seen.add(key);
            keys.push(key);
          });
          return keys;
        }
        function searchBusinessKeysOverlap(left, right) {
          return (left || []).some((leftKey) => (right || []).some((rightKey) => {
            if (!leftKey || !rightKey) return false;
            if (leftKey === rightKey) return true;
            return leftKey.length > 4 && rightKey.length > 4 && (leftKey.indexOf(rightKey) >= 0 || rightKey.indexOf(leftKey) >= 0);
          }));
        }
        function searchBusinessKeySetHasAny(keys, item) {
          if (!keys || !item) return false;
          return searchBusinessKeyCandidates(item).some((key) => keys.has(key));
        }
        function searchBusinessRemovedFakeKey(value) {
          const key = searchBusinessKey(value);
          return ["angi-pizza", "angi-pizza-zone", "ever-glow", "ever-glow-face-wash", "business-111", "ross-galler", "packly-supplies", "ridge-hardware"].includes(key);
        }
        function searchBusinessLooksSampleName(value) {
          return searchBusinessRemovedFakeKey(value);
        }
        function addSearchCustomerBusinessKey(keys, value) {
          const key = searchBusinessKey(value);
          if (!key || searchBusinessRemovedFakeKey(key)) return;
          keys.add(key);
          if (key === "angi-pizza-zone") keys.add("angi-pizza");
          if (key === "angi-pizza") keys.add("angi-pizza-zone");
          if (key === "ever-glow-face-wash") keys.add("ever-glow");
          if (key === "ever-glow") keys.add("ever-glow-face-wash");
        }
        function searchCustomerBusinessKeys() {
          const keys = new Set();
          const stored = readJson("emyCustomerBusinesses", {});
          Object.keys(stored || {}).forEach((storageKey) => {
            const item = stored[storageKey] || {};
            const key = item.key || item.businessKey || storageKey;
            if (key && localStorage.getItem("emyCustomerBusiness:" + key) === "0") return;
            if (item.active === false || item.isCustomer === false) return;
            searchBusinessKeyCandidates(Object.assign({}, item, { storageKey })).forEach((keyName) => addSearchCustomerBusinessKey(keys, keyName));
          });
          try {
            for (let index = 0; index < localStorage.length; index += 1) {
              const storageKey = localStorage.key(index) || "";
              if (storageKey.indexOf("emyCustomerBusiness:") !== 0) continue;
              if (localStorage.getItem(storageKey) === "1") addSearchCustomerBusinessKey(keys, storageKey.slice("emyCustomerBusiness:".length));
            }
          } catch (error) {}
          const followed = readJson("emyCustomerFollowing", []);
          (Array.isArray(followed) ? followed : []).forEach((entry) => {
            if (typeof entry === "string") {
              addSearchCustomerBusinessKey(keys, entry);
              return;
            }
            if (!entry || typeof entry !== "object") return;
            [entry.key, entry.businessKey, entry.customerKey, entry.profileKey, entry.slug, entry.id, entry.name, entry.title, entry.displayName].forEach((value) => addSearchCustomerBusinessKey(keys, value));
          });
          try {
            for (let index = 0; index < localStorage.length; index += 1) {
              const storageKey = localStorage.key(index) || "";
              if (storageKey.indexOf("emyCustomerFollow:") !== 0) continue;
              if (localStorage.getItem(storageKey) === "1") addSearchCustomerBusinessKey(keys, storageKey.slice("emyCustomerFollow:".length));
            }
          } catch (error) {}
          return keys;
        }
        function searchCustomerBusinessFallbackName(value) {
          const text = String(value || "").replace(/[^a-z0-9]+/gi, " ").replace(/\s+/g, " ").trim();
          if (!text) return "Business";
          return text.replace(/\b[a-z]/g, (char) => char.toUpperCase());
        }
        function searchKnownCustomerBusinessItem(value) {
          const key = searchBusinessKey(value);
          if (!key) return null;
          const pools = [];
          try { pools.push(...homeBusinessRowsForSearch()); } catch (error) {}
          try { pools.push(...searchStoredBusinessProfileItems()); } catch (error) {}
          try { pools.push(...(data.business || [])); } catch (error) {}
          try { pools.push(...(data.following || [])); } catch (error) {}
          try {
            const activeProfile = activeBusinessProfileSearchItem();
            if (activeProfile) pools.unshift(activeProfile);
          } catch (error) {}
          if (["profile", "business", "business-profile", "your-business", "this-business"].includes(key)) {
            return pools.find((item) => item && (item.explicitBusinessProfile === true || item.isBusinessProfile === true || item.key || item.businessKey) && !searchBusinessLooksGenericText(item.title || item.name || item.business)) || null;
          }
          return pools.filter(Boolean).find((item) => searchBusinessKeysOverlap([key], searchBusinessKeyCandidates(item))) || null;
        }
        function searchCustomerBusinessFlagIsRemoved(value) {
          const raw = String(value || "");
          const key = searchBusinessKey(raw);
          try {
            return localStorage.getItem("emyCustomerBusiness:" + raw) === "0" || localStorage.getItem("emyCustomerBusiness:" + key) === "0";
          } catch (error) {
            return false;
          }
        }
        function searchNormaliseCustomerBusinessRow(item, storageKey) {
          const source = item && typeof item === "object" && !Array.isArray(item) ? item : {};
          const rawKey = source.key || source.businessKey || source.profileKey || source.id || source.uid || storageKey || source.name || source.title || "";
          const known = searchKnownCustomerBusinessItem(rawKey) || {};
          const rawSlug = searchBusinessKey(rawKey);
          const rawIsGenericProfile = ["profile", "business", "business-profile", "your-business", "this-business"].includes(rawSlug);
          const sourceTitle = String(source.name || source.title || source.business || source.businessName || "").trim();
          const knownTitle = String(known.name || known.title || known.business || known.businessName || "").trim();
          const title = (rawIsGenericProfile && knownTitle ? knownTitle : sourceTitle || knownTitle || searchCustomerBusinessFallbackName(rawKey)).trim();
          const key = searchBusinessKey(rawIsGenericProfile ? (known.key || known.businessKey || known.profileKey || knownTitle || rawKey || title) : (source.key || source.businessKey || known.key || known.businessKey || rawKey || title));
          return Object.assign({}, known, source, {
            type: "business",
            key,
            businessKey: key,
            name: title,
            title,
            business: source.business || known.business || title,
            active: source.active !== false && known.active !== false,
            isCustomer: source.isCustomer !== false,
            customer: true,
            tag: source.tag || known.tag || "Customer"
          });
        }
        function readCustomerBusinesses() {
          const stored = readJson("emyCustomerBusinesses", {});
          const rows = new Map();
          const add = (item, storageKey) => {
            const row = searchNormaliseCustomerBusinessRow(item, storageKey);
            const key = searchBusinessKey(row.key || row.businessKey || row.name || row.title || storageKey);
            if (!key || !row.name) return;
            if (searchCustomerBusinessFlagIsRemoved(row.key) || searchCustomerBusinessFlagIsRemoved(key)) return;
            if (row.active === false || row.isCustomer === false) return;
            if (searchBusinessLooksSampleName(row.key) || searchBusinessLooksSampleName(row.name || row.title || row.business) || searchBusinessRemovedFakeKey(row.key || row.businessKey || row.name || row.title || row.business)) return;
            rows.set(key, row);
          };
          if (Array.isArray(stored)) {
            stored.forEach((item, index) => add(item, item && (item.key || item.businessKey || item.name || item.title) || "customer-business-" + index));
          } else {
            Object.keys(stored || {}).forEach((storageKey) => {
              const item = stored[storageKey];
              add(item && typeof item === "object" ? item : { key: storageKey, businessKey: storageKey }, storageKey);
            });
          }
          try {
            for (let index = 0; index < localStorage.length; index += 1) {
              const storageKey = localStorage.key(index) || "";
              if (storageKey.indexOf("emyCustomerBusiness:") !== 0) continue;
              if (localStorage.getItem(storageKey) !== "1") continue;
              const key = storageKey.slice("emyCustomerBusiness:".length);
              const normalised = searchBusinessKey(key);
              if (normalised && !rows.has(normalised)) add({ key, businessKey: key, active: true, isCustomer: true }, key);
            }
          } catch (error) {}
          const followed = readJson("emyCustomerFollowing", []);
          (Array.isArray(followed) ? followed : []).forEach((entry, index) => {
            if (typeof entry === "string") {
              const key = searchBusinessKey(entry);
              if (key && !rows.has(key)) add({ key: entry, businessKey: entry, active: true, isCustomer: true, following: true }, entry);
              return;
            }
            if (!entry || typeof entry !== "object") return;
            const key = searchBusinessKey(entry.key || entry.businessKey || entry.customerKey || entry.profileKey || entry.slug || entry.id || entry.name || entry.title || entry.displayName || "followed-business-" + index);
            if (key && !rows.has(key)) add(Object.assign({ active: true, isCustomer: true, following: true }, entry), key);
          });
          try {
            for (let index = 0; index < localStorage.length; index += 1) {
              const storageKey = localStorage.key(index) || "";
              if (storageKey.indexOf("emyCustomerFollow:") !== 0) continue;
              if (localStorage.getItem(storageKey) !== "1") continue;
              const key = storageKey.slice("emyCustomerFollow:".length);
              const normalised = searchBusinessKey(key);
              if (normalised && !rows.has(normalised)) add({ key, businessKey: key, active: true, isCustomer: true, following: true }, key);
            }
          } catch (error) {}
          return Array.from(rows.values());
        }
        function searchCurrentBusinessAliases() {
          const draft = readJson("emyBusinessProfileDraft", {});
          const values = [
            draft && draft.businessKey,
            draft && draft.key,
            draft && draft.businessName,
            draft && draft.name,
            draft && draft.title,
            localStorage.getItem("emyBusinessProfileKey"),
            localStorage.getItem("emyBusinessKey"),
            localStorage.getItem("emyBusinessDisplayName"),
            localStorage.getItem("emyBusinessName")
          ];
          return new Set(values.map(searchBusinessKey).filter(Boolean));
        }
        function searchCurrentBusinessHasProfile() {
          const draft = readJson("emyBusinessProfileDraft", {});
          return !!(localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessProfileKey") || draft && (draft.businessName || draft.name || draft.businessKey || draft.key || draft.isBusinessProfile === true || draft.profileType === "business"));
        }
        function searchItemIsCurrentBusiness(item) {
          if (!item || !searchCurrentBusinessHasProfile()) return false;
          const aliases = searchCurrentBusinessAliases();
          return searchBusinessKeyCandidates(item).some((key) => aliases.has(key));
        }
        function searchItemIsCustomerOwned(item) {
          if (!item) return false;
          const owner = String([item.owner, item.actorType, item.accountType, item.createdAs, item.authorRole].filter(Boolean).join(" ")).toLowerCase();
          const key = searchBusinessKey(item.key || item.businessKey || item.profileKey || item.ownerKey || "");
          const href = String(item.profileHref || item.href || "").toLowerCase();
          return item.isUserPost === true || key === "customer-profile" || owner.indexOf("customer") >= 0 || href.indexOf("emy-customer-profile") >= 0;
        }
        function searchItemIsFollowedBusiness(item) {
          if (!item) return false;
          const keys = searchCustomerBusinessKeys();
          return searchBusinessKeySetHasAny(keys, item);
        }
        function searchLocationNeedsCoordinates(label) {
          const text = String(label || "").replace(/\s+/g, " ").trim();
          return !!text && !/^near\s*me$/i.test(text);
        }
        function searchActiveLocationState() {
          const ask = readJson("emyAskLocation", {});
          const latitude = Number(ask && ask.latitude);
          const longitude = Number(ask && ask.longitude);
          const radius = cleanRadius(ask && ask.radius);
          const active = Number.isFinite(latitude) && Number.isFinite(longitude) && (Math.abs(latitude) > 0.0001 || Math.abs(longitude) > 0.0001);
          const label = String((ask && (ask.location || ask.locationLabel)) || localStorage.getItem("emySelectedLocation") || "").trim();
          const strict = active || searchLocationNeedsCoordinates(label);
          return active ? { active: true, strict: true, latitude, longitude, radius } : { active: false, strict, latitude: null, longitude: null, radius };
        }
        function searchDirectLocationPoint(item) {
          if (!item || typeof item !== "object") return null;
          const latitude = Number([item.latitude, item.lat, item.businessLatitude, item.locationLatitude].find((value) => value !== undefined && value !== null && value !== ""));
          const longitude = Number([item.longitude, item.lng, item.lon, item.businessLongitude, item.locationLongitude].find((value) => value !== undefined && value !== null && value !== ""));
          if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
          if (Math.abs(latitude) < 0.0001 && Math.abs(longitude) < 0.0001) return null;
          return { latitude, longitude };
        }
        function searchKnownBusinessLocationRows() {
          const rows = [];
          try { rows.push(...readCustomerBusinesses()); } catch (error) {}
          try { rows.push(...businessSearchItems()); } catch (error) {}
          return rows;
        }
        function searchItemLocationPoint(item) {
          const direct = searchDirectLocationPoint(item);
          if (direct) return direct;
          const itemKeys = searchBusinessKeyCandidates(item);
          if (!itemKeys.length) return null;
          const rows = searchKnownBusinessLocationRows();
          for (let index = 0; index < rows.length; index += 1) {
            const row = rows[index] || {};
            if (!searchBusinessKeysOverlap(itemKeys, searchBusinessKeyCandidates(row))) continue;
            const point = searchDirectLocationPoint(row);
            if (point) return point;
          }
          return null;
        }
        function searchMilesBetween(lat1, lon1, lat2, lon2) {
          const radiusMiles = 3958.8;
          const toRadians = (value) => value * Math.PI / 180;
          const dLat = toRadians(lat2 - lat1);
          const dLon = toRadians(lon2 - lon1);
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          return radiusMiles * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
        }
        function searchItemInsideActiveRadius(item) {
          const state = searchActiveLocationState();
          if (!state.active) return !state.strict;
          const point = searchItemLocationPoint(item);
          if (!point) return false;
          return searchMilesBetween(state.latitude, state.longitude, point.latitude, point.longitude) <= state.radius;
        }
        function searchItemAllowedByActiveLocation(item, tab) {
          const state = searchActiveLocationState();
          if (!state.strict) return true;
          if (tab === "business") {
            if (!state.active) return false;
            return searchItemInsideActiveRadius(item);
          }
          if (tab === "following") return true;
          if (searchItemIsCustomerOwned(item)) return true;
          if (searchItemIsFollowedBusiness(item)) return true;
          if (!state.active) return false;
          return searchItemInsideActiveRadius(item);
        }
        function searchFilterByActiveLocation(items, tab) {
          return (items || []).filter((item) => searchItemAllowedByActiveLocation(item, tab));
        }
        function searchItemUsesRemovedFakeBusiness(item) {
          if (!item) return false;
          const values = [
            item.key,
            item.businessKey,
            item.businessName,
            item.business,
            item.name,
            item.title
          ];
          if (values.some((value) => searchBusinessRemovedFakeKey(value))) return true;
          const text = values.concat([item.search, item.description, item.productName]).join(" ").toLowerCase();
          return /angi\s+pizza|ever\s+glow|business\s*111|ross\s+galler|packly\s+supplies|ridge\s+hardware/.test(text);
        }
        function searchWithoutRemovedFakeBusinesses(items) {
          return (items || []).filter((item) => !searchItemUsesRemovedFakeBusiness(item));
        }
        function searchBusinessSubmissionSignal(draft) {
          const key = searchBusinessKey(draft && (draft.businessKey || draft.key || draft.businessName || draft.name) || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || "profile") || "profile";
          const decisions = readJson("emyBusinessReviewDecisions", {});
          const entry = decisions && typeof decisions === "object" ? (decisions[key] || decisions["business-profile-" + key] || decisions["business-profile:" + key]) : null;
          const decisionStatus = String(typeof entry === "string" ? entry : entry && entry.status || "").trim().toLowerCase();
          if (decisionStatus === "approved") return decisionStatus;
          const globalKey = searchBusinessKey(localStorage.getItem("emyBusinessReviewBusinessKey") || localStorage.getItem("emyBusinessApprovalBusinessKey") || localStorage.getItem("emyBusinessApprovedBusinessKey") || "");
          const reviewStatus = globalKey === key ? String(localStorage.getItem("emyBusinessReviewStatus") || "").trim().toLowerCase() : "";
          if (reviewStatus === "approved") return reviewStatus;
          const signal = [
            draft && draft.status,
            draft && draft.reviewStatus,
            draft && draft.approvedAt
          ].map((value) => String(value || "").trim()).find((value) => /^(approved|active|live)$/i.test(value) || /approved/i.test(value));
          return signal || "";
        }
        function searchBusinessProfileVisible(draft) {
          const profile = draft && typeof draft === "object" ? draft : {};
          const name = String(localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || profile.businessName || profile.name || "").trim();
          if (!name || /^(this|your)\s+business$/i.test(name)) return false;
          if (searchBusinessSubmissionSignal(profile)) return true;
          const detail = [
            profile.businessCategory,
            profile.category,
            profile.primarySector,
            profile.sector,
            profile.businessDescription,
            profile.description,
            profile.businessAddress,
            profile.businessAddressLine1,
            profile.address,
            profile.businessLocation,
            profile.location,
            profile.businessPostcode,
            profile.postcode,
            localStorage.getItem("emyBusinessProfilePhoto"),
            localStorage.getItem("emyBusinessProfilePhotoRef"),
            localStorage.getItem("emyBusinessRegistrationFromCustomer"),
            localStorage.getItem("emyBusinessReviewSubmittedAt")
          ].map((value) => String(value || "").trim()).find(Boolean);
          if (detail) return true;
          const library = readJson("emyBusinessMediaLibrary", readJson("emyBusinessCoverMedia", []));
          return Array.isArray(library) && library.length > 0;
        }
        function searchDirectMediaSrc(value) {
          const text = String(value || "").trim();
          return text.indexOf("data:image") === 0 || text.indexOf("data:video") === 0 || text.indexOf("blob:") === 0 || text.indexOf("http://") === 0 || text.indexOf("https://") === 0 ? text : "";
        }
        function searchDirectMediaRef(value) {
          const text = String(value || "").trim();
          if (!text || searchDirectMediaSrc(text)) return "";
          if (text.indexOf("emy-video-ref:") === 0) return text.slice("emy-video-ref:".length);
          if (text.indexOf("emy-ref:") === 0) return text.slice("emy-ref:".length);
          return text;
        }
        function searchMediaTypeFrom(value, fallback) {
          const text = String(value || fallback || "").trim().toLowerCase();
          if (text.indexOf("video") >= 0 || text.indexOf("clip") >= 0 || text.indexOf("reel") >= 0) return "video";
          if (text.indexOf("image") >= 0 || text.indexOf("photo") >= 0 || text.indexOf("logo") >= 0 || text.indexOf("cover") >= 0) return "image";
          return "";
        }
        function searchBusinessMediaSource(item, fallbackType) {
          const raw = item && typeof item === "object" ? item : {};
          const primitive = item && typeof item !== "object" ? String(item || "") : "";
          const type = searchMediaTypeFrom(raw.type || raw.kind || raw.mediaType || raw.coverType || raw.coverMediaType || raw.fileType || raw.mimeType || raw.contentType, fallbackType);
          const sourceSrc = searchDirectMediaSrc(primitive) ||
            searchDirectMediaSrc(raw.src || raw.url || raw.mediaSrc || raw.coverSrc || raw.cover || raw.video || raw.image || raw.thumbnail || raw.thumb || raw.posterSrc);
          const sourceRef = searchDirectMediaRef(raw.ref || raw.mediaRef || raw.coverRef || raw.coverMediaRef || raw.videoRef || raw.imageRef || raw.thumbnailRef || raw.thumbRef);
          const posterSrc = searchDirectMediaSrc(raw.posterSrc || raw.thumbnailSrc || raw.thumb || raw.image);
          const posterRef = searchDirectMediaRef(raw.posterRef || raw.thumbnailRef || raw.thumbRef);
          const mediaType = type || (sourceSrc.indexOf("data:video") === 0 || /\\.(mp4|webm|mov)(\\?|#|$)/i.test(sourceSrc) ? "video" : (sourceSrc || sourceRef ? "image" : ""));
          return sourceSrc || sourceRef ? {
            src: sourceRef ? "" : sourceSrc,
            ref: sourceRef,
            type: mediaType,
            posterSrc: posterRef ? "" : posterSrc,
            posterRef,
            settings: raw.mediaSettings || raw.coverSettings || null,
            crop: raw.crop || raw.coverCrop || null
          } : null;
        }
        function searchBusinessMediaCandidates(source) {
          if (!source || typeof source !== "object") return source ? [source] : [];
          const candidates = [];
          const push = (item) => { if (item) candidates.push(item); };
          push(source.cover);
          push(source.heroCoverMedia);
          push(source.businessHeroCoverMedia);
          push(source.profileCoverMedia);
          push(source.coverItem);
          push(source.mediaItem);
          push(source);
          [source.coverMedia, source.mediaLibrary, source.gallery, source.mediaItems, source.businessMedia, source.media].forEach((list) => {
            if (Array.isArray(list)) list.forEach(push);
          });
          return candidates;
        }
        function searchPickBusinessCoverMedia() {
          let fallback = null;
          for (let index = 0; index < arguments.length; index += 1) {
            const candidates = searchBusinessMediaCandidates(arguments[index]);
            for (const candidate of candidates) {
              const media = searchBusinessMediaSource(candidate);
              if (!media) continue;
              if (media.type === "video") return media;
              if (!fallback) fallback = media;
            }
          }
          return fallback;
        }
        function searchBusinessDraftMediaLibrary(draft) {
          const source = draft && typeof draft === "object" ? draft : {};
          const storedLibrary = readJson("emyBusinessMediaLibrary", readJson("emyBusinessCoverMedia", []));
          const draftLibrary = []
            .concat(Array.isArray(source.coverMedia) ? source.coverMedia : [])
            .concat(Array.isArray(source.mediaLibrary) ? source.mediaLibrary : [])
            .concat(Array.isArray(source.gallery) ? source.gallery : [])
            .concat(Array.isArray(source.mediaItems) ? source.mediaItems : []);
          const raw = Array.isArray(storedLibrary) && storedLibrary.length ? storedLibrary : draftLibrary;
          return (Array.isArray(raw) ? raw : []).map((item) => searchBusinessMediaSource(item)).filter(Boolean).slice(0, 12);
        }
        function searchBusinessLooksGenericText(value) {
          const text = String(value || "").trim();
          return !text || /^Customer business\./i.test(text) || /^My Businesses$/i.test(text) || /^Location to confirm$/i.test(text);
        }
        function searchBusinessItemMatchesProfile(item, profile) {
          if (!item || !profile) return false;
          const keys = [item.key, item.businessKey, item.profileKey, item.name, item.title, item.business].map(searchBusinessKey).filter(Boolean);
          const profileKeys = [profile.key, profile.businessKey, profile.title, profile.name, profile.business].map(searchBusinessKey).filter(Boolean);
          return keys.some((key) => profileKeys.includes(key));
        }
        function searchCustomerProfileMediaSet() {
          return new Set([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerProfilePhotoBackup"),
            localStorage.getItem("emyCustomerProfilePhotoSrcBackup"),
            localStorage.getItem("emyCustomerProfilePhotoRefBackup"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef")
          ].map((value) => String(value || "").trim()).filter(Boolean));
        }
        function searchBusinessOnlyProfileMedia(values) {
          const customerMedia = searchCustomerProfileMediaSet();
          return (Array.isArray(values) ? values : []).map((value) => String(value || "").trim()).find((value) => value && !customerMedia.has(value)) || "";
        }
        function activeBusinessProfileSearchItem() {
          const draft = readJson("emyBusinessProfileDraft", {});
          if (draft && (draft.deleted === true || draft.deletedAt || draft.archived === true || draft.active === false || draft.visible === false)) return null;
          const storedCover = readJson("emyBusinessHeroCoverMedia", null);
          const mediaLibrary = searchBusinessDraftMediaLibrary(draft);
          const cover = searchPickBusinessCoverMedia(storedCover, draft.heroCoverMedia, draft.cover, draft, { coverMedia: mediaLibrary });
          const name = String(localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || draft.businessName || draft.name || "").trim();
          const photo = searchBusinessOnlyProfileMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyBusinessProfilePhotoBackup"), localStorage.getItem("emyBusinessProfilePhotoSrcBackup"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), draft.photo, draft.photoSrc, draft.profilePhoto, draft.profilePhotoSrc]);
          const photoRef = searchBusinessOnlyProfileMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyBusinessProfilePhotoRefBackup"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), draft.photoRef, draft.profilePhotoRef]);
          const hasProfile = Boolean(name || draft.businessName || draft.description || photo || photoRef || (cover && (cover.src || cover.ref)));
          if (!hasProfile || !searchBusinessProfileVisible(draft)) return null;
          const category = draft.businessCategory || draft.primarySector || draft.sector || "Retail";
          const address = [draft.businessAddressLine1, draft.businessLocation, draft.businessPostcode].filter(Boolean).join(", ") || draft.location || localStorage.getItem("emyBusinessLocation") || "Location to confirm";
          const description = draft.description || localStorage.getItem("emyBusinessDescription") || "Hi there, this is to complete my registration business profile.";
          const reviewStatus = String(searchBusinessSubmissionSignal(draft) || "open").toLowerCase();
          const key = searchBusinessKey(draft.businessKey || draft.key || localStorage.getItem("emyBusinessProfileKey") || localStorage.getItem("emyBusinessKey") || name) || "business-profile";
          return {
            type: "business",
            key,
            businessKey: key,
            category,
            distance: "0",
            status: reviewStatus.includes("reject") || reviewStatus.includes("closed") ? "closed" : "open",
            statusText: reviewStatus.includes("reject") ? "Needs admin review" : "Online and available",
            title: name || localStorage.getItem("emyMainPendingSignupFirstName") || "Stephane",
            description,
            location: address,
            address,
            latitude: draft.businessLatitude || draft.latitude || "",
            longitude: draft.businessLongitude || draft.longitude || draft.lng || "",
            media: cover && cover.type === "video" ? "profile-video" : "profile-video",
            coverSrc: cover && cover.src ? cover.src : "",
            coverRef: cover && cover.ref ? cover.ref : "",
            coverType: cover && cover.type ? cover.type : "",
            posterSrc: cover && cover.posterSrc ? cover.posterSrc : "",
            posterRef: cover && cover.posterRef ? cover.posterRef : "",
            cover,
            mediaLibrary,
            coverMedia: mediaLibrary,
            photo,
            photoRef,
            tag: "New business",
            insight: "Insights",
            hours: draft.businessHours || draft.hours || "Every day - 9:00 AM - 5:00 PM",
            duration: cover && cover.type === "video" ? "0:11" : "0:11",
            customer: true,
            likes: 0,
            search: [name, description, address, category, "new business customer profile"].join(" ")
          };
        }
        function defaultProfileBusinessSearchItem() {
          return activeBusinessProfileSearchItem();
        }
        function searchBusinessIsSavedCustomerProfile(profile) {
          if (!profile) return false;
          const savedKeys = searchCustomerBusinessKeys();
          return [
            profile.key,
            profile.businessKey,
            profile.profileKey,
            profile.title,
            profile.name,
            profile.business
          ].map(searchBusinessKey).filter(Boolean).some((key) => savedKeys.has(key));
        }
        function customerBusinessSearchItems() {
          const existingNames = new Set((data.following || []).map((item) => String(item.title || "").toLowerCase()));
          const activeProfile = activeBusinessProfileSearchItem();
          const rows = readCustomerBusinesses()
            .filter((item) => !existingNames.has(String(item.name || "").toLowerCase()))
            .map((item) => {
              const profile = searchBusinessItemMatchesProfile(item, activeProfile) ? activeProfile : null;
              const cover = searchPickBusinessCoverMedia(item, profile);
              const titleText = item.name || item.title || profile && profile.title || "Business";
              const description = !searchBusinessLooksGenericText(item.description) ? item.description : profile && profile.description || "Customer business. New posts, products, clips, offers, and updates will appear in your EMY experience.";
              const address = !searchBusinessLooksGenericText(item.address || item.location) ? (item.address || item.location) : profile && (profile.address || profile.location) || "My Businesses";
              const key = item.key || item.businessKey || profile && (profile.key || profile.businessKey) || businessProfileKey({ title: titleText });
              return {
                type: "business",
                key,
                businessKey: key,
                category: item.category || profile && profile.category || "Customer",
                distance: item.distance || profile && profile.distance || "1",
                status: String(item.status || profile && profile.status || "open").toLowerCase().includes("closed") ? "closed" : "open",
                statusText: item.statusText || profile && profile.statusText || "Online and available",
                title: titleText,
                description,
                location: address,
                address,
                latitude: item.latitude || item.lat || item.businessLatitude || profile && profile.latitude || "",
                longitude: item.longitude || item.lng || item.lon || item.businessLongitude || profile && profile.longitude || "",
                media: item.media || profile && profile.media || (key && key.includes("pizza") ? "pizza" : key && key.includes("glow") ? "shop" : key && key.includes("ross") ? "feed" : "profile-video"),
                photo: item.photo || item.image || item.logo || profile && profile.photo || "",
                photoRef: item.photoRef || item.imageRef || item.logoRef || item.profilePhotoRef || item.businessPhotoRef || profile && profile.photoRef || "",
                coverSrc: cover && cover.src ? cover.src : "",
                coverRef: cover && cover.ref ? cover.ref : "",
                coverType: cover && cover.type ? cover.type : "",
                posterSrc: cover && cover.posterSrc ? cover.posterSrc : "",
                posterRef: cover && cover.posterRef ? cover.posterRef : "",
                cover,
                coverMedia: profile && profile.coverMedia || item.coverMedia || [],
                mediaLibrary: profile && profile.mediaLibrary || item.mediaLibrary || [],
                tag: item.tag || "Customer",
                insight: item.insight || "Insights",
                hours: item.hours || profile && profile.hours || "Every day - 9:00 AM - 5:00 PM",
                duration: item.duration || profile && profile.duration || "0:11",
                customer: true,
                likes: Number(item.likes) || Number(profile && profile.likes) || 0,
                search: [titleText, description, address, item.category, profile && profile.category, "customer my businesses subscribed posts products clips offers updates"].join(" ")
              };
            });
          if (activeProfile && searchBusinessIsSavedCustomerProfile(activeProfile)) {
            const activeName = String(activeProfile.title || activeProfile.name || "").toLowerCase();
            const alreadyShown = existingNames.has(activeName) || rows.some((item) => searchBusinessItemMatchesProfile(item, activeProfile) || String(item.title || item.name || "").toLowerCase() === activeName);
            if (!alreadyShown) rows.unshift(Object.assign({}, activeProfile, { customer: true, tag: activeProfile.tag || "Customer" }));
          }
          return rows;
        }

        function searchStoredBusinessProfileRows() {
          const rows = [];
          const push = (item, storageKey) => {
            if (item && typeof item === "object" && !Array.isArray(item)) rows.push({ item, storageKey });
          };
          [
            "emyRealPublicBusinessProfiles",
            "emyPublicBusinessProfiles",
            "emyBusinessProfiles",
            "emyBusinessDirectory",
            "emyNearbyBusinesses",
            "emyBusinesses",
            "emySavedBusinesses",
            "emyLocalBusinesses"
          ].forEach((key) => {
            const value = readJson(key, null);
            if (Array.isArray(value)) value.forEach((item, index) => push(item, key + "-" + index));
            else if (value && typeof value === "object") Object.keys(value).forEach((storageKey) => push(value[storageKey], storageKey));
          });
          return rows;
        }

        function searchStoredBusinessProfileItems() {
          const seen = new Set();
          return searchStoredBusinessProfileRows().map(({ item, storageKey }) => {
            const nested = item.details && typeof item.details === "object" ? item.details
              : item.profile && typeof item.profile === "object" ? item.profile
                : item.businessProfile && typeof item.businessProfile === "object" ? item.businessProfile
                  : item.data && typeof item.data === "object" ? item.data
                    : {};
            const source = Object.assign({}, item, nested);
            const titleText = String(source.businessName || source.business || source.name || source.title || source.displayName || source.companyName || "").trim();
            const key = searchBusinessKey(source.businessKey || source.key || source.profileKey || source.id || source.uid || item.id || storageKey || titleText);
            if (!titleText || !key || searchBusinessLooksSampleName(titleText) || searchBusinessLooksSampleName(key)) return null;
            if (seen.has(key)) return null;
            if (source.deleted === true || source.deletedAt || source.archived === true || source.active === false || source.visible === false || source.hidden === true) return null;
            seen.add(key);
            const cover = searchPickBusinessCoverMedia(source.heroCoverMedia, source.coverMedia, source.cover, source);
            const category = source.businessCategory || source.category || source.primarySector || source.sector || source.type || "Business";
            const description = source.businessDescription || source.description || source.about || source.summary || "";
            const address = source.businessAddress || source.businessAddressLine1 || source.address || source.businessLocation || source.location || "Location to confirm";
            const statusText = String(source.statusText || source.openStatus || source.hoursStatus || source.status || source.reviewStatus || "open").toLowerCase();
            return {
              type: "business",
              key,
              businessKey: key,
              category,
              distance: source.distance || source.distanceText || source.milesText || "1",
              status: statusText.includes("closed") ? "closed" : "open",
              statusText: source.statusText || source.openStatusText || source.hoursStatusText || "Online and available",
              title: titleText,
              description,
              location: address,
              address,
              latitude: source.latitude || source.lat || source.businessLatitude || source.locationLatitude || "",
              longitude: source.longitude || source.lng || source.lon || source.businessLongitude || source.locationLongitude || "",
              media: source.media || source.photoClass || source.coverClass || "profile-video",
              photo: source.photoUrl || source.photo || source.photoSrc || source.profilePhoto || source.profilePhotoSrc || source.logo || source.logoSrc || "",
              photoRef: source.photoPublicId || source.photoRef || source.profilePhotoRef || source.logoRef || "",
              coverSrc: cover && cover.src ? cover.src : "",
              coverRef: cover && cover.ref ? cover.ref : "",
              coverType: cover && cover.type ? cover.type : "",
              posterSrc: cover && cover.posterSrc ? cover.posterSrc : "",
              posterRef: cover && cover.posterRef ? cover.posterRef : "",
              cover,
              coverMedia: Array.isArray(source.coverMedia) ? source.coverMedia : [],
              mediaLibrary: Array.isArray(source.mediaLibrary) ? source.mediaLibrary : [],
              tag: "Business",
              insight: "Insights",
              hours: source.businessHours || source.hours || source.openingHours || "Every day - 9:00 AM - 5:00 PM",
              duration: cover && cover.type === "video" ? "0:11" : "",
              likes: Number(source.likes) || 0,
              search: [titleText, description, address, category, "real public business profile"].join(" ")
            };
          }).filter(Boolean);
        }

        function searchReadArray(key) {
          try {
            const parsed = JSON.parse(localStorage.getItem(key) || "[]");
            if (Array.isArray(parsed)) return parsed.filter((item) => item && typeof item === "object");
            if (parsed && typeof parsed === "object") return Object.values(parsed).filter((item) => item && typeof item === "object");
          } catch (error) {}
          return [];
        }

        function searchStoredTime(item) {
          return String(item && (item.createdAt || item.postedAt || item.publishedAt || item.savedAt || item.repostedAt || item.updatedAt || item.time) || "").trim();
        }

        function searchTimeLabel(value, fallback) {
          const raw = String(value || "").trim();
          const date = raw ? new Date(raw) : null;
          if (!date || Number.isNaN(date.getTime())) return String(fallback || "Time saved");
          const now = new Date();
          const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
          const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
          const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
          if (startDate === startToday) return "Today at " + time;
          if (startDate === startToday - 86400000) return "Yesterday at " + time;
          return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: date.getFullYear() === now.getFullYear() ? undefined : "numeric" }) + " at " + time;
        }
        function searchProductFreshTime(item) {
          const values = [
            item && item.createdAt,
            item && item.postedAt,
            item && item.publishedAt,
            item && item.liveAt,
            item && item.savedAt,
            item && item.updatedAt,
            item && item.created,
            item && item.date
          ];
          for (const value of values) {
            const raw = String(value || "").trim();
            if (!raw || /^(today|yesterday|saved|now|just now)$/i.test(raw)) continue;
            const parsed = Date.parse(raw);
            if (Number.isFinite(parsed)) return parsed;
          }
          const timeLabel = String(item && (item.time || item.dateText) || "").trim().toLowerCase();
          const relative = timeLabel.match(/^(\\d+)\\s+days?\\s+ago$/i);
          if (relative) return Date.now() - Number(relative[1]) * 24 * 60 * 60 * 1000;
          if (/today|just now|now|minute|hour/i.test(timeLabel)) return Date.now();
          if (/yesterday/i.test(timeLabel)) return Date.now() - 24 * 60 * 60 * 1000;
          return 0;
        }
        function searchProductIsNew(item) {
          const time = searchProductFreshTime(item);
          if (!time) return false;
          const age = Date.now() - time;
          return age >= 0 && age < 3 * 24 * 60 * 60 * 1000;
        }

        function searchFeedPreviewIntro(value, details, fallback) {
          const intro = String(value || "").trim();
          if (intro) return intro;
          const text = String(details || "").trim();
          if (!text) return String(fallback || "").trim();
          if (text.length <= 180) return text;
          return text.slice(0, 177).replace(/\s+\S*$/, "").trim() + "...";
        }

        function searchDataMedia(value) {
          const text = String(value || "").trim();
          return text.indexOf("data:image") === 0 || text.indexOf("data:video") === 0 || text.indexOf("blob:") === 0 || text.indexOf("http://") === 0 || text.indexOf("https://") === 0 ? text : "";
        }

        function searchMediaPayload(item, options = {}) {
          const eventCover = !!options.eventCover;
          const mediaItems = !eventCover && window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(item || {}) : [];
          const first = mediaItems[0] || null;
          const settings = item && (item.mediaSettings || item.coverSettings || item.eventCoverSettings) || null;
          const eventSrc = eventCover ? searchDataMedia(item && (item.coverSrc || item.eventCoverSrc || item.mediaSrc || item.image)) : "";
          const eventRef = eventCover ? String(item && (item.coverRef || item.eventCoverRef || item.mediaRef) || "") : "";
          const mediaSrc = eventCover
            ? eventSrc
            : first ? (first.ref && first.type === "video" ? "" : (first.src || "")) : searchDataMedia(item && (item.mediaSrc || item.image || item.video || item.coverSrc || item.thumbnail || item.thumb));
          const mediaRef = eventCover ? eventRef : first ? (first.ref || "") : String(item && (item.mediaRef || item.imageRef || item.videoRef || item.coverRef || item.eventCoverRef) || "");
          const mediaType = eventCover && (mediaSrc || mediaRef)
            ? "image"
            : first ? (first.type || "image") : String(item && item.mediaType || (item && item.video ? "video" : mediaSrc || mediaRef ? "image" : "")).toLowerCase();
          const posterRef = String(item && (item.posterRef || item.thumbnailRef) || settings && (settings.posterRef || settings.thumbnailRef) || "");
          const posterSrc = posterRef ? "" : searchDataMedia(item && (item.posterSrc || item.thumbnailSrc) || settings && (settings.posterSrc || settings.thumbnailSrc) || "");
          return {
            mediaItems,
            mediaSrc,
            mediaRef,
            mediaType: mediaType === "video" ? "video" : mediaType === "image" ? "image" : "",
            posterSrc,
            posterRef,
            mediaSettings: settings,
            mediaOverlay: item && (item.mediaOverlay || (item.mediaSettings && item.mediaSettings.overlay)) || ""
          };
        }

        function searchBusinessDisplayName() {
          const draft = readJson("emyBusinessProfileDraft", {});
          return localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || draft.businessName || "Stephane";
        }

        function searchStatCount(item, word) {
          const text = String(item && item.stats || "");
          const pattern = new RegExp("(\\d+(?:\\.\\d+)?\\s*[kKmM]?)\\s*" + word, "i");
          const match = text.match(pattern);
          if (match) return readEngagementCount(match[1]);
          return 0;
        }

        function searchLooksProductClip(item, sourceKey) {
          if (!item || typeof item !== "object") return false;
          if (item.productClip === true || item.isProductClip === true || item.productClipDetails) return true;
          if (item.productName || item.productTitle || item.productDescription || item.productInfo || item.price || item.priceText) return true;
          const marker = [
            sourceKey,
            item.detailKind,
            item.kind,
            item.type,
            item.tag,
            item.category,
            item.postMode,
            item.createType,
            item.clipKind,
            item.reelKind,
            item.clipType,
            item.reelType,
            item.title,
            item.clipTitle,
            item.description,
            item.text,
            item.search
          ].filter(Boolean).join(" ").toLowerCase();
          return /product\\s*clip|shared\\s+a\\s+product\\s+clip|product\\s+video|clip\\s+product/.test(marker);
        }

        function searchCreatedSource(sourceKey) {
          return String(sourceKey || "").indexOf("emyFeedCreated") === 0;
        }

        function searchStoredOwnerMeta(item, sourceKey, business) {
          const createdSource = searchCreatedSource(sourceKey);
          const roleText = String(item && [item.owner, item.ownerType, item.actorType, item.createdAs, item.accountType, item.role, item.authorRole].filter(Boolean).join(" ") || "").toLowerCase();
          const hrefText = String(item && [item.profileHref, item.href, item.actorHref].filter(Boolean).join(" ") || "").toLowerCase();
          const explicitCustomer = item && (roleText.indexOf("customer") >= 0 || roleText.indexOf("buyer") >= 0 || item.my === true);
          const explicitBusiness = item && (roleText.indexOf("business") >= 0 || roleText.indexOf("seller") >= 0 || item.my === false);
          const customerKey = item && (item.key === "customer-profile" || item.businessKey === "customer-profile" || hrefText.indexOf("emy-customer-profile") >= 0);
          const isUserPost = !explicitBusiness && (createdSource || explicitCustomer || customerKey);
          const key = item && (item.key || item.businessKey) || (isUserPost ? "customer-profile" : businessProfileKey({ title: business || searchBusinessDisplayName() }));
          return {
            owner: isUserPost ? "customer" : "business",
            isUserPost,
            key,
            profileHref: item && item.profileHref || (isUserPost ? "emy-customer-profile.html" : "emy-business-profile.html?business=" + encodeURIComponent(key))
          };
        }

        function mapStoredPostSearchItem(item, index, sourceKey) {
          const media = searchMediaPayload(item);
          const rawKind = String(item.kind || item.createType || item.type || "post").toLowerCase();
          const postMode = String(item.postMode || "").toLowerCase();
          const tag = String(item.tag || "").trim();
          const tagKey = tag.toLowerCase();
          const isArticle = rawKind === "article" || postMode === "article" || tagKey === "article" || !!item.articleBody;
          const isClip = rawKind === "clip" || postMode === "clip" || tagKey.indexOf("clip") !== -1;
          const isProductClip = isClip && searchLooksProductClip(item, sourceKey);
          const createdAt = searchStoredTime(item);
          const business = item.business || item.actor || item.name || searchCurrentCustomerName();
          const ownerMeta = searchStoredOwnerMeta(item, sourceKey, business);
          const displayBusiness = ownerMeta.isUserPost ? searchCurrentCustomerName() : business;
          const title = item.title || item.postTitle || (isArticle ? "New article" : isClip ? "New clip" : "New post");
          const description = item.text || item.description || item.articleBody || item.shareText || "";
          const titleText = isProductClip ? (item.productTitle || item.productName || item.clipTitle || title || "Product clip") : title;
          const descriptionText = isProductClip ? (item.productDescription || item.productInfo || description || "Shared a product clip.") : description;
          return Object.assign({}, media, {
            id: item.id || sourceKey + "-" + index,
            type: isClip ? "reel" : "post",
            reelType: isClip ? (isProductClip ? "product" : "normal") : "",
            detailKind: isArticle ? "Article" : isClip ? (isProductClip ? "Product Clip" : "Clip") : "Post",
            category: isArticle ? "Article" : isProductClip ? "Product Clip" : tag || "Post",
            date: "recent",
            popularity: "new",
            createdAt,
            title: titleText,
            description: descriptionText,
            dateText: searchTimeLabel(createdAt, item.time || "Time saved"),
            likes: Number(item.likes) || searchStatCount(item, "like"),
            saved: Number(item.saved) || searchStatCount(item, "saved"),
            businessName: displayBusiness,
            owner: ownerMeta.owner,
            isUserPost: ownerMeta.isUserPost,
            key: ownerMeta.key,
            businessKey: ownerMeta.key,
            profileHref: ownerMeta.profileHref,
            latitude: item.latitude || item.lat || item.businessLatitude || item.locationLatitude || "",
            longitude: item.longitude || item.lng || item.lon || item.businessLongitude || item.locationLongitude || "",
            media: media.mediaSrc || media.mediaRef || media.mediaItems.length ? (item.media || "feed") : (item.media || ""),
            productName: isProductClip ? (item.productName || item.productTitle || titleText) : "",
            productInfo: isProductClip ? (item.productInfo || item.productDescription || descriptionText) : "",
            priceText: isProductClip ? (item.priceText || item.price || "") : "",
            articleBody: item.articleBody || (isArticle ? description : ""),
            articleShare: item.shareText || "",
            readTime: item.readTime || item.articleReadTime || "",
            search: [displayBusiness, titleText, descriptionText, item.jobTitle, item.eventName, tag, rawKind, postMode, isProductClip ? "product clip" : ""].join(" ")
          });
        }

        function mapStoredJobSearchItem(item, index, sourceKey) {
          const media = searchMediaPayload(Object.assign({}, item, {
            mediaSrc: item.coverRef || item.jobCoverRef || item.mediaRef ? "" : (item.coverSrc || item.jobCoverSrc || item.mediaSrc || item.image || item.video || ""),
            mediaRef: item.coverRef || item.jobCoverRef || item.mediaRef || "",
            mediaType: item.coverType || item.jobCoverType || item.mediaType || (item.video ? "video" : "")
          }));
          const createdAt = searchStoredTime(item);
          const business = item.business || item.actor || searchCurrentCustomerName();
          const ownerMeta = searchStoredOwnerMeta(item, sourceKey, business);
          const displayBusiness = ownerMeta.isUserPost ? searchCurrentCustomerName() : business;
          const titleText = item.jobTitle || item.title || "Help wanted";
          const description = item.description || item.text || "This business is hiring.";
          const feedIntro = item.feedIntro || item.intro || item.summary || item.shareText || "";
          return Object.assign({}, media, {
            id: item.id || sourceKey + "-" + index,
            type: "post",
            detailKind: "Job",
            category: "Job",
            date: "recent",
            popularity: "new",
            createdAt,
            title: titleText,
            description,
            dateText: searchTimeLabel(createdAt, item.time || "Time saved"),
            businessName: displayBusiness,
            owner: ownerMeta.owner,
            isUserPost: ownerMeta.isUserPost,
            key: ownerMeta.key,
            businessKey: ownerMeta.key,
            profileHref: ownerMeta.profileHref,
            latitude: item.latitude || item.lat || item.businessLatitude || item.locationLatitude || "",
            longitude: item.longitude || item.lng || item.lon || item.businessLongitude || item.locationLongitude || "",
            media: media.mediaSrc || media.mediaRef ? (item.media || "feed") : "",
            likes: searchStatCount(item, "like"),
            feedIntro,
            jobLocation: item.jobLocation || item.location || "",
            workplace: item.workplace || "",
            employment: item.employment || "",
            search: [displayBusiness, titleText, feedIntro, description, item.jobLocation, item.location, item.workplace, item.employment, "job hiring"].join(" ")
          });
        }

        function mapStoredEventSearchItem(item, index, sourceKey) {
          const media = searchMediaPayload(item, { eventCover: true });
          const createdAt = searchStoredTime(item);
          const business = item.business || item.actor || searchCurrentCustomerName();
          const ownerMeta = searchStoredOwnerMeta(item, sourceKey, business);
          const displayBusiness = ownerMeta.isUserPost ? searchCurrentCustomerName() : business;
          const titleText = item.title || item.eventName || "New event";
          const description = item.description || item.text || "Event details will be shared soon.";
          const feedIntro = item.feedIntro || item.intro || item.summary || item.shareText || "";
          return Object.assign({}, media, {
            id: item.id || sourceKey + "-" + index,
            type: "post",
            detailKind: "Event",
            category: "Event",
            date: "recent",
            popularity: "new",
            createdAt,
            title: titleText,
            description,
            dateText: searchTimeLabel(createdAt, item.time || "Time saved"),
            businessName: displayBusiness,
            owner: ownerMeta.owner,
            isUserPost: ownerMeta.isUserPost,
            key: ownerMeta.key,
            businessKey: ownerMeta.key,
            profileHref: ownerMeta.profileHref,
            latitude: item.latitude || item.lat || item.businessLatitude || item.locationLatitude || "",
            longitude: item.longitude || item.lng || item.lon || item.businessLongitude || item.locationLongitude || "",
            media: media.mediaSrc || media.mediaRef ? "feed" : "",
            feedIntro,
            eventWhen: item.eventWhen || "",
            eventWhere: item.eventWhere || item.location || "",
            search: [displayBusiness, titleText, feedIntro, description, item.eventType, item.eventWhen, item.eventWhere, "event"].join(" ")
          });
        }

        function searchProductIsPublished(item) {
          if (item && (item.isPaused === true || item.paused === true || item.isPublished === false || item.isLive === false || item.hidden === true || item.deleted === true || item.deletedAt)) return false;
          const status = String(item && (item.publishStatus || item.liveStatus || item.visibility || item.status || item.productStatus) || "active").trim().toLowerCase();
          return ["paused", "pause", "unpublished", "hidden", "draft", "inactive", "offline", "deleted", "archived"].indexOf(status) < 0;
        }

        function mapStoredProductSearchItem(item, index, sourceKey) {
          const media = searchMediaPayload(item);
          const titleText = item.title || item.name || item.productName || item.itemTitle || "Product";
          const description = item.description || item.text || item.productInfo || "Product available locally.";
          const business = item.businessName || item.business || item.actor || searchBusinessDisplayName();
          const businessKey = item.businessKey || item.key || businessProfileKey({ title: business });
          const price = item.priceText || item.price || item.amount || "";
          return Object.assign({}, media, {
            id: item.id || item.productId || sourceKey + "-" + index,
            type: "product",
            owner: "business",
            actorType: "business",
            accountType: "business",
            createdAs: "business",
            category: item.category || item.productCategory || "Products",
            subCategory: item.subCategory || item.subcategory || item.productType || "",
            price: item.price || "",
            priceText: price,
            availability: searchProductAvailability(item),
            title: titleText,
            description,
            businessName: business,
            source: "nearby",
            latitude: item.latitude || item.lat || item.businessLatitude || item.locationLatitude || "",
            longitude: item.longitude || item.lng || item.lon || item.businessLongitude || item.locationLongitude || "",
            likes: Number(item.likes) || searchStatCount(item, "like"),
            saved: Number(item.saved) || searchStatCount(item, "saved"),
            media: media.mediaSrc || media.mediaRef || media.mediaItems.length ? (item.media || "feed") : (item.media || "shop"),
            key: businessKey,
            businessKey,
            search: [business, titleText, description, item.category, item.subCategory, price, "product"].join(" ")
          });
        }

        function mapStoredReelSearchItem(item, index, sourceKey) {
          const media = searchMediaPayload(item);
          const productClip = searchLooksProductClip(item, sourceKey);
          const business = item.businessName || item.business || item.actor || searchBusinessDisplayName();
          const titleText = productClip ? (item.productName || item.productTitle || item.title || item.clipTitle || "Product clip") : (item.title || item.clipTitle || "Business clip");
          const description = productClip ? (item.productInfo || item.productDescription || item.description || item.text || "Shared a product clip.") : (item.description || item.text || "Short business clip.");
          return Object.assign({}, media, {
            id: item.id || item.clipId || sourceKey + "-" + index,
            type: "reel",
            reelType: productClip ? "product" : "normal",
            category: productClip ? "Products" : (item.category || "Business"),
            date: "recent",
            title: titleText,
            description,
            dateText: searchTimeLabel(searchStoredTime(item), item.time || "Time saved"),
            likes: Number(item.likes) || searchStatCount(item, "like"),
            viewsText: item.viewsText || item.views || "0 views",
            businessName: business,
            productName: item.productName || titleText,
            latitude: item.latitude || item.lat || item.businessLatitude || item.locationLatitude || "",
            longitude: item.longitude || item.lng || item.lon || item.businessLongitude || item.locationLongitude || "",
            productInfo: item.productInfo || description,
            priceText: item.priceText || item.price || "",
            media: media.mediaSrc || media.mediaRef || media.mediaItems.length ? (item.media || "feed") : (item.media || "feed"),
            key: item.key || item.businessKey || businessProfileKey({ title: business }),
            search: [business, titleText, description, item.productName, item.productInfo, item.priceText, "clip video"].join(" ")
          });
        }

        function searchCreatedPostItems() {
          return searchReadArray("emyFeedCreatedPosts").filter((item) => !(window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(item))).map((item, index) => mapStoredPostSearchItem(item, index, "emyFeedCreatedPosts"));
        }

        function searchCreatedJobItems() {
          return searchReadArray("emyFeedCreatedJobs").filter((item) => !(window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(item))).map((item, index) => mapStoredJobSearchItem(item, index, "emyFeedCreatedJobs"));
        }

        function searchCreatedEventItems() {
          return searchReadArray("emyFeedCreatedEvents").filter((item) => !(window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(item))).map((item, index) => mapStoredEventSearchItem(item, index, "emyFeedCreatedEvents"));
        }

        function searchBusinessProductItems() {
          return ["emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyFeedCreatedProducts"].flatMap((key) => searchReadArray(key).filter(searchProductIsPublished).map((item, index) => mapStoredProductSearchItem(item, index, key)));
        }

        function searchBusinessPostItems() {
          return ["emyBusinessFeedPosts", "emyBusinessPosts"].flatMap((key) => searchReadArray(key).map((item, index) => mapStoredPostSearchItem(Object.assign({ business: searchBusinessDisplayName(), owner: item.owner || "business" }, item), index, key)));
        }

        function searchBusinessJobItems() {
          return ["emyBusinessJobs", "emyBusinessJobPosts"].flatMap((key) => searchReadArray(key).map((item, index) => mapStoredJobSearchItem(Object.assign({ business: searchBusinessDisplayName(), owner: item.owner || "business" }, item), index, key)));
        }

        function searchBusinessEventItems() {
          return ["emyBusinessEvents", "emyBusinessEventPosts"].flatMap((key) => searchReadArray(key).map((item, index) => mapStoredEventSearchItem(Object.assign({ business: searchBusinessDisplayName(), owner: item.owner || "business" }, item), index, key)));
        }

        function searchBusinessReelItems() {
          return ["emyBusinessReels", "emyBusinessClips", "emyBusinessProductReels", "emyFeedCreatedClips", "emyFeedCreatedClipsByBusiness", "emyUploadedClips"].flatMap((key) => searchReadArray(key).map((item, index) => mapStoredReelSearchItem(item, index, key)));
        }

        function searchRepostItems() {
          return readSearchFeedReposts().map((record, index) => {
            const original = record && record.original || {};
            return Object.assign(mapStoredPostSearchItem(Object.assign({}, original, {
              id: record.id || "search-repost-" + index,
              title: record.repostThought || record.thought || original.title || "Reposted update",
              text: record.repostThought || record.thought || original.text || "",
              business: record.repostedBy || searchCurrentCustomerName(),
              createdAt: record.repostedAt || record.createdAt,
              key: "customer-profile"
            }), index, "emyFeedReposts"), {
              isRepost: true,
              originalId: record.originalId || original.id || ""
            });
          });
        }

        function searchDedupeSlug(value) {
          return String(value || "").replace(/\s+/g, " ").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        }
        function searchDedupeCopySlug(value, businessName) {
          let text = String(value || "").replace(/\s+/g, " ").trim();
          const business = String(businessName || "").replace(/\s+/g, " ").trim();
          if (business && text.toLowerCase().indexOf(business.toLowerCase() + " ") === 0) text = text.slice(business.length).replace(/\s+/g, " ").trim();
          return searchDedupeSlug(text);
        }
        function searchItemMediaAliases(item) {
          const values = [item && item.mediaRef, item && item.mediaSrc, item && item.posterRef, item && item.posterSrc, item && item.thumbnailRef, item && item.thumbnailSrc].map(searchDedupeSlug).filter(Boolean);
          if (Array.isArray(item && item.mediaItems)) {
            item.mediaItems.forEach((media) => {
              [media && media.ref, media && media.src, media && media.posterRef, media && media.posterSrc, media && media.thumbnailRef, media && media.thumbnailSrc].map(searchDedupeSlug).filter(Boolean).forEach((value) => values.push(value));
            });
          }
          return Array.from(new Set(values));
        }
        // Local copy: the search script scope does not include the customer
        // home closure that defines feedItemStableIdentityId; calling it bare
        // throws a ReferenceError and aborts search dedupe/render.
        function feedItemStableIdentityId(item) {
          const id = String(item && (item.id || item.feedId || item.postId || item.originalFeedId || item.articleId || item.eventId || item.jobId || item.productId || item.clipId || item.reelId || item.rawId) || "").trim();
          if (!id) return "";
          const lower = id.toLowerCase();
          if (/^(feed-create-|customer-post-|user-feed-|repost-)/.test(lower)) return id;
          if (/^feed-create-\d+-\d+$/i.test(lower)) return id;
          if (/^(created-home-post-|home-created-|feed-post-|feed-clip-|feed-product-|feed-article-|feed-event-|feed-job-)\d+$/i.test(id)) return id;
          if (/^(emyfeedcreatedposts|emybusinessfeedposts|emybusinessposts|emybusinessclips|emybusinessproducts|emybusinessjobs|emybusinessevents)-\d+$/i.test(lower)) return id;
          if (/^feed-[a-z]+-[a-z0-9-]+-[a-z0-9-]+$/i.test(id)) return id;
          return id;
        }
        function searchItemDedupeAliases(item) {
          const type = searchDedupeSlug(item && (item.type || item.detailKind || ""));
          const stableId = feedItemStableIdentityId(item);
          if (stableId) return [type + ":id:" + searchDedupeSlug(stableId)];
          const businessName = item && (item.businessName || item.business || item.key || "");
          const business = searchDedupeSlug(businessName);
          const id = searchDedupeSlug(item && item.id || "");
          const title = searchDedupeSlug(item && item.title || "");
          const description = searchDedupeSlug(item && item.description || "");
          const normalTitle = searchDedupeCopySlug(item && item.title, businessName);
          const normalDescription = searchDedupeCopySlug(item && item.description, businessName);
          const mediaAliases = searchItemMediaAliases(item);
          const aliases = [];
          if (type && id && !/^(emyfeedcreatedposts|emybusinessfeedposts|emybusinessposts)-\d+$/i.test(String(item && item.id || ""))) aliases.push(type + ":id:" + id);
          mediaAliases.forEach((media) => {
            aliases.push(type + ":media:" + media);
            if (business) aliases.push(type + ":media:" + business + ":" + media);
          });
          if (type && business && title && description) aliases.push(type + ":copy:" + business + ":" + title + ":" + description);
          if (type && business && normalTitle && normalDescription) aliases.push(type + ":copy-normal:" + business + ":" + normalTitle + ":" + normalDescription);
          if (type && business && normalTitle && /^(photo-update|video-update|carousel-update|new-update|business-update|update)$/.test(normalTitle)) aliases.push(type + ":generic-title:" + business + ":" + normalTitle);
          if (!aliases.length) aliases.push(type + ":fallback:" + searchDedupeSlug([business, title, description].join("|")));
          return Array.from(new Set(aliases.filter(Boolean)));
        }
        function searchItemRichness(item) {
          return (Array.isArray(item && item.mediaItems) ? item.mediaItems.length : 0) * 10 + searchItemMediaAliases(item).length + (String(item && item.description || "").length ? 1 : 0);
        }
        function uniqueSearchItems(items) {
          const groups = [];
          const aliasToGroup = new Map();
          (items || []).filter(Boolean).forEach((item) => {
            const aliases = searchItemDedupeAliases(item);
            let groupIndex = -1;
            aliases.some((alias) => {
              if (aliasToGroup.has(alias)) {
                groupIndex = aliasToGroup.get(alias);
                return true;
              }
              return false;
            });
            if (groupIndex < 0) {
              groupIndex = groups.length;
              groups.push({ item, aliases: new Set() });
            } else if (searchItemRichness(item) > searchItemRichness(groups[groupIndex].item)) {
              groups[groupIndex].item = item;
            }
            aliases.forEach((alias) => {
              groups[groupIndex].aliases.add(alias);
              aliasToGroup.set(alias, groupIndex);
            });
          });
          return groups.map((group) => group.item).filter(Boolean);
        }

        function searchArticleIdentity(item) {
          return ["article", item && (item.businessName || item.business || ""), item && item.title || "", item && (item.articleBody || item.description || ""), item && (item.articleShare || item.shareText || ""), item && (item.mediaRef || item.mediaSrc || "")].map((part) => String(part || "").trim().toLowerCase().replace(/\s+/g, " ")).join("|");
        }

        function uniqueSearchArticleItems(items) {
          const chosen = new Map();
          const order = [];
          (items || []).filter(Boolean).forEach((item) => {
            const key = searchArticleIdentity(item);
            if (!chosen.has(key)) {
              chosen.set(key, item);
              order.push(key);
              return;
            }
            const current = chosen.get(key);
            if (current && current.isRepost && !item.isRepost) chosen.set(key, item);
          });
          return order.map((key) => chosen.get(key)).filter(Boolean);
        }

        function searchItemSortTime(item) {
          const raw = item && (item.createdAt || item.updatedAt || item.created || item.dateValue);
          const parsed = Date.parse(raw || "");
          return Number.isFinite(parsed) ? parsed : 0;
        }

        function searchProductHomeTitle(value) {
          const title = String(value || "").trim();
          return title === "Ever Glow Face Wash" ? "Face Wash" : title;
        }

        function searchProductHomeDescription(item, fallback) {
          const title = searchProductHomeTitle(item && item.title);
          if (title === "Face Wash") return "Beauty product from one of My Businesses.";
          if (title === "Garlic Bread") return "Warm side with clear product details.";
          if (title === "Desk Lamp") return "Compact work light from a nearby business.";
          const text = String(fallback || "").trim();
          return text ? (/[\.\!\?]$/.test(text) ? text : text + ".") : "";
        }

        function searchProductHomeMedia(item, fallback) {
          const title = searchProductHomeTitle(item && item.title);
          if (title === "Desk Lamp" || title === "Phone Stand") return "tech";
          return fallback || "feed";
        }

        function searchProductAvailability(item, fallback) {
          const raw = String(item && (item.availability || item.stockStatus || item.stock || item.available || item.status) || "").trim();
          if (!raw || /^(active|live|published|approved|public|visible|true|yes|available|online|online and available|open|open now)$/i.test(raw)) return fallback || "In stock";
          if (/^(paused|hidden|draft|inactive|unpublished)$/i.test(raw)) return "Unavailable";
          return raw;
        }

        function searchProductHomeTime(item, title) {
          if (item && (item.time || item.dateText)) return item.time || item.dateText;
          if (title === "Face Wash") return "8 min ago";
          if (title === "Garlic Bread") return "Today";
          if (title === "Desk Lamp") return "Yesterday";
          return "Open now";
        }

        function searchProductHomeRank(item) {
          const title = searchProductHomeTitle(item && item.title).toLowerCase();
          const order = ["face wash", "garlic bread", "desk lamp"];
          const index = order.indexOf(title);
          return index >= 0 ? index : 99;
        }

        function searchProductHomeSort(a, b) {
          const rank = searchProductHomeRank(a) - searchProductHomeRank(b);
          return rank || searchItemSortTime(b) - searchItemSortTime(a);
        }

        function allPlatformPostItems() {
          return uniqueSearchItems(searchRepostItems().concat(
            searchCreatedPostItems().filter((item) => item.type !== "reel"),
            searchCreatedJobItems(),
            searchCreatedEventItems(),
            searchBusinessPostItems(),
            searchBusinessJobItems(),
            searchBusinessEventItems()
          )).sort((a, b) => searchItemSortTime(b) - searchItemSortTime(a));
        }

        function searchPostKind(item) {
          const kindText = String((item && (item.detailKind || item.category || item.type)) || "").toLowerCase();
          if (kindText.indexOf("article") >= 0 || item && item.articleBody) return "article";
          if (kindText.indexOf("event") >= 0 || item && (item.eventWhen || item.eventWhere)) return "event";
          if (kindText.indexOf("job") >= 0 || item && (item.jobLocation || item.workplace || item.employment)) return "job";
          return "update";
        }

        function searchSourceItems(tab) {
          let items;
          if (tab === "products") items = searchWithoutRemovedFakeBusinesses(uniqueSearchItems(searchBusinessProductItems())).sort(searchProductHomeSort);
          else if (tab === "updates") items = searchWithoutRemovedFakeBusinesses(allPlatformPostItems().filter((item) => searchPostKind(item) === "update"));
          else if (tab === "articles") items = uniqueSearchArticleItems(searchWithoutRemovedFakeBusinesses(allPlatformPostItems().filter((item) => searchPostKind(item) === "article" && !item.isRepost)));
          else if (tab === "events") items = searchWithoutRemovedFakeBusinesses(allPlatformPostItems().filter((item) => searchPostKind(item) === "event"));
          else if (tab === "jobs") items = searchWithoutRemovedFakeBusinesses(allPlatformPostItems().filter((item) => searchPostKind(item) === "job"));
          else if (tab === "reels") items = searchWithoutRemovedFakeBusinesses(uniqueSearchItems(searchCreatedPostItems().filter((item) => item.type === "reel").concat(searchBusinessReelItems())));
          else if (tab === "business") items = businessSearchItems();
          else if (tab === "following") items = followingBusinessSearchItems();
          else items = searchWithoutRemovedFakeBusinesses(data[tab] || []);
          return searchFilterByActiveLocation(items, tab);
        }

        function shortLocationLabel(value) {
          if (!value || value === "Near me") return "Current Location";
          return String(value).split(",")[0].trim() || "Current Location";
        }

        function headerLocationText(value) {
          const text = String(value || "").trim();
          if (!text || text.toLowerCase() === "near me" || text === "Current Location") return "Current Location";
          const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
          const label = parts.slice(0, 2).join(", ") || text;
          return label.length > 46 ? label.slice(0, 43).trim() + "..." : label;
        }

        function renderProfilePreview() {
          if (!profilePreview) return;
          profilePreview.innerHTML = "S";
          if (!currentProfilePhoto) return;
          const image = document.createElement("img");
          image.alt = "Current profile picture";
          image.src = currentProfilePhoto;
          profilePreview.innerHTML = "";
          profilePreview.appendChild(image);
          applyCropStyle(image, currentProfileCrop);
        }

        function renderConnectedHeader() {
          currentProfilePhoto = customerProfilePhotoFromStorage();
          currentProfileCrop = readJson("emyCustomerProfilePhotoCrop", customerPendingSignupCrop());
          const displayName = localStorage.getItem("emyCustomerDisplayName") || "";
          const firstName = localStorage.getItem("emyCustomerFirstName") || localStorage.getItem("emyMainPendingSignupFirstName") || "";
          const lastName = localStorage.getItem("emyCustomerLastName") || localStorage.getItem("emyMainPendingSignupLastName") || "";
          const signedInEmail = localStorage.getItem("emyMainSignedInEmail") || "";
          const visibleFirstName = (displayName ? displayName.split(" ")[0] : "") || firstName || ([firstName, lastName].filter(Boolean).join(" ").split(" ")[0]) || (signedInEmail ? signedInEmail.split("@")[0] : "") || "Stephane";
          if (firstNameLabel) firstNameLabel.textContent = visibleFirstName;
          if (headerAvatar) {
            headerAvatar.innerHTML = "S";
            if (currentProfilePhoto) {
              const image = document.createElement("img");
              image.alt = "Stephane profile picture";
              image.src = currentProfilePhoto;
              headerAvatar.innerHTML = "";
              headerAvatar.appendChild(image);
              applyCropStyle(image, currentProfileCrop);
            }
          }
          renderProfilePreview();
          activeSearchLocation = readJson("emyAskLocation", {});
          const askLocation = activeSearchLocation;
          const label = askLocation && (askLocation.location || askLocation.locationLabel);
          if (headerLocationLabel) {
            const fullLabel = String(label || "Current Location").trim();
            headerLocationLabel.textContent = headerLocationText(fullLabel);
            if (headerLocationButton) headerLocationButton.title = fullLabel;
          }
        }

        function cleanRadius(value) {
          const numeric = Number(value);
          return Number.isFinite(numeric) ? Math.min(10, Math.max(1, Math.round(numeric))) : 5;
        }

        function readSavedPlaces() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyCustomerSavedPlaces") || "[]");
            if (!Array.isArray(parsed)) return [];
            return parsed.filter((place) => place && place.address).map((place, index) => ({
              id: String(place.id || "place-" + index),
              label: String(place.label || "Home"),
              address: String(place.address || "").trim(),
              radius: cleanRadius(place.radius),
              latitude: Number.isFinite(Number(place.latitude)) ? Number(place.latitude) : null,
              longitude: Number.isFinite(Number(place.longitude)) ? Number(place.longitude) : null,
              source: "saved"
            }));
          } catch (error) {
            return [];
          }
        }

        function savePlaces() {
          try {
            localStorage.setItem("emyCustomerSavedPlaces", JSON.stringify(searchPlaces));
          } catch (error) {}
        }

        function setModalOpen(modal, isOpen) {
          if (!modal) return;
          modal.classList.toggle("is-open", isOpen);
          modal.setAttribute("aria-hidden", isOpen ? "false" : "true");
        }

        function showToast(message) {
          if (!toast) return;
          toast.textContent = message;
          toast.classList.add("is-visible");
          clearTimeout(toastTimer);
          toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
        }

        function openSearchProfileSourceModal() {
          setModalOpen(profileModal, false);
          setModalOpen(profileSourceModal, true);
        }

        function closeSearchProfileSourceModal(returnToProfile = true) {
          setModalOpen(profileSourceModal, false);
          if (returnToProfile) setModalOpen(profileModal, true);
        }

        function setSearchProfileCameraStatus(message, warning) {
          if (!profileCameraStatus) return;
          profileCameraStatus.textContent = message || "";
          profileCameraStatus.style.color = warning ? "#9a4b00" : "#61708c";
        }

        function stopSearchProfileCamera() {
          if (searchProfileCameraStream) searchProfileCameraStream.getTracks().forEach((track) => track.stop());
          searchProfileCameraStream = null;
          if (profileCameraPreview) profileCameraPreview.srcObject = null;
        }

        async function openSearchProfileCamera() {
          setModalOpen(profileCameraModal, true);
          setSearchProfileCameraStatus("Requesting camera permission...", false);
          if (window.location.protocol === "file:") {
            setSearchProfileCameraStatus("Camera access is blocked in this file preview. Open through localhost or HTTPS, or use Phone/laptop library.", true);
            return;
          }
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setSearchProfileCameraStatus("Camera is not available in this browser. Use Phone/laptop library instead.", true);
            return;
          }
          try {
            stopSearchProfileCamera();
            searchProfileCameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
            if (profileCameraPreview) {
              profileCameraPreview.srcObject = searchProfileCameraStream;
              const playPromise = profileCameraPreview.play();
              if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
            }
            setSearchProfileCameraStatus("Camera ready. Tap Take picture when you are ready.", false);
          } catch (error) {
            setSearchProfileCameraStatus("Camera permission was not allowed. Use Phone/laptop library instead.", true);
          }
        }

        function closeSearchProfileCamera(returnToProfile = true) {
          stopSearchProfileCamera();
          setModalOpen(profileCameraModal, false);
          if (returnToProfile) setModalOpen(profileModal, true);
        }

        function saveSearchProfilePhoto(src) {
          const nextPhoto = String(src || "");
          if (!nextPhoto) return;
          currentProfilePhoto = nextPhoto;
          currentProfileCrop = defaultCrop();
          try {
            syncCustomerProfilePhotoAliases(currentProfilePhoto);
            localStorage.setItem("emyCustomerProfilePhotoCrop", JSON.stringify(currentProfileCrop));
          } catch (error) {}
          renderConnectedHeader();
          setModalOpen(profileModal, true);
          showToast("Profile picture updated.");
        }

        function captureSearchProfileCameraPhoto() {
          if (!profileCameraPreview || !searchProfileCameraStream) {
            setSearchProfileCameraStatus("Camera is not ready yet.", true);
            return;
          }
          const canvas = document.createElement("canvas");
          canvas.width = profileCameraPreview.videoWidth || 720;
          canvas.height = profileCameraPreview.videoHeight || 720;
          const context = canvas.getContext("2d");
          if (!context) return;
          context.drawImage(profileCameraPreview, 0, 0, canvas.width, canvas.height);
          const nextPhoto = canvas.toDataURL("image/jpeg", 0.92);
          closeSearchProfileCamera(false);
          saveSearchProfilePhoto(nextPhoto);
        }

        function chooseSearchProfileSource(source) {
          closeSearchProfileSourceModal(false);
          if (source === "camera") {
            openSearchProfileCamera();
            return;
          }
          if (profileInput) {
            profileInput.value = "";
            profileInput.click();
          }
        }

        function processSearchProfileFile(file) {
          if (!file || !String(file.type || "").startsWith("image/")) return;
          const reader = new FileReader();
          reader.addEventListener("load", () => saveSearchProfilePhoto(reader.result));
          reader.readAsDataURL(file);
        }

        function shortSuggestionLabel(value) {
          const parts = String(value || "").split(",").map((part) => part.trim()).filter(Boolean);
          return parts.slice(0, 2).join(", ") || String(value || "").trim();
        }

        function hidePlaceSuggestions() {
          if (!placeSuggestions || !placeInput) return;
          placeSuggestions.hidden = true;
          placeSuggestions.innerHTML = "";
          currentPlaceSuggestions = [];
          placeInput.setAttribute("aria-expanded", "false");
        }

        function renderPlaceSuggestions(items, message) {
          if (!placeSuggestions || !placeInput) return;
          placeSuggestions.innerHTML = "";
          currentPlaceSuggestions = items;
          if (message) {
            placeSuggestions.innerHTML = '<div class="location-suggestion-empty">' + escapeHtml(message) + '</div>';
            placeSuggestions.hidden = false;
            placeInput.setAttribute("aria-expanded", "true");
            return;
          }
          items.forEach((item, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "location-suggestion";
            button.dataset.suggestionIndex = String(index);
            button.innerHTML = '<strong>' + escapeHtml(shortSuggestionLabel(item.address)) + '</strong><small>' + escapeHtml(item.address) + '</small>';
            placeSuggestions.appendChild(button);
          });
          placeSuggestions.hidden = !items.length;
          placeInput.setAttribute("aria-expanded", items.length ? "true" : "false");
        }

        function uniqueSuggestions(items) {
          const seen = new Set();
          return items.filter((item) => {
            const key = String(item.address || "").toLowerCase();
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
          }).slice(0, 6);
        }

        async function lookupLocationSuggestions(query) {
          const text = String(query || "").trim();
          if (text.length < 3) return [];
          const suggestions = [];
          const compactPostcode = text.replace(/\s+/g, "").toUpperCase();
          try {
            const postcodeResponse = await fetch("https://api.postcodes.io/postcodes/" + encodeURIComponent(compactPostcode) + "/autocomplete", { headers: { Accept: "application/json" } });
            if (postcodeResponse.ok) {
              const postcodeData = await postcodeResponse.json();
              const postcodes = Array.isArray(postcodeData && postcodeData.result) ? postcodeData.result : [];
              postcodes.slice(0, 5).forEach((postcode) => suggestions.push({ address: postcode, latitude: null, longitude: null }));
            }
          } catch (error) {}
          try {
            const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=gb&limit=6&q=" + encodeURIComponent(text);
            const response = await fetch(url, { headers: { Accept: "application/json" } });
            if (response.ok) {
              const data = await response.json();
              (Array.isArray(data) ? data : []).forEach((item) => {
                const latitude = Number(item.lat);
                const longitude = Number(item.lon);
                if (item.display_name && Number.isFinite(latitude) && Number.isFinite(longitude)) {
                  suggestions.push({ address: item.display_name, latitude, longitude });
                }
              });
            }
          } catch (error) {}
          return uniqueSuggestions(suggestions);
        }

        function schedulePlaceSuggestions() {
          selectedPlaceSuggestion = null;
          clearTimeout(suggestionTimer);
          const query = placeInput.value.trim();
          if (query.length < 3) {
            hidePlaceSuggestions();
            return;
          }
          suggestionTimer = setTimeout(async () => {
            const requestId = ++suggestionRequestId;
            renderPlaceSuggestions([], "Searching locations...");
            const suggestions = await lookupLocationSuggestions(query);
            if (requestId !== suggestionRequestId) return;
            if (placeInput.value.trim() !== query) return;
            renderPlaceSuggestions(suggestions, suggestions.length ? "" : "No matching locations found yet. Try a postcode, road, or town.");
          }, 280);
        }

        function setActivePlaceLabel(label) {
          activePlaceLabel = label || "Home";
          placeTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.searchPlaceTab === activePlaceLabel));
        }

        function setSearchRadius(radius, shouldSave) {
          draftSearchRadius = cleanRadius(radius);
          radiusButtons.concat(formRadiusButtons).forEach((button) => button.classList.toggle("is-active", Number(button.dataset.radius) === draftSearchRadius));
          if (shouldSave) {
            saveSearchLocation({ status: "Distance radius set to " + draftSearchRadius + (draftSearchRadius === 1 ? " mile." : " miles.") });
          }
        }

        function openLocationForm(place) {
          editingPlaceId = place ? place.id : "";
          setActivePlaceLabel(place ? place.label : "Home");
          placeInput.value = place ? place.address : "";
          selectedPlaceSuggestion = null;
          hidePlaceSuggestions();
          setSearchRadius(place ? place.radius : draftSearchRadius, false);
          locationStatus.textContent = "";
          locationForm.classList.add("is-open");
          locationAdd.textContent = "Close Add +";
          locationAdd.setAttribute("aria-label", "Close add location form");
          setTimeout(() => placeInput.focus(), 50);
        }

        function closeLocationForm() {
          editingPlaceId = "";
          placeInput.value = "";
          selectedPlaceSuggestion = null;
          hidePlaceSuggestions();
          locationStatus.textContent = "";
          locationForm.classList.remove("is-open");
          locationAdd.textContent = "Add +";
          locationAdd.setAttribute("aria-label", "Add location");
          setActivePlaceLabel("Home");
          setSearchRadius(draftSearchRadius, false);
        }

        async function geocodeAddress(address) {
          const compactPostcode = String(address || "").replace(/\s+/g, "").toUpperCase();
          const looksLikeUkPostcode = /^[A-Z]{1,2}\\d[A-Z\\d]?\\d[A-Z]{2}$/.test(compactPostcode);
          if (looksLikeUkPostcode) {
            try {
              const postcodeResponse = await fetch("https://api.postcodes.io/postcodes/" + encodeURIComponent(compactPostcode), { headers: { Accept: "application/json" } });
              if (postcodeResponse.ok) {
                const postcodeData = await postcodeResponse.json();
                const result = postcodeData && postcodeData.result;
                if (result && Number.isFinite(Number(result.latitude)) && Number.isFinite(Number(result.longitude))) {
                  return { latitude: Number(result.latitude), longitude: Number(result.longitude), address: result.postcode || address };
                }
              }
            } catch (error) {}
          }
          try {
            const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" + encodeURIComponent(address);
            const response = await fetch(url, { headers: { Accept: "application/json" } });
            if (!response.ok) throw new Error("Address lookup failed");
            const data = await response.json();
            const first = Array.isArray(data) ? data[0] : null;
            if (!first) return null;
            const lat = Number(first.lat);
            const lon = Number(first.lon);
            if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
            return { latitude: lat, longitude: lon, address: first.display_name || address };
          } catch (error) {
            return null;
          }
        }

        async function reverseLookup(lat, lon) {
          try {
            const url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon);
            const response = await fetch(url, { headers: { Accept: "application/json" } });
            if (!response.ok) throw new Error("Reverse lookup failed");
            const data = await response.json();
            return data.display_name || "";
          } catch (error) {
            return "";
          }
        }

        function renderSearchLocationPopup() {
          draftSearchLocation = { ...readJson("emyAskLocation", {}) };
          draftSearchRadius = cleanRadius(draftSearchLocation.radius || draftSearchRadius);
          searchPlaces = readSavedPlaces();
          const currentLabel = shortLocationLabel(draftSearchLocation.location || draftSearchLocation.locationLabel || "Current Location");
          const usingCurrent = draftSearchLocation.locationSource === "current" || !draftSearchLocation.location || draftSearchLocation.location === "Near me" || draftSearchLocation.location === "Current Location";
          if (locationTitle) locationTitle.textContent = usingCurrent ? "Using Current Location" : "Use Current Location";
          if (locationDetail) locationDetail.textContent = usingCurrent ? "Within " + draftSearchRadius + (draftSearchRadius === 1 ? " mile" : " miles") + " of " + currentLabel + "." : "Detect your position for nearby businesses and posts.";
          if (currentRadius) currentRadius.hidden = !usingCurrent;
          if (locationRadiusValue) locationRadiusValue.textContent = draftSearchRadius + (draftSearchRadius === 1 ? " mile" : " miles");
          if (locationCurrentButton) {
            locationCurrentButton.classList.toggle("is-selected", usingCurrent);
              locationCurrentButton.setAttribute("aria-pressed", usingCurrent ? "true" : "false");
          }
          setSearchRadius(draftSearchRadius, false);
          if (!locationList) return;
          searchLocationOptions = searchPlaces;
          if (locationEmpty) locationEmpty.hidden = searchPlaces.length > 0;
          if (!searchPlaces.length) locationList.innerHTML = "";
          locationList.innerHTML = searchLocationOptions.map((place, index) => {
            const isActive = shortLocationLabel(draftSearchLocation.location || draftSearchLocation.locationLabel) === shortLocationLabel(place.address);
            return '<div class="place-card' + (isActive ? " is-selected" : "") + '">' +
              '<button class="place-main" type="button" data-search-place="' + index + '">' +
                '<strong>' + escapeHtml(place.label) + '</strong>' +
                '<span>' + escapeHtml(place.address) + '</span>' +
              '</button>' +
              '<div class="place-tools">' +
                '<button class="place-check" type="button" data-search-place="' + index + '" aria-label="Use ' + escapeHtml(place.label) + ' location"></button>' +
                '<button type="button" data-edit-search-place="' + index + '">Edit</button>' +
                '<button type="button" data-delete-search-place="' + index + '">Delete</button>' +
              '</div>' +
            '</div>';
          }).join("");
        }

        function saveSearchLocation(options = {}) {
          const savedLocations = readSavedPlaces().map((place) => place.address).filter(Boolean);
          const address = String(draftSearchLocation.location || draftSearchLocation.locationLabel || "Near me");
          try {
            localStorage.setItem("emyAskLocation", JSON.stringify({
              location: address,
              radius: draftSearchRadius,
              savedLocations,
              latitude: Number.isFinite(Number(draftSearchLocation.latitude)) ? Number(draftSearchLocation.latitude) : null,
              longitude: Number.isFinite(Number(draftSearchLocation.longitude)) ? Number(draftSearchLocation.longitude) : null,
              locationLabel: shortLocationLabel(address),
              locationSource: draftSearchLocation.locationSource || "saved"
            }));
          } catch (error) {}
          activeSearchLocation = readJson("emyAskLocation", {});
          renderConnectedHeader();
          try { if (typeof window.emyContentSyncClearCaches === "function") window.emyContentSyncClearCaches(); } catch (error) {}
          try { renderResults(); } catch (error) {}
          try {
            searchApplyingOwnLocationEvent = true;
            window.dispatchEvent(new CustomEvent("emy:location-changed", { detail: Object.assign({ source: "search-location-save" }, activeSearchLocation) }));
          } catch (error) {
          } finally {
            searchApplyingOwnLocationEvent = false;
          }
          if (options.status && locationStatus) locationStatus.textContent = options.status;
          if (options.close) {
            if (locationForm && locationForm.classList.contains("is-open")) closeLocationForm();
            setModalOpen(locationModal, false);
          }
        }

        function refreshSearchFromStoredLocation() {
          activeSearchLocation = readJson("emyAskLocation", {});
          draftSearchLocation = Object.assign({}, activeSearchLocation);
          draftSearchRadius = Number(activeSearchLocation.radius) || draftSearchRadius || 5;
          try { if (typeof window.emyContentSyncClearCaches === "function") window.emyContentSyncClearCaches(); } catch (error) {}
          try { renderConnectedHeader(); } catch (error) {}
          try { renderSearchLocationPopup(); } catch (error) {}
          try { renderResults(); } catch (error) {}
        }

        if (!window.__EMY_SEARCH_LOCATION_AUTO_REFRESH_BOUND__) {
          window.__EMY_SEARCH_LOCATION_AUTO_REFRESH_BOUND__ = true;
          window.addEventListener("emy:location-changed", () => {
            if (searchApplyingOwnLocationEvent) return;
            refreshSearchFromStoredLocation();
          });
          window.addEventListener("storage", (event) => {
            if (event && event.key === "emyAskLocation") refreshSearchFromStoredLocation();
          });
        }

        function useCurrentSearchLocation() {
          locationStatus.textContent = "Finding your current location...";
          draftSearchLocation = {
            location: "Near me",
            locationLabel: "Current Location",
            latitude: null,
            longitude: null,
            radius: draftSearchRadius,
            locationSource: "current"
          };
          saveSearchLocation();
          renderSearchLocationPopup();
          if (!navigator.geolocation) {
            locationStatus.textContent = "Current location is not available in this browser.";
            return;
          }
          navigator.geolocation.getCurrentPosition(async (position) => {
            const foundAddress = await reverseLookup(position.coords.latitude, position.coords.longitude);
            const address = foundAddress || "Near me";
            draftSearchLocation = {
              location: address,
              locationLabel: shortLocationLabel(address),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              radius: draftSearchRadius,
              locationSource: "current"
            };
            saveSearchLocation({ status: foundAddress ? "Current location saved." : "Current location saved. Address lookup will connect through the location backend." });
            renderSearchLocationPopup();
          }, () => {
            draftSearchLocation = {
              location: "Near me",
              locationLabel: "Current Location",
              latitude: null,
              longitude: null,
              radius: draftSearchRadius,
              locationSource: "current"
            };
            saveSearchLocation({ status: "Location permission was not allowed. You can add an address manually." });
            renderSearchLocationPopup();
          }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
        }

        function deleteSearchPlace(place) {
          try {
            searchPlaces = readSavedPlaces().filter((item) => String(item.id) !== String(place.id) && String(item.address || "") !== String(place.address || ""));
            savePlaces();
          } catch (error) {}
          if (shortLocationLabel(draftSearchLocation.location || draftSearchLocation.locationLabel) === shortLocationLabel(place.address)) {
            draftSearchLocation = { ...readJson("emyAskLocation", {}), locationSource: "current" };
            saveSearchLocation({ status: "Current location saved." });
          }
          renderSearchLocationPopup();
        }

        function selectSearchPlace(place) {
          draftSearchLocation = {
            location: place.address,
            locationLabel: shortLocationLabel(place.address),
            latitude: Number.isFinite(Number(place.latitude)) ? Number(place.latitude) : null,
            longitude: Number.isFinite(Number(place.longitude)) ? Number(place.longitude) : null,
            radius: cleanRadius(place.radius),
            locationSource: "saved"
          };
          draftSearchRadius = cleanRadius(place.radius);
          saveSearchLocation({ close: true });
        }

        function notificationReadJson(key, fallback) {
          try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : fallback;
          } catch (error) {
            return fallback;
          }
        }

        function notificationDataMedia(value) {
          const text = String(value || "").trim();
          return text.indexOf("data:image") === 0 || text.indexOf("data:video") === 0 || text.indexOf("blob:") === 0 || text.indexOf("http://") === 0 || text.indexOf("https://") === 0 ? text : "";
        }
        function notificationMediaRefToken(value, type) {
          const ref = String(value || "").trim();
          if (!ref || notificationDataMedia(ref)) return "";
          return (String(type || "").toLowerCase() === "video" ? "emy-video-ref:" : "emy-ref:") + ref;
        }
        function notificationDirectOrRef(src, ref, type) {
          return notificationDataMedia(src) || notificationMediaRefToken(ref, type);
        }

        function notificationSlug(value) {
          return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        }

        function notificationStoredItems() {
          const keys = ["emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents", "emyBusinessFeedPosts", "emyBusinessPosts", "emyBusinessProducts", "emyBusinessProductPosts", "emyFeedReposts"];
          const items = [];
          keys.forEach((key) => {
            const value = notificationReadJson(key, []);
            const pushItem = (item) => {
              if (!item || typeof item !== "object") return;
              items.push(item);
              if (item.original && typeof item.original === "object") {
                items.push(Object.assign({}, item.original, {
                  id: item.original.id || item.original.feedId || item.originalFeedId || item.feedId,
                  feedId: item.original.feedId || item.original.id || item.originalFeedId || item.feedId,
                  itemTitle: item.original.itemTitle || item.original.title || item.title,
                  businessName: item.original.businessName || item.original.business || item.businessName
                }));
              }
            };
            if (Array.isArray(value)) value.forEach(pushItem);
            else if (value && typeof value === "object") Object.values(value).forEach(pushItem);
          });
          return items;
        }

        function notificationCoverMedia() {
          const cover = notificationReadJson("emyBusinessMediaLibrary", notificationReadJson("emyBusinessCoverMedia", []));
          const item = Array.isArray(cover) ? cover.find((entry) => entry && (entry.src || entry.url || entry.dataUrl || entry.ref || entry.mediaRef)) : null;
          return notificationDirectOrRef(item && (item.src || item.url || item.dataUrl), item && (item.ref || item.mediaRef), item && item.type);
        }

        function notificationMediaFromStorage(item) {
          const ref = item.ref && typeof item.ref === "object" ? item.ref : {};
          const title = notificationSlug(item.itemTitle || item.clipTitle || item.jobTitle || ref.title || ref.productTitle || item.title || item.message);
          const id = String(item.itemId || item.postId || item.productId || item.jobId || item.eventId || ref.feedId || ref.id || item.id || "");
          const businessKey = notificationSlug(item.businessKey || item.key || item.businessName);
          const match = notificationStoredItems().find((entry) => {
            const entryId = String(entry.id || entry.jobId || entry.eventId || "");
            const entryTitle = notificationSlug(entry.itemTitle || entry.jobTitle || entry.title || entry.name || entry.text);
            const entryKey = notificationSlug(entry.businessKey || entry.key || entry.business || entry.actor);
            return (id && entryId && (id === entryId || id.indexOf(entryId) >= 0)) ||
              (title && entryTitle && (entryTitle.indexOf(title) >= 0 || title.indexOf(entryTitle) >= 0)) ||
              (businessKey && entryKey === businessKey && (entry.mediaSrc || entry.mediaRef || entry.image || entry.imageRef || entry.video || entry.videoRef || entry.coverRef || entry.eventCoverRef || entry.jobCoverRef || entry.avatarSrc || (Array.isArray(entry.mediaItems) && entry.mediaItems.length)));
          }) || {};
          const matchMediaItems = Array.isArray(match.mediaItems) ? match.mediaItems : [];
          const firstMedia = matchMediaItems[0] || {};
          const itemSettings = item.mediaSettings && typeof item.mediaSettings === "object" ? item.mediaSettings : {};
          const matchSettings = firstMedia.settings && typeof firstMedia.settings === "object" ? firstMedia.settings : (match.mediaSettings && typeof match.mediaSettings === "object" ? match.mediaSettings : {});
          const businessPhoto = notificationDirectOrRef(localStorage.getItem("emyBusinessProfilePhoto") || localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyBusinessProfilePhotoRef"), "image");
          const pendingRoleForAvatar = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          const customerSignupPhoto = pendingRoleForAvatar === "customer" ? localStorage.getItem("emyMainPendingSignupPhoto") || localStorage.getItem("emyMainPendingSignupPhotoSrc") : "";
          const customerSignupPhotoRef = pendingRoleForAvatar === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "";
          const customerPhoto = notificationDirectOrRef(localStorage.getItem("emyCustomerProfilePhoto") || localStorage.getItem("emyCustomerProfilePhotoSrc") || customerSignupPhoto, localStorage.getItem("emyCustomerProfilePhotoRef") || customerSignupPhotoRef, "image");
          const avatar = notificationDirectOrRef(item.avatar || item.avatarSrc || item.actorPhoto || item.actorAvatar || item.viewerPhoto || item.customerPhoto || item.customerPhotoSrc || item.customerAvatar || item.profilePhoto || item.profilePhotoSrc || item.photo || item.photoSrc || item.imageSrc || item.logo || item.businessPhoto, item.avatarRef || item.actorPhotoRef || item.actorAvatarRef || item.viewerPhotoRef || item.customerPhotoRef || item.customerAvatarRef || item.profilePhotoRef || item.photoRef || item.imageRef || item.logoRef || item.businessPhotoRef, "image") ||
            notificationDirectOrRef(match.avatarSrc || match.avatar || match.actorPhoto || match.viewerPhoto || match.customerPhoto || match.profilePhoto || match.logo || match.photo, match.avatarRef || match.actorPhotoRef || match.viewerPhotoRef || match.customerPhotoRef || match.profilePhotoRef || match.logoRef || match.photoRef, "image") ||
            (businessKey ? businessPhoto : "") ||
            customerPhoto;
          const itemThumb = notificationDirectOrRef(item.thumb || item.thumbnail || item.image || item.coverSrc || item.eventCoverSrc || item.jobCoverSrc || ref.thumb || ref.thumbnail || ref.image || ref.coverSrc, item.thumbRef || item.thumbnailRef || item.imageRef || item.coverRef || item.eventCoverRef || item.jobCoverRef || ref.thumbRef || ref.thumbnailRef || ref.imageRef || ref.coverRef, "image");
          const itemPoster = notificationDirectOrRef(item.posterSrc || item.thumbnailSrc || itemSettings.posterSrc || itemSettings.thumbnailSrc || ref.posterSrc || ref.thumbnailSrc, item.posterRef || item.thumbnailRef || itemSettings.posterRef || itemSettings.thumbnailRef || ref.posterRef || ref.thumbnailRef, "image");
          const itemMain = notificationDirectOrRef(item.mediaSrc || item.video || ref.mediaSrc || ref.video, item.mediaRef || item.videoRef || ref.mediaRef || ref.videoRef, item.mediaType || ref.mediaType);
          const matchPoster = notificationDirectOrRef(firstMedia.posterSrc || firstMedia.thumbnailSrc || match.posterSrc || match.thumbnailSrc || matchSettings.posterSrc || matchSettings.thumbnailSrc, firstMedia.posterRef || firstMedia.thumbnailRef || match.posterRef || match.thumbnailRef || matchSettings.posterRef || matchSettings.thumbnailRef, "image");
          const matchMain = notificationDirectOrRef(firstMedia.src || firstMedia.mediaSrc || match.image || match.video || match.mediaSrc || match.cover || match.coverSrc || match.eventCoverSrc || match.jobCoverSrc, firstMedia.ref || firstMedia.mediaRef || match.mediaRef || match.imageRef || match.videoRef || match.coverRef || match.eventCoverRef || match.jobCoverRef, firstMedia.type || match.mediaType || match.coverType || match.eventCoverType || match.jobCoverType);
          return {
            avatar,
            thumb: itemThumb || itemPoster || itemMain || matchPoster || matchMain
          };
        }

        function markNotificationsSeen() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyCustomerNotifications") || "[]");
            if (!Array.isArray(parsed)) return;
            const next = parsed.map((item) => item && typeof item === "object" ? { ...item, read: true, unread: false } : item);
            localStorage.setItem("emyCustomerNotifications", JSON.stringify(next));
          } catch (error) {}
        }

        function notificationIsSelfAction(item) {
          const type = String(item && item.type || "").toLowerCase();
          const text = [item && item.title, item && item.body, item && item.message].join(" ").toLowerCase();
          const first = String(localStorage.getItem("emyMainPendingSignupFirstName") || "Stephane").trim().toLowerCase();
          const names = ["stephane", first].filter(Boolean);
          const verbs = [" liked", " commented", " replied", " saved", " shared", " interacted", " applied"];
          return item && item.notifyCustomer === false ||
            type === "business-customer" ||
            text.includes("your job post is live") ||
            text.includes("your event is live") ||
            names.some((name) => verbs.some((verb) => text.includes(name + verb)));
        }

        function readNotifications() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyCustomerNotifications") || "[]");
            if (!Array.isArray(parsed)) return [];
            return parsed.filter((item) => !notificationIsSelfAction(item) && !(item && item.hidden)).map((item, index) => {
              const media = notificationMediaFromStorage(item || {});
              return {
                id: String(item.id || "notification-" + index),
                group: String(item.group || item.type || (item.important ? "important" : "more")),
                type: String(item.type || ""),
                title: String(item.title || item.message || ""),
                time: formatNotificationTime(item.time || item.createdAt || item.addedAt),
                rawTime: String(item.time || item.createdAt || item.addedAt || ""),
                businessKey: String(item.businessKey || item.key || ""),
                href: String(item.href || item.url || ""),
                action: String(item.action || item.ref && item.ref.action || ""),
                itemKind: String(item.itemKind || item.kind || item.ref && (item.ref.type || item.ref.kind) || ""),
                itemTitle: String(item.itemTitle || item.productTitle || item.postTitle || item.ref && item.ref.title || ""),
                feedId: String(item.feedId || item.itemId || item.postId || item.productId || item.ref && (item.ref.feedId || item.ref.id) || ""),
                body: String(item.body || item.message || item.text || ""),
                ref: item.ref && typeof item.ref === "object" ? item.ref : null,
                avatar: media.avatar,
                thumb: media.thumb,
                actorName: String(item.actorName || item.customerName || item.viewerName || item.author || item.name || ""),
                initials: String(item.actorName || item.customerName || item.viewerName || item.author || item.name || item.initials || ""),
                unread: item.unread !== false && item.read !== true,
                raw: item
              };
            }).filter((item) => item.title.trim());
          } catch (error) {
            return [];
          }
        }

        function formatNotificationTime(value) {
          if (!value) return "Just now";
          const date = new Date(value);
          if (Number.isNaN(date.getTime())) return String(value);
          const diff = Date.now() - date.getTime();
          const minute = 60 * 1000;
          const hour = 60 * minute;
          const day = 24 * hour;
          if (diff < minute) return "Just now";
          if (diff < hour) return Math.max(1, Math.round(diff / minute)) + " min ago";
          if (diff < day) return Math.max(1, Math.round(diff / hour)) + " hr ago";
          return date.toLocaleDateString(undefined, { day: "numeric", month: "short" }) + ", " + date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
        }

        function mutateStoredNotification(id, updater) {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyCustomerNotifications") || "[]");
            if (!Array.isArray(parsed)) return;
            const next = parsed.map((item, index) => {
              const storedId = String(item.id || "notification-" + index);
              return storedId === id ? updater({ ...item }) : item;
            }).filter(Boolean);
            localStorage.setItem("emyCustomerNotifications", JSON.stringify(next));
          } catch (error) {}
        }

        function notificationKindLabel(item) {
          const ref = item && item.ref && typeof item.ref === "object" ? item.ref : {};
          if (notificationIsBusinessReview(item)) return "Business";
          const text = [item && item.itemKind, item && item.kind, ref.type, ref.kind, item && item.type, item && item.action, item && item.title].join(" ").toLowerCase();
          if (text.includes("reply")) return "Reply";
          if (text.includes("comment")) return "Comment";
          if (text.includes("clip") || text.includes("reel")) return "Clip";
          if (text.includes("product")) return "Product";
          if (text.includes("job")) return "Job";
          if (text.includes("event")) return "Event";
          if (text.includes("image") || text.includes("photo")) return "Image";
          if (text.includes("video")) return "Video";
          if (text.includes("post") || text.includes("feed")) return "Post";
          if (text.includes("message") || text.includes("chat")) return "Message";
          return "Update";
        }
        function notificationIsBusinessReview(item) {
          const ref = item && item.ref && typeof item.ref === "object" ? item.ref : {};
          const identity = [item && item.id, item && item.type, item && item.itemKind, item && item.kind, item && item.action, item && item.target, ref.type, ref.kind, item && item.title].join(" ").toLowerCase();
          const body = [item && item.body, item && item.message, item && item.text].join(" ").toLowerCase();
          return identity.includes("business-review") ||
            identity.includes("business-profile") ||
            identity.includes("business approved") ||
            identity.includes("business rejected") ||
            identity.includes("customer-business-approved") ||
            identity.includes("customer-business-rejected") ||
            ((identity.includes("business") || body.includes("business")) && /(approved|not approved|rejected|review|registration)/.test(identity + " " + body));
        }

        function notificationThumbFallback(item) {
          return notificationKindLabel(item);
        }

        function notificationStorePendingItemDetail(item) {
          try {
            const raw = item && typeof item === "object" ? item : {};
            const wrapped = raw.raw && typeof raw.raw === "object" ? raw.raw : {};
            const ref = raw.ref && typeof raw.ref === "object" ? raw.ref : wrapped.ref && typeof wrapped.ref === "object" ? wrapped.ref : {};
            const detail = raw.detailSnapshot && typeof raw.detailSnapshot === "object" ? raw.detailSnapshot : wrapped.detailSnapshot && typeof wrapped.detailSnapshot === "object" ? wrapped.detailSnapshot : ref.detailSnapshot && typeof ref.detailSnapshot === "object" ? ref.detailSnapshot : raw.original && typeof raw.original === "object" ? raw.original : wrapped.original && typeof wrapped.original === "object" ? wrapped.original : ref.original && typeof ref.original === "object" ? ref.original : ref;
            const clean = (value) => String(value || "").trim();
            const kind = clean(raw.itemKind || raw.kind || detail.itemKind || detail.detailKind || detail.kind || ref.type || ref.kind || notificationKindLabel(item) || "Item");
            const title = clean(raw.itemTitle || detail.itemTitle || detail.title || ref.itemTitle || ref.title || ref.productTitle || raw.productTitle || raw.postTitle || raw.title);
            const feedId = clean(raw.feedId || raw.itemId || raw.postId || raw.productId || detail.feedId || detail.id || ref.feedId || ref.id);
            if (!title && !feedId) return;
            const avatarSrc = clean(raw.detailAvatarSrc || raw.itemAvatarSrc || detail.detailAvatarSrc || detail.itemAvatarSrc || detail.avatarSrc || detail.profilePhoto || detail.businessPhoto || raw.businessPhoto || raw.profilePhoto || ref.detailAvatarSrc || ref.itemAvatarSrc || ref.businessPhoto || ref.profilePhoto);
            const avatarRef = clean(raw.detailAvatarRef || raw.itemAvatarRef || detail.detailAvatarRef || detail.itemAvatarRef || detail.avatarRef || detail.profilePhotoRef || detail.businessPhotoRef || raw.businessPhotoRef || raw.profilePhotoRef || ref.detailAvatarRef || ref.itemAvatarRef || ref.businessPhotoRef || ref.profilePhotoRef);
            localStorage.setItem("emyPendingItemDetailOpen", JSON.stringify({
              createdAt: Date.now(),
              feedId,
              id: feedId,
              businessKey: clean(raw.businessKey || raw.key || detail.businessKey || detail.key || ref.businessKey || ref.key),
              detailKind: kind,
              title: title || kind,
              description: clean(raw.detailDescription || detail.detailDescription || detail.description || detail.text || detail.productDescription || raw.description || ref.description || ref.productDescription || raw.body || raw.message),
              business: clean(detail.businessName || detail.business || raw.businessName || raw.business || ref.businessName || ref.business),
              price: clean(detail.price || detail.productPrice || raw.price || ref.price || ref.productPrice),
              media: clean(detail.mediaClass || detail.media || raw.mediaClass || raw.media || ref.mediaClass || kind),
              mediaSrc: clean(detail.mediaSrc || detail.detailMediaSrc || raw.mediaSrc || ref.mediaSrc),
              mediaRef: clean(detail.mediaRef || detail.detailMediaRef || raw.mediaRef || ref.mediaRef),
              mediaType: clean(detail.mediaType || detail.detailMediaType || raw.mediaType || ref.mediaType),
              posterSrc: clean(detail.posterSrc || detail.detailPosterSrc || raw.posterSrc || ref.posterSrc || raw.thumbnailSrc || ref.thumbnailSrc),
              posterRef: clean(detail.posterRef || detail.detailPosterRef || raw.posterRef || ref.posterRef || raw.thumbnailRef || ref.thumbnailRef),
              avatarSrc,
              avatarRef,
              detailAvatarSrc: avatarSrc,
              detailAvatarRef: avatarRef,
              businessPhoto: avatarSrc,
              businessPhotoRef: avatarRef,
              ref
            }));
          } catch (error) {}
        }
        function notificationOpenItemInPlace(item) {
          try {
            if (!item || notificationIsBusinessReview(item) || typeof window.emyOpenItemDetail !== "function") return false;
            const kindLabel = notificationKindLabel(item);
            const kind = kindLabel.toLowerCase();
            const type = String(item.type || item.action || "").toLowerCase();
            if (type.includes("chat") || type.includes("message") || kind === "message") return false;
            notificationStorePendingItemDetail(item);
            const payload = JSON.parse(localStorage.getItem("emyPendingItemDetailOpen") || "null");
            if (!payload || typeof payload !== "object") return false;
            const titleText = String(payload.title || payload.detailTitle || payload.productTitle || "").trim();
            const feedId = String(payload.feedId || payload.id || payload.productId || "").trim();
            if (!titleText && !feedId) return false;
            const kindText = String(payload.detailKind || payload.kind || payload.type || kindLabel || "Post").trim();
            const kindLower = kindText.toLowerCase();
            const virtualCard = document.createElement("article");
            virtualCard.className = kindLower.includes("clip") || kindLower.includes("reel") ? "card reel-card feed-product-clip-card is-clip" : kindLower.includes("product") ? "card product-card feed-product-card is-product" : "feed-card social-feed-card is-post";
            virtualCard.setAttribute("data-card", "");
            virtualCard.setAttribute("data-open-item-detail", "");
            virtualCard.style.cssText = "position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;pointer-events:none;";
            virtualCard.setAttribute("aria-hidden", "true");
            const setData = (name, value) => {
              const clean = String(value || "").trim();
              if (clean) virtualCard.dataset[name] = clean;
            };
            setData("feedId", feedId);
            setData("businessKey", payload.businessKey || payload.key);
            setData("detailKind", kindText);
            setData("detailTitle", titleText || kindText);
            setData("detailDescription", payload.description || payload.detailDescription || payload.productDescription);
            setData("detailBusiness", payload.business || payload.detailBusiness || payload.businessName);
            setData("detailPrice", payload.price || payload.detailPrice || payload.productPrice);
            setData("detailMedia", payload.media || payload.detailMedia || payload.mediaClass || "feed");
            setData("detailMediaSrc", payload.mediaSrc || payload.detailMediaSrc);
            setData("detailMediaRef", payload.mediaRef || payload.detailMediaRef);
            setData("detailMediaType", payload.mediaType || payload.detailMediaType);
            setData("detailPosterSrc", payload.posterSrc || payload.detailPosterSrc);
            setData("detailPosterRef", payload.posterRef || payload.detailPosterRef);
            setData("detailAvatarSrc", payload.avatarSrc || payload.detailAvatarSrc || payload.businessPhoto || payload.profilePhoto);
            setData("detailAvatarRef", payload.avatarRef || payload.detailAvatarRef || payload.businessPhotoRef || payload.profilePhotoRef);
            setData("profilePhoto", payload.avatarSrc || payload.detailAvatarSrc || payload.businessPhoto || payload.profilePhoto);
            setData("profilePhotoRef", payload.avatarRef || payload.detailAvatarRef || payload.businessPhotoRef || payload.profilePhotoRef);
            setData("businessPhoto", payload.avatarSrc || payload.detailAvatarSrc || payload.businessPhoto || payload.profilePhoto);
            setData("businessPhotoRef", payload.avatarRef || payload.detailAvatarRef || payload.businessPhotoRef || payload.profilePhotoRef);
            setData("detailMeta", payload.meta || payload.detailMeta);
            try { virtualCard.dataset.detailSnapshot = JSON.stringify(payload); } catch (error) {}
            if (Array.isArray(payload.mediaItems) && payload.mediaItems.length) virtualCard.dataset.detailMediaItems = JSON.stringify(payload.mediaItems);
            document.body.appendChild(virtualCard);
            const opened = window.emyOpenItemDetail(virtualCard);
            if (!opened) return false;
            try { localStorage.removeItem("emyPendingItemDetailOpen"); } catch (error) {}
            if (typeof setNotificationsOpen === "function") setNotificationsOpen(false);
            if (typeof showToast === "function") showToast("Opened " + (kindText || "notification item") + " activity.");
            return true;
          } catch (error) {}
          return false;
        }

        function notificationTarget(item) {
          const href = String(item && item.href || "").trim();
          const type = String(item && item.type || "").toLowerCase();
          const kindLabel = notificationKindLabel(item);
          const kind = kindLabel.toLowerCase();
          const action = String(item && item.action || "").trim();
          const feedId = String(item && (item.feedId || item.itemId || item.postId || item.productId) || "").trim();
          const params = [];
          if (notificationIsBusinessReview(item)) {
            const key = String(item && (item.businessKey || item.key) || "profile").trim() || "profile";
            const targetHref = href && /emy-business-profile\.html/i.test(href) && href.indexOf("#notifications") === -1 && !/notificationAction|feedId/i.test(href) ? href : "";
            return targetHref || "emy-business-profile.html?view=customer&business=" + encodeURIComponent(key);
          }
          if (action) params.push("notificationAction=" + encodeURIComponent(action));
          if (feedId) params.push("feedId=" + encodeURIComponent(feedId));
          if (item && item.itemTitle) params.push("item=" + encodeURIComponent(item.itemTitle));
          if (kindLabel) params.push("kind=" + encodeURIComponent(kindLabel));
          if (type.includes("chat") || type.includes("message") || kind === "message") {
            return "emy-customer-chat.html" + (item && item.businessKey ? "?business=" + encodeURIComponent(item.businessKey) : "");
          }
          if (feedId || item && (item.itemTitle || item.ref)) {
            notificationStorePendingItemDetail(item);
            const query = params.length ? "?" + params.join("&") : "";
            if (kind === "clip") return "emy-customer-home.html" + query + "#reels";
            if (kind === "product") return "emy-customer-search.html" + query + "#products";
            return "emy-customer-home.html" + query + "#feeds";
          }
          const profileOnly = /emy-customer-profile\.html/i.test(href) || (/emy-business-profile\.html/i.test(href) && /notificationAction|feedId/i.test(href));
          if (href && href !== "#" && !profileOnly) return href;
          if (item && item.businessKey) return "emy-business-profile.html?business=" + encodeURIComponent(item.businessKey);
          return "emy-customer-home.html#feeds";
        }

        function openNotification(item) {
          if (!item) return;
          mutateStoredNotification(item.id, (stored) => ({ ...stored, read: true, unread: false }));
          if (item.businessKey) {
            try { localStorage.setItem("emySelectedBusinessProfileKey", item.businessKey); } catch (error) {}
          }
          if (notificationOpenItemInPlace(item)) return;
          window.location.href = notificationTarget(item);
        }

        function dismissNotification(id, message) {
          mutateStoredNotification(id, () => null);
          renderNotifications();
          showToast(message || "Notification dismissed.");
        }
        function hideNotification(id, message) {
          mutateStoredNotification(id, (stored) => ({ ...stored, hidden: true, read: true, unread: false }));
          renderNotifications();
          showToast(message || "Notification hidden.");
        }

        function closeNotificationMenus() {
          if (!notificationList) return;
          notificationList.querySelectorAll("[data-notification-menu-panel]").forEach((menu) => { menu.hidden = true; });
          notificationList.querySelectorAll("[data-notification-menu]").forEach((button) => { button.setAttribute("aria-expanded", "false"); });
        }

        function toggleNotificationMenu(id, button) {
          if (!notificationList) return;
          const menu = notificationList.querySelector('[data-notification-menu-panel="' + CSS.escape(id) + '"]');
          if (!menu) return;
          const willOpen = menu.hidden;
          closeNotificationMenus();
          menu.hidden = !willOpen;
          if (button) button.setAttribute("aria-expanded", willOpen ? "true" : "false");
        }

        function turnOffCommentNotifications() {
          try {
            const settings = JSON.parse(localStorage.getItem("emyCustomerNotificationSettings") || "{}");
            settings.profileActivity = false;
            localStorage.setItem("emyCustomerNotificationSettings", JSON.stringify(settings));
          } catch (error) {}
          closeNotificationMenus();
          showToast("Comment activity notifications turned off.");
        }

        function notificationImage(src, className, fallback) {
          let media = String(src || "").trim();
          let ref = "";
          let refType = "";
          if (media.indexOf("emy-video-ref:") === 0) {
            ref = media.slice("emy-video-ref:".length);
            refType = "video";
            media = "";
          } else if (media.indexOf("emy-ref:") === 0) {
            ref = media.slice("emy-ref:".length);
            media = "";
          }
          const isThumb = className.indexOf("thumb") >= 0;
          const label = fallback || (isThumb ? "Update" : "");
          if (!(media || ref)) {
            if (isThumb) {
              const kind = String(label || "Update").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "update";
              return '<span class="' + className + ' is-fallback is-' + escapeHtml(kind) + '"><b>' + escapeHtml(label || "Update") + '</b><small>Open</small></span>';
            }
            return '<span class="' + className + ' is-fallback">' + escapeHtml(label) + '</span>';
          }
          const refAttr = ref ? ' data-emy-media-ref="' + escapeHtml(ref) + '"' : "";
          const isVideo = refType === "video" || /^(data:video|blob:)|\\.(mp4|webm|mov)(\\?|#|$)/i.test(media);
          return '<span class="' + className + '">' + (isVideo ? '<video' + (media ? ' src="' + escapeHtml(media) + '"' : '') + refAttr + ' muted playsinline preload="metadata" aria-hidden="true"></video>' : '<img' + (media ? ' src="' + escapeHtml(media) + '"' : '') + refAttr + ' alt="" />') + '</span>';
        }

        function notificationFallback(item) {
          const source = String(item && (item.actorName || item.customerName || item.viewerName || item.author || item.name || item.initials || item.title) || "").trim();
          const parts = source.split(/\\s+/).filter(Boolean);
          return parts.slice(0, 2).map((word) => word.charAt(0)).join("").toUpperCase() || source.slice(0, 2).toUpperCase() || "?";
        }

        function renderNotificationGroup(title, items) {
          if (!items.length) return '<h3 class="notifications-section-title">' + escapeHtml(title) + '</h3><p class="notifications-empty">You are all caught up for now.</p>';
          return '<h3 class="notifications-section-title">' + escapeHtml(title) + '</h3>' +
            items.map((item) =>
              '<article class="notification-row' + (item.unread ? " is-unread" : "") + '" role="button" tabindex="0" data-notification-id="' + escapeHtml(item.id) + '">' +
                notificationImage(item.avatar, "notification-avatar", notificationFallback(item)) +
                '<div class="notification-text"><strong>' + escapeHtml(item.title) + '</strong><time datetime="' + escapeHtml(item.rawTime) + '">' + escapeHtml(item.time) + '</time></div>' +
                notificationImage(item.thumb, "notification-thumb", notificationThumbFallback(item)) +
                '<button class="notification-more" type="button" data-notification-menu="' + escapeHtml(item.id) + '" aria-label="Notification options" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5.5h.01M12 12h.01M12 18.5h.01" stroke="currentColor" stroke-linecap="round"/></svg></button>' +
                '<div class="notification-action-menu" data-notification-menu-panel="' + escapeHtml(item.id) + '" hidden>' +
                  '<button type="button" data-notification-action="hide" data-notification-action-id="' + escapeHtml(item.id) + '"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3l18 18" stroke="currentColor" stroke-linecap="round"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" stroke="currentColor" stroke-linecap="round"/><path d="M7.5 7.7C5.4 8.9 3.9 10.8 3 12c1.8 2.6 4.8 5.5 9 5.5 1.5 0 2.8-.35 4-.95" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.2 6.7c.58-.13 1.18-.2 1.8-.2 4.2 0 7.2 2.9 9 5.5-.48.7-1.1 1.45-1.85 2.15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Hide this notification</span></button>' +
                  '<button type="button" data-notification-action="comments" data-notification-action-id="' + escapeHtml(item.id) + '"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8Z" stroke="currentColor" stroke-linejoin="round"/><path d="M10 20a2.2 2.2 0 0 0 4 0" stroke="currentColor" stroke-linecap="round"/><path d="M3 3l18 18" stroke="currentColor" stroke-linecap="round"/></svg><span>Turn off notifications for activity on my comments</span></button>' +
                  '<button type="button" data-notification-action="delete" data-notification-action-id="' + escapeHtml(item.id) + '"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 14h8l1-14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Delete this notification</span></button>' +
                '</div>' +
              '</article>'
            ).join("");
        }

        function renderNotifications() {
          const notifications = readNotifications();
          const unreadCount = notifications.filter((item) => item.unread).length;
          if (notificationCount) {
            notificationCount.textContent = String(unreadCount);
            notificationCount.setAttribute("aria-label", unreadCount + " unread notifications");
          }
          if (!notificationList) return;
          if (!notifications.length) {
            notificationList.innerHTML =
              '<h3 class="notifications-section-title">Important</h3>' +
              '<p class="notifications-empty"><strong>No notifications yet</strong>Likes, messages, business approval updates, and nearby alerts will appear here.</p>' +
              '<div class="notifications-divider"></div>' +
              '<h3 class="notifications-section-title">More notifications</h3>' +
              '<p class="notifications-empty">You are all caught up for now.</p>';
            return;
          }
          const important = notifications.filter((item) => item.group === "important" || item.unread);
          const more = notifications.filter((item) => !(item.group === "important" || item.unread));
          notificationList.innerHTML = renderNotificationGroup("Important", important) + '<div class="notifications-divider"></div>' + renderNotificationGroup("More notifications", more);
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(notificationList);
        }

        function positionNotificationsPanel() {
          if (!notificationPanel || !notificationButton) return;
          const rect = notificationButton.getBoundingClientRect();
          const width = Math.min(420, Math.max(280, window.innerWidth - 20));
          const left = Math.min(window.innerWidth - width - 10, Math.max(10, rect.right - width));
          notificationPanel.style.width = width + "px";
          notificationPanel.style.left = left + "px";
          notificationPanel.style.right = "auto";
          notificationPanel.style.top = Math.max(10, rect.bottom + 10) + "px";
          notificationPanel.style.transform = "none";
        }

        function setNotificationsOpen(isOpen) {
          if (!notificationPanel || !notificationButton) return;
          notificationPanel.classList.toggle("is-open", isOpen);
          notificationPanel.setAttribute("aria-hidden", isOpen ? "false" : "true");
          notificationButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
          if (isOpen) {
            markNotificationsSeen();
            renderNotifications();
            positionNotificationsPanel();
          }
        }

        function matchesFilter(item) {
          const state = filterState[activeTab] || {};
          return Object.keys(state).every((key) => !state[key] || String(item[key] || "") === String(state[key]));
        }

        function matchesSearch(item) {
          const query = searchInput.value.trim().toLowerCase();
          if (!query) return true;
          return [item.title, item.description, item.location, item.address, item.category, item.search].join(" ").toLowerCase().includes(query);
        }

        function startMutedClipPreview(card) {
          if (!card) return;
          if (card.classList.contains("is-previewing")) return;
          const now = Date.now();
          const lastStarted = Number(card.dataset.clipPreviewLastStarted || 0);
          if (lastStarted && now - lastStarted < 900) return;
          card.dataset.clipPreviewLastStarted = String(now);
          card.classList.add("is-previewing");
          const video = card.querySelector("video");
          if (!video) return;
          video.muted = true;
          video.defaultMuted = true;
          video.playsInline = true;
          video.setAttribute("muted", "");
          video.setAttribute("playsinline", "");
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
        }

        function scheduleMutedClipPreview(card) {
          if (!card || document.hidden) return;
          if (card._emyClipPreviewTimer) window.clearTimeout(card._emyClipPreviewTimer);
          card._emyClipPreviewTimer = window.setTimeout(() => {
            card._emyClipPreviewTimer = 0;
            if (!card.matches(":hover") && !card.contains(document.activeElement)) return;
            startMutedClipPreview(card);
          }, 180);
        }

        function stopMutedClipPreview(card) {
          if (!card) return;
          if (card._emyClipPreviewTimer) {
            window.clearTimeout(card._emyClipPreviewTimer);
            card._emyClipPreviewTimer = 0;
          }
          card.classList.remove("is-previewing");
          const video = card.querySelector("video");
          if (video) video.pause();
        }

        function setupMutedClipHoverPreviews(root = document) {
          Array.from(root.querySelectorAll(".reel-card")).forEach((card) => {
            if (card.dataset.clipHoverReady === "true") return;
            card.dataset.clipHoverReady = "true";
            card.addEventListener("mouseenter", () => scheduleMutedClipPreview(card));
            card.addEventListener("mouseleave", () => stopMutedClipPreview(card));
            card.addEventListener("focusin", () => scheduleMutedClipPreview(card));
            card.addEventListener("focusout", () => stopMutedClipPreview(card));
          });
        }

        function socialIcon(name) {
          if (name === "comment") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v10.8H9.2L5 19.5v-14Z"/><path d="M8.8 10.8h6.4"/></svg>';
          if (name === "share") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a3 3 0 1 0-2.8-4.05L8.7 7.25a3 3 0 1 0 0 3.5l6.5 3.3A3 3 0 1 0 16 12.5L9.6 9.25"/></svg>';
          if (name === "dislike") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3H8.7a2 2 0 0 0-1.86 1.25L4 11v2h5.5L8.7 19.1A1.7 1.7 0 0 0 10.38 21h.22L17 13.8V5a2 2 0 0 0-1-2Z"/><path d="M17 5h3v8h-3"/></svg>';
          if (name === "repost") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8l-4 4"/><path d="M3 11V9a2.2 2.2 0 0 1 2.2-2.2H21"/><path d="M7 21.2l-4-4 4-4"/><path d="M21 13v2a2.2 2.2 0 0 1-2.2 2.2H3"/></svg>';
          if (name === "save") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.5h11v15L12 16.4l-5.5 3.1v-15Z"/></svg>';
          if (name === "edit") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 18.5 4.2-1 9.4-9.4-3.2-3.2L6 14.3 5 18.5Z"/><path d="m14.5 5.8 3.2 3.2"/></svg>';
          if (name === "delete") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 7.5h11M9 7.5V5h6v2.5M8.2 10l.7 9h6.2l.7-9"/></svg>';
          return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.6 10.6 10.8 4c.5-.9 1.9-.6 1.9.5v5h4.9c1.2 0 2.1 1.1 1.8 2.3l-1.5 5.7c-.3 1.1-1.2 1.8-2.3 1.8H8.4c-.9 0-1.6-.7-1.6-1.6v-6c0-.4.3-.9.8-1.1Z"/><path d="M4.8 10.8v8.4"/></svg>';
        }

        function readEngagementCount(value) {
          const raw = value && value.dataset ? value.dataset.rawCount : "";
          const source = raw !== undefined && raw !== "" ? raw : (value && value.textContent !== undefined ? value.textContent : value);
          const match = String(source || "").replace(/,/g, "").match(/-?\\d+(?:\\.\\d+)?\\s*[kKmM]?/);
          if (!match) return 0;
          const token = match[0].replace(/\\s+/g, "");
          const multiplier = /m$/i.test(token) ? 1000000 : /k$/i.test(token) ? 1000 : 1;
          const number = Number(token.replace(/[kKmM]$/g, ""));
          return Number.isFinite(number) ? Math.max(0, Math.round(number * multiplier)) : 0;
        }
        function formatEngagementCount(value) {
          const count = readEngagementCount(value);
          const format = (divisor, suffix) => {
            const scaled = count / divisor;
            const rounded = scaled >= 10 ? Math.round(scaled) : Math.round(scaled * 10) / 10;
            return String(rounded).replace(/\\.0$/, "") + suffix;
          };
          if (count >= 1000000) return format(1000000, "M");
          if (count >= 1000) return format(1000, "K");
          return String(count);
        }
        function setEngagementCountText(node, value, hideZero) {
          if (!node) return;
          const count = readEngagementCount(value);
          node.dataset.rawCount = String(count);
          node.textContent = hideZero && !count ? "" : formatEngagementCount(count);
        }

        function searchFeedSlug(value) {
          return String(value || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "item";
        }

        function searchFeedOptionsMenu(kind, owned) {
          const target = kind || "post";
          const goLabel = target === "clip" ? "Go to clip" : target === "product" ? "Go to product" : target === "event" ? "Go to event" : target === "article" ? "Go to article" : target === "job" ? "Go to job" : "Go to post";
          return '<div class="feed-options-menu" data-feed-options-menu data-feed-options-kind="' + escapeHtml(target) + '" hidden>' +
            '<button class="is-danger" type="button" data-feed-option="report">Report</button>' +
            '<button type="button" data-feed-option="hide">Not interested</button>' +
            '<button type="button" data-feed-option="open">' + escapeHtml(goLabel) + '</button>' +
            (owned ? '<button type="button" data-feed-option="edit">Edit</button><button class="is-danger" type="button" data-feed-option="delete">Delete</button>' : '') +
            '<button type="button" data-feed-option="copy">Copy link</button>' +
          '</div>';
        }

        function renderSearchComment(comment) {
          const name = comment && comment.name || "Stephane";
          const text = comment && comment.text || "";
          const own = comment && comment.own !== false;
          const avatar = own && currentProfilePhoto ? '<span class="feed-comment-avatar has-image"><img src="' + escapeHtml(currentProfilePhoto) + '" alt="" /></span>' : '<span class="feed-comment-avatar">' + escapeHtml(String(name || "S").charAt(0).toUpperCase()) + '</span>';
          const ownerTools = own ? '<button type="button" data-feed-comment-edit aria-label="Edit comment" title="Edit">' + socialIcon("edit") + '</button><button type="button" data-feed-comment-delete aria-label="Delete comment" title="Delete">' + socialIcon("delete") + '</button>' : "";
          return '<div class="feed-comment" data-feed-comment-row' + (own ? ' data-feed-comment-owned="true"' : '') + '>' + avatar + '<div class="feed-comment-bubble"><strong>' + escapeHtml(name) + '</strong><span data-feed-comment-text>' + escapeHtml(text) + '</span><span class="feed-comment-actions"><button type="button" data-feed-comment-like aria-label="Like comment" title="Like">' + socialIcon("like") + '</button><span class="feed-comment-action-count" data-feed-comment-likes>0 likes</span><button type="button" data-feed-comment-dislike aria-label="Dislike comment" title="Dislike">' + socialIcon("dislike") + '</button><span class="feed-comment-action-count" data-feed-comment-dislikes>0 dislikes</span><button type="button" data-feed-comment-reply aria-label="Reply to comment" title="Reply">Reply</button>' + ownerTools + '</span></div></div>';
        }

        function searchCurrentCustomerName() {
          const stored = (localStorage.getItem("emyCustomerDisplayName") || "").trim();
          const first = (localStorage.getItem("emyMainPendingSignupFirstName") || "").trim();
          const last = (localStorage.getItem("emyMainPendingSignupLastName") || "").trim();
          return stored || (first + " " + last).trim() || "Stephane";
        }
        function searchAskCurrentUser() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyAskCurrentUser") || "{}");
            return parsed && typeof parsed === "object" ? parsed : {};
          } catch (error) {
            return {};
          }
        }
        function searchFirstAvatarValue(values) {
          for (const value of values) {
            const cleanValue = String(value || "").trim();
            if (cleanValue && !/^[A-Za-z]$/.test(cleanValue)) return cleanValue;
          }
          return "";
        }
        function searchCustomerAvatarSrc(item, owned) {
          return searchFirstAvatarValue([
            item && (item.viewerPhoto || item.customerPhoto || item.actorPhoto || item.ownerPhoto || item.avatarSrc || item.avatar || item.profilePhoto || item.photo),
            owned && typeof currentProfilePhoto === "string" ? currentProfilePhoto : "",
            owned ? localStorage.getItem("emyCustomerProfilePhoto") : "",
            owned ? localStorage.getItem("emyCustomerProfilePhotoSrc") : "",
            owned ? localStorage.getItem("emyCustomerProfilePhotoBackup") : "",
            owned ? localStorage.getItem("emyCustomerProfilePhotoSrcBackup") : "",
            owned ? customerPendingSignupPhoto() : ""
          ]);
        }
        function searchCustomerAvatarRef(item, owned) {
          const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          return searchFirstAvatarValue([
            item && (item.viewerPhotoRef || item.customerPhotoRef || item.actorPhotoRef || item.ownerPhotoRef || item.avatarRef || item.profilePhotoRef || item.photoRef),
            owned && typeof currentProfilePhotoRef === "string" ? currentProfilePhotoRef : "",
            owned ? localStorage.getItem("emyCustomerProfilePhotoRef") : "",
            owned ? localStorage.getItem("emyCustomerProfilePhotoRefBackup") : "",
            owned && pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : ""
          ]);
        }
        function searchCurrentBusinessAvatarMedia() {
          const draft = readJson("emyBusinessProfileDraft", {});
          return {
            src: searchBusinessOnlyProfileMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyBusinessProfilePhotoBackup"), localStorage.getItem("emyBusinessProfilePhotoSrcBackup"), localStorage.getItem("emyBusinessProfileImage"), localStorage.getItem("emyBusinessProfileImageSrc"), localStorage.getItem("emyBusinessPhoto"), localStorage.getItem("emyBusinessPhotoSrc"), localStorage.getItem("emyBusinessAvatar"), localStorage.getItem("emyBusinessAvatarSrc"), localStorage.getItem("emyBusinessLogo"), localStorage.getItem("emyBusinessLogoSrc"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), localStorage.getItem("emyMainPendingSignupBusinessPhotoSrc"), draft.photoUrl, draft.profilePhotoUrl, draft.photo, draft.photoSrc, draft.profilePhoto, draft.profilePhotoSrc, draft.businessProfilePhoto, draft.businessProfilePhotoSrc, draft.businessPhoto, draft.businessPhotoSrc, draft.businessAvatar, draft.businessAvatarSrc, draft.businessLogo, draft.businessLogoSrc, draft.logo, draft.logoSrc, draft.image, draft.imageSrc]),
            ref: searchBusinessOnlyProfileMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyBusinessProfilePhotoRefBackup"), localStorage.getItem("emyBusinessProfileImageRef"), localStorage.getItem("emyBusinessPhotoRef"), localStorage.getItem("emyBusinessAvatarRef"), localStorage.getItem("emyBusinessLogoRef"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), draft.photoPublicId, draft.profilePhotoPublicId, draft.photoRef, draft.profilePhotoRef, draft.businessProfilePhotoPublicId, draft.businessProfilePhotoRef, draft.businessPhotoPublicId, draft.businessPhotoRef, draft.businessAvatarPublicId, draft.businessAvatarRef, draft.businessLogoPublicId, draft.businessLogoRef, draft.logoPublicId, draft.logoRef, draft.imagePublicId, draft.imageRef])
          };
        }
        function searchBusinessAvatarRegistryMedia(item, kind) {
          const original = item && item.original && typeof item.original === "object" ? item.original : {};
          const keys = [
            item && item.businessKey,
            item && item.key,
            item && item.ownerKey,
            item && item.profileKey,
            item && item.detailBusinessKey,
            item && item.business,
            item && item.businessName,
            item && item.name,
            item && item.ownerName,
            item && item.actor,
            original.businessKey,
            original.key,
            original.detailBusinessKey,
            original.business,
            original.businessName,
            original.name
          ].map(searchBusinessKey).filter(Boolean);
          if (!keys.length) return "";
          const rows = readCustomerBusinesses();
          for (let index = 0; index < rows.length; index += 1) {
            const row = rows[index] || {};
            const rowKeys = [row.key, row.businessKey, row.profileKey, row.name, row.businessName, row.business, row.title].map(searchBusinessKey).filter(Boolean);
            const matches = rowKeys.some((rowKey) => keys.some((key) => key === rowKey || key.indexOf(rowKey) >= 0 || rowKey.indexOf(key) >= 0));
            if (!matches) continue;
            const media = kind === "ref"
              ? searchBusinessOnlyProfileMedia([row.avatarRef, row.profilePhotoRef, row.businessPhotoRef, row.businessAvatarRef, row.logoRef, row.photoRef, row.imageRef])
              : searchBusinessOnlyProfileMedia([row.avatarSrc, row.avatar, row.profilePhoto, row.profilePhotoSrc, row.businessPhoto, row.businessPhotoSrc, row.businessAvatar, row.logo, row.photo, row.photoSrc, row.image]);
            if (media) return media;
          }
          return "";
        }
        function searchPosterAvatarSrc(item, owned) {
          if (owned) return searchCustomerAvatarSrc(item, true);
          if (searchItemIsCurrentBusiness(item) || searchItemIsCurrentBusiness(item && item.original)) {
            const current = searchCurrentBusinessAvatarMedia();
            if (current.src || current.ref) return current.src;
          }
          const registered = searchBusinessAvatarRegistryMedia(item, "src");
          if (registered) return registered;
          return searchFirstAvatarValue([
            item && (item.businessPhoto || item.businessPhotoSrc || item.businessAvatar || item.businessAvatarSrc || item.businessLogo || item.businessLogoSrc || item.avatarSrc || item.avatar || item.profilePhoto || item.profilePhotoSrc || item.photo),
            item && item.original && (item.original.avatarSrc || item.original.profilePhoto || item.original.businessPhoto || item.original.photo)
          ]);
        }
        function searchPosterAvatarRef(item, owned) {
          if (owned) return searchCustomerAvatarRef(item, true);
          if (searchItemIsCurrentBusiness(item) || searchItemIsCurrentBusiness(item && item.original)) {
            const current = searchCurrentBusinessAvatarMedia();
            if (current.src || current.ref) return current.ref;
          }
          const registered = searchBusinessAvatarRegistryMedia(item, "ref");
          if (registered) return registered;
          return searchFirstAvatarValue([
            item && (item.businessPhotoRef || item.businessAvatarRef || item.businessLogoRef || item.avatarRef || item.profilePhotoRef || item.photoRef),
            item && item.original && (item.original.avatarRef || item.original.profilePhotoRef || item.original.businessPhotoRef || item.original.photoRef)
          ]);
        }
        function searchPosterAvatarHtml(className, avatarMedia, options) {
          const opts = options || {};
          const src = String(opts.src || "").trim();
          const ref = String(opts.ref || "").trim();
          const initial = String(opts.initial || "?").trim().charAt(0).toUpperCase() || "?";
          const href = String(opts.href || "#").trim();
          const linkAttr = String(opts.linkAttr || "");
          const label = String(opts.label || "profile");
          const mediaClass = escapeHtml(String(avatarMedia || "feed").trim() || "feed");
          const hasImage = !!(src || ref);
          const baseClass = String(className || "social-feed-avatar feed-avatar").trim();
          const ownerHint = (href + " " + linkAttr).toLowerCase();
          const shapeClass = ownerHint.indexOf("emy-customer-profile") >= 0 || ownerHint.indexOf("customer-profile") >= 0 || ownerHint.indexOf('data-owner="customer"') >= 0 || ownerHint.indexOf("data-actor-type=\"customer\"") >= 0 || ownerHint.indexOf("data-created-as=\"customer\"") >= 0
            ? " emy-avatar-shape-applied emy-avatar-shape-customer"
            : ownerHint.indexOf("emy-business-profile") >= 0 || ownerHint.indexOf("business=") >= 0 || ownerHint.indexOf("data-business-link") >= 0
            ? " emy-avatar-shape-applied emy-avatar-shape-business"
            : "";
          const inner = hasImage
            ? '<img' + (src ? ' src="' + escapeHtml(src) + '"' : '') + (ref ? ' data-emy-media-ref="' + escapeHtml(ref) + '"' : '') + ' alt="" />'
            : '<span>' + escapeHtml(initial) + '</span>';
          return '<a class="' + escapeHtml(baseClass) + ' ' + mediaClass + (hasImage ? ' has-image' : '') + shapeClass + '" href="' + escapeHtml(href) + '"' + linkAttr + ' aria-label="Open ' + escapeHtml(label) + ' profile">' + inner + '</a>';
        }
        function searchNotificationText(value) {
          return String(value || "").replace(/\\s+/g, " ").trim();
        }
        function searchNotificationSlug(value) {
          return searchNotificationText(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        }
        function searchCurrentCustomerProfileTarget(name) {
          const customerName = searchNotificationText(name || searchCurrentCustomerName());
          const customerEmail = searchNotificationText(localStorage.getItem("emyMainSignedInEmail") || localStorage.getItem("emyMainPendingSignupEmail"));
          const customerKey = searchNotificationText(localStorage.getItem("emyCustomerProfileKey") || localStorage.getItem("emyCustomerKey") || customerEmail || customerName || "customer-profile");
          const href = "emy-customer-profile.html" + (customerKey && customerKey.toLowerCase() !== "customer" && customerKey.toLowerCase() !== "customer-profile" ? "?customer=" + encodeURIComponent(customerKey) : "");
          return { name: customerName, email: customerEmail, key: customerKey, href };
        }
        function searchBusinessNotificationKeys(businessKey, businessName) {
          const values = [businessKey, searchNotificationSlug(businessKey), businessName, searchNotificationSlug(businessName)].map(searchNotificationText).filter(Boolean);
          if (values.includes("angi-pizza-zone")) values.push("angi-pizza");
          if (values.includes("angi-pizza")) values.push("angi-pizza-zone");
          if (values.includes("ever-glow-face-wash")) values.push("ever-glow");
          if (values.includes("ever-glow")) values.push("ever-glow-face-wash");
          return Array.from(new Set(values));
        }
        function searchNotificationItemLabel(card) {
          const kind = searchNotificationText(card && card.dataset && card.dataset.detailKind).toLowerCase();
          if (kind.includes("product")) return "product";
          if (kind.includes("article")) return "article";
          if (kind.includes("clip") || kind.includes("reel")) return "clip";
          if (kind.includes("job")) return "job";
          if (kind.includes("event")) return "event";
          if (kind.includes("business")) return "business profile";
          return "feed update";
        }
        function searchCurrentActorIdentity() {
          const role = String(localStorage.getItem("emyMainSignedInRole") || localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          if (role === "business") {
            const draft = readJson("emyBusinessProfileDraft", {});
            const name = searchNotificationText(draft.businessName || draft.name || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || localStorage.getItem("emyMainPendingSignupBusinessName") || "");
            if (name) {
              return {
                type: "business",
                name,
                key: searchNotificationText(draft.businessKey || draft.key || localStorage.getItem("emyBusinessProfileKey") || localStorage.getItem("emyBusinessKey") || searchNotificationSlug(name) || "profile"),
                photo: searchNotificationText(localStorage.getItem("emyBusinessProfilePhoto") || draft.profilePhoto || draft.photo || draft.avatar || ""),
                photoRef: searchNotificationText(localStorage.getItem("emyBusinessProfilePhotoRef") || draft.profilePhotoRef || draft.photoRef || draft.avatarRef || ""),
                href: "emy-business-profile.html?mode=business"
              };
            }
          }
          return {
            type: "customer",
            name: searchCurrentCustomerName(),
            key: "customer-profile",
            photo: currentProfilePhoto || localStorage.getItem("emyCustomerProfilePhoto") || customerPendingSignupPhoto() || "",
            photoRef: localStorage.getItem("emyCustomerProfilePhotoRef") || "",
            href: "emy-customer-profile.html"
          };
        }
        function searchCardLooksCustomerOwned(card) {
          if (!card) return false;
          const data = card.dataset || {};
          const owner = searchNotificationText(data.owner || data.detailOwner || data.accountType || data.repostActorType).toLowerCase();
          if (owner === "customer") return true;
          if (owner === "business") return false;
          const businessKey = searchNotificationSlug(data.businessKey || data.detailBusinessKey || data.ownerKey || "");
          if (businessKey === "customer-profile") return true;
          if (businessKey) return false;
          const profileHref = String(data.profileHref || data.detailHref || "").toLowerCase();
          if (profileHref.indexOf("emy-customer-profile") >= 0) return true;
          const feedId = String(data.feedId || data.originalFeedId || "").trim().toLowerCase();
          if (/^(customer-post-|user-feed-)/.test(feedId)) return true;
          if (/^feed-create-/.test(feedId) && owner.indexOf("business") === -1 && profileHref.indexOf("emy-business-profile") < 0) return true;
          return card.classList.contains("customer-public-activity-item") ||
            card.classList.contains("home-created-card") ||
            card.classList.contains("is-user-post");
        }
        function searchActorIsCustomerContentOwner(card, actor) {
          if (!card || !actor || actor.type !== "customer" || !searchCardLooksCustomerOwned(card)) return false;
          const data = card.dataset || {};
          const ownerName = searchCurrentCustomerName().trim().toLowerCase();
          const posterName = searchNotificationText(data.detailBusiness || "").trim().toLowerCase();
          if (ownerName && posterName && ownerName === posterName) return true;
          const cardOwnerKey = searchNotificationSlug(data.businessKey || data.detailBusinessKey || data.ownerKey || "");
          const actorKey = searchNotificationSlug(actor.key || "");
          if (cardOwnerKey === "customer-profile" && (!actorKey || actorKey === "customer-profile")) return true;
          return data.owner === "customer" || data.accountType === "customer" || data.actorType === "customer";
        }
        function dispatchSearchCustomerNotificationCreated(detail) {
          try { window.dispatchEvent(new CustomEvent("emy:customer-notification-created", { detail: detail || {} })); } catch (error) {}
        }
        function searchOwnerNotificationBody(body, fallback, actor) {
          let text = searchNotificationText(body || fallback);
          const actorName = searchNotificationText(actor && actor.name);
          const customerName = searchCurrentCustomerName();
          if (actorName && customerName && text.indexOf(customerName) === 0) text = actorName + text.slice(customerName.length);
          if (actorName && text.indexOf("Stephane") === 0) text = actorName + text.slice("Stephane".length);
          return text;
        }
        function pushSearchCustomerOwnerNotification(card, action, body, options = {}) {
          try {
            if (!card) return;
            const actor = searchCurrentActorIdentity();
            if (searchActorIsCustomerContentOwner(card, actor)) return;
            const itemKind = searchNotificationText(options.itemKind || searchNotificationItemLabel(card));
            const itemTitle = searchNotificationText(options.itemTitle || card.dataset.detailTitle || itemKind);
            const feedId = searchNotificationText(card.dataset.feedId || card.dataset.originalFeedId || card.dataset.detailId || "");
            const notification = {
              id: "search-customer-owner-" + action + "-" + (feedId || "item") + "-" + Date.now(),
              type: "customer-" + itemKind.replace(/\s+/g, "-") + "-" + action,
              group: "important",
              title: "Your " + itemKind + " has new activity",
              body: searchOwnerNotificationBody(body, actor.name + " interacted with your " + itemKind + ".", actor),
              itemKind,
              itemTitle,
              actorName: actor.name,
              actorType: actor.type,
              actorKey: actor.key,
              actorHref: actor.href,
              businessName: actor.type === "business" ? actor.name : "",
              avatar: actor.photo,
              avatarSrc: actor.photo,
              avatarRef: actor.photoRef,
              mediaSrc: card.dataset.detailMediaSrc || "",
              mediaRef: card.dataset.detailMediaRef || "",
              mediaType: card.dataset.detailMediaType || "",
              posterSrc: card.dataset.detailPosterSrc || "",
              posterRef: card.dataset.detailPosterRef || "",
              feedId,
              itemId: feedId,
              action,
              href: "emy-customer-profile.html#notifications",
              createdAt: new Date().toISOString(),
              read: false,
              unread: true
            };
            const current = readJson("emyCustomerNotifications", []);
            const list = Array.isArray(current) ? current : [];
            localStorage.setItem("emyCustomerNotifications", JSON.stringify([notification].concat(list.filter((item) => item && item.id !== notification.id)).slice(0, 80)));
            if (typeof renderNotifications === "function") renderNotifications();
            dispatchSearchCustomerNotificationCreated({ action, itemKind, itemTitle, feedId });
          } catch (error) {}
        }
        function pushSearchBusinessNotification(card, action, body, options = {}) {
          try {
            if (!card) return;
            if (searchCardLooksCustomerOwned(card)) {
              pushSearchCustomerOwnerNotification(card, action, body, options);
              return;
            }
            const businessKey = searchNotificationText(card.dataset.businessKey || options.businessKey || "");
            if (!businessKey || businessKey === "customer-profile") return;
            const businessName = searchNotificationText(card.dataset.detailBusiness || options.businessName || card.dataset.detailTitle || "Business");
            const itemKind = searchNotificationText(options.itemKind || searchNotificationItemLabel(card));
            const itemTitle = searchNotificationText(options.itemTitle || card.dataset.detailTitle || itemKind);
            const customerName = searchCurrentCustomerName();
            const customerProfile = searchCurrentCustomerProfileTarget(customerName);
            const customerPhoto = currentProfilePhoto || localStorage.getItem("emyCustomerProfilePhoto") || customerPendingSignupPhoto() || "";
            const customerPhotoRef = localStorage.getItem("emyCustomerProfilePhotoRef") || "";
            const verb = action === "like" || action === "business-like" ? "liked" : action === "save" ? "saved" : action === "share" ? "shared" : action === "repost" ? "reposted" : action.indexOf("comment") >= 0 ? "commented on" : action === "customer-add" ? "added" : "updated";
            const cleanActionTitle = searchNotificationText(options.title || (customerName + " " + verb + ": " + itemTitle));
            const bodyText = searchNotificationText(body || (customerName + " " + verb + " your " + itemKind + ": " + itemTitle + ".")).replace(/^Stephane\\b/, customerName);
            const feedId = searchNotificationText(card.dataset.feedId || card.dataset.originalFeedId || card.dataset.detailId || "");
            const isCustomerRelationshipAction = action === "customer-add" || action === "customer-remove";
            const href = options.href || (isCustomerRelationshipAction ? customerProfile.href : "emy-business-profile.html?mode=business&business=" + encodeURIComponent(businessKey || businessName) + "&notificationAction=" + encodeURIComponent(action || "activity") + (feedId ? "&feedId=" + encodeURIComponent(feedId) : "") + (itemTitle ? "&item=" + encodeURIComponent(itemTitle) : "") + (itemKind ? "&kind=" + encodeURIComponent(itemKind) : ""));
            const notification = {
              id: "search-" + action + "-" + (businessKey || businessName) + "-" + Date.now(),
              type: itemKind.replace(/\\s+/g, "-") + "-" + action,
              group: "business",
              businessKey,
              businessName,
              title: cleanActionTitle,
              body: bodyText,
              itemKind,
              itemTitle,
              customerName,
              customerKey: customerProfile.key,
              customerEmail: customerProfile.email,
              customerHref: customerProfile.href,
              customerProfileHref: customerProfile.href,
              actorName: customerName,
              actorType: "customer",
              actorKey: customerProfile.key,
              actorHref: customerProfile.href,
              avatar: customerPhoto,
              avatarSrc: customerPhoto,
              avatarRef: customerPhotoRef,
              customerPhoto,
              customerPhotoRef,
              mediaSrc: card.dataset.detailMediaSrc || "",
              mediaRef: card.dataset.detailMediaRef || "",
              mediaType: card.dataset.detailMediaType || "",
              posterSrc: card.dataset.detailPosterSrc || "",
              posterRef: card.dataset.detailPosterRef || "",
              href,
              feedId,
              itemId: feedId,
              action,
              createdAt: new Date().toISOString(),
              read: false,
              unread: true
            };
            searchBusinessNotificationKeys(businessKey, businessName).forEach((key) => {
              const rows = readJson("emyBusinessNotifications:" + key, []);
              const list = Array.isArray(rows) ? rows : [];
              localStorage.setItem("emyBusinessNotifications:" + key, JSON.stringify([notification].concat(list.filter((item) => item && item.id !== notification.id)).slice(0, 80)));
            });
          } catch (error) {}
        }

        function readSearchFeedReposts() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyFeedReposts") || "[]");
            const items = Array.isArray(parsed) ? parsed : [];
            return window.emyRepairFeedRepostMedia ? window.emyRepairFeedRepostMedia(items, { persist: true }) : items;
          } catch (error) {
            return [];
          }
        }

        function writeSearchFeedReposts(items) {
          try {
            localStorage.setItem("emyFeedReposts", JSON.stringify(Array.isArray(items) ? items : []));
            window.dispatchEvent(new CustomEvent("emy:feed-reposts-changed", { detail: { key: "emyFeedReposts" } }));
          } catch (error) {}
        }

        const searchFeedActionStateKey = "emyFeedActionState";
        const searchSavedFeedItemsKey = "emySavedFeedItems";
        function readSearchFeedActionState() {
          try {
            const parsed = JSON.parse(localStorage.getItem(searchFeedActionStateKey) || "{}");
            return parsed && typeof parsed === "object" ? parsed : {};
          } catch (error) {
            return {};
          }
        }

        function writeSearchFeedActionState(state) {
          try {
            localStorage.setItem(searchFeedActionStateKey, JSON.stringify(state || {}));
          } catch (error) {}
        }

        function updateSearchFeedState(card, patch) {
          if (!card || !card.dataset.feedId) return;
          const state = readSearchFeedActionState();
          state[card.dataset.feedId] = Object.assign({}, state[card.dataset.feedId] || {}, patch || {});
          writeSearchFeedActionState(state);
        }
        function scheduleSearchFeedHeavyInteraction(callback) {
          const schedule = window.emyScheduleHeavyInteraction;
          if (typeof schedule === "function") {
            schedule(callback, { timeout: 1000 });
            return;
          }
          if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(callback, { timeout: 1000 });
            return;
          }
          window.setTimeout(callback, 60);
        }

        function appendSearchFeedCommentState(card, comment) {
          if (!card || !card.dataset.feedId || !comment || !comment.text) return;
          const state = readSearchFeedActionState();
          const current = Object.assign({}, state[card.dataset.feedId] || {});
          current.comments = (current.comments || []).concat(comment);
          current.commentsOpen = true;
          state[card.dataset.feedId] = current;
          writeSearchFeedActionState(state);
        }

        function searchSavedFeedRecord(card) {
          return {
            id: card && card.dataset.feedId || "",
            kind: card && card.dataset.detailKind || "Feed",
            title: card && card.dataset.detailTitle || "Feed update",
            business: card && card.dataset.detailBusiness || "Business",
            href: "emy-customer-search.html#" + encodeURIComponent(activeTab),
            savedAt: new Date().toISOString()
          };
        }

        function setSearchSavedFeedItem(card, active) {
          try {
            let saved = JSON.parse(localStorage.getItem(searchSavedFeedItemsKey) || "{}");
            if (!saved || typeof saved !== "object" || Array.isArray(saved)) saved = {};
            const record = searchSavedFeedRecord(card);
            if (!record.id) return;
            if (active) saved[record.id] = record;
            else delete saved[record.id];
            localStorage.setItem(searchSavedFeedItemsKey, JSON.stringify(saved));
          } catch (error) {}
        }

        function searchFeedRepostOriginalId(card) {
          return card && (card.dataset.repostOriginalId || card.dataset.originalFeedId || card.dataset.feedId) || "";
        }

        function searchFeedRepostOriginalIdFromRecord(record) {
          return record && (record.originalId || record.originalFeedId || record.feedId || record.original && record.original.id) || "";
        }

        function searchFeedHasRepost(card) {
          const originalId = searchFeedRepostOriginalId(card);
          if (!originalId) return false;
          return readSearchFeedReposts().some((item) => searchFeedRepostOriginalIdFromRecord(item) === originalId);
        }

        function searchFeedRepostCount(card) {
          if (!card || !card.dataset.feedId) return 0;
          const originalId = searchFeedRepostOriginalId(card);
          return readSearchFeedReposts().filter((item) => searchFeedRepostOriginalIdFromRecord(item) === originalId).length;
        }

        function syncSearchFeedRepostCount(card) {
          if (!card) return;
          const count = searchFeedRepostCount(card);
          const active = searchFeedHasRepost(card);
          card.querySelectorAll("[data-feed-repost-count]").forEach((node) => setEngagementCountText(node, count));
          card.querySelectorAll("[data-feed-action='repost']").forEach((button) => {
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
            button.setAttribute("aria-label", active ? "Remove repost" : "Repost");
            button.setAttribute("title", active ? "Remove repost" : "Repost");
          });
        }

        function setSearchFeedCommentToggleLabels(card) {
          if (!card) return;
          const label = card.classList.contains("is-comments-open") ? "Close comments" : "Add a comment";
          card.querySelectorAll(".social-feed-comments-link").forEach((button) => {
            button.dataset.feedCommentLabel = "Add a comment";
            button.textContent = label;
            button.setAttribute("aria-label", label);
          });
        }

        function applySearchFeedState(card) {
          if (!card || !card.dataset.feedId) return;
          const localState = readSearchFeedActionState()[card.dataset.feedId] || {};
          const centralState = window.emyEngagement && typeof window.emyEngagement.stateForCard === "function" ? window.emyEngagement.stateForCard(card) : {};
          const state = Object.assign({}, localState, centralState || {});
          const likedActive = window.emyEngagement && typeof window.emyEngagement.actionActiveForCurrent === "function" ? window.emyEngagement.actionActiveForCurrent(state, "like") : !!state.liked;
          const savedActive = window.emyEngagement && typeof window.emyEngagement.actionActiveForCurrent === "function" ? window.emyEngagement.actionActiveForCurrent(state, "save") : !!state.saved;
          if (state.hidden || state.deleted) card.hidden = true;
          card.classList.toggle("is-comments-open", !!state.commentsOpen);
          setSearchFeedCommentToggleLabels(card);
          const likeButton = card.querySelector("[data-feed-action='like']");
          const saveButton = card.querySelector("[data-feed-action='save'], .social-feed-save, [data-heart]");
          const stat = card.querySelector("[data-feed-stat]");
          const commentsList = card.querySelector("[data-feed-comments-list]");
          if (window.emyApplyFeedEditPatch) window.emyApplyFeedEditPatch(card, state, { setVisibleText: setSearchFeedCardVisibleText });
          else if (state.editedTitle || state.editedText) setSearchFeedCardVisibleText(card, state.editedTitle || card.dataset.detailTitle || "", state.editedText || card.dataset.detailDescription || "");
          if (likeButton) {
            likeButton.classList.toggle("is-active", likedActive);
            likeButton.setAttribute("aria-label", likedActive ? "Liked" : "Like");
          }
          if (saveButton) {
            saveButton.classList.toggle("is-active", savedActive);
            saveButton.classList.toggle("is-liked", savedActive);
            saveButton.setAttribute("aria-pressed", savedActive ? "true" : "false");
            saveButton.setAttribute("aria-label", savedActive ? "Saved" : "Save");
          }
          if (state.countedLikeCount !== undefined) card.querySelectorAll("[data-feed-like-count]").forEach((node) => setEngagementCountText(node, state.countedLikeCount));
          if (state.shareCount !== undefined) card.querySelectorAll("[data-feed-share-count]").forEach((node) => setEngagementCountText(node, state.shareCount));
          if (state.savedCount !== undefined) {
            const savedCount = card.querySelector("[data-product-saved-count]");
            if (savedCount) setEngagementCountText(savedCount, state.savedCount);
          }
          if (stat && state.statText) stat.textContent = state.statText;
          if (commentsList && !commentsList.dataset.feedStateApplied) {
            (state.comments || []).forEach((comment) => {
              if (comment && comment.text) commentsList.insertAdjacentHTML("beforeend", renderSearchComment({ name: comment.name || searchCurrentCustomerName(), text: comment.text, own: comment.own !== false }));
            });
            commentsList.dataset.feedStateApplied = "true";
          }
          if (state.comments && state.comments.length) {
            card.querySelectorAll("[data-feed-comment-count]").forEach((node) => setEngagementCountText(node, Math.max(readEngagementCount(node), state.comments.length)));
          }
          syncSearchFeedRepostCount(card);
          if (window.emyEngagement && typeof window.emyEngagement.syncCard === "function") window.emyEngagement.syncCard(card);
        }

        function syncSearchFeedState(root) {
          (root || results).querySelectorAll("[data-feed-id]").forEach((card) => {
            applySearchFeedState(card);
            if (window.emyEngagement && typeof window.emyEngagement.syncCard === "function") window.emyEngagement.syncCard(card);
          });
        }

        function addSearchFeedRepost(card, thought) {
          if (!card || !card.dataset.feedId) return false;
          const originalId = searchFeedRepostOriginalId(card);
          let mediaItems = [];
          if (card.dataset.detailMediaItems) {
            try {
              const parsed = JSON.parse(card.dataset.detailMediaItems);
              mediaItems = Array.isArray(parsed) ? parsed : [];
            } catch (error) {
              mediaItems = [];
            }
          }
          const record = {
            id: "repost-" + originalId + "-" + Date.now(),
            originalId,
            repostedAt: new Date().toISOString(),
            repostedBy: searchCurrentCustomerName(),
            thought: String(thought || "").trim(),
            repostThought: String(thought || "").trim(),
            original: {
              id: originalId,
              key: card.dataset.businessKey || "",
              business: card.dataset.detailBusiness || "Business",
              kind: card.dataset.detailKind || "Post",
              title: card.dataset.detailTitle || "Feed update",
              text: card.dataset.detailDescription || "",
              media: card.dataset.detailMedia || "feed",
              mediaSrc: card.dataset.detailMediaSrc || "",
              mediaRef: card.dataset.detailMediaRef || "",
              mediaType: card.dataset.detailMediaType || "",
              posterSrc: card.dataset.detailPosterSrc || "",
              posterRef: card.dataset.detailPosterRef || "",
              mediaItems,
              duration: card.dataset.detailDuration || "",
              articleBody: card.dataset.articleBody || card.dataset.detailArticleBody || "",
              articleShare: card.dataset.articleShare || card.dataset.detailArticleShare || "",
              articleReadTime: card.dataset.articleReadTime || card.dataset.detailArticleReadTime || "",
              price: card.dataset.detailPrice || "",
              meta: card.dataset.detailMeta || "",
              href: "emy-customer-search.html#" + encodeURIComponent(activeTab)
            }
          };
          const items = readSearchFeedReposts().filter((item) => searchFeedRepostOriginalIdFromRecord(item) !== record.original.id);
          items.unshift(record);
          writeSearchFeedReposts(items.slice(0, 60));
          return true;
        }

        function removeSearchFeedRepost(card) {
          const originalId = searchFeedRepostOriginalId(card);
          if (!originalId) return false;
          const items = readSearchFeedReposts();
          const next = items.filter((item) => searchFeedRepostOriginalIdFromRecord(item) !== originalId);
          if (next.length === items.length) return false;
          writeSearchFeedReposts(next);
          syncSearchFeedRepostCount(card);
          updateSearchFeedState(card, { reposted: false, repostCount: 0 });
          return true;
        }

        function openSearchRepostDialog(card, onSubmit, options = {}) {
          const title = options.sourceTitle || card && (card.dataset.detailTitle || card.dataset.detailBusiness) || "this post";
          const dialogTitle = options.title || "Repost on EMY";
          const dialogHelp = options.help || "Add your thoughts or repost it straight to your feed.";
          const submitLabel = options.submitLabel || "Repost";
          const initialThought = String(options.initialThought || "");
          const existing = document.querySelector("[data-emy-repost-dialog]");
          if (existing) existing.remove();
          const dialog = document.createElement("div");
          dialog.className = "emy-repost-dialog is-open";
          dialog.setAttribute("data-emy-repost-dialog", "true");
          dialog.innerHTML =
            '<div class="emy-repost-card" role="dialog" aria-modal="true" aria-labelledby="emy-repost-title">' +
              '<div class="emy-repost-head"><div><strong id="emy-repost-title">' + escapeHtml(dialogTitle) + '</strong><span>' + escapeHtml(dialogHelp) + '</span></div><button class="emy-repost-close" type="button" data-emy-repost-cancel aria-label="Close">x</button></div>' +
              '<div class="emy-repost-body"><div class="emy-repost-source">' + escapeHtml(title) + '</div><textarea data-emy-repost-text maxlength="500" placeholder="Add your thoughts..." aria-label="Add your thoughts">' + escapeHtml(initialThought) + '</textarea><div class="emy-repost-actions"><button class="emy-repost-cancel" type="button" data-emy-repost-cancel>Cancel</button><button class="emy-repost-submit" type="button" data-emy-repost-submit>' + escapeHtml(submitLabel) + '</button></div></div>' +
            '</div>';
          const close = () => dialog.remove();
          const submit = () => {
            const textarea = dialog.querySelector("[data-emy-repost-text]");
            const thought = textarea ? textarea.value.trim() : "";
            close();
            if (typeof onSubmit === "function") onSubmit(thought);
          };
          dialog.addEventListener("click", (event) => { if (event.target === dialog) close(); });
          dialog.addEventListener("keydown", (event) => {
            if (event.key === "Escape") close();
            if ((event.ctrlKey || event.metaKey) && event.key === "Enter") submit();
          });
          dialog.querySelectorAll("[data-emy-repost-cancel]").forEach((button) => button.addEventListener("click", close));
          const submitButton = dialog.querySelector("[data-emy-repost-submit]");
          if (submitButton) submitButton.addEventListener("click", submit);
          document.body.appendChild(dialog);
          const textarea = dialog.querySelector("[data-emy-repost-text]");
          if (textarea) {
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
          }
        }

        function editSearchFeedRepostThought(card, options = {}) {
          const isRepost = card && ((card.classList && card.classList.contains("is-repost")) || String(card.dataset && card.dataset.detailKind || "").toLowerCase() === "repost");
          if (!isRepost) return false;
          const repostId = card.dataset.feedId || "";
          const originalId = searchFeedRepostOriginalId(card);
          const items = readSearchFeedReposts();
          const record = items.find((item) => item && item.id === repostId) || items.find((item) => searchFeedRepostOriginalIdFromRecord(item) === originalId);
          if (!record) {
            showToast("EMY could not find this repost to edit.");
            return true;
          }
          const original = record.original || {};
          openSearchRepostDialog(card, (thought) => {
            const next = readSearchFeedReposts().map((item) => {
              const matches = item && (item.id === record.id || (item.id === repostId && repostId) || searchFeedRepostOriginalIdFromRecord(item) === originalId);
              return matches ? Object.assign({}, item, { thought: String(thought || "").trim(), repostThought: String(thought || "").trim() }) : item;
            });
            writeSearchFeedReposts(next);
            renderResults();
            showToast(thought ? "Repost note updated." : "Repost note cleared.");
          }, {
            title: "Edit repost",
            help: "Update only your repost note. The original post stays unchanged.",
            submitLabel: "Save",
            initialThought: record.repostThought || record.thought || "",
            sourceTitle: original.title || card.dataset.detailTitle || "Original post"
          });
          return true;
        }
        window.emyEditRepostThought = editSearchFeedRepostThought;

        function handleSearchFeedRepost(card) {
          if (!card) return;
          if (searchFeedHasRepost(card)) {
            if (removeSearchFeedRepost(card)) showToast("Repost removed.");
            return;
          }
          openSearchRepostDialog(card, (thought) => {
            if (addSearchFeedRepost(card, thought)) {
              syncSearchFeedRepostCount(card);
              updateSearchFeedState(card, { reposted: true, repostCount: searchFeedRepostCount(card) });
              pushSearchBusinessNotification(card, "repost", searchCurrentCustomerName() + " reposted your " + searchNotificationItemLabel(card) + ".");
              showToast(thought ? "Reposted with your thoughts." : "Reposted to your feed.");
            }
          });
        }

        function businessProfileKey(item) {
          return String((item && (item.businessKey || item.key || item.title || item.name)) || "business")
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || "business";
        }

        function uniqueBusinessSearchItems(items) {
          const slots = [];
          const keyToIndex = new Map();
          const normalise = (value) => searchBusinessKey(value);
          function itemKeys(item) {
            const keys = new Set();
            [item.key, item.businessKey, item.profileKey, item.ownerKey].forEach((value) => {
              const key = normalise(value);
              if (key) keys.add("key:" + key);
            });
            [item.title, item.name, item.business].forEach((value) => {
              const key = normalise(value);
              if (key) keys.add("name:" + key);
            });
            return Array.from(keys);
          }
          function itemScore(item) {
            const description = String(item.description || "").trim();
            const address = String(item.address || item.location || "").trim();
            const cover = searchPickBusinessCoverMedia(item);
            let score = 0;
            if (cover || item.coverSrc || item.coverRef || item.video || item.image) score += 30;
            if (item.photo || item.photoRef || item.avatar || item.avatarRef) score += 18;
            if (address && address !== "My Businesses" && address !== "Location to confirm") score += 12;
            if (description && !/^Customer business\./i.test(description)) score += 10;
            if (String(item.distance || "") === "0" || String(item.distance || "") === "0.0") score += 6;
            if (item.customer) score += 4;
            return score;
          }
          function mergeItems(current, incoming) {
            const preferred = itemScore(incoming) > itemScore(current) ? incoming : current;
            const secondary = preferred === incoming ? current : incoming;
            return Object.assign({}, secondary, preferred, {
              customer: !!(current.customer || incoming.customer),
              likes: Math.max(Number(current.likes) || 0, Number(incoming.likes) || 0),
              key: preferred.key || preferred.businessKey || secondary.key || secondary.businessKey || businessProfileKey(preferred),
              businessKey: preferred.businessKey || preferred.key || secondary.businessKey || secondary.key || businessProfileKey(preferred)
            });
          }
          items.filter(Boolean).map((item) => {
            const key = item.key || item.businessKey || businessProfileKey(item);
            return Object.assign({}, item, { key, businessKey: item.businessKey || key });
          }).forEach((item) => {
            const keys = itemKeys(item);
            let index = -1;
            keys.some((key) => {
              if (keyToIndex.has(key)) {
                index = keyToIndex.get(key);
                return true;
              }
              return false;
            });
            if (index < 0) {
              index = slots.length;
              slots.push(item);
            } else {
              slots[index] = mergeItems(slots[index], item);
            }
            itemKeys(slots[index]).concat(keys).forEach((key) => keyToIndex.set(key, index));
          });
          return slots;
        }

        function homeBusinessRowsForSearch() {
          try {
            return typeof realBusinessDeckRows === "function" ? realBusinessDeckRows() : [];
          } catch (error) {
            return [];
          }
        }
        function mapHomeBusinessSearchItem(item) {
          if (!item || searchItemUsesRemovedFakeBusiness(item)) return null;
          const key = item.key || item.businessKey || businessProfileKey({ title: item.name || item.title });
          const title = item.name || item.title || item.business || "";
          if (!title || searchBusinessLooksSampleName(title) || searchBusinessLooksSampleName(key)) return null;
          const statusState = typeof businessDeckStatusState === "function" ? businessDeckStatusState(item) : null;
          const distanceLabel = typeof businessDeckDistanceLabel === "function" ? businessDeckDistanceLabel(item, []) : item.distance || item.distanceText || "";
          return {
            type: "business",
            key,
            businessKey: key,
            category: item.category || item.sector || item.service || "Business",
            distance: distanceLabel || item.distance || item.distanceText || "",
            status: statusState && statusState.isOpen === false ? "closed" : "open",
            statusText: statusState && statusState.label || item.statusText || item.status || "Online and available",
            title,
            name: title,
            business: title,
            description: item.description || "",
            location: item.location || item.address || item.postcode || "Location to confirm",
            address: item.address || item.location || item.postcode || "Location to confirm",
            latitude: item.latitude || item.lat || item.businessLatitude || "",
            longitude: item.longitude || item.lng || item.lon || item.businessLongitude || "",
            media: item.cover ? "profile-video" : item.media || "profile-video",
            photo: item.photo || "",
            photoRef: item.photoRef || "",
            coverSrc: item.cover && item.cover.src || "",
            coverRef: item.cover && item.cover.ref || "",
            coverType: item.cover && item.cover.type || "",
            posterSrc: item.cover && item.cover.posterSrc || "",
            posterRef: item.cover && item.cover.posterRef || "",
            cover: item.cover || null,
            tag: "Business",
            insight: "Insights",
            hours: item.workingDays || item.hours || item.businessHours || "Every day - 9:00 AM - 5:00 PM",
            likes: Number(item.likes || item.likeCount) || 0,
            search: [title, item.description, item.category, item.sector, item.service, item.location, item.address].join(" ")
          };
        }
        function businessSearchItems() {
          const homeItems = homeBusinessRowsForSearch().map(mapHomeBusinessSearchItem).filter(Boolean);
          const fallbackItems = searchWithoutRemovedFakeBusinesses(searchStoredBusinessProfileItems().concat(customerBusinessSearchItems()));
          return uniqueBusinessSearchItems(homeItems.concat(fallbackItems).filter(Boolean).map((item) => Object.assign({}, item, { customer: false, tag: item.tag || "Business" })));
        }

        function followingBusinessSearchItems() {
          return uniqueBusinessSearchItems(customerBusinessSearchItems().map((item) => Object.assign({}, item, { customer: true })));
        }

        function isCustomerBusiness(item, key) {
          if (activeTab === "following" || item.customer) return true;
          const savedKeys = searchCustomerBusinessKeys();
          if (savedKeys.has(searchBusinessKey(key))) return true;
          const title = String(item.title || item.name || "").toLowerCase();
          return readCustomerBusinesses().some((storedItem) => String(storedItem && storedItem.name || "").toLowerCase() === title);
        }

        function searchBusinessCoverControlIcon(name) {
          if (name === "pause") return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z" stroke="currentColor" stroke-linejoin="round"/></svg>';
          if (name === "play") return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z" stroke="currentColor" stroke-linejoin="round"/></svg>';
          if (name === "sound") return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9.5v5h4l5 4v-13l-5 4H4Z" stroke="currentColor" stroke-linejoin="round"/><path d="M16 9.5c.8.7 1.2 1.5 1.2 2.5S16.8 13.9 16 14.5M18.5 7.5c1.4 1.3 2.2 2.8 2.2 4.5s-.8 3.2-2.2 4.5" stroke="currentColor" stroke-linecap="round"/></svg>';
          return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9.5v5h4l5 4v-13l-5 4H4Z" stroke="currentColor" stroke-linejoin="round"/><path d="m18 9 3 3m0-3-3 3" stroke="currentColor" stroke-linecap="round"/></svg>';
        }
        function searchBusinessCoverControlsHtml() {
          return '<div class="business-cover-controls" data-business-cover-controls><button class="business-cover-control is-on" type="button" data-search-business-cover-play aria-pressed="true" aria-label="Pause business video">' + searchBusinessCoverControlIcon("pause") + '</button><button class="business-cover-control" type="button" data-search-business-cover-restart aria-label="Restart business video"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7v5H2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.2 12A7 7 0 1 0 8.1 6.9L7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button><button class="business-cover-control" type="button" data-search-business-cover-mute aria-pressed="true" aria-label="Unmute business video">' + searchBusinessCoverControlIcon("muted") + '</button></div>';
        }
        function businessCoverMediaHtml(item) {
          const cover = searchPickBusinessCoverMedia(item);
          const src = cover && cover.src || item.coverSrc || item.video || item.image || "";
          const ref = cover && cover.ref || item.coverRef || item.videoRef || item.imageRef || "";
          if (!(src || ref)) return "";
          const type = String(cover && cover.type || item.coverType || item.mediaType || (String(src).indexOf("data:video") === 0 ? "video" : "")).toLowerCase();
          const posterSrc = cover && cover.posterSrc || item.posterSrc || item.thumbnailSrc || "";
          const posterRef = cover && cover.posterRef || item.posterRef || item.thumbnailRef || "";
          if (type.indexOf("video") === 0) return '<video data-business-cover-media' + (src ? ' src="' + escapeHtml(src) + '"' : '') + (ref ? ' data-emy-media-ref="' + escapeHtml(ref) + '"' : '') + (posterSrc ? ' poster="' + escapeHtml(posterSrc) + '"' : '') + (posterRef ? ' data-emy-poster-ref="' + escapeHtml(posterRef) + '"' : '') + ' muted loop playsinline autoplay preload="auto"></video>' + searchBusinessCoverControlsHtml();
          return '<img data-business-cover-media' + (src ? ' src="' + escapeHtml(src) + '"' : '') + (ref ? ' data-emy-media-ref="' + escapeHtml(ref) + '"' : '') + ' alt="" />';
        }

        function businessAvatarHtml(item, title) {
          const photo = item.photo || item.avatar || "";
          const photoRef = item.photoRef || item.avatarRef || "";
          if (photo || photoRef) return '<img' + (photo ? ' src="' + escapeHtml(photo) + '"' : '') + (photoRef ? ' data-emy-media-ref="' + escapeHtml(photoRef) + '"' : '') + ' alt="' + escapeHtml(title) + ' profile" />';
          return escapeHtml(String(title || "B").trim().charAt(0).toUpperCase() || "B");
        }

        function formatBusinessDistance(value) {
          const text = String(value || "").trim();
          if (!text) return "";
          if (/mi/i.test(text)) return text;
          const numeric = Number(text);
          if (!Number.isFinite(numeric)) return text;
          return numeric.toFixed(1) + " mi";
        }

        function businessLikeCount(item) {
          const direct = Number(item.likes);
          if (Number.isFinite(direct) && direct > 0) return direct;
          const match = String(item.stats || "").match(/\\d+/);
          return match ? Number(match[0]) || 0 : 0;
        }
        function searchBusinessStatusState(item) {
          try {
            if (typeof businessDeckStatusState === "function") return businessDeckStatusState(item) || { label: "", isOpen: null };
          } catch (error) {}
          const raw = String(item && (item.openStatus || item.hoursStatus || item.statusText || item.status) || "").trim().toLowerCase();
          if (/closed|offline|paused|pause|unavailable/.test(raw)) return { label: "Closed", isOpen: false };
          if (/^open(ed)?$|available|live|approved/.test(raw)) return { label: "Open", isOpen: true };
          const hours = String(item && (item.workingDays || item.hours || item.businessHours || item.openingHours) || "").trim();
          if (hours && !/^(?:in\\s*stock|out\\s*of\\s*stock|low\\s*stock|available|unavailable|sold\\s*out)$/i.test(hours)) {
            if (/open|today|available/i.test(hours)) return { label: "Open", isOpen: true };
            if (/closed/i.test(hours)) return { label: "Closed", isOpen: false };
            return { label: "Hours listed", isOpen: null };
          }
          return { label: "Hours not set", isOpen: null };
        }
        function searchBusinessStatusClass(state) {
          return state && state.isOpen === false ? " closed" : state && state.isOpen === null ? " is-muted" : "";
        }
        function searchBusinessMetaChipClass(value, statusState) {
          const text = String(value || "").trim();
          const lower = text.toLowerCase();
          if (statusState && text === statusState.label) return statusState.isOpen === false ? " is-closed" : statusState.isOpen === null ? " is-hours" : " is-open";
          if (/closed|offline/.test(lower)) return " is-closed";
          if (/\\bopen|today|live|available/.test(lower) && !/^(?:in\\s*stock|out\\s*of\\s*stock|low\\s*stock|sold\\s*out)$/i.test(text)) return " is-open";
          if (/hour|mon|tue|wed|thu|fri|sat|sun|\\d/.test(lower)) return " is-hours";
          if (/road|street|avenue|estate|park|city|town|village|postcode|\\b[A-Z]{1,2}\\d/i.test(text)) return " is-location";
          return " is-category";
        }
        function searchBusinessMetaChipHtml(value, statusState) {
          return '<span class="business-meta-chip' + searchBusinessMetaChipClass(value, statusState) + '">' + escapeHtml(value) + '</span>';
        }
        function syncSearchBusinessCoverControls(photo) {
          const video = photo ? photo.querySelector("video[data-business-cover-media]") : null;
          if (!video) return;
          const playButton = photo.querySelector("[data-search-business-cover-play]");
          const muteButton = photo.querySelector("[data-search-business-cover-mute]");
          if (playButton) {
            const isPlaying = !video.paused && !video.ended;
            playButton.classList.toggle("is-on", isPlaying);
            playButton.setAttribute("aria-pressed", isPlaying ? "true" : "false");
            playButton.setAttribute("aria-label", isPlaying ? "Pause business video" : "Play business video");
            playButton.innerHTML = searchBusinessCoverControlIcon(isPlaying ? "pause" : "play");
          }
          if (muteButton) {
            const isMuted = video.muted || Number(video.volume) <= 0;
            muteButton.classList.toggle("is-on", !isMuted);
            muteButton.setAttribute("aria-pressed", isMuted ? "true" : "false");
            muteButton.setAttribute("aria-label", isMuted ? "Unmute business video" : "Mute business video");
            muteButton.innerHTML = searchBusinessCoverControlIcon(isMuted ? "muted" : "sound");
          }
        }
        function playSearchBusinessCoverVideo(video, photo) {
          if (!video || video.dataset.searchBusinessCoverUserPaused === "true" || document.hidden) return;
          video.muted = true;
          video.defaultMuted = true;
          video.loop = true;
          video.playsInline = true;
          video.setAttribute("muted", "");
          video.setAttribute("playsinline", "");
          video.setAttribute("preload", "auto");
          if ((video.currentSrc || video.getAttribute("src")) && video.readyState === 0) {
            try { video.load(); } catch (error) {}
          }
          if (window.emyPauseOtherMedia) window.emyPauseOtherMedia(video);
          const promise = video.play();
          if (promise && typeof promise.then === "function") {
            promise.then(() => syncSearchBusinessCoverControls(photo)).catch(() => syncSearchBusinessCoverControls(photo));
          } else {
            syncSearchBusinessCoverControls(photo);
          }
        }
        function setupSearchBusinessCoverVideos(root = document) {
          const scope = root && root.querySelectorAll ? root : document;
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(scope);
          scope.querySelectorAll("video[data-business-cover-media]").forEach((video) => {
            const photo = video.closest(".photo") || video.closest("[data-business-card]") || video.parentElement;
            if (!video.dataset.searchBusinessCoverUserPaused) video.dataset.searchBusinessCoverUserPaused = "false";
            if (video.dataset.searchBusinessCoverEventsBound !== "true") {
              video.dataset.searchBusinessCoverEventsBound = "true";
              ["play", "pause", "ended", "volumechange", "loadedmetadata", "canplay"].forEach((type) => {
                video.addEventListener(type, () => syncSearchBusinessCoverControls(photo));
              });
              ["loadedmetadata", "canplay", "canplaythrough"].forEach((type) => {
                video.addEventListener(type, () => playSearchBusinessCoverVideo(video, photo));
              });
              if (photo) {
                photo.addEventListener("mouseenter", () => playSearchBusinessCoverVideo(video, photo));
                photo.addEventListener("pointerenter", () => playSearchBusinessCoverVideo(video, photo));
                photo.addEventListener("focusin", () => playSearchBusinessCoverVideo(video, photo));
              }
            }
            playSearchBusinessCoverVideo(video, photo);
            if (video.dataset.searchBusinessCoverHydrationRetry !== "true") {
              video.dataset.searchBusinessCoverHydrationRetry = "true";
              window.setTimeout(() => {
                if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(photo || video);
                playSearchBusinessCoverVideo(video, photo);
              }, 180);
              window.setTimeout(() => playSearchBusinessCoverVideo(video, photo), 700);
            }
          });
        }
        function handleSearchBusinessCoverControlPress(event) {
          if (!event || !event.target || !event.target.closest) return false;
          const playButton = event.target.closest("[data-search-business-cover-play]");
          const restartButton = event.target.closest("[data-search-business-cover-restart]");
          const muteButton = event.target.closest("[data-search-business-cover-mute]");
          const button = playButton || restartButton || muteButton;
          if (!button) return false;
          event.preventDefault();
          event.stopPropagation();
          if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
          const photo = button.closest(".photo") || button.closest("[data-business-card]");
          const video = photo ? photo.querySelector("video[data-business-cover-media]") : null;
          if (!video) return true;
          if (restartButton) {
            try { video.currentTime = 0; } catch (error) {}
            video.dataset.searchBusinessCoverUserPaused = "false";
            playSearchBusinessCoverVideo(video, photo);
            return true;
          }
          if (playButton) {
            if (video.paused || video.ended) {
              video.dataset.searchBusinessCoverUserPaused = "false";
              playSearchBusinessCoverVideo(video, photo);
            } else {
              video.dataset.searchBusinessCoverUserPaused = "true";
              video.pause();
              syncSearchBusinessCoverControls(photo);
            }
            return true;
          }
          if (muteButton) {
            const nextMuted = !(video.muted || Number(video.volume) <= 0);
            video.muted = nextMuted;
            video.defaultMuted = nextMuted;
            if (!nextMuted && Number(video.volume) <= 0) {
              try { video.volume = 0.8; } catch (error) {}
            }
            syncSearchBusinessCoverControls(photo);
            if (!nextMuted && (video.paused || video.ended)) playSearchBusinessCoverVideo(video, photo);
            return true;
          }
          return true;
        }

        function searchBusinessHomeMedia(item, key, media) {
          const text = [media, key, item && (item.title || item.name || item.business), item && item.category].join(" ").toLowerCase();
          if (text.indexOf("pizza") >= 0 || text.indexOf("food") >= 0) return "pizza";
          if (text.indexOf("glow") >= 0 || text.indexOf("beauty") >= 0 || text.indexOf("shop") >= 0 || text.indexOf("retail") >= 0) return "shop";
          if (text.indexOf("tech") >= 0 || text.indexOf("phone") >= 0 || text.indexOf("mobile") >= 0 || text.indexOf("business-111") >= 0) return "tech";
          if (text.indexOf("bottle") >= 0 || text.indexOf("product") >= 0) return "bottle";
          if (text.indexOf("feed") >= 0 || text.indexOf("consult") >= 0) return "feed";
          return "tech";
        }

        function renderSearchBusinessProfileCard(item) {
          const key = item.key || item.businessKey || businessProfileKey(item);
          const titleText = item.title || item.name || item.business || "Business";
          const description = item.description || item.text || "Open this business to see profile details, posts, products, clips and updates.";
          const address = item.address || item.location || "Location to confirm";
          const category = item.category || "Business";
          const statusState = searchBusinessStatusState(item);
          const statusText = statusState.label && statusState.isOpen !== null ? statusState.label : item.statusText || (item.status === "closed" ? "Offline" : "Status not set");
          const footerStatus = statusState.label || (item.status === "closed" ? "Closed" : "Hours not set");
          let distanceText = item.distance || item.distanceText || item.milesText || "";
          try {
            const distanceItem = Object.assign({}, item);
            const rawDistance = firstClean([item.distance, item.distanceText, item.milesText]);
            if (/^(?:0(?:\.0+)?\s*(?:mi|mile|miles)?|0)$/i.test(rawDistance)) {
              delete distanceItem.distance;
              delete distanceItem.distanceText;
              delete distanceItem.milesText;
            }
            distanceText = businessDeckDistanceLabel(distanceItem, businessCategories(item, []));
          } catch (error) {
            distanceText = distanceText || (address && address !== "Location to confirm" ? "Location saved" : "Distance not set");
          }
          const media = item.media || "profile-video";
          const tag = item.tag || (activeTab === "following" ? "Customer" : "New business");
          const href = "emy-business-profile.html?business=" + encodeURIComponent(key);
          const detailMeta = [statusText, distanceText, address, category].filter(Boolean).join("|");
          const likeCount = businessLikeCount(item);
          const coverInner = businessCoverMediaHtml(item);
          const avatarInner = businessAvatarHtml(item, titleText);
          const avatarClass = item.photo || item.photoRef || item.avatar || item.avatarRef ? "business-avatar has-image" : "business-avatar";
          const feedId = item.id || ("search-business-" + key);
          const mediaClass = searchBusinessHomeMedia(item, key, media);
          const coverClass = coverInner ? " has-media" : "";
          const followingCard = activeTab === "following" || item.customer;
          const customerCard = isCustomerBusiness(item, key);
          const profileMeta = [category].filter(Boolean).slice(0, 3).map((value) => searchBusinessMetaChipHtml(value, statusState)).join("");
          const customerBadge = customerCard ? '<span class="business-customer-badge" data-business-customer-badge>Customer</span>' : "";
          const descriptionHtml = description ? '<p class="business-description">' + escapeHtml(description) + '</p>' : "";
          return '<article class="card business-card home-flow-item is-business' + (followingCard ? ' is-following-business' : '') + (customerCard ? ' is-customer-business' : '') + '" data-card data-feed-id="' + escapeHtml(feedId) + '" data-business-card data-business-key="' + escapeHtml(key) + '" data-detail-kind="Business" data-detail-title="' + escapeHtml(titleText) + '" data-detail-description="' + escapeHtml(description) + '" data-detail-business="' + escapeHtml(titleText) + '" data-detail-price="" data-detail-media="' + escapeHtml(mediaClass) + '" data-detail-meta="' + escapeHtml(detailMeta) + '" data-search-text="' + escapeHtml([titleText, description, address, category, statusText, tag].join(" ").toLowerCase()) + '">' +
            '<div class="photo ' + escapeHtml(mediaClass) + coverClass + '">' + coverInner +
              '<a class="' + escapeHtml(avatarClass) + '" href="' + escapeHtml(href) + '" data-business-link="' + escapeHtml(key) + '" aria-label="Open ' + escapeHtml(titleText) + ' profile">' + avatarInner + '</a>' +
              '<a class="business-media-chip" href="' + escapeHtml(href) + '" data-business-link="' + escapeHtml(key) + '">Profile</a>' +
            '</div>' +
            '<div class="body">' +
              '<h3><a class="business-title-link" href="' + escapeHtml(href) + '" data-business-link="' + escapeHtml(key) + '">' + escapeHtml(titleText) + '</a></h3>' +
              descriptionHtml +
              '<p class="business-address">' + escapeHtml(address) + '</p>' +
              (profileMeta ? '<div class="business-profile-meta">' + profileMeta + '</div>' : '') +
              '<div class="business-card-actions">' + customerBadge + '<button class="business-like-button" type="button" data-search-business-like aria-pressed="false"><span class="emy-business-like-icon" aria-hidden="true"><svg class="emy-business-like-bag" viewBox="0 0 24 24" fill="none" focusable="false" aria-hidden="true"><path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/><path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/><path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/><path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/></svg></span><span data-business-like-label>Like business</span><strong data-business-like-count data-raw-count="' + escapeHtml(String(likeCount)) + '">' + formatEngagementCount(likeCount) + '</strong></button></div>' +
              '<div class="status-row"><span class="status' + searchBusinessStatusClass(statusState) + '">' + escapeHtml(footerStatus) + '</span><span class="distance">' + escapeHtml(distanceText || "Distance not set") + '</span></div>' +
            '</div>' +
          '</article>';
        }

        function searchMediaEditStyle(item) {
          const settings = item && item.mediaSettings && typeof item.mediaSettings === "object" ? item.mediaSettings : {};
          const styles = [];
          if (settings.fit) styles.push("--media-fit:" + escapeHtml(settings.fit));
          if (settings.zoom) styles.push("--media-zoom:" + escapeHtml(settings.zoom));
          if (settings.x !== undefined) styles.push("--media-x:" + escapeHtml(settings.x) + "%");
          if (settings.y !== undefined) styles.push("--media-y:" + escapeHtml(settings.y) + "%");
          if (settings.aspect && settings.aspect !== "auto") styles.push("--media-aspect-ratio:" + escapeHtml(settings.aspect));
          styles.push("--overlay-x:" + escapeHtml(Number(settings.overlayX) || 50) + "%");
          styles.push("--overlay-y:" + escapeHtml(Number(settings.overlayY) || 84) + "%");
          return styles.length ? ' style="' + styles.join(";") + ';"' : "";
        }

        function searchMediaOverlayHtml(item) {
          const settings = item && item.mediaSettings && typeof item.mediaSettings === "object" ? item.mediaSettings : {};
          const overlay = String(item && (item.mediaOverlay || settings.overlay) || "").trim();
          return overlay ? '<span class="emy-media-overlay-text" data-emy-media-overlay>' + escapeHtml(overlay) + '</span>' : "";
        }

        function searchCloudinaryCloudName() {
          const backendConfig = window.EMY_REAL_BACKEND_CONFIG && window.EMY_REAL_BACKEND_CONFIG.cloudinary;
          const authConfig = window.emyRealAuth && window.emyRealAuth.config && window.emyRealAuth.config.cloudinary;
          return String((backendConfig && backendConfig.cloudName) || (authConfig && authConfig.cloudName) || "dupytlsjv").trim() || "dupytlsjv";
        }

        function searchCloudinaryMediaUrl(publicId, type) {
          let clean = String(publicId || "").trim();
          if (!clean) return "";
          if (/^(https?:\/\/|data:image\/|data:video\/|blob:)/i.test(clean)) return clean;
          clean = clean.replace(/^emy-video-ref:/i, "").replace(/^emy-ref:/i, "");
          if (!clean) return "";
          const resource = String(type || "").toLowerCase() === "video" ? "video" : "image";
          const encodedId = clean.split("/").map((part) => encodeURIComponent(part)).join("/");
          return "https://res.cloudinary.com/" + encodeURIComponent(searchCloudinaryCloudName()) + "/" + resource + "/upload/" + encodedId;
        }

        function searchItemMediaRemoved(item) {
          return !!(item && (item.mediaRemoved === true || item.mediaDeleted === true || item.mediaClearedAt || item.removed === true || item.deleted === true || item.deletedAt));
        }

        function searchCloudinaryPublicId(item) {
          if (searchItemMediaRemoved(item)) return "";
          return String(item && (item.cloudinaryPublicId || item.mediaPublicId || item.imagePublicId || item.videoPublicId || item.publicId) || "").trim();
        }

        function searchCloudinaryPosterPublicId(item) {
          if (searchItemMediaRemoved(item)) return "";
          return String(item && (item.cloudinaryPosterPublicId || item.posterPublicId || item.thumbnailPublicId) || "").trim();
        }

        function searchCloudinaryResourceType(item, fallbackType) {
          const explicit = String(item && (item.cloudinaryResourceType || item.resourceType || item.mediaResourceType || item.mediaType || item.type) || fallbackType || "").toLowerCase();
          return explicit === "video" || explicit === "clip" || explicit === "reel" ? "video" : "image";
        }

        function searchMediaMarkup(payload, titleText, options) {
          if (!payload) return "";
          if (searchItemMediaRemoved(payload)) return "";
          const isClipMedia = !!(options && options.clip);
          const items = Array.isArray(payload.mediaItems) ? payload.mediaItems : [];
          if (items.length > 1 && window.emyFeedMediaCarouselMarkup) return window.emyFeedMediaCarouselMarkup(items, { label: titleText || "Post media" });
          const singleItem = items.length === 1 && window.emyFeedPublicMediaItems ? window.emyFeedPublicMediaItems(items)[0] : null;
          const src = payload.mediaSrc || (singleItem && singleItem.src) || searchCloudinaryMediaUrl(searchCloudinaryPublicId(payload), searchCloudinaryResourceType(payload, payload.mediaType));
          const ref = payload.mediaRef || (singleItem && singleItem.ref) || "";
          const mediaType = payload.mediaType || (singleItem && singleItem.type) || "";
          const settings = payload.mediaSettings || {};
          const posterRef = payload.posterRef || payload.thumbnailRef || settings.posterRef || settings.thumbnailRef || "";
          const posterSrc = posterRef ? "" : (payload.posterSrc || payload.thumbnailSrc || settings.posterSrc || settings.thumbnailSrc || searchCloudinaryMediaUrl(searchCloudinaryPosterPublicId(payload), "image"));
          if (!(src || ref)) return "";
          if (mediaType === "video") {
            if (isClipMedia) return '<video' + (src ? ' src="' + escapeHtml(src) + '"' : '') + (ref ? ' data-emy-media-ref="' + escapeHtml(ref) + '"' : '') + (posterSrc ? ' poster="' + escapeHtml(posterSrc) + '"' : '') + (posterRef ? ' data-emy-poster-ref="' + escapeHtml(posterRef) + '"' : '') + ' muted playsinline preload="metadata"></video>';
            return window.emyVideoPlayerMarkup
              ? window.emyVideoPlayerMarkup(src, titleText || "Video", ref, posterSrc, posterRef)
              : '<video' + (src ? ' src="' + escapeHtml(src) + '"' : '') + (ref ? ' data-emy-media-ref="' + escapeHtml(ref) + '"' : '') + (posterSrc ? ' poster="' + escapeHtml(posterSrc) + '"' : '') + (posterRef ? ' data-emy-poster-ref="' + escapeHtml(posterRef) + '"' : '') + ' controls playsinline preload="metadata"></video>';
          }
          return '<img' + (src ? ' src="' + escapeHtml(src) + '"' : '') + (ref ? ' data-emy-media-ref="' + escapeHtml(ref) + '"' : '') + ' alt="" />';
        }

        function searchCoverMediaMarkup(payload, titleText, className, markerAttr) {
          if (!payload) return "";
          if (searchItemMediaRemoved(payload)) return "";
          const src = payload.mediaSrc || searchCloudinaryMediaUrl(searchCloudinaryPublicId(payload), searchCloudinaryResourceType(payload, payload.mediaType));
          const ref = payload.mediaRef || "";
          const settings = payload.mediaSettings || {};
          const posterRef = payload.posterRef || payload.thumbnailRef || settings.posterRef || settings.thumbnailRef || "";
          const posterSrc = posterRef ? "" : (payload.posterSrc || payload.thumbnailSrc || settings.posterSrc || settings.thumbnailSrc || searchCloudinaryMediaUrl(searchCloudinaryPosterPublicId(payload), "image"));
          if (!(src || ref)) return "";
          const marker = markerAttr ? " " + markerAttr : "";
          const attrs = ' class="' + escapeHtml(className) + '"' + marker + (src ? ' src="' + escapeHtml(src) + '"' : '') + (ref ? ' data-emy-media-ref="' + escapeHtml(ref) + '"' : '') + (payload.mediaType === "video" && posterSrc ? ' poster="' + escapeHtml(posterSrc) + '"' : '') + (payload.mediaType === "video" && posterRef ? ' data-emy-poster-ref="' + escapeHtml(posterRef) + '"' : '');
          return payload.mediaType === "video"
            ? '<video' + attrs + ' muted playsinline preload="metadata"></video>'
            : '<img' + attrs + ' alt="" />';
        }

        function searchCountedActionFooter(statText, captionHtml, commentCount, timeText) {
          return '<span class="search-feed-time-only social-feed-time">' + escapeHtml(timeText || "Just now") + '</span>';
        }

        function searchProductActionFooter(statText, commentCount, timeText) {
          return '<span class="search-feed-time-only social-feed-time">' + escapeHtml(timeText || "Open now") + '</span>';
        }

        function renderSearchFeedCard(item, index) {
          const rawType = item.type === "reel" ? "clip" : (item.type || "product");
          const isProductClip = item.type === "reel" && (item.reelType === "product" || searchLooksProductClip(item, "search-render"));
          const kind = isProductClip ? "clip" : rawType;
          const detailKind = item.detailKind || (isProductClip ? "Product Clip" : kind === "clip" ? "Clip" : kind === "post" ? "Post" : "Product");
          const detailKindKey = String(detailKind || "").toLowerCase();
          const baseTitle = isProductClip ? (item.productName || item.title || "Product clip") : (item.title || "Update");
          const titleText = kind === "product" ? searchProductHomeTitle(baseTitle) : baseTitle;
          const description = isProductClip ? (item.productInfo || item.description || "") : kind === "product" ? searchProductHomeDescription(item, item.description || "") : (item.description || "");
          const owned = item.isUserPost === true || item.owner === "customer" || item.key === "customer-profile" || item.profileHref === "emy-customer-profile.html";
          const media = kind === "product" ? searchProductHomeMedia(item, item.media || "feed") : (item.media || "feed");
          const businessLabel = owned ? (item.businessName || item.business || item.actor || searchCurrentCustomerName()) : item.businessName || (item.source === "customer" ? "My Business" : "Nearby business");
          const profileKey = owned ? "customer-profile" : businessProfileKey(item.businessName ? { title: item.businessName } : item);
          const profileHref = item.profileHref || (owned ? "emy-customer-profile.html" : "emy-business-profile.html?business=" + encodeURIComponent(profileKey));
          const profileLinkAttr = owned ? "" : ' data-business-link="' + escapeHtml(profileKey) + '"';
          const feedId = item.id || ("search-" + activeTab + "-" + index + "-" + profileKey + "-" + searchFeedSlug(titleText));
          const priceText = kind === "product" || isProductClip ? (item.priceText || "") : "";
          const productAvailability = kind === "product" ? searchProductAvailability(item) : "";
          const likes = Number(item.likes) || 0;
          const saved = Number(item.saved) || 0;
          const payload = {
            mediaItems: Array.isArray(item.mediaItems) ? item.mediaItems : [],
            mediaSrc: item.mediaSrc || "",
            mediaRef: item.mediaRef || "",
            mediaType: item.mediaType || "",
            mediaRemoved: item.mediaRemoved === true || item.mediaDeleted === true || !!item.mediaClearedAt,
            cloudinaryPublicId: item.cloudinaryPublicId || item.mediaPublicId || item.imagePublicId || item.videoPublicId || "",
            cloudinaryResourceType: item.cloudinaryResourceType || item.resourceType || item.mediaResourceType || "",
            cloudinaryPosterPublicId: item.cloudinaryPosterPublicId || item.posterPublicId || item.thumbnailPublicId || "",
            posterSrc: item.posterSrc || item.thumbnailSrc || "",
            posterRef: item.posterRef || item.thumbnailRef || "",
            mediaSettings: item.mediaSettings || null,
            mediaOverlay: item.mediaOverlay || ""
          };
          const mediaInner = searchMediaMarkup(payload, titleText, { clip: kind === "clip" });
          const mediaOverlay = searchMediaOverlayHtml(payload);
          const mediaStateClass = payload.mediaType ? ' has-' + escapeHtml(payload.mediaType) + '-media' : "";
          const mediaItemsAttr = payload.mediaItems.length > 1 && window.emyFeedMediaItemsAttribute ? window.emyFeedMediaItemsAttribute(payload.mediaItems) : "";
          const statText = formatEngagementCount(likes) + (likes === 1 ? " like" : " likes");
          const baseClipViews = readEngagementCount(item.viewsText || item.views || item.stats || 0);
          const clipViews = kind === "clip" && window.emySharedClipViewCountForItem ? window.emySharedClipViewCountForItem(item, item._sourceKey || item.sourceKey || item.storageKey || item.key || item.businessKey || item.id || "", baseClipViews) : baseClipViews;
          const clipViewsText = clipViews + " views";
          let meta = kind === "clip"
            ? [statText, clipViewsText, item.dateText || ""].filter(Boolean).join("|")
            : kind === "product"
              ? [item.source === "customer" ? "My Business" : "Nearby", item.category || "", item.subCategory || "", productAvailability].filter(Boolean).join("|")
              : [item.dateText || "", statText, item.category || ""].filter(Boolean).join("|");
          if (detailKindKey.indexOf("job") >= 0) meta = [item.jobLocation || item.location || "", item.workplace || "", item.employment || ""].filter(Boolean).join("|");
          if (detailKindKey.indexOf("event") >= 0) meta = [item.category || "Event", item.eventWhen || item.dateText || "", item.eventWhere || item.location || ""].filter(Boolean).join("|");
          if (detailKindKey.indexOf("article") >= 0) meta = [item.category || "Article", item.dateText || "", item.readTime || "2 min read"].filter(Boolean).join("|");
          const articleBodyForDetail = detailKindKey.indexOf("article") >= 0 ? (item.articleBody || description || titleText) : (item.articleBody || "");
          const articleShareForDetail = detailKindKey.indexOf("article") >= 0 ? (item.articleShare || item.shareText || description || "") : (item.articleShare || item.shareText || "");
          const attrs = ' data-card data-feed-id="' + escapeHtml(feedId) + '" data-business-key="' + escapeHtml(profileKey) + '"' + (owned ? ' data-owner="customer" data-actor-type="customer" data-profile-href="emy-customer-profile.html"' : '') + ' data-detail-kind="' + escapeHtml(detailKind) + '" data-detail-title="' + escapeHtml(titleText) + '" data-detail-description="' + escapeHtml(articleShareForDetail || description || titleText) + '" data-article-body="' + escapeHtml(articleBodyForDetail) + '" data-article-share="' + escapeHtml(articleShareForDetail) + '" data-article-read-time="' + escapeHtml(item.readTime || (detailKindKey.indexOf("article") >= 0 ? "2 min read" : "")) + '" data-detail-business="' + escapeHtml(businessLabel) + '" data-detail-price="' + escapeHtml(priceText) + '" data-detail-media="' + escapeHtml(media) + '" data-detail-media-src="' + escapeHtml(payload.mediaSrc) + '" data-detail-media-ref="' + escapeHtml(payload.mediaRef) + '" data-detail-media-type="' + escapeHtml(payload.mediaType) + '" data-detail-poster-src="' + escapeHtml(payload.posterRef ? "" : payload.posterSrc) + '" data-detail-poster-ref="' + escapeHtml(payload.posterRef) + '"' + (mediaItemsAttr ? ' data-detail-media-items="' + mediaItemsAttr + '"' : '') + ' data-detail-meta="' + escapeHtml(meta) + '" data-search-text="' + escapeHtml([kind, detailKind, businessLabel, titleText, description, item.category, item.subCategory, priceText, item.search].join(" ").toLowerCase()) + '"';
          const avatarSrc = searchPosterAvatarSrc(item, owned);
          const avatarRef = searchPosterAvatarRef(item, owned);
          const avatarInitial = String(businessLabel || "B").charAt(0).toUpperCase() || "B";
          const searchAvatarHtml = (className) => searchPosterAvatarHtml(className, media, {
            src: avatarSrc,
            ref: avatarRef,
            initial: avatarInitial,
            href: profileHref,
            linkAttr: profileLinkAttr,
            label: businessLabel
          });
          if (kind === "product") {
            const source = item.source === "customer" ? "My Business" : "Nearby";
            const productTime = searchProductHomeTime(item, titleText);
            const productCommentCount = Number(item.comments || item.commentCount) || 0;
            const productIsNew = searchProductIsNew(item);
            const productFreshTime = searchProductFreshTime(item);
            const productCommentsHtml = "";
            return '<article class="card product-card feed-product-card home-flow-item is-product' + (productIsNew ? ' is-new' : '') + (owned ? ' is-user-post' : '') + '"' + attrs + ' data-product-new="' + (productIsNew ? 'true' : 'false') + '"' + (productFreshTime ? ' data-product-created-at="' + escapeHtml(new Date(productFreshTime).toISOString()) + '"' : '') + '>' +
              '<div class="photo ' + escapeHtml(media) + '"' + searchMediaEditStyle(payload) + ' aria-hidden="true">' + mediaInner + mediaOverlay + '</div>' +
              '<button class="social-feed-more feed-action" type="button" data-feed-options aria-label="More options" aria-expanded="false">...</button>' + searchFeedOptionsMenu("product", owned) +
              '<div class="body"><h3>' + escapeHtml(titleText) + '</h3><p>' + escapeHtml(description) + '</p><div class="product-source">' + escapeHtml(source) + '</div><div class="product-availability">' + escapeHtml(productAvailability) + '</div>' + (priceText ? '<div class="price">' + escapeHtml(priceText) + '</div>' : '') + '</div>' +
              searchProductActionFooter(statText, productCommentCount, productTime) + productCommentsHtml +
            '</article>';
          }
          if (kind === "clip") {
            const clipLabel = isProductClip ? "Product Clip" : "Business Clip";
            const productPanel = (titleText || description || priceText) ? '<div class="clip-product-mini' + (priceText ? '' : ' is-info') + '" data-clip-product-mini><strong>' + escapeHtml(titleText || (isProductClip ? "Product" : "Clip")) + '</strong>' + (priceText ? '<span class="clip-product-mini-price">' + escapeHtml(priceText) + '</span>' : (description ? '<em>' + escapeHtml(description) + '</em>' : '')) + '</div>' : "";
            const clipCommentsHtml = "";
            return '<article class="card reel-card ' + (isProductClip ? 'feed-product-clip-card' : 'feed-clip-card') + ' home-flow-item is-clip' + mediaStateClass + (owned ? ' is-user-post' : '') + '"' + attrs + ' data-reel-kind="' + (isProductClip ? 'product' : 'normal') + '">' +
              '<div class="photo ' + escapeHtml(media) + '"' + searchMediaEditStyle(payload) + ' aria-hidden="true">' + mediaInner + mediaOverlay + '</div>' +
              '<div class="reel-top">' + searchAvatarHtml("reel-avatar") + '<a class="feed-profile-link reel-owner-link" href="' + escapeHtml(profileHref) + '"' + profileLinkAttr + '><strong>' + escapeHtml(businessLabel) + '</strong><small>' + escapeHtml(clipLabel) + '</small></a><span class="reel-type-badge">' + (isProductClip ? 'Product' : 'Clip') + '</span></div>' +
              '<button class="social-feed-more feed-action" type="button" data-feed-options aria-label="More options" aria-expanded="false">...</button>' + searchFeedOptionsMenu(isProductClip ? "product" : "clip", owned) +
              '<span class="reel-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span>' +
              '<div class="caption"><div class="reel-actions"><span data-clip-view-count>' + escapeHtml(clipViewsText) + '</span></div>' + productPanel + '</div>' +
              searchCountedActionFooter(statText, "", 0, item.dateText || "Just now") + clipCommentsHtml +
            '</article>';
          }
          const postOptionsKind = detailKindKey.indexOf("job") >= 0 ? "job" : detailKindKey.indexOf("event") >= 0 ? "event" : detailKindKey.indexOf("article") >= 0 ? "article" : "post";
          const headKindLabel = detailKindKey.indexOf("article") >= 0 ? "Article" : detailKindKey.indexOf("event") >= 0 ? "Event" : detailKindKey.indexOf("job") >= 0 ? "Job" : owned ? "Your post" : item.source === "customer" ? "My Businesses" : "";
          const headMetaHtml = escapeHtml(item.dateText || "Just now") + (headKindLabel ? ' &middot; ' + escapeHtml(headKindLabel) : "");
          const headHtml = '<div class="social-feed-head">' + searchAvatarHtml("social-feed-avatar feed-avatar") + '<a class="social-feed-name feed-profile-link" href="' + escapeHtml(profileHref) + '"' + profileLinkAttr + '><strong>' + escapeHtml(businessLabel) + '</strong><small>' + headMetaHtml + '</small></a><button class="social-feed-more feed-action" type="button" data-feed-options aria-label="More options" aria-expanded="false">...</button></div>' + searchFeedOptionsMenu(postOptionsKind, owned);
          const actionHtml = "";
          const bodyHtmlFor = (captionText) => '<div class="social-feed-body"><p class="social-feed-caption"><strong>' + escapeHtml(businessLabel) + '</strong>' + escapeHtml(captionText || titleText) + '</p><span class="social-feed-time">' + escapeHtml(item.dateText || "Now") + '</span></div>';
          const bodyHtml = bodyHtmlFor(description || titleText);
          const commentsHtml = "";
          if (detailKindKey.indexOf("article") >= 0) {
            const articleBody = item.articleBody || description || titleText;
            const articleShare = item.articleShare || item.shareText || description || "";
            const readTime = item.readTime || "2 min read";
            const coverHtml = mediaInner ? '<div class="feed-article-card-cover ' + escapeHtml(media) + '"' + searchMediaEditStyle(payload) + '>' + mediaInner + mediaOverlay + '</div>' : "";
            const articlePreview = articleShare || description || articleBody || titleText;
            return '<article class="feed-card social-feed-card social-feed-article-card is-article' + mediaStateClass + (owned ? ' is-user-post' : '') + '"' + attrs + '>' +
              headHtml +
              '<div class="feed-article-card-body">' + coverHtml + '<span>' + escapeHtml(item.category || "Article") + '</span><h2>' + escapeHtml(titleText) + '</h2><p>' + escapeHtml(articlePreview) + '</p><div class="feed-article-card-meta"><small>' + escapeHtml(readTime) + '</small><small>' + escapeHtml(item.category || "Article") + '</small></div></div>' +
              searchCountedActionFooter(statText, "", 0, item.dateText || "Just now") + commentsHtml +
            '</article>';
          }
          if (detailKindKey.indexOf("event") >= 0) {
            const eventType = item.category || item.eventType || "Event";
            const eventWhen = item.eventWhen || item.dateText || "Date to confirm";
            const eventWhere = item.eventWhere || item.location || "Location to confirm";
            const eventPreviewText = searchFeedPreviewIntro(item.feedIntro || item.intro || item.summary || item.shareText || "", description, "Event details will be shared soon.");
            const coverMedia = searchCoverMediaMarkup(payload, titleText, "feed-event-card-cover-image", "data-emy-event-card-cover");
            const coverHtml = coverMedia ? coverMedia + mediaOverlay : "";
            return '<article class="feed-card social-feed-card social-feed-event-card is-event' + mediaStateClass + (owned ? ' is-user-post' : '') + '"' + attrs + ' data-feed-intro="' + escapeHtml(eventPreviewText) + '" data-event-when="' + escapeHtml(eventWhen) + '" data-event-where="' + escapeHtml(eventWhere) + '">' +
              headHtml +
              '<div class="feed-event-post' + (coverHtml ? ' has-cover' : '') + '"><div class="feed-event-post-hero">' + coverHtml + '<span>' + escapeHtml(eventType) + '</span><strong>' + escapeHtml(titleText) + '</strong></div><div class="feed-event-post-details"><p>' + escapeHtml(eventPreviewText) + '</p><div class="feed-event-post-meta"><span><b>When</b>' + escapeHtml(eventWhen) + '</span><span><b>Where</b>' + escapeHtml(eventWhere) + '</span></div></div></div>' +
              searchCountedActionFooter(statText, "", 0, item.dateText || "Just now") + commentsHtml +
            '</article>';
          }
          if (detailKindKey.indexOf("job") >= 0) {
            const jobLocation = item.jobLocation || item.location || "Location to confirm";
            const workplace = item.workplace || "On-site";
            const employment = item.employment || "Flexible";
            const notes = item.notes || item.pay || item.salary || "To confirm";
            const applicants = Number(item.applicants) || 0;
            const jobPreviewText = searchFeedPreviewIntro(item.feedIntro || item.intro || item.summary || item.shareText || "", description, "This business is hiring.");
            const coverMedia = searchCoverMediaMarkup(payload, titleText, "feed-job-cover-media", "data-emy-job-cover-media");
            const coverHtml = coverMedia ? coverMedia + mediaOverlay : "";
            return '<article class="feed-card social-feed-card social-feed-job-card is-job' + mediaStateClass + (owned ? ' is-user-post' : '') + '"' + attrs + ' data-feed-intro="' + escapeHtml(jobPreviewText) + '" data-job-location="' + escapeHtml(jobLocation) + '" data-job-workplace="' + escapeHtml(workplace) + '" data-job-employment="' + escapeHtml(employment) + '" data-job-experience="' + escapeHtml(item.experience || "Open to applicants") + '" data-job-apply="' + escapeHtml(item.apply || "Message this business on EMY") + '" data-job-notes="' + escapeHtml(notes) + '" data-job-applicants="' + escapeHtml(String(applicants)) + '">' +
              headHtml +
              '<div class="feed-job-card' + (coverHtml ? ' has-cover' : '') + '"><div class="feed-job-hero' + (coverHtml ? ' has-cover' : '') + '">' + coverHtml + '<span>Job</span><strong>' + escapeHtml(titleText) + '</strong></div><div class="feed-job-body"><div class="feed-job-business"><span>' + escapeHtml(businessLabel) + '</span></div><p class="feed-job-desc">' + escapeHtml(jobPreviewText) + '</p><div class="feed-job-meta"><span><b>Location</b>' + escapeHtml(jobLocation) + '</span><span><b>Workplace</b>' + escapeHtml(workplace) + '</span><span><b>Type</b>' + escapeHtml(employment) + '</span><span><b>Pay / notes</b>' + escapeHtml(notes) + '</span></div><div class="feed-job-actions"><button class="feed-job-apply" type="button" data-feed-job-apply>' + socialIcon("apply") + 'Apply with CV</button><span class="feed-job-count" data-feed-job-applicants>' + formatEngagementCount(applicants) + ' applicants</span></div></div></div>' +
              searchCountedActionFooter(statText, "", 0, item.dateText || "Just now") + commentsHtml +
            '</article>';
          }
          const postCaption = '<p class="social-feed-caption"><strong>' + escapeHtml(businessLabel) + '</strong>' + escapeHtml(description || titleText) + '</p>';
          const hasPostMedia = !!mediaInner;
          const postMediaBlock = hasPostMedia
            ? '<div class="feed-media social-feed-media ' + escapeHtml(media) + '"' + searchMediaEditStyle(payload) + '>' + mediaInner + mediaOverlay + '<span class="post-badge">' + escapeHtml(item.category || detailKind || "Post") + '</span></div>'
            : '<div class="social-feed-text-panel"><p>' + escapeHtml(description || titleText) + '</p></div>';
          return '<article class="feed-card social-feed-card is-post' + mediaStateClass + (!hasPostMedia ? ' is-text-only' : '') + (owned ? ' is-user-post' : '') + '"' + attrs + '>' +
            headHtml +
            postMediaBlock +
            searchCountedActionFooter(statText, hasPostMedia ? postCaption : "", 0, item.dateText || "Just now") + commentsHtml +
          '</article>';
        }

        function cardTemplate(item, index) {
          if (item.type === "business") return renderSearchBusinessProfileCard(item);
          return renderSearchFeedCard(item, index || 0);
          if (item.type === "reel") {
            const isProductClip = item.reelType === "product";
            const avatarClass = isProductClip ? (item.media || "bottle") : (item.media || "reel-b");
            const clipLabel = isProductClip ? "Product Clip" : "Business Clip";
            const clipBadge = isProductClip ? "Product" : "Clip";
            const productStrip = "";
            const reelMeta = [(item.likes || 0) + " likes", item.viewsText || "", item.dateText || ""].filter(Boolean).join("|");
            return '<article class="card reel-card" data-card data-detail-kind="' + (isProductClip ? "Product Clip" : "Clip") + '" data-detail-title="' + escapeHtml(isProductClip ? (item.productName || item.title) : item.title) + '" data-detail-description="' + escapeHtml(isProductClip ? (item.productInfo || item.description) : item.description) + '" data-detail-business="' + escapeHtml(item.businessName || "EMY business") + '" data-detail-price="' + escapeHtml(isProductClip ? (item.priceText || "") : "") + '" data-detail-media="' + escapeHtml(item.media) + '" data-detail-meta="' + escapeHtml(reelMeta) + '">' +
              '<div class="media ' + escapeHtml(item.media) + '"></div>' +
              '<div class="search-reel-top"><span><strong>' + escapeHtml(item.businessName || "EMY business") + '</strong><small>' + clipLabel + '</small></span><span class="search-reel-badge">' + clipBadge + '</span></div>' +
              '<span class="search-reel-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span>' +
              '<span class="overlay"><div class="search-reel-actions"><span><span data-feed-like-count data-raw-count="' + readEngagementCount(item.likes || 0) + '">' + formatEngagementCount(item.likes || 0) + '</span> likes</span><span data-clip-view-count>' + escapeHtml(item.viewsText || "0 views") + '</span><span>' + escapeHtml(item.dateText) + '</span></div>' + productStrip + '</span>' +
            '</article>';
          }
          if (item.type === "business") return renderSearchBusinessProfileCard(item);
          const detailKind = item.type === "business" ? "Business" : item.type === "post" ? "Post" : "Product";
          const detailBusiness = item.businessName || (item.type === "business" ? item.title : "");
          const detailMeta = item.type === "business"
            ? [(item.status === "closed" ? "Closed" : "Opened"), item.distance ? item.distance + ".0 mi" : "", item.location || ""].filter(Boolean).join("|")
            : item.type === "post"
              ? [item.dateText || "", (item.likes || 0) + " likes", item.category || ""].filter(Boolean).join("|")
              : [item.source === "customer" ? "My Business" : "Nearby", item.category || "", item.subCategory || ""].filter(Boolean).join("|");
          const feedTypeClass = item.type === "business" ? "is-business" : item.type === "post" ? "is-post" : "is-product";
          const profileKey = businessProfileKey(item.businessName ? { title: item.businessName } : item);
          const profileHref = "emy-business-profile.html?business=" + encodeURIComponent(profileKey);
          const businessLabel = detailBusiness || (item.source === "customer" ? "My Business" : "Nearby business");
          const smallText = item.type === "business" ? (item.location || "Nearby") : item.type === "post" ? (item.dateText || "Post") : (item.source === "customer" ? "My Businesses" : "Nearby");
          const tagText = item.type === "business" ? (activeTab === "following" ? "Customer" : "Business") : detailKind;
          const statText = item.type === "business"
            ? [(item.status === "closed" ? "Closed" : "Opened"), item.distance ? item.distance + ".0 mi" : ""].filter(Boolean).join(" - ")
            : item.type === "post"
              ? (item.likes || 0) + " likes"
              : [(item.likes || 0) + " likes", (item.saved || 0) + " saved"].join(" - ");
          return '<article class="feed-card ' + feedTypeClass + '" data-card data-detail-kind="' + detailKind + '" data-detail-title="' + escapeHtml(item.title) + '" data-detail-description="' + escapeHtml(item.description) + '" data-detail-business="' + escapeHtml(detailBusiness) + '" data-detail-price="' + escapeHtml(item.type === "product" ? item.priceText : "") + '" data-detail-media="' + escapeHtml(item.media) + '" data-detail-meta="' + escapeHtml(detailMeta) + '">' +
            '<div class="feed-card-head"><a class="feed-profile-link" href="' + escapeHtml(profileHref) + '" data-business-link="' + escapeHtml(profileKey) + '"><span><strong>' + escapeHtml(businessLabel) + '</strong><small>' + escapeHtml(smallText) + '</small></span></a><span class="feed-tag">' + escapeHtml(tagText) + '</span></div>' +
            '<a class="feed-media-link" href="' + escapeHtml(profileHref) + '" data-business-link="' + escapeHtml(profileKey) + '"><div class="feed-media ' + escapeHtml(item.media) + '"></div></a>' +
            '<div class="feed-body"><h2>' + escapeHtml(item.title) + '</h2><p>' + escapeHtml(item.description) + '</p>' + (item.type === "product" && item.priceText ? '<div class="feed-price">' + escapeHtml(item.priceText) + '</div>' : '') + '</div>' +
          '</article>';
        }

        function searchResultsLayoutClass(tab) {
          if (tab === "products") return "search-results-list search-product-list";
          if (tab === "following") return "search-results-list search-business-list search-following-list";
          if (tab === "business") return "search-results-list search-business-list";
          if (tab === "articles") return "search-results-list search-article-list";
          if (tab === "events") return "search-results-list search-event-list";
          if (tab === "jobs") return "search-results-list search-job-list";
          if (tab === "reels") return "search-results-list search-clip-list";
          return "search-results-list search-feed-list";
        }

        if (!window.emySetListHtmlIfChanged) window.emySetListHtmlIfChanged = function (list, html) {
          if (!list) return false;
          const text = String(html == null ? "" : html);
          let hash = 0;
          for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) | 0;
          const signature = text.length + ":" + hash;
          if (list.dataset.emyListRenderSignature === signature && (!text || !!list.firstChild)) return false;
          list.innerHTML = text;
          list.dataset.emyListRenderSignature = signature;
          return true;
        };
        function renderResults() {
          const sourceList = activeTab === "following" ? searchSourceItems(activeTab) : searchFilterByActiveLocation(searchSourceItems(activeTab), activeTab);
          const list = (activeTab === "following" ? sourceList : sourceList.filter(matchesFilter)).filter(matchesSearch);
          const reelControls = activeTab === "reels"
            ? '<div class="reel-toggle"><button type="button" data-reel-type="normal" class="' + (activeReelType === "normal" ? "is-active" : "") + '">Business Clip</button><button type="button" data-reel-type="product" class="' + (activeReelType === "product" ? "is-active" : "") + '">Product Clip</button></div>'
            : "";
          const visible = activeTab === "reels" ? list.filter((item) => item.reelType === activeReelType) : list;
          const layoutClass = searchResultsLayoutClass(activeTab);
          const productListAttrs = activeTab === "products" ? ' data-unified-feed-cards="true"' : "";
          document.querySelectorAll("[data-feed-options-menu][data-feed-options-scope='search']").forEach((menu) => menu.remove());
          results.classList.toggle("is-product-results", activeTab === "products");
          const resultsChanged = window.emySetListHtmlIfChanged(results, reelControls + '<div class="' + layoutClass + '"' + productListAttrs + '>' + visible.map(cardTemplate).join("") + '</div>');
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(results);
          if (window.emySetupVideoPlayers) window.emySetupVideoPlayers(results);
          if (window.emySetupFeedMediaCarousels) window.emySetupFeedMediaCarousels(results);
          if (resultsChanged) setupMutedClipHoverPreviews(results);
          if (window.emySetupVideoDurations) window.emySetupVideoDurations(results);
          setupSearchBusinessCoverVideos(results);
          if (typeof setupBusinessCustomerBadges === "function") setupBusinessCustomerBadges(results);
          syncSearchFeedState(results);
          if (window.emySyncJobCreatorButtons) window.emySyncJobCreatorButtons(results);
          empty.classList.toggle("is-visible", visible.length === 0);
          updateActiveFilterLabel();
          if (!resultsChanged) return;
          document.querySelectorAll("[data-reel-type]").forEach((button) => {
            button.addEventListener("click", () => {
              activeReelType = button.dataset.reelType;
              const state = filterState.reels || {};
              state.reelType = activeReelType;
              filterState.reels = state;
              renderResults();
            });
          });
          document.querySelectorAll(".heart").forEach((button) => {
            button.addEventListener("click", (event) => {
              event.preventDefault();
              event.stopPropagation();
              if (window.emyEngagement && typeof window.emyEngagement.update === "function") return;
              const isLiked = !(button.classList.contains("is-liked") || button.classList.contains("is-active"));
              button.classList.toggle("is-liked", isLiked);
              button.classList.toggle("is-active", isLiked);
              button.setAttribute("aria-pressed", isLiked ? "true" : "false");
              button.setAttribute("aria-label", isLiked ? "Saved" : "Save");
              button.setAttribute("title", isLiked ? "Saved" : "Save");
              const card = button.closest("[data-feed-id], [data-card]");
              const savedCount = card ? card.querySelector("[data-product-saved-count]") : null;
              let nextSavedCount;
              if (savedCount) {
                const currentCount = readEngagementCount(savedCount);
                nextSavedCount = Math.max(0, currentCount + (isLiked ? 1 : -1));
                setEngagementCountText(savedCount, nextSavedCount);
              }
              updateSearchFeedState(card, { saved: isLiked, savedCount: nextSavedCount });
              setSearchSavedFeedItem(card, isLiked);
              if (isLiked) pushSearchBusinessNotification(card, "save", searchCurrentCustomerName() + " saved your " + searchNotificationItemLabel(card) + ".");
              showToast(isLiked ? "Saved." : "Removed from saved.");
            });
          });
          results.querySelectorAll("[data-search-business-like]").forEach((button) => {
            button.addEventListener("click", (event) => {
              event.preventDefault();
              event.stopPropagation();
              if (window.__emyBusinessLikeSyncInstalled) return;
              if (window.emyToggleBusinessLike) {
                window.emyToggleBusinessLike(button);
                return;
              }
              if (window.emyEngagement && typeof window.emyEngagement.update === "function") return;
              const active = !button.classList.contains("is-active");
              button.classList.toggle("is-active", active);
              button.setAttribute("aria-pressed", active ? "true" : "false");
              const count = button.querySelector("[data-business-like-count]");
              if (count) {
                const current = readEngagementCount(count);
                setEngagementCountText(count, Math.max(0, current + (active ? 1 : -1)));
              }
              if (active) pushSearchBusinessNotification(button.closest("[data-business-key]"), "business-like", searchCurrentCustomerName() + " liked your business profile.", { itemKind: "business profile" });
              showToast(active ? "Business liked." : "Business like removed.");
            });
          });
          results.querySelectorAll("[data-search-business-customer]").forEach((button) => {
            button.addEventListener("click", (event) => {
              event.preventDefault();
              event.stopPropagation();
              const card = button.closest("[data-business-key]");
              if (!card) return;
              const key = card.dataset.businessKey || businessProfileKey({ title: card.dataset.detailBusiness });
              const name = card.dataset.detailBusiness || card.dataset.detailTitle || "Business";
              const stored = readJson("emyCustomerBusinesses", {});
              stored[key] = Object.assign({}, stored[key] || {}, {
                key,
                name,
                active: true,
                isCustomer: true,
                opened: true,
                status: "Opened",
                addedAt: new Date().toISOString()
              });
              try {
                localStorage.setItem("emyCustomerBusiness:" + key, "1");
                localStorage.setItem("emyCustomerBusinesses", JSON.stringify(stored));
              } catch (error) {}
              button.classList.add("is-active");
              button.setAttribute("aria-pressed", "true");
              button.textContent = "Customer";
              try {
                const detail = { key, businessKey: key, name, active: true };
                window.dispatchEvent(new CustomEvent("emy:customer-business-changed", { detail }));
                window.dispatchEvent(new CustomEvent("emy:business-content-changed", { detail: Object.assign({ action: "customer-add" }, detail) }));
                if (window.emySyncContentSurfaces) window.emySyncContentSurfaces({ action: "customer-add", type: "customer-business", key, businessKey: key, name });
              } catch (error) {}
              pushSearchBusinessNotification(card, "customer-add", searchCurrentCustomerName() + " added your business to My Businesses.", { itemKind: "business profile", itemTitle: name, title: "New customer added" });
              showToast(name + " added to My Businesses.");
            });
          });
        }
        window.emyRenderSearchResults = renderResults;
        function refreshSearchOnActivation() {
          if (document.hidden) return;
          if (typeof window.emyContentSyncClearCaches === "function") {
            try { window.emyContentSyncClearCaches(); } catch (error) {}
          }
          renderResults();
        }
        function emySyncContentSurfaces(detail) {
          if (window.emyContentSync && typeof window.emyContentSync.notify === "function") {
            try { window.emyContentSync.notify(Object.assign({ source: "emySyncContentSurfaces" }, detail || {})); } catch (error) {}
            return;
          }
          renderResults();
        }
        window.emySyncContentSurfaces = emySyncContentSurfaces;
        function bindSearchContentSync() {
          if (!window.emyContentSync || typeof window.emyContentSync.register !== "function") return;
          window.emyContentSync.register("customer-search", renderResults);
        }
        if (window.emyContentSync) bindSearchContentSync();
        else window.addEventListener("emy:content-sync-ready", bindSearchContentSync, { once: true });
        ["emy:created-posts-changed", "emy:created-jobs-changed", "emy:created-events-changed", "emy:feed-reposts-changed", "emy:business-content-changed"].forEach((eventName) => {
          window.addEventListener(eventName, renderResults);
        });
        window.addEventListener("emy:customer-business-changed", renderResults);
        window.addEventListener("storage", (event) => {
          const key = event && event.key;
          if (!key) return;
          if (/^emy(FeedCreated|FeedDeleted|Business|Customer)/i.test(key) || key === "emyFeedReposts") renderResults();
        });
        window.addEventListener("pageshow", refreshSearchOnActivation);
        window.addEventListener("focus", refreshSearchOnActivation);
        document.addEventListener("visibilitychange", refreshSearchOnActivation);

        function closeSearchFeedOptions(exceptMenu) {
          document.querySelectorAll("[data-feed-options-menu]").forEach((menu) => {
            if (!(results.contains(menu) || menu.dataset.feedOptionsScope === "search")) return;
            if (menu !== exceptMenu) {
              menu.hidden = true;
              menu.style.left = "";
              menu.style.top = "";
              menu.style.right = "";
            }
          });
          results.querySelectorAll("[data-feed-options]").forEach((button) => {
            const menu = searchFeedMenuForCard(button.closest("[data-feed-id]"));
            button.setAttribute("aria-expanded", menu && !menu.hidden ? "true" : "false");
          });
        }

        function searchFeedMenuForCard(card) {
          if (!card) return null;
          const direct = card.querySelector("[data-feed-options-menu]");
          if (direct) return direct;
          const feedId = card.dataset.feedId || "";
          if (!feedId) return null;
          return Array.from(document.querySelectorAll("[data-feed-options-menu][data-feed-options-card-id]")).find((menu) => menu.dataset.feedOptionsCardId === feedId) || null;
        }

        function searchFeedCardForMenu(menu) {
          if (!menu) return null;
          const directCard = menu.closest("[data-feed-id]");
          if (directCard) return directCard;
          const feedId = menu.dataset.feedOptionsCardId || "";
          if (!feedId) return null;
          return Array.from(results.querySelectorAll("[data-feed-id]")).find((card) => card.dataset.feedId === feedId) || null;
        }

        function positionSearchFeedOptions(button, menu) {
          if (!button || !menu) return;
          const card = button.closest("[data-feed-id]");
          if (card && card.dataset.feedId) menu.dataset.feedOptionsCardId = card.dataset.feedId;
          menu.dataset.feedOptionsScope = "search";
          if (menu.parentElement !== document.body) document.body.appendChild(menu);
          const rect = button.getBoundingClientRect();
          const width = Math.min(220, Math.max(170, window.innerWidth - 24));
          menu.style.width = width + "px";
          menu.style.right = "auto";
          const height = menu.offsetHeight || 230;
          let left = Math.min(window.innerWidth - width - 10, Math.max(10, rect.right - width));
          let top = rect.bottom + 8;
          if (top + height > window.innerHeight - 10) top = Math.max(10, rect.top - height - 8);
          menu.style.left = left + "px";
          menu.style.top = top + "px";
        }

        function toggleSearchFeedOptions(button) {
          const card = button && button.closest("[data-feed-id]");
          const menu = searchFeedMenuForCard(card);
          if (!menu) return;
          const shouldOpen = menu.hidden;
          closeSearchFeedOptions(menu);
          menu.hidden = !shouldOpen;
          if (shouldOpen) positionSearchFeedOptions(button, menu);
          button.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
        }

        function shareSearchFeedCard(card, kind) {
          const title = card ? (card.dataset.detailTitle || document.title) : document.title;
          const url = window.location.href;
          if (kind !== "copy" && navigator.share) {
            navigator.share({ title, url }).then(() => showToast("Share sheet opened.")).catch(() => {});
            return;
          }
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => showToast(kind === "copy" ? "Link copied." : "Link copied for sharing."));
            return;
          }
          showToast("Copy this page link from the address bar.");
        }

        function setSearchFeedCardVisibleText(card, title, text) {
          if (!card) return;
          if (title) {
            card.dataset.detailTitle = title;
            card.querySelectorAll(".feed-job-hero strong, .feed-event-post-hero strong, .feed-article-card-body h2, .feed-product-card h3, .social-feed-quote-title, .caption strong").forEach((node) => { node.textContent = title; });
          }
          if (text) {
            card.dataset.detailDescription = text;
            card.querySelectorAll(".feed-job-desc, .feed-event-post-details p, .feed-article-card-body p, .feed-product-card .body p, .social-feed-quote-text, .caption > span").forEach((node) => { node.textContent = text; });
            const caption = card.querySelector(".social-feed-caption");
            const business = card.dataset.detailBusiness || searchCurrentCustomerName();
            if (caption && !card.classList.contains("is-repost")) caption.innerHTML = '<strong>' + escapeHtml(business) + '</strong>' + escapeHtml(text);
          }
        }

        function editSearchFeedCard(card) {
          if (!card || !(card.classList.contains("is-user-post") || (window.emyFeedCardLooksOwned && window.emyFeedCardLooksOwned(card)))) {
            showToast("You can edit your own posts only.");
            return;
          }
          if (editSearchFeedRepostThought(card, { showToast })) return;
          const menu = searchFeedMenuForCard(card) || card.querySelector("[data-feed-options-menu]");
          const kind = menu && menu.dataset.feedOptionsKind || card.dataset.detailKind || "";
          if (window.emyOpenOriginalFeedEdit && window.emyOpenOriginalFeedEdit(card, { kind, showToast })) {
            return;
          }
          if (window.emyOpenFeedEditSheet) {
            window.emyOpenFeedEditSheet({
              card,
              kind,
              showToast,
              updateState: updateSearchFeedState,
              setVisibleText: setSearchFeedCardVisibleText
            });
            return;
          }
          const title = window.prompt("Edit title", card.dataset.detailTitle || "");
          if (title === null) return;
          const text = window.prompt("Edit text", card.dataset.detailDescription || "");
          if (text === null) return;
          setSearchFeedCardVisibleText(card, title.trim(), text.trim());
          updateSearchFeedState(card, { editedTitle: title.trim(), editedText: text.trim() });
          showToast("Post updated.");
        }

        function deleteSearchFeedCard(card) {
          if (!card || !(card.classList.contains("is-user-post") || (window.emyFeedCardLooksOwned && window.emyFeedCardLooksOwned(card)))) {
            showToast("You can delete your own posts only.");
            return;
          }
          if (!window.confirm("Delete " + (card.dataset.detailTitle || "this post") + "?")) return;
          const menu = searchFeedMenuForCard(card) || card.querySelector("[data-feed-options-menu]");
          const kind = menu && menu.dataset.feedOptionsKind || card.dataset.detailKind || "";
          const feedId = card.dataset.feedId || "";
          const storedDeleted = window.emyDeleteStoredFeedItem ? window.emyDeleteStoredFeedItem(card, kind) : true;
          if (storedDeleted === false) {
            showToast("EMY could not delete this post from storage yet.");
            return;
          }
          updateSearchFeedState(card, { hidden: true, deleted: true });
          if (card.isConnected) card.remove();
          showToast("Post deleted.");
          scheduleSearchFeedHeavyInteraction(() => {
            if (typeof window.emyPurgeDeletedFeedCardsFromAllLists === "function") window.emyPurgeDeletedFeedCardsFromAllLists(feedId);
            if (typeof window.emySyncContentSurfaces === "function") window.emySyncContentSurfaces({ action: "delete", feedId: feedId, kind: kind });
            else renderResults();
          });
        }

        function handleSearchFeedOption(action, card, menu) {
          const kind = menu && menu.dataset.feedOptionsKind || "post";
          closeSearchFeedOptions();
          if (action === "report") {
            showToast("Report sent for this " + kind + ".");
            return;
          }
          if (action === "hide") {
            if (card) card.hidden = true;
            updateSearchFeedState(card, { hidden: true });
            showToast("We will show fewer updates like this.");
            return;
          }
          if (action === "open") {
            if (card && window.emyOpenItemDetail && window.emyOpenItemDetail(card)) return;
            if (card) window.setTimeout(() => card.click(), 0);
            return;
          }
          if (action === "edit") {
            editSearchFeedCard(card);
            return;
          }
          if (action === "delete") {
            deleteSearchFeedCard(card);
            return;
          }
          if (action === "repost") {
            handleSearchFeedRepost(card);
            return;
          }
          if (action === "share") {
            shareSearchFeedCard(card, "share");
            return;
          }
          if (action === "copy") shareSearchFeedCard(card, "copy");
        }

        function handleSearchFeedClick(event) {
          const optionsButton = event.target.closest("[data-feed-options]");
          if (optionsButton) {
            event.preventDefault();
            event.stopPropagation();
            toggleSearchFeedOptions(optionsButton);
            return;
          }
          const optionButton = event.target.closest("[data-feed-option]");
          if (optionButton) {
            event.preventDefault();
            event.stopPropagation();
            const menu = optionButton.closest("[data-feed-options-menu]");
            handleSearchFeedOption(optionButton.dataset.feedOption, searchFeedCardForMenu(menu), menu);
            return;
          }
          const commentVote = event.target.closest("[data-feed-comment-like], [data-feed-comment-dislike]");
          if (commentVote) {
            event.preventDefault();
            event.stopPropagation();
            const active = !commentVote.classList.contains("is-active");
            commentVote.classList.toggle("is-active", active);
            commentVote.setAttribute("aria-pressed", active ? "true" : "false");
            const row = commentVote.closest("[data-feed-comment-row]");
            const count = row && row.querySelector(commentVote.matches("[data-feed-comment-dislike]") ? "[data-feed-comment-dislikes]" : "[data-feed-comment-likes]");
            if (count) {
              const current = readEngagementCount(count);
              const next = Math.max(0, current + (active ? 1 : -1));
              const word = commentVote.matches("[data-feed-comment-dislike]") ? "dislike" : "like";
              count.textContent = next + (next === 1 ? " " + word : " " + word + "s");
            }
            if (active) {
              const card = commentVote.closest("[data-feed-id]");
              const actionName = commentVote.matches("[data-feed-comment-dislike]") ? "comment-dislike" : "comment-like";
              const verb = commentVote.matches("[data-feed-comment-dislike]") ? "disliked" : "liked";
              pushSearchBusinessNotification(card, actionName, searchCurrentCustomerName() + " " + verb + " a comment on your " + searchNotificationItemLabel(card) + ".");
            }
            return;
          }
          const commentEdit = event.target.closest("[data-feed-comment-edit]");
          if (commentEdit) {
            event.preventDefault();
            event.stopPropagation();
            const row = commentEdit.closest("[data-feed-comment-row]");
            const textNode = row && row.querySelector("[data-feed-comment-text]");
            if (!row || row.dataset.feedCommentOwned !== "true" || !textNode) return;
            const next = window.prompt("Edit comment", textNode.textContent || "");
            if (next === null) return;
            textNode.textContent = next.trim();
            pushSearchBusinessNotification(row.closest("[data-feed-id]"), "comment-edit", searchCurrentCustomerName() + " edited a comment on your " + searchNotificationItemLabel(row.closest("[data-feed-id]")) + ".");
            showToast("Comment updated.");
            return;
          }
          const commentDelete = event.target.closest("[data-feed-comment-delete]");
          if (commentDelete) {
            event.preventDefault();
            event.stopPropagation();
            const row = commentDelete.closest("[data-feed-comment-row]");
            if (row && row.dataset.feedCommentOwned === "true") {
              const card = commentDelete.closest("[data-feed-id]");
              row.remove();
              pushSearchBusinessNotification(card, "comment-delete", searchCurrentCustomerName() + " deleted a comment on your " + searchNotificationItemLabel(card) + ".");
            }
            showToast("Comment deleted.");
            return;
          }
          const jobApply = event.target.closest("[data-feed-job-apply], [data-feed-job-applicants-view]");
          if (jobApply) {
            event.preventDefault();
            event.stopPropagation();
            const card = jobApply.closest("[data-feed-id]");
            if (jobApply.hasAttribute("data-feed-job-applicants-view") && window.emyOpenJobApplicants) window.emyOpenJobApplicants(card, event);
            else if (window.emyOpenJobApplication) window.emyOpenJobApplication(card, event);
            return;
          }
          const action = event.target.closest("[data-feed-action]");
          if (!action) return;
          event.preventDefault();
          event.stopPropagation();
          const card = action.closest("[data-feed-id]");
          const name = action.dataset.feedAction;
          if (window.emyEngagement && typeof window.emyEngagement.update === "function" && ["like", "save", "share", "repost"].includes(name)) {
            window.emyEngagement.update(card, name);
            if (name === "share" && typeof window.emyEngagement.shareCard === "function") window.emyEngagement.shareCard(card);
            return;
          }
          if (name === "comment") {
            const commentsOpen = card ? !card.classList.contains("is-comments-open") : false;
            if (card) {
              card.classList.toggle("is-comments-open", commentsOpen);
              setSearchFeedCommentToggleLabels(card);
              updateSearchFeedState(card, { commentsOpen });
            }
            const input = card && card.querySelector("[data-feed-comment-form] input");
            if (commentsOpen && input) input.focus();
            return;
          }
          if (name === "like") {
            const active = !action.classList.contains("is-active");
            action.classList.toggle("is-active", active);
            const stat = card && card.querySelector("[data-feed-stat]");
            const counted = card && card.querySelector("[data-feed-like-count]");
            let nextCount = counted ? readEngagementCount(counted) + (active ? 1 : -1) : null;
            if (stat && /like/i.test(stat.textContent)) {
              const current = readEngagementCount(stat.textContent);
              const next = Math.max(0, current + (active ? 1 : -1));
              nextCount = next;
              stat.textContent = formatEngagementCount(next) + (next === 1 ? " like" : " likes");
            }
            if (counted) {
              const safeCount = Math.max(0, Number(nextCount) || 0);
              setEngagementCountText(counted, safeCount);
              updateSearchFeedState(card, { liked: active, countedLikeCount: safeCount, statText: stat ? stat.textContent : undefined });
            }
            const reelCount = action.querySelector("[data-reel-like-count]");
            if (reelCount) {
              const current = readEngagementCount(reelCount);
              setEngagementCountText(reelCount, Math.max(0, current + (active ? 1 : -1)));
            }
            if (active) pushSearchBusinessNotification(card, "like", searchCurrentCustomerName() + " liked your " + searchNotificationItemLabel(card) + ".");
            showToast(active ? "Feed item liked." : "Feed like removed.");
            return;
          }
          if (name === "save") {
            const active = !action.classList.contains("is-active");
            action.classList.toggle("is-active", active);
            action.classList.toggle("is-liked", active);
            action.setAttribute("aria-pressed", active ? "true" : "false");
            const savedCount = card && card.querySelector("[data-product-saved-count]");
            if (savedCount) {
              const current = readEngagementCount(savedCount);
              const nextSaved = Math.max(0, current + (active ? 1 : -1));
              setEngagementCountText(savedCount, nextSaved);
              updateSearchFeedState(card, { saved: active, savedCount: nextSaved });
            } else {
              updateSearchFeedState(card, { saved: active });
            }
            setSearchSavedFeedItem(card, active);
            if (active) pushSearchBusinessNotification(card, "save", searchCurrentCustomerName() + " saved your " + searchNotificationItemLabel(card) + ".");
            showToast(active ? "Saved to Favourite." : "Removed from Favourite.");
            return;
          }
          if (name === "repost") {
            handleSearchFeedRepost(card);
            return;
          }
          if (name === "share") {
            const count = card && card.querySelector("[data-feed-share-count]");
            if (count) {
              const shareCount = readEngagementCount(count) + 1;
              setEngagementCountText(count, shareCount);
              updateSearchFeedState(card, { shareCount });
            }
            shareSearchFeedCard(card, "share");
            pushSearchBusinessNotification(card, "share", searchCurrentCustomerName() + " shared your " + searchNotificationItemLabel(card) + ".");
          }
        }

        function handleSearchFeedSubmit(event) {
          const form = event.target.closest("[data-feed-comment-form]");
          if (!form) return;
          event.preventDefault();
          event.stopPropagation();
          const input = form.querySelector("input");
          const text = (input ? input.value : "").trim();
          if (!text) return;
          const card = form.closest("[data-feed-id]");
          const list = card && card.querySelector("[data-feed-comments-list]");
          if (list) list.insertAdjacentHTML("beforeend", renderSearchComment({ name: searchCurrentCustomerName(), text, own: true }));
          appendSearchFeedCommentState(card, { name: searchCurrentCustomerName(), text, own: true, createdAt: new Date().toISOString() });
          if (card) card.classList.add("is-comments-open");
          setSearchFeedCommentToggleLabels(card);
          const count = card && card.querySelector("[data-feed-comment-count], [data-feed-comment-total]");
          if (count) setEngagementCountText(count, readEngagementCount(count) + 1);
          if (input) input.value = "";
          pushSearchBusinessNotification(card, "comment", searchCurrentCustomerName() + " commented on your " + searchNotificationItemLabel(card) + ": " + text);
          showToast("Comment added.");
        }

        function updateHeader() {
          title.textContent = tabMeta[activeTab][0];
          copy.textContent = tabMeta[activeTab][1];
          tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.tab === activeTab));
        }

        function syncSearchHash() {
          const nextHash = "#" + activeTab;
          if (window.location.hash === nextHash) return;
          history.replaceState(null, "", window.location.pathname + window.location.search + nextHash);
        }

        function updateActiveFilterLabel() {
          const state = filterState[activeTab] || {};
          const labels = Object.keys(state).filter((key) => state[key]).map((key) => {
            const field = (filters[activeTab] || []).find((item) => item[0] === key);
            if (!field) return "";
            const option = field[3].find((item) => String(item[0]) === String(state[key]));
            return option ? option[1] : "";
          }).filter(Boolean);
          activeFilter.textContent = labels.length ? labels.join(" · ") : "";
        }

        function selectTemplate(field) {
          const key = field[0];
          const label = field[1];
          const state = filterState[activeTab] || {};
          const selectedValue = String(state[key] || "");
          const selectedOption = field[3].find((option) => String(option[0]) === selectedValue) || field[3][0];
          const options = field[3].map((option) => {
            const isSelected = String(option[0]) === selectedValue;
            return '<button class="custom-option' + (isSelected ? " is-selected" : "") + '" type="button" data-option-value="' + escapeHtml(option[0]) + '" data-option-label="' + escapeHtml(option[1]) + '">' + escapeHtml(option[1]) + '</button>';
          }).join("");
          return '<div class="field"><label id="filter-label-' + escapeHtml(key) + '">' + escapeHtml(label) + '</label><div class="custom-select" data-filter-key="' + escapeHtml(key) + '" data-value="' + escapeHtml(selectedValue) + '"><button class="custom-select-trigger" type="button" aria-labelledby="filter-label-' + escapeHtml(key) + '"><span data-selected-label>' + escapeHtml(selectedOption[1]) + '</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 9 5 5 5-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div class="custom-select-menu" hidden>' + options + '</div></div></div>';
        }

        function closeCustomSelects(except) {
          filterFields.querySelectorAll(".custom-select").forEach((select) => {
            if (select === except) return;
            select.classList.remove("is-open");
            const menu = select.querySelector(".custom-select-menu");
            if (menu) menu.hidden = true;
          });
        }

        function bindFilterDropdowns() {
          filterFields.querySelectorAll(".custom-select-trigger").forEach((trigger) => {
            trigger.addEventListener("click", (event) => {
              event.stopPropagation();
              const select = trigger.closest(".custom-select");
              const menu = select.querySelector(".custom-select-menu");
              const willOpen = menu.hidden;
              closeCustomSelects(select);
              select.classList.toggle("is-open", willOpen);
              menu.hidden = !willOpen;
            });
          });
          filterFields.querySelectorAll(".custom-option").forEach((option) => {
            option.addEventListener("click", (event) => {
              event.stopPropagation();
              const select = option.closest(".custom-select");
              select.dataset.value = option.dataset.optionValue || "";
              select.querySelector("[data-selected-label]").textContent = option.dataset.optionLabel || "";
              select.querySelectorAll(".custom-option").forEach((item) => item.classList.toggle("is-selected", item === option));
              closeCustomSelects();
            });
          });
        }

        function openFilter() {
          filterFields.innerHTML = (filters[activeTab] || []).map(selectTemplate).join("");
          bindFilterDropdowns();
          filterView.classList.add("is-open");
          filterView.setAttribute("aria-hidden", "false");
        }

        function closeFilter() {
          filterView.classList.remove("is-open");
          filterView.setAttribute("aria-hidden", "true");
        }

        document.addEventListener("pointerdown", (event) => {
          if (event.target && event.target.closest && event.target.closest("[data-business-cover-controls]")) {
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
          }
        }, true);
        document.addEventListener("click", (event) => {
          handleSearchBusinessCoverControlPress(event);
        }, true);

        tabs.forEach((tab) => {
          tab.addEventListener("click", () => {
            activeTab = tab.dataset.tab;
            if (activeTab === "reels") {
              const state = filterState.reels || {};
              activeReelType = state.reelType || activeReelType || "normal";
            }
            syncSearchHash();
            updateHeader();
            renderResults();
          });
        });
        searchInput.addEventListener("input", renderResults);
        const searchBackFallback = "emy-customer-home.html";
        function normalizeSearchBackTarget(candidate) {
          if (!candidate) return "";
          try {
            const url = new URL(candidate, window.location.href);
            if (url.origin !== window.location.origin) return "";
            const page = url.pathname.split("/").pop() || "index.html";
            const currentPage = window.location.pathname.split("/").pop() || "emy-customer-search.html";
            if (!page || page === currentPage || !/\.html$/i.test(page)) return "";
            return page + url.search + url.hash;
          } catch (error) {
            return "";
          }
        }
        const searchReferrerTarget = normalizeSearchBackTarget(document.referrer);
        if (searchReferrerTarget) {
          try { sessionStorage.setItem("emySearchReturnPage", searchReferrerTarget); } catch (error) {}
        }
        function storedSearchBackTarget() {
          try {
            return normalizeSearchBackTarget(sessionStorage.getItem("emySearchReturnPage")) || searchBackFallback;
          } catch (error) {
            return searchBackFallback;
          }
        }
        function navigateSearchBack() {
          const target = searchReferrerTarget || storedSearchBackTarget();
          if (target !== searchBackFallback && window.history.length > 1) {
            window.history.back();
            window.setTimeout(() => {
              const currentPage = window.location.pathname.split("/").pop() || "emy-customer-search.html";
              if (currentPage === "emy-customer-search.html") window.location.href = target;
            }, 350);
            return;
          }
          window.location.href = target || searchBackFallback;
        }
        document.querySelectorAll("[data-back]").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            navigateSearchBack();
          });
        });
        const openSearchLocationPopup = () => {
          renderSearchLocationPopup();
          setModalOpen(locationModal, true);
        };
        if (headerLocationButton) {
          headerLocationButton.addEventListener("click", openSearchLocationPopup);
        }
        const searchHeaderButton = document.querySelector("[data-open-search]");
        if (searchHeaderButton) {
          searchHeaderButton.addEventListener("click", () => {
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
          });
        }
        document.querySelector("[data-go-profile]").addEventListener("click", () => {
          window.location.href = "emy-customer-profile.html";
        });
        document.querySelectorAll("[data-close-search-profile]").forEach((button) => {
          button.addEventListener("click", () => setModalOpen(profileModal, false));
        });
        document.querySelectorAll("[data-close-search-location]").forEach((button) => {
          button.addEventListener("click", () => setModalOpen(locationModal, false));
        });
        profileModal.addEventListener("click", (event) => {
          if (event.target === profileModal) setModalOpen(profileModal, false);
        });
        locationModal.addEventListener("click", (event) => {
          if (event.target === locationModal) setModalOpen(locationModal, false);
        });
        profileNew.addEventListener("click", openSearchProfileSourceModal);
        if (profileSourceClose) profileSourceClose.addEventListener("click", () => closeSearchProfileSourceModal(true));
        profileSourceButtons.forEach((button) => {
          button.addEventListener("click", () => chooseSearchProfileSource(button.dataset.searchProfileSource));
        });
        if (profileSourceModal) {
          profileSourceModal.addEventListener("click", (event) => {
            if (event.target === profileSourceModal) closeSearchProfileSourceModal(true);
          });
        }
        profileCameraCancelButtons.forEach((button) => {
          button.addEventListener("click", () => closeSearchProfileCamera(true));
        });
        if (profileCameraCapture) profileCameraCapture.addEventListener("click", captureSearchProfileCameraPhoto);
        if (profileCameraModal) {
          profileCameraModal.addEventListener("click", (event) => {
            if (event.target === profileCameraModal) closeSearchProfileCamera(true);
          });
        }
        window.addEventListener("beforeunload", stopSearchProfileCamera);
        profileInput.addEventListener("change", () => {
          processSearchProfileFile(profileInput.files && profileInput.files[0]);
          profileInput.value = "";
        });
        profileRemove.addEventListener("click", () => {
          currentProfilePhoto = "";
          currentProfileCrop = defaultCrop();
          try {
            syncCustomerProfilePhotoAliases("");
            localStorage.removeItem("emyCustomerProfilePhotoCrop");
            localStorage.removeItem("emyCustomerProfilePhotoBackup");
            localStorage.removeItem("emyCustomerProfilePhotoSrcBackup");
            localStorage.removeItem("emyCustomerProfilePhotoRefBackup");
            localStorage.removeItem("emyCustomerProfilePhotoCropBackup");
            localStorage.removeItem("emyCustomerProfilePhotoBackupSavedAt");
          } catch (error) {}
          renderConnectedHeader();
        });
        profileManage.addEventListener("click", () => {
          window.location.href = "emy-customer-profile.html";
        });
        radiusButtons.forEach((button) => {
          button.addEventListener("click", () => {
            setSearchRadius(button.dataset.radius, (draftSearchLocation.locationSource || "current") === "current");
            renderSearchLocationPopup();
          });
        });
        locationCurrentButton.addEventListener("click", useCurrentSearchLocation);
        locationAdd.addEventListener("click", () => {
          if (locationForm.classList.contains("is-open")) {
            closeLocationForm();
            return;
          }
          openLocationForm(null);
        });
        placeTabs.forEach((tab) => {
          tab.addEventListener("click", () => setActivePlaceLabel(tab.dataset.searchPlaceTab));
        });
        placeInput.addEventListener("input", schedulePlaceSuggestions);
        placeInput.addEventListener("keydown", (event) => {
          if (event.key === "Escape") hidePlaceSuggestions();
        });
        placeSuggestions.addEventListener("click", (event) => {
          const button = event.target.closest("[data-suggestion-index]");
          if (!button) return;
          const index = Number(button.dataset.suggestionIndex);
          const suggestion = currentPlaceSuggestions[index];
          if (!suggestion) return;
          selectedPlaceSuggestion = suggestion;
          placeInput.value = suggestion.address;
          hidePlaceSuggestions();
          locationStatus.textContent = "Location selected. Choose a distance radius, then submit.";
        });
        formRadiusButtons.forEach((button) => {
          button.addEventListener("click", () => setSearchRadius(button.dataset.radius, false));
        });
        locationList.addEventListener("click", (event) => {
          const editButton = event.target.closest("[data-edit-search-place]");
          if (editButton) {
            const placeToEdit = searchLocationOptions[Number(editButton.dataset.editSearchPlace)];
            if (placeToEdit) openLocationForm(placeToEdit);
            return;
          }
          const deleteButton = event.target.closest("[data-delete-search-place]");
          if (deleteButton) {
            const placeToDelete = searchLocationOptions[Number(deleteButton.dataset.deleteSearchPlace)];
            if (placeToDelete) deleteSearchPlace(placeToDelete);
            return;
          }
          const button = event.target.closest("[data-search-place]");
          if (!button) return;
          const place = searchLocationOptions[Number(button.dataset.searchPlace)];
          if (!place) return;
          selectSearchPlace(place);
        });
        locationForm.addEventListener("submit", async (event) => {
          event.preventDefault();
          const address = placeInput.value.trim();
          if (!address) {
            locationStatus.textContent = "Please enter a location or postcode.";
            placeInput.focus();
            return;
          }
          locationStatus.textContent = "Checking location coordinates...";
          const existingPlace = editingPlaceId ? searchPlaces.find((place) => place.id === editingPlaceId) : null;
          const matchedSuggestion = selectedPlaceSuggestion && selectedPlaceSuggestion.address === address && Number.isFinite(Number(selectedPlaceSuggestion.latitude)) && Number.isFinite(Number(selectedPlaceSuggestion.longitude))
            ? selectedPlaceSuggestion
            : null;
          const geocoded = matchedSuggestion || await geocodeAddress(address);
          const canKeepExistingCoordinates = existingPlace && existingPlace.address === address && Number.isFinite(Number(existingPlace.latitude)) && Number.isFinite(Number(existingPlace.longitude));
          if (!geocoded && !canKeepExistingCoordinates) {
            locationStatus.textContent = "We couldn't find that location. Please enter a real postcode or address.";
            placeInput.focus();
            return;
          }
          const nextPlace = {
            id: editingPlaceId || ("place-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7)),
            label: activePlaceLabel,
            address,
            radius: draftSearchRadius,
            latitude: geocoded ? geocoded.latitude : existingPlace.latitude,
            longitude: geocoded ? geocoded.longitude : existingPlace.longitude,
            resolvedAddress: geocoded ? geocoded.address : ""
          };
          searchPlaces = editingPlaceId
            ? searchPlaces.map((place) => place.id === editingPlaceId ? nextPlace : place)
            : [...searchPlaces, nextPlace];
          savePlaces();
          draftSearchLocation = {
            location: address,
            locationLabel: shortLocationLabel(address),
            latitude: nextPlace.latitude,
            longitude: nextPlace.longitude,
            radius: draftSearchRadius,
            locationSource: "saved"
          };
          saveSearchLocation({ close: true });
        });
        notificationButton.addEventListener("click", (event) => {
          event.stopPropagation();
          setNotificationsOpen(!notificationPanel.classList.contains("is-open"));
        });
        notificationClose.addEventListener("click", () => setNotificationsOpen(false));
        notificationSettings.addEventListener("click", (event) => {
          event.stopPropagation();
          try {
            const page = window.location.pathname.split("/").pop() || "emy-customer-search.html";
            localStorage.setItem("emyNotificationReturnPage", page + window.location.search + window.location.hash);
          } catch (error) {}
          window.location.href = "emy-notification-settings.html";
        });
        notificationList.addEventListener("click", (event) => {
          const menuButton = event.target.closest("[data-notification-menu]");
          if (menuButton) {
            event.stopPropagation();
            toggleNotificationMenu(menuButton.dataset.notificationMenu, menuButton);
            return;
          }
          const action = event.target.closest("[data-notification-action]");
          if (action) {
            event.stopPropagation();
            if (action.dataset.notificationAction === "hide") hideNotification(action.dataset.notificationActionId, "Notification hidden.");
            if (action.dataset.notificationAction === "delete") dismissNotification(action.dataset.notificationActionId, "Notification deleted.");
            if (action.dataset.notificationAction === "comments") turnOffCommentNotifications();
            return;
          }
          const row = event.target.closest("[data-notification-id]");
          if (!row) return;
          const item = readNotifications().find((notification) => notification.id === row.dataset.notificationId);
          openNotification(item);
        });
        notificationList.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          const row = event.target.closest("[data-notification-id]");
          if (!row) return;
          event.preventDefault();
          const item = readNotifications().find((notification) => notification.id === row.dataset.notificationId);
          openNotification(item);
        });
        notificationPanel.addEventListener("click", (event) => event.stopPropagation());
        document.querySelector("[data-open-filter]").addEventListener("click", openFilter);
        document.querySelector("[data-close-filter]").addEventListener("click", closeFilter);
        document.querySelector("[data-reset-filter]").addEventListener("click", () => {
          filterState[activeTab] = {};
          if (activeTab === "reels") activeReelType = "normal";
          openFilter();
          renderResults();
        });
        document.querySelector("[data-apply-filter]").addEventListener("click", () => {
          const state = {};
          filterFields.querySelectorAll(".custom-select[data-filter-key]").forEach((select) => {
            const value = select.dataset.value || "";
            if (value) state[select.dataset.filterKey] = value;
          });
          filterState[activeTab] = state;
          if (activeTab === "reels" && state.reelType) activeReelType = state.reelType;
          closeFilter();
          renderResults();
        });
`;
const customer_search_part_7 = String.raw`
        document.querySelectorAll("[data-nav]").forEach((button) => {
          button.addEventListener("click", () => {
            const nav = button.dataset.nav;
            if (nav === "ask") {
              window.location.href = "ask-emy.html";
              return;
            }
            if (nav === "chat") {
              window.location.href = "emy-customer-chat.html";
              return;
            }
            if (nav === "profile") {
              window.location.href = "emy-customer-profile.html";
              return;
            }
            if (nav === "uploads") {
              window.location.href = "emy-customer-home.html?tab=uploads#uploads";
              return;
            }
            if (nav === "home" || nav === "nearby" || nav === "feeds" || nav === "reels") {
              window.location.href = "emy-customer-home.html#" + encodeURIComponent(nav);
            }
          });
        });
        results.addEventListener("click", handleSearchFeedClick);
        results.addEventListener("submit", handleSearchFeedSubmit);
        window.addEventListener("emy:feed-action-state-changed", () => syncSearchFeedState(results));
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            closeFilter();
            closeSearchFeedOptions();
            setNotificationsOpen(false);
            setModalOpen(profileModal, false);
            setModalOpen(locationModal, false);
          }
        });
        document.addEventListener("click", (event) => {
          const optionButton = event.target.closest("[data-feed-option]");
          const menu = optionButton && optionButton.closest("[data-feed-options-menu][data-feed-options-scope='search']");
          if (optionButton && menu) {
            event.preventDefault();
            event.stopPropagation();
            handleSearchFeedOption(optionButton.dataset.feedOption, searchFeedCardForMenu(menu), menu);
            return;
          }
          closeCustomSelects();
          if (!event.target.closest("[data-feed-options], [data-feed-options-menu]")) closeSearchFeedOptions();
          setNotificationsOpen(false);
        });
        window.addEventListener("resize", () => {
          if (notificationPanel && notificationPanel.classList.contains("is-open")) positionNotificationsPanel();
          closeSearchFeedOptions();
        });
        window.addEventListener("scroll", closeSearchFeedOptions, { passive: true });
        window.addEventListener("hashchange", () => {
          const next = String(window.location.hash || "").replace("#", "");
          if (!searchTabs.includes(next) || next === activeTab) return;
          activeTab = next;
          if (activeTab === "reels") {
            const state = filterState.reels || {};
            activeReelType = state.reelType || activeReelType || "normal";
          }
          updateHeader();
          renderResults();
        });
        renderConnectedHeader();
        renderNotifications();
        window.addEventListener("emy:customer-notification-created", () => renderNotifications());
        window.addEventListener("storage", (event) => {
          if (event && event.key === "emyCustomerNotifications") renderNotifications();
        });
        updateHeader();
        renderResults();
        setupFeedCreateFlow((item) => {
          const itemId = item && item.id || "";
          const existing = !!(itemId && Array.from(results.querySelectorAll("[data-feed-id]")).some((card) => card.dataset.feedId === itemId));
          renderResults();
          showToast(existing ? "Post updated." : ((item && item.tag) || "Post") + " added to Search.");
        }, searchCurrentCustomerName);
`;
const customer_search_part_8 = String.raw`
      })();
    </script>
  </body>
`;

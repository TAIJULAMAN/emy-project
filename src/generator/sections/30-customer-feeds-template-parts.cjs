/* EMY template parts split from 30-template-customer-feeds.cjs */
const customer_feeds_part_1 = String.raw`
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | Feeds</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      :root { --emy-navy:#001b47; --emy-orange:#ff6a00; --emy-muted:#667085; --emy-line:rgba(0,27,71,.10); }
      * { box-sizing: border-box; }
      html, body { margin:0; min-height:100%; background:#fffdf8; color:var(--emy-navy); font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      body { min-height:100vh; overflow-x:hidden; }
      button { font:inherit; -webkit-tap-highlight-color:transparent; }
      .page { min-height:100dvh; background:radial-gradient(circle at 88% 2%, rgba(255,106,0,.10), transparent 230px), linear-gradient(180deg,#fff8ef 0%,#fffdf8 44%,#fff8ef 100%); }
      .shell { width:min(100%, 900px); margin:0 auto; padding:0 18px 118px; }
      .left-rail, .right-rail, .home-business-switch, .business-switch-spacer { display:none; }
      .left-rail-brand { display:flex; align-items:center; gap:10px; color:inherit; text-decoration:none; }
      .left-rail-brand img { width:138px; height:auto; display:block; }
      .left-rail-brand span { display:inline-flex; align-items:center; min-height:28px; border:1px solid rgba(255,106,0,.26); border-radius:999px; background:#fff7ef; color:#c14f00; padding:0 16px; font-size:10px; line-height:1; font-weight:820; letter-spacing:.14em; text-transform:uppercase; }
      .rail-card, .my-business-activity { color:var(--emy-navy); }
      .rail-card h2, .my-business-activity h3 { margin:0 0 12px; color:var(--emy-navy); font-size:18px; line-height:1.2; font-weight:780; }
      .rail-card-head { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:12px; }
      .rail-card-head h2 { margin:0; }
      .rail-card-head a, .customer-feed-link { color:#d95b00; text-decoration:none; font-size:12px; line-height:1.2; font-weight:780; }
      .rail-card-head a { display:grid; width:28px; height:28px; place-items:center; }
      .rail-card-head a svg { width:18px; height:18px; stroke-width:2.6; }
      .customer-feed-link svg { width:14px; height:14px; stroke-width:2.6; }
      .rail-summary { margin:0 0 14px; color:#667085; font-size:12px; line-height:1.45; font-weight:520; }
      .my-business-row, .my-business-update, .rail-pulse-item { color:inherit; text-decoration:none; }
      .my-business-row { display:grid; grid-template-columns:46px minmax(0,1fr) auto; gap:12px; align-items:center; min-height:58px; }
      .my-business-avatar {
        display:grid;
        width:46px;
        height:46px;
        place-items:center;
        border-radius:999px;
        background:linear-gradient(145deg,#f8fafc,#eef2f7);
        color:var(--emy-navy);
        font-size:14px;
        font-weight:850;
        line-height:1;
        box-shadow:inset 0 0 0 2px rgba(255,255,255,.88), 0 10px 18px rgba(0,27,71,.12);
      }
      .my-business-avatar.pizza,
      .my-business-avatar.shop,
      .my-business-avatar.person,
      .my-business-avatar.bottle,
      .my-business-avatar.supply { background:linear-gradient(145deg,#f8fafc,#eef2f7); }
      .my-business-copy, .my-business-update-copy { min-width:0; display:block; }
      .my-business-copy strong, .my-business-update-copy strong, .rail-pulse-item strong { display:block; overflow:hidden; color:var(--emy-navy); font-size:13px; line-height:1.2; font-weight:760; text-overflow:ellipsis; white-space:nowrap; }
      .my-business-copy span, .my-business-update-copy span, .rail-pulse-item span span { display:block; overflow:hidden; margin-top:3px; color:#56637a; font-size:11.5px; line-height:1.28; font-weight:620; text-overflow:ellipsis; white-space:nowrap; }
      .my-business-update-copy small { display:block; overflow:hidden; margin-top:4px; color:#8a96aa; font-size:10px; line-height:1.2; font-weight:680; text-overflow:ellipsis; white-space:nowrap; }
      .my-business-pill { width:7px; height:7px; border-radius:999px; background:#1463d9; color:transparent; overflow:hidden; }
      .my-business-toggle { display:grid; grid-template-columns:46px minmax(0,1fr); gap:12px; align-items:center; width:100%; min-height:48px; border:0; background:transparent; color:#171717; cursor:pointer; padding:4px 0; text-align:left; font-size:13px; line-height:1.2; font-weight:460; }
      .my-business-toggle:hover { color:var(--emy-orange); }
      .my-business-toggle-icon { display:grid; width:46px; height:30px; place-items:center; }
      .my-business-toggle-icon svg { width:20px; height:20px; stroke-width:2.4; transition:transform .16s ease; }
      .my-business-toggle.is-expanded .my-business-toggle-icon svg { transform:rotate(180deg); }
      .my-business-row[hidden], [data-my-business-extra][hidden] { display:none !important; }
      .my-business-toggle[hidden] { display:none; }
      .my-business-activity { margin-top:30px; }
      .my-business-update { display:grid; grid-template-columns:38px minmax(0,1fr) auto; gap:10px; align-items:center; min-height:58px; margin:0 0 9px; padding:8px; border:1px solid rgba(0,27,71,.08); border-radius:14px; background:linear-gradient(145deg,rgba(255,255,255,.86),rgba(255,250,244,.66)); box-shadow:0 10px 22px rgba(0,27,71,.05), inset 0 1px 0 rgba(255,255,255,.9); transition:border-color .16s ease, box-shadow .16s ease, transform .16s ease; }
      .my-business-update:hover { border-color:rgba(255,106,0,.22); box-shadow:0 14px 28px rgba(0,27,71,.08), 0 8px 18px rgba(255,106,0,.08), inset 0 1px 0 rgba(255,255,255,.94); transform:translateY(-1px); }
      .my-business-update-media { display:grid; width:38px; height:38px; place-items:center; overflow:hidden; border-radius:12px; background:linear-gradient(145deg,#f8fafc,#edf2f7); color:var(--emy-orange); font-size:13px; line-height:1; font-weight:850; box-shadow:inset 0 0 0 1px rgba(0,27,71,.06); }
      .my-business-update-media img { width:100%; height:100%; object-fit:cover; display:block; }
      .my-business-update-tag, .rail-tag { display:inline-flex; align-items:center; align-self:start; width:fit-content; min-height:22px; border-radius:999px; background:#fff4e8; color:#c14f00; padding:0 9px; font-size:10px; line-height:1; font-weight:820; }
      .business-switch { position:relative; z-index:3; width:100%; min-height:62px; border:1px solid rgba(255,106,0,.16); border-radius:18px; background:linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,247,238,.88)); color:var(--emy-navy); cursor:pointer; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 14px; text-align:left; box-shadow:0 18px 34px rgba(0,27,71,.08), 0 10px 24px rgba(255,106,0,.08), inset 0 1px 0 rgba(255,255,255,.94); transition:transform .18s ease, border-color .18s ease, box-shadow .18s ease; }
      .business-switch:hover { border-color:rgba(255,106,0,.34); transform:translateY(-2px); box-shadow:0 24px 46px rgba(0,27,71,.11), 0 12px 28px rgba(255,106,0,.14), inset 0 1px 0 rgba(255,255,255,.96); }
      .business-switch strong { display:block; font-size:13px; line-height:1.2; font-weight:760; }
      .business-switch span span { display:block; margin-top:5px; color:#718099; font-size:11px; line-height:1.35; font-weight:560; }
      .switch-track { position:relative; flex:0 0 auto; width:43px; height:26px; border:1px solid rgba(0,27,71,.10); border-radius:999px; background:linear-gradient(145deg,#f8fafc,#fff); box-shadow:inset 0 3px 8px rgba(0,27,71,.06), 0 8px 18px rgba(0,27,71,.08); transition:background .55s ease,border-color .55s ease,box-shadow .55s ease; }
      .switch-track::after { content:""; position:absolute; left:3px; top:3px; width:18px; height:18px; border-radius:999px; background:linear-gradient(145deg,#fff,#edf2f7); box-shadow:0 4px 10px rgba(0,27,71,.18); transition:left .55s ease,background .55s ease,box-shadow .55s ease; }
      .business-switch[data-business-switch-mode="create"] .switch-track,
      .business-switch[data-business-switch-mode="review"] .switch-track,
      .business-switch[data-business-switch-mode="rejected"] .switch-track { display:none; }
      .business-switch.is-switching .switch-track { border-color:rgba(255,106,0,.36); background:linear-gradient(145deg,#fff7ef,#fff0e3); box-shadow:inset 0 3px 8px rgba(117,52,0,.08), 0 8px 18px rgba(255,106,0,.14); }
      .business-switch.is-switching .switch-track::after { left:22px; background:linear-gradient(145deg,#ff9b45,#ff6a00); box-shadow:0 4px 10px rgba(117,52,0,.28); }
      .rail-stat-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:9px; }
      .rail-stat { display:block; min-height:72px; border:1px solid rgba(255,255,255,.56); border-radius:12px; background:linear-gradient(145deg, rgba(255,255,255,.56), rgba(255,255,255,.18)); color:inherit; text-decoration:none; padding:10px; box-shadow:inset 0 1px 0 rgba(255,255,255,.68), 0 10px 24px rgba(0,27,71,.045); }
      .rail-stat strong { display:block; color:var(--emy-navy); font-size:22px; line-height:1; font-weight:760; }
      .rail-stat.is-hot strong { color:#d85a00; }
      .rail-stat span { display:block; margin-top:7px; color:#667085; font-size:11px; line-height:1.25; font-weight:560; }
      .rail-pulse-item { display:grid; grid-template-columns:minmax(0,1fr); gap:0; align-items:center; padding:9px 0; }
      .topbar { display:grid; grid-template-columns:46px minmax(0,1fr) auto auto; align-items:center; gap:10px; min-height:58px; }
      .avatar { position:relative; height:42px; width:42px; border:2px solid rgba(255,255,255,.92); border-radius:999px; background:linear-gradient(135deg,#e7edf6,#fff7ed); display:grid; place-items:center; overflow:hidden; cursor:pointer; padding:0; color:var(--emy-navy); font:inherit; font-size:14px; font-weight:700; box-shadow:0 0 0 1px rgba(0,27,71,.12), 0 8px 18px rgba(0,27,71,.08); transition:border-color .16s ease, box-shadow .16s ease, transform .16s ease; }
      .avatar:hover, .avatar:focus-visible { border-color:rgba(255,106,0,.55); box-shadow:0 0 0 3px rgba(255,106,0,.12), 0 10px 22px rgba(0,27,71,.11); outline:none; transform:translateY(-1px); }
      .avatar img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; transform-origin:center; }
      .hello { min-width:0; display:grid; gap:3px; }
      .hello strong { display:block; color:var(--emy-navy); font-size:14px; line-height:1.05; font-weight:700; letter-spacing:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .location-btn { width:fit-content; border:1px solid rgba(0,27,71,.09); border-radius:999px; background:rgba(255,255,255,.76); color:#59667f; cursor:pointer; display:inline-flex; align-items:center; gap:6px; padding:4px 9px; max-width:100%; font-size:11px; line-height:1.2; font-weight:430; box-shadow:0 5px 14px rgba(0,27,71,.04); transition:background .16s ease, border-color .16s ease, color .16s ease, box-shadow .16s ease; }
      .location-btn:hover { border-color:rgba(255,106,0,.26); background:#fff; color:var(--emy-navy); box-shadow:0 8px 18px rgba(0,27,71,.07); }
      .location-btn svg { flex:0 0 auto; height:13px; width:13px; stroke-width:2.2; }
      .location-pin { color:var(--emy-orange); }
      .location-chevron { color:#8993a8; }
      .location-btn span { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .icon-btn { position:relative; height:36px; width:36px; border:0; border-radius:999px; background:rgba(255,255,255,.62); color:var(--emy-navy); cursor:pointer; display:grid; place-items:center; }
      .icon-btn:hover { background:#fff; box-shadow:0 8px 18px rgba(0,27,71,.08); }
      .icon-btn svg { width:19px; height:19px; stroke-width:2.2; }
      .notification-btn { width:40px !important; height:42px !important; padding:0 !important; border:0 !important; border-radius:0 !important; background:transparent !important; box-shadow:none !important; }
      .notification-btn:hover { background:transparent !important; box-shadow:none !important; color:var(--emy-orange); }
      .notification-btn svg { width:28px; height:28px; overflow:visible; filter:drop-shadow(0 2px 2px rgba(0,27,71,.22)) drop-shadow(0 9px 18px rgba(0,27,71,.16)); }
      .notification-btn .bell-body { fill:url(#emyBellFill); stroke:url(#emyBellStroke); stroke-width:1.8; }
      .notification-btn .bell-rim { stroke:rgba(0,27,71,.92); stroke-width:1.7; }
      .notification-btn .bell-highlight { stroke:rgba(255,255,255,.82); stroke-width:1.15; }
      .notification-btn .bell-clapper { fill:rgba(0,27,71,.86); stroke:rgba(255,255,255,.78); stroke-width:.65; }
      .notification-btn:hover svg { transform:translateY(-1px); filter:drop-shadow(0 3px 3px rgba(0,27,71,.24)) drop-shadow(0 10px 20px rgba(0,27,71,.18)); }
      .notification-count { position:absolute; right:1px; top:1px; min-width:16px; height:16px; padding:0 4px; border:1px solid rgba(255,255,255,.88); border-radius:999px; background:rgba(248,251,255,.95); color:var(--emy-navy); display:grid; place-items:center; font-size:9px; line-height:1; font-weight:800; box-shadow:0 0 0 1px rgba(0,27,71,.08), 0 5px 12px rgba(0,27,71,.14); }
      .notification-count[aria-label="0 notifications"], .notification-count[aria-label="0 unread notifications"], .notification-count.is-empty { display:none !important; }
      .feed-head { padding:12px 2px 8px; }
      .feed-head h1 { margin:0; font-size:18px; line-height:1.12; font-weight:680; letter-spacing:0; }
      .feed-head p { margin:5px 0 0; color:var(--emy-muted); font-size:11.5px; line-height:1.38; font-weight:500; }
      .composer { display:block; position:relative; margin:4px 0 14px; border: 1px solid rgba(0,27,71,.09); border-radius: 20px; background: #fff; box-shadow: 0 18px 42px rgba(0,27,71,.10), 0 10px 24px rgba(255,106,0,.07); padding: 14px 18px 12px; overflow: hidden; }
      .composer::before { content: ""; position: absolute; inset: 0 0 auto; height: 3px; background: linear-gradient(90deg, var(--emy-orange), rgba(255,106,0,.28), rgba(0,27,71,.10)); pointer-events: none; }
      .composer-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 44px minmax(0,1fr); gap: 12px; align-items: start; }
      .composer-avatar { position:relative; width: 44px; height: 44px; border-radius: 999px; border: 1px solid rgba(0,27,71,.10); background: linear-gradient(145deg,#fff,#fff5ec); color: var(--emy-navy); display: grid; place-items: center; overflow: hidden; font-size: 15px; font-weight: 820; box-shadow: 0 0 0 4px rgba(255,246,237,.92), 0 12px 24px rgba(0,27,71,.12); }
      .composer-avatar img { position:absolute; inset:0; width: 100%; height: 100%; border-radius:inherit; object-fit: cover; display: block; }
      .composer-main { min-width: 0; display: flex; flex-direction: column; gap: 9px; }
      .composer-prompt { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex: 0 0 auto; }
      .composer-prompt > span { min-width: 0; display: block; }
      .composer-prompt strong { color: var(--emy-navy); font-size: 13px; line-height: 1.15; font-weight: 820; }
      .composer-prompt small { display: block; margin-top: 3px; color: #73809a; font-size: 11px; line-height: 1.2; font-weight: 650; }
      .composer-prompt .feed-create-open { flex: 0 0 auto; min-height: 34px; padding: 0 14px; font-size: 12px; box-shadow: 0 12px 24px rgba(0,73,133,.20); }
      .composer-prompt em { flex: 0 0 auto; min-height: 25px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid rgba(255,106,0,.18); border-radius: 999px; background: #fff4e8; color: #d85a00; padding: 0 10px; font-style: normal; font-size: 10px; line-height: 1; font-weight: 850; text-transform: uppercase; letter-spacing: .08em; }
      .composer-input-wrap { --composer-input-min: 98px; min-height: var(--composer-input-min); display: flex; flex-direction: column; justify-content: flex-end; margin: 0 36px 0 -36px; border-bottom: 2px solid rgba(255,106,0,.34); transition: border-bottom-color .16s ease; }
      .composer-input-wrap:focus-within { border-bottom-color: rgba(255,106,0,.72); }
      .composer textarea { width: 100%; min-height: calc(1.32em + 2px); max-height: 280px; resize: vertical; border: 0; border-radius: 0; background: transparent; color: var(--emy-navy); outline: none; padding: 0 2px 1px; font-family: inherit; font-size: 14px; line-height: 1.32; font-weight: 560; letter-spacing: 0; box-shadow: none; box-sizing: border-box; overflow-y: auto; }
      .composer textarea:placeholder-shown { min-height: calc(1.32em + 2px); padding-top: 0; padding-bottom: 0; resize: none; }
      .composer textarea::placeholder { color: #8a94a8; font-family: inherit; font-size: 14px; font-weight: 520; letter-spacing: 0; opacity: 1; }
      .composer textarea:focus { background: transparent; box-shadow: none; }
      .composer-preview { position: relative; min-height: 180px; max-height: 360px; overflow: hidden; border: 1px solid rgba(0,27,71,.08); border-radius: 16px; background: #101828; aspect-ratio: var(--media-aspect-ratio, 1 / 1); box-shadow: 0 12px 26px rgba(0,27,71,.08); }
      .composer-preview[hidden] { display: none; }
      .composer-preview img, .composer-preview video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: var(--media-fit, contain); transform: translate(var(--media-x, 0%), var(--media-y, 0%)) scale(var(--media-zoom, 1)); transform-origin: center; display: block; background: #101828; }
      .composer-preview img[hidden], .composer-preview video[hidden] { display: none; }
      .composer-edit { position: absolute; left: 10px; bottom: 10px; z-index: 4; min-height: 32px; border: 1px solid rgba(255,255,255,.68); border-radius: 999px; background: rgba(255,255,255,.90); color: var(--emy-navy); padding: 0 12px; cursor: pointer; font-size: 12px; font-weight: 820; box-shadow: 0 10px 22px rgba(0,27,71,.14); }
      .composer-actions { position: relative; z-index: 4; display: flex; align-items: center; justify-content: flex-end; gap: 10px; padding: 14px 0 0; background: transparent; border-radius: 0; box-shadow: none; }
      .composer-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 9px; }
      .composer-tool, .composer-post, .composer-remove { min-height: 34px; border-radius: 999px; cursor: pointer; font-size: 12px; line-height: 1; font-weight: 780; transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease, background .16s ease, color .16s ease; }
      .composer-tool { display: inline-flex; align-items: center; gap: 7px; border: 1px solid rgba(0,27,71,.09); background: rgba(255,255,255,.92); color: #4f5d77; padding: 0 14px; box-shadow: 0 9px 18px rgba(0,27,71,.065); }
      .composer-tool svg { width: 16px; height: 16px; stroke-width: 2.25; }
      .composer-tool:hover { border-color: rgba(255,106,0,.30); color: var(--emy-orange); transform: translateY(-1px); box-shadow: 0 12px 22px rgba(0,27,71,.09); }
      .composer-remove { border: 1px solid rgba(0,27,71,.09); background: #fff; color: #59667f; padding: 0 13px; }
      .composer-remove:hover { border-color: rgba(255,106,0,.28); color: var(--emy-orange); }
      .composer-post { margin-left: auto; border: 0; background: linear-gradient(135deg,#ff6a00,#f97316); color: #fff; padding: 0 20px; box-shadow: 0 14px 26px rgba(255,106,0,.24); }
      .composer-post:hover { transform: translateY(-1px); box-shadow: 0 18px 32px rgba(255,106,0,.28); }
      .feed-media-overlay { position:fixed; inset:0; z-index:240; display:none; align-items:center; justify-content:center; padding:18px; background:rgba(15,23,42,.38); backdrop-filter:blur(10px); }
      .feed-media-overlay.is-open { display:flex; }
      .feed-media-sheet { width:min(100%,430px); border:1px solid rgba(0,27,71,.10); border-radius:14px; background:#fffdfa; box-shadow:0 24px 70px rgba(0,27,71,.22); padding:18px; }
      .feed-media-sheet h2 { margin:0; text-align:center; color:var(--emy-navy); font-size:18px; line-height:1.2; font-weight:760; }
      .feed-media-sheet p { margin:8px auto 0; max-width:330px; text-align:center; color:#61708c; font-size:12px; line-height:1.45; font-weight:500; }
      .feed-media-options { display:grid; gap:10px; margin-top:16px; }
      .feed-media-options button { border:1px solid rgba(0,27,71,.10); border-radius:10px; background:linear-gradient(145deg,#fff,#fff7ef); color:var(--emy-navy); cursor:pointer; display:grid; grid-template-columns:36px minmax(0,1fr); gap:10px; align-items:center; padding:12px; text-align:left; box-shadow:0 10px 22px rgba(0,27,71,.06); }
      .feed-media-options button:hover { border-color:rgba(255,106,0,.30); transform:translateY(-1px); box-shadow:0 14px 28px rgba(0,27,71,.10); }
      .feed-media-option-icon { width:36px; height:36px; border-radius:999px; background:#fff4e8; color:var(--emy-orange); display:grid; place-items:center; }
      .feed-media-option-icon svg { width:18px; height:18px; stroke-width:2.2; }
      .feed-media-options strong { display:block; color:var(--emy-navy); font-size:13px; line-height:1.15; font-weight:800; }
      .feed-media-options span:not(.feed-media-option-icon) { display:block; margin-top:3px; color:#6b7690; font-size:11px; line-height:1.3; font-weight:520; }
      .feed-media-close { width:100%; height:40px; margin-top:12px; border:1px solid rgba(0,27,71,.10); border-radius:9px; background:#fff; color:var(--emy-navy); cursor:pointer; font-size:13px; font-weight:720; }
      .feed-camera-frame { position:relative; margin-top:14px; width:100%; aspect-ratio:4/3; border:1px solid rgba(0,27,71,.10); border-radius:12px; background:#101828; overflow:hidden; }
      .feed-camera-frame.is-video { aspect-ratio:16/9; }
      .feed-camera-preview { width:100%; height:100%; object-fit:cover; display:block; background:#101828; }
      .feed-camera-sound { margin:10px 0 0; min-height:34px; border:1px solid rgba(0,27,71,.10); border-radius:8px; background:#fff; color:var(--emy-navy); display:none; align-items:center; justify-content:center; gap:8px; font-size:12px; font-weight:650; }
      .feed-camera-sound.is-visible { display:flex; }
      .feed-camera-sound input { width:15px; height:15px; margin:0; accent-color:var(--emy-orange); }
      .feed-camera-timer { display:none; width:fit-content; margin:10px auto 0; border-radius:999px; background:#fff4e8; color:#9a4b00; padding:5px 12px; font-size:12px; line-height:1; font-weight:750; }
      .feed-camera-timer.is-visible { display:block; }
      .feed-camera-status { min-height:18px; margin-top:10px !important; color:#9a4b00 !important; }
      .feed-camera-actions { margin-top:14px; display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      .feed-camera-actions.is-recording { grid-template-columns:1fr 1fr; }
      .feed-camera-actions button { height:40px; border-radius:8px; cursor:pointer; padding:0 12px; font-size:13px; font-weight:760; }
      .feed-camera-actions button:first-child { border:1px solid rgba(0,27,71,.12); background:#fff; color:var(--emy-navy); }
      .feed-camera-actions button:not(:first-child) { border:0; background:var(--emy-orange); color:#fff; }
      .feed-camera-actions .feed-camera-stop { background:#b42318; }
      .feed-camera-actions button[hidden] { display:none; }
      .feed-list { display:grid; grid-template-columns:minmax(0, 1fr); align-items:start; gap:16px; width:min(100%, 520px); margin:0 auto; padding-top:4px; }
      .feed-list .card { min-width:0; position:relative; border:1px solid rgba(0,27,71,.10); border-radius:8px; background:rgba(255,255,255,.94); box-shadow:0 10px 26px rgba(0,27,71,.08); overflow:hidden; }
      .feed-list .photo { height:112px; margin:8px 8px 0; border-radius:7px; background:#efe8e2; position:relative; overflow:hidden; }
      .feed-list .photo::before, .feed-list .photo::after { content:""; position:absolute; inset:0; }
      .feed-list .photo::after { background:linear-gradient(180deg, transparent 40%, rgba(0,0,0,.06)); }
      .feed-list .photo.pizza { background:radial-gradient(circle at 30% 45%, #ffd8a8 0 18px, transparent 19px), radial-gradient(circle at 62% 34%, #ed4f37 0 10px, transparent 11px), linear-gradient(135deg,#f9b15d,#7c301b); }
      .feed-list .photo.shop { background:linear-gradient(135deg,#e8edf1,#fff), radial-gradient(circle at 66% 30%, #d6a083, transparent 42px), linear-gradient(90deg,#39424f,transparent); }
      .feed-list .photo.tech { background:linear-gradient(135deg,#dbe2ea,#f8fafc), linear-gradient(100deg, transparent 0 40%, rgba(0,27,71,.25) 41% 45%, transparent 45%); }
      .feed-list .photo.bottle { background:linear-gradient(90deg,#e6edf2,#bfc8d0), radial-gradient(circle at 52% 42%, #44546b 0 22px, transparent 23px); }
      .feed-list .photo.feed { background:linear-gradient(135deg,#d6dde8,#f7ede2), radial-gradient(circle at 40% 60%, #6e5648, transparent 34px); }
      .feed-list .photo.reel { background:linear-gradient(145deg,#d9e6ef,#786f69), radial-gradient(circle at 64% 18%, rgba(255,255,255,.55), transparent 34px); }
      .feed-list .product-card, .feed-list .post-card, .feed-list .reel-card { transition:transform .16s ease, border-color .16s ease, box-shadow .16s ease; }
      .feed-list .product-card:hover, .feed-list .post-card:hover, .feed-list .reel-card:hover { transform:translateY(-2px); border-color:rgba(255,106,0,.24); box-shadow:0 20px 42px rgba(0,27,71,.12), 0 12px 26px rgba(255,106,0,.10); }
      .feed-list .product-card { display:grid; grid-template-columns:1fr; min-height:250px; }
      .feed-list .product-card .photo { width:auto; height:142px; min-height:0; margin:8px; }
      .feed-list .product-card .body, .feed-list .post-card .body { display:flex; flex-direction:column; padding:11px 12px 12px; }
      .feed-list .product-card .body { min-height:174px; }
      .feed-list .product-card h3, .feed-list .post-card h3 { display:-webkit-box; overflow:hidden; margin:0; color:var(--emy-navy); font-size:13.5px; line-height:1.2; font-weight:800; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
      .feed-list .product-card h3 { min-height:36px; }
      .feed-list .product-card p, .feed-list .post-card p { display:-webkit-box; overflow:hidden; margin:5px 0 0; color:#667085; font-size:11px; line-height:1.35; font-weight:450; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
      .feed-list .product-source { display:inline-flex; align-items:center; align-self:flex-start; min-height:20px; margin-top:7px; border-radius:999px; background:#f3f6fb; color:#55657c; padding:0 8px; font-size:10px; line-height:1; font-weight:680; }
      .feed-list .product-stats { display:flex; align-items:center; gap:8px; margin-top:9px; color:#667085; font-size:11px; line-height:1; font-weight:560; }
      .feed-list .product-stats span + span::before { content:""; display:inline-block; width:3px; height:3px; margin:0 8px 2px 0; border-radius:999px; background:rgba(102,112,133,.55); }
      .feed-list .product-stats { display:none !important; }
      .feed-list .price { display:inline-flex; width:fit-content; min-width:78px; min-height:28px; align-items:center; justify-content:center; margin-top:auto; border-radius:999px; background:#fff4e8; color:#d85a00; padding:0 10px; font-size:12px; line-height:1; font-weight:800; white-space:nowrap; }
      .feed-list .heart { position:absolute; right:12px; top:12px; z-index:4; width:36px; height:36px; border:1px solid rgba(0,27,71,.08); border-radius:999px; background:rgba(255,255,255,.92); color:#667085; cursor:pointer; display:grid; place-items:center; padding:0; box-shadow:0 8px 18px rgba(0,27,71,.10); }
      .feed-list .heart svg { width:19px; height:19px; }
      .feed-list.is-product-grid { grid-template-columns:repeat(2,minmax(0,226px)); width:min(100%,484px); justify-content:center; align-items:start; gap:16px; }
      .feed-list.is-product-grid .feed-product-card,
      .feed-list.is-product-grid .product-card { width:100%; max-width:226px; justify-self:stretch; }
      .feed-list.is-clip-grid { grid-template-columns:repeat(2,minmax(0,1fr)); width:min(100%,520px); justify-content:center; align-items:start; gap:10px; }
      .feed-list.is-clip-grid .social-feed-card.is-clip { width:100%; min-width:0; justify-self:stretch; }
      .feed-list .feed-product-card { position:relative; display:flex; flex-direction:column; overflow:hidden; width:min(226px,100%); justify-self:start; min-height:0; border-radius:8px; background:rgba(255,255,255,.96); box-shadow:0 18px 42px rgba(0,27,71,.10); }
      .feed-list .feed-product-card.is-new::before,
      .feed-list .feed-product-card[data-product-new="true"]::before { content:"New"; position:absolute; left:20px; top:20px; z-index:5; min-height:24px; display:inline-flex; align-items:center; border-radius:999px; background:rgba(255,255,255,.94); color:#d85a00; padding:0 11px; font-size:11px; line-height:1; font-weight:850; box-shadow:0 10px 22px rgba(0,27,71,.12); }
      .feed-list .feed-product-card .photo { position:relative; display:block; flex:0 0 auto; width:auto; height:auto; min-height:0; aspect-ratio:4/3; margin:8px 8px 0; border-radius:7px; overflow:hidden; background-size:cover; background-position:center; }
      .feed-list .feed-product-card .photo img,
      .feed-list .feed-product-card .photo video { position:absolute; inset:0; display:block; width:100%; height:100%; object-fit:cover; object-position:center; transform:translate(var(--media-x,0%), var(--media-y,0%)) scale(var(--media-zoom,1)); transform-origin:center; }
      .feed-list .feed-product-card .body { flex:1 1 auto; min-width:0; min-height:0; padding:14px 12px 12px; }
      .feed-list .feed-product-card h3 { min-height:0; font-size:14px; line-height:1.18; font-weight:850; -webkit-line-clamp:2; }
      .feed-list .feed-product-card p { min-height:0; margin:5px 0 0; color:#68738a; font-size:12.5px; line-height:1.35; font-weight:560; -webkit-line-clamp:1; }
      .feed-list .feed-product-card .product-source { min-height:20px; margin-top:8px; padding:0 8px; background:#f3f6fb; color:#55657c; font-size:11px; font-weight:760; }
      .feed-list .product-availability { display:flex; max-width:100%; align-items:flex-start; gap:6px; margin-top:8px; color:#0f8f57; font-size:12.5px; line-height:1.25; font-weight:850; white-space:normal; overflow-wrap:anywhere; }
      .feed-list .product-availability::before { content:""; width:10px; height:10px; flex:0 0 10px; margin-top:.16em; border-radius:999px; background:#20c987; box-shadow:0 0 0 3px rgba(32,201,135,.12); }
      .feed-list .feed-product-card .product-stats { margin-top:9px; color:#68738a; font-size:12.5px; font-weight:760; }
      .feed-list .feed-product-card .product-stats { display:none !important; }
      .feed-list .feed-product-card .price { min-width:78px; min-height:28px; margin-top:6px; border-radius:999px; color:#d85a00; padding:0 10px; font-size:13px; font-weight:850; }
      .feed-list .feed-product-card .heart { right:18px; top:18px; width:46px; height:46px; border-color:rgba(255,255,255,.72); background:rgba(255,255,255,.78); color:#667085; box-shadow:0 16px 30px rgba(0,27,71,.14), inset 0 1px 0 rgba(255,255,255,.88); backdrop-filter:blur(14px) saturate(1.08); }
      .feed-list .feed-product-card .social-feed-more { position:absolute; right:18px; top:18px; z-index:6; width:46px; min-height:46px; border:1px solid rgba(255,255,255,.72); background:rgba(255,255,255,.78); box-shadow:0 16px 30px rgba(0,27,71,.14), inset 0 1px 0 rgba(255,255,255,.88); backdrop-filter:blur(14px) saturate(1.08); }
      .feed-list .feed-product-card .heart svg { width:24px; height:24px; }
      .feed-list .feed-product-card .heart.is-active, .feed-list .feed-product-card .heart.is-liked { border-color:rgba(255,106,0,.34); background:rgba(255,244,232,.88); color:var(--emy-orange); }
      .feed-list .post-card { display:grid; grid-template-rows:auto auto 1fr; min-height:286px; background:linear-gradient(180deg, rgba(255,255,255,.98), rgba(255,250,246,.96)); }
      .feed-list .post-head { display:grid; grid-template-columns:32px minmax(0,1fr); gap:8px; align-items:center; padding:10px 11px 0; }
      .feed-list .post-avatar { width:32px; height:32px; border-radius:10px; box-shadow:inset 0 0 0 1px rgba(255,255,255,.70), 0 8px 16px rgba(0,27,71,.08); }
      .feed-list .post-avatar.pizza { background:radial-gradient(circle at 36% 46%, #ffd8a8 0 8px, transparent 9px), radial-gradient(circle at 66% 34%, #ed4f37 0 5px, transparent 6px), linear-gradient(135deg,#f9b15d,#7c301b); }
      .feed-list .post-avatar.shop { background:linear-gradient(135deg,#e8edf1,#fff), radial-gradient(circle at 66% 30%, #d6a083, transparent 16px), linear-gradient(90deg,#39424f,transparent); }
      .feed-list .post-avatar.bottle { background:linear-gradient(90deg,#e6edf2,#bfc8d0), radial-gradient(circle at 52% 42%, #44546b 0 9px, transparent 10px); }
      .feed-list .post-avatar.feed { background:linear-gradient(135deg,#d6dde8,#f7ede2), radial-gradient(circle at 40% 60%, #6e5648, transparent 14px); }
      .feed-list .post-head strong { display:block; overflow:hidden; color:var(--emy-navy); font-size:12px; line-height:1.15; font-weight:780; text-overflow:ellipsis; white-space:nowrap; }
      .feed-list .post-head small { display:block; margin-top:3px; color:#73809a; font-size:10px; line-height:1; font-weight:650; }
      .feed-list .post-card .photo { width:100%; height:auto; aspect-ratio:4 / 3; min-height:0; margin:10px 0 0; border-radius:0; background-size:cover; background-position:center; }
      .feed-list .post-badge { position:absolute; left:9px; top:9px; z-index:2; border-radius:999px; background:rgba(255,255,255,.94); color:#d85a00; padding:5px 7px; font-size:9px; line-height:1; font-weight:820; box-shadow:0 7px 15px rgba(0,27,71,.10); }
      .feed-list .post-card .body { min-height:132px; padding:10px 11px 12px; }
      .feed-list .post-meta { margin-top:auto; padding-top:10px; display:flex; align-items:center; justify-content:space-between; gap:8px; color:#667085; font-size:10px; font-weight:700; }
      .feed-list .post-meta span:last-child { border-radius:999px; background:#fff4e8; color:#c14f00; padding:6px 8px; line-height:1; }
      .feed-list .feed-post-card { width:min(100%,502px); justify-self:center; overflow:hidden; display:grid; grid-template-rows:auto auto 1fr; min-height:574px; border:1px solid rgba(0,27,71,.10); border-radius:8px; background:rgba(255,255,255,.98); box-shadow:0 18px 42px rgba(0,27,71,.10); }
      .feed-list .feed-post-card .post-head { grid-template-columns:42px minmax(0,1fr); gap:10px; min-height:68px; padding:12px 16px; }
      .feed-list .feed-post-card .post-avatar { width:38px; height:38px; border-radius:10px; }
      .feed-list .feed-post-card .post-head strong { font-size:16px; line-height:1.12; font-weight:850; }
      .feed-list .feed-post-card .post-head small { color:#69758d; font-size:13px; line-height:1.1; font-weight:720; }
      .feed-list .feed-post-card .photo { width:100%; height:auto; aspect-ratio:4 / 3; min-height:0; margin:0; border-radius:0; }
      .feed-list .feed-post-card .post-badge { left:16px; top:12px; min-height:26px; display:inline-flex; align-items:center; padding:0 12px; font-size:12px; font-weight:850; }
      .feed-list .feed-post-card .body { min-height:166px; padding:16px; }
      .feed-list .feed-post-card h3 { display:block; min-height:0; overflow:hidden; font-size:20px; line-height:1.18; font-weight:850; white-space:nowrap; text-overflow:ellipsis; -webkit-line-clamp:1; }
      .feed-list .feed-post-card p { margin:28px 0 0; color:#667085; font-size:16px; line-height:1.45; font-weight:650; -webkit-line-clamp:2; }
      .feed-list .feed-post-card .post-meta { padding-top:14px; font-size:14px; font-weight:850; }
      .feed-list .feed-post-card .post-meta span:last-child { min-height:30px; display:inline-flex; align-items:center; padding:0 13px; }
      .feed-list .feed-post-card.is-text-post { grid-template-rows:auto 1fr; min-height:218px; }
      .feed-list .feed-post-card.is-text-post .photo { display:none; }
      .feed-list .feed-post-card.is-text-post .body { min-height:150px; padding-top:18px; }
      .feed-list .feed-post-card.is-text-post h3 { white-space:normal; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
      .feed-list .feed-post-card.is-text-post p { margin-top:14px; -webkit-line-clamp:4; }
      .feed-list .reel-card { position:relative; display:block; min-height:264px; aspect-ratio:9 / 16; border:1px solid rgba(0,27,71,.08); border-radius:10px; overflow:hidden; background:#101828; color:#fff; box-shadow:0 14px 30px rgba(0,27,71,.14); }
      .feed-list .feed-clip-card { width:min(242px,100%); justify-self:start; min-height:432px; border-radius:8px; background:linear-gradient(180deg,#c7d0d8 0%,#aab4bd 42%,#52627a 70%,#061f4b 100%); box-shadow:0 18px 42px rgba(0,27,71,.14); }
      .feed-list .reel-card .photo { position:absolute; inset:0; width:100%; height:100%; min-height:0; margin:0; border-radius:0; }
      .feed-list .reel-card .photo::after { background:linear-gradient(180deg, rgba(0,27,71,.16) 0%, transparent 32%, rgba(0,27,71,.88) 100%); }
      .feed-list .feed-clip-card .photo { opacity:.72; background:linear-gradient(180deg,#cbd5dd 0%,#aeb8c0 42%,#56677f 70%,#061f4b 100%); }
      .feed-list .feed-clip-card .photo::after { background:linear-gradient(180deg, rgba(255,255,255,.08) 0%, rgba(0,27,71,.02) 42%, rgba(0,27,71,.52) 78%, rgba(0,27,71,.82) 100%); }
      .feed-list .reel-top { position:absolute; top:10px; left:10px; right:10px; z-index:2; display:grid; grid-template-columns:30px minmax(0,1fr) auto; gap:7px; align-items:center; }
      .feed-list .feed-clip-card .reel-top { top:14px; left:16px; right:16px; grid-template-columns:38px minmax(0,1fr) auto; gap:10px; }
      .feed-list .reel-card .social-feed-more { position:absolute; right:14px; top:12px; z-index:7; width:34px; min-height:34px; border:1px solid rgba(255,255,255,.46); background:rgba(8,19,38,.34); color:#fff; box-shadow:0 10px 22px rgba(0,27,71,.20), inset 0 1px 0 rgba(255,255,255,.20); backdrop-filter:blur(12px) saturate(1.08); }
      .feed-list .reel-avatar { width:30px; height:30px; border:2px solid rgba(255,255,255,.88); border-radius:999px; box-shadow:0 8px 16px rgba(0,27,71,.18); display:block; text-decoration:none; cursor:pointer; }
      .feed-list .reel-owner-link, .feed-list .post-head .feed-profile-link { min-width:0; color:inherit; display:grid; line-height:1.15; text-decoration:none; }
      .feed-list .feed-clip-card .reel-avatar { width:38px; height:38px; border-color:rgba(255,255,255,.92); box-shadow:0 11px 22px rgba(0,27,71,.28), inset 0 1px 0 rgba(255,255,255,.7); }
      .feed-list .reel-avatar.pizza { background:radial-gradient(circle at 32% 40%, #ffd9a8 0 15px, transparent 16px), radial-gradient(circle at 66% 34%, #d93426 0 8px, transparent 9px), linear-gradient(135deg,#f6a249,#64321f); }
      .feed-list .reel-avatar.shop { background:linear-gradient(135deg,#e8edf1,#fff), radial-gradient(circle at 66% 30%, #d6a083, transparent 16px), linear-gradient(90deg,#39424f,transparent); }
      .feed-list .reel-avatar.feed { background:linear-gradient(135deg,#d6dde8,#f7ede2), radial-gradient(circle at 40% 60%, #6e5648, transparent 14px); }
      .feed-list .reel-avatar.bottle { background:linear-gradient(120deg,#e8edf2,#c2ccd4), radial-gradient(circle at 52% 44%, #4c5d70 0 18px, transparent 19px); }
      .feed-list .reel-top strong { display:block; overflow:hidden; color:#fff; font-size:11px; line-height:1.1; font-weight:800; text-overflow:ellipsis; white-space:nowrap; }
      .feed-list .reel-top small { display:block; margin-top:2px; color:rgba(255,255,255,.78); font-size:9px; line-height:1; font-weight:650; }
      .feed-list .feed-clip-card .reel-top strong { color:#fff; font-size:15px; line-height:1.05; font-weight:850; text-shadow:0 2px 8px rgba(0,27,71,.20); }
      .feed-list .feed-clip-card .reel-top small { color:rgba(255,255,255,.88); font-size:13px; line-height:1.05; font-weight:720; }
      .feed-list .reel-type-badge { display:inline-flex; align-items:center; min-height:22px; border-radius:999px; background:rgba(255,255,255,.92); color:var(--emy-navy); padding:0 8px; font-size:9px; font-weight:800; }
      .feed-list .feed-clip-card .reel-type-badge { min-height:28px; padding:0 13px; background:rgba(255,255,255,.92); color:#061f4b; font-size:13px; font-weight:850; box-shadow:0 12px 24px rgba(0,27,71,.14); }
      .feed-list .reel-play { position:absolute; left:50%; top:48%; z-index:2; width:46px; height:46px; transform:translate(-50%,-50%); border-radius:999px; background:rgba(255,255,255,.92); color:var(--emy-navy); display:grid; place-items:center; box-shadow:0 14px 30px rgba(0,27,71,.22); }
      .feed-list .feed-clip-card .reel-play { top:48%; width:58px; height:58px; background:rgba(255,255,255,.94); color:#061f4b; box-shadow:0 18px 36px rgba(0,27,71,.24), inset 0 1px 0 rgba(255,255,255,.86); backdrop-filter:blur(12px); }
      .feed-list .reel-play svg { width:23px; height:23px; margin-left:2px; fill:currentColor; }
      .feed-list .feed-clip-card .reel-play svg { width:29px; height:29px; }
      .feed-list .reel-card .caption { position:absolute; left:0; right:0; bottom:0; z-index:2; display:flex; min-height:136px; flex-direction:column; padding:52px 11px 11px; color:#fff; background:linear-gradient(180deg, transparent, rgba(0,27,71,.92)); }
      .feed-list .feed-clip-card .caption { min-height:152px; padding:42px 16px 16px; background:linear-gradient(180deg, transparent 0%, rgba(0,27,71,.52) 24%, rgba(0,27,71,.92) 100%); }
      .feed-list .reel-card .caption strong { min-height:31px; display:-webkit-box; overflow:hidden; color:#fff; font-size:13px; line-height:1.15; font-weight:850; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
      .feed-list .feed-clip-card .caption strong { min-height:28px; font-size:20px; line-height:1.1; font-weight:900; letter-spacing:0; text-shadow:0 2px 12px rgba(0,27,71,.24); }
      .feed-list .reel-card .caption > span { min-height:26px; display:-webkit-box; overflow:hidden; margin-top:4px; color:rgba(255,255,255,.82); font-size:10px; line-height:1.25; font-weight:560; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
      .feed-list .feed-clip-card .caption > span { min-height:36px; margin-top:8px; color:rgba(255,255,255,.88); font-size:14px; line-height:1.12; font-weight:780; -webkit-line-clamp:2; }
      .feed-list .reel-duration { position:absolute; right:16px; bottom:44px; z-index:3; min-height:28px; display:inline-flex; align-items:center; border-radius:999px; background:rgba(0,27,71,.78); color:#fff; padding:0 10px; font-size:13px; line-height:1; font-weight:850; box-shadow:0 12px 24px rgba(0,27,71,.22); }
      .feed-list .reel-actions { display:flex; align-items:center; justify-content:space-between; gap:7px; margin-top:auto; padding-top:8px; color:rgba(255,255,255,.86); font-size:9.5px; font-weight:720; }
      .feed-list .feed-clip-card .reel-actions { gap:14px; padding-top:12px; color:rgba(255,255,255,.92); font-size:14px; font-weight:850; }
      .feed-list .reel-actions span { margin:0; white-space:nowrap; }
      .feed-list .reel-inline-action { min-height:0; border:0; border-radius:0; background:transparent; color:rgba(255,255,255,.94); cursor:pointer; padding:0; font:inherit; font-size:14px; line-height:1; font-weight:850; box-shadow:none; }
      .feed-list .reel-inline-action:hover, .feed-list .reel-inline-action.is-active { color:#fff4e8; background:transparent; }
      .feed-list .feed-product-clip-card { width:min(242px,100%); justify-self:start; min-height:432px; border-radius:8px; background:linear-gradient(180deg,#d9964d 0%,#bf6f38 42%,#463442 72%,#061f4b 100%); box-shadow:0 18px 42px rgba(0,27,71,.16); }
      .feed-list .feed-product-clip-card .photo { opacity:.76; background:radial-gradient(circle at 66% 44%, #e94234 0 13px, transparent 14px), radial-gradient(circle at 31% 21%, #ffd6a8 0 19px, transparent 20px), linear-gradient(180deg,#d9964d 0%,#b66d3b 48%,#061f4b 100%); }
      .feed-list .feed-product-clip-card .photo::after { background:linear-gradient(180deg, rgba(0,27,71,.02) 0%, rgba(0,27,71,.18) 48%, rgba(0,27,71,.74) 100%); }
      .feed-list .feed-product-clip-card .reel-type-badge { min-height:28px; padding:0 13px; background:#fff; color:#061f4b; font-size:13px; font-weight:850; }
      .feed-list .feed-product-clip-card .reel-top strong { font-size:14px; }
      .feed-list .feed-product-clip-card .reel-top small { font-size:12px; }
      .feed-list .feed-product-clip-card .reel-play { top:48%; width:58px; height:58px; background:rgba(255,255,255,.82); color:#061f4b; backdrop-filter:blur(12px); }
      .feed-list .feed-product-clip-card .caption { min-height:252px; padding:40px 16px 16px; background:linear-gradient(180deg, transparent 0%, rgba(0,27,71,.36) 20%, rgba(0,27,71,.94) 100%); }
      .feed-list .feed-product-clip-card .caption strong { min-height:auto; font-size:20px; line-height:1.1; font-weight:900; }
      .feed-list .product-clip-copy { min-height:34px; display:-webkit-box; overflow:hidden; margin-top:8px; color:rgba(255,255,255,.88); font-size:14px; line-height:1.12; font-weight:780; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
      .feed-list .feed-product-clip-card .reel-actions { gap:14px; padding-top:10px; font-size:14px; font-weight:850; }
      .feed-list .product-clip-panel { min-height:120px; margin-top:12px; border-radius:8px; background:rgba(255,255,255,.90); color:#061f4b; padding:12px; box-shadow:inset 0 1px 0 rgba(255,255,255,.86), 0 14px 30px rgba(0,27,71,.18); }
      .feed-list .product-clip-panel strong { display:block; min-height:auto; color:rgba(255,255,255,.66); font-size:19px; line-height:1.1; font-weight:900; text-shadow:none; }
      .feed-list .product-clip-panel span { display:block; overflow:hidden; margin-top:18px; color:rgba(255,255,255,.58); font-size:14px; line-height:1.15; font-weight:760; white-space:nowrap; text-overflow:ellipsis; }
      .feed-list .product-clip-price { min-height:32px; display:inline-flex; align-items:center; justify-content:center; margin-top:10px; border-radius:999px; background:#fff4e8; color:#d85a00; padding:0 18px; font-size:15px; font-weight:900; font-style:normal; }
      .feed-list .feed-business-profile-card { width:min(100%,502px); justify-self:center; overflow:hidden; border:1px solid rgba(0,27,71,.10); border-radius:8px; background:rgba(255,255,255,.98); color:var(--emy-navy); box-shadow:0 18px 42px rgba(0,27,71,.10); }
      .feed-business-profile-cover { position:relative; display:block; min-height:272px; overflow:hidden; border-radius:8px 8px 0 0; background:radial-gradient(circle at 33% 40%, rgba(255,255,255,.68) 0 54px, transparent 56px), radial-gradient(circle at 67% 32%, rgba(212,166,138,.66) 0 62px, transparent 64px), linear-gradient(145deg,#e7eef4 0%,#b6c1cb 48%,#283e61 100%); text-decoration:none; }
      .feed-business-profile-cover.profile-video { background:radial-gradient(circle at 30% 34%, rgba(255,255,255,.78) 0 86px, transparent 88px), radial-gradient(circle at 50% 72%, rgba(255,255,255,.42) 0 58px, transparent 60px), radial-gradient(circle at 74% 22%, rgba(214,175,152,.55) 0 118px, transparent 120px), radial-gradient(circle at 68% 58%, #e94b3e 0 29px, transparent 31px), linear-gradient(180deg,#e2eaf1 0%,#9baabb 52%,#233c64 100%); }
      .feed-business-profile-cover img, .feed-business-profile-cover video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
      .feed-business-profile-badge, .feed-business-profile-pill { position:absolute; z-index:3; min-height:29px; display:inline-flex; align-items:center; justify-content:center; border-radius:999px; background:rgba(255,255,255,.94); padding:0 13px; font-size:12px; line-height:1; font-weight:850; box-shadow:0 14px 30px rgba(0,27,71,.12); backdrop-filter:blur(12px); }
      .feed-business-profile-badge { left:14px; top:14px; border:1px solid rgba(255,106,0,.20); color:#d85a00; }
      .feed-business-profile-pill { right:14px; top:14px; border:1px solid rgba(0,27,71,.08); color:var(--emy-navy); text-decoration:none; }
      .feed-business-profile-pause { position:absolute; right:18px; top:86px; z-index:3; width:42px; height:42px; border-radius:999px; border:1px solid rgba(255,255,255,.62); background:rgba(255,250,246,.58); color:#fff; display:grid; place-items:center; font-size:13px; font-weight:900; letter-spacing:.08em; box-shadow:0 12px 26px rgba(0,27,71,.12); backdrop-filter:blur(12px); }
      .feed-business-profile-avatar { position:absolute; left:16px; bottom:16px; z-index:3; width:58px; height:58px; overflow:hidden; border:3px solid rgba(255,255,255,.92); border-radius:999px; background:radial-gradient(circle at 50% 34%, #6b4c3f 0 10px, transparent 11px), linear-gradient(145deg,#15263f,#0d1726); color:#fff; display:grid; place-items:center; font-size:19px; font-weight:850; box-shadow:0 13px 28px rgba(0,27,71,.24); }
      .feed-business-profile-avatar img { width:100%; height:100%; object-fit:cover; display:block; }
      .feed-business-profile-duration { position:absolute; right:16px; bottom:15px; z-index:3; min-height:28px; display:inline-flex; align-items:center; border-radius:999px; background:rgba(0,27,71,.86); color:#fff; padding:0 10px; font-size:13px; line-height:1; font-weight:850; box-shadow:0 12px 24px rgba(0,27,71,.22); }
      .feed-business-profile-body { padding:20px 18px 16px; }
      .feed-business-profile-body h3 { margin:0; color:var(--emy-navy); font-size:24px; line-height:1.12; font-weight:850; letter-spacing:0; }
      .feed-business-profile-copy { margin:7px 0 0; color:#667085; font-size:16px; line-height:1.35; font-weight:650; }
      .feed-business-profile-status, .feed-business-profile-address, .feed-business-profile-hours { min-width:0; max-width:100%; margin-top:8px; color:#68738a; font-size:16px; line-height:1.3; font-weight:650; white-space:normal; overflow-wrap:anywhere; }
      .feed-business-profile-status { display:flex; align-items:flex-start; gap:7px; color:#0f8f57; font-weight:850; }
      .feed-business-profile-status::before { content:""; width:10px; height:10px; flex:0 0 10px; margin-top:.2em; border-radius:999px; background:#20c987; box-shadow:0 0 0 3px rgba(32,201,135,.13); }
      .feed-business-profile-chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
      .feed-business-profile-chips span { min-height:26px; display:inline-flex; align-items:center; border-radius:999px; background:#f3f6fb; color:#667085; padding:0 11px; font-size:12px; line-height:1; font-weight:800; }
      .feed-business-profile-hours { font-size:14px; font-weight:760; }
      .feed-business-profile-actions { display:flex; flex-wrap:wrap; align-items:center; gap:10px; margin-top:15px; }
      .feed-business-profile-actions button { min-height:40px; border-radius:999px; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:0 14px; font-size:13px; line-height:1; font-weight:850; }
      .feed-business-profile-customer { border:1px solid rgba(32,201,135,.22); background:rgba(236,253,243,.78); color:#087443; box-shadow:0 12px 24px rgba(16,185,129,.12), inset 0 1px 0 rgba(255,255,255,.78); backdrop-filter:blur(14px); }
      .feed-business-profile-customer::before { content:""; width:10px; height:10px; border-radius:999px; background:#20c987; box-shadow:0 0 0 3px rgba(32,201,135,.13); }
      .feed-business-profile-like { border:1px solid rgba(0,27,71,.10); background:rgba(255,255,255,.72); color:#4f5d77; box-shadow:0 12px 26px rgba(0,27,71,.08), inset 0 1px 0 rgba(255,255,255,.82); backdrop-filter:blur(16px); }
      .feed-business-profile-like svg { width:18px; height:18px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
      .feed-business-profile-like.is-active { border-color:rgba(255,106,0,.28); background:rgba(255,244,232,.78); color:#d85a00; }
      .feed-business-profile-repost { border:1px solid rgba(0,27,71,.10); background:rgba(255,255,255,.72); color:#4f5d77; box-shadow:0 12px 26px rgba(0,27,71,.08), inset 0 1px 0 rgba(255,255,255,.82); backdrop-filter:blur(16px); }
      .feed-business-profile-repost svg { width:18px; height:18px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
      .feed-business-profile-repost.is-active { border-color:rgba(255,106,0,.28); background:rgba(255,244,232,.78); color:#d85a00; }
      @media (max-width:520px){ .feed-list.is-product-grid { grid-template-columns:minmax(0,226px); width:100%; } .feed-list.is-clip-grid { grid-template-columns:repeat(2,minmax(0,1fr)); width:100%; } }
      .feed-card { display:grid; grid-template-rows:auto auto 1fr; overflow:hidden; border:1px solid rgba(0,27,71,.10); border-radius:8px; background:rgba(255,255,255,.94); color:inherit; text-decoration:none; box-shadow:0 10px 26px rgba(0,27,71,.08); transition:transform .16s ease, border-color .16s ease, box-shadow .16s ease; }
      .feed-card:hover { border-color:rgba(255,106,0,.24); box-shadow:0 20px 42px rgba(0,27,71,.12), 0 12px 26px rgba(255,106,0,.10); }
      .feed-card:not(:has(.feed-media-carousel)):not(:has([data-feed-media-carousel])):hover { transform:translateY(-2px); }
      .feed-card-head { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; align-items:center; padding:11px 12px 8px; }
      .feed-profile-link { min-width:0; display:grid; grid-template-columns:38px minmax(0,1fr); gap:9px; align-items:center; color:inherit; text-decoration:none; }
      .feed-avatar { width:38px; height:38px; border-radius:999px; box-shadow:inset 0 0 0 2px rgba(255,255,255,.86), 0 7px 16px rgba(0,27,71,.11); }
      .feed-avatar.pizza, .feed-media.pizza { background:radial-gradient(circle at 34% 42%, #ffd8a8 0 20px, transparent 21px), radial-gradient(circle at 67% 34%, #ed4f37 0 10px, transparent 11px), linear-gradient(135deg,#f9b15d,#7c301b); }
      .feed-avatar.shop, .feed-media.shop { background:linear-gradient(135deg,#e8edf1,#fff), radial-gradient(circle at 66% 30%, #d6a083, transparent 34px), linear-gradient(90deg,#39424f,transparent); }
      .feed-avatar.bottle, .feed-media.bottle { background:linear-gradient(90deg,#e6edf2,#bfc8d0), radial-gradient(circle at 52% 42%, #44546b 0 24px, transparent 25px); }
      .feed-avatar.feed, .feed-media.feed { background:linear-gradient(135deg,#d6dde8,#f7ede2), radial-gradient(circle at 40% 60%, #6e5648, transparent 24px); }
      .feed-avatar.tech, .feed-media.tech { background:linear-gradient(145deg,#dbe4ec,#f8fbff); }
      .feed-card-head strong { display:block; overflow:hidden; color:var(--emy-navy); font-size:13px; line-height:1.15; font-weight:760; text-overflow:ellipsis; white-space:nowrap; }
      .feed-card-head small { display:block; margin-top:3px; color:var(--emy-muted); font-size:10.5px; line-height:1; font-weight:580; }
      .feed-card-head a { color:inherit; text-decoration:none; }
      .feed-card-head a:hover strong { color:var(--emy-orange); }
      .feed-tag { display:inline-flex; align-items:center; min-height:21px; border-radius:999px; background:#fff4e8; color:#c14f00; padding:0 8px; font-size:9.5px; line-height:1; font-weight:800; }
      .feed-media-link { display:block; color:inherit; text-decoration:none; }
      .feed-media { position:relative; width:100%; height:auto; aspect-ratio:4/3; min-height:0; margin:0; border-radius:0; overflow:hidden; background-size:cover; background-position:center; }
      .feed-media img, .feed-media video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
      .feed-media::after { content:""; position:absolute; inset:0; background:linear-gradient(180deg, rgba(255,255,255,.04), rgba(0,27,71,.10)); }
      .feed-play { position:absolute; left:50%; top:50%; z-index:2; transform:translate(-50%,-50%); width:46px; height:46px; border-radius:999px; background:rgba(255,255,255,.92); color:var(--emy-navy); display:none; place-items:center; box-shadow:0 12px 24px rgba(0,27,71,.20); transition:opacity .16s ease, transform .16s ease; }
      .feed-card.is-clip .feed-play { display:grid; }
      .feed-card.is-clip:hover .feed-play, .feed-card.is-clip:focus-within .feed-play, .feed-card.is-clip.is-previewing .feed-play { opacity:.74; transform:translate(-50%,-50%) scale(.92); }
      .feed-play svg { width:26px; height:26px; margin-left:2px; fill:currentColor; }
      .feed-body { padding:11px 12px 12px; }
      .feed-body h2 { margin:0; color:var(--emy-navy); font-size:13px; line-height:1.18; font-weight:700; }
      .feed-body p { margin:5px 0 0; color:var(--emy-muted); font-size:11px; line-height:1.35; font-weight:450; }
      .feed-actions { display:flex; flex-wrap:wrap; align-items:center; gap:7px; margin-top:10px; color:#667085; font-size:10.5px; font-weight:680; }
      .feed-action { min-height:30px; border:1px solid rgba(0,27,71,.07); border-radius:999px; background:#f3f6fb; color:#667085; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:4px; padding:0 9px; font-size:10.5px; font-weight:740; }
      .feed-action svg { width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
      .feed-action:hover, .feed-action.is-active { border-color:rgba(255,106,0,.24); background:#fff4e8; color:var(--emy-orange); }
      .feed-price { display:inline-flex; width:fit-content; min-width:78px; min-height:28px; align-items:center; justify-content:center; margin-top:10px; border-radius:999px; background:#fff4e8; color:#d85a00; padding:0 10px; font-size:12px; line-height:1; font-weight:820; white-space:nowrap; }
      .feed-comments { position:relative; z-index:9; isolation:isolate; display:none; margin:10px 12px 12px; border-top:1px solid rgba(0,27,71,.07); background:#fff; padding-top:9px; box-sizing:border-box; overflow:hidden; }
      .feed-card.is-comments-open .feed-comments { display:block; }
      .product-card.is-comments-open .feed-comments { display:block; }
      .reel-card.is-comments-open .feed-comments { display:block; }
      .feed-business-profile-card.is-comments-open .feed-comments { display:block; }
      .feed-list .reel-card > .feed-comments { position:absolute; left:0; right:0; bottom:0; max-height:58%; overflow:auto; margin:0; border-radius:0 0 8px 8px; padding:10px 12px 12px; }
      .feed-list .reel-card .social-feed-actions-counted { position:absolute; left:8px; right:8px; bottom:23px; z-index:6; margin:0; padding:4px 0 0; border-top:1px solid rgba(255,255,255,.22); background:transparent; }
      .feed-list .reel-card .social-feed-body-counted { position:absolute; left:8px; right:8px; bottom:5px; z-index:6; padding:0; background:transparent; }
      .feed-list .reel-card .caption { bottom:50px; min-height:112px; padding-bottom:10px; }
      .feed-list .feed-clip-card .caption,
      .feed-list .feed-product-clip-card .caption { bottom:50px; }
      .feed-list .reel-card .social-feed-actions-counted .social-feed-icon { border-color:rgba(255,255,255,.24); background:rgba(255,255,255,.10); color:#fff; }
      .feed-list .reel-card .social-feed-action-pair strong,
      .feed-list .reel-card .social-feed-body-counted .social-feed-time { color:rgba(255,255,255,.84); }
      .feed-list .reel-card .social-feed-body-counted .social-feed-comments-link { background:rgba(255,244,232,.92); }
      .feed-list .reel-card.is-comments-open .social-feed-actions-counted,
      .feed-list .reel-card.is-comments-open .social-feed-body-counted { display:none; }
      .feed-comment { display:grid; grid-template-columns:30px minmax(0,1fr); align-items:start; gap:8px; margin-top:8px; }
      .feed-comment-avatar { width:30px; height:30px; border-radius:999px; background:#eef3f8; color:var(--emy-navy); display:grid; place-items:center; font-size:11px; font-weight:800; text-decoration:none; cursor:pointer; }
      .feed-comment-avatar.has-image { overflow:hidden; background:#fff; color:transparent; }
      .feed-comment-avatar img { width:100%; height:100%; border-radius:inherit; object-fit:cover; display:block; }
      .feed-comment-bubble { display:block; min-width:0; max-width:100%; overflow:visible; border-radius:12px; background:#f6f8fb; color:#667085; padding:8px 10px; font-size:12px; line-height:1.35; font-weight:520; }
      .feed-comment-bubble strong { display:block; margin-bottom:2px; color:var(--emy-navy); font-size:11.5px; line-height:1.1; font-weight:800; }
      .feed-comment-actions { display:flex; flex-wrap:wrap; gap:4px; align-items:center; margin-top:7px; color:#7a869e; font-size:11px; line-height:1; font-weight:720; }
      .feed-comment-actions button { width:auto; min-width:18px; height:22px; min-height:22px; display:inline-flex; align-items:center; justify-content:center; border:0; border-radius:6px; background:transparent; color:inherit; cursor:pointer; padding:0 2px; font:inherit; font-size:0; font-weight:760; box-shadow:none; }
      .feed-comment-actions button svg { width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
      .feed-comment-actions button:hover, .feed-comment-actions button.is-active { background:transparent; color:var(--emy-orange); }
      .feed-comment-actions [data-feed-comment-delete] { color:#d92d20; }
      .feed-comment-action-count { color:#7a869e; font-size:11px; font-weight:830; min-width:14px; text-align:center; }
      .feed-comment-edit-field { width:100%; min-height:34px; border:1px solid rgba(0,27,71,.12); border-radius:10px; background:#fff; color:var(--emy-navy); padding:7px 9px; font:inherit; font-size:12px; outline:none; }
      .feed-comment-replies { display:grid; gap:7px; margin-top:8px; }
      .feed-comment-reply { display:grid; grid-template-columns:24px minmax(0,1fr); gap:7px; align-items:start; }
      .feed-comment-reply .feed-comment-avatar { width:24px; height:24px; font-size:9px; }
      .feed-comment-reply-bubble { display:block; border-radius:12px; background:rgba(255,255,255,.76); color:#4b5568; padding:7px 9px; font-size:11.5px; line-height:1.35; }
      .feed-comment-reply-bubble strong { display:block; margin-bottom:2px; color:var(--emy-navy); font-size:11.2px; line-height:1.15; font-weight:820; }
      .feed-comment-reply .feed-comment-actions { margin-top:6px; }
      .feed-comment-reply-form { width:100%; max-width:100%; box-sizing:border-box; position:relative; z-index:1; display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:center; gap:8px; margin-top:8px; background:#fff; }
      .feed-comment-reply-form[hidden] { display:none; }
      .feed-comment-reply-form input { min-width:0; height:36px; border:1px solid rgba(0,27,71,.10); border-radius:999px; background:#fff; color:var(--emy-navy); outline:none; padding:0 42px 0 12px; font-size:12px; font-weight:560; }
      .feed-comment-reply-form button { width:auto; min-width:54px; height:30px; min-height:30px; border:0; border-radius:999px; background:var(--emy-orange); color:#fff; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:4px; padding:0 9px; font-size:11px; font-weight:780; white-space:nowrap; box-shadow:0 6px 12px rgba(255,106,0,.14); }
      .feed-comment-reply-form button::after { content:"Reply"; }
      .feed-comments [data-feed-comments-list] { position:relative; z-index:1; background:#fff; }
      .feed-comment-form { width:100%; max-width:100%; box-sizing:border-box; position:relative; z-index:1; display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:center; gap:8px; margin-top:10px; background:#fff; }
      .feed-comment-form input { min-width:0; height:36px; border:1px solid rgba(0,27,71,.08); border-radius:999px; background:#fff; color:var(--emy-navy); outline:none; padding:0 42px 0 12px; font-size:12px; font-weight:560; }
      .feed-comment-form input:focus { border-color:rgba(255,106,0,.32); box-shadow:0 0 0 3px rgba(255,106,0,.08); }
      .feed-comment-form button { min-width:58px; min-height:36px; border:0; border-radius:999px; background:var(--emy-orange); color:#fff; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:0 13px; font-size:12px; font-weight:800; white-space:nowrap; }
      .feed-comment-form button svg { display:block; width:16px; height:16px; fill:none; stroke:currentColor; stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round; opacity:1; }
      .feed-comment-reply-form button svg { display:block; width:13px; height:13px; fill:none; stroke:currentColor; stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round; opacity:1; }
      .feed-comment-text-link { color:#d85a00; font-weight:760; text-decoration:underline; text-decoration-thickness:1.5px; text-underline-offset:2px; overflow-wrap:anywhere; }

      .feed-card { border-radius:14px; background:#fff; box-shadow:0 14px 34px rgba(0,27,71,.08); }
      .feed-card.is-product { border-color:rgba(6,118,71,.16); }
      .feed-card.is-post { border-color:rgba(23,92,211,.14); }
      .feed-card.is-clip { border-color:rgba(0,27,71,.16); }
      .feed-card.is-offer { border-color:rgba(255,106,0,.22); }
      .feed-card.is-product .feed-tag { background:#eef8f3; color:#067647; }
      .feed-card.is-post .feed-tag { background:#eef4ff; color:#175cd3; }
      .feed-card.is-clip .feed-tag { background:#101828; color:#fff; }
      .feed-card.is-offer .feed-tag { background:#fff4e8; color:#c14f00; }
      .feed-card.is-clip .feed-media { aspect-ratio:9 / 12; background-color:#101828; }
      .feed-card.is-clip .feed-media::after { background:linear-gradient(180deg, rgba(0,27,71,.04), rgba(0,27,71,.34)); }
      .feed-body { display:grid; gap:8px; padding:12px; }
      .feed-body h2 { font-size:14px; line-height:1.2; font-weight:820; }
      .feed-body p { display:-webkit-box; overflow:hidden; margin:0; -webkit-box-orient:vertical; -webkit-line-clamp:3; }
      .feed-card.is-product .feed-body p { -webkit-line-clamp:2; }
      .feed-price { margin-top:0; min-height:30px; border-radius:9px; }
      .feed-actions { display:grid; grid-template-columns:minmax(0,1fr); align-items:stretch; gap:7px; margin-top:2px; padding:8px; border:1px solid rgba(0,27,71,.07); border-radius:12px; background:linear-gradient(180deg,#fbfcff,#fff); box-shadow:inset 0 1px 0 rgba(255,255,255,.92); }
      .feed-stat { display:inline-flex; width:fit-content; max-width:100%; min-height:22px; align-items:center; border-radius:999px; background:#eef3f8; color:#59667f; padding:0 9px; font-size:10.5px; line-height:1; font-weight:820; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .feed-action-row { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:5px; min-width:0; }
      .feed-action { width:100%; min-width:0; min-height:29px; border:0; border-radius:9px; background:rgba(255,255,255,.82); color:#56637b; cursor:pointer; padding:0 5px; font-size:10.2px; line-height:1; font-weight:820; text-align:center; white-space:nowrap; box-shadow:0 1px 0 rgba(0,27,71,.05), inset 0 0 0 1px rgba(0,27,71,.06); }
      .feed-action:hover, .feed-action.is-active { background:#fff4e8; color:var(--emy-orange); box-shadow:inset 0 0 0 1px rgba(255,106,0,.22); }
      @media (min-width:1240px) { .feed-card.is-clip .feed-media { aspect-ratio:9 / 11; } }
      .feed-card.is-clip { position: relative; grid-template-rows: auto auto; overflow: hidden; border-color: rgba(0,27,71,.12); border-radius: 18px; background: linear-gradient(180deg,#fff,#fff9f3); box-shadow: 0 18px 42px rgba(0,27,71,.11), 0 12px 24px rgba(255,106,0,.07); }
      .feed-card.is-clip:hover { border-color: rgba(255,106,0,.28); box-shadow: 0 24px 52px rgba(0,27,71,.16), 0 14px 30px rgba(255,106,0,.12); }
      .feed-card.is-clip .feed-card-head { position: absolute; left: 10px; right: 10px; top: 10px; z-index: 5; grid-template-columns: minmax(0,1fr) auto; gap: 8px; align-items: center; padding: 7px 8px; border: 1px solid rgba(255,255,255,.56); border-radius: 999px; background: rgba(255,255,255,.84); backdrop-filter: blur(14px); box-shadow: 0 10px 24px rgba(0,27,71,.16); }
      .feed-card.is-clip .feed-profile-link { grid-template-columns: 30px minmax(0,1fr); gap: 7px; }
      .feed-card.is-clip .feed-avatar { width: 30px; height: 30px; box-shadow: inset 0 0 0 2px rgba(255,255,255,.88), 0 8px 18px rgba(0,27,71,.18); }
      .feed-card.is-clip .feed-card-head strong { font-size: 12px; line-height: 1.1; font-weight: 820; }
      .feed-card.is-clip .feed-card-head small { margin-top: 2px; color: #66738d; font-size: 9.8px; font-weight: 700; }
      .feed-card.is-clip .feed-tag { min-height: 24px; background: linear-gradient(135deg,var(--emy-navy),#16325f); color: #fff; padding: 0 10px; box-shadow: 0 8px 18px rgba(0,27,71,.20); }
      .feed-card.is-clip .feed-tag::before { content: ""; width: 6px; height: 6px; margin-right: 6px; border-radius: 999px; background: var(--emy-orange); box-shadow: 0 0 0 3px rgba(255,106,0,.18); }
      .feed-card.is-clip .feed-media-link { position: relative; display: block; background: #101828; }
      .feed-card.is-clip .feed-media { aspect-ratio: 9 / 14; background-color: #101828; box-shadow: inset 0 0 0 1px rgba(255,255,255,.10); }
      .feed-card.is-clip .feed-media::before { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(0,27,71,.40), rgba(0,27,71,.05) 38%, rgba(0,27,71,.78)); pointer-events: none; }
      .feed-card.is-clip .feed-media::after { content: ""; position: absolute; left: 12px; right: 12px; bottom: 146px; z-index: 2; height: 3px; border-radius: 999px; background: rgba(255,255,255,.28); box-shadow: 0 0 0 1px rgba(255,255,255,.14); }
      .feed-card.is-clip .clip-progress { left: 12px; right: 12px; bottom: 146px; z-index: 3; height: 3px; background: transparent; box-shadow: none; }
      .feed-card.is-clip .feed-play { z-index: 4; width: 54px; height: 54px; background: rgba(255,255,255,.94); color: var(--emy-navy); box-shadow: 0 16px 34px rgba(0,27,71,.28), inset 0 1px 0 rgba(255,255,255,.90); }
      .feed-card.is-clip:hover .feed-play, .feed-card.is-clip:focus-within .feed-play, .feed-card.is-clip.is-previewing .feed-play { opacity: .88; transform: translate(-50%,-50%) scale(.94); }
      .feed-card.is-clip .video-duration-badge { z-index: 5; right: 12px; bottom: 158px; background: rgba(0,27,71,.74); border: 1px solid rgba(255,255,255,.22); color: #fff; backdrop-filter: blur(10px); }
      .feed-card.is-clip .feed-body { position: relative; z-index: 3; display: grid; align-content: end; gap: 8px; min-height: 160px; margin-top: -160px; padding: 0 12px 12px; color: #fff; }
      .feed-card.is-clip .feed-body h2 { color: #fff; font-size: 16px; line-height: 1.14; font-weight: 860; text-shadow: 0 2px 10px rgba(0,27,71,.38); }
      .feed-card.is-clip .feed-body p { display: -webkit-box; overflow: hidden; margin: 0; color: rgba(255,255,255,.88); font-size: 12.2px; line-height: 1.36; font-weight: 620; -webkit-box-orient: vertical; -webkit-line-clamp: 2; text-shadow: 0 2px 8px rgba(0,27,71,.28); }
      .feed-card.is-clip .feed-price { background: rgba(255,244,232,.96); color: #d85a00; border-radius: 999px; }
      .feed-card.is-clip .feed-actions { display: grid; grid-template-columns: minmax(0,1fr); gap: 8px; margin-top: 0; padding: 9px; border: 1px solid rgba(255,255,255,.48); border-radius: 18px; background: linear-gradient(145deg, rgba(255,255,255,.72), rgba(255,255,255,.34)); color: #42506a; backdrop-filter: blur(18px); box-shadow: 0 14px 30px rgba(0,27,71,.22), inset 0 1px 0 rgba(255,255,255,.74); }
      .feed-card.is-clip .feed-stat { width: 100%; max-width: none; min-height: 25px; border: 1px solid rgba(255,255,255,.42); border-radius: 12px; background: rgba(255,255,255,.58); color: #33415c; padding: 0 9px; font-size: 11.3px; line-height: 1.1; font-weight: 840; backdrop-filter: blur(10px); text-shadow: none; }
      .feed-card.is-clip .feed-action-row { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 6px; min-width: 0; }
      .feed-card.is-clip .feed-action { width: 100%; min-height: 34px; border: 1px solid rgba(255,255,255,.44); border-radius: 13px; background: rgba(255,255,255,.50); color: #42506a; padding: 0 7px; font-size: 11.4px; font-weight: 840; box-shadow: inset 0 1px 0 rgba(255,255,255,.72), 0 6px 12px rgba(0,27,71,.10); }
      .feed-card.is-clip .feed-action:hover, .feed-card.is-clip .feed-action.is-active { background: rgba(255,244,232,.94); color: var(--emy-orange); box-shadow: inset 0 0 0 1px rgba(255,106,0,.18), 0 8px 14px rgba(255,106,0,.12); }
      @media (min-width: 1240px) { .feed-card.is-clip .feed-media { aspect-ratio: 9 / 13; } .feed-card.is-clip .feed-body { min-height: 158px; margin-top: -158px; } .feed-card.is-clip .feed-media::after, .feed-card.is-clip .clip-progress { bottom: 166px; } .feed-card.is-clip .video-duration-badge { bottom: 178px; } }
      .feed-card .feed-actions { display:flex; flex-wrap:nowrap; align-items:center; justify-content:space-between; gap:8px; margin-top:4px; padding:8px 0 0; border:0; border-top:1px solid rgba(0,27,71,.08); border-radius:0; background:transparent; box-shadow:none; }
      .feed-card .feed-stat { flex:0 1 auto; max-width:46%; min-height:auto; border:0; border-radius:0; background:transparent; color:#667085; padding:0; font-size:10.6px; line-height:1.2; font-weight:820; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .feed-card .feed-action-row { flex:0 0 auto; display:flex; align-items:center; justify-content:flex-end; gap:2px; min-width:0; }
      .feed-card .feed-action { width:auto; min-width:0; min-height:24px; border:0; border-radius:999px; background:transparent; box-shadow:none; color:#59667f; cursor:pointer; padding:0 5px; font-size:10.3px; line-height:1; font-weight:820; text-align:center; white-space:nowrap; }
      .feed-card .feed-action:hover, .feed-card .feed-action.is-active { background:#fff4e8; color:var(--emy-orange); box-shadow:none; }
      .feed-card.is-clip { background:#101828; }
      .feed-card.is-clip .feed-actions { display:grid; grid-template-columns:minmax(0,1fr); flex-wrap:nowrap; gap:8px; margin-top:2px; padding:9px; border:1px solid rgba(255,255,255,.48); border-radius:18px; background:linear-gradient(145deg, rgba(255,255,255,.72), rgba(255,255,255,.34)); color:#42506a; backdrop-filter:blur(18px); box-shadow:0 14px 30px rgba(0,27,71,.22), inset 0 1px 0 rgba(255,255,255,.74); }
      .feed-card.is-clip .feed-stat { width:100%; max-width:none; min-height:25px; border:1px solid rgba(255,255,255,.42); border-radius:12px; background:rgba(255,255,255,.58); color:#33415c; padding:0 9px; font-size:11.3px; line-height:1.1; font-weight:840; text-shadow:none; }
      .feed-card.is-clip .feed-action { width:100%; min-height:34px; border:1px solid rgba(255,255,255,.44); border-radius:13px; background:rgba(255,255,255,.50); color:#42506a; padding:0 7px; font-size:11.4px; font-weight:840; box-shadow:inset 0 1px 0 rgba(255,255,255,.72), 0 6px 12px rgba(0,27,71,.10); }
      .feed-card.is-clip .feed-action:hover, .feed-card.is-clip .feed-action.is-active { background:rgba(255,244,232,.94); color:var(--emy-orange); box-shadow:inset 0 0 0 1px rgba(255,106,0,.18), 0 8px 14px rgba(255,106,0,.12); }
      .feed-list .social-feed-card { position:relative; width:100%; overflow:hidden; border:1px solid rgba(0,27,71,.08); border-radius:10px; background:#fff; color:var(--emy-navy); box-shadow:0 10px 28px rgba(0,27,71,.07); }
      .feed-list .social-feed-card[hidden],
      .feed-list .feed-card[hidden] { display:none !important; }
      .social-feed-head { display:grid; grid-template-columns:44px minmax(0,1fr) 32px; gap:12px; align-items:center; min-height:64px; padding:12px 14px; background:rgba(255,255,255,.88); }
      .social-feed-avatar { width:42px; height:42px; border-radius:999px; display:grid; place-items:center; overflow:hidden; background:linear-gradient(145deg,#f8fafc,#eef2f7); color:#d85a00; font-size:14px; font-weight:850; box-shadow:inset 0 0 0 2px rgba(255,255,255,.92), 0 8px 18px rgba(0,27,71,.10); text-decoration:none; cursor:pointer; }
      .social-feed-avatar img { width:100%; height:100%; object-fit:cover; display:block; }
      .social-feed-avatar > span { width:100%; height:100%; display:grid; place-items:center; }
      .social-feed-avatar.pizza, .social-feed-media.pizza { background:radial-gradient(circle at 32% 42%, #ffd8a8 0 44px, transparent 45px), radial-gradient(circle at 67% 34%, #ed4f37 0 22px, transparent 23px), linear-gradient(135deg,#f9b15d,#7c301b); }
      .social-feed-avatar.shop, .social-feed-media.shop { background:linear-gradient(135deg,#e8edf1,#fff), radial-gradient(circle at 66% 30%, #d6a083, transparent 76px), linear-gradient(90deg,#39424f,transparent); }
      .social-feed-avatar.bottle, .social-feed-media.bottle { background:linear-gradient(90deg,#e6edf2,#bfc8d0), radial-gradient(circle at 52% 42%, #44546b 0 48px, transparent 49px); }
      .social-feed-avatar.feed, .social-feed-media.feed { background:linear-gradient(135deg,#d6dde8,#f7ede2), radial-gradient(circle at 42% 56%, #6e5648, transparent 60px); }
      .social-feed-avatar.tech, .social-feed-media.tech { background:linear-gradient(135deg,#dbe2ea,#f8fafc), linear-gradient(100deg, transparent 0 40%, rgba(0,27,71,.25) 41% 45%, transparent 45%); }
      .social-feed-name { min-width:0; display:block; overflow:hidden; text-decoration:none; }
      .social-feed-name strong { display:block; max-width:100%; overflow:hidden; color:var(--emy-navy); font-size:14px; line-height:1.15; font-weight:850; text-overflow:ellipsis; white-space:nowrap; }
      .social-feed-name small { display:block; max-width:100%; margin-top:4px; overflow:hidden; color:#667085; font-size:11px; line-height:1.15; font-weight:700; text-overflow:ellipsis; white-space:nowrap; }
      .social-feed-more { width:32px; height:32px; border:0; border-radius:999px; background:transparent; color:#667085; cursor:pointer; display:grid; place-items:center; font-size:19px; line-height:1; font-weight:800; }
      .feed-options-menu { position:fixed; right:auto; left:0; top:0; z-index:140; width:min(220px, calc(100vw - 24px)); max-height:calc(100dvh - 24px); overflow:auto; border:1px solid rgba(255,255,255,.72); border-radius:16px; background:linear-gradient(145deg, rgba(255,255,255,.82), rgba(255,250,244,.62)); backdrop-filter:blur(22px) saturate(1.16); box-shadow:0 18px 36px rgba(0,27,71,.14), inset 0 1px 0 rgba(255,255,255,.88), inset 0 -12px 24px rgba(0,27,71,.04); padding:7px; }
      .feed-options-menu[hidden] { display:none; }
      .feed-options-menu button { width:100%; min-height:36px; border:0; border-radius:11px; background:transparent; color:#26364f; cursor:pointer; padding:0 11px; text-align:left; font:inherit; font-size:12.5px; font-weight:680; }
      .feed-options-menu button:last-child { border-bottom:0; }
      .feed-options-menu button:hover { background:rgba(255,255,255,.82); color:var(--emy-orange); box-shadow:inset 0 0 0 1px rgba(255,106,0,.10); }
      .feed-options-menu button.is-danger { color:#ef3f4a; font-weight:760; }
      .social-feed-media { position:relative; display:block; width:100%; aspect-ratio:4 / 5; overflow:hidden; background-size:cover; background-position:center; }
      .social-feed-media::after { content:""; position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,27,71,.02), rgba(0,27,71,.08)); pointer-events:none; }
      .social-feed-media video, .social-feed-media img { position:absolute; inset:0; width:100%; height:100%; object-fit:var(--media-fit, contain); transform:translate(var(--media-x, 0%), var(--media-y, 0%)) scale(var(--media-zoom, 1)); transform-origin:center; display:block; background:#101828; }
      .social-feed-media .feed-media-carousel-slide img,
      .social-feed-media .feed-media-carousel-slide video,
      .feed-media .feed-media-carousel-slide img,
      .feed-media .feed-media-carousel-slide video { transform:none !important; transition:none !important; }
      .social-feed-card.is-post.has-video-media .social-feed-media,
      .social-feed-card.is-post.has-image-media .social-feed-media { aspect-ratio:1 / 1; background:#101828; }
      .social-feed-card.is-post.has-video-media .social-feed-media video { object-fit:var(--media-fit, contain); background:#101828; }
      .social-feed-card.is-post.has-image-media .social-feed-media img { object-fit:var(--media-fit, contain); }
      .social-feed-text-panel { margin:0 12px 4px; border:1px solid rgba(0,27,71,.08); border-radius:10px; background:linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,250,246,.94)); padding:18px 16px; box-shadow:inset 0 1px 0 rgba(255,255,255,.82); }
      .social-feed-text-panel p { margin:0; color:var(--emy-navy); font-size:18px; line-height:1.34; font-weight:720; overflow-wrap:anywhere; }
      .social-feed-card.is-text-only .social-feed-body { padding-top:6px; }
      .social-feed-card.is-text-only { border-radius:16px; background:linear-gradient(145deg, rgba(255,255,255,.98), rgba(255,250,244,.95)); box-shadow:0 18px 46px rgba(0,27,71,.10); }
      .social-feed-card.is-text-only .social-feed-head { grid-template-columns:48px minmax(0,1fr) 34px; padding:14px 16px 8px; }
      .social-feed-card.is-text-only .social-feed-avatar { width:46px; height:46px; }
      .social-feed-card.is-text-only .social-feed-text-panel { margin:0 18px 4px; border:0; border-radius:0; background:transparent; padding:10px 0 14px; box-shadow:none; }
      .social-feed-card.is-text-only .social-feed-text-panel p { font-size:20px; line-height:1.32; font-weight:820; }
      .social-feed-card.is-text-only .social-feed-actions { margin:0 16px; border-top:1px solid rgba(0,27,71,.08); border-bottom:1px solid rgba(0,27,71,.08); padding:8px 0; }
      .social-feed-card.is-text-only .social-feed-icon { width:52px; height:48px; border-radius:16px; }
      .social-feed-card.is-text-only .social-feed-body { display:grid; grid-template-columns:1fr auto; gap:6px; align-items:center; padding:8px 18px 16px; }
      .social-feed-card.is-text-only .social-feed-comments-link { justify-self:end; margin:0; color:var(--emy-orange); }
      .social-feed-card.is-text-only .social-feed-time { grid-column:1 / -1; }
      .social-feed-card.is-clip .social-feed-media { aspect-ratio:9 / 16; background-color:#101828; }
      .social-feed-play { position:absolute; left:50%; top:50%; z-index:2; width:58px; height:58px; transform:translate(-50%,-50%); border-radius:999px; background:rgba(255,255,255,.92); color:var(--emy-navy); display:grid; place-items:center; box-shadow:0 16px 32px rgba(0,27,71,.22); }
      .social-feed-play svg { width:28px; height:28px; margin-left:2px; fill:currentColor; }
      .social-feed-product-price { position:absolute; left:12px; bottom:12px; z-index:3; display:inline-flex; min-height:32px; align-items:center; border-radius:999px; background:rgba(255,244,232,.94); color:#d85a00; padding:0 12px; font-size:13px; line-height:1; font-weight:850; box-shadow:0 10px 20px rgba(0,27,71,.14); }
      .social-feed-actions { display:flex; align-items:center; justify-content:space-between; gap:14px; margin:4px 12px 0; border-top:1px solid rgba(0,27,71,.07); border-bottom:1px solid rgba(0,27,71,.07); padding:10px 0; }
      .social-feed-action-set { display:flex; align-items:center; gap:10px; }
      .social-feed-icon { width:52px; min-width:52px; height:48px; min-height:48px; border:1px solid rgba(255,255,255,.62); border-radius:16px; background:linear-gradient(145deg, rgba(255,255,255,.74), rgba(255,255,255,.30)); color:var(--emy-navy); cursor:pointer; display:grid; place-items:center; padding:0; box-shadow:0 14px 28px rgba(0,27,71,.13), inset 0 1px 0 rgba(255,255,255,.82), inset 0 -10px 20px rgba(0,27,71,.05); backdrop-filter:blur(16px) saturate(1.08); }
      .social-feed-icon:hover, .social-feed-icon.is-active { border-color:rgba(255,106,0,.34); color:var(--emy-orange); background:linear-gradient(145deg, rgba(255,255,255,.88), rgba(255,244,232,.58)); box-shadow:0 16px 30px rgba(255,106,0,.16), inset 0 1px 0 rgba(255,255,255,.88); transform:translateY(-1px); }
      .social-feed-icon svg { width:26px; height:26px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
      .social-feed-icon[data-feed-repost], .reel-inline-action[data-feed-repost] { display:inline-flex; align-items:center; justify-content:center; gap:4px; }
      [data-feed-repost-count] { min-width:10px; color:#667085; font-size:11px; line-height:1; font-weight:650; letter-spacing:0; }
      .social-feed-save { margin-left:auto; }
      .social-feed-body { padding:2px 12px 12px; }
      .social-feed-stat { display:block; margin-top:2px; color:var(--emy-navy); font-size:12px; line-height:1.25; font-weight:850; }
      .social-feed-caption { margin:5px 0 0; color:#2f3b52; font-size:12px; line-height:1.35; font-weight:520; }
      .social-feed-caption strong { margin-right:4px; color:var(--emy-navy); font-weight:850; }
      .social-feed-comments-link { width:auto; min-height:0; margin-top:5px; border:0; border-radius:0; background:transparent; color:#7a869e; cursor:pointer; padding:0; text-align:left; font-size:11.5px; line-height:1.3; font-weight:650; box-shadow:none; }
      .social-feed-card.is-text-only .social-feed-comments-link { justify-self:end; margin:0; color:var(--emy-orange); }
      .social-feed-card.is-text-only { border-radius:14px; background:rgba(255,255,255,.96); box-shadow:0 10px 28px rgba(0,27,71,.065); }
      .social-feed-card.is-text-only .social-feed-head { grid-template-columns:42px minmax(0,1fr) 32px; padding:12px 14px 4px; }
      .social-feed-card.is-text-only .social-feed-avatar { width:40px; height:40px; }
      .social-feed-card.is-text-only .social-feed-text-panel { margin:0 14px 2px; padding:8px 0 12px; }
      .social-feed-card.is-text-only .social-feed-text-panel p { color:#344054; font-size:14.5px; line-height:1.55; font-weight:500; letter-spacing:0; }
      .social-feed-card.is-text-only .social-feed-actions { margin:0 14px; padding:7px 0; }
      .social-feed-card.is-text-only .social-feed-icon { width:42px; min-width:42px; height:38px; min-height:38px; border-radius:12px; color:#26364f; box-shadow:0 8px 18px rgba(0,27,71,.08), inset 0 1px 0 rgba(255,255,255,.82); }
      .social-feed-card.is-text-only .social-feed-icon svg { width:22px; height:22px; }
      .social-feed-card.is-text-only .social-feed-body { padding:6px 14px 14px; }
      .social-feed-card.is-text-only .social-feed-time { color:#98a2b3; font-size:10.5px; font-weight:600; text-transform:none; letter-spacing:0; }
      .social-feed-time { display:block; margin-top:5px; color:#9aa3b5; font-size:9.5px; line-height:1; font-weight:750; text-transform:uppercase; }
      .social-feed-card .feed-comments { position:relative; z-index:9; isolation:isolate; display:none; margin:0; border-top:1px solid rgba(0,27,71,.07); background:#fff; padding:9px 12px 12px; box-sizing:border-box; overflow:hidden; }
      .social-feed-card.is-comments-open .feed-comments { display:block; }
      .feed-list .social-feed-body-counted > [data-feed-comment-total] { display:none !important; }
      .social-feed-card .feed-comment-form { grid-template-columns:minmax(0,1fr) auto; margin-top:10px; }
      .social-feed-card .feed-comment-form input { border-radius:999px; border:1px solid rgba(0,27,71,.10); padding:0 42px 0 12px; box-shadow:inset 0 1px 0 rgba(255,255,255,.86); }
      .social-feed-card .feed-comment-form button { min-width:58px; min-height:36px; border-radius:999px; padding:0 13px; }
      .feed-list .social-feed-event-card,
      .social-feed-event-card { border-radius:8px; box-shadow:0 6px 18px rgba(0,27,71,.045); }
      .social-feed-event-card .social-feed-head { border-bottom:1px solid rgba(0,27,71,.06); background:linear-gradient(180deg,#fff,rgba(255,250,246,.92)); }
      .social-feed-event-card .feed-event-post { margin:0 10px 4px; border-color:rgba(0,27,71,.075); border-radius:10px; background:#fff; box-shadow:none; }
      .social-feed-event-card .feed-event-post-hero { min-height:92px; gap:6px; padding:12px 14px; background:linear-gradient(135deg,#fffaf5,#eef3f8); }
      .social-feed-event-card .feed-event-post.has-cover .feed-event-post-hero { position:relative; isolation:isolate; overflow:hidden; min-height:176px; background-color:#001b47; background-size:cover; background-position:center; }
      .social-feed-event-card .feed-event-card-cover-image, .social-feed-event-card .feed-event-post-hero img[data-emy-event-card-cover] { position:absolute; inset:0; z-index:0; width:100%; height:100%; object-fit:cover; display:block; }
      .social-feed-event-card .feed-event-post.has-cover .feed-event-post-hero::after { content:""; position:absolute; inset:0; z-index:1; background:linear-gradient(180deg,rgba(0,27,71,.04) 0%,rgba(0,27,71,.16) 46%,rgba(0,27,71,.66) 100%); pointer-events:none; }
      .social-feed-event-card .feed-event-post.has-cover .feed-event-post-hero span, .social-feed-event-card .feed-event-post.has-cover .feed-event-post-hero strong { position:relative; z-index:2; color:#fff; text-shadow:0 1px 14px rgba(0,27,71,.48); }
      .social-feed-event-card .feed-event-post.has-cover .feed-event-post-hero span { background:rgba(255,255,255,.22); color:#fff; box-shadow:inset 0 0 0 1px rgba(255,255,255,.36); }
      .social-feed-event-card .feed-event-post-hero span { min-height:21px; padding:0 9px; font-size:10px; font-weight:820; box-shadow:inset 0 0 0 1px rgba(255,106,0,.18); }
      .social-feed-event-card .feed-event-post-hero strong { font-size:19px; line-height:1.12; font-weight:850; }
      .social-feed-event-card .feed-event-post-details { gap:7px; padding:10px 12px 12px; }
      .social-feed-event-card .feed-event-post-details p { display:-webkit-box; font-size:12.5px; line-height:1.35; font-weight:600; white-space:normal; overflow:hidden; overflow-wrap:anywhere; -webkit-box-orient:vertical; -webkit-line-clamp:3; }
      .social-feed-event-card .feed-event-post-meta { gap:7px; }
      .social-feed-event-card .feed-event-post-meta span { border-radius:8px; background:#fff; padding:7px 9px; font-size:10.8px; line-height:1.22; font-weight:760; }
      .social-feed-event-card .feed-event-post-meta span b { margin-bottom:3px; font-size:9px; }
      .social-feed-event-card .social-feed-actions { margin:2px 10px 0; padding:6px 0 5px; border-top:1px solid rgba(0,27,71,.07); border-bottom:0; gap:8px; }
      .social-feed-event-card .social-feed-action-set { gap:4px; }
      .social-feed-event-card .social-feed-icon { width:36px; min-width:36px; height:34px; min-height:34px; border:1px solid rgba(0,27,71,.08); border-radius:10px; background:transparent; color:#26364f; box-shadow:none; backdrop-filter:none; }
      .social-feed-event-card .social-feed-icon:hover,
      .social-feed-event-card .social-feed-icon.is-active { background:#fff4e8; color:var(--emy-orange); box-shadow:none; transform:none; }
      .social-feed-event-card .social-feed-icon svg { width:19px; height:19px; }
      .social-feed-event-card .social-feed-body { display:grid; grid-template-columns:auto minmax(0,1fr) auto; align-items:center; gap:8px; padding:4px 10px 10px; }
      .social-feed-event-card .social-feed-stat { margin:0; font-size:11.5px; line-height:1.2; font-weight:780; }
      .social-feed-event-card .social-feed-comments-link { margin:0; font-size:11.5px; font-weight:700; }
      .social-feed-event-card .social-feed-time { color:#98a2b3; font-size:10.5px; font-weight:650; text-transform:none; letter-spacing:0; }
      .social-feed-article-card .feed-article-card-body { margin:0 10px 4px; border:1px solid rgba(0,27,71,.075); border-radius:10px; background:linear-gradient(180deg,#fff,#fffaf5); padding:14px; box-shadow:none; }
      .feed-article-card-body > span { width:fit-content; min-height:21px; display:inline-flex; align-items:center; border-radius:999px; background:#fff4e8; color:var(--emy-orange); padding:0 9px; font-size:10px; line-height:1; font-weight:860; box-shadow:inset 0 0 0 1px rgba(255,106,0,.18); }
      .feed-article-card-body h2 { margin:10px 0 7px; color:var(--emy-navy); font-size:21px; line-height:1.14; font-weight:880; overflow-wrap:anywhere; }
      .feed-article-card-body p { margin:0; color:#46556f; font-size:13px; line-height:1.5; font-weight:600; white-space:pre-wrap; overflow:hidden; overflow-wrap:anywhere; display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; }
      .feed-article-card-cover { position:relative; height:170px; overflow:hidden; border-radius:9px; background:#eef3f8; margin-bottom:12px; }
      .feed-article-card-cover img, .feed-article-card-cover video { width:100%; height:100%; display:block; object-fit:cover; }
      .feed-article-card-meta { display:flex; flex-wrap:wrap; gap:7px; margin-top:12px; }
      .feed-article-card-meta small { min-height:24px; display:inline-flex; align-items:center; border-radius:999px; background:#f2f4f7; color:#667085; padding:0 9px; font-size:10.5px; line-height:1; font-weight:780; }
      .feed-list .feed-card,
      .feed-list .social-feed-card,
      .feed-list .post-card,
      .feed-list .product-card,
      .feed-list .reel-card { border-radius:8px; box-shadow:0 6px 18px rgba(0,27,71,.045); font-family:inherit; }
      .feed-list .feed-card:hover,
      .feed-list .social-feed-card:hover,
      .feed-list .post-card:hover,
      .feed-list .product-card:hover,
      .feed-list .reel-card:hover { transform:none; box-shadow:0 8px 22px rgba(0,27,71,.07); }
      .feed-list .feed-card:has(.feed-media-carousel),
      .feed-list .feed-card:has([data-feed-media-carousel]),
      .feed-list .social-feed-card:has(.feed-media-carousel),
      .feed-list .social-feed-card:has([data-feed-media-carousel]),
      .feed-list .feed-card:has(.feed-media-carousel):hover,
      .feed-list .feed-card:has([data-feed-media-carousel]):hover,
      .feed-list .social-feed-card:has(.feed-media-carousel):hover,
      .feed-list .social-feed-card:has([data-feed-media-carousel]):hover { transform:none !important; transition:border-color .16s ease, box-shadow .16s ease !important; }
      .feed-list .social-feed-media:has(.feed-media-carousel),
      .feed-list .social-feed-media:has([data-feed-media-carousel]) { transform:none !important; transition:none !important; }
      .feed-list .feed-card .feed-actions,
      .feed-list .feed-card.is-clip .feed-actions { display:flex; flex-wrap:nowrap; align-items:center; justify-content:space-between; gap:8px; margin-top:4px; padding:7px 0 0; border:0; border-top:1px solid rgba(0,27,71,.07); border-radius:0; background:transparent; box-shadow:none; backdrop-filter:none; }
      .feed-list .feed-card .feed-stat { flex:0 1 auto; max-width:46%; min-height:auto; border:0; border-radius:0; background:transparent; color:#667085; padding:0; font-size:10.6px; line-height:1.2; font-weight:780; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .feed-list .feed-card .feed-action-row { flex:0 0 auto; display:flex; align-items:center; justify-content:flex-end; gap:3px; min-width:0; }
      .feed-list .feed-card .feed-action { width:auto; min-width:0; min-height:24px; border:0; border-radius:999px; background:transparent; color:#59667f; padding:0 6px; font-size:10.4px; line-height:1; font-weight:760; box-shadow:none; font-family:inherit; }
      .feed-list .feed-card .feed-action:hover,
      .feed-list .feed-card .feed-action.is-active { background:#fff4e8; color:var(--emy-orange); box-shadow:none; transform:none; }
      .feed-list .feed-card.is-clip .feed-actions { border-top-color:rgba(255,255,255,.22); color:rgba(255,255,255,.86); }
      .feed-list .feed-card.is-clip .feed-stat,
      .feed-list .feed-card.is-clip .feed-action { color:rgba(255,255,255,.86); }
      .feed-list .feed-card.is-clip .feed-action:hover,
      .feed-list .feed-card.is-clip .feed-action.is-active { background:rgba(255,255,255,.14); color:#fff; }
      .feed-list .social-feed-card .social-feed-actions { margin:2px 8px 0; padding:5px 0 4px; border-top:1px solid rgba(0,27,71,.07); border-bottom:0; gap:6px; }
      .feed-list .social-feed-card .social-feed-action-set { gap:4px; }
      .feed-list .social-feed-card .social-feed-icon,
      .feed-list .social-feed-card.is-text-only .social-feed-icon { width:31px; min-width:31px; height:30px; min-height:30px; border:1px solid rgba(0,27,71,.08); border-radius:9px; background:transparent; color:#26364f; box-shadow:none; backdrop-filter:none; }
      .feed-list .social-feed-card .social-feed-icon:hover,
      .feed-list .social-feed-card .social-feed-icon.is-active { background:#fff4e8; color:var(--emy-orange); box-shadow:none; transform:none; }
      .feed-list .social-feed-card .social-feed-icon svg,
      .feed-list .social-feed-card.is-text-only .social-feed-icon svg { width:16px; height:16px; }
      .feed-list .social-feed-card .social-feed-body,
      .feed-list .social-feed-card.is-text-only .social-feed-body { display:grid; grid-template-columns:auto minmax(0,1fr) auto; align-items:center; gap:6px 8px; padding:4px 10px 10px; }
      .feed-list .social-feed-card .social-feed-stat { margin:0; font-size:11.5px; line-height:1.2; font-weight:780; }
      .feed-list .social-feed-card .social-feed-caption { grid-column:1 / -1; margin:0; color:#344054; font-size:12.2px; line-height:1.35; font-weight:520; }
      .feed-list .social-feed-repost-note { display:block; margin:0 10px 4px; color:#667085; font-size:11.2px; line-height:1.25; font-weight:760; }
      .feed-list .social-feed-quote { grid-column:1 / -1; display:grid; grid-template-columns:minmax(0,1fr); gap:8px; margin:2px 0 0; border:1px solid rgba(255,106,0,.24); border-radius:8px; background:linear-gradient(145deg,rgba(255,244,232,.94),rgba(255,250,245,.88)); padding:9px; color:inherit; text-decoration:none; box-shadow:inset 0 1px 0 rgba(255,255,255,.78); }
      .feed-list .social-feed-quote-head { display:flex; min-width:0; align-items:center; justify-content:space-between; gap:8px; color:#667085; font-size:10.8px; line-height:1.2; font-weight:760; }
      .feed-list .social-feed-quote-head strong { min-width:0; overflow:hidden; color:var(--emy-orange); font-size:12px; text-overflow:ellipsis; white-space:nowrap; }
      .feed-list .social-feed-quote-head span { flex:0 0 auto; max-width:42%; overflow:hidden; border:1px solid rgba(255,106,0,.10); border-radius:999px; background:rgba(255,255,255,.62); color:#c14f00; padding:3px 7px; font-size:10px; line-height:1; font-weight:850; text-overflow:ellipsis; white-space:nowrap; }
      .feed-list .social-feed-quote-body { display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:start; gap:9px; min-width:0; }
      .feed-list .social-feed-quote-copy { display:grid; gap:4px; min-width:0; }
      .feed-list .social-feed-quote-title { display:-webkit-box; overflow:hidden; color:var(--emy-navy); font-size:12.6px; line-height:1.22; font-weight:820; text-overflow:ellipsis; white-space:normal; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
      .feed-list .social-feed-quote-text { display:-webkit-box; overflow:hidden; margin:0; color:#667085; font-size:11.7px; line-height:1.35; font-weight:520; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
      .feed-list .social-feed-quote-media { width:84px; height:70px; overflow:hidden; border-radius:7px; background:linear-gradient(135deg,#fffaf5,#e8eef6); box-shadow:inset 0 0 0 1px rgba(0,27,71,.08); }
      .feed-list .social-feed-quote-media img,
      .feed-list .social-feed-quote-media video { display:block; width:100%; height:100%; object-fit:cover; }
      .social-feed-card.is-repost { min-width:0; }
      .social-feed-card.is-repost .social-feed-repost-note { display:block !important; grid-column:1 / -1; margin:7px 10px 2px; color:#667085; font-size:11px; line-height:1.25; font-weight:720; }
      .social-feed-card.is-repost .social-feed-body-counted { align-items:start; }
      .social-feed-card.is-repost .social-feed-caption { display:block; grid-column:1 / -1; min-width:0; margin:0 0 2px; color:#344054; font-size:12.2px; line-height:1.35; font-weight:520; }
      .social-feed-card.is-repost .social-feed-caption strong { margin-right:4px; }
      .social-feed-card.is-repost .social-feed-quote.feed-profile-link,
      .social-feed-card.is-repost .social-feed-quote { grid-column:1 / -1 !important; display:grid !important; grid-template-columns:minmax(0,1fr) !important; align-items:stretch !important; gap:8px !important; min-width:0 !important; width:100%; margin:2px 0 0 !important; border:1px solid rgba(255,106,0,.24); border-radius:10px; background:linear-gradient(145deg,rgba(255,244,232,.94),rgba(255,250,245,.88)); padding:10px; color:inherit; cursor:pointer; text-decoration:none; box-sizing:border-box; box-shadow:inset 0 1px 0 rgba(255,255,255,.78); }
      .social-feed-card.is-repost .social-feed-quote-head { display:flex !important; min-width:0; align-items:center; justify-content:space-between; gap:8px; color:#667085; font-size:10.8px; line-height:1.2; font-weight:760; }
      .social-feed-card.is-repost .social-feed-quote-head strong { display:block; min-width:0; overflow:hidden; color:var(--emy-orange); font-size:12px; text-overflow:ellipsis; white-space:nowrap; }
      .social-feed-card.is-repost .social-feed-quote-head span { flex:0 0 auto; max-width:42%; overflow:hidden; border:1px solid rgba(255,106,0,.10); border-radius:999px; background:rgba(255,255,255,.62); color:#c14f00; padding:3px 7px; font-size:10px; line-height:1; font-weight:850; text-overflow:ellipsis; white-space:nowrap; }
      .social-feed-card.is-repost .social-feed-quote-body { display:grid !important; grid-template-columns:minmax(0,1fr) auto !important; align-items:start; gap:9px; min-width:0; }
      .social-feed-card.is-repost .social-feed-quote-copy { display:grid !important; grid-template-columns:minmax(0,1fr); gap:4px; min-width:0; }
      .social-feed-card.is-repost .social-feed-quote-title { display:-webkit-box !important; overflow:hidden; min-width:0; color:var(--emy-navy); font-size:12.8px; line-height:1.22; font-weight:800; text-overflow:ellipsis; white-space:normal; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
      .social-feed-card.is-repost .social-feed-quote-text { display:-webkit-box !important; overflow:hidden; min-width:0; margin:0; color:#667085; font-size:11.7px; line-height:1.35; font-weight:520; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
      .social-feed-card.is-repost .social-feed-quote-price { display:inline-flex; justify-self:start; width:max-content; max-width:100%; border-radius:999px; background:#fff4e8; color:#c14f00; padding:3px 7px; font-size:10.8px; line-height:1; font-weight:800; }
      .social-feed-card.is-repost .social-feed-quote-media { width:84px; height:70px; overflow:hidden; border-radius:7px; background:linear-gradient(135deg,#fffaf5,#e8eef6); box-shadow:inset 0 0 0 1px rgba(0,27,71,.08); }
      .social-feed-card.is-repost .social-feed-quote-media img,
      .social-feed-card.is-repost .social-feed-quote-media video { display:block; width:100%; height:100%; object-fit:cover; }
      @media (max-width:520px){ .social-feed-card.is-repost .social-feed-quote-body { grid-template-columns:minmax(0,1fr) !important; } .social-feed-card.is-repost .social-feed-quote-media { width:100%; height:118px; } }
      .feed-list .social-feed-card .social-feed-comments-link { min-width:0; margin:0; color:#7a869e; font-size:11.5px; line-height:1.2; font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .feed-list .social-feed-card .social-feed-time { color:#98a2b3; font-size:10.5px; font-weight:650; text-transform:none; letter-spacing:0; white-space:nowrap; }
      .feed-list .social-feed-card .social-feed-actions-counted,
      .social-feed-card .social-feed-actions-counted { display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:start; gap:4px; margin:1px 6px 0; border-top:1px solid rgba(0,27,71,.07); border-bottom:0; padding:4px 0 0; }
      .social-feed-actions-counted .social-feed-action-set { display:flex; flex-wrap:wrap; align-items:center; gap:4px 5px; min-width:0; }
      .feed-list .social-feed-card .social-feed-actions-counted .social-feed-icon,
      .social-feed-card .social-feed-actions-counted .social-feed-icon { width:25px; min-width:25px; height:24px; min-height:24px; border-radius:7px; }
      .feed-list .social-feed-card .social-feed-actions-counted .social-feed-icon svg,
      .social-feed-card .social-feed-actions-counted .social-feed-icon svg { width:13px; height:13px; }
      .social-feed-action-pair { display:inline-flex; align-items:center; gap:3px; min-width:0; }
      .social-feed-action-pair strong,
      .social-feed-body-counted > strong { min-width:7px; color:#647089; font-size:12.5px; line-height:1; font-weight:560; }
      .social-feed-body-counted > [data-feed-comment-total],
      .home-created-social-meta > [data-home-created-comment-total] { display:none !important; }
      .social-feed-actions-counted .social-feed-save { justify-self:end; margin-left:2px; }
      .feed-list .social-feed-card .social-feed-body.social-feed-body-counted,
      .social-feed-body.social-feed-body-counted { display:grid; grid-template-columns:auto minmax(0,1fr) auto; align-items:center; gap:4px; padding:3px 6px 7px; }
      .social-feed-body-counted .social-feed-caption { grid-column:1 / -1; margin:0; }
      .social-feed-hidden-stat { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); clip-path:inset(50%); white-space:nowrap; }
      .feed-list .social-feed-card .social-feed-body-counted .social-feed-comments-link,
      .social-feed-body-counted .social-feed-comments-link { margin:0; border-radius:999px; background:#fff4e8; color:var(--emy-orange); padding:2px 6px; font-size:10px; font-weight:780; }
      [data-feed-id]:not(.is-comments-open) .social-feed-body-counted .social-feed-comments-link,
      [data-feed-id]:not(.is-comments-open) .home-created-social-meta .social-feed-comments-link { display:none !important; }
      [data-feed-id]:not(.is-comments-open) .social-feed-body-counted .social-feed-time,
      [data-feed-id]:not(.is-comments-open) .home-created-social-meta .social-feed-time { grid-column:3; }
      .feed-list .social-feed-card .social-feed-body-counted .social-feed-time,
      .social-feed-body-counted .social-feed-time { justify-self:end; margin:0; color:#98a2b3; font-size:10px; line-height:1.15; font-weight:660; text-transform:none; letter-spacing:0; }
      .feed-list .social-feed-card.is-text-only { border-radius:8px; background:#fff; box-shadow:0 6px 18px rgba(0,27,71,.045); }
      .feed-list .social-feed-card.is-text-only .social-feed-head { grid-template-columns:40px minmax(0,1fr) 32px; padding:10px 12px 4px; }
      .feed-list .social-feed-card.is-text-only .social-feed-avatar { width:38px; height:38px; }
      .feed-list .social-feed-card.is-text-only .social-feed-text-panel { margin:0 12px 2px; padding:8px 0 10px; }
      .feed-list .social-feed-card.is-text-only .social-feed-text-panel p { font-size:13.5px; line-height:1.45; font-weight:560; }
      .feed-list .feed-post-card { min-height:0; border-radius:8px; box-shadow:0 6px 18px rgba(0,27,71,.045); }
      .feed-list .feed-post-card .post-head { grid-template-columns:36px minmax(0,1fr); gap:9px; min-height:56px; padding:10px 12px; }
      .feed-list .feed-post-card .post-avatar { width:34px; height:34px; border-radius:999px; }
      .feed-list .feed-post-card .post-head strong { font-size:13px; line-height:1.15; font-weight:820; }
      .feed-list .feed-post-card .post-head small { font-size:10.5px; font-weight:650; }
      .feed-list .feed-post-card .body,
      .feed-list .feed-post-card.is-text-post .body { min-height:0; padding:12px; }
      .feed-list .feed-post-card h3 { font-size:16px; line-height:1.18; font-weight:850; white-space:normal; }
      .feed-list .feed-post-card p { margin:8px 0 0; color:#667085; font-size:13px; line-height:1.38; font-weight:560; -webkit-line-clamp:3; }
      .feed-list .feed-post-card .post-meta { margin-top:12px; padding-top:8px; border-top:1px solid rgba(0,27,71,.07); color:#667085; font-size:11.5px; line-height:1.2; font-weight:760; }
      .feed-list .feed-post-card .post-meta span:last-child { min-height:24px; border-radius:999px; background:#fff4e8; color:#c14f00; padding:0 10px; font-size:11px; }
      .feed-list .feed-product-card { min-height:0; border-radius:8px; box-shadow:0 6px 18px rgba(0,27,71,.045); }
      .feed-list .feed-product-card .body { min-height:0; padding:14px 14px 13px; }
      .feed-list .feed-product-card h3 { min-height:0; font-size:16px; line-height:1.2; font-weight:850; }
      .feed-list .feed-product-card p { min-height:0; margin-top:6px; font-size:12.5px; line-height:1.35; font-weight:560; }
      .feed-list .feed-product-card .product-source,
      .feed-list .feed-product-card .product-availability,
      .feed-list .feed-product-card .product-stats { font-size:11.5px; font-weight:720; }
      .feed-list .feed-product-card .heart { width:36px; height:36px; right:14px; top:14px; box-shadow:0 8px 18px rgba(0,27,71,.08); }
      .feed-list .feed-product-card .social-feed-more { width:36px; min-height:36px; right:14px; top:14px; box-shadow:0 8px 18px rgba(0,27,71,.08); }
      .feed-list .feed-product-card .heart svg { width:19px; height:19px; }
      .feed-list .feed-clip-card .caption { padding:38px 12px 12px; }
      .feed-list .feed-clip-card .caption strong { font-size:17px; line-height:1.12; font-weight:850; }
      .feed-list .feed-clip-card .caption > span { min-height:0; font-size:12.5px; line-height:1.2; font-weight:650; }
      .feed-list .reel-actions,
      .feed-list .feed-clip-card .reel-actions,
      .feed-list .feed-product-clip-card .reel-actions { gap:8px; padding-top:8px; border-top:1px solid rgba(255,255,255,.20); font-size:11.5px; line-height:1; font-weight:760; }
      .feed-list .reel-inline-action { min-height:24px; border-radius:999px; padding:0 4px; font-size:11.5px; line-height:1; font-weight:760; }
      .feed-list .reel-card { width:min(210px,100%); min-height:336px; justify-self:start; }
      .feed-list .feed-clip-card,
      .feed-list .feed-product-clip-card { width:min(210px,100%); min-height:372px; }
      .feed-list .reel-card .social-feed-more { right:12px; top:12px; width:30px; min-height:30px; font-size:16px; }
      .feed-list .feed-clip-card .reel-top,
      .feed-list .feed-product-clip-card .reel-top { top:12px; left:12px; right:12px; grid-template-columns:32px minmax(0,1fr) auto; gap:8px; }
      .feed-list .feed-clip-card .reel-avatar,
      .feed-list .feed-product-clip-card .reel-avatar { width:32px; height:32px; }
      .feed-list .feed-clip-card .reel-top strong,
      .feed-list .feed-product-clip-card .reel-top strong { font-size:12.5px; }
      .feed-list .feed-clip-card .reel-top small,
      .feed-list .feed-product-clip-card .reel-top small { font-size:10.5px; }
      .feed-list .feed-clip-card .reel-type-badge,
      .feed-list .feed-product-clip-card .reel-type-badge { min-height:24px; padding:0 9px; font-size:10.5px; }
      .feed-list .feed-clip-card .reel-play,
      .feed-list .feed-product-clip-card .reel-play { width:46px; height:46px; }
      .feed-list .feed-clip-card .reel-play svg,
      .feed-list .feed-product-clip-card .reel-play svg { width:23px; height:23px; }
      .feed-list .feed-clip-card .caption,
      .feed-list .feed-product-clip-card .caption { min-height:132px; padding:34px 12px 12px; }
      .feed-list .feed-clip-card .caption strong,
      .feed-list .feed-product-clip-card .caption strong { min-height:0; font-size:15px; line-height:1.12; }
      .feed-list .feed-clip-card .caption > span,
      .feed-list .product-clip-copy { min-height:0; margin-top:5px; font-size:11.5px; line-height:1.22; }
      .feed-list .product-clip-panel { min-height:84px; margin-top:8px; padding:10px; }
      .feed-list .product-clip-panel strong { font-size:15px; }
      .feed-list .product-clip-panel span { margin-top:10px; font-size:11.5px; }
      .feed-list .reel-card .social-feed-more,
      .results .reel-card .social-feed-more {
        position:absolute;
        right:12px;
        top:12px;
        z-index:12;
        width:32px;
        min-width:32px;
        height:32px;
        min-height:32px;
        display:grid;
        place-items:center;
        border:1px solid rgba(255,255,255,.58);
        border-radius:999px;
        background:rgba(8,19,38,.34);
        color:#fff;
        padding:0;
        font-size:17px;
        line-height:1;
        box-shadow:0 10px 22px rgba(0,27,71,.22), inset 0 1px 0 rgba(255,255,255,.18);
        backdrop-filter:blur(12px) saturate(1.1);
      }
      .feed-list .reel-card .social-feed-more:hover,
      .results .reel-card .social-feed-more:hover,
      .feed-list .reel-card .social-feed-more[aria-expanded="true"],
      .results .reel-card .social-feed-more[aria-expanded="true"] {
        border-color:rgba(255,106,0,.55);
        background:rgba(255,106,0,.92);
        color:#fff;
      }
      .feed-list .feed-clip-card .reel-top,
      .feed-list .feed-product-clip-card .reel-top,
      .results .feed-clip-card .reel-top,
      .results .feed-product-clip-card .reel-top {
        right:52px;
      }
      .feed-list .social-feed-card.is-clip { width:min(210px,100%); justify-self:start; }
      .feed-list .social-feed-card.is-clip .social-feed-head { grid-template-columns:34px minmax(0,1fr) 28px; gap:8px; min-height:44px; padding:7px 9px 4px; }
      .feed-list .social-feed-card.is-clip .social-feed-avatar { width:32px; height:32px; }
      .feed-list .social-feed-card.is-clip .social-feed-head strong { overflow:hidden; font-size:12px; line-height:1.12; text-overflow:ellipsis; white-space:nowrap; }
      .feed-list .social-feed-card.is-clip .social-feed-head small { overflow:hidden; font-size:10px; line-height:1.1; text-overflow:ellipsis; white-space:nowrap; }
      .feed-list .social-feed-card.is-clip .social-feed-options { width:28px; height:28px; min-height:28px; }
      .feed-list .social-feed-card.is-clip .social-feed-media { min-height:0; aspect-ratio:9 / 12; }
      .feed-list .social-feed-card.is-clip .social-feed-play { width:44px; height:44px; }
      .feed-list .social-feed-card.is-clip .social-feed-play svg { width:22px; height:22px; }
      .feed-list .social-feed-card.is-clip .social-feed-product-price { min-height:24px; padding:0 9px; font-size:11px; }
      .feed-list .social-feed-card.is-clip .social-feed-actions { margin:0 9px; padding:4px 0; gap:5px; }
      .feed-list .social-feed-card.is-clip .social-feed-action-set { gap:3px; }
      .feed-list .social-feed-card.is-clip .social-feed-icon { width:30px; min-width:30px; height:28px; min-height:28px; border-radius:9px; }
      .feed-list .social-feed-card.is-clip .social-feed-icon svg { width:16px; height:16px; }
      .feed-list .social-feed-card.is-clip .social-feed-body { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:3px 6px; padding:3px 9px 9px; }
      .feed-list .social-feed-card.is-clip .social-feed-stat { font-size:10.8px; line-height:1.2; }
      .feed-list .social-feed-card.is-clip .social-feed-caption { grid-column:1 / -1; display:-webkit-box; overflow:hidden; margin:0; font-size:11px; line-height:1.28; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
      .feed-list .social-feed-card.is-clip .social-feed-comments-link,
      .feed-list .social-feed-card.is-clip .social-feed-time { min-height:0; margin:0; border:0; background:transparent; padding:0; font-size:10.5px; line-height:1.2; white-space:nowrap; }
      .feed-list .social-feed-card.is-clip .product-clip-panel { grid-column:1 / -1; min-height:30px; display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:center; gap:6px; margin-top:3px; padding:5px 7px; border-radius:7px; }
      .feed-list .social-feed-card.is-clip .product-clip-panel strong { overflow:hidden; font-size:11px; line-height:1.1; text-overflow:ellipsis; white-space:nowrap; }
      .feed-list .social-feed-card.is-clip .product-clip-panel span { display:none; }
      .feed-list .social-feed-card.is-clip .product-clip-price { min-height:20px; margin-top:0; padding:0 8px; font-size:10.5px; }
      .feed-list .social-feed-job-card .feed-job-card { margin:0 10px 4px; box-shadow:none; }
      .feed-new-posts-pill { position:fixed; left:50%; top:76px; z-index:95; min-height:34px; max-width:min(260px, calc(100vw - 32px)); border:1px solid rgba(0,27,71,.10); border-radius:999px; background:rgba(255,255,255,.94); color:var(--emy-navy); cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:0 13px 0 10px; font:inherit; font-size:12.5px; line-height:1; font-weight:820; white-space:nowrap; box-shadow:0 10px 24px rgba(0,27,71,.12), inset 0 1px 0 rgba(255,255,255,.9); backdrop-filter:blur(14px); transform:translate(-50%,-10px); opacity:0; pointer-events:none; transition:opacity .18s ease, transform .18s ease, border-color .18s ease, color .18s ease, box-shadow .18s ease; }
      .feed-new-posts-pill.is-visible { opacity:.96; pointer-events:auto; transform:translate(-50%,0); }
      .feed-new-posts-pill:hover, .feed-new-posts-pill:focus-visible { border-color:rgba(255,106,0,.28); color:#d85a00; box-shadow:0 12px 28px rgba(0,27,71,.14), 0 7px 18px rgba(255,106,0,.10), inset 0 1px 0 rgba(255,255,255,.94); outline:0; }
      .feed-new-posts-pill svg { width:15px; height:15px; flex:0 0 auto; fill:none; stroke:var(--emy-orange); stroke-width:2.4; stroke-linecap:round; stroke-linejoin:round; }
      .emy-repost-dialog { position:fixed; inset:0; z-index:10090; display:none; align-items:center; justify-content:center; padding:18px; background:rgba(0,27,71,.38); backdrop-filter:blur(10px); }
      .emy-repost-dialog.is-open { display:flex; }
      .emy-repost-card { width:min(100%,520px); overflow:hidden; border:1px solid rgba(255,255,255,.74); border-radius:18px; background:linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,248,240,.90)); color:var(--emy-navy); box-shadow:0 28px 70px rgba(0,27,71,.24), inset 0 1px 0 rgba(255,255,255,.88); }
      .emy-repost-head { display:flex; align-items:center; justify-content:space-between; gap:12px; border-bottom:1px solid rgba(0,27,71,.08); padding:16px 18px; }
      .emy-repost-head strong { display:block; font-size:18px; line-height:1.15; font-weight:880; }
      .emy-repost-head span { display:block; margin-top:4px; color:#667085; font-size:12px; line-height:1.3; font-weight:640; }
      .emy-repost-close { width:36px; height:36px; border:0; border-radius:999px; background:rgba(255,255,255,.68); color:var(--emy-navy); cursor:pointer; font-size:22px; line-height:1; font-weight:780; }
      .emy-repost-body { display:grid; gap:12px; padding:16px 18px 18px; }
      .emy-repost-source { border:1px solid rgba(0,27,71,.08); border-radius:12px; background:rgba(255,255,255,.70); padding:11px 12px; color:#344054; font-size:12px; line-height:1.35; font-weight:720; }
      .emy-repost-body textarea { width:100%; min-height:118px; resize:vertical; box-sizing:border-box; border:1px solid rgba(0,27,71,.12); border-radius:14px; background:#fff; color:var(--emy-navy); outline:0; padding:12px; font:inherit; font-size:14px; line-height:1.4; }
      .emy-repost-body textarea:focus { border-color:rgba(255,106,0,.44); box-shadow:0 0 0 4px rgba(255,106,0,.10); }
      .emy-repost-actions { display:flex; justify-content:flex-end; gap:10px; }
      .emy-repost-actions button { min-height:40px; border-radius:999px; cursor:pointer; padding:0 16px; font:inherit; font-size:13px; line-height:1; font-weight:820; }
      .emy-repost-cancel { border:1px solid rgba(0,27,71,.10); background:#fff; color:var(--emy-navy); }
      .emy-repost-submit { border:0; background:var(--emy-orange); color:#fff; box-shadow:0 12px 24px rgba(255,106,0,.22); }
      .toast { position:fixed; left:50%; bottom:102px; z-index:80; transform:translateX(-50%) translateY(12px); min-width:min(320px,calc(100% - 32px)); border:1px solid rgba(0,27,71,.10); border-radius:10px; background:rgba(255,255,255,.96); color:var(--emy-navy); box-shadow:0 18px 38px rgba(0,27,71,.16); padding:12px 14px; text-align:center; opacity:0; pointer-events:none; transition:.18s ease; font-size:13px; font-weight:560; }
      .toast.is-visible { opacity:1; transform:translateX(-50%) translateY(0); }
      .bottom-nav { position:fixed; left:50%; bottom:18px; z-index:55; width:min(620px, calc(100% - 40px)); transform:translateX(-50%); display:grid; grid-template-columns:repeat(8,minmax(0,1fr)); gap:2px; border:1px solid rgba(0,27,71,.06); border-radius:14px; background:rgba(248,251,255,.48); backdrop-filter:blur(18px); box-shadow:0 14px 36px rgba(0,27,71,.08); padding:8px; transition:background .18s ease, border-color .18s ease, box-shadow .18s ease; }
      .bottom-nav:hover { border-color:rgba(0,27,71,.14); background:rgba(248,251,255,.96); box-shadow:0 18px 46px rgba(0,27,71,.18); }
      .nav-item { position:relative; border:0; background:transparent; color:#56637b; cursor:pointer; display:grid; place-items:center; gap:4px; min-height:54px; min-width:0; padding:0; border-radius:11px; font-size:10px; font-weight:600; }
      .nav-item span { position:relative; z-index:1; line-height:1; padding-bottom:5px; }
`;
const customer_feeds_part_2 = String.raw`
      .nav-item svg { width:34px; height:34px; stroke-width:2; color:rgba(0,27,71,.86); padding:8px; border:1px solid rgba(255,255,255,.88); border-radius:13px; background:linear-gradient(145deg, rgba(255,255,255,.92), rgba(255,255,255,.42) 54%, rgba(255,255,255,.24)), rgba(255,255,255,.34); clip-path:polygon(18% 0,100% 0,100% 74%,78% 100%,0 100%,0 22%); box-shadow:inset 0 1px 0 rgba(255,255,255,.74), inset 0 -8px 16px rgba(0,27,71,.08), 0 9px 18px rgba(0,27,71,.16); }
      .nav-item:hover, .nav-item.is-active { background:rgba(255,106,0,.07); color:var(--emy-orange); }
      .nav-item.is-active svg { color:var(--emy-orange); border-color:rgba(255,106,0,.36); background:linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,255,255,.48) 54%, rgba(255,255,255,.28)), rgba(255,255,255,.38); transform:translateY(-1px); box-shadow:inset 0 1px 0 rgba(255,255,255,.78), inset 0 -8px 16px rgba(255,106,0,.08), 0 10px 20px rgba(0,27,71,.17); }
      .nav-item.is-active::after { content:""; position:absolute; bottom:1px; width:18px; height:2px; border-radius:999px; background:var(--emy-orange); }
      .nav-item.nav-item-ask svg { width:48px; height:48px; color:#fff; padding:0; border:0; border-radius:0; background:transparent; clip-path:none; box-shadow:none; filter:drop-shadow(0 11px 15px rgba(255,106,0,.28)); }
      .nav-item.nav-item-ask span { color:var(--emy-orange); font-size:8.8px; white-space:nowrap; }
      .nav-item.nav-item-ask:hover svg { transform:translateY(-1px); }
`;
const customer_feeds_part_3 = String.raw`
      @media (min-width:820px) {
        .shell { padding-left:28px; padding-right:28px; }
        .topbar { position:sticky; top:0; z-index:30; min-height:70px; border-bottom:1px solid rgba(0,27,71,.08); background:rgba(255,253,248,.86); backdrop-filter:blur(16px); padding:0 4px; }
        .avatar { width:44px; height:44px; }
        .hello strong { font-size:16px; }
        .location-btn { font-size:12px; }
        .icon-btn { width:42px; height:42px; background:#fff; border:1px solid rgba(0,27,71,.08); }
        .feed-list { grid-template-columns:minmax(0,1fr); align-items:start; }
        .feed-card.is-wide { grid-column:span 1; }
        .feed-card.is-wide .feed-media { height:auto; aspect-ratio:4/3; }
      }
      @media (min-width:1240px) {
        .page { --feed-main-width:min(calc(100vw - 660px), 1120px); --feed-left-rail-width:272px; --feed-right-rail-width:276px; --feed-side-gap:22px; }
        .shell { width:var(--feed-main-width); }
        .feed-list { grid-template-columns:minmax(0,1fr); gap:16px; }
        .feed-media, .feed-card.is-wide .feed-media { height:auto; aspect-ratio:4/3; }
        .left-rail {
          position:fixed;
          left:max(14px, calc((100vw - var(--feed-main-width)) / 2 - var(--feed-left-rail-width) - var(--feed-side-gap)));
          top:22px;
          z-index:28;
          display:grid;
          align-content:start;
          gap:8px;
          width:var(--feed-left-rail-width);
          max-height:calc(100dvh - 36px);
          overflow-y:auto;
          padding:0 26px 24px 0;
          scrollbar-width:none;
        }
        .home-business-switch {
          position:fixed;
          right:max(18px, calc((100vw - var(--feed-main-width)) / 2 - var(--feed-right-rail-width) - var(--feed-side-gap)));
          top:22px;
          z-index:42;
          display:flex;
          width:var(--feed-right-rail-width);
        }
        .business-switch-spacer { display:block; min-height:62px; }
        .right-rail {
          position:fixed;
          right:max(18px, calc((100vw - var(--feed-main-width)) / 2 - var(--feed-right-rail-width) - var(--feed-side-gap)));
          top:78px;
          z-index:28;
          display:grid;
          align-content:start;
          gap:14px;
          width:var(--feed-right-rail-width);
          max-height:calc(100dvh - 92px);
          overflow-y:auto;
          scrollbar-width:none;
        }
      }
      @media (max-width:520px) {
        .shell { padding-left:14px; padding-right:14px; }
        .feed-new-posts-pill { top:66px; min-height:32px; max-width:calc(100vw - 28px); padding:0 11px 0 9px; font-size:12px; }
        .composer { padding:12px; border-radius:16px; }
        .composer-inner { grid-template-columns:38px minmax(0,1fr); gap:10px; }
        .composer-avatar { width:38px; height:38px; }
        .composer-input-wrap { --composer-input-min:98px; margin-left:0; margin-right:0; }
        .composer-prompt { align-items:flex-start; }
        .composer-actions { align-items:stretch; flex-direction:column; }
        .composer-tools { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); }
        .composer-tool { justify-content:center; }
        .composer-post { width:100%; margin-left:0; }
        .feed-media { min-height:0; margin:0; aspect-ratio:4/3; }
        .feed-card-head { padding-left:12px; padding-right:12px; }
        .feed-body { padding-left:12px; padding-right:12px; }
        .bottom-nav { width:min(calc(100% - 16px), 430px); bottom:10px; }
        .nav-item { min-height:56px; font-size:9.5px; }
      }
`;
const customer_feeds_part_4 = String.raw`
    </style>
  </head>
  <body>
    <main class="page">
      <div class="shell">
`;
const customer_feeds_part_5 = String.raw`

        <aside class="left-rail" aria-label="My Businesses">
          <a class="left-rail-brand" href="emy-customer-home.html" aria-label="EMY home">
            <img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="EMY" />
            <span>Beta</span>
          </a>
          <section class="rail-card">
            <div class="rail-card-head">
              <h2>My Businesses</h2>
              <a href="emy-customer-search.html#following" aria-label="View all My Businesses"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
            </div>
            <p class="rail-summary">Businesses you are already a customer of.</p>
            <a class="my-business-row is-open" href="emy-business-profile.html?business=angi-pizza" data-business-link="angi-pizza">
              <span class="my-business-avatar pizza" aria-hidden="true">A</span>
              <span class="my-business-copy"><strong>Angi Pizza Zone</strong><span>Fresh offer and 4 products</span></span>
              <span class="my-business-pill" aria-label="New activity"></span>
            </a>
            <a class="my-business-row" href="emy-business-profile.html?business=ever-glow" data-business-link="ever-glow">
              <span class="my-business-avatar shop" aria-hidden="true">E</span>
              <span class="my-business-copy"><strong>Ever Glow Face Wash</strong><span>3 new skincare updates</span></span>
              <span class="my-business-pill" aria-label="New activity"></span>
            </a>
            <a class="my-business-row" href="emy-business-profile.html?business=ross-galler" data-business-link="ross-galler">
              <span class="my-business-avatar person" aria-hidden="true">R</span>
              <span class="my-business-copy"><strong>Ross Galler</strong><span>New clip from the profile</span></span>
              <span class="my-business-pill" aria-label="New activity"></span>
            </a>
            <a class="my-business-row" href="emy-business-profile.html?business=business-111" data-business-link="business-111" data-my-business-extra hidden>
              <span class="my-business-avatar bottle" aria-hidden="true">B</span>
              <span class="my-business-copy"><strong>business 111</strong><span>New stock ready nearby</span></span>
              <span class="my-business-pill" aria-label="New activity"></span>
            </a>
            <a class="my-business-row" href="emy-business-profile.html?business=packly-supplies" data-business-link="packly-supplies" data-my-business-extra hidden>
              <span class="my-business-avatar supply" aria-hidden="true">P</span>
              <span class="my-business-copy"><strong>Packly Supplies Co.</strong><span>Delivery partner updates</span></span>
              <span class="my-business-pill" aria-label="New activity"></span>
            </a>
            <a class="my-business-row" href="emy-business-profile.html?business=ridge-hardware" data-business-link="ridge-hardware" data-my-business-extra hidden>
              <span class="my-business-avatar shop" aria-hidden="true">R</span>
              <span class="my-business-copy"><strong>Ridge Hardware</strong><span>Open near Ridge Way</span></span>
              <span class="my-business-pill" aria-label="New activity"></span>
            </a>
            <button class="my-business-toggle" type="button" data-my-business-toggle aria-expanded="false">
              <span class="my-business-toggle-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span class="my-business-toggle-text" data-my-business-toggle-text>Show more</span>
            </button>
          </section>
          <section class="my-business-activity" aria-label="New from My Businesses">
            <h3>New From My Businesses</h3>
            <a class="my-business-update" href="emy-customer-home.html#feeds">
              <span class="my-business-update-copy"><strong>Angi Pizza Zone</strong><span>Lunch deal posted today</span></span>
              <span class="my-business-update-tag">Offer</span>
            </a>
            <a class="my-business-update" href="emy-customer-home.html#feeds">
              <span class="my-business-update-copy"><strong>Ever Glow Face Wash</strong><span>3 new products added</span></span>
              <span class="my-business-update-tag">New</span>
            </a>
            <a class="my-business-update" href="emy-customer-home.html#feeds">
              <span class="my-business-update-copy"><strong>Ross Galler</strong><span>New clip available</span></span>
              <span class="my-business-update-tag">Clip</span>
            </a>
            <a class="my-business-update" href="emy-customer-home.html#feeds" data-my-business-extra hidden>
              <span class="my-business-update-copy"><strong>business 111</strong><span>Fresh stock details updated</span></span>
              <span class="my-business-update-tag">New</span>
            </a>
            <a class="my-business-update" href="emy-customer-home.html#feeds" data-my-business-extra hidden>
              <span class="my-business-update-copy"><strong>Ever Glow Face Wash</strong><span>Simple skincare routine shared</span></span>
              <span class="my-business-update-tag">Tip</span>
            </a>
            <a class="my-business-update" href="emy-customer-home.html#feeds" data-my-business-extra hidden>
              <span class="my-business-update-copy"><strong>Angi Pizza Zone</strong><span>Family pizza deal is visible</span></span>
              <span class="my-business-update-tag">Offer</span>
            </a>
            <button class="my-business-toggle" type="button" data-my-business-toggle aria-expanded="false">
              <span class="my-business-toggle-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span class="my-business-toggle-text" data-my-business-toggle-text>Show more</span>
            </button>
            <a class="customer-feed-link" href="emy-customer-home.html#feeds">View My Businesses <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          </section>
        </aside>

        <button class="business-switch home-business-switch" type="button" data-switch-business data-business-switch-mode="create" aria-pressed="false">
          <span><strong>Create a Business Account</strong><span>Start a business profile when you are ready.</span></span>
          <span class="switch-track" aria-hidden="true"></span>
        </button>

        <aside class="right-rail" aria-label="EMY discovery panel">
          <div class="business-switch-spacer" aria-hidden="true"></div>
          <section class="rail-card" hidden data-emy-real-rail="stats">
            <h2>Today on EMY</h2>
            <p class="rail-summary">Live counts from your saved businesses, products, clips, and posts.</p>
            <div class="rail-stat-grid">
              <a class="rail-stat is-hot" href="emy-customer-search.html#business"><strong>0</strong><span>Saved businesses</span></a>
              <a class="rail-stat" href="emy-customer-search.html#business"><strong>0</strong><span>Business profiles</span></a>
              <a class="rail-stat" href="emy-customer-search.html#products"><strong>0</strong><span>Products</span></a>
              <a class="rail-stat" href="emy-customer-search.html#following"><strong>0</strong><span>Clips</span></a>
            </div>
          </section>
          <section class="rail-card" hidden data-emy-real-rail="pulse">
            <h2>Local pulse</h2>
            <button class="my-business-toggle" type="button" data-my-business-toggle aria-expanded="false" hidden>
              <span class="my-business-toggle-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span class="my-business-toggle-text" data-my-business-toggle-text>Show more</span>
            </button>
          </section>
        </aside>

        <section class="feed-head">
          <h1>Feeds</h1>
          <p>All new products, posts, clips, offers, and updates from nearby businesses and businesses where you are a customer.</p>
        </section>

        <section class="composer" aria-label="Create a feed post">
          <div class="composer-inner">
            <span class="composer-avatar" data-composer-avatar>S</span>
            <div class="composer-main">
              <div class="composer-prompt">
                <span><strong>Create a feed update</strong><small>Customer feed</small></span>
                <button class="feed-create-open" type="button" data-feed-create-open><span aria-hidden="true">+</span> Create</button>
              </div>
              <div class="composer-input-wrap"><textarea data-compose-text placeholder="Share a quick update or question..."></textarea></div>
              <div class="composer-preview" data-compose-preview hidden>
                <img data-compose-preview-image alt="Selected post image preview" hidden />
                <video data-compose-preview-video controls playsinline hidden></video>
              </div>
              <div class="composer-actions">
                <button class="composer-post" type="button" data-compose-post>Post</button>
              </div>
              <input data-compose-file type="file" accept="image/*" multiple hidden />
              <input data-compose-video-file type="file" accept="video/*" multiple hidden />
            </div>
          </div>
        </section>

        <div class="feed-media-overlay" data-compose-media-source aria-hidden="true">
          <section class="feed-media-sheet" aria-label="Choose media source">
            <h2 data-compose-media-title>Add photo</h2>
            <p data-compose-media-help>Choose from gallery, computer, or camera.</p>
            <div class="feed-media-options">
              <button type="button" data-compose-source="library">
                <span class="feed-media-option-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 5h14v14H5V5Zm3 10 3-3 2 2 2-3 3 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 9.2h.01" stroke="currentColor" stroke-linecap="round" stroke-width="2.5"/></svg></span>
                <span><strong data-compose-library-label>Gallery or computer</strong><span data-compose-library-help>Choose from your phone gallery, laptop, or files.</span></span>
              </button>
              <button type="button" data-compose-source="camera">
                <span class="feed-media-option-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M8 8l1.5-2h5L16 8h2.5A2.5 2.5 0 0 1 21 10.5v6A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-6A2.5 2.5 0 0 1 5.5 8H8Z" stroke="currentColor" stroke-linejoin="round"/><circle cx="12" cy="13.5" r="3" stroke="currentColor"/></svg></span>
                <span><strong data-compose-camera-label>Take picture now</strong><span data-compose-camera-help>Use your camera now.</span></span>
              </button>
            </div>
            <button class="feed-media-close" type="button" data-compose-source-close>Cancel</button>
          </section>
        </div>

        <div class="feed-media-overlay" data-compose-camera-sheet aria-hidden="true">
          <section class="feed-media-sheet" aria-label="Camera">
            <h2 data-compose-camera-title>Take picture now</h2>
            <p data-compose-camera-copy>Allow camera access, then capture your update.</p>
            <div class="feed-camera-frame" data-compose-camera-frame>
              <video class="feed-camera-preview" data-compose-camera-preview autoplay muted playsinline></video>
            </div>
            <label class="feed-camera-sound" data-compose-camera-sound><input data-compose-camera-audio type="checkbox" checked /> Record sound with this video</label>
            <p class="feed-camera-timer" data-compose-camera-timer>0:00</p>
            <p class="feed-camera-status" data-compose-camera-status></p>
            <div class="feed-camera-actions" data-compose-camera-actions>
              <button type="button" data-compose-camera-cancel>Cancel</button>
              <button type="button" data-compose-camera-capture>Take picture</button>
              <button class="feed-camera-stop" type="button" data-compose-camera-stop hidden>Stop recording</button>
            </div>
          </section>
        </div>

        <section class="feed-list" data-feed-list aria-live="polite"></section>
      </div>

      <nav class="bottom-nav" aria-label="Customer navigation">
        <button class="nav-item" type="button" data-nav="home" data-tip="Local feed"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5V20H6v-6h12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Home</span></button>
        <button class="nav-item" type="button" data-nav="nearby" data-tip="Businesses close to you"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" stroke="currentColor" stroke-linejoin="round"/><path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor"/></svg><span>Nearby</span></button>
        <button class="nav-item is-active" type="button" data-nav="feeds" data-tip="Product and posts"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z" stroke="currentColor" stroke-linejoin="round"/></svg><span>Feeds</span></button>
        <button class="nav-item" type="button" data-nav="reels" data-tip="Short videos"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 7h14v12H5V7Zm3-4 2 4m4-4 2 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Clips</span></button>
        <button class="nav-item" type="button" data-nav="uploads" data-tip="Upload status"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V5m0 0 4 4m-4-4-4 4M5 19h14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Uploads</span></button>
        <button class="nav-item" type="button" data-nav="profile" data-tip="Your account"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-linecap="round"/></svg><span>Profile</span></button>
        <button class="nav-item" type="button" data-nav="chat" data-tip="Messages"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5.5h14v10.7H9.2L5 19.5v-14Z" stroke="currentColor" stroke-linejoin="round"/><path d="M9 10.8h.01M12 10.8h.01M15 10.8h.01" stroke="currentColor" stroke-linecap="round" stroke-width="2.6"/></svg><span>Chat</span></button>
        <button class="nav-item nav-item-ask" type="button" data-nav="ask" data-tip="AI helper"><span class="ask-emy-bubble">Hi, I'm EMY. Let me help you find what you need.</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/><path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/><path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/><path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/></svg><span>Ask EMY</span></button>
      </nav>
`;
const customer_feeds_part_6 = String.raw`
      <button class="feed-new-posts-pill" type="button" data-feed-new-posts hidden aria-live="polite">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5"/><path d="m6 11 6-6 6 6"/></svg>
        <span data-feed-new-posts-label>New posts</span>
      </button>
      <div class="toast" data-toast></div>
    </main>
    <script>
      (function () {
`;
const customer_feeds_part_7 = String.raw`
        const feedList = document.querySelector("[data-feed-list]");
        const feedNewPosts = document.querySelector("[data-feed-new-posts]");
        const feedNewPostsLabel = document.querySelector("[data-feed-new-posts-label]");
        const toast = document.querySelector("[data-toast]");
        const avatar = document.querySelector("[data-avatar]");
        const firstNameLabel = document.querySelector("[data-first-name]");
        const locationButton = document.querySelector("[data-location]");
        const locationLabel = document.querySelector("[data-location-label]");
        const notificationCount = document.querySelector("[data-notification-count]");
        const composerAvatar = document.querySelector("[data-composer-avatar]");
        const composeText = document.querySelector("[data-compose-text]");
        const composeImage = document.querySelector("[data-compose-image]");
        const composeVideo = document.querySelector("[data-compose-video]");
        const composeFile = document.querySelector("[data-compose-file]");
        const composeVideoFile = document.querySelector("[data-compose-video-file]");
        const composePreview = document.querySelector("[data-compose-preview]");
        const composePreviewImage = document.querySelector("[data-compose-preview-image]");
        const composePreviewVideo = document.querySelector("[data-compose-preview-video]");
        const composeRemove = document.querySelector("[data-compose-remove]");
        const composePost = document.querySelector("[data-compose-post]");
        const composeMediaSource = document.querySelector("[data-compose-media-source]");
        const composeMediaTitle = document.querySelector("[data-compose-media-title]");
        const composeMediaHelp = document.querySelector("[data-compose-media-help]");
        const composeLibraryLabel = document.querySelector("[data-compose-library-label]");
        const composeLibraryHelp = document.querySelector("[data-compose-library-help]");
        const composeCameraLabel = document.querySelector("[data-compose-camera-label]");
        const composeCameraHelp = document.querySelector("[data-compose-camera-help]");
        const composeSourceClose = document.querySelector("[data-compose-source-close]");
        const composeSourceButtons = Array.from(document.querySelectorAll("[data-compose-source]"));
        const composeCameraSheet = document.querySelector("[data-compose-camera-sheet]");
        const composeCameraTitle = document.querySelector("[data-compose-camera-title]");
        const composeCameraCopy = document.querySelector("[data-compose-camera-copy]");
        const composeCameraFrame = document.querySelector("[data-compose-camera-frame]");
        const composeCameraPreview = document.querySelector("[data-compose-camera-preview]");
        const composeCameraSound = document.querySelector("[data-compose-camera-sound]");
        const composeCameraAudio = document.querySelector("[data-compose-camera-audio]");
        const composeCameraTimer = document.querySelector("[data-compose-camera-timer]");
        const composeCameraStatus = document.querySelector("[data-compose-camera-status]");
        const composeCameraActions = document.querySelector("[data-compose-camera-actions]");
        const composeCameraCancel = document.querySelector("[data-compose-camera-cancel]");
        const composeCameraCapture = document.querySelector("[data-compose-camera-capture]");
        const composeCameraStop = document.querySelector("[data-compose-camera-stop]");
        let toastTimer = null;
        let activeFilter = "all";
        let newPostsAnchorId = "";
        let newPostsCount = 0;
        let feedLiveUpdateIds = new Set();
        let feedLiveUpdatesReady = false;
        let composeMediaSrc = "";
        let composeMediaRef = "";
        let composeMediaType = "";
        let composeMediaSettings = window.emyDefaultMediaEditSettings ? window.emyDefaultMediaEditSettings("image") : { fit:"contain", zoom:1, x:0, y:0, aspect:"auto", overlay:"" };
        let composeMediaSaving = false;
        let composeMediaSaveCount = 0;
        let composeMediaItems = [];
        let composeActiveMediaIndex = 0;
        let composePendingMediaType = "image";
        let composeCameraMode = "image";
        let composeCameraStream = null;
        let composeMediaRecorder = null;
        let composeRecordedChunks = [];
        let composeRecordingCancelled = false;
        let composeRecordingStart = 0;
        let composeRecordingTimer = null;
        let composeRecordedWithAudio = false;
        const feedFilterAliases = {
          all: "all",
          my: "my",
          "my-businesses": "my",
          customer: "my",
          following: "my",
          individual: "individual",
          individuals: "individual",
          people: "individual",
          creator: "individual",
          creators: "individual",
          product: "product",
          products: "product",
          post: "post",
          posts: "post",
          clip: "clip",
          clips: "clip",
          reels: "clip",
          business: "business",
          businesses: "business",
          profile: "business",
          profiles: "business",
          job: "job",
          jobs: "job",
          hiring: "job",
          event: "event",
          events: "event",
          article: "article",
          articles: "article",
          offer: "offer",
          offers: "offer"
        };
        const updates = [];
        function canonicalFeedSlug(value) {
          return String(value || "").toLowerCase()
            .replace(/\b(has been|has|been|is|back|added|stock|listed|available|visible|deal|offer|clip|product|new)\b/g, " ")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        }
        function canonicalFeedTitle(item) {
          const text = String(item && (item.productTitle || item.productName || item.title || item.name || item.business) || "").toLowerCase();
          if (/garlic\s*bread/.test(text)) return "garlic-bread";
          if (/soft\s*cleanser/.test(text)) return "soft-cleanser";
          if (/family\s*pizza/.test(text)) return "family-pizza";
          if (/face\s*wash/.test(text)) return "face-wash";
          if (/steel\s*water\s*bottle/.test(text)) return "steel-water-bottle";
          if (/lunch\s*box/.test(text)) return "lunch-box";
          if (/desk\s*lamp/.test(text)) return "desk-lamp";
          if (/pizza\s*slice/.test(text)) return "pizza-slice";
          if (/glow\s*routine/.test(text)) return "glow-routine";
          if (/good\s*day/.test(text)) return "good-day";
          if (/simple\s*skincare\s*routine|skincare\s*routine/.test(text)) return "simple-skincare-routine";
          if (/availability\s*reminder/.test(text)) return "availability-reminder";
          if (/lunch\s*deal/.test(text)) return "lunch-deal";
          return canonicalFeedSlug(text || "item");
        }
        function canonicalFeedId(type, item, index) {
          const rawKind = String(type || (item && item.type) || "post").toLowerCase();
          const kind = rawKind === "profile" ? "business" : (rawKind.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "post");
          const key = canonicalFeedSlug((item && (item.businessKey || item.key || item.business || item.name)) || "business") || "business";
          const title = canonicalFeedTitle(item) || ("item-" + index);
          return "feed-" + kind + "-" + key + "-" + title;
        }
        updates.forEach((item, index) => {
          item.id = item.id || canonicalFeedId(item.type, item, index);
        });

        function escapeHtml(value) {
          return String(value || "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
        }
        function renderLinkedText(value) {
          const text = String(value || "");
          const urlPattern = /(https?:\/\/[^\s<]+|www\.[^\s<]+)/gi;
          let output = "";
          let lastIndex = 0;
          text.replace(urlPattern, (match, _url, offset) => {
            output += escapeHtml(text.slice(lastIndex, offset));
            const clean = match.replace(/[),.;!?]+$/g, "");
            const suffix = match.slice(clean.length);
            const href = clean.indexOf("http") === 0 ? clean : "https://" + clean;
            output += '<a class="feed-comment-text-link" href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(clean) + '</a>' + escapeHtml(suffix);
            lastIndex = offset + match.length;
            return match;
          });
          return output + escapeHtml(text.slice(lastIndex));
        }
        function showToast(message) {
          if (!toast) return;
          clearTimeout(toastTimer);
          toast.textContent = message;
          toast.classList.add("is-visible");
          toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
        }
        function feedNotificationText(value) {
          return String(value || "").replace(/\\s+/g, " ").trim();
        }
        function feedNotificationSlug(value) {
          return feedNotificationText(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        }
        function feedBusinessNotificationKeys(businessKey, businessName) {
          const values = [businessKey, feedNotificationSlug(businessKey), businessName, feedNotificationSlug(businessName)].map(feedNotificationText).filter(Boolean);
          if (values.includes("angi-pizza-zone")) values.push("angi-pizza");
          if (values.includes("angi-pizza")) values.push("angi-pizza-zone");
          if (values.includes("ever-glow-face-wash")) values.push("ever-glow");
          if (values.includes("ever-glow")) values.push("ever-glow-face-wash");
          return Array.from(new Set(values));
        }
        function readStoredNotifications() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyCustomerNotifications") || "[]");
            return Array.isArray(parsed) ? parsed : [];
          } catch (error) {
            return [];
          }
        }
        function updateFeedNotificationCount() {
          if (!notificationCount) return;
          const count = readStoredNotifications().filter((item) => item && item.read !== true && item.unread !== false).length;
          notificationCount.textContent = String(count);
          notificationCount.setAttribute("aria-label", count + " notifications");
        }
        function pushFeedNotification(notification) {
          const item = Object.assign({
            id: "feed-notification-" + Date.now(),
            type: "feed",
            group: "important",
            createdAt: new Date().toISOString(),
            unread: true
          }, notification || {});
          if (item.notifyCustomer !== false) {
            const customerNotifications = readStoredNotifications().filter((entry) => entry && entry.id !== item.id);
            customerNotifications.unshift(item);
            try { localStorage.setItem("emyCustomerNotifications", JSON.stringify(customerNotifications.slice(0, 60))); } catch (error) {}
          }
          const businessKey = feedNotificationText(item.businessKey || item.key || "");
          const businessName = feedNotificationText(item.businessName || item.business || item.actor || item.itemTitle || "");
          const businessKeys = feedBusinessNotificationKeys(businessKey, businessName);
          if (businessKeys.length) {
            try {
              businessKeys.forEach((key) => {
                const businessNotifications = JSON.parse(localStorage.getItem("emyBusinessNotifications:" + key) || "[]");
                const next = (Array.isArray(businessNotifications) ? businessNotifications : []).filter((entry) => entry && entry.id !== item.id);
                next.unshift(Object.assign({}, item, { businessKey: businessKey || key, businessName: businessName || item.businessName || "" }));
                localStorage.setItem("emyBusinessNotifications:" + key, JSON.stringify(next.slice(0, 80)));
              });
            } catch (error) {}
          }
          updateFeedNotificationCount();
        }
        function feedCardItemLabel(card) {
          const kind = feedNotificationText(card && card.dataset && card.dataset.detailKind).toLowerCase();
          if (kind.includes("product")) return "product";
          if (kind.includes("article")) return "article";
          if (kind.includes("clip") || kind.includes("reel")) return "clip";
          if (kind.includes("job")) return "job";
          if (kind.includes("event")) return "event";
          if (kind.includes("post") || kind.includes("update")) return "post";
          if (kind.includes("business")) return "business profile";
          return "feed update";
        }
        function feedCurrentActorIdentity() {
          const role = String(localStorage.getItem("emyMainSignedInRole") || localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          if (role === "business") {
            const draft = feedCurrentBusinessDraft();
            const businessName = feedCurrentBusinessName();
            if (businessName) {
              const businessKey = feedNotificationText(draft.businessKey || draft.key || localStorage.getItem("emyBusinessProfileKey") || localStorage.getItem("emyBusinessKey") || feedCustomerBusinessKey(businessName) || "profile");
              const businessPhoto = feedNotificationText(localStorage.getItem("emyBusinessProfilePhoto") || draft.profilePhoto || draft.photo || draft.avatar || "");
              const businessPhotoRef = feedNotificationText(localStorage.getItem("emyBusinessProfilePhotoRef") || draft.profilePhotoRef || draft.photoRef || draft.avatarRef || "");
              return { type: "business", name: businessName, key: businessKey, photo: businessPhoto, photoRef: businessPhotoRef, href: "emy-business-profile.html?mode=business" };
            }
          }
          const customerName = currentCustomerName();
          const customerEmail = feedNotificationText(localStorage.getItem("emyMainSignedInEmail") || localStorage.getItem("emyMainPendingSignupEmail") || "");
          const customerKey = feedNotificationText(localStorage.getItem("emyCustomerProfileKey") || localStorage.getItem("emyCustomerKey") || customerEmail || customerName || "customer-profile");
          const customerHref = "emy-customer-profile.html" + (customerKey && customerKey.toLowerCase() !== "customer" && customerKey.toLowerCase() !== "customer-profile" ? "?customer=" + encodeURIComponent(customerKey) : "");
          return {
            type: "customer",
            name: customerName,
            key: customerKey,
            email: customerEmail,
              photo: currentCustomerPhoto(),
              photoRef: currentCustomerPhotoRef(),
            href: customerHref
          };
        }
        function feedCardLooksCustomerOwned(card) {
          if (!card) return false;
          const data = card.dataset || {};
          const owner = feedNotificationText(data.owner || data.detailOwner || data.accountType || data.repostActorType).toLowerCase();
          if (owner === "customer") return true;
          if (owner === "business") return false;
          const businessKey = feedCustomerBusinessKey(data.businessKey || data.detailBusinessKey || data.ownerKey || "");
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
        function feedActorIsCustomerContentOwner(card, actor) {
          if (!card || !actor || actor.type !== "customer" || !feedCardLooksCustomerOwned(card)) return false;
          const data = card.dataset || {};
          const ownerName = currentCustomerName().trim().toLowerCase();
          const posterName = feedNotificationText(data.detailBusiness || "").trim().toLowerCase();
          if (ownerName && posterName && ownerName === posterName) return true;
          const cardOwnerKey = feedCustomerBusinessKey(data.businessKey || data.detailBusinessKey || data.ownerKey || "");
          const actorKey = feedCustomerBusinessKey(actor.key || "");
          if (cardOwnerKey === "customer-profile" && (!actorKey || actorKey === "customer-profile")) return true;
          return data.owner === "customer" || data.accountType === "customer" || data.actorType === "customer";
        }
        function dispatchFeedCustomerNotificationCreated(detail) {
          try { window.dispatchEvent(new CustomEvent("emy:customer-notification-created", { detail: detail || {} })); } catch (error) {}
        }
        function feedOwnerNotificationBody(body, fallback, actor) {
          let text = feedNotificationText(body || fallback);
          const actorName = feedNotificationText(actor && actor.name);
          const customerName = currentCustomerName();
          if (actorName && customerName && text.indexOf(customerName) === 0) text = actorName + text.slice(customerName.length);
          if (actorName && text.indexOf("Stephane") === 0) text = actorName + text.slice("Stephane".length);
          return text;
        }
        function notifyFeedCustomerOwner(card, action, body) {
          try {
            if (!card) return;
            const actor = feedCurrentActorIdentity();
            if (feedActorIsCustomerContentOwner(card, actor)) return;
            const itemKind = feedCardItemLabel(card);
            const itemTitle = feedNotificationText(card.dataset.detailTitle || itemKind);
            const notification = {
              id: "feed-customer-owner-" + action + "-" + (card.dataset.feedId || "item") + "-" + Date.now(),
              type: "customer-" + itemKind.replace(/\\s+/g, "-") + "-" + action,
              group: "important",
              title: "Your " + itemKind + " has new activity",
              body: feedOwnerNotificationBody(body, actor.name + " interacted with your " + itemKind + ".", actor),
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
              href: "emy-customer-profile.html#notifications",
              createdAt: new Date().toISOString(),
              read: false,
              unread: true
            };
            const customerNotifications = readStoredNotifications().filter((entry) => entry && entry.id !== notification.id);
            customerNotifications.unshift(notification);
            localStorage.setItem("emyCustomerNotifications", JSON.stringify(customerNotifications.slice(0, 80)));
            updateFeedNotificationCount();
            dispatchFeedCustomerNotificationCreated({ action, itemKind, itemTitle: notification.itemTitle, feedId: card.dataset.feedId || "" });
          } catch (error) {}
        }
        function notifyFeedBusinessOwner(card, action, body) {
          if (!card) return;
          if (feedCardLooksCustomerOwned(card)) {
            notifyFeedCustomerOwner(card, action, body);
            return;
          }
          const businessKey = feedNotificationText(card.dataset.businessKey || "");
          if (!businessKey || businessKey === "customer-profile") return;
          const businessName = feedNotificationText(card.dataset.detailBusiness || "Business");
          const actor = feedCurrentActorIdentity();
          if (actor.type === "business") {
            const targetKeys = [businessKey, businessName].map(feedCustomerBusinessKey).filter(Boolean);
            const currentKeys = feedCurrentBusinessKeys();
            if (targetKeys.some((key) => currentKeys.has(key) || (key === "profile" && actor.key))) return;
          }
          const itemKind = feedCardItemLabel(card);
          const customerHref = actor.type === "customer" ? feedNotificationText(actor.href || ("emy-customer-profile.html" + (actor.key && actor.key.toLowerCase() !== "customer" && actor.key.toLowerCase() !== "customer-profile" ? "?customer=" + encodeURIComponent(actor.key) : ""))) : "";
          const isCustomerRelationshipAction = action === "customer-add" || action === "customer-remove";
          pushFeedNotification({
            id: "feed-owner-" + action + "-" + (card.dataset.feedId || businessKey) + "-" + Date.now(),
            type: itemKind.replace(/\\s+/g, "-") + "-" + action,
            group: "business",
            title: businessName + " " + itemKind + " activity",
            body: feedOwnerNotificationBody(body, actor.name + " interacted with your " + itemKind + ".", actor),
            businessKey,
            businessName,
            itemKind,
            itemTitle: card.dataset.detailTitle || itemKind,
            actorName: actor.name,
            actorType: actor.type,
            actorKey: actor.key,
            actorHref: actor.href,
            customerName: actor.type === "customer" ? actor.name : "",
            customerKey: actor.type === "customer" ? actor.key : "",
            customerEmail: actor.type === "customer" ? feedNotificationText(actor.email || localStorage.getItem("emyMainSignedInEmail") || localStorage.getItem("emyMainPendingSignupEmail") || "") : "",
            customerHref,
            customerProfileHref: customerHref,
            avatar: actor.photo,
            avatarSrc: actor.photo,
            avatarRef: actor.photoRef,
            href: isCustomerRelationshipAction && customerHref ? customerHref : "emy-business-profile.html?business=" + encodeURIComponent(businessKey || businessName) + "#notifications",
            createdAt: new Date().toISOString(),
            unread: true,
            notifyCustomer: false
          });
        }
        function headerLocationLabel(value) {
          if (!value || value === "Near me" || value === "Current Location") return "Current Location";
          const parts = String(value).split(",").map((part) => part.trim()).filter(Boolean);
          const label = parts.slice(0, 2).join(", ") || String(value).trim();
          return label.length > 46 ? label.slice(0, 43).trim() + "..." : label;
        }
        function normaliseFeedFilter(value) {
          const key = String(value || "").replace(/^#/, "").trim().toLowerCase();
          return feedFilterAliases[key] || "all";
        }
        function readCustomerBusinesses() {
          try {
            const stored = JSON.parse(localStorage.getItem("emyCustomerBusinesses") || "{}");
            return Object.keys(stored || {}).map((storageKey) => {
              const item = stored[storageKey] || {};
              const key = item.key || item.businessKey || storageKey;
              return Object.assign({ key }, item, { key });
            }).filter((item) => item && item.name && localStorage.getItem("emyCustomerBusiness:" + item.key) !== "0" && item.active !== false && item.isCustomer !== false);
          } catch (error) {
            return [];
          }
        }
        function feedCustomerBusinessKey(value) {
          return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        }
        function feedBusinessKeyCandidates(item) {
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
            const key = feedCustomerBusinessKey(value);
            if (!key || seen.has(key)) return;
            seen.add(key);
            keys.push(key);
          });
          return keys;
        }
        function feedBusinessKeysOverlap(left, right) {
          return (left || []).some((leftKey) => (right || []).some((rightKey) => {
            if (!leftKey || !rightKey) return false;
            if (leftKey === rightKey) return true;
            return leftKey.length > 4 && rightKey.length > 4 && (leftKey.indexOf(rightKey) >= 0 || rightKey.indexOf(leftKey) >= 0);
          }));
        }
        function feedBusinessKeySetHasAny(keys, item) {
          if (!keys || !item) return false;
          return feedBusinessKeyCandidates(item).some((key) => keys.has(key));
        }
        function feedCurrentBusinessDraft() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyBusinessProfileDraft") || "{}");
            return parsed && typeof parsed === "object" ? parsed : {};
          } catch (error) {
            return {};
          }
        }
        function feedCurrentBusinessName() {
          const draft = feedCurrentBusinessDraft();
          return String(draft.businessName || draft.name || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || localStorage.getItem("emyMainPendingSignupBusinessName") || "").trim();
        }
        function feedCurrentBusinessKeys() {
          const draft = feedCurrentBusinessDraft();
          const keys = new Set();
          [draft.businessKey, draft.key, feedCurrentBusinessName(), localStorage.getItem("emyBusinessProfileKey"), localStorage.getItem("emyBusinessKey"), localStorage.getItem("emyBusinessDisplayName"), localStorage.getItem("emyBusinessName")].forEach((value) => {
            const key = feedCustomerBusinessKey(value);
            if (key) keys.add(key);
          });
          return keys;
        }
        function feedItemMatchesCurrentBusiness(item) {
          if (!item) return false;
          const currentNameKey = feedCustomerBusinessKey(feedCurrentBusinessName());
          if (!currentNameKey) return false;
          const keys = feedCurrentBusinessKeys();
          const generic = { "profile": true, "business-profile": true, "business": true, "your-business": true };
          return feedBusinessKeyCandidates(item).some((key) => !generic[key] && keys.has(key));
        }
        function feedCreatedItemBusinessOwned(item) {
          if (!item) return false;
          const owner = String(item.owner || item.repostedByType || item.actorType || item.createdAs || item.accountType || item.role || item.authorRole || "").trim().toLowerCase();
          const source = String(item.source || item.createdFrom || item.origin || "").trim().toLowerCase();
          const href = String(item.profileHref || item.href || "").trim().toLowerCase();
          const id = String(item.id || "").trim().toLowerCase();
          const explicitKey = feedCustomerBusinessKey(item.businessKey || item.key || item.ownerKey || item.profileKey || item.detailBusinessKey);
          const explicitBusinessContext = owner.indexOf("business") !== -1 || source.indexOf("business") !== -1 || href.indexOf("emy-business-profile") !== -1 || (!!explicitKey && explicitKey !== "customer-profile") || id.indexOf("business-") === 0;
          const businessSignal = owner.indexOf("business") !== -1 || source.indexOf("business") !== -1 || href.indexOf("emy-business-profile") !== -1;
          const customerSignal = owner.indexOf("customer") !== -1 || owner === "buyer" || source === "customer-profile" || source.indexOf("customer") !== -1 || explicitKey === "customer-profile" || href.indexOf("emy-customer-profile") !== -1 || id.indexOf("customer-") === 0 || (id.indexOf("user-feed-") === 0 && !explicitBusinessContext) || (id.indexOf("feed-create-") === 0 && !explicitBusinessContext);
          if (businessSignal || (!!explicitKey && explicitKey !== "customer-profile")) return true;
          if (feedItemMatchesCurrentBusiness(item)) return true;
          if (customerSignal) return false;
          return false;
        }
        function addCustomerBusinessKey(keys, value) {
          const key = feedCustomerBusinessKey(value);
          if (!key) return;
          keys.add(key);
          if (key === "angi-pizza-zone") keys.add("angi-pizza");
          if (key === "angi-pizza") keys.add("angi-pizza-zone");
          if (key === "ever-glow-face-wash") keys.add("ever-glow");
          if (key === "ever-glow") keys.add("ever-glow-face-wash");
        }
        function customerBusinessKeys() {
          const keys = new Set();
          readCustomerBusinesses().forEach((item) => {
            if (feedItemMatchesCurrentBusiness(item)) return;
            feedBusinessKeyCandidates(item).forEach((key) => addCustomerBusinessKey(keys, key));
          });
          try {
            for (let index = 0; index < localStorage.length; index += 1) {
              const storageKey = localStorage.key(index) || "";
              if (storageKey.indexOf("emyCustomerBusiness:") !== 0) continue;
              if (localStorage.getItem(storageKey) === "1") {
                const key = feedCustomerBusinessKey(storageKey.slice("emyCustomerBusiness:".length));
                if (feedCurrentBusinessKeys().has(key)) continue;
                addCustomerBusinessKey(keys, key);
              }
            }
          } catch (error) {}
          return keys;
        }
        function feedStoredCreatedAt(item) {
          const source = item && typeof item === "object" ? item : {};
          const values = [
            source.repostedAt,
            source.uploadedAt,
            source.uploadCompletedAt,
            source.publishedAt,
            source.postedAt,
            source.createdAt,
            source.updatedAt,
            source.modifiedAt,
            source.savedAt,
            source.addedAt,
            source.created,
            source.date
          ].map((value) => String(value || "").trim()).filter(Boolean);
          for (const value of values) {
            const parsed = Date.parse(value);
            if (Number.isFinite(parsed)) return value;
          }
          const timestampSources = [
            source.id,
            source.feedId,
            source.postId,
            source.productId,
            source.clipId,
            source.reelId,
            source.eventId,
            source.jobId,
            source.storageKey,
            source._sourceKey,
            source.sourceKey
          ].map((value) => String(value || "").trim()).filter(Boolean);
          for (const value of timestampSources) {
            const match = value.match(/(?:^|[^0-9])([1-9][0-9]{12})(?:[^0-9]|$)/);
            const stamp = match ? Number(match[1]) : 0;
            if (Number.isFinite(stamp) && stamp >= 1577836800000 && stamp <= 4102444800000) return new Date(stamp).toISOString();
          }
          return values[0] || "";
        }
        function feedTimeLooksFake(value) {
          return /^(now|just now|open now|post|product|clip|event|job|article|update|photo|video|carousel|offer|nearby|my business|my businesses|online and available|available|in stock)$/i.test(String(value || "").trim());
        }
        function feedRealTimeLabel(value, fallback) {
          const raw = String(value || "").trim();
          const fallbackText = String(fallback || "").trim();
          const date = raw ? new Date(raw) : null;
          if (!date || Number.isNaN(date.getTime())) return fallbackText && !feedTimeLooksFake(fallbackText) ? fallbackText : "Time saved";
          const now = new Date();
          const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
          const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
          const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
          if (startDate === startToday) return "Today at " + time;
          if (startDate === startToday - 86400000) return "Yesterday at " + time;
          const dateOptions = date.getFullYear() === now.getFullYear() ? { day: "numeric", month: "short" } : { day: "numeric", month: "short", year: "numeric" };
          return date.toLocaleDateString("en-GB", dateOptions) + " at " + time;
        }
        function feedItemTimeLabel(item, fallback) {
          const itemTime = item && item.time;
          return feedRealTimeLabel(feedStoredCreatedAt(item), feedTimeLooksFake(itemTime) ? fallback : itemTime || fallback);
        }
        function feedKnownProfileMedia(kind) {
          const suffix = kind === "ref" ? "Ref" : "";
          return [
            "emyCustomerProfilePhoto" + suffix,
            "emyCustomerProfilePhotoSrc" + suffix,
            "emyCustomerAvatar" + suffix,
            "emyCustomerPhoto" + suffix,
            "emyCustomerProfileImage" + suffix,
            "emyBusinessOwnerCustomerPhoto" + suffix,
            "emyBusinessProfilePhoto" + suffix,
            "emyBusinessProfileImage" + suffix,
            "emyBusinessPhoto" + suffix,
            "emyBusinessAvatar" + suffix,
            "emyBusinessLogo" + suffix,
            "emyMainPendingSignupPhoto" + suffix,
            "emyMainPendingSignupBusinessPhoto" + suffix
          ].map((key) => String(localStorage.getItem(key) || "").trim()).filter(Boolean);
        }
        function feedLooksStoredMediaRef(value) {
          const clean = String(value || "").trim();
          if (!clean) return false;
          if (/^(data:image\/|data:video\/|blob:|https?:\/\/|file:|\/|\.{1,2}\/|assets\/)/i.test(clean)) return false;
          return /^emy-media-|^business-|^customer-|^profile-|^media-/i.test(clean);
        }
        function feedContentMediaSrc(value) {
          const clean = String(value || "").trim();
          if (!clean || feedLooksStoredMediaRef(clean)) return "";
          return !feedKnownProfileMedia("src").includes(clean) ? clean : "";
        }
        function feedContentMediaRef(value) {
          const clean = String(value || "").trim();
          return clean && !feedKnownProfileMedia("ref").includes(clean) ? clean : "";
        }
        function feedCurrentCustomerAvatarSrc() {
          const activePhoto = typeof currentProfilePhoto === "string" ? currentProfilePhoto : "";
          const activeReaderPhoto = typeof activeProfileRole === "function" && activeProfileRole() === "customer" && typeof readActiveProfilePhoto === "function" ? readActiveProfilePhoto() : "";
          return activePhoto ||
            activeReaderPhoto ||
            localStorage.getItem("emyCustomerProfilePhoto") ||
            localStorage.getItem("emyCustomerProfilePhotoSrc") ||
            localStorage.getItem("emyCustomerProfileImage") ||
            localStorage.getItem("emyCustomerProfileImageSrc") ||
            localStorage.getItem("emyCustomerAvatar") ||
            localStorage.getItem("emyCustomerAvatarSrc") ||
            localStorage.getItem("emyCustomerPhoto") ||
            localStorage.getItem("emyCustomerPhotoSrc") ||
            customerPendingSignupPhoto() ||
            "";
        }
        function feedCurrentCustomerAvatarRef() {
          const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          const activePhotoRef = typeof currentProfilePhotoRef === "string" ? currentProfilePhotoRef : "";
          const activeReaderPhotoRef = typeof activeProfileRole === "function" && activeProfileRole() === "customer" && typeof readActiveProfilePhotoRef === "function" ? readActiveProfilePhotoRef() : "";
          return activePhotoRef ||
            activeReaderPhotoRef ||
            localStorage.getItem("emyCustomerProfilePhotoRef") ||
            localStorage.getItem("emyCustomerProfileImageRef") ||
            localStorage.getItem("emyCustomerAvatarRef") ||
            localStorage.getItem("emyCustomerPhotoRef") ||
            (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "") ||
            "";
        }
        function feedBusinessAvatarMediaForItem(item, kind) {
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
          ].map(feedCustomerBusinessKey).filter(Boolean);
          if (feedItemMatchesCurrentBusiness(item) || feedItemMatchesCurrentBusiness(original)) {
            const current = currentBusinessAvatarMediaForFeed();
            if (current.src || current.ref) return kind === "ref" ? current.ref : current.src;
          }
          const rows = readCustomerBusinesses();
          for (let index = 0; index < rows.length; index += 1) {
            const row = rows[index] || {};
            const rowKeys = [row.key, row.businessKey, row.profileKey, row.name, row.businessName, row.business, row.title].map(feedCustomerBusinessKey).filter(Boolean);
            const matches = rowKeys.some((rowKey) => keys.some((key) => key === rowKey || key.indexOf(rowKey) >= 0 || rowKey.indexOf(key) >= 0));
            if (!matches) continue;
            const media = kind === "ref"
              ? feedRepostBusinessOnlyMedia([row.avatarRef, row.profilePhotoRef, row.businessPhotoRef, row.businessAvatarRef, row.logoRef, row.photoRef, row.imageRef])
              : feedRepostBusinessOnlyMedia([row.avatarSrc, row.avatar, row.profilePhoto, row.profilePhotoSrc, row.businessPhoto, row.businessAvatar, row.logo, row.photo, row.image]);
            if (media) return media;
          }
          return "";
        }
        function feedCustomerAvatarSrc(item, own) {
          if (!own && (feedItemMatchesCurrentBusiness(item) || feedItemMatchesCurrentBusiness(item && item.original))) {
            const current = currentBusinessAvatarMediaForFeed();
            if (current.src || current.ref) return current.src;
          }
          const stored = String(item && (item.viewerPhoto || item.customerPhoto || item.actorPhoto || item.ownerPhoto || item.repostedByPhoto || item.avatarSrc || item.avatar || item.profilePhoto || item.photo) || "").trim();
          const registered = feedBusinessAvatarMediaForItem(item, "src");
          return own ? (feedCurrentCustomerAvatarSrc() || stored) : (registered || stored);
        }
        function feedCustomerAvatarRef(item, own) {
          if (!own && (feedItemMatchesCurrentBusiness(item) || feedItemMatchesCurrentBusiness(item && item.original))) {
            const current = currentBusinessAvatarMediaForFeed();
            if (current.src || current.ref) return current.ref;
          }
          const stored = String(item && (item.viewerPhotoRef || item.customerPhotoRef || item.actorPhotoRef || item.ownerPhotoRef || item.repostedByPhotoRef || item.avatarRef || item.profilePhotoRef || item.photoRef) || "").trim();
          const registered = feedBusinessAvatarMediaForItem(item, "ref");
          return own ? (feedCurrentCustomerAvatarRef() || stored) : (registered || stored);
        }
        function feedBusinessAvatarSrcForFeedItem(item, preferCurrent) {
          const current = currentBusinessAvatarMediaForFeed();
          const matchesCurrent = feedItemMatchesCurrentBusiness(item) || feedItemMatchesCurrentBusiness(item && item.original);
          if (matchesCurrent && (current.src || current.ref)) return current.src;
          const registered = feedBusinessAvatarMediaForItem(item, "src");
          if (registered) return registered;
          return feedRepostBusinessOnlyMedia([
            item && item.businessPhoto,
            item && item.businessPhotoSrc,
            item && item.businessAvatar,
            item && item.businessAvatarSrc,
            item && item.businessLogo,
            item && item.businessLogoSrc,
            item && item.avatarSrc,
            item && item.avatar,
            item && item.profilePhoto,
            item && item.profilePhotoSrc,
            item && item.photo
          ]);
        }
        function feedBusinessAvatarRefForFeedItem(item, preferCurrent) {
          const current = currentBusinessAvatarMediaForFeed();
          const matchesCurrent = feedItemMatchesCurrentBusiness(item) || feedItemMatchesCurrentBusiness(item && item.original);
          if (matchesCurrent && (current.src || current.ref)) return current.ref;
          const registered = feedBusinessAvatarMediaForItem(item, "ref");
          if (registered) return registered;
          return feedRepostBusinessOnlyMedia([
            item && item.businessPhotoRef,
            item && item.businessAvatarRef,
            item && item.businessLogoRef,
            item && item.avatarRef,
            item && item.profilePhotoRef,
            item && item.photoRef
          ]);
        }
        function feedPreviewIntro(value, details, fallback) {
          const intro = String(value || "").trim();
          if (intro) return intro;
          const text = String(details || "").trim();
          if (!text) return String(fallback || "").trim();
          if (text.length <= 180) return text;
          return text.slice(0, 177).replace(/\s+\S*$/, "").trim() + "...";
        }
        function feedDateValue(item) {
          const raw = feedStoredCreatedAt(item);
          const value = raw ? new Date(raw).getTime() : NaN;
          if (Number.isFinite(value)) return value;
          const label = String(item && item.time || "").trim();
          const today = label.match(/^Today at\s+(\d{1,2}):(\d{2})/i);
          const yesterday = label.match(/^Yesterday at\s+(\d{1,2}):(\d{2})/i);
          const now = new Date();
          if (today) return new Date(now.getFullYear(), now.getMonth(), now.getDate(), Number(today[1]), Number(today[2])).getTime();
          if (yesterday) return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, Number(yesterday[1]), Number(yesterday[2])).getTime();
          const dated = label.match(/^(\d{1,2})\s+([A-Za-z]{3,9})(?:\s+(\d{4}))?\s+at\s+(\d{1,2}):(\d{2})/i);
          if (dated) {
            const month = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"].indexOf(dated[2].slice(0, 3).toLowerCase());
            if (month >= 0) return new Date(Number(dated[3]) || now.getFullYear(), month, Number(dated[1]), Number(dated[4]), Number(dated[5])).getTime();
          }
          return 0;
        }
        function feedNewestItems(items) {
          return (Array.isArray(items) ? items : []).map((item, index) => ({
            item,
            index,
            value: feedDateValue(item)
          })).sort((a, b) => {
            if (b.value !== a.value) return b.value - a.value;
            return a.index - b.index;
          }).map((entry) => entry.item);
        }
        function mapFeedStoredItems(items, mapper) {
          const rows = [];
          if (!Array.isArray(items) || typeof mapper !== "function") return rows;
          items.forEach((item, index) => {
            try {
              if (!item || typeof item !== "object") return;
              if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(item)) return;
              const mapped = mapper(item, index);
              if (mapped) rows.push(mapped);
            } catch (error) {
              try { console.warn("Skipped a saved feed item that could not render.", error); } catch (logError) {}
            }
          });
          return rows;
        }
        function feedGenericPostCaption(value) {
          return /^(photo update|video update|carousel update|new update|new photo update|new video update|new carousel update|shared a photo update|shared a new video|shared new media|new customer update|new business update|your update|update)$/i.test(String(value || "").trim());
        }
        function feedPostKindLabel(item, type) {
          if (type === "clip") {
            const isProductClip = !!(item && (item.price || item.priceText || item.productTitle || item.productName || String(item.tag || "").toLowerCase().includes("product")));
            return isProductClip ? "Product Clip" : "Clip";
          }
          if (type === "product") return "Product";
          if (type === "offer") return "Offer";
          if (type === "event") return "Event";
          if (type === "article") return "Article";
          const mode = String(item && item.postMode || "").toLowerCase();
          const tag = String(item && item.tag || "").toLowerCase();
          const mediaType = String(item && item.mediaType || "").toLowerCase();
          if (mode === "carousel" || tag === "carousel") return "Carousel";
          if (mode === "video" || tag === "video" || mediaType === "video") return "Video";
          if (mode === "photo" || tag === "photo" || mediaType === "image") return "Image";
          if (mode === "question" || tag === "question") return "Question";
          return "Post";
        }
        function feedPostDetailKind(item, type) {
          return feedPostKindLabel(item, type);
        }
        function readCreatedFeedPosts() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyFeedCreatedPosts") || "[]");
            if (!Array.isArray(parsed)) return [];
            const subscribedBusinesses = customerBusinessKeys();
            return mapFeedStoredItems(parsed, (item, index) => {
              let mediaType = item.mediaType || "";
              let mediaRef = item.mediaRef || "";
              let mediaSrc = mediaRef && mediaType === "video" ? "" : (item.mediaSrc || "");
              const mediaItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(item) : [];
              if (mediaItems.length) {
                mediaType = mediaItems[0].type || mediaType;
                mediaRef = mediaItems[0].ref || mediaRef;
                mediaSrc = mediaItems[0].ref && mediaItems[0].type === "video" ? "" : (mediaItems[0].src || mediaSrc);
              }
              const storedKind = item.kind || item.type || "post";
              const storedKindKey = String(storedKind || "").trim().toLowerCase();
              const normalisedStoredKind = /^(photo|image|video|question|update|carousel)$/.test(storedKindKey) ? "post" : storedKind;
              const storedTag = String(item.tag || "").trim();
              const storedMode = String(item.postMode || "").trim().toLowerCase();
              const isMediaPost = storedMode === "photo" || storedMode === "video" || storedMode === "carousel" || /^(photo|video|carousel)$/i.test(storedTag);
              const businessKey = item.businessKey || item.key || "";
              const businessName = item.business || item.actor || item.name || currentCustomerName();
              const createTypeKey = String(item.createType || "").trim().toLowerCase();
              const clipMarker = String([item.clipKind, item.reelKind, item.clipType, item.reelType].filter(Boolean).join(" ")).toLowerCase();
              const ownerMarker = String([item.source, item.createdFrom, item.owner, item.createdAs, item.accountType, item.role, item.authorRole].filter(Boolean).join(" ")).toLowerCase();
              const isStoredClip = mediaType === "video" && (storedKindKey === "clip" || createTypeKey === "clip" || storedMode === "clip" || /clip/i.test(storedTag) || /business|product/.test(clipMarker));
              const isSavedVideoPost = mediaType === "video" && !isStoredClip && (storedMode === "video" || storedKindKey === "video" || storedTag.toLowerCase() === "video");
              const isBusinessStoredClip = isStoredClip && (feedCreatedItemBusinessOwned(item) || ownerMarker.indexOf("business") !== -1 || /business|product/.test(clipMarker) || (!!businessKey && businessKey !== "customer-profile"));
              const isBusinessOwnedPost = !isStoredClip && feedCreatedItemBusinessOwned(item);
              const isBusinessFeedItem = isBusinessStoredClip || isBusinessOwnedPost;
              const avatarSrc = isBusinessFeedItem ? feedBusinessAvatarSrcForFeedItem(item, true) : feedCustomerAvatarSrc(item, true);
              const avatarRef = isBusinessFeedItem ? feedBusinessAvatarRefForFeedItem(item, true) : feedCustomerAvatarRef(item, true);
              if (!isMediaPost && mediaType === "image") {
                if (mediaSrc && avatarSrc && mediaSrc === avatarSrc) mediaSrc = "";
                if (!mediaSrc && !mediaRef && (!item.image || item.image === avatarSrc)) mediaRef = "";
              }
              const isProductStoredClip = isStoredClip && feedLooksProductClip(item, [clipMarker, storedTag, storedKind, storedMode].join(" "));
              const businessFeedKey = businessKey || feedCustomerBusinessKey(businessName) || "business";
              const isCustomerBusiness = isBusinessFeedItem && subscribedBusinesses.has(feedCustomerBusinessKey(businessFeedKey || businessName));
              const hasRealMedia = !!(mediaSrc || mediaRef || mediaItems.length);
              const createdAt = feedStoredCreatedAt(item);
              let title = isProductStoredClip ? (item.productTitle || item.productName || item.title || "Product clip") : item.title || item.clipTitle || "";
              let text = isProductStoredClip ? (item.productDescription || item.productInfo || item.description || item.text || "Short product video from this business.") : isBusinessStoredClip ? (item.text || item.description || "Short business clip from this business.") : item.text || item.description || "";
              if (hasRealMedia && feedGenericPostCaption(title)) title = "";
              if (hasRealMedia && feedGenericPostCaption(text)) text = "";
              if (!title) title = hasRealMedia ? "" : "New post";
              if (!text) text = hasRealMedia ? "" : (isBusinessFeedItem ? "New business update." : "New customer update.");
              return {
                id: item.id || ("created-post-" + index),
                key: isBusinessFeedItem ? businessFeedKey : item.businessKey || "customer-profile",
                business: businessName,
                media: hasRealMedia ? (item.media || "feed") : "",
                avatarSrc,
                avatarRef,
                mediaSrc,
                mediaRef,
                mediaItems,
                mediaType,
                createdAt,
                postedAt: item.postedAt || createdAt,
                mediaSettings: item.mediaSettings || null,
                mediaOverlay: item.mediaOverlay || (item.mediaSettings && item.mediaSettings.overlay) || "",
                image: mediaType === "image" ? ((isMediaPost ? item.image : "") || mediaSrc || "") : "",
                video: mediaType === "video" ? (mediaRef ? "" : (item.video || mediaSrc || "")) : "",
                type: isStoredClip ? "clip" : (isMediaPost || isSavedVideoPost) ? "post" : normalisedStoredKind,
                my: isBusinessFeedItem ? isCustomerBusiness : true,
                isUserPost: isBusinessFeedItem ? false : true,
                owner: isBusinessFeedItem ? "business" : item.owner,
                actorType: isBusinessFeedItem ? "business" : item.actorType,
                source: isBusinessFeedItem ? (isCustomerBusiness ? "My Business" : "Nearby") : item.source,
                tag: isStoredClip ? (isProductStoredClip ? "Product Clip" : "Clip") : isSavedVideoPost ? "Video" : item.tag || (mediaType === "video" ? "Video" : mediaType === "image" ? "Photo" : "Post"),
                postMode: isStoredClip ? "clip" : isSavedVideoPost ? "video" : item.postMode || "",
                time: feedItemTimeLabel(item, "Time saved"),
                title,
                articleBody: item.articleBody || "",
                shareText: item.shareText || "",
                readTime: item.readTime || "",
                text,
                description: text,
                stats: item.stats || (isBusinessStoredClip ? item.viewsText || "0 views" : "0 likes"),
                price: item.price || item.priceText || "",
                priceText: item.priceText || item.price || "",
                productName: item.productName || "",
                productTitle: item.productTitle || item.productName || "",
                productDescription: item.productDescription || item.productInfo || "",
                productInfo: item.productInfo || item.productDescription || "",
                clipKind: item.clipKind || item.reelKind || item.clipType || (isProductStoredClip ? "product" : isStoredClip ? "business" : ""),
                reelKind: item.reelKind || item.clipKind || item.clipType || (isProductStoredClip ? "product" : isStoredClip ? "business" : ""),
                clipType: item.clipType || item.reelKind || item.clipKind || (isProductStoredClip ? "product" : isStoredClip ? "business" : ""),
                duration: item.duration || item.timeLeft || "",
                viewsText: item.viewsText || "",
                profileHref: item.profileHref || (isBusinessFeedItem ? "emy-business-profile.html?business=" + encodeURIComponent(businessFeedKey || businessName || "business") : "emy-customer-profile.html"),
                comments: item.comments || []
              };
            });
          } catch (error) {
            return [];
          }
        }
        function readCreatedFeedJobs() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyFeedCreatedJobs") || "[]");
            if (!Array.isArray(parsed)) return [];
            return mapFeedStoredItems(parsed, (item, index) => {
              const createdAt = feedStoredCreatedAt(item);
              const coverSrc = item.coverSrc || item.jobCoverSrc || item.mediaSrc || item.image || item.video || "";
              const coverRef = item.coverRef || item.jobCoverRef || item.mediaRef || "";
              const coverType = item.coverType || item.jobCoverType || item.mediaType || (item.video ? "video" : (coverSrc || coverRef ? "image" : ""));
              const isBusinessItem = feedCreatedItemBusinessOwned(item);
              const business = item.business || item.actor || currentCustomerName();
              const businessKey = item.businessKey || item.key || (isBusinessItem ? feedCustomerBusinessKey(business) : "") || "customer-profile";
              const isCustomerBusiness = isBusinessItem && customerBusinessKeys().has(feedCustomerBusinessKey(businessKey || business));
              return {
                id: item.id || ("created-job-" + index),
                key: isBusinessItem ? businessKey : item.businessKey || "customer-profile",
                business,
                media: coverSrc || coverRef ? (item.media || "feed") : "",
                avatarSrc: isBusinessItem ? feedBusinessAvatarSrcForFeedItem(item, true) : feedCustomerAvatarSrc(item, true),
                avatarRef: isBusinessItem ? feedBusinessAvatarRefForFeedItem(item, true) : feedCustomerAvatarRef(item, true),
                mediaSrc: coverRef ? "" : coverSrc,
                mediaRef: coverRef,
                mediaType: coverType,
                coverSrc: coverRef ? "" : coverSrc,
                jobCoverSrc: coverRef ? "" : coverSrc,
                coverRef,
                jobCoverRef: coverRef,
                coverType,
                jobCoverType: coverType,
                coverSettings: item.coverSettings || item.mediaSettings || null,
                mediaSettings: item.mediaSettings || item.coverSettings || null,
                createdAt,
                postedAt: item.postedAt || createdAt,
                type: "job",
                my: isBusinessItem ? isCustomerBusiness : true,
                isUserPost: isBusinessItem ? false : true,
                owner: isBusinessItem ? "business" : item.owner,
                actorType: isBusinessItem ? "business" : item.actorType,
                createdAs: isBusinessItem ? "business" : item.createdAs,
                source: isBusinessItem ? (isCustomerBusiness ? "My Business" : "Nearby") : item.source,
                tag: "Job",
                time: feedItemTimeLabel(item, "Time saved"),
                title: item.jobTitle || item.title || "Help wanted",
                text: item.text || item.description || "This business is hiring.",
                feedIntro: item.feedIntro || item.intro || item.summary || item.shareText || "",
                jobTitle: item.jobTitle || item.title || "Help wanted",
                jobLocation: item.jobLocation || item.location || "Location to confirm",
                workplace: item.workplace || "On-site",
                employment: item.employment || "Flexible",
                experience: item.experience || "Open to applicants",
                apply: item.apply || "Message this business on EMY",
                notes: item.notes || "",
                applicants: Number(item.applicants) || 0,
                stats: item.stats || ((Number(item.applicants) || 0) + " applicants"),
                price: "",
                profileHref: item.profileHref || (isBusinessItem ? "emy-business-profile.html?business=" + encodeURIComponent(businessKey || business || "business") : "emy-customer-profile.html"),
                comments: item.comments || []
              };
            });
          } catch (error) {
            return [];
          }
        }
        function readCreatedFeedEvents() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyFeedCreatedEvents") || "[]");
            if (!Array.isArray(parsed)) return [];
            return mapFeedStoredItems(parsed, (item, index) => {
              const createdAt = feedStoredCreatedAt(item);
              const isBusinessItem = feedCreatedItemBusinessOwned(item);
              const business = item.business || item.actor || currentCustomerName();
              const businessKey = item.businessKey || item.key || (isBusinessItem ? feedCustomerBusinessKey(business) : "") || "customer-profile";
              const isCustomerBusiness = isBusinessItem && customerBusinessKeys().has(feedCustomerBusinessKey(businessKey || business));
              return {
                id: item.id || ("created-event-" + index),
                key: isBusinessItem ? businessKey : item.businessKey || "customer-profile",
                business,
                media: (item.coverSrc || item.eventCoverSrc || item.coverRef || item.eventCoverRef) ? "feed" : "",
                avatarSrc: isBusinessItem ? feedBusinessAvatarSrcForFeedItem(item, true) : feedCustomerAvatarSrc(item, true),
                avatarRef: isBusinessItem ? feedBusinessAvatarRefForFeedItem(item, true) : feedCustomerAvatarRef(item, true),
                createdAt,
                postedAt: item.postedAt || createdAt,
                type: "event",
                my: isBusinessItem ? isCustomerBusiness : true,
                isUserPost: isBusinessItem ? false : true,
                owner: isBusinessItem ? "business" : item.owner,
                actorType: isBusinessItem ? "business" : item.actorType,
                createdAs: isBusinessItem ? "business" : item.createdAs,
                source: isBusinessItem ? (isCustomerBusiness ? "My Business" : "Nearby") : item.source,
                tag: "Event",
                time: feedItemTimeLabel(item, "Time saved"),
                title: item.title || "New event",
                text: item.text || item.description || "Event details will be shared soon.",
                feedIntro: item.feedIntro || item.intro || item.summary || item.shareText || "",
                eventType: item.eventType || item.tag || "Event",
                eventWhen: item.eventWhen || "Date to confirm",
                eventWhere: item.eventWhere || "Place to confirm",
                eventDate: item.eventDate || "",
                eventTime: item.eventTime || "",
                coverSrc: item.coverSrc || item.eventCoverSrc || "",
                eventCoverSrc: item.eventCoverSrc || item.coverSrc || "",
                coverRef: item.coverRef || item.eventCoverRef || "",
                eventCoverRef: item.eventCoverRef || item.coverRef || "",
                coverSettings: item.coverSettings || item.eventCoverSettings || item.mediaSettings || null,
                eventCoverSettings: item.eventCoverSettings || item.coverSettings || item.mediaSettings || null,
                stats: item.stats || "0 likes",
                price: "",
                profileHref: item.profileHref || (isBusinessItem ? "emy-business-profile.html?business=" + encodeURIComponent(businessKey || business || "business") : "emy-customer-profile.html"),
                comments: item.comments || []
              };
            });
          } catch (error) {
            return [];
          }
        }
        function readRepostedFeedItems() {
          return readFeedReposts().map((record, index) => {
            const storedOriginal = record && record.original && typeof record.original === "object" ? record.original : null;
            const flatKind = String(record && (record.kind || record.originalKind || "") || "").trim();
            const original = storedOriginal || {
              id: record && (record.originalId || record.originalFeedId || record.feedId || ""),
              key: record && (record.originalKey || record.businessKey || ""),
              businessKey: record && (record.originalKey || record.businessKey || ""),
              business: record && (record.originalBusiness || record.businessName || record.business || record.detailBusiness) || "Business",
              kind: flatKind && flatKind.toLowerCase() !== "repost" ? flatKind : "Post",
              title: record && (record.originalTitle || record.title || record.detailTitle) || "Feed update",
              text: record && (record.originalText || record.text || record.description || record.detailDescription) || "",
              media: record && (record.media || record.detailMedia) || "feed",
              mediaSrc: record && (record.mediaSrc || record.detailMediaSrc) || "",
              mediaRef: record && (record.mediaRef || record.detailMediaRef) || "",
              mediaType: record && (record.mediaType || record.detailMediaType) || "",
              posterSrc: record && (record.posterSrc || record.detailPosterSrc) || "",
              posterRef: record && (record.posterRef || record.detailPosterRef) || "",
              avatarSrc: record && (record.originalAvatarSrc || record.detailAvatarSrc || record.businessPhoto || record.profilePhoto) || "",
              avatarRef: record && (record.originalAvatarRef || record.detailAvatarRef || record.businessPhotoRef || record.profilePhotoRef) || "",
              profilePhoto: record && (record.originalAvatarSrc || record.detailAvatarSrc || record.businessPhoto || record.profilePhoto) || "",
              profilePhotoRef: record && (record.originalAvatarRef || record.detailAvatarRef || record.businessPhotoRef || record.profilePhotoRef) || "",
              businessPhoto: record && (record.originalAvatarSrc || record.detailAvatarSrc || record.businessPhoto || record.profilePhoto) || "",
              businessPhotoRef: record && (record.originalAvatarRef || record.detailAvatarRef || record.businessPhotoRef || record.profilePhotoRef) || "",
              duration: record && (record.duration || record.detailDuration) || "",
              articleBody: record && (record.articleBody || record.detailArticleBody) || "",
              articleShare: record && (record.articleShare || record.detailArticleShare) || "",
              articleReadTime: record && (record.articleReadTime || record.detailArticleReadTime) || "",
              price: record && (record.originalPrice || record.price || record.detailPrice) || "",
              meta: record && (record.originalMeta || record.meta || record.detailMeta) || ""
            };
            const typeName = String(original.kind || "Post").toLowerCase();
            const actor = feedRepostActor(record);
            const actorOwned = actor.type === "customer";
            return {
              id: record.id || ("repost-" + index),
              key: actor.key,
              business: actor.name,
              media: original.media || "feed",
              mediaSrc: original.mediaSrc || "",
              mediaRef: original.mediaRef || "",
              mediaType: original.mediaType || "",
              type: "repost",
              my: actorOwned,
              isUserPost: actorOwned,
              tag: "Repost",
              createdAt: record.repostedAt || record.createdAt || "",
              time: feedRealTimeLabel(record.repostedAt || record.createdAt, "Time saved"),
              title: (record.repostThought || record.thought) || ("Reposted " + (original.title || "feed update")),
              text: record.repostThought || record.thought || "",
              stats: "0 likes",
              profileHref: actor.href,
              repostedBy: actor.name,
              repostedByType: actor.type,
              actorType: actor.type,
              owner: actor.type,
              repostedByKey: actor.key,
              repostedByHref: actor.href,
              repostedByPhoto: actor.photo,
              repostedByPhotoRef: actor.photoRef,
              repostedByAvatar: actor.photo,
              avatarSrc: actor.photo,
              avatarRef: actor.photoRef,
              repostThought: record.repostThought || record.thought || "",
              original,
              originalType: typeName,
              comments: []
            };
          });
        }
        function feedBusinessProductIsPublished(item) {
          if (item && (item.isPaused === true || item.paused === true || item.isPublished === false || item.isLive === false || item.hidden === true || item.deleted === true || item.deletedAt)) return false;
          const status = String(item && (item.publishStatus || item.liveStatus || item.visibility || item.status || item.productStatus) || "active").trim().toLowerCase();
          return ["paused", "pause", "unpublished", "hidden", "draft", "inactive", "offline", "deleted", "archived"].indexOf(status) < 0;
        }
        function readBusinessProductFeedItems() {
          const keys = ["emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts"];
          const subscribed = customerBusinessKeys();
          const seen = new Set();
          const products = [];
          keys.forEach((key) => {
            let parsed = [];
            try {
              const value = JSON.parse(localStorage.getItem(key) || "[]");
              parsed = Array.isArray(value) ? value : (value && typeof value === "object" ? Object.values(value) : []);
            } catch (error) {
              parsed = [];
            }
            mapFeedStoredItems(parsed, (item, index) => {
              if (!item || typeof item !== "object" || !feedBusinessProductIsPublished(item)) return;
              const id = String(item.id || item.productId || key + "-" + index);
              if (!id || seen.has(id)) return;
              seen.add(id);
              const mediaItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(item) : [];
              const firstMedia = mediaItems[0] || null;
              const mediaType = firstMedia ? (firstMedia.type || "image") : (item.mediaType || (item.video ? "video" : (item.mediaSrc || item.image || item.mediaRef || item.imageRef ? "image" : "")));
              const mediaRef = firstMedia ? (firstMedia.ref || "") : (item.mediaRef || item.imageRef || item.videoRef || "");
              const mediaSrc = mediaRef ? "" : feedContentMediaSrc(firstMedia ? (firstMedia.src || "") : (mediaType === "video" ? (item.video || item.mediaSrc || "") : (item.image || item.mediaSrc || "")));
              const createdAt = feedStoredCreatedAt(item);
              const business = item.businessName || item.business || item.actor || "Business";
              const businessKey = item.businessKey || item.key || String(business).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "business";
              const isCustomerBusiness = subscribed.has(feedCustomerBusinessKey(businessKey));
              const likes = Number(item.likes) || feedStatNumber(item, "like") || 0;
              const saved = Number(item.saved) || feedStatNumber(item, "saved") || 0;
              products.push({
                id,
                key: businessKey,
                business,
                avatarSrc: feedBusinessAvatarSrcForFeedItem(item, true),
                avatarRef: feedBusinessAvatarRefForFeedItem(item, true),
                type: "product",
                my: isCustomerBusiness,
                tag: item.tag || "Product",
                time: feedItemTimeLabel(item, "Saved"),
                createdAt,
                postedAt: item.postedAt || createdAt,
                title: item.title || item.name || item.productName || item.itemTitle || "Product",
                text: item.description || item.text || item.productInfo || "Product available locally.",
                description: item.description || item.text || item.productInfo || "Product available locally.",
                price: item.priceText || item.price || item.amount || "",
                priceText: item.priceText || item.price || item.amount || "",
                category: item.category || item.productCategory || item.productType || "",
                availability: feedProductAvailability(item),
                media: mediaSrc || mediaRef || mediaItems.length ? (item.media || "feed") : (item.media || "shop"),
                mediaSrc,
                mediaRef,
                mediaType: mediaType === "video" ? "video" : (mediaSrc || mediaRef || mediaItems.length ? "image" : ""),
                mediaItems,
                mediaSettings: item.mediaSettings || null,
                mediaOverlay: item.mediaOverlay || (item.mediaSettings && item.mediaSettings.overlay) || "",
                image: mediaType === "image" ? mediaSrc : "",
                video: mediaType === "video" ? mediaSrc : "",
                stats: item.stats || (likes + " likes - " + saved + " saved"),
                profileHref: item.profileHref || "emy-business-profile.html?business=" + encodeURIComponent(businessKey),
                comments: item.comments || []
              });
            });
          });
          return feedNewestItems(products);
        }
        function readBusinessClipFeedItems() {
          const subscribed = customerBusinessKeys();
          const clips = [];
          const seen = new Set();
          ["emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels"].forEach((storageKey) => {
            try {
              const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
              if (!Array.isArray(parsed)) return;
            mapFeedStoredItems(parsed, (item, index) => {
                const mediaItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(item) : [];
                const firstMedia = mediaItems[0] || null;
                const mediaType = firstMedia ? (firstMedia.type || "video") : (item.mediaType || (item.video || item.mediaRef ? "video" : item.image || item.imageRef ? "image" : ""));
                const mediaRef = firstMedia ? (firstMedia.ref || "") : (item.mediaRef || item.videoRef || item.imageRef || "");
                const mediaSrc = mediaRef ? "" : feedContentMediaSrc(firstMedia ? (firstMedia.src || "") : (mediaType === "video" ? (item.video || item.mediaSrc || "") : (item.image || item.mediaSrc || "")));
                const id = item.id || item.clipId || item.reelId || (storageKey + "-" + index);
                if (seen.has(id)) return;
                seen.add(id);
                const createdAt = feedStoredCreatedAt(item);
                const business = item.businessName || item.business || item.actor || item.name || "Business";
                const businessKey = item.businessKey || item.key || feedCustomerBusinessKey(business) || "business";
                const isCustomerBusiness = subscribed.has(feedCustomerBusinessKey(businessKey));
                const clipMarker = String([item.clipKind, item.reelKind, item.clipType, item.reelType, item.tag, storageKey].filter(Boolean).join(" ")).toLowerCase();
                const productClip = feedLooksProductClip(item, clipMarker);
                const title = productClip ? (item.productTitle || item.productName || item.clipTitle || item.title || "Product clip") : (item.clipTitle || item.title || "Business clip");
                const description = productClip ? (item.productDescription || item.productInfo || item.description || item.text || "Short product video from this business.") : (item.description || item.text || "Short business clip from this business.");
                clips.push({
                  id,
                  key: businessKey,
                  business,
                  avatarSrc: feedBusinessAvatarSrcForFeedItem(item, true),
                  avatarRef: feedBusinessAvatarRefForFeedItem(item, true),
                  type: "clip",
                  my: isCustomerBusiness,
                  isUserPost: false,
                  source: isCustomerBusiness ? "My Business" : "Nearby",
                  tag: productClip ? "Product Clip" : "Clip",
                  postMode: "clip",
                  time: feedItemTimeLabel(item, "Time saved"),
                  createdAt,
                  postedAt: item.postedAt || createdAt,
                  title,
                  text: description,
                  description,
                  price: item.priceText || item.price || "",
                  priceText: item.priceText || item.price || "",
                  productName: item.productName || item.productTitle || (productClip ? title : ""),
                  productTitle: item.productTitle || item.productName || (productClip ? title : ""),
                  productDescription: item.productDescription || item.productInfo || "",
                  productInfo: item.productInfo || item.productDescription || "",
                  clipKind: productClip ? "product" : "business",
                  reelKind: productClip ? "product" : "business",
                  clipType: productClip ? "product" : "business",
                  media: mediaSrc || mediaRef || mediaItems.length ? (item.media || "feed") : "",
                  mediaSrc,
                  mediaRef,
                  mediaType: mediaType === "image" ? "image" : mediaType === "video" || mediaSrc || mediaRef ? "video" : "",
                  mediaItems,
                  mediaSettings: item.mediaSettings || null,
                  mediaOverlay: item.mediaOverlay || (item.mediaSettings && item.mediaSettings.overlay) || "",
                  image: mediaType === "image" ? mediaSrc : "",
                  video: mediaType === "video" ? mediaSrc : "",
                  posterSrc: item.posterSrc || item.thumbnailSrc || "",
                  posterRef: item.posterRef || item.thumbnailRef || "",
                  thumbnailSrc: item.thumbnailSrc || item.posterSrc || "",
                  thumbnailRef: item.thumbnailRef || item.posterRef || "",
                  stats: item.stats || item.viewsText || "0 views",
                  duration: item.duration || item.timeLeft || "",
                  viewsText: item.viewsText || "",
                  profileHref: item.profileHref || "emy-business-profile.html?business=" + encodeURIComponent(businessKey),
                  comments: item.comments || []
                });
              });
            } catch (error) {}
          });
          return feedNewestItems(clips);
        }
        function feedBusinessContentIsPublished(item) {
          if (item && (item.isPaused === true || item.paused === true || item.isPublished === false || item.isLive === false || item.hidden === true || item.deleted === true || item.deletedAt)) return false;
          const status = String(item && (item.publishStatus || item.liveStatus || item.visibility || item.status || item.reviewStatus) || "active").trim().toLowerCase();
          return ["paused", "pause", "unpublished", "hidden", "draft", "inactive", "offline", "deleted", "archived", "rejected"].indexOf(status) < 0;
        }
        function readBusinessPostFeedItems() {
          const defs = [
            ["emyBusinessPosts", "post"],
            ["emyBusinessFeedPosts", "post"],
            ["emyBusinessArticles", "article"],
            ["emyBusinessArticlePosts", "article"],
            ["emyBusinessEvents", "event"],
            ["emyBusinessEventPosts", "event"],
            ["emyBusinessJobs", "job"],
            ["emyBusinessJobPosts", "job"]
          ];
          const subscribed = customerBusinessKeys();
          const seen = new Set();
          const rows = [];
          defs.forEach(([storageKey, fallbackType]) => {
            let parsed = [];
            try {
              const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
              parsed = Array.isArray(value) ? value : (value && typeof value === "object" ? Object.values(value) : []);
            } catch (error) {
              parsed = [];
            }
            mapFeedStoredItems(parsed, (item, index) => {
              if (!item || typeof item !== "object" || !feedBusinessContentIsPublished(item)) return;
              const marker = String([item.type, item.kind, item.tag, item.postMode, item.createType, item.category, storageKey].filter(Boolean).join(" ")).toLowerCase();
              if (/clip|reel|product/.test(marker) || item.productName || item.productTitle || item.price || item.priceText) return;
              const type = /job|hiring/.test(marker) ? "job" : /event/.test(marker) ? "event" : /article/.test(marker) || item.articleBody || item.articleShare ? "article" : fallbackType;
              const business = item.businessName || item.business || item.actor || item.ownerName || item.storeName || feedCurrentBusinessName() || "Business";
              const businessKey = item.businessKey || item.key || feedCustomerBusinessKey(business) || "business";
              const id = String(item.id || item.postId || item.articleId || item.eventId || item.jobId || [storageKey, businessKey, item.title || item.name || index].join(":"));
              if (!id || seen.has(id)) return;
              seen.add(id);
              const mediaItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(item) : [];
              const firstMedia = mediaItems[0] || null;
              const coverRef = feedContentMediaRef(item.coverRef || item.eventCoverRef || item.jobCoverRef || item.mediaRef || "");
              const coverSrc = coverRef ? "" : feedContentMediaSrc(item.coverSrc || item.eventCoverSrc || item.jobCoverSrc || "");
              const mediaRef = firstMedia ? feedContentMediaRef(firstMedia.ref || "") : (type === "event" || type === "job" ? coverRef : feedContentMediaRef(item.mediaRef || item.imageRef || item.videoRef || coverRef));
              const mediaSrc = mediaRef ? "" : feedContentMediaSrc(firstMedia ? (firstMedia.src || "") : (type === "event" || type === "job" ? coverSrc : (item.mediaSrc || item.image || item.video || coverSrc)));
              const mediaTypeRaw = firstMedia ? (firstMedia.type || "") : (item.mediaType || item.coverType || item.eventCoverType || item.jobCoverType || (item.video ? "video" : (mediaSrc || mediaRef ? "image" : "")));
              const mediaType = mediaTypeRaw === "video" ? "video" : (mediaSrc || mediaRef || mediaItems.length ? "image" : "");
              const createdAt = feedStoredCreatedAt(item);
              const isCustomerBusiness = subscribed.has(feedCustomerBusinessKey(businessKey || business));
              const title = type === "job"
                ? (item.jobTitle || item.title || "Help wanted")
                : type === "event"
                  ? (item.title || item.eventName || "Business event")
                  : type === "article"
                    ? (item.title || item.heading || "Business article")
                    : (item.title || item.name || item.text || "Business update");
              const description = type === "job"
                ? (item.feedIntro || item.description || item.text || "This business is hiring.")
                : type === "event"
                  ? (item.feedIntro || item.description || item.text || "Event details will be shared soon.")
                  : type === "article"
                    ? (item.shareText || item.description || item.text || "Article details will appear here.")
                    : (item.description || item.text || item.shareText || "Business update.");
              rows.push({
                id,
                key: businessKey,
                businessKey,
                business,
                avatarSrc: feedBusinessAvatarSrcForFeedItem(item, true),
                avatarRef: feedBusinessAvatarRefForFeedItem(item, true),
                type,
                my: isCustomerBusiness,
                isUserPost: false,
                owner: "business",
                actorType: "business",
                source: isCustomerBusiness ? "My Business" : "Nearby",
                tag: type === "job" ? "Job" : type === "event" ? (item.eventType || "Event") : type === "article" ? "Article" : (item.tag || "Post"),
                postMode: type,
                time: feedItemTimeLabel(item, "Time saved"),
                createdAt,
                postedAt: item.postedAt || createdAt,
                title,
                text: item.text || description,
                description,
                feedIntro: item.feedIntro || item.intro || item.summary || item.shareText || "",
                articleBody: item.articleBody || item.text || description,
                shareText: item.shareText || description,
                readTime: item.readTime || "",
                eventType: type === "event" ? (item.eventType || "Event") : (item.eventType || ""),
                eventWhen: type === "event" ? (item.eventWhen || item.when || "Date to confirm") : (item.eventWhen || ""),
                eventWhere: type === "event" ? (item.eventWhere || item.where || item.location || "Place to confirm") : (item.eventWhere || ""),
                eventDate: item.eventDate || "",
                eventTime: item.eventTime || "",
                jobTitle: type === "job" ? (item.jobTitle || item.title || "") : (item.jobTitle || ""),
                jobLocation: type === "job" ? (item.jobLocation || item.location || "Location to confirm") : (item.jobLocation || ""),
                workplace: type === "job" ? (item.workplace || "On-site") : (item.workplace || ""),
                employment: type === "job" ? (item.employment || "Flexible") : (item.employment || ""),
                experience: type === "job" ? (item.experience || "Open to applicants") : (item.experience || ""),
                apply: type === "job" ? (item.apply || "Message this business on EMY") : (item.apply || ""),
                notes: type === "job" ? (item.notes || "Details in the post") : (item.notes || ""),
                applicants: Number(item.applicants) || 0,
                media: mediaSrc || mediaRef || mediaItems.length ? (item.media || "feed") : "",
                mediaSrc,
                mediaRef,
                mediaType,
                mediaItems,
                mediaSettings: item.mediaSettings || item.coverSettings || item.eventCoverSettings || item.jobCoverSettings || null,
                mediaOverlay: item.mediaOverlay || (item.mediaSettings && item.mediaSettings.overlay) || "",
                coverSrc,
                eventCoverSrc: item.eventCoverSrc || coverSrc,
                jobCoverSrc: item.jobCoverSrc || coverSrc,
                coverRef,
                eventCoverRef: item.eventCoverRef || coverRef,
                jobCoverRef: item.jobCoverRef || coverRef,
                coverType: mediaType,
                eventCoverType: mediaType,
                jobCoverType: mediaType,
                stats: item.stats || (type === "job" ? ((Number(item.applicants) || 0) + " applicants") : "0 likes"),
                profileHref: item.profileHref || "emy-business-profile.html?business=" + encodeURIComponent(businessKey),
                comments: item.comments || []
              });
            });
          });
          return feedNewestItems(rows);
        }
        function feedUpdateIdentityKeys(item, index) {
          const type = String(item && item.type || "feed").trim().toLowerCase();
          const business = feedCustomerBusinessKey(item && (item.businessKey || item.key || item.business || item.name) || "");
          const title = feedCustomerBusinessKey(item && (item.title || item.productTitle || item.productName || item.name) || "");
          const text = feedCustomerBusinessKey(item && (item.text || item.description || item.caption || item.shareText || "") || "");
          const mediaItems = Array.isArray(item && item.mediaItems) ? item.mediaItems : [];
          const firstMedia = mediaItems.find((media) => media && (media.ref || media.src || media.mediaRef || media.mediaSrc)) || {};
          const mediaKey = String(item && (item.mediaRef || item.mediaSrc || item.videoRef || item.video || item.imageRef || item.image || item.coverRef || item.coverSrc) || firstMedia.ref || firstMedia.src || firstMedia.mediaRef || firstMedia.mediaSrc || "").trim();
          const id = String(item && (item.id || item.feedId || item.postId || item.articleId || item.eventId || item.jobId || item.originalFeedId) || "").trim();
          const time = String(item && (item.createdAt || item.postedAt || item.publishedAt || item.time) || "").trim();
          const keys = [];
          if (id) keys.push(type + ":id:" + id);
          if (business && title && mediaKey) keys.push(type + ":copy:" + business + ":" + title + ":" + mediaKey);
          if (business && title && text) keys.push(type + ":text:" + business + ":" + title + ":" + text + ":" + time);
          if (!keys.length) keys.push(type + ":fallback:" + [business, title, index].join(":"));
          return keys.map((key) => String(key || "").toLowerCase()).filter(Boolean);
        }
        function customerFeedUpdates() {
          const subscribed = customerBusinessKeys();
          const existing = new Set(updates.map((item) => item.key + ":" + item.type));
          const marked = updates.map((item) => Object.assign({}, item, { my: subscribed.has(feedCustomerBusinessKey(item.key)) }));
          const added = readCustomerBusinesses().filter((item) => !existing.has(item.key + ":business")).map((item) => ({
            key: item.key,
            business: item.name,
            media: item.media || (item.key && item.key.includes("pizza") ? "pizza" : item.key && item.key.includes("glow") ? "shop" : item.key && item.key.includes("ross") ? "feed" : "profile-video"),
            type: "business",
            my: true,
            tag: "New business",
            time: "Now",
            title: item.name,
            text: item.description || "You will now receive this business's posts, products, clips, offers, and updates.",
            address: item.address || item.location || "Nearby business",
            category: item.category || "Retail",
            insight: item.insight || "Insights",
            hours: item.hours || "Every day - 9:00 AM - 5:00 PM",
            status: item.status || "Online and available",
            stats: "0 likes",
            duration: item.duration || "0:11",
            customer: true,
            price: "",
            id: "customer-business-feed-" + item.key
          }));
          const seen = new Set();
          const merged = feedNewestItems(readRepostedFeedItems().concat(readCreatedFeedPosts(), readCreatedFeedJobs(), readCreatedFeedEvents(), readBusinessProductFeedItems(), readBusinessClipFeedItems(), readBusinessPostFeedItems(), added)).concat(marked);
          const unique = merged.filter((item, index) => {
            if (window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(item)) return false;
            const ids = feedUpdateIdentityKeys(item, index);
            if (ids.some((id) => seen.has(id))) return false;
            ids.forEach((id) => seen.add(id));
            return true;
          });
          return feedNewestItems(unique);
        }
        function readInitialFeedFilter() {
          return "all";
        }
        function syncFeedFilterUrl(filter) {
          const clean = normaliseFeedFilter(filter);
          const next = new URL(window.location.href);
          if (clean === "all") {
            next.searchParams.delete("filter");
          } else {
            next.searchParams.set("filter", clean);
          }
          next.hash = "";
          history.replaceState(null, "", next.pathname + next.search + next.hash);
        }
        function isCustomerOwnedFeedUpdate(item) {
          if (!item) return false;
          if (item.customer === true) return true;
          const key = String(item.key || item.businessKey || "").trim().toLowerCase();
          const href = String(item.profileHref || "").trim().toLowerCase();
          const owner = String(item.owner || item.actorType || item.createdAs || item.accountType || "").trim().toLowerCase();
          const actor = String(item.business || item.actor || item.name || "").trim().toLowerCase();
          const current = String(currentCustomerName() || "").trim().toLowerCase();
          return key === "customer-profile" || href.indexOf("emy-customer-profile") >= 0 || owner === "customer" || String(item.id || "").indexOf("user-feed-") === 0 || String(item.id || "").indexOf("feed-create-") === 0 || (!!current && actor === current);
        }
        function isIndividualFeedUpdate(item) {
          return isCustomerOwnedFeedUpdate(item);
        }
        function feedAskLocationRadiusMiles() {
          try {
            const stored = JSON.parse(localStorage.getItem("emyAskLocation") || "{}");
            const radius = Number(stored && stored.radius);
            return Number.isFinite(radius) ? Math.min(10, Math.max(1, Math.round(radius))) : 5;
          } catch (error) {
            return 5;
          }
        }
        function feedActiveLocationState() {
          try {
            const ask = JSON.parse(localStorage.getItem("emyAskLocation") || "{}");
            const latitude = Number(ask && ask.latitude);
            const longitude = Number(ask && ask.longitude);
            const radius = feedAskLocationRadiusMiles();
            const active = Number.isFinite(latitude) && Number.isFinite(longitude) && (Math.abs(latitude) > 0.0001 || Math.abs(longitude) > 0.0001);
            const label = String((ask && (ask.location || ask.locationLabel)) || localStorage.getItem("emySelectedLocation") || "").replace(/\s+/g, " ").trim();
            const strict = active || (!!label && !/^near\s*me$/i.test(label));
            return active ? { active: true, strict: true, latitude, longitude, radius } : { active: false, strict, latitude: null, longitude: null, radius };
          } catch (error) {
            return { active: false, strict: false, latitude: null, longitude: null, radius: feedAskLocationRadiusMiles() };
          }
        }
        function feedMilesBetween(lat1, lon1, lat2, lon2) {
          const radiusMiles = 3958.8;
          const toRadians = (value) => value * Math.PI / 180;
          const dLat = toRadians(lat2 - lat1);
          const dLon = toRadians(lon2 - lon1);
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          return radiusMiles * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
        }
        function feedItemLocationPoint(item) {
          if (!item || typeof item !== "object") return null;
          const directLat = Number([item.latitude, item.lat, item.businessLatitude, item.locationLatitude].find((value) => value !== undefined && value !== null && value !== ""));
          const directLng = Number([item.longitude, item.lng, item.lon, item.businessLongitude, item.locationLongitude].find((value) => value !== undefined && value !== null && value !== ""));
          if (Number.isFinite(directLat) && Number.isFinite(directLng) && (Math.abs(directLat) > 0.0001 || Math.abs(directLng) > 0.0001)) return { latitude: directLat, longitude: directLng };
          const itemKeys = feedBusinessKeyCandidates(item);
          const rows = readCustomerBusinesses().concat((updates || []).filter((row) => row && row.type === "business"));
          for (let index = 0; index < rows.length; index += 1) {
            const row = rows[index] || {};
            const rowKeys = feedBusinessKeyCandidates(row);
            const matches = feedBusinessKeysOverlap(itemKeys, rowKeys);
            if (!matches) continue;
            const rowLat = Number([row.latitude, row.lat, row.businessLatitude, row.locationLatitude].find((value) => value !== undefined && value !== null && value !== ""));
            const rowLng = Number([row.longitude, row.lng, row.lon, row.businessLongitude, row.locationLongitude].find((value) => value !== undefined && value !== null && value !== ""));
            if (Number.isFinite(rowLat) && Number.isFinite(rowLng) && (Math.abs(rowLat) > 0.0001 || Math.abs(rowLng) > 0.0001)) return { latitude: rowLat, longitude: rowLng };
          }
          return null;
        }
        function feedItemInUserArea(item) {
          if (!item) return false;
          if (isCustomerOwnedFeedUpdate(item)) return true;
          const state = feedActiveLocationState();
          if (!state.strict) return true;
          if (!state.active) return false;
          const point = feedItemLocationPoint(item);
          if (!point) return false;
          return feedMilesBetween(state.latitude, state.longitude, point.latitude, point.longitude) <= state.radius;
        }
        function followedCustomerKeysForFeed() {
          const keys = new Set();
          try {
            const stored = JSON.parse(localStorage.getItem("emyCustomerFollowing") || "[]");
            (Array.isArray(stored) ? stored : []).forEach((entry) => {
              if (typeof entry === "string") {
                const key = feedCustomerBusinessKey(entry);
                if (key) keys.add(key);
                return;
              }
              const key = feedCustomerBusinessKey(entry && (entry.key || entry.customerKey || entry.profileKey || entry.slug || entry.id || entry.name || entry.displayName));
              if (key) keys.add(key);
            });
          } catch (error) {}
          try {
            for (let index = 0; index < localStorage.length; index += 1) {
              const storageKey = localStorage.key(index) || "";
              if (storageKey.indexOf("emyCustomerFollow:") !== 0) continue;
              if (localStorage.getItem(storageKey) === "1") keys.add(feedCustomerBusinessKey(storageKey.slice("emyCustomerFollow:".length)));
            }
          } catch (error) {}
          return keys;
        }
        function feedItemFollowed(item) {
          if (!item) return false;
          if (item.my && !feedItemMatchesCurrentBusiness(item)) return true;
          if (isCustomerOwnedFeedUpdate(item)) {
            const followedCustomers = followedCustomerKeysForFeed();
            const nameKey = feedCustomerBusinessKey(item.business || item.actor || item.name || "");
            return followedCustomers.has("customer-profile") || feedBusinessKeySetHasAny(followedCustomers, item) || (!!nameKey && followedCustomers.has(nameKey));
          }
          return feedBusinessKeySetHasAny(customerBusinessKeys(), item);
        }
        function feedItemAllowedByLocationOrFollowed(item) {
          if (!item) return false;
          if (isCustomerOwnedFeedUpdate(item)) return true;
          if (feedItemFollowed(item)) return true;
          return feedItemInUserArea(item);
        }
        function isNearbyBusinessFeedUpdate(item) {
          if (!item || isCustomerOwnedFeedUpdate(item)) return false;
          if (item.type === "business") return false;
          if (!feedBusinessKeyCandidates(item).length) return false;
          return feedItemFollowed(item) || feedItemInUserArea(item);
        }
        function feedUpdateMatchesFilter(item) {
          const type = String(item && item.type || "post").trim().toLowerCase();
          const allowedByLocation = feedItemAllowedByLocationOrFollowed(item);
          if (activeFilter === "all") return allowedByLocation;
          if (activeFilter === "my") return !!item.my && !isCustomerOwnedFeedUpdate(item) && allowedByLocation;
          if (activeFilter === "individual") return isCustomerOwnedFeedUpdate(item);
          if (activeFilter === "business" || activeFilter === "businesses") return isNearbyBusinessFeedUpdate(item);
          if (activeFilter === "post") return isCustomerOwnedFeedUpdate(item) && (type === "post" || type === "offer" || type === "repost");
          if (activeFilter === "event" || activeFilter === "events") return type === "event" && feedItemFollowed(item) && feedItemInUserArea(item);
          return type === activeFilter && allowedByLocation;
        }
        function filteredUpdates() {
          return feedNewestItems(customerFeedUpdates().filter((item) => feedUpdateMatchesFilter(item)));
        }
        function isOwnFeedUpdate(item) {
          if (!item) return false;
          const key = String(item.key || item.businessKey || "").trim().toLowerCase();
          const href = String(item.profileHref || "").trim().toLowerCase();
          const actor = String(item.business || item.actor || item.name || item.repostedBy || "").trim().toLowerCase();
          const current = String(currentCustomerName() || "").trim().toLowerCase();
          return key === "customer-profile" || href.indexOf("emy-customer-profile") >= 0 || (!!current && actor === current);
        }
        function currentVisibleIncomingFeedIds() {
          return filteredUpdates().filter((item) => !isOwnFeedUpdate(item)).map((item, index) => String(item && item.id || canonicalFeedId(item && item.type, item, index))).filter(Boolean);
        }
        function refreshNewPostsBaseline() {
          feedLiveUpdateIds = new Set(currentVisibleIncomingFeedIds());
          feedLiveUpdatesReady = true;
        }
        function maybeShowIncomingNewPosts() {
          const ids = currentVisibleIncomingFeedIds();
          const nextIds = new Set(ids);
          if (!feedLiveUpdatesReady) {
            feedLiveUpdateIds = nextIds;
            feedLiveUpdatesReady = true;
            return false;
          }
          const incoming = ids.filter((id) => !feedLiveUpdateIds.has(id));
          feedLiveUpdateIds = nextIds;
          if (!incoming.length) return false;
          if (window.scrollY < 160) return false;
          showNewPostsPill(incoming.length, incoming[0]);
          return true;
        }
        function renderAllFeedItems() {
          const source = filteredUpdates();
          const nextFeedHtml = source.map((item, index) => {
            try {
              return renderSocialFeedCard(item, index) || "";
            } catch (error) {
              try { console.warn("Skipping one feed item that could not render.", error, item); } catch (logError) {}
              return "";
            }
          }).filter(Boolean).join("");
          // Skip the destructive innerHTML swap when output is unchanged:
          // replacing identical DOM forces images to re-decode and the whole
          // list to repaint, which shows up as visible trembling on screen.
          let feedHash = 0;
          for (let i = 0; i < nextFeedHtml.length; i++) feedHash = (feedHash * 31 + nextFeedHtml.charCodeAt(i)) | 0;
          const feedSignature = nextFeedHtml.length + ":" + feedHash;
          const feedUnchanged = feedList.dataset.emyFeedRenderSignature === feedSignature && (!nextFeedHtml || feedList.children.length > 0);
          if (!feedUnchanged) {
            feedList.innerHTML = nextFeedHtml;
            feedList.dataset.emyFeedRenderSignature = feedSignature;
            ensureFeedActionIcons(feedList);
          }
          syncFeedState(feedList);
          if (!feedUnchanged) setupMutedClipHoverPreviews(feedList);
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(feedList);
          if (window.emySetupVideoPlayers) window.emySetupVideoPlayers(feedList);
          if (window.emySetupVideoDurations) window.emySetupVideoDurations(feedList);
          if (window.emySetupFeedMediaCarousels) window.emySetupFeedMediaCarousels(feedList);
          if (window.emySyncJobCreatorButtons) window.emySyncJobCreatorButtons(feedList);
        }
        function resetFeed(filter, updateUrl = true) {
          const nextFilter = normaliseFeedFilter(filter || "all");
          activeFilter = nextFilter;
          feedList.innerHTML = "";
          feedList.classList.remove("is-product-grid", "is-clip-grid");
          feedList.classList.toggle("is-product-grid", nextFilter === "product");
          feedList.classList.toggle("is-clip-grid", nextFilter === "clip");
          if (updateUrl) syncFeedFilterUrl(nextFilter);
          clearNewPostsPill();
          renderAllFeedItems();
          refreshNewPostsBaseline();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        function updateNewPostsPill() {
          if (!feedNewPosts || !feedNewPostsLabel) return;
          const count = Math.max(0, newPostsCount);
          feedNewPosts.hidden = count === 0;
          feedNewPosts.classList.toggle("is-visible", count > 0);
          feedNewPostsLabel.textContent = count === 1 ? "1 new post" : count + " new posts";
        }
        function showNewPostsPill(count, anchorId) {
          if (count <= 0) return;
          newPostsCount += count;
          if (!newPostsAnchorId && anchorId) newPostsAnchorId = anchorId;
          updateNewPostsPill();
        }
        function clearNewPostsPill() {
          newPostsCount = 0;
          newPostsAnchorId = "";
          updateNewPostsPill();
        }
        function jumpToNewPosts() {
          const anchorId = newPostsAnchorId;
          clearNewPostsPill();
          resetFeed("all", false);
          window.setTimeout(() => {
            const escaped = window.CSS && CSS.escape ? CSS.escape(anchorId) : String(anchorId || "").replace(/"/g, '\\"');
            const target = anchorId ? document.querySelector('[data-feed-id="' + escaped + '"]') : feedList && feedList.firstElementChild;
            if (target && target.scrollIntoView) target.scrollIntoView({ behavior: "smooth", block: "start" });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }, 180);
        }
        function currentCustomerName() {
          const stored = localStorage.getItem("emyCustomerDisplayName") || "";
          const first = localStorage.getItem("emyCustomerFirstName") || localStorage.getItem("emyMainPendingSignupFirstName") || "";
          const last = localStorage.getItem("emyCustomerLastName") || localStorage.getItem("emyMainPendingSignupLastName") || "";
          const signed = localStorage.getItem("emyMainSignedInEmail") || "";
          return stored.trim() || (first + " " + last).trim() || (signed ? signed.split("@")[0] : "Stephane");
        }
        function currentCustomerPhoto() {
          const activePhoto = typeof currentProfilePhoto === "string" ? currentProfilePhoto : "";
          const activeReaderPhoto = typeof activeProfileRole === "function" && activeProfileRole() === "customer" && typeof readActiveProfilePhoto === "function" ? readActiveProfilePhoto() : "";
          const savedPhoto = typeof activeProfileSavedCustomerPhoto === "function" ? activeProfileSavedCustomerPhoto() : "";
          const photo = activePhoto ||
            activeReaderPhoto ||
            savedPhoto ||
            customerPendingSignupPhoto() ||
            "";
          const photoRef = typeof currentCustomerPhotoRef === "function" ? currentCustomerPhotoRef() : "";
          if ((photo || photoRef) && typeof syncActiveCustomerProfilePhotoAliases === "function") syncActiveCustomerProfilePhotoAliases(photo, photoRef);
          return photo;
        }
        function currentCustomerPhotoRef() {
          const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          const activePhotoRef = typeof currentProfilePhotoRef === "string" ? currentProfilePhotoRef : "";
          const activeReaderPhotoRef = typeof activeProfileRole === "function" && activeProfileRole() === "customer" && typeof readActiveProfilePhotoRef === "function" ? readActiveProfilePhotoRef() : "";
          return activePhotoRef ||
            activeReaderPhotoRef ||
            (typeof activeProfileSavedCustomerPhotoRef === "function" ? activeProfileSavedCustomerPhotoRef() : "") ||
            (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "") ||
            "";
        }
        function currentBusinessNameForFeedComment() {
          const profile = readJson("emyBusinessProfileDraft", {});
          return String(localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || localStorage.getItem("emyMainPendingSignupBusinessName") || profile.businessName || profile.name || "").trim();
        }
        function activeFeedCommentRole() {
          const signedRole = String(localStorage.getItem("emyMainSignedInRole") || "").trim().toLowerCase();
          const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").trim().toLowerCase();
          try {
            const params = new URLSearchParams(window.location.search || "");
            const mode = String(params.get("mode") || "").trim().toLowerCase();
            const view = String(params.get("view") || "").trim().toLowerCase();
            const path = String(window.location.pathname || "");
            if (/emy-customer-/i.test(path)) return "customer";
            if (/emy-business-profile\.html$/i.test(path)) {
              if (mode === "customer" || view === "customer") return "customer";
              if (mode === "business" || view === "business" || signedRole === "business" || pendingRole === "business" || currentBusinessNameForFeedComment()) return "business";
            }
          } catch (error) {}
          return signedRole === "business" || pendingRole === "business" ? "business" : "customer";
        }
        function currentFeedCommentActor() {
          const role = activeFeedCommentRole();
          if (role === "business") {
            const profile = readJson("emyBusinessProfileDraft", {});
            const name = currentBusinessNameForFeedComment() || "Business";
            const key = String(localStorage.getItem("emyBusinessProfileKey") || localStorage.getItem("emyBusinessKey") || name).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "profile";
            const photo = feedRepostBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyBusinessProfileImage"), localStorage.getItem("emyBusinessPhoto"), localStorage.getItem("emyBusinessAvatar"), localStorage.getItem("emyBusinessLogo"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), profile.profilePhoto, profile.profilePhotoSrc, profile.photo, profile.photoSrc]);
            const photoRef = feedRepostBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyBusinessProfileImageRef"), localStorage.getItem("emyBusinessPhotoRef"), localStorage.getItem("emyBusinessAvatarRef"), localStorage.getItem("emyBusinessLogoRef"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), profile.profilePhotoRef, profile.photoRef]);
            return { role: "business", actorType: "business", name, key, photo, photoRef, href: "emy-business-profile.html?mode=business" };
          }
          const name = currentCustomerName();
          const key = String(localStorage.getItem("emyMainSignedInEmail") || name || "customer").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "customer";
          return { role: "customer", actorType: "customer", name, key, photo: currentCustomerPhoto(), photoRef: currentCustomerPhotoRef(), href: "emy-customer-profile.html" };
        }
        function feedRepostCustomerMediaSet() {
          return new Set([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef")
          ].map((value) => String(value || "").trim()).filter(Boolean));
        }
        function feedRepostBusinessOnlyMedia(values) {
          const customerMedia = feedRepostCustomerMediaSet();
          return (Array.isArray(values) ? values : []).map((value) => String(value || "").trim()).find((value) => value && !customerMedia.has(value)) || "";
        }
        function currentBusinessPhotoForFeedRepost() {
          const profile = readJson("emyBusinessProfileDraft", {});
          return feedRepostBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyBusinessProfileImage"), localStorage.getItem("emyBusinessProfileImageSrc"), localStorage.getItem("emyBusinessPhoto"), localStorage.getItem("emyBusinessPhotoSrc"), localStorage.getItem("emyBusinessAvatar"), localStorage.getItem("emyBusinessAvatarSrc"), localStorage.getItem("emyBusinessLogo"), localStorage.getItem("emyBusinessLogoSrc"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), localStorage.getItem("emyMainPendingSignupBusinessPhotoSrc"), profile.photoUrl, profile.profilePhotoUrl, profile.profilePhoto, profile.profilePhotoSrc, profile.photo, profile.photoSrc, profile.businessProfilePhoto, profile.businessProfilePhotoSrc, profile.businessPhoto, profile.businessPhotoSrc, profile.businessAvatar, profile.businessAvatarSrc, profile.businessLogo, profile.businessLogoSrc, profile.logo, profile.logoSrc, profile.image, profile.imageSrc]);
        }
        function currentBusinessPhotoRefForFeedRepost() {
          const profile = readJson("emyBusinessProfileDraft", {});
          return feedRepostBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyBusinessProfileImageRef"), localStorage.getItem("emyBusinessPhotoRef"), localStorage.getItem("emyBusinessAvatarRef"), localStorage.getItem("emyBusinessLogoRef"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), profile.photoPublicId, profile.profilePhotoPublicId, profile.profilePhotoRef, profile.photoRef, profile.businessProfilePhotoPublicId, profile.businessProfilePhotoRef, profile.businessPhotoPublicId, profile.businessPhotoRef, profile.businessAvatarPublicId, profile.businessAvatarRef, profile.businessLogoPublicId, profile.businessLogoRef, profile.logoPublicId, profile.logoRef, profile.imagePublicId, profile.imageRef]);
        }
        function currentBusinessAvatarMediaForFeed() {
          return {
            src: currentBusinessPhotoForFeedRepost(),
            ref: currentBusinessPhotoRefForFeedRepost()
          };
        }
        function feedRepostActor(item) {
          const type = String(item && (item.repostedByType || item.actorType || item.owner) || "").trim().toLowerCase() === "business" ? "business" : "customer";
          const name = String(item && (item.repostedBy || item.actor || item.name) || "").trim() || (type === "business" ? "Business" : currentCustomerName());
          const keySource = item && (item.repostedByKey || item.businessKey || item.key || (item.original && (item.original.businessKey || item.original.key)) || name) || name;
          const key = String(keySource || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || (type === "business" ? "profile" : "customer-profile");
          const href = String(item && (item.repostedByHref || item.profileHref) || "").trim() || (type === "business" ? "emy-business-profile.html?business=" + encodeURIComponent(key) : "emy-customer-profile.html");
          const rawPhoto = String(item && (item.repostedByPhoto || item.repostedByAvatar || item.avatarSrc || item.photo) || "").trim();
          const rawPhotoRef = String(item && (item.repostedByPhotoRef || item.repostedByAvatarRef || item.avatarRef || item.photoRef) || "").trim();
          const businessLookup = { businessKey: key, key, business: name, businessName: name, original: item && item.original };
          const photo = type === "business" ? feedRepostBusinessOnlyMedia([feedBusinessAvatarMediaForItem(businessLookup, "src"), rawPhoto]) : (currentCustomerPhoto() || rawPhoto);
          const photoRef = type === "business" ? feedRepostBusinessOnlyMedia([feedBusinessAvatarMediaForItem(businessLookup, "ref"), rawPhotoRef]) : (currentCustomerPhotoRef() || rawPhotoRef);
          return { type, name, key, href, photo, photoRef };
        }
        function feedRepostActorAvatarHtml(actor) {
          if (!actor) return "";
          const initial = String(actor.name || "S").trim().charAt(0).toUpperCase() || "S";
          return feedPosterAvatarHtml("social-feed-avatar feed-avatar", "feed", {
            src: actor.photo,
            ref: actor.photoRef,
            initial,
            href: actor.href,
            label: actor.name || "profile"
          });
        }
        function feedPosterAvatarHtml(className, avatarMedia, options) {
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
        function feedCommentAuthorRole(comment, context) {
          const explicit = String(comment && (comment.role || comment.actorType || comment.accountRole) || "").trim().toLowerCase();
          if (explicit === "business" || explicit === "customer") return explicit;
          const href = String(comment && comment.href || "").trim().toLowerCase();
          if (href.indexOf("emy-business-profile") >= 0 || href.indexOf("mode=business") >= 0) return "business";
          if (href.indexOf("emy-customer-profile") >= 0) return "customer";
          const ctx = context && context.dataset ? context.dataset : context;
          const cardBusiness = String((ctx && (ctx.detailBusiness || ctx.business || ctx.businessName || ctx.name)) || "").trim().toLowerCase();
          const authorName = String(comment && (comment.name || comment.author) || "").trim().toLowerCase();
          if (cardBusiness && authorName && cardBusiness === authorName) return "business";
          return "";
        }
        function isOwnFeedComment(comment, name, context) {
          const authorRole = feedCommentAuthorRole(comment, context);
          const viewerRole = activeFeedCommentRole();
          if (authorRole === "business" && viewerRole === "customer") return false;
          if (authorRole === "customer" && viewerRole === "business") return false;
          const cleanName = String(name || comment && (comment.name || comment.author) || "").trim().toLowerCase();
          const actor = currentFeedCommentActor();
          if (viewerRole === "customer") {
            if (authorRole === "business") return false;
            const ownName = actor.name.toLowerCase();
            return authorRole === "customer" || cleanName === "you" || (!!ownName && cleanName === ownName);
          }
          if (viewerRole === "business") {
            if (authorRole === "customer") return false;
            const businessName = actor.name.toLowerCase();
            return authorRole === "business" || cleanName === "you" || (!!businessName && cleanName === businessName);
          }
          return false;
        }
        function feedCommentReactionActive(comment, kind, context) {
          const active = kind === "dislike" ? !!(comment && comment.disliked) : !!(comment && comment.liked);
          if (!active) return false;
          const authorRole = feedCommentAuthorRole(comment, context);
          const viewerRole = activeFeedCommentRole();
          if (authorRole && viewerRole && authorRole !== viewerRole) return false;
          return true;
        }
        function feedCommentAvatarHtml(name, own) {
          const actor = currentFeedCommentActor();
          const photo = own ? actor.photo : "";
          const photoRef = own ? actor.photoRef : "";
          const initial = String(name || actor.name || "S").trim().charAt(0).toUpperCase() || "S";
          const key = String(name || "business").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "business";
          const href = own ? actor.href : "emy-business-profile.html?business=" + encodeURIComponent(key);
          return '<a class="feed-comment-avatar' + (photo || photoRef ? ' has-image' : '') + '" href="' + escapeHtml(href) + '" aria-label="Open ' + escapeHtml(name || "profile") + ' profile">' + (photo || photoRef ? '<img' + (photo ? ' src="' + escapeHtml(photo) + '"' : '') + (photoRef ? ' data-emy-media-ref="' + escapeHtml(photoRef) + '"' : '') + ' alt="" />' : escapeHtml(initial)) + '</a>';
        }
        function feedCommentDisplayName(comment, fallback, context) {
          const rawName = String(comment && comment.name ? comment.name : (fallback || "You")).trim();
          const own = isOwnFeedComment(comment, rawName, context);
          if (own) return currentFeedCommentActor().name || rawName || "Customer";
          return rawName || "Customer";
        }
        function feedCommentCountLabel(value, singular) {
          const count = Math.max(0, Number(value) || 0);
          return String(count);
        }
        function renderFeedCommentReply(reply, context) {
          const name = feedCommentDisplayName(reply, currentCustomerName(), context);
          const own = isOwnFeedComment(reply, name, context);
          const authorRole = feedCommentAuthorRole(reply, context);
          const likes = Math.max(0, Number(reply && reply.likes) || 0);
          const dislikes = Math.max(0, Number(reply && reply.dislikes) || 0);
          const liked = feedCommentReactionActive(reply, "like", context);
          const disliked = feedCommentReactionActive(reply, "dislike", context);
          const ownerTools = own ? '<button type="button" data-feed-comment-edit aria-label="Edit reply" title="Edit">' + socialIcon("edit") + '</button><button type="button" data-feed-comment-delete aria-label="Delete reply" title="Delete">' + socialIcon("delete") + '</button>' : "";
          const replyId = escapeHtml(reply && (reply.id || reply.commentId || reply.replyId || reply.createdAt || reply.at) || "");
          return '<div class="feed-comment-reply" data-feed-comment-reply-item data-feed-comment-reply-row' + (replyId ? ' data-feed-comment-id="' + replyId + '" data-comment-id="' + replyId + '"' : '') + ' data-feed-comment-name="' + escapeHtml(name) + '"' + (authorRole ? ' data-feed-comment-author-role="' + escapeHtml(authorRole) + '"' : '') + (own ? ' data-feed-comment-owned="true"' : '') + '>' + feedCommentAvatarHtml(name, own) + '<span class="feed-comment-reply-bubble"><strong>' + escapeHtml(name) + '</strong><span data-feed-comment-text>' + renderLinkedText(reply && reply.text || "") + '</span><span class="feed-comment-actions"><button type="button" data-feed-comment-like aria-pressed="' + (liked ? 'true' : 'false') + '"' + (liked ? ' class="is-active"' : '') + ' aria-label="Like reply" title="Like">' + socialIcon("like") + '</button><span class="feed-comment-action-count" data-feed-comment-likes>' + feedCommentCountLabel(likes, "like") + '</span><button type="button" data-feed-comment-dislike aria-pressed="' + (disliked ? 'true' : 'false') + '"' + (disliked ? ' class="is-active"' : '') + ' aria-label="Dislike reply" title="Dislike">' + socialIcon("dislike") + '</button><span class="feed-comment-action-count" data-feed-comment-dislikes>' + feedCommentCountLabel(dislikes, "dislike") + '</span>' + ownerTools + '</span></span></div>';
        }
        function renderComment(comment, context) {
          const name = feedCommentDisplayName(comment, "You", context);
          const likes = Math.max(0, Number(comment.likes) || 0);
          const dislikes = Math.max(0, Number(comment.dislikes) || 0);
          const liked = feedCommentReactionActive(comment, "like", context);
          const disliked = feedCommentReactionActive(comment, "dislike", context);
          const replies = Array.isArray(comment.replies) ? comment.replies.map((reply) => renderFeedCommentReply(reply, context)).join("") : "";
          const own = isOwnFeedComment(comment, name, context);
          const authorRole = feedCommentAuthorRole(comment, context);
          const ownerTools = own ? '<button type="button" data-feed-comment-edit aria-label="Edit comment" title="Edit">' + socialIcon("edit") + '</button><button type="button" data-feed-comment-delete aria-label="Delete comment" title="Delete">' + socialIcon("delete") + '</button>' : "";
          const commentId = escapeHtml(comment && (comment.id || comment.commentId || comment.createdAt || comment.at) || "");
          return '<div class="feed-comment" data-feed-comment-row' + (commentId ? ' data-feed-comment-id="' + commentId + '" data-comment-id="' + commentId + '"' : '') + ' data-feed-comment-name="' + escapeHtml(name) + '"' + (authorRole ? ' data-feed-comment-author-role="' + escapeHtml(authorRole) + '"' : '') + (own ? ' data-feed-comment-owned="true"' : '') + '>' + feedCommentAvatarHtml(name, own) + '<div class="feed-comment-bubble"><strong>' + escapeHtml(name) + '</strong><span data-feed-comment-text>' + renderLinkedText(comment.text || "") + '</span><span class="feed-comment-actions"><button type="button" data-feed-comment-like aria-pressed="' + (liked ? 'true' : 'false') + '"' + (liked ? ' class="is-active"' : '') + ' aria-label="Like comment" title="Like">' + socialIcon("like") + '</button><span class="feed-comment-action-count" data-feed-comment-likes>' + feedCommentCountLabel(likes, "like") + '</span><button type="button" data-feed-comment-dislike aria-pressed="' + (disliked ? 'true' : 'false') + '"' + (disliked ? ' class="is-active"' : '') + ' aria-label="Dislike comment" title="Dislike">' + socialIcon("dislike") + '</button><span class="feed-comment-action-count" data-feed-comment-dislikes>' + feedCommentCountLabel(dislikes, "dislike") + '</span><button type="button" data-feed-comment-reply aria-label="Reply to comment" title="Reply">' + socialIcon("reply") + '</button>' + ownerTools + '</span><form class="feed-comment-reply-form" data-feed-comment-reply-form hidden><input type="text" placeholder="Write a reply..." aria-label="Write a reply" /><button type="submit" aria-label="Send reply" title="Send reply">' + socialIcon("send") + '</button></form><div class="feed-comment-replies" data-feed-comment-replies>' + replies + '</div></div></div>';
        }
        function defaultComments(item) {
          return [];
        }
        function profileHrefFor(item) {
          return item.profileHref || ("emy-business-profile.html?business=" + encodeURIComponent(item.key));
        }
        function renderCard(item, index) {
          const wideClass = index % 5 === 0 ? " is-wide" : "";
          const clipClass = item.type === "clip" ? " is-clip" : "";
          const typeClass = item.type ? " is-" + String(item.type).replace(/[^a-z0-9-]/gi, "").toLowerCase() : "";
          const userClass = item.profileHref ? " is-user" : "";
          const href = profileHrefFor(item);
          const businessAttr = item.profileHref ? "" : ' data-business-link="' + escapeHtml(item.key) + '"';
          const posterRef = mediaPosterRef(item);
          const posterSrc = posterRef ? "" : mediaPosterSrc(item);
          const imageHtml = item.video
            ? (window.emyVideoPlayerMarkup ? window.emyVideoPlayerMarkup(item.video, item.title || "Video post", item.mediaRef || "", posterSrc, posterRef) : '<video src="' + escapeHtml(item.video) + '"' + (posterSrc ? ' poster="' + escapeHtml(posterSrc) + '"' : '') + (posterRef ? ' data-emy-poster-ref="' + escapeHtml(posterRef) + '"' : '') + ' controls playsinline></video>')
            : item.image
              ? '<img src="' + escapeHtml(item.image) + '" alt="" />'
              : "";
          const commentItems = item.comments || defaultComments(item);
          const comments = commentItems.map((comment) => renderComment(comment, item)).join("");
          const commentCount = commentItems.length;
          const cardType = item.type || "post";
          const detailKind = feedPostDetailKind(item, cardType);
          const cardTitle = feedGenericPostCaption(item.title) ? "" : (item.title || "");
          const cardText = feedGenericPostCaption(item.text) ? "" : (item.text || "");
          const detailPrice = item.price ? String(item.price).replace(/&pound;/g, "£") : "";
          const displayTime = feedItemTimeLabel(item, "Time saved");
          const feedDisplayTime = displayTime === "Time saved" ? "Just now" : displayTime;
          const detailMeta = [item.tag || "", feedDisplayTime, item.my ? "My Businesses" : "Nearby", item.stats || ""].filter(Boolean).join("|");
          const detailMediaSrc = item.video || item.image || "";
          const detailMediaType = item.video ? "video" : item.image ? "image" : "";
          const mediaWrapStart = item.video ? '<span class="feed-media-link">' : '<a class="feed-media-link" href="' + escapeHtml(href) + '"' + businessAttr + '>';
          const mediaWrapEnd = item.video ? '</span>' : '</a>';
          const mediaHidden = item.video ? "" : ' aria-hidden="true"';
          const clipChrome = item.type === "clip" ? '<span class="feed-play"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span>' : '';
          const playBadge = item.video ? "" : clipChrome;
          return '<article class="feed-card' + wideClass + typeClass + userClass + '" data-feed-id="' + escapeHtml(item.id) + '" data-business-key="' + escapeHtml(item.key || item.businessKey || "") + '" data-detail-kind="' + escapeHtml(detailKind) + '" data-detail-title="' + escapeHtml(cardTitle) + '" data-detail-description="' + escapeHtml(cardText) + '" data-detail-business="' + escapeHtml(item.business) + '" data-detail-price="' + escapeHtml(detailPrice) + '" data-detail-media="' + escapeHtml(item.media) + '" data-detail-media-src="' + escapeHtml(detailMediaSrc) + '" data-detail-media-type="' + escapeHtml(detailMediaType) + '" data-detail-poster-src="' + escapeHtml(posterSrc) + '" data-detail-poster-ref="' + escapeHtml(posterRef) + '" data-detail-meta="' + escapeHtml(detailMeta) + '">' +
            '<div class="feed-card-head"><a class="feed-profile-link" href="' + escapeHtml(href) + '"' + businessAttr + '><span><strong>' + escapeHtml(item.business) + '</strong><small>' + escapeHtml(feedDisplayTime) + (item.my ? ' &middot; My Businesses' : ' &middot; Nearby') + '</small></span></a><span class="feed-tag">' + escapeHtml(item.tag) + '</span></div>' +
            mediaWrapStart + '<span class="feed-media ' + escapeHtml(item.media) + '"' + mediaHidden + '>' + imageHtml + playBadge + (item.type === "clip" ? '<span class="clip-progress" aria-hidden="true"><span class="clip-progress-fill"></span></span>' : '') + '</span>' + mediaWrapEnd +
            '<div class="feed-body"><h2>' + escapeHtml(cardTitle) + '</h2><p>' + escapeHtml(cardText) + '</p>' +
            (item.price ? '<span class="feed-price">' + item.price + '</span>' : '') +
            '</div>' +
            '<div class="feed-comments"><div data-feed-comments-list>' + comments + '</div><form class="feed-comment-form" data-feed-comment-form><input type="text" placeholder="Write a comment..." aria-label="Write a comment" /><button type="submit">Post</button></form></div>' +
          '</article>';
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
          Array.from(root.querySelectorAll(".feed-card.is-clip")).forEach((card) => {
            if (card.dataset.clipHoverReady === "true") return;
            card.dataset.clipHoverReady = "true";
            card.addEventListener("mouseenter", () => scheduleMutedClipPreview(card));
            card.addEventListener("mouseleave", () => stopMutedClipPreview(card));
            card.addEventListener("focusin", () => scheduleMutedClipPreview(card));
            card.addEventListener("focusout", () => stopMutedClipPreview(card));
          });
        }
        function productFeedNumbers(item, index) {
          const text = String(item.stats || "");
          const likeMatch = text.match(/(\\d+)\\s*likes?/i);
          const savedMatch = text.match(/(\\d+)\\s*saved/i);
          const title = String(item.title || "").toLowerCase();
          const business = String(item.business || item.key || "").toLowerCase();
          const defaults = title.includes("steel") || business.includes("business-111")
            ? { likes: 12, saved: 4 }
            : title.includes("garlic")
              ? { likes: 7, saved: 2 }
              : title.includes("glow") || business.includes("glow")
                ? { likes: 18, saved: 7 }
                : { likes: Math.max(3, 8 + (index % 5)), saved: Math.max(1, 2 + (index % 3)) };
          return {
            likes: likeMatch ? Number(likeMatch[1]) : defaults.likes,
            saved: savedMatch ? Number(savedMatch[1]) : defaults.saved
          };
        }
        function feedProductAvailability(item, fallback) {
          const raw = String(item && (item.availability || item.stockStatus || item.stock || item.available || item.status) || "").trim();
          if (!raw || /^(active|live)$/i.test(raw)) return fallback || "Online and available";
          if (/^(paused|hidden|draft|inactive|unpublished)$/i.test(raw)) return "Unavailable";
          return raw;
        }
        function feedFooterTimeLabel(item, fallback) {
          const raw = feedStoredCreatedAt(item);
          const date = raw ? new Date(raw) : null;
          if (date && !Number.isNaN(date.getTime())) return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
          const label = String(item && item.time || "").trim();
          return label && !feedTimeLooksFake(label) ? label : (fallback || "Saved");
        }
        function feedProductFreshTime(item) {
          const raw = feedStoredCreatedAt(item);
          const parsed = raw ? Date.parse(raw) : NaN;
          if (Number.isFinite(parsed)) return parsed;
          const label = String(item && item.time || "").trim().toLowerCase();
          const relative = label.match(/^(\\d+)\\s+days?\\s+ago$/i);
          if (relative) return Date.now() - Number(relative[1]) * 24 * 60 * 60 * 1000;
          if (/today|just now|now|minute|hour/i.test(label)) return Date.now();
          if (/yesterday/i.test(label)) return Date.now() - 24 * 60 * 60 * 1000;
          return 0;
        }
        function feedProductIsNew(item) {
          const time = feedProductFreshTime(item);
          if (!time) return false;
          const age = Date.now() - time;
          return age >= 0 && age < 3 * 24 * 60 * 60 * 1000;
        }
        function clipFeedNumbers(item, index) {
          const text = String(item.stats || "");
          const likeMatch = text.match(/(\\d+)\\s*likes?/i);
          const viewMatch = text.match(/(\\d+)\\s*views?/i);
          const title = String(item.title || "").toLowerCase();
          const defaults = title.includes("good day") ? { likes: 1, views: 42 } : { likes: Math.max(1, index % 4), views: Math.max(18, 37 + index) };
          return {
            likes: likeMatch ? Number(likeMatch[1]) : defaults.likes,
            views: viewMatch ? Number(viewMatch[1]) : defaults.views
          };
        }
        function productClipDetails(item) {
          const price = item.price || item.priceText || "";
          const tag = String(item.tag || "").toLowerCase();
          const explicitProductClip = item.productClip === true || item.isProductClip === true || item.productClipDetails || /product\s*clip|shared\s+a\s+product\s+clip|product\s+video|clip\s+product/.test(tag);
          const hasProductFields = !!(price || item.productTitle || item.productName || item.productDescription || item.productText || item.productInfo);
          return {
            isProductClip: !!(explicitProductClip || hasProductFields),
            price,
            title: item.productTitle || item.productName || item.title || "Product",
            description: item.productDescription || item.productText || "Fresh item with clear product details."
          };
        }
        function renderLatestStyleCard(item, index) {
          const cardType = item.type || "post";
          const detailKind = feedPostDetailKind(item, cardType);
          const cardText = feedGenericPostCaption(item.text) ? "" : (item.text || "");
          const cardTitle = feedGenericPostCaption(item.title) ? "" : (item.title || "");
          const detailPrice = item.price ? String(item.price).replace(/&pound;/g, "\u00a3") : "";
          const source = item.my ? "My Business" : "Nearby";
          const availability = feedProductAvailability(item);
          const displayTime = feedItemTimeLabel(item, "Time saved");
          const feedDisplayTime = displayTime === "Time saved" ? "Just now" : displayTime;
          const detailMeta = detailKind === "Product" ? [source, item.category || item.productCategory || "", availability, item.distance || "", item.stats || ""].filter(Boolean).join("|") : [item.tag || "", feedDisplayTime, source === "My Business" ? "My Businesses" : "Nearby", item.stats || ""].filter(Boolean).join("|");
          const mediaItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(item) : [];
          const firstMediaItem = mediaItems[0] || null;
          const detailMediaRef = firstMediaItem ? (firstMediaItem.ref || "") : (item.mediaRef || item.imageRef || item.videoRef || "");
          const detailMediaType = firstMediaItem ? (firstMediaItem.type || "image") : (item.mediaType === "video" || item.video ? "video" : (item.mediaType === "image" || item.image || item.mediaSrc || detailMediaRef ? "image" : ""));
          const detailMediaSrc = detailMediaRef ? "" : (firstMediaItem ? (firstMediaItem.src || "") : (detailMediaType === "video" ? (item.video || item.mediaSrc || "") : (item.image || item.mediaSrc || "")));
          const posterRef = mediaPosterRef(item, firstMediaItem);
          const posterSrc = posterRef ? "" : mediaPosterSrc(item, firstMediaItem);
          const mediaItemsAttr = mediaItems.length > 1 && window.emyFeedMediaItemsAttribute ? window.emyFeedMediaItemsAttribute(mediaItems) : "";
          const attrs = ' data-feed-id="' + escapeHtml(item.id) + '" data-business-key="' + escapeHtml(item.key || item.businessKey || "") + '" data-detail-kind="' + escapeHtml(detailKind) + '" data-detail-title="' + escapeHtml(cardTitle) + '" data-detail-description="' + escapeHtml(cardText) + '" data-detail-business="' + escapeHtml(item.business) + '" data-detail-price="' + escapeHtml(detailPrice) + '" data-detail-media="' + escapeHtml(detailMediaSrc || detailMediaRef || mediaItems.length ? (item.media || "feed") : item.media) + '" data-detail-media-src="' + escapeHtml(detailMediaSrc) + '" data-detail-media-ref="' + escapeHtml(detailMediaRef) + '" data-detail-media-type="' + escapeHtml(detailMediaType) + '" data-detail-poster-src="' + escapeHtml(posterSrc) + '" data-detail-poster-ref="' + escapeHtml(posterRef) + '"' + (mediaItemsAttr ? ' data-detail-media-items="' + mediaItemsAttr + '"' : '') + ' data-detail-meta="' + escapeHtml(detailMeta) + '"';
          const latestHasVideo = detailMediaType === "video" && !!(detailMediaSrc || detailMediaRef || mediaItems.length);
          const latestMediaHtml = mediaItems.length > 1 && window.emyFeedMediaCarouselMarkup
            ? window.emyFeedMediaCarouselMarkup(mediaItems, { label:cardTitle || "Product media" })
            : (detailMediaSrc || detailMediaRef) ? (latestHasVideo ? (window.emyVideoPlayerMarkup ? window.emyVideoPlayerMarkup(detailMediaSrc, item.title || "Video post", detailMediaRef, posterSrc, posterRef) : '<video' + (detailMediaSrc ? ' src="' + escapeHtml(detailMediaSrc) + '"' : '') + (detailMediaRef ? ' data-emy-media-ref="' + escapeHtml(detailMediaRef) + '"' : '') + (posterSrc ? ' poster="' + escapeHtml(posterSrc) + '"' : '') + (posterRef ? ' data-emy-poster-ref="' + escapeHtml(posterRef) + '"' : '') + ' controls playsinline preload="metadata"></video>') : '<img' + (detailMediaSrc ? ' src="' + escapeHtml(detailMediaSrc) + '"' : '') + (detailMediaRef ? ' data-emy-media-ref="' + escapeHtml(detailMediaRef) + '"' : '') + ' alt="" />') : "";
          if (item.type === "product") {
            const ownerMenu = feedItemOwned(item);
            const numbers = productFeedNumbers(item, index);
            const productIsNew = feedProductIsNew(item);
            const productFreshTime = feedProductFreshTime(item);
            return '<article class="card product-card feed-product-card home-flow-item is-product' + (productIsNew ? ' is-new' : '') + (ownerMenu ? ' is-user-post' : '') + '"' + attrs + ' data-product-new="' + (productIsNew ? 'true' : 'false') + '"' + (productFreshTime ? ' data-product-created-at="' + escapeHtml(new Date(productFreshTime).toISOString()) + '"' : '') + ' data-card>' +
              '<div class="photo ' + escapeHtml(item.media) + '" aria-hidden="true">' + latestMediaHtml + '</div>' +
              '<button class="social-feed-more feed-action" type="button" data-feed-options aria-label="More options" aria-expanded="false">...</button>' + feedOptionsMenu("product", ownerMenu) +
              '<div class="body"><h3>' + escapeHtml(cardTitle) + '</h3><p>' + escapeHtml(cardText) + '</p><div class="product-source">' + escapeHtml(source) + '</div><div class="product-availability">' + escapeHtml(availability) + '</div><div class="product-stats"><span><span data-product-like-count data-raw-count="' + readEngagementCount(numbers.likes) + '">' + formatEngagementCount(numbers.likes) + '</span> likes</span><span><span data-product-saved-count data-raw-count="' + readEngagementCount(numbers.saved) + '">' + formatEngagementCount(numbers.saved) + '</span> saved</span></div>' + (item.price ? '<div class="price">' + item.price + '</div>' : '') + '</div>' +
              feedCountedActionFooter(formatEngagementCount(numbers.likes) + ' like' + (numbers.likes === 1 ? '' : 's'), "", 0, feedFooterTimeLabel(item, "Saved")) +
              '<div class="feed-comments"><div data-feed-comments-list></div><form class="feed-comment-form" data-feed-comment-form><input type="text" placeholder="Add a comment..." aria-label="Write a comment" /><button type="submit">Post</button></form></div>' +
            '</article>';
          }
          return "";
        }
        function socialIcon(name) {
          if (name === "like") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.6 10.6 10.8 4c.5-.9 1.9-.6 1.9.5v5h4.9c1.2 0 2.1 1.1 1.8 2.3l-1.5 5.7c-.3 1.1-1.2 1.8-2.3 1.8H8.4c-.9 0-1.6-.7-1.6-1.6v-6c0-.4.3-.9.8-1.1Z"/><path d="M4.8 10.8v8.4"/></svg>';
          if (name === "dislike") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3H8.7a2 2 0 0 0-1.86 1.25L4 11v2h5.5L8.7 19.1A1.7 1.7 0 0 0 10.38 21h.22L17 13.8V5a2 2 0 0 0-1-2Z"/><path d="M17 5h3v8h-3"/></svg>';
          if (name === "send") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 20 4l-7.5 16-2.2-6.3L4 11.5Z"/><path d="m10.3 13.7 4.5-4.5"/></svg>';
          if (name === "reply") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 10 4 15l5 5"/><path d="M5 15h8a6 6 0 0 0 6-6V5"/></svg>';
          if (name === "edit") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4.5L19 9.5 14.5 5 4 15.5V20Z"/><path d="m13.5 6 4.5 4.5"/></svg>';
          if (name === "delete") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 14h8l1-14"/></svg>';
          if (name === "check") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
          if (name === "cancel") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
          if (name === "view") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z"/><path d="M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/></svg>';
          if (name === "apply") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l3 3V20H7V3.5Z"/><path d="M14 3.5V7h3M9.5 14l2 2 4-5"/></svg>';
          if (name === "comment") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v10.8H9.2L5 19.5v-14Z"/><path d="M8.8 10.8h6.4"/></svg>';
          if (name === "share") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a3 3 0 1 0-2.8-4.05L8.7 7.25a3 3 0 1 0 0 3.5l6.5 3.3A3 3 0 1 0 16 12.5L9.6 9.25"/></svg>';
          if (name === "repost") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8l-4 4"/><path d="M3 11V9a2.2 2.2 0 0 1 2.2-2.2H21"/><path d="M7 21.2l-4-4 4-4"/><path d="M21 13v2a2.2 2.2 0 0 1-2.2 2.2H3"/></svg>';
          if (name === "save") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.8h12v15.4l-6-3.4-6 3.4V4.8Z"/></svg>';
          return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.2-4.3-9-9.1C1.9 7.8 3.7 5 6.7 5c1.8 0 3.3.9 4.1 2.3C11.6 5.9 13.1 5 14.9 5c3 0 4.8 2.8 3.7 5.9C16.8 15.7 12 20 12 20Z"/></svg>';
        }
        function feedOptionsKind(type, hasImage, hasVideo, isTextOnly) {
          if (type === "clip") return "clip";
          if (type === "product") return "product";
          if (type === "event") return "event";
          if (type === "article") return "article";
          if (hasVideo) return "video";
          if (hasImage) return "image";
          return "post";
        }
        function feedOptionsMenu(kind, owned) {
          const target = kind || "post";
          const goLabel = target === "image" ? "Go to image" : target === "video" ? "Go to video" : target === "clip" ? "Go to clip" : target === "product" ? "Go to product" : target === "event" ? "Go to event" : target === "article" ? "Go to article" : target === "job" ? "Go to job" : "Go to post";
          return '<div class="feed-options-menu" data-feed-options-menu data-feed-options-kind="' + escapeHtml(target) + '" hidden>' +
            '<button class="is-danger" type="button" data-feed-option="report">Report</button>' +
            '<button type="button" data-feed-option="hide">Not interested</button>' +
            '<button type="button" data-feed-option="open">' + escapeHtml(goLabel) + '</button>' +
            (owned ? '<button type="button" data-feed-option="edit">Edit</button><button class="is-danger" type="button" data-feed-option="delete">Delete</button>' : '') +
            '<button type="button" data-feed-option="copy">Copy link</button>' +
          '</div>';
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
        function feedCountedActionFooter(statText, captionHtml, commentCount, timeText) {
          const safeTime = escapeHtml(timeText || "Just now");
          return (captionHtml || "") + '<div class="social-feed-body social-feed-body-counted"><span class="social-feed-time">' + safeTime + '</span></div>';
        }
        function closeFeedOptions(exceptMenu) {
          if (!feedList) return;
          feedList.querySelectorAll("[data-feed-options-menu]").forEach((menu) => {
            if (menu !== exceptMenu) {
              menu.hidden = true;
              menu.style.left = "";
              menu.style.top = "";
              menu.style.right = "";
            }
          });
          feedList.querySelectorAll("[data-feed-options]").forEach((button) => {
            const menu = button.closest("[data-feed-id]") && button.closest("[data-feed-id]").querySelector("[data-feed-options-menu]");
            button.setAttribute("aria-expanded", menu && !menu.hidden ? "true" : "false");
          });
        }
        function positionFeedOptions(button, menu) {
          if (!button || !menu) return;
          const rect = button.getBoundingClientRect();
          const width = Math.min(220, Math.max(170, window.innerWidth - 24));
          menu.style.width = width + "px";
          menu.style.right = "auto";
          const height = menu.offsetHeight || 212;
          let left = Math.min(window.innerWidth - width - 10, Math.max(10, rect.right - width));
          let top = rect.bottom + 8;
          if (top + height > window.innerHeight - 10) top = Math.max(10, rect.top - height - 8);
          menu.style.left = left + "px";
          menu.style.top = top + "px";
        }
        function toggleFeedOptions(button) {
          const card = button && button.closest("[data-feed-id]");
          const menu = card && card.querySelector("[data-feed-options-menu]");
          if (!menu) return;
          const shouldOpen = menu.hidden;
          closeFeedOptions(menu);
          menu.hidden = !shouldOpen;
          if (shouldOpen) positionFeedOptions(button, menu);
          button.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
        }
        function shareFeedCard(card, kind) {
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
        function setFeedCardVisibleText(card, title, text) {
          if (!card) return;
          if (title) {
            card.dataset.detailTitle = title;
            card.querySelectorAll(".feed-job-hero strong, .feed-event-post-hero strong, .feed-article-card-body h2, .feed-product-card h3, .social-feed-quote-title, .caption strong").forEach((node) => { node.textContent = title; });
            const textPanel = card.querySelector(".social-feed-text-panel p");
            if (textPanel && !card.classList.contains("is-repost")) textPanel.textContent = title;
          }
          if (text) {
            card.dataset.detailDescription = text;
            card.querySelectorAll(".feed-job-desc, .feed-event-post-details p, .feed-article-card-body p, .feed-product-card .body p, .social-feed-quote-text, .caption > span").forEach((node) => { node.textContent = text; });
            const caption = card.querySelector(".social-feed-caption");
            const business = card.dataset.detailBusiness || currentCustomerName();
            if (caption && !card.classList.contains("is-repost")) caption.innerHTML = '<strong>' + escapeHtml(business) + '</strong>' + escapeHtml(text);
          }
        }
        function feedItemOwned(item) {
          if (!item) return false;
          const id = String(item.id || "");
          if (feedCreatedItemBusinessOwned(item)) return false;
          const isBusinessRepost = id.indexOf("repost-") === 0 && String(item.repostedByType || item.actorType || item.owner || "").trim().toLowerCase() === "business";
          const ownerType = String(item.owner || item.actorType || item.repostedByType || "").trim().toLowerCase();
          const businessKey = String(item.key || item.businessKey || "").trim().toLowerCase();
          if (ownerType === "business" || (businessKey && businessKey !== "customer-profile")) return false;
          const ownerName = currentCustomerName().trim().toLowerCase();
          const itemName = String(item.name || item.business || item.actor || item.repostedBy || "").trim().toLowerCase();
          return item.isUserPost === true || item.key === "customer-profile" || item.profileHref === "emy-customer-profile.html" || id.indexOf("customer-post-") === 0 || id.indexOf("feed-create-") === 0 || (id.indexOf("repost-") === 0 && !isBusinessRepost) || (!!ownerName && itemName === ownerName && ownerType !== "business" && !(businessKey && businessKey !== "customer-profile"));
        }
        function feedCardBusinessOwned(card) {
          if (!card || !card.dataset) return false;
          const owner = String(card.dataset.owner || card.dataset.repostActorType || card.dataset.detailOwner || "").trim().toLowerCase();
          if (owner === "business") return true;
          if (owner === "customer") return false;
          const key = String(card.dataset.businessKey || card.dataset.detailBusinessKey || card.dataset.ownerKey || "").trim().toLowerCase();
          if (key && key !== "customer-profile") return true;
          return !!(card.dataset.businessStorageKey || card.dataset.businessPostStorageKey);
        }
        function feedCardOwned(card) {
          if (!card || !card.dataset) return false;
          if (feedCardBusinessOwned(card)) return false;
          const data = card.dataset;
          const id = String(data.feedId || "");
          const owner = String(data.owner || data.repostActorType || "").trim().toLowerCase();
          if (owner === "business") return false;
          if (owner === "customer") return true;
          return !!(data.ownedJob === "true" ||
            data.businessKey === "customer-profile" ||
            data.detailBusinessKey === "customer-profile" ||
            id.indexOf("customer-post-") === 0 ||
            id.indexOf("feed-create-") === 0 ||
            (id.indexOf("repost-") === 0 && data.repostActorType !== "business"));
        }
        function editFeedCard(card) {
          if (!card || !card.dataset.feedId) return;
          if (!feedCardOwned(card)) {
            showToast("You can edit your own posts only.");
            return;
          }
          if (editFeedRepostThought(card, { showToast })) return;
          const menu = card.querySelector("[data-feed-options-menu]");
          const kind = menu && menu.dataset.feedOptionsKind || "";
          if (window.emyOpenOriginalFeedEdit && window.emyOpenOriginalFeedEdit(card, { kind, showToast })) {
            return;
          }
          if (window.emyOpenFeedEditSheet) {
            window.emyOpenFeedEditSheet({
              card,
              kind,
              showToast,
              updateState: updateFeedState,
              setVisibleText: setFeedCardVisibleText
            });
            return;
          }
          const title = window.prompt("Edit title", card.dataset.detailTitle || "");
          if (title === null) return;
          const text = window.prompt("Edit text", card.dataset.detailDescription || "");
          if (text === null) return;
          setFeedCardVisibleText(card, title.trim(), text.trim());
          updateFeedState(card, { editedTitle: title.trim(), editedText: text.trim() });
          showToast("Post updated.");
        }
        function deleteFeedCard(card) {
          if (!card || !card.dataset.feedId) return;
          if (!feedCardOwned(card)) {
            showToast("You can delete your own posts only.");
            return;
          }
          const title = card.dataset.detailTitle || "this post";
          if (!window.confirm("Delete " + title + "?")) return;
          const menu = card.querySelector("[data-feed-options-menu]");
          const kind = menu && menu.dataset.feedOptionsKind || card.dataset.detailKind || "";
          const feedId = card.dataset.feedId || "";
          const storedDeleted = window.emyDeleteStoredFeedItem ? window.emyDeleteStoredFeedItem(card, kind) : true;
          if (storedDeleted === false) {
            showToast("EMY could not delete this post from storage yet.");
            return;
          }
          updateFeedState(card, { hidden: true, deleted: true });
          if (card.isConnected) card.remove();
          showToast("Post deleted.");
          scheduleFeedHeavyInteraction(() => {
            if (typeof window.emyPurgeDeletedFeedCardsFromAllLists === "function") window.emyPurgeDeletedFeedCardsFromAllLists(feedId);
            if (typeof window.emySyncContentSurfaces === "function") window.emySyncContentSurfaces({ action: "delete", feedId: feedId, kind: kind });
            else rerenderFeedFromStorage();
          });
        }
        function repostStorageKey() {
          return "emyFeedReposts";
        }
        function readFeedReposts() {
          try {
            const parsed = JSON.parse(localStorage.getItem(repostStorageKey()) || "[]");
            const items = Array.isArray(parsed) ? parsed : [];
            return window.emyRepairFeedRepostMedia ? window.emyRepairFeedRepostMedia(items, { persist: true }) : items;
          } catch (error) {
            return [];
          }
        }
        function writeFeedReposts(items) {
          try {
            localStorage.setItem(repostStorageKey(), JSON.stringify(Array.isArray(items) ? items : []));
            window.dispatchEvent(new CustomEvent("emy:feed-reposts-changed", { detail: { key: repostStorageKey() } }));
          } catch (error) {}
        }
        function feedRepostOriginalIdFromRecord(item) {
          return item && (item.originalId || item.originalFeedId || item.feedId || (item.original && item.original.id)) || "";
        }
        function feedRepostOriginalIdFromCard(card) {
          return card && (card.dataset.repostOriginalId || card.dataset.originalFeedId || card.dataset.feedId) || "";
        }
        function feedRepostCount(card) {
          const id = feedRepostOriginalIdFromCard(card);
          if (!id) return 0;
          return readFeedReposts().filter((item) => feedRepostOriginalIdFromRecord(item) === id).length;
        }
        function feedHasRepost(card) {
          return feedRepostCount(card) > 0;
        }
        function feedRepostText(count) {
          const total = readEngagementCount(count);
          return formatEngagementCount(total) + " repost" + (total === 1 ? "" : "s");
        }
        function feedBaseStatText(value) {
          const clean = String(value || "").replace(/\\s*(?:\\u00b7|\\u2022)\\s*\\d+(?:\\.\\d+)?\\s*[kKmM]?\\s+reposts?$/i, "").trim();
          return clean || "0 likes";
        }
        function feedCountedStatNumber(text, word) {
          const match = String(text || "").match(new RegExp("(\\\\d+(?:\\\\.\\\\d+)?\\\\s*[kKmM]?)\\\\s+" + word + "s?", "i"));
          return match ? readEngagementCount(match[1]) : 0;
        }
        function setFeedCountedText(card, selector, value) {
          if (!card) return;
          card.querySelectorAll(selector).forEach((node) => setEngagementCountText(node, value));
        }

        function setFeedCommentToggleLabels(card) {
          if (!card) return;
          const label = card.classList.contains("is-comments-open") ? "Close comments" : "Add a comment";
          card.querySelectorAll(".social-feed-comments-link").forEach((button) => {
            button.dataset.feedCommentLabel = "Add a comment";
            button.textContent = label;
            button.setAttribute("aria-label", label);
          });
        }

        function closeFeedCommentPanels(root = feedList) {
          const scope = root && root.querySelectorAll ? root : feedList;
          if (!scope) return;
          const cards = [];
          if (scope.matches && scope.matches("[data-feed-id].is-comments-open")) cards.push(scope);
          scope.querySelectorAll("[data-feed-id].is-comments-open").forEach((card) => cards.push(card));
          cards.forEach((card) => {
            card.classList.remove("is-comments-open");
            setFeedCommentToggleLabels(card);
          });
        }

        function syncFeedCountedFooter(card) {
          if (!card || !card.dataset.feedId || !card.querySelector("[data-feed-social-actions]")) return;
          const state = readFeedActionState()[card.dataset.feedId] || {};
          const stat = card.querySelector("[data-feed-stat]");
          const statText = stat ? stat.textContent : "";
          const commentsList = card.querySelector("[data-feed-comments-list]");
          const renderedComments = commentsList ? commentsList.querySelectorAll("[data-feed-comment-row]").length : 0;
          const storedComments = Array.isArray(state.comments) ? state.comments.length : 0;
          const shareNode = card.querySelector("[data-feed-share-count]");
          const visibleShares = readEngagementCount(shareNode);
          const storedShares = Number(state.shareCount || 0) || 0;
          const statLikeCount = feedCountedStatNumber(statText, "like");
          const countedLikeCount = state.countedLikeCount !== undefined && !/like/i.test(statText) ? Number(state.countedLikeCount) || 0 : statLikeCount;
          setFeedCountedText(card, "[data-feed-like-count]", countedLikeCount);
          setFeedCountedText(card, "[data-feed-comment-count], [data-feed-comment-total]", Math.max(renderedComments, storedComments));
          setFeedCountedText(card, "[data-feed-repost-count]", feedRepostCount(card));
          setFeedCountedText(card, "[data-feed-share-count]", Math.max(visibleShares, storedShares));
          setFeedCommentToggleLabels(card);
        }
        function updateFeedRepostCount(card) {
          if (!card) return;
          const count = feedRepostCount(card);
          const active = feedHasRepost(card);
          const stat = card.querySelector("[data-feed-stat]");
          if (stat) stat.textContent = feedBaseStatText(stat.textContent) + " \\u00b7 " + feedRepostText(count);
          card.querySelectorAll("[data-feed-repost], [data-feed-action='repost']").forEach((button) => {
            button.querySelectorAll("[data-feed-repost-count]").forEach((node) => node.remove());
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
            button.setAttribute("aria-label", active ? "Remove repost" : "Repost");
            button.setAttribute("title", active ? "Remove repost" : "Repost");
          });
          syncFeedCountedFooter(card);
        }
        function openRepostDialog(card, onSubmit, options = {}) {
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
          dialog.addEventListener("click", (event) => {
            if (event.target === dialog) close();
          });
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

        function editFeedRepostThought(card, options = {}) {
          const isRepost = card && ((card.classList && card.classList.contains("is-repost")) || String(card.dataset && card.dataset.detailKind || "").toLowerCase() === "repost");
          if (!isRepost) return false;
          const repostId = card.dataset.feedId || "";
          const originalId = feedRepostOriginalIdFromCard(card);
          const items = readFeedReposts();
          const record = items.find((item) => item && item.id === repostId) || items.find((item) => feedRepostOriginalIdFromRecord(item) === originalId);
          if (!record) {
            showToast("EMY could not find this repost to edit.");
            return true;
          }
          const original = record.original || {};
          openRepostDialog(card, (thought) => {
            const next = readFeedReposts().map((item) => {
              const matches = item && (item.id === record.id || (item.id === repostId && repostId) || feedRepostOriginalIdFromRecord(item) === originalId);
              return matches ? Object.assign({}, item, { thought: String(thought || "").trim(), repostThought: String(thought || "").trim() }) : item;
            });
            writeFeedReposts(next);
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
        window.emyEditRepostThought = editFeedRepostThought;
        function repostRecordFromCard(card, thought) {
          const originalId = feedRepostOriginalIdFromCard(card);
          if (!card || !originalId) return null;
          const details = typeof detailsFromCard === "function" ? detailsFromCard(card) : {};
          const actorName = currentCustomerName();
          const actorPhoto = currentCustomerPhoto();
          const actorPhotoRef = currentCustomerPhotoRef();
          const originalAvatar = card.querySelector(".social-feed-avatar img,.feed-avatar img,.post-avatar img,.reel-avatar img,.home-created-avatar img,.business-preview-post-avatar img,.my-business-avatar img,[data-detail-avatar] img");
          const originalAvatarSrc = String(details.avatarSrc || details.profilePhoto || details.businessPhoto || card.dataset.detailAvatarSrc || (originalAvatar && originalAvatar.getAttribute("src")) || "").trim();
          const originalAvatarRef = String(details.avatarRef || details.profilePhotoRef || details.businessPhotoRef || card.dataset.detailAvatarRef || (originalAvatar && (originalAvatar.getAttribute("data-emy-media-ref") || originalAvatar.dataset.emyMediaRef)) || "").trim();
          return {
            id: "repost-" + originalId + "-" + Date.now(),
            originalId,
            repostedAt: new Date().toISOString(),
            repostedBy: actorName,
            repostedByType: "customer",
            actorType: "customer",
            owner: "customer",
            repostedByKey: "customer-profile",
            repostedByHref: "emy-customer-profile.html",
            profileHref: "emy-customer-profile.html",
            repostedByPhoto: actorPhoto,
            repostedByPhotoRef: actorPhotoRef,
            repostedByAvatar: actorPhoto,
            repostedByAvatarRef: actorPhotoRef,
            avatarSrc: actorPhoto,
            avatarRef: actorPhotoRef,
            thought: String(thought || "").trim(),
            repostThought: String(thought || "").trim(),
            original: {
              id: originalId,
              key: card.dataset.businessKey || "",
              business: details.business || card.dataset.detailBusiness || "Business",
              avatarSrc: originalAvatarSrc,
              avatarRef: originalAvatarRef,
              profilePhoto: originalAvatarSrc,
              profilePhotoRef: originalAvatarRef,
              businessPhoto: originalAvatarSrc,
              businessPhotoRef: originalAvatarRef,
              kind: details.kind || card.dataset.detailKind || "Post",
              title: details.title || card.dataset.detailTitle || "Feed update",
              text: details.description || card.dataset.detailDescription || "",
              media: details.mediaClass || card.dataset.detailMedia || "feed",
              mediaSrc: details.mediaSrc || card.dataset.detailMediaSrc || "",
              mediaRef: details.mediaRef || card.dataset.detailMediaRef || "",
              mediaType: details.mediaType || card.dataset.detailMediaType || "",
              duration: details.duration || card.dataset.detailDuration || "",
              articleBody: details.articleBody || card.dataset.articleBody || card.dataset.detailArticleBody || "",
              articleShare: details.articleShare || card.dataset.articleShare || card.dataset.detailArticleShare || "",
              articleReadTime: details.articleReadTime || card.dataset.articleReadTime || card.dataset.detailArticleReadTime || "",
              price: details.price || card.dataset.detailPrice || "",
              meta: Array.isArray(details.meta) && details.meta.length ? details.meta.join("|") : (card.dataset.detailMeta || ""),
              href: "emy-customer-home.html#feeds"
            }
          };
        }
        function addFeedRepost(card, thought) {
          const record = repostRecordFromCard(card, thought);
          if (!record || !record.original || !record.original.id) return false;
          const items = readFeedReposts().filter((item) => feedRepostOriginalIdFromRecord(item) !== record.original.id);
          items.unshift(record);
          writeFeedReposts(items.slice(0, 60));
          updateFeedRepostCount(card);
          return true;
        }
        function removeFeedRepost(card) {
          const originalId = feedRepostOriginalIdFromCard(card);
          if (!originalId) return false;
          const items = readFeedReposts();
          const next = items.filter((item) => feedRepostOriginalIdFromRecord(item) !== originalId);
          if (next.length === items.length) return false;
          writeFeedReposts(next);
          updateFeedRepostCount(card);
          return true;
        }
        function handleFeedOption(action, card, menu) {
          const kind = menu && menu.dataset.feedOptionsKind || "post";
          closeFeedOptions();
          if (action === "report") {
            showToast("Report sent for this " + kind + ".");
            return;
          }
          if (action === "hide") {
            if (card) card.hidden = true;
            updateFeedState(card, { hidden: true });
            showToast("We will show fewer updates like this.");
            return;
          }
          if (action === "open") {
            if (card && window.emyOpenItemDetail && window.emyOpenItemDetail(card)) return;
            if (card) window.setTimeout(() => card.click(), 0);
            return;
          }
          if (action === "edit") {
            editFeedCard(card);
            return;
          }
          if (action === "delete") {
            deleteFeedCard(card);
            return;
          }
          if (action === "share") {
            shareFeedCard(card, "share");
            return;
          }
          if (action === "repost") {
            if (feedHasRepost(card)) {
              if (removeFeedRepost(card)) {
                resetFeed("all", false);
                showToast("Repost removed.");
              }
              return;
            }
            openRepostDialog(card, (thought) => {
              if (addFeedRepost(card, thought)) {
                resetFeed("all", false);
                showToast(thought ? "Reposted with your thoughts." : "Reposted to your feed.");
              }
            });
            return;
          }
          if (action === "copy") shareFeedCard(card, "copy");
        }
        const feedActionStateKey = "emyFeedActionState";
        const savedFeedItemsKey = "emySavedFeedItems";
        function readFeedActionState() {
          try {
            const parsed = JSON.parse(localStorage.getItem(feedActionStateKey) || "{}");
            return parsed && typeof parsed === "object" ? parsed : {};
          } catch (error) {
            return {};
          }
        }
        function writeFeedActionState(state) {
          try {
            localStorage.setItem(feedActionStateKey, JSON.stringify(state || {}));
            window.dispatchEvent(new CustomEvent("emy:feed-action-state-changed", { detail: { key: feedActionStateKey } }));
          } catch (error) {}
        }
        function updateFeedState(card, patch) {
          if (!card || !card.dataset.feedId) return;
          const state = readFeedActionState();
          state[card.dataset.feedId] = Object.assign({}, state[card.dataset.feedId] || {}, patch || {});
          writeFeedActionState(state);
        }
        function scheduleFeedHeavyInteraction(callback) {
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
        function appendFeedCommentState(card, comment) {
          if (!card || !card.dataset.feedId || !comment || !comment.text) return;
          const state = readFeedActionState();
          const current = Object.assign({}, state[card.dataset.feedId] || {});
          current.comments = (current.comments || []).concat(comment);
          state[card.dataset.feedId] = current;
          writeFeedActionState(state);
        }
        function feedCommentReplyFromDomRow(replyRow, rowIndex, commentId) {
          const likesText = replyRow.querySelector("[data-feed-comment-likes]") && replyRow.querySelector("[data-feed-comment-likes]").textContent || "";
          const dislikesText = replyRow.querySelector("[data-feed-comment-dislikes]") && replyRow.querySelector("[data-feed-comment-dislikes]").textContent || "";
          const text = replyRow.querySelector("[data-feed-comment-text]") && replyRow.querySelector("[data-feed-comment-text]").textContent || "";
          if (!text) return null;
          const own = replyRow.hasAttribute("data-feed-comment-owned");
          const actor = currentFeedCommentActor();
          return {
            id: replyRow.dataset.feedCommentId || replyRow.dataset.commentId || "",
            rowIndex,
            commentId: commentId || "",
            name: replyRow.dataset.feedCommentName || actor.name,
            text,
            likes: Number((likesText.match(/\d+/) || ["0"])[0]) || 0,
            dislikes: Number((dislikesText.match(/\d+/) || ["0"])[0]) || 0,
            liked: !!(replyRow.querySelector("[data-feed-comment-like]") && replyRow.querySelector("[data-feed-comment-like]").classList.contains("is-active")),
            disliked: !!(replyRow.querySelector("[data-feed-comment-dislike]") && replyRow.querySelector("[data-feed-comment-dislike]").classList.contains("is-active")),
            own,
            mine: own,
            role: actor.role,
            actorType: actor.role,
            photo: actor.photo,
            photoRef: actor.photoRef,
            href: actor.href,
            createdAt: replyRow.dataset.feedCommentCreatedAt || new Date().toISOString()
          };
        }
        function feedReplyIdentityKey(reply) {
          if (!reply) return "";
          return [reply.id || "", reply.commentId || "", String(reply.rowIndex == null ? "" : reply.rowIndex), reply.name || "", reply.text || ""].join("|").toLowerCase();
        }
        function feedReplyAlreadyRendered(repliesContainer, reply) {
          if (!repliesContainer || !reply || !reply.text) return false;
          const replyId = String(reply.id || reply.commentId || "").trim();
          if (replyId) {
            return !!repliesContainer.querySelector('[data-feed-comment-id="' + replyId.replace(/"/g, '\\"') + '"], [data-comment-id="' + replyId.replace(/"/g, '\\"') + '"]');
          }
          const name = String(reply.name || "").trim().toLowerCase();
          const text = String(reply.text || "").trim().toLowerCase();
          return Array.from(repliesContainer.querySelectorAll("[data-feed-comment-reply-row]")).some((node) => {
            const nodeName = String(node.dataset.feedCommentName || (node.querySelector("strong") && node.querySelector("strong").textContent) || "").trim().toLowerCase();
            const nodeText = String(node.querySelector("[data-feed-comment-text]") && node.querySelector("[data-feed-comment-text]").textContent || "").trim().toLowerCase();
            return nodeName === name && nodeText === text;
          });
        }
        function feedCommentRowForReply(card, reply) {
          const rows = Array.from(card.querySelectorAll("[data-feed-comment-row]"));
          if (reply && reply.commentId) {
            const byId = rows.find((row) => (row.dataset.feedCommentId || row.dataset.commentId) === reply.commentId);
            if (byId) return byId;
          }
          const rowIndex = reply && Number.isFinite(Number(reply.rowIndex)) ? Number(reply.rowIndex) : -1;
          return rowIndex >= 0 ? rows[rowIndex] : null;
        }
        function feedCommentFromDomRow(row, rowIndex) {
          const likesText = row.querySelector("[data-feed-comment-likes]") && row.querySelector("[data-feed-comment-likes]").textContent || "";
          const dislikesText = row.querySelector("[data-feed-comment-dislikes]") && row.querySelector("[data-feed-comment-dislikes]").textContent || "";
          const text = row.querySelector("[data-feed-comment-text]") && row.querySelector("[data-feed-comment-text]").textContent || "";
          if (!text) return null;
          const own = row.hasAttribute("data-feed-comment-owned");
          const actor = currentFeedCommentActor();
          const commentId = row.dataset.feedCommentId || row.dataset.commentId || "";
          const replies = [];
          row.querySelectorAll("[data-feed-comment-reply-row]").forEach((replyRow) => {
            const record = feedCommentReplyFromDomRow(replyRow, rowIndex, commentId);
            if (!record) return;
            const key = feedReplyIdentityKey(record);
            if (replies.some((saved) => feedReplyIdentityKey(saved) === key)) return;
            replies.push(record);
          });
          return {
            id: commentId,
            commentId,
            name: row.dataset.feedCommentName || actor.name,
            text,
            likes: Number((likesText.match(/\d+/) || ["0"])[0]) || 0,
            dislikes: Number((dislikesText.match(/\d+/) || ["0"])[0]) || 0,
            liked: !!(row.querySelector("[data-feed-comment-like]") && row.querySelector("[data-feed-comment-like]").classList.contains("is-active")),
            disliked: !!(row.querySelector("[data-feed-comment-dislike]") && row.querySelector("[data-feed-comment-dislike]").classList.contains("is-active")),
            own,
            mine: own,
            role: actor.role,
            actorType: actor.role,
            photo: actor.photo,
            photoRef: actor.photoRef,
            href: actor.href,
            createdAt: row.dataset.feedCommentCreatedAt || new Date().toISOString(),
            replies
          };
        }
        function syncFeedCommentsFromDom(card) {
          if (!card || !card.dataset.feedId) return;
          const state = readFeedActionState();
          const current = Object.assign({}, state[card.dataset.feedId] || {});
          current.comments = Array.from(card.querySelectorAll("[data-feed-comment-row]")).map((row, rowIndex) => feedCommentFromDomRow(row, rowIndex)).filter(Boolean);
          current.replies = [];
          state[card.dataset.feedId] = current;
          writeFeedActionState(state);
        }
        function mergedFeedStateForCard(card) {
          if (window.emyDetailFeedStateForCard && typeof window.emyDetailFeedStateForCard === "function") {
            try {
              const merged = window.emyDetailFeedStateForCard(card);
              if (merged && typeof merged === "object") return merged;
            } catch (error) {}
          }
          return readFeedActionState()[card.dataset.feedId] || {};
        }
        function feedCommentIdentity(comment) {
          const id = String(comment && (comment.id || comment.commentId || comment.replyId) || "").trim();
          if (id) return "id:" + id.toLowerCase();
          return [String(comment && comment.name || "").trim().toLowerCase(), String(comment && comment.text || "").trim().toLowerCase()].join("|");
        }
        function feedCommentKeysRendered(list) {
          const seen = new Set();
          if (!list) return seen;
          list.querySelectorAll("[data-feed-comment-row]").forEach((row) => {
            const id = String(row.dataset.feedCommentId || row.dataset.commentId || "").trim();
            if (id) seen.add("id:" + id.toLowerCase());
            else {
              const name = String(row.dataset.feedCommentName || (row.querySelector("strong") && row.querySelector("strong").textContent) || "").trim().toLowerCase();
              const text = String(row.querySelector("[data-feed-comment-text]") && row.querySelector("[data-feed-comment-text]").textContent || "").trim().toLowerCase();
              if (name || text) seen.add(name + "|" + text);
            }
          });
          return seen;
        }
        function feedCommentThreadsForCard(card, state) {
          if (window.emyDetailCommentsForCard && typeof window.emyDetailCommentsForCard === "function") {
            try {
              const rows = window.emyDetailCommentsForCard(card);
              if (Array.isArray(rows)) return rows;
            } catch (error) {}
          }
          return Array.isArray(state && state.comments) ? state.comments : [];
        }
        function mergeStoredFeedCommentsIntoList(card, commentsList, state) {
          if (!commentsList || !state) return;
          const seen = feedCommentKeysRendered(commentsList);
          feedCommentThreadsForCard(card, state).forEach((comment) => {
            if (!comment || !comment.text) return;
            const key = feedCommentIdentity(comment);
            if (seen.has(key)) return;
            commentsList.insertAdjacentHTML("beforeend", renderComment(Object.assign({}, comment, { name: comment.name || currentCustomerName(), likes: comment.likes || 0, dislikes: comment.dislikes || 0, liked: !!comment.liked, disliked: !!comment.disliked, replies: comment.replies || [] }), card));
            seen.add(key);
          });
        }
        function appendFeedReplyState(card, row, text, replyRecord) {
          if (!card || !card.dataset.feedId || !row || !text) return;
          const rows = Array.from(card.querySelectorAll("[data-feed-comment-row]"));
          const rowIndex = rows.indexOf(row);
          if (rowIndex < 0) return;
          const state = readFeedActionState();
          const current = Object.assign({}, state[card.dataset.feedId] || {});
          const actor = currentFeedCommentActor();
          const reply = Object.assign({
            id: "reply-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
            rowIndex,
            commentId: row.dataset.feedCommentId || row.dataset.commentId || "",
            name: actor.name,
            text,
            own: true,
            mine: true,
            role: actor.role,
            actorType: actor.role,
            photo: actor.photo,
            photoRef: actor.photoRef,
            href: actor.href,
            createdAt: new Date().toISOString()
          }, replyRecord || {});
          const key = feedReplyIdentityKey(reply);
          current.replies = (current.replies || []).filter((saved) => feedReplyIdentityKey(saved) !== key).concat(reply);
          state[card.dataset.feedId] = current;
          writeFeedActionState(state);
          return reply;
        }
        function savedFeedRecord(card) {
          const data = card && card.dataset ? card.dataset : {};
          const kind = data.detailKind || "Feed";
          const title = data.detailTitle || "Feed update";
          const business = data.detailBusiness || "Business";
          const fallbackId = String([kind, business, title].join("-")).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "saved-feed-item";
          const kindText = String(kind || "").toLowerCase();
          return {
            id: data.feedId || fallbackId,
            kind,
            title,
            business,
            href: kindText.includes("product") ? "emy-customer-search.html#products" : kindText.includes("clip") ? "emy-customer-home.html#reels" : "emy-customer-home.html#feeds",
            savedAt: new Date().toISOString()
          };
        }
        function setSavedFeedItem(card, active) {
          try {
            let saved = JSON.parse(localStorage.getItem(savedFeedItemsKey) || "{}");
            if (!saved || typeof saved !== "object" || Array.isArray(saved)) saved = {};
            const record = savedFeedRecord(card);
            if (!record.id) return;
            if (active) saved[record.id] = record;
            else delete saved[record.id];
            localStorage.setItem(savedFeedItemsKey, JSON.stringify(saved));
          } catch (error) {}
        }
        function applyFeedState(card) {
          if (!card || !card.dataset.feedId) return;
          const localState = mergedFeedStateForCard(card);
          const centralState = window.emyEngagement && typeof window.emyEngagement.stateForCard === "function" ? window.emyEngagement.stateForCard(card) : {};
          const state = Object.assign({}, localState, centralState || {});
          const likedActive = window.emyEngagement && typeof window.emyEngagement.actionActiveForCurrent === "function" ? window.emyEngagement.actionActiveForCurrent(state, "like") : !!state.liked;
          const savedActive = window.emyEngagement && typeof window.emyEngagement.actionActiveForCurrent === "function" ? window.emyEngagement.actionActiveForCurrent(state, "save") : !!state.saved;
          if (state.hidden) card.hidden = true;
          if (window.emyApplyFeedEditPatch) window.emyApplyFeedEditPatch(card, state, { setVisibleText: setFeedCardVisibleText });
          else if (state.editedTitle || state.editedText) setFeedCardVisibleText(card, state.editedTitle || card.dataset.detailTitle || "", state.editedText || card.dataset.detailDescription || "");
          const likeButton = card.querySelector("[data-feed-like]");
          const saveButton = card.querySelector("[data-feed-save], .social-feed-save, [data-heart]");
          const stat = card.querySelector("[data-feed-stat]");
          const commentsList = card.querySelector("[data-feed-comments-list]");
          if (likeButton) {
            likeButton.classList.toggle("is-active", likedActive);
            likeButton.setAttribute("aria-label", likedActive ? "Liked" : "Like");
          }
          if (likeButton && likeButton.classList.contains("reel-inline-action") && state.inlineLikeText) {
            const countNode = likeButton.querySelector("[data-reel-like-count]");
            const savedCount = readEngagementCount(String(state.inlineLikeText));
            if (countNode) setEngagementCountText(countNode, savedCount);
          }
          if (saveButton) {
            saveButton.classList.toggle("is-active", savedActive);
            saveButton.classList.toggle("is-liked", savedActive);
            saveButton.setAttribute("aria-pressed", savedActive ? "true" : "false");
            saveButton.setAttribute("aria-label", savedActive ? "Saved" : "Save");
            if (saveButton.classList.contains("reel-inline-action") && !saveButton.querySelector("svg")) saveButton.innerHTML = socialIcon("save");
          }
          updateFeedRepostCount(card);
          const savedCount = card.querySelector("[data-product-saved-count]");
          if (savedCount && state.savedCount !== undefined) setEngagementCountText(savedCount, state.savedCount);
          if (stat && state.statText) stat.textContent = state.statText;
          updateFeedRepostCount(card);
          if (commentsList && !commentsList.dataset.feedStateApplied) {
            feedCommentThreadsForCard(card, state).forEach((comment) => {
              if (comment && comment.text) commentsList.insertAdjacentHTML("beforeend", renderComment(Object.assign({}, comment, { name: comment.name || currentCustomerName(), likes: comment.likes || 0, dislikes: comment.dislikes || 0, liked: !!comment.liked, disliked: !!comment.disliked, replies: comment.replies || [] }), card));
            });
            commentsList.dataset.feedStateApplied = "true";
          } else if (commentsList) {
            mergeStoredFeedCommentsIntoList(card, commentsList, state);
          }
          syncFeedCountedFooter(card);
          if (window.emyEngagement && typeof window.emyEngagement.syncCard === "function") window.emyEngagement.syncCard(card);
        }
        function syncFeedState(root = feedList) {
          if (!root) return;
          root.querySelectorAll("[data-feed-id]").forEach(applyFeedState);
        }
        function ensureFeedActionIcons(root = feedList) {
          if (!root) return;
          root.querySelectorAll(".reel-inline-action[data-feed-save]").forEach((button) => {
            if (!button.querySelector("svg")) button.innerHTML = socialIcon("save");
          });
          root.querySelectorAll(".reel-inline-action[data-feed-share]").forEach((button) => {
            if (!button.querySelector("svg")) button.innerHTML = socialIcon("share");
          });
          root.querySelectorAll(".reel-inline-action[data-feed-like]").forEach((button) => {
            if (button.querySelector("svg")) return;
            const count = readEngagementCount(button);
            button.innerHTML = socialIcon("like") + '<span data-reel-like-count data-raw-count="' + count + '">' + formatEngagementCount(count) + '</span>';
          });
        }
        function businessLikeCount(item) {
          const match = String(item.stats || "").match(/(\\d+(?:\\.\\d+)?\\s*[kKmM]?)\\s*likes?/i);
          return match ? readEngagementCount(match[1]) : Math.max(0, Number(item.likeCount) || 0);
        }
        function renderFeedBusinessProfileCard(item, index) {
          const href = profileHrefFor(item);
          const detailKind = "Business";
          const displayTime = feedItemTimeLabel(item, "Open now");
          const detailMeta = [item.tag || "New business", displayTime, item.status || "Online and available"].filter(Boolean).join("|");
          const media = item.media || "profile-video";
          const title = item.title || item.business || "Business";
          const description = item.text || "A local business update is ready.";
          const address = item.address || item.location || "Nearby business";
          const status = item.status || "Online and available";
          const category = item.category || "Retail";
          const insight = item.insight || "Insights";
          const hours = item.hours || "Every day - 9:00 AM - 5:00 PM";
          const duration = item.duration || "0:11";
          const likeCount = businessLikeCount(item);
          const customerText = item.customer ? "Customer" : "Become a customer";
          const initial = (item.business || title || "B").trim().charAt(0).toUpperCase() || "B";
          const mediaInner = item.video
            ? '<video src="' + escapeHtml(item.video) + '" muted playsinline></video>'
            : item.image
              ? '<img src="' + escapeHtml(item.image) + '" alt="" />'
              : "";
          const avatarInner = item.avatarImage ? '<img src="' + escapeHtml(item.avatarImage) + '" alt="" />' : escapeHtml(initial);
          return '<article class="feed-business-profile-card home-flow-item is-business" data-card data-feed-id="' + escapeHtml(item.id) + '" data-business-key="' + escapeHtml(item.key) + '" data-detail-kind="' + escapeHtml(detailKind) + '" data-detail-title="' + escapeHtml(title) + '" data-detail-description="' + escapeHtml(description) + '" data-detail-business="' + escapeHtml(item.business || title) + '" data-detail-price="" data-detail-media="' + escapeHtml(media) + '" data-detail-meta="' + escapeHtml(detailMeta) + '">' +
            '<a class="feed-business-profile-cover ' + escapeHtml(media) + '" href="' + escapeHtml(href) + '" data-business-link="' + escapeHtml(item.key) + '">' + mediaInner + '<span class="feed-business-profile-badge">' + escapeHtml(item.tag || "New business") + '</span><span class="feed-business-profile-pill">Profile</span><span class="feed-business-profile-pause" aria-hidden="true">II</span><span class="feed-business-profile-avatar">' + avatarInner + '</span><span class="feed-business-profile-duration">' + escapeHtml(duration) + '</span></a>' +
            '<div class="feed-business-profile-body"><h3>' + escapeHtml(title) + '</h3><p class="feed-business-profile-copy">' + escapeHtml(description) + '</p><div class="feed-business-profile-status">' + escapeHtml(status) + '</div><div class="feed-business-profile-address">' + escapeHtml(address) + '</div><div class="feed-business-profile-chips"><span>' + escapeHtml(category) + '</span><span>' + escapeHtml(insight) + '</span></div><div class="feed-business-profile-hours">' + escapeHtml(hours) + '</div><div class="feed-business-profile-actions"><button class="feed-action feed-business-profile-customer' + (item.customer ? ' is-active' : '') + '" type="button" data-feed-customer>' + escapeHtml(customerText) + '</button></div></div>' +
            feedCountedActionFooter(formatEngagementCount(likeCount) + ' like' + (likeCount === 1 ? '' : 's'), "", 0, feedFooterTimeLabel(item, "Open now")) +
            '<div class="feed-comments"><div data-feed-comments-list></div><form class="feed-comment-form" data-feed-comment-form><input type="text" placeholder="Add a comment..." aria-label="Write a comment" /><button type="submit">Post</button></form></div>' +
          '</article>';
        }
        function renderFeedJobCard(item, index) {
          const business = item.business || currentCustomerName();
          const title = item.jobTitle || item.title || "Help wanted";
          const description = item.text || item.description || "This business is hiring.";
          const previewText = feedPreviewIntro(item.feedIntro || item.intro || item.summary || item.shareText || "", description, "This business is hiring.");
          const location = item.jobLocation || item.location || "Location to confirm";
          const workplace = item.workplace || "On-site";
          const employment = item.employment || "Flexible";
          const experience = item.experience || "Open to applicants";
          const apply = item.apply || "Message this business on EMY";
          const notes = item.notes || "Details in the post";
          const applicants = Math.max(0, Number(item.applicants) || Number((String(item.stats || "").match(/\\d+/) || ["0"])[0]) || 0);
          const businessKey = item.key || item.businessKey || "customer-profile";
          const ownerMenu = feedItemOwned(item);
          const initials = business.trim().charAt(0).toUpperCase() || "B";
          const ownerProfileHref = ownerMenu ? "emy-customer-profile.html" : "emy-business-profile.html?business=" + encodeURIComponent(businessKey);
          const ownerBusinessAttr = ownerMenu ? "" : ' data-business-link="' + escapeHtml(businessKey) + '"';
          const avatarSrc = feedCustomerAvatarSrc(item, ownerMenu);
          const avatarRef = feedCustomerAvatarRef(item, ownerMenu);
          const avatarImg = "";
          const avatarHtml = "";
          const jobBusinessAvatar = "";
          const displayTime = feedItemTimeLabel(item, "Time saved");
          const feedDisplayTime = displayTime === "Time saved" ? "Just now" : displayTime;
          const meta = [feedDisplayTime, location, employment].filter(Boolean).join("|");
          const ownerTools = "";
          const coverSrc = item.coverRef || item.jobCoverRef || item.mediaRef ? "" : (item.coverSrc || item.jobCoverSrc || item.mediaSrc || item.image || item.video || "");
          const coverRef = item.coverRef || item.jobCoverRef || item.mediaRef || "";
          const coverType = item.coverType || item.jobCoverType || item.mediaType || (item.video ? "video" : (coverSrc || coverRef ? "image" : ""));
          const coverPosterRef = mediaPosterRef(item);
          const coverPosterSrc = coverPosterRef ? "" : mediaPosterSrc(item);
          const coverAttrs = (coverSrc ? ' src="' + escapeHtml(coverSrc) + '"' : '') + (coverRef ? ' data-emy-media-ref="' + escapeHtml(coverRef) + '"' : '') + (coverType === "video" && coverPosterSrc ? ' poster="' + escapeHtml(coverPosterSrc) + '"' : '') + (coverType === "video" && coverPosterRef ? ' data-emy-poster-ref="' + escapeHtml(coverPosterRef) + '"' : '');
          const coverHtml = coverSrc || coverRef ? (coverType === "video" ? '<video class="feed-job-cover-media" data-emy-job-cover-media' + coverAttrs + ' muted playsinline preload="metadata"></video>' : '<img class="feed-job-cover-media" data-emy-job-cover-media' + coverAttrs + ' alt="" />') : "";
          return '<article class="feed-card social-feed-card social-feed-job-card is-job' + (ownerMenu ? ' is-user-post' : '') + '" data-card data-feed-id="' + escapeHtml(item.id || ("job-" + index)) + '" data-business-key="' + escapeHtml(businessKey) + '" data-detail-kind="Job" data-detail-title="' + escapeHtml(title) + '" data-detail-description="' + escapeHtml(description) + '" data-feed-intro="' + escapeHtml(previewText) + '" data-detail-business="' + escapeHtml(business) + '" data-detail-price="" data-detail-media="' + escapeHtml(coverHtml ? "feed" : "") + '" data-detail-media-src="' + escapeHtml(coverSrc) + '" data-detail-media-ref="' + escapeHtml(coverRef) + '" data-detail-media-type="' + escapeHtml(coverType) + '" data-detail-poster-src="' + escapeHtml(coverPosterSrc) + '" data-detail-poster-ref="' + escapeHtml(coverPosterRef) + '" data-detail-meta="' + escapeHtml(meta) + '" data-job-location="' + escapeHtml(location) + '" data-job-workplace="' + escapeHtml(workplace) + '" data-job-employment="' + escapeHtml(employment) + '" data-job-experience="' + escapeHtml(experience) + '" data-job-apply="' + escapeHtml(apply) + '" data-job-notes="' + escapeHtml(notes) + '" data-job-applicants="' + escapeHtml(String(applicants)) + '">' +
            '<div class="social-feed-head">' + avatarHtml + '<a class="social-feed-name feed-profile-link" href="' + escapeHtml(ownerProfileHref) + '"' + ownerBusinessAttr + '><strong>' + escapeHtml(business) + '</strong><small>' + escapeHtml(feedDisplayTime) + ' - Hiring</small></a><button class="social-feed-more feed-action" type="button" data-feed-options aria-label="More options" aria-expanded="false">...</button></div>' + feedOptionsMenu("job", ownerMenu) +
            '<div class="feed-job-card' + (coverHtml ? ' has-cover' : '') + '"><div class="feed-job-hero' + (coverHtml ? ' has-cover' : '') + '">' + coverHtml + '<span>Job</span><strong>' + escapeHtml(title) + '</strong></div><div class="feed-job-body"><div class="feed-job-business"><span>' + escapeHtml(business) + '</span></div><p class="feed-job-desc">' + escapeHtml(previewText) + '</p><div class="feed-job-meta"><span><b>Location</b>' + escapeHtml(location) + '</span><span><b>Workplace</b>' + escapeHtml(workplace) + '</span><span><b>Type</b>' + escapeHtml(employment) + '</span><span><b>Pay / notes</b>' + escapeHtml(notes) + '</span></div><div class="feed-job-actions"><button class="feed-job-apply" type="button" data-feed-job-apply>' + socialIcon("apply") + 'Apply with CV</button><span class="feed-job-count" data-feed-job-applicants>' + applicants + ' applicants</span>' + ownerTools + '</div></div></div>' +
            feedCountedActionFooter("0 likes", "", 0, feedDisplayTime) +
            '<div class="feed-comments"><div data-feed-comments-list></div><form class="feed-comment-form" data-feed-comment-form><input type="text" placeholder="Ask about this role..." aria-label="Write a comment" /><button type="submit">Post</button></form></div>' +
          '</article>';
        }
        function mediaEditStyle(item) {
          const settings = item && item.mediaSettings ? item.mediaSettings : {};
          const fit = settings.fit || "contain";
          const zoom = Number(settings.zoom) || 1;
          const x = Number(settings.x) || 0;
          const y = Number(settings.y) || 0;
          const overlayX = Number(settings.overlayX) || 50;
          const overlayY = Number(settings.overlayY) || 84;
          const aspect = settings.aspect && settings.aspect !== "auto" ? settings.aspect : (settings.naturalAspect || "1 / 1");
          return ' style="--media-fit:' + escapeHtml(fit) + ';--media-zoom:' + escapeHtml(zoom) + ';--media-x:' + escapeHtml(x) + '%;--media-y:' + escapeHtml(y) + '%;--media-aspect-ratio:' + escapeHtml(aspect) + ';--overlay-x:' + escapeHtml(overlayX) + '%;--overlay-y:' + escapeHtml(overlayY) + '%;"';
        }
        function mediaOverlayHtml(item) {
          const overlay = item && (item.mediaOverlay || (item.mediaSettings && item.mediaSettings.overlay)) || "";
          return overlay ? '<span class="emy-media-overlay-text">' + escapeHtml(overlay) + '</span>' : "";
        }
        function mediaPosterSrc(item, mediaItem) {
          const settings = (mediaItem && mediaItem.settings) || (item && item.mediaSettings) || {};
          return String((mediaItem && (mediaItem.posterSrc || mediaItem.thumbnailSrc)) || (item && (item.posterSrc || item.thumbnailSrc || item.coverPosterSrc || item.eventCoverPosterSrc || item.jobCoverPosterSrc)) || settings.posterSrc || settings.thumbnailSrc || "");
        }
        function mediaPosterRef(item, mediaItem) {
          const settings = (mediaItem && mediaItem.settings) || (item && item.mediaSettings) || {};
          return String((mediaItem && (mediaItem.posterRef || mediaItem.thumbnailRef)) || (item && (item.posterRef || item.thumbnailRef || item.coverPosterRef || item.eventCoverPosterRef || item.jobCoverPosterRef)) || settings.posterRef || settings.thumbnailRef || "");
        }
        function feedStatNumber(item, label) {
          const match = String(item && item.stats || "").match(new RegExp("(\\\\d+)\\\\s*" + label + "s?", "i"));
          return match ? Number(match[1]) : 0;
        }
        function feedLooksProductClip(item, marker) {
          if (!item || typeof item !== "object") return false;
          if (item.productClip === true || item.isProductClip === true || item.productClipDetails) return true;
          if (item.productName || item.productTitle || item.productDescription || item.productInfo || item.price || item.priceText) return true;
          const text = String([
            marker,
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
            item.text
          ].filter(Boolean).join(" ")).toLowerCase();
          return /product\s*clip|shared\s+a\s+product\s+clip|product\s+video|clip\s+product/.test(text);
        }
        function feedPriceHtml(value) {
          return escapeHtml(value || "").replace(/&amp;pound;/g, "&pound;");
        }
        function renderFeedClipReelCard(item, index, mediaRef, hasVideo, hasImage) {
          const price = item.price || item.priceText || "";
          const isProductClip = feedLooksProductClip(item, price);
          const business = item.business || currentCustomerName();
          const media = item.media || "feed";
          const clipTitle = isProductClip ? (item.productTitle || item.productName || item.title || "Product") : (item.title || "New clip");
          const clipDescription = isProductClip ? (item.productDescription || item.productText || item.text || "Short product video from a nearby business.") : (item.text || item.description || item.title || "A short update is ready.");
          const clipCategory = item.productCategory || item.category || "";
          const clipAvailability = item.productAvailability || item.availability || item.stockStatus || "";
          const mediaSrc = hasVideo ? (mediaRef ? "" : feedContentMediaSrc(item.video || item.mediaSrc || "")) : hasImage ? (mediaRef ? "" : feedContentMediaSrc(item.image || item.mediaSrc || "")) : "";
          const mediaType = hasVideo ? "video" : hasImage ? "image" : "";
          const mediaStateClass = mediaType ? ' has-' + escapeHtml(mediaType) + '-media' : "";
          const posterRef = mediaPosterRef(item);
          const posterSrc = posterRef ? "" : mediaPosterSrc(item);
          const mediaHtml = hasVideo
            ? '<video' + (mediaSrc ? ' src="' + escapeHtml(mediaSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + escapeHtml(mediaRef) + '"' : '') + (posterSrc ? ' poster="' + escapeHtml(posterSrc) + '"' : '') + (posterRef ? ' data-emy-poster-ref="' + escapeHtml(posterRef) + '"' : '') + ' muted playsinline preload="metadata"></video>'
            : hasImage
              ? '<img' + (mediaSrc ? ' src="' + escapeHtml(mediaSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + escapeHtml(mediaRef) + '"' : '') + ' alt="" />'
              : "";
          const likes = feedStatNumber(item, "like");
          const baseViews = feedStatNumber(item, "view");
          const views = window.emySharedClipViewCountForItem ? window.emySharedClipViewCountForItem(item, item._sourceKey || item.sourceKey || item.storageKey || item.key || item.businessKey || item.id || "", baseViews) : baseViews;
          const duration = item.duration || item.timeLeft || "0:31 left";
          const priceHtml = feedPriceHtml(price);
          const productPanel = (clipTitle || clipDescription || price) ? '<div class="clip-product-mini' + (price ? '' : ' is-info') + '" data-clip-product-mini><strong>' + escapeHtml(clipTitle || (isProductClip ? "Product" : "Clip")) + '</strong>' + (price ? '<span class="clip-product-mini-price">' + priceHtml + '</span>' : (clipDescription ? '<em>' + escapeHtml(clipDescription) + '</em>' : '')) + '</div>' : "";
          const ownerKey = item.key || (item.my ? "customer-profile" : "");
          const ownerMenu = feedItemOwned(item);
          const ownerProfileHref = item.profileHref || (ownerMenu ? "emy-customer-profile.html" : "emy-business-profile.html?business=" + encodeURIComponent(ownerKey || business));
          const ownerBusinessAttr = (item.profileHref || ownerMenu) ? "" : ' data-business-link="' + escapeHtml(ownerKey || business) + '"';
          const avatarOwnsCustomer = ownerMenu || item.key === "customer-profile" || item.businessKey === "customer-profile" || item.owner === "customer" || item.actorType === "customer" || item.accountType === "customer" || item.createdAs === "customer" || item.profileHref === "emy-customer-profile.html" || String(item.profileHref || "").toLowerCase().indexOf("emy-customer-profile") !== -1;
          const avatarSrc = feedCustomerAvatarSrc(item, avatarOwnsCustomer);
          const avatarRef = feedCustomerAvatarRef(item, avatarOwnsCustomer);
          const avatarInitial = (String(business || currentCustomerName() || "B").trim().charAt(0) || "B").toUpperCase();
          const displayTime = feedItemTimeLabel(item, "Time saved");
          const feedDisplayTime = displayTime === "Time saved" ? "Just now" : displayTime;
          return '<article class="card reel-card ' + (isProductClip ? 'feed-product-clip-card' : 'feed-clip-card') + ' is-clip' + mediaStateClass + (ownerMenu ? ' is-user-post' : '') + '" data-card data-feed-id="' + escapeHtml(item.id || ("feed-clip-" + index)) + '" data-business-key="' + escapeHtml(item.key || "") + '" data-detail-kind="' + (isProductClip ? 'Product Clip' : 'Clip') + '" data-detail-title="' + escapeHtml(clipTitle) + '" data-detail-description="' + escapeHtml(clipDescription) + '" data-detail-business="' + escapeHtml(business) + '" data-detail-price="' + escapeHtml(price) + '" data-product-name="' + escapeHtml(isProductClip ? clipTitle : "") + '" data-product-title="' + escapeHtml(isProductClip ? clipTitle : "") + '" data-product-description="' + escapeHtml(isProductClip ? clipDescription : "") + '" data-product-category="' + escapeHtml(isProductClip ? clipCategory : "") + '" data-product-availability="' + escapeHtml(isProductClip ? clipAvailability : "") + '" data-detail-media="' + escapeHtml(media) + '" data-detail-media-src="' + escapeHtml(mediaSrc) + '" data-detail-media-ref="' + escapeHtml(mediaRef) + '" data-detail-media-type="' + escapeHtml(mediaType) + '" data-detail-poster-src="' + escapeHtml(posterSrc) + '" data-detail-poster-ref="' + escapeHtml(posterRef) + '" data-detail-meta="' + escapeHtml([likes + " like" + (likes === 1 ? "" : "s"), views + " views", duration].join("|")) + '">' +
            '<div class="photo ' + escapeHtml(media) + '"' + mediaEditStyle(item) + '>' + mediaHtml + mediaOverlayHtml(item) + '</div>' +
            '<div class="reel-top">' + feedPosterAvatarHtml("reel-avatar", media, { src: avatarSrc, ref: avatarRef, initial: avatarInitial, href: ownerProfileHref, linkAttr: ownerBusinessAttr, label: business }) + '<a class="feed-profile-link reel-owner-link" href="' + escapeHtml(ownerProfileHref) + '"' + ownerBusinessAttr + '><strong>' + escapeHtml(business) + '</strong><small>' + (isProductClip ? 'Product Clip' : 'Business Clip') + '</small></a><span class="reel-type-badge">' + (isProductClip ? 'Product' : 'Clip') + '</span></div>' +
            '<button class="social-feed-more feed-action" type="button" data-feed-options aria-label="More options" aria-expanded="false">...</button>' + feedOptionsMenu(isProductClip ? "product" : "clip", ownerMenu) +
            '<span class="reel-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span>' +
            '<div class="caption"><div class="reel-actions"><span data-clip-view-count>' + views + ' views</span></div>' + productPanel + '</div>' +
            feedCountedActionFooter(likes + " like" + (likes === 1 ? "" : "s"), "", 0, feedDisplayTime) +
            '<div class="feed-comments"><div data-feed-comments-list></div><form class="feed-comment-form" data-feed-comment-form><input type="text" placeholder="Add a comment..." aria-label="Write a comment" /><button type="submit">Post</button></form></div>' +
          '</article>';
        }
        function renderRepostFeedCard(item, index) {
          const original = item.original || {};
          const originalBusiness = original.business || "Business";
          const originalOwned = original.key === "customer-profile" || original.businessKey === "customer-profile" || original.owner === "customer" || original.isUserPost === true || String(originalBusiness || "").trim().toLowerCase() === currentCustomerName().trim().toLowerCase() || String(originalBusiness || "").trim().toLowerCase() === "stephane";
          const originalKey = original.key || original.businessKey || (originalOwned ? "customer-profile" : "");
          const originalTitle = original.title || "Feed update";
          const originalText = original.text || "";
          const originalPrice = original.price || original.priceText || original.productPrice || "";
          const originalKindRaw = original.detailKind || original.kind || original.type || "Post";
          const originalKindText = [originalKindRaw, original.meta, original.tag, original.category, original.productName, original.productTitle, original.productInfo, original.productDescription, originalPrice].join(" ");
          const originalKind = /clip/i.test(originalKindRaw)
            ? (/product/i.test(originalKindText) || originalPrice ? "Product Clip" : "Clip")
            : (/product/i.test(originalKindText) || originalPrice ? "Product" : originalKindRaw);
          const originalHref = originalKey === "customer-profile" ? "emy-customer-profile.html" : originalKey ? "emy-business-profile.html?business=" + encodeURIComponent(originalKey) : "emy-customer-home.html#feeds";
          const repostCommentItems = item.comments || [];
          const comments = repostCommentItems.map((comment) => renderComment(comment, item)).join("");
          const commentCount = repostCommentItems.length;
          const repostThought = item.repostThought || item.thought || "";
          const actor = feedRepostActor(item);
          const actorOwned = actor.type === "customer";
          const note = '<span class="social-feed-repost-note">' + escapeHtml(actor.name) + ' reposted</span>';
          const thought = repostThought ? '<p class="social-feed-caption"><strong>' + escapeHtml(actor.name) + '</strong> <span>' + escapeHtml(repostThought) + '</span></p>' : "";
          const originalMediaClass = original.media || "feed";
          const originalMediaRef = original.mediaRef || "";
          const originalMediaSrc = originalMediaRef ? "" : (original.mediaSrc || "");
          const originalMediaType = original.mediaType || "";
          const originalAvatarLookup = { businessKey: originalKey, key: originalKey, business: originalBusiness, businessName: originalBusiness, original };
          const originalAvatarLookupRef = typeof feedBusinessAvatarMediaForItem === "function" ? feedBusinessAvatarMediaForItem(originalAvatarLookup, "ref") : "";
          const originalAvatarLookupSrc = typeof feedBusinessAvatarMediaForItem === "function" ? feedBusinessAvatarMediaForItem(originalAvatarLookup, "src") : "";
          const originalUsesCurrentBusinessAvatar = feedItemMatchesCurrentBusiness(originalAvatarLookup) || feedItemMatchesCurrentBusiness(original);
          const originalAvatarRef = originalUsesCurrentBusinessAvatar && originalAvatarLookupRef ? originalAvatarLookupRef : original.avatarRef || original.profilePhotoRef || original.businessPhotoRef || original.photoRef || originalAvatarLookupRef || "";
          const originalAvatarSrc = originalUsesCurrentBusinessAvatar ? originalAvatarLookupSrc : originalAvatarRef ? "" : (original.avatarSrc || original.profilePhoto || original.businessPhoto || original.photo || originalAvatarLookupSrc || "");
          const originalPosterRef = original.posterRef || original.thumbnailRef || (original.mediaSettings && (original.mediaSettings.posterRef || original.mediaSettings.thumbnailRef)) || "";
          const originalPosterSrc = originalPosterRef ? "" : (original.posterSrc || original.thumbnailSrc || (original.mediaSettings && (original.mediaSettings.posterSrc || original.mediaSettings.thumbnailSrc)) || "");
          const hasQuoteMedia = !!(originalMediaSrc || originalMediaRef || (originalMediaClass && originalMediaClass !== "feed") || /clip|product|photo|image|video/i.test(originalKind));
          const quoteMedia = hasQuoteMedia
            ? '<span class="social-feed-quote-media feed-media ' + escapeHtml(originalMediaClass) + '">' + (originalMediaType === "video" ? '<video' + (originalMediaSrc ? ' src="' + escapeHtml(originalMediaSrc) + '"' : '') + (originalMediaRef ? ' data-emy-media-ref="' + escapeHtml(originalMediaRef) + '"' : '') + (originalPosterSrc ? ' poster="' + escapeHtml(originalPosterSrc) + '"' : '') + (originalPosterRef ? ' data-emy-poster-ref="' + escapeHtml(originalPosterRef) + '"' : '') + ' muted playsinline preload="metadata"></video>' : (originalMediaSrc || originalMediaRef ? '<img' + (originalMediaSrc ? ' src="' + escapeHtml(originalMediaSrc) + '"' : '') + (originalMediaRef ? ' data-emy-media-ref="' + escapeHtml(originalMediaRef) + '"' : '') + ' alt="" />' : '')) + '</span>'
            : "";
          const quote = '<div class="social-feed-quote' + (originalOwned ? ' is-user-post' : '') + '" role="button" tabindex="0" data-card data-feed-id="' + escapeHtml(original.id || item.originalId || "") + '" data-original-feed-id="' + escapeHtml(original.id || item.originalId || "") + '" data-business-key="' + escapeHtml(originalKey || "") + '" data-detail-kind="' + escapeHtml(originalKind) + '" data-detail-title="' + escapeHtml(originalTitle) + '" data-detail-description="' + escapeHtml(originalText) + '" data-detail-business="' + escapeHtml(originalBusiness) + '" data-detail-avatar-src="' + escapeHtml(originalAvatarSrc) + '" data-detail-avatar-ref="' + escapeHtml(originalAvatarRef) + '" data-detail-price="' + escapeHtml(originalPrice) + '" data-detail-media="' + escapeHtml(originalMediaClass) + '" data-detail-media-src="' + escapeHtml(originalMediaSrc) + '" data-detail-media-ref="' + escapeHtml(originalMediaRef) + '" data-detail-media-type="' + escapeHtml(originalMediaType) + '" data-detail-poster-src="' + escapeHtml(originalPosterSrc) + '" data-detail-poster-ref="' + escapeHtml(originalPosterRef) + '" data-detail-duration="' + escapeHtml(original.duration || "") + '" data-detail-meta="' + escapeHtml(original.meta || originalKind) + '" data-article-body="' + escapeHtml(original.articleBody || originalText) + '" data-article-share="' + escapeHtml(original.articleShare || "") + '" data-article-read-time="' + escapeHtml(original.articleReadTime || "") + '"><span class="social-feed-quote-head"><strong>' + escapeHtml(originalBusiness) + '</strong><span>' + escapeHtml(originalKind) + '</span></span><span class="social-feed-quote-body"><span class="social-feed-quote-copy"><span class="social-feed-quote-title">' + escapeHtml(originalTitle) + '</span>' + (originalText ? '<span class="social-feed-quote-text">' + escapeHtml(originalText) + '</span>' : '') + (originalPrice ? '<span class="social-feed-quote-price">' + escapeHtml(originalPrice) + '</span>' : '') + '</span>' + quoteMedia + '</span></div>';
          const repostTime = feedItemTimeLabel(item, "Time saved");
          return '<article class="feed-card social-feed-card is-repost' + (actorOwned ? ' is-user-post' : '') + '" data-card data-feed-id="' + escapeHtml(item.id || ("repost-" + index)) + '" data-repost-original-id="' + escapeHtml(original.id || item.originalId || "") + '" data-original-feed-id="' + escapeHtml(original.id || item.originalId || "") + '" data-business-key="' + escapeHtml(actor.key) + '" data-owner="' + escapeHtml(actor.type) + '" data-repost-actor-type="' + escapeHtml(actor.type) + '" data-detail-kind="Repost" data-detail-title="' + escapeHtml(repostThought || originalTitle) + '" data-detail-description="' + escapeHtml(repostThought || originalText) + '" data-detail-business="' + escapeHtml(actor.name) + '" data-detail-price="" data-detail-media="' + escapeHtml(original.media || "feed") + '" data-detail-media-src="' + escapeHtml(original.mediaSrc || "") + '" data-detail-media-ref="' + escapeHtml(original.mediaRef || "") + '" data-detail-media-type="' + escapeHtml(original.mediaType || "") + '" data-detail-meta="' + escapeHtml("Repost|" + originalBusiness) + '">' +
            note +
            '<div class="social-feed-head">' + feedRepostActorAvatarHtml(actor) + '<a class="social-feed-name feed-profile-link" href="' + escapeHtml(actor.href) + '"><strong>' + escapeHtml(actor.name) + '</strong><small>' + escapeHtml(repostTime) + ' - Repost</small></a><button class="social-feed-more feed-action" type="button" data-feed-options aria-label="More options" aria-expanded="false">...</button></div>' + feedOptionsMenu("post", actorOwned) +
            feedCountedActionFooter("0 likes", thought + quote, commentCount, repostTime) +
            '<div class="feed-comments"><div data-feed-comments-list>' + comments + '</div><form class="feed-comment-form" data-feed-comment-form><input type="text" placeholder="Add a comment..." aria-label="Write a comment" /><button type="submit">Post</button></form></div>' +
          '</article>';
        }
        function renderSocialFeedCard(item, index) {
          const rawType = item.type || "post";
          if (rawType === "repost") return renderRepostFeedCard(item, index);
          const mediaItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(item) : [];
          const firstMediaItem = mediaItems[0] || null;
          const clipMediaMarker = String([item.mediaType, item.type, item.kind, item.tag, item.postMode, item.createType, item.clipKind, item.reelKind, item.clipType, item.reelType].filter(Boolean).join(" ")).toLowerCase();
          const mediaRef = firstMediaItem ? feedContentMediaRef(firstMediaItem.ref) : feedContentMediaRef(item.mediaRef || item.videoRef || item.imageRef || item.coverRef || item.eventCoverRef || item.jobCoverRef || "");
          const hasVideo = firstMediaItem ? firstMediaItem.type === "video" : !!(item.video || item.videoRef || (mediaRef && (/video|clip|reel/.test(clipMediaMarker) || item.mediaType === "video")));
          const imageMarker = /photo|image|carousel/.test(clipMediaMarker);
          const hasImage = firstMediaItem ? firstMediaItem.type === "image" : !hasVideo && !!(item.image || item.coverSrc || item.eventCoverSrc || item.jobCoverSrc || (mediaRef && (imageMarker || item.mediaType === "image" || item.coverRef || item.eventCoverRef || item.jobCoverRef)));
          const isProductClip = rawType === "clip" && !!(item.price || item.priceText || item.productTitle || item.productName || item.productDescription || String(item.tag || "").toLowerCase().includes("product"));
          const profileHrefIsCustomer = String(item.profileHref || "").toLowerCase().indexOf("emy-customer-profile") !== -1;
          const isCustomerOwnedClip = item.key === "customer-profile" || profileHrefIsCustomer || item.isUserPost === true;
          const type = rawType;
          item.id = item.id || canonicalFeedId(type, item, index);
          if (type === "business" || type === "profile") return renderFeedBusinessProfileCard(item, index);
          if (type === "job" || type === "hiring") return renderFeedJobCard(item, index);
          if (type === "article") item.tag = item.tag || "Article";
          const detailKind = feedPostDetailKind(item, type);
          const cardTitle = feedGenericPostCaption(item.title) ? "" : (item.title || "");
          const cardText = feedGenericPostCaption(item.text) ? "" : (item.text || "");
          const detailPrice = item.price ? String(item.price).replace(/&pound;/g, "\u00a3") : "";
          const displayTime = feedItemTimeLabel(item, "Time saved");
          const feedDisplayTime = displayTime === "Time saved" ? "Just now" : displayTime;
          const detailMeta = [item.tag || "", feedDisplayTime, item.my ? "My Businesses" : "Nearby", item.stats || ""].filter(Boolean).join("|");
          const eventDetailRef = type === "event" ? feedContentMediaRef(item.coverRef || item.eventCoverRef || item.mediaRef || "") : "";
          const eventDetailSrc = type === "event" ? (eventDetailRef ? "" : feedContentMediaSrc(item.coverSrc || item.eventCoverSrc || item.mediaSrc || item.image || "")) : "";
          const detailMediaSrc = type === "event" ? eventDetailSrc : feedContentMediaSrc(firstMediaItem ? (firstMediaItem.ref && firstMediaItem.type === "video" ? "" : firstMediaItem.src) : (hasVideo ? (item.video || item.mediaSrc || "") : hasImage ? (item.image || item.mediaSrc || item.coverSrc || item.eventCoverSrc || item.jobCoverSrc || "") : ""));
          const detailMediaRef = type === "event" ? eventDetailRef : mediaRef;
          const detailMediaType = type === "event" ? (detailMediaSrc || detailMediaRef ? "image" : "") : firstMediaItem ? firstMediaItem.type : (hasVideo ? "video" : hasImage ? "image" : "");
          const detailPosterRef = mediaPosterRef(item, firstMediaItem);
          const detailPosterSrc = detailPosterRef ? "" : mediaPosterSrc(item, firstMediaItem);
          const mediaItemsAttr = mediaItems.length > 1 && window.emyFeedMediaItemsAttribute ? window.emyFeedMediaItemsAttribute(mediaItems) : "";
          const attrs = ' data-feed-id="' + escapeHtml(item.id) + '" data-business-key="' + escapeHtml(item.key || item.businessKey || "") + '" data-detail-kind="' + escapeHtml(detailKind) + '" data-detail-title="' + escapeHtml(cardTitle) + '" data-detail-description="' + escapeHtml(cardText) + '" data-detail-business="' + escapeHtml(item.business) + '" data-detail-price="' + escapeHtml(detailPrice) + '" data-detail-media="' + escapeHtml(type === "event" && (detailMediaSrc || detailMediaRef) ? "feed" : item.media) + '" data-detail-media-src="' + escapeHtml(detailMediaSrc) + '" data-detail-media-ref="' + escapeHtml(detailMediaRef) + '" data-detail-media-type="' + escapeHtml(detailMediaType) + '" data-detail-poster-src="' + escapeHtml(detailPosterSrc) + '" data-detail-poster-ref="' + escapeHtml(detailPosterRef) + '"' + (mediaItemsAttr ? ' data-detail-media-items="' + mediaItemsAttr + '"' : '') + ' data-detail-meta="' + escapeHtml(detailMeta) + '"';
          const commentItems = item.comments || defaultComments(item);
          const comments = commentItems.map((comment) => renderComment(comment, item)).join("");
          const commentCount = commentItems.length;
          const mediaInner = mediaItems.length > 1 && window.emyFeedMediaCarouselMarkup
            ? window.emyFeedMediaCarouselMarkup(mediaItems, { label:cardTitle || "Post media" })
            : hasVideo
            ? (window.emyVideoPlayerMarkup ? window.emyVideoPlayerMarkup(detailMediaSrc, item.title || "Video post", mediaRef, detailPosterSrc, detailPosterRef) : '<video' + (detailMediaSrc ? ' src="' + escapeHtml(detailMediaSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + escapeHtml(mediaRef) + '"' : '') + (detailPosterSrc ? ' poster="' + escapeHtml(detailPosterSrc) + '"' : '') + (detailPosterRef ? ' data-emy-poster-ref="' + escapeHtml(detailPosterRef) + '"' : '') + ' controls playsinline></video>')
            : hasImage
              ? '<img' + (detailMediaSrc ? ' src="' + escapeHtml(detailMediaSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + escapeHtml(mediaRef) + '"' : '') + ' alt="" />'
              : "";
          const isTextOnly = !!(!hasImage && !hasVideo && !mediaItems.length && !item.price && type === "post");
          const statText = item.stats || (type === "clip" ? "0 views" : "0 likes");
          const commentText = comments ? "View comments" : "Add a comment";
          const ownerMenu = feedItemOwned(item);
          const ownerHeadSuffix = ownerMenu ? (" - " + feedPostKindLabel(item, type)) : (item.my ? " - My Businesses" : " - Nearby");
          const avatarOwnsCustomer = ownerMenu || item.key === "customer-profile" || item.businessKey === "customer-profile" || item.owner === "customer" || item.actorType === "customer" || item.accountType === "customer" || item.createdAs === "customer" || item.profileHref === "emy-customer-profile.html" || String(item.profileHref || "").toLowerCase().indexOf("emy-customer-profile") !== -1;
          const avatarSrc = feedCustomerAvatarSrc(item, avatarOwnsCustomer);
          const avatarRef = feedCustomerAvatarRef(item, avatarOwnsCustomer);
          const avatarInitial = (String(item.business || currentCustomerName() || "B").trim().charAt(0) || "B").toUpperCase();
          const ownerKey = item.key || item.businessKey || String(item.business || "business").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "business";
          const ownerProfileHref = item.profileHref || (ownerMenu ? "emy-customer-profile.html" : "emy-business-profile.html?business=" + encodeURIComponent(ownerKey));
          const ownerBusinessAttr = (item.profileHref || ownerMenu) ? "" : ' data-business-link="' + escapeHtml(ownerKey) + '"';
          function socialFeedAvatarHtml(avatarMedia) {
            return feedPosterAvatarHtml("social-feed-avatar feed-avatar", avatarMedia, {
              src: avatarSrc,
              ref: avatarRef,
              initial: avatarInitial,
              href: ownerProfileHref,
              linkAttr: ownerBusinessAttr,
              label: item.business
            });
          }
          if (type === "event") {
            const eventType = item.eventType || item.tag || "Event";
            const eventWhen = item.eventWhen || "Date to confirm";
            const eventWhere = item.eventWhere || "Place to confirm";
            const eventPreviewText = feedPreviewIntro(item.feedIntro || item.intro || item.summary || item.shareText || "", item.text || item.description, "Event details will be shared soon.");
            const eventCover = item.coverSrc || item.eventCoverSrc || "";
            const eventCoverRef = item.coverRef || item.eventCoverRef || "";
            const hasEventCover = !!(eventCover || eventCoverRef);
            const eventCoverStyle = eventCover ? ' style="background-image:url(&quot;' + escapeHtml(eventCover) + '&quot;)"' : "";
            const eventCoverImage = hasEventCover ? '<img class="feed-event-card-cover-image" data-emy-event-card-cover' + (eventCover ? ' src="' + escapeHtml(eventCover) + '"' : '') + (eventCoverRef ? ' data-emy-media-ref="' + escapeHtml(eventCoverRef) + '"' : '') + ' alt="" />' : "";
            return '<article class="feed-card social-feed-card social-feed-event-card is-event' + (ownerMenu ? ' is-user-post' : '') + '"' + attrs + ' data-feed-intro="' + escapeHtml(eventPreviewText) + '" data-card>' +
              '<div class="social-feed-head">' + socialFeedAvatarHtml(item.media) + '<a class="social-feed-name feed-profile-link" href="' + escapeHtml(ownerProfileHref) + '"' + ownerBusinessAttr + '><strong>' + escapeHtml(item.business) + '</strong><small>' + escapeHtml(feedDisplayTime) + ' - Event</small></a><button class="social-feed-more feed-action" type="button" data-feed-options aria-label="More options" aria-expanded="false">...</button></div>' + feedOptionsMenu("event", ownerMenu) +
              '<div class="feed-event-post' + (hasEventCover ? ' has-cover' : '') + '"><div class="feed-event-post-hero"' + eventCoverStyle + '>' + eventCoverImage + '<span>' + escapeHtml(eventType) + '</span><strong>' + escapeHtml(item.title) + '</strong></div><div class="feed-event-post-details"><p>' + escapeHtml(eventPreviewText) + '</p><div class="feed-event-post-meta"><span><b>When</b>' + escapeHtml(eventWhen) + '</span><span><b>Where</b>' + escapeHtml(eventWhere) + '</span></div></div></div>' +
              feedCountedActionFooter(statText, "", commentCount, feedDisplayTime) +
              '<div class="feed-comments"><div data-feed-comments-list>' + comments + '</div><form class="feed-comment-form" data-feed-comment-form><input type="text" placeholder="Add a comment..." aria-label="Write a comment" /><button type="submit">Post</button></form></div>' +
            '</article>';
          }
          if (type === "article") {
            const articleCopy = item.shareText || item.description || item.text || "Article details will appear here.";
            const articleBody = item.articleBody || item.text || item.description || articleCopy;
            const readTime = item.readTime || Math.max(1, Math.ceil(articleBody.split(/\s+/).filter(Boolean).length / 180)) + " min read";
            const articleCover = mediaInner ? '<div class="feed-article-card-cover ' + escapeHtml(detailMediaType || "image") + '">' + mediaInner + '</div>' : "";
            return '<article class="feed-card social-feed-card social-feed-article-card is-article is-text-only' + (ownerMenu ? ' is-user-post' : '') + '"' + attrs + ' data-detail-description="' + escapeHtml(articleCopy) + '" data-article-body="' + escapeHtml(articleBody) + '" data-article-share="' + escapeHtml(item.shareText || "") + '" data-article-read-time="' + escapeHtml(readTime) + '" data-card>' +
              '<div class="social-feed-head">' + socialFeedAvatarHtml(item.media || "feed") + '<a class="social-feed-name feed-profile-link" href="' + escapeHtml(ownerProfileHref) + '"' + ownerBusinessAttr + '><strong>' + escapeHtml(item.business) + '</strong><small>' + escapeHtml(feedDisplayTime) + ' - Article</small></a><button class="social-feed-more feed-action" type="button" data-feed-options aria-label="More options" aria-expanded="false">...</button></div>' + feedOptionsMenu("article", ownerMenu) +
              '<div class="feed-article-card-body">' + articleCover + '<span>Article</span><h2>' + escapeHtml(item.title || "New article") + '</h2><p>' + escapeHtml(articleCopy) + '</p><div class="feed-article-card-meta"><small>' + escapeHtml(readTime) + '</small><small>' + escapeHtml(item.tag || "Published") + '</small></div></div>' +
              feedCountedActionFooter(statText, "", commentCount, feedDisplayTime) +
              '<div class="feed-comments"><div data-feed-comments-list>' + comments + '</div><form class="feed-comment-form" data-feed-comment-form><input type="text" placeholder="Add a comment..." aria-label="Write a comment" /><button type="submit">Post</button></form></div>' +
            '</article>';
          }
          if (type === "clip") return renderFeedClipReelCard(item, index, mediaRef, hasVideo, hasImage);
          if (type === "product") return renderLatestStyleCard(item, index);
          const priceChip = item.price ? '<span class="social-feed-product-price">' + item.price + '</span>' : "";
          const play = type === "clip" ? '<span class="social-feed-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span>' : "";
          const optionsKind = feedOptionsKind(type, hasImage, hasVideo, isTextOnly);
          const textPanelCopy = cardText || cardTitle || "";
          const mediaBlock = isTextOnly
            ? '<div class="social-feed-text-panel"><p>' + escapeHtml(textPanelCopy) + '</p></div>'
            : '<div class="feed-media social-feed-media ' + escapeHtml(item.media) + '"' + mediaEditStyle(item) + '>' + mediaInner + mediaOverlayHtml(item) + play + priceChip + '</div>';
          const captionCopy = cardText || (!feedGenericPostCaption(item.title) ? cardTitle : "");
          const captionHtml = isTextOnly ? "" : (captionCopy ? '<p class="social-feed-caption"><strong>' + escapeHtml(item.business) + '</strong> ' + escapeHtml(captionCopy) + '</p>' : "");
          const mediaStateClass = hasVideo ? ' has-video-media' : hasImage ? ' has-image-media' : '';
          return '<article class="feed-card social-feed-card is-' + escapeHtml(type) + mediaStateClass + (isTextOnly ? ' is-text-only' : '') + (ownerMenu ? ' is-user-post' : '') + '"' + attrs + ' data-card>' +
            '<div class="social-feed-head">' + socialFeedAvatarHtml(item.media) + '<a class="social-feed-name feed-profile-link" href="' + escapeHtml(ownerProfileHref) + '"' + ownerBusinessAttr + '><strong>' + escapeHtml(item.business) + '</strong><small>' + escapeHtml(feedDisplayTime) + ownerHeadSuffix + '</small></a><button class="social-feed-more feed-action" type="button" data-feed-options aria-label="More options" aria-expanded="false">...</button></div>' + feedOptionsMenu(optionsKind, ownerMenu) +
            mediaBlock +
            feedCountedActionFooter(statText, captionHtml, commentCount, feedDisplayTime) +
            '<div class="feed-comments"><div data-feed-comments-list>' + comments + '</div><form class="feed-comment-form" data-feed-comment-form><input type="text" placeholder="Add a comment..." aria-label="Write a comment" /><button type="submit">Post</button></form></div>' +
          '</article>';
        }
        function readJson(key, fallback) {
          try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : fallback;
          } catch (error) {
            return fallback;
          }
        }
        function readLocationLabel() {
          try {
            const stored = JSON.parse(localStorage.getItem("emyAskLocation") || "{}");
            return stored.location || stored.locationLabel || "";
          } catch (error) { return ""; }
        }
        function activeProfileRole() {
          try {
            const params = new URLSearchParams(window.location.search || "");
            const mode = String(params.get("mode") || "").toLowerCase();
            const path = String(window.location.pathname || "").toLowerCase();
            if (mode === "business" || mode === "customer") return mode;
            if (/emy-customer-/i.test(path)) return "customer";
            if (/emy-business-profile\.html/i.test(path)) {
              const view = String(params.get("view") || "").toLowerCase();
              if (params.get("setup") === "1" || view === "business" || ["business", "statistics", "services", "chat", "customers", "upload", "profile", "edit"].includes(mode)) return "business";
              if (params.has("business") || view === "customer") return "customer";
              if (
                localStorage.getItem("emyBusinessProfileDraft") ||
                localStorage.getItem("emyBusinessProfilePhoto") ||
                localStorage.getItem("emyBusinessProfilePhotoSrc") ||
                localStorage.getItem("emyBusinessProfilePhotoRef") ||
                localStorage.getItem("emyBusinessDisplayName") ||
                localStorage.getItem("emyBusinessName")
              ) return "business";
            }
          } catch (error) {}
          const signedRole = String(localStorage.getItem("emyMainSignedInRole") || "").toLowerCase();
          if (signedRole === "business" || signedRole === "customer") return signedRole;
          if (localStorage.getItem("emyMainSignedOut") === "1") return "";
          const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          return pendingRole === "business" || pendingRole === "customer" ? pendingRole : "";
        }
        function readAskProfileImage() {
          try {
            const user = JSON.parse(localStorage.getItem("emyAskCurrentUser") || "{}");
            const image = String(user && user.image || "").trim();
            if (!image || image.includes("images.unsplash.com") || image.indexOf("data:image/svg+xml") === 0) return "";
            return image;
          } catch (error) {
            return "";
          }
        }
        function customerPendingSignupPhoto() {
          const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          return pendingRole === "customer" ? (localStorage.getItem("emyMainPendingSignupPhoto") || localStorage.getItem("emyMainPendingSignupPhotoSrc") || "") : "";
        }
        function activeProfileCustomerMediaSet() {
          return new Set([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef")
          ].map((value) => String(value || "").trim()).filter(Boolean));
        }
        function activeProfileBusinessOnlyMedia(values) {
          const customerMedia = activeProfileCustomerMediaSet();
          return (Array.isArray(values) ? values : []).map((value) => String(value || "").trim()).find((value) => value && !customerMedia.has(value)) || "";
        }
        function activeProfileCustomerObjects() {
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
        function activeProfileCustomerObjectValues(fields) {
          const values = [];
          activeProfileCustomerObjects().forEach((item) => fields.forEach((field) => values.push(item && item[field])));
          return values;
        }
        function activeProfileFirstMedia(values) {
          for (const value of values) {
            const next = String(value || "").trim();
            if (next && !/images\.unsplash|placeholder|avatar-placeholder|demo|stock|sample|lorem|faker|dummy|randomuser|pravatar|thispersondoesnotexist|ui-avatars|dicebear|robohash|gravatar/i.test(next) && next.indexOf("data:image/svg+xml") !== 0) return next;
          }
          return "";
        }
        function activeProfileSavedCustomerPhoto() {
          return activeProfileFirstMedia([
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
            localStorage.getItem("emyAuthPhotoURL"),
            readAskProfileImage()
          ].concat(activeProfileCustomerObjectValues(["photoUrl", "photoURL", "photo", "photoSrc", "profilePhoto", "profilePhotoSrc", "profileImage", "profileImageSrc", "avatar", "avatarSrc", "image", "imageSrc"])));
        }
        function activeProfileSavedCustomerPhotoRef() {
          return activeProfileFirstMedia([
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem("emyCustomerProfilePhotoRefBackup"),
            localStorage.getItem("emyMainSignedInPhotoRef"),
            localStorage.getItem("emyFirebasePhotoRef"),
            localStorage.getItem("emyAuthPhotoRef")
          ].concat(activeProfileCustomerObjectValues(["photoPublicId", "photoRef", "profilePhotoRef", "profileImageRef", "avatarRef", "imageRef", "publicId"])));
        }
        function syncActiveCustomerProfilePhotoAliases(photo, ref) {
          if (activeProfileRole() === "business") return;
          try {
            const nextPhoto = String(photo || "").trim();
            const nextRef = String(ref || "").trim();
            if (nextPhoto) ["emyCustomerProfilePhoto", "emyCustomerProfilePhotoSrc", "emyCustomerProfileImage", "emyCustomerProfileImageSrc", "emyCustomerAvatar", "emyCustomerAvatarSrc", "emyCustomerPhoto", "emyCustomerPhotoSrc"].forEach((key) => localStorage.setItem(key, nextPhoto));
            if (nextRef) ["emyCustomerProfilePhotoRef", "emyCustomerProfileImageRef", "emyCustomerAvatarRef", "emyCustomerPhotoRef"].forEach((key) => localStorage.setItem(key, nextRef));
            if (nextPhoto && !/^blob:/i.test(nextPhoto) && !(/^data:image\//i.test(nextPhoto) && nextPhoto.length > 180000)) {
              localStorage.setItem("emyCustomerProfilePhotoBackup", nextPhoto);
              localStorage.setItem("emyCustomerProfilePhotoSrcBackup", nextPhoto);
            }
            if (nextRef) localStorage.setItem("emyCustomerProfilePhotoRefBackup", nextRef);
            if (nextPhoto || nextRef) localStorage.setItem("emyCustomerProfilePhotoBackupSavedAt", new Date().toISOString());
            if (nextPhoto || nextRef) localStorage.setItem("emyCustomerProfileUpdatedAt", new Date().toISOString());
          } catch (error) {}
        }
        function readActiveProfilePhoto() {
          const customerPhoto = activeProfileSavedCustomerPhoto();
          const signupPhoto = customerPendingSignupPhoto();
          const businessProfile = readJson("emyBusinessProfileDraft", {});
          const businessPhoto = activeProfileBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyBusinessProfilePhotoBackup"), localStorage.getItem("emyBusinessProfilePhotoSrcBackup"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), businessProfile.profilePhoto, businessProfile.profilePhotoSrc, businessProfile.photo, businessProfile.photoSrc]);
          const customerRef = activeProfileSavedCustomerPhotoRef();
          if (customerPhoto || customerRef) syncActiveCustomerProfilePhotoAliases(customerPhoto, customerRef);
          return activeProfileRole() === "business"
            ? businessPhoto
            : (customerPhoto || signupPhoto);
        }
        function readActiveProfilePhotoRef() {
          const businessProfile = readJson("emyBusinessProfileDraft", {});
          return activeProfileRole() === "business"
            ? activeProfileBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyBusinessProfilePhotoRefBackup"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), businessProfile.profilePhotoRef, businessProfile.photoRef])
            : (activeProfileSavedCustomerPhotoRef() || (String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase() === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "") || "");
        }
        function renderProfile() {
          const signedInEmail = localStorage.getItem("emyMainSignedInEmail") || "";
          const storedDisplayName = localStorage.getItem("emyCustomerDisplayName") || "";
          const firstName = localStorage.getItem("emyCustomerFirstName") || localStorage.getItem("emyMainPendingSignupFirstName") || "";
          const displayName = (storedDisplayName || firstName || (signedInEmail ? signedInEmail.split("@")[0] : "Stephane")).split(" ")[0];
          const initial = (displayName || firstName || "S").trim().charAt(0).toUpperCase() || "S";
          const photo = readActiveProfilePhoto();
          const photoRef = readActiveProfilePhotoRef();
          if (firstNameLabel) firstNameLabel.textContent = displayName || "Stephane";
          if (photo || photoRef) {
            const attrs = (photo ? ' src="' + escapeHtml(photo) + '"' : '') + (photoRef ? ' data-emy-media-ref="' + escapeHtml(photoRef) + '"' : '');
            avatar.innerHTML = '<img' + attrs + ' alt="Profile picture" />';
            if (composerAvatar) composerAvatar.innerHTML = '<img' + attrs + ' alt="Profile picture" />';
            if (photoRef && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(document);
          } else {
            avatar.textContent = initial;
            if (composerAvatar) composerAvatar.textContent = initial;
          }
          const location = readLocationLabel();
          if (locationLabel) locationLabel.textContent = headerLocationLabel(location);
          if (locationButton) locationButton.title = location && location !== "Near me" ? location : "Current Location";
          updateFeedNotificationCount();
        }
        function setFeedOverlayOpen(element, isOpen) {
          if (!element) return;
          element.classList.toggle("is-open", !!isOpen);
          element.setAttribute("aria-hidden", isOpen ? "false" : "true");
        }
        function setComposeCameraStatus(text, warning) {
          if (!composeCameraStatus) return;
          composeCameraStatus.textContent = text || "";
          composeCameraStatus.style.color = warning ? "#9a4b00" : "#61708c";
        }
        function setComposeRecordingUi(isRecording) {
          if (composeCameraActions) composeCameraActions.classList.toggle("is-recording", !!isRecording);
          if (composeCameraCapture) composeCameraCapture.hidden = !!isRecording;
          if (composeCameraStop) composeCameraStop.hidden = !isRecording;
          if (composeCameraTimer) composeCameraTimer.classList.toggle("is-visible", !!isRecording);
        }
        function updateComposeCameraTimer() {
          if (!composeCameraTimer || !composeRecordingStart) return;
          const seconds = Math.max(0, Math.floor((Date.now() - composeRecordingStart) / 1000));
          const minutes = Math.floor(seconds / 60);
          const remainder = String(seconds % 60).padStart(2, "0");
          composeCameraTimer.textContent = minutes + ":" + remainder;
        }
        function stopComposeCameraStream() {
          if (composeRecordingTimer) {
            clearInterval(composeRecordingTimer);
            composeRecordingTimer = null;
          }
          if (composeCameraStream) {
            composeCameraStream.getTracks().forEach((track) => track.stop());
          }
          composeCameraStream = null;
          if (composeCameraPreview) composeCameraPreview.srcObject = null;
          setComposeRecordingUi(false);
        }
        function closeComposeCamera(cancelRecording = true) {
          if (composeMediaRecorder && composeMediaRecorder.state !== "inactive") {
            composeRecordingCancelled = !!cancelRecording;
            composeMediaRecorder.stop();
            return;
          }
          stopComposeCameraStream();
          setFeedOverlayOpen(composeCameraSheet, false);
        }
        function setComposeSaving(delta) {
          composeMediaSaveCount = Math.max(0, composeMediaSaveCount + delta);
          composeMediaSaving = composeMediaSaveCount > 0;
        }
        function composeDefaultSettings(type) {
          return window.emyDefaultMediaEditSettings ? window.emyDefaultMediaEditSettings(type || "image") : { fit:"contain", zoom:1, x:0, y:0, aspect:"auto", overlay:"" };
        }
        function composePosterSrc(item) {
          const settings = item && item.settings || {};
          return String((item && (item.posterSrc || item.thumbnailSrc)) || settings.posterSrc || settings.thumbnailSrc || "");
        }
        function composePosterRef(item) {
          const settings = item && item.settings || {};
          return String((item && (item.posterRef || item.thumbnailRef)) || settings.posterRef || settings.thumbnailRef || "");
        }
        function composeStoredMediaItems() {
          return composeMediaItems.map((item) => {
            if (!item) return null;
            const rawSrc = String(item.src || "");
            const temporarySrc = /^(blob:|data:)/i.test(rawSrc);
            const durableSrc = (item.ref || (temporarySrc && item.cloudinaryPublicId)) ? "" : rawSrc;
            return {
              type: item.type || "image",
              src: durableSrc,
              ref: item.ref || "",
              posterSrc: composePosterRef(item) ? "" : composePosterSrc(item),
              posterRef: composePosterRef(item),
              name: item.name || "",
              cloudinaryPublicId: item.cloudinaryPublicId || "",
              cloudinaryResourceType: item.cloudinaryResourceType || "",
              cloudinaryBytes: Number(item.cloudinaryBytes) || 0,
              cloudinaryDuration: Number(item.cloudinaryDuration) || 0,
              cloudinaryPosterPublicId: item.cloudinaryPosterPublicId || "",
              settings: Object.assign({}, item.settings || composeDefaultSettings(item.type || "image"))
            };
          }).filter(Boolean);
        }
        function prepareComposeMediaUpload(fileOrBlob, type, name) {
          if (window.emyPrepareFeedMediaUpload) {
            return window.emyPrepareFeedMediaUpload(fileOrBlob, { type, name, kind:"feed", role:"customer", allowBrowserFallback:false }).catch(() => null);
          }
          return Promise.resolve(null);
        }
        function applyPreparedComposeMedia(item, record, objectUrl) {
          if (!item || !record) return false;
          if (objectUrl && item.src !== objectUrl) return false;
          if (record.src) {
            if (objectUrl && objectUrl.indexOf("blob:") === 0) {
              try { URL.revokeObjectURL(objectUrl); } catch (error) {}
            }
            item.src = record.src;
            item.ref = "";
          } else if (record.ref || record.id) {
            item.ref = record.ref || record.id || "";
          } else {
            return false;
          }
          item.type = record.type || item.type || "image";
          item.name = record.name || item.name || "";
          item.cloudinaryPublicId = record.cloudinaryPublicId || "";
          item.cloudinaryResourceType = record.cloudinaryResourceType || "";
          item.cloudinaryBytes = Number(record.cloudinaryBytes) || 0;
          item.cloudinaryDuration = Number(record.cloudinaryDuration) || 0;
          item.cloudinaryPosterPublicId = record.cloudinaryPosterPublicId || item.cloudinaryPosterPublicId || "";
          item.uploadFailed = false;
          return true;
        }
        function syncComposeActiveMedia(index) {
          if (!composeMediaItems.length) {
            composeActiveMediaIndex = 0;
            composeMediaSrc = "";
            composeMediaRef = "";
            composeMediaType = "";
            composeMediaSettings = composeDefaultSettings("image");
            return null;
          }
          composeActiveMediaIndex = Math.min(Math.max(0, Number(index) || 0), composeMediaItems.length - 1);
          const item = composeMediaItems[composeActiveMediaIndex];
          composeMediaSrc = item.src || "";
          composeMediaRef = item.ref || "";
          composeMediaType = item.type || "image";
          composeMediaSettings = Object.assign({}, item.settings || composeDefaultSettings(composeMediaType));
          item.posterSrc = composePosterSrc(item);
          item.posterRef = composePosterRef(item);
          return item;
        }
        function renderComposeMediaPreview() {
          if (!composePreview) return;
          composePreview.querySelectorAll("[data-compose-carousel-preview]").forEach((node) => node.remove());
          if (!composeMediaItems.length) {
            composePreview.hidden = true;
            composePreview.classList.remove("has-carousel");
            if (composePreviewImage) { composePreviewImage.hidden = true; composePreviewImage.removeAttribute("src"); }
            if (composePreviewVideo) { composePreviewVideo.hidden = true; composePreviewVideo.removeAttribute("src"); }
            if (composeRemove) composeRemove.hidden = true;
            return;
          }
          const active = syncComposeActiveMedia(composeActiveMediaIndex);
          composePreview.hidden = false;
          composePreview.classList.toggle("has-carousel", composeMediaItems.length > 1);
          if (composeMediaItems.length > 1 && window.emyFeedMediaCarouselMarkup) {
            if (composePreviewImage) composePreviewImage.hidden = true;
            if (composePreviewVideo) { composePreviewVideo.pause(); composePreviewVideo.hidden = true; }
            const host = document.createElement("div");
            host.innerHTML = window.emyFeedMediaCarouselMarkup(composeMediaItems, { label:"Selected media" });
            const carousel = host.firstElementChild;
            if (carousel) {
              carousel.dataset.composeCarouselPreview = "true";
              composePreview.insertBefore(carousel, composePreview.firstChild);
              if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(carousel);
              if (window.emySetupVideoPlayers) window.emySetupVideoPlayers(carousel);
              if (window.emySetupFeedMediaCarousels) window.emySetupFeedMediaCarousels(carousel);
            }
          } else if (active && active.type === "video") {
            if (composePreviewImage) { composePreviewImage.hidden = true; composePreviewImage.removeAttribute("src"); }
            if (composePreviewVideo) {
              composePreviewVideo.src = active.src || "";
              if (active.ref) composePreviewVideo.setAttribute("data-emy-media-ref", active.ref);
              else composePreviewVideo.removeAttribute("data-emy-media-ref");
              const posterSrc = composePosterSrc(active);
              const posterRef = composePosterRef(active);
              if (posterSrc) composePreviewVideo.poster = posterSrc;
              else composePreviewVideo.removeAttribute("poster");
              if (posterRef) composePreviewVideo.setAttribute("data-emy-poster-ref", posterRef);
              else composePreviewVideo.removeAttribute("data-emy-poster-ref");
              composePreviewVideo.hidden = false;
            }
          } else if (active) {
            if (composePreviewVideo) { composePreviewVideo.pause(); composePreviewVideo.hidden = true; composePreviewVideo.removeAttribute("src"); }
            if (composePreviewImage) {
              composePreviewImage.src = active.src || "";
              if (active.ref) composePreviewImage.setAttribute("data-emy-media-ref", active.ref);
              else composePreviewImage.removeAttribute("data-emy-media-ref");
              composePreviewImage.hidden = false;
            }
          }
          if (composeRemove) composeRemove.hidden = false;
          if (window.emyApplyMediaEditPreview) window.emyApplyMediaEditPreview(composePreview, composeMediaSettings);
          ensureComposeEditButton();
        }
        function addComposeMediaItem(item) {
          const next = Object.assign({ type:"image", src:"", ref:"", name:"", settings:composeDefaultSettings(item && item.type) }, item || {});
          next.settings = Object.assign({}, next.settings || composeDefaultSettings(next.type));
          next.posterSrc = composePosterSrc(next);
          next.posterRef = composePosterRef(next);
          if (!(next.src || next.ref)) return null;
          composeMediaItems.push(next);
          composeActiveMediaIndex = composeMediaItems.length - 1;
          renderComposeMediaPreview();
          return next;
        }
        function setComposeMediaPreview(type, src) {
          if (!src) return;
          if (!composeMediaItems.length) {
            addComposeMediaItem({ type, src, ref:composeMediaRef, settings:composeMediaSettings });
            return;
          }
          const active = syncComposeActiveMedia(composeActiveMediaIndex);
          if (active && active.src && active.src !== src && active.src.indexOf("blob:") === 0) {
            try { URL.revokeObjectURL(active.src); } catch (error) {}
          }
          if (active) {
            active.type = type || "image";
            active.src = src || "";
            active.ref = composeMediaRef || active.ref || "";
            active.settings = Object.assign({}, composeMediaSettings || active.settings || composeDefaultSettings(type));
          }
          if (type === "image" && composeVideoFile) composeVideoFile.value = "";
          if (type === "video" && composeFile) composeFile.value = "";
          renderComposeMediaPreview();
        }
        function ensureComposeEditButton() {
          if (!composePreview || composePreview.querySelector("[data-compose-edit]")) return;
          const button = document.createElement("button");
          button.type = "button";
          button.className = "composer-edit";
          button.dataset.composeEdit = "true";
          button.textContent = "Edit media";
          button.addEventListener("click", openComposeMediaEditor);
          composePreview.appendChild(button);
        }
        function openComposeMediaEditor(event, submitAfterApply) {
          if (event) {
            event.preventDefault();
            event.stopPropagation();
          }
          const active = syncComposeActiveMedia(composeActiveMediaIndex);
          if (!active || !active.src || !active.type || !window.emyOpenMediaEditor) return;
          window.emyOpenMediaEditor({
            src: active.src,
            type: active.type,
            settings: active.settings || composeMediaSettings,
            onApply: (settings, submitNow) => {
              active.settings = Object.assign({}, settings || active.settings || composeDefaultSettings(active.type));
              active.posterSrc = composePosterSrc(active);
              active.posterRef = composePosterRef(active);
              syncComposeActiveMedia(composeActiveMediaIndex);
              renderComposeMediaPreview();
              if (submitNow || submitAfterApply) publishComposerPost();
            }
          });
        }
        function openComposeMediaSource(type) {
          composePendingMediaType = type === "video" ? "video" : "image";
          const isVideo = composePendingMediaType === "video";
          if (composeMediaTitle) composeMediaTitle.textContent = isVideo ? "Add video" : "Add photo";
          if (composeMediaHelp) composeMediaHelp.textContent = isVideo ? "Choose from gallery, computer, or record now." : "Choose from gallery, computer, or take a picture now.";
          if (composeLibraryLabel) composeLibraryLabel.textContent = "Gallery or computer";
          if (composeLibraryHelp) composeLibraryHelp.textContent = isVideo ? "Choose a saved video from your phone gallery, laptop, or files." : "Choose a photo from your phone gallery, laptop, or files.";
          if (composeCameraLabel) composeCameraLabel.textContent = isVideo ? "Record video now" : "Take picture now";
          if (composeCameraHelp) composeCameraHelp.textContent = isVideo ? "Use your camera to record a new feed video." : "Use your camera to take a new feed photo.";
          setFeedOverlayOpen(composeMediaSource, true);
        }
        async function openComposeCamera(mode) {
          composeCameraMode = mode === "video" ? "video" : "image";
          const isVideo = composeCameraMode === "video";
          setFeedOverlayOpen(composeCameraSheet, true);
          if (composeCameraFrame) composeCameraFrame.classList.toggle("is-video", isVideo);
          if (composeCameraSound) composeCameraSound.classList.toggle("is-visible", isVideo);
          if (composeCameraTitle) composeCameraTitle.textContent = isVideo ? "Record video now" : "Take picture now";
          if (composeCameraCopy) composeCameraCopy.textContent = isVideo ? "Allow camera access, then record a short feed video." : "Allow camera access, then capture your feed photo.";
          if (composeCameraCapture) composeCameraCapture.textContent = isVideo ? "Start recording" : "Take picture";
          setComposeRecordingUi(false);
          setComposeCameraStatus("Requesting camera permission...", false);
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setComposeCameraStatus("Camera is not available in this browser. Use your library instead.", true);
            return;
          }
          stopComposeCameraStream();
          try {
            const wantsAudio = isVideo && (!composeCameraAudio || composeCameraAudio.checked);
            const videoConstraints = isVideo
              ? { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30, max: 30 } }
              : { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } };
            const constraints = { video: videoConstraints, audio: wantsAudio ? { echoCancellation: true, noiseSuppression: true } : false };
            try {
              composeCameraStream = await navigator.mediaDevices.getUserMedia(constraints);
            } catch (error) {
              composeCameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
            }
            composeRecordedWithAudio = !!(composeCameraStream.getAudioTracks && composeCameraStream.getAudioTracks().length);
            if (composeCameraPreview) {
              composeCameraPreview.srcObject = composeCameraStream;
              const playPromise = composeCameraPreview.play();
              if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
            }
            setComposeCameraStatus(isVideo ? (composeRecordedWithAudio ? "Camera and microphone ready. Tap Start recording." : "Camera ready without sound. Tap Start recording.") : "Camera ready. Tap Take photo when you are ready.", false);
          } catch (error) {
            setComposeCameraStatus("Camera permission was not available. Use your library instead.", true);
          }
        }
        function captureComposeCameraPhoto() {
          if (!composeCameraPreview || !composeCameraStream) {
            setComposeCameraStatus("Camera is not ready yet.", true);
            return;
          }
          const canvas = document.createElement("canvas");
          canvas.width = composeCameraPreview.videoWidth || 1280;
          canvas.height = composeCameraPreview.videoHeight || 720;
          const context = canvas.getContext("2d");
          context.drawImage(composeCameraPreview, 0, 0, canvas.width, canvas.height);
          const applyCameraBlob = (blob) => {
            if (!blob) {
              setComposeCameraStatus("Could not capture this photo. Try again or use your library.", true);
              return;
            }
            const objectUrl = URL.createObjectURL(blob);
            closeComposeCamera(false);
            composeMediaRef = "";
            composeMediaSettings = composeDefaultSettings("image");
            const addedItem = addComposeMediaItem({ type:"image", src:objectUrl, ref:"", settings:composeMediaSettings, name:"Camera photo" });
            openComposeMediaEditor(null, false);
            if (addedItem) {
              setComposeSaving(1);
              prepareComposeMediaUpload(blob, "image", "camera-photo.jpg").then((record) => {
                if (applyPreparedComposeMedia(addedItem, record, objectUrl)) {
                  syncComposeActiveMedia(composeActiveMediaIndex);
                  renderComposeMediaPreview();
                } else {
                  addedItem.uploadFailed = true;
                  showToast("Photo upload failed. Try a smaller image or check your connection.");
                }
              }).finally(() => {
                setComposeSaving(-1);
              });
            }
          };
          if (canvas.toBlob) {
            canvas.toBlob(applyCameraBlob, "image/jpeg", .86);
            return;
          }
          applyCameraBlob(null);
        }
        function startComposeVideoRecording() {
          if (!composeCameraStream || !window.MediaRecorder) {
            setComposeCameraStatus("This browser cannot record video here. Use your library instead.", true);
            return;
          }
          composeRecordedChunks = [];
          composeRecordingCancelled = false;
          let options = { videoBitsPerSecond: 4500000, audioBitsPerSecond: 128000 };
          if (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
            options.mimeType = "video/webm;codecs=vp9";
          } else if (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported("video/webm")) {
            options.mimeType = "video/webm";
          }
          try {
            composeMediaRecorder = new MediaRecorder(composeCameraStream, options);
          } catch (error) {
            composeMediaRecorder = new MediaRecorder(composeCameraStream);
          }
          composeMediaRecorder.addEventListener("dataavailable", (event) => {
            if (event.data && event.data.size) composeRecordedChunks.push(event.data);
          });
          composeMediaRecorder.addEventListener("stop", () => {
            const shouldSave = !composeRecordingCancelled && composeRecordedChunks.length;
            const mimeType = composeMediaRecorder && composeMediaRecorder.mimeType ? composeMediaRecorder.mimeType : "video/webm";
            stopComposeCameraStream();
            setFeedOverlayOpen(composeCameraSheet, false);
            if (shouldSave) {
              const blob = new Blob(composeRecordedChunks, { type: mimeType });
              const objectUrl = URL.createObjectURL(blob);
              composeMediaSettings = composeDefaultSettings("video");
              composeMediaRef = "";
              const addedItem = addComposeMediaItem({ type:"video", src:objectUrl, ref:"", settings:composeMediaSettings, name:"Recorded video" });
              openComposeMediaEditor(null, false);
              setComposeSaving(1);
              prepareComposeMediaUpload(blob, "video", "recorded-video.webm").then((record) => {
                if (applyPreparedComposeMedia(addedItem, record, objectUrl)) {
                  syncComposeActiveMedia(composeActiveMediaIndex);
                  renderComposeMediaPreview();
                } else if (addedItem && addedItem.src === objectUrl) {
                  addedItem.uploadFailed = true;
                  showToast("Video upload failed. Try a smaller video or check your connection.");
                }
              }).finally(() => {
                setComposeSaving(-1);
              });
              showToast(composeRecordedWithAudio ? "Video added with sound." : "Video added without sound.");
            }
            composeRecordedChunks = [];
            composeMediaRecorder = null;
            composeRecordingCancelled = false;
          });
          composeMediaRecorder.start();
          composeRecordingStart = Date.now();
          updateComposeCameraTimer();
          composeRecordingTimer = setInterval(updateComposeCameraTimer, 500);
          setComposeRecordingUi(true);
          setComposeCameraStatus(composeRecordedWithAudio ? "Recording with sound... tap Stop recording when finished." : "Recording without sound... tap Stop recording when finished.", false);
        }
        function chooseComposeMediaSource(source) {
          setFeedOverlayOpen(composeMediaSource, false);
          if (source === "camera") {
            openComposeCamera(composePendingMediaType);
            return;
          }
          if (composePendingMediaType === "video") {
            if (composeVideoFile) {
              composeVideoFile.removeAttribute("capture");
              composeVideoFile.click();
            }
          } else if (composeFile) {
            composeFile.removeAttribute("capture");
            composeFile.click();
          }
        }
        function clearComposeImage() {
          closeComposeCamera(true);
          setFeedOverlayOpen(composeMediaSource, false);
          composeMediaItems.forEach((item) => {
            if (item && item.src && item.src.indexOf("blob:") === 0) {
              try { URL.revokeObjectURL(item.src); } catch (error) {}
            }
          });
          if (composeMediaSrc && composeMediaSrc.indexOf("blob:") === 0) {
            try { URL.revokeObjectURL(composeMediaSrc); } catch (error) {}
          }
          composeMediaSrc = "";
          composeMediaRef = "";
          composeMediaType = "";
          composeMediaSettings = composeDefaultSettings("image");
          composeMediaSaving = false;
          composeMediaSaveCount = 0;
          composeMediaItems = [];
          composeActiveMediaIndex = 0;
          if (composeFile) composeFile.value = "";
          if (composeVideoFile) composeVideoFile.value = "";
          renderComposeMediaPreview();
        }
        function publishComposerPost() {
          const text = (composeText ? composeText.value : "").trim();
          if (composeMediaSaving) {
            showToast("Finishing media so it can stay after posting.");
            return;
          }
          if (!text && !composeMediaItems.length) {
            showToast("Write something or add a photo or video first.");
            if (composeText) composeText.focus();
            return;
          }
          const hasUnuploadedMedia = composeMediaItems.some((media) => media && (media.uploadFailed || (!media.ref && !media.cloudinaryPublicId && /^(blob:|data:)/i.test(String(media.src || "")))));
          if (hasUnuploadedMedia) {
            showToast("Media upload is still required before posting. Try a smaller file or check your connection.");
            return;
          }
          const storedMediaItems = composeStoredMediaItems();
          const firstMedia = storedMediaItems[0] || null;
          const postedMediaSrc = firstMedia ? firstMedia.src : "";
          const postedMediaRef = firstMedia ? firstMedia.ref : "";
          const postedMediaType = firstMedia ? firstMedia.type : "";
          const postedPosterRef = firstMedia ? (firstMedia.posterRef || (firstMedia.settings && (firstMedia.settings.posterRef || firstMedia.settings.thumbnailRef)) || "") : "";
          const postedPosterSrc = postedPosterRef ? "" : (firstMedia ? (firstMedia.posterSrc || firstMedia.thumbnailSrc || (firstMedia.settings && (firstMedia.settings.posterSrc || firstMedia.settings.thumbnailSrc)) || "") : "");
          const name = currentCustomerName();
          const isVideo = !!firstMedia && postedMediaType === "video";
          const isImage = !!firstMedia && postedMediaType === "image";
          const mediaLabel = storedMediaItems.length > 1 ? "Carousel" : isVideo ? "Video" : isImage ? "Photo" : "Post";
          const createdAt = new Date().toISOString();
          const feedItem = {
            id:"customer-post-" + Date.now(),
            key:"customer-profile",
            businessKey:"customer-profile",
            business:name,
            actor:name,
            media:firstMedia ? "feed" : "",
            mediaSrc: postedMediaSrc,
            mediaRef: postedMediaRef,
            mediaItems: storedMediaItems,
            mediaType: postedMediaType,
            cloudinaryPublicId:firstMedia && firstMedia.cloudinaryPublicId || "",
            cloudinaryResourceType:firstMedia && firstMedia.cloudinaryResourceType || "",
            cloudinaryBytes:firstMedia && Number(firstMedia.cloudinaryBytes) || 0,
            cloudinaryDuration:firstMedia && Number(firstMedia.cloudinaryDuration) || 0,
            cloudinaryPosterPublicId:firstMedia && firstMedia.cloudinaryPosterPublicId || "",
            posterSrc: postedPosterSrc,
            posterRef: postedPosterRef,
            thumbnailSrc: postedPosterSrc,
            thumbnailRef: postedPosterRef,
            createdAt,
            postedAt: createdAt,
            kind:"post",
            type:"post",
            my:true,
            isUserPost:true,
            tag:mediaLabel,
            time:feedRealTimeLabel(createdAt, "Time saved"),
            title:(text && text.trim().split(/\s+/).slice(0, 8).join(" ")) || "",
            text:text || (storedMediaItems.length > 1 ? "Shared new media." : isVideo ? "Shared a new video." : isImage ? "Shared a new photo." : "Shared a new post."),
            description:text || (storedMediaItems.length > 1 ? "Shared new media." : isVideo ? "Shared a new video." : isImage ? "Shared a new photo." : "Shared a new post."),
            stats:"0 likes",
            price:"",
            image:isImage ? postedMediaSrc : "",
            video:isVideo ? postedMediaSrc : "",
            mediaSettings:Object.assign({}, firstMedia && firstMedia.settings || composeMediaSettings || {}),
            mediaOverlay:firstMedia && firstMedia.settings && firstMedia.settings.overlay || composeMediaSettings && composeMediaSettings.overlay || "",
            profileHref:"emy-customer-profile.html",
            comments:[]
          };
          if (window.emyPersistCreatedFeedItem && !window.emyPersistCreatedFeedItem(feedItem, "post")) {
            showToast("EMY could not save this post yet because browser storage is full.");
            return;
          }
          updates.unshift(feedItem);
          composeMediaSrc = "";
          composeMediaRef = "";
          composeMediaType = "";
          composeMediaSettings = composeDefaultSettings("image");
          composeMediaItems = [];
          composeActiveMediaIndex = 0;
          if (composeText) composeText.value = "";
          clearComposeImage();
          resetFeed("all");
          showToast("Your feed post was added.");
        }

`;
const customer_feeds_part_8 = String.raw`
        setupFeedCreateFlow((item) => {
          const name = item.business || item.actor || currentCustomerName();
          const createdAt = item.createdAt || item.postedAt || new Date().toISOString();
          const hasRealMedia = !!(item.mediaSrc || item.mediaRef || item.image || item.video || (Array.isArray(item.mediaItems) && item.mediaItems.length));
          if (item.kind !== "job" && item.kind !== "event") {
            const itemKind = String(item.kind || item.createType || item.postMode || item.tag || "").toLowerCase();
            const isClipItem = item.mediaType === "video" && (itemKind === "clip" || String(item.tag || "").toLowerCase().includes("clip"));
            const isProductClip = isClipItem && (!!(item.productName || item.productTitle || item.productDescription || item.productInfo || item.price || item.priceText) || String(item.tag || "").toLowerCase().includes("product"));
              updates.unshift({
              id: item.id || ("feed-create-" + Date.now()),
              key: item.businessKey || "customer-profile",
              business: name,
              media: hasRealMedia ? (item.media || "feed") : "",
              mediaSrc: item.mediaSrc || "",
              mediaRef: item.mediaRef || "",
              mediaItems: Array.isArray(item.mediaItems) ? item.mediaItems : [],
              mediaType: item.mediaType || "",
              posterSrc: item.posterSrc || item.thumbnailSrc || "",
              posterRef: item.posterRef || item.thumbnailRef || "",
              thumbnailSrc: item.thumbnailSrc || item.posterSrc || "",
              thumbnailRef: item.thumbnailRef || item.posterRef || "",
              createdAt,
              postedAt: item.postedAt || createdAt,
              mediaSettings: item.mediaSettings || null,
              mediaOverlay: item.mediaOverlay || (item.mediaSettings && item.mediaSettings.overlay) || "",
              image: item.image || (item.mediaType === "image" ? item.mediaSrc : ""),
              video: item.video || (item.mediaType === "video" ? item.mediaSrc : ""),
              type: isClipItem ? "clip" : item.kind || "post",
              my: true,
              isUserPost: true,
              tag: isClipItem ? (isProductClip ? "Product Clip" : "Clip") : item.tag || "Post",
              postMode: isClipItem ? "clip" : item.postMode || "",
              time: feedRealTimeLabel(createdAt, item.time || "Time saved"),
              title: item.title || (isProductClip ? "Product clip" : isClipItem ? "New clip" : "New post"),
              text: item.text || (isClipItem ? "Short clip update." : "New customer update."),
              eventType: item.eventType || "",
              eventWhen: item.eventWhen || "",
              eventWhere: item.eventWhere || "",
              eventDate: item.eventDate || "",
              eventTime: item.eventTime || "",
              stats: isClipItem ? item.viewsText || "0 views" : "0 likes",
              price: item.price || item.priceText || "",
              priceText: item.priceText || item.price || "",
              productName: item.productName || item.productTitle || "",
              productTitle: item.productTitle || item.productName || "",
              productDescription: item.productDescription || item.productInfo || "",
              productInfo: item.productInfo || item.productDescription || "",
              clipKind: item.clipKind || item.reelKind || item.clipType || (isProductClip ? "product" : isClipItem ? "business" : ""),
              reelKind: item.reelKind || item.clipKind || item.clipType || (isProductClip ? "product" : isClipItem ? "business" : ""),
              clipType: item.clipType || item.reelKind || item.clipKind || (isProductClip ? "product" : isClipItem ? "business" : ""),
              duration: item.duration || item.timeLeft || "",
              viewsText: item.viewsText || "",
              profileHref: "emy-customer-profile.html",
              comments: []
            });
          }
          resetFeed("all");
          showToast((item.tag || "Post") + " added to Feeds.");
        }, currentCustomerName);

        if (composeImage && composeFile) {
          composeImage.addEventListener("click", () => openComposeMediaSource("image"));
          composeFile.addEventListener("change", () => {
            const files = Array.from(composeFile.files || []);
            if (!files.length) return;
            files.forEach((file) => {
            if (!file.type || !file.type.startsWith("image/")) {
              showToast("Please choose an image file.");
              return;
            }
            const objectUrl = URL.createObjectURL(file);
            composeMediaRef = "";
            composeMediaSettings = composeDefaultSettings("image");
            const addedItem = addComposeMediaItem({ type:"image", src:objectUrl, ref:"", settings:composeMediaSettings, name:file.name || "" });
            openComposeMediaEditor(null, false);
            setComposeSaving(1);
            prepareComposeMediaUpload(file, "image", file.name || "").then((record) => {
              if (!addedItem || addedItem.src !== objectUrl) return;
              const applied = applyPreparedComposeMedia(addedItem, record, objectUrl);
              if (!applied) {
                addedItem.uploadFailed = true;
                showToast("Photo upload failed. Try a smaller image or check your connection.");
              }
              syncComposeActiveMedia(composeActiveMediaIndex);
              renderComposeMediaPreview();
            }).finally(() => {
              if (!addedItem || addedItem.src !== objectUrl) {
                try { URL.revokeObjectURL(objectUrl); } catch (error) {}
              }
              setComposeSaving(-1);
            });
            });
          });
        }
        if (composeVideo && composeVideoFile) {
          composeVideo.addEventListener("click", () => openComposeMediaSource("video"));
          composeVideoFile.addEventListener("change", () => {
            const files = Array.from(composeVideoFile.files || []);
            if (!files.length) return;
            files.forEach((file) => {
            if (!file.type || !file.type.startsWith("video/")) {
              showToast("Please choose a video file.");
              return;
            }
            const objectUrl = URL.createObjectURL(file);
            composeMediaRef = "";
            composeMediaSettings = composeDefaultSettings("video");
            const addedItem = addComposeMediaItem({ type:"video", src:objectUrl, ref:"", settings:composeMediaSettings, name:file.name || "" });
            openComposeMediaEditor(null, false);
            setComposeSaving(1);
            prepareComposeMediaUpload(file, "video", file.name || "").then((record) => {
              if (applyPreparedComposeMedia(addedItem, record, objectUrl)) {
                syncComposeActiveMedia(composeActiveMediaIndex);
                renderComposeMediaPreview();
              } else if (addedItem && addedItem.src === objectUrl) {
                addedItem.uploadFailed = true;
                showToast("Video upload failed. Try a smaller video or check your connection.");
              }
            }).finally(() => {
              setComposeSaving(-1);
            });
            });
          });
        }
        composeSourceButtons.forEach((button) => {
          button.addEventListener("click", () => chooseComposeMediaSource(button.dataset.composeSource));
        });
        if (composeSourceClose) composeSourceClose.addEventListener("click", () => setFeedOverlayOpen(composeMediaSource, false));
        if (composeMediaSource) composeMediaSource.addEventListener("click", (event) => {
          if (event.target === composeMediaSource) setFeedOverlayOpen(composeMediaSource, false);
        });
        if (composeCameraSheet) composeCameraSheet.addEventListener("click", (event) => {
          if (event.target === composeCameraSheet) closeComposeCamera(true);
        });
        if (composeCameraCancel) composeCameraCancel.addEventListener("click", () => closeComposeCamera(true));
        if (composeCameraCapture) composeCameraCapture.addEventListener("click", () => {
          if (composeCameraMode === "video") startComposeVideoRecording();
          else captureComposeCameraPhoto();
        });
        if (composeCameraStop) composeCameraStop.addEventListener("click", () => closeComposeCamera(false));
        if (composeRemove) composeRemove.addEventListener("click", clearComposeImage);
        if (composePost) composePost.addEventListener("click", publishComposerPost);
        if (feedNewPosts) feedNewPosts.addEventListener("click", jumpToNewPosts);
        feedList.addEventListener("click", (event) => {
          const optionsButton = event.target.closest("[data-feed-options]");
          if (optionsButton) {
            event.preventDefault();
            event.stopPropagation();
            toggleFeedOptions(optionsButton);
            return;
          }
          const optionButton = event.target.closest("[data-feed-option]");
          if (optionButton) {
            event.preventDefault();
            event.stopPropagation();
            handleFeedOption(optionButton.dataset.feedOption, optionButton.closest("[data-feed-id]"), optionButton.closest("[data-feed-options-menu]"));
            return;
          }
          const commentDelete = event.target.closest("[data-feed-comment-delete]");
          if (commentDelete) {
            const row = commentDelete.closest("[data-feed-comment-reply-row], [data-feed-comment-row]");
            const card = commentDelete.closest("[data-feed-id]");
            if (!row || row.dataset.feedCommentOwned !== "true") return;
            const isReplyRow = row.hasAttribute("data-feed-comment-reply-row");
            row.remove();
            syncFeedCommentsFromDom(card);
            notifyFeedBusinessOwner(card, isReplyRow ? "reply-delete" : "comment-delete", currentCustomerName() + " deleted " + (isReplyRow ? "a reply" : "a comment") + " on your " + feedCardItemLabel(card) + ".");
            showToast("Comment deleted.");
            return;
          }
          const commentEdit = event.target.closest("[data-feed-comment-edit]");
          if (commentEdit) {
            const row = commentEdit.closest("[data-feed-comment-reply-row], [data-feed-comment-row]");
            if (!row || row.dataset.feedCommentOwned !== "true" || row.dataset.editing === "true") return;
            const textNode = row.querySelector("[data-feed-comment-text]");
            const actions = row.querySelector(".feed-comment-actions");
            if (!textNode || !actions) return;
            row.dataset.editing = "true";
            row.dataset.originalText = textNode.textContent || "";
            textNode.innerHTML = '<input class="feed-comment-edit-field" data-feed-comment-edit-field value="' + escapeHtml(row.dataset.originalText || "") + '" aria-label="Edit comment" />';
            actions.querySelectorAll("[data-feed-comment-edit], [data-feed-comment-delete]").forEach((button) => button.hidden = true);
            actions.insertAdjacentHTML("beforeend", '<button type="button" data-feed-comment-save-edit aria-label="Save edit" title="Save">' + socialIcon("check") + '</button><button type="button" data-feed-comment-cancel-edit aria-label="Cancel edit" title="Cancel">' + socialIcon("cancel") + '</button>');
            const field = row.querySelector("[data-feed-comment-edit-field]");
            if (field) field.focus();
            return;
          }
          const commentSaveEdit = event.target.closest("[data-feed-comment-save-edit]");
          if (commentSaveEdit) {
            const row = commentSaveEdit.closest("[data-feed-comment-reply-row], [data-feed-comment-row]");
            const card = commentSaveEdit.closest("[data-feed-id]");
            if (!row || row.dataset.feedCommentOwned !== "true") return;
            const field = row.querySelector("[data-feed-comment-edit-field]");
            const textNode = row.querySelector("[data-feed-comment-text]");
            const value = field ? field.value.trim() : "";
            if (!value) {
              if (field) field.focus();
              return;
            }
            if (textNode) textNode.innerHTML = renderLinkedText(value);
            delete row.dataset.editing;
            delete row.dataset.originalText;
            row.querySelectorAll("[data-feed-comment-save-edit], [data-feed-comment-cancel-edit]").forEach((button) => button.remove());
            row.querySelectorAll("[data-feed-comment-edit], [data-feed-comment-delete]").forEach((button) => button.hidden = false);
            syncFeedCommentsFromDom(card);
            notifyFeedBusinessOwner(card, row.hasAttribute("data-feed-comment-reply-row") ? "reply-edit" : "comment-edit", currentCustomerName() + " edited " + (row.hasAttribute("data-feed-comment-reply-row") ? "a reply" : "a comment") + " on your " + feedCardItemLabel(card) + ".");
            showToast("Comment updated.");
            return;
          }
          const commentCancelEdit = event.target.closest("[data-feed-comment-cancel-edit]");
          if (commentCancelEdit) {
            const row = commentCancelEdit.closest("[data-feed-comment-reply-row], [data-feed-comment-row]");
            if (!row || row.dataset.feedCommentOwned !== "true") return;
            const textNode = row.querySelector("[data-feed-comment-text]");
            if (textNode) textNode.innerHTML = renderLinkedText(row.dataset.originalText || "");
            delete row.dataset.editing;
            delete row.dataset.originalText;
            row.querySelectorAll("[data-feed-comment-save-edit], [data-feed-comment-cancel-edit]").forEach((button) => button.remove());
            row.querySelectorAll("[data-feed-comment-edit], [data-feed-comment-delete]").forEach((button) => button.hidden = false);
            return;
          }
          const commentLike = event.target.closest("[data-feed-comment-like]");
          if (commentLike) {
            event.preventDefault();
            event.stopPropagation();
            const active = !commentLike.classList.contains("is-active");
            commentLike.classList.toggle("is-active", active);
            commentLike.setAttribute("aria-pressed", active ? "true" : "false");
            commentLike.setAttribute("aria-label", active ? "Unlike comment" : "Like comment");
            const row = commentLike.closest("[data-feed-comment-reply-row], [data-feed-comment-row]");
            const card = commentLike.closest("[data-feed-id]");
            const dislikeButton = row && row.querySelector("[data-feed-comment-dislike]");
            const dislikeCount = row && row.querySelector("[data-feed-comment-dislikes]");
            if (active && dislikeButton && dislikeButton.classList.contains("is-active")) {
              dislikeButton.classList.remove("is-active");
              dislikeButton.setAttribute("aria-pressed", "false");
              dislikeButton.setAttribute("aria-label", "Dislike comment");
              if (dislikeCount) {
                const currentDislikes = readEngagementCount(dislikeCount);
                const nextDislikes = Math.max(0, currentDislikes - 1);
                dislikeCount.textContent = feedCommentCountLabel(nextDislikes, "dislike");
              }
            }
            const count = row && row.querySelector("[data-feed-comment-likes]");
            if (count) {
              const current = readEngagementCount(count);
              const next = Math.max(0, current + (active ? 1 : -1));
              count.textContent = feedCommentCountLabel(next, "like");
            }
            syncFeedCommentsFromDom(card);
            if (active) notifyFeedBusinessOwner(card, "comment-like", currentCustomerName() + " liked a comment on your " + feedCardItemLabel(card) + ".");
            showToast(active ? "Comment liked." : "Comment like removed.");
            return;
          }
          const commentDislike = event.target.closest("[data-feed-comment-dislike]");
          if (commentDislike) {
            event.preventDefault();
            event.stopPropagation();
            const active = !commentDislike.classList.contains("is-active");
            commentDislike.classList.toggle("is-active", active);
            commentDislike.setAttribute("aria-pressed", active ? "true" : "false");
            commentDislike.setAttribute("aria-label", active ? "Remove dislike" : "Dislike comment");
            const row = commentDislike.closest("[data-feed-comment-reply-row], [data-feed-comment-row]");
            const card = commentDislike.closest("[data-feed-id]");
            const likeButton = row && row.querySelector("[data-feed-comment-like]");
            const likeCount = row && row.querySelector("[data-feed-comment-likes]");
            if (active && likeButton && likeButton.classList.contains("is-active")) {
              likeButton.classList.remove("is-active");
              likeButton.setAttribute("aria-pressed", "false");
              likeButton.setAttribute("aria-label", "Like comment");
              if (likeCount) {
                const currentLikes = readEngagementCount(likeCount);
                const nextLikes = Math.max(0, currentLikes - 1);
                likeCount.textContent = feedCommentCountLabel(nextLikes, "like");
              }
            }
            const count = row && row.querySelector("[data-feed-comment-dislikes]");
            if (count) {
              const current = readEngagementCount(count);
              const next = Math.max(0, current + (active ? 1 : -1));
              count.textContent = feedCommentCountLabel(next, "dislike");
            }
            syncFeedCommentsFromDom(card);
            if (active) notifyFeedBusinessOwner(card, "comment-dislike", currentCustomerName() + " disliked a comment on your " + feedCardItemLabel(card) + ".");
            showToast(active ? "Comment disliked." : "Comment dislike removed.");
            return;
          }
          const commentReply = event.target.closest("[data-feed-comment-reply]");
          if (commentReply) {
            event.preventDefault();
            event.stopPropagation();
            const row = commentReply.closest("[data-feed-comment-row]");
            const form = row && row.querySelector("[data-feed-comment-reply-form]");
            if (form) {
              form.hidden = !form.hidden;
              if (!form.hidden) {
                const input = form.querySelector("input");
                if (input) {
                  input.focus();
                  if (window.emyFocusEmojiTarget) window.emyFocusEmojiTarget(input);
                }
              }
            }
            return;
          }
          const likeButton = event.target.closest("[data-feed-like]");
          const commentButton = event.target.closest("[data-feed-comment-focus]");
          const repostButton = event.target.closest("[data-feed-repost]");
          const shareButton = event.target.closest("[data-feed-share]");
          const saveButton = event.target.closest("[data-feed-save], .social-feed-save");
          const customerButton = event.target.closest("[data-feed-customer]");
          const jobApplyButton = event.target.closest("[data-feed-job-apply]");
          const jobEditButton = event.target.closest("[data-feed-job-edit]");
          const jobDeleteButton = event.target.closest("[data-feed-job-delete]");
          if (customerButton) {
            const card = customerButton.closest("[data-feed-id]");
            const key = card && card.dataset.businessKey || "";
            const name = card && card.dataset.detailBusiness || "Business";
            try {
              const stored = JSON.parse(localStorage.getItem("emyCustomerBusinesses") || "{}");
              stored[key || name.toLowerCase().replace(/[^a-z0-9]+/g, "-")] = { key: key || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name, opened: true, status: "Opened" };
              localStorage.setItem("emyCustomerBusinesses", JSON.stringify(stored));
            } catch (error) {}
            customerButton.classList.add("is-active");
            customerButton.textContent = "Customer";
            notifyFeedBusinessOwner(card, "customer-add", currentCustomerName() + " added your business to My Businesses.");
            showToast(name + " added to My Businesses.");
            return;
          }
          if (jobApplyButton) {
            const card = jobApplyButton.closest("[data-feed-id]");
            if (window.emyOpenJobApplication) window.emyOpenJobApplication(card, event);
            return;
          }
          if (jobEditButton) {
            const card = jobEditButton.closest("[data-feed-id]");
            if (window.emyEditCreatedJob) window.emyEditCreatedJob(card, event);
            return;
          }
          if (jobDeleteButton) {
            const card = jobDeleteButton.closest("[data-feed-id]");
            if (window.emyDeleteCreatedJob) window.emyDeleteCreatedJob(card, event);
            return;
          }
          if (window.emyEngagement && typeof window.emyEngagement.update === "function" && (likeButton || saveButton || repostButton || shareButton)) {
            const actionCard = (likeButton || saveButton || repostButton || shareButton).closest("[data-feed-id]");
            const actionName = likeButton ? "like" : saveButton ? "save" : repostButton ? "repost" : "share";
            window.emyEngagement.update(actionCard, actionName);
            if (actionName === "share" && typeof window.emyEngagement.shareCard === "function") window.emyEngagement.shareCard(actionCard);
            return;
          }
          if (likeButton) {
            const card = likeButton.closest("[data-feed-id]");
            const active = !likeButton.classList.contains("is-active");
            likeButton.classList.toggle("is-active", active);
            if (likeButton.classList.contains("reel-inline-action")) {
              const current = readEngagementCount(likeButton);
              const next = Math.max(0, current + (active ? 1 : -1));
              const countNode = likeButton.querySelector("[data-reel-like-count]");
              if (countNode) setEngagementCountText(countNode, next);
            } else if (likeButton.hasAttribute("data-social-icon") || likeButton.querySelector("svg")) {
              likeButton.setAttribute("aria-label", active ? "Liked" : "Like");
            } else {
              likeButton.textContent = active ? "Liked" : "Like";
            }
            const stats = likeButton.closest(".feed-actions") && likeButton.closest(".feed-actions").querySelector("[data-feed-stat]")
              ? likeButton.closest(".feed-actions").querySelector("[data-feed-stat]")
              : (card && card.querySelector("[data-feed-stat]"));
            if (stats && /like/i.test(stats.textContent)) {
              const current = readEngagementCount(stats.textContent);
              const next = Math.max(0, current + (active ? 1 : -1));
              stats.textContent = formatEngagementCount(next) + (next === 1 ? " like" : " likes");
            }
            const countedLike = card && card.querySelector("[data-feed-like-count]");
            let countedLikeCount;
            if (countedLike) {
              const current = readEngagementCount(countedLike);
              countedLikeCount = Math.max(0, current + (active ? 1 : -1));
              setEngagementCountText(countedLike, countedLikeCount);
            }
            updateFeedState(card, { liked: active, statText: stats ? stats.textContent : "", inlineLikeText: likeButton.classList.contains("reel-inline-action") ? likeButton.textContent : "", countedLikeCount });
            updateFeedRepostCount(card);
            if (active) notifyFeedBusinessOwner(card, "like", currentCustomerName() + " liked your " + feedCardItemLabel(card) + ".");
            showToast(active ? "Feed post liked." : "Feed like removed.");
            return;
          }
          if (saveButton) {
            const card = saveButton.closest("[data-feed-id]");
            const active = !saveButton.classList.contains("is-active");
            saveButton.classList.toggle("is-active", active);
            saveButton.classList.toggle("is-liked", active);
            saveButton.setAttribute("aria-pressed", active ? "true" : "false");
            saveButton.setAttribute("aria-label", active ? "Saved" : "Save");
            if (saveButton.classList.contains("reel-inline-action")) saveButton.innerHTML = socialIcon("save");
            const savedCount = card && card.querySelector("[data-product-saved-count]");
            let nextSavedCount;
            if (savedCount) {
              const current = readEngagementCount(savedCount);
              nextSavedCount = Math.max(0, current + (active ? 1 : -1));
              setEngagementCountText(savedCount, nextSavedCount);
            }
            updateFeedState(card, { saved: active, savedCount: nextSavedCount });
            setSavedFeedItem(card, active);
            if (active) notifyFeedBusinessOwner(card, "save", currentCustomerName() + " saved your " + feedCardItemLabel(card) + ".");
            showToast(active ? "Saved to Favourite." : "Removed from Favourite.");
            return;
          }
          if (commentButton) {
            const card = commentButton.closest("[data-feed-id]");
            const isOpen = card && card.classList.contains("is-comments-open");
            if (card) card.classList.toggle("is-comments-open", !isOpen);
            setFeedCommentToggleLabels(card);
            const input = card && card.querySelector("[data-feed-comment-form] input");
            if (!isOpen && input) {
              input.focus();
              if (window.emyFocusEmojiTarget) window.emyFocusEmojiTarget(input);
            }
            return;
          }
          if (repostButton) {
            const card = repostButton.closest("[data-feed-id]");
            if (feedHasRepost(card)) {
              if (removeFeedRepost(card)) {
                resetFeed("all", false);
                showToast("Repost removed.");
              }
              return;
            }
            openRepostDialog(card, (thought) => {
              if (addFeedRepost(card, thought)) {
                repostButton.classList.add("is-active");
                resetFeed("all", false);
                notifyFeedBusinessOwner(card, "repost", currentCustomerName() + " reposted your " + feedCardItemLabel(card) + ".");
                showToast(thought ? "Reposted with your thoughts." : "Reposted to your feed.");
              }
            });
            return;
          }
          if (shareButton) {
            const card = shareButton.closest("[data-feed-id]");
            if (card && card.querySelector("[data-feed-share-count]")) {
              const shareNode = card.querySelector("[data-feed-share-count]");
              const state = readFeedActionState()[card.dataset.feedId] || {};
              const visibleCount = readEngagementCount(shareNode);
              const storedCount = Number(state.shareCount || 0) || 0;
              updateFeedState(card, { shareCount: Math.max(visibleCount, storedCount) + 1 });
              syncFeedCountedFooter(card);
            }
            notifyFeedBusinessOwner(card, "share", currentCustomerName() + " shared your " + feedCardItemLabel(card) + ".");
            const title = card ? (card.dataset.detailTitle || document.title) : document.title;
            if (navigator.share) {
              navigator.share({ title, url: window.location.href }).then(() => showToast("Share sheet opened.")).catch(() => {});
              return;
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(window.location.href).then(() => showToast("Link copied."));
              return;
            }
            showToast("Open the item to share it.");
          }
        });
        document.addEventListener("click", (event) => {
          if (!event.target.closest("[data-feed-options], [data-feed-options-menu]")) closeFeedOptions();
        });
        document.addEventListener("scroll", () => closeFeedOptions(), true);
        window.addEventListener("resize", () => closeFeedOptions());
        feedList.addEventListener("submit", (event) => {
          const replyForm = event.target.closest("[data-feed-comment-reply-form]");
          if (replyForm) {
            event.preventDefault();
            const input = replyForm.querySelector("input");
            const text = (input ? input.value : "").trim();
            if (!text) return;
            const row = replyForm.closest("[data-feed-comment-row]");
            const card = replyForm.closest("[data-feed-id]");
            const replies = row && row.querySelector("[data-feed-comment-replies]");
            const actor = currentFeedCommentActor();
            const replyRecord = { name: actor.name, text, own: true, mine: true, role: actor.role, actorType: actor.role, photo: actor.photo, photoRef: actor.photoRef, href: actor.href };
            const savedReply = appendFeedReplyState(card, row, text, replyRecord) || replyRecord;
            if (replies) replies.insertAdjacentHTML("beforeend", renderFeedCommentReply(Object.assign({}, savedReply, { own: true, mine: true })));
            notifyFeedBusinessOwner(card, "reply", actor.name + " replied to a comment on your " + feedCardItemLabel(card) + ".");
            if (input) input.value = "";
            replyForm.hidden = true;
            if (card) syncFeedCommentsFromDom(card);
            showToast("Reply added.");
            return;
          }
          const form = event.target.closest("[data-feed-comment-form]");
          if (!form) return;
          event.preventDefault();
          const input = form.querySelector("input");
          const text = (input ? input.value : "").trim();
          if (!text) return;
          const card = form.closest("[data-feed-id]");
          const id = card ? card.dataset.feedId : "";
          const item = updates.find((entry) => entry.id === id);
          const actor = currentFeedCommentActor();
          const comment = { name: actor.name, text, likes: 0, dislikes: 0, own: true, mine: true, role: actor.role, actorType: actor.role, photo: actor.photo, photoRef: actor.photoRef, href: actor.href };
          if (item) {
            item.comments = item.comments || [];
            item.comments.push(comment);
          }
          const commentsList = card && card.querySelector("[data-feed-comments-list]");
          if (commentsList) commentsList.insertAdjacentHTML("beforeend", renderComment(comment, card));
          appendFeedCommentState(card, Object.assign({}, comment, { createdAt: new Date().toISOString() }));
          if (card) card.classList.add("is-comments-open");
          syncFeedCountedFooter(card);
          setFeedCommentToggleLabels(card);
          input.value = "";
          notifyFeedBusinessOwner(card, "comment", actor.name + " commented on your " + feedCardItemLabel(card) + ": " + text);
          showToast("Comment added.");
        });
        function setupMyBusinessToggles() {
          document.querySelectorAll("[data-my-business-toggle]").forEach((button) => {
            const getCard = () => button.closest(".rail-card, .my-business-activity");
            const getExtras = () => {
              const card = getCard();
              return card ? Array.from(card.querySelectorAll("[data-my-business-extra]")) : [];
            };
            const text = button.querySelector("[data-my-business-toggle-text]");
            const setExpanded = (expanded) => {
              const extras = getExtras();
              if (!extras.length) {
                button.hidden = true;
                button.style.display = "none";
                button.classList.remove("is-expanded");
                button.setAttribute("aria-expanded", "false");
                if (text) text.textContent = "Show more";
                return;
              }
              button.hidden = false;
              button.style.display = "";
              extras.forEach((row) => {
                row.hidden = !expanded;
                row.style.display = expanded ? "" : "none";
                row.setAttribute("aria-hidden", expanded ? "false" : "true");
              });
              button.classList.toggle("is-expanded", expanded);
              button.setAttribute("aria-expanded", expanded ? "true" : "false");
              if (text) text.textContent = expanded ? "Show fewer" : "Show more";
            };
            if (button.dataset.emyMyBusinessToggleBound !== "true") {
              button.dataset.emyMyBusinessToggleBound = "true";
              button.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                setExpanded(button.getAttribute("aria-expanded") !== "true");
              });
            }
            setExpanded(button.getAttribute("aria-expanded") === "true");
          });
        }
        setupMyBusinessToggles();
        document.addEventListener("click", (event) => {
          const businessLink = event.target.closest("[data-business-link]");
          if (businessLink) {
            try { localStorage.setItem("emySelectedBusinessProfileKey", businessLink.dataset.businessLink || ""); } catch (error) {}
          }
        });
        document.querySelector("[data-open-search]").addEventListener("click", () => { window.location.href = "emy-customer-search.html"; });
        if (locationButton) {
          locationButton.addEventListener("click", () => { window.location.href = "emy-customer-home.html#location"; });
        }
        document.querySelector("[data-notifications]").addEventListener("click", () => {
          try { localStorage.setItem("emyNotificationReturnPage", "emy-customer-home.html#feeds"); } catch (error) {}
          window.location.href = "emy-notification-settings.html";
        });
        document.querySelectorAll("[data-switch-business]").forEach((button) => {
          button.setAttribute("aria-pressed", "false");
          button.addEventListener("click", () => {
            if (button.classList.contains("is-switching")) return;
            const switchMode = button.dataset.businessSwitchMode || "create";
            if (switchMode === "review") return;
            const creatingBusiness = switchMode === "create" || switchMode === "rejected";
            const target = creatingBusiness ? "emy-business-profile.html?setup=1" : "emy-business-profile.html?mode=business";
            button.dataset.businessSwitchNavigating = "true";
            button.classList.add("is-switching");
            button.setAttribute("aria-pressed", "true");
            try {
              const signedRole = String(localStorage.getItem("emyMainSignedInRole") || "").toLowerCase();
              const signedEmail = String(localStorage.getItem("emyMainSignedInEmail") || "").trim();
              if (creatingBusiness) {
                localStorage.setItem("emyBusinessRegistrationFromCustomer", "1");
                localStorage.setItem("emyMainPendingSignupRole", "business");
                if (signedRole === "customer" && signedEmail) {
                  localStorage.setItem("emyBusinessRegistrationCustomerEmail", signedEmail);
                  if (!localStorage.getItem("emyMainPendingSignupEmail")) localStorage.setItem("emyMainPendingSignupEmail", signedEmail);
                }
              } else {
                localStorage.setItem("emyMainSignedInRole", "business");
              }
            } catch (error) {}
            window.location.href = target;
          });
        });
        avatar.addEventListener("click", () => { window.location.href = "emy-customer-profile.html"; });
`;
const customer_feeds_part_9 = String.raw`
        document.querySelectorAll("[data-nav]").forEach((button) => {
          button.addEventListener("click", () => {
            const nav = button.dataset.nav;
            if (nav === "feeds") return;
            if (nav === "home") { window.location.href = "emy-customer-home.html"; return; }
            if (nav === "nearby") { window.location.href = "emy-customer-home.html#nearby"; return; }
            if (nav === "reels") { window.location.href = "emy-customer-home.html#reels"; return; }
            if (nav === "uploads") { window.location.href = "emy-customer-home.html?tab=uploads#uploads"; return; }
            if (nav === "profile") { window.location.href = "emy-customer-profile.html"; return; }
            if (nav === "ask") { window.location.href = "ask-emy.html"; return; }
            if (nav === "chat") { window.location.href = "emy-customer-chat.html"; return; }
          });
        });
        const rerenderFeedFromStorage = () => resetFeed("all", false);
        window.emyRefreshCustomerFeedsPage = rerenderFeedFromStorage;
        function bindCustomerFeedsContentSync() {
          if (!window.emyContentSync || typeof window.emyContentSync.register !== "function") return;
          window.emyContentSync.register("customer-feeds", rerenderFeedFromStorage);
        }
        if (window.emyContentSync) bindCustomerFeedsContentSync();
        else window.addEventListener("emy:content-sync-ready", bindCustomerFeedsContentSync, { once: true });
        const syncFeedActionStateFromStorage = () => syncFeedState(feedList);
        const refreshFeedContentAndState = () => {
          rerenderFeedFromStorage();
          syncFeedActionStateFromStorage();
        };
        const feedContentStorageKeys = ["emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents", "emyFeedReposts", "emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels", "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyBusinessPosts", "emyBusinessFeedPosts", "emyBusinessArticles", "emyBusinessArticlePosts", "emyBusinessEvents", "emyBusinessEventPosts", "emyBusinessJobs", "emyBusinessJobPosts"];
        const feedStateStorageKeys = ["emyFeedActionState", "emyFeedDeletedIds", "emySavedFeedItems"];
        const refreshFeedOnActivation = () => {
          if (document.hidden) return;
          rerenderFeedFromStorage();
        };
        window.addEventListener("emy:feed-action-state-changed", syncFeedActionStateFromStorage);
        window.addEventListener("pageshow", refreshFeedOnActivation);
        window.addEventListener("focus", () => {
          if (document.hidden) return;
          refreshFeedContentAndState();
        });
        document.addEventListener("visibilitychange", refreshFeedOnActivation);
        window.addEventListener("storage", (event) => {
          const key = event && event.key;
          if (!event || !key) {
            syncFeedActionStateFromStorage();
            return;
          }
          if (key === "emyCustomerNotifications") updateFeedNotificationCount();
          if (feedStateStorageKeys.includes(key)) syncFeedActionStateFromStorage();
        });
        window.addEventListener("emy:customer-notification-created", () => updateFeedNotificationCount());
        renderProfile();
        resetFeed("all", false);
`;
const customer_feeds_part_10 = String.raw`
      })();
    </script>
  </body>
`;
